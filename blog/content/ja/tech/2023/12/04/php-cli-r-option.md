---
title: PHPコマンドラインオプション「php -r」の活用
date: 2023-12-04T18:30:00+09:00
description: PHPはウェブ開発で広く使われている言語ですが、コマンドラインから直接PHPコードを実行する機能も提供しています。「php -r」オプションの使い方の紹介。
draft: false
enableToc: true
enableTocContent: true
tags: 
- PHP
categories: 
- PHP
image: images/thumbnail/php.png
---

# PHPコマンドラインオプション「php -r」の活用

PHPはウェブ開発で広く使われている言語ですが、コマンドラインから直接PHPコードを実行する機能も提供しています。「php -r」オプションの使い方の紹介。

## 「php -r」オプションとは

「php -r」は、ファイルにスクリプトを保存することなく、コマンドラインから直接PHPコードを実行するためのオプションです。スクリプトのテストや簡単な操作に便利です。

### 基本的な使用法

```bash
php -r 'echo "Hello, World!";'
```

このコマンドは "Hello, World!" を出力します。

## 「php -r」の活用例

### 簡単な計算

簡単な計算をさせる

```bash
php -r 'echo 2 + 3;'
```

### 複数行で書く

複数行にしたい時は普通に改行を入れることで可能です。
末尾にシングルクォーテーションを入れることでコードをが閉められて実行されます。

```bash
php -r ' $name = "Hoge";
echo "Welcome to " . $name . "!\n"; '
```

### JSONデータの処理

JSONのデータを処理してみます。

```bash
php -r '
$json = "{\"name\": \"Tech\"}";
$obj = json_decode($json);
echo $obj->name;
'
```

## 制限と注意点

- コード全体をシングルクォートで囲む必要があります。
- 複雑なスクリプトはファイルに保存する方が適切です。
- エラーハンドリングは重要です。

## まとめ

「php -r」はPHPをコマンドラインで手軽に使用するためのツールです。

## 参考

- <a href="https://www.php.net/manual/ja/features.commandline.options.php" target="_blank" rel="nofollow noopener">PHP: オプション - Manual</a>
