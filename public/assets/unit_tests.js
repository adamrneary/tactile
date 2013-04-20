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
  it('addSeries');
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

