var chart = new Tactile.Chart({
    element: $("#example_view")[0],
    width: 500,
    height: 400,
    data: [{x:0, y:200},{x:1, y:1},{x:2,y:200}],
      
    series: [
      {
        name: "simple line",
        renderer: "line"
      }
    ]
});
chart.render();                      
