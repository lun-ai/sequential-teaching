from process_data import *

# test trial csv paths, Group A is merge-sort, Group B is sort-merge
# data columns for test trials are different from those of experiment runs
DATA_DIR_CS = "../test/pre_test_1/CS/"
DATA_DIR_NON_CS = "../test/pre_test_1/non_CS/"
DATA_DIR_PRETEST2_PSYA = "../test/pre_test_2/10_10_2021/merge_sort/"
DATA_DIR_PRETEST2_PSYB = "../test/pre_test_2/10_10_2021/sort_merge/"
DATA_DIR_PRETEST2_ADDITIONALA = "../test/pre_test_2/18_10_2021/merge_sort/"
DATA_DIR_PRETEST2_ADDITIONALB = "../test/pre_test_2/18_10_2021/sort_merge/"

# Experiments

# Flags
TRACE_ANALYSIS_ON = True
SHOW_RECORDS = False
PRODUCE_SIMILARITY_GRAPHS = True
VERBOSE = False
ALPHA = 0.025
groups_mean = 0.6544112903225806
groups_std = 0.1693484674300766
ALL_ALG_CATEGORIES = ["BS", "DS", "Other", "MS", "Hybrid", "QS", "IS"]


def exclude_algs(alg_names):
    res = ALL_ALG_CATEGORIES.copy()
    for n in alg_names:
        res.remove(n)
    return res


# Student groups in Bamberg
DATA_DIR_TEST1_GROUP1 = "../test/bamberg/Group1/"
DATA_DIR_TEST1_GROUP2 = "../test/bamberg/Group2/"
DATA_DIR_TEST1_GROUP3 = "../test/bamberg/Group3/"
DATA_DIR_TEST1_GROUP4 = "../test/bamberg/Group4/"

# records with defects or insufficient effort
DATA_DIR_TEST1_INVALID = "../test/test_1/invalid/"

# AMT groups with mixed background and ages
DATA_DIR_AMT_GROUP1 = "../test/amt/Group1/"
DATA_DIR_AMT_GROUP2 = "../test/amt/Group2/"
DATA_DIR_AMT_GROUP3 = "../test/amt/Group3/"
DATA_DIR_AMT_GROUP4 = "../test/amt/Group4/"
DATA_DIR_AMT_GROUP1_WITH_BG = "../test/amt/Group1/with_bg/"
DATA_DIR_AMT_GROUP2_WITH_BG = "../test/amt/Group2/with_bg/"
DATA_DIR_AMT_GROUP3_WTIH_BG = "../test/amt/Group3/with_bg/"
DATA_DIR_AMT_GROUP4_WITH_BG = "../test/amt/Group4/with_bg/"

# records with defects or insufficient effort
DATA_DIR_AMT_INVALID = "../test/amt/invalid/"

########################################################################################################################
# Bamberg without background in CS
# g1 = extract_from_CSV([DATA_DIR_TEST1_GROUP1], trace_analysis_method='chi_sq_2x2', trace_similarity_analysis=False, similarity_graphs=True,
#                       save_graphs=True,
#                       show_records=False,
#                       chi_sq_significance=0.005, filter_std_multiplier=1, save_path="../results/amt/", verbose=False,
#                       # pre_test_mean_acc=0.6513439999999999, pre_test_std_acc=0.17209328186771264,
#                       # exclude_algorithms=['BS', 'IS', 'QS'],
#                       filter_name="")
# g2 = extract_from_CSV([DATA_DIR_TEST1_GROUP2], trace_analysis_method='chi_sq_2x2', trace_similarity_analysis=False, similarity_graphs=True,
#                       save_graphs=True,
#                       show_records=False,
#                       chi_sq_significance=0.005, filter_std_multiplier=1, save_path="../results/amt/", verbose=False,
#                       # pre_test_mean_acc=0.6513439999999999, pre_test_std_acc=0.17209328186771264,
#                       # exclude_algorithms=['BS', 'IS', 'QS'],
#                       filter_name="")
# g3 = extract_from_CSV([DATA_DIR_TEST1_GROUP3], trace_analysis_method='chi_sq_2x2', trace_similarity_analysis=False, similarity_graphs=True,
#                       save_graphs=True,
#                       show_records=False,
#                       chi_sq_significance=0.005, filter_std_multiplier=1, save_path="../results/amt/", verbose=False,
#                       # pre_test_mean_acc=0.6513439999999999, pre_test_std_acc=0.17209328186771264,
#                       # exclude_algorithms=['BS', 'IS', 'QS'],
#                       filter_name="")
# g4 = extract_from_CSV([DATA_DIR_TEST1_GROUP4], trace_analysis_method='chi_sq_2x2', trace_similarity_analysis=False, similarity_graphs=True,
#                       save_graphs=True,
#                       show_records=False,
#                       chi_sq_significance=0.005, filter_std_multiplier=1, save_path="../results/amt/", verbose=False,
#                       # pre_test_mean_acc=0.6513439999999999, pre_test_std_acc=0.17209328186771264,
#                       # exclude_algorithms=['BS', 'IS', 'QS'],
#                       filter_name="")


########################################################################################################################
# AMT without background in CS, excluding some trace algorithms
# g1_ex_1 = extract_from_CSV([DATA_DIR_AMT_GROUP1], trace_analysis_method='chi_sq_2x2',
#                            trace_similarity_analysis=TRACE_ANALYSIS_ON,
#                            similarity_graphs=PRODUCE_SIMILARITY_GRAPHS,
#                            save_graphs=True,
#                            show_records=SHOW_RECORDS,
#                            chi_sq_significance=ALPHA, filter_std_multiplier=1, save_path="../results/amt/",
#                            verbose=VERBOSE,
#                            pre_test_mean_acc=groups_mean, pre_test_std_acc=groups_std,
#                            exclude_algorithms=exclude_algs(["QS"]),
#                            filter_name="")
# g1_ex_2 = extract_from_CSV([DATA_DIR_AMT_GROUP1], trace_analysis_method='chi_sq_2x2',
#                            trace_similarity_analysis=TRACE_ANALYSIS_ON,
#                            similarity_graphs=PRODUCE_SIMILARITY_GRAPHS,
#                            save_graphs=True,
#                            show_records=SHOW_RECORDS,
#                            chi_sq_significance=ALPHA, filter_std_multiplier=1, save_path="../results/amt/",
#                            verbose=VERBOSE,
#                            pre_test_mean_acc=groups_mean, pre_test_std_acc=groups_std,
#                            exclude_algorithms=["QS"],
#                            filter_name="")
# g2_ex_1 = extract_from_CSV([DATA_DIR_AMT_GROUP2], trace_analysis_method='chi_sq_2x2',
#                            trace_similarity_analysis=TRACE_ANALYSIS_ON,
#                            similarity_graphs=PRODUCE_SIMILARITY_GRAPHS,
#                            save_graphs=True,
#                            show_records=SHOW_RECORDS,
#                            chi_sq_significance=ALPHA, filter_std_multiplier=1, save_path="../results/amt/",
#                            verbose=VERBOSE,
#                            pre_test_mean_acc=groups_mean, pre_test_std_acc=groups_std,
#                            exclude_algorithms=exclude_algs(["MS"]),
#                            filter_name="")
# g2_ex_2 = extract_from_CSV([DATA_DIR_AMT_GROUP2], trace_analysis_method='chi_sq_2x2',
#                            trace_similarity_analysis=TRACE_ANALYSIS_ON,
#                            similarity_graphs=PRODUCE_SIMILARITY_GRAPHS,
#                            save_graphs=True,
#                            show_records=SHOW_RECORDS,
#                            chi_sq_significance=ALPHA, filter_std_multiplier=1, save_path="../results/amt/",
#                            verbose=VERBOSE,
#                            pre_test_mean_acc=groups_mean, pre_test_std_acc=groups_std,
#                            exclude_algorithms=["MS"],
#                            filter_name="")
# g3_ex_1 = extract_from_CSV([DATA_DIR_AMT_GROUP3], trace_analysis_method='chi_sq_2x2',
#                            trace_similarity_analysis=TRACE_ANALYSIS_ON,
#                            similarity_graphs=PRODUCE_SIMILARITY_GRAPHS,
#                            save_graphs=True,
#                            show_records=SHOW_RECORDS,
#                            chi_sq_significance=ALPHA, filter_std_multiplier=1, save_path="../results/amt/",
#                            verbose=VERBOSE,
#                            pre_test_mean_acc=groups_mean, pre_test_std_acc=groups_std,
#                            exclude_algorithms=exclude_algs(["DS"]),
#                            filter_name="")
# g3_ex_2 = extract_from_CSV([DATA_DIR_AMT_GROUP3], trace_analysis_method='chi_sq_2x2',
#                            trace_similarity_analysis=TRACE_ANALYSIS_ON,
#                            similarity_graphs=PRODUCE_SIMILARITY_GRAPHS,
#                            save_graphs=True,
#                            show_records=SHOW_RECORDS,
#                            chi_sq_significance=ALPHA, filter_std_multiplier=1, save_path="../results/amt/",
#                            verbose=VERBOSE,
#                            pre_test_mean_acc=groups_mean, pre_test_std_acc=groups_std,
#                            exclude_algorithms=["DS"],
#                            filter_name="")
# g4_ex_1 = extract_from_CSV([DATA_DIR_AMT_GROUP4], trace_analysis_method='chi_sq_2x2',
#                            trace_similarity_analysis=TRACE_ANALYSIS_ON,
#                            similarity_graphs=PRODUCE_SIMILARITY_GRAPHS,
#                            save_graphs=True,
#                            show_records=SHOW_RECORDS,
#                            chi_sq_significance=ALPHA, filter_std_multiplier=1, save_path="../results/amt/",
#                            verbose=VERBOSE,
#                            pre_test_mean_acc=groups_mean, pre_test_std_acc=groups_std,
#                            exclude_algorithms=exclude_algs(["IS"]),
#                            filter_name="")
# g4_ex_2 = extract_from_CSV([DATA_DIR_AMT_GROUP4], trace_analysis_method='chi_sq_2x2',
#                            trace_similarity_analysis=TRACE_ANALYSIS_ON,
#                            similarity_graphs=PRODUCE_SIMILARITY_GRAPHS,
#                            save_graphs=True,
#                            show_records=SHOW_RECORDS,
#                            chi_sq_significance=ALPHA, filter_std_multiplier=1, save_path="../results/amt/",
#                            verbose=VERBOSE,
#                            pre_test_mean_acc=groups_mean, pre_test_std_acc=groups_std,
#                            exclude_algorithms=["IS"],
#                            filter_name="")

########################################################################################################################
# AMT without background in CS
g1 = extract_from_CSV([DATA_DIR_AMT_GROUP1], trace_analysis_method='chi_sq_2x2',
                      trace_similarity_analysis=TRACE_ANALYSIS_ON,
                      similarity_graphs=PRODUCE_SIMILARITY_GRAPHS,
                      save_graphs=True,
                      show_records=SHOW_RECORDS,
                      chi_sq_significance=ALPHA, filter_std_multiplier=1, save_path="../results/amt/", verbose=VERBOSE,
                      pre_test_mean_acc=groups_mean, pre_test_std_acc=groups_std,
                      filter_name="")
g2 = extract_from_CSV([DATA_DIR_AMT_GROUP2], trace_analysis_method='chi_sq_2x2',
                      trace_similarity_analysis=TRACE_ANALYSIS_ON,
                      similarity_graphs=PRODUCE_SIMILARITY_GRAPHS,
                      save_graphs=True,
                      show_records=SHOW_RECORDS,
                      chi_sq_significance=ALPHA, filter_std_multiplier=1, save_path="../results/amt/", verbose=VERBOSE,
                      pre_test_mean_acc=groups_mean, pre_test_std_acc=groups_std,
                      filter_name="")
g3 = extract_from_CSV([DATA_DIR_AMT_GROUP3], trace_analysis_method='chi_sq_2x2',
                      trace_similarity_analysis=TRACE_ANALYSIS_ON,
                      similarity_graphs=PRODUCE_SIMILARITY_GRAPHS,
                      save_graphs=True,
                      show_records=SHOW_RECORDS,
                      chi_sq_significance=ALPHA, filter_std_multiplier=1, save_path="../results/amt/", verbose=VERBOSE,
                      pre_test_mean_acc=groups_mean, pre_test_std_acc=groups_std,
                      filter_name="")
g4 = extract_from_CSV([DATA_DIR_AMT_GROUP4], trace_analysis_method='chi_sq_2x2',
                      trace_similarity_analysis=TRACE_ANALYSIS_ON,
                      similarity_graphs=PRODUCE_SIMILARITY_GRAPHS,
                      save_graphs=True,
                      show_records=SHOW_RECORDS,
                      chi_sq_significance=ALPHA, filter_std_multiplier=1, save_path="../results/amt/", verbose=VERBOSE,
                      pre_test_mean_acc=groups_mean, pre_test_std_acc=groups_std,
                      filter_name="")

# AMT with background in CS
# g1 = extract_from_CSV([DATA_DIR_AMT_GROUP1_WITH_BG], trace_analysis_method='chi_sq_2x2', trace_similarity_analysis=False, similarity_graphs=True,
#                       save_graphs=True,
#                       show_records=True,
#                       chi_sq_significance=0.005, filter_std_multiplier=1, save_path="../results/amt/", verbose=False,
#                       filter_name="")
# g2 = extract_from_CSV([DATA_DIR_AMT_GROUP2_WITH_BG], trace_analysis_method='chi_sq_2x2', trace_similarity_analysis=False, similarity_graphs=True,
#                       save_graphs=True,
#                       show_records=False,
#                       chi_sq_significance=0.005, filter_std_multiplier=1, save_path="../results/amt/", verbose=False,
#                       filter_name="")
# g3 = extract_from_CSV([DATA_DIR_AMT_GROUP3_WTIH_BG], trace_analysis_method='chi_sq_2x2', trace_similarity_analysis=False, similarity_graphs=True,
#                       save_graphs=True,
#                       show_records=False,
#                       chi_sq_significance=0.005, filter_std_multiplier=1, save_path="../results/amt/", verbose=False,
#                       filter_name="")
# g4 = extract_from_CSV([DATA_DIR_AMT_GROUP4_WITH_BG], trace_analysis_method='chi_sq_2x2', trace_similarity_analysis=False, similarity_graphs=True,
#                       save_graphs=True,
#                       show_records=False,
#                       chi_sq_significance=0.005, filter_std_multiplier=1, save_path="../results/amt/", verbose=False,
#                       filter_name="")

# perform a cross groups filter based on pre-test score
# use the mean and std output to filter raw group data
# does not perform data extraction
# f_res = pre_test_cross_groups_filter([g1, g2, g3, g4], ["G1", "G2", "G3", "G4"])

# save textual responses into csv to review in batches
# save_free_ans_csv("../results/amt/Group1/G1_text_responses.csv", g1["free_res"])
# save_free_ans_csv("../results/amt/Group2/G2_text_responses.csv", g2["free_res"])
# save_free_ans_csv("../results/amt/Group3/G3_text_responses.csv", g3["free_res"])
# save_free_ans_csv("../results/amt/Group4/G4_text_responses.csv", g4["free_res"])

# save_free_ans_csv("../results/amt/Group1/G1_text_responses_with_bg.csv", g1["free_res"])
# save_free_ans_csv("../results/amt/Group2/G2_text_responses_with_bg.csv", g2["free_res"])
# save_free_ans_csv("../results/amt/Group3/G3_text_responses_with_bg.csv", g3["free_res"])
# save_free_ans_csv("../results/amt/Group4/G4_text_responses_with_bg.csv", g4["free_res"])

# perform statistical tests on test data
# sort_statistical_tests([g1, g2, g3, g4], ["G1", "G2", "G3", "G4"], anova_two_way=True, tukey_two_way=False,
#                        record_names=["sort_test_score", "sort_test_comp", "sort_test_time"],
#                        record_alias=["Performance Test Score (PS)", "Performance Test No. Comparisons",
#                                      "Performance Test Response Time"]
#                        )
# merge_statistical_tests([g1, g2, g3, g4], ["G1", "G2", "G3", "G4"], anova_two_way=False, tukey_two_way=False,
#                         record_names=["merge_test_score", "merge_test_comp", "merge_test_time"],
#                         record_alias=["Performance Test Score (PS)", "Performance Test No. Comparisons",
#                                       "Performance Test Response Time"],
#                         one_way_iv="EX"
#                         )

# perform statistical tests on performance comparing specific human strategies to the rest
# sort_statistical_tests([g1_ex_1, g1_ex_2], ["QS", "All other categories"], anova_two_way=True, tukey_two_way=True,
#                        record_names=["sort_test_score"],
#                        record_alias=["Test Response Score G1"],
#                        test="ttest"
#                        )
# sort_statistical_tests([g2_ex_1, g2_ex_2], ["MS", "All other categories"], anova_two_way=True, tukey_two_way=True,
#                        record_names=["sort_test_score"],
#                        record_alias=["Test Response Score G2"],
#                        test="ttest"
#                        )
# sort_statistical_tests([g3_ex_1, g3_ex_2], ["DS", "All other categories"], anova_two_way=True, tukey_two_way=True,
#                        record_names=["sort_test_score"],
#                        record_alias=["Test Response Score G3"],
#                        test="ttest"
#                        )
# sort_statistical_tests([g4_ex_1, g4_ex_2], ["IS", "All other categories"], anova_two_way=True, tukey_two_way=True,
#                        record_names=["sort_test_score"],
#                        record_alias=["Test Response Score G4"],
#                        test="ttest"
#                        )

# perform statistical tests on train data
# sort_statistical_tests([g1, g2, g3, g4], ["G1", "G2", "G3", "G4"], anova_two_way=True, tukey_two_way=True,
#                        record_names=["sort_train_score", "sort_train_comp"],
#                        record_alias=["Train Performance Score", "Train No. Comparisons"]
#                        )
