import { FIELD_SIZE } from "../../game";
export class Task {
    where;
    constructor(where) {
        if (where.x < 0 || FIELD_SIZE <= where.x
            || where.y < 0 || FIELD_SIZE <= where.y) {
            throw new Error('Position must be 0 <= x < FIELD_SIZE');
        }
        this.where = where;
    }
}
//# sourceMappingURL=Task.js.map