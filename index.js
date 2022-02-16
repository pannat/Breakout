'use strict';

import { BallFigure } from './src/figures/ball.figure';
import { PaddleFigure } from './src/figures/paddle.figure';
import { ActionController } from "./src/controllers/action.controller";


const COLOR = '#a985c9';
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;

const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ball.draw(ctx, x, y)
    paddle.draw(ctx, paddleX, paddleY);

    if (y + dy < ball.radius) {
        dy = -dy;
    } else if (y + dy > canvas.height - ball.radius) {
        if (x > paddleX && x < paddleX + paddle.width) {
            dy = -dy;
        } else {
            alert('GAME OVER');
            clearInterval(interval);
            document.location.reload();
        }
    }

    if (x + dx > canvas.width - ball.radius || x + dx < ball.radius) {
        dx = -dx;
    }

    x += dx;
    y += dy;

    if (actionController.rightPressed) {
        paddleX += 7;

        if (paddleX + paddle.width > canvas.width) {
            paddleX = canvas.width - paddle.width;
        }

    } else if (actionController.leftPressed) {
        paddleX -= 7;

        if (paddleX < 0) {
            paddleX = 0;
        }
    }
}

const ball = new BallFigure();
ball.radius = 10;
ball.color = COLOR;

const paddle = new PaddleFigure();
paddle.color = COLOR;
paddle.height = 10;
paddle.width = 75;
let paddleX = (canvas.width - paddle.width) / 2;
let paddleY = canvas.height - paddle.height;

const actionController = new ActionController();
actionController.setHandlers();

const interval = setInterval(draw, 10);
