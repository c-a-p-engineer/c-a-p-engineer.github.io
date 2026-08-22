---
title: "【Laravel】APIのエラーメッセージ「The given data was invalid.」を多言語か対応する"
date: 2022-11-09T18:00:00+09:00
description: "Laravel のAPIのエラーメッセージ「The given data was invalid.」を多言語か対応する。"
tags: []
categories: []
draft: false
legacySlug: laravel-api-request-validation-message
image: "images/thumbnail/laravel-l-slant.png"
---

# 【Laravel】APIのエラーメッセージ「The given data was invalid.」を多言語か対応する
Laravel のAPIのエラーメッセージ「The given data was invalid.」を多言語か対応する。
~~これは僕がクソ実装されていることを忘れないための記事です。~~

## 前置き
確認環境は Laravel 9 になります。

APIのバリデーションエラー時に `The given data was invalid.` が出力されます。
こちらコード上にハードコーティングされております。
~~こんなクソ実装本当に辞めて欲しい🪓(๑╹ω╹ ๑ )~~

ですので多言語化対応したところでこのエラーメッセージは変わりません。
```php:app/Http/Requests/API/ApiRequest.php {linenos=table,hl_lines=[22]}
<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;

abstract class ApiRequest extends FormRequest
{
    /**
     * Handle a failed validation attempt.
     *
     * @param  Validator  $validator
     * @return void
     *
     * @throws HttpResponseException
     */
    protected function failedValidation(Validator $validator)
    {
        $data = [
            'message' => __('The given data was invalid.'),
            'errors' => $validator->errors()->toArray(),
        ];

        throw new HttpResponseException(response()->json($data, 422));
    }
}
```

## 多言語化対応
ハードコーティングされている箇所を多言語かさせます。
以下のようにして `validation` の言語ファイルから取得するようにします。
```php:app/Http/Requests/API/ApiRequest.php {linenos=table,hl_lines=[22]}
<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;

abstract class ApiRequest extends FormRequest
{
    /**
     * Handle a failed validation attempt.
     *
     * @param  Validator  $validator
     * @return void
     *
     * @throws HttpResponseException
     */
    protected function failedValidation(Validator $validator)
    {
        $data = [
            'message' => __('validation.invalid'),
            'errors' => $validator->errors()->toArray(),
        ];

        throw new HttpResponseException(response()->json($data, 422));
    }
}
```

言語ファイル側には `invalid` のメッセージを追加しておきます。
```php:lang/ja/validation.php {linenos=table,hl_lines=[10]}
<?php

return [
    /*
    |--------------------------------------------------------------------------
    | バリデーションメッセージ
    |--------------------------------------------------------------------------
    |　バリデーションエラーメッセージ
    */
    'invalid' => '指定されたデータは無効です。',
];
```

こうすることにより多言語化対応されます。
