---
title: "【VSCode】ファイル検索時に出てこないファイルを検索対象にする"
date: 2021-10-17T00:00:00+09:00
description: "VSCodeでファイル検索時に出てこないファイルを検索対象にする方法メモ。"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Visual Studio Code
categories: 
- エディタ
image: images/thumbnail/Visual_Studio_Code_1.35_icon.svg
image_description: 'Visual Studio Codeは、米国およびその他の国におけるMozillaFoundationの商標です。'
---

# 【VSCode】ファイル検索時に出てこないファイルを検索対象にする
Windows で VSCode を使用して `Ctrl + p`ファイル検索時に出ないことがあります。
VSCode でファイル検索時に出てこないファイルを検索対象にする方法をメモ。


## 方法

### 設定画面
1.`ファイル` > `ユーザ設定` > `設定`
2.`search.useIgnoreFiles` を検索。
3.チェックをは外す

### setting.json
1.`ファイル` > `ユーザ設定` > `設定`
2.右上のファイルアイコンを開く
3.`setting.json` の `search.useIgnoreFiles` の値に `false` を記入 or 以下の行を追記
```json:setting.json
{
    "search.useIgnoreFiles": false
}
```

## 参考
* <a href="https://lighthouse-dev.github.io/tools/vscode-search-setting/" target="_blank" rel="nofollow noopener">VSCodeでvendor配下のファイルが検索できない · lighthouse-dev.github.io</a>