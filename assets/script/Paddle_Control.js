cc.Class({
    extends: cc.Component,

    properties: {
        main_game_control: {
            default: null,
            type: cc.Node
        },
        dx: 0,
        status: true
    },

    onLoad() {
        this.arrowLeft = false;
        this.arrowRight = false;
        this.Component = this.main_game_control.getComponent("Main_Game_Control");

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
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

    movePaddle() {
        if (this.arrowLeft && this.node.x - this.node.width / 2 > -this.Component.canvas.width / 2) {
            this.node.x -= this.dx;
        }
        if (this.arrowRight && this.node.x + this.node.width / 2 < this.Component.canvas.width / 2) {
            this.node.x += this.dx;
        }
    },

    update(dt) {
        if (this.status) {
            this.movePaddle();
        }
    },
});