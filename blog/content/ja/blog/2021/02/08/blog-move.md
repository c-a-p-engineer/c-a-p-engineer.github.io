---
title: "HUGOにブログを変更いたしました"
date: 2021-02-08T09:00:00+09:00
description: "HUGOにブログを変更いたしました。その理由をご説明させて頂きます。"
draft: false
enableToc: true
enableTocContent: true
tags: 
- 雑記
categories: 
- 雑記
image: images/thumbnail/car_truck_hikkoshi.png
---

# HUGOにブログを変更致しました。

今回HUGOにブログを移行致しました。
その理由をご説明させていだきます。

## 以前のブログ達

### WordPressのブログ
最初のブログはこちら

<a href="http://scrap.php.xdomain.jp/" target="_blank">Scrap Enngineer</a>
最初のブログはWordPressを使用して作りました。
WordPressは簡単にブログを作成出来るとても優れたCMSではあります。
しかし、多々問題がありました。

1. PHPとDBが必要
1. 脆弱性対策
1. バックアップ問題
1. サーバーの必要性

WordPressは簡単なのですがこれらの問題が色々と難しく、継続的な保守が必要でした。
僕の場合は個人ブログだったので良いのですが企業サイトなどの場合はWordPress、ミドルウェアなど様々な対応をしてハッキング対策をする必要がります。
またバックアップもDBが消失した際に消えたりするので中々に辛いところでした。

### Blogger
次に使用したのがBloggerでした。
<a href="https://se-log.blogspot.com/" target="_blank">SE人生ログ</a>

こちらはGoogleが提供しているブログシステムになります。
こちらはWordPressのような面倒な保守はしなくて良くて、いい具合でしたが、デザインの修正などが少々手間でした。
WordPressよりは機能的に劣るが簡単にブログをやれる利点がありました。
ですが、こちらはGoogleが提供しているシステムのため記事の修正画面などが更新されてやりづらくなり、そのため更新が面倒になりました。

## HUGOを選んだ理由
今回ブログに選んだHUGOですが、こちらは静的ファイルジェネレーターになります。
[HUGO](https://gohugo.io/)


WordPressのようにPHPを使用して動的に色々するものではなく**ファイルを出力するだけ**になるのです。

そのためWordPressと違いDB不要なため、ファイルホスティングだけで済みます。

またHUGOはマークダウン記法が採用されているため簡単に記事を書くことが可能です。