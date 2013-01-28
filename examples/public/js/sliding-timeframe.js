var frameVal = [2, 10];
var data = [
  {x: 0, y: 10, z: 0},
  {x: 1, y: 170, z: 200},
  {x: 2, y: 280, z: 100},
  {x: 3, y: 205, z: 300},
  {x: 4, y: 332, z: 400},
  {x: 5, y: 327, z: 450},
  {x: 6, y: 332, z: 600},
  {x: 7, y: 232, z: 601},
  {x: 8, y: 402, z: 700},
  {x: 9, y: 100, z: 430},
  {x: 10, y: 134, z: 490},
  {x: 11, y: 356, z: 450},
  {x: 12, y: 339, z: 720},
  {x: 13, y: 539, z: 650},
  {x: 14, y: 650, z: 300},
  {x: 15, y: 700, z: 100}
];


var chart = new Tactile.Chart({grid: true})
  .element($("#example_view")[0])
  .width(680)
  .height(400)
  .data(data)
  .axes({
    x: {
      dimension: "time",
      frame: frameVal
    }
  });

chart.addSeries(
  [
    {
      name: 'xy',
      renderer: 'line',
      color: "#c05020",
      dataTransform: function (d) {
        return {
          x: d.x,
          y: d.y
        };
      }
    },
    {
      name: 'xz',
      renderer: 'line',
      color: "#6060c0",
      dataTransform: function (d) {
        return {
          x: d.x,
          y: d.z
        };
      }
    }
  ]
);

chart.render();

var sl = $("<div>").attr("id", "slider");
$("#example_view").append(sl);
sl.slider({
  min: 0,
  max: 15,
  values: frameVal,
  range: true,
  slide: function (event, ui) {
    chart.axes().x.frame = ui.values;
    chart.render();
  }
});
