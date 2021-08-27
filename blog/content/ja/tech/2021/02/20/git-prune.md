---
title: "【Git】pull したら error: cannot lock ref が出たので対処"
date: 2021-02-20T09:00:00+09:00
description: "git pull したら error: cannot lock ref が出たので対処方法をメモ"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Git
categories: 
- Git
image: images/thumbnail/git.png
---

# git pull したら error: cannot lock ref が出たので対処

```git pull```をしたら以下のようなエラーが出てきました。
``` bash
error: cannot lock ref 'refs/remotes/origin/feature/hoge/fuga': 'refs/remotes/origin/feature/hoge' exists; cannot create 'refs/remotes/origin/feature/hoge/fuga'
```

## エラー理由
これは古いブランチ ```refs/remotes/origin/feature/hoge``` は既にリモートリポジトリから削除されているのですがローカルに存在するために ```git pull``` しても新たに ```refs/remotes/origin/feature/hoge/fuga``` が作れないというのが理由です。

## git remote prune を実行して解決方法
```git remote prune``` を使用することでローカルに存在するがリモートリポジトリに存在しないブランチを削除してくれます。

``` bash
$ git remote prune [ブランチ名]
```

``` bash
$ git remote prune origin
Pruning origin
URL: [リモートリポジトリのURL]
 * [pruned] origin/[ブランチ名]
 * [pruned] origin/[ブランチ名]
 ………
 ……
 …
```

この時に表示されたブランチ達が削除されていきます。
その後は ```git pull`` して最新を取得することが可能になります。
