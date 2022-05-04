set_rand:-
    sleep(1),
    get_time(X),
    U is floor(X),
    set_random(seed(U)).

unwrap_comp_list(L,L1,L2) :-
    findall(T1,member(T1/_,L),L3),
    findall(T2,member(_/T2,L),L4),
    flatten(L3,L1),
    flatten(L4,L2).

accuracy(E,Prog,PosF,NegF,A) :-
    length(E,N),
    accuracy_aux(E,Prog,PosF,NegF,S),
    A is S/N.

label_examples(Es,PosF,NegF,Pos,Neg) :-
    findall(E,(member(E,Es),call(PosF,E)),Pos),
    findall(E,(member(E,Es),call(NegF,E)),Neg).

/**
 * compute accuracy when test examples are provided/given and pos/neg are mixed
 */
accuracy_aux(Es,Prog,PosF,NegF,S):-
    findall(E,(member(E,Es),call(PosF,E)),TestPos),
    score_pos(TestPos,Prog,S1),
    format('% score pos: ~w\n',[S1]),
    findall(E,(member(E,Es),call(NegF,E)),TestNeg),
    score_neg(TestNeg,Prog,S2),
    format('% score neg: ~w\n',[S2]),
    S is S1+S2.

score_pos([Atom|TestPos],Prog,S):-
    (deduce_atom_limit_time_pos(Atom,Prog,10) -> (S2 is 1); (S2 is 0)),
    score_pos(TestPos,Prog,S1),
    S is S1+S2.
score_pos([],_,0).

score_neg([Atom|TestNeg],Prog,S):-
    (deduce_atom_limit_time_neg(Atom,Prog,10) -> (S2 is 0); (S2 is 1)),
    score_neg(TestNeg,Prog,S1),
    S is S1+S2.
score_neg([],_,0).

code_to_atoms(Code,Term) :-
    atom_codes(Line,Code),
    term_to_atom(Term,Line).

assert_metarule_list(MRules) :-
    forall(member(M,MRules),(unwrap_metarule(M,U),assertz(metagol:U))).
unwrap_metarule(metarule(Name,Subs,Head,Body,Recursive,Path),
    metarule(Name,Subs,Head,Body,Recursive,Path)).
unwrap_metarule(metarule(Name,Subs,Head,Body,Recursive,Path):-Metabody,
    (metarule(Name,Subs,Head,Body,Recursive,Path):-Metabody)).
unwrap_metarule(metarule(Subs,Head,Body),Unwrapped):-
    metarule_asserts(_Name,Subs,Head,Body,_MetaBody,[Unwrapped]).
unwrap_metarule(metarule(Name,Subs,Head,Body),Unwrapped):-
    metarule_asserts(Name,Subs,Head,Body,_MetaBody,[Unwrapped]).
unwrap_metarule((metarule(Subs,Head,Body):-MetaBody),Unwrapped):-
    metarule_asserts(_Name,Subs,Head,Body,MetaBody,[Unwrapped]).
unwrap_metarule((metarule(Name,Subs,Head,Body):-MetaBody),Unwrapped):-
    metarule_asserts(Name,Subs,Head,Body,MetaBody,[Unwrapped]).

random_subset(S,N,S1):-
    random_permutation(S,S2),
    length(S1,N),
    append(S1,_,S2).

get_diff_arg_pos(I,Args1,V,Args3):-
    copy_term([Args1,Args3],[Args2,Args4]),
    copy_term([Args2,Args4],[Args5,Args6]),
    numbervars([Args2,Args4],26,_),
    nth0(I,Args2,_V,Args4),
    nth0(I,Args5,V,Args6).

deduce_atom_limit_time_pos(Atom,Prog,Timesec):-
    catch(call_with_time_limit(Timesec,deduce_atom(Atom,Prog)),
          time_limit_exceeded,fail).
deduce_atom_limit_time_neg(Atom,Prog,Timesec):-
    catch(call_with_time_limit(Timesec,deduce_atom(Atom,Prog)),
          time_limit_exceeded,true).

%% Data list format Name-[array of data]
save_data(Name,DataList):-
    open(Name,write,Out),
    forall(member(N-L,DataList),write_term(Out,N-L,[quoted(true),nl(true)])),
    close(Out).

load_data(Name,DataList) :-
    open(Name,read,In),
    findall(L,read_line_to_codes(In,L),Ls),
    close(In),
    findall(A,(member(L,Ls),code_to_atoms(L,A)),DataList).

create_exprs(L,L1):-
    findall(S,(member(U,L),atom_string(U,S)),L1).
create_exprs(L,[L2],Separator):-
    findall(S,(member(S,L),S\=""),L1),
    atomics_to_string(L1,Separator,L2).

exprs_to_ints(A,B):-
    findall(S,(member(Expr,A),split_string(Expr,"<","",S)),L),
    flatten(L,Strings),
    strings_2_ints(Strings,B).

strings_2_ints(A,B):-
    findall(I,(member(S,A),string_2_int(S,I)),B).

%% convert a number string into integer type
string_2_int(A,B):-
    string_2_int(A,1,0,B).
string_2_int(A,I,B,B):-
    string_length(A,L),
    I > L,!.
string_2_int(A,I,Count,B):-
    string_code(I,A,C),
    string_code(1,"0",C1),
    Count1 is 10*Count+(C-C1),
    succ(I,I1),
    string_2_int(A,I1,Count1,B).
