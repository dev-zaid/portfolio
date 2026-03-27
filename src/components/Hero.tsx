import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { Typewriter } from "../assets/test";

const AmbientGlows = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {[...Array(6)].map((_, i) => {
        const size = Math.random() * 300 + 200;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const duration = Math.random() * 8 + 6;
        const delay = Math.random() * 5;

        return (
          <motion.div
            key={i}
            className="absolute rounded-full bg-brand-accent/20 mix-blend-screen blur-[100px]"
            style={{
              width: size,
              height: size,
              left: `${left}%`,
              top: `${top}%`,
              transform: "translate(-50%, -50%)",
            }}
            animate={{
              opacity: [0, 0.8, 0],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              delay: delay,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
};

export function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 300]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 100 };
  const rotateX = useSpring(useTransform(mouseY, [0, typeof window !== 'undefined' ? window.innerHeight : 1000], [5, -5]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [0, typeof window !== 'undefined' ? window.innerWidth : 1000], [-5, 5]), springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  return (
    <section 
      className="relative h-[100vh] w-full overflow-hidden flex items-center justify-center cursor-default bg-brand-black"
      onMouseMove={handleMouseMove}
      style={{ perspective: "1000px" }}
      id="hero"
    >
      <AmbientGlows />
      
      {/* Background Typography - Ultra Minimal Watermark */}
      <div className="absolute inset-x-0 inset-y-[-20%] flex items-center justify-center z-10 pointer-events-none overflow-hidden" id="hero-bg-text">
        <motion.div 
          style={{ y, rotateX, rotateY }} 
          className="relative flex items-center justify-center will-change-transform w-full h-[140%]"
        >
          {/* Single, massive minimal text */}
          <span 
            className="text-[55vw] md:text-[350px] lg:text-[500px] font-hero-bg tracking-tighter leading-none text-transparent select-none whitespace-nowrap opacity-20"
            style={{
              WebkitTextStroke: '1px rgba(255, 255, 255, 0.5)',
            }}
          >
            ZAID
          </span>
          
          {/* Subtle horizontal grid anchor */}
          <div className="absolute top-[55%] left-0 w-full h-px bg-white/[0.02]"></div>
        </motion.div>
      </div>

      <div className="absolute inset-0 z-20 flex items-center justify-center overflow-hidden pointer-events-none">
        {/* Adjusted portrait glow */}
        <div className="absolute portrait-glow w-[60%] h-[80%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30 blur-[100px] bg-brand-accent/20 rounded-full"></div>
        <div className="relative h-full flex items-center justify-center pt-20">
          <img
            alt="Zaid Portrait"
            className="h-full w-auto max-w-none object-cover object-top grayscale"
            src="/Portrait.png"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/20 to-transparent"></div>
      </div>

      <div className="relative z-30 text-center pointer-events-none mt-auto pb-32 px-6">
        <div className="text-brand-accent font-orbitron tracking-[0.5em] text-sm md:text-base uppercase mb-4 font-bold drop-shadow-md block h-6">
          <Typewriter text="Mohd Zaid" speed={50} cursor="|" delay={3000} />
        </div>
        
        <h1 className="text-5xl md:text-8xl font-heading font-bold mb-4 tracking-tighter drop-shadow-2xl h-24 md:h-32 flex items-center justify-center">
          <Typewriter text="Software Engineer." speed={70} delay={100} cursor="" />
        </h1>
        
        {/* Reverted original design for "I build systems that scale" */}
        <motion.div
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, delay: 1.5, ease: "easeOut" }}
           className="mt-2"
        >
          <p className="text-lg md:text-xl text-white/60 font-light tracking-[0.3em] uppercase drop-shadow-md">
            I build systems that <span className="text-brand-accent font-bold">scale</span>.
          </p>
        </motion.div>
      </div>

      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-4">
        <div className="w-px h-24 bg-gradient-to-b from-brand-accent to-transparent"></div>
      </div>
    </section>
  );
}
