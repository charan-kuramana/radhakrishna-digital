'use client';

import { useEffect, useRef } from 'react';

/** Twinkling, slowly drifting starfield (Start a Project page). Pauses off-screen. */
export default function Starfield({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio, 2);
    let w = 0;
    let h = 0;
    let stars: { x: number; y: number; r: number; p: number; s: number }[] = [];

    const colour = () => getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#a78bfa';
    let accent = colour();

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round((w * h) / 5200);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.3 + 0.2,
        p: Math.random() * Math.PI * 2,
        s: Math.random() * 0.25 + 0.05,
      }));
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let visible = true;
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) loop();
    });
    io.observe(canvas);

    const onTheme = () => (accent = colour());
    document.documentElement.addEventListener('rd-theme-change', onTheme);

    let raf = 0;
    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const light = document.documentElement.dataset.theme === 'light';
      for (const st of stars) {
        const a = 0.35 + 0.65 * Math.abs(Math.sin(t * 0.8 + st.p));
        ctx.globalAlpha = a * (light ? 0.6 : 1);
        ctx.fillStyle = st.r > 1.1 ? accent : light ? '#475569' : '#e2e8f0';
        ctx.beginPath();
        ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2);
        ctx.fill();
        if (!reduce) {
          st.y -= st.s;
          if (st.y < -2) st.y = h + 2;
        }
      }
    };
    function loop() {
      cancelAnimationFrame(raf);
      const step = () => {
        if (!visible || document.hidden) return;
        t += 0.016;
        draw();
        raf = requestAnimationFrame(step);
      };
      if (reduce) draw();
      else raf = requestAnimationFrame(step);
    }
    loop();
    const onVis = () => !document.hidden && loop();
    document.addEventListener('visibilitychange', onVis);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      document.documentElement.removeEventListener('rd-theme-change', onTheme);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={`pointer-events-none absolute inset-0 size-full ${className}`} />;
}
