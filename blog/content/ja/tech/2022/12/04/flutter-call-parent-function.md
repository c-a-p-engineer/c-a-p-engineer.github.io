---
title: "【Flutter】子 widget から親の Function を呼び出す"
date: 2022-12-04T09:30:00+09:00
description: "Flutter で子 widget から親の Function を呼び出す方法"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Flutter
categories: 
- Flutter
image: images/thumbnail/Flutter-logo-animation-v1-2.gif
---

# 【Flutter】子 widget から親の Function を呼び出す
Flutter で子 widget から親の Function を呼び出す方法

## サンプル
こちらをサンプルにさせていただいてます。
<a href="https://www.kindacode.com/article/how-to-pass-functions-to-child-widgets-in-flutter/" target="_blank" rel="nofollow noopener">How to pass functions to child widgets in Flutter - Kindacode</a>

<a href="https://dartpad.dev/" target="_blank" rel="nofollow noopener">DartPad</a> を使用すればブラウザ上で下記のコードを実行して確認できます。

```dart:lib/main.dart {linenos=table,hl_lines=["28-33", "48-49", "58-59", "62-63"]}
import 'package:flutter/material.dart';
import 'package:flutter/foundation.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      // DEBUG banner
      debugShowCheckedModeBanner: true,
      title: 'Parent Function Call',
      theme: ThemeData(
        primarySwatch: Colors.amber,
      ),
      home: const HomePage(),
    );
  }
}

class HomePage extends StatelessWidget {
  const HomePage({Key? key}) : super(key: key);

  // Parent Function
  void _passedFunction(String input) {
    if (kDebugMode) {
      print(input);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: ChildWidget(
          buttonHandler: _passedFunction,
        ),
      ),
    );
  }
}

class ChildWidget extends StatelessWidget {
  // Parent Function
  final Function buttonHandler;
  const ChildWidget({Key? key, required this.buttonHandler}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        ElevatedButton(
            // Parent Function Call
            onPressed: () => buttonHandler('Hello'),
            child: const Text('Say Hello')),
        ElevatedButton(
            // Parent Function Call
            onPressed: () => buttonHandler('Goodbye'),
            child: const Text('Say Goodbye')),
      ],
    );
  }
}
```

親の `Homepage` の `_passedFunction` メソッドを `ChildWidget` の `buttonHandler` に保存。
そして各ボタンから実行してコンソールに出力するという流れになっています。

## 参考
* <a href="https://www.kindacode.com/article/how-to-pass-functions-to-child-widgets-in-flutter/" target="_blank" rel="nofollow noopener">How to pass functions to child widgets in Flutter - Kindacode</a>
