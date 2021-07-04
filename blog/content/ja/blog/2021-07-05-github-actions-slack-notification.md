---
title: "【Github】Github Actions Slackに通知してみる"
date: 2021-07-05T05:00:00+09:00
description: "Github Actions を利用して Slackに通知してみました。"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Github
categories: 
- Github
image: images/thumbnail/GitHub_Logo_White.png
---

# 【Github】Github Actions Slackに通知してみる
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
                  "title": "Commit Message",
                  "value": "${{ env.COMMIT_MESSAGE }}"
                },
                {
                  "title": "Push Repository",
                  "value": "${{ github.event.repository.url }}"
                },
              ]
            }
          ]
```