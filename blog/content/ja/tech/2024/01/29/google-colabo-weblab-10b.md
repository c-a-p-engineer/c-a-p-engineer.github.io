---
title: Google ColabでWeblab-10Bの量子化モデルを使用する
date: 2024-01-29T18:30:00+09:00
description: "Google Colabを使用してWeblab-10Bの量子化モデルを実行するための手順と実践的なコードの解説をします。"
draft: false
enableToc: true
enableTocContent: true
tags: 
- AI
- Google Colab
- Python
categories: 
- AI
image: images/thumbnail/python-logo-master-v3-TM.png
image_description: 'Pythonロゴは、Python SoftwareFoundationの商標です。'
---

# Google ColabでWeblab-10Bの量子化モデルを使用する

Google Colabを使用してWeblab-10Bの量子化モデルを実行するための手順と実践的なコードの解説をします。

Weblab-10Bは、日本語のテキストに特化した大規模な言語モデルであり、その量子化バージョンはリソースが限られた環境でも効率的に使用できます。

## Google Colab を使用して進めていく

Google Colab を使用して実際に使用してみます。

### パッケージのインストール

Google Colab上でモデルを実行する前に、必要なパッケージ`auto-gptq`をインストールします。

このパッケージは、量子化されたLLMを扱うために特別に設計されています。

```python
# パッケージインストール
!pip install auto-gptq
```

### モデルのセットアップ

`AutoGPTQForCausalLM.from_quantized`メソッドを使用してモデルをロードし、必要なトークナイザーと設定を初期化します。
ここでは、量子化されたモデルが保存されているディレクトリとモデルの名前を指定し、GPU上でモデルを実行するための設定を行います。

```python
import torch
from transformers import AutoTokenizer
from auto_gptq import AutoGPTQForCausalLM

quantized_model_dir = "dahara1/weblab-10b-instruction-sft-GPTQ"
model_basename = "gptq_model-4bit-128g"

tokenizer = AutoTokenizer.from_pretrained(quantized_model_dir)

model = AutoGPTQForCausalLM.from_quantized(
         # モデルのディレクトリ
         quantized_model_dir,
         # モデルのベース名
         model_basename=model_basename,
         # SafeTensorsを使用してメモリ効率を向上させる
         use_safetensors=True,
         # モデルを実行するデバイス。ここではGPUの最初のデバイスを指定。
         device="cuda:0")
```

### テキスト生成の実行
モデルに入力されるプロンプトを設定し、生成されるテキストの長さや多様性を制御するパラメーターを指定します。`model.generate`メソッドは、プロンプトに基づいてテキストを生成し、ユーザーが指定した要件を満たす応答を提供します。

AIが長文を返そうとしてもトークンが切れてしまうのでトークンが切れたのに回答が終わってない場合は再度実行して終了まで繰り返すようにしています。

```python
prompt_text = "プログラミング言語をリストにしてご紹介ください。"
prompt_template = f'以下は、タスクを説明する指示です。要求を適切に満たす応答を書きなさい。\n\n### 指示:\n{prompt_text}\n\n### 応答:\n'

while True:
  tokens = tokenizer(prompt_template, return_tensors="pt").to("cuda:0").input_ids
  output = model.generate(
    # 入力トークン。
    input_ids=tokens, 
    # 最大で追加される新しいトークンの数
    max_new_tokens=256, 
    # 確率的サンプリングを行うかどうか
    do_sample=True, 
    # サンプリング確率分布の温度。値が低いほど予測値に近いトークンを、高いほど多様なトークンを選択。
    temperature=0.8)

  history_text = tokenizer.decode(output[0])
  if "<|endoftext|>" in history_text:
    break
    print("指定の文字列が含まれています。")


history_text = tokenizer.decode(output[0]).replace("<|endoftext|>", "")
print(history_text)

# 会話を保存
history_text += "\n### 指示:\n"
```

結果は以下のように表示されます。

```text
以下は、タスクを説明する指示です。要求を適切に満たす応答を書きなさい。

### 指示:
プログラミング言語をリストにしてご紹介ください。

### 応答:
-Python
-Java
-C++
-JavaScript
-コード言語

```

### 会話を続ける

会話は以下のように続けることが可能です。

```python
# 会話を続ける
history_text += "前の応答の中でおすすめの言語と理由を教えて"
while True:
  tokens = tokenizer(history_text + "\n\n### 応答:\n", return_tensors="pt").to("cuda:0").input_ids
  output = model.generate(
      input_ids=tokens, 
      max_new_tokens=256, 
      do_sample=True, 
      temperature=0.8)

  history_text = tokenizer.decode(output[0])
  if "<|endoftext|>" in history_text:
    break
    print("指定の文字列が含まれています。")

history_text = tokenizer.decode(output[0]).replace("<|endoftext|>", "") + "\n\n"
print(history_text)
```

結果がこちらです。
前の会話を引き継いで応答をしています。

```text
以下は、タスクを説明する指示です。要求を適切に満たす応答を書きなさい。

### 指示:
プログラミング言語をリストにしてご紹介ください。

### 応答:
-Python
-Java
-C++
-JavaScript
-コード言語

### 指示:
前の応答の中でおすすめの言語と理由を教えて

### 応答:
-Python:Pythonは汎用性、オブジェクト指向、および拡張性の面で最適です。
-Java:Javaは静的型付け、およびオブジェクト指向の面で最適です。
-C++:C++は、複雑なハードウェアの操作と拡張に適した堅牢な言語です。
-JavaScript:JavaScriptは強力なユーザー・インタフェースを作成できるオブジェクト指向言語です。
-コード言語:コード言語は、データを処理できる、関数型のプログラミング言語です。

```

### まとめ

色々なモデルを試せたらと思います。
ChatGPTだけがAIではないので自分でカスタマイズなどを加えて自分用の特化AIを作れたらと思います。

### 参考文献
- <a href="https://huggingface.co/matsuo-lab/weblab-10b" target="_blank" rel="nofollow noopener">Hugging Face: Weblab-10B</a>
- <a href="https://huggingface.co/dahara1/weblab-10b-instruction-sft-GPTQ" target="_blank" rel="nofollow noopener">Hugging Face: Weblab-10B-instruction-sft-GPTQ</a>
