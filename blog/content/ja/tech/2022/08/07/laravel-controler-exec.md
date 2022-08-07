---
title: "【Laravel】Controller を直接実行する方法"
date: 2022-08-07T10:00:00+09:00
description: "Laravel で Controller を直接実行する方法メモ"
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

# 【Laravel】Controller を直接実行する方法
Laravel で Controller を直接実行する方法メモ。
諸事情で別 Controller や Command から実行するためのメモです。

### 実行対象のController

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

### 実際に実行してみる
試しに Controller から Controller を実行してみます。

``` php {linenos=table,hl_lines=["9-12"]}
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SampleController extends Controller
{
    $userController = app()->make('App\Http\Controllers\UserController');
    $userController->store(new Request([
        'name' => 'test'
    ]));
}
```