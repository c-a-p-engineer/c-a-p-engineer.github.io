---
title: Google ColabでGoogle Driveのゴミ箱内のファイルを削除する
date: 2024-09-15T02:30:00+09:00
description: Google Driveのゴミ箱内のファイルを一括削除できるコードを紹介します。
draft: false
enableToc: true
enableTocContent: true
tags: 
- Python
categories: 
- Python
image: images/thumbnail/Rust_programming_language_black_logo.svg.png
image_description: 'Rust Foundation'
---
# Google ColabでGoogle Driveのゴミ箱内のファイルを削除する

Google Driveを利用していると、不要になったファイルをゴミ箱に移動することがよくあります。しかし、ゴミ箱の中にはファイルがどんどん溜まってしまい、いずれ管理が面倒になることがあります。そこで今回は、**Google Colab**を使って、Google Driveのゴミ箱内のファイルを一括削除できるコードを紹介します。

このコードは、Google Drive APIを使用し、ゴミ箱内のすべてのファイルをリスト化して、削除する機能を持っています。また、削除するファイルの名前やパスを表示することで、どのファイルが削除されたかを確認できるようにしています。

## コードの説明

以下に紹介するコードは、Google Colab上でGoogle Drive APIを利用し、ゴミ箱にあるファイルを一覧取得し、順番に削除していきます。また、ファイルの削除状況を確認するために進捗バーを表示し、どのファイルが削除されたかをコンソールに出力します。

```python
# @title GoogleDriveゴミ箱削除
from googleapiclient.discovery import build
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google.colab import auth
from google.auth import default
from tqdm import tqdm
import time

def authenticate():
    """ユーザーを認証し、Google Drive APIのサービスを構築する"""
    auth.authenticate_user()  # Colab特有の認証プロセス
    creds, _ = default()  # デフォルトの認証情報を取得
    return build('drive', 'v3', credentials=creds)

def list_all_trashed_files(service):
    """ゴミ箱内のすべてのファイルを古い順にリスト化"""
    items = []
    page_token = None
    query = "trashed=true"
    fields = "nextPageToken, files(id, name, parents, createdTime)"
    
    # ページネーションを処理しつつ、すべての削除対象ファイルをリスト化
    while True:
        results = service.files().list(q=query, orderBy="createdTime", fields=fields, pageToken=page_token).execute()
        items.extend(results.get('files', []))
        page_token = results.get('nextPageToken', None)
        if not page_token:
            break

    return items

def get_full_file_path(service, file_id):
    """ファイルIDからファイルパスを取得する"""
    try:
        path_elements = []
        current_file = service.files().get(fileId=file_id, fields='id, name, parents').execute()

        # 親フォルダをたどりながらパスを生成
        while 'parents' in current_file:
            parent_id = current_file['parents'][0]
            current_file = service.files().get(fileId=parent_id, fields='id, name, parents').execute()
            path_elements.insert(0, current_file['name'])

        path_elements.append(current_file['name'])
        return '/' + '/'.join(path_elements)
    except Exception as e:
        return f"パス取得失敗: {str(e)}"

def delete_file(service, file):
    """単一のファイルを削除し、結果を表示"""
    try:
        file_path = get_full_file_path(service, file['id'])
        service.files().delete(fileId=file['id']).execute()
        print(f"削除: {file['name']} (ID: {file['id']}) - パス: {file_path}")
    except Exception as e:
        print(f"削除失敗: {file['name']} (ID: {file['id']}) - エラー: {str(e)}")

def empty_trash(service):
    """ゴミ箱内のファイルを削除し、進捗を表示"""
    items = list_all_trashed_files(service)

    if not items:
        print("ゴミ箱に削除対象ファイルはありません。")
        return

    total_items = len(items)
    print(f"削除対象の総ファイル数: {total_items}")

    # tqdmで進捗表示
    with tqdm(total=total_items, desc="ファイル削除中", unit="file") as pbar:
        for file in items:
            delete_file(service, file)
            pbar.update(1)

# メイン処理
if __name__ == '__main__':
    service = authenticate()
    empty_trash(service)
```

### コードのポイント

1. **認証のセットアップ (`authenticate`関数)**  
   Google Colab環境で認証を行い、Google Drive APIにアクセスできるようにします。`default()`を使って、認証情報を自動的に取得します。このプロセスは、Google Colab上で行う特有の方法です。

2. **ゴミ箱内のファイル一覧取得 (`list_all_trashed_files`関数)**  
   `files().list` メソッドを利用して、ゴミ箱内にあるすべてのファイルを取得します。取得したファイルは古い順にソートされます。

3. **ファイルパスの取得 (`get_full_file_path`関数)**  
   削除されるファイルのパスを取得します。ファイルの親フォルダをたどりながら、完全なファイルパスを構築します。

4. **ファイル削除 (`delete_file`関数)**  
   Google Driveからファイルを削除し、その結果をコンソールに出力します。削除されたファイルの名前、ID、およびパスを表示します。

5. **ゴミ箱内のすべてのファイルを削除 (`empty_trash`関数)**  
   ゴミ箱内のファイルをすべて削除します。`tqdm` を使って、削除処理の進捗が視覚的に確認できるようにしています。

### まとめ

このスクリプトを使用することで、**Google Colab**上でGoogle Driveのゴミ箱内のファイルを簡単に一括削除することができます。特に、大量のファイルがゴミ箱に溜まっている場合には、効率的に作業を進めることができるため非常に便利です。

Google Drive APIを使った自動化の良い例として、ぜひGoogle Colabを使って試してみてください。
