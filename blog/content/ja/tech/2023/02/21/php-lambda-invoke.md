---
title: "【PHP】AWSのlambdaを実行する"
date: 2023-02-21T01:30:00+09:00
description: "PHPでAWSのlambdaを実行する方法メモ"
draft: false
enableToc: true
enableTocContent: true
tags: 
- PHP
- AWS
- AWS Lambda
categories: 
- PHP
image: images/thumbnail/php.png
---

# 【PHP】AWSのlambdaを実行する
PHPでAWSのlambdaを実行する方法メモ

## SDKのインストール
`composer` を利用してAWS SDKをインストールします。
```
composer require aws/aws-sdk-php
```

## Lambda実行クラスコード
実行する際は **PHP側に実行権限を付与** することを忘れないでください。
Lambdaを実行するクラス

```php:AwsLambdaInvoker.php
require 'vendor/autoload.php';

use Aws\Lambda\LambdaClient;

class AwsLambdaInvoker
{
    private $lambda;
    
    /**
     * AWS Lambda
     * @param $region リージョン
     * @param $awsAccessKey AWSアクセスキー
     * @param $awsSecretKey AWSシークレットキー
     */
    public function __construct($region, $awsAccessKey = null, $awsSecretKey = null)
    {

        $param = [
            'region'  => $region, // リージョン
            'version' => '2015-03-31', // SDKバージョン
        ];

        // AWSのキーが渡されたなら設定する
        if (!is_null($awsAccessKey) && !is_null($awsSecretKey)) {
            $param = array_merge(
                $param,
                [
                    'credentials' => [
                        'key' => $awsAccessKey,
                        'secret' => $awsSecretKey
                    ]
                ]
            );
        }
        // AWS Lambdaクライアントの作成
        $this->lambda = new LambdaClient($param);
    }

    /**
     * Lambda実行
     * 
     * @param $functionName 実行Lambda関数名
     * @param $payload Lambdaに渡すjson
     */
    public function invokeLambda(string $functionName, array $payload): array
    {
        // Lambda関数を実行します
        return $this->lambda->invoke([
            'FunctionName' => $functionName, // 実行するLambda関数の名前を指定します
            'Payload' => json_encode($payload) // Lambda関数に渡すJSONペイロードを指定します
        ]);
    }
}
```

### aws設定ファイルを使用する場合
AWSキーを使用しないで `~/.aws/config` から設定を読みに行く場合は以下のようにしてください。
```php
$provider = CredentialProvider::defaultProvider();
$client = LambdaClient::factory([
    'region'  => $region, // リージョン
    'version' => '2015-03-31', // SDKバージョン
    'credentials' => $provider,
]);
```
またどちらも使用しない場合はアタッチされているロールを使用します。


### Lambda実行のオプション
```php
$result = $this->lambda->invoke([
    'ClientContext' => '<string>', // Lambda関数のクライアントコンテキスト情報
    'FunctionName' => '<string>', // REQUIRED Lambda関数名
    'InvocationType' => 'Event|RequestResponse|DryRun', // Lambda実行タイプ Event:非同期 RequestResponse:同期 DryRun:ドライラン
    'LogType' => 'None|Tail', // ログ種類 None:なし Tail:ログあり
    'Payload' => <string || resource || Psr\Http\Message\StreamInterface>, // Lambdaに渡すJSON
    'Qualifier' => '<string>', // Lambda関数のバージョンまたはエイリアス名
]);
```

### 返ってくる値
```php
[
    'StatusCode' => (int), // Lambda関数のステータスコード
    'FunctionError' => (string), // Lambda関数がエラーを返した場合、エラータイプを示す文字列
    'LogResult' => (string), // Lambda関数のログデータ（Base64エンコードされた文字列）
    'Payload' => (string), // Lambda関数が返したJSONペイロード
    'ExecutedVersion' => (string), // 実行されたLambda関数のバージョン
    'SdkResponseMetadata' => [
        // SDKのメタデータ
    ]
]
```

## 実行コード
実際に実行するコード
```php
<?php

try {
    $invoker = new AwsLambdaInvoker('us-west-2');
    $payload = ['message' => 'Hello from PHP!']; // Lambda関数に渡すJSON
    $result = $invoker->invokeLambda('myLambdaFunction', $payload);
    var_dump($result);
} catch (Exception $e) {
    // 例外処理
    echo $e->getMessage();
}
```

## 参考
* <a href="https://docs.aws.amazon.com/ja_jp/sdk-for-php/v3/developer-guide/getting-started_installation.html" target="_blank" rel="nofollow noopener">インストール:AWS SDK for PHPバージョン 3 - AWS SDK for PHP</a>
* <a href="https://docs.aws.amazon.com/aws-sdk-php/v3/api/api-lambda-2015-03-31.html#invoke" target="_blank" rel="nofollow noopener">AWS SDK for PHP 3.x #invoke</a>
