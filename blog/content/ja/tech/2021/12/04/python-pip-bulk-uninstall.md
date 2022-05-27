---
title: "【Python】パッケージを一括削除"
date: 2021-12-04T04:30:00+09:00
description: "インストール済みのパッケージを削除する方法"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Python
categories: 
- Python
image: images/thumbnail/python-logo-master-v3-TM.png
image_description: 'Pythonロゴは、Python SoftwareFoundationの商標です。'
---

# 【Python】パッケージを一括削除
インストール済みのパッケージを削除する方法

## 削除方法

### 一括削除
現在入っているものを一括で削除。
パッケージを消す前にインストール済みのパッケージを保存する場合は `pip freeze > requirements.txt` を行ってください。

`pip freeze |  xargs pip uninstall -y`

## 必要なものを再インストールする場合
一括削除した後に必要なものだけを再インストールして環境をきれいにする場合

### 1. パッケージ記録
インストール済みのパッケージを保存
`pip freeze > requirements.txt`

### 2. パッケージを選定
`requirements.txt` を開いて不要なものを削除

### 3. 一括削除
パッケージを一括削除
`pip freeze |  xargs pip uninstall -y`

### 4. インストール
`requirements.txt` に残したパッケージを再インストール
`pip install -r requirements.txt`

## 参考
* <a href="https://qiita.com/hunzy/items/6965dce22cedb046af7c" target="_blank" rel="nofollow noopener">pipでインストールしたモジュールを全て削除 - Qiita</a>
