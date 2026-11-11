import { vars } from './Text';

/* Every background is decorative (aria-hidden), absolutely positioned, CSS-animated. */

export function AuroraBg({ colors = ['#1f5b8c', '#5b3e9c', '#0e7a6e'] }: { colors?: string[] }) {
  return (
    <div aria-hidden className="bg-noise pointer-events-none absolute inset-0 overflow-hidden">
      <div className="aurora-blob -top-48 -left-32 h-[36rem] w-[36rem]" style={{ background: colors[0] }} />
      <div className="aurora-blob -right-32 -bottom-56 h-[32rem] w-[32rem] [animation-delay:-8s]" style={{ background: colors[1] }} />
      <div className="aurora-blob top-1/3 right-1/4 h-80 w-80 [animation-delay:-15s]" style={{ background: colors[2] }} />
      <div className="bg-grid absolute inset-0 opacity-60" />
    </div>
  );
}

/** Services: grid with light beams travelling along the lines. */
export function GridBeamsBg() {
  const xs = [1, 4, 7, 10];
  const ys = [3, 8, 13, 18];
  return (
    <div aria-hidden className="bg-noise pointer-events-none absolute inset-0 overflow-hidden">
      <div className="bg-grid absolute inset-0" />
      <div className="absolute inset-0 [mask-image:linear-gradient(90deg,transparent_15%,#000_60%)]">
      {xs.map((row, i) => (
        <span key={`x${row}`} className="beam-x" style={vars({ top: `${row * 56}px`, '--d': `${i * -1.8}s`, '--t': `${6 + i}s` })} />
      ))}
      {ys.map((col, i) => (
        <span key={`y${col}`} className="beam-y" style={vars({ left: `${col * 56}px`, '--d': `${i * -2.3}s`, '--t': `${7 + i}s` })} />
      ))}
      </div>
      <div className="aurora-blob -top-40 right-0 h-[30rem] w-[30rem]" style={{ background: 'var(--accent)', opacity: 0.16 }} />
    </div>
  );
}

/** Work: drifting mesh of warm colour blobs. */
export function MeshBg() {
  return (
    <div aria-hidden className="bg-noise pointer-events-none absolute inset-0 overflow-hidden">
      <div className="aurora-blob -top-32 left-[10%] h-[28rem] w-[28rem]" style={{ background: 'var(--accent)', opacity: 0.3 }} />
      <div className="aurora-blob top-[20%] right-[-6rem] h-[26rem] w-[26rem] [animation-delay:-6s]" style={{ background: 'var(--accent-2)', opacity: 0.26 }} />
      <div className="aurora-blob bottom-[-10rem] left-[35%] h-[24rem] w-[24rem] [animation-delay:-12s]" style={{ background: '#7c3aed', opacity: 0.22 }} />
      <div className="bg-dots absolute inset-0 opacity-50" />
    </div>
  );
}

/** About: slowly rotating warm conic glow + floating embers. */
export function WarmBg() {
  const embers = [
    [8, 70, 0], [18, 30, 2], [30, 80, 4], [45, 20, 1], [60, 65, 3], [72, 35, 5], [85, 75, 2], [92, 25, 4],
  ];
  return (
    <div aria-hidden className="bg-noise pointer-events-none absolute inset-0 overflow-hidden">
      <div className="warm-conic -top-40 -right-40 h-[40rem] w-[40rem]" />
      <div className="warm-conic -bottom-60 -left-40 h-[34rem] w-[34rem] [animation-direction:reverse]" />
      {embers.map(([x, y, dl], i) => (
        <span
          key={i}
          className="float-slow absolute size-1.5 rounded-full"
          style={vars({ left: `${x}%`, top: `${y}%`, background: i % 2 ? 'var(--accent)' : 'var(--accent-2)', boxShadow: '0 0 12px currentColor', '--d': `${-dl}s` })}
        />
      ))}
    </div>
  );
}

/** Contact: radar pulse rings and a rotating sweep. */
export function RadarBg({ className = '' }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute aspect-square ${className}`}>
      <div className="radar-sweep" />
      {[0, 1.5, 3, 4.5].map((dl) => (
        <span key={dl} className="radar-ring" style={vars({ '--d': `${dl}s` })} />
      ))}
      <span className="absolute inset-[30%] rounded-full border border-line" />
      <span className="absolute inset-[15%] rounded-full border border-line" />
      <span className="absolute inset-0 rounded-full border border-line" />
    </div>
  );
}

/** Hostlify: a hostel floor plan where beds light up as they're "booked". */
export function BedGridBg({ cols = 12, rows = 6, className = '' }: { cols?: number; rows?: number; className?: string }) {
  const n = cols * rows;
  return (
    <div aria-hidden className={`pointer-events-none grid gap-2 ${className}`} style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
      {Array.from({ length: n }, (_, i) => (
        // pseudo-random but deterministic order so SSR and client match
        <span key={i} className="bed aspect-[3/4]" style={vars({ '--i': (i * 37) % n })} />
      ))}
    </div>
  );
}

/** Small CSS globe (mobile + before WebGL loads). */
export function CssGlobe({ className = '' }: { className?: string }) {
  return (
    <div aria-hidden className={`css-globe ${className}`}>
      <div className="core" />
      {[
        ['0s', '65deg'],
        ['-4s', '25deg'],
        ['-8s', '-40deg'],
      ].map(([dl, tilt]) => (
        <span key={tilt} className="ring" style={vars({ '--d': dl, '--tilt': tilt })} />
      ))}
    </div>
  );
}
