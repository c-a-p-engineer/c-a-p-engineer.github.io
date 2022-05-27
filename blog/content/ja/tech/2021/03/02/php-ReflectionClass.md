---
title: "【PHP】ReflectionClass を使ってクラスの private property・method に読み書き・実行する方法"
date: 2021-03-02T09:00:00+09:00
description: "PHPでクラスの private property・method に対して読み書き・実行するする方法のメモ"
draft: false
enableToc: true
enableTocContent: true
tags: 
- PHP
categories: 
- PHP
image: images/thumbnail/php.png
---

# private property・method を読み書き・実行
諸事情によりクラスのprivateなproperty、Methodを触る必要がありました。
その時のメモです。

## ReflectionClass
<a href="https://www.php.net/manual/ja/class.reflectionclass.php" target="_blank" rel="nofollow noopener">ReflectionClass</a>
ReflectionClass を使用することで指定されたクラスのことを調べることが可能です。

## サンプルコード
まず実験するための　```SampleClass``` を作成します。

``` php:SampleClass.php
<?php
class SampleClass
{
    /**
     * @var string プライベートプロパティ
     */
    private $text = 'text';

    /**
     * プライベート変数を出力
     */
    public function textOutput()
    {
        echo $this->text.PHP_EOL;
    }

    /**
     * !で囲う
     * @param @string $str 文字列
     * @return string
     */
    private function output(string $str):string
    {
        return "!{$str}!";
    }
    
    /**
     * num1とnum2を足す
     * @param int num1 足す数値
     * @param int num2 足す数値
     * @return int
     */
    private function sum(int $num1, int $num2):int
    {
        return $num1+$num2;
    }
}
 
```

### 通常アクセスした場合

#### private property
```php
$sample = new SampleClass();
echo $sample->text;
```

実行結果

```bash
PHP Fatal error:  Uncaught Error: Cannot access private property SampleClass::$text
```

#### private method
```php
<?php
$sample = new SampleClass();
echo $sample->output('Hello,World');
```

↓実行結果

``` bash:実行結果
PHP Fatal error:  Uncaught Error: Call to private method SampleClass::output() from context
```

### ReflectionClassを使用
実際に ReflectionClass を使用してprivateなproperty、Methodに読み書き、使用してみる。

``` php {linenos=table}
<?php
$sample = new SampleClass();
$refrection = new ReflectionClass(get_class($sample));

// プライベートプロパティ text の内容を出力
echo 'Private Property Before--------------------'.PHP_EOL;
$sample->textOutput(); 

// ------プロパティの読み書き------
// 該当のプロパティを取得
$privateText = $refrection->getProperty('text');

// アクセス権限の取得
$privateText->setAccessible(true);

// 書き込み
$privateText->setValue($sample, "Change Text");

echo PHP_EOL.'Private Property After----------------------'.PHP_EOL;
// 読み込み
echo $privateText->getValue($sample).PHP_EOL;

// プライベートプロパティ text の内容を出力
$sample->textOutput();

echo PHP_EOL.'Private Method------------------------------'.PHP_EOL;

// ------メソッドの実行------
// 該当の関数を取得
$output = $refrection->getMethod('output');

// アクセス権限の取得
$output->setAccessible(true);
// 確認実行
echo $output->invoke($sample, 'Hello,World').PHP_EOL;

// 該当の関数を取得
$sum = $refrection->getMethod('sum');

// アクセス権限の取得
$sum->setAccessible(true);
// 確認実行 変数が複数の時
echo $sum->invoke($sample, 1, 2).PHP_EOL;
```

実行結果

``` bash
Private Property Before--------------------
text

Private Property After----------------------
Change Text
Change Text

Private Method------------------------------
!Hello,World!
3
```

## 注意
本来 private になどにされて外部からアクセス出来ないようにされているのは何らかの理由があります。
これはそれを捻じ曲げて行う行為ですので注意してください。
本当にそこをいじるべきなのか、いじったらどんな影響があるかを考えてみてから使用したほうが良いです。

僕は本当にどうしようもなかったので使わざるを得なかったです。
