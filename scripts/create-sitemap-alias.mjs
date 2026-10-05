import { copyFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const source = resolve('dist/sitemap-index.xml');
const target = resolve('dist/sitemap.xml');

await copyFile(source, target);
console.log('Created sitemap alias: dist/sitemap.xml');
