import { copyFile } from 'node:fs/promises';

// Static hosts can serve the same entry document for unknown paths with HTTP 404.
await copyFile(new URL('../dist/index.html', import.meta.url), new URL('../dist/404.html', import.meta.url));
