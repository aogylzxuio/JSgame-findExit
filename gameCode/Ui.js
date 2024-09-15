export class UI {
    constructor(num,map,lv){
        this.x = 50;
        this.y = 50;
        this.width = 30;
        this.height = 30;
        this.num = num;
        this.fontSize = 50;
        this.fontFamily = 'Helvetica';
        this.map = map;
        this.lv = lv;
    }
    update(num,map,lv){
        this.num = num;
        this.map = map;
        this.lv = lv;
    }
    draw(context){
        for(let i = 0;i < this.num;i++){
            context.fillRect(this.x + 50 * i,this.y,this.width,this.height);
            context.font = this.fontSize + 'px ' + this.fontFamily;
        }
        context.fillText(this.map,850,90);
        context.fillText("LV : " +this.lv,450,90);
    }
}

export class WinUI extends UI {
    constructor(num,map,lv,player,game){
        super(num,map,lv);
        this.exitX = 700;
        this.exitY = 450;
        this.exitWidth = 50;
        this.exitHeight = 50;
        this.player = player;
        this.game = game;
    }
    update(num,map,lv){
        super.update(num,map,lv);
        if(this.player.x - this.player.width * 0.5 < this.exitX + this.exitWidth && this.player.x + this.player.width * 0.5 > this.exitX){
            if(this.player.y + this.player.height * 0.5 > this.exitY && this.player.y - this.player.height * 0.5 < this.exitY + this.exitHeight){
                this.player.width--;
                this.player.height--;
            }
        }
    }
    draw(context){
        super.draw(context);
        context.textAlign = 'center';
        context.fillText("EXIT",this.exitX + this.exitWidth * 0.5,440);
        context.strokeRect(this.exitX,this.exitY,this.exitWidth,this.exitHeight);
    }
}
