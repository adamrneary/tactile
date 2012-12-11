var chart = new Tactile.Chart({
  element: $("#example_view")[0],
  width: 500,
  height: 400,
  // time (period here) is unix milliseconds/1000
  data: [ 
    {period: 1325376000, actual: 4, plan: 1}, 
    {period: 1328054400, actual: 5, plan: 1}, 
    {period: 1330560000, actual: 6, plan: 2}, 
    {period: 1333238400, actual: 7, plan: 3}, 
    {period: 1335830400, actual: 6, plan: 5}, 
    {period: 1338508800, actual: 5, plan: 8}, 
    {period: 1341100800, actual: 4, plan: 5}, 
    {period: 1343779200, actual: 5, plan: 3}, 
    {period: 1346457600, actual: 6, plan: 2}, 
    {period: 1349049600, actual: 7, plan: 1}, 
    {period: 1351728000, actual: 6, plan: 1}, 
    {period: 1354320000, actual: 5, plan: 2}
  ],
  
  series: [
    {
      name: 'reach, actual',
      renderer: "bar", // TODO: rename bar to column
      wide: true,
      round: true,
      dataTransform: function(d){
        return {
          x: d.period,
          y: d.actual
        };
      }
    }
    ,
    {
      name: 'reach, plan',
      renderer: "draggableLine", // TODO: rename draggableLine to line
      sigfigs: 0,
      dataTransform: function(d){
        return {
          x: d.period,
          y: d.plan
        };
      },
      onDrag: function(d,series,graph){
      },
      afterDrag: function(d,y,i,draggedSeries,graph){
          console.log("Before",graph.data[i],d,y,i);
          graph.data[i].plan = y;
          graph.data[i].actual = Math.round(y/2);
          console.log("After",graph.data[i],d,y,i);
      }
    }
  ]
});

chart.render();