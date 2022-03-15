---
title: "【Git】 would clobber existing tag を解決する"
date: 2022-02-23T11:00:00+09:00
description: "git pull を行ったら would clobber existing tag というエラーが発生したので解決メモ"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Git
categories: 
- Git
image: images/thumbnail/git.png
---

# 【Git】 would clobber existing tag を解決する
`git pull` を行ったら以下のようなエラーが発生
```
! [rejected] tag -> tag (would clobber existing tag)
```

## 原因
ローカルリポジトリとリモートリポジトリのタグの名前が重複していることが原因。

## 対処
以下のコマンドを使用するとリモートリポジトリのタグでローカルリポジトリを更新します。
```
git fetch --tags -f
```

## 参考
* <a href="https://stackoverflow.com/questions/58031165/how-to-get-rid-of-would-clobber-existing-tag" target="_blank" rel="nofollow noopener">git - How to get rid of "would clobber existing tag" - Stack Overflow</a>
