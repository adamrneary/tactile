(function() {
  var chart, data, frameVal, sl;

  frameVal = [new Date(2012, 0, 1).getTime(), new Date(2012, 7, 1).getTime()];

  data = [
    {
      period: new Date(2012, 0, 1).getTime(),
      customers: 100,
      newCustomers: 10,
      churnedCustomers: -20
    }, {
      period: new Date(2012, 1, 1).getTime(),
      customers: 90,
      newCustomers: 11,
      churnedCustomers: -15
    }, {
      period: new Date(2012, 2, 1).getTime(),
      customers: 86,
      newCustomers: 12,
      churnedCustomers: -200
    }, {
      period: new Date(2012, 3, 1).getTime(),
      customers: 88,
      newCustomers: 14,
      churnedCustomers: -9
    }, {
      period: new Date(2012, 4, 1).getTime(),
      customers: 93,
      newCustomers: 16,
      churnedCustomers: -8
    }, {
      period: new Date(2012, 5, 1).getTime(),
      customers: 101,
      newCustomers: 20,
      churnedCustomers: -7
    }, {
      period: new Date(2012, 6, 1).getTime(),
      customers: 114,
      newCustomers: 30,
      churnedCustomers: -6
    }, {
      period: void 0,
      customers: null,
      newCustomers: null,
      churnedCustomers: -5
    }, {
      period: new Date(2012, 7, 1).getTime(),
      customers: 138,
      newCustomers: 40,
      churnedCustomers: -5
    }
  ];

  chart = new Tactile.Chart({
    min: 'auto'
  }).element($("#example_view")[0]).data(data).axes({
    x: {
      dimension: 'time'
    },
    y: {
      dimension: "linear"
    }
  }).setXFrame(frameVal).addSeries([
    {
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
          y: d.customers
        };
      }
    }, {
      name: "New customers",
      renderer: "waterfall",
      color: "#8ac16f",
      tooltip: function(d) {
        return d.y + " new customers";
      },
      dataTransform: function(d) {
        return {
          x: d.period,
          y: d.newCustomers
        };
      }
    }, {
      name: "Churned customers",
      renderer: "waterfall",
      color: "#dc6e59",
      tooltip: function(d) {
        return d.y + " churned customers";
      },
      dataTransform: function(d) {
        return {
          x: d.period,
          y: d.churnedCustomers
        };
      }
    }
  ]);

  chart.render();

  $("#above-chart").html('');

  sl = $("<div>").attr("id", "slider").attr("class", "ui-horizontal-slider");

  $("#below-chart").html(sl);

  sl.slider({
    min: new Date(2012, 0, 1).getTime(),
    max: new Date(2012, 7, 1).getTime(),
    values: frameVal,
    range: true,
    slide: function(event, ui) {
      chart.setXFrame(ui.values);
      return chart.render();
    }
  });

}).call(this);
