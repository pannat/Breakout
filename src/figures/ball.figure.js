import { BasicFigure } from "./basic.figure";

export class BallFigure extends BasicFigure {
    get radius() {
        return this._radius;
    }

    set radius(val) {
        this._radius = val;
    }

    constructor(color, radius, coordinateX, coordinateY) {
        super(color, coordinateX, coordinateY);

        this._radius = radius;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this._coordinateX, this._coordinateY, this._radius, 0, Math.PI*2)
        ctx.fillStyle = this._color;
        ctx.fill();
        ctx.closePath();
    }
}
