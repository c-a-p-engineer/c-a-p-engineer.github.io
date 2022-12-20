---
title: "【Dart】遅延実行する方法"
date: 2022-12-21T00:30:00+09:00
description: "Dart で遅延実行する方法"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Dart
- Flutter
categories: 
- Dart
image: images/thumbnail/Dart_programming_language_logo.svg
---

# 【Dart】遅延実行する方法
Dart で遅延実行する方法

## サンプル
<a href="https://api.dart.dev/stable/2.18.6/dart-async/Future/Future.delayed.html" target="_blank" rel="nofollow noopener">Future.delayed</a> を使用します。
<a href="https://dartpad.dev/" target="_blank" rel="nofollow noopener">DartPad</a> を使用すればブラウザ上で下記のコードを実行して確認できます。

サンプルは4種類の書き方を行っています。
```dart
import 'dart:async';

void main() async {
  print("Start:" + DateTime.now().toString());

  // 3秒後に実行 引数
  Future.delayed(Duration(seconds: 3), () {
    print("delayed computation:" + DateTime.now().toString());
  });

  // 3行後に実行 then
  Future.delayed(Duration(seconds: 3)).then((_) {
    print("delayed then:" + DateTime.now().toString());
  });

  // 3秒後に実行 then メソッドチェーン
  Future.delayed(Duration(seconds: 1))
      .then((_) => print('delayed then methodchain1:' + DateTime.now().toString()))
      .then((_) => print('delayed then methodchain2:' + DateTime.now().toString()));

  // 3秒間待たせて後述のコードを実行させる
  await Future.delayed(Duration(seconds: 3));
  print("delayed await:" + DateTime.now().toString());
}

```

## 参考
* <a href="https://api.dart.dev/stable/2.18.6/dart-async/Future/Future.delayed.html" target="_blank" rel="nofollow noopener">Future.delayed constructor - Future - dart:async library - Dart API</a>
