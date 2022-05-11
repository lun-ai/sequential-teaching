import numpy as np
from scipy import stats

from sort_algorithms import *


# vectorise both machine trace and human trace in which each vector elem n
# is the highest rank (from 1 to m where m > 1) of <l1, l2> or <l2, l1> in the trace
def vectorise_trace_seq(machine_trace, human_trace, labels):
    vm = {}
    vh = {}
    for l1 in labels:
        for l2 in labels:
            # a new comparison pair
            if l1 != l2 and not (str(l1 + ',' + l2) in vm or str(l1 + ',' + l2) in vh) and not (
                    str(l2 + ',' + l1) in vm or str(l2 + ',' + l1) in vh):
                vm[l1 + ',' + l2] = 0
                vh[l1 + ',' + l2] = 0
                if [l1, l2] in machine_trace or [l2, l1] in machine_trace:
                    if [l1, l2] in machine_trace:
                        vm[l1 + ',' + l2] = machine_trace.index([l1, l2]) + 1
                    elif [l2, l1] in machine_trace:
                        vm[l1 + ',' + l2] = machine_trace.index([l2, l1]) + 1
                if [l1, l2] in human_trace or [l2, l1] in human_trace:
                    if [l1, l2] in human_trace:
                        vh[l1 + ',' + l2] = human_trace.index([l1, l2]) + 1
                    elif [l2, l1] in human_trace:
                        vh[l1 + ',' + l2] = human_trace.index([l2, l1]) + 1
    return vm, vh


# vectorise both machine trace and human trace in which each vector elem n is
# the No. of occurrence of a comparison pair <l1, l2> or <l2, l1> in the trace
# each n (occurrence) does not have to be 1
def vectorise_trace(machine_trace, human_trace, labels):
    vm = {}
    vh = {}
    for l1 in labels:
        for l2 in labels:
            # a new comparison pair
            if not (str(l1 + ',' + l2) in vm or str(l1 + ',' + l2) in vh) and not (
                    str(l2 + ',' + l1) in vm or str(l2 + ',' + l1) in vh):
                vm[l1 + ',' + l2] = 0
                vh[l1 + ',' + l2] = 0
                # mark occurrence of label pairs
                if [l1, l2] in machine_trace or [l2, l1] in machine_trace:
                    vm[l1 + ',' + l2] = 1
                if [l1, l2] in human_trace or [l2, l1] in human_trace:
                    vh[l1 + ',' + l2] = 1
    for v in list(vm.values()):
        if v > 1:
            raise ValueError("Occurrence of a set should not be greater than 1!")
    return vm, vh


def get_machine_trace(algorithm, input, labels, verbose=False):
    if verbose:
        print("\nRunning %s" % algorithm.__name__)
    output = algorithm(input)
    check_sort_output(output[0], output[1], output[2])
    trace = []
    for comp in output[1]:
        trace.append([labels[input.index(comp[0])], labels[input.index(comp[1])]])
    if verbose:
        print("%s exited" % algorithm.__name__)
    return trace


def get_machine_trace_hybrid(algorithm, input, labels, aux, verbose=False):
    if verbose:
        print("\nRunning %s" % algorithm.__name__)
    output = algorithm(input, aux)
    check_sort_output(output[0], output[1], output[2])
    trace = []
    for comp in output[1]:
        trace.append([labels[input.index(comp[0])], labels[input.index(comp[1])]])
    if verbose:
        print("%s exited" % algorithm.__name__)
    return trace


def comp_euc_sim(machine_trace, human_trace, labels, verbose=True):
    vm, vh = vectorise_trace_seq(machine_trace, human_trace, labels)
    if verbose:
        print("Enumerative comparisons: " + str(vm.keys()))
        print("machine trace rank: " + str(vm.values()))
        print("human trace rank: " + str(vh.values()))
        print(np.square(np.array(list(vm.values())) - np.array(list(vh.values()))))
    return 1 / np.log(np.sqrt(np.sum(np.square(np.array(list(vm.values())) - np.array(list(vh.values()))))))


def comp_spearman_sim(machine_trace, human_trace, labels, verbose=True):
    vm, vh = vectorise_trace_seq(machine_trace, human_trace, labels)
    if verbose:
        print("Enumerative comparisons: " + str(vm.keys()))
        print("machine trace rank: " + str(vm.values()))
        print("human trace rank: " + str(vh.values()))
    return stats.spearmanr(list(vm.values()), list(vh.values()))[0]


def comp_long_subseq_sim(machine_trace, human_trace, labels, conse=False, verbose=True):
    if not conse:
        lcs = longest_common_subseq(machine_trace, human_trace, len(machine_trace), len(human_trace))
    else:  # if only counts consecutive lcs's
        lcs = longest_common_subseq_conse(machine_trace, human_trace, len(machine_trace), len(human_trace))
    if verbose:
        print("machine trace: %s" % (machine_trace))
        print("human trace: %s" % (human_trace))
        print("longest common subsequence: %s" % lcs[1][1:])
    return lcs[0]


def longest_common_subseq(t1, t2, m, n):
    stack = [[Nz] * (n + 1) for i in range(m + 1)]
    for i in range(m + 1):
        for j in range(n + 1):
            if i == 0 or j == 0:
                stack[i][j] = (0, "")
            elif (t1[i - 1][0] == t2[j - 1][0] and t1[i - 1][1] == t2[j - 1][1]) or (
                    t1[i - 1][0] == t2[j - 1][1] and t1[i - 1][1] == t2[j - 1][0]):
                stack[i][j] = (stack[i - 1][j - 1][0] + 1, stack[i - 1][j - 1][1] + ",(" + str(t1[i - 1]) + ")")
            else:
                stack[i][j] = stack[i - 1][j] if stack[i - 1][j][0] > stack[i][j - 1][0] else stack[i][j - 1]
    return stack[m][n]


def longest_common_subseq_conse(t1, t2, m, n):
    stack = [[None] * (n + 1) for i in range(m + 1)]
    curr_max = (0, "")
    for i in range(m + 1):
        for j in range(n + 1):
            if i == 0 or j == 0:
                stack[i][j] = (0, "")
            elif (t1[i - 1][0] == t2[j - 1][0] and t1[i - 1][1] == t2[j - 1][1]) or (
                    t1[i - 1][0] == t2[j - 1][1] and t1[i - 1][1] == t2[j - 1][0]):
                stack[i][j] = (stack[i - 1][j - 1][0] + 1, stack[i - 1][j - 1][1] + ",(" + str(t1[i - 1]) + ")")
                curr_max = stack[i][j] if stack[i][j][0] > curr_max[0] else curr_max
            else:
                stack[i][j] = (0, "")
    return curr_max


def comp_contingency_similar_2x2(machine_trace, human_trace, labels, alpha=0.05, verbose=True):
    # trace is set of number pairs in NxN
    vm, vh = vectorise_trace(machine_trace, human_trace, labels)
    vms, vhs = vectorise_trace_seq(machine_trace, human_trace, labels)

    contingency_table = [[0, 0], [0, 0]]

    # perform chi^2 test
    for k in list(vm.keys()) and list(vh.keys()):
        # count 1's in both vectors
        if vm[k] == 0 and vh[k] == 0:
            contingency_table[0][0] += 1
        elif vm[k] == 0 and vh[k] == 1:
            contingency_table[0][1] += 1
        elif vm[k] == 1 and vh[k] == 0:
            contingency_table[1][0] += 1
        else:
            contingency_table[1][1] += 1

    if contingency_table[0][0] == 0 or contingency_table[0][1] == 0 or contingency_table[1][0] == 0 or \
            contingency_table[1][1] == 0:
        contingency_table[0][0] += 1
        contingency_table[0][1] += 1
        contingency_table[1][0] += 1
        contingency_table[1][1] += 1

    t, p, _, expected = stats.chi2_contingency(contingency_table)
    # t, p = stats.fisher_exact(contingency_table)

    if verbose:
        print("\n" + str(machine_trace))
        print(human_trace)
        print("machine trace size\: %s" % (len(machine_trace)))
        print("machine trace dict: %s" % (vm))
        print("human trace dict: %s" % (vh))
        print("machine trace vector: %s" % (vm.values()))
        print("human trace vector : %s" % (vh.values()))
        print("contingency_table: %s" % (contingency_table))
        print("chi square test alpha %s: %s, p-value: %s" % (alpha, t, p))

    # if machine trace and human trace are correlated, which means reject null hypothesis
    if p < alpha:
        rm = []
        rh = []
        for k in list(vms.keys()) and list(vhs.keys()):
            # obtain common comparisons
            if vms[k] != 0 and vhs[k] != 0:
                rm.append(vms[k])
                rh.append(vhs[k])
        # perform spearman rank analysis off the intersection
        res = stats.spearmanr(rm, rh)

        if verbose:
            print("machine trace rank dict: %s" % (rm))
            print("human trace rank dict: %s" % (rh))
            print("spearman rank coeff score: %s, p-value: %s\n" % (res[0], res[1]))

        if res[0] >= 0 and res[1] < 0.025:
            if verbose:
                print("spearman rank coeff positive, return result")
            return True, res

    return False, [t, p]


def get_similarity(method, algorithm, input, labels, ht, verbose=True, alpha=0.05):
    mt = get_machine_trace(algorithm, input, labels, verbose=verbose)

    if verbose:
        s_mt = str(mt)
        s_ht = str(ht)
        for l in labels:
            s_mt = s_mt.replace(l, str(input[labels.index(l)]))
            s_ht = s_ht.replace(l, str(input[labels.index(l)]))
        print(s_mt.replace('\'', ''))
        print(s_ht.replace('\'', ''))

    r = get_similarity_aux(ht, mt, labels, method, verbose=verbose, alpha=alpha)
    return r


def get_similarity_aux(ht, mt, labels, method, verbose=False, alpha=0.05):
    if method == "euc":
        return comp_euc_sim(mt, ht, labels, verbose=verbose), len(mt)
    elif method == "spm":
        return comp_spearman_sim(mt, ht, labels, verbose=verbose), len(mt)
    elif method == "lcs":
        return comp_long_subseq_sim(mt, ht, labels, verbose=verbose), len(mt)
    elif method == "weighted_lcs":
        return comp_long_subseq_sim(mt, ht, labels, verbose=verbose) / len(mt), len(mt)
    elif method == "lcs_conse":
        return comp_long_subseq_sim(mt, ht, labels, verbose=verbose, conse=True), len(mt)
    elif method == "weighted_lcs_conse":
        return comp_long_subseq_sim(mt, ht, labels, verbose=verbose, conse=True) / len(mt), len(mt)
    elif method == "chi_sq_2x2":
        return comp_contingency_similar_2x2(mt, ht, labels, verbose=verbose, alpha=alpha), len(mt)

    else:
        print("Method not implemented")
        return None


def sim_algo_hist(candidates_lists):
    categories = {"BS": 0, "DS": 0, "IS": 0, "MS": 0, "QS": 0, "Hybrid": 0, "Other": 0}

    for c in candidates_lists:
        if c != []:
            if len(list(filter(lambda x: x[0] in ["botup_msort_left_front", "botup_msort_right_front",
                                                  "botup_msort_left_back",
                                                  "botup_msort_right_back", "msort_left_front", "msort_left_back",
                                                  "msort_left_back",
                                                  "msort_right_back"], c))) == len(c):
                categories["MS"] += 1
            elif len(list(filter(lambda x: x[0] in ["isort_front", "isort_back"], c))) == len(c):
                categories["IS"] += 1
            elif len(list(filter(lambda x: x[0] in ["qsort_first", "qsort_mid", "qsort_last"], c))) == len(c):
                categories["QS"] += 1
            elif len(list(filter(lambda x: x[0] in ["bubsort_front", "bubsort_back"], c))) == len(c):
                categories["BS"] += 1
            elif len(list(filter(lambda x: x[0] in ["dict_sort_front", "dict_sort_mid", "dict_sort_back"], c))) == len(
                    c):
                categories["DS"] += 1
            elif len(list(filter(
                    lambda x: '_'.join(x[0].split('_')[:-1]) in ["is_front_hybrid_ds_front", "is_front_hybrid_ds_mid",
                                                                 "is_front_hybrid_ds_back", "is_back_hybrid_ds_front",
                                                                 "is_back_hybrid_ds_mid", "is_back_hybrid_ds_back"],
                    c))) == len(c):
                categories["Hybrid"] += 1
            else:
                categories["Other"] += 1
        else:
            categories["Other"] += 1
    return categories


def alphabetical_labels(input, labels):
    sorted_labels = sorted(labels)
    res = []

    for l in sorted_labels:
        i = labels.index(l)
        res.append(input[i])

    return res, sorted_labels


def find_similar_algo(method, input, labels, ht, label_order=[], verbose=False, alpha=0.05):
    s = []
    c = []
    t = []
    alg_names = []
    label_order = label_order + [("left to right", lambda x, y: (x, y))]

    for alg in ALL_ALGORITHMS:
        alg_names.append(alg.__name__)
        for func in label_order:
            input_f, labels_f = func[1](input, labels)
            u = get_similarity(method, alg, input_f, labels_f, ht, verbose=verbose, alpha=alpha)
            s.append(u[0])
            c.append(u[1])
            t.append(func[0])

    for alg in HYBRID_ALGORITHMS:
        for k in range(1, len(input)):
            alg_names.append(alg.__name__ + "_" + str(k))
            for func in label_order:
                input_f, labels_f = func[1](input, labels)
                mt = get_machine_trace_hybrid(alg, input_f, labels_f, k, verbose=verbose)
                u = get_similarity_aux(ht, mt, labels_f, method, verbose=verbose, alpha=alpha)
                s.append(u[0])
                c.append(u[1])
                t.append(func[0])

    tied_score_alg = []
    score = -np.inf

    if method == "chi_sq" or method == "chi_sq_2x2":
        spearman_s = [res[1][1] for res in s if res[0] and res[1][0] > 0]

        if len(spearman_s) > 0:
            # found similar machine algorithms
            score = min(spearman_s)
            method = 'set_intersect_spearman'
            for i in range(len(s)):
                if s[i][0] and s[i][1][1] == score:
                    tied_score_alg.append((alg_names[i // len(label_order)], c[i], t[i]))
        else:
            # no similar machine algorithm is found
            if verbose:
                print(">>> No similar method is found!")
                return [], score, method, len(ht)
    else:
        score = max(s)
        # max_cost = max(c)
        for i in range(len(s)):
            if s[i] == score:
                if len(tied_score_alg) > 0:
                    tied_score_alg.append((alg_names[i].__name__, c[i], t[i]))
                else:
                    tied_score_alg.append((alg_names[i].__name__, c[i], t[i]))

    if verbose:
        if len(tied_score_alg) > 1:
            print(">>> There is a Tie between %s with score %s for %s when length(human_trace) = %s\n" % (
                tied_score_alg, score, method, len(ht)))
        else:
            print(">>> Most matching algorithm is %s with %s value %s when length(human_trace) = %s\n" % (
                tied_score_alg, method, score, len(ht)))
    return tied_score_alg, score, method, len(ht)


# trace analysis examples - find the closest match with the lowest spearman rank coefficient value / chi-sq test value
# against real human trace
# find_similar_algo("chi_sq_2x2", [2, 9, 8, 10, 4, 5, 6, 7, 3, 1], ['E', 'I', 'H', 'F', 'B', 'G', 'C', 'J', 'D', 'A'],
#                   [['A', 'B'], ['A', 'C'], ['B', 'C'], ['D', 'C'], ['D', 'A'], ['D', 'E'], ['A', 'E'], ['F', 'E'],
#                    ['F', 'C'], ['F', 'B'], ['G', 'B'], ['G', 'F'], ['G', 'H'], ['F', 'H'], ['J', 'H'], ['J', 'C'],
#                    ['J', 'B'], ['J', 'G'], ['J', 'H'], ['J', 'I'], ['H', 'I'], ['F', 'I']],
#                   label_order=[("alphabetical", alphabetical_labels)], verbose=True)

# against machine trace (qsort_mid)
# find_similar_algo("chi_sq_2x2", [2, 9, 8, 10, 4, 5, 6, 7, 3, 1], ['E', 'I', 'H', 'F', 'B', 'G', 'C', 'J', 'D', 'A'],
#                   [['E', 'G'], ['G', 'I'], ['G', 'H'], ['G', 'F'], ['B', 'G'], ['G', 'C'], ['G', 'J'], ['D', 'G'],
#                    ['A', 'G'], ['E', 'D'], ['D', 'B'], ['A', 'D'], ['A', 'E'], ['I', 'F'], ['H', 'F'], ['C', 'F'],
#                    ['J', 'F'], ['C', 'I'], ['C', 'H'], ['C', 'J'], ['H', 'I'], ['J', 'H']], verbose=True)

# against machine trace (dict_sort_front)
# find_similar_algo("chi_sq_2x2", [2, 9, 8, 10, 4, 5, 6, 7, 3, 1], ['E', 'I', 'H', 'F', 'B', 'G', 'C', 'J', 'D', 'A'],
#                   [['B', 'A'], ['C', 'B'], ['D', 'A'], ['D', 'C'], ['D', 'B'], ['E', 'A'], ['E', 'C'], ['E', 'D'],
#                    ['F', 'C'], ['G', 'A'], ['G', 'F'], ['G', 'D'], ['G', 'B'], ['G', 'C'], ['H', 'A'], ['H', 'F'],
#                    ['H', 'B'], ['H', 'G'], ['H', 'C'], ['I', 'A'], ['I', 'F'], ['I', 'B'], ['I', 'C'], ['I', 'H'],
#                    ['J', 'A'], ['J', 'F'], ['J', 'G'], ['J', 'H'], ['J', 'C']],
#                   label_order=[("alphabetical", alphabetical_labels)], verbose=True)

# against machine trace (botup_msort_left_front)
# find_similar_algo("chi_sq_2x2", [4, 6, 5, 2, 3, 1], ['E', 'B', 'G', 'C', 'D', 'A'],
#                   [['E', 'B'], ['G', 'C'], ['C', 'E'], ['E', 'G'], ['G', 'B'], ['D', 'A'], ['A', 'C'], ['C', 'D'],
#                    ['D', 'E']],
#                   label_order=[("alphabetical", alphabetical_labels)], verbose=True)
