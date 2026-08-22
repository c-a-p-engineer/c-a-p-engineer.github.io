"""Fetch article-local image assets required by migrated Markdown."""
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path, PurePosixPath
import json, os, re, time, urllib.request

ROOT = 'https://raw.githubusercontent.com/c-a-p-engineer/c-a-p-engineer.github.io/master/'
tree_file = os.environ.get('CAP_HUGO_TREE')
tree = json.loads(Path(tree_file).read_text() if tree_file else urllib.request.urlopen('https://api.github.com/repos/c-a-p-engineer/c-a-p-engineer.github.io/git/trees/master?recursive=1').read())['tree']
available = {x['path'] for x in tree if x['type'] == 'blob'}
source_root = Path(os.environ.get('CAP_HUGO_SOURCE', ''))
sources = source_root.glob('blog/content/ja/tech/**/*.md') if source_root.exists() else []
jobs = []
for source in sources:
    relative = source.relative_to(source_root).as_posix()
    slug = source.stem.lower()
    for image in re.findall(r'!\[[^]]*\]\(\./([^\s)]+)', source.read_text(encoding='utf-8').lstrip('\ufeff')):
        origin = (PurePosixPath(relative).parent / PurePosixPath(relative).stem / image).as_posix()
        if origin in available:
            jobs.append((origin, Path('public/legacy-assets') / slug / image))
def fetch(job):
    origin, output = job
    if output.exists(): return
    output.parent.mkdir(parents=True, exist_ok=True)
    for attempt in range(3):
        try:
            with urllib.request.urlopen(ROOT + origin) as r: output.write_bytes(r.read())
            return
        except OSError:
            if attempt == 2: raise
            time.sleep(attempt + 1)
with ThreadPoolExecutor(max_workers=4) as pool: list(pool.map(fetch, jobs))
print(f'Migrated {len(jobs)} article-local assets.')
