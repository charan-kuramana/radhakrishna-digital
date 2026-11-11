// Post-build fix for Next.js static export.
//
// The client router prefetches flat files such as
//   /work/hostlify/__next.work.hostlify.__PAGE__.txt
// but on some platforms (seen on Windows) the export writes them nested as
//   /work/hostlify/__next.work/hostlify/__PAGE__.txt
// Without this, prefetches 404 and navigation falls back to slower full loads.
// This copies every nested segment file to its flat name. Harmless when the
// export is already flat.
import { copyFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const OUT = 'out';
let fixed = 0;

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (!statSync(full).isDirectory() || name === '_next') continue;
    if (name.startsWith('__next.')) flatten(dir, full);
    else walk(full);
  }
}

function flatten(pageDir, segDir) {
  const stack = [segDir];
  while (stack.length) {
    const d = stack.pop();
    for (const name of readdirSync(d)) {
      const full = join(d, name);
      if (statSync(full).isDirectory()) stack.push(full);
      else {
        const flat = join(pageDir, relative(pageDir, full).split(sep).join('.'));
        if (!existsSync(flat)) {
          copyFileSync(full, flat);
          fixed++;
        }
      }
    }
  }
}

if (existsSync(OUT)) walk(OUT);
console.log(`fix-export-segments: ${fixed} prefetch file(s) flattened`);
