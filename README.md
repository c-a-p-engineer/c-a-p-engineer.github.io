# Copy & Paste Engineer

The personal Engineer Hub and technical article archive for
[`c-a-p-engineer.github.io`](https://c-a-p-engineer.github.io/).

## Stack

- Astro 7
- Markdown content collections
- GitHub Pages
- GitHub Actions

## Development

```bash
npm install
npm run dev
```

Before publishing:

```bash
npm run verify:content
npm run build
```

Historical articles are generated at their original root-level slugs, for
example `/blog-move/`.

## Deployment

Pushes to `master` run `.github/workflows/deploy.yml`. The repository's Pages
source must be set to **GitHub Actions**.
