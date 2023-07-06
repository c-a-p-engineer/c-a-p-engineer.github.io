---
title: "【Elixir】Phoenix サーバーサイドからリアルタイム通知する"
date: 2023-07-06T19:20:00+09:00
description: "Elixir Phoenix サーバーサイドからユーザーに簡単にリアルタイム通知することが可能です。"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Elixir
- Phoenix
categories: 
- Elixir
image: images/thumbnail/Official_Elixir_logo.png
image_description: 'Elixir ロゴ ©José Valim <a href="https://creativecommons.org/licenses/by-sa/4.0" target="_blank" rel="nofollow noopener">CC 表示-継承 4.0</a>'
---

# 【Elixir】Phoenix サーバーサイドからユーザーにリアルタイム通知する
Elixir Phoenix サーバーサイドからユーザーに簡単にリアルタイム通知することが可能です。

## 確認環境
* Elixir 1.14.2
* Phoenix 1.6.3

# Elixir Phoenixでの通知システムの作成

ElixirとPhoenixを使用して、リアルタイムの通知システムを作成する方法を探求します。このシステムは、特定のユーザーに対してメッセージの通知を送ることができ、ログイン中の全画面に適用されます。さらに、サーバーから特定のユーザーに通知を送ることも可能です。

## チャネルの生成
まず、新しいチャネルを生成します。Phoenixでは、`mix phx.gen.channel`コマンドを使用してチャネルを生成ができます。この例では、`Notifications`という名前のチャネルを生成します。

```bash
mix phx.gen.channel Notifications
```

このコマンドを実行すると、以下のファイルが生成されます。

* `lib/sample_web/channels/notifications_channel.ex`
* `test/sample_web/channels/notifications_channel_test.exs`
* `lib/sample_web/channels/user_socket.ex`
* `assets/js/user_socket.js`

## WebSocket追加
通知用のWebSocketを `endpoint.ex` に追加します。

```lib/sample_web/endpoint.ex
socket "/socket", SampleWeb.UserSocket,
  websocket: true,
  longpoll: false
```

## Javascriptの用意
`app.js` に生成されたJavaScriptを追加します。

```assets/js/app.js
import "./user_socket.js"
```

## チャネルの設定
生成された`notifications_channel.ex` です。
今回は `notifications:lobby` というチャンネルで全体通知をしてみます。

```lib/sample_web/channels/notifications_channel.ex
defmodule SampleWeb.NotificationsChannel do
  use SampleWeb, :channel

  # "notifications:lobby" が接続するための部屋
  # "notifications:" <> user_id などにすることで特定のユーザのみの通知も可能になる
  @impl true
  def join("notifications:lobby", payload, socket) do
    if authorized?(payload) do
      # 認証OKであれば接続
      {:ok, socket}
    else
      # エラー
      {:error, %{reason: "unauthorized"}}
    end
  end

  # PING
  @impl true
  def handle_in("ping", payload, socket) do
    {:reply, {:ok, payload}, socket}
  end

  # 通知
  @impl true
  def handle_in("shout", payload, socket) do
    broadcast(socket, "shout", payload)
    {:noreply, socket}
  end

  # 認証
  defp authorized?(_payload) do
    true
  end
end
```

この関数は、ユーザーがチャネルに参加時に呼び出されます。
ユーザーIDをチャネルのトピックに含めることで、特定のユーザーに対して通知を送ることができます。

## JavaScript 側の設定
JavaScript側でメッセージの通知処理を作成します。
今回は `console.log` を出すだけにします。

```assets/js/user_socket.js
// 接続先のチャンネル
let channel = socket.channel("notifications:lobby", {})

channel.join()
  .receive("ok", resp => { console.log("Joined successfully", resp) })
  .receive("error", resp => { console.log("Unable to join", resp) })

// 処理
channel.on("shout", payload => {
  console.log("New message:", payload.message)
})
```

この関数は、クライアントから `shout` というイベントが送られてきたときに呼び出されます。
イベントにはメッセージが含まれており、このメッセージは`broadcast_to!`関数を使用して特定のユーザーに送信されます。

## サーバーサイドから通知する
以下のコードを使用することによってサーバーサイドからフロントに対して通知を行うことができます。
今回は全通知です。

```elixir
Sample.Endpoint.broadcast(
  # 対象チャンネル
  "notifications:lobby",
  # 対象のhandle_in
  "shout",
  # payload
  %{
    title: title,
    message: message
  }
)
```

## まとめ
ElixirとPhoenixを使用して接続ユーザーに通知を送るシステムを作成する方法です。
このシステムは、リアルタイムの通知を可能にし、ログイン中の全画面に適用されます。
さらに、サーバーから特定のユーザーに通知を送ることも可能です。

## 参考
* <a href="https://hexdocs.pm/phoenix/1.6.3/Mix.Tasks.Phx.Gen.Channel.html" target="_blank" rel="nofollow noopener">mix phx.gen.channel </a>
