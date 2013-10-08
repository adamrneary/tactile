(function() {
  var chart, data, generateData, setDataButton,
    _this = this;

  data = [
    {
      title: "Revenue",
      subtitle: "US$, in thousands",
      ranges: [
        {
          value: 150,
          color: "#CCCCCC",
          tooltip: "Revenue range1"
        }, {
          value: 225,
          color: "#DDDDDD",
          tooltip: "Revenue range2"
        }, {
          value: 350,
          color: "#EEEEEE",
          tooltip: "Revenue range3"
        }
      ],
      measures: [
        {
          value: 220,
          color: "#4682B4",
          tooltip: "Revenue measures1"
        }, {
          value: 270,
          color: "#B0C4DE",
          tooltip: "Revenue measures2"
        }
      ],
      markers: [
        {
          value: 120,
          color: "#FF3030",
          tooltip: "Revenue markers"
        }
      ]
    }, {
      title: "Profit",
      subtitle: "%",
      ranges: [
        {
          value: 150,
          color: "#CCCCCC"
        }, {
          value: 225,
          color: "#DDDDDD"
        }, {
          value: 350,
          color: "#EEEEEE"
        }
      ],
      measures: [
        {
          value: 220,
          color: "#4682B4"
        }, {
          value: 270,
          color: "#B0C4DE"
        }
      ],
      markers: [
        {
          value: 120,
          color: "#8B0000"
        }
      ]
    }, {
      title: "Order Size",
      subtitle: "US$, average",
      ranges: [
        {
          value: 150,
          color: "#CCCCCC"
        }, {
          value: 225,
          color: "#DDDDDD"
        }, {
          value: 350,
          color: "#EEEEEE"
        }
      ],
      measures: [
        {
          value: 220,
          color: "#4682B4"
        }, {
          value: 270,
          color: "#B0C4DE"
        }
      ],
      markers: [
        {
          value: 120,
          color: "#008B00"
        }
      ]
    }, {
      title: "Customers",
      subtitle: "count",
      ranges: [
        {
          value: 150,
          color: "#CCCCCC"
        }, {
          value: 225,
          color: "#DDDDDD"
        }, {
          value: 350,
          color: "#EEEEEE"
        }
      ],
      measures: [
        {
          value: 220,
          color: "#4682B4"
        }, {
          value: 270,
          color: "#B0C4DE"
        }
      ],
      markers: [
        {
          value: 120,
          color: "#000000"
        }
      ]
    }
  ];

  generateData = function(count) {
    var i, j, lastValue, _results;
    i = 0;
    _results = [];
    while (i < count) {
      j = 0;
      lastValue = 0;
      while (j < 3) {
        data[i].ranges[j].value = lastValue + Math.floor(Math.random() * 100);
        lastValue = data[i].ranges[j].value;
        j++;
      }
      j = 0;
      lastValue = 0;
      while (j < 2) {
        data[i].measures[j].value = lastValue + Math.floor(Math.random() * 100);
        lastValue = data[i].measures[j].value;
        j++;
      }
      data[i].markers[0].value = Math.floor(Math.random() * 100);
      _results.push(i++);
    }
    return _results;
  };

  chart = new Tactile.Chart({
    unstack: false
  }).element($("#example_view")[0]).data(data).addSeries({
    name: "enemies",
    renderer: "bullet",
    format: d3.format("d"),
    dataTransform: function(d) {
      return {
        title: d.title,
        subtitle: d.subtitle,
        ranges: d.ranges,
        measures: d.measures,
        markers: d.markers
      };
    }
  });

  chart.render();

  setDataButton = $("<button class='btn btn-mini'>Set data</button>");

  $("#above-chart").html(setDataButton);

  setDataButton.click(function(e) {
    generateData(4);
    chart.data(data);
    chart.render(1000);
    return e.stopPropagation();
  });

  $("#below-chart").html('');

}).call(this);
