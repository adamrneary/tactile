var chart = new Tactile.Chart({
    element: $("#example_view")[0],
    width: 500,
    height: 400,
    fill: true,
    data: [ 
      { x: 0, y: 120, z: 0, v: 0 }, 
      { x: 1, y: 890, z: 1, v: 200 }, 
      { x: 2, y: 38,  z: 2, v: 100 }, 
      { x: 3, y: 70,  z: 3, v: 520 }, 
      { x: 4, y: 32,  z: 4, v: 133 }
    ],
    
    series: [
      {
        name: 'xy',
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
        name: 'zv',
        renderer: 'area',
        color: "#2374A6",
        dataTransform: function(d) {
          return {
            x: d.z,
            y: d.v
          };
        }
      }
    ]
});
chart.render();                      
