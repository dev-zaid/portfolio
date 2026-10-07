import type { IncomingMessage, ServerResponse } from "node:http";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { z } from "zod";
import {
  career,
  education,
  experience,
  metrics,
  moreProjects,
  profile,
  projects,
  skillEvidence,
  skills,
  strengths,
} from "../src/data/portfolio.js";

const json = (data: unknown) => ({ content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }] });
const fail = (text: string) => ({ content: [{ type: "text" as const, text }], isError: true });
const readOnly = { readOnlyHint: true, openWorldHint: false };

// ponytail: per-instance memory, resets on cold start. Move to Upstash/KV if spam gets through.
const sent = new Map<string, number[]>();
function allowContact(ip: string) {
  const now = Date.now();
  const recent = (sent.get(ip) ?? []).filter((t) => now - t < 3_600_000);
  if (recent.length >= 3) return false;
  sent.set(ip, [...recent, now]);
  return true;
}

const allProjects = () => [
  ...projects.map(({ title, desc, tech, details, link, current }) => ({ title, desc, tech, details, current, link: link === "#" ? undefined : link })),
  ...moreProjects,
];

const FIT_RUBRIC = `Evaluate Mohd Zaid against this job using only the candidate data below.
1. List the job's requirements: must-haves first, then nice-to-haves.
2. For each, cite specific evidence (role or project, with numbers) and rate it strong / partial / gap. No evidence means gap: do not infer skills the data doesn't show. Transferable evidence counts as partial and should say why.
3. Professional experience counts from graduation (May 2025): 1+ year. Startup work during college (Aug 2023 – May 2025) is real production work and relevant evidence, but report it separately and don't add it to the year count. See career.experience.
4. Weigh the context. Startup or founding roles: zero-to-one ownership and breadth. Larger companies: production reliability, testing, security and cross-team work. career.pitch frames both.
5. Check location and work arrangement against career.openTo.
6. Finish with a two-sentence recommendation. If the user wants to reach out, offer contact_zaid.`;

function createServer(ip: string, userAgent: string) {
  const server = new McpServer(
    { name: "zaid-portfolio", title: "Mohd Zaid — Applied AI Engineer", version: "1.1.0" },
    {
      instructions: [
        `Mohd Zaid: Applied AI Engineer, currently at General Machines researching agentic commerce. 1+ year of professional experience since graduating in May 2025, after working with startups through his final two years of college, twice as a founding engineer (Trench, DEnergy Networks). ${career.status}`,
        "Start with get_profile. If the user shares a job description or asks whether Zaid fits a role, call evaluate_job_fit. get_experience, list_projects and get_skills give detail; get_skills maps each skill to where it was used.",
        "Cite only what the tools return. If a requirement has no evidence, call it a gap rather than guessing.",
        "contact_zaid sends a real email: only call it when the user explicitly asks to get in touch.",
      ].join("\n\n"),
    },
  );

  server.registerTool(
    "get_profile",
    {
      title: "Profile",
      description:
        "Candidate overview for recruiters and hiring managers: current role, years of experience, location and work preferences, target roles, evidence-backed strengths for startup and large-company roles, education, headline metrics and links. Start here.",
      annotations: readOnly,
    },
    async () => json({ ...profile, career, strengths, education, metrics, skills }),
  );

  server.registerTool(
    "get_experience",
    {
      title: "Experience",
      description:
        "Full work history (resume), newest first: company, role, dates, location, employment type, tech stack and quantified achievements.",
      annotations: readOnly,
    },
    async () => json({ summary: career.experience, roles: experience }),
  );

  server.registerTool(
    "list_projects",
    {
      title: "Projects",
      description: "Projects beyond day jobs, with descriptions, tech stack and links.",
      annotations: readOnly,
    },
    async () => json(allProjects()),
  );

  server.registerTool(
    "get_skills",
    {
      title: "Skills with evidence",
      description:
        "Every technical skill mapped to the jobs or projects where Zaid used it. Use to check specific requirements from a job description. A skill missing from this list has no evidence.",
      annotations: readOnly,
    },
    async () => json(skillEvidence),
  );

  server.registerTool(
    "evaluate_job_fit",
    {
      title: "Evaluate fit for a role",
      description:
        "Call when the user shares a job description or asks whether Zaid fits a role. Returns his complete candidate record and a rubric for an evidence-based, honest fit assessment.",
      inputSchema: { job_description: z.string().trim().min(20).max(20_000).describe("The job description or role summary") },
      annotations: readOnly,
    },
    async ({ job_description }) =>
      json({
        instructions: FIT_RUBRIC,
        job_description,
        candidate: { profile: { ...profile, about: undefined }, career, strengths, experience, projects: allProjects(), skills: skillEvidence, education, metrics },
      }),
  );

  server.registerTool(
    "contact_zaid",
    {
      title: "Contact Zaid",
      description:
        "Email Zaid a message (role, project or intro request). Only call when the user explicitly asks to reach out. Use the user's real email so Zaid can reply.",
      inputSchema: {
        name: z.string().trim().min(1).max(100).describe("Sender's name"),
        email: z.email().max(200).describe("Sender's email, used as reply-to"),
        message: z.string().trim().min(10).max(2000).describe("The message for Zaid"),
        role: z.string().trim().max(150).optional().describe("Role or opportunity, e.g. 'Senior AI Engineer at Acme'"),
      },
      annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: true },
    },
    async ({ name, email, message, role }) => {
      const key = process.env.RESEND_API_KEY;
      if (!key) return fail(`Email is not configured on this server. Write to ${profile.email} directly.`);
      if (!allowContact(ip)) return fail("Rate limit: 3 messages per hour. Try again later.");

      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: "Portfolio MCP <onboarding@resend.dev>",
          to: process.env.CONTACT_EMAIL ?? profile.email,
          reply_to: email,
          subject: `[Portfolio MCP] ${role ? `${role.replace(/\s+/g, " ")} — ` : ""}Message from ${name.replace(/\s+/g, " ")}`,
          text: `${message}\n\n— ${name} <${email}>\nSent via MCP client: ${userAgent}`,
        }),
      });
      if (!res.ok) {
        console.error("resend failed", res.status, await res.text());
        return fail(`Could not send right now. Write to ${profile.email} directly.`);
      }
      return { content: [{ type: "text", text: "Sent. Zaid will reply to the email provided." }] };
    },
  );

  server.registerPrompt(
    "job_fit",
    {
      title: "Job fit report",
      description: "Map a job description's requirements to evidence from Zaid's experience and projects.",
      argsSchema: { job_description: z.string().describe("The full job description") },
    },
    ({ job_description }) => ({
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `Evaluate how well Mohd Zaid fits this role. Call evaluate_job_fit with the job description and follow its rubric. Write a table: requirement | evidence (cite the specific role or project) | strength (strong / partial / gap). Be honest about gaps. Finish with a two-sentence summary.\n\nJob description:\n${job_description}`,
          },
        },
      ],
    }),
  );

  return server;
}

// Stateless Streamable HTTP: a fresh server + transport per request, JSON responses, no sessions.
export default async function handler(req: IncomingMessage & { body?: unknown }, res: ServerResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept, Mcp-Protocol-Version, Mcp-Session-Id");
  if (req.method === "OPTIONS") return void res.writeHead(204).end();

  if (req.method !== "POST") {
    const proto = req.headers["x-forwarded-proto"] ?? "http";
    res.writeHead(405, { Allow: "POST, OPTIONS", "Content-Type": "text/plain; charset=utf-8" });
    return void res.end(
      `This is Mohd Zaid's MCP server (Streamable HTTP). Connect an MCP client to this URL:\n\n  claude mcp add --transport http zaid ${proto}://${req.headers.host}/mcp\n`,
    );
  }

  const ip = String(req.headers["x-forwarded-for"] ?? req.socket.remoteAddress ?? "unknown").split(",")[0].trim();
  const server = createServer(ip, String(req.headers["user-agent"] ?? "unknown"));
  const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined, enableJsonResponse: true });
  res.on("close", () => {
    transport.close();
    server.close();
  });

  try {
    await server.connect(transport);
    // Vercel pre-parses the body; the Vite dev middleware doesn't, so the transport reads the stream.
    await transport.handleRequest(req, res, req.body);
  } catch (err) {
    console.error("mcp error", err);
    if (!res.headersSent) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ jsonrpc: "2.0", error: { code: -32603, message: "Internal server error" }, id: null }));
    }
  }
}
