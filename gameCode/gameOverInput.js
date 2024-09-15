export class GameOverInput {
    constructor(game){
        this.game = game;
        window.addEventListener('keyup',e => {
            if(e.key === 'Enter' && this.game.gameOver) this.restart();
        })
    }
    restart(){
        this.game.gameOver = false;
        this.game.mapUseNum = 1;
        this.game.player.hp = 3;
        this.game.player.x = 50;
        this.game.player.y = this.game.height - this.game.player.height;
        this.game.player.lv = 1;
    }
}