var data = [ 
  { x: 0, y:  10, z:   0 }, 
  { x: 1, y: 170, z: 200 }, 
  { x: 2, y: 280, z: 100 }, 
  { x: 3, y: 205, z: 240 }, 
  { x: 4, y: 332, z: 490 }
]                

var chart = new Tactile.Chart({
    element: $("#example_view")[0],
    width: 680,
    height: 400,
    data: data,
    series: [
      {
        name: 'y',
        renderer: 'line',
        color: "#c05020",
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
