export function Footer() {
  return (
    <footer className="py-16 px-8 bg-brand-darker border-t border-white/5">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-widest text-white/20">
        <p>© 2026 Mohd Zaid. Applied AI Engineer.</p>
        <a href="/agents" className="mt-4 md:mt-0 font-orbitron hover:text-brand-accent transition-colors">Built for Humans and Agents</a>
      </div>
    </footer>
  );
}
