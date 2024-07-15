---
title: "Google ColabでElixirプログラミングを始める方法"
date: 2024-03-15T02:30:00+09:00
description: "Google Colabは、ブラウザ上でPythonコードを簡単に実行できる環境です。しかしPython以外のプログラミング言語、たとえばElixirを動かすことも可能です。"
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

# Google ColabでElixirプログラミングを始める方法

Google Colabは、ブラウザ上でPythonコードを簡単に実行できる環境です。しかしPython以外のプログラミング言語、たとえばElixirを動かすことも可能です。

この記事では、Google ColabでElixirをセットアップし、使用する方法を紹介します。

## Elixirのインストール

まず、ElixirをGoogle Colabにインストールする手順から始めましょう。以下のコマンドを新しいColabノートブックのセルに貼り付けて実行します。

```bash
!wget https://packages.erlang-solutions.com/erlang-solutions_2.0_all.deb && sudo dpkg -i erlang-solutions_2.0_all.deb
!sudo apt-get update
!sudo apt-get install esl-erlang
!sudo apt-get install elixir
```

これらのコマンドにより、Elixirとそれに必要なErlangがシステムにインストールされます。

## Elixirバージョンの確認

インストール後、Elixirが正しくインストールされたかを確認するために、バージョン情報を表示します。

```bash
!elixir -v
```

このコマンドの出力でElixirのバージョン情報が表示されれば、インストール成功です。

## 単一行のElixirコードの実行

単一行のElixirコードを実行するには、以下のように`!elixir`コマンドを使用します。

```bash
!elixir -e "IO.puts 'Hello, Elixir on Google Colab!'"
```

このコマンドは、Elixirの標準出力に"Hello, Elixir on Google Colab!"と表示します。

## 複数行のElixirコードを実行する方法

複数行のElixirコードを実行するためには、ヒアドキュメントを利用して一時ファイルにコードを書き込み、そのファイルを実行する方法が便利です。以下の手順を一つのセルにまとめて実行します。

```bash
%%bash
cat > example.exs <<EOF
IO.puts "Hello, Elixir!"
IO.puts "これは1つのセルで複数行のコードを実行する方法です。"
EOF

elixir example.exs
```

これにより、`example.exs`ファイルが作成され、そのファイルに記載されたElixirコードが実行されます。

## まとめ

Google ColabはPythonに特化したプラットフォームですが、上記の手順に従うことでElixir言語の実行環境を構築ができます。Elixirのインストールから複数行のコード実行まで、Colabを使って幅広いプログラミング言語の学習や実験が可能になります。

これで、Google Colabを使ってElixirプログラミングの世界に飛び込む準備が整いました。Elixirの強力な機能を探求し、新しいプロジェクトに生かしてみてください。
