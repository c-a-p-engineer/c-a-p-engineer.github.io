---
title: 【Elixir】CLIで入力を受け取る
date: 2024-03-20T01:00:00+09:00
description: mix コマンドなどを作成した際に引数以外にも入力値を受け取って処理を行いたい際に使える方法。
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

# 【Elixir】CLIで入力を受け取る

mix コマンドなどを作成した際に引数以外にも入力値を受け取って処理を行いたい際に使える方法。

## コマンドライン入力の受け取り方

<a href="https://hexdocs.pm/elixir/IO.html#gets/2" target="_blank" rel="nofollow noopener">IO.gets/2</a> を使用します。

```elixir
# 名前の入力を促すメッセージを表示
IO.puts("あなたの名前は何ですか？")

# コマンドラインからの入力を受け取る
name = IO.gets("What is your name?\n")

# 受け取った入力を変数に格納し、トリム（改行文字を削除）
name = String.trim(name)

# 挨拶と共に入力された名前を表示
IO.puts("こんにちは、#{name}さん！")

```

- IO.gets 関数は、引数としてプロンプトに表示する文字列を取ります。この例では空文字列 "" を使用していますが、必要に応じてプロンプトメッセージを指定できます。
- 受け取った入力には改行文字が含まれているため、String.trim 関数を使用して改行文字を削除します。これにより、扱いやすい形式の文字列を得ることができます。
- この例では、受け取った入力をそのまま画面に表示していますが、この値を使ってさらに複雑な処理を行うことも可能です。
