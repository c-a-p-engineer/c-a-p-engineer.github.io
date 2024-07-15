---
title: "【Elixir】Phoenix 1.6 → 1.7 へのアップデートのメモ"
date: 2023-11-26T01:20:00+09:00
description: "Elixir Phoenix 1.6 → 1.7 へのアップデートしようとした際のメモ。なおアップデートはしていない。"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Elixir
- Phoenix
categories: 
- Elixir
image: images/thumbnail/Official_Elixir_logo.png
---

# 【Elixir】Phoenix 1.6 → 1.7 へのアップデートのメモ
Elixir Phoenix 1.6 → 1.7 へのアップデートしようとした際のメモ。

**なおアップデートはしていない。**

## アップデート方法は3種類

色々と試行錯誤を行った結果、以下の3種類のものをすべて試しました。それらを試した結果、僕は**アップデートを諦めました**。

### 後方互換性を残す方法

1.6 プロジェクトで使用している Phoenix をできるだけ、そのまま残して 1.7 にアップデートする方法です。

<a href="https://gist.github.com/chrismccord/00a6ea2a96bc57df0cce526bd20af8a7" target="_blank" rel="nofollow noopener">Upgrading from Phoenix v1.6.x to v1.7.0</a>

- パッケージのみアップデート
- 1.7 に合わせるためにファイルを修正

### 差分ファイルを入れてのバージョンアップ

これは現行のプロジェクトに対して新たに `mix phx.new` をして 1.7 のバージョンをファイル構成を被せます。

<a href="https://qiita.com/torifukukaiou/items/9b31826be9788f1ce796" target="_blank" rel="nofollow noopener">闘魂Elixir ── Phoenixで作ったアプリケーションを1.6.6から1.7.7へアップグレードすることを楽しんだ思い出</a>

- 現行プロジェクト対して 1.7 ファイル構成を被せる
- 同一ファイルが上書きされるので git などを見て必要なものは取り込む
- 1.6 のファイル構成が残る（不要なものを探して削除するか確認する必要あり

### 移植

新たにまっさらな Phoenix プロジェクトを生成して1つ1つの機能を移植して行く流れです。

- 旧ファイルが存在しないので一番きれいな状態になる
- 移植するので巨大なプロジェクトほど工数がかかる

## Phoenix.View から Phoenix.Component

1.7 から `Phoenix.View` が `Phoenix.Component` になりましたので注意が必要です。

<a href="https://hexdocs.pm/phoenix_view/Phoenix.View.html#module-replaced-by-phoenix-component" target="_blank" rel="nofollow noopener">Replaced by Phoenix.Component</a>

## まとめ

今までPHPのFWのバージョンアップなど経験をしてきましたが、Phoenix はまだまだ新機能が作られたりするので破壊的なバージョンアップが続きそうなので注意が必要です。
