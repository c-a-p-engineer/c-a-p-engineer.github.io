---
title: "【Laravel】DBからモデルを逆生成する"
date: 2022-10-24T18:00:00+09:00
LastMod: 2022-10-27T18:00:00+09:00
description: "DBを修正するとモデルの修正しなければいけなくて面倒なのでLaravelでDBからモデルを逆生成する方法"
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

# 【Laravel】DBからモデルを逆生成する
DBを修正するとモデルの修正しなければいけなくて面倒なのでLaravelでDBからモデルを逆生成する方法

## 手順
以下のパッケージを使用してモデルを逆生成します。
<a href="https://github.com/reliese/laravel" target="_blank" rel="nofollow noopener">reliese/laravel</a>

`belongsToMany` や `hasOne` なども自動で生成してくれます。

### インストール
インストール方法
```
composer require reliese/laravel --dev
```

### 設定ファイルの生成
`config/models.php` を生成します。
`config:clear` もして念のためキャッシュを削除します。

```
php artisan vendor:publish --tag=reliese-models
php artisan config:clear
```

### 逆生成
以下のコマンドを使用すると `app/Models` にファイルが生成されます。
```
php artisan code:models
```

### 逆生成応用
指定テーブルのみを逆生成する
```
php artisan code:models --table=users
```

接続の指定
```
php artisan code:models --connection=mysql
```

### 設定ファイル
`config/models.php` の設定について簡単にご説明
<a href="https://github.com/reliese/laravel/blob/v1.x/config/models.php" target="_blank" rel="nofollow noopener">laravel/config/models.php</a>

* `namespace` 出力モデルの `namespace`
* `parent` 親モデル
* `use` 使用する `trait`
* `connection` モデルの接続DB
* `soft_deletes` `softDeletes` の使用
* `snake_attributes` 属性名 true:スネーク false:キャメル
* `indent_with_space` インデントの設定 `0` だとタブ（デフォルト0なので注意
* `relation_name_strategy`
  * `related` でリレーション先の名前を使用（1テーブルに同一のリレーション先がある場合は `foreign_key` を推奨
  * `foreign_key` リレーション名を使用
* `with_property_constants` プロパティの `const` 定義 true:定義 false:定義なし

ざっくりこんな感じです。（少々不足はあります

## 参考
* <a href="https://github.com/reliese/laravel" target="_blank" rel="nofollow noopener">reliese/laravel</a>
