interface HTMLEvent<T extends EventTarget> extends Event {
    target: T;
}

type Job = 'farmer' | 'merchant';

type Position = {
    x: number,
    y: number,
}

type Character = {
    wisdom: number;
}

class Task {
    what: 'sleep' | 'walking';
    where: Position;

    static handleSleep(human: Human): void {
        // 一定確率で寝るのをやめる
        if (5 < Math.floor(Math.random() * 10)) {
            // TODO : 現在の時間を考慮する
            human.task = null;
            return;
        }  
        
        if (human.pos.x === human.homePos.x && human.pos.y === human.homePos.y) {
            // 家にいれば寝たまま何もしない
            return;
        } else {
            // 出先なので、家に帰る
            human.headToDest(human.homePos);
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

class Human {
    static humanNum = 1;
    name: string;
    private _pos: Position;
    homePos: Position;
    hp: number;
    job: Job;
    color: string;
    character: Character;
    isSelected: boolean;
    task: Task | null;

    get pos(): Position {
        return this._pos;
    }

    set pos(newPos: Position) {
        if (newPos.x < 0 || FIELD_SIZE <= newPos.x
            || newPos.y < 0 || FIELD_SIZE <= newPos.y) {
            throw new Error('Position must be 0 <= x < FIELD_SIZE');
        }
        this._pos = newPos;
    }

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
        // 0 ~ 10 のランダムな値を取得
        const r = Math.floor(Math.random() * 10);

        // TODO タスクの数を増やす
        // TODO タスクを現在のパラメータに従って決めるように変更
        if (r < 5) {
            // 寝る
            console.log("眠ります");
            this.task = { what: 'sleep', where: this.homePos }
        } else if (r < 10) {
            // 散歩する
            console.log("散歩します");
            this.task = { what: 'walking', where: { x: 5, y: 5 }}
        }
    }

    /**
     * 目的地に向かって1マス進む
     * @param dest 目的地
     */
    headToDest(dest: Position): void {
        const INF = 100000;
        const V = FIELD_SIZE * FIELD_SIZE;

        // 隣接行列を作成
        const cost: number[][] = Array.from({ length: V })
                                    .map(n => Array.from({ length: V }).map(n => INF));
        for (let y = 0; y < FIELD_SIZE; y++) {
            for (let x = 0; x < FIELD_SIZE; x++) {
                if (y == 0 && x == 0) {
                    // 左上の隅
                    cost[FIELD_SIZE * y + x][FIELD_SIZE * y + (x + 1)] = 1;
                    cost[FIELD_SIZE * y + x][FIELD_SIZE * (y + 1) + x] = 1;
                } else if (y == 0 && x == FIELD_SIZE - 1) {
                    // 右上の隅
                    cost[FIELD_SIZE * y + x][FIELD_SIZE * y + (x - 1)] = 1;
                    cost[FIELD_SIZE * y + x][FIELD_SIZE * (y + 1) + x] = 1;
                } else if (y == FIELD_SIZE - 1 && x == 0) {
                    // 左下の隅
                    cost[FIELD_SIZE * y + x][FIELD_SIZE * (y - 1) + x] = 1;
                    cost[FIELD_SIZE * y + x][FIELD_SIZE * y + (x + 1)] = 1;
                } else if (y == FIELD_SIZE - 1 && x == FIELD_SIZE - 1) {
                    // 右下の隅
                    cost[FIELD_SIZE * y + x][FIELD_SIZE * (y - 1) + x] = 1;
                    cost[FIELD_SIZE * y + x][FIELD_SIZE * y + (x - 1)] = 1;
                } else if (y == 0) {
                    // 上辺
                    cost[FIELD_SIZE * y + x][FIELD_SIZE * y + (x - 1)] = 1; // ←
                    cost[FIELD_SIZE * y + x][FIELD_SIZE * (y + 1) + x] = 1; // ↓
                    cost[FIELD_SIZE * y + x][FIELD_SIZE * y + (x + 1)] = 1; // →
                } else if (x == 0) {
                    // 左辺
                    cost[FIELD_SIZE * y + x][FIELD_SIZE * (y - 1) + x] = 1; // ↑
                    cost[FIELD_SIZE * y + x][FIELD_SIZE * y + (x + 1)] = 1; // →
                    cost[FIELD_SIZE * y + x][FIELD_SIZE * (y + 1) + x] = 1; // ↓
                } else if (x == FIELD_SIZE - 1) {
                    // 右辺
                    cost[FIELD_SIZE * y + x][FIELD_SIZE * (y - 1) + x] = 1; // ↑
                    cost[FIELD_SIZE * y + x][FIELD_SIZE * y + (x - 1)] = 1; // ←
                    cost[FIELD_SIZE * y + x][FIELD_SIZE * (y + 1) + x] = 1; // ↓
                } else if (y == FIELD_SIZE - 1) {
                    // 下辺
                    cost[FIELD_SIZE * y + x][FIELD_SIZE * y + (x - 1)] = 1; // ←
                    cost[FIELD_SIZE * y + x][FIELD_SIZE * (y - 1) + x] = 1; // ↑
                    cost[FIELD_SIZE * y + x][FIELD_SIZE * y + (x + 1)] = 1; // →
                } else {
                    cost[FIELD_SIZE * y + x][FIELD_SIZE * (y - 1) + x] = 1; // ↑
                    cost[FIELD_SIZE * y + x][FIELD_SIZE * y + (x + 1)] = 1; // →
                    cost[FIELD_SIZE * y + x][FIELD_SIZE * (y + 1) + x] = 1; // ↓
                    cost[FIELD_SIZE * y + x][FIELD_SIZE * y + (x - 1)] = 1; // ←
                }
            }
        }
        
        // 現在の座標から目的地の座標までの最短経路をdijkstraで求める
        const d: number[] = Array.from({ length: V }).map(n => INF);
        const used: boolean[] = Array.from({ length: V }).map(n => false);
        d[FIELD_SIZE * this.pos.y + this.pos.x] = 0;
        const prevPos: Position[] = Array.from({ length: V }).map(n => ({ x: -1, y: -1 })); // 最短経路の直前の頂点
        
        while (true) {
            let v = -1;
            
            for (let u = 0; u < V; u++) {
                if (!used[u] && (v == -1 || d[u] < d[v])) v = u;
            }

            if (v == -1) break;
            used[v] = true;

            for (let u = 0; u < V; u++) {
                d[u] = Math.min(d[u], d[v] + cost[v][u]);
                prevPos[u] = { x: v % FIELD_SIZE, y: v / FIELD_SIZE };
            }
        }

        // destから現在地curPosへの最短経路を求める
        const destToCurPosPath = new Array<Position>();
        let t : Position = dest;
        for (; t.x !== -1 && t.y !== -1; prevPos[FIELD_SIZE * t.y + t.x]) {
            destToCurPosPath.push(t);
        }

        this.pos = destToCurPosPath[destToCurPosPath.length - 1];
    }

    constructor(
        name: string = `Human${Human.humanNum}`,
        homePos: Position = {x: 0, y: 0},
        hp: number = 100,
        job: Job = "farmer",
        color: string = "#FF0000",
        character: Character = { wisdom: 0.5 },
        isSelected: boolean = false,
    ) {
        Human.humanNum++;
        this.name = name;
        this.homePos = homePos;
        this.pos = homePos;
        this.hp = hp;
        this.job = job;
        this.color = color;
        this.character = character;
        this.isSelected = isSelected;
        this.task = null;
    }
}

type Time = {
    d: number;
    h: number;
    m: number;
}

type InterfaceMode = "neutral" | "addHuman" | "selectHuman";

type GameState = {
    time: Time;
    mode: InterfaceMode;
    humans: Human[];
}