---
title: "【Kotlin】DevContainer環境セットアップ"
date: 2025-06-24T13:00:00+09:00
description: Kotlinを学ぶ際、ローカル環境を汚さずにサクッと試せるのがVS CodeのDev Containerです。
draft: false
enableToc: true
enableTocContent: true
tags: 
- Kotlin
categories: 
- Kotlin
image: images/thumbnail/kotlin.png
---

# 【Kotlin】DevContainer環境セットアップ

Kotlinを学ぶ際、ローカル環境を汚さずにサクッと試せるのがVS CodeのDev Containerです。本記事では、Microsoft公式のJavaベースDev ContainerイメージにKotlinコンパイラを組み込み、`.kt`（コンパイル実行）と`.kts`（スクリプト実行）の両方をVS Code上の▶️ボタンで動かす手順を、設定ファイルの解説とともにご紹介します。


## Kotlinとは

<a href="https://kotlinlang.org" target="_blank" rel="nofollow noopener">Kotlin公式サイト</a>によると、KotlinはJetBrains社が開発したJVM上で動作する静的型付け言語です。

* Javaとの相互運用性が高く、簡潔で安全な文法を提供
* サーバーサイド、Android、マルチプラットフォームで活躍

## Dev Container設定ファイル

以下をプロジェクト直下の`.devcontainer/devcontainer.json`として保存してください。

```jsonc
// .devcontainer/devcontainer.json
{
  // VS Code上に表示されるコンテナ名
  "name": "Kotlin Dev Container",

  // ベースイメージ：Java 17＋Debian Bullseye、Gradleプリインストール版
  "image": "mcr.microsoft.com/devcontainers/java:0-17-bullseye",

  // 追加Feature定義
  "features": {
    // Java Feature：Mavenは不要、Gradleのみ有効化
    "ghcr.io/devcontainers/features/java:1": {
      "version": "none",
      "installMaven": "false",
      "installGradle": "true"
    },
    // Kotlinコンパイラ（kotlinc）をインストール
    "ghcr.io/mikaello/devcontainer-features/kotlinc:1": {}
  },

  // VS Code拡張機能の自動インストール
  "customizations": {
    "vscode": {
      "extensions": [
        "fwcd.kotlin",               // Kotlin言語サポート
        "vscjava.vscode-java-pack",  // Java開発パック
        "vscjava.vscode-gradle"      // Gradleタスク連携
      ]
    }
  },

  // ホストの作業フォルダをコンテナにマウント
  "workspaceMount": "source=${localWorkspaceFolder},target=/workspace,type=bind,consistency=cached",
  "workspaceFolder": "/workspace",

  // コンテナ停止後もファイルを保持
  "shutdownAction": "none"
}
```

これで `.kt`,`.kts` のファイルはエディター上の上部にある▶️ボタンを押すことで実行できます。

## 使い分けポイント

Kotlinファイルには大きく分けて「コンパイルしてJARを実行する `.kt`」と「スクリプト実行できる `.kts`」の2種類があります。用途に応じて使い分けましょう。

| 用途        | ファイル拡張子 | 特長                         |
| --------- | ------- | -------------------------- |
| 大規模アプリ開発  | `.kt`   | パッケージ管理・IDEフルサポート／デバッグ機能あり |
| 簡易スクリプト実行 | `.kts`  | 書いてすぐ実行可能／起動オーバーヘッドが小さい    |

---

## .kt の使い方と実行例

### Hello.kt

```kotlin
fun main() {
    println("Hello, world!")
}
```

### 実行コマンド

```bash
kotlinc Hello.kt -include-runtime -d Hello.jar
java -jar Hello.jar
```

```bash
Hello, world!
```

* **ポイント**：`kotlinc`でJARを生成し、`java -jar`で起動。
* **注意**：JVM起動オーバーヘッドがあるため、やや時間がかかる。

---

## .kts の使い方と実行例

### Hello.kts

```kotlin:Hello.kts
println("Hello, world!")
```

### 実行コマンド

```bash
kotlinc -script Hello.kts
```

```bash
Hello, world!
```

* **ポイント**：`kotlinc -script`で直接実行。
* **メリット**：コンパイル不要で起動が高速、スクリプト的な開発に最適。
