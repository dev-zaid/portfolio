export function AgentCallout() {
  return (
    <section className="py-24 px-6 bg-brand-darker border-y border-white/5" id="agents">
      <div className="container mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-10">
        <div className="max-w-2xl">
          <h2 className="text-brand-accent text-xs font-bold uppercase tracking-[0.4em] mb-4">05. For Agents</h2>
          <h3 className="text-3xl md:text-5xl font-heading font-bold tracking-tight mb-6">This portfolio is also an MCP server.</h3>
          <p className="text-lg text-white/60 font-light leading-relaxed">
            Connect Claude, ChatGPT, Gemini, Grok or any agent and query my work directly: experience, projects, a fit check against your job
            description, or a message to my inbox.
          </p>
        </div>
        <a
          href="/agents"
          className="shrink-0 inline-flex items-center gap-3 px-6 py-4 bg-brand-accent text-brand-black text-[11px] font-orbitron font-bold tracking-[0.2em] uppercase hover:bg-white transition-colors"
        >
          Explore the MCP server →
        </a>
      </div>
    </section>
  );
}
