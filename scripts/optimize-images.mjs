// Rebuild optimized assets from the untouched source PNGs. Requires cwebp.
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../', import.meta.url));
for (const [source, widths] of [['portrait-cutout', [480, 800, 1085]], ['profile-portrait-relaxed', [480, 882]]]) {
  for (const width of widths) execFileSync('cwebp', ['-quiet', '-q', '88', '-m', '6', '-alpha_q', '100', '-exact', '-resize', String(width), '0', `${root}public/images/${source}.png`, '-o', `${root}public/images/${source}-${width}.webp`], { stdio: 'inherit' });
}
