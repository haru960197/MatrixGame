import { Asset } from "./Asset";
import { Position } from "../../game";
import { Human } from "../Human/Human";

export class Shop extends Asset {
    className: "shop";

    constructor(pos: Position, owner: Human) {
        super(pos, owner);
        this.className = "shop";
    }
}