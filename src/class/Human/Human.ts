import { Position } from "../../game";
import { Task } from "../Task/Task";
import { FIELD_SIZE } from "../../game";

export abstract class Human {
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
     * MODIFIES : this.hp, this.task
     */
    abstract spendTime(): void;

    /**
     * ランダムにタスクを決める
     */
    abstract determineTask(): void;

    /**
     * 目的地に向かって1マス進む
     * @param dest 目的地
     */
    headToDest(dest: Position): void {
        // 現在の座標から目的地の座標までの最短経路をdijkstraで求める
        const d: number[] = Array.from({ length: V }).map(n => INF);
        const used: boolean[] = Array.from({ length: V }).map(n => false);
        d[FIELD_SIZE * this.pos.y + this.pos.x] = 0;
        // 最短経路の直前の頂点
        const prevPos: Position[] = Array.from({ length: V }).map(n => ({ x: -1, y: -1 }));

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

export type Job = 'farmer' | 'merchant';

export type Character = {
    wisdom: number;
}

/**
 * dijkstraに必要な変数
 */
const INF = 100000;
const V = FIELD_SIZE * FIELD_SIZE;
// 隣接行列
// TODO : Assetをよけるために、Assetの位置をcostに反映させる
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