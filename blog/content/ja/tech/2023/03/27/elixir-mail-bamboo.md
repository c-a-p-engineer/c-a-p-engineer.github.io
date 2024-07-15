---
title: "【Elixir】Bambooを使って簡単にメール送信する方法"
date: 2023-03-27T18:20:00+09:00
description: "Elixir で Bamboo を使って簡単にメール送信する方法"
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

# 【Elixir】Bambooを使って簡単にメール送信する方法
Elixir で `Bamboo` を使って簡単にメール送信する方法。

メール送信を行う `Bamboo` のドキュメントはこちらです。
* <a href="https://hexdocs.pm/bamboo/2.3.0/readme.html" target="_blank" rel="nofollow noopener">Bamboo — bamboo v2.3.0</a>
* <a href="https://github.com/thoughtbot/bamboo" target="_blank" rel="nofollow noopener">thoughtbot/bamboo</a>

`Bamboo` はさまざまなアダプターが用意されていていますが、今回はSMTPでの送信方法のサンプルをご紹介します。

## 環境
* Elixir 1.14.2
* Bamboo 2.2.0
* Bamboo SMTP 4.2.2

## Bamboo のインストール方法
Bamboo をプロジェクトに追加するには、`mix.exs` ファイルの `deps` 関数に Bamboo を追加します。

```mix.exs
def deps do
  [
      {:bamboo, "~> 2.2.0"},
      {:bamboo_smtp, "~> 4.2.2"}
  ]
end
```

その後、ターミナルで `mix deps.get` コマンドを実行して、`Bamboo` をインストールします。

## 使用方法

### 設定
SMTPのメール送信設定を行います。
```config/config.exs
# Mail Setting
config :demo, Demo.Mailer,
  adapter: Bamboo.SMTPAdapter,
  server: "smtp.example.com",
  port: 587,
  username: "your_username",
  password: "your_password",
  tls: :if_available,
  ssl: false,
  retries: 1
```

僕はローカルで `mailhog` を使っているので `dev.exs` に以下のような設定を入れております。
（`mailhog` のポートは `1025`
```config/dev.exs
config :demo, Demo.Mailer,
  adapter: Bamboo.SMTPAdapter,
  server: "mailhog",
  port: 1025,
  tls: :none
```

### モジュールの作成
メーラーモジュールを作成します。
```lib/mailer.ex
defmodule Demo.Mailer do
  use Bamboo.Mailer, otp_app: :demo
end
```

### メール作成関数の作成
メール作成するための関数を定義します。
```lib/demo/email.ex
defmodule Demo.Email do
  import Bamboo.Email

  def welcome_email(to_email) do
    new_email()
    |> to(to_email)
    |> from("from@example.com")
    |> subject("Welcome to MyApp!")
    |> text_body("Hello! Thanks for joining MyApp.")
    |> html_body("<strong>Hello!</strong> Thanks for joining MyApp.")
  end
end
```

### メール送信実行
以下のコードでメール送信が可能です。
```
alias Demo.Email
alias Demo.Mailer

email = Email.welcome_email("to@example.com")
Mailer.deliver_later(email)
```

## 参考
* <a href="https://hexdocs.pm/bamboo/2.3.0/readme.html" target="_blank" rel="nofollow noopener">Bamboo — bamboo v2.3.0</a>
* <a href="https://github.com/thoughtbot/bamboo" target="_blank" rel="nofollow noopener">thoughtbot/bamboo</a>
* <a href="https://hexdocs.pm/bamboo_smtp/4.2.2/readme.html" target="_blank" rel="nofollow noopener">Bamboo.SMTPAdapter — Bamboo SMTP Adapter v4.2.2</a>
