import type { APIRoute, GetStaticPaths } from 'astro';
import { articles } from '../lib';

export const getStaticPaths = (async () => {
  const entries = await articles();
  return entries.map(entry => ({
    params: { slug: entry.data.legacySlug },
    props: { entry },
  }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = ({ props }) => {
  const entry = props.entry as Awaited<ReturnType<typeof articles>>[number];
  const siteOrigin = 'https://c-a-p-engineer.github.io';
  const canonical = `${siteOrigin}/${entry.data.legacySlug}/`;
  const published = entry.data.date.toISOString();
  const modified = (entry.data.updated ?? entry.data.date).toISOString();
  const bodyLines = (entry.body ?? '').split('\n');
  if (bodyLines[0]?.trim() === `# ${entry.data.title}`) bodyLines.shift();
  const body = bodyLines.join('\n').replace(/^\s+/, '');
  const metadata = [
    `# ${entry.data.title}`,
    entry.data.description ? `> ${entry.data.description.replace(/\s+/g, ' ').trim()}` : '',
    '',
    `- Canonical: ${canonical}`,
    `- Published: ${published}`,
    `- Modified: ${modified}`,
    entry.data.categories.length ? `- Categories: ${entry.data.categories.join(', ')}` : '',
    entry.data.tags.length ? `- Tags: ${entry.data.tags.join(', ')}` : '',
  ].filter(Boolean).join('\n');

  return new Response(`${metadata}\n\n${body}\n`, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
