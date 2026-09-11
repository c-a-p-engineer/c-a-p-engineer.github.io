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
  const updated = entries[0]
    ? (entries[0].data.updated ?? entries[0].data.date).toISOString()
    : new Date(0).toISOString();
  const items = entries.map(entry => {
    const url = `${site}/${entry.data.legacySlug}/`;
    const modified = (entry.data.updated ?? entry.data.date).toISOString();
    return [
      '<entry>',
      `<title>${escapeXml(entry.data.title)}</title>`,
      `<id>${url}</id>`,
      `<link href="${url}"/>`,
      `<published>${entry.data.date.toISOString()}</published>`,
      `<updated>${modified}</updated>`,
      `<summary>${escapeXml(entry.data.description)}</summary>`,
      '</entry>',
    ].join('');
  }).join('');
  const xml = `<?xml version="1.0" encoding="UTF-8"?><feed xmlns="http://www.w3.org/2005/Atom"><title>Copy &amp; Paste Engineer</title><id>${site}/</id><link href="${site}/"/><link rel="self" href="${site}/atom.xml"/><updated>${updated}</updated><author><name>Copy &amp; Paste Engineer</name><uri>${site}/about/</uri></author>${items}</feed>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/atom+xml; charset=utf-8' } });
};
