import { useEffect, useRef, useState } from 'react';
import { animate, stagger, createDraggable, createSpring } from 'animejs';
import { planets } from '../data/planets';
import { reduced, useReveal } from '../motion';

export default function SolarSystem() {
  const root = useRef(null);
  const panel = useRef(null);
  const [sel, setSel] = useState(planets[2]);
  useReveal(root);

  useEffect(() => {
    if (reduced()) return;
    const orbits = planets.map((p) =>
      animate(`.orbit-${p.id}`, { rotate: 360, duration: p.period * 1000, loop: true, ease: 'linear' })
    );
    const sun = animate('.sun', { scale: [1, 1.08], duration: 2400, alternate: true, loop: true, ease: 'inOutSine' });
    const probe = createDraggable('.probe', { releaseEase: createSpring({ stiffness: 120, damping: 6 }) });
    return () => {
      orbits.forEach((a) => a.revert());
      sun.revert();
      probe.revert();
    };
  }, []);

  useEffect(() => {
    if (reduced() || !panel.current) return;
    animate(panel.current.querySelectorAll('[data-p]'), {
      opacity: [0, 1],
      x: [24, 0],
      delay: stagger(60),
      duration: 700,
      ease: 'outExpo',
    });
  }, [sel]);

  return (
    <section id="explore" ref={root} className="relative px-6 md:px-14 py-28 max-w-7xl mx-auto">
      <div data-reveal className="opacity-0 max-w-2xl mb-14">
        <p className="text-xs tracking-[0.3em] uppercase text-ion mb-4">01 — Explore</p>
        <h2 className="font-display text-4xl md:text-6xl font-bold text-white leading-tight">The solar system, in motion</h2>
        <p className="mt-5 text-slate-400 text-lg">Select a planet to inspect it. Orbit speeds are scaled for show — not to real time.</p>
      </div>

      <div className="grid lg:grid-cols-[1.15fr_.85fr] gap-10 items-center">
        <div data-reveal className="opacity-0 relative p-4">
          <div className="sys relative aspect-square w-full max-w-[680px] mx-auto">
            <div className="absolute" style={{ left: '44.5%', top: '44.5%', width: '11%', height: '11%' }}>
              <div
                className="sun absolute inset-0 rounded-full"
                style={{
                  background: 'radial-gradient(circle at 35% 35%, #fff7ed, #fbbf24 40%, #ea580c 80%)',
                  boxShadow: '0 0 60px 20px rgba(251,146,60,.5), 0 0 160px 50px rgba(251,146,60,.2)',
                }}
              />
            </div>

            {planets.map((p) => (
              <div
                key={p.id}
                className="absolute rounded-full border border-white/10 pointer-events-none"
                style={{ width: `${p.ring}%`, height: `${p.ring}%`, left: `${(100 - p.ring) / 2}%`, top: `${(100 - p.ring) / 2}%` }}
              >
                <div className={`orbit-${p.id} absolute inset-0`}>
                  <button
                    onClick={() => setSel(p)}
                    aria-label={`Select ${p.name}`}
                    className="pointer-events-auto absolute left-1/2 rounded-full cursor-pointer after:content-[''] after:absolute after:-inset-2.5"
                    style={{
                      width: p.size,
                      height: p.size,
                      top: -p.size / 2,
                      marginLeft: -p.size / 2,
                      background: p.gradient,
                      transition: 'box-shadow .3s',
                      boxShadow: sel.id === p.id
                        ? `0 0 0 3px rgba(255,255,255,.85), 0 0 34px 6px ${p.glow}`
                        : `0 0 14px 1px ${p.glow}`,
                    }}
                  >
                    {p.rings && (
                      <span className="absolute left-1/2 top-1/2 w-[240%] h-[62%] -translate-x-1/2 -translate-y-1/2 -rotate-[20deg] rounded-[50%] border-2 border-amber-200/55 pointer-events-none" />
                    )}
                  </button>
                </div>
              </div>
            ))}

            <div className="probe absolute left-0 bottom-0 z-20 glass rounded-full px-4 py-2 text-xs text-slate-300 cursor-grab touch-none select-none">
              ◉ Drag the probe
            </div>
          </div>
        </div>

        <aside data-reveal className="opacity-0 glass rounded-3xl p-8 md:p-10">
          <div ref={panel}>
            <p data-p className="text-xs tracking-[0.3em] uppercase" style={{ color: 'var(--color-ion)' }}>{sel.type}</p>
            <h3 data-p className="font-display text-5xl font-bold text-white mt-3">{sel.name}</h3>
            <p data-p className="mt-4 text-slate-400 leading-relaxed">{sel.tag}</p>
            <dl className="mt-8 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 gap-3">
              {[['Diameter', sel.diameter], ['Moons', sel.moons], ['Year', sel.year]].map(([k, v]) => (
                <div key={k} data-p className="rounded-2xl bg-white/5 border border-white/10 p-4">
                  <dt className="text-[10px] tracking-[0.25em] uppercase text-slate-500">{k}</dt>
                  <dd className="mt-1.5 font-display text-lg font-semibold text-white">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </aside>
      </div>
    </section>
  );
}
