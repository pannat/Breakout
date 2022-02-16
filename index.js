'use strict';

import { BallFigure } from './src/figures/ball.figure';
import { ScoreBoardFigure } from './src/figures/score-board.figure';
import { RectangleFigure } from './src/figures/rectangle.figure';
import { ActionController } from './src/controllers/action.controller';


const COLOR = '#a985c9';
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const brickRowCount = 3;
const brickColumnCount = 5;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;

const initialPaddleWidth = 75;
const initialPaddleHeight = 10;

let deltaX = 2;
let deltaY = -2;

const showGameOver = (reason) => {
    alert(reason);
    document.location.reload();
}

const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    ball.draw(ctx)
    paddle.draw(ctx);
    scoreBoard.draw(ctx);
    detectBrickCollision();

    if (ball.coordinateY + deltaY < ball.radius) {
        deltaY = -deltaY;
    } else if (ball.coordinateY + deltaY > canvas.height - ball.radius) {
        if (ball.coordinateX > paddle.coordinateX && ball.coordinateX < paddle.coordinateX + paddle.width) {
            deltaY = -deltaY;
        } else {
            scoreBoard.lives--

            if (scoreBoard.lives === 0) {
                showGameOver('YOU LOSE')
            } else {
                ball.coordinateX = canvas.width / 2;
                ball.coordinateY = canvas.height - 30;
                deltaX = 2;
                deltaY = -2;
                paddle.coordinateX = (canvas.width - paddle.width) / 2;
            }
        }
    }

    if (ball.coordinateX + deltaX > canvas.width - ball.radius || ball.coordinateX + deltaX < ball.radius) {
        deltaX = -deltaX;
    }

    ball.coordinateX += deltaX;
    ball.coordinateY += deltaY;

    shiftPaddle();
    requestAnimationFrame(draw);
};

const shiftPaddle = () => {
    if (actionController.rightPressed) {
        paddle.coordinateX += 3;

        if (paddle.coordinateX + paddle.width > canvas.width) {
            paddle.coordinateX = canvas.width - paddle.width;
        }

    } else if (actionController.leftPressed) {
        paddle.coordinateX -= 3;

        if (paddle.coordinateX < 0) {
            paddle.coordinateX = 0;
        }
    }
}

const detectBrickCollision = () => {
    brickColumns.forEach((col) => {
        col.forEach((brick) => {
            if (brick.status === 1
                && ball.coordinateX > brick.figure.coordinateX && ball.coordinateX < brick.figure.coordinateX + brick.figure.width
                && ball.coordinateY > brick.figure.coordinateY && ball.coordinateY < brick.figure.coordinateY + brick.figure.height) {
                deltaY = -deltaY;
                brick.status = 0;
                scoreBoard.score++

                if (scoreBoard.score === brickRowCount * brickColumnCount) {
                    showGameOver('YOU WIN, CONGRATULATIONS');
                }
            }
        })
    })
}

const createBricks = () => new Array(brickRowCount).fill('').map(() => ({
    status: 1,
    figure: new RectangleFigure(COLOR, 75, 20, 0, 0)
}));
const brickColumns = new Array(brickColumnCount).fill('').map(() => createBricks());

const drawBricks = () => {
    brickColumns.forEach((columnBricks, indexColumn) => {
        columnBricks.forEach(({status, figure}, indexBrick) => {
            if (status === 1) {
                figure.coordinateX = (indexColumn * (figure.width + brickPadding)) + brickOffsetLeft;
                figure.coordinateY = (indexBrick * (figure.height + brickPadding)) + brickOffsetTop;

                figure.draw(ctx)
            }
        })
    })
}

const ball = new BallFigure(COLOR, 10, canvas.width / 2, canvas.height - 30);
const paddle = new RectangleFigure(
    COLOR,
    initialPaddleWidth,
    initialPaddleHeight,
    (canvas.width - initialPaddleWidth) / 2,
    canvas.height - initialPaddleHeight
);
const scoreBoard = new ScoreBoardFigure(COLOR, 8, 20, 0, 3);
const actionController = new ActionController();
actionController.mouseMove = (evt) => {
    const relativeCoordinateX = evt.clientX - canvas.offsetLeft;
    if (relativeCoordinateX > 0 && relativeCoordinateX < canvas.width) {
        paddle.coordinateX = relativeCoordinateX - paddle.width / 2;
    }
}
actionController.setHandlers();

draw();
