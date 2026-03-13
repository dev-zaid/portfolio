import { motion } from "framer-motion";

export function Projects() {
  const projects = [
    {
      title: "Aptos NFT Marketplace Indexer",
      desc: "High-throughput blockchain indexer processing 10M+ daily events. Built with Go-based concurrency pipelines and horizontal scaling. Improved parsing algorithm complexity from O(n²) to O(n), increasing overall throughput by ~60%.",
      tech: ["Golang", "PostgreSQL", "Aptos", "Concurrency Patterns"],
      // High quality tech/abstract placeholder
      image: "https://images.unsplash.com/photo-1639322537231-2f206e06af86?q=80&w=1600&auto=format&fit=crop", 
      link: "#",
    },
    {
      title: "PyREX Intelligent Payment System",
      desc: "AI-driven cross-border routing engine that minimizes liquidity slippage for global conversion and instant settlements. Built AI-based agents to analyze requests and dynamically split transaction amounts across exchange paths to optimize rates.",
      tech: ["Python", "Go", "AI Agents", "Algorithms"],
      // Abstract gradient/tech placeholder
      image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1600&auto=format&fit=crop",
      link: "#",
    },
    {
      title: "OD Automation SRM",
      desc: "Enterprise leave management system handling 5,000+ concurrent users with automated CI/CD and secure authentication. Reduced processing time by 70% through digital signatures.",
      tech: ["Node.js", "Docker", "Security", "Full-stack"],
      // Code/Data placeholder
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1600&auto=format&fit=crop",
      link: "#",
    },
  ];

  return (
    <section className="py-32 px-6 bg-brand-black relative z-20 overflow-hidden" id="projects">
      {/* Background Neon Elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 bottom-0 left-[5%] md:left-[10%] w-px bg-white/5"></div>
        <div className="absolute top-0 bottom-0 right-[5%] md:right-[10%] w-px bg-white/5"></div>
        
        {/* Animated Neon Line on Left */}
        <motion.div 
          className="absolute top-0 left-[5%] md:left-[10%] w-[2px] h-[20vh] bg-gradient-to-b from-transparent via-brand-accent to-transparent select-none"
          animate={{
            y: ["-20vh", "120vh"],
            opacity: [0, 1, 1, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
            delay: 4 // Offset delay for staggered effect
          }}
        />

        {/* Animated Neon Line on Right */}
        <motion.div 
          className="absolute top-0 right-[5%] md:right-[10%] w-[2px] h-[20vh] bg-gradient-to-b from-transparent via-brand-accent to-transparent select-none"
          animate={{
            y: ["-20vh", "120vh"],
            opacity: [0, 1, 1, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
            delay: 1
          }}
        />
        
        {/* Subtle glowing orb */}
        <div className="absolute top-[30%] right-[10%] w-96 h-96 bg-brand-accent/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[20%] left-[20%] w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-[150px]"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="mb-24 md:mb-32 max-w-2xl pl-4 md:pl-0">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-brand-accent text-xs font-bold uppercase tracking-[0.4em] mb-4"
          >
            03. Production
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-heading font-bold"
          >
            Core Infrastructure & Applications
          </motion.h3>
        </div>
        
        <div className="space-y-32">
          {projects.map((project, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                key={idx}
                className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-20 items-center group relative`}
              >
                {/* Connecting Line from center to image */}
                <div className={`hidden lg:block absolute top-1/2 -translate-y-1/2 w-[10vw] h-px bg-white/10 z-0 ${isEven ? 'left-1/2' : 'right-1/2'}`}></div>
                
                {/* Project Image Box */}
                <div className="w-full lg:w-3/5 relative overflow-hidden rounded-2xl bg-brand-gray/50 border border-white/5 aspect-[4/3] md:aspect-[16/9] lg:aspect-[4/3] z-10">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="w-full h-full"
                  >
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 filter grayscale group-hover:grayscale-0"
                    />
                  </motion.div>
                  {/* Subtle overlay */}
                  <div className="absolute inset-0 bg-brand-black/20 group-hover:bg-transparent transition-colors duration-500 pointer-events-none"></div>
                </div>

                {/* Project Details */}
                <div className="w-full lg:w-2/5 flex flex-col justify-center z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-brand-accent font-orbitron text-sm tracking-widest font-bold">0{idx + 1}</span>
                    <div className="h-px bg-white/10 flex-grow"></div>
                  </div>
                  
                  <h4 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6 group-hover:text-brand-accent transition-colors duration-300">
                    <a href={project.link} target="_blank" rel="noreferrer" className="flex items-center gap-3">
                      {project.title}
                      <span className="material-symbols-outlined text-transparent group-hover:text-brand-accent translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">turn_right</span>
                    </a>
                  </h4>
                  
                  <p className="text-white/60 text-lg leading-relaxed mb-8">
                    {project.desc}
                  </p>

                  <div className="flex flex-wrap gap-3">
                    {project.tech.map((t, i) => (
                      <span key={i} className="text-xs font-semibold text-white/90 tracking-wider border border-white/10 bg-white/5 shadow-inner px-4 py-2 rounded-full backdrop-blur-md hover:bg-white/10 transition-colors cursor-default">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
