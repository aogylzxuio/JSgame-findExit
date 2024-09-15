import { Player } from "./player.js";
import { Input } from "./input.js";
import { Enemy1,Enemy2 } from "./Enemy.js";
import { Ground,GroundTriangle } from "./ground.js";
import { UI,WinUI } from "./Ui.js";
import { GameOverUI } from "./gameOverUI.js";
import { GameOverInput } from "./gameOverInput.js";
import { Map1,Map2,Map3,Map4,Map5,Map6,Map7,Map8,Map9,Map10,Map11,Map12,Map13 } from "./map.js";
// import { ThanksPlayer } from "./Thanks.js";

window.addEventListener('load',function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 1000;
    canvas.height = 1000;

    
    const mapName = {
        Map1:Map1,
        Map2:Map2,
        Map3:Map3,
        Map4:Map4,
        Map5:Map5,
        Map6:Map6,
        Map7:Map7,
        Map8:Map8,
        Map9:Map9,
        Map10:Map10,
        Map11:Map11,
        Map12:Map12,
        Map13:Map13,
    }
    class Game {
        constructor(width,height){
            this.debug = false;
            this.gameOver = false;
            this.width = width;
            this.height = height;
            this.input = new Input(this);
            this.enemies = [];
            this.grounds = [];
            this.mapNum = [];
            for(let i = 1;i <= 13;i++){
                this.mapNum.push(i);
            }
            this.mapUseNum = 6;
            this.mapSaveNum = this.mapUseNum;
            this.map = new mapName['Map' + this.mapUseNum](this);
            this.addGround();
            this.player = new Player(this);
            this.UI = new UI(this.player.hp,this.mapUseNum,this.player.lv);
            this.UInum = 1;
            this.winOver = false;
        }
        update(deltaTime){
            // console.log(this.mapUseNum+','+this.mapSaveNum);
            if(this.mapUseNum == 13 && this.enemies ==0 && this.UInum == 1){
                console.log(this.UInum,"改为2");
                this.UI = new WinUI(this.player.hp,this.mapUseNum,this.player.lv,this.player,this);
                this.UInum = 2;
            } else if(this.mapUseNum != 13 && this.enemies !=0 && this.UInum != 1) {
                console.log(this.UInum,"改为1");
                this.UI = new UI(this.player.hp,this.mapUseNum,this.player.lv);
                this.UInum = 1;
            }
            if(this.mapUseNum != this.mapSaveNum) {
                this.map = new mapName['Map' + this.mapUseNum](this);
                this.mapSaveNum = this.mapUseNum;
                this.enemies = [];
                this.grounds = [];
                this.addGround();
                console.log(this.mapUseNum);
            }
            if(!this.player.hp) this.gameOver = true;
            this.player.update(this.input.keys,deltaTime);
            this.enemies.forEach(enemy => {
                enemy.update(this.player.x,this.player.y,deltaTime,this.player.width,this.player.height);
                // if(index == 0) console.log(enemy.x+","+enemy.isGroundStart);
            })
            this.UI.update(this.player.hp,this.mapUseNum,this.player.lv);
        }
        draw(context){
            this.player.draw(context);
            this.grounds.forEach(ground => {
                ground.draw(context);
            })
            this.enemies.forEach(enemy => {
                enemy.draw(context);
            })
            this.UI.draw(context);
        }
        win(){
            this.winOver = true;
            this.player.hp = 0;
        }
        addEnemy1(x,y,isGroundStart,isGroundEnd){
            this.enemies.push(new Enemy1(this,x,y,isGroundStart,isGroundEnd));
            // console.log(isGroundStart);
        }
        addEnemy2(x,y,isGroundStart,isGroundEnd){
            this.enemies.push(new Enemy2(this,x,y,isGroundStart,isGroundEnd));
            // console.log(isGroundStart);
        }
        addGround(){
            for(let i = 0;i < this.map.groundX.length;i++){
                this.grounds.push(new Ground(this.map.groundX[i],this.map.groundY[i],this.map.groundWidth[i],this.map.groundHeight[i]));
            }
            for(let j = 0;j < this.map.triangleX2.length;j++){
                this.grounds.push(new GroundTriangle(this.map.triangleX1[j],this.map.triangleY1[j],this.map.triangleX2[j],this.map.triangleY2[j],this.map.triangleX3[j],this.map.triangleY3[j]));
            }
            this.map.groundWidth.forEach((ground,index) => {
                if(ground > 200){
                    this.addEnemy1(this.map.groundX[index],this.map.groundY[index],this.map.groundX[index],this.map.groundX[index] + this.map.groundWidth[index]);
                    // console.log(this.groundX[index]);
                }
            })
            this.map.groundHeight.forEach((ground,index) => {
                if(ground > 30){
                    this.addEnemy2(this.map.groundX[index],this.map.groundY[index],this.map.groundX[index],this.map.groundX[index] + this.map.groundWidth[index]);
                }
            })
        }
    }

    class GameOver {
        constructor(game){
            this.game = game;
            this.gameOverUI = new GameOverUI(game);
            this.input = new GameOverInput(game);
        }
        update(deltaTime){
            this.gameOverUI.update(deltaTime);
        }
        draw(context){
            this.gameOverUI.draw(context);
        }
    }

    const game = new Game(canvas.width,canvas.height);
    const gameOver = new GameOver(game);
    let lastTime = 0;
    function animation(timeStamp){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        let deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        game.update(deltaTime);
        game.draw(ctx);
        if(!game.gameOver && !game.winOver) requestAnimationFrame(animation);
        else if(game.gameOver && !game.winOver) overAnimate(0);
        else if(!game.gameOver && game.winOver) winAnimate();
    }
    animation(0);

    function overAnimate(timeStamp){
        ctx.clearRect(0,game.height * 0.5 + 50,game.width,30);
        let deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        gameOver.update(deltaTime);
        gameOver.draw(ctx);
        if(game.gameOver && !game.winOver) requestAnimationFrame(overAnimate);
        else if(!game.gameOver && !game.winOver) animation(0);
        else if(!game.gameOver && game.winOver) winAnimate();
    }

    function winAnimate(){
        ctx.textAlign = 'center';
        ctx.fillText("YOU WIN!",500,450);
        ctx.fillText("Thanks play game",500,500);
    }
})