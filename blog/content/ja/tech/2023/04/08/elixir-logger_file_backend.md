---
title: "【Elixir】logger_file_backend を使用してログをファイルに出力する方法"
date: 2023-04-08T00:40:00+09:00
description: "Elixir で logger_file_backend を使用してログをファイルに出力する方法を紹介します。"
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

# 【Elixir】logger_file_backend を使用してログをファイルに出力する方法
Elixir で `logger_file_backend` を使用してログをファイルに出力する方法を紹介します。

## 環境
* Elixir 1.14.2

## logger_file_backend
Elixir では、標準で `Logger` モジュールが提供されており、これを利用して簡単にログを取得できます。
ただし、デフォルトでは標準出力にログが出力されるため、ファイルに出力するには `logger_file_backend` というライブラリを使うことで実現できます。

### logger_file_backend のインストール
まず、`logger_file_backend` をプロジェクトに追加します。
`mix.exs` の `deps` 関数に以下のコードを追加してください。

```mix.exs
defp deps do
  [
    {:logger_file_backend, "~> 0.0.10"}
  ]
end
```
次に、ターミナルで `mix deps.get` コマンドを実行し、依存関係を取得してください。

### 設定ファイルの編集
次に、ログ出力の設定を行います。
`config/config.exs` ファイルに以下の設定を追加してください。

```config/config.exs
# ロガーの設定
config :logger,
  backends: [{LoggerFileBackend, :info_log}, {LoggerFileBackend, :error_log}, :console]

# infoログの設定
config :logger, :info_log,
  level: :info,
  path: "log/info.log",
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# errorログの設定
config :logger, :error_log,
  level: :error,
  path: "log/error.log",
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]
```

この設定では、`log/info.log` に情報レベル（`:info`）のログが、`log/error.log` にエラーレベル（`:error`）のログがそれぞれ出力されるようになります。また、ログのフォーマットやメタデータも指定できます。

### ログの出力
設定が完了したら、あとは通常通り `Logger` モジュールを使用してログを出力できます。

たとえば、以下のように `Logger.info/2` や `Logger.error/2` を使ってログを出力できます。

```elixir
Logger.info("情報レベルのログです。")
Logger.error("エラーレベルのログです。")
```
これで、指定したファイルにログが出力されるようになります。

## 参考
* <a href="https://hexdocs.pm/logger_file_backend/0.0.13/readme.html" target="_blank" rel="nofollow noopener">Overview — logger_file_backend v0.0.13</a>