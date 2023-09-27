---
title: "【Elixir】EctoクエリをSQLにして取得する方法"
date: 2023-09-28T02:40:00+09:00
description: "ElixirでEctoを使用している際に、EctoクエリからSQLを取得する方法メモ。"
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

# 【Elixir】EctoクエリをSQLにして取得する方法
ElixirでEctoを使用している際に、EctoクエリからSQLを取得する方法メモ。
このテクニックはデバッグやパフォーマンスチューニングに非常に役立ちます。

## サンプルコード
簡単なサンプルコードです。
必要であれば関数化してデバッグに役立ててください。

```elixir
# Ectoクエリ
query = from u in "users", where: u.id == 1
# EctoクエリからSQLとパラメータを取得
{sql, params} = Ecto.Adapters.SQL.to_sql(:all, MyApp.Repo, query)

# SQL出力
IO.puts("SQL: #{sql}")
# パラメータを出力
IO.puts("Params: #{Enum.join(params, ", ")}")
```

## まとめ
この方法を使用すると、ElixirとEctoで実行された最後のSQLクエリを簡単に取得できます。
これはデバッグやパフォーマンスの最適化に非常に役立つテクニックです。

<a href="https://hexdocs.pm/ecto/Ecto.html" target="_blank" rel="nofollow noopener">Ecto</a>
