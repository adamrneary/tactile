var frameVal = [0,4];

var data = [ 
  {x: 0, y:  10, z:   0}, 
  {x: 1, y: 170, z: 200}, 
  {x: 2, y: 280, z: 100}, 
  {x: 3, y: 205, z: 240}, 
  {x: 4, y: 280, z: 100}, 
  {x: 5, y: 205, z: 240}, 
  {x: 6, y: 280, z: 100}, 
  {x: 7, y: 205, z: 240}, 
  {x: 8, y: 332, z: 490}
]                

var chart = new Tactile.Chart({
  element: $("#example_view")[0],
  width: 680,
  height: 400,
  data: data,
  axes: {
    x: {
      dimension: "time",
      frame: frameVal
    }
  },
  series: [
  {
    name: 'y',
    renderer: 'line',
    color: "#c05020",
    tooltip: function(d) {
      return d.y + " enemies";
    },
    dataTransform: function(d) {
      return {
        x: d.x,
        y: d.y
      };
    }
  }, 
  {
    name: 'z',
    renderer: 'line',
    color: "#6060c0",
    tooltip: function(d) {
      return d.y + " friends";
    },
    dataTransform: function(d) {
      return {
        x: d.x,
        y: d.z
      };
    }
  }
  ]
});
chart.render();                      
var sl = $("<div>").attr("id","slider");
$("#example_view").append(sl);
sl.slider({
  min: 0,
  max: 8,
  values: frameVal,
  range:true,
  slide: function(event,ui){
    chart.axes.x.frame = ui.values;
    chart.render();
  }                        
});