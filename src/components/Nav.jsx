import { useEffect, useRef } from 'react';
import { animate } from 'animejs';
import { reduced } from '../motion';

const links = [
  ['Explore', '#explore'],
  ['Discover', '#discover'],
  ['Missions', '#missions'],
  ['About', '#about'],
];

export default function Nav() {
  const ref = useRef(null);
  useEffect(() => {
    if (reduced()) return;
    const a = animate(ref.current, { opacity: [0, 1], y: [-24, 0], duration: 900, delay: 300, ease: 'outExpo' });
    return () => a.revert();
  }, []);

  return (
    <header ref={ref} className="fixed top-4 inset-x-0 z-50 flex justify-center px-4">
      <nav className="glass rounded-full flex items-center gap-2 sm:gap-6 pl-5 pr-2 py-2 text-sm">
        <a href="#home" className="font-display font-bold tracking-[0.2em] text-white">ORBIT</a>
        <span className="hidden sm:block h-4 w-px bg-white/15" />
        <ul className="flex items-center gap-0.5 sm:gap-1">
          {links.map(([label, href]) => (
            <li key={href}>
              <a href={href} className="px-2.5 sm:px-3 py-1.5 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors">
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
