/********************************* 
 * Seq_Teaching_Exp_With_Ci Test *
 *********************************/

import { core, data, sound, util, visual } from './lib/psychojs-2021.2.3.js';
const { PsychoJS } = core;
const { TrialHandler } = data;
const { Scheduler } = util;
//some handy aliases as in the psychopy scripts;
const { abs, sin, cos, PI: pi, sqrt } = Math;
const { round } = util;


// store info about the experiment session:
let expName = 'seq_teaching_exp_with_CI';  // from the Builder filename that created this script
let expInfo = {'participant': '000', 'session': '001'};

// Start code blocks for 'Before Experiment'
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
const structureTrainTimeL = 300;
const sortExplTimeL = 60;
var routineT = 0;
var comparePressedT = 0.0;
var isComparePressed = false;
const scaleEqPath = "materials/merge_sort/imgs/scale_balanced.png";
const scaleLtPath = "materials/merge_sort/imgs/scale_right.png";
const scaleGtPath = "materials/merge_sort/imgs/scale_left.png";

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
            feedback_2.text = ("The correct answer is >>>>\n" + correct);
            feedback_2.color = green;
        } else {
            feedback_1.text = "Your answer is WRONG!";
            feedback_1.color = red;
            feedback_2.text = ("The correct answer is >>>>\n" + correct);
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
    console.log(temp);
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
                    component.image = "materials/merge_sort/imgs/white_BG.png";
                } else {
                    component.image = (((imagePathBase + "_") + labels[i].charAt(1)) + ".png");
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
                updated.push(j);
            }
        }
    }
    return updated;
}
_pj = {};
_pj_snippets(_pj);

function checkSublistFormatValid(leftInput, rightInput, labels, instr) {
    timeSleep(sleepTime);
    if (((leftInput.text.length === 0) || (rightInput.text.length === 0))) {
        instr.text = "Please provide labels in correct format for both LHS and RHS";
        instr.color = red;
        return false;
    } else {
        if (((leftInput.text.length > 1) || (rightInput.text.length > 1))) {
            instr.text = "Please enter labels as single capitals";
            instr.color = red;
            return false;
        } else {
            if (((! _pj.in_es6(leftInput.text, labels)) || (! _pj.in_es6(rightInput.text, labels)))) {
                instr.text = "Please enter the leftmost label of chosen collections";
                instr.color = red;
                return false;
            }
        }
    }
    instr.text = "Apply the BLUE STAR by typing leftmost fruit labels of two grey boxes in both LHS and RHS textboxes";
    instr.color = white;
    return true;
}

class Task {
    constructor(input,labels,imgPath,win) {
        /*
        Loads necessary information to manage the task.

        PARAMETERS
        ----------
        task : dictionary containing the scrambled order, letter encryption and icon path
        win : PsychoPy Window
        */
        var a, list, masks;
        this.win = psychoJS.window;
        list = input;
        this.nitems = list.length;
        this.background = [];
        this.fruits = [];
        this.labels = [];
        this.list = [];
        this.mask = [];
        this.background_rects = [];
        for (var i, _pj_c = 0, _pj_a = util.range(list.length), _pj_b = _pj_a.length; (_pj_c < _pj_b); _pj_c += 1) {
            i = _pj_a[_pj_c];
            this.list.push([list[i]]);
            const newRect = new visual.Rect({"win": this.win, "fillColor": "grey", "lineColor": "grey", "lineWidth": 0})
            newRect.setAutoDraw(true);
            this.background_rects.push(newRect);
            const newImg = new visual.ImageStim({"win": this.win, "image": imgPath})
            newImg.setAutoDraw(true);
            this.fruits.push(newImg);
            const newTxt = new visual.TextStim({"win": this.win, "color": "black", "text": ""})
            newTxt.setAutoDraw(true);
            this.labels.push(newTxt);
            this.mask.push([labels[i].replaceAll("'","")]);
        }
        this.names = [...labels];
    }
    update() {
        /*
        Sets up the visuals for the tasks and re-does it from scratch whenever called.
        */
        var SQUARE_DIST, SQUARE_HEIGHT, SQUARE_SIZE, background, fruit, i_i, i_j, label, position;
        SQUARE_SIZE = 0.08;
        SQUARE_HEIGHT = ((SQUARE_SIZE * 16) / 9);
        SQUARE_DIST = 0.03;
        var currentPos = ((- ((this.nitems * SQUARE_SIZE) / 2) + 0.3) + 0.045);
        var cnt = 0;
        for (var i, _pj_c = 0, _pj_a = this.list, _pj_b = _pj_a.length; (_pj_c < _pj_b); _pj_c += 1) {
            i = _pj_a[_pj_c];
            const len = (2 * i.length - 1) * SQUARE_SIZE + 0.02;
            const cent = currentPos - 0.04 + (i.length * SQUARE_SIZE / 2);
            for (var j, _pj_f = 0, _pj_d = i, _pj_e = _pj_d.length; (_pj_f < _pj_e); _pj_f += 1) {
                j = _pj_d[_pj_f];
                this.background_rects[cnt + _pj_f].pos = [currentPos, 0.225];
                this.background_rects[cnt + _pj_f].size = [0, 0];
                this.fruits[cnt + _pj_f].pos = [currentPos, 0.225];
                this.fruits[cnt + _pj_f].size = [SQUARE_SIZE, SQUARE_SIZE];
                this.labels[cnt + _pj_f].pos = [currentPos, 0.075];
                this.labels[cnt + _pj_f].height = SQUARE_DIST;
                this.labels[cnt + _pj_f].text = this.mask[_pj_c][_pj_f];
                currentPos += SQUARE_SIZE;
            }
            this.background_rects[cnt].pos = [cent, 0.225];
            this.background_rects[cnt].size = [len, SQUARE_HEIGHT];
            cnt += i.length;
        }
    }
    clean() {
        for (var i, _pj_c = 0, _pj_a = this.background_rects, _pj_b = _pj_a.length; (_pj_c < _pj_b); _pj_c += 1) {
            i = _pj_a[_pj_c];
            i.setAutoDraw(false);
        }        
        for (var i, _pj_c = 0, _pj_a = this.fruits, _pj_b = _pj_a.length; (_pj_c < _pj_b); _pj_c += 1) {
            i = _pj_a[_pj_c];
            i.setAutoDraw(false);
        }
        for (var i, _pj_c = 0, _pj_a = this.labels, _pj_b = _pj_a.length; (_pj_c < _pj_b); _pj_c += 1) {
            i = _pj_a[_pj_c];
            i.setAutoDraw(false);
        }
    }
    draw() {
        /*
        Draws all the visuals of the task.
        */
        for (var i, _pj_c = 0, _pj_a = this.background_rects, _pj_b = _pj_a.length; (_pj_c < _pj_b); _pj_c += 1) {
            i = _pj_a[_pj_c];
            i.draw();
        }        
        for (var i, _pj_c = 0, _pj_a = this.fruits, _pj_b = _pj_a.length; (_pj_c < _pj_b); _pj_c += 1) {
            i = _pj_a[_pj_c];
            i.opacity = 0;
            i.draw();
            i.opacity = 1.0;
            i.draw();
        }
        for (var i, _pj_c = 0, _pj_a = this.labels, _pj_b = _pj_a.length; (_pj_c < _pj_b); _pj_c += 1) {
            i = _pj_a[_pj_c];
            i.draw();
        }
    }
    merge(x, y) {
        /*
        Merges the two sublists with the given labels. Returns True if it actually did anything.

        PARAMETERS
        ---------
        x : string
        y : string

        RETURNS
        -------
        bool
        */
        var a, a_mask, b, b_mask, i_x, i_y, merged_list, merged_mask;
        if ((((x === y) || (! _pj.in_es6(x, this.names))) || (! _pj.in_es6(y, this.names)))) {
            return false;
        }
        i_x = util.index(this.names, x);
        i_y = util.index(this.names, y);
        a = this.list[i_x];
        b = this.list[i_y];
        a_mask = this.mask[i_x];
        b_mask = this.mask[i_y];
        const a_mask_c = [...a_mask];
        const b_mask_c = [...b_mask];
        merged_list = [];
        merged_mask = [];
        while (((a.length > 0) || (b.length > 0))) {
            if (((a.length > 0) && (b.length > 0))) {
                if ((a[0] > b[0])) {
                    merged_list.push(b[0]);
                    merged_mask.push(b_mask[0]);
                    b.splice(0,1);
                    b_mask.splice(0,1);
                } else {
                    merged_list.push(a[0]);
                    merged_mask.push(a_mask[0]);
                    a.splice(0,1);
                    a_mask.splice(0,1);
                }
            } else {
                if ((a.length > 0)) {
                    for (var i, _pj_c = 0, _pj_a = a, _pj_b = _pj_a.length; (_pj_c < _pj_b); _pj_c += 1) {
                        i = _pj_a[_pj_c];
                        merged_list.push(i);
                    }
                    for (var j, _pj_c = 0, _pj_a = a_mask, _pj_b = _pj_a.length; (_pj_c < _pj_b); _pj_c += 1) {
                        j = _pj_a[_pj_c];
                        merged_mask.push(j);
                    }
                    a = [];
                    a_mask = [];
                } else {
                    if ((b.length > 0)) {
                        for (var i, _pj_c = 0, _pj_a = b, _pj_b = _pj_a.length; (_pj_c < _pj_b); _pj_c += 1) {
                            i = _pj_a[_pj_c];
                            merged_list.push(i);
                        }
                        for (var j, _pj_c = 0, _pj_a = b_mask, _pj_b = _pj_a.length; (_pj_c < _pj_b); _pj_c += 1) {
                            j = _pj_a[_pj_c];
                            merged_mask.push(j);
                        }
                        b = [];
                        b_mask = [];
                    }
                }
            }
        }
        if ((i_x > i_y)) {
            this.list.splice(i_x,1);
            this.list.splice(i_y,1);
            this.mask.splice(i_x,1);
            this.mask.splice(i_y,1);
            this.list.splice(i_y, 0, merged_list);
            this.mask.splice(i_y, 0, merged_mask);
            this.names.splice(i_x,1);
            this.names.splice(i_y,1);
            this.names.splice(i_y, 0, merged_mask[0]);
        } else {
            if ((i_x < i_y)) {
                this.list.splice(i_y,1);
                this.list.splice(i_x,1);
                this.mask.splice(i_y,1);
                this.mask.splice(i_x,1);
                this.list.splice(i_x, 0, merged_list);
                this.mask.splice(i_x, 0, merged_mask);
                this.names.splice(i_y,1);
                this.names.splice(i_x,1);
                this.names.splice(i_x, 0, merged_mask[0]);
            }
        }
        const l = [];
        for (var i, _pj_c = 0, _pj_a = this.mask, _pj_b = _pj_a.length; (_pj_c < _pj_b); _pj_c += 1) {
            i = _pj_a[_pj_c];
            l.push([...i]);
        }
        return [true,a_mask_c,b_mask_c,l];
    }
    merge_cost(x, y) {
        /*
        Calculates the cost of the merge action without actually performing merge
        on the active task.

        PARAMTETERS:
        ------------
        x : String
        y : String

        RETRUNS:
        --------
        cost : int
        */
        var a, b, cost, i_x, i_y;
        if ((((x === y) || (! _pj.in_es6(x, this.names))) || (! _pj.in_es6(y, this.names)))) {
            return 0;
        }
        cost = 0;
        i_x = util.index(this.names, x);
        i_y = util.index(this.names, y);
        a = [];
        b = [];
        for (var i, _pj_c = 0, _pj_a = this.list[i_x], _pj_b = _pj_a.length; (_pj_c < _pj_b); _pj_c += 1) {
            i = _pj_a[_pj_c];
            a.push(i);
        }
        for (var i, _pj_c = 0, _pj_a = this.list[i_y], _pj_b = _pj_a.length; (_pj_c < _pj_b); _pj_c += 1) {
            i = _pj_a[_pj_c];
            b.push(i);
        }
        while (((a.length > 0) || (b.length > 0))) {
            if (((a.length > 0) && (b.length > 0))) {
                if ((a[0] > b[0])) {
                    b.splice(0,1);
                    cost += 1;
                } else {
                    a.splice(0,1);
                    cost += 1;
                }
            } else {
                a = [];
                b = [];
            }
        }
        return cost;
    }
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
flowScheduler.add(BACKGROUNDRoutineBegin());
flowScheduler.add(BACKGROUNDRoutineEachFrame());
flowScheduler.add(BACKGROUNDRoutineEnd());
flowScheduler.add(INTRORoutineBegin());
flowScheduler.add(INTRORoutineEachFrame());
flowScheduler.add(INTRORoutineEnd());
flowScheduler.add(HINTRoutineBegin());
flowScheduler.add(HINTRoutineEachFrame());
flowScheduler.add(HINTRoutineEnd());
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
flowScheduler.add(STRUCTURE_INTRORoutineBegin());
flowScheduler.add(STRUCTURE_INTRORoutineEachFrame());
flowScheduler.add(STRUCTURE_INTRORoutineEnd());
const TRAIN_2LoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(TRAIN_2LoopBegin(TRAIN_2LoopScheduler));
flowScheduler.add(TRAIN_2LoopScheduler);
flowScheduler.add(TRAIN_2LoopEnd);
flowScheduler.add(SORT_INTRORoutineBegin());
flowScheduler.add(SORT_INTRORoutineEachFrame());
flowScheduler.add(SORT_INTRORoutineEnd());
const TRAIN_3LoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(TRAIN_3LoopBegin(TRAIN_3LoopScheduler));
flowScheduler.add(TRAIN_3LoopScheduler);
flowScheduler.add(TRAIN_3LoopEnd);
flowScheduler.add(SORT_TEST_INTRORoutineBegin());
flowScheduler.add(SORT_TEST_INTRORoutineEachFrame());
flowScheduler.add(SORT_TEST_INTRORoutineEnd());
const TEST_2LoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(TEST_2LoopBegin(TEST_2LoopScheduler));
flowScheduler.add(TEST_2LoopScheduler);
flowScheduler.add(TEST_2LoopEnd);
flowScheduler.add(EXP_CHECKRoutineBegin());
flowScheduler.add(EXP_CHECKRoutineEachFrame());
flowScheduler.add(EXP_CHECKRoutineEnd());
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
    {'name': 'materials/imgs/college_selected.png', 'path': 'materials/imgs/college_selected.png'},
    {'name': 'materials/merge_sort/imgs/fruits/melon_H.png', 'path': 'materials/merge_sort/imgs/fruits/melon_H.png'},
    {'name': 'materials/imgs/waiting.png', 'path': 'materials/imgs/waiting.png'},
    {'name': 'materials/merge_sort/imgs/merge_train/merge_train_example.png', 'path': 'materials/merge_sort/imgs/merge_train/merge_train_example.png'},
    {'name': 'materials/merge_sort/imgs/alice.png', 'path': 'materials/merge_sort/imgs/alice.png'},
    {'name': 'materials/merge_sort/imgs/fruits/melon_F.png', 'path': 'materials/merge_sort/imgs/fruits/melon_F.png'},
    {'name': 'materials/imgs/less_than_high_school_selected.png', 'path': 'materials/imgs/less_than_high_school_selected.png'},
    {'name': 'materials/merge_sort/imgs/merge_train/merge_train_ex_5_2_wrong_expl.png', 'path': 'materials/merge_sort/imgs/merge_train/merge_train_ex_5_2_wrong_expl.png'},
    {'name': 'materials/merge_sort/imgs/fruits/melon_K.png', 'path': 'materials/merge_sort/imgs/fruits/melon_K.png'},
    {'name': 'materials/structure_train_cond.csv', 'path': 'materials/structure_train_cond.csv'},
    {'name': 'materials/merge_sort/imgs/door.png', 'path': 'materials/merge_sort/imgs/door.png'},
    {'name': 'materials/merge_sort/imgs/merge_train/merge_train_ex_2_2_wrong.png', 'path': 'materials/merge_sort/imgs/merge_train/merge_train_ex_2_2_wrong.png'},
    {'name': 'materials/merge_sort/imgs/merge_train/merge_train_ex_5_3_correct.png', 'path': 'materials/merge_sort/imgs/merge_train/merge_train_ex_5_3_correct.png'},
    {'name': 'materials/sort_train_cond.csv', 'path': 'materials/sort_train_cond.csv'},
    {'name': 'materials/imgs/less_than_high_school.png', 'path': 'materials/imgs/less_than_high_school.png'},
    {'name': 'materials/imgs/arrow.png', 'path': 'materials/imgs/arrow.png'},
    {'name': 'materials/imgs/_18_24.png', 'path': 'materials/imgs/_18_24.png'},
    {'name': 'materials/merge_sort/imgs/fruits/apple_H.png', 'path': 'materials/merge_sort/imgs/fruits/apple_H.png'},
    {'name': 'materials/merge_sort/imgs/fruits/melon_G.png', 'path': 'materials/merge_sort/imgs/fruits/melon_G.png'},
    {'name': 'materials/merge_sort/imgs/merge_train/merge_train_ex_2_2_wrong_expl.png', 'path': 'materials/merge_sort/imgs/merge_train/merge_train_ex_2_2_wrong_expl.png'},
    {'name': 'materials/merge_sort/imgs/merge_train/merge_train_ex_5_1_correct_expl.png', 'path': 'materials/merge_sort/imgs/merge_train/merge_train_ex_5_1_correct_expl.png'},
    {'name': 'materials/imgs/other_selected.png', 'path': 'materials/imgs/other_selected.png'},
    {'name': 'materials/merge_sort/imgs/merge_train/merge_train_ex_2_2_wrong_selected.png', 'path': 'materials/merge_sort/imgs/merge_train/merge_train_ex_2_2_wrong_selected.png'},
    {'name': 'materials/merge_sort/imgs/fruits/apple_F.png', 'path': 'materials/merge_sort/imgs/fruits/apple_F.png'},
    {'name': 'materials/merge_sort/imgs/fruits/banana_L.png', 'path': 'materials/merge_sort/imgs/fruits/banana_L.png'},
    {'name': 'materials/merge_sort/imgs/fruits/banana_J.png', 'path': 'materials/merge_sort/imgs/fruits/banana_J.png'},
    {'name': 'materials/merge_sort/imgs/fruits/banana_B.png', 'path': 'materials/merge_sort/imgs/fruits/banana_B.png'},
    {'name': 'materials/merge_sort/imgs/fruits/melon_I.png', 'path': 'materials/merge_sort/imgs/fruits/melon_I.png'},
    {'name': 'materials/merge_sort/imgs/fruits/apple_G.png', 'path': 'materials/merge_sort/imgs/fruits/apple_G.png'},
    {'name': 'materials/merge_sort/imgs/fruits/melon_C.png', 'path': 'materials/merge_sort/imgs/fruits/melon_C.png'},
    {'name': 'materials/merge_sort/imgs/merge_train/merge_train_ex_5_1_correct_selected.png', 'path': 'materials/merge_sort/imgs/merge_train/merge_train_ex_5_1_correct_selected.png'},
    {'name': 'materials/merge_sort/imgs/merge_train/merge_train_ex_2_1_correct_selected.png', 'path': 'materials/merge_sort/imgs/merge_train/merge_train_ex_2_1_correct_selected.png'},
    {'name': 'materials/merge_sort/imgs/merge_train/merge_train_ex_5_1_wrong_selected.png', 'path': 'materials/merge_sort/imgs/merge_train/merge_train_ex_5_1_wrong_selected.png'},
    {'name': 'materials/merge_sort/imgs/fruits/melon_J.png', 'path': 'materials/merge_sort/imgs/fruits/melon_J.png'},
    {'name': 'materials/merge_sort/imgs/fruits/banana.png', 'path': 'materials/merge_sort/imgs/fruits/banana.png'},
    {'name': 'materials/merge_sort/imgs/structure_train/structure_train_example.png', 'path': 'materials/merge_sort/imgs/structure_train/structure_train_example.png'},
    {'name': 'materials/imgs/graduate.png', 'path': 'materials/imgs/graduate.png'},
    {'name': 'materials/merge_sort/imgs/fruits/melon_D.png', 'path': 'materials/merge_sort/imgs/fruits/melon_D.png'},
    {'name': 'materials/merge_sort/imgs/merge_train/merge_train_ex_5_3_correct_selected.png', 'path': 'materials/merge_sort/imgs/merge_train/merge_train_ex_5_3_correct_selected.png'},
    {'name': 'materials/merge_sort/imgs/merge_train/merge_train_ex_2_1_correct_expl.png', 'path': 'materials/merge_sort/imgs/merge_train/merge_train_ex_2_1_correct_expl.png'},
    {'name': 'materials/imgs/female_selected.png', 'path': 'materials/imgs/female_selected.png'},
    {'name': 'materials/merge_sort/imgs/scale_right.png', 'path': 'materials/merge_sort/imgs/scale_right.png'},
    {'name': 'materials/merge_sort/imgs/fruits/banana_G.png', 'path': 'materials/merge_sort/imgs/fruits/banana_G.png'},
    {'name': 'materials/merge_sort/imgs/merge_train/merge_train_ex_5.png', 'path': 'materials/merge_sort/imgs/merge_train/merge_train_ex_5.png'},
    {'name': 'materials/merge_sort/imgs/merge_train/merge_train_ex_5_3_wrong.png', 'path': 'materials/merge_sort/imgs/merge_train/merge_train_ex_5_3_wrong.png'},
    {'name': 'materials/merge_sort/imgs/fruits/banana_F.png', 'path': 'materials/merge_sort/imgs/fruits/banana_F.png'},
    {'name': 'materials/merge_sort/imgs/merge_train/merge_train_ex_1_1_wrong_expl.png', 'path': 'materials/merge_sort/imgs/merge_train/merge_train_ex_1_1_wrong_expl.png'},
    {'name': 'materials/merge_sort/imgs/merge_train/merge_train_ex_1_1_correct_selected.png', 'path': 'materials/merge_sort/imgs/merge_train/merge_train_ex_1_1_correct_selected.png'},
    {'name': 'materials/merge_sort/imgs/fruits/banana_D.png', 'path': 'materials/merge_sort/imgs/fruits/banana_D.png'},
    {'name': 'materials/merge_sort/imgs/merge_train/merge_train_ex_2_1_wrong_selected.png', 'path': 'materials/merge_sort/imgs/merge_train/merge_train_ex_2_1_wrong_selected.png'},
    {'name': 'materials/imgs/male_selected.png', 'path': 'materials/imgs/male_selected.png'},
    {'name': 'materials/imgs/male.png', 'path': 'materials/imgs/male.png'},
    {'name': 'materials/imgs/_65.png', 'path': 'materials/imgs/_65.png'},
    {'name': 'materials/imgs/college.png', 'path': 'materials/imgs/college.png'},
    {'name': 'materials/merge_sort/imgs/fruits/apple.png', 'path': 'materials/merge_sort/imgs/fruits/apple.png'},
    {'name': 'materials/merge_sort/imgs/merge_train/merge_train_ex_1_1_correct.png', 'path': 'materials/merge_sort/imgs/merge_train/merge_train_ex_1_1_correct.png'},
    {'name': 'materials/merge_sort/imgs/merge_train/merge_train_ex_2_2_correct_expl.png', 'path': 'materials/merge_sort/imgs/merge_train/merge_train_ex_2_2_correct_expl.png'},
    {'name': 'materials/merge_sort/imgs/white_BG.png', 'path': 'materials/merge_sort/imgs/white_BG.png'},
    {'name': 'materials/merge_sort/imgs/merge_train/merge_train_ex_2_2_correct_selected.png', 'path': 'materials/merge_sort/imgs/merge_train/merge_train_ex_2_2_correct_selected.png'},
    {'name': 'materials/merge_sort/imgs/merge_train/merge_train_ex_2_1_wrong_expl.png', 'path': 'materials/merge_sort/imgs/merge_train/merge_train_ex_2_1_wrong_expl.png'},
    {'name': 'materials/merge_sort/imgs/blue_star.png', 'path': 'materials/merge_sort/imgs/blue_star.png'},
    {'name': 'materials/imgs/submit.png', 'path': 'materials/imgs/submit.png'},
    {'name': 'materials/merge_sort/imgs/compare.png', 'path': 'materials/merge_sort/imgs/compare.png'},
    {'name': 'materials/merge_test_cond.csv', 'path': 'materials/merge_test_cond.csv'},
    {'name': 'materials/imgs/female.png', 'path': 'materials/imgs/female.png'},
    {'name': 'materials/merge_sort/imgs/fruits/apple_A.png', 'path': 'materials/merge_sort/imgs/fruits/apple_A.png'},
    {'name': 'materials/merge_sort/imgs/merge_train/merge_train_ex_5_3_correct_expl.png', 'path': 'materials/merge_sort/imgs/merge_train/merge_train_ex_5_3_correct_expl.png'},
    {'name': 'materials/merge_sort/imgs/merge_train/merge_train_ex_2_1_correct.png', 'path': 'materials/merge_sort/imgs/merge_train/merge_train_ex_2_1_correct.png'},
    {'name': 'materials/merge_sort/imgs/merge_test/merge_test_ex_4.png', 'path': 'materials/merge_sort/imgs/merge_test/merge_test_ex_4.png'},
    {'name': 'materials/merge_sort/imgs/fruits/apple_E.png', 'path': 'materials/merge_sort/imgs/fruits/apple_E.png'},
    {'name': 'materials/imgs/doctorate.png', 'path': 'materials/imgs/doctorate.png'},
    {'name': 'materials/merge_sort/imgs/merge_train/merge_train_ex_5_1_wrong_expl.png', 'path': 'materials/merge_sort/imgs/merge_train/merge_train_ex_5_1_wrong_expl.png'},
    {'name': 'materials/imgs/bachelor.png', 'path': 'materials/imgs/bachelor.png'},
    {'name': 'materials/imgs/_35_44_selected.png', 'path': 'materials/imgs/_35_44_selected.png'},
    {'name': 'materials/merge_sort/imgs/fruits/banana_E.png', 'path': 'materials/merge_sort/imgs/fruits/banana_E.png'},
    {'name': 'materials/imgs/other_gender.png', 'path': 'materials/imgs/other_gender.png'},
    {'name': 'materials/merge_sort/imgs/merge_test/merge_test_ex_3.png', 'path': 'materials/merge_sort/imgs/merge_test/merge_test_ex_3.png'},
    {'name': 'materials/merge_sort/imgs/fruits/apple_C.png', 'path': 'materials/merge_sort/imgs/fruits/apple_C.png'},
    {'name': 'materials/imgs/_55_64.png', 'path': 'materials/imgs/_55_64.png'},
    {'name': 'materials/merge_train_cond.csv', 'path': 'materials/merge_train_cond.csv'},
    {'name': 'materials/imgs/graduate_selected.png', 'path': 'materials/imgs/graduate_selected.png'},
    {'name': 'materials/merge_sort/imgs/merge_train/merge_train_ex_5_3_wrong_selected.png', 'path': 'materials/merge_sort/imgs/merge_train/merge_train_ex_5_3_wrong_selected.png'},
    {'name': 'materials/merge_sort/imgs/merge_train/merge_train_ex_5_1_correct.png', 'path': 'materials/merge_sort/imgs/merge_train/merge_train_ex_5_1_correct.png'},
    {'name': 'materials/merge_sort/imgs/merge_train/merge_train_ex_5_2_correct.png', 'path': 'materials/merge_sort/imgs/merge_train/merge_train_ex_5_2_correct.png'},
    {'name': 'materials/merge_sort/imgs/fruits/apple_B.png', 'path': 'materials/merge_sort/imgs/fruits/apple_B.png'},
    {'name': 'materials/merge_sort/imgs/fruits/apple_J.png', 'path': 'materials/merge_sort/imgs/fruits/apple_J.png'},
    {'name': 'materials/merge_sort/imgs/fruits/melon_A.png', 'path': 'materials/merge_sort/imgs/fruits/melon_A.png'},
    {'name': 'materials/merge_sort/imgs/merge_train/merge_train_ex_2.png', 'path': 'materials/merge_sort/imgs/merge_train/merge_train_ex_2.png'},
    {'name': 'materials/imgs/bachelor_selected.png', 'path': 'materials/imgs/bachelor_selected.png'},
    {'name': 'materials/sort_test_cond.csv', 'path': 'materials/sort_test_cond.csv'},
    {'name': 'materials/imgs/_55_64_selected.png', 'path': 'materials/imgs/_55_64_selected.png'},
    {'name': 'materials/imgs/prefer_not_to_say_selected.png', 'path': 'materials/imgs/prefer_not_to_say_selected.png'},
    {'name': 'materials/merge_sort/imgs/fruits/apple_D.png', 'path': 'materials/merge_sort/imgs/fruits/apple_D.png'},
    {'name': 'materials/imgs/_65_selected.png', 'path': 'materials/imgs/_65_selected.png'},
    {'name': 'materials/merge_sort/imgs/fruits/banana_I.png', 'path': 'materials/merge_sort/imgs/fruits/banana_I.png'},
    {'name': 'materials/merge_sort/imgs/merge_test/merge_test_ex_2.png', 'path': 'materials/merge_sort/imgs/merge_test/merge_test_ex_2.png'},
    {'name': 'materials/merge_sort/imgs/sort_train/sort_train_example.png', 'path': 'materials/merge_sort/imgs/sort_train/sort_train_example.png'},
    {'name': 'materials/merge_sort/imgs/merge_train/merge_train_ex_5_3_wrong_expl.png', 'path': 'materials/merge_sort/imgs/merge_train/merge_train_ex_5_3_wrong_expl.png'},
    {'name': 'materials/imgs/_45_54_selected.png', 'path': 'materials/imgs/_45_54_selected.png'},
    {'name': 'materials/merge_sort/imgs/fruits/apple_I.png', 'path': 'materials/merge_sort/imgs/fruits/apple_I.png'},
    {'name': 'materials/merge_sort/imgs/grey_BG.png', 'path': 'materials/merge_sort/imgs/grey_BG.png'},
    {'name': 'materials/merge_sort/imgs/merge_train/merge_train_ex_5_2_correct_selected.png', 'path': 'materials/merge_sort/imgs/merge_train/merge_train_ex_5_2_correct_selected.png'},
    {'name': 'materials/imgs/_35_44.png', 'path': 'materials/imgs/_35_44.png'},
    {'name': 'materials/imgs/prefer_not_to_say.png', 'path': 'materials/imgs/prefer_not_to_say.png'},
    {'name': 'materials/merge_sort/imgs/compare_clicked.png', 'path': 'materials/merge_sort/imgs/compare_clicked.png'},
    {'name': 'materials/merge_sort/imgs/merge_train/merge_train_ex_1_1_wrong.png', 'path': 'materials/merge_sort/imgs/merge_train/merge_train_ex_1_1_wrong.png'},
    {'name': 'materials/merge_sort/imgs/fruits/melon.png', 'path': 'materials/merge_sort/imgs/fruits/melon.png'},
    {'name': 'materials/imgs/other_gender_selected.png', 'path': 'materials/imgs/other_gender_selected.png'},
    {'name': 'materials/merge_sort/imgs/fruits/apple_K.png', 'path': 'materials/merge_sort/imgs/fruits/apple_K.png'},
    {'name': 'materials/merge_sort/imgs/merge_train/merge_train_ex_5_2_wrong_selected.png', 'path': 'materials/merge_sort/imgs/merge_train/merge_train_ex_5_2_wrong_selected.png'},
    {'name': 'materials/imgs/high_school_equivalent.png', 'path': 'materials/imgs/high_school_equivalent.png'},
    {'name': 'materials/merge_sort/imgs/bob.png', 'path': 'materials/merge_sort/imgs/bob.png'},
    {'name': 'materials/merge_sort/imgs/merge_test/merge_test_ex_1.png', 'path': 'materials/merge_sort/imgs/merge_test/merge_test_ex_1.png'},
    {'name': 'materials/merge_sort/imgs/fruits/melon_E.png', 'path': 'materials/merge_sort/imgs/fruits/melon_E.png'},
    {'name': 'materials/merge_sort/imgs/fruits/melon_L.png', 'path': 'materials/merge_sort/imgs/fruits/melon_L.png'},
    {'name': 'materials/merge_sort/imgs/fruits/banana_A.png', 'path': 'materials/merge_sort/imgs/fruits/banana_A.png'},
    {'name': 'materials/merge_sort/imgs/merge_train/merge_train_ex_5_1_wrong.png', 'path': 'materials/merge_sort/imgs/merge_train/merge_train_ex_5_1_wrong.png'},
    {'name': 'materials/merge_sort/imgs/fruits/banana_K.png', 'path': 'materials/merge_sort/imgs/fruits/banana_K.png'},
    {'name': 'materials/imgs/doctorate_selected.png', 'path': 'materials/imgs/doctorate_selected.png'},
    {'name': 'materials/imgs/other.png', 'path': 'materials/imgs/other.png'},
    {'name': 'materials/merge_sort/imgs/merge_train/merge_train_ex_1.png', 'path': 'materials/merge_sort/imgs/merge_train/merge_train_ex_1.png'},
    {'name': 'materials/merge_sort/imgs/fruits/banana_C.png', 'path': 'materials/merge_sort/imgs/fruits/banana_C.png'},
    {'name': 'materials/merge_sort/imgs/merge_train/merge_train_ex_1_1_wrong_selected.png', 'path': 'materials/merge_sort/imgs/merge_train/merge_train_ex_1_1_wrong_selected.png'},
    {'name': 'materials/merge_sort/imgs/purple_diamond.png', 'path': 'materials/merge_sort/imgs/purple_diamond.png'},
    {'name': 'materials/merge_sort/imgs/merge_train/merge_train_ex_1_1_correct_expl.png', 'path': 'materials/merge_sort/imgs/merge_train/merge_train_ex_1_1_correct_expl.png'},
    {'name': 'materials/merge_sort/imgs/merge_train/merge_train_ex_5_2_correct_expl.png', 'path': 'materials/merge_sort/imgs/merge_train/merge_train_ex_5_2_correct_expl.png'},
    {'name': 'materials/merge_sort/imgs/merge_train/merge_train_ex_5_2_wrong.png', 'path': 'materials/merge_sort/imgs/merge_train/merge_train_ex_5_2_wrong.png'},
    {'name': 'materials/merge_sort/imgs/merge_train/merge_train_ex_2_2_correct.png', 'path': 'materials/merge_sort/imgs/merge_train/merge_train_ex_2_2_correct.png'},
    {'name': 'materials/merge_sort/imgs/fruits/banana_H.png', 'path': 'materials/merge_sort/imgs/fruits/banana_H.png'},
    {'name': 'materials/merge_sort/imgs/scale_left.png', 'path': 'materials/merge_sort/imgs/scale_left.png'},
    {'name': 'materials/imgs/continue.png', 'path': 'materials/imgs/continue.png'},
    {'name': 'materials/merge_sort/imgs/merge_train/merge_train_ex_2_1_wrong.png', 'path': 'materials/merge_sort/imgs/merge_train/merge_train_ex_2_1_wrong.png'},
    {'name': 'materials/imgs/_25_34_selected.png', 'path': 'materials/imgs/_25_34_selected.png'},
    {'name': 'materials/imgs/_25_34.png', 'path': 'materials/imgs/_25_34.png'},
    {'name': 'materials/merge_sort/imgs/fruits/apple_L.png', 'path': 'materials/merge_sort/imgs/fruits/apple_L.png'},
    {'name': 'materials/imgs/high_school_equivalent_selected.png', 'path': 'materials/imgs/high_school_equivalent_selected.png'},
    {'name': 'materials/merge_sort/imgs/blue_star_clicked.png', 'path': 'materials/merge_sort/imgs/blue_star_clicked.png'},
    {'name': 'materials/imgs/waiting2.png', 'path': 'materials/imgs/waiting2.png'},
    {'name': 'materials/imgs/_18_24_selected.png', 'path': 'materials/imgs/_18_24_selected.png'},
    {'name': 'materials/imgs/_45_54.png', 'path': 'materials/imgs/_45_54.png'},
    {'name': 'materials/merge_sort/imgs/merge_test/merge_test_ex_5.png', 'path': 'materials/merge_sort/imgs/merge_test/merge_test_ex_5.png'},
    {'name': 'materials/merge_sort/imgs/scale_balanced.png', 'path': 'materials/merge_sort/imgs/scale_balanced.png'},
    {'name': 'materials/merge_sort/imgs/fruits/melon_B.png', 'path': 'materials/merge_sort/imgs/fruits/melon_B.png'}
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
var INTROClock;
var intro_text;
var alice;
var bob;
var door_1;
var door_2;
var intro_btn;
var intro_mouse;
var HINTClock;
var intro_text_8;
var arrow;
var alice_5;
var bob_5;
var door_8;
var door_9;
var hint_btn;
var hint_mouse;
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
var door_6;
var merge_test_intro_btn;
var merge_test_intro_mouse;
var MERGE_TESTClock;
var merge_test_scale_instr;
var merge_test_ans_instr;
var merge_test_instr;
var merge_test_scale_right;
var merge_test_scale_left;
var merge_test_res;
var merge_test_sep;
var merge_test;
var merge_test_scale;
var merge_test_btn;
var merge_test_compare;
var merge_test_mouse;
var merge_test_timer;
var STRUCTURE_INTROClock;
var intro_text_9;
var alice_6;
var structure_example;
var door_10;
var structure_intro_btn;
var structure_intro_mouse;
var STRUCTURE_TRAINClock;
var structure_train_merge_instr;
var structure_train_feedback_1;
var structure_train_feedback_2;
var structure_train_instr;
var structure_train_sublist_right;
var structure_train_sublist_left;
var structure_train_sep;
var structure_train_board;
var structure_train_btn;
var structure_train_merge;
var structure_train_mouse;
var structure_train_timer;
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
var sort_expl_compare;
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
var sort_test_compare;
var sort_test_mouse;
var sort_test_timer;
var EXP_CHECKClock;
var exp_check_question;
var exp_check_res;
var exp_check_btn;
var exp_check_mouse;
var DEBRIEFClock;
var intro_text_5;
var debrief_mouse;
var globalClock;
var routineTimer;
async function experimentInit() {
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
  // Initialize components for Routine "INTRO"
  INTROClock = new util.Clock();
  intro_text = new visual.TextStim({
    win: psychoJS.window,
    name: 'intro_text',
    text: 'Today, you will learn how to help our robot trader friends ALICE & BOB to package fruits for shipment. \n\nYou will visit two warehouses "rooms", learn and perform the BLUE STAR operator and the PURPLE DIAMOND operator ALICE and BOB will first help you learn these operators and then test your knowledge afterwards.',
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
    text: "*** What ALICE teaches you about the BLUE STAR might help you better learn and work throgh BOB's the PURPLE DIAMOND ***",
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
  door_8 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'door_8', units : undefined, 
    image : 'materials/merge_sort/imgs/door.png', mask : undefined,
    ori : 0.0, pos : [(- 0.5), 0.2], size : [0.15, 0.3],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -4.0 
  });
  door_9 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'door_9', units : undefined, 
    image : 'materials/merge_sort/imgs/door.png', mask : undefined,
    ori : 0.0, pos : [0.5, 0.2], size : [0.15, 0.3],
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
  door_3 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'door_3', units : undefined, 
    image : 'materials/merge_sort/imgs/door.png', mask : undefined,
    ori : 0.0, pos : [(- 0.45), 0.25], size : [0.15, 0.3],
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
    pos: [0, (- 0.15)], height: 0.03,  wrapWidth: 1.5, ori: 0.0,
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
    image : undefined, mask : undefined,
    ori : 0.0, pos : [(- 0.15), 0.25], size : [0.3, 0.075],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -8.0 
  });
  merge_expl_mc_2 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'merge_expl_mc_2', units : undefined, 
    image : undefined, mask : undefined,
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
  door_6 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'door_6', units : undefined, 
    image : 'materials/merge_sort/imgs/door.png', mask : undefined,
    ori : 0.0, pos : [(- 0.45), 0.25], size : [0.15, 0.3],
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
    text: 'Put fruits on the CONVEYOR BELT by entering their labels as  X,X,X,X, ... ,X',
    font: 'Open Sans',
    units: undefined, 
    pos: [(- 0.25), (- 0.25)], height: 0.03,  wrapWidth: undefined, ori: 0.0,
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
    depth: -9.0 
  });
  
  merge_test_sep = new visual.ImageStim({
    win : psychoJS.window,
    name : 'merge_test_sep', units : undefined, 
    image : 'materials/merge_sort/imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [0, (- 0.15)], size : [1.5, 0.005],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -10.0 
  });
  merge_test = new visual.ImageStim({
    win : psychoJS.window,
    name : 'merge_test', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, 0.2], size : [0.8, 0.4],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -11.0 
  });
  merge_test_scale = new visual.ImageStim({
    win : psychoJS.window,
    name : 'merge_test_scale', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [(- 0.65), 0.15], size : [0.3, 0.3],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -12.0 
  });
  merge_test_btn = new visual.ImageStim({
    win : psychoJS.window,
    name : 'merge_test_btn', units : undefined, 
    image : 'materials/imgs/submit.png', mask : undefined,
    ori : 0.0, pos : [0.5, (- 0.35)], size : [0.24, 0.1],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -13.0 
  });
  merge_test_compare = new visual.ImageStim({
    win : psychoJS.window,
    name : 'merge_test_compare', units : undefined, 
    image : 'materials/merge_sort/imgs/compare.png', mask : undefined,
    ori : 0.0, pos : [(- 0.65), (- 0.05)], size : [0.16, 0.07],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -14.0 
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
    depth: -16.0 
  });
  
  // Initialize components for Routine "STRUCTURE_INTRO"
  STRUCTURE_INTROClock = new util.Clock();
  intro_text_9 = new visual.TextStim({
    win: psychoJS.window,
    name: 'intro_text_9',
    text: 'ALICE: OOOooO ... The BLUE STAR is an OPERATOR for arranging fruits and incurs a COMPARISON COST after each use.\n\n1. You need to arrange a PILE of fruits that is most likely UNORDERED into ONE COLLECTION\n\n2. EACH BLUE STAR operation combines TWO COLLECTIONS at a time, apply iteratively to combine ALL COLLECTIONS\n\nMINIMISE the cost and try different ways of applying the BLUE STAR',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, (- 0.15)], height: 0.03,  wrapWidth: 1.2, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
  alice_6 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'alice_6', units : undefined, 
    image : 'materials/merge_sort/imgs/alice.png', mask : undefined,
    ori : 0.0, pos : [(- 0.25), 0.25], size : [0.2, 0.2],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -1.0 
  });
  structure_example = new visual.ImageStim({
    win : psychoJS.window,
    name : 'structure_example', units : undefined, 
    image : 'materials/merge_sort/imgs/structure_train/structure_train_example.png', mask : undefined,
    ori : 0.0, pos : [0.3, 0.25], size : [0.7, 0.4],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -2.0 
  });
  door_10 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'door_10', units : undefined, 
    image : 'materials/merge_sort/imgs/door.png', mask : undefined,
    ori : 0.0, pos : [(- 0.45), 0.25], size : [0.15, 0.3],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -3.0 
  });
  structure_intro_btn = new visual.ImageStim({
    win : psychoJS.window,
    name : 'structure_intro_btn', units : undefined, 
    image : 'materials/imgs/continue.png', mask : undefined,
    ori : 0.0, pos : [0, (- 0.4)], size : [0.28, 0.1],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -4.0 
  });
  structure_intro_mouse = new core.Mouse({
    win: psychoJS.window,
  });
  structure_intro_mouse.mouseClock = new util.Clock();
  // Initialize components for Routine "STRUCTURE_TRAIN"
  STRUCTURE_TRAINClock = new util.Clock();
  structure_train_merge_instr = new visual.TextStim({
    win: psychoJS.window,
    name: 'structure_train_merge_instr',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [(- 0.55), 0.42], height: 1.0,  wrapWidth: 0.4, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: -6.0 
  });
  
  structure_train_feedback_1 = new visual.TextStim({
    win: psychoJS.window,
    name: 'structure_train_feedback_1',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [(- 0.45), (- 0.35)], height: 0.05,  wrapWidth: 0.4, ori: 0.0,
    color: new util.Color('yellow'),  opacity: undefined,
    depth: -7.0 
  });
  
  structure_train_feedback_2 = new visual.TextStim({
    win: psychoJS.window,
    name: 'structure_train_feedback_2',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [0.1, (- 0.35)], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('yellow'),  opacity: undefined,
    depth: -8.0 
  });
  
  structure_train_instr = new visual.TextStim({
    win: psychoJS.window,
    name: 'structure_train_instr',
    text: '1. You need to arrange a PILE of fruits that is most likely UNORDERED into ONE COLLECTION with fruits of INCREASING weights from left to right\n\n2. PRESS the button with the BLUE STAR icon to combine TWO COLLECTIONS at a time\n\n3. You can see the NUMBER OF COMPARISONS ALICE uses as a reference and you have 300 SECS to SUBMIT!',
    font: 'Open Sans',
    units: undefined, 
    pos: [(- 0.55), 0], height: 0.02,  wrapWidth: 0.4, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: -9.0 
  });
  
  structure_train_sublist_right = new visual.TextBox({
    win: psychoJS.window,
    name: 'structure_train_sublist_right',
    text: '',
    font: 'Open Sans',
    pos: [(- 0.45), 0.35], letterHeight: 0.03,
    size: [0.15, 0.07],  units: undefined, 
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
  
  structure_train_sublist_left = new visual.TextBox({
    win: psychoJS.window,
    name: 'structure_train_sublist_left',
    text: '',
    font: 'Open Sans',
    pos: [(- 0.65), 0.35], letterHeight: 0.03,
    size: [0.15, 0.07],  units: undefined, 
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
  
  structure_train_sep = new visual.ImageStim({
    win : psychoJS.window,
    name : 'structure_train_sep', units : undefined, 
    image : 'materials/merge_sort/imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [0, (- 0.2)], size : [1.5, 0.005],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -12.0 
  });
  structure_train_board = new visual.ImageStim({
    win : psychoJS.window,
    name : 'structure_train_board', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0.3, 0.15], size : [1, 0.6],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -13.0 
  });
  structure_train_btn = new visual.ImageStim({
    win : psychoJS.window,
    name : 'structure_train_btn', units : undefined, 
    image : 'materials/imgs/waiting2.png', mask : undefined,
    ori : 0.0, pos : [0.6, (- 0.35)], size : [0.28, 0.1],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -14.0 
  });
  structure_train_merge = new visual.ImageStim({
    win : psychoJS.window,
    name : 'structure_train_merge', units : undefined, 
    image : 'materials/merge_sort/imgs/blue_star.png', mask : undefined,
    ori : 0.0, pos : [(- 0.55), 0.2], size : [0.3, 0.09],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -15.0 
  });
  structure_train_mouse = new core.Mouse({
    win: psychoJS.window,
  });
  structure_train_mouse.mouseClock = new util.Clock();
  structure_train_timer = new visual.TextStim({
    win: psychoJS.window,
    name: 'structure_train_timer',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [(- 0.55), (- 0.15)], height: 0.03,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('orange'),  opacity: undefined,
    depth: -17.0 
  });
  
  // Initialize components for Routine "SORT_INTRO"
  SORT_INTROClock = new util.Clock();
  intro_text_3 = new visual.TextStim({
    win: psychoJS.window,
    name: 'intro_text_3',
    text: 'BOB: CLIKKKK ... SOOO GOOooD to see you!\n\n1. You need to arrange a PILE of fruits that is most likely UNORDERED\n\n2. The PURPLE DIAMOND arranges fruits from the PILE into the SHIPPING CRATE in INCREASING weights from LEFT to RIGHT\n\nLEARN with BOB the PURPLE DIAMOND operation in steps and master it. ',
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
  door_4 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'door_4', units : undefined, 
    image : 'materials/merge_sort/imgs/door.png', mask : undefined,
    ori : 0.0, pos : [0.45, 0.25], size : [0.15, 0.3],
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
    text: 'Put fruits into the SHIPPING CRATE by entering their labels as  X,X,X,X, ... ,X',
    font: 'Open Sans',
    units: undefined, 
    pos: [(- 0.25), (- 0.25)], height: 0.03,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: -8.0 
  });
  
  sort_train_instr = new visual.TextStim({
    win: psychoJS.window,
    name: 'sort_train_instr',
    text: '1. Use the scale on the left to COMPARE weights of TWO fruits by entering the alphabetic CAPITAL labels\n\n2. You are given a PILE of fruits that is most likely UNORDERED and you can move fruits freely on the MONITOR in the middle\n\n3. The PURPLE DIAMOND puts fruits from the PILE into the SHIPPING CRATE in INCREASING weights from LEFT to RIGHT\n\n4. You can see the NUMBER OF COMPARISONS BOB uses as a reference and you have 300 SECS to SUBMIT!',
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
    depth: -12.0 
  });
  
  sort_train_sep = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_train_sep', units : undefined, 
    image : 'materials/merge_sort/imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [0, (- 0.15)], size : [1.5, 0.005],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -13.0 
  });
  sort_train_board = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_train_board', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, 0.2], size : [0.8, 0.5],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -14.0 
  });
  sort_train_scale = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_train_scale', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [(- 0.65), 0.15], size : [0.3, 0.3],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -15.0 
  });
  sort_train_ex_1 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_train_ex_1', units : undefined, 
    image : 'materials/merge_sort/imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -16.0 
  });
  sort_train_ex_2 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_train_ex_2', units : undefined, 
    image : 'materials/merge_sort/imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -17.0 
  });
  sort_train_ex_3 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_train_ex_3', units : undefined, 
    image : 'materials/merge_sort/imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -18.0 
  });
  sort_train_ex_4 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_train_ex_4', units : undefined, 
    image : 'materials/merge_sort/imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -19.0 
  });
  sort_train_ex_5 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_train_ex_5', units : undefined, 
    image : 'materials/merge_sort/imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -20.0 
  });
  sort_train_ex_6 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_train_ex_6', units : undefined, 
    image : 'materials/merge_sort/imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -21.0 
  });
  sort_train_ex_7 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_train_ex_7', units : undefined, 
    image : 'materials/merge_sort/imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -22.0 
  });
  sort_train_ex_8 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_train_ex_8', units : undefined, 
    image : 'materials/merge_sort/imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -23.0 
  });
  sort_train_ex_9 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_train_ex_9', units : undefined, 
    image : 'materials/merge_sort/imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -24.0 
  });
  sort_train_ex_10 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_train_ex_10', units : undefined, 
    image : 'materials/merge_sort/imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -25.0 
  });
  sort_train_ex_11 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_train_ex_11', units : undefined, 
    image : 'materials/merge_sort/imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -26.0 
  });
  sort_train_ex_12 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_train_ex_12', units : undefined, 
    image : 'materials/merge_sort/imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -27.0 
  });
  sort_train_btn = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_train_btn', units : undefined, 
    image : 'materials/imgs/submit.png', mask : undefined,
    ori : 0.0, pos : [0.5, (- 0.35)], size : [0.24, 0.1],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -28.0 
  });
  sort_train_compare = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_train_compare', units : undefined, 
    image : 'materials/merge_sort/imgs/compare.png', mask : undefined,
    ori : 0.0, pos : [(- 0.65), (- 0.05)], size : [0.16, 0.07],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -29.0 
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
    pos: [0.5, (- 0.22)], height: 0.04,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('yellow'),  opacity: undefined,
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
    image : 'materials/merge_sort/imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -16.0 
  });
  sort_expl_ex_2 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_expl_ex_2', units : undefined, 
    image : 'materials/merge_sort/imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -17.0 
  });
  sort_expl_ex_3 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_expl_ex_3', units : undefined, 
    image : 'materials/merge_sort/imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -18.0 
  });
  sort_expl_ex_4 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_expl_ex_4', units : undefined, 
    image : 'materials/merge_sort/imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -19.0 
  });
  sort_expl_ex_5 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_expl_ex_5', units : undefined, 
    image : 'materials/merge_sort/imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -20.0 
  });
  sort_expl_ex_6 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_expl_ex_6', units : undefined, 
    image : 'materials/merge_sort/imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -21.0 
  });
  sort_expl_ex_7 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_expl_ex_7', units : undefined, 
    image : 'materials/merge_sort/imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -22.0 
  });
  sort_expl_ex_8 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_expl_ex_8', units : undefined, 
    image : 'materials/merge_sort/imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -23.0 
  });
  sort_expl_ex_9 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_expl_ex_9', units : undefined, 
    image : 'materials/merge_sort/imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -24.0 
  });
  sort_expl_ex_10 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_expl_ex_10', units : undefined, 
    image : 'materials/merge_sort/imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -25.0 
  });
  sort_expl_ex_11 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_expl_ex_11', units : undefined, 
    image : 'materials/merge_sort/imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -26.0 
  });
  sort_expl_ex_12 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_expl_ex_12', units : undefined, 
    image : 'materials/merge_sort/imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -27.0 
  });
  sort_expl_btn = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_expl_btn', units : undefined, 
    image : 'materials/imgs/continue.png', mask : undefined,
    ori : 0.0, pos : [0.5, (- 0.35)], size : [0.28, 0.1],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -28.0 
  });
  sort_expl_compare = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_expl_compare', units : undefined, 
    image : 'materials/merge_sort/imgs/compare.png', mask : undefined,
    ori : 0.0, pos : [(- 0.65), (- 0.05)], size : [0.16, 0.07],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -29.0 
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
    depth: -31.0 
  });
  
  sort_expl_hint = new visual.TextStim({
    win: psychoJS.window,
    name: 'sort_expl_hint',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [0.5, (- 0.22)], height: 0.04,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('yellow'),  opacity: undefined,
    depth: -32.0 
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
    image : 'materials/merge_sort/imgs/sort_train/sort_train_example.png', mask : undefined,
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
    text: 'Put fruits into the SHIPPING CRATE by entering their labels as  X,X,X,X, ... ,X',
    font: 'Open Sans',
    units: undefined, 
    pos: [(- 0.25), (- 0.25)], height: 0.03,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: -7.0 
  });
  
  sort_test_instr = new visual.TextStim({
    win: psychoJS.window,
    name: 'sort_test_instr',
    text: '1. Use the scale on the left to COMPARE weights of TWO fruits by entering the alphabetic CAPITAL labels\n\n2. You are given a PILE of fruits that is most likely UNORDERED and you can move fruits freely on the MONITOR in the middle\n\n3. The PURPLE DIAMOND puts fruits from the PILE into the SHIPPING CRATE in INCREASING weights from LEFT to RIGHT\n\nYou have 300 SECS to SUBMIT!',
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
    depth: -11.0 
  });
  
  sort_test_sep = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_test_sep', units : undefined, 
    image : 'materials/merge_sort/imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [0, (- 0.15)], size : [1.5, 0.005],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -12.0 
  });
  sort_test_board = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_test_board', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, 0.2], size : [0.8, 0.5],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -13.0 
  });
  sort_test_scale = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_test_scale', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [(- 0.65), 0.15], size : [0.3, 0.3],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -14.0 
  });
  sort_test_ex_1 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_test_ex_1', units : undefined, 
    image : 'materials/merge_sort/imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -15.0 
  });
  sort_test_ex_2 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_test_ex_2', units : undefined, 
    image : 'materials/merge_sort/imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -16.0 
  });
  sort_test_ex_3 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_test_ex_3', units : undefined, 
    image : 'materials/merge_sort/imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -17.0 
  });
  sort_test_ex_4 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_test_ex_4', units : undefined, 
    image : 'materials/merge_sort/imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -18.0 
  });
  sort_test_ex_5 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_test_ex_5', units : undefined, 
    image : 'materials/merge_sort/imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -19.0 
  });
  sort_test_ex_6 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_test_ex_6', units : undefined, 
    image : 'materials/merge_sort/imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -20.0 
  });
  sort_test_ex_7 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_test_ex_7', units : undefined, 
    image : 'materials/merge_sort/imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -21.0 
  });
  sort_test_ex_8 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_test_ex_8', units : undefined, 
    image : 'materials/merge_sort/imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -22.0 
  });
  sort_test_ex_9 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_test_ex_9', units : undefined, 
    image : 'materials/merge_sort/imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -23.0 
  });
  sort_test_ex_10 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_test_ex_10', units : undefined, 
    image : 'materials/merge_sort/imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -24.0 
  });
  sort_test_ex_11 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_test_ex_11', units : undefined, 
    image : 'materials/merge_sort/imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -25.0 
  });
  sort_test_ex_12 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_test_ex_12', units : undefined, 
    image : 'materials/merge_sort/imgs/white_BG.png', mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.06, 0.08],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -26.0 
  });
  sort_test_btn = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_test_btn', units : undefined, 
    image : 'materials/imgs/submit.png', mask : undefined,
    ori : 0.0, pos : [0.5, (- 0.35)], size : [0.24, 0.1],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -27.0 
  });
  sort_test_compare = new visual.ImageStim({
    win : psychoJS.window,
    name : 'sort_test_compare', units : undefined, 
    image : 'materials/merge_sort/imgs/compare.png', mask : undefined,
    ori : 0.0, pos : [(- 0.65), (- 0.05)], size : [0.16, 0.07],
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -28.0 
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
    depth: -30.0 
  });
  
  // Initialize components for Routine "EXP_CHECK"
  EXP_CHECKClock = new util.Clock();
  exp_check_question = new visual.TextStim({
    win: psychoJS.window,
    name: 'exp_check_question',
    text: 'If you have received training or have studied any SORTING algorithms before the experiment, please tell us which one(s) you KNOW and HAVE USED for the experiment:',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0.2], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
  exp_check_res = new visual.TextBox({
    win: psychoJS.window,
    name: 'exp_check_res',
    text: '',
    font: 'Open Sans',
    pos: [0, (- 0.15)], letterHeight: 0.05,
    size: [0.7, 0.2],  units: undefined, 
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
  // Initialize components for Routine "DEBRIEF"
  DEBRIEFClock = new util.Clock();
  intro_text_5 = new visual.TextStim({
    win: psychoJS.window,
    name: 'intro_text_5',
    text: 'This is the end of the experiment!\n\nThank you very much for your time and effort!\n\nClick anywhere to exit!',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.03,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
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
var age_selected;
var education_selected;
var gender_selected;
var gender_groups;
var age_groups;
var education_groups;
var routineT;
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


var frameRemains;
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


var _mouseXYs;
var _mouseButtons;
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
    HINTComponents.push(door_8);
    HINTComponents.push(door_9);
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
    
    // *door_8* updates
    if (t >= 0.0 && door_8.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      door_8.tStart = t;  // (not accounting for frame time here)
      door_8.frameNStart = frameN;  // exact frame index
      
      door_8.setAutoDraw(true);
    }

    frameRemains = 0.0 + 120.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (door_8.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      door_8.setAutoDraw(false);
    }
    
    // *door_9* updates
    if (t >= 0.0 && door_9.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      door_9.tStart = t;  // (not accounting for frame time here)
      door_9.frameNStart = frameN;  // exact frame index
      
      door_9.setAutoDraw(true);
    }

    frameRemains = 0.0 + 120.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (door_9.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      door_9.setAutoDraw(false);
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
    MERGE_INTROComponents.push(door_3);
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
    return Scheduler.Event.NEXT;
  };
}


var TRAIN_1;
var currentLoop;
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


var TRAIN_2;
function TRAIN_2LoopBegin(TRAIN_2LoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    TRAIN_2 = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 1, method: TrialHandler.Method.SEQUENTIAL,
      extraInfo: expInfo, originPath: undefined,
      trialList: 'materials/structure_train_cond.csv',
      seed: undefined, name: 'TRAIN_2'
    });
    psychoJS.experiment.addLoop(TRAIN_2); // add the loop to the experiment
    currentLoop = TRAIN_2;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    for (const thisTRAIN_2 of TRAIN_2) {
      const snapshot = TRAIN_2.getSnapshot();
      TRAIN_2LoopScheduler.add(importConditions(snapshot));
      TRAIN_2LoopScheduler.add(STRUCTURE_TRAINRoutineBegin(snapshot));
      TRAIN_2LoopScheduler.add(STRUCTURE_TRAINRoutineEachFrame());
      TRAIN_2LoopScheduler.add(STRUCTURE_TRAINRoutineEnd());
      TRAIN_2LoopScheduler.add(endLoopIteration(TRAIN_2LoopScheduler, snapshot));
    }
    
    return Scheduler.Event.NEXT;
  }
}


async function TRAIN_2LoopEnd() {
  psychoJS.experiment.removeLoop(TRAIN_2);

  return Scheduler.Event.NEXT;
}


var TRAIN_3;
function TRAIN_3LoopBegin(TRAIN_3LoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    TRAIN_3 = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 1, method: TrialHandler.Method.SEQUENTIAL,
      extraInfo: expInfo, originPath: undefined,
      trialList: 'materials/sort_train_cond.csv',
      seed: undefined, name: 'TRAIN_3'
    });
    psychoJS.experiment.addLoop(TRAIN_3); // add the loop to the experiment
    currentLoop = TRAIN_3;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    for (const thisTRAIN_3 of TRAIN_3) {
      const snapshot = TRAIN_3.getSnapshot();
      TRAIN_3LoopScheduler.add(importConditions(snapshot));
      TRAIN_3LoopScheduler.add(SORT_TRAINRoutineBegin(snapshot));
      TRAIN_3LoopScheduler.add(SORT_TRAINRoutineEachFrame());
      TRAIN_3LoopScheduler.add(SORT_TRAINRoutineEnd());
      TRAIN_3LoopScheduler.add(SORT_EXPLRoutineBegin(snapshot));
      TRAIN_3LoopScheduler.add(SORT_EXPLRoutineEachFrame());
      TRAIN_3LoopScheduler.add(SORT_EXPLRoutineEnd());
      TRAIN_3LoopScheduler.add(endLoopIteration(TRAIN_3LoopScheduler, snapshot));
    }
    
    return Scheduler.Event.NEXT;
  }
}


async function TRAIN_3LoopEnd() {
  psychoJS.experiment.removeLoop(TRAIN_3);

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


var merge_train_input;
var mc_order;
var merge_train_compare_records;
var merge_train_labels;
var merge_train_compareN;
var merge_train_mc_path_2;
var merge_train_mc_path_1;
var isComparePressed;
var comparePressedT;
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
    merge_train_mc_1.setImage('materials/merge_sort/imgs/white_BG.png');
    merge_train_mc_2.setImage('materials/merge_sort/imgs/white_BG.png');
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


var prevButtonState;
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
          // keep track of start time/frame for later
          merge_train_mouse.tStart = t;  // (not accounting for frame time here)
          merge_train_mouse.frameNStart = frameN;  // exact frame index
          
          merge_train_mouse.status = PsychoJS.Status.STARTED;
          merge_train_mouse.mouseClock.reset();
          prevButtonState = merge_train_mouse.getPressed();  // if button is down already this ISN'T a new click
    }
    
    if ((merge_train_mouse.status === PsychoJS.Status.STARTED || merge_train_mouse.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
          merge_train_mouse.status = PsychoJS.Status.FINISHED;
    }
    
    if (t >= 0.5 && merge_train_mouse.status === PsychoJS.Status.STARTED) {
        _mouseButtons = merge_train_mouse.getPressed();
        if (!_mouseButtons.every( (e,i,) => (e == prevButtonState[i]) )) {
            prevButtonState = _mouseButtons;
            if (_mouseButtons.reduce( (e, acc) => (e+acc) ) > 0) { 
                for (const obj of [merge_train_btn_1,merge_train_btn_2,merge_train_compare,merge_train_scale_left,merge_train_scale_right]) {
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
    merge_expl_mc_1.setImage('materials/merge_sort/imgs/white_BG.png');
    merge_expl_mc_2.setImage('materials/merge_sort/imgs/white_BG.png');
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
    MERGE_TEST_INTROComponents.push(door_6);
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
    return Scheduler.Event.NEXT;
  };
}


var merge_test_input;
var merge_test_labels;
var merge_test_compareN;
var merge_test_compare_records;
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
    merge_test_res.setText('');
    merge_test.setImage(img_path);
    merge_test_scale.setImage(scaleEqPath);
    // setup some python lists for storing info about the merge_test_mouse
    gotValidClick = false; // until a click is received
    merge_test_timer.setText('');
    merge_test_input = input;
    merge_test_labels = encryption;
    merge_test_compareN = 0;
    merge_test_compare_records = [];
    
    merge_test_res.refresh();
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
    // keep track of which components have finished
    MERGE_TESTComponents = [];
    MERGE_TESTComponents.push(merge_test_scale_instr);
    MERGE_TESTComponents.push(merge_test_ans_instr);
    MERGE_TESTComponents.push(merge_test_instr);
    MERGE_TESTComponents.push(merge_test_scale_right);
    MERGE_TESTComponents.push(merge_test_scale_left);
    MERGE_TESTComponents.push(merge_test_res);
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
    psychoJS.experiment.addData('merge_test_res.text',merge_test_res.text)
    // store data for psychoJS.experiment (ExperimentHandler)
    _mouseXYs = merge_test_mouse.getPos();
    _mouseButtons = merge_test_mouse.getPressed();
    psychoJS.experiment.addData('merge_test_mouse.x', _mouseXYs[0]);
    psychoJS.experiment.addData('merge_test_mouse.y', _mouseXYs[1]);
    psychoJS.experiment.addData('merge_test_mouse.leftButton', _mouseButtons[0]);
    psychoJS.experiment.addData('merge_test_mouse.midButton', _mouseButtons[1]);
    psychoJS.experiment.addData('merge_test_mouse.rightButton', _mouseButtons[2]);
    psychoJS.experiment.addData("merge_test_input",merge_test_input);
    psychoJS.experiment.addData("merge_test_labels",merge_test_labels);
    psychoJS.experiment.addData("merge_test_compareN",merge_test_compareN);
    psychoJS.experiment.addData("merge_test_compare_records",merge_test_compare_records);
    psychoJS.experiment.addData("merge_test.tStart",merge_test.tStart);
    psychoJS.experiment.addData("merge_test.tEnd",routineT);
    return Scheduler.Event.NEXT;
  };
}


var STRUCTURE_INTROComponents;
function STRUCTURE_INTRORoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'STRUCTURE_INTRO'-------
    t = 0;
    STRUCTURE_INTROClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(120.000000);
    // update component parameters for each repeat
    // setup some python lists for storing info about the structure_intro_mouse
    gotValidClick = false; // until a click is received
    routineT = 0;
    // keep track of which components have finished
    STRUCTURE_INTROComponents = [];
    STRUCTURE_INTROComponents.push(intro_text_9);
    STRUCTURE_INTROComponents.push(alice_6);
    STRUCTURE_INTROComponents.push(structure_example);
    STRUCTURE_INTROComponents.push(door_10);
    STRUCTURE_INTROComponents.push(structure_intro_btn);
    STRUCTURE_INTROComponents.push(structure_intro_mouse);
    
    for (const thisComponent of STRUCTURE_INTROComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function STRUCTURE_INTRORoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'STRUCTURE_INTRO'-------
    // get current time
    t = STRUCTURE_INTROClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *intro_text_9* updates
    if (t >= 0.0 && intro_text_9.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      intro_text_9.tStart = t;  // (not accounting for frame time here)
      intro_text_9.frameNStart = frameN;  // exact frame index
      
      intro_text_9.setAutoDraw(true);
    }

    frameRemains = 0.0 + 120.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (intro_text_9.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      intro_text_9.setAutoDraw(false);
    }
    
    // *alice_6* updates
    if (t >= 0.0 && alice_6.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      alice_6.tStart = t;  // (not accounting for frame time here)
      alice_6.frameNStart = frameN;  // exact frame index
      
      alice_6.setAutoDraw(true);
    }

    frameRemains = 0.0 + 120.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (alice_6.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      alice_6.setAutoDraw(false);
    }
    
    // *structure_example* updates
    if (t >= 0.0 && structure_example.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      structure_example.tStart = t;  // (not accounting for frame time here)
      structure_example.frameNStart = frameN;  // exact frame index
      
      structure_example.setAutoDraw(true);
    }

    frameRemains = 0.0 + 120.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (structure_example.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      structure_example.setAutoDraw(false);
    }
    
    // *door_10* updates
    if (t >= 0.0 && door_10.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      door_10.tStart = t;  // (not accounting for frame time here)
      door_10.frameNStart = frameN;  // exact frame index
      
      door_10.setAutoDraw(true);
    }

    frameRemains = 0.0 + 120.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (door_10.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      door_10.setAutoDraw(false);
    }
    
    // *structure_intro_btn* updates
    if (t >= 0.5 && structure_intro_btn.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      structure_intro_btn.tStart = t;  // (not accounting for frame time here)
      structure_intro_btn.frameNStart = frameN;  // exact frame index
      
      structure_intro_btn.setAutoDraw(true);
    }

    frameRemains = 120.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((structure_intro_btn.status === PsychoJS.Status.STARTED || structure_intro_btn.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      structure_intro_btn.setAutoDraw(false);
    }
    if (((t >= 0.5) && (structure_intro_mouse.status === PsychoJS.Status.NOT_STARTED))) {
        structure_intro_mouse.tStart = t;
        structure_intro_mouse.frameNStart = frameN;
        structure_intro_mouse.status = PsychoJS.Status.STARTED;
        structure_intro_mouse.mouseClock.reset();
    }
    if (((structure_intro_mouse.isPressedIn(structure_intro_btn) && (structure_intro_mouse.status === PsychoJS.Status.STARTED)) && (structure_intro_btn.status === PsychoJS.Status.STARTED))) {
        structure_intro_mouse.status = PsychoJS.Status.FINISHED;
        continueRoutine = false;
    }
    if ((structure_intro_mouse.status === PsychoJS.Status.STARTED) && t >= frameRemains) {
        structure_intro_mouse.status = PsychoJS.Status.FINISHED;
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
    for (const thisComponent of STRUCTURE_INTROComponents)
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


function STRUCTURE_INTRORoutineEnd() {
  return async function () {
    //------Ending Routine 'STRUCTURE_INTRO'-------
    for (const thisComponent of STRUCTURE_INTROComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // store data for psychoJS.experiment (ExperimentHandler)
    _mouseXYs = structure_intro_mouse.getPos();
    _mouseButtons = structure_intro_mouse.getPressed();
    psychoJS.experiment.addData('structure_intro_mouse.x', _mouseXYs[0]);
    psychoJS.experiment.addData('structure_intro_mouse.y', _mouseXYs[1]);
    psychoJS.experiment.addData('structure_intro_mouse.leftButton', _mouseButtons[0]);
    psychoJS.experiment.addData('structure_intro_mouse.midButton', _mouseButtons[1]);
    psychoJS.experiment.addData('structure_intro_mouse.rightButton', _mouseButtons[2]);
    psychoJS.experiment.addData("structure_intro.tEnd",routineT);
    return Scheduler.Event.NEXT;
  };
}


var isMergePressed;
var initiated;
var mergePressedT;
var structure_train_input;
var structure_train_labels;
var structure_train_compareN;
var structure_train_merge_trace;
var structure_train_merge_records;
var structure_train_merge_limit;
var structure_train_path_base;
var currentTask;
var STRUCTURE_TRAINComponents;
function STRUCTURE_TRAINRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'STRUCTURE_TRAIN'-------
    t = 0;
    STRUCTURE_TRAINClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(300.000000);
    // update component parameters for each repeat
    structure_train_merge_instr.setColor(new util.Color('white'));
    structure_train_merge_instr.setText('Apply the BLUE STAR by typing leftmost fruit labels of two grey boxes in both LHS and RHS textboxes');
    structure_train_merge_instr.setHeight(0.025);
    structure_train_feedback_1.setText('');
    structure_train_feedback_2.setText('');
    structure_train_sublist_right.setText('');
    structure_train_sublist_right.setText('');
    structure_train_sublist_left.setText('');
    structure_train_sublist_left.setText('');
    structure_train_board.setImage('materials/merge_sort/imgs/white_BG.png');
    structure_train_btn.setOpacity(1.0);
    // setup some python lists for storing info about the structure_train_mouse
    gotValidClick = false; // until a click is received
    structure_train_timer.setText('');
    routineT = 0;
    isMergePressed = false;
    initiated = false;
    mergePressedT = 0.0;
    structure_train_input = input.map(x=>parseInt(x));
    structure_train_labels = encryption.map(x=>x.replaceAll("'",""));
    structure_train_compareN = 0;
    structure_train_merge_trace = [];
    structure_train_merge_records = [];
    structure_train_merge_limit = ms_compare;
    structure_train_path_base = img_path_base;
    currentTask = new Task(structure_train_input,structure_train_labels,structure_train_path_base+".png",psychoJS.window);
    
    structure_train_sublist_left.refresh();
    structure_train_sublist_right.refresh();
    
    structure_train_feedback_2.text = "ALICE uses " + structure_train_merge_limit.toString() + " comparisons\nYou have used in total: 0";
    
    const structure_train_mouse_btns = structure_train_mouse.psychoJS.eventManager.getMouseInfo().buttons;
    for (const b of [0,1,2]){
        structure_train_mouse_btns.pressed[b] = 0;
        structure_train_mouse_btns.clocks[b].reset();
        structure_train_mouse_btns.times[b] = 0.0;
    }
    
    // keep track of which components have finished
    STRUCTURE_TRAINComponents = [];
    STRUCTURE_TRAINComponents.push(structure_train_merge_instr);
    STRUCTURE_TRAINComponents.push(structure_train_feedback_1);
    STRUCTURE_TRAINComponents.push(structure_train_feedback_2);
    STRUCTURE_TRAINComponents.push(structure_train_instr);
    STRUCTURE_TRAINComponents.push(structure_train_sublist_right);
    STRUCTURE_TRAINComponents.push(structure_train_sublist_left);
    STRUCTURE_TRAINComponents.push(structure_train_sep);
    STRUCTURE_TRAINComponents.push(structure_train_board);
    STRUCTURE_TRAINComponents.push(structure_train_btn);
    STRUCTURE_TRAINComponents.push(structure_train_merge);
    STRUCTURE_TRAINComponents.push(structure_train_mouse);
    STRUCTURE_TRAINComponents.push(structure_train_timer);
    
    for (const thisComponent of STRUCTURE_TRAINComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function STRUCTURE_TRAINRoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'STRUCTURE_TRAIN'-------
    // get current time
    t = STRUCTURE_TRAINClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *structure_train_merge_instr* updates
    if (t >= 0.0 && structure_train_merge_instr.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      structure_train_merge_instr.tStart = t;  // (not accounting for frame time here)
      structure_train_merge_instr.frameNStart = frameN;  // exact frame index
      
      structure_train_merge_instr.setAutoDraw(true);
    }

    frameRemains = 0.0 + 300.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (structure_train_merge_instr.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      structure_train_merge_instr.setAutoDraw(false);
    }
    
    // *structure_train_feedback_1* updates
    if (t >= 0.0 && structure_train_feedback_1.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      structure_train_feedback_1.tStart = t;  // (not accounting for frame time here)
      structure_train_feedback_1.frameNStart = frameN;  // exact frame index
      
      structure_train_feedback_1.setAutoDraw(true);
    }

    frameRemains = 0.0 + 300.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (structure_train_feedback_1.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      structure_train_feedback_1.setAutoDraw(false);
    }
    
    // *structure_train_feedback_2* updates
    if (t >= 0.0 && structure_train_feedback_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      structure_train_feedback_2.tStart = t;  // (not accounting for frame time here)
      structure_train_feedback_2.frameNStart = frameN;  // exact frame index
      
      structure_train_feedback_2.setAutoDraw(true);
    }

    frameRemains = 300.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((structure_train_feedback_2.status === PsychoJS.Status.STARTED || structure_train_feedback_2.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      structure_train_feedback_2.setAutoDraw(false);
    }
    
    // *structure_train_instr* updates
    if (t >= 0.0 && structure_train_instr.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      structure_train_instr.tStart = t;  // (not accounting for frame time here)
      structure_train_instr.frameNStart = frameN;  // exact frame index
      
      structure_train_instr.setAutoDraw(true);
    }

    frameRemains = 0.0 + 300.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (structure_train_instr.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      structure_train_instr.setAutoDraw(false);
    }
    
    // *structure_train_sublist_right* updates
    if (t >= 0.0 && structure_train_sublist_right.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      structure_train_sublist_right.tStart = t;  // (not accounting for frame time here)
      structure_train_sublist_right.frameNStart = frameN;  // exact frame index
      
      structure_train_sublist_right.setAutoDraw(true);
    }

    frameRemains = 0.0 + 300.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (structure_train_sublist_right.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      structure_train_sublist_right.setAutoDraw(false);
    }
    
    // *structure_train_sublist_left* updates
    if (t >= 0.0 && structure_train_sublist_left.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      structure_train_sublist_left.tStart = t;  // (not accounting for frame time here)
      structure_train_sublist_left.frameNStart = frameN;  // exact frame index
      
      structure_train_sublist_left.setAutoDraw(true);
    }

    frameRemains = 0.0 + 300.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (structure_train_sublist_left.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      structure_train_sublist_left.setAutoDraw(false);
    }
    
    // *structure_train_sep* updates
    if (t >= 0.0 && structure_train_sep.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      structure_train_sep.tStart = t;  // (not accounting for frame time here)
      structure_train_sep.frameNStart = frameN;  // exact frame index
      
      structure_train_sep.setAutoDraw(true);
    }

    frameRemains = 0.0 + 300.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (structure_train_sep.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      structure_train_sep.setAutoDraw(false);
    }
    
    // *structure_train_board* updates
    if (t >= 0.0 && structure_train_board.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      structure_train_board.tStart = t;  // (not accounting for frame time here)
      structure_train_board.frameNStart = frameN;  // exact frame index
      
      structure_train_board.setAutoDraw(true);
    }

    frameRemains = 0.0 + 300.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (structure_train_board.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      structure_train_board.setAutoDraw(false);
    }
    
    // *structure_train_btn* updates
    if (t >= 0.5 && structure_train_btn.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      structure_train_btn.tStart = t;  // (not accounting for frame time here)
      structure_train_btn.frameNStart = frameN;  // exact frame index
      
      structure_train_btn.setAutoDraw(true);
    }

    frameRemains = 300.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((structure_train_btn.status === PsychoJS.Status.STARTED || structure_train_btn.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      structure_train_btn.setAutoDraw(false);
    }
    
    // *structure_train_merge* updates
    if (t >= 0.5 && structure_train_merge.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      structure_train_merge.tStart = t;  // (not accounting for frame time here)
      structure_train_merge.frameNStart = frameN;  // exact frame index
      
      structure_train_merge.setAutoDraw(true);
    }

    frameRemains = 300.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((structure_train_merge.status === PsychoJS.Status.STARTED || structure_train_merge.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      structure_train_merge.setAutoDraw(false);
    }
    
    // *structure_train_timer* updates
    if (t >= 0.0 && structure_train_timer.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      structure_train_timer.tStart = t;  // (not accounting for frame time here)
      structure_train_timer.frameNStart = frameN;  // exact frame index
      
      structure_train_timer.setAutoDraw(true);
    }

    frameRemains = 300.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((structure_train_timer.status === PsychoJS.Status.STARTED || structure_train_timer.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      structure_train_timer.setAutoDraw(false);
    }
    if (!initiated) {
        STRUCTURE_TRAINComponents.concat(currentTask.background_rects);
        STRUCTURE_TRAINComponents.concat(currentTask.labels);
        STRUCTURE_TRAINComponents.concat(currentTask.fruits);
        currentTask.update();
        initiated = true;
    }
    
    if (t >= 0.5 && structure_train_mouse.status === PsychoJS.Status.NOT_STARTED) {
          structure_train_mouse.tStart = t;
          structure_train_mouse.frameNStart = frameN;  
          
          structure_train_mouse.status = PsychoJS.Status.STARTED;
          structure_train_mouse.mouseClock.reset();
          prevButtonState = structure_train_mouse.getPressed();
    }
    
    if ((structure_train_mouse.status === PsychoJS.Status.STARTED || sort_test_mouse.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
          structure_train_mouse.status = PsychoJS.Status.FINISHED;
    }
    
    if (t >= 0.5 && structure_train_mouse.status === PsychoJS.Status.STARTED) {
        _mouseButtons = structure_train_mouse.getPressed();
        if (!_mouseButtons.every( (e,i,) => (e == prevButtonState[i]) )) {
            prevButtonState = _mouseButtons;
            if (_mouseButtons.reduce( (e, acc) => (e+acc) ) > 0) { 
                for (const obj of [structure_train_btn,structure_train_merge]) {
                    if (structure_train_mouse.isPressedIn(obj) && obj.name === "structure_train_btn" && currentTask.names.length == 1) {
    //                if (structure_train_mouse.isPressedIn(obj) && obj.name === "structure_train_btn") {
                        structure_train_mouse.status = PsychoJS.Status.FINISHED;
                        continueRoutine = false;
                    } else {
                        if(structure_train_mouse.isPressedIn(obj) && !isMergePressed) {
                            if(obj.name === "structure_train_merge" && obj.status !== PsychoJS.Status.FINISHED) {
                                if (checkSublistFormatValid(structure_train_sublist_left, structure_train_sublist_right, structure_train_labels, structure_train_merge_instr)) {
                                    const cost = currentTask.merge_cost(structure_train_sublist_left.text,structure_train_sublist_right.text);
                                    if (cost > 0) {
                                        const res = currentTask.merge(structure_train_sublist_left.text,structure_train_sublist_right.text);
                                        if (res[0]) {
                                            structure_train_compareN += cost;
                                            structure_train_merge_instr.text = "(" + res[1].toString() + ") combined with (" + res[2].toString() + ")";
                                            structure_train_merge_instr.color = green;
                                            structure_train_feedback_1.text = ("Comparison cost of last use: " + cost.toString());
                                            structure_train_feedback_2.text = "ALICE uses " + structure_train_merge_limit.toString() + " comparisons\nYou have used in total: " + structure_train_compareN.toString();
                                            structure_train_merge_trace.push(res[3]);
                                            structure_train_merge_records.push([cost,res[1],res[2]]);
                                        }
                                    }
                                    mergePressedT = t;
                                    isMergePressed = true;
                                    structure_train_merge.image = "materials/merge_sort/imgs/blue_star_clicked.png";
                                    currentTask.update();
                                    currentTask.draw();
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    
    structure_train_timer.text = timerWarning(structureTrainTimeL, t);
    routineT = t;
    
    if (isMergePressed && (routineT - mergePressedT) >= 0.1) {
        structure_train_merge.image = "materials/merge_sort/imgs/blue_star.png";
        isMergePressed = false;
    }
    
    if (currentTask.names.length == 1) {
        structure_train_btn.image = "materials/imgs/continue.png";
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
    for (const thisComponent of STRUCTURE_TRAINComponents)
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


function STRUCTURE_TRAINRoutineEnd() {
  return async function () {
    //------Ending Routine 'STRUCTURE_TRAIN'-------
    for (const thisComponent of STRUCTURE_TRAINComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('structure_train_sublist_right.text',structure_train_sublist_right.text)
    psychoJS.experiment.addData('structure_train_sublist_left.text',structure_train_sublist_left.text)
    // store data for psychoJS.experiment (ExperimentHandler)
    _mouseXYs = structure_train_mouse.getPos();
    _mouseButtons = structure_train_mouse.getPressed();
    psychoJS.experiment.addData('structure_train_mouse.x', _mouseXYs[0]);
    psychoJS.experiment.addData('structure_train_mouse.y', _mouseXYs[1]);
    psychoJS.experiment.addData('structure_train_mouse.leftButton', _mouseButtons[0]);
    psychoJS.experiment.addData('structure_train_mouse.midButton', _mouseButtons[1]);
    psychoJS.experiment.addData('structure_train_mouse.rightButton', _mouseButtons[2]);
    currentTask.clean();
    psychoJS.experiment.addData("structure_train_input",structure_train_input);
    psychoJS.experiment.addData("structure_train_labels",structure_train_labels);
    psychoJS.experiment.addData("structure_train_compareN",structure_train_compareN);
    psychoJS.experiment.addData("structure_train_merge_records",structure_train_merge_records);
    psychoJS.experiment.addData("structure_train_merge_trace",structure_train_merge_trace);
    psychoJS.experiment.addData("structure_train.tStart",structure_train_merge.tStart);
    psychoJS.experiment.addData("structure_train.tEnd",routineT);
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
    SORT_INTROComponents.push(door_4);
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
    return Scheduler.Event.NEXT;
  };
}


var items;
var frameCnt;
var tracePos;
var sort_train_input;
var sort_train_labels;
var sort_train_compareN;
var sort_train_compare_records;
var sort_train_trace;
var sort_train_compare_limit;
var sort_train_path_base;
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
    sort_train_res.setText('');
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
    
    sort_train_res.refresh();
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
    // keep track of which components have finished
    SORT_TRAINComponents = [];
    SORT_TRAINComponents.push(sort_train_scale_instr);
    SORT_TRAINComponents.push(sort_train_ans_instr);
    SORT_TRAINComponents.push(sort_train_instr);
    SORT_TRAINComponents.push(sort_train_scale_right);
    SORT_TRAINComponents.push(sort_train_scale_left);
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
    
    // *sort_train_res* updates
    if (t >= 0.0 && sort_train_res.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sort_train_res.tStart = t;  // (not accounting for frame time here)
      sort_train_res.frameNStart = frameN;  // exact frame index
      
      sort_train_res.setAutoDraw(true);
    }

    frameRemains = 0.0 + 300.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
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
        items = enableImageComponents(SORT_TRAINComponents, sort_train_labels, sort_train_path_base);
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
    psychoJS.experiment.addData('sort_train_res.text',sort_train_res.text)
    // store data for psychoJS.experiment (ExperimentHandler)
    _mouseXYs = sort_train_mouse.getPos();
    _mouseButtons = sort_train_mouse.getPressed();
    psychoJS.experiment.addData('sort_train_mouse.x', _mouseXYs[0]);
    psychoJS.experiment.addData('sort_train_mouse.y', _mouseXYs[1]);
    psychoJS.experiment.addData('sort_train_mouse.leftButton', _mouseButtons[0]);
    psychoJS.experiment.addData('sort_train_mouse.midButton', _mouseButtons[1]);
    psychoJS.experiment.addData('sort_train_mouse.rightButton', _mouseButtons[2]);
    psychoJS.experiment.addData("sort_train_input",sort_train_input);
    psychoJS.experiment.addData("sort_train_labels",sort_train_labels);
    psychoJS.experiment.addData("sort_train_trace",sort_train_trace);
    psychoJS.experiment.addData("sort_train_compareN",sort_train_compareN);
    psychoJS.experiment.addData("sort_train.tStart",sort_train_ex_1.tStart);
    psychoJS.experiment.addData("sort_train.tEnd",routineT);
    psychoJS.experiment.addData("sort_train_compare_records",sort_train_compare_records);
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
    sort_expl_res.setText('');
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
    
    sort_expl_res.refresh();
    sort_expl_scale_left.refresh();
    sort_expl_scale_right.refresh();
    
    sort_expl_hint.text = (((("BOB uses " + sort_train_compare_limit.toString()) + " comparisons\n") + "You have used: ") + (sort_train_compareN + sort_expl_compareN).toString());
    sort_expl_res.text = sort_train_res.text;
    checkSortTrainAns(sort_expl_input, sort_expl_labels, sort_expl_res.text, sort_expl_feedback_1, sort_expl_feedback_2);
    x = sort_expl_board.getPos()[0];
    y = sort_expl_board.getPos()[1];
    w = sort_expl_board.getSize()[0];
    h = sort_expl_board.getSize()[1];
    top = (y + (h / 2));
    bot = (y - (h / 2));
    left = (x - (w / 2));
    right = (x + (w / 2));
    
    routineT = 0;
    // keep track of which components have finished
    SORT_EXPLComponents = [];
    SORT_EXPLComponents.push(sort_expl_scale_instr);
    SORT_EXPLComponents.push(sort_expl_feedback_1);
    SORT_EXPLComponents.push(sort_expl_feedback_2);
    SORT_EXPLComponents.push(sort_expl_instr);
    SORT_EXPLComponents.push(sort_expl_scale_right);
    SORT_EXPLComponents.push(sort_expl_scale_left);
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
        items = enableImageComponents(SORT_EXPLComponents, sort_expl_labels, sort_expl_path_base);
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
    psychoJS.experiment.addData("sort_expl_trace",sort_expl_trace);
    psychoJS.experiment.addData("sort_expl_compareN",sort_expl_compareN);
    psychoJS.experiment.addData("sort_expl_compare_records",sort_expl_compare_records);
    psychoJS.experiment.addData("sort_expl.tStart",sort_expl_ex_1.tStart);
    psychoJS.experiment.addData("sort_expl.tEnd",routineT);
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
    SORT_TEST_INTROComponents.push(door_7);
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
    sort_test_res.setText('');
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
    
    sort_test_res.refresh();
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
    // keep track of which components have finished
    SORT_TESTComponents = [];
    SORT_TESTComponents.push(sort_test_scale_instr);
    SORT_TESTComponents.push(sort_test_ans_instr);
    SORT_TESTComponents.push(sort_test_instr);
    SORT_TESTComponents.push(sort_test_scale_right);
    SORT_TESTComponents.push(sort_test_scale_left);
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
        items = enableImageComponents(SORT_TESTComponents, sort_test_labels, sort_test_path_base);
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
    psychoJS.experiment.addData('sort_test_res.text',sort_test_res.text)
    // store data for psychoJS.experiment (ExperimentHandler)
    _mouseXYs = sort_test_mouse.getPos();
    _mouseButtons = sort_test_mouse.getPressed();
    psychoJS.experiment.addData('sort_test_mouse.x', _mouseXYs[0]);
    psychoJS.experiment.addData('sort_test_mouse.y', _mouseXYs[1]);
    psychoJS.experiment.addData('sort_test_mouse.leftButton', _mouseButtons[0]);
    psychoJS.experiment.addData('sort_test_mouse.midButton', _mouseButtons[1]);
    psychoJS.experiment.addData('sort_test_mouse.rightButton', _mouseButtons[2]);
    psychoJS.experiment.addData("sort_test_input",sort_test_input);
    psychoJS.experiment.addData("sort_test_labels",sort_test_labels);
    psychoJS.experiment.addData("sort_test_trace",sort_test_trace);
    psychoJS.experiment.addData("sort_test_compare_records",sort_test_compare_records);
    psychoJS.experiment.addData("sort_test_compareN",sort_test_compareN);
    psychoJS.experiment.addData("sort_test.tStart",sort_test_ex_1.tStart);
    psychoJS.experiment.addData("sort_test.tEnd",routineT);
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
    routineT = 0;
    // keep track of which components have finished
    EXP_CHECKComponents = [];
    EXP_CHECKComponents.push(exp_check_question);
    EXP_CHECKComponents.push(exp_check_res);
    EXP_CHECKComponents.push(exp_check_btn);
    EXP_CHECKComponents.push(exp_check_mouse);
    
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
    psychoJS.experiment.addData("exp_check.tEnd",routineT);
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
    routineTimer.add(120.000000);
    // update component parameters for each repeat
    // setup some python lists for storing info about the debrief_mouse
    gotValidClick = false; // until a click is received
    // keep track of which components have finished
    DEBRIEFComponents = [];
    DEBRIEFComponents.push(intro_text_5);
    DEBRIEFComponents.push(debrief_mouse);
    
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
    
    // *intro_text_5* updates
    if (t >= 0.0 && intro_text_5.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      intro_text_5.tStart = t;  // (not accounting for frame time here)
      intro_text_5.frameNStart = frameN;  // exact frame index
      
      intro_text_5.setAutoDraw(true);
    }

    frameRemains = 0.0 + 120.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (intro_text_5.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      intro_text_5.setAutoDraw(false);
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
    frameRemains = 120.0  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((debrief_mouse.status === PsychoJS.Status.STARTED || debrief_mouse.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      debrief_mouse.status = PsychoJS.Status.FINISHED;
  }
    if (debrief_mouse.status === PsychoJS.Status.STARTED) {  // only update if started and not finished!
      _mouseButtons = debrief_mouse.getPressed();
      if (!_mouseButtons.every( (e,i,) => (e == prevButtonState[i]) )) { // button state changed?
        prevButtonState = _mouseButtons;
        if (_mouseButtons.reduce( (e, acc) => (e+acc) ) > 0) { // state changed to a new click
          // abort routine on response
          continueRoutine = false;
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


function DEBRIEFRoutineEnd() {
  return async function () {
    //------Ending Routine 'DEBRIEF'-------
    for (const thisComponent of DEBRIEFComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // store data for psychoJS.experiment (ExperimentHandler)
    _mouseXYs = debrief_mouse.getPos();
    _mouseButtons = debrief_mouse.getPressed();
    psychoJS.experiment.addData('debrief_mouse.x', _mouseXYs[0]);
    psychoJS.experiment.addData('debrief_mouse.y', _mouseXYs[1]);
    psychoJS.experiment.addData('debrief_mouse.leftButton', _mouseButtons[0]);
    psychoJS.experiment.addData('debrief_mouse.midButton', _mouseButtons[1]);
    psychoJS.experiment.addData('debrief_mouse.rightButton', _mouseButtons[2]);
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
