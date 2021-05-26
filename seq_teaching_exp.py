#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
This experiment was created using PsychoPy3 Experiment Builder (v2021.1.4),
    on Wed 26 May 2021 13:15:20 BST
If you publish work using this script the most relevant publication is:

    Peirce J, Gray JR, Simpson S, MacAskill M, Höchenberger R, Sogo H, Kastman E, Lindeløv JK. (2019) 
        PsychoPy2: Experiments in behavior made easy Behav Res 51: 195. 
        https://doi.org/10.3758/s13428-018-01193-y

"""

from __future__ import absolute_import, division

from psychopy import locale_setup
from psychopy import prefs
from psychopy import sound, gui, visual, core, data, event, logging, clock, colors
from psychopy.constants import (NOT_STARTED, STARTED, PLAYING, PAUSED,
                                STOPPED, FINISHED, PRESSED, RELEASED, FOREVER)

import numpy as np  # whole numpy lib is available, prepend 'np.'
from numpy import (sin, cos, tan, log, log10, pi, average,
                   sqrt, std, deg2rad, rad2deg, linspace, asarray)
from numpy.random import random, randint, normal, shuffle, choice as randchoice
import os  # handy system and path functions
import sys  # to get file system encoding

from psychopy.hardware import keyboard

import time
LOCK_ON=True
LOCK_OFF=False
btn_locks={}


# Ensure that relative paths start from the same directory as this script
_thisDir = os.path.dirname(os.path.abspath(__file__))
os.chdir(_thisDir)

# Store info about the experiment session
psychopyVersion = '2021.1.4'
expName = 'seq_teaching_exp'  # from the Builder filename that created this script
expInfo = {'participant': '', 'session': '001'}
dlg = gui.DlgFromDict(dictionary=expInfo, sortKeys=False, title=expName)
if dlg.OK == False:
    core.quit()  # user pressed cancel
expInfo['date'] = data.getDateStr()  # add a simple timestamp
expInfo['expName'] = expName
expInfo['psychopyVersion'] = psychopyVersion

# Data file name stem = absolute path + name; later add .psyexp, .csv, .log, etc
filename = _thisDir + os.sep + u'data/%s_%s_%s' % (expInfo['participant'], expName, expInfo['date'])

# An ExperimentHandler isn't essential but helps with data saving
thisExp = data.ExperimentHandler(name=expName, version='',
    extraInfo=expInfo, runtimeInfo=None,
    originPath='/home/lun/workspace/seq_teaching_interface/seq_teaching_exp.py',
    savePickle=True, saveWideText=True,
    dataFileName=filename)
# save a log file for detail verbose info
logFile = logging.LogFile(filename+'.log', level=logging.EXP)
logging.console.setLevel(logging.WARNING)  # this outputs to the screen, not a file

endExpNow = False  # flag for 'escape' or other condition => quit the exp
frameTolerance = 0.001  # how close to onset before 'same' frame

# Start Code - component code to be run after the window creation

# Setup the Window
win = visual.Window(
    size=(1024, 768), fullscr=True, screen=0, 
    winType='pyglet', allowGUI=False, allowStencil=False,
    monitor='testMonitor', color=[0,0,0], colorSpace='rgb',
    blendMode='avg', useFBO=True, 
    units='height')
# store frame rate of monitor if we can measure it
expInfo['frameRate'] = win.getActualFrameRate()
if expInfo['frameRate'] != None:
    frameDur = 1.0 / round(expInfo['frameRate'])
else:
    frameDur = 1.0 / 60.0  # could not measure, so guess

# create a default keyboard (e.g. to check for escape)
defaultKeyboard = keyboard.Keyboard()

# Initialize components for Routine "Briefing"
BriefingClock = core.Clock()
gen_info = visual.TextStim(win=win, name='gen_info',
    text='Some initial general information:\n\nTBC',
    font='Open Sans',
    pos=(0, 0), height=0.05, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=0.0);
brf_btn = visual.ButtonStim(win, 
   text='Next', font='Arvo',
   pos=(0, -0.45),
   letterHeight=0.05,
   size=[0.2,0.1], borderWidth=0.0,
   fillColor='white', borderColor='black',
   color='black', colorSpace='rgb',
   opacity=None,
   bold=True, italic=False,
   padding=None,
   anchor='center',
   name='brf_btn')
brf_btn.buttonClock = core.Clock()

# Initialize components for Routine "Raven_Matrices"
Raven_MatricesClock = core.Clock()
rv_txt1 = visual.TextStim(win=win, name='rv_txt1',
    text='Pre-training phase',
    font='Open Sans',
    pos=(0, 0), height=0.05, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=0.0);
rv_btn1 = visual.ButtonStim(win, 
   text='Next', font='Arvo',
   pos=(0, -0.45),
   letterHeight=0.05,
   size=[0.2,0.1], borderWidth=0.0,
   fillColor='white', borderColor=None,
   color='black', colorSpace='rgb',
   opacity=None,
   bold=True, italic=False,
   padding=None,
   anchor='center',
   name='rv_btn1')
rv_btn1.buttonClock = core.Clock()

# Initialize components for Routine "Instructions_1"
Instructions_1Clock = core.Clock()
instr1_txt1 = visual.TextStim(win=win, name='instr1_txt1',
    text='Some instructions for the performance questions\n',
    font='Open Sans',
    pos=(0, 0.3), height=0.05, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=0.0);
instr1_btn3 = visual.ButtonStim(win, 
   text='Next', font='Arvo',
   pos=(0, -0.45),
   letterHeight=0.05,
   size=[0.2,0.1], borderWidth=0.0,
   fillColor='white', borderColor=None,
   color='black', colorSpace='rgb',
   opacity=0.0,
   bold=True, italic=False,
   padding=None,
   anchor='center',
   name='instr1_btn3')
instr1_btn3.buttonClock = core.Clock()
instr1_ex3 = visual.ImageStim(
    win=win,
    name='instr1_ex3', 
    image='materials/demo_imgs/[SINGLE - SIMPLE] example 16.png', mask=None,
    ori=0.0, pos=(0, 0), size=[1,0.5],
    color=[1,1,1], colorSpace='rgb', opacity=0.0,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-2.0)
instr1_btn2 = visual.ButtonStim(win, 
   text='Next', font='Arvo',
   pos=(0, -0.45),
   letterHeight=0.05,
   size=[0.2,0.1], borderWidth=0.0,
   fillColor='white', borderColor=None,
   color='black', colorSpace='rgb',
   opacity=0.0,
   bold=True, italic=False,
   padding=None,
   anchor='center',
   name='instr1_btn2')
instr1_btn2.buttonClock = core.Clock()
instr1_ex2 = visual.ImageStim(
    win=win,
    name='instr1_ex2', 
    image='materials/demo_imgs/[SINGLE - SIMPLE] example 09.png', mask=None,
    ori=0.0, pos=(0, 0), size=[1,0.5],
    color=[1,1,1], colorSpace='rgb', opacity=0.0,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-4.0)
instr1_btn1 = visual.ButtonStim(win, 
   text='Next', font='Arvo',
   pos=(0, -0.45),
   letterHeight=0.05,
   size=[0.2,0.1], borderWidth=0.0,
   fillColor='white', borderColor=None,
   color='black', colorSpace='rgb',
   opacity=1.0,
   bold=True, italic=False,
   padding=None,
   anchor='center',
   name='instr1_btn1')
instr1_btn1.buttonClock = core.Clock()
instr1_ex1 = visual.ImageStim(
    win=win,
    name='instr1_ex1', 
    image='materials/demo_imgs/[SINGLE - SIMPLE] example 07.png', mask=None,
    ori=0.0, pos=(0, 0), size=[1,0.5],
    color=[1,1,1], colorSpace='rgb', opacity=1.0,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-6.0)

# Initialize components for Routine "Training_1"
Training_1Clock = core.Clock()
train1_num = visual.TextStim(win=win, name='train1_num',
    text='Training example 1 (this could be removed)',
    font='Open Sans',
    pos=(-0.4, 0.45), height=0.02, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=0.0);
train1_txt1 = visual.TextStim(win=win, name='train1_txt1',
    text='Revised instructions for user operation.',
    font='Open Sans',
    pos=(0.4, 0.1), height=0.03, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-1.0);
train1_btn5 = visual.ButtonStim(win, 
   text='Next', font='Arvo',
   pos=(-0.4, -0.45),
   letterHeight=0.05,
   size=[0.2,0.1], borderWidth=0.0,
   fillColor='white', borderColor=None,
   color='black', colorSpace='rgb',
   opacity=0.0,
   bold=True, italic=False,
   padding=None,
   anchor='center',
   name='train1_btn5')
train1_btn5.buttonClock = core.Clock()
train1_ex5 = visual.ImageStim(
    win=win,
    name='train1_ex5', 
    image='materials/demo_imgs/[SINGLE - SIMPLE] example 20.png', mask=None,
    ori=0.0, pos=(-0.4, 0.0), size=[0.7,0.7],
    color=[1,1,1], colorSpace='rgb', opacity=0.0,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-3.0)
train1_btn4 = visual.ButtonStim(win, 
   text='Next', font='Arvo',
   pos=(-0.4, -0.45),
   letterHeight=0.05,
   size=[0.2,0.1], borderWidth=0.0,
   fillColor='white', borderColor=None,
   color='black', colorSpace='rgb',
   opacity=0.0,
   bold=True, italic=False,
   padding=None,
   anchor='center',
   name='train1_btn4')
train1_btn4.buttonClock = core.Clock()
train1_ex4 = visual.ImageStim(
    win=win,
    name='train1_ex4', 
    image='materials/demo_imgs/[SINGLE - SIMPLE] example 17.png', mask=None,
    ori=0.0, pos=(-0.4, 0.0), size=[0.7,0.7],
    color=[1,1,1], colorSpace='rgb', opacity=0.0,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-5.0)
train1_btn3 = visual.ButtonStim(win, 
   text='Next', font='Arvo',
   pos=(-0.4, -0.45),
   letterHeight=0.05,
   size=[0.2,0.1], borderWidth=0.0,
   fillColor='white', borderColor=None,
   color='black', colorSpace='rgb',
   opacity=0.0,
   bold=True, italic=False,
   padding=None,
   anchor='center',
   name='train1_btn3')
train1_btn3.buttonClock = core.Clock()
train1_ex3 = visual.ImageStim(
    win=win,
    name='train1_ex3', 
    image='materials/demo_imgs/[SINGLE - SIMPLE] example 16.png', mask=None,
    ori=0.0, pos=(-0.4, 0.0), size=[0.7,0.7],
    color=[1,1,1], colorSpace='rgb', opacity=0.0,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-7.0)
train1_btn2 = visual.ButtonStim(win, 
   text='Next', font='Arvo',
   pos=(-0.4, -0.45),
   letterHeight=0.05,
   size=[0.2,0.1], borderWidth=0.0,
   fillColor='white', borderColor=None,
   color='black', colorSpace='rgb',
   opacity=0.0,
   bold=True, italic=False,
   padding=None,
   anchor='center',
   name='train1_btn2')
train1_btn2.buttonClock = core.Clock()
train1_ex2 = visual.ImageStim(
    win=win,
    name='train1_ex2', 
    image='materials/demo_imgs/[SINGLE - SIMPLE] example 09.png', mask=None,
    ori=0.0, pos=(-0.4, 0.0), size=[0.7,0.7],
    color=[1,1,1], colorSpace='rgb', opacity=0.0,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-9.0)
train1_btn1 = visual.ButtonStim(win, 
   text='Next', font='Arvo',
   pos=(-0.4, -0.45),
   letterHeight=0.05,
   size=[0.2,0.1], borderWidth=0.0,
   fillColor='white', borderColor=None,
   color='black', colorSpace='rgb',
   opacity=1.0,
   bold=True, italic=False,
   padding=None,
   anchor='center',
   name='train1_btn1')
train1_btn1.buttonClock = core.Clock()
train1_ex1 = visual.ImageStim(
    win=win,
    name='train1_ex1', 
    image='materials/demo_imgs/[SINGLE - SIMPLE] example 07.png', mask=None,
    ori=0.0, pos=(-0.4, 0.0), size=[0.7,0.7],
    color=[1,1,1], colorSpace='rgb', opacity=1.0,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-11.0)
train1_bg1 = visual.ImageStim(
    win=win,
    name='train1_bg1', 
    image='materials/demo_imgs/white_BG.png', mask=None,
    ori=0.0, pos=(0.4, 0.3), size=(0.7, 0.3),
    color=[255,255,255], colorSpace='rgb', opacity=1.0,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-12.0)
train1_bg2 = visual.ImageStim(
    win=win,
    name='train1_bg2', 
    image='materials/demo_imgs/white_BG.png', mask=None,
    ori=0.0, pos=(0.4, -0.2), size=(0.7, 0.5),
    color='white', colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-13.0)

# Initialize components for Routine "Performance_1"
Performance_1Clock = core.Clock()
perf1_num = visual.TextStim(win=win, name='perf1_num',
    text='Test example 1 (this could be removed)',
    font='Open Sans',
    pos=(-0.4, 0.45), height=0.02, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=0.0);
perf1_txt1 = visual.TextStim(win=win, name='perf1_txt1',
    text='Revised instructions for user operation.',
    font='Open Sans',
    pos=(0.4, 0.1), height=0.03, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-1.0);
perf1_btn5 = visual.ButtonStim(win, 
   text='Next', font='Arvo',
   pos=(-0.4, -0.45),
   letterHeight=0.05,
   size=[0.2,0.1], borderWidth=0.0,
   fillColor='white', borderColor=None,
   color='black', colorSpace='rgb',
   opacity=0.0,
   bold=True, italic=False,
   padding=None,
   anchor='center',
   name='perf1_btn5')
perf1_btn5.buttonClock = core.Clock()
perf1_ex5 = visual.ImageStim(
    win=win,
    name='perf1_ex5', 
    image='materials/demo_imgs/[SINGLE - SIMPLE] example 20.png', mask=None,
    ori=0.0, pos=(-0.4, 0.0), size=[0.7,0.7],
    color=[1,1,1], colorSpace='rgb', opacity=0.0,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-3.0)
perf1_btn4 = visual.ButtonStim(win, 
   text='Next', font='Arvo',
   pos=(-0.4, -0.45),
   letterHeight=0.05,
   size=[0.2,0.1], borderWidth=0.0,
   fillColor='white', borderColor=None,
   color='black', colorSpace='rgb',
   opacity=0.0,
   bold=True, italic=False,
   padding=None,
   anchor='center',
   name='perf1_btn4')
perf1_btn4.buttonClock = core.Clock()
perf1_ex4 = visual.ImageStim(
    win=win,
    name='perf1_ex4', 
    image='materials/demo_imgs/[SINGLE - SIMPLE] example 17.png', mask=None,
    ori=0.0, pos=(-0.4, 0.0), size=[0.7,0.7],
    color=[1,1,1], colorSpace='rgb', opacity=0.0,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-5.0)
perf1_btn3 = visual.ButtonStim(win, 
   text='Next', font='Arvo',
   pos=(-0.4, -0.45),
   letterHeight=0.05,
   size=[0.2,0.1], borderWidth=0.0,
   fillColor='white', borderColor=None,
   color='black', colorSpace='rgb',
   opacity=0.0,
   bold=True, italic=False,
   padding=None,
   anchor='center',
   name='perf1_btn3')
perf1_btn3.buttonClock = core.Clock()
perf1_ex3 = visual.ImageStim(
    win=win,
    name='perf1_ex3', 
    image='materials/demo_imgs/[SINGLE - SIMPLE] example 16.png', mask=None,
    ori=0.0, pos=(-0.4,0.0), size=[0.7,0.7],
    color=[1,1,1], colorSpace='rgb', opacity=0.0,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-7.0)
perf1_btn2 = visual.ButtonStim(win, 
   text='Next', font='Arvo',
   pos=(-0.4, -0.45),
   letterHeight=0.05,
   size=[0.2,0.1], borderWidth=0.0,
   fillColor='white', borderColor=None,
   color='black', colorSpace='rgb',
   opacity=0.0,
   bold=True, italic=False,
   padding=None,
   anchor='center',
   name='perf1_btn2')
perf1_btn2.buttonClock = core.Clock()
perf1_ex2 = visual.ImageStim(
    win=win,
    name='perf1_ex2', 
    image='materials/demo_imgs/[SINGLE - SIMPLE] example 09.png', mask=None,
    ori=0.0, pos=(-0.4, 0.0), size=[0.7,0.7],
    color=[1,1,1], colorSpace='rgb', opacity=0.0,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-9.0)
perf1_btn1 = visual.ButtonStim(win, 
   text='Next', font='Arvo',
   pos=(-0.4, -0.45),
   letterHeight=0.05,
   size=[0.2,0.1], borderWidth=0.0,
   fillColor='white', borderColor=None,
   color='black', colorSpace='rgb',
   opacity=1.0,
   bold=True, italic=False,
   padding=None,
   anchor='center',
   name='perf1_btn1')
perf1_btn1.buttonClock = core.Clock()
perf1_ex1 = visual.ImageStim(
    win=win,
    name='perf1_ex1', 
    image='materials/demo_imgs/[SINGLE - SIMPLE] example 07.png', mask=None,
    ori=0.0, pos=(-0.4, 0.0), size=[0.7,0.7],
    color=[1,1,1], colorSpace='rgb', opacity=1.0,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-11.0)
perf1_bg1 = visual.ImageStim(
    win=win,
    name='perf1_bg1', 
    image='materials/demo_imgs/white_BG.png', mask=None,
    ori=0.0, pos=(0.4, 0.3), size=(0.7, 0.3),
    color=[255,255,255], colorSpace='rgb', opacity=1.0,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-12.0)
perf1_bg2 = visual.ImageStim(
    win=win,
    name='perf1_bg2', 
    image='materials/demo_imgs/white_BG.png', mask=None,
    ori=0.0, pos=(0.4, -0.2), size=(0.7, 0.5),
    color='white', colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-13.0)

# Initialize components for Routine "Instructions_2"
Instructions_2Clock = core.Clock()
instr2_txt1 = visual.TextStim(win=win, name='instr2_txt1',
    text='Some instructions for the performance questions\n',
    font='Open Sans',
    pos=(0, 0.3), height=0.05, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=0.0);
instr2_btn3 = visual.ButtonStim(win, 
   text='Next', font='Arvo',
   pos=(0, -0.45),
   letterHeight=0.05,
   size=[0.2,0.1], borderWidth=0.0,
   fillColor='white', borderColor=None,
   color='black', colorSpace='rgb',
   opacity=0.0,
   bold=True, italic=False,
   padding=None,
   anchor='center',
   name='instr2_btn3')
instr2_btn3.buttonClock = core.Clock()
instr2_ex3 = visual.ImageStim(
    win=win,
    name='instr2_ex3', 
    image='materials/demo_imgs/[SINGLE - SIMPLE] example 16.png', mask=None,
    ori=0.0, pos=(0, 0), size=[1,0.5],
    color=[1,1,1], colorSpace='rgb', opacity=0.0,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-2.0)
instr2_btn2 = visual.ButtonStim(win, 
   text='Next', font='Arvo',
   pos=(0, -0.45),
   letterHeight=0.05,
   size=[0.2,0.1], borderWidth=0.0,
   fillColor='white', borderColor=None,
   color='black', colorSpace='rgb',
   opacity=0.0,
   bold=True, italic=False,
   padding=None,
   anchor='center',
   name='instr2_btn2')
instr2_btn2.buttonClock = core.Clock()
instr2_ex2 = visual.ImageStim(
    win=win,
    name='instr2_ex2', 
    image='materials/demo_imgs/[SINGLE - SIMPLE] example 09.png', mask=None,
    ori=0.0, pos=(0, 0), size=[1,0.5],
    color=[1,1,1], colorSpace='rgb', opacity=0.0,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-4.0)
instr2_btn1 = visual.ButtonStim(win, 
   text='Next', font='Arvo',
   pos=(0, -0.45),
   letterHeight=0.05,
   size=[0.2,0.1], borderWidth=0.0,
   fillColor='white', borderColor=None,
   color='black', colorSpace='rgb',
   opacity=1.0,
   bold=True, italic=False,
   padding=None,
   anchor='center',
   name='instr2_btn1')
instr2_btn1.buttonClock = core.Clock()
instr2_ex1 = visual.ImageStim(
    win=win,
    name='instr2_ex1', 
    image='materials/demo_imgs/[SINGLE - SIMPLE] example 07.png', mask=None,
    ori=0.0, pos=(0, 0), size=[1,0.5],
    color=[1,1,1], colorSpace='rgb', opacity=1.0,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-6.0)

# Initialize components for Routine "Training_2"
Training_2Clock = core.Clock()
train2_num = visual.TextStim(win=win, name='train2_num',
    text='Training example 1',
    font='Open Sans',
    pos=(-0.4, 0.45), height=0.02, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=0.0);
train2_txt1 = visual.TextStim(win=win, name='train2_txt1',
    text='Revised instructions for user operation.',
    font='Open Sans',
    pos=(0.4, 0.1), height=0.03, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-1.0);
train2_btn5 = visual.ButtonStim(win, 
   text='Next', font='Arvo',
   pos=(-0.4, -0.45),
   letterHeight=0.05,
   size=[0.2,0.1], borderWidth=0.0,
   fillColor='white', borderColor=None,
   color='black', colorSpace='rgb',
   opacity=0.0,
   bold=True, italic=False,
   padding=None,
   anchor='center',
   name='train2_btn5')
train2_btn5.buttonClock = core.Clock()
train2_ex5 = visual.ImageStim(
    win=win,
    name='train2_ex5', 
    image='materials/demo_imgs/[MULTI - SIMPLE] example 19.png', mask=None,
    ori=0.0, pos=(-0.4, 0.0), size=[0.7,0.7],
    color=[1,1,1], colorSpace='rgb', opacity=0.0,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-3.0)
train2_btn4 = visual.ButtonStim(win, 
   text='Next', font='Arvo',
   pos=(-0.4, -0.45),
   letterHeight=0.05,
   size=[0.2,0.1], borderWidth=0.0,
   fillColor='white', borderColor=None,
   color='black', colorSpace='rgb',
   opacity=0.0,
   bold=True, italic=False,
   padding=None,
   anchor='center',
   name='train2_btn4')
train2_btn4.buttonClock = core.Clock()
train2_ex4 = visual.ImageStim(
    win=win,
    name='train2_ex4', 
    image='materials/demo_imgs/[MULTI - SIMPLE] example 17.png', mask=None,
    ori=0.0, pos=(-0.4, 0.0), size=[0.7,0.7],
    color=[1,1,1], colorSpace='rgb', opacity=0.0,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-5.0)
train2_btn3 = visual.ButtonStim(win, 
   text='Next', font='Arvo',
   pos=(-0.4, -0.45),
   letterHeight=0.05,
   size=[0.2,0.1], borderWidth=0.0,
   fillColor='white', borderColor=None,
   color='black', colorSpace='rgb',
   opacity=0.0,
   bold=True, italic=False,
   padding=None,
   anchor='center',
   name='train2_btn3')
train2_btn3.buttonClock = core.Clock()
train2_ex3 = visual.ImageStim(
    win=win,
    name='train2_ex3', 
    image='materials/demo_imgs/[MULTI - SIMPLE] example 05.png', mask=None,
    ori=0.0, pos=(-0.4, 0.0), size=[0.7,0.7],
    color=[1,1,1], colorSpace='rgb', opacity=0.0,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-7.0)
train2_btn2 = visual.ButtonStim(win, 
   text='Next', font='Arvo',
   pos=(-0.4, -0.45),
   letterHeight=0.05,
   size=[0.2,0.1], borderWidth=0.0,
   fillColor='white', borderColor=None,
   color='black', colorSpace='rgb',
   opacity=0.0,
   bold=True, italic=False,
   padding=None,
   anchor='center',
   name='train2_btn2')
train2_btn2.buttonClock = core.Clock()
train2_ex2 = visual.ImageStim(
    win=win,
    name='train2_ex2', 
    image='materials/demo_imgs/[MULTI - SIMPLE] example 04.png', mask=None,
    ori=0.0, pos=(-0.4, 0.0), size=[0.7,0.7],
    color=[1,1,1], colorSpace='rgb', opacity=0.0,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-9.0)
train2_btn1 = visual.ButtonStim(win, 
   text='Next', font='Arvo',
   pos=(-0.4, -0.45),
   letterHeight=0.05,
   size=[0.2,0.1], borderWidth=0.0,
   fillColor='white', borderColor=None,
   color='black', colorSpace='rgb',
   opacity=1.0,
   bold=True, italic=False,
   padding=None,
   anchor='center',
   name='train2_btn1')
train2_btn1.buttonClock = core.Clock()
train2_ex1 = visual.ImageStim(
    win=win,
    name='train2_ex1', 
    image='materials/demo_imgs/[MULTI - SIMPLE] example 02.png', mask=None,
    ori=0.0, pos=(-0.4, 0.0), size=[0.7,0.7],
    color=[1,1,1], colorSpace='rgb', opacity=1.0,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-11.0)
train2_bg1 = visual.ImageStim(
    win=win,
    name='train2_bg1', 
    image='materials/demo_imgs/white_BG.png', mask=None,
    ori=0.0, pos=(0.4, 0.3), size=(0.7, 0.3),
    color=[255,255,255], colorSpace='rgb', opacity=1.0,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-12.0)
train2_bg2 = visual.ImageStim(
    win=win,
    name='train2_bg2', 
    image='materials/demo_imgs/white_BG.png', mask=None,
    ori=0.0, pos=(0.4, -0.2), size=(0.7, 0.5),
    color='white', colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-13.0)

# Initialize components for Routine "Performance_2"
Performance_2Clock = core.Clock()
perf2_num = visual.TextStim(win=win, name='perf2_num',
    text='Test example 1 (this could be removed)',
    font='Open Sans',
    pos=(-0.4, 0.45), height=0.02, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=0.0);
perf2_txt1 = visual.TextStim(win=win, name='perf2_txt1',
    text='Revised instructions for user operation.',
    font='Open Sans',
    pos=(0.4, 0.1), height=0.03, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-1.0);
perf2_btn5 = visual.ButtonStim(win, 
   text='Next', font='Arvo',
   pos=(-0.4, -0.45),
   letterHeight=0.05,
   size=[0.2,0.1], borderWidth=0.0,
   fillColor='white', borderColor=None,
   color='black', colorSpace='rgb',
   opacity=0.0,
   bold=True, italic=False,
   padding=None,
   anchor='center',
   name='perf2_btn5')
perf2_btn5.buttonClock = core.Clock()
perf2_ex5 = visual.ImageStim(
    win=win,
    name='perf2_ex5', 
    image='materials/demo_imgs/[MULTI - SIMPLE] example 19.png', mask=None,
    ori=0.0, pos=(-0.4, 0.0), size=[0.7,0.7],
    color=[1,1,1], colorSpace='rgb', opacity=0.0,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-3.0)
perf2_btn4 = visual.ButtonStim(win, 
   text='Next', font='Arvo',
   pos=(-0.4, -0.45),
   letterHeight=0.05,
   size=[0.2,0.1], borderWidth=0.0,
   fillColor='white', borderColor=None,
   color='black', colorSpace='rgb',
   opacity=0.0,
   bold=True, italic=False,
   padding=None,
   anchor='center',
   name='perf2_btn4')
perf2_btn4.buttonClock = core.Clock()
perf2_ex4 = visual.ImageStim(
    win=win,
    name='perf2_ex4', 
    image='materials/demo_imgs/[MULTI - SIMPLE] example 17.png', mask=None,
    ori=0.0, pos=(-0.4, 0.0), size=[0.7,0.7],
    color=[1,1,1], colorSpace='rgb', opacity=0.0,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-5.0)
perf2_btn3 = visual.ButtonStim(win, 
   text='Next', font='Arvo',
   pos=(-0.4, -0.45),
   letterHeight=0.05,
   size=[0.2,0.1], borderWidth=0.0,
   fillColor='white', borderColor=None,
   color='black', colorSpace='rgb',
   opacity=0.0,
   bold=True, italic=False,
   padding=None,
   anchor='center',
   name='perf2_btn3')
perf2_btn3.buttonClock = core.Clock()
perf2_ex3 = visual.ImageStim(
    win=win,
    name='perf2_ex3', 
    image='materials/demo_imgs/[MULTI - SIMPLE] example 05.png', mask=None,
    ori=0.0, pos=(-0.4,0.0), size=[0.7,0.7],
    color=[1,1,1], colorSpace='rgb', opacity=0.0,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-7.0)
perf2_btn2 = visual.ButtonStim(win, 
   text='Next', font='Arvo',
   pos=(-0.4, -0.45),
   letterHeight=0.05,
   size=[0.2,0.1], borderWidth=0.0,
   fillColor='white', borderColor=None,
   color='black', colorSpace='rgb',
   opacity=0.0,
   bold=True, italic=False,
   padding=None,
   anchor='center',
   name='perf2_btn2')
perf2_btn2.buttonClock = core.Clock()
perf2_ex2 = visual.ImageStim(
    win=win,
    name='perf2_ex2', 
    image='materials/demo_imgs/[MULTI - SIMPLE] example 04.png', mask=None,
    ori=0.0, pos=(-0.4, 0.0), size=[0.7,0.7],
    color=[1,1,1], colorSpace='rgb', opacity=0.0,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-9.0)
perf2_btn1 = visual.ButtonStim(win, 
   text='Next', font='Arvo',
   pos=(-0.4, -0.45),
   letterHeight=0.05,
   size=[0.2,0.1], borderWidth=0.0,
   fillColor='white', borderColor=None,
   color='black', colorSpace='rgb',
   opacity=1.0,
   bold=True, italic=False,
   padding=None,
   anchor='center',
   name='perf2_btn1')
perf2_btn1.buttonClock = core.Clock()
perf2_ex1 = visual.ImageStim(
    win=win,
    name='perf2_ex1', 
    image='materials/demo_imgs/[MULTI - SIMPLE] example 02.png', mask=None,
    ori=0.0, pos=(-0.4, 0.0), size=[0.7,0.7],
    color=[1,1,1], colorSpace='rgb', opacity=1.0,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-11.0)
perf2_bg1 = visual.ImageStim(
    win=win,
    name='perf2_bg1', 
    image='materials/demo_imgs/white_BG.png', mask=None,
    ori=0.0, pos=(0.4, 0.3), size=(0.7, 0.3),
    color=[255,255,255], colorSpace='rgb', opacity=1.0,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-12.0)
perf2_bg2 = visual.ImageStim(
    win=win,
    name='perf2_bg2', 
    image='materials/demo_imgs/white_BG.png', mask=None,
    ori=0.0, pos=(0.4, -0.2), size=(0.7, 0.5),
    color='white', colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-13.0)

# Initialize components for Routine "Performance_3"
Performance_3Clock = core.Clock()
perf3_num = visual.TextStim(win=win, name='perf3_num',
    text='Test example 1 (this could be removed)',
    font='Open Sans',
    pos=(-0.4, 0.45), height=0.02, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=0.0);
perf3_txt1 = visual.TextStim(win=win, name='perf3_txt1',
    text='Revised instructions for user operation.',
    font='Open Sans',
    pos=(0.4, 0.1), height=0.03, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-1.0);
perf3_btn5 = visual.ButtonStim(win, 
   text='Next', font='Arvo',
   pos=(-0.4, -0.45),
   letterHeight=0.05,
   size=[0.2,0.1], borderWidth=0.0,
   fillColor='white', borderColor=None,
   color='black', colorSpace='rgb',
   opacity=0.0,
   bold=True, italic=False,
   padding=None,
   anchor='center',
   name='perf3_btn5')
perf3_btn5.buttonClock = core.Clock()
perf3_ex5 = visual.ImageStim(
    win=win,
    name='perf3_ex5', 
    image='materials/demo_imgs/[SINGLE - SIMPLE] example 20.png', mask=None,
    ori=0.0, pos=(-0.4, 0.0), size=[0.7,0.7],
    color=[1,1,1], colorSpace='rgb', opacity=0.0,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-3.0)
perf3_btn4 = visual.ButtonStim(win, 
   text='Next', font='Arvo',
   pos=(-0.4, -0.45),
   letterHeight=0.05,
   size=[0.2,0.1], borderWidth=0.0,
   fillColor='white', borderColor=None,
   color='black', colorSpace='rgb',
   opacity=0.0,
   bold=True, italic=False,
   padding=None,
   anchor='center',
   name='perf3_btn4')
perf3_btn4.buttonClock = core.Clock()
perf3_ex4 = visual.ImageStim(
    win=win,
    name='perf3_ex4', 
    image='materials/demo_imgs/[SINGLE - SIMPLE] example 17.png', mask=None,
    ori=0.0, pos=(-0.4, 0.0), size=[0.7,0.7],
    color=[1,1,1], colorSpace='rgb', opacity=0.0,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-5.0)
perf3_btn3 = visual.ButtonStim(win, 
   text='Next', font='Arvo',
   pos=(-0.4, -0.45),
   letterHeight=0.05,
   size=[0.2,0.1], borderWidth=0.0,
   fillColor='white', borderColor=None,
   color='black', colorSpace='rgb',
   opacity=0.0,
   bold=True, italic=False,
   padding=None,
   anchor='center',
   name='perf3_btn3')
perf3_btn3.buttonClock = core.Clock()
perf3_ex3 = visual.ImageStim(
    win=win,
    name='perf3_ex3', 
    image='materials/demo_imgs/[SINGLE - SIMPLE] example 16.png', mask=None,
    ori=0.0, pos=(-0.4,0.0), size=[0.7,0.7],
    color=[1,1,1], colorSpace='rgb', opacity=0.0,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-7.0)
perf3_btn2 = visual.ButtonStim(win, 
   text='Next', font='Arvo',
   pos=(-0.4, -0.45),
   letterHeight=0.05,
   size=[0.2,0.1], borderWidth=0.0,
   fillColor='white', borderColor=None,
   color='black', colorSpace='rgb',
   opacity=0.0,
   bold=True, italic=False,
   padding=None,
   anchor='center',
   name='perf3_btn2')
perf3_btn2.buttonClock = core.Clock()
perf3_ex2 = visual.ImageStim(
    win=win,
    name='perf3_ex2', 
    image='materials/demo_imgs/[SINGLE - SIMPLE] example 09.png', mask=None,
    ori=0.0, pos=(-0.4, 0.0), size=[0.7,0.7],
    color=[1,1,1], colorSpace='rgb', opacity=0.0,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-9.0)
perf3_btn1 = visual.ButtonStim(win, 
   text='Next', font='Arvo',
   pos=(-0.4, -0.45),
   letterHeight=0.05,
   size=[0.2,0.1], borderWidth=0.0,
   fillColor='white', borderColor=None,
   color='black', colorSpace='rgb',
   opacity=1.0,
   bold=True, italic=False,
   padding=None,
   anchor='center',
   name='perf3_btn1')
perf3_btn1.buttonClock = core.Clock()
perf3_ex1 = visual.ImageStim(
    win=win,
    name='perf3_ex1', 
    image='materials/demo_imgs/[SINGLE - SIMPLE] example 07.png', mask=None,
    ori=0.0, pos=(-0.4, 0.0), size=[0.7,0.7],
    color=[1,1,1], colorSpace='rgb', opacity=1.0,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-11.0)
perf3_bg1 = visual.ImageStim(
    win=win,
    name='perf3_bg1', 
    image='materials/demo_imgs/white_BG.png', mask=None,
    ori=0.0, pos=(0.4, 0.3), size=(0.7, 0.3),
    color=[255,255,255], colorSpace='rgb', opacity=1.0,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-12.0)
perf3_bg2 = visual.ImageStim(
    win=win,
    name='perf3_bg2', 
    image='materials/demo_imgs/white_BG.png', mask=None,
    ori=0.0, pos=(0.4, -0.2), size=(0.7, 0.5),
    color='white', colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-13.0)

# Initialize components for Routine "Debriefing"
DebriefingClock = core.Clock()
debrf_info = visual.TextStim(win=win, name='debrf_info',
    text='Thank you for participating in this experiment.\n\nWe would like to know more about you.\n\nAll records will be kept strictly confidental (privacy statement TBC).\n\nPlease click the relevant option for you concerning your background.',
    font='Open Sans',
    pos=(0, 0.2), height=0.05, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=0.0);
debrf_btn = visual.ButtonStim(win, 
   text='Finish', font='Arvo',
   pos=(0.0,-0.45),
   letterHeight=0.05,
   size=[0.3,0.1], borderWidth=0.0,
   fillColor='white', borderColor=None,
   color='black', colorSpace='rgb',
   opacity=None,
   bold=True, italic=False,
   padding=None,
   anchor='center',
   name='debrf_btn')
debrf_btn.buttonClock = core.Clock()

# Create some handy timers
globalClock = core.Clock()  # to track the time since experiment started
routineTimer = core.CountdownTimer()  # to track time remaining of each (non-slip) routine 

# ------Prepare to start Routine "Briefing"-------
continueRoutine = True
routineTimer.add(300.000000)
# update component parameters for each repeat
# keep track of which components have finished
BriefingComponents = [gen_info, brf_btn]
for thisComponent in BriefingComponents:
    thisComponent.tStart = None
    thisComponent.tStop = None
    thisComponent.tStartRefresh = None
    thisComponent.tStopRefresh = None
    if hasattr(thisComponent, 'status'):
        thisComponent.status = NOT_STARTED
# reset timers
t = 0
_timeToFirstFrame = win.getFutureFlipTime(clock="now")
BriefingClock.reset(-_timeToFirstFrame)  # t0 is time of first possible flip
frameN = -1

# -------Run Routine "Briefing"-------
while continueRoutine and routineTimer.getTime() > 0:
    # get current time
    t = BriefingClock.getTime()
    tThisFlip = win.getFutureFlipTime(clock=BriefingClock)
    tThisFlipGlobal = win.getFutureFlipTime(clock=None)
    frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
    # update/draw components on each frame
    
    # *gen_info* updates
    if gen_info.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        gen_info.frameNStart = frameN  # exact frame index
        gen_info.tStart = t  # local t and not account for scr refresh
        gen_info.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(gen_info, 'tStartRefresh')  # time at next scr refresh
        gen_info.setAutoDraw(True)
    if gen_info.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > gen_info.tStartRefresh + 300.0-frameTolerance:
            # keep track of stop time/frame for later
            gen_info.tStop = t  # not accounting for scr refresh
            gen_info.frameNStop = frameN  # exact frame index
            win.timeOnFlip(gen_info, 'tStopRefresh')  # time at next scr refresh
            gen_info.setAutoDraw(False)
    
    # *brf_btn* updates
    if brf_btn.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        brf_btn.frameNStart = frameN  # exact frame index
        brf_btn.tStart = t  # local t and not account for scr refresh
        brf_btn.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(brf_btn, 'tStartRefresh')  # time at next scr refresh
        brf_btn.setAutoDraw(True)
    if brf_btn.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > brf_btn.tStartRefresh + 300.0-frameTolerance:
            # keep track of stop time/frame for later
            brf_btn.tStop = t  # not accounting for scr refresh
            brf_btn.frameNStop = frameN  # exact frame index
            win.timeOnFlip(brf_btn, 'tStopRefresh')  # time at next scr refresh
            brf_btn.setAutoDraw(False)
    if brf_btn.status == STARTED:
        # check whether brf_btn has been pressed
        if brf_btn.isClicked:
            if not brf_btn.wasClicked:
                brf_btn.timesOn.append(brf_btn.buttonClock.getTime()) # store time of first click
                brf_btn.timesOff.append(brf_btn.buttonClock.getTime()) # store time clicked until
            else:
                brf_btn.timesOff[-1] = brf_btn.buttonClock.getTime() # update time clicked until
            if not brf_btn.wasClicked:
                continueRoutine = False  # end routine when brf_btn is clicked
                None
            brf_btn.wasClicked = True  # if brf_btn is still clicked next frame, it is not a new click
        else:
            brf_btn.wasClicked = False  # if brf_btn is clicked next frame, it is a new click
    else:
        brf_btn.buttonClock.reset() # keep clock at 0 if button hasn't started / has finished
        brf_btn.wasClicked = False  # if brf_btn is clicked next frame, it is a new click
    
    # check for quit (typically the Esc key)
    if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
        core.quit()
    
    # check if all components have finished
    if not continueRoutine:  # a component has requested a forced-end of Routine
        break
    continueRoutine = False  # will revert to True if at least one component still running
    for thisComponent in BriefingComponents:
        if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
            continueRoutine = True
            break  # at least one component has not yet finished
    
    # refresh the screen
    if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
        win.flip()

# -------Ending Routine "Briefing"-------
for thisComponent in BriefingComponents:
    if hasattr(thisComponent, "setAutoDraw"):
        thisComponent.setAutoDraw(False)
thisExp.addData('gen_info.started', gen_info.tStartRefresh)
thisExp.addData('gen_info.stopped', gen_info.tStopRefresh)
thisExp.addData('brf_btn.started', brf_btn.tStartRefresh)
thisExp.addData('brf_btn.stopped', brf_btn.tStopRefresh)
thisExp.addData('brf_btn.numClicks', brf_btn.numClicks)
if brf_btn.numClicks:
   thisExp.addData('brf_btn.timesOn', brf_btn.timesOn)
   thisExp.addData('brf_btn.timesOff', brf_btn.timesOff)
else:
   thisExp.addData('brf_btn.timesOn', "")
   thisExp.addData('brf_btn.timesOff', "")

# ------Prepare to start Routine "Raven_Matrices"-------
continueRoutine = True
routineTimer.add(600.500000)
# update component parameters for each repeat
# keep track of which components have finished
Raven_MatricesComponents = [rv_txt1, rv_btn1]
for thisComponent in Raven_MatricesComponents:
    thisComponent.tStart = None
    thisComponent.tStop = None
    thisComponent.tStartRefresh = None
    thisComponent.tStopRefresh = None
    if hasattr(thisComponent, 'status'):
        thisComponent.status = NOT_STARTED
# reset timers
t = 0
_timeToFirstFrame = win.getFutureFlipTime(clock="now")
Raven_MatricesClock.reset(-_timeToFirstFrame)  # t0 is time of first possible flip
frameN = -1

# -------Run Routine "Raven_Matrices"-------
while continueRoutine and routineTimer.getTime() > 0:
    # get current time
    t = Raven_MatricesClock.getTime()
    tThisFlip = win.getFutureFlipTime(clock=Raven_MatricesClock)
    tThisFlipGlobal = win.getFutureFlipTime(clock=None)
    frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
    # update/draw components on each frame
    
    # *rv_txt1* updates
    if rv_txt1.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        rv_txt1.frameNStart = frameN  # exact frame index
        rv_txt1.tStart = t  # local t and not account for scr refresh
        rv_txt1.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(rv_txt1, 'tStartRefresh')  # time at next scr refresh
        rv_txt1.setAutoDraw(True)
    if rv_txt1.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > rv_txt1.tStartRefresh + 600.0-frameTolerance:
            # keep track of stop time/frame for later
            rv_txt1.tStop = t  # not accounting for scr refresh
            rv_txt1.frameNStop = frameN  # exact frame index
            win.timeOnFlip(rv_txt1, 'tStopRefresh')  # time at next scr refresh
            rv_txt1.setAutoDraw(False)
    
    # *rv_btn1* updates
    if rv_btn1.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
        # keep track of start time/frame for later
        rv_btn1.frameNStart = frameN  # exact frame index
        rv_btn1.tStart = t  # local t and not account for scr refresh
        rv_btn1.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(rv_btn1, 'tStartRefresh')  # time at next scr refresh
        rv_btn1.setAutoDraw(True)
    if rv_btn1.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > rv_btn1.tStartRefresh + 600.0-frameTolerance:
            # keep track of stop time/frame for later
            rv_btn1.tStop = t  # not accounting for scr refresh
            rv_btn1.frameNStop = frameN  # exact frame index
            win.timeOnFlip(rv_btn1, 'tStopRefresh')  # time at next scr refresh
            rv_btn1.setAutoDraw(False)
    if rv_btn1.status == STARTED:
        # check whether rv_btn1 has been pressed
        if rv_btn1.isClicked:
            if not rv_btn1.wasClicked:
                rv_btn1.timesOn.append(rv_btn1.buttonClock.getTime()) # store time of first click
                rv_btn1.timesOff.append(rv_btn1.buttonClock.getTime()) # store time clicked until
            else:
                rv_btn1.timesOff[-1] = rv_btn1.buttonClock.getTime() # update time clicked until
            if not rv_btn1.wasClicked:
                continueRoutine = False  # end routine when rv_btn1 is clicked
                None
            rv_btn1.wasClicked = True  # if rv_btn1 is still clicked next frame, it is not a new click
        else:
            rv_btn1.wasClicked = False  # if rv_btn1 is clicked next frame, it is a new click
    else:
        rv_btn1.buttonClock.reset() # keep clock at 0 if button hasn't started / has finished
        rv_btn1.wasClicked = False  # if rv_btn1 is clicked next frame, it is a new click
    
    # check for quit (typically the Esc key)
    if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
        core.quit()
    
    # check if all components have finished
    if not continueRoutine:  # a component has requested a forced-end of Routine
        break
    continueRoutine = False  # will revert to True if at least one component still running
    for thisComponent in Raven_MatricesComponents:
        if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
            continueRoutine = True
            break  # at least one component has not yet finished
    
    # refresh the screen
    if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
        win.flip()

# -------Ending Routine "Raven_Matrices"-------
for thisComponent in Raven_MatricesComponents:
    if hasattr(thisComponent, "setAutoDraw"):
        thisComponent.setAutoDraw(False)
thisExp.addData('rv_txt1.started', rv_txt1.tStartRefresh)
thisExp.addData('rv_txt1.stopped', rv_txt1.tStopRefresh)
thisExp.addData('rv_btn1.started', rv_btn1.tStartRefresh)
thisExp.addData('rv_btn1.stopped', rv_btn1.tStopRefresh)
thisExp.addData('rv_btn1.numClicks', rv_btn1.numClicks)
if rv_btn1.numClicks:
   thisExp.addData('rv_btn1.timesOn', rv_btn1.timesOn)
   thisExp.addData('rv_btn1.timesOff', rv_btn1.timesOff)
else:
   thisExp.addData('rv_btn1.timesOn', "")
   thisExp.addData('rv_btn1.timesOff', "")

# ------Prepare to start Routine "Instructions_1"-------
continueRoutine = True
routineTimer.add(300.500000)
# update component parameters for each repeat
# keep track of which components have finished
Instructions_1Components = [instr1_txt1, instr1_btn3, instr1_ex3, instr1_btn2, instr1_ex2, instr1_btn1, instr1_ex1]
for thisComponent in Instructions_1Components:
    thisComponent.tStart = None
    thisComponent.tStop = None
    thisComponent.tStartRefresh = None
    thisComponent.tStopRefresh = None
    if hasattr(thisComponent, 'status'):
        thisComponent.status = NOT_STARTED
# reset timers
t = 0
_timeToFirstFrame = win.getFutureFlipTime(clock="now")
Instructions_1Clock.reset(-_timeToFirstFrame)  # t0 is time of first possible flip
frameN = -1

# -------Run Routine "Instructions_1"-------
while continueRoutine and routineTimer.getTime() > 0:
    # get current time
    t = Instructions_1Clock.getTime()
    tThisFlip = win.getFutureFlipTime(clock=Instructions_1Clock)
    tThisFlipGlobal = win.getFutureFlipTime(clock=None)
    frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
    # update/draw components on each frame
    
    # *instr1_txt1* updates
    if instr1_txt1.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        instr1_txt1.frameNStart = frameN  # exact frame index
        instr1_txt1.tStart = t  # local t and not account for scr refresh
        instr1_txt1.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(instr1_txt1, 'tStartRefresh')  # time at next scr refresh
        instr1_txt1.setAutoDraw(True)
    if instr1_txt1.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > instr1_txt1.tStartRefresh + 300.0-frameTolerance:
            # keep track of stop time/frame for later
            instr1_txt1.tStop = t  # not accounting for scr refresh
            instr1_txt1.frameNStop = frameN  # exact frame index
            win.timeOnFlip(instr1_txt1, 'tStopRefresh')  # time at next scr refresh
            instr1_txt1.setAutoDraw(False)
    
    # *instr1_btn3* updates
    if instr1_btn3.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
        # keep track of start time/frame for later
        instr1_btn3.frameNStart = frameN  # exact frame index
        instr1_btn3.tStart = t  # local t and not account for scr refresh
        instr1_btn3.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(instr1_btn3, 'tStartRefresh')  # time at next scr refresh
        instr1_btn3.setAutoDraw(True)
    if instr1_btn3.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > instr1_btn3.tStartRefresh + 300.0-frameTolerance:
            # keep track of stop time/frame for later
            instr1_btn3.tStop = t  # not accounting for scr refresh
            instr1_btn3.frameNStop = frameN  # exact frame index
            win.timeOnFlip(instr1_btn3, 'tStopRefresh')  # time at next scr refresh
            instr1_btn3.setAutoDraw(False)
    if instr1_btn3.status == STARTED:
        # check whether instr1_btn3 has been pressed
        if instr1_btn3.isClicked:
            if not instr1_btn3.wasClicked:
                instr1_btn3.timesOn.append(instr1_btn3.buttonClock.getTime()) # store time of first click
                instr1_btn3.timesOff.append(instr1_btn3.buttonClock.getTime()) # store time clicked until
            else:
                instr1_btn3.timesOff[-1] = instr1_btn3.buttonClock.getTime() # update time clicked until
            if not instr1_btn3.wasClicked:
                continueRoutine = False  # end routine when instr1_btn3 is clicked
                continueRoutine = True
                if 'instr1_btn3' in btn_locks and btn_locks['instr1_btn3']:
                                    btn_locks['instr1_btn3'] = LOCK_OFF
                                    time.sleep(0.1)
                                    continueRoutine = False
            instr1_btn3.wasClicked = True  # if instr1_btn3 is still clicked next frame, it is not a new click
        else:
            instr1_btn3.wasClicked = False  # if instr1_btn3 is clicked next frame, it is a new click
    else:
        instr1_btn3.buttonClock.reset() # keep clock at 0 if button hasn't started / has finished
        instr1_btn3.wasClicked = False  # if instr1_btn3 is clicked next frame, it is a new click
    
    # *instr1_ex3* updates
    if instr1_ex3.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        instr1_ex3.frameNStart = frameN  # exact frame index
        instr1_ex3.tStart = t  # local t and not account for scr refresh
        instr1_ex3.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(instr1_ex3, 'tStartRefresh')  # time at next scr refresh
        instr1_ex3.setAutoDraw(True)
    if instr1_ex3.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > instr1_ex3.tStartRefresh + 300.0-frameTolerance:
            # keep track of stop time/frame for later
            instr1_ex3.tStop = t  # not accounting for scr refresh
            instr1_ex3.frameNStop = frameN  # exact frame index
            win.timeOnFlip(instr1_ex3, 'tStopRefresh')  # time at next scr refresh
            instr1_ex3.setAutoDraw(False)
    
    # *instr1_btn2* updates
    if instr1_btn2.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
        # keep track of start time/frame for later
        instr1_btn2.frameNStart = frameN  # exact frame index
        instr1_btn2.tStart = t  # local t and not account for scr refresh
        instr1_btn2.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(instr1_btn2, 'tStartRefresh')  # time at next scr refresh
        instr1_btn2.setAutoDraw(True)
    if instr1_btn2.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > instr1_btn2.tStartRefresh + 300.0-frameTolerance:
            # keep track of stop time/frame for later
            instr1_btn2.tStop = t  # not accounting for scr refresh
            instr1_btn2.frameNStop = frameN  # exact frame index
            win.timeOnFlip(instr1_btn2, 'tStopRefresh')  # time at next scr refresh
            instr1_btn2.setAutoDraw(False)
    if instr1_btn2.status == STARTED:
        # check whether instr1_btn2 has been pressed
        if instr1_btn2.isClicked:
            if not instr1_btn2.wasClicked:
                instr1_btn2.timesOn.append(instr1_btn2.buttonClock.getTime()) # store time of first click
                instr1_btn2.timesOff.append(instr1_btn2.buttonClock.getTime()) # store time clicked until
            else:
                instr1_btn2.timesOff[-1] = instr1_btn2.buttonClock.getTime() # update time clicked until
            if not instr1_btn2.wasClicked:
                if 'instr1_btn2' in btn_locks and btn_locks['instr1_btn2']:
                                    instr1_ex2.setOpacity(0.0)
                                    instr1_btn2.setOpacity(0.0)
                                    instr1_ex3.setOpacity(1.0)
                                    time.sleep(0.1)
                                    instr1_btn3.setOpacity(1.0)
                
                                    btn_locks['instr1_btn3'] = LOCK_ON
                                    btn_locks['instr1_btn2'] = LOCK_OFF
            instr1_btn2.wasClicked = True  # if instr1_btn2 is still clicked next frame, it is not a new click
        else:
            instr1_btn2.wasClicked = False  # if instr1_btn2 is clicked next frame, it is a new click
    else:
        instr1_btn2.buttonClock.reset() # keep clock at 0 if button hasn't started / has finished
        instr1_btn2.wasClicked = False  # if instr1_btn2 is clicked next frame, it is a new click
    
    # *instr1_ex2* updates
    if instr1_ex2.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        instr1_ex2.frameNStart = frameN  # exact frame index
        instr1_ex2.tStart = t  # local t and not account for scr refresh
        instr1_ex2.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(instr1_ex2, 'tStartRefresh')  # time at next scr refresh
        instr1_ex2.setAutoDraw(True)
    if instr1_ex2.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > instr1_ex2.tStartRefresh + 300.0-frameTolerance:
            # keep track of stop time/frame for later
            instr1_ex2.tStop = t  # not accounting for scr refresh
            instr1_ex2.frameNStop = frameN  # exact frame index
            win.timeOnFlip(instr1_ex2, 'tStopRefresh')  # time at next scr refresh
            instr1_ex2.setAutoDraw(False)
    
    # *instr1_btn1* updates
    if instr1_btn1.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
        # keep track of start time/frame for later
        instr1_btn1.frameNStart = frameN  # exact frame index
        instr1_btn1.tStart = t  # local t and not account for scr refresh
        instr1_btn1.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(instr1_btn1, 'tStartRefresh')  # time at next scr refresh
        instr1_btn1.setAutoDraw(True)
    if instr1_btn1.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > instr1_btn1.tStartRefresh + 300.0-frameTolerance:
            # keep track of stop time/frame for later
            instr1_btn1.tStop = t  # not accounting for scr refresh
            instr1_btn1.frameNStop = frameN  # exact frame index
            win.timeOnFlip(instr1_btn1, 'tStopRefresh')  # time at next scr refresh
            instr1_btn1.setAutoDraw(False)
    if instr1_btn1.status == STARTED:
        # check whether instr1_btn1 has been pressed
        if instr1_btn1.isClicked:
            if not instr1_btn1.wasClicked:
                instr1_btn1.timesOn.append(instr1_btn1.buttonClock.getTime()) # store time of first click
                instr1_btn1.timesOff.append(instr1_btn1.buttonClock.getTime()) # store time clicked until
            else:
                instr1_btn1.timesOff[-1] = instr1_btn1.buttonClock.getTime() # update time clicked until
            if not instr1_btn1.wasClicked:
                if 'instr1_btn1' not in btn_locks:
                                    instr1_ex1.setOpacity(0.0)
                                    instr1_btn1.setOpacity(0.0)
                                    instr1_ex2.setOpacity(1.0)
                                    time.sleep(0.1)
                                    instr1_btn2.setOpacity(1.0)
                
                                    btn_locks['instr1_btn2'] = LOCK_ON
                                    btn_locks['instr1_btn1'] = LOCK_OFF
            instr1_btn1.wasClicked = True  # if instr1_btn1 is still clicked next frame, it is not a new click
        else:
            instr1_btn1.wasClicked = False  # if instr1_btn1 is clicked next frame, it is a new click
    else:
        instr1_btn1.buttonClock.reset() # keep clock at 0 if button hasn't started / has finished
        instr1_btn1.wasClicked = False  # if instr1_btn1 is clicked next frame, it is a new click
    
    # *instr1_ex1* updates
    if instr1_ex1.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        instr1_ex1.frameNStart = frameN  # exact frame index
        instr1_ex1.tStart = t  # local t and not account for scr refresh
        instr1_ex1.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(instr1_ex1, 'tStartRefresh')  # time at next scr refresh
        instr1_ex1.setAutoDraw(True)
    if instr1_ex1.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > instr1_ex1.tStartRefresh + 300.0-frameTolerance:
            # keep track of stop time/frame for later
            instr1_ex1.tStop = t  # not accounting for scr refresh
            instr1_ex1.frameNStop = frameN  # exact frame index
            win.timeOnFlip(instr1_ex1, 'tStopRefresh')  # time at next scr refresh
            instr1_ex1.setAutoDraw(False)
    
    # check for quit (typically the Esc key)
    if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
        core.quit()
    
    # check if all components have finished
    if not continueRoutine:  # a component has requested a forced-end of Routine
        break
    continueRoutine = False  # will revert to True if at least one component still running
    for thisComponent in Instructions_1Components:
        if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
            continueRoutine = True
            break  # at least one component has not yet finished
    
    # refresh the screen
    if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
        win.flip()

# -------Ending Routine "Instructions_1"-------
for thisComponent in Instructions_1Components:
    if hasattr(thisComponent, "setAutoDraw"):
        thisComponent.setAutoDraw(False)
thisExp.addData('instr1_txt1.started', instr1_txt1.tStartRefresh)
thisExp.addData('instr1_txt1.stopped', instr1_txt1.tStopRefresh)
thisExp.addData('instr1_btn3.started', instr1_btn3.tStartRefresh)
thisExp.addData('instr1_btn3.stopped', instr1_btn3.tStopRefresh)
thisExp.addData('instr1_btn3.numClicks', instr1_btn3.numClicks)
if instr1_btn3.numClicks:
   thisExp.addData('instr1_btn3.timesOn', instr1_btn3.timesOn)
   thisExp.addData('instr1_btn3.timesOff', instr1_btn3.timesOff)
else:
   thisExp.addData('instr1_btn3.timesOn', "")
   thisExp.addData('instr1_btn3.timesOff', "")
thisExp.addData('instr1_ex3.started', instr1_ex3.tStartRefresh)
thisExp.addData('instr1_ex3.stopped', instr1_ex3.tStopRefresh)
thisExp.addData('instr1_btn2.started', instr1_btn2.tStartRefresh)
thisExp.addData('instr1_btn2.stopped', instr1_btn2.tStopRefresh)
thisExp.addData('instr1_btn2.numClicks', instr1_btn2.numClicks)
if instr1_btn2.numClicks:
   thisExp.addData('instr1_btn2.timesOn', instr1_btn2.timesOn)
   thisExp.addData('instr1_btn2.timesOff', instr1_btn2.timesOff)
else:
   thisExp.addData('instr1_btn2.timesOn', "")
   thisExp.addData('instr1_btn2.timesOff', "")
thisExp.addData('instr1_ex2.started', instr1_ex2.tStartRefresh)
thisExp.addData('instr1_ex2.stopped', instr1_ex2.tStopRefresh)
thisExp.addData('instr1_btn1.started', instr1_btn1.tStartRefresh)
thisExp.addData('instr1_btn1.stopped', instr1_btn1.tStopRefresh)
thisExp.addData('instr1_btn1.numClicks', instr1_btn1.numClicks)
if instr1_btn1.numClicks:
   thisExp.addData('instr1_btn1.timesOn', instr1_btn1.timesOn)
   thisExp.addData('instr1_btn1.timesOff', instr1_btn1.timesOff)
else:
   thisExp.addData('instr1_btn1.timesOn', "")
   thisExp.addData('instr1_btn1.timesOff', "")
thisExp.addData('instr1_ex1.started', instr1_ex1.tStartRefresh)
thisExp.addData('instr1_ex1.stopped', instr1_ex1.tStopRefresh)

# ------Prepare to start Routine "Training_1"-------
continueRoutine = True
routineTimer.add(300.500000)
# update component parameters for each repeat
# keep track of which components have finished
Training_1Components = [train1_num, train1_txt1, train1_btn5, train1_ex5, train1_btn4, train1_ex4, train1_btn3, train1_ex3, train1_btn2, train1_ex2, train1_btn1, train1_ex1, train1_bg1, train1_bg2]
for thisComponent in Training_1Components:
    thisComponent.tStart = None
    thisComponent.tStop = None
    thisComponent.tStartRefresh = None
    thisComponent.tStopRefresh = None
    if hasattr(thisComponent, 'status'):
        thisComponent.status = NOT_STARTED
# reset timers
t = 0
_timeToFirstFrame = win.getFutureFlipTime(clock="now")
Training_1Clock.reset(-_timeToFirstFrame)  # t0 is time of first possible flip
frameN = -1

# -------Run Routine "Training_1"-------
while continueRoutine and routineTimer.getTime() > 0:
    # get current time
    t = Training_1Clock.getTime()
    tThisFlip = win.getFutureFlipTime(clock=Training_1Clock)
    tThisFlipGlobal = win.getFutureFlipTime(clock=None)
    frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
    # update/draw components on each frame
    
    # *train1_num* updates
    if train1_num.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        train1_num.frameNStart = frameN  # exact frame index
        train1_num.tStart = t  # local t and not account for scr refresh
        train1_num.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(train1_num, 'tStartRefresh')  # time at next scr refresh
        train1_num.setAutoDraw(True)
    if train1_num.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > train1_num.tStartRefresh + 300.0-frameTolerance:
            # keep track of stop time/frame for later
            train1_num.tStop = t  # not accounting for scr refresh
            train1_num.frameNStop = frameN  # exact frame index
            win.timeOnFlip(train1_num, 'tStopRefresh')  # time at next scr refresh
            train1_num.setAutoDraw(False)
    
    # *train1_txt1* updates
    if train1_txt1.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        train1_txt1.frameNStart = frameN  # exact frame index
        train1_txt1.tStart = t  # local t and not account for scr refresh
        train1_txt1.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(train1_txt1, 'tStartRefresh')  # time at next scr refresh
        train1_txt1.setAutoDraw(True)
    if train1_txt1.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > train1_txt1.tStartRefresh + 300.0-frameTolerance:
            # keep track of stop time/frame for later
            train1_txt1.tStop = t  # not accounting for scr refresh
            train1_txt1.frameNStop = frameN  # exact frame index
            win.timeOnFlip(train1_txt1, 'tStopRefresh')  # time at next scr refresh
            train1_txt1.setAutoDraw(False)
    
    # *train1_btn5* updates
    if train1_btn5.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
        # keep track of start time/frame for later
        train1_btn5.frameNStart = frameN  # exact frame index
        train1_btn5.tStart = t  # local t and not account for scr refresh
        train1_btn5.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(train1_btn5, 'tStartRefresh')  # time at next scr refresh
        train1_btn5.setAutoDraw(True)
    if train1_btn5.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > train1_btn5.tStartRefresh + 300.0-frameTolerance:
            # keep track of stop time/frame for later
            train1_btn5.tStop = t  # not accounting for scr refresh
            train1_btn5.frameNStop = frameN  # exact frame index
            win.timeOnFlip(train1_btn5, 'tStopRefresh')  # time at next scr refresh
            train1_btn5.setAutoDraw(False)
    if train1_btn5.status == STARTED:
        # check whether train1_btn5 has been pressed
        if train1_btn5.isClicked:
            if not train1_btn5.wasClicked:
                train1_btn5.timesOn.append(train1_btn5.buttonClock.getTime()) # store time of first click
                train1_btn5.timesOff.append(train1_btn5.buttonClock.getTime()) # store time clicked until
            else:
                train1_btn5.timesOff[-1] = train1_btn5.buttonClock.getTime() # update time clicked until
            if not train1_btn5.wasClicked:
                continueRoutine = False  # end routine when train1_btn5 is clicked
                continueRoutine = True
                if 'train1_btn5' in btn_locks and btn_locks['train1_btn5']:
                                    btn_locks['train1_btn5'] = LOCK_OFF
                                    time.sleep(0.1)
                                    continueRoutine = False
            train1_btn5.wasClicked = True  # if train1_btn5 is still clicked next frame, it is not a new click
        else:
            train1_btn5.wasClicked = False  # if train1_btn5 is clicked next frame, it is a new click
    else:
        train1_btn5.buttonClock.reset() # keep clock at 0 if button hasn't started / has finished
        train1_btn5.wasClicked = False  # if train1_btn5 is clicked next frame, it is a new click
    
    # *train1_ex5* updates
    if train1_ex5.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        train1_ex5.frameNStart = frameN  # exact frame index
        train1_ex5.tStart = t  # local t and not account for scr refresh
        train1_ex5.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(train1_ex5, 'tStartRefresh')  # time at next scr refresh
        train1_ex5.setAutoDraw(True)
    if train1_ex5.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > train1_ex5.tStartRefresh + 300.0-frameTolerance:
            # keep track of stop time/frame for later
            train1_ex5.tStop = t  # not accounting for scr refresh
            train1_ex5.frameNStop = frameN  # exact frame index
            win.timeOnFlip(train1_ex5, 'tStopRefresh')  # time at next scr refresh
            train1_ex5.setAutoDraw(False)
    
    # *train1_btn4* updates
    if train1_btn4.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
        # keep track of start time/frame for later
        train1_btn4.frameNStart = frameN  # exact frame index
        train1_btn4.tStart = t  # local t and not account for scr refresh
        train1_btn4.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(train1_btn4, 'tStartRefresh')  # time at next scr refresh
        train1_btn4.setAutoDraw(True)
    if train1_btn4.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > train1_btn4.tStartRefresh + 300.0-frameTolerance:
            # keep track of stop time/frame for later
            train1_btn4.tStop = t  # not accounting for scr refresh
            train1_btn4.frameNStop = frameN  # exact frame index
            win.timeOnFlip(train1_btn4, 'tStopRefresh')  # time at next scr refresh
            train1_btn4.setAutoDraw(False)
    if train1_btn4.status == STARTED:
        # check whether train1_btn4 has been pressed
        if train1_btn4.isClicked:
            if not train1_btn4.wasClicked:
                train1_btn4.timesOn.append(train1_btn4.buttonClock.getTime()) # store time of first click
                train1_btn4.timesOff.append(train1_btn4.buttonClock.getTime()) # store time clicked until
            else:
                train1_btn4.timesOff[-1] = train1_btn4.buttonClock.getTime() # update time clicked until
            if not train1_btn4.wasClicked:
                if 'train1_btn4' in btn_locks and btn_locks['train1_btn4']:
                                    train1_ex4.setOpacity(0.0)
                                    train1_btn4.setOpacity(0.0)
                                    train1_ex5.setOpacity(1.0)
                                    time.sleep(0.1)
                                    train1_btn5.setOpacity(1.0)
                
                                    btn_locks['train1_btn5'] = LOCK_ON
                                    btn_locks['train1_btn4'] = LOCK_OFF
                                    train1_num.setText('Training example 5 (this could be removed)')
            train1_btn4.wasClicked = True  # if train1_btn4 is still clicked next frame, it is not a new click
        else:
            train1_btn4.wasClicked = False  # if train1_btn4 is clicked next frame, it is a new click
    else:
        train1_btn4.buttonClock.reset() # keep clock at 0 if button hasn't started / has finished
        train1_btn4.wasClicked = False  # if train1_btn4 is clicked next frame, it is a new click
    
    # *train1_ex4* updates
    if train1_ex4.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        train1_ex4.frameNStart = frameN  # exact frame index
        train1_ex4.tStart = t  # local t and not account for scr refresh
        train1_ex4.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(train1_ex4, 'tStartRefresh')  # time at next scr refresh
        train1_ex4.setAutoDraw(True)
    if train1_ex4.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > train1_ex4.tStartRefresh + 300.0-frameTolerance:
            # keep track of stop time/frame for later
            train1_ex4.tStop = t  # not accounting for scr refresh
            train1_ex4.frameNStop = frameN  # exact frame index
            win.timeOnFlip(train1_ex4, 'tStopRefresh')  # time at next scr refresh
            train1_ex4.setAutoDraw(False)
    
    # *train1_btn3* updates
    if train1_btn3.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
        # keep track of start time/frame for later
        train1_btn3.frameNStart = frameN  # exact frame index
        train1_btn3.tStart = t  # local t and not account for scr refresh
        train1_btn3.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(train1_btn3, 'tStartRefresh')  # time at next scr refresh
        train1_btn3.setAutoDraw(True)
    if train1_btn3.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > train1_btn3.tStartRefresh + 300.0-frameTolerance:
            # keep track of stop time/frame for later
            train1_btn3.tStop = t  # not accounting for scr refresh
            train1_btn3.frameNStop = frameN  # exact frame index
            win.timeOnFlip(train1_btn3, 'tStopRefresh')  # time at next scr refresh
            train1_btn3.setAutoDraw(False)
    if train1_btn3.status == STARTED:
        # check whether train1_btn3 has been pressed
        if train1_btn3.isClicked:
            if not train1_btn3.wasClicked:
                train1_btn3.timesOn.append(train1_btn3.buttonClock.getTime()) # store time of first click
                train1_btn3.timesOff.append(train1_btn3.buttonClock.getTime()) # store time clicked until
            else:
                train1_btn3.timesOff[-1] = train1_btn3.buttonClock.getTime() # update time clicked until
            if not train1_btn3.wasClicked:
                if 'train1_btn3' in btn_locks and btn_locks['train1_btn3']:
                                    train1_ex3.setOpacity(0.0)
                                    train1_btn3.setOpacity(0.0)
                                    train1_ex4.setOpacity(1.0)
                                    time.sleep(0.1)
                                    train1_btn4.setOpacity(1.0)
                
                                    btn_locks['train1_btn4'] = LOCK_ON
                                    btn_locks['train1_btn3'] = LOCK_OFF
                                    train1_num.setText('Training example 4 (this could be removed)')
            train1_btn3.wasClicked = True  # if train1_btn3 is still clicked next frame, it is not a new click
        else:
            train1_btn3.wasClicked = False  # if train1_btn3 is clicked next frame, it is a new click
    else:
        train1_btn3.buttonClock.reset() # keep clock at 0 if button hasn't started / has finished
        train1_btn3.wasClicked = False  # if train1_btn3 is clicked next frame, it is a new click
    
    # *train1_ex3* updates
    if train1_ex3.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        train1_ex3.frameNStart = frameN  # exact frame index
        train1_ex3.tStart = t  # local t and not account for scr refresh
        train1_ex3.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(train1_ex3, 'tStartRefresh')  # time at next scr refresh
        train1_ex3.setAutoDraw(True)
    if train1_ex3.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > train1_ex3.tStartRefresh + 300.0-frameTolerance:
            # keep track of stop time/frame for later
            train1_ex3.tStop = t  # not accounting for scr refresh
            train1_ex3.frameNStop = frameN  # exact frame index
            win.timeOnFlip(train1_ex3, 'tStopRefresh')  # time at next scr refresh
            train1_ex3.setAutoDraw(False)
    
    # *train1_btn2* updates
    if train1_btn2.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
        # keep track of start time/frame for later
        train1_btn2.frameNStart = frameN  # exact frame index
        train1_btn2.tStart = t  # local t and not account for scr refresh
        train1_btn2.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(train1_btn2, 'tStartRefresh')  # time at next scr refresh
        train1_btn2.setAutoDraw(True)
    if train1_btn2.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > train1_btn2.tStartRefresh + 300.0-frameTolerance:
            # keep track of stop time/frame for later
            train1_btn2.tStop = t  # not accounting for scr refresh
            train1_btn2.frameNStop = frameN  # exact frame index
            win.timeOnFlip(train1_btn2, 'tStopRefresh')  # time at next scr refresh
            train1_btn2.setAutoDraw(False)
    if train1_btn2.status == STARTED:
        # check whether train1_btn2 has been pressed
        if train1_btn2.isClicked:
            if not train1_btn2.wasClicked:
                train1_btn2.timesOn.append(train1_btn2.buttonClock.getTime()) # store time of first click
                train1_btn2.timesOff.append(train1_btn2.buttonClock.getTime()) # store time clicked until
            else:
                train1_btn2.timesOff[-1] = train1_btn2.buttonClock.getTime() # update time clicked until
            if not train1_btn2.wasClicked:
                if 'train1_btn2' in btn_locks and btn_locks['train1_btn2']:
                                    train1_ex2.setOpacity(0.0)
                                    train1_btn2.setOpacity(0.0)
                                    train1_ex3.setOpacity(1.0)
                                    time.sleep(0.1)
                                    train1_btn3.setOpacity(1.0)
                
                                    btn_locks['train1_btn3'] = LOCK_ON
                                    btn_locks['train1_btn2'] = LOCK_OFF
                                    train1_num.setText('Training example 3 (this could be removed)')
            train1_btn2.wasClicked = True  # if train1_btn2 is still clicked next frame, it is not a new click
        else:
            train1_btn2.wasClicked = False  # if train1_btn2 is clicked next frame, it is a new click
    else:
        train1_btn2.buttonClock.reset() # keep clock at 0 if button hasn't started / has finished
        train1_btn2.wasClicked = False  # if train1_btn2 is clicked next frame, it is a new click
    
    # *train1_ex2* updates
    if train1_ex2.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        train1_ex2.frameNStart = frameN  # exact frame index
        train1_ex2.tStart = t  # local t and not account for scr refresh
        train1_ex2.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(train1_ex2, 'tStartRefresh')  # time at next scr refresh
        train1_ex2.setAutoDraw(True)
    if train1_ex2.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > train1_ex2.tStartRefresh + 300.0-frameTolerance:
            # keep track of stop time/frame for later
            train1_ex2.tStop = t  # not accounting for scr refresh
            train1_ex2.frameNStop = frameN  # exact frame index
            win.timeOnFlip(train1_ex2, 'tStopRefresh')  # time at next scr refresh
            train1_ex2.setAutoDraw(False)
    
    # *train1_btn1* updates
    if train1_btn1.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
        # keep track of start time/frame for later
        train1_btn1.frameNStart = frameN  # exact frame index
        train1_btn1.tStart = t  # local t and not account for scr refresh
        train1_btn1.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(train1_btn1, 'tStartRefresh')  # time at next scr refresh
        train1_btn1.setAutoDraw(True)
    if train1_btn1.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > train1_btn1.tStartRefresh + 300.0-frameTolerance:
            # keep track of stop time/frame for later
            train1_btn1.tStop = t  # not accounting for scr refresh
            train1_btn1.frameNStop = frameN  # exact frame index
            win.timeOnFlip(train1_btn1, 'tStopRefresh')  # time at next scr refresh
            train1_btn1.setAutoDraw(False)
    if train1_btn1.status == STARTED:
        # check whether train1_btn1 has been pressed
        if train1_btn1.isClicked:
            if not train1_btn1.wasClicked:
                train1_btn1.timesOn.append(train1_btn1.buttonClock.getTime()) # store time of first click
                train1_btn1.timesOff.append(train1_btn1.buttonClock.getTime()) # store time clicked until
            else:
                train1_btn1.timesOff[-1] = train1_btn1.buttonClock.getTime() # update time clicked until
            if not train1_btn1.wasClicked:
                if 'train1_btn1' not in btn_locks:
                                    train1_ex1.setOpacity(0.0)
                                    train1_btn1.setOpacity(0.0)
                                    train1_ex2.setOpacity(1.0)
                                    time.sleep(0.1)
                                    train1_btn2.setOpacity(1.0)
                
                                    btn_locks['train1_btn2'] = LOCK_ON
                                    btn_locks['train1_btn1'] = LOCK_OFF
                                    train1_num.setText('Training example 2 (this could be removed)')
            train1_btn1.wasClicked = True  # if train1_btn1 is still clicked next frame, it is not a new click
        else:
            train1_btn1.wasClicked = False  # if train1_btn1 is clicked next frame, it is a new click
    else:
        train1_btn1.buttonClock.reset() # keep clock at 0 if button hasn't started / has finished
        train1_btn1.wasClicked = False  # if train1_btn1 is clicked next frame, it is a new click
    
    # *train1_ex1* updates
    if train1_ex1.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        train1_ex1.frameNStart = frameN  # exact frame index
        train1_ex1.tStart = t  # local t and not account for scr refresh
        train1_ex1.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(train1_ex1, 'tStartRefresh')  # time at next scr refresh
        train1_ex1.setAutoDraw(True)
    if train1_ex1.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > train1_ex1.tStartRefresh + 300.0-frameTolerance:
            # keep track of stop time/frame for later
            train1_ex1.tStop = t  # not accounting for scr refresh
            train1_ex1.frameNStop = frameN  # exact frame index
            win.timeOnFlip(train1_ex1, 'tStopRefresh')  # time at next scr refresh
            train1_ex1.setAutoDraw(False)
    
    # *train1_bg1* updates
    if train1_bg1.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        train1_bg1.frameNStart = frameN  # exact frame index
        train1_bg1.tStart = t  # local t and not account for scr refresh
        train1_bg1.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(train1_bg1, 'tStartRefresh')  # time at next scr refresh
        train1_bg1.setAutoDraw(True)
    if train1_bg1.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > train1_bg1.tStartRefresh + 300.0-frameTolerance:
            # keep track of stop time/frame for later
            train1_bg1.tStop = t  # not accounting for scr refresh
            train1_bg1.frameNStop = frameN  # exact frame index
            win.timeOnFlip(train1_bg1, 'tStopRefresh')  # time at next scr refresh
            train1_bg1.setAutoDraw(False)
    
    # *train1_bg2* updates
    if train1_bg2.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        train1_bg2.frameNStart = frameN  # exact frame index
        train1_bg2.tStart = t  # local t and not account for scr refresh
        train1_bg2.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(train1_bg2, 'tStartRefresh')  # time at next scr refresh
        train1_bg2.setAutoDraw(True)
    if train1_bg2.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > train1_bg2.tStartRefresh + 300.0-frameTolerance:
            # keep track of stop time/frame for later
            train1_bg2.tStop = t  # not accounting for scr refresh
            train1_bg2.frameNStop = frameN  # exact frame index
            win.timeOnFlip(train1_bg2, 'tStopRefresh')  # time at next scr refresh
            train1_bg2.setAutoDraw(False)
    
    # check for quit (typically the Esc key)
    if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
        core.quit()
    
    # check if all components have finished
    if not continueRoutine:  # a component has requested a forced-end of Routine
        break
    continueRoutine = False  # will revert to True if at least one component still running
    for thisComponent in Training_1Components:
        if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
            continueRoutine = True
            break  # at least one component has not yet finished
    
    # refresh the screen
    if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
        win.flip()

# -------Ending Routine "Training_1"-------
for thisComponent in Training_1Components:
    if hasattr(thisComponent, "setAutoDraw"):
        thisComponent.setAutoDraw(False)
thisExp.addData('train1_num.started', train1_num.tStartRefresh)
thisExp.addData('train1_num.stopped', train1_num.tStopRefresh)
thisExp.addData('train1_txt1.started', train1_txt1.tStartRefresh)
thisExp.addData('train1_txt1.stopped', train1_txt1.tStopRefresh)
thisExp.addData('train1_btn5.started', train1_btn5.tStartRefresh)
thisExp.addData('train1_btn5.stopped', train1_btn5.tStopRefresh)
thisExp.addData('train1_btn5.numClicks', train1_btn5.numClicks)
if train1_btn5.numClicks:
   thisExp.addData('train1_btn5.timesOn', train1_btn5.timesOn)
   thisExp.addData('train1_btn5.timesOff', train1_btn5.timesOff)
else:
   thisExp.addData('train1_btn5.timesOn', "")
   thisExp.addData('train1_btn5.timesOff', "")
thisExp.addData('train1_ex5.started', train1_ex5.tStartRefresh)
thisExp.addData('train1_ex5.stopped', train1_ex5.tStopRefresh)
thisExp.addData('train1_btn4.started', train1_btn4.tStartRefresh)
thisExp.addData('train1_btn4.stopped', train1_btn4.tStopRefresh)
thisExp.addData('train1_btn4.numClicks', train1_btn4.numClicks)
if train1_btn4.numClicks:
   thisExp.addData('train1_btn4.timesOn', train1_btn4.timesOn)
   thisExp.addData('train1_btn4.timesOff', train1_btn4.timesOff)
else:
   thisExp.addData('train1_btn4.timesOn', "")
   thisExp.addData('train1_btn4.timesOff', "")
thisExp.addData('train1_ex4.started', train1_ex4.tStartRefresh)
thisExp.addData('train1_ex4.stopped', train1_ex4.tStopRefresh)
thisExp.addData('train1_btn3.started', train1_btn3.tStartRefresh)
thisExp.addData('train1_btn3.stopped', train1_btn3.tStopRefresh)
thisExp.addData('train1_btn3.numClicks', train1_btn3.numClicks)
if train1_btn3.numClicks:
   thisExp.addData('train1_btn3.timesOn', train1_btn3.timesOn)
   thisExp.addData('train1_btn3.timesOff', train1_btn3.timesOff)
else:
   thisExp.addData('train1_btn3.timesOn', "")
   thisExp.addData('train1_btn3.timesOff', "")
thisExp.addData('train1_ex3.started', train1_ex3.tStartRefresh)
thisExp.addData('train1_ex3.stopped', train1_ex3.tStopRefresh)
thisExp.addData('train1_btn2.started', train1_btn2.tStartRefresh)
thisExp.addData('train1_btn2.stopped', train1_btn2.tStopRefresh)
thisExp.addData('train1_btn2.numClicks', train1_btn2.numClicks)
if train1_btn2.numClicks:
   thisExp.addData('train1_btn2.timesOn', train1_btn2.timesOn)
   thisExp.addData('train1_btn2.timesOff', train1_btn2.timesOff)
else:
   thisExp.addData('train1_btn2.timesOn', "")
   thisExp.addData('train1_btn2.timesOff', "")
thisExp.addData('train1_ex2.started', train1_ex2.tStartRefresh)
thisExp.addData('train1_ex2.stopped', train1_ex2.tStopRefresh)
thisExp.addData('train1_btn1.started', train1_btn1.tStartRefresh)
thisExp.addData('train1_btn1.stopped', train1_btn1.tStopRefresh)
thisExp.addData('train1_btn1.numClicks', train1_btn1.numClicks)
if train1_btn1.numClicks:
   thisExp.addData('train1_btn1.timesOn', train1_btn1.timesOn)
   thisExp.addData('train1_btn1.timesOff', train1_btn1.timesOff)
else:
   thisExp.addData('train1_btn1.timesOn', "")
   thisExp.addData('train1_btn1.timesOff', "")
thisExp.addData('train1_ex1.started', train1_ex1.tStartRefresh)
thisExp.addData('train1_ex1.stopped', train1_ex1.tStopRefresh)
thisExp.addData('train1_bg1.started', train1_bg1.tStartRefresh)
thisExp.addData('train1_bg1.stopped', train1_bg1.tStopRefresh)
thisExp.addData('train1_bg2.started', train1_bg2.tStartRefresh)
thisExp.addData('train1_bg2.stopped', train1_bg2.tStopRefresh)

# ------Prepare to start Routine "Performance_1"-------
continueRoutine = True
routineTimer.add(300.500000)
# update component parameters for each repeat
# keep track of which components have finished
Performance_1Components = [perf1_num, perf1_txt1, perf1_btn5, perf1_ex5, perf1_btn4, perf1_ex4, perf1_btn3, perf1_ex3, perf1_btn2, perf1_ex2, perf1_btn1, perf1_ex1, perf1_bg1, perf1_bg2]
for thisComponent in Performance_1Components:
    thisComponent.tStart = None
    thisComponent.tStop = None
    thisComponent.tStartRefresh = None
    thisComponent.tStopRefresh = None
    if hasattr(thisComponent, 'status'):
        thisComponent.status = NOT_STARTED
# reset timers
t = 0
_timeToFirstFrame = win.getFutureFlipTime(clock="now")
Performance_1Clock.reset(-_timeToFirstFrame)  # t0 is time of first possible flip
frameN = -1

# -------Run Routine "Performance_1"-------
while continueRoutine and routineTimer.getTime() > 0:
    # get current time
    t = Performance_1Clock.getTime()
    tThisFlip = win.getFutureFlipTime(clock=Performance_1Clock)
    tThisFlipGlobal = win.getFutureFlipTime(clock=None)
    frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
    # update/draw components on each frame
    
    # *perf1_num* updates
    if perf1_num.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        perf1_num.frameNStart = frameN  # exact frame index
        perf1_num.tStart = t  # local t and not account for scr refresh
        perf1_num.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(perf1_num, 'tStartRefresh')  # time at next scr refresh
        perf1_num.setAutoDraw(True)
    if perf1_num.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > perf1_num.tStartRefresh + 300.0-frameTolerance:
            # keep track of stop time/frame for later
            perf1_num.tStop = t  # not accounting for scr refresh
            perf1_num.frameNStop = frameN  # exact frame index
            win.timeOnFlip(perf1_num, 'tStopRefresh')  # time at next scr refresh
            perf1_num.setAutoDraw(False)
    
    # *perf1_txt1* updates
    if perf1_txt1.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        perf1_txt1.frameNStart = frameN  # exact frame index
        perf1_txt1.tStart = t  # local t and not account for scr refresh
        perf1_txt1.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(perf1_txt1, 'tStartRefresh')  # time at next scr refresh
        perf1_txt1.setAutoDraw(True)
    if perf1_txt1.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > perf1_txt1.tStartRefresh + 300.0-frameTolerance:
            # keep track of stop time/frame for later
            perf1_txt1.tStop = t  # not accounting for scr refresh
            perf1_txt1.frameNStop = frameN  # exact frame index
            win.timeOnFlip(perf1_txt1, 'tStopRefresh')  # time at next scr refresh
            perf1_txt1.setAutoDraw(False)
    
    # *perf1_btn5* updates
    if perf1_btn5.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
        # keep track of start time/frame for later
        perf1_btn5.frameNStart = frameN  # exact frame index
        perf1_btn5.tStart = t  # local t and not account for scr refresh
        perf1_btn5.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(perf1_btn5, 'tStartRefresh')  # time at next scr refresh
        perf1_btn5.setAutoDraw(True)
    if perf1_btn5.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > perf1_btn5.tStartRefresh + 300.0-frameTolerance:
            # keep track of stop time/frame for later
            perf1_btn5.tStop = t  # not accounting for scr refresh
            perf1_btn5.frameNStop = frameN  # exact frame index
            win.timeOnFlip(perf1_btn5, 'tStopRefresh')  # time at next scr refresh
            perf1_btn5.setAutoDraw(False)
    if perf1_btn5.status == STARTED:
        # check whether perf1_btn5 has been pressed
        if perf1_btn5.isClicked:
            if not perf1_btn5.wasClicked:
                perf1_btn5.timesOn.append(perf1_btn5.buttonClock.getTime()) # store time of first click
                perf1_btn5.timesOff.append(perf1_btn5.buttonClock.getTime()) # store time clicked until
            else:
                perf1_btn5.timesOff[-1] = perf1_btn5.buttonClock.getTime() # update time clicked until
            if not perf1_btn5.wasClicked:
                continueRoutine = False  # end routine when perf1_btn5 is clicked
                continueRoutine = True
                if 'perf1_btn5' in btn_locks and btn_locks['perf1_btn5']:
                                    btn_locks['perf1_btn5'] = LOCK_OFF
                                    time.sleep(0.1)
                                    continueRoutine = False
            perf1_btn5.wasClicked = True  # if perf1_btn5 is still clicked next frame, it is not a new click
        else:
            perf1_btn5.wasClicked = False  # if perf1_btn5 is clicked next frame, it is a new click
    else:
        perf1_btn5.buttonClock.reset() # keep clock at 0 if button hasn't started / has finished
        perf1_btn5.wasClicked = False  # if perf1_btn5 is clicked next frame, it is a new click
    
    # *perf1_ex5* updates
    if perf1_ex5.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        perf1_ex5.frameNStart = frameN  # exact frame index
        perf1_ex5.tStart = t  # local t and not account for scr refresh
        perf1_ex5.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(perf1_ex5, 'tStartRefresh')  # time at next scr refresh
        perf1_ex5.setAutoDraw(True)
    if perf1_ex5.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > perf1_ex5.tStartRefresh + 300.0-frameTolerance:
            # keep track of stop time/frame for later
            perf1_ex5.tStop = t  # not accounting for scr refresh
            perf1_ex5.frameNStop = frameN  # exact frame index
            win.timeOnFlip(perf1_ex5, 'tStopRefresh')  # time at next scr refresh
            perf1_ex5.setAutoDraw(False)
    
    # *perf1_btn4* updates
    if perf1_btn4.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
        # keep track of start time/frame for later
        perf1_btn4.frameNStart = frameN  # exact frame index
        perf1_btn4.tStart = t  # local t and not account for scr refresh
        perf1_btn4.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(perf1_btn4, 'tStartRefresh')  # time at next scr refresh
        perf1_btn4.setAutoDraw(True)
    if perf1_btn4.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > perf1_btn4.tStartRefresh + 300.0-frameTolerance:
            # keep track of stop time/frame for later
            perf1_btn4.tStop = t  # not accounting for scr refresh
            perf1_btn4.frameNStop = frameN  # exact frame index
            win.timeOnFlip(perf1_btn4, 'tStopRefresh')  # time at next scr refresh
            perf1_btn4.setAutoDraw(False)
    if perf1_btn4.status == STARTED:
        # check whether perf1_btn4 has been pressed
        if perf1_btn4.isClicked:
            if not perf1_btn4.wasClicked:
                perf1_btn4.timesOn.append(perf1_btn4.buttonClock.getTime()) # store time of first click
                perf1_btn4.timesOff.append(perf1_btn4.buttonClock.getTime()) # store time clicked until
            else:
                perf1_btn4.timesOff[-1] = perf1_btn4.buttonClock.getTime() # update time clicked until
            if not perf1_btn4.wasClicked:
                if 'perf1_btn4' in btn_locks and btn_locks['perf1_btn4']:
                                    perf1_ex4.setOpacity(0.0)
                                    perf1_btn4.setOpacity(0.0)
                                    perf1_ex5.setOpacity(1.0)
                                    time.sleep(0.1)
                                    perf1_btn5.setOpacity(1.0)
                
                                    btn_locks['perf1_btn5'] = LOCK_ON
                                    btn_locks['perf1_btn4'] = LOCK_OFF
                                    perf1_num.setText('Test example 5 (this could be removed)')
            perf1_btn4.wasClicked = True  # if perf1_btn4 is still clicked next frame, it is not a new click
        else:
            perf1_btn4.wasClicked = False  # if perf1_btn4 is clicked next frame, it is a new click
    else:
        perf1_btn4.buttonClock.reset() # keep clock at 0 if button hasn't started / has finished
        perf1_btn4.wasClicked = False  # if perf1_btn4 is clicked next frame, it is a new click
    
    # *perf1_ex4* updates
    if perf1_ex4.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        perf1_ex4.frameNStart = frameN  # exact frame index
        perf1_ex4.tStart = t  # local t and not account for scr refresh
        perf1_ex4.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(perf1_ex4, 'tStartRefresh')  # time at next scr refresh
        perf1_ex4.setAutoDraw(True)
    if perf1_ex4.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > perf1_ex4.tStartRefresh + 300.0-frameTolerance:
            # keep track of stop time/frame for later
            perf1_ex4.tStop = t  # not accounting for scr refresh
            perf1_ex4.frameNStop = frameN  # exact frame index
            win.timeOnFlip(perf1_ex4, 'tStopRefresh')  # time at next scr refresh
            perf1_ex4.setAutoDraw(False)
    
    # *perf1_btn3* updates
    if perf1_btn3.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
        # keep track of start time/frame for later
        perf1_btn3.frameNStart = frameN  # exact frame index
        perf1_btn3.tStart = t  # local t and not account for scr refresh
        perf1_btn3.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(perf1_btn3, 'tStartRefresh')  # time at next scr refresh
        perf1_btn3.setAutoDraw(True)
    if perf1_btn3.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > perf1_btn3.tStartRefresh + 300.0-frameTolerance:
            # keep track of stop time/frame for later
            perf1_btn3.tStop = t  # not accounting for scr refresh
            perf1_btn3.frameNStop = frameN  # exact frame index
            win.timeOnFlip(perf1_btn3, 'tStopRefresh')  # time at next scr refresh
            perf1_btn3.setAutoDraw(False)
    if perf1_btn3.status == STARTED:
        # check whether perf1_btn3 has been pressed
        if perf1_btn3.isClicked:
            if not perf1_btn3.wasClicked:
                perf1_btn3.timesOn.append(perf1_btn3.buttonClock.getTime()) # store time of first click
                perf1_btn3.timesOff.append(perf1_btn3.buttonClock.getTime()) # store time clicked until
            else:
                perf1_btn3.timesOff[-1] = perf1_btn3.buttonClock.getTime() # update time clicked until
            if not perf1_btn3.wasClicked:
                if 'perf1_btn3' in btn_locks and btn_locks['perf1_btn3']:
                                    perf1_ex3.setOpacity(0.0)
                                    perf1_btn3.setOpacity(0.0)
                                    perf1_ex4.setOpacity(1.0)
                                    time.sleep(0.1)
                                    perf1_btn4.setOpacity(1.0)
                
                                    btn_locks['perf1_btn4'] = LOCK_ON
                                    btn_locks['perf1_btn3'] = LOCK_OFF
                                    perf1_num.setText('Test example 4 (this could be removed)')
            perf1_btn3.wasClicked = True  # if perf1_btn3 is still clicked next frame, it is not a new click
        else:
            perf1_btn3.wasClicked = False  # if perf1_btn3 is clicked next frame, it is a new click
    else:
        perf1_btn3.buttonClock.reset() # keep clock at 0 if button hasn't started / has finished
        perf1_btn3.wasClicked = False  # if perf1_btn3 is clicked next frame, it is a new click
    
    # *perf1_ex3* updates
    if perf1_ex3.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        perf1_ex3.frameNStart = frameN  # exact frame index
        perf1_ex3.tStart = t  # local t and not account for scr refresh
        perf1_ex3.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(perf1_ex3, 'tStartRefresh')  # time at next scr refresh
        perf1_ex3.setAutoDraw(True)
    if perf1_ex3.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > perf1_ex3.tStartRefresh + 300.0-frameTolerance:
            # keep track of stop time/frame for later
            perf1_ex3.tStop = t  # not accounting for scr refresh
            perf1_ex3.frameNStop = frameN  # exact frame index
            win.timeOnFlip(perf1_ex3, 'tStopRefresh')  # time at next scr refresh
            perf1_ex3.setAutoDraw(False)
    
    # *perf1_btn2* updates
    if perf1_btn2.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
        # keep track of start time/frame for later
        perf1_btn2.frameNStart = frameN  # exact frame index
        perf1_btn2.tStart = t  # local t and not account for scr refresh
        perf1_btn2.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(perf1_btn2, 'tStartRefresh')  # time at next scr refresh
        perf1_btn2.setAutoDraw(True)
    if perf1_btn2.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > perf1_btn2.tStartRefresh + 300.0-frameTolerance:
            # keep track of stop time/frame for later
            perf1_btn2.tStop = t  # not accounting for scr refresh
            perf1_btn2.frameNStop = frameN  # exact frame index
            win.timeOnFlip(perf1_btn2, 'tStopRefresh')  # time at next scr refresh
            perf1_btn2.setAutoDraw(False)
    if perf1_btn2.status == STARTED:
        # check whether perf1_btn2 has been pressed
        if perf1_btn2.isClicked:
            if not perf1_btn2.wasClicked:
                perf1_btn2.timesOn.append(perf1_btn2.buttonClock.getTime()) # store time of first click
                perf1_btn2.timesOff.append(perf1_btn2.buttonClock.getTime()) # store time clicked until
            else:
                perf1_btn2.timesOff[-1] = perf1_btn2.buttonClock.getTime() # update time clicked until
            if not perf1_btn2.wasClicked:
                if 'perf1_btn2' in btn_locks and btn_locks['perf1_btn2']:
                                    perf1_ex2.setOpacity(0.0)
                                    perf1_btn2.setOpacity(0.0)
                                    perf1_ex3.setOpacity(1.0)
                                    time.sleep(0.1)
                                    perf1_btn3.setOpacity(1.0)
                
                                    btn_locks['perf1_btn3'] = LOCK_ON
                                    btn_locks['perf1_btn2'] = LOCK_OFF
                                    perf1_num.setText('Test example 3 (this could be removed)')
            perf1_btn2.wasClicked = True  # if perf1_btn2 is still clicked next frame, it is not a new click
        else:
            perf1_btn2.wasClicked = False  # if perf1_btn2 is clicked next frame, it is a new click
    else:
        perf1_btn2.buttonClock.reset() # keep clock at 0 if button hasn't started / has finished
        perf1_btn2.wasClicked = False  # if perf1_btn2 is clicked next frame, it is a new click
    
    # *perf1_ex2* updates
    if perf1_ex2.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        perf1_ex2.frameNStart = frameN  # exact frame index
        perf1_ex2.tStart = t  # local t and not account for scr refresh
        perf1_ex2.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(perf1_ex2, 'tStartRefresh')  # time at next scr refresh
        perf1_ex2.setAutoDraw(True)
    if perf1_ex2.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > perf1_ex2.tStartRefresh + 300.0-frameTolerance:
            # keep track of stop time/frame for later
            perf1_ex2.tStop = t  # not accounting for scr refresh
            perf1_ex2.frameNStop = frameN  # exact frame index
            win.timeOnFlip(perf1_ex2, 'tStopRefresh')  # time at next scr refresh
            perf1_ex2.setAutoDraw(False)
    
    # *perf1_btn1* updates
    if perf1_btn1.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
        # keep track of start time/frame for later
        perf1_btn1.frameNStart = frameN  # exact frame index
        perf1_btn1.tStart = t  # local t and not account for scr refresh
        perf1_btn1.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(perf1_btn1, 'tStartRefresh')  # time at next scr refresh
        perf1_btn1.setAutoDraw(True)
    if perf1_btn1.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > perf1_btn1.tStartRefresh + 300.0-frameTolerance:
            # keep track of stop time/frame for later
            perf1_btn1.tStop = t  # not accounting for scr refresh
            perf1_btn1.frameNStop = frameN  # exact frame index
            win.timeOnFlip(perf1_btn1, 'tStopRefresh')  # time at next scr refresh
            perf1_btn1.setAutoDraw(False)
    if perf1_btn1.status == STARTED:
        # check whether perf1_btn1 has been pressed
        if perf1_btn1.isClicked:
            if not perf1_btn1.wasClicked:
                perf1_btn1.timesOn.append(perf1_btn1.buttonClock.getTime()) # store time of first click
                perf1_btn1.timesOff.append(perf1_btn1.buttonClock.getTime()) # store time clicked until
            else:
                perf1_btn1.timesOff[-1] = perf1_btn1.buttonClock.getTime() # update time clicked until
            if not perf1_btn1.wasClicked:
                if 'perf1_btn1' not in btn_locks:
                                    perf1_ex1.setOpacity(0.0)
                                    perf1_btn1.setOpacity(0.0)
                                    perf1_ex2.setOpacity(1.0)
                                    time.sleep(0.1)
                                    perf1_btn2.setOpacity(1.0)
                
                                    btn_locks['perf1_btn2'] = LOCK_ON
                                    btn_locks['perf1_btn1'] = LOCK_OFF
                                    perf1_num.setText('Test example 2 (this could be removed)')
            perf1_btn1.wasClicked = True  # if perf1_btn1 is still clicked next frame, it is not a new click
        else:
            perf1_btn1.wasClicked = False  # if perf1_btn1 is clicked next frame, it is a new click
    else:
        perf1_btn1.buttonClock.reset() # keep clock at 0 if button hasn't started / has finished
        perf1_btn1.wasClicked = False  # if perf1_btn1 is clicked next frame, it is a new click
    
    # *perf1_ex1* updates
    if perf1_ex1.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        perf1_ex1.frameNStart = frameN  # exact frame index
        perf1_ex1.tStart = t  # local t and not account for scr refresh
        perf1_ex1.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(perf1_ex1, 'tStartRefresh')  # time at next scr refresh
        perf1_ex1.setAutoDraw(True)
    if perf1_ex1.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > perf1_ex1.tStartRefresh + 300.0-frameTolerance:
            # keep track of stop time/frame for later
            perf1_ex1.tStop = t  # not accounting for scr refresh
            perf1_ex1.frameNStop = frameN  # exact frame index
            win.timeOnFlip(perf1_ex1, 'tStopRefresh')  # time at next scr refresh
            perf1_ex1.setAutoDraw(False)
    
    # *perf1_bg1* updates
    if perf1_bg1.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        perf1_bg1.frameNStart = frameN  # exact frame index
        perf1_bg1.tStart = t  # local t and not account for scr refresh
        perf1_bg1.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(perf1_bg1, 'tStartRefresh')  # time at next scr refresh
        perf1_bg1.setAutoDraw(True)
    if perf1_bg1.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > perf1_bg1.tStartRefresh + 300.0-frameTolerance:
            # keep track of stop time/frame for later
            perf1_bg1.tStop = t  # not accounting for scr refresh
            perf1_bg1.frameNStop = frameN  # exact frame index
            win.timeOnFlip(perf1_bg1, 'tStopRefresh')  # time at next scr refresh
            perf1_bg1.setAutoDraw(False)
    
    # *perf1_bg2* updates
    if perf1_bg2.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        perf1_bg2.frameNStart = frameN  # exact frame index
        perf1_bg2.tStart = t  # local t and not account for scr refresh
        perf1_bg2.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(perf1_bg2, 'tStartRefresh')  # time at next scr refresh
        perf1_bg2.setAutoDraw(True)
    if perf1_bg2.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > perf1_bg2.tStartRefresh + 300.0-frameTolerance:
            # keep track of stop time/frame for later
            perf1_bg2.tStop = t  # not accounting for scr refresh
            perf1_bg2.frameNStop = frameN  # exact frame index
            win.timeOnFlip(perf1_bg2, 'tStopRefresh')  # time at next scr refresh
            perf1_bg2.setAutoDraw(False)
    
    # check for quit (typically the Esc key)
    if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
        core.quit()
    
    # check if all components have finished
    if not continueRoutine:  # a component has requested a forced-end of Routine
        break
    continueRoutine = False  # will revert to True if at least one component still running
    for thisComponent in Performance_1Components:
        if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
            continueRoutine = True
            break  # at least one component has not yet finished
    
    # refresh the screen
    if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
        win.flip()

# -------Ending Routine "Performance_1"-------
for thisComponent in Performance_1Components:
    if hasattr(thisComponent, "setAutoDraw"):
        thisComponent.setAutoDraw(False)
thisExp.addData('perf1_num.started', perf1_num.tStartRefresh)
thisExp.addData('perf1_num.stopped', perf1_num.tStopRefresh)
thisExp.addData('perf1_txt1.started', perf1_txt1.tStartRefresh)
thisExp.addData('perf1_txt1.stopped', perf1_txt1.tStopRefresh)
thisExp.addData('perf1_btn5.started', perf1_btn5.tStartRefresh)
thisExp.addData('perf1_btn5.stopped', perf1_btn5.tStopRefresh)
thisExp.addData('perf1_btn5.numClicks', perf1_btn5.numClicks)
if perf1_btn5.numClicks:
   thisExp.addData('perf1_btn5.timesOn', perf1_btn5.timesOn)
   thisExp.addData('perf1_btn5.timesOff', perf1_btn5.timesOff)
else:
   thisExp.addData('perf1_btn5.timesOn', "")
   thisExp.addData('perf1_btn5.timesOff', "")
thisExp.addData('perf1_ex5.started', perf1_ex5.tStartRefresh)
thisExp.addData('perf1_ex5.stopped', perf1_ex5.tStopRefresh)
thisExp.addData('perf1_btn4.started', perf1_btn4.tStartRefresh)
thisExp.addData('perf1_btn4.stopped', perf1_btn4.tStopRefresh)
thisExp.addData('perf1_btn4.numClicks', perf1_btn4.numClicks)
if perf1_btn4.numClicks:
   thisExp.addData('perf1_btn4.timesOn', perf1_btn4.timesOn)
   thisExp.addData('perf1_btn4.timesOff', perf1_btn4.timesOff)
else:
   thisExp.addData('perf1_btn4.timesOn', "")
   thisExp.addData('perf1_btn4.timesOff', "")
thisExp.addData('perf1_ex4.started', perf1_ex4.tStartRefresh)
thisExp.addData('perf1_ex4.stopped', perf1_ex4.tStopRefresh)
thisExp.addData('perf1_btn3.started', perf1_btn3.tStartRefresh)
thisExp.addData('perf1_btn3.stopped', perf1_btn3.tStopRefresh)
thisExp.addData('perf1_btn3.numClicks', perf1_btn3.numClicks)
if perf1_btn3.numClicks:
   thisExp.addData('perf1_btn3.timesOn', perf1_btn3.timesOn)
   thisExp.addData('perf1_btn3.timesOff', perf1_btn3.timesOff)
else:
   thisExp.addData('perf1_btn3.timesOn', "")
   thisExp.addData('perf1_btn3.timesOff', "")
thisExp.addData('perf1_ex3.started', perf1_ex3.tStartRefresh)
thisExp.addData('perf1_ex3.stopped', perf1_ex3.tStopRefresh)
thisExp.addData('perf1_btn2.started', perf1_btn2.tStartRefresh)
thisExp.addData('perf1_btn2.stopped', perf1_btn2.tStopRefresh)
thisExp.addData('perf1_btn2.numClicks', perf1_btn2.numClicks)
if perf1_btn2.numClicks:
   thisExp.addData('perf1_btn2.timesOn', perf1_btn2.timesOn)
   thisExp.addData('perf1_btn2.timesOff', perf1_btn2.timesOff)
else:
   thisExp.addData('perf1_btn2.timesOn', "")
   thisExp.addData('perf1_btn2.timesOff', "")
thisExp.addData('perf1_ex2.started', perf1_ex2.tStartRefresh)
thisExp.addData('perf1_ex2.stopped', perf1_ex2.tStopRefresh)
thisExp.addData('perf1_btn1.started', perf1_btn1.tStartRefresh)
thisExp.addData('perf1_btn1.stopped', perf1_btn1.tStopRefresh)
thisExp.addData('perf1_btn1.numClicks', perf1_btn1.numClicks)
if perf1_btn1.numClicks:
   thisExp.addData('perf1_btn1.timesOn', perf1_btn1.timesOn)
   thisExp.addData('perf1_btn1.timesOff', perf1_btn1.timesOff)
else:
   thisExp.addData('perf1_btn1.timesOn', "")
   thisExp.addData('perf1_btn1.timesOff', "")
thisExp.addData('perf1_ex1.started', perf1_ex1.tStartRefresh)
thisExp.addData('perf1_ex1.stopped', perf1_ex1.tStopRefresh)
thisExp.addData('perf1_bg1.started', perf1_bg1.tStartRefresh)
thisExp.addData('perf1_bg1.stopped', perf1_bg1.tStopRefresh)
thisExp.addData('perf1_bg2.started', perf1_bg2.tStartRefresh)
thisExp.addData('perf1_bg2.stopped', perf1_bg2.tStopRefresh)

# ------Prepare to start Routine "Instructions_2"-------
continueRoutine = True
routineTimer.add(300.500000)
# update component parameters for each repeat
# keep track of which components have finished
Instructions_2Components = [instr2_txt1, instr2_btn3, instr2_ex3, instr2_btn2, instr2_ex2, instr2_btn1, instr2_ex1]
for thisComponent in Instructions_2Components:
    thisComponent.tStart = None
    thisComponent.tStop = None
    thisComponent.tStartRefresh = None
    thisComponent.tStopRefresh = None
    if hasattr(thisComponent, 'status'):
        thisComponent.status = NOT_STARTED
# reset timers
t = 0
_timeToFirstFrame = win.getFutureFlipTime(clock="now")
Instructions_2Clock.reset(-_timeToFirstFrame)  # t0 is time of first possible flip
frameN = -1

# -------Run Routine "Instructions_2"-------
while continueRoutine and routineTimer.getTime() > 0:
    # get current time
    t = Instructions_2Clock.getTime()
    tThisFlip = win.getFutureFlipTime(clock=Instructions_2Clock)
    tThisFlipGlobal = win.getFutureFlipTime(clock=None)
    frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
    # update/draw components on each frame
    
    # *instr2_txt1* updates
    if instr2_txt1.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        instr2_txt1.frameNStart = frameN  # exact frame index
        instr2_txt1.tStart = t  # local t and not account for scr refresh
        instr2_txt1.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(instr2_txt1, 'tStartRefresh')  # time at next scr refresh
        instr2_txt1.setAutoDraw(True)
    if instr2_txt1.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > instr2_txt1.tStartRefresh + 300.0-frameTolerance:
            # keep track of stop time/frame for later
            instr2_txt1.tStop = t  # not accounting for scr refresh
            instr2_txt1.frameNStop = frameN  # exact frame index
            win.timeOnFlip(instr2_txt1, 'tStopRefresh')  # time at next scr refresh
            instr2_txt1.setAutoDraw(False)
    
    # *instr2_btn3* updates
    if instr2_btn3.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
        # keep track of start time/frame for later
        instr2_btn3.frameNStart = frameN  # exact frame index
        instr2_btn3.tStart = t  # local t and not account for scr refresh
        instr2_btn3.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(instr2_btn3, 'tStartRefresh')  # time at next scr refresh
        instr2_btn3.setAutoDraw(True)
    if instr2_btn3.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > instr2_btn3.tStartRefresh + 300.0-frameTolerance:
            # keep track of stop time/frame for later
            instr2_btn3.tStop = t  # not accounting for scr refresh
            instr2_btn3.frameNStop = frameN  # exact frame index
            win.timeOnFlip(instr2_btn3, 'tStopRefresh')  # time at next scr refresh
            instr2_btn3.setAutoDraw(False)
    if instr2_btn3.status == STARTED:
        # check whether instr2_btn3 has been pressed
        if instr2_btn3.isClicked:
            if not instr2_btn3.wasClicked:
                instr2_btn3.timesOn.append(instr2_btn3.buttonClock.getTime()) # store time of first click
                instr2_btn3.timesOff.append(instr2_btn3.buttonClock.getTime()) # store time clicked until
            else:
                instr2_btn3.timesOff[-1] = instr2_btn3.buttonClock.getTime() # update time clicked until
            if not instr2_btn3.wasClicked:
                continueRoutine = False  # end routine when instr2_btn3 is clicked
                continueRoutine = True
                if 'instr2_btn3' in btn_locks and btn_locks['instr2_btn3']:
                                    btn_locks['instr2_btn3'] = LOCK_OFF
                                    time.sleep(0.1)
                                    continueRoutine = False
            instr2_btn3.wasClicked = True  # if instr2_btn3 is still clicked next frame, it is not a new click
        else:
            instr2_btn3.wasClicked = False  # if instr2_btn3 is clicked next frame, it is a new click
    else:
        instr2_btn3.buttonClock.reset() # keep clock at 0 if button hasn't started / has finished
        instr2_btn3.wasClicked = False  # if instr2_btn3 is clicked next frame, it is a new click
    
    # *instr2_ex3* updates
    if instr2_ex3.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        instr2_ex3.frameNStart = frameN  # exact frame index
        instr2_ex3.tStart = t  # local t and not account for scr refresh
        instr2_ex3.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(instr2_ex3, 'tStartRefresh')  # time at next scr refresh
        instr2_ex3.setAutoDraw(True)
    if instr2_ex3.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > instr2_ex3.tStartRefresh + 300.0-frameTolerance:
            # keep track of stop time/frame for later
            instr2_ex3.tStop = t  # not accounting for scr refresh
            instr2_ex3.frameNStop = frameN  # exact frame index
            win.timeOnFlip(instr2_ex3, 'tStopRefresh')  # time at next scr refresh
            instr2_ex3.setAutoDraw(False)
    
    # *instr2_btn2* updates
    if instr2_btn2.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
        # keep track of start time/frame for later
        instr2_btn2.frameNStart = frameN  # exact frame index
        instr2_btn2.tStart = t  # local t and not account for scr refresh
        instr2_btn2.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(instr2_btn2, 'tStartRefresh')  # time at next scr refresh
        instr2_btn2.setAutoDraw(True)
    if instr2_btn2.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > instr2_btn2.tStartRefresh + 300.0-frameTolerance:
            # keep track of stop time/frame for later
            instr2_btn2.tStop = t  # not accounting for scr refresh
            instr2_btn2.frameNStop = frameN  # exact frame index
            win.timeOnFlip(instr2_btn2, 'tStopRefresh')  # time at next scr refresh
            instr2_btn2.setAutoDraw(False)
    if instr2_btn2.status == STARTED:
        # check whether instr2_btn2 has been pressed
        if instr2_btn2.isClicked:
            if not instr2_btn2.wasClicked:
                instr2_btn2.timesOn.append(instr2_btn2.buttonClock.getTime()) # store time of first click
                instr2_btn2.timesOff.append(instr2_btn2.buttonClock.getTime()) # store time clicked until
            else:
                instr2_btn2.timesOff[-1] = instr2_btn2.buttonClock.getTime() # update time clicked until
            if not instr2_btn2.wasClicked:
                if 'instr2_btn2' in btn_locks and btn_locks['instr2_btn2']:
                                    instr2_ex2.setOpacity(0.0)
                                    instr2_btn2.setOpacity(0.0)
                                    instr2_ex3.setOpacity(1.0)
                                    time.sleep(0.1)
                                    instr2_btn3.setOpacity(1.0)
                
                                    btn_locks['instr2_btn3'] = LOCK_ON
                                    btn_locks['instr2_btn2'] = LOCK_OFF
            instr2_btn2.wasClicked = True  # if instr2_btn2 is still clicked next frame, it is not a new click
        else:
            instr2_btn2.wasClicked = False  # if instr2_btn2 is clicked next frame, it is a new click
    else:
        instr2_btn2.buttonClock.reset() # keep clock at 0 if button hasn't started / has finished
        instr2_btn2.wasClicked = False  # if instr2_btn2 is clicked next frame, it is a new click
    
    # *instr2_ex2* updates
    if instr2_ex2.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        instr2_ex2.frameNStart = frameN  # exact frame index
        instr2_ex2.tStart = t  # local t and not account for scr refresh
        instr2_ex2.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(instr2_ex2, 'tStartRefresh')  # time at next scr refresh
        instr2_ex2.setAutoDraw(True)
    if instr2_ex2.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > instr2_ex2.tStartRefresh + 300.0-frameTolerance:
            # keep track of stop time/frame for later
            instr2_ex2.tStop = t  # not accounting for scr refresh
            instr2_ex2.frameNStop = frameN  # exact frame index
            win.timeOnFlip(instr2_ex2, 'tStopRefresh')  # time at next scr refresh
            instr2_ex2.setAutoDraw(False)
    
    # *instr2_btn1* updates
    if instr2_btn1.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
        # keep track of start time/frame for later
        instr2_btn1.frameNStart = frameN  # exact frame index
        instr2_btn1.tStart = t  # local t and not account for scr refresh
        instr2_btn1.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(instr2_btn1, 'tStartRefresh')  # time at next scr refresh
        instr2_btn1.setAutoDraw(True)
    if instr2_btn1.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > instr2_btn1.tStartRefresh + 300.0-frameTolerance:
            # keep track of stop time/frame for later
            instr2_btn1.tStop = t  # not accounting for scr refresh
            instr2_btn1.frameNStop = frameN  # exact frame index
            win.timeOnFlip(instr2_btn1, 'tStopRefresh')  # time at next scr refresh
            instr2_btn1.setAutoDraw(False)
    if instr2_btn1.status == STARTED:
        # check whether instr2_btn1 has been pressed
        if instr2_btn1.isClicked:
            if not instr2_btn1.wasClicked:
                instr2_btn1.timesOn.append(instr2_btn1.buttonClock.getTime()) # store time of first click
                instr2_btn1.timesOff.append(instr2_btn1.buttonClock.getTime()) # store time clicked until
            else:
                instr2_btn1.timesOff[-1] = instr2_btn1.buttonClock.getTime() # update time clicked until
            if not instr2_btn1.wasClicked:
                if 'instr2_btn1' not in btn_locks:
                                    instr2_ex1.setOpacity(0.0)
                                    instr2_btn1.setOpacity(0.0)
                                    instr2_ex2.setOpacity(1.0)
                                    time.sleep(0.1)
                                    instr2_btn2.setOpacity(1.0)
                
                                    btn_locks['instr2_btn2'] = LOCK_ON
                                    btn_locks['instr2_btn1'] = LOCK_OFF
            instr2_btn1.wasClicked = True  # if instr2_btn1 is still clicked next frame, it is not a new click
        else:
            instr2_btn1.wasClicked = False  # if instr2_btn1 is clicked next frame, it is a new click
    else:
        instr2_btn1.buttonClock.reset() # keep clock at 0 if button hasn't started / has finished
        instr2_btn1.wasClicked = False  # if instr2_btn1 is clicked next frame, it is a new click
    
    # *instr2_ex1* updates
    if instr2_ex1.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        instr2_ex1.frameNStart = frameN  # exact frame index
        instr2_ex1.tStart = t  # local t and not account for scr refresh
        instr2_ex1.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(instr2_ex1, 'tStartRefresh')  # time at next scr refresh
        instr2_ex1.setAutoDraw(True)
    if instr2_ex1.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > instr2_ex1.tStartRefresh + 300.0-frameTolerance:
            # keep track of stop time/frame for later
            instr2_ex1.tStop = t  # not accounting for scr refresh
            instr2_ex1.frameNStop = frameN  # exact frame index
            win.timeOnFlip(instr2_ex1, 'tStopRefresh')  # time at next scr refresh
            instr2_ex1.setAutoDraw(False)
    
    # check for quit (typically the Esc key)
    if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
        core.quit()
    
    # check if all components have finished
    if not continueRoutine:  # a component has requested a forced-end of Routine
        break
    continueRoutine = False  # will revert to True if at least one component still running
    for thisComponent in Instructions_2Components:
        if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
            continueRoutine = True
            break  # at least one component has not yet finished
    
    # refresh the screen
    if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
        win.flip()

# -------Ending Routine "Instructions_2"-------
for thisComponent in Instructions_2Components:
    if hasattr(thisComponent, "setAutoDraw"):
        thisComponent.setAutoDraw(False)
thisExp.addData('instr2_txt1.started', instr2_txt1.tStartRefresh)
thisExp.addData('instr2_txt1.stopped', instr2_txt1.tStopRefresh)
thisExp.addData('instr2_btn3.started', instr2_btn3.tStartRefresh)
thisExp.addData('instr2_btn3.stopped', instr2_btn3.tStopRefresh)
thisExp.addData('instr2_btn3.numClicks', instr2_btn3.numClicks)
if instr2_btn3.numClicks:
   thisExp.addData('instr2_btn3.timesOn', instr2_btn3.timesOn)
   thisExp.addData('instr2_btn3.timesOff', instr2_btn3.timesOff)
else:
   thisExp.addData('instr2_btn3.timesOn', "")
   thisExp.addData('instr2_btn3.timesOff', "")
thisExp.addData('instr2_ex3.started', instr2_ex3.tStartRefresh)
thisExp.addData('instr2_ex3.stopped', instr2_ex3.tStopRefresh)
thisExp.addData('instr2_btn2.started', instr2_btn2.tStartRefresh)
thisExp.addData('instr2_btn2.stopped', instr2_btn2.tStopRefresh)
thisExp.addData('instr2_btn2.numClicks', instr2_btn2.numClicks)
if instr2_btn2.numClicks:
   thisExp.addData('instr2_btn2.timesOn', instr2_btn2.timesOn)
   thisExp.addData('instr2_btn2.timesOff', instr2_btn2.timesOff)
else:
   thisExp.addData('instr2_btn2.timesOn', "")
   thisExp.addData('instr2_btn2.timesOff', "")
thisExp.addData('instr2_ex2.started', instr2_ex2.tStartRefresh)
thisExp.addData('instr2_ex2.stopped', instr2_ex2.tStopRefresh)
thisExp.addData('instr2_btn1.started', instr2_btn1.tStartRefresh)
thisExp.addData('instr2_btn1.stopped', instr2_btn1.tStopRefresh)
thisExp.addData('instr2_btn1.numClicks', instr2_btn1.numClicks)
if instr2_btn1.numClicks:
   thisExp.addData('instr2_btn1.timesOn', instr2_btn1.timesOn)
   thisExp.addData('instr2_btn1.timesOff', instr2_btn1.timesOff)
else:
   thisExp.addData('instr2_btn1.timesOn', "")
   thisExp.addData('instr2_btn1.timesOff', "")
thisExp.addData('instr2_ex1.started', instr2_ex1.tStartRefresh)
thisExp.addData('instr2_ex1.stopped', instr2_ex1.tStopRefresh)

# ------Prepare to start Routine "Training_2"-------
continueRoutine = True
routineTimer.add(300.500000)
# update component parameters for each repeat
# keep track of which components have finished
Training_2Components = [train2_num, train2_txt1, train2_btn5, train2_ex5, train2_btn4, train2_ex4, train2_btn3, train2_ex3, train2_btn2, train2_ex2, train2_btn1, train2_ex1, train2_bg1, train2_bg2]
for thisComponent in Training_2Components:
    thisComponent.tStart = None
    thisComponent.tStop = None
    thisComponent.tStartRefresh = None
    thisComponent.tStopRefresh = None
    if hasattr(thisComponent, 'status'):
        thisComponent.status = NOT_STARTED
# reset timers
t = 0
_timeToFirstFrame = win.getFutureFlipTime(clock="now")
Training_2Clock.reset(-_timeToFirstFrame)  # t0 is time of first possible flip
frameN = -1

# -------Run Routine "Training_2"-------
while continueRoutine and routineTimer.getTime() > 0:
    # get current time
    t = Training_2Clock.getTime()
    tThisFlip = win.getFutureFlipTime(clock=Training_2Clock)
    tThisFlipGlobal = win.getFutureFlipTime(clock=None)
    frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
    # update/draw components on each frame
    
    # *train2_num* updates
    if train2_num.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        train2_num.frameNStart = frameN  # exact frame index
        train2_num.tStart = t  # local t and not account for scr refresh
        train2_num.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(train2_num, 'tStartRefresh')  # time at next scr refresh
        train2_num.setAutoDraw(True)
    if train2_num.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > train2_num.tStartRefresh + 300.0-frameTolerance:
            # keep track of stop time/frame for later
            train2_num.tStop = t  # not accounting for scr refresh
            train2_num.frameNStop = frameN  # exact frame index
            win.timeOnFlip(train2_num, 'tStopRefresh')  # time at next scr refresh
            train2_num.setAutoDraw(False)
    
    # *train2_txt1* updates
    if train2_txt1.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        train2_txt1.frameNStart = frameN  # exact frame index
        train2_txt1.tStart = t  # local t and not account for scr refresh
        train2_txt1.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(train2_txt1, 'tStartRefresh')  # time at next scr refresh
        train2_txt1.setAutoDraw(True)
    if train2_txt1.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > train2_txt1.tStartRefresh + 300.0-frameTolerance:
            # keep track of stop time/frame for later
            train2_txt1.tStop = t  # not accounting for scr refresh
            train2_txt1.frameNStop = frameN  # exact frame index
            win.timeOnFlip(train2_txt1, 'tStopRefresh')  # time at next scr refresh
            train2_txt1.setAutoDraw(False)
    
    # *train2_btn5* updates
    if train2_btn5.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
        # keep track of start time/frame for later
        train2_btn5.frameNStart = frameN  # exact frame index
        train2_btn5.tStart = t  # local t and not account for scr refresh
        train2_btn5.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(train2_btn5, 'tStartRefresh')  # time at next scr refresh
        train2_btn5.setAutoDraw(True)
    if train2_btn5.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > train2_btn5.tStartRefresh + 300.0-frameTolerance:
            # keep track of stop time/frame for later
            train2_btn5.tStop = t  # not accounting for scr refresh
            train2_btn5.frameNStop = frameN  # exact frame index
            win.timeOnFlip(train2_btn5, 'tStopRefresh')  # time at next scr refresh
            train2_btn5.setAutoDraw(False)
    if train2_btn5.status == STARTED:
        # check whether train2_btn5 has been pressed
        if train2_btn5.isClicked:
            if not train2_btn5.wasClicked:
                train2_btn5.timesOn.append(train2_btn5.buttonClock.getTime()) # store time of first click
                train2_btn5.timesOff.append(train2_btn5.buttonClock.getTime()) # store time clicked until
            else:
                train2_btn5.timesOff[-1] = train2_btn5.buttonClock.getTime() # update time clicked until
            if not train2_btn5.wasClicked:
                continueRoutine = False  # end routine when train2_btn5 is clicked
                continueRoutine = True
                if 'train2_btn5' in btn_locks and btn_locks['train2_btn5']:
                                    btn_locks['train2_btn5'] = LOCK_OFF
                                    time.sleep(0.1)
                                    continueRoutine = False
            train2_btn5.wasClicked = True  # if train2_btn5 is still clicked next frame, it is not a new click
        else:
            train2_btn5.wasClicked = False  # if train2_btn5 is clicked next frame, it is a new click
    else:
        train2_btn5.buttonClock.reset() # keep clock at 0 if button hasn't started / has finished
        train2_btn5.wasClicked = False  # if train2_btn5 is clicked next frame, it is a new click
    
    # *train2_ex5* updates
    if train2_ex5.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        train2_ex5.frameNStart = frameN  # exact frame index
        train2_ex5.tStart = t  # local t and not account for scr refresh
        train2_ex5.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(train2_ex5, 'tStartRefresh')  # time at next scr refresh
        train2_ex5.setAutoDraw(True)
    if train2_ex5.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > train2_ex5.tStartRefresh + 300.0-frameTolerance:
            # keep track of stop time/frame for later
            train2_ex5.tStop = t  # not accounting for scr refresh
            train2_ex5.frameNStop = frameN  # exact frame index
            win.timeOnFlip(train2_ex5, 'tStopRefresh')  # time at next scr refresh
            train2_ex5.setAutoDraw(False)
    
    # *train2_btn4* updates
    if train2_btn4.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
        # keep track of start time/frame for later
        train2_btn4.frameNStart = frameN  # exact frame index
        train2_btn4.tStart = t  # local t and not account for scr refresh
        train2_btn4.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(train2_btn4, 'tStartRefresh')  # time at next scr refresh
        train2_btn4.setAutoDraw(True)
    if train2_btn4.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > train2_btn4.tStartRefresh + 300.0-frameTolerance:
            # keep track of stop time/frame for later
            train2_btn4.tStop = t  # not accounting for scr refresh
            train2_btn4.frameNStop = frameN  # exact frame index
            win.timeOnFlip(train2_btn4, 'tStopRefresh')  # time at next scr refresh
            train2_btn4.setAutoDraw(False)
    if train2_btn4.status == STARTED:
        # check whether train2_btn4 has been pressed
        if train2_btn4.isClicked:
            if not train2_btn4.wasClicked:
                train2_btn4.timesOn.append(train2_btn4.buttonClock.getTime()) # store time of first click
                train2_btn4.timesOff.append(train2_btn4.buttonClock.getTime()) # store time clicked until
            else:
                train2_btn4.timesOff[-1] = train2_btn4.buttonClock.getTime() # update time clicked until
            if not train2_btn4.wasClicked:
                if 'train2_btn4' in btn_locks and btn_locks['train2_btn4']:
                                    train2_ex4.setOpacity(0.0)
                                    train2_btn4.setOpacity(0.0)
                                    train2_ex5.setOpacity(1.0)
                                    time.sleep(0.1)
                                    train2_btn5.setOpacity(1.0)
                
                                    btn_locks['train2_btn5'] = LOCK_ON
                                    btn_locks['train2_btn4'] = LOCK_OFF
                                    train2_num.setText('Training example 5')
            train2_btn4.wasClicked = True  # if train2_btn4 is still clicked next frame, it is not a new click
        else:
            train2_btn4.wasClicked = False  # if train2_btn4 is clicked next frame, it is a new click
    else:
        train2_btn4.buttonClock.reset() # keep clock at 0 if button hasn't started / has finished
        train2_btn4.wasClicked = False  # if train2_btn4 is clicked next frame, it is a new click
    
    # *train2_ex4* updates
    if train2_ex4.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        train2_ex4.frameNStart = frameN  # exact frame index
        train2_ex4.tStart = t  # local t and not account for scr refresh
        train2_ex4.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(train2_ex4, 'tStartRefresh')  # time at next scr refresh
        train2_ex4.setAutoDraw(True)
    if train2_ex4.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > train2_ex4.tStartRefresh + 300.0-frameTolerance:
            # keep track of stop time/frame for later
            train2_ex4.tStop = t  # not accounting for scr refresh
            train2_ex4.frameNStop = frameN  # exact frame index
            win.timeOnFlip(train2_ex4, 'tStopRefresh')  # time at next scr refresh
            train2_ex4.setAutoDraw(False)
    
    # *train2_btn3* updates
    if train2_btn3.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
        # keep track of start time/frame for later
        train2_btn3.frameNStart = frameN  # exact frame index
        train2_btn3.tStart = t  # local t and not account for scr refresh
        train2_btn3.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(train2_btn3, 'tStartRefresh')  # time at next scr refresh
        train2_btn3.setAutoDraw(True)
    if train2_btn3.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > train2_btn3.tStartRefresh + 300.0-frameTolerance:
            # keep track of stop time/frame for later
            train2_btn3.tStop = t  # not accounting for scr refresh
            train2_btn3.frameNStop = frameN  # exact frame index
            win.timeOnFlip(train2_btn3, 'tStopRefresh')  # time at next scr refresh
            train2_btn3.setAutoDraw(False)
    if train2_btn3.status == STARTED:
        # check whether train2_btn3 has been pressed
        if train2_btn3.isClicked:
            if not train2_btn3.wasClicked:
                train2_btn3.timesOn.append(train2_btn3.buttonClock.getTime()) # store time of first click
                train2_btn3.timesOff.append(train2_btn3.buttonClock.getTime()) # store time clicked until
            else:
                train2_btn3.timesOff[-1] = train2_btn3.buttonClock.getTime() # update time clicked until
            if not train2_btn3.wasClicked:
                if 'train2_btn3' in btn_locks and btn_locks['train2_btn3']:
                                    train2_ex3.setOpacity(0.0)
                                    train2_btn3.setOpacity(0.0)
                                    train2_ex4.setOpacity(1.0)
                                    time.sleep(0.1)
                                    train2_btn4.setOpacity(1.0)
                
                                    btn_locks['train2_btn4'] = LOCK_ON
                                    btn_locks['train2_btn3'] = LOCK_OFF
                                    train2_num.setText('Training example 4')
            train2_btn3.wasClicked = True  # if train2_btn3 is still clicked next frame, it is not a new click
        else:
            train2_btn3.wasClicked = False  # if train2_btn3 is clicked next frame, it is a new click
    else:
        train2_btn3.buttonClock.reset() # keep clock at 0 if button hasn't started / has finished
        train2_btn3.wasClicked = False  # if train2_btn3 is clicked next frame, it is a new click
    
    # *train2_ex3* updates
    if train2_ex3.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        train2_ex3.frameNStart = frameN  # exact frame index
        train2_ex3.tStart = t  # local t and not account for scr refresh
        train2_ex3.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(train2_ex3, 'tStartRefresh')  # time at next scr refresh
        train2_ex3.setAutoDraw(True)
    if train2_ex3.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > train2_ex3.tStartRefresh + 300.0-frameTolerance:
            # keep track of stop time/frame for later
            train2_ex3.tStop = t  # not accounting for scr refresh
            train2_ex3.frameNStop = frameN  # exact frame index
            win.timeOnFlip(train2_ex3, 'tStopRefresh')  # time at next scr refresh
            train2_ex3.setAutoDraw(False)
    
    # *train2_btn2* updates
    if train2_btn2.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
        # keep track of start time/frame for later
        train2_btn2.frameNStart = frameN  # exact frame index
        train2_btn2.tStart = t  # local t and not account for scr refresh
        train2_btn2.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(train2_btn2, 'tStartRefresh')  # time at next scr refresh
        train2_btn2.setAutoDraw(True)
    if train2_btn2.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > train2_btn2.tStartRefresh + 300.0-frameTolerance:
            # keep track of stop time/frame for later
            train2_btn2.tStop = t  # not accounting for scr refresh
            train2_btn2.frameNStop = frameN  # exact frame index
            win.timeOnFlip(train2_btn2, 'tStopRefresh')  # time at next scr refresh
            train2_btn2.setAutoDraw(False)
    if train2_btn2.status == STARTED:
        # check whether train2_btn2 has been pressed
        if train2_btn2.isClicked:
            if not train2_btn2.wasClicked:
                train2_btn2.timesOn.append(train2_btn2.buttonClock.getTime()) # store time of first click
                train2_btn2.timesOff.append(train2_btn2.buttonClock.getTime()) # store time clicked until
            else:
                train2_btn2.timesOff[-1] = train2_btn2.buttonClock.getTime() # update time clicked until
            if not train2_btn2.wasClicked:
                if 'train2_btn2' in btn_locks and btn_locks['train2_btn2']:
                                    train2_ex2.setOpacity(0.0)
                                    train2_btn2.setOpacity(0.0)
                                    train2_ex3.setOpacity(1.0)
                                    time.sleep(0.1)
                                    train2_btn3.setOpacity(1.0)
                
                                    btn_locks['train2_btn3'] = LOCK_ON
                                    btn_locks['train2_btn2'] = LOCK_OFF
                                    train2_num.setText('Training example 3')
            train2_btn2.wasClicked = True  # if train2_btn2 is still clicked next frame, it is not a new click
        else:
            train2_btn2.wasClicked = False  # if train2_btn2 is clicked next frame, it is a new click
    else:
        train2_btn2.buttonClock.reset() # keep clock at 0 if button hasn't started / has finished
        train2_btn2.wasClicked = False  # if train2_btn2 is clicked next frame, it is a new click
    
    # *train2_ex2* updates
    if train2_ex2.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        train2_ex2.frameNStart = frameN  # exact frame index
        train2_ex2.tStart = t  # local t and not account for scr refresh
        train2_ex2.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(train2_ex2, 'tStartRefresh')  # time at next scr refresh
        train2_ex2.setAutoDraw(True)
    if train2_ex2.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > train2_ex2.tStartRefresh + 300.0-frameTolerance:
            # keep track of stop time/frame for later
            train2_ex2.tStop = t  # not accounting for scr refresh
            train2_ex2.frameNStop = frameN  # exact frame index
            win.timeOnFlip(train2_ex2, 'tStopRefresh')  # time at next scr refresh
            train2_ex2.setAutoDraw(False)
    
    # *train2_btn1* updates
    if train2_btn1.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
        # keep track of start time/frame for later
        train2_btn1.frameNStart = frameN  # exact frame index
        train2_btn1.tStart = t  # local t and not account for scr refresh
        train2_btn1.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(train2_btn1, 'tStartRefresh')  # time at next scr refresh
        train2_btn1.setAutoDraw(True)
    if train2_btn1.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > train2_btn1.tStartRefresh + 300.0-frameTolerance:
            # keep track of stop time/frame for later
            train2_btn1.tStop = t  # not accounting for scr refresh
            train2_btn1.frameNStop = frameN  # exact frame index
            win.timeOnFlip(train2_btn1, 'tStopRefresh')  # time at next scr refresh
            train2_btn1.setAutoDraw(False)
    if train2_btn1.status == STARTED:
        # check whether train2_btn1 has been pressed
        if train2_btn1.isClicked:
            if not train2_btn1.wasClicked:
                train2_btn1.timesOn.append(train2_btn1.buttonClock.getTime()) # store time of first click
                train2_btn1.timesOff.append(train2_btn1.buttonClock.getTime()) # store time clicked until
            else:
                train2_btn1.timesOff[-1] = train2_btn1.buttonClock.getTime() # update time clicked until
            if not train2_btn1.wasClicked:
                if 'train2_btn1' not in btn_locks:
                                    train2_ex1.setOpacity(0.0)
                                    train2_btn1.setOpacity(0.0)
                                    train2_ex2.setOpacity(1.0)
                                    time.sleep(0.1)
                                    train2_btn2.setOpacity(1.0)
                
                                    btn_locks['train2_btn2'] = LOCK_ON
                                    btn_locks['train2_btn1'] = LOCK_OFF
                                    train2_num.setText('Training example 2')
            train2_btn1.wasClicked = True  # if train2_btn1 is still clicked next frame, it is not a new click
        else:
            train2_btn1.wasClicked = False  # if train2_btn1 is clicked next frame, it is a new click
    else:
        train2_btn1.buttonClock.reset() # keep clock at 0 if button hasn't started / has finished
        train2_btn1.wasClicked = False  # if train2_btn1 is clicked next frame, it is a new click
    
    # *train2_ex1* updates
    if train2_ex1.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        train2_ex1.frameNStart = frameN  # exact frame index
        train2_ex1.tStart = t  # local t and not account for scr refresh
        train2_ex1.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(train2_ex1, 'tStartRefresh')  # time at next scr refresh
        train2_ex1.setAutoDraw(True)
    if train2_ex1.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > train2_ex1.tStartRefresh + 300.0-frameTolerance:
            # keep track of stop time/frame for later
            train2_ex1.tStop = t  # not accounting for scr refresh
            train2_ex1.frameNStop = frameN  # exact frame index
            win.timeOnFlip(train2_ex1, 'tStopRefresh')  # time at next scr refresh
            train2_ex1.setAutoDraw(False)
    
    # *train2_bg1* updates
    if train2_bg1.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        train2_bg1.frameNStart = frameN  # exact frame index
        train2_bg1.tStart = t  # local t and not account for scr refresh
        train2_bg1.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(train2_bg1, 'tStartRefresh')  # time at next scr refresh
        train2_bg1.setAutoDraw(True)
    if train2_bg1.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > train2_bg1.tStartRefresh + 300.0-frameTolerance:
            # keep track of stop time/frame for later
            train2_bg1.tStop = t  # not accounting for scr refresh
            train2_bg1.frameNStop = frameN  # exact frame index
            win.timeOnFlip(train2_bg1, 'tStopRefresh')  # time at next scr refresh
            train2_bg1.setAutoDraw(False)
    
    # *train2_bg2* updates
    if train2_bg2.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        train2_bg2.frameNStart = frameN  # exact frame index
        train2_bg2.tStart = t  # local t and not account for scr refresh
        train2_bg2.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(train2_bg2, 'tStartRefresh')  # time at next scr refresh
        train2_bg2.setAutoDraw(True)
    if train2_bg2.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > train2_bg2.tStartRefresh + 300.0-frameTolerance:
            # keep track of stop time/frame for later
            train2_bg2.tStop = t  # not accounting for scr refresh
            train2_bg2.frameNStop = frameN  # exact frame index
            win.timeOnFlip(train2_bg2, 'tStopRefresh')  # time at next scr refresh
            train2_bg2.setAutoDraw(False)
    
    # check for quit (typically the Esc key)
    if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
        core.quit()
    
    # check if all components have finished
    if not continueRoutine:  # a component has requested a forced-end of Routine
        break
    continueRoutine = False  # will revert to True if at least one component still running
    for thisComponent in Training_2Components:
        if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
            continueRoutine = True
            break  # at least one component has not yet finished
    
    # refresh the screen
    if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
        win.flip()

# -------Ending Routine "Training_2"-------
for thisComponent in Training_2Components:
    if hasattr(thisComponent, "setAutoDraw"):
        thisComponent.setAutoDraw(False)
thisExp.addData('train2_num.started', train2_num.tStartRefresh)
thisExp.addData('train2_num.stopped', train2_num.tStopRefresh)
thisExp.addData('train2_txt1.started', train2_txt1.tStartRefresh)
thisExp.addData('train2_txt1.stopped', train2_txt1.tStopRefresh)
thisExp.addData('train2_btn5.started', train2_btn5.tStartRefresh)
thisExp.addData('train2_btn5.stopped', train2_btn5.tStopRefresh)
thisExp.addData('train2_btn5.numClicks', train2_btn5.numClicks)
if train2_btn5.numClicks:
   thisExp.addData('train2_btn5.timesOn', train2_btn5.timesOn)
   thisExp.addData('train2_btn5.timesOff', train2_btn5.timesOff)
else:
   thisExp.addData('train2_btn5.timesOn', "")
   thisExp.addData('train2_btn5.timesOff', "")
thisExp.addData('train2_ex5.started', train2_ex5.tStartRefresh)
thisExp.addData('train2_ex5.stopped', train2_ex5.tStopRefresh)
thisExp.addData('train2_btn4.started', train2_btn4.tStartRefresh)
thisExp.addData('train2_btn4.stopped', train2_btn4.tStopRefresh)
thisExp.addData('train2_btn4.numClicks', train2_btn4.numClicks)
if train2_btn4.numClicks:
   thisExp.addData('train2_btn4.timesOn', train2_btn4.timesOn)
   thisExp.addData('train2_btn4.timesOff', train2_btn4.timesOff)
else:
   thisExp.addData('train2_btn4.timesOn', "")
   thisExp.addData('train2_btn4.timesOff', "")
thisExp.addData('train2_ex4.started', train2_ex4.tStartRefresh)
thisExp.addData('train2_ex4.stopped', train2_ex4.tStopRefresh)
thisExp.addData('train2_btn3.started', train2_btn3.tStartRefresh)
thisExp.addData('train2_btn3.stopped', train2_btn3.tStopRefresh)
thisExp.addData('train2_btn3.numClicks', train2_btn3.numClicks)
if train2_btn3.numClicks:
   thisExp.addData('train2_btn3.timesOn', train2_btn3.timesOn)
   thisExp.addData('train2_btn3.timesOff', train2_btn3.timesOff)
else:
   thisExp.addData('train2_btn3.timesOn', "")
   thisExp.addData('train2_btn3.timesOff', "")
thisExp.addData('train2_ex3.started', train2_ex3.tStartRefresh)
thisExp.addData('train2_ex3.stopped', train2_ex3.tStopRefresh)
thisExp.addData('train2_btn2.started', train2_btn2.tStartRefresh)
thisExp.addData('train2_btn2.stopped', train2_btn2.tStopRefresh)
thisExp.addData('train2_btn2.numClicks', train2_btn2.numClicks)
if train2_btn2.numClicks:
   thisExp.addData('train2_btn2.timesOn', train2_btn2.timesOn)
   thisExp.addData('train2_btn2.timesOff', train2_btn2.timesOff)
else:
   thisExp.addData('train2_btn2.timesOn', "")
   thisExp.addData('train2_btn2.timesOff', "")
thisExp.addData('train2_ex2.started', train2_ex2.tStartRefresh)
thisExp.addData('train2_ex2.stopped', train2_ex2.tStopRefresh)
thisExp.addData('train2_btn1.started', train2_btn1.tStartRefresh)
thisExp.addData('train2_btn1.stopped', train2_btn1.tStopRefresh)
thisExp.addData('train2_btn1.numClicks', train2_btn1.numClicks)
if train2_btn1.numClicks:
   thisExp.addData('train2_btn1.timesOn', train2_btn1.timesOn)
   thisExp.addData('train2_btn1.timesOff', train2_btn1.timesOff)
else:
   thisExp.addData('train2_btn1.timesOn', "")
   thisExp.addData('train2_btn1.timesOff', "")
thisExp.addData('train2_ex1.started', train2_ex1.tStartRefresh)
thisExp.addData('train2_ex1.stopped', train2_ex1.tStopRefresh)
thisExp.addData('train2_bg1.started', train2_bg1.tStartRefresh)
thisExp.addData('train2_bg1.stopped', train2_bg1.tStopRefresh)
thisExp.addData('train2_bg2.started', train2_bg2.tStartRefresh)
thisExp.addData('train2_bg2.stopped', train2_bg2.tStopRefresh)

# ------Prepare to start Routine "Performance_2"-------
continueRoutine = True
routineTimer.add(300.500000)
# update component parameters for each repeat
# keep track of which components have finished
Performance_2Components = [perf2_num, perf2_txt1, perf2_btn5, perf2_ex5, perf2_btn4, perf2_ex4, perf2_btn3, perf2_ex3, perf2_btn2, perf2_ex2, perf2_btn1, perf2_ex1, perf2_bg1, perf2_bg2]
for thisComponent in Performance_2Components:
    thisComponent.tStart = None
    thisComponent.tStop = None
    thisComponent.tStartRefresh = None
    thisComponent.tStopRefresh = None
    if hasattr(thisComponent, 'status'):
        thisComponent.status = NOT_STARTED
# reset timers
t = 0
_timeToFirstFrame = win.getFutureFlipTime(clock="now")
Performance_2Clock.reset(-_timeToFirstFrame)  # t0 is time of first possible flip
frameN = -1

# -------Run Routine "Performance_2"-------
while continueRoutine and routineTimer.getTime() > 0:
    # get current time
    t = Performance_2Clock.getTime()
    tThisFlip = win.getFutureFlipTime(clock=Performance_2Clock)
    tThisFlipGlobal = win.getFutureFlipTime(clock=None)
    frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
    # update/draw components on each frame
    
    # *perf2_num* updates
    if perf2_num.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        perf2_num.frameNStart = frameN  # exact frame index
        perf2_num.tStart = t  # local t and not account for scr refresh
        perf2_num.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(perf2_num, 'tStartRefresh')  # time at next scr refresh
        perf2_num.setAutoDraw(True)
    if perf2_num.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > perf2_num.tStartRefresh + 300.0-frameTolerance:
            # keep track of stop time/frame for later
            perf2_num.tStop = t  # not accounting for scr refresh
            perf2_num.frameNStop = frameN  # exact frame index
            win.timeOnFlip(perf2_num, 'tStopRefresh')  # time at next scr refresh
            perf2_num.setAutoDraw(False)
    
    # *perf2_txt1* updates
    if perf2_txt1.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        perf2_txt1.frameNStart = frameN  # exact frame index
        perf2_txt1.tStart = t  # local t and not account for scr refresh
        perf2_txt1.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(perf2_txt1, 'tStartRefresh')  # time at next scr refresh
        perf2_txt1.setAutoDraw(True)
    if perf2_txt1.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > perf2_txt1.tStartRefresh + 300.0-frameTolerance:
            # keep track of stop time/frame for later
            perf2_txt1.tStop = t  # not accounting for scr refresh
            perf2_txt1.frameNStop = frameN  # exact frame index
            win.timeOnFlip(perf2_txt1, 'tStopRefresh')  # time at next scr refresh
            perf2_txt1.setAutoDraw(False)
    
    # *perf2_btn5* updates
    if perf2_btn5.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
        # keep track of start time/frame for later
        perf2_btn5.frameNStart = frameN  # exact frame index
        perf2_btn5.tStart = t  # local t and not account for scr refresh
        perf2_btn5.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(perf2_btn5, 'tStartRefresh')  # time at next scr refresh
        perf2_btn5.setAutoDraw(True)
    if perf2_btn5.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > perf2_btn5.tStartRefresh + 300.0-frameTolerance:
            # keep track of stop time/frame for later
            perf2_btn5.tStop = t  # not accounting for scr refresh
            perf2_btn5.frameNStop = frameN  # exact frame index
            win.timeOnFlip(perf2_btn5, 'tStopRefresh')  # time at next scr refresh
            perf2_btn5.setAutoDraw(False)
    if perf2_btn5.status == STARTED:
        # check whether perf2_btn5 has been pressed
        if perf2_btn5.isClicked:
            if not perf2_btn5.wasClicked:
                perf2_btn5.timesOn.append(perf2_btn5.buttonClock.getTime()) # store time of first click
                perf2_btn5.timesOff.append(perf2_btn5.buttonClock.getTime()) # store time clicked until
            else:
                perf2_btn5.timesOff[-1] = perf2_btn5.buttonClock.getTime() # update time clicked until
            if not perf2_btn5.wasClicked:
                continueRoutine = False  # end routine when perf2_btn5 is clicked
                continueRoutine = True
                if 'perf2_btn5' in btn_locks and btn_locks['perf2_btn5']:
                                    btn_locks['perf2_btn5'] = LOCK_OFF
                                    time.sleep(0.1)
                                    continueRoutine = False
            perf2_btn5.wasClicked = True  # if perf2_btn5 is still clicked next frame, it is not a new click
        else:
            perf2_btn5.wasClicked = False  # if perf2_btn5 is clicked next frame, it is a new click
    else:
        perf2_btn5.buttonClock.reset() # keep clock at 0 if button hasn't started / has finished
        perf2_btn5.wasClicked = False  # if perf2_btn5 is clicked next frame, it is a new click
    
    # *perf2_ex5* updates
    if perf2_ex5.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        perf2_ex5.frameNStart = frameN  # exact frame index
        perf2_ex5.tStart = t  # local t and not account for scr refresh
        perf2_ex5.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(perf2_ex5, 'tStartRefresh')  # time at next scr refresh
        perf2_ex5.setAutoDraw(True)
    if perf2_ex5.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > perf2_ex5.tStartRefresh + 300.0-frameTolerance:
            # keep track of stop time/frame for later
            perf2_ex5.tStop = t  # not accounting for scr refresh
            perf2_ex5.frameNStop = frameN  # exact frame index
            win.timeOnFlip(perf2_ex5, 'tStopRefresh')  # time at next scr refresh
            perf2_ex5.setAutoDraw(False)
    
    # *perf2_btn4* updates
    if perf2_btn4.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
        # keep track of start time/frame for later
        perf2_btn4.frameNStart = frameN  # exact frame index
        perf2_btn4.tStart = t  # local t and not account for scr refresh
        perf2_btn4.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(perf2_btn4, 'tStartRefresh')  # time at next scr refresh
        perf2_btn4.setAutoDraw(True)
    if perf2_btn4.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > perf2_btn4.tStartRefresh + 300.0-frameTolerance:
            # keep track of stop time/frame for later
            perf2_btn4.tStop = t  # not accounting for scr refresh
            perf2_btn4.frameNStop = frameN  # exact frame index
            win.timeOnFlip(perf2_btn4, 'tStopRefresh')  # time at next scr refresh
            perf2_btn4.setAutoDraw(False)
    if perf2_btn4.status == STARTED:
        # check whether perf2_btn4 has been pressed
        if perf2_btn4.isClicked:
            if not perf2_btn4.wasClicked:
                perf2_btn4.timesOn.append(perf2_btn4.buttonClock.getTime()) # store time of first click
                perf2_btn4.timesOff.append(perf2_btn4.buttonClock.getTime()) # store time clicked until
            else:
                perf2_btn4.timesOff[-1] = perf2_btn4.buttonClock.getTime() # update time clicked until
            if not perf2_btn4.wasClicked:
                if 'perf2_btn4' in btn_locks and btn_locks['perf2_btn4']:
                                    perf2_ex4.setOpacity(0.0)
                                    perf2_btn4.setOpacity(0.0)
                                    perf2_ex5.setOpacity(1.0)
                                    time.sleep(0.1)
                                    perf2_btn5.setOpacity(1.0)
                
                                    btn_locks['perf2_btn5'] = LOCK_ON
                                    btn_locks['perf2_btn4'] = LOCK_OFF
                                    perf2_num.setText('Test example 5 (this could be removed)')
            perf2_btn4.wasClicked = True  # if perf2_btn4 is still clicked next frame, it is not a new click
        else:
            perf2_btn4.wasClicked = False  # if perf2_btn4 is clicked next frame, it is a new click
    else:
        perf2_btn4.buttonClock.reset() # keep clock at 0 if button hasn't started / has finished
        perf2_btn4.wasClicked = False  # if perf2_btn4 is clicked next frame, it is a new click
    
    # *perf2_ex4* updates
    if perf2_ex4.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        perf2_ex4.frameNStart = frameN  # exact frame index
        perf2_ex4.tStart = t  # local t and not account for scr refresh
        perf2_ex4.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(perf2_ex4, 'tStartRefresh')  # time at next scr refresh
        perf2_ex4.setAutoDraw(True)
    if perf2_ex4.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > perf2_ex4.tStartRefresh + 300.0-frameTolerance:
            # keep track of stop time/frame for later
            perf2_ex4.tStop = t  # not accounting for scr refresh
            perf2_ex4.frameNStop = frameN  # exact frame index
            win.timeOnFlip(perf2_ex4, 'tStopRefresh')  # time at next scr refresh
            perf2_ex4.setAutoDraw(False)
    
    # *perf2_btn3* updates
    if perf2_btn3.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
        # keep track of start time/frame for later
        perf2_btn3.frameNStart = frameN  # exact frame index
        perf2_btn3.tStart = t  # local t and not account for scr refresh
        perf2_btn3.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(perf2_btn3, 'tStartRefresh')  # time at next scr refresh
        perf2_btn3.setAutoDraw(True)
    if perf2_btn3.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > perf2_btn3.tStartRefresh + 300.0-frameTolerance:
            # keep track of stop time/frame for later
            perf2_btn3.tStop = t  # not accounting for scr refresh
            perf2_btn3.frameNStop = frameN  # exact frame index
            win.timeOnFlip(perf2_btn3, 'tStopRefresh')  # time at next scr refresh
            perf2_btn3.setAutoDraw(False)
    if perf2_btn3.status == STARTED:
        # check whether perf2_btn3 has been pressed
        if perf2_btn3.isClicked:
            if not perf2_btn3.wasClicked:
                perf2_btn3.timesOn.append(perf2_btn3.buttonClock.getTime()) # store time of first click
                perf2_btn3.timesOff.append(perf2_btn3.buttonClock.getTime()) # store time clicked until
            else:
                perf2_btn3.timesOff[-1] = perf2_btn3.buttonClock.getTime() # update time clicked until
            if not perf2_btn3.wasClicked:
                if 'perf2_btn3' in btn_locks and btn_locks['perf2_btn3']:
                                    perf2_ex3.setOpacity(0.0)
                                    perf2_btn3.setOpacity(0.0)
                                    perf2_ex4.setOpacity(1.0)
                                    time.sleep(0.1)
                                    perf2_btn4.setOpacity(1.0)
                
                                    btn_locks['perf2_btn4'] = LOCK_ON
                                    btn_locks['perf2_btn3'] = LOCK_OFF
                                    perf2_num.setText('Test example 4 (this could be removed)')
            perf2_btn3.wasClicked = True  # if perf2_btn3 is still clicked next frame, it is not a new click
        else:
            perf2_btn3.wasClicked = False  # if perf2_btn3 is clicked next frame, it is a new click
    else:
        perf2_btn3.buttonClock.reset() # keep clock at 0 if button hasn't started / has finished
        perf2_btn3.wasClicked = False  # if perf2_btn3 is clicked next frame, it is a new click
    
    # *perf2_ex3* updates
    if perf2_ex3.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        perf2_ex3.frameNStart = frameN  # exact frame index
        perf2_ex3.tStart = t  # local t and not account for scr refresh
        perf2_ex3.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(perf2_ex3, 'tStartRefresh')  # time at next scr refresh
        perf2_ex3.setAutoDraw(True)
    if perf2_ex3.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > perf2_ex3.tStartRefresh + 300.0-frameTolerance:
            # keep track of stop time/frame for later
            perf2_ex3.tStop = t  # not accounting for scr refresh
            perf2_ex3.frameNStop = frameN  # exact frame index
            win.timeOnFlip(perf2_ex3, 'tStopRefresh')  # time at next scr refresh
            perf2_ex3.setAutoDraw(False)
    
    # *perf2_btn2* updates
    if perf2_btn2.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
        # keep track of start time/frame for later
        perf2_btn2.frameNStart = frameN  # exact frame index
        perf2_btn2.tStart = t  # local t and not account for scr refresh
        perf2_btn2.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(perf2_btn2, 'tStartRefresh')  # time at next scr refresh
        perf2_btn2.setAutoDraw(True)
    if perf2_btn2.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > perf2_btn2.tStartRefresh + 300.0-frameTolerance:
            # keep track of stop time/frame for later
            perf2_btn2.tStop = t  # not accounting for scr refresh
            perf2_btn2.frameNStop = frameN  # exact frame index
            win.timeOnFlip(perf2_btn2, 'tStopRefresh')  # time at next scr refresh
            perf2_btn2.setAutoDraw(False)
    if perf2_btn2.status == STARTED:
        # check whether perf2_btn2 has been pressed
        if perf2_btn2.isClicked:
            if not perf2_btn2.wasClicked:
                perf2_btn2.timesOn.append(perf2_btn2.buttonClock.getTime()) # store time of first click
                perf2_btn2.timesOff.append(perf2_btn2.buttonClock.getTime()) # store time clicked until
            else:
                perf2_btn2.timesOff[-1] = perf2_btn2.buttonClock.getTime() # update time clicked until
            if not perf2_btn2.wasClicked:
                if 'perf2_btn2' in btn_locks and btn_locks['perf2_btn2']:
                                    perf2_ex2.setOpacity(0.0)
                                    perf2_btn2.setOpacity(0.0)
                                    perf2_ex3.setOpacity(1.0)
                                    time.sleep(0.1)
                                    perf2_btn3.setOpacity(1.0)
                
                                    btn_locks['perf2_btn3'] = LOCK_ON
                                    btn_locks['perf2_btn2'] = LOCK_OFF
                                    perf2_num.setText('Test example 3 (this could be removed)')
            perf2_btn2.wasClicked = True  # if perf2_btn2 is still clicked next frame, it is not a new click
        else:
            perf2_btn2.wasClicked = False  # if perf2_btn2 is clicked next frame, it is a new click
    else:
        perf2_btn2.buttonClock.reset() # keep clock at 0 if button hasn't started / has finished
        perf2_btn2.wasClicked = False  # if perf2_btn2 is clicked next frame, it is a new click
    
    # *perf2_ex2* updates
    if perf2_ex2.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        perf2_ex2.frameNStart = frameN  # exact frame index
        perf2_ex2.tStart = t  # local t and not account for scr refresh
        perf2_ex2.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(perf2_ex2, 'tStartRefresh')  # time at next scr refresh
        perf2_ex2.setAutoDraw(True)
    if perf2_ex2.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > perf2_ex2.tStartRefresh + 300.0-frameTolerance:
            # keep track of stop time/frame for later
            perf2_ex2.tStop = t  # not accounting for scr refresh
            perf2_ex2.frameNStop = frameN  # exact frame index
            win.timeOnFlip(perf2_ex2, 'tStopRefresh')  # time at next scr refresh
            perf2_ex2.setAutoDraw(False)
    
    # *perf2_btn1* updates
    if perf2_btn1.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
        # keep track of start time/frame for later
        perf2_btn1.frameNStart = frameN  # exact frame index
        perf2_btn1.tStart = t  # local t and not account for scr refresh
        perf2_btn1.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(perf2_btn1, 'tStartRefresh')  # time at next scr refresh
        perf2_btn1.setAutoDraw(True)
    if perf2_btn1.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > perf2_btn1.tStartRefresh + 300.0-frameTolerance:
            # keep track of stop time/frame for later
            perf2_btn1.tStop = t  # not accounting for scr refresh
            perf2_btn1.frameNStop = frameN  # exact frame index
            win.timeOnFlip(perf2_btn1, 'tStopRefresh')  # time at next scr refresh
            perf2_btn1.setAutoDraw(False)
    if perf2_btn1.status == STARTED:
        # check whether perf2_btn1 has been pressed
        if perf2_btn1.isClicked:
            if not perf2_btn1.wasClicked:
                perf2_btn1.timesOn.append(perf2_btn1.buttonClock.getTime()) # store time of first click
                perf2_btn1.timesOff.append(perf2_btn1.buttonClock.getTime()) # store time clicked until
            else:
                perf2_btn1.timesOff[-1] = perf2_btn1.buttonClock.getTime() # update time clicked until
            if not perf2_btn1.wasClicked:
                if 'perf2_btn1' not in btn_locks:
                                    perf2_ex1.setOpacity(0.0)
                                    perf2_btn1.setOpacity(0.0)
                                    perf2_ex2.setOpacity(1.0)
                                    time.sleep(0.1)
                                    perf2_btn2.setOpacity(1.0)
                
                                    btn_locks['perf2_btn2'] = LOCK_ON
                                    btn_locks['perf2_btn1'] = LOCK_OFF
                                    perf2_num.setText('Test example 2 (this could be removed)')
            perf2_btn1.wasClicked = True  # if perf2_btn1 is still clicked next frame, it is not a new click
        else:
            perf2_btn1.wasClicked = False  # if perf2_btn1 is clicked next frame, it is a new click
    else:
        perf2_btn1.buttonClock.reset() # keep clock at 0 if button hasn't started / has finished
        perf2_btn1.wasClicked = False  # if perf2_btn1 is clicked next frame, it is a new click
    
    # *perf2_ex1* updates
    if perf2_ex1.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        perf2_ex1.frameNStart = frameN  # exact frame index
        perf2_ex1.tStart = t  # local t and not account for scr refresh
        perf2_ex1.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(perf2_ex1, 'tStartRefresh')  # time at next scr refresh
        perf2_ex1.setAutoDraw(True)
    if perf2_ex1.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > perf2_ex1.tStartRefresh + 300.0-frameTolerance:
            # keep track of stop time/frame for later
            perf2_ex1.tStop = t  # not accounting for scr refresh
            perf2_ex1.frameNStop = frameN  # exact frame index
            win.timeOnFlip(perf2_ex1, 'tStopRefresh')  # time at next scr refresh
            perf2_ex1.setAutoDraw(False)
    
    # *perf2_bg1* updates
    if perf2_bg1.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        perf2_bg1.frameNStart = frameN  # exact frame index
        perf2_bg1.tStart = t  # local t and not account for scr refresh
        perf2_bg1.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(perf2_bg1, 'tStartRefresh')  # time at next scr refresh
        perf2_bg1.setAutoDraw(True)
    if perf2_bg1.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > perf2_bg1.tStartRefresh + 300.0-frameTolerance:
            # keep track of stop time/frame for later
            perf2_bg1.tStop = t  # not accounting for scr refresh
            perf2_bg1.frameNStop = frameN  # exact frame index
            win.timeOnFlip(perf2_bg1, 'tStopRefresh')  # time at next scr refresh
            perf2_bg1.setAutoDraw(False)
    
    # *perf2_bg2* updates
    if perf2_bg2.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        perf2_bg2.frameNStart = frameN  # exact frame index
        perf2_bg2.tStart = t  # local t and not account for scr refresh
        perf2_bg2.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(perf2_bg2, 'tStartRefresh')  # time at next scr refresh
        perf2_bg2.setAutoDraw(True)
    if perf2_bg2.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > perf2_bg2.tStartRefresh + 300.0-frameTolerance:
            # keep track of stop time/frame for later
            perf2_bg2.tStop = t  # not accounting for scr refresh
            perf2_bg2.frameNStop = frameN  # exact frame index
            win.timeOnFlip(perf2_bg2, 'tStopRefresh')  # time at next scr refresh
            perf2_bg2.setAutoDraw(False)
    
    # check for quit (typically the Esc key)
    if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
        core.quit()
    
    # check if all components have finished
    if not continueRoutine:  # a component has requested a forced-end of Routine
        break
    continueRoutine = False  # will revert to True if at least one component still running
    for thisComponent in Performance_2Components:
        if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
            continueRoutine = True
            break  # at least one component has not yet finished
    
    # refresh the screen
    if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
        win.flip()

# -------Ending Routine "Performance_2"-------
for thisComponent in Performance_2Components:
    if hasattr(thisComponent, "setAutoDraw"):
        thisComponent.setAutoDraw(False)
thisExp.addData('perf2_num.started', perf2_num.tStartRefresh)
thisExp.addData('perf2_num.stopped', perf2_num.tStopRefresh)
thisExp.addData('perf2_txt1.started', perf2_txt1.tStartRefresh)
thisExp.addData('perf2_txt1.stopped', perf2_txt1.tStopRefresh)
thisExp.addData('perf2_btn5.started', perf2_btn5.tStartRefresh)
thisExp.addData('perf2_btn5.stopped', perf2_btn5.tStopRefresh)
thisExp.addData('perf2_btn5.numClicks', perf2_btn5.numClicks)
if perf2_btn5.numClicks:
   thisExp.addData('perf2_btn5.timesOn', perf2_btn5.timesOn)
   thisExp.addData('perf2_btn5.timesOff', perf2_btn5.timesOff)
else:
   thisExp.addData('perf2_btn5.timesOn', "")
   thisExp.addData('perf2_btn5.timesOff', "")
thisExp.addData('perf2_ex5.started', perf2_ex5.tStartRefresh)
thisExp.addData('perf2_ex5.stopped', perf2_ex5.tStopRefresh)
thisExp.addData('perf2_btn4.started', perf2_btn4.tStartRefresh)
thisExp.addData('perf2_btn4.stopped', perf2_btn4.tStopRefresh)
thisExp.addData('perf2_btn4.numClicks', perf2_btn4.numClicks)
if perf2_btn4.numClicks:
   thisExp.addData('perf2_btn4.timesOn', perf2_btn4.timesOn)
   thisExp.addData('perf2_btn4.timesOff', perf2_btn4.timesOff)
else:
   thisExp.addData('perf2_btn4.timesOn', "")
   thisExp.addData('perf2_btn4.timesOff', "")
thisExp.addData('perf2_ex4.started', perf2_ex4.tStartRefresh)
thisExp.addData('perf2_ex4.stopped', perf2_ex4.tStopRefresh)
thisExp.addData('perf2_btn3.started', perf2_btn3.tStartRefresh)
thisExp.addData('perf2_btn3.stopped', perf2_btn3.tStopRefresh)
thisExp.addData('perf2_btn3.numClicks', perf2_btn3.numClicks)
if perf2_btn3.numClicks:
   thisExp.addData('perf2_btn3.timesOn', perf2_btn3.timesOn)
   thisExp.addData('perf2_btn3.timesOff', perf2_btn3.timesOff)
else:
   thisExp.addData('perf2_btn3.timesOn', "")
   thisExp.addData('perf2_btn3.timesOff', "")
thisExp.addData('perf2_ex3.started', perf2_ex3.tStartRefresh)
thisExp.addData('perf2_ex3.stopped', perf2_ex3.tStopRefresh)
thisExp.addData('perf2_btn2.started', perf2_btn2.tStartRefresh)
thisExp.addData('perf2_btn2.stopped', perf2_btn2.tStopRefresh)
thisExp.addData('perf2_btn2.numClicks', perf2_btn2.numClicks)
if perf2_btn2.numClicks:
   thisExp.addData('perf2_btn2.timesOn', perf2_btn2.timesOn)
   thisExp.addData('perf2_btn2.timesOff', perf2_btn2.timesOff)
else:
   thisExp.addData('perf2_btn2.timesOn', "")
   thisExp.addData('perf2_btn2.timesOff', "")
thisExp.addData('perf2_ex2.started', perf2_ex2.tStartRefresh)
thisExp.addData('perf2_ex2.stopped', perf2_ex2.tStopRefresh)
thisExp.addData('perf2_btn1.started', perf2_btn1.tStartRefresh)
thisExp.addData('perf2_btn1.stopped', perf2_btn1.tStopRefresh)
thisExp.addData('perf2_btn1.numClicks', perf2_btn1.numClicks)
if perf2_btn1.numClicks:
   thisExp.addData('perf2_btn1.timesOn', perf2_btn1.timesOn)
   thisExp.addData('perf2_btn1.timesOff', perf2_btn1.timesOff)
else:
   thisExp.addData('perf2_btn1.timesOn', "")
   thisExp.addData('perf2_btn1.timesOff', "")
thisExp.addData('perf2_ex1.started', perf2_ex1.tStartRefresh)
thisExp.addData('perf2_ex1.stopped', perf2_ex1.tStopRefresh)
thisExp.addData('perf2_bg1.started', perf2_bg1.tStartRefresh)
thisExp.addData('perf2_bg1.stopped', perf2_bg1.tStopRefresh)
thisExp.addData('perf2_bg2.started', perf2_bg2.tStartRefresh)
thisExp.addData('perf2_bg2.stopped', perf2_bg2.tStopRefresh)

# ------Prepare to start Routine "Performance_3"-------
continueRoutine = True
routineTimer.add(300.500000)
# update component parameters for each repeat
# keep track of which components have finished
Performance_3Components = [perf3_num, perf3_txt1, perf3_btn5, perf3_ex5, perf3_btn4, perf3_ex4, perf3_btn3, perf3_ex3, perf3_btn2, perf3_ex2, perf3_btn1, perf3_ex1, perf3_bg1, perf3_bg2]
for thisComponent in Performance_3Components:
    thisComponent.tStart = None
    thisComponent.tStop = None
    thisComponent.tStartRefresh = None
    thisComponent.tStopRefresh = None
    if hasattr(thisComponent, 'status'):
        thisComponent.status = NOT_STARTED
# reset timers
t = 0
_timeToFirstFrame = win.getFutureFlipTime(clock="now")
Performance_3Clock.reset(-_timeToFirstFrame)  # t0 is time of first possible flip
frameN = -1

# -------Run Routine "Performance_3"-------
while continueRoutine and routineTimer.getTime() > 0:
    # get current time
    t = Performance_3Clock.getTime()
    tThisFlip = win.getFutureFlipTime(clock=Performance_3Clock)
    tThisFlipGlobal = win.getFutureFlipTime(clock=None)
    frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
    # update/draw components on each frame
    
    # *perf3_num* updates
    if perf3_num.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        perf3_num.frameNStart = frameN  # exact frame index
        perf3_num.tStart = t  # local t and not account for scr refresh
        perf3_num.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(perf3_num, 'tStartRefresh')  # time at next scr refresh
        perf3_num.setAutoDraw(True)
    if perf3_num.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > perf3_num.tStartRefresh + 300.0-frameTolerance:
            # keep track of stop time/frame for later
            perf3_num.tStop = t  # not accounting for scr refresh
            perf3_num.frameNStop = frameN  # exact frame index
            win.timeOnFlip(perf3_num, 'tStopRefresh')  # time at next scr refresh
            perf3_num.setAutoDraw(False)
    
    # *perf3_txt1* updates
    if perf3_txt1.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        perf3_txt1.frameNStart = frameN  # exact frame index
        perf3_txt1.tStart = t  # local t and not account for scr refresh
        perf3_txt1.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(perf3_txt1, 'tStartRefresh')  # time at next scr refresh
        perf3_txt1.setAutoDraw(True)
    if perf3_txt1.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > perf3_txt1.tStartRefresh + 300.0-frameTolerance:
            # keep track of stop time/frame for later
            perf3_txt1.tStop = t  # not accounting for scr refresh
            perf3_txt1.frameNStop = frameN  # exact frame index
            win.timeOnFlip(perf3_txt1, 'tStopRefresh')  # time at next scr refresh
            perf3_txt1.setAutoDraw(False)
    
    # *perf3_btn5* updates
    if perf3_btn5.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
        # keep track of start time/frame for later
        perf3_btn5.frameNStart = frameN  # exact frame index
        perf3_btn5.tStart = t  # local t and not account for scr refresh
        perf3_btn5.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(perf3_btn5, 'tStartRefresh')  # time at next scr refresh
        perf3_btn5.setAutoDraw(True)
    if perf3_btn5.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > perf3_btn5.tStartRefresh + 300.0-frameTolerance:
            # keep track of stop time/frame for later
            perf3_btn5.tStop = t  # not accounting for scr refresh
            perf3_btn5.frameNStop = frameN  # exact frame index
            win.timeOnFlip(perf3_btn5, 'tStopRefresh')  # time at next scr refresh
            perf3_btn5.setAutoDraw(False)
    if perf3_btn5.status == STARTED:
        # check whether perf3_btn5 has been pressed
        if perf3_btn5.isClicked:
            if not perf3_btn5.wasClicked:
                perf3_btn5.timesOn.append(perf3_btn5.buttonClock.getTime()) # store time of first click
                perf3_btn5.timesOff.append(perf3_btn5.buttonClock.getTime()) # store time clicked until
            else:
                perf3_btn5.timesOff[-1] = perf3_btn5.buttonClock.getTime() # update time clicked until
            if not perf3_btn5.wasClicked:
                continueRoutine = False  # end routine when perf3_btn5 is clicked
                continueRoutine = True
                if 'perf3_btn5' in btn_locks and btn_locks['perf3_btn5']:
                                    btn_locks['perf3_btn5'] = LOCK_OFF
                                    time.sleep(0.1)
                                    continueRoutine = False
            perf3_btn5.wasClicked = True  # if perf3_btn5 is still clicked next frame, it is not a new click
        else:
            perf3_btn5.wasClicked = False  # if perf3_btn5 is clicked next frame, it is a new click
    else:
        perf3_btn5.buttonClock.reset() # keep clock at 0 if button hasn't started / has finished
        perf3_btn5.wasClicked = False  # if perf3_btn5 is clicked next frame, it is a new click
    
    # *perf3_ex5* updates
    if perf3_ex5.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        perf3_ex5.frameNStart = frameN  # exact frame index
        perf3_ex5.tStart = t  # local t and not account for scr refresh
        perf3_ex5.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(perf3_ex5, 'tStartRefresh')  # time at next scr refresh
        perf3_ex5.setAutoDraw(True)
    if perf3_ex5.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > perf3_ex5.tStartRefresh + 300.0-frameTolerance:
            # keep track of stop time/frame for later
            perf3_ex5.tStop = t  # not accounting for scr refresh
            perf3_ex5.frameNStop = frameN  # exact frame index
            win.timeOnFlip(perf3_ex5, 'tStopRefresh')  # time at next scr refresh
            perf3_ex5.setAutoDraw(False)
    
    # *perf3_btn4* updates
    if perf3_btn4.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
        # keep track of start time/frame for later
        perf3_btn4.frameNStart = frameN  # exact frame index
        perf3_btn4.tStart = t  # local t and not account for scr refresh
        perf3_btn4.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(perf3_btn4, 'tStartRefresh')  # time at next scr refresh
        perf3_btn4.setAutoDraw(True)
    if perf3_btn4.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > perf3_btn4.tStartRefresh + 300.0-frameTolerance:
            # keep track of stop time/frame for later
            perf3_btn4.tStop = t  # not accounting for scr refresh
            perf3_btn4.frameNStop = frameN  # exact frame index
            win.timeOnFlip(perf3_btn4, 'tStopRefresh')  # time at next scr refresh
            perf3_btn4.setAutoDraw(False)
    if perf3_btn4.status == STARTED:
        # check whether perf3_btn4 has been pressed
        if perf3_btn4.isClicked:
            if not perf3_btn4.wasClicked:
                perf3_btn4.timesOn.append(perf3_btn4.buttonClock.getTime()) # store time of first click
                perf3_btn4.timesOff.append(perf3_btn4.buttonClock.getTime()) # store time clicked until
            else:
                perf3_btn4.timesOff[-1] = perf3_btn4.buttonClock.getTime() # update time clicked until
            if not perf3_btn4.wasClicked:
                if 'perf3_btn4' in btn_locks and btn_locks['perf3_btn4']:
                                    perf3_ex4.setOpacity(0.0)
                                    perf3_btn4.setOpacity(0.0)
                                    perf3_ex5.setOpacity(1.0)
                                    time.sleep(0.1)
                                    perf3_btn5.setOpacity(1.0)
                
                                    btn_locks['perf3_btn5'] = LOCK_ON
                                    btn_locks['perf3_btn4'] = LOCK_OFF
                                    perf3_num.setText('Test example 5 (this could be removed)')
            perf3_btn4.wasClicked = True  # if perf3_btn4 is still clicked next frame, it is not a new click
        else:
            perf3_btn4.wasClicked = False  # if perf3_btn4 is clicked next frame, it is a new click
    else:
        perf3_btn4.buttonClock.reset() # keep clock at 0 if button hasn't started / has finished
        perf3_btn4.wasClicked = False  # if perf3_btn4 is clicked next frame, it is a new click
    
    # *perf3_ex4* updates
    if perf3_ex4.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        perf3_ex4.frameNStart = frameN  # exact frame index
        perf3_ex4.tStart = t  # local t and not account for scr refresh
        perf3_ex4.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(perf3_ex4, 'tStartRefresh')  # time at next scr refresh
        perf3_ex4.setAutoDraw(True)
    if perf3_ex4.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > perf3_ex4.tStartRefresh + 300.0-frameTolerance:
            # keep track of stop time/frame for later
            perf3_ex4.tStop = t  # not accounting for scr refresh
            perf3_ex4.frameNStop = frameN  # exact frame index
            win.timeOnFlip(perf3_ex4, 'tStopRefresh')  # time at next scr refresh
            perf3_ex4.setAutoDraw(False)
    
    # *perf3_btn3* updates
    if perf3_btn3.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
        # keep track of start time/frame for later
        perf3_btn3.frameNStart = frameN  # exact frame index
        perf3_btn3.tStart = t  # local t and not account for scr refresh
        perf3_btn3.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(perf3_btn3, 'tStartRefresh')  # time at next scr refresh
        perf3_btn3.setAutoDraw(True)
    if perf3_btn3.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > perf3_btn3.tStartRefresh + 300.0-frameTolerance:
            # keep track of stop time/frame for later
            perf3_btn3.tStop = t  # not accounting for scr refresh
            perf3_btn3.frameNStop = frameN  # exact frame index
            win.timeOnFlip(perf3_btn3, 'tStopRefresh')  # time at next scr refresh
            perf3_btn3.setAutoDraw(False)
    if perf3_btn3.status == STARTED:
        # check whether perf3_btn3 has been pressed
        if perf3_btn3.isClicked:
            if not perf3_btn3.wasClicked:
                perf3_btn3.timesOn.append(perf3_btn3.buttonClock.getTime()) # store time of first click
                perf3_btn3.timesOff.append(perf3_btn3.buttonClock.getTime()) # store time clicked until
            else:
                perf3_btn3.timesOff[-1] = perf3_btn3.buttonClock.getTime() # update time clicked until
            if not perf3_btn3.wasClicked:
                if 'perf3_btn3' in btn_locks and btn_locks['perf3_btn3']:
                                    perf3_ex3.setOpacity(0.0)
                                    perf3_btn3.setOpacity(0.0)
                                    perf3_ex4.setOpacity(1.0)
                                    time.sleep(0.1)
                                    perf3_btn4.setOpacity(1.0)
                
                                    btn_locks['perf3_btn4'] = LOCK_ON
                                    btn_locks['perf3_btn3'] = LOCK_OFF
                                    perf3_num.setText('Test example 4 (this could be removed)')
            perf3_btn3.wasClicked = True  # if perf3_btn3 is still clicked next frame, it is not a new click
        else:
            perf3_btn3.wasClicked = False  # if perf3_btn3 is clicked next frame, it is a new click
    else:
        perf3_btn3.buttonClock.reset() # keep clock at 0 if button hasn't started / has finished
        perf3_btn3.wasClicked = False  # if perf3_btn3 is clicked next frame, it is a new click
    
    # *perf3_ex3* updates
    if perf3_ex3.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        perf3_ex3.frameNStart = frameN  # exact frame index
        perf3_ex3.tStart = t  # local t and not account for scr refresh
        perf3_ex3.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(perf3_ex3, 'tStartRefresh')  # time at next scr refresh
        perf3_ex3.setAutoDraw(True)
    if perf3_ex3.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > perf3_ex3.tStartRefresh + 300.0-frameTolerance:
            # keep track of stop time/frame for later
            perf3_ex3.tStop = t  # not accounting for scr refresh
            perf3_ex3.frameNStop = frameN  # exact frame index
            win.timeOnFlip(perf3_ex3, 'tStopRefresh')  # time at next scr refresh
            perf3_ex3.setAutoDraw(False)
    
    # *perf3_btn2* updates
    if perf3_btn2.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
        # keep track of start time/frame for later
        perf3_btn2.frameNStart = frameN  # exact frame index
        perf3_btn2.tStart = t  # local t and not account for scr refresh
        perf3_btn2.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(perf3_btn2, 'tStartRefresh')  # time at next scr refresh
        perf3_btn2.setAutoDraw(True)
    if perf3_btn2.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > perf3_btn2.tStartRefresh + 300.0-frameTolerance:
            # keep track of stop time/frame for later
            perf3_btn2.tStop = t  # not accounting for scr refresh
            perf3_btn2.frameNStop = frameN  # exact frame index
            win.timeOnFlip(perf3_btn2, 'tStopRefresh')  # time at next scr refresh
            perf3_btn2.setAutoDraw(False)
    if perf3_btn2.status == STARTED:
        # check whether perf3_btn2 has been pressed
        if perf3_btn2.isClicked:
            if not perf3_btn2.wasClicked:
                perf3_btn2.timesOn.append(perf3_btn2.buttonClock.getTime()) # store time of first click
                perf3_btn2.timesOff.append(perf3_btn2.buttonClock.getTime()) # store time clicked until
            else:
                perf3_btn2.timesOff[-1] = perf3_btn2.buttonClock.getTime() # update time clicked until
            if not perf3_btn2.wasClicked:
                if 'perf3_btn2' in btn_locks and btn_locks['perf3_btn2']:
                                    perf3_ex2.setOpacity(0.0)
                                    perf3_btn2.setOpacity(0.0)
                                    perf3_ex3.setOpacity(1.0)
                                    time.sleep(0.1)
                                    perf3_btn3.setOpacity(1.0)
                
                                    btn_locks['perf3_btn3'] = LOCK_ON
                                    btn_locks['perf3_btn2'] = LOCK_OFF
                                    perf3_num.setText('Test example 3 (this could be removed)')
            perf3_btn2.wasClicked = True  # if perf3_btn2 is still clicked next frame, it is not a new click
        else:
            perf3_btn2.wasClicked = False  # if perf3_btn2 is clicked next frame, it is a new click
    else:
        perf3_btn2.buttonClock.reset() # keep clock at 0 if button hasn't started / has finished
        perf3_btn2.wasClicked = False  # if perf3_btn2 is clicked next frame, it is a new click
    
    # *perf3_ex2* updates
    if perf3_ex2.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        perf3_ex2.frameNStart = frameN  # exact frame index
        perf3_ex2.tStart = t  # local t and not account for scr refresh
        perf3_ex2.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(perf3_ex2, 'tStartRefresh')  # time at next scr refresh
        perf3_ex2.setAutoDraw(True)
    if perf3_ex2.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > perf3_ex2.tStartRefresh + 300.0-frameTolerance:
            # keep track of stop time/frame for later
            perf3_ex2.tStop = t  # not accounting for scr refresh
            perf3_ex2.frameNStop = frameN  # exact frame index
            win.timeOnFlip(perf3_ex2, 'tStopRefresh')  # time at next scr refresh
            perf3_ex2.setAutoDraw(False)
    
    # *perf3_btn1* updates
    if perf3_btn1.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
        # keep track of start time/frame for later
        perf3_btn1.frameNStart = frameN  # exact frame index
        perf3_btn1.tStart = t  # local t and not account for scr refresh
        perf3_btn1.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(perf3_btn1, 'tStartRefresh')  # time at next scr refresh
        perf3_btn1.setAutoDraw(True)
    if perf3_btn1.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > perf3_btn1.tStartRefresh + 300.0-frameTolerance:
            # keep track of stop time/frame for later
            perf3_btn1.tStop = t  # not accounting for scr refresh
            perf3_btn1.frameNStop = frameN  # exact frame index
            win.timeOnFlip(perf3_btn1, 'tStopRefresh')  # time at next scr refresh
            perf3_btn1.setAutoDraw(False)
    if perf3_btn1.status == STARTED:
        # check whether perf3_btn1 has been pressed
        if perf3_btn1.isClicked:
            if not perf3_btn1.wasClicked:
                perf3_btn1.timesOn.append(perf3_btn1.buttonClock.getTime()) # store time of first click
                perf3_btn1.timesOff.append(perf3_btn1.buttonClock.getTime()) # store time clicked until
            else:
                perf3_btn1.timesOff[-1] = perf3_btn1.buttonClock.getTime() # update time clicked until
            if not perf3_btn1.wasClicked:
                if 'perf3_btn1' not in btn_locks:
                                    perf3_ex1.setOpacity(0.0)
                                    perf3_btn1.setOpacity(0.0)
                                    perf3_ex2.setOpacity(1.0)
                                    time.sleep(0.1)
                                    perf3_btn2.setOpacity(1.0)
                
                                    btn_locks['perf3_btn2'] = LOCK_ON
                                    btn_locks['perf3_btn1'] = LOCK_OFF
                                    perf3_num.setText('Test example 2 (this could be removed)')
            perf3_btn1.wasClicked = True  # if perf3_btn1 is still clicked next frame, it is not a new click
        else:
            perf3_btn1.wasClicked = False  # if perf3_btn1 is clicked next frame, it is a new click
    else:
        perf3_btn1.buttonClock.reset() # keep clock at 0 if button hasn't started / has finished
        perf3_btn1.wasClicked = False  # if perf3_btn1 is clicked next frame, it is a new click
    
    # *perf3_ex1* updates
    if perf3_ex1.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        perf3_ex1.frameNStart = frameN  # exact frame index
        perf3_ex1.tStart = t  # local t and not account for scr refresh
        perf3_ex1.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(perf3_ex1, 'tStartRefresh')  # time at next scr refresh
        perf3_ex1.setAutoDraw(True)
    if perf3_ex1.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > perf3_ex1.tStartRefresh + 300.0-frameTolerance:
            # keep track of stop time/frame for later
            perf3_ex1.tStop = t  # not accounting for scr refresh
            perf3_ex1.frameNStop = frameN  # exact frame index
            win.timeOnFlip(perf3_ex1, 'tStopRefresh')  # time at next scr refresh
            perf3_ex1.setAutoDraw(False)
    
    # *perf3_bg1* updates
    if perf3_bg1.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        perf3_bg1.frameNStart = frameN  # exact frame index
        perf3_bg1.tStart = t  # local t and not account for scr refresh
        perf3_bg1.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(perf3_bg1, 'tStartRefresh')  # time at next scr refresh
        perf3_bg1.setAutoDraw(True)
    if perf3_bg1.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > perf3_bg1.tStartRefresh + 300.0-frameTolerance:
            # keep track of stop time/frame for later
            perf3_bg1.tStop = t  # not accounting for scr refresh
            perf3_bg1.frameNStop = frameN  # exact frame index
            win.timeOnFlip(perf3_bg1, 'tStopRefresh')  # time at next scr refresh
            perf3_bg1.setAutoDraw(False)
    
    # *perf3_bg2* updates
    if perf3_bg2.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        perf3_bg2.frameNStart = frameN  # exact frame index
        perf3_bg2.tStart = t  # local t and not account for scr refresh
        perf3_bg2.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(perf3_bg2, 'tStartRefresh')  # time at next scr refresh
        perf3_bg2.setAutoDraw(True)
    if perf3_bg2.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > perf3_bg2.tStartRefresh + 300.0-frameTolerance:
            # keep track of stop time/frame for later
            perf3_bg2.tStop = t  # not accounting for scr refresh
            perf3_bg2.frameNStop = frameN  # exact frame index
            win.timeOnFlip(perf3_bg2, 'tStopRefresh')  # time at next scr refresh
            perf3_bg2.setAutoDraw(False)
    
    # check for quit (typically the Esc key)
    if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
        core.quit()
    
    # check if all components have finished
    if not continueRoutine:  # a component has requested a forced-end of Routine
        break
    continueRoutine = False  # will revert to True if at least one component still running
    for thisComponent in Performance_3Components:
        if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
            continueRoutine = True
            break  # at least one component has not yet finished
    
    # refresh the screen
    if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
        win.flip()

# -------Ending Routine "Performance_3"-------
for thisComponent in Performance_3Components:
    if hasattr(thisComponent, "setAutoDraw"):
        thisComponent.setAutoDraw(False)
thisExp.addData('perf3_num.started', perf3_num.tStartRefresh)
thisExp.addData('perf3_num.stopped', perf3_num.tStopRefresh)
thisExp.addData('perf3_txt1.started', perf3_txt1.tStartRefresh)
thisExp.addData('perf3_txt1.stopped', perf3_txt1.tStopRefresh)
thisExp.addData('perf3_btn5.started', perf3_btn5.tStartRefresh)
thisExp.addData('perf3_btn5.stopped', perf3_btn5.tStopRefresh)
thisExp.addData('perf3_btn5.numClicks', perf3_btn5.numClicks)
if perf3_btn5.numClicks:
   thisExp.addData('perf3_btn5.timesOn', perf3_btn5.timesOn)
   thisExp.addData('perf3_btn5.timesOff', perf3_btn5.timesOff)
else:
   thisExp.addData('perf3_btn5.timesOn', "")
   thisExp.addData('perf3_btn5.timesOff', "")
thisExp.addData('perf3_ex5.started', perf3_ex5.tStartRefresh)
thisExp.addData('perf3_ex5.stopped', perf3_ex5.tStopRefresh)
thisExp.addData('perf3_btn4.started', perf3_btn4.tStartRefresh)
thisExp.addData('perf3_btn4.stopped', perf3_btn4.tStopRefresh)
thisExp.addData('perf3_btn4.numClicks', perf3_btn4.numClicks)
if perf3_btn4.numClicks:
   thisExp.addData('perf3_btn4.timesOn', perf3_btn4.timesOn)
   thisExp.addData('perf3_btn4.timesOff', perf3_btn4.timesOff)
else:
   thisExp.addData('perf3_btn4.timesOn', "")
   thisExp.addData('perf3_btn4.timesOff', "")
thisExp.addData('perf3_ex4.started', perf3_ex4.tStartRefresh)
thisExp.addData('perf3_ex4.stopped', perf3_ex4.tStopRefresh)
thisExp.addData('perf3_btn3.started', perf3_btn3.tStartRefresh)
thisExp.addData('perf3_btn3.stopped', perf3_btn3.tStopRefresh)
thisExp.addData('perf3_btn3.numClicks', perf3_btn3.numClicks)
if perf3_btn3.numClicks:
   thisExp.addData('perf3_btn3.timesOn', perf3_btn3.timesOn)
   thisExp.addData('perf3_btn3.timesOff', perf3_btn3.timesOff)
else:
   thisExp.addData('perf3_btn3.timesOn', "")
   thisExp.addData('perf3_btn3.timesOff', "")
thisExp.addData('perf3_ex3.started', perf3_ex3.tStartRefresh)
thisExp.addData('perf3_ex3.stopped', perf3_ex3.tStopRefresh)
thisExp.addData('perf3_btn2.started', perf3_btn2.tStartRefresh)
thisExp.addData('perf3_btn2.stopped', perf3_btn2.tStopRefresh)
thisExp.addData('perf3_btn2.numClicks', perf3_btn2.numClicks)
if perf3_btn2.numClicks:
   thisExp.addData('perf3_btn2.timesOn', perf3_btn2.timesOn)
   thisExp.addData('perf3_btn2.timesOff', perf3_btn2.timesOff)
else:
   thisExp.addData('perf3_btn2.timesOn', "")
   thisExp.addData('perf3_btn2.timesOff', "")
thisExp.addData('perf3_ex2.started', perf3_ex2.tStartRefresh)
thisExp.addData('perf3_ex2.stopped', perf3_ex2.tStopRefresh)
thisExp.addData('perf3_btn1.started', perf3_btn1.tStartRefresh)
thisExp.addData('perf3_btn1.stopped', perf3_btn1.tStopRefresh)
thisExp.addData('perf3_btn1.numClicks', perf3_btn1.numClicks)
if perf3_btn1.numClicks:
   thisExp.addData('perf3_btn1.timesOn', perf3_btn1.timesOn)
   thisExp.addData('perf3_btn1.timesOff', perf3_btn1.timesOff)
else:
   thisExp.addData('perf3_btn1.timesOn', "")
   thisExp.addData('perf3_btn1.timesOff', "")
thisExp.addData('perf3_ex1.started', perf3_ex1.tStartRefresh)
thisExp.addData('perf3_ex1.stopped', perf3_ex1.tStopRefresh)
thisExp.addData('perf3_bg1.started', perf3_bg1.tStartRefresh)
thisExp.addData('perf3_bg1.stopped', perf3_bg1.tStopRefresh)
thisExp.addData('perf3_bg2.started', perf3_bg2.tStartRefresh)
thisExp.addData('perf3_bg2.stopped', perf3_bg2.tStopRefresh)

# ------Prepare to start Routine "Debriefing"-------
continueRoutine = True
routineTimer.add(300.000000)
# update component parameters for each repeat
# keep track of which components have finished
DebriefingComponents = [debrf_info, debrf_btn]
for thisComponent in DebriefingComponents:
    thisComponent.tStart = None
    thisComponent.tStop = None
    thisComponent.tStartRefresh = None
    thisComponent.tStopRefresh = None
    if hasattr(thisComponent, 'status'):
        thisComponent.status = NOT_STARTED
# reset timers
t = 0
_timeToFirstFrame = win.getFutureFlipTime(clock="now")
DebriefingClock.reset(-_timeToFirstFrame)  # t0 is time of first possible flip
frameN = -1

# -------Run Routine "Debriefing"-------
while continueRoutine and routineTimer.getTime() > 0:
    # get current time
    t = DebriefingClock.getTime()
    tThisFlip = win.getFutureFlipTime(clock=DebriefingClock)
    tThisFlipGlobal = win.getFutureFlipTime(clock=None)
    frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
    # update/draw components on each frame
    
    # *debrf_info* updates
    if debrf_info.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        debrf_info.frameNStart = frameN  # exact frame index
        debrf_info.tStart = t  # local t and not account for scr refresh
        debrf_info.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(debrf_info, 'tStartRefresh')  # time at next scr refresh
        debrf_info.setAutoDraw(True)
    if debrf_info.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > debrf_info.tStartRefresh + 300.0-frameTolerance:
            # keep track of stop time/frame for later
            debrf_info.tStop = t  # not accounting for scr refresh
            debrf_info.frameNStop = frameN  # exact frame index
            win.timeOnFlip(debrf_info, 'tStopRefresh')  # time at next scr refresh
            debrf_info.setAutoDraw(False)
    
    # *debrf_btn* updates
    if debrf_btn.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        debrf_btn.frameNStart = frameN  # exact frame index
        debrf_btn.tStart = t  # local t and not account for scr refresh
        debrf_btn.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(debrf_btn, 'tStartRefresh')  # time at next scr refresh
        debrf_btn.setAutoDraw(True)
    if debrf_btn.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > debrf_btn.tStartRefresh + 300.0-frameTolerance:
            # keep track of stop time/frame for later
            debrf_btn.tStop = t  # not accounting for scr refresh
            debrf_btn.frameNStop = frameN  # exact frame index
            win.timeOnFlip(debrf_btn, 'tStopRefresh')  # time at next scr refresh
            debrf_btn.setAutoDraw(False)
    if debrf_btn.status == STARTED:
        # check whether debrf_btn has been pressed
        if debrf_btn.isClicked:
            if not debrf_btn.wasClicked:
                debrf_btn.timesOn.append(debrf_btn.buttonClock.getTime()) # store time of first click
                debrf_btn.timesOff.append(debrf_btn.buttonClock.getTime()) # store time clicked until
            else:
                debrf_btn.timesOff[-1] = debrf_btn.buttonClock.getTime() # update time clicked until
            if not debrf_btn.wasClicked:
                continueRoutine = False  # end routine when debrf_btn is clicked
                None
            debrf_btn.wasClicked = True  # if debrf_btn is still clicked next frame, it is not a new click
        else:
            debrf_btn.wasClicked = False  # if debrf_btn is clicked next frame, it is a new click
    else:
        debrf_btn.buttonClock.reset() # keep clock at 0 if button hasn't started / has finished
        debrf_btn.wasClicked = False  # if debrf_btn is clicked next frame, it is a new click
    
    # check for quit (typically the Esc key)
    if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
        core.quit()
    
    # check if all components have finished
    if not continueRoutine:  # a component has requested a forced-end of Routine
        break
    continueRoutine = False  # will revert to True if at least one component still running
    for thisComponent in DebriefingComponents:
        if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
            continueRoutine = True
            break  # at least one component has not yet finished
    
    # refresh the screen
    if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
        win.flip()

# -------Ending Routine "Debriefing"-------
for thisComponent in DebriefingComponents:
    if hasattr(thisComponent, "setAutoDraw"):
        thisComponent.setAutoDraw(False)
thisExp.addData('debrf_info.started', debrf_info.tStartRefresh)
thisExp.addData('debrf_info.stopped', debrf_info.tStopRefresh)
thisExp.addData('debrf_btn.started', debrf_btn.tStartRefresh)
thisExp.addData('debrf_btn.stopped', debrf_btn.tStopRefresh)
thisExp.addData('debrf_btn.numClicks', debrf_btn.numClicks)
if debrf_btn.numClicks:
   thisExp.addData('debrf_btn.timesOn', debrf_btn.timesOn)
   thisExp.addData('debrf_btn.timesOff', debrf_btn.timesOff)
else:
   thisExp.addData('debrf_btn.timesOn', "")
   thisExp.addData('debrf_btn.timesOff', "")

# Flip one final time so any remaining win.callOnFlip() 
# and win.timeOnFlip() tasks get executed before quitting
win.flip()

# these shouldn't be strictly necessary (should auto-save)
thisExp.saveAsWideText(filename+'.csv', delim='auto')
thisExp.saveAsPickle(filename)
logging.flush()
# make sure everything is closed down
thisExp.abort()  # or data files will save again on exit
win.close()
core.quit()
