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
      z: 20
    }, {
      x: 2,
      y: 280,
      z: 50
    }, {
      x: 3,
      y: 205,
      z: 35
    }, {
      x: 4,
      y: 280,
      z: 55
    }, {
      x: 5,
      y: 205,
      z: 70
    }, {
      x: 6,
      y: 280,
      z: 75
    }, {
      x: 7,
      y: 205,
      z: 95
    }, {
      x: 8,
      y: 332,
      z: 100
    }
  ];

  chart = new Tactile.Chart({
    padding: {
      top: 0,
      right: 0,
      bottom: 5,
      left: 0
    }
  }).axes({
    x: {
      dimension: 'linear'
    },
    y: {
      dimension: "linear"
    },
    y1: {
      dimension: 'linear',
      tickFormat: function(d) {
        return d + '%';
      }
    }
  }).element($("#example_view")[0]).data(data).addSeries([
    {
      name: "enemies",
      renderer: "column",
      color: "#c05020",
      tooltip: function(d) {
        return d.y + " enemies";
      }
    }, {
      yAxis: 'y1',
      name: "friends",
      renderer: "line",
      color: "#6060c0",
      tooltip: function(d) {
        return d.y + "%";
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
    values: [0, 8],
    range: true,
    slide: function(event, ui) {
      chart.setXFrame(ui.values);
      return chart.render();
    }
  });

}).call(this);
