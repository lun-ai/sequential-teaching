from psychopy import visual

class Task():

    def __init__(self, task, win):
        '''
        Loads necessary information to manage the task.

        PARAMETERS
        ----------
        task : dictionary containing the scrambled order, letter encryption and icon path
        win : PsychoPy Window
        '''

        self.win = win

        list = task['order']

        self.nitems = len(list)

        self.list = []
        for i in range(len(list)):
            a = []
            a.append(list[i])
            self.list.append(a)

        masks = task['mask']
        self.mask = []
        for i in range(len(masks)):
            a = []
            a.append(masks[i])
            self.mask.append(a)

        self.names = task['mask'].copy()
        
        # lesson learned: initialize it once, re-use it. No more initializing multiple objects every frame...

        self.icon = visual.ImageStim(win = self.win, image = task['icon'])
        self.background_rect = visual.Rect(win = self.win, fillColor = 'grey')

    def update(self):
        '''
        Sets up the visuals for the tasks and re-does it from scratch whenever called.
        '''

        SQUARE_SIZE = 0.08
        SQUARE_HEIGHT = SQUARE_SIZE * 16/9
        SQUARE_DIST = 0.05

        position = -(self.nitems * SQUARE_SIZE + (len(self.list) - 1) * SQUARE_DIST) / 2 + 0.225 + 0.045

        self.background = []
        self.fruits = []
        self.labels = []

        for i in self.list:
            i_i = self.list.index(i)
            for j in i:
                i_j = i.index(j)
                background = (position, 0.225)
                fruit = (position, 0.225) # no more initializing it every frame - yayyyy
                label = visual.TextStim(win = self.win, text = self.mask[i_i][i_j], color = 'black', pos = (position, 0.075))

                self.background.append(background)
                self.fruits.append(fruit)
                self.labels.append(label)

                position += SQUARE_SIZE

            position += SQUARE_DIST

        self.icon.size = (SQUARE_SIZE, SQUARE_HEIGHT)
        self.background_rect.size = (SQUARE_SIZE, SQUARE_HEIGHT)

    def draw(self):
        '''
        Draws all the visuals of the task.
        '''

        for i in self.background:
            self.background_rect.pos = i
            self.background_rect.draw()
        for i in self.fruits:
            self.icon.pos = i
            self.icon.draw()
        for i in self.labels:
            i.draw()

    def merge(self, x, y):
        '''
        Merges the two sublists with the given labels. Returns True if it actually did anything.

        PARAMETERS
        ---------
        x : string
        y : string

        RETURNS
        -------
        bool
        '''

        # Make sure nothing fonky happens whenever x and y are the same or one of the two is not in the
        # 'mergeable' list (self.names).

        if x == y or \
        x not in self.names or \
        y not in self.names:
            return False

        # Gather index to be used in the actual task-lists. This way the method requires string parameters
        # instead of list parameters.

        i_x = self.names.index(x)
        i_y = self.names.index(y)

        a = self.list[i_x]
        b = self.list[i_y]

        a_mask = self.mask[i_x]
        b_mask = self.mask[i_y]

        # Actually merging for real.

        merged_list = []
        merged_mask = []
        while len(a) > 0 or len(b) > 0:
            if len(a) > 0 and len(b) > 0:
                if a[0] > b[0]:
                    merged_list.append(b[0])
                    merged_mask.append(b_mask[0])
                    b.pop(0)
                    b_mask.pop(0)
                else:
                    merged_list.append(a[0])
                    merged_mask.append(a_mask[0])
                    a.pop(0)
                    a_mask.pop(0)
            elif len(a) > 0:
                for i in a:
                    merged_list.append(i)
                for j in a_mask:
                    merged_mask.append(j)
                a = []
                a_mask = []
            elif len(b) > 0:
                for i in b:
                    merged_list.append(i)
                for j in b_mask:
                    merged_mask.append(j)
                b = []
                b_mask = []

        # Tidy up everything. After these lines, the task object is ready to perform the next merge.

        if i_x > i_y:
            self.list.pop(i_x)
            self.list.pop(i_y)
            self.mask.pop(i_x)
            self.mask.pop(i_y)
            self.list.insert(i_y, merged_list)
            self.mask.insert(i_y, merged_mask)
            self.names.pop(i_x)
            self.names.pop(i_y)
            self.names.insert(i_y, merged_mask[0])
        elif i_x < i_y:
            self.list.pop(i_y)
            self.list.pop(i_x)
            self.mask.pop(i_y)
            self.mask.pop(i_x)
            self.list.insert(i_x, merged_list)
            self.mask.insert(i_x, merged_mask)
            self.names.pop(i_y)
            self.names.pop(i_x)
            self.names.insert(i_x, merged_mask[0])

        return True

    def merge_cost(self, x, y):
        '''
        Calculates the cost of the merge action without actually performing merge
        on the active task.

        PARAMTETERS:
        ------------
        x : String
        y : String

        RETRUNS:
        --------
        cost : int
        '''

        # Make sure nothing fonky happens whenever x and y are the same or one of the two is not in the
        # 'mergeable' list (self.names).

        if x == y or \
        x not in self.names or \
        y not in self.names:
            return 0

        # Initializing cost counter.

        cost = 0

        # Gather index to be used in the actual task-lists. This way the method requires string parameters
        # instead of list parameters.

        i_x = self.names.index(x)
        i_y = self.names.index(y)

        a = []
        b = []

        for i in self.list[i_x]:
            a.append(i)
        for i in self.list[i_y]:
            b.append(i)

        # Actually not merging for real (but counting how many comparisons it would take).

        while len(a) > 0 or len(b) > 0:
            if len(a) > 0 and len(b) > 0:
                if a[0] > b[0]:
                    b.pop(0)
                    cost += 1
                else:
                    a.pop(0)
                    cost += 1
            else:
                a = []
                b = []

        return cost

