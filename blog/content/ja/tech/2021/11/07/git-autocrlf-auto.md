---
title: "【Git】 autocrlf false なのに CRLF に自動変換される現象"
date: 2021-11-07T16:00:00+09:00
description: "Git で autocrlf false なのに CRLF に自動変換される現象"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Git
categories: 
- Git
image: images/thumbnail/git.png
---

# 【Git】 autocrlf false なのに CRLF に自動変換される現象
Git で autocrlf false なのに CRLF に自動変換される現象が発生。
その解決方法のメモ。

## 現象
Git の `autocrlf=false` なのにリポジトリにアップされているファイルと改行コードが違う。

## autocrlf を確認
まずは `autocrlf` の確認をして自動変換がなされないことを確認
```
git config --global core.autocrlf
```

* `input`
* * `checkout`: 元のまま
* * `commit`: LFに変換
* `true`
* * `checkout`: CRLFへ変換
* * `commit`: LFに変換
* `false`
* * `checkout`: 元のまま
* * `commit`: 元のまま

もし設定されてなければ以下のコマンドで `false` に設定すると自動変換されません。

```
git config --global core.autocrlf false
```

## 原因 犯人は.gitattributes
`.gitattributes` の設定が犯人でした。
``` yml:.gitattributes..yml
# Set the default behavior, in case people don't have core.autocrlf set.
* text=auto
```

<br>

> `* text=auto` にすると変換を行うかどうかはGit任せになります。
> この設定少し厄介で、
> autocrlfが「false」の状態でこの.gitattributesを追加するとautocrlfの設定を無視してCRLFに変換されるそうです。ええ・・・
> 「input」なら問題なしです。
> 引用元：<a href="https://offlo.in/blog/git-diff-fix.html" target="_blank" rel="nofollow noopener">【Git】変更していないのに勝手に変更されるファイルがある時の対処法 | offlo.in（オフロイン）</a>

## 対策
対策をいくつか。

### 外す
指定を辞めます。
```yml:.gitattributes..yml
# * text eol=lf
```

### 指定する
ちゃんと指定すること
```yml:.gitattributes..yml
* text eol=lf
```

### 注意点
ただし、上記2つの方法をやった後はローカルのリポジトリを取得しなおさないと中途半端な状態になるので作り直すようにしてください。

## 参考
* <a href="https://offlo.in/blog/git-diff-fix.html" target="_blank" rel="nofollow noopener">【Git】変更していないのに勝手に変更されるファイルがある時の対処法 | offlo.in（オフロイン）</a>