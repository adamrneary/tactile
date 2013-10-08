(function() {
  var chart, data, frameVal, sl;

  frameVal = [0, 4];

  data = [
    {
      x: 0,
      y: 10,
      z: 0
    }, {
      x: 1,
      y: 170,
      z: 200
    }, {
      x: void 0,
      y: void 0,
      z: void 0
    }, {
      x: 2,
      y: 280,
      z: 120
    }, {
      x: 3,
      y: 205,
      z: 240
    }, {
      x: 4,
      y: 280,
      z: 120
    }, {
      x: 5,
      y: 205,
      z: 240
    }, {
      x: 6,
      y: 280,
      z: 120
    }, {
      x: 7,
      y: 205,
      z: 240
    }, {
      x: 8,
      y: 120,
      z: 490
    }
  ];

  chart = new Tactile.Chart({
    padding: {
      top: 0,
      right: 0,
      bottom: 5,
      left: 0
    },
    unstack: false
  }).element($("#example_view")[0]).data(data).axes({
    x: {
      dimension: "linear"
    }
  }).setXFrame(frameVal).addSeries([
    {
      name: "enemies",
      renderer: "area",
      dotSize: 1,
      sigfigs: 0,
      isEditable: true,
      afterDrag: function(d, y, i, draggedSeries, graph) {
        return graph.data()[i].y = y;
      },
      color: "#c05020",
      tooltip: function(d) {
        return d.y + " friends";
      },
      dataTransform: function(d) {
        return {
          x: d.x,
          y: d.y
        };
      }
    }, {
      name: "friends",
      renderer: "area",
      sigfigs: 1,
      color: "#6060c0",
      isEditable: true,
      afterDrag: function(d, y, i, draggedSeries, graph) {
        return graph.data()[i].z = y;
      },
      tooltip: function(d) {
        return d.y + " friends";
      },
      dataTransform: function(d) {
        return {
          x: d.x,
          y: d.z
        };
      }
    }
  ]);

  chart.render();

  $("#above-chart").html('');

  sl = $("<div>").attr("id", "slider").attr("class", "ui-horizontal-slider");

  $("#below-chart").html(sl);

  sl.slider({
    min: 0,
    max: 8,
    values: frameVal,
    range: true,
    slide: function(event, ui) {
      chart.setXFrame(ui.values);
      return chart.render();
    }
  });

}).call(this);
