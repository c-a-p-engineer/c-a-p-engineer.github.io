---
title: 【Elixir】MixプロジェクトでJasonを導入し、config.exsで使用する方法
date: 2024-07-20T00:00:00+09:00
description: ElixirプロジェクトでJSONエンコーディングとデコーディングを行うために、Jasonライブラリを導入し、無理やり`config.exs`で使用する方法について
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


# 【Elixir】MixプロジェクトでJasonを導入し、config.exsで使用する方法

ElixirプロジェクトでJSONエンコーディングとデコーディングを行うために、Jasonライブラリを導入し、無理やり`config.exs`で使用する方法について

## プロジェクトのセットアップ

まず、新しいMixプロジェクトを作成します。

```sh
mix new jason_example
cd jason_example
```

## Jasonライブラリの導入

`mix.exs`ファイルにJasonライブラリを依存関係として追加します。

```elixir
defp deps do
  [
    {:jason, "~> 1.2"}
  ]
end
```

その後、以下のコマンドを実行して依存関係を取得します。

```sh
mix deps.get
```

## config.exsでのJasonの使用

`config/config.exs`ファイルにJasonを使用してJSONデータを読み込むコードを追加します。

普通だったらこのように `import` したりすれば使用できるのですが `config.exs` などではエラーが出てきます。

```elixir
import Jason
```

ではどのように実行するかです。

### サンプルコード

プロジェクトのルートにある`lib/jason_example.ex`ファイルを編集し、`config.exs`で設定した値を読み込むサンプルコードを追加します。

```elixir:config/config.exs
import Config

# サンプルJSON文字列（実際には機密情報や環境変数から取得することが推奨されます）
app_secret = ~s({
  "api_key": "1234567890abcdef",
  "endpoint": "https://api.example.com",
  "timeout": 30
})

# JSONライブラリを動的に読み込み、デコード
app_config =
  try do
    # JSONライブラリのパスを追加
    Code.prepend_path("_build/#{Mix.env()}/lib/jason/ebin")

    # JSON文字列をデコード
    case Jason.decode(app_secret) do
      {:ok, decoded} ->
        IO.inspect(decoded)
        decoded

      {:error, reason} ->
        IO.puts("JSONのデコードに失敗しました: #{reason}")
        %{}
    end
  rescue
    e in Jason.DecodeError ->
      IO.puts("例外: 無効なJSON文字列です: #{e}")
      %{}
  catch
    kind, reason ->
      IO.puts("エラーが発生しました: #{kind} - #{reason}")
      %{}
  end

# デコードされたデータをConfigに設定
config :my_app, :app_config, app_config

```

### まとめ

このガイドでは、Elixir MixプロジェクトでJasonライブラリを導入し、`config.exs`でJSONデータを読み込んで設定として使用する方法を紹介しました。以下に重要なポイントをまとめます。

- `mix.exs`ファイルにJasonライブラリを依存関係として追加。
- `config.exs`でJasonを使用してJSONデータをデコードし、Configに設定。
- アプリケーションの開始時に設定されたJSONデータを読み込み、使用。

この方法を使用することで、Elixirプロジェクトで柔軟にJSONデータを扱うことができます。かなり無理矢理やっていますが苦肉の策です……
