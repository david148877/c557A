
let d3 = require("d3");
let {Common} = require('./Common');
let colors = d3.interpolateCool;
let [c_circle, c_timeText]=["c_circle","c_timeText"];
export class TimeAxis{
    constructor(svg){
        if(new.target !== TimeAxis){
            throw new Error("you should use new to create a instance!");
        }
        typeof svg ==="string"?
            this.svg = d3.select("#"+svg):
            this.svg = d3.select(svg);

        this.g = this.svg.append('g')
            .attr('id','TimeAxis');
        this._opt = {
            initX:100,
            initY:100,
            width:1000,
            radius:10,
            lineColor:"#000000",
            lineWidth:1,
            line_DashArray:"2 2",
            color:colors
        };
    }
    init(opt){
        Object.assign(this._opt,opt);
    }
    rander(timeRange){
        //
        let timeAxis = this.g,
            line = d3.line(),
            opt = this._opt,
            interval = opt.width/timeRange.length,
            _color = null;

        if(opt.color === d3.interpolateCool){
            let x = d3.scaleLinear()
                .domain([0,timeRange.length])
                .range([0,1]);

            _color = d3.scaleLinear()
                .domain([0,timeRange.length-1])
                .range([opt.color(x(0)),opt.color(x(timeRange.length-1))]);
        }else {
            _color = opt.color;
        }
        timeAxis.append("path")
            .attr(
                "d", () => line([[opt.initX,opt.initY],[opt.initX+opt.width,opt.initY]]))
            .style("stroke",opt.lineColor)
            .style("stroke-width",opt.lineWidth)
            .style("stroke-dasharray",opt.line_DashArray);

        this.g.selectAll("."+c_circle)
            .data(timeRange)
            .enter().append("circle")
            .attr("class",c_circle)
            .attr("cx",(d,i)=>opt.initX + i * interval + 40)
            .attr("cy",opt.initY)
            .attr("r",opt.radius)
            .style("fill",(d,i)=>_color(i))
            .on("click",function (d, i) {
                d3.select("#hightLight").remove();

                timeAxis.append("circle")
                    .attr("cx", this.getAttribute("cx"))
                    .attr("cy",this.getAttribute("cy"))
                    .attr("r",opt.radius+5)
                    .attr("id","hightLight")
                    .style("stroke","#21ccd2")
                    .style("stroke-width",2)
                    .style("fill", this.style.fill);



            });
        this.g.selectAll("."+c_timeText)
            .data(timeRange)
            .enter().append("text")
            .attr("class",c_timeText)
            .attr("x",(d,i)=>opt.initX + i * interval + 40)
            .attr("y",opt.initY + 2 * opt.radius + 10)
            .style("fill","#535252")
            .style("font-size", "10px")
            .style("font-weight","bold")
            .style("text-anchor","middle")
            .text((d)=>d.getFullYear());
        /*timeRange.forEach((d,i)=>{
            timeAxis.append("circle")
                .attr({
                    "cx": (i+1) * interval - 40,
                    "cy": 10,
                    "r":opt.radius,
                    "val":d[i]
                })
                .style({
                    "fill": function () {
                        let dataInTime = data[d[i]],
                            D_P = 0,
                            R_P = 0;
                        for(let i = 0; i<dataInTime.length; i++){
                            D_P += Number.parseFloat(dataInTime[i]["D_Percentage"]);
                            R_P += Number.parseFloat(dataInTime[i]["R_Percentage"]);
                        }
                        if(D_P > R_P){
                            return "#063E78";
                        }else {
                            return "#860408";
                        }
                    }
                })
                .on("click",function () {
                    d3.select("#hightLight").remove();

                    timeAxis.append("circle")
                        .attr({
                            "cx": this.getAttribute("cx"),
                            "cy": this.getAttribute("cy"),
                            "r": 15,
                            "id": "hightLight"
                        })
                        .style({
                            "stroke":"#21ccd2",
                            "stroke-width": "2",
                            "fill": this.style.fill
                        });
                    render(this.getAttribute("val"));
                });
            timeAxis.append("text")
                .attr({
                    "x": (i+1) * interval - 55,
                    "y": 40
                })
                .style({
                    "fill":"#535252",
                    "font-size": "10px",
                    "font-weight":"bold"
                })
                .text(d[i]);
        });
        for(let i=0, d = Object.keys(data); i<d.length; i++){

        }*/
    }
    on(type, callback){
        this.g.selectAll("."+c_circle)
            .on(type, callback);
    }
}