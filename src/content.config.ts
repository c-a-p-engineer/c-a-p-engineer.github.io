import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const article = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(), date: z.coerce.date(), description: z.string().default(''),
    tags: z.array(z.string()).default([]), categories: z.array(z.string()).default([]),
    draft: z.boolean().default(false), legacySlug: z.string().regex(/^[^/\s]+$/),
    image: z.string().optional(),
  }),
});
const project = defineCollection({ loader: glob({ pattern: '**/*.md', base: './src/content/projects' }), schema: z.object({ title: z.string(), description: z.string(), href: z.string().min(1), tags: z.array(z.string()).default([]), featured: z.boolean().default(false) }) });
const book = defineCollection({ loader: glob({ pattern: '**/*.md', base: './src/content/books' }), schema: z.object({ title: z.string(), description: z.string(), href: z.string().min(1).optional(), year: z.number().optional() }) });
export const collections = { articles: article, projects: project, books: book };
