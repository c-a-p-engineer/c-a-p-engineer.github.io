---
title: "【Elixir】カスタムバリデーションを作ってみる"
date: 2023-02-15T18:30:00+09:00
description: "Elixir 独自のバリデーション、カスタムバリデーションを作ってみる"
tags: []
categories: []
draft: false
legacySlug: elixir-custom-validation
image: "images/thumbnail/Official_Elixir_logo.png"
---

# 【Elixir】カスタムバリデーションを作ってみる
Elixir 独自のバリデーション、カスタムバリデーションを作ってみる

## カスタムバリデーション

バリデーション用ファイルの作成
`changeset` の `:username` が4文字未満もしくは15文字以上でエラーにしています。
```validators.ex
defmodule UserValidator do
  def validate_username(changeset) do
    # チェンジセットから :username を取得する
    username = get_field(changeset, :username)

    # 4文字未満 || 15文字以上でエラー
    if String.length(username) < 4 || String.length(username) > 15 do
      # エラー
      add_error(changeset, :username, "Username must be between 4 and 15 characters"),
    else
      # チェンジセットをそのまま返す
      changeset
    end
  end
end


```

Model側で実装します。
```user.ex {linenos=table,hl_lines=[14]}
defmodule User do
  use Ecto.Schema

  schema "users" do
    field :email, :string
    field :username, :string
    field :age, :integer
  end

  @doc false
  def changeset(user, params) do
    user
    |> cast(params, [:email, :username, :age])
    # カスタムバリデーションを実行する
    |> UserValidator.validate_username
    |> validate_format(:email, ~r/@/)
  end

end

```

このようにバリデーションが実装できます。
