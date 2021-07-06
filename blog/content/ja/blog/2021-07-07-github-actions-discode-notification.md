---
title: "【Github】Github Actions Discode に通知してみる"
date: 2021-07-07T06:00:00+09:00
description: "Github Actions を利用して Discode に通知してみました。"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Github
categories: 
- Github
image: images/thumbnail/GitHub_Logo_White.png
---

# 【Github】Github Actions Discodeに通知してみる
`push` された通知など `Discode` に通知してみます。

## Discode の用意
サーバー選択->連携サービス->ウェブフック->新しいウェブフック
ウェブフックを作成後、URLを取得。

## Github の用意
取得した URL から `DISCODE_WEBHOOK_ID` と `DISCODE_WEBHOOK_ID` を取得します。

```
https://discordapp.com/api/webhooks/{DISCODE_WEBHOOK_ID}/{DISCODE_WEBHOOK_TOKEN}
````

1.導入したい `Repository` の `Settings`を選択。
2.左のメニューの `Secrets` を指定
3.右上の `New repository secret` を選択。
4.`Name` に `DISCODE_WEBHOOK_ID` を設定。
5.`Value` に取得した `DISCODE_WEBHOOK_ID` を設定。
※ `DISCODE_WEBHOOK_TOKEN` も同様

## Github Actionsの設定
Github Actions を作成します。
``` yml:.github/workflows/discode.yml
name: Discode

on: push

jobs:
  slack:
    # Ubuntu
    runs-on: ubuntu-latest
    steps:
      # Slack
      - name: Discord Notify
        uses: appleboy/discord-action@0.0.3
        with:
          webhook_id: ${{ secrets.DISCODE_WEBHOOK_ID }}
          webhook_token: ${{ secrets.DISCODE_WEBHOOK_TOKEN }}
          color: "#48f442"
          username: "GitHub Bot"
          args: Github Actions Discord Notification
```

## 参考
* <a href="https://qiita.com/toshipon/items/2a1513b584650dcd81c1" target="_blank" rel="noopener">githubからdiscordに通知をする方法 - Qiita</a>
* <a href="https://docs.github.com/ja/actions/reference/context-and-expression-syntax-for-github-actions" target="_blank" rel="noopener">GitHub Actions のコンテキストおよび式の構文 - GitHub Docs</a>

