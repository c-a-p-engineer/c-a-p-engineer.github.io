---
title: Google Colab で VOICEBOX  で音声を生成する
date: 2024-01-18T18:30:00+09:00
description: "Google Colab 上で VOICEBOX  を使用して音声を合成してみます。"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Python
- Google Colab
- 音声
categories: 
- Python
image: images/thumbnail/python-logo-master-v3-TM.png
image_description: 'Pythonロゴは、Python SoftwareFoundationの商標です。'
---

# Google Colab で VOICEBOX で音声を生成する

Google Colab 上で VOICEBOX を使用して音声を合成してみます。

## VOICEBOX で音声を生成

実際のコード類です。

### 初期設定

```bash
#初期設定
!curl -sSfL https://raw.githubusercontent.com/VOICEVOX/voicevox_core/8cf307df4412dc0db0b03c6957b83b032770c31a/scripts/downloads/download.sh | bash -s
%cd voicevox_core/
!wget https://github.com/VOICEVOX/voicevox_core/releases/download/0.14.1/voicevox_core-0.14.1+cpu-cp38-abi3-linux_x86_64.whl
!pip install voicevox_core-0.14.1+cpu-cp38-abi3-linux_x86_64.whl
!wget https://raw.githubusercontent.com/VOICEVOX/voicevox_core/406f6c41408836840b9a38489d0f670fb960f412/example/python/run.py
```

### 生成

```bash
# 実行
text = 'こんにちは！こぴぺたんだよ！ツイッターランドで美少女してます！'
speaker_id = 10

!python ./run.py --dict-dir "./open_jtalk_dic_utf_8-1.11" --text $text --out "../data.wav" --speaker-id $speaker_id
from IPython.display import Audio
Audio('../data.wav', autoplay=True)
```

実際に作成した音声が以下です。

<audio controls src="/tech/2024/01/18/colabo-voicevox/data.wav"></audio>

これで自分の好きな音声を生成ができます。

### モデル情報

自分が生成したいモデルを探しましょう。

```python
from pathlib import Path
import sys
from voicevox_core import VoicevoxCore, METAS

core = VoicevoxCore(open_jtalk_dict_dir=Path("open_jtalk_dic_utf_8-1.11"))

from pprint import pprint
pprint(METAS)
```

モデル情報が出てくるので自分が生成したいモデル情報を設定します。
```
[Meta(name='四国めたん',
      styles=[Style(name='ノーマル', id=2),
              Style(name='あまあま', id=0),
              Style(name='ツンツン', id=6),
              Style(name='セクシー', id=4),
              Style(name='ささやき', id=36),
              Style(name='ヒソヒソ', id=37)],
      speaker_uuid='7ffcb7ce-00ec-4bdc-82cd-45a8889e43ff',
      version='0.14.1'),
 Meta(name='ずんだもん',
      styles=[Style(name='ノーマル', id=3),
              Style(name='あまあま', id=1),
              Style(name='ツンツン', id=7),
              Style(name='セクシー', id=5),
              Style(name='ささやき', id=22),
              Style(name='ヒソヒソ', id=38)],
      speaker_uuid='388f246b-8c41-4ac1-8e2d-5d79f3ff56d9',
      version='0.14.1'),
 Meta(name='春日部つむぎ',
      styles=[Style(name='ノーマル', id=8)],
      speaker_uuid='35b2c544-660e-401e-b503-0e14c635303a',
      version='0.14.1'),
 Meta(name='雨晴はう',
      styles=[Style(name='ノーマル', id=10)],
      speaker_uuid='3474ee95-c274-47f9-aa1a-8322163d96f1',
      version='0.14.1'),
 Meta(name='波音リツ',
      styles=[Style(name='ノーマル', id=9)],
      speaker_uuid='b1a81618-b27b-40d2-b0ea-27a9ad408c4b',
      version='0.14.1'),
 Meta(name='玄野武宏',
      styles=[Style(name='ノーマル', id=11),
              Style(name='喜び', id=39),
              Style(name='ツンギレ', id=40),
              Style(name='悲しみ', id=41)],
      speaker_uuid='c30dc15a-0992-4f8d-8bb8-ad3b314e6a6f',
      version='0.14.1'),
 Meta(name='白上虎太郎',
      styles=[Style(name='ふつう', id=12),
              Style(name='わーい', id=32),
              Style(name='びくびく', id=33),
              Style(name='おこ', id=34),
              Style(name='びえーん', id=35)],
      speaker_uuid='e5020595-5c5d-4e87-b849-270a518d0dcf',
      version='0.14.1'),
 Meta(name='青山龍星',
      styles=[Style(name='ノーマル', id=13)],
      speaker_uuid='4f51116a-d9ee-4516-925d-21f183e2afad',
      version='0.14.1'),
 Meta(name='冥鳴ひまり',
      styles=[Style(name='ノーマル', id=14)],
      speaker_uuid='8eaad775-3119-417e-8cf4-2a10bfd592c8',
      version='0.14.1'),
 Meta(name='九州そら',
      styles=[Style(name='ノーマル', id=16),
              Style(name='あまあま', id=15),
              Style(name='ツンツン', id=18),
              Style(name='セクシー', id=17),
              Style(name='ささやき', id=19)],
      speaker_uuid='481fb609-6446-4870-9f46-90c4dd623403',
      version='0.14.1'),
 Meta(name='もち子さん',
      styles=[Style(name='ノーマル', id=20)],
      speaker_uuid='9f3ee141-26ad-437e-97bd-d22298d02ad2',
      version='0.14.1'),
 Meta(name='剣崎雌雄',
      styles=[Style(name='ノーマル', id=21)],
      speaker_uuid='1a17ca16-7ee5-4ea5-b191-2f02ace24d21',
      version='0.14.1'),
 Meta(name='WhiteCUL',
      styles=[Style(name='ノーマル', id=23),
              Style(name='たのしい', id=24),
              Style(name='かなしい', id=25),
              Style(name='びえーん', id=26)],
      speaker_uuid='67d5d8da-acd7-4207-bb10-b5542d3a663b',
      version='0.14.1'),
 Meta(name='後鬼',
      styles=[Style(name='人間ver.', id=27), Style(name='ぬいぐるみver.', id=28)],
      speaker_uuid='0f56c2f2-644c-49c9-8989-94e11f7129d0',
      version='0.14.1'),
 Meta(name='No.7',
      styles=[Style(name='ノーマル', id=29),
              Style(name='アナウンス', id=30),
              Style(name='読み聞かせ', id=31)],
      speaker_uuid='044830d2-f23b-44d6-ac0d-b5d733caa900',
      version='0.14.1'),
 Meta(name='ちび式じい',
      styles=[Style(name='ノーマル', id=42)],
      speaker_uuid='468b8e94-9da4-4f7a-8715-a22a48844f9e',
      version='0.14.1'),
 Meta(name='櫻歌ミコ',
      styles=[Style(name='ノーマル', id=43),
              Style(name='第二形態', id=44),
              Style(name='ロリ', id=45)],
      speaker_uuid='0693554c-338e-4790-8982-b9c6d476dc69',
      version='0.14.1'),
 Meta(name='小夜/SAYO',
      styles=[Style(name='ノーマル', id=46)],
      speaker_uuid='a8cc6d22-aad0-4ab8-bf1e-2f843924164a',
      version='0.14.1'),
 Meta(name='ナースロボ＿タイプＴ',
      styles=[Style(name='ノーマル', id=47),
              Style(name='楽々', id=48),
              Style(name='恐怖', id=49),
              Style(name='内緒話', id=50)],
      speaker_uuid='882a636f-3bac-431a-966d-c5e6bba9f949',
      version='0.14.1')]

```

## 参考

- <a href="https://monomonotech.jp/kurage/memo/230227_voicevox_colaboratory.html" target="_blank" rel="nofollow noopener">ColaboratoryでVOICEVOXによる読み上げを簡単に行う</a>
- <a href="https://hiro20180901.com/2024/01/03/use-voicevox-core-on-wsl2/" target="_blank" rel="nofollow noopener">WSL2 で VOICEVOX core を使用して合成音声を生成する</a>
