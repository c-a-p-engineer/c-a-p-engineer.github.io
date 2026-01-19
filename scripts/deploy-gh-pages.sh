#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DOCS_DIR="${ROOT_DIR}/docs"
WORKTREE_DIR="${ROOT_DIR}/.gh-pages-worktree"
PAGES_BRANCH="gh-pages"
COMMIT_MESSAGE="Deploy Hugo site"

if ! command -v hugo >/dev/null 2>&1; then
  echo "hugo command not found. Please install Hugo." >&2
  exit 1
fi

if ! git -C "${ROOT_DIR}" rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "Not a git repository: ${ROOT_DIR}" >&2
  exit 1
fi

if ! git -C "${ROOT_DIR}" remote get-url origin >/dev/null 2>&1; then
  echo "Remote 'origin' is not configured. Please add a remote before deploying." >&2
  exit 1
fi

rm -rf "${DOCS_DIR}" "${WORKTREE_DIR}"

hugo --minify --source "${ROOT_DIR}/blog" --destination "${DOCS_DIR}"

if [ ! -f "${DOCS_DIR}/index.html" ]; then
  echo "Build output not found: ${DOCS_DIR}/index.html" >&2
  exit 1
fi

mkdir -p "${WORKTREE_DIR}"
git -C "${ROOT_DIR}" worktree add --detach "${WORKTREE_DIR}"

pushd "${WORKTREE_DIR}" >/dev/null

if git show-ref --quiet "refs/heads/${PAGES_BRANCH}"; then
  git branch -D "${PAGES_BRANCH}"
fi

git checkout --orphan "${PAGES_BRANCH}"

git rm -rf . >/dev/null 2>&1 || true

# Copy to root and /docs to match GitHub Pages folder setting.
cp -a "${DOCS_DIR}/." "${WORKTREE_DIR}/"
mkdir -p "${WORKTREE_DIR}/docs"
cp -a "${DOCS_DIR}/." "${WORKTREE_DIR}/docs/"
touch "${WORKTREE_DIR}/.nojekyll" "${WORKTREE_DIR}/docs/.nojekyll"

git add -A
git commit -m "${COMMIT_MESSAGE}"

git push -f origin "${PAGES_BRANCH}"

popd >/dev/null

git -C "${ROOT_DIR}" worktree remove "${WORKTREE_DIR}" --force

echo "Deployment to ${PAGES_BRANCH} completed."
