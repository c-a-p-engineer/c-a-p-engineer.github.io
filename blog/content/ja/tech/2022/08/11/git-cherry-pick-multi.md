---
title: "【Git】複数のコミットをcherry-pickする方法"
date: 2022-08-11T11:00:00+09:00
description: "Gitで複数のコミットをcherry-pickする方法メモ"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Git
categories: 
- Git
image: images/thumbnail/git.png
---

# 【Git】複数のコミットをcherry-pickする方法
Gitで複数のコミットをcherry-pickする方法メモ

## 通常のcherry-pick
通常のcherry-pick
```
git cherry-pick {コミットハッシュ}
```

## 複数のコミットのcherry-pick
複数のコミットのcherry-pick
```
git cherry-pick {始点コミットハッシュ}..{終点コミットハッシュ}
```

`..` で繋ぐとその間のcommitがcherry-pickされます。

{{< notice warning >}}
**注意**
始点から終点の変更を取り込むため、始点の変更は取り込まれません。

以下のようなコミットがある時
1. commit-A
1. commit-B
1. commit-C

以下のようにやった場合は `commit-B`, `commit-C` しか cherry-pick されません。
```
git cherry-pick {commit-A}..{commit-C}
```

{{< /notice >}}

## 参考
* <a href="https://git-scm.com/docs/git-cherry-pick" target="_blank" rel="nofollow noopener">Git - git-cherry-pick Documentation</a>