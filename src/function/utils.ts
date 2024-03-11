import { Position, gameState } from "../game";
import { Human } from "../class/Human/Human";
import { FIELD_SIZE } from "../game";
import { Asset } from "../class/Asset/Asset";

/**
 * ある座標にいる人の検索し、配列にして返す
 * @param pos 座標
 * @returns その座標にいる人の配列
 */
export function getHumansFromPos(pos: Position): Human[] {
    const retHumans: Human[] = [];
    gameState.humans.forEach((human) => {
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
export function getAssetFromPos(pos: Position): Asset | undefined {
    return gameState.assets.find((asset) => {
        return asset.pos.x === pos.x && asset.pos.y === pos.y;
    });
}

/**
 * gameState.timeに従って夜か否かを返す
 * @returns 夜であるか否か
 */
export function isNight(): boolean {
    if (gameState.time.h >= 18 || gameState.time.h <= 6) {
        return true;
    } else {
        return false;
    }
}

/**
 * ランダムな位置を生成し、返す
 * @returns [x, y]
 */
export function getRandomPos(): Position {
    const x = Math.floor(Math.random() * FIELD_SIZE);
    const y = Math.floor(Math.random() * FIELD_SIZE);
    return { x, y };
}