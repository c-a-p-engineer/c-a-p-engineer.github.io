---
title: "【Laravel】l5-swagger でAPI仕様書を簡単に作ろう"
date: 2022-12-03T02:00:00+09:00
description: "Laravel で l5-swagger を使用して簡単にSwaggerのAPI仕様書を作る"
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

# 【Laravel】l5-swagger でAPI仕様書を簡単に作ろう
Laravel で l5-swagger を使用して簡単にSwaggerのAPI仕様書を作る

## l5-swagger
l5-swaggerを使用して簡単にAPI仕様書を作ります。
<a href="https://github.com/DarkaOnLine/L5-Swagger">DarkaOnLine/L5-Swagger</a>

### インストール
composer を使用してインストールします。
```
composer require "darkaonline/l5-swagger"
```

### Swaggerを書く
VSCodeであればこちらのプラグインを使用すると色がついて書きやすいです。
<a href="https://marketplace.visualstudio.com/items?itemName=qvtec3.swagger-php-annotation" target="_blank" rel="nofollow noopener">Swagger-PHP Annotation</a>
記法としては <a href="https://zircote.github.io/swagger-php/" target="_blank" rel="nofollow noopener">Swagger-PHP</a> の記法で書いていきます。

API情報やサーバー情報、共通スキーマは `/app/Http/Controllers/Swagger.php` を作成して記載するのが良いです。
```php:/app/Http/Controllers/Swagger.php
<?php

namespace App\Http\Controllers;

 /**
 * API情報
 * @OA\Info(
 *     title="API Example",
 *     description="Api",
 *     version="1.0.0",
 * )
 *
 * サーバー情報
 * @OA\Server(
 *   description="OpenApi host",
 *   url="http://localhost:8000/api"
 * )
 * 
 * セキュリティスキーマ
 * @OA\SecurityScheme(
 *   securityScheme="BearerAuth",
 *   type="apiKey",
 *   in="header",
 *   name="api_token"
 * )
 * 
 * 作成日
 * @OA\Schema(
 *   schema="created_at",
 *   description="Created At",
 *   type="string",
 *   format="date-time",
 *   example="2017-07-21T17:32:28Z"
 * )
 *
 */
class Swagger
{
}
```

Getのサンプル
```php:/app/Http/Controllers/Api/SampleController.php
class SampleController {
    /**
     * @OA\Get(
     *     path="/api/data.json",
     *     @OA\Response(response="200",　description="The data")
     *     @OA\Response(response=401, description="Unauthorized"),
     *     @OA\Response(response=403, description="Forbidden"),
     *     @OA\Response(response=422, description="Unprocessable Entity"),
     * )
     */
    public function getData() {
        // ...
    }
}
```

ModelをSchemaとして定義する。<br>こうすることで Model のスキーマを再利用しやすい状態になります。
```php:/app/Model/User.php
<?php

namespace App\Models;

/**
 *  @OA\Schema(
 *      schema="User",
 *      type="object",
 *      description="User Model",
 *      @OA\Property(
 *          property="id",
 *          description="ID",
 *          type="integer",
 *          format="int64",
 *          example="1"
 *      ),
 *      @OA\Property(
 *          property="name",
 *          description="Name",
 *          type="integer",
 *          format="int64",
 *          example="1"
 *      )
 * )
 *
 * @package App\Models
 */
class User extends BaseModel
{
}
```

Postのサンプル。
Loginの書き方として `user/login` にPOSTして `User`スキーマと `created_at` を組み合わせて返すようになっています。
```php:/app/Http/Controllers/Api/SampleController.php
class SampleController {
    /**
     *  @OA\Post(
     *      tags={"User"},
     *      path="/user/login",
     *      summary="User Login",
     *      description="User Login",
     *      @OA\RequestBody(
     *          required=true,
     *          @OA\JsonContent(
     *              type="object",
     *              required={"email", "password"},
     *              @OA\Property(
     *                  property="email",
     *                  type="string",
     *                  example="example@example.org",
     *                  description="Email"
     *              ),
     *              @OA\Property(
     *                  property="password",
     *                  type="string",
     *                  example="p@ssw0rd",
     *                  description="Password"
     *             )
     *          ),
     *      ),
     *      @OA\Response(
     *        response=200,
     *        description="OK",
     *        @OA\JsonContent(
     *           @OA\Property(
     *             property="account",
     *             allOf={
     *                 @OA\Schema(ref="#/components/schemas/User"),
     *                 @OA\Schema(
     *                      @OA\Property(
     *                          property="created_at",
     *                          oneOf={@OA\Schema(ref="#/components/schemas/created_at")}
     *                      )
     *                 ),
     *              }
     *          ),
     *        )
     *      ),
     *      @OA\Response(response=401, description="Unauthorized"),
     *      @OA\Response(response=403, description="Forbidden"),
     *      @OA\Response(response=422, description="Unprocessable Entity"),
     *  )
     */
    public function login() {
        // ...
    }
}
```

API Tokenを付けさせる。
以下を参考として持ってきています。
<a href="https://github.com/DarkaOnLine/L5-Swagger" target="_blank" rel="nofollow noopener">How can i write this JSON swagger-php below with annotations?</a>

```php
/**
 *     @OA\SecurityScheme(
 *         securityScheme="bearerAuth",
 *         type="http",
 *         scheme="bearer",
 *         description="Entrer le token JST"
 *     )
 */
```

```php
/**
 * @OA\Get(
 *     path="/api/endpoint",
 *     ...
 *     security={{ "bearerAuth": {} }}
 * )
 */
```

### 生成
以下のコマンドでドキュメントが生成されます。
生成場所は `storage/api-docs/api-docs.json` に生成されます。
```
php artisan l5-swagger:generate
```

http://localhost/api/documentation に接続するとSwaggerUIで確認ができます。（URLは自分の環境にあったものに読み替えてください。
VSCodeをお使いでしたら <a href="https://marketplace.visualstudio.com/items?itemName=Arjun.swagger-viewer" target="_blank" rel="nofollow noopener">Swagger Viewer</a> でも簡単に確認できます。


以下の設定を入れておくとURLを開くと自動的に生成してくれるようです。
```conf:.env
L5_SWAGGER_GENERATE_ALWAYS=true
```

### 設定
各種設定を行いたい場合は以下のコマンドで設定ファイルが `/backend/config/l5-swagger.php` 作成されます。
作成された設定の中をいじれば生成場所などが変更可能です。
```
php artisan vendor:publish --provider "L5Swagger\L5SwaggerServiceProvider"
```

## メモ
Swaggerをいじっている時、リアルタイムにエラーが出ないので苦肉の策として以下のように生成コマンドを無限ループさせることによって時間差はありますがにエラーを検知できるようにしました。
```bash
while true; do php artisan l5-swagger:generate;date;done
```

## 参考
* <a href="https://github.com/DarkaOnLine/L5-Swagger" target="_blank" rel="nofollow noopener">DarkaOnLine/L5-Swagger</a>
