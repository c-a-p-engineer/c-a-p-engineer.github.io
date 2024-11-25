---
title: "【bash】簡単にJSONファイルを自動整形する方法"
date: 2024-11-25T13:00:00+09:00
description: "整形されていないJSONは読みにくく、解析が困難になることがあります。この記事では、Bashコマンドを使って簡単にJSONファイルを整形する方法を解説します。"
draft: false
enableToc: true
enableTocContent: true
tags: 
- bash
categories: 
- bash
image: images/thumbnail/Gnu-bash-logo.svg
---

# 【bash】簡単にJSONファイルを自動整形する方法

整形されていないJSONは読みにくく、解析が困難になることがあります。この記事では、Bashコマンドを使って簡単にJSONファイルを整形する方法を解説します。

---

## JSON整形に必要なツール：jq

`jq`は、JSONデータを処理するための強力なコマンドラインツールです。以下の機能を備えています：

- JSONデータの整形
- 特定のデータ抽出
- データの加工や変換

---

## jqのインストール

まず、`jq`をインストールしましょう。環境ごとにインストール方法が異なります。

### Debian/Ubuntu
```bash
sudo apt update
sudo apt install jq
```

### macOS (Homebrewを使用)
```bash
brew install jq
```

### その他の環境
公式ドキュメントで詳細な手順を確認できます。
* <a href="https://stedolan.github.io/jq/" target="_blank" rel="nofollow noopener">jq</a>

---

## JSONファイルを整形する基本コマンド

`jq`を使えば、1行のコマンドでJSONファイルを整形できます。

### 基本コマンド構文

```bash
jq '.' input.json > output.json
```

### コマンドの説明
- **`jq '.'`**  
  - JSON全体を指定して整形します。この場合、データの加工や変更は行われません。
- **`input.json`**  
  - 整形したいJSONファイルを指定します。
- **`>`**  
  - 整形結果を別のファイルにリダイレクトします。
- **`output.json`**  
  - 整形後のファイル名を指定します。

---

## 実行例

### 整形前のJSON
以下のような整形されていない`example.json`ファイルを例にします：

```json
{"name":"Alice","age":25,"city":"Tokyo"}
```

### コマンドの実行
次のコマンドを実行します：
```bash
jq '.' example.json > formatted_example.json
```

### 整形後のJSON
整形後の`formatted_example.json`は以下のようになります：

```json
{
  "name": "Alice",
  "age": 25,
  "city": "Tokyo"
}
```

このように、可読性が大幅に向上します。

---

## ファイルを直接上書きしたい場合

元のファイルをそのまま上書きしたい場合は、以下のコマンドを使用します：

```bash
jq '.' input.json > temp.json && mv temp.json input.json
```

この方法では、一時ファイルを使用して安全に上書きします。

---

## jqの便利な使い方

`jq`は整形だけでなく、以下のような操作も可能です：

### 特定のキーの抽出
```bash
jq '.name' input.json
```

このコマンドは、JSON内の`name`キーの値を抽出します。

### インデント幅の調整
デフォルトのインデント幅は2ですが、カスタマイズも可能です。
```bash
jq --indent 4 '.' input.json
```

---

## エラー対策

### 無効なJSONを処理しようとするとエラーになる
`jq`は有効なJSONのみを処理できます。エラーが出る場合は、以下のようにJSONの形式を確認してください：

1. JSONファイルが正しい形式であるか確認する。
2. 必要に応じて、オンラインのJSONバリデーターで検証する。

---

## まとめ

Bashと`jq`を使うことで、JSONファイルを簡単に整形できるようになります。

### メリット
- 可読性の向上
- コマンド1行で実行可能
- インストールも簡単

シンプルな整形だけでなく、データの抽出や加工も可能な`jq`をぜひ活用してください。JSONの取り扱いがさらに便利になります！

---

## 参考リンク
- <a href="https://stedolan.github.io/jq/" target="_blank" rel="nofollow noopener">jq</a>
- <a href="https://github.com/stedolan/jq" target="_blank" rel="nofollow noopener">jq GitHub</a>
