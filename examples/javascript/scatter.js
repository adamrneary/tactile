var data = [
  // time (period here) is unix milliseconds/1000 
  {period: 1325376000, actual: 14, plan: 5},
  {period: 1328054400, actual: 16, plan: 10},
  {period: 1330560000, actual: 12, plan: 19},
  {period: 1333238400, actual: 13, plan: 33},
  {period: 1335830400, actual: 16, plan: 15},
  {period: 1338508800, actual: 25, plan: 25},
  {period: 1341100800, actual: 16, plan: 15},
  {period: 1343779200, actual: 16, plan: 33},
  {period: 1346457600, actual: 12, plan: 15},
  {period: 1349049600, actual: 14, plan: 10},
  {period: 1351728000, actual: 16, plan: 9},
  {period: 1354320000, actual: 15, plan: 14}
]

var chart = new Tactile.Chart({unstack: false})
  .element($("#example_view")[0])
  .data(data)
  .width(680);

chart.addSeries([
  {
    name: 'actual-planned-dots',
    renderer: "scatter",
    color: "#F52A2D",
    cssConditions: function (d) {
      // less than planned
      if (d.r < d.y) {
        return 'low'
      }
      // same as planned
      if (d.r == d.y) {
        return 'mid'
      }
      // more than planned
      if (d.r > d.y) {
        return 'high'
      }
      return '';
    },

    tooltip: function (d) {
      return d.y + " planned, got " + d.r;
    },
    dataTransform: function (d) {
      return {
        x: d.period,
        y: d.plan,
        r: d.actual
      };
    }
  }
]);

chart.render();