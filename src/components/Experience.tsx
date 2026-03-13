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
    <section className="relative bg-brand-darker z-20 overflow-hidden" id="experience">
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-brand-black to-transparent pointer-events-none z-30"></div>
      
      {/* Dual Neon Lines Container */}
      <div className="absolute inset-0 max-w-7xl mx-auto pointer-events-none z-10 w-full px-4 md:px-0">
        <div className="neon-path left"></div>
        <div className="neon-path right"></div>
      </div>

      <div className="container mx-auto px-6 relative py-16 z-20">
        <div className="text-center w-full z-40 mb-24 md:mb-36">
          <h2 className="text-brand-accent text-xs font-bold uppercase tracking-[0.6em] mb-4">
            02. Career
          </h2>
          <h3 className="text-4xl font-heading font-bold">Professional Journey</h3>
        </div>

        <div className="max-w-6xl mx-auto">
          {experiences.map((exp, index) => {
            const isLeft = index % 2 === 0;
            return (
              <div key={index} className="exp-focus-wrapper my-24 md:my-36" style={{ perspective: "10000px" }}>
                <motion.div
                  initial={{ opacity: 0.2, filter: "blur(8px)", scale: 0.85, x: isLeft ? -10 : 10 }}
                  whileInView={{ opacity: 1, filter: "blur(0px)", scale: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.3, margin: "-10% 0px -10% 0px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className={`exp-content relative z-20 w-[85%] md:w-[45%] mx-auto md:mx-0 p-6 md:p-8 bg-brand-gray/30 border border-white/5 backdrop-blur-md rounded-2xl ${
                    isLeft ? "md:mr-auto text-left" : "md:ml-auto text-left"
                  }`}
                >
                  <div className="neon-halo"></div>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                    <h4 className="text-2xl md:text-4xl font-heading font-extrabold text-white">
                      {exp.company}
                    </h4>
                    <p className="text-brand-accent font-orbitron text-[10px] sm:text-xs tracking-widest whitespace-nowrap bg-brand-accent/10 px-3 py-1 rounded-sm w-fit">
                      {exp.year}
                    </p>
                  </div>
                  <p className="text-brand-accent/80 font-bold uppercase text-xs tracking-[0.2em] mb-6">
                    {exp.role}
                  </p>
                  <div className="space-y-4 text-white/70 text-sm font-light leading-relaxed">
                    {exp.details.map((detail, i) => (
                      <div key={i} className="flex gap-3">
                        <span className="text-brand-accent/50 mt-1">▹</span>
                        <p>{detail}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
                
                {/* Dual Path Dots */}
                <motion.div 
                  initial={{ boxShadow: "0 0 10px #aaff00", scale: 1, opacity: 0.5 }}
                  whileInView={{ boxShadow: "0 0 30px #aaff00", scale: 1.5, opacity: 1 }}
                  viewport={{ once: false, amount: 0.5, margin: "-50%" }}
                  transition={{ duration: 0.5 }}
                  className="path-dot left top-1/2 -mt-1.5 hidden md:block"
                ></motion.div>
                <motion.div 
                  initial={{ boxShadow: "0 0 10px #aaff00", scale: 1, opacity: 0.5 }}
                  whileInView={{ boxShadow: "0 0 30px #aaff00", scale: 1.5, opacity: 1 }}
                  viewport={{ once: false, amount: 0.5, margin: "-50%" }}
                  transition={{ duration: 0.5 }}
                  className="path-dot right top-1/2 -mt-1.5 hidden md:block"
                ></motion.div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-brand-black to-transparent pointer-events-none z-30"></div>
    </section>
  );
}
