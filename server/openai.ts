// Anthropic client wired through claudeopus.pro (OpenAI-compatible proxy that
// also speaks the Anthropic Messages API natively).
//
// Resolution order for credentials:
//   1. AI_INTEGRATIONS_OPENAI_BASE_URL + AI_INTEGRATIONS_OPENAI_API_KEY
//      (Replit AI Integrations — managed billing)
//   2. CLAUDEOPUS_API_KEY + AI_INTEGRATIONS_OPENAI_BASE_URL
//      (claudeopus.pro or any other Anthropic-format proxy)
//
// We deliberately use the Anthropic SDK (not the OpenAI SDK) so we get
// native support for the web_search tool, vision, and prompt caching —
// all of which the prompt depends on.
import Anthropic from "@anthropic-ai/sdk";

function resolveCreds(): { baseURL?: string; apiKey: string } {
  const rawBase =
    process.env.AI_INTEGRATIONS_OPENAI_BASE_URL ||
    process.env.ANTHROPIC_BASE_URL;
  // claudeopus.pro exposes Anthropic-format at /v1/messages. The SDK
  // appends "/messages" to the baseURL, so we ensure the baseURL ends
  // in /v1 when we are pointing at a claudeopus-style host.
  let baseURL = rawBase;
  if (
    baseURL &&
    /claudeopus\.pro/i.test(baseURL) &&
    !/\/v1$/.test(baseURL)
  ) {
    baseURL = baseURL.replace(/\/+$/, "") + "/v1";
  }
  const apiKey =
    process.env.AI_INTEGRATIONS_OPENAI_API_KEY ||
    process.env.CLAUDEOPUS_API_KEY ||
    process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error(
      "No Anthropic key configured. Set ANTHROPIC_API_KEY, CLAUDEOPUS_API_KEY, or AI_INTEGRATIONS_OPENAI_API_KEY.",
    );
  }
  return { baseURL, apiKey };
}

let _client: Anthropic | null = null;

export function getAnthropic(): Anthropic {
  if (_client) return _client;
  const { baseURL, apiKey } = resolveCreds();
  _client = new Anthropic({
    apiKey,
    baseURL, // optional — claudeopus.pro is the default Anthropic API if unset
  });
  return _client;
}

export const CHAT_MODEL = process.env.OPENAI_MODEL || "claude-opus-4-8";
