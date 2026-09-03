import { getCollection } from 'astro:content';

export const articles = async () =>
  (await getCollection('articles', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );

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
