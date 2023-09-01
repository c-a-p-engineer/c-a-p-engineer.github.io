---
title: 【Elixir】Phoenix のテンプレートエラー「expected closing `"` for attribute value」の解決方法
date: 2023-09-01T01:20:00+09:00
description: Elixir Phoenix のテンプレートエラー「expected closing `"` for attribute value」が出てしまった時の解決方法。
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

# Elixir PhoenixでのHTMLエラー「expected closing `"` for attribute value」の解決方法
Elixir Phoenix のテンプレートエラー「expected closing `"` for attribute value」が出てしまった時の解決方法。

## 確認環境
* Elixir 1.14.2
* Phoenix 1.6.3

## エラーコード
Elixir PhoenixフレームワークでWebアプリケーションを開発している際、以下のようなHTMLテンプレートコードでエラーが発生する時があります。

```elixir
<div style="<%= "color:red" %>">TEST</div>
```

以下のようなエラーコードが発生します。
**expected closing `"` for attribute value**

## エラーの原因
`<%= hoge %>` をダブルクォーテーションで囲うと正しく補完が働かなくてHTMLが壊れる模様です。

<a href="https://elixirforum.com/t/use-of-phx-value-ref/42639/12" target="_blank" rel="nofollow noopener">Use of phx-value-ref - Phoenix Forum / Questions / Help - Elixir Programming Language Forum</a>

## 対処方法
対処方法は2つ

### {}を使う
Elixir コードは `<% %>` 以外に `{}` でも使用することが可能です。
またブロック `{}` の中で変数を `{#{hoge}}` のようにすると変数が使用可能になります。

```elixir
<div style={"color:red"}>TEST</div>

<% color = "red" %>
<div style={"color:#{color}"}>TEST</div>
```

### 式を変数に格納する
事前にElixirの式の結果を変数に格納し、その変数を使用します。
対応している方はキーワードリスト、またはマップです。

```elixir
<% attributes = [style: "color:red"] %>
<div {attributes}>Kyeword List</div>

<% attributes = %{style: "color:red"} %>
<div {attributes}>Map</div>
```
