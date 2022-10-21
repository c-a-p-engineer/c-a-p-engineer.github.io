---
title: "【bash】ログが行方不明に！？実行場所を気にしないシェルスクリプトの作り方"
date: 2022-10-22T08:00:00+09:00
description: "シェルスクリプトは実行した場所がカレントディレクトリとして扱われます。そのため僕はログが実行場所にできてしまったりして行方不明になったりしました。実行場所を気にしないようなシェルスクリプトの作り方。"
draft: false
enableToc: true
enableTocContent: true
tags: 
- bash
categories: 
- bash
image: images/thumbnail/Gnu-bash-logo.svg
---

# 【bash】ログが行方不明に！？実行場所を気にしないシェルスクリプトの作り方
シェルスクリプトは実行した場所がカレントディレクトリとして扱われます。
そのため僕はログが実行場所にできてしまったりして行方不明になったりしました。
実行場所を気にしないようなシェルスクリプトの作り方。

## シェルスクリプトが配置されているディレクトリに移動する
``cd `dirname $0` `` をシェルの冒頭に記載することでシェルスクリプトの配置ディレクトリ場所へ移動してくれます。

```bash:sample.sh {linenos=table,hl_lines=[4]}
#!/bin/sh

# 実行場所へ移動
cd `dirname $0`
pwd
```

こういうふうにすることで実行場所が固定されます。

### 注意点
以下のようにシェル内で `cd` したりすると値がシェルの配置場所が取れなくなります。

```bash:sample.sh
#!/bin/sh

# 実行場所へ移動
cd `dirname $0`
pwd

# ディレクトリ移動
cd /usr/local
pwd

# ディレクトリ移動
cd `dirname $0`
pwd
```

### 応用編
先に挙げたようにシェルの配置場所が取れなくなるので変数に入れて使いまわしますのが安全です。
```bash:sample.sh {linenos=table,hl_lines=[4]}
#!/bin/sh

# 実行場所へ移動
SCRIPT_DIR_PATH=$(cd "$(dirname "$0")"; pwd)
cd ${SCRIPT_DIR_PATH}
pwd

# ディレクトリ移動
cd /usr/local
pwd

# ディレクトリ移動
cd ${SCRIPT_DIR_PATH}
pwd
```