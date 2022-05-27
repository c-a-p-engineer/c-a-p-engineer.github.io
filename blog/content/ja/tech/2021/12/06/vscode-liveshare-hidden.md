---
title: "VSCode LiveShare でゲストに一部のファイルが共有されない"
date: 2021-12-06T09:00:00+09:00
description: "VSCode の LiveShare を使用しているとゲストに .gitignore に記述された一部ファイルが共有されないという現象がありました。"
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

# VSCode LiveShare でゲストに一部のファイルが共有されない
VSCode の LiveShare を使用しているとゲストに `.gitignore` に記述された一部ファイルが共有されないという現象がありました。

## 原因
VSCodeのセキュリティ対策として `.gitignore` に記述された一部ファイルが共有されません。

## 対策

### 全てのファイルを共有する
ホスト側に無効化するファイルをプロジェクト直下に配置する。

```json:.vsls.json
{
    "$schema": "http://json.schemastore.org/vsls",
    "gitignore":"none"
}
```

### 細かい設定

```json:.vsls.json
{
    "$schema": "http://json.schemastore.org/vsls",
    "gitignore":"none",
    "excludeFiles":[
        "*.p12",
        "*.cer",
        "token",
        ".gitignore"
    ],
    "hideFiles": [
        "bin",
        "obj"
    ]
}
```

## 参考
* <a href="https://qiita.com/skokado/items/67629415a7a2167a8483" target="_blank" rel="nofollow noopener">【Tips】VSCode Live Share で.gitignore に記述したファイルが共有されない - Qiita</a>
* <a href="https://docs.microsoft.com/en-us/visualstudio/liveshare/reference/security#controlling-file-access-and-visibility" target="_blank" rel="nofollow noopener">Security - Visual Studio Live Share | Microsoft Docs #Controlling file access and visibility</a>
