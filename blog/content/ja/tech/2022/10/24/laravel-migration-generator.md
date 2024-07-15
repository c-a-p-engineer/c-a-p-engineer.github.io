---
title: "【Laravel】マイグレーションをDBから逆生成する"
date: 2022-10-24T18:00:00+09:00
description: "DBとマイグレーションファイルを修正するのも面倒なのでLaravelでマイグレーションをDBから逆生成する方法"
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

# 【Laravel】マイグレーションをDBから逆生成する
DBとマイグレーションファイルを修正するのも面倒なのでLaravelでマイグレーションをDBから逆生成する方法。

## 手順
以下のパッケージを使用してマイグレーションを逆生成します。
<a href="https://github.com/kitloong/laravel-migrations-generator" target="_blank" rel="nofollow noopener">kitloong/laravel-migrations-generator</a>

### インストール
インストール方法
```
composer require --dev "kitloong/laravel-migrations-generator"
```

### 逆生成
以下のコマンドを使用すると `database/migrations` にファイルが生成されます。
```
php artisan migrate:generate
```

### 逆生成応用
指定テーブルのみを逆生成する
```
php artisan migrate:generate --tables="table1,table2,table3,table4,table5"
```

指定したテーブルを無視して逆生成する
```
php artisan migrate:generate --ignore="table3,table4,table5"
```

### 各種オプション

* `-c, --connection[=CONNECTION]` 接続するデータベース
* `-t, --tables[=TABLES]` 逆生成するテーブル指定
* `-i, --ignore[=IGNORE]` 逆生成しないテーブルの指定
* `-p, --path[=PATH]` ファイルを生成する場所
* `-tp, --template-path[=TEMPLATE-PATH]` ジェネレーターのテンプレート
* `--date[=DATE]` マイグレーションファイル名の日付
* `--table-filename[=TABLE-FILENAME]` テーブル移行ファイル名の定義、デフォルト パターン: [datetime_prefix]\_create_[table]_table.php
* `--view-filename[=VIEW-FILENAME]` ビュー移行ファイル名の定義、デフォルト パターン: [datetime_prefix]\_create_[table]_view.php
* `--fk-filename[=FK-FILENAME]` 外部キーの移行ファイル名、デフォルト パターンを定義します。 [datetime_prefix]\_add_foreign_keys_to_[table]_table.php
* `--default-index-names` インデックス名を使用しない
* `--default-fk-names` 外部キー名を使用しない
* `--use-db-collation` DB称号を利用しない
* `--skip-views` ビューを生成しない
* `--squash` 1つのファイルに生成する

## 参考
* <a href="https://github.com/kitloong/laravel-migrations-generator" target="_blank" rel="nofollow noopener">kitloong/laravel-migrations-generator</a>
