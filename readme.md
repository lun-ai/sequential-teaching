## Raw record data
All raw data collected are stored in data/test

### Amazon Mechanical Turk data
data/test/amt

### Bamberg group
data/test/bamberg

### test trials
data/test/pre_test_1
data/test/pre_test_2

### json to csv conversion folder (empty since all were processed)
data/test/records_json

## Analysis 
### setup processing of data from paths to experiment / trials groups
data/analysis/analysis.py

Requirements:
- python 3
- pip
- pandas
- scipy
- numpy
- statsmodels
- matplotlib

For conda environment,
```bash
conda env create -f analysis-env.yml
```
You can setup the python interpreter to be the one create in conda environment
Or to activate environment from commend line
```bash
conda activate analysis
```

Implemented functions:
- extract data from records
- human sort trace analysis (chi-sq followed by spearman rank) against various machine traces including:
  - IS, DS, BS, QS, MS, hybrid, and variants of each
- save / show trace analysis graphs (histograms/bar graphs)
- output / print student t-test / ANOVA + tukey statistical test results and p-values 
  on: 
  1) merge test (score/response time/comparisons)
  2) sort test (socre/response time/comparisons)
- save / generate mean + error graphs on:
  1) merge test (score/response time/comparisons)
  2) sort test (socre/response time/comparisons)

```python
DATA_DIR_AMT_GROUP1 = "../test/amt/Group1/"
extract_from_CSV([DATA_DIR_AMT_GROUP1], trace_analysis_method='chi_sq_2x2', trace_similarity_analysis=True, similarity_graphs=True,
                      save_graphs=True,
                      show_records=False,
                      chi_sq_significance=0.005, filter_std_multiplier=1, save_path="../results/amt/", verbose=False,
                      pre_test_mean_acc=0.6513439999999999, pre_test_std_acc=0.17209328186771264,
                      filter_name="")
```

Given a csv file data path (groups separated by conditions and batches), extract_from_CSV from above extracts all data
from csv files into python. The full details is not showing due to flag
```python'
show_records=False,
```
A filter based on MaRs-IB test accuracy pre_test_mean_acc+/-pre_test_std_acc. 
This also calls for a human sort trace analysis with chi-sq alpha set to 0.005 and generation of trace analysis graphs. 
These graphs are saved.

After extraction (when applied without filter), the following line
```python
pre_test_cross_groups_filter([g1, g2, g3, g4], ["G1", "G2", "G3", "G4"])
```
produces information about each group demographic (second argument list is the labels of the groups)
and recomputes MaRs-IB test accuracy filter range.

Textual response in the partition can be saved to separate csv files for easy access and examination.
```python
save_free_ans_csv("../results/amt/Group1/G1_text_responses.csv", g1["free_res"])
```

Finally, statistics of meta-results can be computed by calling
```python
sort_statistical_tests([g1, g2, g3, g4], ["G1", "G2", "G3", "G4"], anova_two_way=True, tukey_two_way=True)
merge_statistical_tests([g1, g2, g3, g4], ["G1", "G2", "G3", "G4"], anova_two_way=True, tukey_two_way=True)
```
Lines graphs with standard error are saved. 

### functions for processing data from raw records
data/analysis/process_data.py

Implemented functions:
- extract data from csv files of provided path(s)
- process raw data into readable format
- Convert of raw data for further processing and statistical tests
- produce graphs from human sort trace analysis and meta-results

### evaluation of the closest matches of given human sort trace
data/analysis/eval_trace

### a list of sorting algorithm implementations
data/analysis/sort_algorithms

Implemented functions:
- sort a given integer set based on:
  - IS, DS, BS, QS, MS, hybrid, and variants of each
- check correctness of each implementation

### converting json submissions into csv files
data/analysis/json_to_csv.py

## Graphs and visualisations
All graphs are defaulted to be saved in data/results in their respective group folder.
Graphs with results which are finalised are included only. 