import json
from psychopy import data, visual

class Abort(Exception):
    '''
    Allows killing the application from anywhere, used in __exit__() of SortContext.
    '''

    pass

class SortContext():
    '''
    Think of it as the "SortTraining" class.
    '''

    def __init__(self, file):
        '''
        Stores the settings-file as an attribute of the SortContext object.

        PARAMETERS
        ----------
        file : .json file
        '''

        self.file = file

    def __enter__(self):
        '''
        Opens the window and loads the settings-file

        RETURNS
        -------
        SortContext Object
        '''

        with open(self.file) as json_file:
            self.settings = json.load(json_file)

        self.win = visual.Window(fullscr = True, units = 'norm')
        
        self.tasks = []

        self.tasks.append(self.settings['task01'])
        self.tasks.append(self.settings['task02'])
        self.tasks.append(self.settings['task03'])
        self.tasks.append(self.settings['task04'])
        self.tasks.append(self.settings['task05'])
        # atm you need to specify here whenever a new task is added. There probably is a
        # better way to do it given more time.

        self.data = data.ExperimentHandler(name = self.settings['logging']['name'],
            version = self.settings['logging']['version'])

        return self

    def __exit__(self, exc_type, exc_value, traceback):
        '''
        Closes the window, saves the log file.
        '''

        self.data.saveAsWideText(fileName = self.settings['logging']['filename'],
            delim = self.settings['logging']['delim'])
        self.win.close()
        if exc_type == Abort:
            return True