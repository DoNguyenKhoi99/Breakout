cc.Class({
    extends: cc.Component,

    properties: {
        main_game_control: {
            default: null,
            type: cc.Node
        },
        bricks_blue: {
            default: null,
            type: cc.Prefab,
        },
        box_notification_lose: {
            default: null,
            type: cc.Prefab
        },
        box_notification_win: {
            default: null,
            type: cc.Prefab
        }
    },

    onLoad() {
        this.Component = this.main_game_control.getComponent("Main_Game_Control");

        this.createBricks();
    },

    createBricks() {
        this.level = this.Component.level.string.substring(7, 8);
        this.x = -315;
        this.y = 200;
        this.marginLeft_Top = 5;

        for (let row = 0; row < this.level; row++) {
            for (let col = 0; col < 8; col++) {
                let bricks = cc.instantiate(this.bricks_blue);
                this.node.addChild(bricks);
                bricks.setPosition(cc.v2(this.x, this.y));
                this.x += 85 + this.marginLeft_Top;
            }
            this.x = -315;
            this.y -= 27 + this.marginLeft_Top;
        }
    },

    showGameLose() {
        let showLose = cc.instantiate(this.box_notification_lose);
        this.node.addChild(showLose);
        showLose.setPosition(cc.v2(0, 0));
    },

    showGameWin() {
        let showWin = cc.instantiate(this.box_notification_win);
        this.node.addChild(showWin);
        showWin.setPosition(cc.v2(0, 0));
    }
});