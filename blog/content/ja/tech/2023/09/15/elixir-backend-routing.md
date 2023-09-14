---
title: "【Elixir】 PhoenixでバックグラウンドでルーティングのURLを取得する方法"
date: 2023-09-15T01:30:00+09:00
description: "ElixirのPhoenixフレームワークでWebアプリケーションを開発する際、バックグラウンドでルーティングのURLを取得するケースがあります。"
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

# 【Elixir】 PhoenixでバックグラウンドでルーティングのURLを取得する方法
ElixirのPhoenixフレームワークでWebアプリケーションを開発する際、バックグラウンドでルーティングのURLを取得するケースがあります。
`conn`を使うパターンと使わないパターンについて説明します。

- `conn`はPhoenixのコネクション構造体で、リクエストのコンテキストを提供します。

## conn を使うパターン
コントローラーなどで行うパターンです。

1. **ルーターモジュールのエイリアス**
```elixir
alias MyAppWeb.Router.Helpers, as: Routes
```

2. **URLの生成**
```elixir
# パスの取得
path = Routes.route_path(conn, :show, id)

# URLの取得
url = Routes.route_url(conn, :show, id)
```

## conn を使わないパターン
こちらはバッチ処理などセッションがない際に有用なパターンです。

1. **ルーターモジュールのエイリアス**
```elixir
alias MyAppWeb.Router.Helpers, as: Routes
```

2. **URLの生成**
```elixir
# パスの取得
path = Routes.route_path(MyAppWeb.Endpoint, :show, id)

# URLの取得
url = Routes.route_url(MyAppWeb.Endpoint, :show, id)
```

## まとめ
Phoenixフレームワークでは、`conn`を使わなくても、簡単にルーティングのURLを生成ができます。
