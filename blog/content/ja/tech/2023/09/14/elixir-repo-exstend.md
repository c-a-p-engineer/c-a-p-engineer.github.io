---
title: 【Elixir】Ecto.Repoを拡張してSoft Deleteされていないレコードだけを取得する方法
date: 2023-09-14T13:00:00+09:00
description: Elixirの`Ecto.Repo`を拡張して、Soft Delete（`deleted_at is nil`）されていないレコードだけを効率的に取得する方法について解説します。
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

# 【Elixir】Ecto.Repoを拡張してSoft Deleteされていないレコードだけを取得する方法
Elixirの`Ecto.Repo`を拡張して、Soft Delete（`deleted_at is nil`）されていないレコードだけを効率的に取得する方法について解説します。

## はじめに
Soft Deleteはデータベースのレコードを物理的には削除せず、`deleted_at`フィールドにタイムスタンプを設定することで削除されたとみなします。
この記事では、`Ecto.Repo`にカスタム関数を追加することで、このようなレコードを簡単に取得する方法を紹介します。

## 確認環境
* Elixir 1.14.2
* Phoenix 1.6.3

## 方法1: モジュール拡張で関数を追加
`Ecto.Repo`を使用するモジュールに直接カスタム関数を追加します。

```elixir
defmodule MyApp.Repo do
  use Ecto.Repo, otp_app: :my_app
  import Ecto.Query  # Ecto.Queryをインポート

  # Soft Deleteされていないレコードを取得するカスタム関数
  def get_active(queryable) do
    # deleted_atがnilのレコードだけをフィルタ
    query = from q in queryable, where: is_nil(q.deleted_at)
    # クエリを実行
    all(query)
  end
end
```

### 使用例

```elixir
# MyApp.ItemからSoft Deleteされていないレコードを取得
active_items = MyApp.Repo.get_active(MyApp.Item)
```

## 方法2: デリゲーションで関数を追加

別のモジュールで関数を定義し、`Repo`モジュールでデリゲートします。

### デリゲーションとは？
デリゲーション（委譲）とは、あるモジュールの関数を別のモジュールで利用できるようにするプログラミングテクニックです。Elixirでは、defdelegateマクロを使用して簡単にデリゲーションを実装できます。

このテクニックは、コードの再利用性を高めるだけでなく、モジュールの責任を明確に分けるのにも役立ちます。

* <a href="https://hexdocs.pm/elixir/1.12.3/Kernel.html#defdelegate/2" target="_blank" rel="nofollow noopener">defdelegate(funs, opts)</a>

デリゲーション元の関数を作成します。
```elixir
defmodule MyApp.CustomRepoFunctions do
  import Ecto.Query  # Ecto.Queryをインポート

  # Soft Deleteされていないレコードを取得するカスタム関数
  def get_active(queryable) do
    # deleted_atがnilのレコードだけをフィルタ
    query = from q in queryable, where: is_nil(q.deleted_at)
    # クエリを実行
    MyApp.Repo.all(query)
  end
end
```

デリゲートします。
```elixir
defmodule MyApp.Repo do
  use Ecto.Repo, otp_app: :my_app

  # MyApp.CustomRepoFunctionsの関数をデリゲート
  defdelegate get_active(queryable), to: MyApp.CustomRepoFunctions
end
```

### 使用例

```elixir
# MyApp.ItemからSoft Deleteされていないレコードを取得
active_items = MyApp.Repo.get_active(MyApp.Item)
```

## 方法3 モジュールの使用
一応モジュールが用意されているようなのでモジュールを入れたら可能なようです。
<a href="https://hexdocs.pm/ecto_soft_delete/api-reference.html" target="_blank" rel="nofollow noopener">ecto_soft_delete</a>

## まとめ
ElixirとEctoを使用して、`deleted_at is nil`のレコードだけを効率的に取得する方法はいくつかあります。
システムの方針に合わせて拡張性やメンテナンス性を考えて実装をしてください。
