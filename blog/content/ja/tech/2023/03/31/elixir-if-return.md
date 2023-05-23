---
title: "【Elixir】if 文からの返り値をもらう方法"
date: 2023-03-31T12:40:00+09:00
description: "Elixir で if 文からの返り値をもらう方法メモ。Elixir は if 文内の変更を if 文外に作用させないため if文内での処理結果をもらう時に使い方です。"
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

# 【Elixir】if 文からの返り値をもらう方法
Elixir で if 文からの返り値をもらう方法メモ。
Elixir は if 文内の変更を if 文外に作用させないため if文内での処理結果をもらう時に使い方です。

## 環境
* Elixir 1.14.2

## if 文からの返り値をもらう方法
if 文から実際に返り値をもらう方法のサンプルコードです。
```ex
some_condition = true

value = if some_condition do
  "true_branch_value"
else
  "false_branch_value"
end

IO.puts("The result of the if expression is: #{value}")
```

こうすることによってif文内での処理結果をもらいif文外で使用ができます。
