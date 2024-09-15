class Attack {
    constructor(x,y,dir,speed){
        this.width = 30;
        this.height = 30;
        this.interval = 30;
        this.x = x + this.interval * dir;
        this.y = y;
        this.dir = dir;
        this.attackSpeed = 5;
    }
}

export class AttackStab extends Attack {
    constructor(x,y,dir,speed){
        super(x,y,dir,speed);
    }
    update(speed,player){
        this.x += (this.attackSpeed + speed) * this.dir;
        if(this.x < player.x + player.width && this.x + this.width > player.x){
            if(this.y < player.y + player.height && this.y + this.height > player.y){
                if(!player.invincible) {
                    player.hp--;
                    // console.log(player.hp);
                    player.invincible = true;
                }
            }
        }
    }
    draw(context){
        context.save();
        context.fillStyle = "red";
        context.fillRect(this.x,this.y,this.width,this.height);
        context.restore();
    }
}