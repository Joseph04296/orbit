import { useEffect, useRef } from 'react';
import { animate, onScroll } from 'animejs';
import { reduced, useReveal } from '../motion';

const missions = [
  { y: '1957', t: 'Sputnik 1', d: 'The first artificial satellite is launched, opening the space age.' },
  { y: '1969', t: 'Apollo 11', d: 'Humans walk on the Moon for the first time.' },
  { y: '1977', t: 'Voyager 1', d: 'Launched to the outer planets — it later became the first human-made object to reach interstellar space.' },
  { y: '1990', t: 'Hubble Space Telescope', d: 'Launched into orbit, it has reshaped our view of the cosmos ever since.' },
  { y: '2012', t: 'Curiosity rover', d: 'A car-sized rover lands on Mars to study whether the planet could once have supported life.' },
  { y: '2021', t: 'James Webb Space Telescope', d: 'Launched on Christmas Day, it observes the early universe in infrared light.' },
];

export default function Missions() {
  const root = useRef(null);
  const wrap = useRef(null);
  useReveal(root);

  useEffect(() => {
    if (reduced()) {
      root.current.querySelector('.mline').style.transform = 'scaleY(1)';
      return;
    }
    const a = animate(root.current.querySelector('.mline'), {
      scaleY: [0, 1],
      ease: 'linear',
      autoplay: onScroll({ target: wrap.current, sync: true, enter: 'center top', leave: 'center bottom' }),
    });
    return () => a.revert();
  }, []);

  return (
    <section id="missions" ref={root} className="relative px-6 md:px-14 py-28 max-w-5xl mx-auto">
      <div data-reveal className="opacity-0 max-w-2xl mb-16">
        <p className="text-xs tracking-[0.3em] uppercase text-ion mb-4">03 — Missions</p>
        <h2 className="font-display text-4xl md:text-6xl font-bold text-white leading-tight">Milestones in exploration</h2>
      </div>

      <div ref={wrap} className="relative">
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/10" />
        <div className="mline absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-ion to-nebula origin-top" style={{ transform: 'scaleY(0)' }} />

        {missions.map((m, i) => {
          const even = i % 2 === 0;
          return (
            <div
              key={m.y}
              data-reveal
              className={`opacity-0 relative pl-12 md:pl-0 md:w-1/2 mb-14 last:mb-0 ${even ? 'md:pr-14 md:text-right' : 'md:ml-auto md:pl-14'}`}
            >
              <span
                className={`absolute top-3 size-3 rounded-full bg-void border-2 border-ion shadow-[0_0_14px_rgba(34,211,238,.9)] ${
                  even ? 'left-[10px] md:left-auto md:-right-[6px]' : 'left-[10px] md:-left-[6px]'
                }`}
              />
              <div className="font-display text-5xl font-bold grad-text">{m.y}</div>
              <h3 className="font-display text-2xl font-semibold text-white mt-2">{m.t}</h3>
              <p className="mt-2 text-slate-400 leading-relaxed">{m.d}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
