---
title: "【Git】Git Clone を高速で行う"
date: 2023-01-06T15:30:00+09:00
description: "Git Clone を単純に行うと数分待つこともあります。そういう時に高速化する方法を紹介。"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Git
categories: 
- Git
image: images/thumbnail/git.png
---

# 【Git】Git Clone を高速で行う
Git Clone を単純に行うと数分待つこともあります。そういう時に高速化する方法を紹介。

サンプルとして取得するGitリポジトリはFlutterを使用しています。
計測は以下のようにしています。
```
time git clone -b stable https://github.com/flutter/flutter
```
何も指定しない場合、結果は `2m13.119s` かかりました。

## depth
`--depth` は指定したコミット数を取得します。
<a href="https://git-scm.com/docs/git-clone#Documentation/git-clone.txt---depthltdepthgt" target="_blank" rel="nofollow noopener">Git - git-clone Documentation # depth</a>

そうすることでコミット履歴が大量にあるGitリポジトリを素早くクローンすることが可能です。

```
time git clone --depth=1 -b stable https://github.com/flutter/flutter
```

実行結果は `0m15.344s` とだいぶ高速になりました。

## single-branch
`--single-branch` は指定したブランチのみを取得します。
<a href="https://git-scm.com/docs/git-clone#Documentation/git-clone.txt---no-single-branch" target="_blank" rel="nofollow noopener">Git - git-clone Documentation # single-branch</a>

他のブランチを取得しないため高速化されます。

```
time git clone --depth=1 -b stable https://github.com/flutter/flutter
```

実行結果は `1m37.876s` と `--depth` にはだいぶ劣りますが何もしないよりは高速になりました。

## depth & single-branch
上記2つを組み合わせたパターンです。
1つのブランチで1つのコミットまでしか取得しない。

```
time git clone --depth=1 --single-branch -b stable https://github.com/flutter/flutter
```

`0m9.436s` と `--depth` のみの指定より高速化されました。

## 参考
* <a href="https://git-scm.com/docs/git-clone#Documentation/git-clone.txt---depthltdepthgt" target="_blank" rel="nofollow noopener">Git - git-clone Documentation # depth</a>
* <a href="https://git-scm.com/docs/git-clone#Documentation/git-clone.txt---no-single-branch" target="_blank" rel="nofollow noopener">Git - git-clone Documentation # single-branch</a>
