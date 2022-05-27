---
title: "【Git】ファイル名の大文字・小文字の変更を検知"
date: 2022-01-11T23:40:00+09:00
description: "Gitではデフォルトでファイル名の大文字・小文字の変更は検知しない設定になっているため、ファイル名の大文字・小文字の変更を検知するメモ"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Git
categories: 
- Git
image: images/thumbnail/git.png
---

# 【Git】ファイル名の大文字・小文字の変更を検知
Gitではデフォルトでファイル名の大文字・小文字の変更は検知しない設定になっているため、ファイル名の大文字・小文字の変更を検知するメモ

## 確認
``` bash
$ git config --local core.ignorecase
true
```

`true` だとファイル名の大小文字の変更を検知しません。

## 変更
``` bash
$ git config --local core.ignorecase false
```

`false` にしてファイル名の大小文字の変更を検知します。

## 変更確認
``` bash
$ git config --local core.ignorecase
false
```

`false` になったのでこれで検知することが可能になりました。

## 参考
* <a href="https://git-scm.com/docs/git-config/2.14.6#Documentation/git-config.txt-coreignoreCase" target="_blank" rel="nofollow noopener">Git - git config core.ignoreCase</a>
