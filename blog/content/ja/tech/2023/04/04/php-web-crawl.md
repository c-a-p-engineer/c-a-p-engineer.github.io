---
title: "【PHP】Webクローラーを作ってみた"
date: 2023-04-04T18:40:00+09:00
description: "PHP で自作のWebクローラーを作ってみた"
draft: false
enableToc: true
enableTocContent: true
tags: 
- PHP
categories: 
- PHP
image: images/thumbnail/php.png
---

# 【PHP】Webクローラーを作ってみた
PHP で自作のWebクローラーを作ってみた。

## Webクローラー説明
WebクローラーはWebを巡回するものですが今回作ったのは以下のようなものです。
* 対象のURLからのリンクを辿る
* 特定のURL配下のものだけしか辿らない（無限にリンク先を辿ってしまうため
* タイトルとURLを保存する

本来のWebクローラーとは少々違いますが色々使えそうなのでブログにメモしておこうとこの記事を書いてます。

{{< notice warning >}}
**警告**
Webクローラーを扱う際には接続先に負荷がかかる可能性、短期間の大量アクセスでのアクセス禁止にされたりする可能性があります。
なので使用する際はご注意ください。
{{< /notice >}}

本来もっと高速化しようかと考えていましたが色々な危険のため、やめました。
必要があれば `sleep` などを入れて調整してください。

## サンプルコード
サンプルコードはこちらです。
今回はパッケージなどを入れないできるだけシンプルな形で作りました。

一応クラス化してあります。
```php:WebCrawl.php
<?php
/**
 * Webクローラー
 */
class WebCrawl
{
    /**
     * ベースURL
     *
     * @var string
     */
    private string $baseUrl;

    /**
     * 取得URLリスト
     *
     * @var array
     */
    public array $internalLinks = [];

    /**
     * コンストラクタ
     *
     * @param string $baseUrl ベースURL
     */
    public function __construct(string $baseUrl)
    {
        $this->baseUrl = $baseUrl;
    }

    /**
     * クロール実行
     *
     * @param string $url クロール対象URL
     * @return void
     */
    public function crawl(string $url): void
    {
        $url = $this->removeFragment($url);

        if (isset($this->internalLinks[$url])) {
            return;
        }

        if (strpos($url, $this->baseUrl) !== 0) {
            return;
        }

        $html = @file_get_contents($url);

        if ($html === false) {
            return;
        }

        $this->internalLinks[$url] = '';

        $dom = new DOMDocument();
        @$dom->loadHTML($html);
        $xpath = new DOMXPath($dom);

        $title = $xpath->query('//title');
        $title = $title->item(0) ? $title->item(0)->textContent : '';
        $this->internalLinks[$url] = $title;

        $links = $xpath->query('//a/@href');
        foreach ($links as $link) {
            $href = $link->nodeValue;

            if ($this->isRelativeUrl($href)) {
                $href = $this->makeAbsoluteUrl($url, $href);
            }

            $this->crawl($href, $this->baseUrl);
        }
    }

    /**
     * URL検証
     *
     * @param string $url URL
     * @return boolean
     */
    private function isRelativeUrl(string $url): bool
    {
        return !preg_match('/^https?:\/\//', $url);
    }

    /**
     * 絶対パスを取得
     *
     * @param string $currentUrl 現在のURL
     * @param string $relativeUrl  URLパス
     * @return string 絶対URL
     */
    private function makeAbsoluteUrl(string $currentUrl, string $relativeUrl): string
    {
        if (substr($relativeUrl, 0, 1) === '/') {
            return $this->baseUrl . $relativeUrl;
        }
        return rtrim($currentUrl, '/') . '/' . ltrim($relativeUrl, '/');
    }

    /**
     * アンカーリンクを削除
     *
     * @param string $url 対象のURL
     * @return string アンカーリンク削除済みURL
     */
    private function removeFragment($url): string
    {
        $hashPosition = strpos($url, '#');
        if ($hashPosition !== false) {
            $url = substr($url, 0, $hashPosition);
        }
        return $url;
    }
}
```

実行部分はこちら。
色々と実行時間やメモリの計測なども行っています。
```php
// 実行時間 無期限
set_time_limit(0);
$startUrl = 'https://c-a-p-engineer.github.io';
$baseUrl = 'https://c-a-p-engineer.github.io';

$internalLinks = [];

$startTime = microtime(true);

// Webクロール実行
$crawl = new WebCrawl($baseUrl);
$crawl->crawl($startUrl);
$internalLinks = $crawl->internalLinks;

$endTime = microtime(true);

// 各種情報を出力
ksort($internalLinks);

echo "Internal Links:\n";
foreach ($internalLinks as $url => $title) {
    echo $url . " - " . $title . "\n";
}
echo "Links Count:" . count($internalLinks) . "\n";
echo "Execution Time: " . ($endTime - $startTime) . " seconds\n";
echo "Memory Usage: " . (memory_get_peak_usage(true) / 1024 / 1024) . " MB\n";
```

自分のブログを対象にしてみましたが結果は以下のようになりました。
1秒間に3～4ページを処理している計算になります。
```
Links Count:2783
Execution Time: 794.42966103554 seconds
Memory Usage: 82 MB
```