---
title: wgetを使用したファイルのダウンロードと名前のカスタマイズ
date: 2024-01-16T04:30:00+09:00
description: ウェブからファイルをダウンロードする際、`wget` はLinuxユーザーにとって非常に便利なツールです。
draft: false
enableToc: true
enableTocContent: true
tags: 
- Linux
- Linuxコマンド
categories: 
- Linux
image: images/thumbnail/linux.png
---

# wgetを使用したファイルのダウンロードと名前のカスタマイズ

ウェブからファイルをダウンロードする際、`wget` はLinuxユーザーにとって非常に便利なツールです。
`wget` を使用して特定の URL からファイルをダウンロードし、そのファイル名をカスタマイズする方法を詳しく説明します。

## wget コマンドの基本

`wget` は、コマンドラインからウェブサーバーからファイルをダウンロードするための非インタラクティブなツールです。
基本的な使用方法は非常にシンプルで、次の形式に従います：

```
wget [オプション] [URL]
```

#### ファイル名の指定

ダウンロードするファイルに特定の名前を付けたい場合、`-O` オプション（大文字のオー）を使用します。以下は、その使用例です：

```
wget -O [保存するファイル名] [ダウンロードするURL]
```

例えば、次の URL からファイルをダウンロードし、`google.com` という名前で保存したい場合は、以下のようになります：

```
wget -O c-a-p-engineer.html https://c-a-p-engineer.github.io/
```

### 特殊文字の取り扱い

URL に `&` のような特殊文字が含まれている場合、これらがシェルによって誤って解釈されることを防ぐために、URL を引用符で囲むことが重要です。

```
wget -O c-a-p-engineer.html 'https://c-a-p-engineer.github.io/?test=1'
```

この方法で、URL が正確に `wget` コマンドに渡され、期待通りの動作をします。

### ファイル名を現在日時にする

ファイル取得時にファイル名を現在日時にしてファイルを取得することも可能です。

```
wget -O "$(date +%Y%m%d-%H%M%S).html" 'https://c-a-p-engineer.github.io/'
```

この方法で、取得時間を付けてダウンロード出来るので同名ファイルも管理しやすくなります。

## 参考

- <a href="https://www.gnu.org/software/wget/manual/wget.html" target="_blank" rel="nofollow noopener">GNU Wget 1.20 Manual</a>
