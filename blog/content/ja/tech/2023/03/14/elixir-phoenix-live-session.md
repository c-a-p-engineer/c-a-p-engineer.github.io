---
title: "【Elixir】Phoenix で PhoenixLiveSession を使用して LiveView で Session を使用する"
date: 2023-03-14T12:30:00+09:00
lastMod: 2023-04-16T00:40:00+09:00
description: "Elixir Phoenix で PhoenixLiveSession を使用して LiveView で Session を使用する方法"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Elixir
- Phoenix
categories: 
- Elixir
- Phoenix
image: images/thumbnail/Official_Elixir_logo.png
image_description: 'Elixir ロゴ ©José Valim <a href="https://creativecommons.org/licenses/by-sa/4.0" target="_blank" rel="nofollow noopener">CC 表示-継承 4.0</a>'
---

# 【Elixir】Phoenix で PhoenixLiveSession を使用して LiveView で Session を使用する
Elixir Phoenix で PhoenixLiveSession を使用して LiveView で Session を使用する方法。
通常 LiveView 上では Session を扱えません。
Session を扱えるように PhoenixLiveSession を導入する必要があります。

扱えるようにすると `Plug.Conn` のセッション情報にデータを保存ができます。

## 環境
* Elixir 1.14.2
* Phoenix 1.6.3
* LiveViewSession 0.1.3

## インストール
`mix.exs` に `phoenix_live_session` を追加します。

```mix.exs
  defp deps do
    [
      {:phoenix_live_session, "~> 0.1"} # Add phoenix_live_session
    ]
  end
```

`mix deps.get` を実行してインストールします。

## 設定
`endpoint.ex` を以下のように編集します。
MyApp のところなどは自分の環境に合わせてください。
```lib/my_app_web/endpoint.ex
@session_options [
    store: PhoenixLiveSession,
    pub_sub: MyApp.PubSub,
    signing_salt: "your-salt",
]
```

## 使用
以下はLiveViewで使用するサンプルコードです。
注意としては `mount` 時に `put_session` しようとするとエラーになります。

```src/lib/my_app_web/live/light_live.ex
  # 初期接続
  def mount(_params, session, socket) do
    # セッションの確認
    IO.inspect(session)

    # 各初期値を取得（ atom で入れても session 上では文字列にされるので注意
    light_bulb_status = Map.get(session, "light_bulb_status", "off")
    on_button_status = Map.get(session, "on_button_status", "")
    off_button_status = Map.get(session, "off_button_status", "disabled")

    # 初期値の確認
    IO.inspect(light_bulb_status)
    IO.inspect(on_button_status)
    IO.inspect(off_button_status)

    socket =
      socket
      |> assign(:light_bulb_status, light_bulb_status)
      |> assign(:on_button_status, on_button_status)
      |> assign(:off_button_status, off_button_status)
      # セッションの共有
      |> PhoenixLiveSession.maybe_subscribe(session)

    {:ok, socket}
  end

  # 画面
  def render(assigns) do
    ~L"""
    <h1>The light is <%= @light_bulb_status %>.</h1>
    <button phx-click="on" <%= @on_button_status %>>On</button>
    <button phx-click="off" <%= @off_button_status %>>Off</button>
    """
  end

  # Onボタンの処理
  def handle_event("on", _value, socket) do
    socket =
      socket
      |> assign(:light_bulb_status, "on")
      |> assign(:on_button_status, "disabled")
      |> assign(:off_button_status, "")
      # セッションに保存
      |> PhoenixLiveSession.put_session(:light_bulb_status, "on")
      |> PhoenixLiveSession.put_session(:on_button_status, "disabled")
      |> PhoenixLiveSession.put_session(:off_button_status, "")

    {:noreply, socket}
  end

  # Offボタンの処理
  def handle_event("off", _value, socket) do
    socket =
      socket
      |> assign(:light_bulb_status, "off")
      |> assign(:on_button_status, "")
      |> assign(:off_button_status, "disabled")
      # セッションに保存
      |> PhoenixLiveSession.put_session(:light_bulb_status, "off")
      |> PhoenixLiveSession.put_session(:on_button_status, "")
      |> PhoenixLiveSession.put_session(:off_button_status, "disabled")

    {:noreply, socket}
  end
end

```

## セッションの取得
セッションの取得方法は以下のようにすれば可能です。

```exs
sid = get_in(socket.private, [:live_session, :id])
opts = get_in(socket.private, [:live_session, :opts])
{sid, session} = PhoenixLiveSession.get(nil, sid, opts)
```

## 参考
* <a href="https://hexdocs.pm/phoenix_live_session/0.1.3/PhoenixLiveSession.html" target="_blank" rel="nofollow noopener">PhoenixLiveSession — phoenix_live_session v0.1.3</a>
* <a href="https://github.com/pentacent/phoenix_live_session" target="_blank" rel="nofollow noopener">pentacent/phoenix_live_session</a>
