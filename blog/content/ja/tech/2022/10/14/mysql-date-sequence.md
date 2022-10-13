---
title: "【Mysql】連続した日付の表を作る"
date: 2022-10-14T01:50:00+09:00
description: "Mysql で 連続した日付の表を作る方法"
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

# 【Mysql】連続した日付の表を作る
Mysql で 連続した日付の表を作る方法

## SQLを実行する
以下のSQLを使用すると `2022-10-14` と `2022-10-13` の仮想表が作られます。
```sql
SELECT
    '2022-10-14' - INTERVAL @seq_no DAY AS date   -- 開始日 
    , @seq_no := @seq_no + 1 AS SEQ               -- シーケンスNo
FROM
    information_schema.COLUMNS
    , (SELECT @seq_no := 0) as x                  -- 変数の初期化
WHERE
    @seq_no <= DATEDIFF('2022-10-14', '2022-10-13') -- 開始日 - 終了日 の差+1日数分を表示
```

結果は以下のようになります。

|date|seq|
|:---|---:|
|2022/10/14|1|
|2022/10/13|2|
