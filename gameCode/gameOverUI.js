export class GameOverUI {
    constructor(game){
        this.game = game;
        this.flickerTimer = 0;
        this.hideTimer = 400;
        this.noHideTimer = 800;
        this.hide = true;
        this.fontSize = 28;
        this.fontFamily = 'Helvetica';
    }
    update(deltaTime){
        if(this.game.gameOver){
            if(this.flickerTimer > this.noHideTimer){
                // console.log('显示')
                this.hide = false;
                this.flickerTimer = 0;
            }else if(this.flickerTimer > this.hideTimer){
                // console.log('隐藏1')
                this.hide = true;
                this.flickerTimer += deltaTime;
            } else {
                this.flickerTimer += deltaTime;
                // console.log('闪烁时间增加')
            }
        } else {
            this.hide = true;
            // console.log('隐藏2');
        }
    }
    draw(context){
        context.textAlign = 'center';
        context.font = this.fontSize + 'px ' + this.fontFamily;
        if(!this.hide)context.fillText("press 'Enter' restart game",this.game.width * 0.5,this.game.height * 0.5 + 70);
    }
}