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
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 1単位時間過ごす
     */
    Human.prototype.spendTime = function () {
        // TODO : タスクを消費した場合、未来の予定を決める
        // TODO : 位置を更新する
        // TODO : hpを更新する
    };
    Human.humanNum = 1;
    return Human;
}());
