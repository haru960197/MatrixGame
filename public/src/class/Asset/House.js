import { Asset } from "./Asset";
export class House extends Asset {
    className;
    constructor(pos, owner) {
        super(pos, owner);
        this.className = "normal-house";
    }
}
//# sourceMappingURL=House.js.map