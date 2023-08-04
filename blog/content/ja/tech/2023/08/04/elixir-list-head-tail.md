---
title: "【Elixir】リストの先頭と末尾のデータを取得する"
date: 2023-08-04T12:30:00+09:00
description: "Elixirでリストの先頭と末尾のデータを取得する方法を解説します。"
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

# 【Elixir】リストの先頭と末尾のデータを取得する
Elixirでリストの先頭と末尾のデータを取得する方法を解説します。

## 確認環境
* Elixir 1.14.2

## リストの先頭データの取得
Elixirでリストの最初の要素を取得するには、`List.first/1` 関数や `hd/1` 関数を使用します。

まず、`List.first/1` 関数の使用例を以下に示します。

```elixir
list = [1, 2, 3, 4, 5]
first_element = List.first(list)
IO.puts(first_element)  # => 1
```

このコードでは、`List.first/1` 関数を用いてリストから最初の要素を取得し、それを `first_element` に格納しています。その後 `IO.puts/1` 関数を用いて `first_element` の内容を出力しています。

また、`hd/1` 関数を使用することでも同様にリストの最初の要素を取得ができます。

```elixir
list = [1, 2, 3, 4, 5]
first_element = hd(list)
IO.puts(first_element)  # => 1
```

## リストの末尾データの取得
次に、リストの末尾のデータを取得する方法です。Elixirでは `List.last/1` 関数を使用してリストの最後の要素を取得します。以下にその使用例を示します。

```elixir
list = [1, 2, 3, 4, 5]
last_element = List.last(list)
IO.puts(last_element)  # => 5
```

上記のコードでは、`List.last/1` 関数を用いてリストから最後の要素を取得し、それを `last_element` に格納しています。その後 `IO.puts/1` 関数を用いて `last_element` の内容を出力しています。

## まとめ
Elixirでリストの最初と最後のデータを取得する方法は非常に簡単です。`List.first/1`, `hd/1`, および `List.last/1` 関数を覚えておけば、リストから必要なデータを簡単に取り出すことができます。これらの関数は、Elixirでのデータ操作の基本となるため、ぜひ覚えておきましょう。
