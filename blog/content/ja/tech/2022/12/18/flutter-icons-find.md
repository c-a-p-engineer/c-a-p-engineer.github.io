---
title: "【Flutter】Icons class を使用するアイコンを探す方法"
date: 2022-12-18T00:00:00+09:00
description: "Flutter で Icons class を使用するアイコンを探す方法"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Flutter
categories: 
- Flutter
image: images/thumbnail/Flutter-logo-animation-v1-2.gif
---

# 【Flutter】Icons class を使用するアイコンを探す方法
Flutter で Icons class を使用するアイコンを探す方法

## Flutterアイコンを探す
Flutterのアイコンは以下のように呼び出すことができます。
```dart
Icons.favorite,
```

ただし、なんのアイコンがあるかわかりづらい。

Google Fonts の Material Icons で探すことができます。
<a href="https://fonts.google.com/icons?selected=Material+Icons" target="_blank" rel="nofollow noopener">Material Symbols and Icons - Google Fonts</a>

使用したいアイコンをクリックすると Flutter 用のコードを表示してくれます。
基本的にはすべて小文字、空白は `_` に変換されている模様です

## 参考
* <a href="https://api.flutter.dev/flutter/material/Icons-class.html" target="_blank" rel="nofollow noopener">Icons class - material library - Dart API</a>
