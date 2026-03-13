import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

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
            className="absolute rounded-full bg-brand-accent/10 mix-blend-screen blur-[100px]"
            style={{
              width: size,
              height: size,
              left: `${left}%`,
              top: `${top}%`,
              transform: "translate(-50%, -50%)",
            }}
            animate={{
              opacity: [0, 0.6, 0],
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
      className="relative h-[100vh] w-full overflow-hidden flex items-center justify-center cursor-default"
      onMouseMove={handleMouseMove}
      style={{ perspective: "1000px" }}
      id="hero"
    >
      <AmbientGlows />
      <div
        className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
        id="hero-bg-text"
      >
        <motion.div 
          style={{ y, rotateX, rotateY }} 
          className="relative flex items-center justify-center will-change-transform"
        >
          {/* Main Outline Layer */}
          <span className="parallax-bg-text text-transparent">
            ZAID
          </span>
        </motion.div>
      </div>
      <div className="absolute inset-0 z-10 flex items-center justify-center overflow-hidden pointer-events-none">
        <div className="absolute portrait-glow w-[100%] h-[100%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="relative h-full flex items-center justify-center pt-20">
          <img
            alt="Zaid Portrait"
            className="h-full w-auto max-w-none object-cover object-top grayscale"
            src="/Portrait.png"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-brand-black/40"></div>
      </div>
      <div className="relative z-30 text-center pointer-events-none mt-auto pb-32 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <p className="text-brand-accent font-orbitron tracking-[0.5em] text-sm md:text-base uppercase mb-4 font-bold drop-shadow-md">
            Mohd Zaid
          </p>
        </motion.div>
        <h1 className="text-5xl md:text-8xl font-heading font-bold mb-4 tracking-tighter drop-shadow-2xl">
          Software Engineer.
        </h1>
        <p className="text-lg md:text-xl text-white/60 font-light tracking-[0.3em] uppercase drop-shadow-md">
          I build systems that <span className="text-brand-accent font-bold">scale</span>.
        </p>
      </div>
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-4">
        <div className="w-px h-24 bg-gradient-to-b from-brand-accent to-transparent"></div>
      </div>
    </section>
  );
}
