import { getCollection } from 'astro:content';

const taxonomyRules = [
  { category: 'PHP', tags: ['PHP'], pattern: /\bPHP\b|Laravel|Phalcon|Composer|Xdebug|PHPUnit/i },
  { category: 'JavaScript', tags: ['JavaScript'], pattern: /JavaScript|TypeScript|React|Node(?:\.js)?|npm|Web Audio|Electron/i },
  { category: 'Docker', tags: ['Docker'], pattern: /Docker|docker-compose|Dockle|Hadolint/i },
  { category: 'Git', tags: ['Git'], pattern: /(?:^|\W)git(?:\W|$)|GitHub|GitLab/i },
  { category: 'Database', tags: ['Database'], pattern: /MySQL|MariaDB|PostgreSQL|SQLite|SQL|database|データベース/i },
  { category: 'AWS', tags: ['AWS'], pattern: /\bAWS\b|Lambda|CloudWatch|S3|EC2|ECS|CloudFormation/i },
  { category: 'Elixir', tags: ['Elixir'], pattern: /Elixir|Phoenix|LiveView|Ecto|Mix\b/i },
  { category: 'Flutter', tags: ['Flutter'], pattern: /Flutter|\bDart\b/i },
  { category: 'Python', tags: ['Python'], pattern: /Python|Django|Flask|pip\b/i },
  { category: 'AI', tags: ['AI'], pattern: /(?:^|\W)AI(?:\W|$)|LLM|OpenAI|ChatGPT|生成AI|Stable Diffusion/i },
  { category: 'Linux', tags: ['Linux'], pattern: /Linux|Ubuntu|CentOS|Bash|Shell|WSL|systemd|cron/i },
  { category: 'Web', tags: ['Web'], pattern: /HTML|CSS|HTTP|REST|API|Swagger|OpenAPI|Firefox|Chrome|ブラウザ/i },
  { category: 'Testing', tags: ['Testing'], pattern: /PHPUnit|テスト|testing|Dusk|Jest|Cypress/i },
  { category: 'Mobile', tags: ['Mobile'], pattern: /Android|iOS|Kotlin|Swift|モバイル/i },
] as const;

const tagRules = [
  ['Laravel', /Laravel/i],
  ['Phalcon', /Phalcon/i],
  ['PHPUnit', /PHPUnit/i],
  ['MySQL', /MySQL/i],
  ['PostgreSQL', /PostgreSQL/i],
  ['React', /React/i],
  ['TypeScript', /TypeScript/i],
  ['Node.js', /Node(?:\.js)?/i],
  ['npm', /(?:^|\W)npm(?:\W|$)/i],
  ['GitHub', /GitHub/i],
  ['Docker Compose', /docker-compose|Docker Compose/i],
  ['VSCode', /VS\s*Code|VSCode/i],
  ['WSL', /\bWSL\b/i],
  ['Bash', /\bBash\b/i],
  ['Phoenix', /Phoenix/i],
  ['Flutter', /Flutter/i],
  ['Dart', /\bDart\b/i],
  ['Django', /Django/i],
  ['Swagger', /Swagger/i],
  ['OpenAPI', /OpenAPI/i],
  ['Firefox', /Firefox/i],
] as const;

const enrichTaxonomy = <T extends { data: { title: string; description: string; legacySlug: string; image?: string; tags: string[]; categories: string[] } }>(article: T): T => {
  const text = [
    article.data.title,
    article.data.description,
    article.data.legacySlug,
    article.data.image ?? '',
  ].join('\n');

  const categories = new Set(article.data.categories);
  const tags = new Set(article.data.tags);

  for (const rule of taxonomyRules) {
    if (!rule.pattern.test(text)) continue;
    categories.add(rule.category);
    for (const tag of rule.tags) tags.add(tag);
  }

  for (const [tag, pattern] of tagRules) {
    if (pattern.test(text)) tags.add(tag);
  }

  return {
    ...article,
    data: {
      ...article.data,
      categories: [...categories],
      tags: [...tags],
    },
  };
};

export const articles = async () =>
  (await getCollection('articles', ({ data }) => !data.draft))
    .map(enrichTaxonomy)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

export const techBookFestOgp = (href?: string) => {
  if (!href) return undefined;

  try {
    const url = new URL(href);
    if (url.hostname !== 'techbookfest.org') return undefined;

    const productId = url.pathname.match(/^\/product\/([^/]+)/)?.[1];
    return productId
      ? `https://techbookfest.org/api/product/ogp/image/${productId}`
      : undefined;
  } catch {
    return undefined;
  }
};
