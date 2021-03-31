cc.Class({
    extends: cc.Component,

    properties: {
        canvas: {
            default: null,
            type: cc.Node
        },
        score: {
            default: null,
            type: cc.Label
        },
        life: {
            default: null,
            type: cc.Label
        },
        level: {
            default: null,
            type: cc.Label
        },
        ball: {
            default: null,
            type: cc.Node
        },
        paddle: {
            default: null,
            type: cc.Node
        },
        sound_paddleBall: {
            default: null,
            type: cc.AudioClip
        },
        sound_ballWall: {
            default: null,
            type: cc.AudioClip
        },
        sound_ballBrick: {
            default: null,
            type: cc.AudioClip
        },
        sound_levelUp: {
            default: null,
            type: cc.AudioClip
        },
        sound_gameLose: {
            default: null,
            type: cc.AudioClip
        },

        sound_winGame: {
            default: null,
            type: cc.AudioClip
        },
        sound_lifeLoft: {
            default: null,
            type: cc.AudioClip
        }

    },

    onLoad() {
        cc.director.getCollisionManager().enabled = true;
    },
});