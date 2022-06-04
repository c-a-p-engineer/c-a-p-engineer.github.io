---
title: "【PHP】CLIで進捗表示を行うプログレスバーを出力する方法"
date: 2022-06-04T15:00:00+09:00
description: "PHP の CLI で進捗表示を行うプログレスバーを出力する方法メモ"
draft: false
enableToc: true
enableTocContent: true
tags: 
- PHP
categories: 
- PHP
image: images/thumbnail/php.png
---

# 【PHP】CLIで進捗表示を行うプログレスバーを出力する方法
PHP の CLI で進捗表示を行うプログレスバーを出力する方法メモ

## キャリッジリターンを使用する
キャリッジリターンは行末から行頭に戻すコードです。
> 行末から行頭に戻す復帰コード
* <a href="https://ja.wikipedia.org/wiki/%E3%82%AD%E3%83%A3%E3%83%AA%E3%83%83%E3%82%B8%E3%83%BB%E3%83%AA%E3%82%BF%E3%83%BC%E3%83%B3" target="_blank" rel="nofollow noopener">キャリッジ・リターン - Wikipedia</a>

これをすると以下のようにすると今までの出力の行頭に移動して出力済みの文字を上書きを行う訳です。
```php
<?php
echo "12345";
echo "\r";
echo "6789";
echo PHP_EOL;
```

これを実行すると結果は `67895` と表示され `1234` までは上書きを行ってくれるようです。

そういう際はスペースを利用して前出力の値をスペースで上書きを行ってしまいましょう。

```php
<?php
echo "12345";
echo "\r";
echo "6789 ";
echo PHP_EOL;
```

## バックスペースを利用する
バックスペースを利用することでカーソルを1つ戻すことが出来ます。

これをすると以下のようにすると今までの出力の行頭に移動して出力済みの文字を上書きを行う訳です。
```php
echo '987654321';
echo "\r";
echo "1234     \x08\x08\x08\x08\x08";
echo PHP_EOL;
```

5つのスペースで文字を上書きしてからバックスペース5つでカーソルは `1234` の末尾に来ます。


## サンプル
上記でバックスペースを説明させていただきましたが、今回は使用しない方法で良いサンプルがありましたのでそちらの方法を使用します。
<a href="https://gist.github.com/anon5r/8434d07da1301af8a6601711a35c1a7e" target="_blank" rel="nofollow noopener">コマンドラインでの進捗状況（プログレスバー）を表示する（PHP）</a>

以下を実行すると `Processing...  | [####################]100%` というプログレスバーが出力されます。
これでCLI上でのPHPの実行の進捗具合がわかりやすくなります。
```php:ProgressBar.php
<?php
/**
 * ProgressBar Display Class
 */
class ProgressBar
{
    // Progress Symbols
    private const PROGRESS_SYMBOL = ['|', '/', '-', '\\'];

    /**
     * Progress Output
     *
     * @param integer $progress
     * @return void
     */
    public static function progress(int $progress): void
    {
        echo "\r";
        $block = str_repeat('#', floor($progress / 5));
        printf('Processing...  %s [%-20s]%3d%%', self::PROGRESS_SYMBOL[$progress % count(self::PROGRESS_SYMBOL)], $block, $progress);
        flush();

        if ($progress >= 100) {
            echo PHP_EOL;
        }
    }
}

// 実行する
$total = 100;
$count = 0;
for ($i = 0; $i < $total; $i++) {
    $count = $i + 1;

    // 進捗パーセンテージ計算
    $progress = ($count / $total * 100);
    ProgressBar::progress(round($progress, 0));

    // 表示用に適当なスリープ
    usleep(100000);
}
```
## 参考
* <a href="https://qiita.com/ProjectICKX/items/05e343fc762a93cda94a" target="_blank" rel="nofollow noopener">PHP CLIでプログレスバーを実現する - Qiita</a>
* <a href="https://gist.github.com/anon5r/8434d07da1301af8a6601711a35c1a7e" target="_blank" rel="nofollow noopener">コマンドラインでの進捗状況（プログレスバー）を表示する（PHP）</a>
