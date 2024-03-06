/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/class/Asset/Asset.ts":
/*!**********************************!*\
  !*** ./src/class/Asset/Asset.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Asset: () => (/* binding */ Asset)
/* harmony export */ });
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../game */ "./src/game.ts");

class Asset {
    pos;
    owner;
    constructor(pos, owner) {
        if (pos.x < 0 || pos.x >= _game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE || pos.y < 0 || pos.y >= _game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE) {
            throw new Error(`pos.x, pox.y must be in 0 <= a < FIELD_SIZE`);
        }
        this.pos = pos;
        this.owner = owner;
    }
}


/***/ }),

/***/ "./src/class/Asset/House.ts":
/*!**********************************!*\
  !*** ./src/class/Asset/House.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   House: () => (/* binding */ House)
/* harmony export */ });
/* harmony import */ var _Asset__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Asset */ "./src/class/Asset/Asset.ts");

class House extends _Asset__WEBPACK_IMPORTED_MODULE_0__.Asset {
    className;
    constructor(pos, owner) {
        super(pos, owner);
        this.className = "normal-house";
    }
}


/***/ }),

/***/ "./src/class/Human/Farmer.ts":
/*!***********************************!*\
  !*** ./src/class/Human/Farmer.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Farmer: () => (/* binding */ Farmer)
/* harmony export */ });
/* harmony import */ var _Human__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Human */ "./src/class/Human/Human.ts");
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../game */ "./src/game.ts");
/* harmony import */ var _Task_Task__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Task/Task */ "./src/class/Task/Task.ts");



class Farmer extends _Human__WEBPACK_IMPORTED_MODULE_0__.Human {
    /**
     * 1単位時間過ごす
     */
    spendTime() {
        // タスクを完了している場合、次のタスクを決める
        if (!this.task) {
            this.determineTask();
        }
        // タスクに従って行動する
        switch (this.task?.what) {
            case 'sleep':
                _Task_Task__WEBPACK_IMPORTED_MODULE_2__.Task.handleSleep(this);
                break;
            case 'walking':
                _Task_Task__WEBPACK_IMPORTED_MODULE_2__.Task.handleWalking(this);
                break;
        }
        // TODO : hpを更新する
    }
    /**
     * ランダムにタスクを決める
     */
    determineTask() {
        // TODO タスクの数を増やす
        // TODO タスクを現在のパラメータに従って決めるように変更
        if (16 < _game__WEBPACK_IMPORTED_MODULE_1__.gameState.time.h) {
            // 寝る
            console.log("眠ります");
            this.task = { what: 'sleep', where: this.homePos };
        }
        else {
            // 散歩する
            console.log("(5, 5)へ向かいます");
            this.task = { what: 'walking', where: { x: 5, y: 5 } };
        }
    }
    constructor(name = `Human${_Human__WEBPACK_IMPORTED_MODULE_0__.Human.humanNum}`, homePos = { x: 0, y: 0 }, hp = 100, color = "#FF0000", character = { wisdom: 0.5 }, isSelected = false) {
        super(name, homePos, hp, "farmer", color, character, isSelected);
    }
}


/***/ }),

/***/ "./src/class/Human/Human.ts":
/*!**********************************!*\
  !*** ./src/class/Human/Human.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Human: () => (/* binding */ Human)
/* harmony export */ });
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../game */ "./src/game.ts");

class Human {
    static humanNum = 1;
    name;
    _pos;
    homePos;
    hp;
    job;
    color;
    character;
    isSelected;
    task;
    get pos() {
        return this._pos;
    }
    set pos(newPos) {
        if (newPos.x < 0 || _game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE <= newPos.x
            || newPos.y < 0 || _game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE <= newPos.y) {
            throw new Error('Position must be 0 <= x < FIELD_SIZE');
        }
        this._pos = newPos;
    }
    /**
     * 目的地に向かって1マス進む
     * @param dest 目的地
     */
    headToDest(dest) {
        // 現在の座標から目的地の座標までの最短経路をdijkstraで求める
        const d = Array.from({ length: V }).map(n => INF);
        const used = Array.from({ length: V }).map(n => false);
        d[_game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE * this.pos.y + this.pos.x] = 0;
        // 最短経路の直前の頂点
        const prevPos = Array.from({ length: V }).map(n => ({ x: -1, y: -1 }));
        while (true) {
            let v = -1;
            for (let u = 0; u < V; u++) {
                if (!used[u] && (v === -1 || d[u] < d[v]))
                    v = u;
            }
            if (v === -1)
                break;
            used[v] = true;
            for (let u = 0; u < V; u++) {
                if (d[u] > d[v] + cost[v][u]) {
                    d[u] = Math.min(d[u], d[v] + cost[v][u]);
                    prevPos[u] = { x: v % _game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE, y: Math.floor(v / _game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE) };
                }
            }
        }
        // destから現在地curPosへの最短経路を求める
        const destToCurPosPath = [];
        let t = dest;
        for (; !(t.x === -1 && t.y === -1); t = prevPos[_game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE * t.y + t.x]) {
            destToCurPosPath.push(t);
        }
        this.pos = destToCurPosPath[destToCurPosPath.length - 2];
    }
    constructor(name = `Human${Human.humanNum}`, homePos = { x: 0, y: 0 }, hp = 100, job = "farmer", color = "#FF0000", character = { wisdom: 0.5 }, isSelected = false) {
        if (homePos.x < 0 || _game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE <= homePos.x
            || homePos.y < 0 || _game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE <= homePos.y) {
            throw new Error('Position must be 0 <= x < FIELD_SIZE');
        }
        Human.humanNum++;
        this.name = name;
        this.homePos = homePos;
        this._pos = homePos;
        this.hp = hp;
        this.job = job;
        this.color = color;
        this.character = character;
        this.isSelected = isSelected;
        this.task = null;
    }
}
/**
 * dijkstraに必要な変数
 */
const INF = 100000;
const V = _game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE * _game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE;
// 隣接行列
const cost = Array.from({ length: V })
    .map(n => Array.from({ length: V }).map(n => INF));
for (let y = 0; y < _game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE; y++) {
    for (let x = 0; x < _game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE; x++) {
        if (y == 0 && x == 0) {
            // 左上の隅
            cost[_game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE * y + x][_game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE * y + (x + 1)] = 1;
            cost[_game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE * y + x][_game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE * (y + 1) + x] = 1;
        }
        else if (y == 0 && x == _game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE - 1) {
            // 右上の隅
            cost[_game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE * y + x][_game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE * y + (x - 1)] = 1;
            cost[_game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE * y + x][_game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE * (y + 1) + x] = 1;
        }
        else if (y == _game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE - 1 && x == 0) {
            // 左下の隅
            cost[_game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE * y + x][_game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE * (y - 1) + x] = 1;
            cost[_game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE * y + x][_game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE * y + (x + 1)] = 1;
        }
        else if (y == _game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE - 1 && x == _game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE - 1) {
            // 右下の隅
            cost[_game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE * y + x][_game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE * (y - 1) + x] = 1;
            cost[_game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE * y + x][_game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE * y + (x - 1)] = 1;
        }
        else if (y == 0) {
            // 上辺
            cost[_game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE * y + x][_game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE * y + (x - 1)] = 1; // ←
            cost[_game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE * y + x][_game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE * (y + 1) + x] = 1; // ↓
            cost[_game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE * y + x][_game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE * y + (x + 1)] = 1; // →
        }
        else if (x == 0) {
            // 左辺
            cost[_game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE * y + x][_game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE * (y - 1) + x] = 1; // ↑
            cost[_game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE * y + x][_game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE * y + (x + 1)] = 1; // →
            cost[_game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE * y + x][_game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE * (y + 1) + x] = 1; // ↓
        }
        else if (x == _game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE - 1) {
            // 右辺
            cost[_game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE * y + x][_game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE * (y - 1) + x] = 1; // ↑
            cost[_game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE * y + x][_game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE * y + (x - 1)] = 1; // ←
            cost[_game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE * y + x][_game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE * (y + 1) + x] = 1; // ↓
        }
        else if (y == _game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE - 1) {
            // 下辺
            cost[_game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE * y + x][_game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE * y + (x - 1)] = 1; // ←
            cost[_game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE * y + x][_game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE * (y - 1) + x] = 1; // ↑
            cost[_game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE * y + x][_game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE * y + (x + 1)] = 1; // →
        }
        else {
            cost[_game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE * y + x][_game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE * (y - 1) + x] = 1; // ↑
            cost[_game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE * y + x][_game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE * y + (x + 1)] = 1; // →
            cost[_game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE * y + x][_game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE * (y + 1) + x] = 1; // ↓
            cost[_game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE * y + x][_game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE * y + (x - 1)] = 1; // ←
        }
    }
}


/***/ }),

/***/ "./src/class/Human/Merchant.ts":
/*!*************************************!*\
  !*** ./src/class/Human/Merchant.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Merchant: () => (/* binding */ Merchant)
/* harmony export */ });
/* harmony import */ var _Human__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Human */ "./src/class/Human/Human.ts");
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../game */ "./src/game.ts");
/* harmony import */ var _Task_Task__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Task/Task */ "./src/class/Task/Task.ts");



class Merchant extends _Human__WEBPACK_IMPORTED_MODULE_0__.Human {
    /**
     * 1単位時間過ごす
     */
    spendTime() {
        // タスクを完了している場合、次のタスクを決める
        if (!this.task) {
            this.determineTask();
        }
        // タスクに従って行動する
        switch (this.task?.what) {
            case 'sleep':
                _Task_Task__WEBPACK_IMPORTED_MODULE_2__.Task.handleSleep(this);
                break;
            case 'walking':
                _Task_Task__WEBPACK_IMPORTED_MODULE_2__.Task.handleWalking(this);
                break;
        }
        // TODO : hpを更新する
    }
    /**
     * ランダムにタスクを決める
     */
    determineTask() {
        // TODO タスクの数を増やす
        // TODO タスクを現在のパラメータに従って決めるように変更
        if (16 < _game__WEBPACK_IMPORTED_MODULE_1__.gameState.time.h) {
            // 寝る
            console.log("眠ります");
            this.task = { what: 'sleep', where: this.homePos };
        }
        else {
            // 散歩する
            console.log("(5, 5)へ向かいます");
            this.task = { what: 'walking', where: { x: 5, y: 5 } };
        }
    }
    constructor(name = `Human${_Human__WEBPACK_IMPORTED_MODULE_0__.Human.humanNum}`, homePos = { x: 0, y: 0 }, hp = 100, color = "#FF0000", character = { wisdom: 0.5 }, isSelected = false) {
        super(name, homePos, hp, "merchant", color, character, isSelected);
    }
}


/***/ }),

/***/ "./src/class/Task/Task.ts":
/*!********************************!*\
  !*** ./src/class/Task/Task.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Task: () => (/* binding */ Task)
/* harmony export */ });
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../game */ "./src/game.ts");

// TODO：Taskを抽象クラスにして、個別タスククラスを作成する
class Task {
    what;
    where;
    static handleSleep(human) {
        if (5 < _game__WEBPACK_IMPORTED_MODULE_0__.gameState.time.h && _game__WEBPACK_IMPORTED_MODULE_0__.gameState.time.h < 16) {
            // 朝
            if (6 < Math.floor(Math.random() * 10))
                // 一定確率で起きる
                human.task = null;
        }
        else {
            // 夜
            if (human.pos.x === human.homePos.x && human.pos.y === human.homePos.y) {
                // 家にいれば寝たまま何もしない
                return;
            }
            else {
                // 出先なので、家に帰る
                human.headToDest(human.homePos);
            }
        }
    }
    static handleWalking(human) {
        if (!human.task)
            return;
        if (human.pos.x === human.task.where.x && human.pos.y === human.task.where.y) {
            // 目的地に到着したのでタスクを終了
            human.task = null;
        }
        else {
            // 目的地に向かう
            human.headToDest(human.task.where);
        }
    }
}


/***/ }),

/***/ "./src/function/draw.ts":
/*!******************************!*\
  !*** ./src/function/draw.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createBalloon: () => (/* binding */ createBalloon),
/* harmony export */   drawField: () => (/* binding */ drawField),
/* harmony export */   drawTime: () => (/* binding */ drawTime)
/* harmony export */ });
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../game */ "./src/game.ts");
/* harmony import */ var _class_Asset_House__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../class/Asset/House */ "./src/class/Asset/House.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./src/function/utils.ts");



/**
 * gameStateに従って盤面を更新する
 * 選択中の人の上には吹き出しを表示する
 */
function drawField() {
    // 盤面をリセットする
    resetField();
    // 人を描画
    _game__WEBPACK_IMPORTED_MODULE_0__.gameState.humans.forEach((human) => {
        const { x, y } = human.pos;
        const squareEl = document.getElementById("square-" + (_game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE * y + x));
        if (!squareEl) {
            throw new Error(`square-${_game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE * y + x} was not found.`);
        }
        // マスの文字列を更新
        squareEl.textContent = "○";
        // 人が選択中ならマスの上に吹き出しを表示する
        if (human.isSelected) {
            const balloonEl = createBalloon(human);
            squareEl.appendChild(balloonEl);
        }
    });
    // アセットを描画
    _game__WEBPACK_IMPORTED_MODULE_0__.gameState.assets.forEach((asset) => {
        const { x, y } = asset.pos;
        const squareEl = document.getElementById("square-" + (_game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE * y + x));
        if (!squareEl) {
            throw new Error(`square-${_game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE * y + x} was not found.`);
        }
        if (asset instanceof _class_Asset_House__WEBPACK_IMPORTED_MODULE_1__.House) {
            // クラスをリセットする
            squareEl.classList.remove(asset.className);
            // 適切な画像表示のため、状況に応じたクラスを付与する
            // TODO：時間や状況に応じたclassNameを再検討する
            // TODO：寝ているときはnight-houseにする
            if (asset.owner.pos.x === x && asset.owner.pos.y === y) {
                // 所有者が家にいる場合
                if ((0,_utils__WEBPACK_IMPORTED_MODULE_2__.isNight)()) {
                    asset.className = 'evening-house';
                }
                else {
                    asset.className = 'normal-house';
                }
                // 画像を表示するためにマスの文字列を消す
                squareEl.textContent = "";
            }
            else {
                // 所有者が家にいない場合
                if ((0,_utils__WEBPACK_IMPORTED_MODULE_2__.isNight)()) {
                    asset.className = 'night-house';
                }
                else {
                    asset.className = 'normal-house';
                }
            }
            squareEl.classList.add(asset.className);
            const imgEl = document.createElement("img");
            squareEl.appendChild(imgEl);
        }
    });
}
/**
 * 盤面をリセットする（すべてのマスを空文字列にする）
 */
function resetField() {
    for (let i = 0; i < _game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE; i++) {
        for (let j = 0; j < _game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE; j++) {
            const squareEl = document.getElementById("square-" + (_game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE * i + j));
            if (!squareEl)
                throw new Error(`square-${_game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE * i + j} was not found.`);
            // 各マスの文字列をから文字列にリセット
            squareEl.textContent = "";
        }
    }
}
/**
 * 表示されている時刻を更新する
 */
function drawTime() {
    const timeEl = document.getElementById("timeLabel");
    if (!timeEl) {
        throw new Error(`timeLabel was not found.`);
    }
    timeEl.textContent = `現在の時刻 ${_game__WEBPACK_IMPORTED_MODULE_0__.gameState.time.h} : ${_game__WEBPACK_IMPORTED_MODULE_0__.gameState.time.m}`;
}
/**
 * 人の情報を表示する吹き出し要素を返す
 * @param human 情報を表示する対象
 * @returns 吹き出しの<div>要素
 */
function createBalloon(human) {
    const divEl = document.createElement("div");
    divEl.className = "above-square";
    const balloonEl = document.createElement("div");
    balloonEl.className = "balloon2";
    const messageEl = document.createElement("p");
    messageEl.innerText =
        `名前：${human.name}
    HP：${human.hp}
    役職：${human.job}
    性格：${human.character}`;
    balloonEl.appendChild(messageEl);
    divEl.appendChild(balloonEl);
    return divEl;
}


/***/ }),

/***/ "./src/function/handleAction.ts":
/*!**************************************!*\
  !*** ./src/function/handleAction.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   handleAddHumanClick: () => (/* binding */ handleAddHumanClick),
/* harmony export */   handleClickSquare: () => (/* binding */ handleClickSquare)
/* harmony export */ });
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../game */ "./src/game.ts");
/* harmony import */ var _class_Human_Farmer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../class/Human/Farmer */ "./src/class/Human/Farmer.ts");
/* harmony import */ var _class_Human_Merchant__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../class/Human/Merchant */ "./src/class/Human/Merchant.ts");
/* harmony import */ var _class_Asset_House__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../class/Asset/House */ "./src/class/Asset/House.ts");
/* harmony import */ var _draw__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./draw */ "./src/function/draw.ts");
/* harmony import */ var _handleMode__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./handleMode */ "./src/function/handleMode.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils */ "./src/function/utils.ts");







/**
 * Squareがクリックされたときに呼ばれ、現在のモードに従って処理を行う
 */
function handleClickSquare(x, y) {
    switch (_game__WEBPACK_IMPORTED_MODULE_0__.gameState.mode) {
        case 'neutral':
            console.log(_game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE * y + x);
            break;
        case 'addHuman':
            // 指定の場所に人を追加する
            let newHuman;
            if (_game__WEBPACK_IMPORTED_MODULE_0__.gameState.addHumanType === "farmer") {
                newHuman = new _class_Human_Farmer__WEBPACK_IMPORTED_MODULE_1__.Farmer();
            }
            else if (_game__WEBPACK_IMPORTED_MODULE_0__.gameState.addHumanType === "merchant") {
                newHuman = new _class_Human_Merchant__WEBPACK_IMPORTED_MODULE_2__.Merchant();
            }
            else {
                newHuman = new _class_Human_Farmer__WEBPACK_IMPORTED_MODULE_1__.Farmer();
            }
            newHuman.homePos = { x, y };
            newHuman.pos = { x, y };
            addHuman(newHuman);
            // 盤面を更新する
            (0,_draw__WEBPACK_IMPORTED_MODULE_4__.drawField)();
            // ヒト追加モードを抜ける
            (0,_handleMode__WEBPACK_IMPORTED_MODULE_5__.exitAddHumanMode)();
            break;
        case 'selectHuman':
            const humans = (0,_utils__WEBPACK_IMPORTED_MODULE_6__.getHumansFromPos)({ x, y });
            // 指定の場所に人がいなければ何もしない
            if (humans.length == 0) {
                return;
            }
            // 指定の場所の人の選択状態を反転させる
            // （複数人の場合はリストの先頭）
            humans[0].isSelected = !humans[0].isSelected;
            // 盤面を更新する
            (0,_draw__WEBPACK_IMPORTED_MODULE_4__.drawField)();
            // 選択モードを抜ける
            (0,_handleMode__WEBPACK_IMPORTED_MODULE_5__.exitSelectHumanMode)();
            break;
    }
}
/**
 * gameStateに人と家を追加
 */
function addHuman(newHuman) {
    const { x, y } = newHuman.pos;
    // 人を追加
    _game__WEBPACK_IMPORTED_MODULE_0__.gameState.humans.push(newHuman);
    // 家を追加
    _game__WEBPACK_IMPORTED_MODULE_0__.gameState.assets.push(new _class_Asset_House__WEBPACK_IMPORTED_MODULE_3__.House({ x, y }, newHuman));
}
function handleAddHumanClick() {
    console.log("hoge");
    const radioInputs = document.getElementsByName("typeForm");
    radioInputs.forEach((radio) => {
        if (radio.checked) {
            _game__WEBPACK_IMPORTED_MODULE_0__.gameState.addHumanType = radio.value;
        }
    });
    console.log(_game__WEBPACK_IMPORTED_MODULE_0__.gameState.addHumanType);
    (0,_handleMode__WEBPACK_IMPORTED_MODULE_5__.enterAddHumanMode)();
}


/***/ }),

/***/ "./src/function/handleMode.ts":
/*!************************************!*\
  !*** ./src/function/handleMode.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   enterAddHumanMode: () => (/* binding */ enterAddHumanMode),
/* harmony export */   enterSelectHumanMode: () => (/* binding */ enterSelectHumanMode),
/* harmony export */   exitAddHumanMode: () => (/* binding */ exitAddHumanMode),
/* harmony export */   exitSelectHumanMode: () => (/* binding */ exitSelectHumanMode)
/* harmony export */ });
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../game */ "./src/game.ts");

/**
 * 位置の選択モードに遷移し、Square上でホバーすると色が変わるようになる
 */
function enterAddHumanMode() {
    for (let i = 0; i < _game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE; i++) {
        for (let j = 0; j < _game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE; j++) {
            const squareEl = document.getElementById("square-" + (_game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE * i + j));
            if (!squareEl)
                throw new Error(`square-${_game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE * i + j} was not found.`);
            // ホバー時に色が変わるようにクラスを追加
            squareEl.classList.add('human-add-mode');
            // 選択モードに遷移する
            _game__WEBPACK_IMPORTED_MODULE_0__.gameState.mode = 'addHuman';
        }
    }
}
/**
 * ニュートラルモードに遷移し、Square上でホバーしても色が変わらないようにする
 */
function exitAddHumanMode() {
    for (let i = 0; i < _game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE; i++) {
        for (let j = 0; j < _game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE; j++) {
            const squareEl = document.getElementById("square-" + (_game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE * i + j));
            if (!squareEl)
                throw new Error(`square-${_game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE * i + j} was not found.`);
            /* ホバー時に色が変わるクラスを除去 */
            squareEl.classList.remove('human-add-mode');
            /* ニュートラルモードに遷移する */
            _game__WEBPACK_IMPORTED_MODULE_0__.gameState.mode = 'neutral';
        }
    }
}
/**
 * 吹き出しを表示する人を選択するモードに遷移する
 */
function enterSelectHumanMode() {
    _game__WEBPACK_IMPORTED_MODULE_0__.gameState.mode = 'selectHuman';
}
/**
 * ニュートラルモードに遷移する
 */
function exitSelectHumanMode() {
    _game__WEBPACK_IMPORTED_MODULE_0__.gameState.mode = 'neutral';
}


/***/ }),

/***/ "./src/function/utils.ts":
/*!*******************************!*\
  !*** ./src/function/utils.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createRandomPos: () => (/* binding */ createRandomPos),
/* harmony export */   getHumansFromPos: () => (/* binding */ getHumansFromPos),
/* harmony export */   isNight: () => (/* binding */ isNight)
/* harmony export */ });
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../game */ "./src/game.ts");


/**
 * ある座標にいる人の検索し、配列にして返す
 * @param pos 座標
 * @returns その座標にいる人の配列
 */
function getHumansFromPos(pos) {
    const retHumans = [];
    _game__WEBPACK_IMPORTED_MODULE_0__.gameState.humans.forEach((human) => {
        if (human.pos.x == pos.x && human.pos.y == pos.y) {
            retHumans.push(human);
        }
    });
    return retHumans;
}
/**
 * gameState.timeに従って夜か否かを返す
 * @returns 夜であるか否か
 */
function isNight() {
    if (_game__WEBPACK_IMPORTED_MODULE_0__.gameState.time.h >= 18 || _game__WEBPACK_IMPORTED_MODULE_0__.gameState.time.h <= 6) {
        return true;
    }
    else {
        return false;
    }
}
/**
 * ランダムな位置を生成し、返す
 * @returns [x, y]
 */
function createRandomPos() {
    const x = Math.floor(Math.random() * _game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE);
    const y = Math.floor(Math.random() * _game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE);
    return { x, y };
}


/***/ }),

/***/ "./src/game.ts":
/*!*********************!*\
  !*** ./src/game.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FIELD_SIZE: () => (/* binding */ FIELD_SIZE),
/* harmony export */   gameState: () => (/* binding */ gameState)
/* harmony export */ });
/* 盤面のサイズ */
const FIELD_SIZE = 8;
let gameState = {
    time: { d: 1, h: 14, m: 30 },
    mode: "neutral",
    addHumanType: "farmer",
    humans: [],
    assets: [],
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   switchInterval: () => (/* binding */ switchInterval)
/* harmony export */ });
/* harmony import */ var _function_draw__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./function/draw */ "./src/function/draw.ts");
/* harmony import */ var _function_handleAction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./function/handleAction */ "./src/function/handleAction.ts");
/* harmony import */ var _function_handleMode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./function/handleMode */ "./src/function/handleMode.ts");
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./game */ "./src/game.ts");




let intervalId;
let isLooping;
// ページが読み込まれたときの処理
document.addEventListener("DOMContentLoaded", (e) => {
    // 1秒ごとにintervalFuncを実行するように設定
    intervalId = setInterval(intervalFunc, 1000);
    isLooping = true;
    // イベントハンドラーを登録
    document.getElementById("selectHumanButton")?.addEventListener("click", _function_handleMode__WEBPACK_IMPORTED_MODULE_2__.enterSelectHumanMode);
    document.getElementById("switchIntervalButton")?.addEventListener("click", switchInterval);
    document.getElementById("addHumanButton")?.addEventListener("click", _function_handleAction__WEBPACK_IMPORTED_MODULE_1__.handleAddHumanClick);
    // 描画
    createField();
    (0,_function_draw__WEBPACK_IMPORTED_MODULE_0__.drawField)();
    (0,_function_draw__WEBPACK_IMPORTED_MODULE_0__.drawTime)();
});
/**
 * 1単位時間ごとに呼ばれる関数
 */
function intervalFunc() {
    // 1単位時間ごとに盤面を更新する
    _game__WEBPACK_IMPORTED_MODULE_3__.gameState.humans.forEach((human) => human.spendTime());
    // 時間を10分進める
    _game__WEBPACK_IMPORTED_MODULE_3__.gameState.time.h = (_game__WEBPACK_IMPORTED_MODULE_3__.gameState.time.h + 1) % 24;
    // 盤面などを更新
    (0,_function_draw__WEBPACK_IMPORTED_MODULE_0__.drawField)();
    (0,_function_draw__WEBPACK_IMPORTED_MODULE_0__.drawTime)();
}
/**
 * インターバルのオン/オフを切り替える
 */
function switchInterval() {
    if (isLooping) {
        clearInterval(intervalId);
        isLooping = false;
    }
    else {
        intervalId = setInterval(intervalFunc, 1000);
        isLooping = true;
    }
}
/**
 * FIELD_SIZE * FIELD_SIZE の盤面を作成する
 */
function createField() {
    const fieldEl = document.getElementById("field");
    if (!fieldEl) {
        throw new Error('<div id="field"></div> is null.');
    }
    for (let i = 0; i < _game__WEBPACK_IMPORTED_MODULE_3__.FIELD_SIZE; i++) {
        // 行の要素を作成
        const lineEl = document.createElement("div");
        lineEl.className = "board-row";
        for (let j = 0; j < _game__WEBPACK_IMPORTED_MODULE_3__.FIELD_SIZE; j++) {
            // 各行の列の要素を作成
            const squareEl = document.createElement("button");
            squareEl.className = "square";
            squareEl.id = "square-" + (_game__WEBPACK_IMPORTED_MODULE_3__.FIELD_SIZE * i + j);
            squareEl.onclick = () => (0,_function_handleAction__WEBPACK_IMPORTED_MODULE_1__.handleClickSquare)(j, i);
            // 行の子要素にする
            lineEl.appendChild(squareEl);
        }
        // 行の要素を子要素にする
        fieldEl.appendChild(lineEl);
    }
}

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDLDZDQUFVLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLDZDQUFVLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZELElBQUksQ0FBQyw2Q0FBVSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyw2Q0FBVSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMzRCxDQUFDO2FBQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSw2Q0FBVSxHQUFHLENBQUMsRUFBRSxDQUFDO1lBQ3ZDLE9BQU87WUFDUCxJQUFJLENBQUMsNkNBQVUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsNkNBQVUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDdkQsSUFBSSxDQUFDLDZDQUFVLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLDZDQUFVLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzNELENBQUM7YUFBTSxJQUFJLENBQUMsSUFBSSw2Q0FBVSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDdkMsT0FBTztZQUNQLElBQUksQ0FBQyw2Q0FBVSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyw2Q0FBVSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN2RCxJQUFJLENBQUMsNkNBQVUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsNkNBQVUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDM0QsQ0FBQzthQUFNLElBQUksQ0FBQyxJQUFJLDZDQUFVLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSw2Q0FBVSxHQUFHLENBQUMsRUFBRSxDQUFDO1lBQ3BELE9BQU87WUFDUCxJQUFJLENBQUMsNkNBQVUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsNkNBQVUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDdkQsSUFBSSxDQUFDLDZDQUFVLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLDZDQUFVLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzNELENBQUM7YUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUNoQixLQUFLO1lBQ0wsSUFBSSxDQUFDLDZDQUFVLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLDZDQUFVLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSTtZQUM1RCxJQUFJLENBQUMsNkNBQVUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsNkNBQVUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJO1lBQzVELElBQUksQ0FBQyw2Q0FBVSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyw2Q0FBVSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUk7UUFDaEUsQ0FBQzthQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO1lBQ2hCLEtBQUs7WUFDTCxJQUFJLENBQUMsNkNBQVUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsNkNBQVUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJO1lBQzVELElBQUksQ0FBQyw2Q0FBVSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyw2Q0FBVSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUk7WUFDNUQsSUFBSSxDQUFDLDZDQUFVLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLDZDQUFVLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSTtRQUNoRSxDQUFDO2FBQU0sSUFBSSxDQUFDLElBQUksNkNBQVUsR0FBRyxDQUFDLEVBQUUsQ0FBQztZQUM3QixLQUFLO1lBQ0wsSUFBSSxDQUFDLDZDQUFVLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLDZDQUFVLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSTtZQUM1RCxJQUFJLENBQUMsNkNBQVUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsNkNBQVUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJO1lBQzVELElBQUksQ0FBQyw2Q0FBVSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyw2Q0FBVSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUk7UUFDaEUsQ0FBQzthQUFNLElBQUksQ0FBQyxJQUFJLDZDQUFVLEdBQUcsQ0FBQyxFQUFFLENBQUM7WUFDN0IsS0FBSztZQUNMLElBQUksQ0FBQyw2Q0FBVSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyw2Q0FBVSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUk7WUFDNUQsSUFBSSxDQUFDLDZDQUFVLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLDZDQUFVLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSTtZQUM1RCxJQUFJLENBQUMsNkNBQVUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsNkNBQVUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJO1FBQ2hFLENBQUM7YUFBTSxDQUFDO1lBQ0osSUFBSSxDQUFDLDZDQUFVLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLDZDQUFVLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSTtZQUM1RCxJQUFJLENBQUMsNkNBQVUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsNkNBQVUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJO1lBQzVELElBQUksQ0FBQyw2Q0FBVSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyw2Q0FBVSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUk7WUFDNUQsSUFBSSxDQUFDLDZDQUFVLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLDZDQUFVLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSTtRQUNoRSxDQUFDO0lBQ0wsQ0FBQztBQUNMLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3BLMEM7QUFDTTtBQUNiO0FBRTdCLE1BQU0sUUFBUyxT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LEdBQUcsNkNBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1FBQ2xDLFVBQVU7UUFDVixNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzdDLE1BQU0sQ0FBQyxTQUFTLEdBQUcsV0FBVyxDQUFDO1FBQy9CLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyw2Q0FBVSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDbEMsYUFBYTtZQUNiLE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDbEQsUUFBUSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7WUFDOUIsUUFBUSxDQUFDLEVBQUUsR0FBRyxTQUFTLEdBQUcsQ0FBQyw2Q0FBVSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUMvQyxRQUFRLENBQUMsT0FBTyxHQUFHLEdBQUcsRUFBRSxDQUFDLHlFQUFpQixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNqRCxXQUFXO1lBQ1gsTUFBTSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNqQyxDQUFDO1FBQ0QsY0FBYztRQUNkLE9BQU8sQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDaEMsQ0FBQztBQUNMLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tYXRyaXgtZ2FtZS8uL3NyYy9jbGFzcy9Bc3NldC9Bc3NldC50cyIsIndlYnBhY2s6Ly9tYXRyaXgtZ2FtZS8uL3NyYy9jbGFzcy9Bc3NldC9Ib3VzZS50cyIsIndlYnBhY2s6Ly9tYXRyaXgtZ2FtZS8uL3NyYy9jbGFzcy9IdW1hbi9GYXJtZXIudHMiLCJ3ZWJwYWNrOi8vbWF0cml4LWdhbWUvLi9zcmMvY2xhc3MvSHVtYW4vSHVtYW4udHMiLCJ3ZWJwYWNrOi8vbWF0cml4LWdhbWUvLi9zcmMvY2xhc3MvSHVtYW4vTWVyY2hhbnQudHMiLCJ3ZWJwYWNrOi8vbWF0cml4LWdhbWUvLi9zcmMvY2xhc3MvVGFzay9UYXNrLnRzIiwid2VicGFjazovL21hdHJpeC1nYW1lLy4vc3JjL2Z1bmN0aW9uL2RyYXcudHMiLCJ3ZWJwYWNrOi8vbWF0cml4LWdhbWUvLi9zcmMvZnVuY3Rpb24vaGFuZGxlQWN0aW9uLnRzIiwid2VicGFjazovL21hdHJpeC1nYW1lLy4vc3JjL2Z1bmN0aW9uL2hhbmRsZU1vZGUudHMiLCJ3ZWJwYWNrOi8vbWF0cml4LWdhbWUvLi9zcmMvZnVuY3Rpb24vdXRpbHMudHMiLCJ3ZWJwYWNrOi8vbWF0cml4LWdhbWUvLi9zcmMvZ2FtZS50cyIsIndlYnBhY2s6Ly9tYXRyaXgtZ2FtZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9tYXRyaXgtZ2FtZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbWF0cml4LWdhbWUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9tYXRyaXgtZ2FtZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL21hdHJpeC1nYW1lLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBvc2l0aW9uLCBGSUVMRF9TSVpFIH0gZnJvbSBcIi4uLy4uL2dhbWVcIjtcbmltcG9ydCB7IEh1bWFuIH0gZnJvbSBcIi4uL0h1bWFuL0h1bWFuXCI7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBc3NldCB7XG4gICAgcG9zOiBQb3NpdGlvbjtcbiAgICBvd25lcjogSHVtYW47XG5cbiAgICBjb25zdHJ1Y3Rvcihwb3M6IFBvc2l0aW9uLCBvd25lcjogSHVtYW4pIHtcbiAgICAgICAgaWYgKHBvcy54IDwgMCB8fCBwb3MueCA+PSBGSUVMRF9TSVpFIHx8IHBvcy55IDwgMCB8fCBwb3MueSA+PSBGSUVMRF9TSVpFKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYHBvcy54LCBwb3gueSBtdXN0IGJlIGluIDAgPD0gYSA8IEZJRUxEX1NJWkVgKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBvcyA9IHBvcztcbiAgICAgICAgdGhpcy5vd25lciA9IG93bmVyO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBBc3NldCB9IGZyb20gXCIuL0Fzc2V0XCI7XG5pbXBvcnQgeyBQb3NpdGlvbiB9IGZyb20gXCIuLi8uLi9nYW1lXCI7XG5pbXBvcnQgeyBIdW1hbiB9IGZyb20gXCIuLi9IdW1hbi9IdW1hblwiO1xuXG5leHBvcnQgY2xhc3MgSG91c2UgZXh0ZW5kcyBBc3NldCB7XG4gICAgY2xhc3NOYW1lOiBcIm5vcm1hbC1ob3VzZVwiIHwgXCJldmVuaW5nLWhvdXNlXCIgfCBcIm5pZ2h0LWhvdXNlXCIgfCBcInNsZWVwaW5nLWhvdXNlXCI7XG5cbiAgICBjb25zdHJ1Y3Rvcihwb3M6IFBvc2l0aW9uLCBvd25lcjogSHVtYW4pIHtcbiAgICAgICAgc3VwZXIocG9zLCBvd25lcik7XG4gICAgICAgIHRoaXMuY2xhc3NOYW1lID0gXCJub3JtYWwtaG91c2VcIjtcbiAgICB9XG59IiwiaW1wb3J0IHsgSHVtYW4sIENoYXJhY3RlciB9IGZyb20gXCIuL0h1bWFuXCI7XG5pbXBvcnQgeyBnYW1lU3RhdGUsIFBvc2l0aW9uIH0gZnJvbSBcIi4uLy4uL2dhbWVcIjtcbmltcG9ydCB7IFRhc2sgfSBmcm9tIFwiLi4vVGFzay9UYXNrXCI7XG5cbmV4cG9ydCBjbGFzcyBGYXJtZXIgZXh0ZW5kcyBIdW1hbiB7XG4gICAgLyoqXG4gICAgICogMeWNmOS9jeaZgumWk+mBjuOBlOOBmVxuICAgICAqL1xuICAgIHNwZW5kVGltZSgpOiB2b2lkIHtcbiAgICAgICAgLy8g44K/44K544Kv44KS5a6M5LqG44GX44Gm44GE44KL5aC05ZCI44CB5qyh44Gu44K/44K544Kv44KS5rG644KB44KLXG4gICAgICAgIGlmICghdGhpcy50YXNrKSB7XG4gICAgICAgICAgICB0aGlzLmRldGVybWluZVRhc2soKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIOOCv+OCueOCr+OBq+W+k+OBo+OBpuihjOWLleOBmeOCi1xuICAgICAgICBzd2l0Y2ggKHRoaXMudGFzaz8ud2hhdCkge1xuICAgICAgICAgICAgY2FzZSAnc2xlZXAnOlxuICAgICAgICAgICAgICAgIFRhc2suaGFuZGxlU2xlZXAodGhpcyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICd3YWxraW5nJzpcbiAgICAgICAgICAgICAgICBUYXNrLmhhbmRsZVdhbGtpbmcodGhpcyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUT0RPIDogaHDjgpLmm7TmlrDjgZnjgotcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDjg6njg7Pjg4Djg6Djgavjgr/jgrnjgq/jgpLmsbrjgoHjgotcbiAgICAgKi9cbiAgICBkZXRlcm1pbmVUYXNrKCk6IHZvaWQge1xuICAgICAgICAvLyBUT0RPIOOCv+OCueOCr+OBruaVsOOCkuWil+OChOOBmVxuICAgICAgICAvLyBUT0RPIOOCv+OCueOCr+OCkuePvuWcqOOBruODkeODqeODoeODvOOCv+OBq+W+k+OBo+OBpuaxuuOCgeOCi+OCiOOBhuOBq+WkieabtFxuICAgICAgICBpZiAoMTYgPCBnYW1lU3RhdGUudGltZS5oKSB7XG4gICAgICAgICAgICAvLyDlr53jgotcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi55yg44KK44G+44GZXCIpO1xuICAgICAgICAgICAgdGhpcy50YXNrID0geyB3aGF0OiAnc2xlZXAnLCB3aGVyZTogdGhpcy5ob21lUG9zIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIOaVo+atqeOBmeOCi1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCIoNSwgNSnjgbjlkJHjgYvjgYTjgb7jgZlcIik7XG4gICAgICAgICAgICB0aGlzLnRhc2sgPSB7IHdoYXQ6ICd3YWxraW5nJywgd2hlcmU6IHsgeDogNSwgeTogNSB9IH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBuYW1lOiBzdHJpbmcgPSBgSHVtYW4ke0h1bWFuLmh1bWFuTnVtfWAsXG4gICAgICAgIGhvbWVQb3M6IFBvc2l0aW9uID0geyB4OiAwLCB5OiAwIH0sXG4gICAgICAgIGhwOiBudW1iZXIgPSAxMDAsXG4gICAgICAgIGNvbG9yOiBzdHJpbmcgPSBcIiNGRjAwMDBcIixcbiAgICAgICAgY2hhcmFjdGVyOiBDaGFyYWN0ZXIgPSB7IHdpc2RvbTogMC41IH0sXG4gICAgICAgIGlzU2VsZWN0ZWQ6IGJvb2xlYW4gPSBmYWxzZSxcbiAgICApIHtcbiAgICAgICAgc3VwZXIobmFtZSwgaG9tZVBvcywgaHAsIFwiZmFybWVyXCIsIGNvbG9yLCBjaGFyYWN0ZXIsIGlzU2VsZWN0ZWQpO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBQb3NpdGlvbiB9IGZyb20gXCIuLi8uLi9nYW1lXCI7XG5pbXBvcnQgeyBUYXNrIH0gZnJvbSBcIi4uL1Rhc2svVGFza1wiO1xuaW1wb3J0IHsgRklFTERfU0laRSB9IGZyb20gXCIuLi8uLi9nYW1lXCI7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBIdW1hbiB7XG4gICAgc3RhdGljIGh1bWFuTnVtID0gMTtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBfcG9zOiBQb3NpdGlvbjtcbiAgICBob21lUG9zOiBQb3NpdGlvbjtcbiAgICBocDogbnVtYmVyO1xuICAgIGpvYjogSm9iO1xuICAgIGNvbG9yOiBzdHJpbmc7XG4gICAgY2hhcmFjdGVyOiBDaGFyYWN0ZXI7XG4gICAgaXNTZWxlY3RlZDogYm9vbGVhbjtcbiAgICB0YXNrOiBUYXNrIHwgbnVsbDtcblxuICAgIGdldCBwb3MoKTogUG9zaXRpb24ge1xuICAgICAgICByZXR1cm4gdGhpcy5fcG9zO1xuICAgIH1cblxuICAgIHNldCBwb3MobmV3UG9zOiBQb3NpdGlvbikge1xuICAgICAgICBpZiAobmV3UG9zLnggPCAwIHx8IEZJRUxEX1NJWkUgPD0gbmV3UG9zLnhcbiAgICAgICAgICAgIHx8IG5ld1Bvcy55IDwgMCB8fCBGSUVMRF9TSVpFIDw9IG5ld1Bvcy55KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Bvc2l0aW9uIG11c3QgYmUgMCA8PSB4IDwgRklFTERfU0laRScpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3BvcyA9IG5ld1BvcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAx5Y2Y5L2N5pmC6ZaT6YGO44GU44GZXG4gICAgICogTU9ESUZJRVMgOiB0aGlzLmhwLCB0aGlzLnRhc2tcbiAgICAgKi9cbiAgICBhYnN0cmFjdCBzcGVuZFRpbWUoKTogdm9pZDtcblxuICAgIC8qKlxuICAgICAqIOODqeODs+ODgOODoOOBq+OCv+OCueOCr+OCkuaxuuOCgeOCi1xuICAgICAqL1xuICAgIGFic3RyYWN0IGRldGVybWluZVRhc2soKTogdm9pZDtcblxuICAgIC8qKlxuICAgICAqIOebrueahOWcsOOBq+WQkeOBi+OBo+OBpjHjg57jgrnpgLLjgoBcbiAgICAgKiBAcGFyYW0gZGVzdCDnm67nmoTlnLBcbiAgICAgKi9cbiAgICBoZWFkVG9EZXN0KGRlc3Q6IFBvc2l0aW9uKTogdm9pZCB7XG4gICAgICAgIC8vIOePvuWcqOOBruW6p+aomeOBi+OCieebrueahOWcsOOBruW6p+aomeOBvuOBp+OBruacgOefree1jOi3r+OCkmRpamtzdHJh44Gn5rGC44KB44KLXG4gICAgICAgIGNvbnN0IGQ6IG51bWJlcltdID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogViB9KS5tYXAobiA9PiBJTkYpO1xuICAgICAgICBjb25zdCB1c2VkOiBib29sZWFuW10gPSBBcnJheS5mcm9tKHsgbGVuZ3RoOiBWIH0pLm1hcChuID0+IGZhbHNlKTtcbiAgICAgICAgZFtGSUVMRF9TSVpFICogdGhpcy5wb3MueSArIHRoaXMucG9zLnhdID0gMDtcbiAgICAgICAgLy8g5pyA55+t57WM6Lev44Gu55u05YmN44Gu6aCC54K5XG4gICAgICAgIGNvbnN0IHByZXZQb3M6IFBvc2l0aW9uW10gPSBBcnJheS5mcm9tKHsgbGVuZ3RoOiBWIH0pLm1hcChuID0+ICh7IHg6IC0xLCB5OiAtMSB9KSk7XG5cbiAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICAgIGxldCB2ID0gLTE7XG5cbiAgICAgICAgICAgIGZvciAobGV0IHUgPSAwOyB1IDwgVjsgdSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF1c2VkW3VdICYmICh2ID09PSAtMSB8fCBkW3VdIDwgZFt2XSkpIHYgPSB1O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodiA9PT0gLTEpIGJyZWFrO1xuICAgICAgICAgICAgdXNlZFt2XSA9IHRydWU7XG5cbiAgICAgICAgICAgIGZvciAobGV0IHUgPSAwOyB1IDwgVjsgdSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRbdV0gPiBkW3ZdICsgY29zdFt2XVt1XSkge1xuICAgICAgICAgICAgICAgICAgICBkW3VdID0gTWF0aC5taW4oZFt1XSwgZFt2XSArIGNvc3Rbdl1bdV0pO1xuICAgICAgICAgICAgICAgICAgICBwcmV2UG9zW3VdID0geyB4OiB2ICUgRklFTERfU0laRSwgeTogTWF0aC5mbG9vcih2IC8gRklFTERfU0laRSkgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBkZXN044GL44KJ54++5Zyo5ZywY3VyUG9z44G444Gu5pyA55+t57WM6Lev44KS5rGC44KB44KLXG4gICAgICAgIGNvbnN0IGRlc3RUb0N1clBvc1BhdGg6IFBvc2l0aW9uW10gPSBbXTtcbiAgICAgICAgbGV0IHQ6IFBvc2l0aW9uID0gZGVzdDtcbiAgICAgICAgZm9yICg7ICEodC54ID09PSAtMSAmJiB0LnkgPT09IC0xKTsgdCA9IHByZXZQb3NbRklFTERfU0laRSAqIHQueSArIHQueF0pIHtcbiAgICAgICAgICAgIGRlc3RUb0N1clBvc1BhdGgucHVzaCh0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucG9zID0gZGVzdFRvQ3VyUG9zUGF0aFtkZXN0VG9DdXJQb3NQYXRoLmxlbmd0aCAtIDJdO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBuYW1lOiBzdHJpbmcgPSBgSHVtYW4ke0h1bWFuLmh1bWFuTnVtfWAsXG4gICAgICAgIGhvbWVQb3M6IFBvc2l0aW9uID0geyB4OiAwLCB5OiAwIH0sXG4gICAgICAgIGhwOiBudW1iZXIgPSAxMDAsXG4gICAgICAgIGpvYjogSm9iID0gXCJmYXJtZXJcIixcbiAgICAgICAgY29sb3I6IHN0cmluZyA9IFwiI0ZGMDAwMFwiLFxuICAgICAgICBjaGFyYWN0ZXI6IENoYXJhY3RlciA9IHsgd2lzZG9tOiAwLjUgfSxcbiAgICAgICAgaXNTZWxlY3RlZDogYm9vbGVhbiA9IGZhbHNlLFxuICAgICkge1xuICAgICAgICBpZiAoaG9tZVBvcy54IDwgMCB8fCBGSUVMRF9TSVpFIDw9IGhvbWVQb3MueFxuICAgICAgICAgICAgfHwgaG9tZVBvcy55IDwgMCB8fCBGSUVMRF9TSVpFIDw9IGhvbWVQb3MueSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQb3NpdGlvbiBtdXN0IGJlIDAgPD0geCA8IEZJRUxEX1NJWkUnKTtcbiAgICAgICAgfVxuICAgICAgICBIdW1hbi5odW1hbk51bSsrO1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLmhvbWVQb3MgPSBob21lUG9zO1xuICAgICAgICB0aGlzLl9wb3MgPSBob21lUG9zO1xuICAgICAgICB0aGlzLmhwID0gaHA7XG4gICAgICAgIHRoaXMuam9iID0gam9iO1xuICAgICAgICB0aGlzLmNvbG9yID0gY29sb3I7XG4gICAgICAgIHRoaXMuY2hhcmFjdGVyID0gY2hhcmFjdGVyO1xuICAgICAgICB0aGlzLmlzU2VsZWN0ZWQgPSBpc1NlbGVjdGVkO1xuICAgICAgICB0aGlzLnRhc2sgPSBudWxsO1xuICAgIH1cbn1cblxuZXhwb3J0IHR5cGUgSm9iID0gJ2Zhcm1lcicgfCAnbWVyY2hhbnQnO1xuXG5leHBvcnQgdHlwZSBDaGFyYWN0ZXIgPSB7XG4gICAgd2lzZG9tOiBudW1iZXI7XG59XG5cbi8qKlxuICogZGlqa3N0cmHjgavlv4XopoHjgarlpInmlbBcbiAqL1xuY29uc3QgSU5GID0gMTAwMDAwO1xuY29uc3QgViA9IEZJRUxEX1NJWkUgKiBGSUVMRF9TSVpFO1xuLy8g6Zqj5o6l6KGM5YiXXG5jb25zdCBjb3N0OiBudW1iZXJbXVtdID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogViB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXAobiA9PiBBcnJheS5mcm9tKHsgbGVuZ3RoOiBWIH0pLm1hcChuID0+IElORikpO1xuZm9yIChsZXQgeSA9IDA7IHkgPCBGSUVMRF9TSVpFOyB5KyspIHtcbiAgICBmb3IgKGxldCB4ID0gMDsgeCA8IEZJRUxEX1NJWkU7IHgrKykge1xuICAgICAgICBpZiAoeSA9PSAwICYmIHggPT0gMCkge1xuICAgICAgICAgICAgLy8g5bem5LiK44Gu6ZqFXG4gICAgICAgICAgICBjb3N0W0ZJRUxEX1NJWkUgKiB5ICsgeF1bRklFTERfU0laRSAqIHkgKyAoeCArIDEpXSA9IDE7XG4gICAgICAgICAgICBjb3N0W0ZJRUxEX1NJWkUgKiB5ICsgeF1bRklFTERfU0laRSAqICh5ICsgMSkgKyB4XSA9IDE7XG4gICAgICAgIH0gZWxzZSBpZiAoeSA9PSAwICYmIHggPT0gRklFTERfU0laRSAtIDEpIHtcbiAgICAgICAgICAgIC8vIOWPs+S4iuOBrumahVxuICAgICAgICAgICAgY29zdFtGSUVMRF9TSVpFICogeSArIHhdW0ZJRUxEX1NJWkUgKiB5ICsgKHggLSAxKV0gPSAxO1xuICAgICAgICAgICAgY29zdFtGSUVMRF9TSVpFICogeSArIHhdW0ZJRUxEX1NJWkUgKiAoeSArIDEpICsgeF0gPSAxO1xuICAgICAgICB9IGVsc2UgaWYgKHkgPT0gRklFTERfU0laRSAtIDEgJiYgeCA9PSAwKSB7XG4gICAgICAgICAgICAvLyDlt6bkuIvjga7pmoVcbiAgICAgICAgICAgIGNvc3RbRklFTERfU0laRSAqIHkgKyB4XVtGSUVMRF9TSVpFICogKHkgLSAxKSArIHhdID0gMTtcbiAgICAgICAgICAgIGNvc3RbRklFTERfU0laRSAqIHkgKyB4XVtGSUVMRF9TSVpFICogeSArICh4ICsgMSldID0gMTtcbiAgICAgICAgfSBlbHNlIGlmICh5ID09IEZJRUxEX1NJWkUgLSAxICYmIHggPT0gRklFTERfU0laRSAtIDEpIHtcbiAgICAgICAgICAgIC8vIOWPs+S4i+OBrumahVxuICAgICAgICAgICAgY29zdFtGSUVMRF9TSVpFICogeSArIHhdW0ZJRUxEX1NJWkUgKiAoeSAtIDEpICsgeF0gPSAxO1xuICAgICAgICAgICAgY29zdFtGSUVMRF9TSVpFICogeSArIHhdW0ZJRUxEX1NJWkUgKiB5ICsgKHggLSAxKV0gPSAxO1xuICAgICAgICB9IGVsc2UgaWYgKHkgPT0gMCkge1xuICAgICAgICAgICAgLy8g5LiK6L66XG4gICAgICAgICAgICBjb3N0W0ZJRUxEX1NJWkUgKiB5ICsgeF1bRklFTERfU0laRSAqIHkgKyAoeCAtIDEpXSA9IDE7IC8vIOKGkFxuICAgICAgICAgICAgY29zdFtGSUVMRF9TSVpFICogeSArIHhdW0ZJRUxEX1NJWkUgKiAoeSArIDEpICsgeF0gPSAxOyAvLyDihpNcbiAgICAgICAgICAgIGNvc3RbRklFTERfU0laRSAqIHkgKyB4XVtGSUVMRF9TSVpFICogeSArICh4ICsgMSldID0gMTsgLy8g4oaSXG4gICAgICAgIH0gZWxzZSBpZiAoeCA9PSAwKSB7XG4gICAgICAgICAgICAvLyDlt6bovrpcbiAgICAgICAgICAgIGNvc3RbRklFTERfU0laRSAqIHkgKyB4XVtGSUVMRF9TSVpFICogKHkgLSAxKSArIHhdID0gMTsgLy8g4oaRXG4gICAgICAgICAgICBjb3N0W0ZJRUxEX1NJWkUgKiB5ICsgeF1bRklFTERfU0laRSAqIHkgKyAoeCArIDEpXSA9IDE7IC8vIOKGklxuICAgICAgICAgICAgY29zdFtGSUVMRF9TSVpFICogeSArIHhdW0ZJRUxEX1NJWkUgKiAoeSArIDEpICsgeF0gPSAxOyAvLyDihpNcbiAgICAgICAgfSBlbHNlIGlmICh4ID09IEZJRUxEX1NJWkUgLSAxKSB7XG4gICAgICAgICAgICAvLyDlj7PovrpcbiAgICAgICAgICAgIGNvc3RbRklFTERfU0laRSAqIHkgKyB4XVtGSUVMRF9TSVpFICogKHkgLSAxKSArIHhdID0gMTsgLy8g4oaRXG4gICAgICAgICAgICBjb3N0W0ZJRUxEX1NJWkUgKiB5ICsgeF1bRklFTERfU0laRSAqIHkgKyAoeCAtIDEpXSA9IDE7IC8vIOKGkFxuICAgICAgICAgICAgY29zdFtGSUVMRF9TSVpFICogeSArIHhdW0ZJRUxEX1NJWkUgKiAoeSArIDEpICsgeF0gPSAxOyAvLyDihpNcbiAgICAgICAgfSBlbHNlIGlmICh5ID09IEZJRUxEX1NJWkUgLSAxKSB7XG4gICAgICAgICAgICAvLyDkuIvovrpcbiAgICAgICAgICAgIGNvc3RbRklFTERfU0laRSAqIHkgKyB4XVtGSUVMRF9TSVpFICogeSArICh4IC0gMSldID0gMTsgLy8g4oaQXG4gICAgICAgICAgICBjb3N0W0ZJRUxEX1NJWkUgKiB5ICsgeF1bRklFTERfU0laRSAqICh5IC0gMSkgKyB4XSA9IDE7IC8vIOKGkVxuICAgICAgICAgICAgY29zdFtGSUVMRF9TSVpFICogeSArIHhdW0ZJRUxEX1NJWkUgKiB5ICsgKHggKyAxKV0gPSAxOyAvLyDihpJcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvc3RbRklFTERfU0laRSAqIHkgKyB4XVtGSUVMRF9TSVpFICogKHkgLSAxKSArIHhdID0gMTsgLy8g4oaRXG4gICAgICAgICAgICBjb3N0W0ZJRUxEX1NJWkUgKiB5ICsgeF1bRklFTERfU0laRSAqIHkgKyAoeCArIDEpXSA9IDE7IC8vIOKGklxuICAgICAgICAgICAgY29zdFtGSUVMRF9TSVpFICogeSArIHhdW0ZJRUxEX1NJWkUgKiAoeSArIDEpICsgeF0gPSAxOyAvLyDihpNcbiAgICAgICAgICAgIGNvc3RbRklFTERfU0laRSAqIHkgKyB4XVtGSUVMRF9TSVpFICogeSArICh4IC0gMSldID0gMTsgLy8g4oaQXG4gICAgICAgIH1cbiAgICB9XG59IiwiaW1wb3J0IHsgSHVtYW4sIENoYXJhY3RlciB9IGZyb20gXCIuL0h1bWFuXCI7XG5pbXBvcnQgeyBnYW1lU3RhdGUsIFBvc2l0aW9uIH0gZnJvbSBcIi4uLy4uL2dhbWVcIjtcbmltcG9ydCB7IFRhc2sgfSBmcm9tIFwiLi4vVGFzay9UYXNrXCI7XG5cbmV4cG9ydCBjbGFzcyBNZXJjaGFudCBleHRlbmRzIEh1bWFuIHtcbiAgICAvKipcbiAgICAgKiAx5Y2Y5L2N5pmC6ZaT6YGO44GU44GZXG4gICAgICovXG4gICAgc3BlbmRUaW1lKCk6IHZvaWQge1xuICAgICAgICAvLyDjgr/jgrnjgq/jgpLlrozkuobjgZfjgabjgYTjgovloLTlkIjjgIHmrKHjga7jgr/jgrnjgq/jgpLmsbrjgoHjgotcbiAgICAgICAgaWYgKCF0aGlzLnRhc2spIHtcbiAgICAgICAgICAgIHRoaXMuZGV0ZXJtaW5lVGFzaygpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8g44K/44K544Kv44Gr5b6T44Gj44Gm6KGM5YuV44GZ44KLXG4gICAgICAgIHN3aXRjaCAodGhpcy50YXNrPy53aGF0KSB7XG4gICAgICAgICAgICBjYXNlICdzbGVlcCc6XG4gICAgICAgICAgICAgICAgVGFzay5oYW5kbGVTbGVlcCh0aGlzKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3dhbGtpbmcnOlxuICAgICAgICAgICAgICAgIFRhc2suaGFuZGxlV2Fsa2luZyh0aGlzKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFRPRE8gOiBocOOCkuabtOaWsOOBmeOCi1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOODqeODs+ODgOODoOOBq+OCv+OCueOCr+OCkuaxuuOCgeOCi1xuICAgICAqL1xuICAgIGRldGVybWluZVRhc2soKTogdm9pZCB7XG4gICAgICAgIC8vIFRPRE8g44K/44K544Kv44Gu5pWw44KS5aKX44KE44GZXG4gICAgICAgIC8vIFRPRE8g44K/44K544Kv44KS54++5Zyo44Gu44OR44Op44Oh44O844K/44Gr5b6T44Gj44Gm5rG644KB44KL44KI44GG44Gr5aSJ5pu0XG4gICAgICAgIGlmICgxNiA8IGdhbWVTdGF0ZS50aW1lLmgpIHtcbiAgICAgICAgICAgIC8vIOWvneOCi1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCLnnKDjgorjgb7jgZlcIik7XG4gICAgICAgICAgICB0aGlzLnRhc2sgPSB7IHdoYXQ6ICdzbGVlcCcsIHdoZXJlOiB0aGlzLmhvbWVQb3MgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8g5pWj5q2p44GZ44KLXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIig1LCA1KeOBuOWQkeOBi+OBhOOBvuOBmVwiKTtcbiAgICAgICAgICAgIHRoaXMudGFzayA9IHsgd2hhdDogJ3dhbGtpbmcnLCB3aGVyZTogeyB4OiA1LCB5OiA1IH0gfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIG5hbWU6IHN0cmluZyA9IGBIdW1hbiR7SHVtYW4uaHVtYW5OdW19YCxcbiAgICAgICAgaG9tZVBvczogUG9zaXRpb24gPSB7IHg6IDAsIHk6IDAgfSxcbiAgICAgICAgaHA6IG51bWJlciA9IDEwMCxcbiAgICAgICAgY29sb3I6IHN0cmluZyA9IFwiI0ZGMDAwMFwiLFxuICAgICAgICBjaGFyYWN0ZXI6IENoYXJhY3RlciA9IHsgd2lzZG9tOiAwLjUgfSxcbiAgICAgICAgaXNTZWxlY3RlZDogYm9vbGVhbiA9IGZhbHNlLFxuICAgICkge1xuICAgICAgICBzdXBlcihuYW1lLCBob21lUG9zLCBocCwgXCJtZXJjaGFudFwiLCBjb2xvciwgY2hhcmFjdGVyLCBpc1NlbGVjdGVkKTtcbiAgICB9XG59IiwiaW1wb3J0IHsgSHVtYW4gfSBmcm9tIFwiLi4vSHVtYW4vSHVtYW5cIjtcbmltcG9ydCB7IGdhbWVTdGF0ZSwgUG9zaXRpb24gfSBmcm9tIFwiLi4vLi4vZ2FtZVwiO1xuXG4vLyBUT0RP77yaVGFza+OCkuaKveixoeOCr+ODqeOCueOBq+OBl+OBpuOAgeWAi+WIpeOCv+OCueOCr+OCr+ODqeOCueOCkuS9nOaIkOOBmeOCi1xuZXhwb3J0IGNsYXNzIFRhc2sge1xuICAgIHdoYXQ6ICdzbGVlcCcgfCAnd2Fsa2luZyc7XG4gICAgd2hlcmU6IFBvc2l0aW9uO1xuXG4gICAgc3RhdGljIGhhbmRsZVNsZWVwKGh1bWFuOiBIdW1hbik6IHZvaWQge1xuICAgICAgICBpZiAoNSA8IGdhbWVTdGF0ZS50aW1lLmggJiYgZ2FtZVN0YXRlLnRpbWUuaCA8IDE2KSB7XG4gICAgICAgICAgICAvLyDmnJ1cbiAgICAgICAgICAgIGlmICg2IDwgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApKVxuICAgICAgICAgICAgICAgIC8vIOS4gOWumueiuueOh+OBp+i1t+OBjeOCi1xuICAgICAgICAgICAgICAgIGh1bWFuLnRhc2sgPSBudWxsO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8g5aScXG4gICAgICAgICAgICBpZiAoaHVtYW4ucG9zLnggPT09IGh1bWFuLmhvbWVQb3MueCAmJiBodW1hbi5wb3MueSA9PT0gaHVtYW4uaG9tZVBvcy55KSB7XG4gICAgICAgICAgICAgICAgLy8g5a6244Gr44GE44KM44Gw5a+d44Gf44G+44G+5L2V44KC44GX44Gq44GEXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyDlh7rlhYjjgarjga7jgafjgIHlrrbjgavluLDjgotcbiAgICAgICAgICAgICAgICBodW1hbi5oZWFkVG9EZXN0KGh1bWFuLmhvbWVQb3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGhhbmRsZVdhbGtpbmcoaHVtYW46IEh1bWFuKTogdm9pZCB7XG4gICAgICAgIGlmICghaHVtYW4udGFzaykgcmV0dXJuO1xuICAgICAgICBpZiAoaHVtYW4ucG9zLnggPT09IGh1bWFuLnRhc2sud2hlcmUueCAmJiBodW1hbi5wb3MueSA9PT0gaHVtYW4udGFzay53aGVyZS55KSB7XG4gICAgICAgICAgICAvLyDnm67nmoTlnLDjgavliLDnnYDjgZfjgZ/jga7jgafjgr/jgrnjgq/jgpLntYLkuoZcbiAgICAgICAgICAgIGh1bWFuLnRhc2sgPSBudWxsO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8g55uu55qE5Zyw44Gr5ZCR44GL44GGXG4gICAgICAgICAgICBodW1hbi5oZWFkVG9EZXN0KGh1bWFuLnRhc2sud2hlcmUpO1xuICAgICAgICB9XG4gICAgfVxufSIsImltcG9ydCB7IGdhbWVTdGF0ZSwgRklFTERfU0laRSB9IGZyb20gXCIuLi9nYW1lXCI7XG5pbXBvcnQgeyBIb3VzZSB9IGZyb20gXCIuLi9jbGFzcy9Bc3NldC9Ib3VzZVwiO1xuaW1wb3J0IHsgSHVtYW4gfSBmcm9tIFwiLi4vY2xhc3MvSHVtYW4vSHVtYW5cIjtcbmltcG9ydCB7IGlzTmlnaHQgfSBmcm9tIFwiLi91dGlsc1wiO1xuXG4vKipcbiAqIGdhbWVTdGF0ZeOBq+W+k+OBo+OBpuebpOmdouOCkuabtOaWsOOBmeOCi1xuICog6YG45oqe5Lit44Gu5Lq644Gu5LiK44Gr44Gv5ZC544GN5Ye644GX44KS6KGo56S644GZ44KLXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkcmF3RmllbGQoKTogdm9pZCB7XG4gICAgLy8g55uk6Z2i44KS44Oq44K744OD44OI44GZ44KLXG4gICAgcmVzZXRGaWVsZCgpO1xuXG4gICAgLy8g5Lq644KS5o+P55S7XG4gICAgZ2FtZVN0YXRlLmh1bWFucy5mb3JFYWNoKChodW1hbikgPT4ge1xuICAgICAgICBjb25zdCB7IHgsIHkgfSA9IGh1bWFuLnBvcztcbiAgICAgICAgY29uc3Qgc3F1YXJlRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNxdWFyZS1cIiArIChGSUVMRF9TSVpFICogeSArIHgpKTtcbiAgICAgICAgaWYgKCFzcXVhcmVFbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBzcXVhcmUtJHtGSUVMRF9TSVpFICogeSArIHh9IHdhcyBub3QgZm91bmQuYCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8g44Oe44K544Gu5paH5a2X5YiX44KS5pu05pawXG4gICAgICAgIHNxdWFyZUVsLnRleHRDb250ZW50ID0gXCLil4tcIjtcbiAgICAgICAgLy8g5Lq644GM6YG45oqe5Lit44Gq44KJ44Oe44K544Gu5LiK44Gr5ZC544GN5Ye644GX44KS6KGo56S644GZ44KLXG4gICAgICAgIGlmIChodW1hbi5pc1NlbGVjdGVkKSB7XG4gICAgICAgICAgICBjb25zdCBiYWxsb29uRWwgPSBjcmVhdGVCYWxsb29uKGh1bWFuKTtcbiAgICAgICAgICAgIHNxdWFyZUVsLmFwcGVuZENoaWxkKGJhbGxvb25FbCk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIOOCouOCu+ODg+ODiOOCkuaPj+eUu1xuICAgIGdhbWVTdGF0ZS5hc3NldHMuZm9yRWFjaCgoYXNzZXQpID0+IHtcbiAgICAgICAgY29uc3QgeyB4LCB5IH0gPSBhc3NldC5wb3M7XG4gICAgICAgIGNvbnN0IHNxdWFyZUVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzcXVhcmUtXCIgKyAoRklFTERfU0laRSAqIHkgKyB4KSk7XG4gICAgICAgIGlmICghc3F1YXJlRWwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgc3F1YXJlLSR7RklFTERfU0laRSAqIHkgKyB4fSB3YXMgbm90IGZvdW5kLmApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGFzc2V0IGluc3RhbmNlb2YgSG91c2UpIHtcbiAgICAgICAgICAgIC8vIOOCr+ODqeOCueOCkuODquOCu+ODg+ODiOOBmeOCi1xuICAgICAgICAgICAgc3F1YXJlRWwuY2xhc3NMaXN0LnJlbW92ZShhc3NldC5jbGFzc05hbWUpO1xuICAgICAgICAgICAgLy8g6YGp5YiH44Gq55S75YOP6KGo56S644Gu44Gf44KB44CB54q25rOB44Gr5b+c44GY44Gf44Kv44Op44K544KS5LuY5LiO44GZ44KLXG4gICAgICAgICAgICAvLyBUT0RP77ya5pmC6ZaT44KE54q25rOB44Gr5b+c44GY44GfY2xhc3NOYW1l44KS5YaN5qSc6KiO44GZ44KLXG4gICAgICAgICAgICAvLyBUT0RP77ya5a+d44Gm44GE44KL44Go44GN44GvbmlnaHQtaG91c2XjgavjgZnjgotcbiAgICAgICAgICAgIGlmIChhc3NldC5vd25lci5wb3MueCA9PT0geCAmJiBhc3NldC5vd25lci5wb3MueSA9PT0geSkge1xuICAgICAgICAgICAgICAgIC8vIOaJgOacieiAheOBjOWutuOBq+OBhOOCi+WgtOWQiFxuICAgICAgICAgICAgICAgIGlmIChpc05pZ2h0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgYXNzZXQuY2xhc3NOYW1lID0gJ2V2ZW5pbmctaG91c2UnO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGFzc2V0LmNsYXNzTmFtZSA9ICdub3JtYWwtaG91c2UnO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIOeUu+WDj+OCkuihqOekuuOBmeOCi+OBn+OCgeOBq+ODnuOCueOBruaWh+Wtl+WIl+OCkua2iOOBmVxuICAgICAgICAgICAgICAgIHNxdWFyZUVsLnRleHRDb250ZW50ID0gXCJcIjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8g5omA5pyJ6ICF44GM5a6244Gr44GE44Gq44GE5aC05ZCIXG4gICAgICAgICAgICAgICAgaWYgKGlzTmlnaHQoKSkge1xuICAgICAgICAgICAgICAgICAgICBhc3NldC5jbGFzc05hbWUgPSAnbmlnaHQtaG91c2UnO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGFzc2V0LmNsYXNzTmFtZSA9ICdub3JtYWwtaG91c2UnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNxdWFyZUVsLmNsYXNzTGlzdC5hZGQoYXNzZXQuY2xhc3NOYW1lKTtcbiAgICAgICAgICAgIGNvbnN0IGltZ0VsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgICAgICAgICAgIHNxdWFyZUVsLmFwcGVuZENoaWxkKGltZ0VsKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG4vKipcbiAqIOebpOmdouOCkuODquOCu+ODg+ODiOOBmeOCi++8iOOBmeOBueOBpuOBruODnuOCueOCkuepuuaWh+Wtl+WIl+OBq+OBmeOCi++8iVxuICovXG5mdW5jdGlvbiByZXNldEZpZWxkKCk6IHZvaWQge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgRklFTERfU0laRTsgaSsrKSB7XG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgRklFTERfU0laRTsgaisrKSB7XG4gICAgICAgICAgICBjb25zdCBzcXVhcmVFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3F1YXJlLVwiICsgKEZJRUxEX1NJWkUgKiBpICsgaikpO1xuICAgICAgICAgICAgaWYgKCFzcXVhcmVFbClcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYHNxdWFyZS0ke0ZJRUxEX1NJWkUgKiBpICsgan0gd2FzIG5vdCBmb3VuZC5gKTtcbiAgICAgICAgICAgIC8vIOWQhOODnuOCueOBruaWh+Wtl+WIl+OCkuOBi+OCieaWh+Wtl+WIl+OBq+ODquOCu+ODg+ODiFxuICAgICAgICAgICAgc3F1YXJlRWwudGV4dENvbnRlbnQgPSBcIlwiO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4vKipcbiAqIOihqOekuuOBleOCjOOBpuOBhOOCi+aZguWIu+OCkuabtOaWsOOBmeOCi1xuICovXG5leHBvcnQgZnVuY3Rpb24gZHJhd1RpbWUoKTogdm9pZCB7XG4gICAgY29uc3QgdGltZUVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aW1lTGFiZWxcIik7XG4gICAgaWYgKCF0aW1lRWwpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGB0aW1lTGFiZWwgd2FzIG5vdCBmb3VuZC5gKTtcbiAgICB9XG4gICAgdGltZUVsLnRleHRDb250ZW50ID0gYOePvuWcqOOBruaZguWIuyAke2dhbWVTdGF0ZS50aW1lLmh9IDogJHtnYW1lU3RhdGUudGltZS5tfWA7XG59XG5cbi8qKlxuICog5Lq644Gu5oOF5aCx44KS6KGo56S644GZ44KL5ZC544GN5Ye644GX6KaB57Sg44KS6L+U44GZXG4gKiBAcGFyYW0gaHVtYW4g5oOF5aCx44KS6KGo56S644GZ44KL5a++6LGhXG4gKiBAcmV0dXJucyDlkLnjgY3lh7rjgZfjga48ZGl2Puimgee0oFxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQmFsbG9vbihodW1hbjogSHVtYW4pOiBIVE1MRGl2RWxlbWVudCB7XG4gICAgY29uc3QgZGl2RWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGRpdkVsLmNsYXNzTmFtZSA9IFwiYWJvdmUtc3F1YXJlXCI7XG4gICAgY29uc3QgYmFsbG9vbkVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBiYWxsb29uRWwuY2xhc3NOYW1lID0gXCJiYWxsb29uMlwiO1xuICAgIGNvbnN0IG1lc3NhZ2VFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgIG1lc3NhZ2VFbC5pbm5lclRleHQgPVxuICAgICAgICBg5ZCN5YmN77yaJHtodW1hbi5uYW1lfVxuICAgIEhQ77yaJHtodW1hbi5ocH1cbiAgICDlvbnogbfvvJoke2h1bWFuLmpvYn1cbiAgICDmgKfmoLzvvJoke2h1bWFuLmNoYXJhY3Rlcn1gO1xuICAgIGJhbGxvb25FbC5hcHBlbmRDaGlsZChtZXNzYWdlRWwpO1xuICAgIGRpdkVsLmFwcGVuZENoaWxkKGJhbGxvb25FbCk7XG5cbiAgICByZXR1cm4gZGl2RWw7XG59IiwiaW1wb3J0IHsgZ2FtZVN0YXRlLCBIVE1MRXZlbnQsIEZJRUxEX1NJWkUgfSBmcm9tIFwiLi4vZ2FtZVwiO1xuaW1wb3J0IHsgSHVtYW4sIEpvYiB9IGZyb20gXCIuLi9jbGFzcy9IdW1hbi9IdW1hblwiO1xuaW1wb3J0IHsgRmFybWVyIH0gZnJvbSBcIi4uL2NsYXNzL0h1bWFuL0Zhcm1lclwiO1xuaW1wb3J0IHsgTWVyY2hhbnQgfSBmcm9tIFwiLi4vY2xhc3MvSHVtYW4vTWVyY2hhbnRcIjtcbmltcG9ydCB7IEhvdXNlIH0gZnJvbSBcIi4uL2NsYXNzL0Fzc2V0L0hvdXNlXCI7XG5pbXBvcnQgeyBkcmF3RmllbGQgfSBmcm9tIFwiLi9kcmF3XCI7XG5pbXBvcnQgeyBleGl0QWRkSHVtYW5Nb2RlLCBlbnRlckFkZEh1bWFuTW9kZSwgZXhpdFNlbGVjdEh1bWFuTW9kZSB9IGZyb20gXCIuL2hhbmRsZU1vZGVcIjtcbmltcG9ydCB7IGdldEh1bWFuc0Zyb21Qb3MgfSBmcm9tIFwiLi91dGlsc1wiO1xuXG4vKipcbiAqIFNxdWFyZeOBjOOCr+ODquODg+OCr+OBleOCjOOBn+OBqOOBjeOBq+WRvOOBsOOCjOOAgeePvuWcqOOBruODouODvOODieOBq+W+k+OBo+OBpuWHpueQhuOCkuihjOOBhlxuICovXG5leHBvcnQgZnVuY3Rpb24gaGFuZGxlQ2xpY2tTcXVhcmUoeDogbnVtYmVyLCB5OiBudW1iZXIpOiB2b2lkIHtcbiAgICBzd2l0Y2ggKGdhbWVTdGF0ZS5tb2RlKSB7XG4gICAgICAgIGNhc2UgJ25ldXRyYWwnOlxuICAgICAgICAgICAgY29uc29sZS5sb2coRklFTERfU0laRSAqIHkgKyB4KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdhZGRIdW1hbic6XG4gICAgICAgICAgICAvLyDmjIflrprjga7loLTmiYDjgavkurrjgpLov73liqDjgZnjgotcbiAgICAgICAgICAgIGxldCBuZXdIdW1hbjogSHVtYW47XG4gICAgICAgICAgICBpZiAoZ2FtZVN0YXRlLmFkZEh1bWFuVHlwZSA9PT0gXCJmYXJtZXJcIikge1xuICAgICAgICAgICAgICAgIG5ld0h1bWFuID0gbmV3IEZhcm1lcigpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChnYW1lU3RhdGUuYWRkSHVtYW5UeXBlID09PSBcIm1lcmNoYW50XCIpIHtcbiAgICAgICAgICAgICAgICBuZXdIdW1hbiA9IG5ldyBNZXJjaGFudCgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBuZXdIdW1hbiA9IG5ldyBGYXJtZXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5ld0h1bWFuLmhvbWVQb3MgPSB7IHgsIHkgfTtcbiAgICAgICAgICAgIG5ld0h1bWFuLnBvcyA9IHsgeCwgeSB9O1xuICAgICAgICAgICAgYWRkSHVtYW4obmV3SHVtYW4pO1xuICAgICAgICAgICAgLy8g55uk6Z2i44KS5pu05paw44GZ44KLXG4gICAgICAgICAgICBkcmF3RmllbGQoKTtcbiAgICAgICAgICAgIC8vIOODkuODiOi/veWKoOODouODvOODieOCkuaKnOOBkeOCi1xuICAgICAgICAgICAgZXhpdEFkZEh1bWFuTW9kZSgpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3NlbGVjdEh1bWFuJzpcbiAgICAgICAgICAgIGNvbnN0IGh1bWFucyA9IGdldEh1bWFuc0Zyb21Qb3MoeyB4LCB5IH0pO1xuICAgICAgICAgICAgLy8g5oyH5a6a44Gu5aC05omA44Gr5Lq644GM44GE44Gq44GR44KM44Gw5L2V44KC44GX44Gq44GEXG4gICAgICAgICAgICBpZiAoaHVtYW5zLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8g5oyH5a6a44Gu5aC05omA44Gu5Lq644Gu6YG45oqe54q25oWL44KS5Y+N6Lui44GV44Gb44KLXG4gICAgICAgICAgICAvLyDvvIjopIfmlbDkurrjga7loLTlkIjjga/jg6rjgrnjg4jjga7lhYjpoK3vvIlcbiAgICAgICAgICAgIGh1bWFuc1swXS5pc1NlbGVjdGVkID0gIWh1bWFuc1swXS5pc1NlbGVjdGVkO1xuICAgICAgICAgICAgLy8g55uk6Z2i44KS5pu05paw44GZ44KLXG4gICAgICAgICAgICBkcmF3RmllbGQoKTtcbiAgICAgICAgICAgIC8vIOmBuOaKnuODouODvOODieOCkuaKnOOBkeOCi1xuICAgICAgICAgICAgZXhpdFNlbGVjdEh1bWFuTW9kZSgpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxufVxuXG4vKipcbiAqIGdhbWVTdGF0ZeOBq+S6uuOBqOWutuOCkui/veWKoFxuICovXG5mdW5jdGlvbiBhZGRIdW1hbihuZXdIdW1hbjogSHVtYW4pIHtcbiAgICBjb25zdCB7IHgsIHkgfSA9IG5ld0h1bWFuLnBvcztcbiAgICAvLyDkurrjgpLov73liqBcbiAgICBnYW1lU3RhdGUuaHVtYW5zLnB1c2gobmV3SHVtYW4pO1xuICAgIC8vIOWutuOCkui/veWKoFxuICAgIGdhbWVTdGF0ZS5hc3NldHMucHVzaChcbiAgICAgICAgbmV3IEhvdXNlKHsgeCwgeSB9LCBuZXdIdW1hbilcbiAgICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaGFuZGxlQWRkSHVtYW5DbGljaygpOiB2b2lkIHtcbiAgICBjb25zb2xlLmxvZyhcImhvZ2VcIik7XG4gICAgY29uc3QgcmFkaW9JbnB1dHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZShcInR5cGVGb3JtXCIpIGFzIE5vZGVMaXN0T2Y8SFRNTElucHV0RWxlbWVudD47XG4gICAgcmFkaW9JbnB1dHMuZm9yRWFjaCgocmFkaW86IEhUTUxJbnB1dEVsZW1lbnQpID0+IHtcbiAgICAgICAgaWYgKHJhZGlvLmNoZWNrZWQpIHtcbiAgICAgICAgICAgIGdhbWVTdGF0ZS5hZGRIdW1hblR5cGUgPSByYWRpby52YWx1ZSBhcyBKb2I7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBjb25zb2xlLmxvZyhnYW1lU3RhdGUuYWRkSHVtYW5UeXBlKTtcblxuICAgIGVudGVyQWRkSHVtYW5Nb2RlKCk7XG59IiwiaW1wb3J0IHsgRklFTERfU0laRSwgZ2FtZVN0YXRlIH0gZnJvbSBcIi4uL2dhbWVcIjtcblxuZXhwb3J0IHR5cGUgSW50ZXJmYWNlTW9kZSA9IFwibmV1dHJhbFwiIHwgXCJhZGRIdW1hblwiIHwgXCJzZWxlY3RIdW1hblwiO1xuXG4vKipcbiAqIOS9jee9ruOBrumBuOaKnuODouODvOODieOBq+mBt+enu+OBl+OAgVNxdWFyZeS4iuOBp+ODm+ODkOODvOOBmeOCi+OBqOiJsuOBjOWkieOCj+OCi+OCiOOBhuOBq+OBquOCi1xuICovXG5leHBvcnQgZnVuY3Rpb24gZW50ZXJBZGRIdW1hbk1vZGUoKTogdm9pZCB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBGSUVMRF9TSVpFOyBpKyspIHtcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBGSUVMRF9TSVpFOyBqKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHNxdWFyZUVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzcXVhcmUtXCIgKyAoRklFTERfU0laRSAqIGkgKyBqKSk7XG4gICAgICAgICAgICBpZiAoIXNxdWFyZUVsKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgc3F1YXJlLSR7RklFTERfU0laRSAqIGkgKyBqfSB3YXMgbm90IGZvdW5kLmApO1xuICAgICAgICAgICAgLy8g44Ob44OQ44O85pmC44Gr6Imy44GM5aSJ44KP44KL44KI44GG44Gr44Kv44Op44K544KS6L+95YqgXG4gICAgICAgICAgICBzcXVhcmVFbC5jbGFzc0xpc3QuYWRkKCdodW1hbi1hZGQtbW9kZScpXG4gICAgICAgICAgICAvLyDpgbjmip7jg6Ljg7zjg4njgavpgbfnp7vjgZnjgotcbiAgICAgICAgICAgIGdhbWVTdGF0ZS5tb2RlID0gJ2FkZEh1bWFuJztcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLyoqXG4gKiDjg4vjg6Xjg7zjg4jjg6njg6vjg6Ljg7zjg4njgavpgbfnp7vjgZfjgIFTcXVhcmXkuIrjgafjg5vjg5Djg7zjgZfjgabjgoLoibLjgYzlpInjgo/jgonjgarjgYTjgojjgYbjgavjgZnjgotcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGV4aXRBZGRIdW1hbk1vZGUoKTogdm9pZCB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBGSUVMRF9TSVpFOyBpKyspIHtcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBGSUVMRF9TSVpFOyBqKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHNxdWFyZUVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzcXVhcmUtXCIgKyAoRklFTERfU0laRSAqIGkgKyBqKSk7XG4gICAgICAgICAgICBpZiAoIXNxdWFyZUVsKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgc3F1YXJlLSR7RklFTERfU0laRSAqIGkgKyBqfSB3YXMgbm90IGZvdW5kLmApO1xuICAgICAgICAgICAgLyog44Ob44OQ44O85pmC44Gr6Imy44GM5aSJ44KP44KL44Kv44Op44K544KS6Zmk5Y67ICovXG4gICAgICAgICAgICBzcXVhcmVFbC5jbGFzc0xpc3QucmVtb3ZlKCdodW1hbi1hZGQtbW9kZScpXG4gICAgICAgICAgICAvKiDjg4vjg6Xjg7zjg4jjg6njg6vjg6Ljg7zjg4njgavpgbfnp7vjgZnjgosgKi9cbiAgICAgICAgICAgIGdhbWVTdGF0ZS5tb2RlID0gJ25ldXRyYWwnO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4vKipcbiAqIOWQueOBjeWHuuOBl+OCkuihqOekuuOBmeOCi+S6uuOCkumBuOaKnuOBmeOCi+ODouODvOODieOBq+mBt+enu+OBmeOCi1xuICovXG5leHBvcnQgZnVuY3Rpb24gZW50ZXJTZWxlY3RIdW1hbk1vZGUoKTogdm9pZCB7XG4gICAgZ2FtZVN0YXRlLm1vZGUgPSAnc2VsZWN0SHVtYW4nO1xufVxuXG4vKipcbiAqIOODi+ODpeODvOODiOODqeODq+ODouODvOODieOBq+mBt+enu+OBmeOCi1xuICovXG5leHBvcnQgZnVuY3Rpb24gZXhpdFNlbGVjdEh1bWFuTW9kZSgpOiB2b2lkIHtcbiAgICBnYW1lU3RhdGUubW9kZSA9ICduZXV0cmFsJztcbn0iLCJpbXBvcnQgeyBQb3NpdGlvbiwgZ2FtZVN0YXRlIH0gZnJvbSBcIi4uL2dhbWVcIjtcbmltcG9ydCB7IEh1bWFuIH0gZnJvbSBcIi4uL2NsYXNzL0h1bWFuL0h1bWFuXCI7XG5pbXBvcnQgeyBGSUVMRF9TSVpFIH0gZnJvbSBcIi4uL2dhbWVcIjtcblxuLyoqXG4gKiDjgYLjgovluqfmqJnjgavjgYTjgovkurrjga7mpJzntKLjgZfjgIHphY3liJfjgavjgZfjgabov5TjgZlcbiAqIEBwYXJhbSBwb3Mg5bqn5qiZXG4gKiBAcmV0dXJucyDjgZ3jga7luqfmqJnjgavjgYTjgovkurrjga7phY3liJdcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEh1bWFuc0Zyb21Qb3MocG9zOiBQb3NpdGlvbik6IEh1bWFuW10ge1xuICAgIGNvbnN0IHJldEh1bWFuczogSHVtYW5bXSA9IFtdO1xuICAgIGdhbWVTdGF0ZS5odW1hbnMuZm9yRWFjaCgoaHVtYW4pID0+IHtcbiAgICAgICAgaWYgKGh1bWFuLnBvcy54ID09IHBvcy54ICYmIGh1bWFuLnBvcy55ID09IHBvcy55KSB7XG4gICAgICAgICAgICByZXRIdW1hbnMucHVzaChodW1hbik7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gcmV0SHVtYW5zO1xufVxuXG4vKipcbiAqIGdhbWVTdGF0ZS50aW1l44Gr5b6T44Gj44Gm5aSc44GL5ZCm44GL44KS6L+U44GZXG4gKiBAcmV0dXJucyDlpJzjgafjgYLjgovjgYvlkKbjgYtcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzTmlnaHQoKTogYm9vbGVhbiB7XG4gICAgaWYgKGdhbWVTdGF0ZS50aW1lLmggPj0gMTggfHwgZ2FtZVN0YXRlLnRpbWUuaCA8PSA2KSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG5cbi8qKlxuICog44Op44Oz44OA44Og44Gq5L2N572u44KS55Sf5oiQ44GX44CB6L+U44GZXG4gKiBAcmV0dXJucyBbeCwgeV1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVJhbmRvbVBvcygpOiBQb3NpdGlvbiB7XG4gICAgY29uc3QgeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIEZJRUxEX1NJWkUpO1xuICAgIGNvbnN0IHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBGSUVMRF9TSVpFKTtcbiAgICByZXR1cm4geyB4LCB5IH07XG59IiwiaW1wb3J0IHsgSW50ZXJmYWNlTW9kZSB9IGZyb20gXCIuL2Z1bmN0aW9uL2hhbmRsZU1vZGVcIjtcbmltcG9ydCB7IEpvYiwgSHVtYW4gfSBmcm9tIFwiLi9jbGFzcy9IdW1hbi9IdW1hblwiO1xuaW1wb3J0IHsgQXNzZXQgfSBmcm9tIFwiLi9jbGFzcy9Bc3NldC9Bc3NldFwiO1xuXG4vKiDnm6TpnaLjga7jgrXjgqTjgrogKi9cbmV4cG9ydCBjb25zdCBGSUVMRF9TSVpFID0gODtcblxuZXhwb3J0IGxldCBnYW1lU3RhdGU6IEdhbWVTdGF0ZSA9IHtcbiAgICB0aW1lOiB7IGQ6IDEsIGg6IDE0LCBtOiAzMCB9LFxuICAgIG1vZGU6IFwibmV1dHJhbFwiLFxuICAgIGFkZEh1bWFuVHlwZTogXCJmYXJtZXJcIixcbiAgICBodW1hbnM6IFtdLFxuICAgIGFzc2V0czogW10sXG59XG5cbi8vID09PT09PT09PT09PT09PT09IHR5cGUgPT09PT09PT09PT09PT09PVxuXG5leHBvcnQgdHlwZSBHYW1lU3RhdGUgPSB7XG4gICAgdGltZTogVGltZTtcbiAgICBtb2RlOiBJbnRlcmZhY2VNb2RlO1xuICAgIGFkZEh1bWFuVHlwZTogSm9iO1xuICAgIGh1bWFuczogSHVtYW5bXTtcbiAgICBhc3NldHM6IEFzc2V0W107XG59XG5cbnR5cGUgVGltZSA9IHtcbiAgICBkOiBudW1iZXI7XG4gICAgaDogbnVtYmVyO1xuICAgIG06IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBIVE1MRXZlbnQ8VCBleHRlbmRzIEV2ZW50VGFyZ2V0PiBleHRlbmRzIEV2ZW50IHtcbiAgICB0YXJnZXQ6IFQ7XG59XG5cbmV4cG9ydCB0eXBlIFBvc2l0aW9uID0ge1xuICAgIHg6IG51bWJlcixcbiAgICB5OiBudW1iZXIsXG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBkcmF3RmllbGQsIGRyYXdUaW1lIH0gZnJvbSBcIi4vZnVuY3Rpb24vZHJhd1wiO1xyXG5pbXBvcnQgeyBoYW5kbGVBZGRIdW1hbkNsaWNrLCBoYW5kbGVDbGlja1NxdWFyZSB9IGZyb20gXCIuL2Z1bmN0aW9uL2hhbmRsZUFjdGlvblwiO1xyXG5pbXBvcnQgeyBlbnRlclNlbGVjdEh1bWFuTW9kZSB9IGZyb20gXCIuL2Z1bmN0aW9uL2hhbmRsZU1vZGVcIjtcclxuaW1wb3J0IHsgRklFTERfU0laRSwgZ2FtZVN0YXRlIH0gZnJvbSBcIi4vZ2FtZVwiO1xyXG5cclxubGV0IGludGVydmFsSWQ6IG51bWJlcjtcclxubGV0IGlzTG9vcGluZzogYm9vbGVhbjtcclxuXHJcbi8vIOODmuODvOOCuOOBjOiqreOBv+i+vOOBvuOCjOOBn+OBqOOBjeOBruWHpueQhlxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoZSkgPT4ge1xyXG4gICAgLy8gMeenkuOBlOOBqOOBq2ludGVydmFsRnVuY+OCkuWun+ihjOOBmeOCi+OCiOOBhuOBq+ioreWumlxyXG4gICAgaW50ZXJ2YWxJZCA9IHNldEludGVydmFsKGludGVydmFsRnVuYywgMTAwMCk7XHJcbiAgICBpc0xvb3BpbmcgPSB0cnVlO1xyXG5cclxuICAgIC8vIOOCpOODmeODs+ODiOODj+ODs+ODieODqeODvOOCkueZu+mMslxyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWxlY3RIdW1hbkJ1dHRvblwiKT8uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGVudGVyU2VsZWN0SHVtYW5Nb2RlKTtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3dpdGNoSW50ZXJ2YWxCdXR0b25cIik/LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBzd2l0Y2hJbnRlcnZhbCk7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZEh1bWFuQnV0dG9uXCIpPy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlQWRkSHVtYW5DbGljayk7XHJcblxyXG4gICAgLy8g5o+P55S7XHJcbiAgICBjcmVhdGVGaWVsZCgpO1xyXG4gICAgZHJhd0ZpZWxkKCk7XHJcbiAgICBkcmF3VGltZSgpO1xyXG59KTtcclxuXHJcbi8qKlxyXG4gKiAx5Y2Y5L2N5pmC6ZaT44GU44Go44Gr5ZG844Gw44KM44KL6Zai5pWwXHJcbiAqL1xyXG5mdW5jdGlvbiBpbnRlcnZhbEZ1bmMoKTogdm9pZCB7XHJcbiAgICAvLyAx5Y2Y5L2N5pmC6ZaT44GU44Go44Gr55uk6Z2i44KS5pu05paw44GZ44KLXHJcbiAgICBnYW1lU3RhdGUuaHVtYW5zLmZvckVhY2goKGh1bWFuKSA9PiBodW1hbi5zcGVuZFRpbWUoKSk7XHJcbiAgICAvLyDmmYLplpPjgpIxMOWIhumAsuOCgeOCi1xyXG4gICAgZ2FtZVN0YXRlLnRpbWUuaCA9IChnYW1lU3RhdGUudGltZS5oICsgMSkgJSAyNDtcclxuICAgIC8vIOebpOmdouOBquOBqeOCkuabtOaWsFxyXG4gICAgZHJhd0ZpZWxkKCk7XHJcbiAgICBkcmF3VGltZSgpO1xyXG59XHJcblxyXG4vKipcclxuICog44Kk44Oz44K/44O844OQ44Or44Gu44Kq44OzL+OCquODleOCkuWIh+OCiuabv+OBiOOCi1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHN3aXRjaEludGVydmFsKCk6IHZvaWQge1xyXG4gICAgaWYgKGlzTG9vcGluZykge1xyXG4gICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxJZCk7XHJcbiAgICAgICAgaXNMb29waW5nID0gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGludGVydmFsSWQgPSBzZXRJbnRlcnZhbChpbnRlcnZhbEZ1bmMsIDEwMDApO1xyXG4gICAgICAgIGlzTG9vcGluZyA9IHRydWU7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBGSUVMRF9TSVpFICogRklFTERfU0laRSDjga7nm6TpnaLjgpLkvZzmiJDjgZnjgotcclxuICovXHJcbmZ1bmN0aW9uIGNyZWF0ZUZpZWxkKCk6IHZvaWQge1xyXG4gICAgY29uc3QgZmllbGRFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZmllbGRcIik7XHJcbiAgICBpZiAoIWZpZWxkRWwpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJzxkaXYgaWQ9XCJmaWVsZFwiPjwvZGl2PiBpcyBudWxsLicpO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgRklFTERfU0laRTsgaSsrKSB7XHJcbiAgICAgICAgLy8g6KGM44Gu6KaB57Sg44KS5L2c5oiQXHJcbiAgICAgICAgY29uc3QgbGluZUVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICBsaW5lRWwuY2xhc3NOYW1lID0gXCJib2FyZC1yb3dcIjtcclxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IEZJRUxEX1NJWkU7IGorKykge1xyXG4gICAgICAgICAgICAvLyDlkITooYzjga7liJfjga7opoHntKDjgpLkvZzmiJBcclxuICAgICAgICAgICAgY29uc3Qgc3F1YXJlRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gICAgICAgICAgICBzcXVhcmVFbC5jbGFzc05hbWUgPSBcInNxdWFyZVwiO1xyXG4gICAgICAgICAgICBzcXVhcmVFbC5pZCA9IFwic3F1YXJlLVwiICsgKEZJRUxEX1NJWkUgKiBpICsgaik7XHJcbiAgICAgICAgICAgIHNxdWFyZUVsLm9uY2xpY2sgPSAoKSA9PiBoYW5kbGVDbGlja1NxdWFyZShqLCBpKTtcclxuICAgICAgICAgICAgLy8g6KGM44Gu5a2Q6KaB57Sg44Gr44GZ44KLXHJcbiAgICAgICAgICAgIGxpbmVFbC5hcHBlbmRDaGlsZChzcXVhcmVFbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOihjOOBruimgee0oOOCkuWtkOimgee0oOOBq+OBmeOCi1xyXG4gICAgICAgIGZpZWxkRWwuYXBwZW5kQ2hpbGQobGluZUVsKTtcclxuICAgIH1cclxufVxyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=