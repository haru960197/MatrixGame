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

    /**
     * 目的地に向かって1マス進む
     * @param dest 目的地
     */
    headToDest(dest: Position): void {
        const INF = 100000;
        const V = FIELD_SIZE * FIELD_SIZE;

        // 隣接行列を作成
        // const cost: number[][] = Array.from({ length: V })
        //                             .map(n => Array.from({ length: V }).map(n => INF));
        const cost: number[][] = [];
        for (let i = 0; i < V; i++) {
            const subArray: number[] = [];
            for (let j = 0; j < V; j++) {
                subArray.push(INF);
            }
            cost.push(subArray);
        }
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
        // const d: number[] = Array.from({ length: V }).map(n => INF);
        const d: number[] = [];
        for (let i = 0; i < V; i++) d.push(INF);
        // const used: boolean[] = Array.from({ length: V }).map(n => false);
        const used: boolean[] = [];
        for (let i = 0; i < V; i++) used.push(false);
        d[FIELD_SIZE * this.pos.y + this.pos.x] = 0;
        // const prevPos: Position[] = Array.from({ length: V }).map(n => ({ x: -1, y: -1 })); // 最短経路の直前の頂点
        const prevPos: Position[] = [];
        for (let i = 0; i < V; i++) prevPos.push({ x: -1, y: -1 });

        while (true) {
            let v = -1;

            for (let u = 0; u < V; u++) {
                if (!used[u] && (v === -1 || d[u] < d[v])) v = u;
            }

            if (v === -1) break;
            used[v] = true;

            for (let u = 0; u < V; u++) {
                if (d[u] > d[v] + cost[v][u]) {
                    d[u] = Math.min(d[u], d[v] + cost[v][u]);
                    prevPos[u] = { x: v % FIELD_SIZE, y: Math.floor(v / FIELD_SIZE) };
                }
            }
        }

        // destから現在地curPosへの最短経路を求める
        const destToCurPosPath: Position[] = [];
        let t: Position = dest;
        for (; !(t.x === -1 && t.y === -1); t = prevPos[FIELD_SIZE * t.y + t.x]) {
            destToCurPosPath.push(t);
        }

        this.pos = destToCurPosPath[destToCurPosPath.length - 2];
    }

    constructor(
        name: string = `Human${Human.humanNum}`,
        homePos: Position = { x: 0, y: 0 },
        hp: number = 100,
        job: Job = "farmer",
        color: string = "#FF0000",
        character: Character = { wisdom: 0.5 },
        isSelected: boolean = false,
    ) {
        if (homePos.x < 0 || FIELD_SIZE <= homePos.x
            || homePos.y < 0 || FIELD_SIZE <= homePos.y) {
            throw new Error('Position must be 0 <= x < FIELD_SIZE');
        }
        Human.humanNum++;
        this.name = name;
        this.homePos = homePos;
        this._pos = homePos;
        this.hp = hp;
        this.job = job;
        this.color = color;
        this.character = character;
        this.isSelected = isSelected;
        this.task = null;
    }
}

abstract class Asset {
    pos: Position;
    owner: Human;

    constructor(pos: Position, owner: Human) {
        if (pos.x < 0 || pos.x >= FIELD_SIZE || pos.y < 0 || pos.y >= FIELD_SIZE) {
            throw new Error(`pos.x, pox.y must be in 0 <= a < FIELD_SIZE`);
        }
        this.pos = pos;
        this.owner = owner;
    }
}

class House extends Asset {
    className: "normal-house" | "evening-house" | "night-house" | "sleeping-house";

    constructor(pos: Position, owner: Human) {
        super(pos, owner);
        this.className = "normal-house";
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
    assets: Asset[];
}