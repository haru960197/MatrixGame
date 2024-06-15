import { gameState, FIELD_SIZE } from "../game";
import { House } from "../class/Asset/House";
import { isNight } from "./utils";
import { Sleeping } from "../class/Task/Sleeping";
/**
 * gameStateに従って盤面を更新する
 * 選択中の人の上には吹き出しを表示する
 */
export function drawField() {
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
            if (asset.isThereOwner()) {
                if (asset.owner.task instanceof Sleeping
                    && asset.owner.task.isSleeping) {
                    asset.className = 'sleeping-house';
                }
                else if (isNight()) {
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
            // 各マスの文字列を空文字列にリセット
            squareEl.textContent = "";
        }
    }
}
/**
 * 表示されている時刻を更新する
 */
export function drawTime() {
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
export function createBalloon(human) {
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
//# sourceMappingURL=draw.js.map