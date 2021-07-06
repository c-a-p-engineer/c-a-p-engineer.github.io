---
title: "【Ubuntu】Android Studio を入れる"
date: 2021-06-15T10:00:00+09:00
description: "Ubuntu に Android Studio を入れる"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Android Studio 
categories: 
- エディタ
image: images/thumbnail/androidstudio-logo.png
---

# Android Studio を入れる
Android Studio を Ubuntu に入れたのでメモ。

## インストール手順

### 1.JDKインストール
Android は Java を使用しているのでJDKをインストール。
```
apt -y install openjdk-11-jdk
```

### 2.JAVA_HOMEの設定
Javaにパスを通す
```
export JAVA_HOME="/usr/lib/jvm/java-1.11.0-openjdk-amd64"
```

### 3.リポジトリの追加
Android Studio のリポジトリを追加
```
add-apt-repository ppa:maarten-fonville/android-studio
```

### 4.パッケージ一覧を更新
パッケージを更新。
```
apt update
```

### 5.Android Studio インストール
Android Studio インストール
```
apt -y install android-studio
```

### 6.Android Studio起動
Android Studio の起動は以下のコマンドを実行するだけ。
```
/opt/android-studio/bin/studio.sh
```