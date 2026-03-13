export function About() {
  return (
    <section className="py-32 px-6 container mx-auto relative z-20" id="about">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-brand-accent text-xs font-bold uppercase tracking-[0.4em] mb-12">
          01. Identity
        </h2>
        <div className="space-y-8">
          <h3 className="text-4xl md:text-6xl font-heading font-bold leading-tight">
            Building high-performance <span className="text-brand-accent">distributed systems</span> and secure blockchain protocols.
          </h3>
          <p className="text-white/70 leading-relaxed text-xl mx-auto max-w-2xl font-light">
            Blockchain / Protocol Engineer (Go, Cosmos SDK/Evmos, EVM) with 2+ years building L1 systems and high-throughput indexers. Currently leading core protocol development for an Evmos-based chain: dual staking (token + NFT), EVM precompiles, epoch/validator logic, and validator telemetry across 100+ nodes. Shipped production systems handling 1M–10M+ on-chain events/day.
          </p>
        </div>
      </div>
    </section>
  );
}
