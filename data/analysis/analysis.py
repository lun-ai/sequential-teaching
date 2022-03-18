from process_data import *

# pre-test analysis, Group A is merge-sort, Group B is sort-merge

DATA_DIR_CS = "../test/pre_test_1/CS/"
DATA_DIR_NON_CS = "../test/pre_test_1/non_CS/"
DATA_DIR_PRETEST2_PSYA = "../test/pre_test_2/10_10_2021/merge_sort/"
DATA_DIR_PRETEST2_PSYB = "../test/pre_test_2/10_10_2021/sort_merge/"
DATA_DIR_PRETEST2_ADDITIONALA = "../test/pre_test_2/18_10_2021/merge_sort/"
DATA_DIR_PRETEST2_ADDITIONALB = "../test/pre_test_2/18_10_2021/sort_merge/"

# extract_from_CSV([DATA_DIR_CS])
# extract_from_CSV([DATA_DIR_NON_CS])
# extract_from_CSV([DATA_DIR_PRETEST2_PSYA, DATA_DIR_PRETEST2_PSYB], train_only=True, show_records=False, show_sim=True)
# extract_from_CSV([DATA_DIR_PRETEST2_PSYB, DATA_DIR_PRETEST2_ADDITIONALB], sim="lcs", train_only=True, show_records=False, show_sim=True)
# extract_from_CSV([DATA_DIR_PRETEST2_PSYB, DATA_DIR_PRETEST2_ADDITIONALB], sim="weighted-lcs", train_only=True, show_records=False, show_sim=True)
# extract_from_CSV([DATA_DIR_PRETEST2_PSYB, DATA_DIR_PRETEST2_ADDITIONALB], sim="lcs-conse", train_only=True, show_records=False, show_sim=True)
# extract_from_CSV([DATA_DIR_PRETEST2_PSYB, DATA_DIR_PRETEST2_ADDITIONALB], sim="weighted-lcs-conse", train_only=True, show_records=False, show_sim=True)
# extract_from_CSV([DATA_DIR_PRETEST2_ADDITIONALA, DATA_DIR_PRETEST2_ADDITIONALB], train_only=True, show_records=False, show_sim=True)

# Experiments

# Student groups in Bamberg
DATA_DIR_TEST1_GROUP1 = "../test/test_1/Group1/"
DATA_DIR_TEST1_GROUP2 = "../test/test_1/Group2/"
DATA_DIR_TEST1_GROUP3 = "../test/test_1/Group3/"
DATA_DIR_TEST1_GROUP4 = "../test/test_1/Group4/"
DATA_DIR_TEST1_ANOMALY = "../test/test_1/anomaly/"

# AMT groups with mixed background and ages
DATA_DIR_AMT_GROUP1 = "../test/amt/Group1/"
DATA_DIR_AMT_GROUP2 = "../test/amt/Group2/"
DATA_DIR_AMT_GROUP3 = "../test/amt/Group3/"
DATA_DIR_AMT_GROUP4 = "../test/amt/Group4/"
DATA_DIR_AMT_ANOMALY = "../test/amt/anomaly/"

# extract_from_CSV([DATA_DIR_TEST1_GROUP1], sim='chi_sq', show_sim=True, sim_graphs=True, save_graph=True)
# extract_from_CSV([DATA_DIR_TEST1_GROUP2], sim='chi_sq', show_sim=True, sim_graphs=True, save_graph=True)
# extract_from_CSV([DATA_DIR_TEST1_GROUP3], sim='chi_sq', show_sim=True, sim_graphs=True, save_graph=True)
# extract_from_CSV([DATA_DIR_TEST1_GROUP4], sim='chi_sq', show_sim=True, sim_graphs=True, save_graph=True)

# g1 = extract_from_CSV([DATA_DIR_TEST1_GROUP1], sim='chi_sq_2x2', show_sim=True, sim_graphs=True, save_graph=True, significance=0.01)
# g2 = extract_from_CSV([DATA_DIR_TEST1_GROUP2], sim='chi_sq_2x2', show_sim=True, sim_graphs=True, save_graph=True)
# g3 = extract_from_CSV([DATA_DIR_TEST1_GROUP3], sim='chi_sq_2x2', show_sim=True, sim_graphs=True, save_graph=True, significance=0.01)
# g4 = extract_from_CSV([DATA_DIR_TEST1_GROUP4], sim='chi_sq_2x2', show_sim=True, sim_graphs=True, save_graph=True)

g1 = extract_from_CSV([DATA_DIR_AMT_GROUP1], sim='chi_sq_2x2', trace_similarity_analysis=False, similarity_graphs=True,
                      save_graphs=True,
                      show_records=False,
                      chi_sq_significance=0.005, filter_multiplier=1, save_path="../results/amt/", verbose=False,
                      control_v="")
g2 = extract_from_CSV([DATA_DIR_AMT_GROUP2], sim='chi_sq_2x2', trace_similarity_analysis=False, similarity_graphs=True,
                      save_graphs=True,
                      show_records=False,
                      chi_sq_significance=0.005, filter_multiplier=1, save_path="../results/amt/", verbose=False,
                      control_v="")
g3 = extract_from_CSV([DATA_DIR_AMT_GROUP3], sim='chi_sq_2x2', trace_similarity_analysis=False, similarity_graphs=True,
                      save_graphs=True,
                      show_records=False,
                      chi_sq_significance=0.005, filter_multiplier=1, save_path="../results/amt/", verbose=False,
                      control_v="")
g4 = extract_from_CSV([DATA_DIR_AMT_GROUP4], sim='chi_sq_2x2', trace_similarity_analysis=False, similarity_graphs=True,
                      save_graphs=True,
                      show_records=False,
                      chi_sq_significance=0.005, filter_multiplier=1, save_path="../results/amt/", verbose=False,
                      control_v="")

# perform a cross groups filter based on pre-test score
f_res = pre_test_cross_groups_filter([g1, g2, g3, g4], ["G1", "G2", "G3", "G4"])

# save textual responses into csv
# save_free_ans_csv("../results/amt/Group1/G1_text_responses.csv", g1["free_res"])
# save_free_ans_csv("../results/amt/Group2/G2_text_responses.csv", g2["free_res"])
# save_free_ans_csv("../results/amt/Group3/G3_text_responses.csv", g3["free_res"])
# save_free_ans_csv("../results/amt/Group4/G4_text_responses.csv", g4["free_res"])

# parse textual response corpus


# sort_statistical_tests([g1, g2], ["G1", "G2"])
# sort_statistical_tests([g1, g3], ["G1", "G3"])
# sort_statistical_tests([g1, g4], ["G1", "G4"])
# sort_statistical_tests([g2, g3], ["G2", "G3"])
# sort_statistical_tests([g2, g4], ["G2", "G4"])
# sort_statistical_tests([g3, g4], ["G3", "G4"])
# sort_statistical_tests([g1, g2, g3, g4], ["G1", "G2", "G3", "G4"], test="ttest")
sort_statistical_tests([g1, g2, g3, g4], ["G1", "G2", "G3", "G4"], anova_two_way=True, tukey_two_way=False)
# merge_statistical_tests([g1, g2, g3, g4], ["G1", "G2", "G3", "G4"])
