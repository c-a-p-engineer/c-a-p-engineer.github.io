---
title: "【Elixir】Ecto.Schema.embedded_schema を使ってリクエストを処理する方法"
date: 2023-03-21T12:40:00+09:00
description: "Elixir では changeset を渡して Ecto.Schema.embedded_schema を使って複雑なリクエストに対して処理する方法のメモ"
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

# 【Elixir】Ecto.Schema.embedded_schema を複雑な使ってリクエストに対してのリクエストを処理する方法のメモ
Elixir で LiveView に対する認証・認可を自作する

以下のドキュメントを参考にしています。
<a href="https://hexdocs.pm/ecto/3.9.4/Ecto.Schema.html#t:embedded_schema/0" target="_blank" rel="nofollow noopener">Ecto.Schema — Ecto v3.9.4 - HexDocs # embedded_schema</a>

## 環境
* Elixir 1.14.2
* Phoenix 1.6.3

## 【Elixir】Ecto.Schema.embedded_schema を使ってリクエストを処理する方法
Elixir で `changeset` を渡して `Ecto.Schema.embedded_schema` を使って複雑なリクエストに対して処理する方法のメモ。
僕は複数テーブルに対してのデータを取得して複数テーブルのデータする際に使用しました。

### Ecto.Schema.embedded_schema とは
Ectoスキーマをデータベーステーブルと関連付けずに定義ができます。
これは、構造化データを操作するためにEctoの機能を活用したいが、データベースに保存する必要はない場合に便利です。
<a href="https://hexdocs.pm/ecto/3.9.4/Ecto.Schema.html#t:embedded_schema/0" target="_blank" rel="nofollow noopener">Ecto.Schema — Ecto v3.9.4 - HexDocs # embedded_schema</a>


### 注意事項
PHPer の Elixir の初心者が Laravelのリクエストの用に別途処理を分けたいと思って作ったものです。
Elixir として正しいものかどうかはわかりません。

また今回のサンプルはだいぶ長くなってしまったので処理を短くしています。
そのまま使ってもエラーになる可能性がありますのでお気をつけください。

またテンプレート側の記載は省いております。

## 実装
まずはリクエスト処理用の Ecto スキーマを作成します。

### リクエスト用 Ecto 実装
リクエスト処理を行うためのEctoをまず実装します。
```src/lib/demo/requests/user_regist.ex
defmodule Demo.Requests.UserRegist do
  use Ecto.Schema
  import Ecto.Changeset

  embedded_schema do
    field :email, :string
    field :name, :string
    field :address, :string
  end

  @doc false
  def changeset(user_regist, attrs) do
    account
    # 変換
    |> cast(attrs, [
      :email,
      :name,
      :address
    ])
    # 必須チェック
    |> validate_required([
      :email,
      :name,
      :address
    ])
  end

  def to_user(user_regist) do
    Map.take(user_regist, [:email, :name])
  end

  def to_address(user_regist) do
    Map.take(user_regist, [:address])
  end
end

```

### Ecto 定義
データベースへの登録を行うためEctoを定義します。

User用
```lib/demo/models/user.ex
defmodule Demo.Models.User do
  use Ecto.Schema
  import Ecto.Changeset

  schema "users" do
    field :email, :string
    field :name, :string
    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:email, :name])
    |> validate_required([:email, :name])
  end
end
```

Address用
```lib/demo/models/address.ex
defmodule Demo.Models.Address do
  use Ecto.Schema
  import Ecto.Changeset

  schema "addresses" do
    field :address, :string
    timestamps()
  end

  @doc false
  def changeset(address, attrs) do
    address
    |> cast(attrs, [:address])
    |> validate_required([:address])
  end
end
```

### コントローラー
コントローラー側の実装を行ってみます。
`UserRegist` で `Ecto.Schema.embedded_schema` を使用しているのでそこでリクエストパラメータ用のバリデーションを行っています。

```src/lib/demo_web/controllers/user_controller.ex
defmodule DemoWeb.UserController do
  use DemoWeb, :controller

  alias Demo.Repo
  alias Demo.Requests.UserRegist
  alias Demo.Models.User
  alias Demo.Models.Address

  # ユーザ登録画面
  def new(conn, _params) do
    changeset = UserRegist.changeset(%UserRegist{}, %{})
    render(conn, "new.html", changeset: changeset)
  end

  # ユーザ登録処理
  def create(conn, %{"user" => user_params}) do

    changeset = UserRegist.changeset(%UserRegist{}, user_params)
    # バリデーションチェック
    if changeset.valid? do

      result =
        Repo.transaction(fn ->
          # ユーザ登録
          user = User.changeset(%User{}, UserRegist.to_user(user_params))
          {:ok, user} = Repo.insert(user)
          # アドレス登録
          address = UserRegist.to_address(user_params)
          # ユーザIDをアドレスに付与
          address = Map.put(address, :user_id, user.id)
          address = Address.changeset(%Address{}, address)
          {:ok, address} = Repo.insert(address)
          {:ok, user, address}
        end)

      {:ok, value} ->
        # 登録成功
        conn
        |> put_flash(:info, "User created successfully.")
        |> redirect(to: Routes.user_path(conn, :show, user))
      _ ->
         # エラー発生
        changeset = %{changeset | action: :create}
        conn
        |> put_flash(:error, "An error occurred.")
        |> render("new.html", changeset: changeset)
      end
    else
      # エラー発生
      changeset = %{changeset | action: :create}

      conn
      |> put_flash(:error, "An error occurred.")
      |> render("new.html", changeset: changeset)
    end
  end
end

```

これでデータベースへの登録とは別にリクエストのバリデーションのチェックが可能になります。

## 参考
* <a href="https://hexdocs.pm/ecto/3.9.4/Ecto.Schema.html#t:embedded_schema/0" target="_blank" rel="nofollow noopener">Ecto.Schema — Ecto v3.9.4 - HexDocs # embedded_schema</a>
