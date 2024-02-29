"use strict";
let intervalId;
// ページが読み込まれたときの処理
document.addEventListener("DOMContentLoaded", (e) => {
    intervalId = setInterval(() => {
        // 1秒ごとに盤面を更新する
        gameState.humans.forEach((human) => human.spendTime());
        // 時間を10分進める
        gameState.time.h = (gameState.time.h + 1) % 24;
        drawField();
        drawTime();
    }, 1000);
    createField();
    drawField();
    drawTime();
});
/**
 * デバッグ用。インターバルを止める
 */
function stopInterval() {
    clearInterval(intervalId);
}
/* 盤面のサイズ */
const FIELD_SIZE = 8;
let gameState = {
    time: { d: 1, h: 14, m: 30 },
    mode: "neutral",
    humans: [],
    assets: [],
};
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
            if (asset.owner.pos.x === x && asset.owner.pos.y === y) {
                // 所有者が家にいる場合
                if (isNight()) {
                    asset.className = 'evening-house';
                }
                else {
                    asset.className = 'normal-house';
                }
                // TODO：寝ているときはnight-houseにする
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
 * ランダムな位置を生成し、返す
 * @returns [x, y]
 */
function createRandomPos() {
    const x = Math.floor(Math.random() * FIELD_SIZE);
    const y = Math.floor(Math.random() * FIELD_SIZE);
    return { x, y };
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
function isNight() {
    if (gameState.time.h >= 18 || gameState.time.h <= 6) {
        return true;
    }
    else {
        return false;
    }
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
//# sourceMappingURL=index.js.map