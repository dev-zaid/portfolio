import { motion } from "framer-motion";

export function Skills() {
  const row1 = ["GoLang", "TypeScript", "Python", "Solidity", "C++", "Cosmos SDK"];
  const row2 = ["EVM", "Smart Contracts", "Layer 1 Infra", "NFT Standards", "Microservices"];
  const row3 = ["gRPC", "WebSockets", "Event-driven", "PostgreSQL", "Redis", "Docker", "AWS"];

  const MarqueeRow = ({ items, direction = 1 }: { items: string[]; direction?: number }) => {
    return (
      <div className="flex w-full overflow-hidden whitespace-nowrap mb-6 py-2 relative flex-nowrap">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: direction > 0 ? ["0%", "-50%"] : ["-50%", "0%"] }}
          transition={{ ease: "linear", duration: 25, repeat: Infinity }}
        >
          {/* We map twice to create an infinite seamless loop effect */}
          {[...items, ...items, ...items, ...items].map((skill, idx) => (
            <div
              key={idx}
              className="mx-4 text-2xl md:text-4xl font-heading font-bold text-white/30 hover:text-brand-accent hover:text-glow transition-all duration-300 cursor-default px-6 py-4 bg-white/[0.02] border border-white/5 rounded-full backdrop-blur-sm shrink-0"
              style={{
                textShadow: "0 0 0px transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.textShadow = "0 0 15px rgba(170, 255, 0, 0.5)";
                e.currentTarget.style.backgroundColor = "rgba(170, 255, 0, 0.05)";
                e.currentTarget.style.borderColor = "rgba(170, 255, 0, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.textShadow = "0 0 0px transparent";
                e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.02)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.05)";
              }}
            >
              {skill}
            </div>
          ))}
        </motion.div>
      </div>
    );
  };

  return (
    <section className="py-24 bg-brand-darker relative overflow-hidden" id="skills">
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-brand-black to-transparent pointer-events-none z-10"></div>
      
      <div className="relative z-20 mb-16 px-6 container mx-auto text-center">
        <h2 className="text-brand-accent text-xs font-bold uppercase tracking-[0.4em] mb-4">
          04. Capabilities
        </h2>
        <h3 className="text-4xl md:text-5xl font-heading font-bold">Technical Arsenal</h3>
      </div>

      <div className="relative z-10 flex flex-col items-center rotate-[-2deg] my-12 w-[110%] -ml-[5%]">
        <MarqueeRow items={row1} direction={1} />
        <MarqueeRow items={row2} direction={-1} />
        <MarqueeRow items={row3} direction={1} />
      </div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-brand-accent to-transparent pointer-events-none mix-blend-overlay opacity-20 z-10"></div>
    </section>
  );
}
