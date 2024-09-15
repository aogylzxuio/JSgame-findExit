import { AttackStab } from "./EnemyAttack.js";
class Enemy {
    constructor(game,x,y,isGroundStart,isGroundEnd){
        this.game = game;
        this.width = 50;
        this.height = 50;
        this.x = x + 50;
        this.y = y - this.height;
        this.isGroundStart = isGroundStart;
        this.isGroundEnd = isGroundEnd;
        if(Math.random() > .5) this.direction = 1;
        else this.direction = -1;
        this.idleSpeed = 1 + Math.random() * 1.5;
        this.fastSpeed = 3;
        this.speed = this.idleSpeed;
        this.attackRangeX = 100;
        this.attack = [];
        this.attackTimer = 0;
        this.attackOver = 300;
        this.exp = 0;
    }
    destroy(index,cos,x,y,width,height){
        // if( this.x == x && this.y - this.height * 0.2 < y < this.y + this.height * 0.8) console.log("销毁自身");
        if(cos > 0){
            if( this.x < x + width * 0.5 ) this.game.enemies.splice(index,1);
        }else if(cos < 0){
            if( this.x > x - width * 0.5 ) this.game.enemies.splice(index,1);
        }else if(cos == 0){
            if( this.y > y - height * 0.5 && this.y < y + height * 0.5) this.game.enemies.splice(index,1);
        }
    }
}

export class Enemy1 extends Enemy {
    constructor(game,x,y,isGroundStart,isGroundEnd){
        super(game,x,y,isGroundStart,isGroundEnd);
        this.exp = 1;
    }
    update(playerX,playerY,deltaTime,playerWidth,playerHeight){
        if(this.x > this.isGroundEnd - this.width) this.direction = -1;
        if(this.x < this.isGroundStart) this.direction = 1;
        this.move(playerX - playerWidth * 0.5,playerY - playerHeight * 0.5);
        if(this.attack.length != 0) this.deleteAttack(deltaTime);
        this.attack.forEach(attack => {
            attack.update(this.speed,this.game.player);
        })
    }
    draw(context){
        context.fillRect(this.x,this.y,this.width,this.height);
        this.attack.forEach(attack => {
            attack.draw(context);
        })
    }
    move(playerX,playerY){
        this.x = this.x + this.speed * this.direction;
        if(this.detectionPlayer(playerX,playerY)) {
            if(this.facePlayer(playerX)){ //如果面对玩家了就停下然后攻击，否则快速跑到玩家身边
                this.addAttackStab();
            }else {
                this.speed = this.fastSpeed;
                if(this.attack.length > 0 && this.attackTimer>this.attackOver) {
                    this.attackTimer = 0;
                    this.attack.splice(0,1);
                }
            }
        }
        else this.speed = this.idleSpeed;
    }
    // detectionWall(){
    //     if(this.x > this.game.width - this.width || this.x < 0) return true;
    //     else return false;
    // }
    detectionPlayer(x,y){
        if(this.direction == 1){
            if(x > this.x && this.y + 30 > y && y > this.y - 30) return true;
            else return false;  
        }else if(this.direction == -1){
            if(x < this.x && this.y + 30 > y && y > this.y - 30) return true;
            else return false;
        }else return false;
    }
    facePlayer(x){
        if(this.direction == 1){
            if(this.x > x - this.attackRangeX) return true;
            else return false;
        }else if(this.direction == -1){
            if(this.x < x + this.attackRangeX) return true;
            else return false;
        }
    }
    addAttackStab(){
        this.speed = 0;
        if(this.attack.length == 0) {// 如果敌人没有攻击，那么增加一个攻击。
            this.attack.push(new AttackStab(this.x,this.y + this.height * 0.1,this.direction,this.speed));
            console.log("创建敌人攻击");
        }
    }
    deleteAttack(deltaTime){
        this.attackTimer += deltaTime;
        if(this.attackTimer > this.attackOver){
            this.attackTimer = 0;
            this.attack.splice(0,1);
        }
    }
}
export class Enemy2 extends Enemy {
    constructor(game,x,y,isGroundStart,isGroundEnd){
        super(game,x,y,isGroundStart,isGroundEnd);
        this.exp = 1;
        this.vy = 3 + Math.random() * 3; 
        this.rangeYUp = 200 + Math.random() * 100;
        this.rangeYdown = 600 + Math.random() * 100;
        this.vx = 2 + Math.random() * 4;
        this.rangeXUp = 200 + Math.random() * 100;
        this.rangeXdown = 600 + Math.random() * 100;
        this.gravity = 1;
        this.jumpForce = 15;
        this.randomX = 0;
    }
    update(playerX,playerY,deltaTime,playerWidth,playerHeight){
        if(this.x > this.isGroundEnd - this.width) this.direction = -1;
        if(this.x < this.isGroundStart) this.direction = 1;
        this.move(playerX - playerWidth * 0.5,playerY - playerHeight * 0.5);
        if(this.attack.length != 0) this.deleteAttack(deltaTime);
        this.attack.forEach(attack => {
            attack.update(this.speed,this.game.player);
        })
        this.y+=this.vy;
        if(this.y < this.rangeYUp) this.vy = 5;
        else if(this.y > this.rangeYdown) this.vy = -5;
        this.x+=this.vx;
        if(this.x < this.rangeXUp) this.vx = 5;
        else if(this.x > this.rangeXdown) this.vx = -5;
    }
    draw(context){
        context.fillRect(this.x,this.y,this.width,this.height);
        this.attack.forEach(attack => {
            attack.draw(context);
        })
    }
    move(playerX,playerY){
        this.x = this.x + this.speed * this.direction;
        if(this.detectionPlayer(playerX,playerY)) {
            if(this.facePlayer(playerX)){ //如果面对玩家了就停下然后攻击，否则快速跑到玩家身边
                this.addAttackStab();
            }else {
                this.speed = this.fastSpeed;
                if(this.attack.length > 0 && this.attackTimer>this.attackOver) {
                    this.attackTimer = 0;
                    this.attack.splice(0,1);
                }
            }
        }
        else this.speed = this.idleSpeed;
    }
    onGround(){
        if(this.y >= this.game.height - this.height * 0.5) return true;
        else return false;
    }
    // detectionWall(){
    //     if(this.x > this.game.width - this.width || this.x < 0) return true;
    //     else return false;
    // }
    detectionPlayer(x,y){
        if(this.direction == 1){
            if(x > this.x && this.y + 80 > y && y > this.y - 80) return true;
            else return false;  
        }else if(this.direction == -1){
            if(x < this.x && this.y + 80 > y && y > this.y - 80) return true;
            else return false;
        }else return false;
    }
    facePlayer(x){
        if(this.direction == 1){
            if(this.x > x - this.attackRangeX) return true;
            else return false;
        }else if(this.direction == -1){
            if(this.x < x + this.attackRangeX) return true;
            else return false;
        }
    }
    addAttackStab(){
        this.speed = 0;
        if(this.attack.length == 0) {// 如果敌人没有攻击，那么增加一个攻击。
            this.attack.push(new AttackStab(this.x,this.y + this.height * 0.1,this.direction,this.speed));
            console.log("创建敌人攻击");
        }
    }
    deleteAttack(deltaTime){
        this.attackTimer += deltaTime;
        if(this.attackTimer > this.attackOver){
            this.attackTimer = 0;
            this.attack.splice(0,1);
        }
    }
}