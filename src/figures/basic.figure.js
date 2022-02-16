export class BasicFigure {
    get color() {
        return this._color;
    }

    set color(val) {
        this._color = val;
    }

    get coordinateX() {
        return this._coordinateX;
    }

    set coordinateX(val) {
        this._coordinateX = val;
    }

    get coordinateY() {
        return this._coordinateY;
    }

    set coordinateY(val) {
        this._coordinateY = val;
    }

    constructor(color, coordinateX, coordinateY) {
        if (new.target === BasicFigure) {
            throw new Error(`Can't instantiate BasicFigure, only concrete one.`);
        }

        this._color = color;
        this._coordinateX = coordinateX;
        this._coordinateY = coordinateY;
    }

    draw() {
        throw new Error(`Abstract method not implemented: draw`);
    }
}
