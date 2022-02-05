---
title: "【Windows】winget を使用してパッケージ管理をする"
date: 2022-02-05T14:00:00+09:00
description: "Windows のCLIパッケージ管理ソフト winget を使用してパッケージ管理をする"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Windows
- winget
categories: 
- Windows
image: images/thumbnail/Windows_logo_and_wordmark_-_2021.svg
---

# 【Windows】winget を使用してパッケージ管理をする
`Windows` のCLIパッケージ管理ソフト `winget` を使用してパッケージ管理をする。
これを導入することによって今まで一々アプリサイトに行ってインストールしていた面倒な作業がなくなります。

`winget` はWindows Storeからインストールします。
<a href="https://www.microsoft.com/ja-jp/p/app-installer/9nblggh4nns1#activetab=pivot:overviewtab" target="_blank" rel="nofollow noopener">アプリ インストーラー</a>からインストールが可能です。

インストールが完了したらコマンドプロンプトを開き、以下のコマンドでバージョンが出たらインストール確認をできます。
```shell
winget -v
```

## パッケージを探す
<a href="https://docs.microsoft.com/ja-jp/windows/package-manager/winget/search" target="_blank" rel="nofollow noopener">
search コマンド (winget) - Microsoft Docs</a>

`firefox` を探してみます。
```shell
winget search firefox
```

検索結果
```shell
名前                      ID                               バージョン      一致              ソース
----------------------------------------------------------------------------------------------------
Mozilla Firefox Browser   9NZVDKPMR9RD                     Unknown                           msstore
Mozilla Firefox           Mozilla.Firefox                  96.0.3                            winget
Mozilla Firefox ESR       Mozilla.Firefox.ESR              91.5.1          Command: firefox  winget
Mozilla Firefox (Beta)    Mozilla.Firefox.Beta             97.0            Command: firefox  winget
Firefox Developer Edition Mozilla.Firefox.DeveloperEdition 97.0b7          Tag: firefox      winget
MozBackup                 JasnaPaka.MozBackup              1.5.1           Tag: firefox      winget
PWAsForFirefox            filips.FirefoxPWA                1.4.0           Tag: firefox      winget
Mypal                     Feodor2.Mypal                    29.3.0          Tag: firefox      winget
Basilisk                  basilisk.basilisk                52.9.2021.12.13 Tag: firefox      winget
Nightly                   Mozilla.Firefox.Nightly          97.0a1                            winget
Pale Moon                 MoonchildProductions.PaleMoon    29.4.4          Tag: firefox-fork winget
LibreWolf                 LibreWolf.LibreWolf              96.0.3          Tag: firefox-fork winget
```

## パッケージをインストール
<a href="https://docs.microsoft.com/ja-jp/windows/package-manager/winget/install" target="_blank" rel="nofollow noopener">install コマンド (winget) - Microsoft Docs</a>

`Firefox Developer Edition` をインストールしてみます。
この時、`search`で表示された名前指定してください。
```shell
winget install "Firefox Developer Edition"
```

## パッケージの一覧
<a href="https://docs.microsoft.com/ja-jp/windows/package-manager/winget/list" target="_blank" rel="nofollow noopener">list コマンド (winget) - Microsoft Docs</a>

パッケージの一覧を取得します。
```shell
winget list
```

この際に `winget` 以外でもインストールされているものが出力されます。

```shell
名前                                         ID                                                   バージョン          利用可能     ソース
-----------------------------------------------------------------------------------------------------------------------------------------
ペイント                                     Microsoft.Paint_8wekyb3d8bbwe                        11.2110.0.0
Firefox Developer Edition                    Mozilla.Firefox.DeveloperEdition                     97.0                97.0b7       winget
```

## パッケージのアップグレード
<a href="https://docs.microsoft.com/ja-jp/windows/package-manager/winget/upgrade" target="_blank" rel="nofollow noopener">upgrade コマンド (winget) - Microsoft Docs</a>

すべてのアプリをアップグレードします。
```shell
winget upgrade --all
```

指定のアプリのアップグレード
```shell
winget upgrade "Firefox Developer Edition"
```

## パッケージのアンイストール
<a href="https://docs.microsoft.com/ja-jp/windows/package-manager/winget/uninstall" target="_blank" rel="nofollow noopener">uninstall コマンド (winget) - Microsoft Docs</a>

`Firefox Developer Edition` をアンインストールしてみます。

```shell
winget uninstall "Firefox Developer Edition"
```

## パッケージのエクスポート
<a href="https://docs.microsoft.com/ja-jp/windows/package-manager/winget/export" target="_blank" rel="nofollow noopener">export コマンド (winget) - Microsoft Docs</a>
現在 `winget` で管理可能なアプリケーションを `json` に吐き出します。
これによりアプリのインストール済みのアプリの情報が保存できます。

```shell
winget export ./winget.json
```

## パッケージのインポート
<a href="https://docs.microsoft.com/ja-jp/windows/package-manager/winget/import" target="_blank" rel="nofollow noopener">import コマンド (winget) - Microsoft Docs</a>
`import` にて保存した `json` を読み込ませてアプリの一括インストールを行います。

```shell
winget import ./winget.json
```

## 参考
* <a href="https://docs.microsoft.com/ja-jp/windows/package-manager/winget/" target="_blank" rel="nofollow noopener">winget ツールを使用したアプリケーションのインストールと管理 - Microsoft Docs</a>
