import fs from 'node:fs';
import path from 'node:path';
import { gzipSync } from 'node:zlib';

const root = new URL('../', import.meta.url);
const read = name => fs.readFileSync(new URL(name, root));
const html = read('dist/index.html').toString();
const entry = html.match(/<script[^>]+src="([^"]+)"/)?.[1];
if (!entry) throw new Error('Build first: npm run build');
const seen = new Set();
function visit(url) {
  if (seen.has(url)) return;
  seen.add(url);
  const code = read(`dist${url}`).toString();
  for (const match of code.matchAll(/(?:from\s*|import\s*)["'](\.\.?\/[^"']+\.js)["']/g)) {
    visit(path.posix.resolve(path.posix.dirname(url), match[1]));
  }
}
visit(entry);
const scripts = [...seen].map(url => {
  const data = read(`dist${url}`);
  return { file: url, bytes: data.length, gzipBytes: gzipSync(data).length };
});
const size = file => read(`public/${file}`).length;
const before = { initialJsBytes: 579048, initialJsGzipBytes: 195744, portraitsBytes: size('images/portrait-cutout.png') + size('images/profile-portrait-relaxed.png'), fontBytes: size('fonts/MrBedfort-Regular.ttf') };
const after = { initialJsBytes: scripts.reduce((sum, file) => sum + file.bytes, 0), initialJsGzipBytes: scripts.reduce((sum, file) => sum + file.gzipBytes, 0), portraitsBytes: size('images/portrait-cutout-1085.webp') + size('images/profile-portrait-relaxed-882.webp'), fontBytes: size('fonts/MrBedfort-WJL.ttf') };
const limits = { initialJsGzipBytes: 160000, portraitsBytes: 150000, fontBytes: 2500 };
const violations = Object.entries(limits).filter(([key, limit]) => after[key] > limit).map(([key, limit]) => `${key}: ${after[key]} > ${limit}`);
if (scripts.some(file => /gsap|ProjectDialog|ShatterHeadline|SplashCursorEngine/.test(file.file))) violations.push('A deferred effect is in the synchronous entry graph.');
const report = {
  before, after,
  reductionsPercent: Object.fromEntries(Object.keys(before).map(key => [key, Math.round((1 - after[key] / before[key]) * 1000) / 10])),
  initialScripts: scripts, limits, passed: violations.length === 0, violations,
  notes: ['JS counts include static imports of the HTML entry, not just the entry file.', 'Portrait comparison uses full-size versions; smaller responsive variants may transfer fewer bytes.', 'gzip sizes are local estimates; no Lighthouse score or load-time improvement is claimed.'],
};
console.log(JSON.stringify(report, null, 2));
if (process.argv.includes('--report')) fs.writeFileSync(new URL('performance-results.json', root), JSON.stringify(report, null, 2) + '\n');
if (violations.length) process.exitCode = 1;
