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
    switch (_game__WEBPACK_IMPORTED_MODULE_0__.gameState.mode.id) {
        case 'neutral':
            console.log(_game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE * y + x);
            break;
        case 'addHuman':
            // 指定の場所に人を追加する
            let newHuman;
            if (_game__WEBPACK_IMPORTED_MODULE_0__.gameState.mode.job === "farmer") {
                newHuman = new _class_Human_Farmer__WEBPACK_IMPORTED_MODULE_1__.Farmer();
            }
            else if (_game__WEBPACK_IMPORTED_MODULE_0__.gameState.mode.job === "merchant") {
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
    let job = null;
    radioInputs.forEach((radio) => {
        if (radio.checked) {
            job = radio.value;
        }
    });
    if (!job) {
        throw new Error("job is not selected. Can't enter add-human mode.");
    }
    console.log(job);
    (0,_handleMode__WEBPACK_IMPORTED_MODULE_5__.enterAddHumanMode)(job);
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
function enterAddHumanMode(job) {
    for (let i = 0; i < _game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE; i++) {
        for (let j = 0; j < _game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE; j++) {
            const squareEl = document.getElementById("square-" + (_game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE * i + j));
            if (!squareEl)
                throw new Error(`square-${_game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE * i + j} was not found.`);
            // ホバー時に色が変わるようにクラスを追加
            squareEl.classList.add('human-add-mode');
            // 選択モードに遷移する
            _game__WEBPACK_IMPORTED_MODULE_0__.gameState.mode = { id: 'addHuman', job };
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
            _game__WEBPACK_IMPORTED_MODULE_0__.gameState.mode = { id: 'neutral' };
        }
    }
}
/**
 * 吹き出しを表示する人を選択するモードに遷移する
 */
function enterSelectHumanMode() {
    _game__WEBPACK_IMPORTED_MODULE_0__.gameState.mode = { id: 'selectHuman' };
}
/**
 * ニュートラルモードに遷移する
 */
function exitSelectHumanMode() {
    _game__WEBPACK_IMPORTED_MODULE_0__.gameState.mode = { id: 'neutral' };
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
    mode: { id: "neutral" },
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDLDZDQUFVLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLDZDQUFVLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZELElBQUksQ0FBQyw2Q0FBVSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyw2Q0FBVSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMzRCxDQUFDO2FBQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSw2Q0FBVSxHQUFHLENBQUMsRUFBRSxDQUFDO1lBQ3ZDLE9BQU87WUFDUCxJQUFJLENBQUMsNkNBQVUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsNkNBQVUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDdkQsSUFBSSxDQUFDLDZDQUFVLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLDZDQUFVLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzNELENBQUM7YUFBTSxJQUFJLENBQUMsSUFBSSw2Q0FBVSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDdkMsT0FBTztZQUNQLElBQUksQ0FBQyw2Q0FBVSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyw2Q0FBVSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN2RCxJQUFJLENBQUMsNkNBQVUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsNkNBQVUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDM0QsQ0FBQzthQUFNLElBQUksQ0FBQyxJQUFJLDZDQUFVLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSw2Q0FBVSxHQUFHLENBQUMsRUFBRSxDQUFDO1lBQ3BELE9BQU87WUFDUCxJQUFJLENBQUMsNkNBQVUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsNkNBQVUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDdkQsSUFBSSxDQUFDLDZDQUFVLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLDZDQUFVLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzNELENBQUM7YUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUNoQixLQUFLO1lBQ0wsSUFBSSxDQUFDLDZDQUFVLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLDZDQUFVLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSTtZQUM1RCxJQUFJLENBQUMsNkNBQVUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsNkNBQVUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJO1lBQzVELElBQUksQ0FBQyw2Q0FBVSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyw2Q0FBVSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUk7UUFDaEUsQ0FBQzthQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO1lBQ2hCLEtBQUs7WUFDTCxJQUFJLENBQUMsNkNBQVUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsNkNBQVUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJO1lBQzVELElBQUksQ0FBQyw2Q0FBVSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyw2Q0FBVSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUk7WUFDNUQsSUFBSSxDQUFDLDZDQUFVLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLDZDQUFVLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSTtRQUNoRSxDQUFDO2FBQU0sSUFBSSxDQUFDLElBQUksNkNBQVUsR0FBRyxDQUFDLEVBQUUsQ0FBQztZQUM3QixLQUFLO1lBQ0wsSUFBSSxDQUFDLDZDQUFVLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLDZDQUFVLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSTtZQUM1RCxJQUFJLENBQUMsNkNBQVUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsNkNBQVUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJO1lBQzVELElBQUksQ0FBQyw2Q0FBVSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyw2Q0FBVSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUk7UUFDaEUsQ0FBQzthQUFNLElBQUksQ0FBQyxJQUFJLDZDQUFVLEdBQUcsQ0FBQyxFQUFFLENBQUM7WUFDN0IsS0FBSztZQUNMLElBQUksQ0FBQyw2Q0FBVSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyw2Q0FBVSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUk7WUFDNUQsSUFBSSxDQUFDLDZDQUFVLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLDZDQUFVLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSTtZQUM1RCxJQUFJLENBQUMsNkNBQVUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsNkNBQVUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJO1FBQ2hFLENBQUM7YUFBTSxDQUFDO1lBQ0osSUFBSSxDQUFDLDZDQUFVLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLDZDQUFVLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSTtZQUM1RCxJQUFJLENBQUMsNkNBQVUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsNkNBQVUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJO1lBQzVELElBQUksQ0FBQyw2Q0FBVSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyw2Q0FBVSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUk7WUFDNUQsSUFBSSxDQUFDLDZDQUFVLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLDZDQUFVLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSTtRQUNoRSxDQUFDO0lBQ0wsQ0FBQztBQUNMLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3BLMEM7QUFDTTtBQUNiO0FBRTdCLE1BQU0sUUFBUyxT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LCJ3ZWJwYWNrOi8vbWF0cml4LWdhbWUvLi9zcmMvY2xhc3MvQXNzZXQvSG91c2UudHMiLCJ3ZWJwYWNrOi8vbWF0cml4LWdhbWUvLi9zcmMvY2xhc3MvSHVtYW4vRmFybWVyLnRzIiwid2VicGFjazovL21hdHJpeC1nYW1lLy4vc3JjL2NsYXNzL0h1bWFuL0h1bWFuLnRzIiwid2VicGFjazovL21hdHJpeC1nYW1lLy4vc3JjL2NsYXNzL0h1bWFuL01lcmNoYW50LnRzIiwid2VicGFjazovL21hdHJpeC1nYW1lLy4vc3JjL2NsYXNzL1Rhc2svVGFzay50cyIsIndlYnBhY2s6Ly9tYXRyaXgtZ2FtZS8uL3NyYy9mdW5jdGlvbi9kcmF3LnRzIiwid2VicGFjazovL21hdHJpeC1nYW1lLy4vc3JjL2Z1bmN0aW9uL2hhbmRsZUFjdGlvbi50cyIsIndlYnBhY2s6Ly9tYXRyaXgtZ2FtZS8uL3NyYy9mdW5jdGlvbi9oYW5kbGVNb2RlLnRzIiwid2VicGFjazovL21hdHJpeC1nYW1lLy4vc3JjL2Z1bmN0aW9uL3V0aWxzLnRzIiwid2VicGFjazovL21hdHJpeC1nYW1lLy4vc3JjL2dhbWUudHMiLCJ3ZWJwYWNrOi8vbWF0cml4LWdhbWUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbWF0cml4LWdhbWUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL21hdHJpeC1nYW1lL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbWF0cml4LWdhbWUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9tYXRyaXgtZ2FtZS8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQb3NpdGlvbiwgRklFTERfU0laRSB9IGZyb20gXCIuLi8uLi9nYW1lXCI7XG5pbXBvcnQgeyBIdW1hbiB9IGZyb20gXCIuLi9IdW1hbi9IdW1hblwiO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQXNzZXQge1xuICAgIHBvczogUG9zaXRpb247XG4gICAgb3duZXI6IEh1bWFuO1xuXG4gICAgY29uc3RydWN0b3IocG9zOiBQb3NpdGlvbiwgb3duZXI6IEh1bWFuKSB7XG4gICAgICAgIGlmIChwb3MueCA8IDAgfHwgcG9zLnggPj0gRklFTERfU0laRSB8fCBwb3MueSA8IDAgfHwgcG9zLnkgPj0gRklFTERfU0laRSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBwb3MueCwgcG94LnkgbXVzdCBiZSBpbiAwIDw9IGEgPCBGSUVMRF9TSVpFYCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wb3MgPSBwb3M7XG4gICAgICAgIHRoaXMub3duZXIgPSBvd25lcjtcbiAgICB9XG59IiwiaW1wb3J0IHsgQXNzZXQgfSBmcm9tIFwiLi9Bc3NldFwiO1xuaW1wb3J0IHsgUG9zaXRpb24gfSBmcm9tIFwiLi4vLi4vZ2FtZVwiO1xuaW1wb3J0IHsgSHVtYW4gfSBmcm9tIFwiLi4vSHVtYW4vSHVtYW5cIjtcblxuZXhwb3J0IGNsYXNzIEhvdXNlIGV4dGVuZHMgQXNzZXQge1xuICAgIGNsYXNzTmFtZTogXCJub3JtYWwtaG91c2VcIiB8IFwiZXZlbmluZy1ob3VzZVwiIHwgXCJuaWdodC1ob3VzZVwiIHwgXCJzbGVlcGluZy1ob3VzZVwiO1xuXG4gICAgY29uc3RydWN0b3IocG9zOiBQb3NpdGlvbiwgb3duZXI6IEh1bWFuKSB7XG4gICAgICAgIHN1cGVyKHBvcywgb3duZXIpO1xuICAgICAgICB0aGlzLmNsYXNzTmFtZSA9IFwibm9ybWFsLWhvdXNlXCI7XG4gICAgfVxufSIsImltcG9ydCB7IEh1bWFuLCBDaGFyYWN0ZXIgfSBmcm9tIFwiLi9IdW1hblwiO1xuaW1wb3J0IHsgZ2FtZVN0YXRlLCBQb3NpdGlvbiB9IGZyb20gXCIuLi8uLi9nYW1lXCI7XG5pbXBvcnQgeyBUYXNrIH0gZnJvbSBcIi4uL1Rhc2svVGFza1wiO1xuXG5leHBvcnQgY2xhc3MgRmFybWVyIGV4dGVuZHMgSHVtYW4ge1xuICAgIC8qKlxuICAgICAqIDHljZjkvY3mmYLplpPpgY7jgZTjgZlcbiAgICAgKi9cbiAgICBzcGVuZFRpbWUoKTogdm9pZCB7XG4gICAgICAgIC8vIOOCv+OCueOCr+OCkuWujOS6huOBl+OBpuOBhOOCi+WgtOWQiOOAgeasoeOBruOCv+OCueOCr+OCkuaxuuOCgeOCi1xuICAgICAgICBpZiAoIXRoaXMudGFzaykge1xuICAgICAgICAgICAgdGhpcy5kZXRlcm1pbmVUYXNrKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyDjgr/jgrnjgq/jgavlvpPjgaPjgabooYzli5XjgZnjgotcbiAgICAgICAgc3dpdGNoICh0aGlzLnRhc2s/LndoYXQpIHtcbiAgICAgICAgICAgIGNhc2UgJ3NsZWVwJzpcbiAgICAgICAgICAgICAgICBUYXNrLmhhbmRsZVNsZWVwKHRoaXMpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnd2Fsa2luZyc6XG4gICAgICAgICAgICAgICAgVGFzay5oYW5kbGVXYWxraW5nKHRoaXMpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVE9ETyA6IGhw44KS5pu05paw44GZ44KLXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog44Op44Oz44OA44Og44Gr44K/44K544Kv44KS5rG644KB44KLXG4gICAgICovXG4gICAgZGV0ZXJtaW5lVGFzaygpOiB2b2lkIHtcbiAgICAgICAgLy8gVE9ETyDjgr/jgrnjgq/jga7mlbDjgpLlopfjgoTjgZlcbiAgICAgICAgLy8gVE9ETyDjgr/jgrnjgq/jgpLnj77lnKjjga7jg5Hjg6njg6Hjg7zjgr/jgavlvpPjgaPjgabmsbrjgoHjgovjgojjgYbjgavlpInmm7RcbiAgICAgICAgaWYgKDE2IDwgZ2FtZVN0YXRlLnRpbWUuaCkge1xuICAgICAgICAgICAgLy8g5a+d44KLXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuecoOOCiuOBvuOBmVwiKTtcbiAgICAgICAgICAgIHRoaXMudGFzayA9IHsgd2hhdDogJ3NsZWVwJywgd2hlcmU6IHRoaXMuaG9tZVBvcyB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyDmlaPmranjgZnjgotcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiKDUsIDUp44G45ZCR44GL44GE44G+44GZXCIpO1xuICAgICAgICAgICAgdGhpcy50YXNrID0geyB3aGF0OiAnd2Fsa2luZycsIHdoZXJlOiB7IHg6IDUsIHk6IDUgfSB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgbmFtZTogc3RyaW5nID0gYEh1bWFuJHtIdW1hbi5odW1hbk51bX1gLFxuICAgICAgICBob21lUG9zOiBQb3NpdGlvbiA9IHsgeDogMCwgeTogMCB9LFxuICAgICAgICBocDogbnVtYmVyID0gMTAwLFxuICAgICAgICBjb2xvcjogc3RyaW5nID0gXCIjRkYwMDAwXCIsXG4gICAgICAgIGNoYXJhY3RlcjogQ2hhcmFjdGVyID0geyB3aXNkb206IDAuNSB9LFxuICAgICAgICBpc1NlbGVjdGVkOiBib29sZWFuID0gZmFsc2UsXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKG5hbWUsIGhvbWVQb3MsIGhwLCBcImZhcm1lclwiLCBjb2xvciwgY2hhcmFjdGVyLCBpc1NlbGVjdGVkKTtcbiAgICB9XG59IiwiaW1wb3J0IHsgUG9zaXRpb24gfSBmcm9tIFwiLi4vLi4vZ2FtZVwiO1xuaW1wb3J0IHsgVGFzayB9IGZyb20gXCIuLi9UYXNrL1Rhc2tcIjtcbmltcG9ydCB7IEZJRUxEX1NJWkUgfSBmcm9tIFwiLi4vLi4vZ2FtZVwiO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgSHVtYW4ge1xuICAgIHN0YXRpYyBodW1hbk51bSA9IDE7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIHByaXZhdGUgX3BvczogUG9zaXRpb247XG4gICAgaG9tZVBvczogUG9zaXRpb247XG4gICAgaHA6IG51bWJlcjtcbiAgICBqb2I6IEpvYjtcbiAgICBjb2xvcjogc3RyaW5nO1xuICAgIGNoYXJhY3RlcjogQ2hhcmFjdGVyO1xuICAgIGlzU2VsZWN0ZWQ6IGJvb2xlYW47XG4gICAgdGFzazogVGFzayB8IG51bGw7XG5cbiAgICBnZXQgcG9zKCk6IFBvc2l0aW9uIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BvcztcbiAgICB9XG5cbiAgICBzZXQgcG9zKG5ld1BvczogUG9zaXRpb24pIHtcbiAgICAgICAgaWYgKG5ld1Bvcy54IDwgMCB8fCBGSUVMRF9TSVpFIDw9IG5ld1Bvcy54XG4gICAgICAgICAgICB8fCBuZXdQb3MueSA8IDAgfHwgRklFTERfU0laRSA8PSBuZXdQb3MueSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQb3NpdGlvbiBtdXN0IGJlIDAgPD0geCA8IEZJRUxEX1NJWkUnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9wb3MgPSBuZXdQb3M7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogMeWNmOS9jeaZgumWk+mBjuOBlOOBmVxuICAgICAqIE1PRElGSUVTIDogdGhpcy5ocCwgdGhpcy50YXNrXG4gICAgICovXG4gICAgYWJzdHJhY3Qgc3BlbmRUaW1lKCk6IHZvaWQ7XG5cbiAgICAvKipcbiAgICAgKiDjg6njg7Pjg4Djg6Djgavjgr/jgrnjgq/jgpLmsbrjgoHjgotcbiAgICAgKi9cbiAgICBhYnN0cmFjdCBkZXRlcm1pbmVUYXNrKCk6IHZvaWQ7XG5cbiAgICAvKipcbiAgICAgKiDnm67nmoTlnLDjgavlkJHjgYvjgaPjgaYx44Oe44K56YCy44KAXG4gICAgICogQHBhcmFtIGRlc3Qg55uu55qE5ZywXG4gICAgICovXG4gICAgaGVhZFRvRGVzdChkZXN0OiBQb3NpdGlvbik6IHZvaWQge1xuICAgICAgICAvLyDnj77lnKjjga7luqfmqJnjgYvjgonnm67nmoTlnLDjga7luqfmqJnjgb7jgafjga7mnIDnn63ntYzot6/jgpJkaWprc3RyYeOBp+axguOCgeOCi1xuICAgICAgICBjb25zdCBkOiBudW1iZXJbXSA9IEFycmF5LmZyb20oeyBsZW5ndGg6IFYgfSkubWFwKG4gPT4gSU5GKTtcbiAgICAgICAgY29uc3QgdXNlZDogYm9vbGVhbltdID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogViB9KS5tYXAobiA9PiBmYWxzZSk7XG4gICAgICAgIGRbRklFTERfU0laRSAqIHRoaXMucG9zLnkgKyB0aGlzLnBvcy54XSA9IDA7XG4gICAgICAgIC8vIOacgOefree1jOi3r+OBruebtOWJjeOBrumggueCuVxuICAgICAgICBjb25zdCBwcmV2UG9zOiBQb3NpdGlvbltdID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogViB9KS5tYXAobiA9PiAoeyB4OiAtMSwgeTogLTEgfSkpO1xuXG4gICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgICBsZXQgdiA9IC0xO1xuXG4gICAgICAgICAgICBmb3IgKGxldCB1ID0gMDsgdSA8IFY7IHUrKykge1xuICAgICAgICAgICAgICAgIGlmICghdXNlZFt1XSAmJiAodiA9PT0gLTEgfHwgZFt1XSA8IGRbdl0pKSB2ID0gdTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHYgPT09IC0xKSBicmVhaztcbiAgICAgICAgICAgIHVzZWRbdl0gPSB0cnVlO1xuXG4gICAgICAgICAgICBmb3IgKGxldCB1ID0gMDsgdSA8IFY7IHUrKykge1xuICAgICAgICAgICAgICAgIGlmIChkW3VdID4gZFt2XSArIGNvc3Rbdl1bdV0pIHtcbiAgICAgICAgICAgICAgICAgICAgZFt1XSA9IE1hdGgubWluKGRbdV0sIGRbdl0gKyBjb3N0W3ZdW3VdKTtcbiAgICAgICAgICAgICAgICAgICAgcHJldlBvc1t1XSA9IHsgeDogdiAlIEZJRUxEX1NJWkUsIHk6IE1hdGguZmxvb3IodiAvIEZJRUxEX1NJWkUpIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gZGVzdOOBi+OCieePvuWcqOWcsGN1clBvc+OBuOOBruacgOefree1jOi3r+OCkuaxguOCgeOCi1xuICAgICAgICBjb25zdCBkZXN0VG9DdXJQb3NQYXRoOiBQb3NpdGlvbltdID0gW107XG4gICAgICAgIGxldCB0OiBQb3NpdGlvbiA9IGRlc3Q7XG4gICAgICAgIGZvciAoOyAhKHQueCA9PT0gLTEgJiYgdC55ID09PSAtMSk7IHQgPSBwcmV2UG9zW0ZJRUxEX1NJWkUgKiB0LnkgKyB0LnhdKSB7XG4gICAgICAgICAgICBkZXN0VG9DdXJQb3NQYXRoLnB1c2godCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnBvcyA9IGRlc3RUb0N1clBvc1BhdGhbZGVzdFRvQ3VyUG9zUGF0aC5sZW5ndGggLSAyXTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgbmFtZTogc3RyaW5nID0gYEh1bWFuJHtIdW1hbi5odW1hbk51bX1gLFxuICAgICAgICBob21lUG9zOiBQb3NpdGlvbiA9IHsgeDogMCwgeTogMCB9LFxuICAgICAgICBocDogbnVtYmVyID0gMTAwLFxuICAgICAgICBqb2I6IEpvYiA9IFwiZmFybWVyXCIsXG4gICAgICAgIGNvbG9yOiBzdHJpbmcgPSBcIiNGRjAwMDBcIixcbiAgICAgICAgY2hhcmFjdGVyOiBDaGFyYWN0ZXIgPSB7IHdpc2RvbTogMC41IH0sXG4gICAgICAgIGlzU2VsZWN0ZWQ6IGJvb2xlYW4gPSBmYWxzZSxcbiAgICApIHtcbiAgICAgICAgaWYgKGhvbWVQb3MueCA8IDAgfHwgRklFTERfU0laRSA8PSBob21lUG9zLnhcbiAgICAgICAgICAgIHx8IGhvbWVQb3MueSA8IDAgfHwgRklFTERfU0laRSA8PSBob21lUG9zLnkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUG9zaXRpb24gbXVzdCBiZSAwIDw9IHggPCBGSUVMRF9TSVpFJyk7XG4gICAgICAgIH1cbiAgICAgICAgSHVtYW4uaHVtYW5OdW0rKztcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5ob21lUG9zID0gaG9tZVBvcztcbiAgICAgICAgdGhpcy5fcG9zID0gaG9tZVBvcztcbiAgICAgICAgdGhpcy5ocCA9IGhwO1xuICAgICAgICB0aGlzLmpvYiA9IGpvYjtcbiAgICAgICAgdGhpcy5jb2xvciA9IGNvbG9yO1xuICAgICAgICB0aGlzLmNoYXJhY3RlciA9IGNoYXJhY3RlcjtcbiAgICAgICAgdGhpcy5pc1NlbGVjdGVkID0gaXNTZWxlY3RlZDtcbiAgICAgICAgdGhpcy50YXNrID0gbnVsbDtcbiAgICB9XG59XG5cbmV4cG9ydCB0eXBlIEpvYiA9ICdmYXJtZXInIHwgJ21lcmNoYW50JztcblxuZXhwb3J0IHR5cGUgQ2hhcmFjdGVyID0ge1xuICAgIHdpc2RvbTogbnVtYmVyO1xufVxuXG4vKipcbiAqIGRpamtzdHJh44Gr5b+F6KaB44Gq5aSJ5pWwXG4gKi9cbmNvbnN0IElORiA9IDEwMDAwMDtcbmNvbnN0IFYgPSBGSUVMRF9TSVpFICogRklFTERfU0laRTtcbi8vIOmao+aOpeihjOWIl1xuY29uc3QgY29zdDogbnVtYmVyW11bXSA9IEFycmF5LmZyb20oeyBsZW5ndGg6IFYgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWFwKG4gPT4gQXJyYXkuZnJvbSh7IGxlbmd0aDogViB9KS5tYXAobiA9PiBJTkYpKTtcbmZvciAobGV0IHkgPSAwOyB5IDwgRklFTERfU0laRTsgeSsrKSB7XG4gICAgZm9yIChsZXQgeCA9IDA7IHggPCBGSUVMRF9TSVpFOyB4KyspIHtcbiAgICAgICAgaWYgKHkgPT0gMCAmJiB4ID09IDApIHtcbiAgICAgICAgICAgIC8vIOW3puS4iuOBrumahVxuICAgICAgICAgICAgY29zdFtGSUVMRF9TSVpFICogeSArIHhdW0ZJRUxEX1NJWkUgKiB5ICsgKHggKyAxKV0gPSAxO1xuICAgICAgICAgICAgY29zdFtGSUVMRF9TSVpFICogeSArIHhdW0ZJRUxEX1NJWkUgKiAoeSArIDEpICsgeF0gPSAxO1xuICAgICAgICB9IGVsc2UgaWYgKHkgPT0gMCAmJiB4ID09IEZJRUxEX1NJWkUgLSAxKSB7XG4gICAgICAgICAgICAvLyDlj7PkuIrjga7pmoVcbiAgICAgICAgICAgIGNvc3RbRklFTERfU0laRSAqIHkgKyB4XVtGSUVMRF9TSVpFICogeSArICh4IC0gMSldID0gMTtcbiAgICAgICAgICAgIGNvc3RbRklFTERfU0laRSAqIHkgKyB4XVtGSUVMRF9TSVpFICogKHkgKyAxKSArIHhdID0gMTtcbiAgICAgICAgfSBlbHNlIGlmICh5ID09IEZJRUxEX1NJWkUgLSAxICYmIHggPT0gMCkge1xuICAgICAgICAgICAgLy8g5bem5LiL44Gu6ZqFXG4gICAgICAgICAgICBjb3N0W0ZJRUxEX1NJWkUgKiB5ICsgeF1bRklFTERfU0laRSAqICh5IC0gMSkgKyB4XSA9IDE7XG4gICAgICAgICAgICBjb3N0W0ZJRUxEX1NJWkUgKiB5ICsgeF1bRklFTERfU0laRSAqIHkgKyAoeCArIDEpXSA9IDE7XG4gICAgICAgIH0gZWxzZSBpZiAoeSA9PSBGSUVMRF9TSVpFIC0gMSAmJiB4ID09IEZJRUxEX1NJWkUgLSAxKSB7XG4gICAgICAgICAgICAvLyDlj7PkuIvjga7pmoVcbiAgICAgICAgICAgIGNvc3RbRklFTERfU0laRSAqIHkgKyB4XVtGSUVMRF9TSVpFICogKHkgLSAxKSArIHhdID0gMTtcbiAgICAgICAgICAgIGNvc3RbRklFTERfU0laRSAqIHkgKyB4XVtGSUVMRF9TSVpFICogeSArICh4IC0gMSldID0gMTtcbiAgICAgICAgfSBlbHNlIGlmICh5ID09IDApIHtcbiAgICAgICAgICAgIC8vIOS4iui+ulxuICAgICAgICAgICAgY29zdFtGSUVMRF9TSVpFICogeSArIHhdW0ZJRUxEX1NJWkUgKiB5ICsgKHggLSAxKV0gPSAxOyAvLyDihpBcbiAgICAgICAgICAgIGNvc3RbRklFTERfU0laRSAqIHkgKyB4XVtGSUVMRF9TSVpFICogKHkgKyAxKSArIHhdID0gMTsgLy8g4oaTXG4gICAgICAgICAgICBjb3N0W0ZJRUxEX1NJWkUgKiB5ICsgeF1bRklFTERfU0laRSAqIHkgKyAoeCArIDEpXSA9IDE7IC8vIOKGklxuICAgICAgICB9IGVsc2UgaWYgKHggPT0gMCkge1xuICAgICAgICAgICAgLy8g5bem6L66XG4gICAgICAgICAgICBjb3N0W0ZJRUxEX1NJWkUgKiB5ICsgeF1bRklFTERfU0laRSAqICh5IC0gMSkgKyB4XSA9IDE7IC8vIOKGkVxuICAgICAgICAgICAgY29zdFtGSUVMRF9TSVpFICogeSArIHhdW0ZJRUxEX1NJWkUgKiB5ICsgKHggKyAxKV0gPSAxOyAvLyDihpJcbiAgICAgICAgICAgIGNvc3RbRklFTERfU0laRSAqIHkgKyB4XVtGSUVMRF9TSVpFICogKHkgKyAxKSArIHhdID0gMTsgLy8g4oaTXG4gICAgICAgIH0gZWxzZSBpZiAoeCA9PSBGSUVMRF9TSVpFIC0gMSkge1xuICAgICAgICAgICAgLy8g5Y+z6L66XG4gICAgICAgICAgICBjb3N0W0ZJRUxEX1NJWkUgKiB5ICsgeF1bRklFTERfU0laRSAqICh5IC0gMSkgKyB4XSA9IDE7IC8vIOKGkVxuICAgICAgICAgICAgY29zdFtGSUVMRF9TSVpFICogeSArIHhdW0ZJRUxEX1NJWkUgKiB5ICsgKHggLSAxKV0gPSAxOyAvLyDihpBcbiAgICAgICAgICAgIGNvc3RbRklFTERfU0laRSAqIHkgKyB4XVtGSUVMRF9TSVpFICogKHkgKyAxKSArIHhdID0gMTsgLy8g4oaTXG4gICAgICAgIH0gZWxzZSBpZiAoeSA9PSBGSUVMRF9TSVpFIC0gMSkge1xuICAgICAgICAgICAgLy8g5LiL6L66XG4gICAgICAgICAgICBjb3N0W0ZJRUxEX1NJWkUgKiB5ICsgeF1bRklFTERfU0laRSAqIHkgKyAoeCAtIDEpXSA9IDE7IC8vIOKGkFxuICAgICAgICAgICAgY29zdFtGSUVMRF9TSVpFICogeSArIHhdW0ZJRUxEX1NJWkUgKiAoeSAtIDEpICsgeF0gPSAxOyAvLyDihpFcbiAgICAgICAgICAgIGNvc3RbRklFTERfU0laRSAqIHkgKyB4XVtGSUVMRF9TSVpFICogeSArICh4ICsgMSldID0gMTsgLy8g4oaSXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb3N0W0ZJRUxEX1NJWkUgKiB5ICsgeF1bRklFTERfU0laRSAqICh5IC0gMSkgKyB4XSA9IDE7IC8vIOKGkVxuICAgICAgICAgICAgY29zdFtGSUVMRF9TSVpFICogeSArIHhdW0ZJRUxEX1NJWkUgKiB5ICsgKHggKyAxKV0gPSAxOyAvLyDihpJcbiAgICAgICAgICAgIGNvc3RbRklFTERfU0laRSAqIHkgKyB4XVtGSUVMRF9TSVpFICogKHkgKyAxKSArIHhdID0gMTsgLy8g4oaTXG4gICAgICAgICAgICBjb3N0W0ZJRUxEX1NJWkUgKiB5ICsgeF1bRklFTERfU0laRSAqIHkgKyAoeCAtIDEpXSA9IDE7IC8vIOKGkFxuICAgICAgICB9XG4gICAgfVxufSIsImltcG9ydCB7IEh1bWFuLCBDaGFyYWN0ZXIgfSBmcm9tIFwiLi9IdW1hblwiO1xuaW1wb3J0IHsgZ2FtZVN0YXRlLCBQb3NpdGlvbiB9IGZyb20gXCIuLi8uLi9nYW1lXCI7XG5pbXBvcnQgeyBUYXNrIH0gZnJvbSBcIi4uL1Rhc2svVGFza1wiO1xuXG5leHBvcnQgY2xhc3MgTWVyY2hhbnQgZXh0ZW5kcyBIdW1hbiB7XG4gICAgLyoqXG4gICAgICogMeWNmOS9jeaZgumWk+mBjuOBlOOBmVxuICAgICAqL1xuICAgIHNwZW5kVGltZSgpOiB2b2lkIHtcbiAgICAgICAgLy8g44K/44K544Kv44KS5a6M5LqG44GX44Gm44GE44KL5aC05ZCI44CB5qyh44Gu44K/44K544Kv44KS5rG644KB44KLXG4gICAgICAgIGlmICghdGhpcy50YXNrKSB7XG4gICAgICAgICAgICB0aGlzLmRldGVybWluZVRhc2soKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIOOCv+OCueOCr+OBq+W+k+OBo+OBpuihjOWLleOBmeOCi1xuICAgICAgICBzd2l0Y2ggKHRoaXMudGFzaz8ud2hhdCkge1xuICAgICAgICAgICAgY2FzZSAnc2xlZXAnOlxuICAgICAgICAgICAgICAgIFRhc2suaGFuZGxlU2xlZXAodGhpcyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICd3YWxraW5nJzpcbiAgICAgICAgICAgICAgICBUYXNrLmhhbmRsZVdhbGtpbmcodGhpcyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUT0RPIDogaHDjgpLmm7TmlrDjgZnjgotcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDjg6njg7Pjg4Djg6Djgavjgr/jgrnjgq/jgpLmsbrjgoHjgotcbiAgICAgKi9cbiAgICBkZXRlcm1pbmVUYXNrKCk6IHZvaWQge1xuICAgICAgICAvLyBUT0RPIOOCv+OCueOCr+OBruaVsOOCkuWil+OChOOBmVxuICAgICAgICAvLyBUT0RPIOOCv+OCueOCr+OCkuePvuWcqOOBruODkeODqeODoeODvOOCv+OBq+W+k+OBo+OBpuaxuuOCgeOCi+OCiOOBhuOBq+WkieabtFxuICAgICAgICBpZiAoMTYgPCBnYW1lU3RhdGUudGltZS5oKSB7XG4gICAgICAgICAgICAvLyDlr53jgotcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi55yg44KK44G+44GZXCIpO1xuICAgICAgICAgICAgdGhpcy50YXNrID0geyB3aGF0OiAnc2xlZXAnLCB3aGVyZTogdGhpcy5ob21lUG9zIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIOaVo+atqeOBmeOCi1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCIoNSwgNSnjgbjlkJHjgYvjgYTjgb7jgZlcIik7XG4gICAgICAgICAgICB0aGlzLnRhc2sgPSB7IHdoYXQ6ICd3YWxraW5nJywgd2hlcmU6IHsgeDogNSwgeTogNSB9IH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBuYW1lOiBzdHJpbmcgPSBgSHVtYW4ke0h1bWFuLmh1bWFuTnVtfWAsXG4gICAgICAgIGhvbWVQb3M6IFBvc2l0aW9uID0geyB4OiAwLCB5OiAwIH0sXG4gICAgICAgIGhwOiBudW1iZXIgPSAxMDAsXG4gICAgICAgIGNvbG9yOiBzdHJpbmcgPSBcIiNGRjAwMDBcIixcbiAgICAgICAgY2hhcmFjdGVyOiBDaGFyYWN0ZXIgPSB7IHdpc2RvbTogMC41IH0sXG4gICAgICAgIGlzU2VsZWN0ZWQ6IGJvb2xlYW4gPSBmYWxzZSxcbiAgICApIHtcbiAgICAgICAgc3VwZXIobmFtZSwgaG9tZVBvcywgaHAsIFwibWVyY2hhbnRcIiwgY29sb3IsIGNoYXJhY3RlciwgaXNTZWxlY3RlZCk7XG4gICAgfVxufSIsImltcG9ydCB7IEh1bWFuIH0gZnJvbSBcIi4uL0h1bWFuL0h1bWFuXCI7XG5pbXBvcnQgeyBnYW1lU3RhdGUsIFBvc2l0aW9uIH0gZnJvbSBcIi4uLy4uL2dhbWVcIjtcblxuLy8gVE9ET++8mlRhc2vjgpLmir3osaHjgq/jg6njgrnjgavjgZfjgabjgIHlgIvliKXjgr/jgrnjgq/jgq/jg6njgrnjgpLkvZzmiJDjgZnjgotcbmV4cG9ydCBjbGFzcyBUYXNrIHtcbiAgICB3aGF0OiAnc2xlZXAnIHwgJ3dhbGtpbmcnO1xuICAgIHdoZXJlOiBQb3NpdGlvbjtcblxuICAgIHN0YXRpYyBoYW5kbGVTbGVlcChodW1hbjogSHVtYW4pOiB2b2lkIHtcbiAgICAgICAgaWYgKDUgPCBnYW1lU3RhdGUudGltZS5oICYmIGdhbWVTdGF0ZS50aW1lLmggPCAxNikge1xuICAgICAgICAgICAgLy8g5pydXG4gICAgICAgICAgICBpZiAoNiA8IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKSlcbiAgICAgICAgICAgICAgICAvLyDkuIDlrprnorrnjofjgafotbfjgY3jgotcbiAgICAgICAgICAgICAgICBodW1hbi50YXNrID0gbnVsbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIOWknFxuICAgICAgICAgICAgaWYgKGh1bWFuLnBvcy54ID09PSBodW1hbi5ob21lUG9zLnggJiYgaHVtYW4ucG9zLnkgPT09IGh1bWFuLmhvbWVQb3MueSkge1xuICAgICAgICAgICAgICAgIC8vIOWutuOBq+OBhOOCjOOBsOWvneOBn+OBvuOBvuS9leOCguOBl+OBquOBhFxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8g5Ye65YWI44Gq44Gu44Gn44CB5a6244Gr5biw44KLXG4gICAgICAgICAgICAgICAgaHVtYW4uaGVhZFRvRGVzdChodW1hbi5ob21lUG9zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBoYW5kbGVXYWxraW5nKGh1bWFuOiBIdW1hbik6IHZvaWQge1xuICAgICAgICBpZiAoIWh1bWFuLnRhc2spIHJldHVybjtcbiAgICAgICAgaWYgKGh1bWFuLnBvcy54ID09PSBodW1hbi50YXNrLndoZXJlLnggJiYgaHVtYW4ucG9zLnkgPT09IGh1bWFuLnRhc2sud2hlcmUueSkge1xuICAgICAgICAgICAgLy8g55uu55qE5Zyw44Gr5Yiw552A44GX44Gf44Gu44Gn44K/44K544Kv44KS57WC5LqGXG4gICAgICAgICAgICBodW1hbi50YXNrID0gbnVsbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIOebrueahOWcsOOBq+WQkeOBi+OBhlxuICAgICAgICAgICAgaHVtYW4uaGVhZFRvRGVzdChodW1hbi50YXNrLndoZXJlKTtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJpbXBvcnQgeyBnYW1lU3RhdGUsIEZJRUxEX1NJWkUgfSBmcm9tIFwiLi4vZ2FtZVwiO1xuaW1wb3J0IHsgSG91c2UgfSBmcm9tIFwiLi4vY2xhc3MvQXNzZXQvSG91c2VcIjtcbmltcG9ydCB7IEh1bWFuIH0gZnJvbSBcIi4uL2NsYXNzL0h1bWFuL0h1bWFuXCI7XG5pbXBvcnQgeyBpc05pZ2h0IH0gZnJvbSBcIi4vdXRpbHNcIjtcblxuLyoqXG4gKiBnYW1lU3RhdGXjgavlvpPjgaPjgabnm6TpnaLjgpLmm7TmlrDjgZnjgotcbiAqIOmBuOaKnuS4reOBruS6uuOBruS4iuOBq+OBr+WQueOBjeWHuuOBl+OCkuihqOekuuOBmeOCi1xuICovXG5leHBvcnQgZnVuY3Rpb24gZHJhd0ZpZWxkKCk6IHZvaWQge1xuICAgIC8vIOebpOmdouOCkuODquOCu+ODg+ODiOOBmeOCi1xuICAgIHJlc2V0RmllbGQoKTtcblxuICAgIC8vIOS6uuOCkuaPj+eUu1xuICAgIGdhbWVTdGF0ZS5odW1hbnMuZm9yRWFjaCgoaHVtYW4pID0+IHtcbiAgICAgICAgY29uc3QgeyB4LCB5IH0gPSBodW1hbi5wb3M7XG4gICAgICAgIGNvbnN0IHNxdWFyZUVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzcXVhcmUtXCIgKyAoRklFTERfU0laRSAqIHkgKyB4KSk7XG4gICAgICAgIGlmICghc3F1YXJlRWwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgc3F1YXJlLSR7RklFTERfU0laRSAqIHkgKyB4fSB3YXMgbm90IGZvdW5kLmApO1xuICAgICAgICB9XG4gICAgICAgIC8vIOODnuOCueOBruaWh+Wtl+WIl+OCkuabtOaWsFxuICAgICAgICBzcXVhcmVFbC50ZXh0Q29udGVudCA9IFwi4peLXCI7XG4gICAgICAgIC8vIOS6uuOBjOmBuOaKnuS4reOBquOCieODnuOCueOBruS4iuOBq+WQueOBjeWHuuOBl+OCkuihqOekuuOBmeOCi1xuICAgICAgICBpZiAoaHVtYW4uaXNTZWxlY3RlZCkge1xuICAgICAgICAgICAgY29uc3QgYmFsbG9vbkVsID0gY3JlYXRlQmFsbG9vbihodW1hbik7XG4gICAgICAgICAgICBzcXVhcmVFbC5hcHBlbmRDaGlsZChiYWxsb29uRWwpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyDjgqLjgrvjg4Pjg4jjgpLmj4/nlLtcbiAgICBnYW1lU3RhdGUuYXNzZXRzLmZvckVhY2goKGFzc2V0KSA9PiB7XG4gICAgICAgIGNvbnN0IHsgeCwgeSB9ID0gYXNzZXQucG9zO1xuICAgICAgICBjb25zdCBzcXVhcmVFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3F1YXJlLVwiICsgKEZJRUxEX1NJWkUgKiB5ICsgeCkpO1xuICAgICAgICBpZiAoIXNxdWFyZUVsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYHNxdWFyZS0ke0ZJRUxEX1NJWkUgKiB5ICsgeH0gd2FzIG5vdCBmb3VuZC5gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChhc3NldCBpbnN0YW5jZW9mIEhvdXNlKSB7XG4gICAgICAgICAgICAvLyDjgq/jg6njgrnjgpLjg6rjgrvjg4Pjg4jjgZnjgotcbiAgICAgICAgICAgIHNxdWFyZUVsLmNsYXNzTGlzdC5yZW1vdmUoYXNzZXQuY2xhc3NOYW1lKTtcbiAgICAgICAgICAgIC8vIOmBqeWIh+OBqueUu+WDj+ihqOekuuOBruOBn+OCgeOAgeeKtuazgeOBq+W/nOOBmOOBn+OCr+ODqeOCueOCkuS7mOS4juOBmeOCi1xuICAgICAgICAgICAgLy8gVE9ET++8muaZgumWk+OChOeKtuazgeOBq+W/nOOBmOOBn2NsYXNzTmFtZeOCkuWGjeaknOiojuOBmeOCi1xuICAgICAgICAgICAgLy8gVE9ET++8muWvneOBpuOBhOOCi+OBqOOBjeOBr25pZ2h0LWhvdXNl44Gr44GZ44KLXG4gICAgICAgICAgICBpZiAoYXNzZXQub3duZXIucG9zLnggPT09IHggJiYgYXNzZXQub3duZXIucG9zLnkgPT09IHkpIHtcbiAgICAgICAgICAgICAgICAvLyDmiYDmnInogIXjgYzlrrbjgavjgYTjgovloLTlkIhcbiAgICAgICAgICAgICAgICBpZiAoaXNOaWdodCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGFzc2V0LmNsYXNzTmFtZSA9ICdldmVuaW5nLWhvdXNlJztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBhc3NldC5jbGFzc05hbWUgPSAnbm9ybWFsLWhvdXNlJztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyDnlLvlg4/jgpLooajnpLrjgZnjgovjgZ/jgoHjgavjg57jgrnjga7mloflrZfliJfjgpLmtojjgZlcbiAgICAgICAgICAgICAgICBzcXVhcmVFbC50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIOaJgOacieiAheOBjOWutuOBq+OBhOOBquOBhOWgtOWQiFxuICAgICAgICAgICAgICAgIGlmIChpc05pZ2h0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgYXNzZXQuY2xhc3NOYW1lID0gJ25pZ2h0LWhvdXNlJztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBhc3NldC5jbGFzc05hbWUgPSAnbm9ybWFsLWhvdXNlJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzcXVhcmVFbC5jbGFzc0xpc3QuYWRkKGFzc2V0LmNsYXNzTmFtZSk7XG4gICAgICAgICAgICBjb25zdCBpbWdFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gICAgICAgICAgICBzcXVhcmVFbC5hcHBlbmRDaGlsZChpbWdFbCk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuLyoqXG4gKiDnm6TpnaLjgpLjg6rjgrvjg4Pjg4jjgZnjgovvvIjjgZnjgbnjgabjga7jg57jgrnjgpLnqbrmloflrZfliJfjgavjgZnjgovvvIlcbiAqL1xuZnVuY3Rpb24gcmVzZXRGaWVsZCgpOiB2b2lkIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IEZJRUxEX1NJWkU7IGkrKykge1xuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IEZJRUxEX1NJWkU7IGorKykge1xuICAgICAgICAgICAgY29uc3Qgc3F1YXJlRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNxdWFyZS1cIiArIChGSUVMRF9TSVpFICogaSArIGopKTtcbiAgICAgICAgICAgIGlmICghc3F1YXJlRWwpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBzcXVhcmUtJHtGSUVMRF9TSVpFICogaSArIGp9IHdhcyBub3QgZm91bmQuYCk7XG4gICAgICAgICAgICAvLyDlkITjg57jgrnjga7mloflrZfliJfjgpLjgYvjgonmloflrZfliJfjgavjg6rjgrvjg4Pjg4hcbiAgICAgICAgICAgIHNxdWFyZUVsLnRleHRDb250ZW50ID0gXCJcIjtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLyoqXG4gKiDooajnpLrjgZXjgozjgabjgYTjgovmmYLliLvjgpLmm7TmlrDjgZnjgotcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRyYXdUaW1lKCk6IHZvaWQge1xuICAgIGNvbnN0IHRpbWVFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGltZUxhYmVsXCIpO1xuICAgIGlmICghdGltZUVsKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgdGltZUxhYmVsIHdhcyBub3QgZm91bmQuYCk7XG4gICAgfVxuICAgIHRpbWVFbC50ZXh0Q29udGVudCA9IGDnj77lnKjjga7mmYLliLsgJHtnYW1lU3RhdGUudGltZS5ofSA6ICR7Z2FtZVN0YXRlLnRpbWUubX1gO1xufVxuXG4vKipcbiAqIOS6uuOBruaDheWgseOCkuihqOekuuOBmeOCi+WQueOBjeWHuuOBl+imgee0oOOCkui/lOOBmVxuICogQHBhcmFtIGh1bWFuIOaDheWgseOCkuihqOekuuOBmeOCi+WvvuixoVxuICogQHJldHVybnMg5ZC544GN5Ye644GX44GuPGRpdj7opoHntKBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUJhbGxvb24oaHVtYW46IEh1bWFuKTogSFRNTERpdkVsZW1lbnQge1xuICAgIGNvbnN0IGRpdkVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBkaXZFbC5jbGFzc05hbWUgPSBcImFib3ZlLXNxdWFyZVwiO1xuICAgIGNvbnN0IGJhbGxvb25FbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgYmFsbG9vbkVsLmNsYXNzTmFtZSA9IFwiYmFsbG9vbjJcIjtcbiAgICBjb25zdCBtZXNzYWdlRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICBtZXNzYWdlRWwuaW5uZXJUZXh0ID1cbiAgICAgICAgYOWQjeWJje+8miR7aHVtYW4ubmFtZX1cbiAgICBIUO+8miR7aHVtYW4uaHB9XG4gICAg5b256IG377yaJHtodW1hbi5qb2J9XG4gICAg5oCn5qC877yaJHtodW1hbi5jaGFyYWN0ZXJ9YDtcbiAgICBiYWxsb29uRWwuYXBwZW5kQ2hpbGQobWVzc2FnZUVsKTtcbiAgICBkaXZFbC5hcHBlbmRDaGlsZChiYWxsb29uRWwpO1xuXG4gICAgcmV0dXJuIGRpdkVsO1xufSIsImltcG9ydCB7IGdhbWVTdGF0ZSwgSFRNTEV2ZW50LCBGSUVMRF9TSVpFIH0gZnJvbSBcIi4uL2dhbWVcIjtcbmltcG9ydCB7IEh1bWFuLCBKb2IgfSBmcm9tIFwiLi4vY2xhc3MvSHVtYW4vSHVtYW5cIjtcbmltcG9ydCB7IEZhcm1lciB9IGZyb20gXCIuLi9jbGFzcy9IdW1hbi9GYXJtZXJcIjtcbmltcG9ydCB7IE1lcmNoYW50IH0gZnJvbSBcIi4uL2NsYXNzL0h1bWFuL01lcmNoYW50XCI7XG5pbXBvcnQgeyBIb3VzZSB9IGZyb20gXCIuLi9jbGFzcy9Bc3NldC9Ib3VzZVwiO1xuaW1wb3J0IHsgZHJhd0ZpZWxkIH0gZnJvbSBcIi4vZHJhd1wiO1xuaW1wb3J0IHsgZXhpdEFkZEh1bWFuTW9kZSwgZW50ZXJBZGRIdW1hbk1vZGUsIGV4aXRTZWxlY3RIdW1hbk1vZGUgfSBmcm9tIFwiLi9oYW5kbGVNb2RlXCI7XG5pbXBvcnQgeyBnZXRIdW1hbnNGcm9tUG9zIH0gZnJvbSBcIi4vdXRpbHNcIjtcblxuLyoqXG4gKiBTcXVhcmXjgYzjgq/jg6rjg4Pjgq/jgZXjgozjgZ/jgajjgY3jgavlkbzjgbDjgozjgIHnj77lnKjjga7jg6Ljg7zjg4njgavlvpPjgaPjgablh6bnkIbjgpLooYzjgYZcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZUNsaWNrU3F1YXJlKHg6IG51bWJlciwgeTogbnVtYmVyKTogdm9pZCB7XG4gICAgc3dpdGNoIChnYW1lU3RhdGUubW9kZS5pZCkge1xuICAgICAgICBjYXNlICduZXV0cmFsJzpcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKEZJRUxEX1NJWkUgKiB5ICsgeCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnYWRkSHVtYW4nOlxuICAgICAgICAgICAgLy8g5oyH5a6a44Gu5aC05omA44Gr5Lq644KS6L+95Yqg44GZ44KLXG4gICAgICAgICAgICBsZXQgbmV3SHVtYW46IEh1bWFuO1xuICAgICAgICAgICAgaWYgKGdhbWVTdGF0ZS5tb2RlLmpvYiA9PT0gXCJmYXJtZXJcIikge1xuICAgICAgICAgICAgICAgIG5ld0h1bWFuID0gbmV3IEZhcm1lcigpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChnYW1lU3RhdGUubW9kZS5qb2IgPT09IFwibWVyY2hhbnRcIikge1xuICAgICAgICAgICAgICAgIG5ld0h1bWFuID0gbmV3IE1lcmNoYW50KCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG5ld0h1bWFuID0gbmV3IEZhcm1lcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbmV3SHVtYW4uaG9tZVBvcyA9IHsgeCwgeSB9O1xuICAgICAgICAgICAgbmV3SHVtYW4ucG9zID0geyB4LCB5IH07XG4gICAgICAgICAgICBhZGRIdW1hbihuZXdIdW1hbik7XG4gICAgICAgICAgICAvLyDnm6TpnaLjgpLmm7TmlrDjgZnjgotcbiAgICAgICAgICAgIGRyYXdGaWVsZCgpO1xuICAgICAgICAgICAgLy8g44OS44OI6L+95Yqg44Oi44O844OJ44KS5oqc44GR44KLXG4gICAgICAgICAgICBleGl0QWRkSHVtYW5Nb2RlKCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnc2VsZWN0SHVtYW4nOlxuICAgICAgICAgICAgY29uc3QgaHVtYW5zID0gZ2V0SHVtYW5zRnJvbVBvcyh7IHgsIHkgfSk7XG4gICAgICAgICAgICAvLyDmjIflrprjga7loLTmiYDjgavkurrjgYzjgYTjgarjgZHjgozjgbDkvZXjgoLjgZfjgarjgYRcbiAgICAgICAgICAgIGlmIChodW1hbnMubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyDmjIflrprjga7loLTmiYDjga7kurrjga7pgbjmip7nirbmhYvjgpLlj43ou6LjgZXjgZvjgotcbiAgICAgICAgICAgIC8vIO+8iOikh+aVsOS6uuOBruWgtOWQiOOBr+ODquOCueODiOOBruWFiOmgre+8iVxuICAgICAgICAgICAgaHVtYW5zWzBdLmlzU2VsZWN0ZWQgPSAhaHVtYW5zWzBdLmlzU2VsZWN0ZWQ7XG4gICAgICAgICAgICAvLyDnm6TpnaLjgpLmm7TmlrDjgZnjgotcbiAgICAgICAgICAgIGRyYXdGaWVsZCgpO1xuICAgICAgICAgICAgLy8g6YG45oqe44Oi44O844OJ44KS5oqc44GR44KLXG4gICAgICAgICAgICBleGl0U2VsZWN0SHVtYW5Nb2RlKCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICB9XG59XG5cbi8qKlxuICogZ2FtZVN0YXRl44Gr5Lq644Go5a6244KS6L+95YqgXG4gKi9cbmZ1bmN0aW9uIGFkZEh1bWFuKG5ld0h1bWFuOiBIdW1hbikge1xuICAgIGNvbnN0IHsgeCwgeSB9ID0gbmV3SHVtYW4ucG9zO1xuICAgIC8vIOS6uuOCkui/veWKoFxuICAgIGdhbWVTdGF0ZS5odW1hbnMucHVzaChuZXdIdW1hbik7XG4gICAgLy8g5a6244KS6L+95YqgXG4gICAgZ2FtZVN0YXRlLmFzc2V0cy5wdXNoKFxuICAgICAgICBuZXcgSG91c2UoeyB4LCB5IH0sIG5ld0h1bWFuKVxuICAgICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoYW5kbGVBZGRIdW1hbkNsaWNrKCk6IHZvaWQge1xuICAgIGNvbnNvbGUubG9nKFwiaG9nZVwiKTtcbiAgICBjb25zdCByYWRpb0lucHV0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlOYW1lKFwidHlwZUZvcm1cIikgYXMgTm9kZUxpc3RPZjxIVE1MSW5wdXRFbGVtZW50PjtcbiAgICBsZXQgam9iOiBKb2IgfCBudWxsID0gbnVsbDtcbiAgICByYWRpb0lucHV0cy5mb3JFYWNoKChyYWRpbzogSFRNTElucHV0RWxlbWVudCkgPT4ge1xuICAgICAgICBpZiAocmFkaW8uY2hlY2tlZCkge1xuICAgICAgICAgICAgam9iID0gcmFkaW8udmFsdWUgYXMgSm9iO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAoIWpvYikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJqb2IgaXMgbm90IHNlbGVjdGVkLiBDYW4ndCBlbnRlciBhZGQtaHVtYW4gbW9kZS5cIik7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKGpvYik7XG5cbiAgICBlbnRlckFkZEh1bWFuTW9kZShqb2IpO1xufSIsImltcG9ydCB7IEpvYiB9IGZyb20gXCIuLi9jbGFzcy9IdW1hbi9IdW1hblwiO1xuaW1wb3J0IHsgRklFTERfU0laRSwgZ2FtZVN0YXRlIH0gZnJvbSBcIi4uL2dhbWVcIjtcblxuZXhwb3J0IHR5cGUgSW50ZXJmYWNlTW9kZSA9IHtcbiAgICBpZDogJ25ldXRyYWwnO1xuICB9IHwge1xuICAgIGlkOiAnYWRkSHVtYW4nO1xuICAgIGpvYjogSm9iO1xuICB9IHwge1xuICAgIGlkOiAnc2VsZWN0SHVtYW4nO1xuICB9O1xuLyoqXG4gKiDkvY3nva7jga7pgbjmip7jg6Ljg7zjg4njgavpgbfnp7vjgZfjgIFTcXVhcmXkuIrjgafjg5vjg5Djg7zjgZnjgovjgajoibLjgYzlpInjgo/jgovjgojjgYbjgavjgarjgotcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGVudGVyQWRkSHVtYW5Nb2RlKGpvYjogSm9iKTogdm9pZCB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBGSUVMRF9TSVpFOyBpKyspIHtcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBGSUVMRF9TSVpFOyBqKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHNxdWFyZUVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzcXVhcmUtXCIgKyAoRklFTERfU0laRSAqIGkgKyBqKSk7XG4gICAgICAgICAgICBpZiAoIXNxdWFyZUVsKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgc3F1YXJlLSR7RklFTERfU0laRSAqIGkgKyBqfSB3YXMgbm90IGZvdW5kLmApO1xuICAgICAgICAgICAgLy8g44Ob44OQ44O85pmC44Gr6Imy44GM5aSJ44KP44KL44KI44GG44Gr44Kv44Op44K544KS6L+95YqgXG4gICAgICAgICAgICBzcXVhcmVFbC5jbGFzc0xpc3QuYWRkKCdodW1hbi1hZGQtbW9kZScpXG4gICAgICAgICAgICAvLyDpgbjmip7jg6Ljg7zjg4njgavpgbfnp7vjgZnjgotcbiAgICAgICAgICAgIGdhbWVTdGF0ZS5tb2RlID0geyBpZDogJ2FkZEh1bWFuJywgam9iIH07XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8qKlxuICog44OL44Ol44O844OI44Op44Or44Oi44O844OJ44Gr6YG356e744GX44CBU3F1YXJl5LiK44Gn44Ob44OQ44O844GX44Gm44KC6Imy44GM5aSJ44KP44KJ44Gq44GE44KI44GG44Gr44GZ44KLXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBleGl0QWRkSHVtYW5Nb2RlKCk6IHZvaWQge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgRklFTERfU0laRTsgaSsrKSB7XG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgRklFTERfU0laRTsgaisrKSB7XG4gICAgICAgICAgICBjb25zdCBzcXVhcmVFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3F1YXJlLVwiICsgKEZJRUxEX1NJWkUgKiBpICsgaikpO1xuICAgICAgICAgICAgaWYgKCFzcXVhcmVFbClcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYHNxdWFyZS0ke0ZJRUxEX1NJWkUgKiBpICsgan0gd2FzIG5vdCBmb3VuZC5gKTtcbiAgICAgICAgICAgIC8qIOODm+ODkOODvOaZguOBq+iJsuOBjOWkieOCj+OCi+OCr+ODqeOCueOCkumZpOWOuyAqL1xuICAgICAgICAgICAgc3F1YXJlRWwuY2xhc3NMaXN0LnJlbW92ZSgnaHVtYW4tYWRkLW1vZGUnKVxuICAgICAgICAgICAgLyog44OL44Ol44O844OI44Op44Or44Oi44O844OJ44Gr6YG356e744GZ44KLICovXG4gICAgICAgICAgICBnYW1lU3RhdGUubW9kZSA9IHsgaWQ6ICduZXV0cmFsJyB9O1xuICAgICAgICB9XG4gICAgfVxufVxuXG4vKipcbiAqIOWQueOBjeWHuuOBl+OCkuihqOekuuOBmeOCi+S6uuOCkumBuOaKnuOBmeOCi+ODouODvOODieOBq+mBt+enu+OBmeOCi1xuICovXG5leHBvcnQgZnVuY3Rpb24gZW50ZXJTZWxlY3RIdW1hbk1vZGUoKTogdm9pZCB7XG4gICAgZ2FtZVN0YXRlLm1vZGUgPSB7IGlkOiAnc2VsZWN0SHVtYW4nIH07XG59XG5cbi8qKlxuICog44OL44Ol44O844OI44Op44Or44Oi44O844OJ44Gr6YG356e744GZ44KLXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBleGl0U2VsZWN0SHVtYW5Nb2RlKCk6IHZvaWQge1xuICAgIGdhbWVTdGF0ZS5tb2RlID0geyBpZDogJ25ldXRyYWwnIH07XG59IiwiaW1wb3J0IHsgUG9zaXRpb24sIGdhbWVTdGF0ZSB9IGZyb20gXCIuLi9nYW1lXCI7XG5pbXBvcnQgeyBIdW1hbiB9IGZyb20gXCIuLi9jbGFzcy9IdW1hbi9IdW1hblwiO1xuaW1wb3J0IHsgRklFTERfU0laRSB9IGZyb20gXCIuLi9nYW1lXCI7XG5cbi8qKlxuICog44GC44KL5bqn5qiZ44Gr44GE44KL5Lq644Gu5qSc57Si44GX44CB6YWN5YiX44Gr44GX44Gm6L+U44GZXG4gKiBAcGFyYW0gcG9zIOW6p+aomVxuICogQHJldHVybnMg44Gd44Gu5bqn5qiZ44Gr44GE44KL5Lq644Gu6YWN5YiXXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRIdW1hbnNGcm9tUG9zKHBvczogUG9zaXRpb24pOiBIdW1hbltdIHtcbiAgICBjb25zdCByZXRIdW1hbnM6IEh1bWFuW10gPSBbXTtcbiAgICBnYW1lU3RhdGUuaHVtYW5zLmZvckVhY2goKGh1bWFuKSA9PiB7XG4gICAgICAgIGlmIChodW1hbi5wb3MueCA9PSBwb3MueCAmJiBodW1hbi5wb3MueSA9PSBwb3MueSkge1xuICAgICAgICAgICAgcmV0SHVtYW5zLnB1c2goaHVtYW4pO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHJldEh1bWFucztcbn1cblxuLyoqXG4gKiBnYW1lU3RhdGUudGltZeOBq+W+k+OBo+OBpuWknOOBi+WQpuOBi+OCkui/lOOBmVxuICogQHJldHVybnMg5aSc44Gn44GC44KL44GL5ZCm44GLXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc05pZ2h0KCk6IGJvb2xlYW4ge1xuICAgIGlmIChnYW1lU3RhdGUudGltZS5oID49IDE4IHx8IGdhbWVTdGF0ZS50aW1lLmggPD0gNikge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuXG4vKipcbiAqIOODqeODs+ODgOODoOOBquS9jee9ruOCkueUn+aIkOOBl+OAgei/lOOBmVxuICogQHJldHVybnMgW3gsIHldXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVSYW5kb21Qb3MoKTogUG9zaXRpb24ge1xuICAgIGNvbnN0IHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBGSUVMRF9TSVpFKTtcbiAgICBjb25zdCB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogRklFTERfU0laRSk7XG4gICAgcmV0dXJuIHsgeCwgeSB9O1xufSIsImltcG9ydCB7IEludGVyZmFjZU1vZGUgfSBmcm9tIFwiLi9mdW5jdGlvbi9oYW5kbGVNb2RlXCI7XG5pbXBvcnQgeyBKb2IsIEh1bWFuIH0gZnJvbSBcIi4vY2xhc3MvSHVtYW4vSHVtYW5cIjtcbmltcG9ydCB7IEFzc2V0IH0gZnJvbSBcIi4vY2xhc3MvQXNzZXQvQXNzZXRcIjtcblxuLyog55uk6Z2i44Gu44K144Kk44K6ICovXG5leHBvcnQgY29uc3QgRklFTERfU0laRSA9IDg7XG5cbmV4cG9ydCBsZXQgZ2FtZVN0YXRlOiBHYW1lU3RhdGUgPSB7XG4gICAgdGltZTogeyBkOiAxLCBoOiAxNCwgbTogMzAgfSxcbiAgICBtb2RlOiB7IGlkOiBcIm5ldXRyYWxcIiB9LFxuICAgIGh1bWFuczogW10sXG4gICAgYXNzZXRzOiBbXSxcbn1cblxuLy8gPT09PT09PT09PT09PT09PT0gdHlwZSA9PT09PT09PT09PT09PT09XG5cbmV4cG9ydCB0eXBlIEdhbWVTdGF0ZSA9IHtcbiAgICB0aW1lOiBUaW1lO1xuICAgIG1vZGU6IEludGVyZmFjZU1vZGU7XG4gICAgaHVtYW5zOiBIdW1hbltdO1xuICAgIGFzc2V0czogQXNzZXRbXTtcbn1cblxudHlwZSBUaW1lID0ge1xuICAgIGQ6IG51bWJlcjtcbiAgICBoOiBudW1iZXI7XG4gICAgbTogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEhUTUxFdmVudDxUIGV4dGVuZHMgRXZlbnRUYXJnZXQ+IGV4dGVuZHMgRXZlbnQge1xuICAgIHRhcmdldDogVDtcbn1cblxuZXhwb3J0IHR5cGUgUG9zaXRpb24gPSB7XG4gICAgeDogbnVtYmVyLFxuICAgIHk6IG51bWJlcixcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGRyYXdGaWVsZCwgZHJhd1RpbWUgfSBmcm9tIFwiLi9mdW5jdGlvbi9kcmF3XCI7XHJcbmltcG9ydCB7IGhhbmRsZUFkZEh1bWFuQ2xpY2ssIGhhbmRsZUNsaWNrU3F1YXJlIH0gZnJvbSBcIi4vZnVuY3Rpb24vaGFuZGxlQWN0aW9uXCI7XHJcbmltcG9ydCB7IGVudGVyU2VsZWN0SHVtYW5Nb2RlIH0gZnJvbSBcIi4vZnVuY3Rpb24vaGFuZGxlTW9kZVwiO1xyXG5pbXBvcnQgeyBGSUVMRF9TSVpFLCBnYW1lU3RhdGUgfSBmcm9tIFwiLi9nYW1lXCI7XHJcblxyXG5sZXQgaW50ZXJ2YWxJZDogbnVtYmVyO1xyXG5sZXQgaXNMb29waW5nOiBib29sZWFuO1xyXG5cclxuLy8g44Oa44O844K444GM6Kqt44G/6L6844G+44KM44Gf44Go44GN44Gu5Yem55CGXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIChlKSA9PiB7XHJcbiAgICAvLyAx56eS44GU44Go44GraW50ZXJ2YWxGdW5j44KS5a6f6KGM44GZ44KL44KI44GG44Gr6Kit5a6aXHJcbiAgICBpbnRlcnZhbElkID0gc2V0SW50ZXJ2YWwoaW50ZXJ2YWxGdW5jLCAxMDAwKTtcclxuICAgIGlzTG9vcGluZyA9IHRydWU7XHJcblxyXG4gICAgLy8g44Kk44OZ44Oz44OI44OP44Oz44OJ44Op44O844KS55m76YyyXHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlbGVjdEh1bWFuQnV0dG9uXCIpPy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZW50ZXJTZWxlY3RIdW1hbk1vZGUpO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzd2l0Y2hJbnRlcnZhbEJ1dHRvblwiKT8uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHN3aXRjaEludGVydmFsKTtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWRkSHVtYW5CdXR0b25cIik/LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVBZGRIdW1hbkNsaWNrKTtcclxuXHJcbiAgICAvLyDmj4/nlLtcclxuICAgIGNyZWF0ZUZpZWxkKCk7XHJcbiAgICBkcmF3RmllbGQoKTtcclxuICAgIGRyYXdUaW1lKCk7XHJcbn0pO1xyXG5cclxuLyoqXHJcbiAqIDHljZjkvY3mmYLplpPjgZTjgajjgavlkbzjgbDjgozjgovplqLmlbBcclxuICovXHJcbmZ1bmN0aW9uIGludGVydmFsRnVuYygpOiB2b2lkIHtcclxuICAgIC8vIDHljZjkvY3mmYLplpPjgZTjgajjgavnm6TpnaLjgpLmm7TmlrDjgZnjgotcclxuICAgIGdhbWVTdGF0ZS5odW1hbnMuZm9yRWFjaCgoaHVtYW4pID0+IGh1bWFuLnNwZW5kVGltZSgpKTtcclxuICAgIC8vIOaZgumWk+OCkjEw5YiG6YCy44KB44KLXHJcbiAgICBnYW1lU3RhdGUudGltZS5oID0gKGdhbWVTdGF0ZS50aW1lLmggKyAxKSAlIDI0O1xyXG4gICAgLy8g55uk6Z2i44Gq44Gp44KS5pu05pawXHJcbiAgICBkcmF3RmllbGQoKTtcclxuICAgIGRyYXdUaW1lKCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDjgqTjg7Pjgr/jg7zjg5Djg6vjga7jgqrjg7Mv44Kq44OV44KS5YiH44KK5pu/44GI44KLXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc3dpdGNoSW50ZXJ2YWwoKTogdm9pZCB7XHJcbiAgICBpZiAoaXNMb29waW5nKSB7XHJcbiAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbElkKTtcclxuICAgICAgICBpc0xvb3BpbmcgPSBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaW50ZXJ2YWxJZCA9IHNldEludGVydmFsKGludGVydmFsRnVuYywgMTAwMCk7XHJcbiAgICAgICAgaXNMb29waW5nID0gdHJ1ZTtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEZJRUxEX1NJWkUgKiBGSUVMRF9TSVpFIOOBruebpOmdouOCkuS9nOaIkOOBmeOCi1xyXG4gKi9cclxuZnVuY3Rpb24gY3JlYXRlRmllbGQoKTogdm9pZCB7XHJcbiAgICBjb25zdCBmaWVsZEVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmaWVsZFwiKTtcclxuICAgIGlmICghZmllbGRFbCkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignPGRpdiBpZD1cImZpZWxkXCI+PC9kaXY+IGlzIG51bGwuJyk7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBGSUVMRF9TSVpFOyBpKyspIHtcclxuICAgICAgICAvLyDooYzjga7opoHntKDjgpLkvZzmiJBcclxuICAgICAgICBjb25zdCBsaW5lRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgIGxpbmVFbC5jbGFzc05hbWUgPSBcImJvYXJkLXJvd1wiO1xyXG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgRklFTERfU0laRTsgaisrKSB7XHJcbiAgICAgICAgICAgIC8vIOWQhOihjOOBruWIl+OBruimgee0oOOCkuS9nOaIkFxyXG4gICAgICAgICAgICBjb25zdCBzcXVhcmVFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgICAgICAgICAgIHNxdWFyZUVsLmNsYXNzTmFtZSA9IFwic3F1YXJlXCI7XHJcbiAgICAgICAgICAgIHNxdWFyZUVsLmlkID0gXCJzcXVhcmUtXCIgKyAoRklFTERfU0laRSAqIGkgKyBqKTtcclxuICAgICAgICAgICAgc3F1YXJlRWwub25jbGljayA9ICgpID0+IGhhbmRsZUNsaWNrU3F1YXJlKGosIGkpO1xyXG4gICAgICAgICAgICAvLyDooYzjga7lrZDopoHntKDjgavjgZnjgotcclxuICAgICAgICAgICAgbGluZUVsLmFwcGVuZENoaWxkKHNxdWFyZUVsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g6KGM44Gu6KaB57Sg44KS5a2Q6KaB57Sg44Gr44GZ44KLXHJcbiAgICAgICAgZmllbGRFbC5hcHBlbmRDaGlsZChsaW5lRWwpO1xyXG4gICAgfVxyXG59XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==