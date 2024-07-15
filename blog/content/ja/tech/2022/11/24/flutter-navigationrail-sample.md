---
title: "【Flutter】NavigationRail を使ってサイドメニューを実装する"
date: 2022-11-24T18:00:00+09:00
description: "Flutter で NavigationRail を使ってサイドメニューを実装するサンプル"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Flutter
categories: 
- Flutter
image: images/thumbnail/Flutter-logo-animation-v1-2.gif
---

# 【Flutter】NavigationRail を使ってサイドメニューを実装する
Flutter で NavigationRail を使ってサイドメニューを実装するサンプル
* <a href="https://api.flutter.dev/flutter/material/NavigationRail-class.html" target="_blank" rel="nofollow noopener">NavigationRail class - material library - Dart API</a>

## サンプル
<a href="https://dartpad.dev/" target="_blank" rel="nofollow noopener">DartPad</a> を使用すればブラウザ上で下記のコードを実行して確認できます。

`NavigationRail` を使って各ページを表示するようにしています。

```dart:lib/main.dart
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      home: MyWidget(),
    );
  }
}

class MyWidget extends StatefulWidget {
  const MyWidget({super.key});

  @override
  State<MyWidget> createState() => _MyWidgetState();
}

class _MyWidgetState extends State<MyWidget> {
  int _selectedIndex = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Row(
        children: [
          // サイドバー（NavigationRail）
          NavigationRail(
            destinations: const [
              NavigationRailDestination(
                icon: Icon(Icons.home),
                label: Text('Home'),
              ),
              NavigationRailDestination(
                icon: Icon(Icons.bookmark),
                label: Text('Bookmark'),
              ),
              NavigationRailDestination(
                icon: Icon(Icons.people),
                label: Text('Friends'),
              ),
            ],
            selectedIndex: _selectedIndex,
            onDestinationSelected: (index) {
              setState(() {
                _selectedIndex = index;
              });
            },
          ),
          SelectContent(index: _selectedIndex)
        ],
      ),
    );
  }
}

/// Select Content Main Display
class SelectContent extends StatelessWidget {
  const SelectContent({super.key, required this.index});

  final int index;

  @override
  Widget build(BuildContext context) {
    const List<Widget> _pages = [Home(), Bookmark(), Friend()];
    if (_pages.length <= index) {
      return _pages[0];
    }
    return _pages[index];
  }
}

/// Home Page
class Home extends StatelessWidget {
  const Home({super.key});

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: ColoredBox(
        color: Color.fromARGB(255, 146, 204, 252)!,
        child: const Center(
          child: Text('Home'),
        ),
      ),
    );
  }
}

/// Bookmark Page
class Bookmark extends StatelessWidget {
  const Bookmark({super.key});

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: ColoredBox(
        color: Color.fromARGB(255, 255, 0, 0)!,
        child: const Center(
          child: Text('Bookmark'),
        ),
      ),
    );
  }
}

/// Friend Page
class Friend extends StatelessWidget {
  const Friend({super.key});

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: ColoredBox(
        color: Color.fromARGB(255, 78, 255, 43)!,
        child: const Center(
          child: Text('Friend'),
        ),
      ),
    );
  }
}

```

## 参考
* <a href="https://api.flutter.dev/flutter/material/NavigationRail-class.html" target="_blank" rel="nofollow noopener">NavigationRail class - material library - Dart API</a>
