import { motion, useScroll } from "framer-motion";
import { useState, useEffect } from "react";

export function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    return scrollY.on("change", (latest: number) => {
      const heroHeight = window.innerHeight - 100; // Just before reaching Identity
      
      if (latest < heroHeight) {
        setHidden(true); // Hide completely on the Hero section
      } else {
        const previous = scrollY.getPrevious() ?? 0;
        if (latest > previous && latest > heroHeight + 200) {
          setHidden(true); // Hide when scrolling down
        } else {
          setHidden(false); // Show when scrolling up
        }
      }
    });
  }, [scrollY]);

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 left-0 w-full z-50 bg-brand-black/95 backdrop-blur-md border-b border-white/5 py-5"
    >
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        <a className="flex items-center gap-3 group z-50" href="#">
          <div className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center relative">
            <svg fill="none" height="100%" viewBox="0 0 100 100" width="100%" xmlns="http://www.w3.org/2000/svg" className="transform group-hover:scale-105 transition-transform">
              <path d="M15 15L35 15L55 35L15 35Z" fill="#aaff00" fillOpacity="0.08"></path>
              <path d="M85 15L65 15L45 35L85 35Z" fill="#aaff00" fillOpacity="0.12"></path>
              <path d="M85 85L65 85L45 65L85 65Z" fill="#aaff00" fillOpacity="0.08"></path>
              <path d="M15 85L35 85L55 65L15 65Z" fill="#aaff00" fillOpacity="0.12"></path>
              <path d="M20 20H80" stroke="#aaff00" strokeLinecap="square" strokeWidth="6"></path>
              <path d="M80 20L40 60" stroke="#aaff00" strokeDasharray="12 4" strokeWidth="6"></path>
              <path d="M40 60L20 80" stroke="#aaff00" strokeLinecap="square" strokeWidth="6"></path>
              <path d="M20 80H80" stroke="#aaff00" strokeLinecap="square" strokeWidth="6"></path>
              <rect fill="#aaff00" height="6" width="6" x="17" y="17"></rect>
              <rect fill="#aaff00" height="6" width="6" x="77" y="17"></rect>
              <rect fill="#aaff00" height="6" width="6" x="77" y="77"></rect>
              <rect fill="#aaff00" height="6" width="6" x="17" y="77"></rect>
              <path d="M45 45L55 45L55 55L45 55Z" fill="#aaff00"></path>
            </svg>
          </div>
          <span className="text-white font-orbitron font-extrabold text-lg md:text-xl tracking-tighter group-hover:text-brand-accent transition-colors pt-1">
            ZAID
          </span>
        </a>
        
        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex space-x-12 text-[10px] font-bold tracking-[0.3em] uppercase absolute left-1/2 -translate-x-1/2">
          <a className="nav-link-bracket" href="#about">About</a>
          <a className="nav-link-bracket" href="#experience">Experience</a>
          <a className="nav-link-bracket" href="#projects">Projects</a>
          <a className="nav-link-bracket" href="#skills">Skills</a>
          <a className="nav-link-bracket" href="#contact">Contact</a>
        </div>

        {/* Right Side Actions & Indicator */}
        <div className="flex items-center gap-4 md:gap-6 z-50">
          <a 
            href="/resume.pdf" 
            download
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 border border-brand-accent/30 text-brand-accent text-[10px] font-orbitron font-bold tracking-[0.2em] uppercase hover:bg-brand-accent/10 transition-colors"
          >
            <span className="material-symbols-outlined text-[14px]">download</span>
            Resume
          </a>

          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-brand-accent/20 flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
