---
title: "【Elixir】PhoenixLiveSession 使用時にテストでエラーが出る対処方法"
date: 2023-04-08T01:00:00+09:00
description: "PhoenixLiveSession 使用時にテストする際、エラーが出てしまいます。今回はその対処方法をメモです。"
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

# 【Elixir】PhoenixLiveSession 使用時にテストでエラーが出る対処方法
PhoenixLiveSession 使用時にテストする際、エラーが出てしまいます。
今回はその対処方法をメモです。

## 環境
* Elixir 1.14.2
* Phoenix 1.6.3
* PhoenixLiveSession 0.1.3

## エラー
LiveViewSessionを使用した箇所で以下のエラーが発生しました。
```
** (KeyError) key :__sid__ not found in: %{"_csrf_token" => "XXXXXXXXXXXXXXX"}
    :erlang.map_get(:__sid__, %{"_csrf_token" => "XXXXXXXXXXXXXXX"})
```

## 原因
原因は `PhoenixLiveSession` 使用時に、セッションに `:__sid__` が入るのですがテスト時に入ってないことが原因でした。
他にも `:__opts__` が入っていないことが原因でした。

### 対処方法
対処方法は `PhoenixLiveSession` に必要なデータをセッションに入れることで可能です。
`test/support/conn_case.ex` の `tags` を編集します。
```test/support/conn_case.ex
  setup tags do
    pid = Ecto.Adapters.SQL.Sandbox.start_owner!(Demo.Repo, shared: not tags[:async])
    on_exit(fn -> Ecto.Adapters.SQL.Sandbox.stop_owner(pid) end)

    # セッション生成
    conn =
      Phoenix.ConnTest.build_conn()
      |> Plug.Test.init_test_session(%{})

    # PhoenixLiveSession
    conn =
      put_in(
        conn.private[:plug_session],
        Map.put(conn.private[:plug_session], :__sid__, "XXXXXXXXX")
      )

    opts =
      PhoenixLiveSession.init([])
      |> Keyword.put_new(:pub_sub, Demo.PubSub)

    conn =
      put_in(
        conn.private[:plug_session],
        Map.put(conn.private[:plug_session], :__opts__, opts)
      )

    {:ok, conn: conn}
  end
```

これで `PhoenixLiveSession` を使用したLiveViewにも対応できました。
