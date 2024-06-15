import { FIELD_SIZE } from "../../game";
export class Asset {
    pos;
    owner;
    isThereOwner() {
        return this.pos.x === this.owner.pos.x && this.pos.y === this.owner.pos.y;
    }
    constructor(pos, owner) {
        if (pos.x < 0 || pos.x >= FIELD_SIZE || pos.y < 0 || pos.y >= FIELD_SIZE) {
            throw new Error(`pos.x, pox.y must be in 0 <= a < FIELD_SIZE`);
        }
        this.pos = pos;
        this.owner = owner;
    }
}
//# sourceMappingURL=Asset.js.map