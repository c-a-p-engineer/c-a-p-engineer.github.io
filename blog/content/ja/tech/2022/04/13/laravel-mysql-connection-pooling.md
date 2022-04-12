---
title: "【Laravel】Mysql とのコネクションをプーリングさせる方法"
date: 2022-04-13T02:30:00+09:00
description: "Laravel で Mysql とのコネクションプーリングを行う方法メモ"
draft: false
enableToc: true
enableTocContent: true
tags: 
- PHP
- Laravel
- Mysql
categories: 
- Laravel
image: images/thumbnail/laravel-l-slant.png
---

# 【Laravel】Mysql とのコネクションをプーリングさせる方法
Laravel で Mysql とのコネクションプーリングを行う方法メモ。

## プーリングさせる意味
PHPではデフォルトでDBへの接続をプーリングさせません。
ですが、DBへのコネクション数を減らして負荷を下げる意味では行う方がベターです。
また多数のSQLを発行する場面で一々コネクションの発生が抑えられるなどの効果があります。

## 修正
`PDO::ATTR_PERSISTENT` の設定を追加。
`PDO::ATTR_PERSISTENT` はコネクションプーリングの設定です。
<a href="https://www.php.net/manual/ja/pdo.connections.php#example-999" target="_blank" rel="nofollow noopener">PHP: 接続、および接続の管理 - Manual #例4 持続的な接続</a>

```php:config/database.php{linenos=table,hl_lines=20}
<?php
        // ～省略～～～～～～～～～
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
                PDO::ATTR_PERSISTENT => true,     // 追加
            ]) : [],
        ],
```

## 参考
* <a href="https://qiita.com/rorensu2236/items/8b07b002c81a12c76964" target="_blank" rel="nofollow noopener">LaravelのログをJsonで吐き出せる様にする方法、AWSのCloudWatchを使おう。 - Qiita</a>
