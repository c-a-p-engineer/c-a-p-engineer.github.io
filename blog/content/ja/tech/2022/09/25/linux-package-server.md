---
title: "【Linux】apt-get のパッケージ取得先を一括変更する"
date: 2022-09-25T17:00:00+09:00
description: "日本に居るのにわざわざ海外の遅いサーバーからパッケージを取得されると遅くなるので apt-get のパッケージ取得先を一括変更するメモ。"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Linux
categories: 
- Linux
image: images/thumbnail/linux.png
---

# 【Linux】apt-get のパッケージ取得先を一括変更する
日本に居るのにわざわざ海外の遅いサーバーからパッケージを取得されると遅くなるので apt-get のパッケージ取得先を一括変更するメモ。

## source.list を一括変換
`apt` のパッケージ先を `archive.ubuntu.com` → `ftp.jaist.ac.jp/pub/Linux` に変換します。
```
sed -i 's@archive.ubuntu.com@ftp.jaist.ac.jp/pub/Linux@g' /etc/apt/sources.list
```

## 備考：apt-list
別の方法で `apt-list` なるものがありました。
こちらを使用する際に導入するのが手間などを考えると上記の一括変換の方が簡単で、手間がなかったためこちらを使用しませんでした。
<a href="https://github.com/jblakeman/apt-select" target="_blank" rel="nofollow noopener">jblakeman/apt-select: Ubuntu Archive Mirror reporting tool for apt sources configuration.</a>

## 参考
* <a href="https://genzouw.com/entry/2019/09/04/085135/1718/" target="_blank" rel="nofollow noopener">Dockerのイメージビルド中でapt-getを高速化するたった1つの方法 | ゲンゾウ用ポストイット</a>
