
"use strict";
let d3 = require('d3');
export class Common{
    static stackMin(data){
        return d3.min(data,(d)=>d[0])
    }
    static stackMax(data){
        return d3.max(data,(d)=> d[1]);
    }
    static OjbectMaxV(data){
        return d3.max(data,(d)=>{
            d3.max(Object.values(d))
        });
    }
    static OjbectMinV(data){
        return d3.min(data,(d)=>{
            d3.min(Object.values(d))
        });
    }
}
