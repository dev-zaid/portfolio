import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { Check, ChevronRight, Copy, ExternalLink, LoaderCircle, Play, RotateCcw } from "lucide-react";
import { Footer } from "../components/Footer.tsx";
import { Logo } from "../components/Navbar.tsx";
import { Typewriter } from "../assets/test";
import { profile } from "../data/portfolio.ts";

const ENDPOINT = "https://www.devzaid.in/mcp";
const CLAUDE_CODE = `claude mcp add --transport http zaid ${ENDPOINT}`;
const GEMINI_CLI = `gemini mcp add --transport http zaid ${ENDPOINT}`;
const CURSOR_LINK = `cursor://anysphere.cursor-deeplink/mcp/install?name=zaid&config=${btoa(JSON.stringify({ url: ENDPOINT }))}`;
const VSCODE_LINK = `vscode:mcp/install?${encodeURIComponent(JSON.stringify({ name: "zaid", type: "http", url: ENDPOINT }))}`;
const JSON_CONFIG = JSON.stringify({ mcpServers: { zaid: { url: ENDPOINT } } }, null, 2);

// ---------------------------------------------------------------------------
// Minimal MCP client: raw JSON-RPC over Streamable HTTP, so every message is visible.
// ---------------------------------------------------------------------------

type Tool = {
  name: string;
  description?: string;
  inputSchema: { properties?: Record<string, { description?: string }>; required?: string[] };
  annotations?: { readOnlyHint?: boolean };
};
type Prompt = { name: string; description?: string; arguments?: { name: string }[] };
type Result = {
  protocolVersion?: string;
  serverInfo?: { name: string; version: string };
  tools?: Tool[];
  prompts?: Prompt[];
  content?: { text?: string }[];
  isError?: boolean;
};
type LogEntry = { id: number; out: boolean; label: string; data: unknown; ms?: number };
type Status = "connecting" | "online" | "offline";

let rpcId = 0;
let logId = 0;
let protocolVersion: string | undefined;

const kb = (text = "") => `${(text.length / 1024).toFixed(1)} KB`;

function summarize(method: string, r: Result) {
  if (r.serverInfo) return `${r.serverInfo.name} v${r.serverInfo.version} · protocol ${r.protocolVersion}`;
  if (r.tools) return `${r.tools.length} tools`;
  if (r.prompts) return `${r.prompts.length} prompts`;
  if (r.content) return `${r.isError ? "tool error · " : ""}${kb(r.content[0]?.text)}`;
  return method;
}

function useMcp() {
  const [status, setStatus] = useState<Status>("connecting");
  const [latency, setLatency] = useState<number>();
  const [tools, setTools] = useState<Tool[]>([]);
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [log, setLog] = useState<LogEntry[]>([]);
  const started = useRef(false);

  const call = useCallback(async (method: string, params?: object): Promise<Result> => {
    const push = (e: Omit<LogEntry, "id">) => setLog((l) => [...l.slice(-49), { ...e, id: ++logId }]);
    const msg = { jsonrpc: "2.0", ...(!method.startsWith("notifications/") && { id: ++rpcId }), method, ...(params && { params }) };
    push({ out: true, label: method, data: msg });
    const t0 = performance.now();
    const res = await fetch("/mcp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text/event-stream",
        ...(protocolVersion ? { "MCP-Protocol-Version": protocolVersion } : {}),
      },
      body: JSON.stringify(msg),
    });
    const ms = Math.round(performance.now() - t0);
    setLatency(ms);
    if (res.status === 202) {
      push({ out: false, label: "202 Accepted", data: null, ms });
      return {};
    }
    const body: { result?: Result; error?: { code: number; message: string } } = await res.json();
    push({ out: false, label: body.error ? `error ${body.error.code}` : summarize(method, body.result ?? {}), data: body, ms });
    if (!body.result) throw new Error(body.error?.message ?? `HTTP ${res.status}`);
    return body.result;
  }, []);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    (async () => {
      try {
        const init = await call("initialize", {
          protocolVersion: "2025-11-25",
          capabilities: {},
          clientInfo: { name: "zaid-portfolio-web", version: "1.0.0" },
        });
        protocolVersion = init.protocolVersion;
        await call("notifications/initialized");
        setTools((await call("tools/list")).tools ?? []);
        setPrompts((await call("prompts/list")).prompts ?? []);
        setStatus("online");
      } catch {
        setStatus("offline");
      }
    })();
  }, [call]);

  const runTool = useCallback(
    async (name: string) => (await call("tools/call", { name, arguments: {} })).content?.[0]?.text ?? "",
    [call],
  );

  return { status, latency, tools, prompts, log, runTool };
}

// ---------------------------------------------------------------------------
// Use-case scenarios. Tool calls run against the live server; replies are scripted.
// ---------------------------------------------------------------------------

type Block = { kind: "p"; text: string } | { kind: "list"; items: string[] } | { kind: "table"; head: string[]; rows: string[][] };
type Step =
  | { kind: "user"; text: string; tag?: string }
  | { kind: "tool"; name: string; dryRun?: boolean; args?: Record<string, string> }
  | { kind: "agent"; blocks: Block[] };

const scenarios: { id: string; persona: string; title: string; steps: Step[] }[] = [
  {
    id: "recruiter",
    persona: "Recruiter",
    title: "Screen against a job description",
    steps: [
      {
        kind: "user",
        tag: "prompt · job_fit",
        text: "Senior AI Engineer, 5+ years. Build LLM agents with tool calling and ship them to production in Python or TypeScript. Evals and payments experience a plus. Is Zaid a fit?",
      },
      { kind: "tool", name: "get_profile" },
      { kind: "tool", name: "get_experience" },
      { kind: "tool", name: "list_projects" },
      {
        kind: "agent",
        blocks: [
          {
            kind: "table",
            head: ["Requirement", "Evidence", "Fit"],
            rows: [
              ["LLM agents + tool calling", "Agentic commerce at General Machines; PyREX agent-driven payment routing", "Strong"],
              ["Ships to production", "Founding engineer at Trench: 1,000+ concurrent users at sub-100ms", "Strong"],
              ["Python / TypeScript", "Core stack. PyREX in Python, OD Automation in TypeScript", "Strong"],
              ["Evals (plus)", "Evals and benchmarks for web agents at General Machines", "Strong"],
              ["Payments (plus)", "PyREX cross-border routing; ACP, AP2, Stripe Agentic Payments", "Strong"],
              ["5+ years", "1+ year professional since May 2025, plus startup work through college (Mable, Trench, DEnergy)", "Gap"],
            ],
          },
          {
            kind: "p",
            text: "Strong on everything the role does day to day, short of the 5-year bar on paper. Two founding-engineer roles are worth weighing against that.",
          },
        ],
      },
    ],
  },
  {
    id: "manager",
    persona: "Hiring manager",
    title: "Verify production claims",
    steps: [
      { kind: "user", text: "Has he run anything with real load, or is it all side projects?" },
      { kind: "tool", name: "get_experience" },
      {
        kind: "agent",
        blocks: [
          { kind: "p", text: "Real load, with numbers:" },
          {
            kind: "list",
            items: [
              "Trench (founding full-stack): zero to 1,000+ concurrent users at sub-100ms, streaming 10M+ live records.",
              "DEnergy Networks (founding engineer): Go services across 50+ live nodes, CertiK audit of 50K+ LOC at 98% test coverage.",
              "Mable: Redis-cached APIs serving 100K+ daily requests at sub-10ms.",
            ],
          },
          { kind: "p", text: "Two founding roles, so he has owned systems end to end, incidents included." },
        ],
      },
    ],
  },
  {
    id: "founder",
    persona: "Founder",
    title: "Find a builder and reach out",
    steps: [
      { kind: "user", text: "I'm building agentic checkout for a D2C brand. Is Zaid relevant? If yes, reach out for me. I'm Sam, sam@example.com." },
      { kind: "tool", name: "get_profile" },
      { kind: "tool", name: "list_projects" },
      {
        kind: "agent",
        blocks: [
          {
            kind: "p",
            text: "Very relevant. He works on agentic commerce at General Machines right now, studying how agents find, compare and buy from real stores. He built PyREX (agent-driven payment routing) and lists ACP, UCP, AP2 and Stripe Agentic Payments in his toolkit. Drafting the intro:",
          },
        ],
      },
      {
        kind: "tool",
        name: "contact_zaid",
        dryRun: true,
        args: {
          name: "Sam",
          email: "sam@example.com",
          message: "Hi Zaid, I'm building agentic checkout for a D2C brand and would love your help. Open to a call this week?",
        },
      },
      { kind: "agent", blocks: [{ kind: "p", text: "Ready to send. Approve it and it lands in his inbox with your email as reply-to." }] },
    ],
  },
  {
    id: "interviewer",
    persona: "Interviewer",
    title: "Brief me before the call",
    steps: [
      { kind: "user", text: "Interviewing Zaid in 10 minutes. Give me a three-bullet brief and two sharp questions." },
      { kind: "tool", name: "get_profile" },
      { kind: "tool", name: "get_experience" },
      {
        kind: "agent",
        blocks: [
          {
            kind: "list",
            items: [
              "Applied AI engineer, currently on agentic commerce at General Machines.",
              "Founding engineer twice (Trench, DEnergy Networks): owns systems end to end.",
              "Production numbers: 1,000+ concurrent users at sub-100ms, 10M+ live records, 7 zero-downtime mainnet upgrades.",
            ],
          },
          { kind: "p", text: "Ask him:" },
          {
            kind: "list",
            items: [
              "Where do shopping agents fail most on real stores, and how do you measure it?",
              "Trench went from zero to 1,000+ concurrent users. What broke first?",
            ],
          },
        ],
      },
    ],
  },
];

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const fitColor: Record<string, string> = { Strong: "text-brand-accent", Partial: "text-yellow-300", Gap: "text-red-400" };

function StepView({ step, result }: { step: Step; result?: { ms: number; text: string } }) {
  if (step.kind === "user") {
    return (
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-end">
        {step.tag && <span className="mb-2 text-[10px] font-mono text-brand-accent/80">{step.tag}</span>}
        <p className="max-w-[85%] px-4 py-3 rounded-2xl rounded-br-sm bg-brand-accent/10 border border-brand-accent/20 text-sm md:text-base text-white/90">
          <Typewriter text={step.text} speed={14} cursor="" />
        </p>
      </motion.div>
    );
  }

  if (step.kind === "tool") {
    return (
      <motion.details
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        className="group rounded-lg border border-white/10 bg-brand-darker/80 text-xs font-mono"
      >
        <summary className="flex flex-wrap items-center gap-x-3 gap-y-1 px-4 py-2.5 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
          <ChevronRight size={14} className="text-white/30 transition-transform group-open:rotate-90" />
          <span className="text-white/40">tools/call</span>
          <span className="text-brand-accent">{step.name}</span>
          <span className="ml-auto flex items-center gap-2 text-white/40">
            {step.dryRun ? (
              <span className="text-yellow-300/80">awaiting your approval · not sent in demo</span>
            ) : result ? (
              <>
                <Check size={12} className="text-brand-accent" />
                {result.ms}ms · {kb(result.text)}
              </>
            ) : (
              <LoaderCircle size={12} className="animate-spin" />
            )}
          </span>
        </summary>
        <pre className="px-4 pb-4 max-h-64 overflow-auto text-white/60 whitespace-pre-wrap break-words">
          {step.dryRun ? JSON.stringify(step.args, null, 2) : (result?.text ?? "…")}
        </pre>
      </motion.details>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-3 text-sm md:text-base text-white/80 leading-relaxed"
    >
      <span className="block text-[10px] font-orbitron font-bold tracking-[0.2em] uppercase text-white/30">Agent</span>
      {step.blocks.map((b, i) =>
        b.kind === "p" ? (
          <p key={i}>{b.text}</p>
        ) : b.kind === "list" ? (
          <ul key={i} className="space-y-2">
            {b.items.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="text-brand-accent">▹</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div key={i} className="overflow-x-auto">
            <table className="w-full min-w-[520px] text-left text-xs md:text-sm">
              <thead>
                <tr>
                  {b.head.map((h) => (
                    <th key={h} className="pb-2 pr-4 border-b border-white/10 text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {b.rows.map(([req, evidence, fit]) => (
                  <tr key={req}>
                    <td className="py-2 pr-4 border-b border-white/5 text-white/90">{req}</td>
                    <td className="py-2 pr-4 border-b border-white/5 text-white/60">{evidence}</td>
                    <td className={`py-2 border-b border-white/5 font-bold ${fitColor[fit]}`}>{fit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ),
      )}
    </motion.div>
  );
}

function ScenarioPlayer({ runTool }: { runTool: (name: string) => Promise<string> }) {
  const [active, setActive] = useState(0);
  const [run, setRun] = useState(0);
  const [shown, setShown] = useState(0);
  const [results, setResults] = useState<Record<number, { ms: number; text: string }>>({});
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const scenario = scenarios[active];

  const play = (i: number) => {
    setActive(i);
    setShown(0);
    setResults({});
    setRun((r) => r + 1);
  };

  useEffect(() => {
    if (!inView) return;
    let cancelled = false;
    (async () => {
      for (const [i, step] of scenario.steps.entries()) {
        if (cancelled) return;
        setShown(i + 1);
        if (step.kind === "user") {
          await sleep(step.text.length * 14 + 500);
        } else if (step.kind === "tool" && !step.dryRun) {
          const t0 = performance.now();
          const text = await runTool(step.name).catch((e: Error) => `Error: ${e.message}`);
          if (cancelled) return;
          setResults((r) => ({ ...r, [i]: { ms: Math.round(performance.now() - t0), text } }));
          await sleep(300);
        } else {
          await sleep(900);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [inView, scenario, run, runTool]);

  return (
    <div ref={ref} className="grid lg:grid-cols-[260px_1fr] gap-6">
      <div className="flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0">
        {scenarios.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => play(i)}
            className={`shrink-0 text-left px-5 py-4 rounded-xl border transition-colors ${
              i === active ? "border-brand-accent/50 bg-brand-accent/10" : "border-white/5 bg-white/[0.02] hover:border-white/20"
            }`}
          >
            <span className="block text-[10px] font-orbitron font-bold tracking-[0.2em] uppercase text-brand-accent mb-1">{s.persona}</span>
            <span className="block text-sm text-white/80">{s.title}</span>
          </button>
        ))}
      </div>

      <div className="min-w-0 rounded-2xl border border-white/10 bg-brand-gray/60 overflow-hidden">
        <div className="flex items-center justify-between gap-4 px-5 py-3 border-b border-white/5 text-[10px] uppercase tracking-[0.2em] font-bold text-white/40">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-accent" />
            <span className="hidden sm:inline">Your agent ·</span> connected to <span className="text-brand-accent normal-case tracking-normal font-mono">zaid</span>
          </span>
          <button type="button" onClick={() => play(active)} className="flex items-center gap-2 hover:text-brand-accent transition-colors">
            <RotateCcw size={12} /> Replay
          </button>
        </div>
        <div className="p-5 md:p-8 space-y-5 min-h-[520px]">
          {scenario.steps.slice(0, shown).map((step, i) => (
            <StepView key={`${scenario.id}-${run}-${i}`} step={step} result={results[i]} />
          ))}
        </div>
        <p className="px-5 py-3 border-t border-white/5 text-xs text-white/35">
          Tool calls are live: expand one for the real response. Agent replies are scripted.
        </p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Small UI pieces
// ---------------------------------------------------------------------------

function CopyButton({ text, label }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      aria-label={label ?? "Copy to clipboard"}
      onClick={() =>
        navigator.clipboard.writeText(text).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        })
      }
      className="shrink-0 inline-flex items-center gap-2 px-3 py-2 text-[10px] font-orbitron font-bold tracking-[0.2em] uppercase text-brand-accent border border-brand-accent/30 hover:bg-brand-accent/10 transition-colors"
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
      {label && <span>{copied ? "Copied" : label}</span>}
    </button>
  );
}

// Code with a header bar: wraps instead of scrolling sideways.
function Snippet({ label, code, shell }: { label: string; code: string; shell?: boolean }) {
  return (
    <div className="rounded-xl border border-white/10 bg-brand-black overflow-hidden">
      <div className="flex items-center justify-between gap-4 pl-4 pr-2 py-2 border-b border-white/5">
        <span className="text-[11px] font-mono text-white/40">{label}</span>
        <CopyButton text={code} label="Copy" />
      </div>
      <pre className="p-4 md:p-5 whitespace-pre-wrap [overflow-wrap:anywhere] font-mono text-[13px] md:text-base leading-relaxed text-white/90">
        {shell && <span className="text-brand-accent select-none">$ </span>}
        {code}
      </pre>
    </div>
  );
}

function InstallButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-3 px-6 py-4 bg-brand-accent text-brand-black text-[11px] font-orbitron font-bold tracking-[0.2em] uppercase hover:bg-white transition-colors"
    >
      {children} <ExternalLink size={14} />
    </a>
  );
}

function Steps({ steps }: { steps: string[] }) {
  return (
    <ol className="grid sm:grid-cols-3 gap-3 mb-6">
      {steps.map((step, i) => (
        <li key={step} className="flex items-center gap-3 p-4 rounded-xl border border-white/5 bg-brand-black text-sm text-white/80">
          <span className="shrink-0 w-6 h-6 rounded-full bg-brand-accent/15 text-brand-accent text-xs font-bold flex items-center justify-center">
            {i + 1}
          </span>
          {step}
        </li>
      ))}
    </ol>
  );
}

function Note({ children }: { children: ReactNode }) {
  return <p className="mt-4 text-sm text-white/40 leading-relaxed">{children}</p>;
}

const clients: { name: string; panel: ReactNode }[] = [
  {
    name: "Claude",
    panel: (
      <>
        <Steps steps={["Settings → Connectors", "Add custom connector", "Name it zaid, paste the URL"]} />
        <Snippet label="connector URL" code={ENDPOINT} />
        <p className="mt-8 mb-4 text-sm text-white/60">Using Claude Code?</p>
        <Snippet label="terminal" code={CLAUDE_CODE} shell />
      </>
    ),
  },
  {
    name: "ChatGPT",
    panel: (
      <>
        <Steps steps={["Settings → Apps & Connectors → Advanced → Developer mode on", "Create a connector, paste the URL", "Authentication: No auth"]} />
        <Snippet label="connector URL" code={ENDPOINT} />
        <Note>Developer mode is available on Plus, Pro, Business and Enterprise plans.</Note>
      </>
    ),
  },
  {
    name: "Gemini",
    panel: (
      <>
        <Snippet label="Gemini CLI" code={GEMINI_CLI} shell />
        <Note>In the Gemini app, where custom apps are available: Settings & help → Connected Apps → Add a custom app, then paste the URL.</Note>
      </>
    ),
  },
  {
    name: "Grok",
    panel: (
      <>
        <Steps steps={["Open grok.com/connectors", "New Connector → Custom", "Paste the URL"]} />
        <Snippet label="connector URL" code={ENDPOINT} />
      </>
    ),
  },
  {
    name: "Cursor & VS Code",
    panel: (
      <>
        <p className="text-white/60 mb-6">One click. Your editor asks you to confirm.</p>
        <div className="flex flex-wrap gap-3">
          <InstallButton href={CURSOR_LINK}>Add to Cursor</InstallButton>
          <InstallButton href={VSCODE_LINK}>Add to VS Code</InstallButton>
        </div>
      </>
    ),
  },
  {
    name: "Other",
    panel: (
      <>
        <p className="text-white/60 mb-6">Any MCP client that speaks Streamable HTTP.</p>
        <Snippet label="mcp.json" code={JSON_CONFIG} />
      </>
    ),
  },
];

function Connect() {
  const [active, setActive] = useState(0);

  return (
    <div className="max-w-4xl">
      <div role="tablist" aria-label="MCP client" className="flex flex-wrap gap-2">
        {clients.map(({ name }, i) => (
          <button
            key={name}
            type="button"
            role="tab"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            className={`px-5 py-2.5 rounded-full border text-sm transition-colors ${
              i === active
                ? "bg-brand-accent border-brand-accent text-brand-black font-semibold"
                : "border-white/10 text-white/60 hover:text-white hover:border-white/30"
            }`}
          >
            {name}
          </button>
        ))}
      </div>

      <motion.div
        key={active}
        role="tabpanel"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="mt-6 -mx-6 sm:mx-0 p-5 md:p-10 sm:rounded-2xl border-y sm:border border-white/10 bg-white/[0.02]"
      >
        {clients[active].panel}
        <p className="mt-8 pt-6 border-t border-white/5 text-sm text-white/40">
          Then ask: <span className="text-white/80">"What is Zaid working on right now?"</span>
        </p>
      </motion.div>
    </div>
  );
}

function StatusPill({ status, latency }: { status: Status; latency?: number }) {
  const color = status === "online" ? "bg-brand-accent" : status === "offline" ? "bg-red-500" : "bg-yellow-400";
  return (
    <span className="inline-flex items-center gap-2 text-[10px] font-orbitron font-bold tracking-[0.2em] uppercase text-white/70 whitespace-nowrap">
      <span className={`w-2 h-2 rounded-full ${color} ${status === "offline" ? "" : "animate-pulse"}`} />
      {status}
      {status === "online" && latency !== undefined && <span className="text-white/40">{latency}ms</span>}
    </span>
  );
}

function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  className = "",
}: {
  id: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`py-24 md:py-32 px-6 scroll-mt-16 ${className}`}>
      <div className="container mx-auto max-w-6xl">
        <p className="text-brand-accent text-xs font-bold uppercase tracking-[0.4em] mb-4">{eyebrow}</p>
        <h2 className="text-3xl md:text-5xl font-heading font-bold tracking-tight mb-6">{title}</h2>
        {intro && <p className="text-white/60 text-lg max-w-2xl mb-14 font-light leading-relaxed">{intro}</p>}
        {children}
      </div>
    </section>
  );
}

// Fades the cropped portrait into the background on the sides and bottom.
const PORTRAIT_FADE =
  "linear-gradient(to right, transparent, black 18%, black 82%, transparent), linear-gradient(to bottom, black 55%, transparent)";

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export function Agents() {
  const mcp = useMcp();
  const { status, runTool } = mcp;
  const logRef = useRef<HTMLDivElement>(null);
  const [me, setMe] = useState<{ ms: number; fields: [string, string][] }>();

  useEffect(() => {
    document.title = "MCP Server | Mohd Zaid";
  }, []);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [mcp.log]);

  // Hero card shows a real get_profile response: how an agent sees me.
  useEffect(() => {
    if (status !== "online") return;
    const t0 = performance.now();
    runTool("get_profile")
      .then((text) => {
        const p = JSON.parse(text);
        setMe({
          ms: Math.round(performance.now() - t0),
          fields: [
            ["name", p.name],
            ["role", p.role],
            ["current", p.current.company],
          ],
        });
      })
      .catch(() => {});
  }, [status, runTool]);

  return (
    <>
      <nav className="fixed top-0 inset-x-0 z-50 bg-brand-black/90 backdrop-blur border-b border-white/5">
        <div className="container mx-auto px-4 md:px-8 py-4 flex justify-between items-center gap-6">
          <a href="/" className="flex items-center gap-3 group">
            <span className="w-6 h-6 md:w-8 md:h-8">
              <Logo className="group-hover:scale-105 transition-transform" />
            </span>
            <span className="font-orbitron font-extrabold text-lg md:text-xl tracking-tighter text-white group-hover:text-brand-accent transition-colors pt-1">
              ZAID
            </span>
            <span className="font-mono text-sm text-brand-accent pt-1">/mcp</span>
          </a>
          <div className="hidden lg:flex gap-10 text-[10px] font-bold tracking-[0.3em] uppercase">
            <a className="nav-link-bracket" href="#use-cases">Use cases</a>
            <a className="nav-link-bracket" href="#console">Live console</a>
            <a className="nav-link-bracket" href="#connect">Connect</a>
          </div>
          <StatusPill status={status} latency={mcp.latency} />
        </div>
      </nav>

      <main className="bg-brand-black">
        {/* Hero */}
        <header className="relative pt-20 lg:pt-28 px-6 overflow-hidden lg:min-h-screen lg:flex lg:items-end">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" aria-hidden="true">
            <span
              className="font-hero-bg text-[45vw] lg:text-[420px] leading-none tracking-tighter text-transparent opacity-[0.12] whitespace-nowrap"
              style={{ WebkitTextStroke: "1px rgba(255, 255, 255, 0.6)" }}
            >
              ZAID
            </span>
          </div>
          <div className="absolute top-1/4 right-0 w-[600px] max-w-full h-[600px] bg-brand-accent/10 rounded-full blur-[140px] pointer-events-none" />

          <div className="container mx-auto max-w-6xl relative grid lg:grid-cols-[1.15fr_0.85fr] items-end gap-8 lg:gap-12 w-full">
            <div className="lg:pb-32">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-brand-accent text-xs font-bold uppercase tracking-[0.25em] md:tracking-[0.4em] mb-6"
              >
                {profile.name} · {profile.role}
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-7xl font-heading font-bold tracking-tighter leading-[0.95] mb-8"
              >
                Don't read my portfolio.
                <br />
                <span className="text-brand-accent">Query it.</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg md:text-xl text-white/60 max-w-xl font-light leading-relaxed mb-10"
              >
                My portfolio is a live MCP server. Plug in your agent and ask it about my work.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row sm:items-center gap-4 max-w-xl p-3 pl-5 border border-brand-accent/30 bg-brand-darker/80 rounded-xl"
              >
                <StatusPill status={status} latency={mcp.latency} />
                <code className="flex-1 min-w-0 truncate font-mono text-sm md:text-base text-white">{ENDPOINT}</code>
                <CopyButton text={ENDPOINT} label="Copy URL" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-8 mt-10 text-[11px] font-orbitron font-bold tracking-[0.2em] uppercase"
              >
                <a href="#connect" className="text-brand-accent hover:text-white transition-colors">
                  Connect your agent →
                </a>
                <a href="#use-cases" className="text-white/50 hover:text-white transition-colors">
                  See it in action ↓
                </a>
              </motion.div>
            </div>

            <div className="relative order-first lg:order-none h-[380px] md:h-[600px] lg:h-[calc(100vh-7rem)] lg:max-h-[780px]">
              <img
                src="/Portrait.webp"
                alt={profile.name}
                className="absolute inset-0 h-full w-full object-cover object-top grayscale"
                style={{ maskImage: PORTRAIT_FADE, WebkitMaskImage: PORTRAIT_FADE, maskComposite: "intersect", WebkitMaskComposite: "source-in" }}
              />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="hidden md:block absolute bottom-10 left-0 lg:-left-16 w-72 rounded-xl border border-brand-accent/30 bg-brand-black/85 backdrop-blur p-4 font-mono text-xs shadow-2xl"
              >
                <div className="flex items-center justify-between mb-3 text-white/40">
                  <span>
                    <span className="text-brand-accent">←</span> get_profile
                  </span>
                  {me ? <span>{me.ms}ms</span> : <LoaderCircle size={12} className="animate-spin" />}
                </div>
                <pre className="text-white/50 leading-relaxed whitespace-pre-wrap">
                  {"{\n"}
                  {(me?.fields ?? []).map(([key, value], i, all) => (
                    <span key={key}>
                      {"  "}
                      <span className="text-white/70">"{key}"</span>: <span className="text-brand-accent">"{value}"</span>
                      {i < all.length - 1 ? ",\n" : "\n"}
                    </span>
                  ))}
                  {"}"}
                </pre>
                <p className="mt-3 pt-3 border-t border-white/5 font-orbitron text-[9px] font-bold tracking-[0.2em] uppercase text-white/40">
                  How your agent sees me
                </p>
              </motion.div>
            </div>
          </div>
        </header>

        {/* Use cases */}
        <Section
          id="use-cases"
          eyebrow="01. Use cases"
          title="What your agent can do with it."
          intro="Pick a scenario. The tool calls are real."
          className="bg-brand-darker"
        >
          <ScenarioPlayer runTool={runTool} />
        </Section>

        {/* Live console */}
        <Section
          id="console"
          eyebrow="02. Live console"
          title="Watch the protocol."
          intro="Your browser connected when this page loaded. Run a tool and see the raw traffic."
        >
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              {status === "connecting" && <p className="text-sm text-white/40">Connecting…</p>}
              {status === "offline" && <p className="text-sm text-red-400">Server unreachable right now.</p>}
              {mcp.tools.map((t) => {
                const needsArgs = (t.inputSchema.required?.length ?? 0) > 0;
                const readOnly = t.annotations?.readOnlyHint;
                return (
                  <div key={t.name} className="p-5 rounded-xl border border-white/10 bg-white/[0.02]">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <code className="font-mono text-sm text-brand-accent">{t.name}</code>
                      <span
                        className={`text-[9px] font-bold uppercase tracking-[0.2em] px-2 py-0.5 rounded-full border ${
                          readOnly ? "border-white/15 text-white/50" : "border-yellow-300/40 text-yellow-200/80"
                        }`}
                      >
                        {readOnly ? "read-only" : "sends email"}
                      </span>
                      {needsArgs ? (
                        <span className="ml-auto text-[10px] text-white/30">from your agent</span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => void runTool(t.name).catch(() => {})}
                          className="ml-auto inline-flex items-center gap-2 px-3 py-1.5 text-[10px] font-orbitron font-bold tracking-[0.2em] uppercase text-brand-accent border border-brand-accent/30 hover:bg-brand-accent/10 transition-colors"
                        >
                          <Play size={12} /> Run
                        </button>
                      )}
                    </div>
                    <p className="text-sm text-white/60 leading-relaxed">{t.description}</p>
                  </div>
                );
              })}
              {mcp.prompts.map((p) => (
                <div key={p.name} className="p-5 rounded-xl border border-white/10 bg-white/[0.02]">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <code className="font-mono text-sm text-brand-accent">{p.name}</code>
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] px-2 py-0.5 rounded-full border border-brand-accent/30 text-brand-accent/80">
                      prompt
                    </span>
                  </div>
                  <p className="text-sm text-white/60 leading-relaxed">{p.description}</p>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-white/10 bg-brand-darker overflow-hidden flex flex-col lg:sticky lg:top-24 lg:self-start">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
                <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                <span className="ml-3 min-w-0 truncate text-[10px] font-mono text-white/40">POST {ENDPOINT}</span>
              </div>
              <div ref={logRef} className="h-[480px] overflow-y-auto p-3 space-y-0.5 font-mono text-xs">
                {mcp.log.map((e) => (
                  <details key={e.id} className="group">
                    <summary className="flex items-center gap-3 px-2 py-1 rounded cursor-pointer list-none [&::-webkit-details-marker]:hidden hover:bg-white/[0.03]">
                      <span className={e.out ? "text-white/40" : "text-brand-accent"}>{e.out ? "→" : "←"}</span>
                      <span className={`min-w-0 truncate ${e.out ? "text-white/85" : "text-white/55"}`}>{e.label}</span>
                      {e.ms !== undefined && <span className="ml-auto shrink-0 text-white/30">{e.ms}ms</span>}
                    </summary>
                    <pre className="ml-6 my-1 p-3 rounded bg-white/[0.03] text-white/50 whitespace-pre-wrap break-all max-h-60 overflow-auto">
                      {e.data === null ? "(no body)" : JSON.stringify(e.data, null, 2)}
                    </pre>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* Connect */}
        <Section id="connect" eyebrow="03. Connect" title="Plug in your agent." intro="Pick your client. No auth, no install." className="bg-brand-darker">
          <Connect />
        </Section>

        {/* CTA */}
        <section className="py-32 px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-heading font-extrabold tracking-tighter mb-8">Need this for your product?</h2>
          <p className="text-lg text-white/60 font-light max-w-xl mx-auto mb-12">I build MCP servers and agents that plug into what you already run.</p>
          <div className="flex flex-wrap justify-center gap-8 text-[11px] font-orbitron font-bold tracking-[0.2em] uppercase">
            <a href={`mailto:${profile.email}`} className="text-brand-accent hover:text-white transition-colors">
              {profile.email}
            </a>
            <a href="/" className="text-white/50 hover:text-white transition-colors">
              ← Back to portfolio
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
