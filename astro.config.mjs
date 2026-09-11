import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const isHumanCanonicalPage = (page) =>
  !page.endsWith('.md') &&
  !page.endsWith('/llms.txt') &&
  !page.endsWith('/rss.xml') &&
  !page.endsWith('/atom.xml');

export default defineConfig({
  site: 'https://c-a-p-engineer.github.io',
  output: 'static',
  integrations: [sitemap({ filter: isHumanCanonicalPage })],
  markdown: { shikiConfig: { theme: 'github-dark' } },
});
