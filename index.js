"use strict";
let intervalId;
let isLooping;
/* 盤面のサイズ */
const FIELD_SIZE = 8;
// ページが読み込まれたときの処理
document.addEventListener("DOMContentLoaded", (e) => {
    // 1秒ごとにintervalFuncを実行するように設定
    intervalId = setInterval(intervalFunc, 1000);
    isLooping = true;
    // 描画
    createField();
    drawField();
    drawTime();
});
let gameState = {
    time: { d: 1, h: 14, m: 30 },
    mode: "neutral",
    humans: [],
    assets: [],
};
/**
 * 1単位時間ごとに呼ばれる関数
 */
function intervalFunc() {
    // 1単位時間ごとに盤面を更新する
    gameState.humans.forEach((human) => human.spendTime());
    // 時間を10分進める
    gameState.time.h = (gameState.time.h + 1) % 24;
    // 盤面などを更新
    drawField();
    drawTime();
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
    for (let i = 0; i < FIELD_SIZE; i++) {
        // 行の要素を作成
        const lineEl = document.createElement("div");
        lineEl.className = "board-row";
        for (let j = 0; j < FIELD_SIZE; j++) {
            // 各行の列の要素を作成
            const squareEl = document.createElement("button");
            squareEl.className = "square";
            squareEl.id = "square-" + (FIELD_SIZE * i + j);
            squareEl.onclick = () => handleClickSquare(j, i);
            // 行の子要素にする
            lineEl.appendChild(squareEl);
        }
        // 行の要素を子要素にする
        fieldEl.appendChild(lineEl);
    }
}
class Human {
    get pos() {
        return this._pos;
    }
    set pos(newPos) {
        if (newPos.x < 0 || FIELD_SIZE <= newPos.x
            || newPos.y < 0 || FIELD_SIZE <= newPos.y) {
            throw new Error('Position must be 0 <= x < FIELD_SIZE');
        }
        this._pos = newPos;
    }
    /**
     * 1単位時間過ごす
     */
    spendTime() {
        var _a;
        // タスクを完了している場合、次のタスクを決める
        if (!this.task) {
            this.determineTask();
        }
        // タスクに従って行動する
        switch ((_a = this.task) === null || _a === void 0 ? void 0 : _a.what) {
            case 'sleep':
                Task.handleSleep(this);
                break;
            case 'walking':
                Task.handleWalking(this);
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
        if (16 < gameState.time.h) {
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
    /**
     * 目的地に向かって1マス進む
     * @param dest 目的地
     */
    headToDest(dest) {
        // 現在の座標から目的地の座標までの最短経路をdijkstraで求める
        const d = Array.from({ length: V }).map(n => INF);
        const used = Array.from({ length: V }).map(n => false);
        d[FIELD_SIZE * this.pos.y + this.pos.x] = 0;
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
                    prevPos[u] = { x: v % FIELD_SIZE, y: Math.floor(v / FIELD_SIZE) };
                }
            }
        }
        // destから現在地curPosへの最短経路を求める
        const destToCurPosPath = [];
        let t = dest;
        for (; !(t.x === -1 && t.y === -1); t = prevPos[FIELD_SIZE * t.y + t.x]) {
            destToCurPosPath.push(t);
        }
        this.pos = destToCurPosPath[destToCurPosPath.length - 2];
    }
    constructor(name = `Human${Human.humanNum}`, homePos = { x: 0, y: 0 }, hp = 100, job = "farmer", color = "#FF0000", character = { wisdom: 0.5 }, isSelected = false) {
        if (homePos.x < 0 || FIELD_SIZE <= homePos.x
            || homePos.y < 0 || FIELD_SIZE <= homePos.y) {
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
Human.humanNum = 1;
/**
 * dijkstraに必要な変数
 */
const INF = 100000;
const V = FIELD_SIZE * FIELD_SIZE;
// 隣接行列
const cost = Array.from({ length: V })
    .map(n => Array.from({ length: V }).map(n => INF));
for (let y = 0; y < FIELD_SIZE; y++) {
    for (let x = 0; x < FIELD_SIZE; x++) {
        if (y == 0 && x == 0) {
            // 左上の隅
            cost[FIELD_SIZE * y + x][FIELD_SIZE * y + (x + 1)] = 1;
            cost[FIELD_SIZE * y + x][FIELD_SIZE * (y + 1) + x] = 1;
        }
        else if (y == 0 && x == FIELD_SIZE - 1) {
            // 右上の隅
            cost[FIELD_SIZE * y + x][FIELD_SIZE * y + (x - 1)] = 1;
            cost[FIELD_SIZE * y + x][FIELD_SIZE * (y + 1) + x] = 1;
        }
        else if (y == FIELD_SIZE - 1 && x == 0) {
            // 左下の隅
            cost[FIELD_SIZE * y + x][FIELD_SIZE * (y - 1) + x] = 1;
            cost[FIELD_SIZE * y + x][FIELD_SIZE * y + (x + 1)] = 1;
        }
        else if (y == FIELD_SIZE - 1 && x == FIELD_SIZE - 1) {
            // 右下の隅
            cost[FIELD_SIZE * y + x][FIELD_SIZE * (y - 1) + x] = 1;
            cost[FIELD_SIZE * y + x][FIELD_SIZE * y + (x - 1)] = 1;
        }
        else if (y == 0) {
            // 上辺
            cost[FIELD_SIZE * y + x][FIELD_SIZE * y + (x - 1)] = 1; // ←
            cost[FIELD_SIZE * y + x][FIELD_SIZE * (y + 1) + x] = 1; // ↓
            cost[FIELD_SIZE * y + x][FIELD_SIZE * y + (x + 1)] = 1; // →
        }
        else if (x == 0) {
            // 左辺
            cost[FIELD_SIZE * y + x][FIELD_SIZE * (y - 1) + x] = 1; // ↑
            cost[FIELD_SIZE * y + x][FIELD_SIZE * y + (x + 1)] = 1; // →
            cost[FIELD_SIZE * y + x][FIELD_SIZE * (y + 1) + x] = 1; // ↓
        }
        else if (x == FIELD_SIZE - 1) {
            // 右辺
            cost[FIELD_SIZE * y + x][FIELD_SIZE * (y - 1) + x] = 1; // ↑
            cost[FIELD_SIZE * y + x][FIELD_SIZE * y + (x - 1)] = 1; // ←
            cost[FIELD_SIZE * y + x][FIELD_SIZE * (y + 1) + x] = 1; // ↓
        }
        else if (y == FIELD_SIZE - 1) {
            // 下辺
            cost[FIELD_SIZE * y + x][FIELD_SIZE * y + (x - 1)] = 1; // ←
            cost[FIELD_SIZE * y + x][FIELD_SIZE * (y - 1) + x] = 1; // ↑
            cost[FIELD_SIZE * y + x][FIELD_SIZE * y + (x + 1)] = 1; // →
        }
        else {
            cost[FIELD_SIZE * y + x][FIELD_SIZE * (y - 1) + x] = 1; // ↑
            cost[FIELD_SIZE * y + x][FIELD_SIZE * y + (x + 1)] = 1; // →
            cost[FIELD_SIZE * y + x][FIELD_SIZE * (y + 1) + x] = 1; // ↓
            cost[FIELD_SIZE * y + x][FIELD_SIZE * y + (x - 1)] = 1; // ←
        }
    }
}
class Asset {
    constructor(pos, owner) {
        if (pos.x < 0 || pos.x >= FIELD_SIZE || pos.y < 0 || pos.y >= FIELD_SIZE) {
            throw new Error(`pos.x, pox.y must be in 0 <= a < FIELD_SIZE`);
        }
        this.pos = pos;
        this.owner = owner;
    }
}
class House extends Asset {
    constructor(pos, owner) {
        super(pos, owner);
        this.className = "normal-house";
    }
}
// TODO：Taskを抽象クラスにして、個別タスククラスを作成する
class Task {
    static handleSleep(human) {
        if (5 < gameState.time.h && gameState.time.h < 16) {
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
/**
 * gameStateに従って盤面を更新する
 * 選択中の人の上には吹き出しを表示する
 */
function drawField() {
    // 盤面をリセットする
    resetField();
    // 人を描画
    gameState.humans.forEach((human) => {
        const { x, y } = human.pos;
        const squareEl = document.getElementById("square-" + (FIELD_SIZE * y + x));
        if (!squareEl) {
            throw new Error(`square-${FIELD_SIZE * y + x} was not found.`);
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
    gameState.assets.forEach((asset) => {
        const { x, y } = asset.pos;
        const squareEl = document.getElementById("square-" + (FIELD_SIZE * y + x));
        if (!squareEl) {
            throw new Error(`square-${FIELD_SIZE * y + x} was not found.`);
        }
        if (asset instanceof House) {
            // クラスをリセットする
            squareEl.classList.remove(asset.className);
            // 適切な画像表示のため、状況に応じたクラスを付与する
            // TODO：時間や状況に応じたclassNameを再検討する
            // TODO：寝ているときはnight-houseにする
            if (asset.owner.pos.x === x && asset.owner.pos.y === y) {
                // 所有者が家にいる場合
                if (isNight()) {
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
                if (isNight()) {
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
    for (let i = 0; i < FIELD_SIZE; i++) {
        for (let j = 0; j < FIELD_SIZE; j++) {
            const squareEl = document.getElementById("square-" + (FIELD_SIZE * i + j));
            if (!squareEl)
                throw new Error(`square-${FIELD_SIZE * i + j} was not found.`);
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
    timeEl.textContent = `現在の時刻 ${gameState.time.h} : ${gameState.time.m}`;
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
/**
 * Squareがクリックされたときに呼ばれ、現在のモードに従って処理を行う
 */
function handleClickSquare(x, y) {
    switch (gameState.mode) {
        case 'neutral':
            console.log(FIELD_SIZE * y + x);
            break;
        case 'addHuman':
            // 指定の場所に人を追加する
            const newHuman = new Human();
            newHuman.homePos = { x, y };
            newHuman.pos = { x, y };
            addHuman(newHuman);
            // 盤面を更新する
            drawField();
            // ヒト追加モードを抜ける
            exitAddHumanMode();
            break;
        case 'selectHuman':
            const humans = getHumansFromPos({ x, y });
            // 指定の場所に人がいなければ何もしない
            if (humans.length == 0) {
                return;
            }
            // 指定の場所の人の選択状態を反転させる
            // （複数人の場合はリストの先頭）
            humans[0].isSelected = !humans[0].isSelected;
            // 盤面を更新する
            drawField();
            // 選択モードを抜ける
            exitSelectHumanMode();
            break;
    }
}
/**
 * gameStateに人と家を追加
 */
function addHuman(newHuman) {
    const { x, y } = newHuman.pos;
    // 人を追加
    gameState.humans.push(newHuman);
    // 家を追加
    gameState.assets.push(new House({ x, y }, newHuman));
}
/**
 * 位置の選択モードに遷移し、Square上でホバーすると色が変わるようになる
 */
function enterAddHumanMode() {
    for (let i = 0; i < FIELD_SIZE; i++) {
        for (let j = 0; j < FIELD_SIZE; j++) {
            const squareEl = document.getElementById("square-" + (FIELD_SIZE * i + j));
            if (!squareEl)
                throw new Error(`square-${FIELD_SIZE * i + j} was not found.`);
            // ホバー時に色が変わるようにクラスを追加
            squareEl.classList.add('human-add-mode');
            // 選択モードに遷移する
            gameState.mode = 'addHuman';
        }
    }
}
/**
 * ニュートラルモードに遷移し、Square上でホバーしても色が変わらないようにする
 */
function exitAddHumanMode() {
    for (let i = 0; i < FIELD_SIZE; i++) {
        for (let j = 0; j < FIELD_SIZE; j++) {
            const squareEl = document.getElementById("square-" + (FIELD_SIZE * i + j));
            if (!squareEl)
                throw new Error(`square-${FIELD_SIZE * i + j} was not found.`);
            /* ホバー時に色が変わるクラスを除去 */
            squareEl.classList.remove('human-add-mode');
            /* ニュートラルモードに遷移する */
            gameState.mode = 'neutral';
        }
    }
}
/**
 * 吹き出しを表示する人を選択するモードに遷移する
 */
function enterSelectHumanMode() {
    gameState.mode = 'selectHuman';
}
/**
 * ニュートラルモードに遷移する
 */
function exitSelectHumanMode() {
    gameState.mode = 'neutral';
}
/**
 * ある座標にいる人の検索し、配列にして返す
 * @param pos 座標
 * @returns その座標にいる人の配列
 */
function getHumansFromPos(pos) {
    const retHumans = [];
    gameState.humans.forEach((human) => {
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
    if (gameState.time.h >= 18 || gameState.time.h <= 6) {
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
    const x = Math.floor(Math.random() * FIELD_SIZE);
    const y = Math.floor(Math.random() * FIELD_SIZE);
    return { x, y };
}
//# sourceMappingURL=index.js.map