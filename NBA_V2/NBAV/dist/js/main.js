webpackJsonp([0],[
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var d3 = __webpack_require__(0);

var Common = exports.Common = function () {
    function Common() {
        _classCallCheck(this, Common);
    }

    _createClass(Common, null, [{
        key: "stackMin",
        value: function stackMin(data) {
            return d3.min(data, function (d) {
                return d[0];
            });
        }
    }, {
        key: "stackMax",
        value: function stackMax(data) {
            return d3.max(data, function (d) {
                return d[1];
            });
        }
    }, {
        key: "OjbectMaxV",
        value: function OjbectMaxV(data) {
            return d3.max(data, function (d) {
                d3.max(Object.values(d));
            });
        }
    }, {
        key: "OjbectMinV",
        value: function OjbectMinV(data) {
            return d3.min(data, function (d) {
                d3.min(Object.values(d));
            });
        }
    }]);

    return Common;
}();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var d3 = __webpack_require__(0);

var _require = __webpack_require__(1),
    Common = _require.Common;

var colors = d3.interpolateCool;

var Bar = exports.Bar = function () {
    function Bar(canvas) {
        _classCallCheck(this, Bar);

        if (new.target !== Bar) {
            throw new Error("you should use new to create a instance!");
        }
        typeof canvas === 'string' ? this.canvas = document.getElementById(canvas) : this.canvas = canvas;

        Object.assign(this, {
            context: this.canvas.getContext('2d'),
            width: +this.canvas.width,
            height: +this.canvas.height,
            colors: colors
        });

        var self = this;
        function getProto(obj) {
            if (obj.__proto__) {
                return obj.__proto__;
            } else {
                return obj.constructor.prototype;
            }
        }
        var canvasRenderingContext2D = getProto(this.context);
        var moveToFun = canvasRenderingContext2D.moveTo;
        canvasRenderingContext2D.lastMoveToLocation = {};
        canvasRenderingContext2D.moveTo = function (x, y) {
            moveToFun.call(self.context, x, y);
            this.lastMoveToLocation.x = x;
            this.lastMoveToLocation.y = y;
        };
        canvasRenderingContext2D.dashLineTo = function (x, y, dashLength) {
            dashLength = dashLength === undefined ? 5 : dashLength;
            var startX = this.lastMoveToLocation.x,
                startY = this.lastMoveToLocation.y,
                deltaX = x - startX,
                deltaY = y - startY,
                numDashes = Math.floor(Math.sqrt(deltaX * deltaX + deltaY * deltaY) / dashLength);
            for (var i = 0; i < numDashes; ++i) {
                this[i % 2 === 0 ? 'moveTo' : 'lineTo'](startX + deltaX / numDashes * i, startY + deltaY / numDashes * i);
            }
            this.moveTo(x, y);
        };
    }

    _createClass(Bar, [{
        key: 'init',
        value: function init(opts) {
            Object.assign(this, opts);
        }
    }, {
        key: 'barHorizontal',
        value: function barHorizontal(data) {
            var _this = this;

            this.clear();
            var keys = Object.keys(data[0]);
            keys.forEach(function (d, i) {
                var d0p = data[0][d] / (data[0][d] + data[1][d]);
                var d1p = data[1][d] / (data[0][d] + data[1][d]);
                _this.context.fillStyle = _this.colors(0);
                _this.context.fillRect(_this.initX, _this.initY + i * _this.interval + i * _this.barH, _this.len * d0p, _this.barH);

                _this.context.fillStyle = _this.colors(1);
                _this.context.fillRect(_this.initX + _this.len * d0p, _this.initY + i * _this.interval + i * _this.barH, _this.len * d1p, _this.barH);
            });
            if (this.showMiddleLine) {
                this.context.strokeStyle = 'black';
                this.context.moveTo(this.initX + this.len / 2, this.initY - 10);
                this.context.dashLineTo(this.initX + this.len / 2, this.initY + keys.length * (this.interval + this.barH) + 10);
                this.context.stroke();
            }
        }
    }, {
        key: 'barVertical',
        value: function barVertical() {}
    }, {
        key: 'clear',
        value: function clear() {}
    }]);

    return Bar;
}();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Chart = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Common = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var time = [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017];
var d3 = __webpack_require__(0);

var Chart = exports.Chart = function () {
    function Chart(svg) {
        _classCallCheck(this, Chart);

        if (new.target !== Chart) {
            throw new Error("Chart 不是函数，请使用new来生成实例~~~");
        }

        if (typeof svg === 'string') {
            this.svg = d3.select("#" + svg);
        } else {
            this.svg = svg;
        }
        //this.context = this.canvas.getContext('2d');

        var options = this.options = {};
        //let d3Canvas = d3.select(this.canvas);
        options.padding = 50;
        options.width = +this.svg.attr('width') - options.padding;
        options.height = 600; //+this.svg.attr('height')/5*3;
        options.color = d3.interpolateCool;
    }

    _createClass(Chart, [{
        key: 'themeRiver',
        value: function themeRiver(data, options) {
            //todo 构造options

          
            //this.context.translate(50,0);
            var _options = this.options;
            //todo 添加一些themeRiver特有的配置属性
            Object.assign(_options, {
                order: d3.stackOrderNone, //次序是根据keys得到的，相当于没有排序
                offset: d3.stackOffsetWiggle
            });
            Object.assign(_options, options);

            var auxiliaryG = this.svg.append('g');

            console.log(data[0]);
            var keys = Object.keys(data[0]);

            var sliceK = keys.slice(1);
            var stack = d3.stack().keys(sliceK).order(_options.order).offset(_options.offset);

            var _data = stack(data);

            var x = d3.scaleLinear().domain([0, time.length + 1]).range([0, _options.width]);

            var y = d3.scaleLinear().domain([d3.min(_data, _Common.Common.stackMin), d3.max(_data, _Common.Common.stackMax)]).range([_options.height, 0]);

            var z = d3.scaleLinear().domain([0, sliceK.length]).range([0, 1]);

            var area = d3.area().x(function (d, i) {
                return x(i);
            }).y0(function (d) {
                return y(d[0]);
            }).y1(function (d) {
                return y(d[1]);
            }).curve(d3.curveNatural);
            //.context(this.context);

            
            var arc2 = d3.arc().innerRadius(0).outerRadius(_options.height / 4);
            var pie = d3.pie().value(function (d) {
                return d['v'];
            });

            var streamG = this.svg.append("g").attr('transform', 'translate(70,50)');

            streamG.selectAll(".stream").data(_data).enter().append("path").attr("class", 'stream').attr('transform', 'translate(' + _options.padding + ',0)').attr("d", area).attr("fill", function (d, i) {
                return _options.color(z(i));
            });

            //
            var buffer = [];
            for (var i = 0; i < time.length; i++) {
                var d = x(i);
                buffer.push([d - 10, d + 10]);
            }
            var popup = d3.select("#popup");

            /*let currentArc = null;
            this.svg.on('mousemove',()=>{
                let coords = d3.mouse(document.getElementById("svg"));
                  let flag = true;
                for(let i = 0; i<buffer.length; i++){
                    let b = buffer[i];
                    let x = coords[0] - _options.padding;
                    if(x > b[0] && x < b[1]){
                        flag = false;
                        //let k = sliceK[i];
                        let total = 0;
                          let auxiliaryData = [];
                        let d = data[i];
                          for(let i=0, sliceNames=names.slice(1); i< sliceNames.length; i++){
                            let de = sliceNames[i];
                            popup.select("#"+de).html(de+":" + d[de])
                                .style('color',_options.color(z(i)));
                            total += d[de];
                            auxiliaryData.push({
                                area:de,
                                v:d[de]
                            })
                        }
                        popup.select("#total").html('Total: ' + total);
                        popup.transition().duration(1000).style('opacity','0.8');
                          //
                        let _auxD = pie(auxiliaryData);
                          let update = auxiliaryG.selectAll('.aux').data(_auxD);
                          currentArc = update.enter().append("path")
                            .merge(update)
                            .attr('class','aux')
                            .attr('d',arc2)
                            .attr('transform','translate('+_options.width/2+','+(_options.height/3-30)+')')
                            .style('fill',function(d,i) { return _options.color(z(i));})
                            .transition()
                            .duration(1000)
                            //.attr('d',arc2)
                            .style('opacity',1);
                        break;
                    }
                }
                if(flag){
                    if(currentArc !== null){
                        currentArc.transition()
                            .duration(1000)
                            /!*.attr('d',arc1)*!/
                            .style('opacity',0.2);
                    }
                    currentArc=null;
                    popup.transition().duration(1000).style('opacity','0.2');
                }
            });
            this.svg.on('mouseout',()=>{
                if(currentArc !== null){
                    currentArc.transition()
                        .duration(1000)
                        /!*.attr('d',arc1)*!/
                        .style('opacity',0.2);
                }
                currentArc=null;
                popup.transition().duration(1000).style('opacity','0.2');});*/

            var orderScale = d3.scaleOrdinal().domain(time).range(function () {
                var range = [];
                for (var _i = 0; _i <= time.length; _i++) {
                    range.push(x(_i));
                }
                return range;
            }());
            //x axis

            //let svg = d3.select("#svg");
            streamG.append("g").attr("transform", "translate(" + _options.padding + "," + _options.height + ")").call(d3.axisBottom(orderScale).ticks(time.length));
            //y axis
            var axisLeft = this.axis([d3.max(_data, _Common.Common.stackMax), d3.min(_data, _Common.Common.stackMin)], {
                scale: d3.scaleLinear,
                direction: 'axisLeft'
            });
            streamG.append("g").attr("transform", "translate(" + _options.padding + ",0)").call(d3.axisLeft(y));

            /* streamG.append("g")
             .attr("transform", "translate("+_options.padding+",0)")
             .call(d3.axisBottom(orderScale).ticks(time.length));*/
        }

   

    }, {
        key: 'axis',
        value: function axis(domain, option) {
            var _option = this.options;
            //
            Object.assign(_option, {
                scale: d3.scaleOrdinal,
                direction: 'axisBottom',
                order: 'asc'
            });
            //
            Object.assign(_option, option);

            var scale = _option.scale().domain(domain);

            if (_option.order === 'asc') {
                if (_option.direction === 'axisBottom' || _option.direction === 'axisTop') {
                    scale.range([0, _option.width]);
                } else if (_option.direction === 'axisLeft' || _option.direction === 'axisRight') {
                    scale.range([0, _option.height]);
                }
            } else {
                if (_option.direction === 'axisBottom' || _option.direction === 'axisTop') {
                    scale.range([_option.width, 0]);
                } else if (_option.direction === 'axisLeft' || _option.direction === 'axisRight') {
                    scale.range([_option.height, 0]);
                }
            }

            //d3.axisBottom(orderScale)
            return d3[_option.direction](scale);
        }
    }]);

    return Chart;
}();

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }


var d3 = __webpack_require__(0);
var colors = d3.interpolateCool;
var __opts = {};

var Map = exports.Map = function () {
    function Map(map) {
        _classCallCheck(this, Map);

        if (new.target !== Map) {
            throw new Error("you should use new to create a instance!");
        }
        this.map = d3.select("#" + map);
        this.layers = this.map.append('g').attr('id', 'layers');
        Object.assign(__opts, {
            width: +this.map.attr('width'),
            height: +this.map.attr('height'),
            colors: colors,
            graticule: d3.geoGraticule(),
            simulation: d3.forceSimulation().force("link", d3.forceLink().id(function (d) {
                return d.id;
            })).force("charge", d3.forceManyBody().distanceMax(10)).force("center", d3.forceCenter()) //+this.map.attr('width')/2, +this.map.attr('height')/2
        });
        this.mapId = map;
    }

    _createClass(Map, [{
        key: "forceDirectedGraph",
        value: function forceDirectedGraph(graph, options) {
            this.reset();
            var _options = {};
            Object.assign(_options, __opts, options);

            var simulation = _options.simulation;

            simulation.nodes(graph.nodes).force("link").links(graph.links).distance(100);

            //draw links
            var link = this.layers.selectAll('.link').data(graph.links);
            var links = link.enter().append('line').attr('stroke', "#fff");

            //draw nodes
            var node = this.layers.selectAll('.node').data(graph.nodes);
            var nodes = node.enter().append('g').attr('class', 'abc').append('circle').attr('fill', function (d, i) {
                return _options.colors(i);
            }).attr('r', 10).attr('stroke', 'black').attr("stroke-width", 1).call(d3.drag().on("start", function () {
                if (!d3.event.active) simulation.alphaTarget(0.1).restart();
                d3.event.subject.fx = d3.event.subject.x;
                d3.event.subject.fy = d3.event.subject.y;
            }).on("drag", function () {
                d3.event.subject.fx = d3.event.x;
                d3.event.subject.fy = d3.event.y;
            }).on("end", function () {
                if (!d3.event.active) simulation.alphaTarget(0);
                d3.event.subject.fx = null;
                d3.event.subject.fy = null;
            }));

            var text = this.layers.selectAll('text').data(graph.nodes);

            var texts = text.enter().append('text').text(function (d) {
                return d.id;
            }).attr('fill', function (d, i) {
                return _options.colors(i);
            });

            //
            simulation.on("tick", function () {
                links.attr("x1", function (d) {
                    return d.source.x;
                }).attr("y1", function (d) {
                    return d.source.y;
                }).attr("x2", function (d) {
                    return d.target.x;
                }).attr("y2", function (d) {
                    return d.target.y;
                });

                nodes.attr("cx", function (d) {
                    return d.x;
                }).attr("cy", function (d) {
                    return d.y;
                });

                texts.attr('x', function (d) {
                    return d.x + 10;
                }).attr('y', function (d) {
                    return d.y + 5;
                });
            });
        }
    }, {
        key: "reset",
        value: function reset() {
            var map = document.getElementById(this.mapId);
            map.parentNode.removeChild(map);
            this.map = d3.select('#wrap').append('svg').attr('id', 'map').attr('width', 1500).attr('height', 1000);

            //this.map = d3.select("#"+map);
            this.layers = this.map.append('g').attr('id', 'layers');
            Object.assign(__opts, {
                width: +this.map.attr('width'),
                height: +this.map.attr('height'),
                colors: colors,
                graticule: d3.geoGraticule(),
                simulation: d3.forceSimulation().force("link", d3.forceLink().id(function (d) {
                    return d.id;
                })).force("charge", d3.forceManyBody()).force("center", d3.forceCenter(+this.map.attr('width') / 2, +this.map.attr('height') / 2))
            });
        }
    }]);

    return Map;
}();

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }




var d3 = __webpack_require__(0);
var colors = d3.interpolateCool;
var opt = {};

var ParallelCoordinates = exports.ParallelCoordinates = function () {
    function ParallelCoordinates(svg) {
        _classCallCheck(this, ParallelCoordinates);

        if (new.target !== ParallelCoordinates) {
            throw new Error("you should use new to create a instance!");
        }
        typeof svg === "string" ? this.svg = d3.select("#" + svg) : this.svg = d3.select(svg);

        this.g = this.svg.append('g').attr('id', 'ParallelCoordinates');

        opt = {};
        Object.assign(opt, {
            width: +this.svg.attr('width'),
            height: +this.svg.attr('height'),
            color: colors
        });
    }

    _createClass(ParallelCoordinates, [{
        key: "init",
        value: function init(opts) {
            Object.assign(opt, opts);
        }
    }, {
        key: "render",
        value: function render(data) {
            var _this = this;

            this.clean();
            //
            var keys = Object.keys(data[0]);
            opt.keys = keys;
            opt.data = data;
            var self = this;
            var _data = keys.map(function (k) {
                var innerD = [];
                data.forEach(function (d) {
                    innerD.push(d[k]);
                });
                return innerD;
            });

            //if(!opt.scaleX){
            opt.scaleX = d3.scaleLinear().domain([0, keys.length - 1]).range([opt.initX, opt.initX + opt.width]);
            //}

            //if(!opt.scaleYs){
            opt.scaleYs = [];
            _data.forEach(function (d, i) {
                opt.scaleYs[i] = d3.scaleLinear().domain(d3.extent(d)).range([opt.initY + opt.height, opt.initY]);
            });
            //}
            if (typeof opt.colorTransform !== 'function') {
                opt.colorTransform = d3.scaleLinear().domain([0, keys.length]).range([0, 1]);
            }

            opt.line = d3.line();

            // Add blue foreground lines for focus.
            this.g.append("g")
            //.attr("class", "foreground")
            .selectAll("path").data(data).enter().append("path").attr('class', 'pl').attr("d", ParallelCoordinates.path).style('stroke', function (d, i) {
                return opt.color(opt.colorTransform(i));
            }).style('stroke-width', 1).style('fill', 'none').on('click', function (d, i) {
                self.render(data);
                d3.selectAll('.pl').filter(function (_d, i) {
                    return d !== _d;
                }).style('stroke', '#ddd').style('shape-rendering', 'crispEdges').style('fill', 'none');
                d3.event.stopPropagation();
            });

            var brush = d3.brush().on("start", brushStart.bind(this)).on("end", brushended);
            // Add an axis and title.
            var axisY = this.g.append("g").attr('id', 'axisY');
            keys.forEach(function (d, i) {
                axisY.append('g').attr('class', 'axis').call(d3.axisLeft(opt.scaleYs[i])).attr("transform", "translate(" + opt.scaleX(i) + ",0)").append('text').style("text-anchor", "middle").attr("y", opt.initY - 10).style("stroke", 'black').style('fill', 'none').text(d);
                //add brush
                _this.g.append('g').attr('bid', i).attr("class", "brush").attr('width', '30').attr("transform", "translate(" + opt.scaleX(i) + ",0)").call(brush).selectAll("rect").attr("x", -8).attr("width", 16);
            });

            this.svg.on('click', function () {
                self.render(data);
            });
        }
    }, {
        key: "setScaleX",
        value: function setScaleX(scaleX) {
            this.scaleX = scaleX;
        }
    }, {
        key: "setScaleYs",
        value: function setScaleYs(scaleYs) {
            this.scaleYs = scaleYs;
        }
    }, {
        key: "colorTransfom",
        value: function colorTransfom(colorTransform) {
            opt.colorTransform = colorTransform;
        }
    }, {
        key: "clean",
        value: function clean() {
            this.g.remove();
            this.g = this.svg.append('g').attr('id', 'ParallelCoordinates');
            //this.g.html("");
        }
    }], [{
        key: "path",
        value: function path(d) {
            return opt.line(Object.keys(d).map(function (_d, i) {
                return [opt.scaleX(i), opt.scaleYs[i](d[_d])];
            }));
        }
    }]);

    return ParallelCoordinates;
}();

function brushStart() {
    //console.log(('brushed'));
    this.render(opt.data);
}
function brushended(d) {
    var selection = d3.event.selection;
    var minX = selection[0][0];
    var minXY = selection[0][1];
    var maxX = selection[1][0];
    var maxXY = selection[1][1];

    var i = d3.select(this).attr('bid');

    d3.selectAll('.pl').filter(function (_d) {
        var val = opt.scaleYs[i](_d[opt.keys[i]]);
        return !(val >= minXY && val <= maxXY);
    }).style('stroke', '#ddd').style('shape-rendering', 'crispEdges').style('fill', 'none');
    //d3.event.stopPropagation();
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }





var d3 = __webpack_require__(0);

var Text = exports.Text = function () {
    function Text() {
        _classCallCheck(this, Text);

        if (new.target !== Text) {
            throw new Error("you should use new to create a instance!");
        }
        typeof canvas === 'string' ? this.canvas = document.getElementById(canvas) : this.canvas = canvas;

        Object.assign(this, {
            context: this.canvas.getContext('2d'),
            width: +this.canvas.width,
            height: +this.canvas.height
        });
    }

    _createClass(Text, [{
        key: 'init',
        value: function init(opts) {
            Object.assign(this, opts);
        }
    }, {
        key: 'textHorizontal',
        value: function textHorizontal(data, contextSetting) {
            var _this = this;

            this.clear();

            Object.assign(this.context, contextSetting);

            data.forEach(function (d, i) {
                _this.context.fillText(d, _this.initX, _this.initY + i * _this.interval);
            });
        }
    }, {
        key: 'clear',
        value: function clear() {}
    }]);

    return Text;
}();

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }




var d3 = __webpack_require__(0);

var _require = __webpack_require__(1),
    Common = _require.Common;

var colors = d3.interpolateCool;
var c_circle = "c_circle",
    c_timeText = "c_timeText";

var TimeAxis = exports.TimeAxis = function () {
    function TimeAxis(svg) {
        _classCallCheck(this, TimeAxis);

        if (new.target !== TimeAxis) {
            throw new Error("you should use new to create a instance!");
        }
        typeof svg === "string" ? this.svg = d3.select("#" + svg) : this.svg = d3.select(svg);

        this.g = this.svg.append('g').attr('id', 'TimeAxis');
        this._opt = {
            initX: 100,
            initY: 100,
            width: 1000,
            radius: 10,
            lineColor: "#000000",
            lineWidth: 1,
            line_DashArray: "2 2",
            color: colors
        };
    }

    _createClass(TimeAxis, [{
        key: "init",
        value: function init(opt) {
            Object.assign(this._opt, opt);
        }
    }, {
        key: "rander",
        value: function rander(timeRange) {
            //
            var timeAxis = this.g,
                line = d3.line(),
                opt = this._opt,
                interval = opt.width / timeRange.length,
                _color = null;

            if (opt.color === d3.interpolateCool) {
                var x = d3.scaleLinear().domain([0, timeRange.length]).range([0, 1]);

                _color = d3.scaleLinear().domain([0, timeRange.length - 1]).range([opt.color(x(0)), opt.color(x(timeRange.length - 1))]);
            } else {
                _color = opt.color;
            }
            timeAxis.append("path").attr("d", function () {
                return line([[opt.initX, opt.initY], [opt.initX + opt.width, opt.initY]]);
            }).style("stroke", opt.lineColor).style("stroke-width", opt.lineWidth).style("stroke-dasharray", opt.line_DashArray);

            this.g.selectAll("." + c_circle).data(timeRange).enter().append("circle").attr("class", c_circle).attr("cx", function (d, i) {
                return opt.initX + i * interval + 40;
            }).attr("cy", opt.initY).attr("r", opt.radius).style("fill", function (d, i) {
                return _color(i);
            }).on("click", function (d, i) {
                d3.select("#hightLight").remove();

                timeAxis.append("circle").attr("cx", this.getAttribute("cx")).attr("cy", this.getAttribute("cy")).attr("r", opt.radius + 5).attr("id", "hightLight").style("stroke", "#21ccd2").style("stroke-width", 2).style("fill", this.style.fill);
            });
            this.g.selectAll("." + c_timeText).data(timeRange).enter().append("text").attr("class", c_timeText).attr("x", function (d, i) {
                return opt.initX + i * interval + 40;
            }).attr("y", opt.initY + 2 * opt.radius + 10).style("fill", "#535252").style("font-size", "10px").style("font-weight", "bold").style("text-anchor", "middle").text(function (d) {
                return d.getFullYear();
            });
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
    }, {
        key: "on",
        value: function on(type, callback) {
            this.g.selectAll("." + c_circle).on(type, callback);
        }
    }]);

    return TimeAxis;
}();

/***/ }),
/* 8 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 9 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 10 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(9);

__webpack_require__(10);

__webpack_require__(8);

var d3 = __webpack_require__(0); 


var _require = __webpack_require__(2),
    Bar = _require.Bar;

var _require2 = __webpack_require__(1),
    Common = _require2.Common;

var _require3 = __webpack_require__(6),
    Text = _require3.Text;

var _require4 = __webpack_require__(5),
    ParallelCoordinates = _require4.ParallelCoordinates;

var _require5 = __webpack_require__(7),
    TimeAxis = _require5.TimeAxis;

var _require6 = __webpack_require__(3),
    Chart = _require6.Chart;

var _require7 = __webpack_require__(4),
    Map = _require7.Map;

var currentPlayerDiv = null; //
var leftOrRight = null; //

var pc = new ParallelCoordinates('svg');
var timeAxis = new TimeAxis('svg');
var map = new Map("map");
pc.init({
    initX: 100,
    initY: 100,
    width: 1300,
    height: 600
});
timeAxis.init({
    initX: 280,
    initY: 30,
    width: 1000
});

var bar = new Bar("canvas");
var text = new Text('canvas');
var chart = new Chart('themeRiver');
bar.init({
    initX: 500,
    initY: 200,
    barH: 20,
    len: 500,
    interval: 10,
    showMiddleLine: true
});
text.init({
    initX: 460,
    initY: 200,
    interval: 30
});

var queue = d3.queue();
var themeRiverData = {
    Age: [],
    GP: [],
    MPG: [],
    FTA: [],
    PPG: [],
    RPG: [],
    SPG: [],
    BPG: []
};
[2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017].forEach(function (d, i) {
    "use strict";

    queue.defer(d3.csv, "data/" + d + ".csv", function (d) {
        "use strict";

        d.Age = +d.Age + 1;
        d.GP = +d.GP + 1;
        d.MPG = +d.MPG + 1;
        d.FTA = +d.FTA + 1;
        d.PPG = +d.PPG + 1;
        d.RPG = +d.RPG + 1;
        d.SPG = +d.SPG + 1;
        d.BPG = +d.BPG + 1;
        return d;
    }, function (error, data) {
        if (error) throw new Error('an error occurred while retrieving data');

        ["Age", "GP", "MPG", "FTA", "PPG", "RPG", "SPG", "BPG"].forEach(function (p) {
            var obj = {};
            obj.time = d;
            data.forEach(function (_d, i) {
                obj[_d["Name"]] = _d[p] + 1;
            });
            themeRiverData[p].push(obj);
            // console.log(obj);
        });
    });
});

queue.await(function (error, data) {
    if (error) throw new Error('an error occurred while retrieving data');
    alert("abc");
    //console.log(themeRiverData);
});

d3.csv('data/2017.csv', function (d) {
    "use strict";

    d.Age = +d.Age + 1;
    d.GP = +d.GP + 1;
    d.MPG = +d.MPG + 1;
    d.FTA = +d.FTA + 1;
    d.PPG = +d.PPG + 1;
    d.RPG = +d.RPG + 1;
    d.SPG = +d.SPG + 1;
    d.BPG = +d.BPG + 1;
    return d;
}, function (error, data) {
    "use strict";

    if (error) throw new Error('an error occurred while retrieving data');

    //console.log(data);
    var playerNames = [];
    var _data = data.map(function (d) {
        playerNames.push(d.Name.replace(",", "_"));
        return {
            Age: d.Age + 1,
            GP: d.GP + 1,
            MPG: d.MPG + 1,
            FTA: d.FTA + 1,
            PPG: d.PPG + 1,
            RPG: d.RPG + 1,
            SPG: d.SPG + 1,
            BPG: d.BPG + 1
        };
    });
    var barData = [_data[0], _data[1]];
    var playerSelPlane = d3.select("#playerSel");
    var playerSel = playerSelPlane.selectAll("div").data(playerNames).enter().append("div").attr("pid", function (d, i) {
        return i;
    }).html(function (d) {
        return d;
    }).on("click", function (d, i) {
        d3.select(currentPlayerDiv).html(playerNames[d3.select(this).attr("pid")]);
        playerSelPlane.style("display", "none");

        if (leftOrRight === "left") {
            barData[0] = _data[d3.select(this).attr("pid")];
        } else if (leftOrRight === "right") {
            barData[1] = _data[d3.select(this).attr("pid")];
        }
        bar.barHorizontal(barData);
    });

    d3.select("#seledLeft").html(playerNames[0]).on("click", function (d, i) {
        currentPlayerDiv = this;
        leftOrRight = "left";
        playerSelPlane.style("display", "block");
    });
    d3.select("#seledRight").html(playerNames[0]).on("click", function (d, i) {
        currentPlayerDiv = this;
        leftOrRight = "right";
        playerSelPlane.style("display", "block");
    });

    var timeRange = [];
    timeRange.push.apply(timeRange, [new Date("2010"), new Date("2011"), new Date("2012"), new Date("2013"), new Date("2014"), new Date("2015"), new Date("2016"), new Date("2017")]);
    timeAxis.rander(timeRange);

    pc.render(_data);
    d3.select("#ParallelCoordinates").selectAll(".pl").on("click.foo", function (d, i) {
        d3.select("#seledLeft").html(playerNames[i]);
        barData[0] = _data[i];
        bar.barHorizontal(barData);
    });

    timeAxis.on("click.foo", function (d, i) {
        var year = d.getFullYear();
        d3.csv("data/" + year + ".csv", function (d) {
            "use strict";

            d.Age = +d.Age;
            d.GP = +d.GP;
            d.MPG = +d.MPG;
            d.FTA = +d.FTA;
            d.PPG = +d.PPG;
            d.RPG = +d.RPG;
            d.SPG = +d.SPG;
            d.BPG = +d.BPG;
            return d;
        }, function (error, data) {
            if (error) throw new Error('an error occurred while retrieving data');

            var _data = data.map(function (d) {
                return {
                    Age: d.Age,
                    GP: d.GP,
                    MPG: d.MPG,
                    FTA: d.FTA,
                    PPG: d.PPG,
                    RPG: d.RPG,
                    SPG: d.SPG,
                    BPG: d.BPG
                };
            });
            pc.render(_data);
            d3.select("#ParallelCoordinates").selectAll(".pl").on("click.foo", function (d, i) {
                d3.select("#seledLeft").html(playerNames[i]);
                barData[0] = _data[i];
                bar.barHorizontal(barData);
            });
        });
    });

    bar.barHorizontal(barData);
    text.textHorizontal(Object.keys(_data[0]), {
        font: "bold 14px Arial",
        textAlign: "center",
        textBaseline: "top",
        fillStyle: "#7FFFD4"
    });
    console.log(themeRiverData);
    chart.themeRiver(themeRiverData.FTA);

    //

    d3.csv("data/2010.csv", function (d) {
        return d;
    }, function (error, data) {
        var team = {};
        var forceData = {
            nodes: [],
            links: []
        };
        data.forEach(function (d, i) {
            forceData.nodes.push({ id: d["Name"] });
            var arr = team[d["Team"]];
            if (!arr) {
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
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = Object.keys(team)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var k = _step.value;

                var arr = team[k];
                for (var i = 0; i < arr.length - 1; i++) {
                    for (var j = i + 1; j < arr.length; j++) {
                        forceData.links.push({ source: arr[i], target: arr[j] });
                    }
                }
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        var rainbow = d3.interpolateRainbow,
            convert = d3.scaleLinear().domain([0, forceData['nodes'].length]).range([0, 1]);
        //draw

        map.forceDirectedGraph(forceData, { colors: function colors(i) {
                return rainbow(convert(i));
            } });
    });

    //
});

/***/ })
],[11]);