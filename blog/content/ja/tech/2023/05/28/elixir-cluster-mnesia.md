---
title: "【Elixir】Mnesiaで分散データベースを構築し、クラスタ同期を行う"
date: 2023-05-28T02:20:00+09:00
description: "ElixirとErlangの分散データベースであるMnesiaを利用することで、分散システムにおけるデータの管理が格段に簡単になります。"
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

# 【Elixir】Mnesiaで分散データベースを構築し、クラスタ同期を行う
ElixirとErlangの分散データベースであるMnesiaを利用することで、分散システムにおけるデータの管理が格段に簡単になります。
今回の記事では、Mnesiaのセットアップとクラスタ同期について詳しく説明します。

## 環境
* Elixir 1.14.2

## 同期用コード
まずは、Mnesiaのセットアップから始めましょう。
以下のコードは、分散システムにおけるノードの状況を確認し、適切な操作を行います。

同期用コードはプロジェクト起動時、実行されるところにかいてあると良いでしょう。

```elixir
:mnesia.start()
if Enum.empty?(Node.list()) do
  # 他のノードが起動していない時
  # Mnesia作成
  :mnesia.create_table(:users, [
    {:attributes, [:id, :name, :email]}
  ])

  # テスト用にデータも挿入
  :mnesia.transaction(fn ->
    :mnesia.write({:users, 1, "Alice", "alice@example.com"})
  end)
else
  # 他にノードが起動しているので Mnesiaクラスタ対応
  # 同期前に旧Mnesiaデータを削除
  :mnesia.start()
  dir = :mnesia.system_info(:directory)
  :mnesia.stop()
  :mnesia.delete_schema([Node.self()])
  File.rm_rf(dir)

  :mnesia.start()
  # すべてのノードをデータベースノードとして追加
  :mnesia.change_config(:extra_db_nodes, [Node.self()] ++ Node.list())
  # スキーマのコピー設定（自分に対してディスクコピーを行う
  :mnesia.change_table_copy_type(:schema, Node.self(), :disc_copies)

  # 全データコピー
  for table <- :mnesia.system_info(:tables) do
    :mnesia.add_table_copy(table, Node.self(), :disc_copies)
  end
end

# デバッグ用：Mnesiaの情報を表示
# IO.inspect(:mnesia.system_info())
```

このコードは、まずMnesiaを起動し、現在のノードのリストを確認します。
他のノードが存在しない場合、新たなテーブル`:users`を作成し、初期データを書き込みます。

一方、他のノードが存在する場合、Mnesiaの既存データを一旦削除し、その後Mnesiaを再起動します。
そして、自ノードを含むすべてのノードをクラスタに追加し、スキーマ表のコピータイプをディスクコピーに設定します。
その後、すべてのテーブルに対してディスクコピーを追加します。

## 確認
次に、データの同期がうまく行われているか確認します。
別ノードでMnesiaのテーブルからすべてのデータを取得し、結果を表示します。

```elixir
# 全データ取得
result =
  :mnesia.transaction(fn ->
    :mnesia.match_object({:users, :_, :_, :_})
  end)

IO.inspect(result)
```

これにより、`:users`テーブルの全データが正しく取得できることを確認します。このようにして、ElixirとMnesiaを使った分散データベースの構築とクラスタ同期が可能です。

ElixirとMnesiaを使用することで、分散システムにおけるデータ管理の課題を簡単に解決ができます。
データの一貫性と可用性を確保し、システムの耐障害性を向上させるために、この強力な組み合わせをぜひ試してみてください。

## 参考
* <a href="https://qiita.com/k1complete/items/18dba4b8cf0da5952e59" target="_blank" rel="nofollow noopener">mnesiaをelixirから使ってみる - Qiita</a>

