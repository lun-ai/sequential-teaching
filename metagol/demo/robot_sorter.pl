:-['background/robot_sorter.pl'].

metasort(A,B):-split(A,C),combine(C,B).
metasort(A,B):-metasort1(A,C),metasort(C,B).
metasort1(A,B):-pick_up_left(A,C),split(C,B).
metasort1(A,B):-combine(A,C),go_to_start(C,B).

test_examples(
        [
            f([5],[5]),
            f([1,3,5,2,4],[1,2,3,4,5]),
            f([5,10,2,8],[2,5,8,10]),
            f([1,2,4,6,7,5,9,11,12],[1,2,4,5,6,7,9,11,12])
        ]/[
            f([7,2,4],[7,2,4]),
            f([5,10,2,8],[2,8,5,10]),
            f([1,3,7,6],[1,7,6])
        ]
).

wrap_examples(T,E):-
    T=..[_,L1,L2],
    length(L1,N),
    A = [values(L1),energy(0),intervals([1-N]),robot_pos(1),holding_left(none),holding_right(none),left_bag([]),right_bag([])],
    B = [values(L2),energy(_),intervals(_),robot_pos(_),holding_left(_),holding_right(_),left_bag(_),right_bag(_)],
    E=..[metasort,A,B].

test_sorter:-
    gtrace,
    test_examples(Pos/Neg),
    forall(member(T,Pos),(wrap_examples(T,E),call(E))),
    forall(member(T,Neg),(wrap_examples(T,E),\+call(E))).
