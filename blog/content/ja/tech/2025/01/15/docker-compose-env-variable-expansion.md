---
title: "【Docker Compose】 command や entrypoint に環境変数を展開する際の注意点 ～$ENVではなく$$ENVを使おう～"
date: 2025-01-15T05:00:00+09:00
description: Docker Composeを使ってサービスを定義する際、`command`や`entrypoint`フィールドで環境変数を利用することはよくあります。しかし、これらのフィールドで環境変数を展開する際に `$ENV` と記述しても期待通りに動作しないことがあります。
draft: false
enableToc: true
enableTocContent: true
tags: 
- Docker
categories: 
- Docker
image: images/thumbnail/docker.png
---

# 【Docker Compose】 command や entrypoint に環境変数を展開する際の注意点 ～$ENVではなく$$ENVを使おう～

Docker Composeを使ってサービスを定義する際、`command`や`entrypoint`フィールドで環境変数を利用することはよくあります。しかし、これらのフィールドで環境変数を展開する際に `$ENV` と記述しても期待通りに動作しないことがあります。その理由と正しい使い方を解説します。

---

## なぜ $$ENV が必要なのか？

Docker ComposeのYAMLファイルで `$` を使うと、Docker Compose自体がその値を解釈しようとします。これはComposeファイルで環境変数を参照するための機能ですが、この動作の結果として、サービス内で実行されるコマンドに渡る前に値が失われたり、正しく展開されない場合があります。

`$$` を使うことで、Composeファイルの中で `$` をエスケープできます。エスケープされた `$$` はコンテナ内でシングル `$` として解釈され、期待通りに環境変数が展開されます。

---

## 実例で理解する

### 誤った設定例: $ENV_VARIABLEを直接使う

以下のComposeファイルでは、`command`で環境変数を展開しようとしています。

```yaml
services:
  example-service:
    image: alpine
    environment:
      ENV_VARIABLE: "Hello, Docker!"
    command: echo $ENV_VARIABLE
```

この設定では、Composeが `$ENV_VARIABLE` を解釈しようとします。しかし、Composeファイルには `ENV_VARIABLE` の定義がなく、空文字列として扱われます。そのため、実行時には以下のように出力されます。

```
$
```

### 正しい設定例: $$ENV_VARIABLEを使用する

次のように設定を変更することで問題を解決できます。

```yaml
services:
  example-service:
    image: alpine
    environment:
      ENV_VARIABLE: "Hello, Docker!"
    command: echo $$ENV_VARIABLE
```

この設定では、`$$ENV_VARIABLE` がシングル `$ENV_VARIABLE` としてコンテナ内で解釈され、環境変数が正しく展開されます。実行時には以下のように出力されます。

```
Hello, Docker!
```

---

### entrypoint フィールドでも同様

`command` フィールドと同様に、`entrypoint` フィールドを利用する場合でも `$$` を使う必要があります。

#### 設定例

```yaml
services:
  example-service:
    image: alpine
    environment:
      ENV_VARIABLE: "Hello, Docker!"
    entrypoint: ["sh", "-c", "echo $$ENV_VARIABLE"]
```

この設定により、`ENV_VARIABLE` が正しく展開されます。

---

### 注意点

1. **エスケープ忘れに注意**  
   `$` をそのまま使用すると、Composeファイルの処理時に解釈されてしまい、環境変数が期待通りに展開されません。

2. **シェル構文に依存**  
   `command` や `entrypoint` での環境変数の展開にはシェルの構文が必要です。`["sh", "-c", "..."]` を使う形で設定することをオススメします。

3. **デバッグのすすめ**  
   動作確認を行う際には、`docker-compose config` コマンドを活用して、生成された設定を確認するのがよいでしょう。

---

## 参考資料

- <a href="https://docs.docker.jp/v20.10/compose/environment-variables.html" target="_blank" rel="nofollow noopener">Compose 内の環境変数</a>
