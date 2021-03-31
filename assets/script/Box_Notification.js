cc.Class({
    extends: cc.Component,

    properties: {

    },



    onLoad() {
        cc.game.addPersistRootNode(this.node);
    },

    reSetGame() {
        cc.director.loadScene('GAME_PLAY');
    },

    comeBackHome() {
        cc.director.loadScene('Game_Home');
    },

});