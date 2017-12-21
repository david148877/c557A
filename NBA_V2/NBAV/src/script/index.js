
import '../css/style.css';
import '../css/svg.css';
import '../css/nice-select.css';
let d3 = require('d3');
let {Bar} = require('./Bar');
let {Common} = require('./Common');
let {Text} = require('./Text');
let {ParallelCoordinates} = require('./ParallelCoordinates');
let {TimeAxis} = require('./TimeAxis');
let {Chart} = require("./Chart");
let {Map} = require("./Map");

let currentPlayerDiv=null;
let leftOrRight=null;

let pc = new ParallelCoordinates('svg');
let timeAxis = new TimeAxis('svg');
let map = new Map("map");
pc.init({
    initX:100,
    initY:100,
    width:1300,
    height:600
});
timeAxis.init({
    initX:280,
    initY:30,
    width:1000
});

let bar = new Bar("canvas");
let text = new Text('canvas');
let chart = new Chart('themeRiver');
bar.init({
    initX:500,
    initY:200,
    barH:20,
    len:500,
    interval:10,
    showMiddleLine:true
});
text.init({
    initX:460,
    initY:200,
    interval:30
});

let queue = d3.queue();
let themeRiverData = {
    Age:[],
    GP:[],
    MPG:[],
    FTA:[],
    PPG:[],
    RPG:[],
    SPG:[],
    BPG:[]
};
[2010,2011,2012,2013,2014,2015,2016,2017].forEach((d,i)=>{
    "use strict";
    queue.defer(d3.csv,"data/"+d+".csv",(d)=>{
        "use strict";
        d.Age = +d.Age + 1;
        d.GP =  +d.GP + 1;
        d.MPG = +d.MPG + 1;
        d.FTA = +d.FTA + 1;
        d.PPG = +d.PPG + 1;
        d.RPG = +d.RPG + 1;
        d.SPG = +d.SPG + 1;
        d.BPG = +d.BPG + 1;
        return d;
    },(error,data)=>{
        if(error)
            throw new Error('an error occurred while retrieving data');

        ["Age","GP","MPG","FTA","PPG","RPG","SPG","BPG"].forEach((p)=>{
            let obj={};
            obj.time = d;
            data.forEach((_d, i)=>{
                obj[_d["Name"]]=_d[p]+1;
            });
            themeRiverData[p].push(obj);
           // console.log(obj);
        });
    });
});

queue.await(function (error,data) {
    if(error)
        throw new Error('an error occurred while retrieving data');
    alert("abc");
    //console.log(themeRiverData);
});

d3.csv('data/2017.csv',(d)=>{
    "use strict";
    d.Age = +d.Age + 1;
    d.GP =  +d.GP + 1;
    d.MPG = +d.MPG + 1;
    d.FTA = +d.FTA + 1;
    d.PPG = +d.PPG + 1;
    d.RPG = +d.RPG + 1;
    d.SPG = +d.SPG + 1;
    d.BPG = +d.BPG + 1;
    return d;
},(error,data)=>{
    "use strict";
    if(error)
        throw new Error('an error occurred while retrieving data');

    //console.log(data);
    let playerNames = [];
    let _data = data.map((d)=>{
        playerNames.push(d.Name.replace(",","_"));
        return {
            Age:d.Age + 1,
            GP:d.GP + 1,
            MPG:d.MPG + 1,
            FTA:d.FTA + 1,
            PPG:d.PPG + 1,
            RPG:d.RPG + 1,
            SPG:d.SPG + 1,
            BPG:d.BPG + 1
        }
    });
    let barData=[_data[0], _data[1]];
    let playerSelPlane = d3.select("#playerSel");
    let playerSel = playerSelPlane.selectAll("div")
        .data(playerNames)
        .enter().append("div")
        .attr("pid",(d,i)=>i)
        .html((d)=>d)
        .on("click",function (d, i) {
            d3.select(currentPlayerDiv)
                .html(playerNames[d3.select(this).attr("pid")]);
            playerSelPlane.style("display","none");

            if(leftOrRight === "left"){
                barData[0]=_data[d3.select(this).attr("pid")]
            }else if(leftOrRight === "right"){
                barData[1]=_data[d3.select(this).attr("pid")]
            }
            bar.barHorizontal(barData);
        });

    d3.select("#seledLeft").html(playerNames[0])
        .on("click",function (d, i) {
            currentPlayerDiv = this;
            leftOrRight = "left";
            playerSelPlane.style("display","block");
        });
    d3.select("#seledRight").html(playerNames[0])
        .on("click",function (d, i) {
            currentPlayerDiv = this;
            leftOrRight = "right";
            playerSelPlane.style("display","block");
        });

    let timeRange = [];
    timeRange.push(...[new Date("2010"),new Date("2011"),new Date("2012"),new Date("2013"),
        new Date("2014"),new Date("2015"),new Date("2016"),new Date("2017")]);
    timeAxis.rander(timeRange);

    pc.render(_data);
    d3.select("#ParallelCoordinates").selectAll(".pl")
        .on("click.foo",function (d, i) {
            d3.select("#seledLeft")
                .html(playerNames[i]);
            barData[0]=_data[i];
            bar.barHorizontal(barData);
        });

    timeAxis.on("click.foo",function (d, i) {
        let year = d.getFullYear();
        d3.csv("data/"+year+".csv",(d)=>{
            "use strict";
            d.Age = +d.Age;
            d.GP =  +d.GP;
            d.MPG = +d.MPG;
            d.FTA = +d.FTA;
            d.PPG = +d.PPG;
            d.RPG = +d.RPG;
            d.SPG = +d.SPG;
            d.BPG = +d.BPG;
            return d;
        },(error,data)=>{
            if(error)
                throw new Error('an error occurred while retrieving data');

            let _data = data.map((d)=>{
                return {
                    Age:d.Age,
                    GP:d.GP,
                    MPG:d.MPG,
                    FTA:d.FTA,
                    PPG:d.PPG,
                    RPG:d.RPG,
                    SPG:d.SPG,
                    BPG:d.BPG
                }
            });
            pc.render(_data);
            d3.select("#ParallelCoordinates").selectAll(".pl")
                .on("click.foo",function (d, i) {
                    d3.select("#seledLeft")
                        .html(playerNames[i]);
                    barData[0]=_data[i];
                    bar.barHorizontal(barData);
                });
        });
    });

     bar.barHorizontal(barData);
     text.textHorizontal(Object.keys(_data[0]),{
         font:"bold 14px Arial",
         textAlign:"center",
         textBaseline:"top",
         fillStyle:"#7FFFD4"
     });
    console.log(themeRiverData);
    chart.themeRiver(themeRiverData.FTA);

    //force

    d3.csv("data/2010.csv",(d)=>{
        return d;
    },(error,data)=>{
        let team = {};
        let forceData={
            nodes:[],
            links:[]
        };
        data.forEach((d,i)=>{
                forceData.nodes.push({id:d["Name"]});
                let arr = team[d["Team"]];
                if(!arr){
                    arr = [];
                    team[d["Team"]] = arr;
                }
                arr.push(d["Name"]);
        });

        /*let team = {};
        for(let i=0, vals = Object.keys(_team); i<vals.length/2; i++){
            team[vals[i]] = _team[vals[i]];
        }*/

        console.log("team");
        console.log(team);
        for (let k of Object.keys(team)){
            let arr = team[k];
            for(let i=0; i< arr.length -1; i++){
                for(let j=i+1; j<arr.length; j++){
                    forceData.links.push({source: arr[i],target: arr[j]});
                }
            }
        }

        let rainbow = d3.interpolateRainbow,
            convert = d3.scaleLinear()
                .domain([0, forceData['nodes'].length])
                .range([0,1]);
        //draw

        map.forceDirectedGraph(forceData,{colors:(i)=>rainbow(convert(i))})

    });

    //
});

