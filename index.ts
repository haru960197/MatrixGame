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

type Character = {
    wisdom: number;
}

class Human {
    static humanNum = 1;
    name: string;
    hp: number;
    job: Job;
    color: string;
    character: Character;
    isSelected: boolean;

    constructor(
        name: string = `Human${Human.humanNum}`,
        hp: number = 100,
        job: Job = "farmer",
        color: string = "#FF0000",
        character: Character = { wisdom: 0.5 },
        isSelected: boolean = false,
    ) {
        Human.humanNum++;
        this.name = name;
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
}

let gameState: GameState = {
    time: { d: 1, h: 14, m: 30 },
    mode: "neutral",
    field: Array<SquareState>(FIELD_SIZE * FIELD_SIZE)
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
            addHuman(x, y, new Human());
            // 盤面を更新する
            drawField();
            // ヒト追加モードを抜ける
            exitHumanAddMode();
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
 * gameStateに基づいて盤面を更新する
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
 * フィールド上の指定位置に人を追加する
 */
function addHuman(x: number, y: number, newHuman: Human) {
    gameState.field[FIELD_SIZE * y + x].humans.push(newHuman);
}

/**
 * 盤面上のランダムな位置に一人生成する
 */
function createRandomHuman(): void {
    const x = Math.floor(Math.random() * FIELD_SIZE);
    const y = Math.floor(Math.random() * FIELD_SIZE);

    addHuman(x, y, new Human());
}

/**
 * 位置の選択モードに遷移し、Square上でホバーすると色が変わるようになる
 */
function enterHumanAddMode(): void {
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
function exitHumanAddMode(): void {
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

function enterSelectHumanMode(): void {
    gameState.mode = 'selectHuman';
}

function exitSelectHumanMode(): void {
    gameState.mode = 'neutral';
}