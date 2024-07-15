---
title: "【GitHub Actions】Flutter 各種 Build を自動化"
date: 2022-07-06T12:00:00+09:00
description: "GitHub Actions で Flutter 各種 Build を自動化してみました。"
draft: false
enableToc: true
enableTocContent: true
tags: 
- GitHub
- Flutter
categories: 
- GitHub
image: images/thumbnail/GitHub_Logo_White.png
---

# 【GitHub Actions】Flutter 各種 Build を自動化
GitHub Actions で Flutter の各種 Build を自動化してみました。

作成したビルド対象は以下の5種類です。
* Android
* iOS
* Linux Desktop
* Windows Desktop
* Web

## サンプル
以下を使用して Flutter を GitHub Actions で実行できるようにします。
<a href="https://github.com/marketplace/actions/flutter-action" target="_blank" rel="nofollow noopener">Flutter action · Actions · GitHub Marketplace</a>

Andoroid, Linux, Web の Build は ubuntu 上で可能なので1つにまとめることも可能です。
わかりやすいように分割して今回はサンプル化しています。

5行目の `cache` を `true` にしておくとキャッシュしてくれて次回以降からキャッシュがヒットすれば早くなります。
```yml {linenos=table,hl_lines=[5]}
    - uses: subosito/flutter-action@v2
      with:
        flutter-version: '3.0.4'
        channel: 'stable'
        cache: true
```

### Android
Andoroid だと `Android App Bundle（aab）` と `Android application Package（apk）` の2種類のビルドが可能です。

`flutter build appbundle` → `Android App Bundle（aab）`
`flutter build apk` → `Android application Package（apk）`

Andoroidエンジニアではないので詳しくはないですが `aab` の形式の方が新しいようです。

```yml:.github\workflows\build_andoroid.yml
name: Flutter Andoroid Build

on: [push]

jobs:
  build-android:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - uses: actions/setup-java@v2
      with:
        distribution: 'zulu'
        java-version: '11'
    - uses: subosito/flutter-action@v2
      with:
        flutter-version: '3.0.4'
        channel: 'stable'
        cache: true
    - run: flutter pub get
    - run: flutter test
    - run: flutter build apk
    - run: flutter build appbundle

    # 成果物アップロード
    - name: artifact upload
      uses: actions/upload-artifact@v2.2.0
      with:
        # 保存ファイル名（name.zip）
        name: andoroid
        # 保存するファイル
        path: ./build/app/outputs/
        # 保存期間（日）
        retention-days: 1
```

### iOS
`flutter build ipa` で iOS用の実行ファイルを作れるようですが、証明書などが必要なので省きます。
`flutter build ios` の場合は `Xcode` 用のソースを吐きます。

```yml:.github\workflows\build_ios.yml
name: Flutter iOS Build

on: [push]

jobs:
  build-ios:
    needs: test
    runs-on: macos-latest
    steps:
    - uses: actions/checkout@v3
    - uses: subosito/flutter-action@v2
      with:
        flutter-version: '3.0.4'
        channel: 'stable'
        cache: true
    - run: flutter pub get
    - run: flutter test
    # iOS Build
    - run: flutter build ios --release --no-codesign
    # 成果物アップロード
    - name: artifact upload
      uses: actions/upload-artifact@v2.2.0
      with:
        # 保存ファイル名（name.zip）
        name: ios
        # 保存するファイル
        path: ./build/ios/
        # 保存期間（日）
        retention-days: 1
```

### Linux Desktop
```yml:.github\workflows\build_linux.yml
name: Flutter Linux Build

on: [push]

jobs:
  build-linux:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - uses: subosito/flutter-action@v2
      with:
        flutter-version: '3.0.4'
        channel: 'stable'
        cache: true
    - run: flutter pub get
    - run: flutter test
    - name: Flutter Linux Build
      run: |
        sudo apt-get update -y
        sudo apt-get install -y clang cmake ninja-build pkg-config libgtk-3-dev liblzma-dev
        flutter config --enable-linux-desktop
        flutter build linux
    # 成果物アップロード
    - name: artifact upload
      uses: actions/upload-artifact@v2.2.0
      with:
        # 保存ファイル名（name.zip）
        name: linux
        # 保存するファイル
        path: ./build/linux/
        # 保存期間（日）
        retention-days: 1
```
### Windows Desktop
```yml:.github\workflows\build_linux.yml
name: Flutter Windows Build

on: [push]

jobs:
  build-windows:
    runs-on: windows-latest
    steps:
      - uses: actions/checkout@v3
      - uses: subosito/flutter-action@v2
        with:
          flutter-version: '3.0.4'
          channel: 'stable'
          cache: true
      - run: flutter pub get
      - run: flutter test
      - name: Flutter Build Windows
        run: |
          flutter config --enable-windows-desktop
          flutter build windows
      # 成果物アップロード
      - name: artifact upload
        uses: actions/upload-artifact@v2.2.0
        with:
          # 保存ファイル名（name.zip）
          name: windows
          # 保存するファイル
          path: ./build/windows/runner/Release/
          # 保存期間（日）
          retention-days: 1

```

### Web

```yml:.github\workflows\build_web.yml
name: Flutter Web Build

on: [push]

jobs:
  build-web:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - uses: subosito/flutter-action@v2
      with:
        flutter-version: '3.0.4'
        channel: 'stable'
        cache: true
    - run: flutter pub get
    - run: flutter test
    - run: flutter build web
    # 成果物アップロード
    - name: artifact upload
      uses: actions/upload-artifact@v2.2.0
      with:
        # 保存ファイル名（name.zip）
        name: web
        # 保存するファイル
        path: ./build/web/
        # 保存期間（日）
        retention-days: 1
```

## 参考
* <a href="https://github.com/marketplace/actions/flutter-action" target="_blank" rel="nofollow noopener">Flutter action · Actions · GitHub Marketplace</a>
