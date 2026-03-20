---
title: "【PHP】openssl_error_string で OpenSSL のエラー内容を取得する"
date: 2026-03-20T20:00:00+09:00
description: "PHP の openssl_error_string の使い方、複数エラーの取得方法、OpenSSL エラー調査のポイントを実例つきで解説"
draft: false
enableToc: true
enableTocContent: true
tags:
- PHP
- OpenSSL
categories:
- PHP
thumbnail: "images/thumbnail/php.png"
image: images/thumbnail/php.png
slug: "php-openssl-error-string"
---

# 【PHP】openssl_error_string() で OpenSSL のエラー内容を取得する

PHP で `openssl_sign()` や `openssl_verify()`、`openssl_pkey_get_private()` などの OpenSSL 系関数を使っていると、処理が `false` を返して失敗することがあります。

ただ、戻り値が `false` だけだと、何が原因で失敗したのか分かりません。

そんなときに使うのが `openssl_error_string()` です。  
この関数を使うと、OpenSSL 内部で発生したエラー内容を文字列として取得できます。

## openssl_error_string() とは

`openssl_error_string()` は、OpenSSL のエラーキューに積まれているエラーメッセージを 1 件ずつ取り出す関数です。

戻り値は次のとおりです。

- エラーがある場合: `string`
- これ以上エラーがない場合: `false`

PHP 公式マニュアル:
<a href="https://www.php.net/manual/en/function.openssl-error-string.php" target="_blank" rel="nofollow noopener">openssl_error_string - PHP Manual</a>

ポイントは、**1 回だけ呼べば終わりではない**ことです。  
OpenSSL のエラーはキューに複数積まれることがあるため、通常は `while` で取り切ります。

## 基本的な使い方

OpenSSL 系の処理が失敗した直後に、次のようにエラーを回収します。

```php
<?php

$privateKey = openssl_pkey_get_private($pem, $passphrase);

if ($privateKey === false) {
    while (($error = openssl_error_string()) !== false) {
        error_log($error);
    }
}
```

実務では `error_log()` にそのまま流すか、配列にためてまとめて記録する形が扱いやすいです。

```php
<?php

$signature = '';
$result = openssl_sign($data, $signature, $privateKey, OPENSSL_ALGO_SHA256);

if ($result === false) {
    $errors = [];

    while (($error = openssl_error_string()) !== false) {
        $errors[] = $error;
    }

    error_log('[OpenSSL] ' . implode(' | ', $errors));
}
```

## なぜ while で読むのか

`openssl_error_string()` は最後のエラー 1 件だけを返す関数ではなく、**キューから順番に取り出す関数**です。

そのため、次のように空になるまで取得するのが基本です。

```php
<?php

while (($error = openssl_error_string()) !== false) {
    echo $error, PHP_EOL;
}
```

特に、鍵や証明書の読み込みに失敗したときは、関連するエラーが複数件積まれることがあります。  
1 件だけ見て判断すると、原因を見誤ることがあります。

## よくある利用場面

`openssl_error_string()` は、次のような場面で役に立ちます。

- 秘密鍵や公開鍵の読み込みに失敗したとき
- PEM 形式の文字列が壊れているとき
- パスフレーズが違うとき
- 署名や検証に失敗したとき
- 暗号化や復号に失敗したとき
- 証明書や CSR の生成に失敗したとき

OpenSSL 系の API は失敗時に `false` しか返さないことが多いため、調査では `openssl_error_string()` がほぼ必須です。

## エラーの具体例

実際には、環境によって次のようなエラー文字列が出ることがあります。

### PEM の形式が不正なとき

```text
error:0909006C:PEM routines:get_name:no start line
```

このエラーは、PEM 形式として読み込める開始行が見つからない場合によく出ます。

たとえば次のような原因が考えられます。

- `-----BEGIN PRIVATE KEY-----` のようなヘッダがない
- 改行が壊れている
- PEM ではない文字列を渡している
- 証明書を期待している箇所に秘密鍵を渡している

関連する例:
<a href="https://github.com/openssl/openssl/issues/2878" target="_blank" rel="nofollow noopener">OpenSSL issue: no start line</a>

別の実例:
<a href="https://github.com/nginx-proxy/nginx-proxy/issues/2287" target="_blank" rel="nofollow noopener">cannot load certificate / no start line</a>

### 復号に失敗したとき

```text
error:06065064:digital envelope routines:EVP_DecryptFinal_ex:bad decrypt
```

このエラーは、復号に必要な条件がそろっていないときによく出ます。

- パスワードが違う
- 鍵が違う
- IV が違う
- 暗号化方式が一致していない
- 暗号文が壊れている

実例:
<a href="https://gist.github.com/samukasmk/e73397972dcc5e2e2ecd" target="_blank" rel="nofollow noopener">bad decrypt の実行例</a>

## エラー文字列の見方

OpenSSL のエラーはおおむね次のような構造です。

```text
error:[error code]:[library name]:[function name]:[reason string]
```

たとえば、

```text
error:0909006C:PEM routines:get_name:no start line
```

であれば、主に見るべき箇所は次の 3 つです。

- `PEM routines`
  - どの種類の内部処理で失敗したか
- `get_name`
  - どの処理の途中で失敗したか
- `no start line`
  - 何が問題だったか

実務では、まず最後の `reason string` を見るだけでも原因をかなり絞れます。

OpenSSL 公式の関連ドキュメント:

- <a href="https://docs.openssl.org/1.1.1/man1/errstr/" target="_blank" rel="nofollow noopener">openssl errstr</a>
- <a href="https://docs.openssl.org/1.0.2/man3/ERR_error_string/" target="_blank" rel="nofollow noopener">ERR_error_string</a>

## 利用時の注意点

### 失敗した直後に読む

後続で別の OpenSSL 関数を呼ぶと、エラーキューの内容が変わってしまうことがあります。  
エラー調査をしたいなら、失敗直後に回収した方が安全です。

### ユーザーに詳細をそのまま見せない

`openssl_error_string()` の内容は調査には有用ですが、利用者向けのエラーメッセージとしては詳細すぎます。

画面には一般的なメッセージだけ出し、詳細はログに残す運用の方が無難です。

```php
<?php

if ($result === false) {
    $errors = [];

    while (($error = openssl_error_string()) !== false) {
        $errors[] = $error;
    }

    error_log('[OpenSSL] ' . implode(' | ', $errors));

    echo '署名処理に失敗しました。';
}
```

### エラー文字列は環境差がある

同じコードでも、次の条件で表示内容が変わることがあります。

- OpenSSL のバージョン
- PHP のビルド差
- OS やディストリビューション差

そのため、ネット上で見つけた文言と完全一致しなくても、`bad decrypt` や `no start line` のような理由部分が近ければ、同系統の問題である可能性が高いです。

## まとめ

`openssl_error_string()` は、PHP で OpenSSL 関連処理の失敗原因を調べるための基本関数です。

押さえておきたいポイントは次のとおりです。

- OpenSSL のエラー内容を文字列で取得できる
- エラーはキューに積まれるので `while` で取り切る
- 失敗した直後に読む
- 詳細は画面表示ではなくログに残す
- エラー文言は環境によって多少変わる

OpenSSL 周りは `false` だけでは原因が分かりにくいので、失敗時はまず `openssl_error_string()` を確認する癖をつけておくと調査がかなり楽になります。

## 参考

- <a href="https://www.php.net/manual/en/function.openssl-error-string.php" target="_blank" rel="nofollow noopener">openssl_error_string - PHP Manual</a>
- <a href="https://www.php.net/manual/en/ref.openssl.php" target="_blank" rel="nofollow noopener">OpenSSL Functions - PHP Manual</a>
- <a href="https://docs.openssl.org/1.1.1/man1/errstr/" target="_blank" rel="nofollow noopener">openssl errstr</a>
- <a href="https://docs.openssl.org/1.0.2/man3/ERR_error_string/" target="_blank" rel="nofollow noopener">ERR_error_string</a>
- <a href="https://github.com/openssl/openssl/issues/2878" target="_blank" rel="nofollow noopener">OpenSSL issue: no start line</a>
- <a href="https://github.com/nginx-proxy/nginx-proxy/issues/2287" target="_blank" rel="nofollow noopener">cannot load certificate / no start line</a>
- <a href="https://gist.github.com/samukasmk/e73397972dcc5e2e2ecd" target="_blank" rel="nofollow noopener">bad decrypt の実行例</a>
EOF
