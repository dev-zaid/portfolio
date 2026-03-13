import { motion } from "framer-motion";

export function Experience() {
  const experiences = [
    {
      year: "2025 — PRESENT",
      company: "DEnergy Networks",
      role: "Lead Blockchain Developer",
      details: [
        "Implemented protocol-level dual staking (token + NFT) improving validator throughput by 30%.",
        "Built EVM Go precompiles to expose staking/NFT primitives to smart contracts.",
        "Led security audits with CertiK for 50K+ LOC with 98% test coverage.",
      ],
    },
    {
      year: "2024 — 2025",
      company: "Trench",
      role: "Founding Full-Stack Engineer",
      details: [
        "Built real-time trading platform serving 1,000+ concurrent users with sub-100ms latency.",
        "Architected event-driven APIs handling 15M+ daily events using optimized PostgreSQL.",
      ],
    },
    {
      year: "2024",
      company: "Avex",
      role: "Backend & Blockchain Developer",
      details: [
        "Architected and launched an NFT Marketplace Indexer processing 1M+ daily transactions.",
        "Engineered User Positions Indexer achieving 18% faster data retrieval.",
      ],
    },
    {
      year: "2023 — 2024",
      company: "Mable",
      role: "Software Development Engineer",
      details: [
        "Implemented PostgreSQL table partitioning reducing query latency from 2s to 500ms.",
        "Designed RESTful APIs with Redis caching achieving sub-10ms response times for 100K+ daily requests.",
      ],
    },
  ];

  return (
    <section className="relative bg-brand-darker z-20" id="experience">
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-brand-black to-transparent pointer-events-none"></div>
      <div className="neon-path"></div>
      <div className="container mx-auto px-6 relative py-16">
        <div className="text-center w-full z-40 mb-36 ">
          <h2 className="text-brand-accent text-xs font-bold uppercase tracking-[0.6em] mb-4">
            02. Career
          </h2>
          <h3 className="text-4xl font-heading font-bold">Professional Journey</h3>
        </div>

        {experiences.map((exp, index) => {
          const isLeft = index % 2 === 0;
          return (
            <div key={index} className="exp-focus-wrapper my-36" style={{ perspective: "10000px" }}>
              <motion.div
                initial={{ opacity: 0.2, filter: "blur(8px)", scale: 0.85, x: isLeft ? -10 : 10 }}
                whileInView={{ opacity: 1, filter: "blur(0px)", scale: 1.2, x: 0 }}
                viewport={{ once: false, amount: 0.5, margin: "-20% 0px -20% 0px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`exp-content z-20 absolute w-full md:w-[45%] px-8 ${isLeft ? "left-0 text-right md:pr-16" : "right-0 text-left md:pl-16"}`}
              >
                <div className="neon-halo"></div>
                <p className="text-brand-accent font-orbitron text-xs tracking-widest mb-2">
                  {exp.year}
                </p>
                <h4 className="text-3xl md:text-5xl font-heading font-extrabold text-white mb-3">
                  {exp.company}
                </h4>
                <p className="text-brand-accent font-bold uppercase text-sm tracking-[0.2em] mb-6">
                  {exp.role}
                </p>
                <div className="space-y-3 text-white/60 text-sm md:text-base font-light leading-relaxed">
                  {exp.details.map((detail, i) => (
                    <p key={i}>{detail}</p>
                  ))}
                </div>
              </motion.div>
              <motion.div 
                initial={{ boxShadow: "0 0 10px #aaff00", scale: 1, opacity: 0.5 }}
                whileInView={{ boxShadow: "0 0 30px #aaff00", scale: 1.5, opacity: 1 }}
                viewport={{ once: false, amount: 0.5, margin: "-50%" }}
                transition={{ duration: 0.5 }}
                className="path-dot top-1/2"
              ></motion.div>
            </div>
          );
        })}
      </div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-brand-black to-transparent pointer-events-none"></div>
    </section>
  );
}
