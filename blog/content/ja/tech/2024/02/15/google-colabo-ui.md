---
title: Google Colabratoryで実装する基本的なUI
date: 2024-02-15T13:00:00+09:00
description: Google ColabノートブックにUIコンポーネントを組み込むことできます。
draft: false
enableToc: true
enableTocContent: true
tags: 
- Google Colab
- Python
categories: 
- Python
image: images/thumbnail/python-logo-master-v3-TM.png
image_description: 'Pythonロゴは、Python SoftwareFoundationの商標です。'
---

# Google Colabratoryで実装する基本的なUI

Google ColabノートブックにUIコンポーネントを組み込むことできます。これによりユーザーはよりダイナミックでインタラクティブなプロジェクトを作成できます。

## セルタイトル

```python
#@title セルのタイトル
```

## 入力フォーム

```python
variable = "デフォルト値"#@param {type:"string"}
variable_num = "123"#@param {type:"number"}
```


## セレクトボックス

```python
# セレクトボックス
dropdown = 'value' #@param ["1", "2", "3"] {allow-input: true}
```


## 日付入力

```python
date_input = '2024-02-15' #@param {type:"date"}
```

## スライダー

```python
number_slider = 0 #@param {type:"slider", min:0, max:100, step:1}
```

## チェックボックス

```python
boolean_checkbox = True #@param {type:"boolean"}
```

## マークダウン

```
#@markdown ---
#@markdown #タイトル
#@markdown - 1
#@markdown   - 2
#@markdown ---
```

## JavaScriptを使う

ボタンを表示してクリックイベントをつける。

```python
from IPython.display import display, Javascript
from google.colab import output
from google.colab.output import eval_js

js = Javascript('''
            async function load_image() {
                const div = document.createElement('div');
                var button = document.createElement('button');
                var log = document.createElement('div');

                button.textContent = "button";
                button.onclick = function(){
                    log.innerHTML = "Button Clicked.";
                }
                div.appendChild(button)
                div.appendChild(log)

                document.querySelector("#output-area").appendChild(div);
                return
                } ''')

display(js)
eval_js('load_image()')

```

## まとめ
Google Colabratoryでのプロジェクトにインタラクティブな要素を追加することは、ユーザー体験を向上させる素晴らしい方法です。上記のコード例は、基本的なUIコンポーネントを組み込むための出発点として役立ちます。これらのコンポーネントを使って、よりインタラクティブでユーザーフレンドリーなノートブックを作成しましょう。