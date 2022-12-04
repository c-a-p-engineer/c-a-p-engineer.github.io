---
title: "【bash】コマンドを無限ループさせたい"
date: 2022-12-03T02:00:00+09:00
description: "コマンドを無限ループさせたい。って事はあんまりないのですがちょっと特殊で監視的な作業などの時にオススメです。"
draft: false
enableToc: true
enableTocContent: true
tags: 
- bash
categories: 
- bash
image: images/thumbnail/Gnu-bash-logo.svg
---

# 【bash】コマンドを無限ループさせたい
コマンドを無限ループさせたい。って事はあんまりないのですがちょっと特殊で監視的な作業などの時にオススメです。

## 無限ループ
以下のように書きます。
```bash
while true; do [コマンド1];[コマンド2];done
```

1秒ごとに日時を表示する
```bash
while true; do date;sleep 1;done
```

終了させたいときは `ctr+c` で終了させてください。
応用するといろいろなことができそうです。
