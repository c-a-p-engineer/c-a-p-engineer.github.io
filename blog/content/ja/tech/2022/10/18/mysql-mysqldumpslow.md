---
title: "【Mysql】大量のスロークエリログを簡単に解析できる mysqldumpslow"
date: 2022-10-18T18:00:00+09:00
description: "Mysql の大量のスロークエリログを簡単に解析できる mysqldumpslow を使ってみる。"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Mysql
- DB
categories: 
- Mysql
image: images/thumbnail/powered-by-mysql-167x86.png
image_description: 'MySQLは、Oracleの米国およびその他の国における商標または登録商標です。'
---

# 【Mysql】スロークエリを簡単に解析できる mysqldumpslow
Mysql のスロークエリログを簡単に解析できる mysqldumpslow を使ってみる。

## mysqldumpslow
`mysqldumpslow` コマンドを使用することで大量のスロークエリログを簡単に解析できます。

### インストール
`mysqldumpslow` コマンドを使用するにには `mysql-server` のインストールが必要なようです。
僕は面倒なので mysql のコンテナを使用しました。

### 使用方法
使用方法は以下です。

```
mysqldumpslow [オプション] [ログファイル]
```

オプション一覧
* `-a` すべての数字を N に、文字列を 'S' に抽象化しません
* `-n` 少なくとも指定された桁数の数字を抽象化
* `--debug`,`-d` デバッグ情報を書き込み
* `-g` grepオプション、パターンに一致するステートメントのみを考慮
* `--help` ヘルプメッセージを表示して終了
* `-h` ログファイル名内のサーバーのホスト名
* `-i` サーバーインスタンスの名前
* `-l` 合計時間からロック時間を減算しない
* `-r` ソート順序を逆転
* `-s` 出力のソート方法
  * `t`,`at` クエリー時間または平均クエリー時間でソート
  * `l` ,`al` ロック時間または平均ロック時間でソート
  * `r`,`ar`  送信行数または平均送信行数でソート
  * `c` カウントでソート
* `-t` 最初から指定された数だけのクエリーのみ表示
* `--verbose`	冗長モード

### 返却値説明

`mysqldumpslow` を実行すると以下のような返却がされます。

```
Reading mysql slow query log from /usr/local/mysql/data/mysqld80-slow.log
Count: 1  Time=4.32s (4s)  Lock=0.00s (0s)  Rows=0.0 (0), root[root]@localhost
 insert into t2 select * from t1

Count: 3  Time=2.53s (7s)  Lock=0.00s (0s)  Rows=0.0 (0), root[root]@localhost
 insert into t2 select * from t1 limit N

Count: 3  Time=2.13s (6s)  Lock=0.00s (0s)  Rows=0.0 (0), root[root]@localhost
 insert into t1 select * from t1
```

* `Count` 実行回数
* `Time` 実行平均時間（合計時間
* `Lock` ロック平均時間（合計時間
* `Rows` 返却平均行（返却合計行

### スロークエリログの項目説明
<a href="https://gihyo.jp/dev/serial/01/mysql-road-construction-news/0154" target="_blank" rel="nofollow noopener">第154回　スロークエリログに出力される項目とlog_slow_extra | gihyo.jp</a> から引用

```
# Time: 2021-08-29T08:49:05.382813Z
# User@Host: root[root] @  [172.17.0.1]  Id:    10
# Query_time: 9.685363  Lock_time: 0.000210 Rows_sent: 1  Rows_examined: 2097153
SET timestamp=1630226935;
SELECT * FROM test WHERE col1=10;
```

Mysql 5.7までの項目
* `Time` スロークエリログに書き込んだ時間
* `User@Host` クエリを実行したユーザアカウント
* `Id` SHOW PROCESSLISTのID
* `Query_time` ステートメントの実行時間（秒）
* `Lock_time` ロックを取得した時間（秒）
* `Rows_sent` クライアントに送信された行数
* `Rows_examined` MySQLが内部で走査した行数

```
# Time: 2021-08-29T08:50:58.916765Z
# User@Host: root[root] @  [172.17.0.1]  Id:    10
# Query_time: 9.076753  Lock_time: 0.000243 Rows_sent: 1  Rows_examined: 2097153 Thread_id: 10 Errno: 0 Killed: 0 Bytes_received: 0 Bytes_sent: 251 Read_first: 1 Read_last: 0 Read_key: 1 Read_next: 0 Read_prev: 0 Read_rnd: 0 Read_rnd_next: 2097154 Sort_merge_passes: 0 Sort_range_count: 0 Sort_rows: 0 Sort_scan_count: 0 Created_tmp_disk_tables: 0 Created_tmp_tables: 0 Start: 2021-08-29T08:50:49.840012Z End: 2021-08-29T08:50:58.916765Z
SET timestamp=1630227049;
SELECT * FROM test WHERE col1=10;
```
Mysql 8.0以降の項目
* `Thread_id` Idと同じくSHOW PROCESSLISTのID
* `Errno` エラー番号、エラーが発生しなかった場合は0
* `Killed` 終了した場合、理由を示すエラー番号。ステートメントが正常に終了した場合は0
* `Bytes_received` ステートメントのステータスBytes_receivedの値
* `Bytes_sent` ステートメントのステータスBytes_sentの値
* `Read_xx` ステートメントのステータス Handler_Read_xxのそれぞれの項目の値
* `Sort_merge_passes` ステートメントのステータスSort_merge_passesの値
* `Sort_range_count` ステートメントのステータスSort_range_countの値
* `Sort_rows` ステートメントのステータスSort_rowsの値
* `Sort_scan_count` ステートメントのステータスSort_scan_countの値
* `Created_tmp_disk_tables` ステートメントのステータスCreated_tmp_disk_tablesの値
* `Created_tmp_tables` ステートメントのステータスCreated_tmp_tablesの値
* `Start` ステートメントの実行開始時間
* `End` ステートメントの実行終了時間


### 複数ファイルを一括で解析
以下のようにすると複数のスロークエリログを一括で解析してくれます。
```
mysqldumpslow slow_001.log slow_002.log
```

## サンプル
多用しそうなものをサンプルとして置いておきます。

### 発生回数でソート 10件表示
発生回数でソートして10件表示

```
mysqldumpslow -s c -t 10 mysql-slowquery.log
```

### 合計処理時間でソート 10件表示
合計処理時間でソートして10件表示

```
mysqldumpslow -s t -t 10 mysql-slowquery.log
```

`-a` を付けると抽象化されないので一番処理時間がかかっているクエリが出てきます。
（まったく同じクエリを何度も投げていたら集計されてしまいますが…

## 参考
* <a href="https://dev.mysql.com/doc/refman/8.0/ja/mysqldumpslow.html" target="_blank" rel="nofollow noopener">MySQL :: MySQL 8.0 リファレンスマニュアル :: 4.6.9 mysqldumpslow — スロークエリーログファイルの要約</a>
* <a href="https://gihyo.jp/dev/serial/01/mysql-road-construction-news/0154" target="_blank" rel="nofollow noopener">第154回　スロークエリログに出力される項目とlog_slow_extra | gihyo.jp</a>
