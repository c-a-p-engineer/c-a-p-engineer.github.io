"""Download Hugo articles from the canonical master and emit Astro content.
Run once during the migration; the generated Markdown is committed afterwards.
"""
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime
from pathlib import Path
import json, os, re, urllib.request

ROOT = 'https://api.github.com/repos/c-a-p-engineer/c-a-p-engineer.github.io'
def get(url):
    with urllib.request.urlopen(url) as response: return response.read()
tree_file = os.environ.get('CAP_HUGO_TREE')
tree = json.loads(Path(tree_file).read_text() if tree_file else get(ROOT + '/git/trees/master?recursive=1'))['tree']
items = [x for x in tree if x['type'] == 'blob' and re.match(r'blog/content/ja/tech/\d{4}/', x['path']) and x['path'].endswith('.md')]
by_destination = {}
for item in items:
    destination = Path(item['path']).stem.lower()
    previous = by_destination.get(destination)
    if previous and previous['sha'] != item['sha']:
        raise ValueError(f'Conflicting legacy URL /{destination}/ from {previous["path"]} and {item["path"]}')
    by_destination[destination] = item
items = list(by_destination.values())
def fetch(item):
    path = item['path']
    local_root = os.environ.get('CAP_HUGO_SOURCE')
    if local_root:
        return path, (Path(local_root) / path).read_text(encoding='utf-8')
    # Raw content avoids GitHub's REST API request-rate limit for the article archive.
    return path, get('https://raw.githubusercontent.com/c-a-p-engineer/c-a-p-engineer.github.io/master/' + path).decode('utf-8')
def scalar(value): return str(value).strip().strip('"\'')
def convert(pair):
    path, source = pair
    source = source.lstrip('\ufeff')
    match = re.match(r'^---\s*\n(.*?)\n---\s*\n?(.*)$', source, re.S)
    if not match: raise ValueError('No YAML front matter: ' + path)
    front, body = match.groups(); fields = {}
    for key in ('title','date','description','draft','slug','image','thumbnail'):
        value = re.search(rf'^{key}:\s*(.+)$', front, re.M)
        if value: fields[key] = scalar(value.group(1))
    def array(key):
        value = re.search(rf'^{key}:\s*\[(.*?)\]', front, re.M)
        return [scalar(x) for x in value.group(1).split(',') if scalar(x)] if value else []
    slug = fields.get('slug') or Path(path).stem.lower()
    body = re.sub(r'(!\[[^]]*\]\()\./([^\s)]+)', rf'\1/legacy-assets/{slug}/\2', body)
    body = re.sub(r'(!\[[^]]*\]\()((?!https?://|/)[^\s)]+)', rf'\1/legacy-assets/{slug}/\2', body)
    # Replace the known zzo shortcodes with portable HTML/Markdown equivalents.
    body = re.sub(r'{{<\s*expand\s+"([^"]+)"\s*>}}', r'<details><summary>\1</summary>\n', body)
    body = re.sub(r'{{<\s*/expand\s*>}}', '</details>', body)
    body = re.sub(r'{{<\s*(?:notice|alert)[^>]*>}}', '> **補足**\n> ', body)
    body = re.sub(r'{{<\s*/(?:notice|alert)\s*>}}', '', body)
    body = re.sub(r'{{<\s*/?(?:codes|code)(?:\s+[^>]*)?>}}', '', body)
    body = re.sub(r'{{<\s*(youtube)\s+([^>]+)>}}', r'<div class="embed embed-\1">\2</div>', body)
    if re.search(r'{{[%<].*[%>]}}', body): raise ValueError('Unsupported Hugo shortcode: ' + path)
    date = fields.get('date', '2021-01-01T00:00:00+09:00')
    title = fields.get('title', slug).replace('"', '\\"')
    description = fields.get('description', '').replace('"', '\\"')
    out = ['---', f'title: "{title}"', f'date: {date}', f'description: "{description}"', 'tags: [' + ', '.join(json.dumps(x, ensure_ascii=False) for x in array('tags')) + ']', 'categories: [' + ', '.join(json.dumps(x, ensure_ascii=False) for x in array('categories')) + ']', f'draft: {fields.get("draft", "false").lower()}', f'legacySlug: {slug}']
    if fields.get('image') or fields.get('thumbnail'): out.append('image: ' + json.dumps(fields.get('image') or fields['thumbnail']))
    out.extend(['---', '', body.rstrip(), ''])
    return slug, '\n'.join(out)
output = Path('src/content/articles'); output.mkdir(parents=True, exist_ok=True)
existing = {p.stem for p in output.glob('*.md')}
pending = [item for item in items if Path(item['path']).stem.lower() not in existing]
with ThreadPoolExecutor(max_workers=16) as pool:
    for slug, content in pool.map(lambda item: convert(fetch(item)), pending):
        (output / f'{slug}.md').write_text(content, encoding='utf-8')
print(f'Migrated {len(items)} articles ({len(pending)} fetched this run).')
