var frameVal = [0, 4];

var data = [
  {x: 0, y: 10, z: 0},
  {x: 1, y: 170, z: 200},
  {x: 2, y: 280, z: 100},
  {x: 3, y: 205, z: 240},
  {x: 4, y: 280, z: 100},
  {x: 5, y: 205, z: 240},
  {x: 6, y: 280, z: 100},
  {x: 7, y: 205, z: 240},
  {x: 8, y: 332, z: 490}
]


// we want sth like this:
//var chart = new Tactile.Chart()
//chart.element($("#example_view")[0])
//  .width(680)
//  .height(400)
//  .data(data)
//  .axes({
//    x: {
//      dimension: "time",
//      frame: frameVal
//    }
//  });

var chart = new Tactile.Chart({data:data}).element($("#example_view")[0])
//  .data(data)
//  .axes({
//  x: {
//    dimension: "time",
//    frame: frameVal
//  }});

chart.addSeries(
  {
    name: 'enemies',
    renderer: 'line',
    color: "#c05020",
    tooltip: function (d) {
      return d.y + " enemies";
    },
    dataTransform: function (d) {
      return {
        x: d.x,
        y: d.y
      };
    }
  });

// Just to show that we can add a series after rendering the chart
chart.render();

chart.addSeries(
  {
    name: 'friends',
    renderer: 'line',
    sigfigs: 1,
    color: "#6060c0",
    draggable: true,
    afterDrag: function (d, y, i, draggedSeries, graph) {
      graph.data[i].z = y;
    },
    tooltip: function (d) {
      return d.y + " friends";
    },
    dataTransform: function (d) {
      return {
        x: d.x,
        y: d.z
      };
    }
  }
);

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
