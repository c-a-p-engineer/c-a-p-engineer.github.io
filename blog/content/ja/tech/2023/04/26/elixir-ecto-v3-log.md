---
title: "【Elixir】Ecto V3以上でTelemetryを使ってSQLログを出力する方法"
date: 2023-04-26T12:30:00+09:00
description: "ElixirのEcto V3以上でTelemetryを使用してSQLログを出力する方法について説明します。"
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

# 【Elixir】Ecto V3以上でTelemetryを使ってSQLログを出力する方法
ElixirのEcto V3以上でTelemetryを使用してSQLログを出力する方法について説明します。
Telemetryは、ErlangおよびElixirアプリケーションのメトリック、トレース、およびログを収集するためのライブラリです。
これにより、アプリケーションのパフォーマンスを監視し、問題の特定やデバッグが容易になります。

## 環境
* Elixir 1.14.2
* Ecto 3.9.4

## telemetry のインストール
まず、`telemetry` と `telemetry_poller` をプロジェクトの依存関係に追加してください。
これらは、Telemetryイベントを収集し、リアルタイムでログ出力を可能にします。
`mix.exs` ファイル内の `deps` 関数に次のように追加します。

```mix.exs
  defp deps do
    [
      {:telemetry, "~> 1.0"},
      {:telemetry_poller, "~> 1.0"},
      # 他の依存関係
    ]
  end
```

追記が完了したら依存関係をインストール & コンパイルします。
```
$ mix deps.get
$ mix deps.compile
```

## ログモジュールを作成
Telemetryイベントハンドラを設定します。
プロジェクト内の任意のファイル（例えば `lib/my_app/telemetry.ex`）にTelemetryハンドラを作成してください。

```lib/my_app/telemetry.ex
defmodule MyApp.Telemetry do
  require Logger

  def handle_event([:my_app, :repo, :query], measurements, metadata, _config) do
    # ログにメッセージを出力
    query = metadata[:query]
    source = metadata[:source]
    result = metadata[:result]
    duration = measurements[:duration]

    Logger.info("[#{source}] #{query} - #{duration} ms - result: #{result}")
  end
end
```

## イベントの設定
`lib/my_app/application.ex` ファイル内の `start/2` 関数内で、次のようにハンドラをアタッチします。

```lib/my_app/application.ex
def start(_type, _args) do
  # Telemetryハンドラをアタッチ
  :ok = :telemetry.attach("my-app-query-logger", [:my_app, :repo, :query], &MyApp.Telemetry.handle_event/4, nil)

  # その他のアプリケーション設定
end
```

これで、アプリケーションがTelemetryを使用してSQLログを出力するように設定されました。
アプリケーションを実行すると、SQLクエリとその実行時間がログに表示されます。

## 参考
* <a href="https://stackoverflow.com/questions/56601417/elixir-phoenix-ecto-how-to-customize-sql-query-log-format" target="_blank" rel="nofollow noopener">logging - Elixir / Phoenix / Ecto: How to customize SQL query log format? - Stack Overflow</a>
* <a href="https://hexdocs.pm/ecto/3.9.4/Ecto.Repo.html#module-telemetry-events" target="_blank" rel="nofollow noopener">Ecto.Repo — Ecto v3.9.4</a>