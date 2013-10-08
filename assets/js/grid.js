(function() {
  var chart, data, frameVal, sl, tickFormat;

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
      x: 2,
      y: 280,
      z: 100
    }, {
      x: 3,
      y: 205,
      z: 240
    }, {
      x: 4,
      y: 280,
      z: 100
    }, {
      x: 5,
      y: 205,
      z: 240
    }, {
      x: 6,
      y: 280,
      z: 100
    }, {
      x: 7,
      y: 205,
      z: 240
    }, {
      x: 8,
      y: 332,
      z: 490
    }, {
      x: 9,
      y: void 0,
      z: void 0
    }
  ];

  tickFormat = function(d) {
    if (d > 99) {
      return "3000★";
    } else {
      return "" + (d * 10) + "☢";
    }
  };

  chart = new Tactile.Chart({
    padding: {
      top: 0,
      right: 0,
      bottom: 5,
      left: 0
    }
  }).axes({
    x: {
      dimension: 'linear',
      tickFormat: tickFormat
    },
    y: {
      dimension: "linear",
      tickFormat: tickFormat
    }
  }).grid({
    x: {
      values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      color: "#32CD32",
      lineWidth: 5
    },
    y: {
      values: [0, 100, 200, 300]
    }
  }).element($("#example_view")[0]).setXFrame(frameVal).data(data).addSeries([
    {
      name: "enemies",
      renderer: "line",
      color: "#c05020",
      isEditable: true,
      tooltip: function(d) {
        return d.y + " enemies";
      },
      dataTransform: function(d) {
        return {
          x: d.x,
          y: d.y
        };
      }
    }, {
      name: "friends",
      dotSize: 2,
      renderer: "line",
      sigfigs: 1,
      color: "#6060c0",
      isEditable: function(d, i) {
        return d.x === 2;
      },
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
