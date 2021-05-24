#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
This experiment was created using PsychoPy3 Experiment Builder (v2021.1.4),
    on Mon 24 May 2021 16:54:57 BST
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
    pos=(0, 0), height=0.1, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=0.0);

# Initialize components for Routine "Raven_Matrices"
Raven_MatricesClock = core.Clock()
pre_test_txt1 = visual.TextStim(win=win, name='pre_test_txt1',
    text='Pre-training phase',
    font='Open Sans',
    pos=(0, 0), height=0.1, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=0.0);

# Initialize components for Routine "Instructions_1"
Instructions_1Clock = core.Clock()
instr1_txt1 = visual.TextStim(win=win, name='instr1_txt1',
    text='Some instructions for the performance questions\n',
    font='Open Sans',
    pos=(0, 0), height=0.1, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=0.0);
instr1_ex1 = visual.ImageStim(
    win=win,
    name='instr1_ex1', 
    image=None, mask=None,
    ori=0.0, pos=(0, 0), size=(0.5, 0.5),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-1.0)
instr1_ex2 = visual.ImageStim(
    win=win,
    name='instr1_ex2', 
    image=None, mask=None,
    ori=0.0, pos=(0, 0), size=(0.5, 0.5),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-2.0)
instr1_ex3 = visual.ImageStim(
    win=win,
    name='instr1_ex3', 
    image=None, mask=None,
    ori=0.0, pos=(0, 0), size=(0.5, 0.5),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-3.0)
instr1_btn = visual.ButtonStim(win, 
   text='next', font='Arvo',
   pos=(0, 0),
   letterHeight=0.05,
   size=None, borderWidth=0.0,
   fillColor='darkgrey', borderColor=None,
   color='white', colorSpace='rgb',
   opacity=None,
   bold=True, italic=False,
   padding=None,
   anchor='center',
   name='instr1_btn')
instr1_btn.buttonClock = core.Clock()

# Initialize components for Routine "Training_1"
Training_1Clock = core.Clock()
train1_txt1 = visual.TextStim(win=win, name='train1_txt1',
    text='Training phase 1',
    font='Open Sans',
    pos=(0, 0), height=0.1, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=0.0);

# Initialize components for Routine "Performance_1"
Performance_1Clock = core.Clock()
Perf1_txt1 = visual.TextStim(win=win, name='Perf1_txt1',
    text='Performance phase 1',
    font='Open Sans',
    pos=(0, 0), height=0.1, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=0.0);

# Initialize components for Routine "Instructions_2"
Instructions_2Clock = core.Clock()
instr2_txt1 = visual.TextStim(win=win, name='instr2_txt1',
    text='Instructions TBC',
    font='Open Sans',
    pos=(0, 0), height=0.1, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=0.0);
instr2_ex1 = visual.ImageStim(
    win=win,
    name='instr2_ex1', 
    image=None, mask=None,
    ori=0.0, pos=(0, 0), size=(0.5, 0.5),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-1.0)
instr_ex2 = visual.ImageStim(
    win=win,
    name='instr_ex2', 
    image=None, mask=None,
    ori=0.0, pos=(0, 0), size=(0.5, 0.5),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-2.0)
instr_ex3 = visual.ImageStim(
    win=win,
    name='instr_ex3', 
    image=None, mask=None,
    ori=0.0, pos=(0, 0), size=(0.5, 0.5),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-3.0)

# Initialize components for Routine "Training_2"
Training_2Clock = core.Clock()
train2_txt1 = visual.TextStim(win=win, name='train2_txt1',
    text='Training phase 2',
    font='Open Sans',
    pos=(0, 0), height=0.1, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=0.0);

# Initialize components for Routine "Performance_2"
Performance_2Clock = core.Clock()
Perf2_txt1 = visual.TextStim(win=win, name='Perf2_txt1',
    text='Performance phase 2',
    font='Open Sans',
    pos=(0, 0), height=0.1, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=0.0);

# Initialize components for Routine "Performance_3"
Performance_3Clock = core.Clock()
Perf3_txt1 = visual.TextStim(win=win, name='Perf3_txt1',
    text='Performance phase 3',
    font='Open Sans',
    pos=(0, 0), height=0.1, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=0.0);

# Initialize components for Routine "Debriefing"
DebriefingClock = core.Clock()
debrf_info = visual.TextStim(win=win, name='debrf_info',
    text='Thank you for participating in this experiment.\n\nWe would like to know some information about you.\n\nAll records will be kept strictly confidental (privacy statement TBC).\n\nPlease click the relevant option for you concerning your background.',
    font='Open Sans',
    pos=(0, 0), height=0.1, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=0.0);

# Create some handy timers
globalClock = core.Clock()  # to track the time since experiment started
routineTimer = core.CountdownTimer()  # to track time remaining of each (non-slip) routine 

# ------Prepare to start Routine "Briefing"-------
continueRoutine = True
routineTimer.add(10.000000)
# update component parameters for each repeat
# keep track of which components have finished
BriefingComponents = [gen_info]
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
        if tThisFlipGlobal > gen_info.tStartRefresh + 10.0-frameTolerance:
            # keep track of stop time/frame for later
            gen_info.tStop = t  # not accounting for scr refresh
            gen_info.frameNStop = frameN  # exact frame index
            win.timeOnFlip(gen_info, 'tStopRefresh')  # time at next scr refresh
            gen_info.setAutoDraw(False)
    
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

# ------Prepare to start Routine "Raven_Matrices"-------
continueRoutine = True
routineTimer.add(600.000000)
# update component parameters for each repeat
# keep track of which components have finished
Raven_MatricesComponents = [pre_test_txt1]
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
    
    # *pre_test_txt1* updates
    if pre_test_txt1.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        pre_test_txt1.frameNStart = frameN  # exact frame index
        pre_test_txt1.tStart = t  # local t and not account for scr refresh
        pre_test_txt1.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(pre_test_txt1, 'tStartRefresh')  # time at next scr refresh
        pre_test_txt1.setAutoDraw(True)
    if pre_test_txt1.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > pre_test_txt1.tStartRefresh + 600.0-frameTolerance:
            # keep track of stop time/frame for later
            pre_test_txt1.tStop = t  # not accounting for scr refresh
            pre_test_txt1.frameNStop = frameN  # exact frame index
            win.timeOnFlip(pre_test_txt1, 'tStopRefresh')  # time at next scr refresh
            pre_test_txt1.setAutoDraw(False)
    
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
thisExp.addData('pre_test_txt1.started', pre_test_txt1.tStartRefresh)
thisExp.addData('pre_test_txt1.stopped', pre_test_txt1.tStopRefresh)

# ------Prepare to start Routine "Instructions_1"-------
continueRoutine = True
routineTimer.add(300.000000)
# update component parameters for each repeat
# keep track of which components have finished
Instructions_1Components = [instr1_txt1, instr1_ex1, instr1_ex2, instr1_ex3, instr1_btn]
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
    
    # *instr1_btn* updates
    if instr1_btn.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        instr1_btn.frameNStart = frameN  # exact frame index
        instr1_btn.tStart = t  # local t and not account for scr refresh
        instr1_btn.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(instr1_btn, 'tStartRefresh')  # time at next scr refresh
        instr1_btn.setAutoDraw(True)
    if instr1_btn.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > instr1_btn.tStartRefresh + 300.0-frameTolerance:
            # keep track of stop time/frame for later
            instr1_btn.tStop = t  # not accounting for scr refresh
            instr1_btn.frameNStop = frameN  # exact frame index
            win.timeOnFlip(instr1_btn, 'tStopRefresh')  # time at next scr refresh
            instr1_btn.setAutoDraw(False)
    if instr1_btn.status == STARTED:
        # check whether instr1_btn has been pressed
        if instr1_btn.isClicked:
            if not instr1_btn.wasClicked:
                instr1_btn.timesOn.append(instr1_btn.buttonClock.getTime()) # store time of first click
                instr1_btn.timesOff.append(instr1_btn.buttonClock.getTime()) # store time clicked until
            else:
                instr1_btn.timesOff[-1] = instr1_btn.buttonClock.getTime() # update time clicked until
            if not instr1_btn.wasClicked:
                None
            instr1_btn.wasClicked = True  # if instr1_btn is still clicked next frame, it is not a new click
        else:
            instr1_btn.wasClicked = False  # if instr1_btn is clicked next frame, it is a new click
    else:
        instr1_btn.buttonClock.reset() # keep clock at 0 if button hasn't started / has finished
        instr1_btn.wasClicked = False  # if instr1_btn is clicked next frame, it is a new click
    
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
thisExp.addData('instr1_ex1.started', instr1_ex1.tStartRefresh)
thisExp.addData('instr1_ex1.stopped', instr1_ex1.tStopRefresh)
thisExp.addData('instr1_ex2.started', instr1_ex2.tStartRefresh)
thisExp.addData('instr1_ex2.stopped', instr1_ex2.tStopRefresh)
thisExp.addData('instr1_ex3.started', instr1_ex3.tStartRefresh)
thisExp.addData('instr1_ex3.stopped', instr1_ex3.tStopRefresh)
thisExp.addData('instr1_btn.started', instr1_btn.tStartRefresh)
thisExp.addData('instr1_btn.stopped', instr1_btn.tStopRefresh)
thisExp.addData('instr1_btn.numClicks', instr1_btn.numClicks)
if instr1_btn.numClicks:
   thisExp.addData('instr1_btn.timesOn', instr1_btn.timesOn)
   thisExp.addData('instr1_btn.timesOff', instr1_btn.timesOff)
else:
   thisExp.addData('instr1_btn.timesOn', "")
   thisExp.addData('instr1_btn.timesOff', "")

# ------Prepare to start Routine "Training_1"-------
continueRoutine = True
routineTimer.add(300.000000)
# update component parameters for each repeat
# keep track of which components have finished
Training_1Components = [train1_txt1]
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
thisExp.addData('train1_txt1.started', train1_txt1.tStartRefresh)
thisExp.addData('train1_txt1.stopped', train1_txt1.tStopRefresh)

# ------Prepare to start Routine "Performance_1"-------
continueRoutine = True
routineTimer.add(1.000000)
# update component parameters for each repeat
# keep track of which components have finished
Performance_1Components = [Perf1_txt1]
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
    
    # *Perf1_txt1* updates
    if Perf1_txt1.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        Perf1_txt1.frameNStart = frameN  # exact frame index
        Perf1_txt1.tStart = t  # local t and not account for scr refresh
        Perf1_txt1.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(Perf1_txt1, 'tStartRefresh')  # time at next scr refresh
        Perf1_txt1.setAutoDraw(True)
    if Perf1_txt1.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > Perf1_txt1.tStartRefresh + 1.0-frameTolerance:
            # keep track of stop time/frame for later
            Perf1_txt1.tStop = t  # not accounting for scr refresh
            Perf1_txt1.frameNStop = frameN  # exact frame index
            win.timeOnFlip(Perf1_txt1, 'tStopRefresh')  # time at next scr refresh
            Perf1_txt1.setAutoDraw(False)
    
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
thisExp.addData('Perf1_txt1.started', Perf1_txt1.tStartRefresh)
thisExp.addData('Perf1_txt1.stopped', Perf1_txt1.tStopRefresh)

# ------Prepare to start Routine "Instructions_2"-------
continueRoutine = True
routineTimer.add(300.000000)
# update component parameters for each repeat
# keep track of which components have finished
Instructions_2Components = [instr2_txt1, instr2_ex1, instr_ex2, instr_ex3]
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
    
    # *instr_ex2* updates
    if instr_ex2.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        instr_ex2.frameNStart = frameN  # exact frame index
        instr_ex2.tStart = t  # local t and not account for scr refresh
        instr_ex2.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(instr_ex2, 'tStartRefresh')  # time at next scr refresh
        instr_ex2.setAutoDraw(True)
    if instr_ex2.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > instr_ex2.tStartRefresh + 300.0-frameTolerance:
            # keep track of stop time/frame for later
            instr_ex2.tStop = t  # not accounting for scr refresh
            instr_ex2.frameNStop = frameN  # exact frame index
            win.timeOnFlip(instr_ex2, 'tStopRefresh')  # time at next scr refresh
            instr_ex2.setAutoDraw(False)
    
    # *instr_ex3* updates
    if instr_ex3.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        instr_ex3.frameNStart = frameN  # exact frame index
        instr_ex3.tStart = t  # local t and not account for scr refresh
        instr_ex3.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(instr_ex3, 'tStartRefresh')  # time at next scr refresh
        instr_ex3.setAutoDraw(True)
    if instr_ex3.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > instr_ex3.tStartRefresh + 300.0-frameTolerance:
            # keep track of stop time/frame for later
            instr_ex3.tStop = t  # not accounting for scr refresh
            instr_ex3.frameNStop = frameN  # exact frame index
            win.timeOnFlip(instr_ex3, 'tStopRefresh')  # time at next scr refresh
            instr_ex3.setAutoDraw(False)
    
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
thisExp.addData('instr2_ex1.started', instr2_ex1.tStartRefresh)
thisExp.addData('instr2_ex1.stopped', instr2_ex1.tStopRefresh)
thisExp.addData('instr_ex2.started', instr_ex2.tStartRefresh)
thisExp.addData('instr_ex2.stopped', instr_ex2.tStopRefresh)
thisExp.addData('instr_ex3.started', instr_ex3.tStartRefresh)
thisExp.addData('instr_ex3.stopped', instr_ex3.tStopRefresh)

# ------Prepare to start Routine "Training_2"-------
continueRoutine = True
routineTimer.add(300.000000)
# update component parameters for each repeat
# keep track of which components have finished
Training_2Components = [train2_txt1]
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
thisExp.addData('train2_txt1.started', train2_txt1.tStartRefresh)
thisExp.addData('train2_txt1.stopped', train2_txt1.tStopRefresh)

# ------Prepare to start Routine "Performance_2"-------
continueRoutine = True
routineTimer.add(300.000000)
# update component parameters for each repeat
# keep track of which components have finished
Performance_2Components = [Perf2_txt1]
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
    
    # *Perf2_txt1* updates
    if Perf2_txt1.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        Perf2_txt1.frameNStart = frameN  # exact frame index
        Perf2_txt1.tStart = t  # local t and not account for scr refresh
        Perf2_txt1.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(Perf2_txt1, 'tStartRefresh')  # time at next scr refresh
        Perf2_txt1.setAutoDraw(True)
    if Perf2_txt1.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > Perf2_txt1.tStartRefresh + 300.0-frameTolerance:
            # keep track of stop time/frame for later
            Perf2_txt1.tStop = t  # not accounting for scr refresh
            Perf2_txt1.frameNStop = frameN  # exact frame index
            win.timeOnFlip(Perf2_txt1, 'tStopRefresh')  # time at next scr refresh
            Perf2_txt1.setAutoDraw(False)
    
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
thisExp.addData('Perf2_txt1.started', Perf2_txt1.tStartRefresh)
thisExp.addData('Perf2_txt1.stopped', Perf2_txt1.tStopRefresh)

# ------Prepare to start Routine "Performance_3"-------
continueRoutine = True
routineTimer.add(300.000000)
# update component parameters for each repeat
# keep track of which components have finished
Performance_3Components = [Perf3_txt1]
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
    
    # *Perf3_txt1* updates
    if Perf3_txt1.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        Perf3_txt1.frameNStart = frameN  # exact frame index
        Perf3_txt1.tStart = t  # local t and not account for scr refresh
        Perf3_txt1.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(Perf3_txt1, 'tStartRefresh')  # time at next scr refresh
        Perf3_txt1.setAutoDraw(True)
    if Perf3_txt1.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > Perf3_txt1.tStartRefresh + 300.0-frameTolerance:
            # keep track of stop time/frame for later
            Perf3_txt1.tStop = t  # not accounting for scr refresh
            Perf3_txt1.frameNStop = frameN  # exact frame index
            win.timeOnFlip(Perf3_txt1, 'tStopRefresh')  # time at next scr refresh
            Perf3_txt1.setAutoDraw(False)
    
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
thisExp.addData('Perf3_txt1.started', Perf3_txt1.tStartRefresh)
thisExp.addData('Perf3_txt1.stopped', Perf3_txt1.tStopRefresh)

# ------Prepare to start Routine "Debriefing"-------
continueRoutine = True
routineTimer.add(1.000000)
# update component parameters for each repeat
# keep track of which components have finished
DebriefingComponents = [debrf_info]
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
        if tThisFlipGlobal > debrf_info.tStartRefresh + 1.0-frameTolerance:
            # keep track of stop time/frame for later
            debrf_info.tStop = t  # not accounting for scr refresh
            debrf_info.frameNStop = frameN  # exact frame index
            win.timeOnFlip(debrf_info, 'tStopRefresh')  # time at next scr refresh
            debrf_info.setAutoDraw(False)
    
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
