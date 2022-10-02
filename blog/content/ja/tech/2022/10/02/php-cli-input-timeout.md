---
title: "【PHP】CLI で入力がなかったらタイムアウトさせる方法"
date: 2022-10-02T09:40:00+09:00
description: "PHP で CLI で入力を求めた際、一定時間に入力されなかったらタイムアウトさせる方法"
draft: false
enableToc: true
enableTocContent: true
tags: 
- PHP
categories: 
- PHP
image: images/thumbnail/php.png
---

# 【PHP】CLI で入力がなかったらタイムアウトさせる方法
PHP で CLI で入力を求めた際、一定時間に入力されなかったらタイムアウトさせる方法

## stream_selectを使用する
<a href="https://www.php.net/manual/ja/function.stream-select.php" target="_blank" rel="nofollow noopener">stream_select</a> を使用して実現させます。

```php
 stream_select(
    ?array &$read,
    ?array &$write,
    ?array &$except,
    ?int $seconds,
    ?int $microseconds = null
): int|false
```

第4引数にタイムアウト秒を設定することができるのでそれを利用します。

## 入力がなかったらタイムアウトさせる
実装は以下のようになります。
```php
<?php
$stdin = fopen('php://stdin', 'r');
$read = [$stdin];
$write = $except = [];
$timeout = 5;

echo "Please Input Yes/No ... (Input Time limit {$timeout} sec)" . PHP_EOL;

if (stream_select($read, $write, $except, $timeout)) {
    // 入力値受け取り
    $line = trim(fgets($stdin));

    // 入力値確認
    switch (strtolower($line)) {
        case 'y':
        case 'yes':
            echo 'Input Yes' . PHP_EOL;
            break;
        case 'n':
        case 'no':
            echo 'Input No' . PHP_EOL;
            break;
        default:
            echo 'Input Other than Yes/No' . PHP_EOL;
            break;
    }
} else {
    // 入力なし タイムアウト
    echo "timeout" . PHP_EOL;
}
```

これで一定時間入力がなかった場合、タイムアウトを発生させて処理を終わらせることができます。

## 参考
* <a href="https://stackoverflow.com/questions/61224265/php-how-to-track-the-timeout-of-the-absence-of-input-data" target="_blank" rel="nofollow noopener">stdin - PHP: How to track the timeout of the absence of input data? - Stack Overflow</a>
