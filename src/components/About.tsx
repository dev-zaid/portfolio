import { motion, Variants } from "framer-motion";

export function About() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.1,
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut" as const } 
    }
  };

  return (
    <section className="py-32 md:py-48 px-6 bg-brand-black relative z-20" id="about">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-[-10%] w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-[150px]"></div>
      </div>

      <div className="container mx-auto">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-start"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Left Column: Sticky Title */}
          <div className="lg:col-span-5 lg:sticky lg:top-40">
            <motion.h2 
              variants={itemVariants}
              className="text-brand-accent text-xs font-bold uppercase tracking-[0.4em] mb-6 flex items-center gap-4"
            >
              <span className="w-8 h-px bg-brand-accent"></span>
              01. Identity
            </motion.h2>
            
            <motion.h3 
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight text-white mb-8 pr-4"
            >
              I build high-performance <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-white">distributed systems</span> and secure protocols.
            </motion.h3>
            
            <motion.div variants={itemVariants} className="hidden lg:flex items-center gap-4 mt-12 opacity-50">
               <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center animate-[spin_10s_linear_infinite]">
                 <div className="w-1 h-1 bg-brand-accent rounded-full absolute top-1"></div>
               </div>
               <span className="text-sm font-orbitron tracking-widest uppercase">System Active</span>
            </motion.div>
          </div>

          <div className="hidden lg:block lg:col-span-1"></div>

          {/* Right Column: Details & Stats */}
          <div className="lg:col-span-6 space-y-16">
            
            <div className="space-y-8 text-lg md:text-xl text-white/60 font-light leading-relaxed">
              <motion.p variants={itemVariants}>
                I am a Blockchain & Protocol Engineer specializing in Go, Cosmos SDK/Evmos, and the EVM ecosystem. For over 2 years, I've been deep in the trenches building L1 systems and engineering high-throughput infrastructure.
              </motion.p>
              
              <motion.p variants={itemVariants}>
                Currently, I lead the core protocol development for an Evmos-based chain. My day-to-day involves architecting dual staking mechanisms (token + NFT), writing EVM precompiles, and orchestrating complex epoch and validator logic across a live network of 100+ nodes.
              </motion.p>
              
              <motion.p variants={itemVariants}>
                My engineering philosophy is simple: systems shouldn't just work; they must scale effortlessly. I've designed, developed, and shipped production environments that reliably process up to 10M+ on-chain events every single day without breaking a sweat.
              </motion.p>
            </div>

            {/* UI Aligned Stats Cards */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4">
               
               <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md hover:bg-white/[0.04] transition-colors group">
                 <div className="text-brand-accent font-orbitron text-4xl mb-4 font-bold group-hover:scale-105 transition-transform origin-left">10M+</div>
                 <div className="text-xs text-white/50 tracking-[0.2em] uppercase font-bold">Daily Events Processed</div>
               </div>
               
               <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md hover:bg-white/[0.04] transition-colors group">
                 <div className="text-brand-accent font-orbitron text-4xl mb-4 font-bold group-hover:scale-105 transition-transform origin-left">100+</div>
                 <div className="text-xs text-white/50 tracking-[0.2em] uppercase font-bold">Live Validator Nodes</div>
               </div>

               <div className="p-8 rounded-2xl md:col-span-2 bg-gradient-to-br from-brand-accent/10 to-transparent border border-brand-accent/20 backdrop-blur-md">
                 <div className="text-white tracking-[0.2em] uppercase font-bold text-xs mb-4">Core Stack</div>
                 <div className="flex flex-wrap gap-2 text-sm text-white/80">
                   <span className="px-3 py-1 bg-brand-black rounded-sm">Go</span>
                   <span className="px-3 py-1 bg-brand-black rounded-sm">Cosmos SDK</span>
                   <span className="px-3 py-1 bg-brand-black rounded-sm">EVM</span>
                   <span className="px-3 py-1 bg-brand-black rounded-sm">PostgreSQL</span>
                   <span className="px-3 py-1 bg-brand-black rounded-sm">Docker</span>
                 </div>
               </div>

            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
