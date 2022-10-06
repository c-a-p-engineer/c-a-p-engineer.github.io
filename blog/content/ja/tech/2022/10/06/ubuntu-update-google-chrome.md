---
title: "【Ubuntu】apt-get update をしたら Google Chorme のGPGエラーが発生した。"
date: 2022-10-06T12:00:00+09:00
description: "apt-get update をしたら Google Chorme のGPGエラーが発生したので対処方法をメモ"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Linux
- Ubuntu
categories: 
- Linux
image: images/thumbnail/linux.png
---

# 【Ubuntu】apt-get update をしたら Google Chorme のGPGエラーが発生した。
`apt-get update` をしたら Google Chorme のGPGエラーが発生したので対処方法をメモ。

## エラー
Ubuntu に対して `apt-get update` をしたら以下のようなエラーが発生。

```
The repository 'http://dl.google.com/linux/chrome/deb stable InRelea se' is not signed.
```

## 原因
Google が Linux リポジトリで配布しているパッケージの署名と認証のために発行している公開署名鍵が変更されたのが原因になります。

Google はパッケージの更新を確認するために GPG キーで署名しています。
GPG の有効期限が切れたり、変更されたり、なかった場合、エラーを表示します。

## 解決方法
以下のコマンドを実行してGPGキーを取得、追加すれば解決されます。

```bash
wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | sudo apt-key add - 
```

## 参考
* <a href="https://stackoverflow.com/questions/55647076/the-repository-http-dl-google-com-linux-chrome-deb-stable-release-is-not-sig" target="_blank" rel="nofollow noopener">[How To] Fix The Google GPG Error on Ubuntu - OMG! Ubuntu!</a>
