---
title: "【Github】Github Actions Slack に通知してみる"
date: 2021-07-05T05:00:00+09:00
description: "Github Actions を利用して Slack に通知してみました。"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Github
categories: 
- Github
image: images/thumbnail/GitHub_Logo_White.png
---

# Github Actions Slackに通知してみる
`push` された通知など `Slack` に通知してみます。

## Slack の用意
以下の `Slack` アプリの `Incoming Webhook` を利用します。
* <a href="https://w1625424953-rox450381.slack.com/apps/A0F7XDUAZ--incoming-webhook-?tab=more_info" target="_blank" rel="noopener">Incoming Webhook </a>

`Webhook URL` を取得します。

## Github の用意
1.導入したい `Repository` の `Settings`を選択。
2.左のメニューの `Secrets` を指定
3.右上の `New repository secret` を選択。
4.`Name` に `SLACK_WEBHOOK_URL` を設定。
5.`Value` に取得した `Webhook URL` を設定。

## Github Actionsの設定
Github Actions を作成します。
``` yml:.github/workflows/slack.yml
name: Slack

on: push

jobs:
  slack:
    # Ubuntu
    runs-on: ubuntu-latest
    steps:
      # Slack
      - name: Slack Notification
        uses: tokorom/action-slack-incoming-webhook@main
        env:
          INCOMING_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
        with:
          text: Github Actions Slack Notification
```

これを `push` すると以下のように `Slack` に通知が行きます。
![slack-notification.png](/images/blog/2021-07-05-github-actions-slack-notification/slack-notification.png "slack-notification.png") 

## 通知のカスタマイズ
通知をカスタマイズすることが出来ます。
`attachments` を追加することによって通知をカスタマイズ出来ます。

``` yml:.github/workflows/slack.yml
name: Slack

on: push

jobs:
  slack:
    # Ubuntu
    runs-on: ubuntu-latest
    steps:
      # Slack
      - name: Slack Notification
        uses: tokorom/action-slack-incoming-webhook@main
        env:
          INCOMING_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
        with:
          text: Start Github Actions
          attachments: |
            [
              {
                "color": "good",
                "author_name": "${{ github.actor }}",
                "author_icon": "${{ github.event.sender.avatar_url }}",
                "fields": [
                  {
                    "title": "Push Repository",
                    "value": "${{ github.event.repository.url }}"
                  }
                ]
              }
            ]
```

以下のようにプッシュした人の名前とアバター画像、Repository の URL が通知されます。
![slack-notification-customize.png](/images/blog/2021-07-05-github-actions-slack-notification/slack-notification-customize.png "slack-notification-customize.png") 

## 参考
* <a href="https://github.com/tokorom/action-slack-incoming-webhook" target="_blank" rel="noopener">tokorom/action-slack-incoming-webhook: GitHub Action for Slack Incoming Webhook</a>
* <a href="https://docs.github.com/ja/actions/reference/context-and-expression-syntax-for-github-actions" target="_blank" rel="noopener">GitHub Actions のコンテキストおよび式の構文 - GitHub Docs</a>

