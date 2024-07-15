---
title: "【GitHub】GitHub Pages で React 公開時の404対策"
date: 2022-05-09T01:30:00+09:00
description: "GitHub Pages で React 公開時の404対策メモ"
draft: false
enableToc: true
enableTocContent: true
tags: 
- GitHub
categories: 
- GitHub
image: images/thumbnail/GitHub_Logo_White.png
---

# 【GitHub】GitHub Pages で React 公開時の404対策
`GitHub Pages` で `React` 公開時の404対策メモ。

## Reactで作ったものを公開しても404になる
`React` で作ったものを `GitHub Pages` で公開したところ、公開ページのURLに接続すると `index.html` が開かれるのでアプリが開かれます。
ただルーティングをしていた場合に `/sample/` のようなURLがアプリ上だと表示されるのですが、直接URLを開かれた場合 `GitHub Pages` は直接 `/sample/` というディレクトリを探しますが存在しないため404が表示されます。

## 対策
本来Webサーバーなら `.htaccess` なりで設定をして `index.html` を開くように設定するのですが `GitHub Pages` では `.htaccess` が**効きません**。
対策は `index.html` を `404.html` という名前でコピーすることです。
```
cp index.html 404.html 
```

`GitHub Pages` は404時に `404.html` を表示してくれます。
こうすることによって404時も `index.html` と同一の内容が表示されます。

## 参考
* <a href="https://docs.github.com/ja/pages/getting-started-with-github-pages/creating-a-custom-404-page-for-your-github-pages-site" target="_blank" rel="nofollow noopener">GitHub Pages サイトのカスタム 404 ページを作成する - GitHub Docs</a>
