import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { articles } from '../lib';

const site = 'https://c-a-p-engineer.github.io';
const mdLink = (article: Awaited<ReturnType<typeof articles>>[number]) =>
  `- [${article.data.title}](${site}/${article.data.legacySlug}.md): ${article.data.description || '技術記事'}`;

export const GET: APIRoute = async () => {
  const [allArticles, projects] = await Promise.all([
    articles(),
    getCollection('projects'),
  ]);
  const aiPattern = /AI|LLM|OpenAI|ChatGPT|生成AI|agent|エージェント|harness|ハーネス/i;
  const aiArticles = allArticles.filter(article => {
    const text = [
      article.data.title,
      article.data.description,
      ...article.data.tags,
      ...article.data.categories,
    ].join(' ');
    return aiPattern.test(text);
  }).slice(0, 24);
  const recent = allArticles.slice(0, 24);

  const lines = [
    '# Copy & Paste Engineer',
    '',
    '> ソフトウェア開発、生成AI、OSS、自動化を中心に、実際に作って試した技術記録。記事のMarkdown版をAIエージェント向けに提供しています。',
    '',
    'Canonical HTML is the source of truth for presentation. Markdown alternates contain the article body and essential metadata for retrieval and citation.',
    '',
    '## AI / Agents',
    '',
    ...aiArticles.map(mdLink),
    '',
    '## Recent technical notes',
    '',
    ...recent.map(mdLink),
    '',
    '## Projects',
    '',
    ...projects
      .sort((a, b) => a.data.order - b.data.order)
      .map(project => `- [${project.data.title}](${new URL(project.data.href, site).href}): ${project.data.description}`),
    '',
    '## Site indexes',
    '',
    `- [Articles](${site}/articles/): all published articles and taxonomy filters`,
    `- [Search](${site}/search/): title, description, tag, and category search`,
    `- [About](${site}/about/): author profile and activity index`,
    `- [RSS](${site}/rss.xml): latest articles in RSS 2.0`,
    `- [Atom](${site}/atom.xml): latest articles in Atom 1.0`,
    `- [Sitemap](${site}/sitemap-index.xml): canonical site sitemap`,
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
