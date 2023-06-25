---
title: "【Elixir】Phoenixでのレイアウトテンプレート設定方法"
date: 2023-06-25T19:00:00+09:00
description: "Elixir Phoenixでのレイアウトテンプレート設定方法。"
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

# 【Elixir】Phoenixでのレイアウトテンプレート設定方法
Elixir Phoenixでのレイアウトテンプレート設定方法。

## 確認環境
* Elixir 1.14.2
* Phoenix 1.6.3

## アクションの設定
`put_layout` を利用することでテンプレートを変更することが可能です。
基本的な使い方は以下のようになります。

```elixir
defmodule MyAppWeb.PageController do
  use MyAppWeb, :controller

  def index(conn, _params) do
    conn
    |> put_layout("special.html")
    |> render("index.html")
  end
end
```

上記のコードでは、`index`アクションが呼び出されたときに`special.html.heex`という名前のレイアウトが適用されます。
`put_layout` に `fasle` を渡すとレイアウトを使用しなくなります。

ルートテンプレートの変更には `put_root_layout` を使用することで可能です。

### ルーターでの設定

Phoenixフレームワークにおいて、レイアウトは通常　`lib/my_app_web/templates/layout/app.html.eex`　というパスに配置されますが、`put_root_layout`を使用してこのデフォルトを上書きすることが可能です。

以下に例を示します。

```elixir
defmodule MyAppWeb.Router do
  use MyAppWeb, :router

  # 使用するレイアウトの指定
  pipeline :custom_layout do
    plug :put_layout, {MyAppWeb.LayoutView, "custom.html"}
  end

  scope "/", MyAppWeb do
    pipe_through [:browser, :custom_layout]

    get "/", PageController, :index
  end
end
```

上記のコードでは、`custom_layout`パイプラインを新たに作成して `put_root_layout`プラグを追加し、そのレイアウトとして`custom.html.eex`を指定しています。
これにより、このパイプラインを通るすべてのリクエストに対して`custom.html.heex`レイアウトが適用されます。

`put_layout`と`put_root_layout`は、Phoenixフレームワークにおけるレイアウト管理の柔軟性を高めるための重要なツールです。
これらをうまく利用することで、ウェブアプリケーションの見た目をコントローラーやアクションレベルで細かく制御することが可能となります。

## 参考
* <a href="https://hexdocs.pm/phoenix/1.7.6/Phoenix.Controller.html#put_layout/2" target="_blank" rel="nofollow noopener">put_layout/2</a>
* <a href="https://hexdocs.pm/phoenix/1.7.6/Phoenix.Controller.html#put_root_layout/2" target="_blank" rel="nofollow noopener">put_root_layout/2</a>