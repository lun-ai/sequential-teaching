import numpy
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
            if l1 != l2 and not (str(l1 + ',' + l2) in vm or str(l1 + ',' + l2) in vh) and not (
                    str(l2 + ',' + l1) in vm or str(l2 + ',' + l1) in vh):
                vm[l1 + ',' + l2] = 0
                vh[l1 + ',' + l2] = 0
                # counting occurrence of pairs
                if [l1, l2] in machine_trace or [l2, l1] in machine_trace:
                        vm[l1 + ',' + l2] = vm[l1 + ',' + l2] + 1
                if [l1, l2] in human_trace or [l2, l1] in human_trace:
                        vh[l1 + ',' + l2] = vh[l1 + ',' + l2] + 1
    return vm, vh


def get_machine_trace(algorithm, input, labels):
    output = algorithm(input)
    trace = []
    for comp in output[1]:
        trace.append([labels[input.index(comp[0])], labels[input.index(comp[1])]])
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
    else: # if only counts consecutive lcs's
        lcs = longest_common_subseq_conse(machine_trace, human_trace, len(machine_trace), len(human_trace))
    if verbose:
        print("machine trace: %s" % (machine_trace))
        print("human trace: %s" % (human_trace))
        print("longest common subsequence: %s" % lcs[1][1:])
    return lcs[0]


def longest_common_subseq(t1, t2, m, n):
    stack = [[None] * (n + 1) for i in range(m + 1)]
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


# perform chi square test first
# Null hypothesis: the two variables (human/machine, comparison) are independent (change of one variable does not change the other)
# Alternative hypothesis: the two variables are not independent (change of one variable may result in the other changing)
def comp_categorical_independence(machine_trace, human_trace, labels, verbose=True):

    # trace is a pool of samples of comparison drawn each being one of the NxN type
    vm, vh = vectorise_trace(machine_trace, human_trace, labels)
    vms, vhs = vectorise_trace_seq(machine_trace, human_trace, labels)

    # perform chi^2 test
    for k in list(vm.keys()) and list(vh.keys()):
        # strip 0 values in both vectors
        if vm[k] == 0 and vh[k] == 0:
            del vm[k]
            del vh[k]
    t, p, _, expected = stats.chi2_contingency([list(vm.values()), list(vh.values())])

    if verbose:
        print("machine trace vector: %s" % (vm.values()))
        print("human trace vector : %s" % (vh.values()))
        print("chi^2 test: %s, p-value: %s\n" % (t, p))

    # if machine trace and human trace are similar, which means accept null hypothesis
    if p > 0.05:
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
            print("spearman rank coeff score: %s, p-value: %s" % (res[0], res[1]))

        return True, res[0]

    return False, [t, p]


def get_similarity(method, algorithm, input, labels, ht, verbose=True):
    if verbose:
        print("Running %s" % algorithm.__name__)
    mt = get_machine_trace(algorithm, input, labels)
    if verbose:
        print("%s exited" % algorithm.__name__)
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
    elif method == "chi_sq":
        return comp_categorical_independence(mt, ht, labels, verbose=verbose), len(mt)

    else:
        print("Method not implemented")
        return None


def find_similar_algo(method, input, labels, ht, verbose=True):
    s = []
    c = []
    for alg in ALL_ALGORITHMS:
        u = get_similarity(method, alg, input, labels, ht, verbose)
        s.append(u[0])
        c.append(u[1])

    tied_score_alg = []
    score = -np.inf
    # tied_cost_alg = []

    if method == "chi_sq":
        spearman_s = [res[1] for res in s if res[0]]

        if len(spearman_s) > 0:
            score = max(spearman_s)
            has_similar = True
            method = 'set_intersect_spearman'
        else:
            score = min([res[1][1] for res in s if not res[0]])
            has_similar = False

        for i in range(len(s)):
            if s[i][0] == has_similar and s[i][1] == score:
                tied_score_alg.append((ALL_ALGORITHMS[i].__name__, c[i]))
    else:
        score = max(s)
        # max_cost = max(c)
        for i in range(len(s)):
            if s[i] == score:
                if len(tied_score_alg) > 0:
                    tied_score_alg.append((ALL_ALGORITHMS[i].__name__, c[i]))
                else:
                    tied_score_alg.append((ALL_ALGORITHMS[i].__name__, c[i]))
        # for i in range(len(c)):
        #     if c[i] == max_cost:
        #         if len(tied_cost_alg) > 0:
        #             tied_cost_alg.append(ALL_ALGORITHMS[i].__name__)
        #         else:
        #             tied_cost_alg.append(ALL_ALGORITHMS[i].__name__)


    if len(tied_score_alg) > 1:
        print(">>> There is a Tie between %s with score %s for %s when length(human_trace) = %s" % (
                tied_score_alg, score, method, len(ht)))
    else:
        print(">>> Most matching algorithm is %s with %s value %s when length(human_trace) = %s" % (
                tied_score_alg, method, score, len(ht)))

# find_similar_algo("chi_sq", [6, 3, 5, 4, 2, 1], ['E', 'B', 'C', 'A', 'F', 'D'],
#                   [['E', 'C'], ['A', 'C'], ['F', 'C'], ['F', 'A'], ['B', 'C'], ['B', 'F'], ['B', 'A'], ['D', 'A'],
#                    ['D', 'B'], ['D', 'F']])
# print(comp_categorical_independence([['F', 'A'], ['G', 'A'], ['A', 'E'], ['A', 'D'], ['E', 'F'], ['C', 'A'], ['A', 'D']],
#                                     [['E', 'C'], ['A', 'C'], ['F', 'C'], ['F', 'A'], ['B', 'C'], ['B', 'F'], ['B', 'A'], ['D', 'A']],
#                                     ['A', 'B', 'C', 'D', 'E', 'F', 'G']))
find_similar_algo("chi_sq", [2, 9, 8, 10, 4, 5, 6, 7, 3, 1], ['E', 'I', 'H', 'F', 'B', 'G', 'C', 'J', 'D', 'A'],
                  [['A','B'],['A','C'],['B','C'],['D','C'],['D','A'],['D','E'],['A','E'],['F','E'],['F','C'],['F','B'],['G','B'],['G','F'],['G','H'],['F','H'],['J','H'],['J','C'],['J','B'],['J','G'],['J','H'],['J','I'],['H','I'],['F','I']])
