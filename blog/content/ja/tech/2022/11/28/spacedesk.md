---
title: "使ってないスマホやタブレットをサブディスプレイ化する spacedesk"
date: 2022-11-28T18:00:00+09:00
description: "サブディスプレイが欲しい、そんな時に使える spacedesk をご紹介"
draft: false
enableToc: true
enableTocContent: true
tags: 
- ツール
categories: 
- ツール
image: tech/2022/11/28/spacedesk/logo_spacedesk.png
---

# 使ってないスマホやタブレットをサブディスプレイ化する spacedesk
サブディスプレイが欲しい、そんな時に使える spacedesk をご紹介。
<a href="https://www.spacedesk.net/" target="_blank" rel="nofollow noopener">spacedesk</a>

## インストール
こちらから各種ソフトウェアを入れる必要があります。
<a href="https://www.spacedesk.net/#download" target="_blank" rel="nofollow noopener">spacedesk download</a>

パソコン側とスマホ、タブレット側の端末に入れる必要があります。

ダウンロードするのが面倒くさいので僕は `winget` でコマンド一発でインストールしました。

```
winget install --id=Datronicsoft.SpacedeskDriver.Server  -e
```

## 使い方
使い方は簡単。

1. サブディスプレイ化する端末のアプリを起動
2. どのパソコンのサブディスプレイにするかを選択（同じネットワーク内でないと出てきません

これでサブディスプレイとして扱ってくれます。

細かな解像度などはパソコン側からディスプレイ設定をするようにしてください。

これで今まで使用してなかった不要端末達を有効活用できます。