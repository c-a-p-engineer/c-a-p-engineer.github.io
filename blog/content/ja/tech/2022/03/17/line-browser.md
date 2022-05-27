---
title: "LINE で URL を外部ブラウザで開かせる方法"
date: 2022-03-17T06:00:00+09:00
description: "LINE で URL を外部ブラウザで開かせる方法"
draft: false
enableToc: true
enableTocContent: true
tags: 
- ブラウザ
categories: 
- ブラウザ
image: images/thumbnail/LINE_Brand_icon.png
---

# LINE で URL を外部ブラウザで開かせる方法
LINE で URL を外部ブラウザで開かせる方法。
LINE のブラウザでは通常のブラウザと異なり一部の処理が出来ないことがあります。
そのためURLを共有する際などLINEブラウザから強制的に通常ブラウザに変更する必要があります。

## クエリパラメータの付与
URLのクエリパラメーターに `openExternalBrowser=1` と付与するだけでLINEブラウザではなく外部ブラウザが起動するようになります。

| LINE URLスキーム | 説明 |
| - | - |
| https://example.com/?openExternalBrowser=1 | 対象のURLを外部ブラウザで開きます。 |
| https://example.com/?openInAppBrowser=0 | 対象のURLをChromeカスタムタブで開きます。（Android版LINEのみ対応） |


たとえばLINEでこの当ブログを共有する際に下記のようにすると外部ブラウザで開かれるはずです。
https://c-a-p-engineer.github.io/?openExternalBrowser=1
## 参考
* <a href="https://developers.line.biz/ja/docs/messaging-api/using-line-url-scheme/#opening-url-in-external-browser" target="_blank" rel="nofollow noopener"> URLを外部ブラウザで開く | LINE Developers</a>
