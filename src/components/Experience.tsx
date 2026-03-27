import { motion } from "framer-motion";

export function Experience() {
  const experiences = [
    {
      year: "Jan 2025 — PRESENT",
      company: "DEnergy Networks",
      role: "Lead Software Engineer",
      details: [
        "Implemented high-throughput event processing layers, improving system validation speed by 30%.",
        "Built core Go services to expose distributed state primitives to client applications.",
        "Led system architecture reviews for 50K+ LOC with 98% test coverage.",
      ],
    },
    {
      year: "Dec 2024 — June 2025",
      company: "Trench",
      role: "Founding Full-Stack Engineer",
      details: [
        "Built real-time trading platform serving 1,000+ concurrent users with sub-100ms latency.",
        "Architected event-driven APIs handling 15M+ daily events using optimized PostgreSQL.",
      ],
    },
    {
      year: "Sept 2024 - Nov 2024",
      company: "Avex",
      role: "Backend Engineer",
      details: [
        "Architected and launched a distributed data indexer processing 1M+ daily transactions.",
        "Engineered User Positions Indexer achieving 18% faster data retrieval.",
      ],
    },
    {
      year: "Aug 2023 — July 2024",
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
      
      {/* Original Center Neon Line */}
      <div className="neon-path"></div>

      <div className="container mx-auto px-6 relative py-16 z-20">
        <div className="text-center w-full z-40 mb-36">
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
                  className={`exp-content z-20 relative md:absolute w-[90%] md:w-[45%] p-6 md:p-8 bg-brand-gray/40 md:bg-transparent border border-brand-accent/10 md:border-transparent backdrop-blur-lg md:backdrop-blur-none shadow-2xl md:shadow-none rounded-2xl mx-auto md:mx-0 ${
                    isLeft ? "md:left-0 text-left md:text-right md:pr-16" : "md:right-0 text-left md:pl-16"
                  }`}
                >
                  <p className="inline-block text-brand-accent font-orbitron text-[10px] md:text-xs tracking-widest mb-3 bg-brand-accent/5 px-2 py-1 rounded">
                    {exp.year}
                  </p>
                  <h4 className="text-2xl md:text-5xl font-heading font-extrabold text-white mb-2">
                    {exp.company}
                  </h4>
                  <p className="text-brand-accent/80 font-bold uppercase text-xs tracking-[0.2em] mb-6">
                    {exp.role}
                  </p>
                  <div className={`space-y-4 text-white/70 text-sm font-light leading-relaxed flex flex-col ${isLeft ? 'md:items-end' : 'md:items-start'}`}>
                    {exp.details.map((detail, i) => (
                      <div key={i} className={`flex gap-3 max-w-sm ${isLeft ? 'md:flex-row-reverse' : ''}`}>
                        <span className="text-brand-accent/50 mt-1 flex-shrink-0">▹</span>
                        <p className={`${isLeft ? 'md:text-right' : 'text-left'}`}>{detail}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
                
                {/* Original Center Path Dot */}
                <motion.div 
                  initial={{ boxShadow: "0 0 10px #aaff00", scale: 1, opacity: 0.5 }}
                  whileInView={{ boxShadow: "0 0 30px #aaff00", scale: 1.5, opacity: 1 }}
                  viewport={{ once: false, amount: 0.5, margin: "-50%" }}
                  transition={{ duration: 0.5 }}
                  className="path-dot top-1/2 hidden md:block"
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
