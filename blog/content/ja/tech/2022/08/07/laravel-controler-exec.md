---
title: "【Laravel】Controller を Controller や Command から実行する方法"
date: 2022-08-07T10:00:00+09:00
description: "Laravel で Controller を Controller や Command から実行する方法メモ"
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

# 【Laravel】Controller を Controller や Command から実行する方法
Laravel で Controller を Controller や Command から実行する方法メモ。
諸事情で別 Controller や Command から実行するためのメモです。

## 実行対象のController
実際に実行するControllerを作成します。
```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
    public function store(Request $request)
    {
        $name = $request->name;
        // TODO 処理
    }
}
```

## 実際に実行してみる
試しに Controller から Controller を実行してみます。

``` php {linenos=table,hl_lines=["12-15"]}
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SampleController extends Controller
{
    public function store(Request $request)
    {
        // UserContorlller を実行
        $userController = app()->make('App\Http\Controllers\UserController');
        $userController->store(new Request([
            'name' => 'test'
        ]));
    }
}
```
