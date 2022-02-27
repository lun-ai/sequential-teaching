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

# Experiment result analysis

DATA_DIR_TEST1_GROUP1 = "../test/test_1/Group1/"
DATA_DIR_TEST1_GROUP2 = "../test/test_1/Group2/"
DATA_DIR_TEST1_GROUP3 = "../test/test_1/Group3/"
DATA_DIR_TEST1_GROUP4 = "../test/test_1/Group4/"
DATA_DIR_TEST1_ANOMALY = "../test/test_1/anomaly/"
DATA_DIR_AMT_GROUP1 = "../test/amt/Group1/"
DATA_DIR_AMT_GROUP3 = "../test/amt/Group3/"
DATA_DIR_TEST1_ANOMALY = "../test/amt/anomaly/"

# extract_from_CSV([DATA_DIR_TEST1_GROUP1], sim='chi_sq', show_sim=True, sim_graphs=True, save_graph=True)
# extract_from_CSV([DATA_DIR_TEST1_GROUP2], sim='chi_sq', show_sim=True, sim_graphs=True, save_graph=True)
# extract_from_CSV([DATA_DIR_TEST1_GROUP3], sim='chi_sq', show_sim=True, sim_graphs=True, save_graph=True)
# extract_from_CSV([DATA_DIR_TEST1_GROUP4], sim='chi_sq', show_sim=True, sim_graphs=True, save_graph=True)

# g1 = extract_from_CSV([DATA_DIR_TEST1_GROUP1], sim='chi_sq_2x2', show_sim=True, sim_graphs=True, save_graph=True, significance=0.01)
# g2 = extract_from_CSV([DATA_DIR_TEST1_GROUP2], sim='chi_sq_2x2', show_sim=True, sim_graphs=True, save_graph=True)
# g3 = extract_from_CSV([DATA_DIR_TEST1_GROUP3], sim='chi_sq_2x2', show_sim=True, sim_graphs=True, save_graph=True, significance=0.01)
# g4 = extract_from_CSV([DATA_DIR_TEST1_GROUP4], sim='chi_sq_2x2', show_sim=True, sim_graphs=True, save_graph=True)

extract_from_CSV([DATA_DIR_AMT_GROUP3], sim='chi_sq_2x2', show_sim=True, sim_graphs=False, verbose=False)
# extract_from_CSV([DATA_DIR_AMT_GROUP1], sim='chi_sq_2x2', show_sim=True, sim_graphs=True, save_graph=True, save_path="../results/amt/", significance=0.01)

# t_test_with_graph([[np.array(g1["sort_test_comp"])[:, :5].flatten(),
#                     np.array(g3["sort_test_comp"])[:, :5].flatten()],
#                    [np.array(g1["sort_test_comp"])[:, 5:].flatten(),
#                     np.array(g3["sort_test_comp"])[:, 5:].flatten()]],
#                   ["Length of set < 10\nNo. question = 5", "Length of set = 10\nNo. question = 3"],
#                   "No. Comparisons",
#                   ["G1", "G3"], "Mean", save_path="../results/")
