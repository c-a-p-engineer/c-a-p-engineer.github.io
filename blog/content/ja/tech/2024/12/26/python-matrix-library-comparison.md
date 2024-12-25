---
title: 【Python】行列ライブラリ比較：Pandas, DuckDB, Polars, Dask, Vaexのベンチマーク
date: 2024-12-26T03:30:00+09:00
description: 大規模なデータ処理を行う際、Pythonには多数の行列操作ライブラリが用意されています。代表的な5つの行列ライブラリである Pandas, DuckDB, Polars, Dask, Vaex を比較し、それぞれの特徴とパフォーマンスを見ていきます。
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

# 【Python】行列ライブラリ比較：Pandas, DuckDB, Polars, Dask, Vaexのベンチマーク

大規模なデータ処理を行う際、Pythonには多数の行列操作ライブラリが用意されています。代表的な5つの行列ライブラリである **Pandas, DuckDB, Polars, Dask, Vaex** を比較し、それぞれの特徴とパフォーマンスを見ていきます。

## 比較環境

GoogleColabのCPUインスタンスで実行して比較します。

## 比較内容
本ミッションでは、Pythonで大規模データ（1,000,000行・30,000,000行・50,000,000行）を扱う代表的なライブラリ5つ（pandas / DuckDB / Polars / Dask / Vaex）を対象に、以下を比較しています：

1. **読込時間（LoadTime_sec）**  
2. **groupby処理時間（GroupByTime_sec）**  
3. **読込後のメモリ使用量差分（LoadMemoryDiff_MB）**  
4. **groupby後のメモリ使用量差分（GroupByMemoryDiff_MB）**  

いずれも“差分”として、処理前後のメモリ変化を計測しています。行数を増やしながらどのような挙動を示すかを可視化することで、各ライブラリの得意領域を探ります。

---

## 結果サマリ（全行数）

下表は、全ての行数(1,000,000 / 30,000,000 / 50,000,000)を通した結果をまとめたものです。

| Library | Rows      | 読込時間(sec) | GroupBy(sec) | 読み込みメモリ(MD) | GroupByメモリ(MB) |
|---------|-----------|--------------|-----------------|-------------------|----------------------|
| pandas  | 1,000,000 | 0.718694     | 0.200022        | 23.769531         | 23.886719            |
| DuckDB  | 1,000,000 | 0.389037     | 0.046632        | 51.914062         | 1.015625             |
| Polars  | 1,000,000 | 0.211263     | 0.166592        | 34.203125         | 18.828125            |
| Dask    | 1,000,000 | 0.033127     | 0.476037        | 2.503906          | 43.242188            |
| Vaex    | 1,000,000 | 0.424267     | 0.400279        | 58.261719         | 33.507812            |
| pandas  | 30,000,000| 11.407202    | 3.223912        | 699.160156        | 18.492188            |
| DuckDB  | 30,000,000| 8.985925     | 1.395745        | 884.289062        | 0.257812             |
| Polars  | 30,000,000| 6.188008     | 1.856967        | 920.175781        | 80.382812            |
| Dask    | 30,000,000| 0.014753     | 16.430000       | 8.972656          | 421.085938           |
| Vaex    | 30,000,000| 15.347542    | 9.269258        | 556.410156        | 64.843750            |
| pandas  | 50,000,000| 19.488823    | 3.526238        | 1208.144531       | -54.378906           |
| DuckDB  | 50,000,000| 20.179205    | 1.729918        | 1232.980469       | 0.515625             |
| Polars  | 50,000,000| 6.843395     | 5.500243        | 1525.531250       | 0.687500             |
| Dask    | 50,000,000| 0.028209     | 25.887592       | 10.386719         | 406.511719           |
| Vaex    | 50,000,000| 26.561565    | 19.205436       | 1110.734375       | 31.863281            |

- **GroupBy**：集約（`groupby("category")["value"].sum()`）の所要秒数

---

## 詳細分析

### 1. 1,000,000 行（1百万行）
- **Polars**が読込時間0.21秒、groupby 0.17秒と、非常に高速です。  
- **Dask**は読込時間が突出して短い(0.03秒)ですが、その後のgroupby処理にやや時間(0.48秒)がかかっています。  
- メモリでは**DuckDB**が読込時に約52MB差分と大きめ。一方で、groupby後には差分が1MB程度に収まっており、処理効率の高さが伺えます。

### 2. 30,000,000 行（3千万行）
- **Polars**が引き続き読込(6.19秒)・groupby(1.86秒)ともに高速。  
- **DuckDB**も読込(8.99秒)・groupby(1.40秒)で優秀。  
- **pandas**は読込に11.41秒、groupbyに3.22秒かかっていますが、一般的なPython実装としては妥当な数字。  
- **Dask**は読込が驚異的に短い(0.01秒)ものの、groupbyに16.43秒という大幅な時間を要しています。分散処理用ライブラリらしく、準備段階は速いものの、実際の計算を`compute()`するときに大きなコストが発生。  
- メモリ差分では、**Polars**のgroupby後に約80MB増えている点が特徴。DuckDBはgroupby後のメモリ増が非常に小さい(0.26MB)のが目立ちます。

### 3. 50,000,000 行（5千万行）
- **Polars**が読込6.84秒、groupby5.50秒で依然好調。しかし読込後のメモリ差分は約1.5GB（1525MB増）と非常に大きいことが分かります。  
- **pandas**は読込19.49秒、groupby3.53秒で順当な伸び。メモリ差分は約1.2GB増加後、なぜかgroupby後に -54MBと減少しており、一時的なオブジェクト解放が行われた可能性があります。  
- **DuckDB**は読込20.18秒、groupby1.73秒で高速集約。メモリ差分は約1.23GB増。groupby後はほぼ変わらないため、一度にメモリを確保し、効率的に処理していると思われます。  
- **Dask**のgroupbyは25.89秒で、分散フレームワークらしく計算時に負荷が集中。メモリは読込後10MB増のまま、一気にgroupby後406MBも増加。  
- **Vaex**は読込26.56秒、groupby19.21秒でやや遅めながら、1億行規模に近いサイズでも扱いやすいという特徴があります。

---

## 総合評価

1. **Polars**：高速性が目立つ反面、読込時のメモリ増大が大きい。Rust実装の恩恵で、単一ノード上での速度は極めて優秀。  
2. **DuckDB**：SQLで同様の処理ができ、高速なgroupbyが大きな強み。メモリ効率も良好で、大規模データを扱う際の選択肢として有力。  
3. **pandas**：Pythonエコシステムでもっとも使われるが、大きなデータセットでは処理時間・メモリ消費がやや厳しい印象。ただし学習コストが低く、既存資産との連携面で強みがある。  
4. **Dask**：読込が非常に速い反面、groupby処理に時間がかかりやすい。並列・分散環境で本領を発揮するので、ローカルPC単体の計測では真価が表れにくい場合がある。  
5. **Vaex**：オンメモリにロードせず扱える設計だが、初回読込でやや時間がかかる。数千万～億行規模でも操作しやすい点は大きな魅力。

---

## さらなる検討

- **1億行超級**でさらに拡張：  
  DuckDBやPolars、Vaexあたりは、より大規模なデータセットへの適用が期待できます。  
- **分散処理（Dask / Sparkなど）**：  
  ローカルPC単体ではパフォーマンスが伸び悩む場合がありますが、クラスタ運用でスケールアウトすると真価を発揮。  
- **メモリ最適化**：  
  Polarsのように高速な一方、メモリ使用量が大きくなるライブラリもあるため、環境ごとのチューニングやクラスタ構成が重要になります。

---

## まとめ

- **高速性**：PolarsとDuckDBが際立つ結果となりましたが、メモリ面や集約処理時の挙動には差が見られます。  
- **安定性**：pandasはシングルスレッドで扱いやすい半面、大規模データには向かないケースも。  
- **柔軟性**：DaskやVaexは大きなデータを分散またはオンメモリ外で扱えるため、データサイズが膨大になってくるほど活躍の余地があります。

## 比較用コード

Google Colabで実行して比較できます。

```python
# ====================================================
# セクション0: 必要なライブラリのインストール
# ====================================================
!pip install pandas duckdb polars dask vaex --quiet

import pandas as pd
import duckdb
import polars as pl
import dask.dataframe as dd
import vaex
import time
import psutil
import os
import gc
import matplotlib.pyplot as plt

# ====================================================
# ユーティリティ関数群
# ====================================================

def get_memory_usage_mb():
    """
    現在のプロセスが使用しているメモリ(MB)を取得して返す。
    """
    process = psutil.Process(os.getpid())
    return process.memory_info().rss / 1024**2  # MB単位

def generate_csv(file_name, num_rows):
    """
    大量のデータを一度にメモリへ保持せず、1行ずつCSVファイルに書き込む。
    これにより、ファイル作成時のメモリ使用量を抑えることができる。
    """
    with open(file_name, mode="w", encoding="utf-8") as f:
        # ヘッダー行
        f.write("id,category,value\n")
        for i in range(num_rows):
            category = f"cat{i % 10}"
            value = i * 0.5
            # CSV行として書き込み
            f.write(f"{i},{category},{value}\n")

def benchmark_pandas(csv_file):
    """
    pandasでのCSV読込 & groupby集計の時間とメモリ差分を計測して返す。
    戻り値: (load_time, groupby_time, load_mem_diff, groupby_mem_diff, grouped_result)
    """
    gc.collect()

    # --- 読込 ---
    mem_before_load = get_memory_usage_mb()
    start_time = time.perf_counter()
    df = pd.read_csv(csv_file)
    load_time = time.perf_counter() - start_time
    mem_after_load = get_memory_usage_mb()
    load_mem_diff = mem_after_load - mem_before_load  # 差分メモリ

    # --- groupby ---
    mem_before_groupby = get_memory_usage_mb()
    start_time = time.perf_counter()
    df_grouped = df.groupby("category")["value"].sum()
    groupby_time = time.perf_counter() - start_time
    mem_after_groupby = get_memory_usage_mb()
    groupby_mem_diff = mem_after_groupby - mem_before_groupby  # 差分メモリ

    return load_time, groupby_time, load_mem_diff, groupby_mem_diff, df_grouped

def benchmark_duckdb(csv_file):
    """
    DuckDBでのCSV読込 & groupby集計の時間とメモリ差分を計測。
    戻り値: (load_time, groupby_time, load_mem_diff, groupby_mem_diff, grouped_result)
    """
    gc.collect()

    # --- 読込 ---
    mem_before_load = get_memory_usage_mb()
    start_time = time.perf_counter()
    con = duckdb.connect()
    con.execute(f"CREATE TABLE sample_data AS SELECT * FROM '{csv_file}'")
    load_time = time.perf_counter() - start_time
    mem_after_load = get_memory_usage_mb()
    load_mem_diff = mem_after_load - mem_before_load

    # --- groupby ---
    mem_before_groupby = get_memory_usage_mb()
    start_time = time.perf_counter()
    df_grouped = con.execute("""
        SELECT category, SUM(value) AS total_value
        FROM sample_data
        GROUP BY category
    """).df()
    groupby_time = time.perf_counter() - start_time
    mem_after_groupby = get_memory_usage_mb()
    groupby_mem_diff = mem_after_groupby - mem_before_groupby

    return load_time, groupby_time, load_mem_diff, groupby_mem_diff, df_grouped

def benchmark_polars(csv_file):
    """
    PolarsでのCSV読込 & groupby集計の時間とメモリ差分を計測して返す。
    戻り値: (load_time, groupby_time, load_mem_diff, groupby_mem_diff, grouped_result)
    """
    gc.collect()

    # --- 読込 ---
    mem_before_load = get_memory_usage_mb()
    start_time = time.perf_counter()
    df = pl.read_csv(csv_file)
    load_time = time.perf_counter() - start_time
    mem_after_load = get_memory_usage_mb()
    load_mem_diff = mem_after_load - mem_before_load

    # --- groupby ---
    mem_before_groupby = get_memory_usage_mb()
    start_time = time.perf_counter()
    df_grouped = (
        df
        .group_by("category")
        .agg([
            pl.col("value").sum().alias("total_value")
        ])
    )
    groupby_time = time.perf_counter() - start_time
    mem_after_groupby = get_memory_usage_mb()
    groupby_mem_diff = mem_after_groupby - mem_before_groupby

    return load_time, groupby_time, load_mem_diff, groupby_mem_diff, df_grouped

def benchmark_dask(csv_file):
    """
    DaskでのCSV読込 & groupby集計の時間とメモリ差分を計測して返す。
    戻り値: (load_time, groupby_time, load_mem_diff, groupby_mem_diff, grouped_result)
    """
    gc.collect()

    # --- 読込 ---
    mem_before_load = get_memory_usage_mb()
    start_time = time.perf_counter()
    df = dd.read_csv(csv_file)  # Daskの遅延読込
    load_time = time.perf_counter() - start_time
    mem_after_load = get_memory_usage_mb()
    load_mem_diff = mem_after_load - mem_before_load

    # --- groupby ---
    mem_before_groupby = get_memory_usage_mb()
    start_time = time.perf_counter()
    df_grouped = df.groupby("category")["value"].sum().compute()  # 実際の計算
    groupby_time = time.perf_counter() - start_time
    mem_after_groupby = get_memory_usage_mb()
    groupby_mem_diff = mem_after_groupby - mem_before_groupby

    return load_time, groupby_time, load_mem_diff, groupby_mem_diff, df_grouped

def benchmark_vaex(csv_file):
    """
    VaexでのCSV読込 & groupby集計の時間とメモリ差分を計測して返す。
    戻り値: (load_time, groupby_time, load_mem_diff, groupby_mem_diff, grouped_result)
    """
    gc.collect()

    # --- 読込 ---
    mem_before_load = get_memory_usage_mb()
    start_time = time.perf_counter()
    df = vaex.from_csv(csv_file, convert=False)  # オンメモリ化しない読み込み
    load_time = time.perf_counter() - start_time
    mem_after_load = get_memory_usage_mb()
    load_mem_diff = mem_after_load - mem_before_load

    # --- groupby ---
    mem_before_groupby = get_memory_usage_mb()
    start_time = time.perf_counter()
    df_grouped = df.groupby(by="category", agg={"value": "sum"})
    groupby_time = time.perf_counter() - start_time
    mem_after_groupby = get_memory_usage_mb()
    groupby_mem_diff = mem_after_groupby - mem_before_groupby

    return load_time, groupby_time, load_mem_diff, groupby_mem_diff, df_grouped

def plot_bar_chart(results_df, x_col, y_col, title):
    """
    棒グラフを表示する汎用関数
    x_col: X軸に表示する列名 (Library)
    y_col: Y軸に表示する列名 (Time or Memory)
    """
    plt.figure(figsize=(7, 4))
    plt.bar(results_df[x_col], results_df[y_col], 
            color=["#4c72b0", "#55a868", "#c44e52", "#8172b2", "#ccb974"])
    plt.title(title)
    plt.xlabel(x_col)
    plt.ylabel(y_col)
    plt.xticks(rotation=45)
    plt.tight_layout()
    plt.show()

# ====================================================
# セクション1: 複数パターンのデータ行数でテスト
# ====================================================
SAMPLE_SIZES = [1_000_000, 30_000_000, 50_000_000]  # 行数パターン
all_results = []

for num_rows in SAMPLE_SIZES:
    print(f"\n========== 処理開始: num_rows={num_rows} ==========")

    # 1) CSVファイルの作成 (メモリ節約版)
    csv_file = f"sample_data_{num_rows}.csv"
    print(f"{num_rows} 行のサンプルCSVを作成中: {csv_file}")
    start_write = time.perf_counter()
    generate_csv(csv_file, num_rows)
    end_write = time.perf_counter()
    print(f"CSVファイル生成完了 (所要時間: {end_write - start_write:.2f}秒)")

    # 2) 各ライブラリでベンチマーク
    print("\n=== ベンチマーク開始 ===")
    benchmarks = []

    # pandas
    print("\n--- pandas ---")
    load_t, groupby_t, load_mem_diff, groupby_mem_diff, _ = benchmark_pandas(csv_file)
    benchmarks.append(["pandas", num_rows, load_t, groupby_t, load_mem_diff, groupby_mem_diff])

    # DuckDB
    print("\n--- DuckDB ---")
    load_t, groupby_t, load_mem_diff, groupby_mem_diff, _ = benchmark_duckdb(csv_file)
    benchmarks.append(["DuckDB", num_rows, load_t, groupby_t, load_mem_diff, groupby_mem_diff])

    # Polars
    print("\n--- Polars ---")
    load_t, groupby_t, load_mem_diff, groupby_mem_diff, _ = benchmark_polars(csv_file)
    benchmarks.append(["Polars", num_rows, load_t, groupby_t, load_mem_diff, groupby_mem_diff])

    # Dask
    print("\n--- Dask ---")
    load_t, groupby_t, load_mem_diff, groupby_mem_diff, _ = benchmark_dask(csv_file)
    benchmarks.append(["Dask", num_rows, load_t, groupby_t, load_mem_diff, groupby_mem_diff])

    # Vaex
    print("\n--- Vaex ---")
    load_t, groupby_t, load_mem_diff, groupby_mem_diff, _ = benchmark_vaex(csv_file)
    benchmarks.append(["Vaex", num_rows, load_t, groupby_t, load_mem_diff, groupby_mem_diff])

    print("\n=== ベンチマーク終了 ===")

    # 3) 結果をDataFrame化 → グラフ表示
    results_df = pd.DataFrame(
        benchmarks, 
        columns=["Library", "Rows", "LoadTime_sec", "GroupByTime_sec", "LoadMemoryDiff_MB", "GroupByMemoryDiff_MB"]
    )
    print("\n=== 処理結果の比較表 ===")
    print(results_df)

    # --- 読込時間グラフ ---
    plot_bar_chart(results_df, "Library", "LoadTime_sec", f"Read Time Comparison ({num_rows} rows)")

    # --- groupby処理時間グラフ ---
    plot_bar_chart(results_df, "Library", "GroupByTime_sec", f"GroupBy Time Comparison ({num_rows} rows)")

    # --- 読込時のメモリ差分グラフ ---
    plot_bar_chart(results_df, "Library", "LoadMemoryDiff_MB", f"Memory Diff after Load ({num_rows} rows)")

    # --- groupby時のメモリ差分グラフ ---
    plot_bar_chart(results_df, "Library", "GroupByMemoryDiff_MB", f"Memory Diff after GroupBy ({num_rows} rows)")

    # 全結果をまとめる
    all_results.extend(benchmarks)

    print(f"\n========== 処理完了: num_rows={num_rows} ==========\n")

# ====================================================
# セクション2: すべての行数をまとめた結果
# ====================================================
final_results_df = pd.DataFrame(
    all_results, 
    columns=["Library", "Rows", "LoadTime_sec", "GroupByTime_sec", "LoadMemoryDiff_MB", "GroupByMemoryDiff_MB"]
)
print("=== 全行数の結果をまとめたテーブル ===")
print(final_results_df)
```

## 参考

- <a href="https://pandas.pydata.org/docs/" target="_blank" rel="nofollow noopener">Pandas Documentation</a>  
- <a href="https://duckdb.org/" target="_blank" rel="nofollow noopener">DuckDB Documentation</a>  
- <a href="https://pola.rs/" target="_blank" rel="nofollow noopener">Polars Documentation</a>  
- <a href="https://dask.org/" target="_blank" rel="nofollow noopener">Dask Documentation</a>  
- <a href="https://vaex.io/" target="_blank" rel="nofollow noopener">Vaex Documentation</a>  
