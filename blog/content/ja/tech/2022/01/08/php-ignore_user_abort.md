---
title: "【PHP】ignore_user_abortで接続が切れても処理を実行させ続ける"
date: 2022-01-08T15:00:00+09:00
description: "ignore_user_abortを使用すると接続が切れても処理を実行させ続ける事が出来ます。"
draft: false
enableToc: true
enableTocContent: true
tags: 
- PHP
categories: 
- PHP
image: images/thumbnail/php.png
---

# 【PHP】ignore_user_abortで接続が切れても処理を実行させ続ける。
PHPは接続が切られると処理が中断させられますが 'ignore_user_abort' を使用すると接続が切れても処理を実行させ続ける事ができます。
<a href="https://www.php.net/manual/ja/function.ignore-user-abort.php" target="_blank" rel="nofollow noopener">PHP: ignore_user_abort - Manual</a>

{{< notice warning >}}
**注意**
ブラウザからの接続が切れても裏でプロセスが走り続けるので使い所によってはプロセスが大量に発生する可能性があります。
それだけに使い所が難しいものになると思っています。
{{< /notice >}}

## サンプル
公式からのサンプルを元にしています。
<a href="https://www.php.net/manual/ja/function.ignore-user-abort.php#example-3497" target="_blank" rel="nofollow noopener">PHP: ignore_user_abort - Manual#example1</a>

```php
<?php
// 接続が切れてもプロセスを実行
ignore_user_abort(true);
// タイムアウトなし
set_time_limit(0);

echo 'PHP における接続ハンドリングのテスト';

$file = 'log.txt'
file_put_contents($file, 'START\n');
// 無限ループ
while(1)
{
    switch (connection_status()) {
        case CONNECTION_NORMAL:
            // アクティブ
            file_put_contents($file, 'ACTIVE\n');
            break;
        case CONNECTION_ABORTED:
            // ブラウザ切断
            // 無限ループから抜ける
            file_put_contents($file, 'ABORTED\n');
            break 2;
        case CONNECTION_TIMEOUT:
            // PHP タイムアウト
            // 無限ループから抜ける
            file_put_contents($file, 'TIMEOUT\n');
            break 2;
        default:
            // その他
            break;
    }
    // 10 秒間お休み
    file_put_contents($file, 'SLEEP\n');
    sleep(10);
}

// TODO
file_put_contents($file, 'END\n');
```

これで接続が中断されてもステータスを受け取ってログを書き込みに来ます。
これを使用すれば、たとえば処理の途中切断を受け取ったらログを書き込む、DBをロールバックさせるなど、さまざまなことが可能になります。

## 参考
* <a href="https://www.php.net/manual/ja/function.ignore-user-abort.php" target="_blank" rel="nofollow noopener">PHP: ignore_user_abort - Manual</a>
* <a href="https://www.php.net/manual/ja/function.connection-status.php" target="_blank" rel="nofollow noopener">PHP: connection_status - Manual</a>
