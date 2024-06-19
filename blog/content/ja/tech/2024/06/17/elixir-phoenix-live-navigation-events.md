---
title: 【Elixir】Phoenix LiveViewのライブナビゲーションイベント
date: 2024-06-17T20:00:00+09:00
description: Phoenix LiveViewを活用することで、リアルタイムのページナビゲーションを実現できます。
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


# Phoenix LiveViewのライブナビゲーションイベント

Phoenix LiveViewを活用することで、リアルタイムのページナビゲーションを実現できます。ライブナビゲーションイベントの仕組みとその実装方法について詳しく解説します。

## ライブナビゲーションイベントとは？

Phoenix LiveViewのライブナビゲーションイベントは、ページの読み込み状況をリアルタイムで監視し、必要に応じてローディングインジケーターを表示するための機能です。以下の2つのイベントを使用します。

- **`phx:page-loading-start`**: ページ読み込みが開始されたときに発生します。
- **`phx:page-loading-stop`**: ページ読み込みが終了したときに発生します。
- **`phx:navigate`**: イベントはブラウザの URL バーに表示されるたびにトリガーされます。（v0.18から

これらのイベントは、ナビゲーションの種類や目的に応じて適切にハンドリングされます。

## イベントの詳細情報

各イベントには、以下のような詳細情報が含まれます。
- **`kind`**: イベントの種類（`redirect`、`patch`、`initial`、`element`）
- **`to`**: 読み込み対象のURL（`element`イベント以外）
- **`target`**: イベントをトリガーしたDOM要素（`element`イベントの場合）

### 実装例

ページの読み込み中にローディングバーを表示するには、以下のコードを使用します。

```javascript
window.addEventListener("phx:page-loading-start", info => console.log("phx:page-loading-start", info));
window.addEventListener("phx:page-loading-stop", info => console.log("phx:page-loading-stop", info));
window.addEventListener("phx:navigate", info => console.log("phx:navigate", info));
```

## ライブナビゲーションの詳細な実装方法

ライブナビゲーションは、クライアントサイドおよびサーバーサイドから実装できます。

### クライアントサイド

クライアントサイドでは、リンクに`patch={url}`または`navigate={url}`を渡すことでナビゲーションを実行します：

```elixir
<.link patch={~p"/pages/#{@page + 1}"}>Next</.link>
```

### サーバーサイド

サーバーサイドでは、`Phoenix.LiveView.push_patch/2`または`Phoenix.LiveView.push_navigate/2`を使用します：
```elixir
{:noreply, push_patch(socket, to: ~p"/pages/#{@page + 1}")}
```

#### ベストプラクティス

- **`patch`操作**: 現在のLiveViewを更新し、URLと現在のパラメータを更新する際に使用します。`handle_params/3`コールバックが呼び出され、最小限の変更がクライアントに送信されます。
- **`navigate`操作**: 現在のLiveViewを解除し、新しいLiveViewをマウントする際に使用します。同じセッション内でのみ機能します。

### まとめ

Phoenix LiveViewのライブナビゲーションイベントを使用することで、ユーザーエクスペリエンスを向上させることができます。

## 参考

- <a href="https://hexdocs.pm/phoenix_live_view/0.20.14/js-interop.html#live-navigation-events" target="_blank" rel="nofollow noopener">
Live navigation events</a>
