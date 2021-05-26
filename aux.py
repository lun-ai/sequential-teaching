# Example of a parsing target
# ex(
#             1,
#             eggs(
#                 s(
#                     [
#                         [white,blue,black,black,orange],
#                         [white,red,white,orange,black],
#                         [orange,orange,blue,red,white],
#                         [],
#                         []
#                     ],
#                     [[empty,empty,empty,empty,empty]],
#                     [[white,blue,orange,white,orange]],
#                     [],
#                     []
#                 ),
#                 _
#             )
#         )

PATH_MULTI = 'materials/examples/designed_muti_examples.pl'
PATH_SINGLE = 'materials/examples/designed_single_examples.pl'

WHITE = 'FFFFFF'
BLUE = '09A1FE'
BLACK = '000000'
ORANGE = 'FA7600'
RED = 'F13D3D'
GREY = 'C1BBB7'

COLOURS = {
    'white':WHITE,
    'blue':BLUE,
    'black':BLACK,
    'orange':ORANGE,
    'red': RED,
    'empty': GREY,
}

# parse examples import included .pl file
def parse_example_from_file(path):
    str = ''
    with open(path,'r') as file:
        for line in file:
            if len(line.split('%')) > 1:
                continue
            str += line.strip('\n').strip(' ')

    ex_list = str.strip('examples([').strip(']/[]).').split('ex')
    dicts = [parse_example(ex) for ex in ex_list]
    return dicts

# parse each example
def parse_example(str):
    dict = {}
    substrs = str.strip('),_)').split(',',1)
    id = substrs[0]
    state_str = substrs[1].strip('eggs_multi(s(').strip('eggs(s(').split('],')
    lists = [parse_colour_list(s) for s in state_str]
    if lists[:5] == [[],[],[],[],[]]:
        return dict
    template_size = (len(lists[5:]) - 2) // 2
    dict['id'] = id
    dict['tubes'] = lists[:5]
    dict['answers'] = lists[5:(5 + template_size)]
    dict['template'] = lists[(5 + template_size):(5 + template_size * 2)]
    dict['seq'] = []
    dict['all_seq'] = []
    return dict

# parse the internal data structure
def parse_colour_list(str):
    new_str = str.strip('[').strip(']').split(',')
    new_str = filter(lambda x: x in COLOURS, new_str)
    new_str = list(map(lambda x: COLOURS[x], new_str))
    return new_str

for d in parse_example_from_file(PATH_SINGLE):
    print(d)