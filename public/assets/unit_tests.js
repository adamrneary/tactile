(function() {
  describe('Area series', function() {
  var Chart;

  Chart = new Tactile.Chart();
  it("Chart: check data function", function() {
    var data;

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
    Chart.data(data);
    return assert(Chart._data === data);
  });
  it("Chart: check axes function");
  it("Chart: check element function", function() {
    Chart.element($("#example_view")[0]);
    return assert(Chart._element === $("#example_view")[0]);
  });
  it('addSeries');
  it('slider', function() {
    var data, frameVal;

    frameVal = [0, 4];
    return data = [
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
  });
  it("Chart: check for all series don't disabled");
  it("Chart: check for disable all series");
  it("Chart: check setSize function", function(done) {
    var height, heightMargin, heightPadding, width, widthMargin, widthPadding;

    Chart = new window.Tactile.Chart();
    Chart.setSize({
      width: 700,
      height: 450
    });
    Chart.update();
    widthMargin = Chart.margin.left + Chart.margin.right;
    widthPadding = Chart.padding.left + Chart.padding.right;
    heightMargin = Chart.margin.top + Chart.margin.bottom;
    heightPadding = Chart.padding.top + Chart.padding.bottom;
    width = widthMargin + widthPadding;
    height = heightMargin + heightPadding;
    assert(Chart.width() === (700 - width));
    assert(Chart.height() === (450 - height));
    return done();
  });
  it("Chart: check height function", function(done) {
    var height, heightMargin, heightPadding;

    Chart = new window.Tactile.Chart();
    Chart = Chart.height(400);
    Chart.update();
    heightMargin = Chart.margin.top + Chart.margin.bottom;
    heightPadding = Chart.padding.top + Chart.padding.bottom;
    height = heightMargin + heightPadding;
    assert(Chart.height() === 400 - height);
    return done();
  });
  it("Chart: check width function", function(done) {
    var width, widthMargin, widthPadding;

    Chart = new window.Tactile.Chart();
    Chart = Chart.width(680);
    Chart.update();
    widthMargin = Chart.margin.left + Chart.margin.right;
    widthPadding = Chart.padding.left + Chart.padding.right;
    width = 680 - widthMargin - widthPadding;
    assert(Chart.width() === width);
    return done();
  });
  it('Tactile.Chart().render is function', function() {
    return assert(typeof Chart.render === 'function');
  });
  it('Tactile.Chart().initSeriesStackData is function', function() {
    return assert(typeof Chart.initSeriesStackData === 'function');
  });
  return it('Tactile.Chart().element is function', function() {
    return assert(typeof Chart.element === 'function');
  });
});

}).call(this);

(function() {
  describe('Column series', function() {
  var Chart;

  Chart = new Tactile.Chart();
  it("Chart: check data function", function() {
    var data;

    data = [
      {
        period: 1325376000,
        actual: 4,
        plan: 1
      }, {
        period: 1328054500,
        actual: 5,
        plan: 1
      }, {
        period: 1330560000,
        actual: 6,
        plan: 2
      }, {
        period: 1333238400,
        actual: 7,
        plan: 3
      }, {
        period: 1335830400,
        actual: 6,
        plan: 5
      }, {
        period: 1338508800,
        actual: 5,
        plan: 8
      }, {
        period: 1341100800,
        actual: 4,
        plan: 5
      }, {
        period: 1343779200,
        actual: 5,
        plan: 3
      }, {
        period: 1346457600,
        actual: 6,
        plan: 2
      }, {
        period: 1349049600,
        actual: 7,
        plan: 1
      }, {
        period: 1351728000,
        actual: 6,
        plan: 1
      }, {
        period: 1354320000,
        actual: 5,
        plan: 2
      }
    ];
    Chart.data(data);
    return assert(Chart._data === data);
  });
  it("Chart: check element function", function() {
    Chart.element($("#example_view")[0]);
    return assert(Chart._element === $("#example_view")[0]);
  });
  it('addSeries');
  it("Chart: check for all series don't disabled");
  it("Chart: check for disable all series");
  it("Chart: check height function");
  it("Chart: check setSize function");
  it("Chart: check width function", function() {
    var width, widthMargin, widthPadding;

    Chart = Chart.width(700);
    Chart.update();
    widthMargin = Chart.margin.left + Chart.margin.right;
    widthPadding = Chart.padding.left + Chart.padding.right;
    width = widthMargin + widthPadding;
    return assert(Chart.width() === 700 - width);
  });
  it('Tactile.Chart().render is function', function() {
    return assert(typeof Chart.render === 'function');
  });
  it('Tactile.Chart().initSeriesStackData is function', function() {
    return assert(typeof Chart.initSeriesStackData === 'function');
  });
  return it('Tactile.Chart().element is function', function() {
    return assert(typeof Chart.element === 'function');
  });
});

}).call(this);

(function() {
  describe('Donut series', function() {
  var Chart;

  Chart = new Tactile.Chart();
  it("Chart: check data function", function() {
    var data;

    data = [
      {
        label: "FL",
        val: 40000
      }, {
        label: "CA",
        val: 30000
      }, {
        label: "NY",
        val: 20000
      }, {
        label: "NC",
        val: 30000
      }, {
        label: "SC",
        val: 40000
      }, {
        label: "AZ",
        val: 50000
      }, {
        label: "TX",
        val: 60000
      }
    ];
    Chart.data(data);
    return assert(Chart._data === data);
  });
  it("Chart: check element function", function() {
    Chart.element($("#example_view")[0]);
    return assert(Chart._element === ($("#example_view")[0]));
  });
  it('addSeries');
  it("Chart: check for all series don't disabled");
  it("Chart: check for disable all series");
  it("Chart: check setSize function");
  it("Chart: check height function");
  it("Chart: check width function", function() {
    var width, widthMargin, widthPadding;

    Chart = Chart.width(680);
    Chart.update();
    widthMargin = Chart.margin.left + Chart.margin.right;
    widthPadding = Chart.padding.left + Chart.padding.right;
    width = widthMargin + widthPadding;
    return assert(Chart.width() === 680 - width);
  });
  it('Tactile.Chart().render is function', function() {
    return assert(typeof Chart.render === 'function');
  });
  it('Tactile.Chart().initSeriesStackData is function', function() {
    return assert(typeof Chart.initSeriesStackData === 'function');
  });
  return it('Tactile.Chart().element is function', function() {
    return assert(typeof Chart.element === 'function');
  });
});

}).call(this);

(function() {
  describe('Gauge series', function() {
  var Chart;

  Chart = new Tactile.Chart();
  it("Chart: check data function", function() {
    var data;

    data = [
      {
        value: 1,
        min: -10,
        max: 10
      }
    ];
    Chart.data(data);
    return assert(Chart._data === data);
  });
  it("Chart: check element function", function() {
    Chart.element($("#example_view")[0]);
    return assert(Chart._element === ($("#example_view")[0]));
  });
  it('addSeries', function() {});
  it("Chart: check setSize function");
  it("Chart: check height function");
  it("Chart: check width function", function() {
    var width, widthMargin, widthPadding;

    Chart = Chart.width(700);
    Chart.update();
    widthMargin = Chart.margin.left + Chart.margin.right;
    widthPadding = Chart.padding.left + Chart.padding.right;
    width = widthMargin + widthPadding;
    return assert(Chart.width() === 700 - width);
  });
  it('Tactile.Chart().render is function', function() {
    return assert(typeof Chart.render === 'function');
  });
  it('Tactile.Chart().initSeriesStackData is function', function() {
    return assert(typeof Chart.initSeriesStackData === 'function');
  });
  return it('Tactile.Chart().element is function', function() {
    return assert(typeof Chart.element === 'function');
  });
});

}).call(this);

(function() {
  describe('Legend series', function() {
  var Chart;

  Chart = new Tactile.Chart();
  it("Chart: check data function", function() {
    var data;

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
    Chart.data(data);
    return assert(Chart._data === data);
  });
  it("Chart: check axes function");
  it("Chart: check element function", function() {
    Chart.element($("#example_view")[0]);
    return assert(Chart._element === ($("#example_view")[0]));
  });
  it('addSeries');
  it("Chart: check for all series don't disabled");
  it("Chart: check for disable all series");
  it("Chart: check setSize function");
  it("Chart: check height function");
  it("Chart: check width function", function() {
    var width, widthMargin, widthPadding;

    Chart = Chart.width(700);
    Chart.update();
    widthMargin = Chart.margin.left + Chart.margin.right;
    widthPadding = Chart.padding.left + Chart.padding.right;
    width = widthMargin + widthPadding;
    return assert(Chart.width() === 700 - width);
  });
  it('Tactile.Chart().render is function', function() {
    return assert(typeof Chart.render === 'function');
  });
  it('Tactile.Chart().initSeriesStackData is function', function() {
    return assert(typeof Chart.initSeriesStackData === 'function');
  });
  return it('Tactile.Chart().element is function', function() {
    return assert(typeof Chart.element === 'function');
  });
});

}).call(this);

(function() {
  describe('Line series', function() {
  var Chart;

  Chart = new Tactile.Chart();
  it("Chart: check data function", function() {
    var data;

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
    Chart.data(data);
    return assert(Chart._data === data);
  });
  it("Chart: check axes function");
  it("Chart: check element function", function() {
    Chart.element($("#example_view")[0]);
    return assert(Chart._element === ($("#example_view")[0]));
  });
  it('addSeries');
  it("Chart: check for all series don't disabled");
  it("Chart: check for disable all series");
  it("Chart: check setSize function");
  it("Chart: check height function");
  it("Chart: check width function", function() {
    var width, widthMargin, widthPadding;

    Chart = Chart.width(700);
    Chart.update();
    widthMargin = Chart.margin.left + Chart.margin.right;
    widthPadding = Chart.padding.left + Chart.padding.right;
    width = widthMargin + widthPadding;
    return assert(Chart.width() === 700 - width);
  });
  it('Tactile.Chart().render is function', function() {
    return assert(typeof Chart.render === 'function');
  });
  it('Tactile.Chart().initSeriesStackData is function', function() {
    return assert(typeof Chart.initSeriesStackData === 'function');
  });
  return it('Tactile.Chart().element is function', function() {
    return assert(typeof Chart.element === 'function');
  });
});

}).call(this);

(function() {
  describe('Multiple donuts timeframe', function() {
  var Chart;

  Chart = new Tactile.Chart();
  it("Chart: check data function", function() {
    var data;

    data = [
      {
        period: 1325376000,
        actual: 4,
        plan: 0
      }, {
        period: 1328054400,
        actual: 5,
        plan: 1
      }, {
        period: 1330560000,
        actual: 6,
        plan: 2
      }, {
        period: 1333238400,
        actual: 7,
        plan: 3
      }, {
        period: 1335830400,
        actual: 6,
        plan: 5
      }, {
        period: 1338508800,
        actual: 5,
        plan: 8
      }, {
        period: 1341100800,
        actual: 4,
        plan: 5
      }, {
        period: 1343779200,
        actual: 5,
        plan: 3
      }, {
        period: 1346457600,
        actual: 6,
        plan: 2
      }, {
        period: 1349049600,
        actual: 7,
        plan: 1
      }, {
        period: 1351728000,
        actual: 6,
        plan: 1
      }, {
        period: 1354320000,
        actual: 5,
        plan: 2
      }
    ];
    Chart.data(data);
    return assert(Chart._data === data);
  });
  it("Chart: check axes function");
  it("Chart: check element function", function() {
    Chart.element($("#example_view")[0]);
    return assert(Chart._element === ($("#example_view")[0]));
  });
  it('addSeries');
  it("Chart: check for all series don't disabled");
  it("Chart: check for disable all series");
  it("Chart: check height function");
  it("Chart: check setSize function");
  it("Chart: check width function", function() {
    var width, widthMargin, widthPadding;

    Chart = Chart.width(680);
    Chart.update();
    widthMargin = Chart.margin.left + Chart.margin.right;
    widthPadding = Chart.padding.left + Chart.padding.right;
    width = widthMargin + widthPadding;
    return assert(Chart.width() === 680 - width);
  });
  it('Tactile.Chart().render is function', function() {
    return assert(typeof Chart.render === 'function');
  });
  it('Tactile.Chart().initSeriesStackData is function', function() {
    return assert(typeof Chart.initSeriesStackData === 'function');
  });
  return it('Tactile.Chart().element is function', function() {
    return assert(typeof Chart.element === 'function');
  });
});

}).call(this);

(function() {
  describe('Multiple series timeframe', function() {
  var Chart;

  Chart = new Tactile.Chart();
  it("Chart: check data function", function() {
    var data;

    data = [
      {
        period: 1325376000,
        actual: 4,
        plan: 0
      }, {
        period: 1328054400,
        actual: 5,
        plan: 1
      }, {
        period: 1330560000,
        actual: 6,
        plan: 2
      }, {
        period: 1333238400,
        actual: 7,
        plan: 3
      }, {
        period: 1335830400,
        actual: 6,
        plan: 5
      }, {
        period: 1338508800,
        actual: 5,
        plan: 8
      }, {
        period: 1341100800,
        actual: 4,
        plan: 5
      }, {
        period: 1343779200,
        actual: 5,
        plan: 3
      }, {
        period: 1346457600,
        actual: 6,
        plan: 2
      }, {
        period: 1349049600,
        actual: 7,
        plan: 1
      }, {
        period: 1351728000,
        actual: 6,
        plan: 1
      }, {
        period: 1354320000,
        actual: 5,
        plan: 2
      }
    ];
    Chart.data(data);
    return assert(Chart._data === data);
  });
  it("Chart: check axes function");
  it("Chart: check element function", function() {
    Chart.element($("#example_view")[0]);
    return assert(Chart._element === ($("#example_view")[0]));
  });
  it('addSeries');
  it("Chart: check for all series don't disabled");
  it("Chart: check for disable all series");
  it("Chart: check height function");
  it("Chart: check setSize function");
  it("Chart: check width function", function() {
    var width, widthMargin, widthPadding;

    Chart = Chart.width(680);
    Chart.update();
    widthMargin = Chart.margin.left + Chart.margin.right;
    widthPadding = Chart.padding.left + Chart.padding.right;
    width = widthMargin + widthPadding;
    return assert(Chart.width() === 680 - width);
  });
  it('Tactile.Chart().render is function', function() {
    return assert(typeof Chart.render === 'function');
  });
  it('Tactile.Chart().initSeriesStackData is function', function() {
    return assert(typeof Chart.initSeriesStackData === 'function');
  });
  return it('Tactile.Chart().element is function', function() {
    return assert(typeof Chart.element === 'function');
  });
});

}).call(this);

(function() {
  describe('Scatter series', function() {
  var Chart;

  Chart = new Tactile.Chart();
  it('addSeries');
  it("Chart: check data function", function() {
    var data;

    data = [
      {
        period: 1325376000,
        actual: 14,
        plan: 5
      }, {
        period: 1328054400,
        actual: 16,
        plan: 10
      }, {
        period: 1330560000,
        actual: 12,
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
      }
    ];
    Chart.data(data);
    return assert(Chart._data === data);
  });
  it("Chart: check element function", function() {
    Chart.element($("#example_view")[0]);
    return assert(Chart._element === ($("#example_view")[0]));
  });
  it("Chart: check for all series don't disabled");
  it("Chart: check for disable all series");
  it("Chart: check height function");
  it("Chart: check setSize function");
  it("Chart: check width function", function() {
    var width, widthMargin, widthPadding;

    Chart = Chart.width(700);
    Chart.update();
    widthMargin = Chart.margin.left + Chart.margin.right;
    widthPadding = Chart.padding.left + Chart.padding.right;
    width = widthMargin + widthPadding;
    return assert(Chart.width() === 700 - width);
  });
  it('Tactile.Chart().render is function', function() {
    return assert(typeof Chart.render === 'function');
  });
  it('Tactile.Chart().initSeriesStackData is function', function() {
    return assert(typeof Chart.initSeriesStackData === 'function');
  });
  return it('Tactile.Chart().element is function', function() {
    return assert(typeof Chart.element === 'function');
  });
});

}).call(this);

(function() {
  describe('Sliding timeframe series', function() {
  var Chart;

  Chart = new Tactile.Chart();
  it("Chart: check data function", function() {
    var data;

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
    Chart.data(data);
    return assert(Chart._data === data);
  });
  it("Chart: check axes function");
  it("Chart: check element function", function() {
    Chart.element($("#example_view")[0]);
    return assert(Chart._element === ($("#example_view")[0]));
  });
  it('addSeries');
  it("Chart: check for all series don't disabled");
  it("Chart: check for disable all series");
  it("Chart: check height function");
  it("Chart: check setSize function");
  it("Chart: check width function", function() {
    var width, widthMargin, widthPadding;

    Chart = Chart.width(680);
    Chart.update();
    widthMargin = Chart.margin.left + Chart.margin.right;
    widthPadding = Chart.padding.left + Chart.padding.right;
    width = widthMargin + widthPadding;
    return assert(Chart.width() === 680 - width);
  });
  it('Tactile.Chart().render is function', function() {
    return assert(typeof Chart.render === 'function');
  });
  it('Tactile.Chart().initSeriesStackData is function', function() {
    return assert(typeof Chart.initSeriesStackData === 'function');
  });
  return it('Tactile.Chart().element is function', function() {
    return assert(typeof Chart.element === 'function');
  });
});

}).call(this);

(function() {
  describe('Stacked columb timeframe', function() {
  var Chart;

  Chart = new Tactile.Chart();
  it("Chart: check data function", function() {
    var data;

    data = [
      {
        period: 1325376000,
        actual: 4,
        plan: 1
      }, {
        period: 1328054400,
        actual: 5,
        plan: 1
      }, {
        period: 1330560000,
        actual: 6,
        plan: 2
      }, {
        period: 1333238400,
        actual: 7,
        plan: 3
      }, {
        period: 1335830400,
        actual: 6,
        plan: 5
      }, {
        period: 1338508800,
        actual: 5,
        plan: 8
      }, {
        period: 1341100800,
        actual: 4,
        plan: 5
      }, {
        period: 1343779200,
        actual: 5,
        plan: 3
      }, {
        period: 1346457600,
        actual: 6,
        plan: 2
      }, {
        period: 1349049600,
        actual: 7,
        plan: 1
      }, {
        period: 1351728000,
        actual: 6,
        plan: 1
      }, {
        period: 1354320000,
        actual: 5,
        plan: 2
      }
    ];
    Chart.data(data);
    return assert(Chart._data === data);
  });
  it("Chart: check axes function");
  it("Chart: check element function", function() {
    Chart.element($("#example_view")[0]);
    return assert(Chart._element === ($("#example_view")[0]));
  });
  it('addSeries');
  it("Chart: check for all series don't disabled");
  it("Chart: check for disable all series");
  it("Chart: check height function");
  it("Chart: check setSize function");
  it("Chart: check width function", function() {
    var width, widthMargin, widthPadding;

    Chart = Chart.width(680);
    Chart.update();
    widthMargin = Chart.margin.left + Chart.margin.right;
    widthPadding = Chart.padding.left + Chart.padding.right;
    width = widthMargin + widthPadding;
    return assert(Chart.width() === 680 - width);
  });
  it('Tactile.Chart().render is function', function() {
    return assert(typeof Chart.render === 'function');
  });
  it('Tactile.Chart().initSeriesStackData is function', function() {
    return assert(typeof Chart.initSeriesStackData === 'function');
  });
  return it('Tactile.Chart().element is function', function() {
    return assert(typeof Chart.element === 'function');
  });
});

}).call(this);

(function() {
  describe('Area renderer', function() {
  it('Area renderer: initialize');
  it('Area renderer: seriesPathFactory');
  it('Area renderer: seriesStrokeFactory');
  return it('Area renderer: render');
});

}).call(this);

(function() {
  describe('Donut series', function() {
  it('example', function() {
    var chart, data;

    data = [
      {
        label: "FL",
        val: 40000
      }, {
        label: "CA",
        val: 30000
      }, {
        label: "NY",
        val: 20000
      }, {
        label: "NC",
        val: 30000
      }, {
        label: "SC",
        val: 40000
      }, {
        label: "AZ",
        val: 50000
      }, {
        label: "TX",
        val: 60000
      }
    ];
    chart = new window.Tactile.Chart().element(window.$("#example_view")[0]).width(680).height(400).data(data);
    chart.addSeries({
      name: "donut",
      renderer: "donut",
      color: "#c05020"
    });
    chart.render();
    return $("#example_view").empty();
  });
  return it('appendTooltip');
});

}).call(this);

(function() {
  describe('Axis time', function() {
  it('Axis time: constructor');
  it('Axis time: appropriateTimeUnit');
  it('Axis time: tickOffsets');
  return it('Axis time: render');
});

}).call(this);

(function() {
  describe('Axis y', function() {
  it('Axis y: constructor');
  return it('Axis y: render');
});

}).call(this);

(function() {
  describe('Chart', function() {
  var data, frameVal;

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
  it('Chart: constructor', function() {
    var _chart;

    _chart = new window.Tactile.Chart({
      unstack: false
    }).data(data).width(680).height(400).axes({
      x: {
        dimension: "time",
        frame: frameVal
      }
    });
    return assert(_chart);
  });
  it('Chart: addSeries', function() {
    var enemies, friends, _chart;

    _chart = new window.Tactile.Chart();
    _chart.addSeries([
      {
        name: "enemies",
        renderer: "area",
        sigfigs: 0,
        draggable: true,
        afterDrag: function(d, y, i, draggedSeries, graph) {
          return graph.data()[i].y = y;
        },
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
        draggable: true,
        afterDrag: function(d, y, i, draggedSeries, graph) {
          return graph.data()[i].z = y;
        },
        dataTransform: function(d) {
          return {
            x: d.x,
            y: d.z
          };
        }
      }
    ]);
    enemies = _chart.series[_chart.series.array.length - 2];
    friends = _chart.series[_chart.series.array.length - 1];
    assert(enemies.name === 'enemies');
    assert(friends.name === 'friends');
    assert(enemies.renderer === 'area');
    assert(friends.renderer === 'area');
    assert(enemies.color === '#c05020');
    assert(friends.color === '#6060c0');
    assert(typeof enemies.dataTransform === 'function');
    assert(typeof friends.dataTransform === 'function');
    assert(typeof enemies.afterDrag === 'function');
    assert(typeof friends.afterDrag === 'function');
    assert(enemies.draggable === true);
    return assert(friends.draggable === true);
  });
  it("Chart: check overwriting series", function() {
    var series, _chart;

    series = {
      name: "reach actual",
      renderer: "column"
    };
    _chart = new window.Tactile.Chart({
      unstack: false
    }).data(data).width(680).height(400);
    _chart.addSeries([series, series]);
    _chart.addSeries(_.extend(series, {
      renderer: 'column',
      name: 'new series'
    }), {
      overwrite: true
    });
    assert(_chart.series.array.length === 1);
    assert(_chart.renderers.length === 1);
    return assert(_chart.renderers[0].name === 'column');
  });
  it('Chart: initSeriesStackData', function() {
    var _chart;

    _chart = new window.Tactile.Chart().data(data).width(680).height(400).axes({
      x: {
        dimension: "time",
        frame: frameVal
      }
    });
    _chart.addSeries([
      {
        name: "enemies",
        renderer: "area",
        sigfigs: 0,
        draggable: true,
        afterDrag: function(d, y, i, draggedSeries, graph) {
          return graph.data()[i].y = y;
        },
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
        draggable: true,
        afterDrag: function(d, y, i, draggedSeries, graph) {
          return graph.data()[i].z = y;
        },
        dataTransform: function(d) {
          return {
            x: d.x,
            y: d.z
          };
        }
      }
    ]);
    assert(typeof _chart.initSeriesStackData === 'function');
    assert(typeof _chart.initSeriesStackData());
    return assert(typeof _chart.initSeriesStackData({
      overwrite: true
    }));
  });
  it('Chart: render', function() {
    var _chart;

    _chart = new window.Tactile.Chart().data(data).width(680).height(400).axes({
      x: {
        dimension: "time",
        frame: frameVal
      }
    });
    assert(typeof _chart.render === 'function');
    return assert(typeof _chart.render());
  });
  it('Chart: update', function() {
    var _chart;

    _chart = new window.Tactile.Chart().data(data).width(680).height(400).axes({
      x: {
        dimension: "time",
        frame: frameVal
      }
    });
    assert(typeof _chart.update === 'function');
    return assert(typeof _chart.update());
  });
  it('Chart: discoverRange', function() {
    var _chart;

    _chart = new window.Tactile.Chart().data(data).width(680).height(400).axes({
      x: {
        dimension: "time",
        frame: frameVal
      }
    });
    return assert(typeof _chart.discoverRange === 'function');
  });
  it('Chart: findAxis', function() {
    var _chart;

    _chart = new window.Tactile.Chart().data(data).width(680).height(400).axes({
      x: {
        dimension: "time",
        frame: frameVal
      }
    });
    return assert(typeof _chart.initAxis === 'function');
  });
  it('Chart: dataDomain', function() {
    var _chart;

    _chart = new window.Tactile.Chart().data(data).width(680).height(400).axes({
      x: {
        dimension: "time",
        frame: frameVal
      }
    });
    return assert(typeof _chart.dataDomain === 'function');
  });
  it('Chart: stackData', function() {
    var _chart;

    _chart = new window.Tactile.Chart().data(data).width(680).height(400).axes({
      x: {
        dimension: "time",
        frame: frameVal
      }
    });
    return assert(typeof _chart.stackData === 'function');
  });
  it('Chart: setSize function', function() {
    var height, heightMargin, heightPadding, width, widthMargin, widthPadding, _chart;

    _chart = new window.Tactile.Chart();
    _chart.setSize({
      width: 700,
      height: 450
    });
    _chart.update();
    widthMargin = _chart.margin.left + _chart.margin.right;
    widthPadding = _chart.padding.left + _chart.padding.right;
    heightMargin = _chart.margin.top + _chart.margin.bottom;
    heightPadding = _chart.padding.top + _chart.padding.bottom;
    width = widthMargin + widthPadding;
    height = heightMargin + heightPadding;
    assert(_chart.width() === 700 - width);
    return assert(_chart.height() === 450 - height);
  });
  it('Chart: onUpdate', function() {
    var _chart;

    _chart = new window.Tactile.Chart().data(data).width(680).height(400).axes({
      x: {
        dimension: "time",
        frame: frameVal
      }
    });
    return assert(typeof _chart.onUpdate === 'function');
  });
  it('Chart: initRenderers', function() {
    var _chart;

    _chart = new window.Tactile.Chart().data(data).width(680).height(400).axes({
      x: {
        dimension: "time",
        frame: frameVal
      }
    });
    return assert(typeof _chart.initRenderers === 'function');
  });
  it('Chart: renderersByType', function() {
    var _chart;

    _chart = new window.Tactile.Chart().data(data).width(680).height(400).axes({
      x: {
        dimension: "time",
        frame: frameVal
      }
    });
    return assert(typeof _chart.renderersByType === 'function');
  });
  it('Chart: stackTransition', function() {
    var _chart;

    _chart = new window.Tactile.Chart().data(data).width(680).height(400).axes({
      x: {
        dimension: "time",
        frame: frameVal
      }
    });
    return assert(typeof _chart.stackTransition === 'function');
  });
  it('Chart: unstackTransition', function() {
    var _chart;

    _chart = new window.Tactile.Chart().data(data).width(680).height(400).axes({
      x: {
        dimension: "time",
        frame: frameVal
      }
    });
    return assert(typeof _chart.unstackTransition === 'function');
  });
  it('Chart: element', function() {
    var _chart;

    _chart = new window.Tactile.Chart();
    return assert(typeof _chart.element === 'function');
  });
  it('Chart: height function', function() {
    var height, heightMargin, heightPadding, _chart;

    _chart = new window.Tactile.Chart();
    _chart = _chart.height(400);
    _chart.update();
    heightMargin = _chart.margin.top + _chart.margin.bottom;
    heightPadding = _chart.padding.top + _chart.padding.bottom;
    height = heightMargin + heightPadding;
    return assert(_chart.height() === 400 - height);
  });
  it('Chart: width function', function() {
    var width, widthMargin, widthPadding, _chart;

    _chart = new window.Tactile.Chart();
    _chart = _chart.width(680);
    _chart.update();
    widthMargin = _chart.margin.left + _chart.margin.right;
    widthPadding = _chart.padding.left + _chart.padding.right;
    width = 680 - widthMargin - widthPadding;
    return assert(_chart.width() === width);
  });
  it('Chart: data function', function() {
    var _chart;

    _chart = new window.Tactile.Chart();
    _chart.data(data);
    return assert(_chart._data === data);
  });
  it('Chart: linear axis function', function() {
    var axis, tickFormat, _chart;

    frameVal = [0, 4];
    _chart = new window.Tactile.Chart();
    tickFormat = function(d) {
      return d + "%";
    };
    _chart.axes({
      x: {
        dimension: "linear",
        frame: frameVal,
        tickFormat: tickFormat
      }
    });
    assert(_chart.axesList.hasOwnProperty('x') === true);
    assert(_chart.axesList.hasOwnProperty('y') === false);
    axis = _chart.axesList.x;
    assert(axis.horizontal === true);
    assert(axis.tickFormat === tickFormat);
    assert(axis.frame === frameVal);
    return assert(axis.__proto__.constructor.name === "AxisLinear");
  });
  it('Chart: mixed axis function', function() {
    var _chart;

    _chart = new window.Tactile.Chart();
    _chart.axes({
      x: {
        dimension: "time"
      },
      y: {
        dimension: 'linear'
      }
    });
    assert(_chart.axesList.hasOwnProperty('x') === true);
    assert(_chart.axesList.hasOwnProperty('y') === true);
    assert(_chart.axesList.x.__proto__.constructor.name === "AxisTime");
    return assert(_chart.axesList.y.__proto__.constructor.name === "AxisLinear");
  });
  it("Chart: for all series don't disabled", function() {
    var res, _chart;

    _chart = new window.Tactile.Chart();
    res = _chart._allSeriesDisabled();
    return assert(res);
  });
  it('Tactile.Chart().element is function', function() {
    var Chart;

    Chart = new window.Tactile.Chart();
    return assert(typeof Chart.element === 'function');
  });
  return it('Chart: for disable all series', function() {
    var res, _chart;

    _chart = new window.Tactile.Chart();
    _chart.series.disableAll();
    res = _chart._allSeriesDisabled();
    return assert(res === true);
  });
});

}).call(this);

(function() {
  describe('Column renderer', function() {
  it('Column renderer: initialize');
  it('Column renderer: render');
  it('Column renderer: setupTooltips');
  it('Column renderer: barWidth');
  it('Column renderer: stackTransition');
  return it('Column renderer: unstackTransition');
});

}).call(this);

(function() {
  describe('Donut renderer', function() {
  it('Donut renderer: initialize');
  return it('Donut renderer: render');
});

}).call(this);

(function() {
  describe('Dragger', function() {
  it('Dragger: constructor');
  it('Dragger: makeHandlers');
  it('Dragger: updateDraggedNode');
  return it('Dragger: update');
});

}).call(this);

(function() {
  describe('Fixtures time', function() {
  it('Fixtures time: constructor');
  it('Fixtures time: unit');
  it('Fixtures time: formatDate');
  it('Fixtures time: formatTime');
  return it('Fixtures time: ceil');
});

}).call(this);

(function() {
  describe('Gauge renderer', function() {
  it('Gauge renderer: render');
  it('Gauge renderer: renderLabels');
  return it('Gauge renderer: domain');
});

}).call(this);

(function() {
  describe('Line renderer', function() {
  it('Line renderer: seriesPathFactory');
  it('Line renderer: initialize');
  return it('Line renderer: render');
});

}).call(this);

(function() {
  describe('Line series', function() {
  return it('example', function() {
    var chart, data, frameVal;

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
    chart = new window.Tactile.Chart().element(window.$("#example_view")[0]).data(data).axes({
      x: {
        dimension: "time",
        frame: frameVal
      }
    });
    chart.addSeries({
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
    });
    chart.addSeries({
      name: "friends",
      renderer: "line",
      sigfigs: 1,
      color: "#6060c0",
      draggable: true,
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
    });
    chart.render();
    return $("#example_view").empty();
  });
});

}).call(this);

(function() {
  describe('Range slider', function() {
  it('Range slider: constructor');
  return it('Range slider: updateGraph');
});

}).call(this);

(function() {
  describe('Renderer base', function() {
  it('Renderer base: constructor', function() {
    var _rendererBase;

    _rendererBase = new window.Tactile.RendererBase();
    return assert(_rendererBase);
  });
  describe('Renderer base: domain', function() {
    it('when data given', function() {
      var obj, _rendererBase;

      _rendererBase = new window.Tactile.RendererBase();
      obj = [
        {
          x: 1,
          y: 5
        }, {
          x: 2,
          y: 5
        }
      ];
      _rendererBase['graph'] = {
        stackedData: [obj, obj, obj]
      };
      return assert(_rendererBase.domain());
    });
    return it('without any data', function() {
      var stackedData, _rendererBase;

      _rendererBase = new window.Tactile.RendererBase();
      stackedData = [[]];
      _rendererBase['graph'] = {
        stackedData: stackedData
      };
      return assert(_rendererBase.domain());
    });
  });
  it('Renderer base: render');
  it('Renderer base: seriesCanvas');
  return it('Renderer base: configure');
});

}).call(this);

(function() {
  describe('Scatter renderer', function() {
  return it('Scatter renderer: render');
});

}).call(this);

(function() {
  describe('Tooltip', function() {
  it('Tooltip: constructor', function() {});
  it('Tooltip: appendTooltip', function() {});
  return it('Tooltip: annotate', function() {});
});

}).call(this);

