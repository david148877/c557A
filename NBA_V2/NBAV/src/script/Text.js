
let d3 = require('d3');
export class Text{
    constructor(){
        if(new.target !== Text){
            throw new Error("you should use new to create a instance!");
        }
        typeof canvas === 'string'?
            this.canvas = document.getElementById(canvas):
            this.canvas = canvas;

        Object.assign(this,{
            context: this.canvas.getContext('2d'),
            width: +this.canvas.width,
            height: +this.canvas.height
        });
    }
    init(opts){
        Object.assign(this,opts);
    }
    textHorizontal(data, contextSetting){
        this.clear();

        Object.assign(this.context,contextSetting);

        data.forEach((d,i)=>{
            this.context.fillText(d,this.initX, this.initY +i*this.interval);
        });
    }
    clear(){}
}