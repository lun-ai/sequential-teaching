:- ['metagol/database/generate_train_ex.pl'].
:- ['metagol/background/merge_sort.pl'].



% Learn merge sort in the merge-then-sort curriculum
%
% Learned merger/2 which performs the merging action
% on two bags of increasing integers based on lt_expr.
%
% Learned sorter/2 uses merger/2 as a bottom-up variation
% of merge sort.

merger(A,B):-parse_exprs(A,C),merger_1(C,B).
merger_1(A,B):-compare_nums_wrapper(A,C),merger_1(C,B).
merger_1(A,B):-compare_nums_wrapper(A,C),drop_bag_remaining_wrapper(C,B).

sorter(A,B):-single_expr(A,C),single_expr(C,B).
sorter(A,B):-recycle_memory(A,C),sorter(C,B).
sorter(A,B):-merger(A,C),sorter(C,B).



% wrapper of the compare_nums/2 action

compare_nums_wrapper(A,B) :-
    compare_nums(A,B).

compare_nums_wrapper(A,B,trace,Expr,Mapping) :-
    compare_nums(A,B),
    member(memory(MA),A),
    member(left_bag(LBA),A),
    member(right_bag(RBA),A),
    member(memory(MB),B),
    member(left_bag(LBB),B),
    member(right_bag(RBB),B),
    format('Compare - Left: ~w Right: ~w Expr: ~w -> Left: ~w Right: ~w Expr: ~w\n',[LBA,RBA,MA,LBB,RBB,MB]),
    !,
    MB = [ExprTemp],
    compare_text(LBA,RBA,Mapping,''),
    (sub_string(Expr,_,_,_,ExprTemp) -> true;
         string_length(ExprTemp,L),
         sub_string(Expr,0,L,_,ExprSub),
         format('Error   - correct: ~w wrong: ~w\n',[ExprTemp,ExprSub]),
         compare_text(LBA,RBA,Mapping,'should'),
         halt).



% wrapper of the drop_bag_remaining/2 action that dumps all bag integers into memory

drop_bag_remaining_wrapper(A,B) :-
    drop_bag_remaining(A,B).

drop_bag_remaining_wrapper(A,B,trace,Expr,Mapping) :-
    drop_bag_remaining(A,B),
    member(memory(MA),A),
    member(left_bag(LBA),A),
    member(right_bag(RBA),A),
    member(memory(MB),B),
    member(left_bag(LBB),B),
    member(right_bag(RBB),B),
    format('Drop    - Left: ~w Right: ~w Expr: ~w -> Left: ~w Right: ~w Expr: ~w\n',[LBA,RBA,MA,LBB,RBB,MB]),
    !,
    MB = [ExprTemp],
    drop_text(LBA,RBA,Mapping),
    (sub_string(Expr,_,_,_,ExprTemp) -> true;
         string_length(ExprTemp,L),
         sub_string(Expr,0,L,_,ExprSub),
         format('Error   - correct: ~w wrong: ~w\n\n',[ExprTemp,ExprSub]),
         halt).



% text template for the compare_nums/2 action

compare_text([S1|_],[S2|_],Mapping,Prefix) :-
    number_string(I1,S1),
    number_string(I2,S2),
    nth1(I1,Mapping,L1),
    nth1(I2,Mapping,L2),
    (I1 < I2 ->
        format('Item ~w is lighter than item ~w\n',[L1,L2]), format('~w apend item ~w\n',[Prefix,L1]);
        format('Item ~w is lighter than item ~w\n',[L2,L1]), format('~w apend item ~w\n',[Prefix,L2])).



% text template of the drop_bag_remaining/2 action

drop_text([],[S1|Ss],Mapping) :-
    findall(L,(member(S,[S1|Ss]),number_string(I,S),nth1(I,Mapping,L)),Ls),
    format('Apend ~w\n',[Ls]).
drop_text(I1,I2,Mapping) :-
    drop_text(I2,I1,Mapping).



% An example of comparing correct/wrong output of merging from traces
% Two key actions are compare_nums/2 and drop_bag_remaining/2
% which have been wrappered for writing more compact traces
%
% Using the learn merger/2 program, we run the positive example
% which has the correctly merged integer sequence.
%
% Then, we take the incorrect output (negative example) and check against
% intermediate lt_expr produced by the correct execution.
%
% In this example, we execute merging on two integer sequences [1,4] and [2,3].
% We expect the output to be [1,2,3,4].
%
% The wrong merged sequence [1,4,2,3] makes a mistake by putting 4 instead of 2
% after 1. This is identify in this example, where an error message is given.

find_merger_inconsistency :-
    writeln('\n% An example of comparing correct/wrong output of merging from traces'),
%    trace,
    ItemMapping=["A","D","C","B"],
    get_examples(merge,
                    [
                        merger([1,4], [2,3], [1, 2, 3, 4])
                    ]/[
                        merger([1,4], [2,3], [1, 4, 2, 3])
                    ],
                 [E1]/[E2]),
    E1=.. [merger,A1,B1],
    E2=.. [merger,_,B2],
    member(memory([WrongExpr]),B2),
    wrap_predicate(compare_nums_wrapper(Arg1,Arg2),
                    trace,_,compare_nums_wrapper(Arg1,Arg2,trace,WrongExpr,ItemMapping)),
    wrap_predicate(drop_bag_remaining_wrapper(Arg3,Arg4),trace,_,
                    drop_bag_remaining_wrapper(Arg3,Arg4,trace,WrongExpr,ItemMapping)),
    call(merger,A1,B1).
