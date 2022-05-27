---
title: "Laravel メールを自動的にマルチパート化する"
date: 2021-03-13T08:00:00+09:00
description: "Laravel でのメール送信を自動的にマルチパート化する方法"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Laravel
categories: 
- Laravel
image: images/thumbnail/laravel-l-slant.png
---

# Larave メールをマルチパート化

Laravel のメールで view を指定すると Laravel では view を実行してHTMLを生成します。
そうするとHTMLメールになってしまいます。
ただし、一部のメーラーだとHTMLメールが受け取れないのでテキストメールとのマルチパート化をする必要がありましたので、その時のメモ。

## trait を作成

trait を作成します。

``` php:App/Mails/MailMultiPartViewTextTrait.php {linenos=table}
<?php

namespace App\Mails;

use Illuminate\Support\HtmlString;
use View;

trait MailMultiPartViewTextTrait
{
    /**
     * Build the view for the message.
     *
     * @return array|string
     *
     * @throws \ReflectionException
     */
    protected function buildView()
    {
        if (isset($this->view) && !isset($this->textView)) {
            // View だけ設定されている場合、Viewを生成してhtml、textの自動マルチパート化を行う

            // View を生成する
            $view = View::make($this->view, $this->buildViewData())->render();

            // styleタグ内を削除
            $text = preg_replace("/<style\\b[^>]*>(.*?)<\\/style>/s", "", $view);
            // タグを削除
            $text = strip_tags($text);

            return array_filter([
                'html' => new HtmlString($view),
                'text' => new HtmlString(ltrim($text)),
            ]);
        }

        return parent::buildView();
    }
}
```

## メールを使用する

サンプルはこちらから使用
<a href="https://readouble.com/laravel/7.x/ja/mail.html#view-data" target="_blank" rel="nofollow noopener">Laravel 7.x メール</a>

```use``` に ```MailMultiPartViewTextTrait``` を追加する。

``` php:App\Mail\OrderShipped.php {linenos=table,hl_lines=[12]}
<?php

namespace App\Mail;

use App\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class OrderShipped extends Mailable
{
    use Queueable, SerializesModels, MailMultiPartViewTextTrait;

```

メールソースを確認すると以下の情報が増えてマルチパート化されます。
```Content-Type: multipart/alternative;```
```Content-Type: text/plain; charset=utf-8``` 
