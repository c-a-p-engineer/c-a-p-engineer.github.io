---
title: "【Elixir】libclusterを使用して簡単にクラスタ化する"
date: 2023-05-20T20:00:00+09:00
description: "libclusterというElixirのライブラリを使用することで、簡単にクラスタ構成を作ることができます。"
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

# 【Elixir】libclusterを使用して簡単にクラスタ化する
libclusterというElixirのライブラリを使用することで、簡単にクラスタ構成を作ることができます。
Elixirとlibclusterを使用してクラスタ構成を作ってみます。
* <a href="https://hexdocs.pm/libcluster/3.3.2/readme.html" target="_blank" rel="nofollow noopener">libcluster — libcluster v3.3.2</a>

## 環境
* Elixir 1.14.2

## libcluster のインストール
まず、`libcluster` をプロジェクトに追加します。
`mix.exs` の `deps` 関数に以下のコードを追加してください。

```mix.exs
defp deps do
  [
    {:libcluster, "~> 3.3.2"}
  ]
end
```
次に、ターミナルで `mix deps.get` コマンドを実行し、依存関係を取得してください。

## 使い方
以下のように `application.ex` にサクッと組み込み事で使用できます。
そうすると自動的にクラスタを構成してくれます。

```lib/demo/application.ex
defmodule MyApp.App do
  use Application

  def start(_type, _args) do
    topologies = [
      example: [
        strategy: Cluster.Strategy.Epmd,
        config: [hosts: [:"a@127.0.0.1", :"b@127.0.0.1"]],
      ]
    ]
    children = [
      {Cluster.Supervisor, [topologies, [name: MyApp.ClusterSupervisor]]},
      # ..other children..
    ]
    Supervisor.start_link(children, strategy: :one_for_one, name: MyApp.Supervisor)
  end
end
```

## 起動
起動時にはいくつか注意が必要です。
ノード名（`--sname`）とCookie（`--cookie`）の指定をしなければいけません。
ノード名は各端末別にCookieはクラスタを構築したいノード内で統一してください。

```
elixir --sname a@127.0.0.1 --cookie Cookie -S mix
```

## 構成方法
クラスタの構成にはいくつか方法があります。

* `Cluster.Strategy.Epmd` ノード名を指定する方法
<a href="https://hexdocs.pm/libcluster/3.3.2/Cluster.Strategy.Epmd.html" target="_blank" rel="nofollow noopener">Cluster.Strategy.Epmd — libcluster v3.3.2</a>

* `Cluster.Strategy.DNSPoll` DNSを指定する方法
<a href="https://hexdocs.pm/libcluster/3.3.2/Cluster.Strategy.DNSPoll.html" target="_blank" rel="nofollow noopener">Cluster.Strategy.DNSPoll — libcluster v3.3.2</a>

* `Cluster.Strategy.Gossip` ネットワークを指定する方法
<a href="https://hexdocs.pm/libcluster/3.3.2/Cluster.Strategy.Gossip.html" target="_blank" rel="nofollow noopener">Cluster.Strategy.Gossip — libcluster v3.3.2</a>

他にも色々あるので自分の環境にあった方法を使用してください。

### 備考
私は `Gossip` を使用してクラスタを組んだのですが下記がサイトに載っている方法。
```config.exs
config :libcluster,
  topologies: [
    gossip_example: [
      strategy: Elixir.Cluster.Strategy.Gossip,
      config: [
        port: 45892,
        if_addr: "0.0.0.0",
        multicast_if: "192.168.1.1",
        multicast_addr: "233.252.1.32",
        multicast_ttl: 1,
        secret: "somepassword"]]]
```

これを以下のようにするとネットワーク内で自動的にクラスタを組んでくれました。
Docker内で構成する時、すごい簡単です。
```config.exs
config :libcluster,
  topologies: [
    gossip_example: [
      strategy: Elixir.Cluster.Strategy.Gossip
    ]
  ]
```

## デバッグ
`debug: true` を入れることでlibclusterのデバッグモードが動きログにデバッグが出力されるようになります。
```config.exs
config :libcluster,
  debug: true,
```

## 参考
* <a href="https://hexdocs.pm/libcluster/3.3.2/readme.html" target="_blank" rel="nofollow noopener">libcluster — libcluster v3.3.2</a>