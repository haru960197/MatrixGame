let intervalId: number;
let isLooping: boolean;

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

let gameState: GameState = {
    time: { d: 1, h: 14, m: 30 },
    mode: "neutral",
    humans: [],
    assets: [],
}

/**
 * 1単位時間ごとに呼ばれる関数
 */
function intervalFunc(): void {
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
function switchInterval(): void {
    if (isLooping) {
        clearInterval(intervalId);
        isLooping = false;
    } else {
        intervalId = setInterval(intervalFunc, 1000);
        isLooping = true;
    }
}

/**
 * FIELD_SIZE * FIELD_SIZE の盤面を作成する
 */
function createField(): void {
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

// ================= type ================

type GameState = {
    time: Time;
    mode: InterfaceMode;
    humans: Human[];
    assets: Asset[];
}

type Time = {
    d: number;
    h: number;
    m: number;
}

interface HTMLEvent<T extends EventTarget> extends Event {
    target: T;
}

type Position = {
    x: number,
    y: number,
}