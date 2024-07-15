---
title: "【Elixir】Ecto で Preload の色々"
date: 2023-09-23T17:30:00+09:00
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

# 【Elixir】Ecto で Preload の色々
Ecto の `preload` 機能に焦点を当て、その使い方を色々と解説します。

<a href="https://hexdocs.pm/ecto/Ecto.Query.html#preload/3" target="_blank" rel="nofollow noopener">preload/3</a>


## 単一の関連付けを Preload
もっとも基本的な使い方です。ユーザーとそのプロフィールを一緒に取得する例を見てみましょう。

```elixir
# 単一の関連付けを preload する
query = from u in User, preload: [:profile]
users = Repo.all(query)
```

このコードは、`User` テーブルからすべてのユーザーを取得し、それぞれの `profile` も一緒に取得します。

## 複数の関連付けを Preload

複数の関連付けも一度に取得できます。たとえば、ユーザーとそのプロフィール、投稿を一緒に取得する場合：

```elixir
# 複数の関連付けを preload する
query = from u in User, preload: [:profile, :posts]
users = Repo.all(query)
```

## ネストされた関連付けを Preload

関連付けがネストしている場合も、一度のクエリで取得できます。

```elixir
# ネストされた関連付けを preload する
query = from u in User, preload: [posts: :comments]
users = Repo.all(query)
```

この例では、ユーザーの投稿と、その投稿に対するコメントを一緒に取得します。

## 動的な Preload

条件に応じて動的に `preload` を行いたい場合もあります。

```elixir
# 条件に応じて動的に preload する
dynamic_preload = if some_condition, do: [:profile], else: []
query = from u in User, preload: ^dynamic_preload
users = Repo.all(query)
```

## Repo.preload/2 を使用する

すでにに取得したデータに対して後から `preload` することも可能です。

```elixir
# 既に取得したデータに対して後から preload する
users = Repo.all(User)
users = Repo.preload(users, [:profile, :posts])
```

## カスタムクエリで Preload

特定の条件にマッチする関連付けだけを `preload` したい場合は、カスタムクエリを使用できます。

```elixir
# カスタムクエリを使用して preload する
custom_query = from p in Post, where: p.published == true
query = from u in User, preload: [posts: ^custom_query]
users = Repo.all(query)
```

この例では、公開されている `Post` のみを `preload` しています。

## まとめ
Ecto の `preload` 機能は非常に強力で、多くのケースでデータベースの効率的な操作が可能です。
この記事で紹介したテクニックをマスターすれば、Ecto を更に効果的に使えるようになるでしょう。
以上、Elixir の Ecto での `preload` の使い方についてでした。是非とも実践に活かしてください。
