<?php

require __DIR__ . '/RssReader.php';
require __DIR__ . '/../vendor/autoload.php';

use Abraham\TwitterOAuth\TwitterOAuth;

set_time_limit(0);
ini_set('memory_limit', -1);

$rss = RssReader::load('https://c-a-p-engineer.github.io/index.xml');

if (count($rss) == 0) {
    return;
}


$mode = 'post';
if (($argv[1] ?? null) == 'history') {
    $mode = 'history';
}

$index = 0;
$type = null;

switch ($mode) {
    case 'post';
        $index = 0;
        $type = '最新の投稿';
        break;
    case 'history';
        $index = rand(0, (count($rss) - 1));
        break;
}

$post = $rss[$index];

switch ($mode) {
    case 'post';
        $type = '最新の投稿';
        break;
    case 'history';
        $date = date('Y/m/d', strtotime($post['date']));
        $type = <<<text
過去投稿
投稿日：{$post['date']}
text;
        break;
}

$text = <<<text
{$type}
{$post['siteTitle']}
{$post['title']}
{$post['link']}
text;

$apiKey = getenv('TWITTER_API_KEY', true);
$apiSecret = getenv('TWITTER_API_SECRET', true);
$accessToken = getenv('TWITTER_ACCESS_TOKEN', true);
$accessTokenSecret = getenv('TWITTER_ACCESS_TOKEN_SECRET', true);

$connection = new TwitterOAuth($apiKey, $apiSecret, $accessToken, $accessTokenSecret);

$result = $connection->post("statuses/update", [
    "status" => $text,
]);
