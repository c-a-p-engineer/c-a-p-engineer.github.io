---
title: "【Linux】ShellでログインしたらSlack通知を行うようにする"
date: 2022-09-13T18:00:00+09:00
description: "LinuxのShellでログインしたらSlack通知を行うようにする。これをすることによって誰がログインしたかをSlack上で記録できます。"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Linux
categories: 
- Linux
image: images/thumbnail/linux.png
---

# 【Linux】ShellでログインしたらSlack通知を行うようにする
LinuxのShellでログインしたらSlack通知を行うようにする。
これをすることによって誰がログインしたかをSlack上で記録できます。

## Slack の用意
以下の `Slack` アプリの `Incoming Webhook` を利用します。
* <a href="https://w1625424953-rox450381.slack.com/apps/A0F7XDUAZ--incoming-webhook-?tab=more_info" target="_blank" rel="nofollow noopener">Incoming Webhook</a>

`Webhook URL` を取得します。

## Slack通知用のシェルを作る

Slack通知用のシェルを作ってみます。
ログインユーザを取得してSlackに通知するという内容です。
``` shell:slack.sh
#!/bin/bash
set -eu

# Slack Post Json
slackPostJson()
{
    USERNAME=$(whoami)
    cat <<EOF
{
    "blocks": [
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": "*Login!!* UserName:${USERNAME}"
            }
        }
    ]
}
EOF
}
curl -i -H "Content-type: application/json" -s -S -X POST -d "$(slackPostJson)" "https://hooks.slack.com/services/XXXXXXXXXXXXXXXXXXXXXXXXXX"
```

実行すると通知が届きます。
```
sh slack.sh
```

## Dockerで試してみる

1. 作ったシェルをDockerにコピー
```
docker cp slack.sh [コンテナ名]:/etc/profile.d/slack.sh
```

2. ログイン
ログインします。
```
docker exec -it [コンテナ名] /bin/bash --login
```

`--login` を指定してログインシェルを起動します。

## 参考
* <a href="https://qiita.com/momotaro98/items/fe567041cbd2bd3f2281" target="_blank" rel="nofollow noopener">Slackに通知する用シェルスクリプト - Qiita</a>
* <a href="https://ja.stackoverflow.com/questions/22379/docker%E3%82%B3%E3%83%B3%E3%83%86%E3%83%8A%E3%81%AB%E3%83%AD%E3%82%B0%E3%82%A4%E3%83%B3%E3%81%97%E3%81%A6%E3%82%82-bash-profile%E3%81%A7%E8%A8%AD%E5%AE%9A%E3%81%97%E3%81%A6%E3%81%84%E3%82%8B%E7%92%B0%E5%A2%83%E5%A4%89%E6%95%B0%E3%81%8C%E5%8F%8D%E6%98%A0%E3%81%95%E3%82%8C%E3%81%AA%E3%81%84" target="_blank" rel="nofollow noopener">bash - Dockerコンテナにログインしても.bash_profileで設定している環境変数が反映されない - スタック・オーバーフロー</a>
