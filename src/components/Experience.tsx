import { motion } from "framer-motion";

export function Experience() {
  const experiences: Array<{year: string, company: string, role: string, details: string[], icon?: React.ReactNode, link?: string}> = [
    {
      year: "Jan 2025 — PRESENT",
      company: "DEnergy Networks",
      link: "https://d.energy",
      icon: <img src="/denergy_icon.png" alt="DEnergy Networks" className="h-14 w-auto object-contain" />,
      role: "Blockchain Engineer",
      details: [
        "Implemented high-throughput event processing layers, improving system validation speed by 30%.",
        "Built core Go services to expose distributed state primitives to client applications.",
        "Led system architecture reviews for 50K+ LOC with 98% test coverage.",
      ],
    },
    {
      year: "Dec 2024 — June 2025",
      company: "",
      link: "https://trench.ag",
      icon: <svg viewBox="0 0 107 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-14 w-auto"><path d="M18.1739 9.74908L25.4442 9.74902L10.4419 24.7513C10.3544 24.8388 10.2357 24.888 10.1119 24.888L7.13854 24.888C6.88081 24.888 6.67188 24.6791 6.67188 24.4213L6.67188 21.4479C6.67188 21.3242 6.72104 21.2055 6.80856 21.118L18.0261 9.90041L18.1739 9.74908Z" fill="#07DB76"></path><path d="M23.1602 24.8867C23.4178 24.8866 23.627 24.6776 23.627 24.4199V21.4482C23.6269 21.3246 23.5777 21.2056 23.4902 21.1182L16.0566 13.6855L12.2725 9.90137L12.1299 9.75684L18.7725 3.11426L11.502 3.11523L11.3545 3.26562L4.87109 9.74902L4.85645 9.74805L4.86426 9.75586L0.136719 14.4834C0.0492337 14.5709 3.5895e-05 14.6898 0 14.8135V17.7871C6.11303e-05 18.0448 0.209102 18.2539 0.466797 18.2539H3.44043C3.56406 18.2538 3.68308 18.2046 3.77051 18.1172L8.49707 13.3896L19.8584 24.75C19.9459 24.8375 20.0647 24.8867 20.1885 24.8867H23.1602Z" fill="#4FFFAB"></path><path d="M18.7607 3.11216L11.4922 3.11035L26.4945 18.1126C26.582 18.2002 26.7007 18.2493 26.8245 18.2493H29.7961C30.0538 18.2493 30.2628 18.0404 30.2628 17.7827L30.2628 14.811C30.2628 14.6873 30.2136 14.5686 30.1261 14.481L18.9085 3.26349L18.7607 3.11216Z" fill="#07DB76"></path><path d="M44.5817 17.296V14.224H47.4857V17.584C47.4857 20.08 46.0457 22.312 42.7097 22.312C39.2537 22.312 37.8857 20.104 37.8857 17.56V7H40.9577V10.192H47.4857V12.4H40.9577V17.248C40.9577 18.736 41.4857 19.6 42.7577 19.6C44.0057 19.6 44.5817 18.76 44.5817 17.296ZM52.3607 22H49.2407V10.192H52.1687V11.608C53.2007 10.024 54.4007 9.88 55.6727 9.88H56.0807V13.072C55.7927 13.024 55.5047 13 55.2167 13C53.2967 13 52.3607 13.96 52.3607 15.856V22ZM59.6571 14.944H64.4811C64.4331 13.192 63.2811 12.352 62.0571 12.352C60.8091 12.352 59.7771 13.312 59.6571 14.944ZM67.6971 16.912H59.5611C59.6571 18.688 60.6651 19.84 62.2011 19.84C63.2091 19.84 64.0971 19.336 64.3131 18.52H67.5291C66.8091 20.944 64.8651 22.312 62.3451 22.312C58.4091 22.312 56.4411 20.152 56.4411 15.88C56.4411 12.232 58.5291 9.88 62.1531 9.88C65.7771 9.88 67.6971 12.232 67.6971 16.912ZM79.9594 22H76.8154V14.848C76.8154 13.024 76.2874 12.52 74.7994 12.52C73.1674 12.52 72.3754 13.432 72.3754 15.232V22H69.2554V10.192H72.2314V11.92C72.9514 10.6 74.1514 9.88 76.0474 9.88C78.3034 9.88 79.9594 11.248 79.9594 13.816V22ZM89.2937 17.728H92.4377C92.1017 20.464 89.8697 22.312 87.0137 22.312C83.7977 22.312 81.5897 20.176 81.5897 15.952C81.5897 11.728 83.7977 9.88 87.1097 9.88C90.1817 9.88 92.2697 11.632 92.4617 14.416H89.3177C89.1497 13.192 88.2617 12.472 87.0857 12.472C85.7657 12.472 84.6857 13.312 84.6857 15.88C84.6857 18.448 85.7657 19.696 86.9897 19.696C88.2137 19.696 89.1737 19 89.2937 17.728ZM104.544 22H101.4V14.68C101.4 12.904 100.8 12.352 99.3844 12.352C97.8244 12.352 96.9604 13.648 96.9604 15.232V22H93.8404V5.872H96.9604V11.728C97.4164 10.672 98.8564 9.88 100.44 9.88C102.864 9.88 104.544 11.296 104.544 13.648V22Z" className="fill-white group-hover:fill-brand-accent transition-colors duration-500"></path></svg>,
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
      link: "https://mable.ai/",
      icon: <img src="/mable_icon.png" alt="Mable" className="h-14 w-auto object-contain" />,
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
                  className={`group exp-content z-20 relative md:absolute w-[90%] md:w-[45%] p-6 md:p-8 bg-brand-gray/40 md:bg-transparent border border-brand-accent/10 md:border-transparent backdrop-blur-lg md:backdrop-blur-none shadow-2xl md:shadow-none rounded-2xl mx-auto md:mx-0 transition-all duration-500 hover:bg-brand-gray/60 md:hover:bg-brand-darker/50 hover:-translate-y-2 ${
                    isLeft ? "md:left-0 text-left md:text-right md:pr-16" : "md:right-0 text-left md:pl-16"
                  }`}
                >
                  <p className="inline-block text-brand-accent font-orbitron text-[10px] md:text-xs tracking-widest mb-4 bg-brand-accent/5 px-2 py-1 rounded">
                    {exp.year}
                  </p>

                  {(() => {
                    const headerContent = (
                      <div className={`flex items-center gap-4 mb-4 ${isLeft ? 'md:flex-row-reverse' : ''}`}>
                        {exp.icon ? (
                          <div className="flex-shrink-0 flex items-center justify-center transition-all duration-500 group-hover:scale-[1.08] group-hover:drop-shadow-[0_0_15px_rgba(170,255,0,0.3)]">
                            {exp.icon}
                          </div>
                        ) : (
                          <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-brand-accent/5 border border-brand-accent/30 rounded-full font-bold text-brand-accent text-xl transition-all duration-500 group-hover:scale-[1.08] group-hover:bg-brand-accent/20 group-hover:shadow-[0_0_15px_rgba(170,255,0,0.3)]">
                            {exp.company.charAt(0)}
                          </div>
                        )}
                        {exp.company && (
                          <h4 className={`text-2xl md:text-4xl lg:text-5xl font-heading font-extrabold text-white transition-colors duration-500 group-hover:text-brand-accent ${isLeft ? 'md:text-right text-left' : 'text-left'}`}>
                            {exp.company}
                          </h4>
                        )}
                        {exp.link && (
                          <span className="opacity-0 transition-all duration-500 -translate-x-4 group-hover:translate-x-0 group-hover:opacity-100 text-brand-accent text-xl flex-shrink-0 group-hover:drop-shadow-[0_0_8px_rgba(170,255,0,0.5)]">
                            ↗
                          </span>
                        )}
                      </div>
                    );

                    return exp.link ? (
                      <a href={exp.link} target="_blank" rel="noopener noreferrer" className="block cursor-pointer">
                        {headerContent}
                      </a>
                    ) : (
                      <div className="block">
                        {headerContent}
                      </div>
                    );
                  })()}

                  <p className="text-brand-accent/80 font-bold uppercase text-xs tracking-[0.2em] mb-6 transition-colors duration-500 group-hover:text-brand-accent">
                    {exp.role}
                  </p>
                  <div className={`space-y-4 text-white/70 text-sm font-light leading-relaxed flex flex-col transition-colors duration-500 group-hover:text-white/90 ${isLeft ? 'md:items-end' : 'md:items-start'}`}>
                    {exp.details.map((detail, i) => (
                      <div key={i} className={`flex gap-3 max-w-sm ${isLeft ? 'md:flex-row-reverse' : ''}`}>
                        <span className="text-brand-accent/50 mt-1 flex-shrink-0 transition-all duration-500 group-hover:text-brand-accent group-hover:translate-x-1">▹</span>
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
