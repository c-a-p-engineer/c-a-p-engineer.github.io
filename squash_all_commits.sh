#!/bin/bash

# 新しい孤立したブランチを作成
git checkout --orphan temp-branch

# すべてのファイルをステージング
git add -A

# 新しいコミットを作成
git commit -m "Initial commit with all changes"

# 新しいブランチをリネーム（元のブランチを保持したい場合はこの行をコメントアウト）
git branch -M master

# 古いブランチを削除（元のブランチを保持したい場合はこの行をコメントアウト）
git branch -D old-master

# 古い履歴を削除
git reflog expire --expire=now --all
git gc --prune=now --aggressive

echo "All commits have been squashed into a single commit."
