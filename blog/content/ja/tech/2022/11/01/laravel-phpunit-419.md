---
title: "【Laravel】PHPUnit 419 エラー対応"
date: 2022-11-01T04:00:00+09:00
description: "Laravel の PHPUnitで 419 エラーが出た際の対応方法メモ"
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

# 【Laravel】PHPUnit 419 エラー対応
Laravel の PHPUnitで 419 エラーが出た際の対応方法メモ。

419 エラーはCSRFエラーになります。
そのためテスト時にはCSRFチェックをしないようにする必要があります。

## テスト時にCSRFチェックをしない
特定環境でCSRFチェックをしないようします。
`app/Http/Middleware/VerifyCsrfToken.php` に `handle` メソッドを追加します。

```php:app/Http/Middleware/VerifyCsrfToken.php {linenos=table,hl_lines=["18-26"]}
<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as BaseVerifier;

class VerifyCsrfToken extends BaseVerifier
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array
     */
    protected $except = [
        //
    ];

    public function handle($request, \Closure $next)
    {
        // PHPUnit用
        if (env('APP_ENV') !== 'test') {
            return parent::handle($request, $next);
        }

        return $next($request);
    }
}
```

## 参考
* <a href="https://stackoverflow.com/questions/46325790/phpunit-expected-status-code-200-but-received-419-with-laravel/59352800#59352800" target="_blank" rel="nofollow noopener">PHPUnit: Expected status code 200 but received 419 with Laravel - Stack Overflow</a>
