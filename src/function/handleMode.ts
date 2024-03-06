import { FIELD_SIZE, gameState } from "../game";

export type InterfaceMode = "neutral" | "addHuman" | "selectHuman";

/**
 * 位置の選択モードに遷移し、Square上でホバーすると色が変わるようになる
 */
export function enterAddHumanMode(): void {
    for (let i = 0; i < FIELD_SIZE; i++) {
        for (let j = 0; j < FIELD_SIZE; j++) {
            const squareEl = document.getElementById("square-" + (FIELD_SIZE * i + j));
            if (!squareEl)
                throw new Error(`square-${FIELD_SIZE * i + j} was not found.`);
            // ホバー時に色が変わるようにクラスを追加
            squareEl.classList.add('human-add-mode')
            // 選択モードに遷移する
            gameState.mode = 'addHuman';
        }
    }
}

/**
 * ニュートラルモードに遷移し、Square上でホバーしても色が変わらないようにする
 */
export function exitAddHumanMode(): void {
    for (let i = 0; i < FIELD_SIZE; i++) {
        for (let j = 0; j < FIELD_SIZE; j++) {
            const squareEl = document.getElementById("square-" + (FIELD_SIZE * i + j));
            if (!squareEl)
                throw new Error(`square-${FIELD_SIZE * i + j} was not found.`);
            /* ホバー時に色が変わるクラスを除去 */
            squareEl.classList.remove('human-add-mode')
            /* ニュートラルモードに遷移する */
            gameState.mode = 'neutral';
        }
    }
}

/**
 * 吹き出しを表示する人を選択するモードに遷移する
 */
export function enterSelectHumanMode(): void {
    gameState.mode = 'selectHuman';
}

/**
 * ニュートラルモードに遷移する
 */
export function exitSelectHumanMode(): void {
    gameState.mode = 'neutral';
}