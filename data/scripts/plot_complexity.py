from random import randint
from sort_algorithms import *

def random_set_generator(length):
    '''
    Generates a random order for a list of the giving length. The list contains the numbers of 1 to length.

    PARAMETERS
    ----------
    length : int

    RETURNS
    -------
    set : list
    '''

    set = []

    for i in range(length):
        x = randint(1, length)
        while x in set:
            x = randint(1, length)
        set.append(x)

    return set


def generator(f1, f2, length, amount, thresh):
    '''
    Generates sortable lists, where merge sort and insertion sort algorithms differ by at least thresh.

    PARAMETERS
    ----------
    length : int
    amount : int
    thresh : int
    '''

    i1 = []
    i2 = []

    while len(i1) < amount:
        set = random_set_generator(length)
        res_sort1 = f1(set)
        res_sort2 = f2(set)
        diff = res_sort1[2] - res_sort2[2]
        if diff >= thresh:
            print(
                set,
                res_sort1[2],
                res_sort2[2]
            )
            i1.append(res_sort1[2])
            i2.append(res_sort2[2])

    return i1, i2


# u1 = []
# u2 = []
# std1 = []
# std2 = []
# input_size = range(10,1001,10)
#
# for i in input_size:
#     cost1,cost2 = generator(i,100,0)
#     u1.append(abs(np.average(cost1)-np.average(cost2))/(i*np.log(i)))
#     # u1.append(np.average(cost1))
#     # u2.append(np.average(cost2))
#     # std1.append(np.std(cost1))
#     # std2.append(np.std(cost2))
#
# fig, ax = plt.subplots()
# input_size = list(map(np.log,input_size))
# ax.errorbar(input_size, u1, label='merge')
# # ax.errorbar(input_size, u1, yerr=std1, label='merge')
# # ax.errorbar(input_size, u2, yerr=std2, label='bottom-up merge sort')
#
# plt.xlabel('Input size in ln(n) ')
# plt.ylabel('Diff in comparison / n * ln(n)')
# ax.legend()
# plt.show()

# choose isort_back as default human strategy
# choose botup_msort_left_front as target strategy
print(isort_back([10, 7, 1, 8, 6, 9, 4, 5, 3, 2]))
# print(isort_back([2, 9, 8, 10, 4, 5, 6, 7, 3, 1]))
print(botup_msort_left_front([10, 7, 1, 8, 6, 9, 4, 5, 3, 2]))

# generator(isort_back,botup_msort_left_front,10,10,18)