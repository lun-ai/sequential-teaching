:- use_module(library(random)).
:- use_module(library(system)).

:-['metagol/auxiliary.pl'].

get_examples(Name,Pos/Neg,Pos1/Neg1):-
    findall(E1,(member(E,Pos),get_examples_aux(Name,E,E1)),Pos1),
    findall(E1,(member(E,Neg),get_examples_aux(Name,E,E1)),Neg1).
get_examples_aux(merge,E,E1):-
    E=..[merger,U,V,N],
    create_exprs(U,[U1],"<"),
    create_exprs(V,[V1],"<"),
    create_exprs(N,N1,"<"),
    A=[expr([U1,V1]),energy(0),left_bag([]),right_bag([]),memory([])],
    B=[expr([]),energy(_),left_bag(_),right_bag(_),memory(N1)],
    E1=..[merger,A,B].
get_examples_aux(merge_sort,E,E1):-
    E=..[sorter,U,V],
    example(merge_sort,U,V,A,B),
    E1=..[sorter,A,B].

example(merge_sort,L1,L2,A,B):-
  create_exprs(L1,L3),
  create_exprs(L2,L4,"<"),
  A = [expr(L3),energy(0),left_bag([]),right_bag([]),memory([])],
  B = [expr(L4),energy(_),left_bag(_),right_bag(_),memory(_)].

select_num(_,0,[]).
select_num(L,N,[X|S]):-
    random_select(X,L,L1),
    N1 is N-1,
    select_num(L1,N1,S).

%% generate random pos examples for merge sort
random_examples_fix_size(merge_sort,N,Size,R,Pos):-
    Size =< R,
    findall(E,(between(1,N,_),random_examples(merge_sort,Size,R,E)),Pos).
random_examples(merge_sort,N,Size,R,Pos):-
    Size =< R,
    findall(E,(between(1,N,_),random(1,Size,S),random_examples(merge_sort,S,R,E)),Pos).
random_examples(merge_sort,Size,R,E):-
    findall(K,between(1,R,K),L),
    select_num(L,Size,L1),
    sort(L1,L2),
    example(merge_sort,L1,L2,A,B),
    E=..[sorter,A,B].

%% generate random neg examples for merge sort
random_examples_neg(merge_sort,0,_,_,[]).
random_examples_neg(merge_sort,N,Size,R,[E|Neg]):-
    findall(K,between(0,R,K),L),
    select_num(L,Size,L1),
    sort(L1,L2),
    random_permutation(L1,L3),
    L2 \= L3,!,
    N1 is N-1,
    example(merge_sort,L1,L3,A,B),
    E=..[sorter,A,B],
    random_examples_neg(merge_sort,N1,Size,R,Neg).
random_examples_neg(merge_sort,N,Size,R,Neg):-
    random_examples_neg(merge_sort,N,Size,R,Neg).
random_examples(merge_sort,N,Size,R,Pos,Neg):-
    N1 is N/2,
    random_examples(merge_sort,N1,Size,R,Pos),
    random_examples_neg(merge_sort,N1,Size,R,Neg),!.

create_test_set(TaskName):-
    set_random(seed(539)),
    random_examples(TaskName,1000,20,20,Test1,Test2),
    append(Test1,Test2,Test3),
    forall(member(E,Test1),test_pos_merge_sort(E)),
    forall(member(E,Test2),test_neg_merge_sort(E)),
    length(Test1,L1),
    length(Test2,L2),
    atomic_list_concat(['metagol/database/',TaskName,
                        '_test_examples_1000'],Name),
    save_data(Name,[test-Test3]),
    format('% test set for ~w created and saved\n% pos size: ~w; neg size: ~w\n',[TaskName,L1,L2]).

load_test_set(TaskName,TestEx):-
    atomic_list_concat(['metagol/database/',TaskName,
                        '_test_examples_1000'],Name),
    load_data(Name,[test-TestEx]),
    format('% test set for ~w loaded\n',[TaskName]).

is_sorted(L1,L2):-
    L2 = [Expr],
    findall(I,(member(N,L1),string_2_int(N,I)),L3),
    split_string(Expr,"<","",L4),
    strings_2_ints(L4,L5),
    sort(L3,L5).

test_pos_merge_sort(E):-
    E=..[_,A,B],
    A=[expr(L1)|_],
    B=[expr(L2)|_],
    is_sorted(L1,L2).

test_neg_merge_sort(E):-
    E=..[_,A,B],
    A=[expr(L1)|_],
    B=[expr(L2)|_],
    \+is_sorted(L1,L2).



