---
title: "【Elixir】LiveView に対する認証・認可を自作する"
date: 2023-03-19T09:00:00+09:00
description: "Elixir で LiveView に対する認証・認可を自作する"
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

# 【Elixir】LiveView に対する認証・認可を自作する
Elixir で LiveView に対する認証・認可を自作する

以下のドキュメントを参考にしています。
<a href="https://hexdocs.pm/phoenix_live_view/security-model.html" target="_blank" rel="nofollow noopener">Security considerations of the LiveView model — Phoenix LiveView v0.18.18</a>

## 環境
* Elixir 1.14.2
* Phoenix 1.6.3

## LiveView 認証・認可モジュールの作成
LiveView 用の認証・認可モジュールを作成します。

```lib/demo_web/user_live_auth.ex
defmodule DemoWeb.UserLiveAuth do
  import Phoenix.Component
  import Phoenix.LiveView
  alias DemoWeb.Accounts # from `mix phx.gen.auth`

  def on_mount(:default, _params, %{"user_token" => user_token} = _session, socket) do
    socket =
      assign_new(socket, :current_user, fn ->
        # セッショントークンが存在するか確認
        Accounts.get_user_by_session_token(user_token)
      end)

    if socket.assigns.current_user.confirmed_at do
      # ログイン済み
      {:cont, socket}
    else
      # 未ログイン /login へリダイレクト
      {:halt, redirect(socket, to: "/login")}
    end
  end
end

```

## 使用方法
使用方法は3通りあります。
必要に応じて入れ方を替えてください。

### 各ページに入れる
認証・認可モジュールを個々の LiveView に入れます。

```lib/demo_web/live/demo.ex
defmodule DemoWeb.PageLive do
  use DemoWeb, :live_view

  # 認証・認可モジュールをフック
  on_mount DemoWeb.UserLiveAuth

  ...
end

```

### 全ページに入れる
デフォルトですべての LiveView で実行するようにします。
``` lib/demo_web.ex
def live_view do
  quote do
    use Phoenix.LiveView,
      layout: {DemoWeb.LayoutView, :live}

    # すべての LiveView はログイン中のみ
    on_mount DemoWeb.UserLiveAuth
    unquote(html_helpers())
  end
end
```

### ルーティングで行う
ルーティング時に認証・認可のモジュールをフックして実行させます。
管理しやすいので僕としてはこれがオススメです。

``` lib/demo_web/router.ex
defmodule DemoWeb.Router do
  scope "/", DemoWeb do

    # ログイン中のみ
    live_session :default, on_mount: DemoWeb.UserLiveAuth do
      scope "/" do
        live("/demo", DemoLive)
      end
    end
  end
end
```

## 参考
* <a href="https://hexdocs.pm/phoenix_live_view/security-model.html" target="_blank" rel="nofollow noopener">Security considerations of the LiveView model — Phoenix LiveView v0.18.18</a>
