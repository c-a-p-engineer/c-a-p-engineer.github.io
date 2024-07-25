---
title: 【Elixir】AWS RDSへの接続方法
date: 2024-07-26T02:20:00+09:00
description: Elixir で AWS RDSを使用する際にTLS接続を確保するためにサーバー証明書の検証が必要になることがあります。
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


# 【Elixir】AWS RDSへの接続方法

Elixir で AWS RDSを使用する際にTLS接続を確保するためにサーバー証明書の検証が必要になることがあります。Elixirプロジェクトで`aws_rds_castore`ライブラリを用いた証明書検証の方法を解説します。

## なぜ証明書検証が必要なのか

サーバー証明書の検証は、データの送受信が安全であることを保証します。不正なサーバーに接続するリスクを防ぎ、データの盗聴や改ざんを防ぐために必須の手順です。

## aws_rds_castoreライブラリの概要

`aws_rds_castore`は、AWS RDSのサーバー証明書を検証するためのElixir用ライブラリです。このライブラリを使用することで、接続の安全性を確保し、信頼できる接続を維持できます。

## 導入手順

ライブラリを導入します。

```elixir:mix.exs
defp deps do
  [
    {:aws_rds_castore, "~> 1.1"}
  ]
end
```

パッケージの取得

```sh
$ mix deps.get.
```

## 設定例

設定方法はとても簡単です。 `database_url` を `AwsRdsCAStore.ssl_opts/1` で変換して `ssl_opts` に設定するだけです。

```elixir:runtime.exs

database_url = "ecto://postgres:postgres@localhost/ecto_simple?ssl=true&pool_size=10"

# In runtime.exs:
config :my_app, MyApp.Repo,
  url: database_url,
  ssl: true,
  ssl_opts: AwsRdsCAStore.ssl_opts(database_url),
  pool_size: String.to_integer(System.get_env("POOL_SIZE") || "10"),
  socket_options: maybe_ipv6
```

以上の方法で AWS RDS への接続が可能です。

## 参考

- <a href="aws_rds_castore on Hex" target="_blank" rel="nofollow noopener">(https://hex.pm/packages/aws_rds_castore)</a>
