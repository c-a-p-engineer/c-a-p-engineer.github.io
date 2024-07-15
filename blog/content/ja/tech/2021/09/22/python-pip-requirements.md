---
title: "【Python】 pipまとめ"
date: 2021-09-22T01:30:00+09:00
description: "pip コマンドを使用してパッケージのインストール、アップデート、複数パッケージの一括インストールなどをメモ。"
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

# pipコマンドまとめ
`pip` コマンドを使用してパッケージのインストール、アップデート、複数パッケージの一括インストールなどをメモ。

## パッケージの確認

### パッケージの一覧
既にインストール済みのパッケージの一覧を出力します。
```
pip list
```

### 最新でないパッケージの一覧
`--outdated` のオプションを付けると **最新版ではないパッケージ** だけ表示されます。
```
pip list --outdated
```

## パッケージのインストール

### インストール
パッケージののインストール
```
pip install パッケージ名
```

### バージョンの指定
`==` を利用してバージョンの指定が可能です。

```
pip install パッケージ名==1.25
```

### バージョン確認
バージョンを指定しない状態で `==` で指定可能なバージョンが出てきます。

```
pip install パッケージ名==
```

## パッケージ アップデート
`--upgrade` or `-U` のオプションを追加することで最新版にアップデートすることが可能です。
```
pip install --upgrade パッケージ名
```

<br>

```
pip install -U パッケージ名
```

## パッケージ アンインストール
パッケージのアンイストールを行います。
```
pip uninstall パッケージ名
```

## pip の依存関係チェック
パッケージの依存性を確認する
``` 
pip check
```

## パッケージリストの書き出し
現在インストールされているパッケージをファイルに書き出します。
``` 
pip freeze > requirements.txt
```

## 一括インストール方法
`freeze` で書き出されたパッケージを一括して入れることが可能です。
```
pip install -r requirements.txt
```

## 参考
* <a href="https://note.nkmk.me/python-pip-install-requirements/" target="_blank" rel="nofollow noopener">Python, pipでrequirements.txtを使ってパッケージ一括インストール | note.nkmk.me</a>
* <a href="https://gammasoft.jp/python/python-library-install/" target="_blank" rel="nofollow noopener">Pythonライブラリのインストール － pipの使い方 - ガンマソフト株式会社</a>