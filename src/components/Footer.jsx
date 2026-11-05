import { useRef } from 'react';
import { useReveal } from '../motion';

export default function Footer() {
  const root = useRef(null);
  useReveal(root);
  return (
    <footer id="about" ref={root} className="relative px-6 md:px-14 pt-24 pb-10 max-w-7xl mx-auto">
      <div data-reveal className="opacity-0 glass rounded-[2rem] p-10 md:p-20 text-center overflow-hidden relative">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(60% 80% at 50% 120%, rgba(99,102,241,.35), transparent 70%)' }} />
        <p className="relative text-xs tracking-[0.3em] uppercase text-ion mb-5">04 — About</p>
        <h2 className="relative font-display text-4xl md:text-6xl font-bold text-white leading-tight">The universe is waiting.</h2>
        <p className="relative mt-6 max-w-xl mx-auto text-slate-400 text-lg">
          ORBIT is an experiment in using motion to tell a story — built with Anime.js, React and Tailwind CSS.
        </p>
        <a href="#home" className="relative inline-block mt-10 rounded-full px-8 py-4 font-semibold text-white bg-gradient-to-r from-pulse to-nebula hover:-translate-y-0.5 transition-transform">
          Back to launch
        </a>
      </div>
      <p className="mt-10 text-center text-xs text-slate-600">© {new Date().getFullYear()} ORBIT · Planet data approximate</p>
    </footer>
  );
}
