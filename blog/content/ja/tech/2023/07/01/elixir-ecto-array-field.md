---
title: "【Elixir】Ectoでの配列フィールドの定義とバリデーション方法"
date: 2023-07-01T00:45:00+09:00
description: "ElixirのEctoを使って、配列フィールドの定義とバリデーション方法についてやっていきます。"
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

# 【Elixir】Ectoでの配列フィールドの定義とバリデーション方法
ElixirのEctoを使って、配列フィールドの定義とバリデーション方法についてやっていきます。

PostgreSQLの場合は配列方があるので使用するらしいです。
僕の場合は画面からのバリデーションチェックに使用する目的で使用しています。

## 確認環境
* Elixir 1.14.2

## 配列フィールドの定義
まずは配列フィールドの定義方法から見ていきましょう。
Ectoではschemaに配列フィールドを組み込むことが可能です。

以下がその基本的な方法です。

```elixir
defmodule SampleApp.SampleSchema do
  use Ecto.Schema

  schema "sample_table" do
    field :sample_field, {:array, :string} # これは文字列の配列を表しています

    timestamps()
  end
end
```

上記のコードでは、`:sample_field`という名前のフィールドが、文字列の配列として定義されています。
配列の要素のタイプを変更する場合は、`:string`を適切な型に変更します。たとえば、整数の配列が必要な場合は、`:integer`を使用します。

また、マイグレーションで配列フィールドを追加する場合は以下のようにします。
```elixir
defmodule SampleApp.Repo.Migrations.AddSampleField do
  use Ecto.Migration

  def change do
    alter table(:sample_table) do
      add :sample_field, {:array, :string}
    end
  end
end
```

ここでも、必要に応じて`:string`を適切な型に置き換えてください。

## 配列フィールドのバリデーション

次に、配列フィールドに対するバリデーション方法について見ていきましょう。Ectoでは、`Ecto.Changeset`モジュールを使用してデータのバリデーションを行います。
配列に対するバリデーションはカスタムバリデーション関数を作成することで実現できます。

たとえば、配列が一定の長さ以上であること、また配列内の各要素が一定の長さ以上であることを確認するバリデーションは以下のように書くことができます。

```elixir
defmodule SampleApp.SampleSchema do
  use Ecto.Schema
  import Ecto.Changeset

  schema "sample_table" do
    field :sample_field, {:array, :string}

    timestamps()
  end

  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:sample_field])
    |> validate_length(:sample_field, min: 1)  # 例：配列の長さが1以上であることを確認
    |> validate_sample_field()
  end

  # カスタムバリデーション関数
  defp validate_sample_field(changeset) do
    sample_field = get_field(changeset, :sample_field)

    # 例：配列内の各要素が一定の長さ以上であることを確認
    if Enum.all?(sample_field, &(&1 |> String.length() >= 1)) do
      changeset
    else
      add_error(changeset, :sample_field, "Each element in the array must be at least 1 character long.")
    end
  end
end
```

以上で、ElixirのEctoを使った配列フィールドの定義とバリデーション方法の基本的な説明が終わりです。
配列の利用とそのバリデーションは、さまざまなデータの表現と検証に役立ちますので、ぜひ上手く活用してみてください。

## 参考
* <a href="https://hexdocs.pm/ecto/3.10.2/Ecto.Schema.html#module-primitive-types" target="_blank" rel="nofollow noopener">Ecto.Schema Primitive types</a>