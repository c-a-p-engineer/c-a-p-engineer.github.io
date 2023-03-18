---
title: "【Elixir】HTTPoison を使って API などの通信を行ってみる"
date: 2023-03-18T17:40:00+09:00
description: "Elixir で HTTP通信ができる HTTPoison を使って API などの通信を行ってみる"
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

# 【Elixir】HTTPoison を使って API などの通信を行ってみる
Elixir で HTTP通信ができる HTTPoison を使って API などの通信を行ってみる

## 環境
* Elixir 1.14.2

## HTTPoisonのインストール
`mix.exs` ファイルのdeps関数にHTTPoisonを追加し、アプリケーションの依存関係を更新します。

```mix.exs
defp deps do
  [
      {:httpoison, "~> 1.8"},
  ]
end
```

`mix deps.get` を実行してインストールします。


## 基本的な使い方
HTTPoisonを使ってGETリクエストを送信し、レスポンスを受け取ります。

### Get
GETでデータを取得してみます。

```ex
{:ok, response} = HTTPoison.get("https://c-a-p-engineer.github.io/index.json")
```

### Post
```ex
{:ok, response} = 
  HTTPoison.post(
    "https://c-a-p-engineer.github.io/index.json", # URL
    "{\"key\":\"value\"}", # JSON
    [{"Content-Type", "application/json"}] # Header
  )
```

### レスポンスの扱い方
レスポンスは `%HTTPoison.Response{}` 構造体で返されます。
ステータスコード、ヘッダー、ボディを取得する方法は以下の通りです。

```ex
# StatusCode
status_code = response.status_code
# Header
headers = response.headers
# Body
body = response.body

IO.inspect("status")
IO.inspect(status_code)
IO.inspect("headers")
IO.inspect(headers)
IO.inspect("body")
IO.inspect(body)
```

### エラーハンドリング
`HTTPoison` はエラーを `{:error, reason}` タプルで返します。
エラーハンドリングは以下のように行います。

```exs
case HTTPoison.get("https://c-a-p-engineer.github.io/index.json") do
  {:ok, response} ->
    # 成功時の処理
  {:error, %HTTPoison.Error{reason: reason}} ->
    # エラー時の処理
end
```

## 参考
* <a href="https://hexdocs.pm/httpoison/2.1.0/readme.html" target="_blank" rel="nofollow noopener">HTTPoison v2.1.0 - HexDocs</a>
