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
    isThereOwner() {
        return this.pos.x === this.owner.pos.x && this.pos.y === this.owner.pos.y;
    }
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
/* harmony import */ var _Task_Sleeping__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Task/Sleeping */ "./src/class/Task/Sleeping.ts");
/* harmony import */ var _Task_Walking__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Task/Walking */ "./src/class/Task/Walking.ts");
/* harmony import */ var _function_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../function/utils */ "./src/function/utils.ts");





class Farmer extends _Human__WEBPACK_IMPORTED_MODULE_0__.Human {
    /**
     * ランダムにタスクを決める
     */
    determineTask() {
        // TODO タスクの数を増やす
        // TODO タスクを現在のパラメータに従って決めるように変更
        if (16 < _game__WEBPACK_IMPORTED_MODULE_1__.gameState.time.h) {
            // 寝る
            console.log("眠ります");
            this.task = new _Task_Sleeping__WEBPACK_IMPORTED_MODULE_2__.Sleeping(this.homePos);
        }
        else {
            // 散歩する
            let dest = (0,_function_utils__WEBPACK_IMPORTED_MODULE_4__.getRandomPos)();
            // 目的地がアセットであってはならない
            while ((0,_function_utils__WEBPACK_IMPORTED_MODULE_4__.getAssetFromPos)(dest) !== undefined)
                dest = (0,_function_utils__WEBPACK_IMPORTED_MODULE_4__.getRandomPos)();
            console.log(`(${dest.x}, ${dest.y})へ向かいます`);
            this.task = new _Task_Walking__WEBPACK_IMPORTED_MODULE_3__.Walking(dest);
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
/* harmony export */   Human: () => (/* binding */ Human),
/* harmony export */   addObstacleToCostMap: () => (/* binding */ addObstacleToCostMap),
/* harmony export */   removeObstacleFromCostMap: () => (/* binding */ removeObstacleFromCostMap)
/* harmony export */ });
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../game */ "./src/game.ts");
/* harmony import */ var _Task_Sleeping__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Task/Sleeping */ "./src/class/Task/Sleeping.ts");
/* harmony import */ var _Task_Walking__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Task/Walking */ "./src/class/Task/Walking.ts");
/* harmony import */ var _function_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../function/utils */ "./src/function/utils.ts");





class Human {
    static humanNum = 1;
    timeCounter = 0;
    name;
    _pos;
    homePos;
    _hp;
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
    get hp() { return this._hp; }
    /**
     * hpを更新する。0以下になった場合gameState.humansから自身を削除
     * @param deltaHp hpの変化量
     */
    changeHp(deltaHp) {
        this._hp += deltaHp;
        if (this.hp <= 0) {
            // 死亡したので、世界から自分を消去
            // TODO : もし死亡した人も管理するならここを編集
            _game__WEBPACK_IMPORTED_MODULE_0__.gameState.humans = _game__WEBPACK_IMPORTED_MODULE_0__.gameState.humans.filter((human) => human !== this);
        }
    }
    /**
     * 1単位時間過ごす
     */
    spendTime() {
        // タスクを完了している場合、次のタスクを決める
        if (!this.task) {
            this.determineTask();
        }
        // タスクに従って行動する
        if (this.task instanceof _Task_Sleeping__WEBPACK_IMPORTED_MODULE_1__.Sleeping) {
            this.task.handleSleep(this);
        }
        else if (this.task instanceof _Task_Walking__WEBPACK_IMPORTED_MODULE_2__.Walking) {
            _Task_Walking__WEBPACK_IMPORTED_MODULE_2__.Walking.handleWalking(this);
        }
        // hpを更新する（基礎代謝）
        this.timeCounter += 1;
        this.timeCounter %= 3;
        if (this.timeCounter === 0) {
            this.changeHp(-1);
        }
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
        const destIsAsset = (0,_function_utils__WEBPACK_IMPORTED_MODULE_3__.getAssetFromPos)(dest) !== undefined;
        if (destIsAsset) {
            // 目的地点がアセットならば、障害物でなくする
            removeObstacleFromCostMap(dest);
        }
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
        if (destIsAsset) {
            // 目的地点がアセットならば、再び障害物として登録する
            addObstacleToCostMap(dest);
        }
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
        this._hp = hp;
        this.job = job;
        this.color = color;
        this.character = character;
        this.isSelected = isSelected;
        this.task = null;
    }
}
// dijkstraに必要な変数
const INF = 100000;
const V = _game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE * _game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE;
// 隣接行列
const cost = Array.from({ length: V })
    .map(n => Array.from({ length: V }).map(n => INF));
// 隣接行列を初期化
for (let y = 0; y < _game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE; y++)
    for (let x = 0; x < _game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE; x++)
        registerSquareToCostMap({ x, y });
/**
 * あるマスから、その上下左右のマスに移動できるようにcostマップに登録する
 * @param pos 登録するマスの位置
 */
function registerSquareToCostMap(pos) {
    const deltaPositions = [
        { x: -1, y: 0 },
        { x: 0, y: -1 },
        { x: +1, y: 0 },
        { x: 0, y: +1 },
    ];
    // posの上下左右のマスへ、posからエッジを生やす
    deltaPositions.forEach((deltaPos) => {
        const x = pos.x + deltaPos.x;
        const y = pos.y + deltaPos.y;
        if (x < 0 || x >= _game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE || y < 0 || y >= _game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE)
            return;
        else
            cost[_game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE * pos.y + pos.x][_game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE * y + x] = 1;
    });
}
/**
 * costマップから障害物（通れないマス）を取り除く
 * @param pos 障害物の位置
 */
function removeObstacleFromCostMap(pos) {
    const deltaPositions = [
        { x: -1, y: 0 },
        { x: 0, y: -1 },
        { x: +1, y: 0 },
        { x: 0, y: +1 },
    ];
    // posの上下左右のマスから、posへのエッジを生やして、posに行けるようにする
    deltaPositions.forEach((deltaPos) => {
        const x = pos.x + deltaPos.x;
        const y = pos.y + deltaPos.y;
        if (x < 0 || x >= _game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE || y < 0 || y >= _game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE)
            return;
        else
            cost[_game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE * y + x][_game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE * pos.y + pos.x] = 1;
    });
}
/**
 * costマップに障害物（通れないマス）を登録する
 * @param pos 障害物の位置
 */
function addObstacleToCostMap(pos) {
    const deltaPositions = [
        { x: -1, y: 0 },
        { x: 0, y: -1 },
        { x: +1, y: 0 },
        { x: 0, y: +1 },
    ];
    // posの上下左右のマスから、posへのエッジを消して、posに行けないようにする
    deltaPositions.forEach((deltaPos) => {
        const x = pos.x + deltaPos.x;
        const y = pos.y + deltaPos.y;
        if (x < 0 || x >= _game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE || y < 0 || y >= _game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE)
            return;
        else
            cost[_game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE * y + x][_game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE * pos.y + pos.x] = INF;
    });
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
/* harmony import */ var _Task_Sleeping__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Task/Sleeping */ "./src/class/Task/Sleeping.ts");
/* harmony import */ var _Task_Walking__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Task/Walking */ "./src/class/Task/Walking.ts");
/* harmony import */ var _function_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../function/utils */ "./src/function/utils.ts");





class Merchant extends _Human__WEBPACK_IMPORTED_MODULE_0__.Human {
    /**
     * ランダムにタスクを決める
     */
    determineTask() {
        // TODO タスクの数を増やす
        // TODO タスクを現在のパラメータに従って決めるように変更
        if (16 < _game__WEBPACK_IMPORTED_MODULE_1__.gameState.time.h) {
            // 寝る
            console.log("眠ります");
            this.task = new _Task_Sleeping__WEBPACK_IMPORTED_MODULE_2__.Sleeping(this.homePos);
        }
        else {
            // 散歩する
            let dest = (0,_function_utils__WEBPACK_IMPORTED_MODULE_4__.getRandomPos)();
            // 目的地がアセットであってはならない
            while ((0,_function_utils__WEBPACK_IMPORTED_MODULE_4__.getAssetFromPos)(dest) !== undefined)
                dest = (0,_function_utils__WEBPACK_IMPORTED_MODULE_4__.getRandomPos)();
            console.log(`(${dest.x}, ${dest.y})へ向かいます`);
            this.task = new _Task_Walking__WEBPACK_IMPORTED_MODULE_3__.Walking(dest);
        }
    }
    constructor(name = `Human${_Human__WEBPACK_IMPORTED_MODULE_0__.Human.humanNum}`, homePos = { x: 0, y: 0 }, hp = 100, color = "#FF0000", character = { wisdom: 0.5 }, isSelected = false) {
        super(name, homePos, hp, "merchant", color, character, isSelected);
    }
}


/***/ }),

/***/ "./src/class/Task/Sleeping.ts":
/*!************************************!*\
  !*** ./src/class/Task/Sleeping.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Sleeping: () => (/* binding */ Sleeping)
/* harmony export */ });
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../game */ "./src/game.ts");
/* harmony import */ var _Task__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Task */ "./src/class/Task/Task.ts");
/* harmony import */ var _function_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../function/utils */ "./src/function/utils.ts");



class Sleeping extends _Task__WEBPACK_IMPORTED_MODULE_1__.Task {
    isSleeping;
    handleSleep(human) {
        if ((0,_function_utils__WEBPACK_IMPORTED_MODULE_2__.isNight)()) {
            // 夜
            if (human.pos.x === human.homePos.x && human.pos.y === human.homePos.y) {
                // 家にいる
                if (!this.isSleeping) {
                    // まだ寝ていないので、時間に応じた確率で寝る
                    // TODO : 性格などの値も考慮したい
                    const r = Math.floor(Math.random() * 10);
                    const h = _game__WEBPACK_IMPORTED_MODULE_0__.gameState.time.h;
                    let threshold;
                    // 閾値は、夜が更けるほど小さくなる
                    if (h < 12) {
                        // AM
                        threshold = -(5 / 4) * h + 5;
                    }
                    else {
                        // PM
                        threshold = -(5 / 6) * (h - 24) + 5;
                    }
                    if (threshold < r) {
                        // ランダムな値が閾値を超えたら寝る
                        this.isSleeping = true;
                    }
                }
                else {
                    // 寝ているのでhpを回復
                    human.changeHp(+1);
                }
            }
            else {
                // 出先なので、家に帰る
                human.headToDest(human.homePos);
            }
        }
        else {
            // 朝
            const r = Math.floor(Math.random() * 10);
            const h = _game__WEBPACK_IMPORTED_MODULE_0__.gameState.time.h;
            // TODO : 性格などの値も考慮したい
            const threshold = -5 / 2 * (h - 7) + 5;
            if (threshold < r) {
                // 起きる
                human.task = null;
            }
        }
    }
    constructor(where) {
        super(where);
        this.isSleeping = false;
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
    where;
    constructor(where) {
        if (where.x < 0 || _game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE <= where.x
            || where.y < 0 || _game__WEBPACK_IMPORTED_MODULE_0__.FIELD_SIZE <= where.y) {
            throw new Error('Position must be 0 <= x < FIELD_SIZE');
        }
        this.where = where;
    }
}


/***/ }),

/***/ "./src/class/Task/Walking.ts":
/*!***********************************!*\
  !*** ./src/class/Task/Walking.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Walking: () => (/* binding */ Walking)
/* harmony export */ });
/* harmony import */ var _Task__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Task */ "./src/class/Task/Task.ts");

class Walking extends _Task__WEBPACK_IMPORTED_MODULE_0__.Task {
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
    constructor(where) {
        super(where);
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
/* harmony import */ var _class_Task_Sleeping__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../class/Task/Sleeping */ "./src/class/Task/Sleeping.ts");




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
            if (asset.isThereOwner()) {
                if (asset.owner.task instanceof _class_Task_Sleeping__WEBPACK_IMPORTED_MODULE_3__.Sleeping
                    && asset.owner.task.isSleeping) {
                    asset.className = 'sleeping-house';
                }
                else if ((0,_utils__WEBPACK_IMPORTED_MODULE_2__.isNight)()) {
                    asset.className = 'evening-house';
                }
                else {
                    asset.className = 'normal-house';
                }
                // 画像を表示するためにマスの文字列を消す
                const textEl = squareEl.childNodes[0];
                textEl.textContent = "";
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
            // 各マスの文字列を空文字列にリセット
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
/* harmony import */ var _class_Human_Human__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../class/Human/Human */ "./src/class/Human/Human.ts");
/* harmony import */ var _class_Human_Farmer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../class/Human/Farmer */ "./src/class/Human/Farmer.ts");
/* harmony import */ var _class_Human_Merchant__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../class/Human/Merchant */ "./src/class/Human/Merchant.ts");
/* harmony import */ var _class_Asset_House__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../class/Asset/House */ "./src/class/Asset/House.ts");
/* harmony import */ var _draw__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./draw */ "./src/function/draw.ts");
/* harmony import */ var _handleMode__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./handleMode */ "./src/function/handleMode.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils */ "./src/function/utils.ts");








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
                newHuman = new _class_Human_Farmer__WEBPACK_IMPORTED_MODULE_2__.Farmer();
            }
            else if (_game__WEBPACK_IMPORTED_MODULE_0__.gameState.mode.job === "merchant") {
                newHuman = new _class_Human_Merchant__WEBPACK_IMPORTED_MODULE_3__.Merchant();
            }
            else {
                newHuman = new _class_Human_Farmer__WEBPACK_IMPORTED_MODULE_2__.Farmer();
            }
            newHuman.homePos = { x, y };
            newHuman.pos = { x, y };
            addHuman(newHuman);
            // 盤面を更新する
            (0,_draw__WEBPACK_IMPORTED_MODULE_5__.drawField)();
            // ヒト追加モードを抜ける
            (0,_handleMode__WEBPACK_IMPORTED_MODULE_6__.exitAddHumanMode)();
            break;
        case 'selectHuman':
            const humans = (0,_utils__WEBPACK_IMPORTED_MODULE_7__.getHumansFromPos)({ x, y });
            // 指定の場所に人がいなければ何もしない
            if (humans.length == 0) {
                return;
            }
            // 指定の場所の人の選択状態を反転させる
            // （複数人の場合はリストの先頭）
            humans[0].isSelected = !humans[0].isSelected;
            // 盤面を更新する
            (0,_draw__WEBPACK_IMPORTED_MODULE_5__.drawField)();
            // 選択モードを抜ける
            (0,_handleMode__WEBPACK_IMPORTED_MODULE_6__.exitSelectHumanMode)();
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
    addAsset(new _class_Asset_House__WEBPACK_IMPORTED_MODULE_4__.House({ x, y }, newHuman), true);
}
/**
 * gameStateにアセットを追加。isObstacleが真なら障害物としてcostマップに登録する
 * @param newAsset 追加するアセット
 * @param isObstacle 障害物であるか否か
 */
function addAsset(newAsset, isObstacle) {
    _game__WEBPACK_IMPORTED_MODULE_0__.gameState.assets.push(newAsset);
    if (isObstacle)
        (0,_class_Human_Human__WEBPACK_IMPORTED_MODULE_1__.addObstacleToCostMap)(newAsset.pos);
}
/**
 * addHumanボタンをクリックした際の処理を行う
 */
function handleAddHumanClick() {
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
    (0,_handleMode__WEBPACK_IMPORTED_MODULE_6__.enterAddHumanMode)(job);
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
/* harmony export */   getAssetFromPos: () => (/* binding */ getAssetFromPos),
/* harmony export */   getHumansFromPos: () => (/* binding */ getHumansFromPos),
/* harmony export */   getRandomPos: () => (/* binding */ getRandomPos),
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
 * ある座標にあるアセットを検索し、あればそのアセットを返す。なければundefinedを返す
 * @param pos 座標
 * @returns その座標にアセットがある場合はそのアセット。なければundefined
 */
function getAssetFromPos(pos) {
    return _game__WEBPACK_IMPORTED_MODULE_0__.gameState.assets.find((asset) => {
        return asset.pos.x === pos.x && asset.pos.y === pos.y;
    });
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
function getRandomPos() {
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
    time: { d: 0, h: 12, m: 0 },
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
    _game__WEBPACK_IMPORTED_MODULE_3__.gameState.time.m += 10;
    if (_game__WEBPACK_IMPORTED_MODULE_3__.gameState.time.m >= 60) {
        _game__WEBPACK_IMPORTED_MODULE_3__.gameState.time.m %= 60;
        _game__WEBPACK_IMPORTED_MODULE_3__.gameState.time.h += 1;
        if (_game__WEBPACK_IMPORTED_MODULE_3__.gameState.time.h >= 24) {
            _game__WEBPACK_IMPORTED_MODULE_3__.gameState.time.h %= 24;
            _game__WEBPACK_IMPORTED_MODULE_3__.gameState.time.d += 1;
        }
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDO1FBQy9CLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyw2Q0FBVSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDbEMsYUFBYTtZQUNiLE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDbEQsUUFBUSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7WUFDOUIsUUFBUSxDQUFDLEVBQUUsR0FBRyxTQUFTLEdBQUcsQ0FBQyw2Q0FBVSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUMvQyxRQUFRLENBQUMsT0FBTyxHQUFHLEdBQUcsRUFBRSxDQUFDLHlFQUFpQixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNqRCxXQUFXO1lBQ1gsTUFBTSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNqQyxDQUFDO1FBQ0QsY0FBYztRQUNkLE9BQU8sQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDaEMsQ0FBQztBQUNMLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tYXRyaXgtZ2FtZS8uL3NyYy9jbGFzcy9Bc3NldC9Bc3NldC50cyIsIndlYnBhY2s6Ly9tYXRyaXgtZ2FtZS8uL3NyYy9jbGFzcy9Bc3NldC9Ib3VzZS50cyIsIndlYnBhY2s6Ly9tYXRyaXgtZ2FtZS8uL3NyYy9jbGFzcy9IdW1hbi9GYXJtZXIudHMiLCJ3ZWJwYWNrOi8vbWF0cml4LWdhbWUvLi9zcmMvY2xhc3MvSHVtYW4vSHVtYW4udHMiLCJ3ZWJwYWNrOi8vbWF0cml4LWdhbWUvLi9zcmMvY2xhc3MvSHVtYW4vTWVyY2hhbnQudHMiLCJ3ZWJwYWNrOi8vbWF0cml4LWdhbWUvLi9zcmMvY2xhc3MvVGFzay9TbGVlcGluZy50cyIsIndlYnBhY2s6Ly9tYXRyaXgtZ2FtZS8uL3NyYy9jbGFzcy9UYXNrL1Rhc2sudHMiLCJ3ZWJwYWNrOi8vbWF0cml4LWdhbWUvLi9zcmMvY2xhc3MvVGFzay9XYWxraW5nLnRzIiwid2VicGFjazovL21hdHJpeC1nYW1lLy4vc3JjL2Z1bmN0aW9uL2RyYXcudHMiLCJ3ZWJwYWNrOi8vbWF0cml4LWdhbWUvLi9zcmMvZnVuY3Rpb24vaGFuZGxlQWN0aW9uLnRzIiwid2VicGFjazovL21hdHJpeC1nYW1lLy4vc3JjL2Z1bmN0aW9uL2hhbmRsZU1vZGUudHMiLCJ3ZWJwYWNrOi8vbWF0cml4LWdhbWUvLi9zcmMvZnVuY3Rpb24vdXRpbHMudHMiLCJ3ZWJwYWNrOi8vbWF0cml4LWdhbWUvLi9zcmMvZ2FtZS50cyIsIndlYnBhY2s6Ly9tYXRyaXgtZ2FtZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9tYXRyaXgtZ2FtZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbWF0cml4LWdhbWUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9tYXRyaXgtZ2FtZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL21hdHJpeC1nYW1lLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBvc2l0aW9uLCBGSUVMRF9TSVpFIH0gZnJvbSBcIi4uLy4uL2dhbWVcIjtcbmltcG9ydCB7IEh1bWFuIH0gZnJvbSBcIi4uL0h1bWFuL0h1bWFuXCI7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBc3NldCB7XG4gICAgcG9zOiBQb3NpdGlvbjtcbiAgICBvd25lcjogSHVtYW47XG5cbiAgICBpc1RoZXJlT3duZXIoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnBvcy54ID09PSB0aGlzLm93bmVyLnBvcy54ICYmIHRoaXMucG9zLnkgPT09IHRoaXMub3duZXIucG9zLnk7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IocG9zOiBQb3NpdGlvbiwgb3duZXI6IEh1bWFuKSB7XG4gICAgICAgIGlmIChwb3MueCA8IDAgfHwgcG9zLnggPj0gRklFTERfU0laRSB8fCBwb3MueSA8IDAgfHwgcG9zLnkgPj0gRklFTERfU0laRSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBwb3MueCwgcG94LnkgbXVzdCBiZSBpbiAwIDw9IGEgPCBGSUVMRF9TSVpFYCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wb3MgPSBwb3M7XG4gICAgICAgIHRoaXMub3duZXIgPSBvd25lcjtcbiAgICB9XG59IiwiaW1wb3J0IHsgQXNzZXQgfSBmcm9tIFwiLi9Bc3NldFwiO1xuaW1wb3J0IHsgUG9zaXRpb24gfSBmcm9tIFwiLi4vLi4vZ2FtZVwiO1xuaW1wb3J0IHsgSHVtYW4gfSBmcm9tIFwiLi4vSHVtYW4vSHVtYW5cIjtcblxuZXhwb3J0IGNsYXNzIEhvdXNlIGV4dGVuZHMgQXNzZXQge1xuICAgIGNsYXNzTmFtZTogXCJub3JtYWwtaG91c2VcIiB8IFwiZXZlbmluZy1ob3VzZVwiIHwgXCJuaWdodC1ob3VzZVwiIHwgXCJzbGVlcGluZy1ob3VzZVwiO1xuXG4gICAgY29uc3RydWN0b3IocG9zOiBQb3NpdGlvbiwgb3duZXI6IEh1bWFuKSB7XG4gICAgICAgIHN1cGVyKHBvcywgb3duZXIpO1xuICAgICAgICB0aGlzLmNsYXNzTmFtZSA9IFwibm9ybWFsLWhvdXNlXCI7XG4gICAgfVxufSIsImltcG9ydCB7IEh1bWFuLCBDaGFyYWN0ZXIgfSBmcm9tIFwiLi9IdW1hblwiO1xuaW1wb3J0IHsgZ2FtZVN0YXRlLCBQb3NpdGlvbiB9IGZyb20gXCIuLi8uLi9nYW1lXCI7XG5pbXBvcnQgeyBTbGVlcGluZyB9IGZyb20gXCIuLi9UYXNrL1NsZWVwaW5nXCI7XG5pbXBvcnQgeyBXYWxraW5nIH0gZnJvbSBcIi4uL1Rhc2svV2Fsa2luZ1wiO1xuaW1wb3J0IHsgZ2V0QXNzZXRGcm9tUG9zLCBnZXRSYW5kb21Qb3MgfSBmcm9tIFwiLi4vLi4vZnVuY3Rpb24vdXRpbHNcIjtcblxuZXhwb3J0IGNsYXNzIEZhcm1lciBleHRlbmRzIEh1bWFuIHtcbiAgICAvKipcbiAgICAgKiDjg6njg7Pjg4Djg6Djgavjgr/jgrnjgq/jgpLmsbrjgoHjgotcbiAgICAgKi9cbiAgICBkZXRlcm1pbmVUYXNrKCk6IHZvaWQge1xuICAgICAgICAvLyBUT0RPIOOCv+OCueOCr+OBruaVsOOCkuWil+OChOOBmVxuICAgICAgICAvLyBUT0RPIOOCv+OCueOCr+OCkuePvuWcqOOBruODkeODqeODoeODvOOCv+OBq+W+k+OBo+OBpuaxuuOCgeOCi+OCiOOBhuOBq+WkieabtFxuICAgICAgICBpZiAoMTYgPCBnYW1lU3RhdGUudGltZS5oKSB7XG4gICAgICAgICAgICAvLyDlr53jgotcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi55yg44KK44G+44GZXCIpO1xuICAgICAgICAgICAgdGhpcy50YXNrID0gbmV3IFNsZWVwaW5nKHRoaXMuaG9tZVBvcyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyDmlaPmranjgZnjgotcbiAgICAgICAgICAgIGxldCBkZXN0OiBQb3NpdGlvbiA9IGdldFJhbmRvbVBvcygpO1xuICAgICAgICAgICAgLy8g55uu55qE5Zyw44GM44Ki44K744OD44OI44Gn44GC44Gj44Gm44Gv44Gq44KJ44Gq44GEXG4gICAgICAgICAgICB3aGlsZSAoZ2V0QXNzZXRGcm9tUG9zKGRlc3QpICE9PSB1bmRlZmluZWQpIGRlc3QgPSBnZXRSYW5kb21Qb3MoKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGAoJHtkZXN0Lnh9LCAke2Rlc3QueX0p44G45ZCR44GL44GE44G+44GZYCk7XG4gICAgICAgICAgICB0aGlzLnRhc2sgPSBuZXcgV2Fsa2luZyhkZXN0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBuYW1lOiBzdHJpbmcgPSBgSHVtYW4ke0h1bWFuLmh1bWFuTnVtfWAsXG4gICAgICAgIGhvbWVQb3M6IFBvc2l0aW9uID0geyB4OiAwLCB5OiAwIH0sXG4gICAgICAgIGhwOiBudW1iZXIgPSAxMDAsXG4gICAgICAgIGNvbG9yOiBzdHJpbmcgPSBcIiNGRjAwMDBcIixcbiAgICAgICAgY2hhcmFjdGVyOiBDaGFyYWN0ZXIgPSB7IHdpc2RvbTogMC41IH0sXG4gICAgICAgIGlzU2VsZWN0ZWQ6IGJvb2xlYW4gPSBmYWxzZSxcbiAgICApIHtcbiAgICAgICAgc3VwZXIobmFtZSwgaG9tZVBvcywgaHAsIFwiZmFybWVyXCIsIGNvbG9yLCBjaGFyYWN0ZXIsIGlzU2VsZWN0ZWQpO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBQb3NpdGlvbiwgZ2FtZVN0YXRlIH0gZnJvbSBcIi4uLy4uL2dhbWVcIjtcbmltcG9ydCB7IFRhc2sgfSBmcm9tIFwiLi4vVGFzay9UYXNrXCI7XG5pbXBvcnQgeyBGSUVMRF9TSVpFIH0gZnJvbSBcIi4uLy4uL2dhbWVcIjtcbmltcG9ydCB7IFNsZWVwaW5nIH0gZnJvbSBcIi4uL1Rhc2svU2xlZXBpbmdcIjtcbmltcG9ydCB7IFdhbGtpbmcgfSBmcm9tIFwiLi4vVGFzay9XYWxraW5nXCI7XG5pbXBvcnQgeyBnZXRBc3NldEZyb21Qb3MgfSBmcm9tIFwiLi4vLi4vZnVuY3Rpb24vdXRpbHNcIjtcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEh1bWFuIHtcbiAgICBzdGF0aWMgaHVtYW5OdW0gPSAxO1xuICAgIHByaXZhdGUgdGltZUNvdW50ZXIgPSAwO1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBwcml2YXRlIF9wb3M6IFBvc2l0aW9uO1xuICAgIGhvbWVQb3M6IFBvc2l0aW9uO1xuICAgIHByaXZhdGUgX2hwOiBudW1iZXI7XG4gICAgam9iOiBKb2I7XG4gICAgY29sb3I6IHN0cmluZztcbiAgICBjaGFyYWN0ZXI6IENoYXJhY3RlcjtcbiAgICBpc1NlbGVjdGVkOiBib29sZWFuO1xuICAgIHRhc2s6IFRhc2sgfCBudWxsO1xuXG4gICAgZ2V0IHBvcygpOiBQb3NpdGlvbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wb3M7XG4gICAgfVxuXG4gICAgc2V0IHBvcyhuZXdQb3M6IFBvc2l0aW9uKSB7XG4gICAgICAgIGlmIChuZXdQb3MueCA8IDAgfHwgRklFTERfU0laRSA8PSBuZXdQb3MueFxuICAgICAgICAgICAgfHwgbmV3UG9zLnkgPCAwIHx8IEZJRUxEX1NJWkUgPD0gbmV3UG9zLnkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUG9zaXRpb24gbXVzdCBiZSAwIDw9IHggPCBGSUVMRF9TSVpFJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fcG9zID0gbmV3UG9zO1xuICAgIH1cblxuICAgIGdldCBocCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5faHA7IH1cbiAgICBcbiAgICAvKipcbiAgICAgKiBocOOCkuabtOaWsOOBmeOCi+OAgjDku6XkuIvjgavjgarjgaPjgZ/loLTlkIhnYW1lU3RhdGUuaHVtYW5z44GL44KJ6Ieq6Lqr44KS5YmK6ZmkXG4gICAgICogQHBhcmFtIGRlbHRhSHAgaHDjga7lpInljJbph49cbiAgICAgKi9cbiAgICBjaGFuZ2VIcChkZWx0YUhwOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5faHAgKz0gZGVsdGFIcDtcbiAgICAgICAgaWYgKHRoaXMuaHAgPD0gMCkge1xuICAgICAgICAgICAgLy8g5q275Lqh44GX44Gf44Gu44Gn44CB5LiW55WM44GL44KJ6Ieq5YiG44KS5raI5Y67XG4gICAgICAgICAgICAvLyBUT0RPIDog44KC44GX5q275Lqh44GX44Gf5Lq644KC566h55CG44GZ44KL44Gq44KJ44GT44GT44KS57eo6ZuGXG4gICAgICAgICAgICBnYW1lU3RhdGUuaHVtYW5zID0gZ2FtZVN0YXRlLmh1bWFucy5maWx0ZXIoKGh1bWFuKSA9PiBodW1hbiAhPT0gdGhpcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAx5Y2Y5L2N5pmC6ZaT6YGO44GU44GZXG4gICAgICovXG4gICAgc3BlbmRUaW1lKCk6IHZvaWQge1xuICAgICAgICAvLyDjgr/jgrnjgq/jgpLlrozkuobjgZfjgabjgYTjgovloLTlkIjjgIHmrKHjga7jgr/jgrnjgq/jgpLmsbrjgoHjgotcbiAgICAgICAgaWYgKCF0aGlzLnRhc2spIHtcbiAgICAgICAgICAgIHRoaXMuZGV0ZXJtaW5lVGFzaygpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8g44K/44K544Kv44Gr5b6T44Gj44Gm6KGM5YuV44GZ44KLXG4gICAgICAgIGlmICh0aGlzLnRhc2sgaW5zdGFuY2VvZiBTbGVlcGluZykge1xuICAgICAgICAgICAgdGhpcy50YXNrLmhhbmRsZVNsZWVwKHRoaXMpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMudGFzayBpbnN0YW5jZW9mIFdhbGtpbmcpIHtcbiAgICAgICAgICAgIFdhbGtpbmcuaGFuZGxlV2Fsa2luZyh0aGlzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGhw44KS5pu05paw44GZ44KL77yI5Z+656SO5Luj6Kyd77yJXG4gICAgICAgIHRoaXMudGltZUNvdW50ZXIgKz0gMTtcbiAgICAgICAgdGhpcy50aW1lQ291bnRlciAlPSAzO1xuICAgICAgICBpZiAodGhpcy50aW1lQ291bnRlciA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VIcCgtMSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDjg6njg7Pjg4Djg6Djgavjgr/jgrnjgq/jgpLmsbrjgoHjgotcbiAgICAgKi9cbiAgICBhYnN0cmFjdCBkZXRlcm1pbmVUYXNrKCk6IHZvaWQ7XG5cbiAgICAvKipcbiAgICAgKiDnm67nmoTlnLDjgavlkJHjgYvjgaPjgaYx44Oe44K56YCy44KAXG4gICAgICogQHBhcmFtIGRlc3Qg55uu55qE5ZywXG4gICAgICovXG4gICAgaGVhZFRvRGVzdChkZXN0OiBQb3NpdGlvbik6IHZvaWQge1xuICAgICAgICAvLyDnj77lnKjjga7luqfmqJnjgYvjgonnm67nmoTlnLDjga7luqfmqJnjgb7jgafjga7mnIDnn63ntYzot6/jgpJkaWprc3RyYeOBp+axguOCgeOCi1xuICAgICAgICBjb25zdCBkOiBudW1iZXJbXSA9IEFycmF5LmZyb20oeyBsZW5ndGg6IFYgfSkubWFwKG4gPT4gSU5GKTtcbiAgICAgICAgY29uc3QgdXNlZDogYm9vbGVhbltdID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogViB9KS5tYXAobiA9PiBmYWxzZSk7XG4gICAgICAgIGRbRklFTERfU0laRSAqIHRoaXMucG9zLnkgKyB0aGlzLnBvcy54XSA9IDA7XG4gICAgICAgIC8vIOacgOefree1jOi3r+OBruebtOWJjeOBrumggueCuVxuICAgICAgICBjb25zdCBwcmV2UG9zOiBQb3NpdGlvbltdID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogViB9KS5tYXAobiA9PiAoeyB4OiAtMSwgeTogLTEgfSkpO1xuXG4gICAgICAgIGNvbnN0IGRlc3RJc0Fzc2V0ID0gZ2V0QXNzZXRGcm9tUG9zKGRlc3QpICE9PSB1bmRlZmluZWQ7XG4gICAgICAgIGlmIChkZXN0SXNBc3NldCkge1xuICAgICAgICAgICAgLy8g55uu55qE5Zyw54K544GM44Ki44K744OD44OI44Gq44KJ44Gw44CB6Zqc5a6z54mp44Gn44Gq44GP44GZ44KLXG4gICAgICAgICAgICByZW1vdmVPYnN0YWNsZUZyb21Db3N0TWFwKGRlc3QpO1xuICAgICAgICB9XG5cbiAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICAgIGxldCB2ID0gLTE7XG5cbiAgICAgICAgICAgIGZvciAobGV0IHUgPSAwOyB1IDwgVjsgdSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF1c2VkW3VdICYmICh2ID09PSAtMSB8fCBkW3VdIDwgZFt2XSkpIHYgPSB1O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodiA9PT0gLTEpIGJyZWFrO1xuICAgICAgICAgICAgdXNlZFt2XSA9IHRydWU7XG5cbiAgICAgICAgICAgIGZvciAobGV0IHUgPSAwOyB1IDwgVjsgdSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRbdV0gPiBkW3ZdICsgY29zdFt2XVt1XSkge1xuICAgICAgICAgICAgICAgICAgICBkW3VdID0gTWF0aC5taW4oZFt1XSwgZFt2XSArIGNvc3Rbdl1bdV0pO1xuICAgICAgICAgICAgICAgICAgICBwcmV2UG9zW3VdID0geyB4OiB2ICUgRklFTERfU0laRSwgeTogTWF0aC5mbG9vcih2IC8gRklFTERfU0laRSkgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBkZXN044GL44KJ54++5Zyo5ZywY3VyUG9z44G444Gu5pyA55+t57WM6Lev44KS5rGC44KB44KLXG4gICAgICAgIGNvbnN0IGRlc3RUb0N1clBvc1BhdGg6IFBvc2l0aW9uW10gPSBbXTtcbiAgICAgICAgbGV0IHQ6IFBvc2l0aW9uID0gZGVzdDtcbiAgICAgICAgZm9yICg7ICEodC54ID09PSAtMSAmJiB0LnkgPT09IC0xKTsgdCA9IHByZXZQb3NbRklFTERfU0laRSAqIHQueSArIHQueF0pIHtcbiAgICAgICAgICAgIGRlc3RUb0N1clBvc1BhdGgucHVzaCh0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucG9zID0gZGVzdFRvQ3VyUG9zUGF0aFtkZXN0VG9DdXJQb3NQYXRoLmxlbmd0aCAtIDJdO1xuXG4gICAgICAgIGlmIChkZXN0SXNBc3NldCkge1xuICAgICAgICAgICAgLy8g55uu55qE5Zyw54K544GM44Ki44K744OD44OI44Gq44KJ44Gw44CB5YaN44Gz6Zqc5a6z54mp44Go44GX44Gm55m76Yyy44GZ44KLXG4gICAgICAgICAgICBhZGRPYnN0YWNsZVRvQ29zdE1hcChkZXN0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBuYW1lOiBzdHJpbmcgPSBgSHVtYW4ke0h1bWFuLmh1bWFuTnVtfWAsXG4gICAgICAgIGhvbWVQb3M6IFBvc2l0aW9uID0geyB4OiAwLCB5OiAwIH0sXG4gICAgICAgIGhwOiBudW1iZXIgPSAxMDAsXG4gICAgICAgIGpvYjogSm9iID0gXCJmYXJtZXJcIixcbiAgICAgICAgY29sb3I6IHN0cmluZyA9IFwiI0ZGMDAwMFwiLFxuICAgICAgICBjaGFyYWN0ZXI6IENoYXJhY3RlciA9IHsgd2lzZG9tOiAwLjUgfSxcbiAgICAgICAgaXNTZWxlY3RlZDogYm9vbGVhbiA9IGZhbHNlLFxuICAgICkge1xuICAgICAgICBpZiAoaG9tZVBvcy54IDwgMCB8fCBGSUVMRF9TSVpFIDw9IGhvbWVQb3MueFxuICAgICAgICAgICAgfHwgaG9tZVBvcy55IDwgMCB8fCBGSUVMRF9TSVpFIDw9IGhvbWVQb3MueSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQb3NpdGlvbiBtdXN0IGJlIDAgPD0geCA8IEZJRUxEX1NJWkUnKTtcbiAgICAgICAgfVxuICAgICAgICBIdW1hbi5odW1hbk51bSsrO1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLmhvbWVQb3MgPSBob21lUG9zO1xuICAgICAgICB0aGlzLl9wb3MgPSBob21lUG9zO1xuICAgICAgICB0aGlzLl9ocCA9IGhwO1xuICAgICAgICB0aGlzLmpvYiA9IGpvYjtcbiAgICAgICAgdGhpcy5jb2xvciA9IGNvbG9yO1xuICAgICAgICB0aGlzLmNoYXJhY3RlciA9IGNoYXJhY3RlcjtcbiAgICAgICAgdGhpcy5pc1NlbGVjdGVkID0gaXNTZWxlY3RlZDtcbiAgICAgICAgdGhpcy50YXNrID0gbnVsbDtcbiAgICB9XG59XG5cbmV4cG9ydCB0eXBlIEpvYiA9ICdmYXJtZXInIHwgJ21lcmNoYW50JztcblxuZXhwb3J0IHR5cGUgQ2hhcmFjdGVyID0ge1xuICAgIHdpc2RvbTogbnVtYmVyO1xufVxuXG5cbi8vIGRpamtzdHJh44Gr5b+F6KaB44Gq5aSJ5pWwXG5jb25zdCBJTkYgPSAxMDAwMDA7XG5jb25zdCBWID0gRklFTERfU0laRSAqIEZJRUxEX1NJWkU7XG4vLyDpmqPmjqXooYzliJdcbmNvbnN0IGNvc3Q6IG51bWJlcltdW10gPSBBcnJheS5mcm9tKHsgbGVuZ3RoOiBWIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hcChuID0+IEFycmF5LmZyb20oeyBsZW5ndGg6IFYgfSkubWFwKG4gPT4gSU5GKSk7XG5cbi8vIOmao+aOpeihjOWIl+OCkuWIneacn+WMllxuZm9yIChsZXQgeSA9IDA7IHkgPCBGSUVMRF9TSVpFOyB5KyspXG4gICAgZm9yIChsZXQgeCA9IDA7IHggPCBGSUVMRF9TSVpFOyB4KyspXG4gICAgICAgIHJlZ2lzdGVyU3F1YXJlVG9Db3N0TWFwKHsgeCwgeSB9KTtcblxuLyoqXG4gKiDjgYLjgovjg57jgrnjgYvjgonjgIHjgZ3jga7kuIrkuIvlt6blj7Pjga7jg57jgrnjgavnp7vli5XjgafjgY3jgovjgojjgYbjgatjb3N044Oe44OD44OX44Gr55m76Yyy44GZ44KLXG4gKiBAcGFyYW0gcG9zIOeZu+mMsuOBmeOCi+ODnuOCueOBruS9jee9rlxuICovXG5mdW5jdGlvbiByZWdpc3RlclNxdWFyZVRvQ29zdE1hcChwb3M6IFBvc2l0aW9uKSB7XG4gICAgY29uc3QgZGVsdGFQb3NpdGlvbnM6IFBvc2l0aW9uW10gPSBbXG4gICAgICAgIHsgeDogLTEsIHk6IDAgfSxcbiAgICAgICAgeyB4OiAwLCAgeTogLTEgfSxcbiAgICAgICAgeyB4OiArMSwgeTogMCB9LFxuICAgICAgICB7IHg6IDAsICB5OiArMSB9LFxuICAgIF07XG5cbiAgICAvLyBwb3Pjga7kuIrkuIvlt6blj7Pjga7jg57jgrnjgbjjgIFwb3PjgYvjgonjgqjjg4PjgrjjgpLnlJ/jgoTjgZlcbiAgICBkZWx0YVBvc2l0aW9ucy5mb3JFYWNoKChkZWx0YVBvcykgPT4ge1xuICAgICAgICBjb25zdCB4ID0gcG9zLnggKyBkZWx0YVBvcy54O1xuICAgICAgICBjb25zdCB5ID0gcG9zLnkgKyBkZWx0YVBvcy55O1xuICAgICAgICBpZiAoeCA8IDAgfHwgeCA+PSBGSUVMRF9TSVpFIHx8IHkgPCAwIHx8IHkgPj0gRklFTERfU0laRSkgcmV0dXJuO1xuICAgICAgICBlbHNlIGNvc3RbRklFTERfU0laRSAqIHBvcy55ICsgcG9zLnhdW0ZJRUxEX1NJWkUgKiB5ICsgeF0gPSAxO1xuICAgIH0pO1xufVxuXG4vKipcbiAqIGNvc3Tjg57jg4Pjg5fjgYvjgonpmpzlrrPnianvvIjpgJrjgozjgarjgYTjg57jgrnvvInjgpLlj5bjgorpmaTjgY9cbiAqIEBwYXJhbSBwb3Mg6Zqc5a6z54mp44Gu5L2N572uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVPYnN0YWNsZUZyb21Db3N0TWFwKHBvczogUG9zaXRpb24pIHtcbiAgICBjb25zdCBkZWx0YVBvc2l0aW9uczogUG9zaXRpb25bXSA9IFtcbiAgICAgICAgeyB4OiAtMSwgeTogMCB9LFxuICAgICAgICB7IHg6IDAsICB5OiAtMSB9LFxuICAgICAgICB7IHg6ICsxLCB5OiAwIH0sXG4gICAgICAgIHsgeDogMCwgIHk6ICsxIH0sXG4gICAgXTtcblxuICAgIC8vIHBvc+OBruS4iuS4i+W3puWPs+OBruODnuOCueOBi+OCieOAgXBvc+OBuOOBruOCqOODg+OCuOOCkueUn+OChOOBl+OBpuOAgXBvc+OBq+ihjOOBkeOCi+OCiOOBhuOBq+OBmeOCi1xuICAgIGRlbHRhUG9zaXRpb25zLmZvckVhY2goKGRlbHRhUG9zKSA9PiB7XG4gICAgICAgIGNvbnN0IHggPSBwb3MueCArIGRlbHRhUG9zLng7XG4gICAgICAgIGNvbnN0IHkgPSBwb3MueSArIGRlbHRhUG9zLnk7XG4gICAgICAgIGlmICh4IDwgMCB8fCB4ID49IEZJRUxEX1NJWkUgfHwgeSA8IDAgfHwgeSA+PSBGSUVMRF9TSVpFKSByZXR1cm47XG4gICAgICAgIGVsc2UgY29zdFtGSUVMRF9TSVpFICogeSArIHhdW0ZJRUxEX1NJWkUgKiBwb3MueSArIHBvcy54XSA9IDE7XG4gICAgfSk7XG59XG5cbi8qKlxuICogY29zdOODnuODg+ODl+OBq+manOWus+eJqe+8iOmAmuOCjOOBquOBhOODnuOCue+8ieOCkueZu+mMsuOBmeOCi1xuICogQHBhcmFtIHBvcyDpmpzlrrPnianjga7kvY3nva5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFkZE9ic3RhY2xlVG9Db3N0TWFwKHBvczogUG9zaXRpb24pIHtcbiAgICBjb25zdCBkZWx0YVBvc2l0aW9uczogUG9zaXRpb25bXSA9IFtcbiAgICAgICAgeyB4OiAtMSwgeTogMCB9LFxuICAgICAgICB7IHg6IDAsICB5OiAtMSB9LFxuICAgICAgICB7IHg6ICsxLCB5OiAwIH0sXG4gICAgICAgIHsgeDogMCwgIHk6ICsxIH0sXG4gICAgXTtcblxuICAgIC8vIHBvc+OBruS4iuS4i+W3puWPs+OBruODnuOCueOBi+OCieOAgXBvc+OBuOOBruOCqOODg+OCuOOCkua2iOOBl+OBpuOAgXBvc+OBq+ihjOOBkeOBquOBhOOCiOOBhuOBq+OBmeOCi1xuICAgIGRlbHRhUG9zaXRpb25zLmZvckVhY2goKGRlbHRhUG9zKSA9PiB7XG4gICAgICAgIGNvbnN0IHggPSBwb3MueCArIGRlbHRhUG9zLng7XG4gICAgICAgIGNvbnN0IHkgPSBwb3MueSArIGRlbHRhUG9zLnk7XG4gICAgICAgIGlmICh4IDwgMCB8fCB4ID49IEZJRUxEX1NJWkUgfHwgeSA8IDAgfHwgeSA+PSBGSUVMRF9TSVpFKSByZXR1cm47XG4gICAgICAgIGVsc2UgY29zdFtGSUVMRF9TSVpFICogeSArIHhdW0ZJRUxEX1NJWkUgKiBwb3MueSArIHBvcy54XSA9IElORjtcbiAgICB9KTtcbn0iLCJpbXBvcnQgeyBIdW1hbiwgQ2hhcmFjdGVyIH0gZnJvbSBcIi4vSHVtYW5cIjtcbmltcG9ydCB7IGdhbWVTdGF0ZSwgUG9zaXRpb24gfSBmcm9tIFwiLi4vLi4vZ2FtZVwiO1xuaW1wb3J0IHsgU2xlZXBpbmcgfSBmcm9tIFwiLi4vVGFzay9TbGVlcGluZ1wiO1xuaW1wb3J0IHsgV2Fsa2luZyB9IGZyb20gXCIuLi9UYXNrL1dhbGtpbmdcIjtcbmltcG9ydCB7IGdldEFzc2V0RnJvbVBvcywgZ2V0UmFuZG9tUG9zIH0gZnJvbSBcIi4uLy4uL2Z1bmN0aW9uL3V0aWxzXCI7XG5cbmV4cG9ydCBjbGFzcyBNZXJjaGFudCBleHRlbmRzIEh1bWFuIHtcbiAgICAvKipcbiAgICAgKiDjg6njg7Pjg4Djg6Djgavjgr/jgrnjgq/jgpLmsbrjgoHjgotcbiAgICAgKi9cbiAgICBkZXRlcm1pbmVUYXNrKCk6IHZvaWQge1xuICAgICAgICAvLyBUT0RPIOOCv+OCueOCr+OBruaVsOOCkuWil+OChOOBmVxuICAgICAgICAvLyBUT0RPIOOCv+OCueOCr+OCkuePvuWcqOOBruODkeODqeODoeODvOOCv+OBq+W+k+OBo+OBpuaxuuOCgeOCi+OCiOOBhuOBq+WkieabtFxuICAgICAgICBpZiAoMTYgPCBnYW1lU3RhdGUudGltZS5oKSB7XG4gICAgICAgICAgICAvLyDlr53jgotcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi55yg44KK44G+44GZXCIpO1xuICAgICAgICAgICAgdGhpcy50YXNrID0gbmV3IFNsZWVwaW5nKHRoaXMuaG9tZVBvcyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyDmlaPmranjgZnjgotcbiAgICAgICAgICAgIGxldCBkZXN0OiBQb3NpdGlvbiA9IGdldFJhbmRvbVBvcygpO1xuICAgICAgICAgICAgLy8g55uu55qE5Zyw44GM44Ki44K744OD44OI44Gn44GC44Gj44Gm44Gv44Gq44KJ44Gq44GEXG4gICAgICAgICAgICB3aGlsZSAoZ2V0QXNzZXRGcm9tUG9zKGRlc3QpICE9PSB1bmRlZmluZWQpIGRlc3QgPSBnZXRSYW5kb21Qb3MoKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGAoJHtkZXN0Lnh9LCAke2Rlc3QueX0p44G45ZCR44GL44GE44G+44GZYCk7XG4gICAgICAgICAgICB0aGlzLnRhc2sgPSBuZXcgV2Fsa2luZyhkZXN0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBuYW1lOiBzdHJpbmcgPSBgSHVtYW4ke0h1bWFuLmh1bWFuTnVtfWAsXG4gICAgICAgIGhvbWVQb3M6IFBvc2l0aW9uID0geyB4OiAwLCB5OiAwIH0sXG4gICAgICAgIGhwOiBudW1iZXIgPSAxMDAsXG4gICAgICAgIGNvbG9yOiBzdHJpbmcgPSBcIiNGRjAwMDBcIixcbiAgICAgICAgY2hhcmFjdGVyOiBDaGFyYWN0ZXIgPSB7IHdpc2RvbTogMC41IH0sXG4gICAgICAgIGlzU2VsZWN0ZWQ6IGJvb2xlYW4gPSBmYWxzZSxcbiAgICApIHtcbiAgICAgICAgc3VwZXIobmFtZSwgaG9tZVBvcywgaHAsIFwibWVyY2hhbnRcIiwgY29sb3IsIGNoYXJhY3RlciwgaXNTZWxlY3RlZCk7XG4gICAgfVxufSIsImltcG9ydCB7IEh1bWFuIH0gZnJvbSBcIi4uL0h1bWFuL0h1bWFuXCI7XG5pbXBvcnQgeyBnYW1lU3RhdGUsIFBvc2l0aW9uIH0gZnJvbSBcIi4uLy4uL2dhbWVcIjtcbmltcG9ydCB7IFRhc2sgfSBmcm9tIFwiLi9UYXNrXCI7XG5pbXBvcnQgeyBpc05pZ2h0IH0gZnJvbSBcIi4uLy4uL2Z1bmN0aW9uL3V0aWxzXCI7XG5cbmV4cG9ydCBjbGFzcyBTbGVlcGluZyBleHRlbmRzIFRhc2sge1xuICAgIGlzU2xlZXBpbmc6IGJvb2xlYW47XG5cbiAgICBoYW5kbGVTbGVlcChodW1hbjogSHVtYW4pOiB2b2lkIHtcbiAgICAgICAgaWYgKGlzTmlnaHQoKSkge1xuICAgICAgICAgICAgLy8g5aScXG4gICAgICAgICAgICBpZiAoaHVtYW4ucG9zLnggPT09IGh1bWFuLmhvbWVQb3MueCAmJiBodW1hbi5wb3MueSA9PT0gaHVtYW4uaG9tZVBvcy55KSB7XG4gICAgICAgICAgICAgICAgLy8g5a6244Gr44GE44KLXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzU2xlZXBpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8g44G+44Gg5a+d44Gm44GE44Gq44GE44Gu44Gn44CB5pmC6ZaT44Gr5b+c44GY44Gf56K6546H44Gn5a+d44KLXG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE8gOiDmgKfmoLzjgarjganjga7lgKTjgoLogIPmha7jgZfjgZ/jgYRcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaCA9IGdhbWVTdGF0ZS50aW1lLmg7XG4gICAgICAgICAgICAgICAgICAgIGxldCB0aHJlc2hvbGQ6IG51bWJlcjtcbiAgICAgICAgICAgICAgICAgICAgLy8g6Za+5YCk44Gv44CB5aSc44GM5pu044GR44KL44G744Gp5bCP44GV44GP44Gq44KLXG4gICAgICAgICAgICAgICAgICAgIGlmIChoIDwgMTIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEFNXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJlc2hvbGQgPSAtKDUvNCkgKiBoICsgNTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFBNXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJlc2hvbGQgPSAtKDUvNikgKiAoaCAtIDI0KSArIDU7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhyZXNob2xkIDwgcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8g44Op44Oz44OA44Og44Gq5YCk44GM6Za+5YCk44KS6LaF44GI44Gf44KJ5a+d44KLXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzU2xlZXBpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8g5a+d44Gm44GE44KL44Gu44GnaHDjgpLlm57lvqlcbiAgICAgICAgICAgICAgICAgICAgaHVtYW4uY2hhbmdlSHAoKzEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8g5Ye65YWI44Gq44Gu44Gn44CB5a6244Gr5biw44KLXG4gICAgICAgICAgICAgICAgaHVtYW4uaGVhZFRvRGVzdChodW1hbi5ob21lUG9zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIOacnVxuICAgICAgICAgICAgY29uc3QgciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgICAgICAgIGNvbnN0IGggPSBnYW1lU3RhdGUudGltZS5oO1xuICAgICAgICAgICAgLy8gVE9ETyA6IOaAp+agvOOBquOBqeOBruWApOOCguiAg+aFruOBl+OBn+OBhFxuICAgICAgICAgICAgY29uc3QgdGhyZXNob2xkID0gLTUvMiAqIChoIC0gNykgKyA1O1xuICAgICAgICAgICAgaWYgKHRocmVzaG9sZCA8IHIpIHtcbiAgICAgICAgICAgICAgICAvLyDotbfjgY3jgotcbiAgICAgICAgICAgICAgICBodW1hbi50YXNrID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3Rvcih3aGVyZTogUG9zaXRpb24pIHtcbiAgICAgICAgc3VwZXIod2hlcmUpO1xuICAgICAgICB0aGlzLmlzU2xlZXBpbmcgPSBmYWxzZTtcbiAgICB9XG59IiwiaW1wb3J0IHsgUG9zaXRpb24sIEZJRUxEX1NJWkUgfSBmcm9tIFwiLi4vLi4vZ2FtZVwiO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgVGFzayB7XG4gICAgd2hlcmU6IFBvc2l0aW9uO1xuXG4gICAgY29uc3RydWN0b3Iod2hlcmU6IFBvc2l0aW9uKSB7XG4gICAgICAgIGlmICh3aGVyZS54IDwgMCB8fCBGSUVMRF9TSVpFIDw9IHdoZXJlLnhcbiAgICAgICAgICAgIHx8IHdoZXJlLnkgPCAwIHx8IEZJRUxEX1NJWkUgPD0gd2hlcmUueSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQb3NpdGlvbiBtdXN0IGJlIDAgPD0geCA8IEZJRUxEX1NJWkUnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLndoZXJlID0gd2hlcmU7XG4gICAgfVxufSIsImltcG9ydCB7IEh1bWFuIH0gZnJvbSBcIi4uL0h1bWFuL0h1bWFuXCI7XG5pbXBvcnQgeyBQb3NpdGlvbiB9IGZyb20gXCIuLi8uLi9nYW1lXCI7XG5pbXBvcnQgeyBUYXNrIH0gZnJvbSBcIi4vVGFza1wiO1xuXG5leHBvcnQgY2xhc3MgV2Fsa2luZyBleHRlbmRzIFRhc2sge1xuICAgIHN0YXRpYyBoYW5kbGVXYWxraW5nKGh1bWFuOiBIdW1hbik6IHZvaWQge1xuICAgICAgICBpZiAoIWh1bWFuLnRhc2spIHJldHVybjtcbiAgICAgICAgaWYgKGh1bWFuLnBvcy54ID09PSBodW1hbi50YXNrLndoZXJlLnggJiYgaHVtYW4ucG9zLnkgPT09IGh1bWFuLnRhc2sud2hlcmUueSkge1xuICAgICAgICAgICAgLy8g55uu55qE5Zyw44Gr5Yiw552A44GX44Gf44Gu44Gn44K/44K544Kv44KS57WC5LqGXG4gICAgICAgICAgICBodW1hbi50YXNrID0gbnVsbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIOebrueahOWcsOOBq+WQkeOBi+OBhlxuICAgICAgICAgICAgaHVtYW4uaGVhZFRvRGVzdChodW1hbi50YXNrLndoZXJlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHdoZXJlOiBQb3NpdGlvbikge1xuICAgICAgICBzdXBlcih3aGVyZSk7XG4gICAgfVxufSIsImltcG9ydCB7IGdhbWVTdGF0ZSwgRklFTERfU0laRSB9IGZyb20gXCIuLi9nYW1lXCI7XG5pbXBvcnQgeyBIb3VzZSB9IGZyb20gXCIuLi9jbGFzcy9Bc3NldC9Ib3VzZVwiO1xuaW1wb3J0IHsgSHVtYW4gfSBmcm9tIFwiLi4vY2xhc3MvSHVtYW4vSHVtYW5cIjtcbmltcG9ydCB7IGlzTmlnaHQgfSBmcm9tIFwiLi91dGlsc1wiO1xuaW1wb3J0IHsgU2xlZXBpbmcgfSBmcm9tIFwiLi4vY2xhc3MvVGFzay9TbGVlcGluZ1wiO1xuXG4vKipcbiAqIGdhbWVTdGF0ZeOBq+W+k+OBo+OBpuebpOmdouOCkuabtOaWsOOBmeOCi1xuICog6YG45oqe5Lit44Gu5Lq644Gu5LiK44Gr44Gv5ZC544GN5Ye644GX44KS6KGo56S644GZ44KLXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkcmF3RmllbGQoKTogdm9pZCB7XG4gICAgLy8g55uk6Z2i44KS44Oq44K744OD44OI44GZ44KLXG4gICAgcmVzZXRGaWVsZCgpO1xuXG4gICAgLy8g5Lq644KS5o+P55S7XG4gICAgZ2FtZVN0YXRlLmh1bWFucy5mb3JFYWNoKChodW1hbikgPT4ge1xuICAgICAgICBjb25zdCB7IHgsIHkgfSA9IGh1bWFuLnBvcztcbiAgICAgICAgY29uc3Qgc3F1YXJlRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNxdWFyZS1cIiArIChGSUVMRF9TSVpFICogeSArIHgpKTtcbiAgICAgICAgaWYgKCFzcXVhcmVFbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBzcXVhcmUtJHtGSUVMRF9TSVpFICogeSArIHh9IHdhcyBub3QgZm91bmQuYCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8g44Oe44K544Gu5paH5a2X5YiX44KS5pu05pawXG4gICAgICAgIHNxdWFyZUVsLnRleHRDb250ZW50ID0gXCLil4tcIjtcbiAgICAgICAgLy8g5Lq644GM6YG45oqe5Lit44Gq44KJ44Oe44K544Gu5LiK44Gr5ZC544GN5Ye644GX44KS6KGo56S644GZ44KLXG4gICAgICAgIGlmIChodW1hbi5pc1NlbGVjdGVkKSB7XG4gICAgICAgICAgICBjb25zdCBiYWxsb29uRWwgPSBjcmVhdGVCYWxsb29uKGh1bWFuKTtcbiAgICAgICAgICAgIHNxdWFyZUVsLmFwcGVuZENoaWxkKGJhbGxvb25FbCk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIOOCouOCu+ODg+ODiOOCkuaPj+eUu1xuICAgIGdhbWVTdGF0ZS5hc3NldHMuZm9yRWFjaCgoYXNzZXQpID0+IHtcbiAgICAgICAgY29uc3QgeyB4LCB5IH0gPSBhc3NldC5wb3M7XG4gICAgICAgIGNvbnN0IHNxdWFyZUVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzcXVhcmUtXCIgKyAoRklFTERfU0laRSAqIHkgKyB4KSk7XG4gICAgICAgIGlmICghc3F1YXJlRWwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgc3F1YXJlLSR7RklFTERfU0laRSAqIHkgKyB4fSB3YXMgbm90IGZvdW5kLmApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGFzc2V0IGluc3RhbmNlb2YgSG91c2UpIHtcbiAgICAgICAgICAgIC8vIOOCr+ODqeOCueOCkuODquOCu+ODg+ODiOOBmeOCi1xuICAgICAgICAgICAgc3F1YXJlRWwuY2xhc3NMaXN0LnJlbW92ZShhc3NldC5jbGFzc05hbWUpO1xuICAgICAgICAgICAgLy8g6YGp5YiH44Gq55S75YOP6KGo56S644Gu44Gf44KB44CB54q25rOB44Gr5b+c44GY44Gf44Kv44Op44K544KS5LuY5LiO44GZ44KLXG4gICAgICAgICAgICBpZiAoYXNzZXQuaXNUaGVyZU93bmVyKCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoYXNzZXQub3duZXIudGFzayBpbnN0YW5jZW9mIFNsZWVwaW5nXG4gICAgICAgICAgICAgICAgICAgICAgICAmJiBhc3NldC5vd25lci50YXNrLmlzU2xlZXBpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgYXNzZXQuY2xhc3NOYW1lID0gJ3NsZWVwaW5nLWhvdXNlJztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGlzTmlnaHQoKSkge1xuICAgICAgICAgICAgICAgICAgICBhc3NldC5jbGFzc05hbWUgPSAnZXZlbmluZy1ob3VzZSc7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYXNzZXQuY2xhc3NOYW1lID0gJ25vcm1hbC1ob3VzZSc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIOeUu+WDj+OCkuihqOekuuOBmeOCi+OBn+OCgeOBq+ODnuOCueOBruaWh+Wtl+WIl+OCkua2iOOBmVxuICAgICAgICAgICAgICAgIGNvbnN0IHRleHRFbCA9IHNxdWFyZUVsLmNoaWxkTm9kZXNbMF07XG4gICAgICAgICAgICAgICAgdGV4dEVsLnRleHRDb250ZW50ID0gXCJcIjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8g5omA5pyJ6ICF44GM5a6244Gr44GE44Gq44GE5aC05ZCIXG4gICAgICAgICAgICAgICAgaWYgKGlzTmlnaHQoKSkge1xuICAgICAgICAgICAgICAgICAgICBhc3NldC5jbGFzc05hbWUgPSAnbmlnaHQtaG91c2UnO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGFzc2V0LmNsYXNzTmFtZSA9ICdub3JtYWwtaG91c2UnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNxdWFyZUVsLmNsYXNzTGlzdC5hZGQoYXNzZXQuY2xhc3NOYW1lKTtcbiAgICAgICAgICAgIGNvbnN0IGltZ0VsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgICAgICAgICAgIHNxdWFyZUVsLmFwcGVuZENoaWxkKGltZ0VsKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG4vKipcbiAqIOebpOmdouOCkuODquOCu+ODg+ODiOOBmeOCi++8iOOBmeOBueOBpuOBruODnuOCueOCkuepuuaWh+Wtl+WIl+OBq+OBmeOCi++8iVxuICovXG5mdW5jdGlvbiByZXNldEZpZWxkKCk6IHZvaWQge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgRklFTERfU0laRTsgaSsrKSB7XG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgRklFTERfU0laRTsgaisrKSB7XG4gICAgICAgICAgICBjb25zdCBzcXVhcmVFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3F1YXJlLVwiICsgKEZJRUxEX1NJWkUgKiBpICsgaikpO1xuICAgICAgICAgICAgaWYgKCFzcXVhcmVFbClcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYHNxdWFyZS0ke0ZJRUxEX1NJWkUgKiBpICsgan0gd2FzIG5vdCBmb3VuZC5gKTtcbiAgICAgICAgICAgIC8vIOWQhOODnuOCueOBruaWh+Wtl+WIl+OCkuepuuaWh+Wtl+WIl+OBq+ODquOCu+ODg+ODiFxuICAgICAgICAgICAgc3F1YXJlRWwudGV4dENvbnRlbnQgPSBcIlwiO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4vKipcbiAqIOihqOekuuOBleOCjOOBpuOBhOOCi+aZguWIu+OCkuabtOaWsOOBmeOCi1xuICovXG5leHBvcnQgZnVuY3Rpb24gZHJhd1RpbWUoKTogdm9pZCB7XG4gICAgY29uc3QgdGltZUVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aW1lTGFiZWxcIik7XG4gICAgaWYgKCF0aW1lRWwpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGB0aW1lTGFiZWwgd2FzIG5vdCBmb3VuZC5gKTtcbiAgICB9XG4gICAgdGltZUVsLnRleHRDb250ZW50ID0gYOePvuWcqOOBruaZguWIuyAke2dhbWVTdGF0ZS50aW1lLmh9IDogJHtnYW1lU3RhdGUudGltZS5tfWA7XG59XG5cbi8qKlxuICog5Lq644Gu5oOF5aCx44KS6KGo56S644GZ44KL5ZC544GN5Ye644GX6KaB57Sg44KS6L+U44GZXG4gKiBAcGFyYW0gaHVtYW4g5oOF5aCx44KS6KGo56S644GZ44KL5a++6LGhXG4gKiBAcmV0dXJucyDlkLnjgY3lh7rjgZfjga48ZGl2Puimgee0oFxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQmFsbG9vbihodW1hbjogSHVtYW4pOiBIVE1MRGl2RWxlbWVudCB7XG4gICAgY29uc3QgZGl2RWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGRpdkVsLmNsYXNzTmFtZSA9IFwiYWJvdmUtc3F1YXJlXCI7XG4gICAgY29uc3QgYmFsbG9vbkVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBiYWxsb29uRWwuY2xhc3NOYW1lID0gXCJiYWxsb29uMlwiO1xuICAgIGNvbnN0IG1lc3NhZ2VFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgIG1lc3NhZ2VFbC5pbm5lclRleHQgPVxuICAgICAgICBg5ZCN5YmN77yaJHtodW1hbi5uYW1lfVxuICAgIEhQ77yaJHtodW1hbi5ocH1cbiAgICDlvbnogbfvvJoke2h1bWFuLmpvYn1cbiAgICDmgKfmoLzvvJoke2h1bWFuLmNoYXJhY3Rlcn1gO1xuICAgIGJhbGxvb25FbC5hcHBlbmRDaGlsZChtZXNzYWdlRWwpO1xuICAgIGRpdkVsLmFwcGVuZENoaWxkKGJhbGxvb25FbCk7XG5cbiAgICByZXR1cm4gZGl2RWw7XG59IiwiaW1wb3J0IHsgZ2FtZVN0YXRlLCBGSUVMRF9TSVpFIH0gZnJvbSBcIi4uL2dhbWVcIjtcbmltcG9ydCB7IEh1bWFuLCBKb2IsIGFkZE9ic3RhY2xlVG9Db3N0TWFwIH0gZnJvbSBcIi4uL2NsYXNzL0h1bWFuL0h1bWFuXCI7XG5pbXBvcnQgeyBGYXJtZXIgfSBmcm9tIFwiLi4vY2xhc3MvSHVtYW4vRmFybWVyXCI7XG5pbXBvcnQgeyBNZXJjaGFudCB9IGZyb20gXCIuLi9jbGFzcy9IdW1hbi9NZXJjaGFudFwiO1xuaW1wb3J0IHsgSG91c2UgfSBmcm9tIFwiLi4vY2xhc3MvQXNzZXQvSG91c2VcIjtcbmltcG9ydCB7IGRyYXdGaWVsZCB9IGZyb20gXCIuL2RyYXdcIjtcbmltcG9ydCB7IGV4aXRBZGRIdW1hbk1vZGUsIGVudGVyQWRkSHVtYW5Nb2RlLCBleGl0U2VsZWN0SHVtYW5Nb2RlIH0gZnJvbSBcIi4vaGFuZGxlTW9kZVwiO1xuaW1wb3J0IHsgZ2V0SHVtYW5zRnJvbVBvcyB9IGZyb20gXCIuL3V0aWxzXCI7XG5pbXBvcnQgeyBBc3NldCB9IGZyb20gXCIuLi9jbGFzcy9Bc3NldC9Bc3NldFwiO1xuXG4vKipcbiAqIFNxdWFyZeOBjOOCr+ODquODg+OCr+OBleOCjOOBn+OBqOOBjeOBq+WRvOOBsOOCjOOAgeePvuWcqOOBruODouODvOODieOBq+W+k+OBo+OBpuWHpueQhuOCkuihjOOBhlxuICovXG5leHBvcnQgZnVuY3Rpb24gaGFuZGxlQ2xpY2tTcXVhcmUoeDogbnVtYmVyLCB5OiBudW1iZXIpOiB2b2lkIHtcbiAgICBzd2l0Y2ggKGdhbWVTdGF0ZS5tb2RlLmlkKSB7XG4gICAgICAgIGNhc2UgJ25ldXRyYWwnOlxuICAgICAgICAgICAgY29uc29sZS5sb2coRklFTERfU0laRSAqIHkgKyB4KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdhZGRIdW1hbic6XG4gICAgICAgICAgICAvLyDmjIflrprjga7loLTmiYDjgavkurrjgpLov73liqDjgZnjgotcbiAgICAgICAgICAgIGxldCBuZXdIdW1hbjogSHVtYW47XG4gICAgICAgICAgICBpZiAoZ2FtZVN0YXRlLm1vZGUuam9iID09PSBcImZhcm1lclwiKSB7XG4gICAgICAgICAgICAgICAgbmV3SHVtYW4gPSBuZXcgRmFybWVyKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGdhbWVTdGF0ZS5tb2RlLmpvYiA9PT0gXCJtZXJjaGFudFwiKSB7XG4gICAgICAgICAgICAgICAgbmV3SHVtYW4gPSBuZXcgTWVyY2hhbnQoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbmV3SHVtYW4gPSBuZXcgRmFybWVyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBuZXdIdW1hbi5ob21lUG9zID0geyB4LCB5IH07XG4gICAgICAgICAgICBuZXdIdW1hbi5wb3MgPSB7IHgsIHkgfTtcbiAgICAgICAgICAgIGFkZEh1bWFuKG5ld0h1bWFuKTtcbiAgICAgICAgICAgIC8vIOebpOmdouOCkuabtOaWsOOBmeOCi1xuICAgICAgICAgICAgZHJhd0ZpZWxkKCk7XG4gICAgICAgICAgICAvLyDjg5Ljg4jov73liqDjg6Ljg7zjg4njgpLmipzjgZHjgotcbiAgICAgICAgICAgIGV4aXRBZGRIdW1hbk1vZGUoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdzZWxlY3RIdW1hbic6XG4gICAgICAgICAgICBjb25zdCBodW1hbnMgPSBnZXRIdW1hbnNGcm9tUG9zKHsgeCwgeSB9KTtcbiAgICAgICAgICAgIC8vIOaMh+WumuOBruWgtOaJgOOBq+S6uuOBjOOBhOOBquOBkeOCjOOBsOS9leOCguOBl+OBquOBhFxuICAgICAgICAgICAgaWYgKGh1bWFucy5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIOaMh+WumuOBruWgtOaJgOOBruS6uuOBrumBuOaKnueKtuaFi+OCkuWPjei7ouOBleOBm+OCi1xuICAgICAgICAgICAgLy8g77yI6KSH5pWw5Lq644Gu5aC05ZCI44Gv44Oq44K544OI44Gu5YWI6aCt77yJXG4gICAgICAgICAgICBodW1hbnNbMF0uaXNTZWxlY3RlZCA9ICFodW1hbnNbMF0uaXNTZWxlY3RlZDtcbiAgICAgICAgICAgIC8vIOebpOmdouOCkuabtOaWsOOBmeOCi1xuICAgICAgICAgICAgZHJhd0ZpZWxkKCk7XG4gICAgICAgICAgICAvLyDpgbjmip7jg6Ljg7zjg4njgpLmipzjgZHjgotcbiAgICAgICAgICAgIGV4aXRTZWxlY3RIdW1hbk1vZGUoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cbn1cblxuLyoqXG4gKiBnYW1lU3RhdGXjgavkurrjgajlrrbjgpLov73liqBcbiAqL1xuZnVuY3Rpb24gYWRkSHVtYW4obmV3SHVtYW46IEh1bWFuKSB7XG4gICAgY29uc3QgeyB4LCB5IH0gPSBuZXdIdW1hbi5wb3M7XG4gICAgLy8g5Lq644KS6L+95YqgXG4gICAgZ2FtZVN0YXRlLmh1bWFucy5wdXNoKG5ld0h1bWFuKTtcbiAgICAvLyDlrrbjgpLov73liqBcbiAgICBhZGRBc3NldChuZXcgSG91c2UoeyB4LCB5IH0sIG5ld0h1bWFuKSwgdHJ1ZSk7XG59XG5cbi8qKlxuICogZ2FtZVN0YXRl44Gr44Ki44K744OD44OI44KS6L+95Yqg44CCaXNPYnN0YWNsZeOBjOecn+OBquOCiemanOWus+eJqeOBqOOBl+OBpmNvc3Tjg57jg4Pjg5fjgavnmbvpjLLjgZnjgotcbiAqIEBwYXJhbSBuZXdBc3NldCDov73liqDjgZnjgovjgqLjgrvjg4Pjg4hcbiAqIEBwYXJhbSBpc09ic3RhY2xlIOmanOWus+eJqeOBp+OBguOCi+OBi+WQpuOBi1xuICovXG5mdW5jdGlvbiBhZGRBc3NldChuZXdBc3NldDogQXNzZXQsIGlzT2JzdGFjbGU6IGJvb2xlYW4pIHtcbiAgICBnYW1lU3RhdGUuYXNzZXRzLnB1c2gobmV3QXNzZXQpO1xuICAgIGlmIChpc09ic3RhY2xlKSBhZGRPYnN0YWNsZVRvQ29zdE1hcChuZXdBc3NldC5wb3MpO1xufVxuXG4vKipcbiAqIGFkZEh1bWFu44Oc44K/44Oz44KS44Kv44Oq44OD44Kv44GX44Gf6Zqb44Gu5Yem55CG44KS6KGM44GGXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBoYW5kbGVBZGRIdW1hbkNsaWNrKCk6IHZvaWQge1xuICAgIGNvbnN0IHJhZGlvSW5wdXRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeU5hbWUoXCJ0eXBlRm9ybVwiKSBhcyBOb2RlTGlzdE9mPEhUTUxJbnB1dEVsZW1lbnQ+O1xuICAgIGxldCBqb2I6IEpvYiB8IG51bGwgPSBudWxsO1xuICAgIHJhZGlvSW5wdXRzLmZvckVhY2goKHJhZGlvOiBIVE1MSW5wdXRFbGVtZW50KSA9PiB7XG4gICAgICAgIGlmIChyYWRpby5jaGVja2VkKSB7XG4gICAgICAgICAgICBqb2IgPSByYWRpby52YWx1ZSBhcyBKb2I7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmICgham9iKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImpvYiBpcyBub3Qgc2VsZWN0ZWQuIENhbid0IGVudGVyIGFkZC1odW1hbiBtb2RlLlwiKTtcbiAgICB9XG5cbiAgICBlbnRlckFkZEh1bWFuTW9kZShqb2IpO1xufSIsImltcG9ydCB7IEpvYiB9IGZyb20gXCIuLi9jbGFzcy9IdW1hbi9IdW1hblwiO1xuaW1wb3J0IHsgRklFTERfU0laRSwgZ2FtZVN0YXRlIH0gZnJvbSBcIi4uL2dhbWVcIjtcblxuZXhwb3J0IHR5cGUgSW50ZXJmYWNlTW9kZSA9IHtcbiAgICBpZDogJ25ldXRyYWwnO1xuICB9IHwge1xuICAgIGlkOiAnYWRkSHVtYW4nO1xuICAgIGpvYjogSm9iO1xuICB9IHwge1xuICAgIGlkOiAnc2VsZWN0SHVtYW4nO1xuICB9O1xuICBcbi8qKlxuICog5L2N572u44Gu6YG45oqe44Oi44O844OJ44Gr6YG356e744GX44CBU3F1YXJl5LiK44Gn44Ob44OQ44O844GZ44KL44Go6Imy44GM5aSJ44KP44KL44KI44GG44Gr44Gq44KLXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBlbnRlckFkZEh1bWFuTW9kZShqb2I6IEpvYik6IHZvaWQge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgRklFTERfU0laRTsgaSsrKSB7XG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgRklFTERfU0laRTsgaisrKSB7XG4gICAgICAgICAgICBjb25zdCBzcXVhcmVFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3F1YXJlLVwiICsgKEZJRUxEX1NJWkUgKiBpICsgaikpO1xuICAgICAgICAgICAgaWYgKCFzcXVhcmVFbClcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYHNxdWFyZS0ke0ZJRUxEX1NJWkUgKiBpICsgan0gd2FzIG5vdCBmb3VuZC5gKTtcbiAgICAgICAgICAgIC8vIOODm+ODkOODvOaZguOBq+iJsuOBjOWkieOCj+OCi+OCiOOBhuOBq+OCr+ODqeOCueOCkui/veWKoFxuICAgICAgICAgICAgc3F1YXJlRWwuY2xhc3NMaXN0LmFkZCgnaHVtYW4tYWRkLW1vZGUnKVxuICAgICAgICAgICAgLy8g6YG45oqe44Oi44O844OJ44Gr6YG356e744GZ44KLXG4gICAgICAgICAgICBnYW1lU3RhdGUubW9kZSA9IHsgaWQ6ICdhZGRIdW1hbicsIGpvYiB9O1xuICAgICAgICB9XG4gICAgfVxufVxuXG4vKipcbiAqIOODi+ODpeODvOODiOODqeODq+ODouODvOODieOBq+mBt+enu+OBl+OAgVNxdWFyZeS4iuOBp+ODm+ODkOODvOOBl+OBpuOCguiJsuOBjOWkieOCj+OCieOBquOBhOOCiOOBhuOBq+OBmeOCi1xuICovXG5leHBvcnQgZnVuY3Rpb24gZXhpdEFkZEh1bWFuTW9kZSgpOiB2b2lkIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IEZJRUxEX1NJWkU7IGkrKykge1xuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IEZJRUxEX1NJWkU7IGorKykge1xuICAgICAgICAgICAgY29uc3Qgc3F1YXJlRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNxdWFyZS1cIiArIChGSUVMRF9TSVpFICogaSArIGopKTtcbiAgICAgICAgICAgIGlmICghc3F1YXJlRWwpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBzcXVhcmUtJHtGSUVMRF9TSVpFICogaSArIGp9IHdhcyBub3QgZm91bmQuYCk7XG4gICAgICAgICAgICAvKiDjg5vjg5Djg7zmmYLjgavoibLjgYzlpInjgo/jgovjgq/jg6njgrnjgpLpmaTljrsgKi9cbiAgICAgICAgICAgIHNxdWFyZUVsLmNsYXNzTGlzdC5yZW1vdmUoJ2h1bWFuLWFkZC1tb2RlJylcbiAgICAgICAgICAgIC8qIOODi+ODpeODvOODiOODqeODq+ODouODvOODieOBq+mBt+enu+OBmeOCiyAqL1xuICAgICAgICAgICAgZ2FtZVN0YXRlLm1vZGUgPSB7IGlkOiAnbmV1dHJhbCcgfTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLyoqXG4gKiDlkLnjgY3lh7rjgZfjgpLooajnpLrjgZnjgovkurrjgpLpgbjmip7jgZnjgovjg6Ljg7zjg4njgavpgbfnp7vjgZnjgotcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGVudGVyU2VsZWN0SHVtYW5Nb2RlKCk6IHZvaWQge1xuICAgIGdhbWVTdGF0ZS5tb2RlID0geyBpZDogJ3NlbGVjdEh1bWFuJyB9O1xufVxuXG4vKipcbiAqIOODi+ODpeODvOODiOODqeODq+ODouODvOODieOBq+mBt+enu+OBmeOCi1xuICovXG5leHBvcnQgZnVuY3Rpb24gZXhpdFNlbGVjdEh1bWFuTW9kZSgpOiB2b2lkIHtcbiAgICBnYW1lU3RhdGUubW9kZSA9IHsgaWQ6ICduZXV0cmFsJyB9O1xufSIsImltcG9ydCB7IFBvc2l0aW9uLCBnYW1lU3RhdGUgfSBmcm9tIFwiLi4vZ2FtZVwiO1xuaW1wb3J0IHsgSHVtYW4gfSBmcm9tIFwiLi4vY2xhc3MvSHVtYW4vSHVtYW5cIjtcbmltcG9ydCB7IEZJRUxEX1NJWkUgfSBmcm9tIFwiLi4vZ2FtZVwiO1xuaW1wb3J0IHsgQXNzZXQgfSBmcm9tIFwiLi4vY2xhc3MvQXNzZXQvQXNzZXRcIjtcblxuLyoqXG4gKiDjgYLjgovluqfmqJnjgavjgYTjgovkurrjga7mpJzntKLjgZfjgIHphY3liJfjgavjgZfjgabov5TjgZlcbiAqIEBwYXJhbSBwb3Mg5bqn5qiZXG4gKiBAcmV0dXJucyDjgZ3jga7luqfmqJnjgavjgYTjgovkurrjga7phY3liJdcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEh1bWFuc0Zyb21Qb3MocG9zOiBQb3NpdGlvbik6IEh1bWFuW10ge1xuICAgIGNvbnN0IHJldEh1bWFuczogSHVtYW5bXSA9IFtdO1xuICAgIGdhbWVTdGF0ZS5odW1hbnMuZm9yRWFjaCgoaHVtYW4pID0+IHtcbiAgICAgICAgaWYgKGh1bWFuLnBvcy54ID09IHBvcy54ICYmIGh1bWFuLnBvcy55ID09IHBvcy55KSB7XG4gICAgICAgICAgICByZXRIdW1hbnMucHVzaChodW1hbik7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gcmV0SHVtYW5zO1xufVxuXG4vKipcbiAqIOOBguOCi+W6p+aomeOBq+OBguOCi+OCouOCu+ODg+ODiOOCkuaknOe0ouOBl+OAgeOBguOCjOOBsOOBneOBruOCouOCu+ODg+ODiOOCkui/lOOBmeOAguOBquOBkeOCjOOBsHVuZGVmaW5lZOOCkui/lOOBmVxuICogQHBhcmFtIHBvcyDluqfmqJlcbiAqIEByZXR1cm5zIOOBneOBruW6p+aomeOBq+OCouOCu+ODg+ODiOOBjOOBguOCi+WgtOWQiOOBr+OBneOBruOCouOCu+ODg+ODiOOAguOBquOBkeOCjOOBsHVuZGVmaW5lZFxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0QXNzZXRGcm9tUG9zKHBvczogUG9zaXRpb24pOiBBc3NldCB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIGdhbWVTdGF0ZS5hc3NldHMuZmluZCgoYXNzZXQpID0+IHtcbiAgICAgICAgcmV0dXJuIGFzc2V0LnBvcy54ID09PSBwb3MueCAmJiBhc3NldC5wb3MueSA9PT0gcG9zLnk7XG4gICAgfSk7XG59XG5cbi8qKlxuICogZ2FtZVN0YXRlLnRpbWXjgavlvpPjgaPjgablpJzjgYvlkKbjgYvjgpLov5TjgZlcbiAqIEByZXR1cm5zIOWknOOBp+OBguOCi+OBi+WQpuOBi1xuICovXG5leHBvcnQgZnVuY3Rpb24gaXNOaWdodCgpOiBib29sZWFuIHtcbiAgICBpZiAoZ2FtZVN0YXRlLnRpbWUuaCA+PSAxOCB8fCBnYW1lU3RhdGUudGltZS5oIDw9IDYpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cblxuLyoqXG4gKiDjg6njg7Pjg4Djg6DjgarkvY3nva7jgpLnlJ/miJDjgZfjgIHov5TjgZlcbiAqIEByZXR1cm5zIFt4LCB5XVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0UmFuZG9tUG9zKCk6IFBvc2l0aW9uIHtcbiAgICBjb25zdCB4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogRklFTERfU0laRSk7XG4gICAgY29uc3QgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIEZJRUxEX1NJWkUpO1xuICAgIHJldHVybiB7IHgsIHkgfTtcbn0iLCJpbXBvcnQgeyBJbnRlcmZhY2VNb2RlIH0gZnJvbSBcIi4vZnVuY3Rpb24vaGFuZGxlTW9kZVwiO1xuaW1wb3J0IHsgSHVtYW4gfSBmcm9tIFwiLi9jbGFzcy9IdW1hbi9IdW1hblwiO1xuaW1wb3J0IHsgQXNzZXQgfSBmcm9tIFwiLi9jbGFzcy9Bc3NldC9Bc3NldFwiO1xuXG4vKiDnm6TpnaLjga7jgrXjgqTjgrogKi9cbmV4cG9ydCBjb25zdCBGSUVMRF9TSVpFID0gODtcblxuZXhwb3J0IGxldCBnYW1lU3RhdGU6IEdhbWVTdGF0ZSA9IHtcbiAgICB0aW1lOiB7IGQ6IDAsIGg6IDEyLCBtOiAwIH0sXG4gICAgbW9kZTogeyBpZDogXCJuZXV0cmFsXCIgfSxcbiAgICBodW1hbnM6IFtdLFxuICAgIGFzc2V0czogW10sXG59XG5cbi8vID09PT09PT09PT09PT09PT09IHR5cGUgPT09PT09PT09PT09PT09PVxuXG5leHBvcnQgdHlwZSBHYW1lU3RhdGUgPSB7XG4gICAgdGltZTogVGltZTtcbiAgICBtb2RlOiBJbnRlcmZhY2VNb2RlO1xuICAgIGh1bWFuczogSHVtYW5bXTtcbiAgICBhc3NldHM6IEFzc2V0W107XG59XG5cbnR5cGUgVGltZSA9IHtcbiAgICBkOiBudW1iZXI7XG4gICAgaDogbnVtYmVyO1xuICAgIG06IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBIVE1MRXZlbnQ8VCBleHRlbmRzIEV2ZW50VGFyZ2V0PiBleHRlbmRzIEV2ZW50IHtcbiAgICB0YXJnZXQ6IFQ7XG59XG5cbmV4cG9ydCB0eXBlIFBvc2l0aW9uID0ge1xuICAgIHg6IG51bWJlcixcbiAgICB5OiBudW1iZXIsXG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBkcmF3RmllbGQsIGRyYXdUaW1lIH0gZnJvbSBcIi4vZnVuY3Rpb24vZHJhd1wiO1xyXG5pbXBvcnQgeyBoYW5kbGVBZGRIdW1hbkNsaWNrLCBoYW5kbGVDbGlja1NxdWFyZSB9IGZyb20gXCIuL2Z1bmN0aW9uL2hhbmRsZUFjdGlvblwiO1xyXG5pbXBvcnQgeyBlbnRlclNlbGVjdEh1bWFuTW9kZSB9IGZyb20gXCIuL2Z1bmN0aW9uL2hhbmRsZU1vZGVcIjtcclxuaW1wb3J0IHsgRklFTERfU0laRSwgZ2FtZVN0YXRlIH0gZnJvbSBcIi4vZ2FtZVwiO1xyXG5cclxubGV0IGludGVydmFsSWQ6IG51bWJlcjtcclxubGV0IGlzTG9vcGluZzogYm9vbGVhbjtcclxuXHJcbi8vIOODmuODvOOCuOOBjOiqreOBv+i+vOOBvuOCjOOBn+OBqOOBjeOBruWHpueQhlxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoZSkgPT4ge1xyXG4gICAgLy8gMeenkuOBlOOBqOOBq2ludGVydmFsRnVuY+OCkuWun+ihjOOBmeOCi+OCiOOBhuOBq+ioreWumlxyXG4gICAgaW50ZXJ2YWxJZCA9IHNldEludGVydmFsKGludGVydmFsRnVuYywgMTAwMCk7XHJcbiAgICBpc0xvb3BpbmcgPSB0cnVlO1xyXG5cclxuICAgIC8vIOOCpOODmeODs+ODiOODj+ODs+ODieODqeODvOOCkueZu+mMslxyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWxlY3RIdW1hbkJ1dHRvblwiKT8uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGVudGVyU2VsZWN0SHVtYW5Nb2RlKTtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3dpdGNoSW50ZXJ2YWxCdXR0b25cIik/LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBzd2l0Y2hJbnRlcnZhbCk7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZEh1bWFuQnV0dG9uXCIpPy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlQWRkSHVtYW5DbGljayk7XHJcblxyXG4gICAgLy8g5o+P55S7XHJcbiAgICBjcmVhdGVGaWVsZCgpO1xyXG4gICAgZHJhd0ZpZWxkKCk7XHJcbiAgICBkcmF3VGltZSgpO1xyXG59KTtcclxuXHJcbi8qKlxyXG4gKiAx5Y2Y5L2N5pmC6ZaT44GU44Go44Gr5ZG844Gw44KM44KL6Zai5pWwXHJcbiAqL1xyXG5mdW5jdGlvbiBpbnRlcnZhbEZ1bmMoKTogdm9pZCB7XHJcbiAgICAvLyAx5Y2Y5L2N5pmC6ZaT44GU44Go44Gr55uk6Z2i44KS5pu05paw44GZ44KLXHJcbiAgICBnYW1lU3RhdGUuaHVtYW5zLmZvckVhY2goKGh1bWFuKSA9PiBodW1hbi5zcGVuZFRpbWUoKSk7XHJcbiAgICAvLyDmmYLplpPjgpIxMOWIhumAsuOCgeOCi1xyXG4gICAgZ2FtZVN0YXRlLnRpbWUubSArPSAxMDtcclxuICAgIGlmIChnYW1lU3RhdGUudGltZS5tID49IDYwKSB7XHJcbiAgICAgICAgZ2FtZVN0YXRlLnRpbWUubSAlPSA2MDtcclxuICAgICAgICBnYW1lU3RhdGUudGltZS5oICs9IDE7XHJcbiAgICAgICAgaWYgKGdhbWVTdGF0ZS50aW1lLmggPj0gMjQpIHtcclxuICAgICAgICAgICAgZ2FtZVN0YXRlLnRpbWUuaCAlPSAyNDtcclxuICAgICAgICAgICAgZ2FtZVN0YXRlLnRpbWUuZCArPSAxO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIOebpOmdouOBquOBqeOCkuabtOaWsFxyXG4gICAgZHJhd0ZpZWxkKCk7XHJcbiAgICBkcmF3VGltZSgpO1xyXG59XHJcblxyXG4vKipcclxuICog44Kk44Oz44K/44O844OQ44Or44Gu44Kq44OzL+OCquODleOCkuWIh+OCiuabv+OBiOOCi1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHN3aXRjaEludGVydmFsKCk6IHZvaWQge1xyXG4gICAgaWYgKGlzTG9vcGluZykge1xyXG4gICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxJZCk7XHJcbiAgICAgICAgaXNMb29waW5nID0gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGludGVydmFsSWQgPSBzZXRJbnRlcnZhbChpbnRlcnZhbEZ1bmMsIDEwMDApO1xyXG4gICAgICAgIGlzTG9vcGluZyA9IHRydWU7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBGSUVMRF9TSVpFICogRklFTERfU0laRSDjga7nm6TpnaLjgpLkvZzmiJDjgZnjgotcclxuICovXHJcbmZ1bmN0aW9uIGNyZWF0ZUZpZWxkKCk6IHZvaWQge1xyXG4gICAgY29uc3QgZmllbGRFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZmllbGRcIik7XHJcbiAgICBpZiAoIWZpZWxkRWwpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJzxkaXYgaWQ9XCJmaWVsZFwiPjwvZGl2PiBpcyBudWxsLicpO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgRklFTERfU0laRTsgaSsrKSB7XHJcbiAgICAgICAgLy8g6KGM44Gu6KaB57Sg44KS5L2c5oiQXHJcbiAgICAgICAgY29uc3QgbGluZUVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICBsaW5lRWwuY2xhc3NOYW1lID0gXCJib2FyZC1yb3dcIjtcclxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IEZJRUxEX1NJWkU7IGorKykge1xyXG4gICAgICAgICAgICAvLyDlkITooYzjga7liJfjga7opoHntKDjgpLkvZzmiJBcclxuICAgICAgICAgICAgY29uc3Qgc3F1YXJlRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gICAgICAgICAgICBzcXVhcmVFbC5jbGFzc05hbWUgPSBcInNxdWFyZVwiO1xyXG4gICAgICAgICAgICBzcXVhcmVFbC5pZCA9IFwic3F1YXJlLVwiICsgKEZJRUxEX1NJWkUgKiBpICsgaik7XHJcbiAgICAgICAgICAgIHNxdWFyZUVsLm9uY2xpY2sgPSAoKSA9PiBoYW5kbGVDbGlja1NxdWFyZShqLCBpKTtcclxuICAgICAgICAgICAgLy8g6KGM44Gu5a2Q6KaB57Sg44Gr44GZ44KLXHJcbiAgICAgICAgICAgIGxpbmVFbC5hcHBlbmRDaGlsZChzcXVhcmVFbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOihjOOBruimgee0oOOCkuWtkOimgee0oOOBq+OBmeOCi1xyXG4gICAgICAgIGZpZWxkRWwuYXBwZW5kQ2hpbGQobGluZUVsKTtcclxuICAgIH1cclxufVxyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=