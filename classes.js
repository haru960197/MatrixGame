var Task = /** @class */ (function () {
    function Task() {
    }
    Task.handleSleep = function (human) {
        // 一定確率で寝るのをやめる
        if (5 < Math.floor(Math.random() * 10)) {
            // TODO : 現在の時間を考慮する
            human.task = null;
            return;
        }
        if (human.pos.x === human.homePos.x && human.pos.y === human.homePos.y) {
            // 家にいれば寝たまま何もしない
            return;
        }
        else {
            // 出先なので、家に帰る
            human.headToDest(human.homePos);
        }
    };
    Task.handleWalking = function (human) {
        if (!human.task)
            return;
        if (human.pos.x === human.task.where.x && human.pos.y === human.task.where.y) {
            // 目的地に到着したのでタスクを終了
            human.task = null;
        }
        else {
            // 目的地に向かう
            human.headToDest(human.task.where);
        }
    };
    return Task;
}());
var Human = /** @class */ (function () {
    function Human(name, homePos, hp, job, color, character, isSelected) {
        if (name === void 0) { name = "Human".concat(Human.humanNum); }
        if (homePos === void 0) { homePos = { x: 0, y: 0 }; }
        if (hp === void 0) { hp = 100; }
        if (job === void 0) { job = "farmer"; }
        if (color === void 0) { color = "#FF0000"; }
        if (character === void 0) { character = { wisdom: 0.5 }; }
        if (isSelected === void 0) { isSelected = false; }
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
    Object.defineProperty(Human.prototype, "pos", {
        get: function () {
            return this._pos;
        },
        set: function (newPos) {
            if (newPos.x < 0 || FIELD_SIZE <= newPos.x
                || newPos.y < 0 || FIELD_SIZE <= newPos.y) {
                throw new Error('Position must be 0 <= x < FIELD_SIZE');
            }
            this._pos = newPos;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 1単位時間過ごす
     */
    Human.prototype.spendTime = function () {
        var _a;
        // タスクを完了している場合、次のタスクを決める
        if (!this.task) {
            this.determineTask();
        }
        // タスクに従って行動する
        switch ((_a = this.task) === null || _a === void 0 ? void 0 : _a.what) {
            case 'sleep':
                Task.handleSleep(this);
                break;
            case 'walking':
                Task.handleWalking(this);
                break;
        }
        // TODO : hpを更新する
    };
    /**
     * ランダムにタスクを決める
     */
    Human.prototype.determineTask = function () {
        // 0 ~ 10 のランダムな値を取得
        var r = Math.floor(Math.random() * 10);
        // TODO タスクの数を増やす
        // TODO タスクを現在のパラメータに従って決めるように変更
        if (r < 5) {
            // 寝る
            console.log("眠ります");
            this.task = { what: 'sleep', where: this.homePos };
        }
        else if (r < 10) {
            // 散歩する
            console.log("散歩します");
            this.task = { what: 'walking', where: { x: 5, y: 5 } };
        }
    };
    /**
     * 目的地に向かって1マス進む
     * @param dest 目的地
     */
    Human.prototype.headToDest = function (dest) {
        var INF = 100000;
        var V = FIELD_SIZE * FIELD_SIZE;
        // 隣接行列を作成
        var cost = Array.from({ length: V })
            .map(function (n) { return Array.from({ length: V }).map(function (n) { return INF; }); });
        for (var y = 0; y < FIELD_SIZE; y++) {
            for (var x = 0; x < FIELD_SIZE; x++) {
                if (y == 0 && x == 0) {
                    // 左上の隅
                    cost[FIELD_SIZE * y + x][FIELD_SIZE * y + (x + 1)] = 1;
                    cost[FIELD_SIZE * y + x][FIELD_SIZE * (y + 1) + x] = 1;
                }
                else if (y == 0 && x == FIELD_SIZE - 1) {
                    // 右上の隅
                    cost[FIELD_SIZE * y + x][FIELD_SIZE * y + (x - 1)] = 1;
                    cost[FIELD_SIZE * y + x][FIELD_SIZE * (y + 1) + x] = 1;
                }
                else if (y == FIELD_SIZE - 1 && x == 0) {
                    // 左下の隅
                    cost[FIELD_SIZE * y + x][FIELD_SIZE * (y - 1) + x] = 1;
                    cost[FIELD_SIZE * y + x][FIELD_SIZE * y + (x + 1)] = 1;
                }
                else if (y == FIELD_SIZE - 1 && x == FIELD_SIZE - 1) {
                    // 右下の隅
                    cost[FIELD_SIZE * y + x][FIELD_SIZE * (y - 1) + x] = 1;
                    cost[FIELD_SIZE * y + x][FIELD_SIZE * y + (x - 1)] = 1;
                }
                else if (y == 0) {
                    // 上辺
                    cost[FIELD_SIZE * y + x][FIELD_SIZE * y + (x - 1)] = 1; // ←
                    cost[FIELD_SIZE * y + x][FIELD_SIZE * (y + 1) + x] = 1; // ↓
                    cost[FIELD_SIZE * y + x][FIELD_SIZE * y + (x + 1)] = 1; // →
                }
                else if (x == 0) {
                    // 左辺
                    cost[FIELD_SIZE * y + x][FIELD_SIZE * (y - 1) + x] = 1; // ↑
                    cost[FIELD_SIZE * y + x][FIELD_SIZE * y + (x + 1)] = 1; // →
                    cost[FIELD_SIZE * y + x][FIELD_SIZE * (y + 1) + x] = 1; // ↓
                }
                else if (x == FIELD_SIZE - 1) {
                    // 右辺
                    cost[FIELD_SIZE * y + x][FIELD_SIZE * (y - 1) + x] = 1; // ↑
                    cost[FIELD_SIZE * y + x][FIELD_SIZE * y + (x - 1)] = 1; // ←
                    cost[FIELD_SIZE * y + x][FIELD_SIZE * (y + 1) + x] = 1; // ↓
                }
                else if (y == FIELD_SIZE - 1) {
                    // 下辺
                    cost[FIELD_SIZE * y + x][FIELD_SIZE * y + (x - 1)] = 1; // ←
                    cost[FIELD_SIZE * y + x][FIELD_SIZE * (y - 1) + x] = 1; // ↑
                    cost[FIELD_SIZE * y + x][FIELD_SIZE * y + (x + 1)] = 1; // →
                }
                else {
                    cost[FIELD_SIZE * y + x][FIELD_SIZE * (y - 1) + x] = 1; // ↑
                    cost[FIELD_SIZE * y + x][FIELD_SIZE * y + (x + 1)] = 1; // →
                    cost[FIELD_SIZE * y + x][FIELD_SIZE * (y + 1) + x] = 1; // ↓
                    cost[FIELD_SIZE * y + x][FIELD_SIZE * y + (x - 1)] = 1; // ←
                }
            }
        }
        // 現在の座標から目的地の座標までの最短経路をdijkstraで求める
        var d = Array.from({ length: V }).map(function (n) { return INF; });
        var used = Array.from({ length: V }).map(function (n) { return false; });
        d[FIELD_SIZE * this.pos.y + this.pos.x] = 0;
        var prevPos = Array.from({ length: V }).map(function (n) { return ({ x: -1, y: -1 }); }); // 最短経路の直前の頂点
        while (true) {
            var v = -1;
            for (var u = 0; u < V; u++) {
                if (!used[u] && (v == -1 || d[u] < d[v]))
                    v = u;
            }
            if (v == -1)
                break;
            used[v] = true;
            for (var u = 0; u < V; u++) {
                d[u] = Math.min(d[u], d[v] + cost[v][u]);
                prevPos[u] = { x: v % FIELD_SIZE, y: v / FIELD_SIZE };
            }
        }
        // destから現在地curPosへの最短経路を求める
        var destToCurPosPath = new Array();
        var t = dest;
        for (; t.x !== -1 && t.y !== -1; prevPos[FIELD_SIZE * t.y + t.x]) {
            destToCurPosPath.push(t);
        }
        this.pos = destToCurPosPath[destToCurPosPath.length - 1];
    };
    Human.humanNum = 1;
    return Human;
}());
