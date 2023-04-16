---
title: "【PHP】CLIで簡単にテキストに色を付ける方法"
date: 2023-04-17T13:00:00+09:00
description: "PHP CLI で簡単にテキストに色を付ける方法"
draft: false
enableToc: true
enableTocContent: true
tags: 
- PHP
categories: 
- PHP
image: images/thumbnail/php.png
---

# 【PHP】CLIで簡単にテキストに色を付ける方法
PHP で CLI 実行時に少々色を付けたいなと思って作ってみました。
ANSIエスケープコードを使用することでターミナル上で色が付きます。
## サンプルコード
サンプルコードです。

```php:CliColor.php
<?php

class CliColor
{
    public const BLACK = 'black';
    public const RED = 'red';
    public const GREEN = 'green';
    public const YELLOW = 'yellow';
    public const BLUE = 'blue';
    public const MAGENTA = 'magenta';
    public const CYAN = 'cyan';
    public const WHITE = 'white';
    public const BRIGHT_BLACK = 'bright_black';
    public const BRIGHT_RED = 'bright_red';
    public const BRIGHT_GREEN = 'bright_green';
    public const BRIGHT_YELLOW = 'bright_yellow';
    public const BRIGHT_BLUE = 'bright_blue';
    public const BRIGHT_MAGENTA = 'bright_magenta';
    public const BRIGHT_CYAN = 'bright_cyan';
    public const BRIGHT_WHITE = 'bright_white';
    public const BG_BLACK = 'bg_black';
    public const BG_RED = 'bg_red';
    public const BG_GREEN = 'bg_green';
    public const BG_YELLOW = 'bg_yellow';
    public const BG_BLUE = 'bg_blue';
    public const BG_MAGENTA = 'bg_magenta';
    public const BG_CYAN = 'bg_cyan';
    public const BG_WHITE = 'bg_white';
    public const BG_BRIGHT_BLACK = 'bg_bright_black';
    public const BG_BRIGHT_RED = 'bg_bright_red';
    public const BG_BRIGHT_GREEN = 'bg_bright_green';
    public const BG_BRIGHT_YELLOW = 'bg_bright_yellow';
    public const BG_BRIGHT_BLUE = 'bg_bright_blue';
    public const BG_BRIGHT_MAGENTA = 'bg_bright_magenta';
    public const BG_BRIGHT_CYAN = 'bg_bright_cyan';
    public const BG_BRIGHT_WHITE = 'bg_bright_white';
    public const RESET = 'reset';

    /**
     * 色定義
     */
    private const COLORS = [
        self::BLACK => "\033[0;30m",
        self::RED => "\033[0;31m",
        self::GREEN => "\033[0;32m",
        self::YELLOW => "\033[0;33m",
        self::BLUE => "\033[0;34m",
        self::MAGENTA => "\033[0;35m",
        self::CYAN => "\033[0;36m",
        self::WHITE => "\033[0;37m",
        self::BRIGHT_BLACK => "\033[1;30m",
        self::BRIGHT_RED => "\033[1;31m",
        self::BRIGHT_GREEN => "\033[1;32m",
        self::BRIGHT_YELLOW => "\033[1;33m",
        self::BRIGHT_BLUE => "\033[1;34m",
        self::BRIGHT_MAGENTA => "\033[1;35m",
        self::BRIGHT_CYAN => "\033[1;36m",
        self::BRIGHT_WHITE => "\033[1;37m",
        self::BG_BLACK => "\033[40m",
        self::BG_RED => "\033[41m",
        self::BG_GREEN => "\033[42m",
        self::BG_YELLOW => "\033[43m",
        self::BG_BLUE => "\033[44m",
        self::BG_MAGENTA => "\033[45m",
        self::BG_CYAN => "\033[46m",
        self::BG_WHITE => "\033[47m",
        self::BG_BRIGHT_BLACK => "\033[100m",
        self::BG_BRIGHT_RED => "\033[101m",
        self::BG_BRIGHT_GREEN => "\033[102m",
        self::BG_BRIGHT_YELLOW => "\033[103m",
        self::BG_BRIGHT_BLUE => "\033[104m",
        self::BG_BRIGHT_MAGENTA => "\033[105m",
        self::BG_BRIGHT_CYAN => "\033[106m",
        self::BG_BRIGHT_WHITE => "\033[107m",
        self::RESET => "\033[0m",
    ];

    /**
     * 指定された色でテキストを装飾した文字列を返します。
     *
     * @param string|null $text 色を付けるテキスト。
     * @param string|array|null $colors テキストに適用する色。単一の色または複数の色の配列。
     * @return string 色付きテキストの文字列。
     */
    public static function text(?string $text, string | array | null $colors = null): string
    {
        if (!is_array($colors)) {
            $colors = [$colors];
        }

        $coloredText = "";
        foreach ($colors as $color) {
            if (array_key_exists($color, self::COLORS)) {
                $coloredText .= self::COLORS[$color];
            }
        }

        return $coloredText . $text . self::COLORS[self::RESET];
    }
}
```

## 実行
試しに実行してみます。
```php
# 通常出力
echo CliColor::text("Hello, World!") . PHP_EOL;
# 赤い文字
echo CliColor::text("Hello, World!", CliColor::RED) . PHP_EOL;
# 白文字、赤背景
echo CliColor::text("Hello, World!", [CliColor::WHITE, CliColor::BG_RED]) . PHP_EOL;
```

下のように出力されます。
![php-cli-text-color](/tech/2023/04/17/php-cli-text-color/php-cli-text-color.png "php-cli-text-color") 


## 参考
* <a href="https://qiita.com/PruneMazui/items/8a023347772620025ad6" target="_blank" rel="nofollow noopener">ANSIエスケープシーケンス チートシート - Qiita</a>

