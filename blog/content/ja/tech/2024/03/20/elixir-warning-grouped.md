---
title: 【Elixir】clauses with the same name and arity の意味と対処方法
date: 2024-03-20T00:30:00+09:00
description: warning clauses with the same name and arity (number of arguments) should be grouped together が出た際の対処方法。
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

# 【Elixir】clauses with the same name and arity の意味と対処方法

`warning: clauses with the same name and arity (number of arguments) should be grouped together` が出た際の対処方法。

## エラーメッセージ

`warning: clauses with the same name and arity (number of arguments) should be grouped together, "def handle_event/3" was previously defined`

このメッセージは、`handle_event/3`関数がまとめられていないという意味になります。

## 解決策

### ステップ1: 関数の定義を確認

まずは関数の定義を確認してください。
以下のように同一関数名が別々の位置にあるかと思います。

```elixir
def handle_event("refresh", _params, socket) do
  # イベント "refresh" の処理
  refresh()
  {:noreply, update(socket, :page, &(&1 + 1))}
end

def refresh() do
    # リフレッシュで使用する関数
end

def handle_event("load_more", _params, socket) do
  # イベント "load_more" の処理
  {:noreply, update(socket, :items, fn items -> List.concat(items, additional_items()) end)}
end
```

### ステップ2: 関数を再編成

2つの対処方法があります。

同一関数名でまとめる場合。

```elixir
# 同一関数名でまとめる
def handle_event("refresh", _params, socket) do
  # イベント "refresh" の処理
  refresh()
  {:noreply, update(socket, :page, &(&1 + 1))}
end

def handle_event("load_more", _params, socket) do
  # イベント "load_more" の処理
  {:noreply, update(socket, :items, fn items -> List.concat(items, additional_items()) end)}
end

def refresh() do
    # リフレッシュで使用する関数
end
```


関数を1つにまとめて、パターンマッチングを使用して分岐を管理。

```elixir
def handle_event(event_type, _params, socket) do
  case event_type do
    "refresh" ->
       refresh() 
      {:noreply, update(socket, :page, &(&1 + 1))}

    "load_more" ->
      {:noreply, update(socket, :items, fn items -> List.concat(items, additional_items()) end)}
  end
end
```

これでこの **warning** に対応できます。
