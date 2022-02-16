export class PaddleFigure {
    get color() {
        return this._color;
    }

    set color(val) {
        this._color = val;
    }

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

    draw(ctx, x, y) {
        ctx.beginPath();
        ctx.rect(x, y, this._width, this._height);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}
