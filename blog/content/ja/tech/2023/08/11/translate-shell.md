---
title: "translate-shell を使って自動翻訳してみる"
date: 2023-08-11T20:30:00+09:00
description: "translate-shellは、コマンドライン上で動作する翻訳ツールです。"
draft: false
enableToc: true
enableTocContent: true
tags: 
- bash
categories: 
- bash
image: images/thumbnail/Gnu-bash-logo.svg
---

# translate-shell を使って自動翻訳してみる
translate-shellは、コマンドライン上で動作する無料の翻訳ツールです。
Google Translate, Bing Translator, Yandex.Translateなど、多くのオンライン翻訳サービスと連携して、50以上の言語間での翻訳が可能です。

<a href="https://github.com/soimort/translate-shell" target="_blank" rel="nofollow noopener">translate-shell</a>

## インストール
今回はDockerでの使用方法を記載します。
<a href="https://github.com/soimort/translate-shell#using-docker" target="_blank" rel="nofollow noopener">Using Docker</a>

以下のコマンドを実行すると翻訳Dockerのシェルが開きます。
```bash
docker run -it soimort/translate-shell -shell
```

他のインストール方法は以下から確認してください。
<a href="https://github.com/soimort/translate-shell#installation" target="_blank" rel="nofollow noopener">Installation</a>

## 使用方法

translate-shellの基本的な使用方法は以下の通りです。
上記のDockerを使用する場合は `trans` 不要でした。

言語指定がない場合は基本的には以下の基準で翻訳されます。
* **翻訳エンジン:** デフォルトの翻訳エンジン（通常はGoogle Translate）が使用されます。
* **目的言語:** システムのロケールまたは英語が自動的にターゲット言語として選択されます。ターゲット言語を指定しない場合、translate-shellはユーザーのシステム設定から適切な言語を推測しようとします。

### 翻訳
次のコマンドを入力して翻訳します。
```bash
trans 'Hello World'
```

### 特定の言語への翻訳
たとえば、英語から日本語へ翻訳するには以下のようにします。
```bash
trans :ja 'Hello World'
```

### 特定の言語から特定の言語への翻訳
```bash
trans fr:ja 'Bonjour'
```

### ファイルの翻訳
`input.txt` の内容を日本語に翻訳する例です。
```bash
trans :ja -i input.txt
```

### ファイルへの出力:
翻訳結果を `output.txt` に保存する例です。

```bash
trans :ja -i input.txt -o output.txt
```

## 注意点
色々調べていたらシェル化して自動翻訳を大量の自動翻訳を走らせた場合、接続制限を受ける模様です。
1アクセスごとに5秒↑の待機時間をもった方が安全とのことです。

## まとめ
このシンプルなツールによって、コマンドライン上で迅速に翻訳を行うことができます。
さまざまなオプションを使ってカスタマイズすることも可能ですので、詳細は公式ドキュメントを参照してください。
<a href="https://github.com/soimort/translate-shell" target="_blank" rel="nofollow noopener">translate-shell</a>
