class Attack{
    constructor(player){
        this.player= player;
        this.x = 0;
        this.y = 0;
        this.lengthXSpeed = 1;
        this.lengthX = 0;
        this.lengthY = 1;
        this.direction = 1;
        this.lookField = 15;
        this.fastSpeed = 6;
    }
    reset(){
        this.lengthX = 0;
    }
}

export class PrimaryAttack extends Attack {
    constructor(player){
        super(player);
        if(player.direction == 1) this.lengthX = 25;
        else if(player.direction == -1) this.lengthX = -25;
    }
    update(dir,speed){
        this.lengthX += speed;
    }
    draw(context){
        context.beginPath();
        context.fillRect(this.x,this.y,this.lengthX,this.lengthY);
        context.stroke();
    }
}
