import { useEffect, useRef } from 'react';
import { animate } from 'animejs';
import { reduced, useReveal } from '../motion';

const items = [
  { n: '01', t: 'Black holes', d: 'Regions where gravity is so strong that nothing — not even light — can escape once it crosses the event horizon.', c: 'from-violet-500/25' },
  { n: '02', t: 'Nebulae', d: 'Vast clouds of gas and dust where new stars are born, and where dying stars leave their remains.', c: 'from-cyan-400/25' },
  { n: '03', t: 'Neutron stars', d: 'The collapsed cores of massive stars: more mass than the Sun packed into a sphere the size of a city.', c: 'from-blue-500/25' },
  { n: '04', t: 'Exoplanets', d: 'Worlds orbiting other stars. Thousands have been confirmed, with new discoveries arriving every year.', c: 'from-fuchsia-500/25' },
];

const stats = [
  { v: 13.8, dec: 1, suffix: ' B', label: 'Years — age of the universe' },
  { v: 299792, dec: 0, suffix: '', label: 'km/s — speed of light' },
  { v: 6000, dec: 0, suffix: '+', label: 'Confirmed exoplanets' },
  { v: 8, dec: 0, suffix: '', label: 'Planets in our solar system' },
];

export default function Discover() {
  const root = useRef(null);
  const statsRef = useRef(null);
  useReveal(root);

  useEffect(() => {
    const nodes = statsRef.current.querySelectorAll('[data-count]');
    const fmt = (s, n) => n.toLocaleString(undefined, { minimumFractionDigits: s.dec, maximumFractionDigits: s.dec }) + s.suffix;
    if (reduced()) {
      nodes.forEach((el, i) => (el.textContent = fmt(stats[i], stats[i].v)));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        nodes.forEach((el, i) => {
          const s = stats[i];
          const o = { n: 0 };
          animate(o, { n: s.v, duration: 2200, ease: 'outExpo', onUpdate: () => (el.textContent = fmt(s, o.n)) });
        });
        io.disconnect();
      },
      { threshold: 0.4 }
    );
    io.observe(statsRef.current);
    return () => io.disconnect();
  }, []);

  return (
    <section id="discover" ref={root} className="relative px-6 md:px-14 py-28 max-w-7xl mx-auto">
      <div data-reveal className="opacity-0 max-w-2xl mb-14">
        <p className="text-xs tracking-[0.3em] uppercase text-ion mb-4">02 — Discover</p>
        <h2 className="font-display text-4xl md:text-6xl font-bold text-white leading-tight">Beyond the planets</h2>
        <p className="mt-5 text-slate-400 text-lg">Some of the most extraordinary objects in the universe.</p>
      </div>

      <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((s, i) => (
          <div key={i} data-reveal className="opacity-0 glass rounded-2xl p-6">
            <div data-count className="font-display text-3xl md:text-4xl font-bold grad-text">0</div>
            <p className="mt-2 text-xs text-slate-500 leading-snug">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {items.map((it) => (
          <article
            key={it.n}
            data-reveal
            className={`opacity-0 group glass rounded-3xl p-8 md:p-10 bg-gradient-to-br ${it.c} to-transparent hover:-translate-y-1.5 hover:border-white/25 transition-all duration-300`}
          >
            <span className="font-display text-sm text-slate-500">{it.n}</span>
            <h3 className="font-display text-3xl font-bold text-white mt-6">{it.t}</h3>
            <p className="mt-3 text-slate-400 leading-relaxed">{it.d}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
