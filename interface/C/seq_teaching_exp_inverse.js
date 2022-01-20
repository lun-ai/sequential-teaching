/********************************* 
 * Seq_Teaching_Exp_Inverse Test *
 *********************************/

import { core, data, sound, util, visual } from './lib/psychojs-2021.2.3.js';
const { PsychoJS } = core;
const { TrialHandler } = data;
const { Scheduler } = util;
//some handy aliases as in the psychopy scripts;
const { abs, sin, cos, PI: pi, sqrt } = Math;
const { round } = util;


// store info about the experiment session:
let expName = 'seq_teaching_exp_inverse';  // from the Builder filename that created this script
let expInfo = {'Participant ID': ''};

// Start code blocks for 'Before Experiment'
expInfo['Participant ID'] = sessionStorage.getItem("participantCode").replaceAll("\"","");

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
const sleepTime = 0.2;
const green = [(- 0.0039), 1.0, (- 1.0)];
const red = [1.0, (- 0.2235), (- 0.4431)];
const white = [1.0, 1.0, 1.0];
const traceSaveAtFrame = 20;

const introTimeL = 120;
const mergeTestTimeL = 90;
const mergeTrainTimeL = 90;
const mergeExplTimeL = 60;
const sortTestTimeL = 300;
const sortTrainTimeL = 300;
const sortExplTimeL = 60;
const reviewTimeL = 180;
const expCheckTimeL = 300;
const preTestTimeL = 30;
const preTestTotalTimeL = 480;

var routineT = 0;
var comparePressedT = 0.0;
var isComparePressed = false;
var preTestTime = 0;
var progressBar;
var preTestTrainCorrectCnt = 0;

const scaleEqPath = "materials/merge_sort/imgs/scale_balanced.png";
const scaleLtPath = "materials/merge_sort/imgs/scale_right.png";
const scaleGtPath = "materials/merge_sort/imgs/scale_left.png";

var expSetup = {
            "BACKGROUND": [introTimeL, 1],
            "INTRO": [introTimeL, 1],
            "HINT": [introTimeL, 1],
            "PRE_TEST_INTRO": [introTimeL, 1],
            "PRE_TEST": [preTestTotalTimeL, 1],
            "MERGE_INTRO": [introTimeL, 1],
            "SORT_INTRO": [introTimeL, 1],
            "MERGE_TEST_INTRO": [introTimeL, 1],
            "SORT_TEST_INTRO": [introTimeL, 1],
            "EXP_CHECK": [expCheckTimeL, 1],
            "REVIEW": [reviewTimeL, 4],
            "MERGE_TRAIN": [mergeTrainTimeL,6],
            "SORT_TRAIN": [sortTrainTimeL,4],
            "MERGE_EXPL": [mergeExplTimeL,6],
            "SORT_EXPL": [sortExplTimeL,4],
            "MERGE_TEST": [mergeTestTimeL,5],
            "SORT_TEST": [sortTestTimeL,8]
        };

class ProgressBar {
    
    // routine dict entry: [routineTime, routineRepeat]
    
    constructor (routines) {
        
        this.currentProgress = 0;
        this.totalTime = 0;
        this.routines = {};
        this.name = null;
        this.percent = null;
        this.bar = null;
        this.progress = null;
        this.window = psychoJS.window;
        this.routines = routines;
        this.barWidth = 1.2;
        this.barHeight = 0.05;
        this.textXPos = 0.37;
        this.textYPos = 0.48;
        this.barXPos = 0.0;
        this.barYPos = 0.48;
        this.fontSize = 0.02;
        
        for (var key in this.routines){
            this.totalTime += this.routines[key][0] * this.routines[key][1];
        }
        this.name = new visual.TextStim({
            win: this.window,
            name: 'progress',
            text: 'Progress',
            font: 'Open Sans',
            pos: [-this.textXPos, this.textYPos], height: this.fontSize,
            color: new util.Color('white')
        });
        this.name.setAutoDraw(true);
        this.percent = new visual.TextStim({
            win: this.window,
            name: 'precent',
            text: '0%',
            font: 'Open Sans',
            pos: [this.textXPos, this.textYPos], height: this.fontSize,
            color: new util.Color('white') 
        });
        this.percent.setAutoDraw(true);
        this.progress = new visual.Rect({
           win: this.window,
           name: "progress",
           units: undefined,
           pos: [0, this.barYPos],
           size: [0, this.barHeight],
           fillColor: new util.Color('black')
        });
        this.progress.setAutoDraw(true);
        this.bar = new visual.Rect({
           win: this.window,
           name: "bar",
           units: undefined,
           pos: [this.barXPos, this.barYPos],
           size: [this.barWidth, this.barHeight],
           fillColor: new util.Color('white')
        });
        this.bar.setAutoDraw(true);
    }

    update(routineName) {
        this.currentProgress += this.routines[routineName][0];
        let p = 0 + (this.currentProgress / this.totalTime).toFixed(2);
        this.progress.size = [p * this.barWidth, this.barHeight];
        this.progress.pos = [this.barXPos - 0.25 * (1 - p) * this.barWidth, this.barYPos];
        this.percent.text = Math.min((p * 100).toFixed(0), 100) + "%";
    }
    
    hide() {
        this.name.opacity = 0.0;
        this.percent.opacity = 0.0;
        this.bar.opacity = 0.0;
        this.progress.opacity = 0.0;
    }

    show() {
        this.name.opacity = 1.0;
        this.percent.opacity = 1.0;
        this.bar.opacity = 1.0;
        this.progress.opacity = 1.0;
    }
}


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

var leftIdx;
var rightIdx;
var leftValue;
var rightValue;
function comparePickedItems(values, labels, leftInput, rightInput) {
    var leftIdx, leftValue, rightIdx, rightValue;
    if (((leftInput.text.length === 0) || (rightInput.text.length === 0))) {
        return [1,"",""];
    } else {
        if (((leftInput.text.length > 1) || (rightInput.text.length > 1))) {
            return [2,"",""];
        } else {
            if (((_pj.in_es6("'"+leftInput.text + "'", labels) === false) || (_pj.in_es6("'"+rightInput.text + "'", labels)) === false)) {
                return [3,"",""];
            }
        }
    }
    leftIdx = labels.indexOf("'"+leftInput.text + "'");
    rightIdx = labels.indexOf("'"+rightInput.text + "'");
    leftValue = parseInt(values[leftIdx]);
    rightValue = parseInt(values[rightIdx]);
    if ((leftValue > rightValue)) {
        return [4,leftInput.text,rightInput.text];
    } else {
        if ((leftValue < rightValue)) {
            return [5,leftInput.text,rightInput.text];
        } else {
            return [6,leftInput.text,rightInput.text];
        }
    }
}

var u;
function timeSleep(T) {
    var u;
    u = 0;
    for (var i = 0, _pj_a = Number.parseInt((1000000 * T)); (i < _pj_a); i += 1) {
        u = (u + 1);
    }
}


var state;
function compare(scale, listValues, labels, compareBtn, instr, scaleLeft, scaleRight) {
    var state;
    state = comparePickedItems(listValues, labels, scaleLeft, scaleRight);
    timeSleep(sleepTime);
    if ((state[0] > 3)) {
        instr.color = green;
        instr.height = 0.05;
        if ((state[0] === 4)) {
            instr.text = state[1] + " > " + state[2];
            scale.image = scaleGtPath;
        } else {
            if ((state[0] === 5)) {
                instr.text = state[1] + " < " + state[2];
                scale.image = scaleLtPath;
            } else {
                instr.text = state[1] + " = " + state[2];
                scale.image = scaleEqPath;
            }
        }
        compareBtn.image = "materials/merge_sort/imgs/compare_clicked.png";
        return [1,state[1],state[2]];
    } else {
        if ((state[0] === 1)) {
            instr.text = "Please provide labels in correct format for both LHS and RHS";
            instr.color = red;
            instr.height = 0.02;
        } else {
            if ((state[0] === 2)) {
                instr.text = "Please enter labels as single capitals";
                instr.color = red;
                instr.height = 0.02;
            } else {
                if ((state[0] === 3)) {
                    instr.text = "Please enter an existing item";
                    instr.color = red;
                    instr.height = 0.02;
                }
            }
        }
    }
    return [0,state[1],state[2]];
}


var correct;
var submitted;
var values;
var correctValues;
function checkSortTrainAns(input, labels, res, feedback_1, feedback_2) {
    var correct, correctValues, submitted, values;
    const inputValues = input.map(x=>parseInt(x));
    correct = getSortTrace(inputValues, labels);
    submitted = res.replace(" ", "");
    values = res.replace(",", "");
    correctValues = correct.replace(",", "");
    if ((submitted === correct)) {
        feedback_1.text = "Your answer is CORRECT!";
        feedback_1.color = green;
        feedback_2.text = "";
    } else {
        if ((values === correctValues)) {
            feedback_1.text = "Your answer does not have the correct format!\n";
            feedback_1.color = red;
            feedback_2.text = ("The correct answer is >>>>\n[" + correct.replaceAll(",","]-[") + "]");
            feedback_2.color = green;
        } else {
            feedback_1.text = "Your answer is WRONG!";
            feedback_1.color = red;
            feedback_2.text = ("The correct answer is >>>>\n[" + correct.replaceAll(",","]-[") + "]");
            feedback_2.color = green;
        }
    }
}

var temp;
var sublistLabels;
function getSortTrace(input, labels) {
    var sublistLabels, sublists, temp;
    temp = [];
    for (var i, _pj_c = 0, _pj_a = input, _pj_b = _pj_a.length; (_pj_c < _pj_b); _pj_c += 1) {
        i = _pj_a[_pj_c];
        temp.push([i]);
    }
    while ((temp.length > 1)) {
        sublists = [];
        for (var i = 0, _pj_a = Number.parseInt((temp.length / 2)); (i < _pj_a); i += 1) {
            const l = temp[(i * 2)].concat(temp[((i * 2) + 1)]);
            l.sort(function(k,m){return k-m});
            sublists.push(l);
        }
        if (((temp.length % 2) === 1)) {
            temp = sublists.concat([temp.slice((- 1))[0]]);
        } else {
            temp = sublists;
        }
    }
    sublistLabels = "";
    for (var i = 0, _pj_a = temp.length; (i < _pj_a); i += 1) {
        for (var j = 0, _pj_b = temp[i].length; (j < _pj_b); j += 1) {
            sublistLabels = (sublistLabels + labels[input.indexOf(temp[i][j])][1]);
            if (((i < (temp.length - 1)) || (j < (temp[i].length - 1)))) {
                sublistLabels = (sublistLabels + ",");
            }
        }
    }
    return sublistLabels;
}

var enabledComponents;
var i;
function enableImageComponents(components, labels, imagePathBase, sizeX, centreX, centreY) {
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
                    component.image = "materials/merge_sort/imgs/white_BG.png";
                } else {
                    component.image = (((imagePathBase + "_") + labels[i].charAt(1)) + ".png");
                    component.pos = [centreX - ((labels.length - 1) * 0.05 / 2).toFixed(4) + enabledComponents.length * 0.05, centreY];
                    enabledComponents.push(component);
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
    order = [rand_seq[(N)], (1 - rand_seq[(N)])];
    if ((((path1.split("_").slice((- 1))[0] === "wrong.png") && (path2.split("_").slice((- 1))[0] === "correct.png")) || ((path2.split("_").slice((- 1))[0] === "wrong.png") && (path1.split("_").slice((- 1))[0] === "correct.png")))) {
        if ((order[0] === 1 && order[1] === 0)) {
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
    if ((mc_order[0] === 1 && mc_order[1] === 0)) {
        feedback1.color = green;
        feedback2.color = red;
        feedback1.text = (feedback1.text + "This answer is CORRECT!");
        feedback2.text = (feedback2.text + "This answer is WRONG!");
        mc1.image = (mcPath1.split(".png")[0] + "_selected.png");
        mc2.image = (mcPath2.split(".png")[0] + "_selected.png");
        expl1.image = (mcPath1.split(".png")[0] + "_expl.png");
        expl2.image = (mcPath2.split(".png")[0] + "_expl.png");
        return submitted === 0
    } else {
        feedback1.color = red;
        feedback2.color = green;
        feedback1.text = (feedback1.text + "This answer is WRONG!");
        feedback2.text = (feedback2.text + "This answer is CORRECT!");
        mc1.image = (mcPath2.split(".png")[0] + "_selected.png");
        mc2.image = (mcPath1.split(".png")[0] + "_selected.png");
        expl1.image = (mcPath2.split(".png")[0] + "_expl.png");
        expl2.image = (mcPath1.split(".png")[0] + "_expl.png");
        return submitted === 1
    }
}

function checkBGSelection(m, groups, picked) {
    for (var item, _pj_c = 0, _pj_a = groups, _pj_b = _pj_a.length; (_pj_c < _pj_b); _pj_c += 1) {
        item = _pj_a[_pj_c];
        if (((m !== null) && m.isPressedIn(item))) {
            for (var others, _pj_f = 0, _pj_d = groups, _pj_e = _pj_d.length; (_pj_f < _pj_e); _pj_f += 1) {
                others = _pj_d[_pj_f];
                others.image = (("materials/imgs/" + others.name) + ".png");
            }
            item.image = (("materials/imgs/" + item.name) + "_selected.png");
            timeSleep(sleepTime);
            return item;
        }
    }
    return picked;
}


var tRemain;
function timerWarningRemain(timeLimt, timePassed, remain) {
    var tRemain;
    tRemain = Number.parseInt((timeLimt - timePassed));
    if ((tRemain <= remain)) {
        if (tRemain >= 0) {
            return ("Remain time sec: " + tRemain.toString());
        } else {
            return ("Remain time sec: " + 0);
        }
    } else {
        return "";
    }
}


function timerWarning(timeLimt, timePassed) {
    return timerWarningRemain(timeLimt, timePassed, 30);
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
                updated.push(j);
            }
        }
    }
    return updated;
}
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
flowScheduler.add(CONSENTRoutineBegin());
flowScheduler.add(CONSENTRoutineEachFrame());
flowScheduler.add(CONSENTRoutineEnd());
flowScheduler.add(PRE_TEST_INTRORoutineBegin());
flowScheduler.add(PRE_TEST_INTRORoutineEachFrame());
flowScheduler.add(PRE_TEST_INTRORoutineEnd());
const MaRs_IB_1LoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(MaRs_IB_1LoopBegin(MaRs_IB_1LoopScheduler));
flowScheduler.add(MaRs_IB_1LoopScheduler);
flowScheduler.add(MaRs_IB_1LoopEnd);
const MaRs_IB_2LoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(MaRs_IB_2LoopBegin(MaRs_IB_2LoopScheduler));
flowScheduler.add(MaRs_IB_2LoopScheduler);
flowScheduler.add(MaRs_IB_2LoopEnd);
flowScheduler.add(BREAK_1RoutineBegin());
flowScheduler.add(BREAK_1RoutineEachFrame());
flowScheduler.add(BREAK_1RoutineEnd());
flowScheduler.add(INTRORoutineBegin());
flowScheduler.add(INTRORoutineEachFrame());
flowScheduler.add(INTRORoutineEnd());
flowScheduler.add(HINTRoutineBegin());
flowScheduler.add(HINTRoutineEachFrame());
flowScheduler.add(HINTRoutineEnd());
flowScheduler.add(SORT_INTRORoutineBegin());
flowScheduler.add(SORT_INTRORoutineEachFrame());
flowScheduler.add(SORT_INTRORoutineEnd());
const TRAIN_2LoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(TRAIN_2LoopBegin(TRAIN_2LoopScheduler));
flowScheduler.add(TRAIN_2LoopScheduler);
flowScheduler.add(TRAIN_2LoopEnd);
flowScheduler.add(MERGE_INTRORoutineBegin());
flowScheduler.add(MERGE_INTRORoutineEachFrame());
flowScheduler.add(MERGE_INTRORoutineEnd());
const TRAIN_1LoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(TRAIN_1LoopBegin(TRAIN_1LoopScheduler));
flowScheduler.add(TRAIN_1LoopScheduler);
flowScheduler.add(TRAIN_1LoopEnd);
flowScheduler.add(MERGE_TEST_INTRORoutineBegin());
flowScheduler.add(MERGE_TEST_INTRORoutineEachFrame());
flowScheduler.add(MERGE_TEST_INTRORoutineEnd());
const TEST_1LoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(TEST_1LoopBegin(TEST_1LoopScheduler));
flowScheduler.add(TEST_1LoopScheduler);
flowScheduler.add(TEST_1LoopEnd);
flowScheduler.add(BREAK_2RoutineBegin());
flowScheduler.add(BREAK_2RoutineEachFrame());
flowScheduler.add(BREAK_2RoutineEnd());
flowScheduler.add(SORT_TEST_INTRORoutineBegin());
flowScheduler.add(SORT_TEST_INTRORoutineEachFrame());
flowScheduler.add(SORT_TEST_INTRORoutineEnd());
const TEST_2LoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(TEST_2LoopBegin(TEST_2LoopScheduler));
flowScheduler.add(TEST_2LoopScheduler);
flowScheduler.add(TEST_2LoopEnd);
const REVIEWLoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(REVIEWLoopBegin(REVIEWLoopScheduler));
flowScheduler.add(REVIEWLoopScheduler);
flowScheduler.add(REVIEWLoopEnd);
flowScheduler.add(EXP_CHECKRoutineBegin());
flowScheduler.add(EXP_CHECKRoutineEachFrame());
flowScheduler.add(EXP_CHECKRoutineEnd());
flowScheduler.add(BACKGROUNDRoutineBegin());
flowScheduler.add(BACKGROUNDRoutineEachFrame());
flowScheduler.add(BACKGROUNDRoutineEnd());
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
    {'name': 'materials/imgs/MaRs_IB/33_task_44_pd_c.png', 'path': 'materials/imgs/MaRs_IB/33_task_44_pd_c.png'},
    {'name': 'materials/merge_sort/imgs/merge_test/merge_test_ex_1.png', 'path': 'materials/merge_sort/imgs/merge_test/merge_test_ex_1.png'},
    {'name': 'materials/merge_sort/imgs/fruits/apple_C.png', 'path': 'materials/merge_sort/imgs/fruits/apple_C.png'},
    {'name': 'materials/merge_sort/imgs/fruits/apple_D.png', 'path': 'materials/merge_sort/imgs/fruits/apple_D.png'},
    {'name': 'materials/imgs/_55_64.png', 'path': 'materials/imgs/_55_64.png'},
    {'name': 'materials/imgs/arrow.png', 'path': 'materials/imgs/arrow.png'},
    {'name': 'materials/imgs/MaRs_IB/47_task_28_pd_c.png', 'path': 'materials/imgs/MaRs_IB/47_task_28_pd_c.png'},
    {'name': 'materials/merge_sort/imgs/white_BG.png', 'path': 'materials/merge_sort/imgs/white_BG.png'},
    {'name': 'materials/imgs/_18_24_selected.png', 'path': 'materials/imgs/_18_24_selected.png'},
    {'name': 'materials/merge_sort/imgs/merge_train/merge_train_ex_2_2_wrong_selected.png', 'path': 'materials/merge_sort/imgs/merge_train/merge_train_ex_2_2_wrong_selected.png'},
    {'name': 'materials/imgs/other_selected.png', 'path': 'materials/imgs/other_selected.png'},
    {'name': 'materials/merge_sort/imgs/sort_train/sort_train_example.png', 'path': 'materials/merge_sort/imgs/sort_train/sort_train_example.png'},
    {'name': 'materials/merge_sort/imgs/fruits/apple_I.png', 'path': 'materials/merge_sort/imgs/fruits/apple_I.png'},
    {'name': 'materials/imgs/MaRs_IB/58_task_23_md_b.png', 'path': 'materials/imgs/MaRs_IB/58_task_23_md_b.png'},
    {'name': 'materials/merge_sort/imgs/fruits/apple_L.png', 'path': 'materials/merge_sort/imgs/fruits/apple_L.png'},
    {'name': 'materials/imgs/MaRs_IB/57_task_61_md_d.png', 'path': 'materials/imgs/MaRs_IB/57_task_61_md_d.png'},
    {'name': 'materials/imgs/MaRs_IB/49_task_80_pd_c.png', 'path': 'materials/imgs/MaRs_IB/49_task_80_pd_c.png'},
    {'name': 'materials/merge_sort/imgs/merge_train/merge_train_ex_5_2_wrong.png', 'path': 'materials/merge_sort/imgs/merge_train/merge_train_ex_5_2_wrong.png'},
    {'name': 'materials/imgs/MaRs_IB/36_task_36_pd_c.png', 'path': 'materials/imgs/MaRs_IB/36_task_36_pd_c.png'},
    {'name': 'materials/imgs/MaRs_IB/53_task_34_pd_a.png', 'path': 'materials/imgs/MaRs_IB/53_task_34_pd_a.png'},
    {'name': 'materials/merge_sort/imgs/merge_train/merge_train_ex_5_1_correct_selected.png', 'path': 'materials/merge_sort/imgs/merge_train/merge_train_ex_5_1_correct_selected.png'},
    {'name': 'materials/imgs/MaRs_IB/50_task_39_md_b.png', 'path': 'materials/imgs/MaRs_IB/50_task_39_md_b.png'},
    {'name': 'materials/imgs/MaRs_IB/35_task_63_md_b.png', 'path': 'materials/imgs/MaRs_IB/35_task_63_md_b.png'},
    {'name': 'materials/imgs/male_selected.png', 'path': 'materials/imgs/male_selected.png'},
    {'name': 'materials/imgs/continue.png', 'path': 'materials/imgs/continue.png'},
    {'name': 'materials/imgs/MaRs_IB/65_task_15_md_b.png', 'path': 'materials/imgs/MaRs_IB/65_task_15_md_b.png'},
    {'name': 'materials/imgs/_45_54_selected.png', 'path': 'materials/imgs/_45_54_selected.png'},
    {'name': 'materials/imgs/graduate_selected.png', 'path': 'materials/imgs/graduate_selected.png'},
    {'name': 'materials/imgs/MaRs_IB/29_task_46_pd_a.png', 'path': 'materials/imgs/MaRs_IB/29_task_46_pd_a.png'},
    {'name': 'materials/imgs/MaRs_IB/55_task_64_pd_c.png', 'path': 'materials/imgs/MaRs_IB/55_task_64_pd_c.png'},
    {'name': 'materials/imgs/MaRs_IB/21_task_59_md_b.png', 'path': 'materials/imgs/MaRs_IB/21_task_59_md_b.png'},
    {'name': 'materials/merge_sort/imgs/scale_balanced.png', 'path': 'materials/merge_sort/imgs/scale_balanced.png'},
    {'name': 'materials/merge_sort/imgs/merge_train/merge_train_ex_1_1_correct_selected.png', 'path': 'materials/merge_sort/imgs/merge_train/merge_train_ex_1_1_correct_selected.png'},
    {'name': 'materials/merge_sort/imgs/merge_train/merge_train_ex_5_2_correct_expl.png', 'path': 'materials/merge_sort/imgs/merge_train/merge_train_ex_5_2_correct_expl.png'},
    {'name': 'materials/imgs/MaRs_IB/18_task_30_pd_a.png', 'path': 'materials/imgs/MaRs_IB/18_task_30_pd_a.png'},
    {'name': 'materials/imgs/male.png', 'path': 'materials/imgs/male.png'},
    {'name': 'materials/sort_test_cond.csv', 'path': 'materials/sort_test_cond.csv'},
    {'name': 'materials/imgs/MaRs_IB/22_task_16_pd_c.png', 'path': 'materials/imgs/MaRs_IB/22_task_16_pd_c.png'},
    {'name': 'materials/imgs/other_gender.png', 'path': 'materials/imgs/other_gender.png'},
    {'name': 'materials/imgs/MaRs_IB/70_task_42_pd_a.png', 'path': 'materials/imgs/MaRs_IB/70_task_42_pd_a.png'},
    {'name': 'materials/imgs/MaRs_IB/00_task_04_pd_c.png', 'path': 'materials/imgs/MaRs_IB/00_task_04_pd_c.png'},
    {'name': 'materials/imgs/MaRs_IB/51_task_37_md_d.png', 'path': 'materials/imgs/MaRs_IB/51_task_37_md_d.png'},
    {'name': 'materials/merge_sort/imgs/merge_test/merge_test_ex_4.png', 'path': 'materials/merge_sort/imgs/merge_test/merge_test_ex_4.png'},
    {'name': 'materials/pre_test_train_cond.csv', 'path': 'materials/pre_test_train_cond.csv'},
    {'name': 'materials/merge_sort/imgs/compare_clicked.png', 'path': 'materials/merge_sort/imgs/compare_clicked.png'},
    {'name': 'materials/imgs/MaRs_IB/41_task_49_md_d.png', 'path': 'materials/imgs/MaRs_IB/41_task_49_md_d.png'},
    {'name': 'materials/imgs/prefer_not_to_say.png', 'path': 'materials/imgs/prefer_not_to_say.png'},
    {'name': 'materials/imgs/bachelor_selected.png', 'path': 'materials/imgs/bachelor_selected.png'},
    {'name': 'materials/imgs/_25_34_selected.png', 'path': 'materials/imgs/_25_34_selected.png'},
    {'name': 'materials/imgs/MaRs_IB/46_task_33_md_d.png', 'path': 'materials/imgs/MaRs_IB/46_task_33_md_d.png'},
    {'name': 'materials/imgs/doctorate_selected.png', 'path': 'materials/imgs/doctorate_selected.png'},
    {'name': 'materials/imgs/MaRs_IB/03_task_22_pd_a.png', 'path': 'materials/imgs/MaRs_IB/03_task_22_pd_a.png'},
    {'name': 'materials/merge_sort/imgs/merge_train/merge_train_ex_2_1_wrong_selected.png', 'path': 'materials/merge_sort/imgs/merge_train/merge_train_ex_2_1_wrong_selected.png'},
    {'name': 'materials/imgs/MaRs_IB/69_task_24_pd_c.png', 'path': 'materials/imgs/MaRs_IB/69_task_24_pd_c.png'},
    {'name': 'materials/imgs/MaRs_IB/00_task_02_pd_a.png', 'path': 'materials/imgs/MaRs_IB/00_task_02_pd_a.png'},
    {'name': 'materials/imgs/MaRs_IB/56_task_56_pd_c.png', 'path': 'materials/imgs/MaRs_IB/56_task_56_pd_c.png'},
    {'name': 'materials/merge_train_cond.csv', 'path': 'materials/merge_train_cond.csv'},
    {'name': 'materials/imgs/MaRs_IB/27_task_27_md_b.png', 'path': 'materials/imgs/MaRs_IB/27_task_27_md_b.png'},
    {'name': 'materials/imgs/college_selected.png', 'path': 'materials/imgs/college_selected.png'},
    {'name': 'materials/merge_sort/imgs/fruits/melon_E.png', 'path': 'materials/merge_sort/imgs/fruits/melon_E.png'},
    {'name': 'materials/merge_sort/imgs/fruits/banana_E.png', 'path': 'materials/merge_sort/imgs/fruits/banana_E.png'},
    {'name': 'materials/merge_sort/imgs/purple_diamond.png', 'path': 'materials/merge_sort/imgs/purple_diamond.png'},
    {'name': 'materials/imgs/other.png', 'path': 'materials/imgs/other.png'},
    {'name': 'materials/imgs/MaRs_IB/00_task_01_md_a.png', 'path': 'materials/imgs/MaRs_IB/00_task_01_md_a.png'},
    {'name': 'materials/imgs/doctorate.png', 'path': 'materials/imgs/doctorate.png'},
    {'name': 'materials/merge_sort/imgs/fruits/banana_H.png', 'path': 'materials/merge_sort/imgs/fruits/banana_H.png'},
    {'name': 'materials/imgs/high_school_equivalent_selected.png', 'path': 'materials/imgs/high_school_equivalent_selected.png'},
    {'name': 'materials/imgs/MaRs_IB/24_task_21_md_d.png', 'path': 'materials/imgs/MaRs_IB/24_task_21_md_d.png'},
    {'name': 'materials/imgs/less_than_high_school_selected.png', 'path': 'materials/imgs/less_than_high_school_selected.png'},
    {'name': 'materials/imgs/MaRs_IB/07_task_60_pd_c.png', 'path': 'materials/imgs/MaRs_IB/07_task_60_pd_c.png'},
    {'name': 'materials/review_cond.csv', 'path': 'materials/review_cond.csv'},
    {'name': 'materials/merge_sort/imgs/fruits/melon_I.png', 'path': 'materials/merge_sort/imgs/fruits/melon_I.png'},
    {'name': 'materials/merge_sort/imgs/fruits/apple_A.png', 'path': 'materials/merge_sort/imgs/fruits/apple_A.png'},
    {'name': 'materials/merge_sort/imgs/merge_train/merge_train_ex_2_2_correct_selected.png', 'path': 'materials/merge_sort/imgs/merge_train/merge_train_ex_2_2_correct_selected.png'},
    {'name': 'materials/imgs/MaRs_IB/30_task_55_md_b.png', 'path': 'materials/imgs/MaRs_IB/30_task_55_md_b.png'},
    {'name': 'materials/imgs/MaRs_IB/68_task_62_pd_a.png', 'path': 'materials/imgs/MaRs_IB/68_task_62_pd_a.png'},
    {'name': 'materials/merge_sort/imgs/merge_train/merge_train_ex_5_3_wrong_expl.png', 'path': 'materials/merge_sort/imgs/merge_train/merge_train_ex_5_3_wrong_expl.png'},
    {'name': 'materials/imgs/MaRs_IB/45_task_58_pd_a.png', 'path': 'materials/imgs/MaRs_IB/45_task_58_pd_a.png'},
    {'name': 'materials/imgs/other_gender_selected.png', 'path': 'materials/imgs/other_gender_selected.png'},
    {'name': 'materials/imgs/_35_44.png', 'path': 'materials/imgs/_35_44.png'},
    {'name': 'materials/imgs/_65.png', 'path': 'materials/imgs/_65.png'},
    {'name': 'materials/merge_sort/imgs/fruits/apple_E.png', 'path': 'materials/merge_sort/imgs/fruits/apple_E.png'},
    {'name': 'materials/merge_sort/imgs/merge_train/merge_train_ex_5_1_correct_expl.png', 'path': 'materials/merge_sort/imgs/merge_train/merge_train_ex_5_1_correct_expl.png'},
    {'name': 'materials/imgs/graduate.png', 'path': 'materials/imgs/graduate.png'},
    {'name': 'materials/merge_sort/imgs/fruits/apple_F.png', 'path': 'materials/merge_sort/imgs/fruits/apple_F.png'},
    {'name': 'materials/imgs/MaRs_IB/04_task_70_pd_a.png', 'path': 'materials/imgs/MaRs_IB/04_task_70_pd_a.png'},
    {'name': 'materials/merge_sort/imgs/fruits/banana_K.png', 'path': 'materials/merge_sort/imgs/fruits/banana_K.png'},
    {'name': 'materials/merge_sort/imgs/merge_train/merge_train_ex_1_1_wrong_expl.png', 'path': 'materials/merge_sort/imgs/merge_train/merge_train_ex_1_1_wrong_expl.png'},
    {'name': 'materials/merge_sort/imgs/sort_test/large_input_review.png', 'path': 'materials/merge_sort/imgs/sort_test/large_input_review.png'},
    {'name': 'materials/merge_sort/imgs/fruits/banana_I.png', 'path': 'materials/merge_sort/imgs/fruits/banana_I.png'},
    {'name': 'materials/imgs/MaRs_IB/26_task_68_pd_c.png', 'path': 'materials/imgs/MaRs_IB/26_task_68_pd_c.png'},
    {'name': 'materials/sort_train_cond.csv', 'path': 'materials/sort_train_cond.csv'},
    {'name': 'materials/merge_sort/imgs/merge_train/merge_train_ex_5_1_correct.png', 'path': 'materials/merge_sort/imgs/merge_train/merge_train_ex_5_1_correct.png'},
    {'name': 'materials/merge_sort/imgs/fruits/banana_J.png', 'path': 'materials/merge_sort/imgs/fruits/banana_J.png'},
    {'name': 'materials/imgs/MaRs_IB/00_task_08_pd_c.png', 'path': 'materials/imgs/MaRs_IB/00_task_08_pd_c.png'},
    {'name': 'materials/merge_sort/imgs/fruits/melon_K.png', 'path': 'materials/merge_sort/imgs/fruits/melon_K.png'},
    {'name': 'materials/imgs/MaRs_IB/00_task_10_pd_a.png', 'path': 'materials/imgs/MaRs_IB/00_task_10_pd_a.png'},
    {'name': 'materials/imgs/MaRs_IB/13_task_40_pd_c.png', 'path': 'materials/imgs/MaRs_IB/13_task_40_pd_c.png'},
    {'name': 'materials/merge_sort/imgs/fruits/apple_H.png', 'path': 'materials/merge_sort/imgs/fruits/apple_H.png'},
    {'name': 'materials/merge_sort/imgs/bob.png', 'path': 'materials/merge_sort/imgs/bob.png'},
    {'name': 'materials/merge_sort/imgs/merge_train/merge_train_ex_5_2_correct.png', 'path': 'materials/merge_sort/imgs/merge_train/merge_train_ex_5_2_correct.png'},
    {'name': 'materials/imgs/MaRs_IB/34_task_71_md_b.png', 'path': 'materials/imgs/MaRs_IB/34_task_71_md_b.png'},
    {'name': 'materials/merge_sort/imgs/merge_train/merge_train_ex_2_1_correct.png', 'path': 'materials/merge_sort/imgs/merge_train/merge_train_ex_2_1_correct.png'},
    {'name': 'materials/imgs/less_than_high_school.png', 'path': 'materials/imgs/less_than_high_school.png'},
    {'name': 'materials/merge_sort/imgs/fruits/melon_B.png', 'path': 'materials/merge_sort/imgs/fruits/melon_B.png'},
    {'name': 'materials/merge_sort/imgs/scale_right.png', 'path': 'materials/merge_sort/imgs/scale_right.png'},
    {'name': 'materials/merge_sort/imgs/merge_train/suboptimal_merge.png', 'path': 'materials/merge_sort/imgs/merge_train/suboptimal_merge.png'},
    {'name': 'materials/merge_sort/imgs/merge_train/merge_train_ex_1_1_correct_expl.png', 'path': 'materials/merge_sort/imgs/merge_train/merge_train_ex_1_1_correct_expl.png'},
    {'name': 'materials/merge_sort/imgs/fruits/banana_B.png', 'path': 'materials/merge_sort/imgs/fruits/banana_B.png'},
    {'name': 'materials/imgs/_18_24.png', 'path': 'materials/imgs/_18_24.png'},
    {'name': 'materials/merge_sort/imgs/merge_train/merge_train_ex_2_1_wrong.png', 'path': 'materials/merge_sort/imgs/merge_train/merge_train_ex_2_1_wrong.png'},
    {'name': 'materials/merge_sort/imgs/merge_train/merge_train_ex_2_2_correct.png', 'path': 'materials/merge_sort/imgs/merge_train/merge_train_ex_2_2_correct.png'},
    {'name': 'materials/merge_sort/imgs/merge_train/merge_train_ex_5_3_wrong.png', 'path': 'materials/merge_sort/imgs/merge_train/merge_train_ex_5_3_wrong.png'},
    {'name': 'materials/imgs/MaRs_IB/00_task_06_pd_a.png', 'path': 'materials/imgs/MaRs_IB/00_task_06_pd_a.png'},
    {'name': 'materials/imgs/bachelor.png', 'path': 'materials/imgs/bachelor.png'},
    {'name': 'materials/imgs/MaRs_IB/00_task_09_md_d.png', 'path': 'materials/imgs/MaRs_IB/00_task_09_md_d.png'},
    {'name': 'materials/merge_sort/imgs/alice.png', 'path': 'materials/merge_sort/imgs/alice.png'},
    {'name': 'materials/imgs/MaRs_IB/19_task_54_pd_a.png', 'path': 'materials/imgs/MaRs_IB/19_task_54_pd_a.png'},
    {'name': 'materials/merge_sort/imgs/merge_train/merge_train_example.png', 'path': 'materials/merge_sort/imgs/merge_train/merge_train_example.png'},
    {'name': 'materials/merge_sort/imgs/merge_test/merge_test_ex_5.png', 'path': 'materials/merge_sort/imgs/merge_test/merge_test_ex_5.png'},
    {'name': 'materials/merge_sort/imgs/fruits/banana_L.png', 'path': 'materials/merge_sort/imgs/fruits/banana_L.png'},
    {'name': 'materials/merge_sort/imgs/fruits/apple_K.png', 'path': 'materials/merge_sort/imgs/fruits/apple_K.png'},
    {'name': 'materials/imgs/MaRs_IB/63_task_57_md_d.png', 'path': 'materials/imgs/MaRs_IB/63_task_57_md_d.png'},
    {'name': 'materials/merge_sort/imgs/fruits/melon_L.png', 'path': 'materials/merge_sort/imgs/fruits/melon_L.png'},
    {'name': 'materials/merge_sort/imgs/compare.png', 'path': 'materials/merge_sort/imgs/compare.png'},
    {'name': 'materials/merge_sort/imgs/merge_train/merge_train_ex_2_1_correct_expl.png', 'path': 'materials/merge_sort/imgs/merge_train/merge_train_ex_2_1_correct_expl.png'},
    {'name': 'materials/imgs/MaRs_IB/40_task_48_pd_c.png', 'path': 'materials/imgs/MaRs_IB/40_task_48_pd_c.png'},
    {'name': 'materials/merge_sort/imgs/merge_train/merge_train_ex_2_1_wrong_expl.png', 'path': 'materials/merge_sort/imgs/merge_train/merge_train_ex_2_1_wrong_expl.png'},
    {'name': 'materials/merge_sort/imgs/fruits/melon_G.png', 'path': 'materials/merge_sort/imgs/fruits/melon_G.png'},
    {'name': 'materials/imgs/MaRs_IB/14_task_50_pd_a.png', 'path': 'materials/imgs/MaRs_IB/14_task_50_pd_a.png'},
    {'name': 'materials/imgs/MaRs_IB/42_task_79_md_b.png', 'path': 'materials/imgs/MaRs_IB/42_task_79_md_b.png'},
    {'name': 'materials/imgs/MaRs_IB/43_task_13_md_d.png', 'path': 'materials/imgs/MaRs_IB/43_task_13_md_d.png'},
    {'name': 'materials/merge_sort/imgs/fruits/melon_D.png', 'path': 'materials/merge_sort/imgs/fruits/melon_D.png'},
    {'name': 'materials/imgs/MaRs_IB/05_task_77_md_d.png', 'path': 'materials/imgs/MaRs_IB/05_task_77_md_d.png'},
    {'name': 'materials/merge_sort/imgs/fruits/banana_C.png', 'path': 'materials/merge_sort/imgs/fruits/banana_C.png'},
    {'name': 'materials/merge_sort/imgs/fruits/melon_H.png', 'path': 'materials/merge_sort/imgs/fruits/melon_H.png'},
    {'name': 'materials/imgs/MaRs_IB/62_task_31_md_b.png', 'path': 'materials/imgs/MaRs_IB/62_task_31_md_b.png'},
    {'name': 'materials/imgs/MaRs_IB/12_task_14_pd_a.png', 'path': 'materials/imgs/MaRs_IB/12_task_14_pd_a.png'},
    {'name': 'materials/imgs/MaRs_IB/fixation.png', 'path': 'materials/imgs/MaRs_IB/fixation.png'},
    {'name': 'materials/imgs/waiting.png', 'path': 'materials/imgs/waiting.png'},
    {'name': 'materials/merge_sort/imgs/fruits/melon_A.png', 'path': 'materials/merge_sort/imgs/fruits/melon_A.png'},
    {'name': 'materials/imgs/MaRs_IB/52_task_69_md_d.png', 'path': 'materials/imgs/MaRs_IB/52_task_69_md_d.png'},
    {'name': 'materials/imgs/MaRs_IB/37_task_78_pd_a.png', 'path': 'materials/imgs/MaRs_IB/37_task_78_pd_a.png'},
    {'name': 'materials/imgs/MaRs_IB/64_task_25_md_d.png', 'path': 'materials/imgs/MaRs_IB/64_task_25_md_d.png'},
    {'name': 'materials/merge_sort/imgs/merge_train/optimal_merge.png', 'path': 'materials/merge_sort/imgs/merge_train/optimal_merge.png'},
    {'name': 'materials/merge_sort/imgs/merge_train/merge_train_ex_2_2_wrong_expl.png', 'path': 'materials/merge_sort/imgs/merge_train/merge_train_ex_2_2_wrong_expl.png'},
    {'name': 'materials/imgs/_45_54.png', 'path': 'materials/imgs/_45_54.png'},
    {'name': 'materials/merge_sort/imgs/merge_train/merge_train_ex_5_1_wrong.png', 'path': 'materials/merge_sort/imgs/merge_train/merge_train_ex_5_1_wrong.png'},
    {'name': 'materials/merge_sort/imgs/merge_train/merge_train_ex_2_2_wrong.png', 'path': 'materials/merge_sort/imgs/merge_train/merge_train_ex_2_2_wrong.png'},
    {'name': 'materials/imgs/skip.png', 'path': 'materials/imgs/skip.png'},
    {'name': 'materials/merge_sort/imgs/fruits/melon_F.png', 'path': 'materials/merge_sort/imgs/fruits/melon_F.png'},
    {'name': 'materials/merge_sort/imgs/merge_train/merge_train_ex_1_1_wrong.png', 'path': 'materials/merge_sort/imgs/merge_train/merge_train_ex_1_1_wrong.png'},
    {'name': 'materials/imgs/_35_44_selected.png', 'path': 'materials/imgs/_35_44_selected.png'},
    {'name': 'materials/merge_sort/imgs/merge_train/merge_train_ex_1_1_wrong_selected.png', 'path': 'materials/merge_sort/imgs/merge_train/merge_train_ex_1_1_wrong_selected.png'},
    {'name': 'materials/merge_sort/imgs/merge_test/merge_test_ex_3.png', 'path': 'materials/merge_sort/imgs/merge_test/merge_test_ex_3.png'},
    {'name': 'materials/merge_sort/imgs/blue_star_door.png', 'path': 'materials/merge_sort/imgs/blue_star_door.png'},
    {'name': 'materials/merge_sort/imgs/sort_test/small_input_review.png', 'path': 'materials/merge_sort/imgs/sort_test/small_input_review.png'},
    {'name': 'materials/merge_sort/imgs/merge_train/merge_train_ex_2.png', 'path': 'materials/merge_sort/imgs/merge_train/merge_train_ex_2.png'},
    {'name': 'materials/imgs/MaRs_IB/28_task_66_pd_a.png', 'path': 'materials/imgs/MaRs_IB/28_task_66_pd_a.png'},
    {'name': 'materials/imgs/MaRs_IB/48_task_12_pd_c.png', 'path': 'materials/imgs/MaRs_IB/48_task_12_pd_c.png'},
    {'name': 'materials/merge_sort/imgs/merge_train/merge_train_ex_5.png', 'path': 'materials/merge_sort/imgs/merge_train/merge_train_ex_5.png'},
    {'name': 'materials/imgs/MaRs_IB/31_task_18_pd_a.png', 'path': 'materials/imgs/MaRs_IB/31_task_18_pd_a.png'},
    {'name': 'materials/pre_test_cond.csv', 'path': 'materials/pre_test_cond.csv'},
    {'name': 'materials/merge_sort/imgs/merge_train/merge_train_ex_1_1_correct.png', 'path': 'materials/merge_sort/imgs/merge_train/merge_train_ex_1_1_correct.png'},
    {'name': 'materials/merge_sort/imgs/merge_train/merge_train_ex_2_1_correct_selected.png', 'path': 'materials/merge_sort/imgs/merge_train/merge_train_ex_2_1_correct_selected.png'},
    {'name': 'materials/imgs/MaRs_IB/23_task_72_pd_c.png', 'path': 'materials/imgs/MaRs_IB/23_task_72_pd_c.png'},
    {'name': 'materials/imgs/MaRs_IB/02_task_38_pd_a.png', 'path': 'materials/imgs/MaRs_IB/02_task_38_pd_a.png'},
    {'name': 'materials/imgs/MaRs_IB/11_task_65_md_d.png', 'path': 'materials/imgs/MaRs_IB/11_task_65_md_d.png'},
    {'name': 'materials/merge_sort/imgs/merge_train/merge_train_ex_5_3_correct_expl.png', 'path': 'materials/merge_sort/imgs/merge_train/merge_train_ex_5_3_correct_expl.png'},
    {'name': 'materials/merge_sort/imgs/merge_train/merge_train_ex_5_3_correct.png', 'path': 'materials/merge_sort/imgs/merge_train/merge_train_ex_5_3_correct.png'},
    {'name': 'materials/merge_sort/imgs/fruits/banana_G.png', 'path': 'materials/merge_sort/imgs/fruits/banana_G.png'},
    {'name': 'materials/merge_sort/imgs/scale_left.png', 'path': 'materials/merge_sort/imgs/scale_left.png'},
    {'name': 'materials/imgs/MaRs_IB/00_task_05_md_d.png', 'path': 'materials/imgs/MaRs_IB/00_task_05_md_d.png'},
    {'name': 'materials/imgs/high_school_equivalent.png', 'path': 'materials/imgs/high_school_equivalent.png'},
    {'name': 'materials/imgs/MaRs_IB/25_task_32_pd_c.png', 'path': 'materials/imgs/MaRs_IB/25_task_32_pd_c.png'},
    {'name': 'materials/merge_sort/imgs/fruits/banana_F.png', 'path': 'materials/merge_sort/imgs/fruits/banana_F.png'},
    {'name': 'materials/imgs/MaRs_IB/09_task_73_md_d.png', 'path': 'materials/imgs/MaRs_IB/09_task_73_md_d.png'},
    {'name': 'materials/imgs/submit.png', 'path': 'materials/imgs/submit.png'},
    {'name': 'materials/merge_sort/imgs/fruits/melon.png', 'path': 'materials/merge_sort/imgs/fruits/melon.png'},
    {'name': 'materials/imgs/_65_selected.png', 'path': 'materials/imgs/_65_selected.png'},
    {'name': 'materials/imgs/MaRs_IB/32_task_41_md_d.png', 'path': 'materials/imgs/MaRs_IB/32_task_41_md_d.png'},
    {'name': 'materials/imgs/MaRs_IB/08_task_11_md_b.png', 'path': 'materials/imgs/MaRs_IB/08_task_11_md_b.png'},
    {'name': 'materials/imgs/MaRs_IB/60_task_17_md_d.png', 'path': 'materials/imgs/MaRs_IB/60_task_17_md_d.png'},
    {'name': 'materials/imgs/MaRs_IB/06_task_53_md_d.png', 'path': 'materials/imgs/MaRs_IB/06_task_53_md_d.png'},
    {'name': 'materials/merge_sort/imgs/purple_diamond_door.png', 'path': 'materials/merge_sort/imgs/purple_diamond_door.png'},
    {'name': 'materials/merge_sort/imgs/fruits/apple_J.png', 'path': 'materials/merge_sort/imgs/fruits/apple_J.png'},
    {'name': 'materials/merge_sort/imgs/merge_train/merge_train_ex_2_2_correct_expl.png', 'path': 'materials/merge_sort/imgs/merge_train/merge_train_ex_2_2_correct_expl.png'},
    {'name': 'materials/imgs/college.png', 'path': 'materials/imgs/college.png'},
    {'name': 'materials/merge_sort/imgs/grey_BG.png', 'path': 'materials/merge_sort/imgs/grey_BG.png'},
    {'name': 'materials/merge_sort/imgs/fruits/banana_D.png', 'path': 'materials/merge_sort/imgs/fruits/banana_D.png'},
    {'name': 'materials/imgs/_55_64_selected.png', 'path': 'materials/imgs/_55_64_selected.png'},
    {'name': 'materials/imgs/MaRs_IB/15_task_74_pd_a.png', 'path': 'materials/imgs/MaRs_IB/15_task_74_pd_a.png'},
    {'name': 'materials/merge_sort/imgs/merge_train/merge_train_ex_5_1_wrong_expl.png', 'path': 'materials/merge_sort/imgs/merge_train/merge_train_ex_5_1_wrong_expl.png'},
    {'name': 'materials/merge_sort/imgs/fruits/apple_B.png', 'path': 'materials/merge_sort/imgs/fruits/apple_B.png'},
    {'name': 'materials/merge_sort/imgs/merge_train/suboptimal_merge_example.png', 'path': 'materials/merge_sort/imgs/merge_train/suboptimal_merge_example.png'},
    {'name': 'materials/imgs/MaRs_IB/10_task_26_pd_a.png', 'path': 'materials/imgs/MaRs_IB/10_task_26_pd_a.png'},
    {'name': 'materials/merge_sort/imgs/merge_train/merge_train_ex_5_2_wrong_selected.png', 'path': 'materials/merge_sort/imgs/merge_train/merge_train_ex_5_2_wrong_selected.png'},
    {'name': 'materials/imgs/MaRs_IB/61_task_52_pd_c.png', 'path': 'materials/imgs/MaRs_IB/61_task_52_pd_c.png'},
    {'name': 'materials/imgs/prefer_not_to_say_selected.png', 'path': 'materials/imgs/prefer_not_to_say_selected.png'},
    {'name': 'materials/imgs/female.png', 'path': 'materials/imgs/female.png'},
    {'name': 'materials/merge_sort/imgs/fruits/apple.png', 'path': 'materials/merge_sort/imgs/fruits/apple.png'},
    {'name': 'materials/merge_sort/imgs/merge_train/optimal_merge_example.png', 'path': 'materials/merge_sort/imgs/merge_train/optimal_merge_example.png'},
    {'name': 'materials/merge_sort/imgs/fruits/banana.png', 'path': 'materials/merge_sort/imgs/fruits/banana.png'},
    {'name': 'materials/imgs/MaRs_IB/44_task_75_md_b.png', 'path': 'materials/imgs/MaRs_IB/44_task_75_md_b.png'},
    {'name': 'materials/imgs/MaRs_IB/59_task_29_md_d.png', 'path': 'materials/imgs/MaRs_IB/59_task_29_md_d.png'},
    {'name': 'materials/imgs/MaRs_IB/38_task_76_pd_c.png', 'path': 'materials/imgs/MaRs_IB/38_task_76_pd_c.png'},
    {'name': 'materials/imgs/MaRs_IB/54_task_47_md_b.png', 'path': 'materials/imgs/MaRs_IB/54_task_47_md_b.png'},
    {'name': 'materials/imgs/_25_34.png', 'path': 'materials/imgs/_25_34.png'},
    {'name': 'materials/merge_sort/imgs/fruits/apple_G.png', 'path': 'materials/merge_sort/imgs/fruits/apple_G.png'},
    {'name': 'materials/merge_sort/imgs/fruits/melon_J.png', 'path': 'materials/merge_sort/imgs/fruits/melon_J.png'},
    {'name': 'materials/merge_sort/imgs/fruits/banana_A.png', 'path': 'materials/merge_sort/imgs/fruits/banana_A.png'},
    {'name': 'materials/imgs/MaRs_IB/66_task_51_md_b.png', 'path': 'materials/imgs/MaRs_IB/66_task_51_md_b.png'},
    {'name': 'materials/imgs/MaRs_IB/17_task_45_md_d.png', 'path': 'materials/imgs/MaRs_IB/17_task_45_md_d.png'},
    {'name': 'materials/imgs/MaRs_IB/01_task_19_md_b.png', 'path': 'materials/imgs/MaRs_IB/01_task_19_md_b.png'},
    {'name': 'materials/imgs/MaRs_IB/39_task_20_pd_c.png', 'path': 'materials/imgs/MaRs_IB/39_task_20_pd_c.png'},
    {'name': 'materials/imgs/MaRs_IB/67_task_67_md_b.png', 'path': 'materials/imgs/MaRs_IB/67_task_67_md_b.png'},
    {'name': 'materials/merge_sort/imgs/fruits/melon_C.png', 'path': 'materials/merge_sort/imgs/fruits/melon_C.png'},
    {'name': 'materials/merge_sort/imgs/merge_train/merge_train_ex_5_2_wrong_expl.png', 'path': 'materials/merge_sort/imgs/merge_train/merge_train_ex_5_2_wrong_expl.png'},
    {'name': 'materials/merge_sort/imgs/merge_train/merge_train_ex_5_3_wrong_selected.png', 'path': 'materials/merge_sort/imgs/merge_train/merge_train_ex_5_3_wrong_selected.png'},
    {'name': 'materials/merge_sort/imgs/merge_train/merge_train_ex_5_3_correct_selected.png', 'path': 'materials/merge_sort/imgs/merge_train/merge_train_ex_5_3_correct_selected.png'},
    {'name': 'materials/imgs/female_selected.png', 'path': 'materials/imgs/female_selected.png'},
    {'name': 'materials/imgs/MaRs_IB/00_task_07_md_b.png', 'path': 'materials/imgs/MaRs_IB/00_task_07_md_b.png'},
    {'name': 'materials/merge_test_cond.csv', 'path': 'materials/merge_test_cond.csv'},
    {'name': 'materials/merge_sort/imgs/merge_train/merge_train_ex_1.png', 'path': 'materials/merge_sort/imgs/merge_train/merge_train_ex_1.png'},
    {'name': 'materials/imgs/MaRs_IB/20_task_35_md_b.png', 'path': 'materials/imgs/MaRs_IB/20_task_35_md_b.png'},
    {'name': 'materials/merge_sort/imgs/blue_star_clicked.png', 'path': 'materials/merge_sort/imgs/blue_star_clicked.png'},
    {'name': 'materials/imgs/MaRs_IB/16_task_43_md_b.png', 'path': 'materials/imgs/MaRs_IB/16_task_43_md_b.png'},
    {'name': 'materials/merge_sort/imgs/merge_train/merge_train_ex_5_1_wrong_selected.png', 'path': 'materials/merge_sort/imgs/merge_train/merge_train_ex_5_1_wrong_selected.png'},
    {'name': 'materials/imgs/MaRs_IB/00_task_03_md_b.png', 'path': 'materials/imgs/MaRs_IB/00_task_03_md_b.png'},
    {'name': 'materials/merge_sort/imgs/merge_train/merge_train_ex_5_2_correct_selected.png', 'path': 'materials/merge_sort/imgs/merge_train/merge_train_ex_5_2_correct_selected.png'},
    {'name': 'materials/merge_sort/imgs/merge_test/merge_test_ex_2.png', 'path': 'materials/merge_sort/imgs/merge_test/merge_test_ex_2.png'}
  ]
});

psychoJS.experimentLogger.setLevel(core.Logger.ServerLevel.EXP);


var frameDur;
async function updateInfo() {
  expInfo['date'] = util.MonotonicClock.getDateStr();  // add a simple timestamp
  expInfo['expName'] = expName;
  expInfo['psychopyVersion'] = '2021.2.3';
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


var CONSENTClock;
var consent;
var consent_check;
var progressBar;
var PRE_TEST_INTROClock;
var pre_test_intro;
var pre_test_intro_btn;
var pre_test_intro_mouse;
var PRE_TEST_TRAINClock;
var pre_test_train_item;
var pre_test_train_whitescreen;
var pre_test_train_fixation;
var pre_test_train_slider;
var pre_test_train_mouse;
var pre_test_train_timer;
var pre_test_train_counter_1;
var pre_test_train_counter_2;
var pre_test_train_instr;
var pre_test_train_feedback;
var pre_test_train_mark;
var PRE_TESTClock;
var pre_test_item;
var pre_test_whitescreen;
var pre_test_fixation;
var pre_test_slider;
var pre_test_mouse;
var pre_test_timer;
var pre_test_instr;
var pre_test_counter;
var pre_test_mark;
var BREAK_1Clock;
var break_1_instr;
var break_1_mouse;
var break_1_btn;
var INTROClock;
var intro_text;
var alice;
var bob;
var blue_star_door;
var purple_diamond_door;
var intro_btn;
var intro_mouse;
var HINTClock;
var intro_text_8;
var arrow;
var alice_5;
var bob_5;
var blue_star_door_2;
var purple_diamond_door_2;
var hint_btn;
var hint_mouse;
var SORT_INTROClock;
var intro_text_3;
var bob_2;
var sort_example;
var purple_diamond_door_3;
var sort_intro_btn;
var sort_intro_mouse;
var SORT_TRAINClock;
var sort_train_scale_instr;
var sort_train_ans_instr;
var sort_train_instr;
var sort_train_scale_right;
var sort_train_scale_left;
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
var sort_train_compare;
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
var sort_expl_compare;
var sort_expl_mouse;
var sort_expl_timer;
var sort_expl_hint;
var MERGE_INTROClock;
var intro_text_2;
var alice_2;
var merge_example;
var blue_star_door_3;
var merge_intro_btn;
var merge_intro_mouse;
var MERGE_TRAINClock;
var merge_train_scale_instr;
var merge_ans_instr;
var merge_train_instr;
var merge_train_scale_right;
var merge_train_scale_left;
var merge_train_sep;
var merge_train;
var merge_train_mc_1;
var merge_train_mc_2;
var merge_train_scale;
var merge_train_btn_1;
var merge_train_btn_2;
var merge_train_compare;
var merge_train_mouse;
var merge_train_timer;
var MERGE_EXPLClock;
var merge_expl_initial_state;
var merge_expl_feedback;
var merge_expl_feedback_1;
var merge_expl_feedback_2;
var merge_expl_ex;
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
var blue_star_door_4;
var merge_test_intro_btn;
var merge_test_intro_mouse;
var MERGE_TESTClock;
var merge_test_scale_instr;
var merge_test_ans_instr;
var merge_test_instr;
var merge_test_scale_right;
var merge_test_scale_left;
var merge_test_sep;
var merge_test;
var merge_test_scale;
var merge_test_btn;
var merge_test_compare;
var merge_test_mouse;
var merge_test_timer;
var BREAK_2Clock;
var break_2_instr;
var break_2_mouse;
var break_2_btn;
var SORT_TEST_INTROClock;
var intro_text_7;
var bob_4;
var sort_example_2;
var purple_diamond_door_4;
var sort_test_intro_btn;
var sort_test_intro_mouse;
var SORT_TESTClock;
var sort_test_scale_instr;
var sort_test_ans_instr;
var sort_test_instr;
var sort_test_scale_right;
var sort_test_scale_left;
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
var sort_test_compare;
var sort_test_mouse;
var sort_test_timer;
var REVIEW_QUESTIONSClock;
var review_question;
var review_img_1;
var review_img_2;
var review_btn;
var review_res;
var review_mouse;
var review_timer;
var EXP_CHECKClock;
var exp_check_question;
var exp_check_res;
var exp_check_btn;
var exp_check_mouse;
var exp_check_slider;
var BACKGROUNDClock;
var background_instr;
var gender;
var prefer_not_to_say;
var other_gender;
var female;
var male;
var age;
var _18_24;
var _25_34;
var _35_44;
var _45_54;
var _55_64;
var _65;
var education;
var less_than_high_school;
var high_school_equivalent;
var college;
var bachelor;
var graduate;
var doctorate;
var other;
var background_btn;
var background_mouse;
var DEBRIEFClock;
var globalClock;
var routineTimer;
async function experimentInit() {
  // Initialize components for Routine "CONSENT"
  CONSENTClock = new util.Clock();
  consent = new visual.TextStim({
    win: psychoJS.window,
    name: 'consent',
    text: 'Your answers will be stored ANONYMOUSLY and you will not be asked for any information that can be used to identify you. Your participation in this study is completely VOLUNTARY and you can WITHDRAW at any time by PRESSING the ESC key TWICE.\n\nBy clicking “I agree” below you are indicating that you are AT LEAST 18 YEARS OLD, have read and understood this consent form and agree to participate in this research study.',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.03,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('yellow'),  opacity: undefined,
    depth: 0.0 
  });
  
  consent_check = new visual.Slider({
    win: psychoJS.window, name: 'consent_check',
    size: [0.5, 0.02], pos: [0, (- 0.35)], units: 'height',
    labels: ["I agree", "Exit"], ticks: [1, 2],
    granularity: 1.0, style: ["RADIO"],
    color: new util.Color('white'), markerColor: new util.Color('Red'), lineColor: new util.Color('White'), 
    fontFamily: 'Open Sans', bold: true, italic: false, depth: -1, 
    flip: false,
  });
  
  window.startHTML = (src) => {
      $('body').append('<iframe id="iframe" src="' + src +'" style="width: 100%; height: 100%; position:absolute;z-index:1;top:0;left:0;border:0;"></iframe>');    
      window.finishedHTML = false;
  };
      
  window.finishHTML = () => {
      $('#iframe').remove();
      window.finishedHTML = true;
  };
  progressBar = new ProgressBar(expSetup);
  // Initialize components for Routine "PRE_TEST_INTRO"
  PRE_TEST_INTROClock = new util.Clock();
  pre_test_intro = new visual.TextStim({
    win: psychoJS.window,
    name: 'pre_test_intro',
    text: 'In the following section, you will be shown 3x3 tiles containing patterns of shapes. \n\nThey relate to each other in one or more of these aspects: colour, size, position and shape. CHOOSE one of the 4 provided options that will correctly complete the 3x3 tiles.\n\nThere will be practice at the beginning followed by a test with harder questions. Try to answer as many as you can!',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.03,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
  pre_test_intro_btn = new visual.ImageStim({
    win : psychoJS.window,
    name : 'pre_test_intro_btn', units : undefined, 
    image : 'materials/imgs/continue.png', mask : undefined,
    ori : 0.0, pos : [0, (- 0.4)], size : [0.28, 0.1],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -1.0 
  });
  pre_test_intro_mouse = new core.Mouse({
    win: psychoJS.window,
  });
  pre_test_intro_mouse.mouseClock = new util.Clock();
  // Initialize components for Routine "PRE_TEST_TRAIN"
  PRE_TEST_TRAINClock = new util.Clock();
  pre_test_train_item = new visual.ImageStim({
    win : psychoJS.window,
    name : 'pre_test_train_item', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, 0.06], size : [0.66, 0.72],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : 0.0 
  });
  pre_test_train_whitescreen = new visual.ImageStim({
    win : psychoJS.window,
    name : 'pre_test_train_whitescreen', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, 0.06], size : [0.66, 0.72],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -1.0 
  });
  pre_test_train_fixation = new visual.ImageStim({
    win : psychoJS.window,
    name : 'pre_test_train_fixation', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, 0.06], size : [0.66, 0.72],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -2.0 
  });
  pre_test_train_slider = new visual.Slider({
    win: psychoJS.window, name: 'pre_test_train_slider',
    size: [0.48, 0.04], pos: [0, (- 0.4)], units: 'height',
    labels: undefined, ticks: [1, 2, 3, 4],
    granularity: 1.0, style: ["RADIO"],
    color: new util.Color('white'), markerColor: new util.Color('black'), lineColor: new util.Color('white'), 
    fontFamily: 'Open Sans', bold: true, italic: false, depth: -3, 
    flip: false,
  });
  
  pre_test_train_mouse = new core.Mouse({
    win: psychoJS.window,
  });
  pre_test_train_mouse.mouseClock = new util.Clock();
  pre_test_train_timer = new visual.TextStim({
    win: psychoJS.window,
    name: 'pre_test_train_timer',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [0.6, (- 0.3)], height: 0.03,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('orange'),  opacity: undefined,
    depth: -5.0 
  });
  
  pre_test_train_counter_1 = new visual.TextStim({
    win: psychoJS.window,
    name: 'pre_test_train_counter_1',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [0.6, 0.1], height: 0.03,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: -6.0 
  });
  
  pre_test_train_counter_2 = new visual.TextStim({
    win: psychoJS.window,
    name: 'pre_test_train_counter_2',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [0.6, 0], height: 0.03,  wrapWidth: 0.4, ori: 0.0,
    color: new util.Color('yellow'),  opacity: undefined,
    depth: -7.0 
  });
  
  pre_test_train_instr = new visual.TextStim({
    win: psychoJS.window,
    name: 'pre_test_train_instr',
    text: 'The 3x3 tiles relate to each other in one or more of these aspects: \n\ncolour, size, position and shape. \n\nCHOOSE one of the 4 provided options (A/B/C/D) that will correctly complete the tiles by REPLACING the "?".\n\nYou have 30 SECS for each question!',
    font: 'Open Sans',
    units: undefined, 
    pos: [(- 0.6), 0], height: 0.03,  wrapWidth: 0.4, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: -8.0 
  });
  
  pre_test_train_feedback = new visual.TextStim({
    win: psychoJS.window,
    name: 'pre_test_train_feedback',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [0.6, (- 0.2)], height: 0.03,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('yellow'),  opacity: undefined,
    depth: -9.0 
  });
  
  pre_test_train_mark = new visual.TextStim({
    win: psychoJS.window,
    name: 'pre_test_train_mark',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [0.15, 0.02], height: 0.1,  wrapWidth: 0.4, ori: 0.0,
    color: new util.Color('black'),  opacity: undefined,
    depth: -10.0 
  });
  
  // Initialize components for Routine "PRE_TEST"
  PRE_TESTClock = new util.Clock();
  pre_test_item = new visual.ImageStim({
    win : psychoJS.window,
    name : 'pre_test_item', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, 0.06], size : [0.66, 0.72],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : 0.0 
  });
  pre_test_whitescreen = new visual.ImageStim({
    win : psychoJS.window,
    name : 'pre_test_whitescreen', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, 0.06], size : [0.66, 0.72],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -1.0 
  });
  pre_test_fixation = new visual.ImageStim({
    win : psychoJS.window,
    name : 'pre_test_fixation', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, 0.06], size : [0.66, 0.72],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -2.0 
  });
  pre_test_slider = new visual.Slider({
    win: psychoJS.window, name: 'pre_test_slider',
    size: [0.48, 0.04], pos: [0, (- 0.4)], units: 'height',
    labels: undefined, ticks: [1, 2, 3, 4],
    granularity: 1.0, style: ["RADIO"],
    color: new util.Color('white'), markerColor: new util.Color('black'), lineColor: new util.Color('white'), 
    fontFamily: 'Open Sans', bold: true, italic: false, depth: -3, 
    flip: false,
  });
  
  pre_test_mouse = new core.Mouse({
    win: psychoJS.window,
  });
  pre_test_mouse.mouseClock = new util.Clock();
  pre_test_timer = new visual.TextStim({
    win: psychoJS.window,
    name: 'pre_test_timer',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [0.6, (- 0.3)], height: 0.03,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('orange'),  opacity: undefined,
    depth: -5.0 
  });
  
  pre_test_instr = new visual.TextStim({
    win: psychoJS.window,
    name: 'pre_test_instr',
    text: 'The 3x3 tiles relate to each other in one or more of these aspects: \n\ncolour, size, position and shape. \n\nCHOOSE one of the 4 provided options (A/B/C/D) that will correctly complete the tiles by REPLACING the "?".\n\nYou have 30 SECS for each question!',
    font: 'Open Sans',
    units: undefined, 
    pos: [(- 0.6), 0], height: 0.03,  wrapWidth: 0.4, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: -6.0 
  });
  
  pre_test_counter = new visual.TextStim({
    win: psychoJS.window,
    name: 'pre_test_counter',
    text: 'Test question',
    font: 'Open Sans',
    units: undefined, 
    pos: [0.6, 0], height: 0.03,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: -7.0 
  });
  
  pre_test_mark = new visual.TextStim({
    win: psychoJS.window,
    name: 'pre_test_mark',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [0.15, 0.02], height: 0.1,  wrapWidth: 0.4, ori: 0.0,
    color: new util.Color('black'),  opacity: undefined,
    depth: -8.0 
  });
  
  // Initialize components for Routine "BREAK_1"
  BREAK_1Clock = new util.Clock();
  break_1_instr = new visual.TextStim({
    win: psychoJS.window,
    name: 'break_1_instr',
    text: 'You may take a short break now!\n\nPlease do not refresh/close the browser tab or leave your device to sleep.\n\nClick the "Continue" button below when you are ready to proceed!',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0.0], height: 0.03,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('yellow'),  opacity: undefined,
    depth: 0.0 
  });
  
  break_1_mouse = new core.Mouse({
    win: psychoJS.window,
  });
  break_1_mouse.mouseClock = new util.Clock();
  break_1_btn = new visual.ImageStim({
    win : psychoJS.window,
    name : 'break_1_btn', units : undefined, 
    image : 'materials/imgs/continue.png', mask : undefined,
    ori : 0.0, pos : [0, (- 0.4)], size : [0.28, 0.1],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -2.0 
  });
  // Initialize components for Routine "INTRO"
  INTROClock = new util.Clock();
  intro_text = new visual.TextStim({
    win: psychoJS.window,
    name: 'intro_text',
    text: 'Today, you will learn how to help our robot friends ALICE & BOB to package fruits for shipment. \n\nYou will visit two warehouses "rooms", learn and perform the BLUE STAR operator and the PURPLE DIAMOND operator. \n\nALICE and BOB will first help you learn these operators and then test your knowledge afterwards.',
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
  blue_star_door = new visual.ImageStim({
    win : psychoJS.window,
    name : 'blue_star_door', units : undefined, 
    image : 'materials/merge_sort/imgs/blue_star_door.png', mask : undefined,
    ori : 0.0, pos : [(- 0.4), 0.2], size : [0.15, 0.35],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -3.0 
  });
  purple_diamond_door = new visual.ImageStim({
    win : psychoJS.window,
    name : 'purple_diamond_door', units : undefined, 
    image : 'materials/merge_sort/imgs/purple_diamond_door.png', mask : undefined,
    ori : 0.0, pos : [0.4, 0.2], size : [0.15, 0.35],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -4.0 
  });
  intro_btn = new visual.ImageStim({
    win : psychoJS.window,
    name : 'intro_btn', units : undefined, 
    image : 'materials/imgs/continue.png', mask : undefined,
    ori : 0.0, pos : [0, (- 0.4)], size : [0.28, 0.1],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -5.0 
  });
  intro_mouse = new core.Mouse({
    win: psychoJS.window,
  });
  intro_mouse.mouseClock = new util.Clock();
  // Initialize components for Routine "HINT"
  HINTClock = new util.Clock();
  intro_text_8 = new visual.TextStim({
    win: psychoJS.window,
    name: 'intro_text_8',
    text: "*** What ALICE teaches you about the BLUE STAR might help you better learn and work through BOB's PURPLE DIAMOND ***",
    font: 'Open Sans',
    units: undefined, 
    pos: [0, (- 0.15)], height: 0.03,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
  arrow = new visual.ImageStim({
    win : psychoJS.window,
    name : 'arrow', units : undefined, 
    image : 'materials/imgs/arrow.png', mask : undefined,
    ori : 0.0, pos : [0, 0.2], size : [0.3, 0.2],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -1.0 
  });
  alice_5 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'alice_5', units : undefined, 
    image : 'materials/merge_sort/imgs/alice.png', mask : undefined,
    ori : 0.0, pos : [(- 0.3), 0.2], size : [0.2, 0.2],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -2.0 
  });
  bob_5 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'bob_5', units : undefined, 
    image : 'materials/merge_sort/imgs/bob.png', mask : undefined,
    ori : 0.0, pos : [0.3, 0.2], size : [0.2, 0.2],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -3.0 
  });
  blue_star_door_2 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'blue_star_door_2', units : undefined, 
    image : 'materials/merge_sort/imgs/blue_star_door.png', mask : undefined,
    ori : 0.0, pos : [(- 0.5), 0.2], size : [0.15, 0.35],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -4.0 
  });
  purple_diamond_door_2 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'purple_diamond_door_2', units : undefined, 
    image : 'materials/merge_sort/imgs/purple_diamond_door.png', mask : undefined,
    ori : 0.0, pos : [0.5, 0.2], size : [0.15, 0.35],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -5.0 
  });
  hint_btn = new visual.ImageStim({
    win : psychoJS.window,
    name : 'hint_btn', units : undefined, 
    image : 'materials/imgs/continue.png', mask : undefined,
    ori : 0.0, pos : [0, (- 0.4)], size : [0.28, 0.1],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -6.0 
  });
  hint_mouse = new core.Mouse({
    win: psychoJS.window,
  });
  hint_mouse.mouseClock = new util.Clock();
  // Initialize components for Routine "SORT_INTRO"
  SORT_INTROClock = new util.Clock();
  intro_text_3 = new visual.TextStim({
    win: psychoJS.window,
    name: 'intro_text_3',
    text: 'BOB: CLIKKKK ... SOOO GOOooD to see you!\n\n1. You need to arrange a PILE of fruits that is most likely UNORDERED\n\n2. The PURPLE DIAMOND arranges fruits from the PILE into the SHIPPING CRATE in INCREASING weights from LEFT to RIGHT\n\nLEARN the PURPLE DIAMOND with BOB and use the information provided by BOB as a reference. ',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, (- 0.15)], height: 0.03,  wrapWidth: 1.2, ori: 0.0,
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
  purple_diamond_door_3 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'purple_diamond_door_3', units : undefined, 
    image : 'materials/merge_sort/imgs/purple_diamond_door.png', mask : undefined,
    ori : 0.0, pos : [0.45, 0.25], size : [0.15, 0.35],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -3.0 
  });
  sort_intro_btn = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_intro_btn', units : undefined, 
    image : 'materials/imgs/continue.png', mask : undefined,
    ori : 0.0, pos : [0, (- 0.4)], size : [0.28, 0.1],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -4.0 
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
    pos: [(- 0.65), 0.45], height: 1.0,  wrapWidth: 0.3, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: -7.0 
  });
  
  sort_train_ans_instr = new visual.TextStim({
    win: psychoJS.window,
    name: 'sort_train_ans_instr',
    text: 'Put fruits on the SHIPPING CRATE by entering their labels one by one into the following boxes with WEIGHT INCREASING from LEFT to RIGHT',
    font: 'Open Sans',
    units: undefined, 
    pos: [(- 0.25), (- 0.22)], height: 0.025,  wrapWidth: 0.9, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: -8.0 
  });
  
  sort_train_instr = new visual.TextStim({
    win: psychoJS.window,
    name: 'sort_train_instr',
    text: '1. Use the scale on the left to COMPARE weights of TWO fruits by entering the alphabetic CAPITAL labels\n\n2. You are given a PILE of fruits that is most likely UNORDERED and you can move fruits freely on the MONITOR in the middle to help you arrange fruits\n\n3. The PURPLE DIAMOND puts fruits from the PILE into the SHIPPING CRATE in INCREASING weights from LEFT to RIGHT\n\n4. You can see the NUMBER OF COMPARISONS BOB uses as a reference and you have 300 SECS to SUBMIT!',
    font: 'Open Sans',
    units: undefined, 
    pos: [0.65, 0.2], height: 0.02,  wrapWidth: 0.4, ori: 0.0,
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
  
  sort_train_sep = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_train_sep', units : undefined, 
    image : 'materials/merge_sort/imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [0, (- 0.15)], size : [1.5, 0.005],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -12.0 
  });
  sort_train_board = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_train_board', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, 0.2], size : [0.8, 0.5],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -13.0 
  });
  sort_train_scale = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_train_scale', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [(- 0.65), 0.15], size : [0.3, 0.3],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -14.0 
  });
  sort_train_ex_1 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_train_ex_1', units : undefined, 
    image : 'materials/merge_sort/imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -15.0 
  });
  sort_train_ex_2 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_train_ex_2', units : undefined, 
    image : 'materials/merge_sort/imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -16.0 
  });
  sort_train_ex_3 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_train_ex_3', units : undefined, 
    image : 'materials/merge_sort/imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -17.0 
  });
  sort_train_ex_4 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_train_ex_4', units : undefined, 
    image : 'materials/merge_sort/imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -18.0 
  });
  sort_train_ex_5 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_train_ex_5', units : undefined, 
    image : 'materials/merge_sort/imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -19.0 
  });
  sort_train_ex_6 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_train_ex_6', units : undefined, 
    image : 'materials/merge_sort/imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -20.0 
  });
  sort_train_ex_7 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_train_ex_7', units : undefined, 
    image : 'materials/merge_sort/imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -21.0 
  });
  sort_train_ex_8 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_train_ex_8', units : undefined, 
    image : 'materials/merge_sort/imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -22.0 
  });
  sort_train_ex_9 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_train_ex_9', units : undefined, 
    image : 'materials/merge_sort/imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -23.0 
  });
  sort_train_ex_10 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_train_ex_10', units : undefined, 
    image : 'materials/merge_sort/imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -24.0 
  });
  sort_train_ex_11 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_train_ex_11', units : undefined, 
    image : 'materials/merge_sort/imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -25.0 
  });
  sort_train_ex_12 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_train_ex_12', units : undefined, 
    image : 'materials/merge_sort/imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -26.0 
  });
  sort_train_btn = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_train_btn', units : undefined, 
    image : 'materials/imgs/submit.png', mask : undefined,
    ori : 0.0, pos : [0.5, (- 0.35)], size : [0.24, 0.1],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -27.0 
  });
  sort_train_compare = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_train_compare', units : undefined, 
    image : 'materials/merge_sort/imgs/compare.png', mask : undefined,
    ori : 0.0, pos : [(- 0.65), (- 0.05)], size : [0.16, 0.07],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -28.0 
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
    depth: -30.0 
  });
  
  sort_train_hint = new visual.TextStim({
    win: psychoJS.window,
    name: 'sort_train_hint',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [0.5, (- 0.22)], height: 0.04,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('yellow'),  opacity: undefined,
    depth: -31.0 
  });
  
  // Initialize components for Routine "SORT_EXPL"
  SORT_EXPLClock = new util.Clock();
  sort_expl_scale_instr = new visual.TextStim({
    win: psychoJS.window,
    name: 'sort_expl_scale_instr',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [(- 0.65), 0.45], height: 1.0,  wrapWidth: 0.3, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: -6.0 
  });
  
  sort_expl_feedback_1 = new visual.TextStim({
    win: psychoJS.window,
    name: 'sort_expl_feedback_1',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [(- 0.25), (- 0.18)], height: 0.03,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: -7.0 
  });
  
  sort_expl_feedback_2 = new visual.TextStim({
    win: psychoJS.window,
    name: 'sort_expl_feedback_2',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [(- 0.25), (- 0.25)], height: 0.03,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: -8.0 
  });
  
  sort_expl_instr = new visual.TextStim({
    win: psychoJS.window,
    name: 'sort_expl_instr',
    text: '1. Use the scale on the left to COMPARE weights of TWO fruits by entering the alphabetic CAPITAL labels\n\n2. READ the feedback and CHECK the provided answer with yours\n\n3. You can move fruits freely on the MONITOR in the middle to understand the answer and CONTINUE if you are ready\n\nYou have 60 SECS to spare!',
    font: 'Open Sans',
    units: undefined, 
    pos: [0.65, 0.2], height: 0.025,  wrapWidth: 0.4, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: -9.0 
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
    depth: -10.0 
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
    depth: -11.0 
  });
  
  sort_expl_sep = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_expl_sep', units : undefined, 
    image : 'materials/merge_sort/imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [0, (- 0.15)], size : [1.5, 0.005],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -12.0 
  });
  sort_expl_board = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_expl_board', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, 0.2], size : [0.8, 0.5],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -13.0 
  });
  sort_expl_scale = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_expl_scale', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [(- 0.65), 0.15], size : [0.3, 0.3],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -14.0 
  });
  sort_expl_ex_1 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_expl_ex_1', units : undefined, 
    image : 'materials/merge_sort/imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -15.0 
  });
  sort_expl_ex_2 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_expl_ex_2', units : undefined, 
    image : 'materials/merge_sort/imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -16.0 
  });
  sort_expl_ex_3 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_expl_ex_3', units : undefined, 
    image : 'materials/merge_sort/imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -17.0 
  });
  sort_expl_ex_4 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_expl_ex_4', units : undefined, 
    image : 'materials/merge_sort/imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -18.0 
  });
  sort_expl_ex_5 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_expl_ex_5', units : undefined, 
    image : 'materials/merge_sort/imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -19.0 
  });
  sort_expl_ex_6 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_expl_ex_6', units : undefined, 
    image : 'materials/merge_sort/imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -20.0 
  });
  sort_expl_ex_7 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_expl_ex_7', units : undefined, 
    image : 'materials/merge_sort/imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -21.0 
  });
  sort_expl_ex_8 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_expl_ex_8', units : undefined, 
    image : 'materials/merge_sort/imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -22.0 
  });
  sort_expl_ex_9 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_expl_ex_9', units : undefined, 
    image : 'materials/merge_sort/imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -23.0 
  });
  sort_expl_ex_10 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_expl_ex_10', units : undefined, 
    image : 'materials/merge_sort/imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -24.0 
  });
  sort_expl_ex_11 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_expl_ex_11', units : undefined, 
    image : 'materials/merge_sort/imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -25.0 
  });
  sort_expl_ex_12 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_expl_ex_12', units : undefined, 
    image : 'materials/merge_sort/imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -26.0 
  });
  sort_expl_btn = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_expl_btn', units : undefined, 
    image : 'materials/imgs/continue.png', mask : undefined,
    ori : 0.0, pos : [0.5, (- 0.35)], size : [0.28, 0.1],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -27.0 
  });
  sort_expl_compare = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_expl_compare', units : undefined, 
    image : 'materials/merge_sort/imgs/compare.png', mask : undefined,
    ori : 0.0, pos : [(- 0.65), (- 0.05)], size : [0.16, 0.07],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -28.0 
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
    pos: [0.5, (- 0.22)], height: 0.04,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('yellow'),  opacity: undefined,
    depth: -31.0 
  });
  
  // Initialize components for Routine "MERGE_INTRO"
  MERGE_INTROClock = new util.Clock();
  intro_text_2 = new visual.TextStim({
    win: psychoJS.window,
    name: 'intro_text_2',
    text: 'ALICE: BIZZ ... Thank you for coming to help! We have fruits in some boxes to be put on a conveyor.\n\n1. The fruits in EACH ORANGE box INCREASE in weight from LEFT to RIGHT\n\n2. The BLUE STAR puts fruits from two ORANGE boxes on the CONVEYOR BELT in INCREASING weights from LEFT to RIGHT \n\nLEARN the BLUE STAR operation in steps and master it. ',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, (- 0.15)], height: 0.03,  wrapWidth: 1.2, ori: 0.0,
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
  blue_star_door_3 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'blue_star_door_3', units : undefined, 
    image : 'materials/merge_sort/imgs/blue_star_door.png', mask : undefined,
    ori : 0.0, pos : [(- 0.45), 0.25], size : [0.15, 0.35],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -3.0 
  });
  merge_intro_btn = new visual.ImageStim({
    win : psychoJS.window,
    name : 'merge_intro_btn', units : undefined, 
    image : 'materials/imgs/continue.png', mask : undefined,
    ori : 0.0, pos : [0, (- 0.4)], size : [0.28, 0.1],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -4.0 
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
    pos: [(- 0.65), 0.45], height: 1.0,  wrapWidth: 0.3, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: -7.0 
  });
  
  merge_ans_instr = new visual.TextStim({
    win: psychoJS.window,
    name: 'merge_ans_instr',
    text: 'Please SELECT the CONVEYOR BELT that has the correct fruit(s) on YELLOW position(s):',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, (- 0.15)], height: 0.03,  wrapWidth: 1.6, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: -8.0 
  });
  
  merge_train_instr = new visual.TextStim({
    win: psychoJS.window,
    name: 'merge_train_instr',
    text: '1. Use the scale on the left to COMPARE weights of TWO fruits by entering the alphabetic CAPITAL labels\n\n2. In EACH ORANGE box, fruits are arranged in INCREASING weights from LEFT to RIGHT\n\n3. Fruits on the CONVEYOR BELT are arranged in INCREASING weights from LEFT to RIGHT\n\nYou have 90 SECS to SUBMIT!',
    font: 'Open Sans',
    units: undefined, 
    pos: [0.65, 0.2], height: 0.025,  wrapWidth: 0.4, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: -9.0 
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
    depth: -10.0 
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
    image : 'materials/merge_sort/imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [(- 0.3), (- 0.25)], size : [0.7, 0.1],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -14.0 
  });
  merge_train_mc_2 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'merge_train_mc_2', units : undefined, 
    image : 'materials/merge_sort/imgs/white_BG.png', mask : undefined,
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
  merge_train_btn_1 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'merge_train_btn_1', units : undefined, 
    image : 'materials/imgs/submit.png', mask : undefined,
    ori : 0.0, pos : [0.5, (- 0.25)], size : [0.24, 0.1],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -17.0 
  });
  merge_train_btn_2 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'merge_train_btn_2', units : undefined, 
    image : 'materials/imgs/submit.png', mask : undefined,
    ori : 0.0, pos : [0.5, (- 0.4)], size : [0.24, 0.1],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -18.0 
  });
  merge_train_compare = new visual.ImageStim({
    win : psychoJS.window,
    name : 'merge_train_compare', units : undefined, 
    image : 'materials/merge_sort/imgs/compare.png', mask : undefined,
    ori : 0.0, pos : [(- 0.65), (- 0.05)], size : [0.16, 0.07],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -19.0 
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
  merge_expl_initial_state = new visual.TextStim({
    win: psychoJS.window,
    name: 'merge_expl_initial_state',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [(- 0.625), (- 0.1)], height: 0.03,  wrapWidth: 0.6, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
  merge_expl_feedback = new visual.TextStim({
    win: psychoJS.window,
    name: 'merge_expl_feedback',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [(- 0.375), 0.4], height: 0.03,  wrapWidth: 0.8, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: -1.0 
  });
  
  merge_expl_feedback_1 = new visual.TextStim({
    win: psychoJS.window,
    name: 'merge_expl_feedback_1',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [(- 0.15), 0.12], height: 0.035,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: -2.0 
  });
  
  merge_expl_feedback_2 = new visual.TextStim({
    win: psychoJS.window,
    name: 'merge_expl_feedback_2',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [(- 0.15), (- 0.27)], height: 0.035,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: -3.0 
  });
  
  merge_expl_ex = new visual.ImageStim({
    win : psychoJS.window,
    name : 'merge_expl_ex', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [(- 0.625), 0.05], size : [0.4, 0.2],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -4.0 
  });
  merge_expl_sep = new visual.ImageStim({
    win : psychoJS.window,
    name : 'merge_expl_sep', units : undefined, 
    image : 'materials/merge_sort/imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [(- 0.375), 0], size : [0.005, 0.7],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -5.0 
  });
  merge_expl_1 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'merge_expl_1', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0.45, 0.25], size : [0.8, 0.4],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -6.0 
  });
  merge_expl_2 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'merge_expl_2', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0.45, (- 0.15)], size : [0.8, 0.4],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -7.0 
  });
  merge_expl_mc_1 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'merge_expl_mc_1', units : undefined, 
    image : 'materials/merge_sort/imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [(- 0.15), 0.25], size : [0.3, 0.075],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -8.0 
  });
  merge_expl_mc_2 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'merge_expl_mc_2', units : undefined, 
    image : 'materials/merge_sort/imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [(- 0.15), (- 0.15)], size : [0.3, 0.075],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -9.0 
  });
  merge_expl_btn = new visual.ImageStim({
    win : psychoJS.window,
    name : 'merge_expl_btn', units : undefined, 
    image : 'materials/imgs/continue.png', mask : undefined,
    ori : 0.0, pos : [0.35, (- 0.42)], size : [0.28, 0.1],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -10.0 
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
    pos: [(- 0.375), (- 0.42)], height: 0.03,  wrapWidth: 0.5, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: -12.0 
  });
  
  // Initialize components for Routine "MERGE_TEST_INTRO"
  MERGE_TEST_INTROClock = new util.Clock();
  intro_text_6 = new visual.TextStim({
    win: psychoJS.window,
    name: 'intro_text_6',
    text: 'ALICE: BIZZ ... Now is time to apply the knowledge you learned about the BLUE STAR\n\n1. The fruits in EACH ORANGE box INCREASE in weight from LEFT to RIGHT\n\n2. The BLUE STAR puts fruits from two ORANGE boxes on the CONVEYOR BELT in INCREASING weights from LEFT to RIGHT',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, (- 0.15)], height: 0.03,  wrapWidth: 1.2, ori: 0.0,
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
  blue_star_door_4 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'blue_star_door_4', units : undefined, 
    image : 'materials/merge_sort/imgs/blue_star_door.png', mask : undefined,
    ori : 0.0, pos : [(- 0.45), 0.25], size : [0.15, 0.35],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -3.0 
  });
  merge_test_intro_btn = new visual.ImageStim({
    win : psychoJS.window,
    name : 'merge_test_intro_btn', units : undefined, 
    image : 'materials/imgs/continue.png', mask : undefined,
    ori : 0.0, pos : [0, (- 0.4)], size : [0.28, 0.1],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -4.0 
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
    pos: [(- 0.65), 0.45], height: 1.0,  wrapWidth: 0.3, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: -4.0 
  });
  
  merge_test_ans_instr = new visual.TextStim({
    win: psychoJS.window,
    name: 'merge_test_ans_instr',
    text: 'Put fruits on the CONVEYOR BELT by entering their labels one by one into the following boxes with WEIGHT INCREASING from LEFT to RIGHT',
    font: 'Open Sans',
    units: undefined, 
    pos: [(- 0.25), (- 0.22)], height: 0.025,  wrapWidth: 0.9, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: -5.0 
  });
  
  merge_test_instr = new visual.TextStim({
    win: psychoJS.window,
    name: 'merge_test_instr',
    text: '1. Use the scale on the left to COMPARE weights of TWO fruits by entering the alphabetic CAPITAL labels\n\n2. In EACH ORANGE box, fruits are arranged in INCREASING weights from LEFT to RIGHT\n\n3. Fruits on the CONVEYOR BELT are arranged in INCREASING weights from LEFT to RIGHT\n\nYou have 90 SECS to SUBMIT!',
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
  
  merge_test_sep = new visual.ImageStim({
    win : psychoJS.window,
    name : 'merge_test_sep', units : undefined, 
    image : 'materials/merge_sort/imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [0, (- 0.15)], size : [1.5, 0.005],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -9.0 
  });
  merge_test = new visual.ImageStim({
    win : psychoJS.window,
    name : 'merge_test', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, 0.2], size : [0.8, 0.4],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -10.0 
  });
  merge_test_scale = new visual.ImageStim({
    win : psychoJS.window,
    name : 'merge_test_scale', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [(- 0.65), 0.15], size : [0.3, 0.3],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -11.0 
  });
  merge_test_btn = new visual.ImageStim({
    win : psychoJS.window,
    name : 'merge_test_btn', units : undefined, 
    image : 'materials/imgs/submit.png', mask : undefined,
    ori : 0.0, pos : [0.5, (- 0.35)], size : [0.24, 0.1],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -12.0 
  });
  merge_test_compare = new visual.ImageStim({
    win : psychoJS.window,
    name : 'merge_test_compare', units : undefined, 
    image : 'materials/merge_sort/imgs/compare.png', mask : undefined,
    ori : 0.0, pos : [(- 0.65), (- 0.05)], size : [0.16, 0.07],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -13.0 
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
    depth: -15.0 
  });
  
  // Initialize components for Routine "BREAK_2"
  BREAK_2Clock = new util.Clock();
  break_2_instr = new visual.TextStim({
    win: psychoJS.window,
    name: 'break_2_instr',
    text: 'You may take a short break now!\n\nPlease do not refresh/close the browser tab or leave your device to sleep.\n\nClick the "Continue" button below when you are ready to proceed!',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0.0], height: 0.03,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('yellow'),  opacity: undefined,
    depth: 0.0 
  });
  
  break_2_mouse = new core.Mouse({
    win: psychoJS.window,
  });
  break_2_mouse.mouseClock = new util.Clock();
  break_2_btn = new visual.ImageStim({
    win : psychoJS.window,
    name : 'break_2_btn', units : undefined, 
    image : 'materials/imgs/continue.png', mask : undefined,
    ori : 0.0, pos : [0, (- 0.4)], size : [0.28, 0.1],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -2.0 
  });
  // Initialize components for Routine "SORT_TEST_INTRO"
  SORT_TEST_INTROClock = new util.Clock();
  intro_text_7 = new visual.TextStim({
    win: psychoJS.window,
    name: 'intro_text_7',
    text: 'BOB: CLIKKKK ... Now is time to apply the knowledge you learned about the PURPLE DIAMOND\n\n1. You need to arrange a PILE of fruits that is most likely UNORDERED\n\n2. The PURPLE DIAMOND arranges fruits from the PILE into the SHIPPING CRATE in INCREASING weights from LEFT to RIGHT\n\nWork through some questions on PURPLE DIAMOND but BOB would not give you information for reference this time!',
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
    image : 'materials/merge_sort/imgs/sort_train/sort_train_example.png', mask : undefined,
    ori : 0.0, pos : [(- 0.3), 0.25], size : [0.7, 0.4],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -2.0 
  });
  purple_diamond_door_4 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'purple_diamond_door_4', units : undefined, 
    image : 'materials/merge_sort/imgs/purple_diamond_door.png', mask : undefined,
    ori : 0.0, pos : [0.45, 0.25], size : [0.15, 0.35],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -3.0 
  });
  sort_test_intro_btn = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_test_intro_btn', units : undefined, 
    image : 'materials/imgs/continue.png', mask : undefined,
    ori : 0.0, pos : [0, (- 0.4)], size : [0.28, 0.1],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -4.0 
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
    pos: [(- 0.65), 0.45], height: 1.0,  wrapWidth: 0.3, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: -6.0 
  });
  
  sort_test_ans_instr = new visual.TextStim({
    win: psychoJS.window,
    name: 'sort_test_ans_instr',
    text: 'Put fruits on the SHIPPING CRATE by entering their labels one by one into the following boxes with WEIGHT INCREASING from LEFT to RIGHT',
    font: 'Open Sans',
    units: undefined, 
    pos: [(- 0.25), (- 0.22)], height: 0.025,  wrapWidth: 0.9, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: -7.0 
  });
  
  sort_test_instr = new visual.TextStim({
    win: psychoJS.window,
    name: 'sort_test_instr',
    text: '1. Use the scale on the left to COMPARE weights of TWO fruits by entering the alphabetic CAPITAL labels\n\n2. You are given a PILE of fruits that is most likely UNORDERED and you can move fruits freely on the MONITOR in the middle help you arrange fruits\n\n3. The PURPLE DIAMOND puts fruits from the PILE into the SHIPPING CRATE in INCREASING weights from LEFT to RIGHT\n\nYou have 300 SECS to SUBMIT!',
    font: 'Open Sans',
    units: undefined, 
    pos: [0.65, 0.2], height: 0.02,  wrapWidth: 0.4, ori: 0.0,
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
  
  sort_test_sep = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_test_sep', units : undefined, 
    image : 'materials/merge_sort/imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [0, (- 0.15)], size : [1.5, 0.005],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -11.0 
  });
  sort_test_board = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_test_board', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, 0.2], size : [0.8, 0.5],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -12.0 
  });
  sort_test_scale = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_test_scale', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [(- 0.65), 0.15], size : [0.3, 0.3],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -13.0 
  });
  sort_test_ex_1 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_test_ex_1', units : undefined, 
    image : 'materials/merge_sort/imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -14.0 
  });
  sort_test_ex_2 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_test_ex_2', units : undefined, 
    image : 'materials/merge_sort/imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -15.0 
  });
  sort_test_ex_3 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_test_ex_3', units : undefined, 
    image : 'materials/merge_sort/imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -16.0 
  });
  sort_test_ex_4 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_test_ex_4', units : undefined, 
    image : 'materials/merge_sort/imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -17.0 
  });
  sort_test_ex_5 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_test_ex_5', units : undefined, 
    image : 'materials/merge_sort/imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -18.0 
  });
  sort_test_ex_6 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_test_ex_6', units : undefined, 
    image : 'materials/merge_sort/imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -19.0 
  });
  sort_test_ex_7 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_test_ex_7', units : undefined, 
    image : 'materials/merge_sort/imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -20.0 
  });
  sort_test_ex_8 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_test_ex_8', units : undefined, 
    image : 'materials/merge_sort/imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -21.0 
  });
  sort_test_ex_9 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_test_ex_9', units : undefined, 
    image : 'materials/merge_sort/imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -22.0 
  });
  sort_test_ex_10 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_test_ex_10', units : undefined, 
    image : 'materials/merge_sort/imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -23.0 
  });
  sort_test_ex_11 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_test_ex_11', units : undefined, 
    image : 'materials/merge_sort/imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -24.0 
  });
  sort_test_ex_12 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_test_ex_12', units : undefined, 
    image : 'materials/merge_sort/imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -25.0 
  });
  sort_test_btn = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_test_btn', units : undefined, 
    image : 'materials/imgs/submit.png', mask : undefined,
    ori : 0.0, pos : [0.5, (- 0.35)], size : [0.24, 0.1],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -26.0 
  });
  sort_test_compare = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_test_compare', units : undefined, 
    image : 'materials/merge_sort/imgs/compare.png', mask : undefined,
    ori : 0.0, pos : [(- 0.65), (- 0.05)], size : [0.16, 0.07],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -27.0 
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
    depth: -29.0 
  });
  
  // Initialize components for Routine "REVIEW_QUESTIONS"
  REVIEW_QUESTIONSClock = new util.Clock();
  review_question = new visual.TextStim({
    win: psychoJS.window,
    name: 'review_question',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.03,  wrapWidth: 0.7, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
  review_img_1 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'review_img_1', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.7, 0.35],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -1.0 
  });
  review_img_2 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'review_img_2', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.7, 0.35],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -2.0 
  });
  review_btn = new visual.ImageStim({
    win : psychoJS.window,
    name : 'review_btn', units : undefined, 
    image : 'materials/imgs/continue.png', mask : undefined,
    ori : 0.0, pos : [0.4, (- 0.4)], size : [0.28, 0.1],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -3.0 
  });
  review_res = new visual.TextBox({
    win: psychoJS.window,
    name: 'review_res',
    text: '',
    font: 'Open Sans',
    pos: [(- 0.45), (- 0.35)], letterHeight: 0.03,
    size: [0.7, 0.2],  units: undefined, 
    color: 'black', colorSpace: 'rgb',
    fillColor: 'white', borderColor: undefined,
    bold: false, italic: false,
    opacity: undefined,
    padding: undefined,
    editable: true,
    multiline: true,
    anchor: 'center',
    depth: -4.0 
  });
  
  review_mouse = new core.Mouse({
    win: psychoJS.window,
  });
  review_mouse.mouseClock = new util.Clock();
  review_timer = new visual.TextStim({
    win: psychoJS.window,
    name: 'review_timer',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [(- 0.45), (- 0.2)], height: 0.03,  wrapWidth: 0.7, ori: 0.0,
    color: new util.Color('orange'),  opacity: undefined,
    depth: -6.0 
  });
  
  // Initialize components for Routine "EXP_CHECK"
  EXP_CHECKClock = new util.Clock();
  exp_check_question = new visual.TextStim({
    win: psychoJS.window,
    name: 'exp_check_question',
    text: 'Please let us know If you have received training or have studied any SORTING algorithms before the experiment, \n\nand write in the box below which one(s) you KNOW and HAVE USED for the experiment:',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0.3], height: 0.03,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
  exp_check_res = new visual.TextBox({
    win: psychoJS.window,
    name: 'exp_check_res',
    text: '',
    font: 'Open Sans',
    pos: [0, (- 0.15)], letterHeight: 0.05,
    size: [0.7, 0.15],  units: undefined, 
    color: 'black', colorSpace: 'rgb',
    fillColor: 'white', borderColor: undefined,
    bold: false, italic: false,
    opacity: undefined,
    padding: undefined,
    editable: true,
    multiline: true,
    anchor: 'center',
    depth: -1.0 
  });
  
  exp_check_btn = new visual.ImageStim({
    win : psychoJS.window,
    name : 'exp_check_btn', units : undefined, 
    image : 'materials/imgs/submit.png', mask : undefined,
    ori : 0.0, pos : [0, (- 0.35)], size : [0.24, 0.1],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -2.0 
  });
  exp_check_mouse = new core.Mouse({
    win: psychoJS.window,
  });
  exp_check_mouse.mouseClock = new util.Clock();
  exp_check_slider = new visual.Slider({
    win: psychoJS.window, name: 'exp_check_slider',
    size: [0.5, 0.02], pos: [0, 0.1], units: 'height',
    labels: ["HAD training", "NO training"], ticks: [1, 2],
    granularity: 1.0, style: ["RADIO"],
    color: new util.Color('white'), markerColor: new util.Color('black'), lineColor: new util.Color('White'), 
    fontFamily: 'Open Sans', bold: true, italic: false, depth: -4, 
    flip: false,
  });
  
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
  
  prefer_not_to_say = new visual.ImageStim({
    win : psychoJS.window,
    name : 'prefer_not_to_say', units : undefined, 
    image : 'materials/imgs/prefer_not_to_say.png', mask : undefined,
    ori : 0.0, pos : [0.3, 0.2], size : [0.12, 0.07],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -5.0 
  });
  other_gender = new visual.ImageStim({
    win : psychoJS.window,
    name : 'other_gender', units : undefined, 
    image : 'materials/imgs/other_gender.png', mask : undefined,
    ori : 0.0, pos : [0.1, 0.2], size : [0.12, 0.07],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -6.0 
  });
  female = new visual.ImageStim({
    win : psychoJS.window,
    name : 'female', units : undefined, 
    image : 'materials/imgs/female.png', mask : undefined,
    ori : 0.0, pos : [(- 0.3), 0.2], size : [0.12, 0.07],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -7.0 
  });
  male = new visual.ImageStim({
    win : psychoJS.window,
    name : 'male', units : undefined, 
    image : 'materials/imgs/male.png', mask : undefined,
    ori : 0.0, pos : [(- 0.1), 0.2], size : [0.1, 0.07],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -8.0 
  });
  age = new visual.TextStim({
    win: psychoJS.window,
    name: 'age',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0.1], height: 0.03,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: -9.0 
  });
  
  _18_24 = new visual.ImageStim({
    win : psychoJS.window,
    name : '_18_24', units : undefined, 
    image : 'materials/imgs/_18_24.png', mask : undefined,
    ori : 0.0, pos : [(- 0.5), 0], size : [0.1, 0.07],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -10.0 
  });
  _25_34 = new visual.ImageStim({
    win : psychoJS.window,
    name : '_25_34', units : undefined, 
    image : 'materials/imgs/_25_34.png', mask : undefined,
    ori : 0.0, pos : [(- 0.3), 0], size : [0.1, 0.07],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -11.0 
  });
  _35_44 = new visual.ImageStim({
    win : psychoJS.window,
    name : '_35_44', units : undefined, 
    image : 'materials/imgs/_35_44.png', mask : undefined,
    ori : 0.0, pos : [(- 0.1), 0], size : [0.1, 0.07],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -12.0 
  });
  _45_54 = new visual.ImageStim({
    win : psychoJS.window,
    name : '_45_54', units : undefined, 
    image : 'materials/imgs/_45_54.png', mask : undefined,
    ori : 0.0, pos : [0.1, 0], size : [0.1, 0.07],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -13.0 
  });
  _55_64 = new visual.ImageStim({
    win : psychoJS.window,
    name : '_55_64', units : undefined, 
    image : 'materials/imgs/_55_64.png', mask : undefined,
    ori : 0.0, pos : [0.3, 0], size : [0.1, 0.07],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -14.0 
  });
  _65 = new visual.ImageStim({
    win : psychoJS.window,
    name : '_65', units : undefined, 
    image : 'materials/imgs/_65.png', mask : undefined,
    ori : 0.0, pos : [0.5, 0], size : [0.1, 0.07],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -15.0 
  });
  education = new visual.TextStim({
    win: psychoJS.window,
    name: 'education',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, (- 0.1)], height: 0.03,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: -16.0 
  });
  
  less_than_high_school = new visual.ImageStim({
    win : psychoJS.window,
    name : 'less_than_high_school', units : undefined, 
    image : 'materials/imgs/less_than_high_school.png', mask : undefined,
    ori : 0.0, pos : [(- 0.75), (- 0.2)], size : [0.2, 0.07],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -17.0 
  });
  high_school_equivalent = new visual.ImageStim({
    win : psychoJS.window,
    name : 'high_school_equivalent', units : undefined, 
    image : 'materials/imgs/high_school_equivalent.png', mask : undefined,
    ori : 0.0, pos : [(- 0.5), (- 0.2)], size : [0.2, 0.07],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -18.0 
  });
  college = new visual.ImageStim({
    win : psychoJS.window,
    name : 'college', units : undefined, 
    image : 'materials/imgs/college.png', mask : undefined,
    ori : 0.0, pos : [(- 0.25), (- 0.2)], size : [0.2, 0.07],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -19.0 
  });
  bachelor = new visual.ImageStim({
    win : psychoJS.window,
    name : 'bachelor', units : undefined, 
    image : 'materials/imgs/bachelor.png', mask : undefined,
    ori : 0.0, pos : [0, (- 0.2)], size : [0.2, 0.07],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -20.0 
  });
  graduate = new visual.ImageStim({
    win : psychoJS.window,
    name : 'graduate', units : undefined, 
    image : 'materials/imgs/graduate.png', mask : undefined,
    ori : 0.0, pos : [0.25, (- 0.2)], size : [0.2, 0.07],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -21.0 
  });
  doctorate = new visual.ImageStim({
    win : psychoJS.window,
    name : 'doctorate', units : undefined, 
    image : 'materials/imgs/doctorate.png', mask : undefined,
    ori : 0.0, pos : [0.5, (- 0.2)], size : [0.2, 0.07],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -22.0 
  });
  other = new visual.ImageStim({
    win : psychoJS.window,
    name : 'other', units : undefined, 
    image : 'materials/imgs/other.png', mask : undefined,
    ori : 0.0, pos : [0.75, (- 0.2)], size : [0.2, 0.07],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -23.0 
  });
  background_btn = new visual.ImageStim({
    win : psychoJS.window,
    name : 'background_btn', units : undefined, 
    image : 'materials/imgs/waiting.png', mask : undefined,
    ori : 0.0, pos : [0, (- 0.4)], size : [0.24, 0.1],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -24.0 
  });
  background_mouse = new core.Mouse({
    win: psychoJS.window,
  });
  background_mouse.mouseClock = new util.Clock();
  // Initialize components for Routine "DEBRIEF"
  DEBRIEFClock = new util.Clock();
  // Create some handy timers
  globalClock = new util.Clock();  // to track the time since experiment started
  routineTimer = new util.CountdownTimer();  // to track time remaining of each (non-slip) routine
  
  return Scheduler.Event.NEXT;
}


var t;
var frameN;
var continueRoutine;
var CONSENTComponents;
function CONSENTRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'CONSENT'-------
    t = 0;
    CONSENTClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(180.000000);
    // update component parameters for each repeat
    consent_check.reset()
    // keep track of which components have finished
    CONSENTComponents = [];
    CONSENTComponents.push(consent);
    CONSENTComponents.push(consent_check);
    
    for (const thisComponent of CONSENTComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


var frameRemains;
function CONSENTRoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'CONSENT'-------
    // get current time
    t = CONSENTClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *consent* updates
    if (t >= 0.0 && consent.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      consent.tStart = t;  // (not accounting for frame time here)
      consent.frameNStart = frameN;  // exact frame index
      
      consent.setAutoDraw(true);
    }

    frameRemains = 0.0 + 180.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (consent.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      consent.setAutoDraw(false);
    }
    
    // *consent_check* updates
    if (t >= 0.0 && consent_check.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      consent_check.tStart = t;  // (not accounting for frame time here)
      consent_check.frameNStart = frameN;  // exact frame index
      
      consent_check.setAutoDraw(true);
    }

    frameRemains = 180.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((consent_check.status === PsychoJS.Status.STARTED || consent_check.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      consent_check.setAutoDraw(false);
    }
    if (consent_check.markerPos !== undefined) {
        psychoJS.experiment.addData("consent",consent_check.getMarkerPos() === 1);
        if (consent_check.getMarkerPos() === 2) {
            return quitPsychoJS('The experiment was terminated!', false);
        }
        continueRoutine = false;
    }
    
    if (parseInt(expInfo["participant"]) === NaN && parseInt(expInfo["participant"]) % 4 !== 0) {
        return quitPsychoJS('Wrong ID was given!', false);
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
    for (const thisComponent of CONSENTComponents)
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


function CONSENTRoutineEnd() {
  return async function () {
    //------Ending Routine 'CONSENT'-------
    for (const thisComponent of CONSENTComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('consent_check.response', consent_check.getRating());
    if (consent_check.markerPos === undefined) {
        psychoJS.experiment.addData("consent",false);
        return quitPsychoJS('The experiment was terminated!', false);
    }
    
    
    return Scheduler.Event.NEXT;
  };
}


var gotValidClick;
var routineT;
var PRE_TEST_INTROComponents;
function PRE_TEST_INTRORoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'PRE_TEST_INTRO'-------
    t = 0;
    PRE_TEST_INTROClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(120.000000);
    // update component parameters for each repeat
    // setup some python lists for storing info about the pre_test_intro_mouse
    gotValidClick = false; // until a click is received
    routineT = 0;
    // keep track of which components have finished
    PRE_TEST_INTROComponents = [];
    PRE_TEST_INTROComponents.push(pre_test_intro);
    PRE_TEST_INTROComponents.push(pre_test_intro_btn);
    PRE_TEST_INTROComponents.push(pre_test_intro_mouse);
    
    for (const thisComponent of PRE_TEST_INTROComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function PRE_TEST_INTRORoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'PRE_TEST_INTRO'-------
    // get current time
    t = PRE_TEST_INTROClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *pre_test_intro* updates
    if (t >= 0.0 && pre_test_intro.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      pre_test_intro.tStart = t;  // (not accounting for frame time here)
      pre_test_intro.frameNStart = frameN;  // exact frame index
      
      pre_test_intro.setAutoDraw(true);
    }

    frameRemains = 120.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((pre_test_intro.status === PsychoJS.Status.STARTED || pre_test_intro.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      pre_test_intro.setAutoDraw(false);
    }
    
    // *pre_test_intro_btn* updates
    if (t >= 0.5 && pre_test_intro_btn.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      pre_test_intro_btn.tStart = t;  // (not accounting for frame time here)
      pre_test_intro_btn.frameNStart = frameN;  // exact frame index
      
      pre_test_intro_btn.setAutoDraw(true);
    }

    frameRemains = 120.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((pre_test_intro_btn.status === PsychoJS.Status.STARTED || pre_test_intro_btn.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      pre_test_intro_btn.setAutoDraw(false);
    }
    if (((t >= 0.5) && (pre_test_intro_mouse.status === PsychoJS.Status.NOT_STARTED))) {
        pre_test_intro_mouse.tStart = t;
        pre_test_intro_mouse.frameNStart = frameN;
        pre_test_intro_mouse.status = PsychoJS.Status.STARTED;
        pre_test_intro_mouse.mouseClock.reset();
    }
    if (((pre_test_intro_mouse.isPressedIn(pre_test_intro_btn) && (pre_test_intro_mouse.status === PsychoJS.Status.STARTED)) && (pre_test_intro_btn.status === PsychoJS.Status.STARTED))) {
        pre_test_intro_mouse.status = PsychoJS.Status.FINISHED;
        continueRoutine = false;
    }
    if ((pre_test_intro_mouse.status === PsychoJS.Status.STARTED) && t >= frameRemains) {
        pre_test_intro_mouse.status = PsychoJS.Status.FINISHED;
    }
    routineT = t;
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of PRE_TEST_INTROComponents)
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
var _mouseButtons;
function PRE_TEST_INTRORoutineEnd() {
  return async function () {
    //------Ending Routine 'PRE_TEST_INTRO'-------
    for (const thisComponent of PRE_TEST_INTROComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // store data for psychoJS.experiment (ExperimentHandler)
    _mouseXYs = pre_test_intro_mouse.getPos();
    _mouseButtons = pre_test_intro_mouse.getPressed();
    psychoJS.experiment.addData('pre_test_intro_mouse.x', _mouseXYs[0]);
    psychoJS.experiment.addData('pre_test_intro_mouse.y', _mouseXYs[1]);
    psychoJS.experiment.addData('pre_test_intro_mouse.leftButton', _mouseButtons[0]);
    psychoJS.experiment.addData('pre_test_intro_mouse.midButton', _mouseButtons[1]);
    psychoJS.experiment.addData('pre_test_intro_mouse.rightButton', _mouseButtons[2]);
    psychoJS.experiment.addData("pre_test_intro_mouse.tEnd",routineT);
    progressBar.update("PRE_TEST_INTRO");
    return Scheduler.Event.NEXT;
  };
}


var MaRs_IB_1;
var currentLoop;
function MaRs_IB_1LoopBegin(MaRs_IB_1LoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    MaRs_IB_1 = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 1, method: TrialHandler.Method.SEQUENTIAL,
      extraInfo: expInfo, originPath: undefined,
      trialList: 'materials/pre_test_train_cond.csv',
      seed: undefined, name: 'MaRs_IB_1'
    });
    psychoJS.experiment.addLoop(MaRs_IB_1); // add the loop to the experiment
    currentLoop = MaRs_IB_1;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    for (const thisMaRs_IB_1 of MaRs_IB_1) {
      const snapshot = MaRs_IB_1.getSnapshot();
      MaRs_IB_1LoopScheduler.add(importConditions(snapshot));
      MaRs_IB_1LoopScheduler.add(PRE_TEST_TRAINRoutineBegin(snapshot));
      MaRs_IB_1LoopScheduler.add(PRE_TEST_TRAINRoutineEachFrame());
      MaRs_IB_1LoopScheduler.add(PRE_TEST_TRAINRoutineEnd());
      MaRs_IB_1LoopScheduler.add(endLoopIteration(MaRs_IB_1LoopScheduler, snapshot));
    }
    
    return Scheduler.Event.NEXT;
  }
}


async function MaRs_IB_1LoopEnd() {
  psychoJS.experiment.removeLoop(MaRs_IB_1);

  return Scheduler.Event.NEXT;
}


var MaRs_IB_2;
function MaRs_IB_2LoopBegin(MaRs_IB_2LoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    MaRs_IB_2 = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 10, method: TrialHandler.Method.SEQUENTIAL,
      extraInfo: expInfo, originPath: undefined,
      trialList: 'materials/pre_test_cond.csv',
      seed: undefined, name: 'MaRs_IB_2'
    });
    psychoJS.experiment.addLoop(MaRs_IB_2); // add the loop to the experiment
    currentLoop = MaRs_IB_2;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    for (const thisMaRs_IB_2 of MaRs_IB_2) {
      const snapshot = MaRs_IB_2.getSnapshot();
      MaRs_IB_2LoopScheduler.add(importConditions(snapshot));
      MaRs_IB_2LoopScheduler.add(PRE_TESTRoutineBegin(snapshot));
      MaRs_IB_2LoopScheduler.add(PRE_TESTRoutineEachFrame());
      MaRs_IB_2LoopScheduler.add(PRE_TESTRoutineEnd());
      MaRs_IB_2LoopScheduler.add(endLoopIteration(MaRs_IB_2LoopScheduler, snapshot));
    }
    
    return Scheduler.Event.NEXT;
  }
}


async function MaRs_IB_2LoopEnd() {
  psychoJS.experiment.removeLoop(MaRs_IB_2);

  return Scheduler.Event.NEXT;
}


var TRAIN_2;
function TRAIN_2LoopBegin(TRAIN_2LoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
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
      TRAIN_2LoopScheduler.add(SORT_TRAINRoutineEachFrame());
      TRAIN_2LoopScheduler.add(SORT_TRAINRoutineEnd());
      TRAIN_2LoopScheduler.add(SORT_EXPLRoutineBegin(snapshot));
      TRAIN_2LoopScheduler.add(SORT_EXPLRoutineEachFrame());
      TRAIN_2LoopScheduler.add(SORT_EXPLRoutineEnd());
      TRAIN_2LoopScheduler.add(endLoopIteration(TRAIN_2LoopScheduler, snapshot));
    }
    
    return Scheduler.Event.NEXT;
  }
}


async function TRAIN_2LoopEnd() {
  psychoJS.experiment.removeLoop(TRAIN_2);

  return Scheduler.Event.NEXT;
}


var TRAIN_1;
function TRAIN_1LoopBegin(TRAIN_1LoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
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
      TRAIN_1LoopScheduler.add(MERGE_TRAINRoutineEachFrame());
      TRAIN_1LoopScheduler.add(MERGE_TRAINRoutineEnd());
      TRAIN_1LoopScheduler.add(MERGE_EXPLRoutineBegin(snapshot));
      TRAIN_1LoopScheduler.add(MERGE_EXPLRoutineEachFrame());
      TRAIN_1LoopScheduler.add(MERGE_EXPLRoutineEnd());
      TRAIN_1LoopScheduler.add(endLoopIteration(TRAIN_1LoopScheduler, snapshot));
    }
    
    return Scheduler.Event.NEXT;
  }
}


async function TRAIN_1LoopEnd() {
  psychoJS.experiment.removeLoop(TRAIN_1);

  return Scheduler.Event.NEXT;
}


var TEST_1;
function TEST_1LoopBegin(TEST_1LoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
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
      TEST_1LoopScheduler.add(MERGE_TESTRoutineEachFrame());
      TEST_1LoopScheduler.add(MERGE_TESTRoutineEnd());
      TEST_1LoopScheduler.add(endLoopIteration(TEST_1LoopScheduler, snapshot));
    }
    
    return Scheduler.Event.NEXT;
  }
}


async function TEST_1LoopEnd() {
  psychoJS.experiment.removeLoop(TEST_1);

  return Scheduler.Event.NEXT;
}


var TEST_2;
function TEST_2LoopBegin(TEST_2LoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
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
      TEST_2LoopScheduler.add(SORT_TESTRoutineEachFrame());
      TEST_2LoopScheduler.add(SORT_TESTRoutineEnd());
      TEST_2LoopScheduler.add(endLoopIteration(TEST_2LoopScheduler, snapshot));
    }
    
    return Scheduler.Event.NEXT;
  }
}


async function TEST_2LoopEnd() {
  psychoJS.experiment.removeLoop(TEST_2);

  return Scheduler.Event.NEXT;
}


var REVIEW;
function REVIEWLoopBegin(REVIEWLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    REVIEW = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 1, method: TrialHandler.Method.SEQUENTIAL,
      extraInfo: expInfo, originPath: undefined,
      trialList: 'materials/review_cond.csv',
      seed: undefined, name: 'REVIEW'
    });
    psychoJS.experiment.addLoop(REVIEW); // add the loop to the experiment
    currentLoop = REVIEW;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    for (const thisREVIEW of REVIEW) {
      const snapshot = REVIEW.getSnapshot();
      REVIEWLoopScheduler.add(importConditions(snapshot));
      REVIEWLoopScheduler.add(REVIEW_QUESTIONSRoutineBegin(snapshot));
      REVIEWLoopScheduler.add(REVIEW_QUESTIONSRoutineEachFrame());
      REVIEWLoopScheduler.add(REVIEW_QUESTIONSRoutineEnd());
      REVIEWLoopScheduler.add(endLoopIteration(REVIEWLoopScheduler, snapshot));
    }
    
    return Scheduler.Event.NEXT;
  }
}


async function REVIEWLoopEnd() {
  psychoJS.experiment.removeLoop(REVIEW);

  return Scheduler.Event.NEXT;
}


var item_image_path;
var itemLabels;
var selected;
var selectedTime;
var stopTime;
var skipped;
var PRE_TEST_TRAINComponents;
function PRE_TEST_TRAINRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'PRE_TEST_TRAIN'-------
    t = 0;
    PRE_TEST_TRAINClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(31.000000);
    // update component parameters for each repeat
    pre_test_train_item.setImage(img_path);
    pre_test_train_whitescreen.setImage('materials/merge_sort/imgs/white_BG.png');
    pre_test_train_fixation.setImage('materials/imgs/MaRs_IB/fixation.png');
    pre_test_train_slider.reset()
    // setup some python lists for storing info about the pre_test_train_mouse
    gotValidClick = false; // until a click is received
    pre_test_train_timer.setText('');
    pre_test_train_counter_1.setText('');
    pre_test_train_counter_2.setText('');
    pre_test_train_feedback.setText('');
    pre_test_train_mark.setText('?');
    item_image_path = img_path;
    itemLabels = ["a","b","c","d"];
    selected = null;
    selectedTime = 0;
    stopTime = preTestTimeL;
    skipped = false;
    
    pre_test_train_counter_1.text = "Practice question No." + (MaRs_IB_1.thisTrialN + 1) + " out of 10";
    pre_test_train_counter_2.text = "Remaining correct answer(s) to skip practice: " + (3 - preTestTrainCorrectCnt);
    
    progressBar.hide();
    pre_test_train_slider.setReadOnly(false);
    
    if (preTestTrainCorrectCnt >= 3) {
        skipped = true;
    }
    // keep track of which components have finished
    PRE_TEST_TRAINComponents = [];
    PRE_TEST_TRAINComponents.push(pre_test_train_item);
    PRE_TEST_TRAINComponents.push(pre_test_train_whitescreen);
    PRE_TEST_TRAINComponents.push(pre_test_train_fixation);
    PRE_TEST_TRAINComponents.push(pre_test_train_slider);
    PRE_TEST_TRAINComponents.push(pre_test_train_mouse);
    PRE_TEST_TRAINComponents.push(pre_test_train_timer);
    PRE_TEST_TRAINComponents.push(pre_test_train_counter_1);
    PRE_TEST_TRAINComponents.push(pre_test_train_counter_2);
    PRE_TEST_TRAINComponents.push(pre_test_train_instr);
    PRE_TEST_TRAINComponents.push(pre_test_train_feedback);
    PRE_TEST_TRAINComponents.push(pre_test_train_mark);
    
    for (const thisComponent of PRE_TEST_TRAINComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


var prevButtonState;
function PRE_TEST_TRAINRoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'PRE_TEST_TRAIN'-------
    // get current time
    t = PRE_TEST_TRAINClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *pre_test_train_item* updates
    if (t >= 0.6 && pre_test_train_item.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      pre_test_train_item.tStart = t;  // (not accounting for frame time here)
      pre_test_train_item.frameNStart = frameN;  // exact frame index
      
      pre_test_train_item.setAutoDraw(true);
    }

    frameRemains = 31.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((pre_test_train_item.status === PsychoJS.Status.STARTED || pre_test_train_item.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      pre_test_train_item.setAutoDraw(false);
    }
    
    // *pre_test_train_whitescreen* updates
    if (t >= 0.5 && pre_test_train_whitescreen.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      pre_test_train_whitescreen.tStart = t;  // (not accounting for frame time here)
      pre_test_train_whitescreen.frameNStart = frameN;  // exact frame index
      
      pre_test_train_whitescreen.setAutoDraw(true);
    }

    frameRemains = 0.6  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((pre_test_train_whitescreen.status === PsychoJS.Status.STARTED || pre_test_train_whitescreen.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      pre_test_train_whitescreen.setAutoDraw(false);
    }
    
    // *pre_test_train_fixation* updates
    if (t >= 0.0 && pre_test_train_fixation.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      pre_test_train_fixation.tStart = t;  // (not accounting for frame time here)
      pre_test_train_fixation.frameNStart = frameN;  // exact frame index
      
      pre_test_train_fixation.setAutoDraw(true);
    }

    frameRemains = 0.5  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((pre_test_train_fixation.status === PsychoJS.Status.STARTED || pre_test_train_fixation.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      pre_test_train_fixation.setAutoDraw(false);
    }
    
    // *pre_test_train_slider* updates
    if (t >= 0.6 && pre_test_train_slider.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      pre_test_train_slider.tStart = t;  // (not accounting for frame time here)
      pre_test_train_slider.frameNStart = frameN;  // exact frame index
      
      pre_test_train_slider.setAutoDraw(true);
    }

    frameRemains = 31.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((pre_test_train_slider.status === PsychoJS.Status.STARTED || pre_test_train_slider.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      pre_test_train_slider.setAutoDraw(false);
    }
    
    // *pre_test_train_timer* updates
    if (t >= 0.0 && pre_test_train_timer.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      pre_test_train_timer.tStart = t;  // (not accounting for frame time here)
      pre_test_train_timer.frameNStart = frameN;  // exact frame index
      
      pre_test_train_timer.setAutoDraw(true);
    }

    frameRemains = 31.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((pre_test_train_timer.status === PsychoJS.Status.STARTED || pre_test_train_timer.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      pre_test_train_timer.setAutoDraw(false);
    }
    
    // *pre_test_train_counter_1* updates
    if (t >= 0.0 && pre_test_train_counter_1.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      pre_test_train_counter_1.tStart = t;  // (not accounting for frame time here)
      pre_test_train_counter_1.frameNStart = frameN;  // exact frame index
      
      pre_test_train_counter_1.setAutoDraw(true);
    }

    frameRemains = 31.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((pre_test_train_counter_1.status === PsychoJS.Status.STARTED || pre_test_train_counter_1.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      pre_test_train_counter_1.setAutoDraw(false);
    }
    
    // *pre_test_train_counter_2* updates
    if (t >= 0.0 && pre_test_train_counter_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      pre_test_train_counter_2.tStart = t;  // (not accounting for frame time here)
      pre_test_train_counter_2.frameNStart = frameN;  // exact frame index
      
      pre_test_train_counter_2.setAutoDraw(true);
    }

    frameRemains = 31.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((pre_test_train_counter_2.status === PsychoJS.Status.STARTED || pre_test_train_counter_2.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      pre_test_train_counter_2.setAutoDraw(false);
    }
    
    // *pre_test_train_instr* updates
    if (t >= 0.0 && pre_test_train_instr.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      pre_test_train_instr.tStart = t;  // (not accounting for frame time here)
      pre_test_train_instr.frameNStart = frameN;  // exact frame index
      
      pre_test_train_instr.setAutoDraw(true);
    }

    frameRemains = 31.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((pre_test_train_instr.status === PsychoJS.Status.STARTED || pre_test_train_instr.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      pre_test_train_instr.setAutoDraw(false);
    }
    
    // *pre_test_train_feedback* updates
    if (t >= 0.0 && pre_test_train_feedback.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      pre_test_train_feedback.tStart = t;  // (not accounting for frame time here)
      pre_test_train_feedback.frameNStart = frameN;  // exact frame index
      
      pre_test_train_feedback.setAutoDraw(true);
    }

    frameRemains = 31.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((pre_test_train_feedback.status === PsychoJS.Status.STARTED || pre_test_train_feedback.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      pre_test_train_feedback.setAutoDraw(false);
    }
    
    // *pre_test_train_mark* updates
    if (t >= 0.6 && pre_test_train_mark.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      pre_test_train_mark.tStart = t;  // (not accounting for frame time here)
      pre_test_train_mark.frameNStart = frameN;  // exact frame index
      
      pre_test_train_mark.setAutoDraw(true);
    }

    frameRemains = 31.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((pre_test_train_mark.status === PsychoJS.Status.STARTED || pre_test_train_mark.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      pre_test_train_mark.setAutoDraw(false);
    }
    if (t >= 0.6 && pre_test_train_mouse.status === PsychoJS.Status.NOT_STARTED) {
          pre_test_train_mouse.tStart = t;  
          pre_test_train_mouse.frameNStart = frameN; 
          
          pre_test_train_mouse.status = PsychoJS.Status.STARTED;
          pre_test_train_mouse.mouseClock.reset();
          prevButtonState = pre_test_train_mouse.getPressed(); 
    }
    
    if ((pre_test_train_mouse.status === PsychoJS.Status.STARTED 
    || pre_test_train_mouse.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
          pre_test_train_mouse.status = PsychoJS.Status.FINISHED;
    }
    
    
    if (t >= 0.6 && pre_test_train_slider.markerPos !== undefined) {
        if (selected === null) {
            var ans = item_image_path.split("_").slice(-1)[0].split(".")[0];
            if (itemLabels[pre_test_train_slider.getMarkerPos() - 1] === ans) {
                pre_test_train_feedback.text = "Correct";
                preTestTrainCorrectCnt += 1;
                pre_test_train_counter_2.text = "Remaining correct answer(s) to skip practice: " + (3 - preTestTrainCorrectCnt);
            } else {
                pre_test_train_feedback.text = "Wrong";
            }
            selected = pre_test_train_slider.getMarkerPos();
            selectedTime = t;
        } else {
            pre_test_train_slider.setReadOnly(true);
            pre_test_train_slider.setMarkerPos(selected);
        }
    }
    
    if (selectedTime >= 29 && selectedTime <= 30) {
        stopTime = selectedTime + 1.0;
    }
    
    if (t >= stopTime && pre_test_train_slider.markerPos === undefined) {
        continueRoutine = false;
    }
    
    pre_test_train_timer.text = timerWarningRemain(preTestTimeL, t, 5);
    
    if (selected !== null && (t - selectedTime) >= 1.0) {
        continueRoutine = false;
    }
    
    if (skipped) {
        continueRoutine = false;
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
    for (const thisComponent of PRE_TEST_TRAINComponents)
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


function PRE_TEST_TRAINRoutineEnd() {
  return async function () {
    //------Ending Routine 'PRE_TEST_TRAIN'-------
    for (const thisComponent of PRE_TEST_TRAINComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('pre_test_train_slider.response', pre_test_train_slider.getRating());
    // store data for psychoJS.experiment (ExperimentHandler)
    _mouseXYs = pre_test_train_mouse.getPos();
    _mouseButtons = pre_test_train_mouse.getPressed();
    psychoJS.experiment.addData('pre_test_train_mouse.x', _mouseXYs[0]);
    psychoJS.experiment.addData('pre_test_train_mouse.y', _mouseXYs[1]);
    psychoJS.experiment.addData('pre_test_train_mouse.leftButton', _mouseButtons[0]);
    psychoJS.experiment.addData('pre_test_train_mouse.midButton', _mouseButtons[1]);
    psychoJS.experiment.addData('pre_test_train_mouse.rightButton', _mouseButtons[2]);
    if (pre_test_train_slider.markerPos !== undefined) {
        psychoJS.experiment.addData("pre_test_train.response",itemLabels[selected - 1]);
        psychoJS.experiment.addData("pre_test_train.tEnd",selectedTime);
    } else {
        psychoJS.experiment.addData("pre_test_train.response","Not provided");
        psychoJS.experiment.addData("pre_test_train.tEnd",t);
    }
    return Scheduler.Event.NEXT;
  };
}


var PRE_TESTComponents;
function PRE_TESTRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'PRE_TEST'-------
    t = 0;
    PRE_TESTClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(30.000000);
    // update component parameters for each repeat
    pre_test_item.setImage(img_path);
    pre_test_whitescreen.setImage('materials/merge_sort/imgs/white_BG.png');
    pre_test_fixation.setImage('materials/imgs/MaRs_IB/fixation.png');
    pre_test_slider.reset()
    // setup some python lists for storing info about the pre_test_mouse
    gotValidClick = false; // until a click is received
    pre_test_timer.setText('');
    pre_test_mark.setText('?');
    item_image_path = img_path;
    itemLabels = ["a","b","c","d"];
    selected = null;
    selectedTime = 0.0;
    pre_test_slider.setReadOnly(false);
    // keep track of which components have finished
    PRE_TESTComponents = [];
    PRE_TESTComponents.push(pre_test_item);
    PRE_TESTComponents.push(pre_test_whitescreen);
    PRE_TESTComponents.push(pre_test_fixation);
    PRE_TESTComponents.push(pre_test_slider);
    PRE_TESTComponents.push(pre_test_mouse);
    PRE_TESTComponents.push(pre_test_timer);
    PRE_TESTComponents.push(pre_test_instr);
    PRE_TESTComponents.push(pre_test_counter);
    PRE_TESTComponents.push(pre_test_mark);
    
    for (const thisComponent of PRE_TESTComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function PRE_TESTRoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'PRE_TEST'-------
    // get current time
    t = PRE_TESTClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *pre_test_item* updates
    if (t >= 0.6 && pre_test_item.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      pre_test_item.tStart = t;  // (not accounting for frame time here)
      pre_test_item.frameNStart = frameN;  // exact frame index
      
      pre_test_item.setAutoDraw(true);
    }

    frameRemains = 30.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((pre_test_item.status === PsychoJS.Status.STARTED || pre_test_item.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      pre_test_item.setAutoDraw(false);
    }
    
    // *pre_test_whitescreen* updates
    if (t >= 0.5 && pre_test_whitescreen.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      pre_test_whitescreen.tStart = t;  // (not accounting for frame time here)
      pre_test_whitescreen.frameNStart = frameN;  // exact frame index
      
      pre_test_whitescreen.setAutoDraw(true);
    }

    frameRemains = 0.6  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((pre_test_whitescreen.status === PsychoJS.Status.STARTED || pre_test_whitescreen.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      pre_test_whitescreen.setAutoDraw(false);
    }
    
    // *pre_test_fixation* updates
    if (t >= 0.0 && pre_test_fixation.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      pre_test_fixation.tStart = t;  // (not accounting for frame time here)
      pre_test_fixation.frameNStart = frameN;  // exact frame index
      
      pre_test_fixation.setAutoDraw(true);
    }

    frameRemains = 0.5  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((pre_test_fixation.status === PsychoJS.Status.STARTED || pre_test_fixation.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      pre_test_fixation.setAutoDraw(false);
    }
    
    // *pre_test_slider* updates
    if (t >= 0.6 && pre_test_slider.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      pre_test_slider.tStart = t;  // (not accounting for frame time here)
      pre_test_slider.frameNStart = frameN;  // exact frame index
      
      pre_test_slider.setAutoDraw(true);
    }

    frameRemains = 30.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((pre_test_slider.status === PsychoJS.Status.STARTED || pre_test_slider.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      pre_test_slider.setAutoDraw(false);
    }
    
    // *pre_test_timer* updates
    if (t >= 0.0 && pre_test_timer.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      pre_test_timer.tStart = t;  // (not accounting for frame time here)
      pre_test_timer.frameNStart = frameN;  // exact frame index
      
      pre_test_timer.setAutoDraw(true);
    }

    frameRemains = 30.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((pre_test_timer.status === PsychoJS.Status.STARTED || pre_test_timer.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      pre_test_timer.setAutoDraw(false);
    }
    
    // *pre_test_instr* updates
    if (t >= 0.0 && pre_test_instr.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      pre_test_instr.tStart = t;  // (not accounting for frame time here)
      pre_test_instr.frameNStart = frameN;  // exact frame index
      
      pre_test_instr.setAutoDraw(true);
    }

    frameRemains = 30.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((pre_test_instr.status === PsychoJS.Status.STARTED || pre_test_instr.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      pre_test_instr.setAutoDraw(false);
    }
    
    // *pre_test_counter* updates
    if (t >= 0.0 && pre_test_counter.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      pre_test_counter.tStart = t;  // (not accounting for frame time here)
      pre_test_counter.frameNStart = frameN;  // exact frame index
      
      pre_test_counter.setAutoDraw(true);
    }

    frameRemains = 30.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((pre_test_counter.status === PsychoJS.Status.STARTED || pre_test_counter.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      pre_test_counter.setAutoDraw(false);
    }
    
    // *pre_test_mark* updates
    if (t >= 0.6 && pre_test_mark.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      pre_test_mark.tStart = t;  // (not accounting for frame time here)
      pre_test_mark.frameNStart = frameN;  // exact frame index
      
      pre_test_mark.setAutoDraw(true);
    }

    frameRemains = 30.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((pre_test_mark.status === PsychoJS.Status.STARTED || pre_test_mark.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      pre_test_mark.setAutoDraw(false);
    }
    if (t >= 0.6 && pre_test_mouse.status === PsychoJS.Status.NOT_STARTED) {
          pre_test_mouse.tStart = t;  
          pre_test_mouse.frameNStart = frameN; 
          
          pre_test_mouse.status = PsychoJS.Status.STARTED;
          pre_test_mouse.mouseClock.reset();
          prevButtonState = pre_test_mouse.getPressed(); 
    }
    
    if ((pre_test_mouse.status === PsychoJS.Status.STARTED 
    || pre_test_mouse.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
          pre_test_mouse.status = PsychoJS.Status.FINISHED;
    }
    
    pre_test_timer.text = timerWarningRemain(preTestTimeL, t, 5);
    
    if (t >= 0.6 && pre_test_slider.markerPos !== undefined) {
        if (selected === null) {
            selected = pre_test_slider.getMarkerPos();
            selectedTime = t;
        } else {
            pre_test_slider.setReadOnly(true);
            pre_test_slider.setMarkerPos(selected);
        }
    }
    
    if ((t - selectedTime) >= 0.5 && selected !== null) {
        continueRoutine = false;
    }
    
    if ((selected && (preTestTime + selectedTime) >= preTestTotalTimeL) 
    || (!selected && (preTestTime + t) >= preTestTotalTimeL)) {
        continueRoutine = false;
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
    for (const thisComponent of PRE_TESTComponents)
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


function PRE_TESTRoutineEnd() {
  return async function () {
    //------Ending Routine 'PRE_TEST'-------
    for (const thisComponent of PRE_TESTComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('pre_test_slider.response', pre_test_slider.getRating());
    psychoJS.experiment.addData('pre_test_slider.rt', pre_test_slider.getRT());
    // store data for psychoJS.experiment (ExperimentHandler)
    _mouseXYs = pre_test_mouse.getPos();
    _mouseButtons = pre_test_mouse.getPressed();
    psychoJS.experiment.addData('pre_test_mouse.x', _mouseXYs[0]);
    psychoJS.experiment.addData('pre_test_mouse.y', _mouseXYs[1]);
    psychoJS.experiment.addData('pre_test_mouse.leftButton', _mouseButtons[0]);
    psychoJS.experiment.addData('pre_test_mouse.midButton', _mouseButtons[1]);
    psychoJS.experiment.addData('pre_test_mouse.rightButton', _mouseButtons[2]);
    if (pre_test_slider.markerPos !== undefined) {
        preTestTime += selectedTime;
        psychoJS.experiment.addData("pre_test.response",
            itemLabels[pre_test_slider.getMarkerPos() - 1]);
        psychoJS.experiment.addData("pre_test.tEnd", selectedTime);
    } else {
        preTestTime += t;
        psychoJS.experiment.addData("pre_test.response","Not provided");
        psychoJS.experiment.addData("pre_test.tEnd",t);
    }
    
    
    return Scheduler.Event.NEXT;
  };
}


var breakEnded;
var BREAK_1Components;
function BREAK_1RoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'BREAK_1'-------
    t = 0;
    BREAK_1Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    // setup some python lists for storing info about the break_1_mouse
    gotValidClick = false; // until a click is received
    breakEnded = false;
    routineT = 0;
    progressBar.show();
    progressBar.update("PRE_TEST");
    // keep track of which components have finished
    BREAK_1Components = [];
    BREAK_1Components.push(break_1_instr);
    BREAK_1Components.push(break_1_mouse);
    BREAK_1Components.push(break_1_btn);
    
    for (const thisComponent of BREAK_1Components)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function BREAK_1RoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'BREAK_1'-------
    // get current time
    t = BREAK_1Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *break_1_instr* updates
    if (((t >= 0.0)) && break_1_instr.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      break_1_instr.tStart = t;  // (not accounting for frame time here)
      break_1_instr.frameNStart = frameN;  // exact frame index
      
      break_1_instr.setAutoDraw(true);
    }

    if (break_1_instr.status === PsychoJS.Status.STARTED && Boolean(breakEnded)) {
      break_1_instr.setAutoDraw(false);
    }
    
    // *break_1_btn* updates
    if ((t>=0.0) && break_1_btn.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      break_1_btn.tStart = t;  // (not accounting for frame time here)
      break_1_btn.frameNStart = frameN;  // exact frame index
      
      break_1_btn.setAutoDraw(true);
    }

    if (break_1_btn.status === PsychoJS.Status.STARTED && Boolean(breakEnded)) {
      break_1_btn.setAutoDraw(false);
    }
    if (((t >= 0.5) && (break_1_mouse.status === PsychoJS.Status.NOT_STARTED))) {
        break_1_mouse.tStart = t;
        break_1_mouse.frameNStart = frameN;
        break_1_mouse.status = PsychoJS.Status.STARTED;
        break_1_mouse.mouseClock.reset();
    }
    if (((break_1_mouse.isPressedIn(break_1_btn) && (break_1_mouse.status === PsychoJS.Status.STARTED)) && (break_1_btn.status === PsychoJS.Status.STARTED))) {
        break_1_mouse.status = PsychoJS.Status.FINISHED;
        breakEnded = true;
    }
    routineT = t;
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of BREAK_1Components)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function BREAK_1RoutineEnd() {
  return async function () {
    //------Ending Routine 'BREAK_1'-------
    for (const thisComponent of BREAK_1Components) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // store data for psychoJS.experiment (ExperimentHandler)
    _mouseXYs = break_1_mouse.getPos();
    _mouseButtons = break_1_mouse.getPressed();
    psychoJS.experiment.addData('break_1_mouse.x', _mouseXYs[0]);
    psychoJS.experiment.addData('break_1_mouse.y', _mouseXYs[1]);
    psychoJS.experiment.addData('break_1_mouse.leftButton', _mouseButtons[0]);
    psychoJS.experiment.addData('break_1_mouse.midButton', _mouseButtons[1]);
    psychoJS.experiment.addData('break_1_mouse.rightButton', _mouseButtons[2]);
    psychoJS.experiment.addData("break_1.tEnd",routineT);
    // the Routine "BREAK_1" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var INTROComponents;
function INTRORoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'INTRO'-------
    t = 0;
    INTROClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(120.000000);
    // update component parameters for each repeat
    // setup some python lists for storing info about the intro_mouse
    gotValidClick = false; // until a click is received
    routineT = 0;
    // keep track of which components have finished
    INTROComponents = [];
    INTROComponents.push(intro_text);
    INTROComponents.push(alice);
    INTROComponents.push(bob);
    INTROComponents.push(blue_star_door);
    INTROComponents.push(purple_diamond_door);
    INTROComponents.push(intro_btn);
    INTROComponents.push(intro_mouse);
    
    for (const thisComponent of INTROComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function INTRORoutineEachFrame() {
  return async function () {
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
    
    // *blue_star_door* updates
    if (t >= 0.0 && blue_star_door.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      blue_star_door.tStart = t;  // (not accounting for frame time here)
      blue_star_door.frameNStart = frameN;  // exact frame index
      
      blue_star_door.setAutoDraw(true);
    }

    frameRemains = 0.0 + 120.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (blue_star_door.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      blue_star_door.setAutoDraw(false);
    }
    
    // *purple_diamond_door* updates
    if (t >= 0.0 && purple_diamond_door.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      purple_diamond_door.tStart = t;  // (not accounting for frame time here)
      purple_diamond_door.frameNStart = frameN;  // exact frame index
      
      purple_diamond_door.setAutoDraw(true);
    }

    frameRemains = 0.0 + 120.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (purple_diamond_door.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      purple_diamond_door.setAutoDraw(false);
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
    if (((t >= 0.5) && (intro_mouse.status === PsychoJS.Status.NOT_STARTED))) {
        intro_mouse.tStart = t;
        intro_mouse.frameNStart = frameN;
        intro_mouse.status = PsychoJS.Status.STARTED;
        intro_mouse.mouseClock.reset();
    }
    if (((intro_mouse.isPressedIn(intro_btn) && (intro_mouse.status === PsychoJS.Status.STARTED)) && (intro_btn.status === PsychoJS.Status.STARTED))) {
        intro_mouse.status = PsychoJS.Status.FINISHED;
        continueRoutine = false;
    }
    if ((intro_mouse.status === PsychoJS.Status.STARTED) && t >= frameRemains) {
        intro_mouse.status = PsychoJS.Status.FINISHED;
    }
    routineT = t;
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


function INTRORoutineEnd() {
  return async function () {
    //------Ending Routine 'INTRO'-------
    for (const thisComponent of INTROComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // store data for psychoJS.experiment (ExperimentHandler)
    _mouseXYs = intro_mouse.getPos();
    _mouseButtons = intro_mouse.getPressed();
    psychoJS.experiment.addData('intro_mouse.x', _mouseXYs[0]);
    psychoJS.experiment.addData('intro_mouse.y', _mouseXYs[1]);
    psychoJS.experiment.addData('intro_mouse.leftButton', _mouseButtons[0]);
    psychoJS.experiment.addData('intro_mouse.midButton', _mouseButtons[1]);
    psychoJS.experiment.addData('intro_mouse.rightButton', _mouseButtons[2]);
    psychoJS.experiment.addData("intro.tEnd",routineT);
    progressBar.update("INTRO");
    return Scheduler.Event.NEXT;
  };
}


var HINTComponents;
function HINTRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'HINT'-------
    t = 0;
    HINTClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(120.000000);
    // update component parameters for each repeat
    // setup some python lists for storing info about the hint_mouse
    gotValidClick = false; // until a click is received
    routineT = 0;
    // keep track of which components have finished
    HINTComponents = [];
    HINTComponents.push(intro_text_8);
    HINTComponents.push(arrow);
    HINTComponents.push(alice_5);
    HINTComponents.push(bob_5);
    HINTComponents.push(blue_star_door_2);
    HINTComponents.push(purple_diamond_door_2);
    HINTComponents.push(hint_btn);
    HINTComponents.push(hint_mouse);
    
    for (const thisComponent of HINTComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function HINTRoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'HINT'-------
    // get current time
    t = HINTClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *intro_text_8* updates
    if (t >= 0.0 && intro_text_8.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      intro_text_8.tStart = t;  // (not accounting for frame time here)
      intro_text_8.frameNStart = frameN;  // exact frame index
      
      intro_text_8.setAutoDraw(true);
    }

    frameRemains = 0.0 + 120.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (intro_text_8.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      intro_text_8.setAutoDraw(false);
    }
    
    // *arrow* updates
    if (t >= 0.0 && arrow.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      arrow.tStart = t;  // (not accounting for frame time here)
      arrow.frameNStart = frameN;  // exact frame index
      
      arrow.setAutoDraw(true);
    }

    frameRemains = 0.0 + 120.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (arrow.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      arrow.setAutoDraw(false);
    }
    
    // *alice_5* updates
    if (t >= 0.0 && alice_5.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      alice_5.tStart = t;  // (not accounting for frame time here)
      alice_5.frameNStart = frameN;  // exact frame index
      
      alice_5.setAutoDraw(true);
    }

    frameRemains = 0.0 + 120.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (alice_5.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      alice_5.setAutoDraw(false);
    }
    
    // *bob_5* updates
    if (t >= 0.0 && bob_5.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      bob_5.tStart = t;  // (not accounting for frame time here)
      bob_5.frameNStart = frameN;  // exact frame index
      
      bob_5.setAutoDraw(true);
    }

    frameRemains = 0.0 + 120.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (bob_5.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      bob_5.setAutoDraw(false);
    }
    
    // *blue_star_door_2* updates
    if (t >= 0.0 && blue_star_door_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      blue_star_door_2.tStart = t;  // (not accounting for frame time here)
      blue_star_door_2.frameNStart = frameN;  // exact frame index
      
      blue_star_door_2.setAutoDraw(true);
    }

    frameRemains = 0.0 + 120.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (blue_star_door_2.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      blue_star_door_2.setAutoDraw(false);
    }
    
    // *purple_diamond_door_2* updates
    if (t >= 0.0 && purple_diamond_door_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      purple_diamond_door_2.tStart = t;  // (not accounting for frame time here)
      purple_diamond_door_2.frameNStart = frameN;  // exact frame index
      
      purple_diamond_door_2.setAutoDraw(true);
    }

    frameRemains = 0.0 + 120.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (purple_diamond_door_2.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      purple_diamond_door_2.setAutoDraw(false);
    }
    
    // *hint_btn* updates
    if (t >= 0.5 && hint_btn.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      hint_btn.tStart = t;  // (not accounting for frame time here)
      hint_btn.frameNStart = frameN;  // exact frame index
      
      hint_btn.setAutoDraw(true);
    }

    frameRemains = 120.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((hint_btn.status === PsychoJS.Status.STARTED || hint_btn.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      hint_btn.setAutoDraw(false);
    }
    if (((t >= 0.5) && (hint_mouse.status === PsychoJS.Status.NOT_STARTED))) {
        hint_mouse.tStart = t;
        hint_mouse.frameNStart = frameN;
        hint_mouse.status = PsychoJS.Status.STARTED;
        hint_mouse.mouseClock.reset();
    }
    if (((hint_mouse.isPressedIn(intro_btn) && (hint_mouse.status === PsychoJS.Status.STARTED)) && (hint_btn.status === PsychoJS.Status.STARTED))) {
        hint_mouse.status = PsychoJS.Status.FINISHED;
        continueRoutine = false;
    }
    if ((hint_mouse.status === PsychoJS.Status.STARTED) && t >= frameRemains) {
        hint_mouse.status = PsychoJS.Status.FINISHED;
    }
    routineT = t;
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of HINTComponents)
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


function HINTRoutineEnd() {
  return async function () {
    //------Ending Routine 'HINT'-------
    for (const thisComponent of HINTComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // store data for psychoJS.experiment (ExperimentHandler)
    _mouseXYs = hint_mouse.getPos();
    _mouseButtons = hint_mouse.getPressed();
    psychoJS.experiment.addData('hint_mouse.x', _mouseXYs[0]);
    psychoJS.experiment.addData('hint_mouse.y', _mouseXYs[1]);
    psychoJS.experiment.addData('hint_mouse.leftButton', _mouseButtons[0]);
    psychoJS.experiment.addData('hint_mouse.midButton', _mouseButtons[1]);
    psychoJS.experiment.addData('hint_mouse.rightButton', _mouseButtons[2]);
    psychoJS.experiment.addData("hint.tEnd",routineT);
    progressBar.update("HINT");
    return Scheduler.Event.NEXT;
  };
}


var SORT_INTROComponents;
function SORT_INTRORoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'SORT_INTRO'-------
    t = 0;
    SORT_INTROClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(120.000000);
    // update component parameters for each repeat
    // setup some python lists for storing info about the sort_intro_mouse
    gotValidClick = false; // until a click is received
    routineT = 0;
    // keep track of which components have finished
    SORT_INTROComponents = [];
    SORT_INTROComponents.push(intro_text_3);
    SORT_INTROComponents.push(bob_2);
    SORT_INTROComponents.push(sort_example);
    SORT_INTROComponents.push(purple_diamond_door_3);
    SORT_INTROComponents.push(sort_intro_btn);
    SORT_INTROComponents.push(sort_intro_mouse);
    
    for (const thisComponent of SORT_INTROComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function SORT_INTRORoutineEachFrame() {
  return async function () {
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
    
    // *purple_diamond_door_3* updates
    if (t >= 0.0 && purple_diamond_door_3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      purple_diamond_door_3.tStart = t;  // (not accounting for frame time here)
      purple_diamond_door_3.frameNStart = frameN;  // exact frame index
      
      purple_diamond_door_3.setAutoDraw(true);
    }

    frameRemains = 0.0 + 120.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (purple_diamond_door_3.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      purple_diamond_door_3.setAutoDraw(false);
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
    if (((t >= 0.5) && (sort_intro_mouse.status === PsychoJS.Status.NOT_STARTED))) {
        sort_intro_mouse.tStart = t;
        sort_intro_mouse.frameNStart = frameN;
        sort_intro_mouse.status = PsychoJS.Status.STARTED;
        sort_intro_mouse.mouseClock.reset();
    }
    if (((sort_intro_mouse.isPressedIn(sort_intro_btn) && (sort_intro_mouse.status === PsychoJS.Status.STARTED)) && (sort_intro_btn.status === PsychoJS.Status.STARTED))) {
        sort_intro_mouse.status = PsychoJS.Status.FINISHED;
        continueRoutine = false;
    }
    routineT = t;
    if ((sort_intro_mouse.status === PsychoJS.Status.STARTED) && t >= frameRemains) {
        sort_intro_mouse.status = PsychoJS.Status.FINISHED;
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


function SORT_INTRORoutineEnd() {
  return async function () {
    //------Ending Routine 'SORT_INTRO'-------
    for (const thisComponent of SORT_INTROComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // store data for psychoJS.experiment (ExperimentHandler)
    _mouseXYs = sort_intro_mouse.getPos();
    _mouseButtons = sort_intro_mouse.getPressed();
    psychoJS.experiment.addData('sort_intro_mouse.x', _mouseXYs[0]);
    psychoJS.experiment.addData('sort_intro_mouse.y', _mouseXYs[1]);
    psychoJS.experiment.addData('sort_intro_mouse.leftButton', _mouseButtons[0]);
    psychoJS.experiment.addData('sort_intro_mouse.midButton', _mouseButtons[1]);
    psychoJS.experiment.addData('sort_intro_mouse.rightButton', _mouseButtons[2]);
    psychoJS.experiment.addData("sort_intro.tEnd",routineT);
    progressBar.update("SORT_INTRO");
    return Scheduler.Event.NEXT;
  };
}


var items;
var frameCnt;
var isComparePressed;
var comparePressedT;
var tracePos;
var sort_train_input;
var sort_train_labels;
var sort_train_compareN;
var sort_train_compare_records;
var sort_train_trace;
var sort_train_compare_limit;
var sort_train_path_base;
var sort_train_res_boxes;
var movingItem;
var x;
var y;
var w;
var h;
var top;
var bot;
var left;
var right;
var SORT_TRAINComponents;
function SORT_TRAINRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'SORT_TRAIN'-------
    t = 0;
    SORT_TRAINClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(300.000000);
    // update component parameters for each repeat
    sort_train_scale_instr.setColor(new util.Color('white'));
    sort_train_scale_instr.setText('COMPARE weights by typing fruit labels in both LHS and RHS textboxes');
    sort_train_scale_instr.setHeight(0.02);
    sort_train_scale_right.setText('');
    sort_train_scale_right.setText('');
    sort_train_scale_left.setText('');
    sort_train_scale_left.setText('');
    sort_train_board.setImage('materials/merge_sort/imgs/purple_diamond.png');
    sort_train_scale.setImage(scaleEqPath);
    sort_train_ex_1.setOpacity(0.0);
    sort_train_ex_1.setPos([(- 0.25), 0.3]);
    sort_train_ex_2.setOpacity(0.0);
    sort_train_ex_2.setPos([(- 0.2), 0.3]);
    sort_train_ex_3.setOpacity(0.0);
    sort_train_ex_3.setPos([(- 0.15), 0.3]);
    sort_train_ex_4.setOpacity(0.0);
    sort_train_ex_4.setPos([(- 0.1), 0.3]);
    sort_train_ex_5.setOpacity(0.0);
    sort_train_ex_5.setPos([(- 0.05), 0.3]);
    sort_train_ex_6.setOpacity(0.0);
    sort_train_ex_6.setPos([0.0, 0.3]);
    sort_train_ex_7.setOpacity(0.0);
    sort_train_ex_7.setPos([0.05, 0.3]);
    sort_train_ex_8.setOpacity(0.0);
    sort_train_ex_8.setPos([0.1, 0.3]);
    sort_train_ex_9.setOpacity(0.0);
    sort_train_ex_9.setPos([0.15, 0.3]);
    sort_train_ex_10.setOpacity(0.0);
    sort_train_ex_10.setPos([0.2, 0.3]);
    sort_train_ex_11.setOpacity(0.0);
    sort_train_ex_11.setPos([0.25, 0.3]);
    sort_train_ex_12.setOpacity(0.0);
    sort_train_ex_12.setPos([0.3, 0.3]);
    // setup some python lists for storing info about the sort_train_mouse
    gotValidClick = false; // until a click is received
    sort_train_timer.setText('');
    sort_train_hint.setText('');
    items = [];
    frameCnt = 0;
    routineT = 0;
    isComparePressed = false;
    comparePressedT = 0.0;
    tracePos = [];
    sort_train_input = input;
    sort_train_labels = encryption;
    sort_train_compareN = 0;
    sort_train_compare_records = [];
    sort_train_trace = [];
    sort_train_compare_limit = ms_compare;
    sort_train_path_base = img_path_base;
    sort_train_res_boxes = [];
    
    sort_train_scale_left.refresh();
    sort_train_scale_right.refresh();
    
    sort_train_hint.text = ((("BOB uses " + sort_train_compare_limit.toString()) + " comparisons\n") + "You have used: 0");
    movingItem = null;
    
    x = sort_train_board.getPos()[0];
    y = sort_train_board.getPos()[1];
    w = sort_train_board.getSize()[0];
    h = sort_train_board.getSize()[1];
    top = (y + (h / 2));
    bot = (y - (h / 2));
    left = (x - (w / 2));
    right = (x + (w / 2));
    
    const sort_train_mouse_btns = sort_train_mouse.psychoJS.eventManager.getMouseInfo().buttons;
    for (const b of [0,1,2]){
        sort_train_mouse_btns.pressed[b] = 0;
        sort_train_mouse_btns.clocks[b].reset();
        sort_train_mouse_btns.times[b] = 0.0;
    }
    
    for (var i = 0; i < sort_train_labels.length; i ++) {
        let newTextBox = new visual.TextBox({
            win: psychoJS.window,
            name: '' + i,
            text: '',
            font: 'Open Sans',
            pos: [(- 0.2) - (sort_train_labels.length * 0.08 / 2).toFixed(4) + i * 0.08, (- 0.3)], letterHeight: 0.04,
            size: [0.07, 0.1],  units: undefined, 
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
        newTextBox.setAutoDraw(true);
        sort_train_res_boxes.push(newTextBox);
    }
    // keep track of which components have finished
    SORT_TRAINComponents = [];
    SORT_TRAINComponents.push(sort_train_scale_instr);
    SORT_TRAINComponents.push(sort_train_ans_instr);
    SORT_TRAINComponents.push(sort_train_instr);
    SORT_TRAINComponents.push(sort_train_scale_right);
    SORT_TRAINComponents.push(sort_train_scale_left);
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
    SORT_TRAINComponents.push(sort_train_compare);
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
function SORT_TRAINRoutineEachFrame() {
  return async function () {
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

    frameRemains = 0.0 + 300.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
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

    frameRemains = 0.0 + 300.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
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

    frameRemains = 0.0 + 300.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
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

    frameRemains = 0.0 + 300.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
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

    frameRemains = 0.0 + 300.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (sort_train_scale_left.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      sort_train_scale_left.setAutoDraw(false);
    }
    
    // *sort_train_sep* updates
    if (t >= 0.0 && sort_train_sep.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_train_sep.tStart = t;  // (not accounting for frame time here)
      sort_train_sep.frameNStart = frameN;  // exact frame index
      
      sort_train_sep.setAutoDraw(true);
    }

    frameRemains = 0.0 + 300.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
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

    frameRemains = 0.0 + 300.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
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

    frameRemains = 0.0 + 300.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (sort_train_scale.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      sort_train_scale.setAutoDraw(false);
    }
    
    // *sort_train_ex_1* updates
    if (t >= 0.5 && sort_train_ex_1.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_train_ex_1.tStart = t;  // (not accounting for frame time here)
      sort_train_ex_1.frameNStart = frameN;  // exact frame index
      
      sort_train_ex_1.setAutoDraw(true);
    }

    frameRemains = 300.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((sort_train_ex_1.status === PsychoJS.Status.STARTED || sort_train_ex_1.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      sort_train_ex_1.setAutoDraw(false);
    }
    
    // *sort_train_ex_2* updates
    if (t >= 0.5 && sort_train_ex_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_train_ex_2.tStart = t;  // (not accounting for frame time here)
      sort_train_ex_2.frameNStart = frameN;  // exact frame index
      
      sort_train_ex_2.setAutoDraw(true);
    }

    frameRemains = 300.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((sort_train_ex_2.status === PsychoJS.Status.STARTED || sort_train_ex_2.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      sort_train_ex_2.setAutoDraw(false);
    }
    
    // *sort_train_ex_3* updates
    if (t >= 0.5 && sort_train_ex_3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_train_ex_3.tStart = t;  // (not accounting for frame time here)
      sort_train_ex_3.frameNStart = frameN;  // exact frame index
      
      sort_train_ex_3.setAutoDraw(true);
    }

    frameRemains = 300.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((sort_train_ex_3.status === PsychoJS.Status.STARTED || sort_train_ex_3.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      sort_train_ex_3.setAutoDraw(false);
    }
    
    // *sort_train_ex_4* updates
    if (t >= 0.5 && sort_train_ex_4.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_train_ex_4.tStart = t;  // (not accounting for frame time here)
      sort_train_ex_4.frameNStart = frameN;  // exact frame index
      
      sort_train_ex_4.setAutoDraw(true);
    }

    frameRemains = 300.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((sort_train_ex_4.status === PsychoJS.Status.STARTED || sort_train_ex_4.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      sort_train_ex_4.setAutoDraw(false);
    }
    
    // *sort_train_ex_5* updates
    if (t >= 0.5 && sort_train_ex_5.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_train_ex_5.tStart = t;  // (not accounting for frame time here)
      sort_train_ex_5.frameNStart = frameN;  // exact frame index
      
      sort_train_ex_5.setAutoDraw(true);
    }

    frameRemains = 300.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((sort_train_ex_5.status === PsychoJS.Status.STARTED || sort_train_ex_5.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      sort_train_ex_5.setAutoDraw(false);
    }
    
    // *sort_train_ex_6* updates
    if (t >= 0.5 && sort_train_ex_6.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_train_ex_6.tStart = t;  // (not accounting for frame time here)
      sort_train_ex_6.frameNStart = frameN;  // exact frame index
      
      sort_train_ex_6.setAutoDraw(true);
    }

    frameRemains = 300.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((sort_train_ex_6.status === PsychoJS.Status.STARTED || sort_train_ex_6.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      sort_train_ex_6.setAutoDraw(false);
    }
    
    // *sort_train_ex_7* updates
    if (t >= 0.5 && sort_train_ex_7.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_train_ex_7.tStart = t;  // (not accounting for frame time here)
      sort_train_ex_7.frameNStart = frameN;  // exact frame index
      
      sort_train_ex_7.setAutoDraw(true);
    }

    frameRemains = 300.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((sort_train_ex_7.status === PsychoJS.Status.STARTED || sort_train_ex_7.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      sort_train_ex_7.setAutoDraw(false);
    }
    
    // *sort_train_ex_8* updates
    if (t >= 0.5 && sort_train_ex_8.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_train_ex_8.tStart = t;  // (not accounting for frame time here)
      sort_train_ex_8.frameNStart = frameN;  // exact frame index
      
      sort_train_ex_8.setAutoDraw(true);
    }

    frameRemains = 300.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((sort_train_ex_8.status === PsychoJS.Status.STARTED || sort_train_ex_8.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      sort_train_ex_8.setAutoDraw(false);
    }
    
    // *sort_train_ex_9* updates
    if (t >= 0.5 && sort_train_ex_9.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_train_ex_9.tStart = t;  // (not accounting for frame time here)
      sort_train_ex_9.frameNStart = frameN;  // exact frame index
      
      sort_train_ex_9.setAutoDraw(true);
    }

    frameRemains = 300.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((sort_train_ex_9.status === PsychoJS.Status.STARTED || sort_train_ex_9.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      sort_train_ex_9.setAutoDraw(false);
    }
    
    // *sort_train_ex_10* updates
    if (t >= 0.5 && sort_train_ex_10.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_train_ex_10.tStart = t;  // (not accounting for frame time here)
      sort_train_ex_10.frameNStart = frameN;  // exact frame index
      
      sort_train_ex_10.setAutoDraw(true);
    }

    frameRemains = 300.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((sort_train_ex_10.status === PsychoJS.Status.STARTED || sort_train_ex_10.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      sort_train_ex_10.setAutoDraw(false);
    }
    
    // *sort_train_ex_11* updates
    if (t >= 0.5 && sort_train_ex_11.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_train_ex_11.tStart = t;  // (not accounting for frame time here)
      sort_train_ex_11.frameNStart = frameN;  // exact frame index
      
      sort_train_ex_11.setAutoDraw(true);
    }

    frameRemains = 300.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((sort_train_ex_11.status === PsychoJS.Status.STARTED || sort_train_ex_11.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      sort_train_ex_11.setAutoDraw(false);
    }
    
    // *sort_train_ex_12* updates
    if (t >= 0.5 && sort_train_ex_12.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_train_ex_12.tStart = t;  // (not accounting for frame time here)
      sort_train_ex_12.frameNStart = frameN;  // exact frame index
      
      sort_train_ex_12.setAutoDraw(true);
    }

    frameRemains = 300.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((sort_train_ex_12.status === PsychoJS.Status.STARTED || sort_train_ex_12.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      sort_train_ex_12.setAutoDraw(false);
    }
    
    // *sort_train_btn* updates
    if (t >= 0.5 && sort_train_btn.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_train_btn.tStart = t;  // (not accounting for frame time here)
      sort_train_btn.frameNStart = frameN;  // exact frame index
      
      sort_train_btn.setAutoDraw(true);
    }

    frameRemains = 300.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((sort_train_btn.status === PsychoJS.Status.STARTED || sort_train_btn.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      sort_train_btn.setAutoDraw(false);
    }
    
    // *sort_train_compare* updates
    if (t >= 0.5 && sort_train_compare.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_train_compare.tStart = t;  // (not accounting for frame time here)
      sort_train_compare.frameNStart = frameN;  // exact frame index
      
      sort_train_compare.setAutoDraw(true);
    }

    frameRemains = 300.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((sort_train_compare.status === PsychoJS.Status.STARTED || sort_train_compare.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      sort_train_compare.setAutoDraw(false);
    }
    
    // *sort_train_timer* updates
    if (t >= 0.0 && sort_train_timer.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_train_timer.tStart = t;  // (not accounting for frame time here)
      sort_train_timer.frameNStart = frameN;  // exact frame index
      
      sort_train_timer.setAutoDraw(true);
    }

    frameRemains = 300.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
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

    frameRemains = 300.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((sort_train_hint.status === PsychoJS.Status.STARTED || sort_train_hint.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      sort_train_hint.setAutoDraw(false);
    }
    frameCnt = (frameCnt + 1);
    if ((items.length === 0)) {
        items = enableImageComponents(SORT_TRAINComponents, sort_train_labels, sort_train_path_base, sort_train_ex_1.size[0], sort_train_board.pos[0], sort_train_board.pos[1]);
        for (var u = 0, v = items.length; (u < v); u += 1) {
            items[u].opacity = 1.0;
        }
        movingItem = items[0];
    }
    
    if (t >= 0.5 && sort_train_mouse.status === PsychoJS.Status.NOT_STARTED) {
          sort_train_mouse.tStart = t;
          sort_train_mouse.frameNStart = frameN;  
          
          sort_train_mouse.status = PsychoJS.Status.STARTED;
          sort_train_mouse.mouseClock.reset();
          prevButtonState = sort_train_mouse.getPressed();
    }
    
    if ((sort_train_mouse.status === PsychoJS.Status.STARTED || sort_train_mouse.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
          sort_train_mouse.status = PsychoJS.Status.FINISHED;
      }
    
    if (t >= 0.5 && sort_train_mouse.status === PsychoJS.Status.STARTED) {
        _mouseButtons = sort_train_mouse.getPressed();
        if (!_mouseButtons.every( (e,i,) => (e == prevButtonState[i]) )) {
            prevButtonState = _mouseButtons;
            if (_mouseButtons.reduce( (e, acc) => (e+acc) ) > 0) { 
                for (const obj of [sort_train_btn,sort_train_compare]) {
                    if (sort_train_mouse.isPressedIn(obj) && obj.name === "sort_train_btn") {
                        sort_train_mouse.status = PsychoJS.Status.FINISHED;
                        continueRoutine = false;
                    } else {
                        if(sort_train_mouse.isPressedIn(obj) && !isComparePressed) {
                            if(obj.name === "sort_train_compare") {
                                const sort_train_mouse_btns = sort_train_mouse.psychoJS.eventManager.getMouseInfo().buttons;
                                for (const b of [0,1,2]){
                                    sort_train_mouse_btns.pressed[b] = 0;
                                    sort_train_mouse_btns.clocks[b].reset();
                                    sort_train_mouse_btns.times[b] = 0.0;
                                }
                                const compareStatus = compare(sort_train_scale, sort_train_input, sort_train_labels, sort_train_compare, sort_train_scale_instr, sort_train_scale_left, sort_train_scale_right);
                                sort_train_compareN = (sort_train_compareN + compareStatus[0]);
                                sort_train_hint.text = (((("BOB uses " + sort_train_compare_limit.toString()) + " comparisons\n") + "You have used: ") + sort_train_compareN.toString());
                                if (compareStatus[0] !== 0) {
                                    sort_train_compare_records.push([compareStatus[1],compareStatus[2]]);
                                }
                                comparePressedT = t;
                                isComparePressed = true;
                            }
                        }
                    }
                }
            }
        }
    }
    
    if (t >= 0.5 && sort_train_mouse.status === PsychoJS.Status.STARTED) {
        movingItem = moveItem(sort_train_mouse, movingItem);
        if (((frameCnt % traceSaveAtFrame) === 0)) {
            newTracePos = [];
            for (var i, _pj_c = 0, _pj_a = items, _pj_b = _pj_a.length; (_pj_c < _pj_b); _pj_c += 1) {
                i = _pj_a[_pj_c];
                newTracePos.push([i.name.split("_").slice((- 1))[0], i.pos[0], i.pos[1]]);
            }
            hasMoved = updateTrace(tracePos, newTracePos);
            if ((hasMoved.length > 0)) {
                for (var j, _pj_c = 0, _pj_a = hasMoved, _pj_b = _pj_a.length; (_pj_c < _pj_b); _pj_c += 1) {
                    j = _pj_a[_pj_c];
                    sort_train_trace.push(j);
                }
            }
            tracePos = newTracePos;
        }
    }
    sort_train_timer.text = timerWarning(sortTrainTimeL, t);
    routineT = t;
    
    if (isComparePressed && (routineT - comparePressedT) >= 0.1) {
        sort_train_compare.image = "materials/merge_sort/imgs/compare.png";
        isComparePressed = false;
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


var sort_train_res;
function SORT_TRAINRoutineEnd() {
  return async function () {
    //------Ending Routine 'SORT_TRAIN'-------
    for (const thisComponent of SORT_TRAINComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('sort_train_scale_right.text',sort_train_scale_right.text)
    psychoJS.experiment.addData('sort_train_scale_left.text',sort_train_scale_left.text)
    // store data for psychoJS.experiment (ExperimentHandler)
    _mouseXYs = sort_train_mouse.getPos();
    _mouseButtons = sort_train_mouse.getPressed();
    psychoJS.experiment.addData('sort_train_mouse.x', _mouseXYs[0]);
    psychoJS.experiment.addData('sort_train_mouse.y', _mouseXYs[1]);
    psychoJS.experiment.addData('sort_train_mouse.leftButton', _mouseButtons[0]);
    psychoJS.experiment.addData('sort_train_mouse.midButton', _mouseButtons[1]);
    psychoJS.experiment.addData('sort_train_mouse.rightButton', _mouseButtons[2]);
    sort_train_res = [];
    
    for (var i = 0; i < sort_train_labels.length; i ++) {
        sort_train_res_boxes[i].setAutoDraw(false);
        sort_train_res_boxes[i].status === PsychoJS.Status.FINISHED;
        sort_train_res.push(sort_train_res_boxes[i].text);
    }
    psychoJS.experiment.addData("sort_train_res.text",sort_train_res.toString());
    psychoJS.experiment.addData("sort_train_input",sort_train_input);
    psychoJS.experiment.addData("sort_train_labels",sort_train_labels);
    psychoJS.experiment.addData("sort_train_trace",sort_train_trace);
    psychoJS.experiment.addData("sort_train_compareN",sort_train_compareN);
    psychoJS.experiment.addData("sort_train.tStart",sort_train_ex_1.tStart);
    psychoJS.experiment.addData("sort_train.tEnd",routineT);
    psychoJS.experiment.addData("sort_train_compare_records",sort_train_compare_records);
    progressBar.update("SORT_TRAIN");
    return Scheduler.Event.NEXT;
  };
}


var positions;
var sort_expl_input;
var sort_expl_labels;
var sort_expl_compareN;
var sort_expl_trace;
var sort_expl_compare_records;
var sort_expl_path_base;
var sort_expl_res_boxes;
var SORT_EXPLComponents;
function SORT_EXPLRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'SORT_EXPL'-------
    t = 0;
    SORT_EXPLClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(60.000000);
    // update component parameters for each repeat
    sort_expl_scale_instr.setColor(new util.Color('white'));
    sort_expl_scale_instr.setText('COMPARE weights by typing fruit labels in both LHS and RHS textboxes');
    sort_expl_scale_instr.setHeight(0.02);
    sort_expl_feedback_1.setColor(new util.Color('white'));
    sort_expl_feedback_1.setText('');
    sort_expl_feedback_2.setColor(new util.Color('white'));
    sort_expl_feedback_2.setText('');
    sort_expl_scale_right.setText('');
    sort_expl_scale_right.setText('');
    sort_expl_scale_left.setText('');
    sort_expl_scale_left.setText('');
    sort_expl_board.setImage('materials/merge_sort/imgs/purple_diamond.png');
    sort_expl_scale.setImage(scaleEqPath);
    sort_expl_ex_1.setOpacity(0.0);
    sort_expl_ex_1.setPos([(- 0.25), 0.3]);
    sort_expl_ex_2.setOpacity(0.0);
    sort_expl_ex_2.setPos([(- 0.2), 0.3]);
    sort_expl_ex_3.setOpacity(0.0);
    sort_expl_ex_3.setPos([(- 0.15), 0.3]);
    sort_expl_ex_4.setOpacity(0.0);
    sort_expl_ex_4.setPos([(- 0.1), 0.3]);
    sort_expl_ex_5.setOpacity(0.0);
    sort_expl_ex_5.setPos([(- 0.05), 0.3]);
    sort_expl_ex_6.setOpacity(0.0);
    sort_expl_ex_6.setPos([0.0, 0.3]);
    sort_expl_ex_7.setOpacity(0.0);
    sort_expl_ex_7.setPos([0.05, 0.3]);
    sort_expl_ex_8.setOpacity(0.0);
    sort_expl_ex_8.setPos([0.1, 0.3]);
    sort_expl_ex_9.setOpacity(0.0);
    sort_expl_ex_9.setPos([0.15, 0.3]);
    sort_expl_ex_10.setOpacity(0.0);
    sort_expl_ex_10.setPos([0.2, 0.3]);
    sort_expl_ex_11.setOpacity(0.0);
    sort_expl_ex_11.setPos([0.25, 0.3]);
    sort_expl_ex_12.setOpacity(0.0);
    sort_expl_ex_12.setPos([0.3, 0.3]);
    // setup some python lists for storing info about the sort_expl_mouse
    gotValidClick = false; // until a click is received
    sort_expl_timer.setText('');
    sort_expl_hint.setText('');
    positions = [];
    for (var u, _pj_c = 0, _pj_a = items, _pj_b = _pj_a.length; (_pj_c < _pj_b); _pj_c += 1) {
        u = _pj_a[_pj_c];
        positions.push(u.pos);
    }
    items = [];
    frameCnt = 0;
    tracePos = [];
    isComparePressed = false;
    comparePressedT = 0.0;
    movingItem = null;
    sort_expl_input = input;
    sort_expl_labels = encryption;
    sort_expl_compareN = 0;
    sort_expl_trace = [];
    sort_expl_compare_records = [];
    sort_expl_path_base = img_path_base;
    sort_expl_res_boxes = [];
    
    sort_expl_scale_left.refresh();
    sort_expl_scale_right.refresh();
    
    sort_expl_hint.text = (((("BOB uses " + sort_train_compare_limit.toString()) + " comparisons\n") + "You have used: ") + (sort_train_compareN + sort_expl_compareN).toString());
    checkSortTrainAns(sort_expl_input, sort_expl_labels, sort_train_res.toString(), sort_expl_feedback_1, sort_expl_feedback_2);
    x = sort_expl_board.getPos()[0];
    y = sort_expl_board.getPos()[1];
    w = sort_expl_board.getSize()[0];
    h = sort_expl_board.getSize()[1];
    top = (y + (h / 2));
    bot = (y - (h / 2));
    left = (x - (w / 2));
    right = (x + (w / 2));
    
    routineT = 0;
    
    const sort_expl_mouse_btns = sort_expl_mouse.psychoJS.eventManager.getMouseInfo().buttons;
    for (const b of [0,1,2]){
        sort_expl_mouse_btns.pressed[b] = 0;
        sort_expl_mouse_btns.clocks[b].reset();
        sort_expl_mouse_btns.times[b] = 0.0;
    }
    
    for (var i = 0; i < sort_expl_labels.length; i ++) {
        let newTextBox = new visual.TextBox({
            win: psychoJS.window,
            name: '' + i,
            text: sort_train_res[i],
            font: 'Open Sans',
            pos: [(- 0.2) - (sort_expl_labels.length * 0.08 / 2).toFixed(4) + i * 0.08, (- 0.3)], letterHeight: 0.04,
            size: [0.07, 0.1],  units: undefined, 
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
        newTextBox.setAutoDraw(true);
        sort_expl_res_boxes.push(newTextBox);
    }
    // keep track of which components have finished
    SORT_EXPLComponents = [];
    SORT_EXPLComponents.push(sort_expl_scale_instr);
    SORT_EXPLComponents.push(sort_expl_feedback_1);
    SORT_EXPLComponents.push(sort_expl_feedback_2);
    SORT_EXPLComponents.push(sort_expl_instr);
    SORT_EXPLComponents.push(sort_expl_scale_right);
    SORT_EXPLComponents.push(sort_expl_scale_left);
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
    SORT_EXPLComponents.push(sort_expl_compare);
    SORT_EXPLComponents.push(sort_expl_mouse);
    SORT_EXPLComponents.push(sort_expl_timer);
    SORT_EXPLComponents.push(sort_expl_hint);
    
    for (const thisComponent of SORT_EXPLComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function SORT_EXPLRoutineEachFrame() {
  return async function () {
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
    if (t >= 0.5 && sort_expl_feedback_1.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_expl_feedback_1.tStart = t;  // (not accounting for frame time here)
      sort_expl_feedback_1.frameNStart = frameN;  // exact frame index
      
      sort_expl_feedback_1.setAutoDraw(true);
    }

    frameRemains = 60.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((sort_expl_feedback_1.status === PsychoJS.Status.STARTED || sort_expl_feedback_1.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      sort_expl_feedback_1.setAutoDraw(false);
    }
    
    // *sort_expl_feedback_2* updates
    if (t >= 0.5 && sort_expl_feedback_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_expl_feedback_2.tStart = t;  // (not accounting for frame time here)
      sort_expl_feedback_2.frameNStart = frameN;  // exact frame index
      
      sort_expl_feedback_2.setAutoDraw(true);
    }

    frameRemains = 60.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((sort_expl_feedback_2.status === PsychoJS.Status.STARTED || sort_expl_feedback_2.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
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
    if (t >= 0.5 && sort_expl_ex_1.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_expl_ex_1.tStart = t;  // (not accounting for frame time here)
      sort_expl_ex_1.frameNStart = frameN;  // exact frame index
      
      sort_expl_ex_1.setAutoDraw(true);
    }

    frameRemains = 60.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((sort_expl_ex_1.status === PsychoJS.Status.STARTED || sort_expl_ex_1.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      sort_expl_ex_1.setAutoDraw(false);
    }
    
    // *sort_expl_ex_2* updates
    if (t >= 0.5 && sort_expl_ex_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_expl_ex_2.tStart = t;  // (not accounting for frame time here)
      sort_expl_ex_2.frameNStart = frameN;  // exact frame index
      
      sort_expl_ex_2.setAutoDraw(true);
    }

    frameRemains = 60.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((sort_expl_ex_2.status === PsychoJS.Status.STARTED || sort_expl_ex_2.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      sort_expl_ex_2.setAutoDraw(false);
    }
    
    // *sort_expl_ex_3* updates
    if (t >= 0.5 && sort_expl_ex_3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_expl_ex_3.tStart = t;  // (not accounting for frame time here)
      sort_expl_ex_3.frameNStart = frameN;  // exact frame index
      
      sort_expl_ex_3.setAutoDraw(true);
    }

    frameRemains = 60.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((sort_expl_ex_3.status === PsychoJS.Status.STARTED || sort_expl_ex_3.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      sort_expl_ex_3.setAutoDraw(false);
    }
    
    // *sort_expl_ex_4* updates
    if (t >= 0.5 && sort_expl_ex_4.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_expl_ex_4.tStart = t;  // (not accounting for frame time here)
      sort_expl_ex_4.frameNStart = frameN;  // exact frame index
      
      sort_expl_ex_4.setAutoDraw(true);
    }

    frameRemains = 60.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((sort_expl_ex_4.status === PsychoJS.Status.STARTED || sort_expl_ex_4.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      sort_expl_ex_4.setAutoDraw(false);
    }
    
    // *sort_expl_ex_5* updates
    if (t >= 0.5 && sort_expl_ex_5.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_expl_ex_5.tStart = t;  // (not accounting for frame time here)
      sort_expl_ex_5.frameNStart = frameN;  // exact frame index
      
      sort_expl_ex_5.setAutoDraw(true);
    }

    frameRemains = 60.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((sort_expl_ex_5.status === PsychoJS.Status.STARTED || sort_expl_ex_5.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      sort_expl_ex_5.setAutoDraw(false);
    }
    
    // *sort_expl_ex_6* updates
    if (t >= 0.5 && sort_expl_ex_6.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_expl_ex_6.tStart = t;  // (not accounting for frame time here)
      sort_expl_ex_6.frameNStart = frameN;  // exact frame index
      
      sort_expl_ex_6.setAutoDraw(true);
    }

    frameRemains = 60.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((sort_expl_ex_6.status === PsychoJS.Status.STARTED || sort_expl_ex_6.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      sort_expl_ex_6.setAutoDraw(false);
    }
    
    // *sort_expl_ex_7* updates
    if (t >= 0.5 && sort_expl_ex_7.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_expl_ex_7.tStart = t;  // (not accounting for frame time here)
      sort_expl_ex_7.frameNStart = frameN;  // exact frame index
      
      sort_expl_ex_7.setAutoDraw(true);
    }

    frameRemains = 60.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((sort_expl_ex_7.status === PsychoJS.Status.STARTED || sort_expl_ex_7.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      sort_expl_ex_7.setAutoDraw(false);
    }
    
    // *sort_expl_ex_8* updates
    if (t >= 0.5 && sort_expl_ex_8.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_expl_ex_8.tStart = t;  // (not accounting for frame time here)
      sort_expl_ex_8.frameNStart = frameN;  // exact frame index
      
      sort_expl_ex_8.setAutoDraw(true);
    }

    frameRemains = 60.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((sort_expl_ex_8.status === PsychoJS.Status.STARTED || sort_expl_ex_8.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      sort_expl_ex_8.setAutoDraw(false);
    }
    
    // *sort_expl_ex_9* updates
    if (t >= 0.5 && sort_expl_ex_9.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_expl_ex_9.tStart = t;  // (not accounting for frame time here)
      sort_expl_ex_9.frameNStart = frameN;  // exact frame index
      
      sort_expl_ex_9.setAutoDraw(true);
    }

    frameRemains = 60.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((sort_expl_ex_9.status === PsychoJS.Status.STARTED || sort_expl_ex_9.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      sort_expl_ex_9.setAutoDraw(false);
    }
    
    // *sort_expl_ex_10* updates
    if (t >= 0.5 && sort_expl_ex_10.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_expl_ex_10.tStart = t;  // (not accounting for frame time here)
      sort_expl_ex_10.frameNStart = frameN;  // exact frame index
      
      sort_expl_ex_10.setAutoDraw(true);
    }

    frameRemains = 60.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((sort_expl_ex_10.status === PsychoJS.Status.STARTED || sort_expl_ex_10.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      sort_expl_ex_10.setAutoDraw(false);
    }
    
    // *sort_expl_ex_11* updates
    if (t >= 0.5 && sort_expl_ex_11.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_expl_ex_11.tStart = t;  // (not accounting for frame time here)
      sort_expl_ex_11.frameNStart = frameN;  // exact frame index
      
      sort_expl_ex_11.setAutoDraw(true);
    }

    frameRemains = 60.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((sort_expl_ex_11.status === PsychoJS.Status.STARTED || sort_expl_ex_11.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      sort_expl_ex_11.setAutoDraw(false);
    }
    
    // *sort_expl_ex_12* updates
    if (t >= 0.5 && sort_expl_ex_12.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_expl_ex_12.tStart = t;  // (not accounting for frame time here)
      sort_expl_ex_12.frameNStart = frameN;  // exact frame index
      
      sort_expl_ex_12.setAutoDraw(true);
    }

    frameRemains = 60.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((sort_expl_ex_12.status === PsychoJS.Status.STARTED || sort_expl_ex_12.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
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
    
    // *sort_expl_compare* updates
    if (t >= 0.5 && sort_expl_compare.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_expl_compare.tStart = t;  // (not accounting for frame time here)
      sort_expl_compare.frameNStart = frameN;  // exact frame index
      
      sort_expl_compare.setAutoDraw(true);
    }

    frameRemains = 60.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((sort_expl_compare.status === PsychoJS.Status.STARTED || sort_expl_compare.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      sort_expl_compare.setAutoDraw(false);
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
    frameCnt = (frameCnt + 1);
    if ((items.length === 0)) {
        items = enableImageComponents(SORT_EXPLComponents, sort_expl_labels, sort_expl_path_base, sort_expl_ex_1.size[0], sort_expl_board.pos[0], sort_expl_board.pos[1]);
        for (var i = 0, _pj_a = items.length; (i < _pj_a); i += 1) {
            items[i].pos = positions[i];
            items[i].opacity = 1.0;
        }
        movingItem = items[0];
    }
    
    if (t >= 0.5 && sort_expl_mouse.status === PsychoJS.Status.NOT_STARTED) {
          sort_expl_mouse.tStart = t;
          sort_expl_mouse.frameNStart = frameN;  
          
          sort_expl_mouse.status = PsychoJS.Status.STARTED;
          sort_expl_mouse.mouseClock.reset();
          prevButtonState = sort_expl_mouse.getPressed();
    }
    
    if ((sort_expl_mouse.status === PsychoJS.Status.STARTED || sort_expl_mouse.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
          sort_expl_mouse.status = PsychoJS.Status.FINISHED;
      }
    
    if (t >= 0.5 && sort_expl_mouse.status === PsychoJS.Status.STARTED) {
        _mouseButtons = sort_expl_mouse.getPressed();
        if (!_mouseButtons.every( (e,i,) => (e == prevButtonState[i]) )) {
            prevButtonState = _mouseButtons;
            if (_mouseButtons.reduce( (e, acc) => (e+acc) ) > 0) { 
                for (const obj of [sort_expl_btn,sort_expl_compare]) {
                    if (sort_expl_mouse.isPressedIn(obj) && obj.name === "sort_expl_btn") {
                        sort_expl_mouse.status = PsychoJS.Status.FINISHED;
                        continueRoutine = false;
                    } else {
                        if(sort_expl_mouse.isPressedIn(obj) && !isComparePressed) {
                            if(obj.name === "sort_expl_compare") {
                                const sort_expl_mouse_btns = sort_expl_mouse.psychoJS.eventManager.getMouseInfo().buttons;
                                for (const b of [0,1,2]){
                                    sort_expl_mouse_btns.pressed[b] = 0;
                                    sort_expl_mouse_btns.clocks[b].reset();
                                    sort_expl_mouse_btns.times[b] = 0.0;
                                }
                                const compareStatus = compare(sort_expl_scale, sort_expl_input, sort_expl_labels, sort_expl_compare, sort_expl_scale_instr, sort_expl_scale_left, sort_expl_scale_right);
                                sort_expl_compareN = (sort_expl_compareN + compareStatus[0]);
                                sort_expl_hint.text = (((("BOB uses " + sort_train_compare_limit.toString()) + " comparisons\n") + "You have used: ") + (sort_train_compareN + sort_expl_compareN).toString());
                                if (compareStatus[0] !== 0) {
                                    sort_expl_compare_records.push([compareStatus[1],compareStatus[2]]);
                                }
                                comparePressedT = t;
                                isComparePressed = true;
                            }
                        }
                    }
                }
            }
        }
    }
    
    if (t >= 0.5 && sort_expl_mouse.status === PsychoJS.Status.STARTED) {
        movingItem = moveItem(sort_expl_mouse, movingItem);
        if (((frameCnt % traceSaveAtFrame) === 0)) {
            newTracePos = [];
            for (var i, _pj_c = 0, _pj_a = items, _pj_b = _pj_a.length; (_pj_c < _pj_b); _pj_c += 1) {
                i = _pj_a[_pj_c];
                newTracePos.push([i.name.split("_").slice((- 1))[0], i.pos[0], i.pos[1]]);
            }
            hasMoved = updateTrace(tracePos, newTracePos);
            if ((hasMoved.length > 0)) {
                for (var j, _pj_c = 0, _pj_a = hasMoved, _pj_b = _pj_a.length; (_pj_c < _pj_b); _pj_c += 1) {
                    j = _pj_a[_pj_c];
                    sort_expl_trace.push(j);
                }
            }
            tracePos = newTracePos;
        }
    }
    sort_expl_timer.text = timerWarning(sortExplTimeL, t);
    routineT = t;
    
    if (isComparePressed && (routineT - comparePressedT) >= 0.1) {
        sort_expl_compare.image = "materials/merge_sort/imgs/compare.png";
        isComparePressed = false;
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


function SORT_EXPLRoutineEnd() {
  return async function () {
    //------Ending Routine 'SORT_EXPL'-------
    for (const thisComponent of SORT_EXPLComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('sort_expl_scale_right.text',sort_expl_scale_right.text)
    psychoJS.experiment.addData('sort_expl_scale_left.text',sort_expl_scale_left.text)
    // store data for psychoJS.experiment (ExperimentHandler)
    _mouseXYs = sort_expl_mouse.getPos();
    _mouseButtons = sort_expl_mouse.getPressed();
    psychoJS.experiment.addData('sort_expl_mouse.x', _mouseXYs[0]);
    psychoJS.experiment.addData('sort_expl_mouse.y', _mouseXYs[1]);
    psychoJS.experiment.addData('sort_expl_mouse.leftButton', _mouseButtons[0]);
    psychoJS.experiment.addData('sort_expl_mouse.midButton', _mouseButtons[1]);
    psychoJS.experiment.addData('sort_expl_mouse.rightButton', _mouseButtons[2]);
    for (var i = 0; i < sort_expl_labels.length; i ++) {
        sort_expl_res_boxes[i].setAutoDraw(false);
        sort_expl_res_boxes[i].status === PsychoJS.Status.FINISHED;
    }
    psychoJS.experiment.addData("sort_expl_trace",sort_expl_trace);
    psychoJS.experiment.addData("sort_expl_compareN",sort_expl_compareN);
    psychoJS.experiment.addData("sort_expl_compare_records",sort_expl_compare_records);
    psychoJS.experiment.addData("sort_expl.tStart",sort_expl_ex_1.tStart);
    psychoJS.experiment.addData("sort_expl.tEnd",routineT);
    progressBar.update("SORT_EXPL");
    return Scheduler.Event.NEXT;
  };
}


var MERGE_INTROComponents;
function MERGE_INTRORoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'MERGE_INTRO'-------
    t = 0;
    MERGE_INTROClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(120.000000);
    // update component parameters for each repeat
    // setup some python lists for storing info about the merge_intro_mouse
    gotValidClick = false; // until a click is received
    routineT = 0;
    // keep track of which components have finished
    MERGE_INTROComponents = [];
    MERGE_INTROComponents.push(intro_text_2);
    MERGE_INTROComponents.push(alice_2);
    MERGE_INTROComponents.push(merge_example);
    MERGE_INTROComponents.push(blue_star_door_3);
    MERGE_INTROComponents.push(merge_intro_btn);
    MERGE_INTROComponents.push(merge_intro_mouse);
    
    for (const thisComponent of MERGE_INTROComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function MERGE_INTRORoutineEachFrame() {
  return async function () {
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
    
    // *blue_star_door_3* updates
    if (t >= 0.0 && blue_star_door_3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      blue_star_door_3.tStart = t;  // (not accounting for frame time here)
      blue_star_door_3.frameNStart = frameN;  // exact frame index
      
      blue_star_door_3.setAutoDraw(true);
    }

    frameRemains = 0.0 + 120.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (blue_star_door_3.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      blue_star_door_3.setAutoDraw(false);
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
    if (((t >= 0.5) && (merge_intro_mouse.status === PsychoJS.Status.NOT_STARTED))) {
        merge_intro_mouse.tStart = t;
        merge_intro_mouse.frameNStart = frameN;
        merge_intro_mouse.status = PsychoJS.Status.STARTED;
        merge_intro_mouse.mouseClock.reset();
    }
    if (((merge_intro_mouse.isPressedIn(merge_intro_btn) && (merge_intro_mouse.status === PsychoJS.Status.STARTED)) && (merge_intro_btn.status === PsychoJS.Status.STARTED))) {
        merge_intro_mouse.status = PsychoJS.Status.FINISHED;
        continueRoutine = false;
    }
    if ((merge_intro_mouse.status === PsychoJS.Status.STARTED) && t >= frameRemains) {
        merge_intro_mouse.status = PsychoJS.Status.FINISHED;
    }
    routineT = t;
    
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


function MERGE_INTRORoutineEnd() {
  return async function () {
    //------Ending Routine 'MERGE_INTRO'-------
    for (const thisComponent of MERGE_INTROComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // store data for psychoJS.experiment (ExperimentHandler)
    _mouseXYs = merge_intro_mouse.getPos();
    _mouseButtons = merge_intro_mouse.getPressed();
    psychoJS.experiment.addData('merge_intro_mouse.x', _mouseXYs[0]);
    psychoJS.experiment.addData('merge_intro_mouse.y', _mouseXYs[1]);
    psychoJS.experiment.addData('merge_intro_mouse.leftButton', _mouseButtons[0]);
    psychoJS.experiment.addData('merge_intro_mouse.midButton', _mouseButtons[1]);
    psychoJS.experiment.addData('merge_intro_mouse.rightButton', _mouseButtons[2]);
    psychoJS.experiment.addData("merge_intro.tEnd",routineT);
    progressBar.update("MERGE_INTRO");
    return Scheduler.Event.NEXT;
  };
}


var merge_train_input;
var mc_order;
var merge_train_compare_records;
var merge_train_labels;
var merge_train_compareN;
var merge_train_mc_path_2;
var merge_train_mc_path_1;
var MERGE_TRAINComponents;
function MERGE_TRAINRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'MERGE_TRAIN'-------
    t = 0;
    MERGE_TRAINClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(90.000000);
    // update component parameters for each repeat
    merge_train_scale_instr.setColor(new util.Color('white'));
    merge_train_scale_instr.setText('COMPARE weights by typing fruit labels in both LHS and RHS textboxes');
    merge_train_scale_instr.setHeight(0.02);
    merge_train_scale_right.setText('');
    merge_train_scale_right.setText('');
    merge_train_scale_left.setText('');
    merge_train_scale_left.setText('');
    merge_train.setImage(img_path);
    merge_train_scale.setImage(scaleEqPath);
    // setup some python lists for storing info about the merge_train_mouse
    merge_train_mouse.clicked_name = [];
    gotValidClick = false; // until a click is received
    merge_train_timer.setText('');
    merge_train_input = input;
    mc_order = [];
    merge_train_compare_records = [];
    merge_train_labels = encryption;
    merge_train_compareN = 0;
    merge_train_mc_path_2 = mc_path_2;
    merge_train_mc_path_1 = mc_path_1;
    
    merge_train_scale_left.refresh();
    merge_train_scale_right.refresh();
    
    routineT = 0;
    isComparePressed = false;
    comparePressedT = 0.0;
    
    const merge_train_mouse_btns = merge_train_mouse.psychoJS.eventManager.getMouseInfo().buttons;
    for (const b of [0,1,2]){
        merge_train_mouse_btns.pressed[b] = 0;
        merge_train_mouse_btns.clocks[b].reset();
        merge_train_mouse_btns.times[b] = 0.0;
    }
    // keep track of which components have finished
    MERGE_TRAINComponents = [];
    MERGE_TRAINComponents.push(merge_train_scale_instr);
    MERGE_TRAINComponents.push(merge_ans_instr);
    MERGE_TRAINComponents.push(merge_train_instr);
    MERGE_TRAINComponents.push(merge_train_scale_right);
    MERGE_TRAINComponents.push(merge_train_scale_left);
    MERGE_TRAINComponents.push(merge_train_sep);
    MERGE_TRAINComponents.push(merge_train);
    MERGE_TRAINComponents.push(merge_train_mc_1);
    MERGE_TRAINComponents.push(merge_train_mc_2);
    MERGE_TRAINComponents.push(merge_train_scale);
    MERGE_TRAINComponents.push(merge_train_btn_1);
    MERGE_TRAINComponents.push(merge_train_btn_2);
    MERGE_TRAINComponents.push(merge_train_compare);
    MERGE_TRAINComponents.push(merge_train_mouse);
    MERGE_TRAINComponents.push(merge_train_timer);
    
    for (const thisComponent of MERGE_TRAINComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function MERGE_TRAINRoutineEachFrame() {
  return async function () {
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

    frameRemains = 0.0 + 90.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
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

    frameRemains = 0.0 + 90.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
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

    frameRemains = 0.0 + 90.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
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

    frameRemains = 90.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((merge_train_scale_right.status === PsychoJS.Status.STARTED || merge_train_scale_right.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      merge_train_scale_right.setAutoDraw(false);
    }
    
    // *merge_train_scale_left* updates
    if (t >= 0.0 && merge_train_scale_left.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      merge_train_scale_left.tStart = t;  // (not accounting for frame time here)
      merge_train_scale_left.frameNStart = frameN;  // exact frame index
      
      merge_train_scale_left.setAutoDraw(true);
    }

    frameRemains = 90.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((merge_train_scale_left.status === PsychoJS.Status.STARTED || merge_train_scale_left.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      merge_train_scale_left.setAutoDraw(false);
    }
    
    // *merge_train_sep* updates
    if (t >= 0.0 && merge_train_sep.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      merge_train_sep.tStart = t;  // (not accounting for frame time here)
      merge_train_sep.frameNStart = frameN;  // exact frame index
      
      merge_train_sep.setAutoDraw(true);
    }

    frameRemains = 0.0 + 90.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (merge_train_sep.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      merge_train_sep.setAutoDraw(false);
    }
    
    // *merge_train* updates
    if (t >= 0.5 && merge_train.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      merge_train.tStart = t;  // (not accounting for frame time here)
      merge_train.frameNStart = frameN;  // exact frame index
      
      merge_train.setAutoDraw(true);
    }

    frameRemains = 90.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((merge_train.status === PsychoJS.Status.STARTED || merge_train.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      merge_train.setAutoDraw(false);
    }
    
    // *merge_train_mc_1* updates
    if (t >= 0.0 && merge_train_mc_1.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      merge_train_mc_1.tStart = t;  // (not accounting for frame time here)
      merge_train_mc_1.frameNStart = frameN;  // exact frame index
      
      merge_train_mc_1.setAutoDraw(true);
    }

    frameRemains = 0.0 + 90.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
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

    frameRemains = 0.0 + 90.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
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

    frameRemains = 0.0 + 90.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (merge_train_scale.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      merge_train_scale.setAutoDraw(false);
    }
    
    // *merge_train_btn_1* updates
    if (t >= 0.5 && merge_train_btn_1.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      merge_train_btn_1.tStart = t;  // (not accounting for frame time here)
      merge_train_btn_1.frameNStart = frameN;  // exact frame index
      
      merge_train_btn_1.setAutoDraw(true);
    }

    frameRemains = 90.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
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

    frameRemains = 90.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((merge_train_btn_2.status === PsychoJS.Status.STARTED || merge_train_btn_2.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      merge_train_btn_2.setAutoDraw(false);
    }
    
    // *merge_train_compare* updates
    if (t >= 0.5 && merge_train_compare.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      merge_train_compare.tStart = t;  // (not accounting for frame time here)
      merge_train_compare.frameNStart = frameN;  // exact frame index
      
      merge_train_compare.setAutoDraw(true);
    }

    frameRemains = 90.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((merge_train_compare.status === PsychoJS.Status.STARTED || merge_train_compare.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      merge_train_compare.setAutoDraw(false);
    }
    
    // *merge_train_timer* updates
    if (t >= 0.0 && merge_train_timer.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      merge_train_timer.tStart = t;  // (not accounting for frame time here)
      merge_train_timer.frameNStart = frameN;  // exact frame index
      
      merge_train_timer.setAutoDraw(true);
    }

    frameRemains = 90.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((merge_train_timer.status === PsychoJS.Status.STARTED || merge_train_timer.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      merge_train_timer.setAutoDraw(false);
    }
    if ((mc_order.length === 0)) {
        mc_order = getCorrectMCOrder(TRAIN_1.thisTrialN, merge_train_mc_path_1, merge_train_mc_path_2, merge_train_mc_1, merge_train_mc_2);
    }
    
    if (t >= 0.5 && merge_train_mouse.status === PsychoJS.Status.NOT_STARTED) {
          merge_train_mouse.tStart = t;  
          merge_train_mouse.frameNStart = frameN;  
          
          merge_train_mouse.status = PsychoJS.Status.STARTED;
          merge_train_mouse.mouseClock.reset();
          prevButtonState = merge_train_mouse.getPressed();  
    }
    
    if ((merge_train_mouse.status === PsychoJS.Status.STARTED || merge_train_mouse.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
          merge_train_mouse.status = PsychoJS.Status.FINISHED;
    }
    
    if (t >= 0.5 && merge_train_mouse.status === PsychoJS.Status.STARTED) {
        _mouseButtons = merge_train_mouse.getPressed();
        if (!_mouseButtons.every( (e,i,) => (e == prevButtonState[i]) )) {
            prevButtonState = _mouseButtons;
            if (_mouseButtons.reduce( (e, acc) => (e+acc) ) > 0) { 
                for (const obj of [merge_train_btn_1,merge_train_btn_2,merge_train_compare]) {
                    if (merge_train_mouse.isPressedIn(obj) && (obj.name === "merge_train_btn_1" || obj.name === "merge_train_btn_2")) {
                        merge_train_mouse.clicked_name.push(obj.name);
                        merge_train_mouse.status = PsychoJS.Status.FINISHED;
                        continueRoutine = false;
                    } else {
                        if(merge_train_mouse.isPressedIn(obj) && !isComparePressed) {
                            if(obj.name === "merge_train_compare") {
                                const compareStatus = compare(merge_train_scale, merge_train_input, merge_train_labels, merge_train_compare, merge_train_scale_instr, merge_train_scale_left, merge_train_scale_right);
                                merge_train_compareN = (merge_train_compareN + compareStatus[0]);
                                if (compareStatus[0] !== 0) {
                                    merge_train_compare_records.push([compareStatus[1],compareStatus[2]]);
                                }
                                comparePressedT = t;
                                isComparePressed = true;
                            }
                        }
                    }
                }
            }
        }
    }
    
    merge_train_timer.text = timerWarning(mergeTrainTimeL, t);
    routineT = t;
    
    if (isComparePressed && (routineT - comparePressedT) >= 0.1) {
        merge_train_compare.image = "materials/merge_sort/imgs/compare.png";
        isComparePressed = false;
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


function MERGE_TRAINRoutineEnd() {
  return async function () {
    //------Ending Routine 'MERGE_TRAIN'-------
    for (const thisComponent of MERGE_TRAINComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('merge_train_scale_right.text',merge_train_scale_right.text)
    psychoJS.experiment.addData('merge_train_scale_left.text',merge_train_scale_left.text)
    // store data for psychoJS.experiment (ExperimentHandler)
    _mouseXYs = merge_train_mouse.getPos();
    _mouseButtons = merge_train_mouse.getPressed();
    psychoJS.experiment.addData('merge_train_mouse.x', _mouseXYs[0]);
    psychoJS.experiment.addData('merge_train_mouse.y', _mouseXYs[1]);
    psychoJS.experiment.addData('merge_train_mouse.leftButton', _mouseButtons[0]);
    psychoJS.experiment.addData('merge_train_mouse.midButton', _mouseButtons[1]);
    psychoJS.experiment.addData('merge_train_mouse.rightButton', _mouseButtons[2]);
    if (merge_train_mouse.clicked_name.length > 0) {
      psychoJS.experiment.addData('merge_train_mouse.clicked_name', merge_train_mouse.clicked_name[0]);}
    psychoJS.experiment.addData("merge_train.tStart", merge_train.tStart);
    psychoJS.experiment.addData("mc_order",mc_order);
    psychoJS.experiment.addData("merge_train_compareN",merge_train_compareN);
    psychoJS.experiment.addData("merge_train_labels",merge_train_labels);
    psychoJS.experiment.addData("merge_train_input",merge_train_input);
    psychoJS.experiment.addData("merge_train_compare_records",merge_train_compare_records);
    psychoJS.experiment.addData("merge_train_mouse_clicked",merge_train_mouse.clicked_name);
    psychoJS.experiment.addData("merge_train.tEnd",routineT);
    progressBar.update("MERGE_TRAIN");
    return Scheduler.Event.NEXT;
  };
}


var _pj;
var MERGE_EXPLComponents;
function MERGE_EXPLRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'MERGE_EXPL'-------
    t = 0;
    MERGE_EXPLClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(60.000000);
    // update component parameters for each repeat
    merge_expl_initial_state.setColor(new util.Color('white'));
    merge_expl_initial_state.setText('Initial state');
    merge_expl_feedback.setColor(new util.Color('white'));
    merge_expl_feedback.setText('');
    merge_expl_ex.setImage(img_path);
    merge_expl_1.setImage('materials/merge_sort/imgs/white_BG.png');
    merge_expl_2.setImage('materials/merge_sort/imgs/white_BG.png');
    // setup some python lists for storing info about the merge_expl_mouse
    gotValidClick = false; // until a click is received
    merge_expl_timer.setColor(new util.Color('white'));
    merge_expl_timer.setText('Read the feedback and continue whenever you are ready (60 SECS)');
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
    if (showMergeExpl(submitted, merge_expl_feedback_1, merge_expl_feedback_2, merge_expl_mc_1, merge_expl_mc_2, merge_train_mc_path_1, merge_train_mc_path_2, merge_expl_1, merge_expl_2)){
        merge_expl_feedback.text = "You answer is CORRECT!";
        merge_expl_feedback.color = green;
    } else {
        if (submitted !== 2) {
            merge_expl_feedback.text = "You answer is WRONG!";
            merge_expl_feedback.color = red;
        }
    }
    
    routineT = 0;
    // keep track of which components have finished
    MERGE_EXPLComponents = [];
    MERGE_EXPLComponents.push(merge_expl_initial_state);
    MERGE_EXPLComponents.push(merge_expl_feedback);
    MERGE_EXPLComponents.push(merge_expl_feedback_1);
    MERGE_EXPLComponents.push(merge_expl_feedback_2);
    MERGE_EXPLComponents.push(merge_expl_ex);
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


function MERGE_EXPLRoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'MERGE_EXPL'-------
    // get current time
    t = MERGE_EXPLClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *merge_expl_initial_state* updates
    if (t >= 0.0 && merge_expl_initial_state.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      merge_expl_initial_state.tStart = t;  // (not accounting for frame time here)
      merge_expl_initial_state.frameNStart = frameN;  // exact frame index
      
      merge_expl_initial_state.setAutoDraw(true);
    }

    frameRemains = 0.0 + 60.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (merge_expl_initial_state.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      merge_expl_initial_state.setAutoDraw(false);
    }
    
    // *merge_expl_feedback* updates
    if (t >= 0.0 && merge_expl_feedback.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      merge_expl_feedback.tStart = t;  // (not accounting for frame time here)
      merge_expl_feedback.frameNStart = frameN;  // exact frame index
      
      merge_expl_feedback.setAutoDraw(true);
    }

    frameRemains = 0.0 + 60.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (merge_expl_feedback.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      merge_expl_feedback.setAutoDraw(false);
    }
    
    // *merge_expl_feedback_1* updates
    if (t >= 0.5 && merge_expl_feedback_1.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      merge_expl_feedback_1.tStart = t;  // (not accounting for frame time here)
      merge_expl_feedback_1.frameNStart = frameN;  // exact frame index
      
      merge_expl_feedback_1.setAutoDraw(true);
    }

    frameRemains = 60.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((merge_expl_feedback_1.status === PsychoJS.Status.STARTED || merge_expl_feedback_1.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      merge_expl_feedback_1.setAutoDraw(false);
    }
    
    // *merge_expl_feedback_2* updates
    if (t >= 0.5 && merge_expl_feedback_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      merge_expl_feedback_2.tStart = t;  // (not accounting for frame time here)
      merge_expl_feedback_2.frameNStart = frameN;  // exact frame index
      
      merge_expl_feedback_2.setAutoDraw(true);
    }

    frameRemains = 60.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((merge_expl_feedback_2.status === PsychoJS.Status.STARTED || merge_expl_feedback_2.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      merge_expl_feedback_2.setAutoDraw(false);
    }
    
    // *merge_expl_ex* updates
    if (t >= 0.5 && merge_expl_ex.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      merge_expl_ex.tStart = t;  // (not accounting for frame time here)
      merge_expl_ex.frameNStart = frameN;  // exact frame index
      
      merge_expl_ex.setAutoDraw(true);
    }

    frameRemains = 60.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((merge_expl_ex.status === PsychoJS.Status.STARTED || merge_expl_ex.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      merge_expl_ex.setAutoDraw(false);
    }
    
    // *merge_expl_sep* updates
    if (t >= 0.0 && merge_expl_sep.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      merge_expl_sep.tStart = t;  // (not accounting for frame time here)
      merge_expl_sep.frameNStart = frameN;  // exact frame index
      
      merge_expl_sep.setAutoDraw(true);
    }

    frameRemains = 0.0 + 60.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (merge_expl_sep.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      merge_expl_sep.setAutoDraw(false);
    }
    
    // *merge_expl_1* updates
    if (t >= 0.5 && merge_expl_1.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      merge_expl_1.tStart = t;  // (not accounting for frame time here)
      merge_expl_1.frameNStart = frameN;  // exact frame index
      
      merge_expl_1.setAutoDraw(true);
    }

    frameRemains = 60.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((merge_expl_1.status === PsychoJS.Status.STARTED || merge_expl_1.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      merge_expl_1.setAutoDraw(false);
    }
    
    // *merge_expl_2* updates
    if (t >= 0.5 && merge_expl_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      merge_expl_2.tStart = t;  // (not accounting for frame time here)
      merge_expl_2.frameNStart = frameN;  // exact frame index
      
      merge_expl_2.setAutoDraw(true);
    }

    frameRemains = 60.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((merge_expl_2.status === PsychoJS.Status.STARTED || merge_expl_2.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      merge_expl_2.setAutoDraw(false);
    }
    
    // *merge_expl_mc_1* updates
    if (t >= 0.5 && merge_expl_mc_1.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      merge_expl_mc_1.tStart = t;  // (not accounting for frame time here)
      merge_expl_mc_1.frameNStart = frameN;  // exact frame index
      
      merge_expl_mc_1.setAutoDraw(true);
    }

    frameRemains = 60.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((merge_expl_mc_1.status === PsychoJS.Status.STARTED || merge_expl_mc_1.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      merge_expl_mc_1.setAutoDraw(false);
    }
    
    // *merge_expl_mc_2* updates
    if (t >= 0.5 && merge_expl_mc_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      merge_expl_mc_2.tStart = t;  // (not accounting for frame time here)
      merge_expl_mc_2.frameNStart = frameN;  // exact frame index
      
      merge_expl_mc_2.setAutoDraw(true);
    }

    frameRemains = 60.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((merge_expl_mc_2.status === PsychoJS.Status.STARTED || merge_expl_mc_2.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      merge_expl_mc_2.setAutoDraw(false);
    }
    
    // *merge_expl_btn* updates
    if (t >= 0.5 && merge_expl_btn.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      merge_expl_btn.tStart = t;  // (not accounting for frame time here)
      merge_expl_btn.frameNStart = frameN;  // exact frame index
      
      merge_expl_btn.setAutoDraw(true);
    }

    frameRemains = 60.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((merge_expl_btn.status === PsychoJS.Status.STARTED || merge_expl_btn.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      merge_expl_btn.setAutoDraw(false);
    }
    
    // *merge_expl_timer* updates
    if (t >= 0.0 && merge_expl_timer.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      merge_expl_timer.tStart = t;  // (not accounting for frame time here)
      merge_expl_timer.frameNStart = frameN;  // exact frame index
      
      merge_expl_timer.setAutoDraw(true);
    }

    frameRemains = 60.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((merge_expl_timer.status === PsychoJS.Status.STARTED || merge_expl_timer.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      merge_expl_timer.setAutoDraw(false);
    }
    const timerString = timerWarning(mergeExplTimeL, t);
    if (timerString !== "") {
        merge_expl_timer.text = timerString;
        merge_expl_timer.color = "orange";
    }
    
    if (t >= 0.5 && merge_expl_mouse.status === PsychoJS.Status.NOT_STARTED) {
          merge_expl_mouse.tStart = t;
          merge_expl_mouse.frameNStart = frameN;
          
          merge_expl_mouse.status = PsychoJS.Status.STARTED;
          merge_expl_mouse.mouseClock.reset();
          prevButtonState = merge_expl_mouse.getPressed();
    }
    
    if ((merge_expl_mouse.status === PsychoJS.Status.STARTED || merge_expl_mouse.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
          merge_expl_mouse.status = PsychoJS.Status.FINISHED;
    }
    
    if (merge_expl_mouse.status === PsychoJS.Status.STARTED) {
        _mouseButtons = merge_expl_mouse.getPressed();
        if (!_mouseButtons.every( (e,i,) => (e == prevButtonState[i]) )) {
            prevButtonState = _mouseButtons;
            if (_mouseButtons.reduce( (e, acc) => (e+acc) ) > 0) { 
                for (const obj of [merge_expl_btn]) {
                    if (merge_expl_mouse.isPressedIn(obj) && (obj.name === "merge_expl_btn")) {
                        merge_expl_mouse.status = PsychoJS.Status.FINISHED;
                        continueRoutine = false;
                    } 
                }
            }
        }
    }
    
    routineT = t;
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


function MERGE_EXPLRoutineEnd() {
  return async function () {
    //------Ending Routine 'MERGE_EXPL'-------
    for (const thisComponent of MERGE_EXPLComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // store data for psychoJS.experiment (ExperimentHandler)
    _mouseXYs = merge_expl_mouse.getPos();
    _mouseButtons = merge_expl_mouse.getPressed();
    psychoJS.experiment.addData('merge_expl_mouse.x', _mouseXYs[0]);
    psychoJS.experiment.addData('merge_expl_mouse.y', _mouseXYs[1]);
    psychoJS.experiment.addData('merge_expl_mouse.leftButton', _mouseButtons[0]);
    psychoJS.experiment.addData('merge_expl_mouse.midButton', _mouseButtons[1]);
    psychoJS.experiment.addData('merge_expl_mouse.rightButton', _mouseButtons[2]);
    psychoJS.experiment.addData("merge_expl.tStart",merge_expl_mc_1.tStart);
    psychoJS.experiment.addData("merge_expl.tEnd",routineT);
    progressBar.update("MERGE_EXPL");
    return Scheduler.Event.NEXT;
  };
}


var MERGE_TEST_INTROComponents;
function MERGE_TEST_INTRORoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'MERGE_TEST_INTRO'-------
    t = 0;
    MERGE_TEST_INTROClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(120.000000);
    // update component parameters for each repeat
    // setup some python lists for storing info about the merge_test_intro_mouse
    gotValidClick = false; // until a click is received
    routineT = 0;
    // keep track of which components have finished
    MERGE_TEST_INTROComponents = [];
    MERGE_TEST_INTROComponents.push(intro_text_6);
    MERGE_TEST_INTROComponents.push(alice_4);
    MERGE_TEST_INTROComponents.push(merge_example_2);
    MERGE_TEST_INTROComponents.push(blue_star_door_4);
    MERGE_TEST_INTROComponents.push(merge_test_intro_btn);
    MERGE_TEST_INTROComponents.push(merge_test_intro_mouse);
    
    for (const thisComponent of MERGE_TEST_INTROComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function MERGE_TEST_INTRORoutineEachFrame() {
  return async function () {
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
    
    // *blue_star_door_4* updates
    if (t >= 0.0 && blue_star_door_4.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      blue_star_door_4.tStart = t;  // (not accounting for frame time here)
      blue_star_door_4.frameNStart = frameN;  // exact frame index
      
      blue_star_door_4.setAutoDraw(true);
    }

    frameRemains = 0.0 + 120.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (blue_star_door_4.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      blue_star_door_4.setAutoDraw(false);
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
    if (((t >= 0.5) && (merge_test_intro_mouse.status === PsychoJS.Status.NOT_STARTED))) {
        merge_test_intro_mouse.tStart = t;
        merge_test_intro_mouse.frameNStart = frameN;
        merge_test_intro_mouse.status = PsychoJS.Status.STARTED;
        merge_test_intro_mouse.mouseClock.reset();
    }
    if (((merge_test_intro_mouse.isPressedIn(merge_test_intro_btn) && (merge_test_intro_mouse.status === PsychoJS.Status.STARTED)) && (merge_test_intro_btn.status === PsychoJS.Status.STARTED))) {
        merge_test_intro_mouse.status = PsychoJS.Status.FINISHED;
        continueRoutine = false;
    }
    routineT = t;
    
    if ((merge_test_intro_mouse.status === PsychoJS.Status.STARTED) && t >= frameRemains) {
        merge_test_intro_mouse.status = PsychoJS.Status.FINISHED;
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


function MERGE_TEST_INTRORoutineEnd() {
  return async function () {
    //------Ending Routine 'MERGE_TEST_INTRO'-------
    for (const thisComponent of MERGE_TEST_INTROComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // store data for psychoJS.experiment (ExperimentHandler)
    _mouseXYs = merge_test_intro_mouse.getPos();
    _mouseButtons = merge_test_intro_mouse.getPressed();
    psychoJS.experiment.addData('merge_test_intro_mouse.x', _mouseXYs[0]);
    psychoJS.experiment.addData('merge_test_intro_mouse.y', _mouseXYs[1]);
    psychoJS.experiment.addData('merge_test_intro_mouse.leftButton', _mouseButtons[0]);
    psychoJS.experiment.addData('merge_test_intro_mouse.midButton', _mouseButtons[1]);
    psychoJS.experiment.addData('merge_test_intro_mouse.rightButton', _mouseButtons[2]);
    psychoJS.experiment.addData("merge_test_intro.tEnd",routineT);
    progressBar.update("MERGE_TEST_INTRO");
    
    return Scheduler.Event.NEXT;
  };
}


var merge_test_input;
var merge_test_labels;
var merge_test_compareN;
var merge_test_compare_records;
var merge_test_res_boxes;
var MERGE_TESTComponents;
function MERGE_TESTRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'MERGE_TEST'-------
    t = 0;
    MERGE_TESTClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(90.000000);
    // update component parameters for each repeat
    merge_test_scale_instr.setColor(new util.Color('white'));
    merge_test_scale_instr.setText('COMPARE weights by typing fruit labels in both LHS and RHS textboxes');
    merge_test_scale_instr.setHeight(0.02);
    merge_test_scale_right.setText('');
    merge_test_scale_right.setText('');
    merge_test_scale_left.setText('');
    merge_test_scale_left.setText('');
    merge_test.setImage(img_path);
    merge_test_scale.setImage(scaleEqPath);
    // setup some python lists for storing info about the merge_test_mouse
    gotValidClick = false; // until a click is received
    merge_test_timer.setText('');
    merge_test_input = input;
    merge_test_labels = encryption;
    merge_test_compareN = 0;
    merge_test_compare_records = [];
    merge_test_res_boxes = [];
    merge_test_scale_left.refresh();
    merge_test_scale_right.refresh();
    
    routineT = 0;
    comparePressedT = 0.0;
    isComparePressed = false;
    
    const merge_test_mouse_btns = merge_test_mouse.psychoJS.eventManager.getMouseInfo().buttons;
    for (const b of [0,1,2]){
        merge_test_mouse_btns.pressed[b] = 0;
        merge_test_mouse_btns.clocks[b].reset();
        merge_test_mouse_btns.times[b] = 0.0;
    }
    
    for (var i = 0; i < merge_test_labels.length; i ++) {
        let newTextBox = new visual.TextBox({
            win: psychoJS.window,
            name: '' + i,
            text: '',
            font: 'Open Sans',
            pos: [(- 0.2) - (merge_test_labels.length * 0.08 / 2).toFixed(4) + i * 0.08, (- 0.3)], letterHeight: 0.04,
            size: [0.07, 0.1],  units: undefined, 
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
        newTextBox.setAutoDraw(true);
        merge_test_res_boxes.push(newTextBox);
    }
    
    // keep track of which components have finished
    MERGE_TESTComponents = [];
    MERGE_TESTComponents.push(merge_test_scale_instr);
    MERGE_TESTComponents.push(merge_test_ans_instr);
    MERGE_TESTComponents.push(merge_test_instr);
    MERGE_TESTComponents.push(merge_test_scale_right);
    MERGE_TESTComponents.push(merge_test_scale_left);
    MERGE_TESTComponents.push(merge_test_sep);
    MERGE_TESTComponents.push(merge_test);
    MERGE_TESTComponents.push(merge_test_scale);
    MERGE_TESTComponents.push(merge_test_btn);
    MERGE_TESTComponents.push(merge_test_compare);
    MERGE_TESTComponents.push(merge_test_mouse);
    MERGE_TESTComponents.push(merge_test_timer);
    
    for (const thisComponent of MERGE_TESTComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function MERGE_TESTRoutineEachFrame() {
  return async function () {
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
    if (t >= 0.5 && merge_test.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      merge_test.tStart = t;  // (not accounting for frame time here)
      merge_test.frameNStart = frameN;  // exact frame index
      
      merge_test.setAutoDraw(true);
    }

    frameRemains = 90.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((merge_test.status === PsychoJS.Status.STARTED || merge_test.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
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
    
    // *merge_test_compare* updates
    if (t >= 0.5 && merge_test_compare.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      merge_test_compare.tStart = t;  // (not accounting for frame time here)
      merge_test_compare.frameNStart = frameN;  // exact frame index
      
      merge_test_compare.setAutoDraw(true);
    }

    frameRemains = 90.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((merge_test_compare.status === PsychoJS.Status.STARTED || merge_test_compare.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      merge_test_compare.setAutoDraw(false);
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
    if (t >= 0.5 && merge_test_mouse.status === PsychoJS.Status.NOT_STARTED) {
          merge_test_mouse.tStart = t;
          merge_test_mouse.frameNStart = frameN;  
          
          merge_test_mouse.status = PsychoJS.Status.STARTED;
          merge_test_mouse.mouseClock.reset();
          prevButtonState = merge_test_mouse.getPressed();
    }
    
    if ((merge_test_mouse.status === PsychoJS.Status.STARTED || merge_test_mouse.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
          merge_test_mouse.status = PsychoJS.Status.FINISHED;
    }
    
    if (t >= 0.5 && merge_test_mouse.status === PsychoJS.Status.STARTED) {
        _mouseButtons = merge_test_mouse.getPressed();
        if (!_mouseButtons.every( (e,i,) => (e == prevButtonState[i]) )) {
            prevButtonState = _mouseButtons;
            if (_mouseButtons.reduce( (e, acc) => (e+acc) ) > 0) { 
                for (const obj of [merge_test_btn,merge_test_compare]) {
                    if (merge_test_mouse.isPressedIn(obj) && obj.name === "merge_test_btn") {
                        merge_test_mouse.status = PsychoJS.Status.FINISHED;
                        continueRoutine = false;
                    } else {
                        if(merge_test_mouse.isPressedIn(obj) && !isComparePressed) {
                            if(obj.name === "merge_test_compare") {
                                const compareStatus = compare(merge_test_scale, merge_test_input, merge_test_labels, merge_test_compare, merge_test_scale_instr, merge_test_scale_left, merge_test_scale_right);
                                merge_test_compareN = (merge_test_compareN + compareStatus[0]);
                                if (compareStatus[0] !== 0) {
                                    merge_test_compare_records.push([compareStatus[1],compareStatus[2]]);
                                }
                                comparePressedT = t;
                                isComparePressed = true;
                            }
                        }
                    }
                }
            }
        }
    }
    
    merge_test_timer.text = timerWarning(mergeTestTimeL, t);
    routineT = t;
    
    if (isComparePressed && (routineT - comparePressedT) >= 0.1) {
        merge_test_compare.image = "materials/merge_sort/imgs/compare.png";
        isComparePressed = false;
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


var merge_test_res;
function MERGE_TESTRoutineEnd() {
  return async function () {
    //------Ending Routine 'MERGE_TEST'-------
    for (const thisComponent of MERGE_TESTComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('merge_test_scale_right.text',merge_test_scale_right.text)
    psychoJS.experiment.addData('merge_test_scale_left.text',merge_test_scale_left.text)
    // store data for psychoJS.experiment (ExperimentHandler)
    _mouseXYs = merge_test_mouse.getPos();
    _mouseButtons = merge_test_mouse.getPressed();
    psychoJS.experiment.addData('merge_test_mouse.x', _mouseXYs[0]);
    psychoJS.experiment.addData('merge_test_mouse.y', _mouseXYs[1]);
    psychoJS.experiment.addData('merge_test_mouse.leftButton', _mouseButtons[0]);
    psychoJS.experiment.addData('merge_test_mouse.midButton', _mouseButtons[1]);
    psychoJS.experiment.addData('merge_test_mouse.rightButton', _mouseButtons[2]);
    merge_test_res = [];
    
    for (var i = 0; i < merge_test_labels.length; i ++) {
        merge_test_res_boxes[i].setAutoDraw(false);
        merge_test_res_boxes[i].status === PsychoJS.Status.FINISHED;
        merge_test_res.push(merge_test_res_boxes[i].text);
    }
    psychoJS.experiment.addData("merge_test_res.text",merge_test_res.toString());
    psychoJS.experiment.addData("merge_test_input",merge_test_input);
    psychoJS.experiment.addData("merge_test_labels",merge_test_labels);
    psychoJS.experiment.addData("merge_test_compareN",merge_test_compareN);
    psychoJS.experiment.addData("merge_test_compare_records",merge_test_compare_records);
    psychoJS.experiment.addData("merge_test.tStart",merge_test.tStart);
    psychoJS.experiment.addData("merge_test.tEnd",routineT);
    
    progressBar.update("MERGE_TEST");
    return Scheduler.Event.NEXT;
  };
}


var BREAK_2Components;
function BREAK_2RoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'BREAK_2'-------
    t = 0;
    BREAK_2Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    // setup some python lists for storing info about the break_2_mouse
    gotValidClick = false; // until a click is received
    breakEnded = false;
    routineT = 0;
    // keep track of which components have finished
    BREAK_2Components = [];
    BREAK_2Components.push(break_2_instr);
    BREAK_2Components.push(break_2_mouse);
    BREAK_2Components.push(break_2_btn);
    
    for (const thisComponent of BREAK_2Components)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function BREAK_2RoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'BREAK_2'-------
    // get current time
    t = BREAK_2Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *break_2_instr* updates
    if (((t >= 0.0)) && break_2_instr.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      break_2_instr.tStart = t;  // (not accounting for frame time here)
      break_2_instr.frameNStart = frameN;  // exact frame index
      
      break_2_instr.setAutoDraw(true);
    }

    if (break_2_instr.status === PsychoJS.Status.STARTED && Boolean(breakEnded)) {
      break_2_instr.setAutoDraw(false);
    }
    
    // *break_2_btn* updates
    if ((t>=0.0) && break_2_btn.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      break_2_btn.tStart = t;  // (not accounting for frame time here)
      break_2_btn.frameNStart = frameN;  // exact frame index
      
      break_2_btn.setAutoDraw(true);
    }

    if (break_2_btn.status === PsychoJS.Status.STARTED && Boolean(breakEnded)) {
      break_2_btn.setAutoDraw(false);
    }
    if (((t >= 0.5) && (break_2_mouse.status === PsychoJS.Status.NOT_STARTED))) {
        break_2_mouse.tStart = t;
        break_2_mouse.frameNStart = frameN;
        break_2_mouse.status = PsychoJS.Status.STARTED;
        break_2_mouse.mouseClock.reset();
    }
    if (((break_2_mouse.isPressedIn(break_2_btn) && (break_2_mouse.status === PsychoJS.Status.STARTED)) && (break_2_btn.status === PsychoJS.Status.STARTED))) {
        break_2_mouse.status = PsychoJS.Status.FINISHED;
        breakEnded = true;
    }
    routineT = t;
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of BREAK_2Components)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function BREAK_2RoutineEnd() {
  return async function () {
    //------Ending Routine 'BREAK_2'-------
    for (const thisComponent of BREAK_2Components) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // store data for psychoJS.experiment (ExperimentHandler)
    _mouseXYs = break_2_mouse.getPos();
    _mouseButtons = break_2_mouse.getPressed();
    psychoJS.experiment.addData('break_2_mouse.x', _mouseXYs[0]);
    psychoJS.experiment.addData('break_2_mouse.y', _mouseXYs[1]);
    psychoJS.experiment.addData('break_2_mouse.leftButton', _mouseButtons[0]);
    psychoJS.experiment.addData('break_2_mouse.midButton', _mouseButtons[1]);
    psychoJS.experiment.addData('break_2_mouse.rightButton', _mouseButtons[2]);
    psychoJS.experiment.addData("break_2.tEnd",routineT);
    // the Routine "BREAK_2" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var SORT_TEST_INTROComponents;
function SORT_TEST_INTRORoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'SORT_TEST_INTRO'-------
    t = 0;
    SORT_TEST_INTROClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(120.000000);
    // update component parameters for each repeat
    // setup some python lists for storing info about the sort_test_intro_mouse
    gotValidClick = false; // until a click is received
    routineT = 0;
    // keep track of which components have finished
    SORT_TEST_INTROComponents = [];
    SORT_TEST_INTROComponents.push(intro_text_7);
    SORT_TEST_INTROComponents.push(bob_4);
    SORT_TEST_INTROComponents.push(sort_example_2);
    SORT_TEST_INTROComponents.push(purple_diamond_door_4);
    SORT_TEST_INTROComponents.push(sort_test_intro_btn);
    SORT_TEST_INTROComponents.push(sort_test_intro_mouse);
    
    for (const thisComponent of SORT_TEST_INTROComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function SORT_TEST_INTRORoutineEachFrame() {
  return async function () {
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
    
    // *purple_diamond_door_4* updates
    if (t >= 0.0 && purple_diamond_door_4.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      purple_diamond_door_4.tStart = t;  // (not accounting for frame time here)
      purple_diamond_door_4.frameNStart = frameN;  // exact frame index
      
      purple_diamond_door_4.setAutoDraw(true);
    }

    frameRemains = 0.0 + 120.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (purple_diamond_door_4.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      purple_diamond_door_4.setAutoDraw(false);
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
    if (((t >= 0.5) && (sort_test_intro_mouse.status === PsychoJS.Status.NOT_STARTED))) {
        sort_test_intro_mouse.tStart = t;
        sort_test_intro_mouse.frameNStart = frameN;
        sort_test_intro_mouse.status = PsychoJS.Status.STARTED;
        sort_test_intro_mouse.mouseClock.reset();
    }
    if (((sort_test_intro_mouse.isPressedIn(sort_test_intro_btn) && (sort_test_intro_mouse.status === PsychoJS.Status.STARTED)) && (sort_test_intro_btn.status === PsychoJS.Status.STARTED))) {
        sort_test_intro_mouse.status = PsychoJS.Status.FINISHED;
        continueRoutine = false;
    }
    routineT = t;
    if ((sort_test_intro_mouse.status === PsychoJS.Status.STARTED) && t >= frameRemains) {
        sort_test_intro_mouse.status = PsychoJS.Status.FINISHED;
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


function SORT_TEST_INTRORoutineEnd() {
  return async function () {
    //------Ending Routine 'SORT_TEST_INTRO'-------
    for (const thisComponent of SORT_TEST_INTROComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // store data for psychoJS.experiment (ExperimentHandler)
    _mouseXYs = sort_test_intro_mouse.getPos();
    _mouseButtons = sort_test_intro_mouse.getPressed();
    psychoJS.experiment.addData('sort_test_intro_mouse.x', _mouseXYs[0]);
    psychoJS.experiment.addData('sort_test_intro_mouse.y', _mouseXYs[1]);
    psychoJS.experiment.addData('sort_test_intro_mouse.leftButton', _mouseButtons[0]);
    psychoJS.experiment.addData('sort_test_intro_mouse.midButton', _mouseButtons[1]);
    psychoJS.experiment.addData('sort_test_intro_mouse.rightButton', _mouseButtons[2]);
    psychoJS.experiment.addData("sort_test_intro.tEnd",routineT);
    progressBar.update("SORT_TEST_INTRO");
    return Scheduler.Event.NEXT;
  };
}


var sort_test_input;
var sort_test_labels;
var sort_test_compareN;
var sort_test_trace;
var sort_test_compare_records;
var sort_test_compare_limit;
var sort_test_path_base;
var sort_test_res_boxes;
var SORT_TESTComponents;
function SORT_TESTRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'SORT_TEST'-------
    t = 0;
    SORT_TESTClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(300.000000);
    // update component parameters for each repeat
    sort_test_scale_instr.setColor(new util.Color('white'));
    sort_test_scale_instr.setText('COMPARE weights by typing fruit labels in both LHS and RHS textboxes');
    sort_test_scale_instr.setHeight(0.02);
    sort_test_scale_right.setText('');
    sort_test_scale_right.setText('');
    sort_test_scale_left.setText('');
    sort_test_scale_left.setText('');
    sort_test_board.setImage('materials/merge_sort/imgs/purple_diamond.png');
    sort_test_scale.setImage(scaleEqPath);
    sort_test_ex_1.setOpacity(0.0);
    sort_test_ex_1.setPos([(- 0.25), 0.3]);
    sort_test_ex_2.setOpacity(0.0);
    sort_test_ex_2.setPos([(- 0.2), 0.3]);
    sort_test_ex_3.setOpacity(0.0);
    sort_test_ex_3.setPos([(- 0.15), 0.3]);
    sort_test_ex_4.setOpacity(0.0);
    sort_test_ex_4.setPos([(- 0.1), 0.3]);
    sort_test_ex_5.setOpacity(0.0);
    sort_test_ex_5.setPos([(- 0.05), 0.3]);
    sort_test_ex_6.setOpacity(0.0);
    sort_test_ex_6.setPos([0.0, 0.3]);
    sort_test_ex_7.setOpacity(0.0);
    sort_test_ex_7.setPos([0.05, 0.3]);
    sort_test_ex_8.setOpacity(0.0);
    sort_test_ex_8.setPos([0.1, 0.3]);
    sort_test_ex_9.setOpacity(0.0);
    sort_test_ex_9.setPos([0.15, 0.3]);
    sort_test_ex_10.setOpacity(0.0);
    sort_test_ex_10.setPos([0.2, 0.3]);
    sort_test_ex_11.setOpacity(0.0);
    sort_test_ex_11.setPos([0.25, 0.3]);
    sort_test_ex_12.setOpacity(0.0);
    sort_test_ex_12.setPos([0.3, 0.3]);
    // setup some python lists for storing info about the sort_test_mouse
    gotValidClick = false; // until a click is received
    sort_test_timer.setText('');
    items = [];
    frameCnt = 0;
    routineT = 0;
    isComparePressed = false;
    comparePressedT = 0.0;
    tracePos = [];
    movingItem = null;
    sort_test_input = input;
    sort_test_labels = encryption;
    sort_test_compareN = 0;
    sort_test_trace = [];
    sort_test_compare_records = [];
    sort_test_compare_limit = ms_compare;
    sort_test_path_base = img_path_base;
    sort_test_res_boxes = [];
    
    sort_test_scale_left.refresh();
    sort_test_scale_right.refresh();
    
    x = sort_test_board.getPos()[0];
    y = sort_test_board.getPos()[1];
    w = sort_test_board.getSize()[0];
    h = sort_test_board.getSize()[1];
    top = (y + (h / 2));
    bot = (y - (h / 2));
    left = (x - (w / 2));
    right = (x + (w / 2));
    
    const sort_test_mouse_btns = sort_test_mouse.psychoJS.eventManager.getMouseInfo().buttons;
    for (const b of [0,1,2]){
        sort_test_mouse_btns.pressed[b] = 0;
        sort_test_mouse_btns.clocks[b].reset();
        sort_test_mouse_btns.times[b] = 0.0;
    }
    
    for (var i = 0; i < sort_test_labels.length; i ++) {
        let newTextBox = new visual.TextBox({
            win: psychoJS.window,
            name: '' + i,
            text: '',
            font: 'Open Sans',
            pos: [(- 0.2) - (sort_test_labels.length * 0.08 / 2).toFixed(4) + i * 0.08, (- 0.3)], letterHeight: 0.04,
            size: [0.07, 0.1],  units: undefined, 
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
        newTextBox.setAutoDraw(true);
        sort_test_res_boxes.push(newTextBox);
    }
    // keep track of which components have finished
    SORT_TESTComponents = [];
    SORT_TESTComponents.push(sort_test_scale_instr);
    SORT_TESTComponents.push(sort_test_ans_instr);
    SORT_TESTComponents.push(sort_test_instr);
    SORT_TESTComponents.push(sort_test_scale_right);
    SORT_TESTComponents.push(sort_test_scale_left);
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
    SORT_TESTComponents.push(sort_test_compare);
    SORT_TESTComponents.push(sort_test_mouse);
    SORT_TESTComponents.push(sort_test_timer);
    
    for (const thisComponent of SORT_TESTComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function SORT_TESTRoutineEachFrame() {
  return async function () {
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
    if (t >= 0.5 && sort_test_ex_1.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_test_ex_1.tStart = t;  // (not accounting for frame time here)
      sort_test_ex_1.frameNStart = frameN;  // exact frame index
      
      sort_test_ex_1.setAutoDraw(true);
    }

    frameRemains = 300.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((sort_test_ex_1.status === PsychoJS.Status.STARTED || sort_test_ex_1.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      sort_test_ex_1.setAutoDraw(false);
    }
    
    // *sort_test_ex_2* updates
    if (t >= 0.5 && sort_test_ex_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_test_ex_2.tStart = t;  // (not accounting for frame time here)
      sort_test_ex_2.frameNStart = frameN;  // exact frame index
      
      sort_test_ex_2.setAutoDraw(true);
    }

    frameRemains = 300.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((sort_test_ex_2.status === PsychoJS.Status.STARTED || sort_test_ex_2.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      sort_test_ex_2.setAutoDraw(false);
    }
    
    // *sort_test_ex_3* updates
    if (t >= 0.5 && sort_test_ex_3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_test_ex_3.tStart = t;  // (not accounting for frame time here)
      sort_test_ex_3.frameNStart = frameN;  // exact frame index
      
      sort_test_ex_3.setAutoDraw(true);
    }

    frameRemains = 300.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((sort_test_ex_3.status === PsychoJS.Status.STARTED || sort_test_ex_3.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      sort_test_ex_3.setAutoDraw(false);
    }
    
    // *sort_test_ex_4* updates
    if (t >= 0.5 && sort_test_ex_4.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_test_ex_4.tStart = t;  // (not accounting for frame time here)
      sort_test_ex_4.frameNStart = frameN;  // exact frame index
      
      sort_test_ex_4.setAutoDraw(true);
    }

    frameRemains = 300.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((sort_test_ex_4.status === PsychoJS.Status.STARTED || sort_test_ex_4.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      sort_test_ex_4.setAutoDraw(false);
    }
    
    // *sort_test_ex_5* updates
    if (t >= 0.5 && sort_test_ex_5.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_test_ex_5.tStart = t;  // (not accounting for frame time here)
      sort_test_ex_5.frameNStart = frameN;  // exact frame index
      
      sort_test_ex_5.setAutoDraw(true);
    }

    frameRemains = 300.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((sort_test_ex_5.status === PsychoJS.Status.STARTED || sort_test_ex_5.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      sort_test_ex_5.setAutoDraw(false);
    }
    
    // *sort_test_ex_6* updates
    if (t >= 0.5 && sort_test_ex_6.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_test_ex_6.tStart = t;  // (not accounting for frame time here)
      sort_test_ex_6.frameNStart = frameN;  // exact frame index
      
      sort_test_ex_6.setAutoDraw(true);
    }

    frameRemains = 300.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((sort_test_ex_6.status === PsychoJS.Status.STARTED || sort_test_ex_6.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      sort_test_ex_6.setAutoDraw(false);
    }
    
    // *sort_test_ex_7* updates
    if (t >= 0.5 && sort_test_ex_7.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_test_ex_7.tStart = t;  // (not accounting for frame time here)
      sort_test_ex_7.frameNStart = frameN;  // exact frame index
      
      sort_test_ex_7.setAutoDraw(true);
    }

    frameRemains = 300.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((sort_test_ex_7.status === PsychoJS.Status.STARTED || sort_test_ex_7.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      sort_test_ex_7.setAutoDraw(false);
    }
    
    // *sort_test_ex_8* updates
    if (t >= 0.5 && sort_test_ex_8.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_test_ex_8.tStart = t;  // (not accounting for frame time here)
      sort_test_ex_8.frameNStart = frameN;  // exact frame index
      
      sort_test_ex_8.setAutoDraw(true);
    }

    frameRemains = 300.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((sort_test_ex_8.status === PsychoJS.Status.STARTED || sort_test_ex_8.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      sort_test_ex_8.setAutoDraw(false);
    }
    
    // *sort_test_ex_9* updates
    if (t >= 0.5 && sort_test_ex_9.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_test_ex_9.tStart = t;  // (not accounting for frame time here)
      sort_test_ex_9.frameNStart = frameN;  // exact frame index
      
      sort_test_ex_9.setAutoDraw(true);
    }

    frameRemains = 300.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((sort_test_ex_9.status === PsychoJS.Status.STARTED || sort_test_ex_9.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      sort_test_ex_9.setAutoDraw(false);
    }
    
    // *sort_test_ex_10* updates
    if (t >= 0.5 && sort_test_ex_10.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_test_ex_10.tStart = t;  // (not accounting for frame time here)
      sort_test_ex_10.frameNStart = frameN;  // exact frame index
      
      sort_test_ex_10.setAutoDraw(true);
    }

    frameRemains = 300.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((sort_test_ex_10.status === PsychoJS.Status.STARTED || sort_test_ex_10.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      sort_test_ex_10.setAutoDraw(false);
    }
    
    // *sort_test_ex_11* updates
    if (t >= 0.5 && sort_test_ex_11.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_test_ex_11.tStart = t;  // (not accounting for frame time here)
      sort_test_ex_11.frameNStart = frameN;  // exact frame index
      
      sort_test_ex_11.setAutoDraw(true);
    }

    frameRemains = 300.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((sort_test_ex_11.status === PsychoJS.Status.STARTED || sort_test_ex_11.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      sort_test_ex_11.setAutoDraw(false);
    }
    
    // *sort_test_ex_12* updates
    if (t >= 0.5 && sort_test_ex_12.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_test_ex_12.tStart = t;  // (not accounting for frame time here)
      sort_test_ex_12.frameNStart = frameN;  // exact frame index
      
      sort_test_ex_12.setAutoDraw(true);
    }

    frameRemains = 300.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((sort_test_ex_12.status === PsychoJS.Status.STARTED || sort_test_ex_12.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      sort_test_ex_12.setAutoDraw(false);
    }
    
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
    
    // *sort_test_compare* updates
    if (t >= 0.5 && sort_test_compare.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_test_compare.tStart = t;  // (not accounting for frame time here)
      sort_test_compare.frameNStart = frameN;  // exact frame index
      
      sort_test_compare.setAutoDraw(true);
    }

    frameRemains = 300.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((sort_test_compare.status === PsychoJS.Status.STARTED || sort_test_compare.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      sort_test_compare.setAutoDraw(false);
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
    frameCnt = (frameCnt + 1);
    if ((items.length === 0)) {
        items = enableImageComponents(SORT_TESTComponents, sort_test_labels, 
            sort_test_path_base, sort_test_ex_1.size[0], sort_test_board.pos[0], sort_test_board.pos[1]);
        for (var i = 0, _pj_a = items.length; (i < _pj_a); i += 1) {
            items[i].opacity = 1.0;
        }
        movingItem = items[0];
    }
    
    if (t >= 0.5 && sort_test_mouse.status === PsychoJS.Status.NOT_STARTED) {
          sort_test_mouse.tStart = t;
          sort_test_mouse.frameNStart = frameN;  
          
          sort_test_mouse.status = PsychoJS.Status.STARTED;
          sort_test_mouse.mouseClock.reset();
          prevButtonState = sort_test_mouse.getPressed();
    }
    
    if ((sort_test_mouse.status === PsychoJS.Status.STARTED || sort_test_mouse.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
          sort_test_mouse.status = PsychoJS.Status.FINISHED;
      }
    
    if (t >= 0.5 && sort_test_mouse.status === PsychoJS.Status.STARTED) {
        _mouseButtons = sort_test_mouse.getPressed();
        if (!_mouseButtons.every( (e,i,) => (e == prevButtonState[i]) )) {
            prevButtonState = _mouseButtons;
            if (_mouseButtons.reduce( (e, acc) => (e+acc) ) > 0) { 
                for (const obj of [sort_test_btn,sort_test_compare]) {
                    if (sort_test_mouse.isPressedIn(obj) && obj.name === "sort_test_btn") {
                        sort_test_mouse.status = PsychoJS.Status.FINISHED;
                        continueRoutine = false;
                    } else {
                        if(sort_test_mouse.isPressedIn(obj) && !isComparePressed) {
                            if(obj.name === "sort_test_compare") {
                                const sort_test_mouse_btns = sort_test_mouse.psychoJS.eventManager.getMouseInfo().buttons;
                                for (const b of [0,1,2]){
                                    sort_test_mouse_btns.pressed[b] = 0;
                                    sort_test_mouse_btns.clocks[b].reset();
                                    sort_test_mouse_btns.times[b] = 0.0;
                                }
                                const compareStatus = compare(sort_test_scale, sort_test_input, sort_test_labels, sort_test_compare, sort_test_scale_instr, sort_test_scale_left, sort_test_scale_right);
                                sort_test_compareN = (sort_test_compareN + compareStatus[0]);
                                if (compareStatus[0] !== 0) {
                                    sort_test_compare_records.push([compareStatus[1],compareStatus[2]]);
                                }
                                comparePressedT = t;
                                isComparePressed = true;
                            }
                        }
                    }
                }
            }
        }
    }
    
    if (t >= 0.5 && sort_test_mouse.status === PsychoJS.Status.STARTED) {
        movingItem = moveItem(sort_test_mouse, movingItem);
        if (((frameCnt % traceSaveAtFrame) === 0)) {
            newTracePos = [];
            for (var i, _pj_c = 0, _pj_a = items, _pj_b = _pj_a.length; (_pj_c < _pj_b); _pj_c += 1) {
                i = _pj_a[_pj_c];
                newTracePos.push([i.name.split("_").slice((- 1))[0], i.pos[0], i.pos[1]]);
            }
            hasMoved = updateTrace(tracePos, newTracePos);
            if ((hasMoved.length > 0)) {
                for (var j, _pj_c = 0, _pj_a = hasMoved, _pj_b = _pj_a.length; (_pj_c < _pj_b); _pj_c += 1) {
                    j = _pj_a[_pj_c];
                    sort_test_trace.push(j);
                }
            }
            tracePos = newTracePos;
        }
    }
    
    sort_test_timer.text = timerWarning(sortTestTimeL, t);
    routineT = t;
    
    if (isComparePressed && (routineT - comparePressedT) >= 0.1) {
        sort_test_compare.image = "materials/merge_sort/imgs/compare.png";
        isComparePressed = false;
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


var sort_test_res;
function SORT_TESTRoutineEnd() {
  return async function () {
    //------Ending Routine 'SORT_TEST'-------
    for (const thisComponent of SORT_TESTComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('sort_test_scale_right.text',sort_test_scale_right.text)
    psychoJS.experiment.addData('sort_test_scale_left.text',sort_test_scale_left.text)
    // store data for psychoJS.experiment (ExperimentHandler)
    _mouseXYs = sort_test_mouse.getPos();
    _mouseButtons = sort_test_mouse.getPressed();
    psychoJS.experiment.addData('sort_test_mouse.x', _mouseXYs[0]);
    psychoJS.experiment.addData('sort_test_mouse.y', _mouseXYs[1]);
    psychoJS.experiment.addData('sort_test_mouse.leftButton', _mouseButtons[0]);
    psychoJS.experiment.addData('sort_test_mouse.midButton', _mouseButtons[1]);
    psychoJS.experiment.addData('sort_test_mouse.rightButton', _mouseButtons[2]);
    sort_test_res = [];
    
    for (var i = 0; i < sort_test_labels.length; i ++) {
        sort_test_res_boxes[i].setAutoDraw(false);
        sort_test_res_boxes[i].status === PsychoJS.Status.FINISHED;
        sort_test_res.push(sort_test_res_boxes[i].text);
    }
    psychoJS.experiment.addData("sort_test_res.text",sort_test_res.toString());
    psychoJS.experiment.addData("sort_test_input",sort_test_input);
    psychoJS.experiment.addData("sort_test_labels",sort_test_labels);
    psychoJS.experiment.addData("sort_test_trace",sort_test_trace);
    psychoJS.experiment.addData("sort_test_compare_records",sort_test_compare_records);
    psychoJS.experiment.addData("sort_test_compareN",sort_test_compareN);
    psychoJS.experiment.addData("sort_test.tStart",sort_test_ex_1.tStart);
    psychoJS.experiment.addData("sort_test.tEnd",routineT);
    progressBar.update("SORT_TEST");
    return Scheduler.Event.NEXT;
  };
}


var REVIEW_QUESTIONSComponents;
function REVIEW_QUESTIONSRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'REVIEW_QUESTIONS'-------
    t = 0;
    REVIEW_QUESTIONSClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(180.000000);
    // update component parameters for each repeat
    review_question.setPos([(- 0.45), 0.1]);
    review_question.setText('');
    review_img_1.setPos([0.4, 0.25]);
    review_img_1.setImage(img_path1);
    review_img_2.setPos([0.4, (- 0.15)]);
    review_img_2.setImage(img_path2);
    review_res.setText('');
    // setup some python lists for storing info about the review_mouse
    gotValidClick = false; // until a click is received
    review_timer.setText('');
    routineT = 0;
    
    review_question.text = r_question;
    review_res.refresh();
    
    if (REVIEW.thisTrialN < 2) {
        review_img_1.pos = [0.4,0.1];
        review_img_2.pos = [0.4,0.1];
    } else if (REVIEW.thisTrialN === 3) {
    }
    // keep track of which components have finished
    REVIEW_QUESTIONSComponents = [];
    REVIEW_QUESTIONSComponents.push(review_question);
    REVIEW_QUESTIONSComponents.push(review_img_1);
    REVIEW_QUESTIONSComponents.push(review_img_2);
    REVIEW_QUESTIONSComponents.push(review_btn);
    REVIEW_QUESTIONSComponents.push(review_res);
    REVIEW_QUESTIONSComponents.push(review_mouse);
    REVIEW_QUESTIONSComponents.push(review_timer);
    
    for (const thisComponent of REVIEW_QUESTIONSComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function REVIEW_QUESTIONSRoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'REVIEW_QUESTIONS'-------
    // get current time
    t = REVIEW_QUESTIONSClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *review_question* updates
    if (t >= 0.0 && review_question.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      review_question.tStart = t;  // (not accounting for frame time here)
      review_question.frameNStart = frameN;  // exact frame index
      
      review_question.setAutoDraw(true);
    }

    frameRemains = 0.0 + 180.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (review_question.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      review_question.setAutoDraw(false);
    }
    
    // *review_img_1* updates
    if (t >= 0.0 && review_img_1.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      review_img_1.tStart = t;  // (not accounting for frame time here)
      review_img_1.frameNStart = frameN;  // exact frame index
      
      review_img_1.setAutoDraw(true);
    }

    frameRemains = 0.0 + 180.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (review_img_1.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      review_img_1.setAutoDraw(false);
    }
    
    // *review_img_2* updates
    if (t >= 0.0 && review_img_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      review_img_2.tStart = t;  // (not accounting for frame time here)
      review_img_2.frameNStart = frameN;  // exact frame index
      
      review_img_2.setAutoDraw(true);
    }

    frameRemains = 0.0 + 180.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (review_img_2.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      review_img_2.setAutoDraw(false);
    }
    
    // *review_btn* updates
    if (t >= 0.5 && review_btn.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      review_btn.tStart = t;  // (not accounting for frame time here)
      review_btn.frameNStart = frameN;  // exact frame index
      
      review_btn.setAutoDraw(true);
    }

    frameRemains = 180.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((review_btn.status === PsychoJS.Status.STARTED || review_btn.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      review_btn.setAutoDraw(false);
    }
    
    // *review_res* updates
    if (t >= 0.0 && review_res.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      review_res.tStart = t;  // (not accounting for frame time here)
      review_res.frameNStart = frameN;  // exact frame index
      
      review_res.setAutoDraw(true);
    }

    frameRemains = 180.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((review_res.status === PsychoJS.Status.STARTED || review_res.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      review_res.setAutoDraw(false);
    }
    
    // *review_timer* updates
    if (t >= 0.0 && review_timer.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      review_timer.tStart = t;  // (not accounting for frame time here)
      review_timer.frameNStart = frameN;  // exact frame index
      
      review_timer.setAutoDraw(true);
    }

    frameRemains = 0.0 + 180.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (review_timer.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      review_timer.setAutoDraw(false);
    }
    if (((t >= 0.5) && (review_mouse.status === PsychoJS.Status.NOT_STARTED))) {
        review_mouse.tStart = t;
        review_mouse.frameNStart = frameN;
        review_mouse.status = PsychoJS.Status.STARTED;
        review_mouse.mouseClock.reset();
    }
    if (((review_mouse.isPressedIn(review_btn) && (review_mouse.status === PsychoJS.Status.STARTED)) && (review_btn.status === PsychoJS.Status.STARTED))) {
        review_mouse.status = PsychoJS.Status.FINISHED;
        continueRoutine = false;
    }
    if ((review_mouse.status === PsychoJS.Status.STARTED) && t >= frameRemains) {
        review_mouse.status = PsychoJS.Status.FINISHED;
    }
    
    review_timer.text = timerWarning(reviewTimeL, t);
    routineT = t;
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of REVIEW_QUESTIONSComponents)
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


function REVIEW_QUESTIONSRoutineEnd() {
  return async function () {
    //------Ending Routine 'REVIEW_QUESTIONS'-------
    for (const thisComponent of REVIEW_QUESTIONSComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('review_res.text',review_res.text)
    // store data for psychoJS.experiment (ExperimentHandler)
    _mouseXYs = review_mouse.getPos();
    _mouseButtons = review_mouse.getPressed();
    psychoJS.experiment.addData('review_mouse.x', _mouseXYs[0]);
    psychoJS.experiment.addData('review_mouse.y', _mouseXYs[1]);
    psychoJS.experiment.addData('review_mouse.leftButton', _mouseButtons[0]);
    psychoJS.experiment.addData('review_mouse.midButton', _mouseButtons[1]);
    psychoJS.experiment.addData('review_mouse.rightButton', _mouseButtons[2]);
    psychoJS.experiment.addData("review.tEnd",routineT);
    progressBar.update("REVIEW");
    return Scheduler.Event.NEXT;
  };
}


var EXP_CHECKComponents;
function EXP_CHECKRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'EXP_CHECK'-------
    t = 0;
    EXP_CHECKClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(300.000000);
    // update component parameters for each repeat
    exp_check_res.setText('');
    // setup some python lists for storing info about the exp_check_mouse
    gotValidClick = false; // until a click is received
    exp_check_slider.reset()
    routineT = 0;
    // keep track of which components have finished
    EXP_CHECKComponents = [];
    EXP_CHECKComponents.push(exp_check_question);
    EXP_CHECKComponents.push(exp_check_res);
    EXP_CHECKComponents.push(exp_check_btn);
    EXP_CHECKComponents.push(exp_check_mouse);
    EXP_CHECKComponents.push(exp_check_slider);
    
    for (const thisComponent of EXP_CHECKComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function EXP_CHECKRoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'EXP_CHECK'-------
    // get current time
    t = EXP_CHECKClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *exp_check_question* updates
    if (t >= 0.0 && exp_check_question.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      exp_check_question.tStart = t;  // (not accounting for frame time here)
      exp_check_question.frameNStart = frameN;  // exact frame index
      
      exp_check_question.setAutoDraw(true);
    }

    frameRemains = 300.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((exp_check_question.status === PsychoJS.Status.STARTED || exp_check_question.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      exp_check_question.setAutoDraw(false);
    }
    
    // *exp_check_res* updates
    if (t >= 0.0 && exp_check_res.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      exp_check_res.tStart = t;  // (not accounting for frame time here)
      exp_check_res.frameNStart = frameN;  // exact frame index
      
      exp_check_res.setAutoDraw(true);
    }

    frameRemains = 300.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((exp_check_res.status === PsychoJS.Status.STARTED || exp_check_res.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      exp_check_res.setAutoDraw(false);
    }
    
    // *exp_check_btn* updates
    if (t >= 0.5 && exp_check_btn.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      exp_check_btn.tStart = t;  // (not accounting for frame time here)
      exp_check_btn.frameNStart = frameN;  // exact frame index
      
      exp_check_btn.setAutoDraw(true);
    }

    frameRemains = 300.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((exp_check_btn.status === PsychoJS.Status.STARTED || exp_check_btn.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      exp_check_btn.setAutoDraw(false);
    }
    
    // *exp_check_slider* updates
    if (t >= 0.5 && exp_check_slider.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      exp_check_slider.tStart = t;  // (not accounting for frame time here)
      exp_check_slider.frameNStart = frameN;  // exact frame index
      
      exp_check_slider.setAutoDraw(true);
    }

    frameRemains = 300  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((exp_check_slider.status === PsychoJS.Status.STARTED || exp_check_slider.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      exp_check_slider.setAutoDraw(false);
    }
    if (((t >= 0.5) && (exp_check_mouse.status === PsychoJS.Status.NOT_STARTED))) {
        exp_check_mouse.tStart = t;
        exp_check_mouse.frameNStart = frameN;
        exp_check_mouse.status = PsychoJS.Status.STARTED;
        exp_check_mouse.mouseClock.reset();
    }
    if (((exp_check_mouse.isPressedIn(exp_check_btn) && (exp_check_mouse.status === PsychoJS.Status.STARTED)) && (exp_check_btn.status === PsychoJS.Status.STARTED))) {
        exp_check_mouse.status = PsychoJS.Status.FINISHED;
        continueRoutine = false;
    }
    routineT = t;
    
    if ((exp_check_mouse.status === PsychoJS.Status.STARTED) && t >= frameRemains) {
        exp_check_mouse.status = PsychoJS.Status.FINISHED;
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
    for (const thisComponent of EXP_CHECKComponents)
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


function EXP_CHECKRoutineEnd() {
  return async function () {
    //------Ending Routine 'EXP_CHECK'-------
    for (const thisComponent of EXP_CHECKComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('exp_check_res.text',exp_check_res.text)
    // store data for psychoJS.experiment (ExperimentHandler)
    _mouseXYs = exp_check_mouse.getPos();
    _mouseButtons = exp_check_mouse.getPressed();
    psychoJS.experiment.addData('exp_check_mouse.x', _mouseXYs[0]);
    psychoJS.experiment.addData('exp_check_mouse.y', _mouseXYs[1]);
    psychoJS.experiment.addData('exp_check_mouse.leftButton', _mouseButtons[0]);
    psychoJS.experiment.addData('exp_check_mouse.midButton', _mouseButtons[1]);
    psychoJS.experiment.addData('exp_check_mouse.rightButton', _mouseButtons[2]);
    psychoJS.experiment.addData('exp_check_slider.response', exp_check_slider.getRating());
    psychoJS.experiment.addData("exp_check.tEnd",routineT);
    if (exp_check_slider.markerPos !== undefined) { 
        psychoJS.experiment.addData("exp_check_slider.response", exp_check_slider.labels[exp_check_slider.getMarkerPos() - 1]);
    } else {
        psychoJS.experiment.addData("exp_check_slider.response", "Not provided");
    }
    progressBar.update("EXP_CHECK");
    return Scheduler.Event.NEXT;
  };
}


var age_selected;
var education_selected;
var gender_selected;
var gender_groups;
var age_groups;
var education_groups;
var BACKGROUNDComponents;
function BACKGROUNDRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'BACKGROUND'-------
    t = 0;
    BACKGROUNDClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(120.000000);
    // update component parameters for each repeat
    background_instr.setText('Please select most the fitting choice for each of the following questions');
    gender.setText('What is your gender?');
    age.setText('What is your age?');
    education.setText('What is the highest degree or level of school you have completed?');
    // setup some python lists for storing info about the background_mouse
    gotValidClick = false; // until a click is received
    age_selected = null;
    education_selected = null;
    gender_selected = null;
    gender_groups = [female, male, other_gender, prefer_not_to_say];
    age_groups = [_18_24, _25_34, _35_44, _45_54, _55_64, _65];
    education_groups = [less_than_high_school, high_school_equivalent, college, bachelor, graduate, doctorate, other];
    routineT = 0;
    
    
    // keep track of which components have finished
    BACKGROUNDComponents = [];
    BACKGROUNDComponents.push(background_instr);
    BACKGROUNDComponents.push(gender);
    BACKGROUNDComponents.push(prefer_not_to_say);
    BACKGROUNDComponents.push(other_gender);
    BACKGROUNDComponents.push(female);
    BACKGROUNDComponents.push(male);
    BACKGROUNDComponents.push(age);
    BACKGROUNDComponents.push(_18_24);
    BACKGROUNDComponents.push(_25_34);
    BACKGROUNDComponents.push(_35_44);
    BACKGROUNDComponents.push(_45_54);
    BACKGROUNDComponents.push(_55_64);
    BACKGROUNDComponents.push(_65);
    BACKGROUNDComponents.push(education);
    BACKGROUNDComponents.push(less_than_high_school);
    BACKGROUNDComponents.push(high_school_equivalent);
    BACKGROUNDComponents.push(college);
    BACKGROUNDComponents.push(bachelor);
    BACKGROUNDComponents.push(graduate);
    BACKGROUNDComponents.push(doctorate);
    BACKGROUNDComponents.push(other);
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
function BACKGROUNDRoutineEachFrame() {
  return async function () {
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
    
    // *prefer_not_to_say* updates
    if (t >= 1.0 && prefer_not_to_say.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      prefer_not_to_say.tStart = t;  // (not accounting for frame time here)
      prefer_not_to_say.frameNStart = frameN;  // exact frame index
      
      prefer_not_to_say.setAutoDraw(true);
    }

    frameRemains = 120.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((prefer_not_to_say.status === PsychoJS.Status.STARTED || prefer_not_to_say.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      prefer_not_to_say.setAutoDraw(false);
    }
    
    // *other_gender* updates
    if (t >= 1.0 && other_gender.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      other_gender.tStart = t;  // (not accounting for frame time here)
      other_gender.frameNStart = frameN;  // exact frame index
      
      other_gender.setAutoDraw(true);
    }

    frameRemains = 120.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((other_gender.status === PsychoJS.Status.STARTED || other_gender.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      other_gender.setAutoDraw(false);
    }
    
    // *female* updates
    if (t >= 1.0 && female.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      female.tStart = t;  // (not accounting for frame time here)
      female.frameNStart = frameN;  // exact frame index
      
      female.setAutoDraw(true);
    }

    frameRemains = 120.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((female.status === PsychoJS.Status.STARTED || female.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      female.setAutoDraw(false);
    }
    
    // *male* updates
    if (t >= 1.0 && male.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      male.tStart = t;  // (not accounting for frame time here)
      male.frameNStart = frameN;  // exact frame index
      
      male.setAutoDraw(true);
    }

    frameRemains = 120.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((male.status === PsychoJS.Status.STARTED || male.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      male.setAutoDraw(false);
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
    
    // *_18_24* updates
    if (t >= 1.0 && _18_24.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      _18_24.tStart = t;  // (not accounting for frame time here)
      _18_24.frameNStart = frameN;  // exact frame index
      
      _18_24.setAutoDraw(true);
    }

    frameRemains = 120.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((_18_24.status === PsychoJS.Status.STARTED || _18_24.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      _18_24.setAutoDraw(false);
    }
    
    // *_25_34* updates
    if (t >= 1.0 && _25_34.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      _25_34.tStart = t;  // (not accounting for frame time here)
      _25_34.frameNStart = frameN;  // exact frame index
      
      _25_34.setAutoDraw(true);
    }

    frameRemains = 120.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((_25_34.status === PsychoJS.Status.STARTED || _25_34.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      _25_34.setAutoDraw(false);
    }
    
    // *_35_44* updates
    if (t >= 1.0 && _35_44.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      _35_44.tStart = t;  // (not accounting for frame time here)
      _35_44.frameNStart = frameN;  // exact frame index
      
      _35_44.setAutoDraw(true);
    }

    frameRemains = 120.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((_35_44.status === PsychoJS.Status.STARTED || _35_44.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      _35_44.setAutoDraw(false);
    }
    
    // *_45_54* updates
    if (t >= 1.0 && _45_54.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      _45_54.tStart = t;  // (not accounting for frame time here)
      _45_54.frameNStart = frameN;  // exact frame index
      
      _45_54.setAutoDraw(true);
    }

    frameRemains = 120.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((_45_54.status === PsychoJS.Status.STARTED || _45_54.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      _45_54.setAutoDraw(false);
    }
    
    // *_55_64* updates
    if (t >= 1.0 && _55_64.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      _55_64.tStart = t;  // (not accounting for frame time here)
      _55_64.frameNStart = frameN;  // exact frame index
      
      _55_64.setAutoDraw(true);
    }

    frameRemains = 120.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((_55_64.status === PsychoJS.Status.STARTED || _55_64.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      _55_64.setAutoDraw(false);
    }
    
    // *_65* updates
    if (t >= 1.0 && _65.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      _65.tStart = t;  // (not accounting for frame time here)
      _65.frameNStart = frameN;  // exact frame index
      
      _65.setAutoDraw(true);
    }

    frameRemains = 120.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((_65.status === PsychoJS.Status.STARTED || _65.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      _65.setAutoDraw(false);
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
    
    // *less_than_high_school* updates
    if (t >= 1.0 && less_than_high_school.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      less_than_high_school.tStart = t;  // (not accounting for frame time here)
      less_than_high_school.frameNStart = frameN;  // exact frame index
      
      less_than_high_school.setAutoDraw(true);
    }

    frameRemains = 120.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((less_than_high_school.status === PsychoJS.Status.STARTED || less_than_high_school.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      less_than_high_school.setAutoDraw(false);
    }
    
    // *high_school_equivalent* updates
    if (t >= 1.0 && high_school_equivalent.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      high_school_equivalent.tStart = t;  // (not accounting for frame time here)
      high_school_equivalent.frameNStart = frameN;  // exact frame index
      
      high_school_equivalent.setAutoDraw(true);
    }

    frameRemains = 120.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((high_school_equivalent.status === PsychoJS.Status.STARTED || high_school_equivalent.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      high_school_equivalent.setAutoDraw(false);
    }
    
    // *college* updates
    if (t >= 1.0 && college.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      college.tStart = t;  // (not accounting for frame time here)
      college.frameNStart = frameN;  // exact frame index
      
      college.setAutoDraw(true);
    }

    frameRemains = 120.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((college.status === PsychoJS.Status.STARTED || college.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      college.setAutoDraw(false);
    }
    
    // *bachelor* updates
    if (t >= 1.0 && bachelor.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      bachelor.tStart = t;  // (not accounting for frame time here)
      bachelor.frameNStart = frameN;  // exact frame index
      
      bachelor.setAutoDraw(true);
    }

    frameRemains = 120.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((bachelor.status === PsychoJS.Status.STARTED || bachelor.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      bachelor.setAutoDraw(false);
    }
    
    // *graduate* updates
    if (t >= 1.0 && graduate.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      graduate.tStart = t;  // (not accounting for frame time here)
      graduate.frameNStart = frameN;  // exact frame index
      
      graduate.setAutoDraw(true);
    }

    frameRemains = 120.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((graduate.status === PsychoJS.Status.STARTED || graduate.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      graduate.setAutoDraw(false);
    }
    
    // *doctorate* updates
    if (t >= 1.0 && doctorate.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      doctorate.tStart = t;  // (not accounting for frame time here)
      doctorate.frameNStart = frameN;  // exact frame index
      
      doctorate.setAutoDraw(true);
    }

    frameRemains = 120.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((doctorate.status === PsychoJS.Status.STARTED || doctorate.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      doctorate.setAutoDraw(false);
    }
    
    // *other* updates
    if (t >= 1.0 && other.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      other.tStart = t;  // (not accounting for frame time here)
      other.frameNStart = frameN;  // exact frame index
      
      other.setAutoDraw(true);
    }

    frameRemains = 120.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((other.status === PsychoJS.Status.STARTED || other.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      other.setAutoDraw(false);
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
    gender_selected = checkBGSelection(background_mouse, gender_groups, gender_selected);
    age_selected = checkBGSelection(background_mouse, age_groups, age_selected);
    education_selected = checkBGSelection(background_mouse, education_groups, education_selected);
    if ((age_selected !== null)) {
        demographic_age = age_selected.name;
    }
    if ((education_selected !== null)) {
        demographic_education = education_selected.name;
    }
    if ((gender_selected !== null)) {
        demographic_gender = gender_selected.name;
    }
    if (((((age_selected !== null) && (education_selected !== null)) && (gender_selected !== null)) && (background_btn.image !== "materials/imgs/submit.png"))) {
        background_btn.image = "materials/imgs/submit.png";
    }
    if (((((background_mouse.isPressedIn(background_btn) && (age_selected !== null)) && (education_selected !== null)) && (gender_selected !== null)) && (background_btn.status === PsychoJS.Status.STARTED))) {
        background_mouse.status = PsychoJS.Status.FINISHED;
        continueRoutine = false;
    }
    
    if ((background_mouse.status === PsychoJS.Status.STARTED) && t >= frameRemains) {
        background_mouse.status = PsychoJS.Status.FINISHED;
    }
    
    routineT = t;
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


function BACKGROUNDRoutineEnd() {
  return async function () {
    //------Ending Routine 'BACKGROUND'-------
    for (const thisComponent of BACKGROUNDComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // store data for psychoJS.experiment (ExperimentHandler)
    _mouseXYs = background_mouse.getPos();
    _mouseButtons = background_mouse.getPressed();
    psychoJS.experiment.addData('background_mouse.x', _mouseXYs[0]);
    psychoJS.experiment.addData('background_mouse.y', _mouseXYs[1]);
    psychoJS.experiment.addData('background_mouse.leftButton', _mouseButtons[0]);
    psychoJS.experiment.addData('background_mouse.midButton', _mouseButtons[1]);
    psychoJS.experiment.addData('background_mouse.rightButton', _mouseButtons[2]);
    psychoJS.experiment.addData('demographic_age',demographic_age);
    psychoJS.experiment.addData('demographic_education',demographic_education);
    psychoJS.experiment.addData('demographic_gender',demographic_gender);
    psychoJS.experiment.addData("background.tEnd",routineT);
    progressBar.update("BACKGROUND");
    return Scheduler.Event.NEXT;
  };
}


var DEBRIEFComponents;
function DEBRIEFRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'DEBRIEF'-------
    t = 0;
    DEBRIEFClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    // keep track of which components have finished
    DEBRIEFComponents = [];
    
    for (const thisComponent of DEBRIEFComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function DEBRIEFRoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'DEBRIEF'-------
    // get current time
    t = DEBRIEFClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
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
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function DEBRIEFRoutineEnd() {
  return async function () {
    //------Ending Routine 'DEBRIEF'-------
    for (const thisComponent of DEBRIEFComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    window.startHTML('../backend/submission.html');
    sessionStorage.setItem("record", JSON.stringify(psychoJS.experiment._trialsData));
    const participantCode = sessionStorage.getItem("participantCode").replaceAll("\"","");
    return quitPsychoJS("Please note down your participant ID: " + participantCode 
        + ". If you don’t get confirmation that the data submission was successful, " 
        + "please send the downloaded file to either lun.ai15@imperial.ac.uk or "
        + "johannes-miran.langer@stud.uni-bamberg.de. "
        + "If you did get success confirmation, you can safely delete the file.", true);
    // the Routine "DEBRIEF" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


function endLoopIteration(scheduler, snapshot) {
  // ------Prepare for next entry------
  return async function () {
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
  return async function () {
    psychoJS.importAttributes(currentLoop.getCurrentTrial());
    return Scheduler.Event.NEXT;
    };
}


async function quitPsychoJS(message, isCompleted) {
  // Check for and save orphaned data
  if (psychoJS.experiment.isEntryEmpty()) {
    psychoJS.experiment.nextEntry();
  }
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  psychoJS.window.close();
  psychoJS.quit({message: message, isCompleted: isCompleted});
  
  return Scheduler.Event.QUIT;
}
