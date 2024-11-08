---
title: "【Elixir】OptionParser.parse! でCLIオプションをパースする方法：Mixタスクでの実用例"
date: 2023-08-22T13:00:00+09:00
description: "ElixirでCLIツールやMixタスクを作成する際、ユーザーからのコマンドライン入力に応じて処理を分岐させたり、動的な引数を渡したりすることがよくあります。"
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

# 【Elixir】OptionParser.parse! でCLIオプションをパースする方法：Mixタスクでの実用例

ElixirでCLIツールやMixタスクを作成する際、ユーザーからのコマンドライン入力に応じて処理を分岐させたり、動的な引数を渡したりすることがよくあります。Elixirの`OptionParser.parse!`を使うことで、コマンドラインオプションを簡単に解析し、柔軟な処理を行うことが可能です。

本記事では、`OptionParser.parse!`の使い方について、シンプルでわかりやすいサンプルコードを使って解説します。

## `OptionParser.parse!`の基本構文

`OptionParser.parse!`は、CLIオプションのパースを簡単に実現できるElixirの標準ライブラリです。次のような構文で使用します。

```elixir
OptionParser.parse!(args, switches: [option_name: :type])
```

- `args` : パース対象となる引数リスト
- `switches` : 各オプションに期待するデータ型を指定するキーワードリスト

`switches`で指定できる主な型は以下の通りです。

- `:boolean` : 真偽値として処理
- `:integer` : 整数として処理
- `:string` : 文字列として処理
- `[:integer, :keep]` : 同じオプションが複数回指定された場合にすべて保持

それでは、これらのオプション指定について、サンプルコードを使って具体的に確認します。

## サンプルコードの解説

以下は、`mix example.run`というカスタムMixタスクを作成し、CLIオプションをパースするためのサンプルコードです。このコードを実行することで、指定されたオプションを解析し、その結果を出力します。

```elixir
defmodule Mix.Tasks.Example.Run do
  use Mix.Task

  @shortdoc "A simple example task to demonstrate OptionParser.parse!"

  @moduledoc """
  A custom mix task to demonstrate CLI option parsing with OptionParser.parse!.

  Usage:
    mix example.run --mode production --verbose --retry 3 --user-id 1001 --user-id 1002
  """

  def run(args) do
    Mix.Task.run("app.start", [])

    # オプションのパース
    {opts, _args} =
      OptionParser.parse!(args,
        switches: [
          mode: :string,
          verbose: :boolean,
          retry: :integer,
          user_id: [:integer, :keep]
        ],
        aliases: [user_id: :user_id]
      )

    IO.inspect(opts)
  end
end
```

### 各オプションの説明

- `mode: :string` : `--mode`オプションは文字列値を期待しています。たとえば`--mode production`のように使います。
- `verbose: :boolean` : `--verbose`オプションは指定されると`true`、指定がなければ`false`になります。
- `retry: :integer` : `--retry`オプションは整数値を期待し、再試行回数などを指定する用途に使えます。
- `user_id: [:integer, :keep]` : `--user-id`オプションは複数回指定可能で、複数のIDをリストとして保持します。

### 実行例と結果
このカスタムタスクを以下のように実行します。

```bash
mix example.run --mode production --verbose --retry 3 --user-id 1001 --user-id 1002
```

実行すると、以下のようなパース結果が出力されます。

```elixir
[mode: "production", verbose: true, retry: 3, user_id: 1001, user_id: 1002]
```

この結果から、各オプションが指定された通りに解釈されていることがわかります。`--user-id`オプションは複数回指定されていますが、取得した値は単一の整数として保持されています。

※ここで注意してほしいのですが、`--user-id` は `user_id` のように変化します。

## `OptionParser.parse!`の詳細と応用
このコードを使えば、カスタムMixタスクにおいて、コマンドライン引数から柔軟にデータを取得し処理が可能です。また、`OptionParser.parse!`では、エラー処理やデフォルト値の設定なども追加できるため、実際のアプリケーションに応じたカスタマイズが推奨されます。

たとえば、オプションが未指定の場合にデフォルト値を設定したり、無効なデータ型の入力があった場合にエラーメッセージを出力することで、ユーザーフレンドリーなCLIツールを作成することが可能です。

## まとめ
`OptionParser.parse!`は、ElixirでCLIツールやMixタスクを構築する際に非常に便利な関数です。今回のサンプルコードのように、CLIオプションを柔軟に扱うことで、ユーザーフレンドリーなツールを作成できます。プロジェクトに応じたエラーハンドリングやデフォルト値の設定などを追加し、さらにカスタマイズして使うと良いでしょう。

## 参考リンク
- <a href="https://hexdocs.pm/elixir/OptionParser.html" target="_blank" rel="nofollow noopener">Elixir OptionParser Documentation (HexDocs)</a>
