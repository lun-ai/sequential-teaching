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
let expInfo = {'participant': '000', 'session': '001'};

// Start code blocks for 'Before Experiment'
sleepTime = 0.2;
green = [(- 0.0039), 1.0, (- 1.0)];
red = [1.0, (- 0.2235), (- 0.4431)];
white = "white";
repeats = 0;
traceSaveAtFrame = 20;
introTimeL = 120;
mergeTestTimeL = 90;
mergeTrainTimeL = 60;
mergeExplTimeL = 30;
sortTestTimeL = 300;
sortTrainTimeL = 240;
sortExplTimeL = 60;
scaleEqPath = "materials/merge_sort/imgs/scale_balanced.png";
scaleLtPath = "materials/merge_sort/imgs/scale_right.png";
scaleGtPath = "materials/merge_sort/imgs/scale_left.png";

function moveItem(mouse, grabbed) {
    var u, v;
    if (((grabbed !== null) && mouse.isPressedIn(grabbed))) {
        [u, v] = mouse.getPos();
        if (((((left <= u) && (u <= right)) && (bot <= v)) && (v <= top))) {
            grabbed.pos = [u, v];
        }
        return grabbed;
    } else {
        for (var item, _pj_c = 0, _pj_a = items, _pj_b = _pj_a.length; (_pj_c < _pj_b); _pj_c += 1) {
            item = _pj_a[_pj_c];
            if ((mouse.isPressedIn(item) && (grabbed !== item))) {
                return item;
            }
        }
    }
    return grabbed;
}

var leftValue;
var rightValue;
function comparePickedItems(scale, values, labels, leftInput, rightInput) {
    var leftIdx, leftValue, rightIdx, rightValue;
    if (((leftInput.text.length === 0) || (leftInput.text.length === 0))) {
        throw new ValueError();
    } else {
        if (((leftInput.text.length > 1) || (leftInput.text.length > 1))) {
            throw new TypeError();
        }
    }
    try {
        leftIdx = labels.index(leftInput.text);
        rightIdx = labels.index(rightInput.text);
    } catch(e) {
        if ((e instanceof ValueError)) {
            throw new IndexError();
        } else {
            throw e;
        }
    }
    leftValue = values[leftIdx];
    rightValue = values[rightIdx];
    if ((leftValue > rightValue)) {
        scale.image = scaleGtPath;
    } else {
        if ((leftValue < rightValue)) {
            scale.image = scaleLtPath;
        } else {
            scale.image = scaleEqPath;
        }
    }
    timeSleep(sleepTime);
}

var u;
function timeSleep(T) {
    var u;
    u = 0;
    for (var i = 0, _pj_a = (10000 * T); (i < _pj_a); i += 1) {
        u = (u + 1);
    }
}

function compare(scale, listValues, labels, instr, scaleLeft, scaleRight) {
    try {
        comparePickedItems(scale, listValues, labels, scaleLeft, scaleRight);
        instr.text = "";
        instr.color = white;
        return 1;
    } catch(e) {
        if ((e instanceof ValueError)) {
            instr.text = "Please provide labels in correct format for both LHS and RHS";
            instr.color = red;
            return 0;
        } else {
            if ((e instanceof IndexError)) {
                instr.text = "Please enter an existing item";
                instr.color = red;
                return 0;
            } else {
                if ((e instanceof TypeError)) {
                    instr.text = "Please enter labels as single capitals";
                    instr.color = red;
                    return 0;
                } else {
                    throw e;
                }
            }
        }
    }
}

var temp;
var labels;
function labelMergeInput(input, labelList) {
    var labels, temp;
    temp = sorted(input);
    labels = [];
    for (var i, _pj_c = 0, _pj_a = temp, _pj_b = _pj_a.length; (_pj_c < _pj_b); _pj_c += 1) {
        i = _pj_a[_pj_c];
        labels.append(labelList[input.index(i)]);
    }
    return labels;
}

var correct;
var submitted;
var values;
var correctValues;
function checkSortTrainAns(input, labels, res, feedback_1, feedback_2) {
    var correct, correctValues, submitted, values;
    correct = getSortTrace(input, labels);
    submitted = res.replace(" ", "");
    values = res.replace(",", "");
    correctValues = correct.replace(",", "");
    if ((submitted === correct)) {
        feedback_1.text = "Your answer is correct!";
        feedback_1.color = green;
        feedback_2.text = "";
    } else {
        if ((values === correctValues)) {
            feedback_1.text = "Your answer does not have the correct format!\n";
            feedback_1.color = red;
            feedback_2.text = ("The correct answer is >>>>\n" + correct);
            feedback_2.color = green;
        } else {
            feedback_1.text = "Your answer is wrong!";
            feedback_1.color = red;
            feedback_2.text = ("The correct answer is >>>>\n" + correct);
            feedback_2.color = green;
        }
    }
}

var sublistLabels;
function getSortTrace(input, labels) {
    var sublistLabels, sublists, temp;
    temp = [];
    for (var i, _pj_c = 0, _pj_a = input, _pj_b = _pj_a.length; (_pj_c < _pj_b); _pj_c += 1) {
        i = _pj_a[_pj_c];
        temp.append([i]);
    }
    while ((temp.length > 1)) {
        sublists = [];
        for (var i = 0, _pj_a = Number.parseInt((temp.length / 2)); (i < _pj_a); i += 1) {
            sublists.append(sorted((temp[(i * 2)] + temp[((i * 2) + 1)])));
        }
        if (((temp.length % 2) === 1)) {
            temp = (sublists + [temp.slice((- 1))[0]]);
        } else {
            temp = sublists;
        }
    }
    sublistLabels = "";
    for (var i = 0, _pj_a = temp.length; (i < _pj_a); i += 1) {
        for (var j = 0, _pj_b = temp[i].length; (j < _pj_b); j += 1) {
            sublistLabels = (sublistLabels + labels[input.index(temp[i][j])]);
            if (((i < (temp.length - 1)) || (j < (temp[i].length - 1)))) {
                sublistLabels = (sublistLabels + ",");
            }
        }
    }
    return sublistLabels;
}

var enabledComponents;
var i;
function enableImageComponents(components, labels, imagePathBase) {
    var enabledComponents, exId, i, imageIdx;
    enabledComponents = [];
    i = 0;
    for (var component, _pj_c = 0, _pj_a = components, _pj_b = _pj_a.length; (_pj_c < _pj_b); _pj_c += 1) {
        component = _pj_a[_pj_c];
        if ((component instanceof visual.ImageStim)) {
            exId = component.name.split("_").slice((- 2));
            if ((exId.slice((- 2))[0] === "ex")) {
                imageIdx = exId.slice((- 1))[0];
                if ((Number.parseInt(imageIdx) > labels.length)) {
                    component.image = null;
                } else {
                    component.image = (((imagePathBase + "_") + labels[i]) + ".png");
                    enabledComponents.append(component);
                    i += 1;
                }
            }
        }
    }
    return enabledComponents;
}

var rand_seq;
var order;
function getCorrectMCOrder(N, path1, path2, img1, img2) {
    var order, rand_seq;
    rand_seq = [0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1];
    order = [rand_seq[(N - 1)], (1 - rand_seq[(N - 1)])];
    if ((((path1.split("_").slice((- 1))[0] === "wrong.png") && (path2.split("_").slice((- 1))[0] === "correct.png")) || ((path2.split("_").slice((- 1))[0] === "wrong.png") && (path1.split("_").slice((- 1))[0] === "correct.png")))) {
        if ((order === [1, 0])) {
            img1.image = path1;
            img2.image = path2;
        } else {
            img1.image = path2;
            img2.image = path1;
        }
        return order;
    } else {
        throw new ValueError("Training multiple choice setup is incorrect!");
    }
}

function showMergeExpl(submitted, feedback1, feedback2, mc1, mc2, mcPath1, mcPath2, expl1, expl2) {
    feedback1.text = "";
    feedback2.text = "";
    if ((submitted === 0)) {
        feedback1.text = "SELECTED >>> \n";
    } else {
        if ((submitted === 1)) {
            feedback2.text = "SELECTED >>> \n";
        }
    }
    if ((mc_order === [1, 0])) {
        feedback1.color = green;
        feedback2.color = red;
        feedback1.text = (feedback1.text + "This answer is correct!");
        feedback2.text = (feedback2.text + "This answer is wrong!");
        mc1.image = (mcPath1.split(".png")[0] + "_selected.png");
        mc2.image = (mcPath2.split(".png")[0] + "_selected.png");
        expl1.image = (mcPath1.split(".png")[0] + "_expl.png");
        expl2.image = (mcPath2.split(".png")[0] + "_expl.png");
    } else {
        feedback1.color = red;
        feedback2.color = green;
        feedback1.text = (feedback1.text + "This answer is wrong!");
        feedback2.text = (feedback2.text + "This answer is correct!");
        mc1.image = (mcPath2.split(".png")[0] + "_selected.png");
        mc2.image = (mcPath1.split(".png")[0] + "_selected.png");
        expl1.image = (mcPath2.split(".png")[0] + "_expl.png");
        expl2.image = (mcPath1.split(".png")[0] + "_expl.png");
    }
}

function checkBGSelection(m, groups, picked) {
    for (var item, _pj_c = 0, _pj_a = groups, _pj_b = _pj_a.length; (_pj_c < _pj_b); _pj_c += 1) {
        item = _pj_a[_pj_c];
        if (((m !== null) && m.isPressedIn(item))) {
            for (var others, _pj_f = 0, _pj_d = groups, _pj_e = _pj_d.length; (_pj_f < _pj_e); _pj_f += 1) {
                others = _pj_d[_pj_f];
                others.fillColor = white;
            }
            item.fillColor = green;
            timeSleep(sleepTime);
            return item;
        }
    }
    return picked;
}

var tRemain;
function timerWarning(timeLimt, timePassed) {
    var tRemain;
    tRemain = Number.parseInt((timeLimt - t));
    if ((tRemain <= 30)) {
        return ("Remain time sec: " + tRemain.toString());
    } else {
        return "";
    }
}

var updated;
function updateTrace(itemPos, newItemPos) {
    var updated;
    updated = [];
    for (var i, _pj_c = 0, _pj_a = itemPos, _pj_b = _pj_a.length; (_pj_c < _pj_b); _pj_c += 1) {
        i = _pj_a[_pj_c];
        for (var j, _pj_f = 0, _pj_d = newItemPos, _pj_e = _pj_d.length; (_pj_f < _pj_e); _pj_f += 1) {
            j = _pj_d[_pj_f];
            if (((i[0] === j[0]) && (! ((i[1] === j[1]) && (i[2] === j[2]))))) {
                updated.append(j);
            }
        }
    }
    return updated;
}

function makeScreenShot() {
    return (repeats + 1);
}

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
flowScheduler.add(INTRORoutineBegin());
flowScheduler.add(INTRORoutineEachFrame());
flowScheduler.add(INTRORoutineEnd());
flowScheduler.add(BACKGROUNDRoutineBegin());
flowScheduler.add(BACKGROUNDRoutineEachFrame());
flowScheduler.add(BACKGROUNDRoutineEnd());
flowScheduler.add(MERGE_INTRORoutineBegin());
flowScheduler.add(MERGE_INTRORoutineEachFrame());
flowScheduler.add(MERGE_INTRORoutineEnd());
const TRAIN_1LoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(TRAIN_1LoopBegin, TRAIN_1LoopScheduler);
flowScheduler.add(TRAIN_1LoopScheduler);
flowScheduler.add(TRAIN_1LoopEnd);
flowScheduler.add(MERGE_TEST_INTRORoutineBegin());
flowScheduler.add(MERGE_TEST_INTRORoutineEachFrame());
flowScheduler.add(MERGE_TEST_INTRORoutineEnd());
const TEST_1LoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(TEST_1LoopBegin, TEST_1LoopScheduler);
flowScheduler.add(TEST_1LoopScheduler);
flowScheduler.add(TEST_1LoopEnd);
flowScheduler.add(SORT_INTRORoutineBegin());
flowScheduler.add(SORT_INTRORoutineEachFrame());
flowScheduler.add(SORT_INTRORoutineEnd());
const TRAIN_2LoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(TRAIN_2LoopBegin, TRAIN_2LoopScheduler);
flowScheduler.add(TRAIN_2LoopScheduler);
flowScheduler.add(TRAIN_2LoopEnd);
flowScheduler.add(SORT_TEST_INTRORoutineBegin());
flowScheduler.add(SORT_TEST_INTRORoutineEachFrame());
flowScheduler.add(SORT_TEST_INTRORoutineEnd());
const TEST_2LoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(TEST_2LoopBegin, TEST_2LoopScheduler);
flowScheduler.add(TEST_2LoopScheduler);
flowScheduler.add(TEST_2LoopEnd);
flowScheduler.add(DEBRIEFRoutineBegin());
flowScheduler.add(DEBRIEFRoutineEachFrame());
flowScheduler.add(DEBRIEFRoutineEnd());
flowScheduler.add(quitPsychoJS, '', true);

// quit if user presses Cancel in dialog box:
dialogCancelScheduler.add(quitPsychoJS, '', false);

psychoJS.start({
  expName: expName,
  expInfo: expInfo,
  resources: [
    {'name': 'materials/merge_sort/imgs/sort_train/sort_test_example.png', 'path': 'materials/merge_sort/imgs/sort_train/sort_test_example.png'},
    {'name': 'materials/merge_sort/imgs/merge_train/merge_train_ex_5_2_wrong.png', 'path': 'materials/merge_sort/imgs/merge_train/merge_train_ex_5_2_wrong.png'},
    {'name': 'materials/merge_sort/imgs/merge_train/merge_train_ex_5.png', 'path': 'materials/merge_sort/imgs/merge_train/merge_train_ex_5.png'},
    {'name': 'materials/merge_sort/imgs/merge_train/merge_train_ex_5_2_correct.png', 'path': 'materials/merge_sort/imgs/merge_train/merge_train_ex_5_2_correct.png'},
    {'name': 'materials/merge_sort/imgs/merge_train/merge_train_ex_2.png', 'path': 'materials/merge_sort/imgs/merge_train/merge_train_ex_2.png'},
    {'name': 'materials/merge_sort/imgs/merge_train/merge_train_ex_2_1_correct.png', 'path': 'materials/merge_sort/imgs/merge_train/merge_train_ex_2_1_correct.png'},
    {'name': 'materials/merge_sort/imgs/door.png', 'path': 'materials/merge_sort/imgs/door.png'},
    {'name': 'materials/merge_sort/imgs/merge_train/merge_train_ex_5_1_wrong.png', 'path': 'materials/merge_sort/imgs/merge_train/merge_train_ex_5_1_wrong.png'},
    {'name': 'materials/merge_sort/imgs/merge_train/merge_train_ex_2_2_wrong.png', 'path': 'materials/merge_sort/imgs/merge_train/merge_train_ex_2_2_wrong.png'},
    {'name': 'materials/merge_sort/imgs/merge_test/merge_test_ex_4.png', 'path': 'materials/merge_sort/imgs/merge_test/merge_test_ex_4.png'},
    {'name': 'materials/merge_sort/imgs/alice.png', 'path': 'materials/merge_sort/imgs/alice.png'},
    {'name': 'materials/merge_sort/imgs/merge_test/merge_test_ex_5.png', 'path': 'materials/merge_sort/imgs/merge_test/merge_test_ex_5.png'},
    {'name': 'materials/merge_sort/imgs/merge_train/merge_train_ex_5_3_correct.png', 'path': 'materials/merge_sort/imgs/merge_train/merge_train_ex_5_3_correct.png'},
    {'name': 'materials/merge_test_cond.csv', 'path': 'materials/merge_test_cond.csv'},
    {'name': 'materials/merge_sort/imgs/merge_train/merge_train_ex_5_1_correct.png', 'path': 'materials/merge_sort/imgs/merge_train/merge_train_ex_5_1_correct.png'},
    {'name': 'materials/merge_sort/imgs/merge_test/merge_test_ex_3.png', 'path': 'materials/merge_sort/imgs/merge_test/merge_test_ex_3.png'},
    {'name': 'materials/merge_sort/imgs/white_BG.png', 'path': 'materials/merge_sort/imgs/white_BG.png'},
    {'name': 'materials/merge_sort/imgs/merge_train/merge_train_ex_1_1_correct.png', 'path': 'materials/merge_sort/imgs/merge_train/merge_train_ex_1_1_correct.png'},
    {'name': 'materials/merge_sort/imgs/merge_train/merge_train_ex_1.png', 'path': 'materials/merge_sort/imgs/merge_train/merge_train_ex_1.png'},
    {'name': 'materials/merge_sort/imgs/purple_diamond.png', 'path': 'materials/merge_sort/imgs/purple_diamond.png'},
    {'name': 'materials/merge_sort/imgs/merge_train/merge_train_ex_1_1_wrong.png', 'path': 'materials/merge_sort/imgs/merge_train/merge_train_ex_1_1_wrong.png'},
    {'name': 'materials/merge_train_cond.csv', 'path': 'materials/merge_train_cond.csv'},
    {'name': 'materials/merge_sort/imgs/bob.png', 'path': 'materials/merge_sort/imgs/bob.png'},
    {'name': 'materials/sort_test_cond.csv', 'path': 'materials/sort_test_cond.csv'},
    {'name': 'materials/merge_sort/imgs/merge_train/merge_train_example.png', 'path': 'materials/merge_sort/imgs/merge_train/merge_train_example.png'},
    {'name': 'materials/merge_sort/imgs/sort_train/sort_train_example.png', 'path': 'materials/merge_sort/imgs/sort_train/sort_train_example.png'},
    {'name': 'materials/merge_sort/imgs/merge_train/merge_train_ex_2_2_correct.png', 'path': 'materials/merge_sort/imgs/merge_train/merge_train_ex_2_2_correct.png'},
    {'name': 'materials/merge_sort/imgs/merge_test/merge_test_ex_2.png', 'path': 'materials/merge_sort/imgs/merge_test/merge_test_ex_2.png'},
    {'name': 'materials/merge_sort/imgs/merge_train/merge_train_ex_2_1_wrong.png', 'path': 'materials/merge_sort/imgs/merge_train/merge_train_ex_2_1_wrong.png'},
    {'name': 'materials/merge_sort/imgs/merge_train/merge_train_ex_5_3_wrong.png', 'path': 'materials/merge_sort/imgs/merge_train/merge_train_ex_5_3_wrong.png'},
    {'name': 'materials/sort_train_cond.csv', 'path': 'materials/sort_train_cond.csv'},
    {'name': 'materials/merge_sort/imgs/merge_test/merge_test_ex_1.png', 'path': 'materials/merge_sort/imgs/merge_test/merge_test_ex_1.png'}
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


var INTROClock;
var intro_text;
var alice;
var bob;
var door_1;
var door_2;
var intro_btn;
var intro_mouse;
var BACKGROUNDClock;
var background_instr;
var gender;
var background_gender_female;
var background_gender_male;
var age;
var background_age_18_24;
var background_age_25_34;
var background_age_35_44;
var background_age_45_54;
var background_age_55_64;
var background_age_65;
var education;
var background_education_before_high_school;
var background_education_high_school;
var background_education_college;
var background_education_bachelor;
var background_education_graudate;
var backgrond_education_doctorate;
var background_education_other;
var background_btn;
var background_mouse;
var MERGE_INTROClock;
var intro_text_2;
var alice_2;
var merge_example;
var door_3;
var merge_intro_btn;
var merge_intro_mouse;
var MERGE_TRAINClock;
var merge_train_scale_instr;
var merge_ans_instr;
var merge_train_instr;
var merge_train_scale_right;
var merge_train_scale_left;
var merge_train_compare;
var merge_train_sep;
var merge_train;
var merge_train_mc_1;
var merge_train_mc_2;
var merge_train_scale;
var merge_train_btn_1;
var merge_train_btn_2;
var merge_train_mouse;
var merge_train_timer;
var MERGE_EXPLClock;
var merge_expl_instr;
var merge_expl_feedback_1;
var merge_expl_feedback_2;
var merge_expl_sep;
var merge_expl_1;
var merge_expl_2;
var merge_expl_mc_1;
var merge_expl_mc_2;
var merge_expl_btn;
var merge_expl_mouse;
var merge_expl_timer;
var MERGE_TEST_INTROClock;
var intro_text_6;
var alice_4;
var merge_example_2;
var door_6;
var merge_test_intro_btn;
var merge_test_intro_mouse;
var MERGE_TESTClock;
var merge_test_scale_instr;
var merge_test_ans_instr;
var merge_test_instr;
var merge_test_scale_right;
var merge_test_scale_left;
var merge_test_compare;
var merge_test_res;
var merge_test_sep;
var merge_test;
var merge_test_scale;
var merge_test_btn;
var merge_test_mouse;
var merge_test_timer;
var SORT_INTROClock;
var intro_text_3;
var bob_2;
var sort_example;
var door_4;
var sort_intro_btn;
var sort_intro_mouse;
var SORT_TRAINClock;
var sort_train_scale_instr;
var sort_train_ans_instr;
var sort_train_instr;
var sort_train_scale_right;
var sort_train_scale_left;
var sort_train_compare;
var sort_train_res;
var sort_train_sep;
var sort_train_board;
var sort_train_scale;
var sort_train_ex_1;
var sort_train_ex_2;
var sort_train_ex_3;
var sort_train_ex_4;
var sort_train_ex_5;
var sort_train_ex_6;
var sort_train_ex_7;
var sort_train_ex_8;
var sort_train_ex_9;
var sort_train_ex_10;
var sort_train_ex_11;
var sort_train_ex_12;
var sort_train_btn;
var sort_train_mouse;
var sort_train_timer;
var sort_train_hint;
var SORT_EXPLClock;
var sort_expl_scale_instr;
var sort_expl_feedback_1;
var sort_expl_feedback_2;
var sort_expl_instr;
var sort_expl_scale_right;
var sort_expl_scale_left;
var sort_expl_compare;
var sort_expl_res;
var sort_expl_sep;
var sort_expl_board;
var sort_expl_scale;
var sort_expl_ex_1;
var sort_expl_ex_2;
var sort_expl_ex_3;
var sort_expl_ex_4;
var sort_expl_ex_5;
var sort_expl_ex_6;
var sort_expl_ex_7;
var sort_expl_ex_8;
var sort_expl_ex_9;
var sort_expl_ex_10;
var sort_expl_ex_11;
var sort_expl_ex_12;
var sort_expl_btn;
var sort_expl_mouse;
var sort_expl_timer;
var sort_expl_hint;
var SORT_TEST_INTROClock;
var intro_text_7;
var bob_4;
var sort_example_2;
var door_7;
var sort_test_intro_btn;
var sort_test_intro_mouse;
var SORT_TESTClock;
var sort_test_scale_instr;
var sort_test_ans_instr;
var sort_test_instr;
var sort_test_scale_right;
var sort_test_scale_left;
var sort_test_compare;
var sort_test_res;
var sort_test_sep;
var sort_test_board;
var sort_test_scale;
var sort_test_ex_1;
var sort_test_ex_2;
var sort_test_ex_3;
var sort_test_ex_4;
var sort_test_ex_5;
var sort_test_ex_6;
var sort_test_ex_7;
var sort_test_ex_8;
var sort_test_ex_9;
var sort_test_ex_10;
var sort_test_ex_11;
var sort_test_ex_12;
var sort_test_btn;
var sort_test_mouse;
var sort_test_timer;
var DEBRIEFClock;
var intro_text_5;
var debrief_btn;
var debrief_mouse;
var globalClock;
var routineTimer;
function experimentInit() {
  // Initialize components for Routine "INTRO"
  INTROClock = new util.Clock();
  intro_text = new visual.TextStim({
    win: psychoJS.window,
    name: 'intro_text',
    text: 'Today, you will learn how to help our robot trader friends ALICE & BOB to package fruits for shipment. \n\nYou will visit two warehouses "rooms", in which you will learn individual steps of the process from ALICE and BOB. \n\nIn the end, you can put the skills learned in the rooms together and complete the whole process by yourself!',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, (- 0.15)], height: 0.03,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
  alice = new visual.ImageStim({
    win : psychoJS.window,
    name : 'alice', units : undefined, 
    image : 'materials/merge_sort/imgs/alice.png', mask : undefined,
    ori : 0.0, pos : [(- 0.2), 0.2], size : [0.2, 0.2],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -1.0 
  });
  bob = new visual.ImageStim({
    win : psychoJS.window,
    name : 'bob', units : undefined, 
    image : 'materials/merge_sort/imgs/bob.png', mask : undefined,
    ori : 0.0, pos : [0.2, 0.2], size : [0.2, 0.2],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -2.0 
  });
  door_1 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'door_1', units : undefined, 
    image : 'materials/merge_sort/imgs/door.png', mask : undefined,
    ori : 0.0, pos : [(- 0.4), 0.2], size : [0.15, 0.3],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -3.0 
  });
  door_2 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'door_2', units : undefined, 
    image : 'materials/merge_sort/imgs/door.png', mask : undefined,
    ori : 0.0, pos : [0.4, 0.2], size : [0.15, 0.3],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -4.0 
  });
  intro_btn = new visual.TextBox({
    win: psychoJS.window,
    name: 'intro_btn',
    text: 'Continue',
    font: 'Open Sans',
    pos: [0, (- 0.4)], letterHeight: 0.05,
    size: [0.28, 0.1],  units: undefined, 
    color: 'black', colorSpace: 'rgb',
    fillColor: 'white', borderColor: undefined,
    bold: true, italic: false,
    opacity: undefined,
    padding: undefined,
    editable: false,
    multiline: true,
    anchor: 'center',
    depth: -6.0 
  });
  
  intro_mouse = new core.Mouse({
    win: psychoJS.window,
  });
  intro_mouse.mouseClock = new util.Clock();
  // Initialize components for Routine "BACKGROUND"
  BACKGROUNDClock = new util.Clock();
  background_instr = new visual.TextStim({
    win: psychoJS.window,
    name: 'background_instr',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0.4], height: 0.03,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: -3.0 
  });
  
  gender = new visual.TextStim({
    win: psychoJS.window,
    name: 'gender',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0.3], height: 0.03,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: -4.0 
  });
  
  background_gender_female = new visual.TextBox({
    win: psychoJS.window,
    name: 'background_gender_female',
    text: 'Female',
    font: 'Open Sans',
    pos: [(- 0.15), 0.25], letterHeight: 0.03,
    size: [0.12, 0.07],  units: undefined, 
    color: 'black', colorSpace: 'rgb',
    fillColor: 'white', borderColor: undefined,
    bold: false, italic: false,
    opacity: undefined,
    padding: undefined,
    editable: false,
    multiline: true,
    anchor: 'top-center',
    depth: -5.0 
  });
  
  background_gender_male = new visual.TextBox({
    win: psychoJS.window,
    name: 'background_gender_male',
    text: 'Male',
    font: 'Open Sans',
    pos: [0.15, 0.25], letterHeight: 0.03,
    size: [0.1, 0.07],  units: undefined, 
    color: 'black', colorSpace: 'rgb',
    fillColor: 'white', borderColor: undefined,
    bold: false, italic: false,
    opacity: undefined,
    padding: undefined,
    editable: false,
    multiline: true,
    anchor: 'top-center',
    depth: -6.0 
  });
  
  age = new visual.TextStim({
    win: psychoJS.window,
    name: 'age',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0.1], height: 0.03,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: -7.0 
  });
  
  background_age_18_24 = new visual.TextBox({
    win: psychoJS.window,
    name: 'background_age_18_24',
    text: '18-24',
    font: 'Open Sans',
    pos: [(- 0.5), 0.05], letterHeight: 0.03,
    size: [0.1, 0.07],  units: undefined, 
    color: 'black', colorSpace: 'rgb',
    fillColor: 'white', borderColor: undefined,
    bold: false, italic: false,
    opacity: undefined,
    padding: undefined,
    editable: false,
    multiline: true,
    anchor: 'top-center',
    depth: -8.0 
  });
  
  background_age_25_34 = new visual.TextBox({
    win: psychoJS.window,
    name: 'background_age_25_34',
    text: '25-34',
    font: 'Open Sans',
    pos: [(- 0.3), 0.05], letterHeight: 0.03,
    size: [0.1, 0.07],  units: undefined, 
    color: 'black', colorSpace: 'rgb',
    fillColor: 'white', borderColor: undefined,
    bold: false, italic: false,
    opacity: undefined,
    padding: undefined,
    editable: false,
    multiline: true,
    anchor: 'top-center',
    depth: -9.0 
  });
  
  background_age_35_44 = new visual.TextBox({
    win: psychoJS.window,
    name: 'background_age_35_44',
    text: '35-44',
    font: 'Open Sans',
    pos: [(- 0.1), 0.05], letterHeight: 0.03,
    size: [0.1, 0.07],  units: undefined, 
    color: 'black', colorSpace: 'rgb',
    fillColor: 'white', borderColor: undefined,
    bold: false, italic: false,
    opacity: undefined,
    padding: undefined,
    editable: false,
    multiline: true,
    anchor: 'top-center',
    depth: -10.0 
  });
  
  background_age_45_54 = new visual.TextBox({
    win: psychoJS.window,
    name: 'background_age_45_54',
    text: '45-54',
    font: 'Open Sans',
    pos: [0.1, 0.05], letterHeight: 0.03,
    size: [0.1, 0.07],  units: undefined, 
    color: 'black', colorSpace: 'rgb',
    fillColor: 'white', borderColor: undefined,
    bold: false, italic: false,
    opacity: undefined,
    padding: undefined,
    editable: false,
    multiline: true,
    anchor: 'top-center',
    depth: -11.0 
  });
  
  background_age_55_64 = new visual.TextBox({
    win: psychoJS.window,
    name: 'background_age_55_64',
    text: '55-64',
    font: 'Open Sans',
    pos: [0.3, 0.05], letterHeight: 0.03,
    size: [0.1, 0.07],  units: undefined, 
    color: 'black', colorSpace: 'rgb',
    fillColor: 'white', borderColor: undefined,
    bold: false, italic: false,
    opacity: undefined,
    padding: undefined,
    editable: false,
    multiline: true,
    anchor: 'top-center',
    depth: -12.0 
  });
  
  background_age_65 = new visual.TextBox({
    win: psychoJS.window,
    name: 'background_age_65',
    text: 'Above 65',
    font: 'Open Sans',
    pos: [0.5, 0.05], letterHeight: 0.03,
    size: [0.15, 0.07],  units: undefined, 
    color: 'black', colorSpace: 'rgb',
    fillColor: 'white', borderColor: undefined,
    bold: false, italic: false,
    opacity: undefined,
    padding: undefined,
    editable: false,
    multiline: true,
    anchor: 'top-center',
    depth: -13.0 
  });
  
  education = new visual.TextStim({
    win: psychoJS.window,
    name: 'education',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, (- 0.1)], height: 0.03,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: -14.0 
  });
  
  background_education_before_high_school = new visual.TextBox({
    win: psychoJS.window,
    name: 'background_education_before_high_school',
    text: 'Less than high school',
    font: 'Open Sans',
    pos: [(- 0.75), (- 0.15)], letterHeight: 0.02,
    size: [0.2, 0.07],  units: undefined, 
    color: 'black', colorSpace: 'rgb',
    fillColor: 'white', borderColor: undefined,
    bold: false, italic: false,
    opacity: undefined,
    padding: undefined,
    editable: false,
    multiline: true,
    anchor: 'top-center',
    depth: -15.0 
  });
  
  background_education_high_school = new visual.TextBox({
    win: psychoJS.window,
    name: 'background_education_high_school',
    text: 'High school  and equivalent',
    font: 'Open Sans',
    pos: [(- 0.5), (- 0.15)], letterHeight: 0.02,
    size: [0.2, 0.07],  units: undefined, 
    color: 'black', colorSpace: 'rgb',
    fillColor: 'white', borderColor: undefined,
    bold: false, italic: false,
    opacity: undefined,
    padding: undefined,
    editable: false,
    multiline: true,
    anchor: 'top-center',
    depth: -16.0 
  });
  
  background_education_college = new visual.TextBox({
    win: psychoJS.window,
    name: 'background_education_college',
    text: 'Some college, no degree',
    font: 'Open Sans',
    pos: [(- 0.25), (- 0.15)], letterHeight: 0.02,
    size: [0.2, 0.07],  units: undefined, 
    color: 'black', colorSpace: 'rgb',
    fillColor: 'white', borderColor: undefined,
    bold: false, italic: false,
    opacity: undefined,
    padding: undefined,
    editable: false,
    multiline: true,
    anchor: 'top-center',
    depth: -17.0 
  });
  
  background_education_bachelor = new visual.TextBox({
    win: psychoJS.window,
    name: 'background_education_bachelor',
    text: 'Bachelor’s degree',
    font: 'Open Sans',
    pos: [0, (- 0.15)], letterHeight: 0.02,
    size: [0.2, 0.07],  units: undefined, 
    color: 'black', colorSpace: 'rgb',
    fillColor: 'white', borderColor: undefined,
    bold: false, italic: false,
    opacity: undefined,
    padding: undefined,
    editable: false,
    multiline: true,
    anchor: 'top-center',
    depth: -18.0 
  });
  
  background_education_graudate = new visual.TextBox({
    win: psychoJS.window,
    name: 'background_education_graudate',
    text: 'Graduate or professional degree',
    font: 'Open Sans',
    pos: [0.25, (- 0.15)], letterHeight: 0.02,
    size: [0.2, 0.07],  units: undefined, 
    color: 'black', colorSpace: 'rgb',
    fillColor: 'white', borderColor: undefined,
    bold: false, italic: false,
    opacity: undefined,
    padding: undefined,
    editable: false,
    multiline: true,
    anchor: 'top-center',
    depth: -19.0 
  });
  
  backgrond_education_doctorate = new visual.TextBox({
    win: psychoJS.window,
    name: 'backgrond_education_doctorate',
    text: 'Doctorate degree',
    font: 'Open Sans',
    pos: [0.5, (- 0.15)], letterHeight: 0.02,
    size: [0.2, 0.07],  units: undefined, 
    color: 'black', colorSpace: 'rgb',
    fillColor: 'white', borderColor: undefined,
    bold: false, italic: false,
    opacity: undefined,
    padding: undefined,
    editable: false,
    multiline: true,
    anchor: 'top-center',
    depth: -20.0 
  });
  
  background_education_other = new visual.TextBox({
    win: psychoJS.window,
    name: 'background_education_other',
    text: 'Other',
    font: 'Open Sans',
    pos: [0.75, (- 0.15)], letterHeight: 0.02,
    size: [0.2, 0.07],  units: undefined, 
    color: 'black', colorSpace: 'rgb',
    fillColor: 'white', borderColor: undefined,
    bold: false, italic: false,
    opacity: undefined,
    padding: undefined,
    editable: false,
    multiline: true,
    anchor: 'top-center',
    depth: -21.0 
  });
  
  background_btn = new visual.TextBox({
    win: psychoJS.window,
    name: 'background_btn',
    text: 'Continue',
    font: 'Open Sans',
    pos: [5, 5], letterHeight: 0.05,
    size: [0, 0],  units: undefined, 
    color: 'black', colorSpace: 'rgb',
    fillColor: 'white', borderColor: undefined,
    bold: true, italic: false,
    opacity: undefined,
    padding: undefined,
    editable: false,
    multiline: true,
    anchor: 'center',
    depth: -23.0 
  });
  
  background_mouse = new core.Mouse({
    win: psychoJS.window,
  });
  background_mouse.mouseClock = new util.Clock();
  // Initialize components for Routine "MERGE_INTRO"
  MERGE_INTROClock = new util.Clock();
  intro_text_2 = new visual.TextStim({
    win: psychoJS.window,
    name: 'intro_text_2',
    text: 'ALICE: BIZZ ... Thank you for coming to help! We have fruits in some boxes to be put on a conveyor.\n\n1. The fruits in EACH ORANGE box INCREASE in weight from LEFT to RIGHT\n\n2. The BLUE STAR puts fruits from two ORANGE boxes on the CONVEYOR BELT in INCREASING weights from LEFT to RIGHT \n\nLEARN the BLUE STAR operation in steps and master it. ',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, (- 0.15)], height: 0.03,  wrapWidth: 1.0, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
  alice_2 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'alice_2', units : undefined, 
    image : 'materials/merge_sort/imgs/alice.png', mask : undefined,
    ori : 0.0, pos : [(- 0.25), 0.25], size : [0.2, 0.2],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -1.0 
  });
  merge_example = new visual.ImageStim({
    win : psychoJS.window,
    name : 'merge_example', units : undefined, 
    image : 'materials/merge_sort/imgs/merge_train/merge_train_example.png', mask : undefined,
    ori : 0.0, pos : [0.3, 0.25], size : [0.7, 0.4],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -2.0 
  });
  door_3 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'door_3', units : undefined, 
    image : 'materials/merge_sort/imgs/door.png', mask : undefined,
    ori : 0.0, pos : [(- 0.45), 0.25], size : [0.15, 0.3],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -3.0 
  });
  merge_intro_btn = new visual.TextBox({
    win: psychoJS.window,
    name: 'merge_intro_btn',
    text: 'Continue',
    font: 'Open Sans',
    pos: [0, (- 0.4)], letterHeight: 0.05,
    size: [0.28, 0.1],  units: undefined, 
    color: 'black', colorSpace: 'rgb',
    fillColor: 'white', borderColor: undefined,
    bold: true, italic: false,
    opacity: undefined,
    padding: undefined,
    editable: false,
    multiline: true,
    anchor: 'center',
    depth: -5.0 
  });
  
  merge_intro_mouse = new core.Mouse({
    win: psychoJS.window,
  });
  merge_intro_mouse.mouseClock = new util.Clock();
  // Initialize components for Routine "MERGE_TRAIN"
  MERGE_TRAINClock = new util.Clock();
  merge_train_scale_instr = new visual.TextStim({
    win: psychoJS.window,
    name: 'merge_train_scale_instr',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [(- 0.65), 0.45], height: 0.02,  wrapWidth: 0.3, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: -6.0 
  });
  
  merge_ans_instr = new visual.TextStim({
    win: psychoJS.window,
    name: 'merge_ans_instr',
    text: 'Please SELECT the CONVEYOR BELT that has the correct fruit(s) on YELLOW position(s):',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, (- 0.15)], height: 0.03,  wrapWidth: 1.5, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: -7.0 
  });
  
  merge_train_instr = new visual.TextStim({
    win: psychoJS.window,
    name: 'merge_train_instr',
    text: '1. Use the scale on the left to COMPARE weights of TWO fruits by entering the alphabetic CAPITAL labels\n\n2. In EACH ORANGE box, fruits are arranged in INCREASING weights from LEFT to RIGHT\n\n3. Fruits on the CONVEYOR BELT are arranged in INCREASING weights from LEFT to RIGHT',
    font: 'Open Sans',
    units: undefined, 
    pos: [0.65, 0.2], height: 0.025,  wrapWidth: 0.4, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: -8.0 
  });
  
  merge_train_scale_right = new visual.TextBox({
    win: psychoJS.window,
    name: 'merge_train_scale_right',
    text: '',
    font: 'Open Sans',
    pos: [(- 0.55), 0.4], letterHeight: 0.03,
    size: [0.1, 0.07],  units: undefined, 
    color: 'black', colorSpace: 'rgb',
    fillColor: 'white', borderColor: undefined,
    bold: false, italic: false,
    opacity: undefined,
    padding: undefined,
    editable: true,
    multiline: true,
    anchor: 'top-center',
    depth: -9.0 
  });
  
  merge_train_scale_left = new visual.TextBox({
    win: psychoJS.window,
    name: 'merge_train_scale_left',
    text: '',
    font: 'Open Sans',
    pos: [(- 0.75), 0.4], letterHeight: 0.03,
    size: [0.1, 0.07],  units: undefined, 
    color: 'black', colorSpace: 'rgb',
    fillColor: 'white', borderColor: undefined,
    bold: false, italic: false,
    opacity: undefined,
    padding: undefined,
    editable: true,
    multiline: true,
    anchor: 'top-center',
    depth: -10.0 
  });
  
  merge_train_compare = new visual.TextBox({
    win: psychoJS.window,
    name: 'merge_train_compare',
    text: 'Compare',
    font: 'Open Sans',
    pos: [(- 0.65), (- 0.02)], letterHeight: 0.03,
    size: [0.16, 0.07],  units: undefined, 
    color: 'black', colorSpace: 'rgb',
    fillColor: 'white', borderColor: undefined,
    bold: false, italic: false,
    opacity: undefined,
    padding: undefined,
    editable: false,
    multiline: true,
    anchor: 'top-center',
    depth: -11.0 
  });
  
  merge_train_sep = new visual.ImageStim({
    win : psychoJS.window,
    name : 'merge_train_sep', units : undefined, 
    image : 'materials/merge_sort/imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [0, (- 0.11)], size : [1.5, 0.005],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -12.0 
  });
  merge_train = new visual.ImageStim({
    win : psychoJS.window,
    name : 'merge_train', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, 0.2], size : [0.8, 0.4],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -13.0 
  });
  merge_train_mc_1 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'merge_train_mc_1', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [(- 0.3), (- 0.25)], size : [0.7, 0.1],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -14.0 
  });
  merge_train_mc_2 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'merge_train_mc_2', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [(- 0.3), (- 0.4)], size : [0.7, 0.1],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -15.0 
  });
  merge_train_scale = new visual.ImageStim({
    win : psychoJS.window,
    name : 'merge_train_scale', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [(- 0.65), 0.15], size : [0.3, 0.3],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -16.0 
  });
  merge_train_btn_1 = new visual.TextBox({
    win: psychoJS.window,
    name: 'merge_train_btn_1',
    text: 'Submit',
    font: 'Open Sans',
    pos: [0.5, (- 0.25)], letterHeight: 0.05,
    size: [0.24, 0.1],  units: undefined, 
    color: 'black', colorSpace: 'rgb',
    fillColor: 'white', borderColor: undefined,
    bold: true, italic: false,
    opacity: undefined,
    padding: undefined,
    editable: false,
    multiline: true,
    anchor: 'center',
    depth: -18.0 
  });
  
  merge_train_btn_2 = new visual.TextBox({
    win: psychoJS.window,
    name: 'merge_train_btn_2',
    text: 'Submit',
    font: 'Open Sans',
    pos: [0.5, (- 0.4)], letterHeight: 0.05,
    size: [0.24, 0.1],  units: undefined, 
    color: 'black', colorSpace: 'rgb',
    fillColor: 'white', borderColor: undefined,
    bold: true, italic: false,
    opacity: undefined,
    padding: undefined,
    editable: false,
    multiline: true,
    anchor: 'center',
    depth: -19.0 
  });
  
  merge_train_mouse = new core.Mouse({
    win: psychoJS.window,
  });
  merge_train_mouse.mouseClock = new util.Clock();
  merge_train_timer = new visual.TextStim({
    win: psychoJS.window,
    name: 'merge_train_timer',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [0.65, (- 0.05)], height: 0.03,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('orange'),  opacity: undefined,
    depth: -21.0 
  });
  
  // Initialize components for Routine "MERGE_EXPL"
  MERGE_EXPLClock = new util.Clock();
  merge_expl_instr = new visual.TextStim({
    win: psychoJS.window,
    name: 'merge_expl_instr',
    text: 'Read the feedback and continue whenever you are ready',
    font: 'Open Sans',
    units: undefined, 
    pos: [(- 0.55), 0.4], height: 0.03,  wrapWidth: 0.6, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
  merge_expl_feedback_1 = new visual.TextStim({
    win: psychoJS.window,
    name: 'merge_expl_feedback_1',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [(- 0.55), 0.15], height: 0.03,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: -1.0 
  });
  
  merge_expl_feedback_2 = new visual.TextStim({
    win: psychoJS.window,
    name: 'merge_expl_feedback_2',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [(- 0.55), (- 0.25)], height: 0.03,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: -2.0 
  });
  
  merge_expl_sep = new visual.ImageStim({
    win : psychoJS.window,
    name : 'merge_expl_sep', units : undefined, 
    image : 'materials/merge_sort/imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [(- 0.25), 0], size : [0.005, 0.8],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -3.0 
  });
  merge_expl_1 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'merge_expl_1', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0.35, 0.25], size : [0.8, 0.4],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -4.0 
  });
  merge_expl_2 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'merge_expl_2', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0.35, (- 0.15)], size : [0.8, 0.4],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -5.0 
  });
  merge_expl_mc_1 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'merge_expl_mc_1', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [(- 0.55), 0.25], size : [0.4, 0.1],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -6.0 
  });
  merge_expl_mc_2 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'merge_expl_mc_2', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [(- 0.55), (- 0.15)], size : [0.4, 0.1],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -7.0 
  });
  merge_expl_btn = new visual.TextBox({
    win: psychoJS.window,
    name: 'merge_expl_btn',
    text: 'Continue',
    font: 'Open Sans',
    pos: [0.35, (- 0.42)], letterHeight: 0.05,
    size: [0.28, 0.1],  units: undefined, 
    color: 'black', colorSpace: 'rgb',
    fillColor: 'white', borderColor: undefined,
    bold: true, italic: false,
    opacity: undefined,
    padding: undefined,
    editable: false,
    multiline: true,
    anchor: 'center',
    depth: -9.0 
  });
  
  merge_expl_mouse = new core.Mouse({
    win: psychoJS.window,
  });
  merge_expl_mouse.mouseClock = new util.Clock();
  merge_expl_timer = new visual.TextStim({
    win: psychoJS.window,
    name: 'merge_expl_timer',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [(- 0.55), (- 0.42)], height: 0.03,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('orange'),  opacity: undefined,
    depth: -11.0 
  });
  
  // Initialize components for Routine "MERGE_TEST_INTRO"
  MERGE_TEST_INTROClock = new util.Clock();
  intro_text_6 = new visual.TextStim({
    win: psychoJS.window,
    name: 'intro_text_6',
    text: 'ALICE: BIZZ ... Now is time to apply the knowledge you learned about the BLUE STAR\n\n1. The fruits in EACH ORANGE box INCREASE in weight from LEFT to RIGHT\n\n2. The BLUE STAR puts fruits from two ORANGE boxes on the CONVEYOR BELT in INCREASING weights from LEFT to RIGHT',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, (- 0.15)], height: 0.03,  wrapWidth: 1.0, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
  alice_4 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'alice_4', units : undefined, 
    image : 'materials/merge_sort/imgs/alice.png', mask : undefined,
    ori : 0.0, pos : [(- 0.25), 0.25], size : [0.2, 0.2],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -1.0 
  });
  merge_example_2 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'merge_example_2', units : undefined, 
    image : 'materials/merge_sort/imgs/merge_train/merge_train_example.png', mask : undefined,
    ori : 0.0, pos : [0.3, 0.25], size : [0.7, 0.4],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -2.0 
  });
  door_6 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'door_6', units : undefined, 
    image : 'materials/merge_sort/imgs/door.png', mask : undefined,
    ori : 0.0, pos : [(- 0.45), 0.25], size : [0.15, 0.3],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -3.0 
  });
  merge_test_intro_btn = new visual.TextBox({
    win: psychoJS.window,
    name: 'merge_test_intro_btn',
    text: 'Continue',
    font: 'Open Sans',
    pos: [0, (- 0.4)], letterHeight: 0.05,
    size: [0.28, 0.1],  units: undefined, 
    color: 'black', colorSpace: 'rgb',
    fillColor: 'white', borderColor: undefined,
    bold: true, italic: false,
    opacity: undefined,
    padding: undefined,
    editable: false,
    multiline: true,
    anchor: 'center',
    depth: -5.0 
  });
  
  merge_test_intro_mouse = new core.Mouse({
    win: psychoJS.window,
  });
  merge_test_intro_mouse.mouseClock = new util.Clock();
  // Initialize components for Routine "MERGE_TEST"
  MERGE_TESTClock = new util.Clock();
  merge_test_scale_instr = new visual.TextStim({
    win: psychoJS.window,
    name: 'merge_test_scale_instr',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [(- 0.65), 0.45], height: 0.02,  wrapWidth: 0.3, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: -4.0 
  });
  
  merge_test_ans_instr = new visual.TextStim({
    win: psychoJS.window,
    name: 'merge_test_ans_instr',
    text: 'Put fruits on the CONVEYOR BELT by entering their labels as  X,X,X,X,X,X,X,X, ... ,X',
    font: 'Open Sans',
    units: undefined, 
    pos: [(- 0.25), (- 0.25)], height: 0.03,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: -5.0 
  });
  
  merge_test_instr = new visual.TextStim({
    win: psychoJS.window,
    name: 'merge_test_instr',
    text: '1. Use the scale on the left to COMPARE weights of TWO fruits by entering the alphabetic CAPITAL labels\n\n2. In EACH ORANGE box, fruits are arranged in INCREASING weights from LEFT to RIGHT\n\n3. Fruits on the CONVEYOR BELT are arranged in INCREASING weights from LEFT to RIGHT',
    font: 'Open Sans',
    units: undefined, 
    pos: [0.65, 0.2], height: 0.025,  wrapWidth: 0.4, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: -6.0 
  });
  
  merge_test_scale_right = new visual.TextBox({
    win: psychoJS.window,
    name: 'merge_test_scale_right',
    text: '',
    font: 'Open Sans',
    pos: [(- 0.55), 0.4], letterHeight: 0.03,
    size: [0.1, 0.07],  units: undefined, 
    color: 'black', colorSpace: 'rgb',
    fillColor: 'white', borderColor: undefined,
    bold: false, italic: false,
    opacity: undefined,
    padding: undefined,
    editable: true,
    multiline: true,
    anchor: 'top-center',
    depth: -7.0 
  });
  
  merge_test_scale_left = new visual.TextBox({
    win: psychoJS.window,
    name: 'merge_test_scale_left',
    text: '',
    font: 'Open Sans',
    pos: [(- 0.75), 0.4], letterHeight: 0.03,
    size: [0.1, 0.07],  units: undefined, 
    color: 'black', colorSpace: 'rgb',
    fillColor: 'white', borderColor: undefined,
    bold: false, italic: false,
    opacity: undefined,
    padding: undefined,
    editable: true,
    multiline: true,
    anchor: 'top-center',
    depth: -8.0 
  });
  
  merge_test_compare = new visual.TextBox({
    win: psychoJS.window,
    name: 'merge_test_compare',
    text: 'Compare',
    font: 'Open Sans',
    pos: [(- 0.65), (- 0.02)], letterHeight: 0.03,
    size: [0.16, 0.07],  units: undefined, 
    color: 'black', colorSpace: 'rgb',
    fillColor: 'white', borderColor: undefined,
    bold: false, italic: false,
    opacity: undefined,
    padding: undefined,
    editable: false,
    multiline: true,
    anchor: 'top-center',
    depth: -9.0 
  });
  
  merge_test_res = new visual.TextBox({
    win: psychoJS.window,
    name: 'merge_test_res',
    text: '',
    font: 'Open Sans',
    pos: [(- 0.25), (- 0.3)], letterHeight: 0.05,
    size: [0.7, 0.1],  units: undefined, 
    color: 'black', colorSpace: 'rgb',
    fillColor: 'white', borderColor: undefined,
    bold: false, italic: false,
    opacity: undefined,
    padding: undefined,
    editable: true,
    multiline: true,
    anchor: 'top-center',
    depth: -10.0 
  });
  
  merge_test_sep = new visual.ImageStim({
    win : psychoJS.window,
    name : 'merge_test_sep', units : undefined, 
    image : 'materials/merge_sort/imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [0, (- 0.15)], size : [1.5, 0.005],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -11.0 
  });
  merge_test = new visual.ImageStim({
    win : psychoJS.window,
    name : 'merge_test', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, 0.2], size : [0.8, 0.4],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -12.0 
  });
  merge_test_scale = new visual.ImageStim({
    win : psychoJS.window,
    name : 'merge_test_scale', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [(- 0.65), 0.15], size : [0.3, 0.3],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -13.0 
  });
  merge_test_btn = new visual.TextBox({
    win: psychoJS.window,
    name: 'merge_test_btn',
    text: 'Submit',
    font: 'Open Sans',
    pos: [0.5, (- 0.35)], letterHeight: 0.05,
    size: [0.24, 0.1],  units: undefined, 
    color: 'black', colorSpace: 'rgb',
    fillColor: 'white', borderColor: undefined,
    bold: true, italic: false,
    opacity: undefined,
    padding: undefined,
    editable: false,
    multiline: true,
    anchor: 'center',
    depth: -15.0 
  });
  
  merge_test_mouse = new core.Mouse({
    win: psychoJS.window,
  });
  merge_test_mouse.mouseClock = new util.Clock();
  merge_test_timer = new visual.TextStim({
    win: psychoJS.window,
    name: 'merge_test_timer',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [0.65, (- 0.05)], height: 0.03,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('orange'),  opacity: undefined,
    depth: -17.0 
  });
  
  // Initialize components for Routine "SORT_INTRO"
  SORT_INTROClock = new util.Clock();
  intro_text_3 = new visual.TextStim({
    win: psychoJS.window,
    name: 'intro_text_3',
    text: 'BOB: CLIKKKK ... SOOO GOOooD to see you!\n\n1. You need to arrange a PILE of fruits that is most likely UNORDERED\n\n2. The PURPLE DIAMOND arranges fruits from the PILE into the SHIPPING CRATE in INCREASING weights from LEFT to RIGHT\n\nLEARN the PURPLE DIAMOND operation in steps and master it. ',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, (- 0.15)], height: 0.03,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
  bob_2 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'bob_2', units : undefined, 
    image : 'materials/merge_sort/imgs/bob.png', mask : undefined,
    ori : 0.0, pos : [0.25, 0.25], size : [0.2, 0.2],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -1.0 
  });
  sort_example = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_example', units : undefined, 
    image : 'materials/merge_sort/imgs/sort_train/sort_train_example.png', mask : undefined,
    ori : 0.0, pos : [(- 0.3), 0.25], size : [0.7, 0.4],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -2.0 
  });
  door_4 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'door_4', units : undefined, 
    image : 'materials/merge_sort/imgs/door.png', mask : undefined,
    ori : 0.0, pos : [0.45, 0.25], size : [0.15, 0.3],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -3.0 
  });
  sort_intro_btn = new visual.TextBox({
    win: psychoJS.window,
    name: 'sort_intro_btn',
    text: 'Continue',
    font: 'Open Sans',
    pos: [0, (- 0.4)], letterHeight: 0.05,
    size: [0.28, 0.1],  units: undefined, 
    color: 'black', colorSpace: 'rgb',
    fillColor: 'white', borderColor: undefined,
    bold: true, italic: false,
    opacity: undefined,
    padding: undefined,
    editable: false,
    multiline: true,
    anchor: 'center',
    depth: -5.0 
  });
  
  sort_intro_mouse = new core.Mouse({
    win: psychoJS.window,
  });
  sort_intro_mouse.mouseClock = new util.Clock();
  // Initialize components for Routine "SORT_TRAIN"
  SORT_TRAINClock = new util.Clock();
  sort_train_scale_instr = new visual.TextStim({
    win: psychoJS.window,
    name: 'sort_train_scale_instr',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [(- 0.65), 0.45], height: 0.02,  wrapWidth: 0.3, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: -7.0 
  });
  
  sort_train_ans_instr = new visual.TextStim({
    win: psychoJS.window,
    name: 'sort_train_ans_instr',
    text: 'Put fruits into the PACKAGE by entering their labels as  X,X,X,X,X,X,X,X, ... ,X',
    font: 'Open Sans',
    units: undefined, 
    pos: [(- 0.25), (- 0.25)], height: 0.03,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: -8.0 
  });
  
  sort_train_instr = new visual.TextStim({
    win: psychoJS.window,
    name: 'sort_train_instr',
    text: '1. Use the scale on the left to COMPARE weights of TWO fruits by entering the alphabetic CAPITAL labels\n\n2. You are given a PILE of fruits that is most likely UNORDERED\n\n3. The PURPLE DIAMOND puts fruits from the PILE into the SHIPPING CRATE in INCREASING weights from LEFT to RIGHT',
    font: 'Open Sans',
    units: undefined, 
    pos: [0.65, 0.2], height: 0.025,  wrapWidth: 0.4, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: -9.0 
  });
  
  sort_train_scale_right = new visual.TextBox({
    win: psychoJS.window,
    name: 'sort_train_scale_right',
    text: '',
    font: 'Open Sans',
    pos: [(- 0.55), 0.4], letterHeight: 0.03,
    size: [0.1, 0.07],  units: undefined, 
    color: 'black', colorSpace: 'rgb',
    fillColor: 'white', borderColor: undefined,
    bold: false, italic: false,
    opacity: undefined,
    padding: undefined,
    editable: true,
    multiline: true,
    anchor: 'top-center',
    depth: -10.0 
  });
  
  sort_train_scale_left = new visual.TextBox({
    win: psychoJS.window,
    name: 'sort_train_scale_left',
    text: '',
    font: 'Open Sans',
    pos: [(- 0.75), 0.4], letterHeight: 0.03,
    size: [0.1, 0.07],  units: undefined, 
    color: 'black', colorSpace: 'rgb',
    fillColor: 'white', borderColor: undefined,
    bold: false, italic: false,
    opacity: undefined,
    padding: undefined,
    editable: true,
    multiline: true,
    anchor: 'top-center',
    depth: -11.0 
  });
  
  sort_train_compare = new visual.TextBox({
    win: psychoJS.window,
    name: 'sort_train_compare',
    text: 'Compare',
    font: 'Open Sans',
    pos: [(- 0.65), (- 0.02)], letterHeight: 0.03,
    size: [0.16, 0.07],  units: undefined, 
    color: 'black', colorSpace: 'rgb',
    fillColor: 'white', borderColor: undefined,
    bold: false, italic: false,
    opacity: undefined,
    padding: undefined,
    editable: false,
    multiline: true,
    anchor: 'top-center',
    depth: -12.0 
  });
  
  sort_train_res = new visual.TextBox({
    win: psychoJS.window,
    name: 'sort_train_res',
    text: '',
    font: 'Open Sans',
    pos: [(- 0.25), (- 0.3)], letterHeight: 0.05,
    size: [0.7, 0.1],  units: undefined, 
    color: 'black', colorSpace: 'rgb',
    fillColor: 'white', borderColor: undefined,
    bold: false, italic: false,
    opacity: undefined,
    padding: undefined,
    editable: true,
    multiline: true,
    anchor: 'top-center',
    depth: -13.0 
  });
  
  sort_train_sep = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_train_sep', units : undefined, 
    image : 'materials/merge_sort/imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [0, (- 0.15)], size : [1.5, 0.005],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -14.0 
  });
  sort_train_board = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_train_board', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, 0.2], size : [0.8, 0.5],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -15.0 
  });
  sort_train_scale = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_train_scale', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [(- 0.65), 0.15], size : [0.3, 0.3],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -16.0 
  });
  sort_train_ex_1 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_train_ex_1', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -17.0 
  });
  sort_train_ex_2 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_train_ex_2', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -18.0 
  });
  sort_train_ex_3 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_train_ex_3', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -19.0 
  });
  sort_train_ex_4 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_train_ex_4', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -20.0 
  });
  sort_train_ex_5 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_train_ex_5', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -21.0 
  });
  sort_train_ex_6 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_train_ex_6', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -22.0 
  });
  sort_train_ex_7 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_train_ex_7', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -23.0 
  });
  sort_train_ex_8 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_train_ex_8', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -24.0 
  });
  sort_train_ex_9 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_train_ex_9', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -25.0 
  });
  sort_train_ex_10 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_train_ex_10', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -26.0 
  });
  sort_train_ex_11 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_train_ex_11', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -27.0 
  });
  sort_train_ex_12 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_train_ex_12', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -28.0 
  });
  sort_train_btn = new visual.TextBox({
    win: psychoJS.window,
    name: 'sort_train_btn',
    text: 'Submit',
    font: 'Open Sans',
    pos: [0.5, (- 0.35)], letterHeight: 0.05,
    size: [0.24, 0.1],  units: undefined, 
    color: 'black', colorSpace: 'rgb',
    fillColor: 'white', borderColor: undefined,
    bold: true, italic: false,
    opacity: undefined,
    padding: undefined,
    editable: false,
    multiline: true,
    anchor: 'center',
    depth: -29.0 
  });
  
  sort_train_mouse = new core.Mouse({
    win: psychoJS.window,
  });
  sort_train_mouse.mouseClock = new util.Clock();
  sort_train_timer = new visual.TextStim({
    win: psychoJS.window,
    name: 'sort_train_timer',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [0.65, (- 0.05)], height: 0.03,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('orange'),  opacity: undefined,
    depth: -31.0 
  });
  
  sort_train_hint = new visual.TextStim({
    win: psychoJS.window,
    name: 'sort_train_hint',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [0.5, (- 0.25)], height: 0.03,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: -32.0 
  });
  
  // Initialize components for Routine "SORT_EXPL"
  SORT_EXPLClock = new util.Clock();
  sort_expl_scale_instr = new visual.TextStim({
    win: psychoJS.window,
    name: 'sort_expl_scale_instr',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [(- 0.65), 0.45], height: 0.02,  wrapWidth: 0.3, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: -5.0 
  });
  
  sort_expl_feedback_1 = new visual.TextStim({
    win: psychoJS.window,
    name: 'sort_expl_feedback_1',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [(- 0.25), (- 0.18)], height: 0.03,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: -6.0 
  });
  
  sort_expl_feedback_2 = new visual.TextStim({
    win: psychoJS.window,
    name: 'sort_expl_feedback_2',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [(- 0.25), (- 0.25)], height: 0.03,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: -7.0 
  });
  
  sort_expl_instr = new visual.TextStim({
    win: psychoJS.window,
    name: 'sort_expl_instr',
    text: '1. Use the scale on the left to COMPARE weights of TWO fruits by entering the alphabetic CAPITAL labels\n\n2. READ the feedback and CHECK the provided answer with yours\n\n3. CONTINUE if you are ready',
    font: 'Open Sans',
    units: undefined, 
    pos: [0.65, 0.2], height: 0.025,  wrapWidth: 0.4, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: -8.0 
  });
  
  sort_expl_scale_right = new visual.TextBox({
    win: psychoJS.window,
    name: 'sort_expl_scale_right',
    text: '',
    font: 'Open Sans',
    pos: [(- 0.55), 0.4], letterHeight: 0.03,
    size: [0.1, 0.07],  units: undefined, 
    color: 'black', colorSpace: 'rgb',
    fillColor: 'white', borderColor: undefined,
    bold: false, italic: false,
    opacity: undefined,
    padding: undefined,
    editable: true,
    multiline: true,
    anchor: 'top-center',
    depth: -9.0 
  });
  
  sort_expl_scale_left = new visual.TextBox({
    win: psychoJS.window,
    name: 'sort_expl_scale_left',
    text: '',
    font: 'Open Sans',
    pos: [(- 0.75), 0.4], letterHeight: 0.03,
    size: [0.1, 0.07],  units: undefined, 
    color: 'black', colorSpace: 'rgb',
    fillColor: 'white', borderColor: undefined,
    bold: false, italic: false,
    opacity: undefined,
    padding: undefined,
    editable: true,
    multiline: true,
    anchor: 'top-center',
    depth: -10.0 
  });
  
  sort_expl_compare = new visual.TextBox({
    win: psychoJS.window,
    name: 'sort_expl_compare',
    text: 'Compare',
    font: 'Open Sans',
    pos: [(- 0.65), (- 0.02)], letterHeight: 0.03,
    size: [0.16, 0.07],  units: undefined, 
    color: 'black', colorSpace: 'rgb',
    fillColor: 'white', borderColor: undefined,
    bold: false, italic: false,
    opacity: undefined,
    padding: undefined,
    editable: false,
    multiline: true,
    anchor: 'top-center',
    depth: -11.0 
  });
  
  sort_expl_res = new visual.TextBox({
    win: psychoJS.window,
    name: 'sort_expl_res',
    text: '',
    font: 'Open Sans',
    pos: [(- 0.25), (- 0.3)], letterHeight: 0.05,
    size: [0.7, 0.1],  units: undefined, 
    color: 'black', colorSpace: 'rgb',
    fillColor: 'white', borderColor: undefined,
    bold: false, italic: false,
    opacity: undefined,
    padding: undefined,
    editable: false,
    multiline: true,
    anchor: 'top-center',
    depth: -12.0 
  });
  
  sort_expl_sep = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_expl_sep', units : undefined, 
    image : 'materials/merge_sort/imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [0, (- 0.15)], size : [1.5, 0.005],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -13.0 
  });
  sort_expl_board = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_expl_board', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, 0.2], size : [0.8, 0.5],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -14.0 
  });
  sort_expl_scale = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_expl_scale', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [(- 0.65), 0.15], size : [0.3, 0.3],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -15.0 
  });
  sort_expl_ex_1 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_expl_ex_1', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -16.0 
  });
  sort_expl_ex_2 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_expl_ex_2', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -17.0 
  });
  sort_expl_ex_3 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_expl_ex_3', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -18.0 
  });
  sort_expl_ex_4 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_expl_ex_4', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -19.0 
  });
  sort_expl_ex_5 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_expl_ex_5', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -20.0 
  });
  sort_expl_ex_6 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_expl_ex_6', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -21.0 
  });
  sort_expl_ex_7 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_expl_ex_7', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -22.0 
  });
  sort_expl_ex_8 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_expl_ex_8', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -23.0 
  });
  sort_expl_ex_9 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_expl_ex_9', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -24.0 
  });
  sort_expl_ex_10 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_expl_ex_10', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -25.0 
  });
  sort_expl_ex_11 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_expl_ex_11', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -26.0 
  });
  sort_expl_ex_12 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_expl_ex_12', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -27.0 
  });
  sort_expl_btn = new visual.TextBox({
    win: psychoJS.window,
    name: 'sort_expl_btn',
    text: 'Continue',
    font: 'Open Sans',
    pos: [0.5, (- 0.35)], letterHeight: 0.05,
    size: [0.28, 0.1],  units: undefined, 
    color: 'black', colorSpace: 'rgb',
    fillColor: 'white', borderColor: undefined,
    bold: true, italic: false,
    opacity: undefined,
    padding: undefined,
    editable: false,
    multiline: true,
    anchor: 'center',
    depth: -28.0 
  });
  
  sort_expl_mouse = new core.Mouse({
    win: psychoJS.window,
  });
  sort_expl_mouse.mouseClock = new util.Clock();
  sort_expl_timer = new visual.TextStim({
    win: psychoJS.window,
    name: 'sort_expl_timer',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [0.65, (- 0.05)], height: 0.03,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('orange'),  opacity: undefined,
    depth: -30.0 
  });
  
  sort_expl_hint = new visual.TextStim({
    win: psychoJS.window,
    name: 'sort_expl_hint',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [0.5, (- 0.25)], height: 0.03,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: -31.0 
  });
  
  // Initialize components for Routine "SORT_TEST_INTRO"
  SORT_TEST_INTROClock = new util.Clock();
  intro_text_7 = new visual.TextStim({
    win: psychoJS.window,
    name: 'intro_text_7',
    text: 'BOB: CLIKKKK ... Now is time to apply the knowledge you learned about the PURPLE DIAMOND\n\n1. You need to arrange a PILE of fruits that is most likely UNORDERED\n\n2. The PURPLE DIAMOND arranges fruits from the PILE into the SHIPPING CRATE in INCREASING weights from LEFT to RIGHT',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, (- 0.15)], height: 0.03,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
  bob_4 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'bob_4', units : undefined, 
    image : 'materials/merge_sort/imgs/bob.png', mask : undefined,
    ori : 0.0, pos : [0.25, 0.25], size : [0.2, 0.2],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -1.0 
  });
  sort_example_2 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_example_2', units : undefined, 
    image : 'materials/merge_sort/imgs/sort_train/sort_test_example.png', mask : undefined,
    ori : 0.0, pos : [(- 0.3), 0.25], size : [0.7, 0.4],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -2.0 
  });
  door_7 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'door_7', units : undefined, 
    image : 'materials/merge_sort/imgs/door.png', mask : undefined,
    ori : 0.0, pos : [0.45, 0.25], size : [0.15, 0.3],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -3.0 
  });
  sort_test_intro_btn = new visual.TextBox({
    win: psychoJS.window,
    name: 'sort_test_intro_btn',
    text: 'Continue',
    font: 'Open Sans',
    pos: [0, (- 0.4)], letterHeight: 0.05,
    size: [0.28, 0.1],  units: undefined, 
    color: 'black', colorSpace: 'rgb',
    fillColor: 'white', borderColor: undefined,
    bold: true, italic: false,
    opacity: undefined,
    padding: undefined,
    editable: false,
    multiline: true,
    anchor: 'center',
    depth: -5.0 
  });
  
  sort_test_intro_mouse = new core.Mouse({
    win: psychoJS.window,
  });
  sort_test_intro_mouse.mouseClock = new util.Clock();
  // Initialize components for Routine "SORT_TEST"
  SORT_TESTClock = new util.Clock();
  sort_test_scale_instr = new visual.TextStim({
    win: psychoJS.window,
    name: 'sort_test_scale_instr',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [(- 0.65), 0.45], height: 0.02,  wrapWidth: 0.3, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: -6.0 
  });
  
  sort_test_ans_instr = new visual.TextStim({
    win: psychoJS.window,
    name: 'sort_test_ans_instr',
    text: 'Put fruits into the PACKAGE by entering their labels as  X,X,X,X,X,X,X,X, ... ,X',
    font: 'Open Sans',
    units: undefined, 
    pos: [(- 0.25), (- 0.25)], height: 0.03,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: -7.0 
  });
  
  sort_test_instr = new visual.TextStim({
    win: psychoJS.window,
    name: 'sort_test_instr',
    text: '1. Use the scale on the left to COMPARE weights of TWO fruits by entering the alphabetic CAPITAL labels\n\n2. You are given a PILE of fruits that is most likely UNORDERED\n\n3. The PURPLE DIAMOND puts fruits from the PILE into the SHIPPING CRATE in INCREASING weights from LEFT to RIGHT',
    font: 'Open Sans',
    units: undefined, 
    pos: [0.65, 0.2], height: 0.025,  wrapWidth: 0.4, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: -8.0 
  });
  
  sort_test_scale_right = new visual.TextBox({
    win: psychoJS.window,
    name: 'sort_test_scale_right',
    text: '',
    font: 'Open Sans',
    pos: [(- 0.55), 0.4], letterHeight: 0.03,
    size: [0.1, 0.07],  units: undefined, 
    color: 'black', colorSpace: 'rgb',
    fillColor: 'white', borderColor: undefined,
    bold: false, italic: false,
    opacity: undefined,
    padding: undefined,
    editable: true,
    multiline: true,
    anchor: 'top-center',
    depth: -9.0 
  });
  
  sort_test_scale_left = new visual.TextBox({
    win: psychoJS.window,
    name: 'sort_test_scale_left',
    text: '',
    font: 'Open Sans',
    pos: [(- 0.75), 0.4], letterHeight: 0.03,
    size: [0.1, 0.07],  units: undefined, 
    color: 'black', colorSpace: 'rgb',
    fillColor: 'white', borderColor: undefined,
    bold: false, italic: false,
    opacity: undefined,
    padding: undefined,
    editable: true,
    multiline: true,
    anchor: 'top-center',
    depth: -10.0 
  });
  
  sort_test_compare = new visual.TextBox({
    win: psychoJS.window,
    name: 'sort_test_compare',
    text: 'Compare',
    font: 'Open Sans',
    pos: [(- 0.65), (- 0.02)], letterHeight: 0.03,
    size: [0.16, 0.07],  units: undefined, 
    color: 'black', colorSpace: 'rgb',
    fillColor: 'white', borderColor: undefined,
    bold: false, italic: false,
    opacity: undefined,
    padding: undefined,
    editable: false,
    multiline: true,
    anchor: 'top-center',
    depth: -11.0 
  });
  
  sort_test_res = new visual.TextBox({
    win: psychoJS.window,
    name: 'sort_test_res',
    text: '',
    font: 'Open Sans',
    pos: [(- 0.25), (- 0.3)], letterHeight: 0.05,
    size: [0.7, 0.1],  units: undefined, 
    color: 'black', colorSpace: 'rgb',
    fillColor: 'white', borderColor: undefined,
    bold: false, italic: false,
    opacity: undefined,
    padding: undefined,
    editable: true,
    multiline: true,
    anchor: 'top-center',
    depth: -12.0 
  });
  
  sort_test_sep = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_test_sep', units : undefined, 
    image : 'materials/merge_sort/imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [0, (- 0.15)], size : [1.5, 0.005],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -13.0 
  });
  sort_test_board = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_test_board', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, 0.2], size : [0.8, 0.5],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -14.0 
  });
  sort_test_scale = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_test_scale', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [(- 0.65), 0.15], size : [0.3, 0.3],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -15.0 
  });
  sort_test_ex_1 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_test_ex_1', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -16.0 
  });
  sort_test_ex_2 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_test_ex_2', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -17.0 
  });
  sort_test_ex_3 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_test_ex_3', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -18.0 
  });
  sort_test_ex_4 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_test_ex_4', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -19.0 
  });
  sort_test_ex_5 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_test_ex_5', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -20.0 
  });
  sort_test_ex_6 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_test_ex_6', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -21.0 
  });
  sort_test_ex_7 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_test_ex_7', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -22.0 
  });
  sort_test_ex_8 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_test_ex_8', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -23.0 
  });
  sort_test_ex_9 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_test_ex_9', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -24.0 
  });
  sort_test_ex_10 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_test_ex_10', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -25.0 
  });
  sort_test_ex_11 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_test_ex_11', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -26.0 
  });
  sort_test_ex_12 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_test_ex_12', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -27.0 
  });
  sort_test_btn = new visual.TextBox({
    win: psychoJS.window,
    name: 'sort_test_btn',
    text: 'Submit',
    font: 'Open Sans',
    pos: [0.5, (- 0.35)], letterHeight: 0.05,
    size: [0.24, 0.1],  units: undefined, 
    color: 'black', colorSpace: 'rgb',
    fillColor: 'white', borderColor: undefined,
    bold: true, italic: false,
    opacity: undefined,
    padding: undefined,
    editable: false,
    multiline: true,
    anchor: 'center',
    depth: -29.0 
  });
  
  sort_test_mouse = new core.Mouse({
    win: psychoJS.window,
  });
  sort_test_mouse.mouseClock = new util.Clock();
  sort_test_timer = new visual.TextStim({
    win: psychoJS.window,
    name: 'sort_test_timer',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [0.65, (- 0.05)], height: 0.03,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('orange'),  opacity: undefined,
    depth: -31.0 
  });
  
  // Initialize components for Routine "DEBRIEF"
  DEBRIEFClock = new util.Clock();
  intro_text_5 = new visual.TextStim({
    win: psychoJS.window,
    name: 'intro_text_5',
    text: 'This is the end of the experiment!\n\nThank you very much for your time and effort!',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.03,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
  debrief_btn = new visual.TextBox({
    win: psychoJS.window,
    name: 'debrief_btn',
    text: 'End',
    font: 'Open Sans',
    pos: [0, (- 0.4)], letterHeight: 0.05,
    size: [0.15, 0.1],  units: undefined, 
    color: 'black', colorSpace: 'rgb',
    fillColor: 'white', borderColor: undefined,
    bold: true, italic: false,
    opacity: undefined,
    padding: undefined,
    editable: false,
    multiline: true,
    anchor: 'center',
    depth: -1.0 
  });
  
  debrief_mouse = new core.Mouse({
    win: psychoJS.window,
  });
  debrief_mouse.mouseClock = new util.Clock();
  // Create some handy timers
  globalClock = new util.Clock();  // to track the time since experiment started
  routineTimer = new util.CountdownTimer();  // to track time remaining of each (non-slip) routine
  
  return Scheduler.Event.NEXT;
}


var t;
var frameN;
var continueRoutine;
var gotValidClick;
var INTROComponents;
function INTRORoutineBegin(snapshot) {
  return function () {
    //------Prepare to start Routine 'INTRO'-------
    t = 0;
    INTROClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(120.000000);
    // update component parameters for each repeat
    // setup some python lists for storing info about the intro_mouse
    intro_mouse.clicked_name = [];
    gotValidClick = false; // until a click is received
    // keep track of which components have finished
    INTROComponents = [];
    INTROComponents.push(intro_text);
    INTROComponents.push(alice);
    INTROComponents.push(bob);
    INTROComponents.push(door_1);
    INTROComponents.push(door_2);
    INTROComponents.push(intro_btn);
    INTROComponents.push(intro_mouse);
    
    for (const thisComponent of INTROComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


var frameRemains;
var prevButtonState;
var _mouseButtons;
function INTRORoutineEachFrame(snapshot) {
  return function () {
    //------Loop for each frame of Routine 'INTRO'-------
    // get current time
    t = INTROClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *intro_text* updates
    if (t >= 0.0 && intro_text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      intro_text.tStart = t;  // (not accounting for frame time here)
      intro_text.frameNStart = frameN;  // exact frame index
      
      intro_text.setAutoDraw(true);
    }

    frameRemains = 0.0 + 120.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (intro_text.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      intro_text.setAutoDraw(false);
    }
    
    // *alice* updates
    if (t >= 0.0 && alice.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      alice.tStart = t;  // (not accounting for frame time here)
      alice.frameNStart = frameN;  // exact frame index
      
      alice.setAutoDraw(true);
    }

    frameRemains = 0.0 + 120.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (alice.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      alice.setAutoDraw(false);
    }
    
    // *bob* updates
    if (t >= 0.0 && bob.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      bob.tStart = t;  // (not accounting for frame time here)
      bob.frameNStart = frameN;  // exact frame index
      
      bob.setAutoDraw(true);
    }

    frameRemains = 0.0 + 120.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (bob.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      bob.setAutoDraw(false);
    }
    
    // *door_1* updates
    if (t >= 0.0 && door_1.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      door_1.tStart = t;  // (not accounting for frame time here)
      door_1.frameNStart = frameN;  // exact frame index
      
      door_1.setAutoDraw(true);
    }

    frameRemains = 0.0 + 120.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (door_1.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      door_1.setAutoDraw(false);
    }
    
    // *door_2* updates
    if (t >= 0.0 && door_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      door_2.tStart = t;  // (not accounting for frame time here)
      door_2.frameNStart = frameN;  // exact frame index
      
      door_2.setAutoDraw(true);
    }

    frameRemains = 0.0 + 120.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (door_2.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      door_2.setAutoDraw(false);
    }
    
    // *intro_btn* updates
    if (t >= 0.5 && intro_btn.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      intro_btn.tStart = t;  // (not accounting for frame time here)
      intro_btn.frameNStart = frameN;  // exact frame index
      
      intro_btn.setAutoDraw(true);
    }

    frameRemains = 120.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((intro_btn.status === PsychoJS.Status.STARTED || intro_btn.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      intro_btn.setAutoDraw(false);
    }
    // *intro_mouse* updates
    if (t >= 0.5 && intro_mouse.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      intro_mouse.tStart = t;  // (not accounting for frame time here)
      intro_mouse.frameNStart = frameN;  // exact frame index
      
      intro_mouse.status = PsychoJS.Status.STARTED;
      intro_mouse.mouseClock.reset();
      prevButtonState = intro_mouse.getPressed();  // if button is down already this ISN'T a new click
      }
    frameRemains = 120.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((intro_mouse.status === PsychoJS.Status.STARTED || intro_mouse.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      intro_mouse.status = PsychoJS.Status.FINISHED;
  }
    if (intro_mouse.status === PsychoJS.Status.STARTED) {  // only update if started and not finished!
      _mouseButtons = intro_mouse.getPressed();
      if (!_mouseButtons.every( (e,i,) => (e == prevButtonState[i]) )) { // button state changed?
        prevButtonState = _mouseButtons;
        if (_mouseButtons.reduce( (e, acc) => (e+acc) ) > 0) { // state changed to a new click
          // check if the mouse was inside our 'clickable' objects
          gotValidClick = false;
          for (const obj of [intro_btn]) {
            if (intro_mouse.isPressedIn(obj)) {
              intro_mouse.clicked_name.push(obj.name)
              continueRoutine = false;
            }
          }
        }
      }
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
    for (const thisComponent of INTROComponents)
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


var _mouseXYs;
function INTRORoutineEnd(snapshot) {
  return function () {
    //------Ending Routine 'INTRO'-------
    for (const thisComponent of INTROComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // store data for thisExp (ExperimentHandler)
    _mouseXYs = intro_mouse.getPos();
    _mouseButtons = intro_mouse.getPressed();
    psychoJS.experiment.addData('intro_mouse.x', _mouseXYs[0]);
    psychoJS.experiment.addData('intro_mouse.y', _mouseXYs[1]);
    psychoJS.experiment.addData('intro_mouse.leftButton', _mouseButtons[0]);
    psychoJS.experiment.addData('intro_mouse.midButton', _mouseButtons[1]);
    psychoJS.experiment.addData('intro_mouse.rightButton', _mouseButtons[2]);
    if (intro_mouse.clicked_name.length > 0) {
      psychoJS.experiment.addData('intro_mouse.clicked_name', intro_mouse.clicked_name[0]);}
    return Scheduler.Event.NEXT;
  };
}


var age_selected;
var education_selected;
var gender_selected;
var gender_groups;
var age_groups;
var education_groups;
var all_groups;
var BACKGROUNDComponents;
function BACKGROUNDRoutineBegin(snapshot) {
  return function () {
    //------Prepare to start Routine 'BACKGROUND'-------
    t = 0;
    BACKGROUNDClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(120.000000);
    // update component parameters for each repeat
    background_instr.setText('Please select most the fitting choice for each of the following questions');
    gender.setText('What is your gender at birth?');
    age.setText('What is your age?');
    education.setText('What is the highest degree or level of school you have completed?');
    background_education_bachelor.setFillColor(new util.Color('white'));
    age_selected = null;
    education_selected = null;
    gender_selected = null;
    gender_groups = [background_gender_female, background_gender_male];
    age_groups = [background_age_18_24, background_age_25_34, background_age_35_44, background_age_45_54, background_age_55_64, background_age_65];
    education_groups = [background_education_before_high_school, background_education_high_school, background_education_college, background_education_bachelor, background_education_graudate, backgrond_education_doctorate, background_education_other];
    all_groups = ((gender_groups + age_groups) + education_groups);
    for (var g, _pj_c = 0, _pj_a = all_groups, _pj_b = _pj_a.length; (_pj_c < _pj_b); _pj_c += 1) {
        g = _pj_a[_pj_c];
        g.fillColor = white;
    }
    
    // setup some python lists for storing info about the background_mouse
    background_mouse.clicked_name = [];
    gotValidClick = false; // until a click is received
    // keep track of which components have finished
    BACKGROUNDComponents = [];
    BACKGROUNDComponents.push(background_instr);
    BACKGROUNDComponents.push(gender);
    BACKGROUNDComponents.push(background_gender_female);
    BACKGROUNDComponents.push(background_gender_male);
    BACKGROUNDComponents.push(age);
    BACKGROUNDComponents.push(background_age_18_24);
    BACKGROUNDComponents.push(background_age_25_34);
    BACKGROUNDComponents.push(background_age_35_44);
    BACKGROUNDComponents.push(background_age_45_54);
    BACKGROUNDComponents.push(background_age_55_64);
    BACKGROUNDComponents.push(background_age_65);
    BACKGROUNDComponents.push(education);
    BACKGROUNDComponents.push(background_education_before_high_school);
    BACKGROUNDComponents.push(background_education_high_school);
    BACKGROUNDComponents.push(background_education_college);
    BACKGROUNDComponents.push(background_education_bachelor);
    BACKGROUNDComponents.push(background_education_graudate);
    BACKGROUNDComponents.push(backgrond_education_doctorate);
    BACKGROUNDComponents.push(background_education_other);
    BACKGROUNDComponents.push(background_btn);
    BACKGROUNDComponents.push(background_mouse);
    
    for (const thisComponent of BACKGROUNDComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


var demographic_age;
var demographic_education;
var demographic_gender;
function BACKGROUNDRoutineEachFrame(snapshot) {
  return function () {
    //------Loop for each frame of Routine 'BACKGROUND'-------
    // get current time
    t = BACKGROUNDClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *background_instr* updates
    if (t >= 0.0 && background_instr.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      background_instr.tStart = t;  // (not accounting for frame time here)
      background_instr.frameNStart = frameN;  // exact frame index
      
      background_instr.setAutoDraw(true);
    }

    frameRemains = 0.0 + 120.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (background_instr.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      background_instr.setAutoDraw(false);
    }
    
    // *gender* updates
    if (t >= 0.0 && gender.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      gender.tStart = t;  // (not accounting for frame time here)
      gender.frameNStart = frameN;  // exact frame index
      
      gender.setAutoDraw(true);
    }

    frameRemains = 0.0 + 120.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (gender.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      gender.setAutoDraw(false);
    }
    
    // *background_gender_female* updates
    if (t >= 1.0 && background_gender_female.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      background_gender_female.tStart = t;  // (not accounting for frame time here)
      background_gender_female.frameNStart = frameN;  // exact frame index
      
      background_gender_female.setAutoDraw(true);
    }

    frameRemains = 120.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((background_gender_female.status === PsychoJS.Status.STARTED || background_gender_female.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      background_gender_female.setAutoDraw(false);
    }
    
    // *background_gender_male* updates
    if (t >= 1.0 && background_gender_male.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      background_gender_male.tStart = t;  // (not accounting for frame time here)
      background_gender_male.frameNStart = frameN;  // exact frame index
      
      background_gender_male.setAutoDraw(true);
    }

    frameRemains = 120.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((background_gender_male.status === PsychoJS.Status.STARTED || background_gender_male.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      background_gender_male.setAutoDraw(false);
    }
    
    // *age* updates
    if (t >= 0.0 && age.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      age.tStart = t;  // (not accounting for frame time here)
      age.frameNStart = frameN;  // exact frame index
      
      age.setAutoDraw(true);
    }

    frameRemains = 0.0 + 120.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (age.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      age.setAutoDraw(false);
    }
    
    // *background_age_18_24* updates
    if (t >= 1.0 && background_age_18_24.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      background_age_18_24.tStart = t;  // (not accounting for frame time here)
      background_age_18_24.frameNStart = frameN;  // exact frame index
      
      background_age_18_24.setAutoDraw(true);
    }

    frameRemains = 120.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((background_age_18_24.status === PsychoJS.Status.STARTED || background_age_18_24.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      background_age_18_24.setAutoDraw(false);
    }
    
    // *background_age_25_34* updates
    if (t >= 1.0 && background_age_25_34.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      background_age_25_34.tStart = t;  // (not accounting for frame time here)
      background_age_25_34.frameNStart = frameN;  // exact frame index
      
      background_age_25_34.setAutoDraw(true);
    }

    frameRemains = 120.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((background_age_25_34.status === PsychoJS.Status.STARTED || background_age_25_34.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      background_age_25_34.setAutoDraw(false);
    }
    
    // *background_age_35_44* updates
    if (t >= 1.0 && background_age_35_44.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      background_age_35_44.tStart = t;  // (not accounting for frame time here)
      background_age_35_44.frameNStart = frameN;  // exact frame index
      
      background_age_35_44.setAutoDraw(true);
    }

    frameRemains = 120.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((background_age_35_44.status === PsychoJS.Status.STARTED || background_age_35_44.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      background_age_35_44.setAutoDraw(false);
    }
    
    // *background_age_45_54* updates
    if (t >= 1.0 && background_age_45_54.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      background_age_45_54.tStart = t;  // (not accounting for frame time here)
      background_age_45_54.frameNStart = frameN;  // exact frame index
      
      background_age_45_54.setAutoDraw(true);
    }

    frameRemains = 120.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((background_age_45_54.status === PsychoJS.Status.STARTED || background_age_45_54.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      background_age_45_54.setAutoDraw(false);
    }
    
    // *background_age_55_64* updates
    if (t >= 1.0 && background_age_55_64.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      background_age_55_64.tStart = t;  // (not accounting for frame time here)
      background_age_55_64.frameNStart = frameN;  // exact frame index
      
      background_age_55_64.setAutoDraw(true);
    }

    frameRemains = 120.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((background_age_55_64.status === PsychoJS.Status.STARTED || background_age_55_64.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      background_age_55_64.setAutoDraw(false);
    }
    
    // *background_age_65* updates
    if (t >= 1.0 && background_age_65.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      background_age_65.tStart = t;  // (not accounting for frame time here)
      background_age_65.frameNStart = frameN;  // exact frame index
      
      background_age_65.setAutoDraw(true);
    }

    frameRemains = 120.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((background_age_65.status === PsychoJS.Status.STARTED || background_age_65.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      background_age_65.setAutoDraw(false);
    }
    
    // *education* updates
    if (t >= 0.0 && education.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      education.tStart = t;  // (not accounting for frame time here)
      education.frameNStart = frameN;  // exact frame index
      
      education.setAutoDraw(true);
    }

    frameRemains = 0.0 + 120.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (education.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      education.setAutoDraw(false);
    }
    
    // *background_education_before_high_school* updates
    if (t >= 1.0 && background_education_before_high_school.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      background_education_before_high_school.tStart = t;  // (not accounting for frame time here)
      background_education_before_high_school.frameNStart = frameN;  // exact frame index
      
      background_education_before_high_school.setAutoDraw(true);
    }

    frameRemains = 120.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((background_education_before_high_school.status === PsychoJS.Status.STARTED || background_education_before_high_school.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      background_education_before_high_school.setAutoDraw(false);
    }
    
    // *background_education_high_school* updates
    if (t >= 1.0 && background_education_high_school.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      background_education_high_school.tStart = t;  // (not accounting for frame time here)
      background_education_high_school.frameNStart = frameN;  // exact frame index
      
      background_education_high_school.setAutoDraw(true);
    }

    frameRemains = 120.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((background_education_high_school.status === PsychoJS.Status.STARTED || background_education_high_school.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      background_education_high_school.setAutoDraw(false);
    }
    
    // *background_education_college* updates
    if (t >= 1.0 && background_education_college.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      background_education_college.tStart = t;  // (not accounting for frame time here)
      background_education_college.frameNStart = frameN;  // exact frame index
      
      background_education_college.setAutoDraw(true);
    }

    frameRemains = 120.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((background_education_college.status === PsychoJS.Status.STARTED || background_education_college.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      background_education_college.setAutoDraw(false);
    }
    
    // *background_education_bachelor* updates
    if (t >= 1.0 && background_education_bachelor.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      background_education_bachelor.tStart = t;  // (not accounting for frame time here)
      background_education_bachelor.frameNStart = frameN;  // exact frame index
      
      background_education_bachelor.setAutoDraw(true);
    }

    frameRemains = 120.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((background_education_bachelor.status === PsychoJS.Status.STARTED || background_education_bachelor.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      background_education_bachelor.setAutoDraw(false);
    }
    
    // *background_education_graudate* updates
    if (t >= 1.0 && background_education_graudate.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      background_education_graudate.tStart = t;  // (not accounting for frame time here)
      background_education_graudate.frameNStart = frameN;  // exact frame index
      
      background_education_graudate.setAutoDraw(true);
    }

    frameRemains = 120.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((background_education_graudate.status === PsychoJS.Status.STARTED || background_education_graudate.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      background_education_graudate.setAutoDraw(false);
    }
    
    // *backgrond_education_doctorate* updates
    if (t >= 1.0 && backgrond_education_doctorate.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      backgrond_education_doctorate.tStart = t;  // (not accounting for frame time here)
      backgrond_education_doctorate.frameNStart = frameN;  // exact frame index
      
      backgrond_education_doctorate.setAutoDraw(true);
    }

    frameRemains = 120.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((backgrond_education_doctorate.status === PsychoJS.Status.STARTED || backgrond_education_doctorate.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      backgrond_education_doctorate.setAutoDraw(false);
    }
    
    // *background_education_other* updates
    if (t >= 1.0 && background_education_other.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      background_education_other.tStart = t;  // (not accounting for frame time here)
      background_education_other.frameNStart = frameN;  // exact frame index
      
      background_education_other.setAutoDraw(true);
    }

    frameRemains = 120.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((background_education_other.status === PsychoJS.Status.STARTED || background_education_other.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      background_education_other.setAutoDraw(false);
    }
    gender_selected = checkBGSelection(background_mouse, gender_groups, gender_selected);
    age_selected = checkBGSelection(background_mouse, age_groups, age_selected);
    education_selected = checkBGSelection(background_mouse, education_groups, education_selected);
    if ((((age_selected !== null) && (education_selected !== null)) && (gender_selected !== null))) {
        if (((background_btn.size[0] === 0) && (background_btn.size[1] === 0))) {
            background_btn.size = [0.28, 0.1];
        }
        if (((background_btn.pos[0] === 5) && (background_btn.pos[1] === 5))) {
            background_btn.pos = [0, (- 0.4)];
        }
        if ((age_selected !== null)) {
            demographic_age = age_selected.text;
        }
        if ((education_selected !== null)) {
            demographic_education = education_selected.text;
        }
        if ((gender_selected !== null)) {
            demographic_gender = gender_selected.text;
        }
    }
    
    
    // *background_btn* updates
    if (t >= 0.5 && background_btn.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      background_btn.tStart = t;  // (not accounting for frame time here)
      background_btn.frameNStart = frameN;  // exact frame index
      
      background_btn.setAutoDraw(true);
    }

    frameRemains = 120.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((background_btn.status === PsychoJS.Status.STARTED || background_btn.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      background_btn.setAutoDraw(false);
    }
    // *background_mouse* updates
    if (t >= 0.5 && background_mouse.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      background_mouse.tStart = t;  // (not accounting for frame time here)
      background_mouse.frameNStart = frameN;  // exact frame index
      
      background_mouse.status = PsychoJS.Status.STARTED;
      background_mouse.mouseClock.reset();
      prevButtonState = background_mouse.getPressed();  // if button is down already this ISN'T a new click
      }
    frameRemains = 120.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((background_mouse.status === PsychoJS.Status.STARTED || background_mouse.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      background_mouse.status = PsychoJS.Status.FINISHED;
  }
    if (background_mouse.status === PsychoJS.Status.STARTED) {  // only update if started and not finished!
      _mouseButtons = background_mouse.getPressed();
      if (!_mouseButtons.every( (e,i,) => (e == prevButtonState[i]) )) { // button state changed?
        prevButtonState = _mouseButtons;
        if (_mouseButtons.reduce( (e, acc) => (e+acc) ) > 0) { // state changed to a new click
          // check if the mouse was inside our 'clickable' objects
          gotValidClick = false;
          for (const obj of [[background_btn]]) {
            if (obj.contains(background_mouse)) {
              gotValidClick = true;
              background_mouse.clicked_name.push(obj.name)
            }
          }
          if (gotValidClick === true) { // abort routine on response
            continueRoutine = false;
          }
        }
      }
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
    for (const thisComponent of BACKGROUNDComponents)
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


function BACKGROUNDRoutineEnd(snapshot) {
  return function () {
    //------Ending Routine 'BACKGROUND'-------
    for (const thisComponent of BACKGROUNDComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // store data for thisExp (ExperimentHandler)
    _mouseXYs = background_mouse.getPos();
    _mouseButtons = background_mouse.getPressed();
    psychoJS.experiment.addData('background_mouse.x', _mouseXYs[0]);
    psychoJS.experiment.addData('background_mouse.y', _mouseXYs[1]);
    psychoJS.experiment.addData('background_mouse.leftButton', _mouseButtons[0]);
    psychoJS.experiment.addData('background_mouse.midButton', _mouseButtons[1]);
    psychoJS.experiment.addData('background_mouse.rightButton', _mouseButtons[2]);
    if (background_mouse.clicked_name.length > 0) {
      psychoJS.experiment.addData('background_mouse.clicked_name', background_mouse.clicked_name[0]);}
    return Scheduler.Event.NEXT;
  };
}


var MERGE_INTROComponents;
function MERGE_INTRORoutineBegin(snapshot) {
  return function () {
    //------Prepare to start Routine 'MERGE_INTRO'-------
    t = 0;
    MERGE_INTROClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(120.000000);
    // update component parameters for each repeat
    // setup some python lists for storing info about the merge_intro_mouse
    merge_intro_mouse.clicked_name = [];
    gotValidClick = false; // until a click is received
    // keep track of which components have finished
    MERGE_INTROComponents = [];
    MERGE_INTROComponents.push(intro_text_2);
    MERGE_INTROComponents.push(alice_2);
    MERGE_INTROComponents.push(merge_example);
    MERGE_INTROComponents.push(door_3);
    MERGE_INTROComponents.push(merge_intro_btn);
    MERGE_INTROComponents.push(merge_intro_mouse);
    
    for (const thisComponent of MERGE_INTROComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function MERGE_INTRORoutineEachFrame(snapshot) {
  return function () {
    //------Loop for each frame of Routine 'MERGE_INTRO'-------
    // get current time
    t = MERGE_INTROClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *intro_text_2* updates
    if (t >= 0.0 && intro_text_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      intro_text_2.tStart = t;  // (not accounting for frame time here)
      intro_text_2.frameNStart = frameN;  // exact frame index
      
      intro_text_2.setAutoDraw(true);
    }

    frameRemains = 0.0 + 120.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (intro_text_2.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      intro_text_2.setAutoDraw(false);
    }
    
    // *alice_2* updates
    if (t >= 0.0 && alice_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      alice_2.tStart = t;  // (not accounting for frame time here)
      alice_2.frameNStart = frameN;  // exact frame index
      
      alice_2.setAutoDraw(true);
    }

    frameRemains = 0.0 + 120.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (alice_2.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      alice_2.setAutoDraw(false);
    }
    
    // *merge_example* updates
    if (t >= 0.0 && merge_example.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      merge_example.tStart = t;  // (not accounting for frame time here)
      merge_example.frameNStart = frameN;  // exact frame index
      
      merge_example.setAutoDraw(true);
    }

    frameRemains = 0.0 + 120.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (merge_example.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      merge_example.setAutoDraw(false);
    }
    
    // *door_3* updates
    if (t >= 0.0 && door_3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      door_3.tStart = t;  // (not accounting for frame time here)
      door_3.frameNStart = frameN;  // exact frame index
      
      door_3.setAutoDraw(true);
    }

    frameRemains = 0.0 + 120.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (door_3.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      door_3.setAutoDraw(false);
    }
    
    // *merge_intro_btn* updates
    if (t >= 0.5 && merge_intro_btn.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      merge_intro_btn.tStart = t;  // (not accounting for frame time here)
      merge_intro_btn.frameNStart = frameN;  // exact frame index
      
      merge_intro_btn.setAutoDraw(true);
    }

    frameRemains = 120.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((merge_intro_btn.status === PsychoJS.Status.STARTED || merge_intro_btn.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      merge_intro_btn.setAutoDraw(false);
    }
    // *merge_intro_mouse* updates
    if (t >= 0.5 && merge_intro_mouse.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      merge_intro_mouse.tStart = t;  // (not accounting for frame time here)
      merge_intro_mouse.frameNStart = frameN;  // exact frame index
      
      merge_intro_mouse.status = PsychoJS.Status.STARTED;
      merge_intro_mouse.mouseClock.reset();
      prevButtonState = merge_intro_mouse.getPressed();  // if button is down already this ISN'T a new click
      }
    frameRemains = 120.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((merge_intro_mouse.status === PsychoJS.Status.STARTED || merge_intro_mouse.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      merge_intro_mouse.status = PsychoJS.Status.FINISHED;
  }
    if (merge_intro_mouse.status === PsychoJS.Status.STARTED) {  // only update if started and not finished!
      _mouseButtons = merge_intro_mouse.getPressed();
      if (!_mouseButtons.every( (e,i,) => (e == prevButtonState[i]) )) { // button state changed?
        prevButtonState = _mouseButtons;
        if (_mouseButtons.reduce( (e, acc) => (e+acc) ) > 0) { // state changed to a new click
          // check if the mouse was inside our 'clickable' objects
          gotValidClick = false;
          for (const obj of [[merge_intro_btn]]) {
            if (obj.contains(merge_intro_mouse)) {
              gotValidClick = true;
              merge_intro_mouse.clicked_name.push(obj.name)
            }
          }
          if (gotValidClick === true) { // abort routine on response
            continueRoutine = false;
          }
        }
      }
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
    for (const thisComponent of MERGE_INTROComponents)
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


function MERGE_INTRORoutineEnd(snapshot) {
  return function () {
    //------Ending Routine 'MERGE_INTRO'-------
    for (const thisComponent of MERGE_INTROComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // store data for thisExp (ExperimentHandler)
    _mouseXYs = merge_intro_mouse.getPos();
    _mouseButtons = merge_intro_mouse.getPressed();
    psychoJS.experiment.addData('merge_intro_mouse.x', _mouseXYs[0]);
    psychoJS.experiment.addData('merge_intro_mouse.y', _mouseXYs[1]);
    psychoJS.experiment.addData('merge_intro_mouse.leftButton', _mouseButtons[0]);
    psychoJS.experiment.addData('merge_intro_mouse.midButton', _mouseButtons[1]);
    psychoJS.experiment.addData('merge_intro_mouse.rightButton', _mouseButtons[2]);
    if (merge_intro_mouse.clicked_name.length > 0) {
      psychoJS.experiment.addData('merge_intro_mouse.clicked_name', merge_intro_mouse.clicked_name[0]);}
    return Scheduler.Event.NEXT;
  };
}


var TRAIN_1;
var currentLoop;
function TRAIN_1LoopBegin(TRAIN_1LoopScheduler) {
  // set up handler to look after randomisation of conditions etc
  TRAIN_1 = new TrialHandler({
    psychoJS: psychoJS,
    nReps: 1, method: TrialHandler.Method.SEQUENTIAL,
    extraInfo: expInfo, originPath: undefined,
    trialList: 'materials/merge_train_cond.csv',
    seed: undefined, name: 'TRAIN_1'
  });
  psychoJS.experiment.addLoop(TRAIN_1); // add the loop to the experiment
  currentLoop = TRAIN_1;  // we're now the current loop

  // Schedule all the trials in the trialList:
  for (const thisTRAIN_1 of TRAIN_1) {
    const snapshot = TRAIN_1.getSnapshot();
    TRAIN_1LoopScheduler.add(importConditions(snapshot));
    TRAIN_1LoopScheduler.add(MERGE_TRAINRoutineBegin(snapshot));
    TRAIN_1LoopScheduler.add(MERGE_TRAINRoutineEachFrame(snapshot));
    TRAIN_1LoopScheduler.add(MERGE_TRAINRoutineEnd(snapshot));
    TRAIN_1LoopScheduler.add(MERGE_EXPLRoutineBegin(snapshot));
    TRAIN_1LoopScheduler.add(MERGE_EXPLRoutineEachFrame(snapshot));
    TRAIN_1LoopScheduler.add(MERGE_EXPLRoutineEnd(snapshot));
    TRAIN_1LoopScheduler.add(endLoopIteration(TRAIN_1LoopScheduler, snapshot));
  }

  return Scheduler.Event.NEXT;
}


function TRAIN_1LoopEnd() {
  psychoJS.experiment.removeLoop(TRAIN_1);

  return Scheduler.Event.NEXT;
}


var TEST_1;
function TEST_1LoopBegin(TEST_1LoopScheduler) {
  // set up handler to look after randomisation of conditions etc
  TEST_1 = new TrialHandler({
    psychoJS: psychoJS,
    nReps: 1, method: TrialHandler.Method.SEQUENTIAL,
    extraInfo: expInfo, originPath: undefined,
    trialList: 'materials/merge_test_cond.csv',
    seed: undefined, name: 'TEST_1'
  });
  psychoJS.experiment.addLoop(TEST_1); // add the loop to the experiment
  currentLoop = TEST_1;  // we're now the current loop

  // Schedule all the trials in the trialList:
  for (const thisTEST_1 of TEST_1) {
    const snapshot = TEST_1.getSnapshot();
    TEST_1LoopScheduler.add(importConditions(snapshot));
    TEST_1LoopScheduler.add(MERGE_TESTRoutineBegin(snapshot));
    TEST_1LoopScheduler.add(MERGE_TESTRoutineEachFrame(snapshot));
    TEST_1LoopScheduler.add(MERGE_TESTRoutineEnd(snapshot));
    TEST_1LoopScheduler.add(endLoopIteration(TEST_1LoopScheduler, snapshot));
  }

  return Scheduler.Event.NEXT;
}


function TEST_1LoopEnd() {
  psychoJS.experiment.removeLoop(TEST_1);

  return Scheduler.Event.NEXT;
}


var TRAIN_2;
function TRAIN_2LoopBegin(TRAIN_2LoopScheduler) {
  // set up handler to look after randomisation of conditions etc
  TRAIN_2 = new TrialHandler({
    psychoJS: psychoJS,
    nReps: 1, method: TrialHandler.Method.SEQUENTIAL,
    extraInfo: expInfo, originPath: undefined,
    trialList: 'materials/sort_train_cond.csv',
    seed: undefined, name: 'TRAIN_2'
  });
  psychoJS.experiment.addLoop(TRAIN_2); // add the loop to the experiment
  currentLoop = TRAIN_2;  // we're now the current loop

  // Schedule all the trials in the trialList:
  for (const thisTRAIN_2 of TRAIN_2) {
    const snapshot = TRAIN_2.getSnapshot();
    TRAIN_2LoopScheduler.add(importConditions(snapshot));
    TRAIN_2LoopScheduler.add(SORT_TRAINRoutineBegin(snapshot));
    TRAIN_2LoopScheduler.add(SORT_TRAINRoutineEachFrame(snapshot));
    TRAIN_2LoopScheduler.add(SORT_TRAINRoutineEnd(snapshot));
    TRAIN_2LoopScheduler.add(SORT_EXPLRoutineBegin(snapshot));
    TRAIN_2LoopScheduler.add(SORT_EXPLRoutineEachFrame(snapshot));
    TRAIN_2LoopScheduler.add(SORT_EXPLRoutineEnd(snapshot));
    TRAIN_2LoopScheduler.add(endLoopIteration(TRAIN_2LoopScheduler, snapshot));
  }

  return Scheduler.Event.NEXT;
}


function TRAIN_2LoopEnd() {
  psychoJS.experiment.removeLoop(TRAIN_2);

  return Scheduler.Event.NEXT;
}


var TEST_2;
function TEST_2LoopBegin(TEST_2LoopScheduler) {
  // set up handler to look after randomisation of conditions etc
  TEST_2 = new TrialHandler({
    psychoJS: psychoJS,
    nReps: 1, method: TrialHandler.Method.SEQUENTIAL,
    extraInfo: expInfo, originPath: undefined,
    trialList: 'materials/sort_test_cond.csv',
    seed: undefined, name: 'TEST_2'
  });
  psychoJS.experiment.addLoop(TEST_2); // add the loop to the experiment
  currentLoop = TEST_2;  // we're now the current loop

  // Schedule all the trials in the trialList:
  for (const thisTEST_2 of TEST_2) {
    const snapshot = TEST_2.getSnapshot();
    TEST_2LoopScheduler.add(importConditions(snapshot));
    TEST_2LoopScheduler.add(SORT_TESTRoutineBegin(snapshot));
    TEST_2LoopScheduler.add(SORT_TESTRoutineEachFrame(snapshot));
    TEST_2LoopScheduler.add(SORT_TESTRoutineEnd(snapshot));
    TEST_2LoopScheduler.add(endLoopIteration(TEST_2LoopScheduler, snapshot));
  }

  return Scheduler.Event.NEXT;
}


function TEST_2LoopEnd() {
  psychoJS.experiment.removeLoop(TEST_2);

  return Scheduler.Event.NEXT;
}


var MERGE_TRAINComponents;
function MERGE_TRAINRoutineBegin(snapshot) {
  return function () {
    //------Prepare to start Routine 'MERGE_TRAIN'-------
    t = 0;
    MERGE_TRAINClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(60.000000);
    // update component parameters for each repeat
    merge_train_scale_instr.setColor(new util.Color('white'));
    merge_train_scale_instr.setText('COMPARE weights by typing fruit labels in both LHS and RHS  textboxes');
    merge_train.setImage(img_path);
    merge_train_mc_1.setImage('materials/merge_sort/imgs/white_BG.png');
    merge_train_mc_2.setImage('materials/merge_sort/imgs/white_BG.png');
    merge_train_scale.setImage(scaleEqPath);
    // setup some python lists for storing info about the merge_train_mouse
    merge_train_mouse.clicked_name = [];
    gotValidClick = false; // until a click is received
    // keep track of which components have finished
    MERGE_TRAINComponents = [];
    MERGE_TRAINComponents.push(merge_train_scale_instr);
    MERGE_TRAINComponents.push(merge_ans_instr);
    MERGE_TRAINComponents.push(merge_train_instr);
    MERGE_TRAINComponents.push(merge_train_scale_right);
    MERGE_TRAINComponents.push(merge_train_scale_left);
    MERGE_TRAINComponents.push(merge_train_compare);
    MERGE_TRAINComponents.push(merge_train_sep);
    MERGE_TRAINComponents.push(merge_train);
    MERGE_TRAINComponents.push(merge_train_mc_1);
    MERGE_TRAINComponents.push(merge_train_mc_2);
    MERGE_TRAINComponents.push(merge_train_scale);
    MERGE_TRAINComponents.push(merge_train_btn_1);
    MERGE_TRAINComponents.push(merge_train_btn_2);
    MERGE_TRAINComponents.push(merge_train_mouse);
    MERGE_TRAINComponents.push(merge_train_timer);
    
    for (const thisComponent of MERGE_TRAINComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


var mc_order;
var merge_train_compareN;
function MERGE_TRAINRoutineEachFrame(snapshot) {
  return function () {
    //------Loop for each frame of Routine 'MERGE_TRAIN'-------
    // get current time
    t = MERGE_TRAINClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *merge_train_scale_instr* updates
    if (t >= 0.0 && merge_train_scale_instr.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      merge_train_scale_instr.tStart = t;  // (not accounting for frame time here)
      merge_train_scale_instr.frameNStart = frameN;  // exact frame index
      
      merge_train_scale_instr.setAutoDraw(true);
    }

    frameRemains = 0.0 + 60.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (merge_train_scale_instr.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      merge_train_scale_instr.setAutoDraw(false);
    }
    
    // *merge_ans_instr* updates
    if (t >= 0.0 && merge_ans_instr.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      merge_ans_instr.tStart = t;  // (not accounting for frame time here)
      merge_ans_instr.frameNStart = frameN;  // exact frame index
      
      merge_ans_instr.setAutoDraw(true);
    }

    frameRemains = 0.0 + 60.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (merge_ans_instr.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      merge_ans_instr.setAutoDraw(false);
    }
    
    // *merge_train_instr* updates
    if (t >= 0.0 && merge_train_instr.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      merge_train_instr.tStart = t;  // (not accounting for frame time here)
      merge_train_instr.frameNStart = frameN;  // exact frame index
      
      merge_train_instr.setAutoDraw(true);
    }

    frameRemains = 0.0 + 60.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (merge_train_instr.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      merge_train_instr.setAutoDraw(false);
    }
    
    // *merge_train_scale_right* updates
    if (t >= 0.0 && merge_train_scale_right.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      merge_train_scale_right.tStart = t;  // (not accounting for frame time here)
      merge_train_scale_right.frameNStart = frameN;  // exact frame index
      
      merge_train_scale_right.setAutoDraw(true);
    }

    frameRemains = 0.0 + 60.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (merge_train_scale_right.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      merge_train_scale_right.setAutoDraw(false);
    }
    
    // *merge_train_scale_left* updates
    if (t >= 0.0 && merge_train_scale_left.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      merge_train_scale_left.tStart = t;  // (not accounting for frame time here)
      merge_train_scale_left.frameNStart = frameN;  // exact frame index
      
      merge_train_scale_left.setAutoDraw(true);
    }

    frameRemains = 0.0 + 60.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (merge_train_scale_left.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      merge_train_scale_left.setAutoDraw(false);
    }
    
    // *merge_train_compare* updates
    if (t >= 0.0 && merge_train_compare.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      merge_train_compare.tStart = t;  // (not accounting for frame time here)
      merge_train_compare.frameNStart = frameN;  // exact frame index
      
      merge_train_compare.setAutoDraw(true);
    }

    frameRemains = 0.0 + 60.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (merge_train_compare.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      merge_train_compare.setAutoDraw(false);
    }
    
    // *merge_train_sep* updates
    if (t >= 0.0 && merge_train_sep.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      merge_train_sep.tStart = t;  // (not accounting for frame time here)
      merge_train_sep.frameNStart = frameN;  // exact frame index
      
      merge_train_sep.setAutoDraw(true);
    }

    frameRemains = 0.0 + 60.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (merge_train_sep.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      merge_train_sep.setAutoDraw(false);
    }
    
    // *merge_train* updates
    if (t >= 0.0 && merge_train.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      merge_train.tStart = t;  // (not accounting for frame time here)
      merge_train.frameNStart = frameN;  // exact frame index
      
      merge_train.setAutoDraw(true);
    }

    frameRemains = 0.0 + 60.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (merge_train.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      merge_train.setAutoDraw(false);
    }
    
    // *merge_train_mc_1* updates
    if (t >= 0.0 && merge_train_mc_1.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      merge_train_mc_1.tStart = t;  // (not accounting for frame time here)
      merge_train_mc_1.frameNStart = frameN;  // exact frame index
      
      merge_train_mc_1.setAutoDraw(true);
    }

    frameRemains = 0.0 + 60.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (merge_train_mc_1.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      merge_train_mc_1.setAutoDraw(false);
    }
    
    // *merge_train_mc_2* updates
    if (t >= 0.0 && merge_train_mc_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      merge_train_mc_2.tStart = t;  // (not accounting for frame time here)
      merge_train_mc_2.frameNStart = frameN;  // exact frame index
      
      merge_train_mc_2.setAutoDraw(true);
    }

    frameRemains = 0.0 + 60.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (merge_train_mc_2.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      merge_train_mc_2.setAutoDraw(false);
    }
    
    // *merge_train_scale* updates
    if (t >= 0.0 && merge_train_scale.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      merge_train_scale.tStart = t;  // (not accounting for frame time here)
      merge_train_scale.frameNStart = frameN;  // exact frame index
      
      merge_train_scale.setAutoDraw(true);
    }

    frameRemains = 0.0 + 60.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (merge_train_scale.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      merge_train_scale.setAutoDraw(false);
    }
    if ((mc_order === [])) {
        mc_order = getCorrectMCOrder(TRAIN_1.thisTrialN, merge_train_mc_path_1, merge_train_mc_path_2, merge_train_mc_1, merge_train_mc_2);
    }
    if (merge_train_mouse.isPressedIn(merge_train_compare)) {
        merge_train_compareN = (merge_train_compareN + compare(merge_train_scale, merge_train_input, merge_train_labels, merge_train_scale_instr, merge_train_scale_left, merge_train_scale_right));
    }
    merge_train_timer.text = timerWarning(mergeTrainTimeL, t);
    
    
    // *merge_train_btn_1* updates
    if (t >= 0.5 && merge_train_btn_1.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      merge_train_btn_1.tStart = t;  // (not accounting for frame time here)
      merge_train_btn_1.frameNStart = frameN;  // exact frame index
      
      merge_train_btn_1.setAutoDraw(true);
    }

    frameRemains = 60.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((merge_train_btn_1.status === PsychoJS.Status.STARTED || merge_train_btn_1.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      merge_train_btn_1.setAutoDraw(false);
    }
    
    // *merge_train_btn_2* updates
    if (t >= 0.5 && merge_train_btn_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      merge_train_btn_2.tStart = t;  // (not accounting for frame time here)
      merge_train_btn_2.frameNStart = frameN;  // exact frame index
      
      merge_train_btn_2.setAutoDraw(true);
    }

    frameRemains = 60.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((merge_train_btn_2.status === PsychoJS.Status.STARTED || merge_train_btn_2.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      merge_train_btn_2.setAutoDraw(false);
    }
    // *merge_train_mouse* updates
    if (t >= 0.5 && merge_train_mouse.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      merge_train_mouse.tStart = t;  // (not accounting for frame time here)
      merge_train_mouse.frameNStart = frameN;  // exact frame index
      
      merge_train_mouse.status = PsychoJS.Status.STARTED;
      merge_train_mouse.mouseClock.reset();
      prevButtonState = merge_train_mouse.getPressed();  // if button is down already this ISN'T a new click
      }
    frameRemains = 60.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((merge_train_mouse.status === PsychoJS.Status.STARTED || merge_train_mouse.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      merge_train_mouse.status = PsychoJS.Status.FINISHED;
  }
    if (merge_train_mouse.status === PsychoJS.Status.STARTED) {  // only update if started and not finished!
      _mouseButtons = merge_train_mouse.getPressed();
      if (!_mouseButtons.every( (e,i,) => (e == prevButtonState[i]) )) { // button state changed?
        prevButtonState = _mouseButtons;
        if (_mouseButtons.reduce( (e, acc) => (e+acc) ) > 0) { // state changed to a new click
          // check if the mouse was inside our 'clickable' objects
          gotValidClick = false;
          for (const obj of [[merge_train_btn_1,merge_train_btn_2]]) {
            if (obj.contains(merge_train_mouse)) {
              gotValidClick = true;
              merge_train_mouse.clicked_name.push(obj.name)
            }
          }
          if (gotValidClick === true) { // abort routine on response
            continueRoutine = false;
          }
        }
      }
    }
    
    // *merge_train_timer* updates
    if (t >= 0.0 && merge_train_timer.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      merge_train_timer.tStart = t;  // (not accounting for frame time here)
      merge_train_timer.frameNStart = frameN;  // exact frame index
      
      merge_train_timer.setAutoDraw(true);
    }

    frameRemains = 60.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((merge_train_timer.status === PsychoJS.Status.STARTED || merge_train_timer.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      merge_train_timer.setAutoDraw(false);
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
    for (const thisComponent of MERGE_TRAINComponents)
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


function MERGE_TRAINRoutineEnd(snapshot) {
  return function () {
    //------Ending Routine 'MERGE_TRAIN'-------
    for (const thisComponent of MERGE_TRAINComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('merge_train_scale_right.text',merge_train_scale_right.text)
    merge_train_scale_right.reset()
    psychoJS.experiment.addData('merge_train_scale_left.text',merge_train_scale_left.text)
    merge_train_scale_left.reset()
    // store data for thisExp (ExperimentHandler)
    _mouseXYs = merge_train_mouse.getPos();
    _mouseButtons = merge_train_mouse.getPressed();
    psychoJS.experiment.addData('merge_train_mouse.x', _mouseXYs[0]);
    psychoJS.experiment.addData('merge_train_mouse.y', _mouseXYs[1]);
    psychoJS.experiment.addData('merge_train_mouse.leftButton', _mouseButtons[0]);
    psychoJS.experiment.addData('merge_train_mouse.midButton', _mouseButtons[1]);
    psychoJS.experiment.addData('merge_train_mouse.rightButton', _mouseButtons[2]);
    if (merge_train_mouse.clicked_name.length > 0) {
      psychoJS.experiment.addData('merge_train_mouse.clicked_name', merge_train_mouse.clicked_name[0]);}
    return Scheduler.Event.NEXT;
  };
}


var _pj;
var MERGE_EXPLComponents;
function MERGE_EXPLRoutineBegin(snapshot) {
  return function () {
    //------Prepare to start Routine 'MERGE_EXPL'-------
    t = 0;
    MERGE_EXPLClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(30.000000);
    // update component parameters for each repeat
    merge_expl_1.setImage('materials/merge_sort/imgs/white_BG.png');
    merge_expl_2.setImage('materials/merge_sort/imgs/white_BG.png');
    merge_expl_mc_1.setImage('materials/merge_sort/imgs/white_BG.png');
    merge_expl_mc_2.setImage('materials/merge_sort/imgs/white_BG.png');
    var _pj;
    function _pj_snippets(container) {
        function in_es6(left, right) {
            if (((right instanceof Array) || ((typeof right) === "string"))) {
                return (right.indexOf(left) > (- 1));
            } else {
                if (((right instanceof Map) || (right instanceof Set) || (right instanceof WeakMap) || (right instanceof WeakSet))) {
                    return right.has(left);
                } else {
                    return (left in right);
                }
            }
        }
        container["in_es6"] = in_es6;
        return container;
    }
    _pj = {};
    _pj_snippets(_pj);
    submitted = 2;
    if (_pj.in_es6("merge_train_btn_1", merge_train_mouse.clicked_name)) {
        submitted = 0;
    } else {
        if (_pj.in_es6("merge_train_btn_2", merge_train_mouse.clicked_name)) {
            submitted = 1;
        }
    }
    showMergeExpl(submitted, merge_expl_feedback_1, merge_expl_feedback_2, merge_expl_mc_1, merge_expl_mc_2, merge_train_mc_path_1, merge_train_mc_path_2, merge_expl_1, merge_expl_2);
    
    // setup some python lists for storing info about the merge_expl_mouse
    merge_expl_mouse.clicked_name = [];
    gotValidClick = false; // until a click is received
    // keep track of which components have finished
    MERGE_EXPLComponents = [];
    MERGE_EXPLComponents.push(merge_expl_instr);
    MERGE_EXPLComponents.push(merge_expl_feedback_1);
    MERGE_EXPLComponents.push(merge_expl_feedback_2);
    MERGE_EXPLComponents.push(merge_expl_sep);
    MERGE_EXPLComponents.push(merge_expl_1);
    MERGE_EXPLComponents.push(merge_expl_2);
    MERGE_EXPLComponents.push(merge_expl_mc_1);
    MERGE_EXPLComponents.push(merge_expl_mc_2);
    MERGE_EXPLComponents.push(merge_expl_btn);
    MERGE_EXPLComponents.push(merge_expl_mouse);
    MERGE_EXPLComponents.push(merge_expl_timer);
    
    for (const thisComponent of MERGE_EXPLComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function MERGE_EXPLRoutineEachFrame(snapshot) {
  return function () {
    //------Loop for each frame of Routine 'MERGE_EXPL'-------
    // get current time
    t = MERGE_EXPLClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *merge_expl_instr* updates
    if (t >= 0.0 && merge_expl_instr.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      merge_expl_instr.tStart = t;  // (not accounting for frame time here)
      merge_expl_instr.frameNStart = frameN;  // exact frame index
      
      merge_expl_instr.setAutoDraw(true);
    }

    frameRemains = 0.0 + 30.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (merge_expl_instr.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      merge_expl_instr.setAutoDraw(false);
    }
    
    // *merge_expl_feedback_1* updates
    if (t >= 0.0 && merge_expl_feedback_1.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      merge_expl_feedback_1.tStart = t;  // (not accounting for frame time here)
      merge_expl_feedback_1.frameNStart = frameN;  // exact frame index
      
      merge_expl_feedback_1.setAutoDraw(true);
    }

    frameRemains = 0.0 + 30.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (merge_expl_feedback_1.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      merge_expl_feedback_1.setAutoDraw(false);
    }
    
    // *merge_expl_feedback_2* updates
    if (t >= 0.0 && merge_expl_feedback_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      merge_expl_feedback_2.tStart = t;  // (not accounting for frame time here)
      merge_expl_feedback_2.frameNStart = frameN;  // exact frame index
      
      merge_expl_feedback_2.setAutoDraw(true);
    }

    frameRemains = 0.0 + 30.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (merge_expl_feedback_2.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      merge_expl_feedback_2.setAutoDraw(false);
    }
    
    // *merge_expl_sep* updates
    if (t >= 0.0 && merge_expl_sep.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      merge_expl_sep.tStart = t;  // (not accounting for frame time here)
      merge_expl_sep.frameNStart = frameN;  // exact frame index
      
      merge_expl_sep.setAutoDraw(true);
    }

    frameRemains = 0.0 + 30.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (merge_expl_sep.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      merge_expl_sep.setAutoDraw(false);
    }
    
    // *merge_expl_1* updates
    if (t >= 0.0 && merge_expl_1.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      merge_expl_1.tStart = t;  // (not accounting for frame time here)
      merge_expl_1.frameNStart = frameN;  // exact frame index
      
      merge_expl_1.setAutoDraw(true);
    }

    frameRemains = 0.0 + 30.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (merge_expl_1.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      merge_expl_1.setAutoDraw(false);
    }
    
    // *merge_expl_2* updates
    if (t >= 0.0 && merge_expl_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      merge_expl_2.tStart = t;  // (not accounting for frame time here)
      merge_expl_2.frameNStart = frameN;  // exact frame index
      
      merge_expl_2.setAutoDraw(true);
    }

    frameRemains = 0.0 + 30.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (merge_expl_2.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      merge_expl_2.setAutoDraw(false);
    }
    
    // *merge_expl_mc_1* updates
    if (t >= 0.0 && merge_expl_mc_1.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      merge_expl_mc_1.tStart = t;  // (not accounting for frame time here)
      merge_expl_mc_1.frameNStart = frameN;  // exact frame index
      
      merge_expl_mc_1.setAutoDraw(true);
    }

    frameRemains = 0.0 + 30.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (merge_expl_mc_1.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      merge_expl_mc_1.setAutoDraw(false);
    }
    
    // *merge_expl_mc_2* updates
    if (t >= 0.0 && merge_expl_mc_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      merge_expl_mc_2.tStart = t;  // (not accounting for frame time here)
      merge_expl_mc_2.frameNStart = frameN;  // exact frame index
      
      merge_expl_mc_2.setAutoDraw(true);
    }

    frameRemains = 0.0 + 30.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (merge_expl_mc_2.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      merge_expl_mc_2.setAutoDraw(false);
    }
    merge_expl_timer.text = timerWarning(mergeExplTimeL, t);
    
    
    // *merge_expl_btn* updates
    if (t >= 0.5 && merge_expl_btn.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      merge_expl_btn.tStart = t;  // (not accounting for frame time here)
      merge_expl_btn.frameNStart = frameN;  // exact frame index
      
      merge_expl_btn.setAutoDraw(true);
    }

    frameRemains = 30.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((merge_expl_btn.status === PsychoJS.Status.STARTED || merge_expl_btn.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      merge_expl_btn.setAutoDraw(false);
    }
    // *merge_expl_mouse* updates
    if (t >= 0.5 && merge_expl_mouse.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      merge_expl_mouse.tStart = t;  // (not accounting for frame time here)
      merge_expl_mouse.frameNStart = frameN;  // exact frame index
      
      merge_expl_mouse.status = PsychoJS.Status.STARTED;
      merge_expl_mouse.mouseClock.reset();
      prevButtonState = merge_expl_mouse.getPressed();  // if button is down already this ISN'T a new click
      }
    frameRemains = 30.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((merge_expl_mouse.status === PsychoJS.Status.STARTED || merge_expl_mouse.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      merge_expl_mouse.status = PsychoJS.Status.FINISHED;
  }
    if (merge_expl_mouse.status === PsychoJS.Status.STARTED) {  // only update if started and not finished!
      _mouseButtons = merge_expl_mouse.getPressed();
      if (!_mouseButtons.every( (e,i,) => (e == prevButtonState[i]) )) { // button state changed?
        prevButtonState = _mouseButtons;
        if (_mouseButtons.reduce( (e, acc) => (e+acc) ) > 0) { // state changed to a new click
          // check if the mouse was inside our 'clickable' objects
          gotValidClick = false;
          for (const obj of [[merge_expl_btn]]) {
            if (obj.contains(merge_expl_mouse)) {
              gotValidClick = true;
              merge_expl_mouse.clicked_name.push(obj.name)
            }
          }
          if (gotValidClick === true) { // abort routine on response
            continueRoutine = false;
          }
        }
      }
    }
    
    // *merge_expl_timer* updates
    if (t >= 0.0 && merge_expl_timer.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      merge_expl_timer.tStart = t;  // (not accounting for frame time here)
      merge_expl_timer.frameNStart = frameN;  // exact frame index
      
      merge_expl_timer.setAutoDraw(true);
    }

    frameRemains = 30.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((merge_expl_timer.status === PsychoJS.Status.STARTED || merge_expl_timer.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      merge_expl_timer.setAutoDraw(false);
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
    for (const thisComponent of MERGE_EXPLComponents)
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


function MERGE_EXPLRoutineEnd(snapshot) {
  return function () {
    //------Ending Routine 'MERGE_EXPL'-------
    for (const thisComponent of MERGE_EXPLComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // store data for thisExp (ExperimentHandler)
    _mouseXYs = merge_expl_mouse.getPos();
    _mouseButtons = merge_expl_mouse.getPressed();
    psychoJS.experiment.addData('merge_expl_mouse.x', _mouseXYs[0]);
    psychoJS.experiment.addData('merge_expl_mouse.y', _mouseXYs[1]);
    psychoJS.experiment.addData('merge_expl_mouse.leftButton', _mouseButtons[0]);
    psychoJS.experiment.addData('merge_expl_mouse.midButton', _mouseButtons[1]);
    psychoJS.experiment.addData('merge_expl_mouse.rightButton', _mouseButtons[2]);
    if (merge_expl_mouse.clicked_name.length > 0) {
      psychoJS.experiment.addData('merge_expl_mouse.clicked_name', merge_expl_mouse.clicked_name[0]);}
    return Scheduler.Event.NEXT;
  };
}


var MERGE_TEST_INTROComponents;
function MERGE_TEST_INTRORoutineBegin(snapshot) {
  return function () {
    //------Prepare to start Routine 'MERGE_TEST_INTRO'-------
    t = 0;
    MERGE_TEST_INTROClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(120.000000);
    // update component parameters for each repeat
    // setup some python lists for storing info about the merge_test_intro_mouse
    merge_test_intro_mouse.clicked_name = [];
    gotValidClick = false; // until a click is received
    // keep track of which components have finished
    MERGE_TEST_INTROComponents = [];
    MERGE_TEST_INTROComponents.push(intro_text_6);
    MERGE_TEST_INTROComponents.push(alice_4);
    MERGE_TEST_INTROComponents.push(merge_example_2);
    MERGE_TEST_INTROComponents.push(door_6);
    MERGE_TEST_INTROComponents.push(merge_test_intro_btn);
    MERGE_TEST_INTROComponents.push(merge_test_intro_mouse);
    
    for (const thisComponent of MERGE_TEST_INTROComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function MERGE_TEST_INTRORoutineEachFrame(snapshot) {
  return function () {
    //------Loop for each frame of Routine 'MERGE_TEST_INTRO'-------
    // get current time
    t = MERGE_TEST_INTROClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *intro_text_6* updates
    if (t >= 0.0 && intro_text_6.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      intro_text_6.tStart = t;  // (not accounting for frame time here)
      intro_text_6.frameNStart = frameN;  // exact frame index
      
      intro_text_6.setAutoDraw(true);
    }

    frameRemains = 0.0 + 120.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (intro_text_6.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      intro_text_6.setAutoDraw(false);
    }
    
    // *alice_4* updates
    if (t >= 0.0 && alice_4.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      alice_4.tStart = t;  // (not accounting for frame time here)
      alice_4.frameNStart = frameN;  // exact frame index
      
      alice_4.setAutoDraw(true);
    }

    frameRemains = 0.0 + 120.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (alice_4.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      alice_4.setAutoDraw(false);
    }
    
    // *merge_example_2* updates
    if (t >= 0.0 && merge_example_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      merge_example_2.tStart = t;  // (not accounting for frame time here)
      merge_example_2.frameNStart = frameN;  // exact frame index
      
      merge_example_2.setAutoDraw(true);
    }

    frameRemains = 0.0 + 120.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (merge_example_2.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      merge_example_2.setAutoDraw(false);
    }
    
    // *door_6* updates
    if (t >= 0.0 && door_6.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      door_6.tStart = t;  // (not accounting for frame time here)
      door_6.frameNStart = frameN;  // exact frame index
      
      door_6.setAutoDraw(true);
    }

    frameRemains = 0.0 + 120.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (door_6.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      door_6.setAutoDraw(false);
    }
    
    // *merge_test_intro_btn* updates
    if (t >= 0.5 && merge_test_intro_btn.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      merge_test_intro_btn.tStart = t;  // (not accounting for frame time here)
      merge_test_intro_btn.frameNStart = frameN;  // exact frame index
      
      merge_test_intro_btn.setAutoDraw(true);
    }

    frameRemains = 120.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((merge_test_intro_btn.status === PsychoJS.Status.STARTED || merge_test_intro_btn.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      merge_test_intro_btn.setAutoDraw(false);
    }
    // *merge_test_intro_mouse* updates
    if (t >= 0.5 && merge_test_intro_mouse.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      merge_test_intro_mouse.tStart = t;  // (not accounting for frame time here)
      merge_test_intro_mouse.frameNStart = frameN;  // exact frame index
      
      merge_test_intro_mouse.status = PsychoJS.Status.STARTED;
      merge_test_intro_mouse.mouseClock.reset();
      prevButtonState = merge_test_intro_mouse.getPressed();  // if button is down already this ISN'T a new click
      }
    frameRemains = 120.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((merge_test_intro_mouse.status === PsychoJS.Status.STARTED || merge_test_intro_mouse.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      merge_test_intro_mouse.status = PsychoJS.Status.FINISHED;
  }
    if (merge_test_intro_mouse.status === PsychoJS.Status.STARTED) {  // only update if started and not finished!
      _mouseButtons = merge_test_intro_mouse.getPressed();
      if (!_mouseButtons.every( (e,i,) => (e == prevButtonState[i]) )) { // button state changed?
        prevButtonState = _mouseButtons;
        if (_mouseButtons.reduce( (e, acc) => (e+acc) ) > 0) { // state changed to a new click
          // check if the mouse was inside our 'clickable' objects
          gotValidClick = false;
          for (const obj of [[merge_test_intro_btn]]) {
            if (obj.contains(merge_test_intro_mouse)) {
              gotValidClick = true;
              merge_test_intro_mouse.clicked_name.push(obj.name)
            }
          }
          if (gotValidClick === true) { // abort routine on response
            continueRoutine = false;
          }
        }
      }
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
    for (const thisComponent of MERGE_TEST_INTROComponents)
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


function MERGE_TEST_INTRORoutineEnd(snapshot) {
  return function () {
    //------Ending Routine 'MERGE_TEST_INTRO'-------
    for (const thisComponent of MERGE_TEST_INTROComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // store data for thisExp (ExperimentHandler)
    _mouseXYs = merge_test_intro_mouse.getPos();
    _mouseButtons = merge_test_intro_mouse.getPressed();
    psychoJS.experiment.addData('merge_test_intro_mouse.x', _mouseXYs[0]);
    psychoJS.experiment.addData('merge_test_intro_mouse.y', _mouseXYs[1]);
    psychoJS.experiment.addData('merge_test_intro_mouse.leftButton', _mouseButtons[0]);
    psychoJS.experiment.addData('merge_test_intro_mouse.midButton', _mouseButtons[1]);
    psychoJS.experiment.addData('merge_test_intro_mouse.rightButton', _mouseButtons[2]);
    if (merge_test_intro_mouse.clicked_name.length > 0) {
      psychoJS.experiment.addData('merge_test_intro_mouse.clicked_name', merge_test_intro_mouse.clicked_name[0]);}
    return Scheduler.Event.NEXT;
  };
}


var MERGE_TESTComponents;
function MERGE_TESTRoutineBegin(snapshot) {
  return function () {
    //------Prepare to start Routine 'MERGE_TEST'-------
    t = 0;
    MERGE_TESTClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(90.000000);
    // update component parameters for each repeat
    merge_test_scale_instr.setColor(new util.Color('white'));
    merge_test_scale_instr.setText('COMPARE weights by typing fruit labels in both LHS and RHS  textboxes');
    merge_test.setImage(img_path);
    merge_test_scale.setImage(scaleEqPath);
    // setup some python lists for storing info about the merge_test_mouse
    merge_test_mouse.clicked_name = [];
    gotValidClick = false; // until a click is received
    // keep track of which components have finished
    MERGE_TESTComponents = [];
    MERGE_TESTComponents.push(merge_test_scale_instr);
    MERGE_TESTComponents.push(merge_test_ans_instr);
    MERGE_TESTComponents.push(merge_test_instr);
    MERGE_TESTComponents.push(merge_test_scale_right);
    MERGE_TESTComponents.push(merge_test_scale_left);
    MERGE_TESTComponents.push(merge_test_compare);
    MERGE_TESTComponents.push(merge_test_res);
    MERGE_TESTComponents.push(merge_test_sep);
    MERGE_TESTComponents.push(merge_test);
    MERGE_TESTComponents.push(merge_test_scale);
    MERGE_TESTComponents.push(merge_test_btn);
    MERGE_TESTComponents.push(merge_test_mouse);
    MERGE_TESTComponents.push(merge_test_timer);
    
    for (const thisComponent of MERGE_TESTComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


var merge_test_compareN;
var merge_test_ans;
function MERGE_TESTRoutineEachFrame(snapshot) {
  return function () {
    //------Loop for each frame of Routine 'MERGE_TEST'-------
    // get current time
    t = MERGE_TESTClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *merge_test_scale_instr* updates
    if (t >= 0.0 && merge_test_scale_instr.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      merge_test_scale_instr.tStart = t;  // (not accounting for frame time here)
      merge_test_scale_instr.frameNStart = frameN;  // exact frame index
      
      merge_test_scale_instr.setAutoDraw(true);
    }

    frameRemains = 0.0 + 90.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (merge_test_scale_instr.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      merge_test_scale_instr.setAutoDraw(false);
    }
    
    // *merge_test_ans_instr* updates
    if (t >= 0.0 && merge_test_ans_instr.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      merge_test_ans_instr.tStart = t;  // (not accounting for frame time here)
      merge_test_ans_instr.frameNStart = frameN;  // exact frame index
      
      merge_test_ans_instr.setAutoDraw(true);
    }

    frameRemains = 0.0 + 90.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (merge_test_ans_instr.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      merge_test_ans_instr.setAutoDraw(false);
    }
    
    // *merge_test_instr* updates
    if (t >= 0.0 && merge_test_instr.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      merge_test_instr.tStart = t;  // (not accounting for frame time here)
      merge_test_instr.frameNStart = frameN;  // exact frame index
      
      merge_test_instr.setAutoDraw(true);
    }

    frameRemains = 0.0 + 90.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (merge_test_instr.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      merge_test_instr.setAutoDraw(false);
    }
    
    // *merge_test_scale_right* updates
    if (t >= 0.0 && merge_test_scale_right.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      merge_test_scale_right.tStart = t;  // (not accounting for frame time here)
      merge_test_scale_right.frameNStart = frameN;  // exact frame index
      
      merge_test_scale_right.setAutoDraw(true);
    }

    frameRemains = 0.0 + 90.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (merge_test_scale_right.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      merge_test_scale_right.setAutoDraw(false);
    }
    
    // *merge_test_scale_left* updates
    if (t >= 0.0 && merge_test_scale_left.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      merge_test_scale_left.tStart = t;  // (not accounting for frame time here)
      merge_test_scale_left.frameNStart = frameN;  // exact frame index
      
      merge_test_scale_left.setAutoDraw(true);
    }

    frameRemains = 0.0 + 90.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (merge_test_scale_left.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      merge_test_scale_left.setAutoDraw(false);
    }
    
    // *merge_test_compare* updates
    if (t >= 0.0 && merge_test_compare.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      merge_test_compare.tStart = t;  // (not accounting for frame time here)
      merge_test_compare.frameNStart = frameN;  // exact frame index
      
      merge_test_compare.setAutoDraw(true);
    }

    frameRemains = 0.0 + 90.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (merge_test_compare.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      merge_test_compare.setAutoDraw(false);
    }
    
    // *merge_test_res* updates
    if (t >= 0.0 && merge_test_res.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      merge_test_res.tStart = t;  // (not accounting for frame time here)
      merge_test_res.frameNStart = frameN;  // exact frame index
      
      merge_test_res.setAutoDraw(true);
    }

    frameRemains = 0.0 + 90.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (merge_test_res.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      merge_test_res.setAutoDraw(false);
    }
    
    // *merge_test_sep* updates
    if (t >= 0.0 && merge_test_sep.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      merge_test_sep.tStart = t;  // (not accounting for frame time here)
      merge_test_sep.frameNStart = frameN;  // exact frame index
      
      merge_test_sep.setAutoDraw(true);
    }

    frameRemains = 0.0 + 90.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (merge_test_sep.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      merge_test_sep.setAutoDraw(false);
    }
    
    // *merge_test* updates
    if (t >= 0.0 && merge_test.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      merge_test.tStart = t;  // (not accounting for frame time here)
      merge_test.frameNStart = frameN;  // exact frame index
      
      merge_test.setAutoDraw(true);
    }

    frameRemains = 0.0 + 90.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (merge_test.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      merge_test.setAutoDraw(false);
    }
    
    // *merge_test_scale* updates
    if (t >= 0.0 && merge_test_scale.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      merge_test_scale.tStart = t;  // (not accounting for frame time here)
      merge_test_scale.frameNStart = frameN;  // exact frame index
      
      merge_test_scale.setAutoDraw(true);
    }

    frameRemains = 0.0 + 90.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (merge_test_scale.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      merge_test_scale.setAutoDraw(false);
    }
    if (merge_test_mouse.isPressedIn(merge_test_compare)) {
        merge_test_compareN = (merge_test_compareN + compare(merge_test_scale, merge_test_input, merge_test_labels, merge_test_scale_instr, merge_test_scale_left, merge_test_scale_right));
    }
    merge_test_timer.text = timerWarning(mergeTestTimeL, t);
    merge_test_ans = merge_test_res.text;
    
    
    // *merge_test_btn* updates
    if (t >= 0.5 && merge_test_btn.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      merge_test_btn.tStart = t;  // (not accounting for frame time here)
      merge_test_btn.frameNStart = frameN;  // exact frame index
      
      merge_test_btn.setAutoDraw(true);
    }

    frameRemains = 90.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((merge_test_btn.status === PsychoJS.Status.STARTED || merge_test_btn.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      merge_test_btn.setAutoDraw(false);
    }
    // *merge_test_mouse* updates
    if (t >= 0.5 && merge_test_mouse.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      merge_test_mouse.tStart = t;  // (not accounting for frame time here)
      merge_test_mouse.frameNStart = frameN;  // exact frame index
      
      merge_test_mouse.status = PsychoJS.Status.STARTED;
      merge_test_mouse.mouseClock.reset();
      prevButtonState = merge_test_mouse.getPressed();  // if button is down already this ISN'T a new click
      }
    frameRemains = 90.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((merge_test_mouse.status === PsychoJS.Status.STARTED || merge_test_mouse.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      merge_test_mouse.status = PsychoJS.Status.FINISHED;
  }
    if (merge_test_mouse.status === PsychoJS.Status.STARTED) {  // only update if started and not finished!
      _mouseButtons = merge_test_mouse.getPressed();
      if (!_mouseButtons.every( (e,i,) => (e == prevButtonState[i]) )) { // button state changed?
        prevButtonState = _mouseButtons;
        if (_mouseButtons.reduce( (e, acc) => (e+acc) ) > 0) { // state changed to a new click
          // check if the mouse was inside our 'clickable' objects
          gotValidClick = false;
          for (const obj of [[merge_test_btn]]) {
            if (obj.contains(merge_test_mouse)) {
              gotValidClick = true;
              merge_test_mouse.clicked_name.push(obj.name)
            }
          }
          if (gotValidClick === true) { // abort routine on response
            continueRoutine = false;
          }
        }
      }
    }
    
    // *merge_test_timer* updates
    if (t >= 0.0 && merge_test_timer.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      merge_test_timer.tStart = t;  // (not accounting for frame time here)
      merge_test_timer.frameNStart = frameN;  // exact frame index
      
      merge_test_timer.setAutoDraw(true);
    }

    frameRemains = 90.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((merge_test_timer.status === PsychoJS.Status.STARTED || merge_test_timer.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      merge_test_timer.setAutoDraw(false);
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
    for (const thisComponent of MERGE_TESTComponents)
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


function MERGE_TESTRoutineEnd(snapshot) {
  return function () {
    //------Ending Routine 'MERGE_TEST'-------
    for (const thisComponent of MERGE_TESTComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('merge_test_scale_right.text',merge_test_scale_right.text)
    merge_test_scale_right.reset()
    psychoJS.experiment.addData('merge_test_scale_left.text',merge_test_scale_left.text)
    merge_test_scale_left.reset()
    psychoJS.experiment.addData('merge_test_res.text',merge_test_res.text)
    merge_test_res.reset()
    // store data for thisExp (ExperimentHandler)
    _mouseXYs = merge_test_mouse.getPos();
    _mouseButtons = merge_test_mouse.getPressed();
    psychoJS.experiment.addData('merge_test_mouse.x', _mouseXYs[0]);
    psychoJS.experiment.addData('merge_test_mouse.y', _mouseXYs[1]);
    psychoJS.experiment.addData('merge_test_mouse.leftButton', _mouseButtons[0]);
    psychoJS.experiment.addData('merge_test_mouse.midButton', _mouseButtons[1]);
    psychoJS.experiment.addData('merge_test_mouse.rightButton', _mouseButtons[2]);
    if (merge_test_mouse.clicked_name.length > 0) {
      psychoJS.experiment.addData('merge_test_mouse.clicked_name', merge_test_mouse.clicked_name[0]);}
    return Scheduler.Event.NEXT;
  };
}


var SORT_INTROComponents;
function SORT_INTRORoutineBegin(snapshot) {
  return function () {
    //------Prepare to start Routine 'SORT_INTRO'-------
    t = 0;
    SORT_INTROClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(120.000000);
    // update component parameters for each repeat
    // setup some python lists for storing info about the sort_intro_mouse
    sort_intro_mouse.clicked_name = [];
    gotValidClick = false; // until a click is received
    // keep track of which components have finished
    SORT_INTROComponents = [];
    SORT_INTROComponents.push(intro_text_3);
    SORT_INTROComponents.push(bob_2);
    SORT_INTROComponents.push(sort_example);
    SORT_INTROComponents.push(door_4);
    SORT_INTROComponents.push(sort_intro_btn);
    SORT_INTROComponents.push(sort_intro_mouse);
    
    for (const thisComponent of SORT_INTROComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function SORT_INTRORoutineEachFrame(snapshot) {
  return function () {
    //------Loop for each frame of Routine 'SORT_INTRO'-------
    // get current time
    t = SORT_INTROClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *intro_text_3* updates
    if (t >= 0.0 && intro_text_3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      intro_text_3.tStart = t;  // (not accounting for frame time here)
      intro_text_3.frameNStart = frameN;  // exact frame index
      
      intro_text_3.setAutoDraw(true);
    }

    frameRemains = 0.0 + 120.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (intro_text_3.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      intro_text_3.setAutoDraw(false);
    }
    
    // *bob_2* updates
    if (t >= 0.0 && bob_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      bob_2.tStart = t;  // (not accounting for frame time here)
      bob_2.frameNStart = frameN;  // exact frame index
      
      bob_2.setAutoDraw(true);
    }

    frameRemains = 0.0 + 120.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (bob_2.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      bob_2.setAutoDraw(false);
    }
    
    // *sort_example* updates
    if (t >= 0.0 && sort_example.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_example.tStart = t;  // (not accounting for frame time here)
      sort_example.frameNStart = frameN;  // exact frame index
      
      sort_example.setAutoDraw(true);
    }

    frameRemains = 0.0 + 120.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (sort_example.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      sort_example.setAutoDraw(false);
    }
    
    // *door_4* updates
    if (t >= 0.0 && door_4.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      door_4.tStart = t;  // (not accounting for frame time here)
      door_4.frameNStart = frameN;  // exact frame index
      
      door_4.setAutoDraw(true);
    }

    frameRemains = 0.0 + 120.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (door_4.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      door_4.setAutoDraw(false);
    }
    
    // *sort_intro_btn* updates
    if (t >= 0.5 && sort_intro_btn.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_intro_btn.tStart = t;  // (not accounting for frame time here)
      sort_intro_btn.frameNStart = frameN;  // exact frame index
      
      sort_intro_btn.setAutoDraw(true);
    }

    frameRemains = 120.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((sort_intro_btn.status === PsychoJS.Status.STARTED || sort_intro_btn.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      sort_intro_btn.setAutoDraw(false);
    }
    // *sort_intro_mouse* updates
    if (t >= 0.5 && sort_intro_mouse.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_intro_mouse.tStart = t;  // (not accounting for frame time here)
      sort_intro_mouse.frameNStart = frameN;  // exact frame index
      
      sort_intro_mouse.status = PsychoJS.Status.STARTED;
      sort_intro_mouse.mouseClock.reset();
      prevButtonState = sort_intro_mouse.getPressed();  // if button is down already this ISN'T a new click
      }
    frameRemains = 120.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((sort_intro_mouse.status === PsychoJS.Status.STARTED || sort_intro_mouse.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      sort_intro_mouse.status = PsychoJS.Status.FINISHED;
  }
    if (sort_intro_mouse.status === PsychoJS.Status.STARTED) {  // only update if started and not finished!
      _mouseButtons = sort_intro_mouse.getPressed();
      if (!_mouseButtons.every( (e,i,) => (e == prevButtonState[i]) )) { // button state changed?
        prevButtonState = _mouseButtons;
        if (_mouseButtons.reduce( (e, acc) => (e+acc) ) > 0) { // state changed to a new click
          // check if the mouse was inside our 'clickable' objects
          gotValidClick = false;
          for (const obj of [[sort_intro_btn]]) {
            if (obj.contains(sort_intro_mouse)) {
              gotValidClick = true;
              sort_intro_mouse.clicked_name.push(obj.name)
            }
          }
          if (gotValidClick === true) { // abort routine on response
            continueRoutine = false;
          }
        }
      }
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
    for (const thisComponent of SORT_INTROComponents)
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


function SORT_INTRORoutineEnd(snapshot) {
  return function () {
    //------Ending Routine 'SORT_INTRO'-------
    for (const thisComponent of SORT_INTROComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // store data for thisExp (ExperimentHandler)
    _mouseXYs = sort_intro_mouse.getPos();
    _mouseButtons = sort_intro_mouse.getPressed();
    psychoJS.experiment.addData('sort_intro_mouse.x', _mouseXYs[0]);
    psychoJS.experiment.addData('sort_intro_mouse.y', _mouseXYs[1]);
    psychoJS.experiment.addData('sort_intro_mouse.leftButton', _mouseButtons[0]);
    psychoJS.experiment.addData('sort_intro_mouse.midButton', _mouseButtons[1]);
    psychoJS.experiment.addData('sort_intro_mouse.rightButton', _mouseButtons[2]);
    if (sort_intro_mouse.clicked_name.length > 0) {
      psychoJS.experiment.addData('sort_intro_mouse.clicked_name', sort_intro_mouse.clicked_name[0]);}
    return Scheduler.Event.NEXT;
  };
}


var items;
var frameCnt;
var tracePos;
var movingItem;
var top;
var bot;
var left;
var right;
var SORT_TRAINComponents;
function SORT_TRAINRoutineBegin(snapshot) {
  return function () {
    //------Prepare to start Routine 'SORT_TRAIN'-------
    t = 0;
    SORT_TRAINClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(240.000000);
    // update component parameters for each repeat
    sort_train_scale_instr.setColor(new util.Color('white'));
    sort_train_scale_instr.setText('COMPARE weights by typing fruit labels in both LHS and RHS  textboxes');
    sort_train_board.setImage('materials/merge_sort/imgs/purple_diamond.png');
    sort_train_scale.setImage(scaleEqPath);
    sort_train_ex_1.setPos([(- 0.25), 0.3]);
    sort_train_ex_2.setPos([(- 0.2), 0.3]);
    sort_train_ex_3.setPos([(- 0.15), 0.3]);
    sort_train_ex_4.setPos([(- 0.1), 0.3]);
    sort_train_ex_5.setPos([(- 0.05), 0.3]);
    sort_train_ex_6.setPos([0.0, 0.3]);
    sort_train_ex_7.setPos([0.05, 0.3]);
    sort_train_ex_8.setPos([0.1, 0.3]);
    sort_train_ex_9.setPos([0.15, 0.3]);
    sort_train_ex_10.setPos([0.2, 0.3]);
    sort_train_ex_11.setPos([0.25, 0.3]);
    sort_train_ex_12.setPos([0.3, 0.3]);
    // setup some python lists for storing info about the sort_train_mouse
    sort_train_mouse.clicked_name = [];
    gotValidClick = false; // until a click is received
    sort_train_hint.setText('');
    items = [];
    frameCnt = 0;
    tracePos = [];
    sort_train_hint.text = ((("Bob uses " + sort_train_compare_limit.toString()) + " comparisons\n") + "You have used: 0");
    movingItem = null;
    [x, y] = sort_train_board.pos;
    [w, h] = sort_train_board.size;
    top = (y + (h / 2));
    bot = (y - (h / 2));
    left = (x - (w / 2));
    right = (x + (w / 2));
    
    // keep track of which components have finished
    SORT_TRAINComponents = [];
    SORT_TRAINComponents.push(sort_train_scale_instr);
    SORT_TRAINComponents.push(sort_train_ans_instr);
    SORT_TRAINComponents.push(sort_train_instr);
    SORT_TRAINComponents.push(sort_train_scale_right);
    SORT_TRAINComponents.push(sort_train_scale_left);
    SORT_TRAINComponents.push(sort_train_compare);
    SORT_TRAINComponents.push(sort_train_res);
    SORT_TRAINComponents.push(sort_train_sep);
    SORT_TRAINComponents.push(sort_train_board);
    SORT_TRAINComponents.push(sort_train_scale);
    SORT_TRAINComponents.push(sort_train_ex_1);
    SORT_TRAINComponents.push(sort_train_ex_2);
    SORT_TRAINComponents.push(sort_train_ex_3);
    SORT_TRAINComponents.push(sort_train_ex_4);
    SORT_TRAINComponents.push(sort_train_ex_5);
    SORT_TRAINComponents.push(sort_train_ex_6);
    SORT_TRAINComponents.push(sort_train_ex_7);
    SORT_TRAINComponents.push(sort_train_ex_8);
    SORT_TRAINComponents.push(sort_train_ex_9);
    SORT_TRAINComponents.push(sort_train_ex_10);
    SORT_TRAINComponents.push(sort_train_ex_11);
    SORT_TRAINComponents.push(sort_train_ex_12);
    SORT_TRAINComponents.push(sort_train_btn);
    SORT_TRAINComponents.push(sort_train_mouse);
    SORT_TRAINComponents.push(sort_train_timer);
    SORT_TRAINComponents.push(sort_train_hint);
    
    for (const thisComponent of SORT_TRAINComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


var newTracePos;
var hasMoved;
var sort_train_compareN;
var sort_train_ans;
function SORT_TRAINRoutineEachFrame(snapshot) {
  return function () {
    //------Loop for each frame of Routine 'SORT_TRAIN'-------
    // get current time
    t = SORT_TRAINClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *sort_train_scale_instr* updates
    if (t >= 0.0 && sort_train_scale_instr.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_train_scale_instr.tStart = t;  // (not accounting for frame time here)
      sort_train_scale_instr.frameNStart = frameN;  // exact frame index
      
      sort_train_scale_instr.setAutoDraw(true);
    }

    frameRemains = 0.0 + 240.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (sort_train_scale_instr.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      sort_train_scale_instr.setAutoDraw(false);
    }
    
    // *sort_train_ans_instr* updates
    if (t >= 0.0 && sort_train_ans_instr.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_train_ans_instr.tStart = t;  // (not accounting for frame time here)
      sort_train_ans_instr.frameNStart = frameN;  // exact frame index
      
      sort_train_ans_instr.setAutoDraw(true);
    }

    frameRemains = 0.0 + 240.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (sort_train_ans_instr.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      sort_train_ans_instr.setAutoDraw(false);
    }
    
    // *sort_train_instr* updates
    if (t >= 0.0 && sort_train_instr.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_train_instr.tStart = t;  // (not accounting for frame time here)
      sort_train_instr.frameNStart = frameN;  // exact frame index
      
      sort_train_instr.setAutoDraw(true);
    }

    frameRemains = 0.0 + 240.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (sort_train_instr.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      sort_train_instr.setAutoDraw(false);
    }
    
    // *sort_train_scale_right* updates
    if (t >= 0.0 && sort_train_scale_right.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_train_scale_right.tStart = t;  // (not accounting for frame time here)
      sort_train_scale_right.frameNStart = frameN;  // exact frame index
      
      sort_train_scale_right.setAutoDraw(true);
    }

    frameRemains = 0.0 + 240.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (sort_train_scale_right.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      sort_train_scale_right.setAutoDraw(false);
    }
    
    // *sort_train_scale_left* updates
    if (t >= 0.0 && sort_train_scale_left.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_train_scale_left.tStart = t;  // (not accounting for frame time here)
      sort_train_scale_left.frameNStart = frameN;  // exact frame index
      
      sort_train_scale_left.setAutoDraw(true);
    }

    frameRemains = 0.0 + 240.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (sort_train_scale_left.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      sort_train_scale_left.setAutoDraw(false);
    }
    
    // *sort_train_compare* updates
    if (t >= 0.0 && sort_train_compare.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_train_compare.tStart = t;  // (not accounting for frame time here)
      sort_train_compare.frameNStart = frameN;  // exact frame index
      
      sort_train_compare.setAutoDraw(true);
    }

    frameRemains = 0.0 + 240.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (sort_train_compare.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      sort_train_compare.setAutoDraw(false);
    }
    
    // *sort_train_res* updates
    if (t >= 0.0 && sort_train_res.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_train_res.tStart = t;  // (not accounting for frame time here)
      sort_train_res.frameNStart = frameN;  // exact frame index
      
      sort_train_res.setAutoDraw(true);
    }

    frameRemains = 0.0 + 240.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (sort_train_res.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      sort_train_res.setAutoDraw(false);
    }
    
    // *sort_train_sep* updates
    if (t >= 0.0 && sort_train_sep.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_train_sep.tStart = t;  // (not accounting for frame time here)
      sort_train_sep.frameNStart = frameN;  // exact frame index
      
      sort_train_sep.setAutoDraw(true);
    }

    frameRemains = 0.0 + 240.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (sort_train_sep.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      sort_train_sep.setAutoDraw(false);
    }
    
    // *sort_train_board* updates
    if (t >= 0.0 && sort_train_board.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_train_board.tStart = t;  // (not accounting for frame time here)
      sort_train_board.frameNStart = frameN;  // exact frame index
      
      sort_train_board.setAutoDraw(true);
    }

    frameRemains = 0.0 + 240.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (sort_train_board.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      sort_train_board.setAutoDraw(false);
    }
    
    // *sort_train_scale* updates
    if (t >= 0.0 && sort_train_scale.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_train_scale.tStart = t;  // (not accounting for frame time here)
      sort_train_scale.frameNStart = frameN;  // exact frame index
      
      sort_train_scale.setAutoDraw(true);
    }

    frameRemains = 0.0 + 240.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (sort_train_scale.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      sort_train_scale.setAutoDraw(false);
    }
    
    // *sort_train_ex_1* updates
    if (t >= 0.0 && sort_train_ex_1.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_train_ex_1.tStart = t;  // (not accounting for frame time here)
      sort_train_ex_1.frameNStart = frameN;  // exact frame index
      
      sort_train_ex_1.setAutoDraw(true);
    }

    frameRemains = 0.0 + 240.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (sort_train_ex_1.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      sort_train_ex_1.setAutoDraw(false);
    }
    
    // *sort_train_ex_2* updates
    if (t >= 0.0 && sort_train_ex_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_train_ex_2.tStart = t;  // (not accounting for frame time here)
      sort_train_ex_2.frameNStart = frameN;  // exact frame index
      
      sort_train_ex_2.setAutoDraw(true);
    }

    frameRemains = 0.0 + 240.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (sort_train_ex_2.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      sort_train_ex_2.setAutoDraw(false);
    }
    
    // *sort_train_ex_3* updates
    if (t >= 0.0 && sort_train_ex_3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_train_ex_3.tStart = t;  // (not accounting for frame time here)
      sort_train_ex_3.frameNStart = frameN;  // exact frame index
      
      sort_train_ex_3.setAutoDraw(true);
    }

    frameRemains = 0.0 + 240.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (sort_train_ex_3.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      sort_train_ex_3.setAutoDraw(false);
    }
    
    // *sort_train_ex_4* updates
    if (t >= 0.0 && sort_train_ex_4.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_train_ex_4.tStart = t;  // (not accounting for frame time here)
      sort_train_ex_4.frameNStart = frameN;  // exact frame index
      
      sort_train_ex_4.setAutoDraw(true);
    }

    frameRemains = 0.0 + 240.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (sort_train_ex_4.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      sort_train_ex_4.setAutoDraw(false);
    }
    
    // *sort_train_ex_5* updates
    if (t >= 0.0 && sort_train_ex_5.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_train_ex_5.tStart = t;  // (not accounting for frame time here)
      sort_train_ex_5.frameNStart = frameN;  // exact frame index
      
      sort_train_ex_5.setAutoDraw(true);
    }

    frameRemains = 0.0 + 240.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (sort_train_ex_5.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      sort_train_ex_5.setAutoDraw(false);
    }
    
    // *sort_train_ex_6* updates
    if (t >= 0.0 && sort_train_ex_6.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_train_ex_6.tStart = t;  // (not accounting for frame time here)
      sort_train_ex_6.frameNStart = frameN;  // exact frame index
      
      sort_train_ex_6.setAutoDraw(true);
    }

    frameRemains = 0.0 + 240.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (sort_train_ex_6.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      sort_train_ex_6.setAutoDraw(false);
    }
    
    // *sort_train_ex_7* updates
    if (t >= 0.0 && sort_train_ex_7.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_train_ex_7.tStart = t;  // (not accounting for frame time here)
      sort_train_ex_7.frameNStart = frameN;  // exact frame index
      
      sort_train_ex_7.setAutoDraw(true);
    }

    frameRemains = 0.0 + 240.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (sort_train_ex_7.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      sort_train_ex_7.setAutoDraw(false);
    }
    
    // *sort_train_ex_8* updates
    if (t >= 0.0 && sort_train_ex_8.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_train_ex_8.tStart = t;  // (not accounting for frame time here)
      sort_train_ex_8.frameNStart = frameN;  // exact frame index
      
      sort_train_ex_8.setAutoDraw(true);
    }

    frameRemains = 0.0 + 240.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (sort_train_ex_8.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      sort_train_ex_8.setAutoDraw(false);
    }
    
    // *sort_train_ex_9* updates
    if (t >= 0.0 && sort_train_ex_9.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_train_ex_9.tStart = t;  // (not accounting for frame time here)
      sort_train_ex_9.frameNStart = frameN;  // exact frame index
      
      sort_train_ex_9.setAutoDraw(true);
    }

    frameRemains = 0.0 + 240.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (sort_train_ex_9.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      sort_train_ex_9.setAutoDraw(false);
    }
    
    // *sort_train_ex_10* updates
    if (t >= 0.0 && sort_train_ex_10.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_train_ex_10.tStart = t;  // (not accounting for frame time here)
      sort_train_ex_10.frameNStart = frameN;  // exact frame index
      
      sort_train_ex_10.setAutoDraw(true);
    }

    frameRemains = 0.0 + 240.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (sort_train_ex_10.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      sort_train_ex_10.setAutoDraw(false);
    }
    
    // *sort_train_ex_11* updates
    if (t >= 0.0 && sort_train_ex_11.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_train_ex_11.tStart = t;  // (not accounting for frame time here)
      sort_train_ex_11.frameNStart = frameN;  // exact frame index
      
      sort_train_ex_11.setAutoDraw(true);
    }

    frameRemains = 0.0 + 240.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (sort_train_ex_11.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      sort_train_ex_11.setAutoDraw(false);
    }
    
    // *sort_train_ex_12* updates
    if (t >= 0.0 && sort_train_ex_12.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_train_ex_12.tStart = t;  // (not accounting for frame time here)
      sort_train_ex_12.frameNStart = frameN;  // exact frame index
      
      sort_train_ex_12.setAutoDraw(true);
    }

    frameRemains = 0.0 + 240.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (sort_train_ex_12.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      sort_train_ex_12.setAutoDraw(false);
    }
    
    // *sort_train_btn* updates
    if (t >= 0.5 && sort_train_btn.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_train_btn.tStart = t;  // (not accounting for frame time here)
      sort_train_btn.frameNStart = frameN;  // exact frame index
      
      sort_train_btn.setAutoDraw(true);
    }

    frameRemains = 240.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((sort_train_btn.status === PsychoJS.Status.STARTED || sort_train_btn.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      sort_train_btn.setAutoDraw(false);
    }
    // *sort_train_mouse* updates
    if (t >= 0.5 && sort_train_mouse.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_train_mouse.tStart = t;  // (not accounting for frame time here)
      sort_train_mouse.frameNStart = frameN;  // exact frame index
      
      sort_train_mouse.status = PsychoJS.Status.STARTED;
      sort_train_mouse.mouseClock.reset();
      prevButtonState = sort_train_mouse.getPressed();  // if button is down already this ISN'T a new click
      }
    frameRemains = 240.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((sort_train_mouse.status === PsychoJS.Status.STARTED || sort_train_mouse.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      sort_train_mouse.status = PsychoJS.Status.FINISHED;
  }
    if (sort_train_mouse.status === PsychoJS.Status.STARTED) {  // only update if started and not finished!
      _mouseButtons = sort_train_mouse.getPressed();
      if (!_mouseButtons.every( (e,i,) => (e == prevButtonState[i]) )) { // button state changed?
        prevButtonState = _mouseButtons;
        if (_mouseButtons.reduce( (e, acc) => (e+acc) ) > 0) { // state changed to a new click
          // check if the mouse was inside our 'clickable' objects
          gotValidClick = false;
          for (const obj of [[sort_train_btn]]) {
            if (obj.contains(sort_train_mouse)) {
              gotValidClick = true;
              sort_train_mouse.clicked_name.push(obj.name)
            }
          }
          if (gotValidClick === true) { // abort routine on response
            continueRoutine = false;
          }
        }
      }
    }
    
    // *sort_train_timer* updates
    if (t >= 0.0 && sort_train_timer.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_train_timer.tStart = t;  // (not accounting for frame time here)
      sort_train_timer.frameNStart = frameN;  // exact frame index
      
      sort_train_timer.setAutoDraw(true);
    }

    frameRemains = 240.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((sort_train_timer.status === PsychoJS.Status.STARTED || sort_train_timer.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      sort_train_timer.setAutoDraw(false);
    }
    
    // *sort_train_hint* updates
    if (t >= 0.0 && sort_train_hint.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_train_hint.tStart = t;  // (not accounting for frame time here)
      sort_train_hint.frameNStart = frameN;  // exact frame index
      
      sort_train_hint.setAutoDraw(true);
    }

    frameRemains = 240.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((sort_train_hint.status === PsychoJS.Status.STARTED || sort_train_hint.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      sort_train_hint.setAutoDraw(false);
    }
    frameCnt = (frameCnt + 1);
    if ((items === [])) {
        items = enableImageComponents(SORT_TRAINComponents, sort_train_labels, sort_train_path_base);
    }
    movingItem = moveItem(sort_train_mouse, movingItem);
    if (((frameCnt % traceSaveAtFrame) === 0)) {
        newTracePos = [];
        for (var i, _pj_c = 0, _pj_a = items, _pj_b = _pj_a.length; (_pj_c < _pj_b); _pj_c += 1) {
            i = _pj_a[_pj_c];
            newTracePos.append([i.name.split("_").slice((- 1))[0], i.pos[0], i.pos[1]]);
        }
        hasMoved = updateTrace(tracePos, newTracePos);
        if ((hasMoved !== [])) {
            for (var j, _pj_c = 0, _pj_a = hasMoved, _pj_b = _pj_a.length; (_pj_c < _pj_b); _pj_c += 1) {
                j = _pj_a[_pj_c];
                sort_train_trace.append(j);
            }
        }
        tracePos = newTracePos;
    }
    if (sort_train_mouse.isPressedIn(sort_train_compare)) {
        sort_train_compareN = (sort_train_compareN + compare(sort_train_scale, sort_train_input, sort_train_labels, sort_train_scale_instr, sort_train_scale_left, sort_train_scale_right));
        sort_train_hint.text = (((("Bob uses " + sort_train_compare_limit.toString()) + " comparisons\n") + "You have used: ") + sort_train_compareN.toString());
    }
    sort_train_ans = sort_train_res.text;
    sort_train_timer.text = timerWarning(sortTrainTimeL, t);
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of SORT_TRAINComponents)
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


function SORT_TRAINRoutineEnd(snapshot) {
  return function () {
    //------Ending Routine 'SORT_TRAIN'-------
    for (const thisComponent of SORT_TRAINComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('sort_train_scale_right.text',sort_train_scale_right.text)
    sort_train_scale_right.reset()
    psychoJS.experiment.addData('sort_train_scale_left.text',sort_train_scale_left.text)
    sort_train_scale_left.reset()
    psychoJS.experiment.addData('sort_train_res.text',sort_train_res.text)
    sort_train_res.reset()
    // store data for thisExp (ExperimentHandler)
    _mouseXYs = sort_train_mouse.getPos();
    _mouseButtons = sort_train_mouse.getPressed();
    psychoJS.experiment.addData('sort_train_mouse.x', _mouseXYs[0]);
    psychoJS.experiment.addData('sort_train_mouse.y', _mouseXYs[1]);
    psychoJS.experiment.addData('sort_train_mouse.leftButton', _mouseButtons[0]);
    psychoJS.experiment.addData('sort_train_mouse.midButton', _mouseButtons[1]);
    psychoJS.experiment.addData('sort_train_mouse.rightButton', _mouseButtons[2]);
    if (sort_train_mouse.clicked_name.length > 0) {
      psychoJS.experiment.addData('sort_train_mouse.clicked_name', sort_train_mouse.clicked_name[0]);}
    return Scheduler.Event.NEXT;
  };
}


var positions;
var SORT_EXPLComponents;
function SORT_EXPLRoutineBegin(snapshot) {
  return function () {
    //------Prepare to start Routine 'SORT_EXPL'-------
    t = 0;
    SORT_EXPLClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(60.000000);
    // update component parameters for each repeat
    sort_expl_scale_instr.setColor(new util.Color('white'));
    sort_expl_scale_instr.setText('COMPARE weights by typing fruit labels in both LHS and RHS  textboxes');
    sort_expl_feedback_1.setColor(new util.Color('white'));
    sort_expl_feedback_1.setText('');
    sort_expl_feedback_2.setColor(new util.Color('white'));
    sort_expl_feedback_2.setText('');
    sort_expl_res.setText('');
    sort_expl_board.setImage('materials/merge_sort/imgs/purple_diamond.png');
    sort_expl_scale.setImage(scaleEqPath);
    sort_expl_ex_1.setPos([(- 0.25), 0.3]);
    sort_expl_ex_2.setPos([(- 0.2), 0.3]);
    sort_expl_ex_3.setPos([(- 0.15), 0.3]);
    sort_expl_ex_4.setPos([(- 0.1), 0.3]);
    sort_expl_ex_5.setPos([(- 0.05), 0.3]);
    sort_expl_ex_6.setPos([0.0, 0.3]);
    sort_expl_ex_7.setPos([0.05, 0.3]);
    sort_expl_ex_8.setPos([0.1, 0.3]);
    sort_expl_ex_9.setPos([0.15, 0.3]);
    sort_expl_ex_10.setPos([0.2, 0.3]);
    sort_expl_ex_11.setPos([0.25, 0.3]);
    sort_expl_ex_12.setPos([0.3, 0.3]);
    // setup some python lists for storing info about the sort_expl_mouse
    sort_expl_mouse.clicked_name = [];
    gotValidClick = false; // until a click is received
    sort_expl_hint.setText('');
    positions = [];
    for (var u, _pj_c = 0, _pj_a = items, _pj_b = _pj_a.length; (_pj_c < _pj_b); _pj_c += 1) {
        u = _pj_a[_pj_c];
        positions.append(u.pos);
    }
    items = [];
    frameCnt = 0;
    tracePos = [];
    movingItem = null;
    sort_expl_hint.text = (((("Bob uses " + sort_train_compare_limit.toString()) + " comparisons\n") + "You have used: ") + (sort_train_compareN + sort_expl_compareN).toString());
    sort_expl_res.text = sort_train_ans;
    checkSortTrainAns(sort_expl_input, sort_expl_labels, sort_expl_res.text, sort_expl_feedback_1, sort_expl_feedback_2);
    [x, y] = sort_expl_board.pos;
    [w, h] = sort_expl_board.size;
    top = (y + (h / 2));
    bot = (y - (h / 2));
    left = (x - (w / 2));
    right = (x + (w / 2));
    
    // keep track of which components have finished
    SORT_EXPLComponents = [];
    SORT_EXPLComponents.push(sort_expl_scale_instr);
    SORT_EXPLComponents.push(sort_expl_feedback_1);
    SORT_EXPLComponents.push(sort_expl_feedback_2);
    SORT_EXPLComponents.push(sort_expl_instr);
    SORT_EXPLComponents.push(sort_expl_scale_right);
    SORT_EXPLComponents.push(sort_expl_scale_left);
    SORT_EXPLComponents.push(sort_expl_compare);
    SORT_EXPLComponents.push(sort_expl_res);
    SORT_EXPLComponents.push(sort_expl_sep);
    SORT_EXPLComponents.push(sort_expl_board);
    SORT_EXPLComponents.push(sort_expl_scale);
    SORT_EXPLComponents.push(sort_expl_ex_1);
    SORT_EXPLComponents.push(sort_expl_ex_2);
    SORT_EXPLComponents.push(sort_expl_ex_3);
    SORT_EXPLComponents.push(sort_expl_ex_4);
    SORT_EXPLComponents.push(sort_expl_ex_5);
    SORT_EXPLComponents.push(sort_expl_ex_6);
    SORT_EXPLComponents.push(sort_expl_ex_7);
    SORT_EXPLComponents.push(sort_expl_ex_8);
    SORT_EXPLComponents.push(sort_expl_ex_9);
    SORT_EXPLComponents.push(sort_expl_ex_10);
    SORT_EXPLComponents.push(sort_expl_ex_11);
    SORT_EXPLComponents.push(sort_expl_ex_12);
    SORT_EXPLComponents.push(sort_expl_btn);
    SORT_EXPLComponents.push(sort_expl_mouse);
    SORT_EXPLComponents.push(sort_expl_timer);
    SORT_EXPLComponents.push(sort_expl_hint);
    
    for (const thisComponent of SORT_EXPLComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


var sort_expl_compareN;
function SORT_EXPLRoutineEachFrame(snapshot) {
  return function () {
    //------Loop for each frame of Routine 'SORT_EXPL'-------
    // get current time
    t = SORT_EXPLClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *sort_expl_scale_instr* updates
    if (t >= 0.0 && sort_expl_scale_instr.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_expl_scale_instr.tStart = t;  // (not accounting for frame time here)
      sort_expl_scale_instr.frameNStart = frameN;  // exact frame index
      
      sort_expl_scale_instr.setAutoDraw(true);
    }

    frameRemains = 0.0 + 60.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (sort_expl_scale_instr.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      sort_expl_scale_instr.setAutoDraw(false);
    }
    
    // *sort_expl_feedback_1* updates
    if (t >= 0.0 && sort_expl_feedback_1.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_expl_feedback_1.tStart = t;  // (not accounting for frame time here)
      sort_expl_feedback_1.frameNStart = frameN;  // exact frame index
      
      sort_expl_feedback_1.setAutoDraw(true);
    }

    frameRemains = 0.0 + 60.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (sort_expl_feedback_1.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      sort_expl_feedback_1.setAutoDraw(false);
    }
    
    // *sort_expl_feedback_2* updates
    if (t >= 0.0 && sort_expl_feedback_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_expl_feedback_2.tStart = t;  // (not accounting for frame time here)
      sort_expl_feedback_2.frameNStart = frameN;  // exact frame index
      
      sort_expl_feedback_2.setAutoDraw(true);
    }

    frameRemains = 0.0 + 60.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (sort_expl_feedback_2.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      sort_expl_feedback_2.setAutoDraw(false);
    }
    
    // *sort_expl_instr* updates
    if (t >= 0.0 && sort_expl_instr.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_expl_instr.tStart = t;  // (not accounting for frame time here)
      sort_expl_instr.frameNStart = frameN;  // exact frame index
      
      sort_expl_instr.setAutoDraw(true);
    }

    frameRemains = 0.0 + 60.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (sort_expl_instr.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      sort_expl_instr.setAutoDraw(false);
    }
    
    // *sort_expl_scale_right* updates
    if (t >= 0.0 && sort_expl_scale_right.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_expl_scale_right.tStart = t;  // (not accounting for frame time here)
      sort_expl_scale_right.frameNStart = frameN;  // exact frame index
      
      sort_expl_scale_right.setAutoDraw(true);
    }

    frameRemains = 0.0 + 60.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (sort_expl_scale_right.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      sort_expl_scale_right.setAutoDraw(false);
    }
    
    // *sort_expl_scale_left* updates
    if (t >= 0.0 && sort_expl_scale_left.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_expl_scale_left.tStart = t;  // (not accounting for frame time here)
      sort_expl_scale_left.frameNStart = frameN;  // exact frame index
      
      sort_expl_scale_left.setAutoDraw(true);
    }

    frameRemains = 0.0 + 60.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (sort_expl_scale_left.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      sort_expl_scale_left.setAutoDraw(false);
    }
    
    // *sort_expl_compare* updates
    if (t >= 0.0 && sort_expl_compare.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_expl_compare.tStart = t;  // (not accounting for frame time here)
      sort_expl_compare.frameNStart = frameN;  // exact frame index
      
      sort_expl_compare.setAutoDraw(true);
    }

    frameRemains = 0.0 + 60.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (sort_expl_compare.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      sort_expl_compare.setAutoDraw(false);
    }
    
    // *sort_expl_res* updates
    if (t >= 0.0 && sort_expl_res.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_expl_res.tStart = t;  // (not accounting for frame time here)
      sort_expl_res.frameNStart = frameN;  // exact frame index
      
      sort_expl_res.setAutoDraw(true);
    }

    frameRemains = 0.0 + 60.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (sort_expl_res.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      sort_expl_res.setAutoDraw(false);
    }
    
    // *sort_expl_sep* updates
    if (t >= 0.0 && sort_expl_sep.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_expl_sep.tStart = t;  // (not accounting for frame time here)
      sort_expl_sep.frameNStart = frameN;  // exact frame index
      
      sort_expl_sep.setAutoDraw(true);
    }

    frameRemains = 0.0 + 60.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (sort_expl_sep.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      sort_expl_sep.setAutoDraw(false);
    }
    
    // *sort_expl_board* updates
    if (t >= 0.0 && sort_expl_board.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_expl_board.tStart = t;  // (not accounting for frame time here)
      sort_expl_board.frameNStart = frameN;  // exact frame index
      
      sort_expl_board.setAutoDraw(true);
    }

    frameRemains = 0.0 + 60.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (sort_expl_board.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      sort_expl_board.setAutoDraw(false);
    }
    
    // *sort_expl_scale* updates
    if (t >= 0.0 && sort_expl_scale.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_expl_scale.tStart = t;  // (not accounting for frame time here)
      sort_expl_scale.frameNStart = frameN;  // exact frame index
      
      sort_expl_scale.setAutoDraw(true);
    }

    frameRemains = 0.0 + 60.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (sort_expl_scale.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      sort_expl_scale.setAutoDraw(false);
    }
    
    // *sort_expl_ex_1* updates
    if (t >= 0.0 && sort_expl_ex_1.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_expl_ex_1.tStart = t;  // (not accounting for frame time here)
      sort_expl_ex_1.frameNStart = frameN;  // exact frame index
      
      sort_expl_ex_1.setAutoDraw(true);
    }

    frameRemains = 0.0 + 60.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (sort_expl_ex_1.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      sort_expl_ex_1.setAutoDraw(false);
    }
    
    // *sort_expl_ex_2* updates
    if (t >= 0.0 && sort_expl_ex_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_expl_ex_2.tStart = t;  // (not accounting for frame time here)
      sort_expl_ex_2.frameNStart = frameN;  // exact frame index
      
      sort_expl_ex_2.setAutoDraw(true);
    }

    frameRemains = 0.0 + 60.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (sort_expl_ex_2.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      sort_expl_ex_2.setAutoDraw(false);
    }
    
    // *sort_expl_ex_3* updates
    if (t >= 0.0 && sort_expl_ex_3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_expl_ex_3.tStart = t;  // (not accounting for frame time here)
      sort_expl_ex_3.frameNStart = frameN;  // exact frame index
      
      sort_expl_ex_3.setAutoDraw(true);
    }

    frameRemains = 0.0 + 60.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (sort_expl_ex_3.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      sort_expl_ex_3.setAutoDraw(false);
    }
    
    // *sort_expl_ex_4* updates
    if (t >= 0.0 && sort_expl_ex_4.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_expl_ex_4.tStart = t;  // (not accounting for frame time here)
      sort_expl_ex_4.frameNStart = frameN;  // exact frame index
      
      sort_expl_ex_4.setAutoDraw(true);
    }

    frameRemains = 0.0 + 60.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (sort_expl_ex_4.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      sort_expl_ex_4.setAutoDraw(false);
    }
    
    // *sort_expl_ex_5* updates
    if (t >= 0.0 && sort_expl_ex_5.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_expl_ex_5.tStart = t;  // (not accounting for frame time here)
      sort_expl_ex_5.frameNStart = frameN;  // exact frame index
      
      sort_expl_ex_5.setAutoDraw(true);
    }

    frameRemains = 0.0 + 60.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (sort_expl_ex_5.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      sort_expl_ex_5.setAutoDraw(false);
    }
    
    // *sort_expl_ex_6* updates
    if (t >= 0.0 && sort_expl_ex_6.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_expl_ex_6.tStart = t;  // (not accounting for frame time here)
      sort_expl_ex_6.frameNStart = frameN;  // exact frame index
      
      sort_expl_ex_6.setAutoDraw(true);
    }

    frameRemains = 0.0 + 60.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (sort_expl_ex_6.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      sort_expl_ex_6.setAutoDraw(false);
    }
    
    // *sort_expl_ex_7* updates
    if (t >= 0.0 && sort_expl_ex_7.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_expl_ex_7.tStart = t;  // (not accounting for frame time here)
      sort_expl_ex_7.frameNStart = frameN;  // exact frame index
      
      sort_expl_ex_7.setAutoDraw(true);
    }

    frameRemains = 0.0 + 60.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (sort_expl_ex_7.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      sort_expl_ex_7.setAutoDraw(false);
    }
    
    // *sort_expl_ex_8* updates
    if (t >= 0.0 && sort_expl_ex_8.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_expl_ex_8.tStart = t;  // (not accounting for frame time here)
      sort_expl_ex_8.frameNStart = frameN;  // exact frame index
      
      sort_expl_ex_8.setAutoDraw(true);
    }

    frameRemains = 0.0 + 60.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (sort_expl_ex_8.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      sort_expl_ex_8.setAutoDraw(false);
    }
    
    // *sort_expl_ex_9* updates
    if (t >= 0.0 && sort_expl_ex_9.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_expl_ex_9.tStart = t;  // (not accounting for frame time here)
      sort_expl_ex_9.frameNStart = frameN;  // exact frame index
      
      sort_expl_ex_9.setAutoDraw(true);
    }

    frameRemains = 0.0 + 60.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (sort_expl_ex_9.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      sort_expl_ex_9.setAutoDraw(false);
    }
    
    // *sort_expl_ex_10* updates
    if (t >= 0.0 && sort_expl_ex_10.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_expl_ex_10.tStart = t;  // (not accounting for frame time here)
      sort_expl_ex_10.frameNStart = frameN;  // exact frame index
      
      sort_expl_ex_10.setAutoDraw(true);
    }

    frameRemains = 0.0 + 60.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (sort_expl_ex_10.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      sort_expl_ex_10.setAutoDraw(false);
    }
    
    // *sort_expl_ex_11* updates
    if (t >= 0.0 && sort_expl_ex_11.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_expl_ex_11.tStart = t;  // (not accounting for frame time here)
      sort_expl_ex_11.frameNStart = frameN;  // exact frame index
      
      sort_expl_ex_11.setAutoDraw(true);
    }

    frameRemains = 0.0 + 60.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (sort_expl_ex_11.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      sort_expl_ex_11.setAutoDraw(false);
    }
    
    // *sort_expl_ex_12* updates
    if (t >= 0.0 && sort_expl_ex_12.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_expl_ex_12.tStart = t;  // (not accounting for frame time here)
      sort_expl_ex_12.frameNStart = frameN;  // exact frame index
      
      sort_expl_ex_12.setAutoDraw(true);
    }

    frameRemains = 0.0 + 60.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (sort_expl_ex_12.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      sort_expl_ex_12.setAutoDraw(false);
    }
    
    // *sort_expl_btn* updates
    if (t >= 0.5 && sort_expl_btn.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_expl_btn.tStart = t;  // (not accounting for frame time here)
      sort_expl_btn.frameNStart = frameN;  // exact frame index
      
      sort_expl_btn.setAutoDraw(true);
    }

    frameRemains = 60.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((sort_expl_btn.status === PsychoJS.Status.STARTED || sort_expl_btn.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      sort_expl_btn.setAutoDraw(false);
    }
    // *sort_expl_mouse* updates
    if (t >= 0.5 && sort_expl_mouse.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_expl_mouse.tStart = t;  // (not accounting for frame time here)
      sort_expl_mouse.frameNStart = frameN;  // exact frame index
      
      sort_expl_mouse.status = PsychoJS.Status.STARTED;
      sort_expl_mouse.mouseClock.reset();
      prevButtonState = sort_expl_mouse.getPressed();  // if button is down already this ISN'T a new click
      }
    frameRemains = 60.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((sort_expl_mouse.status === PsychoJS.Status.STARTED || sort_expl_mouse.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      sort_expl_mouse.status = PsychoJS.Status.FINISHED;
  }
    if (sort_expl_mouse.status === PsychoJS.Status.STARTED) {  // only update if started and not finished!
      _mouseButtons = sort_expl_mouse.getPressed();
      if (!_mouseButtons.every( (e,i,) => (e == prevButtonState[i]) )) { // button state changed?
        prevButtonState = _mouseButtons;
        if (_mouseButtons.reduce( (e, acc) => (e+acc) ) > 0) { // state changed to a new click
          // check if the mouse was inside our 'clickable' objects
          gotValidClick = false;
          for (const obj of [[sort_expl_btn]]) {
            if (obj.contains(sort_expl_mouse)) {
              gotValidClick = true;
              sort_expl_mouse.clicked_name.push(obj.name)
            }
          }
          if (gotValidClick === true) { // abort routine on response
            continueRoutine = false;
          }
        }
      }
    }
    
    // *sort_expl_timer* updates
    if (t >= 0.0 && sort_expl_timer.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_expl_timer.tStart = t;  // (not accounting for frame time here)
      sort_expl_timer.frameNStart = frameN;  // exact frame index
      
      sort_expl_timer.setAutoDraw(true);
    }

    frameRemains = 60.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((sort_expl_timer.status === PsychoJS.Status.STARTED || sort_expl_timer.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      sort_expl_timer.setAutoDraw(false);
    }
    
    // *sort_expl_hint* updates
    if (t >= 0.0 && sort_expl_hint.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_expl_hint.tStart = t;  // (not accounting for frame time here)
      sort_expl_hint.frameNStart = frameN;  // exact frame index
      
      sort_expl_hint.setAutoDraw(true);
    }

    frameRemains = 60.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((sort_expl_hint.status === PsychoJS.Status.STARTED || sort_expl_hint.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      sort_expl_hint.setAutoDraw(false);
    }
    if ((items === [])) {
        items = enableImageComponents(SORT_EXPLComponents, sort_expl_labels, sort_expl_path_base);
        for (var i = 0, _pj_a = items.length; (i < _pj_a); i += 1) {
            items[i].pos = positions[i];
        }
    }
    movingItem = moveItem(sort_expl_mouse, movingItem);
    if (((frameCnt % traceSaveAtFrame) === 0)) {
        newTracePos = [];
        for (var i, _pj_c = 0, _pj_a = items, _pj_b = _pj_a.length; (_pj_c < _pj_b); _pj_c += 1) {
            i = _pj_a[_pj_c];
            newTracePos.append([i.name.split("_").slice((- 1))[0], i.pos[0], i.pos[1]]);
        }
        hasMoved = updateTrace(tracePos, newTracePos);
        if ((hasMoved !== [])) {
            for (var j, _pj_c = 0, _pj_a = hasMoved, _pj_b = _pj_a.length; (_pj_c < _pj_b); _pj_c += 1) {
                j = _pj_a[_pj_c];
                sort_expl_trace.append(j);
            }
        }
        tracePos = newTracePos;
    }
    if (sort_expl_mouse.isPressedIn(sort_expl_compare)) {
        sort_expl_compareN = (sort_expl_compareN + compare(sort_expl_scale, sort_expl_input, sort_expl_labels, sort_expl_scale_instr, sort_expl_scale_left, sort_expl_scale_right));
        sort_expl_hint.text = (((("Bob uses " + sort_train_compare_limit.toString()) + " comparisons\n") + "You have used: ") + (sort_train_compareN + sort_expl_compareN).toString());
    }
    sort_expl_timer.text = timerWarning(sortExplTimeL, t);
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of SORT_EXPLComponents)
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


function SORT_EXPLRoutineEnd(snapshot) {
  return function () {
    //------Ending Routine 'SORT_EXPL'-------
    for (const thisComponent of SORT_EXPLComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('sort_expl_scale_right.text',sort_expl_scale_right.text)
    sort_expl_scale_right.reset()
    psychoJS.experiment.addData('sort_expl_scale_left.text',sort_expl_scale_left.text)
    sort_expl_scale_left.reset()
    // store data for thisExp (ExperimentHandler)
    _mouseXYs = sort_expl_mouse.getPos();
    _mouseButtons = sort_expl_mouse.getPressed();
    psychoJS.experiment.addData('sort_expl_mouse.x', _mouseXYs[0]);
    psychoJS.experiment.addData('sort_expl_mouse.y', _mouseXYs[1]);
    psychoJS.experiment.addData('sort_expl_mouse.leftButton', _mouseButtons[0]);
    psychoJS.experiment.addData('sort_expl_mouse.midButton', _mouseButtons[1]);
    psychoJS.experiment.addData('sort_expl_mouse.rightButton', _mouseButtons[2]);
    if (sort_expl_mouse.clicked_name.length > 0) {
      psychoJS.experiment.addData('sort_expl_mouse.clicked_name', sort_expl_mouse.clicked_name[0]);}
    return Scheduler.Event.NEXT;
  };
}


var SORT_TEST_INTROComponents;
function SORT_TEST_INTRORoutineBegin(snapshot) {
  return function () {
    //------Prepare to start Routine 'SORT_TEST_INTRO'-------
    t = 0;
    SORT_TEST_INTROClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(120.000000);
    // update component parameters for each repeat
    // setup some python lists for storing info about the sort_test_intro_mouse
    sort_test_intro_mouse.clicked_name = [];
    gotValidClick = false; // until a click is received
    // keep track of which components have finished
    SORT_TEST_INTROComponents = [];
    SORT_TEST_INTROComponents.push(intro_text_7);
    SORT_TEST_INTROComponents.push(bob_4);
    SORT_TEST_INTROComponents.push(sort_example_2);
    SORT_TEST_INTROComponents.push(door_7);
    SORT_TEST_INTROComponents.push(sort_test_intro_btn);
    SORT_TEST_INTROComponents.push(sort_test_intro_mouse);
    
    for (const thisComponent of SORT_TEST_INTROComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function SORT_TEST_INTRORoutineEachFrame(snapshot) {
  return function () {
    //------Loop for each frame of Routine 'SORT_TEST_INTRO'-------
    // get current time
    t = SORT_TEST_INTROClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *intro_text_7* updates
    if (t >= 0.0 && intro_text_7.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      intro_text_7.tStart = t;  // (not accounting for frame time here)
      intro_text_7.frameNStart = frameN;  // exact frame index
      
      intro_text_7.setAutoDraw(true);
    }

    frameRemains = 0.0 + 120.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (intro_text_7.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      intro_text_7.setAutoDraw(false);
    }
    
    // *bob_4* updates
    if (t >= 0.0 && bob_4.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      bob_4.tStart = t;  // (not accounting for frame time here)
      bob_4.frameNStart = frameN;  // exact frame index
      
      bob_4.setAutoDraw(true);
    }

    frameRemains = 0.0 + 120.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (bob_4.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      bob_4.setAutoDraw(false);
    }
    
    // *sort_example_2* updates
    if (t >= 0.0 && sort_example_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_example_2.tStart = t;  // (not accounting for frame time here)
      sort_example_2.frameNStart = frameN;  // exact frame index
      
      sort_example_2.setAutoDraw(true);
    }

    frameRemains = 0.0 + 120.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (sort_example_2.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      sort_example_2.setAutoDraw(false);
    }
    
    // *door_7* updates
    if (t >= 0.0 && door_7.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      door_7.tStart = t;  // (not accounting for frame time here)
      door_7.frameNStart = frameN;  // exact frame index
      
      door_7.setAutoDraw(true);
    }

    frameRemains = 0.0 + 120.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (door_7.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      door_7.setAutoDraw(false);
    }
    
    // *sort_test_intro_btn* updates
    if (t >= 0.5 && sort_test_intro_btn.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_test_intro_btn.tStart = t;  // (not accounting for frame time here)
      sort_test_intro_btn.frameNStart = frameN;  // exact frame index
      
      sort_test_intro_btn.setAutoDraw(true);
    }

    frameRemains = 120.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((sort_test_intro_btn.status === PsychoJS.Status.STARTED || sort_test_intro_btn.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      sort_test_intro_btn.setAutoDraw(false);
    }
    // *sort_test_intro_mouse* updates
    if (t >= 0.5 && sort_test_intro_mouse.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_test_intro_mouse.tStart = t;  // (not accounting for frame time here)
      sort_test_intro_mouse.frameNStart = frameN;  // exact frame index
      
      sort_test_intro_mouse.status = PsychoJS.Status.STARTED;
      sort_test_intro_mouse.mouseClock.reset();
      prevButtonState = sort_test_intro_mouse.getPressed();  // if button is down already this ISN'T a new click
      }
    frameRemains = 120.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((sort_test_intro_mouse.status === PsychoJS.Status.STARTED || sort_test_intro_mouse.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      sort_test_intro_mouse.status = PsychoJS.Status.FINISHED;
  }
    if (sort_test_intro_mouse.status === PsychoJS.Status.STARTED) {  // only update if started and not finished!
      _mouseButtons = sort_test_intro_mouse.getPressed();
      if (!_mouseButtons.every( (e,i,) => (e == prevButtonState[i]) )) { // button state changed?
        prevButtonState = _mouseButtons;
        if (_mouseButtons.reduce( (e, acc) => (e+acc) ) > 0) { // state changed to a new click
          // check if the mouse was inside our 'clickable' objects
          gotValidClick = false;
          for (const obj of [[sort_test_intro_btn]]) {
            if (obj.contains(sort_test_intro_mouse)) {
              gotValidClick = true;
              sort_test_intro_mouse.clicked_name.push(obj.name)
            }
          }
          if (gotValidClick === true) { // abort routine on response
            continueRoutine = false;
          }
        }
      }
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
    for (const thisComponent of SORT_TEST_INTROComponents)
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


var repeats;
function SORT_TEST_INTRORoutineEnd(snapshot) {
  return function () {
    //------Ending Routine 'SORT_TEST_INTRO'-------
    for (const thisComponent of SORT_TEST_INTROComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    repeats = makeScreenShot();
    
    // store data for thisExp (ExperimentHandler)
    _mouseXYs = sort_test_intro_mouse.getPos();
    _mouseButtons = sort_test_intro_mouse.getPressed();
    psychoJS.experiment.addData('sort_test_intro_mouse.x', _mouseXYs[0]);
    psychoJS.experiment.addData('sort_test_intro_mouse.y', _mouseXYs[1]);
    psychoJS.experiment.addData('sort_test_intro_mouse.leftButton', _mouseButtons[0]);
    psychoJS.experiment.addData('sort_test_intro_mouse.midButton', _mouseButtons[1]);
    psychoJS.experiment.addData('sort_test_intro_mouse.rightButton', _mouseButtons[2]);
    if (sort_test_intro_mouse.clicked_name.length > 0) {
      psychoJS.experiment.addData('sort_test_intro_mouse.clicked_name', sort_test_intro_mouse.clicked_name[0]);}
    return Scheduler.Event.NEXT;
  };
}


var SORT_TESTComponents;
function SORT_TESTRoutineBegin(snapshot) {
  return function () {
    //------Prepare to start Routine 'SORT_TEST'-------
    t = 0;
    SORT_TESTClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(300.000000);
    // update component parameters for each repeat
    sort_test_scale_instr.setColor(new util.Color('white'));
    sort_test_scale_instr.setText('COMPARE weights by typing fruit labels in both LHS and RHS  textboxes');
    sort_test_board.setImage('materials/merge_sort/imgs/purple_diamond.png');
    sort_test_scale.setImage(scaleEqPath);
    sort_test_ex_1.setPos([(- 0.25), 0.3]);
    sort_test_ex_2.setPos([(- 0.2), 0.3]);
    sort_test_ex_3.setPos([(- 0.15), 0.3]);
    sort_test_ex_4.setPos([(- 0.1), 0.3]);
    sort_test_ex_5.setPos([(- 0.05), 0.3]);
    sort_test_ex_6.setPos([0.0, 0.3]);
    sort_test_ex_7.setPos([0.05, 0.3]);
    sort_test_ex_8.setPos([0.1, 0.3]);
    sort_test_ex_9.setPos([0.15, 0.3]);
    sort_test_ex_10.setPos([0.2, 0.3]);
    sort_test_ex_11.setPos([0.25, 0.3]);
    sort_test_ex_12.setPos([0.3, 0.3]);
    items = [];
    frameCnt = 0;
    tracePos = [];
    movingItem = null;
    [x, y] = sort_test_board.pos;
    [w, h] = sort_test_board.size;
    top = (y + (h / 2));
    bot = (y - (h / 2));
    left = (x - (w / 2));
    right = (x + (w / 2));
    
    // setup some python lists for storing info about the sort_test_mouse
    sort_test_mouse.clicked_name = [];
    gotValidClick = false; // until a click is received
    // keep track of which components have finished
    SORT_TESTComponents = [];
    SORT_TESTComponents.push(sort_test_scale_instr);
    SORT_TESTComponents.push(sort_test_ans_instr);
    SORT_TESTComponents.push(sort_test_instr);
    SORT_TESTComponents.push(sort_test_scale_right);
    SORT_TESTComponents.push(sort_test_scale_left);
    SORT_TESTComponents.push(sort_test_compare);
    SORT_TESTComponents.push(sort_test_res);
    SORT_TESTComponents.push(sort_test_sep);
    SORT_TESTComponents.push(sort_test_board);
    SORT_TESTComponents.push(sort_test_scale);
    SORT_TESTComponents.push(sort_test_ex_1);
    SORT_TESTComponents.push(sort_test_ex_2);
    SORT_TESTComponents.push(sort_test_ex_3);
    SORT_TESTComponents.push(sort_test_ex_4);
    SORT_TESTComponents.push(sort_test_ex_5);
    SORT_TESTComponents.push(sort_test_ex_6);
    SORT_TESTComponents.push(sort_test_ex_7);
    SORT_TESTComponents.push(sort_test_ex_8);
    SORT_TESTComponents.push(sort_test_ex_9);
    SORT_TESTComponents.push(sort_test_ex_10);
    SORT_TESTComponents.push(sort_test_ex_11);
    SORT_TESTComponents.push(sort_test_ex_12);
    SORT_TESTComponents.push(sort_test_btn);
    SORT_TESTComponents.push(sort_test_mouse);
    SORT_TESTComponents.push(sort_test_timer);
    
    for (const thisComponent of SORT_TESTComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


var sort_test_compareN;
var sort_test_ans;
function SORT_TESTRoutineEachFrame(snapshot) {
  return function () {
    //------Loop for each frame of Routine 'SORT_TEST'-------
    // get current time
    t = SORT_TESTClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *sort_test_scale_instr* updates
    if (t >= 0.0 && sort_test_scale_instr.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_test_scale_instr.tStart = t;  // (not accounting for frame time here)
      sort_test_scale_instr.frameNStart = frameN;  // exact frame index
      
      sort_test_scale_instr.setAutoDraw(true);
    }

    frameRemains = 0.0 + 300.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (sort_test_scale_instr.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      sort_test_scale_instr.setAutoDraw(false);
    }
    
    // *sort_test_ans_instr* updates
    if (t >= 0.0 && sort_test_ans_instr.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_test_ans_instr.tStart = t;  // (not accounting for frame time here)
      sort_test_ans_instr.frameNStart = frameN;  // exact frame index
      
      sort_test_ans_instr.setAutoDraw(true);
    }

    frameRemains = 0.0 + 300.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (sort_test_ans_instr.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      sort_test_ans_instr.setAutoDraw(false);
    }
    
    // *sort_test_instr* updates
    if (t >= 0.0 && sort_test_instr.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_test_instr.tStart = t;  // (not accounting for frame time here)
      sort_test_instr.frameNStart = frameN;  // exact frame index
      
      sort_test_instr.setAutoDraw(true);
    }

    frameRemains = 0.0 + 300.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (sort_test_instr.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      sort_test_instr.setAutoDraw(false);
    }
    
    // *sort_test_scale_right* updates
    if (t >= 0.0 && sort_test_scale_right.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_test_scale_right.tStart = t;  // (not accounting for frame time here)
      sort_test_scale_right.frameNStart = frameN;  // exact frame index
      
      sort_test_scale_right.setAutoDraw(true);
    }

    frameRemains = 0.0 + 300.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (sort_test_scale_right.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      sort_test_scale_right.setAutoDraw(false);
    }
    
    // *sort_test_scale_left* updates
    if (t >= 0.0 && sort_test_scale_left.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_test_scale_left.tStart = t;  // (not accounting for frame time here)
      sort_test_scale_left.frameNStart = frameN;  // exact frame index
      
      sort_test_scale_left.setAutoDraw(true);
    }

    frameRemains = 0.0 + 300.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (sort_test_scale_left.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      sort_test_scale_left.setAutoDraw(false);
    }
    
    // *sort_test_compare* updates
    if (t >= 0.0 && sort_test_compare.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_test_compare.tStart = t;  // (not accounting for frame time here)
      sort_test_compare.frameNStart = frameN;  // exact frame index
      
      sort_test_compare.setAutoDraw(true);
    }

    frameRemains = 0.0 + 300.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (sort_test_compare.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      sort_test_compare.setAutoDraw(false);
    }
    
    // *sort_test_res* updates
    if (t >= 0.0 && sort_test_res.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_test_res.tStart = t;  // (not accounting for frame time here)
      sort_test_res.frameNStart = frameN;  // exact frame index
      
      sort_test_res.setAutoDraw(true);
    }

    frameRemains = 0.0 + 300.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (sort_test_res.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      sort_test_res.setAutoDraw(false);
    }
    
    // *sort_test_sep* updates
    if (t >= 0.0 && sort_test_sep.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_test_sep.tStart = t;  // (not accounting for frame time here)
      sort_test_sep.frameNStart = frameN;  // exact frame index
      
      sort_test_sep.setAutoDraw(true);
    }

    frameRemains = 0.0 + 300.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (sort_test_sep.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      sort_test_sep.setAutoDraw(false);
    }
    
    // *sort_test_board* updates
    if (t >= 0.0 && sort_test_board.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_test_board.tStart = t;  // (not accounting for frame time here)
      sort_test_board.frameNStart = frameN;  // exact frame index
      
      sort_test_board.setAutoDraw(true);
    }

    frameRemains = 0.0 + 300.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (sort_test_board.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      sort_test_board.setAutoDraw(false);
    }
    
    // *sort_test_scale* updates
    if (t >= 0.0 && sort_test_scale.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_test_scale.tStart = t;  // (not accounting for frame time here)
      sort_test_scale.frameNStart = frameN;  // exact frame index
      
      sort_test_scale.setAutoDraw(true);
    }

    frameRemains = 0.0 + 300.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (sort_test_scale.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      sort_test_scale.setAutoDraw(false);
    }
    
    // *sort_test_ex_1* updates
    if (t >= 0.0 && sort_test_ex_1.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_test_ex_1.tStart = t;  // (not accounting for frame time here)
      sort_test_ex_1.frameNStart = frameN;  // exact frame index
      
      sort_test_ex_1.setAutoDraw(true);
    }

    frameRemains = 0.0 + 300.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (sort_test_ex_1.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      sort_test_ex_1.setAutoDraw(false);
    }
    
    // *sort_test_ex_2* updates
    if (t >= 0.0 && sort_test_ex_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_test_ex_2.tStart = t;  // (not accounting for frame time here)
      sort_test_ex_2.frameNStart = frameN;  // exact frame index
      
      sort_test_ex_2.setAutoDraw(true);
    }

    frameRemains = 0.0 + 300.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (sort_test_ex_2.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      sort_test_ex_2.setAutoDraw(false);
    }
    
    // *sort_test_ex_3* updates
    if (t >= 0.0 && sort_test_ex_3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_test_ex_3.tStart = t;  // (not accounting for frame time here)
      sort_test_ex_3.frameNStart = frameN;  // exact frame index
      
      sort_test_ex_3.setAutoDraw(true);
    }

    frameRemains = 0.0 + 300.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (sort_test_ex_3.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      sort_test_ex_3.setAutoDraw(false);
    }
    
    // *sort_test_ex_4* updates
    if (t >= 0.0 && sort_test_ex_4.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_test_ex_4.tStart = t;  // (not accounting for frame time here)
      sort_test_ex_4.frameNStart = frameN;  // exact frame index
      
      sort_test_ex_4.setAutoDraw(true);
    }

    frameRemains = 0.0 + 300.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (sort_test_ex_4.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      sort_test_ex_4.setAutoDraw(false);
    }
    
    // *sort_test_ex_5* updates
    if (t >= 0.0 && sort_test_ex_5.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_test_ex_5.tStart = t;  // (not accounting for frame time here)
      sort_test_ex_5.frameNStart = frameN;  // exact frame index
      
      sort_test_ex_5.setAutoDraw(true);
    }

    frameRemains = 0.0 + 300.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (sort_test_ex_5.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      sort_test_ex_5.setAutoDraw(false);
    }
    
    // *sort_test_ex_6* updates
    if (t >= 0.0 && sort_test_ex_6.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_test_ex_6.tStart = t;  // (not accounting for frame time here)
      sort_test_ex_6.frameNStart = frameN;  // exact frame index
      
      sort_test_ex_6.setAutoDraw(true);
    }

    frameRemains = 0.0 + 300.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (sort_test_ex_6.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      sort_test_ex_6.setAutoDraw(false);
    }
    
    // *sort_test_ex_7* updates
    if (t >= 0.0 && sort_test_ex_7.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_test_ex_7.tStart = t;  // (not accounting for frame time here)
      sort_test_ex_7.frameNStart = frameN;  // exact frame index
      
      sort_test_ex_7.setAutoDraw(true);
    }

    frameRemains = 0.0 + 300.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (sort_test_ex_7.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      sort_test_ex_7.setAutoDraw(false);
    }
    
    // *sort_test_ex_8* updates
    if (t >= 0.0 && sort_test_ex_8.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_test_ex_8.tStart = t;  // (not accounting for frame time here)
      sort_test_ex_8.frameNStart = frameN;  // exact frame index
      
      sort_test_ex_8.setAutoDraw(true);
    }

    frameRemains = 0.0 + 300.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (sort_test_ex_8.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      sort_test_ex_8.setAutoDraw(false);
    }
    
    // *sort_test_ex_9* updates
    if (t >= 0.0 && sort_test_ex_9.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_test_ex_9.tStart = t;  // (not accounting for frame time here)
      sort_test_ex_9.frameNStart = frameN;  // exact frame index
      
      sort_test_ex_9.setAutoDraw(true);
    }

    frameRemains = 0.0 + 300.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (sort_test_ex_9.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      sort_test_ex_9.setAutoDraw(false);
    }
    
    // *sort_test_ex_10* updates
    if (t >= 0.0 && sort_test_ex_10.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_test_ex_10.tStart = t;  // (not accounting for frame time here)
      sort_test_ex_10.frameNStart = frameN;  // exact frame index
      
      sort_test_ex_10.setAutoDraw(true);
    }

    frameRemains = 0.0 + 300.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (sort_test_ex_10.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      sort_test_ex_10.setAutoDraw(false);
    }
    
    // *sort_test_ex_11* updates
    if (t >= 0.0 && sort_test_ex_11.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_test_ex_11.tStart = t;  // (not accounting for frame time here)
      sort_test_ex_11.frameNStart = frameN;  // exact frame index
      
      sort_test_ex_11.setAutoDraw(true);
    }

    frameRemains = 0.0 + 300.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (sort_test_ex_11.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      sort_test_ex_11.setAutoDraw(false);
    }
    
    // *sort_test_ex_12* updates
    if (t >= 0.0 && sort_test_ex_12.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_test_ex_12.tStart = t;  // (not accounting for frame time here)
      sort_test_ex_12.frameNStart = frameN;  // exact frame index
      
      sort_test_ex_12.setAutoDraw(true);
    }

    frameRemains = 0.0 + 300.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (sort_test_ex_12.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      sort_test_ex_12.setAutoDraw(false);
    }
    if ((items === [])) {
        items = enableImageComponents(SORT_TESTComponents, sort_test_labels, sort_test_path_base);
    }
    movingItem = moveItem(sort_test_mouse, movingItem);
    if (((frameCnt % traceSaveAtFrame) === 0)) {
        newTracePos = [];
        for (var i, _pj_c = 0, _pj_a = items, _pj_b = _pj_a.length; (_pj_c < _pj_b); _pj_c += 1) {
            i = _pj_a[_pj_c];
            newTracePos.append([i.name.split("_").slice((- 1))[0], i.pos[0], i.pos[1]]);
        }
        hasMoved = updateTrace(tracePos, newTracePos);
        if ((hasMoved !== [])) {
            for (var j, _pj_c = 0, _pj_a = hasMoved, _pj_b = _pj_a.length; (_pj_c < _pj_b); _pj_c += 1) {
                j = _pj_a[_pj_c];
                sort_test_trace.append(j);
            }
        }
        tracePos = newTracePos;
    }
    if (sort_test_mouse.isPressedIn(sort_test_compare)) {
        sort_test_compareN = (sort_test_compareN + compare(sort_test_scale, sort_test_input, sort_test_labels, sort_test_scale_instr, sort_test_scale_left, sort_test_scale_right));
    }
    sort_test_ans = sort_test_res.text;
    sort_test_timer.text = timerWarning(sortTestTimeL, t);
    
    
    // *sort_test_btn* updates
    if (t >= 0.5 && sort_test_btn.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_test_btn.tStart = t;  // (not accounting for frame time here)
      sort_test_btn.frameNStart = frameN;  // exact frame index
      
      sort_test_btn.setAutoDraw(true);
    }

    frameRemains = 300.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((sort_test_btn.status === PsychoJS.Status.STARTED || sort_test_btn.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      sort_test_btn.setAutoDraw(false);
    }
    // *sort_test_mouse* updates
    if (t >= 0.5 && sort_test_mouse.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_test_mouse.tStart = t;  // (not accounting for frame time here)
      sort_test_mouse.frameNStart = frameN;  // exact frame index
      
      sort_test_mouse.status = PsychoJS.Status.STARTED;
      sort_test_mouse.mouseClock.reset();
      prevButtonState = sort_test_mouse.getPressed();  // if button is down already this ISN'T a new click
      }
    frameRemains = 300.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((sort_test_mouse.status === PsychoJS.Status.STARTED || sort_test_mouse.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      sort_test_mouse.status = PsychoJS.Status.FINISHED;
  }
    if (sort_test_mouse.status === PsychoJS.Status.STARTED) {  // only update if started and not finished!
      _mouseButtons = sort_test_mouse.getPressed();
      if (!_mouseButtons.every( (e,i,) => (e == prevButtonState[i]) )) { // button state changed?
        prevButtonState = _mouseButtons;
        if (_mouseButtons.reduce( (e, acc) => (e+acc) ) > 0) { // state changed to a new click
          // check if the mouse was inside our 'clickable' objects
          gotValidClick = false;
          for (const obj of [[sort_test_btn]]) {
            if (obj.contains(sort_test_mouse)) {
              gotValidClick = true;
              sort_test_mouse.clicked_name.push(obj.name)
            }
          }
          if (gotValidClick === true) { // abort routine on response
            continueRoutine = false;
          }
        }
      }
    }
    
    // *sort_test_timer* updates
    if (t >= 0.0 && sort_test_timer.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_test_timer.tStart = t;  // (not accounting for frame time here)
      sort_test_timer.frameNStart = frameN;  // exact frame index
      
      sort_test_timer.setAutoDraw(true);
    }

    frameRemains = 300.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((sort_test_timer.status === PsychoJS.Status.STARTED || sort_test_timer.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      sort_test_timer.setAutoDraw(false);
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
    for (const thisComponent of SORT_TESTComponents)
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


function SORT_TESTRoutineEnd(snapshot) {
  return function () {
    //------Ending Routine 'SORT_TEST'-------
    for (const thisComponent of SORT_TESTComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('sort_test_scale_right.text',sort_test_scale_right.text)
    sort_test_scale_right.reset()
    psychoJS.experiment.addData('sort_test_scale_left.text',sort_test_scale_left.text)
    sort_test_scale_left.reset()
    psychoJS.experiment.addData('sort_test_res.text',sort_test_res.text)
    sort_test_res.reset()
    // store data for thisExp (ExperimentHandler)
    _mouseXYs = sort_test_mouse.getPos();
    _mouseButtons = sort_test_mouse.getPressed();
    psychoJS.experiment.addData('sort_test_mouse.x', _mouseXYs[0]);
    psychoJS.experiment.addData('sort_test_mouse.y', _mouseXYs[1]);
    psychoJS.experiment.addData('sort_test_mouse.leftButton', _mouseButtons[0]);
    psychoJS.experiment.addData('sort_test_mouse.midButton', _mouseButtons[1]);
    psychoJS.experiment.addData('sort_test_mouse.rightButton', _mouseButtons[2]);
    if (sort_test_mouse.clicked_name.length > 0) {
      psychoJS.experiment.addData('sort_test_mouse.clicked_name', sort_test_mouse.clicked_name[0]);}
    return Scheduler.Event.NEXT;
  };
}


var DEBRIEFComponents;
function DEBRIEFRoutineBegin(snapshot) {
  return function () {
    //------Prepare to start Routine 'DEBRIEF'-------
    t = 0;
    DEBRIEFClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(10.000000);
    // update component parameters for each repeat
    // setup some python lists for storing info about the debrief_mouse
    debrief_mouse.clicked_name = [];
    gotValidClick = false; // until a click is received
    // keep track of which components have finished
    DEBRIEFComponents = [];
    DEBRIEFComponents.push(intro_text_5);
    DEBRIEFComponents.push(debrief_btn);
    DEBRIEFComponents.push(debrief_mouse);
    
    for (const thisComponent of DEBRIEFComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function DEBRIEFRoutineEachFrame(snapshot) {
  return function () {
    //------Loop for each frame of Routine 'DEBRIEF'-------
    // get current time
    t = DEBRIEFClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *intro_text_5* updates
    if (t >= 0.0 && intro_text_5.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      intro_text_5.tStart = t;  // (not accounting for frame time here)
      intro_text_5.frameNStart = frameN;  // exact frame index
      
      intro_text_5.setAutoDraw(true);
    }

    frameRemains = 0.0 + 10.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (intro_text_5.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      intro_text_5.setAutoDraw(false);
    }
    
    // *debrief_btn* updates
    if (t >= 0.5 && debrief_btn.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      debrief_btn.tStart = t;  // (not accounting for frame time here)
      debrief_btn.frameNStart = frameN;  // exact frame index
      
      debrief_btn.setAutoDraw(true);
    }

    frameRemains = 10.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((debrief_btn.status === PsychoJS.Status.STARTED || debrief_btn.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      debrief_btn.setAutoDraw(false);
    }
    // *debrief_mouse* updates
    if (t >= 0.5 && debrief_mouse.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      debrief_mouse.tStart = t;  // (not accounting for frame time here)
      debrief_mouse.frameNStart = frameN;  // exact frame index
      
      debrief_mouse.status = PsychoJS.Status.STARTED;
      debrief_mouse.mouseClock.reset();
      prevButtonState = debrief_mouse.getPressed();  // if button is down already this ISN'T a new click
      }
    frameRemains = 10.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((debrief_mouse.status === PsychoJS.Status.STARTED || debrief_mouse.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      debrief_mouse.status = PsychoJS.Status.FINISHED;
  }
    if (debrief_mouse.status === PsychoJS.Status.STARTED) {  // only update if started and not finished!
      _mouseButtons = debrief_mouse.getPressed();
      if (!_mouseButtons.every( (e,i,) => (e == prevButtonState[i]) )) { // button state changed?
        prevButtonState = _mouseButtons;
        if (_mouseButtons.reduce( (e, acc) => (e+acc) ) > 0) { // state changed to a new click
          // check if the mouse was inside our 'clickable' objects
          gotValidClick = false;
          for (const obj of [[debrief_btn]]) {
            if (obj.contains(debrief_mouse)) {
              gotValidClick = true;
              debrief_mouse.clicked_name.push(obj.name)
            }
          }
          if (gotValidClick === true) { // abort routine on response
            continueRoutine = false;
          }
        }
      }
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
    for (const thisComponent of DEBRIEFComponents)
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


function DEBRIEFRoutineEnd(snapshot) {
  return function () {
    //------Ending Routine 'DEBRIEF'-------
    for (const thisComponent of DEBRIEFComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // store data for thisExp (ExperimentHandler)
    _mouseXYs = debrief_mouse.getPos();
    _mouseButtons = debrief_mouse.getPressed();
    psychoJS.experiment.addData('debrief_mouse.x', _mouseXYs[0]);
    psychoJS.experiment.addData('debrief_mouse.y', _mouseXYs[1]);
    psychoJS.experiment.addData('debrief_mouse.leftButton', _mouseButtons[0]);
    psychoJS.experiment.addData('debrief_mouse.midButton', _mouseButtons[1]);
    psychoJS.experiment.addData('debrief_mouse.rightButton', _mouseButtons[2]);
    if (debrief_mouse.clicked_name.length > 0) {
      psychoJS.experiment.addData('debrief_mouse.clicked_name', debrief_mouse.clicked_name[0]);}
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
