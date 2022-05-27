---
title: "【PHP】PHP_CodeSniffier を使用してコードをPSR（コーディング規約）に基づいて整形する"
date: 2021-10-22T06:00:00+09:00
description: "PHP_CodeSniffier を使用してコードをPSR（コーディング規約）に基づいて整形する"
draft: false
enableToc: true
enableTocContent: true
tags: 
- PHP
categories: 
- PHP
image: images/thumbnail/php.png
---

# 【PHP】PHP_CodeSniffier を使用してコードをPSR（コーディング規約）に基づいて整形する
PHP のパッケージ、 `PHP_CodeSniffer` を使用してPSR（PHPコーディング規約）に基づいて整形させる方法。
* <a href="https://github.com/squizlabs/PHP_CodeSniffer" target="_blank" rel="nofollow noopener"> squizlabs /PHP_CodeSniffer</a>

## インストール方法
基本的に開発でしか使わないはずなので `--dev` を付けてインストール。
```
composer require --dev "squizlabs/php_codesniffer"
```

インストールが完了したら以下でヘルプが出てくることを確認。
```
./vendor/bin/phpcs -h
```

## 使い方
使用可能なコーディング規約を確認。
```
./vendor/bin/phpcs -i
```

使用可能なPSRが出てきます。
```
The installed coding standards are MySource, PEAR, PSR1, PSR12, PSR2, Squiz and Zend
```

### 設定
以下のような作りが基本的な設定ファイルになります。
``` xml:phpcs.xml
<?xml version="1.0"?>
<ruleset name="PSR12">
    <description>PSR12 rules</description>

    <!-- 拡張子の指定 -->
    <arg name="extensions" value="php" />

    <!-- 適用コーディング規約の指定 -->
    <rule ref="PSR12" />

    <!-- 出力に色を適用 -->
    <arg name="colors" />

    <!-- オプション p:進捗表示  s:エラー表示時にルールを表示 -->
    <arg value="ps" />

    <!-- 除外ディレクトリ -->
    <exclude-pattern>/vendor/</exclude-pattern>
</ruleset>
```

以下のように特定のルールの中で除外や追加することも可能です。
``` xml:phpcs.xml
<?xml version="1.0"?>
<ruleset name="PSR12">
    <description>PSR12 rules</description>
    <rule ref="PSR12">
        <!-- "PSR12" の中で除外するルールがあれば記載 -->
        <!--<exclude name="Generic.Files.LineLength"/>-->
        <!--<exclude name="PSR1.Classes.ClassDeclaration"/>-->
    </rule>
    <!-- 追加するルールがあれば記載 -->
    <!--<rule ref="PEAR.WhiteSpace.ObjectOperatorIndent"/>-->
</ruleset>
```

設定をチェック
```
./vendor/bin/phpcs -e
```

設定の各種対応するものはこちらから見ることが出来ます。
<a href="https://qiita.com/piotzkhider/items/c90dd9253e9822fab3a2" target="_blank" rel="nofollow noopener">PHP CodeSnifferにおけるPSR1,2の検知箇所と対応するSniffer - Qiita</a>

### 実行

* 基本的なソースコードチェック
```
phpcs --report=[summary|source] --standard=[ルール名|設定ファイル] [ファイル|ディレクトリ] 
```
各種オプションはなくても大丈夫です。
`phpcs.xml` が作られていれば基本的に読み込まれています。

* ファイル別に出力
```
./vendor/bin/phpcs --report=summary .
```

* ルール別に出力
```
./vendor/bin/phpcs --report=source .
```

### ソースコードの自動整形

* 基本的なソースコードの自動整形
```
./vendor/bin/phpcbf --standard=[ルール名|設定ファイル] [ファイル|ディレクトリ] 
```


* 実行
```
./vendor/bin/phpcbf .
```

## 参考
* <a href="https://qiita.com/atsu_kg/items/571def8d0d2d3d594e58" target="_blank" rel="nofollow noopener">PHP_CodeSniffierのインストールと使い方 - Qiita</a>
* <a href="https://www.ritolab.com/entry/188" target="_blank" rel="nofollow noopener">LaravelにPHP_CodeSnifferを導入しコーディング規約（PSR）に沿った記述を行う</a>