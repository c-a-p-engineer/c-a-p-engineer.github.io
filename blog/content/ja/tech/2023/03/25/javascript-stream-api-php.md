---
title: "【Javascript】Stream API を使って PHP から現在時刻を表示するサンプル"
date: 2023-03-25T16:00:00+09:00
description: "JavaScriptのStreams APIとPHPを使って、1秒ごとに時刻を更新する方法を説明します。"
draft: false
enableToc: true
enableTocContent: true
tags: 
- JavaScript
categories: 
- JavaScript
image: images/thumbnail/javascript.png
---

# 【Javascript】Stream API を使って PHP から現在時刻を表示するサンプル
JavaScriptのStreams APIとPHPを使って、1秒ごとに時刻を更新する方法を説明します。
サーバー側で1秒ごとに時刻を生成し、ブラウザ側でその時刻をリアルタイムで表示する方法を紹介します。

これを使うことでサーバー側の処理状況などHTML側でリアルタイムに受け取って進行状況などを表示することができるかと思います。

## サンプルコード
PHPとHTMLのサンプルコードです。

### PHP
PHPの処理です。
無限ループを実行し、1秒ごとに現在の時刻を送信します。

```php:time_stream.php
<?php
// 実行時間の無制限  
set_time_limit(0);
// 出力バッファクリア  
ob_start();
while (true) {
    //　時刻表示
    echo date('Y/m/d H:i:s') . '\n';
    ob_flush();
    flush();
    sleep(1);
}
```

### HTML
HTML側の処理です。
Javascriptも一緒に入っております。
1秒毎に更新されるデータを受け取って画面に表示されるようにしております。

```html:index.html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>時刻表示</title>
</head>
<body>
    <div id="time">時刻を取得中...</div>
    <script>
        async function fetchTimeStream() {
            const response = await fetch('time_stream.php');
            const reader = response.body.getReader();
            const decoder = new TextDecoder('utf-8');
            let buffer = '';

            while (true) {
                const { value, done } = await reader.read();
                if (done) break;
                // ストリームを受け取る
                buffer += decoder.decode(value, { stream: true });

                const lines = buffer.split('\n');
                if (lines.length > 1) {
                    const time = lines.shift();
                    buffer = lines.join('\n');
                    document.getElementById('time').innerText = `現在の時刻: ${time}`;
                }
            }
        }

        fetchTimeStream();
    </script>
</body>
</html>
```

## 参考
* <a href="https://developer.mozilla.org/ja/docs/Web/API/Streams_API" target="_blank" rel="nofollow noopener">ストリーム API - MDN Web Docs</a>
