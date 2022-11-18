import csv
from os import listdir

import matplotlib
import matplotlib.pyplot as plt
import numpy
import numpy as np
import pandas as pd
import statsmodels.api as sm
import statsmodels.stats.contingency_tables
from scipy import stats
from statsmodels.formula.api import ols
from statsmodels.stats.multicomp import pairwise_tukeyhsd

from eval_trace import find_similar_algo, sim_algo_hist, alphabetical_labels

DEFAULT_GRAPH_PATH = "../results/test_1/"
ALG_CATAGORIES = ["BS", "DS", "IS", "MS", "QS", "Hybrid", "Other"]
matplotlib.use('svg')


def extract_from_CSV(paths, is_visual_trace_enabled=False, train_only_trace=False, show_records=True,
                     draw_similarity_graphs=False,
                     trace_analysis_method="chi_sq_2x2", trace_similarity_analysis=False, exclude_algorithms=[],
                     filter_name="",
                     verbose=False, save_similarity_graphs=False, chi_sq_significance=0.005, save_path="",
                     pre_test_mean_acc=0.0, pre_test_std_acc=0.0,
                     filter_std_multiplier=1):
    '''

    Main function to call that extracts data from csv files stored.

    :param paths: collection of paths which store csv files, e.g. "../test/test_1/Group1/",
                  for multiple paths, trace analysis graphs saving need to be fixed
    :param is_visual_trace_enabled: produce visualisation of human trace
    :param train_only_trace: focus on human sorting traces from training only
    :param show_records: prints extracted data to terminal.
    :param draw_similarity_graphs: generate bar graphs showing machine algorithms
                              that approximately match human sorting trace
    :param trace_analysis_method: which of the trace analysis methods should be used, e.g. "chi_sq_2x2", "chi_sq" for chi
                           square based and longest common subsequence "lcs"
    :param trace_similarity_analysis: perform trace analysis with trace_analysis_method
    :param exclude_algorithms: exclude answers which matches any in the list of algorithms provided from statistical tests
    :param pre_test_mean_acc: MaRs-IB pretest mean accuracy for pretest filtering, if already known
    :param pre_test_std_acc: MaRs-IB pretest std accuracy pretest filtering, if already known
    :param verbose: should be turned off if not for debugging and detailed execution info
    :param save_similarity_graphs: should similarity graphs be save or rendered
    :param chi_sq_significance: significance level for chi sq tests in trace analysis
    :param save_path: base path for saving generated graphs, e.g. "../results/amt/"
    :param filter_name:
    :param filter_std_multiplier:
    :return:
    '''

    # find csv files and parse
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
    sort_test_mouse_trace = []
    merge_test_comparison_records = []
    sort_test_comparison_records = []
    free_res = []

    exp_run_time = []

    merge_train_response_time = []
    sort_train_response_time = []
    merge_train_score = []
    sort_train_score = []
    merge_train_comparison = []
    sort_train_comparison = []
    merge_train_comparison_records = []
    sort_train_comparison_records = []

    train_alg_estimates = []
    test_alg_estimates = []

    demographic_entries = []
    demographic_acc = get_new_demographic_table()

    for i in range(len(csv_list)):

        # extract data based on column keys
        c = csv_list[i]

        print(">>>>>>>>>>>>>>> %s >>>>>>>>>>>>>>>" % (filenames[i]))

        demographic_entries.append(extract_demographic(c))

        p = extract_pre_test(c)
        pre_test.append(p)

        t = extract_run_time(c)
        exp_run_time.append(t)

        s1, s2 = extract_response_score(c)
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

        s3, s4 = extract_train_response_score(c)
        merge_train_score.append(s3)
        sort_train_score.append(s4)

        c3, c4, r3, r4 = extract_train_comparison(c, "\'")
        merge_train_comparison.append(c3)
        sort_train_comparison.append(c4)
        merge_train_comparison_records.append(r3)
        sort_train_comparison_records.append(r4)

        # if visualisation of mouse trace is enabled
        if is_visual_trace_enabled:
            t = extract_mouse_trace(c)
            sort_test_mouse_trace.append(t)

        e = extract_free_response(c)
        free_res.append(e)

        if trace_similarity_analysis:
            train_algs, algs = eval_alg_sim(trace_analysis_method, c, verbose=verbose, train_only=train_only_trace,
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
        if (mean_ms_all - filter_std_multiplier * std_ms) <= np.nanmean(merge_test_score[i]) <= (
                mean_ms_all + filter_std_multiplier * std_ms):
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
    sort_train_score_2 = []
    sort_train_response_time_2 = []
    sort_train_comparison_2 = []
    sort_test_score_2 = []
    train_alg_hist_2 = []
    test_alg_hist_2 = []
    pre_test_2 = []
    free_res_2 = []
    filenames_2 = []

    if filter_name == "pre_test" or (pre_test_mean_acc != 0.0 and pre_test_std_acc != 0.0):

        if pre_test_mean_acc == 0.0 and pre_test_std_acc == 0.0:
            pre_test_mean_acc = np.nanmean(np.array(pre_test)[:, 2])
            pre_test_std_acc = np.nanstd(np.array(pre_test)[:, 2])

        for i in range(len(pre_test)):
            if (pre_test_mean_acc - filter_std_multiplier * pre_test_std_acc) <= pre_test[i][2] <= (
                    pre_test_mean_acc + filter_std_multiplier * pre_test_std_acc):

                demographic_acc = format_demographic(demographic_entries[i], demographic_acc)

                merge_test_response_time_2.append(merge_test_response_time[i])
                merge_test_comparison_2.append(merge_test_comparison[i])
                merge_test_score_2.append(merge_test_score[i])

                pre_test_2.append(pre_test[i])
                free_res_2.append(free_res[i])
                filenames_2.append(filenames[i])

                s = sort_test_score[i]
                sc = sort_test_comparison[i]
                rt = sort_test_response_time[i]

                sort_train_score_2.append(sort_train_score[i])
                sort_train_comparison_2.append(sort_train_comparison[i])

                # exclude sort answers with trace matching provided algorithm abbreviations
                if trace_similarity_analysis:
                    for k in range(len(test_alg_estimates[i])):
                        estimate = test_alg_estimates[i][k]
                        if len(estimate) != 0:
                            if len(list(filter(lambda x: x[0] in ["bubsort_front", "bubsort_back"], estimate))) == len(
                                    estimate):
                                if "BS" in exclude_algorithms and sim_algo_hist(test_alg_estimates[i])["BS"] != 0:
                                    s[k] = np.NaN
                                    rt[k] = np.NaN
                                    sc[k] = np.NaN
                                continue
                            elif len(list(filter(lambda x: x[0] in ["isort_front", "isort_back"], estimate))) == len(
                                    estimate):
                                if "IS" in exclude_algorithms and sim_algo_hist(test_alg_estimates[i])["IS"] != 0:
                                    s[k] = np.NaN
                                    rt[k] = np.NaN
                                    sc[k] = np.NaN
                                continue
                            elif len(list(filter(lambda x: x[0] in ["qsort_first", "qsort_mid", "qsort_last"],
                                                 estimate))) == len(estimate):
                                if "QS" in exclude_algorithms and sim_algo_hist(test_alg_estimates[i])["QS"] != 0:
                                    s[k] = np.NaN
                                    rt[k] = np.NaN
                                    sc[k] = np.NaN
                                continue
                            elif len(list(filter(
                                    lambda x: x[0] in ["dict_sort_front", "dict_sort_mid", "dict_sort_back"],
                                    estimate))) == len(estimate):
                                if "DS" in exclude_algorithms and sim_algo_hist(test_alg_estimates[i])["DS"] != 0:
                                    s[k] = np.NaN
                                    rt[k] = np.NaN
                                    sc[k] = np.NaN
                                continue
                            elif len(list(filter(lambda x: x[0] in ["botup_msort_left_front", "botup_msort_right_front",
                                                                    "botup_msort_left_back",
                                                                    "botup_msort_right_back", "msort_left_front",
                                                                    "msort_left_back",
                                                                    "msort_left_back",
                                                                    "msort_right_back"],
                                                 estimate))) == len(estimate):
                                if "MS" in exclude_algorithms and sim_algo_hist(test_alg_estimates[i])["MS"] != 0:
                                    s[k] = np.NaN
                                    rt[k] = np.NaN
                                    sc[k] = np.NaN
                                continue
                            elif len(
                                    list(filter(lambda x: '_'.join(x[0].split('_')[:-1]) in ["is_front_hybrid_ds_front",
                                                                                             "is_front_hybrid_ds_mid",
                                                                                             "is_front_hybrid_ds_back",
                                                                                             "is_back_hybrid_ds_front",
                                                                                             "is_back_hybrid_ds_mid",
                                                                                             "is_back_hybrid_ds_back"],
                                                estimate))) == len(estimate):
                                if "Hybrid" in exclude_algorithms and sim_algo_hist(test_alg_estimates[i])[
                                    "Hybrid"] != 0:
                                    s[k] = np.NaN
                                    rt[k] = np.NaN
                                    sc[k] = np.NaN
                                continue
                        if "Other" in exclude_algorithms and sim_algo_hist(test_alg_estimates[i])["Other"] != 0:
                            s[k] = np.NaN
                            rt[k] = np.NaN
                            sc[k] = np.NaN

                sort_test_score_2.append(list(
                    filter(lambda x: not np.isnan(x), s)))
                sort_test_comparison_2.append(list(
                    filter(lambda x: not np.isnan(x), sc)))
                sort_test_response_time_2.append(list(
                    filter(lambda x: not np.isnan(x), rt)))

                if trace_similarity_analysis:
                    train_alg_hist_2.append(train_alg_estimates[i])
                    test_alg_hist_2.append(test_alg_estimates[i])

                # save sort mouse trace visualisation to save_path
                if is_visual_trace_enabled:
                    participantID = filenames[i].split(".")[0]
                    t = sort_test_mouse_trace[i]
                    i = 1
                    for d in t:
                        reconstruct_trace(d, save_path, participantID + "_" + str(i))
                        i += 1
    else:

        # if no filtering is applied
        for i in range(len(pre_test)):
            demographic_acc = format_demographic(demographic_entries[i], demographic_acc)

        merge_test_score_2 = merge_test_score
        merge_test_comparison_2 = merge_test_comparison
        merge_test_response_time_2 = merge_test_response_time
        sort_test_score_2 = sort_test_score
        sort_test_comparison_2 = sort_test_comparison
        sort_test_response_time_2 = sort_test_response_time

        pre_test_2 = pre_test
        free_res_2 = free_res
        filenames_2 = filenames

        sort_train_score_2 = sort_train_score
        sort_train_response_time_2 = sort_train_response_time
        sort_train_comparison_2 = sort_train_comparison

        train_alg_hist_2 = train_alg_estimates
        test_alg_hist_2 = test_alg_estimates

    # print group general information
    print('>>> Run time: ' + str(exp_run_time))
    print(">>> partition size: " + str(len(sort_test_comparison_2)))
    print(">>> demographic age: " + str(demographic_acc[0]))
    print(">>> demographic education: " + str(demographic_acc[1]))
    print(">>> demographic gender: " + str(demographic_acc[2]))
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

    res = {"record_names": filenames_2,
           "merge_test_score": merge_test_score_2,
           "merge_test_comp": merge_test_comparison_2,
           "merge_test_time": merge_test_response_time_2,
           "sort_test_score": sort_test_score_2,
           "sort_test_comp": sort_test_comparison_2,
           "sort_test_time": sort_test_response_time_2,
           "sort_train_score": sort_train_score_2,
           "sort_train_comp": sort_train_comparison_2,
           "sort_train_time": sort_train_response_time_2,
           "pre_test": pre_test_2,
           "free_res": free_res_2,
           "demographic": demographic_entries,
           }

    # process and save trace analysis histograms/bar graphs
    if trace_similarity_analysis:
        graph_path = ""
        g_l = {"Group1": "g1", "Group2": "g2", "Group3": "g3", "Group4": "g4", "with_bg": "bg"}
        key = paths[0].split("/")[-2] if g_l[paths[0].split("/")[-2]] != "bg" else paths[0].split("/")[-3]
        if save_similarity_graphs:
            graph_path = (DEFAULT_GRAPH_PATH if save_path == "" else save_path) + key + "/" + g_l[
                key] + "_train_"
        # draw_sim_hist_graph(
        #     # [np.array(train_alg_hist_2)[:, :3], np.array(train_alg_hist_2)[:, 3]],
        #     [np.array(train_alg_hist_2)],
        #     "No. application in training" + " (" + key + ")", "Frequency", save_path=graph_path,
        #     # subtitles=["Length of set < 10\nNo. question = 3",
        #     #            "Length of set = 10\nNo. question = 1"],
        #     alpha=chi_sq_significance)
        train_alg_hist_aggr, train_alg_hist_3 = similarity_distribution(
            # [np.array(train_alg_hist_2)[:, :3], np.array(train_alg_hist_2)[:, 3]],
            [np.array(train_alg_hist_2)],
            "No. application in training" + " (" + key + ")", "Mean",
            # subtitles=["Length of set < 10\nNo. question = 3",
            #            "Length of set = 10\nNo. question = 1"],
            save_path=graph_path, alpha=chi_sq_significance, ylim=0.5, distribution_graph=draw_similarity_graphs)
        print(">>> human sorting strategy distribution (Train): " + str(train_alg_hist_aggr))
        res["train_alg"] = train_alg_hist_3

        if not train_only_trace:
            key = paths[0].split("/")[-2] if g_l[paths[0].split("/")[-2]] != "bg" else paths[0].split("/")[-3]
            if save_similarity_graphs:
                graph_path = (DEFAULT_GRAPH_PATH if save_path == "" else save_path) + key + "/" + g_l[
                    key] + "_test_"
            # draw_sim_hist_graph(
            #     # [np.array(test_alg_hist_2)[:, :5], np.array(test_alg_hist_2)[:, 5:]],
            #     [np.array(test_alg_hist_2)],
            #     "No. application in performance test" + " (" + key + ")", "Frequency",
            #     save_path=graph_path,
            #     # subtitles=["Length of set < 10\nNo. question = 5",
            #     #            "Length of set = 10\nNo. question = 3"],
            #     alpha=chi_sq_significance, ylim=40)
            test_alg_hist_aggr, test_alg_hist_3 = similarity_distribution(
                # [np.array(test_alg_hist_2)[:, :5], np.array(test_alg_hist_2)[:, 5:]],
                [np.array(test_alg_hist_2)],
                "No. application in performance test" + " (" + key + ")", "Mean",
                # subtitles=["Length of set < 10\nNo. question = 5",
                #            "Length of set = 10\nNo. question = 3"],
                save_path=graph_path, alpha=chi_sq_significance, ylim=0.5, distribution_graph=draw_similarity_graphs)
            print(">>> human sorting strategy distribution (Test): " + str(test_alg_hist_aggr))
            res["test_alg"] = test_alg_hist_3

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


def extract_train_response_score(input, negative_score_weight=0.5):
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

    s2 = [round(stats.spearmanr(sorted(i2[i]), a2[i])[0], 3) if len(l2[i]) == len(a2[i]) else 0.0 for i in
          range(min(len(i2), len(a2)))]
    s2 = list(map(lambda x: score_adjustments(x, negative_score_weight), s2))

    return [], s2


def extract_response_score(input, negative_score_weight=0.5):
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
    s1 = list(map(lambda x: score_adjustments(x, negative_score_weight), s1))

    s2 = [round(stats.spearmanr(sorted(i2[i]), a2[i])[0], 3) if len(l2[i]) == len(a2[i]) else 0.0 for i in
          range(min(len(i2), len(a2)))]
    s2 = list(map(lambda x: score_adjustments(x, negative_score_weight), s2))

    return s1, s2


def parseStringLine(line):
    return list(filter(None,
                       str(line).replace("\n", "").replace("\'", "").replace(" ", "").
                       replace("\"", "").replace("[", "").replace("]", "").split(",")))


def save_free_ans_csv(filepath, data):
    # header = ["Has CS degree", "Has learned sort alg", "Used sort alg", "Strategy for sorting short number sets",
    #           "Strategy for sorting long sets", "Strategy of using blue star (merge) for purple diamond (sort)",
    #           "Blue star strategy 1 vs. blue star strategy 2"]
    # rows = [[d[0][0], d[0][1], d[0][2], d[1][0].lower(), d[1][1].lower(), d[1][2].lower(), d[1][3].lower()] for d in
    #         data["free_res"]]
    header = ["Strategy for sorting short number sets",
              "Strategy for sorting long sets", "Strategy of using blue star (merge) for purple diamond (sort)",
              "Blue star strategy 1 vs. blue star strategy 2"]
    d = data["free_res"]
    rows = [[data["record_names"][dn].replace(".csv", ""), d[dn][1][0], d[dn][1][1], d[dn][1][2], d[dn][1][3]] for dn in
            range(len(d))]
    with open(filepath, "w", newline='') as file:
        writer = csv.writer(file)
        writer.writerow(header)
        writer.writerows(rows)


def containLabels(labels, ans):
    return not (False in [a in labels for a in ans])


# adjust spearman rank score to [0.0, 1.0] with weighting
def score_adjustments(score, weight):
    if score < 0:
        return abs(score) * weight
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


def extract_mouse_trace(input):
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
    trace = [[int(t[0]), float(t[1]), float(t[2])] for t in trace if t[0] != ""]
    dict = {1: [(-0.25, 0.3)], 2: [(-0.2, 0.3)], 3: [(-0.15, 0.3)], 4: [(-0.1, 0.3)], 5: [(-0.05, 0.3)],
            6: [(0.0, 0.3)], 7: [(0.05, 0.3)], 8: [(0.1, 0.3)], 9: [(0.15, 0.3)], 10: [(0.2, 0.3)]}
    for t in trace:
        dict[t[0]].append((t[1], t[2]))
    return dict


def reconstruct_trace(trace, path, name):
    colors = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22',
              '#17becf']
    for t in trace:
        if len(trace[t]) != 1:
            plt.plot(np.array(trace[t])[0, 0], np.array(trace[t])[0, 1], marker="*", color=colors[int(t) - 1])
        plt.plot(np.array(trace[t])[:, 0], np.array(trace[t])[:, 1], color=colors[int(t) - 1])
    plt.title(name)
    plt.axis('off')
    plt.savefig(path + "traces/" + name + ".png")
    plt.close()


def string2pairlist(str):
    labels = parseStringLine(str)
    return [[labels[2 * i], labels[2 * i + 1]] for i in range(len(labels) // 2)]


# print ANOVA and Tukey statistics and generate line graphs for one-way/two-way ANOVA
def ANOVA_with_graph(gs, title, xlabel, ylabel, save_path="", subtitles=[], anova_two_way=True,
                     tukey_two_way=True, colors=["orangered", "deepskyblue"], one_way_iv="CO"):
    linestyle = ["-", '--']
    makers = ["D", "^"]
    fig, ax = plt.subplots(ncols=len(gs))
    fig.tight_layout(pad=3.0)
    plt.yticks(fontsize=12)
    iv_name = title.split()[-1].replace("(", "").replace(")", "")

    for i in range(len(gs)):

        x = [0.2, 0.8]
        if len(gs) == 1:
            axis = ax
        else:
            axis = ax[i]
            if subtitles:
                axis.set_title(subtitles[i], y=0.95, pad=-14)

        axis.set_xticks(x)

        iv_1_f = [*["MS"] * len(gs[i][0]), *["MS"] * len(gs[i][1]),
                  *["SM"] * len(gs[i][2]), *["SM"] * len(gs[i][3])]
        iv_2_f = [*["WEX"] * len(gs[i][0]), *["WOEX"] * len(gs[i][1]),
                  *["WEX"] * len(gs[i][2]), *["WOEX"] * len(gs[i][3])]
        dv_f = [*gs[i][0], *gs[i][1], *gs[i][2], *gs[i][3]]
        df = pd.DataFrame({"CO": iv_1_f,
                           "EX": iv_2_f,
                           iv_name: dv_f})
        if anova_two_way:
            format = iv_name + ' ~ C(CO) + C(EX) + C(CO):C(EX)'
            if tukey_two_way:
                df["Combination"] = df["CO"] + " / " + df["EX"]
            else:
                df["Combination"] = df[one_way_iv]

            means = [np.nanmean(g) for g in gs[i]]
            print("mean - " + str(means))
            stderr = [np.nanstd(g) / np.sqrt(len(list(filter(lambda x: not np.isnan(x), g)))) for g in gs[i]]
            print("stderr - " + str(stderr))

            # fig = interaction_plot(
            #     df["CO"],
            #     df["EX"],
            #     dv_f,
            #     colors=colors,
            #     linestyles=linestyle,
            #     markers=makers,
            #     legendloc="lower right",
            #     ax=axis
            # )
            axis.errorbar(x, [means[0], means[2]], yerr=[stderr[0], stderr[2]], linestyle=linestyle[0],
                          color=colors[0])
            axis.errorbar(x, [means[1], means[3]], yerr=[stderr[1], stderr[3]], linestyle=linestyle[1],
                          color=colors[1])
            axis.set_ylabel("", fontsize=14)
            axis.legend(["WEX", "WOEX"], loc="best", title="EX", fontsize=14, title_fontsize=14)
            axis.text(x[0], means[0] - stderr[0] - 0.03, "Group 1 (MS/WEX)", ha='center', va='bottom', fontsize=12)
            axis.text(x[0], means[1] + stderr[1] + 0.03, "Group 2 (MS/WOEX)", ha='center', va='top', fontsize=12)
            axis.text(x[1], means[2] + stderr[2] + 0.03, "Group 3 (SM/WEX)", ha='center', va='top', fontsize=12)
            axis.text(x[1], means[3] - stderr[3] - 0.03, "Group 4 (SM/WOEX)", ha='center', va='bottom', fontsize=12)
            axis.set_xticklabels(["MS", "SM"], fontsize=14)
            axis.set_xlabel("CO", fontsize=16)

        else:
            format = iv_name + ' ~ C(' + one_way_iv + ')'
            df["Combination"] = df[one_way_iv]

            if one_way_iv == "CO":
                axis.set_xticklabels(["MS", "SM"], fontsize=14)
                axis.set_xlabel("CO", fontsize=16)
                means = [np.nanmean([*gs[i][0], *gs[i][1]]), np.nanmean([*gs[i][2], *gs[i][3]])]
                print("mean - " + str(means))
                stderr = [np.nanstd([*gs[i][0], *gs[i][1]]) / np.sqrt(
                    len(list(filter(lambda x: not np.isnan(x), [*gs[i][0], *gs[i][1]])))),
                          np.nanstd([*gs[i][2], *gs[i][3]]) / np.sqrt(
                              len(list(filter(lambda x: not np.isnan(x), [*gs[i][2], *gs[i][3]]))))]
                print("stderr - " + str(stderr))
            else:
                axis.set_xticklabels(["WEX", "WOEX"], fontsize=14)
                axis.set_xlabel(one_way_iv, fontsize=16)
                means = [np.nanmean([*gs[i][0], *gs[i][2]]), np.nanmean([*gs[i][1], *gs[i][3]])]
                print("mean - " + str(means))
                stderr = [np.nanstd([*gs[i][0], *gs[i][2]]) / np.sqrt(
                    len(list(filter(lambda x: not np.isnan(x), [*gs[i][0], *gs[i][2]])))),
                          np.nanstd([*gs[i][1], *gs[i][3]]) / np.sqrt(
                              len(list(filter(lambda x: not np.isnan(x), [*gs[i][1], *gs[i][3]]))))]
                print("stderr - " + str(stderr))
            axis.set_ylabel("", fontsize=14)
            axis.errorbar(x, means, color=colors[i], yerr=stderr, linestyle=linestyle[i], marker=makers[i])
            axis.text(x[0], means[0] + stderr[0] + 0.03, "Group 1 (MS/WEX) \nand\nGroup 3 (SM/WEX)", ha='center',
                      va='top', fontsize=12)
            axis.text(x[1], means[1] + stderr[1] + 0.03, "Group 2 (MS/WOEX) \nand\nGroup 4 (SM/WOEX)", ha='center',
                      va='top', fontsize=12)

        axis.set_xlim([-0.2, 1.2])
        axis.set_ylim([max(0.0, min(means) - 3 * max(stderr)), max(means) + 3 * max(stderr)])
        fig.suptitle("", y=0.95, fontsize=16)
        fig.set_size_inches(6.5, 6.5)

        model = ols(format, data=df).fit()
        ANOVA = sm.stats.anova_lm(model, typ=2)
        print(ANOVA)
        tukey = pairwise_tukeyhsd(endog=dv_f, groups=df["Combination"], alpha=0.05)
        print(tukey)

    if save_path == "":
        plt.savefig(DEFAULT_GRAPH_PATH)
    else:
        plt.savefig(save_path + "ANOVA_" + ylabel + "_" + title.replace(" ", "_") + "_" + "_".join(xlabel) + ".png")


# perform multiple pairwise t-tests and print statistics
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
        fig.suptitle(title, fontsize=16)

    if save_path == "":
        plt.savefig(DEFAULT_GRAPH_PATH)
    else:
        plt.savefig(save_path + "ttest_" + ylabel + "_" + title + "_" + "_".join(xlabel) + ".png")


# generate histogram following trace similarity analysis
def draw_sim_hist_graph(groups, title, ylabel, save_path="", ylim=16, subtitles=[], alpha=0.05):
    colors = ["paleturquoise", "darkslategrey", "paleturquoise", "darkslategrey", "darkslategrey", "darkslategrey",
              "paleturquoise"]
    fig, ax = plt.subplots(ncols=len(groups))
    fig.tight_layout(pad=3.0)
    for i in range(len(groups)):
        g_flat = groups[i].flatten()
        hist = sim_algo_hist(g_flat)

        if len(groups) == 1:
            axis = ax
        else:
            axis = ax[i]

        hist_v = {}
        keys = list(hist.keys())
        for j in range(len(list(hist.keys()))):
            hist_v[keys[j]] = (hist[keys[j]], colors[j])

        hist_v = dict(sorted(hist_v.items(), key=lambda item: -item[1][0]))

        values = [float(v) for v in np.array(list(hist_v.values()))[:, 0]]
        colors = [c for c in np.array(list(hist_v.values()))[:, 1]]

        axis.bar(range(len(list(hist.keys()))), values, color=colors)
        axis.set_xticks(np.arange(len(list(hist.keys()))))
        axis.set_xticklabels(hist_v.keys())
        axis.set_yticks(np.linspace(0, ylim, 9, True))
        axis.set_ylabel(ylabel)
        if subtitles:
            axis.set_title(subtitles[i], y=0.95, pad=-14)
        fig.suptitle(title, fontsize=16)

    if save_path == "":
        plt.show()
    else:
        plt.savefig(save_path + "alg_freq_" + str(alpha) + ".png")


# generate bar graphs following trace similarity analysis
def similarity_distribution(groups, title, ylabel, save_path="", subtitles=[], alpha=0.05, ylim=1.0,
                            distribution_graph=False):
    colors = ["salmon", "darkred", "salmon", "darkred", "darkred", "darkred", "salmon"]
    fig, ax = plt.subplots(ncols=len(groups))
    fig.tight_layout(pad=3.0)
    all_dist_aggr = []
    all_dist = []

    for i in range(len(groups)):
        hist_d = []
        hist_k = []
        tmp = {"BS": 0, "DS": 0, "IS": 0, "MS": 0, "QS": 0, "Hybrid": 0, "Other": 0}
        for j in range(len(groups[i])):
            hist = sim_algo_hist(groups[i][j])
            total_freq = sum(hist.values())
            hist_d.append(
                [v / total_freq for v in list(hist.values())])
            hist_k = list(hist.keys())
            for k in tmp.keys():
                tmp[k] += hist[k]
            all_dist.append(list(hist.values()))
        all_dist_aggr.append(tmp)

        means = np.mean(hist_d, axis=0)
        stderr = np.std(hist_d, axis=0) / np.sqrt(np.size(hist_d))

        hist_v = {}
        for j in range(len(hist_k)):
            hist_v[hist_k[j]] = (means[j], stderr[j], colors[j])
        hist_v = dict(sorted(hist_v.items(), key=lambda item: -item[1][0]))
        print(title + " mean: " + " & ".join(
            [str(round(hist_v[key][0], 3)) for key in ALG_CATAGORIES]))

        if distribution_graph:
            if len(groups) == 1:
                axis = ax
            else:
                axis = ax[i]

            values = [float(v) for v in np.array(list(hist_v.values()))[:, 0]]
            colors = [c for c in np.array(list(hist_v.values()))[:, 2]]
            stderr = [float(s) for s in np.array(list(hist_v.values()))[:, 1]]

            axis.bar(range(len(hist_k)), values, color=colors)
            axis.set_xticks(range(len(hist_k)))
            axis.set_xticklabels(hist_v.keys(), fontsize=15)
            axis.set_ylim([0.0, ylim])
            axis.set_ylabel("")
            for rect in axis.patches:
                height = rect.get_height()
                ypos = rect.get_y() + height + 0.03
                axis.text(rect.get_x() + rect.get_width() / 2., ypos,
                          str(round(height, 3)), ha='center', va='bottom')
            if subtitles:
                axis.set_title(subtitles[i], y=0.95, pad=-14)
            fig.suptitle("", fontsize=16)

    if distribution_graph:
        if save_path == "":
            plt.show()
        else:
            plt.savefig(save_path + "alg_mean_" + str(alpha) + ".png")

    return all_dist_aggr, all_dist


# extract human sorting trace from raw records and perform trace analysis
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

    algs = []
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

        for u in range(len(i)):
            candidates, _, _, _ = find_similar_algo(method, i[u], l[u], r[u],
                                                    label_order=[("alphabetical", alphabetical_labels)],
                                                    verbose=verbose, alpha=significance)
            algs.append(candidates)

    return train_algs, algs


def sort_statistical_tests(gs, ns, test="ANOVA", anova_two_way=True, tukey_two_way=True, record_names=[],
                           record_alias=[],
                           one_way_iv="CO"):
    print("\n>>> Sort Statistics")
    for i in range(len(record_names)):
        print(">>> " + record_names[i])
        if test == "ttest":
            t_test_with_graph(
                # [[np.array(g[record_names[i]])[:, :5].flatten() for g in gs],
                #  [np.array(g[record_names[i]])[:, 5:].flatten() for g in gs]],
                [[list_concat(g[record_names[i]]) for g in gs]],
                "Sort " + record_alias[i],
                ns, "Mean", subtitles=["Length of set < 10\nNo. question = 5", "Length of set = 10\nNo. question = 3"],
                save_path="../results/", ylim=1)
        else:
            ANOVA_with_graph(
                # [[np.array(g[record_names[i]])[:, :5].flatten() for g in gs],
                #  [np.array(g[record_names[i]])[:, 5:].flatten() for g in gs]],
                [[list_concat(g[record_names[i]]) for g in gs]],
                "Sort " + record_alias[i],
                ns, "Mean", save_path="../results/",
                subtitles=["Short sets\nNo. question = 5", "Long sets\nNo. question = 3"],
                anova_two_way=anova_two_way,
                tukey_two_way=tukey_two_way,
                one_way_iv=one_way_iv
            )


def merge_statistical_tests(gs, ns, test="ANOVA", anova_two_way=True, tukey_two_way=True, record_names=[],
                            record_alias=[], one_way_iv="CO"):
    print("\n>>> Merge Statistics")
    for i in range(len(record_names)):
        print(">>> " + record_names[i])
        if test == "ttest":
            t_test_with_graph([[np.array(g[record_names[i]]).flatten() for g in gs]],
                              "Merge " + record_alias[i],
                              ns, "Mean", save_path="../results/", ylim=1)
        else:
            ANOVA_with_graph(
                # [[np.array(g["merge_test_score"])[:, :3].flatten() for g in gs],
                #  [np.array(g["merge_test_score"])[:, 3:].flatten() for g in gs]],
                [[np.array(g[record_names[i]]).flatten() for g in gs]],
                "Merge " + record_alias[i],
                ns, "Mean",
                save_path="../results/",
                # subtitles=["Short sets\nNo. question = 3", "Long sets\nNo. question = 2"],
                anova_two_way=anova_two_way,
                tukey_two_way=tukey_two_way,
                colors=["limegreen", "gold"],
                one_way_iv=one_way_iv
            )


# filter based on extracted and parsed group pre-test data, u+/-std
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
                # filter based on population mean pre-test +/- std
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
        print(">>> groups mean: " + str(cross_groups_mean))
        print(">>> groups std: " + str(cross_groups_std))

    return gs, cross_groups_mean, cross_groups_std


def list_concat(ls):
    res = []
    for l in ls:
        res += list(l)
    return res


def parse_textual_response_corpus(gs):
    for i in range(len(gs)):
        group_corpus = {}
        for data in gs[i]["free_res"]:
            for ans in np.array(data[1])[:2]:
                words = ans.replace(".", "").replace("'", "").replace(",", "").split(" ")
                for w in words:
                    group_corpus[w] += 1

def mcnemar_par_alg_diff(train_alg_dist, test_alg_dist):
    # Perform McNemar's t-test on misalignment between algorithm application in training and test
    # Algorithms: ["BS", "DS", "IS", "MS", "QS", "Hybrid", "Other"]
    # table: [train alg, train others] x [test alg, test others]

    for i in range(len(train_alg_dist[0])):
        algs = ["BS", "DS", "IS", "MS", "QS", "Hybrid", "Other"]
        contingency_table = [[0, 0],
                             [0, 0]]
        for j in range(len(train_alg_dist)):
            t = train_alg_dist[j]
            if t[i] != 0:
                u = test_alg_dist[j]
                if u[i] != 0:
                    # print("%s %s - %s" % (t, u, "(train " + algs[i] + ", test " + algs[i] + ")"))
                    contingency_table[0][0] += 1
                else:
                    # print("%s %s - %s" % (t, u, "(train " + algs[i] + ")"))
                    contingency_table[1][0] += 1
            else:
                u = test_alg_dist[j]
                if u[i] != 0:
                    # print("%s %s - %s" % (t, u, "(test " + algs[i] + ")"))
                    contingency_table[0][1] += 1
                else:
                    # print("%s %s - %s" % (t, u, "()"))
                    contingency_table[1][1] += 1

        print("%s Contingency table: %s" % (algs[i], str(contingency_table)))
        test = statsmodels.stats.contingency_tables.mcnemar(contingency_table, correction=False)
        print(test)