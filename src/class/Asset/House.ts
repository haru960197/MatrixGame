import { Asset } from "./Asset";
import { Position } from "../../game";
import { Human } from "../Human/Human";

export class House extends Asset {
    className: "normal-house" | "evening-house" | "night-house" | "sleeping-house";

    constructor(pos: Position, owner: Human) {
        super(pos, owner);
        this.className = "normal-house";
    }
}