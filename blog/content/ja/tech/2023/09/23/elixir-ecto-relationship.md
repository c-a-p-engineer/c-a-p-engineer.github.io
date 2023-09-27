---
title: "【Elixir】Ecto で色々な関係の設定"
date: 2023-09-23T18:40:00+09:00
description: "Ecto の `preload` 機能に焦点を当て、その使い方を色々と解説します。"
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


# 【Elixir】Ecto で色々な関係の設定
Elixir の Ecto で色々な関連設定について詳しく解説します。
`has_one`, `has_many`, `belongs_to`, `through`オプションに焦点を当てます。

その他のオプションについても以下のページで確認できますのでご参考にどうぞ
<a href="https://hexdocs.pm/ecto/3.10.3/Ecto.Schema.html" target="_blank" rel="nofollow noopener">Ecto.Schema</a>

## 基本的な has_oneの使い方

<a href="https://hexdocs.pm/ecto/3.10.3/Ecto.Schema.html#has_one/3" target="_blank" rel="nofollow noopener">has_one/3</a>

```elixir
defmodule Post do
  use Ecto.Schema

  schema "posts" do
    has_one :permalink, Permalink
  end
end
```

### カラム名

- 外部キーは`Permalink`テーブルに作成されます。
- カラム名は`post_id`となります。

## カラム名のカスタマイズ

`foreign_key` を指定することで自分のテーブルのカラム名を指定できます。

```elixir
has_one :permalink, Permalink, foreign_key: :custom_post_id
```

## 相手先のIDの指定

`references` を指定することで自分のテーブルのカラム名を指定できます。

```elixir
has_one :permalink, Permalink, references: :custom_id, foreign_key: :post_id
```

## where オプションの使用

`where` を `has_one` する際に条件が付与されます。

```elixir
has_one :active_permalink, Permalink, where: [deleted_at: nil]
```

### where は他の関連でも使用可能

この`where`オプションは`has_one`だけでなく、`has_many`や`belongs_to`など、他の関連でも使用できます。

## through オプションの使用

<a href="https://hexdocs.pm/ecto/3.10.3/Ecto.Schema.html#has_many/3-has_many-has_one-through" target="_blank" rel="nofollow noopener">has_many/has_one :through </a>

```elixir
has_many :comments_authors, through: [:comments, :author]
```

この設定では、`Post`が`Comment`を経由して`Author`に関連していると定義されます。

## has_many と belongs_to の違い

### has_many

<a href="https://hexdocs.pm/ecto/3.10.3/Ecto.Schema.html#has_many/3" target="_blank" rel="nofollow noopener">has_many/3</a>

- 一対多（One-to-Many）の関連を表現。
- 親テーブルが子テーブルに対して複数のレコードを持つ。
- 親テーブル側で定義。

```elixir
# Postモデル
schema "posts" do
  has_many :comments, Comment
end
```

### belongs_to

<a href="https://hexdocs.pm/ecto/3.10.3/Ecto.Schema.html#belongs_to/3" target="_blank" rel="nofollow noopener">belongs_to/3</a>

- 多対一（Many-to-One）の関連を表現。
- 子テーブルが親テーブルに対して1つのレコードを持つ。
- 子テーブル側で定義。

```elixir
# Commentモデル
schema "comments" do
  belongs_to :post, Post
end
```

### 共通点と相違点

- **共通点**: 両者は一対多の関連を形成するため、一緒に使われる。
- **相違点**: `has_many`は"一対多"の"一"側で使われ、`belongs_to`は"多"側で使われる。

## まとめ

- `has_one`で基本的な一対一の関連を設定。
- `foreign_key:`で外部キーのカラム名をカスタマイズ。
- `references:`で相手先の特定のIDカラムを参照。
- `where`オプションで関連を条件付きで制御。
- `through`オプションで中間テーブルを経由した関連を設定。
- `has_many`と`belongs_to`の違いと使い方。

Ectoは非常に柔軟な設定が可能で、これらのオプションを駆使することで、さまざまな要件に対応できます。
