// Seed the rag_chunks table with a small, deliberately-named set of
// per-country official sources. Run once with:
//   npx tsx server/seed-rag.ts
//
// Sources (Colombia):
//   - Ley 1751 de 2015 (Estatutaria de Salud)
//   - Ley 1437 de 2011 (Código de Procedimiento Administrativo y de lo Contencioso Administrativo)
//   - Resolución 2291 de 2021 (Carta de Derechos del Afiliado y del Paciente)
//
// Each source is broken into 1-3 short chunks, each tagged with a
// section label. The embedding is a deterministic hash of the text —
// enough for the demo's nearest-neighbor search. In production, swap
// for a real embeddings API call.

import { db } from "./db";
import { ragChunks } from "@shared/schema";
import { sql } from "drizzle-orm";

const EMBED_DIM = 256;

function hashEmbed(text: string): number[] {
  const v = new Array(EMBED_DIM).fill(0);
  const norm = text.toLowerCase();
  for (let i = 0; i < norm.length; i++) {
    const c = norm.charCodeAt(i);
    v[c % EMBED_DIM] += 1;
    v[(c * 7) % EMBED_DIM] += 0.3;
    v[(c * 13) % EMBED_DIM] += 0.1;
  }
  let s = 0;
  for (const x of v) s += x * x;
  s = Math.sqrt(s) || 1;
  return v.map((x) => x / s);
}

type Chunk = { source: string; country: string; section: string; text: string };

const CHUNKS: Chunk[] = [
  // ----------------------------------------------------------------
  // Colombia — Ley 1751 de 2015 (Estatutaria de Salud)
  // ----------------------------------------------------------------
  {
    source: "Ley 1751 de 2015 (Estatutaria de la Salud)",
    country: "Colombia",
    section: "Artículo 2 — Naturaleza del derecho",
    text:
      "La presente ley tiene por objeto garantizar el derecho fundamental a la salud, regularlo y establecer sus mecanismos de protección. Se aplica a todos los residentes en el territorio colombiano. El derecho a la salud se reconoce como autónomo e irrenunciable en lo que respecta a la cobertura de los servicios de salud y a las condiciones necesarias para su goce efectivo.",
  },
  {
    source: "Ley 1751 de 2015 (Estatutaria de la Salud)",
    country: "Colombia",
    section: "Artículo 6 — Deberes de las personas",
    text:
      "Las personas tienen el deber de procurar el cuidado integral de su salud y la de su comunidad, así como de hacer uso racional y adecuado de los servicios de salud. Las EPS, IPS y demás entidades del sistema deben garantizar el acceso a los servicios de salud sin discriminación alguna y en condiciones de oportunidad, calidad y eficiencia.",
  },
  {
    source: "Ley 1751 de 2015 (Estatutaria de la Salud)",
    country: "Colombia",
    section: "Artículo 8 — Prestaciones de carácter integral",
    text:
      "El derecho a la salud incluye, entre otros, el acceso a los servicios de salud de manera oportuna, eficaz y con calidad para la preservación, el mejoramiento y la promoción de la salud, incluyendo la promoción de la salud, la prevención de la enfermedad, el diagnóstico, el tratamiento, la rehabilitación y la paliación. Las tecnologías en salud deberán ser suministradas de forma integral cuando sean necesarias para recuperar o mantener la salud.",
  },
  {
    source: "Ley 1751 de 2015 (Estatutaria de la Salud)",
    country: "Colombia",
    section: "Artículo 14 — Prohibición de negación del servicio",
    text:
      "Ninguna persona podrá ser discriminada, ni se le podrá negar la atención en salud, por su condición social, económica, cultural, étnica, de género, de orientación sexual, de discapacidad, de religión, de opinión política, de origen familiar, de lengua, de enfermedad preexistente, o de cualquier otra condición. Las EPS no pueden negar la entrega de medicamentos incluidos en el plan de beneficios cuando han sido prescritos por el médico tratante, salvo justificación técnica y científica debidamente motivada.",
  },
  {
    source: "Ley 1751 de 2015 (Estatutaria de la Salud)",
    country: "Colombia",
    section: "Artículo 20 — Mecanismos de protección",
    text:
      "Cuando la EPS niegue un servicio, medicamento o tecnología incluidos en el plan de beneficios, el usuario puede interponer: (1) derecho de petición ante la EPS en primera instancia, (2) queja ante la Superintendencia Nacional de Salud, (3) acción de tutela ante cualquier juez para la protección inmediata del derecho, (4) recurso de apelación ante la entidad que emitió el acto administrativo. La EPS tiene 15 días hábiles para resolver una solicitud de autorización de servicios.",
  },

  // ----------------------------------------------------------------
  // Colombia — Ley 1437 de 2011 (CPACA)
  // ----------------------------------------------------------------
  {
    source: "Ley 1437 de 2011 (CPACA)",
    country: "Colombia",
    section: "Artículo 14 — Derecho de petición",
    text:
      "Toda persona tiene derecho a presentar peticiones respetuosas a las autoridades y a obtener respuesta completa, oportuna y de fondo. La autoridad deberá resolver la petición en un plazo máximo de quince (15) días hábiles contados a partir del día siguiente a la fecha de su recepción. Cuando se trate de peticiones de información, el plazo será de diez (10) días hábiles.",
  },
  {
    source: "Ley 1437 de 2011 (CPACA)",
    country: "Colombia",
    section: "Artículo 74 — Derecho de petición en interés general",
    text:
      "Las peticiones podrán presentarse por cualquier persona interesada o por su representante. Si la petición es incompleta o imprecisa, la autoridad deberá requerir al peticionario para que subsane en el término de diez (10) días. Vencido este plazo sin que el peticionario subsane, se archivará la petición. La respuesta debe ser de fondo, congruente con lo solicitado y motivada.",
  },
  {
    source: "Ley 1437 de 2011 (CPACA)",
    country: "Colombia",
    section: "Recursos — Reposición y Apelación",
    text:
      "Contra los actos administrativos que nieguen un derecho, el interesado puede interponer: (1) recurso de reposición ante la misma autoridad que expidió el acto, dentro de los diez (10) días siguientes a su notificación, y (2) recurso de apelación ante el superior jerárquico, en el mismo término. La autoridad tiene quince (15) días para resolver el recurso de reposición y treinta (30) días para el de apelación.",
  },

  // ----------------------------------------------------------------
  // Colombia — Resolución 2291 de 2021 / Carta de Derechos
  // ----------------------------------------------------------------
  {
    source: "Resolución 2291 de 2021 — Carta de Derechos del Afiliado y del Paciente",
    country: "Colombia",
    section: "Derecho a la información",
    text:
      "Todo afiliado tiene derecho a recibir información clara, oportuna, veraz y completa sobre: los servicios a los que tiene derecho, la red de prestadores de servicios de salud, los procedimientos para acceder a autorizaciones, los plazos de respuesta, los derechos y deberes del paciente, y los mecanismos para presentar quejas y reclamos. La EPS debe entregar esta información al momento de la afiliación y actualizarla cuando sea necesario.",
  },
  {
    source: "Resolución 2291 de 2021 — Carta de Derechos del Afiliado y del Paciente",
    country: "Colombia",
    section: "Derecho a la atención oportuna",
    text:
      "El afiliado tiene derecho a recibir los servicios de salud sin barreras de acceso. Los términos para la asignación de citas de medicina general no podrán exceder tres (3) días hábiles, y para citas de especialista cinco (5) días hábiles. Las autorizaciones de servicios deben ser resueltas en máximo cinco (5) días hábiles, salvo casos urgentes que deben ser resueltos de forma inmediata.",
  },
  {
    source: "Resolución 2291 de 2021 — Carta de Derechos del Afiliado y del Paciente",
    country: "Colombia",
    section: "Derecho a presentar quejas y reclamos",
    text:
      "Todo afiliado puede presentar quejas y reclamos ante la EPS por la prestación indebida de los servicios. La EPS debe contar con una oficina de atención al usuario y un sistema de registro de PQRS. Independientemente, el usuario puede acudir a la Superintendencia Nacional de Salud, a la Defensoría del Pueblo, o a la Personería Municipal para presentar sus quejas.",
  },

  // ----------------------------------------------------------------
  // India — AB-PMJAY patient charter + Consumer Protection Act
  // ----------------------------------------------------------------
  {
    source: "AB-PMJAY Patient Charter (India)",
    country: "India",
    section: "Entitlement and package coverage",
    text:
      "Beneficiaries of Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (AB-PMJAY) are entitled to free secondary and tertiary care hospitalization at empanelled public and private hospitals, up to a sum of Rs. 5 lakh per family per year. Pre-existing conditions are covered from day one. There is no cap on family size, age, or gender.",
  },
  {
    source: "AB-PMJAY Patient Charter (India)",
    country: "India",
    section: "Right to grievance redressal",
    text:
      "Every empanelled hospital must display the patient charter, a list of packages covered, and the contact details of the District Grievance Nodal Officer. Beneficiaries can call the Ayushman Bharat helpline 14555 to register a grievance, file a complaint online at https://pmjay.gov.in, or approach the District Grievance Nodal Officer in person.",
  },
  {
    source: "Consumer Protection Act 2019 (India)",
    country: "India",
    section: "Medical services and deficiency",
    text:
      "Deficiency in medical services, including denial of entitled treatment under government schemes, can be raised before the District Consumer Disputes Redressal Commission. Complaints can be filed online through the e-Daakhil portal (edaakhil.nic.in). For claims up to Rs. 1 crore, the District Commission has jurisdiction. Limitation period is two years from the date the cause of action arose.",
  },

  // ----------------------------------------------------------------
  // Philippines — UHC Act + PhilHealth
  // ----------------------------------------------------------------
  {
    source: "Universal Health Care Act RA 11223 (Philippines)",
    country: "Philippines",
    section: "Section 7 — Right to health",
    text:
      "Every Filipino citizen is guaranteed equitable access to quality and affordable health care goods and services, and is protected from financial risk. All Filipinos are automatically enrolled in the National Health Insurance Program (PhilHealth). The Act prohibits denial of health services on grounds of financial capacity.",
  },
  {
    source: "PhilHealth Citizen's Charter (Philippines)",
    country: "Philippines",
    section: "Filing a complaint",
    text:
      "Members may file a complaint against any PhilHealth-accredited provider that denies benefits, overcharges, or provides substandard service. Complaints may be filed at any PhilHealth Regional Office, by calling the Action Center at (02) 8441-7442, or through the official website. The PhilHealth Arbitration Office handles disputes within 30 days from filing.",
  },

  // ----------------------------------------------------------------
  // Vietnam — Health Insurance Law
  // ----------------------------------------------------------------
  {
    source: "Vietnam Law on Health Insurance 2008 (amended 2014)",
    country: "Vietnam",
    section: "Article 14 — Scope of coverage",
    text:
      "Health insurance covers medical examination, treatment, rehabilitation, regular medical checkups, and transfer of patients. Inpatient care at the correct level is covered at 80% to 100% of cost depending on the participant category. Outpatient care is covered at the rates set by the Ministry of Health. Participants have the right to choose any contracted facility within their registered province.",
  },
  {
    source: "Vietnam Law on Health Insurance 2008 (amended 2014)",
    country: "Vietnam",
    section: "Article 27 — Grievance procedure",
    text:
      "When a health insurance claim is denied, the patient may file a complaint with the director of the health facility within 30 days. If unsatisfied with the response, the patient may escalate to the Department of Health Insurance (under the Ministry of Health) or file an administrative lawsuit at the People's Court. The complaint must be resolved within 10 working days.",
  },

  // ----------------------------------------------------------------
  // Indonesia — BPJS
  // ----------------------------------------------------------------
  {
    source: "BPJS Kesehatan Participant Charter (Indonesia)",
    country: "Indonesia",
    section: "Right to services",
    text:
      "Every BPJS Kesehatan participant is entitled to comprehensive health services including promotive, preventive, curative, and rehabilitative care at Fasilitas Kesehatan Tingkat Pertama (FKTP) and advanced referral hospitals. Participants may not be charged additional fees beyond the established tariff for covered services.",
  },
  {
    source: "BPJS Kesehatan Participant Charter (Indonesia)",
    country: "Indonesia",
    section: "Filing a complaint",
    text:
      "Participants may file complaints through: (1) the hospital's customer service desk, (2) the BPJS Kesehatan Care Center at 1500-400, (3) the official BPJS Kesehatan mobile app (Mobile JKN), or (4) the Whistleblower System at https://www.bpjs-kesehatan.go.id. Complaints are tracked with a ticket number and must be responded to within 5 working days.",
  },
];

async function main() {
  console.log(`Seeding ${CHUNKS.length} chunks…`);

  // Clear and re-seed
  await db.execute(sql`TRUNCATE rag_chunks RESTART IDENTITY`);

  for (const c of CHUNKS) {
    const embedding = hashEmbed(c.text);
    await db.insert(ragChunks).values({ ...c, embedding });
  }

  const result = await db.execute(sql`SELECT count(*)::int AS n FROM rag_chunks`);
  const n = (result.rows[0] as any).n;
  console.log(`Seeded ${n} chunks.`);
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
