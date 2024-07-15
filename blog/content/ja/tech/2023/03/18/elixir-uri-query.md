---
title: "【Elixir】URIクエリパラメータを作る"
date: 2023-03-18T18:00:00+09:00
description: "Elixir でURIクエリパラメータを作るメモ"
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

# 【Elixir】URIクエリパラメータを作る
Elixir でURIクエリパラメータを作るメモ

## 環境
* Elixir 1.14.2

## Elixir の URI.encode_query
ElixirにはURIモジュールがあり、URLを操作するための機能を提供しています。その中でも、URI.encode_query/1は、クエリパラメータをエンコードするために便利なメソッドです。
`URI.encode_query` とは `URI.encode_query/1`は、キーと値のペアから構成されるマップを受け取り、URLエンコードされた文字列を返します。
このエンコードは、クエリストリングの形式でURLに付与するために使用されます。

```ex
query = URI.encode_query(%{foo: "bar", baz: "qux"})
IO.puts(query)

# 返り値
# "foo=bar&baz=qux"
```


上記の例では、`foo` と `baz` の2つのキーとそれぞれに対応する値が含まれたマップを渡しています。
このマップは、`foo=bar&baz=qux` という文字列に変換されています。
## 注意点
`URI.encode_query/1` は、URLエンコードされた文字列を返しますが、クエリパラメータの生成には `URI.encode_query/1` だけでは不十分な場合があります。
たとえば、クエリストリングに含める値がURLエンコードされている場合は、それを再度エンコードする必要があります。

```ex
query = URI.encode_query(%{foo: "https://example.com"})
IO.puts(query)

# 返り値
# "foo=https%3A%2F%2Fexample.com"
```

上記の例では、fooの値がURLエンコードされた文字列であるため、`URI.encode_query/1` によって再度エンコードされています。
`URI.encode_query/1` は、ElixirのURIモジュールで提供される機能の一つであり、クエリパラメータをエンコードするために便利なメソッドです。
ただし、注意点として、URLエンコードされた文字列を再度エンコードする必要があることがあります。

## 参考
* <a href="https://hexdocs.pm/elixir/1.12/URI.html#encode_query/2" target="_blank" rel="nofollow noopener">URI — Elixir v1.12.3 - HexDocs # encode_query</a>
