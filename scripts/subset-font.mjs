// Requires fonttools (pyftsubset). The full uploaded font is kept unchanged.
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../', import.meta.url));
execFileSync('pyftsubset', [`${root}public/fonts/MrBedfort-Regular.ttf`, '--text=WJL', '--layout-features=*', `--output-file=${root}public/fonts/MrBedfort-WJL.ttf`], { stdio: 'inherit' });
