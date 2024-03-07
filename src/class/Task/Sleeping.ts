import { Human } from "../Human/Human";
import { gameState, Position } from "../../game";
import { Task } from "./Task";
import { isNight } from "../../function/utils";

export class Sleeping extends Task {
    isSleeping: boolean;

    handleSleep(human: Human): void {
        if (isNight()) {
            // 夜
            if (human.pos.x === human.homePos.x && human.pos.y === human.homePos.y) {
                // 家にいる
                if (!this.isSleeping) {
                    // まだ寝ていないので、時間に応じた確率で寝る
                    // TODO : 性格などの値も考慮したい
                    const r = Math.floor(Math.random() * 10);
                    const h = gameState.time.h;
                    let threshold: number;
                    // 閾値は、夜が更けるほど小さくなる
                    if (h < 12) {
                        // AM
                        threshold = -(5/4) * h + 5;
                    } else {
                        // PM
                        threshold = -(5/6) * (h - 24) + 5;
                    }

                    if (threshold < r) {
                        // ランダムな値が閾値を超えたら寝る
                        this.isSleeping = true;
                    }
                }
            } else {
                // 出先なので、家に帰る
                human.headToDest(human.homePos);
            }
        } else {
            // 朝
            const r = Math.floor(Math.random() * 10);
            const h = gameState.time.h;
            // TODO : 性格などの値も考慮したい
            const threshold = -5/2 * (h - 7) + 5;
            if (threshold < r) {
                // 起きる
                human.task = null;
            }
        } 
    }

    constructor(where: Position) {
        super(where);
        this.isSleeping = false;
    }
}