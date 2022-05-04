pos_cost(Goal,Cost):-
    (functor(Goal,_,0) -> pos_cost_monadic(Goal,Cost); pos_cost_general(Goal,Cost)).
neg_cost(Goal,Cost):-
    (functor(Goal,_,0) -> neg_cost_monadic(Goal,Cost); neg_cost_general(Goal,Cost)).

pos_cost_general(Goal,Cost):-
    Goal=..[P,A,B],
    call(P,A,B),
    record_energy(A,Cost1),
    record_energy(B,Cost2),
    Cost is Cost2-Cost1.

neg_cost_monadic(_,0).
neg_cost_general(_,0).