import csv
from os import listdir

import matplotlib.pyplot as plt
import numpy
import numpy as np
import pandas as pd
import statsmodels.api as sm
from scipy import stats
from statsmodels.formula.api import ols
from statsmodels.graphics.api import interaction_plot
from statsmodels.stats.multicomp import pairwise_tukeyhsd

from eval_trace import find_similar_algo, sim_algo_hist, alphabetical_labels

DEFAULT_GRAPH_PATH = "../results/test_1/"


def extract_from_CSV(paths, is_visual_trace_enabled=False, train_only=False, show_records=True, similarity_graphs=False,
                     sim="chi_sq_2x2", trace_similarity_analysis=False, filter_algorithms=[],
                     verbose=False, save_graphs=False, chi_sq_significance=0.05, save_path="", control_v="",
                     filter_multiplier=1):
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

    train_alg_estimates = []
    test_alg_estimates = []

    demographic_raw = []
    demographic = get_new_demographic_table()

    for i in range(len(csv_list)):

        c = csv_list[i]

        print(">>>>>>>>>>>>>>> %s >>>>>>>>>>>>>>>" % (filenames[i]))

        demographic_raw.append(extract_demographic(c))

        p = extract_pre_test(c)
        pre_test.append(p)

        t = extract_run_time(c)
        exp_run_time.append(t)

        s1, s2 = extract_response(c)
        merge_test_score.append(s1)
        sort_test_score.append(s2)

        t1, t2 = extract_test_time(c, s1, s2)
        merge_test_response_time.append(t1)
        sort_test_response_time.append(t2)

        c1, c2, r1, r2 = extract_comparison(c, "\'", s1, s2)
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

        if is_visual_trace_enabled:
            t = extract_trace(c)
            sort_test_trace.append(t)
            name = c[1][c[0].index("participant")]
            i = 1
            for d in t:
                reconstruct_trace(d, path, name + "_" + str(i))
                i += 1

        if trace_similarity_analysis:
            train_algs, algs = eval_alg_sim(sim, c, verbose=verbose, train_only=train_only,
                                            significance=chi_sq_significance)
            train_alg_estimates.append(train_algs)
            test_alg_estimates.append(algs)

    mean_mt = np.round(np.nanmean(merge_test_response_time, axis=0), decimals=3)
    mean_ms = np.round(np.nanmean(merge_test_score, axis=0), decimals=3)
    mean_mc = np.round(np.nanmean(merge_test_comparison, axis=0), decimals=3)
    mean_st = np.round(np.nanmean(sort_test_response_time, axis=0), decimals=3)
    mean_ss = np.round(np.nanmean(sort_test_score, axis=0), decimals=3)
    mean_sc = np.round(np.nanmean(sort_test_comparison, axis=0), decimals=3)

    sort_test_comparison_1 = []
    sort_test_response_time_1 = []
    sort_test_score_1 = []
    train_alg_estimates_1 = []
    test_alg_estimates_1 = []

    mean_ms_all = np.nanmean(merge_test_score)
    std_ms = np.nanstd(np.nanmean(merge_test_score, axis=1))

    for i in range(len(sort_test_score)):
        if (mean_ms_all - filter_multiplier * std_ms) <= np.nanmean(merge_test_score[i]) <= (
                mean_ms_all + filter_multiplier * std_ms):
            sort_test_score_1.append(sort_test_score[i])
            sort_test_response_time_1.append(sort_test_response_time[i])
            sort_test_comparison_1.append(sort_test_comparison[i])
            if trace_similarity_analysis:
                train_alg_estimates_1.append(train_alg_estimates[i])
                test_alg_estimates_1.append(test_alg_estimates[i])

    merge_test_score_2 = []
    merge_test_response_time_2 = []
    merge_test_comparison_2 = []
    sort_test_comparison_2 = []
    sort_test_response_time_2 = []
    sort_test_score_2 = []
    train_alg_hist_2 = []
    test_alg_hist_2 = []
    pre_test_2 = []
    free_res_2 = []

    if control_v == "pre_test":
        mean_pt = np.nanmean(np.array(pre_test)[:, 2])
        std_pt = np.nanstd(np.array(pre_test)[:, 2])
        for i in range(len(pre_test)):
            if (mean_pt - filter_multiplier * std_pt) <= pre_test[i][2] <= (mean_pt + filter_multiplier * std_pt):
                # if demographic_raw[i][0] > "_35":
                demographic = format_demographic(demographic_raw[i], demographic)
                merge_test_response_time_2.append(merge_test_response_time[i])
                merge_test_comparison_2.append(merge_test_comparison[i])
                merge_test_score_2.append(merge_test_score[i])
                sort_test_score_2.append(sort_test_score[i])
                sort_test_comparison_2.append(sort_test_comparison[i])
                sort_test_response_time_2.append(sort_test_response_time[i])
                pre_test_2.append(pre_test[i])
                free_res_2.append(free_res[i])
                # if "BS" in filter_algorithms and sim_algo_hist(test_alg_estimates[i])["BS"] != 0:
                #     for k in range(len(test_alg_estimates[i])):
                #         estimate = test_alg_estimates[i][k]
                #         if len(estimate) != 0 and len(
                #                 list(filter(lambda x: x[0] in ["bubsort_front", "bubsort_back"], estimate))) == len(
                #             estimate):
                #             sort_test_score_2[len(sort_test_score_2) - 1][k] = np.NaN
                #             sort_test_response_time_2[len(sort_test_response_time_2) - 1][k] = np.NaN
                #             sort_test_comparison_2[len(sort_test_comparison_2) - 1][k] = np.NaN
                # if "IS" in filter_algorithms and sim_algo_hist(test_alg_estimates[i])["IS"] != 0:
                #     for k in range(len(test_alg_estimates[i])):
                #         estimate = test_alg_estimates[i][k]
                #         if len(estimate) != 0 and len(
                #                 list(filter(lambda x: x[0] in ["isort_front", "isort_back"], estimate))) == len(
                #             estimate):
                #             sort_test_score_2[len(sort_test_score_2) - 1][k] = np.NaN
                #             sort_test_response_time_2[len(sort_test_response_time_2) - 1][k] = np.NaN
                #             sort_test_comparison_2[len(sort_test_comparison_2) - 1][k] = np.NaN
                # if "QS" in filter_algorithms and sim_algo_hist(test_alg_estimates[i])["QS"] != 0:
                #     for k in range(len(test_alg_estimates[i])):
                #         estimate = test_alg_estimates[i][k]
                #         if len(estimate) != 0 and len(
                #                 list(filter(lambda x: x[0] in ["qsort_first", "qsort_mid", "qsort_last"],
                #                             estimate))) == len(
                #             estimate):
                #             sort_test_score_2[len(sort_test_score_2) - 1][k] = np.NaN
                #             sort_test_response_time_2[len(sort_test_response_time_2) - 1][k] = np.NaN
                #             sort_test_comparison_2[len(sort_test_comparison_2) - 1][k] = np.NaN
                # if "DS" in filter_algorithms and sim_algo_hist(test_alg_estimates[i])["DS"] != 0:
                #     for k in range(len(test_alg_estimates[i])):
                #         estimate = test_alg_estimates[i][k]
                #         if len(estimate) != 0 and len(
                #                 list(filter(lambda x: x[0] in ["dict_sort_front", "dict_sort_mid", "dict_sort_back"],
                #                             estimate))) == len(
                #             estimate):
                #             sort_test_score_2[len(sort_test_score_2) - 1][k] = np.NaN
                #             sort_test_response_time_2[len(sort_test_response_time_2) - 1][k] = np.NaN
                #             sort_test_comparison_2[len(sort_test_comparison_2) - 1][k] = np.NaN
                # if "MS" in filter_algorithms and sim_algo_hist(test_alg_estimates[i])["MS"] != 0:
                #     for k in range(len(test_alg_estimates[i])):
                #         estimate = test_alg_estimates[i][k]
                #         if len(estimate) != 0 and len(
                #                 list(filter(lambda x: x[0] in ["botup_msort_left_front", "botup_msort_right_front",
                #                                                "botup_msort_left_back",
                #                                                "botup_msort_right_back", "msort_left_front",
                #                                                "msort_left_back",
                #                                                "msort_left_back",
                #                                                "msort_right_back"],
                #                             estimate))) == len(
                #             estimate):
                #             sort_test_score_2[len(sort_test_score_2) - 1][k] = np.NaN
                #             sort_test_response_time_2[len(sort_test_response_time_2) - 1][k] = np.NaN
                #             sort_test_comparison_2[len(sort_test_comparison_2) - 1][k] = np.NaN
                # if "Hybrid" in filter_algorithms and sim_algo_hist(test_alg_estimates[i])["Hybrid"] != 0:
                #     for k in range(len(test_alg_estimates[i])):
                #         estimate = test_alg_estimates[i][k]
                #         if len(estimate) != 0 and len(
                #                 list(filter(lambda x: x[0] in ["is_front_hybrid_ds_front", "is_front_hybrid_ds_mid",
                #                                                "is_front_hybrid_ds_back", "is_back_hybrid_ds_front",
                #                                                "is_back_hybrid_ds_mid", "is_back_hybrid_ds_back"],
                #                             estimate))) == len(
                #             estimate):
                #             sort_test_score_2[len(sort_test_score_2) - 1][k] = np.NaN
                #             sort_test_response_time_2[len(sort_test_response_time_2) - 1][k] = np.NaN
                #             sort_test_comparison_2[len(sort_test_comparison_2) - 1][k] = np.NaN
                # if trace_similarity_analysis:
                #     train_alg_hist_2.append(train_alg_estimates[i])
                #     test_alg_hist_2.append(test_alg_estimates[i])

    # elif control_v == "merge_score":
    #     sort_test_score_2 = sort_test_score_1
    #     sort_test_comparison_2 = sort_test_comparison_1
    #     sort_test_response_time_2 = sort_test_response_time_1
    #     train_alg_hist_2 = train_alg_estimates_1
    #     test_alg_hist_2 = test_alg_estimates_1
    # elif control_v == "score":
    #
    #     mean_1 = np.nanmean(np.array(sort_test_score_1)[:, :5])
    #     mean_2 = np.nanmean(np.array(sort_test_score_1)[:, 5:])
    #     std_1 = np.nanstd(np.nanmean(np.array(sort_test_score_1)[:, :5], axis=1))
    #     std_2 = np.nanstd(np.nanmean(np.array(sort_test_score_1)[:, 5:], axis=1))
    #
    #     for i in range(len(sort_test_score_1)):
    #         if (mean_1 - std_1) <= np.nanmean(sort_test_score_1[i][:5]) <= (mean_1 + std_1) and \
    #                 (mean_2 - std_2) <= np.nanmean(sort_test_score_1[i][5:]) <= (mean_2 + std_2):
    #             sort_test_score_2.append(sort_test_score_1[i])
    #             sort_test_response_time_2.append(sort_test_response_time_1[i])
    #             sort_test_comparison_2.append(sort_test_comparison_1[i])
    #             if trace_similarity_analysis:
    #                 train_alg_hist_2.append(train_alg_estimates_1[i])
    #                 test_alg_hist_2.append(test_alg_estimates_1[i])
    # elif control_v == "time":
    #
    #     mean_1 = np.nanmean(np.array(sort_test_response_time_1)[:, :5])
    #     mean_2 = np.nanmean(np.array(sort_test_response_time_1)[:, 5:])
    #     std_1 = np.nanstd(np.nanmean(np.array(sort_test_response_time_1)[:, :5], axis=1))
    #     std_2 = np.nanstd(np.nanmean(np.array(sort_test_response_time_1)[:, 5:], axis=1))
    #
    #     for i in range(len(sort_test_response_time_1)):
    #         if (mean_1 - std_1) <= np.nanmean(sort_test_response_time_1[i][:5]) <= (mean_1 + std_1) and \
    #                 (mean_2 - std_2) <= np.nanmean(sort_test_response_time_1[i][5:]) <= (mean_2 + std_2):
    #             sort_test_score_2.append(sort_test_score_1[i])
    #             sort_test_response_time_2.append(sort_test_response_time_1[i])
    #             sort_test_comparison_2.append(sort_test_comparison_1[i])
    #             if trace_similarity_analysis:
    #                 train_alg_hist_2.append(train_alg_estimates_1[i])
    #                 test_alg_hist_2.append(test_alg_estimates_1[i])
    # elif control_v == "efficiency":
    #
    #     mean_1 = np.nanmean(np.array(sort_test_comparison_1)[:, :5])
    #     mean_2 = np.nanmean(np.array(sort_test_comparison_1)[:, 5:])
    #     std_1 = np.nanstd(np.nanmean(np.array(sort_test_comparison_1)[:, :5], axis=1))
    #     std_2 = np.nanstd(np.nanmean(np.array(sort_test_comparison_1)[:, 5:], axis=1))
    #
    #     for i in range(len(sort_test_comparison_1)):
    #         if (mean_1 - std_1) <= np.nanmean(sort_test_comparison_1[i][:5]) <= (mean_1 + std_1) and \
    #                 (mean_2 - std_2) <= np.nanmean(sort_test_comparison_1[i][5:]) <= (mean_2 + std_2):
    #             sort_test_score_2.append(sort_test_score_1[i])
    #             sort_test_response_time_2.append(sort_test_response_time_1[i])
    #             sort_test_comparison_2.append(sort_test_comparison_1[i])
    #             if trace_similarity_analysis:
    #                 train_alg_hist_2.append(train_alg_estimates_1[i])
    #                 test_alg_hist_2.append(test_alg_estimates_1[i])
    else:
        for i in range(len(pre_test)):
            demographic = format_demographic(demographic_raw[i], demographic)

        merge_test_score_2 = merge_test_score
        merge_test_comparison_2 = merge_test_comparison
        merge_test_response_time_2 = merge_test_response_time
        sort_test_score_2 = sort_test_score
        sort_test_comparison_2 = sort_test_comparison
        sort_test_response_time_2 = sort_test_response_time
        pre_test_2 = pre_test
        free_res_2 = free_res
        train_alg_hist_2 = train_alg_estimates
        test_alg_hist_2 = test_alg_estimates

    print('>>> Run time: ' + str(exp_run_time))
    print(">>> partition size: " + str(len(sort_test_comparison_2)))
    print(">>> demographic age: " + str(demographic[0]))
    print(">>> demographic education: " + str(demographic[1]))
    print(">>> demographic gender: " + str(demographic[2]))
    print('>>> MaRs-IB')
    print('MaRs-IB pre-test (correct answers/total answered/accuracy): ' + str(
        ['/'.join([str(i) for i in res]) for res in pre_test]))

    if show_records:
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

        print('\nmean merge response time: %s' % mean_mt)
        print('mean merge test spearman rank score: %s' % mean_ms)
        print('mean merge No. comparison: %s' % mean_mc)
        print('mean sort response time: %s' % mean_st)
        print('mean sort test spearman rank score: %s' % mean_ss)
        print('mean sort No. comparison: %s' % mean_sc)

    if trace_similarity_analysis and similarity_graphs:
        if len(paths) == 1:
            key = paths[0].split("/")[-2]
            if save_graphs:
                g_l = {"Group1": "c1", "Group2": "c2", "Group3": "c3", "Group4": "c4"}

                graph_path = (DEFAULT_GRAPH_PATH if save_path == "" else save_path) + key + "/" + g_l[
                    key] + "_train_"
        else:
            key = "Multiple groups"
            if save_graphs:
                graph_path = (DEFAULT_GRAPH_PATH if save_path == "" else save_path)
        draw_sim_hist_graph([np.array(train_alg_hist_2)[:, :3], np.array(train_alg_hist_2)[:, 3]],
                            ["Length of set < 10\nNo. question = 3", "Length of set = 10\nNo. question = 1"],
                            "No. application in training" + " (" + key + ")", "Frequency", save_path=graph_path,
                            alpha=chi_sq_significance)
        if not train_only:
            if len(paths) == 1:
                key = paths[0].split("/")[-2]
                if save_graphs:
                    graph_path = (DEFAULT_GRAPH_PATH if save_path == "" else save_path) + key + "/" + g_l[
                        key] + "_test_"
            else:
                key = "Multiple groups"
                if save_graphs:
                    graph_path = (DEFAULT_GRAPH_PATH if save_path == "" else save_path)
            draw_sim_hist_graph([np.array(test_alg_hist_2)[:, :5], np.array(test_alg_hist_2)[:, 5:]],
                                ["Length of set < 10\nNo. question = 5", "Length of set = 10\nNo. question = 3"],
                                "No. application in performance test" + " (" + key + ")", "Frequency",
                                save_path=graph_path, alpha=chi_sq_significance, ylim=12)
            draw_sim_mean_graph([np.array(test_alg_hist_2)[:, :5], np.array(test_alg_hist_2)[:, 5:]],
                                ["Length of set < 10\nNo. question = 5", "Length of set = 10\nNo. question = 3"],
                                "No. application in performance test" + " (" + key + ")", "Mean",
                                save_path=graph_path, alpha=chi_sq_significance, ylim=3)

    res = {"merge_test_score": merge_test_score_2,
           "merge_test_time": merge_test_response_time_2,
           "merge_test_comp": merge_test_comparison_2,
           "sort_test_comp": sort_test_comparison_2,
           "sort_test_time": sort_test_response_time_2,
           "sort_test_score": sort_test_score_2,
           "pre_test": pre_test_2,
           "free_res": free_res_2,
           "demographic": demographic_raw}

    if trace_similarity_analysis:
        res["test_alg"] = test_alg_hist_2
    return res


def format_demographic(input, hist):
    hist[0][input[0]] += 1
    hist[1][input[1]] += 1
    hist[2][input[2]] += 1
    return hist


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

    return [total_correct, total_answered, round(float(total_correct / total_answered), 3)]


def extract_test_time(input, m_score, s_score):
    merge_test_time_col = [input[0].index("merge_test.tStart"), input[0].index("merge_test.tEnd")]
    sort_test_time_col = [input[0].index("sort_test.tStart"), input[0].index("sort_test.tEnd")]

    m_nan_idx = [i for i in range(len(m_score)) if np.isnan(m_score[i])]
    s_nan_idx = [i for i in range(len(s_score)) if np.isnan(s_score[i])]

    t1 = [round(float(line[merge_test_time_col[1]]) - float(line[merge_test_time_col[0]]), 2) for line in input[1:] if
          line[merge_test_time_col[0]] != '' and line[merge_test_time_col[1]] != '']
    t2 = [round(float(line[sort_test_time_col[1]]) - float(line[sort_test_time_col[0]]), 2) for line in input[1:] if
          line[sort_test_time_col[0]] != '' and line[sort_test_time_col[1]] != '']

    t1 = [t1[i] if i not in m_nan_idx else np.NaN for i in range(len(t1))]
    t2 = [t2[i] if i not in s_nan_idx else np.NaN for i in range(len(t2))]

    return t1, t2


# returns the experiment run time
def extract_run_time(input):
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


def get_new_demographic_table():
    return [
        {"_18_24": 0, "_25_34": 0, "_35_44": 0, "_45_54": 0, "_55_64": 0, "_65": 0},
        {"less_than_high_school": 0, "high_school_equivalent": 0, "college": 0, "bachelor": 0, "graduate": 0,
         "doctorate": 0, "other": 0},
        {"female": 0, "male": 0, "other_gender": 0, "prefer_not_to_say": 0}
    ]


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

    s1 = [round(stats.spearmanr(sorted(i1[i]), a1[i])[0], 3) if len(l1[i]) == len(a1[i]) else 0.0 for i in
          range(min(len(i1), len(a1)))]
    # s1 = [np.sqrt(1 - score_regularise(round(stats.spearmanr(sorted(i1[i]), a1[i])[0], 3))) if len(l1[i]) == len(a1[i]) else 1 for i in
    #       range(min(len(i1), len(a1)))]
    s1 = list(map(lambda x: 0.5 * abs(x) if x < 0.0 else x, s1))
    s2 = [round(stats.spearmanr(sorted(i2[i]), a2[i])[0], 3) if len(l2[i]) == len(a2[i]) else 0.0 for i in
          range(min(len(i2), len(a2)))]
    # s2 = [np.sqrt(1 - score_regularise(round(stats.spearmanr(sorted(i2[i]), a2[i])[0], 3))) if len(l2[i]) == len(a2[i]) else 1 for i in
    #       range(min(len(i2), len(a2)))]
    s2 = list(map(lambda x: 0.5 * abs(x) if x < 0.0 else x, s2))

    return s1, s2


def parseStringLine(line):
    return list(filter(None,
                       str(line).replace("\n", "").replace("\'", "").replace(" ", "").replace("\"", "").replace("[",
                                                                                                                "").replace(
                           "]",
                           "").split(
                           ",")))


def save_free_ans_csv(filepath, data):
    header = ["Has CS degree", "Has learned sort alg", "Used sort alg", "Strategy for sorting short number sets",
              "Strategy for sorting long sets", "Strategy of using blue star (merge) for purple diamond (sort)",
              "Blue star strategy 1 vs. blue star strategy 2"]
    rows = [[d[0][1], d[0][1], d[0][2], d[1][0].lower(), d[1][1].lower(), d[1][2].lower(), d[1][3].lower()] for d in
            data]
    with open(filepath, "w", newline='') as file:
        writer = csv.writer(file)
        writer.writerow(header)
        writer.writerows(rows)


def containLabels(labels, ans):
    return not (False in [a in labels for a in ans])


def score_regularise(score):
    if score > 0:
        return score
    elif score < 0:
        return abs(score) / 1.5
    else:
        return score


def labels2Ints(labels, ints, res):
    return [ints[labels.index(r)] for r in res]


def extract_demographic(input):
    age = input[-1][input[0].index("demographic_age")]
    education = input[-1][input[0].index("demographic_education")]
    gender = input[-1][input[0].index("demographic_gender")]

    return age, education, gender


def extract_comparison(input, label_pad, m_score, s_score):
    merge_test_com_col = input[0].index("merge_test_compareN")
    merge_test_com_records = input[0].index("merge_test_compare_records")
    sort_test_com_col = input[0].index("sort_test_compareN")
    sort_test_com_records = input[0].index("sort_test_compare_records")

    m_nan_idx = [i for i in range(len(m_score)) if np.isnan(m_score[i])]
    s_nan_idx = [i for i in range(len(s_score)) if np.isnan(s_score[i])]
    m_compN_l = [int(line[merge_test_com_col]) for line in input[1:] if line[merge_test_com_col] != '']
    s_compN_l = [int(line[sort_test_com_col]) for line in input[1:] if line[sort_test_com_col] != '']

    return [m_compN_l[i] if i not in m_nan_idx else np.NaN for i in range(len(m_compN_l))], [
        s_compN_l[i] if i not in s_nan_idx else np.NaN for i in range(len(s_compN_l))], [
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


def ANOVA_with_graph(gs, title, xlabel, ylabel, save_path="", ylim=50, subtitles=[], anova_two_way=True,
                     tukey_two_way=True):
    colors = ["orangered", "deepskyblue"]
    linestyle = ["-", '--']
    makers = ["D", "^"]
    fig, ax = plt.subplots(ncols=len(gs))
    fig.tight_layout(pad=3.0)

    for i in range(len(gs)):

        x = [0, 1]
        if len(gs) == 1:
            axis = ax
        else:
            axis = ax[i]
            if subtitles:
                axis.set_title(subtitles[i], y=0.95, pad=-14)

        iv_1_f = [*["merge then sort"] * len(gs[i][0]), *["merge then sort"] * len(gs[i][1]),
                  *["sort then merge"] * len(gs[i][2]), *["sort then merge"] * len(gs[i][3])]
        iv_2_f = [*["with explanations"] * len(gs[i][0]), *["without explanations"] * len(gs[i][1]),
                  *["with explanations"] * len(gs[i][2]), *["without explanations"] * len(gs[i][3])]
        dv_f = [*gs[i][0], *gs[i][1], *gs[i][2], *gs[i][3]]
        df = pd.DataFrame({"Curriculum": iv_1_f,
                           title.split()[-1]: dv_f})
        if anova_two_way:
            df["Explanations"] = iv_2_f
            format = title.split()[-1] + ' ~ C(Curriculum) + C(Explanations) + C(Curriculum):C(Explanations)'
            if tukey_two_way:
                df["Combination"] = df["Curriculum"] + " / " + df["Explanations"]
            else:
                df["Combination"] = df["Curriculum"]

            means = [np.nanmean(g) for g in gs[i]]
            print("mean - " + str(means))
            stderr = [np.nanstd(g) / np.sqrt(len(list(filter(lambda x: not np.isnan(x), g)))) for g in gs[i]]
            print("stderr - " + str(stderr))

            fig = interaction_plot(
                df["Curriculum"],
                df["Explanations"],
                dv_f,
                colors=colors,
                linestyles=linestyle,
                markers=makers,
                legendloc="lower right",
                ylabel=ylabel,
                ax=axis
            )

        else:
            format = title.split()[-1] + ' ~ C(Curriculum)'
            df["Combination"] = df["Curriculum"]

            means = [np.nanmean([*gs[i][0], *gs[i][1]]), np.nanmean([*gs[i][2], *gs[i][3]])]
            print("mean - " + str(means))
            stderr = [np.nanstd([*gs[i][0], *gs[i][1]]) / np.sqrt(
                len(list(filter(lambda x: not np.isnan(x), [*gs[i][0], *gs[i][1]])))),
                      np.nanstd([*gs[i][2], *gs[i][3]]) / np.sqrt(
                          len(list(filter(lambda x: not np.isnan(x), [*gs[i][2], *gs[i][3]]))))]
            print("stderr - " + str(stderr))

            axis.legend(["with explanations", "without explanations"], loc="lower right")
            axis.set_ylabel(ylabel)
            axis.plot(x, means, color=colors[i], linestyle=linestyle[i], marker=makers[i])

        axis.set_xticks(x)
        axis.set_xlim([-0.5, 1.5])
        axis.set_xticklabels(["MS", "SM"])
        axis.set_ylim([min(means) - 5 * max(stderr), max(means) + 5 * max(stderr)])
        fig.suptitle(title, fontsize=16)

        model = ols(format, data=df).fit()
        ANOVA = sm.stats.anova_lm(model, typ=2)
        print(ANOVA)

        tukey = pairwise_tukeyhsd(endog=dv_f, groups=df["Combination"], alpha=0.05)
        print(tukey)

    if save_path == "":
        plt.show()
    else:
        plt.savefig(save_path + "ANOVA_" + ylabel + "_" + title + "_" + "_".join(xlabel) + ".png")


def t_test_with_graph(groups, title, xlabel, ylabel, save_path="", subtitles=[], ylim=50):
    colors = ["olivedrab", "yellowgreen", "lawngreen", "darkseagreen", "palegreen", "limegreen", "darkolivegreen"]
    fig, ax = plt.subplots(ncols=len(groups))
    fig.tight_layout(pad=3.0)
    for i in range(len(groups)):

        for j in range(len(groups[i])):
            for k in range(len(groups[i])):
                if j < k:
                    ttest = stats.ttest_ind(list(filter(lambda x: not np.isnan(x), groups[i][j])),
                                            list(filter(lambda x: not np.isnan(x), groups[i][k])))
                    print("T-test %s and %s value = %s, p = %s" % (
                        xlabel[j], xlabel[k], round(ttest[0], 6), round(ttest[1] / 2, 8)))

        means = [round(np.nanmean(g), 6) for g in groups[i]]
        print("mean - " + str(means))
        std = [np.nanstd(g) / np.sqrt(len(list(filter(lambda x: not np.isnan(x), g)))) for g in groups[i]]
        print("std - " + str([round(np.nanstd(g), 6) for g in groups[i]]))

        x = range(len(groups[i]))

        if len(groups) == 1:
            axis = ax
        else:
            axis = ax[i]
            if subtitles:
                axis.set_title(subtitles[i], y=0.95, pad=-14)
        axis.bar(x, means, color=colors, yerr=std)
        axis.set_xticks(x)
        axis.set_xticklabels(xlabel)
        axis.set_yticks(np.linspace(0, ylim, 11, True))
        axis.set_ylabel(ylabel)
        axis.set_title(subtitles[i], y=0.95, pad=-14)
        fig.suptitle(title, fontsize=16)

    if save_path == "":
        plt.show()
    else:
        plt.savefig(save_path + "ttest_" + ylabel + "_" + title + "_" + "_".join(xlabel) + ".png")


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
                                                          label_order=[("alphabetical", alphabetical_labels)],
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


def sort_statistical_tests(gs, ns, test="ANOVA", anova_two_way=True, tukey_two_way=True):
    print("\n>>> sort test statistics")
    print("\n>>> no. comparisons")
    if test == "ttest":
        t_test_with_graph(
            # [[np.nanmean(np.array(g["sort_test_comp"])[:, :5], axis=1) for g in gs],
            #  [np.nanmean(np.array(g["sort_test_comp"])[:, 5:], axis=1) for g in gs]],
            [[np.array(g["sort_test_comp"])[:, :5].flatten() for g in gs],
             [np.array(g["sort_test_comp"])[:, 5:].flatten() for g in gs]],
            # [[np.nanmean(np.array(g["sort_test_comp"])[:, :2], axis=1) for g in gs],
            #  [np.nanmean(np.array(g["sort_test_comp"])[:, 2:5], axis=1) for g in gs],
            #  [np.nanmean(np.array(g["sort_test_comp"])[:, 5:7], axis=1) for g in gs],
            #  [np.nanmean(np.array(g["sort_test_comp"])[:, 7:], axis=1) for g in gs]],
            # [[np.nanmean(np.array(g["sort_test_comp"])[:, 5:6], axis=1) for g in gs],
            #  [np.nanmean(np.array(g["sort_test_comp"])[:, 6:7], axis=1) for g in gs],
            #  [np.nanmean(np.array(g["sort_test_comp"])[:, 7:], axis=1) for g in gs]],
            # ["Length of set = 6\nNo. question = 2", "7 <= Length of set <= 8\nNo. question = 3",
            #  "Length of set = 10\nNo. question = 2", "Length of set = 10\nNo. question = 1"],
            "Sort Test No. Comparisons",
            ns, "Mean", subtitles=["Length of set < 10\nNo. question = 5", "Length of set = 10\nNo. question = 3"],
            save_path="../results/")
    else:
        ANOVA_with_graph(
            [[np.array(g["sort_test_comp"])[:, :5].flatten() for g in gs],
             [np.array(g["sort_test_comp"])[:, 5:].flatten() for g in gs]],
            # [[np.array(g["sort_test_comp"])[:, :].flatten() for g in gs]],
            "Sort Test No. Comparisons",
            ns, "Mean", subtitles=["Short sets\nNo. question = 4", "Long sets\nNo. question = 4"],
            save_path="../results/",
            anova_two_way=anova_two_way,
            tukey_two_way=tukey_two_way
        )
    print(">>> response time")
    if test == "ttest":
        t_test_with_graph(
            # [[np.nanmean(np.array(g["sort_test_time"])[:, :5], axis=1) for g in gs],
            #  [np.nanmean(np.array(g["sort_test_time"])[:, 5:], axis=1) for g in gs]],
            [[np.array(g["sort_test_time"])[:, :5].flatten() for g in gs],
             [np.array(g["sort_test_time"])[:, 5:].flatten() for g in gs]],
            # [[np.nanmean(np.array(g["sort_test_time"])[:, :2], axis=1) for g in gs],
            #  [np.nanmean(np.array(g["sort_test_time"])[:, 2:5], axis=1) for g in gs],
            #  [np.nanmean(np.array(g["sort_test_time"])[:, 5:7], axis=1) for g in gs],
            #  [np.nanmean(np.array(g["sort_test_time"])[:, 7:], axis=1) for g in gs]],
            # [[np.nanmean(np.array(g["sort_test_time"])[:, 5:6], axis=1) for g in gs],
            #  [np.nanmean(np.array(g["sort_test_time"])[:, 6:7], axis=1) for g in gs],
            #  [np.nanmean(np.array(g["sort_test_time"])[:, 7:], axis=1) for g in gs]],
            # ["Length of set = 6\nNo. question = 2", "7 <= Length of set <= 8\nNo. question = 3",
            #  "Length of set = 10\nNo. question = 2", "Length of set = 10\nNo. question = 1"],
            "Sort Test Response time",
            ns, "Mean", subtitles=["Length of set < 10\nNo. question = 5", "Length of set = 10\nNo. question = 3"],
            save_path="../results/", ylim=300)
    else:
        ANOVA_with_graph(
            [[np.array(g["sort_test_time"])[:, :5].flatten() for g in gs],
             [np.array(g["sort_test_time"])[:, 5:].flatten() for g in gs]],
            # [[np.array(g["sort_test_time"])[:, :].flatten() for g in gs]],
            "Sort Test Response time",
            ns, "Mean", save_path="../results/",
            subtitles=["Short sets\nNo. question = 4", "Long sets\nNo. question = 4"], ylim=300,
            anova_two_way=anova_two_way,
            tukey_two_way=tukey_two_way
        )
    print(">>> Score")
    if test == "ttest":
        t_test_with_graph(
            # [[np.nanmean(np.array(g["sort_test_score"])[:, :5], axis=1) for g in gs],
            #  [np.nanmean(np.array(g["sort_test_score"])[:, 5:], axis=1) for g in gs]],
            [[np.array(g["sort_test_score"])[:, :5].flatten() for g in gs],
             [np.array(g["sort_test_score"])[:, 5:].flatten() for g in gs]],
            # [[np.nanmean(np.array(g["sort_test_score"])[:, :2], axis=1) for g in gs],
            #  [np.nanmean(np.array(g["sort_test_score"])[:, 2:5], axis=1) for g in gs],
            #  [[np.nanmean(np.array(g["sort_test_score"])[:, 5:6], axis=1) for g in gs],
            #  [np.nanmean(np.array(g["sort_test_score"])[:, 6:7], axis=1) for g in gs],
            #  [np.nanmean(np.array(g["sort_test_score"])[:, 7:], axis=1) for g in gs]],
            # ["Length of set = 6\nNo. question = 2", "7 <= Length of set <= 8\nNo. question = 3",
            #  "Length of set = 10\nNo. question = 2", "Length of set = 10\nNo. question = 1"],
            "Sort Test Response score",
            ns, "Mean", subtitles=["Length of set < 10\nNo. question = 5", "Length of set = 10\nNo. question = 3"],
            save_path="../results/", ylim=1)
    else:
        ANOVA_with_graph(
            [[np.array(g["sort_test_score"])[:, :5].flatten() for g in gs],
             [np.array(g["sort_test_score"])[:, 5:].flatten() for g in gs]],
            # [[np.array(g["sort_test_score"])[:, :].flatten() for g in gs]],
            "Sort Test Response score",
            ns, "Mean", save_path="../results/",
            subtitles=["Short sets\nNo. question = 4", "Long sets\nNo. question = 4"], ylim=1,
            anova_two_way=anova_two_way,
            tukey_two_way=tukey_two_way
        )


def merge_statistical_tests(gs, ns, test="ANOVA"):
    print("\n>>> merge test statistics")
    print("\n>>> no. comparisons")
    if test == "ttest":
        t_test_with_graph([[np.nanmean(np.array(g["merge_test_comp"]), axis=1) for g in gs]],
                          ["Length of set < 10\nNo. question = 5", "Length of set = 10\nNo. question = 3"],
                          "Merge Test No. Comparisons",
                          ns, "Mean", save_path="../results/", ylim=15)
    else:
        pass
    print(">>> response time")
    if test == "ttest":
        t_test_with_graph([[np.nanmean(np.array(g["merge_test_time"]), axis=1) for g in gs]],
                          ["Length of set < 10\nNo. question = 5", "Length of set = 10\nNo. question = 3"],
                          "Merge Test Response time",
                          ns, "Mean", save_path="../results/", ylim=100)
    else:
        pass
    print(">>> Score")
    if test == "ttest":
        t_test_with_graph([[np.nanmean(np.array(g["merge_test_score"]), axis=1) for g in gs]],
                          ["Length of set < 10\nNo. question = 5", "Length of set = 10\nNo. question = 3"],
                          "Merge Test Response score",
                          ns, "Mean", save_path="../results/", ylim=1)
    else:
        pass


def pre_test_cross_groups_filter(gs, ns, filter_mul=1):
    print("\n>>> Perform pre-test filter u-std <= acc <= u+std\n")
    pre_test_res = []
    for g in gs:
        pre_test_res += g["pre_test"]
    cross_groups_mean = np.mean(np.array(pre_test_res)[:, 2])
    cross_groups_std = np.std(np.array(pre_test_res)[:, 2])

    for g in gs:
        pre_test_data = list(g["pre_test"])
        for key in g.keys():
            data = []
            for i in range(len(g[key])):
                if (cross_groups_mean - filter_mul * cross_groups_std) <= pre_test_data[i][2] <= (
                        cross_groups_mean + filter_mul * cross_groups_std):
                    data.append(g[key][i])
            g[key] = data

    for i in range(len(gs)):
        g = gs[i]
        size = 0
        for key in g.keys():
            if size == 0:
                size = len(g[key])
            else:
                if size != len(g[key]):
                    print(key)
                    raise Exception("Error in processing records!")
        print(">>> %s size = %s" % (ns[i], size))

        table = get_new_demographic_table()
        for d in g["demographic"]:
            table = format_demographic(d, table)
        print(">>> demographic age: " + str(table[0]))
        print(">>> demographic education: " + str(table[1]))
        print(">>> demographic gender: " + str(table[2]))

    return gs, cross_groups_mean, cross_groups_std


def plot_line_graphs(gs, ns):
    pass


def parse_textual_response_corpus(gs, ns):
    for i in range(len(gs)):
        group_corpus = {}
        for data in gs[i]["free_res"]:
            for ans in np.array(data[1])[:2]:
                words = ans.replace(".", "").replace("'", "").replace(",", "").split(" ")
                for w in words:
                    group_corpus[w] += 1
