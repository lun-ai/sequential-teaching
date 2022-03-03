import csv
from os import listdir

import matplotlib.pyplot as plt
import numpy
import numpy as np
from scipy import stats

from eval_trace import find_similar_algo, sim_algo_hist, alphabetical_labels

DEFAULT_GRAPH_PATH = "../results/test_1/"


def extract_from_CSV(paths, is_trace_enabled=False, train_only=False, show_records=True, sim_graphs=False,
                     sim="lcs", show_sim=False,
                     verbose=False, save_graph=False, significance=0.05, save_path="", control_v=""):
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

    pre_test = []

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

    exp_run_time = []

    merge_train_score = []
    sort_train_score = []
    merge_train_comparison = []
    sort_train_comparison = []
    merge_train_comparison_records = []
    sort_train_comparison_records = []

    train_alg_hist = []
    test_alg_hist = []

    for i in range(len(csv_list)):

        c = csv_list[i]

        # if verbose:
        print(">>>>>>>>>>>>>>> %s >>>>>>>>>>>>>>>" % (filenames[i]))

        p = extract_pre_test(c)
        pre_test.append(p)

        t = extract_time(c)
        exp_run_time.append(t)

        t1, t2 = extract_test_time(c)
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

        # s3, s4 = extract_train_response(c)
        # merge_train_score.append(s3)
        # sort_train_score.append(s4)

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
            train_algs, algs = eval_alg_sim(sim, c, verbose=verbose, train_only=train_only, significance=significance)
            train_alg_hist.append(train_algs)
            test_alg_hist.append(algs)

    mean_mt = np.round(np.nanmean(merge_test_response_time, axis=0), decimals=3)
    mean_ms = np.round(np.nanmean(merge_test_score, axis=0), decimals=3)
    mean_mc = np.round(np.nanmean(merge_test_comparison, axis=0), decimals=3)
    mean_st = np.round(np.nanmean(sort_test_response_time, axis=0), decimals=3)
    mean_ss = np.round(np.nanmean(sort_test_score, axis=0), decimals=3)
    mean_sc = np.round(np.nanmean(sort_test_comparison, axis=0), decimals=3)

    merge_test_score_p = []
    sort_test_comparison_p = []
    sort_test_response_time_p = []
    sort_test_score_p = []
    mean_ms_all = np.nanmean(merge_test_score)
    std_ms = np.nanstd(np.nanmean(merge_test_score, axis=1))

    if control_v == "merge_score":
        for i in range(len(sort_test_score)):
            if (mean_ms_all - std_ms) <= np.nanmean(merge_test_score[i]) <= (mean_ms_all + std_ms):
                sort_test_score_p.append(sort_test_score[i])
                sort_test_response_time_p.append(sort_test_response_time[i])
                sort_test_comparison_p.append(sort_test_comparison[i])
    elif control_v == "score":
        mean_1 = np.nanmean(np.array(sort_test_score)[:, :5])
        mean_2 = np.nanmean(np.array(sort_test_score)[:, 5:])
        std_1 = np.nanstd(np.nanmean(np.array(sort_test_score)[:, :5], axis=1))
        std_2 = np.nanstd(np.nanmean(np.array(sort_test_score)[:, 5:], axis=1))

        for i in range(len(sort_test_score)):
            if (mean_ms_all - std_ms) <= np.nanmean(merge_test_score[i]) <= (mean_ms_all + std_ms):
                if (mean_1 - std_1) <= np.nanmean(sort_test_score[i][:5]) <= (mean_1 + std_1) and \
                        (mean_2 - std_2) <= np.nanmean(sort_test_score[i][5:]) <= (mean_2 + std_2):
                    sort_test_score_p.append(sort_test_score[i])
                    sort_test_response_time_p.append(sort_test_response_time[i])
                    sort_test_comparison_p.append(sort_test_comparison[i])
    elif control_v == "time":
        mean_1 = np.nanmean(np.array(sort_test_response_time)[:, :5])
        mean_2 = np.nanmean(np.array(sort_test_response_time)[:, 5:])
        std_1 = np.nanstd(np.nanmean(np.array(sort_test_response_time)[:, :5], axis=1))
        std_2 = np.nanstd(np.nanmean(np.array(sort_test_response_time)[:, 5:], axis=1))
        for i in range(len(sort_test_response_time)):
            if (mean_ms_all - std_ms) <= np.nanmean(merge_test_score[i]) <= (mean_ms_all + std_ms):
                if (mean_1 - std_1) <= np.nanmean(sort_test_response_time[i][:5]) <= (mean_1 + std_1) and \
                        (mean_2 - std_2) <= np.nanmean(sort_test_response_time[i][5:]) <= (mean_2 + std_2):
                    sort_test_score_p.append(sort_test_score[i])
                    sort_test_response_time_p.append(sort_test_response_time[i])
                    sort_test_comparison_p.append(sort_test_comparison[i])
    elif control_v == "efficiency":
        mean_1 = np.nanmean(np.array(sort_test_comparison)[:, :5])
        mean_2 = np.nanmean(np.array(sort_test_comparison)[:, 5:])
        std_1 = np.nanstd(np.nanmean(np.array(sort_test_comparison)[:, :5], axis=1))
        std_2 = np.nanstd(np.nanmean(np.array(sort_test_comparison)[:, 5:], axis=1))
        for i in range(len(sort_test_comparison)):
            if (mean_ms_all - std_ms) <= np.nanmean(merge_test_score[i]) <= (mean_ms_all + std_ms):
                if (mean_1 - std_1) <= np.nanmean(sort_test_comparison[i][:5]) <= (mean_1 + std_1) and \
                        (mean_2 - std_2) <= np.nanmean(sort_test_comparison[i][5:]) <= (mean_2 + std_2):
                    sort_test_score_p.append(sort_test_score[i])
                    sort_test_response_time_p.append(sort_test_response_time[i])
                    sort_test_comparison_p.append(sort_test_comparison[i])
    else:
        sort_test_score_p = sort_test_score
        sort_test_comparison_p = sort_test_comparison
        sort_test_response_time_p = sort_test_response_time

    if show_records:
        print('>>> Run time: ' + str(exp_run_time))
        print('>>> MaRs-IB')
        print('MaRs-IB pre-test (correct answers/total answered/accuracy): ' + str(pre_test))
        print('>>> TRAIN ')
        print_records('merge train spearman rank score: ', merge_train_score, filenames)
        print_records('merge train No. comparison: ', merge_train_comparison, filenames)
        print_records('sort train spearman rank score: ', sort_train_score, filenames)
        print_records('sort train No. comparison: ', sort_train_comparison, filenames)
        print('>>> TEST ')
        print_records('merge test time: ', merge_test_response_time, filenames)
        print_records('merge test spearman rank score: ', merge_test_score, filenames)
        print_records('merge test No. comparison: ', merge_test_comparison, filenames)
        print('machine merge No. comparison: %s' % ([4, 2, 4, 6, 6]))
        print_records('sort test time: ', sort_test_response_time, filenames)
        print_records('sort test spearman rank score: ', sort_test_score, filenames)
        # print('merge test comparison records: ' + str(np.array(merge_test_comparison_records)))
        print_records('sort test No. comparison: ', sort_test_comparison, filenames)
        print('machine sort No. comparison: %s' % ([9, 8, 12, 12, 12, 20, 20, 18]))
        # print_records('sort test comparison records: ', np.array(sort_test_comparison_records), filenames)
        print_records('background and strategy reflection: ', numpy.array(free_res), filenames)

        print("--- partition size: " + str(len(sort_test_comparison_p)))
        print('\nmean merge response time: %s' % mean_mt)
        print('mean merge test spearman rank score: %s' % mean_ms)
        print('mean merge No. comparison: %s' % mean_mc)
        print('mean sort response time: %s' % mean_st)
        print(
            'mean sort test spearman rank score: %s' % mean_ss)
        print('mean sort No. comparison: %s' % mean_sc)

        if sim_graphs:
            if len(paths) == 1:
                key = paths[0].split("/")[-2]
                if save_graph:
                    g_l = {"Group1": "c1", "Group2": "c2", "Group3": "c3", "Group4": "c4"}

                    graph_path = (DEFAULT_GRAPH_PATH if save_path == "" else save_path) + key + "/" + g_l[
                        key] + "_train_"
            else:
                key = "Multiple groups"
                if save_graph:
                    graph_path = (DEFAULT_GRAPH_PATH if save_path == "" else save_path)
            draw_sim_hist_graph([np.array(train_alg_hist)[:, :3], np.array(train_alg_hist)[:, 3]],
                                ["Length of set < 10\nNo. question = 3", "Length of set = 10\nNo. question = 1"],
                                "No. application in training" + " (" + key + ")", "Frequency", save_path=graph_path,
                                alpha=significance)
            if not train_only:
                if len(paths) == 1:
                    key = paths[0].split("/")[-2]
                    if save_graph:
                        graph_path = (DEFAULT_GRAPH_PATH if save_path == "" else save_path) + key + "/" + g_l[
                            key] + "_test_"
                else:
                    key = "Multiple groups"
                    if save_graph:
                        graph_path = (DEFAULT_GRAPH_PATH if save_path == "" else save_path)
                draw_sim_hist_graph([np.array(test_alg_hist)[:, :5], np.array(test_alg_hist)[:, 5:]],
                                    ["Length of set < 10\nNo. question = 5", "Length of set = 10\nNo. question = 3"],
                                    "No. application in performance test" + " (" + key + ")", "Frequency",
                                    save_path=graph_path, alpha=significance)
                draw_sim_mean_graph([np.array(test_alg_hist)[:, :5], np.array(test_alg_hist)[:, 5:]],
                                    ["Length of set < 10\nNo. question = 5", "Length of set = 10\nNo. question = 3"],
                                    "No. application in performance test" + " (" + key + ")", "Mean",
                                    save_path=graph_path, alpha=significance, ylim=3)
    res = {"merge_test_score": merge_test_score_p, "sort_test_comp": sort_test_comparison_p,
           "sort_test_time": sort_test_response_time_p,
           "sort_test_score": sort_test_score_p}
    return res


def print_records(s, rs, names):
    print("--- " + s)
    for i in range(len(rs)):
        print("\t\t" + names[i] + " - " + str(rs[i]))


def extract_pre_test(input):
    path_col = input[0].index("img_path")
    r_col = input[0].index("pre_test.response")

    ans = [line[path_col].split('_')[-1].split('.')[0] for line in input[11:] if line[path_col] != '']
    res = [parseStringLine(line[r_col])[0] for line in input[1:] if line[r_col] != '']

    total_correct = sum([1 if res[i] == ans[i] else 0 for i in range(len(res))])
    total_answered = sum([1 if r in ['a', 'b', 'c', 'd'] else 0 for r in res])

    return "%s/%s/%s" % (total_correct, total_answered, round(float(total_correct / total_answered), 3))


def extract_test_time(input):
    merge_test_time_col = [input[0].index("merge_test.tStart"), input[0].index("merge_test.tEnd")]
    sort_test_time_col = [input[0].index("sort_test.tStart"), input[0].index("sort_test.tEnd")]

    t1 = [round(float(line[merge_test_time_col[1]]) - float(line[merge_test_time_col[0]]), 2) for line in input[1:] if
          line[merge_test_time_col[0]] != '' and line[merge_test_time_col[1]] != '']
    t2 = [round(float(line[sort_test_time_col[1]]) - float(line[sort_test_time_col[0]]), 2) for line in input[1:] if
          line[sort_test_time_col[0]] != '' and line[sort_test_time_col[1]] != '']

    return t1, t2


# returns the experiment run time
def extract_time(input):
    pre_test_t = [input[1][input[0].index("pre_test_intro_mouse.tEnd")]]
    col1 = input[0].index("pre_test_train.tEnd")
    pre_test_t += [line[col1] for line in input[1:] if line[col1] != '']
    pre_test_t += [480]

    break_t = []
    col2 = input[0].index("break_1.tEnd")
    break_t += [line[col2] for line in input[1:] if line[col2] != '']

    col2 = input[0].index("break_2.tEnd")
    break_t += [line[col2] for line in input[1:] if line[col2] != '']

    intro_t = []
    col3 = input[0].index("intro.tEnd")
    intro_t += [line[col3] for line in input[1:] if line[col3] != '']

    col3 = input[0].index("hint.tEnd")
    intro_t += [line[col3] for line in input[1:] if line[col3] != '']

    col3 = input[0].index("merge_intro.tEnd")
    intro_t += [line[col3] for line in input[1:] if line[col3] != '']

    col3 = input[0].index("merge_test_intro.tEnd")
    intro_t += [line[col3] for line in input[1:] if line[col3] != '']

    col3 = input[0].index("sort_intro.tEnd")
    intro_t += [line[col3] for line in input[1:] if line[col3] != '']

    col3 = input[0].index("sort_test_intro.tEnd")
    intro_t += [line[col3] for line in input[1:] if line[col3] != '']

    question_t = []
    col4 = input[0].index("review.tEnd")
    question_t += [line[col4] for line in input[1:] if line[col4] != '']

    col4 = input[0].index("exp_check.tEnd")
    question_t += [line[col4] for line in input[1:] if line[col4] != '']

    col4 = input[0].index("background.tEnd")
    question_t += [line[col4] for line in input[1:] if line[col4] != '']

    response_t = []
    col5 = input[0].index("merge_train.tEnd")
    response_t += [line[col5] for line in input[1:] if line[col5] != '']

    col5 = input[0].index("merge_expl.tEnd")
    response_t += [line[col5] for line in input[1:] if line[col5] != '']

    col5 = input[0].index("merge_test.tEnd")
    response_t += [line[col5] for line in input[1:] if line[col5] != '']

    col5 = input[0].index("sort_train.tEnd")
    response_t += [line[col5] for line in input[1:] if line[col5] != '']

    col5 = input[0].index("sort_expl.tEnd")
    response_t += [line[col5] for line in input[1:] if line[col5] != '']

    col5 = input[0].index("sort_test.tEnd")
    response_t += [line[col5] for line in input[1:] if line[col5] != '']

    return np.sum([float(f) for f in pre_test_t + break_t + intro_t + question_t + response_t])


def extract_train_response(input):
    # merge_test_input_col = input[0].index("merge_train_input")
    sort_test_input_col = input[0].index("sort_train_input")
    # merge_test_labels_col = input[0].index("merge_train_labels")
    sort_test_labels_col = input[0].index("sort_train_labels")
    # merge_test_ans_col = input[0].index("merge_train_res.text")
    sort_test_ans_col = input[0].index("sort_train_res.text")

    # i1 = [list(map(int, parseStringLine(line[merge_test_input_col]))) for line in input[1:] if
    #       line[merge_test_input_col] != '']
    i2 = [list(map(int, parseStringLine(line[sort_test_input_col]))) for line in input[1:] if
          line[sort_test_input_col] != '']

    # l1 = [parseStringLine(line[merge_test_labels_col]) for line in input[1:] if line[merge_test_labels_col] != '']
    l2 = [parseStringLine(line[sort_test_labels_col]) for line in input[1:] if line[sort_test_labels_col] != '']

    # r1 = [parseStringLine(line[merge_test_ans_col]) for line in input[1:] if line[merge_test_ans_col] != '']
    r2 = [parseStringLine(line[sort_test_ans_col]) for line in input[1:] if line[sort_test_ans_col] != '']

    # a1 = [labels2Ints(l1[i], i1[i], r1[i]) if containLabels(l1[i], r1[i]) else [] for i in range(min(len(l1), len(r1)))]
    a2 = [labels2Ints(l2[i], i2[i], r2[i]) if containLabels(l2[i], r2[i]) else [] for i in range(min(len(l2), len(r2)))]

    # s1 = [round(stats.spearmanr(sorted(i1[i]), a1[i])[0], 3) if len(l1[i]) == len(r1[i]) else numpy.NaN for i in
    #       range(min(len(i1), len(a1)))]
    s2 = [round(stats.spearmanr(sorted(i2[i]), a2[i])[0], 3) if len(l2[i]) == len(a2[i]) else numpy.NaN for i in
          range(min(len(i2), len(a2)))]

    return s2


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

    r1 = [list(map(lambda x: x.capitalize(), parseStringLine(line[merge_test_ans_col]))) for line in input[1:] if
          line[merge_test_ans_col] != '']
    r2 = [list(map(lambda x: x.capitalize(), parseStringLine(line[sort_test_ans_col]))) for line in input[1:] if
          line[sort_test_ans_col] != '']

    a1 = [labels2Ints(l1[i], i1[i], r1[i]) if containLabels(l1[i], r1[i]) else [] for i in range(min(len(l1), len(r1)))]
    a2 = [labels2Ints(l2[i], i2[i], r2[i]) if containLabels(l2[i], r2[i]) else [] for i in range(min(len(l2), len(r2)))]

    s1 = [round(stats.spearmanr(sorted(i1[i]), a1[i])[0], 3) if len(l1[i]) == len(a1[i]) else numpy.NaN for i in
          range(min(len(i1), len(a1)))]
    s2 = [round(stats.spearmanr(sorted(i2[i]), a2[i])[0], 3) if len(l2[i]) == len(a2[i]) else numpy.NaN for i in
          range(min(len(i2), len(a2)))]

    return s1, s2


def parseStringLine(line):
    return list(filter(None,
                       str(line).replace("\n", "").replace("\'", "").replace(" ", "").replace("\"", "").replace("[",
                                                                                                                "").replace(
                           "]",
                           "").split(
                           ",")))


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
    if "exp_check_slider_1.response" in input[0]:
        exp_text = (input[-1][input[0].index("exp_check_slider_1.response")],
                    input[-1][input[0].index("exp_check_slider_2.response")],
                    input[-1][input[0].index("exp_check_res.text")])
    else:
        exp_text = (input[-1][input[0].index("exp_check_slider.response")],
                    input[-1][input[0].index("exp_check_res.text")])
    review_col = input[0].index("review_res.text")
    return [exp_text, [line[review_col] if line[review_col] != '' else 'Empty' for line in input[734:738]]]


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


def string2pairlist(str):
    labels = parseStringLine(str)
    return [[labels[2 * i], labels[2 * i + 1]] for i in range(len(labels) // 2)]


def t_test_with_graph(groups, subtitles, title, xlabel, ylabel, save_path="", name="mean_comp.png", ylim=50):
    colors = ["olivedrab", "yellowgreen", "lawngreen", "darkseagreen", "palegreen", "limegreen", "darkolivegreen"]
    fig, ax = plt.subplots(ncols=len(groups))
    fig.tight_layout(pad=3.0)
    for i in range(len(groups)):

        for j in range(len(groups[i])):
            for k in range(len(groups[i])):
                if j < k:
                    print("T-test Group %s and Group %s, result: %s" % (
                        xlabel[j], xlabel[k], stats.ttest_ind(list(filter(lambda x: not np.isnan(x), groups[i][j])),
                                                              list(filter(lambda x: not np.isnan(x), groups[i][k])))))

        means = [np.nanmean(g) for g in groups[i]]
        print("mean - " + str(means))
        std = [np.nanstd(g) / np.sqrt(len(list(filter(lambda x: not np.isnan(x), g)))) for g in groups[i]]
        print("std - " + str([np.nanstd(g) for g in groups[i]]))

        x = range(len(groups[i]))

        ax[i].bar(x, means, color=colors, yerr=std)
        ax[i].set_xticks(x)
        ax[i].set_xticklabels(xlabel)
        ax[i].set_yticks(np.linspace(0, ylim, 11, True))
        ax[i].set_ylabel(ylabel)
        ax[i].set_title(subtitles[i], y=0.95, pad=-14)
        fig.suptitle(title, fontsize=16)

    if save_path == "":
        plt.show()
    else:
        plt.savefig(save_path + name)


def draw_sim_hist_graph(groups, subtitles, title, ylabel, save_path="", ylim=16, alpha=0.05):
    colors = ["lightseagreen", "mediumturquoise", "lightblue", "paleturquoise", "lightskyblue"]
    fig, ax = plt.subplots(ncols=len(groups))
    fig.tight_layout(pad=3.0)
    for i in range(len(groups)):
        g_flat = groups[i].flatten()
        hist = sim_algo_hist(g_flat)
        ax[i].bar(range(len(list(hist.keys()))), list(hist.values()), color=colors)
        ax[i].set_xticks(np.arange(len(list(hist.keys()))))
        ax[i].set_xticklabels(hist.keys())
        ax[i].set_yticks(np.linspace(0, ylim, 9, True))
        ax[i].set_ylabel(ylabel)
        ax[i].set_title(subtitles[i], y=0.95, pad=-14)
        fig.suptitle(title, fontsize=16)

    if save_path == "":
        plt.show()
    else:
        plt.savefig(save_path + "alg_freq_" + str(alpha) + ".png")


def draw_sim_mean_graph(groups, subtitles, title, ylabel, save_path="", ylim=9, alpha=0.05):
    colors = ["salmon", "tomato", "darksalmon", "coral", "orangered"]
    fig, ax = plt.subplots(ncols=len(groups))
    fig.tight_layout(pad=3.0)
    for i in range(len(groups)):
        hist_d = []
        hist_c = []
        for j in range(len(groups[i])):
            hist = sim_algo_hist(groups[i][j])
            hist_d.append(list(hist.values()))
            hist_c = list(hist.keys())

        rotated = np.rot90(np.array(hist_d), axes=(1, 0))
        # print(rotated)
        mean = np.mean(hist_d, axis=0)
        std = np.std(hist_d, axis=0) / np.sqrt(np.size(hist_d))
        ax[i].bar(range(len(hist_c)), mean, color=colors, yerr=std)
        ax[i].set_xticks(range(len(hist_c)))
        ax[i].set_xticklabels(hist_c)
        ax[i].set_yticks(range(ylim))
        ax[i].set_ylabel(ylabel)
        ax[i].set_title(subtitles[i], y=0.95, pad=-14)
        fig.suptitle(title, fontsize=16)

    if save_path == "":
        plt.show()
    else:
        plt.savefig(save_path + "alg_mean_" + str(alpha) + ".png")


def eval_alg_sim(method, input, train_only=False, verbose=False, significance=0.05):
    sort_train_input_col = input[0].index("sort_train_input")
    sort_train_labels_col = input[0].index("sort_train_labels")
    sort_train_com_records = input[0].index("sort_train_compare_records")

    i = [list(map(int, parseStringLine(line[sort_train_input_col]))) for line in input[1:] if
         line[sort_train_input_col] != '']
    l = [parseStringLine(line[sort_train_labels_col]) for line in input[1:] if line[sort_train_labels_col] != '']
    r = [string2pairlist(line[sort_train_com_records].replace("\"", "\'", )) for line in input[1:] if
         line[sort_train_com_records] != '']
    if verbose:
        print(
            "\n>>> Sort train phase similarity, No. train questions = %s" % (str(
                len(i))))
    train_algs = []
    for u in range(len(i)):
        if r[u] != []:
            train_candidates, _, _, _ = find_similar_algo(method, i[u], l[u], r[u],
                                                          funcs=[("alphabetical", alphabetical_labels)],
                                                          verbose=verbose, alpha=significance)
            train_algs.append(train_candidates)
        else:
            train_algs.append([])

    if not train_only:
        sort_test_input_col = input[0].index("sort_test_input")
        sort_test_labels_col = input[0].index("sort_test_labels")
        sort_test_com_records = input[0].index("sort_test_compare_records")

        i = [list(map(int, parseStringLine(line[sort_test_input_col]))) for line in input[1:] if
             line[sort_test_input_col] != '']
        l = [parseStringLine(line[sort_test_labels_col]) for line in input[1:] if line[sort_test_labels_col] != '']
        r = [string2pairlist(line[sort_test_com_records].replace("\"", "\'", )) for line in input[1:] if
             line[sort_test_com_records] != '']

        if verbose:
            print(
                "\n>>> Sort test phase similarity, No. test questions = %s\n" % (str(
                    len(i))))

        algs = []
        for u in range(len(i)):
            candidates, _, _, _ = find_similar_algo(method, i[u], l[u], r[u], verbose=verbose, alpha=significance)
            algs.append(candidates)

    return train_algs, algs


def ttest_two_groups(g1, g2, name1, name2):
    t_test_with_graph([[np.nanmean(np.array(g1["sort_test_comp"])[:, :5], axis=1),
                        np.nanmean(np.array(g2["sort_test_comp"])[:, :5], axis=1)],
                       [np.nanmean(np.array(g1["sort_test_comp"])[:, 5:], axis=1),
                        np.nanmean(np.array(g2["sort_test_comp"])[:, 5:], axis=1)]],
                      # t_test_with_graph([[np.array(g1["sort_test_comp"])[:, :5].flatten(),
                      #                     np.array(g2["sort_test_comp"])[:, :5].flatten()],
                      #                    [np.array(g1["sort_test_comp"])[:, 5:].flatten(),
                      #                     np.array(g2["sort_test_comp"])[:, 5:].flatten()]],
                      ["Length of set < 10\nNo. question = 5", "Length of set = 10\nNo. question = 3"],
                      "No. Comparisons",
                      [name1, name2], "Mean", save_path="../results/")
    t_test_with_graph([[np.nanmean(np.array(g1["sort_test_time"])[:, :5], axis=1),
                        np.nanmean(np.array(g2["sort_test_time"])[:, :5], axis=1)],
                       [np.nanmean(np.array(g1["sort_test_time"])[:, 5:], axis=1),
                        np.nanmean(np.array(g2["sort_test_time"])[:, 5:], axis=1)]],
                      # t_test_with_graph([[np.array(g1["sort_test_time"])[:, :5].flatten(),
                      #                     np.array(g2["sort_test_time"])[:, :5].flatten()],
                      #                    [np.array(g1["sort_test_time"])[:, 5:].flatten(),
                      #                     np.array(g2["sort_test_time"])[:, 5:].flatten()]],
                      ["Length of set < 10\nNo. question = 5", "Length of set = 10\nNo. question = 3"],
                      "Response time",
                      [name1, name2], "Mean", save_path="../results/", name="mean_res_time.png", ylim=300)
    t_test_with_graph([[np.nanmean(np.array(g1["sort_test_score"])[:, :5], axis=1),
                        np.nanmean(np.array(g2["sort_test_score"])[:, :5], axis=1)],
                       [np.nanmean(np.array(g1["sort_test_score"])[:, 5:], axis=1),
                        np.nanmean(np.array(g2["sort_test_score"])[:, 5:], axis=1)]],
                      # t_test_with_graph([[np.array(g1["sort_test_score"])[:, :5].flatten(),
                      #                     np.array(g2["sort_test_score"])[:, :5].flatten()],
                      #                    [np.array(g1["sort_test_score"])[:, 5:].flatten(),
                      #                     np.array(g2["sort_test_score"])[:, 5:].flatten()]],
                      ["Length of set < 10\nNo. question = 5", "Length of set = 10\nNo. question = 3"],
                      "Response score",
                      [name1, name2], "Mean", save_path="../results/", name="mean_score.png", ylim=1.5)
