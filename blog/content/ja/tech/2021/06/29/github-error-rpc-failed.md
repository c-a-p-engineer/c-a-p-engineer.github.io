---
title: "【Git】error: RPC failed; curl 92 HTTP/2 stream 0 was not closed cleanly: CANCEL (err 8)"
date: 2021-06-29T10:30:00+09:00
description: "Git で error: RPC failed; curl 92 HTTP/2 stream 0 was not closed cleanly: CANCEL (err 8) が発生した時の対処"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Git
categories: 
- Git
image: images/thumbnail/git.png
---

# error: RPC failed; curl 92 HTTP/2 stream 0 was not closed cleanly: CANCEL (err 8)
`Git` を利用していて以下のエラーが発生しました。
```
error: RPC failed; curl 92 HTTP/2 stream 0 was not closed cleanly: CANCEL (err 8)
```

## 対処
以下のコマンド `HTTP/2` から `HTTP/1.1` にダウングレードすることで解決しました。
```
git config --global http.version HTTP/1.1
```

他には以下の対応でも解決するとのことです。
* Gitクライアントを利用している場合はバージョンアップする
* HTTPSではなくSSHでプッシュする

## 参考
* <a href="https://gist.github.com/daofresh/0a95772d582cafb202142ff7871da2fc" target="_blank" rel="nofollow noopener">Fix error : RPC failed; curl 92 HTTP/2 stream 0 was not closed cleanly: PROTOCOL_ERROR (err 1)</a>