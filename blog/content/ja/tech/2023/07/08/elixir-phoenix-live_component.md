---
title: "【Elixir】Phoenix LiveComponentの簡単なサンプル実装"
date: 2023-07-10T10:00:00+09:00
description: "LiveComponentのクリックするたびに数値が増減するというシンプルなアプリケーションの作り方について解説します。"
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

# 【Elixir】Phoenix LiveComponentの簡単なサンプル実装
LiveComponentのクリックするたびに数値が増減するというシンプルなアプリケーションの作り方について解説します。

## 確認環境
* Elixir 1.14.2
* Phoenix 1.6.3

## LiveComponentの作成

まず、新しいLiveComponentを作成します。
たとえば、`lib/your_app_web/live/counter_component.ex`というファイルを作り、以下のように入力します。

```elixir:lib/your_app_web/live/counter_component.ex
defmodule YourAppWeb.CounterComponent do
  # LiveComponentを使用することを宣言します。
  use Phoenix.LiveComponent

  # LiveComponentのHTMLを描画します。
  def render(assigns) do
    ~H"""
      <div>
      <!-- 一つ目のボタンはphx-clickイベントを"decrement"にマッピングします。 -->
      <button phx-click="decrement" phx-target={@myself}>-</button>

      <!-- カウンターの現在の値を表示します。 -->
      <p><%= @count %></p>

      <!-- 二つ目のボタンはphx-clickイベントを"increment"にマッピングします。 -->
      <button phx-click="increment" phx-target={@myself}>+</button>
    </div>
    """
  end

  # コンポーネントを初期化し、初期のカウンター値を0に設定します。
  def mount(socket) do
    {:ok, assign(socket, :count, 0)}
  end

  # コンポーネントの更新を行う。
  # _assigns には呼び出し時の変数が入る
  def update(_assigns, socket) do
    {:ok, socket}
  end

  # "increment"イベントを処理し、カウンターの値を1増やします。
  def handle_event("increment", _, socket) do
    {:noreply, assign(socket, :count, socket.assigns.count + 1)}
  end

  # "decrement"イベントを処理し、カウンターの値を1減らします。
  def handle_event("decrement", _, socket) do
    {:noreply, assign(socket, :count, socket.assigns.count - 1)}
  end
end
```

上記のコードは以下のように動作します。

* `mount/2`関数で、初期カウンターの値を`0`に設定します。
* 2つのボタンがあり、それぞれ`increment`と`decrement`という名前のイベントを発行します。
* `handle_event/3`関数でこれらのイベントを処理し、それぞれカウンターを増減させます。
* `phx-target={@myself}` を付けることによって LiveComposenet 内のイベントを実行します。（付けないと呼び出し元のイベントを実行します。

## LiveViewでのLiveComponentの使用
次に、LiveViewでこのLiveComponentを使用します。
LiveViewのテンプレートで、以下のようにLiveComponentを呼び出します。

```html:call.html.heex..html
<.live_component
  # LiveComponent
  module={YourAppWeb.CounterComponent}
  # 一意になるようなID
  id="id"
  # 何か値を渡したい場合は以下のようにする。
  hoge={@hoge}
/>
```

## 参考
* <a href="https://hexdocs.pm/phoenix_live_view/0.19.3/Phoenix.LiveComponent.html" target="_blank" rel="nofollow noopener">Phoenix.LiveComponent</a>
* <a href="https://hexdocs.pm/phoenix_live_view/0.19.3/Phoenix.LiveComponent.html#module-events" target="_blank" rel="nofollow noopener">Event - Phoenix.LiveComponent</a>
