---
title: "Laravel Dusk テスト間でセッションデータを破棄する方法"
date: 2021-02-13T09:00:00+09:00
LastMod: 2021-02-16T09:00:00+09:00
description: "Laravel Duskだと1クラス内でのテストケースだと同一ブラウザがテストされてしまいます。それを防ぐための対策です。"
draft: false
enableToc: true
enableTocContent: true
tags: 
- PHP
- Laravel
- テスト
categories: 
- Laravel
image: images/thumbnail/laravel-l-slant.png
---

# Laravel Dusk テスト間でセッションデータを破棄する方法

Laravel Duskでテストを作成していると**1クラス内で複数のテストメソッドを作った場合に同じブラウザでテストをされていたようでエラーになりました**。
そのため、例えばテストでログインした場合、次のテスト時にはログアウトを都度しなければいけないのと、前のセッションデータが残っていて想定してないエラーが発生する可能性があります。
今回はその対策をメモ。

## サンプルテスト（失敗）

``` php {linenos=table}
<?php
class LoginTest extends DuskTestCase
{
    public function testLogin()
    {
        $this->browse(function (Browser $browser) {
            $browser->visit('/admin')
                ->type('email', 'hoge@exampl.org')
                ->type('password', 'hogepass')
                ->press('Login')
                ->assertSee('Loading...');
        });
    }

    public function testLoginFailure(){
        $this->browse(function (Browser $browser){
             // I have to add this to logout first, otherwise it's already logged in for this test!
            $browser->visit('/admin/logout');

            $browser->visit('/admin')
                ->type('email', 'fuga@exampl.org')
                ->type('password', 'fugapass')
                ->press('Login')
                ->assertSee('These credentials do not match our records.');
        });
    }
}
```

この場合、行18行目でわざわざログアウトしています。
そうすると前のデータが残って予期せぬエラーが発生する可能性もあります。

## サンプルテスト（成功）

```$this->browse``` を ``` $this->createBrowsersFor ``` に変更するだけ対応可能です。
こうすることによってテストごとに新たなブラウザを生成します。

{{< expand "修正コードを開く" >}}

### 修正コード

``` php {linenos=table,hl_lines=[6, 16]}
<?php
class LoginTest extends DuskTestCase
{
    public function testLogin()
    {
        $this->createBrowsersFor(function (Browser $browser) {
            $browser->visit('/admin')
                ->type('email', 'hoge@exampl.org')
                ->type('password', 'hogepass')
                ->press('Login')
                ->assertSee('Loading...');
        });
    }

    public function testLoginFailure(){
        $this->createBrowsersFor(function (Browser $browser){
            $browser->visit('/admin')
                ->type('email', 'fuga@exampl.org')
                ->type('password', 'fugapass')
                ->press('Login')
                ->assertSee('These credentials do not match our records.');
        });
    }
}
```
{{< /expand >}}

## クッキーの削除
人によっては ```createBrowsersFor``` だけでは不十分のようで、setup時にクッキーを破棄して対応をする必要があるようです。

``` php {linenos=table,hl_lines=[11]}
<?php
class LoginTest extends DuskTestCase
{
    /**
    * Temporal solution for cleaning up session
    */
    protected function setUp()
    {
        parent::setUp();
        foreach (static::$browsers as $browser) {
            $browser->driver->manage()->deleteAllCookies();
        }
    }
```


## 参考
* <a href="https://stackoverflow.com/questions/44906797/laravel-dusk-how-to-destroy-session-data-between-tests" target="_blank" rel="nofollow noopener">php - Laravel Dusk, how to destroy session data between tests - Stack Overflow</a>

## 追記（2021/02/16）
僕の場合 ```createBrowsersFor``` ではうまく行かなかったので ```browse``` で ```deleteAllCookies``` で対応いたしました。

### Laravel Dusk バージョン
>Laravel Dusk 6.11