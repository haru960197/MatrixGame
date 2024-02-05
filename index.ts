// ページが読み込まれたときの処理
document.addEventListener("DOMContentLoaded", (e) => {
    setInterval(() => {
        // 1秒ごとに盤面を更新する
        drawField()
    }, 1000);

    initGameState();
    createField();
});

/* 盤面のサイズ */
const FIELD_SIZE = 8;

interface HTMLEvent<T extends EventTarget> extends Event {
    target: T;
}

type Job = 'farmer' | 'merchant';

type Postion = {
    x: number,
    y: number,
}

type Character = {
    wisdom: number;
}

class Human {
    static humanNum = 1;
    name: string;
    private _pos: Postion;
    hp: number;
    job: Job;
    color: string;
    character: Character;
    isSelected: boolean;

    get pos(): Postion {
        return this._pos;
    }

    set pos(newPos: Postion) {
        if (newPos.x < 0 || FIELD_SIZE <= newPos.x
            || newPos.y < 0 || FIELD_SIZE <= newPos.y) {
            throw new Error('Position must be 0 <= x < FIELD_SIZE');
        }
        this._pos = newPos;
    }

    constructor(
        name: string = `Human${Human.humanNum}`,
        pos: Postion = {x: 0, y: 0},
        hp: number = 100,
        job: Job = "farmer",
        color: string = "#FF0000",
        character: Character = { wisdom: 0.5 },
        isSelected: boolean = false,
    ) {
        Human.humanNum++;
        this.name = name;
        this.pos = pos;
        this.hp = hp;
        this.job = job;
        this.color = color;
        this.character = character;
        this.isSelected = isSelected;
    }
}

type Time = {
    d: number;
    h: number;
    m: number;
}

type SquareState = {
    humans: Human[];
}

type InterfaceMode = "neutral" | "addHuman" | "selectHuman";

type GameState = {
    time: Time;
    mode: InterfaceMode;
    field: SquareState[];
    humans: Human[];
}

let gameState: GameState = {
    time: { d: 1, h: 14, m: 30 },
    mode: "neutral",
    field: Array<SquareState>(FIELD_SIZE * FIELD_SIZE),
    humans: [],
}

/**
 * gameStateを初期化する
 */
function initGameState(): void {
    for (let i = 0; i < FIELD_SIZE; i++) {
        for (let j = 0; j < FIELD_SIZE; j++) {
            gameState.field[FIELD_SIZE * i + j] = { humans: [] };
        }
    }
}

/**
 * Squareがクリックされたときに呼ばれ、現在のモードに従って処理を行う
 */
function handleClickSquare(x: number, y: number): void {
    switch (gameState.mode) {
        case 'neutral':
            console.log(FIELD_SIZE * y + x);
            break;
        case 'addHuman':
            // 指定の場所に人を追加する
            const newHuman = new Human();
            newHuman.pos = {x, y};
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
function createBalloon(human: Human): HTMLDivElement {
    const divEl = document.createElement("div");
    divEl.className = "above-square";
    const balloonEl = document.createElement("div");
    balloonEl.className = "balloon2";
    const messageEl = document.createElement("p");
    messageEl.innerText =
    `名前：${human.name}
    HP：${human.hp}
    役職：${human.job}
    性格：${human.character}`;
    balloonEl.appendChild(messageEl);
    divEl.appendChild(balloonEl);

    return divEl;
}

/**
 * FIELD_SIZE * FIELD_SIZE の盤面を作成する
 */
function createField(): void {
    const fieldEl = document.getElementById("field");
    if (!fieldEl) {
        throw new Error('<div id="field"></div> is null.');
    }

    for (let i = 0; i < FIELD_SIZE; i++) {
        // 行の要素を作成
        const lineEl = document.createElement("div");
        lineEl.className = "board-row";
        for (let j = 0; j < FIELD_SIZE; j++) {
            // 各行の列の要素を作成
            const squareEl = document.createElement("button");
            squareEl.className = "square";
            squareEl.id = "square-" + (FIELD_SIZE * i + j);
            squareEl.onclick = () => handleClickSquare(j, i);
            // 行の子要素にする
            lineEl.appendChild(squareEl);
        }
        // 行の要素を子要素にする
        fieldEl.appendChild(lineEl);
    }
}

/**
 * gameState.fieldに基づいて盤面を更新する
 * 選択中の人の上には吹き出しを表示する
 */
function drawField(): void {
    // マスに書かれる文字列
    const textFromState = (state: SquareState): string => {
        if (state.humans.length > 0) {
            return "○";
        } else {
            return "";
        }
    }

    for (let i = 0; i < FIELD_SIZE; i++) {
        for (let j = 0; j < FIELD_SIZE; j++) {
            const state = gameState.field[FIELD_SIZE * i + j];
            const squareEl = document.getElementById("square-" + (FIELD_SIZE * i + j));
            if (!squareEl)
                throw new Error(`square-${FIELD_SIZE * i + j} was not found.`);
            // 各マスの文字列を更新
            squareEl.textContent = textFromState(state);
            // 選択中の人がいるマスなら上に吹き出しを表示させる
            if (state.humans.length > 0 && state.humans[0].isSelected) {
                const balloonEl = createBalloon(state.humans[0]);
                squareEl.appendChild(balloonEl);
            }
        }
    }
}

/**
 * 人を追加
 */
function addHuman(newHuman: Human) {
    const {x, y} = newHuman.pos;
    gameState.humans.push(newHuman);
    gameState.field[FIELD_SIZE * y + x].humans.push(newHuman);
}

/**
 * ランダムな位置を生成し、返す
 * @returns [x, y]
 */
function createRandomPos(): Postion {
    const x = Math.floor(Math.random() * FIELD_SIZE);
    const y = Math.floor(Math.random() * FIELD_SIZE);
    return {x, y};
}

/**
 * 位置の選択モードに遷移し、Square上でホバーすると色が変わるようになる
 */
function enterAddHumanMode(): void {
    for (let i = 0; i < FIELD_SIZE; i++) {
        for (let j = 0; j < FIELD_SIZE; j++) {
            const squareEl = document.getElementById("square-" + (FIELD_SIZE * i + j));
            if (!squareEl)
                throw new Error(`square-${FIELD_SIZE * i + j} was not found.`);
            // ホバー時に色が変わるようにクラスを追加
            squareEl.classList.add('human-add-mode')
            // 選択モードに遷移する
            gameState.mode = 'addHuman';
        }
    }
}

/**
 * ニュートラルモードに遷移し、Square上でホバーしても色が変わらないようにする
 */
function exitAddHumanMode(): void {
    for (let i = 0; i < FIELD_SIZE; i++) {
        for (let j = 0; j < FIELD_SIZE; j++) {
            const squareEl = document.getElementById("square-" + (FIELD_SIZE * i + j));
            if (!squareEl)
                throw new Error(`square-${FIELD_SIZE * i + j} was not found.`);
            /* ホバー時に色が変わるクラスを除去 */
            squareEl.classList.remove('human-add-mode')
            /* ニュートラルモードに遷移する */
            gameState.mode = 'neutral';
        }
    }
}

/**
 * 吹き出しを表示する人を選択するモードに遷移する
 */
function enterSelectHumanMode(): void {
    gameState.mode = 'selectHuman';
}

/**
 * ニュートラルモードに遷移する
 */
function exitSelectHumanMode(): void {
    gameState.mode = 'neutral';
}