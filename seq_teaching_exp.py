#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
This experiment was created using PsychoPy3 Experiment Builder (v2021.2.3),
    on November 23, 2021, at 11:43
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

sleepTime = 0.2
green =  (-0.0039, 1.0000, -1.0000)
red = (1.0000, -0.2235, -0.4431)
white = (1.0,1.0,1.0)
traceSaveAtFrame = 10

introTimeL=120
mergeTestTimeL = 90
mergeTrainTimeL = 60
mergeExplTimeL = 30
sortTestTimeL = 300
sortTrainTimeL = 240
sortExplTimeL=60

scaleEqPath = "materials/merge_sort/imgs/scale_balanced.png"
scaleLtPath = "materials/merge_sort/imgs/scale_right.png"
scaleGtPath = "materials/merge_sort/imgs/scale_left.png"

def moveItem(mouse, grabbed):
    # Move piece if we already moving that piece
    if grabbed is not None and mouse.isPressedIn(grabbed):
        (u,v) = mouse.getPos()
        if left <= u and u <= right and bot <= v and v <= top:
            grabbed.pos = (u,v)
        return grabbed
    else:
        # Move newly clicked piece
        for item in items:
            if mouse.isPressedIn(item) and grabbed is not item:
                return item
    return grabbed
 
def comparePickedItems(values,labels,leftInput,rightInput):
    if len(leftInput.text) == 0 or len(rightInput.text) == 0:
        return [1,"",""]
    elif len(leftInput.text) > 1 or len(rightInput.text) > 1:
        return [2,"",""]
    elif leftInput.text not in labels or rightInput.text not in labels:
        return [3,"",""]
    leftIdx = labels.index(leftInput.text)
    rightIdx = labels.index(rightInput.text)
    leftValue = values[leftIdx]
    rightValue = values[rightIdx]
    if leftValue > rightValue:
        return [4,leftInput.text,rightInput.text]
    elif leftValue < rightValue:
        return [5,leftInput.text,rightInput.text]
    else:
        return [6,leftInput.text,rightInput.text]
    
def timeSleep(T):
    u = 0
    for i in range(int(1000000*T)):
        u = u + 1
    
def compare(scale,listValues,labels,instr,scaleLeft,scaleRight):
    state = comparePickedItems(listValues,labels,scaleLeft,scaleRight)
    timeSleep(sleepTime)
    if state[0] > 3:
        instr.color = green
        if state == 4:
            instr.text = state[1] + " > " + state[2]
            instr.height = 0.05
            scale.image = scaleGtPath
        elif state == 5 :
            instr.text = state[1] + " < " + state[2]
            instr.height = 0.05
            scale.image = scaleLtPath
        else:
            instr.text = state[1] + " = " + state[2]
            instr.height = 0.05
            scale.image = scaleEqPath
        return [1,state[1],state[2]]
    elif state[0] == 1:
        instr.text = "Please provide labels in correct format for both LHS and RHS"
        instr.color = red
        instr.height = 0.02
    elif state[0] == 2:
        instr.text = "Please enter labels as single capitals"
        instr.color = red
        instr.height = 0.02
    elif state[0] == 3:
        instr.text = "Please enter an existing item"
        instr.color = red
        instr.height = 0.02
    return [0,state[1],state[2]]

def checkSortTrainAns(input,labels,res,feedback_1,feedback_2):
    correct = getSortTrace(input,labels)
    submitted = res.replace(" ","")
    values = res.replace(",","")
    correctValues = correct.replace(",","")
    if submitted == correct:
        feedback_1.text = "Your answer is correct!"
        feedback_1.color = green
        feedback_2.text = ""
    elif values == correctValues:
        feedback_1.text = "Your answer does not have the correct format!\n"
        feedback_1.color = red
        feedback_2.text = "The correct answer is >>>>\n" + correct
        feedback_2.color = green
    else:
        feedback_1.text = "Your answer is wrong!"
        feedback_1.color = red
        feedback_2.text = "The correct answer is >>>>\n" + correct
        feedback_2.color = green
    
def getSortTrace(input,labels):
    temp = []
    for i in input:
        temp.append([i])
    while len(temp) > 1:
        sublists = []
        for i in range(0,int(len(temp)/2)):
            sublists.append(sorted(temp[i*2] + temp[i*2+1]))
        if len(temp) % 2 == 1:
            temp = sublists + [temp[-1]]
        else:
            temp = sublists
    sublistLabels = ""
    for i in range(0,len(temp)):
        for j in range(0,len(temp[i])):
            sublistLabels = sublistLabels + labels[input.index(temp[i][j])]
            if i < len(temp) - 1 or j < len(temp[i]) - 1: sublistLabels = sublistLabels + ","
    return sublistLabels

# enable image components on white board given an input list to sort
def enableImageComponents(components,labels,imagePathBase):
    enabledComponents = []
    i = 0
    for component in components:
        if isinstance(component,visual.ImageStim):
            exId= component.name.split("_")[-2:]
            if exId[-2] == "ex":
                imageIdx= exId[-1]
                if int(imageIdx) > len(labels):
                    component.image = "materials/merge_sort/imgs/white_BG.png"
                else:
                    component.image = imagePathBase + "_" + labels[i] + ".png"
                    enabledComponents.append(component)
                    i += 1
    return enabledComponents

def getCorrectMCOrder(N,path1,path2,img1,img2): 
    rand_seq = [0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1]
    order = [rand_seq[N],1-rand_seq[N]]
    if (path1.split("_")[-1] == "wrong.png" and path2.split("_")[-1] == "correct.png") or (path2.split("_")[-1] == "wrong.png" and path1.split("_")[-1] == "correct.png"):
        if order == [1,0]:
            img1.image = path1
            img2.image = path2
        else:
            img1.image = path2
            img2.image = path1
        return order
    else:
        raise ValueError("Training multiple choice setup is incorrect!")

def showMergeExpl(submitted,feedback1,feedback2,mc1,mc2,mcPath1,mcPath2,expl1,expl2):
    # finds which choice user has selected
    feedback1.text = ""
    feedback2.text = ""
    
    if submitted == 0:
        feedback1.text = "SELECTED >>> \n"
    elif submitted == 1:
        feedback2.text = "SELECTED >>> \n"
    
    # show user which answer is correct and wrong
    if mc_order == [1,0]:
        feedback1.color = green
        feedback2.color = red
        feedback1.text = feedback1.text + "This answer is correct!"
        feedback2.text = feedback2.text + "This answer is wrong!"
         
         # show the selections
        mc1.image = mcPath1.split(".png")[0] + "_selected.png"
        mc2.image = mcPath2.split(".png")[0] + "_selected.png"
        expl1.image = mcPath1.split(".png")[0] + "_expl.png"
        expl2.image = mcPath2.split(".png")[0] + "_expl.png"
    else:
        feedback1.color = red
        feedback2.color = green
        feedback1.text = feedback1.text + "This answer is wrong!"
        feedback2.text = feedback2.text + "This answer is correct!"
        
         # show the selections
        mc1.image = mcPath2.split(".png")[0] + "_selected.png"
        mc2.image = mcPath1.split(".png")[0] + "_selected.png"
        expl1.image = mcPath2.split(".png")[0] + "_expl.png"
        expl2.image = mcPath1.split(".png")[0] + "_expl.png"
        
def checkBGSelection(m,groups,picked):
    for item in groups:
        if m != None and m.isPressedIn(item):
            for others in groups:
                others.image = "materials/imgs/" + others.name + ".png"
            item.image = "materials/imgs/" + item.name + "_selected.png"
            timeSleep(sleepTime)
            return item
    return picked

def timerWarning(timeLimt, timePassed):
    tRemain = int(timeLimt- t)
    if tRemain <= 30:
        return "Remain time sec: "+ str(tRemain)
    else:
        return ""
        
def updateTrace(itemPos,newItemPos):
    updated = []
    for i in itemPos:
        for j in newItemPos:
            if i[0] == j[0] and not (i[1] == j[1] and i[2] == j[2]):
                updated.append(j)
    return updated


# Ensure that relative paths start from the same directory as this script
_thisDir = os.path.dirname(os.path.abspath(__file__))
os.chdir(_thisDir)

# Store info about the experiment session
psychopyVersion = '2021.2.3'
expName = 'machine_human_learning'  # from the Builder filename that created this script
expInfo = {'participant': '000', 'session': '001'}
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
    originPath='C:\\Users\\allen\\OneDrive\\Documents\\GitHub\\seq_teaching_interface\\seq_teaching_exp.py',
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
    size=[1536, 864], fullscr=True, screen=0, 
    winType='pyglet', allowGUI=False, allowStencil=False,
    monitor='testMonitor', color=(0,0,0), colorSpace='rgb',
    blendMode='avg', useFBO=True, 
    units='height')
# store frame rate of monitor if we can measure it
expInfo['frameRate'] = win.getActualFrameRate()
if expInfo['frameRate'] != None:
    frameDur = 1.0 / round(expInfo['frameRate'])
else:
    frameDur = 1.0 / 60.0  # could not measure, so guess

# Setup eyetracking
ioDevice = ioConfig = ioSession = ioServer = eyetracker = None

# create a default keyboard (e.g. to check for escape)
defaultKeyboard = keyboard.Keyboard()

# Initialize components for Routine "BACKGROUND"
BACKGROUNDClock = core.Clock()
# Set experiment start values for variable component demographic_gender
demographic_gender = ''
demographic_genderContainer = []
# Set experiment start values for variable component demographic_education
demographic_education = ''
demographic_educationContainer = []
# Set experiment start values for variable component demographic_age
demographic_age = ''
demographic_ageContainer = []
background_instr = visual.TextStim(win=win, name='background_instr',
    text='',
    font='Open Sans',
    pos=(0, 0.4), height=0.03, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-3.0);
gender = visual.TextStim(win=win, name='gender',
    text='',
    font='Open Sans',
    pos=(0, 0.3), height=0.03, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-4.0);
prefer_not_to_say = visual.ImageStim(
    win=win,
    name='prefer_not_to_say', 
    image='materials/imgs/prefer_not_to_say.png', mask=None,
    ori=0.0, pos=(0.3, 0.2), size=(0.12, 0.07),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-5.0)
other_gender = visual.ImageStim(
    win=win,
    name='other_gender', 
    image='materials/imgs/other_gender.png', mask=None,
    ori=0.0, pos=(0.1, 0.2), size=(0.12, 0.07),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-6.0)
female = visual.ImageStim(
    win=win,
    name='female', 
    image='materials/imgs/female.png', mask=None,
    ori=0.0, pos=(-0.3, 0.2), size=(0.12, 0.07),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-7.0)
male = visual.ImageStim(
    win=win,
    name='male', 
    image='materials/imgs/male.png', mask=None,
    ori=0.0, pos=(-0.1, 0.2), size=(0.1, 0.07),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-8.0)
age = visual.TextStim(win=win, name='age',
    text='',
    font='Open Sans',
    pos=(0, 0.1), height=0.03, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-9.0);
_18_24 = visual.ImageStim(
    win=win,
    name='_18_24', 
    image='materials/imgs/_18_24.png', mask=None,
    ori=0.0, pos=(-0.5, 0), size=(0.1, 0.07),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-10.0)
_25_34 = visual.ImageStim(
    win=win,
    name='_25_34', 
    image='materials/imgs/_25_34.png', mask=None,
    ori=0.0, pos=(-0.3, 0), size=(0.1, 0.07),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-11.0)
_35_44 = visual.ImageStim(
    win=win,
    name='_35_44', 
    image='materials/imgs/_35_44.png', mask=None,
    ori=0.0, pos=(-0.1, 0), size=(0.1, 0.07),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-12.0)
_45_54 = visual.ImageStim(
    win=win,
    name='_45_54', 
    image='materials/imgs/_45_54.png', mask=None,
    ori=0.0, pos=(0.1, 0), size=(0.1, 0.07),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-13.0)
_55_64 = visual.ImageStim(
    win=win,
    name='_55_64', 
    image='materials/imgs/_55_64.png', mask=None,
    ori=0.0, pos=(0.3, 0), size=(0.1, 0.07),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-14.0)
_65 = visual.ImageStim(
    win=win,
    name='_65', 
    image='materials/imgs/_65.png', mask=None,
    ori=0.0, pos=(0.5, 0), size=(0.1, 0.07),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-15.0)
education = visual.TextStim(win=win, name='education',
    text='',
    font='Open Sans',
    pos=(0, -0.1), height=0.03, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-16.0);
less_than_high_school = visual.ImageStim(
    win=win,
    name='less_than_high_school', 
    image='materials/imgs/less_than_high_school.png', mask=None,
    ori=0.0, pos=(-0.75, -0.2), size=(0.2, 0.07),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-17.0)
high_school_equivalent = visual.ImageStim(
    win=win,
    name='high_school_equivalent', 
    image='materials/imgs/high_school_equivalent.png', mask=None,
    ori=0.0, pos=(-0.5, -0.2), size=(0.2, 0.07),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-18.0)
college = visual.ImageStim(
    win=win,
    name='college', 
    image='materials/imgs/college.png', mask=None,
    ori=0.0, pos=(-0.25, -0.2), size=(0.2, 0.07),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-19.0)
bachelor = visual.ImageStim(
    win=win,
    name='bachelor', 
    image='materials/imgs/bachelor.png', mask=None,
    ori=0.0, pos=(0, -0.2), size=(0.2, 0.07),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-20.0)
graduate = visual.ImageStim(
    win=win,
    name='graduate', 
    image='materials/imgs/graduate.png', mask=None,
    ori=0.0, pos=(0.25, -0.2), size=(0.2, 0.07),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-21.0)
doctorate = visual.ImageStim(
    win=win,
    name='doctorate', 
    image='materials/imgs/doctorate.png', mask=None,
    ori=0.0, pos=(0.5, -0.2), size=(0.2, 0.07),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-22.0)
other = visual.ImageStim(
    win=win,
    name='other', 
    image='materials/imgs/other.png', mask=None,
    ori=0.0, pos=(0.75, -0.2), size=(0.2, 0.07),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-23.0)
background_btn = visual.ImageStim(
    win=win,
    name='background_btn', 
    image='materials/imgs/waiting.png', mask=None,
    ori=0.0, pos=(0, -0.4), size=(0.24, 0.1),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-24.0)
background_mouse = event.Mouse(win=win)
x, y = [None, None]
background_mouse.mouseClock = core.Clock()
pass

# Initialize components for Routine "INTRO"
INTROClock = core.Clock()
intro_text = visual.TextStim(win=win, name='intro_text',
    text='Today, you will learn how to help our robot trader friends ALICE & BOB to package fruits for shipment. \n\nYou will visit two warehouses "rooms", learn and perform the BLUE STAR operator and the PURPLE DIAMOND operator. \n\nALICE and BOB will first help you learn these operators and then test your knowledge afterwards.',
    font='Open Sans',
    pos=(0, -0.15), height=0.03, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=0.0);
alice = visual.ImageStim(
    win=win,
    name='alice', 
    image='materials/merge_sort/imgs/alice.png', mask=None,
    ori=0.0, pos=(-0.2, 0.2), size=(0.2, 0.2),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-1.0)
bob = visual.ImageStim(
    win=win,
    name='bob', 
    image='materials/merge_sort/imgs/bob.png', mask=None,
    ori=0.0, pos=(0.2, 0.2), size=(0.2, 0.2),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-2.0)
door_1 = visual.ImageStim(
    win=win,
    name='door_1', 
    image='materials/merge_sort/imgs/door.png', mask=None,
    ori=0.0, pos=(-0.4, 0.2), size=(0.15, 0.3),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-3.0)
door_2 = visual.ImageStim(
    win=win,
    name='door_2', 
    image='materials/merge_sort/imgs/door.png', mask=None,
    ori=0.0, pos=(0.4, 0.2), size=(0.15, 0.3),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-4.0)
intro_btn = visual.ImageStim(
    win=win,
    name='intro_btn', 
    image='materials/imgs/continue.png', mask=None,
    ori=0.0, pos=(0, -0.4), size=[0.28,0.1],
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-5.0)
intro_mouse = event.Mouse(win=win)
x, y = [None, None]
intro_mouse.mouseClock = core.Clock()

# Initialize components for Routine "HINT"
HINTClock = core.Clock()
intro_text_8 = visual.TextStim(win=win, name='intro_text_8',
    text="*** What ALICE teaches you about the BLUE STAR might help you better learn and work throgh BOB's the PURPLE DIAMOND ***",
    font='Open Sans',
    pos=(0, -0.15), height=0.03, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=0.0);
arrow = visual.ImageStim(
    win=win,
    name='arrow', 
    image='materials/imgs/arrow.png', mask=None,
    ori=0.0, pos=(0, 0.2), size=(0.3, 0.2),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-1.0)
alice_5 = visual.ImageStim(
    win=win,
    name='alice_5', 
    image='materials/merge_sort/imgs/alice.png', mask=None,
    ori=0.0, pos=(-0.3, 0.2), size=(0.2, 0.2),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-2.0)
bob_5 = visual.ImageStim(
    win=win,
    name='bob_5', 
    image='materials/merge_sort/imgs/bob.png', mask=None,
    ori=0.0, pos=(0.3, 0.2), size=(0.2, 0.2),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-3.0)
door_8 = visual.ImageStim(
    win=win,
    name='door_8', 
    image='materials/merge_sort/imgs/door.png', mask=None,
    ori=0.0, pos=(-0.5, 0.2), size=(0.15, 0.3),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-4.0)
door_9 = visual.ImageStim(
    win=win,
    name='door_9', 
    image='materials/merge_sort/imgs/door.png', mask=None,
    ori=0.0, pos=(0.5, 0.2), size=(0.15, 0.3),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-5.0)
hint_btn = visual.ImageStim(
    win=win,
    name='hint_btn', 
    image='materials/imgs/continue.png', mask=None,
    ori=0.0, pos=(0, -0.4), size=[0.28,0.1],
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-6.0)
hint_mouse = event.Mouse(win=win)
x, y = [None, None]
hint_mouse.mouseClock = core.Clock()

# Initialize components for Routine "MERGE_INTRO"
MERGE_INTROClock = core.Clock()
intro_text_2 = visual.TextStim(win=win, name='intro_text_2',
    text='ALICE: BIZZ ... Thank you for coming to help! We have fruits in some boxes to be put on a conveyor.\n\n1. The fruits in EACH ORANGE box INCREASE in weight from LEFT to RIGHT\n\n2. The BLUE STAR puts fruits from two ORANGE boxes on the CONVEYOR BELT in INCREASING weights from LEFT to RIGHT \n\nLEARN the BLUE STAR operation in steps and master it. ',
    font='Open Sans',
    pos=(0, -0.15), height=0.03, wrapWidth=1.2, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=0.0);
alice_2 = visual.ImageStim(
    win=win,
    name='alice_2', 
    image='materials/merge_sort/imgs/alice.png', mask=None,
    ori=0.0, pos=(-0.25, 0.25), size=(0.2, 0.2),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-1.0)
merge_example = visual.ImageStim(
    win=win,
    name='merge_example', 
    image='materials/merge_sort/imgs/merge_train/merge_train_example.png', mask=None,
    ori=0.0, pos=(0.3, 0.25), size=(0.7, 0.4),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-2.0)
door_3 = visual.ImageStim(
    win=win,
    name='door_3', 
    image='materials/merge_sort/imgs/door.png', mask=None,
    ori=0.0, pos=(-0.45, 0.25), size=(0.15, 0.3),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-3.0)
merge_intro_btn = visual.ImageStim(
    win=win,
    name='merge_intro_btn', 
    image='materials/imgs/continue.png', mask=None,
    ori=0.0, pos=(0, -0.4), size=[0.28,0.1],
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-4.0)
merge_intro_mouse = event.Mouse(win=win)
x, y = [None, None]
merge_intro_mouse.mouseClock = core.Clock()

# Initialize components for Routine "MERGE_TRAIN"
MERGE_TRAINClock = core.Clock()
# Set experiment start values for variable component merge_train_compare_records
merge_train_compare_records = ''
merge_train_compare_recordsContainer = []
# Set experiment start values for variable component mc_order
mc_order = ''
mc_orderContainer = []
# Set experiment start values for variable component merge_train_labels
merge_train_labels = ''
merge_train_labelsContainer = []
# Set experiment start values for variable component merge_train_compareN
merge_train_compareN = ''
merge_train_compareNContainer = []
# Set experiment start values for variable component merge_train_mc_path_2
merge_train_mc_path_2 = ''
merge_train_mc_path_2Container = []
# Set experiment start values for variable component merge_train_mc_path_1
merge_train_mc_path_1 = ''
merge_train_mc_path_1Container = []
# Set experiment start values for variable component merge_train_input
merge_train_input = ''
merge_train_inputContainer = []
merge_train_scale_instr = visual.TextStim(win=win, name='merge_train_scale_instr',
    text='',
    font='Open Sans',
    pos=(-0.65,0.45), height=1.0, wrapWidth=0.3, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-7.0);
merge_ans_instr = visual.TextStim(win=win, name='merge_ans_instr',
    text='Please SELECT the CONVEYOR BELT that has the correct fruit(s) on YELLOW position(s):',
    font='Open Sans',
    pos=(0, -0.15), height=0.03, wrapWidth=1.6, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-8.0);
merge_train_instr = visual.TextStim(win=win, name='merge_train_instr',
    text='1. Use the scale on the left to COMPARE weights of TWO fruits by entering the alphabetic CAPITAL labels\n\n2. In EACH ORANGE box, fruits are arranged in INCREASING weights from LEFT to RIGHT\n\n3. Fruits on the CONVEYOR BELT are arranged in INCREASING weights from LEFT to RIGHT\n\nYou have 90 SECS to SUBMIT!',
    font='Open Sans',
    pos=(0.65, 0.2), height=0.025, wrapWidth=0.4, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-9.0);
merge_train_scale_right = visual.TextBox2(
     win, text=None, font='Open Sans',
     pos=(-0.55, 0.4),     letterHeight=0.03,
     size=(0.1,0.07), borderWidth=2.0,
     color='black', colorSpace='rgb',
     opacity=None,
     bold=False, italic=False,
     lineSpacing=1.0,
     padding=None,
     anchor='top-center',
     fillColor='white', borderColor=None,
     flipHoriz=False, flipVert=False,
     editable=True,
     name='merge_train_scale_right',
     autoLog=False,
)
merge_train_scale_left = visual.TextBox2(
     win, text=None, font='Open Sans',
     pos=(-0.75, 0.4),     letterHeight=0.03,
     size=(0.1, 0.07), borderWidth=2.0,
     color='black', colorSpace='rgb',
     opacity=None,
     bold=False, italic=False,
     lineSpacing=1.0,
     padding=None,
     anchor='top-center',
     fillColor='white', borderColor=None,
     flipHoriz=False, flipVert=False,
     editable=True,
     name='merge_train_scale_left',
     autoLog=False,
)
merge_train_sep = visual.ImageStim(
    win=win,
    name='merge_train_sep', 
    image='materials/merge_sort/imgs/white_BG.png', mask=None,
    ori=0.0, pos=(0, -0.11), size=(1.5,0.005),
    color=[1,1,1], colorSpace='rgb', opacity=1.0,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-12.0)
merge_train = visual.ImageStim(
    win=win,
    name='merge_train', 
    image='sin', mask=None,
    ori=0.0, pos=(0, 0.2), size=(0.8, 0.4),
    color=[1,1,1], colorSpace='rgb', opacity=1.0,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-13.0)
merge_train_mc_1 = visual.ImageStim(
    win=win,
    name='merge_train_mc_1', 
    image='materials/merge_sort/imgs/white_BG.png', mask=None,
    ori=0.0, pos=(-0.3,-0.25), size=(0.7,0.1),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-14.0)
merge_train_mc_2 = visual.ImageStim(
    win=win,
    name='merge_train_mc_2', 
    image='materials/merge_sort/imgs/white_BG.png', mask=None,
    ori=0.0, pos=(-0.3, -0.4), size=(0.7,0.1),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-15.0)
merge_train_scale = visual.ImageStim(
    win=win,
    name='merge_train_scale', 
    image='sin', mask=None,
    ori=0.0, pos=(-0.65, 0.15), size=(0.3, 0.3),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-16.0)
merge_train_btn_1 = visual.ImageStim(
    win=win,
    name='merge_train_btn_1', 
    image='materials/imgs/submit.png', mask=None,
    ori=0.0, pos=(0.5, -0.25), size=[0.24,0.1],
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-17.0)
merge_train_btn_2 = visual.ImageStim(
    win=win,
    name='merge_train_btn_2', 
    image='materials/imgs/submit.png', mask=None,
    ori=0.0, pos=(0.5, -0.4), size=[0.24,0.1],
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-18.0)
merge_train_compare = visual.ImageStim(
    win=win,
    name='merge_train_compare', 
    image='materials/merge_sort/imgs/compare.png', mask=None,
    ori=0.0, pos=(-0.65, -0.05), size=(0.16,0.07),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-19.0)
merge_train_mouse = event.Mouse(win=win)
x, y = [None, None]
merge_train_mouse.mouseClock = core.Clock()
merge_train_timer = visual.TextStim(win=win, name='merge_train_timer',
    text=None,
    font='Open Sans',
    pos=(0.65, -0.05), height=0.03, wrapWidth=None, ori=0.0, 
    color='orange', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-21.0);

# Initialize components for Routine "MERGE_EXPL"
MERGE_EXPLClock = core.Clock()
merge_expl_initial_state = visual.TextStim(win=win, name='merge_expl_initial_state',
    text='',
    font='Open Sans',
    pos=(-0.625,-0.1), height=0.03, wrapWidth=0.6, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=0.0);
merge_expl_feedback = visual.TextStim(win=win, name='merge_expl_feedback',
    text=None,
    font='Open Sans',
    pos=(-0.375,0.40), height=0.03, wrapWidth=0.8, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-1.0);
merge_expl_feedback_1 = visual.TextStim(win=win, name='merge_expl_feedback_1',
    text=None,
    font='Open Sans',
    pos=(-0.15,0.12), height=0.035, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-2.0);
merge_expl_feedback_2 = visual.TextStim(win=win, name='merge_expl_feedback_2',
    text=None,
    font='Open Sans',
    pos=(-0.15, -0.27), height=0.035, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-3.0);
merge_expl_ex = visual.ImageStim(
    win=win,
    name='merge_expl_ex', 
    image='sin', mask=None,
    ori=0.0, pos=(-0.625,0.05), size=(0.4,0.2),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-4.0)
merge_expl_sep = visual.ImageStim(
    win=win,
    name='merge_expl_sep', 
    image='materials/merge_sort/imgs/white_BG.png', mask=None,
    ori=0.0, pos=(-0.375, 0), size=(0.005,0.7),
    color=[1,1,1], colorSpace='rgb', opacity=1.0,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-5.0)
merge_expl_1 = visual.ImageStim(
    win=win,
    name='merge_expl_1', 
    image='sin', mask=None,
    ori=0.0, pos=(0.45, 0.25), size=(0.8, 0.4),
    color=[1,1,1], colorSpace='rgb', opacity=1.0,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-6.0)
merge_expl_2 = visual.ImageStim(
    win=win,
    name='merge_expl_2', 
    image='sin', mask=None,
    ori=0.0, pos=(0.45, -0.15), size=(0.8, 0.4),
    color=[1,1,1], colorSpace='rgb', opacity=1.0,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-7.0)
merge_expl_mc_1 = visual.ImageStim(
    win=win,
    name='merge_expl_mc_1', 
    image='materials/merge_sort/imgs/white_BG.png', mask=None,
    ori=0.0, pos=(-0.15,0.25), size=(0.3,0.075),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-8.0)
merge_expl_mc_2 = visual.ImageStim(
    win=win,
    name='merge_expl_mc_2', 
    image='materials/merge_sort/imgs/white_BG.png', mask=None,
    ori=0.0, pos=(-0.15, -0.15), size=(0.3,0.075),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-9.0)
merge_expl_btn = visual.ImageStim(
    win=win,
    name='merge_expl_btn', 
    image='materials/imgs/continue.png', mask=None,
    ori=0.0, pos=(0.35, -0.42), size=[0.28,0.1],
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-10.0)
merge_expl_mouse = event.Mouse(win=win)
x, y = [None, None]
merge_expl_mouse.mouseClock = core.Clock()
merge_expl_timer = visual.TextStim(win=win, name='merge_expl_timer',
    text='',
    font='Open Sans',
    pos=(-0.375, -0.42), height=0.03, wrapWidth=0.5, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-12.0);

# Initialize components for Routine "MERGE_TEST_INTRO"
MERGE_TEST_INTROClock = core.Clock()
intro_text_6 = visual.TextStim(win=win, name='intro_text_6',
    text='ALICE: BIZZ ... Now is time to apply the knowledge you learned about the BLUE STAR\n\n1. The fruits in EACH ORANGE box INCREASE in weight from LEFT to RIGHT\n\n2. The BLUE STAR puts fruits from two ORANGE boxes on the CONVEYOR BELT in INCREASING weights from LEFT to RIGHT',
    font='Open Sans',
    pos=(0, -0.15), height=0.03, wrapWidth=1.2, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=0.0);
alice_4 = visual.ImageStim(
    win=win,
    name='alice_4', 
    image='materials/merge_sort/imgs/alice.png', mask=None,
    ori=0.0, pos=(-0.25, 0.25), size=(0.2, 0.2),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-1.0)
merge_example_2 = visual.ImageStim(
    win=win,
    name='merge_example_2', 
    image='materials/merge_sort/imgs/merge_train/merge_train_example.png', mask=None,
    ori=0.0, pos=(0.3, 0.25), size=(0.7, 0.4),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-2.0)
door_6 = visual.ImageStim(
    win=win,
    name='door_6', 
    image='materials/merge_sort/imgs/door.png', mask=None,
    ori=0.0, pos=(-0.45, 0.25), size=(0.15, 0.3),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-3.0)
merge_test_intro_btn = visual.ImageStim(
    win=win,
    name='merge_test_intro_btn', 
    image='materials/imgs/continue.png', mask=None,
    ori=0.0, pos=(0, -0.4), size=[0.28,0.1],
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-4.0)
merge_test_intro_mouse = event.Mouse(win=win)
x, y = [None, None]
merge_test_intro_mouse.mouseClock = core.Clock()

# Initialize components for Routine "MERGE_TEST"
MERGE_TESTClock = core.Clock()
# Set experiment start values for variable component merge_test_compare_records
merge_test_compare_records = ''
merge_test_compare_recordsContainer = []
# Set experiment start values for variable component merge_test_labels
merge_test_labels = ''
merge_test_labelsContainer = []
# Set experiment start values for variable component merge_test_compareN
merge_test_compareN = ''
merge_test_compareNContainer = []
# Set experiment start values for variable component merge_test_input
merge_test_input = ''
merge_test_inputContainer = []
merge_test_scale_instr = visual.TextStim(win=win, name='merge_test_scale_instr',
    text='',
    font='Open Sans',
    pos=(-0.65,0.45), height=1.0, wrapWidth=0.3, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-4.0);
merge_test_ans_instr = visual.TextStim(win=win, name='merge_test_ans_instr',
    text='Put fruits on the CONVEYOR BELT by entering their labels as  X,X,X,X, ... ,X',
    font='Open Sans',
    pos=(-0.25, -0.25), height=0.03, wrapWidth=1.6, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-5.0);
merge_test_instr = visual.TextStim(win=win, name='merge_test_instr',
    text='1. Use the scale on the left to COMPARE weights of TWO fruits by entering the alphabetic CAPITAL labels\n\n2. In EACH ORANGE box, fruits are arranged in INCREASING weights from LEFT to RIGHT\n\n3. Fruits on the CONVEYOR BELT are arranged in INCREASING weights from LEFT to RIGHT\n\nYou have 90 SECS to SUBMIT!',
    font='Open Sans',
    pos=(0.65, 0.2), height=0.025, wrapWidth=0.4, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-6.0);
merge_test_scale_right = visual.TextBox2(
     win, text=None, font='Open Sans',
     pos=(-0.55, 0.4),     letterHeight=0.03,
     size=(0.1,0.07), borderWidth=2.0,
     color='black', colorSpace='rgb',
     opacity=None,
     bold=False, italic=False,
     lineSpacing=1.0,
     padding=None,
     anchor='top-center',
     fillColor='white', borderColor=None,
     flipHoriz=False, flipVert=False,
     editable=True,
     name='merge_test_scale_right',
     autoLog=False,
)
merge_test_scale_left = visual.TextBox2(
     win, text=None, font='Open Sans',
     pos=(-0.75, 0.4),     letterHeight=0.03,
     size=(0.1, 0.07), borderWidth=2.0,
     color='black', colorSpace='rgb',
     opacity=None,
     bold=False, italic=False,
     lineSpacing=1.0,
     padding=None,
     anchor='top-center',
     fillColor='white', borderColor=None,
     flipHoriz=False, flipVert=False,
     editable=True,
     name='merge_test_scale_left',
     autoLog=False,
)
merge_test_res = visual.TextBox2(
     win, text=None, font='Open Sans',
     pos=(-0.25, -0.3),     letterHeight=0.05,
     size=(0.7,0.1), borderWidth=2.0,
     color='black', colorSpace='rgb',
     opacity=None,
     bold=False, italic=False,
     lineSpacing=1.0,
     padding=None,
     anchor='top-center',
     fillColor='white', borderColor=None,
     flipHoriz=False, flipVert=False,
     editable=True,
     name='merge_test_res',
     autoLog=False,
)
merge_test_sep = visual.ImageStim(
    win=win,
    name='merge_test_sep', 
    image='materials/merge_sort/imgs/white_BG.png', mask=None,
    ori=0.0, pos=(0, -0.15), size=(1.5,0.005),
    color=[1,1,1], colorSpace='rgb', opacity=1.0,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-10.0)
merge_test = visual.ImageStim(
    win=win,
    name='merge_test', 
    image='sin', mask=None,
    ori=0.0, pos=(0, 0.2), size=(0.8, 0.4),
    color=[1,1,1], colorSpace='rgb', opacity=1.0,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-11.0)
merge_test_scale = visual.ImageStim(
    win=win,
    name='merge_test_scale', 
    image='sin', mask=None,
    ori=0.0, pos=(-0.65, 0.15), size=(0.3, 0.3),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-12.0)
merge_test_btn = visual.ImageStim(
    win=win,
    name='merge_test_btn', 
    image='materials/imgs/submit.png', mask=None,
    ori=0.0, pos=(0.5, -0.35), size=[0.24,0.1],
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-13.0)
merge_test_compare = visual.ImageStim(
    win=win,
    name='merge_test_compare', 
    image='materials/merge_sort/imgs/compare.png', mask=None,
    ori=0.0, pos=(-0.65, -0.05), size=(0.16,0.07),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-14.0)
merge_test_mouse = event.Mouse(win=win)
x, y = [None, None]
merge_test_mouse.mouseClock = core.Clock()
merge_test_timer = visual.TextStim(win=win, name='merge_test_timer',
    text=None,
    font='Open Sans',
    pos=(0.65, -0.05), height=0.03, wrapWidth=None, ori=0.0, 
    color='orange', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-16.0);

# Initialize components for Routine "SORT_INTRO"
SORT_INTROClock = core.Clock()
intro_text_3 = visual.TextStim(win=win, name='intro_text_3',
    text='BOB: CLIKKKK ... SOOO GOOooD to see you!\n\n1. You need to arrange a PILE of fruits that is most likely UNORDERED\n\n2. The PURPLE DIAMOND arranges fruits from the PILE into the SHIPPING CRATE in INCREASING weights from LEFT to RIGHT\n\nLEARN with BOB the PURPLE DIAMOND operation in steps and master it. ',
    font='Open Sans',
    pos=(0, -0.15), height=0.03, wrapWidth=1.2, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=0.0);
bob_2 = visual.ImageStim(
    win=win,
    name='bob_2', 
    image='materials/merge_sort/imgs/bob.png', mask=None,
    ori=0.0, pos=(0.25, 0.25), size=(0.2, 0.2),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-1.0)
sort_example = visual.ImageStim(
    win=win,
    name='sort_example', 
    image='materials/merge_sort/imgs/sort_train/sort_train_example.png', mask=None,
    ori=0.0, pos=(-0.3, 0.25), size=(0.7, 0.4),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-2.0)
door_4 = visual.ImageStim(
    win=win,
    name='door_4', 
    image='materials/merge_sort/imgs/door.png', mask=None,
    ori=0.0, pos=(0.45, 0.25), size=(0.15, 0.3),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-3.0)
sort_intro_btn = visual.ImageStim(
    win=win,
    name='sort_intro_btn', 
    image='materials/imgs/continue.png', mask=None,
    ori=0.0, pos=(0, -0.4), size=[0.28,0.1],
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-4.0)
sort_intro_mouse = event.Mouse(win=win)
x, y = [None, None]
sort_intro_mouse.mouseClock = core.Clock()

# Initialize components for Routine "SORT_TRAIN"
SORT_TRAINClock = core.Clock()
# Set experiment start values for variable component sort_train_compare_records
sort_train_compare_records = ''
sort_train_compare_recordsContainer = []
# Set experiment start values for variable component sort_train_compare_limit
sort_train_compare_limit = ''
sort_train_compare_limitContainer = []
# Set experiment start values for variable component sort_train_trace
sort_train_trace = ''
sort_train_traceContainer = []
# Set experiment start values for variable component sort_train_compareN
sort_train_compareN = ''
sort_train_compareNContainer = []
# Set experiment start values for variable component sort_train_labels
sort_train_labels = ''
sort_train_labelsContainer = []
# Set experiment start values for variable component sort_train_path_base
sort_train_path_base = ''
sort_train_path_baseContainer = []
# Set experiment start values for variable component sort_train_input
sort_train_input = ''
sort_train_inputContainer = []
sort_train_scale_instr = visual.TextStim(win=win, name='sort_train_scale_instr',
    text='',
    font='Open Sans',
    pos=(-0.65,0.45), height=1.0, wrapWidth=0.3, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-7.0);
sort_train_ans_instr = visual.TextStim(win=win, name='sort_train_ans_instr',
    text='Put fruits into the SHIPPING CRATE by entering their labels as  X,X,X,X, ... ,X',
    font='Open Sans',
    pos=(-0.25, -0.25), height=0.03, wrapWidth=1.6, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-8.0);
sort_train_instr = visual.TextStim(win=win, name='sort_train_instr',
    text='1. Use the scale on the left to COMPARE weights of TWO fruits by entering the alphabetic CAPITAL labels\n\n2. You are given a PILE of fruits that is most likely UNORDERED and you can move fruits freely on the MONITOR in the middle\n\n3. The PURPLE DIAMOND puts fruits from the PILE into the SHIPPING CRATE in INCREASING weights from LEFT to RIGHT\n\n4. You can see the NUMBER OF COMPARISONS BOB uses as a reference and you have 300 SECS to SUBMIT!',
    font='Open Sans',
    pos=(0.65, 0.2), height=0.02, wrapWidth=0.4, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-9.0);
sort_train_scale_right = visual.TextBox2(
     win, text=None, font='Open Sans',
     pos=(-0.55, 0.4),     letterHeight=0.03,
     size=(0.1,0.07), borderWidth=2.0,
     color='black', colorSpace='rgb',
     opacity=None,
     bold=False, italic=False,
     lineSpacing=1.0,
     padding=None,
     anchor='top-center',
     fillColor='white', borderColor=None,
     flipHoriz=False, flipVert=False,
     editable=True,
     name='sort_train_scale_right',
     autoLog=False,
)
sort_train_scale_left = visual.TextBox2(
     win, text=None, font='Open Sans',
     pos=(-0.75, 0.4),     letterHeight=0.03,
     size=(0.1, 0.07), borderWidth=2.0,
     color='black', colorSpace='rgb',
     opacity=None,
     bold=False, italic=False,
     lineSpacing=1.0,
     padding=None,
     anchor='top-center',
     fillColor='white', borderColor=None,
     flipHoriz=False, flipVert=False,
     editable=True,
     name='sort_train_scale_left',
     autoLog=False,
)
sort_train_res = visual.TextBox2(
     win, text=None, font='Open Sans',
     pos=(-0.25, -0.3),     letterHeight=0.05,
     size=(0.7,0.1), borderWidth=2.0,
     color='black', colorSpace='rgb',
     opacity=None,
     bold=False, italic=False,
     lineSpacing=1.0,
     padding=None,
     anchor='top-center',
     fillColor='white', borderColor=None,
     flipHoriz=False, flipVert=False,
     editable=True,
     name='sort_train_res',
     autoLog=False,
)
sort_train_sep = visual.ImageStim(
    win=win,
    name='sort_train_sep', 
    image='materials/merge_sort/imgs/white_BG.png', mask=None,
    ori=0.0, pos=(0, -0.15), size=(1.5,0.005),
    color=[1,1,1], colorSpace='rgb', opacity=1.0,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-13.0)
sort_train_board = visual.ImageStim(
    win=win,
    name='sort_train_board', 
    image='sin', mask=None,
    ori=0.0, pos=(0, 0.2), size=(0.8, 0.5),
    color=[1,1,1], colorSpace='rgb', opacity=1.0,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-14.0)
sort_train_scale = visual.ImageStim(
    win=win,
    name='sort_train_scale', 
    image='sin', mask=None,
    ori=0.0, pos=(-0.65, 0.15), size=(0.3, 0.3),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-15.0)
sort_train_ex_1 = visual.ImageStim(
    win=win,
    name='sort_train_ex_1', 
    image='materials/merge_sort/imgs/white_BG.png', mask=None,
    ori=0.0, pos=[0,0], size=(0.06, 0.08),
    color=[1,1,1], colorSpace='rgb', opacity=1.0,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-16.0)
sort_train_ex_2 = visual.ImageStim(
    win=win,
    name='sort_train_ex_2', 
    image='materials/merge_sort/imgs/white_BG.png', mask=None,
    ori=0.0, pos=[0,0], size=(0.06, 0.08),
    color=[1,1,1], colorSpace='rgb', opacity=1.0,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-17.0)
sort_train_ex_3 = visual.ImageStim(
    win=win,
    name='sort_train_ex_3', 
    image='materials/merge_sort/imgs/white_BG.png', mask=None,
    ori=0.0, pos=[0,0], size=(0.06, 0.08),
    color=[1,1,1], colorSpace='rgb', opacity=1.0,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-18.0)
sort_train_ex_4 = visual.ImageStim(
    win=win,
    name='sort_train_ex_4', 
    image='materials/merge_sort/imgs/white_BG.png', mask=None,
    ori=0.0, pos=[0,0], size=(0.06, 0.08),
    color=[1,1,1], colorSpace='rgb', opacity=1.0,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-19.0)
sort_train_ex_5 = visual.ImageStim(
    win=win,
    name='sort_train_ex_5', 
    image='materials/merge_sort/imgs/white_BG.png', mask=None,
    ori=0.0, pos=[0,0], size=(0.06, 0.08),
    color=[1,1,1], colorSpace='rgb', opacity=1.0,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-20.0)
sort_train_ex_6 = visual.ImageStim(
    win=win,
    name='sort_train_ex_6', 
    image='materials/merge_sort/imgs/white_BG.png', mask=None,
    ori=0.0, pos=[0,0], size=(0.06, 0.08),
    color=[1,1,1], colorSpace='rgb', opacity=1.0,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-21.0)
sort_train_ex_7 = visual.ImageStim(
    win=win,
    name='sort_train_ex_7', 
    image='materials/merge_sort/imgs/white_BG.png', mask=None,
    ori=0.0, pos=[0,0], size=(0.06,0.08),
    color=[1,1,1], colorSpace='rgb', opacity=1.0,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-22.0)
sort_train_ex_8 = visual.ImageStim(
    win=win,
    name='sort_train_ex_8', 
    image='materials/merge_sort/imgs/white_BG.png', mask=None,
    ori=0.0, pos=[0,0], size=(0.06, 0.08),
    color=[1,1,1], colorSpace='rgb', opacity=1.0,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-23.0)
sort_train_ex_9 = visual.ImageStim(
    win=win,
    name='sort_train_ex_9', 
    image='materials/merge_sort/imgs/white_BG.png', mask=None,
    ori=0.0, pos=[0,0], size=(0.06, 0.08),
    color=[1,1,1], colorSpace='rgb', opacity=1.0,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-24.0)
sort_train_ex_10 = visual.ImageStim(
    win=win,
    name='sort_train_ex_10', 
    image='materials/merge_sort/imgs/white_BG.png', mask=None,
    ori=0.0, pos=[0,0], size=(0.06, 0.08),
    color=[1,1,1], colorSpace='rgb', opacity=1.0,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-25.0)
sort_train_ex_11 = visual.ImageStim(
    win=win,
    name='sort_train_ex_11', 
    image='materials/merge_sort/imgs/white_BG.png', mask=None,
    ori=0.0, pos=[0,0], size=(0.06, 0.08),
    color=[1,1,1], colorSpace='rgb', opacity=1.0,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-26.0)
sort_train_ex_12 = visual.ImageStim(
    win=win,
    name='sort_train_ex_12', 
    image='materials/merge_sort/imgs/white_BG.png', mask=None,
    ori=0.0, pos=[0,0], size=(0.06, 0.08),
    color=[1,1,1], colorSpace='rgb', opacity=1.0,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-27.0)
sort_train_btn = visual.ImageStim(
    win=win,
    name='sort_train_btn', 
    image='materials/imgs/submit.png', mask=None,
    ori=0.0, pos=(0.5, -0.35), size=[0.24,0.1],
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-28.0)
sort_train_compare = visual.ImageStim(
    win=win,
    name='sort_train_compare', 
    image='materials/merge_sort/imgs/compare.png', mask=None,
    ori=0.0, pos=(-0.65, -0.05), size=(0.16,0.07),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-29.0)
sort_train_mouse = event.Mouse(win=win)
x, y = [None, None]
sort_train_mouse.mouseClock = core.Clock()
sort_train_timer = visual.TextStim(win=win, name='sort_train_timer',
    text=None,
    font='Open Sans',
    pos=(0.65, -0.05), height=0.03, wrapWidth=None, ori=0.0, 
    color='orange', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-31.0);
sort_train_hint = visual.TextStim(win=win, name='sort_train_hint',
    text=None,
    font='Open Sans',
    pos=(0.5, -0.22), height=0.04, wrapWidth=None, ori=0.0, 
    color='yellow', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-32.0);

# Initialize components for Routine "SORT_EXPL"
SORT_EXPLClock = core.Clock()
# Set experiment start values for variable component sort_expl_compare_records
sort_expl_compare_records = ''
sort_expl_compare_recordsContainer = []
# Set experiment start values for variable component sort_expl_trace
sort_expl_trace = ''
sort_expl_traceContainer = []
# Set experiment start values for variable component sort_expl_labels
sort_expl_labels = ''
sort_expl_labelsContainer = []
# Set experiment start values for variable component sort_expl_compareN
sort_expl_compareN = ''
sort_expl_compareNContainer = []
# Set experiment start values for variable component sort_expl_path_base
sort_expl_path_base = ''
sort_expl_path_baseContainer = []
# Set experiment start values for variable component sort_expl_input
sort_expl_input = ''
sort_expl_inputContainer = []
sort_expl_scale_instr = visual.TextStim(win=win, name='sort_expl_scale_instr',
    text='',
    font='Open Sans',
    pos=(-0.65,0.45), height=1.0, wrapWidth=0.3, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-6.0);
sort_expl_feedback_1 = visual.TextStim(win=win, name='sort_expl_feedback_1',
    text=None,
    font='Open Sans',
    pos=(-0.25, -0.18), height=0.03, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-7.0);
sort_expl_feedback_2 = visual.TextStim(win=win, name='sort_expl_feedback_2',
    text=None,
    font='Open Sans',
    pos=(-0.25, -0.25), height=0.03, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-8.0);
sort_expl_instr = visual.TextStim(win=win, name='sort_expl_instr',
    text='1. Use the scale on the left to COMPARE weights of TWO fruits by entering the alphabetic CAPITAL labels\n\n2. READ the feedback and CHECK the provided answer with yours\n\n3. You can move fruits freely on the MONITOR in the middle to understand the answer and CONTINUE if you are ready\n\nYou have 60 SECS to spare!',
    font='Open Sans',
    pos=(0.65, 0.2), height=0.025, wrapWidth=0.4, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-9.0);
sort_expl_scale_right = visual.TextBox2(
     win, text=None, font='Open Sans',
     pos=(-0.55, 0.4),     letterHeight=0.03,
     size=(0.1,0.07), borderWidth=2.0,
     color='black', colorSpace='rgb',
     opacity=None,
     bold=False, italic=False,
     lineSpacing=1.0,
     padding=None,
     anchor='top-center',
     fillColor='white', borderColor=None,
     flipHoriz=False, flipVert=False,
     editable=True,
     name='sort_expl_scale_right',
     autoLog=False,
)
sort_expl_scale_left = visual.TextBox2(
     win, text=None, font='Open Sans',
     pos=(-0.75, 0.4),     letterHeight=0.03,
     size=(0.1, 0.07), borderWidth=2.0,
     color='black', colorSpace='rgb',
     opacity=None,
     bold=False, italic=False,
     lineSpacing=1.0,
     padding=None,
     anchor='top-center',
     fillColor='white', borderColor=None,
     flipHoriz=False, flipVert=False,
     editable=True,
     name='sort_expl_scale_left',
     autoLog=False,
)
sort_expl_res = visual.TextBox2(
     win, text=None, font='Open Sans',
     pos=(-0.25, -0.3),     letterHeight=0.05,
     size=(0.7,0.1), borderWidth=2.0,
     color='black', colorSpace='rgb',
     opacity=None,
     bold=False, italic=False,
     lineSpacing=1.0,
     padding=None,
     anchor='top-center',
     fillColor='white', borderColor=None,
     flipHoriz=False, flipVert=False,
     editable=False,
     name='sort_expl_res',
     autoLog=False,
)
sort_expl_sep = visual.ImageStim(
    win=win,
    name='sort_expl_sep', 
    image='materials/merge_sort/imgs/white_BG.png', mask=None,
    ori=0.0, pos=(0, -0.15), size=(1.5,0.005),
    color=[1,1,1], colorSpace='rgb', opacity=1.0,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-13.0)
sort_expl_board = visual.ImageStim(
    win=win,
    name='sort_expl_board', 
    image='sin', mask=None,
    ori=0.0, pos=(0, 0.2), size=(0.8, 0.5),
    color=[1,1,1], colorSpace='rgb', opacity=1.0,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-14.0)
sort_expl_scale = visual.ImageStim(
    win=win,
    name='sort_expl_scale', 
    image='sin', mask=None,
    ori=0.0, pos=(-0.65, 0.15), size=(0.3, 0.3),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-15.0)
sort_expl_ex_1 = visual.ImageStim(
    win=win,
    name='sort_expl_ex_1', 
    image='materials/merge_sort/imgs/white_BG.png', mask=None,
    ori=0.0, pos=[0,0], size=(0.06, 0.08),
    color=[1,1,1], colorSpace='rgb', opacity=1.0,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-16.0)
sort_expl_ex_2 = visual.ImageStim(
    win=win,
    name='sort_expl_ex_2', 
    image='materials/merge_sort/imgs/white_BG.png', mask=None,
    ori=0.0, pos=[0,0], size=(0.06, 0.08),
    color=[1,1,1], colorSpace='rgb', opacity=1.0,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-17.0)
sort_expl_ex_3 = visual.ImageStim(
    win=win,
    name='sort_expl_ex_3', 
    image='materials/merge_sort/imgs/white_BG.png', mask=None,
    ori=0.0, pos=[0,0], size=(0.06, 0.08),
    color=[1,1,1], colorSpace='rgb', opacity=1.0,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-18.0)
sort_expl_ex_4 = visual.ImageStim(
    win=win,
    name='sort_expl_ex_4', 
    image='materials/merge_sort/imgs/white_BG.png', mask=None,
    ori=0.0, pos=[0,0], size=(0.06, 0.08),
    color=[1,1,1], colorSpace='rgb', opacity=1.0,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-19.0)
sort_expl_ex_5 = visual.ImageStim(
    win=win,
    name='sort_expl_ex_5', 
    image='materials/merge_sort/imgs/white_BG.png', mask=None,
    ori=0.0, pos=[0,0], size=(0.06, 0.08),
    color=[1,1,1], colorSpace='rgb', opacity=1.0,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-20.0)
sort_expl_ex_6 = visual.ImageStim(
    win=win,
    name='sort_expl_ex_6', 
    image='materials/merge_sort/imgs/white_BG.png', mask=None,
    ori=0.0, pos=[0,0], size=(0.06, 0.08),
    color=[1,1,1], colorSpace='rgb', opacity=1.0,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-21.0)
sort_expl_ex_7 = visual.ImageStim(
    win=win,
    name='sort_expl_ex_7', 
    image='materials/merge_sort/imgs/white_BG.png', mask=None,
    ori=0.0, pos=[0,0], size=(0.06,0.08),
    color=[1,1,1], colorSpace='rgb', opacity=1.0,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-22.0)
sort_expl_ex_8 = visual.ImageStim(
    win=win,
    name='sort_expl_ex_8', 
    image='materials/merge_sort/imgs/white_BG.png', mask=None,
    ori=0.0, pos=[0,0], size=(0.06, 0.08),
    color=[1,1,1], colorSpace='rgb', opacity=1.0,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-23.0)
sort_expl_ex_9 = visual.ImageStim(
    win=win,
    name='sort_expl_ex_9', 
    image='materials/merge_sort/imgs/white_BG.png', mask=None,
    ori=0.0, pos=[0,0], size=(0.06, 0.08),
    color=[1,1,1], colorSpace='rgb', opacity=1.0,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-24.0)
sort_expl_ex_10 = visual.ImageStim(
    win=win,
    name='sort_expl_ex_10', 
    image='materials/merge_sort/imgs/white_BG.png', mask=None,
    ori=0.0, pos=[0,0], size=(0.06, 0.08),
    color=[1,1,1], colorSpace='rgb', opacity=1.0,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-25.0)
sort_expl_ex_11 = visual.ImageStim(
    win=win,
    name='sort_expl_ex_11', 
    image='materials/merge_sort/imgs/white_BG.png', mask=None,
    ori=0.0, pos=[0,0], size=(0.06, 0.08),
    color=[1,1,1], colorSpace='rgb', opacity=1.0,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-26.0)
sort_expl_ex_12 = visual.ImageStim(
    win=win,
    name='sort_expl_ex_12', 
    image='materials/merge_sort/imgs/white_BG.png', mask=None,
    ori=0.0, pos=[0,0], size=(0.06, 0.08),
    color=[1,1,1], colorSpace='rgb', opacity=1.0,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-27.0)
sort_expl_btn = visual.ImageStim(
    win=win,
    name='sort_expl_btn', 
    image='materials/imgs/continue.png', mask=None,
    ori=0.0, pos=(0.5, -0.35), size=[0.28,0.1],
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-28.0)
sort_expl_compare = visual.ImageStim(
    win=win,
    name='sort_expl_compare', 
    image='materials/merge_sort/imgs/compare.png', mask=None,
    ori=0.0, pos=(-0.65, -0.05), size=(0.16,0.07),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-29.0)
sort_expl_mouse = event.Mouse(win=win)
x, y = [None, None]
sort_expl_mouse.mouseClock = core.Clock()
sort_expl_timer = visual.TextStim(win=win, name='sort_expl_timer',
    text=None,
    font='Open Sans',
    pos=(0.65, -0.05), height=0.03, wrapWidth=None, ori=0.0, 
    color='orange', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-31.0);
sort_expl_hint = visual.TextStim(win=win, name='sort_expl_hint',
    text=None,
    font='Open Sans',
    pos=(0.5, -0.22), height=0.04, wrapWidth=None, ori=0.0, 
    color='yellow', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-32.0);

# Initialize components for Routine "SORT_TEST_INTRO"
SORT_TEST_INTROClock = core.Clock()
intro_text_7 = visual.TextStim(win=win, name='intro_text_7',
    text='BOB: CLIKKKK ... Now is time to apply the knowledge you learned about the PURPLE DIAMOND\n\n1. You need to arrange a PILE of fruits that is most likely UNORDERED\n\n2. The PURPLE DIAMOND arranges fruits from the PILE into the SHIPPING CRATE in INCREASING weights from LEFT to RIGHT',
    font='Open Sans',
    pos=(0, -0.15), height=0.03, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=0.0);
bob_4 = visual.ImageStim(
    win=win,
    name='bob_4', 
    image='materials/merge_sort/imgs/bob.png', mask=None,
    ori=0.0, pos=(0.25, 0.25), size=(0.2, 0.2),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-1.0)
sort_example_2 = visual.ImageStim(
    win=win,
    name='sort_example_2', 
    image='materials/merge_sort/imgs/sort_train/sort_train_example.png', mask=None,
    ori=0.0, pos=(-0.3, 0.25), size=(0.7, 0.4),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-2.0)
door_7 = visual.ImageStim(
    win=win,
    name='door_7', 
    image='materials/merge_sort/imgs/door.png', mask=None,
    ori=0.0, pos=(0.45, 0.25), size=(0.15, 0.3),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-3.0)
sort_test_intro_btn = visual.ImageStim(
    win=win,
    name='sort_test_intro_btn', 
    image='materials/imgs/continue.png', mask=None,
    ori=0.0, pos=(0, -0.4), size=[0.28,0.1],
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-4.0)
sort_test_intro_mouse = event.Mouse(win=win)
x, y = [None, None]
sort_test_intro_mouse.mouseClock = core.Clock()

# Initialize components for Routine "SORT_TEST"
SORT_TESTClock = core.Clock()
# Set experiment start values for variable component sort_test_compare_records
sort_test_compare_records = ''
sort_test_compare_recordsContainer = []
# Set experiment start values for variable component sort_test_trace
sort_test_trace = ''
sort_test_traceContainer = []
# Set experiment start values for variable component sort_test_compareN
sort_test_compareN = ''
sort_test_compareNContainer = []
# Set experiment start values for variable component sort_test_labels
sort_test_labels = ''
sort_test_labelsContainer = []
# Set experiment start values for variable component sort_test_path_base
sort_test_path_base = ''
sort_test_path_baseContainer = []
# Set experiment start values for variable component sort_test_input
sort_test_input = ''
sort_test_inputContainer = []
sort_test_scale_instr = visual.TextStim(win=win, name='sort_test_scale_instr',
    text='',
    font='Open Sans',
    pos=(-0.65,0.45), height=1.0, wrapWidth=0.3, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-6.0);
sort_test_ans_instr = visual.TextStim(win=win, name='sort_test_ans_instr',
    text='Put fruits into the SHIPPING CRATE by entering their labels as  X,X,X,X, ... ,X',
    font='Open Sans',
    pos=(-0.25, -0.25), height=0.03, wrapWidth=1.6, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-7.0);
sort_test_instr = visual.TextStim(win=win, name='sort_test_instr',
    text='1. Use the scale on the left to COMPARE weights of TWO fruits by entering the alphabetic CAPITAL labels\n\n2. You are given a PILE of fruits that is most likely UNORDERED and you can move fruits freely on the MONITOR in the middle\n\n3. The PURPLE DIAMOND puts fruits from the PILE into the SHIPPING CRATE in INCREASING weights from LEFT to RIGHT\n\nYou have 300 SECS to SUBMIT!',
    font='Open Sans',
    pos=(0.65, 0.2), height=0.02, wrapWidth=0.4, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-8.0);
sort_test_scale_right = visual.TextBox2(
     win, text=None, font='Open Sans',
     pos=(-0.55, 0.4),     letterHeight=0.03,
     size=(0.1,0.07), borderWidth=2.0,
     color='black', colorSpace='rgb',
     opacity=None,
     bold=False, italic=False,
     lineSpacing=1.0,
     padding=None,
     anchor='top-center',
     fillColor='white', borderColor=None,
     flipHoriz=False, flipVert=False,
     editable=True,
     name='sort_test_scale_right',
     autoLog=False,
)
sort_test_scale_left = visual.TextBox2(
     win, text=None, font='Open Sans',
     pos=(-0.75, 0.4),     letterHeight=0.03,
     size=(0.1, 0.07), borderWidth=2.0,
     color='black', colorSpace='rgb',
     opacity=None,
     bold=False, italic=False,
     lineSpacing=1.0,
     padding=None,
     anchor='top-center',
     fillColor='white', borderColor=None,
     flipHoriz=False, flipVert=False,
     editable=True,
     name='sort_test_scale_left',
     autoLog=False,
)
sort_test_res = visual.TextBox2(
     win, text=None, font='Open Sans',
     pos=(-0.25, -0.3),     letterHeight=0.05,
     size=(0.7,0.1), borderWidth=2.0,
     color='black', colorSpace='rgb',
     opacity=None,
     bold=False, italic=False,
     lineSpacing=1.0,
     padding=None,
     anchor='top-center',
     fillColor='white', borderColor=None,
     flipHoriz=False, flipVert=False,
     editable=True,
     name='sort_test_res',
     autoLog=False,
)
sort_test_sep = visual.ImageStim(
    win=win,
    name='sort_test_sep', 
    image='materials/merge_sort/imgs/white_BG.png', mask=None,
    ori=0.0, pos=(0, -0.15), size=(1.5,0.005),
    color=[1,1,1], colorSpace='rgb', opacity=1.0,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-12.0)
sort_test_board = visual.ImageStim(
    win=win,
    name='sort_test_board', 
    image='sin', mask=None,
    ori=0.0, pos=(0, 0.2), size=(0.8, 0.5),
    color=[1,1,1], colorSpace='rgb', opacity=1.0,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-13.0)
sort_test_scale = visual.ImageStim(
    win=win,
    name='sort_test_scale', 
    image='sin', mask=None,
    ori=0.0, pos=(-0.65, 0.15), size=(0.3, 0.3),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-14.0)
sort_test_ex_1 = visual.ImageStim(
    win=win,
    name='sort_test_ex_1', 
    image='materials/merge_sort/imgs/white_BG.png', mask=None,
    ori=0.0, pos=[0,0], size=(0.06, 0.08),
    color=[1,1,1], colorSpace='rgb', opacity=1.0,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-15.0)
sort_test_ex_2 = visual.ImageStim(
    win=win,
    name='sort_test_ex_2', 
    image='materials/merge_sort/imgs/white_BG.png', mask=None,
    ori=0.0, pos=[0,0], size=(0.06, 0.08),
    color=[1,1,1], colorSpace='rgb', opacity=1.0,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-16.0)
sort_test_ex_3 = visual.ImageStim(
    win=win,
    name='sort_test_ex_3', 
    image='materials/merge_sort/imgs/white_BG.png', mask=None,
    ori=0.0, pos=[0,0], size=(0.06, 0.08),
    color=[1,1,1], colorSpace='rgb', opacity=1.0,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-17.0)
sort_test_ex_4 = visual.ImageStim(
    win=win,
    name='sort_test_ex_4', 
    image='materials/merge_sort/imgs/white_BG.png', mask=None,
    ori=0.0, pos=[0,0], size=(0.06, 0.08),
    color=[1,1,1], colorSpace='rgb', opacity=1.0,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-18.0)
sort_test_ex_5 = visual.ImageStim(
    win=win,
    name='sort_test_ex_5', 
    image='materials/merge_sort/imgs/white_BG.png', mask=None,
    ori=0.0, pos=[0,0], size=(0.06, 0.08),
    color=[1,1,1], colorSpace='rgb', opacity=1.0,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-19.0)
sort_test_ex_6 = visual.ImageStim(
    win=win,
    name='sort_test_ex_6', 
    image='materials/merge_sort/imgs/white_BG.png', mask=None,
    ori=0.0, pos=[0,0], size=(0.06, 0.08),
    color=[1,1,1], colorSpace='rgb', opacity=1.0,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-20.0)
sort_test_ex_7 = visual.ImageStim(
    win=win,
    name='sort_test_ex_7', 
    image='materials/merge_sort/imgs/white_BG.png', mask=None,
    ori=0.0, pos=[0,0], size=(0.06,0.08),
    color=[1,1,1], colorSpace='rgb', opacity=1.0,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-21.0)
sort_test_ex_8 = visual.ImageStim(
    win=win,
    name='sort_test_ex_8', 
    image='materials/merge_sort/imgs/white_BG.png', mask=None,
    ori=0.0, pos=[0,0], size=(0.06, 0.08),
    color=[1,1,1], colorSpace='rgb', opacity=1.0,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-22.0)
sort_test_ex_9 = visual.ImageStim(
    win=win,
    name='sort_test_ex_9', 
    image='materials/merge_sort/imgs/white_BG.png', mask=None,
    ori=0.0, pos=[0,0], size=(0.06, 0.08),
    color=[1,1,1], colorSpace='rgb', opacity=1.0,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-23.0)
sort_test_ex_10 = visual.ImageStim(
    win=win,
    name='sort_test_ex_10', 
    image='materials/merge_sort/imgs/white_BG.png', mask=None,
    ori=0.0, pos=[0,0], size=(0.06, 0.08),
    color=[1,1,1], colorSpace='rgb', opacity=1.0,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-24.0)
sort_test_ex_11 = visual.ImageStim(
    win=win,
    name='sort_test_ex_11', 
    image='materials/merge_sort/imgs/white_BG.png', mask=None,
    ori=0.0, pos=[0,0], size=(0.06, 0.08),
    color=[1,1,1], colorSpace='rgb', opacity=1.0,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-25.0)
sort_test_ex_12 = visual.ImageStim(
    win=win,
    name='sort_test_ex_12', 
    image='materials/merge_sort/imgs/white_BG.png', mask=None,
    ori=0.0, pos=[0,0], size=(0.06, 0.08),
    color=[1,1,1], colorSpace='rgb', opacity=1.0,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-26.0)
sort_test_btn = visual.ImageStim(
    win=win,
    name='sort_test_btn', 
    image='materials/imgs/submit.png', mask=None,
    ori=0.0, pos=(0.5, -0.35), size=[0.24,0.1],
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-27.0)
sort_test_compare = visual.ImageStim(
    win=win,
    name='sort_test_compare', 
    image='materials/merge_sort/imgs/compare.png', mask=None,
    ori=0.0, pos=(-0.65, -0.05), size=(0.16,0.07),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-28.0)
sort_test_mouse = event.Mouse(win=win)
x, y = [None, None]
sort_test_mouse.mouseClock = core.Clock()
sort_test_timer = visual.TextStim(win=win, name='sort_test_timer',
    text=None,
    font='Open Sans',
    pos=(0.65, -0.05), height=0.03, wrapWidth=None, ori=0.0, 
    color='orange', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-30.0);

# Initialize components for Routine "REVIEW_QUESTIONS"
REVIEW_QUESTIONSClock = core.Clock()
review_question = visual.TextStim(win=win, name='review_question',
    text=None,
    font='Open Sans',
    pos=[0,0], height=0.03, wrapWidth=0.7, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=0.0);
review_img_1 = visual.ImageStim(
    win=win,
    name='review_img_1', 
    image='sin', mask=None,
    ori=0.0, pos=[0,0], size=(0.7, 0.35),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-1.0)
review_img_2 = visual.ImageStim(
    win=win,
    name='review_img_2', 
    image='sin', mask=None,
    ori=0.0, pos=[0,0], size=(0.7, 0.35),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-2.0)
review_btn = visual.ImageStim(
    win=win,
    name='review_btn', 
    image='materials/imgs/continue.png', mask=None,
    ori=0.0, pos=(0.4, -0.4), size=[0.28,0.1],
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-3.0)
review_res = visual.TextBox2(
     win, text=None, font='Open Sans',
     pos=(-0.45, -0.35),     letterHeight=0.03,
     size=(0.7,0.2), borderWidth=2.0,
     color='black', colorSpace='rgb',
     opacity=None,
     bold=False, italic=False,
     lineSpacing=1.0,
     padding=None,
     anchor='center',
     fillColor='white', borderColor=None,
     flipHoriz=False, flipVert=False,
     editable=True,
     name='review_res',
     autoLog=False,
)
review_mouse = event.Mouse(win=win)
x, y = [None, None]
review_mouse.mouseClock = core.Clock()
review_timer = visual.TextStim(win=win, name='review_timer',
    text=None,
    font='Open Sans',
    pos=(-0.45, -0.2), height=0.03, wrapWidth=0.7, ori=0.0, 
    color='orange', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-6.0);

# Initialize components for Routine "EXP_CHECK"
EXP_CHECKClock = core.Clock()
exp_check_question = visual.TextStim(win=win, name='exp_check_question',
    text='Please let us know If you have received training or have studied any SORTING algorithms before the experiment, \n\nand write in the box below which one(s) you KNOW and HAVE USED for the experiment:',
    font='Open Sans',
    pos=(0, 0.3), height=0.03, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=0.0);
exp_check_res = visual.TextBox2(
     win, text=None, font='Open Sans',
     pos=(0, -0.15),     letterHeight=0.05,
     size=(0.7, 0.15), borderWidth=2.0,
     color='black', colorSpace='rgb',
     opacity=None,
     bold=False, italic=False,
     lineSpacing=1.0,
     padding=None,
     anchor='center',
     fillColor='white', borderColor=None,
     flipHoriz=False, flipVert=False,
     editable=True,
     name='exp_check_res',
     autoLog=False,
)
exp_check_btn = visual.ImageStim(
    win=win,
    name='exp_check_btn', 
    image='materials/imgs/submit.png', mask=None,
    ori=0.0, pos=(0, -0.35), size=[0.24,0.1],
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-2.0)
exp_check_mouse = event.Mouse(win=win)
x, y = [None, None]
exp_check_mouse.mouseClock = core.Clock()
exp_check_slider = visual.Slider(win=win, name='exp_check_slider',
    startValue=None, size=(0.6, 0.1), pos=(0, 0.1), units=None,
    labels=("HAD training", "", "", "NO training"), ticks=(1, 2, 3, 4), granularity=4.0,
    style='slider', styleTweaks=(), opacity=None,
    color='white', fillColor='black', borderColor='White', colorSpace='rgb',
    font='Open Sans', labelHeight=0.03,
    flip=False, depth=-4, readOnly=False)

# Initialize components for Routine "DEBRIEF"
DEBRIEFClock = core.Clock()
intro_text_5 = visual.TextStim(win=win, name='intro_text_5',
    text='This is the end of the experiment!\n\nThank you very much for your time and effort!\n\nClick anywhere to exit!',
    font='Open Sans',
    pos=(0, 0), height=0.03, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=0.0);
debrief_mouse = event.Mouse(win=win)
x, y = [None, None]
debrief_mouse.mouseClock = core.Clock()

# Create some handy timers
globalClock = core.Clock()  # to track the time since experiment started
routineTimer = core.CountdownTimer()  # to track time remaining of each (non-slip) routine 

# ------Prepare to start Routine "BACKGROUND"-------
continueRoutine = True
routineTimer.add(120.000000)
# update component parameters for each repeat
demographic_gender = 0  # Set routine start values for demographic_gender
demographic_education = 0  # Set routine start values for demographic_education
demographic_age = 0  # Set routine start values for demographic_age
background_instr.setText('Please select most the fitting choice for each of the following questions')
gender.setText('What is your gender?')
age.setText('What is your age?')
education.setText('What is the highest degree or level of school you have completed?')
# setup some python lists for storing info about the background_mouse
gotValidClick = False  # until a click is received
age_selected = None
education_selected = None
gender_selected = None
    
gender_groups = [female, male, other_gender, prefer_not_to_say]
age_groups = [_18_24, _25_34, _35_44, _45_54, _55_64, _65]
education_groups = [less_than_high_school, high_school_equivalent, college, bachelor, graduate, doctorate, other]
# keep track of which components have finished
BACKGROUNDComponents = [background_instr, gender, prefer_not_to_say, other_gender, female, male, age, _18_24, _25_34, _35_44, _45_54, _55_64, _65, education, less_than_high_school, high_school_equivalent, college, bachelor, graduate, doctorate, other, background_btn, background_mouse]
for thisComponent in BACKGROUNDComponents:
    thisComponent.tStart = None
    thisComponent.tStop = None
    thisComponent.tStartRefresh = None
    thisComponent.tStopRefresh = None
    if hasattr(thisComponent, 'status'):
        thisComponent.status = NOT_STARTED
# reset timers
t = 0
_timeToFirstFrame = win.getFutureFlipTime(clock="now")
BACKGROUNDClock.reset(-_timeToFirstFrame)  # t0 is time of first possible flip
frameN = -1

# -------Run Routine "BACKGROUND"-------
while continueRoutine and routineTimer.getTime() > 0:
    # get current time
    t = BACKGROUNDClock.getTime()
    tThisFlip = win.getFutureFlipTime(clock=BACKGROUNDClock)
    tThisFlipGlobal = win.getFutureFlipTime(clock=None)
    frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
    # update/draw components on each frame
    
    # *background_instr* updates
    if background_instr.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        background_instr.frameNStart = frameN  # exact frame index
        background_instr.tStart = t  # local t and not account for scr refresh
        background_instr.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(background_instr, 'tStartRefresh')  # time at next scr refresh
        background_instr.setAutoDraw(True)
    if background_instr.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > background_instr.tStartRefresh + 120.0-frameTolerance:
            # keep track of stop time/frame for later
            background_instr.tStop = t  # not accounting for scr refresh
            background_instr.frameNStop = frameN  # exact frame index
            win.timeOnFlip(background_instr, 'tStopRefresh')  # time at next scr refresh
            background_instr.setAutoDraw(False)
    
    # *gender* updates
    if gender.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        gender.frameNStart = frameN  # exact frame index
        gender.tStart = t  # local t and not account for scr refresh
        gender.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(gender, 'tStartRefresh')  # time at next scr refresh
        gender.setAutoDraw(True)
    if gender.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > gender.tStartRefresh + 120.0-frameTolerance:
            # keep track of stop time/frame for later
            gender.tStop = t  # not accounting for scr refresh
            gender.frameNStop = frameN  # exact frame index
            win.timeOnFlip(gender, 'tStopRefresh')  # time at next scr refresh
            gender.setAutoDraw(False)
    
    # *prefer_not_to_say* updates
    if prefer_not_to_say.status == NOT_STARTED and tThisFlip >= 1.0-frameTolerance:
        # keep track of start time/frame for later
        prefer_not_to_say.frameNStart = frameN  # exact frame index
        prefer_not_to_say.tStart = t  # local t and not account for scr refresh
        prefer_not_to_say.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(prefer_not_to_say, 'tStartRefresh')  # time at next scr refresh
        prefer_not_to_say.setAutoDraw(True)
    if prefer_not_to_say.status == STARTED:
        # is it time to stop? (based on local clock)
        if tThisFlip > 120.0-frameTolerance:
            # keep track of stop time/frame for later
            prefer_not_to_say.tStop = t  # not accounting for scr refresh
            prefer_not_to_say.frameNStop = frameN  # exact frame index
            win.timeOnFlip(prefer_not_to_say, 'tStopRefresh')  # time at next scr refresh
            prefer_not_to_say.setAutoDraw(False)
    
    # *other_gender* updates
    if other_gender.status == NOT_STARTED and tThisFlip >= 1.0-frameTolerance:
        # keep track of start time/frame for later
        other_gender.frameNStart = frameN  # exact frame index
        other_gender.tStart = t  # local t and not account for scr refresh
        other_gender.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(other_gender, 'tStartRefresh')  # time at next scr refresh
        other_gender.setAutoDraw(True)
    if other_gender.status == STARTED:
        # is it time to stop? (based on local clock)
        if tThisFlip > 120.0-frameTolerance:
            # keep track of stop time/frame for later
            other_gender.tStop = t  # not accounting for scr refresh
            other_gender.frameNStop = frameN  # exact frame index
            win.timeOnFlip(other_gender, 'tStopRefresh')  # time at next scr refresh
            other_gender.setAutoDraw(False)
    
    # *female* updates
    if female.status == NOT_STARTED and tThisFlip >= 1.0-frameTolerance:
        # keep track of start time/frame for later
        female.frameNStart = frameN  # exact frame index
        female.tStart = t  # local t and not account for scr refresh
        female.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(female, 'tStartRefresh')  # time at next scr refresh
        female.setAutoDraw(True)
    if female.status == STARTED:
        # is it time to stop? (based on local clock)
        if tThisFlip > 120.0-frameTolerance:
            # keep track of stop time/frame for later
            female.tStop = t  # not accounting for scr refresh
            female.frameNStop = frameN  # exact frame index
            win.timeOnFlip(female, 'tStopRefresh')  # time at next scr refresh
            female.setAutoDraw(False)
    
    # *male* updates
    if male.status == NOT_STARTED and tThisFlip >= 1.0-frameTolerance:
        # keep track of start time/frame for later
        male.frameNStart = frameN  # exact frame index
        male.tStart = t  # local t and not account for scr refresh
        male.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(male, 'tStartRefresh')  # time at next scr refresh
        male.setAutoDraw(True)
    if male.status == STARTED:
        # is it time to stop? (based on local clock)
        if tThisFlip > 120.0-frameTolerance:
            # keep track of stop time/frame for later
            male.tStop = t  # not accounting for scr refresh
            male.frameNStop = frameN  # exact frame index
            win.timeOnFlip(male, 'tStopRefresh')  # time at next scr refresh
            male.setAutoDraw(False)
    
    # *age* updates
    if age.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        age.frameNStart = frameN  # exact frame index
        age.tStart = t  # local t and not account for scr refresh
        age.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(age, 'tStartRefresh')  # time at next scr refresh
        age.setAutoDraw(True)
    if age.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > age.tStartRefresh + 120.0-frameTolerance:
            # keep track of stop time/frame for later
            age.tStop = t  # not accounting for scr refresh
            age.frameNStop = frameN  # exact frame index
            win.timeOnFlip(age, 'tStopRefresh')  # time at next scr refresh
            age.setAutoDraw(False)
    
    # *_18_24* updates
    if _18_24.status == NOT_STARTED and tThisFlip >= 1.0-frameTolerance:
        # keep track of start time/frame for later
        _18_24.frameNStart = frameN  # exact frame index
        _18_24.tStart = t  # local t and not account for scr refresh
        _18_24.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(_18_24, 'tStartRefresh')  # time at next scr refresh
        _18_24.setAutoDraw(True)
    if _18_24.status == STARTED:
        # is it time to stop? (based on local clock)
        if tThisFlip > 120.0-frameTolerance:
            # keep track of stop time/frame for later
            _18_24.tStop = t  # not accounting for scr refresh
            _18_24.frameNStop = frameN  # exact frame index
            win.timeOnFlip(_18_24, 'tStopRefresh')  # time at next scr refresh
            _18_24.setAutoDraw(False)
    
    # *_25_34* updates
    if _25_34.status == NOT_STARTED and tThisFlip >= 1.0-frameTolerance:
        # keep track of start time/frame for later
        _25_34.frameNStart = frameN  # exact frame index
        _25_34.tStart = t  # local t and not account for scr refresh
        _25_34.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(_25_34, 'tStartRefresh')  # time at next scr refresh
        _25_34.setAutoDraw(True)
    if _25_34.status == STARTED:
        # is it time to stop? (based on local clock)
        if tThisFlip > 120.0-frameTolerance:
            # keep track of stop time/frame for later
            _25_34.tStop = t  # not accounting for scr refresh
            _25_34.frameNStop = frameN  # exact frame index
            win.timeOnFlip(_25_34, 'tStopRefresh')  # time at next scr refresh
            _25_34.setAutoDraw(False)
    
    # *_35_44* updates
    if _35_44.status == NOT_STARTED and tThisFlip >= 1.0-frameTolerance:
        # keep track of start time/frame for later
        _35_44.frameNStart = frameN  # exact frame index
        _35_44.tStart = t  # local t and not account for scr refresh
        _35_44.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(_35_44, 'tStartRefresh')  # time at next scr refresh
        _35_44.setAutoDraw(True)
    if _35_44.status == STARTED:
        # is it time to stop? (based on local clock)
        if tThisFlip > 120.0-frameTolerance:
            # keep track of stop time/frame for later
            _35_44.tStop = t  # not accounting for scr refresh
            _35_44.frameNStop = frameN  # exact frame index
            win.timeOnFlip(_35_44, 'tStopRefresh')  # time at next scr refresh
            _35_44.setAutoDraw(False)
    
    # *_45_54* updates
    if _45_54.status == NOT_STARTED and tThisFlip >= 1.0-frameTolerance:
        # keep track of start time/frame for later
        _45_54.frameNStart = frameN  # exact frame index
        _45_54.tStart = t  # local t and not account for scr refresh
        _45_54.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(_45_54, 'tStartRefresh')  # time at next scr refresh
        _45_54.setAutoDraw(True)
    if _45_54.status == STARTED:
        # is it time to stop? (based on local clock)
        if tThisFlip > 120.0-frameTolerance:
            # keep track of stop time/frame for later
            _45_54.tStop = t  # not accounting for scr refresh
            _45_54.frameNStop = frameN  # exact frame index
            win.timeOnFlip(_45_54, 'tStopRefresh')  # time at next scr refresh
            _45_54.setAutoDraw(False)
    
    # *_55_64* updates
    if _55_64.status == NOT_STARTED and tThisFlip >= 1.0-frameTolerance:
        # keep track of start time/frame for later
        _55_64.frameNStart = frameN  # exact frame index
        _55_64.tStart = t  # local t and not account for scr refresh
        _55_64.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(_55_64, 'tStartRefresh')  # time at next scr refresh
        _55_64.setAutoDraw(True)
    if _55_64.status == STARTED:
        # is it time to stop? (based on local clock)
        if tThisFlip > 120.0-frameTolerance:
            # keep track of stop time/frame for later
            _55_64.tStop = t  # not accounting for scr refresh
            _55_64.frameNStop = frameN  # exact frame index
            win.timeOnFlip(_55_64, 'tStopRefresh')  # time at next scr refresh
            _55_64.setAutoDraw(False)
    
    # *_65* updates
    if _65.status == NOT_STARTED and tThisFlip >= 1.0-frameTolerance:
        # keep track of start time/frame for later
        _65.frameNStart = frameN  # exact frame index
        _65.tStart = t  # local t and not account for scr refresh
        _65.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(_65, 'tStartRefresh')  # time at next scr refresh
        _65.setAutoDraw(True)
    if _65.status == STARTED:
        # is it time to stop? (based on local clock)
        if tThisFlip > 120.0-frameTolerance:
            # keep track of stop time/frame for later
            _65.tStop = t  # not accounting for scr refresh
            _65.frameNStop = frameN  # exact frame index
            win.timeOnFlip(_65, 'tStopRefresh')  # time at next scr refresh
            _65.setAutoDraw(False)
    
    # *education* updates
    if education.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        education.frameNStart = frameN  # exact frame index
        education.tStart = t  # local t and not account for scr refresh
        education.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(education, 'tStartRefresh')  # time at next scr refresh
        education.setAutoDraw(True)
    if education.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > education.tStartRefresh + 120.0-frameTolerance:
            # keep track of stop time/frame for later
            education.tStop = t  # not accounting for scr refresh
            education.frameNStop = frameN  # exact frame index
            win.timeOnFlip(education, 'tStopRefresh')  # time at next scr refresh
            education.setAutoDraw(False)
    
    # *less_than_high_school* updates
    if less_than_high_school.status == NOT_STARTED and tThisFlip >= 1.0-frameTolerance:
        # keep track of start time/frame for later
        less_than_high_school.frameNStart = frameN  # exact frame index
        less_than_high_school.tStart = t  # local t and not account for scr refresh
        less_than_high_school.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(less_than_high_school, 'tStartRefresh')  # time at next scr refresh
        less_than_high_school.setAutoDraw(True)
    if less_than_high_school.status == STARTED:
        # is it time to stop? (based on local clock)
        if tThisFlip > 120.0-frameTolerance:
            # keep track of stop time/frame for later
            less_than_high_school.tStop = t  # not accounting for scr refresh
            less_than_high_school.frameNStop = frameN  # exact frame index
            win.timeOnFlip(less_than_high_school, 'tStopRefresh')  # time at next scr refresh
            less_than_high_school.setAutoDraw(False)
    
    # *high_school_equivalent* updates
    if high_school_equivalent.status == NOT_STARTED and tThisFlip >= 1.0-frameTolerance:
        # keep track of start time/frame for later
        high_school_equivalent.frameNStart = frameN  # exact frame index
        high_school_equivalent.tStart = t  # local t and not account for scr refresh
        high_school_equivalent.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(high_school_equivalent, 'tStartRefresh')  # time at next scr refresh
        high_school_equivalent.setAutoDraw(True)
    if high_school_equivalent.status == STARTED:
        # is it time to stop? (based on local clock)
        if tThisFlip > 120.0-frameTolerance:
            # keep track of stop time/frame for later
            high_school_equivalent.tStop = t  # not accounting for scr refresh
            high_school_equivalent.frameNStop = frameN  # exact frame index
            win.timeOnFlip(high_school_equivalent, 'tStopRefresh')  # time at next scr refresh
            high_school_equivalent.setAutoDraw(False)
    
    # *college* updates
    if college.status == NOT_STARTED and tThisFlip >= 1.0-frameTolerance:
        # keep track of start time/frame for later
        college.frameNStart = frameN  # exact frame index
        college.tStart = t  # local t and not account for scr refresh
        college.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(college, 'tStartRefresh')  # time at next scr refresh
        college.setAutoDraw(True)
    if college.status == STARTED:
        # is it time to stop? (based on local clock)
        if tThisFlip > 120.0-frameTolerance:
            # keep track of stop time/frame for later
            college.tStop = t  # not accounting for scr refresh
            college.frameNStop = frameN  # exact frame index
            win.timeOnFlip(college, 'tStopRefresh')  # time at next scr refresh
            college.setAutoDraw(False)
    
    # *bachelor* updates
    if bachelor.status == NOT_STARTED and tThisFlip >= 1.0-frameTolerance:
        # keep track of start time/frame for later
        bachelor.frameNStart = frameN  # exact frame index
        bachelor.tStart = t  # local t and not account for scr refresh
        bachelor.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(bachelor, 'tStartRefresh')  # time at next scr refresh
        bachelor.setAutoDraw(True)
    if bachelor.status == STARTED:
        # is it time to stop? (based on local clock)
        if tThisFlip > 120.0-frameTolerance:
            # keep track of stop time/frame for later
            bachelor.tStop = t  # not accounting for scr refresh
            bachelor.frameNStop = frameN  # exact frame index
            win.timeOnFlip(bachelor, 'tStopRefresh')  # time at next scr refresh
            bachelor.setAutoDraw(False)
    
    # *graduate* updates
    if graduate.status == NOT_STARTED and tThisFlip >= 1.0-frameTolerance:
        # keep track of start time/frame for later
        graduate.frameNStart = frameN  # exact frame index
        graduate.tStart = t  # local t and not account for scr refresh
        graduate.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(graduate, 'tStartRefresh')  # time at next scr refresh
        graduate.setAutoDraw(True)
    if graduate.status == STARTED:
        # is it time to stop? (based on local clock)
        if tThisFlip > 120.0-frameTolerance:
            # keep track of stop time/frame for later
            graduate.tStop = t  # not accounting for scr refresh
            graduate.frameNStop = frameN  # exact frame index
            win.timeOnFlip(graduate, 'tStopRefresh')  # time at next scr refresh
            graduate.setAutoDraw(False)
    
    # *doctorate* updates
    if doctorate.status == NOT_STARTED and tThisFlip >= 1.0-frameTolerance:
        # keep track of start time/frame for later
        doctorate.frameNStart = frameN  # exact frame index
        doctorate.tStart = t  # local t and not account for scr refresh
        doctorate.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(doctorate, 'tStartRefresh')  # time at next scr refresh
        doctorate.setAutoDraw(True)
    if doctorate.status == STARTED:
        # is it time to stop? (based on local clock)
        if tThisFlip > 120.0-frameTolerance:
            # keep track of stop time/frame for later
            doctorate.tStop = t  # not accounting for scr refresh
            doctorate.frameNStop = frameN  # exact frame index
            win.timeOnFlip(doctorate, 'tStopRefresh')  # time at next scr refresh
            doctorate.setAutoDraw(False)
    
    # *other* updates
    if other.status == NOT_STARTED and tThisFlip >= 1.0-frameTolerance:
        # keep track of start time/frame for later
        other.frameNStart = frameN  # exact frame index
        other.tStart = t  # local t and not account for scr refresh
        other.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(other, 'tStartRefresh')  # time at next scr refresh
        other.setAutoDraw(True)
    if other.status == STARTED:
        # is it time to stop? (based on local clock)
        if tThisFlip > 120.0-frameTolerance:
            # keep track of stop time/frame for later
            other.tStop = t  # not accounting for scr refresh
            other.frameNStop = frameN  # exact frame index
            win.timeOnFlip(other, 'tStopRefresh')  # time at next scr refresh
            other.setAutoDraw(False)
    
    # *background_btn* updates
    if background_btn.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
        # keep track of start time/frame for later
        background_btn.frameNStart = frameN  # exact frame index
        background_btn.tStart = t  # local t and not account for scr refresh
        background_btn.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(background_btn, 'tStartRefresh')  # time at next scr refresh
        background_btn.setAutoDraw(True)
    if background_btn.status == STARTED:
        # is it time to stop? (based on local clock)
        if tThisFlip > 120.0-frameTolerance:
            # keep track of stop time/frame for later
            background_btn.tStop = t  # not accounting for scr refresh
            background_btn.frameNStop = frameN  # exact frame index
            win.timeOnFlip(background_btn, 'tStopRefresh')  # time at next scr refresh
            background_btn.setAutoDraw(False)
    gender_selected = checkBGSelection(background_mouse,gender_groups,gender_selected)
    age_selected = checkBGSelection(background_mouse,age_groups,age_selected)
    education_selected = checkBGSelection(background_mouse,education_groups,education_selected)
    
    if age_selected != None :
        demographic_age = age_selected.name
    if education_selected != None:
        demographic_education = education_selected.name
    if gender_selected != None:
        demographic_gender = gender_selected.name
    
    if age_selected != None and education_selected != None and gender_selected != None and background_btn.image != "materials/imgs/submit.png":
        background_btn.image = "materials/imgs/submit.png"
        
    if intro_mouse.isPressedIn(background_btn) and age_selected != None and education_selected != None and gender_selected != None and background_btn.status == STARTED:
        continueRoutine = False
    
    # check for quit (typically the Esc key)
    if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
        core.quit()
    
    # check if all components have finished
    if not continueRoutine:  # a component has requested a forced-end of Routine
        break
    continueRoutine = False  # will revert to True if at least one component still running
    for thisComponent in BACKGROUNDComponents:
        if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
            continueRoutine = True
            break  # at least one component has not yet finished
    
    # refresh the screen
    if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
        win.flip()

# -------Ending Routine "BACKGROUND"-------
for thisComponent in BACKGROUNDComponents:
    if hasattr(thisComponent, "setAutoDraw"):
        thisComponent.setAutoDraw(False)
thisExp.addData('demographic_gender.routineEndVal', demographic_gender)  # Save end routine value
thisExp.addData('demographic_education.routineEndVal', demographic_education)  # Save end routine value
thisExp.addData('demographic_age.routineEndVal', demographic_age)  # Save end routine value
# store data for thisExp (ExperimentHandler)
x, y = background_mouse.getPos()
buttons = background_mouse.getPressed()
thisExp.addData('background_mouse.x', x)
thisExp.addData('background_mouse.y', y)
thisExp.addData('background_mouse.leftButton', buttons[0])
thisExp.addData('background_mouse.midButton', buttons[1])
thisExp.addData('background_mouse.rightButton', buttons[2])
thisExp.nextEntry()
pass

# ------Prepare to start Routine "INTRO"-------
continueRoutine = True
routineTimer.add(120.000000)
# update component parameters for each repeat
# setup some python lists for storing info about the intro_mouse
gotValidClick = False  # until a click is received
# keep track of which components have finished
INTROComponents = [intro_text, alice, bob, door_1, door_2, intro_btn, intro_mouse]
for thisComponent in INTROComponents:
    thisComponent.tStart = None
    thisComponent.tStop = None
    thisComponent.tStartRefresh = None
    thisComponent.tStopRefresh = None
    if hasattr(thisComponent, 'status'):
        thisComponent.status = NOT_STARTED
# reset timers
t = 0
_timeToFirstFrame = win.getFutureFlipTime(clock="now")
INTROClock.reset(-_timeToFirstFrame)  # t0 is time of first possible flip
frameN = -1

# -------Run Routine "INTRO"-------
while continueRoutine and routineTimer.getTime() > 0:
    # get current time
    t = INTROClock.getTime()
    tThisFlip = win.getFutureFlipTime(clock=INTROClock)
    tThisFlipGlobal = win.getFutureFlipTime(clock=None)
    frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
    # update/draw components on each frame
    
    # *intro_text* updates
    if intro_text.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        intro_text.frameNStart = frameN  # exact frame index
        intro_text.tStart = t  # local t and not account for scr refresh
        intro_text.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(intro_text, 'tStartRefresh')  # time at next scr refresh
        intro_text.setAutoDraw(True)
    if intro_text.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > intro_text.tStartRefresh + 120.0-frameTolerance:
            # keep track of stop time/frame for later
            intro_text.tStop = t  # not accounting for scr refresh
            intro_text.frameNStop = frameN  # exact frame index
            win.timeOnFlip(intro_text, 'tStopRefresh')  # time at next scr refresh
            intro_text.setAutoDraw(False)
    
    # *alice* updates
    if alice.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        alice.frameNStart = frameN  # exact frame index
        alice.tStart = t  # local t and not account for scr refresh
        alice.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(alice, 'tStartRefresh')  # time at next scr refresh
        alice.setAutoDraw(True)
    if alice.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > alice.tStartRefresh + 120.0-frameTolerance:
            # keep track of stop time/frame for later
            alice.tStop = t  # not accounting for scr refresh
            alice.frameNStop = frameN  # exact frame index
            win.timeOnFlip(alice, 'tStopRefresh')  # time at next scr refresh
            alice.setAutoDraw(False)
    
    # *bob* updates
    if bob.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        bob.frameNStart = frameN  # exact frame index
        bob.tStart = t  # local t and not account for scr refresh
        bob.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(bob, 'tStartRefresh')  # time at next scr refresh
        bob.setAutoDraw(True)
    if bob.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > bob.tStartRefresh + 120.0-frameTolerance:
            # keep track of stop time/frame for later
            bob.tStop = t  # not accounting for scr refresh
            bob.frameNStop = frameN  # exact frame index
            win.timeOnFlip(bob, 'tStopRefresh')  # time at next scr refresh
            bob.setAutoDraw(False)
    
    # *door_1* updates
    if door_1.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        door_1.frameNStart = frameN  # exact frame index
        door_1.tStart = t  # local t and not account for scr refresh
        door_1.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(door_1, 'tStartRefresh')  # time at next scr refresh
        door_1.setAutoDraw(True)
    if door_1.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > door_1.tStartRefresh + 120.0-frameTolerance:
            # keep track of stop time/frame for later
            door_1.tStop = t  # not accounting for scr refresh
            door_1.frameNStop = frameN  # exact frame index
            win.timeOnFlip(door_1, 'tStopRefresh')  # time at next scr refresh
            door_1.setAutoDraw(False)
    
    # *door_2* updates
    if door_2.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        door_2.frameNStart = frameN  # exact frame index
        door_2.tStart = t  # local t and not account for scr refresh
        door_2.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(door_2, 'tStartRefresh')  # time at next scr refresh
        door_2.setAutoDraw(True)
    if door_2.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > door_2.tStartRefresh + 120.0-frameTolerance:
            # keep track of stop time/frame for later
            door_2.tStop = t  # not accounting for scr refresh
            door_2.frameNStop = frameN  # exact frame index
            win.timeOnFlip(door_2, 'tStopRefresh')  # time at next scr refresh
            door_2.setAutoDraw(False)
    
    # *intro_btn* updates
    if intro_btn.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
        # keep track of start time/frame for later
        intro_btn.frameNStart = frameN  # exact frame index
        intro_btn.tStart = t  # local t and not account for scr refresh
        intro_btn.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(intro_btn, 'tStartRefresh')  # time at next scr refresh
        intro_btn.setAutoDraw(True)
    if intro_btn.status == STARTED:
        # is it time to stop? (based on local clock)
        if tThisFlip > 120.0-frameTolerance:
            # keep track of stop time/frame for later
            intro_btn.tStop = t  # not accounting for scr refresh
            intro_btn.frameNStop = frameN  # exact frame index
            win.timeOnFlip(intro_btn, 'tStopRefresh')  # time at next scr refresh
            intro_btn.setAutoDraw(False)
    if t >= 0.5 and intro_mouse.status == PsychoJS.Status.NOT_STARTED:
          intro_mouse.tStart = t
          intro_mouse.frameNStart = frameN
          
          intro_mouse.status = PsychoJS.Status.STARTED
          intro_mouse.mouseClock.reset()
    
    if intro_mouse.isPressedIn(intro_btn) and intro_mouse.status == PsychoJS.Status.STARTED and intro_btn.status == STARTED:
        continueRoutine = False
    
    # check for quit (typically the Esc key)
    if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
        core.quit()
    
    # check if all components have finished
    if not continueRoutine:  # a component has requested a forced-end of Routine
        break
    continueRoutine = False  # will revert to True if at least one component still running
    for thisComponent in INTROComponents:
        if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
            continueRoutine = True
            break  # at least one component has not yet finished
    
    # refresh the screen
    if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
        win.flip()

# -------Ending Routine "INTRO"-------
for thisComponent in INTROComponents:
    if hasattr(thisComponent, "setAutoDraw"):
        thisComponent.setAutoDraw(False)
# store data for thisExp (ExperimentHandler)
x, y = intro_mouse.getPos()
buttons = intro_mouse.getPressed()
thisExp.addData('intro_mouse.x', x)
thisExp.addData('intro_mouse.y', y)
thisExp.addData('intro_mouse.leftButton', buttons[0])
thisExp.addData('intro_mouse.midButton', buttons[1])
thisExp.addData('intro_mouse.rightButton', buttons[2])
thisExp.nextEntry()

# ------Prepare to start Routine "HINT"-------
continueRoutine = True
routineTimer.add(120.000000)
# update component parameters for each repeat
# setup some python lists for storing info about the hint_mouse
gotValidClick = False  # until a click is received
# keep track of which components have finished
HINTComponents = [intro_text_8, arrow, alice_5, bob_5, door_8, door_9, hint_btn, hint_mouse]
for thisComponent in HINTComponents:
    thisComponent.tStart = None
    thisComponent.tStop = None
    thisComponent.tStartRefresh = None
    thisComponent.tStopRefresh = None
    if hasattr(thisComponent, 'status'):
        thisComponent.status = NOT_STARTED
# reset timers
t = 0
_timeToFirstFrame = win.getFutureFlipTime(clock="now")
HINTClock.reset(-_timeToFirstFrame)  # t0 is time of first possible flip
frameN = -1

# -------Run Routine "HINT"-------
while continueRoutine and routineTimer.getTime() > 0:
    # get current time
    t = HINTClock.getTime()
    tThisFlip = win.getFutureFlipTime(clock=HINTClock)
    tThisFlipGlobal = win.getFutureFlipTime(clock=None)
    frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
    # update/draw components on each frame
    
    # *intro_text_8* updates
    if intro_text_8.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        intro_text_8.frameNStart = frameN  # exact frame index
        intro_text_8.tStart = t  # local t and not account for scr refresh
        intro_text_8.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(intro_text_8, 'tStartRefresh')  # time at next scr refresh
        intro_text_8.setAutoDraw(True)
    if intro_text_8.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > intro_text_8.tStartRefresh + 120.0-frameTolerance:
            # keep track of stop time/frame for later
            intro_text_8.tStop = t  # not accounting for scr refresh
            intro_text_8.frameNStop = frameN  # exact frame index
            win.timeOnFlip(intro_text_8, 'tStopRefresh')  # time at next scr refresh
            intro_text_8.setAutoDraw(False)
    
    # *arrow* updates
    if arrow.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        arrow.frameNStart = frameN  # exact frame index
        arrow.tStart = t  # local t and not account for scr refresh
        arrow.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(arrow, 'tStartRefresh')  # time at next scr refresh
        arrow.setAutoDraw(True)
    if arrow.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > arrow.tStartRefresh + 120.0-frameTolerance:
            # keep track of stop time/frame for later
            arrow.tStop = t  # not accounting for scr refresh
            arrow.frameNStop = frameN  # exact frame index
            win.timeOnFlip(arrow, 'tStopRefresh')  # time at next scr refresh
            arrow.setAutoDraw(False)
    
    # *alice_5* updates
    if alice_5.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        alice_5.frameNStart = frameN  # exact frame index
        alice_5.tStart = t  # local t and not account for scr refresh
        alice_5.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(alice_5, 'tStartRefresh')  # time at next scr refresh
        alice_5.setAutoDraw(True)
    if alice_5.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > alice_5.tStartRefresh + 120.0-frameTolerance:
            # keep track of stop time/frame for later
            alice_5.tStop = t  # not accounting for scr refresh
            alice_5.frameNStop = frameN  # exact frame index
            win.timeOnFlip(alice_5, 'tStopRefresh')  # time at next scr refresh
            alice_5.setAutoDraw(False)
    
    # *bob_5* updates
    if bob_5.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        bob_5.frameNStart = frameN  # exact frame index
        bob_5.tStart = t  # local t and not account for scr refresh
        bob_5.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(bob_5, 'tStartRefresh')  # time at next scr refresh
        bob_5.setAutoDraw(True)
    if bob_5.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > bob_5.tStartRefresh + 120.0-frameTolerance:
            # keep track of stop time/frame for later
            bob_5.tStop = t  # not accounting for scr refresh
            bob_5.frameNStop = frameN  # exact frame index
            win.timeOnFlip(bob_5, 'tStopRefresh')  # time at next scr refresh
            bob_5.setAutoDraw(False)
    
    # *door_8* updates
    if door_8.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        door_8.frameNStart = frameN  # exact frame index
        door_8.tStart = t  # local t and not account for scr refresh
        door_8.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(door_8, 'tStartRefresh')  # time at next scr refresh
        door_8.setAutoDraw(True)
    if door_8.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > door_8.tStartRefresh + 120.0-frameTolerance:
            # keep track of stop time/frame for later
            door_8.tStop = t  # not accounting for scr refresh
            door_8.frameNStop = frameN  # exact frame index
            win.timeOnFlip(door_8, 'tStopRefresh')  # time at next scr refresh
            door_8.setAutoDraw(False)
    
    # *door_9* updates
    if door_9.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        door_9.frameNStart = frameN  # exact frame index
        door_9.tStart = t  # local t and not account for scr refresh
        door_9.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(door_9, 'tStartRefresh')  # time at next scr refresh
        door_9.setAutoDraw(True)
    if door_9.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > door_9.tStartRefresh + 120.0-frameTolerance:
            # keep track of stop time/frame for later
            door_9.tStop = t  # not accounting for scr refresh
            door_9.frameNStop = frameN  # exact frame index
            win.timeOnFlip(door_9, 'tStopRefresh')  # time at next scr refresh
            door_9.setAutoDraw(False)
    
    # *hint_btn* updates
    if hint_btn.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
        # keep track of start time/frame for later
        hint_btn.frameNStart = frameN  # exact frame index
        hint_btn.tStart = t  # local t and not account for scr refresh
        hint_btn.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(hint_btn, 'tStartRefresh')  # time at next scr refresh
        hint_btn.setAutoDraw(True)
    if hint_btn.status == STARTED:
        # is it time to stop? (based on local clock)
        if tThisFlip > 120.0-frameTolerance:
            # keep track of stop time/frame for later
            hint_btn.tStop = t  # not accounting for scr refresh
            hint_btn.frameNStop = frameN  # exact frame index
            win.timeOnFlip(hint_btn, 'tStopRefresh')  # time at next scr refresh
            hint_btn.setAutoDraw(False)
    if t >= 0.5 and hint_mouse.status == PsychoJS.Status.NOT_STARTED:
          hint_mouse.tStart = t
          hint_mouse.frameNStart = frameN
          
          hint_mouse.status = PsychoJS.Status.STARTED
          hint_mouse.mouseClock.reset()
    
    if hint_mouse.isPressedIn(intro_btn) and hint_mouse.status == PsychoJS.Status.STARTED and hint_btn.status == STARTED:
        continueRoutine = False
    
    # check for quit (typically the Esc key)
    if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
        core.quit()
    
    # check if all components have finished
    if not continueRoutine:  # a component has requested a forced-end of Routine
        break
    continueRoutine = False  # will revert to True if at least one component still running
    for thisComponent in HINTComponents:
        if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
            continueRoutine = True
            break  # at least one component has not yet finished
    
    # refresh the screen
    if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
        win.flip()

# -------Ending Routine "HINT"-------
for thisComponent in HINTComponents:
    if hasattr(thisComponent, "setAutoDraw"):
        thisComponent.setAutoDraw(False)
# store data for thisExp (ExperimentHandler)
x, y = hint_mouse.getPos()
buttons = hint_mouse.getPressed()
thisExp.addData('hint_mouse.x', x)
thisExp.addData('hint_mouse.y', y)
thisExp.addData('hint_mouse.leftButton', buttons[0])
thisExp.addData('hint_mouse.midButton', buttons[1])
thisExp.addData('hint_mouse.rightButton', buttons[2])
thisExp.nextEntry()
pass

# ------Prepare to start Routine "MERGE_INTRO"-------
continueRoutine = True
routineTimer.add(120.000000)
# update component parameters for each repeat
# setup some python lists for storing info about the merge_intro_mouse
gotValidClick = False  # until a click is received
# keep track of which components have finished
MERGE_INTROComponents = [intro_text_2, alice_2, merge_example, door_3, merge_intro_btn, merge_intro_mouse]
for thisComponent in MERGE_INTROComponents:
    thisComponent.tStart = None
    thisComponent.tStop = None
    thisComponent.tStartRefresh = None
    thisComponent.tStopRefresh = None
    if hasattr(thisComponent, 'status'):
        thisComponent.status = NOT_STARTED
# reset timers
t = 0
_timeToFirstFrame = win.getFutureFlipTime(clock="now")
MERGE_INTROClock.reset(-_timeToFirstFrame)  # t0 is time of first possible flip
frameN = -1

# -------Run Routine "MERGE_INTRO"-------
while continueRoutine and routineTimer.getTime() > 0:
    # get current time
    t = MERGE_INTROClock.getTime()
    tThisFlip = win.getFutureFlipTime(clock=MERGE_INTROClock)
    tThisFlipGlobal = win.getFutureFlipTime(clock=None)
    frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
    # update/draw components on each frame
    
    # *intro_text_2* updates
    if intro_text_2.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        intro_text_2.frameNStart = frameN  # exact frame index
        intro_text_2.tStart = t  # local t and not account for scr refresh
        intro_text_2.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(intro_text_2, 'tStartRefresh')  # time at next scr refresh
        intro_text_2.setAutoDraw(True)
    if intro_text_2.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > intro_text_2.tStartRefresh + 120.0-frameTolerance:
            # keep track of stop time/frame for later
            intro_text_2.tStop = t  # not accounting for scr refresh
            intro_text_2.frameNStop = frameN  # exact frame index
            win.timeOnFlip(intro_text_2, 'tStopRefresh')  # time at next scr refresh
            intro_text_2.setAutoDraw(False)
    
    # *alice_2* updates
    if alice_2.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        alice_2.frameNStart = frameN  # exact frame index
        alice_2.tStart = t  # local t and not account for scr refresh
        alice_2.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(alice_2, 'tStartRefresh')  # time at next scr refresh
        alice_2.setAutoDraw(True)
    if alice_2.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > alice_2.tStartRefresh + 120.0-frameTolerance:
            # keep track of stop time/frame for later
            alice_2.tStop = t  # not accounting for scr refresh
            alice_2.frameNStop = frameN  # exact frame index
            win.timeOnFlip(alice_2, 'tStopRefresh')  # time at next scr refresh
            alice_2.setAutoDraw(False)
    
    # *merge_example* updates
    if merge_example.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        merge_example.frameNStart = frameN  # exact frame index
        merge_example.tStart = t  # local t and not account for scr refresh
        merge_example.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(merge_example, 'tStartRefresh')  # time at next scr refresh
        merge_example.setAutoDraw(True)
    if merge_example.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > merge_example.tStartRefresh + 120.0-frameTolerance:
            # keep track of stop time/frame for later
            merge_example.tStop = t  # not accounting for scr refresh
            merge_example.frameNStop = frameN  # exact frame index
            win.timeOnFlip(merge_example, 'tStopRefresh')  # time at next scr refresh
            merge_example.setAutoDraw(False)
    
    # *door_3* updates
    if door_3.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        door_3.frameNStart = frameN  # exact frame index
        door_3.tStart = t  # local t and not account for scr refresh
        door_3.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(door_3, 'tStartRefresh')  # time at next scr refresh
        door_3.setAutoDraw(True)
    if door_3.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > door_3.tStartRefresh + 120.0-frameTolerance:
            # keep track of stop time/frame for later
            door_3.tStop = t  # not accounting for scr refresh
            door_3.frameNStop = frameN  # exact frame index
            win.timeOnFlip(door_3, 'tStopRefresh')  # time at next scr refresh
            door_3.setAutoDraw(False)
    
    # *merge_intro_btn* updates
    if merge_intro_btn.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
        # keep track of start time/frame for later
        merge_intro_btn.frameNStart = frameN  # exact frame index
        merge_intro_btn.tStart = t  # local t and not account for scr refresh
        merge_intro_btn.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(merge_intro_btn, 'tStartRefresh')  # time at next scr refresh
        merge_intro_btn.setAutoDraw(True)
    if merge_intro_btn.status == STARTED:
        # is it time to stop? (based on local clock)
        if tThisFlip > 120.0-frameTolerance:
            # keep track of stop time/frame for later
            merge_intro_btn.tStop = t  # not accounting for scr refresh
            merge_intro_btn.frameNStop = frameN  # exact frame index
            win.timeOnFlip(merge_intro_btn, 'tStopRefresh')  # time at next scr refresh
            merge_intro_btn.setAutoDraw(False)
    if t >= 0.5 and merge_intro_mouse.status == PsychoJS.Status.NOT_STARTED:
          merge_intro_mouse.tStart = t
          merge_intro_mouse.frameNStart = frameN
          
          merge_intro_mouse.status = PsychoJS.Status.STARTED
          merge_intro_mouse.mouseClock.reset()
    
    if merge_intro_mouse.isPressedIn(merge_intro_btn) and merge_intro_mouse.status == PsychoJS.Status.STARTED and merge_intro_btn.status == STARTED:
        continueRoutine = False
    
    # check for quit (typically the Esc key)
    if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
        core.quit()
    
    # check if all components have finished
    if not continueRoutine:  # a component has requested a forced-end of Routine
        break
    continueRoutine = False  # will revert to True if at least one component still running
    for thisComponent in MERGE_INTROComponents:
        if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
            continueRoutine = True
            break  # at least one component has not yet finished
    
    # refresh the screen
    if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
        win.flip()

# -------Ending Routine "MERGE_INTRO"-------
for thisComponent in MERGE_INTROComponents:
    if hasattr(thisComponent, "setAutoDraw"):
        thisComponent.setAutoDraw(False)
# store data for thisExp (ExperimentHandler)
x, y = merge_intro_mouse.getPos()
buttons = merge_intro_mouse.getPressed()
thisExp.addData('merge_intro_mouse.x', x)
thisExp.addData('merge_intro_mouse.y', y)
thisExp.addData('merge_intro_mouse.leftButton', buttons[0])
thisExp.addData('merge_intro_mouse.midButton', buttons[1])
thisExp.addData('merge_intro_mouse.rightButton', buttons[2])
thisExp.nextEntry()
pass

# set up handler to look after randomisation of conditions etc
TRAIN_1 = data.TrialHandler(nReps=1.0, method='sequential', 
    extraInfo=expInfo, originPath=-1,
    trialList=data.importConditions('materials/merge_train_cond.csv'),
    seed=None, name='TRAIN_1')
thisExp.addLoop(TRAIN_1)  # add the loop to the experiment
thisTRAIN_1 = TRAIN_1.trialList[0]  # so we can initialise stimuli with some values
# abbreviate parameter names if possible (e.g. rgb = thisTRAIN_1.rgb)
if thisTRAIN_1 != None:
    for paramName in thisTRAIN_1:
        exec('{} = thisTRAIN_1[paramName]'.format(paramName))

for thisTRAIN_1 in TRAIN_1:
    currentLoop = TRAIN_1
    # abbreviate parameter names if possible (e.g. rgb = thisTRAIN_1.rgb)
    if thisTRAIN_1 != None:
        for paramName in thisTRAIN_1:
            exec('{} = thisTRAIN_1[paramName]'.format(paramName))
    
    # ------Prepare to start Routine "MERGE_TRAIN"-------
    continueRoutine = True
    routineTimer.add(90.000000)
    # update component parameters for each repeat
    merge_train_compare_records = []  # Set routine start values for merge_train_compare_records
    mc_order = []  # Set routine start values for mc_order
    merge_train_labels = encryption  # Set routine start values for merge_train_labels
    thisExp.addData('merge_train_labels.routineStartVal', merge_train_labels)  # Save exp start value
    merge_train_compareN = 0  # Set routine start values for merge_train_compareN
    merge_train_mc_path_2 = mc_path_2  # Set routine start values for merge_train_mc_path_2
    merge_train_mc_path_1 = mc_path_1  # Set routine start values for merge_train_mc_path_1
    merge_train_input = input  # Set routine start values for merge_train_input
    merge_train_scale_instr.setColor('white', colorSpace='rgb')
    merge_train_scale_instr.setText('COMPARE weights by typing fruit labels in both LHS and RHS textboxes')
    merge_train_scale_instr.setHeight(0.02)
    merge_train_scale_right.reset()
    merge_train_scale_right.setText('')
    merge_train_scale_left.reset()
    merge_train_scale_left.setText('')
    merge_train.setImage(img_path)
    merge_train_scale.setImage(scaleEqPath)
    # setup some python lists for storing info about the merge_train_mouse
    merge_train_mouse.clicked_name = []
    gotValidClick = False  # until a click is received
    merge_train_timer.setText('')
    merge_train_input = input
    mc_order = [] 
    merge_train_labels = encryption
    merge_train_compareN = 0
    merge_train_mc_path_2 = mc_path_2
    merge_train_mc_path_1 = mc_path_1
    # keep track of which components have finished
    MERGE_TRAINComponents = [merge_train_scale_instr, merge_ans_instr, merge_train_instr, merge_train_scale_right, merge_train_scale_left, merge_train_sep, merge_train, merge_train_mc_1, merge_train_mc_2, merge_train_scale, merge_train_btn_1, merge_train_btn_2, merge_train_compare, merge_train_mouse, merge_train_timer]
    for thisComponent in MERGE_TRAINComponents:
        thisComponent.tStart = None
        thisComponent.tStop = None
        thisComponent.tStartRefresh = None
        thisComponent.tStopRefresh = None
        if hasattr(thisComponent, 'status'):
            thisComponent.status = NOT_STARTED
    # reset timers
    t = 0
    _timeToFirstFrame = win.getFutureFlipTime(clock="now")
    MERGE_TRAINClock.reset(-_timeToFirstFrame)  # t0 is time of first possible flip
    frameN = -1
    
    # -------Run Routine "MERGE_TRAIN"-------
    while continueRoutine and routineTimer.getTime() > 0:
        # get current time
        t = MERGE_TRAINClock.getTime()
        tThisFlip = win.getFutureFlipTime(clock=MERGE_TRAINClock)
        tThisFlipGlobal = win.getFutureFlipTime(clock=None)
        frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
        # update/draw components on each frame
        
        # *merge_train_scale_instr* updates
        if merge_train_scale_instr.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            merge_train_scale_instr.frameNStart = frameN  # exact frame index
            merge_train_scale_instr.tStart = t  # local t and not account for scr refresh
            merge_train_scale_instr.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(merge_train_scale_instr, 'tStartRefresh')  # time at next scr refresh
            merge_train_scale_instr.setAutoDraw(True)
        if merge_train_scale_instr.status == STARTED:
            # is it time to stop? (based on global clock, using actual start)
            if tThisFlipGlobal > merge_train_scale_instr.tStartRefresh + 90.0-frameTolerance:
                # keep track of stop time/frame for later
                merge_train_scale_instr.tStop = t  # not accounting for scr refresh
                merge_train_scale_instr.frameNStop = frameN  # exact frame index
                win.timeOnFlip(merge_train_scale_instr, 'tStopRefresh')  # time at next scr refresh
                merge_train_scale_instr.setAutoDraw(False)
        
        # *merge_ans_instr* updates
        if merge_ans_instr.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            merge_ans_instr.frameNStart = frameN  # exact frame index
            merge_ans_instr.tStart = t  # local t and not account for scr refresh
            merge_ans_instr.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(merge_ans_instr, 'tStartRefresh')  # time at next scr refresh
            merge_ans_instr.setAutoDraw(True)
        if merge_ans_instr.status == STARTED:
            # is it time to stop? (based on global clock, using actual start)
            if tThisFlipGlobal > merge_ans_instr.tStartRefresh + 90.0-frameTolerance:
                # keep track of stop time/frame for later
                merge_ans_instr.tStop = t  # not accounting for scr refresh
                merge_ans_instr.frameNStop = frameN  # exact frame index
                win.timeOnFlip(merge_ans_instr, 'tStopRefresh')  # time at next scr refresh
                merge_ans_instr.setAutoDraw(False)
        
        # *merge_train_instr* updates
        if merge_train_instr.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            merge_train_instr.frameNStart = frameN  # exact frame index
            merge_train_instr.tStart = t  # local t and not account for scr refresh
            merge_train_instr.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(merge_train_instr, 'tStartRefresh')  # time at next scr refresh
            merge_train_instr.setAutoDraw(True)
        if merge_train_instr.status == STARTED:
            # is it time to stop? (based on global clock, using actual start)
            if tThisFlipGlobal > merge_train_instr.tStartRefresh + 90.0-frameTolerance:
                # keep track of stop time/frame for later
                merge_train_instr.tStop = t  # not accounting for scr refresh
                merge_train_instr.frameNStop = frameN  # exact frame index
                win.timeOnFlip(merge_train_instr, 'tStopRefresh')  # time at next scr refresh
                merge_train_instr.setAutoDraw(False)
        
        # *merge_train_scale_right* updates
        if merge_train_scale_right.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            merge_train_scale_right.frameNStart = frameN  # exact frame index
            merge_train_scale_right.tStart = t  # local t and not account for scr refresh
            merge_train_scale_right.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(merge_train_scale_right, 'tStartRefresh')  # time at next scr refresh
            merge_train_scale_right.setAutoDraw(True)
        if merge_train_scale_right.status == STARTED:
            # is it time to stop? (based on local clock)
            if tThisFlip > 90.0-frameTolerance:
                # keep track of stop time/frame for later
                merge_train_scale_right.tStop = t  # not accounting for scr refresh
                merge_train_scale_right.frameNStop = frameN  # exact frame index
                win.timeOnFlip(merge_train_scale_right, 'tStopRefresh')  # time at next scr refresh
                merge_train_scale_right.setAutoDraw(False)
        
        # *merge_train_scale_left* updates
        if merge_train_scale_left.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            merge_train_scale_left.frameNStart = frameN  # exact frame index
            merge_train_scale_left.tStart = t  # local t and not account for scr refresh
            merge_train_scale_left.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(merge_train_scale_left, 'tStartRefresh')  # time at next scr refresh
            merge_train_scale_left.setAutoDraw(True)
        if merge_train_scale_left.status == STARTED:
            # is it time to stop? (based on local clock)
            if tThisFlip > 90.0-frameTolerance:
                # keep track of stop time/frame for later
                merge_train_scale_left.tStop = t  # not accounting for scr refresh
                merge_train_scale_left.frameNStop = frameN  # exact frame index
                win.timeOnFlip(merge_train_scale_left, 'tStopRefresh')  # time at next scr refresh
                merge_train_scale_left.setAutoDraw(False)
        
        # *merge_train_sep* updates
        if merge_train_sep.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            merge_train_sep.frameNStart = frameN  # exact frame index
            merge_train_sep.tStart = t  # local t and not account for scr refresh
            merge_train_sep.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(merge_train_sep, 'tStartRefresh')  # time at next scr refresh
            merge_train_sep.setAutoDraw(True)
        if merge_train_sep.status == STARTED:
            # is it time to stop? (based on global clock, using actual start)
            if tThisFlipGlobal > merge_train_sep.tStartRefresh + 90.0-frameTolerance:
                # keep track of stop time/frame for later
                merge_train_sep.tStop = t  # not accounting for scr refresh
                merge_train_sep.frameNStop = frameN  # exact frame index
                win.timeOnFlip(merge_train_sep, 'tStopRefresh')  # time at next scr refresh
                merge_train_sep.setAutoDraw(False)
        
        # *merge_train* updates
        if merge_train.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
            # keep track of start time/frame for later
            merge_train.frameNStart = frameN  # exact frame index
            merge_train.tStart = t  # local t and not account for scr refresh
            merge_train.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(merge_train, 'tStartRefresh')  # time at next scr refresh
            merge_train.setAutoDraw(True)
        if merge_train.status == STARTED:
            # is it time to stop? (based on local clock)
            if tThisFlip > 90.0-frameTolerance:
                # keep track of stop time/frame for later
                merge_train.tStop = t  # not accounting for scr refresh
                merge_train.frameNStop = frameN  # exact frame index
                win.timeOnFlip(merge_train, 'tStopRefresh')  # time at next scr refresh
                merge_train.setAutoDraw(False)
        
        # *merge_train_mc_1* updates
        if merge_train_mc_1.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            merge_train_mc_1.frameNStart = frameN  # exact frame index
            merge_train_mc_1.tStart = t  # local t and not account for scr refresh
            merge_train_mc_1.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(merge_train_mc_1, 'tStartRefresh')  # time at next scr refresh
            merge_train_mc_1.setAutoDraw(True)
        if merge_train_mc_1.status == STARTED:
            # is it time to stop? (based on global clock, using actual start)
            if tThisFlipGlobal > merge_train_mc_1.tStartRefresh + 90.0-frameTolerance:
                # keep track of stop time/frame for later
                merge_train_mc_1.tStop = t  # not accounting for scr refresh
                merge_train_mc_1.frameNStop = frameN  # exact frame index
                win.timeOnFlip(merge_train_mc_1, 'tStopRefresh')  # time at next scr refresh
                merge_train_mc_1.setAutoDraw(False)
        
        # *merge_train_mc_2* updates
        if merge_train_mc_2.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            merge_train_mc_2.frameNStart = frameN  # exact frame index
            merge_train_mc_2.tStart = t  # local t and not account for scr refresh
            merge_train_mc_2.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(merge_train_mc_2, 'tStartRefresh')  # time at next scr refresh
            merge_train_mc_2.setAutoDraw(True)
        if merge_train_mc_2.status == STARTED:
            # is it time to stop? (based on global clock, using actual start)
            if tThisFlipGlobal > merge_train_mc_2.tStartRefresh + 90.0-frameTolerance:
                # keep track of stop time/frame for later
                merge_train_mc_2.tStop = t  # not accounting for scr refresh
                merge_train_mc_2.frameNStop = frameN  # exact frame index
                win.timeOnFlip(merge_train_mc_2, 'tStopRefresh')  # time at next scr refresh
                merge_train_mc_2.setAutoDraw(False)
        
        # *merge_train_scale* updates
        if merge_train_scale.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            merge_train_scale.frameNStart = frameN  # exact frame index
            merge_train_scale.tStart = t  # local t and not account for scr refresh
            merge_train_scale.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(merge_train_scale, 'tStartRefresh')  # time at next scr refresh
            merge_train_scale.setAutoDraw(True)
        if merge_train_scale.status == STARTED:
            # is it time to stop? (based on global clock, using actual start)
            if tThisFlipGlobal > merge_train_scale.tStartRefresh + 90.0-frameTolerance:
                # keep track of stop time/frame for later
                merge_train_scale.tStop = t  # not accounting for scr refresh
                merge_train_scale.frameNStop = frameN  # exact frame index
                win.timeOnFlip(merge_train_scale, 'tStopRefresh')  # time at next scr refresh
                merge_train_scale.setAutoDraw(False)
        
        # *merge_train_btn_1* updates
        if merge_train_btn_1.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
            # keep track of start time/frame for later
            merge_train_btn_1.frameNStart = frameN  # exact frame index
            merge_train_btn_1.tStart = t  # local t and not account for scr refresh
            merge_train_btn_1.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(merge_train_btn_1, 'tStartRefresh')  # time at next scr refresh
            merge_train_btn_1.setAutoDraw(True)
        if merge_train_btn_1.status == STARTED:
            # is it time to stop? (based on local clock)
            if tThisFlip > 90.0-frameTolerance:
                # keep track of stop time/frame for later
                merge_train_btn_1.tStop = t  # not accounting for scr refresh
                merge_train_btn_1.frameNStop = frameN  # exact frame index
                win.timeOnFlip(merge_train_btn_1, 'tStopRefresh')  # time at next scr refresh
                merge_train_btn_1.setAutoDraw(False)
        
        # *merge_train_btn_2* updates
        if merge_train_btn_2.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
            # keep track of start time/frame for later
            merge_train_btn_2.frameNStart = frameN  # exact frame index
            merge_train_btn_2.tStart = t  # local t and not account for scr refresh
            merge_train_btn_2.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(merge_train_btn_2, 'tStartRefresh')  # time at next scr refresh
            merge_train_btn_2.setAutoDraw(True)
        if merge_train_btn_2.status == STARTED:
            # is it time to stop? (based on local clock)
            if tThisFlip > 90.0-frameTolerance:
                # keep track of stop time/frame for later
                merge_train_btn_2.tStop = t  # not accounting for scr refresh
                merge_train_btn_2.frameNStop = frameN  # exact frame index
                win.timeOnFlip(merge_train_btn_2, 'tStopRefresh')  # time at next scr refresh
                merge_train_btn_2.setAutoDraw(False)
        
        # *merge_train_compare* updates
        if merge_train_compare.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
            # keep track of start time/frame for later
            merge_train_compare.frameNStart = frameN  # exact frame index
            merge_train_compare.tStart = t  # local t and not account for scr refresh
            merge_train_compare.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(merge_train_compare, 'tStartRefresh')  # time at next scr refresh
            merge_train_compare.setAutoDraw(True)
        if merge_train_compare.status == STARTED:
            # is it time to stop? (based on local clock)
            if tThisFlip > 90.0-frameTolerance:
                # keep track of stop time/frame for later
                merge_train_compare.tStop = t  # not accounting for scr refresh
                merge_train_compare.frameNStop = frameN  # exact frame index
                win.timeOnFlip(merge_train_compare, 'tStopRefresh')  # time at next scr refresh
                merge_train_compare.setAutoDraw(False)
        
        # *merge_train_timer* updates
        if merge_train_timer.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            merge_train_timer.frameNStart = frameN  # exact frame index
            merge_train_timer.tStart = t  # local t and not account for scr refresh
            merge_train_timer.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(merge_train_timer, 'tStartRefresh')  # time at next scr refresh
            merge_train_timer.setAutoDraw(True)
        if merge_train_timer.status == STARTED:
            # is it time to stop? (based on local clock)
            if tThisFlip > 90.0-frameTolerance:
                # keep track of stop time/frame for later
                merge_train_timer.tStop = t  # not accounting for scr refresh
                merge_train_timer.frameNStop = frameN  # exact frame index
                win.timeOnFlip(merge_train_timer, 'tStopRefresh')  # time at next scr refresh
                merge_train_timer.setAutoDraw(False)
        if mc_order == []:
            mc_order = getCorrectMCOrder(TRAIN_1.thisTrialN,merge_train_mc_path_1,merge_train_mc_path_2,merge_train_mc_1,merge_train_mc_2)
        
        if merge_train_mouse.isPressedIn(merge_train_compare) and merge_train_compare.status == STARTED:
            merge_train_compareN = merge_train_compareN + compare(merge_train_scale,merge_train_input,merge_train_labels,merge_train_scale_instr,merge_train_scale_left,merge_train_scale_right)
        
        merge_train_timer.text = timerWarning(mergeTrainTimeL,t) 
        
        if merge_train_mouse.isPressedIn(merge_train_btn_1) and merge_train_btn_1.status == STARTED:
            #merge_train_mouse.clicked_name.append(merge_train_btn_1.name)
            continueRoutine = False
        if merge_train_mouse.isPressedIn(merge_train_btn_2) and merge_train_btn_2.status == STARTED:
            #merge_train_mouse.clicked_name.append(merge_train_btn_2.name)
            continueRoutine = False
        
        # check for quit (typically the Esc key)
        if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
            core.quit()
        
        # check if all components have finished
        if not continueRoutine:  # a component has requested a forced-end of Routine
            break
        continueRoutine = False  # will revert to True if at least one component still running
        for thisComponent in MERGE_TRAINComponents:
            if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                continueRoutine = True
                break  # at least one component has not yet finished
        
        # refresh the screen
        if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
            win.flip()
    
    # -------Ending Routine "MERGE_TRAIN"-------
    for thisComponent in MERGE_TRAINComponents:
        if hasattr(thisComponent, "setAutoDraw"):
            thisComponent.setAutoDraw(False)
    thisExp.addData('merge_train_compare_records.routineEndVal', merge_train_compare_records)  # Save end routine value
    thisExp.addData('mc_order.routineEndVal', mc_order)  # Save end routine value
    thisExp.addData('merge_train_compareN.routineEndVal', merge_train_compareN)  # Save end routine value
    thisExp.addData('merge_train_mc_path_2.routineEndVal', merge_train_mc_path_2)  # Save end routine value
    thisExp.addData('merge_train_mc_path_1.routineEndVal', merge_train_mc_path_1)  # Save end routine value
    thisExp.addData('merge_train_input.routineEndVal', merge_train_input)  # Save end routine value
    TRAIN_1.addData('merge_train_scale_right.text',merge_train_scale_right.text)
    TRAIN_1.addData('merge_train_scale_left.text',merge_train_scale_left.text)
    TRAIN_1.addData('merge_train.started', merge_train.tStartRefresh)
    TRAIN_1.addData('merge_train.stopped', merge_train.tStopRefresh)
    # store data for TRAIN_1 (TrialHandler)
    x, y = merge_train_mouse.getPos()
    buttons = merge_train_mouse.getPressed()
    if sum(buttons):
        # check if the mouse was inside our 'clickable' objects
        gotValidClick = False
        try:
            iter([merge_train_compare,merge_train_btn_1,merge_train_btn_2])
            clickableList = [merge_train_compare,merge_train_btn_1,merge_train_btn_2]
        except:
            clickableList = [[merge_train_compare,merge_train_btn_1,merge_train_btn_2]]
        for obj in clickableList:
            if obj.contains(merge_train_mouse):
                gotValidClick = True
                merge_train_mouse.clicked_name.append(obj.name)
    TRAIN_1.addData('merge_train_mouse.x', x)
    TRAIN_1.addData('merge_train_mouse.y', y)
    TRAIN_1.addData('merge_train_mouse.leftButton', buttons[0])
    TRAIN_1.addData('merge_train_mouse.midButton', buttons[1])
    TRAIN_1.addData('merge_train_mouse.rightButton', buttons[2])
    if len(merge_train_mouse.clicked_name):
        TRAIN_1.addData('merge_train_mouse.clicked_name', merge_train_mouse.clicked_name[0])
    pass
    
    # ------Prepare to start Routine "MERGE_EXPL"-------
    continueRoutine = True
    routineTimer.add(60.000000)
    # update component parameters for each repeat
    merge_expl_initial_state.setColor('white', colorSpace='rgb')
    merge_expl_initial_state.setText('Initial state')
    merge_expl_feedback.setColor('white', colorSpace='rgb')
    merge_expl_feedback.setText('')
    merge_expl_ex.setImage(img_path)
    merge_expl_1.setImage('materials/merge_sort/imgs/white_BG.png')
    merge_expl_2.setImage('materials/merge_sort/imgs/white_BG.png')
    # setup some python lists for storing info about the merge_expl_mouse
    gotValidClick = False  # until a click is received
    merge_expl_timer.setColor('white', colorSpace='rgb')
    merge_expl_timer.setText('Read the feedback and continue whenever you are ready (60 SECS)')
    submitted = 2
    if "merge_train_btn_1" in merge_train_mouse.clicked_name:
        submitted = 0
    elif "merge_train_btn_2" in merge_train_mouse.clicked_name:
        submitted= 1
    showMergeExpl(submitted,merge_expl_feedback_1,merge_expl_feedback_2,merge_expl_mc_1,merge_expl_mc_2,merge_train_mc_path_1,merge_train_mc_path_2,merge_expl_1,merge_expl_2)
    # keep track of which components have finished
    MERGE_EXPLComponents = [merge_expl_initial_state, merge_expl_feedback, merge_expl_feedback_1, merge_expl_feedback_2, merge_expl_ex, merge_expl_sep, merge_expl_1, merge_expl_2, merge_expl_mc_1, merge_expl_mc_2, merge_expl_btn, merge_expl_mouse, merge_expl_timer]
    for thisComponent in MERGE_EXPLComponents:
        thisComponent.tStart = None
        thisComponent.tStop = None
        thisComponent.tStartRefresh = None
        thisComponent.tStopRefresh = None
        if hasattr(thisComponent, 'status'):
            thisComponent.status = NOT_STARTED
    # reset timers
    t = 0
    _timeToFirstFrame = win.getFutureFlipTime(clock="now")
    MERGE_EXPLClock.reset(-_timeToFirstFrame)  # t0 is time of first possible flip
    frameN = -1
    
    # -------Run Routine "MERGE_EXPL"-------
    while continueRoutine and routineTimer.getTime() > 0:
        # get current time
        t = MERGE_EXPLClock.getTime()
        tThisFlip = win.getFutureFlipTime(clock=MERGE_EXPLClock)
        tThisFlipGlobal = win.getFutureFlipTime(clock=None)
        frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
        # update/draw components on each frame
        
        # *merge_expl_initial_state* updates
        if merge_expl_initial_state.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            merge_expl_initial_state.frameNStart = frameN  # exact frame index
            merge_expl_initial_state.tStart = t  # local t and not account for scr refresh
            merge_expl_initial_state.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(merge_expl_initial_state, 'tStartRefresh')  # time at next scr refresh
            merge_expl_initial_state.setAutoDraw(True)
        if merge_expl_initial_state.status == STARTED:
            # is it time to stop? (based on global clock, using actual start)
            if tThisFlipGlobal > merge_expl_initial_state.tStartRefresh + 60.0-frameTolerance:
                # keep track of stop time/frame for later
                merge_expl_initial_state.tStop = t  # not accounting for scr refresh
                merge_expl_initial_state.frameNStop = frameN  # exact frame index
                win.timeOnFlip(merge_expl_initial_state, 'tStopRefresh')  # time at next scr refresh
                merge_expl_initial_state.setAutoDraw(False)
        
        # *merge_expl_feedback* updates
        if merge_expl_feedback.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            merge_expl_feedback.frameNStart = frameN  # exact frame index
            merge_expl_feedback.tStart = t  # local t and not account for scr refresh
            merge_expl_feedback.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(merge_expl_feedback, 'tStartRefresh')  # time at next scr refresh
            merge_expl_feedback.setAutoDraw(True)
        if merge_expl_feedback.status == STARTED:
            # is it time to stop? (based on global clock, using actual start)
            if tThisFlipGlobal > merge_expl_feedback.tStartRefresh + 60.0-frameTolerance:
                # keep track of stop time/frame for later
                merge_expl_feedback.tStop = t  # not accounting for scr refresh
                merge_expl_feedback.frameNStop = frameN  # exact frame index
                win.timeOnFlip(merge_expl_feedback, 'tStopRefresh')  # time at next scr refresh
                merge_expl_feedback.setAutoDraw(False)
        
        # *merge_expl_feedback_1* updates
        if merge_expl_feedback_1.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
            # keep track of start time/frame for later
            merge_expl_feedback_1.frameNStart = frameN  # exact frame index
            merge_expl_feedback_1.tStart = t  # local t and not account for scr refresh
            merge_expl_feedback_1.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(merge_expl_feedback_1, 'tStartRefresh')  # time at next scr refresh
            merge_expl_feedback_1.setAutoDraw(True)
        if merge_expl_feedback_1.status == STARTED:
            # is it time to stop? (based on local clock)
            if tThisFlip > 60.0-frameTolerance:
                # keep track of stop time/frame for later
                merge_expl_feedback_1.tStop = t  # not accounting for scr refresh
                merge_expl_feedback_1.frameNStop = frameN  # exact frame index
                win.timeOnFlip(merge_expl_feedback_1, 'tStopRefresh')  # time at next scr refresh
                merge_expl_feedback_1.setAutoDraw(False)
        
        # *merge_expl_feedback_2* updates
        if merge_expl_feedback_2.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
            # keep track of start time/frame for later
            merge_expl_feedback_2.frameNStart = frameN  # exact frame index
            merge_expl_feedback_2.tStart = t  # local t and not account for scr refresh
            merge_expl_feedback_2.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(merge_expl_feedback_2, 'tStartRefresh')  # time at next scr refresh
            merge_expl_feedback_2.setAutoDraw(True)
        if merge_expl_feedback_2.status == STARTED:
            # is it time to stop? (based on local clock)
            if tThisFlip > 60.0-frameTolerance:
                # keep track of stop time/frame for later
                merge_expl_feedback_2.tStop = t  # not accounting for scr refresh
                merge_expl_feedback_2.frameNStop = frameN  # exact frame index
                win.timeOnFlip(merge_expl_feedback_2, 'tStopRefresh')  # time at next scr refresh
                merge_expl_feedback_2.setAutoDraw(False)
        
        # *merge_expl_ex* updates
        if merge_expl_ex.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
            # keep track of start time/frame for later
            merge_expl_ex.frameNStart = frameN  # exact frame index
            merge_expl_ex.tStart = t  # local t and not account for scr refresh
            merge_expl_ex.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(merge_expl_ex, 'tStartRefresh')  # time at next scr refresh
            merge_expl_ex.setAutoDraw(True)
        if merge_expl_ex.status == STARTED:
            # is it time to stop? (based on local clock)
            if tThisFlip > 60.0-frameTolerance:
                # keep track of stop time/frame for later
                merge_expl_ex.tStop = t  # not accounting for scr refresh
                merge_expl_ex.frameNStop = frameN  # exact frame index
                win.timeOnFlip(merge_expl_ex, 'tStopRefresh')  # time at next scr refresh
                merge_expl_ex.setAutoDraw(False)
        
        # *merge_expl_sep* updates
        if merge_expl_sep.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            merge_expl_sep.frameNStart = frameN  # exact frame index
            merge_expl_sep.tStart = t  # local t and not account for scr refresh
            merge_expl_sep.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(merge_expl_sep, 'tStartRefresh')  # time at next scr refresh
            merge_expl_sep.setAutoDraw(True)
        if merge_expl_sep.status == STARTED:
            # is it time to stop? (based on global clock, using actual start)
            if tThisFlipGlobal > merge_expl_sep.tStartRefresh + 60.0-frameTolerance:
                # keep track of stop time/frame for later
                merge_expl_sep.tStop = t  # not accounting for scr refresh
                merge_expl_sep.frameNStop = frameN  # exact frame index
                win.timeOnFlip(merge_expl_sep, 'tStopRefresh')  # time at next scr refresh
                merge_expl_sep.setAutoDraw(False)
        
        # *merge_expl_1* updates
        if merge_expl_1.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
            # keep track of start time/frame for later
            merge_expl_1.frameNStart = frameN  # exact frame index
            merge_expl_1.tStart = t  # local t and not account for scr refresh
            merge_expl_1.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(merge_expl_1, 'tStartRefresh')  # time at next scr refresh
            merge_expl_1.setAutoDraw(True)
        if merge_expl_1.status == STARTED:
            # is it time to stop? (based on local clock)
            if tThisFlip > 60.0-frameTolerance:
                # keep track of stop time/frame for later
                merge_expl_1.tStop = t  # not accounting for scr refresh
                merge_expl_1.frameNStop = frameN  # exact frame index
                win.timeOnFlip(merge_expl_1, 'tStopRefresh')  # time at next scr refresh
                merge_expl_1.setAutoDraw(False)
        
        # *merge_expl_2* updates
        if merge_expl_2.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
            # keep track of start time/frame for later
            merge_expl_2.frameNStart = frameN  # exact frame index
            merge_expl_2.tStart = t  # local t and not account for scr refresh
            merge_expl_2.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(merge_expl_2, 'tStartRefresh')  # time at next scr refresh
            merge_expl_2.setAutoDraw(True)
        if merge_expl_2.status == STARTED:
            # is it time to stop? (based on local clock)
            if tThisFlip > 60.0-frameTolerance:
                # keep track of stop time/frame for later
                merge_expl_2.tStop = t  # not accounting for scr refresh
                merge_expl_2.frameNStop = frameN  # exact frame index
                win.timeOnFlip(merge_expl_2, 'tStopRefresh')  # time at next scr refresh
                merge_expl_2.setAutoDraw(False)
        
        # *merge_expl_mc_1* updates
        if merge_expl_mc_1.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
            # keep track of start time/frame for later
            merge_expl_mc_1.frameNStart = frameN  # exact frame index
            merge_expl_mc_1.tStart = t  # local t and not account for scr refresh
            merge_expl_mc_1.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(merge_expl_mc_1, 'tStartRefresh')  # time at next scr refresh
            merge_expl_mc_1.setAutoDraw(True)
        if merge_expl_mc_1.status == STARTED:
            # is it time to stop? (based on local clock)
            if tThisFlip > 60.0-frameTolerance:
                # keep track of stop time/frame for later
                merge_expl_mc_1.tStop = t  # not accounting for scr refresh
                merge_expl_mc_1.frameNStop = frameN  # exact frame index
                win.timeOnFlip(merge_expl_mc_1, 'tStopRefresh')  # time at next scr refresh
                merge_expl_mc_1.setAutoDraw(False)
        
        # *merge_expl_mc_2* updates
        if merge_expl_mc_2.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
            # keep track of start time/frame for later
            merge_expl_mc_2.frameNStart = frameN  # exact frame index
            merge_expl_mc_2.tStart = t  # local t and not account for scr refresh
            merge_expl_mc_2.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(merge_expl_mc_2, 'tStartRefresh')  # time at next scr refresh
            merge_expl_mc_2.setAutoDraw(True)
        if merge_expl_mc_2.status == STARTED:
            # is it time to stop? (based on local clock)
            if tThisFlip > 60.0-frameTolerance:
                # keep track of stop time/frame for later
                merge_expl_mc_2.tStop = t  # not accounting for scr refresh
                merge_expl_mc_2.frameNStop = frameN  # exact frame index
                win.timeOnFlip(merge_expl_mc_2, 'tStopRefresh')  # time at next scr refresh
                merge_expl_mc_2.setAutoDraw(False)
        
        # *merge_expl_btn* updates
        if merge_expl_btn.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
            # keep track of start time/frame for later
            merge_expl_btn.frameNStart = frameN  # exact frame index
            merge_expl_btn.tStart = t  # local t and not account for scr refresh
            merge_expl_btn.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(merge_expl_btn, 'tStartRefresh')  # time at next scr refresh
            merge_expl_btn.setAutoDraw(True)
        if merge_expl_btn.status == STARTED:
            # is it time to stop? (based on local clock)
            if tThisFlip > 60.0-frameTolerance:
                # keep track of stop time/frame for later
                merge_expl_btn.tStop = t  # not accounting for scr refresh
                merge_expl_btn.frameNStop = frameN  # exact frame index
                win.timeOnFlip(merge_expl_btn, 'tStopRefresh')  # time at next scr refresh
                merge_expl_btn.setAutoDraw(False)
        
        # *merge_expl_timer* updates
        if merge_expl_timer.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            merge_expl_timer.frameNStart = frameN  # exact frame index
            merge_expl_timer.tStart = t  # local t and not account for scr refresh
            merge_expl_timer.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(merge_expl_timer, 'tStartRefresh')  # time at next scr refresh
            merge_expl_timer.setAutoDraw(True)
        if merge_expl_timer.status == STARTED:
            # is it time to stop? (based on local clock)
            if tThisFlip > 60.0-frameTolerance:
                # keep track of stop time/frame for later
                merge_expl_timer.tStop = t  # not accounting for scr refresh
                merge_expl_timer.frameNStop = frameN  # exact frame index
                win.timeOnFlip(merge_expl_timer, 'tStopRefresh')  # time at next scr refresh
                merge_expl_timer.setAutoDraw(False)
        merge_expl_timer.text = timerWarning(mergeExplTimeL,t) 
        
        # check for quit (typically the Esc key)
        if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
            core.quit()
        
        # check if all components have finished
        if not continueRoutine:  # a component has requested a forced-end of Routine
            break
        continueRoutine = False  # will revert to True if at least one component still running
        for thisComponent in MERGE_EXPLComponents:
            if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                continueRoutine = True
                break  # at least one component has not yet finished
        
        # refresh the screen
        if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
            win.flip()
    
    # -------Ending Routine "MERGE_EXPL"-------
    for thisComponent in MERGE_EXPLComponents:
        if hasattr(thisComponent, "setAutoDraw"):
            thisComponent.setAutoDraw(False)
    TRAIN_1.addData('merge_expl_ex.started', merge_expl_ex.tStartRefresh)
    TRAIN_1.addData('merge_expl_ex.stopped', merge_expl_ex.tStopRefresh)
    TRAIN_1.addData('merge_expl_mc_1.started', merge_expl_mc_1.tStartRefresh)
    TRAIN_1.addData('merge_expl_mc_1.stopped', merge_expl_mc_1.tStopRefresh)
    TRAIN_1.addData('merge_expl_mc_2.started', merge_expl_mc_2.tStartRefresh)
    TRAIN_1.addData('merge_expl_mc_2.stopped', merge_expl_mc_2.tStopRefresh)
    # store data for TRAIN_1 (TrialHandler)
    x, y = merge_expl_mouse.getPos()
    buttons = merge_expl_mouse.getPressed()
    TRAIN_1.addData('merge_expl_mouse.x', x)
    TRAIN_1.addData('merge_expl_mouse.y', y)
    TRAIN_1.addData('merge_expl_mouse.leftButton', buttons[0])
    TRAIN_1.addData('merge_expl_mouse.midButton', buttons[1])
    TRAIN_1.addData('merge_expl_mouse.rightButton', buttons[2])
    pass
    thisExp.nextEntry()
    
# completed 1.0 repeats of 'TRAIN_1'


# ------Prepare to start Routine "MERGE_TEST_INTRO"-------
continueRoutine = True
routineTimer.add(120.000000)
# update component parameters for each repeat
# setup some python lists for storing info about the merge_test_intro_mouse
gotValidClick = False  # until a click is received
# keep track of which components have finished
MERGE_TEST_INTROComponents = [intro_text_6, alice_4, merge_example_2, door_6, merge_test_intro_btn, merge_test_intro_mouse]
for thisComponent in MERGE_TEST_INTROComponents:
    thisComponent.tStart = None
    thisComponent.tStop = None
    thisComponent.tStartRefresh = None
    thisComponent.tStopRefresh = None
    if hasattr(thisComponent, 'status'):
        thisComponent.status = NOT_STARTED
# reset timers
t = 0
_timeToFirstFrame = win.getFutureFlipTime(clock="now")
MERGE_TEST_INTROClock.reset(-_timeToFirstFrame)  # t0 is time of first possible flip
frameN = -1

# -------Run Routine "MERGE_TEST_INTRO"-------
while continueRoutine and routineTimer.getTime() > 0:
    # get current time
    t = MERGE_TEST_INTROClock.getTime()
    tThisFlip = win.getFutureFlipTime(clock=MERGE_TEST_INTROClock)
    tThisFlipGlobal = win.getFutureFlipTime(clock=None)
    frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
    # update/draw components on each frame
    
    # *intro_text_6* updates
    if intro_text_6.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        intro_text_6.frameNStart = frameN  # exact frame index
        intro_text_6.tStart = t  # local t and not account for scr refresh
        intro_text_6.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(intro_text_6, 'tStartRefresh')  # time at next scr refresh
        intro_text_6.setAutoDraw(True)
    if intro_text_6.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > intro_text_6.tStartRefresh + 120.0-frameTolerance:
            # keep track of stop time/frame for later
            intro_text_6.tStop = t  # not accounting for scr refresh
            intro_text_6.frameNStop = frameN  # exact frame index
            win.timeOnFlip(intro_text_6, 'tStopRefresh')  # time at next scr refresh
            intro_text_6.setAutoDraw(False)
    
    # *alice_4* updates
    if alice_4.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        alice_4.frameNStart = frameN  # exact frame index
        alice_4.tStart = t  # local t and not account for scr refresh
        alice_4.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(alice_4, 'tStartRefresh')  # time at next scr refresh
        alice_4.setAutoDraw(True)
    if alice_4.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > alice_4.tStartRefresh + 120.0-frameTolerance:
            # keep track of stop time/frame for later
            alice_4.tStop = t  # not accounting for scr refresh
            alice_4.frameNStop = frameN  # exact frame index
            win.timeOnFlip(alice_4, 'tStopRefresh')  # time at next scr refresh
            alice_4.setAutoDraw(False)
    
    # *merge_example_2* updates
    if merge_example_2.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        merge_example_2.frameNStart = frameN  # exact frame index
        merge_example_2.tStart = t  # local t and not account for scr refresh
        merge_example_2.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(merge_example_2, 'tStartRefresh')  # time at next scr refresh
        merge_example_2.setAutoDraw(True)
    if merge_example_2.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > merge_example_2.tStartRefresh + 120.0-frameTolerance:
            # keep track of stop time/frame for later
            merge_example_2.tStop = t  # not accounting for scr refresh
            merge_example_2.frameNStop = frameN  # exact frame index
            win.timeOnFlip(merge_example_2, 'tStopRefresh')  # time at next scr refresh
            merge_example_2.setAutoDraw(False)
    
    # *door_6* updates
    if door_6.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        door_6.frameNStart = frameN  # exact frame index
        door_6.tStart = t  # local t and not account for scr refresh
        door_6.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(door_6, 'tStartRefresh')  # time at next scr refresh
        door_6.setAutoDraw(True)
    if door_6.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > door_6.tStartRefresh + 120.0-frameTolerance:
            # keep track of stop time/frame for later
            door_6.tStop = t  # not accounting for scr refresh
            door_6.frameNStop = frameN  # exact frame index
            win.timeOnFlip(door_6, 'tStopRefresh')  # time at next scr refresh
            door_6.setAutoDraw(False)
    
    # *merge_test_intro_btn* updates
    if merge_test_intro_btn.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
        # keep track of start time/frame for later
        merge_test_intro_btn.frameNStart = frameN  # exact frame index
        merge_test_intro_btn.tStart = t  # local t and not account for scr refresh
        merge_test_intro_btn.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(merge_test_intro_btn, 'tStartRefresh')  # time at next scr refresh
        merge_test_intro_btn.setAutoDraw(True)
    if merge_test_intro_btn.status == STARTED:
        # is it time to stop? (based on local clock)
        if tThisFlip > 120.0-frameTolerance:
            # keep track of stop time/frame for later
            merge_test_intro_btn.tStop = t  # not accounting for scr refresh
            merge_test_intro_btn.frameNStop = frameN  # exact frame index
            win.timeOnFlip(merge_test_intro_btn, 'tStopRefresh')  # time at next scr refresh
            merge_test_intro_btn.setAutoDraw(False)
    if t >= 0.5 and merge_test_intro_mouse.status == PsychoJS.Status.NOT_STARTED:
          merge_test_intro_mouse.tStart = t
          merge_test_intro_mouse.frameNStart = frameN
          
          merge_test_intro_mouse.status = PsychoJS.Status.STARTED
          merge_test_intro_mouse.mouseClock.reset()
    
    if merge_test_intro_mouse.isPressedIn(merge_test_intro_btn) and merge_test_intro_mouse.status == PsychoJS.Status.STARTED and merge_test_intro_btn.status == STARTED:
        continueRoutine = False
        
    
    # check for quit (typically the Esc key)
    if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
        core.quit()
    
    # check if all components have finished
    if not continueRoutine:  # a component has requested a forced-end of Routine
        break
    continueRoutine = False  # will revert to True if at least one component still running
    for thisComponent in MERGE_TEST_INTROComponents:
        if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
            continueRoutine = True
            break  # at least one component has not yet finished
    
    # refresh the screen
    if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
        win.flip()

# -------Ending Routine "MERGE_TEST_INTRO"-------
for thisComponent in MERGE_TEST_INTROComponents:
    if hasattr(thisComponent, "setAutoDraw"):
        thisComponent.setAutoDraw(False)
thisExp.addData('merge_example_2.started', merge_example_2.tStartRefresh)
thisExp.addData('merge_example_2.stopped', merge_example_2.tStopRefresh)
# store data for thisExp (ExperimentHandler)
x, y = merge_test_intro_mouse.getPos()
buttons = merge_test_intro_mouse.getPressed()
thisExp.addData('merge_test_intro_mouse.x', x)
thisExp.addData('merge_test_intro_mouse.y', y)
thisExp.addData('merge_test_intro_mouse.leftButton', buttons[0])
thisExp.addData('merge_test_intro_mouse.midButton', buttons[1])
thisExp.addData('merge_test_intro_mouse.rightButton', buttons[2])
thisExp.nextEntry()
pass

# set up handler to look after randomisation of conditions etc
TEST_1 = data.TrialHandler(nReps=1.0, method='sequential', 
    extraInfo=expInfo, originPath=-1,
    trialList=data.importConditions('materials/merge_test_cond.csv'),
    seed=None, name='TEST_1')
thisExp.addLoop(TEST_1)  # add the loop to the experiment
thisTEST_1 = TEST_1.trialList[0]  # so we can initialise stimuli with some values
# abbreviate parameter names if possible (e.g. rgb = thisTEST_1.rgb)
if thisTEST_1 != None:
    for paramName in thisTEST_1:
        exec('{} = thisTEST_1[paramName]'.format(paramName))

for thisTEST_1 in TEST_1:
    currentLoop = TEST_1
    # abbreviate parameter names if possible (e.g. rgb = thisTEST_1.rgb)
    if thisTEST_1 != None:
        for paramName in thisTEST_1:
            exec('{} = thisTEST_1[paramName]'.format(paramName))
    
    # ------Prepare to start Routine "MERGE_TEST"-------
    continueRoutine = True
    routineTimer.add(90.000000)
    # update component parameters for each repeat
    merge_test_compare_records = []  # Set routine start values for merge_test_compare_records
    merge_test_labels = labels  # Set routine start values for merge_test_labels
    thisExp.addData('merge_test_labels.routineStartVal', merge_test_labels)  # Save exp start value
    merge_test_compareN = 0  # Set routine start values for merge_test_compareN
    merge_test_input = input  # Set routine start values for merge_test_input
    merge_test_scale_instr.setColor('white', colorSpace='rgb')
    merge_test_scale_instr.setText('COMPARE weights by typing fruit labels in both LHS and RHS textboxes')
    merge_test_scale_instr.setHeight(0.02)
    merge_test_scale_right.reset()
    merge_test_scale_right.setText('')
    merge_test_scale_left.reset()
    merge_test_scale_left.setText('')
    merge_test_res.reset()
    merge_test.setImage(img_path)
    merge_test_scale.setImage(scaleEqPath)
    # setup some python lists for storing info about the merge_test_mouse
    gotValidClick = False  # until a click is received
    merge_test_timer.setText('')
    merge_test_input = input
    merge_test_labels = encryption
    merge_test_compareN = 0
    # keep track of which components have finished
    MERGE_TESTComponents = [merge_test_scale_instr, merge_test_ans_instr, merge_test_instr, merge_test_scale_right, merge_test_scale_left, merge_test_res, merge_test_sep, merge_test, merge_test_scale, merge_test_btn, merge_test_compare, merge_test_mouse, merge_test_timer]
    for thisComponent in MERGE_TESTComponents:
        thisComponent.tStart = None
        thisComponent.tStop = None
        thisComponent.tStartRefresh = None
        thisComponent.tStopRefresh = None
        if hasattr(thisComponent, 'status'):
            thisComponent.status = NOT_STARTED
    # reset timers
    t = 0
    _timeToFirstFrame = win.getFutureFlipTime(clock="now")
    MERGE_TESTClock.reset(-_timeToFirstFrame)  # t0 is time of first possible flip
    frameN = -1
    
    # -------Run Routine "MERGE_TEST"-------
    while continueRoutine and routineTimer.getTime() > 0:
        # get current time
        t = MERGE_TESTClock.getTime()
        tThisFlip = win.getFutureFlipTime(clock=MERGE_TESTClock)
        tThisFlipGlobal = win.getFutureFlipTime(clock=None)
        frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
        # update/draw components on each frame
        
        # *merge_test_scale_instr* updates
        if merge_test_scale_instr.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            merge_test_scale_instr.frameNStart = frameN  # exact frame index
            merge_test_scale_instr.tStart = t  # local t and not account for scr refresh
            merge_test_scale_instr.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(merge_test_scale_instr, 'tStartRefresh')  # time at next scr refresh
            merge_test_scale_instr.setAutoDraw(True)
        if merge_test_scale_instr.status == STARTED:
            # is it time to stop? (based on global clock, using actual start)
            if tThisFlipGlobal > merge_test_scale_instr.tStartRefresh + 90.0-frameTolerance:
                # keep track of stop time/frame for later
                merge_test_scale_instr.tStop = t  # not accounting for scr refresh
                merge_test_scale_instr.frameNStop = frameN  # exact frame index
                win.timeOnFlip(merge_test_scale_instr, 'tStopRefresh')  # time at next scr refresh
                merge_test_scale_instr.setAutoDraw(False)
        
        # *merge_test_ans_instr* updates
        if merge_test_ans_instr.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            merge_test_ans_instr.frameNStart = frameN  # exact frame index
            merge_test_ans_instr.tStart = t  # local t and not account for scr refresh
            merge_test_ans_instr.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(merge_test_ans_instr, 'tStartRefresh')  # time at next scr refresh
            merge_test_ans_instr.setAutoDraw(True)
        if merge_test_ans_instr.status == STARTED:
            # is it time to stop? (based on global clock, using actual start)
            if tThisFlipGlobal > merge_test_ans_instr.tStartRefresh + 90.0-frameTolerance:
                # keep track of stop time/frame for later
                merge_test_ans_instr.tStop = t  # not accounting for scr refresh
                merge_test_ans_instr.frameNStop = frameN  # exact frame index
                win.timeOnFlip(merge_test_ans_instr, 'tStopRefresh')  # time at next scr refresh
                merge_test_ans_instr.setAutoDraw(False)
        
        # *merge_test_instr* updates
        if merge_test_instr.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            merge_test_instr.frameNStart = frameN  # exact frame index
            merge_test_instr.tStart = t  # local t and not account for scr refresh
            merge_test_instr.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(merge_test_instr, 'tStartRefresh')  # time at next scr refresh
            merge_test_instr.setAutoDraw(True)
        if merge_test_instr.status == STARTED:
            # is it time to stop? (based on global clock, using actual start)
            if tThisFlipGlobal > merge_test_instr.tStartRefresh + 90.0-frameTolerance:
                # keep track of stop time/frame for later
                merge_test_instr.tStop = t  # not accounting for scr refresh
                merge_test_instr.frameNStop = frameN  # exact frame index
                win.timeOnFlip(merge_test_instr, 'tStopRefresh')  # time at next scr refresh
                merge_test_instr.setAutoDraw(False)
        
        # *merge_test_scale_right* updates
        if merge_test_scale_right.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            merge_test_scale_right.frameNStart = frameN  # exact frame index
            merge_test_scale_right.tStart = t  # local t and not account for scr refresh
            merge_test_scale_right.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(merge_test_scale_right, 'tStartRefresh')  # time at next scr refresh
            merge_test_scale_right.setAutoDraw(True)
        if merge_test_scale_right.status == STARTED:
            # is it time to stop? (based on global clock, using actual start)
            if tThisFlipGlobal > merge_test_scale_right.tStartRefresh + 90.0-frameTolerance:
                # keep track of stop time/frame for later
                merge_test_scale_right.tStop = t  # not accounting for scr refresh
                merge_test_scale_right.frameNStop = frameN  # exact frame index
                win.timeOnFlip(merge_test_scale_right, 'tStopRefresh')  # time at next scr refresh
                merge_test_scale_right.setAutoDraw(False)
        
        # *merge_test_scale_left* updates
        if merge_test_scale_left.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            merge_test_scale_left.frameNStart = frameN  # exact frame index
            merge_test_scale_left.tStart = t  # local t and not account for scr refresh
            merge_test_scale_left.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(merge_test_scale_left, 'tStartRefresh')  # time at next scr refresh
            merge_test_scale_left.setAutoDraw(True)
        if merge_test_scale_left.status == STARTED:
            # is it time to stop? (based on global clock, using actual start)
            if tThisFlipGlobal > merge_test_scale_left.tStartRefresh + 90.0-frameTolerance:
                # keep track of stop time/frame for later
                merge_test_scale_left.tStop = t  # not accounting for scr refresh
                merge_test_scale_left.frameNStop = frameN  # exact frame index
                win.timeOnFlip(merge_test_scale_left, 'tStopRefresh')  # time at next scr refresh
                merge_test_scale_left.setAutoDraw(False)
        
        # *merge_test_res* updates
        if merge_test_res.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            merge_test_res.frameNStart = frameN  # exact frame index
            merge_test_res.tStart = t  # local t and not account for scr refresh
            merge_test_res.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(merge_test_res, 'tStartRefresh')  # time at next scr refresh
            merge_test_res.setAutoDraw(True)
        if merge_test_res.status == STARTED:
            # is it time to stop? (based on global clock, using actual start)
            if tThisFlipGlobal > merge_test_res.tStartRefresh + 90.0-frameTolerance:
                # keep track of stop time/frame for later
                merge_test_res.tStop = t  # not accounting for scr refresh
                merge_test_res.frameNStop = frameN  # exact frame index
                win.timeOnFlip(merge_test_res, 'tStopRefresh')  # time at next scr refresh
                merge_test_res.setAutoDraw(False)
        
        # *merge_test_sep* updates
        if merge_test_sep.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            merge_test_sep.frameNStart = frameN  # exact frame index
            merge_test_sep.tStart = t  # local t and not account for scr refresh
            merge_test_sep.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(merge_test_sep, 'tStartRefresh')  # time at next scr refresh
            merge_test_sep.setAutoDraw(True)
        if merge_test_sep.status == STARTED:
            # is it time to stop? (based on global clock, using actual start)
            if tThisFlipGlobal > merge_test_sep.tStartRefresh + 90.0-frameTolerance:
                # keep track of stop time/frame for later
                merge_test_sep.tStop = t  # not accounting for scr refresh
                merge_test_sep.frameNStop = frameN  # exact frame index
                win.timeOnFlip(merge_test_sep, 'tStopRefresh')  # time at next scr refresh
                merge_test_sep.setAutoDraw(False)
        
        # *merge_test* updates
        if merge_test.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
            # keep track of start time/frame for later
            merge_test.frameNStart = frameN  # exact frame index
            merge_test.tStart = t  # local t and not account for scr refresh
            merge_test.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(merge_test, 'tStartRefresh')  # time at next scr refresh
            merge_test.setAutoDraw(True)
        if merge_test.status == STARTED:
            # is it time to stop? (based on local clock)
            if tThisFlip > 90.0-frameTolerance:
                # keep track of stop time/frame for later
                merge_test.tStop = t  # not accounting for scr refresh
                merge_test.frameNStop = frameN  # exact frame index
                win.timeOnFlip(merge_test, 'tStopRefresh')  # time at next scr refresh
                merge_test.setAutoDraw(False)
        
        # *merge_test_scale* updates
        if merge_test_scale.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            merge_test_scale.frameNStart = frameN  # exact frame index
            merge_test_scale.tStart = t  # local t and not account for scr refresh
            merge_test_scale.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(merge_test_scale, 'tStartRefresh')  # time at next scr refresh
            merge_test_scale.setAutoDraw(True)
        if merge_test_scale.status == STARTED:
            # is it time to stop? (based on global clock, using actual start)
            if tThisFlipGlobal > merge_test_scale.tStartRefresh + 90.0-frameTolerance:
                # keep track of stop time/frame for later
                merge_test_scale.tStop = t  # not accounting for scr refresh
                merge_test_scale.frameNStop = frameN  # exact frame index
                win.timeOnFlip(merge_test_scale, 'tStopRefresh')  # time at next scr refresh
                merge_test_scale.setAutoDraw(False)
        
        # *merge_test_btn* updates
        if merge_test_btn.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
            # keep track of start time/frame for later
            merge_test_btn.frameNStart = frameN  # exact frame index
            merge_test_btn.tStart = t  # local t and not account for scr refresh
            merge_test_btn.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(merge_test_btn, 'tStartRefresh')  # time at next scr refresh
            merge_test_btn.setAutoDraw(True)
        if merge_test_btn.status == STARTED:
            # is it time to stop? (based on local clock)
            if tThisFlip > 90.0-frameTolerance:
                # keep track of stop time/frame for later
                merge_test_btn.tStop = t  # not accounting for scr refresh
                merge_test_btn.frameNStop = frameN  # exact frame index
                win.timeOnFlip(merge_test_btn, 'tStopRefresh')  # time at next scr refresh
                merge_test_btn.setAutoDraw(False)
        
        # *merge_test_compare* updates
        if merge_test_compare.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
            # keep track of start time/frame for later
            merge_test_compare.frameNStart = frameN  # exact frame index
            merge_test_compare.tStart = t  # local t and not account for scr refresh
            merge_test_compare.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(merge_test_compare, 'tStartRefresh')  # time at next scr refresh
            merge_test_compare.setAutoDraw(True)
        if merge_test_compare.status == STARTED:
            # is it time to stop? (based on local clock)
            if tThisFlip > 90.0-frameTolerance:
                # keep track of stop time/frame for later
                merge_test_compare.tStop = t  # not accounting for scr refresh
                merge_test_compare.frameNStop = frameN  # exact frame index
                win.timeOnFlip(merge_test_compare, 'tStopRefresh')  # time at next scr refresh
                merge_test_compare.setAutoDraw(False)
        
        # *merge_test_timer* updates
        if merge_test_timer.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            merge_test_timer.frameNStart = frameN  # exact frame index
            merge_test_timer.tStart = t  # local t and not account for scr refresh
            merge_test_timer.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(merge_test_timer, 'tStartRefresh')  # time at next scr refresh
            merge_test_timer.setAutoDraw(True)
        if merge_test_timer.status == STARTED:
            # is it time to stop? (based on local clock)
            if tThisFlip > 90.0-frameTolerance:
                # keep track of stop time/frame for later
                merge_test_timer.tStop = t  # not accounting for scr refresh
                merge_test_timer.frameNStop = frameN  # exact frame index
                win.timeOnFlip(merge_test_timer, 'tStopRefresh')  # time at next scr refresh
                merge_test_timer.setAutoDraw(False)
        if merge_test_mouse.isPressedIn(merge_test_compare):
            merge_test_compareN = merge_test_compareN + compare(merge_test_scale,merge_test_input,merge_test_labels,merge_test_scale_instr,merge_test_scale_left,merge_test_scale_right)
        
        merge_test_timer.text = timerWarning(mergeTestTimeL,t)
        
        # check for quit (typically the Esc key)
        if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
            core.quit()
        
        # check if all components have finished
        if not continueRoutine:  # a component has requested a forced-end of Routine
            break
        continueRoutine = False  # will revert to True if at least one component still running
        for thisComponent in MERGE_TESTComponents:
            if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                continueRoutine = True
                break  # at least one component has not yet finished
        
        # refresh the screen
        if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
            win.flip()
    
    # -------Ending Routine "MERGE_TEST"-------
    for thisComponent in MERGE_TESTComponents:
        if hasattr(thisComponent, "setAutoDraw"):
            thisComponent.setAutoDraw(False)
    thisExp.addData('merge_test_compare_records.routineEndVal', merge_test_compare_records)  # Save end routine value
    thisExp.addData('merge_test_compareN.routineEndVal', merge_test_compareN)  # Save end routine value
    thisExp.addData('merge_test_input.routineEndVal', merge_test_input)  # Save end routine value
    TEST_1.addData('merge_test_scale_right.text',merge_test_scale_right.text)
    TEST_1.addData('merge_test_scale_left.text',merge_test_scale_left.text)
    TEST_1.addData('merge_test_res.text',merge_test_res.text)
    TEST_1.addData('merge_test.started', merge_test.tStartRefresh)
    TEST_1.addData('merge_test.stopped', merge_test.tStopRefresh)
    # store data for TEST_1 (TrialHandler)
    x, y = merge_test_mouse.getPos()
    buttons = merge_test_mouse.getPressed()
    TEST_1.addData('merge_test_mouse.x', x)
    TEST_1.addData('merge_test_mouse.y', y)
    TEST_1.addData('merge_test_mouse.leftButton', buttons[0])
    TEST_1.addData('merge_test_mouse.midButton', buttons[1])
    TEST_1.addData('merge_test_mouse.rightButton', buttons[2])
    pass
    thisExp.nextEntry()
    
# completed 1.0 repeats of 'TEST_1'


# ------Prepare to start Routine "SORT_INTRO"-------
continueRoutine = True
routineTimer.add(120.000000)
# update component parameters for each repeat
# setup some python lists for storing info about the sort_intro_mouse
gotValidClick = False  # until a click is received
# keep track of which components have finished
SORT_INTROComponents = [intro_text_3, bob_2, sort_example, door_4, sort_intro_btn, sort_intro_mouse]
for thisComponent in SORT_INTROComponents:
    thisComponent.tStart = None
    thisComponent.tStop = None
    thisComponent.tStartRefresh = None
    thisComponent.tStopRefresh = None
    if hasattr(thisComponent, 'status'):
        thisComponent.status = NOT_STARTED
# reset timers
t = 0
_timeToFirstFrame = win.getFutureFlipTime(clock="now")
SORT_INTROClock.reset(-_timeToFirstFrame)  # t0 is time of first possible flip
frameN = -1

# -------Run Routine "SORT_INTRO"-------
while continueRoutine and routineTimer.getTime() > 0:
    # get current time
    t = SORT_INTROClock.getTime()
    tThisFlip = win.getFutureFlipTime(clock=SORT_INTROClock)
    tThisFlipGlobal = win.getFutureFlipTime(clock=None)
    frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
    # update/draw components on each frame
    
    # *intro_text_3* updates
    if intro_text_3.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        intro_text_3.frameNStart = frameN  # exact frame index
        intro_text_3.tStart = t  # local t and not account for scr refresh
        intro_text_3.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(intro_text_3, 'tStartRefresh')  # time at next scr refresh
        intro_text_3.setAutoDraw(True)
    if intro_text_3.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > intro_text_3.tStartRefresh + 120.0-frameTolerance:
            # keep track of stop time/frame for later
            intro_text_3.tStop = t  # not accounting for scr refresh
            intro_text_3.frameNStop = frameN  # exact frame index
            win.timeOnFlip(intro_text_3, 'tStopRefresh')  # time at next scr refresh
            intro_text_3.setAutoDraw(False)
    
    # *bob_2* updates
    if bob_2.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        bob_2.frameNStart = frameN  # exact frame index
        bob_2.tStart = t  # local t and not account for scr refresh
        bob_2.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(bob_2, 'tStartRefresh')  # time at next scr refresh
        bob_2.setAutoDraw(True)
    if bob_2.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > bob_2.tStartRefresh + 120.0-frameTolerance:
            # keep track of stop time/frame for later
            bob_2.tStop = t  # not accounting for scr refresh
            bob_2.frameNStop = frameN  # exact frame index
            win.timeOnFlip(bob_2, 'tStopRefresh')  # time at next scr refresh
            bob_2.setAutoDraw(False)
    
    # *sort_example* updates
    if sort_example.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        sort_example.frameNStart = frameN  # exact frame index
        sort_example.tStart = t  # local t and not account for scr refresh
        sort_example.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(sort_example, 'tStartRefresh')  # time at next scr refresh
        sort_example.setAutoDraw(True)
    if sort_example.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > sort_example.tStartRefresh + 120.0-frameTolerance:
            # keep track of stop time/frame for later
            sort_example.tStop = t  # not accounting for scr refresh
            sort_example.frameNStop = frameN  # exact frame index
            win.timeOnFlip(sort_example, 'tStopRefresh')  # time at next scr refresh
            sort_example.setAutoDraw(False)
    
    # *door_4* updates
    if door_4.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        door_4.frameNStart = frameN  # exact frame index
        door_4.tStart = t  # local t and not account for scr refresh
        door_4.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(door_4, 'tStartRefresh')  # time at next scr refresh
        door_4.setAutoDraw(True)
    if door_4.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > door_4.tStartRefresh + 120.0-frameTolerance:
            # keep track of stop time/frame for later
            door_4.tStop = t  # not accounting for scr refresh
            door_4.frameNStop = frameN  # exact frame index
            win.timeOnFlip(door_4, 'tStopRefresh')  # time at next scr refresh
            door_4.setAutoDraw(False)
    
    # *sort_intro_btn* updates
    if sort_intro_btn.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
        # keep track of start time/frame for later
        sort_intro_btn.frameNStart = frameN  # exact frame index
        sort_intro_btn.tStart = t  # local t and not account for scr refresh
        sort_intro_btn.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(sort_intro_btn, 'tStartRefresh')  # time at next scr refresh
        sort_intro_btn.setAutoDraw(True)
    if sort_intro_btn.status == STARTED:
        # is it time to stop? (based on local clock)
        if tThisFlip > 120.0-frameTolerance:
            # keep track of stop time/frame for later
            sort_intro_btn.tStop = t  # not accounting for scr refresh
            sort_intro_btn.frameNStop = frameN  # exact frame index
            win.timeOnFlip(sort_intro_btn, 'tStopRefresh')  # time at next scr refresh
            sort_intro_btn.setAutoDraw(False)
    if t >= 0.5 and sort_intro_mouse.status == PsychoJS.Status.NOT_STARTED:
          sort_intro_mouse.tStart = t
          sort_intro_mouse.frameNStart = frameN
          
          sort_intro_mouse.status = PsychoJS.Status.STARTED
          sort_intro_mouse.mouseClock.reset()
    
    if sort_intro_mouse.isPressedIn(sort_intro_btn) and sort_intro_mouse.status == PsychoJS.Status.STARTED and sort_intro_btn.status == STARTED:
        continueRoutine = False
    
    # check for quit (typically the Esc key)
    if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
        core.quit()
    
    # check if all components have finished
    if not continueRoutine:  # a component has requested a forced-end of Routine
        break
    continueRoutine = False  # will revert to True if at least one component still running
    for thisComponent in SORT_INTROComponents:
        if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
            continueRoutine = True
            break  # at least one component has not yet finished
    
    # refresh the screen
    if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
        win.flip()

# -------Ending Routine "SORT_INTRO"-------
for thisComponent in SORT_INTROComponents:
    if hasattr(thisComponent, "setAutoDraw"):
        thisComponent.setAutoDraw(False)
thisExp.addData('sort_example.started', sort_example.tStartRefresh)
thisExp.addData('sort_example.stopped', sort_example.tStopRefresh)
# store data for thisExp (ExperimentHandler)
x, y = sort_intro_mouse.getPos()
buttons = sort_intro_mouse.getPressed()
thisExp.addData('sort_intro_mouse.x', x)
thisExp.addData('sort_intro_mouse.y', y)
thisExp.addData('sort_intro_mouse.leftButton', buttons[0])
thisExp.addData('sort_intro_mouse.midButton', buttons[1])
thisExp.addData('sort_intro_mouse.rightButton', buttons[2])
thisExp.nextEntry()
pass

# set up handler to look after randomisation of conditions etc
TRAIN_3 = data.TrialHandler(nReps=1.0, method='sequential', 
    extraInfo=expInfo, originPath=-1,
    trialList=data.importConditions('materials/sort_train_cond.csv'),
    seed=None, name='TRAIN_3')
thisExp.addLoop(TRAIN_3)  # add the loop to the experiment
thisTRAIN_3 = TRAIN_3.trialList[0]  # so we can initialise stimuli with some values
# abbreviate parameter names if possible (e.g. rgb = thisTRAIN_3.rgb)
if thisTRAIN_3 != None:
    for paramName in thisTRAIN_3:
        exec('{} = thisTRAIN_3[paramName]'.format(paramName))

for thisTRAIN_3 in TRAIN_3:
    currentLoop = TRAIN_3
    # abbreviate parameter names if possible (e.g. rgb = thisTRAIN_3.rgb)
    if thisTRAIN_3 != None:
        for paramName in thisTRAIN_3:
            exec('{} = thisTRAIN_3[paramName]'.format(paramName))
    
    # ------Prepare to start Routine "SORT_TRAIN"-------
    continueRoutine = True
    routineTimer.add(300.000000)
    # update component parameters for each repeat
    sort_train_compare_records = []  # Set routine start values for sort_train_compare_records
    sort_train_compare_limit = ms_compare  # Set routine start values for sort_train_compare_limit
    sort_train_trace = []  # Set routine start values for sort_train_trace
    sort_train_compareN = 0  # Set routine start values for sort_train_compareN
    sort_train_labels = encryption  # Set routine start values for sort_train_labels
    thisExp.addData('sort_train_labels.routineStartVal', sort_train_labels)  # Save exp start value
    sort_train_path_base = img_path_base  # Set routine start values for sort_train_path_base
    sort_train_input = input  # Set routine start values for sort_train_input
    thisExp.addData('sort_train_input.routineStartVal', sort_train_input)  # Save exp start value
    sort_train_scale_instr.setColor('white', colorSpace='rgb')
    sort_train_scale_instr.setText('COMPARE weights by typing fruit labels in both LHS and RHS textboxes')
    sort_train_scale_instr.setHeight(0.02)
    sort_train_scale_right.reset()
    sort_train_scale_right.setText('')
    sort_train_scale_left.reset()
    sort_train_scale_left.setText('')
    sort_train_res.reset()
    sort_train_board.setImage('materials/merge_sort/imgs/purple_diamond.png')
    sort_train_scale.setImage(scaleEqPath)
    sort_train_ex_1.setOpacity(0.0)
    sort_train_ex_1.setPos((-0.25, 0.3))
    sort_train_ex_2.setOpacity(0.0)
    sort_train_ex_2.setPos((-0.2, 0.3))
    sort_train_ex_3.setOpacity(0.0)
    sort_train_ex_3.setPos((-0.15, 0.3))
    sort_train_ex_4.setOpacity(0.0)
    sort_train_ex_4.setPos((-0.1, 0.3))
    sort_train_ex_5.setOpacity(0.0)
    sort_train_ex_5.setPos((-0.05, 0.3))
    sort_train_ex_6.setOpacity(0.0)
    sort_train_ex_6.setPos((0.0, 0.3))
    sort_train_ex_7.setOpacity(0.0)
    sort_train_ex_7.setPos((0.05, 0.3))
    sort_train_ex_8.setOpacity(0.0)
    sort_train_ex_8.setPos((0.1,0.3))
    sort_train_ex_9.setOpacity(0.0)
    sort_train_ex_9.setPos((0.15, 0.3))
    sort_train_ex_10.setOpacity(0.0)
    sort_train_ex_10.setPos((0.20, 0.3))
    sort_train_ex_11.setOpacity(0.0)
    sort_train_ex_11.setPos((0.25, 0.3))
    sort_train_ex_12.setOpacity(0.0)
    sort_train_ex_12.setPos((0.30, 0.3))
    # setup some python lists for storing info about the sort_train_mouse
    gotValidClick = False  # until a click is received
    sort_train_timer.setText('')
    sort_train_hint.setText('')
    items = []
    frameCnt = 0
    tracePos = []
    sort_train_hint.text = "Bob uses "+ str(sort_train_compare_limit) + " comparisons\n" + "You have used: 0"
    
    movingItem = None
    (x, y) = sort_train_board.pos
    (w,h) = sort_train_board.size
    top = y+h/2
    bot = y-h/2
    left = x-w/2
    right = x+w/2
    # keep track of which components have finished
    SORT_TRAINComponents = [sort_train_scale_instr, sort_train_ans_instr, sort_train_instr, sort_train_scale_right, sort_train_scale_left, sort_train_res, sort_train_sep, sort_train_board, sort_train_scale, sort_train_ex_1, sort_train_ex_2, sort_train_ex_3, sort_train_ex_4, sort_train_ex_5, sort_train_ex_6, sort_train_ex_7, sort_train_ex_8, sort_train_ex_9, sort_train_ex_10, sort_train_ex_11, sort_train_ex_12, sort_train_btn, sort_train_compare, sort_train_mouse, sort_train_timer, sort_train_hint]
    for thisComponent in SORT_TRAINComponents:
        thisComponent.tStart = None
        thisComponent.tStop = None
        thisComponent.tStartRefresh = None
        thisComponent.tStopRefresh = None
        if hasattr(thisComponent, 'status'):
            thisComponent.status = NOT_STARTED
    # reset timers
    t = 0
    _timeToFirstFrame = win.getFutureFlipTime(clock="now")
    SORT_TRAINClock.reset(-_timeToFirstFrame)  # t0 is time of first possible flip
    frameN = -1
    
    # -------Run Routine "SORT_TRAIN"-------
    while continueRoutine and routineTimer.getTime() > 0:
        # get current time
        t = SORT_TRAINClock.getTime()
        tThisFlip = win.getFutureFlipTime(clock=SORT_TRAINClock)
        tThisFlipGlobal = win.getFutureFlipTime(clock=None)
        frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
        # update/draw components on each frame
        
        # *sort_train_scale_instr* updates
        if sort_train_scale_instr.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            sort_train_scale_instr.frameNStart = frameN  # exact frame index
            sort_train_scale_instr.tStart = t  # local t and not account for scr refresh
            sort_train_scale_instr.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(sort_train_scale_instr, 'tStartRefresh')  # time at next scr refresh
            sort_train_scale_instr.setAutoDraw(True)
        if sort_train_scale_instr.status == STARTED:
            # is it time to stop? (based on global clock, using actual start)
            if tThisFlipGlobal > sort_train_scale_instr.tStartRefresh + 300.0-frameTolerance:
                # keep track of stop time/frame for later
                sort_train_scale_instr.tStop = t  # not accounting for scr refresh
                sort_train_scale_instr.frameNStop = frameN  # exact frame index
                win.timeOnFlip(sort_train_scale_instr, 'tStopRefresh')  # time at next scr refresh
                sort_train_scale_instr.setAutoDraw(False)
        
        # *sort_train_ans_instr* updates
        if sort_train_ans_instr.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            sort_train_ans_instr.frameNStart = frameN  # exact frame index
            sort_train_ans_instr.tStart = t  # local t and not account for scr refresh
            sort_train_ans_instr.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(sort_train_ans_instr, 'tStartRefresh')  # time at next scr refresh
            sort_train_ans_instr.setAutoDraw(True)
        if sort_train_ans_instr.status == STARTED:
            # is it time to stop? (based on global clock, using actual start)
            if tThisFlipGlobal > sort_train_ans_instr.tStartRefresh + 300.0-frameTolerance:
                # keep track of stop time/frame for later
                sort_train_ans_instr.tStop = t  # not accounting for scr refresh
                sort_train_ans_instr.frameNStop = frameN  # exact frame index
                win.timeOnFlip(sort_train_ans_instr, 'tStopRefresh')  # time at next scr refresh
                sort_train_ans_instr.setAutoDraw(False)
        
        # *sort_train_instr* updates
        if sort_train_instr.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            sort_train_instr.frameNStart = frameN  # exact frame index
            sort_train_instr.tStart = t  # local t and not account for scr refresh
            sort_train_instr.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(sort_train_instr, 'tStartRefresh')  # time at next scr refresh
            sort_train_instr.setAutoDraw(True)
        if sort_train_instr.status == STARTED:
            # is it time to stop? (based on global clock, using actual start)
            if tThisFlipGlobal > sort_train_instr.tStartRefresh + 300.0-frameTolerance:
                # keep track of stop time/frame for later
                sort_train_instr.tStop = t  # not accounting for scr refresh
                sort_train_instr.frameNStop = frameN  # exact frame index
                win.timeOnFlip(sort_train_instr, 'tStopRefresh')  # time at next scr refresh
                sort_train_instr.setAutoDraw(False)
        
        # *sort_train_scale_right* updates
        if sort_train_scale_right.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            sort_train_scale_right.frameNStart = frameN  # exact frame index
            sort_train_scale_right.tStart = t  # local t and not account for scr refresh
            sort_train_scale_right.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(sort_train_scale_right, 'tStartRefresh')  # time at next scr refresh
            sort_train_scale_right.setAutoDraw(True)
        if sort_train_scale_right.status == STARTED:
            # is it time to stop? (based on global clock, using actual start)
            if tThisFlipGlobal > sort_train_scale_right.tStartRefresh + 300.0-frameTolerance:
                # keep track of stop time/frame for later
                sort_train_scale_right.tStop = t  # not accounting for scr refresh
                sort_train_scale_right.frameNStop = frameN  # exact frame index
                win.timeOnFlip(sort_train_scale_right, 'tStopRefresh')  # time at next scr refresh
                sort_train_scale_right.setAutoDraw(False)
        
        # *sort_train_scale_left* updates
        if sort_train_scale_left.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            sort_train_scale_left.frameNStart = frameN  # exact frame index
            sort_train_scale_left.tStart = t  # local t and not account for scr refresh
            sort_train_scale_left.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(sort_train_scale_left, 'tStartRefresh')  # time at next scr refresh
            sort_train_scale_left.setAutoDraw(True)
        if sort_train_scale_left.status == STARTED:
            # is it time to stop? (based on global clock, using actual start)
            if tThisFlipGlobal > sort_train_scale_left.tStartRefresh + 300.0-frameTolerance:
                # keep track of stop time/frame for later
                sort_train_scale_left.tStop = t  # not accounting for scr refresh
                sort_train_scale_left.frameNStop = frameN  # exact frame index
                win.timeOnFlip(sort_train_scale_left, 'tStopRefresh')  # time at next scr refresh
                sort_train_scale_left.setAutoDraw(False)
        
        # *sort_train_res* updates
        if sort_train_res.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            sort_train_res.frameNStart = frameN  # exact frame index
            sort_train_res.tStart = t  # local t and not account for scr refresh
            sort_train_res.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(sort_train_res, 'tStartRefresh')  # time at next scr refresh
            sort_train_res.setAutoDraw(True)
        if sort_train_res.status == STARTED:
            # is it time to stop? (based on global clock, using actual start)
            if tThisFlipGlobal > sort_train_res.tStartRefresh + 300.0-frameTolerance:
                # keep track of stop time/frame for later
                sort_train_res.tStop = t  # not accounting for scr refresh
                sort_train_res.frameNStop = frameN  # exact frame index
                win.timeOnFlip(sort_train_res, 'tStopRefresh')  # time at next scr refresh
                sort_train_res.setAutoDraw(False)
        
        # *sort_train_sep* updates
        if sort_train_sep.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            sort_train_sep.frameNStart = frameN  # exact frame index
            sort_train_sep.tStart = t  # local t and not account for scr refresh
            sort_train_sep.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(sort_train_sep, 'tStartRefresh')  # time at next scr refresh
            sort_train_sep.setAutoDraw(True)
        if sort_train_sep.status == STARTED:
            # is it time to stop? (based on global clock, using actual start)
            if tThisFlipGlobal > sort_train_sep.tStartRefresh + 300.0-frameTolerance:
                # keep track of stop time/frame for later
                sort_train_sep.tStop = t  # not accounting for scr refresh
                sort_train_sep.frameNStop = frameN  # exact frame index
                win.timeOnFlip(sort_train_sep, 'tStopRefresh')  # time at next scr refresh
                sort_train_sep.setAutoDraw(False)
        
        # *sort_train_board* updates
        if sort_train_board.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            sort_train_board.frameNStart = frameN  # exact frame index
            sort_train_board.tStart = t  # local t and not account for scr refresh
            sort_train_board.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(sort_train_board, 'tStartRefresh')  # time at next scr refresh
            sort_train_board.setAutoDraw(True)
        if sort_train_board.status == STARTED:
            # is it time to stop? (based on global clock, using actual start)
            if tThisFlipGlobal > sort_train_board.tStartRefresh + 300.0-frameTolerance:
                # keep track of stop time/frame for later
                sort_train_board.tStop = t  # not accounting for scr refresh
                sort_train_board.frameNStop = frameN  # exact frame index
                win.timeOnFlip(sort_train_board, 'tStopRefresh')  # time at next scr refresh
                sort_train_board.setAutoDraw(False)
        
        # *sort_train_scale* updates
        if sort_train_scale.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            sort_train_scale.frameNStart = frameN  # exact frame index
            sort_train_scale.tStart = t  # local t and not account for scr refresh
            sort_train_scale.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(sort_train_scale, 'tStartRefresh')  # time at next scr refresh
            sort_train_scale.setAutoDraw(True)
        if sort_train_scale.status == STARTED:
            # is it time to stop? (based on global clock, using actual start)
            if tThisFlipGlobal > sort_train_scale.tStartRefresh + 300.0-frameTolerance:
                # keep track of stop time/frame for later
                sort_train_scale.tStop = t  # not accounting for scr refresh
                sort_train_scale.frameNStop = frameN  # exact frame index
                win.timeOnFlip(sort_train_scale, 'tStopRefresh')  # time at next scr refresh
                sort_train_scale.setAutoDraw(False)
        
        # *sort_train_ex_1* updates
        if sort_train_ex_1.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
            # keep track of start time/frame for later
            sort_train_ex_1.frameNStart = frameN  # exact frame index
            sort_train_ex_1.tStart = t  # local t and not account for scr refresh
            sort_train_ex_1.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(sort_train_ex_1, 'tStartRefresh')  # time at next scr refresh
            sort_train_ex_1.setAutoDraw(True)
        if sort_train_ex_1.status == STARTED:
            # is it time to stop? (based on local clock)
            if tThisFlip > 300.0-frameTolerance:
                # keep track of stop time/frame for later
                sort_train_ex_1.tStop = t  # not accounting for scr refresh
                sort_train_ex_1.frameNStop = frameN  # exact frame index
                win.timeOnFlip(sort_train_ex_1, 'tStopRefresh')  # time at next scr refresh
                sort_train_ex_1.setAutoDraw(False)
        
        # *sort_train_ex_2* updates
        if sort_train_ex_2.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
            # keep track of start time/frame for later
            sort_train_ex_2.frameNStart = frameN  # exact frame index
            sort_train_ex_2.tStart = t  # local t and not account for scr refresh
            sort_train_ex_2.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(sort_train_ex_2, 'tStartRefresh')  # time at next scr refresh
            sort_train_ex_2.setAutoDraw(True)
        if sort_train_ex_2.status == STARTED:
            # is it time to stop? (based on local clock)
            if tThisFlip > 300.0-frameTolerance:
                # keep track of stop time/frame for later
                sort_train_ex_2.tStop = t  # not accounting for scr refresh
                sort_train_ex_2.frameNStop = frameN  # exact frame index
                win.timeOnFlip(sort_train_ex_2, 'tStopRefresh')  # time at next scr refresh
                sort_train_ex_2.setAutoDraw(False)
        
        # *sort_train_ex_3* updates
        if sort_train_ex_3.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
            # keep track of start time/frame for later
            sort_train_ex_3.frameNStart = frameN  # exact frame index
            sort_train_ex_3.tStart = t  # local t and not account for scr refresh
            sort_train_ex_3.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(sort_train_ex_3, 'tStartRefresh')  # time at next scr refresh
            sort_train_ex_3.setAutoDraw(True)
        if sort_train_ex_3.status == STARTED:
            # is it time to stop? (based on local clock)
            if tThisFlip > 300.0-frameTolerance:
                # keep track of stop time/frame for later
                sort_train_ex_3.tStop = t  # not accounting for scr refresh
                sort_train_ex_3.frameNStop = frameN  # exact frame index
                win.timeOnFlip(sort_train_ex_3, 'tStopRefresh')  # time at next scr refresh
                sort_train_ex_3.setAutoDraw(False)
        
        # *sort_train_ex_4* updates
        if sort_train_ex_4.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
            # keep track of start time/frame for later
            sort_train_ex_4.frameNStart = frameN  # exact frame index
            sort_train_ex_4.tStart = t  # local t and not account for scr refresh
            sort_train_ex_4.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(sort_train_ex_4, 'tStartRefresh')  # time at next scr refresh
            sort_train_ex_4.setAutoDraw(True)
        if sort_train_ex_4.status == STARTED:
            # is it time to stop? (based on local clock)
            if tThisFlip > 300.0-frameTolerance:
                # keep track of stop time/frame for later
                sort_train_ex_4.tStop = t  # not accounting for scr refresh
                sort_train_ex_4.frameNStop = frameN  # exact frame index
                win.timeOnFlip(sort_train_ex_4, 'tStopRefresh')  # time at next scr refresh
                sort_train_ex_4.setAutoDraw(False)
        
        # *sort_train_ex_5* updates
        if sort_train_ex_5.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
            # keep track of start time/frame for later
            sort_train_ex_5.frameNStart = frameN  # exact frame index
            sort_train_ex_5.tStart = t  # local t and not account for scr refresh
            sort_train_ex_5.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(sort_train_ex_5, 'tStartRefresh')  # time at next scr refresh
            sort_train_ex_5.setAutoDraw(True)
        if sort_train_ex_5.status == STARTED:
            # is it time to stop? (based on local clock)
            if tThisFlip > 300.0-frameTolerance:
                # keep track of stop time/frame for later
                sort_train_ex_5.tStop = t  # not accounting for scr refresh
                sort_train_ex_5.frameNStop = frameN  # exact frame index
                win.timeOnFlip(sort_train_ex_5, 'tStopRefresh')  # time at next scr refresh
                sort_train_ex_5.setAutoDraw(False)
        
        # *sort_train_ex_6* updates
        if sort_train_ex_6.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
            # keep track of start time/frame for later
            sort_train_ex_6.frameNStart = frameN  # exact frame index
            sort_train_ex_6.tStart = t  # local t and not account for scr refresh
            sort_train_ex_6.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(sort_train_ex_6, 'tStartRefresh')  # time at next scr refresh
            sort_train_ex_6.setAutoDraw(True)
        if sort_train_ex_6.status == STARTED:
            # is it time to stop? (based on local clock)
            if tThisFlip > 300.0-frameTolerance:
                # keep track of stop time/frame for later
                sort_train_ex_6.tStop = t  # not accounting for scr refresh
                sort_train_ex_6.frameNStop = frameN  # exact frame index
                win.timeOnFlip(sort_train_ex_6, 'tStopRefresh')  # time at next scr refresh
                sort_train_ex_6.setAutoDraw(False)
        
        # *sort_train_ex_7* updates
        if sort_train_ex_7.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
            # keep track of start time/frame for later
            sort_train_ex_7.frameNStart = frameN  # exact frame index
            sort_train_ex_7.tStart = t  # local t and not account for scr refresh
            sort_train_ex_7.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(sort_train_ex_7, 'tStartRefresh')  # time at next scr refresh
            sort_train_ex_7.setAutoDraw(True)
        if sort_train_ex_7.status == STARTED:
            # is it time to stop? (based on local clock)
            if tThisFlip > 300.0-frameTolerance:
                # keep track of stop time/frame for later
                sort_train_ex_7.tStop = t  # not accounting for scr refresh
                sort_train_ex_7.frameNStop = frameN  # exact frame index
                win.timeOnFlip(sort_train_ex_7, 'tStopRefresh')  # time at next scr refresh
                sort_train_ex_7.setAutoDraw(False)
        
        # *sort_train_ex_8* updates
        if sort_train_ex_8.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
            # keep track of start time/frame for later
            sort_train_ex_8.frameNStart = frameN  # exact frame index
            sort_train_ex_8.tStart = t  # local t and not account for scr refresh
            sort_train_ex_8.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(sort_train_ex_8, 'tStartRefresh')  # time at next scr refresh
            sort_train_ex_8.setAutoDraw(True)
        if sort_train_ex_8.status == STARTED:
            # is it time to stop? (based on local clock)
            if tThisFlip > 300.0-frameTolerance:
                # keep track of stop time/frame for later
                sort_train_ex_8.tStop = t  # not accounting for scr refresh
                sort_train_ex_8.frameNStop = frameN  # exact frame index
                win.timeOnFlip(sort_train_ex_8, 'tStopRefresh')  # time at next scr refresh
                sort_train_ex_8.setAutoDraw(False)
        
        # *sort_train_ex_9* updates
        if sort_train_ex_9.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
            # keep track of start time/frame for later
            sort_train_ex_9.frameNStart = frameN  # exact frame index
            sort_train_ex_9.tStart = t  # local t and not account for scr refresh
            sort_train_ex_9.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(sort_train_ex_9, 'tStartRefresh')  # time at next scr refresh
            sort_train_ex_9.setAutoDraw(True)
        if sort_train_ex_9.status == STARTED:
            # is it time to stop? (based on local clock)
            if tThisFlip > 300.0-frameTolerance:
                # keep track of stop time/frame for later
                sort_train_ex_9.tStop = t  # not accounting for scr refresh
                sort_train_ex_9.frameNStop = frameN  # exact frame index
                win.timeOnFlip(sort_train_ex_9, 'tStopRefresh')  # time at next scr refresh
                sort_train_ex_9.setAutoDraw(False)
        
        # *sort_train_ex_10* updates
        if sort_train_ex_10.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
            # keep track of start time/frame for later
            sort_train_ex_10.frameNStart = frameN  # exact frame index
            sort_train_ex_10.tStart = t  # local t and not account for scr refresh
            sort_train_ex_10.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(sort_train_ex_10, 'tStartRefresh')  # time at next scr refresh
            sort_train_ex_10.setAutoDraw(True)
        if sort_train_ex_10.status == STARTED:
            # is it time to stop? (based on local clock)
            if tThisFlip > 300.0-frameTolerance:
                # keep track of stop time/frame for later
                sort_train_ex_10.tStop = t  # not accounting for scr refresh
                sort_train_ex_10.frameNStop = frameN  # exact frame index
                win.timeOnFlip(sort_train_ex_10, 'tStopRefresh')  # time at next scr refresh
                sort_train_ex_10.setAutoDraw(False)
        
        # *sort_train_ex_11* updates
        if sort_train_ex_11.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
            # keep track of start time/frame for later
            sort_train_ex_11.frameNStart = frameN  # exact frame index
            sort_train_ex_11.tStart = t  # local t and not account for scr refresh
            sort_train_ex_11.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(sort_train_ex_11, 'tStartRefresh')  # time at next scr refresh
            sort_train_ex_11.setAutoDraw(True)
        if sort_train_ex_11.status == STARTED:
            # is it time to stop? (based on local clock)
            if tThisFlip > 300.0-frameTolerance:
                # keep track of stop time/frame for later
                sort_train_ex_11.tStop = t  # not accounting for scr refresh
                sort_train_ex_11.frameNStop = frameN  # exact frame index
                win.timeOnFlip(sort_train_ex_11, 'tStopRefresh')  # time at next scr refresh
                sort_train_ex_11.setAutoDraw(False)
        
        # *sort_train_ex_12* updates
        if sort_train_ex_12.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
            # keep track of start time/frame for later
            sort_train_ex_12.frameNStart = frameN  # exact frame index
            sort_train_ex_12.tStart = t  # local t and not account for scr refresh
            sort_train_ex_12.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(sort_train_ex_12, 'tStartRefresh')  # time at next scr refresh
            sort_train_ex_12.setAutoDraw(True)
        if sort_train_ex_12.status == STARTED:
            # is it time to stop? (based on local clock)
            if tThisFlip > 300.0-frameTolerance:
                # keep track of stop time/frame for later
                sort_train_ex_12.tStop = t  # not accounting for scr refresh
                sort_train_ex_12.frameNStop = frameN  # exact frame index
                win.timeOnFlip(sort_train_ex_12, 'tStopRefresh')  # time at next scr refresh
                sort_train_ex_12.setAutoDraw(False)
        
        # *sort_train_btn* updates
        if sort_train_btn.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
            # keep track of start time/frame for later
            sort_train_btn.frameNStart = frameN  # exact frame index
            sort_train_btn.tStart = t  # local t and not account for scr refresh
            sort_train_btn.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(sort_train_btn, 'tStartRefresh')  # time at next scr refresh
            sort_train_btn.setAutoDraw(True)
        if sort_train_btn.status == STARTED:
            # is it time to stop? (based on local clock)
            if tThisFlip > 300.0-frameTolerance:
                # keep track of stop time/frame for later
                sort_train_btn.tStop = t  # not accounting for scr refresh
                sort_train_btn.frameNStop = frameN  # exact frame index
                win.timeOnFlip(sort_train_btn, 'tStopRefresh')  # time at next scr refresh
                sort_train_btn.setAutoDraw(False)
        
        # *sort_train_compare* updates
        if sort_train_compare.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
            # keep track of start time/frame for later
            sort_train_compare.frameNStart = frameN  # exact frame index
            sort_train_compare.tStart = t  # local t and not account for scr refresh
            sort_train_compare.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(sort_train_compare, 'tStartRefresh')  # time at next scr refresh
            sort_train_compare.setAutoDraw(True)
        if sort_train_compare.status == STARTED:
            # is it time to stop? (based on local clock)
            if tThisFlip > 300.0-frameTolerance:
                # keep track of stop time/frame for later
                sort_train_compare.tStop = t  # not accounting for scr refresh
                sort_train_compare.frameNStop = frameN  # exact frame index
                win.timeOnFlip(sort_train_compare, 'tStopRefresh')  # time at next scr refresh
                sort_train_compare.setAutoDraw(False)
        
        # *sort_train_timer* updates
        if sort_train_timer.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            sort_train_timer.frameNStart = frameN  # exact frame index
            sort_train_timer.tStart = t  # local t and not account for scr refresh
            sort_train_timer.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(sort_train_timer, 'tStartRefresh')  # time at next scr refresh
            sort_train_timer.setAutoDraw(True)
        if sort_train_timer.status == STARTED:
            # is it time to stop? (based on local clock)
            if tThisFlip > 300.0-frameTolerance:
                # keep track of stop time/frame for later
                sort_train_timer.tStop = t  # not accounting for scr refresh
                sort_train_timer.frameNStop = frameN  # exact frame index
                win.timeOnFlip(sort_train_timer, 'tStopRefresh')  # time at next scr refresh
                sort_train_timer.setAutoDraw(False)
        
        # *sort_train_hint* updates
        if sort_train_hint.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            sort_train_hint.frameNStart = frameN  # exact frame index
            sort_train_hint.tStart = t  # local t and not account for scr refresh
            sort_train_hint.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(sort_train_hint, 'tStartRefresh')  # time at next scr refresh
            sort_train_hint.setAutoDraw(True)
        if sort_train_hint.status == STARTED:
            # is it time to stop? (based on local clock)
            if tThisFlip > 300.0-frameTolerance:
                # keep track of stop time/frame for later
                sort_train_hint.tStop = t  # not accounting for scr refresh
                sort_train_hint.frameNStop = frameN  # exact frame index
                win.timeOnFlip(sort_train_hint, 'tStopRefresh')  # time at next scr refresh
                sort_train_hint.setAutoDraw(False)
        frameCnt = frameCnt + 1
        
        if items == []:
            items = enableImageComponents(SORT_TRAINComponents,sort_train_labels,sort_train_path_base)
        
        movingItem = moveItem(sort_train_mouse, movingItem)
        
        if frameCnt % traceSaveAtFrame == 0:
            newTracePos = []
            for i in items:
                newTracePos.append([i.name.split('_')[-1],i.pos[0],i.pos[1]])
            hasMoved = updateTrace(tracePos,newTracePos)
            if hasMoved != []:
                for j in hasMoved:
                    sort_train_trace.append(j)
            tracePos = newTracePos
        
        if sort_train_mouse.isPressedIn(sort_train_compare):
            sort_train_compareN = sort_train_compareN + compare(sort_train_scale,sort_train_input,sort_train_labels,sort_train_scale_instr,sort_train_scale_left,sort_train_scale_right)
            sort_train_hint.text = "Bob uses "+ str(sort_train_compare_limit) + " comparisons\n" + "You have used: " + str(sort_train_compareN)
            
        sort_train_ans = sort_train_res.text
        sort_train_timer.text = timerWarning(sortTrainTimeL,t)
        
        # check for quit (typically the Esc key)
        if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
            core.quit()
        
        # check if all components have finished
        if not continueRoutine:  # a component has requested a forced-end of Routine
            break
        continueRoutine = False  # will revert to True if at least one component still running
        for thisComponent in SORT_TRAINComponents:
            if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                continueRoutine = True
                break  # at least one component has not yet finished
        
        # refresh the screen
        if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
            win.flip()
    
    # -------Ending Routine "SORT_TRAIN"-------
    for thisComponent in SORT_TRAINComponents:
        if hasattr(thisComponent, "setAutoDraw"):
            thisComponent.setAutoDraw(False)
    thisExp.addData('sort_train_compare_records.routineEndVal', sort_train_compare_records)  # Save end routine value
    thisExp.addData('sort_train_trace.routineEndVal', sort_train_trace)  # Save end routine value
    thisExp.addData('sort_train_compareN.routineEndVal', sort_train_compareN)  # Save end routine value
    TRAIN_3.addData('sort_train_scale_right.text',sort_train_scale_right.text)
    TRAIN_3.addData('sort_train_scale_left.text',sort_train_scale_left.text)
    TRAIN_3.addData('sort_train_res.text',sort_train_res.text)
    TRAIN_3.addData('sort_train_ex_1.started', sort_train_ex_1.tStartRefresh)
    TRAIN_3.addData('sort_train_ex_1.stopped', sort_train_ex_1.tStopRefresh)
    # store data for TRAIN_3 (TrialHandler)
    x, y = sort_train_mouse.getPos()
    buttons = sort_train_mouse.getPressed()
    TRAIN_3.addData('sort_train_mouse.x', x)
    TRAIN_3.addData('sort_train_mouse.y', y)
    TRAIN_3.addData('sort_train_mouse.leftButton', buttons[0])
    TRAIN_3.addData('sort_train_mouse.midButton', buttons[1])
    TRAIN_3.addData('sort_train_mouse.rightButton', buttons[2])
    pass
    
    # ------Prepare to start Routine "SORT_EXPL"-------
    continueRoutine = True
    routineTimer.add(60.000000)
    # update component parameters for each repeat
    sort_expl_compare_records = []  # Set routine start values for sort_expl_compare_records
    sort_expl_trace = []  # Set routine start values for sort_expl_trace
    sort_expl_labels = encryption  # Set routine start values for sort_expl_labels
    thisExp.addData('sort_expl_labels.routineStartVal', sort_expl_labels)  # Save exp start value
    sort_expl_compareN = 0  # Set routine start values for sort_expl_compareN
    sort_expl_path_base = img_path_base  # Set routine start values for sort_expl_path_base
    sort_expl_input = input  # Set routine start values for sort_expl_input
    thisExp.addData('sort_expl_input.routineStartVal', sort_expl_input)  # Save exp start value
    sort_expl_scale_instr.setColor('white', colorSpace='rgb')
    sort_expl_scale_instr.setText('COMPARE weights by typing fruit labels in both LHS and RHS textboxes')
    sort_expl_scale_instr.setHeight(0.02)
    sort_expl_feedback_1.setColor('white', colorSpace='rgb')
    sort_expl_feedback_1.setText('')
    sort_expl_feedback_2.setColor('white', colorSpace='rgb')
    sort_expl_feedback_2.setText('')
    sort_expl_scale_right.reset()
    sort_expl_scale_right.setText('')
    sort_expl_scale_left.reset()
    sort_expl_scale_left.setText('')
    sort_expl_res.reset()
    sort_expl_res.setText('')
    sort_expl_board.setImage('materials/merge_sort/imgs/purple_diamond.png')
    sort_expl_scale.setImage(scaleEqPath)
    sort_expl_ex_1.setOpacity(0.0)
    sort_expl_ex_1.setPos((-0.25, 0.3))
    sort_expl_ex_2.setOpacity(0.0)
    sort_expl_ex_2.setPos((-0.2, 0.3))
    sort_expl_ex_3.setOpacity(0.0)
    sort_expl_ex_3.setPos((-0.15, 0.3))
    sort_expl_ex_4.setOpacity(0.0)
    sort_expl_ex_4.setPos((-0.1, 0.3))
    sort_expl_ex_5.setOpacity(0.0)
    sort_expl_ex_5.setPos((-0.05, 0.3))
    sort_expl_ex_6.setOpacity(0.0)
    sort_expl_ex_6.setPos((0.0, 0.3))
    sort_expl_ex_7.setOpacity(0.0)
    sort_expl_ex_7.setPos((0.05, 0.3))
    sort_expl_ex_8.setOpacity(0.0)
    sort_expl_ex_8.setPos((0.1,0.3))
    sort_expl_ex_9.setOpacity(0.0)
    sort_expl_ex_9.setPos((0.15, 0.3))
    sort_expl_ex_10.setOpacity(0.0)
    sort_expl_ex_10.setPos((0.20, 0.3))
    sort_expl_ex_11.setOpacity(0.0)
    sort_expl_ex_11.setPos((0.25, 0.3))
    sort_expl_ex_12.setOpacity(0.0)
    sort_expl_ex_12.setPos((0.30, 0.3))
    # setup some python lists for storing info about the sort_expl_mouse
    gotValidClick = False  # until a click is received
    sort_expl_timer.setText('')
    sort_expl_hint.setText('')
    positions = []
    for u in items:
        positions.append(u.pos)
        
    items = []
    frameCnt = 0
    tracePos = []
    movingItem = None
    
    sort_expl_hint.text = "Bob uses "+ str(sort_train_compare_limit) + " comparisons\n" + "You have used: " + str(sort_train_compareN+sort_expl_compareN)
    sort_expl_res.text = sort_train_res.text
    checkSortTrainAns(sort_expl_input,sort_expl_labels,sort_expl_res.text,sort_expl_feedback_1,sort_expl_feedback_2)
    
    (x, y) = sort_expl_board.pos
    (w,h) = sort_expl_board.size
    top = y+h/2
    bot = y-h/2
    left = x-w/2
    right = x+w/2
    # keep track of which components have finished
    SORT_EXPLComponents = [sort_expl_scale_instr, sort_expl_feedback_1, sort_expl_feedback_2, sort_expl_instr, sort_expl_scale_right, sort_expl_scale_left, sort_expl_res, sort_expl_sep, sort_expl_board, sort_expl_scale, sort_expl_ex_1, sort_expl_ex_2, sort_expl_ex_3, sort_expl_ex_4, sort_expl_ex_5, sort_expl_ex_6, sort_expl_ex_7, sort_expl_ex_8, sort_expl_ex_9, sort_expl_ex_10, sort_expl_ex_11, sort_expl_ex_12, sort_expl_btn, sort_expl_compare, sort_expl_mouse, sort_expl_timer, sort_expl_hint]
    for thisComponent in SORT_EXPLComponents:
        thisComponent.tStart = None
        thisComponent.tStop = None
        thisComponent.tStartRefresh = None
        thisComponent.tStopRefresh = None
        if hasattr(thisComponent, 'status'):
            thisComponent.status = NOT_STARTED
    # reset timers
    t = 0
    _timeToFirstFrame = win.getFutureFlipTime(clock="now")
    SORT_EXPLClock.reset(-_timeToFirstFrame)  # t0 is time of first possible flip
    frameN = -1
    
    # -------Run Routine "SORT_EXPL"-------
    while continueRoutine and routineTimer.getTime() > 0:
        # get current time
        t = SORT_EXPLClock.getTime()
        tThisFlip = win.getFutureFlipTime(clock=SORT_EXPLClock)
        tThisFlipGlobal = win.getFutureFlipTime(clock=None)
        frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
        # update/draw components on each frame
        
        # *sort_expl_scale_instr* updates
        if sort_expl_scale_instr.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            sort_expl_scale_instr.frameNStart = frameN  # exact frame index
            sort_expl_scale_instr.tStart = t  # local t and not account for scr refresh
            sort_expl_scale_instr.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(sort_expl_scale_instr, 'tStartRefresh')  # time at next scr refresh
            sort_expl_scale_instr.setAutoDraw(True)
        if sort_expl_scale_instr.status == STARTED:
            # is it time to stop? (based on global clock, using actual start)
            if tThisFlipGlobal > sort_expl_scale_instr.tStartRefresh + 60.0-frameTolerance:
                # keep track of stop time/frame for later
                sort_expl_scale_instr.tStop = t  # not accounting for scr refresh
                sort_expl_scale_instr.frameNStop = frameN  # exact frame index
                win.timeOnFlip(sort_expl_scale_instr, 'tStopRefresh')  # time at next scr refresh
                sort_expl_scale_instr.setAutoDraw(False)
        
        # *sort_expl_feedback_1* updates
        if sort_expl_feedback_1.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
            # keep track of start time/frame for later
            sort_expl_feedback_1.frameNStart = frameN  # exact frame index
            sort_expl_feedback_1.tStart = t  # local t and not account for scr refresh
            sort_expl_feedback_1.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(sort_expl_feedback_1, 'tStartRefresh')  # time at next scr refresh
            sort_expl_feedback_1.setAutoDraw(True)
        if sort_expl_feedback_1.status == STARTED:
            # is it time to stop? (based on local clock)
            if tThisFlip > 60.0-frameTolerance:
                # keep track of stop time/frame for later
                sort_expl_feedback_1.tStop = t  # not accounting for scr refresh
                sort_expl_feedback_1.frameNStop = frameN  # exact frame index
                win.timeOnFlip(sort_expl_feedback_1, 'tStopRefresh')  # time at next scr refresh
                sort_expl_feedback_1.setAutoDraw(False)
        
        # *sort_expl_feedback_2* updates
        if sort_expl_feedback_2.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
            # keep track of start time/frame for later
            sort_expl_feedback_2.frameNStart = frameN  # exact frame index
            sort_expl_feedback_2.tStart = t  # local t and not account for scr refresh
            sort_expl_feedback_2.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(sort_expl_feedback_2, 'tStartRefresh')  # time at next scr refresh
            sort_expl_feedback_2.setAutoDraw(True)
        if sort_expl_feedback_2.status == STARTED:
            # is it time to stop? (based on local clock)
            if tThisFlip > 60.0-frameTolerance:
                # keep track of stop time/frame for later
                sort_expl_feedback_2.tStop = t  # not accounting for scr refresh
                sort_expl_feedback_2.frameNStop = frameN  # exact frame index
                win.timeOnFlip(sort_expl_feedback_2, 'tStopRefresh')  # time at next scr refresh
                sort_expl_feedback_2.setAutoDraw(False)
        
        # *sort_expl_instr* updates
        if sort_expl_instr.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            sort_expl_instr.frameNStart = frameN  # exact frame index
            sort_expl_instr.tStart = t  # local t and not account for scr refresh
            sort_expl_instr.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(sort_expl_instr, 'tStartRefresh')  # time at next scr refresh
            sort_expl_instr.setAutoDraw(True)
        if sort_expl_instr.status == STARTED:
            # is it time to stop? (based on global clock, using actual start)
            if tThisFlipGlobal > sort_expl_instr.tStartRefresh + 60.0-frameTolerance:
                # keep track of stop time/frame for later
                sort_expl_instr.tStop = t  # not accounting for scr refresh
                sort_expl_instr.frameNStop = frameN  # exact frame index
                win.timeOnFlip(sort_expl_instr, 'tStopRefresh')  # time at next scr refresh
                sort_expl_instr.setAutoDraw(False)
        
        # *sort_expl_scale_right* updates
        if sort_expl_scale_right.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            sort_expl_scale_right.frameNStart = frameN  # exact frame index
            sort_expl_scale_right.tStart = t  # local t and not account for scr refresh
            sort_expl_scale_right.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(sort_expl_scale_right, 'tStartRefresh')  # time at next scr refresh
            sort_expl_scale_right.setAutoDraw(True)
        if sort_expl_scale_right.status == STARTED:
            # is it time to stop? (based on global clock, using actual start)
            if tThisFlipGlobal > sort_expl_scale_right.tStartRefresh + 60.0-frameTolerance:
                # keep track of stop time/frame for later
                sort_expl_scale_right.tStop = t  # not accounting for scr refresh
                sort_expl_scale_right.frameNStop = frameN  # exact frame index
                win.timeOnFlip(sort_expl_scale_right, 'tStopRefresh')  # time at next scr refresh
                sort_expl_scale_right.setAutoDraw(False)
        
        # *sort_expl_scale_left* updates
        if sort_expl_scale_left.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            sort_expl_scale_left.frameNStart = frameN  # exact frame index
            sort_expl_scale_left.tStart = t  # local t and not account for scr refresh
            sort_expl_scale_left.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(sort_expl_scale_left, 'tStartRefresh')  # time at next scr refresh
            sort_expl_scale_left.setAutoDraw(True)
        if sort_expl_scale_left.status == STARTED:
            # is it time to stop? (based on global clock, using actual start)
            if tThisFlipGlobal > sort_expl_scale_left.tStartRefresh + 60.0-frameTolerance:
                # keep track of stop time/frame for later
                sort_expl_scale_left.tStop = t  # not accounting for scr refresh
                sort_expl_scale_left.frameNStop = frameN  # exact frame index
                win.timeOnFlip(sort_expl_scale_left, 'tStopRefresh')  # time at next scr refresh
                sort_expl_scale_left.setAutoDraw(False)
        
        # *sort_expl_res* updates
        if sort_expl_res.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            sort_expl_res.frameNStart = frameN  # exact frame index
            sort_expl_res.tStart = t  # local t and not account for scr refresh
            sort_expl_res.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(sort_expl_res, 'tStartRefresh')  # time at next scr refresh
            sort_expl_res.setAutoDraw(True)
        if sort_expl_res.status == STARTED:
            # is it time to stop? (based on global clock, using actual start)
            if tThisFlipGlobal > sort_expl_res.tStartRefresh + 60.0-frameTolerance:
                # keep track of stop time/frame for later
                sort_expl_res.tStop = t  # not accounting for scr refresh
                sort_expl_res.frameNStop = frameN  # exact frame index
                win.timeOnFlip(sort_expl_res, 'tStopRefresh')  # time at next scr refresh
                sort_expl_res.setAutoDraw(False)
        
        # *sort_expl_sep* updates
        if sort_expl_sep.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            sort_expl_sep.frameNStart = frameN  # exact frame index
            sort_expl_sep.tStart = t  # local t and not account for scr refresh
            sort_expl_sep.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(sort_expl_sep, 'tStartRefresh')  # time at next scr refresh
            sort_expl_sep.setAutoDraw(True)
        if sort_expl_sep.status == STARTED:
            # is it time to stop? (based on global clock, using actual start)
            if tThisFlipGlobal > sort_expl_sep.tStartRefresh + 60.0-frameTolerance:
                # keep track of stop time/frame for later
                sort_expl_sep.tStop = t  # not accounting for scr refresh
                sort_expl_sep.frameNStop = frameN  # exact frame index
                win.timeOnFlip(sort_expl_sep, 'tStopRefresh')  # time at next scr refresh
                sort_expl_sep.setAutoDraw(False)
        
        # *sort_expl_board* updates
        if sort_expl_board.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            sort_expl_board.frameNStart = frameN  # exact frame index
            sort_expl_board.tStart = t  # local t and not account for scr refresh
            sort_expl_board.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(sort_expl_board, 'tStartRefresh')  # time at next scr refresh
            sort_expl_board.setAutoDraw(True)
        if sort_expl_board.status == STARTED:
            # is it time to stop? (based on global clock, using actual start)
            if tThisFlipGlobal > sort_expl_board.tStartRefresh + 60.0-frameTolerance:
                # keep track of stop time/frame for later
                sort_expl_board.tStop = t  # not accounting for scr refresh
                sort_expl_board.frameNStop = frameN  # exact frame index
                win.timeOnFlip(sort_expl_board, 'tStopRefresh')  # time at next scr refresh
                sort_expl_board.setAutoDraw(False)
        
        # *sort_expl_scale* updates
        if sort_expl_scale.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            sort_expl_scale.frameNStart = frameN  # exact frame index
            sort_expl_scale.tStart = t  # local t and not account for scr refresh
            sort_expl_scale.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(sort_expl_scale, 'tStartRefresh')  # time at next scr refresh
            sort_expl_scale.setAutoDraw(True)
        if sort_expl_scale.status == STARTED:
            # is it time to stop? (based on global clock, using actual start)
            if tThisFlipGlobal > sort_expl_scale.tStartRefresh + 60.0-frameTolerance:
                # keep track of stop time/frame for later
                sort_expl_scale.tStop = t  # not accounting for scr refresh
                sort_expl_scale.frameNStop = frameN  # exact frame index
                win.timeOnFlip(sort_expl_scale, 'tStopRefresh')  # time at next scr refresh
                sort_expl_scale.setAutoDraw(False)
        
        # *sort_expl_ex_1* updates
        if sort_expl_ex_1.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
            # keep track of start time/frame for later
            sort_expl_ex_1.frameNStart = frameN  # exact frame index
            sort_expl_ex_1.tStart = t  # local t and not account for scr refresh
            sort_expl_ex_1.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(sort_expl_ex_1, 'tStartRefresh')  # time at next scr refresh
            sort_expl_ex_1.setAutoDraw(True)
        if sort_expl_ex_1.status == STARTED:
            # is it time to stop? (based on local clock)
            if tThisFlip > 60.0-frameTolerance:
                # keep track of stop time/frame for later
                sort_expl_ex_1.tStop = t  # not accounting for scr refresh
                sort_expl_ex_1.frameNStop = frameN  # exact frame index
                win.timeOnFlip(sort_expl_ex_1, 'tStopRefresh')  # time at next scr refresh
                sort_expl_ex_1.setAutoDraw(False)
        
        # *sort_expl_ex_2* updates
        if sort_expl_ex_2.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
            # keep track of start time/frame for later
            sort_expl_ex_2.frameNStart = frameN  # exact frame index
            sort_expl_ex_2.tStart = t  # local t and not account for scr refresh
            sort_expl_ex_2.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(sort_expl_ex_2, 'tStartRefresh')  # time at next scr refresh
            sort_expl_ex_2.setAutoDraw(True)
        if sort_expl_ex_2.status == STARTED:
            # is it time to stop? (based on local clock)
            if tThisFlip > 60.0-frameTolerance:
                # keep track of stop time/frame for later
                sort_expl_ex_2.tStop = t  # not accounting for scr refresh
                sort_expl_ex_2.frameNStop = frameN  # exact frame index
                win.timeOnFlip(sort_expl_ex_2, 'tStopRefresh')  # time at next scr refresh
                sort_expl_ex_2.setAutoDraw(False)
        
        # *sort_expl_ex_3* updates
        if sort_expl_ex_3.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
            # keep track of start time/frame for later
            sort_expl_ex_3.frameNStart = frameN  # exact frame index
            sort_expl_ex_3.tStart = t  # local t and not account for scr refresh
            sort_expl_ex_3.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(sort_expl_ex_3, 'tStartRefresh')  # time at next scr refresh
            sort_expl_ex_3.setAutoDraw(True)
        if sort_expl_ex_3.status == STARTED:
            # is it time to stop? (based on local clock)
            if tThisFlip > 60.0-frameTolerance:
                # keep track of stop time/frame for later
                sort_expl_ex_3.tStop = t  # not accounting for scr refresh
                sort_expl_ex_3.frameNStop = frameN  # exact frame index
                win.timeOnFlip(sort_expl_ex_3, 'tStopRefresh')  # time at next scr refresh
                sort_expl_ex_3.setAutoDraw(False)
        
        # *sort_expl_ex_4* updates
        if sort_expl_ex_4.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
            # keep track of start time/frame for later
            sort_expl_ex_4.frameNStart = frameN  # exact frame index
            sort_expl_ex_4.tStart = t  # local t and not account for scr refresh
            sort_expl_ex_4.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(sort_expl_ex_4, 'tStartRefresh')  # time at next scr refresh
            sort_expl_ex_4.setAutoDraw(True)
        if sort_expl_ex_4.status == STARTED:
            # is it time to stop? (based on local clock)
            if tThisFlip > 60.0-frameTolerance:
                # keep track of stop time/frame for later
                sort_expl_ex_4.tStop = t  # not accounting for scr refresh
                sort_expl_ex_4.frameNStop = frameN  # exact frame index
                win.timeOnFlip(sort_expl_ex_4, 'tStopRefresh')  # time at next scr refresh
                sort_expl_ex_4.setAutoDraw(False)
        
        # *sort_expl_ex_5* updates
        if sort_expl_ex_5.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
            # keep track of start time/frame for later
            sort_expl_ex_5.frameNStart = frameN  # exact frame index
            sort_expl_ex_5.tStart = t  # local t and not account for scr refresh
            sort_expl_ex_5.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(sort_expl_ex_5, 'tStartRefresh')  # time at next scr refresh
            sort_expl_ex_5.setAutoDraw(True)
        if sort_expl_ex_5.status == STARTED:
            # is it time to stop? (based on local clock)
            if tThisFlip > 60.0-frameTolerance:
                # keep track of stop time/frame for later
                sort_expl_ex_5.tStop = t  # not accounting for scr refresh
                sort_expl_ex_5.frameNStop = frameN  # exact frame index
                win.timeOnFlip(sort_expl_ex_5, 'tStopRefresh')  # time at next scr refresh
                sort_expl_ex_5.setAutoDraw(False)
        
        # *sort_expl_ex_6* updates
        if sort_expl_ex_6.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
            # keep track of start time/frame for later
            sort_expl_ex_6.frameNStart = frameN  # exact frame index
            sort_expl_ex_6.tStart = t  # local t and not account for scr refresh
            sort_expl_ex_6.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(sort_expl_ex_6, 'tStartRefresh')  # time at next scr refresh
            sort_expl_ex_6.setAutoDraw(True)
        if sort_expl_ex_6.status == STARTED:
            # is it time to stop? (based on local clock)
            if tThisFlip > 60.0-frameTolerance:
                # keep track of stop time/frame for later
                sort_expl_ex_6.tStop = t  # not accounting for scr refresh
                sort_expl_ex_6.frameNStop = frameN  # exact frame index
                win.timeOnFlip(sort_expl_ex_6, 'tStopRefresh')  # time at next scr refresh
                sort_expl_ex_6.setAutoDraw(False)
        
        # *sort_expl_ex_7* updates
        if sort_expl_ex_7.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
            # keep track of start time/frame for later
            sort_expl_ex_7.frameNStart = frameN  # exact frame index
            sort_expl_ex_7.tStart = t  # local t and not account for scr refresh
            sort_expl_ex_7.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(sort_expl_ex_7, 'tStartRefresh')  # time at next scr refresh
            sort_expl_ex_7.setAutoDraw(True)
        if sort_expl_ex_7.status == STARTED:
            # is it time to stop? (based on local clock)
            if tThisFlip > 60.0-frameTolerance:
                # keep track of stop time/frame for later
                sort_expl_ex_7.tStop = t  # not accounting for scr refresh
                sort_expl_ex_7.frameNStop = frameN  # exact frame index
                win.timeOnFlip(sort_expl_ex_7, 'tStopRefresh')  # time at next scr refresh
                sort_expl_ex_7.setAutoDraw(False)
        
        # *sort_expl_ex_8* updates
        if sort_expl_ex_8.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
            # keep track of start time/frame for later
            sort_expl_ex_8.frameNStart = frameN  # exact frame index
            sort_expl_ex_8.tStart = t  # local t and not account for scr refresh
            sort_expl_ex_8.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(sort_expl_ex_8, 'tStartRefresh')  # time at next scr refresh
            sort_expl_ex_8.setAutoDraw(True)
        if sort_expl_ex_8.status == STARTED:
            # is it time to stop? (based on local clock)
            if tThisFlip > 60.0-frameTolerance:
                # keep track of stop time/frame for later
                sort_expl_ex_8.tStop = t  # not accounting for scr refresh
                sort_expl_ex_8.frameNStop = frameN  # exact frame index
                win.timeOnFlip(sort_expl_ex_8, 'tStopRefresh')  # time at next scr refresh
                sort_expl_ex_8.setAutoDraw(False)
        
        # *sort_expl_ex_9* updates
        if sort_expl_ex_9.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
            # keep track of start time/frame for later
            sort_expl_ex_9.frameNStart = frameN  # exact frame index
            sort_expl_ex_9.tStart = t  # local t and not account for scr refresh
            sort_expl_ex_9.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(sort_expl_ex_9, 'tStartRefresh')  # time at next scr refresh
            sort_expl_ex_9.setAutoDraw(True)
        if sort_expl_ex_9.status == STARTED:
            # is it time to stop? (based on local clock)
            if tThisFlip > 60.0-frameTolerance:
                # keep track of stop time/frame for later
                sort_expl_ex_9.tStop = t  # not accounting for scr refresh
                sort_expl_ex_9.frameNStop = frameN  # exact frame index
                win.timeOnFlip(sort_expl_ex_9, 'tStopRefresh')  # time at next scr refresh
                sort_expl_ex_9.setAutoDraw(False)
        
        # *sort_expl_ex_10* updates
        if sort_expl_ex_10.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
            # keep track of start time/frame for later
            sort_expl_ex_10.frameNStart = frameN  # exact frame index
            sort_expl_ex_10.tStart = t  # local t and not account for scr refresh
            sort_expl_ex_10.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(sort_expl_ex_10, 'tStartRefresh')  # time at next scr refresh
            sort_expl_ex_10.setAutoDraw(True)
        if sort_expl_ex_10.status == STARTED:
            # is it time to stop? (based on local clock)
            if tThisFlip > 60.0-frameTolerance:
                # keep track of stop time/frame for later
                sort_expl_ex_10.tStop = t  # not accounting for scr refresh
                sort_expl_ex_10.frameNStop = frameN  # exact frame index
                win.timeOnFlip(sort_expl_ex_10, 'tStopRefresh')  # time at next scr refresh
                sort_expl_ex_10.setAutoDraw(False)
        
        # *sort_expl_ex_11* updates
        if sort_expl_ex_11.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
            # keep track of start time/frame for later
            sort_expl_ex_11.frameNStart = frameN  # exact frame index
            sort_expl_ex_11.tStart = t  # local t and not account for scr refresh
            sort_expl_ex_11.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(sort_expl_ex_11, 'tStartRefresh')  # time at next scr refresh
            sort_expl_ex_11.setAutoDraw(True)
        if sort_expl_ex_11.status == STARTED:
            # is it time to stop? (based on local clock)
            if tThisFlip > 60.0-frameTolerance:
                # keep track of stop time/frame for later
                sort_expl_ex_11.tStop = t  # not accounting for scr refresh
                sort_expl_ex_11.frameNStop = frameN  # exact frame index
                win.timeOnFlip(sort_expl_ex_11, 'tStopRefresh')  # time at next scr refresh
                sort_expl_ex_11.setAutoDraw(False)
        
        # *sort_expl_ex_12* updates
        if sort_expl_ex_12.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
            # keep track of start time/frame for later
            sort_expl_ex_12.frameNStart = frameN  # exact frame index
            sort_expl_ex_12.tStart = t  # local t and not account for scr refresh
            sort_expl_ex_12.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(sort_expl_ex_12, 'tStartRefresh')  # time at next scr refresh
            sort_expl_ex_12.setAutoDraw(True)
        if sort_expl_ex_12.status == STARTED:
            # is it time to stop? (based on local clock)
            if tThisFlip > 60.0-frameTolerance:
                # keep track of stop time/frame for later
                sort_expl_ex_12.tStop = t  # not accounting for scr refresh
                sort_expl_ex_12.frameNStop = frameN  # exact frame index
                win.timeOnFlip(sort_expl_ex_12, 'tStopRefresh')  # time at next scr refresh
                sort_expl_ex_12.setAutoDraw(False)
        
        # *sort_expl_btn* updates
        if sort_expl_btn.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
            # keep track of start time/frame for later
            sort_expl_btn.frameNStart = frameN  # exact frame index
            sort_expl_btn.tStart = t  # local t and not account for scr refresh
            sort_expl_btn.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(sort_expl_btn, 'tStartRefresh')  # time at next scr refresh
            sort_expl_btn.setAutoDraw(True)
        if sort_expl_btn.status == STARTED:
            # is it time to stop? (based on local clock)
            if tThisFlip > 60.0-frameTolerance:
                # keep track of stop time/frame for later
                sort_expl_btn.tStop = t  # not accounting for scr refresh
                sort_expl_btn.frameNStop = frameN  # exact frame index
                win.timeOnFlip(sort_expl_btn, 'tStopRefresh')  # time at next scr refresh
                sort_expl_btn.setAutoDraw(False)
        
        # *sort_expl_compare* updates
        if sort_expl_compare.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
            # keep track of start time/frame for later
            sort_expl_compare.frameNStart = frameN  # exact frame index
            sort_expl_compare.tStart = t  # local t and not account for scr refresh
            sort_expl_compare.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(sort_expl_compare, 'tStartRefresh')  # time at next scr refresh
            sort_expl_compare.setAutoDraw(True)
        if sort_expl_compare.status == STARTED:
            # is it time to stop? (based on local clock)
            if tThisFlip > 60.0-frameTolerance:
                # keep track of stop time/frame for later
                sort_expl_compare.tStop = t  # not accounting for scr refresh
                sort_expl_compare.frameNStop = frameN  # exact frame index
                win.timeOnFlip(sort_expl_compare, 'tStopRefresh')  # time at next scr refresh
                sort_expl_compare.setAutoDraw(False)
        
        # *sort_expl_timer* updates
        if sort_expl_timer.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            sort_expl_timer.frameNStart = frameN  # exact frame index
            sort_expl_timer.tStart = t  # local t and not account for scr refresh
            sort_expl_timer.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(sort_expl_timer, 'tStartRefresh')  # time at next scr refresh
            sort_expl_timer.setAutoDraw(True)
        if sort_expl_timer.status == STARTED:
            # is it time to stop? (based on local clock)
            if tThisFlip > 60.0-frameTolerance:
                # keep track of stop time/frame for later
                sort_expl_timer.tStop = t  # not accounting for scr refresh
                sort_expl_timer.frameNStop = frameN  # exact frame index
                win.timeOnFlip(sort_expl_timer, 'tStopRefresh')  # time at next scr refresh
                sort_expl_timer.setAutoDraw(False)
        
        # *sort_expl_hint* updates
        if sort_expl_hint.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            sort_expl_hint.frameNStart = frameN  # exact frame index
            sort_expl_hint.tStart = t  # local t and not account for scr refresh
            sort_expl_hint.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(sort_expl_hint, 'tStartRefresh')  # time at next scr refresh
            sort_expl_hint.setAutoDraw(True)
        if sort_expl_hint.status == STARTED:
            # is it time to stop? (based on local clock)
            if tThisFlip > 60.0-frameTolerance:
                # keep track of stop time/frame for later
                sort_expl_hint.tStop = t  # not accounting for scr refresh
                sort_expl_hint.frameNStop = frameN  # exact frame index
                win.timeOnFlip(sort_expl_hint, 'tStopRefresh')  # time at next scr refresh
                sort_expl_hint.setAutoDraw(False)
        frameCnt = frameCnt + 1
        if items == []:
            items = enableImageComponents(SORT_EXPLComponents,sort_expl_labels,sort_expl_path_base)
            for i in range(len(items)):
                items[i].pos = positions[i]
                
        movingItem = moveItem(sort_expl_mouse, movingItem)
        
        if frameCnt % traceSaveAtFrame == 0:
            newTracePos = []
            for i in items:
                newTracePos.append([i.name.split('_')[-1],i.pos[0],i.pos[1]])
            hasMoved = updateTrace(tracePos,newTracePos)
            if hasMoved != []:
                for j in hasMoved:
                    sort_expl_trace.append(j)
            tracePos = newTracePos
        
        if sort_expl_mouse.isPressedIn(sort_expl_compare):
            sort_expl_compareN = sort_expl_compareN + compare(sort_expl_scale,sort_expl_input,sort_expl_labels,sort_expl_scale_instr,sort_expl_scale_left,sort_expl_scale_right)
            sort_expl_hint.text = "Bob uses "+ str(sort_train_compare_limit) + " comparisons\n" + "You have used: " + str(sort_train_compareN+sort_expl_compareN)
            
        sort_expl_timer.text = timerWarning(sortExplTimeL,t)
        
        # check for quit (typically the Esc key)
        if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
            core.quit()
        
        # check if all components have finished
        if not continueRoutine:  # a component has requested a forced-end of Routine
            break
        continueRoutine = False  # will revert to True if at least one component still running
        for thisComponent in SORT_EXPLComponents:
            if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                continueRoutine = True
                break  # at least one component has not yet finished
        
        # refresh the screen
        if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
            win.flip()
    
    # -------Ending Routine "SORT_EXPL"-------
    for thisComponent in SORT_EXPLComponents:
        if hasattr(thisComponent, "setAutoDraw"):
            thisComponent.setAutoDraw(False)
    thisExp.addData('sort_expl_compare_records.routineEndVal', sort_expl_compare_records)  # Save end routine value
    thisExp.addData('sort_expl_trace.routineEndVal', sort_expl_trace)  # Save end routine value
    thisExp.addData('sort_expl_compareN.routineEndVal', sort_expl_compareN)  # Save end routine value
    TRAIN_3.addData('sort_expl_feedback_1.started', sort_expl_feedback_1.tStartRefresh)
    TRAIN_3.addData('sort_expl_feedback_1.stopped', sort_expl_feedback_1.tStopRefresh)
    TRAIN_3.addData('sort_expl_feedback_2.started', sort_expl_feedback_2.tStartRefresh)
    TRAIN_3.addData('sort_expl_feedback_2.stopped', sort_expl_feedback_2.tStopRefresh)
    TRAIN_3.addData('sort_expl_scale_right.text',sort_expl_scale_right.text)
    TRAIN_3.addData('sort_expl_scale_left.text',sort_expl_scale_left.text)
    # store data for TRAIN_3 (TrialHandler)
    x, y = sort_expl_mouse.getPos()
    buttons = sort_expl_mouse.getPressed()
    TRAIN_3.addData('sort_expl_mouse.x', x)
    TRAIN_3.addData('sort_expl_mouse.y', y)
    TRAIN_3.addData('sort_expl_mouse.leftButton', buttons[0])
    TRAIN_3.addData('sort_expl_mouse.midButton', buttons[1])
    TRAIN_3.addData('sort_expl_mouse.rightButton', buttons[2])
    pass
    thisExp.nextEntry()
    
# completed 1.0 repeats of 'TRAIN_3'


# ------Prepare to start Routine "SORT_TEST_INTRO"-------
continueRoutine = True
routineTimer.add(120.000000)
# update component parameters for each repeat
# setup some python lists for storing info about the sort_test_intro_mouse
gotValidClick = False  # until a click is received
# keep track of which components have finished
SORT_TEST_INTROComponents = [intro_text_7, bob_4, sort_example_2, door_7, sort_test_intro_btn, sort_test_intro_mouse]
for thisComponent in SORT_TEST_INTROComponents:
    thisComponent.tStart = None
    thisComponent.tStop = None
    thisComponent.tStartRefresh = None
    thisComponent.tStopRefresh = None
    if hasattr(thisComponent, 'status'):
        thisComponent.status = NOT_STARTED
# reset timers
t = 0
_timeToFirstFrame = win.getFutureFlipTime(clock="now")
SORT_TEST_INTROClock.reset(-_timeToFirstFrame)  # t0 is time of first possible flip
frameN = -1

# -------Run Routine "SORT_TEST_INTRO"-------
while continueRoutine and routineTimer.getTime() > 0:
    # get current time
    t = SORT_TEST_INTROClock.getTime()
    tThisFlip = win.getFutureFlipTime(clock=SORT_TEST_INTROClock)
    tThisFlipGlobal = win.getFutureFlipTime(clock=None)
    frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
    # update/draw components on each frame
    
    # *intro_text_7* updates
    if intro_text_7.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        intro_text_7.frameNStart = frameN  # exact frame index
        intro_text_7.tStart = t  # local t and not account for scr refresh
        intro_text_7.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(intro_text_7, 'tStartRefresh')  # time at next scr refresh
        intro_text_7.setAutoDraw(True)
    if intro_text_7.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > intro_text_7.tStartRefresh + 120.0-frameTolerance:
            # keep track of stop time/frame for later
            intro_text_7.tStop = t  # not accounting for scr refresh
            intro_text_7.frameNStop = frameN  # exact frame index
            win.timeOnFlip(intro_text_7, 'tStopRefresh')  # time at next scr refresh
            intro_text_7.setAutoDraw(False)
    
    # *bob_4* updates
    if bob_4.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        bob_4.frameNStart = frameN  # exact frame index
        bob_4.tStart = t  # local t and not account for scr refresh
        bob_4.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(bob_4, 'tStartRefresh')  # time at next scr refresh
        bob_4.setAutoDraw(True)
    if bob_4.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > bob_4.tStartRefresh + 120.0-frameTolerance:
            # keep track of stop time/frame for later
            bob_4.tStop = t  # not accounting for scr refresh
            bob_4.frameNStop = frameN  # exact frame index
            win.timeOnFlip(bob_4, 'tStopRefresh')  # time at next scr refresh
            bob_4.setAutoDraw(False)
    
    # *sort_example_2* updates
    if sort_example_2.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        sort_example_2.frameNStart = frameN  # exact frame index
        sort_example_2.tStart = t  # local t and not account for scr refresh
        sort_example_2.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(sort_example_2, 'tStartRefresh')  # time at next scr refresh
        sort_example_2.setAutoDraw(True)
    if sort_example_2.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > sort_example_2.tStartRefresh + 120.0-frameTolerance:
            # keep track of stop time/frame for later
            sort_example_2.tStop = t  # not accounting for scr refresh
            sort_example_2.frameNStop = frameN  # exact frame index
            win.timeOnFlip(sort_example_2, 'tStopRefresh')  # time at next scr refresh
            sort_example_2.setAutoDraw(False)
    
    # *door_7* updates
    if door_7.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        door_7.frameNStart = frameN  # exact frame index
        door_7.tStart = t  # local t and not account for scr refresh
        door_7.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(door_7, 'tStartRefresh')  # time at next scr refresh
        door_7.setAutoDraw(True)
    if door_7.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > door_7.tStartRefresh + 120.0-frameTolerance:
            # keep track of stop time/frame for later
            door_7.tStop = t  # not accounting for scr refresh
            door_7.frameNStop = frameN  # exact frame index
            win.timeOnFlip(door_7, 'tStopRefresh')  # time at next scr refresh
            door_7.setAutoDraw(False)
    
    # *sort_test_intro_btn* updates
    if sort_test_intro_btn.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
        # keep track of start time/frame for later
        sort_test_intro_btn.frameNStart = frameN  # exact frame index
        sort_test_intro_btn.tStart = t  # local t and not account for scr refresh
        sort_test_intro_btn.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(sort_test_intro_btn, 'tStartRefresh')  # time at next scr refresh
        sort_test_intro_btn.setAutoDraw(True)
    if sort_test_intro_btn.status == STARTED:
        # is it time to stop? (based on local clock)
        if tThisFlip > 120.0-frameTolerance:
            # keep track of stop time/frame for later
            sort_test_intro_btn.tStop = t  # not accounting for scr refresh
            sort_test_intro_btn.frameNStop = frameN  # exact frame index
            win.timeOnFlip(sort_test_intro_btn, 'tStopRefresh')  # time at next scr refresh
            sort_test_intro_btn.setAutoDraw(False)
    if t >= 0.5 and sort_test_intro_mouse.status == PsychoJS.Status.NOT_STARTED:
          sort_test_intro_mouse.tStart = t
          sort_test_intro_mouse.frameNStart = frameN
          
          sort_test_intro_mouse.status = PsychoJS.Status.STARTED
          sort_test_intro_mouse.mouseClock.reset()
    
    if sort_test_intro_mouse.isPressedIn(sort_test_intro_btn) and sort_test_intro_mouse.status == PsychoJS.Status.STARTED and sort_test_intro_btn.status == STARTED:
        continueRoutine = False
    
    # check for quit (typically the Esc key)
    if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
        core.quit()
    
    # check if all components have finished
    if not continueRoutine:  # a component has requested a forced-end of Routine
        break
    continueRoutine = False  # will revert to True if at least one component still running
    for thisComponent in SORT_TEST_INTROComponents:
        if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
            continueRoutine = True
            break  # at least one component has not yet finished
    
    # refresh the screen
    if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
        win.flip()

# -------Ending Routine "SORT_TEST_INTRO"-------
for thisComponent in SORT_TEST_INTROComponents:
    if hasattr(thisComponent, "setAutoDraw"):
        thisComponent.setAutoDraw(False)
thisExp.addData('sort_example_2.started', sort_example_2.tStartRefresh)
thisExp.addData('sort_example_2.stopped', sort_example_2.tStopRefresh)
# store data for thisExp (ExperimentHandler)
x, y = sort_test_intro_mouse.getPos()
buttons = sort_test_intro_mouse.getPressed()
thisExp.addData('sort_test_intro_mouse.x', x)
thisExp.addData('sort_test_intro_mouse.y', y)
thisExp.addData('sort_test_intro_mouse.leftButton', buttons[0])
thisExp.addData('sort_test_intro_mouse.midButton', buttons[1])
thisExp.addData('sort_test_intro_mouse.rightButton', buttons[2])
thisExp.nextEntry()
pass

# set up handler to look after randomisation of conditions etc
TEST_2 = data.TrialHandler(nReps=1.0, method='sequential', 
    extraInfo=expInfo, originPath=-1,
    trialList=data.importConditions('materials/sort_test_cond.csv'),
    seed=None, name='TEST_2')
thisExp.addLoop(TEST_2)  # add the loop to the experiment
thisTEST_2 = TEST_2.trialList[0]  # so we can initialise stimuli with some values
# abbreviate parameter names if possible (e.g. rgb = thisTEST_2.rgb)
if thisTEST_2 != None:
    for paramName in thisTEST_2:
        exec('{} = thisTEST_2[paramName]'.format(paramName))

for thisTEST_2 in TEST_2:
    currentLoop = TEST_2
    # abbreviate parameter names if possible (e.g. rgb = thisTEST_2.rgb)
    if thisTEST_2 != None:
        for paramName in thisTEST_2:
            exec('{} = thisTEST_2[paramName]'.format(paramName))
    
    # ------Prepare to start Routine "SORT_TEST"-------
    continueRoutine = True
    routineTimer.add(300.000000)
    # update component parameters for each repeat
    sort_test_compare_records = []  # Set routine start values for sort_test_compare_records
    sort_test_trace = []  # Set routine start values for sort_test_trace
    sort_test_compareN = 0  # Set routine start values for sort_test_compareN
    sort_test_labels = encryption  # Set routine start values for sort_test_labels
    thisExp.addData('sort_test_labels.routineStartVal', sort_test_labels)  # Save exp start value
    sort_test_path_base = img_path_base  # Set routine start values for sort_test_path_base
    sort_test_input = input  # Set routine start values for sort_test_input
    thisExp.addData('sort_test_input.routineStartVal', sort_test_input)  # Save exp start value
    sort_test_scale_instr.setColor('white', colorSpace='rgb')
    sort_test_scale_instr.setText('COMPARE weights by typing fruit labels in both LHS and RHS textboxes')
    sort_test_scale_instr.setHeight(0.02)
    sort_test_scale_right.reset()
    sort_test_scale_right.setText('')
    sort_test_scale_left.reset()
    sort_test_scale_left.setText('')
    sort_test_res.reset()
    sort_test_board.setImage('materials/merge_sort/imgs/purple_diamond.png')
    sort_test_scale.setImage(scaleEqPath)
    sort_test_ex_1.setOpacity(0.0)
    sort_test_ex_1.setPos((-0.25, 0.3))
    sort_test_ex_2.setOpacity(0.0)
    sort_test_ex_2.setPos((-0.2, 0.3))
    sort_test_ex_3.setOpacity(0.0)
    sort_test_ex_3.setPos((-0.15, 0.3))
    sort_test_ex_4.setOpacity(0.0)
    sort_test_ex_4.setPos((-0.1, 0.3))
    sort_test_ex_5.setOpacity(0.0)
    sort_test_ex_5.setPos((-0.05, 0.3))
    sort_test_ex_6.setOpacity(0.0)
    sort_test_ex_6.setPos((0.0, 0.3))
    sort_test_ex_7.setOpacity(0.0)
    sort_test_ex_7.setPos((0.05, 0.3))
    sort_test_ex_8.setOpacity(0.0)
    sort_test_ex_8.setPos((0.1,0.3))
    sort_test_ex_9.setOpacity(0.0)
    sort_test_ex_9.setPos((0.15, 0.3))
    sort_test_ex_10.setOpacity(0.0)
    sort_test_ex_10.setPos((0.20, 0.3))
    sort_test_ex_11.setOpacity(0.0)
    sort_test_ex_11.setPos((0.25, 0.3))
    sort_test_ex_12.setOpacity(0.0)
    sort_test_ex_12.setPos((0.30, 0.3))
    # setup some python lists for storing info about the sort_test_mouse
    gotValidClick = False  # until a click is received
    sort_test_timer.setText('')
    items = []
    frameCnt = 0
    tracePos = []
    movingItem = None
    
    (x, y) = sort_test_board.pos
    (w,h) = sort_test_board.size
    top = y+h/2
    bot = y-h/2
    left = x-w/2
    right = x+w/2
    # keep track of which components have finished
    SORT_TESTComponents = [sort_test_scale_instr, sort_test_ans_instr, sort_test_instr, sort_test_scale_right, sort_test_scale_left, sort_test_res, sort_test_sep, sort_test_board, sort_test_scale, sort_test_ex_1, sort_test_ex_2, sort_test_ex_3, sort_test_ex_4, sort_test_ex_5, sort_test_ex_6, sort_test_ex_7, sort_test_ex_8, sort_test_ex_9, sort_test_ex_10, sort_test_ex_11, sort_test_ex_12, sort_test_btn, sort_test_compare, sort_test_mouse, sort_test_timer]
    for thisComponent in SORT_TESTComponents:
        thisComponent.tStart = None
        thisComponent.tStop = None
        thisComponent.tStartRefresh = None
        thisComponent.tStopRefresh = None
        if hasattr(thisComponent, 'status'):
            thisComponent.status = NOT_STARTED
    # reset timers
    t = 0
    _timeToFirstFrame = win.getFutureFlipTime(clock="now")
    SORT_TESTClock.reset(-_timeToFirstFrame)  # t0 is time of first possible flip
    frameN = -1
    
    # -------Run Routine "SORT_TEST"-------
    while continueRoutine and routineTimer.getTime() > 0:
        # get current time
        t = SORT_TESTClock.getTime()
        tThisFlip = win.getFutureFlipTime(clock=SORT_TESTClock)
        tThisFlipGlobal = win.getFutureFlipTime(clock=None)
        frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
        # update/draw components on each frame
        
        # *sort_test_scale_instr* updates
        if sort_test_scale_instr.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            sort_test_scale_instr.frameNStart = frameN  # exact frame index
            sort_test_scale_instr.tStart = t  # local t and not account for scr refresh
            sort_test_scale_instr.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(sort_test_scale_instr, 'tStartRefresh')  # time at next scr refresh
            sort_test_scale_instr.setAutoDraw(True)
        if sort_test_scale_instr.status == STARTED:
            # is it time to stop? (based on global clock, using actual start)
            if tThisFlipGlobal > sort_test_scale_instr.tStartRefresh + 300.0-frameTolerance:
                # keep track of stop time/frame for later
                sort_test_scale_instr.tStop = t  # not accounting for scr refresh
                sort_test_scale_instr.frameNStop = frameN  # exact frame index
                win.timeOnFlip(sort_test_scale_instr, 'tStopRefresh')  # time at next scr refresh
                sort_test_scale_instr.setAutoDraw(False)
        
        # *sort_test_ans_instr* updates
        if sort_test_ans_instr.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            sort_test_ans_instr.frameNStart = frameN  # exact frame index
            sort_test_ans_instr.tStart = t  # local t and not account for scr refresh
            sort_test_ans_instr.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(sort_test_ans_instr, 'tStartRefresh')  # time at next scr refresh
            sort_test_ans_instr.setAutoDraw(True)
        if sort_test_ans_instr.status == STARTED:
            # is it time to stop? (based on global clock, using actual start)
            if tThisFlipGlobal > sort_test_ans_instr.tStartRefresh + 300.0-frameTolerance:
                # keep track of stop time/frame for later
                sort_test_ans_instr.tStop = t  # not accounting for scr refresh
                sort_test_ans_instr.frameNStop = frameN  # exact frame index
                win.timeOnFlip(sort_test_ans_instr, 'tStopRefresh')  # time at next scr refresh
                sort_test_ans_instr.setAutoDraw(False)
        
        # *sort_test_instr* updates
        if sort_test_instr.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            sort_test_instr.frameNStart = frameN  # exact frame index
            sort_test_instr.tStart = t  # local t and not account for scr refresh
            sort_test_instr.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(sort_test_instr, 'tStartRefresh')  # time at next scr refresh
            sort_test_instr.setAutoDraw(True)
        if sort_test_instr.status == STARTED:
            # is it time to stop? (based on global clock, using actual start)
            if tThisFlipGlobal > sort_test_instr.tStartRefresh + 300.0-frameTolerance:
                # keep track of stop time/frame for later
                sort_test_instr.tStop = t  # not accounting for scr refresh
                sort_test_instr.frameNStop = frameN  # exact frame index
                win.timeOnFlip(sort_test_instr, 'tStopRefresh')  # time at next scr refresh
                sort_test_instr.setAutoDraw(False)
        
        # *sort_test_scale_right* updates
        if sort_test_scale_right.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            sort_test_scale_right.frameNStart = frameN  # exact frame index
            sort_test_scale_right.tStart = t  # local t and not account for scr refresh
            sort_test_scale_right.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(sort_test_scale_right, 'tStartRefresh')  # time at next scr refresh
            sort_test_scale_right.setAutoDraw(True)
        if sort_test_scale_right.status == STARTED:
            # is it time to stop? (based on global clock, using actual start)
            if tThisFlipGlobal > sort_test_scale_right.tStartRefresh + 300.0-frameTolerance:
                # keep track of stop time/frame for later
                sort_test_scale_right.tStop = t  # not accounting for scr refresh
                sort_test_scale_right.frameNStop = frameN  # exact frame index
                win.timeOnFlip(sort_test_scale_right, 'tStopRefresh')  # time at next scr refresh
                sort_test_scale_right.setAutoDraw(False)
        
        # *sort_test_scale_left* updates
        if sort_test_scale_left.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            sort_test_scale_left.frameNStart = frameN  # exact frame index
            sort_test_scale_left.tStart = t  # local t and not account for scr refresh
            sort_test_scale_left.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(sort_test_scale_left, 'tStartRefresh')  # time at next scr refresh
            sort_test_scale_left.setAutoDraw(True)
        if sort_test_scale_left.status == STARTED:
            # is it time to stop? (based on global clock, using actual start)
            if tThisFlipGlobal > sort_test_scale_left.tStartRefresh + 300.0-frameTolerance:
                # keep track of stop time/frame for later
                sort_test_scale_left.tStop = t  # not accounting for scr refresh
                sort_test_scale_left.frameNStop = frameN  # exact frame index
                win.timeOnFlip(sort_test_scale_left, 'tStopRefresh')  # time at next scr refresh
                sort_test_scale_left.setAutoDraw(False)
        
        # *sort_test_res* updates
        if sort_test_res.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            sort_test_res.frameNStart = frameN  # exact frame index
            sort_test_res.tStart = t  # local t and not account for scr refresh
            sort_test_res.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(sort_test_res, 'tStartRefresh')  # time at next scr refresh
            sort_test_res.setAutoDraw(True)
        if sort_test_res.status == STARTED:
            # is it time to stop? (based on global clock, using actual start)
            if tThisFlipGlobal > sort_test_res.tStartRefresh + 300.0-frameTolerance:
                # keep track of stop time/frame for later
                sort_test_res.tStop = t  # not accounting for scr refresh
                sort_test_res.frameNStop = frameN  # exact frame index
                win.timeOnFlip(sort_test_res, 'tStopRefresh')  # time at next scr refresh
                sort_test_res.setAutoDraw(False)
        
        # *sort_test_sep* updates
        if sort_test_sep.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            sort_test_sep.frameNStart = frameN  # exact frame index
            sort_test_sep.tStart = t  # local t and not account for scr refresh
            sort_test_sep.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(sort_test_sep, 'tStartRefresh')  # time at next scr refresh
            sort_test_sep.setAutoDraw(True)
        if sort_test_sep.status == STARTED:
            # is it time to stop? (based on global clock, using actual start)
            if tThisFlipGlobal > sort_test_sep.tStartRefresh + 300.0-frameTolerance:
                # keep track of stop time/frame for later
                sort_test_sep.tStop = t  # not accounting for scr refresh
                sort_test_sep.frameNStop = frameN  # exact frame index
                win.timeOnFlip(sort_test_sep, 'tStopRefresh')  # time at next scr refresh
                sort_test_sep.setAutoDraw(False)
        
        # *sort_test_board* updates
        if sort_test_board.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            sort_test_board.frameNStart = frameN  # exact frame index
            sort_test_board.tStart = t  # local t and not account for scr refresh
            sort_test_board.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(sort_test_board, 'tStartRefresh')  # time at next scr refresh
            sort_test_board.setAutoDraw(True)
        if sort_test_board.status == STARTED:
            # is it time to stop? (based on global clock, using actual start)
            if tThisFlipGlobal > sort_test_board.tStartRefresh + 300.0-frameTolerance:
                # keep track of stop time/frame for later
                sort_test_board.tStop = t  # not accounting for scr refresh
                sort_test_board.frameNStop = frameN  # exact frame index
                win.timeOnFlip(sort_test_board, 'tStopRefresh')  # time at next scr refresh
                sort_test_board.setAutoDraw(False)
        
        # *sort_test_scale* updates
        if sort_test_scale.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            sort_test_scale.frameNStart = frameN  # exact frame index
            sort_test_scale.tStart = t  # local t and not account for scr refresh
            sort_test_scale.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(sort_test_scale, 'tStartRefresh')  # time at next scr refresh
            sort_test_scale.setAutoDraw(True)
        if sort_test_scale.status == STARTED:
            # is it time to stop? (based on global clock, using actual start)
            if tThisFlipGlobal > sort_test_scale.tStartRefresh + 300.0-frameTolerance:
                # keep track of stop time/frame for later
                sort_test_scale.tStop = t  # not accounting for scr refresh
                sort_test_scale.frameNStop = frameN  # exact frame index
                win.timeOnFlip(sort_test_scale, 'tStopRefresh')  # time at next scr refresh
                sort_test_scale.setAutoDraw(False)
        
        # *sort_test_ex_1* updates
        if sort_test_ex_1.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
            # keep track of start time/frame for later
            sort_test_ex_1.frameNStart = frameN  # exact frame index
            sort_test_ex_1.tStart = t  # local t and not account for scr refresh
            sort_test_ex_1.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(sort_test_ex_1, 'tStartRefresh')  # time at next scr refresh
            sort_test_ex_1.setAutoDraw(True)
        if sort_test_ex_1.status == STARTED:
            # is it time to stop? (based on local clock)
            if tThisFlip > 300.0-frameTolerance:
                # keep track of stop time/frame for later
                sort_test_ex_1.tStop = t  # not accounting for scr refresh
                sort_test_ex_1.frameNStop = frameN  # exact frame index
                win.timeOnFlip(sort_test_ex_1, 'tStopRefresh')  # time at next scr refresh
                sort_test_ex_1.setAutoDraw(False)
        
        # *sort_test_ex_2* updates
        if sort_test_ex_2.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
            # keep track of start time/frame for later
            sort_test_ex_2.frameNStart = frameN  # exact frame index
            sort_test_ex_2.tStart = t  # local t and not account for scr refresh
            sort_test_ex_2.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(sort_test_ex_2, 'tStartRefresh')  # time at next scr refresh
            sort_test_ex_2.setAutoDraw(True)
        if sort_test_ex_2.status == STARTED:
            # is it time to stop? (based on local clock)
            if tThisFlip > 300.0-frameTolerance:
                # keep track of stop time/frame for later
                sort_test_ex_2.tStop = t  # not accounting for scr refresh
                sort_test_ex_2.frameNStop = frameN  # exact frame index
                win.timeOnFlip(sort_test_ex_2, 'tStopRefresh')  # time at next scr refresh
                sort_test_ex_2.setAutoDraw(False)
        
        # *sort_test_ex_3* updates
        if sort_test_ex_3.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
            # keep track of start time/frame for later
            sort_test_ex_3.frameNStart = frameN  # exact frame index
            sort_test_ex_3.tStart = t  # local t and not account for scr refresh
            sort_test_ex_3.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(sort_test_ex_3, 'tStartRefresh')  # time at next scr refresh
            sort_test_ex_3.setAutoDraw(True)
        if sort_test_ex_3.status == STARTED:
            # is it time to stop? (based on local clock)
            if tThisFlip > 300.0-frameTolerance:
                # keep track of stop time/frame for later
                sort_test_ex_3.tStop = t  # not accounting for scr refresh
                sort_test_ex_3.frameNStop = frameN  # exact frame index
                win.timeOnFlip(sort_test_ex_3, 'tStopRefresh')  # time at next scr refresh
                sort_test_ex_3.setAutoDraw(False)
        
        # *sort_test_ex_4* updates
        if sort_test_ex_4.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
            # keep track of start time/frame for later
            sort_test_ex_4.frameNStart = frameN  # exact frame index
            sort_test_ex_4.tStart = t  # local t and not account for scr refresh
            sort_test_ex_4.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(sort_test_ex_4, 'tStartRefresh')  # time at next scr refresh
            sort_test_ex_4.setAutoDraw(True)
        if sort_test_ex_4.status == STARTED:
            # is it time to stop? (based on local clock)
            if tThisFlip > 300.0-frameTolerance:
                # keep track of stop time/frame for later
                sort_test_ex_4.tStop = t  # not accounting for scr refresh
                sort_test_ex_4.frameNStop = frameN  # exact frame index
                win.timeOnFlip(sort_test_ex_4, 'tStopRefresh')  # time at next scr refresh
                sort_test_ex_4.setAutoDraw(False)
        
        # *sort_test_ex_5* updates
        if sort_test_ex_5.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
            # keep track of start time/frame for later
            sort_test_ex_5.frameNStart = frameN  # exact frame index
            sort_test_ex_5.tStart = t  # local t and not account for scr refresh
            sort_test_ex_5.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(sort_test_ex_5, 'tStartRefresh')  # time at next scr refresh
            sort_test_ex_5.setAutoDraw(True)
        if sort_test_ex_5.status == STARTED:
            # is it time to stop? (based on local clock)
            if tThisFlip > 300.0-frameTolerance:
                # keep track of stop time/frame for later
                sort_test_ex_5.tStop = t  # not accounting for scr refresh
                sort_test_ex_5.frameNStop = frameN  # exact frame index
                win.timeOnFlip(sort_test_ex_5, 'tStopRefresh')  # time at next scr refresh
                sort_test_ex_5.setAutoDraw(False)
        
        # *sort_test_ex_6* updates
        if sort_test_ex_6.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
            # keep track of start time/frame for later
            sort_test_ex_6.frameNStart = frameN  # exact frame index
            sort_test_ex_6.tStart = t  # local t and not account for scr refresh
            sort_test_ex_6.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(sort_test_ex_6, 'tStartRefresh')  # time at next scr refresh
            sort_test_ex_6.setAutoDraw(True)
        if sort_test_ex_6.status == STARTED:
            # is it time to stop? (based on local clock)
            if tThisFlip > 300.0-frameTolerance:
                # keep track of stop time/frame for later
                sort_test_ex_6.tStop = t  # not accounting for scr refresh
                sort_test_ex_6.frameNStop = frameN  # exact frame index
                win.timeOnFlip(sort_test_ex_6, 'tStopRefresh')  # time at next scr refresh
                sort_test_ex_6.setAutoDraw(False)
        
        # *sort_test_ex_7* updates
        if sort_test_ex_7.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
            # keep track of start time/frame for later
            sort_test_ex_7.frameNStart = frameN  # exact frame index
            sort_test_ex_7.tStart = t  # local t and not account for scr refresh
            sort_test_ex_7.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(sort_test_ex_7, 'tStartRefresh')  # time at next scr refresh
            sort_test_ex_7.setAutoDraw(True)
        if sort_test_ex_7.status == STARTED:
            # is it time to stop? (based on local clock)
            if tThisFlip > 300.0-frameTolerance:
                # keep track of stop time/frame for later
                sort_test_ex_7.tStop = t  # not accounting for scr refresh
                sort_test_ex_7.frameNStop = frameN  # exact frame index
                win.timeOnFlip(sort_test_ex_7, 'tStopRefresh')  # time at next scr refresh
                sort_test_ex_7.setAutoDraw(False)
        
        # *sort_test_ex_8* updates
        if sort_test_ex_8.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
            # keep track of start time/frame for later
            sort_test_ex_8.frameNStart = frameN  # exact frame index
            sort_test_ex_8.tStart = t  # local t and not account for scr refresh
            sort_test_ex_8.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(sort_test_ex_8, 'tStartRefresh')  # time at next scr refresh
            sort_test_ex_8.setAutoDraw(True)
        if sort_test_ex_8.status == STARTED:
            # is it time to stop? (based on local clock)
            if tThisFlip > 300.0-frameTolerance:
                # keep track of stop time/frame for later
                sort_test_ex_8.tStop = t  # not accounting for scr refresh
                sort_test_ex_8.frameNStop = frameN  # exact frame index
                win.timeOnFlip(sort_test_ex_8, 'tStopRefresh')  # time at next scr refresh
                sort_test_ex_8.setAutoDraw(False)
        
        # *sort_test_ex_9* updates
        if sort_test_ex_9.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
            # keep track of start time/frame for later
            sort_test_ex_9.frameNStart = frameN  # exact frame index
            sort_test_ex_9.tStart = t  # local t and not account for scr refresh
            sort_test_ex_9.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(sort_test_ex_9, 'tStartRefresh')  # time at next scr refresh
            sort_test_ex_9.setAutoDraw(True)
        if sort_test_ex_9.status == STARTED:
            # is it time to stop? (based on local clock)
            if tThisFlip > 300.0-frameTolerance:
                # keep track of stop time/frame for later
                sort_test_ex_9.tStop = t  # not accounting for scr refresh
                sort_test_ex_9.frameNStop = frameN  # exact frame index
                win.timeOnFlip(sort_test_ex_9, 'tStopRefresh')  # time at next scr refresh
                sort_test_ex_9.setAutoDraw(False)
        
        # *sort_test_ex_10* updates
        if sort_test_ex_10.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
            # keep track of start time/frame for later
            sort_test_ex_10.frameNStart = frameN  # exact frame index
            sort_test_ex_10.tStart = t  # local t and not account for scr refresh
            sort_test_ex_10.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(sort_test_ex_10, 'tStartRefresh')  # time at next scr refresh
            sort_test_ex_10.setAutoDraw(True)
        if sort_test_ex_10.status == STARTED:
            # is it time to stop? (based on local clock)
            if tThisFlip > 300.0-frameTolerance:
                # keep track of stop time/frame for later
                sort_test_ex_10.tStop = t  # not accounting for scr refresh
                sort_test_ex_10.frameNStop = frameN  # exact frame index
                win.timeOnFlip(sort_test_ex_10, 'tStopRefresh')  # time at next scr refresh
                sort_test_ex_10.setAutoDraw(False)
        
        # *sort_test_ex_11* updates
        if sort_test_ex_11.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
            # keep track of start time/frame for later
            sort_test_ex_11.frameNStart = frameN  # exact frame index
            sort_test_ex_11.tStart = t  # local t and not account for scr refresh
            sort_test_ex_11.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(sort_test_ex_11, 'tStartRefresh')  # time at next scr refresh
            sort_test_ex_11.setAutoDraw(True)
        if sort_test_ex_11.status == STARTED:
            # is it time to stop? (based on local clock)
            if tThisFlip > 300.0-frameTolerance:
                # keep track of stop time/frame for later
                sort_test_ex_11.tStop = t  # not accounting for scr refresh
                sort_test_ex_11.frameNStop = frameN  # exact frame index
                win.timeOnFlip(sort_test_ex_11, 'tStopRefresh')  # time at next scr refresh
                sort_test_ex_11.setAutoDraw(False)
        
        # *sort_test_ex_12* updates
        if sort_test_ex_12.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
            # keep track of start time/frame for later
            sort_test_ex_12.frameNStart = frameN  # exact frame index
            sort_test_ex_12.tStart = t  # local t and not account for scr refresh
            sort_test_ex_12.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(sort_test_ex_12, 'tStartRefresh')  # time at next scr refresh
            sort_test_ex_12.setAutoDraw(True)
        if sort_test_ex_12.status == STARTED:
            # is it time to stop? (based on local clock)
            if tThisFlip > 300.0-frameTolerance:
                # keep track of stop time/frame for later
                sort_test_ex_12.tStop = t  # not accounting for scr refresh
                sort_test_ex_12.frameNStop = frameN  # exact frame index
                win.timeOnFlip(sort_test_ex_12, 'tStopRefresh')  # time at next scr refresh
                sort_test_ex_12.setAutoDraw(False)
        
        # *sort_test_btn* updates
        if sort_test_btn.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
            # keep track of start time/frame for later
            sort_test_btn.frameNStart = frameN  # exact frame index
            sort_test_btn.tStart = t  # local t and not account for scr refresh
            sort_test_btn.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(sort_test_btn, 'tStartRefresh')  # time at next scr refresh
            sort_test_btn.setAutoDraw(True)
        if sort_test_btn.status == STARTED:
            # is it time to stop? (based on local clock)
            if tThisFlip > 300.0-frameTolerance:
                # keep track of stop time/frame for later
                sort_test_btn.tStop = t  # not accounting for scr refresh
                sort_test_btn.frameNStop = frameN  # exact frame index
                win.timeOnFlip(sort_test_btn, 'tStopRefresh')  # time at next scr refresh
                sort_test_btn.setAutoDraw(False)
        
        # *sort_test_compare* updates
        if sort_test_compare.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
            # keep track of start time/frame for later
            sort_test_compare.frameNStart = frameN  # exact frame index
            sort_test_compare.tStart = t  # local t and not account for scr refresh
            sort_test_compare.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(sort_test_compare, 'tStartRefresh')  # time at next scr refresh
            sort_test_compare.setAutoDraw(True)
        if sort_test_compare.status == STARTED:
            # is it time to stop? (based on local clock)
            if tThisFlip > 300.0-frameTolerance:
                # keep track of stop time/frame for later
                sort_test_compare.tStop = t  # not accounting for scr refresh
                sort_test_compare.frameNStop = frameN  # exact frame index
                win.timeOnFlip(sort_test_compare, 'tStopRefresh')  # time at next scr refresh
                sort_test_compare.setAutoDraw(False)
        
        # *sort_test_timer* updates
        if sort_test_timer.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            sort_test_timer.frameNStart = frameN  # exact frame index
            sort_test_timer.tStart = t  # local t and not account for scr refresh
            sort_test_timer.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(sort_test_timer, 'tStartRefresh')  # time at next scr refresh
            sort_test_timer.setAutoDraw(True)
        if sort_test_timer.status == STARTED:
            # is it time to stop? (based on local clock)
            if tThisFlip > 300.0-frameTolerance:
                # keep track of stop time/frame for later
                sort_test_timer.tStop = t  # not accounting for scr refresh
                sort_test_timer.frameNStop = frameN  # exact frame index
                win.timeOnFlip(sort_test_timer, 'tStopRefresh')  # time at next scr refresh
                sort_test_timer.setAutoDraw(False)
        frameCnt = frameCnt + 1
        if items == []:
            items = enableImageComponents(SORT_TESTComponents,sort_test_labels,sort_test_path_base)
        
        movingItem = moveItem(sort_test_mouse, movingItem)
        
        if frameCnt % traceSaveAtFrame == 0:
            newTracePos = []
            for i in items:
                newTracePos.append([i.name.split('_')[-1],i.pos[0],i.pos[1]])
            hasMoved = updateTrace(tracePos,newTracePos)
            if hasMoved != []:
                for j in hasMoved:
                    sort_test_trace.append(j)
            tracePos = newTracePos
        
        if sort_test_mouse.isPressedIn(sort_test_compare):
            sort_test_compareN = sort_test_compareN + compare(sort_test_scale,sort_test_input,sort_test_labels,sort_test_scale_instr,sort_test_scale_left,sort_test_scale_right)
            
        sort_test_ans = sort_test_res.text
        sort_test_timer.text = timerWarning(sortTestTimeL,t) 
        
        # check for quit (typically the Esc key)
        if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
            core.quit()
        
        # check if all components have finished
        if not continueRoutine:  # a component has requested a forced-end of Routine
            break
        continueRoutine = False  # will revert to True if at least one component still running
        for thisComponent in SORT_TESTComponents:
            if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                continueRoutine = True
                break  # at least one component has not yet finished
        
        # refresh the screen
        if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
            win.flip()
    
    # -------Ending Routine "SORT_TEST"-------
    for thisComponent in SORT_TESTComponents:
        if hasattr(thisComponent, "setAutoDraw"):
            thisComponent.setAutoDraw(False)
    thisExp.addData('sort_test_compare_records.routineEndVal', sort_test_compare_records)  # Save end routine value
    thisExp.addData('sort_test_trace.routineEndVal', sort_test_trace)  # Save end routine value
    thisExp.addData('sort_test_compareN.routineEndVal', sort_test_compareN)  # Save end routine value
    TEST_2.addData('sort_test_scale_right.text',sort_test_scale_right.text)
    TEST_2.addData('sort_test_scale_left.text',sort_test_scale_left.text)
    TEST_2.addData('sort_test_res.text',sort_test_res.text)
    TEST_2.addData('sort_test_ex_1.started', sort_test_ex_1.tStartRefresh)
    TEST_2.addData('sort_test_ex_1.stopped', sort_test_ex_1.tStopRefresh)
    # store data for TEST_2 (TrialHandler)
    x, y = sort_test_mouse.getPos()
    buttons = sort_test_mouse.getPressed()
    TEST_2.addData('sort_test_mouse.x', x)
    TEST_2.addData('sort_test_mouse.y', y)
    TEST_2.addData('sort_test_mouse.leftButton', buttons[0])
    TEST_2.addData('sort_test_mouse.midButton', buttons[1])
    TEST_2.addData('sort_test_mouse.rightButton', buttons[2])
    thisExp.nextEntry()
    
# completed 1.0 repeats of 'TEST_2'


# set up handler to look after randomisation of conditions etc
REVIEW = data.TrialHandler(nReps=1.0, method='sequential', 
    extraInfo=expInfo, originPath=-1,
    trialList=data.importConditions('materials/review_cond.csv'),
    seed=None, name='REVIEW')
thisExp.addLoop(REVIEW)  # add the loop to the experiment
thisREVIEW = REVIEW.trialList[0]  # so we can initialise stimuli with some values
# abbreviate parameter names if possible (e.g. rgb = thisREVIEW.rgb)
if thisREVIEW != None:
    for paramName in thisREVIEW:
        exec('{} = thisREVIEW[paramName]'.format(paramName))

for thisREVIEW in REVIEW:
    currentLoop = REVIEW
    # abbreviate parameter names if possible (e.g. rgb = thisREVIEW.rgb)
    if thisREVIEW != None:
        for paramName in thisREVIEW:
            exec('{} = thisREVIEW[paramName]'.format(paramName))
    
    # ------Prepare to start Routine "REVIEW_QUESTIONS"-------
    continueRoutine = True
    routineTimer.add(120.000000)
    # update component parameters for each repeat
    review_question.setPos([-0.45, 0.1])
    review_question.setText('')
    review_img_1.setPos((0.4, 0.25))
    review_img_1.setImage(img_path1)
    review_img_2.setPos((0.4,-0.15))
    review_img_2.setImage(img_path2)
    review_res.reset()
    # setup some python lists for storing info about the review_mouse
    gotValidClick = False  # until a click is received
    review_timer.setText('')
    pass
    # keep track of which components have finished
    REVIEW_QUESTIONSComponents = [review_question, review_img_1, review_img_2, review_btn, review_res, review_mouse, review_timer]
    for thisComponent in REVIEW_QUESTIONSComponents:
        thisComponent.tStart = None
        thisComponent.tStop = None
        thisComponent.tStartRefresh = None
        thisComponent.tStopRefresh = None
        if hasattr(thisComponent, 'status'):
            thisComponent.status = NOT_STARTED
    # reset timers
    t = 0
    _timeToFirstFrame = win.getFutureFlipTime(clock="now")
    REVIEW_QUESTIONSClock.reset(-_timeToFirstFrame)  # t0 is time of first possible flip
    frameN = -1
    
    # -------Run Routine "REVIEW_QUESTIONS"-------
    while continueRoutine and routineTimer.getTime() > 0:
        # get current time
        t = REVIEW_QUESTIONSClock.getTime()
        tThisFlip = win.getFutureFlipTime(clock=REVIEW_QUESTIONSClock)
        tThisFlipGlobal = win.getFutureFlipTime(clock=None)
        frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
        # update/draw components on each frame
        
        # *review_question* updates
        if review_question.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            review_question.frameNStart = frameN  # exact frame index
            review_question.tStart = t  # local t and not account for scr refresh
            review_question.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(review_question, 'tStartRefresh')  # time at next scr refresh
            review_question.setAutoDraw(True)
        if review_question.status == STARTED:
            # is it time to stop? (based on global clock, using actual start)
            if tThisFlipGlobal > review_question.tStartRefresh + 120.0-frameTolerance:
                # keep track of stop time/frame for later
                review_question.tStop = t  # not accounting for scr refresh
                review_question.frameNStop = frameN  # exact frame index
                win.timeOnFlip(review_question, 'tStopRefresh')  # time at next scr refresh
                review_question.setAutoDraw(False)
        
        # *review_img_1* updates
        if review_img_1.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            review_img_1.frameNStart = frameN  # exact frame index
            review_img_1.tStart = t  # local t and not account for scr refresh
            review_img_1.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(review_img_1, 'tStartRefresh')  # time at next scr refresh
            review_img_1.setAutoDraw(True)
        if review_img_1.status == STARTED:
            # is it time to stop? (based on global clock, using actual start)
            if tThisFlipGlobal > review_img_1.tStartRefresh + 120.0-frameTolerance:
                # keep track of stop time/frame for later
                review_img_1.tStop = t  # not accounting for scr refresh
                review_img_1.frameNStop = frameN  # exact frame index
                win.timeOnFlip(review_img_1, 'tStopRefresh')  # time at next scr refresh
                review_img_1.setAutoDraw(False)
        
        # *review_img_2* updates
        if review_img_2.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            review_img_2.frameNStart = frameN  # exact frame index
            review_img_2.tStart = t  # local t and not account for scr refresh
            review_img_2.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(review_img_2, 'tStartRefresh')  # time at next scr refresh
            review_img_2.setAutoDraw(True)
        if review_img_2.status == STARTED:
            # is it time to stop? (based on global clock, using actual start)
            if tThisFlipGlobal > review_img_2.tStartRefresh + 120.0-frameTolerance:
                # keep track of stop time/frame for later
                review_img_2.tStop = t  # not accounting for scr refresh
                review_img_2.frameNStop = frameN  # exact frame index
                win.timeOnFlip(review_img_2, 'tStopRefresh')  # time at next scr refresh
                review_img_2.setAutoDraw(False)
        
        # *review_btn* updates
        if review_btn.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
            # keep track of start time/frame for later
            review_btn.frameNStart = frameN  # exact frame index
            review_btn.tStart = t  # local t and not account for scr refresh
            review_btn.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(review_btn, 'tStartRefresh')  # time at next scr refresh
            review_btn.setAutoDraw(True)
        if review_btn.status == STARTED:
            # is it time to stop? (based on local clock)
            if tThisFlip > 120.0-frameTolerance:
                # keep track of stop time/frame for later
                review_btn.tStop = t  # not accounting for scr refresh
                review_btn.frameNStop = frameN  # exact frame index
                win.timeOnFlip(review_btn, 'tStopRefresh')  # time at next scr refresh
                review_btn.setAutoDraw(False)
        
        # *review_res* updates
        if review_res.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            review_res.frameNStart = frameN  # exact frame index
            review_res.tStart = t  # local t and not account for scr refresh
            review_res.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(review_res, 'tStartRefresh')  # time at next scr refresh
            review_res.setAutoDraw(True)
        if review_res.status == STARTED:
            # is it time to stop? (based on local clock)
            if tThisFlip > 120.0-frameTolerance:
                # keep track of stop time/frame for later
                review_res.tStop = t  # not accounting for scr refresh
                review_res.frameNStop = frameN  # exact frame index
                win.timeOnFlip(review_res, 'tStopRefresh')  # time at next scr refresh
                review_res.setAutoDraw(False)
        
        # *review_timer* updates
        if review_timer.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            review_timer.frameNStart = frameN  # exact frame index
            review_timer.tStart = t  # local t and not account for scr refresh
            review_timer.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(review_timer, 'tStartRefresh')  # time at next scr refresh
            review_timer.setAutoDraw(True)
        if review_timer.status == STARTED:
            # is it time to stop? (based on global clock, using actual start)
            if tThisFlipGlobal > review_timer.tStartRefresh + 120.0-frameTolerance:
                # keep track of stop time/frame for later
                review_timer.tStop = t  # not accounting for scr refresh
                review_timer.frameNStop = frameN  # exact frame index
                win.timeOnFlip(review_timer, 'tStopRefresh')  # time at next scr refresh
                review_timer.setAutoDraw(False)
        if t >= 0.5 and optimal_merge_mouse.status == PsychoJS.Status.NOT_STARTED:
              optimal_merge_mouse.tStart = t
              optimal_merge_mouse.frameNStart = frameN
              
              optimal_merge_mouse.status = PsychoJS.Status.STARTED
              optimal_merge_mouse.mouseClock.reset()
        
        if optimal_merge_mouse.isPressedIn(optimal_merge_btn) and optimal_merge_mouse.status == PsychoJS.Status.STARTED and optimal_merge_btn.status == STARTED:
            continueRoutine = False
        
        # check for quit (typically the Esc key)
        if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
            core.quit()
        
        # check if all components have finished
        if not continueRoutine:  # a component has requested a forced-end of Routine
            break
        continueRoutine = False  # will revert to True if at least one component still running
        for thisComponent in REVIEW_QUESTIONSComponents:
            if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                continueRoutine = True
                break  # at least one component has not yet finished
        
        # refresh the screen
        if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
            win.flip()
    
    # -------Ending Routine "REVIEW_QUESTIONS"-------
    for thisComponent in REVIEW_QUESTIONSComponents:
        if hasattr(thisComponent, "setAutoDraw"):
            thisComponent.setAutoDraw(False)
    REVIEW.addData('review_res.text',review_res.text)
    # store data for REVIEW (TrialHandler)
    x, y = review_mouse.getPos()
    buttons = review_mouse.getPressed()
    REVIEW.addData('review_mouse.x', x)
    REVIEW.addData('review_mouse.y', y)
    REVIEW.addData('review_mouse.leftButton', buttons[0])
    REVIEW.addData('review_mouse.midButton', buttons[1])
    REVIEW.addData('review_mouse.rightButton', buttons[2])
    pass
    thisExp.nextEntry()
    
# completed 1.0 repeats of 'REVIEW'


# ------Prepare to start Routine "EXP_CHECK"-------
continueRoutine = True
routineTimer.add(300.000000)
# update component parameters for each repeat
exp_check_res.reset()
# setup some python lists for storing info about the exp_check_mouse
gotValidClick = False  # until a click is received
exp_check_slider.reset()
pass
# keep track of which components have finished
EXP_CHECKComponents = [exp_check_question, exp_check_res, exp_check_btn, exp_check_mouse, exp_check_slider]
for thisComponent in EXP_CHECKComponents:
    thisComponent.tStart = None
    thisComponent.tStop = None
    thisComponent.tStartRefresh = None
    thisComponent.tStopRefresh = None
    if hasattr(thisComponent, 'status'):
        thisComponent.status = NOT_STARTED
# reset timers
t = 0
_timeToFirstFrame = win.getFutureFlipTime(clock="now")
EXP_CHECKClock.reset(-_timeToFirstFrame)  # t0 is time of first possible flip
frameN = -1

# -------Run Routine "EXP_CHECK"-------
while continueRoutine and routineTimer.getTime() > 0:
    # get current time
    t = EXP_CHECKClock.getTime()
    tThisFlip = win.getFutureFlipTime(clock=EXP_CHECKClock)
    tThisFlipGlobal = win.getFutureFlipTime(clock=None)
    frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
    # update/draw components on each frame
    
    # *exp_check_question* updates
    if exp_check_question.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        exp_check_question.frameNStart = frameN  # exact frame index
        exp_check_question.tStart = t  # local t and not account for scr refresh
        exp_check_question.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(exp_check_question, 'tStartRefresh')  # time at next scr refresh
        exp_check_question.setAutoDraw(True)
    if exp_check_question.status == STARTED:
        # is it time to stop? (based on local clock)
        if tThisFlip > 300.0-frameTolerance:
            # keep track of stop time/frame for later
            exp_check_question.tStop = t  # not accounting for scr refresh
            exp_check_question.frameNStop = frameN  # exact frame index
            win.timeOnFlip(exp_check_question, 'tStopRefresh')  # time at next scr refresh
            exp_check_question.setAutoDraw(False)
    
    # *exp_check_res* updates
    if exp_check_res.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        exp_check_res.frameNStart = frameN  # exact frame index
        exp_check_res.tStart = t  # local t and not account for scr refresh
        exp_check_res.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(exp_check_res, 'tStartRefresh')  # time at next scr refresh
        exp_check_res.setAutoDraw(True)
    if exp_check_res.status == STARTED:
        # is it time to stop? (based on local clock)
        if tThisFlip > 300.0-frameTolerance:
            # keep track of stop time/frame for later
            exp_check_res.tStop = t  # not accounting for scr refresh
            exp_check_res.frameNStop = frameN  # exact frame index
            win.timeOnFlip(exp_check_res, 'tStopRefresh')  # time at next scr refresh
            exp_check_res.setAutoDraw(False)
    
    # *exp_check_btn* updates
    if exp_check_btn.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
        # keep track of start time/frame for later
        exp_check_btn.frameNStart = frameN  # exact frame index
        exp_check_btn.tStart = t  # local t and not account for scr refresh
        exp_check_btn.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(exp_check_btn, 'tStartRefresh')  # time at next scr refresh
        exp_check_btn.setAutoDraw(True)
    if exp_check_btn.status == STARTED:
        # is it time to stop? (based on local clock)
        if tThisFlip > 300.0-frameTolerance:
            # keep track of stop time/frame for later
            exp_check_btn.tStop = t  # not accounting for scr refresh
            exp_check_btn.frameNStop = frameN  # exact frame index
            win.timeOnFlip(exp_check_btn, 'tStopRefresh')  # time at next scr refresh
            exp_check_btn.setAutoDraw(False)
    
    # *exp_check_slider* updates
    if exp_check_slider.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
        # keep track of start time/frame for later
        exp_check_slider.frameNStart = frameN  # exact frame index
        exp_check_slider.tStart = t  # local t and not account for scr refresh
        exp_check_slider.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(exp_check_slider, 'tStartRefresh')  # time at next scr refresh
        exp_check_slider.setAutoDraw(True)
    if exp_check_slider.status == STARTED:
        # is it time to stop? (based on local clock)
        if tThisFlip > 300-frameTolerance:
            # keep track of stop time/frame for later
            exp_check_slider.tStop = t  # not accounting for scr refresh
            exp_check_slider.frameNStop = frameN  # exact frame index
            win.timeOnFlip(exp_check_slider, 'tStopRefresh')  # time at next scr refresh
            exp_check_slider.setAutoDraw(False)
    if t >= 0.5 and exp_check_mouse.status == PsychoJS.Status.NOT_STARTED:
          exp_check_mouse.tStart = t
          exp_check_mouse.frameNStart = frameN
          
          exp_check_mouse.status = PsychoJS.Status.STARTED
          exp_check_mouse.mouseClock.reset()
    
    if exp_check_mouse.isPressedIn(exp_check_btn) and exp_check_mouse.status == PsychoJS.Status.STARTED and exp_check_btn.status == STARTED:
        continueRoutine = False
    
    # check for quit (typically the Esc key)
    if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
        core.quit()
    
    # check if all components have finished
    if not continueRoutine:  # a component has requested a forced-end of Routine
        break
    continueRoutine = False  # will revert to True if at least one component still running
    for thisComponent in EXP_CHECKComponents:
        if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
            continueRoutine = True
            break  # at least one component has not yet finished
    
    # refresh the screen
    if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
        win.flip()

# -------Ending Routine "EXP_CHECK"-------
for thisComponent in EXP_CHECKComponents:
    if hasattr(thisComponent, "setAutoDraw"):
        thisComponent.setAutoDraw(False)
thisExp.addData('exp_check_question.started', exp_check_question.tStartRefresh)
thisExp.addData('exp_check_question.stopped', exp_check_question.tStopRefresh)
thisExp.addData('exp_check_res.text',exp_check_res.text)
# store data for thisExp (ExperimentHandler)
x, y = exp_check_mouse.getPos()
buttons = exp_check_mouse.getPressed()
thisExp.addData('exp_check_mouse.x', x)
thisExp.addData('exp_check_mouse.y', y)
thisExp.addData('exp_check_mouse.leftButton', buttons[0])
thisExp.addData('exp_check_mouse.midButton', buttons[1])
thisExp.addData('exp_check_mouse.rightButton', buttons[2])
thisExp.nextEntry()
thisExp.addData('exp_check_slider.response', exp_check_slider.getRating())
thisExp.addData('exp_check_slider.rt', exp_check_slider.getRT())
thisExp.addData('exp_check_slider.started', exp_check_slider.tStartRefresh)
thisExp.addData('exp_check_slider.stopped', exp_check_slider.tStopRefresh)
pass

# ------Prepare to start Routine "DEBRIEF"-------
continueRoutine = True
routineTimer.add(120.000000)
# update component parameters for each repeat
# setup some python lists for storing info about the debrief_mouse
gotValidClick = False  # until a click is received
# keep track of which components have finished
DEBRIEFComponents = [intro_text_5, debrief_mouse]
for thisComponent in DEBRIEFComponents:
    thisComponent.tStart = None
    thisComponent.tStop = None
    thisComponent.tStartRefresh = None
    thisComponent.tStopRefresh = None
    if hasattr(thisComponent, 'status'):
        thisComponent.status = NOT_STARTED
# reset timers
t = 0
_timeToFirstFrame = win.getFutureFlipTime(clock="now")
DEBRIEFClock.reset(-_timeToFirstFrame)  # t0 is time of first possible flip
frameN = -1

# -------Run Routine "DEBRIEF"-------
while continueRoutine and routineTimer.getTime() > 0:
    # get current time
    t = DEBRIEFClock.getTime()
    tThisFlip = win.getFutureFlipTime(clock=DEBRIEFClock)
    tThisFlipGlobal = win.getFutureFlipTime(clock=None)
    frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
    # update/draw components on each frame
    
    # *intro_text_5* updates
    if intro_text_5.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        intro_text_5.frameNStart = frameN  # exact frame index
        intro_text_5.tStart = t  # local t and not account for scr refresh
        intro_text_5.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(intro_text_5, 'tStartRefresh')  # time at next scr refresh
        intro_text_5.setAutoDraw(True)
    if intro_text_5.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > intro_text_5.tStartRefresh + 120.0-frameTolerance:
            # keep track of stop time/frame for later
            intro_text_5.tStop = t  # not accounting for scr refresh
            intro_text_5.frameNStop = frameN  # exact frame index
            win.timeOnFlip(intro_text_5, 'tStopRefresh')  # time at next scr refresh
            intro_text_5.setAutoDraw(False)
    # *debrief_mouse* updates
    if debrief_mouse.status == NOT_STARTED and t >= 0.5-frameTolerance:
        # keep track of start time/frame for later
        debrief_mouse.frameNStart = frameN  # exact frame index
        debrief_mouse.tStart = t  # local t and not account for scr refresh
        debrief_mouse.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(debrief_mouse, 'tStartRefresh')  # time at next scr refresh
        debrief_mouse.status = STARTED
        debrief_mouse.mouseClock.reset()
        prevButtonState = debrief_mouse.getPressed()  # if button is down already this ISN'T a new click
    if debrief_mouse.status == STARTED:
        # is it time to stop? (based on local clock)
        if tThisFlip > 120.0-frameTolerance:
            # keep track of stop time/frame for later
            debrief_mouse.tStop = t  # not accounting for scr refresh
            debrief_mouse.frameNStop = frameN  # exact frame index
            win.timeOnFlip(debrief_mouse, 'tStopRefresh')  # time at next scr refresh
            debrief_mouse.status = FINISHED
    if debrief_mouse.status == STARTED:  # only update if started and not finished!
        buttons = debrief_mouse.getPressed()
        if buttons != prevButtonState:  # button state changed?
            prevButtonState = buttons
            if sum(buttons) > 0:  # state changed to a new click
                # abort routine on response
                continueRoutine = False
    
    # check for quit (typically the Esc key)
    if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
        core.quit()
    
    # check if all components have finished
    if not continueRoutine:  # a component has requested a forced-end of Routine
        break
    continueRoutine = False  # will revert to True if at least one component still running
    for thisComponent in DEBRIEFComponents:
        if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
            continueRoutine = True
            break  # at least one component has not yet finished
    
    # refresh the screen
    if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
        win.flip()

# -------Ending Routine "DEBRIEF"-------
for thisComponent in DEBRIEFComponents:
    if hasattr(thisComponent, "setAutoDraw"):
        thisComponent.setAutoDraw(False)
# store data for thisExp (ExperimentHandler)
x, y = debrief_mouse.getPos()
buttons = debrief_mouse.getPressed()
thisExp.addData('debrief_mouse.x', x)
thisExp.addData('debrief_mouse.y', y)
thisExp.addData('debrief_mouse.leftButton', buttons[0])
thisExp.addData('debrief_mouse.midButton', buttons[1])
thisExp.addData('debrief_mouse.rightButton', buttons[2])
thisExp.nextEntry()

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
