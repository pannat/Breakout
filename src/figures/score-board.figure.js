import { BasicFigure } from './basic.figure';

export class ScoreBoardFigure extends BasicFigure {
    get score() {
        return this._score;
    }

    set score(val) {
        this._score = val;
    }

    get lives() {
        return this._lives;
    }

    set lives(val) {
        this._lives = val;
    }

    constructor(color, coordinateX, coordinateY, score, lives) {
        super(color, coordinateX, coordinateY);

        this._score = score;
        this._lives = lives;
    }

    draw(ctx) {
        ctx.font = '16px Arial';
        ctx.fillStyle = this._color;
        ctx.fillText(`[Score: ${this._score}] Lives: ${this._lives}`, this._coordinateX, this._coordinateY);
    }
}
