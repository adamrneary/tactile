/*! tactile - v0.0.1 - 2012-12-09
* https://github.com/activecell/tactile
* Copyright (c) 2012 Activecell; Licensed  */

(function (){
var Tactile = window.Tactile || {};
window.Tactile = Tactile;
var FixturesTime;

Tactile.FixturesTime = FixturesTime = (function() {

  function FixturesTime() {
    var _this = this;
    this.tzOffset = new Date().getTimezoneOffset() * 60;
    this.months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    this.units = [
      {
        name: "decade",
        seconds: 86400 * 365.25 * 10,
        formatter: function(d) {
          return parseInt(d.getUTCFullYear() / 10) * 10;
        }
      }, {
        name: "year",
        seconds: 86400 * 365.25,
        formatter: function(d) {
          return d.getUTCFullYear();
        }
      }, {
        name: "month",
        seconds: 86400 * 30.5,
        formatter: function(d) {
          return _this.months[d.getUTCMonth()];
        }
      }, {
        name: "week",
        seconds: 86400 * 7,
        formatter: function(d) {
          return _this.formatDate(d);
        }
      }, {
        name: "day",
        seconds: 86400,
        formatter: function(d) {
          return d.getUTCDate();
        }
      }, {
        name: "6 hour",
        seconds: 3600 * 6,
        formatter: function(d) {
          return _this.formatTime(d);
        }
      }, {
        name: "hour",
        seconds: 3600,
        formatter: function(d) {
          return _this.formatTime(d);
        }
      }, {
        name: "15 minute",
        seconds: 60 * 15,
        formatter: function(d) {
          return _this.formatTime(d);
        }
      }, {
        name: "minute",
        seconds: 60,
        formatter: function(d) {
          return d.getUTCMinutes();
        }
      }, {
        name: "15 second",
        seconds: 15,
        formatter: function(d) {
          return d.getUTCSeconds() + "s";
        }
      }, {
        name: "second",
        seconds: 1,
        formatter: function(d) {
          return d.getUTCSeconds() + "s";
        }
      }
    ];
  }

  FixturesTime.prototype.unit = function(unitName) {
    return this.units.filter(function(unit) {
      return unitName === unit.name;
    }).shift();
  };

  FixturesTime.prototype.formatDate = function(d) {
    return d.toUTCString().match(/, (\w+ \w+ \w+)/)[1];
  };

  FixturesTime.prototype.formatTime = function(d) {
    return d.toUTCString().match(/(\d+:\d+):/)[1];
  };

  FixturesTime.prototype.ceil = function(time, unit) {
    var nearFuture, rounded;
    if (unit.name === "month") {
      nearFuture = new Date((time + unit.seconds - 1) * 1000);
      rounded = new Date(0);
      rounded.setUTCFullYear(nearFuture.getUTCFullYear());
      rounded.setUTCMonth(nearFuture.getUTCMonth());
      rounded.setUTCDate(1);
      rounded.setUTCHours(0);
      rounded.setUTCMinutes(0);
      rounded.setUTCSeconds(0);
      rounded.setUTCMilliseconds(0);
      return rounded.getTime() / 1000;
    }
    if (unit.name === "year") {
      nearFuture = new Date((time + unit.seconds - 1) * 1000);
      rounded = new Date(0);
      rounded.setUTCFullYear(nearFuture.getUTCFullYear());
      rounded.setUTCMonth(0);
      rounded.setUTCDate(1);
      rounded.setUTCHours(0);
      rounded.setUTCMinutes(0);
      rounded.setUTCSeconds(0);
      rounded.setUTCMilliseconds(0);
      return rounded.getTime() / 1000;
    }
    return Math.ceil(time / unit.seconds) * unit.seconds;
  };

  return FixturesTime;

})();

var AxisY;

Tactile.AxisY = AxisY = (function() {

  AxisY.prototype.berthRate = 0.10;

  function AxisY(options) {
    var pixelsPerTick,
      _this = this;
    this.options = options;
    this.graph = options.graph;
    this.orientation = options.orientation || "right";
    pixelsPerTick = options.pixelsPerTick || 75;
    this.ticks = options.ticks || Math.floor(this.graph.height / pixelsPerTick);
    this.tickSize = options.tickSize || 4;
    this.ticksTreatment = options.ticksTreatment || "plain";
    this.grid = options.grid;
    if (options.element) {
      this.element = options.element;
      this.vis = d3.select(options.element).append("svg:svg").attr("class", "graph y-axis");
      this.element = this.vis[0][0];
      this.element.style.position = "relative";
      this.setSize({
        width: options.width,
        height: options.height
      });
    } else {
      this.vis = this.graph.vis;
    }
    this.graph.onUpdate(function() {
      return _this.render();
    });
  }

  AxisY.prototype.setSize = function(options) {
    var berth, elementHeight, elementWidth, style;
    if (options == null) {
      options = {};
    }
    if (!this.element) {
      return;
    }
    if (typeof window !== "undefined") {
      style = window.getComputedStyle(this.element.parentNode, null);
      elementWidth = parseInt(style.getPropertyValue("width"));
      if (!options.auto) {
        elementHeight = parseInt(style.getPropertyValue("height"));
      }
    }
    this.width = options.width || elementWidth || this.graph.width * berthRate;
    this.height = options.height || elementHeight || this.graph.height;
    this.vis.attr("width", this.width).attr("height", this.height * (1 + this.berthRate));
    berth = this.height * this.berthRate;
    return this.element.style.top = -1 * berth + "px";
  };

  AxisY.prototype.render = function() {
    var axis, berth, gridSize, transform;
    this.vis.selectAll('.y-ticks, .y-grid').remove();
    if (this.graph.height !== this._renderHeight) {
      this.setSize({
        auto: true
      });
    }
    axis = d3.svg.axis().scale(this.graph.y).orient(this.orientation);
    axis.tickFormat(this.options.tickFormat || function(y) {
      return y;
    });
    if (this.orientation === "left") {
      berth = this.height * this.berthRate;
      transform = "translate(" + this.width + ", " + berth + ")";
    }
    if (this.element) {
      this.vis.selectAll("*").remove();
    }
    this.vis.append("svg:g").attr("class", ["y-ticks", this.ticksTreatment].join(" ")).attr("transform", transform).call(axis.ticks(this.ticks).tickSubdivide(0).tickSize(this.tickSize));
    if (this.grid) {
      gridSize = (this.orientation === "right" ? 1 : -1) * this.graph.width;
      this.graph.vis.append("svg:g").attr("class", "y-grid").call(axis.ticks(this.ticks).tickSubdivide(0).tickSize(gridSize));
    }
    return this._renderHeight = this.graph.height;
  };

  return AxisY;

})();

var AxisTime;

Tactile.AxisTime = AxisTime = (function() {

  function AxisTime(args) {
    var _this = this;
    this.graph = args.graph;
    this.elements = [];
    this.ticksTreatment = args.ticksTreatment || "plain";
    this.fixedTimeUnit = args.timeUnit;
    this.time = new FixturesTime();
    this.grid = args.grid;
    this.graph.onUpdate(function() {
      return _this.render();
    });
  }

  AxisTime.prototype.appropriateTimeUnit = function() {
    var domain, rangeSeconds, unit, units;
    unit = void 0;
    units = this.time.units;
    domain = this.graph.x.domain();
    rangeSeconds = domain[1] - domain[0];
    units.forEach(function(u) {
      if (Math.floor(rangeSeconds / u.seconds) >= 2) {
        return unit = unit || u;
      }
    });
    return unit || this.time.units[this.time.units.length - 1];
  };

  AxisTime.prototype.tickOffsets = function() {
    var count, domain, i, offsets, runningTick, tickValue, unit;
    domain = this.graph.x.domain();
    unit = this.fixedTimeUnit || this.appropriateTimeUnit();
    count = Math.ceil((domain[1] - domain[0]) / unit.seconds);
    runningTick = domain[0];
    offsets = [];
    i = 0;
    while (i < count) {
      tickValue = this.time.ceil(runningTick, unit);
      runningTick = tickValue + unit.seconds / 2;
      offsets.push({
        value: tickValue,
        unit: unit
      });
      i++;
    }
    return offsets;
  };

  AxisTime.prototype.render = function() {
    var offsets,
      _this = this;
    this.graph.vis.selectAll('.x-tick').remove();
    this.elements.forEach(function(e) {
      return e.parentNode.removeChild(e);
    });
    this.elements = [];
    offsets = this.tickOffsets();
    return offsets.forEach(function(o) {
      var element, title;
      if (_this.graph.x(o.value) > _this.graph.x.range()[1]) {
        return;
      }
      element = document.createElement("div");
      element.style.left = _this.graph.x(o.value) + "px";
      element.classList.add("x-tick");
      if (_this.grid) {
        element.classList.add("grid");
      }
      element.classList.add(_this.ticksTreatment);
      title = document.createElement("div");
      title.classList.add("title");
      title.innerHTML = o.unit.formatter(new Date(o.value * 1000));
      element.appendChild(title);
      _this.graph.element.appendChild(element);
      return _this.elements.push(element);
    });
  };

  return AxisTime;

})();

var HoverDetail;

Tactile.HoverDetail = HoverDetail = (function() {

  HoverDetail.prototype.defaults = {
    showXlabel: true
  };

  function HoverDetail(args) {
    var element, graph;
    args = _.extend({}, this.defaults, args);
    graph = this.graph = args.graph;
    this.xFormatter = args.xFormatter || function(x) {
      return new Date(x * 1000).toUTCString();
    };
    this.yFormatter = args.yFormatter || function(y) {
      return y.toFixed(2);
    };
    this.showXlabel = args.showXlabel;
    element = this.element = document.createElement("div");
    element.className = "detail";
    if (!this.showXlabel) {
      element.classList.add("no-line");
    }
    this.visible = true;
    graph.element.appendChild(element);
    this.lastEvent = null;
    this._addListeners();
    this.onShow = args.onShow;
    this.onHide = args.onHide;
    this.onRender = args.onRender;
    this.formatter = args.formatter || this.formatter;
  }

  HoverDetail.prototype.formatter = function(series, x, y, formattedX, formattedY, d) {
    return series.name + ":&nbsp;" + formattedY;
  };

  HoverDetail.prototype.update = function(e) {
    var activeItem, approximateIndex, dataIndex, detail, domainIndexScale, domainMouseY, domainX, eventX, eventY, formattedXValue, graph, graphX, i, left, leftOffset, order, sortFn, stackedData, topSeriesData;
    e = e || this.lastEvent;
    if (!e) {
      return;
    }
    this.lastEvent = e;
    if (!e.target.nodeName.match(/^(path|svg|rect)$/)) {
      return;
    }
    graph = this.graph;
    eventX = e.offsetX || e.layerX;
    eventY = e.offsetY || e.layerY;
    leftOffset = eventX;
    leftOffset = leftOffset > 0 ? leftOffset : 0;
    domainX = graph.x.invert(leftOffset);
    stackedData = graph.stackedData;
    topSeriesData = stackedData.slice(-1).shift();
    domainIndexScale = d3.scale.linear().domain([topSeriesData[0].x, topSeriesData.slice(-1).shift().x + 1]).range([0, topSeriesData.length]);
    approximateIndex = Math.floor(domainIndexScale(domainX));
    dataIndex = Math.min(approximateIndex || 0, stackedData[0].length - 1);
    i = approximateIndex;
    while (i < stackedData[0].length - 1) {
      if (!stackedData[0][i] || !stackedData[0][i + 1]) {
        break;
      }
      if (stackedData[0][i].x <= domainX && stackedData[0][i + 1].x > domainX) {
        dataIndex = i;
        break;
      }
      if (stackedData[0][i + 1].x <= domainX) {
        i++;
      } else {
        i--;
      }
    }
    domainX = stackedData[0][dataIndex].x;
    formattedXValue = this.xFormatter(domainX);
    graphX = graph.x(domainX);
    order = 0;
    detail = graph.series.map(function(s) {
      return {
        order: order++,
        series: s,
        name: s.name,
        value: s.stack[dataIndex]
      };
    });
    activeItem = void 0;
    sortFn = function(a, b) {
      return (a.value.y0 + a.value.y) - (b.value.y0 + b.value.y);
    };
    domainMouseY = graph.y.magnitude.invert(graph.element.offsetHeight - eventY);
    detail.sort(sortFn).forEach((function(d) {
      d.formattedYValue = (this.yFormatter.constructor === Array ? this.yFormatter[detail.indexOf(d)](d.value.y) : this.yFormatter(d.value.y));
      d.graphX = graphX;
      d.graphY = graph.y(d.value.y0 + d.value.y);
      if (domainMouseY > d.value.y0 && domainMouseY < d.value.y0 + d.value.y && !activeItem) {
        activeItem = d;
        return d.active = true;
      }
    }), this);
    this.element.innerHTML = "";
    left = graph.x(domainX);
    this.element.style.left = left + "px";
    if (this.visible) {
      return this.render({
        detail: detail,
        domainX: domainX,
        formattedXValue: formattedXValue,
        mouseX: eventX,
        mouseY: eventY
      });
    }
  };

  HoverDetail.prototype.hide = function() {
    this.visible = false;
    this.element.classList.add("inactive");
    if (typeof this.onHide === "function") {
      return this.onHide();
    }
  };

  HoverDetail.prototype.show = function() {
    this.visible = true;
    this.element.classList.remove("inactive");
    if (typeof this.onShow === "function") {
      return this.onShow();
    }
  };

  HoverDetail.prototype.render = function(args) {
    var detail, domainX, formattedXValue, mouseX, mouseY, xLabel;
    detail = args.detail;
    domainX = args.domainX;
    mouseX = args.mouseX;
    mouseY = args.mouseY;
    formattedXValue = args.formattedXValue;
    xLabel = document.createElement("div");
    xLabel.className = "x_label";
    xLabel.innerHTML = formattedXValue;
    if (this.showXlabel) {
      this.element.appendChild(xLabel);
    }
    detail.forEach((function(d) {
      var dot, item;
      item = document.createElement("div");
      item.className = "item";
      item.innerHTML = this.formatter(d.series, domainX, d.value.y, formattedXValue, d.formattedYValue, d);
      item.style.top = this.graph.y(d.value.y0 + d.value.y) + "px";
      this.element.appendChild(item);
      dot = document.createElement("div");
      dot.className = "dot";
      dot.style.top = item.style.top;
      dot.style.borderColor = d.series.color;
      this.element.appendChild(dot);
      if (d.active) {
        item.className = "item active";
        return dot.className = "dot active";
      }
    }), this);
    this.show();
    if (typeof this.onRender === "function") {
      return this.onRender(args);
    }
  };

  HoverDetail.prototype._addListeners = function() {
    var _this = this;
    this.graph.element.addEventListener("mousemove", (function(e) {
      this.visible = true;
      return this.update(e);
    }).bind(this), false);
    this.graph.onUpdate((function() {
      return _this.update();
    }).bind(this));
    return this.graph.element.addEventListener("mouseout", (function(e) {
      if (e.relatedTarget && !(e.relatedTarget.compareDocumentPosition(this.graph.element) & Node.DOCUMENT_POSITION_CONTAINS)) {
        return this.hide();
      }
    }).bind(this), false);
  };

  return HoverDetail;

})();

var RendererBase;

Tactile.RendererBase = RendererBase = (function() {

  RendererBase.prototype.defaults = {
    cartesian: true,
    tension: 0.95,
    strokeWidth: 3,
    unstack: true,
    padding: {
      top: 0.03,
      right: 0,
      bottom: 0.02,
      left: 0
    },
    stroke: false,
    fill: false
  };

  function RendererBase(options) {
    if (options == null) {
      options = {};
    }
    this.graph = options.graph;
    this.tension = options.tension || this.tension;
    this.configure(options);
    if (typeof this.initialize === "function") {
      this.initialize(options);
    }
  }

  RendererBase.prototype.seriesPathFactory = function() {};

  RendererBase.prototype.seriesStrokeFactory = function() {};

  RendererBase.prototype.domain = function() {
    var stackedData, topSeriesData, values, xMax, xMin, yMax, yMin,
      _this = this;
    values = [];
    stackedData = this.graph.stackedData || this.graph.stackData();
    topSeriesData = (this.unstack ? stackedData : [stackedData.slice(-1).shift()]);
    topSeriesData.forEach(function(series) {
      return series.forEach(function(d) {
        if (_this.unstack) {
          return values.push(d.y);
        } else {
          return values.push(d.y + d.y0);
        }
      });
    });
    xMin = stackedData[0][0].x;
    xMax = stackedData[0][stackedData[0].length - 1].x;
    xMin -= (xMax - xMin) * this.padding.left;
    xMax += (xMax - xMin) * this.padding.right;
    yMin = (this.graph.min === "auto" ? d3.min(values) : this.graph.min || 0);
    yMax = this.graph.max || d3.max(values);
    if (this.graph.min === "auto" || yMin <= 0) {
      yMin -= (yMax - yMin) * this.padding.bottom;
    }
    if (_.isUndefined(this.graph.max)) {
      yMax += (yMax - yMin) * this.padding.top;
    }
    return {
      x: [xMin, xMax],
      y: [yMin, yMax]
    };
  };

  RendererBase.prototype.render = function() {
    return this.graph.vis.selectAll("path").data([this.series.stack]).enter().append("svg:path").attr("fill", (this.fill ? this.series.color : "none")).attr("stroke", (this.stroke ? this.series.color : "none")).attr("stroke-width", this.strokeWidth).attr("class", this.series.className).attr("d", this.seriesPathFactory());
  };

  RendererBase.prototype.configure = function(options) {
    var defaults,
      _this = this;
    if (this.specificDefaults != null) {
      defaults = _.extend({}, this.defaults, this.specificDefaults);
    }
    options = _.extend({}, defaults, options);
    return _.each(options, function(val, key) {
      return _this[key] = val;
    });
  };

  return RendererBase;

})();

var GaugeRenderer,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Tactile.GaugeRenderer = GaugeRenderer = (function(_super) {

  __extends(GaugeRenderer, _super);

  function GaugeRenderer() {
    return GaugeRenderer.__super__.constructor.apply(this, arguments);
  }

  GaugeRenderer.prototype.name = "gauge";

  GaugeRenderer.prototype.specificDefaults = {
    cartesian: false,
    padding: {
      top: 0.01,
      right: 0,
      bottom: 0.2,
      left: 0
    }
  };

  GaugeRenderer.prototype.render = function() {
    var angleRange, arcs, arcsInner, innerArc, lineData, maxAngle, minAngle, originTranslate, outerArc, pg, plotAngle, plotValue, pointer, pointerHeadLength, pointerLine, pointerTailLength, pointerWidth, r, ringInset, ringWidth, scale, totalSizeDivide, translateHeight, translateWidth;
    scale = d3.scale.linear().range([0, 1]).domain(this.domain());
    ringInset = 0.300;
    ringWidth = 0.750;
    pointerWidth = 0.100;
    pointerTailLength = 0.015;
    pointerHeadLength = 0.900;
    totalSizeDivide = 1.3;
    this.bottomOffset = 1 - this.padding.bottom;
    minAngle = -85;
    maxAngle = 85;
    angleRange = maxAngle - minAngle;
    plotValue = this.value;
    r = Math.round(this.graph.height / totalSizeDivide);
    translateWidth = (this.graph.width - this.padding.right) / 2;
    translateHeight = this.graph.height * this.bottomOffset;
    originTranslate = "translate(" + translateWidth + ", " + translateHeight + ")";
    outerArc = d3.svg.arc().outerRadius(r * ringWidth).innerRadius(r * ringInset).startAngle(this.graph._deg2rad(minAngle)).endAngle(this.graph._deg2rad(minAngle + angleRange));
    arcs = this.graph.vis.append("g").attr("class", "gauge arc").attr("transform", originTranslate);
    arcs.selectAll("path").data([1]).enter().append("path").attr("d", outerArc);
    plotAngle = minAngle + (scale(plotValue) * angleRange);
    innerArc = d3.svg.arc().outerRadius(r * ringWidth).innerRadius(r * ringInset).startAngle(this.graph._deg2rad(minAngle)).endAngle(this.graph._deg2rad(plotAngle));
    arcsInner = this.graph.vis.append("g").attr("class", "gauge arc-value").attr("transform", originTranslate);
    arcsInner.selectAll("path").data([1]).enter().append("path").attr("d", innerArc);
    lineData = [[r * pointerWidth / 2, 0], [0, -(r * pointerHeadLength)], [-(r * pointerWidth / 2), 0], [0, r * pointerTailLength], [r * pointerWidth / 2, 0]];
    pointerLine = d3.svg.line().interpolate("monotone");
    pg = this.graph.vis.append("g").data([lineData]).attr("class", "gauge pointer").attr("transform", originTranslate);
    pointer = pg.append("path").attr("d", pointerLine);
    pointer.transition().duration(250).attr("transform", "rotate(" + plotAngle + ")");
    this.graph.vis.append("svg:circle").attr("r", this.graph.width / 30).attr("class", "gauge pointer-circle").style("opacity", 1).attr("transform", originTranslate);
    this.graph.vis.append("svg:circle").attr("r", this.graph.width / 90).attr('class', 'gauge pointer-nail').style("opacity", 1).attr('transform', originTranslate);
    if (this.series.labels) {
      return this.renderLabels();
    }
  };

  GaugeRenderer.prototype.renderLabels = function() {
    this.graph.vis.append("text").attr("class", "gauge label").text(this.min).attr("transform", "translate(" + (0.1 * this.graph.width) + ", " + (1.15 * this.graph.height * this.bottomOffset) + ")");
    this.graph.vis.append("text").attr("class", "gauge label").text(this.value).attr("transform", "translate(" + ((this.graph.width - this.margin.right) / 1.95) + ", " + (1.20 * this.graph.height * this.bottomOffset) + ")");
    return this.graph.vis.append("text").attr("class", "gauge label").text(this.max).attr("transform", "translate(" + (0.90 * this.graph.width) + ", " + (1.15 * this.graph.height * this.bottomOffset) + ")");
  };

  GaugeRenderer.prototype.domain = function() {
    this.value = this.series.data[0].value;
    this.min = this.series.data[0].min;
    this.max = this.series.data[0].max;
    return [this.min, this.max];
  };

  return GaugeRenderer;

})(RendererBase);

var BarRenderer,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Tactile.BarRenderer = BarRenderer = (function(_super) {

  __extends(BarRenderer, _super);

  function BarRenderer() {
    return BarRenderer.__super__.constructor.apply(this, arguments);
  }

  BarRenderer.prototype.name = "bar";

  BarRenderer.prototype.specificDefaults = {
    gapSize: 0.15,
    tension: null,
    round: true
  };

  BarRenderer.prototype.render = function() {
    var activeSeriesCount, barWidth, barXOffset, edgeRatio, nodes, seriesBarWidth, transform, yValue,
      _this = this;
    barWidth = this.barWidth();
    barXOffset = 0;
    activeSeriesCount = this.graph.series.filter(function(s) {
      return !s.disabled;
    }).length;
    seriesBarWidth = this.unstack && !this.series.wide ? barWidth / activeSeriesCount : barWidth;
    transform = function(d) {
      var matrix;
      matrix = [1, 0, 0, (d.y < 0 ? -1 : 1), 0, (d.y < 0 ? this.graph.y.magnitude(Math.abs(d.y)) * 2 : 0)];
      return "matrix(" + matrix.join(",") + ")";
    };
    if (this.series.disabled) {
      return;
    }
    edgeRatio = this.series.round ? Math.round(0.05783 * seriesBarWidth + 1) : 0;
    yValue = function(d) {
      if (_this.unstack) {
        return (_this.graph.y(Math.abs(d.y))) * (d.y < 0 ? -1 : 1);
      } else {
        return (_this.graph.y(d.y0 + Math.abs(d.y))) * (d.y < 0 ? -1 : 1);
      }
    };
    if (this.graph._hasDifferentRenderers()) {
      barXOffset -= seriesBarWidth / 2;
    }
    nodes = this.graph.vis.selectAll("path").data(this.series.stack).enter().append("svg:rect").attr("x", function(d) {
      return _this.graph.x(d.x) + barXOffset;
    }).attr("y", yValue).attr("width", seriesBarWidth).attr("height", function(d) {
      return _this.graph.y.magnitude(Math.abs(d.y));
    }).attr("transform", transform).attr("class", "bar " + (this.series.color ? '' : 'colorless')).attr("fill", this.series.color).attr("rx", edgeRatio).attr("ry", edgeRatio);
    if (this.unstack) {
      return barXOffset += seriesBarWidth;
    }
  };

  BarRenderer.prototype.barWidth = function() {
    var barWidth, data, frequentInterval, stackedData;
    stackedData = this.graph.stackedData || this.graph.stackData();
    data = stackedData.slice(-1).shift();
    frequentInterval = this._frequentInterval();
    barWidth = this.graph.x(data[0].x + frequentInterval.magnitude * (1 - this.gapSize));
    return barWidth;
  };

  BarRenderer.prototype.initialize = function(options) {
    if (options == null) {
      options = {};
    }
    return this.gapSize = options.gapSize || this.gapSize;
  };

  BarRenderer.prototype.domain = function() {
    var domain, frequentInterval;
    domain = BarRenderer.__super__.domain.call(this);
    if (this.graph._hasDifferentRenderers()) {
      return domain;
    }
    frequentInterval = this._frequentInterval();
    domain.x[1] += parseInt(frequentInterval.magnitude);
    return domain;
  };

  BarRenderer.prototype._frequentInterval = function() {
    var data, frequentInterval, i, interval, intervalCounts, stackedData;
    stackedData = this.graph.stackedData || this.graph.stackData();
    data = stackedData.slice(-1).shift();
    intervalCounts = {};
    i = 0;
    while (i < data.length - 1) {
      interval = data[i + 1].x - data[i].x;
      intervalCounts[interval] = intervalCounts[interval] || 0;
      intervalCounts[interval]++;
      i++;
    }
    frequentInterval = {
      count: 0
    };
    _.keys(intervalCounts).forEach(function(i) {
      if (frequentInterval.count < intervalCounts[i]) {
        return frequentInterval = {
          count: intervalCounts[i],
          magnitude: i
        };
      }
    });
    this._frequentInterval = function() {
      return frequentInterval;
    };
    return frequentInterval;
  };

  return BarRenderer;

})(RendererBase);

var LineRenderer,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Tactile.LineRenderer = LineRenderer = (function(_super) {

  __extends(LineRenderer, _super);

  function LineRenderer() {
    return LineRenderer.__super__.constructor.apply(this, arguments);
  }

  LineRenderer.prototype.name = "line";

  LineRenderer.prototype.specificDefaults = {
    unstack: true,
    fill: false,
    stroke: true
  };

  LineRenderer.prototype.seriesPathFactory = function() {
    var _this = this;
    return d3.svg.line().x(function(d) {
      return _this.graph.x(d.x);
    }).y(function(d) {
      return _this.graph.y(d.y);
    }).interpolate(this.graph.interpolation).tension(this.tension);
  };

  return LineRenderer;

})(RendererBase);

var DraggableLineRenderer,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Tactile.DraggableLineRenderer = DraggableLineRenderer = (function(_super) {

  __extends(DraggableLineRenderer, _super);

  function DraggableLineRenderer() {
    this.update = __bind(this.update, this);

    this._mouseUp = __bind(this._mouseUp, this);

    this._mouseMove = __bind(this._mouseMove, this);

    this._datapointDrag = __bind(this._datapointDrag, this);

    this._bindMouseEvents = __bind(this._bindMouseEvents, this);
    return DraggableLineRenderer.__super__.constructor.apply(this, arguments);
  }

  DraggableLineRenderer.prototype.name = "draggableLine";

  DraggableLineRenderer.prototype.specificDefaults = {
    unstack: true,
    fill: false,
    stroke: true,
    dotSize: 5
  };

  DraggableLineRenderer.prototype.initialize = function() {
    this.afterDrag = this.series.afterDrag || function() {};
    this.dragged = this.selected = null;
    return this._bindMouseEvents();
  };

  DraggableLineRenderer.prototype.seriesPathFactory = function() {
    var _this = this;
    return d3.svg.line().x(function(d) {
      return _this.graph.x(d.x);
    }).y(function(d) {
      return _this.graph.y(d.y);
    }).interpolate(this.graph.interpolation).tension(this.tension);
  };

  DraggableLineRenderer.prototype.render = function() {
    var nodes,
      _this = this;
    DraggableLineRenderer.__super__.render.call(this);
    if (this.series.disabled) {
      return;
    }
    nodes = this.graph.vis.selectAll("path").data(this.series.stack).enter().append("svg:circle").attr("cx", function(d) {
      return _this.graph.x(d.x);
    }).attr("cy", function(d) {
      return _this.graph.y(d.y);
    }).attr("r", function(d) {
      if ("r" in d) {
        return d.r;
      } else {
        if (d === _this.selected) {
          return _this.dotSize + 1;
        } else {
          return _this.dotSize;
        }
      }
    }).attr("class", function(d) {
      if (d === _this.selected) {
        return "selected";
      } else {
        return null;
      }
    }).attr("stroke", function(d) {
      if (d === _this.selected) {
        return 'orange';
      } else {
        return 'white';
      }
    }).attr("stroke-width", '2').style("cursor", "ns-resize").on("mousedown.drag", this._datapointDrag).on("touchstart.drag", this._datapointDrag);
    return _.each(nodes[0], function(n) {
      return n != null ? n.setAttribute("fill", _this.series.color) : void 0;
    });
  };

  DraggableLineRenderer.prototype._bindMouseEvents = function() {
    return d3.select(this.graph.element).on("mousemove.drag", this._mouseMove).on("touchmove.drag", this._mouseMove).on("mouseup.drag", this._mouseUp).on("touchend.drag", this._mouseUp);
  };

  DraggableLineRenderer.prototype._datapointDrag = function(d) {
    this.selected = this.dragged = d;
    return this.update();
  };

  DraggableLineRenderer.prototype._mouseMove = function() {
    var p, t;
    p = d3.svg.mouse(this.graph.vis[0][0]);
    t = d3.event.changedTouches;
    if (this.dragged) {
      this.dragged.y = this.graph.y.invert(Math.max(0, Math.min(this.graph.height, p[1])));
      return this.update();
    }
  };

  DraggableLineRenderer.prototype._mouseUp = function() {
    if (this.dragged) {
      this.afterDrag(this.dragged, this.series);
    }
    $(this.graph).find('.selected').attr('class', '');
    d3.select("body").style("cursor", "auto");
    d3.select("body").style("cursor", "auto");
    if (this.dragged) {
      return this.dragged = null;
    }
  };

  DraggableLineRenderer.prototype.update = function() {
    return this.graph.update();
  };

  return DraggableLineRenderer;

})(RendererBase);

var RangeSlider,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Tactile.RangeSlider = RangeSlider = (function() {

  function RangeSlider(options) {
    this.updateGraph = __bind(this.updateGraph, this);

    var _this = this;
    this.element = options.element;
    this.graph = options.graph;
    this.timeSliderClass = options.sliderClass;
    this.updateCallback = options.updateCallback || function() {};
    this.initCallback = options.updateCallback || function() {};
    $(function() {
      var sliderContainer, values;
      values = options.values || [_this.graph.dataDomain()[0], _this.graph.dataDomain()[1]];
      _this.initCallback(values, _this.element);
      _this.updateGraph(values);
      if (_this.timeSliderClass) {
        sliderContainer = _this.element.find(_this.timeSliderClass);
      } else {
        sliderContainer = _this.element;
      }
      return sliderContainer.slider({
        range: true,
        min: _this.graph.dataDomain()[0],
        max: _this.graph.dataDomain()[1],
        values: values,
        slide: function(event, ui) {
          _this.updateGraph(ui.values);
          if (_this.graph.dataDomain()[0] === ui.values[0]) {
            _this.graph.window.xMin = void 0;
          }
          if (_this.graph.dataDomain()[1] === ui.values[1]) {
            return _this.graph.window.xMax = void 0;
          }
        }
      });
    });
    this.graph.onUpdate(function() {
      var values;
      values = $(_this.element).slider("option", "values");
      $(_this.element).slider("option", "min", _this.graph.dataDomain()[0]);
      $(_this.element).slider("option", "max", _this.graph.dataDomain()[1]);
      if (_this.graph.window.xMin === void 0) {
        values[0] = _this.graph.dataDomain()[0];
      }
      if (_this.graph.window.xMax === void 0) {
        values[1] = _this.graph.dataDomain()[1];
      }
      return $(_this.element).slider("option", "values", values);
    });
  }

  RangeSlider.prototype.updateGraph = function(values) {
    this.graph.window.xMin = values[0];
    this.graph.window.xMax = values[1];
    this.updateCallback(values, this.element);
    return this.graph.update();
  };

  return RangeSlider;

})();

var Chart;

Tactile.Chart = Chart = (function() {

  Chart.prototype._renderers = {
    'gauge': GaugeRenderer,
    'bar': BarRenderer,
    'line': LineRenderer,
    'draggableLine': DraggableLineRenderer
  };

  Chart.prototype.mainDefaults = {
    interpolation: 'monotone',
    offset: 'zero',
    min: void 0,
    max: void 0,
    order: [],
    axes: {
      x: "linear",
      y: "linear"
    }
  };

  Chart.prototype.seriesDefaults = {
    xValue: function(d) {
      return d.x;
    },
    yValue: function(d) {
      return d.y;
    },
    dataTransform: function(d) {
      return d;
    }
  };

  function Chart(args) {
    var _this = this;
    this.renderers = [];
    this.window = {};
    args = _.extend({}, this.mainDefaults, args);
    args.series = _.map(args.series, function(d) {
      return _.extend({}, _this.seriesDefaults, d);
    });
    _.each(args, function(val, key) {
      return _this[key] = val;
    });
    this.series.active = function() {
      return _this.series.filter(function(s) {
        return !s.disabled;
      });
    };
    this.updateCallbacks = [];
    this.setSize({
      width: args.width,
      height: args.height
    });
    this.vis = args.vis || d3.select(this.element).append("svg:svg").attr('width', this.width).attr('height', this.height);
    $(this.element).addClass('graph-container');
    this.initRenderers(args);
  }

  Chart.prototype.render = function() {
    var axes, stackedData,
      _this = this;
    if (this.renderers === void 0 || _.isEmpty(this.renderers)) {
      return;
    }
    stackedData = this.stackData();
    this.vis.selectAll("*").remove();
    axes = [this.findAxis(this.axes.x), this.findAxis(this.axes.y)];
    _.each(this.renderers, function(renderer) {
      _this.discoverRange(renderer);
      return renderer.render();
    });
    return this.updateCallbacks.forEach(function(callback) {
      return callback();
    });
  };

  Chart.prototype.update = function() {
    return this.render();
  };

  Chart.prototype.discoverRange = function(renderer) {
    var domain;
    domain = renderer.domain();
    if (renderer.cartesian) {
      this.x = d3.scale.linear().domain(domain.x).range([0, this.width]);
      this.y = d3.scale.linear().domain(domain.y).range([this.height, 0]);
      return this.y.magnitude = d3.scale.linear().domain([domain.y[0] - domain.y[0], domain.y[1] - domain.y[0]]).range([0, this.height]);
    }
  };

  Chart.prototype.findAxis = function(axisString) {
    switch (axisString) {
      case "linear":
        return new Tactile.AxisY({
          graph: this
        });
      case "time":
        return new Tactile.AxisTime({
          graph: this
        });
      default:
        return console.log("ERROR:" + axisString + " is not currently implemented");
    }
  };

  Chart.prototype.dataDomain = function() {
    var data;
    data = this.series[0].data;
    return [data[0].x, data.slice(-1).shift().x];
  };

  Chart.prototype.stackData = function() {
    var i, layout, seriesData, stackedData,
      _this = this;
    seriesData = this.series.active().map(function(d) {
      return _this.data.map(d.dataTransform).filter(_this._slice);
    });
    layout = d3.layout.stack();
    layout.offset(this.offset);
    stackedData = layout(seriesData);
    i = 0;
    this.series.forEach(function(series) {
      return series.stack = stackedData[i++];
    });
    return this.stackedData = stackedData;
  };

  Chart.prototype.setSize = function(args) {
    var elHeight, elWidth, _ref;
    args = args || {};
    elWidth = $(this.element).width();
    elHeight = $(this.element).height();
    this.width = args.width || elWidth;
    this.height = args.height || elHeight;
    return (_ref = this.vis) != null ? _ref.attr('width', this.width || elWidth).attr('height', this.height || elHeight) : void 0;
  };

  Chart.prototype.onUpdate = function(callback) {
    return this.updateCallbacks.push(callback);
  };

  Chart.prototype.initRenderers = function(args) {
    var _this = this;
    return _.each(this.series.active(), function(s) {
      var name, r, rendererClass, rendererOptions;
      name = s.renderer;
      if (!_this._renderers[name]) {
        throw "couldn't find renderer " + name;
      }
      rendererClass = _this._renderers[name];
      rendererOptions = _.extend({}, args, {
        graph: _this,
        series: s
      });
      r = new rendererClass(rendererOptions);
      return _this.renderers.push(r);
    });
  };

  Chart.prototype._slice = function(d) {
    var isInRange;
    if (this.window.xMin || this.window.xMax) {
      isInRange = true;
      if (this.window.xMin && d.x < this.window.xMin) {
        isInRange = false;
      }
      if (this.window.xMax && d.x > this.window.xMax) {
        isInRange = false;
      }
      return isInRange;
    }
    return true;
  };

  Chart.prototype._deg2rad = function(deg) {
    return deg * Math.PI / 180;
  };

  Chart.prototype._hasDifferentRenderers = function() {
    return _.uniq(_.map(this.series, function(s) {
      return s.renderer;
    })).length > 1;
  };

  return Chart;

})();

})();