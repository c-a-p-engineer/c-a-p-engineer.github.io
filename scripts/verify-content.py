from pathlib import Path
import re, sys
files = list(Path('src/content/articles').glob('*.md'))
if not files: sys.exit('No migrated articles found. Run npm run migrate:hugo first.')
slugs = []
for path in files:
    text = path.read_text(encoding='utf-8')
    if not text.startswith('---\n') or 'legacySlug:' not in text: sys.exit(f'Missing migrated front matter: {path}')
    if re.search(r'{{[%<].*[%>]}}', text): sys.exit(f'Unconverted Hugo shortcode: {path}')
    match = re.search(r'^legacySlug: ([^/\s]+)$', text, re.M)
    if not match: sys.exit(f'Invalid legacySlug: {path}')
    slugs.append(match.group(1))
duplicates = sorted({s for s in slugs if slugs.count(s) > 1})
if duplicates: sys.exit('Duplicate legacy slugs: ' + ', '.join(duplicates))
print(f'Validated {len(files)} migrated articles.')
