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
            const dest = (0,_function_utils__WEBPACK_IMPORTED_MODULE_4__.getRandomPos)();
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
/* harmony export */   Human: () => (/* binding */ Human)
/* harmony export */ });
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../game */ "./src/game.ts");
/* harmony import */ var _Task_Sleeping__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Task/Sleeping */ "./src/class/Task/Sleeping.ts");
/* harmony import */ var _Task_Walking__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Task/Walking */ "./src/class/Task/Walking.ts");




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
        this._hp = hp;
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
// TODO : Assetをよけるために、Assetの位置をcostに反映させる
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
            const dest = (0,_function_utils__WEBPACK_IMPORTED_MODULE_4__.getRandomPos)();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RyxDQUFDLENBQUMsQ0FBQyw2Q0FBVSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMzRCxDQUFDO2FBQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSw2Q0FBVSxHQUFHLENBQUMsRUFBRSxDQUFDO1lBQ3ZDLE9BQU87WUFDUCxJQUFJLENBQUMsNkNBQVUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsNkNBQVUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDdkQsSUFBSSxDQUFDLDZDQUFVLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLDZDQUFVLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzNELENBQUM7YUFBTSxJQUFJLENBQUMsSUFBSSw2Q0FBVSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDdkMsT0FBTztZQUNQLElBQUksQ0FBQyw2Q0FBVSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyw2Q0FBVSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN2RCxJQUFJLENBQUMsNkNBQVUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsNkNBQVUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDM0QsQ0FBQzthQUFNLElBQUksQ0FBQyxJQUFJLDZDQUFVLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSw2Q0FBVSxHQUFHLENBQUMsRUFBRSxDQUFDO1lBQ3BELE9BQU87WUFDUCxJQUFJLENBQUMsNkNBQVUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsNkNBQVUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDdkQsSUFBSSxDQUFDLDZDQUFVLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLDZDQUFVLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzNELENBQUM7YUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUNoQixLQUFLO1lBQ0wsSUFBSSxDQUFDLDZDQUFVLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLDZDQUFVLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSTtZQUM1RCxJQUFJLENBQUMsNkNBQVUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsNkNBQVUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJO1lBQzVELElBQUksQ0FBQyw2Q0FBVSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyw2Q0FBVSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUk7UUFDaEUsQ0FBQzthQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO1lBQ2hCLEtBQUs7WUFDTCxJQUFJLENBQUMsNkNBQVUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsNkNBQVUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJO1lBQzVELElBQUksQ0FBQyw2Q0FBVSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyw2Q0FBVSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUk7WUFDNUQsSUFBSSxDQUFDLDZDQUFVLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLDZDQUFVLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSTtRQUNoRSxDQUFDO2FBQU0sSUFBSSxDQUFDLElBQUksNkNBQVUsR0FBRyxDQUFDLEVBQUUsQ0FBQztZQUM3QixLQUFLO1lBQ0wsSUFBSSxDQUFDLDZDQUFVLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLDZDQUFVLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSTtZQUM1RCxJQUFJLENBQUMsNkNBQVUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsNkNBQVUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJO1lBQzVELElBQUksQ0FBQyw2Q0FBVSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyw2Q0FBVSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUk7UUFDaEUsQ0FBQzthQUFNLElBQUksQ0FBQyxJQUFJLDZDQUFVLEdBQUcsQ0FBQyxFQUFFLENBQUM7WUFDN0IsS0FBSztZQUNMLElBQUksQ0FBQyw2Q0FBVSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyw2Q0FBVSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUk7WUFDNUQsSUFBSSxDQUFDLDZDQUFVLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLDZDQUFVLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FB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QUFFLENBQUMseUVBQWlCLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2pELFdBQVc7WUFDWCxNQUFNLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2pDLENBQUM7UUFDRCxjQUFjO1FBQ2QsT0FBTyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNoQyxDQUFDO0FBQ0wsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL21hdHJpeC1nYW1lLy4vc3JjL2NsYXNzL0Fzc2V0L0Fzc2V0LnRzIiwid2VicGFjazovL21hdHJpeC1nYW1lLy4vc3JjL2NsYXNzL0Fzc2V0L0hvdXNlLnRzIiwid2VicGFjazovL21hdHJpeC1nYW1lLy4vc3JjL2NsYXNzL0h1bWFuL0Zhcm1lci50cyIsIndlYnBhY2s6Ly9tYXRyaXgtZ2FtZS8uL3NyYy9jbGFzcy9IdW1hbi9IdW1hbi50cyIsIndlYnBhY2s6Ly9tYXRyaXgtZ2FtZS8uL3NyYy9jbGFzcy9IdW1hbi9NZXJjaGFudC50cyIsIndlYnBhY2s6Ly9tYXRyaXgtZ2FtZS8uL3NyYy9jbGFzcy9UYXNrL1NsZWVwaW5nLnRzIiwid2VicGFjazovL21hdHJpeC1nYW1lLy4vc3JjL2NsYXNzL1Rhc2svVGFzay50cyIsIndlYnBhY2s6Ly9tYXRyaXgtZ2FtZS8uL3NyYy9jbGFzcy9UYXNrL1dhbGtpbmcudHMiLCJ3ZWJwYWNrOi8vbWF0cml4LWdhbWUvLi9zcmMvZnVuY3Rpb24vZHJhdy50cyIsIndlYnBhY2s6Ly9tYXRyaXgtZ2FtZS8uL3NyYy9mdW5jdGlvbi9oYW5kbGVBY3Rpb24udHMiLCJ3ZWJwYWNrOi8vbWF0cml4LWdhbWUvLi9zcmMvZnVuY3Rpb24vaGFuZGxlTW9kZS50cyIsIndlYnBhY2s6Ly9tYXRyaXgtZ2FtZS8uL3NyYy9mdW5jdGlvbi91dGlscy50cyIsIndlYnBhY2s6Ly9tYXRyaXgtZ2FtZS8uL3NyYy9nYW1lLnRzIiwid2VicGFjazovL21hdHJpeC1nYW1lL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL21hdHJpeC1nYW1lL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9tYXRyaXgtZ2FtZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL21hdHJpeC1nYW1lL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbWF0cml4LWdhbWUvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUG9zaXRpb24sIEZJRUxEX1NJWkUgfSBmcm9tIFwiLi4vLi4vZ2FtZVwiO1xuaW1wb3J0IHsgSHVtYW4gfSBmcm9tIFwiLi4vSHVtYW4vSHVtYW5cIjtcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFzc2V0IHtcbiAgICBwb3M6IFBvc2l0aW9uO1xuICAgIG93bmVyOiBIdW1hbjtcblxuICAgIGlzVGhlcmVPd25lcigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zLnggPT09IHRoaXMub3duZXIucG9zLnggJiYgdGhpcy5wb3MueSA9PT0gdGhpcy5vd25lci5wb3MueTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3Rvcihwb3M6IFBvc2l0aW9uLCBvd25lcjogSHVtYW4pIHtcbiAgICAgICAgaWYgKHBvcy54IDwgMCB8fCBwb3MueCA+PSBGSUVMRF9TSVpFIHx8IHBvcy55IDwgMCB8fCBwb3MueSA+PSBGSUVMRF9TSVpFKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYHBvcy54LCBwb3gueSBtdXN0IGJlIGluIDAgPD0gYSA8IEZJRUxEX1NJWkVgKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBvcyA9IHBvcztcbiAgICAgICAgdGhpcy5vd25lciA9IG93bmVyO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBBc3NldCB9IGZyb20gXCIuL0Fzc2V0XCI7XG5pbXBvcnQgeyBQb3NpdGlvbiB9IGZyb20gXCIuLi8uLi9nYW1lXCI7XG5pbXBvcnQgeyBIdW1hbiB9IGZyb20gXCIuLi9IdW1hbi9IdW1hblwiO1xuXG5leHBvcnQgY2xhc3MgSG91c2UgZXh0ZW5kcyBBc3NldCB7XG4gICAgY2xhc3NOYW1lOiBcIm5vcm1hbC1ob3VzZVwiIHwgXCJldmVuaW5nLWhvdXNlXCIgfCBcIm5pZ2h0LWhvdXNlXCIgfCBcInNsZWVwaW5nLWhvdXNlXCI7XG5cbiAgICBjb25zdHJ1Y3Rvcihwb3M6IFBvc2l0aW9uLCBvd25lcjogSHVtYW4pIHtcbiAgICAgICAgc3VwZXIocG9zLCBvd25lcik7XG4gICAgICAgIHRoaXMuY2xhc3NOYW1lID0gXCJub3JtYWwtaG91c2VcIjtcbiAgICB9XG59IiwiaW1wb3J0IHsgSHVtYW4sIENoYXJhY3RlciB9IGZyb20gXCIuL0h1bWFuXCI7XG5pbXBvcnQgeyBnYW1lU3RhdGUsIFBvc2l0aW9uIH0gZnJvbSBcIi4uLy4uL2dhbWVcIjtcbmltcG9ydCB7IFNsZWVwaW5nIH0gZnJvbSBcIi4uL1Rhc2svU2xlZXBpbmdcIjtcbmltcG9ydCB7IFdhbGtpbmcgfSBmcm9tIFwiLi4vVGFzay9XYWxraW5nXCI7XG5pbXBvcnQgeyBnZXRSYW5kb21Qb3MgfSBmcm9tIFwiLi4vLi4vZnVuY3Rpb24vdXRpbHNcIjtcblxuZXhwb3J0IGNsYXNzIEZhcm1lciBleHRlbmRzIEh1bWFuIHtcbiAgICAvKipcbiAgICAgKiDjg6njg7Pjg4Djg6Djgavjgr/jgrnjgq/jgpLmsbrjgoHjgotcbiAgICAgKi9cbiAgICBkZXRlcm1pbmVUYXNrKCk6IHZvaWQge1xuICAgICAgICAvLyBUT0RPIOOCv+OCueOCr+OBruaVsOOCkuWil+OChOOBmVxuICAgICAgICAvLyBUT0RPIOOCv+OCueOCr+OCkuePvuWcqOOBruODkeODqeODoeODvOOCv+OBq+W+k+OBo+OBpuaxuuOCgeOCi+OCiOOBhuOBq+WkieabtFxuICAgICAgICBpZiAoMTYgPCBnYW1lU3RhdGUudGltZS5oKSB7XG4gICAgICAgICAgICAvLyDlr53jgotcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi55yg44KK44G+44GZXCIpO1xuICAgICAgICAgICAgdGhpcy50YXNrID0gbmV3IFNsZWVwaW5nKHRoaXMuaG9tZVBvcyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyDmlaPmranjgZnjgotcbiAgICAgICAgICAgIGNvbnN0IGRlc3Q6IFBvc2l0aW9uID0gZ2V0UmFuZG9tUG9zKCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgKCR7ZGVzdC54fSwgJHtkZXN0Lnl9KeOBuOWQkeOBi+OBhOOBvuOBmWApO1xuICAgICAgICAgICAgdGhpcy50YXNrID0gbmV3IFdhbGtpbmcoZGVzdCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgbmFtZTogc3RyaW5nID0gYEh1bWFuJHtIdW1hbi5odW1hbk51bX1gLFxuICAgICAgICBob21lUG9zOiBQb3NpdGlvbiA9IHsgeDogMCwgeTogMCB9LFxuICAgICAgICBocDogbnVtYmVyID0gMTAwLFxuICAgICAgICBjb2xvcjogc3RyaW5nID0gXCIjRkYwMDAwXCIsXG4gICAgICAgIGNoYXJhY3RlcjogQ2hhcmFjdGVyID0geyB3aXNkb206IDAuNSB9LFxuICAgICAgICBpc1NlbGVjdGVkOiBib29sZWFuID0gZmFsc2UsXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKG5hbWUsIGhvbWVQb3MsIGhwLCBcImZhcm1lclwiLCBjb2xvciwgY2hhcmFjdGVyLCBpc1NlbGVjdGVkKTtcbiAgICB9XG59IiwiaW1wb3J0IHsgUG9zaXRpb24sIGdhbWVTdGF0ZSB9IGZyb20gXCIuLi8uLi9nYW1lXCI7XG5pbXBvcnQgeyBUYXNrIH0gZnJvbSBcIi4uL1Rhc2svVGFza1wiO1xuaW1wb3J0IHsgRklFTERfU0laRSB9IGZyb20gXCIuLi8uLi9nYW1lXCI7XG5pbXBvcnQgeyBTbGVlcGluZyB9IGZyb20gXCIuLi9UYXNrL1NsZWVwaW5nXCI7XG5pbXBvcnQgeyBXYWxraW5nIH0gZnJvbSBcIi4uL1Rhc2svV2Fsa2luZ1wiO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgSHVtYW4ge1xuICAgIHN0YXRpYyBodW1hbk51bSA9IDE7XG4gICAgcHJpdmF0ZSB0aW1lQ291bnRlciA9IDA7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIHByaXZhdGUgX3BvczogUG9zaXRpb247XG4gICAgaG9tZVBvczogUG9zaXRpb247XG4gICAgcHJpdmF0ZSBfaHA6IG51bWJlcjtcbiAgICBqb2I6IEpvYjtcbiAgICBjb2xvcjogc3RyaW5nO1xuICAgIGNoYXJhY3RlcjogQ2hhcmFjdGVyO1xuICAgIGlzU2VsZWN0ZWQ6IGJvb2xlYW47XG4gICAgdGFzazogVGFzayB8IG51bGw7XG5cbiAgICBnZXQgcG9zKCk6IFBvc2l0aW9uIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BvcztcbiAgICB9XG5cbiAgICBzZXQgcG9zKG5ld1BvczogUG9zaXRpb24pIHtcbiAgICAgICAgaWYgKG5ld1Bvcy54IDwgMCB8fCBGSUVMRF9TSVpFIDw9IG5ld1Bvcy54XG4gICAgICAgICAgICB8fCBuZXdQb3MueSA8IDAgfHwgRklFTERfU0laRSA8PSBuZXdQb3MueSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQb3NpdGlvbiBtdXN0IGJlIDAgPD0geCA8IEZJRUxEX1NJWkUnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9wb3MgPSBuZXdQb3M7XG4gICAgfVxuXG4gICAgZ2V0IGhwKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9ocDsgfVxuICAgIFxuICAgIC8qKlxuICAgICAqIGhw44KS5pu05paw44GZ44KL44CCMOS7peS4i+OBq+OBquOBo+OBn+WgtOWQiGdhbWVTdGF0ZS5odW1hbnPjgYvjgonoh6rouqvjgpLliYrpmaRcbiAgICAgKiBAcGFyYW0gZGVsdGFIcCBocOOBruWkieWMlumHj1xuICAgICAqL1xuICAgIGNoYW5nZUhwKGRlbHRhSHA6IG51bWJlcikge1xuICAgICAgICB0aGlzLl9ocCArPSBkZWx0YUhwO1xuICAgICAgICBpZiAodGhpcy5ocCA8PSAwKSB7XG4gICAgICAgICAgICAvLyDmrbvkuqHjgZfjgZ/jga7jgafjgIHkuJbnlYzjgYvjgonoh6rliIbjgpLmtojljrtcbiAgICAgICAgICAgIC8vIFRPRE8gOiDjgoLjgZfmrbvkuqHjgZfjgZ/kurrjgoLnrqHnkIbjgZnjgovjgarjgonjgZPjgZPjgpLnt6jpm4ZcbiAgICAgICAgICAgIGdhbWVTdGF0ZS5odW1hbnMgPSBnYW1lU3RhdGUuaHVtYW5zLmZpbHRlcigoaHVtYW4pID0+IGh1bWFuICE9PSB0aGlzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIDHljZjkvY3mmYLplpPpgY7jgZTjgZlcbiAgICAgKi9cbiAgICBzcGVuZFRpbWUoKTogdm9pZCB7XG4gICAgICAgIC8vIOOCv+OCueOCr+OCkuWujOS6huOBl+OBpuOBhOOCi+WgtOWQiOOAgeasoeOBruOCv+OCueOCr+OCkuaxuuOCgeOCi1xuICAgICAgICBpZiAoIXRoaXMudGFzaykge1xuICAgICAgICAgICAgdGhpcy5kZXRlcm1pbmVUYXNrKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyDjgr/jgrnjgq/jgavlvpPjgaPjgabooYzli5XjgZnjgotcbiAgICAgICAgaWYgKHRoaXMudGFzayBpbnN0YW5jZW9mIFNsZWVwaW5nKSB7XG4gICAgICAgICAgICB0aGlzLnRhc2suaGFuZGxlU2xlZXAodGhpcyk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy50YXNrIGluc3RhbmNlb2YgV2Fsa2luZykge1xuICAgICAgICAgICAgV2Fsa2luZy5oYW5kbGVXYWxraW5nKHRoaXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaHDjgpLmm7TmlrDjgZnjgovvvIjln7rnpI7ku6PorJ3vvIlcbiAgICAgICAgdGhpcy50aW1lQ291bnRlciArPSAxO1xuICAgICAgICB0aGlzLnRpbWVDb3VudGVyICU9IDM7XG4gICAgICAgIGlmICh0aGlzLnRpbWVDb3VudGVyID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZUhwKC0xKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOODqeODs+ODgOODoOOBq+OCv+OCueOCr+OCkuaxuuOCgeOCi1xuICAgICAqL1xuICAgIGFic3RyYWN0IGRldGVybWluZVRhc2soKTogdm9pZDtcblxuICAgIC8qKlxuICAgICAqIOebrueahOWcsOOBq+WQkeOBi+OBo+OBpjHjg57jgrnpgLLjgoBcbiAgICAgKiBAcGFyYW0gZGVzdCDnm67nmoTlnLBcbiAgICAgKi9cbiAgICBoZWFkVG9EZXN0KGRlc3Q6IFBvc2l0aW9uKTogdm9pZCB7XG4gICAgICAgIC8vIOePvuWcqOOBruW6p+aomeOBi+OCieebrueahOWcsOOBruW6p+aomeOBvuOBp+OBruacgOefree1jOi3r+OCkmRpamtzdHJh44Gn5rGC44KB44KLXG4gICAgICAgIGNvbnN0IGQ6IG51bWJlcltdID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogViB9KS5tYXAobiA9PiBJTkYpO1xuICAgICAgICBjb25zdCB1c2VkOiBib29sZWFuW10gPSBBcnJheS5mcm9tKHsgbGVuZ3RoOiBWIH0pLm1hcChuID0+IGZhbHNlKTtcbiAgICAgICAgZFtGSUVMRF9TSVpFICogdGhpcy5wb3MueSArIHRoaXMucG9zLnhdID0gMDtcbiAgICAgICAgLy8g5pyA55+t57WM6Lev44Gu55u05YmN44Gu6aCC54K5XG4gICAgICAgIGNvbnN0IHByZXZQb3M6IFBvc2l0aW9uW10gPSBBcnJheS5mcm9tKHsgbGVuZ3RoOiBWIH0pLm1hcChuID0+ICh7IHg6IC0xLCB5OiAtMSB9KSk7XG5cbiAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICAgIGxldCB2ID0gLTE7XG5cbiAgICAgICAgICAgIGZvciAobGV0IHUgPSAwOyB1IDwgVjsgdSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF1c2VkW3VdICYmICh2ID09PSAtMSB8fCBkW3VdIDwgZFt2XSkpIHYgPSB1O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodiA9PT0gLTEpIGJyZWFrO1xuICAgICAgICAgICAgdXNlZFt2XSA9IHRydWU7XG5cbiAgICAgICAgICAgIGZvciAobGV0IHUgPSAwOyB1IDwgVjsgdSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRbdV0gPiBkW3ZdICsgY29zdFt2XVt1XSkge1xuICAgICAgICAgICAgICAgICAgICBkW3VdID0gTWF0aC5taW4oZFt1XSwgZFt2XSArIGNvc3Rbdl1bdV0pO1xuICAgICAgICAgICAgICAgICAgICBwcmV2UG9zW3VdID0geyB4OiB2ICUgRklFTERfU0laRSwgeTogTWF0aC5mbG9vcih2IC8gRklFTERfU0laRSkgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBkZXN044GL44KJ54++5Zyo5ZywY3VyUG9z44G444Gu5pyA55+t57WM6Lev44KS5rGC44KB44KLXG4gICAgICAgIGNvbnN0IGRlc3RUb0N1clBvc1BhdGg6IFBvc2l0aW9uW10gPSBbXTtcbiAgICAgICAgbGV0IHQ6IFBvc2l0aW9uID0gZGVzdDtcbiAgICAgICAgZm9yICg7ICEodC54ID09PSAtMSAmJiB0LnkgPT09IC0xKTsgdCA9IHByZXZQb3NbRklFTERfU0laRSAqIHQueSArIHQueF0pIHtcbiAgICAgICAgICAgIGRlc3RUb0N1clBvc1BhdGgucHVzaCh0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucG9zID0gZGVzdFRvQ3VyUG9zUGF0aFtkZXN0VG9DdXJQb3NQYXRoLmxlbmd0aCAtIDJdO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBuYW1lOiBzdHJpbmcgPSBgSHVtYW4ke0h1bWFuLmh1bWFuTnVtfWAsXG4gICAgICAgIGhvbWVQb3M6IFBvc2l0aW9uID0geyB4OiAwLCB5OiAwIH0sXG4gICAgICAgIGhwOiBudW1iZXIgPSAxMDAsXG4gICAgICAgIGpvYjogSm9iID0gXCJmYXJtZXJcIixcbiAgICAgICAgY29sb3I6IHN0cmluZyA9IFwiI0ZGMDAwMFwiLFxuICAgICAgICBjaGFyYWN0ZXI6IENoYXJhY3RlciA9IHsgd2lzZG9tOiAwLjUgfSxcbiAgICAgICAgaXNTZWxlY3RlZDogYm9vbGVhbiA9IGZhbHNlLFxuICAgICkge1xuICAgICAgICBpZiAoaG9tZVBvcy54IDwgMCB8fCBGSUVMRF9TSVpFIDw9IGhvbWVQb3MueFxuICAgICAgICAgICAgfHwgaG9tZVBvcy55IDwgMCB8fCBGSUVMRF9TSVpFIDw9IGhvbWVQb3MueSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQb3NpdGlvbiBtdXN0IGJlIDAgPD0geCA8IEZJRUxEX1NJWkUnKTtcbiAgICAgICAgfVxuICAgICAgICBIdW1hbi5odW1hbk51bSsrO1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLmhvbWVQb3MgPSBob21lUG9zO1xuICAgICAgICB0aGlzLl9wb3MgPSBob21lUG9zO1xuICAgICAgICB0aGlzLl9ocCA9IGhwO1xuICAgICAgICB0aGlzLmpvYiA9IGpvYjtcbiAgICAgICAgdGhpcy5jb2xvciA9IGNvbG9yO1xuICAgICAgICB0aGlzLmNoYXJhY3RlciA9IGNoYXJhY3RlcjtcbiAgICAgICAgdGhpcy5pc1NlbGVjdGVkID0gaXNTZWxlY3RlZDtcbiAgICAgICAgdGhpcy50YXNrID0gbnVsbDtcbiAgICB9XG59XG5cbmV4cG9ydCB0eXBlIEpvYiA9ICdmYXJtZXInIHwgJ21lcmNoYW50JztcblxuZXhwb3J0IHR5cGUgQ2hhcmFjdGVyID0ge1xuICAgIHdpc2RvbTogbnVtYmVyO1xufVxuXG4vKipcbiAqIGRpamtzdHJh44Gr5b+F6KaB44Gq5aSJ5pWwXG4gKi9cbmNvbnN0IElORiA9IDEwMDAwMDtcbmNvbnN0IFYgPSBGSUVMRF9TSVpFICogRklFTERfU0laRTtcbi8vIOmao+aOpeihjOWIl1xuLy8gVE9ETyA6IEFzc2V044KS44KI44GR44KL44Gf44KB44Gr44CBQXNzZXTjga7kvY3nva7jgpJjb3N044Gr5Y+N5pig44GV44Gb44KLXG5jb25zdCBjb3N0OiBudW1iZXJbXVtdID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogViB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXAobiA9PiBBcnJheS5mcm9tKHsgbGVuZ3RoOiBWIH0pLm1hcChuID0+IElORikpO1xuZm9yIChsZXQgeSA9IDA7IHkgPCBGSUVMRF9TSVpFOyB5KyspIHtcbiAgICBmb3IgKGxldCB4ID0gMDsgeCA8IEZJRUxEX1NJWkU7IHgrKykge1xuICAgICAgICBpZiAoeSA9PSAwICYmIHggPT0gMCkge1xuICAgICAgICAgICAgLy8g5bem5LiK44Gu6ZqFXG4gICAgICAgICAgICBjb3N0W0ZJRUxEX1NJWkUgKiB5ICsgeF1bRklFTERfU0laRSAqIHkgKyAoeCArIDEpXSA9IDE7XG4gICAgICAgICAgICBjb3N0W0ZJRUxEX1NJWkUgKiB5ICsgeF1bRklFTERfU0laRSAqICh5ICsgMSkgKyB4XSA9IDE7XG4gICAgICAgIH0gZWxzZSBpZiAoeSA9PSAwICYmIHggPT0gRklFTERfU0laRSAtIDEpIHtcbiAgICAgICAgICAgIC8vIOWPs+S4iuOBrumahVxuICAgICAgICAgICAgY29zdFtGSUVMRF9TSVpFICogeSArIHhdW0ZJRUxEX1NJWkUgKiB5ICsgKHggLSAxKV0gPSAxO1xuICAgICAgICAgICAgY29zdFtGSUVMRF9TSVpFICogeSArIHhdW0ZJRUxEX1NJWkUgKiAoeSArIDEpICsgeF0gPSAxO1xuICAgICAgICB9IGVsc2UgaWYgKHkgPT0gRklFTERfU0laRSAtIDEgJiYgeCA9PSAwKSB7XG4gICAgICAgICAgICAvLyDlt6bkuIvjga7pmoVcbiAgICAgICAgICAgIGNvc3RbRklFTERfU0laRSAqIHkgKyB4XVtGSUVMRF9TSVpFICogKHkgLSAxKSArIHhdID0gMTtcbiAgICAgICAgICAgIGNvc3RbRklFTERfU0laRSAqIHkgKyB4XVtGSUVMRF9TSVpFICogeSArICh4ICsgMSldID0gMTtcbiAgICAgICAgfSBlbHNlIGlmICh5ID09IEZJRUxEX1NJWkUgLSAxICYmIHggPT0gRklFTERfU0laRSAtIDEpIHtcbiAgICAgICAgICAgIC8vIOWPs+S4i+OBrumahVxuICAgICAgICAgICAgY29zdFtGSUVMRF9TSVpFICogeSArIHhdW0ZJRUxEX1NJWkUgKiAoeSAtIDEpICsgeF0gPSAxO1xuICAgICAgICAgICAgY29zdFtGSUVMRF9TSVpFICogeSArIHhdW0ZJRUxEX1NJWkUgKiB5ICsgKHggLSAxKV0gPSAxO1xuICAgICAgICB9IGVsc2UgaWYgKHkgPT0gMCkge1xuICAgICAgICAgICAgLy8g5LiK6L66XG4gICAgICAgICAgICBjb3N0W0ZJRUxEX1NJWkUgKiB5ICsgeF1bRklFTERfU0laRSAqIHkgKyAoeCAtIDEpXSA9IDE7IC8vIOKGkFxuICAgICAgICAgICAgY29zdFtGSUVMRF9TSVpFICogeSArIHhdW0ZJRUxEX1NJWkUgKiAoeSArIDEpICsgeF0gPSAxOyAvLyDihpNcbiAgICAgICAgICAgIGNvc3RbRklFTERfU0laRSAqIHkgKyB4XVtGSUVMRF9TSVpFICogeSArICh4ICsgMSldID0gMTsgLy8g4oaSXG4gICAgICAgIH0gZWxzZSBpZiAoeCA9PSAwKSB7XG4gICAgICAgICAgICAvLyDlt6bovrpcbiAgICAgICAgICAgIGNvc3RbRklFTERfU0laRSAqIHkgKyB4XVtGSUVMRF9TSVpFICogKHkgLSAxKSArIHhdID0gMTsgLy8g4oaRXG4gICAgICAgICAgICBjb3N0W0ZJRUxEX1NJWkUgKiB5ICsgeF1bRklFTERfU0laRSAqIHkgKyAoeCArIDEpXSA9IDE7IC8vIOKGklxuICAgICAgICAgICAgY29zdFtGSUVMRF9TSVpFICogeSArIHhdW0ZJRUxEX1NJWkUgKiAoeSArIDEpICsgeF0gPSAxOyAvLyDihpNcbiAgICAgICAgfSBlbHNlIGlmICh4ID09IEZJRUxEX1NJWkUgLSAxKSB7XG4gICAgICAgICAgICAvLyDlj7PovrpcbiAgICAgICAgICAgIGNvc3RbRklFTERfU0laRSAqIHkgKyB4XVtGSUVMRF9TSVpFICogKHkgLSAxKSArIHhdID0gMTsgLy8g4oaRXG4gICAgICAgICAgICBjb3N0W0ZJRUxEX1NJWkUgKiB5ICsgeF1bRklFTERfU0laRSAqIHkgKyAoeCAtIDEpXSA9IDE7IC8vIOKGkFxuICAgICAgICAgICAgY29zdFtGSUVMRF9TSVpFICogeSArIHhdW0ZJRUxEX1NJWkUgKiAoeSArIDEpICsgeF0gPSAxOyAvLyDihpNcbiAgICAgICAgfSBlbHNlIGlmICh5ID09IEZJRUxEX1NJWkUgLSAxKSB7XG4gICAgICAgICAgICAvLyDkuIvovrpcbiAgICAgICAgICAgIGNvc3RbRklFTERfU0laRSAqIHkgKyB4XVtGSUVMRF9TSVpFICogeSArICh4IC0gMSldID0gMTsgLy8g4oaQXG4gICAgICAgICAgICBjb3N0W0ZJRUxEX1NJWkUgKiB5ICsgeF1bRklFTERfU0laRSAqICh5IC0gMSkgKyB4XSA9IDE7IC8vIOKGkVxuICAgICAgICAgICAgY29zdFtGSUVMRF9TSVpFICogeSArIHhdW0ZJRUxEX1NJWkUgKiB5ICsgKHggKyAxKV0gPSAxOyAvLyDihpJcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvc3RbRklFTERfU0laRSAqIHkgKyB4XVtGSUVMRF9TSVpFICogKHkgLSAxKSArIHhdID0gMTsgLy8g4oaRXG4gICAgICAgICAgICBjb3N0W0ZJRUxEX1NJWkUgKiB5ICsgeF1bRklFTERfU0laRSAqIHkgKyAoeCArIDEpXSA9IDE7IC8vIOKGklxuICAgICAgICAgICAgY29zdFtGSUVMRF9TSVpFICogeSArIHhdW0ZJRUxEX1NJWkUgKiAoeSArIDEpICsgeF0gPSAxOyAvLyDihpNcbiAgICAgICAgICAgIGNvc3RbRklFTERfU0laRSAqIHkgKyB4XVtGSUVMRF9TSVpFICogeSArICh4IC0gMSldID0gMTsgLy8g4oaQXG4gICAgICAgIH1cbiAgICB9XG59IiwiaW1wb3J0IHsgSHVtYW4sIENoYXJhY3RlciB9IGZyb20gXCIuL0h1bWFuXCI7XG5pbXBvcnQgeyBnYW1lU3RhdGUsIFBvc2l0aW9uIH0gZnJvbSBcIi4uLy4uL2dhbWVcIjtcbmltcG9ydCB7IFNsZWVwaW5nIH0gZnJvbSBcIi4uL1Rhc2svU2xlZXBpbmdcIjtcbmltcG9ydCB7IFdhbGtpbmcgfSBmcm9tIFwiLi4vVGFzay9XYWxraW5nXCI7XG5pbXBvcnQgeyBnZXRSYW5kb21Qb3MgfSBmcm9tIFwiLi4vLi4vZnVuY3Rpb24vdXRpbHNcIjtcblxuZXhwb3J0IGNsYXNzIE1lcmNoYW50IGV4dGVuZHMgSHVtYW4ge1xuICAgIC8qKlxuICAgICAqIOODqeODs+ODgOODoOOBq+OCv+OCueOCr+OCkuaxuuOCgeOCi1xuICAgICAqL1xuICAgIGRldGVybWluZVRhc2soKTogdm9pZCB7XG4gICAgICAgIC8vIFRPRE8g44K/44K544Kv44Gu5pWw44KS5aKX44KE44GZXG4gICAgICAgIC8vIFRPRE8g44K/44K544Kv44KS54++5Zyo44Gu44OR44Op44Oh44O844K/44Gr5b6T44Gj44Gm5rG644KB44KL44KI44GG44Gr5aSJ5pu0XG4gICAgICAgIGlmICgxNiA8IGdhbWVTdGF0ZS50aW1lLmgpIHtcbiAgICAgICAgICAgIC8vIOWvneOCi1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCLnnKDjgorjgb7jgZlcIik7XG4gICAgICAgICAgICB0aGlzLnRhc2sgPSBuZXcgU2xlZXBpbmcodGhpcy5ob21lUG9zKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIOaVo+atqeOBmeOCi1xuICAgICAgICAgICAgY29uc3QgZGVzdDogUG9zaXRpb24gPSBnZXRSYW5kb21Qb3MoKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGAoJHtkZXN0Lnh9LCAke2Rlc3QueX0p44G45ZCR44GL44GE44G+44GZYCk7XG4gICAgICAgICAgICB0aGlzLnRhc2sgPSBuZXcgV2Fsa2luZyhkZXN0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBuYW1lOiBzdHJpbmcgPSBgSHVtYW4ke0h1bWFuLmh1bWFuTnVtfWAsXG4gICAgICAgIGhvbWVQb3M6IFBvc2l0aW9uID0geyB4OiAwLCB5OiAwIH0sXG4gICAgICAgIGhwOiBudW1iZXIgPSAxMDAsXG4gICAgICAgIGNvbG9yOiBzdHJpbmcgPSBcIiNGRjAwMDBcIixcbiAgICAgICAgY2hhcmFjdGVyOiBDaGFyYWN0ZXIgPSB7IHdpc2RvbTogMC41IH0sXG4gICAgICAgIGlzU2VsZWN0ZWQ6IGJvb2xlYW4gPSBmYWxzZSxcbiAgICApIHtcbiAgICAgICAgc3VwZXIobmFtZSwgaG9tZVBvcywgaHAsIFwibWVyY2hhbnRcIiwgY29sb3IsIGNoYXJhY3RlciwgaXNTZWxlY3RlZCk7XG4gICAgfVxufSIsImltcG9ydCB7IEh1bWFuIH0gZnJvbSBcIi4uL0h1bWFuL0h1bWFuXCI7XG5pbXBvcnQgeyBnYW1lU3RhdGUsIFBvc2l0aW9uIH0gZnJvbSBcIi4uLy4uL2dhbWVcIjtcbmltcG9ydCB7IFRhc2sgfSBmcm9tIFwiLi9UYXNrXCI7XG5pbXBvcnQgeyBpc05pZ2h0IH0gZnJvbSBcIi4uLy4uL2Z1bmN0aW9uL3V0aWxzXCI7XG5cbmV4cG9ydCBjbGFzcyBTbGVlcGluZyBleHRlbmRzIFRhc2sge1xuICAgIGlzU2xlZXBpbmc6IGJvb2xlYW47XG5cbiAgICBoYW5kbGVTbGVlcChodW1hbjogSHVtYW4pOiB2b2lkIHtcbiAgICAgICAgaWYgKGlzTmlnaHQoKSkge1xuICAgICAgICAgICAgLy8g5aScXG4gICAgICAgICAgICBpZiAoaHVtYW4ucG9zLnggPT09IGh1bWFuLmhvbWVQb3MueCAmJiBodW1hbi5wb3MueSA9PT0gaHVtYW4uaG9tZVBvcy55KSB7XG4gICAgICAgICAgICAgICAgLy8g5a6244Gr44GE44KLXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzU2xlZXBpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8g44G+44Gg5a+d44Gm44GE44Gq44GE44Gu44Gn44CB5pmC6ZaT44Gr5b+c44GY44Gf56K6546H44Gn5a+d44KLXG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE8gOiDmgKfmoLzjgarjganjga7lgKTjgoLogIPmha7jgZfjgZ/jgYRcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaCA9IGdhbWVTdGF0ZS50aW1lLmg7XG4gICAgICAgICAgICAgICAgICAgIGxldCB0aHJlc2hvbGQ6IG51bWJlcjtcbiAgICAgICAgICAgICAgICAgICAgLy8g6Za+5YCk44Gv44CB5aSc44GM5pu044GR44KL44G744Gp5bCP44GV44GP44Gq44KLXG4gICAgICAgICAgICAgICAgICAgIGlmIChoIDwgMTIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEFNXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJlc2hvbGQgPSAtKDUvNCkgKiBoICsgNTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFBNXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJlc2hvbGQgPSAtKDUvNikgKiAoaCAtIDI0KSArIDU7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhyZXNob2xkIDwgcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8g44Op44Oz44OA44Og44Gq5YCk44GM6Za+5YCk44KS6LaF44GI44Gf44KJ5a+d44KLXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzU2xlZXBpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8g5a+d44Gm44GE44KL44Gu44GnaHDjgpLlm57lvqlcbiAgICAgICAgICAgICAgICAgICAgaHVtYW4uY2hhbmdlSHAoKzEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8g5Ye65YWI44Gq44Gu44Gn44CB5a6244Gr5biw44KLXG4gICAgICAgICAgICAgICAgaHVtYW4uaGVhZFRvRGVzdChodW1hbi5ob21lUG9zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIOacnVxuICAgICAgICAgICAgY29uc3QgciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgICAgICAgIGNvbnN0IGggPSBnYW1lU3RhdGUudGltZS5oO1xuICAgICAgICAgICAgLy8gVE9ETyA6IOaAp+agvOOBquOBqeOBruWApOOCguiAg+aFruOBl+OBn+OBhFxuICAgICAgICAgICAgY29uc3QgdGhyZXNob2xkID0gLTUvMiAqIChoIC0gNykgKyA1O1xuICAgICAgICAgICAgaWYgKHRocmVzaG9sZCA8IHIpIHtcbiAgICAgICAgICAgICAgICAvLyDotbfjgY3jgotcbiAgICAgICAgICAgICAgICBodW1hbi50YXNrID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3Rvcih3aGVyZTogUG9zaXRpb24pIHtcbiAgICAgICAgc3VwZXIod2hlcmUpO1xuICAgICAgICB0aGlzLmlzU2xlZXBpbmcgPSBmYWxzZTtcbiAgICB9XG59IiwiaW1wb3J0IHsgUG9zaXRpb24sIEZJRUxEX1NJWkUgfSBmcm9tIFwiLi4vLi4vZ2FtZVwiO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgVGFzayB7XG4gICAgd2hlcmU6IFBvc2l0aW9uO1xuXG4gICAgY29uc3RydWN0b3Iod2hlcmU6IFBvc2l0aW9uKSB7XG4gICAgICAgIGlmICh3aGVyZS54IDwgMCB8fCBGSUVMRF9TSVpFIDw9IHdoZXJlLnhcbiAgICAgICAgICAgIHx8IHdoZXJlLnkgPCAwIHx8IEZJRUxEX1NJWkUgPD0gd2hlcmUueSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQb3NpdGlvbiBtdXN0IGJlIDAgPD0geCA8IEZJRUxEX1NJWkUnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLndoZXJlID0gd2hlcmU7XG4gICAgfVxufSIsImltcG9ydCB7IEh1bWFuIH0gZnJvbSBcIi4uL0h1bWFuL0h1bWFuXCI7XG5pbXBvcnQgeyBQb3NpdGlvbiB9IGZyb20gXCIuLi8uLi9nYW1lXCI7XG5pbXBvcnQgeyBUYXNrIH0gZnJvbSBcIi4vVGFza1wiO1xuXG5leHBvcnQgY2xhc3MgV2Fsa2luZyBleHRlbmRzIFRhc2sge1xuICAgIHN0YXRpYyBoYW5kbGVXYWxraW5nKGh1bWFuOiBIdW1hbik6IHZvaWQge1xuICAgICAgICBpZiAoIWh1bWFuLnRhc2spIHJldHVybjtcbiAgICAgICAgaWYgKGh1bWFuLnBvcy54ID09PSBodW1hbi50YXNrLndoZXJlLnggJiYgaHVtYW4ucG9zLnkgPT09IGh1bWFuLnRhc2sud2hlcmUueSkge1xuICAgICAgICAgICAgLy8g55uu55qE5Zyw44Gr5Yiw552A44GX44Gf44Gu44Gn44K/44K544Kv44KS57WC5LqGXG4gICAgICAgICAgICBodW1hbi50YXNrID0gbnVsbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIOebrueahOWcsOOBq+WQkeOBi+OBhlxuICAgICAgICAgICAgaHVtYW4uaGVhZFRvRGVzdChodW1hbi50YXNrLndoZXJlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHdoZXJlOiBQb3NpdGlvbikge1xuICAgICAgICBzdXBlcih3aGVyZSk7XG4gICAgfVxufSIsImltcG9ydCB7IGdhbWVTdGF0ZSwgRklFTERfU0laRSB9IGZyb20gXCIuLi9nYW1lXCI7XG5pbXBvcnQgeyBIb3VzZSB9IGZyb20gXCIuLi9jbGFzcy9Bc3NldC9Ib3VzZVwiO1xuaW1wb3J0IHsgSHVtYW4gfSBmcm9tIFwiLi4vY2xhc3MvSHVtYW4vSHVtYW5cIjtcbmltcG9ydCB7IGlzTmlnaHQgfSBmcm9tIFwiLi91dGlsc1wiO1xuaW1wb3J0IHsgU2xlZXBpbmcgfSBmcm9tIFwiLi4vY2xhc3MvVGFzay9TbGVlcGluZ1wiO1xuXG4vKipcbiAqIGdhbWVTdGF0ZeOBq+W+k+OBo+OBpuebpOmdouOCkuabtOaWsOOBmeOCi1xuICog6YG45oqe5Lit44Gu5Lq644Gu5LiK44Gr44Gv5ZC544GN5Ye644GX44KS6KGo56S644GZ44KLXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkcmF3RmllbGQoKTogdm9pZCB7XG4gICAgLy8g55uk6Z2i44KS44Oq44K744OD44OI44GZ44KLXG4gICAgcmVzZXRGaWVsZCgpO1xuXG4gICAgLy8g5Lq644KS5o+P55S7XG4gICAgZ2FtZVN0YXRlLmh1bWFucy5mb3JFYWNoKChodW1hbikgPT4ge1xuICAgICAgICBjb25zdCB7IHgsIHkgfSA9IGh1bWFuLnBvcztcbiAgICAgICAgY29uc3Qgc3F1YXJlRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNxdWFyZS1cIiArIChGSUVMRF9TSVpFICogeSArIHgpKTtcbiAgICAgICAgaWYgKCFzcXVhcmVFbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBzcXVhcmUtJHtGSUVMRF9TSVpFICogeSArIHh9IHdhcyBub3QgZm91bmQuYCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8g44Oe44K544Gu5paH5a2X5YiX44KS5pu05pawXG4gICAgICAgIHNxdWFyZUVsLnRleHRDb250ZW50ID0gXCLil4tcIjtcbiAgICAgICAgLy8g5Lq644GM6YG45oqe5Lit44Gq44KJ44Oe44K544Gu5LiK44Gr5ZC544GN5Ye644GX44KS6KGo56S644GZ44KLXG4gICAgICAgIGlmIChodW1hbi5pc1NlbGVjdGVkKSB7XG4gICAgICAgICAgICBjb25zdCBiYWxsb29uRWwgPSBjcmVhdGVCYWxsb29uKGh1bWFuKTtcbiAgICAgICAgICAgIHNxdWFyZUVsLmFwcGVuZENoaWxkKGJhbGxvb25FbCk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIOOCouOCu+ODg+ODiOOCkuaPj+eUu1xuICAgIGdhbWVTdGF0ZS5hc3NldHMuZm9yRWFjaCgoYXNzZXQpID0+IHtcbiAgICAgICAgY29uc3QgeyB4LCB5IH0gPSBhc3NldC5wb3M7XG4gICAgICAgIGNvbnN0IHNxdWFyZUVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzcXVhcmUtXCIgKyAoRklFTERfU0laRSAqIHkgKyB4KSk7XG4gICAgICAgIGlmICghc3F1YXJlRWwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgc3F1YXJlLSR7RklFTERfU0laRSAqIHkgKyB4fSB3YXMgbm90IGZvdW5kLmApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGFzc2V0IGluc3RhbmNlb2YgSG91c2UpIHtcbiAgICAgICAgICAgIC8vIOOCr+ODqeOCueOCkuODquOCu+ODg+ODiOOBmeOCi1xuICAgICAgICAgICAgc3F1YXJlRWwuY2xhc3NMaXN0LnJlbW92ZShhc3NldC5jbGFzc05hbWUpO1xuICAgICAgICAgICAgLy8g6YGp5YiH44Gq55S75YOP6KGo56S644Gu44Gf44KB44CB54q25rOB44Gr5b+c44GY44Gf44Kv44Op44K544KS5LuY5LiO44GZ44KLXG4gICAgICAgICAgICBpZiAoYXNzZXQuaXNUaGVyZU93bmVyKCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoYXNzZXQub3duZXIudGFzayBpbnN0YW5jZW9mIFNsZWVwaW5nXG4gICAgICAgICAgICAgICAgICAgICAgICAmJiBhc3NldC5vd25lci50YXNrLmlzU2xlZXBpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgYXNzZXQuY2xhc3NOYW1lID0gJ3NsZWVwaW5nLWhvdXNlJztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGlzTmlnaHQoKSkge1xuICAgICAgICAgICAgICAgICAgICBhc3NldC5jbGFzc05hbWUgPSAnZXZlbmluZy1ob3VzZSc7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYXNzZXQuY2xhc3NOYW1lID0gJ25vcm1hbC1ob3VzZSc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIOeUu+WDj+OCkuihqOekuuOBmeOCi+OBn+OCgeOBq+ODnuOCueOBruaWh+Wtl+WIl+OCkua2iOOBmVxuICAgICAgICAgICAgICAgIGNvbnN0IHRleHRFbCA9IHNxdWFyZUVsLmNoaWxkTm9kZXNbMF07XG4gICAgICAgICAgICAgICAgdGV4dEVsLnRleHRDb250ZW50ID0gXCJcIjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8g5omA5pyJ6ICF44GM5a6244Gr44GE44Gq44GE5aC05ZCIXG4gICAgICAgICAgICAgICAgaWYgKGlzTmlnaHQoKSkge1xuICAgICAgICAgICAgICAgICAgICBhc3NldC5jbGFzc05hbWUgPSAnbmlnaHQtaG91c2UnO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGFzc2V0LmNsYXNzTmFtZSA9ICdub3JtYWwtaG91c2UnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNxdWFyZUVsLmNsYXNzTGlzdC5hZGQoYXNzZXQuY2xhc3NOYW1lKTtcbiAgICAgICAgICAgIGNvbnN0IGltZ0VsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgICAgICAgICAgIHNxdWFyZUVsLmFwcGVuZENoaWxkKGltZ0VsKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG4vKipcbiAqIOebpOmdouOCkuODquOCu+ODg+ODiOOBmeOCi++8iOOBmeOBueOBpuOBruODnuOCueOCkuepuuaWh+Wtl+WIl+OBq+OBmeOCi++8iVxuICovXG5mdW5jdGlvbiByZXNldEZpZWxkKCk6IHZvaWQge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgRklFTERfU0laRTsgaSsrKSB7XG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgRklFTERfU0laRTsgaisrKSB7XG4gICAgICAgICAgICBjb25zdCBzcXVhcmVFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3F1YXJlLVwiICsgKEZJRUxEX1NJWkUgKiBpICsgaikpO1xuICAgICAgICAgICAgaWYgKCFzcXVhcmVFbClcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYHNxdWFyZS0ke0ZJRUxEX1NJWkUgKiBpICsgan0gd2FzIG5vdCBmb3VuZC5gKTtcbiAgICAgICAgICAgIC8vIOWQhOODnuOCueOBruaWh+Wtl+WIl+OCkuepuuaWh+Wtl+WIl+OBq+ODquOCu+ODg+ODiFxuICAgICAgICAgICAgc3F1YXJlRWwudGV4dENvbnRlbnQgPSBcIlwiO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4vKipcbiAqIOihqOekuuOBleOCjOOBpuOBhOOCi+aZguWIu+OCkuabtOaWsOOBmeOCi1xuICovXG5leHBvcnQgZnVuY3Rpb24gZHJhd1RpbWUoKTogdm9pZCB7XG4gICAgY29uc3QgdGltZUVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aW1lTGFiZWxcIik7XG4gICAgaWYgKCF0aW1lRWwpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGB0aW1lTGFiZWwgd2FzIG5vdCBmb3VuZC5gKTtcbiAgICB9XG4gICAgdGltZUVsLnRleHRDb250ZW50ID0gYOePvuWcqOOBruaZguWIuyAke2dhbWVTdGF0ZS50aW1lLmh9IDogJHtnYW1lU3RhdGUudGltZS5tfWA7XG59XG5cbi8qKlxuICog5Lq644Gu5oOF5aCx44KS6KGo56S644GZ44KL5ZC544GN5Ye644GX6KaB57Sg44KS6L+U44GZXG4gKiBAcGFyYW0gaHVtYW4g5oOF5aCx44KS6KGo56S644GZ44KL5a++6LGhXG4gKiBAcmV0dXJucyDlkLnjgY3lh7rjgZfjga48ZGl2Puimgee0oFxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQmFsbG9vbihodW1hbjogSHVtYW4pOiBIVE1MRGl2RWxlbWVudCB7XG4gICAgY29uc3QgZGl2RWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGRpdkVsLmNsYXNzTmFtZSA9IFwiYWJvdmUtc3F1YXJlXCI7XG4gICAgY29uc3QgYmFsbG9vbkVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBiYWxsb29uRWwuY2xhc3NOYW1lID0gXCJiYWxsb29uMlwiO1xuICAgIGNvbnN0IG1lc3NhZ2VFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgIG1lc3NhZ2VFbC5pbm5lclRleHQgPVxuICAgICAgICBg5ZCN5YmN77yaJHtodW1hbi5uYW1lfVxuICAgIEhQ77yaJHtodW1hbi5ocH1cbiAgICDlvbnogbfvvJoke2h1bWFuLmpvYn1cbiAgICDmgKfmoLzvvJoke2h1bWFuLmNoYXJhY3Rlcn1gO1xuICAgIGJhbGxvb25FbC5hcHBlbmRDaGlsZChtZXNzYWdlRWwpO1xuICAgIGRpdkVsLmFwcGVuZENoaWxkKGJhbGxvb25FbCk7XG5cbiAgICByZXR1cm4gZGl2RWw7XG59IiwiaW1wb3J0IHsgZ2FtZVN0YXRlLCBIVE1MRXZlbnQsIEZJRUxEX1NJWkUgfSBmcm9tIFwiLi4vZ2FtZVwiO1xuaW1wb3J0IHsgSHVtYW4sIEpvYiB9IGZyb20gXCIuLi9jbGFzcy9IdW1hbi9IdW1hblwiO1xuaW1wb3J0IHsgRmFybWVyIH0gZnJvbSBcIi4uL2NsYXNzL0h1bWFuL0Zhcm1lclwiO1xuaW1wb3J0IHsgTWVyY2hhbnQgfSBmcm9tIFwiLi4vY2xhc3MvSHVtYW4vTWVyY2hhbnRcIjtcbmltcG9ydCB7IEhvdXNlIH0gZnJvbSBcIi4uL2NsYXNzL0Fzc2V0L0hvdXNlXCI7XG5pbXBvcnQgeyBkcmF3RmllbGQgfSBmcm9tIFwiLi9kcmF3XCI7XG5pbXBvcnQgeyBleGl0QWRkSHVtYW5Nb2RlLCBlbnRlckFkZEh1bWFuTW9kZSwgZXhpdFNlbGVjdEh1bWFuTW9kZSB9IGZyb20gXCIuL2hhbmRsZU1vZGVcIjtcbmltcG9ydCB7IGdldEh1bWFuc0Zyb21Qb3MgfSBmcm9tIFwiLi91dGlsc1wiO1xuXG4vKipcbiAqIFNxdWFyZeOBjOOCr+ODquODg+OCr+OBleOCjOOBn+OBqOOBjeOBq+WRvOOBsOOCjOOAgeePvuWcqOOBruODouODvOODieOBq+W+k+OBo+OBpuWHpueQhuOCkuihjOOBhlxuICovXG5leHBvcnQgZnVuY3Rpb24gaGFuZGxlQ2xpY2tTcXVhcmUoeDogbnVtYmVyLCB5OiBudW1iZXIpOiB2b2lkIHtcbiAgICBzd2l0Y2ggKGdhbWVTdGF0ZS5tb2RlLmlkKSB7XG4gICAgICAgIGNhc2UgJ25ldXRyYWwnOlxuICAgICAgICAgICAgY29uc29sZS5sb2coRklFTERfU0laRSAqIHkgKyB4KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdhZGRIdW1hbic6XG4gICAgICAgICAgICAvLyDmjIflrprjga7loLTmiYDjgavkurrjgpLov73liqDjgZnjgotcbiAgICAgICAgICAgIGxldCBuZXdIdW1hbjogSHVtYW47XG4gICAgICAgICAgICBpZiAoZ2FtZVN0YXRlLm1vZGUuam9iID09PSBcImZhcm1lclwiKSB7XG4gICAgICAgICAgICAgICAgbmV3SHVtYW4gPSBuZXcgRmFybWVyKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGdhbWVTdGF0ZS5tb2RlLmpvYiA9PT0gXCJtZXJjaGFudFwiKSB7XG4gICAgICAgICAgICAgICAgbmV3SHVtYW4gPSBuZXcgTWVyY2hhbnQoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbmV3SHVtYW4gPSBuZXcgRmFybWVyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBuZXdIdW1hbi5ob21lUG9zID0geyB4LCB5IH07XG4gICAgICAgICAgICBuZXdIdW1hbi5wb3MgPSB7IHgsIHkgfTtcbiAgICAgICAgICAgIGFkZEh1bWFuKG5ld0h1bWFuKTtcbiAgICAgICAgICAgIC8vIOebpOmdouOCkuabtOaWsOOBmeOCi1xuICAgICAgICAgICAgZHJhd0ZpZWxkKCk7XG4gICAgICAgICAgICAvLyDjg5Ljg4jov73liqDjg6Ljg7zjg4njgpLmipzjgZHjgotcbiAgICAgICAgICAgIGV4aXRBZGRIdW1hbk1vZGUoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdzZWxlY3RIdW1hbic6XG4gICAgICAgICAgICBjb25zdCBodW1hbnMgPSBnZXRIdW1hbnNGcm9tUG9zKHsgeCwgeSB9KTtcbiAgICAgICAgICAgIC8vIOaMh+WumuOBruWgtOaJgOOBq+S6uuOBjOOBhOOBquOBkeOCjOOBsOS9leOCguOBl+OBquOBhFxuICAgICAgICAgICAgaWYgKGh1bWFucy5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIOaMh+WumuOBruWgtOaJgOOBruS6uuOBrumBuOaKnueKtuaFi+OCkuWPjei7ouOBleOBm+OCi1xuICAgICAgICAgICAgLy8g77yI6KSH5pWw5Lq644Gu5aC05ZCI44Gv44Oq44K544OI44Gu5YWI6aCt77yJXG4gICAgICAgICAgICBodW1hbnNbMF0uaXNTZWxlY3RlZCA9ICFodW1hbnNbMF0uaXNTZWxlY3RlZDtcbiAgICAgICAgICAgIC8vIOebpOmdouOCkuabtOaWsOOBmeOCi1xuICAgICAgICAgICAgZHJhd0ZpZWxkKCk7XG4gICAgICAgICAgICAvLyDpgbjmip7jg6Ljg7zjg4njgpLmipzjgZHjgotcbiAgICAgICAgICAgIGV4aXRTZWxlY3RIdW1hbk1vZGUoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cbn1cblxuLyoqXG4gKiBnYW1lU3RhdGXjgavkurrjgajlrrbjgpLov73liqBcbiAqL1xuZnVuY3Rpb24gYWRkSHVtYW4obmV3SHVtYW46IEh1bWFuKSB7XG4gICAgY29uc3QgeyB4LCB5IH0gPSBuZXdIdW1hbi5wb3M7XG4gICAgLy8g5Lq644KS6L+95YqgXG4gICAgZ2FtZVN0YXRlLmh1bWFucy5wdXNoKG5ld0h1bWFuKTtcbiAgICAvLyDlrrbjgpLov73liqBcbiAgICBnYW1lU3RhdGUuYXNzZXRzLnB1c2goXG4gICAgICAgIG5ldyBIb3VzZSh7IHgsIHkgfSwgbmV3SHVtYW4pXG4gICAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZUFkZEh1bWFuQ2xpY2soKTogdm9pZCB7XG4gICAgY29uc3QgcmFkaW9JbnB1dHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZShcInR5cGVGb3JtXCIpIGFzIE5vZGVMaXN0T2Y8SFRNTElucHV0RWxlbWVudD47XG4gICAgbGV0IGpvYjogSm9iIHwgbnVsbCA9IG51bGw7XG4gICAgcmFkaW9JbnB1dHMuZm9yRWFjaCgocmFkaW86IEhUTUxJbnB1dEVsZW1lbnQpID0+IHtcbiAgICAgICAgaWYgKHJhZGlvLmNoZWNrZWQpIHtcbiAgICAgICAgICAgIGpvYiA9IHJhZGlvLnZhbHVlIGFzIEpvYjtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKCFqb2IpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiam9iIGlzIG5vdCBzZWxlY3RlZC4gQ2FuJ3QgZW50ZXIgYWRkLWh1bWFuIG1vZGUuXCIpO1xuICAgIH1cblxuICAgIGVudGVyQWRkSHVtYW5Nb2RlKGpvYik7XG59IiwiaW1wb3J0IHsgSm9iIH0gZnJvbSBcIi4uL2NsYXNzL0h1bWFuL0h1bWFuXCI7XG5pbXBvcnQgeyBGSUVMRF9TSVpFLCBnYW1lU3RhdGUgfSBmcm9tIFwiLi4vZ2FtZVwiO1xuXG5leHBvcnQgdHlwZSBJbnRlcmZhY2VNb2RlID0ge1xuICAgIGlkOiAnbmV1dHJhbCc7XG4gIH0gfCB7XG4gICAgaWQ6ICdhZGRIdW1hbic7XG4gICAgam9iOiBKb2I7XG4gIH0gfCB7XG4gICAgaWQ6ICdzZWxlY3RIdW1hbic7XG4gIH07XG4vKipcbiAqIOS9jee9ruOBrumBuOaKnuODouODvOODieOBq+mBt+enu+OBl+OAgVNxdWFyZeS4iuOBp+ODm+ODkOODvOOBmeOCi+OBqOiJsuOBjOWkieOCj+OCi+OCiOOBhuOBq+OBquOCi1xuICovXG5leHBvcnQgZnVuY3Rpb24gZW50ZXJBZGRIdW1hbk1vZGUoam9iOiBKb2IpOiB2b2lkIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IEZJRUxEX1NJWkU7IGkrKykge1xuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IEZJRUxEX1NJWkU7IGorKykge1xuICAgICAgICAgICAgY29uc3Qgc3F1YXJlRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNxdWFyZS1cIiArIChGSUVMRF9TSVpFICogaSArIGopKTtcbiAgICAgICAgICAgIGlmICghc3F1YXJlRWwpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBzcXVhcmUtJHtGSUVMRF9TSVpFICogaSArIGp9IHdhcyBub3QgZm91bmQuYCk7XG4gICAgICAgICAgICAvLyDjg5vjg5Djg7zmmYLjgavoibLjgYzlpInjgo/jgovjgojjgYbjgavjgq/jg6njgrnjgpLov73liqBcbiAgICAgICAgICAgIHNxdWFyZUVsLmNsYXNzTGlzdC5hZGQoJ2h1bWFuLWFkZC1tb2RlJylcbiAgICAgICAgICAgIC8vIOmBuOaKnuODouODvOODieOBq+mBt+enu+OBmeOCi1xuICAgICAgICAgICAgZ2FtZVN0YXRlLm1vZGUgPSB7IGlkOiAnYWRkSHVtYW4nLCBqb2IgfTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLyoqXG4gKiDjg4vjg6Xjg7zjg4jjg6njg6vjg6Ljg7zjg4njgavpgbfnp7vjgZfjgIFTcXVhcmXkuIrjgafjg5vjg5Djg7zjgZfjgabjgoLoibLjgYzlpInjgo/jgonjgarjgYTjgojjgYbjgavjgZnjgotcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGV4aXRBZGRIdW1hbk1vZGUoKTogdm9pZCB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBGSUVMRF9TSVpFOyBpKyspIHtcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBGSUVMRF9TSVpFOyBqKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHNxdWFyZUVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzcXVhcmUtXCIgKyAoRklFTERfU0laRSAqIGkgKyBqKSk7XG4gICAgICAgICAgICBpZiAoIXNxdWFyZUVsKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgc3F1YXJlLSR7RklFTERfU0laRSAqIGkgKyBqfSB3YXMgbm90IGZvdW5kLmApO1xuICAgICAgICAgICAgLyog44Ob44OQ44O85pmC44Gr6Imy44GM5aSJ44KP44KL44Kv44Op44K544KS6Zmk5Y67ICovXG4gICAgICAgICAgICBzcXVhcmVFbC5jbGFzc0xpc3QucmVtb3ZlKCdodW1hbi1hZGQtbW9kZScpXG4gICAgICAgICAgICAvKiDjg4vjg6Xjg7zjg4jjg6njg6vjg6Ljg7zjg4njgavpgbfnp7vjgZnjgosgKi9cbiAgICAgICAgICAgIGdhbWVTdGF0ZS5tb2RlID0geyBpZDogJ25ldXRyYWwnIH07XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8qKlxuICog5ZC544GN5Ye644GX44KS6KGo56S644GZ44KL5Lq644KS6YG45oqe44GZ44KL44Oi44O844OJ44Gr6YG356e744GZ44KLXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBlbnRlclNlbGVjdEh1bWFuTW9kZSgpOiB2b2lkIHtcbiAgICBnYW1lU3RhdGUubW9kZSA9IHsgaWQ6ICdzZWxlY3RIdW1hbicgfTtcbn1cblxuLyoqXG4gKiDjg4vjg6Xjg7zjg4jjg6njg6vjg6Ljg7zjg4njgavpgbfnp7vjgZnjgotcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGV4aXRTZWxlY3RIdW1hbk1vZGUoKTogdm9pZCB7XG4gICAgZ2FtZVN0YXRlLm1vZGUgPSB7IGlkOiAnbmV1dHJhbCcgfTtcbn0iLCJpbXBvcnQgeyBQb3NpdGlvbiwgZ2FtZVN0YXRlIH0gZnJvbSBcIi4uL2dhbWVcIjtcbmltcG9ydCB7IEh1bWFuIH0gZnJvbSBcIi4uL2NsYXNzL0h1bWFuL0h1bWFuXCI7XG5pbXBvcnQgeyBGSUVMRF9TSVpFIH0gZnJvbSBcIi4uL2dhbWVcIjtcblxuLyoqXG4gKiDjgYLjgovluqfmqJnjgavjgYTjgovkurrjga7mpJzntKLjgZfjgIHphY3liJfjgavjgZfjgabov5TjgZlcbiAqIEBwYXJhbSBwb3Mg5bqn5qiZXG4gKiBAcmV0dXJucyDjgZ3jga7luqfmqJnjgavjgYTjgovkurrjga7phY3liJdcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEh1bWFuc0Zyb21Qb3MocG9zOiBQb3NpdGlvbik6IEh1bWFuW10ge1xuICAgIGNvbnN0IHJldEh1bWFuczogSHVtYW5bXSA9IFtdO1xuICAgIGdhbWVTdGF0ZS5odW1hbnMuZm9yRWFjaCgoaHVtYW4pID0+IHtcbiAgICAgICAgaWYgKGh1bWFuLnBvcy54ID09IHBvcy54ICYmIGh1bWFuLnBvcy55ID09IHBvcy55KSB7XG4gICAgICAgICAgICByZXRIdW1hbnMucHVzaChodW1hbik7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gcmV0SHVtYW5zO1xufVxuXG4vKipcbiAqIGdhbWVTdGF0ZS50aW1l44Gr5b6T44Gj44Gm5aSc44GL5ZCm44GL44KS6L+U44GZXG4gKiBAcmV0dXJucyDlpJzjgafjgYLjgovjgYvlkKbjgYtcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzTmlnaHQoKTogYm9vbGVhbiB7XG4gICAgaWYgKGdhbWVTdGF0ZS50aW1lLmggPj0gMTggfHwgZ2FtZVN0YXRlLnRpbWUuaCA8PSA2KSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG5cbi8qKlxuICog44Op44Oz44OA44Og44Gq5L2N572u44KS55Sf5oiQ44GX44CB6L+U44GZXG4gKiBAcmV0dXJucyBbeCwgeV1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFJhbmRvbVBvcygpOiBQb3NpdGlvbiB7XG4gICAgY29uc3QgeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIEZJRUxEX1NJWkUpO1xuICAgIGNvbnN0IHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBGSUVMRF9TSVpFKTtcbiAgICByZXR1cm4geyB4LCB5IH07XG59IiwiaW1wb3J0IHsgSW50ZXJmYWNlTW9kZSB9IGZyb20gXCIuL2Z1bmN0aW9uL2hhbmRsZU1vZGVcIjtcbmltcG9ydCB7IEh1bWFuIH0gZnJvbSBcIi4vY2xhc3MvSHVtYW4vSHVtYW5cIjtcbmltcG9ydCB7IEFzc2V0IH0gZnJvbSBcIi4vY2xhc3MvQXNzZXQvQXNzZXRcIjtcblxuLyog55uk6Z2i44Gu44K144Kk44K6ICovXG5leHBvcnQgY29uc3QgRklFTERfU0laRSA9IDg7XG5cbmV4cG9ydCBsZXQgZ2FtZVN0YXRlOiBHYW1lU3RhdGUgPSB7XG4gICAgdGltZTogeyBkOiAwLCBoOiAxMiwgbTogMCB9LFxuICAgIG1vZGU6IHsgaWQ6IFwibmV1dHJhbFwiIH0sXG4gICAgaHVtYW5zOiBbXSxcbiAgICBhc3NldHM6IFtdLFxufVxuXG4vLyA9PT09PT09PT09PT09PT09PSB0eXBlID09PT09PT09PT09PT09PT1cblxuZXhwb3J0IHR5cGUgR2FtZVN0YXRlID0ge1xuICAgIHRpbWU6IFRpbWU7XG4gICAgbW9kZTogSW50ZXJmYWNlTW9kZTtcbiAgICBodW1hbnM6IEh1bWFuW107XG4gICAgYXNzZXRzOiBBc3NldFtdO1xufVxuXG50eXBlIFRpbWUgPSB7XG4gICAgZDogbnVtYmVyO1xuICAgIGg6IG51bWJlcjtcbiAgICBtOiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSFRNTEV2ZW50PFQgZXh0ZW5kcyBFdmVudFRhcmdldD4gZXh0ZW5kcyBFdmVudCB7XG4gICAgdGFyZ2V0OiBUO1xufVxuXG5leHBvcnQgdHlwZSBQb3NpdGlvbiA9IHtcbiAgICB4OiBudW1iZXIsXG4gICAgeTogbnVtYmVyLFxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgZHJhd0ZpZWxkLCBkcmF3VGltZSB9IGZyb20gXCIuL2Z1bmN0aW9uL2RyYXdcIjtcclxuaW1wb3J0IHsgaGFuZGxlQWRkSHVtYW5DbGljaywgaGFuZGxlQ2xpY2tTcXVhcmUgfSBmcm9tIFwiLi9mdW5jdGlvbi9oYW5kbGVBY3Rpb25cIjtcclxuaW1wb3J0IHsgZW50ZXJTZWxlY3RIdW1hbk1vZGUgfSBmcm9tIFwiLi9mdW5jdGlvbi9oYW5kbGVNb2RlXCI7XHJcbmltcG9ydCB7IEZJRUxEX1NJWkUsIGdhbWVTdGF0ZSB9IGZyb20gXCIuL2dhbWVcIjtcclxuXHJcbmxldCBpbnRlcnZhbElkOiBudW1iZXI7XHJcbmxldCBpc0xvb3Bpbmc6IGJvb2xlYW47XHJcblxyXG4vLyDjg5rjg7zjgrjjgYzoqq3jgb/ovrzjgb7jgozjgZ/jgajjgY3jga7lh6bnkIZcclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKGUpID0+IHtcclxuICAgIC8vIDHnp5LjgZTjgajjgatpbnRlcnZhbEZ1bmPjgpLlrp/ooYzjgZnjgovjgojjgYbjgavoqK3lrppcclxuICAgIGludGVydmFsSWQgPSBzZXRJbnRlcnZhbChpbnRlcnZhbEZ1bmMsIDEwMDApO1xyXG4gICAgaXNMb29waW5nID0gdHJ1ZTtcclxuXHJcbiAgICAvLyDjgqTjg5njg7Pjg4jjg4/jg7Pjg4njg6njg7zjgpLnmbvpjLJcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VsZWN0SHVtYW5CdXR0b25cIik/LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlbnRlclNlbGVjdEh1bWFuTW9kZSk7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN3aXRjaEludGVydmFsQnV0dG9uXCIpPy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc3dpdGNoSW50ZXJ2YWwpO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGRIdW1hbkJ1dHRvblwiKT8uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZUFkZEh1bWFuQ2xpY2spO1xyXG5cclxuICAgIC8vIOaPj+eUu1xyXG4gICAgY3JlYXRlRmllbGQoKTtcclxuICAgIGRyYXdGaWVsZCgpO1xyXG4gICAgZHJhd1RpbWUoKTtcclxufSk7XHJcblxyXG4vKipcclxuICogMeWNmOS9jeaZgumWk+OBlOOBqOOBq+WRvOOBsOOCjOOCi+mWouaVsFxyXG4gKi9cclxuZnVuY3Rpb24gaW50ZXJ2YWxGdW5jKCk6IHZvaWQge1xyXG4gICAgLy8gMeWNmOS9jeaZgumWk+OBlOOBqOOBq+ebpOmdouOCkuabtOaWsOOBmeOCi1xyXG4gICAgZ2FtZVN0YXRlLmh1bWFucy5mb3JFYWNoKChodW1hbikgPT4gaHVtYW4uc3BlbmRUaW1lKCkpO1xyXG4gICAgLy8g5pmC6ZaT44KSMTDliIbpgLLjgoHjgotcclxuICAgIGdhbWVTdGF0ZS50aW1lLm0gKz0gMTA7XHJcbiAgICBpZiAoZ2FtZVN0YXRlLnRpbWUubSA+PSA2MCkge1xyXG4gICAgICAgIGdhbWVTdGF0ZS50aW1lLm0gJT0gNjA7XHJcbiAgICAgICAgZ2FtZVN0YXRlLnRpbWUuaCArPSAxO1xyXG4gICAgICAgIGlmIChnYW1lU3RhdGUudGltZS5oID49IDI0KSB7XHJcbiAgICAgICAgICAgIGdhbWVTdGF0ZS50aW1lLmggJT0gMjQ7XHJcbiAgICAgICAgICAgIGdhbWVTdGF0ZS50aW1lLmQgKz0gMTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyDnm6TpnaLjgarjganjgpLmm7TmlrBcclxuICAgIGRyYXdGaWVsZCgpO1xyXG4gICAgZHJhd1RpbWUoKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIOOCpOODs+OCv+ODvOODkOODq+OBruOCquODsy/jgqrjg5XjgpLliIfjgormm7/jgYjjgotcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzd2l0Y2hJbnRlcnZhbCgpOiB2b2lkIHtcclxuICAgIGlmIChpc0xvb3BpbmcpIHtcclxuICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsSWQpO1xyXG4gICAgICAgIGlzTG9vcGluZyA9IGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBpbnRlcnZhbElkID0gc2V0SW50ZXJ2YWwoaW50ZXJ2YWxGdW5jLCAxMDAwKTtcclxuICAgICAgICBpc0xvb3BpbmcgPSB0cnVlO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogRklFTERfU0laRSAqIEZJRUxEX1NJWkUg44Gu55uk6Z2i44KS5L2c5oiQ44GZ44KLXHJcbiAqL1xyXG5mdW5jdGlvbiBjcmVhdGVGaWVsZCgpOiB2b2lkIHtcclxuICAgIGNvbnN0IGZpZWxkRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZpZWxkXCIpO1xyXG4gICAgaWYgKCFmaWVsZEVsKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCc8ZGl2IGlkPVwiZmllbGRcIj48L2Rpdj4gaXMgbnVsbC4nKTtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IEZJRUxEX1NJWkU7IGkrKykge1xyXG4gICAgICAgIC8vIOihjOOBruimgee0oOOCkuS9nOaIkFxyXG4gICAgICAgIGNvbnN0IGxpbmVFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgbGluZUVsLmNsYXNzTmFtZSA9IFwiYm9hcmQtcm93XCI7XHJcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBGSUVMRF9TSVpFOyBqKyspIHtcclxuICAgICAgICAgICAgLy8g5ZCE6KGM44Gu5YiX44Gu6KaB57Sg44KS5L2c5oiQXHJcbiAgICAgICAgICAgIGNvbnN0IHNxdWFyZUVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgICAgICAgICAgc3F1YXJlRWwuY2xhc3NOYW1lID0gXCJzcXVhcmVcIjtcclxuICAgICAgICAgICAgc3F1YXJlRWwuaWQgPSBcInNxdWFyZS1cIiArIChGSUVMRF9TSVpFICogaSArIGopO1xyXG4gICAgICAgICAgICBzcXVhcmVFbC5vbmNsaWNrID0gKCkgPT4gaGFuZGxlQ2xpY2tTcXVhcmUoaiwgaSk7XHJcbiAgICAgICAgICAgIC8vIOihjOOBruWtkOimgee0oOOBq+OBmeOCi1xyXG4gICAgICAgICAgICBsaW5lRWwuYXBwZW5kQ2hpbGQoc3F1YXJlRWwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDooYzjga7opoHntKDjgpLlrZDopoHntKDjgavjgZnjgotcclxuICAgICAgICBmaWVsZEVsLmFwcGVuZENoaWxkKGxpbmVFbCk7XHJcbiAgICB9XHJcbn1cclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9