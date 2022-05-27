---
title: "【Git】 直前のコミットのコミットを修正する amend"
date: 2022-03-02T05:00:00+09:00
description: "Git でコミットメッセージに誤字やコミット忘れのファイルが有る際の対応メモ"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Git
categories: 
- Git
image: images/thumbnail/git.png
---

# 【Git】 直前のコミットのコミットを修正する amend
Git でコミットメッセージに誤字やコミット忘れのファイルが有る際の対応メモ

## 直前のコミットメッセージを修正

### エディタを開いてコミットメッセージを編集
エディタ上で修正します。
```
git commit --amend
```

### コミットメッセージを指定
`-m` オプションで文言をターミナル上で指定します。

```
git commit --amend -m "誤字修正"
```

## コミットファイルを追加
1. まずはコミット漏れのファイルを追加
```
git add hoge.php 
```

2. `--no-edit` を使用して反映<br>コミットメッセージはそのままで、追加の変更が最新のコミットに反映されます。
```
git commit --amend --no-edit
```

## 参考
* <a href="https://www.atlassian.com/ja/git/tutorials/rewriting-history#git-commit--amend" target="_blank" rel="nofollow noopener">git amend | Atlassian Git Tutorial</a>
