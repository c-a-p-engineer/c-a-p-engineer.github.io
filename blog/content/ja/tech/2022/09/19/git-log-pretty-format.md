---
title: "【Git】 git log をキレイに整えて見やすくする方法"
date: 2022-09-19T09:00:00+09:00
description: "git log をキレイに整えて見やすくする方法メモ"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Git
categories: 
- Git
image: images/thumbnail/git.png
---

# 【Git】 git log をキレイに整えて見やすくする方法
git log をキレイに整えて見やすくする方法メモ

## git log
`git log` を普通に実行すると以下のようになります。

![git-log](/tech/2022/09/19/git-log-pretty-format/git-log.png "git-log") 

### フォーマットを指定する
`--pretty` を使用することで出力する日付やハッシュなどに色を付けることが可能になります。
また `--graph` を使用するとコミットグラフを見ることができます。

```
git log --graph --pretty=format:' %Cgreen[%ai]%C(#ff0ab3)(%cr) %Cred%h - %Creset %s %C(bold blue)<%an>%Creset'
```

<br>

![git-log-pretty-format](/tech/2022/09/19/git-log-pretty-format/git-log-pretty-format.png "git-log-pretty-format") 


### フォーマット詳細
`--pretty` の詳細各種はこちらに記載されています。
<a href="https://git-scm.com/docs/pretty-formats" target="_blank" rel="nofollow noopener">Git - pretty-formats Documentation</a>

使用しそうなものを抜き出して記載致します。
* `%h`
  * コミットハッシュ
* `%ai`
  * 日付ISO8601フォーマット（2022-09-19 09:00:00 + 0900）
* `%cr`
  * 相対コミット日付
* `%an`
  * Git Author の名前
* `%ae`
  * Git Author のメールアドレス
* `%cn`
  * Git Commiter の名前
* `%ce`
  * Git Commiter のメールアドレス

色を付ける
* `%Cred`
  * 以降の文字色を赤
* `%Cgreen`
  * 以降の文字色を緑
* `%Cblue`
  * 以降の文字色を青
* `%Creset`
  * 色をリセット
* `%C([color])`
  * <a href="https://git-scm.com/docs/git-config#Documentation/git-config.txt-color" target="_blank" rel="nofollow noopener">Git - git-config Documentation</a> で指定できる色、もしくは `#ff0ab3` のような色指定

## 参考
* <a href="https://git-scm.com/docs/pretty-formats" target="_blank" rel="nofollow noopener">Git - pretty-formats Documentation</a>
