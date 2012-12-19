/*! tactile - v0.0.1 - 2012-12-19
* https://github.com/activecell/tactile
* Copyright (c) 2012 Activecell; Licensed  */

(function (){
var Tactile = window.Tactile || {};
window.Tactile = Tactile;
var Tooltip;

Tactile.Tooltip = Tooltip = (function() {

  Tooltip._spotlightMode = false;

  Tooltip.turnOffspotlight = function() {
    return Tooltip._spotlightMode = false;
  };

  Tooltip.spotlightOn = function(d) {
    return Tooltip._spotlightMode = true;
  };

  function Tooltip(el, options) {
    this.el = el;
    this.options = options;
    this.el = d3.select(this.el);
    this.annotate();
  }

  Tooltip.prototype.appendTooltip = function() {
    var chartContainer, tip;
    chartContainer = d3.select(this.options.graph.element);
    if (Tooltip._spotlightMode && this.el.node().classList.contains("selected")) {
      tip = chartContainer.select('.tooltip');
    } else {
      chartContainer.selectAll('.tooltip').remove();
      tip = chartContainer.append('div').classed("tooltip", true);
      tip.append('div').html(this.options.text).classed("tooltip-inner", true);
    }
    return tip;
  };

  Tooltip.prototype.annotate = function() {
    var chartContainer, mouseMove, moveTip, tooltipCircleContainer,
      _this = this;
    chartContainer = this.el.node().nearestViewportElement;
    if (this.options.tooltipCircleContainer) {
      tooltipCircleContainer = this.options.tooltipCircleContainer;
    } else if (this.options.circleOnHover) {
      tooltipCircleContainer = this.el.node().parentNode;
    }
    moveTip = function(tip) {
      var center, hoveredNode;
      center = [0, 0];
      if (_this.options.placement === "mouse") {
        center = d3.mouse(_this.options.graph.element);
      } else {
        if (_this.options.position) {
          center[0] = _this.options.position[0];
          center[1] = _this.options.position[1];
        } else {
          hoveredNode = _this.el.node().getBBox();
          center[0] = hoveredNode.x + hoveredNode.width / 2;
          center[1] = hoveredNode.y;
        }
        center[0] += _this.options.graph.margin.left;
        center[0] += _this.options.graph.padding.left;
        center[1] += _this.options.graph.margin.top;
        center[1] += _this.options.graph.padding.top;
      }
      if (_this.options.displacement) {
        center[0] += _this.options.displacement[0];
        center[1] += _this.options.displacement[1];
      }
      return tip.style("left", "" + center[0] + "px").style("top", "" + center[1] + "px").style("display", "block");
    };
    this.el.on("mouseover", function() {
      var hoveredNode, inner, tip;
      if (Tooltip._spotlightMode) {
        if (!_this.el.node().classList.contains("selected")) {
          return;
        }
      }
      tip = _this.appendTooltip();
      if (_this.options.circleOnHover) {
        hoveredNode = _this.el.node().getBBox();
        d3.select(tooltipCircleContainer).append("svg:circle").attr("cx", hoveredNode.x + hoveredNode.width / 2).attr("cy", hoveredNode.y + 1).attr("r", 3).attr('class', 'tooltip-circle').attr("stroke", _this.options.circleColor || 'orange').attr("fill", 'white').attr("stroke-width", '1');
      }
      tip.classed("annotation", true).classed(_this.options.gravity, true).style("display", "none");
      if (_this.options.fade) {
        tip.classed('fade', true);
      }
      tip.append("div").attr("class", "arrow");
      tip.select('.tooltip-inner').html(_this.options.text);
      inner = function() {
        return tip.classed('in', true);
      };
      setTimeout(inner, 10);
      tip.style("display", "");
      return moveTip(tip);
    });
    mouseMove = function() {
      return d3.select(".annotation").call(moveTip.bind(this));
    };
    if (this.options.mousemove) {
      this.el.on("mousemove", mouseMove);
    }
    return this.el.on("mouseout", function() {
      var remover, tip;
      if (Tooltip._spotlightMode) {
        return;
      }
      d3.select(tooltipCircleContainer).selectAll("circle.tooltip-circle").remove();
      tip = d3.selectAll(".annotation").classed('in', false);
      remover = function() {
        return tip.remove();
      };
      return setTimeout(remover, 150);
    });
  };

  return Tooltip;

})();

d3.selection.prototype.tooltip = function(f) {
  var options, selection;
  selection = this;
  options = {};
  return selection.each(function(d, i) {
    options = f.apply(this, arguments);
    return new Tactile.Tooltip(this, options);
  });
};

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

  function AxisY(options) {
    var pixelsPerTick,
      _this = this;
    this.options = options;
    this.graph = options.graph;
    this.vis = this.graph.vis;
    this.orientation = options.orientation || "left";
    pixelsPerTick = options.pixelsPerTick || 75;
    this.ticks = options.ticks || Math.floor(this.graph.height / pixelsPerTick);
    this.tickSize = options.tickSize || 4;
    this.ticksTreatment = options.ticksTreatment || "plain";
    this.grid = options.grid;
    this.graph.onUpdate(function() {
      return _this.render();
    });
  }

  AxisY.prototype.render = function() {
    var axis, grid, gridSize, y, yAxis;
    y = this.vis.selectAll('.y-ticks').data([0]);
    y.enter().append("g").attr("class", ["y-ticks", this.ticksTreatment].join(" "));
    axis = d3.svg.axis().scale(this.graph.y).orient(this.orientation);
    axis.tickFormat(this.options.tickFormat || function(y) {
      return y;
    });
    yAxis = axis.ticks(this.ticks).tickSubdivide(0).tickSize(this.tickSize);
    y.transition(this.transitionSpeed).call(yAxis);
    if (this.grid) {
      console.log("grid");
      gridSize = (this.orientation === "right" ? 1 : -1) * this.graph.width;
      grid = this.vis.selectAll('.y-grid').data([0]);
      grid.enter().append("svg:g").attr("class", "y-grid");
      grid.transition().call(axis.ticks(this.ticks).tickSubdivide(0).tickSize(gridSize));
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
    this.ticksTreatment = args.ticksTreatment || "plain";
    this.fixedTimeUnit = args.timeUnit;
    this.marginTop = args.paddingBottom || 5;
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
    while (i <= count) {
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
    var g, tickData, ticks,
      _this = this;
    g = this.graph.vis.selectAll('.x-ticks').data([0]);
    g.enter().append('g').attr('class', 'x-ticks');
    tickData = this.tickOffsets().filter(function(tick) {
      var _ref;
      return (_this.graph.x.range()[0] <= (_ref = _this.graph.x(tick.value)) && _ref <= _this.graph.x.range()[1]);
    });
    ticks = g.selectAll('g.x-tick').data(this.tickOffsets(), function(d) {
      return d.value;
    });
    ticks.enter().append('g').attr("class", ["x-tick", this.ticksTreatment].join(' ')).attr("transform", function(d) {
      return "translate(" + (_this.graph.x(d.value)) + ", " + _this.graph.innerHeight + ")";
    }).append('text').attr("y", this.marginTop).text(function(d) {
      return d.unit.formatter(new Date(d.value * 1000));
    }).attr("class", 'title');
    ticks.transition(this.transitionSpeed).attr("transform", function(d) {
      return "translate(" + (_this.graph.x(d.value)) + ", " + _this.graph.innerHeight + ")";
    });
    return ticks.exit().remove();
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

var RendererBase,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Tactile.RendererBase = RendererBase = (function() {

  RendererBase.prototype.defaults = {
    cartesian: true,
    tension: 0.95,
    strokeWidth: 3,
    unstack: true,
    stroke: false,
    fill: false
  };

  function RendererBase(options) {
    if (options == null) {
      options = {};
    }
    this.render = __bind(this.render, this);

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
    yMin = (this.graph.min === "auto" ? d3.min(values) : this.graph.min || 0);
    yMax = this.graph.max || d3.max(values);
    return {
      x: [xMin, xMax],
      y: [yMin, yMax]
    };
  };

  RendererBase.prototype.render = function() {
    var line;
    line = this.seriesCanvas().selectAll("path").data([this.series.stack]);
    line.enter().append("svg:path").attr("clip-path", "url(#clip)").attr("fill", (this.fill ? this.series.color : "none")).attr("stroke", (this.stroke ? this.series.color : "none")).attr("stroke-width", this.strokeWidth).attr("class", "" + (this.series.className || '') + " " + (this.series.color ? '' : 'colorless'));
    if (this.transitionSpeed === 0) {
      return line.attr("d", this.seriesPathFactory());
    } else {
      return line.transition(this.transitionSpeed).attr("d", this.seriesPathFactory());
    }
  };

  RendererBase.prototype.seriesCanvas = function() {
    this._seriesCanvas || (this._seriesCanvas = this.graph.vis.selectAll("g#" + (this._nameToId())).data([this.series.stack]).enter().append("g").attr('id', this._nameToId()));
    return this._seriesCanvas;
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

  RendererBase.prototype._nameToId = function() {
    var _ref;
    return (_ref = this.series.name) != null ? _ref.replace(/\s+/g, '-').toLowerCase() : void 0;
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
    cartesian: false
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
    this.bottomOffset = 0.75;
    minAngle = -85;
    maxAngle = 85;
    angleRange = maxAngle - minAngle;
    plotValue = this.value;
    r = Math.round(this.graph.height / totalSizeDivide);
    translateWidth = this.graph.width / 2;
    translateHeight = r;
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
    this.value = this.series.stack[0].value;
    this.min = this.series.stack[0].min;
    this.max = this.series.stack[0].max;
    return [this.min, this.max];
  };

  return GaugeRenderer;

})(RendererBase);

var ColumnRenderer,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Tactile.ColumnRenderer = ColumnRenderer = (function(_super) {

  __extends(ColumnRenderer, _super);

  function ColumnRenderer() {
    this._barY = __bind(this._barY, this);

    this._barX = __bind(this._barX, this);

    this._seriesBarWidth = __bind(this._seriesBarWidth, this);

    this._edgeRatio = __bind(this._edgeRatio, this);

    this._transformMatrix = __bind(this._transformMatrix, this);
    return ColumnRenderer.__super__.constructor.apply(this, arguments);
  }

  ColumnRenderer.prototype.name = "column";

  ColumnRenderer.prototype.specificDefaults = {
    gapSize: 0.15,
    tension: null,
    round: true,
    unstack: true
  };

  ColumnRenderer.prototype.render = function() {
    var nodes,
      _this = this;
    if (this.series.disabled) {
      return;
    }
    nodes = this.seriesCanvas().selectAll("rect").data(this.series.stack);
    nodes.enter().append("svg:rect");
    nodes.attr("x", this._barX).attr("y", this._barY).attr("width", this._seriesBarWidth()).attr("height", function(d) {
      return _this.graph.y.magnitude(Math.abs(d.y));
    }).attr("transform", this._transformMatrix).attr("class", "bar " + (this.series.color ? '' : 'colorless')).attr("fill", this.series.color).attr("stroke", 'white').attr("rx", this._edgeRatio).attr("ry", this._edgeRatio);
    return this.setupTooltips();
  };

  ColumnRenderer.prototype.setupTooltips = function() {
    var _this = this;
    if (this.series.tooltip) {
      return this.seriesCanvas().selectAll("rect").tooltip(function(d, i) {
        return {
          circleColor: _this.series.color,
          graph: _this.graph,
          text: _this.series.tooltip(d),
          circleOnHover: true,
          tooltipCircleContainer: _this.graph.vis.node(),
          gravity: "right"
        };
      });
    }
  };

  ColumnRenderer.prototype.barWidth = function() {
    var barWidth, count, data;
    data = this.series.stack;
    count = data.length;
    return barWidth = this.graph.width / count * (1 - this.gapSize);
  };

  ColumnRenderer.prototype.initialize = function(options) {
    if (options == null) {
      options = {};
    }
    return this.gapSize = options.gapSize || this.gapSize;
  };

  ColumnRenderer.prototype.stackTransition = function() {
    var count, nodes, slideTransition,
      _this = this;
    this.unstack = false;
    this.graph.discoverRange(this);
    count = this.series.stack.length;
    nodes = this.seriesCanvas().selectAll("rect").data(this.series.stack);
    nodes.enter().append("svg:rect");
    slideTransition = function() {
      return _this.seriesCanvas().selectAll("rect").transition().duration(500).attr("width", _this._seriesBarWidth()).attr("x", _this._barX);
    };
    this.seriesCanvas().selectAll("rect").transition().duration(500).delay(function(d, i) {
      return (i % count) * 20;
    }).attr("y", this._barY).attr("height", function(d) {
      return _this.graph.y.magnitude(Math.abs(d.y));
    }).each('end', slideTransition);
    this.setupTooltips();
    return this.graph.updateCallbacks.forEach(function(callback) {
      return callback();
    });
  };

  ColumnRenderer.prototype.unstackTransition = function() {
    var count, growTransition,
      _this = this;
    this.unstack = true;
    this.graph.discoverRange(this);
    count = this.series.stack.length;
    growTransition = function() {
      return _this.seriesCanvas().selectAll("rect").transition().duration(500).attr("height", function(d) {
        return _this.graph.y.magnitude(Math.abs(d.y));
      }).attr("y", _this._barY);
    };
    this.seriesCanvas().selectAll("rect").transition().duration(500).delay(function(d, i) {
      return (i % count) * 20;
    }).attr("x", this._barX).attr("width", this._seriesBarWidth()).each('end', growTransition);
    this.setupTooltips();
    return this.graph.updateCallbacks.forEach(function(callback) {
      return callback();
    });
  };

  ColumnRenderer.prototype._transformMatrix = function(d) {
    var matrix;
    matrix = [1, 0, 0, (d.y < 0 ? -1 : 1), 0, (d.y < 0 ? this.graph.y.magnitude(Math.abs(d.y)) * 2 : 0)];
    return "matrix(" + matrix.join(",") + ")";
  };

  ColumnRenderer.prototype._edgeRatio = function() {
    if (this.series.round) {
      return Math.round(0.05783 * this._seriesBarWidth() + 1);
    } else {
      return 0;
    }
  };

  ColumnRenderer.prototype._seriesBarWidth = function() {
    var activeSeriesCount, barWidth, seriesBarWidth;
    barWidth = this.barWidth();
    activeSeriesCount = this.graph.series.filter(function(s) {
      return !s.disabled;
    }).length;
    return seriesBarWidth = this.unstack && !this.series.wide ? barWidth / activeSeriesCount : barWidth;
  };

  ColumnRenderer.prototype._barXOffset = function(seriesBarWidth) {
    var barXOffset, count;
    count = this.graph.renderersByType(this.name).length;
    if (count === 1 || !this.unstack) {
      return barXOffset = -seriesBarWidth / 2;
    } else {
      return barXOffset = -seriesBarWidth * count / 2;
    }
  };

  ColumnRenderer.prototype._barX = function(d) {
    var initialX, seriesBarWidth, x;
    x = this.graph.x(d.x);
    seriesBarWidth = this._seriesBarWidth();
    initialX = x + this._barXOffset(seriesBarWidth);
    if (this.unstack) {
      return initialX + (this._columnRendererIndex() * seriesBarWidth);
    } else {
      return initialX;
    }
  };

  ColumnRenderer.prototype._barY = function(d) {
    if (this.unstack) {
      return this.graph.y(Math.abs(d.y)) * (d.y < 0 ? -1 : 1);
    } else {
      return this.graph.y(d.y0 + Math.abs(d.y)) * (d.y < 0 ? -1 : 1);
    }
  };

  ColumnRenderer.prototype._columnRendererIndex = function() {
    var renderers,
      _this = this;
    if (this.rendererIndex === 0 || this.rendererIndex === void 0) {
      return 0;
    }
    renderers = this.graph.renderers.slice(0, this.rendererIndex);
    return _.filter(renderers, function(r) {
      return r.name === _this.name;
    }).length;
  };

  return ColumnRenderer;

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

  LineRenderer.prototype.dotSize = 5;

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

  LineRenderer.prototype.render = function() {
    var circ,
      _this = this;
    LineRenderer.__super__.render.call(this);
    circ = this.seriesCanvas().selectAll('circle').data(this.series.stack);
    circ.enter().append("svg:circle").attr("clip-path", "url(#scatter-clip)").attr("cx", function(d) {
      return _this.graph.x(d.x);
    }).attr("cy", function(d) {
      return _this.graph.y(d.y);
    });
    circ.transition(200).attr("cx", function(d) {
      return _this.graph.x(d.x);
    }).attr("cy", function(d) {
      return _this.graph.y(d.y);
    }).attr("r", function(d) {
      if ("r" in d) {
        return d.r;
      } else {
        return _this.dotSize;
      }
    }).attr("fill", this.series.color).attr("stroke", 'white').attr("stroke-width", '2');
    return circ.exit().remove();
  };

  return LineRenderer;

})(RendererBase);

var AreaRenderer,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Tactile.AreaRenderer = AreaRenderer = (function(_super) {

  __extends(AreaRenderer, _super);

  function AreaRenderer() {
    this._y0 = __bind(this._y0, this);
    return AreaRenderer.__super__.constructor.apply(this, arguments);
  }

  AreaRenderer.prototype.name = "area";

  AreaRenderer.prototype.dotSize = 5;

  AreaRenderer.prototype.specificDefaults = {
    unstack: true,
    fill: true,
    stroke: true
  };

  AreaRenderer.prototype._y0 = function(d) {
    if (this.unstack) {
      return 0;
    } else {
      return d.y0;
    }
  };

  AreaRenderer.prototype.seriesPathFactory = function() {
    var _this = this;
    return d3.svg.area().x(function(d) {
      return _this.graph.x(d.x);
    }).y0(function(d) {
      return _this.graph.y(_this._y0(d));
    }).y1(function(d) {
      return _this.graph.y(d.y + _this._y0(d));
    }).interpolate(this.graph.interpolation).tension(this.tension);
  };

  AreaRenderer.prototype.seriesStrokeFactory = function() {
    var _this = this;
    return d3.svg.line().x(function(d) {
      return _this.graph.x(d.x);
    }).y(function(d) {
      return _this.graph.y(d.y + _this._y0(d));
    }).interpolate(this.graph.interpolation).tension(this.tension);
  };

  AreaRenderer.prototype.render = function() {
    var _this = this;
    AreaRenderer.__super__.render.call(this);
    this.seriesCanvas().selectAll('path').style("opacity", 0.3);
    this.seriesCanvas().selectAll('path.stroke').data([this.series.stack]).enter().append("svg:path").attr('fill', 'none').attr("stroke-width", '2').attr("stroke", this.series.color).attr("d", this.seriesStrokeFactory());
    return this.seriesCanvas().selectAll('circle').data(this.series.stack).enter().append("svg:circle").attr("cx", function(d) {
      return _this.graph.x(d.x);
    }).attr("cy", function(d) {
      return _this.graph.y(d.y);
    }).attr("r", function(d) {
      if ("r" in d) {
        return d.r;
      } else {
        return _this.dotSize;
      }
    }).attr("fill", this.series.color).attr("stroke", 'white').attr("stroke-width", '2');
  };

  return AreaRenderer;

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
    this.onDrag = this.series.onDrag || function() {};
    this.dragged = null;
    this._bindMouseEvents();
    this.power = Math.pow(10, this.series.sigfigs);
    return this.setSpeed = this.transitionSpeed;
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
    var draggedNodes, nodes, _ref,
      _this = this;
    DraggableLineRenderer.__super__.render.call(this);
    if (this.series.disabled) {
      return;
    }
    nodes = this.seriesCanvas().selectAll("circle").data(this.series.stack);
    nodes.enter().append("svg:circle").on("mousedown.drag", this._datapointDrag).on("touchstart.drag", this._datapointDrag);
    nodes.attr("cx", function(d) {
      return _this.graph.x(d.x);
    }).attr("cy", function(d) {
      return _this.graph.y(d.y);
    }).attr("r", function(d) {
      if ("r" in d) {
        return d.r;
      } else {
        if (d.dragged) {
          return _this.dotSize + 1;
        } else {
          return _this.dotSize;
        }
      }
    }).attr("class", function(d) {
      return ["draggable-node", (d.dragged ? "selected" : null)].join(' ');
    }).style("cursor", "ns-resize").attr("stroke", function(d) {
      if (d.dragged) {
        return 'orange';
      } else {
        return 'white';
      }
    }).attr("stroke-width", '2');
    _.each(nodes[0], function(n) {
      return n != null ? n.setAttribute("fill", _this.series.color) : void 0;
    });
    if (((_ref = this.dragged) != null ? _ref.y : void 0) != null) {
      draggedNodes = nodes.filter(function(d, i) {
        return i === _this.dragged.i;
      });
      draggedNodes.each(function(d) {
        d.y = _this.dragged.y;
        return d.dragged = true;
      });
    }
    if (this.series.tooltip) {
      return this._initTooltips();
    }
  };

  DraggableLineRenderer.prototype._initTooltips = function() {
    var nodes,
      _this = this;
    nodes = this.seriesCanvas().selectAll("circle");
    return this.seriesCanvas().selectAll("circle").tooltip(function(d, i) {
      return {
        graph: _this.graph,
        text: _this.series.tooltip(d),
        mousemove: true,
        gravity: "right"
      };
    });
  };

  DraggableLineRenderer.prototype._bindMouseEvents = function() {
    return d3.select(this.graph.element).on("mousemove.drag", this._mouseMove).on("touchmove.drag", this._mouseMove).on("mouseup.drag", this._mouseUp).on("touchend.drag", this._mouseUp);
  };

  DraggableLineRenderer.prototype._datapointDrag = function(d, i) {
    Tactile.Tooltip.spotlightOn(d);
    this.dragged = {
      d: d,
      i: i
    };
    return this.update();
  };

  DraggableLineRenderer.prototype._mouseMove = function() {
    var inverted, p, t, value;
    this.transitionSpeed = 0;
    p = d3.svg.mouse(this.graph.vis[0][0]);
    t = d3.event.changedTouches;
    if (this.dragged) {
      inverted = this.graph.y.invert(Math.max(0, Math.min(this.graph.height, p[1])));
      value = Math.round(inverted * this.power) / this.power;
      this.dragged.y = value;
      this.onDrag(this.dragged, this.series, this.graph);
      return this.update();
    }
  };

  DraggableLineRenderer.prototype._mouseUp = function() {
    var _ref;
    if (((_ref = this.dragged) != null ? _ref.y : void 0) == null) {
      return;
    }
    if (this.dragged) {
      this.afterDrag(this.dragged.d, this.dragged.y, this.dragged.i, this.series, this.graph);
    }
    $(this.graph).find('.selected').attr('class', '');
    d3.select("body").style("cursor", "auto");
    d3.select("body").style("cursor", "auto");
    if (this.dragged) {
      this.dragged = null;
    }
    Tactile.Tooltip.turnOffspotlight();
    this.transitionSpeed = this.setSpeed;
    return this.update();
  };

  DraggableLineRenderer.prototype.update = function() {
    this.graph.update();
    return this.render();
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

var Chart,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Tactile.Chart = Chart = (function() {

  Chart.prototype._renderers = {
    'gauge': GaugeRenderer,
    'column': ColumnRenderer,
    'line': LineRenderer,
    'area': AreaRenderer,
    'draggableLine': DraggableLineRenderer
  };

  Chart.prototype.mainDefaults = {
    margin: {
      top: 20,
      right: 20,
      bottom: 20,
      left: 20
    },
    padding: {
      top: 10,
      right: 10,
      bottom: 10,
      left: 10
    },
    interpolation: 'monotone',
    offset: 'zero',
    min: void 0,
    max: void 0,
    transitionSpeed: 200,
    order: [],
    axes: {
      x: {
        dimension: "time",
        frame: [void 0, void 0]
      },
      y: {
        dimension: "linear",
        frame: [void 0, void 0]
      }
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
    this._slice = __bind(this._slice, this);

    this.discoverRange = __bind(this.discoverRange, this);

    var axes, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7,
      _this = this;
    this.renderers = [];
    this.window = {};
    this.updateCallbacks = [];
    args = _.extend({}, this.mainDefaults, args);
    args.series = _.map(args.series, function(d) {
      return _.extend({}, _this.seriesDefaults, d);
    });
    args.axes = {
      x: {
        frame: (args != null ? (_ref = args.axes) != null ? (_ref1 = _ref.x) != null ? _ref1.frame : void 0 : void 0 : void 0) || this.mainDefaults.axes.x.frame,
        dimension: (args != null ? (_ref2 = args.axes) != null ? (_ref3 = _ref2.x) != null ? _ref3.dimension : void 0 : void 0 : void 0) || this.mainDefaults.axes.x.dimension
      },
      y: {
        frame: (args != null ? (_ref4 = args.axes) != null ? (_ref5 = _ref4.y) != null ? _ref5.frame : void 0 : void 0 : void 0) || this.mainDefaults.axes.y.frame,
        dimension: (args != null ? (_ref6 = args.axes) != null ? (_ref7 = _ref6.y) != null ? _ref7.dimension : void 0 : void 0 : void 0) || this.mainDefaults.axes.y.dimension
      }
    };
    _.each(args, function(val, key) {
      return _this[key] = val;
    });
    this.series.active = function() {
      return _this.series.filter(function(s) {
        return !s.disabled;
      });
    };
    this.setSize({
      width: args.width,
      height: args.height
    });
    $(this.element).addClass('graph-container');
    this._setupCanvas();
    this.initRenderers(args);
    axes = [this.findAxis(this.axes.x), this.findAxis(this.axes.y)];
  }

  Chart.prototype.render = function() {
    var stackedData,
      _this = this;
    if (this.renderers === void 0 || _.isEmpty(this.renderers)) {
      return;
    }
    stackedData = this.stackData();
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
    var domain, rangeStart, xframe, yframe;
    domain = renderer.domain();
    if (renderer.cartesian) {
      if (this._containsColumnChart()) {
        rangeStart = this.width / renderer.series.stack.length / 2;
      }
      xframe = [(this.axes.x.frame[0] ? this.axes.x.frame[0] : domain.x[0]), (this.axes.x.frame[1] ? this.axes.x.frame[1] : domain.x[1])];
      yframe = [(this.axes.y.frame[0] ? this.axes.y.frame[0] : domain.y[0]), (this.axes.y.frame[1] ? this.axes.y.frame[1] : domain.y[1])];
      this.x = d3.scale.linear().domain(xframe).range([rangeStart || 0, this.width]);
      this.y = d3.scale.linear().domain(yframe).range([this.height, 0]);
      return this.y.magnitude = d3.scale.linear().domain([domain.y[0] - domain.y[0], domain.y[1] - domain.y[0]]).range([0, this.height]);
    }
  };

  Chart.prototype.findAxis = function(axis) {
    if (!this._allRenderersCartesian()) {
      return;
    }
    switch (axis.dimension) {
      case "linear":
        return new Tactile.AxisY(_.extend({}, axis.options, {
          graph: this
        }));
      case "time":
        return new Tactile.AxisTime(_.extend({}, axis.options, {
          graph: this
        }));
      default:
        return console.log("ERROR:" + axis.dimension + " is not currently implemented");
    }
  };

  Chart.prototype.dataDomain = function() {
    var data;
    data = this.renderers[0].series.stack;
    return [data[0].x, data.slice(-1).shift().x];
  };

  Chart.prototype.stackData = function() {
    var i, layout, seriesData, stackedData,
      _this = this;
    seriesData = this.series.active().map(function(d) {
      return _this.data.map(d.dataTransform);
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
    this.outerWidth = args.width || elWidth;
    this.outerHeight = args.height || elHeight;
    this.innerWidth = this.outerWidth - this.margin.left - this.margin.right;
    this.innerHeight = this.outerHeight - this.margin.top - this.margin.bottom;
    this.width = this.innerWidth - this.padding.left - this.padding.right;
    this.height = this.innerHeight - this.padding.top - this.padding.bottom;
    return (_ref = this.vis) != null ? _ref.attr('width', this.width).attr('height', this.height) : void 0;
  };

  Chart.prototype.onUpdate = function(callback) {
    return this.updateCallbacks.push(callback);
  };

  Chart.prototype.initRenderers = function(args) {
    var _this = this;
    return _.each(this.series.active(), function(s, index) {
      var name, r, rendererClass, rendererOptions;
      name = s.renderer;
      if (!_this._renderers[name]) {
        throw "couldn't find renderer " + name;
      }
      rendererClass = _this._renderers[name];
      rendererOptions = _.extend({}, args, {
        graph: _this,
        series: s,
        rendererIndex: index
      });
      r = new rendererClass(rendererOptions);
      return _this.renderers.push(r);
    });
  };

  Chart.prototype._setupCanvas = function() {
    this.svg = d3.select(this.element).append("svg").attr('width', this.outerWidth).attr('height', this.outerHeight);
    this.vis = this.svg.append("g").attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
    this.vis = this.vis.append("g").attr("class", "outer-canvas").attr("width", this.innerWidth).attr("height", this.innerHeight);
    this.vis = this.vis.append("g").attr("transform", "translate(" + this.padding.left + "," + this.padding.right + ")").attr("class", "inner-canvas");
    this.vis.append("clipPath").attr("id", "clip").append("rect").attr("width", this.width).attr("height", this.height + 4).attr("transform", "translate(0,-2)");
    return this.vis.append("clipPath").attr("id", "scatter-clip").append("rect").attr("width", this.width + 12).attr("height", this.height + 12).attr("transform", "translate(-6,-6)");
  };

  Chart.prototype._slice = function(d) {
    var _ref;
    if (!this._allRenderersCartesian()) {
      return true;
    }
    return (this.timeframe[0] <= (_ref = d.x) && _ref <= this.timeframe[1]);
  };

  Chart.prototype._deg2rad = function(deg) {
    return deg * Math.PI / 180;
  };

  Chart.prototype._hasDifferentRenderers = function() {
    return _.uniq(_.map(this.series, function(s) {
      return s.renderer;
    })).length > 1;
  };

  Chart.prototype._containsColumnChart = function() {
    return _.any(this.renderers, function(r) {
      return r.name === 'column';
    });
  };

  Chart.prototype._allRenderersCartesian = function() {
    return _.every(this.renderers, function(r) {
      return r.cartesian === true;
    });
  };

  Chart.prototype.renderersByType = function(name) {
    return this.renderers.filter(function(r) {
      return r.name === name;
    });
  };

  Chart.prototype.stackTransition = function() {
    return _.each(this.renderersByType('column'), function(r) {
      return r.stackTransition();
    });
  };

  Chart.prototype.unstackTransition = function() {
    return _.each(this.renderersByType('column'), function(r) {
      return r.unstackTransition();
    });
  };

  return Chart;

})();

})();