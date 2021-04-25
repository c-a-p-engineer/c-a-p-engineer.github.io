---
title: "PHP で Database の Tableを丸ごとコピー"
date: 2021-04-10T10:00:00+09:00
description: "テスト用のDBの整備が手間だったのでPHPで Database の Table定義を丸ごとコピーしました。"
draft: false
enableToc: true
enableTocContent: true
tags: 
- PHP
- DB
categories: 
- PHP
image: images/thumbnail/php.png
---

# PHP で Database の Tableを丸ごとコピー
テストをする際にテスト用のDBを整備するのが面倒だったのでPHPでDatabaseのTable定義を使用してテーブルのコピーを作成するようにしました。
PHPUnitを使用する際など一々Databaseを整備する必要がなくなるのでとても有用で PHPUnit 実行前に行うと整備する手間がなくなります。

## Database Copy
使用するDBユーザーに権限がなければ失敗しますので使用する場合はDBの権限に気をつけてください。
```mysql``` を使用していますので違うDBを使用するのであれば気をつけてください。

``` php:DatabaseCopy.php
<?php

/**
 * Database Copy
 */
class DatabaseCopy
{

    /**
     * DataBase Type
     * 
     * @var string
     */
    public $db = 'mysql';

    /**
     * Database Host
     * 
     * @var string
     */
    public $dbhost = 'localhost';

    /**
     * DataBase Port
     * 
     * @var string
     */
    public $dbport = '3306';

    /**
     * DataBase Name
     * 
     * @var string
     */
    public $dbname = 'develop';

    /**
     * Database charset
     * 
     * @var string
     */
    public $charset = 'utf-8';

    /**
     * Database User Name
     * 
     * @var string
     */
    public $user = 'db-user';

    /**
     * Database Password
     * 
     * @var string
     */
    public $password = 'db-password';

    /**
     * DataBase Execute
     * 
     * @param string $testDb
     * @return void
     */
    public function exe(string $testDb) : void
    {
        // コピー元のDBへ接続
        $dsn = "{$this->db}:host={$this->dbhost};port={$this->dbport};dbname={$this->dbname};charset={$this->charset}";
        $pdoOrigin = new PDO($dsn, $this->user, $this->password, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        ]);

        // コピー先のDBがあれば削除
        $pdoOrigin->query('drop database if exists ' . $testDb);
        // コピー先のDBを作成
        $pdoOrigin->query('create database ' . $testDb);

        // コピー先のDBの接続
        $dsn = "{$this->db}:host={$this->dbhost};port={$this->dbport};dbname={$testDb};charset={$this->charset}";
        $pdoCopy = new PDO($dsn, $this->user, $this->password, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        ]);

        // DB一覧を取得
        $rows = $pdoOrigin->query('show tables')->fetchAll(PDO::FETCH_ASSOC);
        $column = 'Tables_in_' . $this->dbname;

        // Table Copy
        foreach ($rows as $value) {
            // Create SQL 取得
            $createSql = $pdoOrigin->query('show create table ' . $value[$column])->fetchAll(PDO::FETCH_ASSOC);

            // Table 削除
            $pdoCopy->query('drop table if exists  ' . $createSql[0]['Table']);

            // Table 作成
            $pdoCopy->query($createSql[0]['Create Table']);

            // AUTO_INCREMENT をリセット
            if (strpos($createSql[0]['Create Table'], 'AUTO_INCREMENT') !== false) {
                $pdoCopy->query('alter table ' . $createSql[0]['Table'] . ' auto_increment = 1');
            }
        }
    }
}

```