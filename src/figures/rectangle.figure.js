import { BasicFigure } from "./basic.figure";

export class RectangleFigure extends BasicFigure {

    get width() {
        return this._width;
    }

    set width(val) {
        this._width = val;
    }

    get height() {
        return this._height;
    }

    set height(val) {
        this._height = val;
    }

    constructor(color, width, height, coordinateX, coordinateY) {
        super(color, coordinateX, coordinateY);

        this._height = height;
        this._width = width;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.rect(this._coordinateX, this._coordinateY, this._width, this._height);
        ctx.fillStyle = this._color;
        ctx.fill();
        ctx.closePath();
    }
}
