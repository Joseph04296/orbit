import { useEffect, useRef } from 'react';
import { animate } from 'animejs';
import { reduced } from '../motion';

export default function Starfield() {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    const count = window.innerWidth < 768 ? 70 : 150;
    for (let i = 0; i < count; i++) {
      const s = document.createElement('span');
      const size = Math.random() * 2 + 0.6;
      s.className = 'star';
      Object.assign(s.style, {
        position: 'absolute',
        left: Math.random() * 100 + '%',
        top: Math.random() * 100 + '%',
        width: size + 'px',
        height: size + 'px',
        borderRadius: '50%',
        background: '#fff',
        opacity: String(Math.random() * 0.5 + 0.2),
      });
      root.appendChild(s);
    }
    let twinkle;
    if (!reduced()) {
      twinkle = animate(root.querySelectorAll('.star'), {
        opacity: [0.12, 1],
        duration: () => 1500 + Math.random() * 2500,
        delay: () => Math.random() * 3000,
        alternate: true,
        loop: true,
        ease: 'inOutSine',
      });
    }
    return () => {
      twinkle && twinkle.revert();
      root.innerHTML = '';
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
      style={{
        background:
          'radial-gradient(60% 50% at 80% 10%, rgba(59,130,246,.14), transparent 70%), radial-gradient(50% 45% at 10% 80%, rgba(139,92,246,.14), transparent 70%)',
      }}
    >
      <div ref={ref} className="absolute inset-0" />
    </div>
  );
}
