<?php

class Image
{
    // 文字列を挿入する先の画像
    const TEMPLATE = __DIR__ . '/template.png';

    // 挿入する文字列
    const FONT = __DIR__ . '/KintoSans-Medium.ttf';

    static function create(string $output, string $text)
    {
        // コピー先画像作成
        $image = imagecreatefrompng(self::TEMPLATE);

        // 挿入する文字列の色(白)
        $color = imagecolorallocate($image, 0, 0, 0);

        // 挿入する文字列のサイズ(ピクセル)
        $size = 36;

        // 挿入する文字列の角度
        $angle = 0;

        // 挿入位置
        $x = 20;         // 左からの座標(ピクセル)
        $y = 220 + $size; // 上からの座標(ピクセル)

        // 文字列挿入
        imagettftext(
            $image,     // 挿入先の画像
            $size,      // フォントサイズ
            $angle,     // 文字の角度
            $x,         // 挿入位置 x 座標
            $y,         // 挿入位置 y 座標
            $color,     // 文字の色
            self::FONT,  // フォントファイル
            implode(PHP_EOL, mb_str_split($text, 25))
        );
        // ファイル名を指定して画像出力
        echo realpath(dirname($output)) . PHP_EOL;
        mkdir(dirname($output), '0777', true);
        imagepng($image, $output);
    }
}
