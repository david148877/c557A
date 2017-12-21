//claire the map size
var mapWidth = 12,
    mapHeight = 8,
    cellSize = 55,
    margin = 4;


var width = mapWidth * cellSize + margin,
    height = mapHeight * cellSize + margin;


//Define the color scale according to the election percentage
var colors={colr_1: '#003D7A',colr_2: "#02509E",colr_3: "#2E82BF",colr_4: "#68ADD8",colr_5: "#9CC9E2",colr_6: "#C5DBF0",
            colr_7: "#FEBB9E",colr_8: "#FE926E",colr_9: "#FE6943",colr_10: "#E12B1B",colr_11: "#A70A0A",colr_12: "#890202"};


var mapOtl = {
  '': (
    'AK,AL,AR,AZ,CA,CO,CT,DC,DE,FL,GA,HI,IA,ID,' +
    'IL,IN,KS,KY,LA,MA,MD,ME,MI,MN,MO,MS,MT,NC,' +
    'ND,NE,NH,NJ,NM,NV,NY,OH,OK,OR,PA,RI,SC,SD,' +
    'TN,TX,UT,VA,VT,WA,WI,WV,WY'
  )
};

var svg = d3.select('#main')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .call(responsivefy)


//d3 effect, attribute and function
d3.json('doc/data/data.json', function(error, data) {
    var stateIds = data.map(function(d) { return d.id; });

    var state = svg.append('g')
        .attr('transform', 'translate(' + margin / 2 + ',' + margin / 2  + ')')
      .selectAll('.state')
        .data(data)
      .enter().append('g')
        .attr('class', 'state')
        .attr('transform', function(d) {
          return 'translate(' + d.grid.x * cellSize + ',' + (d.grid.y - 1) * cellSize + ')';
        })
        .on('mouseover', showDetail )
        .on('mouseout', hideDetail );
        //.

    //d3.js dynamic generating rect for State tile      
    state.append('rect')
        .attr('width', cellSize - 2)     //-2 narrow the boundary, to see the State tile clearly
        .attr('height', cellSize - 2)    //-2 to see the State tile clearly 
        .style('fill',  function(d){
          
          //BLUE WIN
          if(d.id=="DC")
            return '#003D7A'
          if(d.id=="HI"||d.id=="CA"||d.id=="MA"||d.id=='VT')
            return '#02509E'
          if(d.id=="WA"||d.id=="OR"||d.id=="NV")
            return '#2E82BF'
          if(d.id=="CO"||d.id=="NM"||d.id=="MN"||d.id=="IL"||d.id=="MD")
            return '#68ADD8'
          if(d.id=="VA"||d.id=="DE"||d.id=="NJ"||d.id=="NY"||d.id=="DE"||d.id=="ME"||d.id=="RI"||d.id=="CT")
            return '#9CC9E2'
          if(d.id=="NH")
            return '#C5DBF0'
          
          //red win
          if(d.id=="WV"||d.id=="WY")
            return '#890202'
          if(d.id=="OK"||d.id=="ND"||d.id=="")
            return '#A70A0A'
          if(d.id=="AL"||d.id=="KY"||d.id=="SD"||d.id=="ID")
            return '#E12B1B'
          if(d.id=="SC"||d.id=="IN"||d.id=="AR"||d.id=="TN"||d.id=="MO"||d.id=="NE"||d.id=="KS"||d.id=="MT"||d.id=="UT"||d.id=="LA")
            return '#FE6943'
          if(d.id=="GA"||d.id=="OH"||d.id=="IA"||d.id=="AK"||d.id=="TX")
            return '#FE962E'

          else                    //MI  PA  FL  WI  NC MS  AZ
            return '#FEBB9E'
        })

        .on("mouseover", function(d){

          d3.select('.header').text(
          'State:' + d.name + '\n'+
          'Votes:' + d.votes+ '\n'+
          'D_Percentage:' +'\n'+ d.D_Percentage+'%'+'\n'+
          'D_Votes:'+'\n' +d.D_Votes+ '\n'+
          'R_Percentage:' +'\n' +d.R_Percentage+'%'+'\n'+
          'R_Votes:' +'\n' +d.R_Votes

      );
            console.log(d);

        });

    //To show State name on State tile    
    state.append('text')
        .attr('x', cellSize / 2)
        .attr('y', cellSize / 2)
        .attr('dy', '.35em')
        .text(function(d) { return d.name_short; });

    //To show election votes number on State tile    
    state.append('text')
        .attr('class', 'votes')
        .attr('x', cellSize - 4)
        .attr('y', cellSize - 5)
        .text(function(d) { return d.votes; });

    parseUrl();


    //Before Hovering
    function parseUrl() {
      var picks = top.location.hash.slice(1).split(',');
      picks.forEach(function(d) {

      });
    }

    //--------------------- Hovering Part ---------------------------------
    var detailWindow = d3.select('#detail');

    function showDetail(d) {
      this.style.stroke = 'black';
      // d. name, votes
      d3.select('.header').text(
        //'State: ' + d.name_short
        //'Votes: ' +d.votes
      );
      // d3.select('.header').votes(
      //   'Votes: ' + d.votes
      // );

    
      //adjust the style of tooltip 
      detailWindow.style('display', 'block');
      detailWindow.style('left', '20px');
      detailWindow.style('height','180px');
      detailWindow.style('width','175px');
    }

    function hideDetail(d) {
      this.style.stroke = 'none';
      detailWindow.style('display', 'none');
    }

    // var detailVotes=d3.select('#detail');
    // function  




/*     function update() {
      updateColors();
      
    } */

    /* function updateColors() {
      state.data(data);
      state.select('rect').style('fill', function(d) {
        return d.win ? colors[d.win] : '#dedede';
      });
    } */

});

//draw map
function responsivefy(svg) {
  var container = d3.select(svg.node().parentNode),
      width = parseInt(svg.style('width')),
      height = parseInt(svg.style('height')),
      aspect = width / height;

  svg.attr('viewBox', '0 0 ' + width + ' ' + height)
      .attr('perserveAspectRatio', 'xMinYMid')
      .call(resize);

  d3.select(window).on('resize.' + container.attr('id'), resize);


  function resize() {
    var targetWidth = parseInt(container.style('width'));
    svg.attr('width', targetWidth);
    svg.attr('height', Math.round(targetWidth / aspect));
  }
}