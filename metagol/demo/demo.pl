:- ['metagol/database/generate_train_ex.pl'].

% same merge training examples provided to humans in AMT empirical study
examples(
    merge,
    [
        merger([4], [2], [2, 4]),
        merger([1, 4], [2, 3], [1, 2, 3, 4]),
        merger([1, 2, 5, 7], [3, 4, 6], [1, 2, 3, 4, 5, 6, 7])
    ]/[
    ]
).

% same merge sort training examples provided to humans in AMT empirical study
examples(
    merge_sort,
    [
        sorter([5, 4, 6, 3, 1, 2],[1, 2, 3, 4, 5, 6]),
        sorter([6, 2, 4, 7, 5, 3, 1],[1, 2, 3, 4, 5, 6, 7]),
        sorter([7, 6, 5, 8, 4, 3, 2, 1],[1, 2, 3, 4, 5, 6, 7, 8]),
        sorter([8, 6, 4, 3, 2, 10, 9, 7, 1, 5],[1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    ]/[
    ]
).

% convert examples into states with composite objects
get_examples(merge,Pos1/Neg1):-
    examples(merge,Pos/Neg),
    get_examples(merge,Pos/Neg,Pos1/Neg1).

get_examples(merge_sort,Pos1/Neg1):-
    examples(merge_sort,Pos/Neg),
    get_examples(merge_sort,Pos/Neg,Pos1/Neg1).