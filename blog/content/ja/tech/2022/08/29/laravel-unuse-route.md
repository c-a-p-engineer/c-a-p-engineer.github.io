---
title: "【Laravel】使用していないController, Methodを特定するコマンドを自作"
date: 2022-08-29T18:00:00+09:00
description: "Laravelで使用していないController, Methodを特定するコマンドを自作しました。リファクタの時に役立ちます！"
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

# 【Laravel】使用していないController, Methodを特定するコマンドを自作
Laravelで使用していないController, Methodを特定するコマンドを自作しました。
リファクタの時に役立ちます！

## 確認環境
Laravel 5-8 の環境で確認をしております。
Laravel9 からは `route:list` の出力形式が変わったため対応できておりません。

## 前準備
テスト用にControllerを作成します。
```shell
php artisan make:controller TestController --api
php artisan make:controller Test2Controller --api
```

ルートに追加
```php:/routes/web.php
Route::get('test', 'App\Http\Controllers\TestController@index');
```

## コマンド作成
```php:app/Console/Commands/UnuseRoute.php
<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use RecursiveDirectoryIterator;
use RecursiveIteratorIterator;

class UnuseRoute extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'command:UnuseRoute';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Unuse Route List';

    const DOMAIN = 'Domain';
    const METHOD = 'Method';
    const URI = 'URI';
    const NAME = 'Name';
    const ACTION = 'Action';
    const MIDDLEWARE = 'Middleware';

    const CONTROLLER_EXCLUDE_METHOD = [
        '__construct',
        '__call',
        'middleware',
        'getMiddleware',
        'callAction',
        'authorize',
        'authorizeForUser',
        'authorizeResource',
        'dispatchNow',
        'dispatchSync',
        'validateWith',
        'validate',
        'validateWithBag',
    ];

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        exec('php artisan route:list', $result);
        $result = array_slice($result, 3, count($result) - 4);

        // Domain, Method, URI, Name, Action, Middleware
        $routes = [];
        foreach ($result as $value) {
            $route = explode('| ', $value);
            $route = array_map('trim', $route);
            $routes[] = [
                self::DOMAIN => $route[1],
                self::METHOD => $route[2],
                self::URI => $route[3],
                self::NAME => $route[4],
                self::ACTION => $route[5],
                self::MIDDLEWARE => trim(str_replace('|', '', $route[6])),
            ];
        }

        // Closure を除外
        $routes = array_filter($routes, function ($value) {
            if (($value[self::ACTION] ?? null) == 'Closure') {
                return false;
            }
            return true;
        });

        // Controllerファイル群取得
        $files = $this->getFileList(app_path('Http/Controllers'));
        $actions = array_column($routes, self::ACTION);
        $controllers = [];

        foreach ($actions as $action) {
            $controller = explode('@', $action);
            if (is_null($controller[1] ?? null)) {
                continue;
            }
            $controllers[$controller[0]][] = $controller[1];
        }

        $controllerFiles = array_map(
            function ($value) {
                // ファイルパスから base_path を削除
                $value = str_replace(base_path() . '/', '', $value);
                // 拡張子を削除
                $filepath = pathinfo($value);
                $value = $filepath['dirname'] . '/' . $filepath['filename'];

                // ファイルパスを namespace に修正
                $value = str_replace('app/', 'App/', $value);
                $value = str_replace('/', '\\', $value);
                return $value;
            },
            $files
        );

        // Controllerに無いが定義されている（vendor系など
        $this->info('App Controller not defined');
        foreach (array_diff(array_keys($controllers), $controllerFiles) as $value) {
            $this->comment($value);
        }
        // 使用されていないControllerファイル
        $this->info(PHP_EOL.'Unuse Route Contorller Files');
        foreach (array_diff($controllerFiles, array_keys($controllers)) as $value) {
            $this->comment($value);
        }

        $this->info(PHP_EOL.'Unuse Route Controller Methods');
        $usedControllers = array_intersect($controllerFiles, array_keys($controllers));
        foreach ($usedControllers as $value) {
            $controller = app()->make($value);
            // 該当のControllerのメソッドを取得
            $methods = get_class_methods($controller);
            // Controllerの特定のメソッドを除外
            $methods = array_diff($methods, self::CONTROLLER_EXCLUDE_METHOD);
            // route で定義されているメソッドを除外
            $methods = array_diff($methods, $controllers[$value]);
            if (count($methods) > 0) {
                $this->info($value);
                $this->comment(implode(',', $methods));
            }
        }
        return 0;
    }

    private function getFileList($dir)
    {
        $iterator = new RecursiveDirectoryIterator($dir);
        $iterator = new RecursiveIteratorIterator($iterator);
        $list = array();
        foreach ($iterator as $fileinfo) {
            if ($fileinfo->isFile()) {
                $list[] = $fileinfo->getPathname();
            }
        }
        return $list;
    }
}

```
## 実行
実際に実行してみます。
```
php artisan command:UnuseRoute
```

実行すると下記のように使用していないController, Methodが出力されます。
```
App Controller not defined
Laravel\Sanctum\Http\Controllers\CsrfCookieController

Unuse Route Contorller Files
App\Http\Controllers\Test2Controller

Unuse Route Controller Methods
App\Http\Controllers\TestController
store,show,update,destroy
```
