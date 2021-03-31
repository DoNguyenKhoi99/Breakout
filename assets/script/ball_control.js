cc.Class({
    extends: cc.Component,

    properties: {
        main_game_control: {
            default: null,
            type: cc.Node
        },
        canvas_control: {
            default: null,
            type: cc.Node
        },

        dx: 5 * (Math.random() * 2 - 1),
        dy: 5,
        speed: 6,
        status: false,
        radius: 12.5
    },

    onLoad() {
        this.colPoint = 0;
        this.bricksWasBroken = 0;
        this.score = 0;
        this.score_unit = 10;
        this.level_max = 6;
        this.stopLoop = false;

        this.Component = this.main_game_control.getComponent("Main_Game_Control");
        this.Canvas_Control = this.canvas_control.getComponent("Canvas_Control");

        this.life = this.Component.life.string;
        this.level = this.Component.level.string.substring(7, 8);
        this.paddle = this.Component.paddle;
        //this.canvas = this.Component.canvas;

        this.sumBricks = this.level * 8;

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    },

    onKeyDown(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.space:
                this.status = true;
        }
    },

    moveBall() {
        if (this.status) {
            this.node.x += this.dx;
            this.node.y += this.dy
        }
    },

    ballFollowPaddle() {
        if (!this.status) {
            this.node.x = this.Component.paddle.x;
            this.node.y = this.Component.paddle.y + this.Component.paddle.height;
        }
    },

    ballWallCollision() {
        if (this.node.x - this.radius <= -this.Component.canvas.width / 2 || this.node.x + this.radius >= this.Component.canvas.width / 2) {
            this.dx = -this.dx;
            cc.audioEngine.playEffect(this.Component.sound_ballWall, false)

        }
        if (this.node.y + this.radius >= this.Component.canvas.height / 2) {
            this.dy = -this.dy;
            cc.audioEngine.playEffect(this.Component.sound_ballWall, false)

        }
        if (this.node.y - this.radius <= -this.Component.canvas.height / 2) {
            this.life--;
            this.Component.life.string = this.life;
            this.resetBallPaddle();
            cc.audioEngine.playEffect(this.Component.sound_lifeLoft, false)

        }
    },

    resetBallPaddle() {
        this.status = false;
        this.paddle.x = 0;
        this.dy = -this.dy;
        this.node.x = this.paddle.x;
        this.node.y = this.paddle.y + this.paddle.height;
    },

    showYouLose() {
        if (this.life <= 0) {
            this.stopLoop = true;
            this.status = false;
            this.paddle.status = false;
            this.Canvas_Control.showGameLose();
            cc.audioEngine.playEffect(this.Component.sound_gameLose, false)
        }
    },

    onCollisionEnter(other, self) {
        if (other.name == 'Paddle<PolygonCollider>') {
            let collisionPoint = this.node.x - this.paddle.x;
            collisionPoint = collisionPoint / (this.paddle.width / 2);

            this.dx = this.speed * Math.sin(collisionPoint);
            this.dy = this.speed * Math.cos(collisionPoint);

            cc.audioEngine.playEffect(this.Component.sound_paddleBall, false)
        } else if (other.name = 'Brick_Blue<PolygonCollider>' && this.colPoint === 0) {
            this.colPoint++;
            this.bricksWasBroken++;
            if (other.tag === 3) {
                this.dy = -this.dy;
            }
            if (other.tag === 4) {
                this.dx = -this.dx;
            }
            other.node.destroy();
            this.score += this.score_unit;
            if (this.colPoint == 1) {
                this.bricksWasBroken--;
                this.score -= this.score_unit;
                this.dx = -this.dx;
            }
            this.Component.score.string = `Score: ${this.score}`;
            cc.audioEngine.playEffect(this.Component.sound_ballBrick, false)
        }
    },

    onCollisionExit() {
        this.colPoint = 0;
    },

    levelUp() {
        if (this.bricksWasBroken >= this.sumBricks) {
            this.dy = -this.dy;
            this.bricksWasBroken = 0;
            this.level++;
            this.sumBricks = this.level * 8;
            this.Component.level.string = `Level: ${this.level}`;
            this.resetBallPaddle();
            this.Canvas_Control.createBricks();
            cc.audioEngine.playEffect(this.Component.sound_levelUp, false)
        }
    },

    showYouWin() {
        if (this.level > this.level_max) {
            this.stopLoop = true;
            this.Canvas_Control.showGameWin();
            cc.audioEngine.playEffect(this.Component.sound_winGame, false)
        }
    },

    update(dt) {
        this.ballFollowPaddle();
        if (this.status) {
            this.ballWallCollision();
            this.moveBall();
        }
        if (!this.stopLoop) {
            this.showYouLose();
        }
        this.levelUp();
        if (!this.stopLoop) {
            this.showYouWin();
        }
    },
});