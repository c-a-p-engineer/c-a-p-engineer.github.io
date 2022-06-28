---
title: "【Git】別ブランチで作業したファイルを持ってくる"
date: 2022-06-28T18:30:00+09:00
description: "別ブランチで作業したファイルを現在のブランチに持ってくる方法"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Git
categories: 
- Git
image: images/thumbnail/git.png
---

# 【Git】別ブランチで作業したファイルを持ってくる
別ブランチで作業したファイルを現在のブランチに持ってくる方法。

## 別ブランチから取得
```
git checkout [取得元ブランチ or コミットハッシュ] [取得ファイル or 取得ディレクトリ]
```

以下のようにすると `hoge` ブランチから `sample.txt` を取得してきます。
```
git checkout hoge sample.txt
```

## 別名ファイルとして取得
```
git show [取得元ブランチ　or コミットハッシュ]:[取得ファイル] > [保存先名]
```

以下のようにすると `hoge` ブランチから `sample.txt` を `sample2.txt` と名前をつけて取得してきます。
```
git checkout hoge:sample.txt > sample2.txt
```

## コミット全体を取得
```
git cherry-pick -n [取得元ブランチ or コミットハッシュ]
```
`-n` は `-no-commit` オプションの短縮で、ないとコミットをそのまま取り込みますので注意してください。