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
    constructor(what, where) {
        if (where.x < 0 || _game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE <= where.x
            || where.y < 0 || _game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE <= where.y) {
            throw new Error('Position must be 0 <= x < FIELD_SIZE');
        }
        this.what = what;
        this.where = where;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDLDZDQUFVLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLDZDQUFVLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZELElBQUksQ0FBQyw2Q0FBVSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyw2Q0FBVSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMzRCxDQUFDO2FBQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSw2Q0FBVSxHQUFHLENBQUMsRUFBRSxDQUFDO1lBQ3ZDLE9BQU87WUFDUCxJQUFJLENBQUMsNkNBQVUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsNkNBQVUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDdkQsSUFBSSxDQUFDLDZDQUFVLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLDZDQUFVLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzNELENBQUM7YUFBTSxJQUFJLENBQUMsSUFBSSw2Q0FBVSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDdkMsT0FBTztZQUNQLElBQUksQ0FBQyw2Q0FBVSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyw2Q0FBVSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN2RCxJQUFJLENBQUMsNkNBQVUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsNkNBQVUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDM0QsQ0FBQzthQUFNLElBQUksQ0FBQyxJQUFJLDZDQUFVLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSw2Q0FBVSxHQUFHLENBQUMsRUFBRSxDQUFDO1lBQ3BELE9BQU87WUFDUCxJQUFJLENBQUMsNkNBQVUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsNkNBQVUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDdkQsSUFBSSxDQUFDLDZDQUFVLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLDZDQUFVLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzNELENBQUM7YUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUNoQixLQUFLO1lBQ0wsSUFBSSxDQUFDLDZDQUFVLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLDZDQUFVLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSTtZQUM1RCxJQUFJLENBQUMsNkNBQVUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsNkNBQVUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJO1lBQzVELElBQUksQ0FBQyw2Q0FBVSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyw2Q0FBVSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUk7UUFDaEUsQ0FBQzthQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO1lBQ2hCLEtBQUs7WUFDTCxJQUFJLENBQUMsNkNBQVUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsNkNBQVUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJO1lBQzVELElBQUksQ0FBQyw2Q0FBVSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyw2Q0FBVSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUk7WUFDNUQsSUFBSSxDQUFDLDZDQUFVLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLDZDQUFVLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSTtRQUNoRSxDQUFDO2FBQU0sSUFBSSxDQUFDLElBQUksNkNBQVUsR0FBRyxDQUFDLEVBQUUsQ0FBQztZQUM3QixLQUFLO1lBQ0wsSUFBSSxDQUFDLDZDQUFVLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLDZDQUFVLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSTtZQUM1RCxJQUFJLENBQUMsNkNBQVUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsNkNBQVUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJO1lBQzVELElBQUksQ0FBQyw2Q0FBVSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyw2Q0FBVSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUk7UUFDaEUsQ0FBQzthQUFNLElBQUksQ0FBQyxJQUFJLDZDQUFVLEdBQUcsQ0FBQyxFQUFFLENBQUM7WUFDN0IsS0FBSztZQUNMLElBQUksQ0FBQyw2Q0FBVSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyw2Q0FBVSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUk7WUFDNUQsSUFBSSxDQUFDLDZDQUFVLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLDZDQUFVLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSTtZQUM1RCxJQUFJLENBQUMsNkNBQVUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsNkNBQVUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJO1FBQ2hFLENBQUM7YUFBTSxDQUFDO1lBQ0osSUFBSSxDQUFDLDZDQUFVLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLDZDQUFVLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSTtZQUM1RCxJQUFJLENBQUMsNkNBQVUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsNkNBQVUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJO1lBQzVELElBQUksQ0FBQyw2Q0FBVSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyw2Q0FBVSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUk7WUFDNUQsSUFBSSxDQUFDLDZDQUFVLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLDZDQUFVLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSTtRQUNoRSxDQUFDO0lBQ0wsQ0FBQztBQUNMLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3BLMEM7QUFDTTtBQUNiO0FBRTdCLE1BQU0sUUFBUyxT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QyxDQUFDLENBQUM7WUFDL0MsUUFBUSxDQUFDLE9BQU8sR0FBRyxHQUFHLEVBQUUsQ0FBQyx5RUFBaUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDakQsV0FBVztZQUNYLE1BQU0sQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDakMsQ0FBQztRQUNELGNBQWM7UUFDZCxPQUFPLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2hDLENBQUM7QUFDTCxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbWF0cml4LWdhbWUvLi9zcmMvY2xhc3MvQXNzZXQvQXNzZXQudHMiLCJ3ZWJwYWNrOi8vbWF0cml4LWdhbWUvLi9zcmMvY2xhc3MvQXNzZXQvSG91c2UudHMiLCJ3ZWJwYWNrOi8vbWF0cml4LWdhbWUvLi9zcmMvY2xhc3MvSHVtYW4vRmFybWVyLnRzIiwid2VicGFjazovL21hdHJpeC1nYW1lLy4vc3JjL2NsYXNzL0h1bWFuL0h1bWFuLnRzIiwid2VicGFjazovL21hdHJpeC1nYW1lLy4vc3JjL2NsYXNzL0h1bWFuL01lcmNoYW50LnRzIiwid2VicGFjazovL21hdHJpeC1nYW1lLy4vc3JjL2NsYXNzL1Rhc2svVGFzay50cyIsIndlYnBhY2s6Ly9tYXRyaXgtZ2FtZS8uL3NyYy9mdW5jdGlvbi9kcmF3LnRzIiwid2VicGFjazovL21hdHJpeC1nYW1lLy4vc3JjL2Z1bmN0aW9uL2hhbmRsZUFjdGlvbi50cyIsIndlYnBhY2s6Ly9tYXRyaXgtZ2FtZS8uL3NyYy9mdW5jdGlvbi9oYW5kbGVNb2RlLnRzIiwid2VicGFjazovL21hdHJpeC1nYW1lLy4vc3JjL2Z1bmN0aW9uL3V0aWxzLnRzIiwid2VicGFjazovL21hdHJpeC1nYW1lLy4vc3JjL2dhbWUudHMiLCJ3ZWJwYWNrOi8vbWF0cml4LWdhbWUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbWF0cml4LWdhbWUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL21hdHJpeC1nYW1lL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbWF0cml4LWdhbWUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9tYXRyaXgtZ2FtZS8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQb3NpdGlvbiwgRklFTERfU0laRSB9IGZyb20gXCIuLi8uLi9nYW1lXCI7XG5pbXBvcnQgeyBIdW1hbiB9IGZyb20gXCIuLi9IdW1hbi9IdW1hblwiO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQXNzZXQge1xuICAgIHBvczogUG9zaXRpb247XG4gICAgb3duZXI6IEh1bWFuO1xuXG4gICAgY29uc3RydWN0b3IocG9zOiBQb3NpdGlvbiwgb3duZXI6IEh1bWFuKSB7XG4gICAgICAgIGlmIChwb3MueCA8IDAgfHwgcG9zLnggPj0gRklFTERfU0laRSB8fCBwb3MueSA8IDAgfHwgcG9zLnkgPj0gRklFTERfU0laRSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBwb3MueCwgcG94LnkgbXVzdCBiZSBpbiAwIDw9IGEgPCBGSUVMRF9TSVpFYCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wb3MgPSBwb3M7XG4gICAgICAgIHRoaXMub3duZXIgPSBvd25lcjtcbiAgICB9XG59IiwiaW1wb3J0IHsgQXNzZXQgfSBmcm9tIFwiLi9Bc3NldFwiO1xuaW1wb3J0IHsgUG9zaXRpb24gfSBmcm9tIFwiLi4vLi4vZ2FtZVwiO1xuaW1wb3J0IHsgSHVtYW4gfSBmcm9tIFwiLi4vSHVtYW4vSHVtYW5cIjtcblxuZXhwb3J0IGNsYXNzIEhvdXNlIGV4dGVuZHMgQXNzZXQge1xuICAgIGNsYXNzTmFtZTogXCJub3JtYWwtaG91c2VcIiB8IFwiZXZlbmluZy1ob3VzZVwiIHwgXCJuaWdodC1ob3VzZVwiIHwgXCJzbGVlcGluZy1ob3VzZVwiO1xuXG4gICAgY29uc3RydWN0b3IocG9zOiBQb3NpdGlvbiwgb3duZXI6IEh1bWFuKSB7XG4gICAgICAgIHN1cGVyKHBvcywgb3duZXIpO1xuICAgICAgICB0aGlzLmNsYXNzTmFtZSA9IFwibm9ybWFsLWhvdXNlXCI7XG4gICAgfVxufSIsImltcG9ydCB7IEh1bWFuLCBDaGFyYWN0ZXIgfSBmcm9tIFwiLi9IdW1hblwiO1xuaW1wb3J0IHsgZ2FtZVN0YXRlLCBQb3NpdGlvbiB9IGZyb20gXCIuLi8uLi9nYW1lXCI7XG5pbXBvcnQgeyBUYXNrIH0gZnJvbSBcIi4uL1Rhc2svVGFza1wiO1xuXG5leHBvcnQgY2xhc3MgRmFybWVyIGV4dGVuZHMgSHVtYW4ge1xuICAgIC8qKlxuICAgICAqIDHljZjkvY3mmYLplpPpgY7jgZTjgZlcbiAgICAgKi9cbiAgICBzcGVuZFRpbWUoKTogdm9pZCB7XG4gICAgICAgIC8vIOOCv+OCueOCr+OCkuWujOS6huOBl+OBpuOBhOOCi+WgtOWQiOOAgeasoeOBruOCv+OCueOCr+OCkuaxuuOCgeOCi1xuICAgICAgICBpZiAoIXRoaXMudGFzaykge1xuICAgICAgICAgICAgdGhpcy5kZXRlcm1pbmVUYXNrKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyDjgr/jgrnjgq/jgavlvpPjgaPjgabooYzli5XjgZnjgotcbiAgICAgICAgc3dpdGNoICh0aGlzLnRhc2s/LndoYXQpIHtcbiAgICAgICAgICAgIGNhc2UgJ3NsZWVwJzpcbiAgICAgICAgICAgICAgICBUYXNrLmhhbmRsZVNsZWVwKHRoaXMpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnd2Fsa2luZyc6XG4gICAgICAgICAgICAgICAgVGFzay5oYW5kbGVXYWxraW5nKHRoaXMpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVE9ETyA6IGhw44KS5pu05paw44GZ44KLXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog44Op44Oz44OA44Og44Gr44K/44K544Kv44KS5rG644KB44KLXG4gICAgICovXG4gICAgZGV0ZXJtaW5lVGFzaygpOiB2b2lkIHtcbiAgICAgICAgLy8gVE9ETyDjgr/jgrnjgq/jga7mlbDjgpLlopfjgoTjgZlcbiAgICAgICAgLy8gVE9ETyDjgr/jgrnjgq/jgpLnj77lnKjjga7jg5Hjg6njg6Hjg7zjgr/jgavlvpPjgaPjgabmsbrjgoHjgovjgojjgYbjgavlpInmm7RcbiAgICAgICAgaWYgKDE2IDwgZ2FtZVN0YXRlLnRpbWUuaCkge1xuICAgICAgICAgICAgLy8g5a+d44KLXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuecoOOCiuOBvuOBmVwiKTtcbiAgICAgICAgICAgIHRoaXMudGFzayA9IHsgd2hhdDogJ3NsZWVwJywgd2hlcmU6IHRoaXMuaG9tZVBvcyB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyDmlaPmranjgZnjgotcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiKDUsIDUp44G45ZCR44GL44GE44G+44GZXCIpO1xuICAgICAgICAgICAgdGhpcy50YXNrID0geyB3aGF0OiAnd2Fsa2luZycsIHdoZXJlOiB7IHg6IDUsIHk6IDUgfSB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgbmFtZTogc3RyaW5nID0gYEh1bWFuJHtIdW1hbi5odW1hbk51bX1gLFxuICAgICAgICBob21lUG9zOiBQb3NpdGlvbiA9IHsgeDogMCwgeTogMCB9LFxuICAgICAgICBocDogbnVtYmVyID0gMTAwLFxuICAgICAgICBjb2xvcjogc3RyaW5nID0gXCIjRkYwMDAwXCIsXG4gICAgICAgIGNoYXJhY3RlcjogQ2hhcmFjdGVyID0geyB3aXNkb206IDAuNSB9LFxuICAgICAgICBpc1NlbGVjdGVkOiBib29sZWFuID0gZmFsc2UsXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKG5hbWUsIGhvbWVQb3MsIGhwLCBcImZhcm1lclwiLCBjb2xvciwgY2hhcmFjdGVyLCBpc1NlbGVjdGVkKTtcbiAgICB9XG59IiwiaW1wb3J0IHsgUG9zaXRpb24gfSBmcm9tIFwiLi4vLi4vZ2FtZVwiO1xuaW1wb3J0IHsgVGFzayB9IGZyb20gXCIuLi9UYXNrL1Rhc2tcIjtcbmltcG9ydCB7IEZJRUxEX1NJWkUgfSBmcm9tIFwiLi4vLi4vZ2FtZVwiO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgSHVtYW4ge1xuICAgIHN0YXRpYyBodW1hbk51bSA9IDE7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIHByaXZhdGUgX3BvczogUG9zaXRpb247XG4gICAgaG9tZVBvczogUG9zaXRpb247XG4gICAgaHA6IG51bWJlcjtcbiAgICBqb2I6IEpvYjtcbiAgICBjb2xvcjogc3RyaW5nO1xuICAgIGNoYXJhY3RlcjogQ2hhcmFjdGVyO1xuICAgIGlzU2VsZWN0ZWQ6IGJvb2xlYW47XG4gICAgdGFzazogVGFzayB8IG51bGw7XG5cbiAgICBnZXQgcG9zKCk6IFBvc2l0aW9uIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BvcztcbiAgICB9XG5cbiAgICBzZXQgcG9zKG5ld1BvczogUG9zaXRpb24pIHtcbiAgICAgICAgaWYgKG5ld1Bvcy54IDwgMCB8fCBGSUVMRF9TSVpFIDw9IG5ld1Bvcy54XG4gICAgICAgICAgICB8fCBuZXdQb3MueSA8IDAgfHwgRklFTERfU0laRSA8PSBuZXdQb3MueSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQb3NpdGlvbiBtdXN0IGJlIDAgPD0geCA8IEZJRUxEX1NJWkUnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9wb3MgPSBuZXdQb3M7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogMeWNmOS9jeaZgumWk+mBjuOBlOOBmVxuICAgICAqIE1PRElGSUVTIDogdGhpcy5ocCwgdGhpcy50YXNrXG4gICAgICovXG4gICAgYWJzdHJhY3Qgc3BlbmRUaW1lKCk6IHZvaWQ7XG5cbiAgICAvKipcbiAgICAgKiDjg6njg7Pjg4Djg6Djgavjgr/jgrnjgq/jgpLmsbrjgoHjgotcbiAgICAgKi9cbiAgICBhYnN0cmFjdCBkZXRlcm1pbmVUYXNrKCk6IHZvaWQ7XG5cbiAgICAvKipcbiAgICAgKiDnm67nmoTlnLDjgavlkJHjgYvjgaPjgaYx44Oe44K56YCy44KAXG4gICAgICogQHBhcmFtIGRlc3Qg55uu55qE5ZywXG4gICAgICovXG4gICAgaGVhZFRvRGVzdChkZXN0OiBQb3NpdGlvbik6IHZvaWQge1xuICAgICAgICAvLyDnj77lnKjjga7luqfmqJnjgYvjgonnm67nmoTlnLDjga7luqfmqJnjgb7jgafjga7mnIDnn63ntYzot6/jgpJkaWprc3RyYeOBp+axguOCgeOCi1xuICAgICAgICBjb25zdCBkOiBudW1iZXJbXSA9IEFycmF5LmZyb20oeyBsZW5ndGg6IFYgfSkubWFwKG4gPT4gSU5GKTtcbiAgICAgICAgY29uc3QgdXNlZDogYm9vbGVhbltdID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogViB9KS5tYXAobiA9PiBmYWxzZSk7XG4gICAgICAgIGRbRklFTERfU0laRSAqIHRoaXMucG9zLnkgKyB0aGlzLnBvcy54XSA9IDA7XG4gICAgICAgIC8vIOacgOefree1jOi3r+OBruebtOWJjeOBrumggueCuVxuICAgICAgICBjb25zdCBwcmV2UG9zOiBQb3NpdGlvbltdID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogViB9KS5tYXAobiA9PiAoeyB4OiAtMSwgeTogLTEgfSkpO1xuXG4gICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgICBsZXQgdiA9IC0xO1xuXG4gICAgICAgICAgICBmb3IgKGxldCB1ID0gMDsgdSA8IFY7IHUrKykge1xuICAgICAgICAgICAgICAgIGlmICghdXNlZFt1XSAmJiAodiA9PT0gLTEgfHwgZFt1XSA8IGRbdl0pKSB2ID0gdTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHYgPT09IC0xKSBicmVhaztcbiAgICAgICAgICAgIHVzZWRbdl0gPSB0cnVlO1xuXG4gICAgICAgICAgICBmb3IgKGxldCB1ID0gMDsgdSA8IFY7IHUrKykge1xuICAgICAgICAgICAgICAgIGlmIChkW3VdID4gZFt2XSArIGNvc3Rbdl1bdV0pIHtcbiAgICAgICAgICAgICAgICAgICAgZFt1XSA9IE1hdGgubWluKGRbdV0sIGRbdl0gKyBjb3N0W3ZdW3VdKTtcbiAgICAgICAgICAgICAgICAgICAgcHJldlBvc1t1XSA9IHsgeDogdiAlIEZJRUxEX1NJWkUsIHk6IE1hdGguZmxvb3IodiAvIEZJRUxEX1NJWkUpIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gZGVzdOOBi+OCieePvuWcqOWcsGN1clBvc+OBuOOBruacgOefree1jOi3r+OCkuaxguOCgeOCi1xuICAgICAgICBjb25zdCBkZXN0VG9DdXJQb3NQYXRoOiBQb3NpdGlvbltdID0gW107XG4gICAgICAgIGxldCB0OiBQb3NpdGlvbiA9IGRlc3Q7XG4gICAgICAgIGZvciAoOyAhKHQueCA9PT0gLTEgJiYgdC55ID09PSAtMSk7IHQgPSBwcmV2UG9zW0ZJRUxEX1NJWkUgKiB0LnkgKyB0LnhdKSB7XG4gICAgICAgICAgICBkZXN0VG9DdXJQb3NQYXRoLnB1c2godCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnBvcyA9IGRlc3RUb0N1clBvc1BhdGhbZGVzdFRvQ3VyUG9zUGF0aC5sZW5ndGggLSAyXTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgbmFtZTogc3RyaW5nID0gYEh1bWFuJHtIdW1hbi5odW1hbk51bX1gLFxuICAgICAgICBob21lUG9zOiBQb3NpdGlvbiA9IHsgeDogMCwgeTogMCB9LFxuICAgICAgICBocDogbnVtYmVyID0gMTAwLFxuICAgICAgICBqb2I6IEpvYiA9IFwiZmFybWVyXCIsXG4gICAgICAgIGNvbG9yOiBzdHJpbmcgPSBcIiNGRjAwMDBcIixcbiAgICAgICAgY2hhcmFjdGVyOiBDaGFyYWN0ZXIgPSB7IHdpc2RvbTogMC41IH0sXG4gICAgICAgIGlzU2VsZWN0ZWQ6IGJvb2xlYW4gPSBmYWxzZSxcbiAgICApIHtcbiAgICAgICAgaWYgKGhvbWVQb3MueCA8IDAgfHwgRklFTERfU0laRSA8PSBob21lUG9zLnhcbiAgICAgICAgICAgIHx8IGhvbWVQb3MueSA8IDAgfHwgRklFTERfU0laRSA8PSBob21lUG9zLnkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUG9zaXRpb24gbXVzdCBiZSAwIDw9IHggPCBGSUVMRF9TSVpFJyk7XG4gICAgICAgIH1cbiAgICAgICAgSHVtYW4uaHVtYW5OdW0rKztcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5ob21lUG9zID0gaG9tZVBvcztcbiAgICAgICAgdGhpcy5fcG9zID0gaG9tZVBvcztcbiAgICAgICAgdGhpcy5ocCA9IGhwO1xuICAgICAgICB0aGlzLmpvYiA9IGpvYjtcbiAgICAgICAgdGhpcy5jb2xvciA9IGNvbG9yO1xuICAgICAgICB0aGlzLmNoYXJhY3RlciA9IGNoYXJhY3RlcjtcbiAgICAgICAgdGhpcy5pc1NlbGVjdGVkID0gaXNTZWxlY3RlZDtcbiAgICAgICAgdGhpcy50YXNrID0gbnVsbDtcbiAgICB9XG59XG5cbmV4cG9ydCB0eXBlIEpvYiA9ICdmYXJtZXInIHwgJ21lcmNoYW50JztcblxuZXhwb3J0IHR5cGUgQ2hhcmFjdGVyID0ge1xuICAgIHdpc2RvbTogbnVtYmVyO1xufVxuXG4vKipcbiAqIGRpamtzdHJh44Gr5b+F6KaB44Gq5aSJ5pWwXG4gKi9cbmNvbnN0IElORiA9IDEwMDAwMDtcbmNvbnN0IFYgPSBGSUVMRF9TSVpFICogRklFTERfU0laRTtcbi8vIOmao+aOpeihjOWIl1xuY29uc3QgY29zdDogbnVtYmVyW11bXSA9IEFycmF5LmZyb20oeyBsZW5ndGg6IFYgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWFwKG4gPT4gQXJyYXkuZnJvbSh7IGxlbmd0aDogViB9KS5tYXAobiA9PiBJTkYpKTtcbmZvciAobGV0IHkgPSAwOyB5IDwgRklFTERfU0laRTsgeSsrKSB7XG4gICAgZm9yIChsZXQgeCA9IDA7IHggPCBGSUVMRF9TSVpFOyB4KyspIHtcbiAgICAgICAgaWYgKHkgPT0gMCAmJiB4ID09IDApIHtcbiAgICAgICAgICAgIC8vIOW3puS4iuOBrumahVxuICAgICAgICAgICAgY29zdFtGSUVMRF9TSVpFICogeSArIHhdW0ZJRUxEX1NJWkUgKiB5ICsgKHggKyAxKV0gPSAxO1xuICAgICAgICAgICAgY29zdFtGSUVMRF9TSVpFICogeSArIHhdW0ZJRUxEX1NJWkUgKiAoeSArIDEpICsgeF0gPSAxO1xuICAgICAgICB9IGVsc2UgaWYgKHkgPT0gMCAmJiB4ID09IEZJRUxEX1NJWkUgLSAxKSB7XG4gICAgICAgICAgICAvLyDlj7PkuIrjga7pmoVcbiAgICAgICAgICAgIGNvc3RbRklFTERfU0laRSAqIHkgKyB4XVtGSUVMRF9TSVpFICogeSArICh4IC0gMSldID0gMTtcbiAgICAgICAgICAgIGNvc3RbRklFTERfU0laRSAqIHkgKyB4XVtGSUVMRF9TSVpFICogKHkgKyAxKSArIHhdID0gMTtcbiAgICAgICAgfSBlbHNlIGlmICh5ID09IEZJRUxEX1NJWkUgLSAxICYmIHggPT0gMCkge1xuICAgICAgICAgICAgLy8g5bem5LiL44Gu6ZqFXG4gICAgICAgICAgICBjb3N0W0ZJRUxEX1NJWkUgKiB5ICsgeF1bRklFTERfU0laRSAqICh5IC0gMSkgKyB4XSA9IDE7XG4gICAgICAgICAgICBjb3N0W0ZJRUxEX1NJWkUgKiB5ICsgeF1bRklFTERfU0laRSAqIHkgKyAoeCArIDEpXSA9IDE7XG4gICAgICAgIH0gZWxzZSBpZiAoeSA9PSBGSUVMRF9TSVpFIC0gMSAmJiB4ID09IEZJRUxEX1NJWkUgLSAxKSB7XG4gICAgICAgICAgICAvLyDlj7PkuIvjga7pmoVcbiAgICAgICAgICAgIGNvc3RbRklFTERfU0laRSAqIHkgKyB4XVtGSUVMRF9TSVpFICogKHkgLSAxKSArIHhdID0gMTtcbiAgICAgICAgICAgIGNvc3RbRklFTERfU0laRSAqIHkgKyB4XVtGSUVMRF9TSVpFICogeSArICh4IC0gMSldID0gMTtcbiAgICAgICAgfSBlbHNlIGlmICh5ID09IDApIHtcbiAgICAgICAgICAgIC8vIOS4iui+ulxuICAgICAgICAgICAgY29zdFtGSUVMRF9TSVpFICogeSArIHhdW0ZJRUxEX1NJWkUgKiB5ICsgKHggLSAxKV0gPSAxOyAvLyDihpBcbiAgICAgICAgICAgIGNvc3RbRklFTERfU0laRSAqIHkgKyB4XVtGSUVMRF9TSVpFICogKHkgKyAxKSArIHhdID0gMTsgLy8g4oaTXG4gICAgICAgICAgICBjb3N0W0ZJRUxEX1NJWkUgKiB5ICsgeF1bRklFTERfU0laRSAqIHkgKyAoeCArIDEpXSA9IDE7IC8vIOKGklxuICAgICAgICB9IGVsc2UgaWYgKHggPT0gMCkge1xuICAgICAgICAgICAgLy8g5bem6L66XG4gICAgICAgICAgICBjb3N0W0ZJRUxEX1NJWkUgKiB5ICsgeF1bRklFTERfU0laRSAqICh5IC0gMSkgKyB4XSA9IDE7IC8vIOKGkVxuICAgICAgICAgICAgY29zdFtGSUVMRF9TSVpFICogeSArIHhdW0ZJRUxEX1NJWkUgKiB5ICsgKHggKyAxKV0gPSAxOyAvLyDihpJcbiAgICAgICAgICAgIGNvc3RbRklFTERfU0laRSAqIHkgKyB4XVtGSUVMRF9TSVpFICogKHkgKyAxKSArIHhdID0gMTsgLy8g4oaTXG4gICAgICAgIH0gZWxzZSBpZiAoeCA9PSBGSUVMRF9TSVpFIC0gMSkge1xuICAgICAgICAgICAgLy8g5Y+z6L66XG4gICAgICAgICAgICBjb3N0W0ZJRUxEX1NJWkUgKiB5ICsgeF1bRklFTERfU0laRSAqICh5IC0gMSkgKyB4XSA9IDE7IC8vIOKGkVxuICAgICAgICAgICAgY29zdFtGSUVMRF9TSVpFICogeSArIHhdW0ZJRUxEX1NJWkUgKiB5ICsgKHggLSAxKV0gPSAxOyAvLyDihpBcbiAgICAgICAgICAgIGNvc3RbRklFTERfU0laRSAqIHkgKyB4XVtGSUVMRF9TSVpFICogKHkgKyAxKSArIHhdID0gMTsgLy8g4oaTXG4gICAgICAgIH0gZWxzZSBpZiAoeSA9PSBGSUVMRF9TSVpFIC0gMSkge1xuICAgICAgICAgICAgLy8g5LiL6L66XG4gICAgICAgICAgICBjb3N0W0ZJRUxEX1NJWkUgKiB5ICsgeF1bRklFTERfU0laRSAqIHkgKyAoeCAtIDEpXSA9IDE7IC8vIOKGkFxuICAgICAgICAgICAgY29zdFtGSUVMRF9TSVpFICogeSArIHhdW0ZJRUxEX1NJWkUgKiAoeSAtIDEpICsgeF0gPSAxOyAvLyDihpFcbiAgICAgICAgICAgIGNvc3RbRklFTERfU0laRSAqIHkgKyB4XVtGSUVMRF9TSVpFICogeSArICh4ICsgMSldID0gMTsgLy8g4oaSXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb3N0W0ZJRUxEX1NJWkUgKiB5ICsgeF1bRklFTERfU0laRSAqICh5IC0gMSkgKyB4XSA9IDE7IC8vIOKGkVxuICAgICAgICAgICAgY29zdFtGSUVMRF9TSVpFICogeSArIHhdW0ZJRUxEX1NJWkUgKiB5ICsgKHggKyAxKV0gPSAxOyAvLyDihpJcbiAgICAgICAgICAgIGNvc3RbRklFTERfU0laRSAqIHkgKyB4XVtGSUVMRF9TSVpFICogKHkgKyAxKSArIHhdID0gMTsgLy8g4oaTXG4gICAgICAgICAgICBjb3N0W0ZJRUxEX1NJWkUgKiB5ICsgeF1bRklFTERfU0laRSAqIHkgKyAoeCAtIDEpXSA9IDE7IC8vIOKGkFxuICAgICAgICB9XG4gICAgfVxufSIsImltcG9ydCB7IEh1bWFuLCBDaGFyYWN0ZXIgfSBmcm9tIFwiLi9IdW1hblwiO1xuaW1wb3J0IHsgZ2FtZVN0YXRlLCBQb3NpdGlvbiB9IGZyb20gXCIuLi8uLi9nYW1lXCI7XG5pbXBvcnQgeyBUYXNrIH0gZnJvbSBcIi4uL1Rhc2svVGFza1wiO1xuXG5leHBvcnQgY2xhc3MgTWVyY2hhbnQgZXh0ZW5kcyBIdW1hbiB7XG4gICAgLyoqXG4gICAgICogMeWNmOS9jeaZgumWk+mBjuOBlOOBmVxuICAgICAqL1xuICAgIHNwZW5kVGltZSgpOiB2b2lkIHtcbiAgICAgICAgLy8g44K/44K544Kv44KS5a6M5LqG44GX44Gm44GE44KL5aC05ZCI44CB5qyh44Gu44K/44K544Kv44KS5rG644KB44KLXG4gICAgICAgIGlmICghdGhpcy50YXNrKSB7XG4gICAgICAgICAgICB0aGlzLmRldGVybWluZVRhc2soKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIOOCv+OCueOCr+OBq+W+k+OBo+OBpuihjOWLleOBmeOCi1xuICAgICAgICBzd2l0Y2ggKHRoaXMudGFzaz8ud2hhdCkge1xuICAgICAgICAgICAgY2FzZSAnc2xlZXAnOlxuICAgICAgICAgICAgICAgIFRhc2suaGFuZGxlU2xlZXAodGhpcyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICd3YWxraW5nJzpcbiAgICAgICAgICAgICAgICBUYXNrLmhhbmRsZVdhbGtpbmcodGhpcyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUT0RPIDogaHDjgpLmm7TmlrDjgZnjgotcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDjg6njg7Pjg4Djg6Djgavjgr/jgrnjgq/jgpLmsbrjgoHjgotcbiAgICAgKi9cbiAgICBkZXRlcm1pbmVUYXNrKCk6IHZvaWQge1xuICAgICAgICAvLyBUT0RPIOOCv+OCueOCr+OBruaVsOOCkuWil+OChOOBmVxuICAgICAgICAvLyBUT0RPIOOCv+OCueOCr+OCkuePvuWcqOOBruODkeODqeODoeODvOOCv+OBq+W+k+OBo+OBpuaxuuOCgeOCi+OCiOOBhuOBq+WkieabtFxuICAgICAgICBpZiAoMTYgPCBnYW1lU3RhdGUudGltZS5oKSB7XG4gICAgICAgICAgICAvLyDlr53jgotcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi55yg44KK44G+44GZXCIpO1xuICAgICAgICAgICAgdGhpcy50YXNrID0geyB3aGF0OiAnc2xlZXAnLCB3aGVyZTogdGhpcy5ob21lUG9zIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIOaVo+atqeOBmeOCi1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCIoNSwgNSnjgbjlkJHjgYvjgYTjgb7jgZlcIik7XG4gICAgICAgICAgICB0aGlzLnRhc2sgPSB7IHdoYXQ6ICd3YWxraW5nJywgd2hlcmU6IHsgeDogNSwgeTogNSB9IH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBuYW1lOiBzdHJpbmcgPSBgSHVtYW4ke0h1bWFuLmh1bWFuTnVtfWAsXG4gICAgICAgIGhvbWVQb3M6IFBvc2l0aW9uID0geyB4OiAwLCB5OiAwIH0sXG4gICAgICAgIGhwOiBudW1iZXIgPSAxMDAsXG4gICAgICAgIGNvbG9yOiBzdHJpbmcgPSBcIiNGRjAwMDBcIixcbiAgICAgICAgY2hhcmFjdGVyOiBDaGFyYWN0ZXIgPSB7IHdpc2RvbTogMC41IH0sXG4gICAgICAgIGlzU2VsZWN0ZWQ6IGJvb2xlYW4gPSBmYWxzZSxcbiAgICApIHtcbiAgICAgICAgc3VwZXIobmFtZSwgaG9tZVBvcywgaHAsIFwibWVyY2hhbnRcIiwgY29sb3IsIGNoYXJhY3RlciwgaXNTZWxlY3RlZCk7XG4gICAgfVxufSIsImltcG9ydCB7IEh1bWFuIH0gZnJvbSBcIi4uL0h1bWFuL0h1bWFuXCI7XG5pbXBvcnQgeyBnYW1lU3RhdGUsIFBvc2l0aW9uLCBGSUVMRF9TSVpFIH0gZnJvbSBcIi4uLy4uL2dhbWVcIjtcblxuZXhwb3J0IGNsYXNzIFRhc2sge1xuICAgIHdoYXQ6IFRhc2tUeXBlO1xuICAgIHdoZXJlOiBQb3NpdGlvbjtcblxuICAgIHN0YXRpYyBoYW5kbGVTbGVlcChodW1hbjogSHVtYW4pOiB2b2lkIHtcbiAgICAgICAgaWYgKDUgPCBnYW1lU3RhdGUudGltZS5oICYmIGdhbWVTdGF0ZS50aW1lLmggPCAxNikge1xuICAgICAgICAgICAgLy8g5pydXG4gICAgICAgICAgICBpZiAoNiA8IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKSlcbiAgICAgICAgICAgICAgICAvLyDkuIDlrprnorrnjofjgafotbfjgY3jgotcbiAgICAgICAgICAgICAgICBodW1hbi50YXNrID0gbnVsbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIOWknFxuICAgICAgICAgICAgaWYgKGh1bWFuLnBvcy54ID09PSBodW1hbi5ob21lUG9zLnggJiYgaHVtYW4ucG9zLnkgPT09IGh1bWFuLmhvbWVQb3MueSkge1xuICAgICAgICAgICAgICAgIC8vIOWutuOBq+OBhOOCjOOBsOWvneOBn+OBvuOBvuS9leOCguOBl+OBquOBhFxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8g5Ye65YWI44Gq44Gu44Gn44CB5a6244Gr5biw44KLXG4gICAgICAgICAgICAgICAgaHVtYW4uaGVhZFRvRGVzdChodW1hbi5ob21lUG9zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBoYW5kbGVXYWxraW5nKGh1bWFuOiBIdW1hbik6IHZvaWQge1xuICAgICAgICBpZiAoIWh1bWFuLnRhc2spIHJldHVybjtcbiAgICAgICAgaWYgKGh1bWFuLnBvcy54ID09PSBodW1hbi50YXNrLndoZXJlLnggJiYgaHVtYW4ucG9zLnkgPT09IGh1bWFuLnRhc2sud2hlcmUueSkge1xuICAgICAgICAgICAgLy8g55uu55qE5Zyw44Gr5Yiw552A44GX44Gf44Gu44Gn44K/44K544Kv44KS57WC5LqGXG4gICAgICAgICAgICBodW1hbi50YXNrID0gbnVsbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIOebrueahOWcsOOBq+WQkeOBi+OBhlxuICAgICAgICAgICAgaHVtYW4uaGVhZFRvRGVzdChodW1hbi50YXNrLndoZXJlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHdoYXQ6IFRhc2tUeXBlLCB3aGVyZTogUG9zaXRpb24pIHtcbiAgICAgICAgaWYgKHdoZXJlLnggPCAwIHx8IEZJRUxEX1NJWkUgPD0gd2hlcmUueFxuICAgICAgICAgICAgfHwgd2hlcmUueSA8IDAgfHwgRklFTERfU0laRSA8PSB3aGVyZS55KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Bvc2l0aW9uIG11c3QgYmUgMCA8PSB4IDwgRklFTERfU0laRScpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMud2hhdCA9IHdoYXQ7XG4gICAgICAgIHRoaXMud2hlcmUgPSB3aGVyZTtcbiAgICB9XG59XG5cbnR5cGUgVGFza1R5cGUgPSAnc2xlZXAnIHwgJ3dhbGtpbmcnOyIsImltcG9ydCB7IGdhbWVTdGF0ZSwgRklFTERfU0laRSB9IGZyb20gXCIuLi9nYW1lXCI7XG5pbXBvcnQgeyBIb3VzZSB9IGZyb20gXCIuLi9jbGFzcy9Bc3NldC9Ib3VzZVwiO1xuaW1wb3J0IHsgSHVtYW4gfSBmcm9tIFwiLi4vY2xhc3MvSHVtYW4vSHVtYW5cIjtcbmltcG9ydCB7IGlzTmlnaHQgfSBmcm9tIFwiLi91dGlsc1wiO1xuXG4vKipcbiAqIGdhbWVTdGF0ZeOBq+W+k+OBo+OBpuebpOmdouOCkuabtOaWsOOBmeOCi1xuICog6YG45oqe5Lit44Gu5Lq644Gu5LiK44Gr44Gv5ZC544GN5Ye644GX44KS6KGo56S644GZ44KLXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkcmF3RmllbGQoKTogdm9pZCB7XG4gICAgLy8g55uk6Z2i44KS44Oq44K744OD44OI44GZ44KLXG4gICAgcmVzZXRGaWVsZCgpO1xuXG4gICAgLy8g5Lq644KS5o+P55S7XG4gICAgZ2FtZVN0YXRlLmh1bWFucy5mb3JFYWNoKChodW1hbikgPT4ge1xuICAgICAgICBjb25zdCB7IHgsIHkgfSA9IGh1bWFuLnBvcztcbiAgICAgICAgY29uc3Qgc3F1YXJlRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNxdWFyZS1cIiArIChGSUVMRF9TSVpFICogeSArIHgpKTtcbiAgICAgICAgaWYgKCFzcXVhcmVFbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBzcXVhcmUtJHtGSUVMRF9TSVpFICogeSArIHh9IHdhcyBub3QgZm91bmQuYCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8g44Oe44K544Gu5paH5a2X5YiX44KS5pu05pawXG4gICAgICAgIHNxdWFyZUVsLnRleHRDb250ZW50ID0gXCLil4tcIjtcbiAgICAgICAgLy8g5Lq644GM6YG45oqe5Lit44Gq44KJ44Oe44K544Gu5LiK44Gr5ZC544GN5Ye644GX44KS6KGo56S644GZ44KLXG4gICAgICAgIGlmIChodW1hbi5pc1NlbGVjdGVkKSB7XG4gICAgICAgICAgICBjb25zdCBiYWxsb29uRWwgPSBjcmVhdGVCYWxsb29uKGh1bWFuKTtcbiAgICAgICAgICAgIHNxdWFyZUVsLmFwcGVuZENoaWxkKGJhbGxvb25FbCk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIOOCouOCu+ODg+ODiOOCkuaPj+eUu1xuICAgIGdhbWVTdGF0ZS5hc3NldHMuZm9yRWFjaCgoYXNzZXQpID0+IHtcbiAgICAgICAgY29uc3QgeyB4LCB5IH0gPSBhc3NldC5wb3M7XG4gICAgICAgIGNvbnN0IHNxdWFyZUVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzcXVhcmUtXCIgKyAoRklFTERfU0laRSAqIHkgKyB4KSk7XG4gICAgICAgIGlmICghc3F1YXJlRWwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgc3F1YXJlLSR7RklFTERfU0laRSAqIHkgKyB4fSB3YXMgbm90IGZvdW5kLmApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGFzc2V0IGluc3RhbmNlb2YgSG91c2UpIHtcbiAgICAgICAgICAgIC8vIOOCr+ODqeOCueOCkuODquOCu+ODg+ODiOOBmeOCi1xuICAgICAgICAgICAgc3F1YXJlRWwuY2xhc3NMaXN0LnJlbW92ZShhc3NldC5jbGFzc05hbWUpO1xuICAgICAgICAgICAgLy8g6YGp5YiH44Gq55S75YOP6KGo56S644Gu44Gf44KB44CB54q25rOB44Gr5b+c44GY44Gf44Kv44Op44K544KS5LuY5LiO44GZ44KLXG4gICAgICAgICAgICAvLyBUT0RP77ya5pmC6ZaT44KE54q25rOB44Gr5b+c44GY44GfY2xhc3NOYW1l44KS5YaN5qSc6KiO44GZ44KLXG4gICAgICAgICAgICAvLyBUT0RP77ya5a+d44Gm44GE44KL44Go44GN44GvbmlnaHQtaG91c2XjgavjgZnjgotcbiAgICAgICAgICAgIGlmIChhc3NldC5vd25lci5wb3MueCA9PT0geCAmJiBhc3NldC5vd25lci5wb3MueSA9PT0geSkge1xuICAgICAgICAgICAgICAgIC8vIOaJgOacieiAheOBjOWutuOBq+OBhOOCi+WgtOWQiFxuICAgICAgICAgICAgICAgIGlmIChpc05pZ2h0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgYXNzZXQuY2xhc3NOYW1lID0gJ2V2ZW5pbmctaG91c2UnO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGFzc2V0LmNsYXNzTmFtZSA9ICdub3JtYWwtaG91c2UnO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIOeUu+WDj+OCkuihqOekuuOBmeOCi+OBn+OCgeOBq+ODnuOCueOBruaWh+Wtl+WIl+OCkua2iOOBmVxuICAgICAgICAgICAgICAgIHNxdWFyZUVsLnRleHRDb250ZW50ID0gXCJcIjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8g5omA5pyJ6ICF44GM5a6244Gr44GE44Gq44GE5aC05ZCIXG4gICAgICAgICAgICAgICAgaWYgKGlzTmlnaHQoKSkge1xuICAgICAgICAgICAgICAgICAgICBhc3NldC5jbGFzc05hbWUgPSAnbmlnaHQtaG91c2UnO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGFzc2V0LmNsYXNzTmFtZSA9ICdub3JtYWwtaG91c2UnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNxdWFyZUVsLmNsYXNzTGlzdC5hZGQoYXNzZXQuY2xhc3NOYW1lKTtcbiAgICAgICAgICAgIGNvbnN0IGltZ0VsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgICAgICAgICAgIHNxdWFyZUVsLmFwcGVuZENoaWxkKGltZ0VsKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG4vKipcbiAqIOebpOmdouOCkuODquOCu+ODg+ODiOOBmeOCi++8iOOBmeOBueOBpuOBruODnuOCueOCkuepuuaWh+Wtl+WIl+OBq+OBmeOCi++8iVxuICovXG5mdW5jdGlvbiByZXNldEZpZWxkKCk6IHZvaWQge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgRklFTERfU0laRTsgaSsrKSB7XG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgRklFTERfU0laRTsgaisrKSB7XG4gICAgICAgICAgICBjb25zdCBzcXVhcmVFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3F1YXJlLVwiICsgKEZJRUxEX1NJWkUgKiBpICsgaikpO1xuICAgICAgICAgICAgaWYgKCFzcXVhcmVFbClcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYHNxdWFyZS0ke0ZJRUxEX1NJWkUgKiBpICsgan0gd2FzIG5vdCBmb3VuZC5gKTtcbiAgICAgICAgICAgIC8vIOWQhOODnuOCueOBruaWh+Wtl+WIl+OCkuOBi+OCieaWh+Wtl+WIl+OBq+ODquOCu+ODg+ODiFxuICAgICAgICAgICAgc3F1YXJlRWwudGV4dENvbnRlbnQgPSBcIlwiO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4vKipcbiAqIOihqOekuuOBleOCjOOBpuOBhOOCi+aZguWIu+OCkuabtOaWsOOBmeOCi1xuICovXG5leHBvcnQgZnVuY3Rpb24gZHJhd1RpbWUoKTogdm9pZCB7XG4gICAgY29uc3QgdGltZUVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aW1lTGFiZWxcIik7XG4gICAgaWYgKCF0aW1lRWwpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGB0aW1lTGFiZWwgd2FzIG5vdCBmb3VuZC5gKTtcbiAgICB9XG4gICAgdGltZUVsLnRleHRDb250ZW50ID0gYOePvuWcqOOBruaZguWIuyAke2dhbWVTdGF0ZS50aW1lLmh9IDogJHtnYW1lU3RhdGUudGltZS5tfWA7XG59XG5cbi8qKlxuICog5Lq644Gu5oOF5aCx44KS6KGo56S644GZ44KL5ZC544GN5Ye644GX6KaB57Sg44KS6L+U44GZXG4gKiBAcGFyYW0gaHVtYW4g5oOF5aCx44KS6KGo56S644GZ44KL5a++6LGhXG4gKiBAcmV0dXJucyDlkLnjgY3lh7rjgZfjga48ZGl2Puimgee0oFxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQmFsbG9vbihodW1hbjogSHVtYW4pOiBIVE1MRGl2RWxlbWVudCB7XG4gICAgY29uc3QgZGl2RWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGRpdkVsLmNsYXNzTmFtZSA9IFwiYWJvdmUtc3F1YXJlXCI7XG4gICAgY29uc3QgYmFsbG9vbkVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBiYWxsb29uRWwuY2xhc3NOYW1lID0gXCJiYWxsb29uMlwiO1xuICAgIGNvbnN0IG1lc3NhZ2VFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgIG1lc3NhZ2VFbC5pbm5lclRleHQgPVxuICAgICAgICBg5ZCN5YmN77yaJHtodW1hbi5uYW1lfVxuICAgIEhQ77yaJHtodW1hbi5ocH1cbiAgICDlvbnogbfvvJoke2h1bWFuLmpvYn1cbiAgICDmgKfmoLzvvJoke2h1bWFuLmNoYXJhY3Rlcn1gO1xuICAgIGJhbGxvb25FbC5hcHBlbmRDaGlsZChtZXNzYWdlRWwpO1xuICAgIGRpdkVsLmFwcGVuZENoaWxkKGJhbGxvb25FbCk7XG5cbiAgICByZXR1cm4gZGl2RWw7XG59IiwiaW1wb3J0IHsgZ2FtZVN0YXRlLCBIVE1MRXZlbnQsIEZJRUxEX1NJWkUgfSBmcm9tIFwiLi4vZ2FtZVwiO1xuaW1wb3J0IHsgSHVtYW4sIEpvYiB9IGZyb20gXCIuLi9jbGFzcy9IdW1hbi9IdW1hblwiO1xuaW1wb3J0IHsgRmFybWVyIH0gZnJvbSBcIi4uL2NsYXNzL0h1bWFuL0Zhcm1lclwiO1xuaW1wb3J0IHsgTWVyY2hhbnQgfSBmcm9tIFwiLi4vY2xhc3MvSHVtYW4vTWVyY2hhbnRcIjtcbmltcG9ydCB7IEhvdXNlIH0gZnJvbSBcIi4uL2NsYXNzL0Fzc2V0L0hvdXNlXCI7XG5pbXBvcnQgeyBkcmF3RmllbGQgfSBmcm9tIFwiLi9kcmF3XCI7XG5pbXBvcnQgeyBleGl0QWRkSHVtYW5Nb2RlLCBlbnRlckFkZEh1bWFuTW9kZSwgZXhpdFNlbGVjdEh1bWFuTW9kZSB9IGZyb20gXCIuL2hhbmRsZU1vZGVcIjtcbmltcG9ydCB7IGdldEh1bWFuc0Zyb21Qb3MgfSBmcm9tIFwiLi91dGlsc1wiO1xuXG4vKipcbiAqIFNxdWFyZeOBjOOCr+ODquODg+OCr+OBleOCjOOBn+OBqOOBjeOBq+WRvOOBsOOCjOOAgeePvuWcqOOBruODouODvOODieOBq+W+k+OBo+OBpuWHpueQhuOCkuihjOOBhlxuICovXG5leHBvcnQgZnVuY3Rpb24gaGFuZGxlQ2xpY2tTcXVhcmUoeDogbnVtYmVyLCB5OiBudW1iZXIpOiB2b2lkIHtcbiAgICBzd2l0Y2ggKGdhbWVTdGF0ZS5tb2RlLmlkKSB7XG4gICAgICAgIGNhc2UgJ25ldXRyYWwnOlxuICAgICAgICAgICAgY29uc29sZS5sb2coRklFTERfU0laRSAqIHkgKyB4KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdhZGRIdW1hbic6XG4gICAgICAgICAgICAvLyDmjIflrprjga7loLTmiYDjgavkurrjgpLov73liqDjgZnjgotcbiAgICAgICAgICAgIGxldCBuZXdIdW1hbjogSHVtYW47XG4gICAgICAgICAgICBpZiAoZ2FtZVN0YXRlLm1vZGUuam9iID09PSBcImZhcm1lclwiKSB7XG4gICAgICAgICAgICAgICAgbmV3SHVtYW4gPSBuZXcgRmFybWVyKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGdhbWVTdGF0ZS5tb2RlLmpvYiA9PT0gXCJtZXJjaGFudFwiKSB7XG4gICAgICAgICAgICAgICAgbmV3SHVtYW4gPSBuZXcgTWVyY2hhbnQoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbmV3SHVtYW4gPSBuZXcgRmFybWVyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBuZXdIdW1hbi5ob21lUG9zID0geyB4LCB5IH07XG4gICAgICAgICAgICBuZXdIdW1hbi5wb3MgPSB7IHgsIHkgfTtcbiAgICAgICAgICAgIGFkZEh1bWFuKG5ld0h1bWFuKTtcbiAgICAgICAgICAgIC8vIOebpOmdouOCkuabtOaWsOOBmeOCi1xuICAgICAgICAgICAgZHJhd0ZpZWxkKCk7XG4gICAgICAgICAgICAvLyDjg5Ljg4jov73liqDjg6Ljg7zjg4njgpLmipzjgZHjgotcbiAgICAgICAgICAgIGV4aXRBZGRIdW1hbk1vZGUoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdzZWxlY3RIdW1hbic6XG4gICAgICAgICAgICBjb25zdCBodW1hbnMgPSBnZXRIdW1hbnNGcm9tUG9zKHsgeCwgeSB9KTtcbiAgICAgICAgICAgIC8vIOaMh+WumuOBruWgtOaJgOOBq+S6uuOBjOOBhOOBquOBkeOCjOOBsOS9leOCguOBl+OBquOBhFxuICAgICAgICAgICAgaWYgKGh1bWFucy5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIOaMh+WumuOBruWgtOaJgOOBruS6uuOBrumBuOaKnueKtuaFi+OCkuWPjei7ouOBleOBm+OCi1xuICAgICAgICAgICAgLy8g77yI6KSH5pWw5Lq644Gu5aC05ZCI44Gv44Oq44K544OI44Gu5YWI6aCt77yJXG4gICAgICAgICAgICBodW1hbnNbMF0uaXNTZWxlY3RlZCA9ICFodW1hbnNbMF0uaXNTZWxlY3RlZDtcbiAgICAgICAgICAgIC8vIOebpOmdouOCkuabtOaWsOOBmeOCi1xuICAgICAgICAgICAgZHJhd0ZpZWxkKCk7XG4gICAgICAgICAgICAvLyDpgbjmip7jg6Ljg7zjg4njgpLmipzjgZHjgotcbiAgICAgICAgICAgIGV4aXRTZWxlY3RIdW1hbk1vZGUoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cbn1cblxuLyoqXG4gKiBnYW1lU3RhdGXjgavkurrjgajlrrbjgpLov73liqBcbiAqL1xuZnVuY3Rpb24gYWRkSHVtYW4obmV3SHVtYW46IEh1bWFuKSB7XG4gICAgY29uc3QgeyB4LCB5IH0gPSBuZXdIdW1hbi5wb3M7XG4gICAgLy8g5Lq644KS6L+95YqgXG4gICAgZ2FtZVN0YXRlLmh1bWFucy5wdXNoKG5ld0h1bWFuKTtcbiAgICAvLyDlrrbjgpLov73liqBcbiAgICBnYW1lU3RhdGUuYXNzZXRzLnB1c2goXG4gICAgICAgIG5ldyBIb3VzZSh7IHgsIHkgfSwgbmV3SHVtYW4pXG4gICAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZUFkZEh1bWFuQ2xpY2soKTogdm9pZCB7XG4gICAgY29uc29sZS5sb2coXCJob2dlXCIpO1xuICAgIGNvbnN0IHJhZGlvSW5wdXRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeU5hbWUoXCJ0eXBlRm9ybVwiKSBhcyBOb2RlTGlzdE9mPEhUTUxJbnB1dEVsZW1lbnQ+O1xuICAgIGxldCBqb2I6IEpvYiB8IG51bGwgPSBudWxsO1xuICAgIHJhZGlvSW5wdXRzLmZvckVhY2goKHJhZGlvOiBIVE1MSW5wdXRFbGVtZW50KSA9PiB7XG4gICAgICAgIGlmIChyYWRpby5jaGVja2VkKSB7XG4gICAgICAgICAgICBqb2IgPSByYWRpby52YWx1ZSBhcyBKb2I7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmICgham9iKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImpvYiBpcyBub3Qgc2VsZWN0ZWQuIENhbid0IGVudGVyIGFkZC1odW1hbiBtb2RlLlwiKTtcbiAgICB9XG4gICAgY29uc29sZS5sb2coam9iKTtcblxuICAgIGVudGVyQWRkSHVtYW5Nb2RlKGpvYik7XG59IiwiaW1wb3J0IHsgSm9iIH0gZnJvbSBcIi4uL2NsYXNzL0h1bWFuL0h1bWFuXCI7XG5pbXBvcnQgeyBGSUVMRF9TSVpFLCBnYW1lU3RhdGUgfSBmcm9tIFwiLi4vZ2FtZVwiO1xuXG5leHBvcnQgdHlwZSBJbnRlcmZhY2VNb2RlID0ge1xuICAgIGlkOiAnbmV1dHJhbCc7XG4gIH0gfCB7XG4gICAgaWQ6ICdhZGRIdW1hbic7XG4gICAgam9iOiBKb2I7XG4gIH0gfCB7XG4gICAgaWQ6ICdzZWxlY3RIdW1hbic7XG4gIH07XG4vKipcbiAqIOS9jee9ruOBrumBuOaKnuODouODvOODieOBq+mBt+enu+OBl+OAgVNxdWFyZeS4iuOBp+ODm+ODkOODvOOBmeOCi+OBqOiJsuOBjOWkieOCj+OCi+OCiOOBhuOBq+OBquOCi1xuICovXG5leHBvcnQgZnVuY3Rpb24gZW50ZXJBZGRIdW1hbk1vZGUoam9iOiBKb2IpOiB2b2lkIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IEZJRUxEX1NJWkU7IGkrKykge1xuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IEZJRUxEX1NJWkU7IGorKykge1xuICAgICAgICAgICAgY29uc3Qgc3F1YXJlRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNxdWFyZS1cIiArIChGSUVMRF9TSVpFICogaSArIGopKTtcbiAgICAgICAgICAgIGlmICghc3F1YXJlRWwpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBzcXVhcmUtJHtGSUVMRF9TSVpFICogaSArIGp9IHdhcyBub3QgZm91bmQuYCk7XG4gICAgICAgICAgICAvLyDjg5vjg5Djg7zmmYLjgavoibLjgYzlpInjgo/jgovjgojjgYbjgavjgq/jg6njgrnjgpLov73liqBcbiAgICAgICAgICAgIHNxdWFyZUVsLmNsYXNzTGlzdC5hZGQoJ2h1bWFuLWFkZC1tb2RlJylcbiAgICAgICAgICAgIC8vIOmBuOaKnuODouODvOODieOBq+mBt+enu+OBmeOCi1xuICAgICAgICAgICAgZ2FtZVN0YXRlLm1vZGUgPSB7IGlkOiAnYWRkSHVtYW4nLCBqb2IgfTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLyoqXG4gKiDjg4vjg6Xjg7zjg4jjg6njg6vjg6Ljg7zjg4njgavpgbfnp7vjgZfjgIFTcXVhcmXkuIrjgafjg5vjg5Djg7zjgZfjgabjgoLoibLjgYzlpInjgo/jgonjgarjgYTjgojjgYbjgavjgZnjgotcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGV4aXRBZGRIdW1hbk1vZGUoKTogdm9pZCB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBGSUVMRF9TSVpFOyBpKyspIHtcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBGSUVMRF9TSVpFOyBqKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHNxdWFyZUVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzcXVhcmUtXCIgKyAoRklFTERfU0laRSAqIGkgKyBqKSk7XG4gICAgICAgICAgICBpZiAoIXNxdWFyZUVsKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgc3F1YXJlLSR7RklFTERfU0laRSAqIGkgKyBqfSB3YXMgbm90IGZvdW5kLmApO1xuICAgICAgICAgICAgLyog44Ob44OQ44O85pmC44Gr6Imy44GM5aSJ44KP44KL44Kv44Op44K544KS6Zmk5Y67ICovXG4gICAgICAgICAgICBzcXVhcmVFbC5jbGFzc0xpc3QucmVtb3ZlKCdodW1hbi1hZGQtbW9kZScpXG4gICAgICAgICAgICAvKiDjg4vjg6Xjg7zjg4jjg6njg6vjg6Ljg7zjg4njgavpgbfnp7vjgZnjgosgKi9cbiAgICAgICAgICAgIGdhbWVTdGF0ZS5tb2RlID0geyBpZDogJ25ldXRyYWwnIH07XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8qKlxuICog5ZC544GN5Ye644GX44KS6KGo56S644GZ44KL5Lq644KS6YG45oqe44GZ44KL44Oi44O844OJ44Gr6YG356e744GZ44KLXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBlbnRlclNlbGVjdEh1bWFuTW9kZSgpOiB2b2lkIHtcbiAgICBnYW1lU3RhdGUubW9kZSA9IHsgaWQ6ICdzZWxlY3RIdW1hbicgfTtcbn1cblxuLyoqXG4gKiDjg4vjg6Xjg7zjg4jjg6njg6vjg6Ljg7zjg4njgavpgbfnp7vjgZnjgotcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGV4aXRTZWxlY3RIdW1hbk1vZGUoKTogdm9pZCB7XG4gICAgZ2FtZVN0YXRlLm1vZGUgPSB7IGlkOiAnbmV1dHJhbCcgfTtcbn0iLCJpbXBvcnQgeyBQb3NpdGlvbiwgZ2FtZVN0YXRlIH0gZnJvbSBcIi4uL2dhbWVcIjtcbmltcG9ydCB7IEh1bWFuIH0gZnJvbSBcIi4uL2NsYXNzL0h1bWFuL0h1bWFuXCI7XG5pbXBvcnQgeyBGSUVMRF9TSVpFIH0gZnJvbSBcIi4uL2dhbWVcIjtcblxuLyoqXG4gKiDjgYLjgovluqfmqJnjgavjgYTjgovkurrjga7mpJzntKLjgZfjgIHphY3liJfjgavjgZfjgabov5TjgZlcbiAqIEBwYXJhbSBwb3Mg5bqn5qiZXG4gKiBAcmV0dXJucyDjgZ3jga7luqfmqJnjgavjgYTjgovkurrjga7phY3liJdcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEh1bWFuc0Zyb21Qb3MocG9zOiBQb3NpdGlvbik6IEh1bWFuW10ge1xuICAgIGNvbnN0IHJldEh1bWFuczogSHVtYW5bXSA9IFtdO1xuICAgIGdhbWVTdGF0ZS5odW1hbnMuZm9yRWFjaCgoaHVtYW4pID0+IHtcbiAgICAgICAgaWYgKGh1bWFuLnBvcy54ID09IHBvcy54ICYmIGh1bWFuLnBvcy55ID09IHBvcy55KSB7XG4gICAgICAgICAgICByZXRIdW1hbnMucHVzaChodW1hbik7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gcmV0SHVtYW5zO1xufVxuXG4vKipcbiAqIGdhbWVTdGF0ZS50aW1l44Gr5b6T44Gj44Gm5aSc44GL5ZCm44GL44KS6L+U44GZXG4gKiBAcmV0dXJucyDlpJzjgafjgYLjgovjgYvlkKbjgYtcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzTmlnaHQoKTogYm9vbGVhbiB7XG4gICAgaWYgKGdhbWVTdGF0ZS50aW1lLmggPj0gMTggfHwgZ2FtZVN0YXRlLnRpbWUuaCA8PSA2KSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG5cbi8qKlxuICog44Op44Oz44OA44Og44Gq5L2N572u44KS55Sf5oiQ44GX44CB6L+U44GZXG4gKiBAcmV0dXJucyBbeCwgeV1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVJhbmRvbVBvcygpOiBQb3NpdGlvbiB7XG4gICAgY29uc3QgeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIEZJRUxEX1NJWkUpO1xuICAgIGNvbnN0IHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBGSUVMRF9TSVpFKTtcbiAgICByZXR1cm4geyB4LCB5IH07XG59IiwiaW1wb3J0IHsgSW50ZXJmYWNlTW9kZSB9IGZyb20gXCIuL2Z1bmN0aW9uL2hhbmRsZU1vZGVcIjtcbmltcG9ydCB7IEpvYiwgSHVtYW4gfSBmcm9tIFwiLi9jbGFzcy9IdW1hbi9IdW1hblwiO1xuaW1wb3J0IHsgQXNzZXQgfSBmcm9tIFwiLi9jbGFzcy9Bc3NldC9Bc3NldFwiO1xuXG4vKiDnm6TpnaLjga7jgrXjgqTjgrogKi9cbmV4cG9ydCBjb25zdCBGSUVMRF9TSVpFID0gODtcblxuZXhwb3J0IGxldCBnYW1lU3RhdGU6IEdhbWVTdGF0ZSA9IHtcbiAgICB0aW1lOiB7IGQ6IDEsIGg6IDE0LCBtOiAzMCB9LFxuICAgIG1vZGU6IHsgaWQ6IFwibmV1dHJhbFwiIH0sXG4gICAgaHVtYW5zOiBbXSxcbiAgICBhc3NldHM6IFtdLFxufVxuXG4vLyA9PT09PT09PT09PT09PT09PSB0eXBlID09PT09PT09PT09PT09PT1cblxuZXhwb3J0IHR5cGUgR2FtZVN0YXRlID0ge1xuICAgIHRpbWU6IFRpbWU7XG4gICAgbW9kZTogSW50ZXJmYWNlTW9kZTtcbiAgICBodW1hbnM6IEh1bWFuW107XG4gICAgYXNzZXRzOiBBc3NldFtdO1xufVxuXG50eXBlIFRpbWUgPSB7XG4gICAgZDogbnVtYmVyO1xuICAgIGg6IG51bWJlcjtcbiAgICBtOiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSFRNTEV2ZW50PFQgZXh0ZW5kcyBFdmVudFRhcmdldD4gZXh0ZW5kcyBFdmVudCB7XG4gICAgdGFyZ2V0OiBUO1xufVxuXG5leHBvcnQgdHlwZSBQb3NpdGlvbiA9IHtcbiAgICB4OiBudW1iZXIsXG4gICAgeTogbnVtYmVyLFxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgZHJhd0ZpZWxkLCBkcmF3VGltZSB9IGZyb20gXCIuL2Z1bmN0aW9uL2RyYXdcIjtcclxuaW1wb3J0IHsgaGFuZGxlQWRkSHVtYW5DbGljaywgaGFuZGxlQ2xpY2tTcXVhcmUgfSBmcm9tIFwiLi9mdW5jdGlvbi9oYW5kbGVBY3Rpb25cIjtcclxuaW1wb3J0IHsgZW50ZXJTZWxlY3RIdW1hbk1vZGUgfSBmcm9tIFwiLi9mdW5jdGlvbi9oYW5kbGVNb2RlXCI7XHJcbmltcG9ydCB7IEZJRUxEX1NJWkUsIGdhbWVTdGF0ZSB9IGZyb20gXCIuL2dhbWVcIjtcclxuXHJcbmxldCBpbnRlcnZhbElkOiBudW1iZXI7XHJcbmxldCBpc0xvb3Bpbmc6IGJvb2xlYW47XHJcblxyXG4vLyDjg5rjg7zjgrjjgYzoqq3jgb/ovrzjgb7jgozjgZ/jgajjgY3jga7lh6bnkIZcclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKGUpID0+IHtcclxuICAgIC8vIDHnp5LjgZTjgajjgatpbnRlcnZhbEZ1bmPjgpLlrp/ooYzjgZnjgovjgojjgYbjgavoqK3lrppcclxuICAgIGludGVydmFsSWQgPSBzZXRJbnRlcnZhbChpbnRlcnZhbEZ1bmMsIDEwMDApO1xyXG4gICAgaXNMb29waW5nID0gdHJ1ZTtcclxuXHJcbiAgICAvLyDjgqTjg5njg7Pjg4jjg4/jg7Pjg4njg6njg7zjgpLnmbvpjLJcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VsZWN0SHVtYW5CdXR0b25cIik/LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlbnRlclNlbGVjdEh1bWFuTW9kZSk7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN3aXRjaEludGVydmFsQnV0dG9uXCIpPy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc3dpdGNoSW50ZXJ2YWwpO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGRIdW1hbkJ1dHRvblwiKT8uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZUFkZEh1bWFuQ2xpY2spO1xyXG5cclxuICAgIC8vIOaPj+eUu1xyXG4gICAgY3JlYXRlRmllbGQoKTtcclxuICAgIGRyYXdGaWVsZCgpO1xyXG4gICAgZHJhd1RpbWUoKTtcclxufSk7XHJcblxyXG4vKipcclxuICogMeWNmOS9jeaZgumWk+OBlOOBqOOBq+WRvOOBsOOCjOOCi+mWouaVsFxyXG4gKi9cclxuZnVuY3Rpb24gaW50ZXJ2YWxGdW5jKCk6IHZvaWQge1xyXG4gICAgLy8gMeWNmOS9jeaZgumWk+OBlOOBqOOBq+ebpOmdouOCkuabtOaWsOOBmeOCi1xyXG4gICAgZ2FtZVN0YXRlLmh1bWFucy5mb3JFYWNoKChodW1hbikgPT4gaHVtYW4uc3BlbmRUaW1lKCkpO1xyXG4gICAgLy8g5pmC6ZaT44KSMTDliIbpgLLjgoHjgotcclxuICAgIGdhbWVTdGF0ZS50aW1lLmggPSAoZ2FtZVN0YXRlLnRpbWUuaCArIDEpICUgMjQ7XHJcbiAgICAvLyDnm6TpnaLjgarjganjgpLmm7TmlrBcclxuICAgIGRyYXdGaWVsZCgpO1xyXG4gICAgZHJhd1RpbWUoKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIOOCpOODs+OCv+ODvOODkOODq+OBruOCquODsy/jgqrjg5XjgpLliIfjgormm7/jgYjjgotcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzd2l0Y2hJbnRlcnZhbCgpOiB2b2lkIHtcclxuICAgIGlmIChpc0xvb3BpbmcpIHtcclxuICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsSWQpO1xyXG4gICAgICAgIGlzTG9vcGluZyA9IGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBpbnRlcnZhbElkID0gc2V0SW50ZXJ2YWwoaW50ZXJ2YWxGdW5jLCAxMDAwKTtcclxuICAgICAgICBpc0xvb3BpbmcgPSB0cnVlO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogRklFTERfU0laRSAqIEZJRUxEX1NJWkUg44Gu55uk6Z2i44KS5L2c5oiQ44GZ44KLXHJcbiAqL1xyXG5mdW5jdGlvbiBjcmVhdGVGaWVsZCgpOiB2b2lkIHtcclxuICAgIGNvbnN0IGZpZWxkRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZpZWxkXCIpO1xyXG4gICAgaWYgKCFmaWVsZEVsKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCc8ZGl2IGlkPVwiZmllbGRcIj48L2Rpdj4gaXMgbnVsbC4nKTtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IEZJRUxEX1NJWkU7IGkrKykge1xyXG4gICAgICAgIC8vIOihjOOBruimgee0oOOCkuS9nOaIkFxyXG4gICAgICAgIGNvbnN0IGxpbmVFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgbGluZUVsLmNsYXNzTmFtZSA9IFwiYm9hcmQtcm93XCI7XHJcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBGSUVMRF9TSVpFOyBqKyspIHtcclxuICAgICAgICAgICAgLy8g5ZCE6KGM44Gu5YiX44Gu6KaB57Sg44KS5L2c5oiQXHJcbiAgICAgICAgICAgIGNvbnN0IHNxdWFyZUVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgICAgICAgICAgc3F1YXJlRWwuY2xhc3NOYW1lID0gXCJzcXVhcmVcIjtcclxuICAgICAgICAgICAgc3F1YXJlRWwuaWQgPSBcInNxdWFyZS1cIiArIChGSUVMRF9TSVpFICogaSArIGopO1xyXG4gICAgICAgICAgICBzcXVhcmVFbC5vbmNsaWNrID0gKCkgPT4gaGFuZGxlQ2xpY2tTcXVhcmUoaiwgaSk7XHJcbiAgICAgICAgICAgIC8vIOihjOOBruWtkOimgee0oOOBq+OBmeOCi1xyXG4gICAgICAgICAgICBsaW5lRWwuYXBwZW5kQ2hpbGQoc3F1YXJlRWwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDooYzjga7opoHntKDjgpLlrZDopoHntKDjgavjgZnjgotcclxuICAgICAgICBmaWVsZEVsLmFwcGVuZENoaWxkKGxpbmVFbCk7XHJcbiAgICB9XHJcbn1cclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9