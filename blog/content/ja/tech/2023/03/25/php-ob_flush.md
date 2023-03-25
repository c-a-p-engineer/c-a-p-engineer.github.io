---
title: "【PHP】ob_flushを使用して1秒毎に時刻を表示する方法"
date: 2023-03-25T16:30:00+09:00
description: "PHP で ob_flush を使用して1秒毎に時刻を表示する方法"
draft: false
enableToc: true
enableTocContent: true
tags: 
- PHP
categories: 
- PHP
image: images/thumbnail/php.png
---

# 【PHP】ob_flushを使用して1秒毎に時刻を表示する方法
PHP で `ob_flush` を使用して1秒毎に時刻を表示する方法。
この方法は、ウェブページ上でリアルタイムな情報を表示する際に役立ちます。

## サンプルコード
サンプルコードです。
1秒毎に1分間、時刻を出力します。
```php:time_stream.php
<?php
// 実行時間の無制限  
set_time_limit(0);
// 出力バッファクリア  
ob_start();
for ($i = 0; $i < 60; $i++) {
    //　時刻表示
    echo date('Y/m/d H:i:s') . '\n';
    ob_flush();
    flush();
    sleep(1);
}
ob_end_flush();
```

## 関数説明
各関数の簡単な説明です。
* `ob_start`
この関数は、出力バッファリングを開始します。
出力バッファリングを有効にすると、スクリプトから出力されるデータが一時的にバッファに保存され、特定の条件が満たされた場合や明示的にフラッシュされるまでクライアントに送信されません。
これにより、ページの一部を先に送信するなど、より柔軟な出力制御が可能になります。
* `ob_flush`
この関数は、現在の出力バッファの内容をクライアントに送信し、バッファをクリアします。
この関数を使用すると、スクリプトの実行中にバッファの内容を段階的にクライアントに送信できます。
* `flush`
この関数は、出力バッファをシステムにフラッシュし、実際にクライアントにデータを送信します。
`flush` 関数は、`ob_flush` と組み合わせて使用することが一般的です。
`ob_flush` で出力バッファの内容を送信した後、`flush` を使用してシステムにフラッシュし、データをクライアントに送信します。
* `ob_end_flush`
この関数は、出力バッファリングを終了し、バッファ内の残りのデータをクライアントに送信します。
スクリプトの最後にこの関数を呼び出すことで、バッファリングを終了し、すべてのデータがクライアントに送信されることを確認できます。

## 参考
* <a href="https://www.php.net/manual/ja/function.ob-start.php" target="_blank" rel="nofollow noopener">PHP: ob_start - Manual</a>
* <a href="https://www.php.net/manual/ja/function.ob-flush.php" target="_blank" rel="nofollow noopener">PHP: ob_flush - Manual</a>
* <a href="https://www.php.net/manual/ja/function.flush.php" target="_blank" rel="nofollow noopener">PHP: flush - Manual</a>
* <a href="https://www.php.net/manual/ja/function.ob-end-flush.php" target="_blank" rel="nofollow noopener">PHP: ob_end_flush - Manual</a>
