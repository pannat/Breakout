'use strict';

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const COLOR = '#a985c9';
const RADIUS_BALL = 10;
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;

const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;
let paddleY = canvas.height - paddleHeight;

let rightPressed = false;
let leftPressed = false;

const pressKeyDown = (evt) => {
    if (evt.key === 'Right' || evt.key === 'ArrowRight') {
        rightPressed = true;
    } else if (evt.key === 'Left' || evt.key === 'ArrowLeft') {
        leftPressed = true;
    }
}

const pressKeyUp = (evt) => {
    if (evt.key === 'Right' || evt.key === 'ArrowRight') {
        rightPressed = false;
    } else if (evt.key === 'Left' || evt.key === 'ArrowLeft') {
        leftPressed = false;
    }
}

const drawPaddle = () => {
    ctx.beginPath();
    ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
    ctx.fillStyle = COLOR;
    ctx.fill();
    ctx.closePath();
}

const drawBall = () => {
    ctx.beginPath();
    ctx.arc(x, y, RADIUS_BALL, 0, Math.PI*2)
    ctx.fillStyle = COLOR;
    ctx.fill();
    ctx.closePath();
}

const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();

    if (y + dy > canvas.height - RADIUS_BALL || y + dy < RADIUS_BALL) {
        dy = -dy;
    }

    if (x + dx > canvas.width - RADIUS_BALL || x + dx < RADIUS_BALL) {
        dx = -dx;
    }

    x += dx;
    y += dy;

    if (rightPressed) {
        paddleX += 7;

        if (paddleX + paddleWidth > canvas.width) {
            paddleX = canvas.width - paddleWidth;
        }

    } else if (leftPressed) {
        paddleX -= 7;

        if (paddleX < 0) {
            paddleX = 0;
        }
    }
}


document.addEventListener('keydown', pressKeyDown, false);
document.addEventListener('keyup', pressKeyUp, false);

setInterval(draw, 10);
