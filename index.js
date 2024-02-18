// ページが読み込まれたときの処理
document.addEventListener("DOMContentLoaded", function (e) {
    setInterval(function () {
        // 1秒ごとに盤面を更新する
        drawField();
    }, 1000);
    initGameState();
    createField();
});
/* 盤面のサイズ */
var FIELD_SIZE = 8;
var Human = /** @class */ (function () {
    function Human(name, pos, hp, job, color, character, isSelected) {
        if (name === void 0) { name = "Human".concat(Human.humanNum); }
        if (pos === void 0) { pos = { x: 0, y: 0 }; }
        if (hp === void 0) { hp = 100; }
        if (job === void 0) { job = "farmer"; }
        if (color === void 0) { color = "#FF0000"; }
        if (character === void 0) { character = { wisdom: 0.5 }; }
        if (isSelected === void 0) { isSelected = false; }
        Human.humanNum++;
        this.name = name;
        this.pos = pos;
        this.posQueue = [];
        this.hp = hp;
        this.job = job;
        this.color = color;
        this.character = character;
        this.isSelected = isSelected;
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
            // fieldを更新する
            gameState.field[FIELD_SIZE * newPos.y + newPos.x].humans.push(this);
        },
        enumerable: false,
        configurable: true
    });
    /**
     * posQueueに、未来の座標を追加する
     * @param pos 追加する座標
     */
    Human.prototype.pushPos = function (pos) {
        if (pos.x < 0 || FIELD_SIZE <= pos.x
            || pos.y < 0 || FIELD_SIZE <= pos.y) {
            throw new Error('Position must be 0 <= x < FIELD_SIZE');
        }
        this.posQueue.push(pos);
    };
    /**
     * posQueueに、未来の座標のリストを追加する
     * @param posArray 追加する座標のリスト
     */
    Human.prototype.pushPosArray = function (posArray) {
        var _this = this;
        posArray.forEach(function (pos) { return _this.pushPos(pos); });
    };
    /**
     * 1単位時間過ごす
     */
    Human.prototype.spendTime = function () {
        if (this.posQueue.length == 0) {
            // TODO : posQueueが空なので、未来の予定を決める
        }
        // 位置を更新する
        this.pos = this.posQueue[0];
        this.posQueue.shift();
        // TODO : hpを更新する
    };
    Human.humanNum = 1;
    return Human;
}());
var gameState = {
    time: { d: 1, h: 14, m: 30 },
    mode: "neutral",
    field: Array(FIELD_SIZE * FIELD_SIZE),
    humans: [],
};
/**
 * gameStateを初期化する
 */
function initGameState() {
    for (var i = 0; i < FIELD_SIZE; i++) {
        for (var j = 0; j < FIELD_SIZE; j++) {
            gameState.field[FIELD_SIZE * i + j] = { humans: [] };
        }
    }
}
/**
 * Squareがクリックされたときに呼ばれ、現在のモードに従って処理を行う
 */
function handleClickSquare(x, y) {
    switch (gameState.mode) {
        case 'neutral':
            console.log(FIELD_SIZE * y + x);
            break;
        case 'addHuman':
            // 指定の場所に人を追加する
            var newHuman = new Human();
            newHuman.pos = { x: x, y: y };
            addHuman(newHuman);
            // 盤面を更新する
            drawField();
            // ヒト追加モードを抜ける
            exitAddHumanMode();
            break;
        case 'selectHuman':
            // 指定の場所に人がいなければ何もしない
            if (gameState.field[FIELD_SIZE * y + x].humans.length == 0) {
                return;
            }
            // 指定の場所の人の選択状態を変更する
            // （複数人の場合はリストの先頭）
            gameState.field[FIELD_SIZE * y + x].humans[0].isSelected =
                !gameState.field[FIELD_SIZE * y + x].humans[0].isSelected;
            // 盤面を更新する
            drawField();
            // 選択モードを抜ける
            exitSelectHumanMode();
            break;
    }
}
/**
 * 人の情報を表示する吹き出し要素を返す
 * @param human 情報を表示する対象
 * @returns 吹き出しの<div>要素
 */
function createBalloon(human) {
    var divEl = document.createElement("div");
    divEl.className = "above-square";
    var balloonEl = document.createElement("div");
    balloonEl.className = "balloon2";
    var messageEl = document.createElement("p");
    messageEl.innerText =
        "\u540D\u524D\uFF1A".concat(human.name, "\n    HP\uFF1A").concat(human.hp, "\n    \u5F79\u8077\uFF1A").concat(human.job, "\n    \u6027\u683C\uFF1A").concat(human.character);
    balloonEl.appendChild(messageEl);
    divEl.appendChild(balloonEl);
    return divEl;
}
/**
 * FIELD_SIZE * FIELD_SIZE の盤面を作成する
 */
function createField() {
    var fieldEl = document.getElementById("field");
    if (!fieldEl) {
        throw new Error('<div id="field"></div> is null.');
    }
    var _loop_1 = function (i) {
        // 行の要素を作成
        var lineEl = document.createElement("div");
        lineEl.className = "board-row";
        var _loop_2 = function (j) {
            // 各行の列の要素を作成
            var squareEl = document.createElement("button");
            squareEl.className = "square";
            squareEl.id = "square-" + (FIELD_SIZE * i + j);
            squareEl.onclick = function () { return handleClickSquare(j, i); };
            // 行の子要素にする
            lineEl.appendChild(squareEl);
        };
        for (var j = 0; j < FIELD_SIZE; j++) {
            _loop_2(j);
        }
        // 行の要素を子要素にする
        fieldEl.appendChild(lineEl);
    };
    for (var i = 0; i < FIELD_SIZE; i++) {
        _loop_1(i);
    }
}
/**
 * gameState.fieldに基づいて盤面を更新する
 * 選択中の人の上には吹き出しを表示する
 */
function drawField() {
    // マスに書かれる文字列
    var textFromState = function (state) {
        if (state.humans.length > 0) {
            return "○";
        }
        else {
            return "";
        }
    };
    for (var i = 0; i < FIELD_SIZE; i++) {
        for (var j = 0; j < FIELD_SIZE; j++) {
            var state = gameState.field[FIELD_SIZE * i + j];
            var squareEl = document.getElementById("square-" + (FIELD_SIZE * i + j));
            if (!squareEl)
                throw new Error("square-".concat(FIELD_SIZE * i + j, " was not found."));
            // 各マスの文字列を更新
            squareEl.textContent = textFromState(state);
            // 選択中の人がいるマスなら上に吹き出しを表示させる
            if (state.humans.length > 0 && state.humans[0].isSelected) {
                var balloonEl = createBalloon(state.humans[0]);
                squareEl.appendChild(balloonEl);
            }
        }
    }
}
/**
 * 人を追加
 */
function addHuman(newHuman) {
    var _a = newHuman.pos, x = _a.x, y = _a.y;
    gameState.humans.push(newHuman);
    gameState.field[FIELD_SIZE * y + x].humans.push(newHuman);
}
/**
 * ランダムな位置を生成し、返す
 * @returns [x, y]
 */
function createRandomPos() {
    var x = Math.floor(Math.random() * FIELD_SIZE);
    var y = Math.floor(Math.random() * FIELD_SIZE);
    return { x: x, y: y };
}
/**
 * 位置の選択モードに遷移し、Square上でホバーすると色が変わるようになる
 */
function enterAddHumanMode() {
    for (var i = 0; i < FIELD_SIZE; i++) {
        for (var j = 0; j < FIELD_SIZE; j++) {
            var squareEl = document.getElementById("square-" + (FIELD_SIZE * i + j));
            if (!squareEl)
                throw new Error("square-".concat(FIELD_SIZE * i + j, " was not found."));
            // ホバー時に色が変わるようにクラスを追加
            squareEl.classList.add('human-add-mode');
            // 選択モードに遷移する
            gameState.mode = 'addHuman';
        }
    }
}
/**
 * ニュートラルモードに遷移し、Square上でホバーしても色が変わらないようにする
 */
function exitAddHumanMode() {
    for (var i = 0; i < FIELD_SIZE; i++) {
        for (var j = 0; j < FIELD_SIZE; j++) {
            var squareEl = document.getElementById("square-" + (FIELD_SIZE * i + j));
            if (!squareEl)
                throw new Error("square-".concat(FIELD_SIZE * i + j, " was not found."));
            /* ホバー時に色が変わるクラスを除去 */
            squareEl.classList.remove('human-add-mode');
            /* ニュートラルモードに遷移する */
            gameState.mode = 'neutral';
        }
    }
}
/**
 * 吹き出しを表示する人を選択するモードに遷移する
 */
function enterSelectHumanMode() {
    gameState.mode = 'selectHuman';
}
/**
 * ニュートラルモードに遷移する
 */
function exitSelectHumanMode() {
    gameState.mode = 'neutral';
}
