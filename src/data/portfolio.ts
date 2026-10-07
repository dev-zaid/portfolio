// Single source of truth for portfolio content.
// Rendered by the React sections and served to agents by api/mcp.ts.
// Fields the site doesn't render (location, type, tech, details, source, current.highlights)
// and everything below "Agent-only" exist for the MCP server. Every claim must match resume.pdf.

export const profile = {
  name: "Mohd Zaid",
  role: "Applied AI Engineer",
  tagline: "I build AI agents and the production systems they run on.",
  current: {
    company: "General Machines",
    link: "https://generalmachines.ai/",
    role: "Forward Deployed Engineer",
    period: "Sept 2026 — Present",
    location: "Bangalore, India",
    focus: "Agentic commerce: researching how AI agents find, compare and buy from online stores, and auditing stores for agent readiness.",
    highlights: [
      "Built shop-harness (Python, Ollama, Shopify UCP MCP), an agent that shops live Shopify stores and pays: 300+ traced runs across 7 stores.",
      "Wrote the rules and checkout gate that re-check every cart in code, cut store replies ~45x, and graded runs on 13 hand-written tasks.",
      "Built checkout-sandbox, a Python service that charges real Shopify carts in Stripe test mode with shared payment tokens capped at the approved total.",
      "Added cart re-pricing, idempotent retries and fault injection (declines, 3DS, expired tokens); 19 live acceptance checks pass on Stripe.",
    ],
    tech: ["Python", "LLM agents", "Ollama", "MCP", "Shopify UCP", "Stripe", "Evals"],
  },
  about: [
    "These days that means LLM-powered agents doing real work inside real businesses. I'm currently working on General Machines, on the agentic commerce side: researching how agents find, compare and buy from online stores, and auditing stores to see where agents get stuck.",
    "Before this I shipped production software for startups in Go, TypeScript and Python, starting in college. I was a founding engineer twice: full-stack at Trench, a real-time trading platform, and distributed systems at DEnergy Networks, running services across 50+ live nodes.",
    "That is how I work with AI too: sit with the people who have the problem, scope it with them, integrate with whatever they already run, and stay until it works in production.",
  ],
  email: "mohdzaid2904@gmail.com",
  links: {
    github: "https://github.com/dev-zaid",
    linkedin: "https://linkedin.com/in/dev-zaid",
    leetcode: "https://leetcode.com/u/dev-zaid",
    resume: "/resume.pdf",
  },
};

export const metrics = [
  { value: "10M+", label: "Live Records Streamed", source: "Trench: Redis Pub/Sub + PostgreSQL real-time pipeline" },
  { value: "5K+", label: "End Users Served", source: "OD Automation: university leave-approval system, team of 4 he led" },
  { value: "70%", label: "Faster Processing", source: "OD Automation: digital signatures replaced paper approvals" },
  { value: "3", label: "Hackathons Won", source: "Hackverse 2024, Layer 2.0 2024, MesoHacks 2022" },
];

export const experience = [
  {
    period: "Jan 2025 — Sept 2026",
    company: "DEnergy Networks",
    link: "https://d.energy",
    role: "Founding Engineer, Distributed Systems",
    location: "Ras Al-Khaimah, UAE (remote)",
    highlights: [
      "Owned Go backend services running across 50+ live nodes, including production incident debugging.",
      "Partnered with external auditors (CertiK) on a 50K+ LOC security audit while holding 98% test coverage.",
      "Worked across QA, security and research teams in multiple time zones; shipped a ~30% throughput gain.",
    ],
    details: [
      "Built an EVM-compatible Layer-1 blockchain forked from Evmos (Go, Cosmos SDK, CometBFT) with custom modules for energy tracking and staking rewards; took it from testnet to a live mainnet on 50+ nodes.",
      "Built LLM agentic skills to automate testing of new features and handle releases; guided peers on cutting token usage and managing context.",
      "Fixed production issues on the live network: a network halt, a consensus fork between binary versions, a memory leak on public RPC nodes and a reward accounting bug.",
      "Shipped 7 on-chain upgrades to mainnet without downtime, timed with the validator set and validated with security auditors before each release.",
      "Wrote integration tests for the staking, rewards and epoch modules (verified with mutation testing) and automated releases with Bash and GitHub Actions.",
    ],
    tech: ["Go", "Cosmos SDK", "CometBFT", "EVM", "LLM agents", "Bash", "GitHub Actions"],
  },
  {
    period: "Dec 2024 — June 2025",
    company: "Trench",
    link: "https://trench.ag",
    role: "Founding Full-Stack Engineer",
    highlights: [
      "Took a real-time trading platform from zero to 1,000+ concurrent users at sub-100ms latency.",
      "Built REST APIs and a Redis Pub/Sub + PostgreSQL pipeline streaming 10M+ live records; partitioning cut heavy query times ~40%.",
      "Coordinated API integration and testing between backend and frontend to ship fast.",
    ],
    details: ["The product: a real-time wallet and token data platform. APIs in Express + TypeScript; pg_partman partitioning on PostgreSQL."],
    tech: ["TypeScript", "Express", "Redis Pub/Sub", "PostgreSQL", "pg_partman"],
  },
  {
    period: "Aug 2023 — July 2024",
    company: "Mable",
    link: "https://mable.ai/",
    role: "Software Development Engineer (Intern)",
    location: "Karlsruhe, Germany (remote)",
    highlights: [
      "Built RabbitMQ pipelines ingesting Facebook Ads and Pinterest API data streams.",
      "Cut query latency from 2s to 500ms with PostgreSQL partitioning.",
      "Shipped Redis-cached REST APIs serving 100K+ daily requests at sub-10ms.",
    ],
    details: [
      "Built RBAC authentication for an internal DB API with Casbin and chi middleware, from access policies to a tested POC.",
      "Wrote unit, integration and functional tests in Go and TypeScript, reaching ~95% coverage; helped debug event drops across the distributed system.",
      "Took part in code reviews and sprint planning.",
    ],
    tech: ["Go", "TypeScript", "PostgreSQL", "Redis", "RabbitMQ", "Casbin"],
  },
];

export const projects = [
  {
    title: "General Machines",
    desc: "Data and evaluation infrastructure for frontier AI: datasets, evals and benchmarks for AI agents operating across the web, and for physical AI. I work on the agentic commerce side, measuring how agents find, compare and buy from real online stores.",
    tech: ["AI Agents", "Evals", "Agentic Commerce"],
    images: ["/GeneralMachines/card.svg"],
    link: "https://generalmachines.ai/",
    current: true,
  },
  {
    title: "PyREX Agentic Payments",
    desc: "Agent-driven routing for cross-border payments. AI agents read each payment request and split the amount across exchange paths in real time, weighing liquidity, price and availability to cut conversion loss. Includes agent-managed orderbook matching and settlement.",
    tech: ["Python", "AI Agents", "Payment Routing"],
    details: "Multi-agent routing; orderbook management in Node.js + PostgreSQL; PYUSD stablecoin settlement.",
    images: ["/Pyrex/project_pyrex.webp", "/Pyrex/pyrex-02.webp"],
    link: "#",
  },
  {
    title: "OD Automation SRM",
    desc: "Led a team of 4 to digitize SRM's leave approval workflow for 5,000+ users. Digital signatures cut processing time by 70%, CI/CD took releases from 2 hours to 15 minutes, and we shipped 2 weeks early.",
    tech: ["Node.js", "TypeScript", "Docker", "Mongo DB"],
    images: [
      "/OD ML Automation/Home page.webp",
      "/OD ML Automation/View all Applications.webp",
      "/OD ML Automation/View Application.webp",
      "/OD ML Automation/Create Application.webp",
    ],
    link: "#",
  },
  {
    title: "Real-Time Event Indexer",
    desc: "Real-time indexer for an Aptos NFT marketplace processing 10M+ transactions a day, written in Python. Hash indexing cut retrieval from O(n²) to O(n).",
    tech: ["Python", "PostgreSQL"],
    images: ["/backend_indexer.png"],
    link: "#",
  },
];

export const skills: Record<string, string[]> = {
  "Languages & AI": ["Python", "TypeScript", "Go", "LLMs", "AI Agents", "Tool Calling"],
  "Agentic protocols": ["MCP", "UCP", "ACP", "AP2", "Stripe Agentic Payments", "Agentic Workflows"],
  Systems: ["Structured Data", "API Integrations", "PostgreSQL", "Redis", "Docker", "AWS", "gRPC", "WebSockets"],
};

// ---------------------------------------------------------------------------
// Agent-only: served by the MCP server, not rendered on the site.
// ---------------------------------------------------------------------------

export const career = {
  status: "Open to conversations about the right role.",
  experience:
    "1+ year of professional experience, counted from graduation in May 2025. Before that, through his final two years of college (Aug 2023 – May 2025), he worked with startups to bring their ideas to life, to industry standards: a remote internship at Mable, then founding engineer at Trench and DEnergy Networks (DEnergy continued after graduation, to Sept 2026). Since Sept 2026 he has been at General Machines, researching agentic commerce.",
  basedIn: "India",
  openTo: [
    "Remote, including across time zones (has worked remotely for teams in Germany and the UAE)",
    "Onsite or hybrid anywhere in India; will relocate",
    "Relocation abroad (would need visa sponsorship)",
  ],
  targetRoles: [
    "Applied AI / AI Engineer (LLM agents, tool calling, evals)",
    "Forward Deployed Engineer",
    "Founding or early-stage Software Engineer",
    "Backend Engineer (Go, Python, TypeScript)",
    "Full-Stack Engineer",
    "Distributed Systems Engineer",
  ],
  pitch: {
    startups:
      "Worked with startups through college to bring their ideas to life, twice as a founding engineer: takes an idea from zero to a product in production and owns the whole service, from scoping with users to architecture, shipping and running it in production.",
    largeCompanies:
      "Brings production discipline from live systems: incident response on a 50+ node network, zero-downtime upgrades, external security audits, ~95–98% test coverage, CI/CD, code reviews and sprint planning, on distributed teams across time zones.",
  },
  spokenLanguages: ["English", "Hindi", "Tamil"],
};

export const strengths = [
  {
    strength: "Takes products from zero to production and owns them end to end",
    evidence: [
      "DEnergy Networks (founding engineer): took an EVM-compatible Layer-1 from testnet to a live mainnet on 50+ nodes, then ran it in production, incidents included.",
      "Trench (founding full-stack engineer): built a real-time trading platform from zero to 1,000+ concurrent users at sub-100ms latency.",
      "General Machines: built shop-harness (an agent that shops and pays on live Shopify stores) and checkout-sandbox (Stripe test-mode checkout service).",
    ],
  },
  {
    strength: "Ships LLM agents that do real work, and measures them",
    evidence: [
      "shop-harness: 300+ traced runs across 7 live stores, graded on 13 hand-written tasks; a checkout gate re-checks every cart in code.",
      "PyREX: multi-agent routing for cross-border payments.",
      "DEnergy: built LLM agentic skills that automate feature testing and releases; guided peers on token usage and context management.",
    ],
  },
  {
    strength: "Production reliability and incident response",
    evidence: [
      "DEnergy: fixed a network halt, a consensus fork between binary versions, a memory leak on public RPC nodes and a reward accounting bug on the live network.",
      "DEnergy: shipped 7 mainnet upgrades with zero downtime, validated with security auditors before each release.",
    ],
  },
  {
    strength: "Engineering rigor: testing, security, CI/CD",
    evidence: [
      "DEnergy: CertiK security audit of 50K+ LOC at 98% test coverage; integration tests verified with mutation testing; releases automated with Bash and GitHub Actions.",
      "Mable: ~95% test coverage in Go and TypeScript; RBAC auth with Casbin; code reviews and sprint planning.",
      "checkout-sandbox: idempotent retries, cart re-pricing and fault injection (declines, 3DS, expired tokens); 19 live acceptance checks pass on Stripe.",
    ],
  },
  {
    strength: "Performance at scale",
    evidence: [
      "Mable: PostgreSQL partitioning cut query latency from ~2s to ~500ms; Redis-cached APIs served 100K+ daily requests at sub-10ms.",
      "Trench: Redis Pub/Sub + PostgreSQL streaming 10M+ live records; partitioning cut heavy query time ~40%.",
      "DEnergy: ~30% throughput gain.",
    ],
  },
  {
    strength: "Works across teams, time zones and functions",
    evidence: [
      "Remote for teams in Germany (Mable) and the UAE (DEnergy).",
      "DEnergy: worked with QA, security and research teams across time zones, external auditors (CertiK) and the validator set.",
      "Led a team of 4 to ship OD Automation for 5,000+ university users two weeks early.",
    ],
  },
];

export const skillEvidence = [
  { skill: "Python", usedAt: "General Machines (shop-harness, checkout-sandbox), Aptos NFT indexer, PyREX" },
  { skill: "Go (Golang)", usedAt: "DEnergy (Cosmos SDK network on 50+ nodes), Mable (RBAC with Casbin and chi, tests)" },
  { skill: "TypeScript / JavaScript", usedAt: "Trench (Express APIs), Mable (tests), OD Automation, Datalync, this portfolio and its MCP server" },
  { skill: "Node.js / Express", usedAt: "Trench, OD Automation, Datalync, PyREX orderbook" },
  { skill: "LLMs, AI agents, tool calling", usedAt: "General Machines (shopping agent), PyREX (multi-agent routing), DEnergy (agentic skills for testing and releases)" },
  { skill: "Agent evals", usedAt: "General Machines: 300+ traced runs graded on 13 hand-written tasks" },
  { skill: "MCP (Model Context Protocol)", usedAt: "General Machines (agent built on Shopify UCP MCP); built this portfolio's remote MCP server" },
  { skill: "UCP", usedAt: "General Machines shop-harness" },
  { skill: "ACP, AP2", usedAt: "Listed on resume; no standalone project cited" },
  { skill: "Payments (Stripe, Razorpay)", usedAt: "General Machines checkout-sandbox (Stripe test mode, shared payment tokens), Datalync (Razorpay), PyREX (cross-border routing, PYUSD settlement)" },
  { skill: "Ollama / local models", usedAt: "General Machines shop-harness" },
  { skill: "PostgreSQL", usedAt: "Mable (pg_partman partitioning, 2s → 500ms), Trench (streaming, partitioning), PyREX, Aptos indexer" },
  { skill: "Redis", usedAt: "Mable (caching, sub-10ms at 100K+ daily requests), Trench (Pub/Sub)" },
  { skill: "MongoDB", usedAt: "OD Automation" },
  { skill: "RabbitMQ, event-driven pipelines", usedAt: "Mable (Facebook Ads and Pinterest API ingestion)" },
  { skill: "Distributed systems, consensus", usedAt: "DEnergy: Cosmos SDK / CometBFT network on 50+ nodes; fixed a consensus fork and a network halt" },
  { skill: "gRPC / protobuf", usedAt: "Listed on resume; Cosmos SDK (DEnergy) is gRPC/protobuf-based" },
  { skill: "WebSockets", usedAt: "Listed on resume; no specific project cited" },
  { skill: "React, Next.js, Tailwind", usedAt: "Datalync (React + TypeScript), this portfolio (React + Tailwind)" },
  { skill: "Docker, CI/CD, GitHub Actions, Bash", usedAt: "DEnergy (release automation), OD Automation (Docker; releases 2h → 15 min)" },
  { skill: "AWS (EC2, S3, ALB, RDS)", usedAt: "Listed on resume; no specific project cited" },
  { skill: "Terraform", usedAt: "Familiar; no production use cited" },
  { skill: "Testing (unit, integration, mutation)", usedAt: "DEnergy (98% coverage, mutation testing), Mable (~95% coverage in Go and TypeScript)" },
  { skill: "Security and auth", usedAt: "DEnergy (CertiK audit, 50K+ LOC), Mable (RBAC with Casbin), Datalync (JWT single-device auth)" },
  { skill: "Solidity / EVM", usedAt: "Otaku Verse (hackathon winner), DEnergy (EVM-compatible chain)" },
  { skill: "C / C++, DSA, OS", usedAt: "CS degree coursework, Coursera certification, LeetCode" },
];

export const moreProjects = [
  {
    title: "This portfolio's MCP server",
    desc: "Remote MCP server (Streamable HTTP, TypeScript, MCP SDK) on Vercel: agents read his profile, evaluate job fit and send him rate-limited email.",
    link: "https://devzaid.in/agents",
  },
  {
    title: "Datalync",
    desc: "Full-stack ed-tech platform (React, TypeScript, Node.js) with Razorpay payments and JWT single-device auth; 100+ concurrent users.",
  },
  {
    title: "Otaku Verse",
    desc: "Anime streaming with rank-based NFT rewards on Shardeum (Solidity, EVM). Best DApp at the Layer 2.0 hackathon.",
  },
];

export const education = {
  school: "SRM University (Kattankulathur campus), Tamil Nadu",
  degree: "B.Tech, Computer Science and Engineering",
  period: "July 2021 — May 2025",
  gpa: "8.86 / 10",
  awards: ["Best DApp Winner, Hackverse (Apr 2024)", "Best DApp Builder, Layer 2.0 (Mar 2024)", "Best Open Innovation, MesoHacks (Sept 2022)"],
  certifications: ["C for Everyone: Programming Fundamentals (Coursera)", "Web Application Technologies and Django (Coursera)"],
};
