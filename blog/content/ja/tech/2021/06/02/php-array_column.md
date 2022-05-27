---
title: "【PHP】配列を扱う時にとても有用な array_column"
date: 2021-06-02T04:30:00+09:00
description: "PHPで配列を扱う時にとても有用な関数 array_column をご紹介。"
draft: false
enableToc: true
enableTocContent: true
tags: 
- PHP
categories: 
- PHP
image: images/thumbnail/php.png
---

# 配列を扱う時にとても有用な array_column
`PHP` で配列を扱う時にとても有用な関数 <a href="https://www.php.net/manual/ja/function.array-column.php" target="_blank" rel="nofollow noopener">array_column</a> をご紹介します。
PHPマニュアル上でとても有用な例まで載っているのですがあまりこのような使われ方をせずに `for` や `foreach` を使用しているのを多々見るので今回記事化しました。
`array_column` を使用すれば例えばセレクトボックスに入れるデータなど一括で簡単に作れますので作れます。

## 配列の中の連想配列から指定のキーを抜き出して配列する
配列の中の連想配列から指定のキーを抜き出して配列にします。
・<a href="https://www.php.net/manual/ja/function.array-column.php#example-4889" target="_blank" rel="nofollow noopener">PHP: array_column - Manual 例1</a>

``` php:array_column_1.php
<?php
// データベースから返ってきたレコードセットの例
$records = [
    [
        'id' => 2135,
        'first_name' => 'John',
        'last_name' => 'Doe',
    ],
    [
        'id' => 3245,
        'first_name' => 'Sally',
        'last_name' => 'Smith',
    ],
    [
        'id' => 5342,
        'first_name' => 'Jane',
        'last_name' => 'Jones',
    ],
    [
        'id' => 5623,
        'first_name' => 'Peter',
        'last_name' => 'Doe',
    ]
];

$first_names = array_column($records, 'first_name');
print_r($first_names);
```

出力結果

```php
Array
(
    [0] => John
    [1] => Sally
    [2] => Jane
    [3] => Peter
)
```

## 配列の中の連想配列から指定した複数のキーを抜き出して配列する
配列の中の連想配列から指定した複数のキーを抜き出して配列します。
* <a href="https://www.php.net/manual/ja/function.array-column.php#example-4890" target="_blank" rel="nofollow noopener">PHP: array_column - Manual 例2</a>
``` php:array_column_2.php
<?php
// データベースから返ってきたレコードセットの例
$records = [
    [
        'id' => 2135,
        'first_name' => 'John',
        'last_name' => 'Doe',
    ],
    [
        'id' => 3245,
        'first_name' => 'Sally',
        'last_name' => 'Smith',
    ],
    [
        'id' => 5342,
        'first_name' => 'Jane',
        'last_name' => 'Jones',
    ],
    [
        'id' => 5623,
        'first_name' => 'Peter',
        'last_name' => 'Doe',
    ]
];

$last_names = array_column($records, 'last_name', 'id');
print_r($last_names);
```

出力結果

```php
Array
(
    [2135] => Doe
    [3245] => Smith
    [5342] => Jones
    [5623] => Doe
)
```

## オブジェクトの public プロパティから指定のプロパティを抜き出して配列にする
オブジェクトの public プロパティから指定のプロパティを抜き出して配列にします。
* <a href="https://www.php.net/manual/ja/function.array-column.php#example-4891" target="_blank" rel="nofollow noopener">PHP: array_column - Manual 例3</a>
``` php:array_column_3.php
<?php

class User
{
    public $username;

    public function __construct(string $username)
    {
        $this->username = $username;
    }
}

$users = [
    new User('user 1'),
    new User('user 2'),
    new User('user 3'),
];

print_r(array_column($users, 'username'));
```

出力結果

```php
Array
(
    [0] => user 1
    [1] => user 2
    [2] => user 3
)
```


## オブジェクトの public プロパティから指定のプロパティを抜き出して配列にする
オブジェクトの public プロパティから指定のプロパティを抜き出して配列にします。
* <a href="https://www.php.net/manual/ja/function.array-column.php#example-4892" target="_blank" rel="nofollow noopener">PHP: array_column - Manual 例4</a>
``` php:array_column_4.php
<?php

class Person
{
    private $name;

    public function __construct(string $name)
    {
        $this->name = $name;
    }

    public function __get($prop)
    {
        return $this->$prop;
    }

    public function __isset($prop) : bool
    {
        return isset($this->$prop);
    }
}

$people = [
    new Person('Fred'),
    new Person('Jane'),
    new Person('John'),
];

print_r(array_column($people, 'name'));
```

出力結果

```php
Array
(
    [0] => Fred
    [1] => Jane
    [2] => John
)
```
