class Map {
    constructor(){
        this.groundX = [];
        this.groundY = [];
        this.groundWidth = [];
        this.groundHeight = [0.01,5,5,5,5,5,5,5,5,5,5];
        this.triangleX1 = [];
        this.triangleY1 = [];
        this.triangleX2 = [];
        this.triangleY2 = [];
        this.triangleX3 = [];
        this.triangleY3 = [];
    }
}

export class Map1 extends Map {
    constructor(game){
        super();
        this.groundX = [200,400,600,game.width - 500,game.width - 900,0];
        this.groundY = [game.height - 100,game.height - 230,game.height - 360,500,380,240];
        this.groundWidth = [100,400,400,100,400,300];
        this.groundHeight = [5,5,5,5,5,5,5,5,5,5];
    }
}
export class Map2 extends Map {
    constructor(game){
        super();
        this.groundX = [0,0,100,420,420,450,880,650];
        this.groundY = [game.height,game.height - 360,game.height - 660,game.height - 500,game.height - 780,game.height - 230,game.height - 120,game.height - 850];
        this.groundWidth = [game.width,400,300,100,100,420,200,300];
    }
}
export class Map3 extends Map {
    constructor(game){
        super();
        this.groundX = [0,70,570,300,900,900];
        this.groundY = [880,250,150,550,330,660];
        this.groundWidth = [100,400,100,500,100,100];
        this.groundHeight = [5,5,5,5,5,5,5,5,5,5];
    }
}
export class Map4 extends Map {
    constructor(game){
        super();
        this.groundX = [200,0,0,200,400,500,700,800];
        this.groundY = [700,330,660,500,300,600,200,700,];
        this.groundWidth = [300,100,100,100,100,100,100,100,];
        this.groundHeight = [400.01,5,5,30,30,30,30,30,];
    }
}
export class Map5 extends Map {
    constructor(game){
        super();
        this.groundX = [0,100,150,300,600,850,750];
        this.groundY = [game.height,200,700,500,500,350,600];
        this.groundWidth = [game.width,100,100,100,100,100,260];
        this.groundHeight = [0.01,30,30,30,30,30,600,];
    }
}
export class Map6 extends Map {
    constructor(game){
        super();
        this.groundX = [200,400,400,600,800,950];
        this.groundY = [200,400,600,500,350,280];
        this.groundWidth = [100,100,100,100,100,100];
        this.groundHeight = [5,5,5,5,5,5];
        this.triangleX1 = [-50];
        this.triangleY1 = [1000];
        this.triangleX2 = [-50];
        this.triangleY2 = [600];
        this.triangleX3 = [600];
        this.triangleY3 = [1000];
        for(let i = 0;i < 15;i++){
            this.triangleX1.push(615 + i * 30);
            this.triangleY1.push(915);
            this.triangleX2.push(600 + i * 30);
            this.triangleY2.push(1000);
            this.triangleX3.push(630 + i * 30);
            this.triangleY3.push(1000);
        }
    }
}
export class Map7 extends Map {
    constructor(game){
        super();
        this.groundX = [450,-20,200,400];
        this.groundY = [700,280,400,550,];
        this.groundWidth = [600,100,100,100];
        this.groundHeight = [800,5,50,50];
        for(let i = 0;i < 15;i++){
            this.triangleX1.push(15 + i * 30);
            this.triangleY1.push(915);
            this.triangleX2.push(0 + i * 30);
            this.triangleY2.push(1000);
            this.triangleX3.push(30 + i * 30);
            this.triangleY3.push(1000);
        }
    }
}
export class Map8 extends Map {
    constructor(game){
        super();
        this.groundX = [0,500,780,950];
        this.groundY = [700,550,450,500];
        this.groundWidth = [400,200,100,100];
        this.groundHeight = [500,100,100,100,];
        for(let i = 0;i < 20;i++){
            this.triangleX1.push(415 + i * 30);
            this.triangleY1.push(915);
            this.triangleX2.push(400 + i * 30);
            this.triangleY2.push(1000);
            this.triangleX3.push(430 + i * 30);
            this.triangleY3.push(1000);
        }
    }
}
export class Map9 extends Map {
    constructor(game){
        super();
        this.groundX = [-20,100,270,420,580,900];
        this.groundY = [500,600,500,600,750,880];
        this.groundWidth = [70,100,100,100,300,200];
        this.groundHeight = [100,100,100,100,5,500];
        for(let i = 0;i < 30;i++){
            this.triangleX1.push(15 + i * 30);
            this.triangleY1.push(915);
            this.triangleX2.push(0 + i * 30);
            this.triangleY2.push(1000);
            this.triangleX3.push(30 + i * 30);
            this.triangleY3.push(1000);
        }
    }
}
export class Map10 extends Map {
    constructor(game){
        super();
        this.groundX = [-50,880,200,320,450,630,750];
        this.groundY = [880,880,750,660,550,660,750];
        this.groundWidth = [150,200,50,50,100,50,50];
        this.groundHeight = [500,500,50,50,100,50,50];
        for(let i = 0;i < 26;i++){
            this.triangleX1.push(115 + i * 30);
            this.triangleY1.push(915);
            this.triangleX2.push(100 + i * 30);
            this.triangleY2.push(1000);
            this.triangleX3.push(130 + i * 30);
            this.triangleY3.push(1000);
        }
    }
}
export class Map11 extends Map {
    constructor(game){
        super();
        this.groundX = [-20,300,470,650,730,930,200];
        this.groundY = [880,400,680,830,550,650,750];
        this.groundWidth = [100,200,150,150,150,150,100];
        this.groundHeight = [500,5,5,5,5,5,100];
        for(let i = 0;i < 31;i++){
            this.triangleX1.push(100 + i * 30);
            this.triangleY1.push(915);
            this.triangleX2.push(85 + i * 30);
            this.triangleY2.push(1000);
            this.triangleX3.push(115 + i * 30);
            this.triangleY3.push(1000);
        }
    }
}
export class Map12 extends Map {
    constructor(game){
        super();
        this.groundX = [-20,200,350,450,660,700,550,900];
        this.groundY = [650,800,500,700,850,630,350,900];
        this.groundWidth = [100,50,50,50,50,50,80,150];
        this.groundHeight = [5,50,50,50,50,50,80,200];
        for(let i = 0;i < 30;i++){
            this.triangleX1.push(15 + i * 30);
            this.triangleY1.push(915);
            this.triangleX2.push(0 + i * 30);
            this.triangleY2.push(1000);
            this.triangleX3.push(30 + i * 30);
            this.triangleY3.push(1000);
        }
    }
}
export class Map13 extends Map {
    constructor(game){
        super();
        this.groundX = [-20,600,200,80,300,150,500];
        this.groundY = [900,500,750,650,500,380,250];
        this.groundWidth = [620,500,50,50,50,50,50];
        this.groundHeight = [200,600,50,50,50,50,50];
    }
}
