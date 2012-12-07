//TODO: Figuring out what data comes from where. 


var data = [];
var max = 100;
for (var i=0; i<10; i++){
    var y = Math.random()*max;
    data.push({x:i, y:y});
}

function get(prop){
    return function(d){
        return d[prop];
    };
}

var barSeries = {
    name: 'example',
    color: 'blue',
    renderer: 'bar',
    wide: true,
    dataTransform: function(d){
        return {
            x: d.x,
            y: (max - d.y)
        };
    },
    xValue: get("x"),
    yValue: get("y"),
    tooltip: function(d){
        return "On "+ d.y +" there were " + d.x + " guys online.";
    },
    afterDrag: function(d){
        return console.log("bar dragged "+d);
    }
};

var lineSeries = {
    name: 'example',
    color: 'red',
    renderer: 'line',
    dataTransform: function(d){
        return {
            x: d.x,
            y: (2+d.y)
        };
    },
    xValue: get("x"),
    yValue: get("y"),
    tooltip: function(d){
        return "On "+ d.y +" there were " + d.x + " guys online.";
    },
    afterDrag: function(d){
        return console.log("line dragged "+d);
    }
};

var chart = new Tactile.Chart({
      axes:{
          x: "time",
          y: "linear"
      },
      series:[barSeries,lineSeries],
      timeFrame: [-5, 6],
      data: data,
      element:$("#test")[0]                                  
      });

chart.render();
