---
title: "【Elixir】Phoenix LiveView でJSを書かずにアニメーションなどを実装する"
date: 2023-03-15T18:30:00+09:00
description: "Elixir の Phoenix LiveView でJSを書かずにアニメーションなどを実装する方法"
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

# 【Elixir】Phoenix LiveView でJSを書かずにアニメーションなどを実装する方法
Elixir の Phoenix LiveView でJSを書かずにアニメーションなどを実装する方法。
折角 LiveView を使っているのに一々画面項目の表示/非表示などの簡単なJSを一々書きたくないなって考えたら実装方法がありましたのでメモ。

## 環境
* Elixir 1.14.2
* Phoenix 1.6.3

## 実装
実際に実装してみます。
```lib/demo_web/live/demo_live.ex
defmodule DemoWeb.DemoLive do
  use DemoWeb, :live_view

  alias Phoenix.LiveView.JS

  # 初期接続
  def mount(_params, _session, socket) do
    {:ok, socket}
  end

  # 画面
  def render(assigns) do
    ~L"""
    <p><%= submit "表示/非表示", type: "button", phx_click: JS.toggle(to: "#info", in: "fade-in-scale", out: "fade-out-scale") %></p>
    <p><%= submit "文字を小さくする", type: "button", phx_click: JS.set_attribute({"style", "font-size:1px"}, to: "#info") %></p>
    <p><%= submit "文字を大きくする", type: "button", phx_click: JS.set_attribute({"style", "font-size:100px"}, to: "#info") %></p>
    <p><%= submit "初期化", type: "button", phx_click: JS.remove_attribute("style", to: "#info") %></p>
    <div id="info">
      表示中
    </div>
    """
  end
end

```

ルーティングにサンプルを追加
```/lib/demo_web/router.ex
  scope "/", DemoWeb do
    pipe_through(:browser)

    get("/", PageController, :index)

    # /demo のパスを追加
    live("/demo", DemoLive)
  end
```

実装をした結果がこちらです。
JSは一切書かずに色々な動きを実装ができます。
![elixir-phoenix-live-js](/tech/2023/03/15/elixir-phoenix-live-js/elixir-phoenix-live-js.gif "elixir-phoenix-live-js") 

## 参考
* <a href="https://hexdocs.pm/phoenix_live_view/0.18.17/Phoenix.LiveView.JS.html" target="_blank" rel="nofollow noopener">Phoenix.LiveView.JS — Phoenix LiveView v0.18.17</a>
