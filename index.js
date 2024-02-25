// ページが読み込まれたときの処理
document.addEventListener("DOMContentLoaded", function (e) {
    setInterval(function () {
        // 1秒ごとに盤面を更新する
        drawField();
    }, 1000);
    createField();
});
/* 盤面のサイズ */
var FIELD_SIZE = 8;
var gameState = {
    time: { d: 1, h: 14, m: 30 },
    mode: "neutral",
    humans: [],
};
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
            var humans = getHumansFromPos({ x: x, y: y });
            // 指定の場所に人がいなければ何もしない
            if (humans.length == 0) {
                return;
            }
            // 指定の場所の人の選択状態を反転させる
            // （複数人の場合はリストの先頭）
            humans[0].isSelected = !humans[0].isSelected;
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
 * 盤面をリセットする（すべてのマスを空文字列にする）
 */
function resetField() {
    for (var i = 0; i < FIELD_SIZE; i++) {
        for (var j = 0; j < FIELD_SIZE; j++) {
            var squareEl = document.getElementById("square-" + (FIELD_SIZE * i + j));
            if (!squareEl)
                throw new Error("square-".concat(FIELD_SIZE * i + j, " was not found."));
            // 各マスの文字列をから文字列にリセット
            squareEl.textContent = "";
        }
    }
}
/**
 * gameStateに従って盤面を更新する
 * 選択中の人の上には吹き出しを表示する
 */
function drawField() {
    // 盤面をリセットする
    resetField();
    gameState.humans.forEach(function (human) {
        var _a = human.pos, x = _a.x, y = _a.y;
        var squareEl = document.getElementById("square-" + (FIELD_SIZE * y + x));
        if (!squareEl) {
            throw new Error("square-".concat(FIELD_SIZE * y + x, " was not found."));
        }
        // マスの文字列を更新
        squareEl.textContent = "○";
        // 人が選択中ならマスの上に吹き出しを表示する
        if (human.isSelected) {
            var balloonEl = createBalloon(human);
            squareEl.appendChild(balloonEl);
        }
    });
}
/**
 * 人を追加
 */
function addHuman(newHuman) {
    var _a = newHuman.pos, x = _a.x, y = _a.y;
    gameState.humans.push(newHuman);
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
 * ある座標にいる人の検索し、配列にして返す
 * @param pos 座標
 * @returns その座標にいる人の配列
 */
function getHumansFromPos(pos) {
    var retHumans = [];
    gameState.humans.forEach(function (human) {
        if (human.pos.x == pos.x && human.pos.y == pos.y) {
            retHumans.push(human);
        }
    });
    return retHumans;
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
