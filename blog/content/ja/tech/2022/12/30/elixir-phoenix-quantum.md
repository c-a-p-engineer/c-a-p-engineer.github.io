---
title: "【Elixir】Phoenix で Quantum を使用してプログラム定期実行する方法"
date: 2022-12-30T16:00:00+09:00
description: "Elixir Phoenix 環境で Quantum を使用してプログラム定期実行する方法"
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

# 【Elixir】Phoenix で Quantum を使用してプログラム定期実行する方法
Elixir Phoenix 環境で Quantum を使用してプログラム定期実行する方法

Quantum のドキュメントはこちら
* <a href="https://github.com/quantum-elixir/quantum-core" target="_blank" rel="nofollow noopener">quantum-elixir/quantum-core: Cron-like job scheduler for Elixir</a>
* <a href="https://hexdocs.pm/quantum/3.5.0/readme.html" target="_blank" rel="nofollow noopener">Quantum — Quantum v3.5.0</a>

## 環境
* Elixir 1.14.2
* Phoenix 1.6.3
* Quantum 3.5.0

## サンプル
GitHub を見つつ進めていきます。

### phoenixプロジェクト作成
DB不要のため `--no-ecto` を付けます。
```
mix phx.new demo --no-ecto
```

### 依存関係に追加
`mix.exs` に `quantum` を追加
```mix.exs {linenos=table,hl_lines=[3]}
  defp deps do
    [
      {:quantum, "~> 3.0"}
    ]
  end
```

追加した `quantum` を取得させる。
```
mix deps.get
```

### schedulerの作成
スケジューラーを作成します。
```lib/demo/scheduler.exs
defmodule Demo.Scheduler do
  use Quantum, otp_app: :demo
end
```


### Supervisorへの追加
`Supervisor` に `scheduler` を追加致します。
7行目のように `children` に `Demo.Scheduler` を追加します。
```lib/demo/application.ex {linenos=table,hl_lines=[6,7]}
defmodule Acme.Application do
  use Application

  def start(_type, _args) do
    children = [
      # This is the new line
      Demo.Scheduler
    ]

    opts = [strategy: :one_for_one, name: Demo.Supervisor]
    Supervisor.start_link(children, opts)
  end
end
```

### ジョブ設定
`config.exs` にジョブを設定します。
以下のようにすると毎分 `Hello QUANTUM!` と表示されます。
```config/config.exs
config :demo, Demo.Scheduler,
  jobs: [
    {"* * * * *", fn -> IO.puts("Hello QUANTUM!") end}
  ]
```

### 確認
Phoenixサーバーを起動します。
```
mix phx.server
```

起動後にコンソールに `Hello QUANTUM!` と毎分出てくれば成功です。

## 参考
* <a href="https://github.com/quantum-elixir/quantum-core" target="_blank" rel="nofollow noopener">quantum-elixir/quantum-core: Cron-like job scheduler for Elixir</a>
* <a href="https://hexdocs.pm/quantum/3.5.0/readme.html" target="_blank" rel="nofollow noopener">Quantum — Quantum v3.5.0</a>
