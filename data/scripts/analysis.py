from process_data import *

# Flags
TRACE_ANALYSIS_ON = True
SHOW_RECORDS = False
PRODUCE_SIMILARITY_GRAPHS = True
SHOW_DISTRIBUTION_DIFFERENCE = True
SAVE_GRAPHS = True
VERBOSE = False
ALPHA = 0.025
PRE_COMP_MEAN = 0.6544112903225806
PRE_COMP_STD = 0.1693484674300766

def exclude_algs(alg_names):
    res = ALG_CATAGORIES.copy()
    for n in alg_names:
        res.remove(n)
    return res

# AMT groups with mixed background and ages (without programming experience)
DATA_DIR_AMT_GROUP1 = "../test/amt/Group1/"
DATA_DIR_AMT_GROUP2 = "../test/amt/Group2/"
DATA_DIR_AMT_GROUP3 = "../test/amt/Group3/"
DATA_DIR_AMT_GROUP4 = "../test/amt/Group4/"

########################################################################################################################
# AMT without background in programming
# Compare certain human strategies against others in terms of performance/response time/No. comparisons made
# g1_ex_1 = extract_from_CSV([DATA_DIR_AMT_GROUP1], trace_analysis_method='chi_sq_2x2',
#                            trace_similarity_analysis=TRACE_ANALYSIS_ON,
#                            similarity_graphs=PRODUCE_SIMILARITY_GRAPHS,
#                            save_graphs=True,
#                            show_records=SHOW_RECORDS,
#                            chi_sq_significance=ALPHA, filter_std_multiplier=1, save_path="../results/amt/",
#                            verbose=VERBOSE,
#                            pre_test_mean_acc=PRE_COMP_MEAN, pre_test_std_acc=PRE_COMP_STD,
#                            exclude_algorithms=exclude_algs(["QS"]),
#                            filter_name="")
# g1_ex_2 = extract_from_CSV([DATA_DIR_AMT_GROUP1], trace_analysis_method='chi_sq_2x2',
#                            trace_similarity_analysis=TRACE_ANALYSIS_ON,
#                            similarity_graphs=PRODUCE_SIMILARITY_GRAPHS,
#                            save_graphs=True,
#                            show_records=SHOW_RECORDS,
#                            chi_sq_significance=ALPHA, filter_std_multiplier=1, save_path="../results/amt/",
#                            verbose=VERBOSE,
#                            pre_test_mean_acc=PRE_COMP_MEAN, pre_test_std_acc=PRE_COMP_STD,
#                            exclude_algorithms=["QS"],
#                            filter_name="")
# g2_ex_1 = extract_from_CSV([DATA_DIR_AMT_GROUP2], trace_analysis_method='chi_sq_2x2',
#                            trace_similarity_analysis=TRACE_ANALYSIS_ON,
#                            similarity_graphs=PRODUCE_SIMILARITY_GRAPHS,
#                            save_graphs=True,
#                            show_records=SHOW_RECORDS,
#                            chi_sq_significance=ALPHA, filter_std_multiplier=1, save_path="../results/amt/",
#                            verbose=VERBOSE,
#                            pre_test_mean_acc=PRE_COMP_MEAN, pre_test_std_acc=PRE_COMP_STD,
#                            exclude_algorithms=exclude_algs(["MS"]),
#                            filter_name="")
# g2_ex_2 = extract_from_CSV([DATA_DIR_AMT_GROUP2], trace_analysis_method='chi_sq_2x2',
#                            trace_similarity_analysis=TRACE_ANALYSIS_ON,
#                            similarity_graphs=PRODUCE_SIMILARITY_GRAPHS,
#                            save_graphs=True,
#                            show_records=SHOW_RECORDS,
#                            chi_sq_significance=ALPHA, filter_std_multiplier=1, save_path="../results/amt/",
#                            verbose=VERBOSE,
#                            pre_test_mean_acc=PRE_COMP_MEAN, pre_test_std_acc=PRE_COMP_STD,
#                            exclude_algorithms=["MS"],
#                            filter_name="")
# g3_ex_1 = extract_from_CSV([DATA_DIR_AMT_GROUP3], trace_analysis_method='chi_sq_2x2',
#                            trace_similarity_analysis=TRACE_ANALYSIS_ON,
#                            similarity_graphs=PRODUCE_SIMILARITY_GRAPHS,
#                            save_graphs=True,
#                            show_records=SHOW_RECORDS,
#                            chi_sq_significance=ALPHA, filter_std_multiplier=1, save_path="../results/amt/",
#                            verbose=VERBOSE,
#                            pre_test_mean_acc=PRE_COMP_MEAN, pre_test_std_acc=PRE_COMP_STD,
#                            exclude_algorithms=exclude_algs(["DS"]),
#                            filter_name="")
# g3_ex_2 = extract_from_CSV([DATA_DIR_AMT_GROUP3], trace_analysis_method='chi_sq_2x2',
#                            trace_similarity_analysis=TRACE_ANALYSIS_ON,
#                            similarity_graphs=PRODUCE_SIMILARITY_GRAPHS,
#                            save_graphs=True,
#                            show_records=SHOW_RECORDS,
#                            chi_sq_significance=ALPHA, filter_std_multiplier=1, save_path="../results/amt/",
#                            verbose=VERBOSE,
#                            pre_test_mean_acc=PRE_COMP_MEAN, pre_test_std_acc=PRE_COMP_STD,
#                            exclude_algorithms=["DS"],
#                            filter_name="")
# g4_ex_1 = extract_from_CSV([DATA_DIR_AMT_GROUP4], trace_analysis_method='chi_sq_2x2',
#                            trace_similarity_analysis=TRACE_ANALYSIS_ON,
#                            similarity_graphs=PRODUCE_SIMILARITY_GRAPHS,
#                            save_graphs=True,
#                            show_records=SHOW_RECORDS,
#                            chi_sq_significance=ALPHA, filter_std_multiplier=1, save_path="../results/amt/",
#                            verbose=VERBOSE,
#                            pre_test_mean_acc=PRE_COMP_MEAN, pre_test_std_acc=PRE_COMP_STD,
#                            exclude_algorithms=exclude_algs(["IS"]),
#                            filter_name="")
# g4_ex_2 = extract_from_CSV([DATA_DIR_AMT_GROUP4], trace_analysis_method='chi_sq_2x2',
#                            trace_similarity_analysis=TRACE_ANALYSIS_ON,
#                            similarity_graphs=PRODUCE_SIMILARITY_GRAPHS,
#                            save_graphs=True,
#                            show_records=SHOW_RECORDS,
#                            chi_sq_significance=ALPHA, filter_std_multiplier=1, save_path="../results/amt/",
#                            verbose=VERBOSE,
#                            pre_test_mean_acc=PRE_COMP_MEAN, pre_test_std_acc=PRE_COMP_STD,
#                            exclude_algorithms=["IS"],
#                            filter_name="")

########################################################################################################################
# AMT without background in programming
g1 = extract_from_CSV([DATA_DIR_AMT_GROUP1], trace_analysis_method='chi_sq_2x2',
                      trace_similarity_analysis=TRACE_ANALYSIS_ON,
                      draw_similarity_graphs=PRODUCE_SIMILARITY_GRAPHS,
                      save_similarity_graphs=SAVE_GRAPHS,
                      show_records=SHOW_RECORDS,
                      chi_sq_significance=ALPHA, filter_std_multiplier=1, save_path="../results/amt/", verbose=VERBOSE,
                      pre_test_mean_acc=PRE_COMP_MEAN, pre_test_std_acc=PRE_COMP_STD,
                      filter_name="")
g2 = extract_from_CSV([DATA_DIR_AMT_GROUP2], trace_analysis_method='chi_sq_2x2',
                      trace_similarity_analysis=TRACE_ANALYSIS_ON,
                      draw_similarity_graphs=PRODUCE_SIMILARITY_GRAPHS,
                      save_similarity_graphs=SAVE_GRAPHS,
                      show_records=SHOW_RECORDS,
                      chi_sq_significance=ALPHA, filter_std_multiplier=1, save_path="../results/amt/", verbose=VERBOSE,
                      pre_test_mean_acc=PRE_COMP_MEAN, pre_test_std_acc=PRE_COMP_STD,
                      filter_name="")
g3 = extract_from_CSV([DATA_DIR_AMT_GROUP3], trace_analysis_method='chi_sq_2x2',
                      trace_similarity_analysis=TRACE_ANALYSIS_ON,
                      draw_similarity_graphs=PRODUCE_SIMILARITY_GRAPHS,
                      save_similarity_graphs=SAVE_GRAPHS,
                      show_records=SHOW_RECORDS,
                      chi_sq_significance=ALPHA, filter_std_multiplier=1, save_path="../results/amt/", verbose=VERBOSE,
                      pre_test_mean_acc=PRE_COMP_MEAN, pre_test_std_acc=PRE_COMP_STD,
                      filter_name="")
g4 = extract_from_CSV([DATA_DIR_AMT_GROUP4], trace_analysis_method='chi_sq_2x2',
                      trace_similarity_analysis=TRACE_ANALYSIS_ON,
                      draw_similarity_graphs=PRODUCE_SIMILARITY_GRAPHS,
                      save_similarity_graphs=SAVE_GRAPHS,
                      show_records=SHOW_RECORDS,
                      chi_sq_significance=ALPHA, filter_std_multiplier=1, save_path="../results/amt/", verbose=VERBOSE,
                      pre_test_mean_acc=PRE_COMP_MEAN, pre_test_std_acc=PRE_COMP_STD,
                      filter_name="")

########################################################################################################################
# perform a cross groups filter based on pre-test (MaRs-IB) score
# use the mean and std output to partition group data
# does not perform data extraction
# f_res = pre_test_cross_groups_filter([g1, g2, g3, g4], ["G1", "G2", "G3", "G4"])

########################################################################################################################
# perform statistical tests on test data
sort_statistical_tests([g1, g2, g3, g4], ["G1", "G2", "G3", "G4"], anova_two_way=True, tukey_two_way=False,
                       record_names=["sort_test_score", "sort_test_comp", "sort_test_time"],
                       record_alias=["Performance Test Score (PS)", "Performance Test No. Comparisons",
                                     "Performance Test Response Time"]
                       )
merge_statistical_tests([g1, g2, g3, g4], ["G1", "G2", "G3", "G4"], anova_two_way=False, tukey_two_way=False,
                        record_names=["merge_test_score", "merge_test_comp", "merge_test_time"],
                        record_alias=["Performance Test Score (PS)", "Performance Test No. Comparisons",
                                      "Performance Test Response Time"],
                        one_way_iv="EX"
                        )

########################################################################################################################
# run McNemar's tests on training and performance test traces (approximated human sorting strategies)
# mcnemar_par_alg_diff(g1["train_alg"], g1["test_alg"])
# mcnemar_par_alg_diff(g2["train_alg"], g2["test_alg"])
# mcnemar_par_alg_diff(g3["train_alg"], g3["test_alg"])
# mcnemar_par_alg_diff(g4["train_alg"], g4["test_alg"])

########################################################################################################################
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
