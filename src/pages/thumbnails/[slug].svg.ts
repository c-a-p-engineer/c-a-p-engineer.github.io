import type { APIRoute, GetStaticPaths } from 'astro';
import { articles } from '../../lib';

const xml = (value: string) =>
  value.replace(/[&<>"']/g, char => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&apos;',
  })[char] ?? char);

const wrapTitle = (title: string, maxUnits = 19, maxLines = 3) => {
  const chars = Array.from(title);
  const lines: string[] = [];
  let current = '';
  let units = 0;

  const width = (char: string) => /[\u0000-\u00ff]/.test(char) ? 0.58 : 1;

  for (const char of chars) {
    const next = units + width(char);
    if (current && next > maxUnits) {
      lines.push(current);
      current = char;
      units = width(char);
      if (lines.length === maxLines - 1) break;
    } else {
      current += char;
      units = next;
    }
  }

  const consumed = lines.join('').length + current.length;
  if (current && lines.length < maxLines) lines.push(current);
  if (consumed < chars.length && lines.length > 0) {
    lines[lines.length - 1] = lines[lines.length - 1].replace(/[。．、,\s]+$/u, '') + '…';
  }
  return lines.slice(0, maxLines);
};

export const getStaticPaths: GetStaticPaths = async () => {
  const entries = await articles();
  return entries.map(entry => ({
    params: { slug: entry.data.legacySlug },
    props: { entry },
  }));
};

export const GET: APIRoute = ({ props }) => {
  const { entry } = props as { entry: Awaited<ReturnType<typeof articles>>[number] };
  const title = entry.data.title;
  const category = entry.data.categories[0] || entry.data.tags[0] || 'TECH';
  const date = entry.data.date.toLocaleDateString('ja-JP');
  const lines = wrapTitle(title);

  const lineSvg = lines
    .map((line, index) => `<text x="76" y="${270 + index * 72}" fill="#f8fafc" font-family="system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI','Noto Sans JP',sans-serif" font-size="52" font-weight="800" letter-spacing="-1.2">${xml(line)}</text>`)
    .join('');

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675" role="img" aria-labelledby="title desc">
  <title id="title">${xml(title)}</title>
  <desc id="desc">Copy &amp; Paste Engineer article thumbnail</desc>
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1200" y2="675" gradientUnits="userSpaceOnUse">
      <stop stop-color="#111827"/>
      <stop offset=".55" stop-color="#25264a"/>
      <stop offset="1" stop-color="#4338ca"/>
    </linearGradient>
    <radialGradient id="glow" cx="0" cy="0" r="1" gradientTransform="translate(1040 90) rotate(140) scale(430 330)" gradientUnits="userSpaceOnUse">
      <stop stop-color="#818cf8" stop-opacity=".55"/>
      <stop offset="1" stop-color="#818cf8" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="675" rx="34" fill="url(#bg)"/>
  <rect width="1200" height="675" rx="34" fill="url(#glow)"/>
  <path d="M76 116H1124" stroke="#c7d2fe" stroke-opacity=".22"/>
  <text x="76" y="84" fill="#c7d2fe" font-family="ui-monospace,SFMono-Regular,Menlo,monospace" font-size="22" font-weight="700" letter-spacing="2">COPY &amp; PASTE ENGINEER</text>
  <rect x="76" y="154" width="${Math.max(138, category.length * 25 + 48)}" height="48" rx="24" fill="#eef2ff" fill-opacity=".12" stroke="#c7d2fe" stroke-opacity=".35"/>
  <text x="100" y="186" fill="#e0e7ff" font-family="system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI','Noto Sans JP',sans-serif" font-size="22" font-weight="700">${xml(category)}</text>
  ${lineSvg}
  <text x="76" y="604" fill="#cbd5e1" font-family="ui-monospace,SFMono-Regular,Menlo,monospace" font-size="20">${xml(date)}</text>
  <text x="1124" y="604" text-anchor="end" fill="#e0e7ff" font-family="ui-monospace,SFMono-Regular,Menlo,monospace" font-size="20">c-a-p-engineer.github.io</text>
</svg>`;

  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
