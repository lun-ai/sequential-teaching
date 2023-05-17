:- ['metagol/database/generate_train_ex.pl'].
:- ['metagol/background/merge_sort.pl'].

% learn merge sort in the merge-then-sort curriculum
%
% target program

merger(A,B):-parse_exprs(A,C),merger_1(C,B).
merger_1(A,B):-compare_nums(A,C),merger_1(C,B).
merger_1(A,B):-compare_nums(A,C),drop_bag_remaining(C,B).

sorter(A,B):-single_expr(A,C),single_expr(C,B).
sorter(A,B):-recycle_memory(A,C),sorter(C,B).
sorter(A,B):-merger(A,C),sorter(C,B).

compare_nums_wrapper(A,B) :-
    compare_nums(A,B),
    member(memory(A1),A),
    member(memory(B1),B),
    writeln(A1),
    writeln(B1).


find_merger_inconsistency :-
%    trace,
    get_examples(merge,
                    [
                        merger([1, 2, 5, 7], [3, 4, 6], [1, 2, 3, 4, 5, 6, 7]),
                        merger([1, 2, 5, 7], [3, 4, 6], [1, 2, 3, 4, 5, 7, 6])
                    ]/[
                    ],
                 [E1,E2]/_),
    E1=.. [merger,A1,B1],
    E2=.. [merger,A2,B2],
%    trace(compare_nums/2,exit),
    wrap_predicate(compare_nums,trace,C,compare_nums_wrapper),
    writeln(C),
    C,
    call(merger,A1,B1),
    writeln('% error\n'),
    call(merger,A2,B2).

% T [12] Exit: compare_nums([expr([]), energy(0), left_bag(["1", "2", "5", "7"]), right_bag(["3", "4", "6"]), memory([""])], [expr([]), energy(1), left_bag(["2", "5", "7"]), right_bag(["3", "4", "6"]), memory(["1"])])
% T [13] Exit: compare_nums([expr([]), energy(1), left_bag(["2", "5", "7"]), right_bag(["3", "4", "6"]), memory(["1"])], [expr([]), energy(2), left_bag(["5", "7"]), right_bag(["3", "4", "6"]), memory(["1<2"])])
% T [14] Exit: compare_nums([expr([]), energy(2), left_bag(["5", "7"]), right_bag(["3", "4", "6"]), memory(["1<2"])], [expr([]), energy(3), left_bag(["5", "7"]), right_bag(["4", "6"]), memory(["1<2<3"])])
% T [15] Exit: compare_nums([expr([]), energy(3), left_bag(["5", "7"]), right_bag(["4", "6"]), memory(["1<2<3"])], [expr([]), energy(4), left_bag(["5", "7"]), right_bag(["6"]), memory(["1<2<3<4"])])
% T [16] Exit: compare_nums([expr([]), energy(4), left_bag(["5", "7"]), right_bag(["6"]), memory(["1<2<3<4"])], [expr([]), energy(5), left_bag(["7"]), right_bag(["6"]), memory(["1<2<3<4<5"])])
% T [17] Exit: compare_nums([expr([]), energy(5), left_bag(["7"]), right_bag(["6"]), memory(["1<2<3<4<5"])], [expr([]), energy(6), left_bag(["7"]), right_bag([]), memory(["1<2<3<4<5<6"])])
% T [17] Exit: compare_nums([expr([]), energy(5), left_bag(["7"]), right_bag(["6"]), memory(["1<2<3<4<5"])], [expr([]), energy(6), left_bag(["7"]), right_bag([]), memory(["1<2<3<4<5<6"])])
% T [16] Exit: compare_nums([expr([]), energy(4), left_bag(["5", "7"]), right_bag(["6"]), memory(["1<2<3<4"])], [expr([]), energy(5), left_bag(["7"]), right_bag(["6"]), memory(["1<2<3<4<5"])])
% T [15] Exit: compare_nums([expr([]), energy(3), left_bag(["5", "7"]), right_bag(["4", "6"]), memory(["1<2<3"])], [expr([]), energy(4), left_bag(["5", "7"]), right_bag(["6"]), memory(["1<2<3<4"])])
% T [14] Exit: compare_nums([expr([]), energy(2), left_bag(["5", "7"]), right_bag(["3", "4", "6"]), memory(["1<2"])], [expr([]), energy(3), left_bag(["5", "7"]), right_bag(["4", "6"]), memory(["1<2<3"])])
% T [13] Exit: compare_nums([expr([]), energy(1), left_bag(["2", "5", "7"]), right_bag(["3", "4", "6"]), memory(["1"])], [expr([]), energy(2), left_bag(["5", "7"]), right_bag(["3", "4", "6"]), memory(["1<2"])])
% T [12] Exit: compare_nums([expr([]), energy(0), left_bag(["1", "2", "5", "7"]), right_bag(["3", "4", "6"]), memory([""])], [expr([]), energy(1), left_bag(["2", "5", "7"]), right_bag(["3", "4", "6"]), memory(["1"])])
% T [16] Exit: compare_nums([expr([]), energy(4), left_bag(["5", "7"]), right_bag(["6"]), memory(["1<2<3<4"])], [expr([]), energy(5), left_bag(["7"]), right_bag(["6"]), memory(["1<2<3<4<5"])])
% T [15] Exit: compare_nums([expr([]), energy(3), left_bag(["5", "7"]), right_bag(["4", "6"]), memory(["1<2<3"])], [expr([]), energy(4), left_bag(["5", "7"]), right_bag(["6"]), memory(["1<2<3<4"])])
% T [14] Exit: compare_nums([expr([]), energy(2), left_bag(["5", "7"]), right_bag(["3", "4", "6"]), memory(["1<2"])], [expr([]), energy(3), left_bag(["5", "7"]), right_bag(["4", "6"]), memory(["1<2<3"])])
% T [13] Exit: compare_nums([expr([]), energy(1), left_bag(["2", "5", "7"]), right_bag(["3", "4", "6"]), memory(["1"])], [expr([]), energy(2), left_bag(["5", "7"]), right_bag(["3", "4", "6"]), memory(["1<2"])])
% T [12] Exit: compare_nums([expr([]), energy(0), left_bag(["1", "2", "5", "7"]), right_bag(["3", "4", "6"]), memory([""])], [expr([]), energy(1), left_bag(["2", "5", "7"]), right_bag(["3", "4", "6"]), memory(["1"])])
