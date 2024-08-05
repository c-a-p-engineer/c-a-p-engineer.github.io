---
title: Pythonパッケージを調べる方法
date: 2024-08-06T04:00:00+09:00
description: Pythonで開発を行っていると、インストール済みのパッケージやその詳細を確認したい場面があります。
draft: false
enableToc: true
enableTocContent: true
tags: 
- Python
categories: 
- Python
image: images/thumbnail/python-logo-master-v3-TM.png
image_description: 'Pythonロゴは、Python SoftwareFoundationの商標です。'
---

# Pythonパッケージを調べる方法

Pythonで開発を行っていると、インストール済みのパッケージやその詳細を確認したい場面があります。また、特定のパッケージ内の関数やクラスを調べることも必要です。ここでは、Pythonパッケージを調べる方法と、その実行結果を示します。


## インストール済みパッケージの確認方法

### pipコマンドを使用する

`pip`コマンドを使うと、インストール済みのパッケージ一覧や特定のパッケージの詳細情報を確認できます。

- **インストール済みのパッケージ一覧を表示する**
   ```bash
   pip list
   ```

   **実行結果例:**
   ```plaintext
   Package    Version
   ---------- -------
   numpy      1.21.2
   pandas     1.3.3
   ```

- **パッケージの詳細情報を表示する**
  ```bash
  pip show numpy
  ```

  **実行結果例:**
  ```plaintext
  Name: numpy
  Version: 1.21.2
  Summary: NumPy is the fundamental package for array computing with Python.
  Home-page: https://www.numpy.org
  Author: Travis E. Oliphant et al.
  License: BSD
  ```

## condaコマンドを使用する

Anaconda環境を使用している場合、`conda`コマンドを使用します。

- **インストール済みのパッケージ一覧を表示する**
  ```bash
  conda list
  ```

  **実行結果例:**
  ```plaintext
  # packages in environment at /opt/anaconda3:
  #
  # Name                    Version                   Build  Channel
  numpy                     1.21.2                   pypi_0    pypi
  pandas                    1.3.3                    pypi_0    pypi
  ```

## パッケージ内の関数やクラスの調べ方

パッケージ内の関数やクラスの詳細を調べるための方法を紹介します。

### dir()関数を使用する

- 簡単に使用でき、指定したオブジェクトのすべての属性やメソッドを一覧表示します。
- 出力されるリストは文字列のリストで、属性名やメソッド名が含まれます。
- 詳細な説明は含まれていないため、具体的な機能や使い方はわかりません。

```python
import numpy as np

print(dir(np))
```

**実行結果例:**
```plaintext
['ALLOW_THREADS', 'AxisError', 'BUFSIZE', 'CLIP', 'ComplexWarning', ...
```

### help()関数を使用する


- オブジェクトのヘルプドキュメントを表示します。
- オブジェクトの詳細な説明、使い方、ドキュメントを確認。

```python
import numpy as np

help(np)
```

**実行結果例の一部:**
```plaintext
Help on module numpy:

NAME
    numpy

DESCRIPTION
    NumPy is the fundamental package for array computing with Python. It ...
```

### inspectモジュールを使用する

- オブジェクトのソースコードや詳細な情報を取得します。
- オブジェクトの内部構造、ソースコード、メソッドや関数の引数情報などを確認。

```python
import inspect
import numpy as np

print(inspect.getmembers(np, inspect.isfunction))
```

**実行結果例の一部:**
```plaintext
[('abs', <function abs at 0x7f8c4c1b7f70>), ('add', <function add at 0x7f8c4c1b7040>), ...
```

### __doc__属性を使用する

- オブジェクトに関連付けられたドキュメントストリングを表示します。
- クラス、関数、モジュールなどの説明文を確認。

```python
import numpy as np

print(np.__doc__)
```

**実行結果例の一部:**
```plaintext
NumPy
====

Provides
  1. An array object of arbitrary homogeneous items
  2. Fast mathematical operations over arrays
  3. Linear Algebra, Fourier Transforms, Random Number Generation
```

### まとめ

- `pip list`と`pip show`でインストール済みパッケージやその詳細を確認
- `conda list`でAnaconda環境のパッケージを確認
- `dir()`、`help()`、`inspect`モジュール、`__doc__`属性でパッケージ内の関数やクラスの詳細を調査

これらの方法を活用して、Python開発におけるパッケージ管理を効率的に行いましょう。
