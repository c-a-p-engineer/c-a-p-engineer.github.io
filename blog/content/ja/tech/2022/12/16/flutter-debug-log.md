---
title: "【Flutter】デバッグログを仕込んで確認する"
date: 2022-12-16T01:00:00+09:00
description: "Flutter でデバッグログを仕込んで確認する方法のメモ"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Flutter
categories: 
- Flutter
image: images/thumbnail/Flutter-logo-animation-v1-2.gif
---

# 【Flutter】デバッグログを仕込んで確認する
Flutter でデバッグログを仕込んで確認する方法のメモ

## サンプル
Flutterのログの仕込み方

```dart:main.dart
import 'dart:io';
import 'dart:developer';

void main() {
    print('print');
    stdout.writeln('stdout.writeln'); // Webだとエラーが発生
    stderr.writeln('stderr.writeln'); // Webだとエラーが発生
    debugPrint('debugPrint'); // Web だとエラーが発生
    log('log', name: 'log');
}
```

{{< notice warning >}}
**注意**
コメントに記載してありますが3つはWebビルドした際にエラーが発生しました。
マルチビルドする予定であれば `stdout`, `stderr`, `debugPrint` の使用を控え `print`, `log` を使うのが良いかと思います。
{{< /notice >}}


## ログの確認方法
`flutter run` で起動したのちに同一ターミナルで `v` を押すと `DevTools` が起動いたします。
Webであればコンソールに出力されます。

## 参考
* <a href="https://docs.flutter.dev/development/tools/devtools/logging" target="_blank" rel="nofollow noopener">Using the Logging view | Flutter</a>
