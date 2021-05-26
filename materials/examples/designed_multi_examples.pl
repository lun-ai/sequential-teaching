examples(

    % example01 SIMPLE
    ex(1,
        eggs_multi(s([[black,red,black,blue,blue],[blue,blue,orange,black,white],[white,black,orange,blue,orange],[red,orange,white,white,red],[]],[[empty,empty,empty,empty],[empty,empty,empty,empty]],[[blue,red,white,black],[blue,orange,black,red]],[],[]),
        _
    )),

    % example02 SIMPLE
    ex(2,
        eggs_multi(s([[white,black,orange,black,blue],[blue,white,white,red,white],[white,red,black,blue,blue],[red,orange,red,white,black],[]],[[empty,empty,empty,empty],[empty,empty,empty,empty]],[[red,white,white,blue],[orange,red,black,white]],[],[]),
        _
    )),

    % example04 SIMPLE
    ex(4,eggs_multi(s([[blue,blue,orange,black,blue],[white,orange,black,white,red],[orange,white,black,blue,white],[white,black,red,blue,black],[]],[[empty,empty,empty,empty],[empty,empty,empty,empty]],[[white,black,blue,orange],[red,blue,blue,white]],[],[]),
        _
    )),

    % example05 SIMPLE
    ex(5,eggs_multi(s([[white,black,white,black,white,black,white],[white,orange,red,blue,white,black,black],[orange,orange,red,red,white,blue,black],[red,blue,red,blue,white,orange,red],[]],[[empty,empty,empty,empty,empty],[empty,empty,empty,empty,empty]],[[white,orange,red,blue,black],[white,orange,red,blue,black]],[],[]),
        _
    )),

    % example17 SIMPLE
    ex(17,eggs_multi(s([[blue,orange,black,black,orange,white,red,red,blue,red,white],[red,white,red,red,orange,red,blue,orange,red,blue,white],[orange,blue,blue,white,red,black,white,black,white,blue,blue],[white,white,red,black,blue,red,orange,white,red,black,blue],[black,black,black,orange,blue,red,red,white,orange,blue,red]],[[empty,empty,empty,empty],[empty,empty,empty,empty],[empty,empty,empty,empty],[empty,empty,empty,empty]],[[white,orange,black,blue],[white,blue,black,orange],[red,blue,black,black],[black,white,orange,black]],[],[]),
        _
    )),

    % example19 SIMPLE
    ex(19,eggs_multi(s([[orange,red,black,red,orange,white,red,red,blue,red,white],[red,white,white,orange,orange,red,blue,orange,red,blue,white],[blue,blue,black,red,red,black,white,black,white,blue,blue],[orange,black,black,black,blue,red,orange,white,red,black,blue],[orange,blue,orange,red,black,blue,white,red,orange,blue,red]],[[empty,empty,empty,empty],[empty,empty,empty,empty],[empty,empty,empty,empty],[empty,empty,empty,empty]],[[orange,blue,orange,red],[black,blue,red,white],[black,black,black,white],[black,red,red,orange]],[],[]),
        _
    )),

    % example3 MEDIUM
    ex(3,eggs_multi(s([[red,blue,orange,black,blue],[red,black,orange,white,red],[red,white,black,blue,white],[black,orange,red,white,black],[]],[[empty,empty,empty,empty],[empty,empty,empty,empty]],[[red,red,red,black],[orange,blue,white,white]],[],[]),
        _
    )),

    % example6 MEDIUM
    ex(6,eggs_multi(s([[blue,orange,white,black,white,black,white],[white,black,white,white,white,black,black],[orange,blue,red,red,white,blue,black],[white,black,red,blue,white,orange,red],[]],[[empty,empty,empty,empty,empty],[empty,empty,empty,empty,empty]],[[white,orange,white,blue,black],[black,blue,white,orange,white]],[],[]),
        _
    )),

    % example7 MEDIUM
    ex(7,eggs_multi(s([[black,orange,white,blue,white,black,white],[blue,red,white,white,orange,blue,black],[black,blue,black,red,orange,orange,white],[orange,red,red,blue,white,orange,red],[]],[[empty,empty,empty,empty,empty],[empty,empty,empty,empty,empty]],[[black,blue,black,red,orange],[orange,white,blue,white,red]],[],[]),
        _
    )),

    % example9 MEDIUM
    ex(9,eggs_multi(s([[black,black,red,white,red,red,orange,white,blue],[red,black,white,black,orange,red,blue,white,blue],[white,white,black,black,white,orange,white,blue,orange],[],[]],[[empty,empty,empty,empty],[empty,empty,empty,empty],[empty,empty,empty,empty]],[[black,white,black,white],[red,black,white,black],[red,white,red,orange]],[],[]),
        _
    )),

    % example11 MEDIUM
    ex(11,eggs_multi(s([[black,red,black,black,orange,red,white,white,blue],[black,white,black,orange,red,blue,white,orange,orange],[black,black,blue,red,orange,black,white,blue,orange],[],[]],[[empty,empty,empty,empty],[empty,empty,empty,empty],[empty,empty,empty,empty]],[[black,white,black,black],[orange,red,blue,red],[white,orange,orange,black]],[],[]),
        _
    )),

    % example12 MEDIUM
    ex(12,eggs_multi(s([[blue,red,orange,black,black,red,white,white,blue],[red,red,red,red,red,blue,black,black,orange],[red,blue,orange,blue,white,orange,white,blue,black],[],[]],[[empty,empty,empty,empty],[empty,empty,empty,empty],[empty,empty,empty,empty]],[[red,red,blue,blue],[orange,red,blue,red],[white,red,orange,orange]],[],[]),
        _
    )),

    % example14 MEDIUM
    ex(14,eggs_multi(s([[blue,white,blue,black,black,blue,blue,white,blue,white,white],[blue,white,black,white,orange,red,red,white,red,black,white],[white,black,blue,red,orange,blue,red,white,blue,white,white],[red,black,white,blue,white,white,black,white,blue,black,black],[black,red,black,red,blue,black,red,orange,white,white,orange]],[[empty,empty,empty,empty,empty,empty],[empty,empty,empty,empty,empty,empty],[empty,empty,empty,empty,empty,empty]],[[red,blue,white,blue,black,black],[black,white,blue,white,red,red],[white,black,orange,blue,black,blue]],[],[]),
        _
    )),

    % example15 MEDIUM
    ex(15,eggs_multi(s([[orange,white,white,blue,black,blue,blue,white,blue,white,white],[orange,orange,white,white,orange,red,red,white,red,black,white],[orange,orange,orange,black,blue,white,red,white,blue,white,white],[orange,white,blue,blue,white,white,black,white,blue,black,black],[white,blue,black,orange,black,white,red,orange,white,white,orange]],[[empty,empty,empty,empty,empty,empty],[empty,empty,empty,empty,empty,empty],[empty,empty,empty,empty,empty,empty]],[[orange,orange,orange,white,white,blue],[orange,black,white,blue,black,orange],[blue,white,black,blue,black,white]],[],[]),
        _
    )),

    % example16 MEDIUM
    ex(16,eggs_multi(s([[white,red,black,orange,white,white,blue,white,blue,white,white],[red,orange,white,white,orange,red,red,white,red,black,white],[orange,orange,orange,black,blue,white,red,white,blue,white,white],[orange,blue,blue,blue,orange,red,black,white,blue,black,black],[white,red,black,blue,white,white,red,orange,white,white,orange]],[[empty,empty,empty,empty,empty,empty],[empty,empty,empty,empty,empty,empty],[empty,empty,empty,empty,empty,empty]],[[white,orange,orange,red,red,blue],[black,blue,orange,orange,blue,blue],[white,orange,orange,white,white,red]],[],[]),
        _
    )),

    % example18 MEDIUM
    ex(18,eggs_multi(s([[black,orange,blue,black,orange,white,red,red,blue,red,white],[red,white,red,red,orange,red,blue,orange,red,blue,white],[black,black,black,black,red,black,white,black,white,blue,blue],[black,blue,orange,black,blue,red,orange,white,red,black,blue],[black,red,black,red,orange,white,white,red,orange,blue,red]],[[empty,empty,empty,empty],[empty,empty,empty,empty],[empty,empty,empty,empty],[empty,empty,empty,empty]],[[black,black,black,red],[black,blue,black,red],[black,orange,orange,white],[black,black,white,red]],[],[]),
        _
    )),

    % example21 MEDIUM
    ex(21,eggs_multi(s([[black,blue,white,orange,black,red,orange,white,orange,orange,white],[blue,black,blue,blue,white,orange,white,red,orange,black,orange],[white,black,black,black,red,black,orange,orange,red,blue,white],[red,white,red,black,black,orange,red,blue,orange,orange,white],[]],[[empty,empty,empty,empty,empty,empty,empty],[empty,empty,empty,empty,empty,empty,empty]],[[red,white,blue,white,black,black,black],[red,black,blue,black,black,blue,blue]],[],[]),
        _
    )),

    % example8 HARD
    ex(8,eggs_multi(s([[orange,blue,red,blue,orange,black,white],[black,orange,white,white,orange,blue,black],[black,orange,orange,red,red,orange,white],[white,orange,red,blue,white,orange,red],[]],[[empty,empty,empty,empty,empty],[empty,empty,empty,empty,empty]],[[orange,blue,white,black,orange],[red,blue,orange,orange,red]],[],[]),
        _
    )),

    % example10 HARD
    ex(10,eggs_multi(s([[blue,black,blue,black,orange,red,white,white,blue],[orange,blue,black,black,orange,red,blue,white,blue],[blue,black,black,orange,white,white,white,blue,orange],[],[]],[[empty,empty,empty,empty],[empty,empty,empty,empty],[empty,empty,empty,empty]],[[blue,orange,black,blue],[black,blue,orange,red],[white,black,white,blue]],[],[]),
        _
    )),

    % example13 HARD
    ex(13,eggs_multi(s([[orange,red,red,black,black,blue,blue,white,blue,white,white],[white,white,white,white,orange,red,red,white,red,black,white],[black,blue,black,white,blue,orange,red,white,blue,white,white],[white,orange,white,blue,white,white,black,white,blue,black,black],[orange,blue,blue,red,blue,black,red,orange,white,white,orange]],[[empty,empty,empty,empty,empty,empty],[empty,empty,empty,empty,empty,empty],[empty,empty,empty,empty,empty,empty]],[[orange,white,orange,black,red,red],[black,white,blue,blue,black,blue],[blue,white,white,black,white,blue]],[],[]),
        _
    )),

    % example20 HARD
    ex(20,eggs_multi(s([[blue,orange,red,orange,orange,white,red,red,blue,red,white],[blue,blue,blue,orange,orange,red,blue,orange,red,blue,white],[red,white,orange,white,red,black,white,black,white,blue,blue],[red,white,white,black,orange,black,white,blue,red,black,blue],[white,black,black,red,black,blue,white,red,orange,blue,red]],[[empty,empty,empty,empty],[empty,empty,empty,empty],[empty,empty,empty,empty],[empty,empty,empty,empty]],[[blue,red,blue,white],[blue,white,orange,black],[blue,orange,red,black],[orange,white,orange,blue]],[],[]),
        _
    )),

    % example22 HARD
    ex(22,eggs_multi(s([[orange,blue,white,orange,black,red,orange,white,orange,orange,white],[orange,white,black,red,orange,red,white,red,orange,black,orange],[orange,red,red,red,red,black,orange,orange,red,blue,white],[orange,red,orange,red,black,orange,red,blue,orange,orange,white],[]],[[empty,empty,empty,empty,empty,empty,empty],[empty,empty,empty,empty,empty,empty,empty]],[[orange,red,orange,orange,white,black,red],[red,red,red,blue,orange,red,black]],[],[]),
        _
    )),

    % example23 HARD
    ex(23,eggs_multi(s([[black,red,white,orange,black,red,orange,white,orange,orange,white],[red,white,white,orange,orange,red,white,red,orange,black,orange],[red,blue,black,red,blue,red,red,orange,red,blue,white],[red,blue,white,white,blue,red,black,blue,orange,orange,white],[]],[[empty,empty,empty,empty,empty,empty,empty],[empty,empty,empty,empty,empty,empty,empty]],[[red,blue,black,red,white,white,white],[blue,red,red,white,black,orange,blue]],[],[]),
        _
    )),

    % example24 HARD
    ex(24,eggs_multi(s([[red,orange,red,orange,white,black,orange,white,black,black,white],[red,blue,red,blue,blue,white,white,black,white,orange,white],[red,black,blue,black,white,red,red,red,orange,white,black],[blue,black,red,blue,white,blue,blue,blue,red,red,white],[red,red,red,blue,blue,white,orange,white,black,black,white]],[[empty,empty,empty,empty,empty,empty],[empty,empty,empty,empty,empty,empty],[empty,empty,empty,empty,empty,empty],[empty,empty,empty,empty,empty,empty],[empty,empty,empty,empty,empty,empty]],[[red,red,red,blue,black,black],[orange,blue,blue,red,black,blue],[red,red,white,white,red,blue],[orange,blue,red,blue,red,blue],[white,blue,orange,red,white,red]],[],[]),
        _
    )),

    % example25 HARD
    ex(25,eggs_multi(s([[white,black,orange,orange,blue,black,orange,white,black,black,white],[red,black,red,white,white,white,blue,white,blue,black,white],[red,red,red,white,red,orange,red,red,blue,blue,black],[orange,black,orange,white,white,blue,blue,blue,red,red,white],[white,black,white,black,white,black,orange,blue,orange,black,white]],[[empty,empty,empty,empty,empty,empty],[empty,empty,empty,empty,empty,empty],[empty,empty,empty,empty,empty,empty],[empty,empty,empty,empty,empty,empty],[empty,empty,empty,empty,empty,empty]],[[white,red,red,red,black,black],[white,red,red,white,white,black],[white,white,red,orange,white,black],[orange,blue,red,red,white,blue],[orange,blue,blue,blue,black,black]],[],[]),
        _
    ))

).