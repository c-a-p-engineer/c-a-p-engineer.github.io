---
title: "【Laravel】データ保存時に created_by, updated_by, delete_by を自動的に追加する方法"
date: 2022-10-27T18:00:00+09:00
description: "Laravelでデータ保存時に created_by, updated_by, delete_by  の登録者、更新者、削除者を自動的に追加する方法"
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

# 【Laravel】データ保存時に created_by, updated_by, delete_by を自動的に追加する方法
Laravelでデータ保存時に `created_by`, `updated_by`, `delete_by` の登録者、更新者、削除者を自動的に追加する方法

## サンプル
`boot` メソッドに各イベント時の動作を設定します。
`creating`, `updating`, `saving`, `deleting` のイベント時に設定されています。

ただ1つ問題があり `softDelete` の動作です。
`softDelete` は `delete` 実行時に `deleted_at` だけを更新するようになっています。
そのため `deleting` に関しては `$model->update()` をして明示的に更新を行う必要があります。

```php:app/Models/SampleModel.php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class SampleModel extends Model
{
    public static function boot(): void
    {
        parent::boot();
        static::creating(function ($model) {
            $model->created_by = Auth::user()->id ?? null;
        });
        static::updating(function ($model) {
            $model->updated_by = Auth::user()->id ?? null;
        });
        static::saving(function ($model) {
            $model->updated_by = Auth::user()->id ?? null;
        });
        static::deleting(function ($model) {
            $model->deleted_by = Auth::user()->id ?? null;
            $model->update();
        });
    }
}
```

## メモ
Observerでやる方法もあります。
<a href="https://laracasts.com/discuss/channels/laravel/how-to-automaticly-update-updated-by-created-by-fields-using-eloquent" target="_blank" rel="nofollow noopener">How to automaticly update updated_by, created_by fields using Eloquent?</a>

## 参考
* <a href="https://laracasts.com/discuss/channels/general-discussion/where-should-i-set-a-created-by-to-the-users-id" target="_blank" rel="nofollow noopener">Where should I set a created_by to the user's ID?</a>
