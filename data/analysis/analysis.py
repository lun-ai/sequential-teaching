from extract_data import *

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

extract_from_CSV([DATA_DIR_TEST1_GROUP1], show_sim=False)
# extract_from_CSV([DATA_DIR_TEST1_GROUP2], show_sim=False)
# extract_from_CSV([DATA_DIR_TEST1_GROUP3], show_sim=False)
# extract_from_CSV([DATA_DIR_TEST1_GROUP4], show_sim=False)
# extract_from_CSV([DATA_DIR_TEST1_ANOMALY], show_sim=False)