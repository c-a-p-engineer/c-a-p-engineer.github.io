---
title: "composer の package を自作してみる"
date: 2021-07-24T04:00:00+09:00
description: "composer の package を自作してみました。"
draft: false
enableToc: true
enableTocContent: true
tags: 
- PHP
- composer
categories: 
- PHP
image: images/thumbnail/php.png
---

# composer の package を自作してみる
composer の package を自作してみました。

package を作りのテンプレートに以下のようなものがありますが、今回は最小構成で簡単に作ってみました。
<a href="https://github.com/php-pds/skeleton" target="_blank" rel="nofollow noopener">php-pds/skeleton: Standard PHP package skeleton.</a>

## composer.json作成

`composer init` を実行して質問に答えていくだけ。

```bash
composer init

Welcome to the Composer config generator  

This command will guide you through creating your composer.json config.

Package name (<vendor>/<name>) [root/app]: c-a-p-engineer/hello-world-composer
Description []: Hello,World
Author [, n to skip]: n
Minimum Stability []: dev
Package Type (e.g. library, project, metapackage, composer-plugin) []: library
License []: MIT

Define your dependencies.

Would you like to define your dependencies (require) interactively [yes]? 
Search for a package: 
Would you like to define your dev dependencies (require-dev) interactively [yes]?
Search for a package:
Add PSR-4 autoload mapping? Maps namespace "CAPEngineer\HelloWorldComposer" to the entered relative path. [src/, n to skip]:

{
    "name": "c-a-p-engineer/hello-world-composer",
    "description": "Hello,World",
    "type": "library",
    "license": "MIT",
    "autoload": {
        "psr-4": {
            "CAPEngineer\\HelloWorldComposer\\": "src/"
        }
    },
    "minimum-stability": "dev",
    "require": {}
}

Do you confirm generation [yes]?
Generating autoload files
Generated autoload files
Would you like the vendor directory added to your .gitignore [yes]? yes
PSR-4 autoloading configured. Use "namespace CAPEngineer\HelloWorldComposer;" in src/
Include the Composer autoloader with: require 'vendor/autoload.php';
```

## PHPファイルを作成
PHPファイルを作成します。
```php:/src/HelloWorld/HelloWorld.php
<?php
namespace CAPEngineer\HelloWorldComposer\HelloWorld;

class HelloWorld
{
    public function say()
    {
        return 'Hello, World';
    }
}
```

## GitHub に push
作成したファイル群を <a href="https://github.com" target="_blank" rel="nofollow noopener">GitHub</a> に `push` してください。
この時、`README.md` などパッケージに不要なファイルは削除しましょう。

## Packagist に登録
1. <a href="https://packagist.org/" target="_blank" rel="nofollow noopener">Packagist</a> にアクセス。
2. ユーザ登録をしてください。
3. 上部のナビゲーションの **Submit** を選択。
4. Gitub の `Repository URL` を登録。<br> ※同一名称が多いと注意が出てきますが気にせず進めます。

<br>

実際に作った composer は こちらになります。
<a href="https://github.com/c-a-p-engineer/hello-world-composer" target="_blank" rel="nofollow noopener">c-a-p-engineer/hello-world-composer: Hello,World in Composer</a>


## 実際に使ってみる
まずは composer からインストール。
``` 
composer require c-a-p-engineer/hello-world-composer
```

```php:index.php
<?php

use CAPEngineer\HelloWorldComposer\HelloWorld\HelloWorld;

require __DIR__.'/../vendor/autoload.php';

$helloWorld = new HelloWorld();
echo $helloWorld->say();
```

これで `Hello,World` が表示されたら成功になります。

## 参考
* <a href="https://www.messiahworks.com/archives/18541" target="_blank" rel="nofollow noopener">自作のcomposerパッケージ(hello,world)を、githubに登録して、laravelから利用できる方法 | メサイア・ワークス</a>
