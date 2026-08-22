import { getCollection } from 'astro:content';
export const articles = async () => (await getCollection('articles', ({ data }) => !data.draft)).sort((a,b) => b.data.date.valueOf() - a.data.date.valueOf());
