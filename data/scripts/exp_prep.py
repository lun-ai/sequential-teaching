import random
import csv

def group_partitioning(n, seed):
    all_participants = range(1, n+1)
    group_partition = [[], [], [], []]
    random.Random(seed)
    for i in all_participants:
        groupId = random.randint(0, 3)
        group_partition[groupId].append(i)
    return group_partition

def participant_code_generator(code_list, n, path, le=3, num=3):
    code_cnt = 0
    all_codes = []
    while code_cnt < n:
        str = gen_code(l=le, n=num)
        if str not in all_codes and str not in code_list:
            all_codes.append(str)
            code_cnt += 1

    with open(path, 'w', newline='') as file:
        csv_writer = csv.writer(file)
        csv_writer.writerow(["id", "code", "hasSessionStarted"])
        for row_idx in range(0, len(all_codes)):
            csv_writer.writerow([row_idx + 1, all_codes[row_idx], 0])

def gen_code(l=3, n=3):
    letters_chosen = 0
    all_letters = []
    letters_list = []
    while letters_chosen < l:
        case = random.randint(0, 1)
        letter = random.randint(0, 25)
        if letter not in all_letters:
            lr = 'a'
            if case == 1:
                lr = 'A'
            lr = chr(ord(lr) + letter)
            all_letters.append(letter)
            letters_list.append(lr)
            letters_chosen += 1

    numbers = ['0']
    n = min(n, 10)
    for i in range(9):
        numbers.append(chr(ord(numbers[0]) + i + 1))
    random.shuffle(letters_list)
    random.shuffle(numbers)
    newL = letters_list[0:l] + numbers[0:n]
    random.shuffle(newL)
    shuffle_str = ''.join(newL)
    return shuffle_str

# Group partition
# for u in range(0, 1000):
#     grouping = group_partitioning(40, u)
#     if len(grouping[0]) == len(grouping[1]) and len(grouping[1]) == len(grouping[2]) and len(grouping[2]) == len(grouping[3]):
#         print("Seed is " + str(u))
#         print(grouping)
#         break

# generate participant code (id)
with open('./participant_code_german_group.csv','r', newline='') as file:
    csv_read = csv.reader(file)
    code_list = []
    for row in csv_read:
        code_list.append(row[1])
participant_code_generator(code_list[1:], 2000, './participant_code.csv', le=5, num=5)