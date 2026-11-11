'use client';

import { useEffect, useState } from 'react';

/** Types and deletes each word in turn. Screen readers get the full list once. */
export default function Typewriter({ words, className = '' }: { words: string[]; className?: string }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(words[0]);
  const [deleting, setDeleting] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(!window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    if (!active) return;
    const full = words[index];
    let t: ReturnType<typeof setTimeout>;
    if (!deleting && text === full) t = setTimeout(() => setDeleting(true), 1900);
    else if (deleting && text === '') {
      t = setTimeout(() => {
        setDeleting(false);
        setIndex((i) => (i + 1) % words.length);
      }, 250);
    } else {
      const next = deleting ? full.slice(0, text.length - 1) : words[index].slice(0, text.length + 1);
      t = setTimeout(() => setText(next), deleting ? 32 : 68);
    }
    return () => clearTimeout(t);
  }, [text, deleting, index, active, words]);

  return (
    <span className={className}>
      <span className="sr-only">{words.join(', ')}</span>
      <span aria-hidden>
        {text}
        <span className="caret" />
      </span>
    </span>
  );
}
