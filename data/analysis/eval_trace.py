import numpy
import numpy as np
from scipy import stats
from sort_algorithms import *


def vectorise_trace(machine_trace, human_trace, labels):
    vm = {}
    vh = {}
    for l1 in labels:
        for l2 in labels:
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


def get_machine_trace(algorithm, input, labels):
    output = algorithm(input)
    trace = []
    for comp in output[1]:
        trace.append([labels[input.index(comp[0])], labels[input.index(comp[1])]])
    return trace


def comp_euc_sim(machine_trace, human_trace, labels, verbose=True):
    vm, vh = vectorise_trace(machine_trace, human_trace, labels)
    if verbose:
        print("Enumerative comparisons: " + str(vm.keys()))
        print("machine trace rank: " + str(vm.values()))
        print("human trace rank: " + str(vh.values()))
        print(np.square(np.array(list(vm.values())) - np.array(list(vh.values()))))
    return 1 / np.log(np.sqrt(np.sum(np.square(np.array(list(vm.values())) - np.array(list(vh.values()))))))


def comp_spearman_sim(machine_trace, human_trace, labels, verbose=True):
    vm, vh = vectorise_trace(machine_trace, human_trace, labels)
    if verbose:
        print("Enumerative comparisons: " + str(vm.keys()))
        print("machine trace rank: " + str(vm.values()))
        print("human trace rank: " + str(vh.values()))
    return stats.spearmanr(list(vm.values()), list(vh.values()))[0]


def comp_long_subseq_sim(machine_trace, human_trace, labels, conse=False, verbose=True):
    if not conse:
        lcs = longest_common_subseq(machine_trace, human_trace, len(machine_trace), len(human_trace))
    else:
        lcs = longest_common_subseq_conse(machine_trace, human_trace, len(machine_trace), len(human_trace))
    if verbose:
        print("machine trace: %s" % (machine_trace))
        print("machine trace: %s" % (human_trace))
        print("longest common subsequence: %s" % lcs[1][1:])
    return lcs[0]


def longest_common_subseq(x, y, m, n):
    stack = [[None] * (n + 1) for i in range(m + 1)]
    for i in range(m + 1):
        for j in range(n + 1):
            if i == 0 or j == 0:
                stack[i][j] = (0, "")
            elif (x[i - 1][0] == y[j - 1][0] and x[i - 1][1] == y[j - 1][1]) or (
                    x[i - 1][0] == y[j - 1][1] and x[i - 1][1] == y[j - 1][0]):
                stack[i][j] = (stack[i - 1][j - 1][0] + 1, stack[i - 1][j - 1][1] + ",(" + str(x[i - 1]) + ")")
            else:
                stack[i][j] = stack[i - 1][j] if stack[i - 1][j][0] > stack[i][j - 1][0] else stack[i][j - 1]
    return stack[m][n]


def longest_common_subseq_conse(x, y, m, n):
    stack = [[None] * (n + 1) for i in range(m + 1)]
    curr_max = (0, "")
    for i in range(m + 1):
        for j in range(n + 1):
            if i == 0 or j == 0:
                stack[i][j] = (0, "")
            elif (x[i - 1][0] == y[j - 1][0] and x[i - 1][1] == y[j - 1][1]) or (
                    x[i - 1][0] == y[j - 1][1] and x[i - 1][1] == y[j - 1][0]):
                stack[i][j] = (stack[i - 1][j - 1][0] + 1, stack[i - 1][j - 1][1] + ",(" + str(x[i - 1]) + ")")
                curr_max = stack[i][j] if stack[i][j][0] > curr_max[0] else curr_max
            else:
                stack[i][j] = (0, "")
    return curr_max


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
    elif method == "weighted-lcs":
        return comp_long_subseq_sim(mt, ht, labels, verbose=verbose) / len(mt), len(mt)
    elif method == "lcs-conse":
        return comp_long_subseq_sim(mt, ht, labels, verbose=verbose, conse=True), len(mt)
    elif method == "weighted-lcs-conse":
        return comp_long_subseq_sim(mt, ht, labels, verbose=verbose, conse=True) / len(mt), len(mt)
    else:
        print("Method not implemented")
        return None


def find_similar_algo(method, input, labels, ht, verbose=True):
    scores = []
    costs = []
    for alg in ALL_ALGORITHMS:
        u = get_similarity(method, alg, input, labels, ht, verbose)
        scores.append(u[0])
        costs.append(u[1])
    max_score = max(scores)
    max_cost = max(costs)
    tied_score_alg = []
    tied_cost_alg = []
    for i in range(len(scores)):
        if scores[i] == max_score:
            if len(tied_score_alg) > 0:
                tied_score_alg.append((ALL_ALGORITHMS[i].__name__, costs[i]))
            else:
                tied_score_alg.append((ALL_ALGORITHMS[i].__name__, costs[i]))
    for i in range(len(costs)):
        if costs[i] == max_cost:
            if len(tied_cost_alg) > 0:
                tied_cost_alg.append(ALL_ALGORITHMS[i].__name__)
            else:
                tied_cost_alg.append(ALL_ALGORITHMS[i].__name__)

    if len(tied_score_alg) > 1:
        print(">>> There is a Tie between %s with score %s for %s when length(human_trace) = %s" % (
        tied_score_alg, max_score, method, len(ht)))
    else:
        print(">>> Most matching algorithm is %s with %s value %s when length(human_trace) = %s" % (
        tied_score_alg, method, max_score, len(ht)))


# print(get_similarity("euc",botupsort,[6, 3, 5, 4, 2, 1],['E', 'B', 'C', 'A', 'F', 'D'],[['E','C'],['A','C'],['F','C'],['F','A'],['B','C'],['B','F'],['B','A'],['D','A'],['D','B'],['D','F']]))
# print(get_similarity("spm",botupsort,[6, 3, 5, 4, 2, 1],['E', 'B', 'C', 'A', 'F', 'D'],[['E','C'],['A','C'],['F','C'],['F','A'],['B','C'],['B','F'],['B','A'],['D','A'],['D','B'],['D','F']]))
# print(get_similarity("lcs", botupsort_left_front, [6, 3, 5, 4, 2, 1], ['E', 'B', 'C', 'A', 'F', 'D'], [['E', 'C'], ['A', 'C'], ['F', 'C'], ['F', 'A'], ['B', 'C'], ['B', 'F'], ['B', 'A'], ['D', 'A'], ['D', 'B'], ['D', 'F']]))
# find_similar_algo("lcs", [6, 3, 5, 4, 2, 1], ['E', 'B', 'C', 'A', 'F', 'D'],
#                   [['E', 'C'], ['A', 'C'], ['F', 'C'], ['F', 'A'], ['B', 'C'], ['B', 'F'], ['B', 'A'], ['D', 'A'],
#                    ['D', 'B'], ['D', 'F']])
# print(longest_common_subseq_conse(
#     [['F', 'A'], ['G', 'A'], ['A', 'E'], ['A', 'D'], ['E', 'F'], ['C', 'A'], ['A', 'D']],
#     [['F', 'D'], ['A', 'G'], ['A', 'E'], ['F', 'E'], ['A', 'C'], ['A', 'D']],
#     7,
#     6))
