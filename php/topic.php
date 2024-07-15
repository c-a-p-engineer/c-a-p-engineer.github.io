<?php

set_time_limit(0);
ini_set('memory_limit', -1);

function hatena($tag, $dateBegin, $dateEnd): array
{
    $dateBegin = date('Y-m-d', strtotime($dateBegin));
    $dateEnd = date('Y-m-d', strtotime($dateEnd));
    $url = "http://b.hatena.ne.jp/search/tag?q={$tag}&sort=popular&users=10&date_begin={$dateBegin}=&date_end={$dateEnd}&mode=rss";

    $rss = simplexml_load_file($url);
    $json = json_decode(json_encode($rss), true);

    if (!is_null($json['item']['title'] ?? null)) {
        // 1件のみの場合は配列化
        $json['item'] = [0 => $json['item']];
    }

    return ($json['item'] ?? []);
}

function hatenaCard($title, $url)
{
    return <<<HTML
<iframe 
  class="hatenablogcard" 
  style="width:100%;height:155px;max-width:680px;" 
  title="{$title}" 
  src="https://hatenablog-parts.com/embed?url={$url}" 
  width="300" height="150" frameborder="0" scrolling="no">
</iframe>
HTML;
}

function createTopic($datetime)
{
    $thumbnails = [
        0 => 'weekmark7_sun.png',
        1 => 'weekmark1_mon.png',
        2 => 'weekmark2_fri.png',
        3 => 'weekmark3_wed.png',
        4 => 'weekmark4_thu.png',
        5 => 'weekmark5_fri.png',
        6 => 'weekmark6_sat.png',
    ];

    // 記事作成日
    $create = date('Y-m-d\TH:i:s', strtotime($datetime)) . '+09:00';
    // 最終更新日
    $lastmod = date('Y-m-d\TH:i:s', strtotime(date('Y-m-d', strtotime('+9 hour')))) . '+09:00';

    // 検索対象日時
    $targetDate = date('Y-m-d', strtotime(date('Y-m-d', strtotime($datetime)) . ' -1 day'));

    $tags = [
        // 全般
        'IT',
        'プログラミング',
        'エンジニア',
        '開発',
        'SE',
        'Qiita',
        'Zenn',
        'Github',

        // セキュリティ
        'セキュリティ',
        '脆弱性',
        'XSS',
        'SQLインジェクション',
        'CSRF',

        // 言語
        'PHP',
        'Javascript',
        'Java',
        'Ruby',
        'Python',
        'Golang',
        'Flutter',
        'HTML',
        'CSS',
        'SQL',
        'Elixir',

        // DB
        'DB',
        'Oracle',
        'Mysql',
        'Postgres',

        // OS
        'Linux',
        'Windows',
        'Mac',
        'Android',
        'iOS',

        // クラウド
        'AWS',
        'GCP',
        'Azure',
    ];

    $result = [];
    foreach ($tags as $value) {
        $result[$value] = hatena($value, $targetDate, $targetDate);
    }

    $tags = '';
    $html = '';
    foreach ($result as $ikey => $ivalue) {
        if (count($ivalue) == 0) {
            continue;
        }
        $html .= '## ' . $ikey . PHP_EOL;
        $tags .= '- Topic-' . $ikey . PHP_EOL;
        foreach ($ivalue as $jkey => $jvalue) {
            if ($jkey == 5) {
                continue 2;
            }
            if (is_array($jvalue['title'])) {
                continue;
            }
            if (is_array($jvalue['description'])) {
                $jvalue['description'] = '';
            }

            $title = htmlspecialchars(mb_convert_encoding($jvalue['title'], 'utf-8'));
            $html .= '### ' . $title . PHP_EOL;
            $html .= '<a href="' . $jvalue['link'] . '" target="_blank" rel="noopener">' . $title . '</a>' . PHP_EOL;
            $html .= '> ' . htmlspecialchars(mb_convert_encoding($jvalue['description'], 'utf-8')) . PHP_EOL;
            $html .= hatenaCard($title, $jvalue['link']) . PHP_EOL . PHP_EOL;
        }
    }

    $thumbnail = $thumbnails[date('w', strtotime($targetDate))];

    $data = <<<TOPIC
---
title: "{$targetDate} の話題まとめ"
date: {$create}
lastMod: {$lastmod}
description: "{$targetDate} の話題まとめ"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Topic
{$tags}
categories: 
- Topic
image: images/thumbnail/{$thumbnail}
---

# {$targetDate} の話題
データは、<a href="https://b.hatena.ne.jp/" target="_blank" rel="noopener">はてなブックマーク</a>から収集しています。
※タグが複数設定されていると複数のカテゴリで同一のものが出てきます。

{$html}

TOPIC;

    $year = date('Y', strtotime($targetDate));
    $month = date('m', strtotime($targetDate));
    $day = date('d', strtotime($targetDate));
    $path = __DIR__ . '/../blog/content/ja/topic/' . $year . '/' . $month;
    @mkdir($path, 0777, true);
    $path = realpath($path);

    $output = $path . '/' . $day . '.md';
    file_put_contents($output, $data);
    echo 'Created Topic ' . $output . PHP_EOL;
}

$datetime = date('Y-m-d', strtotime('+9 hour'));

// 日付指定
if (!is_null($_SERVER['argv'][1] ?? null)) {
    if (date('Y-m-d', strtotime($_SERVER['argv'][1])) != $_SERVER['argv'][1]) {
        echo '日付は Y-m-d 形式で指定してください。' . PHP_EOL;
        exit;
    }
    $datetime = $_SERVER['argv'][1];
}

// 昨日の話題を作成
createTopic($datetime);
// 1ヶ月前の話題を再生成
createTopic(date('Y-m-d', strtotime($datetime . ' -30day')));
