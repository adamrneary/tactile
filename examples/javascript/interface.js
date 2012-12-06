//TODO: Figuring out what data comes from where. 

var data = [];
for (var i=0; i<20; i++){
    var y = Math.random()*10;
    data.push({x:i, yup: y , ydown: (10 -y) });
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
            y: (10- d.y)
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
        d.x += 10; //CAREFUL
        return d
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
      data: [0]                            
      });
chart.render();
