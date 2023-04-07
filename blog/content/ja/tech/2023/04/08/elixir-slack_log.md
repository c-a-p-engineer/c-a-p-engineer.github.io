---
title: "【Elixir】SlackLog を使って Slack にログを送る方法"
date: 2023-04-08T00:50:00+09:00
description: "Elixir で開発されたアプリケーションからSlackにログを送信する方法を紹介します。"
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

# 【Elixir】LiveView でパスワードが消えてしまう現象の解決方法
Elixir で開発されたアプリケーションからSlackにログを送信する方法を紹介します。

## 環境
* Elixir 1.14.2

## SlackLog
SlackLog を入れることにより開発チームはSlackでアプリケーションのログをリアルタイムで確認でき、問題の検出や解決がスムーズになります。

### SlackLog のインストール
まず、`slack_log` をプロジェクトに追加します。
`mix.exs` の `deps` 関数に以下のコードを追加してください。

```mix.exs
defp deps do
  [
    {:slack_log, "~> 0.1.0"}
  ]
end
```
次に、ターミナルで `mix deps.get` コマンドを実行し、依存関係を取得してください。

### 設定ファイルの編集
次に、ログ出力の設定を行います。
`config/config.exs` ファイルに以下の設定を追加してください。

```config/config.exs
# ロガー設定
config :logger,
    backends: [{SlackLog, :error_log}]
    
# Slackログ設定
config :logger, :error_log,
    slack_url: "https://url_for_slack_hook",　# Slack Webhook URL
    level: :error, # Slack Send Log Level
    metadata: [:file, :line, :function]

# 各ログレベルのヘッダー設定
config :slack_log, :headers,
  emergency: ":skull: New Emergency!!!",
  alert: ":skull: New Alert!!!",
  critical: ":x: New Critical Error!!!",
  error: ":x: New Error",
  warning: ":x: New Warning",
  notice: ":information_source: New Notice",
  info: ":information_source: New Info",
  debug: ":information_source: New Debug Message"
```

### ログの通知
設定が完了したら、あとは通常通り `Logger` モジュールを使用してSlackへ通知されます。

```elixir
Logger.error("エラーレベルのログです。")
```

これで、Slackに通知されます。

## 参考
* <a href="https://hexdocs.pm/slack_log/0.1.2/readme.html" target="_blank" rel="nofollow noopener">SlackLog — slack_log v0.1.2</a>