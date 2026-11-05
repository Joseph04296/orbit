import { useEffect, useRef } from 'react';
import { animate, stagger, createTimeline, onScroll } from 'animejs';
import { reduced } from '../motion';

const words = 'There is more beyond our world.'.split(' ');

export default function Hero() {
  const root = useRef(null);

  useEffect(() => {
    const el = root.current;
    const q = (s) => el.querySelectorAll(s);
    if (reduced()) {
      q('.hw, .hfade, .hero-planet').forEach((n) => (n.style.opacity = 1));
      return;
    }
    const tl = createTimeline({ defaults: { ease: 'outExpo', duration: 1100 } });
    tl.add(q('.hero-planet'), { opacity: [0, 1], scale: [0.85, 1], duration: 2000 }, 0)
      .add(q('.hw'), { opacity: [0, 1], y: [70, 0], delay: stagger(110) }, 200)
      .add(q('.hfade'), { opacity: [0, 1], y: [24, 0], delay: stagger(140) }, 900);

    const float = animate(q('.hero-planet-inner'), { y: [-12, 12], duration: 5000, alternate: true, loop: true, ease: 'inOutSine' });
    const moon = animate(q('.hero-moon'), { rotate: 360, duration: 14000, loop: true, ease: 'linear' });
    const parallax = animate(q('.hero-parallax'), {
      y: [0, -180],
      ease: 'linear',
      autoplay: onScroll({ target: el, sync: true, enter: 'start start', leave: 'start end' }),
    });
    const copy = animate(q('.hero-copy'), {
      y: [0, -50],
      opacity: [1, 0],
      ease: 'linear',
      autoplay: onScroll({ target: el, sync: true, enter: 'start start', leave: 'center top' }),
    });
    return () => [tl, float, moon, parallax, copy].forEach((a) => a.revert());
  }, []);

  return (
    <section id="home" ref={root} className="relative min-h-screen flex items-center overflow-hidden px-6 md:px-14">
      <div className="hero-parallax pointer-events-none absolute -right-[30%] md:-right-[6%] top-[14%] w-[78vmin] md:w-[64vmin] aspect-square">
        <div className="hero-planet opacity-0 absolute inset-0">
          <div className="hero-planet-inner absolute inset-[8%]">
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle at 28% 26%, #bae6fd 0%, #3b82f6 22%, #1d2a8f 50%, #090c33 78%)',
                boxShadow: '0 0 140px 24px rgba(59,130,246,.35), inset -50px -50px 100px rgba(0,0,0,.75)',
              }}
            />
            <div
              className="absolute inset-0 rounded-full"
              style={{ background: 'radial-gradient(circle at 72% 72%, rgba(139,92,246,.4), transparent 55%)' }}
            />
            <div className="hero-moon absolute -inset-[14%]">
              <span
                className="absolute left-1/2 top-0 size-6 -ml-3 -mt-3 rounded-full"
                style={{ background: 'radial-gradient(circle at 30% 30%, #f1f5f9, #64748b 70%)', boxShadow: '0 0 18px rgba(203,213,225,.5)' }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="hero-copy relative max-w-3xl pt-24">
        <p className="hfade opacity-0 inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs tracking-[0.25em] uppercase text-ion mb-8">
          <span className="size-1.5 rounded-full bg-ion" /> Interactive space atlas
        </p>
        <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-bold leading-[1.02] tracking-tight text-white">
          {words.map((w, i) => (
            <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.25em] pb-[0.12em]">
              <span className={`hw inline-block opacity-0 ${w === 'beyond' ? 'grad-text' : ''}`}>{w}</span>
            </span>
          ))}
        </h1>
        <p className="hfade opacity-0 mt-8 max-w-xl text-lg text-slate-400 leading-relaxed">
          Explore the universe, discover distant worlds and experience the wonders of space — one orbit at a time.
        </p>
        <div className="hfade opacity-0 mt-10 flex flex-wrap gap-4">
          <a
            href="#explore"
            className="rounded-full px-8 py-4 font-semibold text-white bg-gradient-to-r from-pulse to-nebula shadow-[0_0_40px_-8px_rgba(99,102,241,.9)] hover:shadow-[0_0_60px_-4px_rgba(99,102,241,1)] hover:-translate-y-0.5 transition-all"
          >
            Begin exploring
          </a>
          <a href="#missions" className="glass rounded-full px-8 py-4 font-semibold text-white hover:bg-white/10 transition-colors">
            Mission log
          </a>
        </div>
      </div>

      <div className="hfade opacity-0 absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.35em] uppercase text-slate-500">
        Scroll to travel
      </div>
    </section>
  );
}
