cc.Class({
    extends: cc.Component,

    properties: {
        ball: {
            default: null,
            type: cc.Node
        },
    },

    onLoad() {
        this.arrowLeft = false;
        this.arrowRight = false;
        this.xSpeed = 8;
        this.startBall = false;

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this); //kích hoạt sự kiện Key_down
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this); //kích hoạt sự kiện Key_up 
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.ballStatus, this);
    },

    onKeyDown(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.left:
                this.arrowLeft = true;
                break;
            case cc.macro.KEY.right:
                this.arrowRight = true;
                break;
        }
    },

    onKeyUp(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.left:
                this.arrowLeft = false;
                break;
            case cc.macro.KEY.right:
                this.arrowRight = false;
                break;
        }
    },

    ballStatus(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.space:
                this.startBall = true;
                break;
        }
    },

    update(dt) {
        if (this.arrowLeft) {
            this.node.x -= this.xSpeed;
            if (!this.startBall)
                this.ball.x -= this.xSpeed;
        } else if (this.arrowRight) {
            this.node.x += this.xSpeed;
            if (!this.startBall)
                this.ball.x += this.xSpeed;
        }
    },
});