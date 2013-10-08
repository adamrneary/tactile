(function() {
  var buttonGroup, chart, dataCountSpinBox, frameVal, generateData, groupButton, maxCount, setDataButton, sl, stackButton,
    _this = this;

  maxCount = 100;

  frameVal = [new Date(2012, 2, 1).getTime(), new Date(2012, 2 + maxCount, 1).getTime()];

  generateData = function(count) {
    var data, i;
    data = [];
    i = 0;
    while (i < count) {
      data[i] = {
        period: new Date(2012, 0 + i, 1).getTime(),
        y0: Math.floor(Math.random() * 100),
        y1: Math.floor(Math.random() * 100),
        y2: Math.floor(Math.random() * 100)
      };
      i++;
    }
    return data;
  };

  chart = new Tactile.Chart({
    unstack: false
  }).element($("#example_view")[0]).data(generateData(12)).setXFrame(frameVal).axes({
    y: "linear",
    x: {
      dimension: "time",
      options: {
        ticksTreatment: "align-middle"
      }
    }
  });

  chart.addSeries([
    {
      name: "y0",
      renderer: "aggcolumn",
      round: false,
      color: "#c05020",
      tooltip: function(d) {
        return d.y + " y0";
      },
      dataTransform: function(d) {
        return {
          x: d.period,
          y: d.y0
        };
      }
    }, {
      name: "y1",
      renderer: "aggcolumn",
      round: false,
      color: "#6060c0",
      tooltip: function(d) {
        return d.y + " y1";
      },
      dataTransform: function(d) {
        return {
          x: d.period,
          y: d.y1
        };
      }
    }, {
      name: "y2",
      renderer: "aggcolumn",
      round: false,
      color: "#6020c0",
      tooltip: function(d) {
        return d.y + " y2";
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

  buttonGroup = $("<div class='btn-group'></div>");

  groupButton = $("<button class='btn btn-mini'>Grouped</button>");

  stackButton = $("<button class='btn btn-mini'>Stacked</button>");

  setDataButton = $("<button class='btn btn-mini btn-success'>Set data</button>");

  dataCountSpinBox = $("<input type='number' min='10' max='100' step='10' value='12' class='span1'>");

  buttonGroup.prepend(groupButton);

  buttonGroup.prepend(stackButton);

  buttonGroup.prepend(setDataButton);

  $("#above-chart").html('');

  $("#above-chart").prepend(buttonGroup);

  $("#above-chart").prepend(dataCountSpinBox);

  stackButton.click(function(e) {
    chart.stackTransition();
    return e.stopPropagation();
  });

  groupButton.click(function(e) {
    chart.unstackTransition();
    return e.stopPropagation();
  });

  setDataButton.click(function(e) {
    var data;
    data = generateData(dataCountSpinBox.val());
    chart.data(data);
    chart.render(1000);
    return e.stopPropagation();
  });

  sl = $("<div>").attr("id", "slider").attr("class", "ui-horizontal-slider");

  $("#below-chart").html(sl);

  sl.slider({
    min: new Date(2012, 0, 1).getTime(),
    max: new Date(2012, 2 + maxCount, 1).getTime(),
    values: frameVal,
    range: true,
    slide: function(event, ui) {
      chart.setXFrame(ui.values);
      return chart.render();
    }
  });

}).call(this);
