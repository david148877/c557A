
let d3 = require('d3');
let {Common} = require('./Common');
let colors = d3.interpolateCool;
export class Bar{
    constructor(canvas){
        if(new.target !== Bar){
            throw new Error("you should use new to create a instance!");
        }
        typeof canvas === 'string'?
            this.canvas = document.getElementById(canvas):
            this.canvas = canvas;

        Object.assign(this,{
            context: this.canvas.getContext('2d'),
            width: +this.canvas.width,
            height: +this.canvas.height,
            colors:colors
        });

        let self = this;
        function getProto(obj) {
            if(obj.__proto__){
                return obj.__proto__;
            }else {
                return obj.constructor.prototype;
            }
        }
        let canvasRenderingContext2D=getProto(this.context);
        let moveToFun=canvasRenderingContext2D.moveTo;
        canvasRenderingContext2D.lastMoveToLocation={};
        canvasRenderingContext2D.moveTo=function (x, y) {
            moveToFun.call(self.context,x,y);
            this.lastMoveToLocation.x=x;
            this.lastMoveToLocation.y=y;
        };
        canvasRenderingContext2D.dashLineTo=function (x, y, dashLength) {
            dashLength=dashLength===undefined? 5 : dashLength;
            let startX=this.lastMoveToLocation.x,
                startY=this.lastMoveToLocation.y,
                deltaX=x-startX,
                deltaY=y-startY,
                numDashes=Math.floor(Math.sqrt(deltaX*deltaX+deltaY*deltaY)/dashLength);
            for(let i=0; i<numDashes; ++i){
                this[i%2 ===0? 'moveTo' : 'lineTo'](startX+(deltaX/numDashes)*i,startY+(deltaY/numDashes)*i);
            }
            this.moveTo(x,y);
        };
    }
    init(opts){
        Object.assign(this,opts);
    }
    barHorizontal(data){
        this.clear();
        let keys = Object.keys(data[0]);
        keys.forEach((d,i)=>{
            let d0p = data[0][d]/(data[0][d]+data[1][d]);
            let d1p = data[1][d]/(data[0][d]+data[1][d]);
            this.context.fillStyle=this.colors(0);
            this.context.fillRect(this.initX, this.initY +i*this.interval + i*this.barH, this.len*d0p, this.barH);

            this.context.fillStyle=this.colors(1);
            this.context.fillRect(this.initX + this.len*d0p, this.initY +i*this.interval + i*this.barH, this.len*d1p, this.barH);
        });
        if(this.showMiddleLine){
            this.context.strokeStyle='black';
            this.context.moveTo(this.initX+this.len/2, this.initY - 10);
            this.context.dashLineTo(this.initX+this.len/2, this.initY + keys.length * (this.interval + this.barH) + 10);
            this.context.stroke();
        }

    }
    barVertical(){

    }
    clear(){

    }
}