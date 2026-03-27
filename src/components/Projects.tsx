import { motion } from "framer-motion";
import { useState, useEffect } from "react";

function ProjectCard({ project, idx }: { project: any, idx: number }) {
  const isEven = idx % 2 === 0;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (project.images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [project.images.length]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-20 items-center group relative`}
    >
      {/* Connecting Line from center to image */}
      <div className={`hidden lg:block absolute top-1/2 -translate-y-1/2 w-[10vw] h-px bg-white/10 z-0 ${isEven ? 'left-1/2' : 'right-1/2'}`}></div>
      
      {/* Project Image Box */}
      <div className="w-full lg:w-3/5 relative overflow-hidden rounded-2xl bg-brand-gray/50 border border-white/5 aspect-[4/3] lg:aspect-video z-10 group/image cursor-pointer p-4 md:p-6 lg:p-8 flex flex-col justify-center">
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-brand-black/20 group-hover/image:bg-transparent transition-colors duration-500 pointer-events-none z-0"></div>
        
        <motion.div
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative w-full h-full z-10 flex items-center justify-center"
        >
          {project.images.map((img: string, i: number) => (
            <img 
              key={i}
              src={img} 
              alt={`${project.title} - view ${i + 1}`} 
              className={`absolute inset-0 m-auto max-w-full max-h-full rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.5)] ring-1 ring-white/10 transition-all duration-1000 
                ${i === currentImageIndex 
                  ? 'opacity-80 group-hover/image:opacity-100 filter grayscale group-hover/image:grayscale-0 scale-100' 
                  : 'opacity-0 scale-105 pointer-events-none'
                }`}
            />
          ))}
          
          {/* Progress dots for multiple images */}
          {project.images.length > 1 && (
            <div className="absolute -bottom-2 md:bottom-2 left-1/2 -translate-x-1/2 flex gap-3 z-20">
              {project.images.map((_: any, i: number) => (
                <button 
                  key={i}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(i); }}
                  className={`h-1.5 rounded-full transition-all duration-500 shadow-black ${i === currentImageIndex ? 'bg-brand-accent w-8' : 'bg-white/60 hover:bg-white w-2'}`}
                />
              ))}
            </div>
          )}
        </motion.div>
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
          {project.tech.map((t: string, i: number) => (
            <span key={i} className="text-xs font-semibold text-white/90 tracking-wider border border-white/10 bg-white/5 shadow-inner px-4 py-2 rounded-full backdrop-blur-md hover:bg-white/10 transition-colors cursor-default">
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  const projects = [
    {
      title: "Aptos NFT Marketplace Indexer",
      desc: "High-throughput blockchain indexer processing 10M+ daily events. Built with Go-based concurrency pipelines and horizontal scaling. Improved parsing algorithm complexity from O(n²) to O(n), increasing overall throughput by ~60%.",
      tech: ["Golang", "PostgreSQL"],
      images: [
        "/backend_indexer.png"
      ], 
      link: "#",
    },
    {
      title: "PyREX Intelligent Payment System",
      desc: "AI-driven cross-border routing engine that minimizes liquidity slippage for global conversion and instant settlements. Built AI-based agents to analyze requests and dynamically split transaction amounts across exchange paths to optimize rates.",
      tech: ["Python", "AI Agents", "Algorithms"],
      images: [
        "/Pyrex/project_pyrex.png",
        "/Pyrex/pyrex-02.png"
      ],
      link: "#",
    },
    {
      title: "OD Automation SRM",
      desc: "Enterprise leave management system handling 5,000+ concurrent users with automated CI/CD and secure authentication. Reduced processing time by 70% through digital signatures.",
      tech: ["Node.js", "TypeScript", "Docker", "Mongo DB"],
      images: [
        "/OD ML Automation/Home page.png",
        "/OD ML Automation/View all Applications.png",
        "/OD ML Automation/View Application.png",
        "/OD ML Automation/Create Application.png"
      ],
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
            delay: 4
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
          {projects.map((project, idx) => (
            <ProjectCard key={idx} project={project} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
