(function() {
  var chart, data, frameVal, legends, sl;

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
    }
  ];

  chart = new Tactile.Chart().element($("#example_view")[0]).data(data).axes({
    x: {
      dimension: "time"
    }
  }).setXFrame(frameVal).addSeries([
    {
      name: "enemies",
      renderer: "line",
      color: "#c05020",
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
      renderer: "column",
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

  legends = $("<div>").attr("id", "legends");

  chart.series.forEach(function(val, idx) {
    var input;
    input = $("<input>").attr("type", "checkbox").attr("name", "legend").attr("value", idx).attr("checked", "checked");
    legends.append($('<lable>').append(input).append(val.name).append('<br>'));
    return legends.find("input").last().click(function() {
      chart.series[idx].toggle();
      return chart.render();
    });
  });

  $("#above-chart").html(legends);

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
