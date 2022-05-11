:-['metagol/metaopt'].
:-['metagol/tree_cost.pl'].
:-['metagol/background/merge_sort.pl'].
:-['metagol/demo/demo.pl'].

max_time(300).

% list of composite actions
prim(parse_exprs/2).
prim(compare_nums/2).
prim(drop_bag_remaining/2).
prim(single_expr/2).
prim(recycle_memory/2).

% meta-rules for learning a recursive program, with specified constraints
metarule(chain,[P,Q,R],([P,A,B]:-[[Q,A,C],[R,C,B]])).
metarule(tailrec,[P,Q],([P,A,B]:-[[Q,A,C],@term_order(spearman,A,C),[P,C,B],@term_order(spearman,C,B)])).

% learn merge sort without learning merge first
learn_merge_sort:-
    get_examples(merge_sort,Pos/Neg),
    assert(metaopt:max_clauses(5)),
    learn_seq([Pos/Neg],_),
    get_best_program(Prog),
    load_test_set(merge_sort,AllEx),
    accuracy(AllEx,Prog,test_pos_merge_sort,test_neg_merge_sort,A),
    format('% accuracy: ~w\n',[A]).

% learn merge sort in the merge-then-sort curriculum
learn_merge_sort_in_episodes:-
    get_examples(merge,Pos1/Neg1),
    get_examples(merge_sort,Pos2/Neg2),
    assert(metaopt:max_clauses(4)),
    learn_seq([Pos1/Neg1,Pos2/Neg2],_),
    get_best_program(Prog),
    load_test_set(merge_sort,AllEx),
    accuracy(AllEx,Prog,test_pos_merge_sort,test_neg_merge_sort,A),
    format('% accuracy: ~w\n',[A]).