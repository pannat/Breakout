export class ActionController {
    get rightPressed() {
        return this._rightPressed;
    }

    get leftPressed() {
        return this._leftPressed;
    }

    set mouseMove(fn) {
        this._mouseMove = fn;
    }

    constructor() {
        this._rightPressed = false;
        this._leftPressed = false;
    }

    setHandlers() {
        const pressKeyDown = (evt) => {
            if (evt.key === 'Right' || evt.key === 'ArrowRight') {
                this._rightPressed = true;
            } else if (evt.key === 'Left' || evt.key === 'ArrowLeft') {
                this._leftPressed = true;
            }
        }

        const pressKeyUp = (evt) => {
            if (evt.key === 'Right' || evt.key === 'ArrowRight') {
                this._rightPressed = false;
            } else if (evt.key === 'Left' || evt.key === 'ArrowLeft') {
                this._leftPressed = false;
            }
        }

        document.addEventListener('keydown', pressKeyDown, false);
        document.addEventListener('keyup', pressKeyUp, false);
        document.addEventListener('mousemove', this._mouseMove, false);
    }
}
