---
title: "【PHP】静的解析ツール phpstan を使って静的解析をしてみる。"
date: 2022-11-19T01:30:00+09:00
description: "PHP の 静的解析ツール phpstan を使って静的解析をしてみる。"
draft: false
enableToc: true
enableTocContent: true
tags: 
- PHP
categories: 
- PHP
image: images/thumbnail/php.png
---

# 【PHP】静的解析ツール phpstan を使ってみる
PHP の 静的解析ツール phpstan を使って静的解析をしてみる。
<a href="https://phpstan.org/">PHPStan</a>

## インストール
`composer` でサクッとインストール
```
composer require --dev phpstan/phpstan
```

動作チェック
```
vendor/bin/phpstan analyse [ディレクトリ]
```

Laravelで使用する際は `larastan` があるのでそちらを使ってみるのも良いようです。
<a href="https://github.com/nunomaduro/larastan" target="_blank" rel="nofollow noopener">nunomaduro/larastan</a>

## 使い方
基本的な使い方
```
vendor/bin/phpstan analyse [options] [<paths>...]
```

### オプション
各種オプションです。
<a href="https://phpstan.org/user-guide/command-line-usage" target="_blank" rel="nofollow noopener">PHPStan コマンドラインオプション</a>

使用しそうな箇所だけ抜き出しています。
* `--level|l` 
  * ルールレベルの指定 <a href="https://phpstan.org/user-guide/rule-levels" target="_blank" rel="nofollow noopener">PHPStan ルールレベル</a>
* `--generate-baseline|-b`
  * 設定ファイルの指定　<a href="https://phpstan.org/config-reference" target="_blank" rel="nofollow noopener">PHPStan Config</a>
* `--generate-baseline|-b`
  * 既存のエラーを無視する `phpstan-baseline.neon` が自動的に作成される。
* `--error-format`
  * エラーフォマットを指定　<a href="https://phpstan.org/user-guide/output-format" target="_blank" rel="nofollow noopener">エラー形式</a>（指定がない場合は table
* `--no-progress`
  * プログレスバーを表示しない
* `--memory-limit`
  * メモリの指定 例：`--memory-limit 1G`
* `--xdebug`
  * `xdebug` が有効にする場合に使用（パフォーマンスが落ちる

## PHPStanとの戦い
PHPStan は 0-9 までの10のレベルが存在します。
レベルの指定がない場合はレベル0で判定をします。
<a href="https://phpstan.org/user-guide/rule-levels" target="_blank" rel="nofollow noopener">Rule Levels | PHPStan</a>

* `0` - 基本的なチェック、未知のクラス、未知の関数、`$this`上で呼び出された未知のメソッド、メソッドや関数に渡された引数の数が間違っている、常に未定義の変数をチェック
* `1` - 未定義の変数、`__call` と `__get` を持つクラス、未知のマジックメソッドとプロパティの可能性がある
* `2` - `$this` 以外のすべての式で未知のメソッドをチェック、PHPDocs を検証する
* `3` - 戻り値の型、プロパティに割り当てられた型の確認
* `4` - 基本的なデッドコードチェック、`instanceof` やその他の型チェックが常に `false`、到達しない `else` 文、`return` 後の到達不能コードなど
* `5` - メソッドや関数に渡される引数の型チェック
* `6` - タイプヒントの欠落を報告する
* `7` - 部分的に間違っている論理和型の報告、論理和型の一部の型にしか存在しないメソッドを呼び出した場合（その他の不正確な状況も） 
* `8` - `null` 可能な型に対するメソッド呼び出しとプロパティへのアクセスを報告する
* `9` - 混合型に厳密であること - この型で唯一許される操作は、この型を別の混合型に渡すことである

これらのレベルを上げて安全安心の開発を行いたいところですが…
実際、開発効率との兼ね合いでレベルを考えて指定してください。

## 試してる
PHPStan の Playground を利用してブラウザ上で試すこともできます。
<a href="https://phpstan.org/try" target="_blank" rel="nofollow noopener">Playground | PHPStan</a>

## 参考
* <a href="https://github.com/phpstan/phpstan" target="_blank" rel="nofollow noopener">phpstan/phpstan　GitHub</a>
* <a href="https://phpstan.org/" target="_blank" rel="nofollow noopener">PHPStan</a>
