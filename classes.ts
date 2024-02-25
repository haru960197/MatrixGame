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

class Human {
    static humanNum = 1;
    name: string;
    private _pos: Position;
    hp: number;
    job: Job;
    color: string;
    character: Character;
    isSelected: boolean;

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
        // TODO : タスクを消費した場合、未来の予定を決める
        // TODO : 位置を更新する
        // TODO : hpを更新する
    }

    constructor(
        name: string = `Human${Human.humanNum}`,
        pos: Position = {x: 0, y: 0},
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

type InterfaceMode = "neutral" | "addHuman" | "selectHuman";

type GameState = {
    time: Time;
    mode: InterfaceMode;
    humans: Human[];
}