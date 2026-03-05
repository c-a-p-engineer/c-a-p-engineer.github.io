---
title: "【PHP】Phalcon DI の get と getShared の違い"
date: 2026-03-05T19:30:00+09:00
description: "Phalcon の DI コンテナで使う get と getShared の違いを、インスタンス生成タイミングと使い分けの観点で実例つきで解説"
draft: false
enableToc: true
enableTocContent: true
tags:
- PHP
- Phalcon
categories:
- PHP
thumbnail: "images/thumbnail/php.png"
image: images/thumbnail/php.png
slug: "phalcon-di-get-vs-getshared"
---

# 【Phalcon】DI の get と getShared の違いを整理する

Phalcon の DI コンテナを使っていると、`$di->get()` と `$di->getShared()` のどちらを使うべきか迷う場面があります。

結論だけ先に書くと次のとおりです。

- `get()` は都度インスタンスを解決する（非共有サービスなら毎回新規生成）
- `getShared()` は同じインスタンスを使い回す

この違いを理解しておくと、不要なオブジェクト生成や状態の混乱を防げます。

## get と getShared の違い

まずは最小コードです。

```php
$di = new \Phalcon\Di\FactoryDefault();

$di->set('requestId', function () {
    return new stdClass();
});

$a = $di->get('requestId');
$b = $di->get('requestId');

var_dump($a === $b); // false（毎回新しいインスタンス）
```

同じサービスを `getShared()` で取得すると、結果は変わります。

```php
$a = $di->getShared('requestId');
$b = $di->getShared('requestId');

var_dump($a === $b); // true（同じインスタンス）
```

## 使い分けの目安

### get() を使う場面

- 毎回クリーンなインスタンスが必要なとき
- 内部状態を持つクラスを使い回したくないとき

例:

- 使い捨ての DTO
- リクエストごとに都度生成したい軽量サービス

### getShared() を使う場面

- 同一リクエスト内で同じ依存を再利用したいとき
- 接続コストが高いオブジェクトを使い回したいとき

例:

- DB 接続
- 設定オブジェクト
- ロガー

## setShared との関係

`setShared()` で登録したサービスは共有サービスとして扱われます。

```php
$di->setShared('config', function () {
    return [
        'appName' => 'sample',
    ];
});

$x = $di->get('config');
$y = $di->get('config');

var_dump($x === $y); // true
```

つまり「共有サービスとして登録するか」「取得時に共有取得するか」の 2 つで挙動が決まります。

## 実務でのおすすめ方針

迷ったら、次のように決めると運用しやすいです。

- 原則 `setShared()` + `get()` で統一し、共有する意図を登録時に明示する
- 都度生成したいサービスのみ `set()` で登録する
- `getShared()` は「この場面では必ず共有にしたい」という意図が強いときに使う

## まとめ

- `get()` は非共有サービスなら毎回新規インスタンス
- `getShared()` は同じインスタンスを再利用
- `setShared()` を使うと `get()` でも共有インスタンスを返す

DI の解決ルールをそろえておくと、バグ調査や保守がかなり楽になります。

## 参考文献

- <a href="https://docs.phalcon.io/5.4/di/" target="_blank" rel="nofollow noopener">Phalcon Documentation - Dependency Injection</a>
