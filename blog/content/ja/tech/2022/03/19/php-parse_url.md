---
title: "【PHP】URLを解析する parse_url"
date: 2022-03-19T04:00:00+09:00
description: "URL を解析することが出来る parse_url"
draft: false
enableToc: true
enableTocContent: true
tags: 
- PHP
categories: 
- PHP
image: images/thumbnail/php.png
---

# 【PHP】URLを解析する parse_url
URLを解析することができる `parse_url`
* <a href="https://www.php.net/manual/ja/function.parse-url.php" target="_blank" rel="nofollow noopener">PHP: parse_url - Manual</a>

## URL を解析してみる
実際にPHPManualに記載されている例にならって解析をさせてみます。
<a href="https://www.php.net/manual/ja/function.parse-url.php" target="_blank" rel="nofollow noopener">PHP: parse_url - Manual 例1</a>

```php
<?php
$url = 'http://username:password@hostname:9090/path?arg=value#anchor';

var_dump(parse_url($url));
```

結果
```
array(8) {
  ["scheme"]=>
  string(4) "http"
  ["host"]=>
  string(8) "hostname"
  ["port"]=>
  int(9090)
  ["user"]=>
  string(8) "username"
  ["pass"]=>
  string(8) "password"
  ["path"]=>
  string(5) "/path"
  ["query"]=>
  string(9) "arg=value"
  ["fragment"]=>
  string(6) "anchor"
}
```

これによって接続されたURLを解析して `host` からベーシック認証時のユーザ、パスまで解析することが可能です。

## 解析したURLを再構成する
こちらを参考に再構成する方法を作成。
<a href="https://www.php.net/manual/ja/function.parse-url.php#106731" target="_blank" rel="nofollow noopener">PHP: parse_url - Manual  thomas at gielfeldt dot com</a>

```php
<?php

$url = 'http://username:password@hostname:9090/path?arg=value#anchor';

// 再構成したURLが一致していることを確認
if ($url === unparseUrl(parse_url($url))) {
  print "YES, they match!\n";
}

/**
 * parseURL unparseURL
 * 
 * @param $parsed_url parse_url で解析した内容
 * @return string　再構成したURL
 */
function unparseUrl(array $parsed_url) :string
{
  $scheme   = isset($parsed_url['scheme']) ? $parsed_url['scheme'] . '://' : '';
  $host     = isset($parsed_url['host']) ? $parsed_url['host'] : '';
  $port     = isset($parsed_url['port']) ? ':' . $parsed_url['port'] : '';
  $user     = isset($parsed_url['user']) ? $parsed_url['user'] : '';
  $pass     = isset($parsed_url['pass']) ? ':' . $parsed_url['pass']  : '';
  $pass     = ($user || $pass) ? "$pass@" : '';
  $path     = isset($parsed_url['path']) ? $parsed_url['path'] : '';
  $query    = isset($parsed_url['query']) ? '?' . $parsed_url['query'] : '';
  $fragment = isset($parsed_url['fragment']) ? '#' . $parsed_url['fragment'] : '';
  return $scheme . $user . $pass . $host . $port . $path . $query . $fragment;
}
```

### 再構成の応用
たとえば `host` が変わったが同一のURLに遷移したい場合などがあります。
```php
<?php

$url = 'http://username:password@hostname:9090/path?arg=value#anchor';

var_dump(unparse_url(parse_url($url)));

/**
 * parseURL unparseURL
 * 
 * @param $parsed_url parse_url で解析した内容
 * @return string　再構成したURL
 */
function unparseUrl(array $parsed_url) :string
{
  $scheme   = isset($parsed_url['scheme']) ? $parsed_url['scheme'] . '://' : '';
  // hostをexampleに変更
  $host     = isset($parsed_url['host']) ? 'example' : '';
  $port     = isset($parsed_url['port']) ? ':' . $parsed_url['port'] : '';
  $user     = isset($parsed_url['user']) ? $parsed_url['user'] : '';
  $pass     = isset($parsed_url['pass']) ? ':' . $parsed_url['pass']  : '';
  $pass     = ($user || $pass) ? "$pass@" : '';
  $path     = isset($parsed_url['path']) ? $parsed_url['path'] : '';
  $query    = isset($parsed_url['query']) ? '?' . $parsed_url['query'] : '';
  $fragment = isset($parsed_url['fragment']) ? '#' . $parsed_url['fragment'] : '';
  return $scheme . $user . $pass . $host . $port . $path . $query . $fragment;
}
```

今回は `host` ですがクエリパラメータに何かを付与したい場合などさまざまな応用が可能です。

```
string(59) "http://username:password@example:9090/path?arg=value#anchor"
```

# 参考
* <a href="https://www.php.net/manual/ja/function.parse-url.php" target="_blank" rel="nofollow noopener">PHP: parse_url - Manual</a>