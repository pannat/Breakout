export class BallFigure {
    get color() {
        return this._color;
    }

    set color(val) {
        this._color = val;
    }

    get radius() {
        return this._radius;
    }

    set radius(val) {
        this._radius = val;
    }

    constructor() {}

    draw(ctx, x, y) {
        ctx.beginPath();
        ctx.arc(x, y, this.radius, 0, Math.PI*2)
        ctx.fillStyle = this._color;
        ctx.fill();
        ctx.closePath();
    }
}
