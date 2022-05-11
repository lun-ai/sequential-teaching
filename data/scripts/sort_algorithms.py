# Implementation of a set of common sorting algorithms
# Each outputs a list that is sorted incrementally, comparisons and the count of comparisons

def botup_msort_left_front(x):
    '''
    Applies bottom-up merge sort by popping the front of sublists and merge sublists from left to right

    Tested

    PARAMETERS
    ----------
    x : list

    RETURNS
    -------
    list : [sorted list, comps, compsN]
    '''
    comps = []
    compsN = 0
    result = []
    # Turning the unsorted list into a list containing lists of the length one. That way, only one
    # iterative sorting algorithm suffices.
    for i in range(len(x)):
        a = []
        a.append(x[i])
        result.append(a)
    while len(result) > 1:
        # When the list is fully sorted, res only contains one (fully sorted) list.
        old = result
        result = []
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
                        comps.append([y[0], z[0]])
                        z.pop(0)
                        compsN += 1
                    else:
                        new.append(y[0])
                        comps.append([z[0], y[0]])
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
            result.append(new)
        if len(old) % 2 == 1:
            result.append(old[-1])

    return result[0], comps, compsN


def botup_msort_right_front(x):
    '''
    Applies bottom-up merge sort by popping the front of sublists and merge sublists from right to left

    Tested

    PARAMETERS
    ----------
    x : list

    RETURNS
    -------
    list : [sorted list, comps, compsN]
    '''
    comps = []
    compsN = 0
    result = []
    # Turning the unsorted list into a list containing lists of the length one. That way, only one
    # iterative sorting algorithm suffices.
    for i in range(len(x)):
        a = []
        a.append(x[i])
        result.append(a)
    while len(result) > 1:
        # When the list is fully sorted, res only contains one (fully sorted) list.
        old = result
        result = []
        for i in range(len(old) // 2):
            y = old[2 * i]
            z = old[2 * i + 1]
            # Collecting the lists next to each other. Apart from this, the algorithm works (almost)
            # exactly the same as in the previous merge sort function.
            new = []
            while (len(y) > 0) or (len(z) > 0):
                i = len(y) - 1
                j = len(z) - 1
                if len(y) > 0 and len(z) > 0:
                    if y[i] < z[j]:
                        new = [z[j]] + new
                        comps.append([y[i], z[j]])
                        z.pop(j)
                        compsN = compsN + 1
                    else:
                        new = [y[i]] + new
                        comps.append([z[j], y[i]])
                        y.pop(i)
                        compsN = compsN + 1
                elif len(z) > 0:
                    new = z + new
                    z = []
                else:
                    new = y + new
                    y = []
            result.append(new)
        if len(old) % 2 == 1:
            result.append(old[-1])

    return result[0], comps, compsN


def botup_msort_left_back(x):
    '''
    Applies bottom-up merge sort by popping the back of sublists and merge sublists from left to right

    Tested

    PARAMETERS
    ----------
    x : list

    RETURNS
    -------
    list : [sorted list, comps, compsN]
    '''
    comps = []
    compsN = 0
    result = []
    # Turning the unsorted list into a list containing lists of the length one. That way, only one
    # iterative sorting algorithm suffices.
    for i in range(len(x)):
        a = []
        a.append(x[i])
        result.append(a)
    while len(result) > 1:
        # When the list is fully sorted, res only contains one (fully sorted) list.
        old = result
        result = []
        for i in range(len(old) // 2):
            y = old[len(old) - 1 - 2 * i]
            z = old[len(old) - 2 * (i + 1)]
            # Collecting the lists next to each other. Apart from this, the algorithm works (almost)
            # exactly the same as in the previous merge sort function.
            new = []
            while len(y) > 0 or len(z) > 0:
                if len(y) > 0 and len(z) > 0:
                    if y[0] > z[0]:
                        new.append(z[0])
                        comps.append([y[0], z[0]])
                        z.pop(0)
                        compsN += 1
                    else:
                        new.append(y[0])
                        comps.append([z[0], y[0]])
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
            result = [new] + result
        if len(old) % 2 == 1:
            result = [old[0]] + result

    return result[0], comps, compsN


def botup_msort_right_back(x):
    '''
    Applies bottom-up merge sort by popping the back of sublists and merge sublists from right to left

    Tested

    PARAMETERS
    ----------
    x : list

    RETURNS
    -------
    list : [sorted list, comps, compsN]
    '''
    comps = []
    compsN = 0
    result = []
    # Turning the unsorted list into a list containing lists of the length one. That way, only one
    # iterative sorting algorithm suffices.
    for i in range(len(x)):
        a = []
        a.append(x[i])
        result.append(a)
    while len(result) > 1:
        # When the list is fully sorted, res only contains one (fully sorted) list.
        old = result
        result = []
        for i in range(len(old) // 2):
            y = old[len(old) - 1 - 2 * i]
            z = old[len(old) - 2 * (i + 1)]
            # Collecting the lists next to each other. Apart from this, the algorithm works (almost)
            # exactly the same as in the previous merge sort function.
            new = []
            while (len(y) > 0) or (len(z) > 0):
                i = len(y) - 1
                j = len(z) - 1
                if len(y) > 0 and len(z) > 0:
                    if y[i] < z[j]:
                        new = [z[j]] + new
                        comps.append([y[i], z[j]])
                        z.pop(j)
                        compsN = compsN + 1
                    else:
                        new = [y[i]] + new
                        comps.append([z[j], y[i]])
                        y.pop(i)
                        compsN = compsN + 1
                elif len(z) > 0:
                    new = z + new
                    z = []
                else:
                    new = y + new
                    y = []
            result = [new] + result
        if len(old) % 2 == 1:
            result = [old[0]] + result

    return result[0], comps, compsN


def qsort_first(x):
    '''
    Applies quicksort by consistently selecting the first as pivot

    Tested

    PARAMETERS
    ----------
    x : list

    RETURNS
    -------
    list : [sorted list, comps, compsN]
    '''
    comps = []
    compsN = 0

    if len(x) <= 1:
        return x, [], 0
    pivot = 0
    left = []
    right = []
    for i in range(0, len(x)):
        if i == pivot:
            continue
        elif x[i] < x[pivot]:
            left.append(x[i])
            comps.append([x[i], x[pivot]])
            compsN += 1
        else:
            right.append(x[i])
            comps.append([x[pivot], x[i]])
            compsN += 1

    l1, c1, n1 = qsort_first(left)
    l2, c2, n2 = qsort_first(right)

    return l1 + [x[pivot]] + l2, comps + c1 + c2, compsN + n1 + n2


def qsort_mid(x):
    '''
    Applies quicksort by consistently selecting the middle as pivot

    Tested

    PARAMETERS
    ----------
    x : list

    RETURNS
    -------
    list : [sorted list, comps, compsN]
    '''
    comps = []
    compsN = 0

    if len(x) <= 1:
        return x, [], 0
    pivot = len(x) // 2
    left = []
    right = []
    for i in range(0, len(x)):
        if i == pivot:
            continue
        elif x[i] < x[pivot]:
            left.append(x[i])
            comps.append([x[i], x[pivot]])
            compsN += 1
        else:
            right.append(x[i])
            comps.append([x[pivot], x[i]])
            compsN += 1

    l1, c1, n1 = qsort_mid(left)
    l2, c2, n2 = qsort_mid(right)

    return l1 + [x[pivot]] + l2, comps + c1 + c2, compsN + n1 + n2


def qsort_last(x):
    '''
    Applies quicksort by consistently selecting the last as pivot

    Tested

    PARAMETERS
    ----------
    x : list

    RETURNS
    -------
    list : [sorted list, comps, compsN]
    '''
    comps = []
    compsN = 0

    if len(x) <= 1:
        return x, [], 0
    pivot = len(x) - 1
    left = []
    right = []
    for i in range(0, len(x)):
        if i == pivot:
            continue
        elif x[i] < x[pivot]:
            left.append(x[i])
            comps.append([x[i], x[pivot]])
            compsN += 1
        else:
            right.append(x[i])
            comps.append([x[pivot], x[i]])
            compsN += 1

    l1, c1, n1 = qsort_last(left)
    l2, c2, n2 = qsort_last(right)

    return l1 + [x[pivot]] + l2, comps + c1 + c2, compsN + n1 + n2


def msort_left_front(x):
    '''
    Applies the conventional merge sort which compares the left branch of the tree
    Perform merge from front of sublists

    Tested

    PARAMETERS
    ----------
    x : list

    RETURNS
    -------
    list : [sorted list, comps, compsN]
    '''
    result = []
    comps = []
    compsN = 0
    if len(x) < 2:
        return x, comps, compsN
    elif len(x) == 2:
        return sorted(x), comps + [x], compsN + 1
    mid = (len(x) + 1) // 2
    ysort = msort_left_front(x[:mid])
    zsort = msort_left_front(x[mid:])
    y = ysort[0]
    z = zsort[0]
    compsN = compsN + ysort[2] + zsort[2]
    comps = comps + ysort[1] + zsort[1]
    while (len(y) > 0) or (len(z) > 0):
        if len(y) > 0 and len(z) > 0:
            if y[0] > z[0]:
                result.append(z[0])
                comps.append([y[0], z[0]])
                z.pop(0)
                compsN = compsN + 1
            else:
                result.append(y[0])
                comps.append([z[0], y[0]])
                y.pop(0)
                compsN = compsN + 1
        elif len(z) > 0:
            result = result + z
            z = []
        else:
            result = result + y
            y = []

    return result, comps, compsN


def msort_right_front(x):
    '''
    Applies the conventional merge sort which compares the right branch of the tree
    Perform merge from the front of sublists

    Tested

    PARAMETERS
    ----------
    x : list

    RETURNS
    -------
    list : [sorted list, comps, compsN]
    '''
    result = []
    comps = []
    compsN = 0
    if len(x) < 2:
        return [x, comps, compsN]
    mid = len(x) // 2
    zsort = msort_right_front(x[mid:])
    ysort = msort_right_front(x[:mid])
    y = ysort[0]
    z = zsort[0]
    compsN = compsN + ysort[2] + zsort[2]
    comps = comps + zsort[1] + ysort[1]
    while (len(y) > 0) or (len(z) > 0):
        if len(y) > 0 and len(z) > 0:
            if y[0] > z[0]:
                result.append(z[0])
                comps.append([y[0], z[0]])
                z.pop(0)
                compsN = compsN + 1
            else:
                result.append(y[0])
                comps.append([z[0], y[0]])
                y.pop(0)
                compsN = compsN + 1
        elif len(z) > 0:
            result = result + z
            z = []
        else:
            result = result + y
            y = []

    return result, comps, compsN


def msort_left_back(x):
    '''
    Applies the conventional merge sort which compares the left branch of the tree
    Perform merge from the back of sublists

    Tested

    PARAMETERS
    ----------
    x : list

    RETURNS
    -------
    list : [sorted list, comps, compsN]
    '''
    result = []
    comps = []
    compsN = 0
    if len(x) < 2:
        return x, comps, compsN
    elif len(x) == 2:
        return sorted(x), comps + [x], compsN + 1
    mid = (len(x) + 1) // 2
    ysort = msort_left_back(x[:mid])
    zsort = msort_left_back(x[mid:])
    y = ysort[0]
    z = zsort[0]
    compsN = compsN + ysort[2] + zsort[2]
    comps = comps + ysort[1] + zsort[1]
    while (len(y) > 0) or (len(z) > 0):
        i = len(y) - 1
        j = len(z) - 1
        if len(y) > 0 and len(z) > 0:
            if y[i] < z[j]:
                result = [z[j]] + result
                comps.append([y[i], z[j]])
                z.pop(j)
                compsN = compsN + 1
            else:
                result = [y[i]] + result
                comps.append([z[j], y[i]])
                y.pop(i)
                compsN = compsN + 1
        elif len(z) > 0:
            result = z + result
            z = []
        else:
            result = y + result
            y = []

    return result, comps, compsN


def msort_right_back(x):
    '''
    Applies the conventional merge sort which compares the right branch of the tree
    Perform merge from the back of sublists

    Tested

    PARAMETERS
    ----------
    x : list

    RETURNS
    -------
    list : [sorted list, comps, compsN]
    '''
    result = []
    comps = []
    compsN = 0
    if len(x) < 2:
        return [x, comps, compsN]
    mid = len(x) // 2
    zsort = msort_right_back(x[mid:])
    ysort = msort_right_back(x[:mid])
    y = ysort[0]
    z = zsort[0]
    compsN = compsN + ysort[2] + zsort[2]
    comps = comps + zsort[1] + ysort[1]
    while (len(y) > 0) or (len(z) > 0):
        i = len(y) - 1
        j = len(z) - 1
        if len(y) > 0 and len(z) > 0:
            if y[i] < z[j]:
                result = [z[j]] + result
                comps.append([y[i], z[j]])
                z.pop(j)
                compsN = compsN + 1
            else:
                result = [y[i]] + result
                comps.append([z[j], y[i]])
                y.pop(i)
                compsN = compsN + 1
        elif len(z) > 0:
            result = z + result
            z = []
        else:
            result = y + result
            y = []

    return result, comps, compsN


def bubsort_front(x):
    '''
        Applies bubble sort by initiating the swaps from the front of the list

        Tested

        PARAMETERS
        ----------
        x : list

        RETURNS
        -------
        list : [sorted list, comps, compsN]
    '''

    n = len(x)
    comps = []
    compsN = 0

    for i in range(n - 1):
        for j in range(0, n - i - 1):
            if x[j] > x[j + 1]:
                comps.append([x[j], x[j + 1]])
                compsN += 1
                x[j], x[j + 1] = x[j + 1], x[j]
            else:
                comps.append([x[j + 1], x[j]])
                compsN += 1

    return x, comps, compsN


def bubsort_back(x):
    '''
        Applies bubble sort by initiating the swaps from the back of the list

        Tested

        PARAMETERS
        ----------
        x : list

        RETURNS
        -------
        list : [sorted list, comps, compsN]
    '''

    n = len(x)
    comps = []
    compsN = 0

    for i in range(n - 1):
        for j in range(0, n - i - 1):
            if x[n - 1 - j] < x[n - j - 2]:
                comps.append([x[n - 1 - j], x[n - j - 2]])
                compsN += 1
                x[n - 1 - j], x[n - j - 2] = x[n - j - 2], x[n - 1 - j]
            else:
                comps.append([x[n - j - 2], x[n - 1 - j]])
                compsN += 1

    return x, comps, compsN


def isort_front(x):
    '''
    Applies insertion sort by initiating the traverse from the front of the list

    Tested

    PARAMETERS
    ----------
    x : list

    RETURNS
    -------
    list : [sorted list, comps, compsN]
    '''

    result = []
    comps = []
    compsN = 0
    dist = 0
    for i in range(len(x)):
        if i == 0:
            result.append(x[i])
        else:
            while (dist < len(result)) and (x[i] > result[dist]):
                comps.append([x[i], result[dist]])
                compsN = compsN + 1
                dist = dist + 1

            if (dist < len(result)) and (x[i] <= result[dist]):
                comps.append([result[dist], x[i]])
                compsN = compsN + 1

            result.insert(dist, x[i])
            dist = 0

    return result, comps, compsN


def isort_back(x):
    '''
    Applies insertion sort by initiating the traverse from the back of the list

    Tested

    PARAMETERS
    ----------
    x : list

    RETURNS
    -------
    list : [sorted list, comps, compsN]
    '''

    result = []
    comps = []
    compsN = 0
    dist = 1

    for i in range(len(x)):
        if i == 0:
            result.append(x[i])
        else:
            while (i - dist >= 0) and (x[i] < result[i - dist]):
                comps.append([x[i], result[i - dist]])
                compsN = compsN + 1
                dist = dist + 1

            if (i - dist >= 0) and (x[i] >= result[i - dist]):
                comps.append([result[i - dist], x[i]])
                compsN = compsN + 1

            result.insert(i - dist + 1, x[i])
            dist = 1

    return result, comps, compsN


def dict_sort_front(x):
    '''
        Applies dictionary sort by prioritising comparison with the first element of the partially sorted list

        Tested

        PARAMETERS
        ----------
        x : list

        RETURNS
        -------
        list : [sorted list, comps, compsN]
    '''
    return ds_front(x, [])


def ds_front(x, partial):
    '''
        Applies dictionary sort by prioritising comparison from x with the first element of the partially sorted list

        Tested

        PARAMETERS
        ----------
        x : list
        partial: list

        RETURNS
        -------
        list : [sorted list, comps, compsN]
    '''
    result = partial
    comps = []
    compsN = 0

    for n in x:
        if result == []:
            result.append(n)
            continue
        i = 0
        j = len(result) - 1

        if n > result[j]:
            comps.append([n, result[j]])
            compsN += 1
            result.insert(j + 1, n)
        elif n < result[i]:
            comps.append([n, result[i]])
            compsN += 1
            result.insert(i, n)
        else:
            comps.append([n, result[i]])
            comps.append([n, result[j]])
            compsN += 2
            while i < j:
                k = (i + j) // 2
                if n < result[k]:
                    comps.append([n, result[k]])
                    compsN += 1
                    j = k
                else:
                    comps.append([n, result[k]])
                    compsN += 1
                    i = k
                if i >= j - 1:
                    result.insert(j, n)
                    break

    return result, comps, compsN


def dict_sort_mid(x):
    '''
        Applies dictionary sort by prioritising comparison with the middleelement of the partially sorted list

        Tested

        PARAMETERS
        ----------
        x : list

        RETURNS
        -------
        list : [sorted list, comps, compsN]
    '''
    return ds_mid(x, [])


def ds_mid(x, partial):
    '''
        Applies dictionary sort by prioritising comparison from x with the middle element of the partially sorted list

        Tested

        PARAMETERS
        ----------
        x : list
        partial: list

        RETURNS
        -------
        list : [sorted list, comps, compsN]
    '''
    result = partial
    comps = []
    compsN = 0

    for n in x:
        if result == []:
            result.append(n)
            continue
        i = 0
        j = len(result) - 1

        while i <= j:
            k = (i + j) // 2
            if n < result[k]:
                comps.append([n, result[k]])
                compsN += 1
                j = k

                if k != i and [n, result[i]] not in comps and [result[i], n] not in comps:
                    comps.append([n, result[i]])
                    compsN += 1
                if n < result[i]:
                    result.insert(i, n)
                    break
            else:
                comps.append([n, result[k]])
                compsN += 1
                i = k

                if k != j and [n, result[j]] not in comps and [result[j], n] not in comps:
                    comps.append([n, result[j]])
                    compsN += 1
                if n > result[j]:
                    result.insert(j + 1, n)
                    break
            if i >= j - 1:
                result.insert(j, n)
                break

    return result, comps, compsN


def dict_sort_back(x):
    '''
        Applies dictionary sort by prioritising comparison with the last element of the partially sorted list

        Tested

        PARAMETERS
        ----------
        x : list

        RETURNS
        -------
        list : [sorted list, comps, compsN]
    '''
    return ds_back(x, [])


def ds_back(x, partial):
    '''
        Applies dictionary sort by prioritising comparison from x with the last element of the partially sorted list

        Tested

        PARAMETERS
        ----------
        x : list
        partial: list

        RETURNS
        -------
        list : [sorted list, comps, compsN]
    '''

    result = partial
    comps = []
    compsN = 0

    for n in x:
        if result == []:
            result.append(n)
            continue
        i = 0
        j = len(result) - 1
        if n > result[j]:
            comps.append([n, result[j]])
            compsN += 1
            result.insert(j + 1, n)
        elif n < result[i]:
            comps.append([n, result[i]])
            compsN += 1
            result.insert(i, n)
        else:
            comps.append([n, result[j]])
            comps.append([n, result[i]])
            compsN += 2
            while i < j:
                k = (i + j) // 2
                if n < result[k]:
                    comps.append([n, result[k]])
                    compsN += 1
                    j = k
                else:
                    comps.append([n, result[k]])
                    compsN += 1
                    i = k
                if i >= j - 1:
                    result.insert(j, n)
                    break

    return result, comps, compsN


def is_front_hybrid_ds_front(x, k):
    '''
        Applies hybrid insertion and dictionary sort variants and switch at kth index of x

        Tested

        PARAMETERS
        ----------
        x : list
        k : int

        RETURNS
        -------
        list : [sorted list, comps, compsN]
    '''
    res1, c1, cN1 = isort_front(x[:k])
    res2, c2, cN2 = ds_front(x[k:], res1)
    return res2, c1 + c2, cN1 + cN2


def is_front_hybrid_ds_mid(x, k):
    '''
        Applies hybrid insertion and dictionary sort variants and switch at kth index of x

        Tested

        PARAMETERS
        ----------
        x : list
        k : int

        RETURNS
        -------
        list : [sorted list, comps, compsN]
    '''
    res1, c1, cN1 = isort_front(x[:k])
    res2, c2, cN2 = ds_mid(x[k:], res1)
    return res2, c1 + c2, cN1 + cN2


def is_front_hybrid_ds_back(x, k):
    '''
        Applies hybrid insertion and dictionary sort variants and switch at kth index of x

        Tested

        PARAMETERS
        ----------
        x : list
        k : int

        RETURNS
        -------
        list : [sorted list, comps, compsN]
    '''
    res1, c1, cN1 = isort_front(x[:k])
    res2, c2, cN2 = ds_back(x[k:], res1)
    return res2, c1 + c2, cN1 + cN2


def is_back_hybrid_ds_front(x, k):
    '''
        Applies hybrid insertion and dictionary sort variants and switch at kth index of x

        Tested

        PARAMETERS
        ----------
        x : list
        k : int

        RETURNS
        -------
        list : [sorted list, comps, compsN]
    '''
    res1, c1, cN1 = isort_back(x[:k])
    res2, c2, cN2 = ds_front(x[k:], res1)
    return res2, c1 + c2, cN1 + cN2


def is_back_hybrid_ds_mid(x, k):
    '''
        Applies hybrid insertion and dictionary sort variants and switch at kth index of x

        Tested

        PARAMETERS
        ----------
        x : list
        k : int

        RETURNS
        -------
        list : [sorted list, comps, compsN]
    '''
    res1, c1, cN1 = isort_back(x[:k])
    res2, c2, cN2 = ds_mid(x[k:], res1)
    return res2, c1 + c2, cN1 + cN2


def is_back_hybrid_ds_back(x, k):
    '''
        Applies hybrid insertion and dictionary sort variants and switch at kth index of x

        Tested

        PARAMETERS
        ----------
        x : list
        k : int

        RETURNS
        -------
        list : [sorted list, comps, compsN]
    '''
    res1, c1, cN1 = isort_back(x[:k])
    res2, c2, cN2 = ds_back(x[k:], res1)
    return res2, c1 + c2, cN1 + cN2


def check_sort_output(input, comps, compsN):
    '''
    
    Raise exception if input list of integers is not correctly sorted
    or the number of comparisons does not match the machine trace
    
    :param input: 
    :param comps: 
    :param compsN: 
    :return: 
    '''
    if input != sorted(input):
        raise AssertionError("Algorithm not returning sorted lists!")
    if compsN != len(comps):
        raise AssertionError("Algorithm trace does not match number of comparisons!")


# collection of all algorithms
ALL_ALGORITHMS = [botup_msort_left_front, botup_msort_right_front, botup_msort_left_back, botup_msort_right_back,
                  qsort_first, qsort_mid, qsort_last, isort_front, isort_back,
                  msort_left_front, msort_left_back, msort_left_back, msort_right_back, dict_sort_front, dict_sort_mid,
                  dict_sort_back,
                  bubsort_front, bubsort_back]
HYBRID_ALGORITHMS = [is_front_hybrid_ds_front, is_front_hybrid_ds_mid, is_front_hybrid_ds_back, is_back_hybrid_ds_front,
                     is_back_hybrid_ds_mid, is_back_hybrid_ds_back]


# for testing algorithm implementations
def recur_gen_list(test_lists, nrange):
    '''

    Recursively generate lists for testing algorithm correctness

    :param test_lists:
    :param nrange:
    :return:

    '''
    newL = []
    for l in test_lists:
        k = l.copy()
        for i in range(1, nrange + 1):
            if i not in k:
                newL.append([k + [i]])
    return newL


def test_all_alg(size, nrange):
    '''

    Test correctness of algorithms with inputs up to size and integers in [1, nrange]

    :param size:
    :param nrange:
    :return:
    '''
    lists = [[]]
    failed_tests = {}
    for i in range(0, size):
        lists = recur_gen_list(lists, nrange)
    for alg in ALL_ALGORITHMS:
        for l in lists:
            r = alg(l)
            if r[0] != sorted(l):
                print([l, r[0]])
                if alg.__name__ not in failed_tests.keys():
                    failed_tests[alg.__name__] = [l]
                else:
                    failed_tests[alg.__name__].append(l)
    for alg in HYBRID_ALGORITHMS:
        for l in lists:
            for k in range(1, len(l)):
                r = alg(l, k)
                if r[0] != sorted(l):
                    print([l, r[0]])
                    if alg.__name__ not in failed_tests.keys():
                        failed_tests[alg.__name__] = [l]
                    else:
                        failed_tests[alg.__name__].append(l)
    if failed_tests.keys():
        print(failed_tests)
        raise Exception("Algorithm correctness test failed: check implementation of sort algorithms and their outputs!")