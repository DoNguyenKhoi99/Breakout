cc.Class({
    extends: cc.Component,

    properties: {
        paddle: {
            default: null,
            type: cc.Node
        },
    },

    onLoad() {
        this.startBall = false;
        this.dx = 7 * (Math.random() * 2 - 1);
        this.dy = 7;

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onStartBall, this);
    },

    onStartBall(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.space:
                this.startBall = true;
                break;
        }
    },

    moveBall() {
        if (this.startBall) {
            this.node.x += this.dx;
            this.node.y += this.dy;
        }
    },

    update(dt) {
        this.moveBall();
    },
});