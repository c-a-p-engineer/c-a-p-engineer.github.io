---
title: "ChatGPTから自宅PCを直接操作できるRemote Desktop Commanderを試した — Windowsで詰まった点と料金"
date: 2026-09-20T16:00:00+09:00
description: "ChatGPTから自分のWindows PCへ接続して、ファイル操作やターミナル実行ができるRemote Desktop Commanderを実際に試しました。導入手順、接続確認、npxが警告だけで止まったときの回避方法、無料枠とPro料金までまとめます。"
tags:
  - ChatGPT
  - MCP
  - Windows
  - Remote Desktop Commander
  - AIエージェント
categories:
  - AI
draft: false
legacySlug: chatgpt-remote-desktop-commander
---

# ChatGPTから自宅PCを直接操作できるRemote Desktop Commanderを試した — Windowsで詰まった点と料金

ChatGPTから、自分のPCを直接操作できるようになりました。

今回使ったのは **Remote Desktop Commander** です。

普段のChatGPTやクラウド上の実行環境ではなく、

```text
ChatGPT
  ↓
Remote Desktop Commander
  ↓
自分のWindows PC
  ↓
ファイル / ターミナル / プロセス
```

という経路で、自分の実機へコマンドを送れます。

実際にWindows PCを接続し、ChatGPT側から `pwd` を実行できるところまで確認できました。

この記事では、

- Remote Desktop Commanderで何ができるか
- ChatGPTから自分のPCを接続する方法
- Windowsで `npx ... remote` が警告だけ出して止まったときに試したこと
- 実際に通った起動コマンド
- 月額料金

をまとめます。

## Remote Desktop Commanderとは

Desktop Commanderは、AIからローカルPCのファイルやターミナルを扱えるMCPサーバーです。

Remote MCPを使うと、ChatGPTやClaudeなどのWebクライアントから、離れた場所にある自分のPCへ接続できます。

公式サイトでは、Remote MCPについて次のような用途が案内されています。

- ローカルファイルの読み書き
- ターミナルコマンド実行
- プロセス操作
- コードやRepositoryの確認・修正
- サーバーやログの確認
- スマートフォンから自宅PCを操作

公式:

- [Desktop Commander](https://desktopcommander.app/)
- [Desktop Commander GitHub](https://github.com/wonderwhy-er/DesktopCommanderMCP)
- [Remote Desktop Commander Setup](https://github.com/desktop-commander/remote-desktop-commander/blob/main/docs/SETUP.md)

## ChatGPTから使うと何が変わるのか

通常のChatGPTだけなら、こちらのPCにあるRepositoryやファイルを直接見ることはできません。

Remote Desktop Commanderをつなぐと、ChatGPT側から、

```text
このPCのgit statusを確認して
```

や、

```text
C:\develop\workspace\example を開いてテストを実行して
```

のような依頼ができるようになります。

つまり、スマートフォンのChatGPTからでも、

```text
スマホ
  ↓
ChatGPT
  ↓
Remote MCP
  ↓
自宅PC
  ↓
git / npm / Docker / Python / ローカルファイル
```

という使い方が可能になります。

クラウド側へ開発環境を作り直すのではなく、**普段使っている実機そのものをAIの実行環境にできる**のが大きな違いです。

## PC側でRemote Deviceを起動する

公式セットアップでは、操作される側のPCで次を実行します。

```powershell
npx @wonderwhy-er/desktop-commander@latest remote
```

Node.js 18以上が必要です。

公式ドキュメントによると、起動するとブラウザでデバイス認証を行い、PCがRemote Desktop Commanderのデバイスとして登録されます。

Remote Deviceはフォアグラウンドで動くため、**接続中はターミナルを閉じない**ようにします。

## Windowsで警告だけ表示されて進まなかった

今回はWindows環境で最初につまずきました。

環境は、

```text
Node.js v24.13.1
npm 11.8.0
Desktop Commander 0.2.51
```

でした。

最初に、

```powershell
npx @wonderwhy-er/desktop-commander@latest remote
```

を実行すると、

```text
[DEP0040] DeprecationWarning:
The `punycode` module is deprecated.
```

という警告が表示されたあと、Remote Deviceの起動メッセージまで進みませんでした。

`uuid` や `glob` のdeprecated warningも表示されましたが、これらの警告そのものは即座にエラーという意味ではありません。

問題は、その後に本来表示されるはずの、

```text
Starting MCP Device...
```

などへ進まなかったことです。

## バージョンを確認する

まずnpm上の最新版を確認しました。

```powershell
npm view @wonderwhy-er/desktop-commander version
```

このときは、

```text
0.2.51
```

でした。

## 実際に起動できたコマンド

今回のWindows環境では、パッケージと実行するCLIを明示すると起動できました。

```powershell
npx --yes --package="@wonderwhy-er/desktop-commander@0.2.51" desktop-commander remote
```

ポイントは、

```text
npx <package> remote
```

ではなく、

```text
npx --package="<package>" desktop-commander remote
```

の形で **`desktop-commander` CLIを明示的に呼び出した**ことです。

将来バージョンが更新された場合は、まず、

```powershell
npm view @wonderwhy-er/desktop-commander version
```

で現在の最新版を確認した方が安全です。

公式の基本手順はあくまで、

```powershell
npx @wonderwhy-er/desktop-commander@latest remote
```

なので、上のコマンドは今回の環境でのトラブルシューティングとして扱っています。

## ChatGPT側へRemote Desktop Commanderを追加する

PC側を起動したら、ChatGPT側にもRemote Desktop Commanderを追加します。

今回使ったChatGPT Pluginはこちらです。

- [Remote Desktop Commander for ChatGPT](https://chatgpt.com/plugins/plugin_asdk_app_6a057d268ebc81919918d37eec718425)

同じRemote Desktop Commanderアカウントで認証し、ChatGPTと接続します。

公式のRemote MCP endpointは、

```text
https://mcp.desktopcommander.app/mcp
```

です。

接続後は、ChatGPTに例えば、

```text
Remote Desktop Commanderで接続中PCのpwdを実行して
```

と頼めます。

## 実際にpwdを実行してみた

接続後、ChatGPTからPCへ `pwd` を実行しました。

結果は概ね次のような場所でした。

```text
C:\Users\<user>\AppData\Local\npm-cache\_npx\...\
node_modules\@wonderwhy-er\desktop-commander\dist
```

Remote Deviceをnpxから起動しているため、最初のカレントディレクトリはDesktop Commander自身の実行場所になっていました。

重要なのはパスそのものではなく、

> **ChatGPT → Remote Desktop Commander → Windows PC**

の経路で実際にコマンドが実行され、結果がChatGPTへ返ってきたことです。

ここまで通れば、次は対象Repositoryへ移動して、

```powershell
Set-Location C:\develop\workspace\example
git status
```

のような操作もできます。

## 料金

2026年9月20日時点の公式料金は次の通りです。

| プラン | 月額 | Remote MCP |
| --- | ---: | --- |
| Free | $0 | 10,000 tool calls / 月 |
| Pro | $20 | Unlimited tool calls |

FreeでもChatGPT、Claude、その他MCPクライアントから利用できます。

公式料金:

- [Desktop Commander Pricing](https://desktopcommander.app/#pricing)

また、Remoteサービスを使わず、ローカルMCPサーバーとして利用するDesktop Commander本体は無料・オープンソースです。

つまり、ChatGPTからインターネット越しに自分のPCへ接続したい場合はRemote MCPの無料枠またはProを使い、同じPC上のMCPクライアントからだけ使うならローカル版という選択肢があります。

## 10,000 tool callsでどのくらい使えるのか

Remote MCPでは、AIがPC側のツールを呼び出すたびにtool callを消費します。

例えば、

```text
ディレクトリ一覧を取得
ファイルを読む
git statusを実行
テストを実行
ログを読む
ファイルを編集
```

といった操作が積み上がっていきます。

単発でPCを確認したり、軽い開発作業をしたりする用途なら、まずFreeの10,000 callsから試して利用量を見るのがよさそうです。

一方、AIエージェントへ長時間のRepository調査・実装・テストを何度も任せる運用では、tool call数は増えやすくなります。

## セキュリティ面で気をつけること

これは便利ですが、権限はかなり強力です。

AIから、

- ローカルファイルを読む
- ファイルを書き換える
- ターミナルコマンドを実行する
- 実行中プロセスへアクセスする

ことが可能になります。

そのため、最初は、

```text
pwd
git status
ディレクトリ一覧
ファイル読み取り
```

などの読み取り中心の操作から確認する方が安全です。

不要になった場合はRemote Deviceを実行しているターミナルで `Ctrl+C` を押せば接続を切れます。

公式セットアップでは、管理画面から個別デバイスのRevokeや全デバイスのRevokeも可能です。

## ChatGPT Workとの違い

個人的に一番面白いのはここでした。

ChatGPT Workなどのクラウド実行環境では、AI用の別環境で作業します。

Remote Desktop Commanderでは、

```text
いつものPC
いつものRepository
いつものNode.js
いつものDocker
いつものGit設定
```

をそのままAIへ触らせられます。

つまり、

```text
クラウドへ作業環境を再現する
```

のではなく、

```text
AIを自分の作業環境へ接続する
```

という考え方です。

特にスマートフォン中心で指示を出したい場合、

> **スマホからChatGPTへ話しかけて、自宅PCで実際の開発作業を進める**

という構成が現実的になります。

## まとめ

今回確認できた流れは次の通りです。

```text
1. ChatGPTへRemote Desktop Commanderを追加
2. Windows PCでRemote Deviceを起動
3. デバイス認証
4. ChatGPTと同じアカウントで接続
5. ChatGPTからpwdを実行
6. Windows PC上でコマンドが実行されることを確認
```

通常の起動コマンドは、

```powershell
npx @wonderwhy-er/desktop-commander@latest remote
```

です。

今回のWindows環境ではここで止まったため、

```powershell
npx --yes --package="@wonderwhy-er/desktop-commander@0.2.51" desktop-commander remote
```

のようにCLIを明示すると接続できました。

そして料金は、2026年9月20日時点で、

```text
Free: $0 / 月、10,000 tool calls
Pro : $20 / 月、Unlimited
```

です。

自分のPCをそのままChatGPTの実行Workerとして使えるので、特に「スマホから指示して、実作業は自宅PCで進めたい」という使い方とはかなり相性がよさそうです。
