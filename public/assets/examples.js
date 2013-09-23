(function() {
  var cartesian, components, noncartesian, prepareLinks, showcaseObject;

cartesian = [
  {
    shortLink: "scatter",
    title: "Scatter"
  }, {
    shortLink: "line",
    title: "Line"
  }, {
    shortLink: "column",
    title: "Column"
  }, {
    shortLink: "stacked-column",
    title: "Stacked column",
    groupingButtons: true
  }, {
    shortLink: "area",
    title: "Area"
  }, {
    shortLink: "stacked-area",
    title: "Stacked area"
  }, {
    shortLink: "multiple-series",
    title: "Multiple series types"
  }, {
    shortLink: "waterfall-timeseries",
    title: "Waterfall (time series)"
  }, {
    shortLink: "mini",
    title: "Minichart"
  }
];

noncartesian = [
  {
    shortLink: "gauge",
    title: "Gauge"
  }, {
    shortLink: "leaderboard",
    title: "Leaderboard"
  }, {
    shortLink: "bullet",
    title: "Bullet"
  }, {
    shortLink: "donut",
    title: "Donut"
  }, {
    shortLink: "multi-donut",
    title: "Multiple donuts"
  }
];

components = [
  {
    shortLink: "grid",
    title: "Grid"
  }, {
    shortLink: "sliding-timeframe",
    title: "Sliding timeframe"
  }, {
    shortLink: "chart-update",
    title: "Real time updates"
  }, {
    shortLink: "legend",
    title: "Interactive legend"
  }, {
    shortLink: "dual-scaled",
    title: "Secondary y-axis"
  }, {
    shortLink: "axes-toggle",
    title: "Toggling axes"
  }, {
    shortLink: "filter",
    title: "Filters (future)"
  }, {
    shortLink: "stacked-column-big-data",
    title: "Stacked column big data"
  }, {
    shortLink: "zoom",
    title: "Zoom"
  }, {
    shortLink: "column-zoom",
    title: "Column zoom"
  }, {
    shortLink: "dual-scaled-zoom",
    title: "Secondary y-axis zoom"
  }
];

showcaseObject = {
  routes: {}
};

prepareLinks = function(route, el) {
  var link;
  link = $("<a>").attr("href", "/#" + route.shortLink).text(route.title);
  el.append($("<li>").append(link));
  showcaseObject.routes[route.shortLink] = route.shortLink;
  return showcaseObject[route.shortLink] = function() {
    var url, urlCoffee;
    $("#example_header").text(route.title);
    urlCoffee = "examples/" + route.shortLink + ".coffee";
    url = "examples/" + route.shortLink + ".js";
    $(".stack-unstack-buttons").hide();
    if (route.groupingButtons) {
      $(".stack-unstack-buttons").show();
    }
    return $.get(urlCoffee, function(data) {
      var source;
      $("#example_view").empty();
      $("#example_js").text(data).removeClass("rainbow");
      Rainbow.color();
      source = CoffeeScript.compile(data);
      $("#example_code").remove();
      return $('body').append($("<script id='example_code'>" + source + "</script>"));
    });
  };
};

$(document).ready(function() {
  var Showcase, showcase;
  Tactile.debug = true;
  _.map(cartesian, function(route) {
    return prepareLinks(route, $("#cartLinkList"));
  });
  _.map(noncartesian, function(route) {
    return prepareLinks(route, $("#noncartLinkList"));
  });
  _.map(components, function(route) {
    return prepareLinks(route, $("#compLinkList"));
  });
  Showcase = Backbone.Router.extend(showcaseObject);
  showcase = new Showcase();
  if (!window.location.hash) {
    return showcase.navigate("/#line");
  }
});

}).call(this);

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

(function() {
  var chart, data, frameVal, sl, turnOffAxes, turnOnAxes,
  _this = this;

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
  }
}).element($("#example_view")[0]).data(data).setXFrame(frameVal).addSeries([
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
    dotSize: 2,
    renderer: "line",
    sigfigs: 1,
    color: "#6060c0",
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
  max: 5,
  values: frameVal,
  range: true,
  slide: function(event, ui) {
    chart.setXFrame(ui.values);
    return chart.render();
  }
});

turnOffAxes = $("<button class='btn btn-mini'>Turn off axes</button>");

turnOnAxes = $("<button class='btn btn-mini'>Turn on axes</button>");

$("#above-chart").html(turnOffAxes);

$("#above-chart").append(turnOnAxes);

turnOffAxes.click(function(e) {
  chart.axes({});
  chart.render(1000);
  return e.stopPropagation();
});

turnOnAxes.click(function(e) {
  chart.setXFrame(frameVal);
  chart.axes({
    x: {
      dimension: 'linear'
    },
    y: {
      dimension: "linear"
    }
  });
  chart.render(1000);
  return e.stopPropagation();
});

}).call(this);

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

(function() {
  var chart, data, frameVal, randomDataButton, sl;

frameVal = [new Date(2012, 0, 1).getTime(), new Date(2012, 11, 1).getTime()];

data = [
  {
    period: new Date(2012, 0, 1).getTime(),
    actual: 4,
    plan: 0
  }, {
    period: new Date(2012, 1, 1).getTime(),
    actual: 5,
    plan: 1
  }, {
    period: new Date(2012, 2, 1).getTime(),
    actual: 6,
    plan: 2
  }, {
    period: new Date(2012, 3, 1).getTime(),
    actual: 7,
    plan: 3
  }, {
    period: new Date(2012, 4, 1).getTime(),
    actual: 6,
    plan: 5
  }, {
    period: new Date(2012, 5, 1).getTime(),
    actual: 5,
    plan: 8
  }, {
    period: new Date(2012, 6, 1).getTime(),
    actual: 4,
    plan: 5
  }, {
    period: new Date(2012, 7, 1).getTime(),
    actual: 5,
    plan: 3
  }, {
    period: new Date(2012, 8, 1).getTime(),
    actual: 6,
    plan: 2
  }, {
    period: new Date(2012, 9, 1).getTime(),
    actual: 7,
    plan: 1
  }, {
    period: new Date(2012, 10, 1).getTime(),
    actual: 6,
    plan: 1
  }, {
    period: new Date(2012, 11, 1).getTime(),
    actual: 5,
    plan: 2
  }
];

chart = new Tactile.Chart().element($("#example_view")[0]).data(data).axes({
  x: {
    dimension: 'time'
  },
  y: {
    dimension: "linear"
  }
}).setXFrame(frameVal).addSeries([
  {
    name: "reach actual",
    renderer: "column",
    wide: true,
    isEditable: true,
    round: true,
    color: "#6020c0",
    tooltip: function(d) {
      return d.y + " customers";
    },
    dataTransform: function(d) {
      return {
        x: d.period,
        y: d.actual
      };
    },
    afterDrag: function(d, y, i, draggedSeries, graph) {
      return graph.data()[i].actual = y;
    }
  }, {
    name: "reach plan",
    renderer: "line",
    color: "#c05020",
    isEditable: true,
    tooltip: function(d) {
      return d.y + " customers planned";
    },
    dataTransform: function(d) {
      return {
        x: d.period,
        y: d.plan
      };
    },
    afterDrag: function(d, y, i, draggedSeries, graph) {
      return graph.data()[i].plan = y;
    }
  }
]);

chart.render();

randomDataButton = $("<button class='btn btn-mini'>Set random data</button>");

$("#above-chart").html(randomDataButton);

randomDataButton.click(function() {
  var i;
  i = 0;
  while (i < data.length) {
    data[i].plan = Math.floor(Math.random() * 10);
    data[i].actual = Math.floor(Math.random() * 10);
    i++;
  }
  chart.data(data);
  return chart.render(1000);
});

sl = $("<div>").attr("id", "slider").attr("class", "ui-horizontal-slider");

$("#below-chart").html(sl);

sl.slider({
  min: frameVal[0],
  max: frameVal[1],
  values: frameVal,
  range: true,
  slide: function(event, ui) {
    chart.setXFrame(ui.values);
    return chart.render();
  }
});

}).call(this);

(function() {
  /*
Specific options for zoomable chart:
available[X|Y|Y1]Frame
  min and max values that can be zoomed or moved to.
  Computed if not given

min[X|Y|Y1]Frame
  this is the minimum distance between points to which you can zoom in.
  1 by default

max[X|Y|Y1]Frame
  this is the maximum distance between points to which you can zoom out.
  Infinity by default
*/

var chart, data, frameVal, sl, unit,
  _this = this;

frameVal = [1333238400000, 1349049600000];

data = [
  {
    period: 1325376000000,
    actual: 4,
    plan: 1
  }, {
    period: 1328054500000,
    actual: 5,
    plan: 1
  }, {
    period: 1330560000000,
    actual: 6,
    plan: 2
  }, {
    period: 1333238400000,
    actual: 7,
    plan: 3
  }, {
    period: 1335830400000,
    actual: 6,
    plan: 5
  }, {
    period: 1338508800000,
    actual: 5,
    plan: 8
  }, {
    period: 1341100800000,
    actual: 4,
    plan: 5
  }, {
    period: 1343779200000,
    actual: 5,
    plan: 3
  }, {
    period: 1346457600000,
    actual: 6,
    plan: 2
  }, {
    period: 1349049600000,
    actual: 7,
    plan: 1
  }, {
    period: 1351728000000,
    actual: 6,
    plan: 1
  }, {
    period: 1354320000000,
    actual: 5,
    plan: 2
  }, {
    period: void 0,
    actual: 3,
    plan: void 0
  }
];

unit = {
  name: "month",
  seconds: 86400000 * 30.5,
  formatter: function(d) {
    var months;
    months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return months[d.getUTCMonth()];
  }
};

chart = new Tactile.Chart({
  autoScale: false,
  availableXFrame: [1330560000000, 1354320000000],
  availableYFrame: [0, 20],
  minXFrame: 7960587796,
  minYFrame: 4
}).setXFrame(frameVal).element($("#example_view")[0]).data(data).axes({
  x: {
    dimension: 'time',
    timeUnit: unit
  },
  y: {
    dimension: "linear"
  }
}).addSeries([
  {
    name: "actual",
    renderer: "column",
    sigfigs: 0,
    color: "#c05020",
    isEditable: true,
    tooltip: function(d) {
      return d.y + " customers";
    },
    dataTransform: function(d) {
      return {
        x: d.period,
        y: d.actual
      };
    },
    afterDrag: function(d, y, i, draggedSeries, graph) {
      return graph._data[i].actual = y;
    }
  }, {
    name: "planned",
    renderer: "column",
    color: "#6060c0",
    isEditable: function(d, i) {
      return d.x === 1325376000000;
    },
    tooltip: function(d) {
      return d.y + " planned";
    },
    dataTransform: function(d) {
      return {
        x: d.period,
        y: d.plan
      };
    },
    afterDrag: function(d, y, i, draggedSeries, graph) {
      return graph._data[i].plan = y;
    }
  }
]);

chart.render();

$("#above-chart").html('');

sl = $("<div>").attr("id", "slider").attr("class", "ui-horizontal-slider");

$("#below-chart").html(sl);

sl.slider({
  min: 1330560000000,
  max: 1354320000000,
  values: frameVal,
  range: true,
  slide: function(event, ui) {
    chart.setXFrame(ui.values);
    return chart.render();
  }
});

chart.onUpdate(function() {
  return sl.slider({
    min: chart.x.domain()[0] < 1330560000000 ? chart.x.domain()[0] : 1330560000000,
    max: chart.x.domain()[1] > 1354320000000 ? chart.x.domain()[1] : 1354320000000,
    values: chart.x.domain()
  });
});

}).call(this);

(function() {
  var chart, data, frameVal, sl;

frameVal = [new Date(2012, 2, 1).getTime(), new Date(2012, 11, 1)];

data = [
  {
    period: new Date(2012, 0, 1).getTime(),
    actual: 4,
    plan: 1
  }, {
    period: new Date(2012, 1, 1).getTime(),
    actual: 5,
    plan: 1
  }, {
    period: new Date(2012, 2, 1).getTime(),
    actual: 6,
    plan: 2
  }, {
    period: new Date(2012, 3, 1).getTime(),
    actual: 7,
    plan: 3
  }, {
    period: new Date(2012, 4, 1).getTime(),
    actual: 6,
    plan: 5
  }, {
    period: new Date(2012, 5, 1).getTime(),
    actual: 5,
    plan: 8
  }, {
    period: new Date(2012, 6, 1).getTime(),
    actual: 4,
    plan: 5
  }, {
    period: new Date(2012, 7, 1).getTime(),
    actual: 5,
    plan: 3
  }, {
    period: new Date(2012, 8, 1).getTime(),
    actual: 6,
    plan: 2
  }, {
    period: new Date(2012, 9, 1).getTime(),
    actual: 7,
    plan: 1
  }, {
    period: new Date(2012, 10, 1).getTime(),
    actual: 6,
    plan: 1
  }, {
    period: new Date(2012, 11, 1).getTime(),
    actual: 5,
    plan: 2
  }, {
    period: void 0,
    actual: 30,
    plan: void 0
  }
];

chart = new Tactile.Chart().element($("#example_view")[0]).data(data).setXFrame(frameVal).axes({
  x: {
    dimension: 'time'
  },
  y: {
    dimension: "linear"
  }
}).addSeries([
  {
    name: "reach actual",
    renderer: "column",
    sigfigs: 0,
    round: false,
    color: "#c05020",
    isEditable: true,
    tooltip: function(d) {
      return d.y + " customers";
    },
    dataTransform: function(d) {
      return {
        x: d.period,
        y: d.actual
      };
    },
    afterDrag: function(d, y, i, draggedSeries, graph) {
      return graph._data[i].actual = y;
    }
  }, {
    name: "planned",
    renderer: "column",
    round: false,
    color: "#6060c0",
    isEditable: function(d, i) {
      return d.x === new Date(2012, 0, 1).getTime();
    },
    tooltip: function(d) {
      return d.y + " planned";
    },
    dataTransform: function(d) {
      return {
        x: d.period,
        y: d.plan
      };
    },
    afterDrag: function(d, y, i, draggedSeries, graph) {
      return graph._data[i].plan = y;
    }
  }
]);

chart.render();

$("#above-chart").html('');

sl = $("<div>").attr("id", "slider").attr("class", "ui-horizontal-slider");

$("#below-chart").html(sl);

sl.slider({
  min: new Date(2012, 0, 1).getTime(),
  max: new Date(2012, 11, 1).getTime(),
  values: frameVal,
  range: true,
  slide: function(event, ui) {
    chart.setXFrame(ui.values);
    return chart.render();
  }
});

}).call(this);

(function() {
  var chart, data;

data = [
  {
    label: "FL",
    value: 40000,
    color: "#227501"
  }, {
    label: "CA",
    value: 30000,
    color: "#2275f2"
  }, {
    label: "NY",
    value: 20000,
    color: "#227543"
  }, {
    label: "NC",
    value: 30000,
    color: "#227564"
  }, {
    label: "SC",
    value: 40000,
    color: "#227585"
  }, {
    label: "AZ",
    value: 50000,
    color: "#2275a6"
  }, {
    label: "TX",
    value: 60000,
    color: "#2275c7"
  }
];

chart = new Tactile.Chart().element($("#example_view")[0]).data(data).addSeries({
  name: "optional desc here",
  renderer: "donut",
  tooltip: function(d) {
    return d.label + " " + d.value;
  },
  color: "#c05020"
});

chart.render();

$("#above-chart").html('');

$("#below-chart").html('');

}).call(this);

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
}).element($("#example_view")[0]).data(data).setAutoScale(false).setMinXFrame(3).setMinYFrame(20).setMinY1Frame(10).setXFrame(frameVal).axes({
  x: {
    dimension: 'linear'
  },
  y: {
    dimension: "linear"
  },
  y1: {
    dimension: "linear",
    tickFormat: function(d) {
      return d + '%';
    }
  }
});

chart.addSeries([
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
  values: frameVal,
  range: true,
  slide: function(event, ui) {
    chart.setXFrame(ui.values);
    return chart.render();
  }
});

chart.onUpdate(function() {
  return sl.slider({
    values: chart.x.domain()
  });
});

}).call(this);

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

(function() {
  

}).call(this);

(function() {
  var chart, generateData, setDataButton,
  _this = this;

generateData = function() {
  var data;
  return data = [
    {
      min: -10,
      max: 10,
      value: Math.floor(Math.random() * 20 - 10)
    }
  ];
};

chart = new Tactile.Chart().element($("#example_view")[0]).data(generateData()).addSeries({
  name: "gauge",
  renderer: "gauge",
  labels: true
});

chart.render();

setDataButton = $("<button class='btn btn-mini'>Set data</button>");

$("#above-chart").html(setDataButton);

setDataButton.click(function(e) {
  chart.data(generateData());
  chart.render();
  return e.stopPropagation();
});

$("#below-chart").html('');

}).call(this);

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

(function() {
  var chart, data, generateData, setDataButton,
  _this = this;

data = [
  {
    label: "USA",
    value: 0,
    change: 0,
    barPosition: 0
  }, {
    label: "New Zealand",
    value: 0,
    change: 0,
    barPosition: 0
  }, {
    label: "Australia",
    value: 0,
    change: 0,
    barPosition: 0
  }, {
    label: "Canada",
    value: 0,
    change: 0,
    barPosition: 0
  }
];

generateData = function(count) {
  var i, index, j, oldValue;
  i = 0;
  while (i < count) {
    oldValue = data[i].value;
    data[i].value = Math.floor(Math.random() * 1000);
    data[i].change = data[i].value - oldValue;
    data[i].barPosition = data[i].value / 1000;
    i++;
  }
  i = 0;
  while (i < count) {
    j = 0;
    index = 0;
    while (j < count) {
      if (data[j].value > data[i].value) {
        index++;
      }
      j++;
    }
    data[i].index = index;
    i++;
  }
  return data;
};

chart = new Tactile.Chart({
  unstack: false
}).element($("#example_view")[0]).data(generateData(4)).addSeries({
  name: "enemies",
  renderer: "leaderboard",
  changeFormat: d3.format("f"),
  valueFormat: d3.format("f"),
  dataTransform: function(d) {
    return {
      label: d.label,
      value: d.value,
      change: d.change,
      barPosition: d.barPosition,
      index: d.index
    };
  }
});

chart.render();

setDataButton = $("<button class='btn btn-mini'>Set data</button>");

$("#above-chart").html(setDataButton);

setDataButton.click(function(e) {
  chart.data(generateData(4));
  chart.render(1000);
  return e.stopPropagation();
});

$("#below-chart").html('');

}).call(this);

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
  }, {
    name: "friends",
    dotSize: 2,
    renderer: "line",
    sigfigs: 1,
    color: "#6060c0",
    yAxis: 'y1',
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
        y: d.z + d.y
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

(function() {
  var chart, data, frameVal;

frameVal = [0, 4];

data = [
  {
    x: 0,
    y: 0,
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

chart = new Tactile.Chart({
  height: 80,
  width: 80
}).element($("#example_view")[0]).data(data).addSeries([
  {
    name: "enemies",
    renderer: "line",
    dotSize: 0,
    color: "#c05020",
    dataTransform: function(d) {
      return {
        x: d.x,
        y: d.y
      };
    }
  }, {
    name: "friends",
    dotSize: 0,
    renderer: "line",
    color: "#6060c0",
    dataTransform: function(d) {
      return {
        x: d.x,
        y: d.z
      };
    }
  }
]);

chart.setPadding({
  top: 0,
  right: 0,
  bottom: 0,
  left: 0
});

chart.render();

$("#above-chart").html('');

}).call(this);

(function() {
  var buttonGroup, chart, data, stackButton, unstackButton;

data = [
  {
    label: "FL",
    val1: 4000,
    val2: 5000,
    val3: 6000,
    val4: 7000,
    val5: 8000,
    val6: 9000,
    color1: "#254E5D",
    color2: "#671E20",
    color3: "#8A8A8A",
    color4: "#2058C8",
    color5: "#C98621",
    color6: "#79593D"
  }, {
    label: "CA",
    val1: 8000,
    val2: 7000,
    val3: 6000,
    val4: 5000,
    val5: 4000,
    val6: 3000,
    color1: "#3F6672",
    color2: "#813D3F",
    color3: "#9D9D9D",
    color4: "#4072D0",
    color5: "#D39A42",
    color6: "#90765F"
  }, {
    label: "NY",
    val1: 2000,
    val2: 7000,
    val3: 1000,
    val4: 3000,
    val5: 2000,
    val6: 1000,
    color1: "#597D88",
    color2: "#9A5C5D",
    color3: "#B1B1B1",
    color4: "#608BD7",
    color5: "#DDAF63",
    color6: "#A79380"
  }
];

chart = new Tactile.Chart().element($("#example_view")[0]).data(data).addSeries([
  {
    name: "grapefruit",
    renderer: "donut",
    tooltip: function(d) {
      return d.label + " " + d.value;
    },
    dataTransform: function(d) {
      return {
        color: d.color1,
        value: d.val1,
        label: d.label
      };
    }
  }, {
    name: "kiwis",
    renderer: "donut",
    tooltip: function(d) {
      return d.label + " " + d.value;
    },
    dataTransform: function(d) {
      return {
        color: d.color2,
        value: d.val2,
        label: d.label
      };
    }
  }, {
    name: "cherries",
    renderer: "donut",
    tooltip: function(d) {
      return d.label + " " + d.value;
    },
    dataTransform: function(d) {
      return {
        color: d.color3,
        value: d.val3,
        label: d.label
      };
    }
  }, {
    name: "oranges",
    renderer: "donut",
    tooltip: function(d) {
      return d.label + " " + d.value;
    },
    dataTransform: function(d) {
      return {
        color: d.color4,
        value: d.val4,
        label: d.label
      };
    }
  }, {
    name: "apples",
    renderer: "donut",
    tooltip: function(d) {
      return d.label + " " + d.value;
    },
    dataTransform: function(d) {
      return {
        color: d.color5,
        value: d.val5,
        label: d.label
      };
    }
  }, {
    name: "peaches",
    renderer: "donut",
    tooltip: function(d) {
      return d.label + " " + d.value;
    },
    dataTransform: function(d) {
      return {
        color: d.color6,
        value: d.val6,
        label: d.label
      };
    }
  }
]);

chart.render();

stackButton = $("<button class='btn btn-mini'>Stack</button>");

unstackButton = $("<button class='btn btn-mini'>Unstack</button>");

buttonGroup = $("<div class='btn-group'></div>");

buttonGroup.prepend(stackButton);

buttonGroup.prepend(unstackButton);

buttonGroup.prepend(buttonGroup);

$("#above-chart").html('');

$("#above-chart").prepend(buttonGroup);

unstackButton.click(function(e) {
  chart.unstackTransition(1500);
  return e.stopPropagation();
});

stackButton.click(function(e) {
  chart.stackTransition(1500);
  return e.stopPropagation();
});

$("#below-chart").html('');

}).call(this);

(function() {
  var chart, data, frameVal, sl;

frameVal = [new Date(2012, 0, 1).getTime(), new Date(2012, 11, 1).getTime()];

data = [
  {
    period: new Date(2012, 0, 1).getTime(),
    actual: 4,
    plan: 0
  }, {
    period: new Date(2012, 1, 1).getTime(),
    actual: 5,
    plan: 1
  }, {
    period: new Date(2012, 2, 1).getTime(),
    actual: 6,
    plan: 2
  }, {
    period: new Date(2012, 3, 1).getTime(),
    actual: 7,
    plan: 3
  }, {
    period: new Date(2012, 4, 1).getTime(),
    actual: 6,
    plan: 5
  }, {
    period: new Date(2012, 5, 1).getTime(),
    actual: 5,
    plan: 8
  }, {
    period: new Date(2012, 6, 1).getTime(),
    actual: 4,
    plan: 5
  }, {
    period: new Date(2012, 7, 1).getTime(),
    actual: 5,
    plan: 3
  }, {
    period: new Date(2012, 8, 1).getTime(),
    actual: 6,
    plan: 2
  }, {
    period: new Date(2012, 9, 1).getTime(),
    actual: 7,
    plan: 1
  }, {
    period: new Date(2012, 10, 1).getTime(),
    actual: 6,
    plan: 1
  }, {
    period: new Date(2012, 11, 1).getTime(),
    actual: 5,
    plan: 2
  }
];

chart = new Tactile.Chart().element($("#example_view")[0]).data(data).axes({
  x: {
    dimension: 'time'
  },
  y: {
    dimension: "linear"
  }
}).setXFrame(frameVal).addSeries([
  {
    name: "reach actual",
    renderer: "column",
    wide: true,
    isEditable: true,
    round: true,
    color: "#6020c0",
    tooltip: function(d) {
      return d.y + " customers";
    },
    dataTransform: function(d) {
      return {
        x: d.period,
        y: d.actual
      };
    },
    afterDrag: function(d, y, i, draggedSeries, graph) {
      return graph.data()[i].actual = y;
    }
  }, {
    name: "reach plan",
    renderer: "line",
    color: "#c05020",
    isEditable: true,
    tooltip: function(d) {
      return d.y + " customers planned";
    },
    dataTransform: function(d) {
      return {
        x: d.period,
        y: d.plan
      };
    },
    afterDrag: function(d, y, i, draggedSeries, graph) {
      return graph.data()[i].plan = y;
    }
  }
]);

chart.render();

$("#above-chart").html('');

$("#below-chart").html('');

sl = $("<div>").attr("id", "slider").attr("class", "ui-horizontal-slider");

$("#below-chart").html(sl);

sl.slider({
  min: frameVal[0],
  max: frameVal[1],
  values: frameVal,
  range: true,
  slide: function(event, ui) {
    chart.setXFrame(ui.values);
    return chart.render();
  }
});

}).call(this);

(function() {
  

}).call(this);

(function() {
  var chart, data;

data = [
  {
    period: 1325376000,
    actual: 14,
    plan: 5
  }, {
    period: 1325496000,
    actual: null,
    plan: 10
  }, {
    period: 1330560000,
    plan: 19
  }, {
    period: 1333238400,
    actual: 13,
    plan: 33
  }, {
    period: 1335830400,
    actual: 16,
    plan: 15
  }, {
    period: 1338508800,
    actual: 25,
    plan: 25
  }, {
    period: 1341100800,
    actual: 16,
    plan: 15
  }, {
    period: 1343779200,
    actual: 16,
    plan: 33
  }, {
    period: 1346457600,
    actual: 12,
    plan: 15
  }, {
    period: 1349049600,
    actual: 14,
    plan: 10
  }, {
    period: 1351728000,
    actual: 16,
    plan: 9
  }, {
    period: 1354320000,
    actual: 15,
    plan: 14
  }, {
    period: 1357320000,
    actual: void 0,
    plan: null
  }
];

chart = new Tactile.Chart({
  unstack: false
}).element($("#example_view")[0]).data(data).axes({
  y: {
    dimension: "linear"
  }
}).addSeries({
  name: "actual-planned-dots",
  renderer: "scatter",
  color: "#F52A2D",
  cssConditions: function(d) {
    if (d.r < d.y) {
      return "low";
    }
    if (d.r === d.y) {
      return "mid";
    }
    if (d.r > d.y) {
      return "high";
    }
    return "";
  },
  tooltip: function(d) {
    return d.y + " planned, got " + d.r;
  },
  dataTransform: function(d) {
    return {
      x: d.period,
      y: d.plan,
      r: d.actual
    };
  }
});

chart.render();

$('#above-chart').html('');

$('#below-chart').html('');

}).call(this);

(function() {
  var chart, data, frameVal, sl;

frameVal = [2, 10];

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
    z: 300
  }, {
    x: 4,
    y: 332,
    z: 400
  }, {
    x: 5,
    y: 327,
    z: 450
  }, {
    x: 6,
    y: 332,
    z: 600
  }, {
    x: 7,
    y: 232,
    z: 601
  }, {
    x: 8,
    y: 402,
    z: 700
  }, {
    x: 9,
    y: 100,
    z: 430
  }, {
    x: 10,
    y: 134,
    z: 490
  }, {
    x: 11,
    y: 356,
    z: 450
  }, {
    x: 12,
    y: 339,
    z: 720
  }, {
    x: 13,
    y: 539,
    z: 650
  }, {
    x: 14,
    y: 650,
    z: 300
  }, {
    x: 15,
    y: 700,
    z: 100
  }
];

chart = new Tactile.Chart({
  grid: true
}).element($("#example_view")[0]).data(data).axes({
  x: {
    dimension: "time"
  }
}).setXFrame(frameVal).addSeries([
  {
    name: "xy",
    renderer: "line",
    color: "#c05020",
    dataTransform: function(d) {
      return {
        x: d.x,
        y: d.y
      };
    }
  }, {
    name: "xz",
    renderer: "line",
    color: "#6060c0",
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
  max: 15,
  values: frameVal,
  range: true,
  slide: function(event, ui) {
    chart.setXFrame(ui.values);
    return chart.render();
  }
});

}).call(this);

(function() {
  var buttonGroup, chart, data, frameVal, sl, stackButton, unstackButton;

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
}).element($("#example_view")[0]).data(data).setXFrame(frameVal).axes({
  y: "linear",
  x: {
    dimension: "linear"
  }
});

chart.addSeries([
  {
    name: "enemies",
    renderer: "area",
    dotSize: 1,
    sigfigs: 0,
    color: "#c05020",
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
    dataTransform: function(d) {
      return {
        x: d.x,
        y: d.z
      };
    }
  }, {
    name: "sum",
    renderer: "area",
    color: "#006400",
    dataTransform: function(d) {
      return {
        x: d.x,
        y: d.y + d.z / 2
      };
    }
  }
]);

chart.render();

stackButton = $("<button class='btn btn-mini'>Stack</button>");

unstackButton = $("<button class='btn btn-mini'>Unstack</button>");

buttonGroup = $("<div class='btn-group'></div>");

buttonGroup.prepend(stackButton);

buttonGroup.prepend(unstackButton);

$("#above-chart").html('');

$("#above-chart").prepend(buttonGroup);

unstackButton.click(function(e) {
  chart.unstackTransition();
  return e.stopPropagation();
});

stackButton.click(function(e) {
  chart.stackTransition();
  return e.stopPropagation();
});

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
      y2: Math.floor(Math.random() * 100),
      y3: Math.floor(Math.random() * 100),
      y4: Math.floor(Math.random() * 100)
    };
    i++;
  }
  return data;
};

chart = new Tactile.Chart({
  unstack: false
}).element($("#example_view")[0]).data(generateData(30)).setXFrame(frameVal).axes({
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
    renderer: "column",
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
    renderer: "column",
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
    renderer: "column",
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
  }, {
    name: "y3",
    renderer: "column",
    round: false,
    color: "#2e8b57",
    tooltip: function(d) {
      return d.y + " y3";
    },
    dataTransform: function(d) {
      return {
        x: d.period,
        y: d.y3
      };
    }
  }, {
    name: "y4",
    renderer: "column",
    round: false,
    color: "#ff7f24",
    tooltip: function(d) {
      return d.y + " y4";
    },
    dataTransform: function(d) {
      return {
        x: d.period,
        y: d.y4
      };
    }
  }
]);

chart.render();

buttonGroup = $("<div class='btn-group'></div>");

groupButton = $("<button class='btn btn-mini'>Grouped</button>");

stackButton = $("<button class='btn btn-mini'>Stacked</button>");

setDataButton = $("<button class='btn btn-mini btn-success'>Set data</button>");

dataCountSpinBox = $("<input type='number' min='10' max='100' step='10' value='30' class='span1'>");

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

(function() {
  var buttonGroup, chart, data, frameVal, groupButton, sl, stackButton;

frameVal = [new Date(2012, 2, 1).getTime(), new Date(2012, 11, 1).getTime()];

data = [
  {
    period: new Date(2012, 0, 1).getTime(),
    actual: 4,
    plan: 1
  }, {
    period: new Date(2012, 1, 1).getTime(),
    actual: 5,
    plan: 1
  }, {
    period: new Date(2012, 2, 1).getTime(),
    actual: 6,
    plan: 2
  }, {
    period: new Date(2012, 3, 1).getTime(),
    actual: 7,
    plan: 3
  }, {
    period: new Date(2012, 4, 1).getTime(),
    actual: 6,
    plan: 5
  }, {
    period: new Date(2012, 5, 1).getTime(),
    actual: 5,
    plan: 8
  }, {
    period: new Date(2012, 6, 1).getTime(),
    actual: 4,
    plan: 5
  }, {
    period: new Date(2012, 7, 1).getTime(),
    actual: 5,
    plan: 3
  }, {
    period: new Date(2012, 8, 1).getTime(),
    actual: 6,
    plan: 2
  }, {
    period: new Date(2012, 9, 1).getTime(),
    actual: 7,
    plan: 1
  }, {
    period: new Date(2012, 10, 1).getTime(),
    actual: 6,
    plan: 1
  }, {
    period: new Date(2012, 11, 1).getTime(),
    actual: 5,
    plan: 2
  }
];

chart = new Tactile.Chart({
  unstack: false,
  min: "auto"
}).element($("#example_view")[0]).data(data).setXFrame(frameVal).axes({
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
    name: "reach actual",
    renderer: "column",
    round: false,
    color: "#c05020",
    tooltip: function(d) {
      return d.y + " customers";
    },
    dataTransform: function(d) {
      return {
        x: d.period,
        y: d.actual
      };
    }
  }, {
    name: "planned",
    renderer: "column",
    round: false,
    color: "#6060c0",
    tooltip: function(d) {
      return d.y + " planned";
    },
    dataTransform: function(d) {
      return {
        x: d.period,
        y: d.plan
      };
    }
  }, {
    name: "sum",
    renderer: "column",
    round: false,
    color: "#6020c0",
    tooltip: function(d) {
      return d.y + " sum";
    },
    dataTransform: function(d) {
      return {
        x: d.period,
        y: parseInt(d.plan + d.actual)
      };
    }
  }
]);

chart.render();

groupButton = $("<button class='btn btn-mini'>Grouped</button>");

stackButton = $("<button class='btn btn-mini'>Stacked</button>");

buttonGroup = $("<div class='btn-group'></div>");

buttonGroup.prepend(groupButton);

buttonGroup.prepend(stackButton);

$("#above-chart").html('');

$("#above-chart").prepend(buttonGroup);

stackButton.click(function(e) {
  chart.stackTransition();
  return e.stopPropagation();
});

groupButton.click(function(e) {
  chart.unstackTransition();
  return e.stopPropagation();
});

sl = $("<div>").attr("id", "slider").attr("class", "ui-horizontal-slider");

$("#below-chart").html(sl);

sl.slider({
  min: new Date(2012, 0, 1).getTime(),
  max: new Date(2012, 11, 1).getTime(),
  values: frameVal,
  range: true,
  slide: function(event, ui) {
    chart.setXFrame(ui.values);
    return chart.render();
  }
});

}).call(this);

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

(function() {
  var chart, data, frameVal, sl;

frameVal = [0, 4];

data = [
  {
    x: 0,
    y: -100,
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

chart = new Tactile.Chart({
  autoScale: false,
  minXFrame: 3,
  minYFrame: 200,
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
  }
}).setXFrame(frameVal).yMin('auto').element($("#example_view")[0]).data(data).addSeries([
  {
    name: "enemies",
    renderer: "line",
    color: "#c05020",
    isEditable: true,
    tooltip: function(d) {
      return d.y + " enemies";
    }
  }, {
    name: "friends",
    renderer: "line",
    color: "#6060c0",
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
  max: 9,
  values: chart.x.domain(),
  range: true,
  slide: function(event, ui) {
    chart.x.domain(ui.values);
    return chart.render();
  }
});

chart.onUpdate(function() {
  return sl.slider({
    min: chart.x.domain()[0] < 0 ? chart.x.domain()[0] : 0,
    max: chart.x.domain()[1] > 9 ? chart.x.domain()[1] : 9,
    values: chart.x.domain()
  });
});

}).call(this);

