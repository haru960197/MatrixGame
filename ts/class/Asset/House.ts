class House extends Asset {
    className: "normal-house" | "evening-house" | "night-house" | "sleeping-house";

    constructor(pos: Position, owner: Human) {
        super(pos, owner);
        this.className = "normal-house";
    }
}