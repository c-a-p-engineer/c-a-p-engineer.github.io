---
title: "【Git】 fatal: Unable to create '.git/index.lock': File exists. の解決"
date: 2022-04-08T02:00:00+09:00
description: "Git 操作を行おうとしたら fatal: Unable to create '.git/index.lock': File exists. が出たきたので解決方法メモ"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Git
categories: 
- Git
image: images/thumbnail/git.png
---

# 【Git】 fatal: Unable to create '.git/index.lock': File exists. の解決
Git操作を行おうとしたら `fatal: Unable to create '.git/index.lock': File exists.` が出たきたので解決方法メモ

## エラー
`pull` などのGitの操作を行った際に発生。

```
fatal: Unable to create '.git/index.lock': File exists.
```

## 原因
排他制御用のファイルが `.git/index.lock` が存在する。
そのため別にGitの操作が行われている。

## 解決方法
1. Git操作の終了を待つ
  思い当たるGitの操作があれば終了を待ってください。
2. `.git/index.lock` を削除
  該当プロジェクトの `.git/index.lock` を削除すれば解決します。

## 参考
<a href="https://stackoverflow.com/a/7860765" target="_blank" rel="nofollow noopener">Git - fatal: Unable to create &#39;/path/my_project/.git/index.lock&#39;: File exists - Stack Overflow</a>
