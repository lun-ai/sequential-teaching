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

# Student groups in Bamberg
DATA_DIR_TEST1_GROUP1 = "../test/test_1/Group1/"
DATA_DIR_TEST1_GROUP2 = "../test/test_1/Group2/"
DATA_DIR_TEST1_GROUP3 = "../test/test_1/Group3/"
DATA_DIR_TEST1_GROUP4 = "../test/test_1/Group4/"

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

g1 = extract_from_CSV([DATA_DIR_AMT_GROUP1], trace_analysis_method='chi_sq_2x2', trace_similarity_analysis=True, similarity_graphs=True,
                      save_graphs=True,
                      show_records=False,
                      chi_sq_significance=0.005, filter_std_multiplier=1, save_path="../results/amt/", verbose=False,
                      pre_test_mean_acc=0.6513439999999999, pre_test_std_acc=0.17209328186771264,
                      # exclude_algorithms=['BS', 'IS', 'QS'],
                      filter_name="")
g2 = extract_from_CSV([DATA_DIR_AMT_GROUP2], trace_analysis_method='chi_sq_2x2', trace_similarity_analysis=True, similarity_graphs=True,
                      save_graphs=True,
                      show_records=False,
                      chi_sq_significance=0.005, filter_std_multiplier=1, save_path="../results/amt/", verbose=False,
                      pre_test_mean_acc=0.6513439999999999, pre_test_std_acc=0.17209328186771264,
                      # exclude_algorithms=['BS', 'IS', 'QS'],
                      filter_name="")
g3 = extract_from_CSV([DATA_DIR_AMT_GROUP3], trace_analysis_method='chi_sq_2x2', trace_similarity_analysis=True, similarity_graphs=True,
                      save_graphs=True,
                      show_records=False,
                      chi_sq_significance=0.005, filter_std_multiplier=1, save_path="../results/amt/", verbose=False,
                      pre_test_mean_acc=0.6513439999999999, pre_test_std_acc=0.17209328186771264,
                      # exclude_algorithms=['BS', 'IS', 'QS'],
                      filter_name="")
g4 = extract_from_CSV([DATA_DIR_AMT_GROUP4], trace_analysis_method='chi_sq_2x2', trace_similarity_analysis=True, similarity_graphs=True,
                      save_graphs=True,
                      show_records=False,
                      chi_sq_significance=0.005, filter_std_multiplier=1, save_path="../results/amt/", verbose=False,
                      pre_test_mean_acc=0.6513439999999999, pre_test_std_acc=0.17209328186771264,
                      # exclude_algorithms=['BS', 'IS', 'QS'],
                      filter_name="")

# with background in CS
# g1 = extract_from_CSV([DATA_DIR_AMT_GROUP1_WITH_BG], trace_analysis_method='chi_sq_2x2', trace_similarity_analysis=False, similarity_graphs=True,
#                       save_graphs=True,
#                       show_records=True,
#                       chi_sq_significance=0.005, filter_std_multiplier=1, save_path="../results/amt/", verbose=False,
#                       # exclude_algorithms=['BS', 'IS', 'QS'],
#                       filter_name="")
# g2 = extract_from_CSV([DATA_DIR_AMT_GROUP2_WITH_BG], trace_analysis_method='chi_sq_2x2', trace_similarity_analysis=False, similarity_graphs=True,
#                       save_graphs=True,
#                       show_records=False,
#                       chi_sq_significance=0.005, filter_std_multiplier=1, save_path="../results/amt/", verbose=False,
#                       # exclude_algorithms=['BS', 'IS', 'QS'],
#                       filter_name="")
# g3 = extract_from_CSV([DATA_DIR_AMT_GROUP3_WTIH_BG], trace_analysis_method='chi_sq_2x2', trace_similarity_analysis=False, similarity_graphs=True,
#                       save_graphs=True,
#                       show_records=False,
#                       chi_sq_significance=0.005, filter_std_multiplier=1, save_path="../results/amt/", verbose=False,
#                       # exclude_algorithms=['BS', 'IS', 'QS'],
#                       filter_name="")
# g4 = extract_from_CSV([DATA_DIR_AMT_GROUP4_WITH_BG], trace_analysis_method='chi_sq_2x2', trace_similarity_analysis=False, similarity_graphs=True,
#                       save_graphs=True,
#                       show_records=False,
#                       chi_sq_significance=0.005, filter_std_multiplier=1, save_path="../results/amt/", verbose=False,
#                       # exclude_algorithms=['BS', 'IS', 'QS'],
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

# parse textual response corpus
sort_statistical_tests([g1, g2, g3, g4], ["G1", "G2", "G3", "G4"], anova_two_way=True, tukey_two_way=True)
# merge_statistical_tests([g1, g2, g3, g4], ["G1", "G2", "G3", "G4"], anova_two_way=True, tukey_two_way=True)
