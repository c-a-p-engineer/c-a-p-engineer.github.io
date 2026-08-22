# Repository guidelines

## Scope

These instructions apply to the whole repository.

## Architecture

- The site is an Astro 7 static site deployed to GitHub Pages.
- Articles live in `src/content/articles/` and preserve their historical root-level URL through `legacySlug`.
- Projects and books live in their corresponding content collections.
- Public images belong in `public/images/`; migrated article-local assets belong in `public/legacy-assets/`.

## Working rules

1. Preserve existing article URLs. Do not change `legacySlug` without adding a compatible redirect.
2. Use YAML front matter and keep `title`, `date`, `description`, `tags`, `categories`, `draft`, and `legacySlug` valid.
3. Do not add Hugo shortcodes. Use portable Markdown or HTML.
4. Run `npm run verify:content` and `npm run build` before merging.
5. Keep deployment in `.github/workflows/deploy.yml` compatible with GitHub Pages Actions.
6. Use Conventional Commits for commits and pull requests where practical.

## Article checklist

- Use lowercase, stable slugs where possible.
- Keep images in the public asset directories and verify their rendered paths.
- Use ISO 8601 dates with the intended timezone.
- Keep drafts marked with `draft: true`.
- Check external links, code fences, and mobile readability.
