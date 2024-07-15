<?php
// php convert_links.php /workspace/blog/content/ja/tech/2024/01/24/chat-ai.md

// コマンドライン引数からマークダウンファイルのパスを取得
$markdownFile = $argv[1];

// ファイルが存在しない場合はエラーメッセージを表示
if (!file_exists($markdownFile)) {
    echo "ファイルが見つかりません: {$markdownFile}\n";
    exit(1);
}

// マークダウンファイルを読み込む
$content = file_get_contents($markdownFile);

// マークダウンのリンクをHTMLリンクに変換（HTTPとHTTPSの両方に対応）
$convertedContent = preg_replace_callback(
    '/\[(.*?)\]\((https?:\/\/.*?)\)/',
    function ($matches) {
        return '<a href="' . $matches[2] . '" target="_blank" rel="nofollow noopener">' . $matches[1] . '</a>';
    },
    $content
);

// 変換後の内容を同じディレクトリに出力
$outputFile = $markdownFile . ".converted.html";
file_put_contents($outputFile, $convertedContent);

echo "変換完了: {$outputFile}\n";
?>
