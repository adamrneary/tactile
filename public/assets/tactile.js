(function() {
  window.Tactile || (window.Tactile = {});

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Tactile.RendererBase = (function() {
  RendererBase.prototype.defaults = {
    cartesian: true,
    tension: 0.95,
    strokeWidth: 3,
    unstack: true,
    dotSize: 5,
    opacity: 1,
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
    this.utils = new Tactile.Utils();
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
      if (_this.name === "waterfall") {
        return series.forEach(function(d) {
          return values.push(d.y + d.y00);
        });
      } else {
        return series.forEach(function(d) {
          if (_this.unstack) {
            return values.push(d.y);
          } else {
            return values.push(d.y + d.y0);
          }
        });
      }
    });
    if (stackedData[0].length === 0) {
      return {
        x: [0, 0],
        y: [0, 0]
      };
    }
    xMin = stackedData[0][0].x;
    xMax = stackedData[0][stackedData[0].length - 1].x;
    yMin = (this.graph.min === "auto" ? d3.min(values) : this.graph.min || 0);
    yMax = this.graph.max || d3.max(values);
    return {
      x: [xMin, xMax],
      y: [yMin, yMax]
    };
  };

  RendererBase.prototype.yFunction = function() {
    return this.graph[this.series.yAxis];
  };

  RendererBase.prototype.render = function(transition) {
    var line;

    if (transition) {
      this.transition = transition;
    }
    if (this.series.disabled) {
      line = this.seriesCanvas().selectAll("path.line").data([this.series.stack]).remove();
      return;
    }
    line = this.seriesCanvas().selectAll("path.baseline").data([this.series.stack]);
    line.enter().append("svg:path").attr("clip-path", "url(#clip)").attr("fill", (this.fill ? this.series.color : "none")).attr("stroke", (this.stroke ? this.series.color : "none")).attr("stroke-width", this.strokeWidth).style('opacity', this.opacity).attr("class", "baseline " + (this.series.className || '') + "       " + (this.series.color ? '' : 'colorless'));
    return this.transition.selectAll("#" + (this._nameToId()) + " path.baseline").attr("d", this.seriesPathFactory());
  };

  RendererBase.prototype.seriesCanvas = function() {
    this._seriesCanvas || (this._seriesCanvas = this.graph.vis.selectAll("g#" + (this._nameToId())).data([this.series.stack]).enter().append("g").attr("clip-path", "url(#scatter-clip)").attr('id', this._nameToId()).attr('class', this.name));
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

    return (_ref = this.series.name) != null ? _ref.replace(/[^\w]/g, '-').toLowerCase() : void 0;
  };

  return RendererBase;

})();

}).call(this);

(function() {
  var _ref,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Tactile.DraggableRenderer = (function(_super) {
  __extends(DraggableRenderer, _super);

  function DraggableRenderer() {
    this.decreaseEditableValue = __bind(this.decreaseEditableValue, this);
    this.increaseEditableValue = __bind(this.increaseEditableValue, this);
    this.setActive = __bind(this.setActive, this);
    this.selectPerviousEditableValue = __bind(this.selectPerviousEditableValue, this);
    this.selectNextEditableValue = __bind(this.selectNextEditableValue, this);    _ref = DraggableRenderer.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  DraggableRenderer.prototype.initialize = function() {
    var _this = this;

    this.active = null;
    window.addEventListener("click", (function() {
      _this.active = null;
      return _this.render();
    }), true);
    window.addEventListener("keyup", function(e) {
      if (_this.id) {
        clearInterval(_this.id);
      }
      return _this.id = null;
    });
    return window.addEventListener("keydown", function(e) {
      var decrease, increase;

      switch (e.keyCode) {
        case 37:
          return _this.selectPerviousEditableValue();
        case 39:
          return _this.selectNextEditableValue();
        case 38:
          increase = function() {
            return _this.increaseEditableValue();
          };
          if (!_this.id) {
            _this.increaseEditableValue();
            if (!_this.id) {
              _this.id = setInterval(increase, 200);
            }
          }
          return e.preventDefault();
        case 40:
          decrease = function() {
            return _this.decreaseEditableValue();
          };
          if (!_this.id) {
            _this.decreaseEditableValue();
            if (!_this.id) {
              _this.id = setInterval(decrease, 200);
            }
          }
          return e.preventDefault();
      }
    });
  };

  DraggableRenderer.prototype.selectNextEditableValue = function() {
    var i, setNext;

    if (!this.active) {
      return;
    }
    setNext = false;
    i = 0;
    while (i < this.series.stack.length) {
      if (this.active === this.series.stack[i]) {
        if (this.active === this.series.stack[i]) {
          setNext = true;
        }
        i++;
        continue;
      }
      if (this.utils.ourFunctor(this.series.isEditable, this.series.stack[i], i) && setNext) {
        this.active = this.series.stack[i];
        break;
      }
      i++;
    }
    return this.render();
  };

  DraggableRenderer.prototype.selectPerviousEditableValue = function() {
    var i, setNext;

    if (!this.active) {
      return;
    }
    setNext = false;
    i = this.series.stack.length - 1;
    while (i >= 0) {
      if (this.active === this.series.stack[i]) {
        if (this.active === this.series.stack[i]) {
          setNext = true;
        }
        i--;
        continue;
      }
      if (this.utils.ourFunctor(this.series.isEditable, this.series.stack[i], i) && setNext) {
        this.active = this.series.stack[i];
        break;
      }
      i--;
    }
    return this.render();
  };

  DraggableRenderer.prototype.setActive = function(d, i) {
    if (!this.utils.ourFunctor(this.series.isEditable, d, i)) {
      return;
    }
    this.active = d;
    return this.render();
  };

  DraggableRenderer.prototype.increaseEditableValue = function() {
    console.log("increaseEditableValue");
    if (!this.active) {
      return;
    }
    this.active.y++;
    return this.render();
  };

  DraggableRenderer.prototype.decreaseEditableValue = function() {
    console.log("decreaseEditableValue");
    if (!this.active) {
      return;
    }
    this.active.y--;
    return this.render();
  };

  return DraggableRenderer;

})(Tactile.RendererBase);

}).call(this);

(function() {
  Tactile.Series = (function() {
  function Series(options) {
    var defaults,
      _this = this;

    if (options == null) {
      options = {};
    }
    defaults = {
      dataTransform: function(d) {
        return d;
      },
      yAxis: 'y'
    };
    _.defaults(options, defaults);
    _.each(options, function(val, key) {
      return _this[key] = val;
    });
  }

  Series.prototype.ofDefaultAxis = function() {
    return this.yAxis === 'y';
  };

  Series.prototype.disable = function() {
    return this.disabled = true;
  };

  Series.prototype.enable = function() {
    return this.disabled = false;
  };

  Series.prototype.toggle = function() {
    return this.disabled = !this.disabled;
  };

  return Series;

})();

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Tactile.SeriesSet = (function() {
  function SeriesSet(array, graph) {
    this.array = array != null ? array : [];
    this.graph = graph;
    this.forEach = __bind(this.forEach, this);
    this.map = __bind(this.map, this);
    this.length = __bind(this.length, this);
    this.active = __bind(this.active, this);
    this._exposeArray();
  }

  SeriesSet.prototype.active = function() {
    return this.filter(function(s) {
      return !s.disabled;
    });
  };

  SeriesSet.prototype.ofDefaultAxis = function() {
    return this.filter(function(s) {
      return s.ofDefaultAxis();
    });
  };

  SeriesSet.prototype.ofAlternateScale = function() {
    return this.filter(function(s) {
      return !s.ofDefaultAxis();
    });
  };

  SeriesSet.prototype.filter = function(f) {
    return new Tactile.SeriesSet(this.array.filter(f), this.graph);
  };

  SeriesSet.prototype.length = function() {
    return this.array.length;
  };

  SeriesSet.prototype.add = function(newSeries, overwrite) {
    if (overwrite == null) {
      overwrite = false;
    }
    if (overwrite) {
      this.array = newSeries;
      this.graph.renderers = [];
    } else {
      this.array = this.array.concat(newSeries);
    }
    return this._exposeArray();
  };

  SeriesSet.prototype._exposeArray = function() {
    var _this = this;

    return _.each(this.array, function(val, key) {
      return _this[key] = val;
    });
  };

  SeriesSet.prototype.flat = function(key) {
    var transformed,
      _this = this;

    transformed = _.flatten(this.array.map(function(s) {
      return _this.graph._data.map(s.dataTransform);
    }), true);
    return transformed.map(function(d) {
      return d[key];
    });
  };

  SeriesSet.prototype.map = function(f) {
    return this.array.map(f);
  };

  SeriesSet.prototype.forEach = function(f) {
    return this.array.forEach(f);
  };

  SeriesSet.prototype.disableAll = function() {
    return _.each(this.array, function(s) {
      return s.disable();
    });
  };

  return SeriesSet;

})();

}).call(this);

(function() {
  Tactile.Tooltip = (function() {
  Tooltip._spotlightMode = false;

  Tooltip.turnOffspotlight = function() {
    return Tooltip._spotlightMode = false;
  };

  Tooltip.spotlightOn = function(d) {
    return Tooltip._spotlightMode = true;
  };

  Tooltip.getSpotlight = function() {
    return Tooltip._spotlightMode;
  };

  function Tooltip(el, options) {
    this.el = el;
    this.options = options;
    this.el = d3.select(this.el);
    this.annotate();
  }

  Tooltip.prototype.appendTooltip = function() {
    var chartContainer, tip;

    chartContainer = d3.select(this.options.graph._element);
    if (Tooltip._spotlightMode && this.el.node().classList.contains("active")) {
      tip = chartContainer.select('.tooltip');
    } else {
      chartContainer.selectAll('.tooltip').remove();
      tip = chartContainer.append('div').classed("tooltip", true);
      tip.append('div').html(this.options.text).classed("tooltip-inner", true);
    }
    return tip;
  };

  Tooltip.prototype.annotate = function() {
    var chartContainer, mouseMove, moveTip,
      _this = this;

    chartContainer = this.el.node().nearestViewportElement;
    if (this.options.tooltipCircleContainer) {
      this.tooltipCircleContainer = this.options.tooltipCircleContainer;
    } else if (this.options.circleOnHover) {
      this.tooltipCircleContainer = this.el.node().parentNode;
    }
    moveTip = function(tip) {
      var center, hoveredNode;

      center = [0, 0];
      if (_this.options.placement === "mouse") {
        center = d3.mouse(_this.options.graph._element);
      } else {
        if (_this.options.position) {
          center[0] = _this.options.position[0];
          center[1] = _this.options.position[1];
        } else {
          hoveredNode = _this.el.node().getBoundingClientRect();
          center[0] = hoveredNode.left + hoveredNode.width / 2;
          center[1] = hoveredNode.top;
          if (_this.options.graph.series[0].renderer === "donut") {
            center[1] += hoveredNode.height / 2 - 1;
          }
        }
        if (_this.el.node().tagName === 'circle') {
          center[1] += hoveredNode.height / 2 - 1;
        }
      }
      if (_this.options.displacement) {
        center[0] += _this.options.displacement[0];
        center[1] += _this.options.displacement[1];
      }
      return tip.style("left", "" + center[0] + "px").style("top", "" + center[1] + "px").style("display", "block").style("position", "fixed");
    };
    this.el.on("mouseover", function() {
      var inner, tip;

      if (Tooltip._spotlightMode) {
        if (!_this.el.node().classList.contains("active")) {
          return;
        }
      }
      tip = _this.appendTooltip();
      if (_this.options.circleOnHover) {
        _this._appendTipCircle();
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
      d3.select(_this.tooltipCircleContainer).selectAll("circle.tooltip-circle").remove();
      if (_this.el.node().tagName === 'circle' && _this.el.attr("class").search(/active/) === -1) {
        _this.el.classed('tip-hovered', false);
        _this.el.attr('stroke', _this.el.attr('data-stroke-color'));
        _this.el.attr('fill', _this.el.attr('data-fill-color'));
      }
      tip = d3.selectAll(".annotation").classed('in', false);
      remover = function() {
        return tip.remove();
      };
      return setTimeout(remover, 150);
    });
  };

  Tooltip.prototype._appendTipCircle = function() {
    var hoveredNode, svgNode;

    hoveredNode = this.el.node().getBBox();
    svgNode = d3.select(this.options.graph._element).select('svg').node();
    if (this.el.node().tagName === 'circle') {
      if (this.el.attr("class").search(/active/) === -1) {
        if (!this.el.attr('data-stroke-color')) {
          this.el.attr('data-stroke-color', this.el.attr('stroke'));
        }
        if (!this.el.attr('data-fill-color')) {
          this.el.attr('data-fill-color', this.el.attr('fill'));
        }
        this.el.attr('fill', this.el.attr('data-stroke-color'));
        return this.el.attr('stroke', this.el.attr('data-fill-color'));
      }
    } else {
      return d3.select(this.tooltipCircleContainer).append("svg:circle").attr("cx", hoveredNode.x + svgNode.offsetLeft + hoveredNode.width / 2).attr("cy", hoveredNode.y + svgNode.offsetTop).attr("r", 4).attr('class', 'tooltip-circle').attr("stroke", this.options.circleColor || 'orange').attr("fill", 'white').attr("stroke-width", '1');
    }
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

}).call(this);

(function() {
  Tactile.Utils = (function() {
  function Utils() {}

  Utils.prototype.ourFunctor = function() {
    if (typeof arguments[0] === 'function') {
      return arguments[0].apply(null, _.toArray(arguments).slice(1));
    } else {
      return arguments[0];
    }
  };

  return Utils;

})();

}).call(this);

(function() {
  var _ref,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Tactile.AreaRenderer = (function(_super) {
  __extends(AreaRenderer, _super);

  function AreaRenderer() {
    this.unstackTransition = __bind(this.unstackTransition, this);
    this.stackTransition = __bind(this.stackTransition, this);
    this.seriesStrokeFactory = __bind(this.seriesStrokeFactory, this);
    this.seriesPathFactory = __bind(this.seriesPathFactory, this);
    this._y0 = __bind(this._y0, this);    _ref = AreaRenderer.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  AreaRenderer.prototype.name = "area";

  AreaRenderer.prototype.dotSize = 5;

  AreaRenderer.prototype.specificDefaults = {
    unstack: true,
    fill: true,
    stroke: true,
    opacity: 0.15
  };

  AreaRenderer.prototype._y0 = function(d) {
    if (this.unstack) {
      return 0;
    } else {
      return d.y0;
    }
  };

  AreaRenderer.prototype.initialize = function() {
    AreaRenderer.__super__.initialize.apply(this, arguments);
    this.dragger = new Tactile.Dragger({
      renderer: this
    });
    if (this.series.dotSize != null) {
      return this.dotSize = this.series.dotSize;
    }
  };

  AreaRenderer.prototype.seriesPathFactory = function() {
    var _this = this;

    return d3.svg.area().defined(function(d) {
      return !isNaN(d.y) && !isNaN(d.x) && !isNaN(_this._y0(d)) && (d.y != null) && (d.x != null) && (_this._y0(d) != null);
    }).x(function(d) {
      return _this.graph.x(d.x);
    }).y0(function(d) {
      return _this.yFunction()(_this._y0(d));
    }).y1(function(d) {
      return _this.yFunction()(d.y + _this._y0(d));
    }).interpolate(this.graph.interpolation).tension(this.tension);
  };

  AreaRenderer.prototype.seriesStrokeFactory = function() {
    var _this = this;

    return d3.svg.line().defined(function(d) {
      return !isNaN(d.y) && !isNaN(d.x) && !isNaN(_this._y0(d)) && (d.y != null) && (d.x != null) && (_this._y0(d) != null);
    }).x(function(d) {
      return _this.graph.x(d.x);
    }).y(function(d) {
      return _this.yFunction()(d.y + _this._y0(d));
    }).interpolate(this.graph.interpolation).tension(this.tension);
  };

  AreaRenderer.prototype.render = function(transition) {
    var circ, newCircs, stroke, _ref1, _ref2,
      _this = this;

    if (transition) {
      this.transition = transition;
    }
    AreaRenderer.__super__.render.call(this, this.transition);
    if (this.series.disabled) {
      this.seriesCanvas().selectAll("path.stroke").remove();
      this.seriesCanvas().selectAll('circle').remove();
      return;
    }
    stroke = this.seriesCanvas().selectAll('path.stroke').data([this.series.stack]);
    stroke.enter().append("svg:path").attr("clip-path", "url(#clip)").attr('class', 'stroke').attr('fill', 'none').attr("stroke-width", '2').attr("stroke", this.series.color);
    this.transition.selectAll("#" + (this._nameToId()) + " path.stroke").attr("d", this.seriesStrokeFactory());
    circ = this.seriesCanvas().selectAll('circle').data(this.series.stack);
    newCircs = circ.enter().append("svg:circle").on("click", this.setActive);
    if ((_ref1 = this.dragger) != null) {
      _ref1.makeHandlers(newCircs);
    }
    if ((_ref2 = this.dragger) != null) {
      _ref2.updateDraggedNode(circ);
    }
    this.transition.selectAll("#" + (this._nameToId()) + " circle").filter(function(d) {
      return !isNaN(d.y) && !isNaN(d.x) && !isNaN(_this._y0(d)) && (d.y != null) && (d.x != null) && (_this._y0(d) != null);
    }).attr("r", function(d) {
      if ("r" in d) {
        return d.r;
      } else {
        if (d.dragged || d === _this.active) {
          return _this.dotSize + 1;
        } else {
          return _this.dotSize;
        }
      }
    }).attr("cx", function(d) {
      return _this.graph.x(d.x);
    }).attr("cy", function(d) {
      return _this.yFunction()(d.y + _this._y0(d));
    }).attr("clip-path", "url(#scatter-clip)").attr("class", function(d, i) {
      return [(d === _this.active ? "active" : void 0), (_this.utils.ourFunctor(_this.series.isEditable, d, i) ? "editable" : void 0)].join(' ');
    }).attr("fill", function(d) {
      if (d.dragged || d === _this.active) {
        return 'white';
      } else {
        return _this.series.color;
      }
    }).attr("stroke", function(d) {
      if (d.dragged || d === _this.active) {
        return _this.series.color;
      } else {
        return 'white';
      }
    }).attr("stroke-width", this.dotSize / 2 || 2).style("cursor", function(d, i) {
      if (_this.utils.ourFunctor(_this.series.isEditable, d, i)) {
        return "ns-resize";
      } else {
        return "auto";
      }
    });
    return circ.exit().remove();
  };

  AreaRenderer.prototype.stackTransition = function(transition, transitionSpeed) {
    this.unstack = false;
    this.graph.discoverRange(this);
    return this.render(transition);
  };

  AreaRenderer.prototype.unstackTransition = function(transition, transitionSpeed) {
    this.unstack = true;
    this.graph.discoverRange(this);
    return this.render(transition);
  };

  return AreaRenderer;

})(Tactile.DraggableRenderer);

}).call(this);

(function() {
  Tactile.AxisLinear = (function() {
  function AxisLinear(options) {
    var _base, _ref;

    this.options = options;
    this.graph = options.graph;
    if ((_ref = (_base = this.options).axis) == null) {
      _base.axis = 'x';
    }
    this.horizontal = this.options.axis === 'x';
    this.ticksTreatment = options.ticksTreatment || "plain";
    this.tickSize = options.tickSize || 2;
    this.ticks = options.ticks;
    this.tickFormat = options.tickFormat || function(d) {
      return d;
    };
    this.frame = options.frame;
    this._setupForOrientation();
  }

  AxisLinear.prototype.render = function(transition) {
    var axis, className, g;

    if (this.graph[this.options.axis] == null) {
      return;
    }
    className = "" + this.options.axis + "-ticks";
    g = this.graph.vis.selectAll('.' + className).data([0]);
    g.enter().append("g").attr("class", [className, this.ticksTreatment].join(" "));
    g.attr("transform", this.translateString);
    axis = d3.svg.axis().scale(this.graph[this.options.axis]).orient(this.orientation).tickFormat(this.tickFormat).ticks(this.ticks).tickSubdivide(0).tickSize(this.tickSize);
    return transition.select('.' + className).call(axis);
  };

  AxisLinear.prototype._setupForOrientation = function() {
    var pixelsPerTick, _ref, _ref1;

    pixelsPerTick = this.options.pixelsPerTick || 75;
    if (this.horizontal) {
      this.orientation = 'bottom';
      if ((_ref = this.ticks) == null) {
        this.ticks = Math.floor(this.graph.width() / pixelsPerTick);
      }
      return this.translateString = "translate(0, " + (this.graph.height()) + ")";
    } else {
      if (this.options.axis === 'y') {
        this.orientation = 'left';
        this.translateString = "translate(0, 0)";
      } else {
        this.orientation = 'right';
        this.translateString = "translate(" + (this.graph.width()) + ", 0)";
      }
      return (_ref1 = this.ticks) != null ? _ref1 : this.ticks = Math.floor(this.graph.height() / pixelsPerTick);
    }
  };

  return AxisLinear;

})();

}).call(this);

(function() {
  Tactile.AxisTime = (function() {
  function AxisTime(args) {
    this.graph = args.graph;
    this.ticksTreatment = args.ticksTreatment || "plain";
    this.fixedTimeUnit = args.timeUnit;
    this.marginTop = args.paddingBottom || 5;
    this.time = new Tactile.FixturesTime();
    this.grid = args.grid;
    this.frame = args.frame;
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

  AxisTime.prototype.render = function(transition) {
    var g, tickData, ticks,
      _this = this;

    if (this.graph.x == null) {
      return;
    }
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
      return "translate(" + (_this.graph.x(d.value)) + ", " + _this.graph.marginedHeight + ")";
    }).append('text').attr("y", this.marginTop).text(function(d) {
      return d.unit.formatter(new Date(d.value * 1000));
    }).attr("class", 'title');
    ticks.attr("transform", function(d) {
      return "translate(" + (_this.graph.x(d.value)) + ", " + _this.graph.marginedHeight + ")";
    });
    return ticks.exit().remove();
  };

  return AxisTime;

})();

}).call(this);

// Generated by CoffeeScript 1.4.0
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Tactile.Chart = (function() {

    Chart.prototype._renderers = {
      'gauge': Tactile.GaugeRenderer,
      'column': Tactile.ColumnRenderer,
      'line': Tactile.LineRenderer,
      'area': Tactile.AreaRenderer,
      'scatter': Tactile.ScatterRenderer,
      'donut': Tactile.DonutRenderer,
      'waterfall': Tactile.WaterfallRenderer,
      'leaderboard': Tactile.LeaderboardRenderer
    };

    Chart.prototype.margin = {
      top: 20,
      right: 20,
      bottom: 20,
      left: 20
    };

    Chart.prototype.padding = {
      top: 10,
      right: 10,
      bottom: 10,
      left: 10
    };

    Chart.prototype.interpolation = 'monotone';

    Chart.prototype.offset = 'zero';

    Chart.prototype.min = void 0;

    Chart.prototype.max = void 0;

    Chart.prototype.transitionSpeed = 750;

    Chart.prototype.defaultHeight = 400;

    Chart.prototype.defaultWidth = 730;

    Chart.prototype.defaultAxesOptions = {
      x: {
        dimension: "time",
        frame: [void 0, void 0]
      },
      y: {
        dimension: "linear",
        frame: [void 0, void 0]
      },
      y1: {
        dimension: "linear",
        frame: [void 0, void 0]
      }
    };

    function Chart(args) {
      var _this = this;
      if (args == null) {
        args = {};
      }
      this._slice = __bind(this._slice, this);

      this.unstackTransition = __bind(this.unstackTransition, this);

      this.stackTransition = __bind(this.stackTransition, this);

      this.discoverRange = __bind(this.discoverRange, this);

      this.renderers = [];
      this.axesList = {};
      this.series = new Tactile.SeriesSet([], this);
      this.window = {};
      this.updateCallbacks = [];
      this.timesRendered = 0;
      this.utils = new Tactile.Utils();
      this.setSize({
        width: args.width || this.defaultWidth,
        height: args.height || this.defaultHeight
      });
      if (args.width != null) {
        delete args.width;
      }
      if (args.height != null) {
        delete args.height;
      }
      _.each(args, function(val, key) {
        return _this[key] = val;
      });
      this.addSeries(args.series, {
        overwrite: true
      });
    }

    Chart.prototype.addSeries = function(series, options) {
      var newSeries;
      if (options == null) {
        options = {
          overwrite: false
        };
      }
      if (!series) {
        return;
      }
      if (!_.isArray(series)) {
        series = [series];
      }
      newSeries = _.map(series, function(options) {
        return new Tactile.Series(options);
      });
      this.series.add(newSeries, options.overwrite);
      this.initRenderers(newSeries);
      return this;
    };

    Chart.prototype.initSeriesStackData = function(options) {
      var i, j, layout, maxLen, seriesData, stackedData, y00,
        _this = this;
      if (options == null) {
        options = {
          overwrite: false
        };
      }
      if (this.dataInitialized && !options.overwrite) {
        return;
      }
      seriesData = this.series.map(function(d) {
        return _this._data.map(d.dataTransform);
      });
      layout = d3.layout.stack();
      layout.offset(this.offset);
      stackedData = layout(seriesData);
      i = 0;
      maxLen = 0;
      while (i < stackedData.length) {
        maxLen = Math.max(maxLen, stackedData[i].length);
        i++;
      }
      i = 0;
      y00 = 0;
      while (i < maxLen) {
        j = 0;
        while (j < stackedData.length) {
          if (stackedData[j][i]) {
            if (this.utils.ourFunctor(this.series[j].fromBaseline, stackedData[j][i], i)) {
              y00 = 0;
            }
            stackedData[j][i].y00 = y00;
            y00 += stackedData[j][i].y;
          }
          j++;
        }
        i++;
      }
      i = 0;
      this.series.forEach(function(series) {
        return series.stack = stackedData[i++];
      });
      return this.dataInitialized = true;
    };

    Chart.prototype.render = function(transitionSpeed) {
      var t,
        _this = this;
      if (this.renderers === void 0 || _.isEmpty(this.renderers) || this._allSeriesDisabled()) {
        return;
      }
      this.initSeriesStackData();
      this._setupCanvas();
      this.stackData();
      transitionSpeed || (transitionSpeed = this.transitionSpeed);
      t = this.svg.transition().duration(this.timesRendered ? transitionSpeed : 0);
      _.each(this.renderers, function(renderer) {
        _this.discoverRange(renderer);
        return renderer.render(t, _this.timesRendered ? transitionSpeed : 0);
      });
      _.each(this.axesList, function(axis) {
        return axis.render(t);
      });
      this.updateCallbacks.forEach(function(callback) {
        return callback();
      });
      return this.timesRendered++;
    };

    Chart.prototype.update = function() {
      return this.render();
    };

    Chart.prototype.discoverRange = function(renderer) {
      var barWidth, domain, rangeEnd, rangeStart, xframe, yframe, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7;
      domain = renderer.domain();
      if (renderer.cartesian) {
        if (this._containsColumnChart()) {
          barWidth = this.width() / renderer.series.stack.length / 2;
          rangeStart = barWidth;
          rangeEnd = this.width() - barWidth;
        }
        xframe = [(((_ref = this.axes().x) != null ? (_ref1 = _ref.frame) != null ? _ref1[0] : void 0 : void 0) ? this.axes().x.frame[0] : domain.x[0]), (((_ref2 = this.axes().x) != null ? (_ref3 = _ref2.frame) != null ? _ref3[1] : void 0 : void 0) ? this.axes().x.frame[1] : domain.x[1])];
        yframe = [(((_ref4 = this.axes().y) != null ? (_ref5 = _ref4.frame) != null ? _ref5[0] : void 0 : void 0) ? this.axes().y.frame[0] : domain.y[0]), (((_ref6 = this.axes().y) != null ? (_ref7 = _ref6.frame) != null ? _ref7[1] : void 0 : void 0) ? this.axes().y.frame[1] : domain.y[1])];
        this.x = d3.scale.linear().domain(xframe).range([rangeStart || 0, rangeEnd || this.width()]);
        this.y = d3.scale.linear().domain(yframe).range([this.height(), 0]);
        this.y.magnitude = d3.scale.linear().domain([0, domain.y[1] - domain.y[0]]).range([0, this.height()]);
        if (!renderer.series.ofDefaultAxis()) {
          return this.y1 = d3.scale.linear().domain([0, d3.max(this.series.ofAlternateScale().flat('y'))]).range([this.height(), 0]);
        }
      }
    };

    Chart.prototype.axes = function(args) {
      var _this = this;
      if (!args) {
        return this.axesList;
      }
      _.each(['x', 'y', 'y1'], function(k) {
        var defaults;
        if (args[k] != null) {
          defaults = {
            graph: _this,
            dimension: _this.defaultAxesOptions[k].dimension,
            frame: _this.defaultAxesOptions[k].frame,
            axis: k
          };
          return _this.initAxis(_.extend(defaults, args[k]));
        }
      });
      return this;
    };

    Chart.prototype.initAxis = function(args) {
      if (!this._allRenderersCartesian()) {
        return;
      }
      switch (args.dimension) {
        case "linear":
          return this.axesList[args.axis] = new Tactile.AxisLinear(args);
        case "time":
          return this.axesList[args.axis] = new Tactile.AxisTime(args);
        default:
          return console.log("ERROR:" + args.dimension + " is not currently implemented");
      }
    };

    Chart.prototype.dataDomain = function() {
      var data;
      data = this.renderers[0].series.stack;
      return [data[0].x, data.slice(-1).shift().x];
    };

    Chart.prototype.stackData = function() {
      var defaultScaleSeriesData, i, j, layout, maxLen, y00, _results,
        _this = this;
      defaultScaleSeriesData = this.series.active().ofDefaultAxis().array.map(function(s) {
        return _this._data.map(s.dataTransform);
      });
      layout = d3.layout.stack();
      layout.offset(this.offset);
      this.stackedData = layout(defaultScaleSeriesData);
      i = 0;
      maxLen = 0;
      while (i < this.stackedData.length) {
        maxLen = Math.max(maxLen, this.stackedData[i].length);
        i++;
      }
      i = 0;
      y00 = 0;
      _results = [];
      while (i < maxLen) {
        j = 0;
        while (j < this.stackedData.length) {
          if (this.stackedData[j][i]) {
            if (this.utils.ourFunctor(this.series[j].fromBaseline, this.stackedData[j][i], i)) {
              y00 = 0;
            }
            this.stackedData[j][i].y00 = y00;
            y00 += this.stackedData[j][i].y;
          }
          j++;
        }
        _results.push(i++);
      }
      return _results;
    };

    Chart.prototype.setSize = function(args) {
      var elHeight, elWidth, _ref;
      if (args == null) {
        args = {};
      }
      elWidth = $(this._element).width();
      elHeight = $(this._element).height();
      this.outerWidth = args.width || elWidth || this.defaultWidth;
      this.outerHeight = args.height || elHeight || this.defaultHeight;
      this.marginedWidth = this.outerWidth - this.margin.left - this.margin.right;
      this.marginedHeight = this.outerHeight - this.margin.top - this.margin.bottom;
      this.innerWidth = this.marginedWidth - this.padding.left - this.padding.right;
      this.innerHeight = this.marginedHeight - this.padding.top - this.padding.bottom;
      return (_ref = this.vis) != null ? _ref.attr('width', this.innerWidth).attr('height', this.innerHeight) : void 0;
    };

    Chart.prototype.onUpdate = function(callback) {
      return this.updateCallbacks.push(callback);
    };

    Chart.prototype.initRenderers = function(series) {
      var renderersSize,
        _this = this;
      renderersSize = this.renderers.length;
      return _.each(series, function(s, index) {
        var name, r, rendererClass, rendererOptions;
        name = s.renderer;
        if (!_this._renderers[name]) {
          throw "couldn't find renderer " + name;
        }
        rendererClass = _this._renderers[name];
        rendererOptions = _.extend({}, {
          graph: _this,
          transitionSpeed: _this.transitionSpeed,
          series: s,
          rendererIndex: index + renderersSize
        });
        r = new rendererClass(rendererOptions);
        return _this.renderers.push(r);
      });
    };

    Chart.prototype.renderersByType = function(name) {
      return this.renderers.filter(function(r) {
        return r.name === name;
      });
    };

    Chart.prototype.stackTransition = function(transitionSpeed) {
      var t,
        _this = this;
      if (!transitionSpeed) {
        transitionSpeed = this.transitionSpeed;
      }
      t = this.svg.transition().duration(transitionSpeed);
      _.each(this.renderersByType('column'), function(r) {
        return r.stackTransition(t, transitionSpeed);
      });
      _.each(this.renderersByType('area'), function(r) {
        return r.stackTransition(t, transitionSpeed);
      });
      _.each(this.renderersByType('donut'), function(r) {
        return r.stackTransition(t, transitionSpeed);
      });
      return _.each(this.axesList, function(axis) {
        return axis.render(t);
      });
    };

    Chart.prototype.unstackTransition = function(transitionSpeed) {
      var t,
        _this = this;
      if (!transitionSpeed) {
        transitionSpeed = this.transitionSpeed;
      }
      t = this.svg.transition().duration(transitionSpeed);
      _.each(this.renderersByType('column'), function(r) {
        return r.unstackTransition(t, transitionSpeed);
      });
      _.each(this.renderersByType('area'), function(r) {
        return r.unstackTransition(t, transitionSpeed);
      });
      _.each(this.renderersByType('donut'), function(r) {
        return r.unstackTransition(t, transitionSpeed);
      });
      return _.each(this.axesList, function(axis) {
        return axis.render(t);
      });
    };

    Chart.prototype.element = function(val) {
      if (!val) {
        return this._element;
      }
      this._element = val;
      this._setupCanvas();
      return this;
    };

    Chart.prototype.height = function(val) {
      if (!val) {
        return this.innerHeight || this.defaultHeight;
      }
      this.setSize({
        width: this.outerWidth,
        height: val
      });
      return this;
    };

    Chart.prototype.width = function(val) {
      if (!val) {
        return this.innerWidth || this.defaultWidth;
      }
      this.setSize({
        width: val,
        height: this.outerHeight
      });
      return this;
    };

    Chart.prototype.data = function(val) {
      if (!val) {
        return this._data;
      }
      this._data = val;
      this.dataInitialized = false;
      return this;
    };

    Chart.prototype._setupCanvas = function() {
      var clip, scatterClip;
      $(this._element).addClass('graph-container');
      this.svg = this._findOrAppend({
        what: 'svg',
        "in": d3.select(this._element)
      });
      this.svg.attr('width', this.outerWidth).attr('height', this.outerHeight);
      this.vis = this._findOrAppend({
        what: 'g',
        "in": this.svg
      }).attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
      this.vis = this._findOrAppend({
        what: 'g',
        "in": this.vis
      }).attr("class", "outer-canvas").attr("width", this.marginedWidth).attr("height", this.marginedHeight);
      this.vis = this._findOrAppend({
        what: 'g',
        "in": this.vis
      }).attr("transform", "translate(" + this.padding.left + "," + this.padding.top + ")").attr("class", "inner-canvas");
      clip = this._findOrAppend({
        what: 'clipPath',
        selector: '#clip',
        "in": this.vis
      }).attr("id", "clip");
      this._findOrAppend({
        what: 'rect',
        "in": clip
      }).attr("width", this.width()).attr("height", this.height() + 4).attr("transform", "translate(0,-2)");
      scatterClip = this._findOrAppend({
        what: 'clipPath',
        selector: '#scatter-clip',
        "in": this.vis
      }).attr("id", "scatter-clip");
      return this._findOrAppend({
        what: 'rect',
        "in": scatterClip
      }).attr("width", this.width() + 12).attr("height", this.height() + 12).attr("transform", "translate(-6,-6)");
    };

    Chart.prototype._findOrAppend = function(options) {
      var element, found, node, selector;
      element = options["in"];
      node = options.what;
      selector = options.selector || node;
      found = element.select(selector);
      if (found != null ? found[0][0] : void 0) {
        return found;
      } else {
        return element.append(node);
      }
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
      return _.uniq(_.map(this.series.array, function(s) {
        return s.renderer;
      })).length > 1;
    };

    Chart.prototype._containsColumnChart = function() {
      return _.any(this.renderers, function(r) {
        return r.name === 'column' || r.name === 'waterfall';
      });
    };

    Chart.prototype._allRenderersCartesian = function() {
      return _.every(this.renderers, function(r) {
        return r.cartesian === true;
      });
    };

    Chart.prototype._allSeriesDisabled = function() {
      return _.every(this.series.array, function(s) {
        return s.disabled === true;
      });
    };

    return Chart;

  })();

}).call(this);


(function() {
  var _ref,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Tactile.ColumnRenderer = (function(_super) {
  __extends(ColumnRenderer, _super);

  function ColumnRenderer() {
    this._barY = __bind(this._barY, this);
    this._barX = __bind(this._barX, this);
    this._seriesBarWidth = __bind(this._seriesBarWidth, this);
    this._edgeRatio = __bind(this._edgeRatio, this);
    this._transformMatrix = __bind(this._transformMatrix, this);
    this.unstackTransition = __bind(this.unstackTransition, this);
    this.stackTransition = __bind(this.stackTransition, this);
    this.render = __bind(this.render, this);    _ref = ColumnRenderer.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  ColumnRenderer.prototype.name = "column";

  ColumnRenderer.prototype.specificDefaults = {
    gapSize: 0.15,
    tension: null,
    round: true,
    unstack: true
  };

  ColumnRenderer.prototype.initialize = function(options) {
    if (options == null) {
      options = {};
    }
    ColumnRenderer.__super__.initialize.apply(this, arguments);
    this.dragger = new Tactile.Dragger({
      renderer: this
    });
    return this.gapSize = options.gapSize || this.gapSize;
  };

  ColumnRenderer.prototype.render = function(transition) {
    var circ, newCircs, nodes, _ref1, _ref2, _ref3,
      _this = this;

    if (transition) {
      this.transition = transition;
    }
    if (this.series.disabled) {
      if ((_ref1 = this.dragger) != null) {
        _ref1.timesRendered = 0;
      }
      this.seriesCanvas().selectAll("rect").data(this.series.stack).remove();
      this.seriesCanvas().selectAll('circle').data(this.series.stack).remove();
      return;
    }
    nodes = this.seriesCanvas().selectAll("rect").data(this.series.stack);
    nodes.enter().append("svg:rect").attr("clip-path", "url(#clip)").on("click", this.setActive);
    this.transition.selectAll("#" + (this._nameToId()) + " rect").filter(function(d) {
      return !isNaN(d.y) && !isNaN(d.x) && !isNaN(d.y0) && (d.y != null) && (d.x != null) && (d.y0 != null);
    }).attr("height", function(d) {
      return _this.yFunction().magnitude(Math.abs(d.y));
    }).attr("y", this._barY).attr("x", this._barX).attr("width", this._seriesBarWidth()).attr("transform", this._transformMatrix).attr("fill", this.series.color).attr("stroke", 'white').attr("rx", this._edgeRatio).attr("ry", this._edgeRatio).attr("class", function(d, i) {
      return ["bar", (!_this.series.color ? "colorless" : void 0), (d === _this.active ? "active" : void 0), (_this.utils.ourFunctor(_this.series.isEditable, d, i) ? "editable" : void 0)].join(' ');
    });
    nodes.exit().remove();
    nodes.on('mouseover.show-dragging-circle', function(d, i, el) {
      var circ;

      _this.seriesCanvas().selectAll('circle:not(.active)').style('display', 'none');
      circ = _this.seriesCanvas().select("#node-" + i + "-" + d.x);
      return circ.style('display', '');
    });
    circ = this.seriesCanvas().selectAll('circle').data(this.series.stack);
    newCircs = circ.enter().append("svg:circle").on("click", this.setActive).style('display', 'none');
    if ((_ref2 = this.dragger) != null) {
      _ref2.makeHandlers(newCircs);
    }
    if ((_ref3 = this.dragger) != null) {
      _ref3.updateDraggedNode();
    }
    this.transition.selectAll("#" + (this._nameToId()) + " circle").filter(function(d) {
      return !isNaN(d.y) && !isNaN(d.x) && !isNaN(d.y0) && (d.y != null) && (d.x != null) && (d.y0 != null);
    }).attr("cx", function(d) {
      return _this._barX(d) + _this._seriesBarWidth() / 2;
    }).attr("cy", function(d) {
      return _this._barY(d);
    }).attr("r", function(d) {
      if ("r" in d) {
        return d.r;
      } else {
        if (d.dragged || d === _this.active) {
          return _this.dotSize + 1;
        } else {
          return _this.dotSize;
        }
      }
    }).attr("clip-path", "url(#scatter-clip)").attr("class", function(d, i) {
      return [(d === _this.active ? "active" : void 0), (_this.utils.ourFunctor(_this.series.isEditable, d, i) ? "editable" : void 0)].join(' ');
    }).attr("fill", function(d) {
      if (d.dragged || d === _this.active) {
        return 'white';
      } else {
        return _this.series.color;
      }
    }).attr("stroke", function(d) {
      if (d.dragged || d === _this.active) {
        return _this.series.color;
      } else {
        return 'white';
      }
    }).attr("stroke-width", 2).attr('id', function(d, i) {
      return "node-" + i + "-" + d.x;
    }).style("cursor", function(d, i) {
      if (_this.utils.ourFunctor(_this.series.isEditable, d, i)) {
        return "ns-resize";
      } else {
        return "auto";
      }
    });
    circ.exit().remove();
    if (this.series.tooltip) {
      circ.tooltip(function(d, i) {
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
          circleOnHover: false,
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
    return barWidth = this.graph.width() / count * (1 - this.gapSize);
  };

  ColumnRenderer.prototype.stackTransition = function(transition, transitionSpeed) {
    var _this = this;

    this.unstack = false;
    this.graph.discoverRange(this);
    transition.selectAll("#" + (this._nameToId()) + " rect").filter(function(d) {
      return !isNaN(d.y) && !isNaN(d.x) && !isNaN(d.y0) && (d.y != null) && (d.x != null) && (d.y0 != null);
    }).duration(transitionSpeed / 2).attr("y", this._barY).attr("height", function(d) {
      return _this.graph.y.magnitude(Math.abs(d.y));
    });
    transition.selectAll("#" + (this._nameToId()) + " circle").filter(function(d) {
      return !isNaN(d.y) && !isNaN(d.x) && !isNaN(d.y0) && (d.y != null) && (d.x != null) && (d.y0 != null);
    }).duration(transitionSpeed / 2).attr("cy", this._barY);
    transition.selectAll("#" + (this._nameToId()) + " rect").filter(function(d) {
      return !isNaN(d.y) && !isNaN(d.x) && !isNaN(d.y0) && (d.y != null) && (d.x != null) && (d.y0 != null);
    }).delay(transitionSpeed / 2).attr("width", this._seriesBarWidth()).attr("x", this._barX);
    return transition.selectAll("#" + (this._nameToId()) + " circle").filter(function(d) {
      return !isNaN(d.y) && !isNaN(d.x) && !isNaN(d.y0) && (d.y != null) && (d.x != null) && (d.y0 != null);
    }).delay(transitionSpeed / 2).attr("cx", function(d) {
      return _this._barX(d) + _this._seriesBarWidth() / 2;
    });
  };

  ColumnRenderer.prototype.unstackTransition = function(transition, transitionSpeed) {
    var _this = this;

    this.unstack = true;
    this.graph.discoverRange(this);
    transition.selectAll("#" + (this._nameToId()) + " rect").filter(function(d) {
      return !isNaN(d.y) && !isNaN(d.x) && !isNaN(d.y0) && (d.y != null) && (d.x != null) && (d.y0 != null);
    }).duration(transitionSpeed / 2).attr("x", this._barX).attr("width", this._seriesBarWidth());
    transition.selectAll("#" + (this._nameToId()) + " circle").filter(function(d) {
      return !isNaN(d.y) && !isNaN(d.x) && !isNaN(d.y0) && (d.y != null) && (d.x != null) && (d.y0 != null);
    }).duration(transitionSpeed / 2).attr("cx", function(d) {
      return _this._barX(d) + _this._seriesBarWidth() / 2;
    });
    transition.selectAll("#" + (this._nameToId()) + " rect").filter(function(d) {
      return !isNaN(d.y) && !isNaN(d.x) && !isNaN(d.y0) && (d.y != null) && (d.x != null) && (d.y0 != null);
    }).delay(transitionSpeed / 2).attr("height", function(d) {
      return _this.graph.y.magnitude(Math.abs(d.y));
    }).attr("y", this._barY);
    return transition.selectAll("#" + (this._nameToId()) + " circle").filter(function(d) {
      return !isNaN(d.y) && !isNaN(d.x) && !isNaN(d.y0) && (d.y != null) && (d.x != null) && (d.y0 != null);
    }).delay(transitionSpeed / 2).attr("cy", this._barY);
  };

  ColumnRenderer.prototype._transformMatrix = function(d) {
    var matrix;

    matrix = [1, 0, 0, (d.y < 0 ? -1 : 1), 0, (d.y < 0 ? this.yFunction().magnitude(Math.abs(d.y)) * 2 : 0)];
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
    var stackWidth, width,
      _this = this;

    if (this.series.stack.length >= 2) {
      stackWidth = this.graph.x(this.series.stack[1].x) - this.graph.x(this.series.stack[0].x);
      width = stackWidth / (1 + this.gapSize);
    } else {
      width = this.graph.width() / (1 + this.gapSize);
    }
    if (this.unstack) {
      width = width / this.graph.series.filter(function(d) {
        return d.renderer === 'column';
      }).array.length;
    }
    return width;
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
      return this.yFunction()(Math.abs(d.y)) * (d.y < 0 ? -1 : 1);
    } else {
      return this.yFunction()(d.y0 + Math.abs(d.y)) * (d.y < 0 ? -1 : 1);
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

})(Tactile.DraggableRenderer);

}).call(this);

(function() {
  var _ref,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Tactile.DonutRenderer = (function(_super) {
  var Tactile;

  __extends(DonutRenderer, _super);

  function DonutRenderer() {
    this._indexInLine = __bind(this._indexInLine, this);
    this._donutsInLine = __bind(this._donutsInLine, this);
    this._donutsCount = __bind(this._donutsCount, this);
    this._linesCount = __bind(this._linesCount, this);
    this._lineIndex = __bind(this._lineIndex, this);
    this._donutIndex = __bind(this._donutIndex, this);
    this._endAngle = __bind(this._endAngle, this);
    this._startAngle = __bind(this._startAngle, this);
    this._yOffset = __bind(this._yOffset, this);
    this._xOffset = __bind(this._xOffset, this);
    this._donutsPerLine = __bind(this._donutsPerLine, this);
    this.unstackTransition = __bind(this.unstackTransition, this);
    this.stackTransition = __bind(this.stackTransition, this);
    this.getMaxOuterRadius = __bind(this.getMaxOuterRadius, this);
    this.getMaxStackedOuterRadius = __bind(this.getMaxStackedOuterRadius, this);
    this.getStackedRadius = __bind(this.getStackedRadius, this);
    this.getOuterRadius = __bind(this.getOuterRadius, this);
    this.getInnerRadius = __bind(this.getInnerRadius, this);
    this.setupTooltips = __bind(this.setupTooltips, this);
    this.render = __bind(this.render, this);
    this.initialize = __bind(this.initialize, this);    _ref = DonutRenderer.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  Tactile = window.Tactile || {};

  DonutRenderer.prototype.name = "donut";

  DonutRenderer.prototype.specificDefaults = {
    cartesian: false,
    minMargin: 20,
    unstack: true,
    stackedInnerRadius: 200,
    stackedOuterRadius: 330,
    innerRadius: 70,
    outerRadius: 120
  };

  DonutRenderer.prototype.initialize = function() {
    if (this.series.stackedInnerRadius !== void 0) {
      this.stackedInnerRadius = this.series.stackedInnerRadius;
    }
    if (this.series.stackedOuterRadius !== void 0) {
      this.stackedOuterRadius = this.series.stackedOuterRadius;
    }
    if (this.series.innerRadius !== void 0) {
      this.innerRadius = this.series.innerRadius;
    }
    if (this.series.outerRadius !== void 0) {
      this.outerRadius = this.series.outerRadius;
    }
    if (this.series.stackedIndex !== void 0) {
      return this.stackedIndex = this.series.stackedIndex;
    }
  };

  DonutRenderer.prototype.render = function(transition, transitionSpeed) {
    var _this = this;

    if (transition) {
      this.transition = transition;
    }
    this.seriesCanvas().selectAll("donut-arc").data(this.series.stack).enter().append("path");
    this.transition.selectAll("#" + (this._nameToId()) + " path").attr("class", "donut-arc").attr("transform", "translate(" + (this._xOffset()) + "," + (this._yOffset()) + ")").attr("d", function(d, i) {
      var arc;

      return arc = d3.svg.arc().startAngle(_this._startAngle(d, i)).endAngle(_this._endAngle(d, i)).innerRadius(_this.unstack ? _this.innerRadius : _this.stackedInnerRadius).outerRadius(_this.unstack ? _this.outerRadius : _this.stackedOuterRadius)();
    }).attr("stroke", "white").attr("fill", (function(d) {
      return d.color;
    }), "stroke");
    this.seriesCanvas().append("svg:text").text(this.series.name).attr("class", "donut-label").attr("text-anchor", "middle").attr("fill", "black").attr("font-size", 15).attr("x", this._xOffset()).attr("y", this._yOffset()).attr("opacity", this.unstack ? 1 : 0);
    return this.setupTooltips();
  };

  DonutRenderer.prototype.setupTooltips = function() {
    var _this = this;

    if (this.series.tooltip) {
      return this.seriesCanvas().selectAll("path").tooltip(function(d, i) {
        return {
          color: _this.series.color,
          graph: _this.graph,
          text: _this.series.tooltip(d),
          gravity: "right",
          displacement: [-10, 0]
        };
      });
    }
  };

  DonutRenderer.prototype.getInnerRadius = function() {
    return this.innerRadius;
  };

  DonutRenderer.prototype.getOuterRadius = function() {
    return this.outerRadius;
  };

  DonutRenderer.prototype.getStackedRadius = function() {
    return this.stackedOuterRadius;
  };

  DonutRenderer.prototype.getMaxStackedOuterRadius = function() {
    var max, renderers,
      _this = this;

    max = 0;
    renderers = this.graph.renderers;
    _.filter(renderers, function(r) {
      return r.name === _this.name;
    }).forEach(function(r) {
      if (max < r.getStackedRadius()) {
        return max = r.getStackedRadius();
      }
    });
    return max;
  };

  DonutRenderer.prototype.getMaxOuterRadius = function() {
    var max,
      _this = this;

    max = 0;
    this.graph.renderers.filter(function(r) {
      return r.name === _this.name;
    }).forEach(function(r) {
      if (max < r.outerRadius) {
        return max = r.outerRadius;
      }
    });
    return max;
  };

  DonutRenderer.prototype.stackTransition = function(transition, transitionSpeed) {
    var xMargin, xOffset, yMargin, yOffset,
      _this = this;

    if (!this.unstack) {
      return;
    }
    this.unstack = false;
    xMargin = (this.graph.width() - this.getMaxStackedOuterRadius() * 2) / 2;
    yMargin = (this.graph.height() - this.getMaxStackedOuterRadius() * 2) / 2;
    xOffset = xMargin + this.getMaxStackedOuterRadius() + (this.getMaxStackedOuterRadius() - this.getMaxOuterRadius()) * Math.cos((2 * Math.PI / this._donutsCount()) * this._donutIndex() - Math.PI / 2);
    yOffset = yMargin + this.getMaxStackedOuterRadius() + (this.getMaxStackedOuterRadius() - this.getMaxOuterRadius()) * Math.sin((2 * Math.PI / this._donutsCount()) * this._donutIndex() - Math.PI / 2);
    transition.selectAll("#" + (this._nameToId()) + " path").duration(transitionSpeed / 3).attr("transform", "translate(" + xOffset + "," + yOffset + ")");
    transition.selectAll("#" + (this._nameToId()) + " text.donut-label").duration(transitionSpeed / 3).attr("x", xOffset).attr("y", yOffset);
    transition.selectAll("#" + (this._nameToId()) + " text.donut-label").delay(transitionSpeed / 3).duration(transitionSpeed / 3).attr("opacity", 0);
    return transition.selectAll("#" + (this._nameToId()) + " path").delay(transitionSpeed * 2 / 3).duration(transitionSpeed / 3).attr("transform", "translate(" + (this._xOffset()) + "," + (this._yOffset()) + ")").attrTween("d", function(d, i) {
      var iEndAngle, iInnerRadius, iOuterRadius, iStartAngle;

      iInnerRadius = d3.interpolate(_this.innerRadius, _this.stackedInnerRadius);
      iOuterRadius = d3.interpolate(_this.outerRadius, _this.stackedOuterRadius);
      iStartAngle = d3.interpolate(_this._startAngle(d, i, true), _this._startAngle(d, i, false));
      iEndAngle = d3.interpolate(_this._endAngle(d, i, true), _this._endAngle(d, i, false));
      return function(t) {
        return d3.svg.arc().startAngle(iStartAngle(t)).endAngle(iEndAngle(t)).innerRadius(iInnerRadius(t)).outerRadius(iOuterRadius(t))();
      };
    });
  };

  DonutRenderer.prototype.unstackTransition = function(transition, transitionSpeed) {
    var xMargin, xOffset, yMargin, yOffset,
      _this = this;

    if (this.unstack) {
      return;
    }
    this.unstack = true;
    xMargin = (this.graph.width() - this.getMaxStackedOuterRadius() * 2) / 2;
    yMargin = (this.graph.height() - this.getMaxStackedOuterRadius() * 2) / 2;
    xOffset = xMargin + this.getMaxStackedOuterRadius() + (this.getMaxStackedOuterRadius() - this.getMaxOuterRadius()) * Math.cos((2 * Math.PI / this._donutsCount()) * this._donutIndex(false) - Math.PI / 2);
    yOffset = yMargin + this.getMaxStackedOuterRadius() + (this.getMaxStackedOuterRadius() - this.getMaxOuterRadius()) * Math.sin((2 * Math.PI / this._donutsCount()) * this._donutIndex(false) - Math.PI / 2);
    transition.selectAll("#" + (this._nameToId()) + " path").duration(transitionSpeed / 3).attr("transform", "translate(" + xOffset + "," + yOffset + ")").attrTween("d", function(d, i) {
      var iEndAngle, iInnerRadius, iOuterRadius, iStartAngle;

      iInnerRadius = d3.interpolate(_this.stackedInnerRadius, _this.innerRadius);
      iOuterRadius = d3.interpolate(_this.stackedOuterRadius, _this.outerRadius);
      iStartAngle = d3.interpolate(_this._startAngle(d, i, false), _this._startAngle(d, i, true));
      iEndAngle = d3.interpolate(_this._endAngle(d, i, false), _this._endAngle(d, i, true));
      return function(t) {
        return d3.svg.arc().startAngle(iStartAngle(t)).endAngle(iEndAngle(t)).innerRadius(iInnerRadius(t)).outerRadius(iOuterRadius(t))();
      };
    });
    transition.selectAll("#" + (this._nameToId()) + " text.donut-label").duration(transitionSpeed / 3).attr("x", xOffset).attr("y", yOffset);
    transition.selectAll("#" + (this._nameToId()) + " text.donut-label").delay(transitionSpeed / 3).duration(transitionSpeed / 3).attr("opacity", 1);
    transition.selectAll("#" + (this._nameToId()) + " path").delay(transitionSpeed * 2 / 3).duration(transitionSpeed / 3).attr("transform", "translate(" + (this._xOffset()) + "," + (this._yOffset()) + ")");
    return transition.selectAll("#" + (this._nameToId()) + " text.donut-label").delay(transitionSpeed * 2 / 3).duration(transitionSpeed / 3).attr("x", this._xOffset()).attr("y", this._yOffset());
  };

  DonutRenderer.prototype._donutsPerLine = function() {
    return Math.floor((this.graph.width() - this.minMargin) / (this.getMaxOuterRadius() * 2 + this.minMargin));
  };

  DonutRenderer.prototype._xOffset = function() {
    var xMargin, xOffset;

    if (this.unstack) {
      xMargin = (this.graph.width() - this._donutsInLine(this._lineIndex()) * this.getMaxOuterRadius() * 2) / (this._donutsInLine(this._lineIndex()) + 1);
      return xOffset = this._indexInLine() * (xMargin + this.getMaxOuterRadius() * 2) + xMargin + this.getMaxOuterRadius();
    } else {
      xMargin = (this.graph.width() - this.getMaxStackedOuterRadius() * 2) / 2;
      return xOffset = xMargin + this.getMaxStackedOuterRadius();
    }
  };

  DonutRenderer.prototype._yOffset = function() {
    var yMargin, yOffset;

    if (this.unstack) {
      yMargin = (this.graph.height() - this._linesCount() * this.getMaxOuterRadius() * 2) / (this._linesCount() + 1);
      return yOffset = this._lineIndex() * (yMargin + this.getMaxOuterRadius() * 2) + yMargin + this.getMaxOuterRadius();
    } else {
      yMargin = (this.graph.height() - this.getMaxStackedOuterRadius() * 2) / 2;
      return yOffset = yMargin + this.getMaxStackedOuterRadius();
    }
  };

  DonutRenderer.prototype._startAngle = function(d, i, unstack) {
    var arcStartAngle, dataAmount, k, scal,
      _this = this;

    if (unstack === void 0) {
      unstack = this.unstack;
    }
    dataAmount = 0;
    this.series.stack.forEach(function(d) {
      if (!isNaN(d.val) && (d.val != null)) {
        return dataAmount += d.val;
      }
    });
    if (unstack) {
      scal = d3.scale.linear().domain([0, dataAmount]).range([0, 2 * Math.PI]);
      arcStartAngle = 0;
    } else {
      scal = d3.scale.linear().domain([0, dataAmount]).range([0, 2 * Math.PI / this._donutsCount() - 0.04]);
      arcStartAngle = (2 * Math.PI / this._donutsCount()) * this._donutIndex(unstack) - Math.PI / this._donutsCount();
    }
    k = 0;
    while (k < i) {
      if (!isNaN(this.series.stack[k].val) && (this.series.stack[k].val != null)) {
        arcStartAngle += scal(this.series.stack[k].val);
      }
      k++;
    }
    return arcStartAngle;
  };

  DonutRenderer.prototype._endAngle = function(d, i, unstack) {
    var arcEndAngle, dataAmount, k, scal,
      _this = this;

    if (unstack === void 0) {
      unstack = this.unstack;
    }
    dataAmount = 0;
    this.series.stack.forEach(function(d) {
      if (!isNaN(d.val) && (d.val != null)) {
        return dataAmount += d.val;
      }
    });
    if (unstack) {
      scal = d3.scale.linear().domain([0, dataAmount]).range([0, 2 * Math.PI]);
      arcEndAngle = 0;
    } else {
      scal = d3.scale.linear().domain([0, dataAmount]).range([0, 2 * Math.PI / this._donutsCount() - 0.04]);
      arcEndAngle = (2 * Math.PI / this._donutsCount()) * this._donutIndex(unstack) - Math.PI / this._donutsCount();
    }
    k = 0;
    while (k <= i) {
      if (!isNaN(this.series.stack[k].val) && (this.series.stack[k].val != null)) {
        arcEndAngle += scal(this.series.stack[k].val);
      }
      k++;
    }
    return arcEndAngle;
  };

  DonutRenderer.prototype._donutIndex = function(unstack) {
    var renderers,
      _this = this;

    if (unstack === void 0) {
      unstack = this.unstack;
    }
    if (unstack || (this.stackedIndex === void 0)) {
      if (this.rendererIndex === 0 || this.rendererIndex === void 0) {
        return 0;
      }
      renderers = this.graph.renderers.slice(0, this.rendererIndex);
      return _.filter(renderers, function(r) {
        return r.name === _this.name;
      }).length;
    } else {
      return this.stackedIndex;
    }
  };

  DonutRenderer.prototype._lineIndex = function() {
    return Math.floor(this._donutIndex() / this._donutsPerLine());
  };

  DonutRenderer.prototype._linesCount = function() {
    return Math.ceil(this._donutsCount() / this._donutsPerLine());
  };

  DonutRenderer.prototype._donutsCount = function() {
    var _this = this;

    return this.graph.series.filter(function(d) {
      return d.renderer === _this.name;
    }).length();
  };

  DonutRenderer.prototype._donutsInLine = function(lineIndex) {
    var lineCount;

    lineCount = Math.ceil(this._donutsCount() / this._donutsPerLine());
    if (lineIndex >= lineCount) {
      return 0;
    } else if (lineIndex === (lineCount - 1)) {
      return this._donutsCount() - lineIndex * this._donutsPerLine();
    } else {
      return this._donutsPerLine();
    }
  };

  DonutRenderer.prototype._indexInLine = function() {
    return Math.floor(this._donutIndex() - this._lineIndex() * this._donutsPerLine());
  };

  return DonutRenderer;

})(Tactile.RendererBase);

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Tactile.Dragger = (function() {
  function Dragger(args) {
    this.update = __bind(this.update, this);
    this._mouseUp = __bind(this._mouseUp, this);
    this._mouseMove = __bind(this._mouseMove, this);
    this._datapointDrag = __bind(this._datapointDrag, this);    this.renderer = args.renderer;
    this.graph = this.renderer.graph;
    this.series = this.renderer.series;
    this.drawCircles = args.circles || false;
    this.afterDrag = this.series.afterDrag || function() {};
    this.onDrag = this.series.onDrag || function() {};
    this.dragged = null;
    this._bindMouseEvents();
    this.power = this.series.sigfigs != null ? Math.pow(10, this.series.sigfigs) : 1;
    this.setSpeed = this.renderer.transitionSpeed;
    this.timesRendered = 0;
  }

  Dragger.prototype._bindMouseEvents = function() {
    return d3.select(this.graph._element).on("mousemove.drag." + this.series.name, this._mouseMove).on("touchmove.drag." + this.series.name, this._mouseMove).on("mouseup.drag." + this.series.name, this._mouseUp).on("touchend.drag." + this.series.name, this._mouseUp);
  };

  Dragger.prototype.makeHandlers = function(nodes) {
    if (this.drawCircles) {
      nodes = this._appendCircles(nodes);
    }
    return nodes.on("mousedown.drag." + this.series.name, this._datapointDrag).on("touchstart.drag." + this.series.name, this._datapointDrag);
  };

  Dragger.prototype.updateDraggedNode = function() {
    var _ref,
      _this = this;

    if (((_ref = this.dragged) != null ? _ref.y : void 0) != null) {
      return this.renderer.seriesCanvas().selectAll('circle.editable').filter(function(d, i) {
        return d === _this.dragged.d;
      }).each(function(d) {
        d.y = _this.dragged.y;
        return d.dragged = true;
      });
    }
  };

  Dragger.prototype._datapointDrag = function(d, i) {
    d = _.isArray(d) ? d[i] : d;
    if (!this.renderer.utils.ourFunctor(this.series.isEditable, d, i)) {
      return;
    }
    if (this.series.tooltip) {
      Tactile.Tooltip.spotlightOn(d);
    }
    this.dragged = {
      d: d,
      i: i,
      y: d.y,
      x: d.x
    };
    return this.update();
  };

  Dragger.prototype._mouseMove = function() {
    var hoveredNode, inverted, p, t, tip, value,
      _this = this;

    p = d3.svg.mouse(this.graph.vis.node());
    t = d3.event.changedTouches;
    if (this.dragged) {
      if (this.series.tooltip) {
        tip = d3.select(this.graph._element).select('.tooltip');
        hoveredNode = this.renderer.seriesCanvas().selectAll('circle.editable').filter(function(d, i) {
          d = _.isArray(d) ? d[i] : d;
          return d === _this.dragged.d;
        }).node().getBoundingClientRect();
        tip.style("top", "" + hoveredNode.top + "px");
      }
      this.renderer.transitionSpeed = 0;
      inverted = this.renderer.yFunction().invert(Math.max(0, Math.min(this.graph.height(), p[1])));
      value = Math.round(inverted * this.power) / this.power;
      this.dragged.y = value;
      this.onDrag(this.dragged, this.series, this.graph);
      return this.update();
    }
  };

  Dragger.prototype._mouseUp = function() {
    var _ref,
      _this = this;

    if (((_ref = this.dragged) != null ? _ref.y : void 0) == null) {
      return;
    }
    if (this.dragged) {
      this.afterDrag(this.dragged.d, this.dragged.y, this.dragged.i, this.series, this.graph);
    }
    this.renderer.seriesCanvas().selectAll('circle.editable').data(this.series.stack).attr("class", function(d) {
      d.dragged = false;
      return "editable";
    });
    d3.select("body").style("cursor", "auto");
    this.dragged = null;
    if (this.series.tooltip) {
      Tactile.Tooltip.turnOffspotlight();
    }
    this.renderer.transitionSpeed = this.setSpeed;
    return this.update();
  };

  Dragger.prototype.update = function() {
    return this.renderer.render();
  };

  Dragger.prototype._appendCircles = function(nodes) {
    var circs, renderer,
      _this = this;

    renderer = this.renderer;
    circs = this.renderer.seriesCanvas().selectAll('circle').data(this.series.stack);
    circs.enter().append("svg:circle").style('display', 'none');
    circs.attr("r", 4).attr("clip-path", "url(#scatter-clip)").attr("class", function(d, i) {
      return [(d === renderer.active ? "active" : void 0), (renderer.utils.ourFunctor(renderer.series.isEditable, d, i) ? "editable" : void 0)].join(' ');
    }).attr("fill", function(d) {
      if (d.dragged || d === renderer.active) {
        return 'white';
      } else {
        return _this.series.color;
      }
    }).attr("stroke", function(d) {
      if (d.dragged || d === renderer.active) {
        return _this.series.color;
      } else {
        return 'white';
      }
    }).attr("stroke-width", '2').attr('id', function(d, i) {
      return "node-" + i + "-" + d.x;
    }).style("cursor", function(d, i) {
      if (renderer.utils.ourFunctor(_this.series.isEditable, d, i)) {
        return "ns-resize";
      } else {
        return "auto";
      }
    });
    circs.transition().duration(this.timesRendered++ === 0 ? 0 : this.renderer.transitionSpeed).attr("cx", function(d) {
      return _this.graph.x(d.x);
    }).attr("cy", function(d) {
      return _this.graph.y(d.y);
    });
    nodes.on('mouseover.show-dragging-circle', function(d, i, el) {
      var circ;

      renderer.seriesCanvas().selectAll('circle:not(.active)').style('display', 'none');
      circ = renderer.seriesCanvas().select("#node-" + i + "-" + d.x);
      return circ.style('display', '');
    });
    circs.tooltip(function(d, i) {
      return {
        graph: _this.graph,
        text: _this.series.tooltip(d),
        circleOnHover: true,
        gravity: "right"
      };
    });
    return renderer.seriesCanvas().selectAll('circle.editable');
  };

  return Dragger;

})();

}).call(this);

(function() {
  Tactile.FixturesTime = (function() {
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

}).call(this);

(function() {
  var _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Tactile.GaugeRenderer = (function(_super) {
  __extends(GaugeRenderer, _super);

  function GaugeRenderer() {
    _ref = GaugeRenderer.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  GaugeRenderer.prototype.name = "gauge";

  GaugeRenderer.prototype.specificDefaults = {
    cartesian: false
  };

  GaugeRenderer.prototype.render = function(transition) {
    var angleRange, arcs, arcsInner, innerArc, lineData, maxAngle, minAngle, originTranslate, outerArc, pg, plotAngle, plotValue, pointer, pointerHeadLength, pointerLine, pointerTailLength, pointerWidth, r, ringInset, ringWidth, scale, totalSizeDivide, translateHeight, translateWidth;

    if (transition) {
      this.transition = transition;
    }
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
    r = Math.round(this.graph.height() / totalSizeDivide);
    translateWidth = (this.graph.width()) / 2;
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
    this.transition.selectAll(".gauge.pointer path").attr("transform", "rotate(" + plotAngle + ")");
    this.graph.vis.append("svg:circle").attr("r", this.graph.width() / 30).attr("class", "gauge pointer-circle").style("opacity", 1).attr("transform", originTranslate);
    this.graph.vis.append("svg:circle").attr("r", this.graph.width() / 90).attr('class', 'gauge pointer-nail').style("opacity", 1).attr('transform', originTranslate);
    if (this.series.labels) {
      return this.renderLabels();
    }
  };

  GaugeRenderer.prototype.renderLabels = function() {
    this.graph.vis.append("text").attr("class", "gauge label").text(this.min).attr("transform", "translate(" + (0.1 * this.graph.width()) + ",      " + (1.15 * this.graph.height() * this.bottomOffset) + ")");
    this.graph.vis.append("text").attr("class", "gauge label").text(this.value).attr("transform", "translate(" + ((this.graph.width() - this.graph.margin.right) / 1.95) + ", " + (1.20 * this.graph.height() * this.bottomOffset) + ")");
    return this.graph.vis.append("text").attr("class", "gauge label").text(this.max).attr("transform", "translate(" + (0.90 * this.graph.width()) + ",      " + (1.15 * this.graph.height() * this.bottomOffset) + ")");
  };

  GaugeRenderer.prototype.domain = function() {
    this.value = this.series.stack[0].value;
    this.min = this.series.stack[0].min;
    this.max = this.series.stack[0].max;
    return [this.min, this.max];
  };

  return GaugeRenderer;

})(Tactile.RendererBase);

}).call(this);

(function() {
  var _ref,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Tactile.LeaderboardRenderer = (function(_super) {
  __extends(LeaderboardRenderer, _super);

  function LeaderboardRenderer() {
    this._index = __bind(this._index, this);
    this._yOffset = __bind(this._yOffset, this);
    this._xOffset = __bind(this._xOffset, this);
    this.initialize = __bind(this.initialize, this);    _ref = LeaderboardRenderer.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  LeaderboardRenderer.prototype.name = "leaderboard";

  LeaderboardRenderer.prototype.specificDefaults = {
    format: d3.format("p"),
    barHeight: 40
  };

  LeaderboardRenderer.prototype.initialize = function() {
    if (this.series.format !== void 0) {
      return this.format = this.series.format;
    }
  };

  LeaderboardRenderer.prototype.render = function(transition, transitionSpeed) {
    var bars,
      _this = this;

    if (transition) {
      this.transition = transition;
    }
    bars = this.seriesCanvas().selectAll("g.leaderboard.bars").data(this.series.stack);
    bars.enter().append("svg:g").attr("class", "leaderboard bars");
    bars.exit().remove();
    this.seriesCanvas().selectAll("g.leaderboard.bars").each(function(d, i) {
      var bar, change, label, track, triangle, value;

      track = d3.select(this).selectAll("rect.leaderboard.track").data([d]);
      track.enter().append("svg:rect").attr("class", "leaderboard track");
      track.exit().remove();
      bar = d3.select(this).selectAll("rect.leaderboard.bar").data([d]);
      bar.enter().append("svg:rect").attr("class", "leaderboard bar");
      bar.exit().remove();
      label = d3.select(this).selectAll("text.leaderboard.label").data([d]);
      label.enter().append("text").attr("class", "leaderboard label");
      label.exit().remove();
      value = d3.select(this).selectAll("text.leaderboard.value").data([d]);
      value.enter().append("text").attr("class", "leaderboard value");
      value.exit().remove();
      change = d3.select(this).selectAll("text.leaderboard.change").data([d]);
      change.enter().append("text").attr("class", "leaderboard change");
      change.exit().remove();
      triangle = d3.select(this).selectAll("path").data([d]);
      triangle.enter().append("svg:path");
      triangle.exit().remove();
      return triangle;
    });
    this.transition.selectAll("#" + (this._nameToId()) + " rect.leaderboard.track").filter(function(d) {
      return !isNaN(d.value) && !isNaN(d.change) && !isNaN(d.barPosition) && (d.label != null) && (d.value != null) && (d.change != null) && (d.barPosition != null);
    }).duration(transitionSpeed / 2).attr("width", this.graph.width()).attr("height", 6).attr("rx", 4).attr("ry", 4);
    this.transition.selectAll("#" + (this._nameToId()) + " rect.leaderboard.bar").filter(function(d) {
      return !isNaN(d.value) && !isNaN(d.change) && !isNaN(d.barPosition) && (d.label != null) && (d.value != null) && (d.change != null) && (d.barPosition != null);
    }).duration(transitionSpeed / 2).attr("height", 6).attr("width", function(d) {
      return _this.graph.width() * d.barPosition;
    }).attr("rx", 4).attr("ry", 4);
    this.transition.selectAll("#" + (this._nameToId()) + " text.leaderboard.label").filter(function(d) {
      return !isNaN(d.value) && !isNaN(d.change) && !isNaN(d.barPosition) && (d.label != null) && (d.value != null) && (d.change != null) && (d.barPosition != null);
    }).duration(transitionSpeed / 2).text(function(d) {
      return d.label;
    }).attr("transform", "translate(3 -8)");
    this.transition.selectAll("#" + (this._nameToId()) + " text.leaderboard.value").filter(function(d) {
      return !isNaN(d.value) && !isNaN(d.change) && !isNaN(d.barPosition) && (d.label != null) && (d.value != null) && (d.change != null) && (d.barPosition != null);
    }).duration(transitionSpeed / 2).tween("text", function(d) {
      var i;

      i = d3.interpolate(this.textContent, d.value);
      return function(t) {
        return this.textContent = _this.format(Math.floor(i(t)));
      };
    }).attr("text-anchor", "end").attr("transform", "translate(" + (this.graph.width() - 50) + " -8)");
    this.transition.selectAll("#" + (this._nameToId()) + " text.leaderboard.change").filter(function(d) {
      return !isNaN(d.value) && !isNaN(d.change) && !isNaN(d.barPosition) && (d.label != null) && (d.value != null) && (d.change != null) && (d.barPosition != null);
    }).duration(transitionSpeed / 2).tween("text", function(d) {
      var i;

      i = d3.interpolate(this.textContent, d.change);
      return function(t) {
        return this.textContent = _this.format(Math.floor(i(t)));
      };
    }).attr("text-anchor", "end").attr("transform", "translate(" + (this.graph.width()) + " -8)");
    this.transition.selectAll("#" + (this._nameToId()) + " path").filter(function(d) {
      return !isNaN(d.value) && !isNaN(d.change) && !isNaN(d.barPosition) && (d.label != null) && (d.value != null) && (d.change != null) && (d.barPosition != null);
    }).duration(transitionSpeed / 2).attr("d", d3.svg.symbol().size(18).type(function(d) {
      if (d.change > 0) {
        return "triangle-up";
      } else if (d.change < 0) {
        return "triangle-down";
      }
    })).attr("class", function(d) {
      if (d.change > 0) {
        return "triangle-up";
      } else if (d.change < 0) {
        return "triangle-down";
      }
    });
    this.transition.selectAll("#" + (this._nameToId()) + " rect.leaderboard.track").filter(function(d) {
      return !isNaN(d.value) && !isNaN(d.change) && !isNaN(d.barPosition) && (d.label != null) && (d.value != null) && (d.change != null) && (d.barPosition != null);
    }).delay(transitionSpeed / 2).duration(transitionSpeed / 2).attr("y", this._yOffset);
    this.transition.selectAll("#" + (this._nameToId()) + " rect.leaderboard.bar").filter(function(d) {
      return !isNaN(d.value) && !isNaN(d.change) && !isNaN(d.barPosition) && (d.label != null) && (d.value != null) && (d.change != null) && (d.barPosition != null);
    }).delay(transitionSpeed / 2).duration(transitionSpeed / 2).attr("y", this._yOffset);
    this.transition.selectAll("#" + (this._nameToId()) + " text.leaderboard.label").filter(function(d) {
      return !isNaN(d.value) && !isNaN(d.change) && !isNaN(d.barPosition) && (d.label != null) && (d.value != null) && (d.change != null) && (d.barPosition != null);
    }).delay(transitionSpeed / 2).duration(transitionSpeed / 2).attr("y", this._yOffset);
    this.transition.selectAll("#" + (this._nameToId()) + " text.leaderboard.value").filter(function(d) {
      return !isNaN(d.value) && !isNaN(d.change) && !isNaN(d.barPosition) && (d.label != null) && (d.value != null) && (d.change != null) && (d.barPosition != null);
    }).delay(transitionSpeed / 2).duration(transitionSpeed / 2).attr("y", this._yOffset);
    this.transition.selectAll("#" + (this._nameToId()) + " text.leaderboard.change").filter(function(d) {
      return !isNaN(d.value) && !isNaN(d.change) && !isNaN(d.barPosition) && (d.label != null) && (d.value != null) && (d.change != null) && (d.barPosition != null);
    }).delay(transitionSpeed / 2).duration(transitionSpeed / 2).attr("y", this._yOffset);
    return this.transition.selectAll("#" + (this._nameToId()) + " path").filter(function(d) {
      return !isNaN(d.value) && !isNaN(d.change) && !isNaN(d.barPosition) && (d.label != null) && (d.value != null) && (d.change != null) && (d.barPosition != null);
    }).delay(transitionSpeed / 2).duration(transitionSpeed / 2).attr("transform", function(d, i) {
      return ("translate(" + (_this.graph.width() - 10) + ",") + (_this._yOffset(d, i) - 22) + ")";
    });
  };

  LeaderboardRenderer.prototype._xOffset = function() {};

  LeaderboardRenderer.prototype._yOffset = function(d, i) {
    var yMargin;

    yMargin = (this.graph.height() - this.series.stack.length * this.barHeight) / (this.series.stack.length + 1);
    return yMargin + (this.barHeight + yMargin) * this._index(d, i);
  };

  LeaderboardRenderer.prototype._index = function(d, i) {
    if (!isNaN(d.index) && (d.index != null)) {
      return d.index;
    } else {
      return i;
    }
  };

  return LeaderboardRenderer;

})(Tactile.RendererBase);

}).call(this);

(function() {
  var _ref,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Tactile.LineRenderer = (function(_super) {
  __extends(LineRenderer, _super);

  function LineRenderer() {
    this.render = __bind(this.render, this);    _ref = LineRenderer.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  LineRenderer.prototype.name = "line";

  LineRenderer.prototype.specificDefaults = {
    unstack: true,
    fill: false,
    stroke: true,
    dotSize: 5
  };

  LineRenderer.prototype.seriesPathFactory = function() {
    var _this = this;

    return d3.svg.line().defined(function(d) {
      return !isNaN(d.y) && !isNaN(d.x) && (d.y != null) && (d.x != null);
    }).x(function(d) {
      return _this.graph.x(d.x);
    }).y(function(d) {
      return _this.yFunction()(d.y);
    }).interpolate(this.graph.interpolation).tension(this.tension);
  };

  LineRenderer.prototype.initialize = function() {
    LineRenderer.__super__.initialize.apply(this, arguments);
    this.dragger = new Tactile.Dragger({
      renderer: this
    });
    if (this.series.dotSize != null) {
      return this.dotSize = this.series.dotSize;
    }
  };

  LineRenderer.prototype.render = function(transition) {
    var circ, newCircs, _ref1, _ref2,
      _this = this;

    if (transition) {
      this.transition = transition;
    }
    LineRenderer.__super__.render.call(this, this.transition);
    if (this.series.disabled) {
      this.seriesCanvas().selectAll('circle').data(this.series.stack).remove();
      return;
    }
    circ = this.seriesCanvas().selectAll('circle').data(this.series.stack);
    newCircs = circ.enter().append("svg:circle").on("click", this.setActive);
    if ((_ref1 = this.dragger) != null) {
      _ref1.makeHandlers(newCircs);
    }
    if ((_ref2 = this.dragger) != null) {
      _ref2.updateDraggedNode();
    }
    this.transition.selectAll("#" + (this._nameToId()) + " circle").filter(function(d) {
      return !isNaN(d.y) && !isNaN(d.x) && (d.y != null) && (d.x != null);
    }).attr("cx", function(d) {
      return _this.graph.x(d.x);
    }).attr("cy", function(d) {
      return _this.yFunction()(d.y);
    }).attr("r", function(d) {
      if ("r" in d) {
        return d.r;
      } else {
        if (d.dragged || d === _this.active) {
          return _this.dotSize + 1;
        } else {
          return _this.dotSize;
        }
      }
    }).attr("clip-path", "url(#scatter-clip)").attr("class", function(d, i) {
      return [(d === _this.active ? "active" : void 0), (_this.utils.ourFunctor(_this.series.isEditable, d, i) ? "editable" : void 0)].join(' ');
    }).attr("fill", function(d) {
      if (d.dragged || d === _this.active) {
        return 'white';
      } else {
        return _this.series.color;
      }
    }).attr("stroke", function(d) {
      if (d.dragged || d === _this.active) {
        return _this.series.color;
      } else {
        return 'white';
      }
    }).attr("stroke-width", this.dotSize / 2 || 2).style("cursor", function(d, i) {
      if (_this.utils.ourFunctor(_this.series.isEditable, d, i)) {
        return "ns-resize";
      } else {
        return "auto";
      }
    });
    circ.exit().remove();
    if (this.series.tooltip) {
      return circ.tooltip(function(d, i) {
        return {
          circleColor: _this.series.color,
          graph: _this.graph,
          text: _this.series.tooltip(d),
          circleOnHover: true,
          gravity: "right"
        };
      });
    }
  };

  return LineRenderer;

})(Tactile.DraggableRenderer);

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Tactile.RangeSlider = (function() {
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

}).call(this);

(function() {
  var _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Tactile.ScatterRenderer = (function(_super) {
  __extends(ScatterRenderer, _super);

  function ScatterRenderer() {
    _ref = ScatterRenderer.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  ScatterRenderer.prototype.name = "scatter";

  ScatterRenderer.prototype.specificDefaults = {
    fill: true,
    stroke: false
  };

  ScatterRenderer.prototype.render = function(transition) {
    var circ,
      _this = this;

    if (transition) {
      this.transition = transition;
    }
    circ = this.seriesCanvas().selectAll('circle').data(this.series.stack);
    circ.enter().append("svg:circle");
    this.transition.selectAll("#" + (this._nameToId()) + " circle").filter(function(d) {
      return !isNaN(d.y) && !isNaN(d.x) && !isNaN(d.r) && (d.y != null) && (d.x != null) && (d.r != null);
    }).attr("r", function(d) {
      if ("r" in d) {
        return d.r;
      } else {
        return _this.dotSize;
      }
    }).attr("cx", function(d) {
      return _this.graph.x(d.x);
    }).attr("cy", function(d) {
      return _this.yFunction()(d.y);
    }).attr("r", function(d) {
      if ("r" in d) {
        return d.r;
      } else {
        return _this.dotSize;
      }
    }).attr("fill", this.series.color).attr("stroke", 'white').attr("stroke-width", '2');
    if (this.series.cssConditions) {
      circ.attr('class', function(d) {
        return _this.series.cssConditions(d);
      });
    }
    if (this.series.tooltip) {
      this.seriesCanvas().selectAll("circle").tooltip(function(d, i) {
        return {
          graph: _this.graph,
          text: _this.series.tooltip(d),
          mousemove: true,
          gravity: "right",
          displacement: [-10, 0]
        };
      });
    }
    return circ.exit().remove();
  };

  return ScatterRenderer;

})(Tactile.RendererBase);

}).call(this);

(function() {
  var _ref,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Tactile.WaterfallRenderer = (function(_super) {
  __extends(WaterfallRenderer, _super);

  function WaterfallRenderer() {
    this._barY = __bind(this._barY, this);
    this._barX = __bind(this._barX, this);
    this._seriesBarWidth = __bind(this._seriesBarWidth, this);
    this._edgeRatio = __bind(this._edgeRatio, this);
    this._transformMatrix = __bind(this._transformMatrix, this);
    this.render = __bind(this.render, this);    _ref = WaterfallRenderer.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  WaterfallRenderer.prototype.name = "waterfall";

  WaterfallRenderer.prototype.specificDefaults = {
    gapSize: 0.15,
    round: true,
    unstack: true
  };

  WaterfallRenderer.prototype.initialize = function(options) {
    if (options == null) {
      options = {};
    }
    return this.gapSize = options.gapSize || this.gapSize;
  };

  WaterfallRenderer.prototype.render = function(transition) {
    var line, nodes, _ref1,
      _this = this;

    if (transition) {
      this.transition = transition;
    }
    if (this.series.disabled) {
      if ((_ref1 = this.dragger) != null) {
        _ref1.timesRendered = 0;
      }
      this.seriesCanvas().selectAll("rect").data(this.series.stack).remove();
      return;
    }
    nodes = this.seriesCanvas().selectAll("rect").data(this.series.stack);
    nodes.enter().append("svg:rect").attr("clip-path", "url(#clip)").on("click", this.setActive);
    this.transition.selectAll("#" + (this._nameToId()) + " rect").filter(function(d) {
      return !isNaN(d.y) && !isNaN(d.x) && !isNaN(d.y00) && (d.y != null) && (d.x != null) && (d.y00 != null);
    }).attr("height", function(d) {
      return _this.graph.y.magnitude(Math.abs(d.y));
    }).attr("y", this._barY).attr("x", this._barX).attr("width", this._seriesBarWidth() / (1 + this.gapSize)).attr("transform", this._transformMatrix).attr("fill", this.series.color).attr("stroke", "white").attr("rx", this._edgeRatio).attr("ry", this._edgeRatio);
    nodes.exit().remove();
    line = this.seriesCanvas().selectAll("line").data(this.series.stack);
    line.enter().append("svg:line").attr("clip-path", "url(#clip)");
    this.transition.selectAll("#" + (this._nameToId()) + " line").filter(function(d) {
      return !isNaN(d.y) && !isNaN(d.x) && !isNaN(d.y00) && (d.y != null) && (d.x != null) && (d.y00 != null);
    }).attr("x1", this._barX).attr("x2", function(d, i) {
      var gapCount;

      gapCount = _this.graph.series.filter(function(d) {
        return d.renderer === 'waterfall';
      }).length();
      return _this._barX(d, i) - (_this._waterfalRendererIndex() === 0 ? _this._seriesBarWidth() * _this.gapSize * gapCount : _this._seriesBarWidth() * _this.gapSize);
    }).attr("y1", function(d) {
      return _this._barY(d) + (d.y > 0 ? _this.graph.y.magnitude(Math.abs(d.y)) : 0);
    }).attr("y2", function(d) {
      return _this._barY(d) + (d.y > 0 ? _this.graph.y.magnitude(Math.abs(d.y)) : 0);
    }).attr("stroke", "#BEBEBE").attr("stroke-width", function(d, i) {
      if ((_this._waterfalRendererIndex() === 0 && i === 0) || (_this.utils.ourFunctor(_this.series.fromBaseline, d, i))) {
        return 0;
      } else {
        return 1;
      }
    });
    return this.setupTooltips();
  };

  WaterfallRenderer.prototype.setupTooltips = function() {
    var _this = this;

    if (this.series.tooltip) {
      return this.seriesCanvas().selectAll("rect").tooltip(function(d, i) {
        return {
          circleColor: _this.series.color,
          graph: _this.graph,
          text: _this.series.tooltip(d),
          circleOnHover: false,
          tooltipCircleContainer: _this.graph.vis.node(),
          gravity: "right"
        };
      });
    }
  };

  WaterfallRenderer.prototype.barWidth = function() {
    var barWidth, count, data;

    data = this.series.stack;
    count = data.length;
    return barWidth = this.graph.width() / count * (1 - this.gapSize);
  };

  WaterfallRenderer.prototype._transformMatrix = function(d) {
    var matrix;

    matrix = [1, 0, 0, (d.y + d.y00 < 0 ? -1 : 1), 0, (d.y + d.y00 < 0 ? this.graph.y.magnitude(Math.abs(d.y + d.y00)) * 2 : 0)];
    return "matrix(" + matrix.join(",") + ")";
  };

  WaterfallRenderer.prototype._edgeRatio = function() {
    if (this.series.round) {
      return Math.round(0.05783 * this._seriesBarWidth() + 1);
    } else {
      return 0;
    }
  };

  WaterfallRenderer.prototype._seriesBarWidth = function() {
    var stackWidth, width,
      _this = this;

    if (this.series.stack.length >= 2) {
      stackWidth = this.graph.x(this.series.stack[1].x) - this.graph.x(this.series.stack[0].x);
      width = stackWidth / (1 + this.gapSize);
    } else {
      width = this.graph.width() / (1 + this.gapSize);
    }
    return width = width / this.graph.series.filter(function(d) {
      return d.renderer === 'waterfall';
    }).length();
  };

  WaterfallRenderer.prototype._barXOffset = function(seriesBarWidth) {
    var barXOffset, count;

    count = this.graph.renderersByType(this.name).length;
    return barXOffset = -seriesBarWidth * count / 2;
  };

  WaterfallRenderer.prototype._barX = function(d) {
    var initialX, seriesBarWidth, x;

    x = this.graph.x(d.x);
    seriesBarWidth = this._seriesBarWidth();
    initialX = x + this._barXOffset(seriesBarWidth);
    return initialX + (this._waterfalRendererIndex() * seriesBarWidth);
  };

  WaterfallRenderer.prototype._barY = function(d, i) {
    if (d.y > 0) {
      return this.graph.y(Math.abs(d.y + d.y00)) * (d.y + d.y00 < 0 ? -1 : 1);
    } else {
      return this.graph.y(Math.abs(d.y00)) * (d.y00 < 0 ? -1 : 1);
    }
  };

  WaterfallRenderer.prototype._waterfalRendererIndex = function() {
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

  return WaterfallRenderer;

})(Tactile.RendererBase);

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Tactile.Chart = (function() {
  Chart.prototype._renderers = {
    'gauge': Tactile.GaugeRenderer,
    'column': Tactile.ColumnRenderer,
    'line': Tactile.LineRenderer,
    'area': Tactile.AreaRenderer,
    'scatter': Tactile.ScatterRenderer,
    'donut': Tactile.DonutRenderer,
    'waterfall': Tactile.WaterfallRenderer,
    'leaderboard': Tactile.LeaderboardRenderer
  };

  Chart.prototype.margin = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20
  };

  Chart.prototype.padding = {
    top: 10,
    right: 10,
    bottom: 10,
    left: 10
  };

  Chart.prototype.interpolation = 'monotone';

  Chart.prototype.offset = 'zero';

  Chart.prototype.min = void 0;

  Chart.prototype.max = void 0;

  Chart.prototype.transitionSpeed = 750;

  Chart.prototype.defaultHeight = 400;

  Chart.prototype.defaultWidth = 730;

  Chart.prototype.defaultAxesOptions = {
    x: {
      dimension: "time",
      frame: [void 0, void 0]
    },
    y: {
      dimension: "linear",
      frame: [void 0, void 0]
    },
    y1: {
      dimension: "linear",
      frame: [void 0, void 0]
    }
  };

  function Chart(args) {
    var _this = this;

    if (args == null) {
      args = {};
    }
    this._slice = __bind(this._slice, this);
    this.unstackTransition = __bind(this.unstackTransition, this);
    this.stackTransition = __bind(this.stackTransition, this);
    this.discoverRange = __bind(this.discoverRange, this);
    this.renderers = [];
    this.axesList = {};
    this.series = new Tactile.SeriesSet([], this);
    this.window = {};
    this.updateCallbacks = [];
    this.timesRendered = 0;
    this.utils = new Tactile.Utils();
    this.setSize({
      width: args.width || this.defaultWidth,
      height: args.height || this.defaultHeight
    });
    if (args.width != null) {
      delete args.width;
    }
    if (args.height != null) {
      delete args.height;
    }
    _.each(args, function(val, key) {
      return _this[key] = val;
    });
    this.addSeries(args.series, {
      overwrite: true
    });
  }

  Chart.prototype.addSeries = function(series, options) {
    var newSeries;

    if (options == null) {
      options = {
        overwrite: false
      };
    }
    if (!series) {
      return;
    }
    if (!_.isArray(series)) {
      series = [series];
    }
    newSeries = _.map(series, function(options) {
      return new Tactile.Series(options);
    });
    this.series.add(newSeries, options.overwrite);
    this.initRenderers(newSeries);
    return this;
  };

  Chart.prototype.initSeriesStackData = function(options) {
    var i, j, layout, maxLen, seriesData, stackedData, y00,
      _this = this;

    if (options == null) {
      options = {
        overwrite: false
      };
    }
    if (this.dataInitialized && !options.overwrite) {
      return;
    }
    seriesData = this.series.map(function(d) {
      return _this._data.map(d.dataTransform);
    });
    layout = d3.layout.stack();
    layout.offset(this.offset);
    stackedData = layout(seriesData);
    i = 0;
    maxLen = 0;
    while (i < stackedData.length) {
      maxLen = Math.max(maxLen, stackedData[i].length);
      i++;
    }
    i = 0;
    y00 = 0;
    while (i < maxLen) {
      j = 0;
      while (j < stackedData.length) {
        if (stackedData[j][i]) {
          if (this.utils.ourFunctor(this.series[j].fromBaseline, stackedData[j][i], i)) {
            y00 = 0;
          }
          stackedData[j][i].y00 = y00;
          y00 += stackedData[j][i].y;
        }
        j++;
      }
      i++;
    }
    i = 0;
    this.series.forEach(function(series) {
      return series.stack = stackedData[i++];
    });
    return this.dataInitialized = true;
  };

  Chart.prototype.render = function(transitionSpeed) {
    var t,
      _this = this;

    if (this.renderers === void 0 || _.isEmpty(this.renderers) || this._allSeriesDisabled()) {
      return;
    }
    this.initSeriesStackData();
    this._setupCanvas();
    this.stackData();
    transitionSpeed || (transitionSpeed = this.transitionSpeed);
    t = this.svg.transition().duration(this.timesRendered ? transitionSpeed : 0);
    _.each(this.renderers, function(renderer) {
      _this.discoverRange(renderer);
      return renderer.render(t, _this.timesRendered ? transitionSpeed : 0);
    });
    _.each(this.axesList, function(axis) {
      return axis.render(t);
    });
    this.updateCallbacks.forEach(function(callback) {
      return callback();
    });
    return this.timesRendered++;
  };

  Chart.prototype.update = function() {
    return this.render();
  };

  Chart.prototype.discoverRange = function(renderer) {
    var barWidth, domain, rangeEnd, rangeStart, xframe, yframe, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7;

    domain = renderer.domain();
    if (renderer.cartesian) {
      if (this._containsColumnChart()) {
        barWidth = this.width() / renderer.series.stack.length / 2;
        rangeStart = barWidth;
        rangeEnd = this.width() - barWidth;
      }
      xframe = [(((_ref = this.axes().x) != null ? (_ref1 = _ref.frame) != null ? _ref1[0] : void 0 : void 0) ? this.axes().x.frame[0] : domain.x[0]), (((_ref2 = this.axes().x) != null ? (_ref3 = _ref2.frame) != null ? _ref3[1] : void 0 : void 0) ? this.axes().x.frame[1] : domain.x[1])];
      yframe = [(((_ref4 = this.axes().y) != null ? (_ref5 = _ref4.frame) != null ? _ref5[0] : void 0 : void 0) ? this.axes().y.frame[0] : domain.y[0]), (((_ref6 = this.axes().y) != null ? (_ref7 = _ref6.frame) != null ? _ref7[1] : void 0 : void 0) ? this.axes().y.frame[1] : domain.y[1])];
      this.x = d3.scale.linear().domain(xframe).range([rangeStart || 0, rangeEnd || this.width()]);
      this.y = d3.scale.linear().domain(yframe).range([this.height(), 0]);
      this.y.magnitude = d3.scale.linear().domain([0, domain.y[1] - domain.y[0]]).range([0, this.height()]);
      if (!renderer.series.ofDefaultAxis()) {
        return this.y1 = d3.scale.linear().domain([0, d3.max(this.series.ofAlternateScale().flat('y'))]).range([this.height(), 0]);
      }
    }
  };

  Chart.prototype.axes = function(args) {
    var _this = this;

    if (!args) {
      return this.axesList;
    }
    _.each(['x', 'y', 'y1'], function(k) {
      var defaults;

      if (args[k] != null) {
        defaults = {
          graph: _this,
          dimension: _this.defaultAxesOptions[k].dimension,
          frame: _this.defaultAxesOptions[k].frame,
          axis: k
        };
        return _this.initAxis(_.extend(defaults, args[k]));
      }
    });
    return this;
  };

  Chart.prototype.initAxis = function(args) {
    if (!this._allRenderersCartesian()) {
      return;
    }
    switch (args.dimension) {
      case "linear":
        return this.axesList[args.axis] = new Tactile.AxisLinear(args);
      case "time":
        return this.axesList[args.axis] = new Tactile.AxisTime(args);
      default:
        return console.log("ERROR:" + args.dimension + " is not currently implemented");
    }
  };

  Chart.prototype.dataDomain = function() {
    var data;

    data = this.renderers[0].series.stack;
    return [data[0].x, data.slice(-1).shift().x];
  };

  Chart.prototype.stackData = function() {
    var defaultScaleSeriesData, i, j, layout, maxLen, y00, _results,
      _this = this;

    defaultScaleSeriesData = this.series.active().ofDefaultAxis().array.map(function(s) {
      return _this._data.map(s.dataTransform);
    });
    layout = d3.layout.stack();
    layout.offset(this.offset);
    this.stackedData = layout(defaultScaleSeriesData);
    i = 0;
    maxLen = 0;
    while (i < this.stackedData.length) {
      maxLen = Math.max(maxLen, this.stackedData[i].length);
      i++;
    }
    i = 0;
    y00 = 0;
    _results = [];
    while (i < maxLen) {
      j = 0;
      while (j < this.stackedData.length) {
        if (this.stackedData[j][i]) {
          if (this.utils.ourFunctor(this.series[j].fromBaseline, this.stackedData[j][i], i)) {
            y00 = 0;
          }
          this.stackedData[j][i].y00 = y00;
          y00 += this.stackedData[j][i].y;
        }
        j++;
      }
      _results.push(i++);
    }
    return _results;
  };

  Chart.prototype.setSize = function(args) {
    var elHeight, elWidth, _ref;

    if (args == null) {
      args = {};
    }
    elWidth = $(this._element).width();
    elHeight = $(this._element).height();
    this.outerWidth = args.width || elWidth || this.defaultWidth;
    this.outerHeight = args.height || elHeight || this.defaultHeight;
    this.marginedWidth = this.outerWidth - this.margin.left - this.margin.right;
    this.marginedHeight = this.outerHeight - this.margin.top - this.margin.bottom;
    this.innerWidth = this.marginedWidth - this.padding.left - this.padding.right;
    this.innerHeight = this.marginedHeight - this.padding.top - this.padding.bottom;
    return (_ref = this.vis) != null ? _ref.attr('width', this.innerWidth).attr('height', this.innerHeight) : void 0;
  };

  Chart.prototype.onUpdate = function(callback) {
    return this.updateCallbacks.push(callback);
  };

  Chart.prototype.initRenderers = function(series) {
    var renderersSize,
      _this = this;

    renderersSize = this.renderers.length;
    return _.each(series, function(s, index) {
      var name, r, rendererClass, rendererOptions;

      name = s.renderer;
      if (!_this._renderers[name]) {
        throw "couldn't find renderer " + name;
      }
      rendererClass = _this._renderers[name];
      rendererOptions = _.extend({}, {
        graph: _this,
        transitionSpeed: _this.transitionSpeed,
        series: s,
        rendererIndex: index + renderersSize
      });
      r = new rendererClass(rendererOptions);
      return _this.renderers.push(r);
    });
  };

  Chart.prototype.renderersByType = function(name) {
    return this.renderers.filter(function(r) {
      return r.name === name;
    });
  };

  Chart.prototype.stackTransition = function(transitionSpeed) {
    var t,
      _this = this;

    if (!transitionSpeed) {
      transitionSpeed = this.transitionSpeed;
    }
    t = this.svg.transition().duration(transitionSpeed);
    _.each(this.renderersByType('column'), function(r) {
      return r.stackTransition(t, transitionSpeed);
    });
    _.each(this.renderersByType('area'), function(r) {
      return r.stackTransition(t, transitionSpeed);
    });
    _.each(this.renderersByType('donut'), function(r) {
      return r.stackTransition(t, transitionSpeed);
    });
    return _.each(this.axesList, function(axis) {
      return axis.render(t);
    });
  };

  Chart.prototype.unstackTransition = function(transitionSpeed) {
    var t,
      _this = this;

    if (!transitionSpeed) {
      transitionSpeed = this.transitionSpeed;
    }
    t = this.svg.transition().duration(transitionSpeed);
    _.each(this.renderersByType('column'), function(r) {
      return r.unstackTransition(t, transitionSpeed);
    });
    _.each(this.renderersByType('area'), function(r) {
      return r.unstackTransition(t, transitionSpeed);
    });
    _.each(this.renderersByType('donut'), function(r) {
      return r.unstackTransition(t, transitionSpeed);
    });
    return _.each(this.axesList, function(axis) {
      return axis.render(t);
    });
  };

  Chart.prototype.element = function(val) {
    if (!val) {
      return this._element;
    }
    this._element = val;
    this._setupCanvas();
    return this;
  };

  Chart.prototype.height = function(val) {
    if (!val) {
      return this.innerHeight || this.defaultHeight;
    }
    this.setSize({
      width: this.outerWidth,
      height: val
    });
    return this;
  };

  Chart.prototype.width = function(val) {
    if (!val) {
      return this.innerWidth || this.defaultWidth;
    }
    this.setSize({
      width: val,
      height: this.outerHeight
    });
    return this;
  };

  Chart.prototype.data = function(val) {
    if (!val) {
      return this._data;
    }
    this._data = val;
    this.dataInitialized = false;
    return this;
  };

  Chart.prototype._setupCanvas = function() {
    var clip, scatterClip;

    $(this._element).addClass('graph-container');
    this.svg = this._findOrAppend({
      what: 'svg',
      "in": d3.select(this._element)
    });
    this.svg.attr('width', this.outerWidth).attr('height', this.outerHeight);
    this.vis = this._findOrAppend({
      what: 'g',
      "in": this.svg
    }).attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
    this.vis = this._findOrAppend({
      what: 'g',
      "in": this.vis
    }).attr("class", "outer-canvas").attr("width", this.marginedWidth).attr("height", this.marginedHeight);
    this.vis = this._findOrAppend({
      what: 'g',
      "in": this.vis
    }).attr("transform", "translate(" + this.padding.left + "," + this.padding.top + ")").attr("class", "inner-canvas");
    clip = this._findOrAppend({
      what: 'clipPath',
      selector: '#clip',
      "in": this.vis
    }).attr("id", "clip");
    this._findOrAppend({
      what: 'rect',
      "in": clip
    }).attr("width", this.width()).attr("height", this.height() + 4).attr("transform", "translate(0,-2)");
    scatterClip = this._findOrAppend({
      what: 'clipPath',
      selector: '#scatter-clip',
      "in": this.vis
    }).attr("id", "scatter-clip");
    return this._findOrAppend({
      what: 'rect',
      "in": scatterClip
    }).attr("width", this.width() + 12).attr("height", this.height() + 12).attr("transform", "translate(-6,-6)");
  };

  Chart.prototype._findOrAppend = function(options) {
    var element, found, node, selector;

    element = options["in"];
    node = options.what;
    selector = options.selector || node;
    found = element.select(selector);
    if (found != null ? found[0][0] : void 0) {
      return found;
    } else {
      return element.append(node);
    }
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
    return _.uniq(_.map(this.series.array, function(s) {
      return s.renderer;
    })).length > 1;
  };

  Chart.prototype._containsColumnChart = function() {
    return _.any(this.renderers, function(r) {
      return r.name === 'column' || r.name === 'waterfall';
    });
  };

  Chart.prototype._allRenderersCartesian = function() {
    return _.every(this.renderers, function(r) {
      return r.cartesian === true;
    });
  };

  Chart.prototype._allSeriesDisabled = function() {
    return _.every(this.series.array, function(s) {
      return s.disabled === true;
    });
  };

  return Chart;

})();

}).call(this);

