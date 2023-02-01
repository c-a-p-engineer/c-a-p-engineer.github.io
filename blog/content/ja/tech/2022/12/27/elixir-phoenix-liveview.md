---
title: "【Elixir】 Phoenix で LiveView を使ってみる"
date: 2022-12-27T02:40:00+09:00
description: "LiveViewを使ってバックエンドだけでリッチなフロントエンドを作成してみます。"
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

# 【Elixir】 Phoenix で LiveView を使ってみる
今回はLiveViewを使ってバックエンドだけでリッチなフロントエンドを作成してみます。
<a href="https://hexdocs.pm/phoenix_live_view/0.17.5/Phoenix.LiveView.html">Phoenix.LiveView — Phoenix LiveView v0.17.5</a>

## 環境
* Elixir 1.14.2
* Phoenix 1.6.3
* LiveView 0.17.5

## サンプル
こちらの参考ページを元に進めていきます。
<a href="https://www.wintermeyer-consulting.de/books/phoenix/1.5/phoenix-liveview-basics.html" target="_blank" rel="nofollow noopener">Phoenix LiveView Basics :: Phoenix Beginner's Guide</a>

ON/OFFボタンを作成します。

### phoenixプロジェクト作成
DB不要のため `--no-ecto` を付けます。
```
mix phx.new demo --no-ecto
```

### LiveViewの処理を実装
```src/lib/demo_web/live/light_live.ex
defmodule DemoWeb.LightLive do
  use DemoWeb, :live_view

  # 初期接続
  def mount(_params, _session, socket) do
    socket =
      socket
      |> assign(:light_bulb_status, "off")
      |> assign(:on_button_status, "")
      |> assign(:off_button_status, "disabled")

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

    {:noreply, socket}
  end

  # Offボタンの処理
  def handle_event("off", _value, socket) do
    socket =
      socket
      |> assign(:light_bulb_status, "off")
      |> assign(:on_button_status, "")
      |> assign(:off_button_status, "disabled")

    {:noreply, socket}
  end
end
```

### Routerへの追加
```/lib/demo_web/router.ex
  scope "/", DemoWeb do
    pipe_through(:browser)

    get("/", PageController, :index)

    # /light のパスを追加
    live("/light", LightLive)
  end
```

### 確認
Phoenixサーバーを起動します。
```
mix phx.server
```

起動後に <a href="http://localhost:4000/light" target="_blank" rel="nofollow noopener">http://localhost:4000/light</a> に接続すると画面が出てきます。

![liveview](/tech/2022/12/27/elixir-phoenix-liveview/elixir-phoenix-liveview-light.gif "liveview") 

## 参考
* <a href="https://www.wintermeyer-consulting.de/books/phoenix/1.5/phoenix-liveview-basics.html" target="_blank" rel="nofollow noopener">Phoenix LiveView Basics :: Phoenix Beginner's Guide</a>
