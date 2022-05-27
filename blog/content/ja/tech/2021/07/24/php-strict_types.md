---
title: "【PHP】厳密な型付けをしよう"
date: 2021-07-24T07:30:00+09:00
description: "PHPで厳密な型付けをしてみましょう。"
draft: false
enableToc: true
enableTocContent: true
tags: 
- PHP
categories: 
- PHP
image: images/thumbnail/php.png
---

# 【PHP】厳密な型付けをしよう
PHPは**動的型付け言語**として知られていますが、厳密な型付けが出来ます。
必要、不必要を判断してPHPで厳密な型付けをしてみましょう。

## 環境
* PHP 7.0.0以上
PHP7の時に実装された機能になります。
* <a href="https://www.php.net/manual/ja/migration70.new-features.php" target="_blank" rel="nofollow noopener">PHP 5.6.x から PHP 7.0.x への移行 (新機能)</a>

## 使ってみる
PHPファイルの先頭行に以下を追加。
```php
<?php
declare(strict_types=1);
```

サンプル
```php
<?php
declare(strict_types=1);

function sum(int $a, int $b) {
    return $a + $b;
}

var_dump(sum(1, 2));
var_dump(sum(1.5, 2.5));
```

こうすると `sum(1.5, 2.5)` の箇所は `int`型ではなく、 `float`型になるのでエラーが出ます。

## 注意事項

{{< notice warning >}}
**警告**
内部関数の中からの関数呼び出しは、 strict_types 宣言の影響を受けません。
{{< /notice >}}

<br>

{{< notice info >}}
**注意**
厳密な型付けは、strict モードが有効になったファイルの 内部 から行われる関数呼び出しに適用されます。
そのファイルで宣言された関数への呼び出しに対して適用されるわけではありません。
厳密な型付けが有効になっていないファイルから、厳密な型付けが有効になっているファイルで定義された関数を呼び出した場合は、呼び出し側の好み(型の強制)が尊重され、値は型変換されます。 
{{< /notice >}}

<br>

{{< notice info >}}
**警告**
厳密な型付けは、スカラー型の宣言に対してのみ定義されます。 
{{< /notice >}}

<br>

各種注意事項をまとめると以下になります。
* PHPで用意された内部関数は `strict_types` の影響は受けない。
* 型の強制については呼び出し側が尊重されるので呼び出し側が厳密モードでないなら緩い型変換モードになります。
→実際のプロジェクトで使用する場合は全てのファイルで厳密モードにするのが好ましい
※混在はバグの原因になりやすいため
* スカラー型の宣言に対してのみ

## 参考
* <a href="https://www.php.net/manual/ja/language.types.declarations.php#language.types.declarations.strict" target="_blank" rel="nofollow noopener">厳密な型付け</a>
