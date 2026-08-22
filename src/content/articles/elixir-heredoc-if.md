---
title: "【Elixir】ヒアドキュメントで制御構文を使用する方法"
date: 2023-03-29T00:40:00+09:00
description: "Elixir のヒアドキュメントで制御構文を使用する方法。これにより、動的な文字列を生成する際に、より簡潔で読みやすいコードを書くことができます。"
tags: []
categories: []
draft: false
legacySlug: elixir-heredoc-if
image: "images/thumbnail/Official_Elixir_logo.png"
---

# 【Elixir】ヒアドキュメントで制御構文を使用する方法
Elixir のヒアドキュメントで制御構文を使用する方法。
これにより、動的な文字列を生成する際に、より簡潔で読みやすいコードを書くことができます。

## 環境
* Elixir 1.14.2

## ヒアドキュメント
ヒアドキュメントは、複数行にわたる文字列を記述するための便利な構文です。
Elixir では、シングルクォート (`'''`) またはダブルクォート (`"""`) を使用してヒアドキュメントを以下のように定義できます。

```ex
long_string = """
  This is a
  multiline
  string.
"""
```

## ヒアドキュメント内で式展開を使用する
以下のようにヒアドキュメント内で式を展開することが可能です。
```ex
number = 3

result = """
  The number #{number} is #{if rem(number, 2) == 0, do: "even", else: "odd"}.
"""

IO.puts(result)
# The number 3 is odd.
```

こちらは複数行のヒアドキュメントないで式を展開する例です。
```ex
number = 4

result = """
The number #{number} is
#{if rem(number, 2) == 0 do
  "even"
else
  "odd"
end}.
"""

IO.puts(result)
# The number 3 is
# even.
```

これでメールなどの文面を作る際に条件をヒアドキュメント内で書けるので使い勝手が良いです。
