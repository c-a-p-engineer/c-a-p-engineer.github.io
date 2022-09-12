---
title: "【Laravel】バージョンを指定してインストールする"
date: 2022-09-12T13:00:00+09:00
description: "Laravelでバージョンを指定してインストールするためのメモ"
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

# 【Laravel】バージョンを指定してインストールする
Laravelでバージョンを指定してインストールするためのメモ

## Laravelをインストールする方法
以下の方法だとLaravelの最新バージョンをダウンロードします。
<a href="https://laravel.com/docs/9.x#your-first-laravel-project" target="_blank" rel="nofollow noopener">Installation - Laravel - The PHP Framework For Web Artisans</a>

```
composer create-project laravel/laravel example-app
```

## Laravel バージョン指定インストール方法

以下のコマンドだとLaravelの9.2でパッチバージョンが最新バージョンのものがインストールされます。
```
composer create-project "laravel/laravel=9.0.*" laravel.9.0
```

以下の方法だとLaravel9のマイナーバージョンが最新のバージョンをインストールしてくれます。
```
composer create-project "laravel/laravel=9.2.*" laravel.9.2
```

以下のような指定の方法も可能です。
違うものが入るようにLaravel8を指定しています。
```
composer create-project "laravel/laravel=8.*" laravel.8
```

`*` を使用することによって該当の部分の最新のものをダウンロードします。
```
composer create-project "laravel/laravel=[メジャーバージョン.マイナーバージョン.パッチバージョン]" [フォルダ名]
```

## Laravel バージョン確認
インストールしたらバージョンを確認してみましょう。
```
php artisan --version
```

以下のように出力されます。
```
Laravel Framework 9.29.0
```

※Laravel Framework のバージョンが出てくるので指定したバージョンと微妙に異なります。
