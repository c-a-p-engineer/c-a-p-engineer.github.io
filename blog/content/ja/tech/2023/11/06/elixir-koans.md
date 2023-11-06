---
title: 【Elixir】Elixir KoansでElixirを学ぼう
date: 2023-11-06T12:30:00+09:00
description: Elixir Koansを使ってElixirの問題を解く方法を紹介します。
draft: false
enableToc: true
enableTocContent: true
tags: 
- Elixir
categories: 
- Elixir
image: images/thumbnail/Official_Elixir_logo.png
image_description: 'Elixir ロゴ ©José Valim <a href="https://creativecommons.org/licenses/by-sa/4.0" target="_blank" rel="nofollow noopener">CC 表示-継承 4.0</a>'
---

# 【Elixir】Elixir KoansでElixirを学ぼう
Elixir Koansを使ってElixirの問題を解く方法を紹介します。

- <a href="https://github.com/elixirkoans/elixir-koans" target="_blank" rel="nofollow noopener">elixirkoans/elixir-koans: Elixir learning exercises</a>

## 実行環境
- Elixir 1.15.6

## Elixir Koansとは？
Elixir Koansは、Elixirの使用法を体験するための一連の練習問題です。

プログラミング言語Elixirを学び始める人にとって、理論だけでなく実際にコードを書きながら学べるツールです。

## スタートガイド

Elixirをインストール済みの環境で行ってください。

### セットアップ
1. GitHubからリポジトリをクローンします。
```bash
$ git clone https://github.com/elixirkoans/elixir-koans.git
$ cd elixir-koans/
```
2. 依存関係を取得します。
```bash
$ mix deps.get
```

### 問題を解く

1. プロジェクトのルートディレクトリで`mix meditate`を実行します。
```bash
$ mix meditate
```

2. 最初の問題が表示されたら、指示にしたがってファイルを開き、空白を適切なコードで埋めます。
以下のように `lib/koans/01_equalities.ex:12` ファイルと行が指定されています。
```bash
Now meditate upon Equalities
|                              | 0 of 209
----------------------------------------
We shall contemplate truth by testing reality, via equality
Assertion failed in lib/koans/01_equalities.ex:12
true == ___
```

3. ファイルを保存すると、自動実行機能がテストを再実行し、結果を表示します。

## 特定の問題にジャンプする

特定のレッスンに直接ジャンプしたい場合は、以下のようにコマンドを実行します。
```bash
$ mix meditate --koan=PatternMatching
```
これにより、`PatternMatching`の問題に直接アクセスできます。

## まとめ

Elixir Koansは、Elixirを学ぶためのインタラクティブで実践的な方法を提供します。このツールを使えば、Elixirの基本から応用まで、自分のペースで学ぶことができます。Elixirの旅を始めるために、今すぐElixir Koansを試してみてください。

## 参考リンク

- <a href="https://github.com/elixirkoans/elixir-koans" target="_blank" rel="nofollow noopener">elixirkoans/elixir-koans: Elixir learning exercises</a>
