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
/* harmony export */   doubleIntervalSpeed: () => (/* binding */ doubleIntervalSpeed),
/* harmony export */   switchInterval: () => (/* binding */ switchInterval)
/* harmony export */ });
/* harmony import */ var _function_draw__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./function/draw */ "./src/function/draw.ts");
/* harmony import */ var _function_handleAction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./function/handleAction */ "./src/function/handleAction.ts");
/* harmony import */ var _function_handleMode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./function/handleMode */ "./src/function/handleMode.ts");
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./game */ "./src/game.ts");




const DEFAULT_INTERVAL_MSEC = 1000;
let intervalId;
let isLooping;
let intervalMsec = 1000;
// ページが読み込まれたときの処理
document.addEventListener("DOMContentLoaded", (e) => {
    // 1秒ごとにintervalFuncを実行するように設定
    intervalId = setInterval(intervalFunc, DEFAULT_INTERVAL_MSEC);
    isLooping = true;
    // イベントハンドラーを登録
    document.getElementById("selectHumanButton")?.addEventListener("click", _function_handleMode__WEBPACK_IMPORTED_MODULE_2__.enterSelectHumanMode);
    document.getElementById("switchIntervalButton")?.addEventListener("click", switchInterval);
    document.getElementById("addHumanButton")?.addEventListener("click", _function_handleAction__WEBPACK_IMPORTED_MODULE_1__.handleAddHumanClick);
    document.getElementById("doubleSpeedButton")?.addEventListener("click", doubleIntervalSpeed);
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
        intervalId = setInterval(intervalFunc, intervalMsec);
        isLooping = true;
    }
}
/**
 * 最大4倍までインターバルの時間を速くする
 * 現在4倍速であれば、デフォルト値に戻す
 */
function doubleIntervalSpeed() {
    if (intervalMsec == DEFAULT_INTERVAL_MSEC / 4) {
        intervalMsec = DEFAULT_INTERVAL_MSEC;
    }
    else {
        intervalMsec /= 2;
    }
    if (isLooping) {
        clearInterval(intervalId);
        intervalId = setInterval(intervalFunc, intervalMsec);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNMLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tYXRyaXgtZ2FtZS8uL3NyYy9jbGFzcy9Bc3NldC9Bc3NldC50cyIsIndlYnBhY2s6Ly9tYXRyaXgtZ2FtZS8uL3NyYy9jbGFzcy9Bc3NldC9Ib3VzZS50cyIsIndlYnBhY2s6Ly9tYXRyaXgtZ2FtZS8uL3NyYy9jbGFzcy9IdW1hbi9GYXJtZXIudHMiLCJ3ZWJwYWNrOi8vbWF0cml4LWdhbWUvLi9zcmMvY2xhc3MvSHVtYW4vSHVtYW4udHMiLCJ3ZWJwYWNrOi8vbWF0cml4LWdhbWUvLi9zcmMvY2xhc3MvSHVtYW4vTWVyY2hhbnQudHMiLCJ3ZWJwYWNrOi8vbWF0cml4LWdhbWUvLi9zcmMvY2xhc3MvVGFzay9TbGVlcGluZy50cyIsIndlYnBhY2s6Ly9tYXRyaXgtZ2FtZS8uL3NyYy9jbGFzcy9UYXNrL1Rhc2sudHMiLCJ3ZWJwYWNrOi8vbWF0cml4LWdhbWUvLi9zcmMvY2xhc3MvVGFzay9XYWxraW5nLnRzIiwid2VicGFjazovL21hdHJpeC1nYW1lLy4vc3JjL2Z1bmN0aW9uL2RyYXcudHMiLCJ3ZWJwYWNrOi8vbWF0cml4LWdhbWUvLi9zcmMvZnVuY3Rpb24vaGFuZGxlQWN0aW9uLnRzIiwid2VicGFjazovL21hdHJpeC1nYW1lLy4vc3JjL2Z1bmN0aW9uL2hhbmRsZU1vZGUudHMiLCJ3ZWJwYWNrOi8vbWF0cml4LWdhbWUvLi9zcmMvZnVuY3Rpb24vdXRpbHMudHMiLCJ3ZWJwYWNrOi8vbWF0cml4LWdhbWUvLi9zcmMvZ2FtZS50cyIsIndlYnBhY2s6Ly9tYXRyaXgtZ2FtZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9tYXRyaXgtZ2FtZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbWF0cml4LWdhbWUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9tYXRyaXgtZ2FtZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL21hdHJpeC1nYW1lLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBvc2l0aW9uLCBGSUVMRF9TSVpFIH0gZnJvbSBcIi4uLy4uL2dhbWVcIjtcclxuaW1wb3J0IHsgSHVtYW4gfSBmcm9tIFwiLi4vSHVtYW4vSHVtYW5cIjtcclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBc3NldCB7XHJcbiAgICBwb3M6IFBvc2l0aW9uO1xyXG4gICAgb3duZXI6IEh1bWFuO1xyXG5cclxuICAgIGlzVGhlcmVPd25lcigpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wb3MueCA9PT0gdGhpcy5vd25lci5wb3MueCAmJiB0aGlzLnBvcy55ID09PSB0aGlzLm93bmVyLnBvcy55O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHBvczogUG9zaXRpb24sIG93bmVyOiBIdW1hbikge1xyXG4gICAgICAgIGlmIChwb3MueCA8IDAgfHwgcG9zLnggPj0gRklFTERfU0laRSB8fCBwb3MueSA8IDAgfHwgcG9zLnkgPj0gRklFTERfU0laRSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYHBvcy54LCBwb3gueSBtdXN0IGJlIGluIDAgPD0gYSA8IEZJRUxEX1NJWkVgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wb3MgPSBwb3M7XHJcbiAgICAgICAgdGhpcy5vd25lciA9IG93bmVyO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgQXNzZXQgfSBmcm9tIFwiLi9Bc3NldFwiO1xyXG5pbXBvcnQgeyBQb3NpdGlvbiB9IGZyb20gXCIuLi8uLi9nYW1lXCI7XHJcbmltcG9ydCB7IEh1bWFuIH0gZnJvbSBcIi4uL0h1bWFuL0h1bWFuXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgSG91c2UgZXh0ZW5kcyBBc3NldCB7XHJcbiAgICBjbGFzc05hbWU6IFwibm9ybWFsLWhvdXNlXCIgfCBcImV2ZW5pbmctaG91c2VcIiB8IFwibmlnaHQtaG91c2VcIiB8IFwic2xlZXBpbmctaG91c2VcIjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwb3M6IFBvc2l0aW9uLCBvd25lcjogSHVtYW4pIHtcclxuICAgICAgICBzdXBlcihwb3MsIG93bmVyKTtcclxuICAgICAgICB0aGlzLmNsYXNzTmFtZSA9IFwibm9ybWFsLWhvdXNlXCI7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBIdW1hbiwgQ2hhcmFjdGVyIH0gZnJvbSBcIi4vSHVtYW5cIjtcclxuaW1wb3J0IHsgZ2FtZVN0YXRlLCBQb3NpdGlvbiB9IGZyb20gXCIuLi8uLi9nYW1lXCI7XHJcbmltcG9ydCB7IFNsZWVwaW5nIH0gZnJvbSBcIi4uL1Rhc2svU2xlZXBpbmdcIjtcclxuaW1wb3J0IHsgV2Fsa2luZyB9IGZyb20gXCIuLi9UYXNrL1dhbGtpbmdcIjtcclxuaW1wb3J0IHsgZ2V0QXNzZXRGcm9tUG9zLCBnZXRSYW5kb21Qb3MgfSBmcm9tIFwiLi4vLi4vZnVuY3Rpb24vdXRpbHNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBGYXJtZXIgZXh0ZW5kcyBIdW1hbiB7XHJcbiAgICAvKipcclxuICAgICAqIOODqeODs+ODgOODoOOBq+OCv+OCueOCr+OCkuaxuuOCgeOCi1xyXG4gICAgICovXHJcbiAgICBkZXRlcm1pbmVUYXNrKCk6IHZvaWQge1xyXG4gICAgICAgIC8vIFRPRE8g44K/44K544Kv44Gu5pWw44KS5aKX44KE44GZXHJcbiAgICAgICAgLy8gVE9ETyDjgr/jgrnjgq/jgpLnj77lnKjjga7jg5Hjg6njg6Hjg7zjgr/jgavlvpPjgaPjgabmsbrjgoHjgovjgojjgYbjgavlpInmm7RcclxuICAgICAgICBpZiAoMTYgPCBnYW1lU3RhdGUudGltZS5oKSB7XHJcbiAgICAgICAgICAgIC8vIOWvneOCi1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuecoOOCiuOBvuOBmVwiKTtcclxuICAgICAgICAgICAgdGhpcy50YXNrID0gbmV3IFNsZWVwaW5nKHRoaXMuaG9tZVBvcyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8g5pWj5q2p44GZ44KLXHJcbiAgICAgICAgICAgIGxldCBkZXN0OiBQb3NpdGlvbiA9IGdldFJhbmRvbVBvcygpO1xyXG4gICAgICAgICAgICAvLyDnm67nmoTlnLDjgYzjgqLjgrvjg4Pjg4jjgafjgYLjgaPjgabjga/jgarjgonjgarjgYRcclxuICAgICAgICAgICAgd2hpbGUgKGdldEFzc2V0RnJvbVBvcyhkZXN0KSAhPT0gdW5kZWZpbmVkKSBkZXN0ID0gZ2V0UmFuZG9tUG9zKCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGAoJHtkZXN0Lnh9LCAke2Rlc3QueX0p44G45ZCR44GL44GE44G+44GZYCk7XHJcbiAgICAgICAgICAgIHRoaXMudGFzayA9IG5ldyBXYWxraW5nKGRlc3QpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBuYW1lOiBzdHJpbmcgPSBgSHVtYW4ke0h1bWFuLmh1bWFuTnVtfWAsXHJcbiAgICAgICAgaG9tZVBvczogUG9zaXRpb24gPSB7IHg6IDAsIHk6IDAgfSxcclxuICAgICAgICBocDogbnVtYmVyID0gMTAwLFxyXG4gICAgICAgIGNvbG9yOiBzdHJpbmcgPSBcIiNGRjAwMDBcIixcclxuICAgICAgICBjaGFyYWN0ZXI6IENoYXJhY3RlciA9IHsgd2lzZG9tOiAwLjUgfSxcclxuICAgICAgICBpc1NlbGVjdGVkOiBib29sZWFuID0gZmFsc2UsXHJcbiAgICApIHtcclxuICAgICAgICBzdXBlcihuYW1lLCBob21lUG9zLCBocCwgXCJmYXJtZXJcIiwgY29sb3IsIGNoYXJhY3RlciwgaXNTZWxlY3RlZCk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBQb3NpdGlvbiwgZ2FtZVN0YXRlIH0gZnJvbSBcIi4uLy4uL2dhbWVcIjtcclxuaW1wb3J0IHsgVGFzayB9IGZyb20gXCIuLi9UYXNrL1Rhc2tcIjtcclxuaW1wb3J0IHsgRklFTERfU0laRSB9IGZyb20gXCIuLi8uLi9nYW1lXCI7XHJcbmltcG9ydCB7IFNsZWVwaW5nIH0gZnJvbSBcIi4uL1Rhc2svU2xlZXBpbmdcIjtcclxuaW1wb3J0IHsgV2Fsa2luZyB9IGZyb20gXCIuLi9UYXNrL1dhbGtpbmdcIjtcclxuaW1wb3J0IHsgZ2V0QXNzZXRGcm9tUG9zIH0gZnJvbSBcIi4uLy4uL2Z1bmN0aW9uL3V0aWxzXCI7XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgSHVtYW4ge1xyXG4gICAgc3RhdGljIGh1bWFuTnVtID0gMTtcclxuICAgIHByaXZhdGUgdGltZUNvdW50ZXIgPSAwO1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBfcG9zOiBQb3NpdGlvbjtcclxuICAgIGhvbWVQb3M6IFBvc2l0aW9uO1xyXG4gICAgcHJpdmF0ZSBfaHA6IG51bWJlcjtcclxuICAgIGpvYjogSm9iO1xyXG4gICAgY29sb3I6IHN0cmluZztcclxuICAgIGNoYXJhY3RlcjogQ2hhcmFjdGVyO1xyXG4gICAgaXNTZWxlY3RlZDogYm9vbGVhbjtcclxuICAgIHRhc2s6IFRhc2sgfCBudWxsO1xyXG5cclxuICAgIGdldCBwb3MoKTogUG9zaXRpb24ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wb3M7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHBvcyhuZXdQb3M6IFBvc2l0aW9uKSB7XHJcbiAgICAgICAgaWYgKG5ld1Bvcy54IDwgMCB8fCBGSUVMRF9TSVpFIDw9IG5ld1Bvcy54XHJcbiAgICAgICAgICAgIHx8IG5ld1Bvcy55IDwgMCB8fCBGSUVMRF9TSVpFIDw9IG5ld1Bvcy55KSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUG9zaXRpb24gbXVzdCBiZSAwIDw9IHggPCBGSUVMRF9TSVpFJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3BvcyA9IG5ld1BvcztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaHAoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX2hwOyB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogaHDjgpLmm7TmlrDjgZnjgovjgIIw5Lul5LiL44Gr44Gq44Gj44Gf5aC05ZCIZ2FtZVN0YXRlLmh1bWFuc+OBi+OCieiHqui6q+OCkuWJiumZpFxyXG4gICAgICogQHBhcmFtIGRlbHRhSHAgaHDjga7lpInljJbph49cclxuICAgICAqL1xyXG4gICAgY2hhbmdlSHAoZGVsdGFIcDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5faHAgKz0gZGVsdGFIcDtcclxuICAgICAgICBpZiAodGhpcy5ocCA8PSAwKSB7XHJcbiAgICAgICAgICAgIC8vIOatu+S6oeOBl+OBn+OBruOBp+OAgeS4lueVjOOBi+OCieiHquWIhuOCkua2iOWOu1xyXG4gICAgICAgICAgICAvLyBUT0RPIDog44KC44GX5q275Lqh44GX44Gf5Lq644KC566h55CG44GZ44KL44Gq44KJ44GT44GT44KS57eo6ZuGXHJcbiAgICAgICAgICAgIGdhbWVTdGF0ZS5odW1hbnMgPSBnYW1lU3RhdGUuaHVtYW5zLmZpbHRlcigoaHVtYW4pID0+IGh1bWFuICE9PSB0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAx5Y2Y5L2N5pmC6ZaT6YGO44GU44GZXHJcbiAgICAgKi9cclxuICAgIHNwZW5kVGltZSgpOiB2b2lkIHtcclxuICAgICAgICAvLyDjgr/jgrnjgq/jgpLlrozkuobjgZfjgabjgYTjgovloLTlkIjjgIHmrKHjga7jgr/jgrnjgq/jgpLmsbrjgoHjgotcclxuICAgICAgICBpZiAoIXRoaXMudGFzaykge1xyXG4gICAgICAgICAgICB0aGlzLmRldGVybWluZVRhc2soKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIOOCv+OCueOCr+OBq+W+k+OBo+OBpuihjOWLleOBmeOCi1xyXG4gICAgICAgIGlmICh0aGlzLnRhc2sgaW5zdGFuY2VvZiBTbGVlcGluZykge1xyXG4gICAgICAgICAgICB0aGlzLnRhc2suaGFuZGxlU2xlZXAodGhpcyk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnRhc2sgaW5zdGFuY2VvZiBXYWxraW5nKSB7XHJcbiAgICAgICAgICAgIFdhbGtpbmcuaGFuZGxlV2Fsa2luZyh0aGlzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGhw44KS5pu05paw44GZ44KL77yI5Z+656SO5Luj6Kyd77yJXHJcbiAgICAgICAgdGhpcy50aW1lQ291bnRlciArPSAxO1xyXG4gICAgICAgIHRoaXMudGltZUNvdW50ZXIgJT0gMztcclxuICAgICAgICBpZiAodGhpcy50aW1lQ291bnRlciA9PT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmNoYW5nZUhwKC0xKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDjg6njg7Pjg4Djg6Djgavjgr/jgrnjgq/jgpLmsbrjgoHjgotcclxuICAgICAqL1xyXG4gICAgYWJzdHJhY3QgZGV0ZXJtaW5lVGFzaygpOiB2b2lkO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog55uu55qE5Zyw44Gr5ZCR44GL44Gj44GmMeODnuOCuemAsuOCgFxyXG4gICAgICogQHBhcmFtIGRlc3Qg55uu55qE5ZywXHJcbiAgICAgKi9cclxuICAgIGhlYWRUb0Rlc3QoZGVzdDogUG9zaXRpb24pOiB2b2lkIHtcclxuICAgICAgICAvLyDnj77lnKjjga7luqfmqJnjgYvjgonnm67nmoTlnLDjga7luqfmqJnjgb7jgafjga7mnIDnn63ntYzot6/jgpJkaWprc3RyYeOBp+axguOCgeOCi1xyXG4gICAgICAgIGNvbnN0IGQ6IG51bWJlcltdID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogViB9KS5tYXAobiA9PiBJTkYpO1xyXG4gICAgICAgIGNvbnN0IHVzZWQ6IGJvb2xlYW5bXSA9IEFycmF5LmZyb20oeyBsZW5ndGg6IFYgfSkubWFwKG4gPT4gZmFsc2UpO1xyXG4gICAgICAgIGRbRklFTERfU0laRSAqIHRoaXMucG9zLnkgKyB0aGlzLnBvcy54XSA9IDA7XHJcbiAgICAgICAgLy8g5pyA55+t57WM6Lev44Gu55u05YmN44Gu6aCC54K5XHJcbiAgICAgICAgY29uc3QgcHJldlBvczogUG9zaXRpb25bXSA9IEFycmF5LmZyb20oeyBsZW5ndGg6IFYgfSkubWFwKG4gPT4gKHsgeDogLTEsIHk6IC0xIH0pKTtcclxuXHJcbiAgICAgICAgY29uc3QgZGVzdElzQXNzZXQgPSBnZXRBc3NldEZyb21Qb3MoZGVzdCkgIT09IHVuZGVmaW5lZDtcclxuICAgICAgICBpZiAoZGVzdElzQXNzZXQpIHtcclxuICAgICAgICAgICAgLy8g55uu55qE5Zyw54K544GM44Ki44K744OD44OI44Gq44KJ44Gw44CB6Zqc5a6z54mp44Gn44Gq44GP44GZ44KLXHJcbiAgICAgICAgICAgIHJlbW92ZU9ic3RhY2xlRnJvbUNvc3RNYXAoZGVzdCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB3aGlsZSAodHJ1ZSkge1xyXG4gICAgICAgICAgICBsZXQgdiA9IC0xO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgdSA9IDA7IHUgPCBWOyB1KyspIHtcclxuICAgICAgICAgICAgICAgIGlmICghdXNlZFt1XSAmJiAodiA9PT0gLTEgfHwgZFt1XSA8IGRbdl0pKSB2ID0gdTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHYgPT09IC0xKSBicmVhaztcclxuICAgICAgICAgICAgdXNlZFt2XSA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCB1ID0gMDsgdSA8IFY7IHUrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRbdV0gPiBkW3ZdICsgY29zdFt2XVt1XSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRbdV0gPSBNYXRoLm1pbihkW3VdLCBkW3ZdICsgY29zdFt2XVt1XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJldlBvc1t1XSA9IHsgeDogdiAlIEZJRUxEX1NJWkUsIHk6IE1hdGguZmxvb3IodiAvIEZJRUxEX1NJWkUpIH07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGRlc3TjgYvjgonnj77lnKjlnLBjdXJQb3Pjgbjjga7mnIDnn63ntYzot6/jgpLmsYLjgoHjgotcclxuICAgICAgICBjb25zdCBkZXN0VG9DdXJQb3NQYXRoOiBQb3NpdGlvbltdID0gW107XHJcbiAgICAgICAgbGV0IHQ6IFBvc2l0aW9uID0gZGVzdDtcclxuICAgICAgICBmb3IgKDsgISh0LnggPT09IC0xICYmIHQueSA9PT0gLTEpOyB0ID0gcHJldlBvc1tGSUVMRF9TSVpFICogdC55ICsgdC54XSkge1xyXG4gICAgICAgICAgICBkZXN0VG9DdXJQb3NQYXRoLnB1c2godCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnBvcyA9IGRlc3RUb0N1clBvc1BhdGhbZGVzdFRvQ3VyUG9zUGF0aC5sZW5ndGggLSAyXTtcclxuXHJcbiAgICAgICAgaWYgKGRlc3RJc0Fzc2V0KSB7XHJcbiAgICAgICAgICAgIC8vIOebrueahOWcsOeCueOBjOOCouOCu+ODg+ODiOOBquOCieOBsOOAgeWGjeOBs+manOWus+eJqeOBqOOBl+OBpueZu+mMsuOBmeOCi1xyXG4gICAgICAgICAgICBhZGRPYnN0YWNsZVRvQ29zdE1hcChkZXN0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgbmFtZTogc3RyaW5nID0gYEh1bWFuJHtIdW1hbi5odW1hbk51bX1gLFxyXG4gICAgICAgIGhvbWVQb3M6IFBvc2l0aW9uID0geyB4OiAwLCB5OiAwIH0sXHJcbiAgICAgICAgaHA6IG51bWJlciA9IDEwMCxcclxuICAgICAgICBqb2I6IEpvYiA9IFwiZmFybWVyXCIsXHJcbiAgICAgICAgY29sb3I6IHN0cmluZyA9IFwiI0ZGMDAwMFwiLFxyXG4gICAgICAgIGNoYXJhY3RlcjogQ2hhcmFjdGVyID0geyB3aXNkb206IDAuNSB9LFxyXG4gICAgICAgIGlzU2VsZWN0ZWQ6IGJvb2xlYW4gPSBmYWxzZSxcclxuICAgICkge1xyXG4gICAgICAgIGlmIChob21lUG9zLnggPCAwIHx8IEZJRUxEX1NJWkUgPD0gaG9tZVBvcy54XHJcbiAgICAgICAgICAgIHx8IGhvbWVQb3MueSA8IDAgfHwgRklFTERfU0laRSA8PSBob21lUG9zLnkpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQb3NpdGlvbiBtdXN0IGJlIDAgPD0geCA8IEZJRUxEX1NJWkUnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgSHVtYW4uaHVtYW5OdW0rKztcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMuaG9tZVBvcyA9IGhvbWVQb3M7XHJcbiAgICAgICAgdGhpcy5fcG9zID0gaG9tZVBvcztcclxuICAgICAgICB0aGlzLl9ocCA9IGhwO1xyXG4gICAgICAgIHRoaXMuam9iID0gam9iO1xyXG4gICAgICAgIHRoaXMuY29sb3IgPSBjb2xvcjtcclxuICAgICAgICB0aGlzLmNoYXJhY3RlciA9IGNoYXJhY3RlcjtcclxuICAgICAgICB0aGlzLmlzU2VsZWN0ZWQgPSBpc1NlbGVjdGVkO1xyXG4gICAgICAgIHRoaXMudGFzayA9IG51bGw7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB0eXBlIEpvYiA9ICdmYXJtZXInIHwgJ21lcmNoYW50JztcclxuXHJcbmV4cG9ydCB0eXBlIENoYXJhY3RlciA9IHtcclxuICAgIHdpc2RvbTogbnVtYmVyO1xyXG59XHJcblxyXG5cclxuLy8gZGlqa3N0cmHjgavlv4XopoHjgarlpInmlbBcclxuY29uc3QgSU5GID0gMTAwMDAwO1xyXG5jb25zdCBWID0gRklFTERfU0laRSAqIEZJRUxEX1NJWkU7XHJcbi8vIOmao+aOpeihjOWIl1xyXG5jb25zdCBjb3N0OiBudW1iZXJbXVtdID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogViB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hcChuID0+IEFycmF5LmZyb20oeyBsZW5ndGg6IFYgfSkubWFwKG4gPT4gSU5GKSk7XHJcblxyXG4vLyDpmqPmjqXooYzliJfjgpLliJ3mnJ/ljJZcclxuZm9yIChsZXQgeSA9IDA7IHkgPCBGSUVMRF9TSVpFOyB5KyspXHJcbiAgICBmb3IgKGxldCB4ID0gMDsgeCA8IEZJRUxEX1NJWkU7IHgrKylcclxuICAgICAgICByZWdpc3RlclNxdWFyZVRvQ29zdE1hcCh7IHgsIHkgfSk7XHJcblxyXG4vKipcclxuICog44GC44KL44Oe44K544GL44KJ44CB44Gd44Gu5LiK5LiL5bem5Y+z44Gu44Oe44K544Gr56e75YuV44Gn44GN44KL44KI44GG44GrY29zdOODnuODg+ODl+OBq+eZu+mMsuOBmeOCi1xyXG4gKiBAcGFyYW0gcG9zIOeZu+mMsuOBmeOCi+ODnuOCueOBruS9jee9rlxyXG4gKi9cclxuZnVuY3Rpb24gcmVnaXN0ZXJTcXVhcmVUb0Nvc3RNYXAocG9zOiBQb3NpdGlvbikge1xyXG4gICAgY29uc3QgZGVsdGFQb3NpdGlvbnM6IFBvc2l0aW9uW10gPSBbXHJcbiAgICAgICAgeyB4OiAtMSwgeTogMCB9LFxyXG4gICAgICAgIHsgeDogMCwgIHk6IC0xIH0sXHJcbiAgICAgICAgeyB4OiArMSwgeTogMCB9LFxyXG4gICAgICAgIHsgeDogMCwgIHk6ICsxIH0sXHJcbiAgICBdO1xyXG5cclxuICAgIC8vIHBvc+OBruS4iuS4i+W3puWPs+OBruODnuOCueOBuOOAgXBvc+OBi+OCieOCqOODg+OCuOOCkueUn+OChOOBmVxyXG4gICAgZGVsdGFQb3NpdGlvbnMuZm9yRWFjaCgoZGVsdGFQb3MpID0+IHtcclxuICAgICAgICBjb25zdCB4ID0gcG9zLnggKyBkZWx0YVBvcy54O1xyXG4gICAgICAgIGNvbnN0IHkgPSBwb3MueSArIGRlbHRhUG9zLnk7XHJcbiAgICAgICAgaWYgKHggPCAwIHx8IHggPj0gRklFTERfU0laRSB8fCB5IDwgMCB8fCB5ID49IEZJRUxEX1NJWkUpIHJldHVybjtcclxuICAgICAgICBlbHNlIGNvc3RbRklFTERfU0laRSAqIHBvcy55ICsgcG9zLnhdW0ZJRUxEX1NJWkUgKiB5ICsgeF0gPSAxO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBjb3N044Oe44OD44OX44GL44KJ6Zqc5a6z54mp77yI6YCa44KM44Gq44GE44Oe44K577yJ44KS5Y+W44KK6Zmk44GPXHJcbiAqIEBwYXJhbSBwb3Mg6Zqc5a6z54mp44Gu5L2N572uXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlT2JzdGFjbGVGcm9tQ29zdE1hcChwb3M6IFBvc2l0aW9uKSB7XHJcbiAgICBjb25zdCBkZWx0YVBvc2l0aW9uczogUG9zaXRpb25bXSA9IFtcclxuICAgICAgICB7IHg6IC0xLCB5OiAwIH0sXHJcbiAgICAgICAgeyB4OiAwLCAgeTogLTEgfSxcclxuICAgICAgICB7IHg6ICsxLCB5OiAwIH0sXHJcbiAgICAgICAgeyB4OiAwLCAgeTogKzEgfSxcclxuICAgIF07XHJcblxyXG4gICAgLy8gcG9z44Gu5LiK5LiL5bem5Y+z44Gu44Oe44K544GL44KJ44CBcG9z44G444Gu44Ko44OD44K444KS55Sf44KE44GX44Gm44CBcG9z44Gr6KGM44GR44KL44KI44GG44Gr44GZ44KLXHJcbiAgICBkZWx0YVBvc2l0aW9ucy5mb3JFYWNoKChkZWx0YVBvcykgPT4ge1xyXG4gICAgICAgIGNvbnN0IHggPSBwb3MueCArIGRlbHRhUG9zLng7XHJcbiAgICAgICAgY29uc3QgeSA9IHBvcy55ICsgZGVsdGFQb3MueTtcclxuICAgICAgICBpZiAoeCA8IDAgfHwgeCA+PSBGSUVMRF9TSVpFIHx8IHkgPCAwIHx8IHkgPj0gRklFTERfU0laRSkgcmV0dXJuO1xyXG4gICAgICAgIGVsc2UgY29zdFtGSUVMRF9TSVpFICogeSArIHhdW0ZJRUxEX1NJWkUgKiBwb3MueSArIHBvcy54XSA9IDE7XHJcbiAgICB9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIGNvc3Tjg57jg4Pjg5fjgavpmpzlrrPnianvvIjpgJrjgozjgarjgYTjg57jgrnvvInjgpLnmbvpjLLjgZnjgotcclxuICogQHBhcmFtIHBvcyDpmpzlrrPnianjga7kvY3nva5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBhZGRPYnN0YWNsZVRvQ29zdE1hcChwb3M6IFBvc2l0aW9uKSB7XHJcbiAgICBjb25zdCBkZWx0YVBvc2l0aW9uczogUG9zaXRpb25bXSA9IFtcclxuICAgICAgICB7IHg6IC0xLCB5OiAwIH0sXHJcbiAgICAgICAgeyB4OiAwLCAgeTogLTEgfSxcclxuICAgICAgICB7IHg6ICsxLCB5OiAwIH0sXHJcbiAgICAgICAgeyB4OiAwLCAgeTogKzEgfSxcclxuICAgIF07XHJcblxyXG4gICAgLy8gcG9z44Gu5LiK5LiL5bem5Y+z44Gu44Oe44K544GL44KJ44CBcG9z44G444Gu44Ko44OD44K444KS5raI44GX44Gm44CBcG9z44Gr6KGM44GR44Gq44GE44KI44GG44Gr44GZ44KLXHJcbiAgICBkZWx0YVBvc2l0aW9ucy5mb3JFYWNoKChkZWx0YVBvcykgPT4ge1xyXG4gICAgICAgIGNvbnN0IHggPSBwb3MueCArIGRlbHRhUG9zLng7XHJcbiAgICAgICAgY29uc3QgeSA9IHBvcy55ICsgZGVsdGFQb3MueTtcclxuICAgICAgICBpZiAoeCA8IDAgfHwgeCA+PSBGSUVMRF9TSVpFIHx8IHkgPCAwIHx8IHkgPj0gRklFTERfU0laRSkgcmV0dXJuO1xyXG4gICAgICAgIGVsc2UgY29zdFtGSUVMRF9TSVpFICogeSArIHhdW0ZJRUxEX1NJWkUgKiBwb3MueSArIHBvcy54XSA9IElORjtcclxuICAgIH0pO1xyXG59IiwiaW1wb3J0IHsgSHVtYW4sIENoYXJhY3RlciB9IGZyb20gXCIuL0h1bWFuXCI7XHJcbmltcG9ydCB7IGdhbWVTdGF0ZSwgUG9zaXRpb24gfSBmcm9tIFwiLi4vLi4vZ2FtZVwiO1xyXG5pbXBvcnQgeyBTbGVlcGluZyB9IGZyb20gXCIuLi9UYXNrL1NsZWVwaW5nXCI7XHJcbmltcG9ydCB7IFdhbGtpbmcgfSBmcm9tIFwiLi4vVGFzay9XYWxraW5nXCI7XHJcbmltcG9ydCB7IGdldEFzc2V0RnJvbVBvcywgZ2V0UmFuZG9tUG9zIH0gZnJvbSBcIi4uLy4uL2Z1bmN0aW9uL3V0aWxzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgTWVyY2hhbnQgZXh0ZW5kcyBIdW1hbiB7XHJcbiAgICAvKipcclxuICAgICAqIOODqeODs+ODgOODoOOBq+OCv+OCueOCr+OCkuaxuuOCgeOCi1xyXG4gICAgICovXHJcbiAgICBkZXRlcm1pbmVUYXNrKCk6IHZvaWQge1xyXG4gICAgICAgIC8vIFRPRE8g44K/44K544Kv44Gu5pWw44KS5aKX44KE44GZXHJcbiAgICAgICAgLy8gVE9ETyDjgr/jgrnjgq/jgpLnj77lnKjjga7jg5Hjg6njg6Hjg7zjgr/jgavlvpPjgaPjgabmsbrjgoHjgovjgojjgYbjgavlpInmm7RcclxuICAgICAgICBpZiAoMTYgPCBnYW1lU3RhdGUudGltZS5oKSB7XHJcbiAgICAgICAgICAgIC8vIOWvneOCi1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuecoOOCiuOBvuOBmVwiKTtcclxuICAgICAgICAgICAgdGhpcy50YXNrID0gbmV3IFNsZWVwaW5nKHRoaXMuaG9tZVBvcyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8g5pWj5q2p44GZ44KLXHJcbiAgICAgICAgICAgIGxldCBkZXN0OiBQb3NpdGlvbiA9IGdldFJhbmRvbVBvcygpO1xyXG4gICAgICAgICAgICAvLyDnm67nmoTlnLDjgYzjgqLjgrvjg4Pjg4jjgafjgYLjgaPjgabjga/jgarjgonjgarjgYRcclxuICAgICAgICAgICAgd2hpbGUgKGdldEFzc2V0RnJvbVBvcyhkZXN0KSAhPT0gdW5kZWZpbmVkKSBkZXN0ID0gZ2V0UmFuZG9tUG9zKCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGAoJHtkZXN0Lnh9LCAke2Rlc3QueX0p44G45ZCR44GL44GE44G+44GZYCk7XHJcbiAgICAgICAgICAgIHRoaXMudGFzayA9IG5ldyBXYWxraW5nKGRlc3QpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBuYW1lOiBzdHJpbmcgPSBgSHVtYW4ke0h1bWFuLmh1bWFuTnVtfWAsXHJcbiAgICAgICAgaG9tZVBvczogUG9zaXRpb24gPSB7IHg6IDAsIHk6IDAgfSxcclxuICAgICAgICBocDogbnVtYmVyID0gMTAwLFxyXG4gICAgICAgIGNvbG9yOiBzdHJpbmcgPSBcIiNGRjAwMDBcIixcclxuICAgICAgICBjaGFyYWN0ZXI6IENoYXJhY3RlciA9IHsgd2lzZG9tOiAwLjUgfSxcclxuICAgICAgICBpc1NlbGVjdGVkOiBib29sZWFuID0gZmFsc2UsXHJcbiAgICApIHtcclxuICAgICAgICBzdXBlcihuYW1lLCBob21lUG9zLCBocCwgXCJtZXJjaGFudFwiLCBjb2xvciwgY2hhcmFjdGVyLCBpc1NlbGVjdGVkKTtcclxuICAgIH1cclxufSIsImltcG9ydCB7IEh1bWFuIH0gZnJvbSBcIi4uL0h1bWFuL0h1bWFuXCI7XHJcbmltcG9ydCB7IGdhbWVTdGF0ZSwgUG9zaXRpb24gfSBmcm9tIFwiLi4vLi4vZ2FtZVwiO1xyXG5pbXBvcnQgeyBUYXNrIH0gZnJvbSBcIi4vVGFza1wiO1xyXG5pbXBvcnQgeyBpc05pZ2h0IH0gZnJvbSBcIi4uLy4uL2Z1bmN0aW9uL3V0aWxzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgU2xlZXBpbmcgZXh0ZW5kcyBUYXNrIHtcclxuICAgIGlzU2xlZXBpbmc6IGJvb2xlYW47XHJcblxyXG4gICAgaGFuZGxlU2xlZXAoaHVtYW46IEh1bWFuKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGlzTmlnaHQoKSkge1xyXG4gICAgICAgICAgICAvLyDlpJxcclxuICAgICAgICAgICAgaWYgKGh1bWFuLnBvcy54ID09PSBodW1hbi5ob21lUG9zLnggJiYgaHVtYW4ucG9zLnkgPT09IGh1bWFuLmhvbWVQb3MueSkge1xyXG4gICAgICAgICAgICAgICAgLy8g5a6244Gr44GE44KLXHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNTbGVlcGluZykge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOOBvuOBoOWvneOBpuOBhOOBquOBhOOBruOBp+OAgeaZgumWk+OBq+W/nOOBmOOBn+eiuueOh+OBp+WvneOCi1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE8gOiDmgKfmoLzjgarjganjga7lgKTjgoLogIPmha7jgZfjgZ/jgYRcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCByID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGggPSBnYW1lU3RhdGUudGltZS5oO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0aHJlc2hvbGQ6IG51bWJlcjtcclxuICAgICAgICAgICAgICAgICAgICAvLyDplr7lgKTjga/jgIHlpJzjgYzmm7TjgZHjgovjgbvjganlsI/jgZXjgY/jgarjgotcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaCA8IDEyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEFNXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocmVzaG9sZCA9IC0oNS80KSAqIGggKyA1O1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFBNXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocmVzaG9sZCA9IC0oNS82KSAqIChoIC0gMjQpICsgNTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aHJlc2hvbGQgPCByKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOODqeODs+ODgOODoOOBquWApOOBjOmWvuWApOOCkui2heOBiOOBn+OCieWvneOCi1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzU2xlZXBpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5a+d44Gm44GE44KL44Gu44GnaHDjgpLlm57lvqlcclxuICAgICAgICAgICAgICAgICAgICBodW1hbi5jaGFuZ2VIcCgrMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyDlh7rlhYjjgarjga7jgafjgIHlrrbjgavluLDjgotcclxuICAgICAgICAgICAgICAgIGh1bWFuLmhlYWRUb0Rlc3QoaHVtYW4uaG9tZVBvcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyDmnJ1cclxuICAgICAgICAgICAgY29uc3QgciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcclxuICAgICAgICAgICAgY29uc3QgaCA9IGdhbWVTdGF0ZS50aW1lLmg7XHJcbiAgICAgICAgICAgIC8vIFRPRE8gOiDmgKfmoLzjgarjganjga7lgKTjgoLogIPmha7jgZfjgZ/jgYRcclxuICAgICAgICAgICAgY29uc3QgdGhyZXNob2xkID0gLTUvMiAqIChoIC0gNykgKyA1O1xyXG4gICAgICAgICAgICBpZiAodGhyZXNob2xkIDwgcikge1xyXG4gICAgICAgICAgICAgICAgLy8g6LW344GN44KLXHJcbiAgICAgICAgICAgICAgICBodW1hbi50YXNrID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3Iod2hlcmU6IFBvc2l0aW9uKSB7XHJcbiAgICAgICAgc3VwZXIod2hlcmUpO1xyXG4gICAgICAgIHRoaXMuaXNTbGVlcGluZyA9IGZhbHNlO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgUG9zaXRpb24sIEZJRUxEX1NJWkUgfSBmcm9tIFwiLi4vLi4vZ2FtZVwiO1xyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFRhc2sge1xyXG4gICAgd2hlcmU6IFBvc2l0aW9uO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHdoZXJlOiBQb3NpdGlvbikge1xyXG4gICAgICAgIGlmICh3aGVyZS54IDwgMCB8fCBGSUVMRF9TSVpFIDw9IHdoZXJlLnhcclxuICAgICAgICAgICAgfHwgd2hlcmUueSA8IDAgfHwgRklFTERfU0laRSA8PSB3aGVyZS55KSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUG9zaXRpb24gbXVzdCBiZSAwIDw9IHggPCBGSUVMRF9TSVpFJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMud2hlcmUgPSB3aGVyZTtcclxuICAgIH1cclxufSIsImltcG9ydCB7IEh1bWFuIH0gZnJvbSBcIi4uL0h1bWFuL0h1bWFuXCI7XHJcbmltcG9ydCB7IFBvc2l0aW9uIH0gZnJvbSBcIi4uLy4uL2dhbWVcIjtcclxuaW1wb3J0IHsgVGFzayB9IGZyb20gXCIuL1Rhc2tcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBXYWxraW5nIGV4dGVuZHMgVGFzayB7XHJcbiAgICBzdGF0aWMgaGFuZGxlV2Fsa2luZyhodW1hbjogSHVtYW4pOiB2b2lkIHtcclxuICAgICAgICBpZiAoIWh1bWFuLnRhc2spIHJldHVybjtcclxuICAgICAgICBpZiAoaHVtYW4ucG9zLnggPT09IGh1bWFuLnRhc2sud2hlcmUueCAmJiBodW1hbi5wb3MueSA9PT0gaHVtYW4udGFzay53aGVyZS55KSB7XHJcbiAgICAgICAgICAgIC8vIOebrueahOWcsOOBq+WIsOedgOOBl+OBn+OBruOBp+OCv+OCueOCr+OCkue1guS6hlxyXG4gICAgICAgICAgICBodW1hbi50YXNrID0gbnVsbDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyDnm67nmoTlnLDjgavlkJHjgYvjgYZcclxuICAgICAgICAgICAgaHVtYW4uaGVhZFRvRGVzdChodW1hbi50YXNrLndoZXJlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3Iod2hlcmU6IFBvc2l0aW9uKSB7XHJcbiAgICAgICAgc3VwZXIod2hlcmUpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgZ2FtZVN0YXRlLCBGSUVMRF9TSVpFIH0gZnJvbSBcIi4uL2dhbWVcIjtcclxuaW1wb3J0IHsgSG91c2UgfSBmcm9tIFwiLi4vY2xhc3MvQXNzZXQvSG91c2VcIjtcclxuaW1wb3J0IHsgSHVtYW4gfSBmcm9tIFwiLi4vY2xhc3MvSHVtYW4vSHVtYW5cIjtcclxuaW1wb3J0IHsgaXNOaWdodCB9IGZyb20gXCIuL3V0aWxzXCI7XHJcbmltcG9ydCB7IFNsZWVwaW5nIH0gZnJvbSBcIi4uL2NsYXNzL1Rhc2svU2xlZXBpbmdcIjtcclxuXHJcbi8qKlxyXG4gKiBnYW1lU3RhdGXjgavlvpPjgaPjgabnm6TpnaLjgpLmm7TmlrDjgZnjgotcclxuICog6YG45oqe5Lit44Gu5Lq644Gu5LiK44Gr44Gv5ZC544GN5Ye644GX44KS6KGo56S644GZ44KLXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZHJhd0ZpZWxkKCk6IHZvaWQge1xyXG4gICAgLy8g55uk6Z2i44KS44Oq44K744OD44OI44GZ44KLXHJcbiAgICByZXNldEZpZWxkKCk7XHJcblxyXG4gICAgLy8g5Lq644KS5o+P55S7XHJcbiAgICBnYW1lU3RhdGUuaHVtYW5zLmZvckVhY2goKGh1bWFuKSA9PiB7XHJcbiAgICAgICAgY29uc3QgeyB4LCB5IH0gPSBodW1hbi5wb3M7XHJcbiAgICAgICAgY29uc3Qgc3F1YXJlRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNxdWFyZS1cIiArIChGSUVMRF9TSVpFICogeSArIHgpKTtcclxuICAgICAgICBpZiAoIXNxdWFyZUVsKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgc3F1YXJlLSR7RklFTERfU0laRSAqIHkgKyB4fSB3YXMgbm90IGZvdW5kLmApO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDjg57jgrnjga7mloflrZfliJfjgpLmm7TmlrBcclxuICAgICAgICBzcXVhcmVFbC50ZXh0Q29udGVudCA9IFwi4peLXCI7XHJcbiAgICAgICAgLy8g5Lq644GM6YG45oqe5Lit44Gq44KJ44Oe44K544Gu5LiK44Gr5ZC544GN5Ye644GX44KS6KGo56S644GZ44KLXHJcbiAgICAgICAgaWYgKGh1bWFuLmlzU2VsZWN0ZWQpIHtcclxuICAgICAgICAgICAgY29uc3QgYmFsbG9vbkVsID0gY3JlYXRlQmFsbG9vbihodW1hbik7XHJcbiAgICAgICAgICAgIHNxdWFyZUVsLmFwcGVuZENoaWxkKGJhbGxvb25FbCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8g44Ki44K744OD44OI44KS5o+P55S7XHJcbiAgICBnYW1lU3RhdGUuYXNzZXRzLmZvckVhY2goKGFzc2V0KSA9PiB7XHJcbiAgICAgICAgY29uc3QgeyB4LCB5IH0gPSBhc3NldC5wb3M7XHJcbiAgICAgICAgY29uc3Qgc3F1YXJlRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNxdWFyZS1cIiArIChGSUVMRF9TSVpFICogeSArIHgpKTtcclxuICAgICAgICBpZiAoIXNxdWFyZUVsKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgc3F1YXJlLSR7RklFTERfU0laRSAqIHkgKyB4fSB3YXMgbm90IGZvdW5kLmApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGFzc2V0IGluc3RhbmNlb2YgSG91c2UpIHtcclxuICAgICAgICAgICAgLy8g44Kv44Op44K544KS44Oq44K744OD44OI44GZ44KLXHJcbiAgICAgICAgICAgIHNxdWFyZUVsLmNsYXNzTGlzdC5yZW1vdmUoYXNzZXQuY2xhc3NOYW1lKTtcclxuICAgICAgICAgICAgLy8g6YGp5YiH44Gq55S75YOP6KGo56S644Gu44Gf44KB44CB54q25rOB44Gr5b+c44GY44Gf44Kv44Op44K544KS5LuY5LiO44GZ44KLXHJcbiAgICAgICAgICAgIGlmIChhc3NldC5pc1RoZXJlT3duZXIoKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGFzc2V0Lm93bmVyLnRhc2sgaW5zdGFuY2VvZiBTbGVlcGluZ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAmJiBhc3NldC5vd25lci50YXNrLmlzU2xlZXBpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICBhc3NldC5jbGFzc05hbWUgPSAnc2xlZXBpbmctaG91c2UnO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpc05pZ2h0KCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBhc3NldC5jbGFzc05hbWUgPSAnZXZlbmluZy1ob3VzZSc7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGFzc2V0LmNsYXNzTmFtZSA9ICdub3JtYWwtaG91c2UnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8g55S75YOP44KS6KGo56S644GZ44KL44Gf44KB44Gr44Oe44K544Gu5paH5a2X5YiX44KS5raI44GZXHJcbiAgICAgICAgICAgICAgICBjb25zdCB0ZXh0RWwgPSBzcXVhcmVFbC5jaGlsZE5vZGVzWzBdO1xyXG4gICAgICAgICAgICAgICAgdGV4dEVsLnRleHRDb250ZW50ID0gXCJcIjtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIOaJgOacieiAheOBjOWutuOBq+OBhOOBquOBhOWgtOWQiFxyXG4gICAgICAgICAgICAgICAgaWYgKGlzTmlnaHQoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFzc2V0LmNsYXNzTmFtZSA9ICduaWdodC1ob3VzZSc7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGFzc2V0LmNsYXNzTmFtZSA9ICdub3JtYWwtaG91c2UnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNxdWFyZUVsLmNsYXNzTGlzdC5hZGQoYXNzZXQuY2xhc3NOYW1lKTtcclxuICAgICAgICAgICAgY29uc3QgaW1nRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xyXG4gICAgICAgICAgICBzcXVhcmVFbC5hcHBlbmRDaGlsZChpbWdFbCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDnm6TpnaLjgpLjg6rjgrvjg4Pjg4jjgZnjgovvvIjjgZnjgbnjgabjga7jg57jgrnjgpLnqbrmloflrZfliJfjgavjgZnjgovvvIlcclxuICovXHJcbmZ1bmN0aW9uIHJlc2V0RmllbGQoKTogdm9pZCB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IEZJRUxEX1NJWkU7IGkrKykge1xyXG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgRklFTERfU0laRTsgaisrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNxdWFyZUVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzcXVhcmUtXCIgKyAoRklFTERfU0laRSAqIGkgKyBqKSk7XHJcbiAgICAgICAgICAgIGlmICghc3F1YXJlRWwpXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYHNxdWFyZS0ke0ZJRUxEX1NJWkUgKiBpICsgan0gd2FzIG5vdCBmb3VuZC5gKTtcclxuICAgICAgICAgICAgLy8g5ZCE44Oe44K544Gu5paH5a2X5YiX44KS56m65paH5a2X5YiX44Gr44Oq44K744OD44OIXHJcbiAgICAgICAgICAgIHNxdWFyZUVsLnRleHRDb250ZW50ID0gXCJcIjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDooajnpLrjgZXjgozjgabjgYTjgovmmYLliLvjgpLmm7TmlrDjgZnjgotcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBkcmF3VGltZSgpOiB2b2lkIHtcclxuICAgIGNvbnN0IHRpbWVFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGltZUxhYmVsXCIpO1xyXG4gICAgaWYgKCF0aW1lRWwpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYHRpbWVMYWJlbCB3YXMgbm90IGZvdW5kLmApO1xyXG4gICAgfVxyXG4gICAgdGltZUVsLnRleHRDb250ZW50ID0gYOePvuWcqOOBruaZguWIuyAke2dhbWVTdGF0ZS50aW1lLmh9IDogJHtnYW1lU3RhdGUudGltZS5tfWA7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDkurrjga7mg4XloLHjgpLooajnpLrjgZnjgovlkLnjgY3lh7rjgZfopoHntKDjgpLov5TjgZlcclxuICogQHBhcmFtIGh1bWFuIOaDheWgseOCkuihqOekuuOBmeOCi+WvvuixoVxyXG4gKiBAcmV0dXJucyDlkLnjgY3lh7rjgZfjga48ZGl2Puimgee0oFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUJhbGxvb24oaHVtYW46IEh1bWFuKTogSFRNTERpdkVsZW1lbnQge1xyXG4gICAgY29uc3QgZGl2RWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgZGl2RWwuY2xhc3NOYW1lID0gXCJhYm92ZS1zcXVhcmVcIjtcclxuICAgIGNvbnN0IGJhbGxvb25FbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBiYWxsb29uRWwuY2xhc3NOYW1lID0gXCJiYWxsb29uMlwiO1xyXG4gICAgY29uc3QgbWVzc2FnZUVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XHJcbiAgICBtZXNzYWdlRWwuaW5uZXJUZXh0ID1cclxuICAgICAgICBg5ZCN5YmN77yaJHtodW1hbi5uYW1lfVxyXG4gICAgSFDvvJoke2h1bWFuLmhwfVxyXG4gICAg5b256IG377yaJHtodW1hbi5qb2J9XHJcbiAgICDmgKfmoLzvvJoke2h1bWFuLmNoYXJhY3Rlcn1gO1xyXG4gICAgYmFsbG9vbkVsLmFwcGVuZENoaWxkKG1lc3NhZ2VFbCk7XHJcbiAgICBkaXZFbC5hcHBlbmRDaGlsZChiYWxsb29uRWwpO1xyXG5cclxuICAgIHJldHVybiBkaXZFbDtcclxufSIsImltcG9ydCB7IGdhbWVTdGF0ZSwgRklFTERfU0laRSB9IGZyb20gXCIuLi9nYW1lXCI7XHJcbmltcG9ydCB7IEh1bWFuLCBKb2IsIGFkZE9ic3RhY2xlVG9Db3N0TWFwIH0gZnJvbSBcIi4uL2NsYXNzL0h1bWFuL0h1bWFuXCI7XHJcbmltcG9ydCB7IEZhcm1lciB9IGZyb20gXCIuLi9jbGFzcy9IdW1hbi9GYXJtZXJcIjtcclxuaW1wb3J0IHsgTWVyY2hhbnQgfSBmcm9tIFwiLi4vY2xhc3MvSHVtYW4vTWVyY2hhbnRcIjtcclxuaW1wb3J0IHsgSG91c2UgfSBmcm9tIFwiLi4vY2xhc3MvQXNzZXQvSG91c2VcIjtcclxuaW1wb3J0IHsgZHJhd0ZpZWxkIH0gZnJvbSBcIi4vZHJhd1wiO1xyXG5pbXBvcnQgeyBleGl0QWRkSHVtYW5Nb2RlLCBlbnRlckFkZEh1bWFuTW9kZSwgZXhpdFNlbGVjdEh1bWFuTW9kZSB9IGZyb20gXCIuL2hhbmRsZU1vZGVcIjtcclxuaW1wb3J0IHsgZ2V0SHVtYW5zRnJvbVBvcyB9IGZyb20gXCIuL3V0aWxzXCI7XHJcbmltcG9ydCB7IEFzc2V0IH0gZnJvbSBcIi4uL2NsYXNzL0Fzc2V0L0Fzc2V0XCI7XHJcblxyXG4vKipcclxuICogU3F1YXJl44GM44Kv44Oq44OD44Kv44GV44KM44Gf44Go44GN44Gr5ZG844Gw44KM44CB54++5Zyo44Gu44Oi44O844OJ44Gr5b6T44Gj44Gm5Yem55CG44KS6KGM44GGXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaGFuZGxlQ2xpY2tTcXVhcmUoeDogbnVtYmVyLCB5OiBudW1iZXIpOiB2b2lkIHtcclxuICAgIHN3aXRjaCAoZ2FtZVN0YXRlLm1vZGUuaWQpIHtcclxuICAgICAgICBjYXNlICduZXV0cmFsJzpcclxuICAgICAgICAgICAgY29uc29sZS5sb2coRklFTERfU0laRSAqIHkgKyB4KTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnYWRkSHVtYW4nOlxyXG4gICAgICAgICAgICAvLyDmjIflrprjga7loLTmiYDjgavkurrjgpLov73liqDjgZnjgotcclxuICAgICAgICAgICAgbGV0IG5ld0h1bWFuOiBIdW1hbjtcclxuICAgICAgICAgICAgaWYgKGdhbWVTdGF0ZS5tb2RlLmpvYiA9PT0gXCJmYXJtZXJcIikge1xyXG4gICAgICAgICAgICAgICAgbmV3SHVtYW4gPSBuZXcgRmFybWVyKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZ2FtZVN0YXRlLm1vZGUuam9iID09PSBcIm1lcmNoYW50XCIpIHtcclxuICAgICAgICAgICAgICAgIG5ld0h1bWFuID0gbmV3IE1lcmNoYW50KCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBuZXdIdW1hbiA9IG5ldyBGYXJtZXIoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBuZXdIdW1hbi5ob21lUG9zID0geyB4LCB5IH07XHJcbiAgICAgICAgICAgIG5ld0h1bWFuLnBvcyA9IHsgeCwgeSB9O1xyXG4gICAgICAgICAgICBhZGRIdW1hbihuZXdIdW1hbik7XHJcbiAgICAgICAgICAgIC8vIOebpOmdouOCkuabtOaWsOOBmeOCi1xyXG4gICAgICAgICAgICBkcmF3RmllbGQoKTtcclxuICAgICAgICAgICAgLy8g44OS44OI6L+95Yqg44Oi44O844OJ44KS5oqc44GR44KLXHJcbiAgICAgICAgICAgIGV4aXRBZGRIdW1hbk1vZGUoKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnc2VsZWN0SHVtYW4nOlxyXG4gICAgICAgICAgICBjb25zdCBodW1hbnMgPSBnZXRIdW1hbnNGcm9tUG9zKHsgeCwgeSB9KTtcclxuICAgICAgICAgICAgLy8g5oyH5a6a44Gu5aC05omA44Gr5Lq644GM44GE44Gq44GR44KM44Gw5L2V44KC44GX44Gq44GEXHJcbiAgICAgICAgICAgIGlmIChodW1hbnMubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyDmjIflrprjga7loLTmiYDjga7kurrjga7pgbjmip7nirbmhYvjgpLlj43ou6LjgZXjgZvjgotcclxuICAgICAgICAgICAgLy8g77yI6KSH5pWw5Lq644Gu5aC05ZCI44Gv44Oq44K544OI44Gu5YWI6aCt77yJXHJcbiAgICAgICAgICAgIGh1bWFuc1swXS5pc1NlbGVjdGVkID0gIWh1bWFuc1swXS5pc1NlbGVjdGVkO1xyXG4gICAgICAgICAgICAvLyDnm6TpnaLjgpLmm7TmlrDjgZnjgotcclxuICAgICAgICAgICAgZHJhd0ZpZWxkKCk7XHJcbiAgICAgICAgICAgIC8vIOmBuOaKnuODouODvOODieOCkuaKnOOBkeOCi1xyXG4gICAgICAgICAgICBleGl0U2VsZWN0SHVtYW5Nb2RlKCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogZ2FtZVN0YXRl44Gr5Lq644Go5a6244KS6L+95YqgXHJcbiAqL1xyXG5mdW5jdGlvbiBhZGRIdW1hbihuZXdIdW1hbjogSHVtYW4pIHtcclxuICAgIGNvbnN0IHsgeCwgeSB9ID0gbmV3SHVtYW4ucG9zO1xyXG4gICAgLy8g5Lq644KS6L+95YqgXHJcbiAgICBnYW1lU3RhdGUuaHVtYW5zLnB1c2gobmV3SHVtYW4pO1xyXG4gICAgLy8g5a6244KS6L+95YqgXHJcbiAgICBhZGRBc3NldChuZXcgSG91c2UoeyB4LCB5IH0sIG5ld0h1bWFuKSwgdHJ1ZSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBnYW1lU3RhdGXjgavjgqLjgrvjg4Pjg4jjgpLov73liqDjgIJpc09ic3RhY2xl44GM55yf44Gq44KJ6Zqc5a6z54mp44Go44GX44GmY29zdOODnuODg+ODl+OBq+eZu+mMsuOBmeOCi1xyXG4gKiBAcGFyYW0gbmV3QXNzZXQg6L+95Yqg44GZ44KL44Ki44K744OD44OIXHJcbiAqIEBwYXJhbSBpc09ic3RhY2xlIOmanOWus+eJqeOBp+OBguOCi+OBi+WQpuOBi1xyXG4gKi9cclxuZnVuY3Rpb24gYWRkQXNzZXQobmV3QXNzZXQ6IEFzc2V0LCBpc09ic3RhY2xlOiBib29sZWFuKSB7XHJcbiAgICBnYW1lU3RhdGUuYXNzZXRzLnB1c2gobmV3QXNzZXQpO1xyXG4gICAgaWYgKGlzT2JzdGFjbGUpIGFkZE9ic3RhY2xlVG9Db3N0TWFwKG5ld0Fzc2V0LnBvcyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBhZGRIdW1hbuODnOOCv+ODs+OCkuOCr+ODquODg+OCr+OBl+OBn+mam+OBruWHpueQhuOCkuihjOOBhlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZUFkZEh1bWFuQ2xpY2soKTogdm9pZCB7XHJcbiAgICBjb25zdCByYWRpb0lucHV0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlOYW1lKFwidHlwZUZvcm1cIikgYXMgTm9kZUxpc3RPZjxIVE1MSW5wdXRFbGVtZW50PjtcclxuICAgIGxldCBqb2I6IEpvYiB8IG51bGwgPSBudWxsO1xyXG4gICAgcmFkaW9JbnB1dHMuZm9yRWFjaCgocmFkaW86IEhUTUxJbnB1dEVsZW1lbnQpID0+IHtcclxuICAgICAgICBpZiAocmFkaW8uY2hlY2tlZCkge1xyXG4gICAgICAgICAgICBqb2IgPSByYWRpby52YWx1ZSBhcyBKb2I7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKCFqb2IpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJqb2IgaXMgbm90IHNlbGVjdGVkLiBDYW4ndCBlbnRlciBhZGQtaHVtYW4gbW9kZS5cIik7XHJcbiAgICB9XHJcblxyXG4gICAgZW50ZXJBZGRIdW1hbk1vZGUoam9iKTtcclxufSIsImltcG9ydCB7IEpvYiB9IGZyb20gXCIuLi9jbGFzcy9IdW1hbi9IdW1hblwiO1xyXG5pbXBvcnQgeyBGSUVMRF9TSVpFLCBnYW1lU3RhdGUgfSBmcm9tIFwiLi4vZ2FtZVwiO1xyXG5cclxuZXhwb3J0IHR5cGUgSW50ZXJmYWNlTW9kZSA9IHtcclxuICAgIGlkOiAnbmV1dHJhbCc7XHJcbiAgfSB8IHtcclxuICAgIGlkOiAnYWRkSHVtYW4nO1xyXG4gICAgam9iOiBKb2I7XHJcbiAgfSB8IHtcclxuICAgIGlkOiAnc2VsZWN0SHVtYW4nO1xyXG4gIH07XHJcbiAgXHJcbi8qKlxyXG4gKiDkvY3nva7jga7pgbjmip7jg6Ljg7zjg4njgavpgbfnp7vjgZfjgIFTcXVhcmXkuIrjgafjg5vjg5Djg7zjgZnjgovjgajoibLjgYzlpInjgo/jgovjgojjgYbjgavjgarjgotcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBlbnRlckFkZEh1bWFuTW9kZShqb2I6IEpvYik6IHZvaWQge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBGSUVMRF9TSVpFOyBpKyspIHtcclxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IEZJRUxEX1NJWkU7IGorKykge1xyXG4gICAgICAgICAgICBjb25zdCBzcXVhcmVFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3F1YXJlLVwiICsgKEZJRUxEX1NJWkUgKiBpICsgaikpO1xyXG4gICAgICAgICAgICBpZiAoIXNxdWFyZUVsKVxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBzcXVhcmUtJHtGSUVMRF9TSVpFICogaSArIGp9IHdhcyBub3QgZm91bmQuYCk7XHJcbiAgICAgICAgICAgIC8vIOODm+ODkOODvOaZguOBq+iJsuOBjOWkieOCj+OCi+OCiOOBhuOBq+OCr+ODqeOCueOCkui/veWKoFxyXG4gICAgICAgICAgICBzcXVhcmVFbC5jbGFzc0xpc3QuYWRkKCdodW1hbi1hZGQtbW9kZScpXHJcbiAgICAgICAgICAgIC8vIOmBuOaKnuODouODvOODieOBq+mBt+enu+OBmeOCi1xyXG4gICAgICAgICAgICBnYW1lU3RhdGUubW9kZSA9IHsgaWQ6ICdhZGRIdW1hbicsIGpvYiB9O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIOODi+ODpeODvOODiOODqeODq+ODouODvOODieOBq+mBt+enu+OBl+OAgVNxdWFyZeS4iuOBp+ODm+ODkOODvOOBl+OBpuOCguiJsuOBjOWkieOCj+OCieOBquOBhOOCiOOBhuOBq+OBmeOCi1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGV4aXRBZGRIdW1hbk1vZGUoKTogdm9pZCB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IEZJRUxEX1NJWkU7IGkrKykge1xyXG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgRklFTERfU0laRTsgaisrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNxdWFyZUVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzcXVhcmUtXCIgKyAoRklFTERfU0laRSAqIGkgKyBqKSk7XHJcbiAgICAgICAgICAgIGlmICghc3F1YXJlRWwpXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYHNxdWFyZS0ke0ZJRUxEX1NJWkUgKiBpICsgan0gd2FzIG5vdCBmb3VuZC5gKTtcclxuICAgICAgICAgICAgLyog44Ob44OQ44O85pmC44Gr6Imy44GM5aSJ44KP44KL44Kv44Op44K544KS6Zmk5Y67ICovXHJcbiAgICAgICAgICAgIHNxdWFyZUVsLmNsYXNzTGlzdC5yZW1vdmUoJ2h1bWFuLWFkZC1tb2RlJylcclxuICAgICAgICAgICAgLyog44OL44Ol44O844OI44Op44Or44Oi44O844OJ44Gr6YG356e744GZ44KLICovXHJcbiAgICAgICAgICAgIGdhbWVTdGF0ZS5tb2RlID0geyBpZDogJ25ldXRyYWwnIH07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICog5ZC544GN5Ye644GX44KS6KGo56S644GZ44KL5Lq644KS6YG45oqe44GZ44KL44Oi44O844OJ44Gr6YG356e744GZ44KLXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZW50ZXJTZWxlY3RIdW1hbk1vZGUoKTogdm9pZCB7XHJcbiAgICBnYW1lU3RhdGUubW9kZSA9IHsgaWQ6ICdzZWxlY3RIdW1hbicgfTtcclxufVxyXG5cclxuLyoqXHJcbiAqIOODi+ODpeODvOODiOODqeODq+ODouODvOODieOBq+mBt+enu+OBmeOCi1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGV4aXRTZWxlY3RIdW1hbk1vZGUoKTogdm9pZCB7XHJcbiAgICBnYW1lU3RhdGUubW9kZSA9IHsgaWQ6ICduZXV0cmFsJyB9O1xyXG59IiwiaW1wb3J0IHsgUG9zaXRpb24sIGdhbWVTdGF0ZSB9IGZyb20gXCIuLi9nYW1lXCI7XHJcbmltcG9ydCB7IEh1bWFuIH0gZnJvbSBcIi4uL2NsYXNzL0h1bWFuL0h1bWFuXCI7XHJcbmltcG9ydCB7IEZJRUxEX1NJWkUgfSBmcm9tIFwiLi4vZ2FtZVwiO1xyXG5pbXBvcnQgeyBBc3NldCB9IGZyb20gXCIuLi9jbGFzcy9Bc3NldC9Bc3NldFwiO1xyXG5cclxuLyoqXHJcbiAqIOOBguOCi+W6p+aomeOBq+OBhOOCi+S6uuOBruaknOe0ouOBl+OAgemFjeWIl+OBq+OBl+OBpui/lOOBmVxyXG4gKiBAcGFyYW0gcG9zIOW6p+aomVxyXG4gKiBAcmV0dXJucyDjgZ3jga7luqfmqJnjgavjgYTjgovkurrjga7phY3liJdcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRIdW1hbnNGcm9tUG9zKHBvczogUG9zaXRpb24pOiBIdW1hbltdIHtcclxuICAgIGNvbnN0IHJldEh1bWFuczogSHVtYW5bXSA9IFtdO1xyXG4gICAgZ2FtZVN0YXRlLmh1bWFucy5mb3JFYWNoKChodW1hbikgPT4ge1xyXG4gICAgICAgIGlmIChodW1hbi5wb3MueCA9PSBwb3MueCAmJiBodW1hbi5wb3MueSA9PSBwb3MueSkge1xyXG4gICAgICAgICAgICByZXRIdW1hbnMucHVzaChodW1hbik7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gcmV0SHVtYW5zO1xyXG59XHJcblxyXG4vKipcclxuICog44GC44KL5bqn5qiZ44Gr44GC44KL44Ki44K744OD44OI44KS5qSc57Si44GX44CB44GC44KM44Gw44Gd44Gu44Ki44K744OD44OI44KS6L+U44GZ44CC44Gq44GR44KM44GwdW5kZWZpbmVk44KS6L+U44GZXHJcbiAqIEBwYXJhbSBwb3Mg5bqn5qiZXHJcbiAqIEByZXR1cm5zIOOBneOBruW6p+aomeOBq+OCouOCu+ODg+ODiOOBjOOBguOCi+WgtOWQiOOBr+OBneOBruOCouOCu+ODg+ODiOOAguOBquOBkeOCjOOBsHVuZGVmaW5lZFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEFzc2V0RnJvbVBvcyhwb3M6IFBvc2l0aW9uKTogQXNzZXQgfCB1bmRlZmluZWQge1xyXG4gICAgcmV0dXJuIGdhbWVTdGF0ZS5hc3NldHMuZmluZCgoYXNzZXQpID0+IHtcclxuICAgICAgICByZXR1cm4gYXNzZXQucG9zLnggPT09IHBvcy54ICYmIGFzc2V0LnBvcy55ID09PSBwb3MueTtcclxuICAgIH0pO1xyXG59XHJcblxyXG4vKipcclxuICogZ2FtZVN0YXRlLnRpbWXjgavlvpPjgaPjgablpJzjgYvlkKbjgYvjgpLov5TjgZlcclxuICogQHJldHVybnMg5aSc44Gn44GC44KL44GL5ZCm44GLXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaXNOaWdodCgpOiBib29sZWFuIHtcclxuICAgIGlmIChnYW1lU3RhdGUudGltZS5oID49IDE4IHx8IGdhbWVTdGF0ZS50aW1lLmggPD0gNikge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDjg6njg7Pjg4Djg6DjgarkvY3nva7jgpLnlJ/miJDjgZfjgIHov5TjgZlcclxuICogQHJldHVybnMgW3gsIHldXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0UmFuZG9tUG9zKCk6IFBvc2l0aW9uIHtcclxuICAgIGNvbnN0IHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBGSUVMRF9TSVpFKTtcclxuICAgIGNvbnN0IHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBGSUVMRF9TSVpFKTtcclxuICAgIHJldHVybiB7IHgsIHkgfTtcclxufSIsImltcG9ydCB7IEludGVyZmFjZU1vZGUgfSBmcm9tIFwiLi9mdW5jdGlvbi9oYW5kbGVNb2RlXCI7XHJcbmltcG9ydCB7IEh1bWFuIH0gZnJvbSBcIi4vY2xhc3MvSHVtYW4vSHVtYW5cIjtcclxuaW1wb3J0IHsgQXNzZXQgfSBmcm9tIFwiLi9jbGFzcy9Bc3NldC9Bc3NldFwiO1xyXG5cclxuLyog55uk6Z2i44Gu44K144Kk44K6ICovXHJcbmV4cG9ydCBjb25zdCBGSUVMRF9TSVpFID0gODtcclxuXHJcbmV4cG9ydCBsZXQgZ2FtZVN0YXRlOiBHYW1lU3RhdGUgPSB7XHJcbiAgICB0aW1lOiB7IGQ6IDAsIGg6IDEyLCBtOiAwIH0sXHJcbiAgICBtb2RlOiB7IGlkOiBcIm5ldXRyYWxcIiB9LFxyXG4gICAgaHVtYW5zOiBbXSxcclxuICAgIGFzc2V0czogW10sXHJcbn1cclxuXHJcbi8vID09PT09PT09PT09PT09PT09IHR5cGUgPT09PT09PT09PT09PT09PVxyXG5cclxuZXhwb3J0IHR5cGUgR2FtZVN0YXRlID0ge1xyXG4gICAgdGltZTogVGltZTtcclxuICAgIG1vZGU6IEludGVyZmFjZU1vZGU7XHJcbiAgICBodW1hbnM6IEh1bWFuW107XHJcbiAgICBhc3NldHM6IEFzc2V0W107XHJcbn1cclxuXHJcbnR5cGUgVGltZSA9IHtcclxuICAgIGQ6IG51bWJlcjtcclxuICAgIGg6IG51bWJlcjtcclxuICAgIG06IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBIVE1MRXZlbnQ8VCBleHRlbmRzIEV2ZW50VGFyZ2V0PiBleHRlbmRzIEV2ZW50IHtcclxuICAgIHRhcmdldDogVDtcclxufVxyXG5cclxuZXhwb3J0IHR5cGUgUG9zaXRpb24gPSB7XHJcbiAgICB4OiBudW1iZXIsXHJcbiAgICB5OiBudW1iZXIsXHJcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGRyYXdGaWVsZCwgZHJhd1RpbWUgfSBmcm9tIFwiLi9mdW5jdGlvbi9kcmF3XCI7XHJcbmltcG9ydCB7IGhhbmRsZUFkZEh1bWFuQ2xpY2ssIGhhbmRsZUNsaWNrU3F1YXJlIH0gZnJvbSBcIi4vZnVuY3Rpb24vaGFuZGxlQWN0aW9uXCI7XHJcbmltcG9ydCB7IGVudGVyU2VsZWN0SHVtYW5Nb2RlIH0gZnJvbSBcIi4vZnVuY3Rpb24vaGFuZGxlTW9kZVwiO1xyXG5pbXBvcnQgeyBGSUVMRF9TSVpFLCBnYW1lU3RhdGUgfSBmcm9tIFwiLi9nYW1lXCI7XHJcblxyXG5jb25zdCBERUZBVUxUX0lOVEVSVkFMX01TRUMgPSAxMDAwO1xyXG5sZXQgaW50ZXJ2YWxJZDogbnVtYmVyO1xyXG5sZXQgaXNMb29waW5nOiBib29sZWFuO1xyXG5sZXQgaW50ZXJ2YWxNc2VjID0gMTAwMDtcclxuXHJcbi8vIOODmuODvOOCuOOBjOiqreOBv+i+vOOBvuOCjOOBn+OBqOOBjeOBruWHpueQhlxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoZSkgPT4ge1xyXG4gICAgLy8gMeenkuOBlOOBqOOBq2ludGVydmFsRnVuY+OCkuWun+ihjOOBmeOCi+OCiOOBhuOBq+ioreWumlxyXG4gICAgaW50ZXJ2YWxJZCA9IHNldEludGVydmFsKGludGVydmFsRnVuYywgREVGQVVMVF9JTlRFUlZBTF9NU0VDKTtcclxuICAgIGlzTG9vcGluZyA9IHRydWU7XHJcblxyXG4gICAgLy8g44Kk44OZ44Oz44OI44OP44Oz44OJ44Op44O844KS55m76YyyXHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlbGVjdEh1bWFuQnV0dG9uXCIpPy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZW50ZXJTZWxlY3RIdW1hbk1vZGUpO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzd2l0Y2hJbnRlcnZhbEJ1dHRvblwiKT8uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHN3aXRjaEludGVydmFsKTtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWRkSHVtYW5CdXR0b25cIik/LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVBZGRIdW1hbkNsaWNrKTtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZG91YmxlU3BlZWRCdXR0b25cIik/LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBkb3VibGVJbnRlcnZhbFNwZWVkKTtcclxuXHJcbiAgICAvLyDmj4/nlLtcclxuICAgIGNyZWF0ZUZpZWxkKCk7XHJcbiAgICBkcmF3RmllbGQoKTtcclxuICAgIGRyYXdUaW1lKCk7XHJcbn0pO1xyXG5cclxuLyoqXHJcbiAqIDHljZjkvY3mmYLplpPjgZTjgajjgavlkbzjgbDjgozjgovplqLmlbBcclxuICovXHJcbmZ1bmN0aW9uIGludGVydmFsRnVuYygpOiB2b2lkIHtcclxuICAgIC8vIDHljZjkvY3mmYLplpPjgZTjgajjgavnm6TpnaLjgpLmm7TmlrDjgZnjgotcclxuICAgIGdhbWVTdGF0ZS5odW1hbnMuZm9yRWFjaCgoaHVtYW4pID0+IGh1bWFuLnNwZW5kVGltZSgpKTtcclxuICAgIC8vIOaZgumWk+OCkjEw5YiG6YCy44KB44KLXHJcbiAgICBnYW1lU3RhdGUudGltZS5tICs9IDEwO1xyXG4gICAgaWYgKGdhbWVTdGF0ZS50aW1lLm0gPj0gNjApIHtcclxuICAgICAgICBnYW1lU3RhdGUudGltZS5tICU9IDYwO1xyXG4gICAgICAgIGdhbWVTdGF0ZS50aW1lLmggKz0gMTtcclxuICAgICAgICBpZiAoZ2FtZVN0YXRlLnRpbWUuaCA+PSAyNCkge1xyXG4gICAgICAgICAgICBnYW1lU3RhdGUudGltZS5oICU9IDI0O1xyXG4gICAgICAgICAgICBnYW1lU3RhdGUudGltZS5kICs9IDE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8g55uk6Z2i44Gq44Gp44KS5pu05pawXHJcbiAgICBkcmF3RmllbGQoKTtcclxuICAgIGRyYXdUaW1lKCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDjgqTjg7Pjgr/jg7zjg5Djg6vjga7jgqrjg7Mv44Kq44OV44KS5YiH44KK5pu/44GI44KLXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc3dpdGNoSW50ZXJ2YWwoKTogdm9pZCB7XHJcbiAgICBpZiAoaXNMb29waW5nKSB7XHJcbiAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbElkKTtcclxuICAgICAgICBpc0xvb3BpbmcgPSBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaW50ZXJ2YWxJZCA9IHNldEludGVydmFsKGludGVydmFsRnVuYywgaW50ZXJ2YWxNc2VjKTtcclxuICAgICAgICBpc0xvb3BpbmcgPSB0cnVlO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICog5pyA5aSnNOWAjeOBvuOBp+OCpOODs+OCv+ODvOODkOODq+OBruaZgumWk+OCkumAn+OBj+OBmeOCi1xyXG4gKiDnj77lnKg05YCN6YCf44Gn44GC44KM44Gw44CB44OH44OV44Kp44Or44OI5YCk44Gr5oi744GZXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZG91YmxlSW50ZXJ2YWxTcGVlZCgpOiB2b2lkIHtcclxuICAgIGlmIChpbnRlcnZhbE1zZWMgPT0gREVGQVVMVF9JTlRFUlZBTF9NU0VDIC8gNCkge1xyXG4gICAgICAgIGludGVydmFsTXNlYyA9IERFRkFVTFRfSU5URVJWQUxfTVNFQztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaW50ZXJ2YWxNc2VjIC89IDI7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGlzTG9vcGluZykge1xyXG4gICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxJZCk7XHJcbiAgICAgICAgaW50ZXJ2YWxJZCA9IHNldEludGVydmFsKGludGVydmFsRnVuYywgaW50ZXJ2YWxNc2VjKTtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEZJRUxEX1NJWkUgKiBGSUVMRF9TSVpFIOOBruebpOmdouOCkuS9nOaIkOOBmeOCi1xyXG4gKi9cclxuZnVuY3Rpb24gY3JlYXRlRmllbGQoKTogdm9pZCB7XHJcbiAgICBjb25zdCBmaWVsZEVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmaWVsZFwiKTtcclxuICAgIGlmICghZmllbGRFbCkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignPGRpdiBpZD1cImZpZWxkXCI+PC9kaXY+IGlzIG51bGwuJyk7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBGSUVMRF9TSVpFOyBpKyspIHtcclxuICAgICAgICAvLyDooYzjga7opoHntKDjgpLkvZzmiJBcclxuICAgICAgICBjb25zdCBsaW5lRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgIGxpbmVFbC5jbGFzc05hbWUgPSBcImJvYXJkLXJvd1wiO1xyXG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgRklFTERfU0laRTsgaisrKSB7XHJcbiAgICAgICAgICAgIC8vIOWQhOihjOOBruWIl+OBruimgee0oOOCkuS9nOaIkFxyXG4gICAgICAgICAgICBjb25zdCBzcXVhcmVFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgICAgICAgICAgIHNxdWFyZUVsLmNsYXNzTmFtZSA9IFwic3F1YXJlXCI7XHJcbiAgICAgICAgICAgIHNxdWFyZUVsLmlkID0gXCJzcXVhcmUtXCIgKyAoRklFTERfU0laRSAqIGkgKyBqKTtcclxuICAgICAgICAgICAgc3F1YXJlRWwub25jbGljayA9ICgpID0+IGhhbmRsZUNsaWNrU3F1YXJlKGosIGkpO1xyXG4gICAgICAgICAgICAvLyDooYzjga7lrZDopoHntKDjgavjgZnjgotcclxuICAgICAgICAgICAgbGluZUVsLmFwcGVuZENoaWxkKHNxdWFyZUVsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g6KGM44Gu6KaB57Sg44KS5a2Q6KaB57Sg44Gr44GZ44KLXHJcbiAgICAgICAgZmllbGRFbC5hcHBlbmRDaGlsZChsaW5lRWwpO1xyXG4gICAgfVxyXG59XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==