var data = [ 
  { x: 0, y: 120, z:   0 }, 
  { x: 1, y: 890, z: 200 }, 
  { x: 2, y:  38, z: 100 }, 
  { x: 3, y:  70, z: 520 }, 
  { x: 4, y:  32, z: 133 }
]

var chart = new Tactile.Chart({
    element: $("#example_view")[0],
    width: 680,
    height: 400,
    fill: true,
    data: data,
    series: [
      {
        name: 'y',
        renderer: 'area',
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
        renderer: 'area',
        color: "#2374A6",
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
