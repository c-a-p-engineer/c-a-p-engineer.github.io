---
title: "【Elixir】Ecto.dump load でデータのエクスポート、インポートを行う"
date: 2023-01-23T18:30:00+09:00
description: "Elixir Ecto.dump load でデータのエクスポート、インポートを行う"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Elixir
categories: 
- Elixir
image: images/thumbnail/Official_Elixir_logo.png
---

# 【Elixir】Ecto.dump load でデータのエクスポート、インポートを行う
Ecto.dump load でデータのエクスポート、インポートを行う。

今回使用する2つの機能は以下です。
<a href="https://hexdocs.pm/ecto_sql/3.9.2/Mix.Tasks.Ecto.Dump.html" target="_blank" rel="nofollow noopener">mix ecto.dump — Ecto SQL v3.9.2</a>
<a href="https://hexdocs.pm/ecto_sql/3.9.2/Mix.Tasks.Ecto.Load.html" target="_blank" rel="nofollow noopener">mix ecto.load — Ecto SQL v3.9.2</a>

これを使用することでDBの移行が可能になります。

## Ecto.dump でDBDumpを取得する
以下のコマンドを実行します。
```
mix ecto.dump
```

`priv/repo/structure.sql` にDBDumpが吐かれます。

`ecto.dump` 使用時に PostgreSQL なら `pg_dump` 、MySQL なら `mysqldump` が入ってないとエラーが出ますのでご注意ください。
<a href="https://hexdocs.pm/ecto_sql/3.9.2/Mix.Tasks.Ecto.Dump.html" target="_blank" rel="nofollow noopener">mix ecto.dump — Ecto SQL v3.9.2</a>

## Ecto.load でDBDumpを実行する
以下のコマンドを実行すると `priv/repo/structure.sql` が実行されます。
```
mix ecto.load
```

## 参考
* <a href="https://hexdocs.pm/ecto_sql/3.9.2/Mix.Tasks.Ecto.Dump.html" target="_blank" rel="nofollow noopener">mix ecto.dump — Ecto SQL v3.9.2</a>
* <a href="https://hexdocs.pm/ecto_sql/3.9.2/Mix.Tasks.Ecto.Load.html" target="_blank" rel="nofollow noopener">mix ecto.load — Ecto SQL v3.9.2</a>