'use strict';

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const COLOR = '#a985c9';
const RADIUS_BALL = 10;
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;

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

    if (y + dy > canvas.height - RADIUS_BALL || y + dy < RADIUS_BALL) {
        dy = -dy;
    }

    if (x + dx > canvas.width - RADIUS_BALL || x + dx < RADIUS_BALL) {
        dx = -dx;
    }

    x += dx;
    y += dy;
}

draw()

setInterval(draw, 10);
