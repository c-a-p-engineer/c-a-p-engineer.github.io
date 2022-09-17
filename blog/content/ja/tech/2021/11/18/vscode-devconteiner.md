---
title: "VSCode で簡単に開発環境を整える devcontainer"
date: 2021-11-18T09:30:00+09:00
description: "VSCode で簡単に開発環境を整える devcontainer"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Visual Studio Code
categories: 
- エディタ
image: images/thumbnail/Visual_Studio_Code_1.35_icon.svg
image_description: 'Visual Studio Codeは、米国およびその他の国におけるMozillaFoundationの商標です。'
---

# VSCode で簡単に開発環境を整える devcontainer
開発環境を作る際にただでさえ、ローカル環境を整えるのに苦労しますがエディタなどの環境を整えるのも一苦労します。
その言った時に VSCode の devcontainer を使用するととても簡単に環境を整える事が出来ます。

## 前提
* VSCode をエディタとして利用
  * プラグイン <a href="https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers" target="_blank" rel="nofollow noopener">Remote - Containers</a> 導入済み
* Docker を導入済み

簡単にご説明しますと Docker 内で VSCode が起動するので環境が同一になるように作られています。
* <a href="https://code.visualstudio.com/docs/remote/containers" target="_blank" rel="nofollow noopener">Developing inside a Container using Visual Studio Code Remote Development</a>

## 導入方法
試しにサンプルリポジトリを使用してみます。
1. <a href="https://github.com/microsoft/vscode-remote-try-python" target="_blank" rel="nofollow noopener"> microsoft / vscode-remote-try-python</a> を試しにダウンロードしてください。
2. VSCode 内でコマンド `> Remote-Containers: Open Folder in Container` を実行するとフォルダダイアログが開かれます。
3. フォルダダイアログから `.devcontainer` があるフォルダを開きます。
4. VSCodeが新たに開き直されてDockerが実行されます。
5. 開き終わると環境が構築されます。

サンプルのファイルは `Dockerfiile` を指定していますが `docker-compose.yml` を利用することなども出来ます。
これだけで複雑な環境を作る必要なく使用が可能です。
