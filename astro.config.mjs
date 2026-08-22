import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://c-a-p-engineer.github.io',
  output: 'static',
  integrations: [sitemap()],
  markdown: { shikiConfig: { theme: 'github-dark' } },
});
