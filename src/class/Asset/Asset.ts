import { Position, FIELD_SIZE } from "../../game";
import { Human } from "../Human/Human";

export abstract class Asset {
    pos: Position;
    owner: Human;

    constructor(pos: Position, owner: Human) {
        if (pos.x < 0 || pos.x >= FIELD_SIZE || pos.y < 0 || pos.y >= FIELD_SIZE) {
            throw new Error(`pos.x, pox.y must be in 0 <= a < FIELD_SIZE`);
        }
        this.pos = pos;
        this.owner = owner;
    }
}