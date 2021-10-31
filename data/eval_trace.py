import numpy
import numpy as np
from scipy import stats

def bumsort(x):
    '''
    Applies bottom-up merge sort and returns the sorted list, as well as the number of comparisons
    made.

    PARAMETERS
    ----------
    x : list

    RETURNS
    -------
    list : [sorted list, comps, compsN]
    '''
    comps = []
    compsN = 0
    working_list = []
    # Turning the unsorted list into a list containing lists of the length one. That way, only one
    # iterative sorting algorithm suffices.
    for i in range(len(x)):
        a = []
        a.append(x[i])
        working_list.append(a)
    while len(working_list) > 1:
        # When the list is fully sorted, working_list only contains one (fully sorted) list.
        old = working_list
        working_list = []
        for i in range(len(old) // 2):
            y = old[2 * i]
            z = old[2 * i + 1]
            # Collecting the lists next to each other. Apart from this, the algorithm works (almost)
            # exactly the same as in the previous merge sort function.
            new = []
            while len(y) > 0 or len(z) > 0:
                if len(y) > 0 and len(z) > 0:
                    if y[0] > z[0]:
                        new.append(z[0])
                        comps.append([y[0],z[0]])
                        z.pop(0)
                        compsN += 1
                    else:
                        new.append(y[0])
                        comps.append([z[0],y[0]])
                        y.pop(0)
                        compsN += 1
                elif len(z) > 0:
                    for j in z:
                        new.append(j)
                    z = []
                else:
                    for j in y:
                        new.append(j)
                    y = []
            working_list.append(new)
        if len(old) % 2 == 1:
            working_list.append(old[-1])
    working_list.append(comps)
    working_list.append(compsN)
    return working_list

def qsort_mid(x):
    comps = []
    compsN = 0

    if len(x) == 1:
        return x, [], 0
    mid_idx = len(x) // 2
    left = []
    right = []
    for i in range(0, len(x)):
        if i == mid_idx:
            continue
        elif x[i] < x[mid_idx]:
            left.append(x[i])
            comps.append([x[i],x[mid_idx]])
            compsN += 1
        else:
            right.append(x[i])
            comps.append([x[mid_idx],x[i]])
            compsN += 1

    l1,c1,n1 = qsort_mid(left)
    l2,c2,n2 = qsort_mid(right)

    return l1 + [x[mid_idx]] + l2, comps + c1 + c2, compsN + n1 + n2


def msort(x):
    '''
    Applies merge sort and returns the sorted list, as well as the number of comparisons made.

    PARAMETERS
    ----------
    x : list

    RETURNS
    -------
    result : sorted list
    comps : int, number of comparisons
    '''
    result = []
    comps = []
    compsN = 0
    if len(x) < 2:
        return [x, compsN]
    mid = int(len(x)/2)
    ysort = msort(x[:mid])
    zsort = msort(x[mid:])
    y = ysort[0]
    z = zsort[0]
    compsN = compsN + ysort[1] + zsort[1]
    while (len(y) > 0) or (len(z) > 0):
        if len(y) > 0 and len(z) > 0:
            if y[0] > z[0]:
                result.append(z[0])
                comps.append([y[0],z[0]])
                z.pop(0)
                compsN = compsN + 1
            else:
                result.append(y[0])
                comps.append([z[0], y[0]])
                y.pop(0)
                compsN = compsN + 1
        elif len(z) > 0:
            for i in z:
                result.append(i)
                z.pop(0)
        else:
            for i in y:
                result.append(i)
                y.pop(0)
    return [result, compsN, compsN]

def isort(x):
    '''
    Applies insertion sort and returns the sorted list, as well as the number of comparisons made.

    PARAMETERS
    ----------
    x : list

    RETURNS
    -------
    result : sorted list
    comps : int, number of comparisons
    '''
    result = []
    compsN = 0
    comps = []
    dist = 1
    for i in range(len(x)):
        if i == 0:
            result.append(x[i])
        else:
            while (i-dist >= 0) and (x[i] < result[i - dist]):
                comps.append([x[i], result[i - dist]])
                compsN = compsN + 1
                dist = dist + 1

            if (i-dist >= 0) and (x[i] >= result[i - dist]):
                comps.append([result[i - dist],x[i]])
                compsN = compsN + 1

            result.insert(i - dist + 1, x[i])
            dist = 1
    return [result, comps, compsN]

def vectorise_trace(machine_trace,human_trace,labels):
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
    return vm,vh

def get_machine_trace(algorithm,input,labels):
    output = algorithm(input)
    trace = []
    for comp in output[1]:
        trace.append([labels[input.index(comp[0])],labels[input.index(comp[1])]])
    return trace

def comp_euc_sim(machine_trace, human_trace, labels):
    vm,vh = vectorise_trace(machine_trace,human_trace,labels)
    print("m keys: " + str(vm.keys()))
    print("m trace order: " + str(vm.values()))
    print("h trace order: " + str(vh.values()))
    print(np.square(np.array(list(vm.values())) - np.array(list(vh.values()))))
    return 1/np.log(np.sqrt(np.sum(np.square(np.array(list(vm.values())) - np.array(list(vh.values()))))))

def comp_spearman_sim(machine_trace, human_trace, labels):
    vm, vh = vectorise_trace(machine_trace, human_trace, labels)
    print("m keys: " + str(vm.keys()))
    print("m trace order: " + str(vm.values()))
    print("h trace order: " + str(vh.values()))
    return stats.spearmanr(list(vm.values()),list(vh.values()))[0]

def get_similarity(method,algorithm,input,labels,ht):
    mt = get_machine_trace(algorithm,input,labels)
    if method == "euc":
        return comp_euc_sim(mt, ht, labels)
    else:
        return comp_spearman_sim(mt,ht,labels)

print(get_similarity("euc",bumsort,[6, 3, 5, 4, 2, 1],['E', 'B', 'C', 'A', 'F', 'D'],[['E','C'],['A','C'],['F','C'],['F','A'],['B','C'],['B','F'],['B','A'],['D','A'],['D','B'],['D','F']]))
print(get_similarity("spm",bumsort,[6, 3, 5, 4, 2, 1],['E', 'B', 'C', 'A', 'F', 'D'],[['E','C'],['A','C'],['F','C'],['F','A'],['B','C'],['B','F'],['B','A'],['D','A'],['D','B'],['D','F']]))