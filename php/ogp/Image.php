<?php

class Image
{
    // 文字列を挿入する先の画像
    const TEMPLATE = __DIR__ . '/template.png';

    // フォント
    const FONT = __DIR__ . '/KintoSans-Medium.ttf';

    // 1行で区切る
    const LINE_BYTE = 44;

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
        $x = 30;         // 左からの座標(ピクセル)
        $y = 220 + $size; // 上からの座標(ピクセル)

        // 文字列の分割計算
        preg_match_all('/[a-zA-Z0-9]+|[^a-zA-Z0-9]+/u', $text, $mathes);
        if (!is_null($mathes[0] ?? null)) {
            $tempStr = [
                0 => '',
            ];
            foreach ($mathes[0] as $string) {
                $index = count($tempStr) - 1;

                if (
                    mb_strwidth($string, 'UTF-8') >= self::LINE_BYTE ||
                    mb_strwidth($tempStr[$index] . $string, 'UTF-8') > self::LINE_BYTE
                ) {
                    // 文字列を分解しても制限を超えてしまう場合 or 足しても超える
                    preg_match_all('/[^a-zA-Z0-9]+/u', $string, $tempMatch);

                    if (is_null($tempMatch[0] ?? null) || count($tempMatch[0]) == 0) {
                        // 英数字
                        if (
                            mb_strwidth($tempStr[$index], 'UTF-8') == 0
                            || mb_strwidth($tempStr[$index] . $string, 'UTF-8') < self::LINE_BYTE
                        ) {
                            // 追加
                            $tempStr[$index] .= $string;
                        } else {
                            // 改行して追加
                            $tempStr[$index + 1] = $string;
                        }
                    } else {
                        // 日本語
                        $subPos = self::LINE_BYTE - mb_strwidth($tempStr[$index], 'UTF-8');
                        $subPos = ceil($subPos / 2);
                        $tempStr[$index] .= mb_substr($string, 0, $subPos);
                        $tempStr[$index + 1] = mb_substr($string, $subPos);
                    }
                } else {
                    // 文字列を足しても1行の制限バイト未満
                    $tempStr[$index] .= $string;
                }
            }
            $text = implode(PHP_EOL, $tempStr);
        } else {
            $text = implode(PHP_EOL, mb_str_split($text, 25));
        }

        // 文字列挿入
        imagettftext(
            $image,     // 挿入先の画像
            $size,      // フォントサイズ
            $angle,     // 文字の角度
            $x,         // 挿入位置 x 座標
            $y,         // 挿入位置 y 座標
            $color,     // 文字の色
            self::FONT,  // フォントファイル
            $text
        );
        $dirName = dirname($output);
        if (!file_exists($dirName)) {
            mkdir(dirname($output), '0777', true);
        }
        // ファイル名を指定して画像出力
        imagepng($image, $output);
    }
}
