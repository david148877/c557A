
let d3 = require('d3');
let colors = d3.interpolateCool;
let __opts = {};
export class Map{
    constructor(map){
        if(new.target !== Map){
            throw new Error("you should use new to create a instance!");
        }
        this.map = d3.select("#"+map);
        this.layers = this.map.append('g')
            .attr('id','layers');
        Object.assign(__opts,{
            width: +this.map.attr('width'),
            height: +this.map.attr('height'),
            colors:colors,
            graticule:d3.geoGraticule(),
            simulation : d3.forceSimulation()
                .force("link", d3.forceLink().id(function(d) { return d.id; }))
                .force("charge", d3.forceManyBody().distanceMax(10))
                .force("center", d3.forceCenter())//+this.map.attr('width')/2, +this.map.attr('height')/2
        });
        this.mapId = map;
    }

    forceDirectedGraph(graph, options){
        this.reset();
        let _options ={};
        Object.assign(_options,__opts,options);

        let simulation = _options.simulation;

        simulation.nodes(graph.nodes)
            .force("link")
            .links(graph.links)
            .distance(100);

        //draw links
        let link = this.layers.selectAll('.link')
            .data(graph.links);
        let links=link.enter().append('line')
            .attr('stroke',"#fff");

        //draw nodes
        let node = this.layers.selectAll('.node')
            .data(graph.nodes);
        let nodes = node.enter().append('g')
            .attr('class','abc').append('circle')
            .attr('fill',(d,i)=>_options.colors(i))
            .attr('r',10)
            .attr('stroke','black')
            .attr("stroke-width",1)
            .call(d3.drag()
                .on("start", function () {
                    if (!d3.event.active) simulation.alphaTarget(0.1).restart();
                    d3.event.subject.fx = d3.event.subject.x;
                    d3.event.subject.fy = d3.event.subject.y;
                })
                .on("drag", function () {
                    d3.event.subject.fx = d3.event.x;
                    d3.event.subject.fy = d3.event.y;
                })
                .on("end", function () {
                    if (!d3.event.active) simulation.alphaTarget(0);
                    d3.event.subject.fx = null;
                    d3.event.subject.fy = null;
                }));

        let text = this.layers.selectAll('text')
            .data(graph.nodes);

        let texts=text.enter().append('text')
            .text((d)=>d.id)
            .attr('fill',(d,i)=>_options.colors(i));


        //
        simulation.on("tick", function() {
            links.attr("x1", (d) => d.source.x)
                .attr("y1", (d) => d.source.y)
                .attr("x2", (d) =>d.target.x)
                .attr("y2", (d) =>d.target.y);

            nodes.attr("cx", (d) => d.x)
                .attr("cy", (d) =>d.y);

            texts.attr('x',(d)=>d.x + 10)
                .attr('y',(d)=>d.y + 5);
        });

    }
    reset(){
        let map = document.getElementById(this.mapId);
        map.parentNode.removeChild(map);
        this.map = d3.select('#wrap')
            .append('svg')
            .attr('id','map')
            .attr('width',1500)
            .attr('height',1000);

        //this.map = d3.select("#"+map);
        this.layers = this.map.append('g')
            .attr('id','layers');
        Object.assign(__opts,{
            width: +this.map.attr('width'),
            height: +this.map.attr('height'),
            colors:colors,
            graticule:d3.geoGraticule(),
            simulation : d3.forceSimulation()
                .force("link", d3.forceLink().id(function(d) { return d.id; }))
                .force("charge", d3.forceManyBody())
                .force("center", d3.forceCenter(+this.map.attr('width')/2, +this.map.attr('height')/2))
        });
    }
}