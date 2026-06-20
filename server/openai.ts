// OpenAI via Replit AI Integrations (javascript_openai_ai_integrations).
// Uses managed billing — no user API key required. Env vars
// AI_INTEGRATIONS_OPENAI_BASE_URL and AI_INTEGRATIONS_OPENAI_API_KEY
// are injected automatically when the integration is connected.
import OpenAI from "openai";

export function getOpenAI(): OpenAI {
  const baseURL = process.env.AI_INTEGRATIONS_OPENAI_BASE_URL;
  const apiKey = process.env.AI_INTEGRATIONS_OPENAI_API_KEY;
  if (!baseURL || !apiKey) {
    throw new Error(
      "OpenAI AI integration is not connected yet. Connect it to enable chat.",
    );
  }
  return new OpenAI({ baseURL, apiKey });
}

export const CHAT_MODEL = "gpt-5.4";
