import { PrimaryAttack } from "./playerAttack.js";

export class Player{
    constructor(game){
        this.game = game;
        this.lv = 1;
        this.width = 50;
        this.height = 50;
        this.x = this.width * 0.5 + Math.random() * 50;
        this.y = game.height - this.height;
        this.speed = 5;
        this.vy = 0;
        this.gravity = 1;
        this.direction = 1;
        this.jumpForce = 15;
        this.attack = [];
        this.attackInstantiate = new PrimaryAttack(this);
        this.attackTimer = 0;
        this.attackInterval = 700;
        this.attackDisappear = 500;
        this.attackDeleteTimer = this.attackDisappear;
        this.attackSpeed = 10;
        this.attackSpeedDefault = 10;
        this.rollAngle = 0;
        this.rollspeed = 0.1;
        this.dashing = false;
        this.dashTimer = 0;
        this.dashInterval = 50;
        this.canDash = true;
        this.canDashInterval = -500;
        this.canDashTimer = this.canDashInterval;
        this.dashForce = 12;
        this.isSkyGround = false;
        this.hp = 3 ;
        this.exp = 0;
        this.expMax = 5;
        this.invincible = false;
        this.invincibleTotal = 1000;
        this.invincibleTimer = this.invincibleTotal;
        this.triangleSpeed = 4;
        this.WallStop1 = 1000;
        this.WallStop2 = 0;
    }
    update(input,deltaTime){
        // high Wall
        if(this.game.mapUseNum == 8){
            this.WallStop1 = 1000;
            this.WallStop2 = 0;
        }else if(this.game.mapUseNum == 10 || this.game.mapUseNum == 11){
            this.WallStop1 = 950;
            this.WallStop2 = 299;
        }
        else if(this.game.mapUseNum == 13){
            this.WallStop1 = 500;
            this.WallStop2 = 299;
        }else {
            this.WallStop1 = 700;
            this.WallStop2 = 299;
        }
        // win
        if(this.width < 10) this.game.win();
        // map convert
        if(this.x > this.game.width && this.game.mapUseNum != 13) {
            this.x = -this.width;
            this.game.mapUseNum++;
        }
        else if(this.x + this.width < 0 && this.game.mapUseNum != 1) {
            this.x = this.game.width - 1;
            this.game.mapUseNum--;
        }
        if(this.x < this.width * 0.5  && this.game.mapUseNum == 1){
            this.x = this.width * 0.5;
        } else if(this.x > this.game.width - this.width * 0.5 && this.game.mapUseNum == 13){
            this.x = this.game.width - this.width * 0.5;
        }
        // invincible
        if(this.invincible) {
            this.invincibleTimer -= deltaTime;
            if(this.invincibleTimer < 0 ) {
                this.invincible = false;
                this.invincibleTimer = this.invincibleTotal;
            }
        }
        // lv
        if (this.exp > this.expMax) {
            this.lv++;
            this.hp++;
            this.exp = 0;
            this.expMax = this.expMax + this.lv * 2;
        }
        // dash, not other active
        this.canDashTimer += deltaTime;
        if(this.canDashTimer > 0) this.canDash = true;
        if(this.dashing) {
            if(this.direction == -1){
                this.x -= this.speed * (this.dashForce);
            }else if(this.direction == 1){
                this.x += this.speed * (this.dashForce);
            }
        }
        if(this.dashing){
            this.dashTimer += deltaTime;
            if(this.dashTimer > this.dashInterval){
                this.dashing = false;
                this.dashTimer = 0;
                this.canDash = false;
                this.canDashTimer = this.canDashInterval;
            }
        }
        if(input.includes('Shift') && this.canDash == true) this.dash(deltaTime);
        else {
        // move
        if(input.includes('A') || input.includes("a")) {
            this.x -= this.speed;
            this.direction = -1;
        }
        else if(input.includes('D') || input.includes("d")) {
            this.x += this.speed;
            this.direction = 1;
        }
        // roll
        if(input.includes('q') || input.includes("Q")) this.rollAngle -= this.rollspeed;
        else if(input.includes('e') || input.includes("E")) this.rollAngle += this.rollspeed;
        // jump
        this.y -= this.vy;
        if(!this.onGround()) this.vy -= this.gravity;
        if((this.onGround() || this.isSkyGround) && (input.includes('w') || input.includes(' ') || input.includes('W'))) {
            this.vy = this.jumpForce + 0.55 * this.lv;
            this.isSkyGround = false;
        }
        if(this.y > this.game.height - this.height * 0.5 ) this.y = this.game.height - this.height * 0.5;
        // sky ground
        this.checkSkyGround();
        // attack
        this.attackTimer -= deltaTime;
        if(input.includes('Enter') && this.attackTimer < 0) {
            this.addAttack();
            this.attackTimer = this.attackInterval;
        }
        this.attack.forEach(attack => {
            attack.update(this.direction,this.attackSpeed);
        })
        if(this.attack.length != 0) this.detectionEnemy();
        // attack delete
        if(this.attack.length != 0){
            this.attackDeleteTimer -= deltaTime;
            if(this.attackDeleteTimer < this.attackDisappear * 0.5) this.attackSpeed = -this.attackSpeedDefault;
            if(this.attackDeleteTimer < 0) this.deleteAttack();
        }
        }
        
    }
    draw(context){
        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.rollAngle);
        context.fillRect(-this.width * 0.5,-this.height * 0.5,this.width,this.height);
        this.attack.forEach(attack => {
            attack.draw(context);
        })
        context.restore();
    }
    addAttack(){
        this.attack.push(this.attackInstantiate);
    }
    detectionEnemy(){
        this.game.enemies.forEach((enemy,index) => {
            this.attack.forEach(attack => {
                if(enemy.x < attack.x + this.x + attack.lengthX * Math.cos(this.rollAngle)){
                    if(enemy.x + enemy.width > this.x + attack.x + attack.lengthX * Math.cos(this.rollAngle)) {
                        if(enemy.y < attack.y + this.y + attack.lengthX * Math.sin(this.rollAngle)){
                            if(enemy.y + enemy.height > attack.y + this.y + attack.lengthX * Math.sin(this.rollAngle)){
                                enemy.x = attack.x + this.x + attack.lengthX * Math.cos(this.rollAngle) - enemy.width * 0.5;
                                enemy.y = attack.y + this.y + attack.lengthX * Math.sin(this.rollAngle) - enemy.height * 0.5;
                                enemy.destroy(index,Math.cos(this.rollAngle),this.x - this.width * 0.5,this.y,this.width,this.height);
                                this.exp += enemy.exp;
                            }
                        }
                    }
                }
            })
        })
    }
    deleteAttack(){
        this.attackDeleteTimer = this.attackDisappear;
        this.attackSpeed = this.attackSpeedDefault;
        this.attack.forEach(attack => {
            attack.reset();
        })
        this.attack.splice(0,1);
        this.resetAttack();
    }
    resetAttack(){
        this.attackInstantiate.reset();
    }
    onGround(){
        if(this.y >= this.game.height - this.height * 0.5) return true;
        else return false;
    }
    checkSkyGround(){
        this.game.grounds.forEach(ground => {
            if(this.y - this.height * 0.5 < this.WallStop1 || ground.height < this.WallStop2){
                if(this.x - this.width * 0.5 < ground.x + ground.width && this.x + this.width * 0.5 > ground.x ){
                    if(this.y + this.height * 0.5 > ground.y && this.y - this.height * 0.5 < ground.y + ground.height) {
                        this.isSkyGround = true;
                        this.y = ground.y - this.height * 0.5;
                        this.vy = 0;
                    }
                }
            }else if(this.x - this.width * 0.5 < ground.x + ground.width && this.x + this.width * 0.5 > ground.x ){
                if(this.x - this.width * 0.5 < ground.x + ground.width){
                    this.x = ground.x - this.width;
                }
            }
            
            if(( Math.min(ground.x1,ground.x2,ground.x3) <= 0 || Math.max(ground.x1,ground.x2,ground.x3) >= 1100 ) && (this.x + this.width * 0.5 < Math.max(ground.x1,ground.x2,ground.x3) && this.x + this.width * 0.5 > Math.min(ground.x1,ground.x2,ground.x2))){
                if(this.y > Math.min(ground.y1,ground.y2,ground.y3) + (Math.max(ground.y1,ground.y2,ground.y3) - Math.min(ground.y1,ground.y2,ground.y3)) * ((this.x - Math.min(ground.x1,ground.x2,ground.x3)) / (Math.max(ground.x1,ground.x2,ground.x3) - Math.min(ground.x1,ground.x2,ground.x3))) - this.height * 0.5){
                    this.y = Math.min(ground.y1,ground.y2,ground.y3) + (Math.max(ground.y1,ground.y2,ground.y3) - Math.min(ground.y1,ground.y2,ground.y3)) * ((this.x - Math.min(ground.x1,ground.x2,ground.x3)) / (Math.max(ground.x1,ground.x2,ground.x3) - Math.min(ground.x1,ground.x2,ground.x3))) - this.height * 0.5;
                    this.x += this.triangleSpeed;
                }
            }else if( Math.min(ground.x1,ground.x2,ground.x3) > 0 && (this.x + this.width * 0.5 < Math.max(ground.x1,ground.x2,ground.x3) && this.x + this.width * 0.5 > Math.min(ground.x1,ground.x2,ground.x2))){
                if(this.y - this.height > Math.min(ground.y1,ground.y2,ground.y3) + (Math.max(ground.y1,ground.y2,ground.y3) - Math.min(ground.y1,ground.y2,ground.y3)) * ((this.x - Math.min(ground.x1,ground.x2,ground.x3)) / (Math.max(ground.x1,ground.x2,ground.x3) - Math.min(ground.x1,ground.x2,ground.x3))) - this.height * 0.5){
                    if(!this.invincible) {
                        this.hp--;
                        this.invincible = true;
                    }
                }
            }
            if(this.game.mapUseNum==6 && this.x + this.width * 0.5 < 0){
                if(this.y > 600) this.y = 600;
            }
        })
    }
    dash(deltaTime){
        this.dashing = true;
    }
}


