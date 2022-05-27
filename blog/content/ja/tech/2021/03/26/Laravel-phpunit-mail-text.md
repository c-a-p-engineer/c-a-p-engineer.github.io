---
title: "Laravel で PHPUnit を使用してメール本文を確認する方法"
date: 2021-03-26T05:00:00+09:00
description: "Laravel で PHPUnit を使用してメール本文を確認する方法"
draft: false
enableToc: true
enableTocContent: true
tags: 
- PHP
- Laravel
- PHPUnit
- テスト
categories: 
- Laravel
image: images/thumbnail/laravel-l-slant.png
---

# Laravel で PHPUnit を使用してメール本文を確認する方法
Laravel では 通常Mail送信時のメール内容の確認が出来ません。
ただ文言の修正時に一々メールを送信して目で確認するのもとてもコストが掛かります。
そのためにメール本文を確認する方法を確認します。

## 確認環境
* PHP 7.4
* PHPUnit 9,5
* Laravel 6.2

## メールの用意
メールの参考はこちらを使用。
<a href="https://readouble.com/laravel/6.x/ja/mail.html#view-data" target="_blank" rel="nofollow noopener">ビューデータ - Laravel 6.x メール</a>

* メールクラス
``` php:app/Mail/SampleMail.php {linenos=table}
<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SampleMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * メッセージの生成
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('emails.sample_view')
        ->text('emails.sample_text');
    }
}
```

サンプルのView
``` php:resources/views/emails/sample_view.blade.php {linenos=table}
<p>HTML</p>
```

サンプルテキストのView
``` php:resources/views/emails/sample_text.blade.php {linenos=table}
TEXT
```

## メール本文テスト

``` php:tests\Unit\Mail\SampleMail.php {linenos=table}
<?php

namespace Tests\Unit\Mail;

use App\Mail\SampleMail;
use Illuminate\Support\HtmlString;
use ReflectionClass;
use Tests\TestCase;
use View;

class SampleMailTest extends TestCase
{

    /**
     * サンプルメール
     *
     * @test
     * @return void
     */
    public function testSampleMail()
    {
        // メール
        $mail = new SampleMail();
        $mail->build();

        // View のみの場合レンダリングして確認
        $render = $mail->render();

        // ReflectionClassを使用してViewを生成する
        $refrection = new ReflectionClass(get_class($mail));
        $output = $refrection->getMethod('buildView');
        $output->setAccessible(true);
        $mailView = $output->invoke($mail);

        // 変換用キー
        $kyes = [
            0 => 'html',
            1 => 'text',
            'html' => 'html',
            'text' => 'text',
        ];

        // メール内容を生成
        $views = [];
        if(is_array($mailView)){
            foreach($mailView as $key => $view){
                if($view instanceof HtmlString){
                    $views[$kyes[$key]] = $view->toHtml();
                }elseif(is_string($view)){
                    $views[$kyes[$key]] = View::make($view, $mail->buildViewData())->render();
                }
            }
        }else{
            $views['html'] = View::make($mailView[0], $mail->buildViewData())->render();
        }

        // HTML
        $this->assertEquals($view['html'], '<p>HTML</p>');

        // TEXT
        $this->assertEquals($view['text'], 'TEXT');

        // 確認
        // dd($views);
    }
}
```

PHPUnit を実行
```bash
vendor/bin/phpunit tests/Unit/Mails/MemberRegisterMailTest.php --env=dusk
```

PHPUnit の実行結果
```bash
PHPUnit 9.5.0 by Sebastian Bergmann and contributors.

.                                                                   1 / 1 (100%)

Time: 00:16.955, Memory: 32.00 MB

OK (1 test, 2 assertions)
```

69行目のddの結果
```php
array:2 [
  "html" => "<p>HTML</p>"
  "text" => "TEXT"
]
```