---
title: 【Elixir】the underscored variable "_variable" is used after being set.の対処法
date: 2024-03-20T19:00:00+09:00
description: warning the underscored variable "_variable" is used after being set.の対処法。
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

# 【Elixir】warning: the underscored variable "_variable" is used after being set.の対処法

`warning: the underscored variable "_variable" is used after being set.`の対処法。

## 警告の背景

Elixirでは、変数名の前にアンダースコア(`_`)を付けることで、「この変数は使用されない」という意図を示します。これはElixirのみならず、Erlangや他の関数型言語においても見られる慣習です。しかし、アンダースコアで始まる変数に値を割り当てた後で、その変数をコード内で使用すると、Elixirコンパイラは開発者に対して警告を発します。これは、「本来使用されるべきでない変数が使用されている」という状況を指摘するためです。

## 警告メッセージの解析

警告メッセージは以下の形式で表示されます。

```
warning: the underscored variable "_variable" is used after being set. A leading underscore indicates that the value of the variable should be ignored. If this is intended please rename the variable to remove the underscore.
```

このメッセージは、「アンダースコアで始まる変数`_variable`がセットされた後に使用されている。アンダースコアで始まる変数はその値が無視されるべきであることを示す。もしこれが意図的であるならば、アンダースコアを取り除いて変数名を変更してください」という意味です。

## 対処法

### 変数名の変更

問題のあるコードの例として、以下のような関数があるとします。

```elixir
def process_data(_params) do
  _result = do_some_operation()
  # ここで_resultを使用
end
```

この場合、`_result`変数は実際には使用されているため、アンダースコアを取り除き、変数名を変更することで警告を解消します。

```elixir
def process_data(params) do
  result = do_some_operation()
  # ここでresultを使用
end
```

### 不要な変数の削除

もしアンダースコア付きの変数が本当に不要である場合（たとえば、値を受け取るがその後で使用しない場合）、その変数の代入自体を削除することも1つの解決策です。

## まとめ

`warning: the underscored variable "_variable" is used after being set.`という警告は、Elixirのコーディング慣習を理解し、適切に適用することの重要性を教えてくれます。このような警告に直面したときは、変数の使用意図を再評価し、必要に応じてコードをリファクタリングする良い機会と捉えることができます。正しい命名規則の適用は、コードの可読性と保守性を向上させる上で不可欠です。