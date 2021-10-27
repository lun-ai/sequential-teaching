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
    comps = 0
    if len(x) < 2:
        return [x, comps]
    mid = int(len(x)/2)
    ysort = msort(x[:mid])
    zsort = msort(x[mid:])
    y = ysort[0]
    z = zsort[0]
    comps = comps + ysort[1] + zsort[1]
    while (len(y) > 0) or (len(z) > 0):
        if len(y) > 0 and len(z) > 0:
            if y[0] > z[0]:
                result.append(z[0])
                z.pop(0)
                comps = comps + 1
            else:
                result.append(y[0])
                y.pop(0)
                comps = comps + 1
        elif len(z) > 0:
            for i in z:
                result.append(i)
                z.pop(0)
        else:
            for i in y:
                result.append(i)
                y.pop(0)
    return [result, comps]

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
    comps = 0
    dist = 1
    for i in range(len(x)):
        if i == 0:
            result.append(x[i])
        else:
            while (i-dist >= 0) and (x[i] < result[i - dist]):
                comps = comps + 1
                dist = dist + 1

            if (i-dist >= 0) and (x[i] >= result[i - dist]):
                comps = comps + 1

            result.insert(i - dist + 1, x[i])
            dist = 1
    return [result, comps]

def comp_similarity(machine_trace,human_trace,labels):
    vm = {}
    vh = {}
    for l1 in labels:
        for l2 in labels:
            if l1 != l2 and not (str(l1 + ',' + l2) in vm or str(l1 + ',' + l2) in vh) and not (str(l2 + ',' + l1) in vm or str(l2 + ',' + l1) in vh):
                if ([l1,l2] in machine_trace or [l2,l1] in machine_trace) and ([l1,l2] in human_trace or [l2,l1] in human_trace):
                    if [l1, l2] in machine_trace:
                        vm[l1 + ',' + l2] = machine_trace.index([l1,l2])
                    elif [l2, l1] in machine_trace:
                        vm[l1 + ',' + l2] = machine_trace.index([l2,l1])
                    if [l1,l2] in human_trace:
                        vh[l1 + ',' + l2] = human_trace.index([l1,l2])
                    elif [l2,l1] in human_trace:
                        vh[l1 + ',' + l2] = human_trace.index([l2, l1])
    print("m trace: " + str(machine_trace))
    print("m trace order: " + str(vm.values()))
    print("h trace order: " + str(vh.values()))
    print(np.square(np.array(list(vm.values())) - np.array(list(vh.values()))))
    return np.sqrt(np.sum(np.square(np.array(list(vm.values())) - np.array(list(vh.values())))))

def get_machine_trace(algorithm,input,labels):
    output = algorithm(input)
    trace = []
    for comp in output[1]:
        trace.append([labels[input.index(comp[0])],labels[input.index(comp[1])]])
    return trace

def get_similarity(algorithm,input,labels,ht):
    mt = get_machine_trace(algorithm,input,labels)
    return comp_similarity(mt,ht,labels)

print(get_similarity(bumsort,[6, 3, 5, 4, 2, 1],['E', 'B', 'C', 'A', 'F', 'D'],[['E','C'],['A','C'],['F','C'],['F','A'],['B','C'],['B','F'],['B','A'],['D','A'],['D','B'],['D','F']]))