---
title: "【Laravel】使用していないModel, DBのテーブルを特定するコマンドを自作"
date: 2022-09-14T18:00:00+09:00
description: "Laravelで使用していないModel, DBのテーブルを特定するコマンドを自作しました。リファクタの時に役立ちます！"
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

# 【Laravel】使用していないModel, DBのテーブルを特定するコマンドを自作
Laravelで使用していないModel, DBのテーブルを特定するコマンドを自作しました。
リファクタの時に役立ちます！

## 確認環境
Laravel 5-9 の環境で確認をしております。

## コマンド作成
```php:app/Console/Commands/UnuseTable.php
<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use RecursiveDirectoryIterator;
use RecursiveIteratorIterator;

class UnuseTable extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'command:UnuseTable';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Laravel Model Not Exists Table';

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
        $files = $this->getFileList(app_path('Model'));
        $modelFiles = array_map(
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

        // ModelからTable名を取得
        $modelTables = [];
        foreach ($modelFiles as $value) {
            $model = app()->make($value);
            $modelTables[] = $model->getTable();
        }

        // DBからテーブルを取得
        $dbTables = DB::select('show tables;');
        $dbTables = array_reduce(
            array_map(function ($table) {
                return array_values((array) $table);
            }, $dbTables),
            'array_merge',
            []
        );

        // DBとModelの差分を取得
        $modelOnlys = array_diff($modelTables, $dbTables);
        $dbOnlys = array_diff($dbTables, $modelTables);

        $this->info('##################################################');
        $this->info('Laravel Model Use Table');
        if (count($modelTables) == 0) {
            $this->info('Nothing!!');
        } else {
            $this->info('Count:' . count($modelTables));
        }
        foreach ($modelTables as $model) {
            $this->comment($model);
        }
        $this->info('');

        $this->info('##################################################');
        $this->info('Laravel Model Only');
        if (count($modelOnlys) == 0) {
            $this->info('Nothing!!');
        } else {
            $this->info('Count:' . count($modelOnlys));
        }
        foreach ($modelOnlys as $model) {
            $this->comment($model);
        }
        $this->info('');
        $this->info('##################################################');
        $this->info('Laravel Model Not Exists Tables');
        if (count($dbOnlys) == 0) {
            $this->info('Nothing!!');
        } else {
            $this->info('Count:' . count($dbOnlys));
        }
        foreach ($dbOnlys as $table) {
            $this->comment($table);
        }
        $this->info('##################################################');
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

実行すると下記のようにLaravelのModelにしかないものとLaravelのModelにないTableが出力されます。

```
##################################################
Laravel Model Use Table
Count:1
sample

##################################################
Laravel Model Only
Nothing!!

##################################################
Laravel Model Not Exists Tables
Count:1
sample_bk
##################################################
```

これでLaravelでは使用していないテーブルを特定することが可能です。
