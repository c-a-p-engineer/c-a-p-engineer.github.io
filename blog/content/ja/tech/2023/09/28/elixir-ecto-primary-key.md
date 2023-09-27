---
title: "【Elixir】Ectoのプライマリーキーについて"
date: 2023-09-28T02:30:00+09:00
description: "今回はEctoでプライマリーキーを扱うさまざまな方法についてのまとめです。"
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

# 【Elixir】Ectoのプライマリーキーについて
今回はEctoでプライマリーキーを扱うさまざまな方法についてのまとめです。

1. デフォルトのプライマリーキー
2. カスタムプライマリーキー
3. プライマリーキーなし
4. 複合プライマリーキー

## デフォルトのプライマリーキー
デフォルトでは、Ectoは各スキーマに`：id`フィールドをプライマリーキーとして作成します。これは自動インクリメントの整数です。

```elixir
defmodule MyApp.User do
  use Ecto.Schema
  # デフォルトでは、:idが自動的にプライマリーキーとして追加されます
  schema "users" do
    field :name, :string
  end
end
```

## カスタムプライマリーキー
`@primary_key` 属性を使用してカスタムプライマリーキーを指定できます。

```elixir
defmodule MyApp.User do
  use Ecto.Schema
  # :uuidが自動生成され、プライマリーキーとして使用されます
  @primary_key {:uuid, :binary_id, autogenerate: true}
  schema "users" do
    field :name, :string
  end
end
```

## プライマリーキーなし
場合によっては、プライマリーキーがまったく不要な場合もあります。`@primary_key false`を使用して無効にできます。

```elixir
defmodule MyApp.Log do
  use Ecto.Schema
  # プライマリーキーは設定されません
  @primary_key false
  schema "logs" do
    field :message, :string
  end
end
```

## 複合プライマリーキー
Ectoは複合プライマリーキーもサポートしています。複数のフィールドをプライマリーキーとして指定できます。

```elixir
defmodule MyApp.OrderItem do
  use Ecto.Schema
  # order_idとproduct_idが複合プライマリーキーとして設定されます
  @primary_key false
  schema "order_items" do
    field :order_id, :integer, primary_key: true
    field :product_id, :integer, primary_key: true
    field :quantity, :integer
  end
end
```

## 備考
- **キーの自動生成**: Ectoは、整数だけでなくUUIDのキーも自動生成できます。
- **外部キー**: スキーマ間の関係を定義する際、参照先のスキーマのプライマリーキーでなくてもよい外部キーを指定できます。

公式ドキュメントによると、`@primary_key`と`@foreign_key_type`もスキーマ内で設定でき、これによりデフォルトのプライマリーキーと外部キーの型を変更できます。

<a href="https://hexdocs.pm/ecto/3.10.3/Ecto.Schema.html" target="_blank" rel="nofollow noopener">Ecto.Schema</a>
