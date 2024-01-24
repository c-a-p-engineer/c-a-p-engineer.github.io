---
title: ChatGPT Code InterpreterのPythonパッケージ
date: 2024-01-24T13:00:00+09:00
description: ChatGPT Code Interpreter環境内で使用可能なPythonパッケージは何なのかを調査し、何ができるか簡単にまとめました。
draft: false
enableToc: true
enableTocContent: true
tags: 
- AI
- ChatGPT
categories: 
- AI
image: images/thumbnail/ai_robot.jpg
---

# ChatGPT Code InterpreterのPythonパッケージ

ChatGPT Code Interpreter環境内で使用可能なPythonパッケージは何なのかを調査し、何ができるか簡単にまとめました。

## 注意事項

さまざまなパッケージが入っていますが **ChatGPT の Code Interpreter では外部のネットに接続できません。**
そのためスクレイピングなどはできないです。

外部のネットワークに繋げないので別途ファイルをアップしたりして工夫して使ってください。

## ChatGPTに入っているすべてのパッケージ

以下のコードを実行させてパッケージの一覧を取得させました。

```python
import pkg_resources

installed_packages = sorted(["%s==%s" % (i.key, i.version) for i in pkg_resources.working_set])
installed_packages
```

実行結果（長いので隠しています。

このあとのセクションで何ができるかを説明します。

{{< expand "実行結果" >}}
```
['absl-py==2.0.0',
 'affine==2.4.0',
 'aiohttp==3.8.1',
 'aiosignal==1.3.1',
 'analytics-python==1.4.post1',
 'anyio==3.7.1',
 'anytree==2.8.0',
 'argcomplete==1.10.3',
 'argon2-cffi-bindings==21.2.0',
 'argon2-cffi==23.1.0',
 'arviz==0.15.1',
 'asn1crypto==1.5.1',
 'asttokens==2.4.1',
 'async-timeout==4.0.3',
 'attrs==23.1.0',
 'audioread==3.0.1',
 'babel==2.14.0',
 'backcall==0.2.0',
 'backoff==1.10.0',
 'backports.zoneinfo==0.2.1',
 'basemap-data==1.3.2',
 'basemap==1.3.2',
 'bcrypt==4.1.2',
 'beautifulsoup4==4.8.2',
 'bleach==6.1.0',
 'blinker==1.7.0',
 'blis==0.7.11',
 'bokeh==2.4.0',
 'branca==0.7.0',
 'brotli==1.1.0',
 'cachetools==5.3.2',
 'cairocffi==1.6.1',
 'cairosvg==2.5.2',
 'camelot-py==0.10.1',
 'catalogue==2.0.10',
 'certifi==2019.11.28',
 'cffi==1.16.0',
 'chardet==4.0.0',
 'charset-normalizer==2.1.1',
 'click-plugins==1.1.1',
 'click==8.1.7',
 'cligj==0.7.2',
 'cloudpickle==3.0.0',
 'cmudict==1.0.16',
 'comm==0.2.0',
 'compressed-rtf==1.0.6',
 'countryinfo==0.1.2',
 'cryptography==3.4.8',
 'cssselect2==0.7.0',
 'cycler==0.12.1',
 'cymem==2.0.8',
 'cython==0.29.36',
 'databricks-sql-connector==0.9.1',
 'dbus-python==1.2.16',
 'debugpy==1.8.0',
 'decorator==4.4.2',
 'defusedxml==0.7.1',
 'deprecat==2.1.1',
 'dill==0.3.7',
 'distro-info==0.23+ubuntu1.1',
 'dlib==19.22.1',
 'dnspython==2.4.2',
 'docx2txt==0.8',
 'ebcdic==1.1.1',
 'ebooklib==0.18',
 'einops==0.3.2',
 'email-validator==2.1.0.post1',
 'entrypoints==0.4',
 'et-xmlfile==1.1.0',
 'exceptiongroup==1.2.0',
 'exchange-calendars==3.4',
 'executing==2.0.1',
 'extract-msg==0.28.7',
 'faker==8.13.2',
 'fastapi==0.95.2',
 'fastjsonschema==2.19.0',
 'fastprogress==1.0.3',
 'ffmpeg-python==0.2.0',
 'ffmpy==0.3.1',
 'filelock==3.13.1',
 'fiona==1.8.20',
 'flask-cachebuster==1.0.0',
 'flask-cors==4.0.0',
 'flask-login==0.6.3',
 'flask==3.0.0',
 'folium==0.12.1',
 'fonttools==4.47.0',
 'fpdf==1.7.2',
 'frozenlist==1.4.1',
 'future==0.18.3',
 'fuzzywuzzy==0.18.0',
 'gensim==4.1.0',
 'geographiclib==1.52',
 'geopandas==0.10.2',
 'geopy==2.2.0',
 'gradio==2.2.15',
 'graphviz==0.17',
 'gtts==2.2.3',
 'h11==0.14.0',
 'h2==4.1.0',
 'h5netcdf==1.1.0',
 'h5py==3.6.0',
 'hpack==4.0.0',
 'html5lib==1.1',
 'httpcore==1.0.2',
 'httptools==0.6.1',
 'httpx==0.25.2',
 'hypercorn==0.14.3',
 'hyperframe==6.0.1',
 'idna==2.8',
 'imageio-ffmpeg==0.4.9',
 'imageio==2.33.1',
 'imapclient==2.1.0',
 'imgkit==1.2.2',
 'importlib-metadata==7.0.0',
 'importlib-resources==6.1.1',
 'iniconfig==2.0.0',
 'ipykernel==6.27.1',
 'ipython-genutils==0.2.0',
 'ipython==8.12.3',
 'isodate==0.6.1',
 'itsdangerous==2.1.2',
 'jax==0.2.28',
 'jedi==0.19.1',
 'jinja2==3.1.2',
 'joblib==1.3.2',
 'json5==0.9.14',
 'jsonpickle==3.0.2',
 'jsonschema-specifications==2023.11.2',
 'jsonschema==4.20.0',
 'jupyter-client==7.4.9',
 'jupyter-core==5.1.3',
 'jupyter-server==1.23.5',
 'jupyterlab-pygments==0.2.2',
 'jupyterlab-server==2.19.0',
 'jupyterlab==3.4.8',
 'keras==2.6.0',
 'kerykeion==2.1.16',
 'kiwisolver==1.4.5',
 'korean-lunar-calendar==0.3.1',
 'librosa==0.8.1',
 'llvmlite==0.41.1',
 'loguru==0.5.3',
 'lxml==4.9.3',
 'markdown2==2.4.12',
 'markdownify==0.9.3',
 'markupsafe==2.1.3',
 'matplotlib-inline==0.1.6',
 'matplotlib-venn==0.11.6',
 'matplotlib==3.4.3',
 'mistune==3.0.2',
 'mizani==0.9.3',
 'mne==0.23.4',
 'monotonic==1.6',
 'moviepy==1.0.3',
 'mpmath==1.3.0',
 'mtcnn==0.1.1',
 'multidict==6.0.4',
 'munch==4.0.0',
 'murmurhash==1.0.10',
 'mutagen==1.45.1',
 'nashpy==0.0.35',
 'nbclassic==0.4.5',
 'nbclient==0.9.0',
 'nbconvert==7.13.0',
 'nbformat==5.9.2',
 'nest-asyncio==1.5.8',
 'networkx==2.6.3',
 'nltk==3.6.3',
 'notebook-shim==0.2.3',
 'notebook==6.5.1',
 'numba==0.58.1',
 'numexpr==2.8.6',
 'numpy-financial==1.0.0',
 'numpy==1.21.2',
 'odfpy==1.4.1',
 'olefile==0.47',
 'opencv-python==4.5.2.54',
 'openpyxl==3.0.10',
 'opt-einsum==3.3.0',
 'orjson==3.9.10',
 'oscrypto==1.3.0',
 'packaging==23.2',
 'pandas==1.3.2',
 'pandocfilters==1.5.0',
 'paramiko==3.4.0',
 'parso==0.8.3',
 'pathy==0.10.3',
 'patsy==0.5.4',
 'pdf2image==1.16.3',
 'pdfkit==0.6.1',
 'pdfminer.six==20191110',
 'pdfplumber==0.5.28',
 'pdfrw==0.4',
 'pexpect==4.9.0',
 'pickleshare==0.7.5',
 'pillow==8.3.2',
 'pip==20.0.2',
 'pkgutil-resolve-name==1.3.10',
 'platformdirs==4.1.0',
 'plotly==5.3.0',
 'plotnine==0.10.1',
 'pluggy==1.3.0',
 'pooch==1.8.0',
 'preshed==3.0.9',
 'priority==2.0.0',
 'proglog==0.1.10',
 'prometheus-client==0.19.0',
 'prompt-toolkit==3.0.43',
 'pronouncing==0.2.0',
 'psutil==5.9.7',
 'ptyprocess==0.7.0',
 'pure-eval==0.2.2',
 'py==1.11.0',
 'pyaudio==0.2.11',
 'pycountry==20.7.3',
 'pycparser==2.21',
 'pycryptodome==3.19.0',
 'pycryptodomex==3.19.0',
 'pydantic==1.10.2',
 'pydot==1.4.2',
 'pydub==0.25.1',
 'pydyf==0.8.0',
 'pygments==2.17.2',
 'pygobject==3.36.0',
 'pygraphviz==1.7',
 'pyjwt==2.8.0',
 'pylog==1.1',
 'pyluach==2.2.0',
 'pymc3==3.11.5',
 'pymupdf==1.19.6',
 'pynacl==1.5.0',
 'pyopenssl==21.0.0',
 'pypandoc==1.6.3',
 'pyparsing==3.1.1',
 'pypdf2==1.28.6',
 'pyphen==0.14.0',
 'pyproj==3.5.0',
 'pyprover==0.5.6',
 'pyshp==2.1.3',
 'pyswisseph==2.10.3.2',
 'pytesseract==0.3.8',
 'pytest==6.2.5',
 'pyth3==0.7',
 'python-apt==2.0.1+ubuntu0.20.4.1',
 'python-dateutil==2.8.2',
 'python-docx==0.8.11',
 'python-dotenv==1.0.0',
 'python-multipart==0.0.6',
 'python-pptx==0.6.21',
 'pyttsx3==2.90',
 'pytz==2023.3.post1',
 'pywavelets==1.4.1',
 'pyxlsb==1.0.8',
 'pyyaml==6.0.1',
 'pyzbar==0.1.8',
 'pyzmq==25.1.2',
 'qrcode==7.3',
 'rarfile==4.0',
 'rasterio==1.2.10',
 'rdflib==6.0.0',
 'referencing==0.32.0',
 'regex==2023.10.3',
 'reportlab==3.6.1',
 'requests-unixsocket==0.2.0',
 'requests==2.31.0',
 'resampy==0.4.2',
 'rpds-py==0.15.2',
 'scikit-image==0.18.3',
 'scikit-learn==1.0',
 'scipy==1.7.1',
 'seaborn==0.11.2',
 'semver==3.0.2',
 'send2trash==1.8.2',
 'sentencepiece==0.1.99',
 'setuptools==45.2.0',
 'shap==0.39.0',
 'shapely==1.7.1',
 'six==1.14.0',
 'slicer==0.0.7',
 'smart-open==6.4.0',
 'sniffio==1.3.0',
 'snowflake-connector-python==2.7.12',
 'snuggs==1.4.7',
 'sortedcontainers==2.4.0',
 'soundfile==0.10.2',
 'soupsieve==2.5',
 'spacy-legacy==3.0.12',
 'spacy==3.1.6',
 'speechrecognition==3.8.1',
 'srsly==2.4.8',
 'stack-data==0.6.3',
 'starlette==0.27.0',
 'statsmodels==0.13.1',
 'svglib==1.1.0',
 'svgwrite==1.4.1',
 'sympy==1.8',
 'tables==3.6.1',
 'tabula==1.0.5',
 'tabulate==0.8.9',
 'tenacity==8.2.3',
 'terminado==0.18.0',
 'text-unidecode==1.3',
 'textblob==0.15.3',
 'textract==1.6.4',
 'theano-pymc==1.1.2',
 'thinc==8.0.17',
 'threadpoolctl==3.2.0',
 'thrift==0.16.0',
 'tifffile==2023.7.10',
 'tinycss2==1.2.1',
 'toml==0.10.2',
 'tomli==2.0.1',
 'toolz==0.12.0',
 'torch==1.10.0',
 'torchaudio==0.10.0',
 'torchtext==0.6.0',
 'torchvision==0.11.1',
 'tornado==6.4',
 'tqdm==4.64.0',
 'traitlets==5.14.0',
 'trimesh==3.9.29',
 'typer==0.4.2',
 'typing-extensions==4.5.0',
 'tzlocal==5.2',
 'ujson==5.9.0',
 'unattended-upgrades==0.1',
 'urllib3==1.25.8',
 'uvicorn==0.24.0.post1',
 'uvloop==0.19.0',
 'wand==0.6.13',
 'wasabi==0.10.1',
 'watchfiles==0.21.0',
 'wcwidth==0.2.12',
 'weasyprint==53.3',
 'webencodings==0.5.1',
 'websocket-client==1.7.0',
 'websockets==10.3',
 'werkzeug==3.0.1',
 'wheel==0.34.2',
 'wordcloud==1.8.1',
 'wrapt==1.16.0',
 'wsproto==1.2.0',
 'xarray-einstats==0.5.1',
 'xarray==2023.1.0',
 'xgboost==1.4.2',
 'xlrd==1.2.0',
 'xlsxwriter==3.1.9',
 'xml-python==0.4.3',
 'yarl==1.9.4',
 'zipp==3.17.0',
 'zopfli==0.2.3']
```

{{< /expand >}}

## 何ができるか

すべてではないですが何ができるかをまとめてみました。

パッケージが入っているので記載はしていますが**外部のネットに繋げないので気をつけてください。**

Pythonの標準の機能として使えるものは記載しておりません。

### 画像処理
- `opencv-python`: 画像操作、顔認識、オブジェクト検出など。
- `imageio`: 画像の読み込みと保存、アニメーションGIFの作成など。
- `scikit-image`: 画像処理と分析、フィルタリング、エッジ検出など。

### 動画作成
- `moviepy`: 動画編集、クリップの合成、効果の追加など。
- `opencv-python`: 動画の読み込みと処理、動画からのフレーム抽出など。

### 音声処理
- `pydub`: 音声ファイルの編集、フォーマット変換、エフェクトの適用など。
- `librosa`: 音声分析、音楽情報検索、音声特徴抽出など。
- `soundfile`: 音声ファイルの読み込みと書き込み。

### データ分析
- `pandas`: データ操作と分析、データフレームの作成、データの統計分析など。
- `numpy`: 数値計算、多次元配列操作、数学的関数など。
- `scipy`: 科学技術計算、最適化、信号処理など。
- `matplotlib`: データのビジュアライゼーション、グラフ作成など。
- `seaborn`: 統計的データ可視化、高度なプロット機能。

### 機械学習
- `scikit-learn`: 分類、回帰、クラスタリング、次元削減など。
- `torch`: ディープラーニング、テンソル計算、ニューラルネットワークなど。
- `keras`: ディープラーニングモデルの構築とトレーニング。

### Web開発
- `flask`: ウェブアプリケーションの開発、APIの作成など。
- `aiohttp`: 非同期ウェブサーバーとクライアント。

### ネットワーキング
- `requests`: HTTPリクエストの送信、レスポンスの処理。
- `aiohttp`: 非同期HTTPリクエスト。
- `paramiko`: SSH2プロトコルに基づくネットワーク接続、ファイル転送など。

### PDF
- `pdfminer.six`: PDFからテキストを抽出し、解析します。
- `pdfrw`: PDFファイルを読み込み、結合、書き込み、変更を行います。
- `reportlab`: 新しいPDF文書の作成とカスタマイズを行います。

### Excel
- `openpyxl`: .xlsxファイルを読み込み、編集、作成します。
- `xlrd`: 古いバージョンのExcelファイル (.xls) を読み込みます。
- `pandas`: Excelファイルをデータフレームに読み込み、データ分析と処理を行います。

### Word
- `python-docx`: Word文書 (.docx) を読み込み、編集、作成します。

### パワーポイント
- `python-pptx`: パワーポイント (.ppt) を読み込み、編集、作成します。

### 自然言語処理
- `nltk`: テキスト処理、解析、分類など。
- `spacy`: 高度なテキスト解析、エンティティ抽出、言語モデリングなど。
- `gensim`: トピックモデリング、文書類似性分析など。

### Webスクレイピング
- `beautifulsoup4`: HTMLやXMLからデータを抽出、解析。
- `lxml`: XMLとHTMLの処理、解析。

### データ可視化
- `matplotlib`: 2Dグラフ作成、データ可視化。
- `seaborn`: 統計的データ可視化、高度なプロット機能。
- `plotly`: インタラクティブなグラフ作成、データ可視化。

### 科学計算
- `numpy`: 数値計算、多次元配列操作。
- `scipy`: 科学技術計算、最適化、信号処理。

### API開発
- `flask`: 軽量なWebアプリケーションフレームワーク。
- `fastapi`: モダンで高速なAPI開発フレームワーク。

### 暗号化
- `cryptography`: 暗号化、デコード、安全なパスワード保存など。
- `pyopenssl`: OpenSSLラップライブラリ、SSL/TLSの操作など。

### テストと品質保証
- `pytest`: Pythonのための強力なテスティングフレームワーク。

### システムとハードウェアの相互作用
- `psutil`: システムモニタリング、プロセス管理、ハードウェア情報取得など。

### 地理空間データ処理
- `geopandas`: 地理空間データの操作と分析のためのライブラリ。
- `shapely`: 幾何学的形状の操作、空間的なクエリーの実行など。
- `fiona`: 地理空間データのファイル読み込み、書き込み。

### マークダウン処理
- `markdown2`: Markdown テキストを HTML に変換するライブラリ。

## まとめ
何が入っているかを知ることでChatGPT上で色々できることが広がると思います。
