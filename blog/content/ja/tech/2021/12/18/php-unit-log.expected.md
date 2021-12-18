---
title: "【PHPUnit】PHPUnit This element is not expected.."
date: 2021-12-18T13:00:00+09:00
description: "PHPUnit を実行すると This element is not expected.. が出る"
draft: false
enableToc: true
enableTocContent: true
tags: 
- PHP
- PHPUnit
categories: 
- PHP
image: images/thumbnail/php.png
---

# 【PHPUnit】PHPUnit This element is not expected..
PHPUnit を実行すると以下のようなエラーが出る。
```shell
  The following problems have been detected:

  Line 38:p
  - Element 'log': This element is not expected..
```

## 原因
原因は PHPUnit9.3 の場合、`log` の記載方法が変わった。
<a href="https://github.com/sebastianbergmann/phpunit/blob/9.3.0/ChangeLog-9.3.md#configuration-of-code-coverage-and-logging-in-phpunitxml" target="_blank" rel="nofollow noopener">phpunit/ChangeLog-9.3</a>

## 対処
エラーが出る以下の書き方を変更。
```xml
<logging>
  <log type="junit" target="logs/test/report.xml"/>
</logging>
```
↓ 以下のように変更する。
```xml
<logging>
  <junit outputFile="logs/test/report.xml"/>
</logging>
```

## 参考情報
* <a href="https://stackoverflow.com/questions/63482019/why-doesnt-phpunit-9-expect-the-log-child-element-of-logging-phpunit-xml-dist" target="_blank" rel="nofollow noopener">php - Why Doesn't PHPUnit 9 expect the log child element of logging phpunit.xml.dist - Stack Overflow</a>
* <a href="https://github.com/sebastianbergmann/phpunit/blob/9.3.0/ChangeLog-9.3.md#configuration-of-code-coverage-and-logging-in-phpunitxml" target="_blank" rel="nofollow noopener">phpunit/ChangeLog-9.3</a>
