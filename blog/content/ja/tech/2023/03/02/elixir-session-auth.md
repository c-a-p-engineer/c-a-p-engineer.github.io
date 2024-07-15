---
title: "【Elixir】ログイン制御 セッションでアクセス制限を実現する"
date: 2023-03-02T18:30:00+09:00
description: "Elixir でログイン制御 セッションでアクセス制限を実現する"
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

# 【Elixir】ログイン制御 セッションでアクセス制限を実現する
Elixir でログイン制御 セッションでアクセス制限を実現する

## 環境
* Elixir 1.14.2
* Phoenix 1.6.3

## セッション制御
特定のセッション（ログインなど）がない場合にアクセスが出来ないようにします。

### Plug module の作成
まずはセッションの制御を行うミドルウェアを作成
<a href="https://hexdocs.pm/phoenix/1.6.3/plug.html" target="_blank" rel="nofollow noopener">Plug — Phoenix v1.6.3</a>

```lib/demo_web/auth_plug.ex
defmodule DemoWeb.AuthPlug do
  import Plug.Conn, only: [get_session: 2, halt: 1]
  import Phoenix.Controller, only: [put_flash: 3, redirect: 2]

  def init(opts), do: opts

  def call(conn, _opts) do
    # :user のセッションない場合は "/" にリダイレクト
    case get_session(conn, :user) do
      nil ->
        conn
        |> put_flash(:error, "ログインしてください。")
        |> redirect(to: "/")
        |> halt()
      _ -> conn
    end
  end
end
```

### コントローラーに実装
コントローラーに `AuthPlug` を設定して特定のアクションではセッションがない場合はアクセスできないようにします。

```lib/demo_web/controllers/sample_controller.ex
defmodule DemoWeb.SampleController do
  use DemoWeb, :controller

  # アクセス制御を行う action を指定 [:index]
  plug DemoWeb.AuthPlug when action in [:index] 

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
```

これで特定のセッションがないとリダイレクトされます。

## 参考
* <a href="https://qiita.com/sand/items/8e541f8a950ae6c63931#%EF%BC%96-%E3%82%A2%E3%82%AF%E3%82%BB%E3%82%B9%E5%88%B6%E9%99%90" target="_blank" rel="nofollow noopener">Phoenix1.3のUser AccountsとSession - Qiita #6 アクセス制限</a>

