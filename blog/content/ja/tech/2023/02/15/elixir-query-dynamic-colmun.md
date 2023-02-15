---
title: "【Elixir】DB検索時などの際に動的に列を指定する方法"
date: 2023-02-15T18:30:00+09:00
description: "Elixir DBの検索を行う際など汎用的に列を変数化したりして検索したい時があります。その実装方法のメモです。"
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

# 【Elixir】DB検索時などの際に動的に列を指定する方法
Elixir DBの検索を行う際など汎用的に列を変数化したりして検索したい時があります。その実装方法のメモです。

## 実装
`Ecto.Query.API` の `filed/2` の関数を使用します。
<a href="https://hexdocs.pm/ecto/3.9.4/Ecto.Query.API.html#field/2" target="_blank" rel="nofollow noopener">Ecto.Query.API — Ecto v3.9.4 #field/2</a>
この関数は指定されたテーブルの列をAtom型で渡すと、その列を使用してくれます。

```ex {linenos=table,hl_lines=[4]}
import Ecto.Query
def search_by_column(table, column, value) do
  query = from(t in table,
    where: field(t, ^column) == ^value
  )
  Repo.all(query)
end

search_by_column(User, :name, "Alice")
```

## 参考
* <a href="https://hexdocs.pm/ecto/3.9.4/Ecto.Query.API.html#field/2" target="_blank" rel="nofollow noopener">Ecto.Query.API — Ecto v3.9.4 #field/2</a>
* <a href="https://elixirforum.com/t/dynamic-fields-in-ecto-queries/1593/2" target="_blank" rel="nofollow noopener">Dynamic fields in Ecto queries - Questions / Help - Elixir Programming Language Forum</a>

