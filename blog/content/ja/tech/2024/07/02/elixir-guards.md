---
title: 【Elixir】ガード節について
date: 2024-07-02T03:30:00+09:00
description: Elixirは柔軟で強力なパターンマッチング機能を持ち、その一環としてガード節（guard clause）を利用することで、さらに詳細な条件でのマッチングが可能になります。
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

# 【Elixir】ガード節について

Elixirは柔軟で強力なパターンマッチング機能を持ち、その一環としてガード節（guard clause）を利用することで、さらに詳細な条件でのマッチングが可能になります。Elixirのガード節について、基本的な使い方から具体的な例、使用できる関数と演算子についてのメモ。

## ガード節とは？

ガード節は、関数のパターンマッチングに追加の条件を設定するためのものです。これにより、特定の条件を満たす場合にのみ関数が呼び出されるようになります。ガード節は、`when`キーワードを用いて定義されます。

## 基本的な使い方

以下は、ガード節を使用した基本的な関数定義の例です。

```elixir

defmodule GuardExample do
  # 数値が整数かつ0以上100以下の場合にマッチする関数
  def check_number(n) when is_integer(n) and n >= 0 and n <= 100 do
    "The number is an integer between 0 and 100."
  end

  # 数値が負の整数の場合にマッチする関数
  def check_number(n) when is_integer(n) and n < 0 do
    "The number is a negative integer."
  end

  # 数値が浮動小数点数の場合にマッチする関数
  def check_number(n) when is_float(n) do
    "The number is a float."
  end

  # その他の入力（数値でない場合）にマッチする関数
  def check_number(_n) do
    "The input is not a number."
  end
end

# 実行例
IO.puts GuardExample.check_number(50)
# 出力: "The number is an integer between 0 and 100."

IO.puts GuardExample.check_number(-10)
# 出力: "The number is a negative integer."

IO.puts GuardExample.check_number(3.14)
# 出力: "The number is a float."

IO.puts GuardExample.check_number("abc")
# 出力: "The input is not a number."
```

## ガード節の例

### リストの長さをチェックする関数

リストの長さをチェックする例です。

```elixir
defmodule ListChecker do
  # リストが指定された長さの場合にマッチする関数
  def check_list_length(list, len) when is_list(list) and length(list) == len do
    "The list has the specified length."
  end

  # リストが指定された長さでない場合にマッチする関数
  def check_list_length(list, _len) when is_list(list) do
    "The list does not have the specified length."
  end

  # その他の入力（リストでない場合）にマッチする関数
  def check_list_length(_list, _len) do
    "The input is not a list."
  end
end

# 実行例
IO.puts ListChecker.check_list_length([1, 2, 3], 3)
# 出力: "The list has the specified length."

IO.puts ListChecker.check_list_length([1, 2, 3], 2)
# 出力: "The list does not have the specified length."

IO.puts ListChecker.check_list_length("abc", 3)
# 出力: "The input is not a list."
```

### 文字列の長さをチェックする関数

文字列が特定の長さ以上であるかをチェックする関数を作成します。

```elixir
defmodule StringChecker do
  # 文字列が指定された長さ以上の場合にマッチする関数
  def check_string_length(str, len) when is_binary(str) and byte_size(str) >= len do
    "The string has the specified length or more."
  end

  # 文字列が指定された長さ未満の場合にマッチする関数
  def check_string_length(str, len) when is_binary(str) and byte_size(str) < len do
    "The string does not have the specified length."
  end

  # その他の入力（文字列でない場合）にマッチする関数
  def check_string_length(_str, _len) do
    "The input is not a string."
  end
end

# 実行例
IO.puts StringChecker.check_string_length("hello", 3)
# 出力: "The string has the specified length or more."

IO.puts StringChecker.check_string_length("hi", 3)
# 出力: "The string does not have the specified length."

IO.puts StringChecker.check_string_length(123, 3)
# 出力: "The input is not a string."
```

## ガード節で使用できる関数まとめ

以下はガード節で使用できる関数を簡単にまとめた表です。

厳密には Elixir の<a href="https://hexdocs.pm/elixir/main/Kernel.html" target="_blank" rel="nofollow noopener">Kernel</a>のものなら使用できるようです。

| 操作内容  | チェック内容 | 使用する関数/演算子  | 例 |
|-----------|--------------|---------------------|-------------------------|
| チェック | アトム | `is_atom/1`         | `when is_atom(var)`     |
|  | バイナリ     | `is_binary/1`       | `when is_binary(var)`   |
|  | ビットストリング | `is_bitstring/1`  | `when is_bitstring(var)`|
|  | ブール値     | `is_boolean/1`      | `when is_boolean(var)`  |
|  | 浮動小数点数 | `is_float/1`        | `when is_float(var)`    |
|  | 関数         | `is_function/1`, `is_function/2` | `when is_function(var)` |
|  | 整数         | `is_integer/1`      | `when is_integer(var)`  |
|  | リスト       | `is_list/1`         | `when is_list(var)`     |
|  | マップ       | `is_map/1`          | `when is_map(var)`      |
|  | 数値         | `is_number/1`       | `when is_number(var)`   |
|  | プロセスID   | `is_pid/1`          | `when is_pid(var)`      |
|  | ポート       | `is_port/1`         | `when is_port(var)`     |
|  | リファレンス | `is_reference/1`    | `when is_reference(var)`|
|  | タプル       | `is_tuple/1`        | `when is_tuple(var)`    |
| 数値の比較 | 同値・大小比較 | `==`, `!=`, `===`, `!==`, `<`, `<=`, `>`, `>=` | `when var > 0` |
| 論理演算 | 論理条件       | `and`, `or`, `not`  | `when var > 0 and var < 100`  |
| 算術演算 | 算術演算       | `+`, `-`, `*`, `/`, `div/2`, `rem/2` | `when rem(var, 2) == 0`  |
| その他のチェック | リストの長さ | `length/1` | `when length(list) == 3` |
|  | バイト数 | `byte_size/1` | `when byte_size(str) >= len` |
|  | マップのサイズ | `map_size/1` | `when map_size(map) > 2` |
|  | タプルのサイズ | `tuple_size/1` | `when tuple_size(tuple) == 2` |
|  | 先頭要素の取得 | `hd/1` | `when hd(list) == 1` |
|  | 末尾要素の取得 | `tl/1` | `when tl(list) == [2, 3]` |

※ `&&`, `||`、 そして `!` 使用できないとのこと。

## まとめ

Elixirのガード節は、関数のパターンマッチングをさらに強化し、特定の条件を満たす場合にのみ関数を呼び出すことを可能にします。ガード節で使用できる関数や演算子には制限がありますが、これらを適切に活用することで、効率的かつ柔軟なコードを書くことができます。

## 参考

- <a href="https://hexdocs.pm/elixir/main/patterns-and-guards.html#guards" target="_blank" rel="nofollow noopener">Patterns and guards — Elixir#guards</a>