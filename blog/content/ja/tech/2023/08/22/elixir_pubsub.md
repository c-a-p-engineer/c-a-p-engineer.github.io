---
title: "【Elixir】Phoenix PubSub を使ってリアルタイムデータ共有の方法"
date: 2023-08-22T13:00:00+09:00
description: "Phoenix PubSubは、Elixirを使用したリアルタイムデータ共有の鍵となる機能です。"
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

# 【Elixir】Phoenix PubSub を使ってリアルタイムデータ共有の方法
Phoenix PubSubは、Elixirを使用したリアルタイムデータ共有の鍵となる機能です。
リアルタイムに他のユーザなどにデータ共有が可能です。
Phoenix PubSubの基本的な使用方法からサブスクライブの停止までの詳細なプロセスを紹介しています。

## 確認環境
* Elixir 1.14.2
* Phoenix 1.6.3

## PubSubの設定
Phoenix PubSubを使用するための設定をします。
Elixir Phoenix を入れると一緒に入ってると思いますが入ってない場合は以下を参考にしてください。

### 依存関係の追加
最初に、`mix.exs` ファイルに`phoenix_pubsub`パッケージを追加します：
```elixir:mix.exs
defp deps do
  [
    {:phoenix_pubsub, "~> 2.0"}
  ]
end
```

### アプリケーションの設定
次に、`config/config.exs`にてPubSubの設定を行います。
Adapterを設定する場合にこちらを使用してください。
通常通りに使用するのであればこちら不要です。

```elixir:config/config.exs
config :my_app, MyApp.PubSub,
  adapter: Phoenix.PubSub.PG2,
  name: MyApp.PubSub
```

### アプリケーションの起動時の設定
`MyApp.Application`にPubSubを監視するように設定します。

```elixir:/lib/my_app/application.ex
def start(_type, _args) do
  children = [
    {Phoenix.PubSub, name: MyApp.PubSub}
  ]

  opts = [strategy: :one_for_one, name: MyApp.Supervisor]
  Supervisor.start_link(children, opts)
end
```

## メッセージの受信
LiveViewでメッセージを受信するために、以下のようにサブスクライブを開始します。

```elixir
def mount(_params, _session, socket) do
  if connected?(socket) do
    Phoenix.PubSub.subscribe(MyApp.PubSub, "my_topic")
  end

  {:ok, socket}
end
```

受け取るメッセージのハンドラーは以下のようになります。
```elixir
def handle_info({:my_message, payload}, socket) do
  IO.inspect("Received message: #{payload}")
  {:noreply, socket}
end
```

## メッセージの送信
以下のようにメッセージをPubSubで送信できます。

```elixir
Phoenix.PubSub.broadcast(MyApp.PubSub, "my_topic", {:my_message, "Hello, World!"})
```

## サブスクライブの停止
PubSubからのサブスクライブを途中で停止する場合は、以下のコードを使用します。
```elixir
Phoenix.PubSub.unsubscribe(PubSub, "my_topic")
```

## まとめ
Phoenix PubSubは、Elixirにおけるリアルタイムデータ共有に強力なツールです。
これでリアルタイムの通信を実現できます。
