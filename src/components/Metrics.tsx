import { metrics } from "../data/portfolio.ts";

export function Metrics() {
  return (
    <section className="py-24 bg-brand-accent">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          {metrics.map((m) => (
            <div key={m.label} className="text-center text-brand-black">
              <p className="text-5xl font-orbitron font-extrabold tracking-tighter">
                {m.value}
              </p>
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 mt-3">
                {m.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
