import { useEffect } from 'react';
import { animate } from 'animejs';

export const reduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Fades + lifts every [data-reveal] element inside `ref` as it scrolls into view.
export function useReveal(ref) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const items = root.querySelectorAll('[data-reveal]');
    if (reduced()) {
      items.forEach((el) => (el.style.opacity = 1));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        let i = 0;
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          animate(e.target, {
            opacity: [0, 1],
            y: [40, 0],
            duration: 900,
            delay: i++ * 110,
            ease: 'outExpo',
          });
          io.unobserve(e.target);
        });
      },
      { threshold: 0.2 }
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}
