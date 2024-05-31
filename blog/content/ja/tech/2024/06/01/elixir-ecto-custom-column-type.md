---
title: 【Elixir】Ectoでのカスタム列の定義方法
date: 2024-06-01T03:30:00+09:00
description: Elixir の Ecto　でカスタム列を定義する方法について解説します。特定の要件に応じたデータのキャスト、ロード、ダンプを行うことができます。
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


# 【Elixir】Ectoでのカスタム列の定義方法

Elixir の Ecto でカスタム列を定義する方法について解説します。特定の要件に応じたデータのキャスト、ロード、ダンプを行うことができます。

## Ectoのカスタムタイプ

Ectoのカスタムタイプは、Ectoスキーマで扱うデータ型を拡張するためのものです。デフォルトで提供される型に加え、独自の型を定義することで、特定のバリデーションや変換を適用できます。

- <a href="https://hexdocs.pm/ecto/Ecto.Type.html" target="_blank" rel="nofollow noopener">Ecto.Type</a>

## カスタムタイプの実装方法

カスタムタイプを実装するには、`Ecto.Type`モジュールの振る舞いを定義します。具体的には以下の関数を実装する必要があります。

- `type/0`: データベースに格納する型を返す
- `cast/1`: 外部入力を内部の型に変換する
- `load/1`: データベースから読み込んだ値を内部の型に変換する
- `dump/1`: 内部の型をデータベースに格納する形式に変換する

## サンプルコードの解説

以下に、正規化されたDecimal値を扱うカスタムタイプのサンプルコードを示します。

```elixir
defmodule MyApp.Fields.RoundedDecimal do
  @moduledoc """
  少数第3位以下を四捨五入するカスタムEctoタイプ。
  """

  @behaviour Ecto.Type

  @doc """
  データベースで使用する基礎的な型を返します。
  """
  def type, do: :decimal

  @doc """
  与えられた値をキャストして少数第3位以下を四捨五入します。
  """
  def cast(value) when is_binary(value) do
    case Decimal.parse(value) do
      {:ok, decimal} -> {:ok, Decimal.round(decimal, 2)}
      _ -> :error
    end
  end

  def cast(%Decimal{} = value), do: {:ok, Decimal.round(value, 2)}
  def cast(_), do: :error

  @doc """
  データベースから読み込んだ値を少数第3位以下を四捨五入して返します。
  """
  def load(value), do: {:ok, Decimal.round(value, 2)}

  @doc """
  データベースに保存する前に少数第3位以下を四捨五入します。
  """
  def dump(%Decimal{} = value), do: {:ok, Decimal.round(value, 2)}
  def dump(_), do: :error
end

```

### 解説

- `@use Ecto.Type`: このモジュールが`Ecto.Type`の振る舞いを実装していることを示します。
- `type/0`: データベースで使用する基本型を返します。この場合は`:decimal`です。
- `cast/1`: 与えられた値をキャストして少数第3位以下を四捨五入します。
- `load/1`: データベースから読み込んだ値を少数第3位以下を四捨五入して返します。
- `dump/1`は、データベースに保存する前に少数第3位以下を四捨五入します。

## 使用例

実際に `RoundedDecimal` カスタムタイプを使用してデータベースに値を保存し、読み込む際に少数第3位以下を四捨五入します。

### スキーマ定義

```elixir
defmodule MyApp.Product do
  use Ecto.Schema
  import Ecto.Changeset

  schema "products" do
    field :price, MyApp.Fields.RoundedDecimal
    timestamps()
  end

  @doc false
  def changeset(product, attrs) do
    product
    |> cast(attrs, [:price])
    |> validate_required([:price])
  end
end
```

### 使用例

```elixir
# 値をキャストして少数第3位以下を四捨五入
changeset = MyApp.Product.changeset(%MyApp.Product{}, %{price: "123.4567"})
IO.inspect(changeset) # 123.46

# 値をデータベースに保存
{:ok, product} = Repo.insert(changeset)

# 値をデータベースから読み込み
{:ok, loaded_product} = Repo.get(MyApp.Product, product.id)
IO.inspect(loaded_product.price) # 123.46
```

## まとめ

Ectoでカスタムタイプを定義することで、データベースとのやり取りにおけるデータ変換やバリデーションを柔軟に行うことができます。
今回紹介したサンプルコードを参考にして、独自の要件に応じたカスタムタイプを実装してみてください。

## 参考

- <a href="https://hexdocs.pm/ecto/Ecto.Type.html" target="_blank" rel="nofollow noopener">Ecto.Type</a>
