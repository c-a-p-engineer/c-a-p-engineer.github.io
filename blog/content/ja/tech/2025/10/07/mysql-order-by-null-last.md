---
title: MySQLで ORDER BY + IS NULL を使って NULL を末尾に寄せる
date: 2025-10-07T19:00:00+09:00
publishDate: 2025-10-07T19:00:00+09:00
description: MySQLで ORDER BY を使うと NULL が先頭に並ぶ問題を、IS NULL を組み合わせるだけで安全に末尾へ送るテクニックを解説します。
draft: false
enableToc: true
enableTocContent: true
tags:
  - MySQL
  - SQL
categories:
  - Database
image: images/thumbnail/powered-by-mysql-167x86.png
slug: "mysql-order-by-null-last"
---

# MySQLで ORDER BY + IS NULL を使って NULL を末尾に寄せる

MySQL では `ORDER BY` を指定すると `NULL` が常に先頭に並びます。欠損値は検索結果のハイライトにも使われやすい一方で、利用者にとっては「データが入っているものから見たい」のに `NULL` がトップに並ぶのは煩わしいケースが多いでしょう。

この記事では、追加のテーブル定義や複雑なサブクエリを組まずに `NULL` を末尾へ移動させる定番パターンである `ORDER BY <列> IS NULL` を整理します。例と一緒に、複合ソートやパフォーマンス面の注意点、代替手段まで含めてまとめました。

## なぜ MySQL では NULL が先頭に来るのか

SQL 標準では、`ORDER BY` の昇順 (`ASC`) では `NULL` が最初に、降順 (`DESC`) では最後に並ぶよう定義されています。MySQL はこの挙動に従っており、`ASC` を明示しなくても `NULL` が必ず先頭になります。

```sql
SELECT id, deadline FROM tasks ORDER BY deadline;
```

上記のようなクエリを流すと、`deadline` が `NULL` の行がすべて最初に並びます。数件ならまだ許容できますが、欠損値が多いと「期日が決まっているタスクをすぐ確認したい」という UX を阻害します。

## ORDER BY <列> IS NULL, <列> で NULL を末尾へ寄せる

最もシンプルな解決策は、`ORDER BY` のキーに「`NULL` かどうか」を先に加えて、`NULL` の行を最後に送ることです。MySQL の `TRUE`/`FALSE` はそれぞれ `1`/`0` としてソートされるため、`IS NULL` の結果を先頭キーに配置すれば `FALSE (=0)` が先、`TRUE (=1)` が後になります。

```sql
SELECT id, deadline
FROM tasks
ORDER BY deadline IS NULL, deadline;
```

このクエリは次の順序で並び替えます。

1. `deadline IS NULL` の評価結果 (`0` or `1`)
2. `deadline` 自体の昇順

その結果、`deadline` に値が入っているレコードが先に並び、`NULL` の行は末尾へ移動します。降順で並べたい場合は `deadline DESC` を組み合わせるだけです。

```sql
SELECT id, deadline
FROM tasks
ORDER BY deadline IS NULL, deadline DESC;
```

### 動作イメージ

以下のようなテーブルを例にします。

```sql
CREATE TABLE tasks (
  id INT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  deadline DATE NULL
);

INSERT INTO tasks (id, title, deadline) VALUES
  (1, '環境構築', '2024-05-20'),
  (2, '仕様レビュー', NULL),
  (3, '結合テスト', '2024-05-22'),
  (4, 'リリース判定', NULL);
```

`ORDER BY deadline IS NULL, deadline;` を実行すると、`deadline` が埋まっている ID 1, 3 が先に並び、`NULL` の ID 2, 4 が末尾になります。

| id | title         | deadline   |
|----|---------------|------------|
| 1  | 環境構築      | 2024-05-20 |
| 3  | 結合テスト    | 2024-05-22 |
| 2  | 仕様レビュー  | NULL       |
| 4  | リリース判定  | NULL       |

## 複合キーやカスタム優先順位への応用

`IS NULL` を使う順番付けは、複数列をソートしたいケースでもそのまま利用できます。

- **複数列の昇順:** `ORDER BY deadline IS NULL, deadline, priority DESC` で「期日あり → 期日昇順 → 優先度降順」の並び替えが可能です。
- **任意のフラグとの組み合わせ:** `NULL` より「完了済みフラグを後ろに回したい」といった要件があれば、`ORDER BY is_completed, deadline IS NULL, deadline` のように評価式を増やします。

`CASE WHEN` を書かなくても、`IS NULL` の評価値を足し合わせるだけでほとんどの並べ替え要件を満たせます。

## パフォーマンス上の注意点

`ORDER BY deadline IS NULL` は **式によるソートキー** になるため、単体のインデックス (`INDEX(deadline)`) だけではファイルソートが発生するケースがあります。大量データを扱う場合は以下のような対策を検討してください。

- **生成列 + インデックス:** `ALTER TABLE tasks ADD COLUMN deadline_is_null TINYINT(1) AS (deadline IS NULL) STORED;` のように生成列を追加し、`INDEX(deadline_is_null, deadline)` を貼ればインデックスソートが使えます。
- **ビューやアプリ側キャッシュ:** 生 SQL を変更できない場合、ビューで `deadline IS NULL AS deadline_is_null` を露出させておき、アプリ層で二次ソートする選択肢もあります。

いずれの方法でも、式の評価を繰り返し行うことで CPU コストが跳ね上がるのを抑制できます。

## NULLS LAST 構文が使えない点に注意

PostgreSQL や Oracle では `ORDER BY deadline NULLS LAST` のような構文で `NULL` の位置を制御できますが、MySQL 8.4 時点でもこの拡張はサポートされていません。そのため、アプリケーション移植時は `IS NULL` を使った明示的な書き換えが必要です。

互換性を優先する場合は、`ORDER BY CASE WHEN deadline IS NULL THEN 1 ELSE 0 END, deadline` のように書き換えると ANSI SQL としても成立します。MySQL 固有の最適化に寄せたい場合は、`IS NULL` がシンプルで読みやすいのでおすすめです。

## まとめ

- MySQL の昇順ソートでは `NULL` が先頭に来るため、UX 観点では使い勝手が悪くなることがある。
- `ORDER BY <列> IS NULL, <列>` で欠損値を末尾へ送ることができる。降順ソートとの組み合わせも簡単。
- 大量データでは式ソートになる点に注意し、生成列やインデックス設計でファイルソートを避ける。
- MySQL には `NULLS LAST` が無いため、移植時は `IS NULL` や `CASE` による明示的な制御が必要。

シンプルな評価式を一行加えるだけで、現場のオペレーション効率を大きく改善できます。欠損値の扱いに悩んだら、まずは `ORDER BY <列> IS NULL` を試してみてください。

## 参考リンク

- <a href="https://dev.mysql.com/doc/refman/8.4/en/order-by-optimization.html" target="_blank" rel="nofollow noopener">MySQL 8.4 Reference Manual &ndash; ORDER BY Optimization</a>
- <a href="https://dev.mysql.com/doc/refman/8.4/en/working-with-null.html" target="_blank" rel="nofollow noopener">MySQL 8.4 Reference Manual &ndash; Working with NULL Values</a>
