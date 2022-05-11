# Explanatory machine learning for sequential human teaching

## Summary
In the presence work, we explore the explanatory effects of curriculum order and the presence of machine-learned explanations for sequential problem-solving.

We carried out an empirical study involving human participants from Amazon Mechanical Turk in a four-groups factorial 2 x 2 design. 
Human participants were asked to learn an efficient sorting strategy while being presented materials necessary for them to learn a variant of merge sort.
We included data from participants who claimed to have no background in programing, which was the main sample that we focused on in the analysis.  

Explanations provided to human participants were generated offline based on the logic programs learned by the Meta-interpretive learning system, [Metagolo](https://dl.acm.org/doi/10.5555/2832581.2832726).

## Use Metagolo to learn the merge sort variant
To learn merge sort without learning merge first, 
```bash
swipl -s metagol/experiments/merge_sort/learn.pl -g learn_merge_sort -g halt
```

To first learn merge and then learn merge sort,
```bash
swipl -s metagol/experiments/merge_sort/learn.pl -g learn_merge_sort_in_episodes -g halt
```
## Data processing
### Amazon Mechanical Turk data
All AMT data in csv format can be found in folder data/test/amt

### Setup processing of data from paths to experiment / trials groups
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

Finally, statistics of meta-results can be computed by calling
```python
sort_statistical_tests([g1, g2, g3, g4], ["G1", "G2", "G3", "G4"], anova_two_way=True, tukey_two_way=True)
merge_statistical_tests([g1, g2, g3, g4], ["G1", "G2", "G3", "G4"], anova_two_way=True, tukey_two_way=True)
```
Lines graphs with standard error are saved. 

### Functions for processing data from raw records
data/analysis/process_data.py

Implemented functions:
- extract data from csv files of provided path(s)
- process raw data into readable format
- Convert of raw data for further processing and statistical tests
- produce graphs from human sort trace analysis and meta-results

### Evaluation of the closest matches of given human sort trace
data/analysis/eval_trace.py

### List of sorting algorithm implementations
data/analysis/sort_algorithms.py

Implemented sorting algorithms:
- Insertion sort (IS)
- Dictionary sort (DS)
- Bubble sort (BS) 
- Quick sort (QS)
- Merge sort (MS)
- Hybrid insertion sort and dictionary sort (Hybrid)
- Some respective variants

## Graphs and visualisations
Graphs and emirical analysis results are contained in data/results/amt.

If run analysis.py, graphs are defaulted to be saved in data/results in their respective group folder.

Relevant graphs included:
- Human sorting strategy distributions in sort training and sort performance test (Group1 - Group4)
- data/results/amt/meta_results contains comparisons of merge and sort performance test and performance comparisons of adapted strategies versus other strategies


## Interface
Our experiment interface is implemented using [PsychoPy](https://www.psychopy.org/). 
It is an open-source package for creating free interfaces with stimulus presentation and control in Python and JavaScript.

### Deployment
To setup the interface:
- Copy directory interface into the target path
- Copy interface/materials and interface/lib into each of the four directorys (A, B, C and D)
- A learns merge before sort with explanations
- B learns merge before sort without explanations
- C learns sort before merge with explanations
- D learns sort before merge without explanations
- Set files in interface/backend to be writeable
- Set files in interface/materials to be readable
- Set all other files to be executable
- Copy interface into designated path

## Contact
For any question or query, please email [lun.ai15@imperial.ac.uk](lun.ai15@imperial.ac.uk). The authors will try to reply as soon as available.

## References
A. Cropper and S.H. Muggleton. Learning efficient logical robot strategies involving composable objects. In Proceedings of the 24th International Joint Conference Artificial Intelligence (IJCAI 2015), pages 3423-3429. IJCAI, 2015.

Peirce, J. W., Gray, J. R., Simpson, S., MacAskill, M. R., Höchenberger, R., Sogo, H., Kastman, E., Lindeløv, J. (2019). PsychoPy2: experiments in behavior made easy. Behavior Research Methods. 10.3758/s13428-018-01193-y