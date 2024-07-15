<?php
require __DIR__ . '/Image.php';
require __DIR__ . '/ProgressBar.php';

// ファイル取得
function getFileList(string $dir): array
{
    $files = glob(rtrim($dir, '/') . '/*');
    $list = array();
    foreach ($files as $file) {
        if (is_file($file)) {
            $list[] = $file;
        }
        if (is_dir($file)) {
            $list = array_merge($list, getFileList($file));
        }
    }
    return $list;
}

// ディレクトリ削除
function rmrf(string $dir): void
{
    if (is_dir($dir) and !is_link($dir)) {
        array_map('rmrf',   glob($dir . '/*', GLOB_ONLYDIR));
        array_map('unlink', glob($dir . '/*'));
        rmdir($dir);
    }
}

// blog ディレクトリ
$blogDir = realpath(__DIR__ . '/../../blog/');

// コンテンツディレクトリ
$contentDir = realpath($blogDir . '/content/ja/');

// OGP画像ディレクトリ
$ogpDir = realpath($blogDir . '/static/ogp/');

// 記事
$files = getFileList(realpath($contentDir . '/tech/'));

// 除外ファイル
$exclude = ['_index.md'];

// 実行前にファイルを削除
rmrf($ogpDir);


$total = count($files);
$i = 0;
// OGP用ファイル全生成
foreach ($files as $file) {
    // 除外ファイル判定
    $basename  = basename($file);
    if (in_array($basename, $exclude, true)) {
        ProgressBar::progress(round(++$i / $total  * 100, 0));
        continue;
    }

    // ファイル取得
    $markdown = file_get_contents($file);
    $markdown = explode(PHP_EOL, $markdown);
    foreach ($markdown as $value) {
        // タイトル行取得
        if (!preg_match('/title: (.*)$/', $value, $mathes)) {
            // タイトル行ではない
            continue;
        }

        $title = $mathes[1] ?? null;
        $title = trim($title, '"');

        if (is_null($title)) {
            // 正規表現でタイトルが取得できない
            break;
        }

        // タイトルの生成
        $dir = dirname(str_replace($contentDir, '', $file));
        $output = $blogDir . '/static/ogp' . $dir . '/' . basename($file, '.md') . '.png';
        Image::create($output, $title);
    }
    ProgressBar::progress(round(++$i / $total * 100, 0));
}
