import { motion } from "framer-motion";

export function Projects() {
  const projects = [
    {
      title: "Aptos NFT Indexer",
      desc: "High-throughput blockchain indexer processing 10M+ daily events with Go-based concurrency pipelines and horizontal scaling.",
      tech: ["Golang", "Postgres", "Aptos"],
      image: "/project_aptos.png",
      span: "md:col-span-2 md:row-span-2",
    },
    {
      title: "PyREX Payment",
      desc: "AI-driven cross-border routing engine that minimizes liquidity slippage for global conversion and instant settlements.",
      tech: ["Python", "gRPC", "AI"],
      image: "/project_pyrex.png",
      span: "md:col-span-1 md:row-span-2",
    },
    {
      title: "OD Automation",
      desc: "Enterprise leave management system handling 5,000+ concurrent users with automated CI/CD and secure authentication.",
      tech: ["Node.js", "Docker", "Security"],
      image: "/project_od.png",
      span: "md:col-span-3 md:row-span-1",
    },
  ];

  return (
    <section className="py-24 px-6 bg-brand-black relative" id="projects">
      <div className="container mx-auto">
        <div className="mb-16">
          <h2 className="text-brand-accent text-xs font-bold uppercase tracking-[0.4em] mb-4">
            03. Production
          </h2>
          <h3 className="text-4xl font-heading font-bold">Core Infrastructure</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
          {projects.map((project, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              key={idx}
              className={`group relative rounded-xl overflow-hidden bg-brand-gray border border-white/5 hover:border-brand-accent/50 transition-all duration-500 cursor-pointer ${project.span}`}
            >
              {/* Image Background */}
              <div className="absolute inset-0 w-full h-full">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/80 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end z-10 transition-transform duration-500 group-hover:translate-y-[-10px]">
                <div className="flex justify-between items-end mb-4">
                  <h4 className="text-2xl md:text-3xl font-heading font-bold text-white group-hover:text-brand-accent transition-colors">
                    {project.title}
                  </h4>
                  <span className="material-symbols-outlined text-white/50 group-hover:text-brand-accent transition-colors">open_in_new</span>
                </div>
                
                <p className="text-white/70 text-sm md:text-base leading-relaxed mb-6 max-w-xl opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                  {project.desc}
                </p>

                <div className="flex flex-wrap gap-3">
                  {project.tech.map((t, i) => (
                    <span key={i} className="text-[10px] font-bold text-brand-accent uppercase tracking-widest border border-brand-accent/30 bg-brand-accent/5 px-3 py-1.5 rounded-sm backdrop-blur-md">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
