import { BasicFigure } from './basic.figure';

export class ScoreBoardFigure extends BasicFigure {
    get score() {
        return this._score;
    }

    set score(val) {
        this._score = val;
    }


    constructor(color, coordinateX, coordinateY, score) {
        super(color, coordinateX, coordinateY);

        this._score = score;
    }

    draw(ctx) {
        ctx.font = '16px Arial';
        ctx.fillStyle = this._color;
        ctx.fillText(`Score: ${this._score}`, this._coordinateX, this._coordinateY);
    }
}
