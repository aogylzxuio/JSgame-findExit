export class Ground{
    constructor(x,y,width,height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    draw(context){
        context.beginPath();
        context.rect(this.x,this.y,this.width,this.height);
        context.stroke();

    }
}
export class GroundTriangle{
    constructor(x1,y1,x2,y2,x3,y3){
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.x3 = x3;
        this.y3 = y3;
    }
    draw(context){
        context.save();
        context.beginPath();
        context.moveTo(this.x1,this.y1);
        context.lineTo(this.x2,this.y2);
        context.lineTo(this.x3,this.y3);
        context.closePath();
        context.fillStyle = 'gray';
        context.fill();
        context.restore();
    }
}