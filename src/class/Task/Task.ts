import { Position, FIELD_SIZE } from "../../game";

export abstract class Task {
    where: Position;

    constructor(where: Position) {
        if (where.x < 0 || FIELD_SIZE <= where.x
            || where.y < 0 || FIELD_SIZE <= where.y) {
            throw new Error('Position must be 0 <= x < FIELD_SIZE');
        }
        this.where = where;
    }
}