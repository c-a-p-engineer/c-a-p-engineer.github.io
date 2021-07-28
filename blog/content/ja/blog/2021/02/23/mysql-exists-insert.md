---
title: "【Mysql】存在チェックINSERT文 重複行を挿入しない方法"
date: 2021-02-23T08:00:00+09:00
description: "存在チェックを行い、データを挿入する時に同一のデータがある場合は挿入したくないって時に使えるSQLのメモ"
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

# 存在チェックINSERT文 重複行を挿入しない方法
データ登録時に同一データがある場合は一意制約違反でエラーが発生したり、重複を挿入したくない時のためのメモ。
挿入済みデータの存在チェックを行い、同一データの挿入を防ぎます。

## サンプル用テーブル
``` sql:create.sql {linenos=table}
CREATE TABLE IF NOT EXISTS `user` (
  `email` varchar(50) DEFAULT NULL COMMENT 'メールアドレス',
  `password` varchar(50) DEFAULT NULL COMMENT 'パスワード',
  PRIMARY KEY (`MAIL_ADDRESS`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='ユーザマスタ' AUTO_INCREMENT=1 ;
```

## 通常のINSERT文
通常のINSERT文だと以下のようなSQLの用になります。
``` sql:insert.sql
INSERT INTO
    `user`
VALUES
    ('hoge@example.org', 'piyo')
```

このまま使用した場合、同一のメールアドレスが登録済みの場合はINSERTがエラーになってしまいます。

## 存在チェックINSERT文
```NOT EXISTS``` を使用して既にテーブルに登録済みか確認をします。

``` sql:insert.sql {linenos=table}
INSERT INTO
    `user`
SELECT
    'hoge@example.org',
    'piyo'
FROM
    DUAL
WHERE
    NOT EXISTS(
        SELECT
            'X'
        FROM
            `user`
        WHERE
            `email` = 'hoge@example.org'
    );
```

このようにすれば大量のデータ投入時に一意制約違反のエラーの対処が必要ありません。
ただし、今度はエラーが出ないため本来「重複したら確認する必要がある」というものがあれば、このような事はせずに地道にSELECTで存在チェック → INSERT → エラー確認としてください。
仕事内容によっては2重に登録しようとした原因を追求する必要が出てくる可能性がもあります。
