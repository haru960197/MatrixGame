import { Human } from "./Human";
import { gameState } from "../../game";
import { Sleeping } from "../Task/Sleeping";
import { Walking } from "../Task/Walking";
import { getAssetFromPos, getRandomPos } from "../../function/utils";
export class Merchant extends Human {
    /**
     * ランダムにタスクを決める
     */
    determineTask() {
        // TODO タスクの数を増やす
        // TODO タスクを現在のパラメータに従って決めるように変更
        if (16 < gameState.time.h) {
            // 寝る
            console.log("眠ります");
            this.task = new Sleeping(this.homePos);
        }
        else {
            // 散歩する
            let dest = getRandomPos();
            // 目的地がアセットであってはならない
            while (getAssetFromPos(dest) !== undefined)
                dest = getRandomPos();
            console.log(`(${dest.x}, ${dest.y})へ向かいます`);
            this.task = new Walking(dest);
        }
    }
    constructor(name = `Human${Human.humanNum}`, homePos = { x: 0, y: 0 }, hp = 100, color = "#FF0000", character = { wisdom: 0.5 }, isSelected = false) {
        super(name, homePos, hp, "merchant", color, character, isSelected);
    }
}
//# sourceMappingURL=Merchant.js.map