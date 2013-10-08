(function() {
  var chart, data;

  data = [
    {
      name: 'Revenue',
      amount: 1000,
      children: [
        {
          name: 'Revenue stream 1',
          amount: 500
        }, {
          name: 'Revenue stream 2',
          amount: 300
        }, {
          name: 'Revenue stream 3',
          amount: 200
        }
      ]
    }, {
      name: "Cost of goods sold",
      amount: 100
    }, {
      name: "Gross margin",
      amount: 900,
      fromBaseline: true
    }, {
      name: "Customer acquisition",
      amount: 250,
      children: [
        {
          name: 'Channel 1',
          amount: 80
        }, {
          name: 'Channel 2',
          amount: 80
        }, {
          name: 'Channel 3',
          amount: 80
        }, {
          name: 'Channel 4',
          amount: 10
        }
      ]
    }, {
      name: "Team",
      amount: 350,
      children: [
        {
          name: 'Bosses',
          amount: 30
        }, {
          name: 'Makers',
          amount: 300
        }, {
          name: 'Bean counters',
          amount: 20
        }
      ]
    }, {
      name: "General & administrative",
      amount: 150,
      children: [
        {
          name: 'Category 1',
          amount: 80
        }, {
          name: 'Category 2',
          amount: 70
        }
      ]
    }, {
      name: "Net income",
      amount: 150
    }
  ];

  chart = new Tactile.Chart().element($("#example_view")[0]).data(data).axes({
    x: {
      dimension: 'time',
      frame: frameVal
    },
    y: {
      dimension: "linear"
    }
  }).addSeries({
    name: "waterfall-grouped example",
    renderer: "waterfall",
    fromBaseline: function(d) {
      return d.fromBaseline;
    },
    color: function(d) {
      return d.color;
    },
    tooltip: function(d) {
      return "" + d.name + ": $" + d.y;
    },
    dataTransform: function(d) {
      return {
        x: d.period,
        y: d.amount
      };
    }
  });

  chart.render();

}).call(this);
