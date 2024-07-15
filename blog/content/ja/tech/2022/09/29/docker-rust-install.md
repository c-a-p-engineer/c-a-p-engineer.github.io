---
title: "【Docker】Rustをインストール"
date: 2022-09-29T07:20:00+09:00
description: "DockerにRustをインストールするメモ。Tauriを使用しようとしてRustのインストールに罠があったためメモを残しておきます。"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Docker
- Rust
categories: 
- Docker
image: images/thumbnail/docker.png
---

# 【Docker】Rustをインストール
DockerにRustをインストールするメモ。
Tauriを使用しようとしてRustのインストールに罠があったためメモを残しておきます。

## DockerFile
```DockerFile
FROM ubuntu:20.04

RUN apt-get update && apt-get install -y \
    vim \
    curl \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Rust install
ENV RUST_HOME /usr/local/lib/rust
ENV RUSTUP_HOME ${RUST_HOME}/rustup
ENV CARGO_HOME ${RUST_HOME}/cargo
RUN mkdir /usr/local/lib/rust && \
    chmod 0755 $RUST_HOME
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs > ${RUST_HOME}/rustup.sh \
    && chmod +x ${RUST_HOME}/rustup.sh \
    && ${RUST_HOME}/rustup.sh -y --default-toolchain nightly --no-modify-path
ENV PATH $PATH:$CARGO_HOME/bin
```

## Rustのインストール注意点
僕がRustをDockerに入れた際、発生した注意点。
* `RUST_HOME` を作成しないと `$HOME` にインストールされてしまった別ユーザが `cargo` コマンドを使えない。
* `PATH` に `$CARGO_HOME/bin` を通さないと `cargo` コマンドが使えない。

という罠たちがあり `cargo: command not found` がいっぱい出て困りました…