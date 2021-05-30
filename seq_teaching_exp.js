/************************* 
 * Seq_Teaching_Exp Test *
 *************************/

import { PsychoJS } from './lib/core-2021.1.4.js';
import * as core from './lib/core-2021.1.4.js';
import { TrialHandler } from './lib/data-2021.1.4.js';
import { Scheduler } from './lib/util-2021.1.4.js';
import * as visual from './lib/visual-2021.1.4.js';
import * as sound from './lib/sound-2021.1.4.js';
import * as util from './lib/util-2021.1.4.js';
//some handy aliases as in the psychopy scripts;
const { abs, sin, cos, PI: pi, sqrt } = Math;
const { round } = util;

// init psychoJS:
const psychoJS = new PsychoJS({
  debug: true
});

// open window:
psychoJS.openWindow({
  fullscr: true,
  color: new util.Color([0, 0, 0]),
  units: 'height',
  waitBlanking: true
});

// store info about the experiment session:
let expName = 'seq_teaching_exp';  // from the Builder filename that created this script
let expInfo = {'participant': '', 'session': '001'};

// Start code blocks for 'Before Experiment'
// schedule the experiment:
psychoJS.schedule(psychoJS.gui.DlgFromDict({
  dictionary: expInfo,
  title: expName
}));

const flowScheduler = new Scheduler(psychoJS);
const dialogCancelScheduler = new Scheduler(psychoJS);
psychoJS.scheduleCondition(function() { return (psychoJS.gui.dialogComponent.button === 'OK'); }, flowScheduler, dialogCancelScheduler);

// flowScheduler gets run if the participants presses OK
flowScheduler.add(updateInfo); // add timeStamp
flowScheduler.add(experimentInit);
flowScheduler.add(BriefingRoutineBegin());
flowScheduler.add(BriefingRoutineEachFrame());
flowScheduler.add(BriefingRoutineEnd());
flowScheduler.add(Raven_MatricesRoutineBegin());
flowScheduler.add(Raven_MatricesRoutineEachFrame());
flowScheduler.add(Raven_MatricesRoutineEnd());
flowScheduler.add(Instructions_1RoutineBegin());
flowScheduler.add(Instructions_1RoutineEachFrame());
flowScheduler.add(Instructions_1RoutineEnd());
flowScheduler.add(Training_1RoutineBegin());
flowScheduler.add(Training_1RoutineEachFrame());
flowScheduler.add(Training_1RoutineEnd());
flowScheduler.add(Performance_1RoutineBegin());
flowScheduler.add(Performance_1RoutineEachFrame());
flowScheduler.add(Performance_1RoutineEnd());
flowScheduler.add(Instructions_2RoutineBegin());
flowScheduler.add(Instructions_2RoutineEachFrame());
flowScheduler.add(Instructions_2RoutineEnd());
flowScheduler.add(Training_2RoutineBegin());
flowScheduler.add(Training_2RoutineEachFrame());
flowScheduler.add(Training_2RoutineEnd());
flowScheduler.add(Performance_2RoutineBegin());
flowScheduler.add(Performance_2RoutineEachFrame());
flowScheduler.add(Performance_2RoutineEnd());
flowScheduler.add(Performance_3RoutineBegin());
flowScheduler.add(Performance_3RoutineEachFrame());
flowScheduler.add(Performance_3RoutineEnd());
flowScheduler.add(DebriefingRoutineBegin());
flowScheduler.add(DebriefingRoutineEachFrame());
flowScheduler.add(DebriefingRoutineEnd());
flowScheduler.add(quitPsychoJS, '', true);

// quit if user presses Cancel in dialog box:
dialogCancelScheduler.add(quitPsychoJS, '', false);

psychoJS.start({
  expName: expName,
  expInfo: expInfo,
  resources: [
    {'name': 'materials/demo_imgs/[MULTI - SIMPLE] example 05.png', 'path': 'materials/demo_imgs/[MULTI - SIMPLE] example 05.png'},
    {'name': 'materials/demo_imgs/[MULTI - SIMPLE] example 02.png', 'path': 'materials/demo_imgs/[MULTI - SIMPLE] example 02.png'},
    {'name': 'materials/demo_imgs/white_BG.png', 'path': 'materials/demo_imgs/white_BG.png'},
    {'name': 'materials/demo_imgs/[SINGLE - SIMPLE] example 09.png', 'path': 'materials/demo_imgs/[SINGLE - SIMPLE] example 09.png'},
    {'name': 'materials/demo_imgs/[MULTI - SIMPLE] example 19.png', 'path': 'materials/demo_imgs/[MULTI - SIMPLE] example 19.png'},
    {'name': 'materials/demo_imgs/[MULTI - SIMPLE] example 04.png', 'path': 'materials/demo_imgs/[MULTI - SIMPLE] example 04.png'},
    {'name': 'materials/demo_imgs/[MULTI - SIMPLE] example 17.png', 'path': 'materials/demo_imgs/[MULTI - SIMPLE] example 17.png'},
    {'name': 'materials/demo_imgs/[SINGLE - SIMPLE] example 07.png', 'path': 'materials/demo_imgs/[SINGLE - SIMPLE] example 07.png'},
    {'name': 'materials/demo_imgs/[SINGLE - SIMPLE] example 16.png', 'path': 'materials/demo_imgs/[SINGLE - SIMPLE] example 16.png'},
    {'name': 'materials/demo_imgs/[SINGLE - SIMPLE] example 17.png', 'path': 'materials/demo_imgs/[SINGLE - SIMPLE] example 17.png'},
    {'name': 'materials/demo_imgs/[SINGLE - SIMPLE] example 20.png', 'path': 'materials/demo_imgs/[SINGLE - SIMPLE] example 20.png'}
  ]
});

psychoJS.experimentLogger.setLevel(core.Logger.ServerLevel.EXP);


var frameDur;
function updateInfo() {
  expInfo['date'] = util.MonotonicClock.getDateStr();  // add a simple timestamp
  expInfo['expName'] = expName;
  expInfo['psychopyVersion'] = '2021.1.4';
  expInfo['OS'] = window.navigator.platform;

  // store frame rate of monitor if we can measure it successfully
  expInfo['frameRate'] = psychoJS.window.getActualFrameRate();
  if (typeof expInfo['frameRate'] !== 'undefined')
    frameDur = 1.0 / Math.round(expInfo['frameRate']);
  else
    frameDur = 1.0 / 60.0; // couldn't get a reliable measure so guess

  // add info from the URL:
  util.addInfoFromUrl(expInfo);
  
  return Scheduler.Event.NEXT;
}


var BriefingClock;
var gen_info;
var Raven_MatricesClock;
var rv_txt1;
var Instructions_1Clock;
var instr1_txt1;
var instr1_ex3;
var instr1_ex2;
var instr1_ex1;
var Training_1Clock;
var train1_num;
var train1_txt1;
var train1_ex5;
var train1_ex4;
var train1_ex3;
var train1_ex2;
var train1_ex1;
var train1_bg1;
var train1_bg2;
var Performance_1Clock;
var perf1_num;
var perf1_txt1;
var perf1_ex5;
var perf1_ex4;
var perf1_ex3;
var perf1_ex2;
var perf1_ex1;
var perf1_bg1;
var perf1_bg2;
var Instructions_2Clock;
var instr2_txt1;
var instr2_ex3;
var instr2_ex2;
var instr2_ex1;
var Training_2Clock;
var train2_num;
var train2_txt1;
var train2_ex5;
var train2_ex4;
var train2_ex3;
var train2_ex2;
var train2_ex1;
var train2_bg1;
var train2_bg2;
var Performance_2Clock;
var perf2_num;
var perf2_txt1;
var perf2_ex5;
var perf2_ex4;
var perf2_ex3;
var perf2_ex2;
var perf2_ex1;
var perf2_bg1;
var perf2_bg2;
var Performance_3Clock;
var perf3_num;
var perf3_txt1;
var perf3_ex5;
var perf3_ex4;
var perf3_ex3;
var perf3_ex2;
var perf3_ex1;
var perf3_bg1;
var perf3_bg2;
var DebriefingClock;
var debrf_info;
var globalClock;
var routineTimer;
function experimentInit() {
  // Initialize components for Routine "Briefing"
  BriefingClock = new util.Clock();
  gen_info = new visual.TextStim({
    win: psychoJS.window,
    name: 'gen_info',
    text: 'Some initial general information:\n\nTBC',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
  // Initialize components for Routine "Raven_Matrices"
  Raven_MatricesClock = new util.Clock();
  rv_txt1 = new visual.TextStim({
    win: psychoJS.window,
    name: 'rv_txt1',
    text: 'Pre-training phase',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
  // Initialize components for Routine "Instructions_1"
  Instructions_1Clock = new util.Clock();
  instr1_txt1 = new visual.TextStim({
    win: psychoJS.window,
    name: 'instr1_txt1',
    text: 'Some instructions for the performance questions\n',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0.3], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
  instr1_ex3 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'instr1_ex3', units : undefined, 
    image : 'materials/demo_imgs/[SINGLE - SIMPLE] example 16.png', mask : undefined,
    ori : 0.0, pos : [0, 0], size : [1, 0.5],
    color : new util.Color([1, 1, 1]), opacity : 0.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -2.0 
  });
  instr1_ex2 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'instr1_ex2', units : undefined, 
    image : 'materials/demo_imgs/[SINGLE - SIMPLE] example 09.png', mask : undefined,
    ori : 0.0, pos : [0, 0], size : [1, 0.5],
    color : new util.Color([1, 1, 1]), opacity : 0.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -4.0 
  });
  instr1_ex1 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'instr1_ex1', units : undefined, 
    image : 'materials/demo_imgs/[SINGLE - SIMPLE] example 07.png', mask : undefined,
    ori : 0.0, pos : [0, 0], size : [1, 0.5],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -6.0 
  });
  // Initialize components for Routine "Training_1"
  Training_1Clock = new util.Clock();
  train1_num = new visual.TextStim({
    win: psychoJS.window,
    name: 'train1_num',
    text: 'Training example 1 (this could be removed)',
    font: 'Open Sans',
    units: undefined, 
    pos: [(- 0.4), 0.45], height: 0.02,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
  train1_txt1 = new visual.TextStim({
    win: psychoJS.window,
    name: 'train1_txt1',
    text: 'Revised instructions for user operation.',
    font: 'Open Sans',
    units: undefined, 
    pos: [0.4, 0.1], height: 0.03,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: -1.0 
  });
  
  train1_ex5 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'train1_ex5', units : undefined, 
    image : 'materials/demo_imgs/[SINGLE - SIMPLE] example 20.png', mask : undefined,
    ori : 0.0, pos : [(- 0.4), 0.0], size : [0.7, 0.7],
    color : new util.Color([1, 1, 1]), opacity : 0.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -3.0 
  });
  train1_ex4 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'train1_ex4', units : undefined, 
    image : 'materials/demo_imgs/[SINGLE - SIMPLE] example 17.png', mask : undefined,
    ori : 0.0, pos : [(- 0.4), 0.0], size : [0.7, 0.7],
    color : new util.Color([1, 1, 1]), opacity : 0.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -5.0 
  });
  train1_ex3 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'train1_ex3', units : undefined, 
    image : 'materials/demo_imgs/[SINGLE - SIMPLE] example 16.png', mask : undefined,
    ori : 0.0, pos : [(- 0.4), 0.0], size : [0.7, 0.7],
    color : new util.Color([1, 1, 1]), opacity : 0.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -7.0 
  });
  train1_ex2 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'train1_ex2', units : undefined, 
    image : 'materials/demo_imgs/[SINGLE - SIMPLE] example 09.png', mask : undefined,
    ori : 0.0, pos : [(- 0.4), 0.0], size : [0.7, 0.7],
    color : new util.Color([1, 1, 1]), opacity : 0.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -9.0 
  });
  train1_ex1 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'train1_ex1', units : undefined, 
    image : 'materials/demo_imgs/[SINGLE - SIMPLE] example 07.png', mask : undefined,
    ori : 0.0, pos : [(- 0.4), 0.0], size : [0.7, 0.7],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -11.0 
  });
  train1_bg1 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'train1_bg1', units : undefined, 
    image : 'materials/demo_imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [0.4, 0.3], size : [0.7, 0.3],
    color : new util.Color([255, 255, 255]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -12.0 
  });
  train1_bg2 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'train1_bg2', units : undefined, 
    image : 'materials/demo_imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [0.4, (- 0.2)], size : [0.7, 0.5],
    color : new util.Color('white'), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -13.0 
  });
  // Initialize components for Routine "Performance_1"
  Performance_1Clock = new util.Clock();
  perf1_num = new visual.TextStim({
    win: psychoJS.window,
    name: 'perf1_num',
    text: 'Test example 1 (this could be removed)',
    font: 'Open Sans',
    units: undefined, 
    pos: [(- 0.4), 0.45], height: 0.02,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
  perf1_txt1 = new visual.TextStim({
    win: psychoJS.window,
    name: 'perf1_txt1',
    text: 'Revised instructions for user operation.',
    font: 'Open Sans',
    units: undefined, 
    pos: [0.4, 0.1], height: 0.03,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: -1.0 
  });
  
  perf1_ex5 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'perf1_ex5', units : undefined, 
    image : 'materials/demo_imgs/[SINGLE - SIMPLE] example 20.png', mask : undefined,
    ori : 0.0, pos : [(- 0.4), 0.0], size : [0.7, 0.7],
    color : new util.Color([1, 1, 1]), opacity : 0.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -3.0 
  });
  perf1_ex4 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'perf1_ex4', units : undefined, 
    image : 'materials/demo_imgs/[SINGLE - SIMPLE] example 17.png', mask : undefined,
    ori : 0.0, pos : [(- 0.4), 0.0], size : [0.7, 0.7],
    color : new util.Color([1, 1, 1]), opacity : 0.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -5.0 
  });
  perf1_ex3 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'perf1_ex3', units : undefined, 
    image : 'materials/demo_imgs/[SINGLE - SIMPLE] example 16.png', mask : undefined,
    ori : 0.0, pos : [(- 0.4), 0.0], size : [0.7, 0.7],
    color : new util.Color([1, 1, 1]), opacity : 0.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -7.0 
  });
  perf1_ex2 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'perf1_ex2', units : undefined, 
    image : 'materials/demo_imgs/[SINGLE - SIMPLE] example 09.png', mask : undefined,
    ori : 0.0, pos : [(- 0.4), 0.0], size : [0.7, 0.7],
    color : new util.Color([1, 1, 1]), opacity : 0.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -9.0 
  });
  perf1_ex1 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'perf1_ex1', units : undefined, 
    image : 'materials/demo_imgs/[SINGLE - SIMPLE] example 07.png', mask : undefined,
    ori : 0.0, pos : [(- 0.4), 0.0], size : [0.7, 0.7],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -11.0 
  });
  perf1_bg1 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'perf1_bg1', units : undefined, 
    image : 'materials/demo_imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [0.4, 0.3], size : [0.7, 0.3],
    color : new util.Color([255, 255, 255]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -12.0 
  });
  perf1_bg2 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'perf1_bg2', units : undefined, 
    image : 'materials/demo_imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [0.4, (- 0.2)], size : [0.7, 0.5],
    color : new util.Color('white'), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -13.0 
  });
  // Initialize components for Routine "Instructions_2"
  Instructions_2Clock = new util.Clock();
  instr2_txt1 = new visual.TextStim({
    win: psychoJS.window,
    name: 'instr2_txt1',
    text: 'Some instructions for the performance questions\n',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0.3], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
  instr2_ex3 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'instr2_ex3', units : undefined, 
    image : 'materials/demo_imgs/[SINGLE - SIMPLE] example 16.png', mask : undefined,
    ori : 0.0, pos : [0, 0], size : [1, 0.5],
    color : new util.Color([1, 1, 1]), opacity : 0.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -2.0 
  });
  instr2_ex2 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'instr2_ex2', units : undefined, 
    image : 'materials/demo_imgs/[SINGLE - SIMPLE] example 09.png', mask : undefined,
    ori : 0.0, pos : [0, 0], size : [1, 0.5],
    color : new util.Color([1, 1, 1]), opacity : 0.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -4.0 
  });
  instr2_ex1 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'instr2_ex1', units : undefined, 
    image : 'materials/demo_imgs/[SINGLE - SIMPLE] example 07.png', mask : undefined,
    ori : 0.0, pos : [0, 0], size : [1, 0.5],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -6.0 
  });
  // Initialize components for Routine "Training_2"
  Training_2Clock = new util.Clock();
  train2_num = new visual.TextStim({
    win: psychoJS.window,
    name: 'train2_num',
    text: 'Training example 1',
    font: 'Open Sans',
    units: undefined, 
    pos: [(- 0.4), 0.45], height: 0.02,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
  train2_txt1 = new visual.TextStim({
    win: psychoJS.window,
    name: 'train2_txt1',
    text: 'Revised instructions for user operation.',
    font: 'Open Sans',
    units: undefined, 
    pos: [0.4, 0.1], height: 0.03,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: -1.0 
  });
  
  train2_ex5 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'train2_ex5', units : undefined, 
    image : 'materials/demo_imgs/[MULTI - SIMPLE] example 19.png', mask : undefined,
    ori : 0.0, pos : [(- 0.4), 0.0], size : [0.7, 0.7],
    color : new util.Color([1, 1, 1]), opacity : 0.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -3.0 
  });
  train2_ex4 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'train2_ex4', units : undefined, 
    image : 'materials/demo_imgs/[MULTI - SIMPLE] example 17.png', mask : undefined,
    ori : 0.0, pos : [(- 0.4), 0.0], size : [0.7, 0.7],
    color : new util.Color([1, 1, 1]), opacity : 0.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -5.0 
  });
  train2_ex3 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'train2_ex3', units : undefined, 
    image : 'materials/demo_imgs/[MULTI - SIMPLE] example 05.png', mask : undefined,
    ori : 0.0, pos : [(- 0.4), 0.0], size : [0.7, 0.7],
    color : new util.Color([1, 1, 1]), opacity : 0.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -7.0 
  });
  train2_ex2 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'train2_ex2', units : undefined, 
    image : 'materials/demo_imgs/[MULTI - SIMPLE] example 04.png', mask : undefined,
    ori : 0.0, pos : [(- 0.4), 0.0], size : [0.7, 0.7],
    color : new util.Color([1, 1, 1]), opacity : 0.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -9.0 
  });
  train2_ex1 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'train2_ex1', units : undefined, 
    image : 'materials/demo_imgs/[MULTI - SIMPLE] example 02.png', mask : undefined,
    ori : 0.0, pos : [(- 0.4), 0.0], size : [0.7, 0.7],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -11.0 
  });
  train2_bg1 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'train2_bg1', units : undefined, 
    image : 'materials/demo_imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [0.4, 0.3], size : [0.7, 0.3],
    color : new util.Color([255, 255, 255]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -12.0 
  });
  train2_bg2 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'train2_bg2', units : undefined, 
    image : 'materials/demo_imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [0.4, (- 0.2)], size : [0.7, 0.5],
    color : new util.Color('white'), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -13.0 
  });
  // Initialize components for Routine "Performance_2"
  Performance_2Clock = new util.Clock();
  perf2_num = new visual.TextStim({
    win: psychoJS.window,
    name: 'perf2_num',
    text: 'Test example 1 (this could be removed)',
    font: 'Open Sans',
    units: undefined, 
    pos: [(- 0.4), 0.45], height: 0.02,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
  perf2_txt1 = new visual.TextStim({
    win: psychoJS.window,
    name: 'perf2_txt1',
    text: 'Revised instructions for user operation.',
    font: 'Open Sans',
    units: undefined, 
    pos: [0.4, 0.1], height: 0.03,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: -1.0 
  });
  
  perf2_ex5 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'perf2_ex5', units : undefined, 
    image : 'materials/demo_imgs/[MULTI - SIMPLE] example 19.png', mask : undefined,
    ori : 0.0, pos : [(- 0.4), 0.0], size : [0.7, 0.7],
    color : new util.Color([1, 1, 1]), opacity : 0.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -3.0 
  });
  perf2_ex4 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'perf2_ex4', units : undefined, 
    image : 'materials/demo_imgs/[MULTI - SIMPLE] example 17.png', mask : undefined,
    ori : 0.0, pos : [(- 0.4), 0.0], size : [0.7, 0.7],
    color : new util.Color([1, 1, 1]), opacity : 0.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -5.0 
  });
  perf2_ex3 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'perf2_ex3', units : undefined, 
    image : 'materials/demo_imgs/[MULTI - SIMPLE] example 05.png', mask : undefined,
    ori : 0.0, pos : [(- 0.4), 0.0], size : [0.7, 0.7],
    color : new util.Color([1, 1, 1]), opacity : 0.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -7.0 
  });
  perf2_ex2 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'perf2_ex2', units : undefined, 
    image : 'materials/demo_imgs/[MULTI - SIMPLE] example 04.png', mask : undefined,
    ori : 0.0, pos : [(- 0.4), 0.0], size : [0.7, 0.7],
    color : new util.Color([1, 1, 1]), opacity : 0.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -9.0 
  });
  perf2_ex1 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'perf2_ex1', units : undefined, 
    image : 'materials/demo_imgs/[MULTI - SIMPLE] example 02.png', mask : undefined,
    ori : 0.0, pos : [(- 0.4), 0.0], size : [0.7, 0.7],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -11.0 
  });
  perf2_bg1 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'perf2_bg1', units : undefined, 
    image : 'materials/demo_imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [0.4, 0.3], size : [0.7, 0.3],
    color : new util.Color([255, 255, 255]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -12.0 
  });
  perf2_bg2 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'perf2_bg2', units : undefined, 
    image : 'materials/demo_imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [0.4, (- 0.2)], size : [0.7, 0.5],
    color : new util.Color('white'), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -13.0 
  });
  // Initialize components for Routine "Performance_3"
  Performance_3Clock = new util.Clock();
  perf3_num = new visual.TextStim({
    win: psychoJS.window,
    name: 'perf3_num',
    text: 'Test example 1 (this could be removed)',
    font: 'Open Sans',
    units: undefined, 
    pos: [(- 0.4), 0.45], height: 0.02,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
  perf3_txt1 = new visual.TextStim({
    win: psychoJS.window,
    name: 'perf3_txt1',
    text: 'Revised instructions for user operation.',
    font: 'Open Sans',
    units: undefined, 
    pos: [0.4, 0.1], height: 0.03,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: -1.0 
  });
  
  perf3_ex5 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'perf3_ex5', units : undefined, 
    image : 'materials/demo_imgs/[SINGLE - SIMPLE] example 20.png', mask : undefined,
    ori : 0.0, pos : [(- 0.4), 0.0], size : [0.7, 0.7],
    color : new util.Color([1, 1, 1]), opacity : 0.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -3.0 
  });
  perf3_ex4 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'perf3_ex4', units : undefined, 
    image : 'materials/demo_imgs/[SINGLE - SIMPLE] example 17.png', mask : undefined,
    ori : 0.0, pos : [(- 0.4), 0.0], size : [0.7, 0.7],
    color : new util.Color([1, 1, 1]), opacity : 0.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -5.0 
  });
  perf3_ex3 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'perf3_ex3', units : undefined, 
    image : 'materials/demo_imgs/[SINGLE - SIMPLE] example 16.png', mask : undefined,
    ori : 0.0, pos : [(- 0.4), 0.0], size : [0.7, 0.7],
    color : new util.Color([1, 1, 1]), opacity : 0.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -7.0 
  });
  perf3_ex2 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'perf3_ex2', units : undefined, 
    image : 'materials/demo_imgs/[SINGLE - SIMPLE] example 09.png', mask : undefined,
    ori : 0.0, pos : [(- 0.4), 0.0], size : [0.7, 0.7],
    color : new util.Color([1, 1, 1]), opacity : 0.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -9.0 
  });
  perf3_ex1 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'perf3_ex1', units : undefined, 
    image : 'materials/demo_imgs/[SINGLE - SIMPLE] example 07.png', mask : undefined,
    ori : 0.0, pos : [(- 0.4), 0.0], size : [0.7, 0.7],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -11.0 
  });
  perf3_bg1 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'perf3_bg1', units : undefined, 
    image : 'materials/demo_imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [0.4, 0.3], size : [0.7, 0.3],
    color : new util.Color([255, 255, 255]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -12.0 
  });
  perf3_bg2 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'perf3_bg2', units : undefined, 
    image : 'materials/demo_imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [0.4, (- 0.2)], size : [0.7, 0.5],
    color : new util.Color('white'), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -13.0 
  });
  // Initialize components for Routine "Debriefing"
  DebriefingClock = new util.Clock();
  debrf_info = new visual.TextStim({
    win: psychoJS.window,
    name: 'debrf_info',
    text: 'Thank you for participating in this experiment.\n\nWe would like to know more about you.\n\nAll records will be kept strictly confidental (privacy statement TBC).\n\nPlease click the relevant option for you concerning your background.',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0.2], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
  // Create some handy timers
  globalClock = new util.Clock();  // to track the time since experiment started
  routineTimer = new util.CountdownTimer();  // to track time remaining of each (non-slip) routine
  
  return Scheduler.Event.NEXT;
}


var t;
var frameN;
var continueRoutine;
var BriefingComponents;
function BriefingRoutineBegin(snapshot) {
  return function () {
    //------Prepare to start Routine 'Briefing'-------
    t = 0;
    BriefingClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(300.000000);
    // update component parameters for each repeat
    // keep track of which components have finished
    BriefingComponents = [];
    BriefingComponents.push(gen_info);
    
    for (const thisComponent of BriefingComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


var frameRemains;
function BriefingRoutineEachFrame(snapshot) {
  return function () {
    //------Loop for each frame of Routine 'Briefing'-------
    // get current time
    t = BriefingClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *gen_info* updates
    if (t >= 0.0 && gen_info.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      gen_info.tStart = t;  // (not accounting for frame time here)
      gen_info.frameNStart = frameN;  // exact frame index
      
      gen_info.setAutoDraw(true);
    }

    frameRemains = 0.0 + 300.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (gen_info.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      gen_info.setAutoDraw(false);
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of BriefingComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function BriefingRoutineEnd(snapshot) {
  return function () {
    //------Ending Routine 'Briefing'-------
    for (const thisComponent of BriefingComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    return Scheduler.Event.NEXT;
  };
}


var Raven_MatricesComponents;
function Raven_MatricesRoutineBegin(snapshot) {
  return function () {
    //------Prepare to start Routine 'Raven_Matrices'-------
    t = 0;
    Raven_MatricesClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(600.500000);
    // update component parameters for each repeat
    // keep track of which components have finished
    Raven_MatricesComponents = [];
    Raven_MatricesComponents.push(rv_txt1);
    
    for (const thisComponent of Raven_MatricesComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function Raven_MatricesRoutineEachFrame(snapshot) {
  return function () {
    //------Loop for each frame of Routine 'Raven_Matrices'-------
    // get current time
    t = Raven_MatricesClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *rv_txt1* updates
    if (t >= 0.0 && rv_txt1.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      rv_txt1.tStart = t;  // (not accounting for frame time here)
      rv_txt1.frameNStart = frameN;  // exact frame index
      
      rv_txt1.setAutoDraw(true);
    }

    frameRemains = 0.0 + 600.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (rv_txt1.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      rv_txt1.setAutoDraw(false);
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of Raven_MatricesComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function Raven_MatricesRoutineEnd(snapshot) {
  return function () {
    //------Ending Routine 'Raven_Matrices'-------
    for (const thisComponent of Raven_MatricesComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    return Scheduler.Event.NEXT;
  };
}


var Instructions_1Components;
function Instructions_1RoutineBegin(snapshot) {
  return function () {
    //------Prepare to start Routine 'Instructions_1'-------
    t = 0;
    Instructions_1Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(300.500000);
    // update component parameters for each repeat
    // keep track of which components have finished
    Instructions_1Components = [];
    Instructions_1Components.push(instr1_txt1);
    Instructions_1Components.push(instr1_ex3);
    Instructions_1Components.push(instr1_ex2);
    Instructions_1Components.push(instr1_ex1);
    
    for (const thisComponent of Instructions_1Components)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function Instructions_1RoutineEachFrame(snapshot) {
  return function () {
    //------Loop for each frame of Routine 'Instructions_1'-------
    // get current time
    t = Instructions_1Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *instr1_txt1* updates
    if (t >= 0.0 && instr1_txt1.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      instr1_txt1.tStart = t;  // (not accounting for frame time here)
      instr1_txt1.frameNStart = frameN;  // exact frame index
      
      instr1_txt1.setAutoDraw(true);
    }

    frameRemains = 0.0 + 300.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (instr1_txt1.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      instr1_txt1.setAutoDraw(false);
    }
    
    // *instr1_ex3* updates
    if (t >= 0.0 && instr1_ex3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      instr1_ex3.tStart = t;  // (not accounting for frame time here)
      instr1_ex3.frameNStart = frameN;  // exact frame index
      
      instr1_ex3.setAutoDraw(true);
    }

    frameRemains = 0.0 + 300.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (instr1_ex3.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      instr1_ex3.setAutoDraw(false);
    }
    
    // *instr1_ex2* updates
    if (t >= 0.0 && instr1_ex2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      instr1_ex2.tStart = t;  // (not accounting for frame time here)
      instr1_ex2.frameNStart = frameN;  // exact frame index
      
      instr1_ex2.setAutoDraw(true);
    }

    frameRemains = 0.0 + 300.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (instr1_ex2.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      instr1_ex2.setAutoDraw(false);
    }
    
    // *instr1_ex1* updates
    if (t >= 0.0 && instr1_ex1.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      instr1_ex1.tStart = t;  // (not accounting for frame time here)
      instr1_ex1.frameNStart = frameN;  // exact frame index
      
      instr1_ex1.setAutoDraw(true);
    }

    frameRemains = 0.0 + 300.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (instr1_ex1.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      instr1_ex1.setAutoDraw(false);
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of Instructions_1Components)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function Instructions_1RoutineEnd(snapshot) {
  return function () {
    //------Ending Routine 'Instructions_1'-------
    for (const thisComponent of Instructions_1Components) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    return Scheduler.Event.NEXT;
  };
}


var Training_1Components;
function Training_1RoutineBegin(snapshot) {
  return function () {
    //------Prepare to start Routine 'Training_1'-------
    t = 0;
    Training_1Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(300.500000);
    // update component parameters for each repeat
    // keep track of which components have finished
    Training_1Components = [];
    Training_1Components.push(train1_num);
    Training_1Components.push(train1_txt1);
    Training_1Components.push(train1_ex5);
    Training_1Components.push(train1_ex4);
    Training_1Components.push(train1_ex3);
    Training_1Components.push(train1_ex2);
    Training_1Components.push(train1_ex1);
    Training_1Components.push(train1_bg1);
    Training_1Components.push(train1_bg2);
    
    for (const thisComponent of Training_1Components)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function Training_1RoutineEachFrame(snapshot) {
  return function () {
    //------Loop for each frame of Routine 'Training_1'-------
    // get current time
    t = Training_1Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *train1_num* updates
    if (t >= 0.0 && train1_num.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      train1_num.tStart = t;  // (not accounting for frame time here)
      train1_num.frameNStart = frameN;  // exact frame index
      
      train1_num.setAutoDraw(true);
    }

    frameRemains = 0.0 + 300.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (train1_num.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      train1_num.setAutoDraw(false);
    }
    
    // *train1_txt1* updates
    if (t >= 0.0 && train1_txt1.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      train1_txt1.tStart = t;  // (not accounting for frame time here)
      train1_txt1.frameNStart = frameN;  // exact frame index
      
      train1_txt1.setAutoDraw(true);
    }

    frameRemains = 0.0 + 300.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (train1_txt1.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      train1_txt1.setAutoDraw(false);
    }
    
    // *train1_ex5* updates
    if (t >= 0.0 && train1_ex5.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      train1_ex5.tStart = t;  // (not accounting for frame time here)
      train1_ex5.frameNStart = frameN;  // exact frame index
      
      train1_ex5.setAutoDraw(true);
    }

    frameRemains = 0.0 + 300.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (train1_ex5.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      train1_ex5.setAutoDraw(false);
    }
    
    // *train1_ex4* updates
    if (t >= 0.0 && train1_ex4.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      train1_ex4.tStart = t;  // (not accounting for frame time here)
      train1_ex4.frameNStart = frameN;  // exact frame index
      
      train1_ex4.setAutoDraw(true);
    }

    frameRemains = 0.0 + 300.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (train1_ex4.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      train1_ex4.setAutoDraw(false);
    }
    
    // *train1_ex3* updates
    if (t >= 0.0 && train1_ex3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      train1_ex3.tStart = t;  // (not accounting for frame time here)
      train1_ex3.frameNStart = frameN;  // exact frame index
      
      train1_ex3.setAutoDraw(true);
    }

    frameRemains = 0.0 + 300.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (train1_ex3.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      train1_ex3.setAutoDraw(false);
    }
    
    // *train1_ex2* updates
    if (t >= 0.0 && train1_ex2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      train1_ex2.tStart = t;  // (not accounting for frame time here)
      train1_ex2.frameNStart = frameN;  // exact frame index
      
      train1_ex2.setAutoDraw(true);
    }

    frameRemains = 0.0 + 300.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (train1_ex2.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      train1_ex2.setAutoDraw(false);
    }
    
    // *train1_ex1* updates
    if (t >= 0.0 && train1_ex1.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      train1_ex1.tStart = t;  // (not accounting for frame time here)
      train1_ex1.frameNStart = frameN;  // exact frame index
      
      train1_ex1.setAutoDraw(true);
    }

    frameRemains = 0.0 + 300.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (train1_ex1.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      train1_ex1.setAutoDraw(false);
    }
    
    // *train1_bg1* updates
    if (t >= 0.0 && train1_bg1.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      train1_bg1.tStart = t;  // (not accounting for frame time here)
      train1_bg1.frameNStart = frameN;  // exact frame index
      
      train1_bg1.setAutoDraw(true);
    }

    frameRemains = 0.0 + 300.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (train1_bg1.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      train1_bg1.setAutoDraw(false);
    }
    
    // *train1_bg2* updates
    if (t >= 0.0 && train1_bg2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      train1_bg2.tStart = t;  // (not accounting for frame time here)
      train1_bg2.frameNStart = frameN;  // exact frame index
      
      train1_bg2.setAutoDraw(true);
    }

    frameRemains = 0.0 + 300.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (train1_bg2.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      train1_bg2.setAutoDraw(false);
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of Training_1Components)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function Training_1RoutineEnd(snapshot) {
  return function () {
    //------Ending Routine 'Training_1'-------
    for (const thisComponent of Training_1Components) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    return Scheduler.Event.NEXT;
  };
}


var Performance_1Components;
function Performance_1RoutineBegin(snapshot) {
  return function () {
    //------Prepare to start Routine 'Performance_1'-------
    t = 0;
    Performance_1Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(300.500000);
    // update component parameters for each repeat
    // keep track of which components have finished
    Performance_1Components = [];
    Performance_1Components.push(perf1_num);
    Performance_1Components.push(perf1_txt1);
    Performance_1Components.push(perf1_ex5);
    Performance_1Components.push(perf1_ex4);
    Performance_1Components.push(perf1_ex3);
    Performance_1Components.push(perf1_ex2);
    Performance_1Components.push(perf1_ex1);
    Performance_1Components.push(perf1_bg1);
    Performance_1Components.push(perf1_bg2);
    
    for (const thisComponent of Performance_1Components)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function Performance_1RoutineEachFrame(snapshot) {
  return function () {
    //------Loop for each frame of Routine 'Performance_1'-------
    // get current time
    t = Performance_1Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *perf1_num* updates
    if (t >= 0.0 && perf1_num.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      perf1_num.tStart = t;  // (not accounting for frame time here)
      perf1_num.frameNStart = frameN;  // exact frame index
      
      perf1_num.setAutoDraw(true);
    }

    frameRemains = 0.0 + 300.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (perf1_num.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      perf1_num.setAutoDraw(false);
    }
    
    // *perf1_txt1* updates
    if (t >= 0.0 && perf1_txt1.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      perf1_txt1.tStart = t;  // (not accounting for frame time here)
      perf1_txt1.frameNStart = frameN;  // exact frame index
      
      perf1_txt1.setAutoDraw(true);
    }

    frameRemains = 0.0 + 300.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (perf1_txt1.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      perf1_txt1.setAutoDraw(false);
    }
    
    // *perf1_ex5* updates
    if (t >= 0.0 && perf1_ex5.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      perf1_ex5.tStart = t;  // (not accounting for frame time here)
      perf1_ex5.frameNStart = frameN;  // exact frame index
      
      perf1_ex5.setAutoDraw(true);
    }

    frameRemains = 0.0 + 300.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (perf1_ex5.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      perf1_ex5.setAutoDraw(false);
    }
    
    // *perf1_ex4* updates
    if (t >= 0.0 && perf1_ex4.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      perf1_ex4.tStart = t;  // (not accounting for frame time here)
      perf1_ex4.frameNStart = frameN;  // exact frame index
      
      perf1_ex4.setAutoDraw(true);
    }

    frameRemains = 0.0 + 300.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (perf1_ex4.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      perf1_ex4.setAutoDraw(false);
    }
    
    // *perf1_ex3* updates
    if (t >= 0.0 && perf1_ex3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      perf1_ex3.tStart = t;  // (not accounting for frame time here)
      perf1_ex3.frameNStart = frameN;  // exact frame index
      
      perf1_ex3.setAutoDraw(true);
    }

    frameRemains = 0.0 + 300.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (perf1_ex3.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      perf1_ex3.setAutoDraw(false);
    }
    
    // *perf1_ex2* updates
    if (t >= 0.0 && perf1_ex2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      perf1_ex2.tStart = t;  // (not accounting for frame time here)
      perf1_ex2.frameNStart = frameN;  // exact frame index
      
      perf1_ex2.setAutoDraw(true);
    }

    frameRemains = 0.0 + 300.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (perf1_ex2.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      perf1_ex2.setAutoDraw(false);
    }
    
    // *perf1_ex1* updates
    if (t >= 0.0 && perf1_ex1.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      perf1_ex1.tStart = t;  // (not accounting for frame time here)
      perf1_ex1.frameNStart = frameN;  // exact frame index
      
      perf1_ex1.setAutoDraw(true);
    }

    frameRemains = 0.0 + 300.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (perf1_ex1.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      perf1_ex1.setAutoDraw(false);
    }
    
    // *perf1_bg1* updates
    if (t >= 0.0 && perf1_bg1.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      perf1_bg1.tStart = t;  // (not accounting for frame time here)
      perf1_bg1.frameNStart = frameN;  // exact frame index
      
      perf1_bg1.setAutoDraw(true);
    }

    frameRemains = 0.0 + 300.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (perf1_bg1.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      perf1_bg1.setAutoDraw(false);
    }
    
    // *perf1_bg2* updates
    if (t >= 0.0 && perf1_bg2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      perf1_bg2.tStart = t;  // (not accounting for frame time here)
      perf1_bg2.frameNStart = frameN;  // exact frame index
      
      perf1_bg2.setAutoDraw(true);
    }

    frameRemains = 0.0 + 300.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (perf1_bg2.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      perf1_bg2.setAutoDraw(false);
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of Performance_1Components)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function Performance_1RoutineEnd(snapshot) {
  return function () {
    //------Ending Routine 'Performance_1'-------
    for (const thisComponent of Performance_1Components) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    return Scheduler.Event.NEXT;
  };
}


var Instructions_2Components;
function Instructions_2RoutineBegin(snapshot) {
  return function () {
    //------Prepare to start Routine 'Instructions_2'-------
    t = 0;
    Instructions_2Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(300.500000);
    // update component parameters for each repeat
    // keep track of which components have finished
    Instructions_2Components = [];
    Instructions_2Components.push(instr2_txt1);
    Instructions_2Components.push(instr2_ex3);
    Instructions_2Components.push(instr2_ex2);
    Instructions_2Components.push(instr2_ex1);
    
    for (const thisComponent of Instructions_2Components)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function Instructions_2RoutineEachFrame(snapshot) {
  return function () {
    //------Loop for each frame of Routine 'Instructions_2'-------
    // get current time
    t = Instructions_2Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *instr2_txt1* updates
    if (t >= 0.0 && instr2_txt1.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      instr2_txt1.tStart = t;  // (not accounting for frame time here)
      instr2_txt1.frameNStart = frameN;  // exact frame index
      
      instr2_txt1.setAutoDraw(true);
    }

    frameRemains = 0.0 + 300.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (instr2_txt1.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      instr2_txt1.setAutoDraw(false);
    }
    
    // *instr2_ex3* updates
    if (t >= 0.0 && instr2_ex3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      instr2_ex3.tStart = t;  // (not accounting for frame time here)
      instr2_ex3.frameNStart = frameN;  // exact frame index
      
      instr2_ex3.setAutoDraw(true);
    }

    frameRemains = 0.0 + 300.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (instr2_ex3.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      instr2_ex3.setAutoDraw(false);
    }
    
    // *instr2_ex2* updates
    if (t >= 0.0 && instr2_ex2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      instr2_ex2.tStart = t;  // (not accounting for frame time here)
      instr2_ex2.frameNStart = frameN;  // exact frame index
      
      instr2_ex2.setAutoDraw(true);
    }

    frameRemains = 0.0 + 300.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (instr2_ex2.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      instr2_ex2.setAutoDraw(false);
    }
    
    // *instr2_ex1* updates
    if (t >= 0.0 && instr2_ex1.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      instr2_ex1.tStart = t;  // (not accounting for frame time here)
      instr2_ex1.frameNStart = frameN;  // exact frame index
      
      instr2_ex1.setAutoDraw(true);
    }

    frameRemains = 0.0 + 300.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (instr2_ex1.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      instr2_ex1.setAutoDraw(false);
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of Instructions_2Components)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function Instructions_2RoutineEnd(snapshot) {
  return function () {
    //------Ending Routine 'Instructions_2'-------
    for (const thisComponent of Instructions_2Components) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    return Scheduler.Event.NEXT;
  };
}


var Training_2Components;
function Training_2RoutineBegin(snapshot) {
  return function () {
    //------Prepare to start Routine 'Training_2'-------
    t = 0;
    Training_2Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(300.500000);
    // update component parameters for each repeat
    // keep track of which components have finished
    Training_2Components = [];
    Training_2Components.push(train2_num);
    Training_2Components.push(train2_txt1);
    Training_2Components.push(train2_ex5);
    Training_2Components.push(train2_ex4);
    Training_2Components.push(train2_ex3);
    Training_2Components.push(train2_ex2);
    Training_2Components.push(train2_ex1);
    Training_2Components.push(train2_bg1);
    Training_2Components.push(train2_bg2);
    
    for (const thisComponent of Training_2Components)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function Training_2RoutineEachFrame(snapshot) {
  return function () {
    //------Loop for each frame of Routine 'Training_2'-------
    // get current time
    t = Training_2Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *train2_num* updates
    if (t >= 0.0 && train2_num.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      train2_num.tStart = t;  // (not accounting for frame time here)
      train2_num.frameNStart = frameN;  // exact frame index
      
      train2_num.setAutoDraw(true);
    }

    frameRemains = 0.0 + 300.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (train2_num.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      train2_num.setAutoDraw(false);
    }
    
    // *train2_txt1* updates
    if (t >= 0.0 && train2_txt1.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      train2_txt1.tStart = t;  // (not accounting for frame time here)
      train2_txt1.frameNStart = frameN;  // exact frame index
      
      train2_txt1.setAutoDraw(true);
    }

    frameRemains = 0.0 + 300.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (train2_txt1.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      train2_txt1.setAutoDraw(false);
    }
    
    // *train2_ex5* updates
    if (t >= 0.0 && train2_ex5.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      train2_ex5.tStart = t;  // (not accounting for frame time here)
      train2_ex5.frameNStart = frameN;  // exact frame index
      
      train2_ex5.setAutoDraw(true);
    }

    frameRemains = 0.0 + 300.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (train2_ex5.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      train2_ex5.setAutoDraw(false);
    }
    
    // *train2_ex4* updates
    if (t >= 0.0 && train2_ex4.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      train2_ex4.tStart = t;  // (not accounting for frame time here)
      train2_ex4.frameNStart = frameN;  // exact frame index
      
      train2_ex4.setAutoDraw(true);
    }

    frameRemains = 0.0 + 300.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (train2_ex4.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      train2_ex4.setAutoDraw(false);
    }
    
    // *train2_ex3* updates
    if (t >= 0.0 && train2_ex3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      train2_ex3.tStart = t;  // (not accounting for frame time here)
      train2_ex3.frameNStart = frameN;  // exact frame index
      
      train2_ex3.setAutoDraw(true);
    }

    frameRemains = 0.0 + 300.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (train2_ex3.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      train2_ex3.setAutoDraw(false);
    }
    
    // *train2_ex2* updates
    if (t >= 0.0 && train2_ex2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      train2_ex2.tStart = t;  // (not accounting for frame time here)
      train2_ex2.frameNStart = frameN;  // exact frame index
      
      train2_ex2.setAutoDraw(true);
    }

    frameRemains = 0.0 + 300.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (train2_ex2.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      train2_ex2.setAutoDraw(false);
    }
    
    // *train2_ex1* updates
    if (t >= 0.0 && train2_ex1.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      train2_ex1.tStart = t;  // (not accounting for frame time here)
      train2_ex1.frameNStart = frameN;  // exact frame index
      
      train2_ex1.setAutoDraw(true);
    }

    frameRemains = 0.0 + 300.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (train2_ex1.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      train2_ex1.setAutoDraw(false);
    }
    
    // *train2_bg1* updates
    if (t >= 0.0 && train2_bg1.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      train2_bg1.tStart = t;  // (not accounting for frame time here)
      train2_bg1.frameNStart = frameN;  // exact frame index
      
      train2_bg1.setAutoDraw(true);
    }

    frameRemains = 0.0 + 300.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (train2_bg1.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      train2_bg1.setAutoDraw(false);
    }
    
    // *train2_bg2* updates
    if (t >= 0.0 && train2_bg2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      train2_bg2.tStart = t;  // (not accounting for frame time here)
      train2_bg2.frameNStart = frameN;  // exact frame index
      
      train2_bg2.setAutoDraw(true);
    }

    frameRemains = 0.0 + 300.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (train2_bg2.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      train2_bg2.setAutoDraw(false);
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of Training_2Components)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function Training_2RoutineEnd(snapshot) {
  return function () {
    //------Ending Routine 'Training_2'-------
    for (const thisComponent of Training_2Components) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    return Scheduler.Event.NEXT;
  };
}


var Performance_2Components;
function Performance_2RoutineBegin(snapshot) {
  return function () {
    //------Prepare to start Routine 'Performance_2'-------
    t = 0;
    Performance_2Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(300.500000);
    // update component parameters for each repeat
    // keep track of which components have finished
    Performance_2Components = [];
    Performance_2Components.push(perf2_num);
    Performance_2Components.push(perf2_txt1);
    Performance_2Components.push(perf2_ex5);
    Performance_2Components.push(perf2_ex4);
    Performance_2Components.push(perf2_ex3);
    Performance_2Components.push(perf2_ex2);
    Performance_2Components.push(perf2_ex1);
    Performance_2Components.push(perf2_bg1);
    Performance_2Components.push(perf2_bg2);
    
    for (const thisComponent of Performance_2Components)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function Performance_2RoutineEachFrame(snapshot) {
  return function () {
    //------Loop for each frame of Routine 'Performance_2'-------
    // get current time
    t = Performance_2Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *perf2_num* updates
    if (t >= 0.0 && perf2_num.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      perf2_num.tStart = t;  // (not accounting for frame time here)
      perf2_num.frameNStart = frameN;  // exact frame index
      
      perf2_num.setAutoDraw(true);
    }

    frameRemains = 0.0 + 300.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (perf2_num.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      perf2_num.setAutoDraw(false);
    }
    
    // *perf2_txt1* updates
    if (t >= 0.0 && perf2_txt1.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      perf2_txt1.tStart = t;  // (not accounting for frame time here)
      perf2_txt1.frameNStart = frameN;  // exact frame index
      
      perf2_txt1.setAutoDraw(true);
    }

    frameRemains = 0.0 + 300.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (perf2_txt1.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      perf2_txt1.setAutoDraw(false);
    }
    
    // *perf2_ex5* updates
    if (t >= 0.0 && perf2_ex5.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      perf2_ex5.tStart = t;  // (not accounting for frame time here)
      perf2_ex5.frameNStart = frameN;  // exact frame index
      
      perf2_ex5.setAutoDraw(true);
    }

    frameRemains = 0.0 + 300.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (perf2_ex5.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      perf2_ex5.setAutoDraw(false);
    }
    
    // *perf2_ex4* updates
    if (t >= 0.0 && perf2_ex4.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      perf2_ex4.tStart = t;  // (not accounting for frame time here)
      perf2_ex4.frameNStart = frameN;  // exact frame index
      
      perf2_ex4.setAutoDraw(true);
    }

    frameRemains = 0.0 + 300.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (perf2_ex4.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      perf2_ex4.setAutoDraw(false);
    }
    
    // *perf2_ex3* updates
    if (t >= 0.0 && perf2_ex3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      perf2_ex3.tStart = t;  // (not accounting for frame time here)
      perf2_ex3.frameNStart = frameN;  // exact frame index
      
      perf2_ex3.setAutoDraw(true);
    }

    frameRemains = 0.0 + 300.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (perf2_ex3.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      perf2_ex3.setAutoDraw(false);
    }
    
    // *perf2_ex2* updates
    if (t >= 0.0 && perf2_ex2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      perf2_ex2.tStart = t;  // (not accounting for frame time here)
      perf2_ex2.frameNStart = frameN;  // exact frame index
      
      perf2_ex2.setAutoDraw(true);
    }

    frameRemains = 0.0 + 300.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (perf2_ex2.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      perf2_ex2.setAutoDraw(false);
    }
    
    // *perf2_ex1* updates
    if (t >= 0.0 && perf2_ex1.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      perf2_ex1.tStart = t;  // (not accounting for frame time here)
      perf2_ex1.frameNStart = frameN;  // exact frame index
      
      perf2_ex1.setAutoDraw(true);
    }

    frameRemains = 0.0 + 300.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (perf2_ex1.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      perf2_ex1.setAutoDraw(false);
    }
    
    // *perf2_bg1* updates
    if (t >= 0.0 && perf2_bg1.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      perf2_bg1.tStart = t;  // (not accounting for frame time here)
      perf2_bg1.frameNStart = frameN;  // exact frame index
      
      perf2_bg1.setAutoDraw(true);
    }

    frameRemains = 0.0 + 300.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (perf2_bg1.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      perf2_bg1.setAutoDraw(false);
    }
    
    // *perf2_bg2* updates
    if (t >= 0.0 && perf2_bg2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      perf2_bg2.tStart = t;  // (not accounting for frame time here)
      perf2_bg2.frameNStart = frameN;  // exact frame index
      
      perf2_bg2.setAutoDraw(true);
    }

    frameRemains = 0.0 + 300.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (perf2_bg2.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      perf2_bg2.setAutoDraw(false);
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of Performance_2Components)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function Performance_2RoutineEnd(snapshot) {
  return function () {
    //------Ending Routine 'Performance_2'-------
    for (const thisComponent of Performance_2Components) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    return Scheduler.Event.NEXT;
  };
}


var Performance_3Components;
function Performance_3RoutineBegin(snapshot) {
  return function () {
    //------Prepare to start Routine 'Performance_3'-------
    t = 0;
    Performance_3Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(300.500000);
    // update component parameters for each repeat
    // keep track of which components have finished
    Performance_3Components = [];
    Performance_3Components.push(perf3_num);
    Performance_3Components.push(perf3_txt1);
    Performance_3Components.push(perf3_ex5);
    Performance_3Components.push(perf3_ex4);
    Performance_3Components.push(perf3_ex3);
    Performance_3Components.push(perf3_ex2);
    Performance_3Components.push(perf3_ex1);
    Performance_3Components.push(perf3_bg1);
    Performance_3Components.push(perf3_bg2);
    
    for (const thisComponent of Performance_3Components)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function Performance_3RoutineEachFrame(snapshot) {
  return function () {
    //------Loop for each frame of Routine 'Performance_3'-------
    // get current time
    t = Performance_3Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *perf3_num* updates
    if (t >= 0.0 && perf3_num.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      perf3_num.tStart = t;  // (not accounting for frame time here)
      perf3_num.frameNStart = frameN;  // exact frame index
      
      perf3_num.setAutoDraw(true);
    }

    frameRemains = 0.0 + 300.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (perf3_num.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      perf3_num.setAutoDraw(false);
    }
    
    // *perf3_txt1* updates
    if (t >= 0.0 && perf3_txt1.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      perf3_txt1.tStart = t;  // (not accounting for frame time here)
      perf3_txt1.frameNStart = frameN;  // exact frame index
      
      perf3_txt1.setAutoDraw(true);
    }

    frameRemains = 0.0 + 300.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (perf3_txt1.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      perf3_txt1.setAutoDraw(false);
    }
    
    // *perf3_ex5* updates
    if (t >= 0.0 && perf3_ex5.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      perf3_ex5.tStart = t;  // (not accounting for frame time here)
      perf3_ex5.frameNStart = frameN;  // exact frame index
      
      perf3_ex5.setAutoDraw(true);
    }

    frameRemains = 0.0 + 300.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (perf3_ex5.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      perf3_ex5.setAutoDraw(false);
    }
    
    // *perf3_ex4* updates
    if (t >= 0.0 && perf3_ex4.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      perf3_ex4.tStart = t;  // (not accounting for frame time here)
      perf3_ex4.frameNStart = frameN;  // exact frame index
      
      perf3_ex4.setAutoDraw(true);
    }

    frameRemains = 0.0 + 300.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (perf3_ex4.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      perf3_ex4.setAutoDraw(false);
    }
    
    // *perf3_ex3* updates
    if (t >= 0.0 && perf3_ex3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      perf3_ex3.tStart = t;  // (not accounting for frame time here)
      perf3_ex3.frameNStart = frameN;  // exact frame index
      
      perf3_ex3.setAutoDraw(true);
    }

    frameRemains = 0.0 + 300.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (perf3_ex3.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      perf3_ex3.setAutoDraw(false);
    }
    
    // *perf3_ex2* updates
    if (t >= 0.0 && perf3_ex2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      perf3_ex2.tStart = t;  // (not accounting for frame time here)
      perf3_ex2.frameNStart = frameN;  // exact frame index
      
      perf3_ex2.setAutoDraw(true);
    }

    frameRemains = 0.0 + 300.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (perf3_ex2.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      perf3_ex2.setAutoDraw(false);
    }
    
    // *perf3_ex1* updates
    if (t >= 0.0 && perf3_ex1.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      perf3_ex1.tStart = t;  // (not accounting for frame time here)
      perf3_ex1.frameNStart = frameN;  // exact frame index
      
      perf3_ex1.setAutoDraw(true);
    }

    frameRemains = 0.0 + 300.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (perf3_ex1.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      perf3_ex1.setAutoDraw(false);
    }
    
    // *perf3_bg1* updates
    if (t >= 0.0 && perf3_bg1.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      perf3_bg1.tStart = t;  // (not accounting for frame time here)
      perf3_bg1.frameNStart = frameN;  // exact frame index
      
      perf3_bg1.setAutoDraw(true);
    }

    frameRemains = 0.0 + 300.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (perf3_bg1.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      perf3_bg1.setAutoDraw(false);
    }
    
    // *perf3_bg2* updates
    if (t >= 0.0 && perf3_bg2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      perf3_bg2.tStart = t;  // (not accounting for frame time here)
      perf3_bg2.frameNStart = frameN;  // exact frame index
      
      perf3_bg2.setAutoDraw(true);
    }

    frameRemains = 0.0 + 300.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (perf3_bg2.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      perf3_bg2.setAutoDraw(false);
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of Performance_3Components)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function Performance_3RoutineEnd(snapshot) {
  return function () {
    //------Ending Routine 'Performance_3'-------
    for (const thisComponent of Performance_3Components) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    return Scheduler.Event.NEXT;
  };
}


var DebriefingComponents;
function DebriefingRoutineBegin(snapshot) {
  return function () {
    //------Prepare to start Routine 'Debriefing'-------
    t = 0;
    DebriefingClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(300.000000);
    // update component parameters for each repeat
    // keep track of which components have finished
    DebriefingComponents = [];
    DebriefingComponents.push(debrf_info);
    
    for (const thisComponent of DebriefingComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function DebriefingRoutineEachFrame(snapshot) {
  return function () {
    //------Loop for each frame of Routine 'Debriefing'-------
    // get current time
    t = DebriefingClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *debrf_info* updates
    if (t >= 0.0 && debrf_info.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      debrf_info.tStart = t;  // (not accounting for frame time here)
      debrf_info.frameNStart = frameN;  // exact frame index
      
      debrf_info.setAutoDraw(true);
    }

    frameRemains = 0.0 + 300.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (debrf_info.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      debrf_info.setAutoDraw(false);
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of DebriefingComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function DebriefingRoutineEnd(snapshot) {
  return function () {
    //------Ending Routine 'Debriefing'-------
    for (const thisComponent of DebriefingComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    return Scheduler.Event.NEXT;
  };
}


function endLoopIteration(scheduler, snapshot) {
  // ------Prepare for next entry------
  return function () {
    if (typeof snapshot !== 'undefined') {
      // ------Check if user ended loop early------
      if (snapshot.finished) {
        // Check for and save orphaned data
        if (psychoJS.experiment.isEntryEmpty()) {
          psychoJS.experiment.nextEntry(snapshot);
        }
        scheduler.stop();
      } else {
        const thisTrial = snapshot.getCurrentTrial();
        if (typeof thisTrial === 'undefined' || !('isTrials' in thisTrial) || thisTrial.isTrials) {
          psychoJS.experiment.nextEntry(snapshot);
        }
      }
    return Scheduler.Event.NEXT;
    }
  };
}


function importConditions(currentLoop) {
  return function () {
    psychoJS.importAttributes(currentLoop.getCurrentTrial());
    return Scheduler.Event.NEXT;
    };
}


function quitPsychoJS(message, isCompleted) {
  // Check for and save orphaned data
  if (psychoJS.experiment.isEntryEmpty()) {
    psychoJS.experiment.nextEntry();
  }
  
  
  psychoJS.window.close();
  psychoJS.quit({message: message, isCompleted: isCompleted});
  
  return Scheduler.Event.QUIT;
}
