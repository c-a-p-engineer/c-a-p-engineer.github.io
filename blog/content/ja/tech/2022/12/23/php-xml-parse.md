---
title: "【PHP】XMLをパースして配列にする方法"
date: 2022-12-23T00:30:00+09:00
description: "PHP でXMLをパースして配列にする方法"
draft: false
enableToc: true
enableTocContent: true
tags: 
- PHP
categories: 
- PHP
image: images/thumbnail/php.png
---

# 【PHP】XMLをパースして配列にする方法
PHP でXMLをパースして配列にする方法

## サンプル
下記のサンプルはXMLをパースして配列にします。
実行確認出来るようにサンプルのため変数 `$xml` に直接XMLを入れていますが、ローカルファイルであれば `file_get_contents` を使用してファイルを取得してください。
```php
<?php
// $xml = file_get_contents('sample.xml');
$xml = <<<XML
<?xml version="1.0"?>
<Tests>
  <Test TestId="0001" TestType="CMD">
    <Name>Convert number to string</Name>
    <CommandLine>Examp1.EXE</CommandLine>
    <Input>1</Input>
    <Output>One</Output>
  </Test>
  <Test TestId="0002" TestType="CMD">
    <Name>Find succeeding characters</Name>
    <CommandLine>Examp2.EXE</CommandLine>
    <Input>abc</Input>
    <Output>def</Output>
  </Test>
  <Test TestId="0003" TestType="GUI">
    <Name>Convert multiple numbers to strings</Name>
    <CommandLine>Examp2.EXE /Verbose</CommandLine>
    <Input>123</Input>
    <Output>One Two Three</Output>
  </Test>
</Tests>
XML;

// XML をオブジェクトに変換
$xmlObject = simplexml_load_string($xml);
// XMLを配列に変換 XMLオブジェクト → JSON → 配列
$xmlArray = json_decode(json_encode($xmlObject), true);
var_dump($xmlArray);
```

以下のような出力結果になります。
```php
array(1) {
  ["Test"]=>
  array(3) {
    [0]=>
    array(5) {
      ["@attributes"]=>
      array(2) {
        ["TestId"]=>
        string(4) "0001"
        ["TestType"]=>
        string(3) "CMD"
      }
      ["Name"]=>
      string(24) "Convert number to string"
      ["CommandLine"]=>
      string(10) "Examp1.EXE"
      ["Input"]=>
      string(1) "1"
      ["Output"]=>
      string(3) "One"
    }
    [1]=>
    array(5) {
      ["@attributes"]=>
      array(2) {
        ["TestId"]=>
        string(4) "0002"
        ["TestType"]=>
        string(3) "CMD"
      }
      ["Name"]=>
      string(26) "Find succeeding characters"
      ["CommandLine"]=>
      string(10) "Examp2.EXE"
      ["Input"]=>
      string(3) "abc"
      ["Output"]=>
      string(3) "def"
    }
    [2]=>
    array(5) {
      ["@attributes"]=>
      array(2) {
        ["TestId"]=>
        string(4) "0003"
        ["TestType"]=>
        string(3) "GUI"
      }
      ["Name"]=>
      string(35) "Convert multiple numbers to strings"
      ["CommandLine"]=>
      string(19) "Examp2.EXE /Verbose"
      ["Input"]=>
      string(3) "123"
      ["Output"]=>
      string(13) "One Two Three"
    }
  }
}
```

## 参考
* <a href="https://www.php.net/manual/ja/function.simplexml-load-string.php" target="_blank" rel="nofollow noopener">PHP: simplexml_load_string - Manual</a>
* <a href="https://www.php.net/manual/ja/function.json-decode.php" target="_blank" rel="nofollow noopener">PHP: json_decode - Manual</a>
* <a href="https://www.php.net/manual/ja/function.json-encode.php" target="_blank" rel="nofollow noopener">PHP: json_encode - Manual</a>
