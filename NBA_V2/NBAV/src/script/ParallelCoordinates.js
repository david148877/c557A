
let d3 = require("d3");
let colors = d3.interpolateCool;
let opt = {};
export class ParallelCoordinates{
    constructor(svg){
        if(new.target !== ParallelCoordinates){
            throw new Error("you should use new to create a instance!");
        }
        typeof svg ==="string"?
            this.svg = d3.select("#"+svg):
            this.svg = d3.select(svg);

        this.g = this.svg.append('g')
            .attr('id','ParallelCoordinates');

        opt={};
        Object.assign(opt,{
            width: +this.svg.attr('width'),
            height: +this.svg.attr('height'),
            color: colors
        });

    }
    init(opts){
        Object.assign(opt,opts);
    }

    render(data){
        this.clean();
        //
        let keys = Object.keys(data[0]);
        opt.keys = keys;
        opt.data = data;
        let self = this;
        let _data = keys.map((k)=>{
            let innerD=[];
            data.forEach((d)=>{
                innerD.push(d[k]);
            });
            return innerD;
        });

        //if(!opt.scaleX){
            opt.scaleX = d3.scaleLinear()
                .domain([0,keys.length-1])
                .range([opt.initX, opt.initX+opt.width]);
        //}

        //if(!opt.scaleYs){
            opt.scaleYs = [];
            _data.forEach((d, i)=>{
                opt.scaleYs[i] = d3.scaleLinear()
                    .domain(d3.extent(d))
                    .range([opt.initY+opt.height, opt.initY]);
            });
        //}
        if(typeof opt.colorTransform !== 'function'){
            opt.colorTransform = d3.scaleLinear()
                .domain([0,keys.length])
                .range([0,1]);
        }

        opt.line = d3.line();


        // Add blue foreground lines for focus.
        this.g.append("g")
            //.attr("class", "foreground")
            .selectAll("path")
            .data(data)
            .enter().append("path")
            .attr('class','pl')
            .attr("d", ParallelCoordinates.path)
            .style('stroke',(d,i)=>opt.color(opt.colorTransform(i)))
            .style('stroke-width',1)
            .style('fill','none')
            .on('click',(d,i)=>{
                self.render(data);
                d3.selectAll('.pl')
                    .filter((_d,i)=>{
                        return d !== _d;
                    })
                    .style('stroke','#ddd')
                    .style('shape-rendering','crispEdges')
                    .style('fill','none');
                d3.event.stopPropagation();
            });


        let brush = d3.brush()
            .on("start", brushStart.bind(this))
            .on("end", brushended);
        // Add an axis and title.
        let axisY = this.g.append("g")
            .attr('id','axisY');
        keys.forEach((d,i)=>{
            axisY.append('g')
                .attr('class','axis')
                .call(d3.axisLeft(opt.scaleYs[i]))
                .attr("transform","translate("+opt.scaleX(i)+",0)")
                .append('text')
                .style("text-anchor", "middle")
                .attr("y", opt.initY - 10)
                .style("stroke",'black')
                .style('fill','none')
                .text(d);
            //add brush
            this.g.append('g')
                .attr('bid',i)
                .attr("class", "brush")
                .attr('width','30')
                .attr("transform","translate("+opt.scaleX(i)+",0)")
                .call(brush)
                .selectAll("rect")
                .attr("x", -8)
                .attr("width", 16);
        });

        this.svg.on('click',function () {
            self.render(data);
        });

    }

    setScaleX(scaleX){
        this.scaleX = scaleX;
    }
    setScaleYs(scaleYs){
        this.scaleYs = scaleYs;
    }
    colorTransfom(colorTransform){
        opt.colorTransform = colorTransform;
    }

    clean(){
        this.g.remove();
        this.g = this.svg.append('g')
            .attr('id','ParallelCoordinates');
        //this.g.html("");
    }
    static path(d){
        return opt.line(Object.keys(d).map((_d,i)=>{
            return [opt.scaleX(i),opt.scaleYs[i](d[_d])];
        }));
    }
}

function brushStart() {
    //console.log(('brushed'));
    this.render(opt.data);

}
function brushended(d) {
    let selection = d3.event.selection;
    let minX = selection[0][0];
    let minXY = selection[0][1];
    let maxX = selection[1][0];
    let maxXY = selection[1][1];


    let i = d3.select(this).attr('bid');

    d3.selectAll('.pl')
        .filter((_d)=>{
            let val = opt.scaleYs[i](_d[opt.keys[i]]);
            return !(val>=minXY && val<=maxXY);
        })
        .style('stroke','#ddd')
        .style('shape-rendering','crispEdges')
        .style('fill','none');
    //d3.event.stopPropagation();

}

