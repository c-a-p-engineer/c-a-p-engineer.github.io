---
title: "【Laravel】DBからモデルを逆生成する"
date: 2022-10-24T18:00:00+09:00
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
<a href="https://github.com/reliese/laravel" target="_blank" rel="nofollow noopener"> reliese / laravel </a>

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
以下のコマンドを使用すると `backend/app/Models` にファイルが生成されます。
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

## 参考
* <a href="https://github.com/kitloong/laravel-migrations-generator" target="_blank" rel="nofollow noopener">kitloong /
laravel-migrations-generator</a>
