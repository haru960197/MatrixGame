import { drawField, drawTime } from "./function/draw";
import { handleAddHumanClick, handleClickSquare } from "./function/handleAction";
import { enterSelectHumanMode } from "./function/handleMode";
import { FIELD_SIZE, gameState } from "./game";

let intervalId: number;
let isLooping: boolean;

// ページが読み込まれたときの処理
document.addEventListener("DOMContentLoaded", (e) => {
    // 1秒ごとにintervalFuncを実行するように設定
    intervalId = setInterval(intervalFunc, 1000);
    isLooping = true;

    // イベントハンドラーを登録
    document.getElementById("selectHumanButton")?.addEventListener("click", enterSelectHumanMode);
    document.getElementById("switchIntervalButton")?.addEventListener("click", switchInterval);
    document.getElementById("addHumanButton")?.addEventListener("click", handleAddHumanClick);

    // 描画
    createField();
    drawField();
    drawTime();
});

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
export function switchInterval(): void {
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