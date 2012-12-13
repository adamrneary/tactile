var chart = new Tactile.Chart({
    element: $("#example_view")[0],
    width: 500,
    height: 400,
    data: [ 
      { x: 0, y: 10, z: 0, v: 0 }, 
      { x: 1, y: 170, z: 1, v: 200 }, 
      { x: 2, y: 280,  z: 2, v: 100 }, 
      { x: 3, y: 205,  z: 3, v: 240 }, 
      { x: 4, y: 332,  z: 4, v: 490 }
    ],
    
    series: [
      {
        name: 'xy',
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
        name: 'zv',
        renderer: 'line',
        color: "#6060c0",
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
