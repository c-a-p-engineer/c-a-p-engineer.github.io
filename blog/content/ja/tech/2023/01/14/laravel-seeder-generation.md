---
title: "【Laravel】SeederをDBから逆生成する"
date: 2023-01-14T15:30:00+09:00
description: "Seederを一々作るのも面倒なので一気に逆生成する方法"
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

# 【Laravel】SeederをDBから逆生成する
Seederを一々作るのも面倒なので一気に逆生成する方法。

## 手順
以下のパッケージを使用してSeederを逆生成します。
<a href="https://github.com/orangehill/iseed" target="_blank" rel="nofollow noopener">orangehill/iseed</a>

### インストール
インストール方法
```
composer require --dev "orangehill/iseed"
```

### 逆生成
以下のコマンドを使用すると `database/seeders` にファイルが生成されます。
```
php artisan iseed [テーブル名]
```

複数やる場合は `,` 区切りで指定できます。
```
php artisan iseed [テーブル名],[テーブル名]
```

### 各種オプション
`php artisan help iseed` でオプションの確認可能です。
使いそうなものを一部抜粋しております。

* `--classnameprefix=Prefix` クラス名のプレフィックスを指定
* `--classnamesuffix=Suffix` クラス名のサフィックスを指定
* `--force` 既存ファイルがあっても上書きする。
* `--clean` `app/database/seeds/DatabaseSeeder.php` を削除して実行
* `--database=DatabaseName` データベースを指定
* `--max=10` Seederにする件数を指定
* `--chunksize=100` 挿入時にチャンクする件数の指定
* `--orderby=id` Seederの順序のキーを指定（昇順
* `--direction=desc` `--orderby` と組み合わせてSeederの順序指定（`desc`で降順指定
* `--exclude=id` Seederから除外する列を指定。 `--exclude=id,created_at,updated_at` と `,` 区切りで除外が可能。

## 参考
* <a href="https://github.com/kitloong/laravel-migrations-generator" target="_blank" rel="nofollow noopener">kitloong/laravel-migrations-generator</a>
