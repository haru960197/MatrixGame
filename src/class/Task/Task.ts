import { Human } from "../Human/Human";
import { gameState, Position, FIELD_SIZE } from "../../game";

export class Task {
    what: TaskType;
    where: Position;

    static handleSleep(human: Human): void {
        if (5 < gameState.time.h && gameState.time.h < 16) {
            // 朝
            if (6 < Math.floor(Math.random() * 10))
                // 一定確率で起きる
                human.task = null;
        } else {
            // 夜
            if (human.pos.x === human.homePos.x && human.pos.y === human.homePos.y) {
                // 家にいれば寝たまま何もしない
                return;
            } else {
                // 出先なので、家に帰る
                human.headToDest(human.homePos);
            }
        }
    }

    static handleWalking(human: Human): void {
        if (!human.task) return;
        if (human.pos.x === human.task.where.x && human.pos.y === human.task.where.y) {
            // 目的地に到着したのでタスクを終了
            human.task = null;
        } else {
            // 目的地に向かう
            human.headToDest(human.task.where);
        }
    }

    constructor(what: TaskType, where: Position) {
        if (where.x < 0 || FIELD_SIZE <= where.x
            || where.y < 0 || FIELD_SIZE <= where.y) {
            throw new Error('Position must be 0 <= x < FIELD_SIZE');
        }
        this.what = what;
        this.where = where;
    }
}

type TaskType = 'sleep' | 'walking';