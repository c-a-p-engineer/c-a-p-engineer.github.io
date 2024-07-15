---
title: "【Elixir】キャッシュを簡単に扱う Cachex の紹介"
date: 2023-03-24T01:00:00+09:00
description: "Elixir では、Cachex という強力なキャッシュライブラリを使用することで、簡単にキャッシュを扱うことができます。この記事では、Cachex のインストール方法と基本的な使い方を紹介します。"
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

# 【Elixir】キャッシュを簡単に扱う方法: Cachex の紹介
Elixir では、Cachex という強力なキャッシュライブラリを使用することで、簡単にキャッシュを扱うことができます。
この記事では、Cachex のインストール方法と基本的な使い方を紹介します。

以下のドキュメントを参考にしています。
<a href="https://hexdocs.pm/cachex/3.6.0/Cachex.html" target="_blank" rel="nofollow noopener">Cachex — Cachex v3.6.0</a>

## 環境
* Elixir 1.14.2
* Cachex 3.6

## Cachex のインストール方法

Cachex をプロジェクトに追加するには、`mix.exs` ファイルの `deps` 関数に Cachex を追加します。

```mix.exs
def deps do
  [
    {:cachex, "~> 3.6"}
  ]
end
```

その後、ターミナルで `mix deps.get` コマンドを実行して、Cachex をインストールします。

## 使用方法

### キャッシュ定義
アプリケーションの supervision tree に Cachex キャッシュプロセスを追加します。
```/lib/demo/application.ex
defmodule Demo.Application do
  use Application

  def start(_type, _args) do
    children = [
      {Cachex, name: :my_cache}
    ]

    opts = [strategy: :one_for_one, name: Demo.Supervisor]
    Supervisor.start_link(children, opts)
  end
end
```

複数のキャッシュを扱いたい時は `{Cachex, name: :my_cache2}` など新たに追加することで可能です。

### キャッシュ追加
キャッシュにデータを追加する。
* <a href="https://hexdocs.pm/cachex/3.6.0/Cachex.html#put/4" target="_blank" rel="nofollow noopener">put/4</a>

```ex
# キャッシュ追加（キャッシュ生存時間 5秒
Cachex.put(:my_cache, "key", "value", ttl: :timer.seconds(5))
```

### キャッシュ取得
キャッシュからデータを取得する。
* <a href="https://hexdocs.pm/cachex/3.6.0/Cachex.html#get/3" target="_blank" rel="nofollow noopener">get/3</a>

```ex
case Cachex.get(:my_cache, key) do
  {:ok, value} -> value # キャッシュあり
  :not_found -> nil # キャッシュなし
end
```

### キャッシュ削除
キャッシュを削除します
* <a href="https://hexdocs.pm/cachex/3.6.0/Cachex.html#del/3" target="_blank" rel="nofollow noopener">del/3</a>
```ex
Cachex.del(:my_cache, "key")
```

### キャッシュにデータがない場合のデフォルト動作を定義
キャッシュにデータがない場合の動作を定義しておけます。
* <a href="https://hexdocs.pm/cachex/3.6.0/Cachex.html#fetch/4" target="_blank" rel="nofollow noopener">fetch/4</a>

```ex
result = Cachex.fetch(:my_cache, "key", fn key ->
    # データが無い場合にデータを返す
    result = %{key => "test"}

    #24時間有効
    {:commit, result, ttl: :timer.hours(24)}
  end)

case result do
  {:commit, value, opt} ->
    # キャッシュが登録

  {:ok, value} ->
    # キャッシュが存在

  true ->
    # その他
end
```

`:commit` でキャッシュデータを入れて返します。
`:ignore` を指定すると値を入れません。


### 複数のCacheを使う
複数のキャッシュストアを設定する際は以下のようにしてください。
単純にコピペすると同じIDで子プロセスを作るためエラーが出ます。

```/lib/demo/application.ex
    children = [

      # キャッシュ1
      Supervisor.child_spec({Cachex, name: :cache_1}, id: :cache_1),
      # キャッシュ2
      Supervisor.child_spec({Cachex, name: :cache_1}, id: :cache_2)
    ]

```

## 参考
* <a href="https://hexdocs.pm/cachex/3.6.0/Cachex.html" target="_blank" rel="nofollow noopener">Cachex — Cachex v3.6.0</a>
* <a href="https://github.com/whitfin/cachex" target="_blank" rel="nofollow noopener">whitfin/cachex: A powerful caching library for Elixir with support for transactions, fallbacks and expirations</a>
