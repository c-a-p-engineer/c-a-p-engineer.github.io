---
title: "【Elixir】Phoenixでカスタムセッションストアを作る"
date: 2023-05-26T01:40:00+09:00
description: "Elixir Phoenixで自作のセッションストアを作る方法についてやっていきます。"
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

# 【Elixir】Phoenixでカスタムセッションストアを作る
Elixir Phoenixで自作のセッションストアを作る方法についてやっていきます。
今回はセッション情報を各セッションID名のJSONに保存するというセッションストアを作っていきます。

## 環境
* Elixir 1.14.2
* Phoenix 1.6.3

## 必要な依存関係の解決
最初に、このチュートリアルで必要な依存関係を追加しましょう。
この例では、JSONのエンコードおよびデコードを行うためのライブラリとして`jason`を使用します。
以下のように`mix.exs`ファイルに依存関係を追加します。

<a href="https://hexdocs.pm/jason/1.4.0/readme.html" target="_blank" rel="nofollow noopener">Jason</a>

```mix.exs
defp deps do
  [
    {:jason, "~> 1.3"}
  ]
end
```

その後、以下のコマンドを実行して依存関係を取得します。

```shell
$ mix deps.get
```

## なぜ、セッションストアを自作するのか
通常、PhoenixではCookieやETSなど既存のセッションストアを使用しますが、場合によっては独自のストレージメカニズムを必要とすることもあります。
今回はそのようなケースに対応するため、`Plug.Session.Store` の実装を使用してカスタムセッションストアを作ります。
なお、今回はサンプルのためセッションデータはローカルのJSONファイルとして保存します。

## Plug.Session.Storeとは

`Plug.Session.Store` は `Plug.Session` が使用するストレージのインターフェイスです。以下の3つの関数を実装する必要があります。
* `get/2`: セッションデータを取得します。（<a href="https://hexdocs.pm/plug/Plug.Session.Store.html#c:get/3" target="_blank" rel="nofollow noopener">Plug.Session.Store.get/2</a>）
* `put/4`: 新規または既存のセッションデータを保存します。（<a href="https://hexdocs.pm/plug/Plug.Session.Store.html#c:put/4" target="_blank" rel="nofollow noopener">Plug.Session.Store.put/4</a>）
* `delete/2`: セッションデータを削除します。（<a href="https://hexdocs.pm/plug/Plug.Session.Store.html#c:delete/2" target="_blank" rel="nofollow noopener">Plug.Session.Store.delete/2</a>）

## 自作のセッションストアを作成する

では、実際に`MySessionStore`というモジュールを作成します。
これは`Plug.Session.Store`の`behaviour`を実装します。
ここでは、セッションデータが保存されるディレクトリのパスを定数として定義します。

```my_session_store.ex
defmodule MySessionStore do
  @moduledoc """
  自作のセッションストアモジュール

。
  """

  @session_dir "./"

  @behaviour Plug.Session.Store

  @impl true
  def init(_opts) do
    # オプションの初期化をここで行うことができます
  end

  @doc """
  セッションID(sid)を使ってセッションデータを取得します。
  sidはセッションを一意に識別するためのIDです。
  """
  @impl true
  def get(_conn, sid, _opts) do
    case File.read("#{@session_dir}/#{sid}.json") do
      {:ok, json} ->
        {sid, Jason.decode!(json)}

      {:error, _reason} ->
        {sid, %{}}
    end
  end

  @doc """
  新しいセッションを生成し、そのデータを保存します。
  新規セッションのID(sid)はランダムなバイト列をエンコードしたものです。
  """
  @impl true
  def put(_conn, nil, new_data, _opts) do
    sid = :crypto.strong_rand_bytes(16) |> Base.url_encode64()
    put(nil, sid, new_data, nil)

    sid
  end

  @doc """
  既存のセッションを更新し、そのデータを保存します。
  sidを元にJSONファイルを探し、新たなデータでそのファイルを更新します。
  """
  @impl true
  def put(_conn, sid, new_data, _opts) do
    File.write!("#{@session_dir}/#{sid}.json", Jason.encode!(new_data))

    sid
  end

  @doc """
  既存のセッションを削除します。
  sidに対応するJSONファイルを削除します。
  """
  @impl true
  def delete(_conn, sid, _opts) do
    File.rm!("#{@session_dir}/#{sid}.json")
    :ok
  end
end
```

## 自作のセッションストアを有効にする

これまで作成した自作のセッションストアを有効にするためには、Phoenixのエンドポイント設定を更新する必要があります。
具体的には、`lib/your_app_web/endpoint.ex` ファイル内の `plug Plug.Session` の行を次のように書き換えます。

```lib/your_app_web/endpoint.ex
plug Plug.Session,
  store: MySessionStore,
  key: "_your_app_key",
  signing_salt: "your_signing_salt"
```

ここで、`store:` には自作のセッションストアモジュール名を指定します。
また、`key:` と `signing_salt:` はセッションデータの署名に使用されるため、それぞれ適切な値を設定してください。

### まとめ
以上で、Phoenixで自作のセッションストアを作る方法について説明しました。この例では、シンプルなJSONファイルにデータを
保存していますが、要件に応じてMySQLやPostgreSQLなどのデータベースに保存することも可能です。

ただし、実際の運用においては、セッションデータを平文でファイルに保存することは、パフォーマンスとセキュリティの観点から適切ではないかもしれません。
この記事は主に教育的な目的のためのもので、実際のプロジェクトでは適切なセキュリティ対策を講じることが重要です。
