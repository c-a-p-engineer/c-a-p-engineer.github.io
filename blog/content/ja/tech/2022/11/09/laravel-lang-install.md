---
title: "【Laravel】日本語などのローカル言語ファイルを取得する"
date: 2022-11-09T18:00:00+09:00
description: "Laravel は英語の言語ファイルがデフォルトで適用されていますが日本語化するのが面倒くさい。そういう時に日本語などのローカル言語ファイルを簡単に取得、適用する方法"
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

# 【Laravel】日本語などのローカル言語ファイルを取得する
Laravel は英語の言語ファイルがデフォルトで適用されていますが日本語化するのが面倒くさい。
そういう時に日本語などのローカル言語ファイルを簡単に取得、適用する方法。

## 導入方法
日本語の導入を進めていきます。
導入は簡単です。
```bash
php -r "copy('https://readouble.com/laravel/8.x/ja/install-ja-lang-files.php', 'install-ja-lang.php');"
php -f install-ja-lang.php
php -r "unlink('install-ja-lang.php');"
```

### 注意
Laravel9 では `lang/ja` に日本語ファイルを置く必要があります。
上記の方法では `resources/lang/ja` に日本語ファイルが作成されるので**移動させ忘れないよう**にご注意ください。

## 参考
* <a href="https://readouble.com/laravel/8.x/ja/validation-php.html" target="_blank" rel="nofollow noopener">Laravel 8.x validation.php言語ファイル</a>
