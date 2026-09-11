import type { APIRoute } from 'astro';
import { articles } from '../lib';

const site = 'https://c-a-p-engineer.github.io';
const escapeXml = (value: string) => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&apos;');

export const GET: APIRoute = async () => {
  const entries = (await articles()).slice(0, 50);
  const lastBuildDate = entries[0]
    ? (entries[0].data.updated ?? entries[0].data.date).toUTCString()
    : new Date(0).toUTCString();
  const items = entries.map(entry => {
    const url = `${site}/${entry.data.legacySlug}/`;
    return [
      '<item>',
      `<title>${escapeXml(entry.data.title)}</title>`,
      `<link>${url}</link>`,
      `<guid isPermaLink="true">${url}</guid>`,
      `<pubDate>${entry.data.date.toUTCString()}</pubDate>`,
      `<description>${escapeXml(entry.data.description)}</description>`,
      '</item>',
    ].join('');
  }).join('');
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Copy &amp; Paste Engineer</title><link>${site}/</link><description>ソフトウェア、AI、OSS、自動化の技術ブログ</description><language>ja-jp</language><lastBuildDate>${lastBuildDate}</lastBuildDate>${items}</channel></rss>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};
