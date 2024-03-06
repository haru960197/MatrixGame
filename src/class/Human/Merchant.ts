import { Human, Character } from "./Human";
import { gameState, Position } from "../../game";
import { Task } from "../Task/Task";

export class Merchant extends Human {
    /**
     * 1単位時間過ごす
     */
    spendTime(): void {
        // タスクを完了している場合、次のタスクを決める
        if (!this.task) {
            this.determineTask();
        }

        // タスクに従って行動する
        switch (this.task?.what) {
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
    determineTask(): void {
        // TODO タスクの数を増やす
        // TODO タスクを現在のパラメータに従って決めるように変更
        if (16 < gameState.time.h) {
            // 寝る
            console.log("眠ります");
            this.task = { what: 'sleep', where: this.homePos }
        } else {
            // 散歩する
            console.log("(5, 5)へ向かいます");
            this.task = { what: 'walking', where: { x: 5, y: 5 } }
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