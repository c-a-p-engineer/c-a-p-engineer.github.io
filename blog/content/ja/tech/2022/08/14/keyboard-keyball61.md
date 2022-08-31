---
title: "【キーボード】Keyball61 を使ってみた"
date: 2022-08-14T19:30:00+09:00
description: "自作キーボードの Keyball61 を購入してみて使ってみた感想"
draft: false
enableToc: true
enableTocContent: true
tags: 
- キーボード
categories: 
- キーボード
image: tech/2022/08/14/keyboard-keyball61/keyball61.jpg
---

# 【キーボード】Keyball61 を使ってみた
自作キーボードの Keyball61 を購入してみて使ってみた感想。
![keyball61](/tech/2022/08/14/keyboard-keyball61/keyball61.jpg "keyball61") 

## keyball61 構成
自作キーボードなのですがフリマサイト見つけて今回組み立て済みのものを購入させていただきました。
（本当は自分で作ってみたいのですが小さな子供が家に居るので
* Keyball61 LED <a href="https://shirogane-lab.com/products/keyball61" target="_blank" rel="nofollow noopener"> Keyball61 - Shirogane Lab</a>
* Kailh Box サイレントメカニカルキーボードスイッチ
<a href="https://www.amazon.co.jp/dp/B08XN8FT59?&linkCode=li3&tag=takahiro0508-22&linkId=7d9570fdfcd3c394b1824373f8cc663e&language=ja_JP&ref_=as_li_ss_il" target="_blank"><img border="0" src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B08XN8FT59&Format=_SL250_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=takahiro0508-22&language=ja_JP" ></a><img src="https://ir-jp.amazon-adsystem.com/e/ir?t=takahiro0508-22&language=ja_JP&l=li3&o=9&a=B08XN8FT59" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />

* キーキャップ（MXスイッチ対応）
<a href="https://www.amazon.co.jp/gp/product/B097JKN7NN?ie=UTF8&psc=1&linkCode=li3&tag=takahiro0508-22&linkId=0246d5d002d9e1c824aff93230b63d7b&language=ja_JP&ref_=as_li_ss_il" target="_blank"><img border="0" src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B097JKN7NN&Format=_SL250_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=takahiro0508-22&language=ja_JP" ></a><img src="https://ir-jp.amazon-adsystem.com/e/ir?t=takahiro0508-22&language=ja_JP&l=li3&o=9&a=B097JKN7NN" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />

* 34mm トラックボール
<a href="https://www.amazon.co.jp/gp/product/B071NX7Y2J?ie=UTF8&psc=1&linkCode=li3&tag=takahiro0508-22&linkId=f2225a5d81926fa756fe29871f6d5348&language=ja_JP&ref_=as_li_ss_il" target="_blank"><img border="0" src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B071NX7Y2J&Format=_SL250_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=takahiro0508-22&language=ja_JP" ></a><img src="https://ir-jp.amazon-adsystem.com/e/ir?t=takahiro0508-22&language=ja_JP&l=li3&o=9&a=B071NX7Y2J" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />

* TRSS ケーブル（キーボード間をつなげるケーブル）※付属のものを使用
* Type-Cケーブル（キーボードとPCをつなげる）※家にあったものを使用

## 使ってみての感想
* 今まで人指大玉トラックボールを使用していたので結構違和感があり親指操作にはそれなりに慣れが必要。
* キーボードとマウスが一体になっているためマウス用のレイヤーに切り替えてのクリック操作など独特の癖がある
→REMAPを使用してのキーマップ変更で色々出来るので沼に浸かるのが楽しくなる。
* キー数も少なく省スペースでとても良い。（元々HHKBを使っているのでフルキーボード派だと慣れるのに時間が掛かると思われる。

## KyeMap
<a href="https://remap-keys.app/" target="_blank" rel="nofollow noopener">REMAP</a> を使って簡単にキーボードのマッピングを変更することが可能。

REMAPの使い方についてはこちらを参照してください。
<a href="https://salicylic-acid3.hatenablog.com/entry/remap-manual" target="_blank" rel="nofollow noopener">（初心者編）Remapを使ってキーマップを書き換えよう - 自作キーボード温泉街の歩き方</a> 

Keyball61のREMAPのサンプルです。
<a href="https://remap-keys.app/catalog/RZSU1CrvEW4lns0ww5BM/keymap" target="_blank" rel="nofollow noopener">Keyball61 - REMAP</a>

## 特殊キーコード
keyball61 にはトラックボールがついているのでトラックボールの設定など特殊なキーコードがあります。
<a href="https://github.com/Yowkees/keyball/tree/main/qmk_firmware/keyboards/keyball/keyball61#special-keycodes" target="_blank" rel="nofollow noopener">keyball61 - Special keycodes</a>

HEX      | キーコード  |説明
---------|------------|------------------------------------------------------------------
`0x5DA5` | `KBC_RST`  |キーボール構成をリセット
`0x5DA6` | `KBC_SAVE` |キーボール構成をEEPROMに永続化する
`0x5DA7` | `CPI_I100` |トラックボールの感度を100上げる(CPI)(max 12000)
`0x5DA8` | `CPI_D100` |トラックボールの感度を1,000上げる(CPI) (min 100)
`0x5DA9` | `CPI_I1K`  |トラックボールの感度を100下げる(CPI)(max 12000)
`0x5DAA` | `CPI_D1K`  |トラックボールの感度を1,000下げる(CPI) (min 100)
`0x5DAB` | `SCRL_TO`  |スクロールモードにトグルで切り替える
`0x5DAC` | `SCRL_MO`  |押下している間スクロールモードを有効にする
`0x5DAD` | `SCRL_DVI` |スクロール感度を上げる (max 7 = 1/128)
`0x5DAE` | `SCRL_DVD` |スクロール感度を下げる (min 0 = 1/1)

## 参考
* <a href="https://git-scm.com/docs/git-cherry-pick" target="_blank" rel="nofollow noopener">Git - git-cherry-pick Documentation</a>
* <a href="https://remap-keys.app/catalog/RZSU1CrvEW4lns0ww5BM/keymap" target="_blank" rel="nofollow noopener">Keyball61 - REMAP</a>