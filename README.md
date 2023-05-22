# Explanatory machine learning for sequential human teaching

## Summary

This work aims to explore the explanatory effects of curriculum order and the presence of machine-learned explanations
for sequential problem-solving. A pre-print paper on this work is available on [https://arxiv.org/abs/2205.10250](https://arxiv.org/abs/2205.10250).

An empirical study was carried out involving human participants from Amazon Mechanical Turk (AMT) in a four-groups
factorial 2 x 2 design. Human participants were asked to learn an efficient sorting strategy while being presented
materials necessary for them to learn a variant of merge sort. We included data from participants who claimed to have no
background in programing, which was the main sample that we focused on in the analysis.

Explanations provided to human participants were generated offline based on the logic program learned by the
Meta-interpretive learning system, [Metagolo](https://dl.acm.org/doi/10.5555/2832581.2832726).

Informed consent for participation in the experiment and publication of data was obtained from all participants included
in the study.

## Using Metagolo to learn the merge sort variant

Requirement:

- SWI-Prolog

### Learning the target program

Learn programs simulate execution of a robot sorting on short expressions of distinct integers.
These expressions are single integers or integers linked by the '<' symbol, 
e.g. "5", "1 < 2", "4 < 6 < 9". 

Primitives are defined based on composable objects and actions to compare/manipulate the symbols.

These primitives are defined in the file:

metagol/background/merge_sort.pl

To learn merge sort without learning merge first, run

```bash
swipl -s metagol/experiments/merge_sort/learn.pl -g learn_merge_sort -g halt
```

To first learn merge and then learn merge sort, run

```bash
swipl -s metagol/experiments/merge_sort/learn.pl -g learn_merge_sort_in_episodes -g halt
```

Programs learned via dependent learning cover merger/2 and sorter/2:

```prolog
merger(A,B):-parse_exprs(A,C),merger_1(C,B).
merger_1(A,B):-compare_nums(A,C),merger_1(C,B).
merger_1(A,B):-compare_nums(A,C),drop_bag_remaining(C,B).

sorter(A,B):-single_expr(A,C),single_expr(C,B).
sorter(A,B):-recycle_memory(A,C),sorter(C,B).
sorter(A,B):-merger(A,C),sorter(C,B).
```

### Explaining the target program

The program merger was used to generate explanations for teaching human participants in the AMT experiment.

One positive and one negative example are required. merger/2 takes two sequences of increasing magnitudes. 

Sequences are converted into expressions while at the end of merging a sorted sequence is produced.

```prolog
get_examples(merge,
             [
                merger([1,4], [2,3], [1, 2, 3, 4])  % pos example
             ]/[
                merger([1,4], [2,3], [1, 2, 4, 3])  % neg example
             ],
             [E1]/[E2]).
```

An example of textual explanation generated can be viewed by running

```commandline
swipl -s metagol/demo/explanations.pl -g find_merger_inconsistency -g halt

% An example of comparing correct/wrong output of merging from traces
Compare - Left: [1,4] Right: [2,3] Expr: [] -> Left: [4] Right: [2,3] Expr: [1]
Item A is lighter than item D
 apend item A
Compare - Left: [4] Right: [2,3] Expr: [1] -> Left: [4] Right: [3] Expr: [1<2]
Item D is lighter than item B
 apend item D
Compare - Left: [4] Right: [3] Expr: [1<2] -> Left: [4] Right: [] Expr: [1<2<3]
Item C is lighter than item B
 apend item C
Error   - correct: 1<2<3 wrong: 1<2<4
Item C is lighter than item B
should apend item C
```


## Data processing

### Amazon Mechanical Turk (AMT) data

All AMT data in csv format can be found in folder data/test/amt

Requirements:

- python 3
- pip
- pandas
- scipy
- numpy
- statsmodels
- matplotlib

### Setup processing of data from paths to experiment / trials groups

The following functions have been implemented in data/scripts/analysis.py:

- extract data from records
- human sorting trace analysis (chi-sq followed by spearman rank) against various machine traces including:
- save / show trace analysis graphs (histograms/bar graphs)
- output / print student t-test / ANOVA + tukey's statistical test results and p-values on:
    1) merge test (score/response time/No. comparisons)
    2) sort test (score/response time/No. comparisons)
- save / generate mean + error graphs on:
    1) merge test (score/response time/No. comparisons)
    2) sort test (score/response time/No. comparisons)

Note: Response time and No. comparisons are auxiliary results, and therefore not our main analysis focus. We have,
however, implemented ways to visualise these results (see below).

### Functions for processing data from raw records

Processing of raw data has been implemented in data/scripts/process_data.py which is called by data/scripts/analysis.py.

You can refer to data/scripts/analysis.py to reproduce experimental results.

Implemented functions:

- extract data from csv files from provided path(s)
- process raw data into readable format
- convert raw data for further processing and statistical tests
- produce graphs from human sorting trace analysis and meta-results

## Data extraction

To generate merge/sort performance test comparisons between groups, in data/scripts/analysis.py, uncomment the following
lines.

```python
# AMT without background in programming
DATA_DIR_AMT_GROUP1 = "../test/amt/Group1/"
DATA_DIR_AMT_GROUP2 = "../test/amt/Group2/"
DATA_DIR_AMT_GROUP3 = "../test/amt/Group3/"
DATA_DIR_AMT_GROUP4 = "../test/amt/Group4/"

g1 = extract_from_CSV(...)
g2 = extract_from_CSV(...)
g3 = extract_from_CSV(...)
g4 = extract_from_CSV(...)
```

Given a csv file data path (groups separated by conditions and batches), extract_from_CSV from above parses all data
from csv files into python. The full details can be shown by setting the 'show_records' flag in the 'extract_from_CSV'
function.

```python
show_records = True
```

A filter based on pre-test (MaRs-IB) accuracy pre_test_mean_acc +/- pre_test_std_acc. Precomputed mean and std are

```python
PRE_COMP_MEAN = 0.6544112903225806
PRE_COMP_STD = 0.1693484674300766
```

After extraction (when applied without filter), the following line

```python
pre_test_cross_groups_filter([g1, g2, g3, g4], ["G1", "G2", "G3", "G4"])
```

produces information about each group demographic and recomputes MaRs-IB test accuracy filter range.

Graphs with mean performance test score with standard error are saved to path data/results/amt by default when the
following flag is true.

```python
save_graphs = True
```

The save path can be altered by changing the save_path parameter in extract_from_CSV.

```python
save_path = "..."
```

To generate graphs for response time/No. comparisons, replace 'sort_test_score' with 'sort_test_time' or '
sort_test_comp' for results of sorting and replace 'merge_test_score' with 'merge_test_comp' or merge_test_time' for
results of merging.

## Performance evaluation

Statistics of human sorting performance results can be computed by uncommenting

```python
sort_statistical_tests([g1, g2, g3, g4], ["G1", "G2", "G3", "G4"], anova_two_way=True, tukey_two_way=False,
                       record_names=["sort_test_score"],
                       record_alias=["Performance Test Score (PS)"]
                       )
merge_statistical_tests([g1, g2, g3, g4], ["G1", "G2", "G3", "G4"], anova_two_way=False, tukey_two_way=False,
                        record_names=["merge_test_score"],
                        record_alias=["Performance Test Score (PS)"],
                        one_way_iv="EX"
                        )
```

Spearman’s rank correlation coefficient is used to examine the extent of monotonic alignment between a sequence of items
that has been provided by a human and the correctly arranged sequence produced by a machine algorithm.

Both above functions run ANOVA tests (two-way for sorting performance and one-way for merging performance). For sorting,
the independent variables are the curriculum order and the presence of explanations. Due to merging being an isolated
task, there is one independent variable which is the presence of explanations.

The p-values of the tests are indicated by the PR(>F) column in the resulting tables.

## Evaluation of the closest matches of given human sorting trace

The relevant code for human sorting trace analysis:

data/scripts/eval_trace.py

### List of sorting algorithm implementations

data/scripts/sort_algorithms.py

Implemented sorting algorithms (with abbreviation):

- Insertion sort (IS)
- Dictionary sort (DS)
- Bubble sort (BS)
- Quick sort (QS)
- Merge sort (MS)
- Hybrid insertion sort and dictionary sort (Hybrid)
- Some respective variants (Other)

Graphs from human sorting trace analysis can be generated by setting the following flags in the 'extract_from_CSV'
function.

```python
trace_similarity_analysis = True
save_graphs = True
```

Decision-making process is made explicit via comparison executed during sorting of a sequence. We perform a Chi-squared
test of independence using the 2 x 2 contingency table and check for rejection. A rejection suggests an association
between comparisons made by the human sorter and comparisons made by a program. Once a test is rejected, we exclude
comparison pairs that are not in the intersection of both traces and compute Spearman's rank correlation coefficient to
examine the ordering alignment of comparisons.

### Performance of strategy adaptations

As we estimate through human trace analysis the correspondence between human sorting strategies and machine sorting
algorithms in training and performance tests, we are also interested in the performance of specific sorting strategies
that increase in usage from sort training to sort performance test

Partial evidence has supported an increase in application of QS in Group 1, MS in Group 2, DS in Group 3 
and IS in Group 4.

We then compare sorting performance of responses using these algorithms against those using others categories of
strategy. This has been implemented in extract_from_CSV. It excludes some strategies when computing sorting performance
via the exclude_algorithms parameter. For instance,

```python
g1_ex_1 = extract_from_CSV(..., exclude_algorithms=exclude_algs(["QS"]))
g1_ex_2 = extract_from_CSV(..., exclude_algorithms=["QS"])
```

where exclude_algorithms=["QS"] excludes QS from sorting performance analysis of Group 1.

The following call then compares sorting performance of QS against others in Group 1.

```python
sort_statistical_tests([g1_ex_1, g1_ex_2], ["QS", "All other categories"], anova_two_way=True, tukey_two_way=True,
                       record_names=["sort_test_score"],
                       record_alias=["Test Response Score G1"],
                       test="ttest"
                       )
```

### McNemar's test on human trace strategy adaptations

We employ McNemar's tests to determine if there is a significant difference in the number of participants who applied a
particular strategy in the test and who used it in training.

Participants were categorised with respect to whether they had applied a particular strategy in the training phase and
in the performance test.

The following lines prints out contingency tables along with test statistics for every algorithm we consider:

```python
mcnemar_par_alg_diff(g1["train_alg"], g1["test_alg"])
mcnemar_par_alg_diff(g2["train_alg"], g2["test_alg"])
mcnemar_par_alg_diff(g3["train_alg"], g3["test_alg"])
mcnemar_par_alg_diff(g4["train_alg"], g4["test_alg"])
```

| A being one of the algorithms discussed above | Applied A in training   | Did not apply A in training |
|-----------------------------------------------| -------------------------| --------------------------- |
| Applied A in test                             | - | - |
| Did not apply A in test                       | - | - |

## Graphs and visualisations

Graphs and empirical analysis results are contained in data/results/amt.

Graphs are defaulted to be saved in data/results in their respective group folder (
data/results/amt/Group1, data/results/amt/Group2, data/results/amt/Group3, data/results/amt/Group4).

Relevant graphs included:

- Human sorting strategy distributions in sort training and sort performance test (Group1 - Group4)
- data/results/amt/meta_results contains comparisons of merge and sort performance test and performance comparisons of
  adapted strategies versus other strategies

## Interface

Our experiment interface is implemented using [PsychoPy](https://www.psychopy.org/). It is an open-source package for
creating free interfaces with stimulus presentation and control in Python and JavaScript.

### Deployment

To setup the interface:

- Copy directory interface into the target path
- Copy interface/materials and interface/lib into each of the four folders (A, B, C and D)
- A learns merging before sorting with explanations
- B learns merging before sorting without explanations
- C learns sorting before merging with explanations
- D learns sorting before merging without explanations
- Set files in interface/backend to be writeable
- Set files in interface/materials to be readable
- Set all other files to be executable
- Copy interface into designated path

## Contact

For any question or query, please email [lun.ai15@imperial.ac.uk](lun.ai15@imperial.ac.uk). The authors will try to
reply as soon as available.

## References

A. Cropper and S.H. Muggleton. Learning efficient logical robot strategies involving composable objects. In Proceedings
of the 24th International Joint Conference Artificial Intelligence (IJCAI 2015), pages 3423-3429. IJCAI, 2015.

J. W. Peirce et al. PsychoPy2: Experiments in behavior made easy. Behav Res 51, 195–203 (2019)
. DOI: https://doi.org/10.3758/s13428-018-01193-y