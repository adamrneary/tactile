(function() {
  var chart, frameVal, generateData, maxCount, sl,
    _this = this;

  maxCount = 73;

  frameVal = [new Date(2011, 13, 1).getTime(), new Date(2011, 49, 1).getTime()];

  generateData = function(count) {
    var data, i;
    data = [];
    i = 0;
    while (i < count) {
      data[i] = {
        period: new Date(2011, 0 + i, 1).getTime(),
        y0: Math.floor(Math.random() * 200),
        y1: Math.floor(Math.random() * 100),
        y2: Math.floor(Math.random() * 100)
      };
      i++;
    }
    return data;
  };

  chart = new Tactile.Chart().element($("#example_view")[0]).data(generateData(maxCount)).axes({
    x: {
      dimension: 'time',
      ticksTreatment: 'small'
    },
    y: {
      dimension: "linear"
    }
  }).setXFrame(frameVal).addSeries([
    {
      aggregate: true,
      name: "Customers",
      renderer: "waterfall",
      color: "#30878F",
      fromBaseline: true,
      tooltip: function(d) {
        return d.y + " customers";
      },
      dataTransform: function(d) {
        return {
          x: d.period,
          y: d.y0
        };
      }
    }, {
      aggregate: true,
      name: "New customers",
      renderer: "waterfall",
      color: "#8ac16f",
      tooltip: function(d) {
        return d.y + " new customers";
      },
      dataTransform: function(d) {
        return {
          x: d.period,
          y: d.y1
        };
      }
    }, {
      aggregate: true,
      name: "Churned customers",
      renderer: "waterfall",
      color: "#dc6e59",
      tooltip: function(d) {
        return d.y + " churned customers";
      },
      dataTransform: function(d) {
        return {
          x: d.period,
          y: d.y2
        };
      }
    }
  ]);

  chart.render();

  sl = $("<div>").attr("id", "slider").attr("class", "ui-horizontal-slider");

  $("#below-chart").html(sl);

  sl.slider({
    min: 0,
    max: maxCount,
    values: [13, 49],
    range: true,
    stop: function(event, ui) {
      chart.setXFrame([new Date(2011, 0 + ui.values[0], 1).getTime(), new Date(2011, 0 + ui.values[1], 1).getTime()]);
      return chart.render();
    }
  });

}).call(this);
