import numpy
import numpy as np
from scipy import stats
from os import listdir
import csv
import matplotlib.pyplot as plt
from eval_trace import find_similar_algo

DATA_DIR_CS = "../test/Test_1/CS/"
DATA_DIR_NON_CS = "../test/Test_1/non_CS/"
DATA_DIR_TEST2_PSYA = "../test/Test_2/10_10_2021/merge_sort/"
DATA_DIR_TEST2_PSYB = "../test/Test_2/10_10_2021/sort_merge/"
DATA_DIR_TEST2_ADDITIONALA = "../test/Test_2/18_10_2021/merge_sort/"
DATA_DIR_TEST2_ADDITIONALB = "../test/Test_2/18_10_2021/sort_merge/"


def extract_from_CSV(paths, is_trace_enabled=False, train_only=False, show_records=True, sim="lcs",show_sim=False, verbose=False):
    csv_list = []
    filenames = []
    for path in paths:
        files = listdir(path)
        csv_files = sorted([file for file in files if file.endswith(".csv")])
        for filename in csv_files:
            filenames.append(filename)
            with open(path + filename) as file:
                csv_list.append(list(csv.reader(file)))

    print('files: ' + str(filenames))

    merge_test_response_time = []
    sort_test_response_time = []
    merge_test_score = []
    sort_test_score = []
    merge_test_comparison = []
    sort_test_comparison = []
    sort_test_trace = []
    merge_test_comparison_records = []
    sort_test_comparison_records = []
    free_res = []

    merge_train_score = []
    sort_train_score = []
    merge_train_comparison = []
    sort_train_comparison = []
    merge_train_comparison_records = []
    sort_train_comparison_records = []


    for c in csv_list:
        t1, t2 = extract_time(c)
        merge_test_response_time.append(t1)
        sort_test_response_time.append(t2)

        s1, s2 = extract_response(c)
        merge_test_score.append(s1)
        sort_test_score.append(s2)

        c1, c2, r1, r2 = extract_comparison(c, "\'")
        merge_test_comparison.append(c1)
        sort_test_comparison.append(c2)
        merge_test_comparison_records.append(r1)
        sort_test_comparison_records.append(r2)

        s3, s4 = extract_response(c)
        merge_train_score.append(s3)
        sort_train_score.append(s4)

        c3, c4, r3, r4 = extract_train_comparison(c, "\'")
        merge_train_comparison.append(c3)
        sort_train_comparison.append(c4)
        merge_train_comparison_records.append(r3)
        sort_train_comparison_records.append(r4)

        e = extract_free_response(c)
        free_res.append(e)

        if is_trace_enabled:
            t = extract_trace(c)
            sort_test_trace.append(t)
            name = c[1][c[0].index("participant")]
            i = 1
            for d in t:
                reconstruct_trace(d, path, name + "_" + str(i))
                i += 1

        if show_sim:
            eval_alg_sim(sim, c, verbose=verbose,train_only=train_only)

    if show_records:
        print('>>>>>>>>>>>>>> TRAIN >>>>>>>>>>>>>>>>>>')
        print('merge train score: ' + str(merge_train_score))
        print('sort train score: ' + str(sort_train_score))
        print('merge train comparison: ' + str(merge_train_comparison))
        print('sort train comparison: ' + str(sort_train_comparison))
        print('>>>>>>>>>>>>>> TEST >>>>>>>>>>>>>>>>>>')
        print('merge test time: ' + str(merge_test_response_time))
        print('sort test time: ' + str(sort_test_response_time))
        print('merge test score: ' + str(merge_test_score))
        print('sort test score: ' + str(sort_test_score))
        print('merge test comparison: ' + str(merge_test_comparison))
        # print('merge test comparison records: ' + str(np.array(merge_test_comparison_records)))
        print('sort test comparison: ' + str(sort_test_comparison))
        print('sort test comparison records: ' + str(np.array(sort_test_comparison_records)))
        print('strategy reflection: ' + str(free_res))

        print('\nmean merge response time: %s' % numpy.average(merge_test_response_time, axis=0))
        print('mean sort response time: %s' % numpy.average(sort_test_response_time, axis=0))
        print('mean merge test score: %s' % numpy.average(merge_test_score,axis=0))
        print('mean sort test score: %s' % numpy.average(sort_test_score,axis=0))
        print('mean merge comparison: %s' % numpy.average(merge_test_comparison, axis=0))
        print('mean sort comparison: %s' % numpy.average(sort_test_comparison, axis=0))


def extract_time(input):
    merge_test_time_col = [input[0].index("merge_test.tStart"), input[0].index("merge_test.tEnd")]
    sort_test_time_col = [input[0].index("sort_test.tStart"), input[0].index("sort_test.tEnd")]

    t1 = [round(float(line[merge_test_time_col[1]]) - float(line[merge_test_time_col[0]]), 2) for line in input[1:] if
          line[merge_test_time_col[0]] != '' and line[merge_test_time_col[1]] != '']
    t2 = [round(float(line[sort_test_time_col[1]]) - float(line[sort_test_time_col[0]]), 2) for line in input[1:] if
          line[sort_test_time_col[0]] != '' and line[sort_test_time_col[1]] != '']

    return t1, t2

def extract_train_response(input):
    merge_test_input_col = input[0].index("merge_train_input")
    sort_test_input_col = input[0].index("sort_train_input")
    merge_test_labels_col = input[0].index("merge_train_labels")
    sort_test_labels_col = input[0].index("sort_train_labels")
    merge_test_ans_col = input[0].index("merge_train_res.text")
    sort_test_ans_col = input[0].index("sort_train_res.text")

    i1 = [list(map(int, parseStringLine(line[merge_test_input_col]))) for line in input[1:] if
          line[merge_test_input_col] != '']
    i2 = [list(map(int, parseStringLine(line[sort_test_input_col]))) for line in input[1:] if
          line[sort_test_input_col] != '']

    l1 = [parseStringLine(line[merge_test_labels_col]) for line in input[1:] if line[merge_test_labels_col] != '']
    l2 = [parseStringLine(line[sort_test_labels_col]) for line in input[1:] if line[sort_test_labels_col] != '']

    r1 = [parseStringLine(line[merge_test_ans_col]) for line in input[1:] if line[merge_test_ans_col] != '']
    r2 = [parseStringLine(line[sort_test_ans_col]) for line in input[1:] if line[sort_test_ans_col] != '']

    a1 = [labels2Ints(l1[i], i1[i], r1[i]) if containLabels(l1[i], r1[i]) else [] for i in range(min(len(l1), len(r1)))]
    a2 = [labels2Ints(l2[i], i2[i], r2[i]) if containLabels(l2[i], r2[i]) else [] for i in range(min(len(l2), len(r2)))]

    s1 = [round(stats.spearmanr(sorted(i1[i]), a1[i])[0], 3) if len(l1[i]) == len(r1[i]) else numpy.NaN for i in
          range(min(len(i1), len(a1)))]
    s2 = [round(stats.spearmanr(sorted(i2[i]), a2[i])[0], 3) if len(l2[i]) == len(r2[i]) else numpy.NaN for i in
          range(min(len(i2), len(a2)))]

    return s1, s2

def extract_response(input):
    merge_test_input_col = input[0].index("merge_test_input")
    sort_test_input_col = input[0].index("sort_test_input")
    merge_test_labels_col = input[0].index("merge_test_labels")
    sort_test_labels_col = input[0].index("sort_test_labels")
    merge_test_ans_col = input[0].index("merge_test_res.text")
    sort_test_ans_col = input[0].index("sort_test_res.text")

    i1 = [list(map(int, parseStringLine(line[merge_test_input_col]))) for line in input[1:] if
          line[merge_test_input_col] != '']
    i2 = [list(map(int, parseStringLine(line[sort_test_input_col]))) for line in input[1:] if
          line[sort_test_input_col] != '']

    l1 = [parseStringLine(line[merge_test_labels_col]) for line in input[1:] if line[merge_test_labels_col] != '']
    l2 = [parseStringLine(line[sort_test_labels_col]) for line in input[1:] if line[sort_test_labels_col] != '']

    r1 = [parseStringLine(line[merge_test_ans_col]) for line in input[1:] if line[merge_test_ans_col] != '']
    r2 = [parseStringLine(line[sort_test_ans_col]) for line in input[1:] if line[sort_test_ans_col] != '']

    a1 = [labels2Ints(l1[i], i1[i], r1[i]) if containLabels(l1[i], r1[i]) else [] for i in range(min(len(l1), len(r1)))]
    a2 = [labels2Ints(l2[i], i2[i], r2[i]) if containLabels(l2[i], r2[i]) else [] for i in range(min(len(l2), len(r2)))]

    s1 = [round(stats.spearmanr(sorted(i1[i]), a1[i])[0], 3) if len(l1[i]) == len(r1[i]) else numpy.NaN for i in
          range(min(len(i1), len(a1)))]
    s2 = [round(stats.spearmanr(sorted(i2[i]), a2[i])[0], 3) if len(l2[i]) == len(r2[i]) else numpy.NaN for i in
          range(min(len(i2), len(a2)))]

    return s1, s2


def parseStringLine(line):
    return str(line).replace("\'", "").replace(" ", "").replace("\"", "").replace("[", "").replace("]", "").split(",")


def containLabels(labels, ans):
    return not (False in [a in labels for a in ans])


def labels2Ints(labels, ints, res):
    return [ints[labels.index(r)] for r in res]


def extract_comparison(input, label_pad):
    merge_test_com_col = input[0].index("merge_test_compareN")
    merge_test_com_records = input[0].index("merge_test_compare_records")
    sort_test_com_col = input[0].index("sort_test_compareN")
    sort_test_com_records = input[0].index("sort_test_compare_records")

    return [int(line[merge_test_com_col]) for line in input[1:] if line[merge_test_com_col] != ''], [
        int(line[sort_test_com_col]) for line in input[1:] if line[sort_test_com_col] != ''], [
               line[merge_test_com_records].replace("\"", label_pad) for line in input[1:] if
               line[merge_test_com_records] != ''], [line[sort_test_com_records].replace("\"", label_pad) for line in
                                                     input[1:] if line[sort_test_com_records] != '']

def extract_train_comparison(input, label_pad):
    merge_test_com_col = input[0].index("merge_train_compareN")
    merge_test_com_records = input[0].index("merge_train_compare_records")
    sort_test_com_col = input[0].index("sort_train_compareN")
    sort_test_com_records = input[0].index("sort_train_compare_records")

    return [int(line[merge_test_com_col]) for line in input[1:] if line[merge_test_com_col] != ''], [
        int(line[sort_test_com_col]) for line in input[1:] if line[sort_test_com_col] != ''], [
               line[merge_test_com_records].replace("\"", label_pad) for line in input[1:] if
               line[merge_test_com_records] != ''], [line[sort_test_com_records].replace("\"", label_pad) for line in
                                                     input[1:] if line[sort_test_com_records] != '']


def extract_trace(input):
    sort_test_trace_col = input[0].index("sort_test_trace")
    t1 = [parseTrace(line[sort_test_trace_col]) for line in input[1:] if line[sort_test_trace_col] != '']
    return t1


def extract_free_response(input):
    col = input[0].index("exp_check_res.text")
    return [line[col] for line in input[1:] if line[col] != '']


def parseTrace(line):
    trace = line.replace("\"", "").replace("[", "").strip("]]").split("],")
    trace = [t.split(",") for t in trace]
    trace = [[int(t[0]), float(t[1]), float(t[2])] for t in trace]
    dict = {1: [(-0.25, 0.3)], 2: [(-0.2, 0.3)], 3: [(-0.15, 0.3)], 4: [(-0.1, 0.3)], 5: [(-0.05, 0.3)],
            6: [(0.0, 0.3)], 7: [(0.05, 0.3)], 8: [(0.1, 0.3)], 9: [(0.15, 0.3)], 10: [(0.2, 0.3)]}
    for t in trace:
        dict[t[0]].append((t[1], t[2]))
    return dict


def reconstruct_trace(trace, path, name):
    for t in trace:
        plt.plot(np.array(trace[t])[:, 0], np.array(trace[t])[:, 1], label=t)
    plt.title(name)
    plt.axis('off')
    plt.savefig(path + "traces/sort_test/" + name)
    plt.close()


def eval_alg_sim(method, input, train_only=False, verbose=True):
    sort_train_input_col = input[0].index("sort_train_input")
    sort_train_labels_col = input[0].index("sort_train_labels")
    sort_train_com_records = input[0].index("sort_train_compare_records")

    i = [list(map(int, parseStringLine(line[sort_train_input_col]))) for line in input[1:] if
         line[sort_train_input_col] != '']
    l = [parseStringLine(line[sort_train_labels_col]) for line in input[1:] if line[sort_train_labels_col] != '']
    r = [string2pairlist(line[sort_train_com_records].replace("\"", "\'", )) for line in input[1:] if
         line[sort_train_com_records] != '']
    print(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\n>>> Sort train phase similarity, No. train questions = " + str(len(i)))
    for u in range(len(i)):
        find_similar_algo(method, i[u], l[u], r[u], verbose)

    if not train_only:
        sort_test_input_col = input[0].index("sort_test_input")
        sort_test_labels_col = input[0].index("sort_test_labels")
        sort_test_com_records = input[0].index("sort_test_compare_records")

        i = [list(map(int, parseStringLine(line[sort_test_input_col]))) for line in input[1:] if
             line[sort_test_input_col] != '']
        l = [parseStringLine(line[sort_test_labels_col]) for line in input[1:] if line[sort_test_labels_col] != '']
        r = [string2pairlist(line[sort_test_com_records].replace("\"", "\'", )) for line in input[1:] if
             line[sort_test_com_records] != '']

        print(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\n>>> Sort test phase similarity, No. test questions = " + str(len(i)))
        for u in range(len(i)):
            find_similar_algo(method, i[u], l[u], r[u], verbose)
        print("")

def string2pairlist(str):
    labels = parseStringLine(str)
    return [[labels[2 * i], labels[2 * i + 1]] for i in range(len(labels) // 2)]


# extract_from_CSV([DATA_DIR_CS])
# extract_from_CSV([DATA_DIR_NON_CS])
# extract_from_CSV([DATA_DIR_TEST2_PSYA, DATA_DIR_TEST2_PSYB],train_only=True,show_records=False,show_sim=True)
# extract_from_CSV([DATA_DIR_TEST2_PSYB, DATA_DIR_TEST2_ADDITIONALB],sim="lcs",train_only=True,show_records=False,show_sim=True)
extract_from_CSV([DATA_DIR_TEST2_PSYB, DATA_DIR_TEST2_ADDITIONALB],sim="weighted-lcs",train_only=True,show_records=False,show_sim=True)
# extract_from_CSV([DATA_DIR_TEST2_PSYB, DATA_DIR_TEST2_ADDITIONALB],sim="lcs-conse",train_only=True,show_records=False,show_sim=True)
# extract_from_CSV([DATA_DIR_TEST2_PSYB, DATA_DIR_TEST2_ADDITIONALB],sim="weighted-lcs-conse",train_only=True,show_records=False,show_sim=True)
# extract_from_CSV([DATA_DIR_TEST2_ADDITIONALA, DATA_DIR_TEST2_ADDITIONALB],train_only=True,show_records=False,show_sim=True)
