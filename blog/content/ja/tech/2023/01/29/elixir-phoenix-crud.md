---
title: "【Elixir】Phoenix 5分でCRUDを作ってみます！"
date: 2023-01-29T15:20:00+09:00
description: "Elixir Phoenix で5分でCRUDをやってみます！"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Elixir
- Phoenix
categories: 
- Elixir
image: images/thumbnail/Official_Elixir_logo.png
---

# 【Elixir】Phoenix 5分でCRUDを作ってみます！
Elixir Phoenix で5分でCRUDをやってみます！

インストール関係は省きます。
今回 `demo` という名前でプロジェクトを作っています。

## 環境
* Elixir 1.14.2
* Phoenix 1.6.3

## mix phx.gen.html
`mix phx.gen.html` コマンドを使用します。
<a href="https://hexdocs.pm/phoenix/1.6.13/Mix.Tasks.Phx.Gen.Html.html" target="_blank" rel="nofollow noopener">mix phx.gen.html — Phoenix v1.6.13</a>

このコマンドはController, Model, View, HTML リソースなどCRUDに必要なものを自動的に生成してくれます。

公式ドキュメントにあるコマンドを実行してみます。
```
mix phx.gen.html Accounts User users name:string age:integer
```

### 作成されるファイル
* Controller
    * `lib/demo_web/controllers/user_controller.ex`
* Model系
    * `lib/demo/accounts.ex`
    * `lib/demo/accounts/user.ex`
* View系
    * `lib/demo_web/views/user_view.ex`
    * `lib/demo_web/templates/user/edit.html.heex`
    * `lib/demo_web/templates/user/form.html.heex`
    * `lib/demo_web/templates/user/index.html.heex`
    * `lib/demo_web/templates/user/new.html.heex`
    * `lib/demo_web/templates/user/show.html.heex`

* マイグレーション
    * `priv/repo/migrations/20230128234218_create_users.exs`

* テスト系
    * `test/demo/accounts_test.exs`
    * `test/demo_web/controllers/user_controller_test.exs`
    * `test/support/fixtures/accounts_fixtures.ex`

## ルーティング追加
作成されたControllerをルーティングに追加します。
```lib/demo_web/router.ex
  scope "/", DemoWeb do
    pipe_through :browser
    # add
    resources "/users", UserController
  end
```

追加したルーティングを確認
```
mix phx.routes
```

`UserController` へのルーティングが追加されたことを確認。
```
user_path   GET     /users/:id/edit                        DemoWeb.UserController :edit
user_path   GET     /users/new                             DemoWeb.UserController :new
user_path   GET     /users/:id                             DemoWeb.UserController :show
user_path   POST    /users                                 DemoWeb.UserController :create
user_path   PATCH   /users/:id                             DemoWeb.UserController :update
            PUT     /users/:id                             DemoWeb.UserController :update
user_path   DELETE  /users/:id                             DemoWeb.UserController :delete
```

## マイグレーションを実行
作成されたマイグレーションを実行します。
```
mix ecto.migrate
```

## サーバー起動 & 動作確認
サーバー起動
```
mix phx.server
```

http://localhost:4000/users へ接続

これで簡単にCRUDが作成可能です。

## 参考
* <a href="https://www.wbotelhos.com/crud-in-5-minutes-with-phoenix-and-elixir" target="_blank" rel="nofollow noopener">CRUD in 5 Minutes with Phoenix and Elixir - Washington Botelho</a>
* <a href="https://hexdocs.pm/phoenix/1.6.13/Mix.Tasks.Phx.Gen.Html.html" target="_blank" rel="nofollow noopener">mix phx.gen.html — Phoenix v1.6.13</a>
