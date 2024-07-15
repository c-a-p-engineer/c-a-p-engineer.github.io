---
title: "PhpSpreadsheet を少しでも軽くする方法"
date: 2022-01-30T12:00:00+09:00
description: "PhpSpreadsheet を少しでも軽くする方法メモ"
draft: false
enableToc: true
enableTocContent: true
tags: 
- PHP
categories: 
- PHP
image: images/thumbnail/php.png
---

# PhpSpreadsheet を少しでも軽くする方法
`PHP` で `Excel` を扱える `PhpSpreadsheet` がとにかく重く、メモリを使うので少しでも軽くする方法メモ。

## サンプル
書き込み、追記でないのであれば読み取りモードにすることで早くなります。
また最後にメモリを解放することでメモリの圧迫にも対応

```php
use PhpOffice\PhpSpreadsheet\IOFactory;

class Excel{
    public function load($filePath, $sheetName){
        $reader = IOFactory::createReader('Xlsx');
        // セルのデータだけ読み取る
        $reader->setReadDataOnly(true);
        // 特定のシートだけ読み取る
        $reader->setLoadSheetsOnly($sheetName);
        $spreadsheet = $reader->load($filePath);

        // TODO 処理

        // ワークシートを閉じてメモリを解放
        $spreadsheet->disconnectWorksheets();
        $spreadsheet->garbageCollect();
    }
}
```

## 参考
* <a href="https://phpspreadsheet.readthedocs.io/en/latest/topics/reading-and-writing-to-file/#read-data-only" target="_blank" rel="nofollow noopener">Read data only</a>
* <a href="https://phpspreadsheet.readthedocs.io/en/latest/topics/creating-spreadsheet/#read-specific-sheets-only" target="_blank" rel="nofollow noopener">Read specific sheets only</a>
* <a href="https://phpspreadsheet.readthedocs.io/en/latest/topics/creating-spreadsheet/#clearing-a-workbook-from-memory" target="_blank" rel="nofollow noopener">Clearing a Workbook from memory</a>
