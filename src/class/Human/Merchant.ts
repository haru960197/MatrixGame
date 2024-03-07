import { Human, Character } from "./Human";
import { gameState, Position } from "../../game";
import { Sleeping } from "../Task/Sleeping";
import { Walking } from "../Task/Walking";
import { getRandomPos } from "../../function/utils";

export class Merchant extends Human {
    /**
     * ランダムにタスクを決める
     */
    determineTask(): void {
        // TODO タスクの数を増やす
        // TODO タスクを現在のパラメータに従って決めるように変更
        if (16 < gameState.time.h) {
            // 寝る
            console.log("眠ります");
            this.task = new Sleeping(this.homePos);
        } else {
            // 散歩する
            const dest: Position = getRandomPos();
            console.log(`(${dest.x}, ${dest.y})へ向かいます`);
            this.task = new Walking(dest);
        }
    }

    constructor(
        name: string = `Human${Human.humanNum}`,
        homePos: Position = { x: 0, y: 0 },
        hp: number = 100,
        color: string = "#FF0000",
        character: Character = { wisdom: 0.5 },
        isSelected: boolean = false,
    ) {
        super(name, homePos, hp, "merchant", color, character, isSelected);
    }
}