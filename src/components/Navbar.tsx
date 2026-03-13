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
      <div className="container mx-auto px-8 flex justify-between items-center">
        <a className="flex items-center group" href="#">
          <span className="navbar-logo-z font-sans">Z</span>
          <span className="text-white font-orbitron font-extrabold text-xl tracking-tighter group-hover:text-brand-accent transition-colors">
            AID
          </span>
        </a>
        <div className="hidden md:flex space-x-12 text-[10px] font-bold tracking-[0.3em] uppercase">
          <a className="nav-link-bracket" href="#about">
            About
          </a>
          <a className="nav-link-bracket" href="#experience">
            Experience
          </a>
          <a className="nav-link-bracket" href="#projects">
            Projects
          </a>
          <a className="nav-link-bracket" href="#skills">
            Skills
          </a>
          <a className="nav-link-bracket" href="#contact">
            Contact
          </a>
        </div>
        <div className="w-10 h-10 rounded-full border border-brand-accent/20 flex items-center justify-center">
          <div className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-pulse"></div>
        </div>
      </div>
    </motion.nav>
  );
}
