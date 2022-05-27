---
title: "【PHP】strtotime バグ？オーバーフロー？加減算時の罠"
date: 2021-05-22T15:30:00+09:00
description: "PHP の文字列から日付に変換する strtotime の関数には加算、減算発生する際に発生する様々な罠があります。今回その罠をご紹介。"
draft: false
enableToc: true
enableTocContent: true
tags: 
- PHP
categories: 
- PHP
series: 
- PHPの罠
image: images/thumbnail/php.png
---

# strtotime でのオーバーフロー？ 加減算時の罠
PHP の文字列から日付に変換する `strtotime` の関数には加算、減算発生する際などに発生する様々な罠があります。
今回その罠をご紹介。

## 日付がオーバーフロー
10,000年以上の西暦を入力された場合、オーバーフロー（？）されて日付が UNIX タイムスタンプが0秒扱いになるようです。

``` php:over_datetime.php
<?php
// 正常
$date = '9999-12-31 23:59:59';
$date = date('Y-m-d H:i:s', strtotime($date));
echo '正常         :' . $date . PHP_EOL;
 
// オーバーフロー
$date = '10000-01-01 00:00:00';
$date = date('Y-m-d H:i:s', strtotime($date));
echo 'オーバーフロー:' . $date . PHP_EOL;
```

実行すると 10000年以上をしていた場合 `1970-01-01 00:00:00` と表示されてしまいます。
```
正常         :9999-12-31 23:59:59
オーバーフロー:1970-01-01 00:00:00
```

## 日時がおかしくても自動で計算

``` php:calc_datetime.php
<?php
// 自動計算
$date = '2021-06-31 24:00:00';
$date = date('Y-m-d H:i:s', strtotime($date));
echo '自動計算:' . $date;
```

`06/31` は存在しない（6月は30日まで）
→ `07/01` に繰り上げ
→ `24:00:00` は存在しない（時間は`23：59：59`まで）
→ `07/02` に繰り上げ

このように計算されて下記のような実行結果になります。
```
自動計算:2021-07-02 00:00:00
```

## 月の加減算
月の加減算を行う場合に自動計算が発生する可能性があります。

### 月の加算
月の加算を行う場合 `+2 month` などと表記すると月の加算を行ってくれます。
``` php:month_add.php
<?php
// 加算
$date = '2021-07-31 00:00:00';
$date = date('Y-m-d H:i:s', strtotime($date . '+2 month'));
echo '加算:' . $date;
```

7月の月末から2ヶ月後にすると期待値としては9月の末になって欲しいかと思います。
ただ9月は30日までなので '09/31' → '10/01' と繰り上げをされてしまいます。
```
加算:2021-10-01 00:00:00
```

### 月の減算
月の加算を行う場合 `-2 month` などと表記すると月の減算を行ってくれます。
``` php:month_sub.php
<?php
// 減算
$date = '2021-07-31 00:00:00';
$date = date('Y-m-d H:i:s', strtotime($date . '-1 month'));
echo '減算:' . $date;
```

7月の月末から1ヶ月前にすると期待値としては6月の末になって欲しいかと思います。
ただ6月にはならずに7月のまま '07/31' → '07/01' と30日引かれた状態になります。
```
減算:2021-07-01 00:00:00
```

## 参考
* <a href="https://www.php.net/manual/ja/function.strtotime" target="_blank" rel="nofollow noopener">PHP: strtotime - Manual</a>