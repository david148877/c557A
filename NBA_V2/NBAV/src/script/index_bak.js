
import '../css/style.css';
let d3 = require('d3');
let {Bar} = require('./Bar');
let {Common} = require('./Common');
let {Text} = require('./Text');


let bar = new Bar("canvas");
let text = new Text('canvas');
bar.init({
    initX:260,
    initY:200,
    barH:20,
    len:500,
    interval:10,
    showMiddleLine:true
});
text.init({
    initX:220,
    initY:200,
    interval:30
});

d3.csv('data/data.csv',(d)=>{
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
    "use strict";
    if(error)
        throw new Error('an error occurred while retrieving data');

    d3.select("#bar").on("click",function () {
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

        bar.barHorizontal([_data[0],_data[1]]);
        text.textHorizontal(Object.keys(_data[0]),{
            font:"bold 14px Arial",
            textAlign:"center",
            textBaseline:"top",
            fillStyle:"#7FFFD4"
        });

    });
    d3.select("#themeriver").on("click",function () {
        alert("coming soon");
    });
    d3.select("#force").on("click",function () {
        alert("coming soon");
    });
    d3.select("#text").on("click",function () {
        alert("coming soon");
    });

    //show bar
    d3.select("#bar").dispatch('click');
});

