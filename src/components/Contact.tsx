export function Contact() {
  return (
    <section className="py-40 px-6 bg-brand-black text-center" id="contact">
      <div className="container mx-auto">
        <h2 className="text-brand-accent text-xs font-bold uppercase tracking-[0.4em] mb-6">
          05. Connect
        </h2>
        <h3 className="text-5xl md:text-8xl font-heading font-extrabold mb-16 tracking-tighter">
          Let's Build Something.
        </h3>
        <a
          className="text-2xl md:text-4xl font-light hover:text-brand-accent transition-all duration-500 border-b-2 border-brand-accent/30 hover:border-brand-accent pb-4"
          href="mailto:mohdzaid2904@gmail.com"
        >
          mohdzaid2904@gmail.com
        </a>
        <div className="mt-32 flex justify-center space-x-12 text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">
          <a
            className="hover:text-brand-accent transition-colors"
            href="https://github.com/dev-zaid"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <a
            className="hover:text-brand-accent transition-colors"
            href="https://linkedin.com/in/dev-zaid"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
