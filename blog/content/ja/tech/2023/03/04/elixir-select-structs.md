---
title: "【Elixir】データ取得時に複数のChangesetを返すようにする"
date: 2023-03-04T16:00:00+09:00
description: "Elixir でRepoを使用したデータ取得時に複数のChangesetを返すようにする方法"
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

# 【Elixir】データ取得時に複数のChangesetを返すようにする
Elixir でRepoを使用したデータ取得時に複数のChangesetを返すようにする方法。

## 環境
* Elixir 1.14.2

## 通常通りにJOINしてデータを取得する
JOINして複数のテーブルからデータを取得します。
```ex
query =
  from(
    user in Demo.Models.User,
    join: post in Demo.Models.Post,
    on: user.id == post.user_id
  )

IO.inspect(Repo.all(query))
```

実行すると `users` テーブルのデータしか取得していません。
これでは困ります。
```ex
[
  %Demo.Models.Users{
    __meta__: #Ecto.Schema.Metadata<:loaded, "users">,
    id: 1,
    name: "demo1"
  },
  %Demo.Models.Users{
    __meta__: #Ecto.Schema.Metadata<:loaded, "users">,
    id: 2,
    name: "demo2"
  },
]
```

## 複数のchangesetを返却させる
```ex
query =
  from(
    user in Demo.Models.User,
    join: post in Demo.Models.Post,
    on: user.id == post.user_id,
    select: %{
      user: user,
      post: post
    }
  )

IO.inspect(Repo.all(query))
```

```ex
[
  %{
    user: %Demo.Models.Users{
      __meta__: #Ecto.Schema.Metadata<:loaded, "users">,
      id: 1,
      name: "demo1"
    },
    post: %Demo.Models.Post{
      __meta__: #Ecto.Schema.Metadata<:loaded, "posts">,
      id: 1,
      title: "タイトル1",
      body: "本文1",
    }
  },
  %{
    user: %Demo.Models.Users{
      __meta__: #Ecto.Schema.Metadata<:loaded, "users">,
      id: 1,
      name: "demo1"
    },
    post: %Demo.Models.Post{
      __meta__: #Ecto.Schema.Metadata<:loaded, "posts">,
      id: 1,
      title: "タイトル2",
      body: "本文2",
    }
  },
]
```

これで扱いやすい形にして受け取ることができます。