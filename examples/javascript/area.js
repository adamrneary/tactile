var frameVal = [0, 4];

var data = [
  {x: 0, y: 10, z: 0},
  {x: 1, y: 170, z: 200},
  {x: 2, y: 280, z: 120},
  {x: 3, y: 205, z: 240},
  {x: 4, y: 280, z: 120},
  {x: 5, y: 205, z: 240},
  {x: 6, y: 280, z: 120},
  {x: 7, y: 205, z: 240},
  {x: 8, y: 120, z: 490}
]

var chart = new Tactile.Chart({
  element: $("#example_view")[0],
  width: 680,
  height: 400,
  data: data,
  axes: {
    x: {
      dimension: "time",
      frame: frameVal
    }
  },
  series: [
    {
      name: 'enemies',
      renderer: 'area',
      sigfigs: 0,
      draggable: true,
      afterDrag: function (d, y, i, draggedSeries, graph) {
        graph.data[i].y = y;
      },
      color: "#c05020",
      dataTransform: function (d) {
        return {
          x: d.x,
          y: d.y
        };
      }
    },
    {
      name: 'friends',
      renderer: 'area',
      sigfigs: 1,
      color: "#6060c0",
      draggable: true,
      afterDrag: function (d, y, i, draggedSeries, graph) {
        graph.data[i].z = y;
      },
      dataTransform: function (d) {
        return {
          x: d.x,
          y: d.z
        };
      }
    }
  ]
});

chart.render();
var sl = $("<div>").attr("id", "slider");
$("#example_view").append(sl);
sl.slider({
  min: 0,
  max: 8,
  values: frameVal,
  range: true,
  slide: function (event, ui) {
    chart.axes.x.frame = ui.values;
    chart.render();
  }
});
