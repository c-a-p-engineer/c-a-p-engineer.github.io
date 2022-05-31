---
title: "【Laravel】mysql strict の注意点"
date: 2022-06-01T00:30:00+09:00
description: "Laravel では mysql への接続オプションとしてstrict（厳密）モードがあり気をつける必要があります。"
draft: false
enableToc: true
enableTocContent: true
tags: 
- PHP
- Laravel
categories: 
- Laravel
image: images/thumbnail/laravel-l-slant.png
---

# 【Laravel】mysql struct の注意点
`Laravel` では `mysql` への接続オプションとして `strict`（厳密）モードがあり気をつける必要があります。

## strict 設定
`config/database.php` の `mysql => strict` の値が `true` だと有効になっています。
デフォルトの設定では `true` です。
<a href="https://github.com/laravel/laravel/blob/9.x/config/database.php#L59" target="_blank" rel="nofollow noopener">Laravel 9.x config/database.php</a>

```php:config/database.php {linenos=table,hl_lines=[17]}
<?php
return [
        // 途中省略～～～
        'mysql' => [
            'driver' => 'mysql',
            'url' => env('DATABASE_URL'),
            'host' => env('DB_HOST', '127.0.0.1'),
            'port' => env('DB_PORT', '3306'),
            'database' => env('DB_DATABASE', 'forge'),
            'username' => env('DB_USERNAME', 'forge'),
            'password' => env('DB_PASSWORD', ''),
            'unix_socket' => env('DB_SOCKET', ''),
            'charset' => 'utf8mb4',
            'collation' => 'utf8mb4_unicode_ci',
            'prefix' => '',
            'prefix_indexes' => true,
            'strict' => true,
            'engine' => null,
            'options' => extension_loaded('pdo_mysql') ? array_filter([
                PDO::MYSQL_ATTR_SSL_CA => env('MYSQL_ATTR_SSL_CA'),
            ]) : [],
        ],
        // 途中省略～～～
];
```

## strict の内容
以下のソースに `strict` の内容が記載されています。
<a href="https://github.com/laravel/framework/blob/9.x/src/Illuminate/Database/Connectors/MySqlConnector.php#L198-L207" target="_blank" rel="nofollow noopener">Laravel 9.x src/Illuminate/Database/Connectors/MySqlConnector.php</a>

Mysql 8.0.11 以降の設定
`set session sql_mode='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION'`

Mysql 8.0.11 未満の設定
`set session sql_mode='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION'`

```php:src/Illuminate/Database/Connectors/MySqlConnector.php {linenos=table,hl_lines=[15,18]}
<?php
    // 途中省略～～～
    /**
     * Get the query to enable strict mode.
     *
     * @param  \PDO  $connection
     * @param  array  $config
     * @return string
     */
    protected function strictMode(PDO $connection, $config)
    {
        $version = $config['version'] ?? $connection->getAttribute(PDO::ATTR_SERVER_VERSION);

        if (version_compare($version, '8.0.11') >= 0) {
            return "set session sql_mode='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION'";
        }

        return "set session sql_mode='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION'";
    }
```

## strict 解説
* `ONLY_FULL_GROUP_BY`
  * GROUP BY句 で指定されてない非集計カラムを許可
  * <a href="https://dev.mysql.com/doc/refman/8.0/ja/group-by-handling.html" target="_blank" rel="nofollow noopener">MySQL :: MySQL 8.0 リファレンスマニュアル :: 12.20.3 MySQL での GROUP BY の処理</a>
* `STRICT_TRANS_TABLES`
  * 無効な値に対して近似値などを入れることなくエラーとする
  * <a href="https://dev.mysql.com/doc/refman/5.6/ja/constraint-invalid-data.html" target="_blank" rel="nofollow noopener">MySQL :: MySQL 5.6 リファレンスマニュアル :: 1.7.3.3 無効データの制約</a>
* `NO_ZERO_IN_DATE`
  * 無効な日時の挿入を禁止
  * <a href="https://dev.mysql.com/doc/refman/5.6/ja/sql-mode.html#name="sqlmode_no_zero_in_date"" target="_blank" rel="nofollow noopener">MySQL :: MySQL 5.6 リファレンスマニュアル :: 5.1.7 サーバー SQL モード</a>
* `NO_ZERO_DATE`
  * `0000-00-00` の日付を禁止
  * <a href="https://dev.mysql.com/doc/refman/5.6/ja/sql-mode.html#sqlmode_no_zero_date" target="_blank" rel="nofollow noopener">MySQL :: MySQL 5.6 リファレンスマニュアル :: 5.1.7 サーバー SQL モード</a>
* `ERROR_FOR_DIVISION_BY_ZERO`
  * `0` の禁止。無効だと `NULL` が入る。
  * <a href="https://dev.mysql.com/doc/refman/5.6/ja/sql-mode.html#sqlmode_error_for_division_by_zero" target="_blank" rel="nofollow noopener">MySQL :: MySQL 5.6 リファレンスマニュアル :: 5.1.7 サーバー SQL モード</a>
* `NO_AUTO_CREATE_USER`
  * 自動的に新規ユーザを作成しない
  * <a href="https://dev.mysql.com/doc/refman/5.6/ja/sql-mode.html#sqlmode_no_auto_create_user" target="_blank" rel="nofollow noopener">MySQL :: MySQL 5.6 リファレンスマニュアル :: 5.1.7 サーバー SQL モード</a>
* `NO_ENGINE_SUBSTITUTION`
  * 目的のストレージエンジンが利用できない場合にエラーが発生し、テーブルは作成または変更されません。
  * <a href="https://dev.mysql.com/doc/refman/5.6/ja/sql-mode.html#sqlmode_no_engine_substitution" target="_blank" rel="nofollow noopener">MySQL :: MySQL 5.6 リファレンスマニュアル :: 5.1.7 サーバー SQL モード</a>


## 個別に各種オプションを設定する
`strict` で一括で諸々の設定を有効にするのではなく個別にちゃんと設定したい場合は `modes` を追加することで可能です。

```php:config/database.php {linenos=table,hl_lines=["17-25"]}
<?php
return [
        // 途中省略～～～
        'mysql' => [
            'driver' => 'mysql',
            'url' => env('DATABASE_URL'),
            'host' => env('DB_HOST', '127.0.0.1'),
            'port' => env('DB_PORT', '3306'),
            'database' => env('DB_DATABASE', 'forge'),
            'username' => env('DB_USERNAME', 'forge'),
            'password' => env('DB_PASSWORD', ''),
            'unix_socket' => env('DB_SOCKET', ''),
            'charset' => 'utf8mb4',
            'collation' => 'utf8mb4_unicode_ci',
            'prefix' => '',
            'prefix_indexes' => true,
            // 'strict' => true, // 厳密モードOFF
            // 個別に設定
            'modes' => [
                'STRICT_TRANS_TABLES',
                'NO_ZERO_IN_DATE',
                'NO_ZERO_DATE',
                'ERROR_FOR_DIVISION_BY_ZERO',
                'NO_ENGINE_SUBSTITUTION'
            ],
            'engine' => null,
            'options' => extension_loaded('pdo_mysql') ? array_filter([
                PDO::MYSQL_ATTR_SSL_CA => env('MYSQL_ATTR_SSL_CA'),
            ]) : [],
        ],
        // 途中省略～～～
];
```
