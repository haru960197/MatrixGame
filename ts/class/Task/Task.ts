// TODO：Taskを抽象クラスにして、個別タスククラスを作成する
class Task {
    what: 'sleep' | 'walking';
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
}