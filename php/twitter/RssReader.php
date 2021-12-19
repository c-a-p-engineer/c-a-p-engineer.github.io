<?php

class RssReader
{
    public static function load(string $path): array
    {
        // 記事を格納
        $posts = [];
        // feed取得
        $feed = simplexml_load_file($path);
        // サイト情報
        $siteTitle = (string)$feed->channel->title;
        $siteUrl = (string)$feed->channel->link;
        $siteDescription = (string)$feed->channel->description;

        // 記事情報取得
        foreach ($feed->item as $item) {
            // RSS 1.0系
            $title = (string)$item->title;
            $date = date("Y-m-d H:i:s", strtotime($item->children('http://purl.org/dc/elements/1.1/')->date));
            $link = (string)$item->link;
            $description = (string)$item->children('http://purl.org/rss/1.0/modules/content/')->encoded;

            $posts[] = [
                'siteTitle' => $siteTitle,
                'siteUrl' => $siteUrl,
                'siteDescription' => $siteDescription,
                'title' => $title,
                'date' => $date,
                'link' => $link,
                'description' => $description,
            ];
        }
        foreach ($feed->channel->item as $item) {
            // RSS 2.0系
            $title = (string)$item->title;
            $date = date("Y-m-d H:i:s", strtotime($item->pubDate));
            $link = (string)$item->link;
            $description = (string)$item->description;

            $posts[] = [
                'siteTitle' => $siteTitle,
                'siteUrl' => $siteUrl,
                'siteDescription' => $siteDescription,
                'title' => $title,
                'date' => $date,
                'link' => $link,
                'description' => $description,
            ];
        }
        return $posts;
    }
}
