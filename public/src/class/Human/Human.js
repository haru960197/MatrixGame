import { gameState } from "../../game";
import { FIELD_SIZE } from "../../game";
import { Sleeping } from "../Task/Sleeping";
import { Walking } from "../Task/Walking";
import { getAssetFromPos } from "../../function/utils";
export class Human {
    static humanNum = 1;
    timeCounter = 0;
    name;
    _pos;
    homePos;
    _hp;
    job;
    color;
    character;
    isSelected;
    task;
    get pos() {
        return this._pos;
    }
    set pos(newPos) {
        if (newPos.x < 0 || FIELD_SIZE <= newPos.x
            || newPos.y < 0 || FIELD_SIZE <= newPos.y) {
            throw new Error('Position must be 0 <= x < FIELD_SIZE');
        }
        this._pos = newPos;
    }
    get hp() { return this._hp; }
    /**
     * hpを更新する。0以下になった場合gameState.humansから自身を削除
     * @param deltaHp hpの変化量
     */
    changeHp(deltaHp) {
        this._hp += deltaHp;
        if (this.hp <= 0) {
            // 死亡したので、世界から自分を消去
            // TODO : もし死亡した人も管理するならここを編集
            gameState.humans = gameState.humans.filter((human) => human !== this);
        }
    }
    /**
     * 1単位時間過ごす
     */
    spendTime() {
        // タスクを完了している場合、次のタスクを決める
        if (!this.task) {
            this.determineTask();
        }
        // タスクに従って行動する
        if (this.task instanceof Sleeping) {
            this.task.handleSleep(this);
        }
        else if (this.task instanceof Walking) {
            Walking.handleWalking(this);
        }
        // hpを更新する（基礎代謝）
        this.timeCounter += 1;
        this.timeCounter %= 3;
        if (this.timeCounter === 0) {
            this.changeHp(-1);
        }
    }
    /**
     * 目的地に向かって1マス進む
     * @param dest 目的地
     */
    headToDest(dest) {
        // 現在の座標から目的地の座標までの最短経路をdijkstraで求める
        const d = Array.from({ length: V }).map(n => INF);
        const used = Array.from({ length: V }).map(n => false);
        d[FIELD_SIZE * this.pos.y + this.pos.x] = 0;
        // 最短経路の直前の頂点
        const prevPos = Array.from({ length: V }).map(n => ({ x: -1, y: -1 }));
        const destIsAsset = getAssetFromPos(dest) !== undefined;
        if (destIsAsset) {
            // 目的地点がアセットならば、障害物でなくする
            removeObstacleFromCostMap(dest);
        }
        while (true) {
            let v = -1;
            for (let u = 0; u < V; u++) {
                if (!used[u] && (v === -1 || d[u] < d[v]))
                    v = u;
            }
            if (v === -1)
                break;
            used[v] = true;
            for (let u = 0; u < V; u++) {
                if (d[u] > d[v] + cost[v][u]) {
                    d[u] = Math.min(d[u], d[v] + cost[v][u]);
                    prevPos[u] = { x: v % FIELD_SIZE, y: Math.floor(v / FIELD_SIZE) };
                }
            }
        }
        // destから現在地curPosへの最短経路を求める
        const destToCurPosPath = [];
        let t = dest;
        for (; !(t.x === -1 && t.y === -1); t = prevPos[FIELD_SIZE * t.y + t.x]) {
            destToCurPosPath.push(t);
        }
        this.pos = destToCurPosPath[destToCurPosPath.length - 2];
        if (destIsAsset) {
            // 目的地点がアセットならば、再び障害物として登録する
            addObstacleToCostMap(dest);
        }
    }
    constructor(name = `Human${Human.humanNum}`, homePos = { x: 0, y: 0 }, hp = 100, job = "farmer", color = "#FF0000", character = { wisdom: 0.5 }, isSelected = false) {
        if (homePos.x < 0 || FIELD_SIZE <= homePos.x
            || homePos.y < 0 || FIELD_SIZE <= homePos.y) {
            throw new Error('Position must be 0 <= x < FIELD_SIZE');
        }
        Human.humanNum++;
        this.name = name;
        this.homePos = homePos;
        this._pos = homePos;
        this._hp = hp;
        this.job = job;
        this.color = color;
        this.character = character;
        this.isSelected = isSelected;
        this.task = null;
    }
}
// dijkstraに必要な変数
const INF = 100000;
const V = FIELD_SIZE * FIELD_SIZE;
// 隣接行列
const cost = Array.from({ length: V })
    .map(n => Array.from({ length: V }).map(n => INF));
// 隣接行列を初期化
for (let y = 0; y < FIELD_SIZE; y++)
    for (let x = 0; x < FIELD_SIZE; x++)
        registerSquareToCostMap({ x, y });
/**
 * あるマスから、その上下左右のマスに移動できるようにcostマップに登録する
 * @param pos 登録するマスの位置
 */
function registerSquareToCostMap(pos) {
    const deltaPositions = [
        { x: -1, y: 0 },
        { x: 0, y: -1 },
        { x: +1, y: 0 },
        { x: 0, y: +1 },
    ];
    // posの上下左右のマスへ、posからエッジを生やす
    deltaPositions.forEach((deltaPos) => {
        const x = pos.x + deltaPos.x;
        const y = pos.y + deltaPos.y;
        if (x < 0 || x >= FIELD_SIZE || y < 0 || y >= FIELD_SIZE)
            return;
        else
            cost[FIELD_SIZE * pos.y + pos.x][FIELD_SIZE * y + x] = 1;
    });
}
/**
 * costマップから障害物（通れないマス）を取り除く
 * @param pos 障害物の位置
 */
export function removeObstacleFromCostMap(pos) {
    const deltaPositions = [
        { x: -1, y: 0 },
        { x: 0, y: -1 },
        { x: +1, y: 0 },
        { x: 0, y: +1 },
    ];
    // posの上下左右のマスから、posへのエッジを生やして、posに行けるようにする
    deltaPositions.forEach((deltaPos) => {
        const x = pos.x + deltaPos.x;
        const y = pos.y + deltaPos.y;
        if (x < 0 || x >= FIELD_SIZE || y < 0 || y >= FIELD_SIZE)
            return;
        else
            cost[FIELD_SIZE * y + x][FIELD_SIZE * pos.y + pos.x] = 1;
    });
}
/**
 * costマップに障害物（通れないマス）を登録する
 * @param pos 障害物の位置
 */
export function addObstacleToCostMap(pos) {
    const deltaPositions = [
        { x: -1, y: 0 },
        { x: 0, y: -1 },
        { x: +1, y: 0 },
        { x: 0, y: +1 },
    ];
    // posの上下左右のマスから、posへのエッジを消して、posに行けないようにする
    deltaPositions.forEach((deltaPos) => {
        const x = pos.x + deltaPos.x;
        const y = pos.y + deltaPos.y;
        if (x < 0 || x >= FIELD_SIZE || y < 0 || y >= FIELD_SIZE)
            return;
        else
            cost[FIELD_SIZE * y + x][FIELD_SIZE * pos.y + pos.x] = INF;
    });
}
//# sourceMappingURL=Human.js.map