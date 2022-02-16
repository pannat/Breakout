'use strict';

import { BallFigure } from './src/figures/ball.figure';
import { RectangleFigure } from './src/figures/rectangle.figure';
import { ActionController } from './src/controllers/action.controller';


const COLOR = '#a985c9';
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

let deltaX = 2;
let deltaY = -2;

const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    ball.draw(ctx)
    paddle.draw(ctx);
    collisionDetection();

    if (ball.coordinateY + deltaY < ball.radius) {
        deltaY = -deltaY;
    } else if (ball.coordinateY + deltaY > canvas.height - ball.radius) {
        if (ball.coordinateX > paddle.coordinateX && ball.coordinateX < paddle.coordinateX + paddle.width) {
            deltaY = -deltaY;
        } else {
            alert('GAME OVER');
            clearInterval(interval);
            document.location.reload();
        }
    }

    if (ball.coordinateX + deltaX > canvas.width - ball.radius || ball.coordinateX + deltaX < ball.radius) {
        deltaX = -deltaX;
    }

    ball.coordinateX += deltaX;
    ball.coordinateY += deltaY;

    if (actionController.rightPressed) {
        paddle.coordinateX += 7;

        if (paddle.coordinateX + paddle.width > canvas.width) {
            paddle.coordinateX = canvas.width - paddle.width;
        }

    } else if (actionController.leftPressed) {
        paddle.coordinateX -= 7;

        if (paddle.coordinateX < 0) {
            paddle.coordinateX = 0;
        }
    }
};

const brickRowCount = 3;
const brickColumnCount = 5;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;

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
const collisionDetection = () => {
    brickColumns.forEach((col) => {
        col.forEach((brick) => {
            if (brick.status === 1
            && ball.coordinateX > brick.figure.coordinateX && ball.coordinateX < brick.figure.coordinateX + brick.figure.width
            && ball.coordinateY > brick.figure.coordinateY && ball.coordinateY < brick.figure.coordinateY + brick.figure.height) {
                deltaY = -deltaY;
                brick.status = 0;
            }
        })
    })
}



const initialPaddleWidth = 75;
const initialPaddleHeight = 10;
const paddle = new RectangleFigure(
    COLOR,
    initialPaddleWidth,
    initialPaddleHeight,
    (canvas.width - initialPaddleWidth) / 2,
    canvas.height - initialPaddleHeight
);

const actionController = new ActionController();
actionController.setHandlers();

const interval = setInterval(draw, 10);
