var data = [
  // time (period here) is unix milliseconds/1000 
  {period: 1325376000, actual: 4, plan: 5}, 
  {period: 1328054400, actual: 3, plan: 14}, 
  {period: 1330560000, actual: 2, plan: 11}, 
  {period: 1333238400, actual: 3, plan: 33}, 
  {period: 1335830400, actual: 6, plan: 5}, 
  {period: 1338508800, actual: 5, plan: 8}, 
  {period: 1341100800, actual: 3, plan: 15}, 
  {period: 1343779200, actual: 1, plan: 32}, 
  {period: 1346457600, actual: 2, plan: 19}, 
  {period: 1349049600, actual: 4, plan: 13}, 
  {period: 1351728000, actual: 6, plan: 5}, 
  {period: 1354320000, actual: 5, plan: 5}
]

var chart = new Tactile.Chart({
  element: $("#example_view")[0],
  width: 680,
  height: 400,
  data: data,
  unstack: false,
  
  series: [
  {
    name: 'actual-planned-dots',
    renderer: "scatter",
    color: "#F52A2D",
    cssConditions: function(d) {
      console.log(d.r);
      if(d.r <= 8) {
        return 'low'
      }
      if(d.r > 8 && d.r < 15) {
        return 'mid'
      }
      if(d.r >= 15) {
        return 'high'
      }
      return '';
    },
    
    tooltip: function(d) {
      return d.y + " customers";
    },
    dataTransform: function(d) {
      return {
        x: d.period,
        y: d.actual,
        r: d.plan
      };
    }
  }
  ]
});

chart.render();