var chart = new Tactile.Chart({
  element: $("#example_view")[0],
  width: 500,
  height: 400,
  data: [ 
    {period: '2012-01-01', actual:4, plan:1}, 
    {period: '2012-02-01', actual:5, plan:1}, 
    {period: '2012-03-01', actual:6, plan:2}, 
    {period: '2012-04-01', actual:7, plan:3}, 
    {period: '2012-05-01', actual:6, plan:5}, 
    {period: '2012-06-01', actual:5, plan:8}, 
    {period: '2012-07-01', actual:4, plan:5}, 
    {period: '2012-08-01', actual:5, plan:3}, 
    {period: '2012-09-01', actual:6, plan:2}, 
    {period: '2012-10-01', actual:7, plan:1}, 
    {period: '2012-11-01', actual:6, plan:1}, 
    {period: '2012-12-01', actual:5, plan:2}
  ],
  series: [
    {
      name: 'reach, actual',
      renderer: "bar", // TODO: rename bar to column
      wide: true,
      round: true,
      dataTransfrom: function(d){
        return {
            x: d.period,
            y: d.actual
        };
      },
      afterDrag: function(d){
        console.log("Dragged actual:");
        console.log(d);
      }
    },
    {
      name: 'reach, plan',
      renderer: "draggableLine", // TODO: rename draggableLine to line
      dataTransfrom: function(d){
          console.log(d);
        return {
            x: d.period,
            y: d.plan
        };
      },
      afterDrag: function(d, draggedSeries){
        console.log("Dragged plan:");
        console.log(d);
      }
    }
  ]
});

chart.render();