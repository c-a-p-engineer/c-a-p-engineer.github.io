<?php

require __DIR__ . '/../vendor/autoload.php';

use Abraham\TwitterOAuth\TwitterOAuth;

set_time_limit(0);
ini_set('memory_limit', -1);

$apiKey = getenv('TWITTER_API_KEY', true);
$apiSecret = getenv('TWITTER_API_SECRET', true);
$accessToken = getenv('TWITTER_ACCESS_TOKEN', true);
$accessTokenSecret = getenv('TWITTER_ACCESS_TOKEN_SECRET', true);

$connection = new TwitterOAuth($apiKey, $apiSecret, $accessToken, $accessTokenSecret);
$connection->setApiVersion('2');

$date = date('Y/m/d', strtotime(date('Y/m/d') . ' -1 day'));

$response = $connection->post('tweets', [
    'text' => "{$date}の話題" . PHP_EOL .
    PHP_EOL .
    "#駆け出しエンジニアと繋がりたい" . PHP_EOL .
    'https://c-a-p-engineer.github.io/topic/' . $date
], true);

