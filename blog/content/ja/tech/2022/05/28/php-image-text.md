---
title: "【PHP】画像に文字を追加する"
date: 2022-05-28T08:30:00+09:00
description: "PHPで画像に文字を追加します。"
draft: false
enableToc: true
enableTocContent: true
tags: 
- PHP
categories: 
- PHP
image: images/thumbnail/php.png
---

# 【PHP】画像に文字を追加する
PHPで画像に文字を追加します。

## 環境
* PHP8.1

## 前準備
* 画像処理（GD）ライブラリの導入
  * <a href="https://www.php.net/manual/ja/book.image.php" target="_blank" rel="nofollow noopener">PHP: GD - Manual</a>
* フォントの用意
  * <a href="https://github.com/ookamiinc/kinto" target="_blank" rel="nofollow noopener">ookamiinc/kinto: 均等 — Kinto is a Japanese font family adapted to match size &amp; balance with Latin characters in user interfaces. A project based off Google Noto fonts.</a>
* 文字列を追加するテンプレート画像の用意

GDライブラリは標準で入っていないので環境によっては面倒かとは思います。

## コード
```php:Image.php
<?php

class Image
{
    // フォント
    const FONT = __DIR__ . '/KintoSans-Medium.ttf';

    /**
     * 画像に文字列を追加する
     * 
     * @param string $templatePath 文字を追加する画像のファイルパス
     * @param string $outputPath 画像の出力先
     * @param string $text 画像に追加文字列
     * @return void
     */
    static function create(string $templatePath, string $outputPath, string $text): void
    {
        // 画像を読み込んで生成
        // imagecreatefromXXXは取り扱う画像毎に違うので注意
        $image = imagecreatefrompng($templatePath);

        // 文字の色を生成
        $color = imagecolorallocate($image, 0, 0, 0);

        // 文字のサイズ（px
        $size = 36;

        // 文字の角度
        $angle = 0;

        // 文字位置設定
        // 左からの座標（px
        $x = 20;
        // 上からの座標(px
        $y = 220 + $size;

        // 文字列挿入
        imagettftext(
            $image,     // 挿入先の画像
            $size,      // フォントサイズ
            $angle,     // 文字の角度
            $x,         // 位置 x 座標
            $y,         // 位置 y 座標
            $color,     // 文字の色
            self::FONT, // フォントファイル
            implode(PHP_EOL, mb_str_split($text, 25))
        );

        $dirName = dirname($output);
        if(!file_exists($dirName)){
            // 指定されたディレクトリがなければを生成
            mkdir(dirname($output), '0777', true);
        }
        // ファイル名を指定して画像出力
        imagepng($image, $output);
    }
}

Image::create('template.png', 'sample.png', 'Sampleだよ！');
```

これで画像が生成されます。
