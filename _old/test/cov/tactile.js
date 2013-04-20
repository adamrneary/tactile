// instrument by jscoverage, do not modifly this file
(function () {
  var BASE;
  if (typeof global === 'object') {
    BASE = global;
  } else if (typeof window === 'object') {
    BASE = window;
  } else {
    throw new Error('[jscoverage] unknow ENV!');
  }
  if (!BASE._$jscoverage) {
    BASE._$jscoverage = {};
    BASE._$jscoverage_cond = {};
    BASE._$jscoverage_done = function (file, line, express) {
      if (arguments.length === 2) {
        BASE._$jscoverage[file][line] ++;
      } else {
        BASE._$jscoverage_cond[file][line] ++;
        return express;
      }
    };
    BASE._$jscoverage_init = function (base, file, lines) {
      var tmp = [];
      for (var i = 0; i < lines.length; i ++) {
        tmp[lines[i]] = 0;
      }
      base[file] = tmp;
    };
  }
})();
_$jscoverage_init(_$jscoverage, "/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js",[2,3,3,5,5,5,5,5,5,5,5,7,9,11,12,24,25,27,28,29,30,31,32,36,38,40,41,44,45,46,47,48,49,50,52,56,57,58,59,60,66,67,69,70,71,72,74,75,76,79,80,81,84,85,88,89,91,92,93,97,98,100,103,107,108,111,112,113,114,115,115,116,119,120,122,123,124,125,127,128,129,131,133,134,136,138,140,142,143,145,146,147,148,151,153,154,156,157,158,159,162,165,168,169,171,172,174,175,176,177,178,179,181,182,184,185,186,188,190,193,194,196,197,199,200,201,202,203,204,206,207,209,210,211,213,215,218,219,220,222,223,226,227,228,229,231,232,235,236,237,238,240,241,244,248,249,252,253,255,256,259,260,263,264,268,269,270,271,274,275,277,278,279,281,282,283,285,288,289,292,293,294,295,296,298,299,301,302,303,305,306,307,309,310,311,312,313,314,315,318,319,321,322,323,324,326,327,328,330,332,333,335,336,337,340,341,342,344,345,346,348,349,350,351,353,354,355,357,358,360,361,363,364,366,367,369,370,371,372,373,375,376,377,379,383,384,386,387,388,389,390,391,393,394,396,397,400,404,408,409,411,412,413,414,415,419,420,423,426,427,428,430,434,438,439,442,442,443,446,448,450,457,458,459,461,465,466,467,470,471,472,476,477,479,480,482,484,488,489,491,492,494,498,499,502,503,504,505,506,507,509,510,511,512,513,514,515,517,518,520,521,523,525,526,528,529,531,535,537,538,540,543,544,546,549,550,551,553,556,559,563,565,567,568,569,570,571,572,573,574,578,579,581,582,583,584,585,586,587,590,593,594,596,597,598,599,600,601,602,603,604,605,609,611,614,615,618,619,621,622,623,624,626,628,629,631,632,634,636,637,639,642,646,648,651,652,653,654,655,656,657,658,659,660,664,665,667,668,670,671,672,673,674,676,677,678,679,680,681,682,684,687,691,692,695,696,697,698,699,700,700,701,704,706,713,714,715,717,718,721,722,725,726,729,730,731,732,734,735,736,738,739,740,741,743,745,746,748,749,750,752,753,754,755,757,758,760,761,763,765,766,768,769,771,775,777,778,780,783,784,786,789,791,792,794,797,798,799,800,810,813,814,816,817,818,830,831,833,834,835,838,839,842,843,844,845,846,847,848,849,852,853,855,857,858,859,863,864,867,868,869,870,871,872,874,877,878,880,881,882,886,887,889,890,893,894,895,897,901,902,905,906,907,909,911,912,913,916,919,920,922,923,924,926,930,931,933,934,935,936,937,939,943,944,945,947,951,952,955,956,958,959,960,964,968,969,972,973,976,978,980,984,985,986,988,991,992,994,995,996,998,1001,1002,1004,1005,1006,1016,1018,1022,1024,1025,1026,1027,1027,1028,1029,1030,1031,1032,1033,1034,1035,1036,1037,1040,1041,1044,1045,1046,1048,1051,1052,1055,1056,1057,1059,1060,1065,1066,1067,1068,1070,1071,1073,1078,1081,1082,1084,1085,1086,1087,1088,1089,1090,1091,1092,1094,1095,1096,1097,1098,1099,1103,1104,1107,1108,1110,1111,1113,1114,1115,1117,1118,1119,1120,1122,1123,1126,1127,1130,1131,1134,1135,1136,1137,1138,1140,1141,1143,1146,1147,1149,1152,1154,1155,1157,1160,1161,1163,1165,1166,1168,1169,1170,1172,1173,1180,1183,1187,1189,1191,1192,1193,1198,1204,1210,1216,1222,1228,1234,1240,1246,1252,1258,1264,1265,1266,1270,1271,1274,1275,1278,1279,1281,1282,1283,1284,1285,1286,1287,1288,1289,1290,1291,1293,1296,1300,1301,1304,1305,1308,1310,1314,1315,1317,1318,1319,1320,1321,1322,1323,1324,1325,1326,1327,1328,1329,1330,1331,1332,1333,1334,1335,1336,1337,1338,1339,1340,1341,1342,1343,1344,1345,1346,1347,1348,1352,1353,1354,1355,1358,1359,1360,1361,1362,1365,1369,1370,1373,1373,1374,1377,1379,1386,1387,1389,1390,1392,1396,1397,1398,1401,1402,1403,1407,1408,1411,1412,1413,1414,1416,1417,1418,1419,1421,1422,1424,1425,1427,1429,1430,1432,1433,1435,1439,1441,1442,1444,1447,1448,1450,1453,1454,1455,1457,1460,1461,1462,1463,1474,1478,1480,1481,1483,1484,1485,1486,1487,1488,1489,1491,1492,1493,1494,1495,1497,1499,1505,1506,1507,1509,1510,1515,1516,1518,1519,1520,1521,1522,1524,1525,1527,1531,1532,1533,1534,1535,1538,1542,1543,1546,1547,1550,1552,1557,1558,1561,1562,1563,1565,1567,1568,1570,1572,1573,1575,1578,1579,1580,1583,1584,1585,1594,1597,1601,1602,1611,1618,1625,1627,1629,1631,1633,1635,1637,1639,1651,1653,1654,1656,1657,1658,1659,1660,1661,1662,1663,1667,1668,1670,1671,1673,1674,1676,1681,1682,1685,1686,1690,1691,1693,1694,1696,1698,1701,1702,1704,1705,1707,1709,1710,1711,1713,1714,1716,1717,1720,1721,1724,1725,1728,1729,1733,1734,1736,1737,1738,1741,1742,1744,1745,1746,1747,1748,1749,1751,1754,1755,1758,1759,1761,1762,1763,1764,1765,1766,1768,1769,1773,1774,1777,1778,1780,1781,1782,1783,1784,1785,1787,1788,1789,1790,1791,1795,1796,1797,1799,1801,1805,1809,1813,1814,1816,1817,1820,1821,1824,1825,1827,1828,1829,1830,1833,1834,1836,1837,1839,1840,1841,1842,1843,1844,1845,1846,1847,1850,1851,1854,1855,1858,1859,1860,1862,1863,1864,1866,1867,1873,1874,1878,1879,1880,1884,1885,1886,1890,1891,1892,1896,1897,1898,1900,1901,1902,1905,1906,1907,1909,1913,1916,1917,1918,1920,1924,1927,1928,1929,1931,1932,1933,1936,1937,1939,1940,1942,1943,1945,1946,1950,1953,1956,1957,1959,1960,1964,1965,1969,1973,1977,1982,1986,1991,1997,1998,2000,2001,2002,2003,2004,2005,2007,2011,2012,2014,2015,2017,2020,2021,2024,2025,2026,2030,2031,2032,2036,2037,2038,2042,2043,2044,2048]);
_$jscoverage_init(_$jscoverage_cond, "/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js",[5,24,31,49,69,88,128,145,147,156,158,171,177,178,184,184,196,202,203,209,209,219,228,237,248,278,278,293,295,302,305,313,318,326,335,336,341,345,360,366,370,370,388,389,390,393,419,427,458,471,503,514,517,525,528,528,537,537,543,543,550,586,618,667,678,714,729,731,754,757,765,768,768,777,777,783,783,791,798,816,894,905,911,923,923,936,944,955,955,1004,1045,1055,1067,1070,1086,1087,1107,1110,1119,1140,1140,1146,1146,1154,1281,1347,1402,1412,1418,1421,1429,1432,1432,1441,1441,1447,1447,1454,1461,1494,1506,1509,1521,1524,1572,1578,1583,1653,1667,1670,1685,1690,1693,1704,1728,1733,1733,1758,1758,1758,1781,1782,1796,1836,1863,1897,1906,1917,1928,1939,1945,2004,2014]);
_$jscoverage["/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js"].source = ["// Generated by CoffeeScript 1.6.2","var AreaRenderer, AxisTime, AxisY, Chart, ColumnRenderer, DonutRenderer, DraggableRenderer, Dragger, FixturesTime, GaugeRenderer, LineRenderer, RangeSlider, RendererBase, ScatterRenderer, Tactile, Tooltip, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6,","  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },","  __hasProp = {}.hasOwnProperty,","  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };","","Tactile = window.Tactile || {};","","window.Tactile = Tactile;","","Tactile.RendererBase = RendererBase = (function() {","  RendererBase.prototype.defaults = {","    cartesian: true,","    tension: 0.95,","    strokeWidth: 3,","    unstack: true,","    dotSize: 5,","    opacity: 1,","    stroke: false,","    fill: false","  };","","  function RendererBase(options) {","    if (options == null) {","      options = {};","    }","    this.render = __bind(this.render, this);","    this.graph = options.graph;","    this.tension = options.tension || this.tension;","    this.configure(options);","    if (typeof this.initialize === \"function\") {","      this.initialize(options);","    }","  }","","  RendererBase.prototype.seriesPathFactory = function() {};","","  RendererBase.prototype.seriesStrokeFactory = function() {};","","  RendererBase.prototype.domain = function() {","    var stackedData, topSeriesData, values, xMax, xMin, yMax, yMin,","      _this = this;","","    values = [];","    stackedData = this.graph.stackedData || this.graph.stackData();","    topSeriesData = (this.unstack ? stackedData : [stackedData.slice(-1).shift()]);","    topSeriesData.forEach(function(series) {","      return series.forEach(function(d) {","        if (_this.unstack) {","          return values.push(d.y);","        } else {","          return values.push(d.y + d.y0);","        }","      });","    });","    xMin = stackedData[0][0].x;","    xMax = stackedData[0][stackedData[0].length - 1].x;","    yMin = (this.graph.min === \"auto\" ? d3.min(values) : this.graph.min || 0);","    yMax = this.graph.max || d3.max(values);","    return {","      x: [xMin, xMax],","      y: [yMin, yMax]","    };","  };","","  RendererBase.prototype.render = function() {","    var line;","","    if (this.series.disabled) {","      this.timesRendered = 0;","      line = this.seriesCanvas().selectAll(\"path\").data([this.series.stack]).remove();","      return;","    }","    line = this.seriesCanvas().selectAll(\"path\").data([this.series.stack]);","    line.enter().append(\"svg:path\").attr(\"clip-path\", \"url(#clip)\").attr(\"fill\", (this.fill ? this.series.color : \"none\")).attr(\"stroke\", (this.stroke ? this.series.color : \"none\")).attr(\"stroke-width\", this.strokeWidth).style('opacity', this.opacity).attr(\"class\", \"\" + (this.series.className || '') + \" \" + (this.series.color ? '' : 'colorless'));","    return line.transition().duration(this.transitionSpeed).attr(\"d\", this.seriesPathFactory());","  };","","  RendererBase.prototype.seriesCanvas = function() {","    this._seriesCanvas || (this._seriesCanvas = this.graph.vis.selectAll(\"g#\" + (this._nameToId())).data([this.series.stack]).enter().append(\"g\").attr('id', this._nameToId()).attr('class', this.name));","    return this._seriesCanvas;","  };","","  RendererBase.prototype.configure = function(options) {","    var defaults,","      _this = this;","","    if (this.specificDefaults != null) {","      defaults = _.extend({}, this.defaults, this.specificDefaults);","    }","    options = _.extend({}, defaults, options);","    return _.each(options, function(val, key) {","      return _this[key] = val;","    });","  };","","  RendererBase.prototype._nameToId = function() {","    var _ref;","","    return (_ref = this.series.name) != null ? _ref.replace(/\\s+/g, '-').toLowerCase() : void 0;","  };","","  return RendererBase;","","})();","","Tactile.DraggableRenderer = DraggableRenderer = (function(_super) {","  __extends(DraggableRenderer, _super);","","  function DraggableRenderer() {","    this.decreaseEditableValue = __bind(this.decreaseEditableValue, this);","    this.increaseEditableValue = __bind(this.increaseEditableValue, this);","    this.setActive = __bind(this.setActive, this);","    this.selectPerviousEditableValue = __bind(this.selectPerviousEditableValue, this);","    this.selectNextEditableValue = __bind(this.selectNextEditableValue, this);    _ref = DraggableRenderer.__super__.constructor.apply(this, arguments);","    return _ref;","  }","","  DraggableRenderer.prototype.initialize = function() {","    var _this = this;","","    this.active = null;","    window.addEventListener(\"click\", (function() {","      _this.active = null;","      return _this.render();","    }), true);","    window.addEventListener(\"keyup\", function(e) {","      if (_this.id) {","        clearInterval(_this.id);","      }","      return _this.id = null;","    });","    window.addEventListener(\"keydown\", function(e) {","      var decrease, increase;","","      switch (e.keyCode) {","        case 37:","          return _this.selectPerviousEditableValue();","        case 39:","          return _this.selectNextEditableValue();","        case 38:","          increase = function() {","            return _this.increaseEditableValue();","          };","          if (!_this.id) {","            _this.increaseEditableValue();","            if (!_this.id) {","              _this.id = setInterval(increase, 200);","            }","          }","          return e.preventDefault();","        case 40:","          decrease = function() {","            return _this.decreaseEditableValue();","          };","          if (!_this.id) {","            _this.decreaseEditableValue();","            if (!_this.id) {","              _this.id = setInterval(decrease, 200);","            }","          }","          return e.preventDefault();","      }","    });","    return this.utils = new Tactile.Utils();","  };","","  DraggableRenderer.prototype.selectNextEditableValue = function() {","    var i, setNext;","","    if (!this.active) {","      return;","    }","    setNext = false;","    i = 0;","    while (i < this.series.stack.length) {","      if (this.active === this.series.stack[i]) {","        if (this.active === this.series.stack[i]) {","          setNext = true;","        }","        i++;","        continue;","      }","      if (this.utils.ourFunctor(this.series.isEditable, this.series.stack[i], i) && setNext) {","        this.active = this.series.stack[i];","        break;","      }","      i++;","    }","    return this.render();","  };","","  DraggableRenderer.prototype.selectPerviousEditableValue = function() {","    var i, setNext;","","    if (!this.active) {","      return;","    }","    setNext = false;","    i = this.series.stack.length - 1;","    while (i >= 0) {","      if (this.active === this.series.stack[i]) {","        if (this.active === this.series.stack[i]) {","          setNext = true;","        }","        i--;","        continue;","      }","      if (this.utils.ourFunctor(this.series.isEditable, this.series.stack[i], i) && setNext) {","        this.active = this.series.stack[i];","        break;","      }","      i--;","    }","    return this.render();","  };","","  DraggableRenderer.prototype.setActive = function(d, i) {","    if (!this.utils.ourFunctor(this.series.isEditable, d, i)) {","      return;","    }","    this.active = d;","    return this.render();","  };","","  DraggableRenderer.prototype.increaseEditableValue = function() {","    console.log(\"increaseEditableValue\");","    if (!this.active) {","      return;","    }","    this.active.y++;","    return this.render();","  };","","  DraggableRenderer.prototype.decreaseEditableValue = function() {","    console.log(\"decreaseEditableValue\");","    if (!this.active) {","      return;","    }","    this.active.y--;","    return this.render();","  };","","  return DraggableRenderer;","","})(RendererBase);","","if (!window.Tactile) {","  window.Tactile = {};","}","","window.Tactile.Tooltip = Tooltip = (function() {","  Tooltip._spotlightMode = false;","","  Tooltip.turnOffspotlight = function() {","    return Tooltip._spotlightMode = false;","  };","","  Tooltip.spotlightOn = function(d) {","    return Tooltip._spotlightMode = true;","  };","","  Tooltip.getSpotlight = function() {","    return Tooltip._spotlightMode;","  };","","  function Tooltip(el, options) {","    this.el = el;","    this.options = options;","    this.el = d3.select(this.el);","    this.annotate();","  }","","  Tooltip.prototype.appendTooltip = function() {","    var chartContainer, tip;","","    chartContainer = d3.select(this.options.graph._element);","    if (Tooltip._spotlightMode && this.el.node().classList.contains(\"active\")) {","      tip = chartContainer.select('.tooltip');","    } else {","      chartContainer.selectAll('.tooltip').remove();","      tip = chartContainer.append('div').classed(\"tooltip\", true);","      tip.append('div').html(this.options.text).classed(\"tooltip-inner\", true);","    }","    return tip;","  };","","  Tooltip.prototype.annotate = function() {","    var chartContainer, mouseMove, moveTip,","      _this = this;","","    chartContainer = this.el.node().nearestViewportElement;","    if (this.options.tooltipCircleContainer) {","      this.tooltipCircleContainer = this.options.tooltipCircleContainer;","    } else if (this.options.circleOnHover) {","      this.tooltipCircleContainer = this.el.node().parentNode;","    }","    moveTip = function(tip) {","      var center, hoveredNode, svgNode;","","      center = [0, 0];","      if (_this.options.placement === \"mouse\") {","        center = d3.mouse(_this.options.graph._element);","      } else {","        if (_this.options.position) {","          center[0] = _this.options.position[0];","          center[1] = _this.options.position[1];","        } else {","          svgNode = d3.select(_this.options.graph._element).select('svg').node();","          hoveredNode = _this.el.node().getBBox();","          center[0] = hoveredNode.x + svgNode.offsetLeft + hoveredNode.width / 2;","          center[1] = hoveredNode.y + svgNode.offsetTop;","          if (_this.options.graph.series[0].renderer === \"donut\") {","            center[0] = center[0] + _this.options.graph.series[0].height - 30;","            center[1] = center[1] + _this.options.graph.series[0].height - 30;","          }","        }","        if (_this.el.node().tagName === 'circle') {","          center[1] += hoveredNode.height / 2 - 1;","        }","        center[0] += _this.options.graph.margin.left;","        center[0] += _this.options.graph.padding.left;","        center[1] += _this.options.graph.margin.top;","        center[1] += _this.options.graph.padding.top;","      }","      if (_this.options.displacement) {","        center[0] += _this.options.displacement[0];","        center[1] += _this.options.displacement[1];","      }","      return tip.style(\"left\", \"\" + center[0] + \"px\").style(\"top\", \"\" + center[1] + \"px\").style(\"display\", \"block\");","    };","    this.el.on(\"mouseover\", function() {","      var inner, tip;","","      if (Tooltip._spotlightMode) {","        if (!_this.el.node().classList.contains(\"active\")) {","          return;","        }","      }","      tip = _this.appendTooltip();","      if (_this.options.circleOnHover) {","        _this._appendTipCircle();","      }","      tip.classed(\"annotation\", true).classed(_this.options.gravity, true).style(\"display\", \"none\");","      if (_this.options.fade) {","        tip.classed('fade', true);","      }","      tip.append(\"div\").attr(\"class\", \"arrow\");","      tip.select('.tooltip-inner').html(_this.options.text);","      inner = function() {","        return tip.classed('in', true);","      };","      setTimeout(inner, 10);","      tip.style(\"display\", \"\");","      return moveTip(tip);","    });","    mouseMove = function() {","      return d3.select(\".annotation\").call(moveTip.bind(this));","    };","    if (this.options.mousemove) {","      this.el.on(\"mousemove\", mouseMove);","    }","    return this.el.on(\"mouseout\", function() {","      var remover, tip;","","      if (Tooltip._spotlightMode) {","        return;","      }","      d3.select(_this.tooltipCircleContainer).selectAll(\"circle.tooltip-circle\").remove();","      if (_this.el.node().tagName === 'circle' && _this.el.attr(\"class\").search(/active/) === -1) {","        _this.el.classed('tip-hovered', false);","        _this.el.attr('stroke', _this.el.attr('data-stroke-color'));","        _this.el.attr('fill', _this.el.attr('data-fill-color'));","      }","      tip = d3.selectAll(\".annotation\").classed('in', false);","      remover = function() {","        return tip.remove();","      };","      return setTimeout(remover, 150);","    });","  };","","  Tooltip.prototype._appendTipCircle = function() {","    var hoveredNode, svgNode;","","    hoveredNode = this.el.node().getBBox();","    svgNode = d3.select(this.options.graph._element).select('svg').node();","    if (this.el.node().tagName === 'circle') {","      if (this.el.attr(\"class\").search(/active/) === -1) {","        if (!this.el.attr('data-stroke-color')) {","          this.el.attr('data-stroke-color', this.el.attr('stroke'));","        }","        if (!this.el.attr('data-fill-color')) {","          this.el.attr('data-fill-color', this.el.attr('fill'));","        }","        this.el.attr('fill', this.el.attr('data-stroke-color'));","        return this.el.attr('stroke', this.el.attr('data-fill-color'));","      }","    } else {","      return d3.select(this.tooltipCircleContainer).append(\"svg:circle\").attr(\"cx\", hoveredNode.x + svgNode.offsetLeft + hoveredNode.width / 2).attr(\"cy\", hoveredNode.y + svgNode.offsetTop).attr(\"r\", 4).attr('class', 'tooltip-circle').attr(\"stroke\", this.options.circleColor || 'orange').attr(\"fill\", 'white').attr(\"stroke-width\", '1');","    }","  };","","  return Tooltip;","","})();","","d3.selection.prototype.tooltip = function(f) {","  var options, selection;","","  selection = this;","  options = {};","  return selection.each(function(d, i) {","    options = f.apply(this, arguments);","    return new Tactile.Tooltip(this, options);","  });","};","","if (!window.Utils) {","  window.Utils = {};","}","","window.Tactile.Utils = (function() {","  function Utils() {}","","  Utils.prototype.ourFunctor = function() {","    if (typeof arguments[0] === 'function') {","      return arguments[0].apply(null, _.toArray(arguments).slice(1));","    } else {","      return arguments[0];","    }","  };","","  return Utils;","","})();","","Tactile.AreaRenderer = AreaRenderer = (function(_super) {","  __extends(AreaRenderer, _super);","","  function AreaRenderer() {","    this._y0 = __bind(this._y0, this);    _ref1 = AreaRenderer.__super__.constructor.apply(this, arguments);","    return _ref1;","  }","","  AreaRenderer.prototype.name = \"area\";","","  AreaRenderer.prototype.dotSize = 5;","","  AreaRenderer.prototype.specificDefaults = {","    unstack: true,","    fill: true,","    stroke: true,","    opacity: 0.15","  };","","  AreaRenderer.prototype._y0 = function(d) {","    if (this.unstack) {","      return 0;","    } else {","      return d.y0;","    }","  };","","  AreaRenderer.prototype.initialize = function() {","    AreaRenderer.__super__.initialize.apply(this, arguments);","    this.dragger = new Dragger({","      renderer: this","    });","    this.timesRendered = 0;","    if (this.series.dotSize != null) {","      return this.dotSize = this.series.dotSize;","    }","  };","","  AreaRenderer.prototype.seriesPathFactory = function() {","    var _this = this;","","    return d3.svg.area().x(function(d) {","      return _this.graph.x(d.x);","    }).y0(function(d) {","      return _this.graph.y(_this._y0(d));","    }).y1(function(d) {","      return _this.graph.y(d.y + _this._y0(d));","    }).interpolate(this.graph.interpolation).tension(this.tension);","  };","","  AreaRenderer.prototype.seriesStrokeFactory = function() {","    var _this = this;","","    return d3.svg.line().x(function(d) {","      return _this.graph.x(d.x);","    }).y(function(d) {","      return _this.graph.y(d.y + _this._y0(d));","    }).interpolate(this.graph.interpolation).tension(this.tension);","  };","","  AreaRenderer.prototype.render = function() {","    var circ, newCircs, stroke, _ref2, _ref3,","      _this = this;","","    AreaRenderer.__super__.render.call(this);","    if (this.series.disabled) {","      this.timesRendered = 0;","      this.seriesCanvas().selectAll(\"path\").remove();","      this.seriesCanvas().selectAll('circle').remove();","      return;","    }","    stroke = this.seriesCanvas().selectAll('path.stroke').data([this.series.stack]);","    stroke.enter().append(\"svg:path\").attr(\"clip-path\", \"url(#clip)\").attr('fill', 'none').attr(\"stroke-width\", '2').attr(\"stroke\", this.series.color).attr('class', 'stroke');","    stroke.transition().duration(this.transitionSpeed).attr(\"d\", this.seriesStrokeFactory());","    circ = this.seriesCanvas().selectAll('circle').data(this.series.stack);","    newCircs = circ.enter().append(\"svg:circle\").on(\"click\", this.setActive);","    if ((_ref2 = this.dragger) != null) {","      _ref2.makeHandlers(newCircs);","    }","    if ((_ref3 = this.dragger) != null) {","      _ref3.updateDraggedNode(circ);","    }","    circ.transition().duration(this.timesRendered++ === 0 ? 0 : this.transitionSpeed).attr(\"cx\", function(d) {","      return _this.graph.x(d.x);","    }).attr(\"cy\", function(d) {","      return _this.graph.y(d.y);","    }).attr(\"r\", function(d) {","      if (\"r\" in d) {","        return d.r;","      } else {","        if (d.dragged || d === _this.active) {","          return _this.dotSize + 1;","        } else {","          return _this.dotSize;","        }","      }","    }).attr(\"clip-path\", \"url(#scatter-clip)\").attr(\"class\", function(d, i) {","      return [(d === _this.active ? \"active\" : void 0), (_this.utils.ourFunctor(_this.series.isEditable, d, i) ? \"editable\" : void 0)].join(' ');","    }).attr(\"fill\", function(d) {","      if (d.dragged || d === _this.active) {","        return 'white';","      } else {","        return _this.series.color;","      }","    }).attr(\"stroke\", function(d) {","      if (d.dragged || d === _this.active) {","        return _this.series.color;","      } else {","        return 'white';","      }","    }).attr(\"stroke-width\", this.dotSize / 2 || 2);","    circ.style(\"cursor\", function(d, i) {","      if (_this.utils.ourFunctor(_this.series.isEditable, d, i)) {","        return \"ns-resize\";","      } else {","        return \"auto\";","      }","    });","    return circ.exit().remove();","  };","","  return AreaRenderer;","","})(DraggableRenderer);","","Tactile.AxisTime = AxisTime = (function() {","  function AxisTime(args) {","    var _this = this;","","    this.graph = args.graph;","    this.ticksTreatment = args.ticksTreatment || \"plain\";","    this.fixedTimeUnit = args.timeUnit;","    this.marginTop = args.paddingBottom || 5;","    this.time = new FixturesTime();","    this.grid = args.grid;","    this.graph.onUpdate(function() {","      return _this.render();","    });","  }","","  AxisTime.prototype.appropriateTimeUnit = function() {","    var domain, rangeSeconds, unit, units;","","    unit = void 0;","    units = this.time.units;","    domain = this.graph.x.domain();","    rangeSeconds = domain[1] - domain[0];","    units.forEach(function(u) {","      if (Math.floor(rangeSeconds / u.seconds) >= 2) {","        return unit = unit || u;","      }","    });","    return unit || this.time.units[this.time.units.length - 1];","  };","","  AxisTime.prototype.tickOffsets = function() {","    var count, domain, i, offsets, runningTick, tickValue, unit;","","    domain = this.graph.x.domain();","    unit = this.fixedTimeUnit || this.appropriateTimeUnit();","    count = Math.ceil((domain[1] - domain[0]) / unit.seconds);","    runningTick = domain[0];","    offsets = [];","    i = 0;","    while (i <= count) {","      tickValue = this.time.ceil(runningTick, unit);","      runningTick = tickValue + unit.seconds / 2;","      offsets.push({","        value: tickValue,","        unit: unit","      });","      i++;","    }","    return offsets;","  };","","  AxisTime.prototype.render = function() {","    var g, tickData, ticks,","      _this = this;","","    if (this.graph.x == null) {","      return;","    }","    g = this.graph.vis.selectAll('.x-ticks').data([0]);","    g.enter().append('g').attr('class', 'x-ticks');","    tickData = this.tickOffsets().filter(function(tick) {","      var _ref2;","","      return (_this.graph.x.range()[0] <= (_ref2 = _this.graph.x(tick.value)) && _ref2 <= _this.graph.x.range()[1]);","    });","    ticks = g.selectAll('g.x-tick').data(this.tickOffsets(), function(d) {","      return d.value;","    });","    ticks.enter().append('g').attr(\"class\", [\"x-tick\", this.ticksTreatment].join(' ')).attr(\"transform\", function(d) {","      return \"translate(\" + (_this.graph.x(d.value)) + \", \" + _this.graph.marginedHeight + \")\";","    }).append('text').attr(\"y\", this.marginTop).text(function(d) {","      return d.unit.formatter(new Date(d.value * 1000));","    }).attr(\"class\", 'title');","    ticks.attr(\"transform\", function(d) {","      return \"translate(\" + (_this.graph.x(d.value)) + \", \" + _this.graph.marginedHeight + \")\";","    });","    return ticks.exit().remove();","  };","","  return AxisTime;","","})();","","Tactile.AxisY = AxisY = (function() {","  function AxisY(options) {","    var pixelsPerTick,","      _this = this;","","    this.options = options;","    this.graph = options.graph;","    this.orientation = options.orientation || \"left\";","    pixelsPerTick = options.pixelsPerTick || 75;","    this.ticks = options.ticks || Math.floor(this.graph.height() / pixelsPerTick);","    this.tickSize = options.tickSize || 4;","    this.ticksTreatment = options.ticksTreatment || \"plain\";","    this.grid = options.grid;","    this.graph.onUpdate(function() {","      return _this.render();","    });","  }","","  AxisY.prototype.render = function() {","    var axis, grid, gridSize, y, yAxis;","","    if (this.graph.y == null) {","      return;","    }","    y = this.graph.vis.selectAll('.y-ticks').data([0]);","    y.enter().append(\"g\").attr(\"class\", [\"y-ticks\", this.ticksTreatment].join(\" \"));","    axis = d3.svg.axis().scale(this.graph.y).orient(this.orientation);","    axis.tickFormat(this.options.tickFormat || function(y) {","      return y;","    });","    yAxis = axis.ticks(this.ticks).tickSubdivide(0).tickSize(this.tickSize);","    y.transition().duration(this.graph.transitionSpeed).call(yAxis);","    if (this.grid) {","      gridSize = (this.orientation === \"right\" ? 1 : -1) * this.graph.width();","      grid = this.graph.vis.selectAll('.y-grid').data([0]);","      grid.enter().append(\"svg:g\").attr(\"class\", \"y-grid\");","      grid.transition().call(axis.ticks(this.ticks).tickSubdivide(0).tickSize(gridSize));","    }","    return this._renderHeight = this.graph.height();","  };","","  return AxisY;","","})();","","Tactile.ColumnRenderer = ColumnRenderer = (function(_super) {","  __extends(ColumnRenderer, _super);","","  function ColumnRenderer() {","    this._barY = __bind(this._barY, this);","    this._barX = __bind(this._barX, this);","    this._seriesBarWidth = __bind(this._seriesBarWidth, this);","    this._edgeRatio = __bind(this._edgeRatio, this);","    this._transformMatrix = __bind(this._transformMatrix, this);","    this.render = __bind(this.render, this);    _ref2 = ColumnRenderer.__super__.constructor.apply(this, arguments);","    return _ref2;","  }","","  ColumnRenderer.prototype.name = \"column\";","","  ColumnRenderer.prototype.specificDefaults = {","    gapSize: 0.15,","    tension: null,","    round: true,","    unstack: true","  };","","  ColumnRenderer.prototype.initialize = function(options) {","    if (options == null) {","      options = {};","    }","    ColumnRenderer.__super__.initialize.apply(this, arguments);","    this.dragger = new Dragger({","      renderer: this","    });","    this.gapSize = options.gapSize || this.gapSize;","    return this.timesRendered = 0;","  };","","  ColumnRenderer.prototype.render = function() {","    var circ, newCircs, nodes, _ref3, _ref4, _ref5,","      _this = this;","","    if (this.series.disabled) {","      this.timesRendered = 0;","      if ((_ref3 = this.dragger) != null) {","        _ref3.timesRendered = 0;","      }","      this.seriesCanvas().selectAll(\"rect\").data(this.series.stack).remove();","      this.seriesCanvas().selectAll('circle').data(this.series.stack).remove();","      return;","    }","    nodes = this.seriesCanvas().selectAll(\"rect\").data(this.series.stack);","    nodes.enter().append(\"svg:rect\").attr(\"clip-path\", \"url(#clip)\").on(\"click\", this.setActive);","    nodes.transition().duration(this.timesRendered++ === 0 ? 0 : this.transitionSpeed).attr(\"x\", this._barX).attr(\"y\", this._barY).attr(\"width\", this._seriesBarWidth()).attr(\"height\", function(d) {","      return _this.graph.y.magnitude(Math.abs(d.y));","    }).attr(\"transform\", this._transformMatrix).attr(\"fill\", this.series.color).attr(\"stroke\", 'white').attr(\"rx\", this._edgeRatio).attr(\"ry\", this._edgeRatio).attr(\"class\", function(d, i) {","      return [\"bar\", (!_this.series.color ? \"colorless\" : void 0), (d === _this.active ? \"active\" : void 0), (_this.utils.ourFunctor(_this.series.isEditable, d, i) ? \"editable\" : void 0)].join(' ');","    });","    nodes.on('mouseover.show-dragging-circle', function(d, i, el) {","      var circ;","","      _this.seriesCanvas().selectAll('circle:not(.active)').style('display', 'none');","      circ = _this.seriesCanvas().select(\"#node-\" + i + \"-\" + d.x);","      return circ.style('display', '');","    });","    circ = this.seriesCanvas().selectAll('circle').data(this.series.stack);","    newCircs = circ.enter().append(\"svg:circle\").on(\"click\", this.setActive).style('display', 'none');","    if ((_ref4 = this.dragger) != null) {","      _ref4.makeHandlers(newCircs);","    }","    if ((_ref5 = this.dragger) != null) {","      _ref5.updateDraggedNode();","    }","    circ.transition().duration(this.timesRendered++ === 0 ? 0 : this.transitionSpeed).attr(\"cx\", function(d) {","      return _this._barX(d) + _this._seriesBarWidth() / 2;","    }).attr(\"cy\", function(d) {","      return _this._barY(d);","    }).attr(\"r\", function(d) {","      if (\"r\" in d) {","        return d.r;","      } else {","        if (d.dragged || d === _this.active) {","          return _this.dotSize + 1;","        } else {","          return _this.dotSize;","        }","      }","    }).attr(\"clip-path\", \"url(#scatter-clip)\").attr(\"class\", function(d, i) {","      return [(d === _this.active ? \"active\" : void 0), (_this.utils.ourFunctor(_this.series.isEditable, d, i) ? \"editable\" : void 0)].join(' ');","    }).attr(\"fill\", function(d) {","      if (d.dragged || d === _this.active) {","        return 'white';","      } else {","        return _this.series.color;","      }","    }).attr(\"stroke\", function(d) {","      if (d.dragged || d === _this.active) {","        return _this.series.color;","      } else {","        return 'white';","      }","    }).attr(\"stroke-width\", 2).attr('id', function(d, i) {","      return \"node-\" + i + \"-\" + d.x;","    }).style(\"cursor\", function(d, i) {","      if (_this.utils.ourFunctor(_this.series.isEditable, d, i)) {","        return \"ns-resize\";","      } else {","        return \"auto\";","      }","    });","    circ.exit().remove();","    if (this.series.tooltip) {","      circ.tooltip(function(d, i) {","        return {","          circleColor: _this.series.color,","          graph: _this.graph,","          text: _this.series.tooltip(d),","          circleOnHover: true,","          tooltipCircleContainer: _this.graph.vis.node(),","          gravity: \"right\"","        };","      });","    }","    return this.setupTooltips();","  };","","  ColumnRenderer.prototype.setupTooltips = function() {","    var _this = this;","","    if (this.series.tooltip) {","      return this.seriesCanvas().selectAll(\"rect\").tooltip(function(d, i) {","        return {","          circleColor: _this.series.color,","          graph: _this.graph,","          text: _this.series.tooltip(d),","          circleOnHover: false,","          tooltipCircleContainer: _this.graph.vis.node(),","          gravity: \"right\"","        };","      });","    }","  };","","  ColumnRenderer.prototype.barWidth = function() {","    var barWidth, count, data;","","    data = this.series.stack;","    count = data.length;","    return barWidth = this.graph.width() / count * (1 - this.gapSize);","  };","","  ColumnRenderer.prototype.stackTransition = function() {","    var count, nodes, slideTransition,","      _this = this;","","    this.unstack = false;","    this.graph.discoverRange(this);","    count = this.series.stack.length;","    nodes = this.seriesCanvas().selectAll(\"rect\").data(this.series.stack);","    nodes.enter().append(\"svg:rect\");","    slideTransition = function() {","      return _this.seriesCanvas().selectAll(\"rect\").filter(function(d) {","        return d.y > 0;","      }).transition().duration(_this.timesRendered++ === 0 ? 0 : _this.transitionSpeed).attr(\"width\", _this._seriesBarWidth()).attr(\"x\", _this._barX);","    };","    this.seriesCanvas().selectAll(\"rect\").filter(function(d) {","      return d.y > 0;","    }).transition().duration(this.timesRendered++ === 0 ? 0 : this.transitionSpeed).attr(\"y\", this._barY).attr(\"height\", function(d) {","      return _this.graph.y.magnitude(Math.abs(d.y));","    }).each('end', slideTransition);","    this.setupTooltips();","    return this.graph.updateCallbacks.forEach(function(callback) {","      return callback();","    });","  };","","  ColumnRenderer.prototype.unstackTransition = function() {","    var count, growTransition,","      _this = this;","","    this.unstack = true;","    this.graph.discoverRange(this);","    count = this.series.stack.length;","    growTransition = function() {","      return _this.seriesCanvas().selectAll(\"rect\").filter(function(d) {","        return d.y > 0;","      }).transition().duration(_this.timesRendered++ === 0 ? 0 : _this.transitionSpeed).attr(\"height\", function(d) {","        return _this.graph.y.magnitude(Math.abs(d.y));","      }).attr(\"y\", _this._barY);","    };","    this.seriesCanvas().selectAll(\"rect\").filter(function(d) {","      return d.y > 0;","    }).transition().duration(this.timesRendered++ === 0 ? 0 : this.transitionSpeed).attr(\"x\", this._barX).attr(\"width\", this._seriesBarWidth()).each('end', growTransition);","    this.setupTooltips();","    return this.graph.updateCallbacks.forEach(function(callback) {","      return callback();","    });","  };","","  ColumnRenderer.prototype._transformMatrix = function(d) {","    var matrix;","","    matrix = [1, 0, 0, (d.y < 0 ? -1 : 1), 0, (d.y < 0 ? this.graph.y.magnitude(Math.abs(d.y)) * 2 : 0)];","    return \"matrix(\" + matrix.join(\",\") + \")\";","  };","","  ColumnRenderer.prototype._edgeRatio = function() {","    if (this.series.round) {","      return Math.round(0.05783 * this._seriesBarWidth() + 1);","    } else {","      return 0;","    }","  };","","  ColumnRenderer.prototype._seriesBarWidth = function() {","    var stackWidth, width,","      _this = this;","","    if (this.series.stack.length >= 2) {","      stackWidth = this.graph.x(this.series.stack[1].x) - this.graph.x(this.series.stack[0].x);","      width = stackWidth / (1 + this.gapSize);","    } else {","      width = this.graph.width() / (1 + this.gapSize);","    }","    if (this.unstack) {","      width = width / this.graph.series.filter(function(d) {","        return d.renderer === 'column';","      }).length;","    }","    return width;","  };","","  ColumnRenderer.prototype._barXOffset = function(seriesBarWidth) {","    var barXOffset, count;","","    count = this.graph.renderersByType(this.name).length;","    if (count === 1 || !this.unstack) {","      return barXOffset = -seriesBarWidth / 2;","    } else {","      return barXOffset = -seriesBarWidth * count / 2;","    }","  };","","  ColumnRenderer.prototype._barX = function(d) {","    var initialX, seriesBarWidth, x;","","    x = this.graph.x(d.x);","    seriesBarWidth = this._seriesBarWidth();","    initialX = x + this._barXOffset(seriesBarWidth);","    if (this.unstack) {","      return initialX + (this._columnRendererIndex() * seriesBarWidth);","    } else {","      return initialX;","    }","  };","","  ColumnRenderer.prototype._barY = function(d) {","    if (this.unstack) {","      return this.graph.y(Math.abs(d.y)) * (d.y < 0 ? -1 : 1);","    } else {","      return this.graph.y(d.y0 + Math.abs(d.y)) * (d.y < 0 ? -1 : 1);","    }","  };","","  ColumnRenderer.prototype._columnRendererIndex = function() {","    var renderers,","      _this = this;","","    if (this.rendererIndex === 0 || this.rendererIndex === void 0) {","      return 0;","    }","    renderers = this.graph.renderers.slice(0, this.rendererIndex);","    return _.filter(renderers, function(r) {","      return r.name === _this.name;","    }).length;","  };","","  return ColumnRenderer;","","})(DraggableRenderer);","","Tactile.DonutRenderer = DonutRenderer = (function(_super) {","  __extends(DonutRenderer, _super);","","  function DonutRenderer() {","    _ref3 = DonutRenderer.__super__.constructor.apply(this, arguments);","    return _ref3;","  }","","  Tactile = window.Tactile || {};","","  DonutRenderer.prototype.name = \"donut\";","","  DonutRenderer.prototype.specificDefaults = {","    cartesian: false","  };","","  DonutRenderer.prototype.initialize = function() {","    this.donut = d3.layout.pie().value(function(d) {","      return d.val;","    });","    return this.arc = d3.svg.arc().innerRadius(60).outerRadius(this.series.height);","  };","","  DonutRenderer.prototype.render = function() {","    var donut;","","    donut = void 0;","    donut = this.seriesCanvas().selectAll(\".arc\").data(this.donut).enter().append(\"path\").attr(\"class\", \"donut-arc\").attr(\"transform\", \"translate(\" + (this.series.height - 30) + \",\" + (this.series.height - 30) + \")\").attr(\"d\", this.arc).attr(\"stroke\", \"white\").style(\"fill\", (function(d) {","      return d.data.color;","    }), \"stroke\");","    return this.setupTooltips();","  };","","  DonutRenderer.prototype.setupTooltips = function() {","    var _this = this;","","    if (this.series.tooltip) {","      return this.seriesCanvas().selectAll(\"path\").tooltip(function(d, i) {","        return {","          color: _this.series.color,","          graph: _this.graph,","          text: _this.series.tooltip(d),","          gravity: \"left\"","        };","      });","    }","  };","","  DonutRenderer;","","  return DonutRenderer;","","})(RendererBase);","","Tactile.Dragger = Dragger = (function() {","  function Dragger(args) {","    this.update = __bind(this.update, this);","    this._mouseUp = __bind(this._mouseUp, this);","    this._mouseMove = __bind(this._mouseMove, this);","    this._datapointDrag = __bind(this._datapointDrag, this);    this.renderer = args.renderer;","    this.graph = this.renderer.graph;","    this.series = this.renderer.series;","    this.drawCircles = args.circles || false;","    this.afterDrag = this.series.afterDrag || function() {};","    this.onDrag = this.series.onDrag || function() {};","    this.dragged = null;","    this._bindMouseEvents();","    this.power = this.series.sigfigs != null ? Math.pow(10, this.series.sigfigs) : 1;","    this.setSpeed = this.renderer.transitionSpeed;","    this.timesRendered = 0;","  }","","  Dragger.prototype._bindMouseEvents = function() {","    return d3.select(this.graph._element).on(\"mousemove.drag.\" + this.series.name, this._mouseMove).on(\"touchmove.drag.\" + this.series.name, this._mouseMove).on(\"mouseup.drag.\" + this.series.name, this._mouseUp).on(\"touchend.drag.\" + this.series.name, this._mouseUp);","  };","","  Dragger.prototype.makeHandlers = function(nodes) {","    if (this.drawCircles) {","      nodes = this._appendCircles(nodes);","    }","    return nodes.on(\"mousedown.drag.\" + this.series.name, this._datapointDrag).on(\"touchstart.drag.\" + this.series.name, this._datapointDrag);","  };","","  Dragger.prototype.updateDraggedNode = function() {","    var _ref4,","      _this = this;","","    if (((_ref4 = this.dragged) != null ? _ref4.y : void 0) != null) {","      return this.renderer.seriesCanvas().selectAll('circle.editable').filter(function(d, i) {","        return d === _this.dragged.d;","      }).each(function(d) {","        d.y = _this.dragged.y;","        return d.dragged = true;","      });","    }","  };","","  Dragger.prototype._datapointDrag = function(d, i) {","    d = _.isArray(d) ? d[i] : d;","    if (!this.renderer.utils.ourFunctor(this.series.isEditable, d, i)) {","      return;","    }","    if (this.series.tooltip) {","      Tactile.Tooltip.spotlightOn(d);","    }","    this.dragged = {","      d: d,","      i: i,","      y: d.y","    };","    return this.update();","  };","","  Dragger.prototype._mouseMove = function() {","    var elementRelativeposition, inverted, offsetTop, p, svgNode, t, tip, value;","","    p = d3.svg.mouse(this.graph.vis.node());","    t = d3.event.changedTouches;","    if (this.dragged) {","      if (this.series.tooltip) {","        elementRelativeposition = d3.mouse(this.graph._element);","        tip = d3.select(this.graph._element).select('.tooltip');","        svgNode = d3.select(this.graph._element).select('svg').node();","        offsetTop = this.graph.padding.top + this.graph.margin.top + svgNode.offsetTop;","        tip.style(\"top\", \"\" + (this.graph.y(this.dragged.y) + offsetTop) + \"px\");","      }","      this.renderer.transitionSpeed = 0;","      inverted = this.graph.y.invert(Math.max(0, Math.min(this.graph.height(), p[1])));","      value = Math.round(inverted * this.power) / this.power;","      this.dragged.y = value;","      this.onDrag(this.dragged, this.series, this.graph);","      return this.update();","    }","  };","","  Dragger.prototype._mouseUp = function() {","    var _ref4,","      _this = this;","","    if (((_ref4 = this.dragged) != null ? _ref4.y : void 0) == null) {","      return;","    }","    if (this.dragged) {","      this.afterDrag(this.dragged.d, this.dragged.y, this.dragged.i, this.series, this.graph);","    }","    this.renderer.seriesCanvas().selectAll('circle.editable').data(this.series.stack).attr(\"class\", function(d) {","      d.dragged = false;","      return \"editable\";","    });","    d3.select(\"body\").style(\"cursor\", \"auto\");","    this.dragged = null;","    if (this.series.tooltip) {","      Tactile.Tooltip.turnOffspotlight();","    }","    this.renderer.transitionSpeed = this.setSpeed;","    return this.update();","  };","","  Dragger.prototype.update = function() {","    return this.renderer.render();","  };","","  Dragger.prototype._appendCircles = function(nodes) {","    var circs, renderer,","      _this = this;","","    renderer = this.renderer;","    circs = this.renderer.seriesCanvas().selectAll('circle').data(this.series.stack);","    circs.enter().append(\"svg:circle\").style('display', 'none');","    circs.attr(\"r\", 4).attr(\"clip-path\", \"url(#scatter-clip)\").attr(\"class\", function(d, i) {","      return [(d === renderer.active ? \"active\" : void 0), (renderer.utils.ourFunctor(renderer.series.isEditable, d, i) ? \"editable\" : void 0)].join(' ');","    }).attr(\"fill\", function(d) {","      if (d.dragged || d === renderer.active) {","        return 'white';","      } else {","        return _this.series.color;","      }","    }).attr(\"stroke\", function(d) {","      if (d.dragged || d === renderer.active) {","        return _this.series.color;","      } else {","        return 'white';","      }","    }).attr(\"stroke-width\", '2').attr('id', function(d, i) {","      return \"node-\" + i + \"-\" + d.x;","    }).style(\"cursor\", function(d, i) {","      if (renderer.utils.ourFunctor(_this.series.isEditable, d, i)) {","        return \"ns-resize\";","      } else {","        return \"auto\";","      }","    });","    circs.transition().duration(this.timesRendered++ === 0 ? 0 : this.renderer.transitionSpeed).attr(\"cx\", function(d) {","      return _this.graph.x(d.x);","    }).attr(\"cy\", function(d) {","      return _this.graph.y(d.y);","    });","    nodes.on('mouseover.show-dragging-circle', function(d, i, el) {","      var circ;","","      renderer.seriesCanvas().selectAll('circle:not(.active)').style('display', 'none');","      circ = renderer.seriesCanvas().select(\"#node-\" + i + \"-\" + d.x);","      return circ.style('display', '');","    });","    circs.tooltip(function(d, i) {","      return {","        graph: _this.graph,","        text: _this.series.tooltip(d),","        circleOnHover: true,","        gravity: \"right\"","      };","    });","    return renderer.seriesCanvas().selectAll('circle.editable');","  };","","  return Dragger;","","})();","","Tactile.FixturesTime = FixturesTime = (function() {","  function FixturesTime() {","    var _this = this;","","    this.tzOffset = new Date().getTimezoneOffset() * 60;","    this.months = [\"Jan\", \"Feb\", \"Mar\", \"Apr\", \"May\", \"Jun\", \"Jul\", \"Aug\", \"Sep\", \"Oct\", \"Nov\", \"Dec\"];","    this.units = [","      {","        name: \"decade\",","        seconds: 86400 * 365.25 * 10,","        formatter: function(d) {","          return parseInt(d.getUTCFullYear() / 10) * 10;","        }","      }, {","        name: \"year\",","        seconds: 86400 * 365.25,","        formatter: function(d) {","          return d.getUTCFullYear();","        }","      }, {","        name: \"month\",","        seconds: 86400 * 30.5,","        formatter: function(d) {","          return _this.months[d.getUTCMonth()];","        }","      }, {","        name: \"week\",","        seconds: 86400 * 7,","        formatter: function(d) {","          return _this.formatDate(d);","        }","      }, {","        name: \"day\",","        seconds: 86400,","        formatter: function(d) {","          return d.getUTCDate();","        }","      }, {","        name: \"6 hour\",","        seconds: 3600 * 6,","        formatter: function(d) {","          return _this.formatTime(d);","        }","      }, {","        name: \"hour\",","        seconds: 3600,","        formatter: function(d) {","          return _this.formatTime(d);","        }","      }, {","        name: \"15 minute\",","        seconds: 60 * 15,","        formatter: function(d) {","          return _this.formatTime(d);","        }","      }, {","        name: \"minute\",","        seconds: 60,","        formatter: function(d) {","          return d.getUTCMinutes();","        }","      }, {","        name: \"15 second\",","        seconds: 15,","        formatter: function(d) {","          return d.getUTCSeconds() + \"s\";","        }","      }, {","        name: \"second\",","        seconds: 1,","        formatter: function(d) {","          return d.getUTCSeconds() + \"s\";","        }","      }","    ];","  }","","  FixturesTime.prototype.unit = function(unitName) {","    return this.units.filter(function(unit) {","      return unitName === unit.name;","    }).shift();","  };","","  FixturesTime.prototype.formatDate = function(d) {","    return d.toUTCString().match(/, (\\w+ \\w+ \\w+)/)[1];","  };","","  FixturesTime.prototype.formatTime = function(d) {","    return d.toUTCString().match(/(\\d+:\\d+):/)[1];","  };","","  FixturesTime.prototype.ceil = function(time, unit) {","    var nearFuture, rounded;","","    if (unit.name === \"year\") {","      nearFuture = new Date((time + unit.seconds - 1) * 1000);","      rounded = new Date(0);","      rounded.setUTCFullYear(nearFuture.getUTCFullYear());","      rounded.setUTCMonth(0);","      rounded.setUTCDate(1);","      rounded.setUTCHours(0);","      rounded.setUTCMinutes(0);","      rounded.setUTCSeconds(0);","      rounded.setUTCMilliseconds(0);","      return rounded.getTime() / 1000;","    }","    return Math.ceil(time / unit.seconds) * unit.seconds;","  };","","  return FixturesTime;","","})();","","Tactile.GaugeRenderer = GaugeRenderer = (function(_super) {","  __extends(GaugeRenderer, _super);","","  function GaugeRenderer() {","    _ref4 = GaugeRenderer.__super__.constructor.apply(this, arguments);","    return _ref4;","  }","","  GaugeRenderer.prototype.name = \"gauge\";","","  GaugeRenderer.prototype.specificDefaults = {","    cartesian: false","  };","","  GaugeRenderer.prototype.render = function() {","    var angleRange, arcs, arcsInner, innerArc, lineData, maxAngle, minAngle, originTranslate, outerArc, pg, plotAngle, plotValue, pointer, pointerHeadLength, pointerLine, pointerTailLength, pointerWidth, r, ringInset, ringWidth, scale, totalSizeDivide, translateHeight, translateWidth;","","    scale = d3.scale.linear().range([0, 1]).domain(this.domain());","    ringInset = 0.300;","    ringWidth = 0.750;","    pointerWidth = 0.100;","    pointerTailLength = 0.015;","    pointerHeadLength = 0.900;","    totalSizeDivide = 1.3;","    this.bottomOffset = 0.75;","    minAngle = -85;","    maxAngle = 85;","    angleRange = maxAngle - minAngle;","    plotValue = this.value;","    r = Math.round(this.graph.height() / totalSizeDivide);","    translateWidth = (this.graph.width()) / 2;","    translateHeight = r;","    originTranslate = \"translate(\" + translateWidth + \", \" + translateHeight + \")\";","    outerArc = d3.svg.arc().outerRadius(r * ringWidth).innerRadius(r * ringInset).startAngle(this.graph._deg2rad(minAngle)).endAngle(this.graph._deg2rad(minAngle + angleRange));","    arcs = this.graph.vis.append(\"g\").attr(\"class\", \"gauge arc\").attr(\"transform\", originTranslate);","    arcs.selectAll(\"path\").data([1]).enter().append(\"path\").attr(\"d\", outerArc);","    plotAngle = minAngle + (scale(plotValue) * angleRange);","    innerArc = d3.svg.arc().outerRadius(r * ringWidth).innerRadius(r * ringInset).startAngle(this.graph._deg2rad(minAngle)).endAngle(this.graph._deg2rad(plotAngle));","    arcsInner = this.graph.vis.append(\"g\").attr(\"class\", \"gauge arc-value\").attr(\"transform\", originTranslate);","    arcsInner.selectAll(\"path\").data([1]).enter().append(\"path\").attr(\"d\", innerArc);","    lineData = [[r * pointerWidth / 2, 0], [0, -(r * pointerHeadLength)], [-(r * pointerWidth / 2), 0], [0, r * pointerTailLength], [r * pointerWidth / 2, 0]];","    pointerLine = d3.svg.line().interpolate(\"monotone\");","    pg = this.graph.vis.append(\"g\").data([lineData]).attr(\"class\", \"gauge pointer\").attr(\"transform\", originTranslate);","    pointer = pg.append(\"path\").attr(\"d\", pointerLine);","    pointer.transition().duration(250).attr(\"transform\", \"rotate(\" + plotAngle + \")\");","    this.graph.vis.append(\"svg:circle\").attr(\"r\", this.graph.width() / 30).attr(\"class\", \"gauge pointer-circle\").style(\"opacity\", 1).attr(\"transform\", originTranslate);","    this.graph.vis.append(\"svg:circle\").attr(\"r\", this.graph.width() / 90).attr('class', 'gauge pointer-nail').style(\"opacity\", 1).attr('transform', originTranslate);","    if (this.series.labels) {","      return this.renderLabels();","    }","  };","","  GaugeRenderer.prototype.renderLabels = function() {","    this.graph.vis.append(\"text\").attr(\"class\", \"gauge label\").text(this.min).attr(\"transform\", \"translate(\" + (0.1 * this.graph.width()) + \",      \" + (1.15 * this.graph.height() * this.bottomOffset) + \")\");","    this.graph.vis.append(\"text\").attr(\"class\", \"gauge label\").text(this.value).attr(\"transform\", \"translate(\" + ((this.graph.width() - this.graph.margin.right) / 1.95) + \", \" + (1.20 * this.graph.height() * this.bottomOffset) + \")\");","    return this.graph.vis.append(\"text\").attr(\"class\", \"gauge label\").text(this.max).attr(\"transform\", \"translate(\" + (0.90 * this.graph.width()) + \",      \" + (1.15 * this.graph.height() * this.bottomOffset) + \")\");","  };","","  GaugeRenderer.prototype.domain = function() {","    this.value = this.series.stack[0].value;","    this.min = this.series.stack[0].min;","    this.max = this.series.stack[0].max;","    return [this.min, this.max];","  };","","  return GaugeRenderer;","","})(RendererBase);","","Tactile.LineRenderer = LineRenderer = (function(_super) {","  __extends(LineRenderer, _super);","","  function LineRenderer() {","    this.render = __bind(this.render, this);    _ref5 = LineRenderer.__super__.constructor.apply(this, arguments);","    return _ref5;","  }","","  LineRenderer.prototype.name = \"line\";","","  LineRenderer.prototype.specificDefaults = {","    unstack: true,","    fill: false,","    stroke: true,","    dotSize: 5","  };","","  LineRenderer.prototype.seriesPathFactory = function() {","    var _this = this;","","    return d3.svg.line().x(function(d) {","      return _this.graph.x(d.x);","    }).y(function(d) {","      return _this.graph.y(d.y);","    }).interpolate(this.graph.interpolation).tension(this.tension);","  };","","  LineRenderer.prototype.initialize = function() {","    LineRenderer.__super__.initialize.apply(this, arguments);","    this.dragger = new Dragger({","      renderer: this","    });","    this.timesRendered = 0;","    if (this.series.dotSize != null) {","      return this.dotSize = this.series.dotSize;","    }","  };","","  LineRenderer.prototype.render = function() {","    var circ, newCircs, _ref6, _ref7,","      _this = this;","","    LineRenderer.__super__.render.call(this);","    if (this.series.disabled) {","      this.seriesCanvas().selectAll('circle').data(this.series.stack).remove();","      return;","    }","    circ = this.seriesCanvas().selectAll('circle').data(this.series.stack);","    newCircs = circ.enter().append(\"svg:circle\").on(\"click\", this.setActive);","    if ((_ref6 = this.dragger) != null) {","      _ref6.makeHandlers(newCircs);","    }","    if ((_ref7 = this.dragger) != null) {","      _ref7.updateDraggedNode();","    }","    circ.transition().duration(this.timesRendered++ === 0 ? 0 : this.transitionSpeed).attr(\"cx\", function(d) {","      return _this.graph.x(d.x);","    }).attr(\"cy\", function(d) {","      return _this.graph.y(d.y);","    }).attr(\"r\", function(d) {","      if (\"r\" in d) {","        return d.r;","      } else {","        if (d.dragged || d === _this.active) {","          return _this.dotSize + 1;","        } else {","          return _this.dotSize;","        }","      }","    }).attr(\"clip-path\", \"url(#scatter-clip)\").attr(\"class\", function(d, i) {","      return [(d === _this.active ? \"active\" : void 0), (_this.utils.ourFunctor(_this.series.isEditable, d, i) ? \"editable\" : void 0)].join(' ');","    }).attr(\"fill\", function(d) {","      if (d.dragged || d === _this.active) {","        return 'white';","      } else {","        return _this.series.color;","      }","    }).attr(\"stroke\", function(d) {","      if (d.dragged || d === _this.active) {","        return _this.series.color;","      } else {","        return 'white';","      }","    }).attr(\"stroke-width\", this.dotSize / 2 || 2);","    circ.style(\"cursor\", function(d, i) {","      if (_this.utils.ourFunctor(_this.series.isEditable, d, i)) {","        return \"ns-resize\";","      } else {","        return \"auto\";","      }","    });","    circ.exit().remove();","    if (this.series.tooltip) {","      return circ.tooltip(function(d, i) {","        return {","          circleColor: _this.series.color,","          graph: _this.graph,","          text: _this.series.tooltip(d),","          circleOnHover: true,","          gravity: \"right\"","        };","      });","    }","  };","","  return LineRenderer;","","})(DraggableRenderer);","","Tactile.RangeSlider = RangeSlider = (function() {","  function RangeSlider(options) {","    this.updateGraph = __bind(this.updateGraph, this);","    var _this = this;","","    this.element = options.element;","    this.graph = options.graph;","    this.timeSliderClass = options.sliderClass;","    this.updateCallback = options.updateCallback || function() {};","    this.initCallback = options.updateCallback || function() {};","    $(function() {","      var sliderContainer, values;","","      values = options.values || [_this.graph.dataDomain()[0], _this.graph.dataDomain()[1]];","      _this.initCallback(values, _this.element);","      _this.updateGraph(values);","      if (_this.timeSliderClass) {","        sliderContainer = _this.element.find(_this.timeSliderClass);","      } else {","        sliderContainer = _this.element;","      }","      return sliderContainer.slider({","        range: true,","        min: _this.graph.dataDomain()[0],","        max: _this.graph.dataDomain()[1],","        values: values,","        slide: function(event, ui) {","          _this.updateGraph(ui.values);","          if (_this.graph.dataDomain()[0] === ui.values[0]) {","            _this.graph.window.xMin = void 0;","          }","          if (_this.graph.dataDomain()[1] === ui.values[1]) {","            return _this.graph.window.xMax = void 0;","          }","        }","      });","    });","    this.graph.onUpdate(function() {","      var values;","","      values = $(_this.element).slider(\"option\", \"values\");","      $(_this.element).slider(\"option\", \"min\", _this.graph.dataDomain()[0]);","      $(_this.element).slider(\"option\", \"max\", _this.graph.dataDomain()[1]);","      if (_this.graph.window.xMin === void 0) {","        values[0] = _this.graph.dataDomain()[0];","      }","      if (_this.graph.window.xMax === void 0) {","        values[1] = _this.graph.dataDomain()[1];","      }","      return $(_this.element).slider(\"option\", \"values\", values);","    });","  }","","  RangeSlider.prototype.updateGraph = function(values) {","    this.graph.window.xMin = values[0];","    this.graph.window.xMax = values[1];","    this.updateCallback(values, this.element);","    return this.graph.update();","  };","","  return RangeSlider;","","})();","","Tactile.ScatterRenderer = ScatterRenderer = (function(_super) {","  __extends(ScatterRenderer, _super);","","  function ScatterRenderer() {","    _ref6 = ScatterRenderer.__super__.constructor.apply(this, arguments);","    return _ref6;","  }","","  ScatterRenderer.prototype.name = \"scatter\";","","  ScatterRenderer.prototype.specificDefaults = {","    fill: true,","    stroke: false","  };","","  ScatterRenderer.prototype.render = function() {","    var circ,","      _this = this;","","    circ = this.seriesCanvas().selectAll('circle').data(this.series.stack);","    circ.enter().append(\"svg:circle\").attr(\"cx\", function(d) {","      return _this.graph.x(d.x);","    }).attr(\"cy\", function(d) {","      return _this.graph.y(d.y);","    });","    circ.transition().duration(this.transitionSpeed).attr(\"cx\", function(d) {","      return _this.graph.x(d.x);","    }).attr(\"cy\", function(d) {","      return _this.graph.y(d.y);","    }).attr(\"r\", function(d) {","      if (\"r\" in d) {","        return d.r;","      } else {","        return _this.dotSize;","      }","    }).attr(\"fill\", this.series.color).attr(\"stroke\", 'white').attr(\"stroke-width\", '2');","    if (this.series.cssConditions) {","      circ.attr('class', function(d) {","        return _this.series.cssConditions(d);","      });","    }","    if (this.series.tooltip) {","      this.seriesCanvas().selectAll(\"circle\").tooltip(function(d, i) {","        return {","          graph: _this.graph,","          text: _this.series.tooltip(d),","          mousemove: true,","          gravity: \"right\",","          displacement: [-10, 0]","        };","      });","    }","    return circ.exit().remove();","  };","","  return ScatterRenderer;","","})(RendererBase);","","Tactile.Chart = Chart = (function() {","  Chart.prototype._renderers = {","    'gauge': GaugeRenderer,","    'column': ColumnRenderer,","    'line': LineRenderer,","    'area': AreaRenderer,","    'scatter': ScatterRenderer,","    'donut': DonutRenderer","  };","","  Chart.prototype.margin = {","    top: 20,","    right: 20,","    bottom: 20,","    left: 20","  };","","  Chart.prototype.padding = {","    top: 10,","    right: 10,","    bottom: 10,","    left: 10","  };","","  Chart.prototype.interpolation = 'monotone';","","  Chart.prototype.offset = 'zero';","","  Chart.prototype.min = void 0;","","  Chart.prototype.max = void 0;","","  Chart.prototype.transitionSpeed = 200;","","  Chart.prototype.defaultHeight = 400;","","  Chart.prototype.defaultWidth = 730;","","  Chart.prototype.defaultAxes = {","    x: {","      dimension: \"time\",","      frame: [void 0, void 0]","    },","    y: {","      dimension: \"linear\",","      frame: [void 0, void 0]","    }","  };","","  function Chart(args) {","    var _this = this;","","    if (args == null) {","      args = {};","    }","    this._slice = __bind(this._slice, this);","    this.discoverRange = __bind(this.discoverRange, this);","    this.renderers = [];","    this.series = [];","    this.window = {};","    this.updateCallbacks = [];","    this._axes = {};","    this.setSize({","      width: args.width || this.defaultWidth,","      height: args.height || this.defaultHeight","    });","    if (args.width != null) {","      delete args.width;","    }","    if (args.height != null) {","      delete args.height;","    }","    _.each(args, function(val, key) {","      return _this[key] = val;","    });","    this.addSeries(args.series, {","      overwrite: true","    });","  }","","  Chart.prototype.addSeries = function(series, options) {","    var newSeries, seriesDefaults,","      _this = this;","","    if (options == null) {","      options = {","        overwrite: false","      };","    }","    if (!series) {","      return;","    }","    if (!_.isArray(series)) {","      series = [series];","    }","    seriesDefaults = {","      dataTransform: function(d) {","        return d;","      }","    };","    newSeries = _.map(series, function(s) {","      return _.extend({}, seriesDefaults, s);","    });","    if (options.overwrite) {","      this.series = newSeries;","    } else {","      this.series = this.series.concat(newSeries);","    }","    _.each(newSeries, function(s) {","      s.disable = function() {","        return this.disabled = true;","      };","      s.enable = function() {","        return this.disabled = false;","      };","      return s.toggle = function() {","        return this.disabled = !this.disabled;","      };","    });","    this.initRenderers(newSeries);","    return this;","  };","","  Chart.prototype.initSeriesStackData = function(options) {","    var i, layout, seriesData, stackedData,","      _this = this;","","    if (options == null) {","      options = {","        overwrite: false","      };","    }","    if (this.dataInitialized && !options.overwrite) {","      return;","    }","    this.series.active = function() {","      return _this.series.filter(function(s) {","        return !s.disabled;","      });","    };","    seriesData = this.series.map(function(d) {","      return _this._data.map(d.dataTransform);","    });","    layout = d3.layout.stack();","    layout.offset(this.offset);","    stackedData = layout(seriesData);","    i = 0;","    this.series.forEach(function(series) {","      return series.stack = stackedData[i++];","    });","    return this.dataInitialized = true;","  };","","  Chart.prototype.render = function() {","    var stackedData,","      _this = this;","","    if (this.renderers === void 0 || _.isEmpty(this.renderers) || this._allSeriesDisabled()) {","      return;","    }","    this.initSeriesStackData();","    this._setupCanvas();","    stackedData = this.stackData();","    _.each(this.renderers, function(renderer) {","      _this.discoverRange(renderer);","      return renderer.render();","    });","    return this.updateCallbacks.forEach(function(callback) {","      return callback();","    });","  };","","  Chart.prototype.update = function() {","    return this.render();","  };","","  Chart.prototype.discoverRange = function(renderer) {","    var barWidth, domain, rangeEnd, rangeStart, xframe, yframe, _ref10, _ref11, _ref12, _ref13, _ref14, _ref7, _ref8, _ref9;","","    domain = renderer.domain();","    if (renderer.cartesian) {","      if (this._containsColumnChart()) {","        barWidth = this.width() / renderer.series.stack.length / 2;","        rangeStart = barWidth;","        rangeEnd = this.width() - barWidth;","      }","      xframe = [(((_ref7 = this._axes.x) != null ? (_ref8 = _ref7.frame) != null ? _ref8[0] : void 0 : void 0) ? this._axes.x.frame[0] : domain.x[0]), (((_ref9 = this._axes.x) != null ? (_ref10 = _ref9.frame) != null ? _ref10[1] : void 0 : void 0) ? this._axes.x.frame[1] : domain.x[1])];","      yframe = [(((_ref11 = this._axes.y) != null ? (_ref12 = _ref11.frame) != null ? _ref12[0] : void 0 : void 0) ? this._axes.y.frame[0] : domain.y[0]), (((_ref13 = this._axes.y) != null ? (_ref14 = _ref13.frame) != null ? _ref14[1] : void 0 : void 0) ? this._axes.y.frame[1] : domain.y[1])];","      this.x = d3.scale.linear().domain(xframe).range([rangeStart || 0, rangeEnd || this.width()]);","      this.y = d3.scale.linear().domain(yframe).range([this.height(), 0]);","      return this.y.magnitude = d3.scale.linear().domain([domain.y[0] - domain.y[0], domain.y[1] - domain.y[0]]).range([0, this.height()]);","    }","  };","","  Chart.prototype.initAxis = function(axis) {","    if (!this._allRenderersCartesian()) {","      return;","    }","    switch (axis.dimension) {","      case \"linear\":","        return new Tactile.AxisY(_.extend({}, axis.options, {","          graph: this","        }));","      case \"time\":","        return new Tactile.AxisTime(_.extend({}, axis.options, {","          graph: this","        }));","      default:","        return console.log(\"ERROR:\" + axis.dimension + \" is not currently implemented\");","    }","  };","","  Chart.prototype.dataDomain = function() {","    var data;","","    data = this.renderers[0].series.stack;","    return [data[0].x, data.slice(-1).shift().x];","  };","","  Chart.prototype.stackData = function() {","    var layout, seriesData, stackedData,","      _this = this;","","    seriesData = this.series.active().map(function(d) {","      return _this._data.map(d.dataTransform);","    });","    layout = d3.layout.stack();","    layout.offset(this.offset);","    stackedData = layout(seriesData);","    return this.stackedData = stackedData;","  };","","  Chart.prototype.setSize = function(args) {","    var elHeight, elWidth, _ref7;","","    if (args == null) {","      args = {};","    }","    elWidth = $(this._element).width();","    elHeight = $(this._element).height();","    this.outerWidth = args.width || elWidth || this.defaultWidth;","    this.outerHeight = args.height || elHeight || this.defaultHeight;","    this.marginedWidth = this.outerWidth - this.margin.left - this.margin.right;","    this.marginedHeight = this.outerHeight - this.margin.top - this.margin.bottom;","    this.innerWidth = this.marginedWidth - this.padding.left - this.padding.right;","    this.innerHeight = this.marginedHeight - this.padding.top - this.padding.bottom;","    return (_ref7 = this.vis) != null ? _ref7.attr('width', this.innerWidth).attr('height', this.innerHeight) : void 0;","  };","","  Chart.prototype.onUpdate = function(callback) {","    return this.updateCallbacks.push(callback);","  };","","  Chart.prototype.initRenderers = function(series) {","    var renderersSize,","      _this = this;","","    renderersSize = this.renderers.length;","    return _.each(series, function(s, index) {","      var name, r, rendererClass, rendererOptions;","","      name = s.renderer;","      if (!_this._renderers[name]) {","        throw \"couldn't find renderer \" + name;","      }","      rendererClass = _this._renderers[name];","      rendererOptions = _.extend({}, {","        graph: _this,","        transitionSpeed: _this.transitionSpeed,","        series: s,","        rendererIndex: index + renderersSize","      });","      r = new rendererClass(rendererOptions);","      return _this.renderers.push(r);","    });","  };","","  Chart.prototype.renderersByType = function(name) {","    return this.renderers.filter(function(r) {","      return r.name === name;","    });","  };","","  Chart.prototype.stackTransition = function() {","    return _.each(this.renderersByType('column'), function(r) {","      return r.stackTransition();","    });","  };","","  Chart.prototype.unstackTransition = function() {","    return _.each(this.renderersByType('column'), function(r) {","      return r.unstackTransition();","    });","  };","","  Chart.prototype.element = function(val) {","    if (!val) {","      return this._element;","    }","    this._element = val;","    this._setupCanvas();","    return this;","  };","","  Chart.prototype.height = function(val) {","    if (!val) {","      return this.innerHeight || this.defaultHeight;","    }","    this.setSize({","      width: this.outerWidth,","      height: val","    });","    return this;","  };","","  Chart.prototype.width = function(val) {","    if (!val) {","      return this.innerWidth || this.defaultWidth;","    }","    this.setSize({","      width: val,","      height: this.outerHeight","    });","    return this;","  };","","  Chart.prototype.data = function(val) {","    if (!val) {","      return this._data;","    }","    this._data = val;","    this.dataInitialized = false;","    return this;","  };","","  Chart.prototype.axes = function(args, options) {","    var _this = this;","","    if (!args) {","      return this._axes;","    }","    _.each(['x', 'y'], function(k) {","      var _ref7, _ref8;","","      if (args[k] != null) {","        _this._axes[k] = {","          frame: ((_ref7 = args[k]) != null ? _ref7.frame : void 0) || _this.defaultAxes[k].frame,","          dimension: ((_ref8 = args[k]) != null ? _ref8.dimension : void 0) || _this.defaultAxes[k].dimension","        };","        return _this.initAxis(_this._axes[k]);","      }","    });","    return this;","  };","","  Chart.prototype._setupCanvas = function() {","    var clip, scatterClip;","","    $(this._element).addClass('graph-container');","    this.svg = this._findOrAppend({","      what: 'svg',","      \"in\": d3.select(this._element)","    });","    this.svg.attr('width', this.outerWidth).attr('height', this.outerHeight);","    this.vis = this._findOrAppend({","      what: 'g',","      \"in\": this.svg","    }).attr(\"transform\", \"translate(\" + this.margin.left + \",\" + this.margin.top + \")\");","    this.vis = this._findOrAppend({","      what: 'g',","      \"in\": this.vis","    }).attr(\"class\", \"outer-canvas\").attr(\"width\", this.marginedWidth).attr(\"height\", this.marginedHeight);","    this.vis = this._findOrAppend({","      what: 'g',","      \"in\": this.vis","    }).attr(\"transform\", \"translate(\" + this.padding.left + \",\" + this.padding.top + \")\").attr(\"class\", \"inner-canvas\");","    clip = this._findOrAppend({","      what: 'clipPath',","      selector: '#clip',","      \"in\": this.vis","    }).attr(\"id\", \"clip\");","    this._findOrAppend({","      what: 'rect',","      \"in\": clip","    }).attr(\"width\", this.width()).attr(\"height\", this.height() + 4).attr(\"transform\", \"translate(0,-2)\");","    scatterClip = this._findOrAppend({","      what: 'clipPath',","      selector: '#scatter-clip',","      \"in\": this.vis","    }).attr(\"id\", \"scatter-clip\");","    return this._findOrAppend({","      what: 'rect',","      \"in\": scatterClip","    }).attr(\"width\", this.width() + 12).attr(\"height\", this.height() + 12).attr(\"transform\", \"translate(-6,-6)\");","  };","","  Chart.prototype._findOrAppend = function(options) {","    var element, found, node, selector;","","    element = options[\"in\"];","    node = options.what;","    selector = options.selector || node;","    found = element.select(selector);","    if (found != null ? found[0][0] : void 0) {","      return found;","    } else {","      return element.append(node);","    }","  };","","  Chart.prototype._slice = function(d) {","    var _ref7;","","    if (!this._allRenderersCartesian()) {","      return true;","    }","    return (this.timeframe[0] <= (_ref7 = d.x) && _ref7 <= this.timeframe[1]);","  };","","  Chart.prototype._deg2rad = function(deg) {","    return deg * Math.PI / 180;","  };","","  Chart.prototype._hasDifferentRenderers = function() {","    return _.uniq(_.map(this.series, function(s) {","      return s.renderer;","    })).length > 1;","  };","","  Chart.prototype._containsColumnChart = function() {","    return _.any(this.renderers, function(r) {","      return r.name === 'column';","    });","  };","","  Chart.prototype._allRenderersCartesian = function() {","    return _.every(this.renderers, function(r) {","      return r.cartesian === true;","    });","  };","","  Chart.prototype._allSeriesDisabled = function() {","    return _.every(this.series, function(s) {","      return s.disabled === true;","    });","  };","","  return Chart;","","})();",""];
_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 2);
var AreaRenderer, AxisTime, AxisY, Chart, ColumnRenderer, DonutRenderer, DraggableRenderer, Dragger, FixturesTime, GaugeRenderer, LineRenderer, RangeSlider, RendererBase, ScatterRenderer, Tactile, Tooltip, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6, __bind = function(fn, me) {
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 3);
    return function() {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 3);
        return fn.apply(me, arguments);
    };
}, __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 5);
    for (var key in parent) {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 5);
        if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 5, __hasProp.call(parent, key))) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 5);
            child[key] = parent[key];
        }
    }
    function ctor() {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 5);
        this.constructor = child;
    }
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 5);
    ctor.prototype = parent.prototype;
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 5);
    child.prototype = new ctor;
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 5);
    child.__super__ = parent.prototype;
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 5);
    return child;
};

_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 7);
Tactile = window.Tactile || {};

_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 9);
window.Tactile = Tactile;

_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 11);
Tactile.RendererBase = RendererBase = function() {
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 12);
    RendererBase.prototype.defaults = {
        cartesian: true,
        tension: .95,
        strokeWidth: 3,
        unstack: true,
        dotSize: 5,
        opacity: 1,
        stroke: false,
        fill: false
    };
    function RendererBase(options) {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 24);
        if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 24, options == null)) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 25);
            options = {};
        }
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 27);
        this.render = __bind(this.render, this);
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 28);
        this.graph = options.graph;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 29);
        this.tension = options.tension || this.tension;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 30);
        this.configure(options);
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 31);
        if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 31, typeof this.initialize === "function")) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 32);
            this.initialize(options);
        }
    }
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 36);
    RendererBase.prototype.seriesPathFactory = function() {};
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 38);
    RendererBase.prototype.seriesStrokeFactory = function() {};
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 40);
    RendererBase.prototype.domain = function() {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 41);
        var stackedData, topSeriesData, values, xMax, xMin, yMax, yMin, _this = this;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 44);
        values = [];
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 45);
        stackedData = this.graph.stackedData || this.graph.stackData();
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 46);
        topSeriesData = this.unstack ? stackedData : [ stackedData.slice(-1).shift() ];
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 47);
        topSeriesData.forEach(function(series) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 48);
            return series.forEach(function(d) {
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 49);
                if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 49, _this.unstack)) {
                    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 50);
                    return values.push(d.y);
                } else {
                    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 52);
                    return values.push(d.y + d.y0);
                }
            });
        });
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 56);
        xMin = stackedData[0][0].x;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 57);
        xMax = stackedData[0][stackedData[0].length - 1].x;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 58);
        yMin = this.graph.min === "auto" ? d3.min(values) : this.graph.min || 0;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 59);
        yMax = this.graph.max || d3.max(values);
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 60);
        return {
            x: [ xMin, xMax ],
            y: [ yMin, yMax ]
        };
    };
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 66);
    RendererBase.prototype.render = function() {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 67);
        var line;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 69);
        if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 69, this.series.disabled)) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 70);
            this.timesRendered = 0;
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 71);
            line = this.seriesCanvas().selectAll("path").data([ this.series.stack ]).remove();
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 72);
            return;
        }
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 74);
        line = this.seriesCanvas().selectAll("path").data([ this.series.stack ]);
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 75);
        line.enter().append("svg:path").attr("clip-path", "url(#clip)").attr("fill", this.fill ? this.series.color : "none").attr("stroke", this.stroke ? this.series.color : "none").attr("stroke-width", this.strokeWidth).style("opacity", this.opacity).attr("class", "" + (this.series.className || "") + " " + (this.series.color ? "" : "colorless"));
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 76);
        return line.transition().duration(this.transitionSpeed).attr("d", this.seriesPathFactory());
    };
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 79);
    RendererBase.prototype.seriesCanvas = function() {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 80);
        this._seriesCanvas || (this._seriesCanvas = this.graph.vis.selectAll("g#" + this._nameToId()).data([ this.series.stack ]).enter().append("g").attr("id", this._nameToId()).attr("class", this.name));
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 81);
        return this._seriesCanvas;
    };
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 84);
    RendererBase.prototype.configure = function(options) {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 85);
        var defaults, _this = this;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 88);
        if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 88, this.specificDefaults != null)) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 89);
            defaults = _.extend({}, this.defaults, this.specificDefaults);
        }
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 91);
        options = _.extend({}, defaults, options);
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 92);
        return _.each(options, function(val, key) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 93);
            return _this[key] = val;
        });
    };
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 97);
    RendererBase.prototype._nameToId = function() {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 98);
        var _ref;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 100);
        return (_ref = this.series.name) != null ? _ref.replace(/\s+/g, "-").toLowerCase() : void 0;
    };
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 103);
    return RendererBase;
}();

_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 107);
Tactile.DraggableRenderer = DraggableRenderer = function(_super) {
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 108);
    __extends(DraggableRenderer, _super);
    function DraggableRenderer() {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 111);
        this.decreaseEditableValue = __bind(this.decreaseEditableValue, this);
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 112);
        this.increaseEditableValue = __bind(this.increaseEditableValue, this);
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 113);
        this.setActive = __bind(this.setActive, this);
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 114);
        this.selectPerviousEditableValue = __bind(this.selectPerviousEditableValue, this);
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 115);
        this.selectNextEditableValue = __bind(this.selectNextEditableValue, this);
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 115);
        _ref = DraggableRenderer.__super__.constructor.apply(this, arguments);
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 116);
        return _ref;
    }
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 119);
    DraggableRenderer.prototype.initialize = function() {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 120);
        var _this = this;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 122);
        this.active = null;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 123);
        window.addEventListener("click", function() {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 124);
            _this.active = null;
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 125);
            return _this.render();
        }, true);
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 127);
        window.addEventListener("keyup", function(e) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 128);
            if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 128, _this.id)) {
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 129);
                clearInterval(_this.id);
            }
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 131);
            return _this.id = null;
        });
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 133);
        window.addEventListener("keydown", function(e) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 134);
            var decrease, increase;
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 136);
            switch (e.keyCode) {
              case 37:
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 138);
                return _this.selectPerviousEditableValue();
              case 39:
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 140);
                return _this.selectNextEditableValue();
              case 38:
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 142);
                increase = function() {
                    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 143);
                    return _this.increaseEditableValue();
                };
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 145);
                if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 145, !_this.id)) {
                    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 146);
                    _this.increaseEditableValue();
                    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 147);
                    if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 147, !_this.id)) {
                        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 148);
                        _this.id = setInterval(increase, 200);
                    }
                }
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 151);
                return e.preventDefault();
              case 40:
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 153);
                decrease = function() {
                    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 154);
                    return _this.decreaseEditableValue();
                };
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 156);
                if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 156, !_this.id)) {
                    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 157);
                    _this.decreaseEditableValue();
                    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 158);
                    if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 158, !_this.id)) {
                        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 159);
                        _this.id = setInterval(decrease, 200);
                    }
                }
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 162);
                return e.preventDefault();
            }
        });
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 165);
        return this.utils = new Tactile.Utils;
    };
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 168);
    DraggableRenderer.prototype.selectNextEditableValue = function() {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 169);
        var i, setNext;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 171);
        if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 171, !this.active)) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 172);
            return;
        }
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 174);
        setNext = false;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 175);
        i = 0;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 176);
        while (i < this.series.stack.length) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 177);
            if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 177, this.active === this.series.stack[i])) {
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 178);
                if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 178, this.active === this.series.stack[i])) {
                    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 179);
                    setNext = true;
                }
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 181);
                i++;
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 182);
                continue;
            }
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 184);
            if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 184, this.utils.ourFunctor(this.series.isEditable, this.series.stack[i], i)) && _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 184, setNext)) {
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 185);
                this.active = this.series.stack[i];
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 186);
                break;
            }
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 188);
            i++;
        }
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 190);
        return this.render();
    };
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 193);
    DraggableRenderer.prototype.selectPerviousEditableValue = function() {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 194);
        var i, setNext;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 196);
        if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 196, !this.active)) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 197);
            return;
        }
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 199);
        setNext = false;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 200);
        i = this.series.stack.length - 1;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 201);
        while (i >= 0) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 202);
            if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 202, this.active === this.series.stack[i])) {
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 203);
                if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 203, this.active === this.series.stack[i])) {
                    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 204);
                    setNext = true;
                }
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 206);
                i--;
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 207);
                continue;
            }
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 209);
            if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 209, this.utils.ourFunctor(this.series.isEditable, this.series.stack[i], i)) && _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 209, setNext)) {
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 210);
                this.active = this.series.stack[i];
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 211);
                break;
            }
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 213);
            i--;
        }
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 215);
        return this.render();
    };
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 218);
    DraggableRenderer.prototype.setActive = function(d, i) {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 219);
        if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 219, !this.utils.ourFunctor(this.series.isEditable, d, i))) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 220);
            return;
        }
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 222);
        this.active = d;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 223);
        return this.render();
    };
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 226);
    DraggableRenderer.prototype.increaseEditableValue = function() {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 227);
        console.log("increaseEditableValue");
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 228);
        if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 228, !this.active)) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 229);
            return;
        }
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 231);
        this.active.y++;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 232);
        return this.render();
    };
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 235);
    DraggableRenderer.prototype.decreaseEditableValue = function() {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 236);
        console.log("decreaseEditableValue");
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 237);
        if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 237, !this.active)) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 238);
            return;
        }
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 240);
        this.active.y--;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 241);
        return this.render();
    };
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 244);
    return DraggableRenderer;
}(RendererBase);

_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 248);
if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 248, !window.Tactile)) {
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 249);
    window.Tactile = {};
}

_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 252);
window.Tactile.Tooltip = Tooltip = function() {
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 253);
    Tooltip._spotlightMode = false;
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 255);
    Tooltip.turnOffspotlight = function() {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 256);
        return Tooltip._spotlightMode = false;
    };
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 259);
    Tooltip.spotlightOn = function(d) {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 260);
        return Tooltip._spotlightMode = true;
    };
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 263);
    Tooltip.getSpotlight = function() {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 264);
        return Tooltip._spotlightMode;
    };
    function Tooltip(el, options) {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 268);
        this.el = el;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 269);
        this.options = options;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 270);
        this.el = d3.select(this.el);
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 271);
        this.annotate();
    }
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 274);
    Tooltip.prototype.appendTooltip = function() {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 275);
        var chartContainer, tip;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 277);
        chartContainer = d3.select(this.options.graph._element);
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 278);
        if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 278, Tooltip._spotlightMode) && _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 278, this.el.node().classList.contains("active"))) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 279);
            tip = chartContainer.select(".tooltip");
        } else {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 281);
            chartContainer.selectAll(".tooltip").remove();
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 282);
            tip = chartContainer.append("div").classed("tooltip", true);
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 283);
            tip.append("div").html(this.options.text).classed("tooltip-inner", true);
        }
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 285);
        return tip;
    };
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 288);
    Tooltip.prototype.annotate = function() {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 289);
        var chartContainer, mouseMove, moveTip, _this = this;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 292);
        chartContainer = this.el.node().nearestViewportElement;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 293);
        if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 293, this.options.tooltipCircleContainer)) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 294);
            this.tooltipCircleContainer = this.options.tooltipCircleContainer;
        } else {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 295);
            if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 295, this.options.circleOnHover)) {
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 296);
                this.tooltipCircleContainer = this.el.node().parentNode;
            }
        }
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 298);
        moveTip = function(tip) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 299);
            var center, hoveredNode, svgNode;
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 301);
            center = [ 0, 0 ];
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 302);
            if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 302, _this.options.placement === "mouse")) {
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 303);
                center = d3.mouse(_this.options.graph._element);
            } else {
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 305);
                if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 305, _this.options.position)) {
                    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 306);
                    center[0] = _this.options.position[0];
                    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 307);
                    center[1] = _this.options.position[1];
                } else {
                    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 309);
                    svgNode = d3.select(_this.options.graph._element).select("svg").node();
                    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 310);
                    hoveredNode = _this.el.node().getBBox();
                    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 311);
                    center[0] = hoveredNode.x + svgNode.offsetLeft + hoveredNode.width / 2;
                    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 312);
                    center[1] = hoveredNode.y + svgNode.offsetTop;
                    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 313);
                    if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 313, _this.options.graph.series[0].renderer === "donut")) {
                        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 314);
                        center[0] = center[0] + _this.options.graph.series[0].height - 30;
                        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 315);
                        center[1] = center[1] + _this.options.graph.series[0].height - 30;
                    }
                }
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 318);
                if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 318, _this.el.node().tagName === "circle")) {
                    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 319);
                    center[1] += hoveredNode.height / 2 - 1;
                }
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 321);
                center[0] += _this.options.graph.margin.left;
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 322);
                center[0] += _this.options.graph.padding.left;
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 323);
                center[1] += _this.options.graph.margin.top;
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 324);
                center[1] += _this.options.graph.padding.top;
            }
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 326);
            if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 326, _this.options.displacement)) {
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 327);
                center[0] += _this.options.displacement[0];
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 328);
                center[1] += _this.options.displacement[1];
            }
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 330);
            return tip.style("left", "" + center[0] + "px").style("top", "" + center[1] + "px").style("display", "block");
        };
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 332);
        this.el.on("mouseover", function() {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 333);
            var inner, tip;
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 335);
            if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 335, Tooltip._spotlightMode)) {
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 336);
                if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 336, !_this.el.node().classList.contains("active"))) {
                    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 337);
                    return;
                }
            }
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 340);
            tip = _this.appendTooltip();
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 341);
            if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 341, _this.options.circleOnHover)) {
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 342);
                _this._appendTipCircle();
            }
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 344);
            tip.classed("annotation", true).classed(_this.options.gravity, true).style("display", "none");
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 345);
            if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 345, _this.options.fade)) {
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 346);
                tip.classed("fade", true);
            }
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 348);
            tip.append("div").attr("class", "arrow");
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 349);
            tip.select(".tooltip-inner").html(_this.options.text);
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 350);
            inner = function() {
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 351);
                return tip.classed("in", true);
            };
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 353);
            setTimeout(inner, 10);
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 354);
            tip.style("display", "");
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 355);
            return moveTip(tip);
        });
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 357);
        mouseMove = function() {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 358);
            return d3.select(".annotation").call(moveTip.bind(this));
        };
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 360);
        if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 360, this.options.mousemove)) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 361);
            this.el.on("mousemove", mouseMove);
        }
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 363);
        return this.el.on("mouseout", function() {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 364);
            var remover, tip;
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 366);
            if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 366, Tooltip._spotlightMode)) {
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 367);
                return;
            }
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 369);
            d3.select(_this.tooltipCircleContainer).selectAll("circle.tooltip-circle").remove();
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 370);
            if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 370, _this.el.node().tagName === "circle") && _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 370, _this.el.attr("class").search(/active/) === -1)) {
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 371);
                _this.el.classed("tip-hovered", false);
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 372);
                _this.el.attr("stroke", _this.el.attr("data-stroke-color"));
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 373);
                _this.el.attr("fill", _this.el.attr("data-fill-color"));
            }
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 375);
            tip = d3.selectAll(".annotation").classed("in", false);
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 376);
            remover = function() {
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 377);
                return tip.remove();
            };
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 379);
            return setTimeout(remover, 150);
        });
    };
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 383);
    Tooltip.prototype._appendTipCircle = function() {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 384);
        var hoveredNode, svgNode;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 386);
        hoveredNode = this.el.node().getBBox();
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 387);
        svgNode = d3.select(this.options.graph._element).select("svg").node();
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 388);
        if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 388, this.el.node().tagName === "circle")) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 389);
            if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 389, this.el.attr("class").search(/active/) === -1)) {
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 390);
                if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 390, !this.el.attr("data-stroke-color"))) {
                    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 391);
                    this.el.attr("data-stroke-color", this.el.attr("stroke"));
                }
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 393);
                if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 393, !this.el.attr("data-fill-color"))) {
                    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 394);
                    this.el.attr("data-fill-color", this.el.attr("fill"));
                }
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 396);
                this.el.attr("fill", this.el.attr("data-stroke-color"));
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 397);
                return this.el.attr("stroke", this.el.attr("data-fill-color"));
            }
        } else {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 400);
            return d3.select(this.tooltipCircleContainer).append("svg:circle").attr("cx", hoveredNode.x + svgNode.offsetLeft + hoveredNode.width / 2).attr("cy", hoveredNode.y + svgNode.offsetTop).attr("r", 4).attr("class", "tooltip-circle").attr("stroke", this.options.circleColor || "orange").attr("fill", "white").attr("stroke-width", "1");
        }
    };
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 404);
    return Tooltip;
}();

_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 408);
d3.selection.prototype.tooltip = function(f) {
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 409);
    var options, selection;
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 411);
    selection = this;
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 412);
    options = {};
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 413);
    return selection.each(function(d, i) {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 414);
        options = f.apply(this, arguments);
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 415);
        return new Tactile.Tooltip(this, options);
    });
};

_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 419);
if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 419, !window.Utils)) {
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 420);
    window.Utils = {};
}

_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 423);
window.Tactile.Utils = function() {
    function Utils() {}
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 426);
    Utils.prototype.ourFunctor = function() {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 427);
        if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 427, typeof arguments[0] === "function")) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 428);
            return arguments[0].apply(null, _.toArray(arguments).slice(1));
        } else {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 430);
            return arguments[0];
        }
    };
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 434);
    return Utils;
}();

_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 438);
Tactile.AreaRenderer = AreaRenderer = function(_super) {
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 439);
    __extends(AreaRenderer, _super);
    function AreaRenderer() {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 442);
        this._y0 = __bind(this._y0, this);
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 442);
        _ref1 = AreaRenderer.__super__.constructor.apply(this, arguments);
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 443);
        return _ref1;
    }
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 446);
    AreaRenderer.prototype.name = "area";
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 448);
    AreaRenderer.prototype.dotSize = 5;
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 450);
    AreaRenderer.prototype.specificDefaults = {
        unstack: true,
        fill: true,
        stroke: true,
        opacity: .15
    };
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 457);
    AreaRenderer.prototype._y0 = function(d) {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 458);
        if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 458, this.unstack)) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 459);
            return 0;
        } else {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 461);
            return d.y0;
        }
    };
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 465);
    AreaRenderer.prototype.initialize = function() {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 466);
        AreaRenderer.__super__.initialize.apply(this, arguments);
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 467);
        this.dragger = new Dragger({
            renderer: this
        });
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 470);
        this.timesRendered = 0;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 471);
        if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 471, this.series.dotSize != null)) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 472);
            return this.dotSize = this.series.dotSize;
        }
    };
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 476);
    AreaRenderer.prototype.seriesPathFactory = function() {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 477);
        var _this = this;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 479);
        return d3.svg.area().x(function(d) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 480);
            return _this.graph.x(d.x);
        }).y0(function(d) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 482);
            return _this.graph.y(_this._y0(d));
        }).y1(function(d) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 484);
            return _this.graph.y(d.y + _this._y0(d));
        }).interpolate(this.graph.interpolation).tension(this.tension);
    };
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 488);
    AreaRenderer.prototype.seriesStrokeFactory = function() {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 489);
        var _this = this;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 491);
        return d3.svg.line().x(function(d) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 492);
            return _this.graph.x(d.x);
        }).y(function(d) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 494);
            return _this.graph.y(d.y + _this._y0(d));
        }).interpolate(this.graph.interpolation).tension(this.tension);
    };
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 498);
    AreaRenderer.prototype.render = function() {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 499);
        var circ, newCircs, stroke, _ref2, _ref3, _this = this;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 502);
        AreaRenderer.__super__.render.call(this);
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 503);
        if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 503, this.series.disabled)) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 504);
            this.timesRendered = 0;
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 505);
            this.seriesCanvas().selectAll("path").remove();
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 506);
            this.seriesCanvas().selectAll("circle").remove();
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 507);
            return;
        }
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 509);
        stroke = this.seriesCanvas().selectAll("path.stroke").data([ this.series.stack ]);
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 510);
        stroke.enter().append("svg:path").attr("clip-path", "url(#clip)").attr("fill", "none").attr("stroke-width", "2").attr("stroke", this.series.color).attr("class", "stroke");
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 511);
        stroke.transition().duration(this.transitionSpeed).attr("d", this.seriesStrokeFactory());
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 512);
        circ = this.seriesCanvas().selectAll("circle").data(this.series.stack);
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 513);
        newCircs = circ.enter().append("svg:circle").on("click", this.setActive);
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 514);
        if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 514, (_ref2 = this.dragger) != null)) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 515);
            _ref2.makeHandlers(newCircs);
        }
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 517);
        if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 517, (_ref3 = this.dragger) != null)) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 518);
            _ref3.updateDraggedNode(circ);
        }
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 520);
        circ.transition().duration(this.timesRendered++ === 0 ? 0 : this.transitionSpeed).attr("cx", function(d) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 521);
            return _this.graph.x(d.x);
        }).attr("cy", function(d) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 523);
            return _this.graph.y(d.y);
        }).attr("r", function(d) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 525);
            if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 525, "r" in d)) {
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 526);
                return d.r;
            } else {
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 528);
                if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 528, d.dragged) || _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 528, d === _this.active)) {
                    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 529);
                    return _this.dotSize + 1;
                } else {
                    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 531);
                    return _this.dotSize;
                }
            }
        }).attr("clip-path", "url(#scatter-clip)").attr("class", function(d, i) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 535);
            return [ d === _this.active ? "active" : void 0, _this.utils.ourFunctor(_this.series.isEditable, d, i) ? "editable" : void 0 ].join(" ");
        }).attr("fill", function(d) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 537);
            if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 537, d.dragged) || _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 537, d === _this.active)) {
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 538);
                return "white";
            } else {
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 540);
                return _this.series.color;
            }
        }).attr("stroke", function(d) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 543);
            if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 543, d.dragged) || _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 543, d === _this.active)) {
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 544);
                return _this.series.color;
            } else {
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 546);
                return "white";
            }
        }).attr("stroke-width", this.dotSize / 2 || 2);
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 549);
        circ.style("cursor", function(d, i) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 550);
            if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 550, _this.utils.ourFunctor(_this.series.isEditable, d, i))) {
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 551);
                return "ns-resize";
            } else {
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 553);
                return "auto";
            }
        });
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 556);
        return circ.exit().remove();
    };
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 559);
    return AreaRenderer;
}(DraggableRenderer);

_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 563);
Tactile.AxisTime = AxisTime = function() {
    function AxisTime(args) {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 565);
        var _this = this;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 567);
        this.graph = args.graph;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 568);
        this.ticksTreatment = args.ticksTreatment || "plain";
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 569);
        this.fixedTimeUnit = args.timeUnit;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 570);
        this.marginTop = args.paddingBottom || 5;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 571);
        this.time = new FixturesTime;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 572);
        this.grid = args.grid;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 573);
        this.graph.onUpdate(function() {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 574);
            return _this.render();
        });
    }
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 578);
    AxisTime.prototype.appropriateTimeUnit = function() {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 579);
        var domain, rangeSeconds, unit, units;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 581);
        unit = void 0;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 582);
        units = this.time.units;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 583);
        domain = this.graph.x.domain();
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 584);
        rangeSeconds = domain[1] - domain[0];
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 585);
        units.forEach(function(u) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 586);
            if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 586, Math.floor(rangeSeconds / u.seconds) >= 2)) {
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 587);
                return unit = unit || u;
            }
        });
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 590);
        return unit || this.time.units[this.time.units.length - 1];
    };
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 593);
    AxisTime.prototype.tickOffsets = function() {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 594);
        var count, domain, i, offsets, runningTick, tickValue, unit;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 596);
        domain = this.graph.x.domain();
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 597);
        unit = this.fixedTimeUnit || this.appropriateTimeUnit();
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 598);
        count = Math.ceil((domain[1] - domain[0]) / unit.seconds);
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 599);
        runningTick = domain[0];
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 600);
        offsets = [];
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 601);
        i = 0;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 602);
        while (i <= count) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 603);
            tickValue = this.time.ceil(runningTick, unit);
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 604);
            runningTick = tickValue + unit.seconds / 2;
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 605);
            offsets.push({
                value: tickValue,
                unit: unit
            });
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 609);
            i++;
        }
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 611);
        return offsets;
    };
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 614);
    AxisTime.prototype.render = function() {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 615);
        var g, tickData, ticks, _this = this;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 618);
        if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 618, this.graph.x == null)) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 619);
            return;
        }
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 621);
        g = this.graph.vis.selectAll(".x-ticks").data([ 0 ]);
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 622);
        g.enter().append("g").attr("class", "x-ticks");
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 623);
        tickData = this.tickOffsets().filter(function(tick) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 624);
            var _ref2;
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 626);
            return _this.graph.x.range()[0] <= (_ref2 = _this.graph.x(tick.value)) && _ref2 <= _this.graph.x.range()[1];
        });
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 628);
        ticks = g.selectAll("g.x-tick").data(this.tickOffsets(), function(d) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 629);
            return d.value;
        });
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 631);
        ticks.enter().append("g").attr("class", [ "x-tick", this.ticksTreatment ].join(" ")).attr("transform", function(d) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 632);
            return "translate(" + _this.graph.x(d.value) + ", " + _this.graph.marginedHeight + ")";
        }).append("text").attr("y", this.marginTop).text(function(d) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 634);
            return d.unit.formatter(new Date(d.value * 1e3));
        }).attr("class", "title");
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 636);
        ticks.attr("transform", function(d) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 637);
            return "translate(" + _this.graph.x(d.value) + ", " + _this.graph.marginedHeight + ")";
        });
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 639);
        return ticks.exit().remove();
    };
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 642);
    return AxisTime;
}();

_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 646);
Tactile.AxisY = AxisY = function() {
    function AxisY(options) {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 648);
        var pixelsPerTick, _this = this;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 651);
        this.options = options;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 652);
        this.graph = options.graph;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 653);
        this.orientation = options.orientation || "left";
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 654);
        pixelsPerTick = options.pixelsPerTick || 75;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 655);
        this.ticks = options.ticks || Math.floor(this.graph.height() / pixelsPerTick);
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 656);
        this.tickSize = options.tickSize || 4;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 657);
        this.ticksTreatment = options.ticksTreatment || "plain";
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 658);
        this.grid = options.grid;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 659);
        this.graph.onUpdate(function() {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 660);
            return _this.render();
        });
    }
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 664);
    AxisY.prototype.render = function() {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 665);
        var axis, grid, gridSize, y, yAxis;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 667);
        if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 667, this.graph.y == null)) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 668);
            return;
        }
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 670);
        y = this.graph.vis.selectAll(".y-ticks").data([ 0 ]);
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 671);
        y.enter().append("g").attr("class", [ "y-ticks", this.ticksTreatment ].join(" "));
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 672);
        axis = d3.svg.axis().scale(this.graph.y).orient(this.orientation);
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 673);
        axis.tickFormat(this.options.tickFormat || function(y) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 674);
            return y;
        });
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 676);
        yAxis = axis.ticks(this.ticks).tickSubdivide(0).tickSize(this.tickSize);
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 677);
        y.transition().duration(this.graph.transitionSpeed).call(yAxis);
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 678);
        if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 678, this.grid)) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 679);
            gridSize = (this.orientation === "right" ? 1 : -1) * this.graph.width();
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 680);
            grid = this.graph.vis.selectAll(".y-grid").data([ 0 ]);
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 681);
            grid.enter().append("svg:g").attr("class", "y-grid");
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 682);
            grid.transition().call(axis.ticks(this.ticks).tickSubdivide(0).tickSize(gridSize));
        }
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 684);
        return this._renderHeight = this.graph.height();
    };
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 687);
    return AxisY;
}();

_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 691);
Tactile.ColumnRenderer = ColumnRenderer = function(_super) {
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 692);
    __extends(ColumnRenderer, _super);
    function ColumnRenderer() {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 695);
        this._barY = __bind(this._barY, this);
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 696);
        this._barX = __bind(this._barX, this);
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 697);
        this._seriesBarWidth = __bind(this._seriesBarWidth, this);
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 698);
        this._edgeRatio = __bind(this._edgeRatio, this);
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 699);
        this._transformMatrix = __bind(this._transformMatrix, this);
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 700);
        this.render = __bind(this.render, this);
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 700);
        _ref2 = ColumnRenderer.__super__.constructor.apply(this, arguments);
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 701);
        return _ref2;
    }
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 704);
    ColumnRenderer.prototype.name = "column";
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 706);
    ColumnRenderer.prototype.specificDefaults = {
        gapSize: .15,
        tension: null,
        round: true,
        unstack: true
    };
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 713);
    ColumnRenderer.prototype.initialize = function(options) {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 714);
        if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 714, options == null)) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 715);
            options = {};
        }
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 717);
        ColumnRenderer.__super__.initialize.apply(this, arguments);
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 718);
        this.dragger = new Dragger({
            renderer: this
        });
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 721);
        this.gapSize = options.gapSize || this.gapSize;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 722);
        return this.timesRendered = 0;
    };
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 725);
    ColumnRenderer.prototype.render = function() {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 726);
        var circ, newCircs, nodes, _ref3, _ref4, _ref5, _this = this;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 729);
        if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 729, this.series.disabled)) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 730);
            this.timesRendered = 0;
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 731);
            if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 731, (_ref3 = this.dragger) != null)) {
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 732);
                _ref3.timesRendered = 0;
            }
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 734);
            this.seriesCanvas().selectAll("rect").data(this.series.stack).remove();
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 735);
            this.seriesCanvas().selectAll("circle").data(this.series.stack).remove();
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 736);
            return;
        }
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 738);
        nodes = this.seriesCanvas().selectAll("rect").data(this.series.stack);
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 739);
        nodes.enter().append("svg:rect").attr("clip-path", "url(#clip)").on("click", this.setActive);
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 740);
        nodes.transition().duration(this.timesRendered++ === 0 ? 0 : this.transitionSpeed).attr("x", this._barX).attr("y", this._barY).attr("width", this._seriesBarWidth()).attr("height", function(d) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 741);
            return _this.graph.y.magnitude(Math.abs(d.y));
        }).attr("transform", this._transformMatrix).attr("fill", this.series.color).attr("stroke", "white").attr("rx", this._edgeRatio).attr("ry", this._edgeRatio).attr("class", function(d, i) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 743);
            return [ "bar", !_this.series.color ? "colorless" : void 0, d === _this.active ? "active" : void 0, _this.utils.ourFunctor(_this.series.isEditable, d, i) ? "editable" : void 0 ].join(" ");
        });
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 745);
        nodes.on("mouseover.show-dragging-circle", function(d, i, el) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 746);
            var circ;
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 748);
            _this.seriesCanvas().selectAll("circle:not(.active)").style("display", "none");
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 749);
            circ = _this.seriesCanvas().select("#node-" + i + "-" + d.x);
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 750);
            return circ.style("display", "");
        });
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 752);
        circ = this.seriesCanvas().selectAll("circle").data(this.series.stack);
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 753);
        newCircs = circ.enter().append("svg:circle").on("click", this.setActive).style("display", "none");
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 754);
        if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 754, (_ref4 = this.dragger) != null)) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 755);
            _ref4.makeHandlers(newCircs);
        }
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 757);
        if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 757, (_ref5 = this.dragger) != null)) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 758);
            _ref5.updateDraggedNode();
        }
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 760);
        circ.transition().duration(this.timesRendered++ === 0 ? 0 : this.transitionSpeed).attr("cx", function(d) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 761);
            return _this._barX(d) + _this._seriesBarWidth() / 2;
        }).attr("cy", function(d) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 763);
            return _this._barY(d);
        }).attr("r", function(d) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 765);
            if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 765, "r" in d)) {
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 766);
                return d.r;
            } else {
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 768);
                if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 768, d.dragged) || _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 768, d === _this.active)) {
                    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 769);
                    return _this.dotSize + 1;
                } else {
                    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 771);
                    return _this.dotSize;
                }
            }
        }).attr("clip-path", "url(#scatter-clip)").attr("class", function(d, i) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 775);
            return [ d === _this.active ? "active" : void 0, _this.utils.ourFunctor(_this.series.isEditable, d, i) ? "editable" : void 0 ].join(" ");
        }).attr("fill", function(d) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 777);
            if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 777, d.dragged) || _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 777, d === _this.active)) {
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 778);
                return "white";
            } else {
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 780);
                return _this.series.color;
            }
        }).attr("stroke", function(d) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 783);
            if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 783, d.dragged) || _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 783, d === _this.active)) {
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 784);
                return _this.series.color;
            } else {
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 786);
                return "white";
            }
        }).attr("stroke-width", 2).attr("id", function(d, i) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 789);
            return "node-" + i + "-" + d.x;
        }).style("cursor", function(d, i) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 791);
            if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 791, _this.utils.ourFunctor(_this.series.isEditable, d, i))) {
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 792);
                return "ns-resize";
            } else {
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 794);
                return "auto";
            }
        });
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 797);
        circ.exit().remove();
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 798);
        if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 798, this.series.tooltip)) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 799);
            circ.tooltip(function(d, i) {
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 800);
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
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 810);
        return this.setupTooltips();
    };
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 813);
    ColumnRenderer.prototype.setupTooltips = function() {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 814);
        var _this = this;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 816);
        if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 816, this.series.tooltip)) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 817);
            return this.seriesCanvas().selectAll("rect").tooltip(function(d, i) {
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 818);
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
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 830);
    ColumnRenderer.prototype.barWidth = function() {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 831);
        var barWidth, count, data;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 833);
        data = this.series.stack;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 834);
        count = data.length;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 835);
        return barWidth = this.graph.width() / count * (1 - this.gapSize);
    };
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 838);
    ColumnRenderer.prototype.stackTransition = function() {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 839);
        var count, nodes, slideTransition, _this = this;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 842);
        this.unstack = false;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 843);
        this.graph.discoverRange(this);
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 844);
        count = this.series.stack.length;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 845);
        nodes = this.seriesCanvas().selectAll("rect").data(this.series.stack);
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 846);
        nodes.enter().append("svg:rect");
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 847);
        slideTransition = function() {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 848);
            return _this.seriesCanvas().selectAll("rect").filter(function(d) {
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 849);
                return d.y > 0;
            }).transition().duration(_this.timesRendered++ === 0 ? 0 : _this.transitionSpeed).attr("width", _this._seriesBarWidth()).attr("x", _this._barX);
        };
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 852);
        this.seriesCanvas().selectAll("rect").filter(function(d) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 853);
            return d.y > 0;
        }).transition().duration(this.timesRendered++ === 0 ? 0 : this.transitionSpeed).attr("y", this._barY).attr("height", function(d) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 855);
            return _this.graph.y.magnitude(Math.abs(d.y));
        }).each("end", slideTransition);
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 857);
        this.setupTooltips();
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 858);
        return this.graph.updateCallbacks.forEach(function(callback) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 859);
            return callback();
        });
    };
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 863);
    ColumnRenderer.prototype.unstackTransition = function() {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 864);
        var count, growTransition, _this = this;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 867);
        this.unstack = true;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 868);
        this.graph.discoverRange(this);
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 869);
        count = this.series.stack.length;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 870);
        growTransition = function() {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 871);
            return _this.seriesCanvas().selectAll("rect").filter(function(d) {
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 872);
                return d.y > 0;
            }).transition().duration(_this.timesRendered++ === 0 ? 0 : _this.transitionSpeed).attr("height", function(d) {
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 874);
                return _this.graph.y.magnitude(Math.abs(d.y));
            }).attr("y", _this._barY);
        };
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 877);
        this.seriesCanvas().selectAll("rect").filter(function(d) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 878);
            return d.y > 0;
        }).transition().duration(this.timesRendered++ === 0 ? 0 : this.transitionSpeed).attr("x", this._barX).attr("width", this._seriesBarWidth()).each("end", growTransition);
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 880);
        this.setupTooltips();
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 881);
        return this.graph.updateCallbacks.forEach(function(callback) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 882);
            return callback();
        });
    };
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 886);
    ColumnRenderer.prototype._transformMatrix = function(d) {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 887);
        var matrix;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 889);
        matrix = [ 1, 0, 0, d.y < 0 ? -1 : 1, 0, d.y < 0 ? this.graph.y.magnitude(Math.abs(d.y)) * 2 : 0 ];
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 890);
        return "matrix(" + matrix.join(",") + ")";
    };
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 893);
    ColumnRenderer.prototype._edgeRatio = function() {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 894);
        if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 894, this.series.round)) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 895);
            return Math.round(.05783 * this._seriesBarWidth() + 1);
        } else {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 897);
            return 0;
        }
    };
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 901);
    ColumnRenderer.prototype._seriesBarWidth = function() {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 902);
        var stackWidth, width, _this = this;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 905);
        if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 905, this.series.stack.length >= 2)) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 906);
            stackWidth = this.graph.x(this.series.stack[1].x) - this.graph.x(this.series.stack[0].x);
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 907);
            width = stackWidth / (1 + this.gapSize);
        } else {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 909);
            width = this.graph.width() / (1 + this.gapSize);
        }
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 911);
        if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 911, this.unstack)) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 912);
            width = width / this.graph.series.filter(function(d) {
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 913);
                return d.renderer === "column";
            }).length;
        }
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 916);
        return width;
    };
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 919);
    ColumnRenderer.prototype._barXOffset = function(seriesBarWidth) {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 920);
        var barXOffset, count;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 922);
        count = this.graph.renderersByType(this.name).length;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 923);
        if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 923, count === 1) || _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 923, !this.unstack)) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 924);
            return barXOffset = -seriesBarWidth / 2;
        } else {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 926);
            return barXOffset = -seriesBarWidth * count / 2;
        }
    };
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 930);
    ColumnRenderer.prototype._barX = function(d) {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 931);
        var initialX, seriesBarWidth, x;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 933);
        x = this.graph.x(d.x);
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 934);
        seriesBarWidth = this._seriesBarWidth();
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 935);
        initialX = x + this._barXOffset(seriesBarWidth);
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 936);
        if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 936, this.unstack)) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 937);
            return initialX + this._columnRendererIndex() * seriesBarWidth;
        } else {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 939);
            return initialX;
        }
    };
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 943);
    ColumnRenderer.prototype._barY = function(d) {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 944);
        if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 944, this.unstack)) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 945);
            return this.graph.y(Math.abs(d.y)) * (d.y < 0 ? -1 : 1);
        } else {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 947);
            return this.graph.y(d.y0 + Math.abs(d.y)) * (d.y < 0 ? -1 : 1);
        }
    };
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 951);
    ColumnRenderer.prototype._columnRendererIndex = function() {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 952);
        var renderers, _this = this;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 955);
        if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 955, this.rendererIndex === 0) || _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 955, this.rendererIndex === void 0)) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 956);
            return 0;
        }
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 958);
        renderers = this.graph.renderers.slice(0, this.rendererIndex);
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 959);
        return _.filter(renderers, function(r) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 960);
            return r.name === _this.name;
        }).length;
    };
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 964);
    return ColumnRenderer;
}(DraggableRenderer);

_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 968);
Tactile.DonutRenderer = DonutRenderer = function(_super) {
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 969);
    __extends(DonutRenderer, _super);
    function DonutRenderer() {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 972);
        _ref3 = DonutRenderer.__super__.constructor.apply(this, arguments);
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 973);
        return _ref3;
    }
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 976);
    Tactile = window.Tactile || {};
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 978);
    DonutRenderer.prototype.name = "donut";
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 980);
    DonutRenderer.prototype.specificDefaults = {
        cartesian: false
    };
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 984);
    DonutRenderer.prototype.initialize = function() {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 985);
        this.donut = d3.layout.pie().value(function(d) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 986);
            return d.val;
        });
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 988);
        return this.arc = d3.svg.arc().innerRadius(60).outerRadius(this.series.height);
    };
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 991);
    DonutRenderer.prototype.render = function() {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 992);
        var donut;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 994);
        donut = void 0;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 995);
        donut = this.seriesCanvas().selectAll(".arc").data(this.donut).enter().append("path").attr("class", "donut-arc").attr("transform", "translate(" + (this.series.height - 30) + "," + (this.series.height - 30) + ")").attr("d", this.arc).attr("stroke", "white").style("fill", function(d) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 996);
            return d.data.color;
        }, "stroke");
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 998);
        return this.setupTooltips();
    };
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1001);
    DonutRenderer.prototype.setupTooltips = function() {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1002);
        var _this = this;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1004);
        if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1004, this.series.tooltip)) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1005);
            return this.seriesCanvas().selectAll("path").tooltip(function(d, i) {
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1006);
                return {
                    color: _this.series.color,
                    graph: _this.graph,
                    text: _this.series.tooltip(d),
                    gravity: "left"
                };
            });
        }
    };
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1016);
    DonutRenderer;
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1018);
    return DonutRenderer;
}(RendererBase);

_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1022);
Tactile.Dragger = Dragger = function() {
    function Dragger(args) {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1024);
        this.update = __bind(this.update, this);
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1025);
        this._mouseUp = __bind(this._mouseUp, this);
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1026);
        this._mouseMove = __bind(this._mouseMove, this);
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1027);
        this._datapointDrag = __bind(this._datapointDrag, this);
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1027);
        this.renderer = args.renderer;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1028);
        this.graph = this.renderer.graph;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1029);
        this.series = this.renderer.series;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1030);
        this.drawCircles = args.circles || false;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1031);
        this.afterDrag = this.series.afterDrag || function() {};
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1032);
        this.onDrag = this.series.onDrag || function() {};
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1033);
        this.dragged = null;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1034);
        this._bindMouseEvents();
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1035);
        this.power = this.series.sigfigs != null ? Math.pow(10, this.series.sigfigs) : 1;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1036);
        this.setSpeed = this.renderer.transitionSpeed;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1037);
        this.timesRendered = 0;
    }
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1040);
    Dragger.prototype._bindMouseEvents = function() {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1041);
        return d3.select(this.graph._element).on("mousemove.drag." + this.series.name, this._mouseMove).on("touchmove.drag." + this.series.name, this._mouseMove).on("mouseup.drag." + this.series.name, this._mouseUp).on("touchend.drag." + this.series.name, this._mouseUp);
    };
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1044);
    Dragger.prototype.makeHandlers = function(nodes) {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1045);
        if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1045, this.drawCircles)) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1046);
            nodes = this._appendCircles(nodes);
        }
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1048);
        return nodes.on("mousedown.drag." + this.series.name, this._datapointDrag).on("touchstart.drag." + this.series.name, this._datapointDrag);
    };
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1051);
    Dragger.prototype.updateDraggedNode = function() {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1052);
        var _ref4, _this = this;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1055);
        if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1055, ((_ref4 = this.dragged) != null ? _ref4.y : void 0) != null)) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1056);
            return this.renderer.seriesCanvas().selectAll("circle.editable").filter(function(d, i) {
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1057);
                return d === _this.dragged.d;
            }).each(function(d) {
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1059);
                d.y = _this.dragged.y;
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1060);
                return d.dragged = true;
            });
        }
    };
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1065);
    Dragger.prototype._datapointDrag = function(d, i) {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1066);
        d = _.isArray(d) ? d[i] : d;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1067);
        if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1067, !this.renderer.utils.ourFunctor(this.series.isEditable, d, i))) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1068);
            return;
        }
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1070);
        if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1070, this.series.tooltip)) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1071);
            Tactile.Tooltip.spotlightOn(d);
        }
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1073);
        this.dragged = {
            d: d,
            i: i,
            y: d.y
        };
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1078);
        return this.update();
    };
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1081);
    Dragger.prototype._mouseMove = function() {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1082);
        var elementRelativeposition, inverted, offsetTop, p, svgNode, t, tip, value;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1084);
        p = d3.svg.mouse(this.graph.vis.node());
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1085);
        t = d3.event.changedTouches;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1086);
        if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1086, this.dragged)) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1087);
            if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1087, this.series.tooltip)) {
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1088);
                elementRelativeposition = d3.mouse(this.graph._element);
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1089);
                tip = d3.select(this.graph._element).select(".tooltip");
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1090);
                svgNode = d3.select(this.graph._element).select("svg").node();
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1091);
                offsetTop = this.graph.padding.top + this.graph.margin.top + svgNode.offsetTop;
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1092);
                tip.style("top", "" + (this.graph.y(this.dragged.y) + offsetTop) + "px");
            }
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1094);
            this.renderer.transitionSpeed = 0;
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1095);
            inverted = this.graph.y.invert(Math.max(0, Math.min(this.graph.height(), p[1])));
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1096);
            value = Math.round(inverted * this.power) / this.power;
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1097);
            this.dragged.y = value;
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1098);
            this.onDrag(this.dragged, this.series, this.graph);
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1099);
            return this.update();
        }
    };
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1103);
    Dragger.prototype._mouseUp = function() {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1104);
        var _ref4, _this = this;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1107);
        if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1107, ((_ref4 = this.dragged) != null ? _ref4.y : void 0) == null)) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1108);
            return;
        }
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1110);
        if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1110, this.dragged)) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1111);
            this.afterDrag(this.dragged.d, this.dragged.y, this.dragged.i, this.series, this.graph);
        }
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1113);
        this.renderer.seriesCanvas().selectAll("circle.editable").data(this.series.stack).attr("class", function(d) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1114);
            d.dragged = false;
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1115);
            return "editable";
        });
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1117);
        d3.select("body").style("cursor", "auto");
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1118);
        this.dragged = null;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1119);
        if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1119, this.series.tooltip)) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1120);
            Tactile.Tooltip.turnOffspotlight();
        }
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1122);
        this.renderer.transitionSpeed = this.setSpeed;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1123);
        return this.update();
    };
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1126);
    Dragger.prototype.update = function() {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1127);
        return this.renderer.render();
    };
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1130);
    Dragger.prototype._appendCircles = function(nodes) {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1131);
        var circs, renderer, _this = this;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1134);
        renderer = this.renderer;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1135);
        circs = this.renderer.seriesCanvas().selectAll("circle").data(this.series.stack);
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1136);
        circs.enter().append("svg:circle").style("display", "none");
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1137);
        circs.attr("r", 4).attr("clip-path", "url(#scatter-clip)").attr("class", function(d, i) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1138);
            return [ d === renderer.active ? "active" : void 0, renderer.utils.ourFunctor(renderer.series.isEditable, d, i) ? "editable" : void 0 ].join(" ");
        }).attr("fill", function(d) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1140);
            if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1140, d.dragged) || _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1140, d === renderer.active)) {
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1141);
                return "white";
            } else {
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1143);
                return _this.series.color;
            }
        }).attr("stroke", function(d) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1146);
            if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1146, d.dragged) || _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1146, d === renderer.active)) {
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1147);
                return _this.series.color;
            } else {
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1149);
                return "white";
            }
        }).attr("stroke-width", "2").attr("id", function(d, i) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1152);
            return "node-" + i + "-" + d.x;
        }).style("cursor", function(d, i) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1154);
            if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1154, renderer.utils.ourFunctor(_this.series.isEditable, d, i))) {
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1155);
                return "ns-resize";
            } else {
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1157);
                return "auto";
            }
        });
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1160);
        circs.transition().duration(this.timesRendered++ === 0 ? 0 : this.renderer.transitionSpeed).attr("cx", function(d) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1161);
            return _this.graph.x(d.x);
        }).attr("cy", function(d) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1163);
            return _this.graph.y(d.y);
        });
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1165);
        nodes.on("mouseover.show-dragging-circle", function(d, i, el) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1166);
            var circ;
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1168);
            renderer.seriesCanvas().selectAll("circle:not(.active)").style("display", "none");
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1169);
            circ = renderer.seriesCanvas().select("#node-" + i + "-" + d.x);
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1170);
            return circ.style("display", "");
        });
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1172);
        circs.tooltip(function(d, i) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1173);
            return {
                graph: _this.graph,
                text: _this.series.tooltip(d),
                circleOnHover: true,
                gravity: "right"
            };
        });
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1180);
        return renderer.seriesCanvas().selectAll("circle.editable");
    };
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1183);
    return Dragger;
}();

_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1187);
Tactile.FixturesTime = FixturesTime = function() {
    function FixturesTime() {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1189);
        var _this = this;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1191);
        this.tzOffset = (new Date).getTimezoneOffset() * 60;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1192);
        this.months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1193);
        this.units = [ {
            name: "decade",
            seconds: 86400 * 365.25 * 10,
            formatter: function(d) {
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1198);
                return parseInt(d.getUTCFullYear() / 10) * 10;
            }
        }, {
            name: "year",
            seconds: 86400 * 365.25,
            formatter: function(d) {
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1204);
                return d.getUTCFullYear();
            }
        }, {
            name: "month",
            seconds: 86400 * 30.5,
            formatter: function(d) {
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1210);
                return _this.months[d.getUTCMonth()];
            }
        }, {
            name: "week",
            seconds: 86400 * 7,
            formatter: function(d) {
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1216);
                return _this.formatDate(d);
            }
        }, {
            name: "day",
            seconds: 86400,
            formatter: function(d) {
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1222);
                return d.getUTCDate();
            }
        }, {
            name: "6 hour",
            seconds: 3600 * 6,
            formatter: function(d) {
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1228);
                return _this.formatTime(d);
            }
        }, {
            name: "hour",
            seconds: 3600,
            formatter: function(d) {
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1234);
                return _this.formatTime(d);
            }
        }, {
            name: "15 minute",
            seconds: 60 * 15,
            formatter: function(d) {
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1240);
                return _this.formatTime(d);
            }
        }, {
            name: "minute",
            seconds: 60,
            formatter: function(d) {
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1246);
                return d.getUTCMinutes();
            }
        }, {
            name: "15 second",
            seconds: 15,
            formatter: function(d) {
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1252);
                return d.getUTCSeconds() + "s";
            }
        }, {
            name: "second",
            seconds: 1,
            formatter: function(d) {
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1258);
                return d.getUTCSeconds() + "s";
            }
        } ];
    }
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1264);
    FixturesTime.prototype.unit = function(unitName) {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1265);
        return this.units.filter(function(unit) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1266);
            return unitName === unit.name;
        }).shift();
    };
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1270);
    FixturesTime.prototype.formatDate = function(d) {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1271);
        return d.toUTCString().match(/, (\w+ \w+ \w+)/)[1];
    };
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1274);
    FixturesTime.prototype.formatTime = function(d) {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1275);
        return d.toUTCString().match(/(\d+:\d+):/)[1];
    };
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1278);
    FixturesTime.prototype.ceil = function(time, unit) {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1279);
        var nearFuture, rounded;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1281);
        if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1281, unit.name === "year")) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1282);
            nearFuture = new Date((time + unit.seconds - 1) * 1e3);
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1283);
            rounded = new Date(0);
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1284);
            rounded.setUTCFullYear(nearFuture.getUTCFullYear());
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1285);
            rounded.setUTCMonth(0);
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1286);
            rounded.setUTCDate(1);
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1287);
            rounded.setUTCHours(0);
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1288);
            rounded.setUTCMinutes(0);
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1289);
            rounded.setUTCSeconds(0);
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1290);
            rounded.setUTCMilliseconds(0);
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1291);
            return rounded.getTime() / 1e3;
        }
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1293);
        return Math.ceil(time / unit.seconds) * unit.seconds;
    };
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1296);
    return FixturesTime;
}();

_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1300);
Tactile.GaugeRenderer = GaugeRenderer = function(_super) {
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1301);
    __extends(GaugeRenderer, _super);
    function GaugeRenderer() {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1304);
        _ref4 = GaugeRenderer.__super__.constructor.apply(this, arguments);
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1305);
        return _ref4;
    }
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1308);
    GaugeRenderer.prototype.name = "gauge";
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1310);
    GaugeRenderer.prototype.specificDefaults = {
        cartesian: false
    };
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1314);
    GaugeRenderer.prototype.render = function() {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1315);
        var angleRange, arcs, arcsInner, innerArc, lineData, maxAngle, minAngle, originTranslate, outerArc, pg, plotAngle, plotValue, pointer, pointerHeadLength, pointerLine, pointerTailLength, pointerWidth, r, ringInset, ringWidth, scale, totalSizeDivide, translateHeight, translateWidth;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1317);
        scale = d3.scale.linear().range([ 0, 1 ]).domain(this.domain());
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1318);
        ringInset = .3;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1319);
        ringWidth = .75;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1320);
        pointerWidth = .1;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1321);
        pointerTailLength = .015;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1322);
        pointerHeadLength = .9;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1323);
        totalSizeDivide = 1.3;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1324);
        this.bottomOffset = .75;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1325);
        minAngle = -85;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1326);
        maxAngle = 85;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1327);
        angleRange = maxAngle - minAngle;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1328);
        plotValue = this.value;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1329);
        r = Math.round(this.graph.height() / totalSizeDivide);
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1330);
        translateWidth = this.graph.width() / 2;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1331);
        translateHeight = r;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1332);
        originTranslate = "translate(" + translateWidth + ", " + translateHeight + ")";
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1333);
        outerArc = d3.svg.arc().outerRadius(r * ringWidth).innerRadius(r * ringInset).startAngle(this.graph._deg2rad(minAngle)).endAngle(this.graph._deg2rad(minAngle + angleRange));
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1334);
        arcs = this.graph.vis.append("g").attr("class", "gauge arc").attr("transform", originTranslate);
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1335);
        arcs.selectAll("path").data([ 1 ]).enter().append("path").attr("d", outerArc);
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1336);
        plotAngle = minAngle + scale(plotValue) * angleRange;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1337);
        innerArc = d3.svg.arc().outerRadius(r * ringWidth).innerRadius(r * ringInset).startAngle(this.graph._deg2rad(minAngle)).endAngle(this.graph._deg2rad(plotAngle));
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1338);
        arcsInner = this.graph.vis.append("g").attr("class", "gauge arc-value").attr("transform", originTranslate);
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1339);
        arcsInner.selectAll("path").data([ 1 ]).enter().append("path").attr("d", innerArc);
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1340);
        lineData = [ [ r * pointerWidth / 2, 0 ], [ 0, -(r * pointerHeadLength) ], [ -(r * pointerWidth / 2), 0 ], [ 0, r * pointerTailLength ], [ r * pointerWidth / 2, 0 ] ];
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1341);
        pointerLine = d3.svg.line().interpolate("monotone");
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1342);
        pg = this.graph.vis.append("g").data([ lineData ]).attr("class", "gauge pointer").attr("transform", originTranslate);
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1343);
        pointer = pg.append("path").attr("d", pointerLine);
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1344);
        pointer.transition().duration(250).attr("transform", "rotate(" + plotAngle + ")");
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1345);
        this.graph.vis.append("svg:circle").attr("r", this.graph.width() / 30).attr("class", "gauge pointer-circle").style("opacity", 1).attr("transform", originTranslate);
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1346);
        this.graph.vis.append("svg:circle").attr("r", this.graph.width() / 90).attr("class", "gauge pointer-nail").style("opacity", 1).attr("transform", originTranslate);
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1347);
        if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1347, this.series.labels)) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1348);
            return this.renderLabels();
        }
    };
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1352);
    GaugeRenderer.prototype.renderLabels = function() {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1353);
        this.graph.vis.append("text").attr("class", "gauge label").text(this.min).attr("transform", "translate(" + .1 * this.graph.width() + ",      " + 1.15 * this.graph.height() * this.bottomOffset + ")");
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1354);
        this.graph.vis.append("text").attr("class", "gauge label").text(this.value).attr("transform", "translate(" + (this.graph.width() - this.graph.margin.right) / 1.95 + ", " + 1.2 * this.graph.height() * this.bottomOffset + ")");
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1355);
        return this.graph.vis.append("text").attr("class", "gauge label").text(this.max).attr("transform", "translate(" + .9 * this.graph.width() + ",      " + 1.15 * this.graph.height() * this.bottomOffset + ")");
    };
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1358);
    GaugeRenderer.prototype.domain = function() {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1359);
        this.value = this.series.stack[0].value;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1360);
        this.min = this.series.stack[0].min;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1361);
        this.max = this.series.stack[0].max;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1362);
        return [ this.min, this.max ];
    };
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1365);
    return GaugeRenderer;
}(RendererBase);

_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1369);
Tactile.LineRenderer = LineRenderer = function(_super) {
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1370);
    __extends(LineRenderer, _super);
    function LineRenderer() {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1373);
        this.render = __bind(this.render, this);
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1373);
        _ref5 = LineRenderer.__super__.constructor.apply(this, arguments);
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1374);
        return _ref5;
    }
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1377);
    LineRenderer.prototype.name = "line";
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1379);
    LineRenderer.prototype.specificDefaults = {
        unstack: true,
        fill: false,
        stroke: true,
        dotSize: 5
    };
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1386);
    LineRenderer.prototype.seriesPathFactory = function() {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1387);
        var _this = this;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1389);
        return d3.svg.line().x(function(d) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1390);
            return _this.graph.x(d.x);
        }).y(function(d) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1392);
            return _this.graph.y(d.y);
        }).interpolate(this.graph.interpolation).tension(this.tension);
    };
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1396);
    LineRenderer.prototype.initialize = function() {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1397);
        LineRenderer.__super__.initialize.apply(this, arguments);
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1398);
        this.dragger = new Dragger({
            renderer: this
        });
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1401);
        this.timesRendered = 0;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1402);
        if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1402, this.series.dotSize != null)) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1403);
            return this.dotSize = this.series.dotSize;
        }
    };
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1407);
    LineRenderer.prototype.render = function() {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1408);
        var circ, newCircs, _ref6, _ref7, _this = this;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1411);
        LineRenderer.__super__.render.call(this);
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1412);
        if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1412, this.series.disabled)) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1413);
            this.seriesCanvas().selectAll("circle").data(this.series.stack).remove();
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1414);
            return;
        }
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1416);
        circ = this.seriesCanvas().selectAll("circle").data(this.series.stack);
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1417);
        newCircs = circ.enter().append("svg:circle").on("click", this.setActive);
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1418);
        if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1418, (_ref6 = this.dragger) != null)) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1419);
            _ref6.makeHandlers(newCircs);
        }
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1421);
        if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1421, (_ref7 = this.dragger) != null)) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1422);
            _ref7.updateDraggedNode();
        }
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1424);
        circ.transition().duration(this.timesRendered++ === 0 ? 0 : this.transitionSpeed).attr("cx", function(d) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1425);
            return _this.graph.x(d.x);
        }).attr("cy", function(d) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1427);
            return _this.graph.y(d.y);
        }).attr("r", function(d) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1429);
            if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1429, "r" in d)) {
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1430);
                return d.r;
            } else {
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1432);
                if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1432, d.dragged) || _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1432, d === _this.active)) {
                    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1433);
                    return _this.dotSize + 1;
                } else {
                    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1435);
                    return _this.dotSize;
                }
            }
        }).attr("clip-path", "url(#scatter-clip)").attr("class", function(d, i) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1439);
            return [ d === _this.active ? "active" : void 0, _this.utils.ourFunctor(_this.series.isEditable, d, i) ? "editable" : void 0 ].join(" ");
        }).attr("fill", function(d) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1441);
            if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1441, d.dragged) || _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1441, d === _this.active)) {
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1442);
                return "white";
            } else {
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1444);
                return _this.series.color;
            }
        }).attr("stroke", function(d) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1447);
            if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1447, d.dragged) || _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1447, d === _this.active)) {
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1448);
                return _this.series.color;
            } else {
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1450);
                return "white";
            }
        }).attr("stroke-width", this.dotSize / 2 || 2);
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1453);
        circ.style("cursor", function(d, i) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1454);
            if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1454, _this.utils.ourFunctor(_this.series.isEditable, d, i))) {
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1455);
                return "ns-resize";
            } else {
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1457);
                return "auto";
            }
        });
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1460);
        circ.exit().remove();
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1461);
        if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1461, this.series.tooltip)) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1462);
            return circ.tooltip(function(d, i) {
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1463);
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
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1474);
    return LineRenderer;
}(DraggableRenderer);

_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1478);
Tactile.RangeSlider = RangeSlider = function() {
    function RangeSlider(options) {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1480);
        this.updateGraph = __bind(this.updateGraph, this);
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1481);
        var _this = this;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1483);
        this.element = options.element;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1484);
        this.graph = options.graph;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1485);
        this.timeSliderClass = options.sliderClass;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1486);
        this.updateCallback = options.updateCallback || function() {};
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1487);
        this.initCallback = options.updateCallback || function() {};
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1488);
        $(function() {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1489);
            var sliderContainer, values;
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1491);
            values = options.values || [ _this.graph.dataDomain()[0], _this.graph.dataDomain()[1] ];
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1492);
            _this.initCallback(values, _this.element);
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1493);
            _this.updateGraph(values);
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1494);
            if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1494, _this.timeSliderClass)) {
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1495);
                sliderContainer = _this.element.find(_this.timeSliderClass);
            } else {
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1497);
                sliderContainer = _this.element;
            }
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1499);
            return sliderContainer.slider({
                range: true,
                min: _this.graph.dataDomain()[0],
                max: _this.graph.dataDomain()[1],
                values: values,
                slide: function(event, ui) {
                    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1505);
                    _this.updateGraph(ui.values);
                    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1506);
                    if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1506, _this.graph.dataDomain()[0] === ui.values[0])) {
                        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1507);
                        _this.graph.window.xMin = void 0;
                    }
                    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1509);
                    if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1509, _this.graph.dataDomain()[1] === ui.values[1])) {
                        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1510);
                        return _this.graph.window.xMax = void 0;
                    }
                }
            });
        });
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1515);
        this.graph.onUpdate(function() {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1516);
            var values;
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1518);
            values = $(_this.element).slider("option", "values");
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1519);
            $(_this.element).slider("option", "min", _this.graph.dataDomain()[0]);
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1520);
            $(_this.element).slider("option", "max", _this.graph.dataDomain()[1]);
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1521);
            if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1521, _this.graph.window.xMin === void 0)) {
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1522);
                values[0] = _this.graph.dataDomain()[0];
            }
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1524);
            if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1524, _this.graph.window.xMax === void 0)) {
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1525);
                values[1] = _this.graph.dataDomain()[1];
            }
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1527);
            return $(_this.element).slider("option", "values", values);
        });
    }
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1531);
    RangeSlider.prototype.updateGraph = function(values) {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1532);
        this.graph.window.xMin = values[0];
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1533);
        this.graph.window.xMax = values[1];
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1534);
        this.updateCallback(values, this.element);
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1535);
        return this.graph.update();
    };
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1538);
    return RangeSlider;
}();

_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1542);
Tactile.ScatterRenderer = ScatterRenderer = function(_super) {
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1543);
    __extends(ScatterRenderer, _super);
    function ScatterRenderer() {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1546);
        _ref6 = ScatterRenderer.__super__.constructor.apply(this, arguments);
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1547);
        return _ref6;
    }
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1550);
    ScatterRenderer.prototype.name = "scatter";
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1552);
    ScatterRenderer.prototype.specificDefaults = {
        fill: true,
        stroke: false
    };
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1557);
    ScatterRenderer.prototype.render = function() {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1558);
        var circ, _this = this;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1561);
        circ = this.seriesCanvas().selectAll("circle").data(this.series.stack);
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1562);
        circ.enter().append("svg:circle").attr("cx", function(d) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1563);
            return _this.graph.x(d.x);
        }).attr("cy", function(d) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1565);
            return _this.graph.y(d.y);
        });
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1567);
        circ.transition().duration(this.transitionSpeed).attr("cx", function(d) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1568);
            return _this.graph.x(d.x);
        }).attr("cy", function(d) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1570);
            return _this.graph.y(d.y);
        }).attr("r", function(d) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1572);
            if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1572, "r" in d)) {
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1573);
                return d.r;
            } else {
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1575);
                return _this.dotSize;
            }
        }).attr("fill", this.series.color).attr("stroke", "white").attr("stroke-width", "2");
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1578);
        if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1578, this.series.cssConditions)) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1579);
            circ.attr("class", function(d) {
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1580);
                return _this.series.cssConditions(d);
            });
        }
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1583);
        if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1583, this.series.tooltip)) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1584);
            this.seriesCanvas().selectAll("circle").tooltip(function(d, i) {
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1585);
                return {
                    graph: _this.graph,
                    text: _this.series.tooltip(d),
                    mousemove: true,
                    gravity: "right",
                    displacement: [ -10, 0 ]
                };
            });
        }
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1594);
        return circ.exit().remove();
    };
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1597);
    return ScatterRenderer;
}(RendererBase);

_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1601);
Tactile.Chart = Chart = function() {
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1602);
    Chart.prototype._renderers = {
        gauge: GaugeRenderer,
        column: ColumnRenderer,
        line: LineRenderer,
        area: AreaRenderer,
        scatter: ScatterRenderer,
        donut: DonutRenderer
    };
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1611);
    Chart.prototype.margin = {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20
    };
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1618);
    Chart.prototype.padding = {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10
    };
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1625);
    Chart.prototype.interpolation = "monotone";
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1627);
    Chart.prototype.offset = "zero";
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1629);
    Chart.prototype.min = void 0;
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1631);
    Chart.prototype.max = void 0;
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1633);
    Chart.prototype.transitionSpeed = 200;
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1635);
    Chart.prototype.defaultHeight = 400;
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1637);
    Chart.prototype.defaultWidth = 730;
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1639);
    Chart.prototype.defaultAxes = {
        x: {
            dimension: "time",
            frame: [ void 0, void 0 ]
        },
        y: {
            dimension: "linear",
            frame: [ void 0, void 0 ]
        }
    };
    function Chart(args) {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1651);
        var _this = this;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1653);
        if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1653, args == null)) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1654);
            args = {};
        }
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1656);
        this._slice = __bind(this._slice, this);
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1657);
        this.discoverRange = __bind(this.discoverRange, this);
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1658);
        this.renderers = [];
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1659);
        this.series = [];
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1660);
        this.window = {};
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1661);
        this.updateCallbacks = [];
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1662);
        this._axes = {};
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1663);
        this.setSize({
            width: args.width || this.defaultWidth,
            height: args.height || this.defaultHeight
        });
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1667);
        if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1667, args.width != null)) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1668);
            delete args.width;
        }
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1670);
        if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1670, args.height != null)) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1671);
            delete args.height;
        }
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1673);
        _.each(args, function(val, key) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1674);
            return _this[key] = val;
        });
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1676);
        this.addSeries(args.series, {
            overwrite: true
        });
    }
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1681);
    Chart.prototype.addSeries = function(series, options) {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1682);
        var newSeries, seriesDefaults, _this = this;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1685);
        if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1685, options == null)) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1686);
            options = {
                overwrite: false
            };
        }
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1690);
        if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1690, !series)) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1691);
            return;
        }
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1693);
        if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1693, !_.isArray(series))) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1694);
            series = [ series ];
        }
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1696);
        seriesDefaults = {
            dataTransform: function(d) {
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1698);
                return d;
            }
        };
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1701);
        newSeries = _.map(series, function(s) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1702);
            return _.extend({}, seriesDefaults, s);
        });
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1704);
        if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1704, options.overwrite)) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1705);
            this.series = newSeries;
        } else {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1707);
            this.series = this.series.concat(newSeries);
        }
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1709);
        _.each(newSeries, function(s) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1710);
            s.disable = function() {
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1711);
                return this.disabled = true;
            };
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1713);
            s.enable = function() {
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1714);
                return this.disabled = false;
            };
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1716);
            return s.toggle = function() {
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1717);
                return this.disabled = !this.disabled;
            };
        });
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1720);
        this.initRenderers(newSeries);
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1721);
        return this;
    };
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1724);
    Chart.prototype.initSeriesStackData = function(options) {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1725);
        var i, layout, seriesData, stackedData, _this = this;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1728);
        if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1728, options == null)) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1729);
            options = {
                overwrite: false
            };
        }
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1733);
        if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1733, this.dataInitialized) && _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1733, !options.overwrite)) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1734);
            return;
        }
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1736);
        this.series.active = function() {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1737);
            return _this.series.filter(function(s) {
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1738);
                return !s.disabled;
            });
        };
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1741);
        seriesData = this.series.map(function(d) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1742);
            return _this._data.map(d.dataTransform);
        });
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1744);
        layout = d3.layout.stack();
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1745);
        layout.offset(this.offset);
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1746);
        stackedData = layout(seriesData);
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1747);
        i = 0;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1748);
        this.series.forEach(function(series) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1749);
            return series.stack = stackedData[i++];
        });
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1751);
        return this.dataInitialized = true;
    };
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1754);
    Chart.prototype.render = function() {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1755);
        var stackedData, _this = this;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1758);
        if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1758, this.renderers === void 0) || _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1758, _.isEmpty(this.renderers)) || _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1758, this._allSeriesDisabled())) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1759);
            return;
        }
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1761);
        this.initSeriesStackData();
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1762);
        this._setupCanvas();
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1763);
        stackedData = this.stackData();
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1764);
        _.each(this.renderers, function(renderer) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1765);
            _this.discoverRange(renderer);
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1766);
            return renderer.render();
        });
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1768);
        return this.updateCallbacks.forEach(function(callback) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1769);
            return callback();
        });
    };
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1773);
    Chart.prototype.update = function() {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1774);
        return this.render();
    };
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1777);
    Chart.prototype.discoverRange = function(renderer) {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1778);
        var barWidth, domain, rangeEnd, rangeStart, xframe, yframe, _ref10, _ref11, _ref12, _ref13, _ref14, _ref7, _ref8, _ref9;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1780);
        domain = renderer.domain();
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1781);
        if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1781, renderer.cartesian)) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1782);
            if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1782, this._containsColumnChart())) {
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1783);
                barWidth = this.width() / renderer.series.stack.length / 2;
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1784);
                rangeStart = barWidth;
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1785);
                rangeEnd = this.width() - barWidth;
            }
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1787);
            xframe = [ ((_ref7 = this._axes.x) != null ? (_ref8 = _ref7.frame) != null ? _ref8[0] : void 0 : void 0) ? this._axes.x.frame[0] : domain.x[0], ((_ref9 = this._axes.x) != null ? (_ref10 = _ref9.frame) != null ? _ref10[1] : void 0 : void 0) ? this._axes.x.frame[1] : domain.x[1] ];
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1788);
            yframe = [ ((_ref11 = this._axes.y) != null ? (_ref12 = _ref11.frame) != null ? _ref12[0] : void 0 : void 0) ? this._axes.y.frame[0] : domain.y[0], ((_ref13 = this._axes.y) != null ? (_ref14 = _ref13.frame) != null ? _ref14[1] : void 0 : void 0) ? this._axes.y.frame[1] : domain.y[1] ];
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1789);
            this.x = d3.scale.linear().domain(xframe).range([ rangeStart || 0, rangeEnd || this.width() ]);
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1790);
            this.y = d3.scale.linear().domain(yframe).range([ this.height(), 0 ]);
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1791);
            return this.y.magnitude = d3.scale.linear().domain([ domain.y[0] - domain.y[0], domain.y[1] - domain.y[0] ]).range([ 0, this.height() ]);
        }
    };
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1795);
    Chart.prototype.initAxis = function(axis) {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1796);
        if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1796, !this._allRenderersCartesian())) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1797);
            return;
        }
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1799);
        switch (axis.dimension) {
          case "linear":
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1801);
            return new Tactile.AxisY(_.extend({}, axis.options, {
                graph: this
            }));
          case "time":
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1805);
            return new Tactile.AxisTime(_.extend({}, axis.options, {
                graph: this
            }));
          default:
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1809);
            return console.log("ERROR:" + axis.dimension + " is not currently implemented");
        }
    };
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1813);
    Chart.prototype.dataDomain = function() {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1814);
        var data;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1816);
        data = this.renderers[0].series.stack;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1817);
        return [ data[0].x, data.slice(-1).shift().x ];
    };
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1820);
    Chart.prototype.stackData = function() {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1821);
        var layout, seriesData, stackedData, _this = this;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1824);
        seriesData = this.series.active().map(function(d) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1825);
            return _this._data.map(d.dataTransform);
        });
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1827);
        layout = d3.layout.stack();
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1828);
        layout.offset(this.offset);
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1829);
        stackedData = layout(seriesData);
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1830);
        return this.stackedData = stackedData;
    };
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1833);
    Chart.prototype.setSize = function(args) {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1834);
        var elHeight, elWidth, _ref7;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1836);
        if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1836, args == null)) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1837);
            args = {};
        }
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1839);
        elWidth = $(this._element).width();
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1840);
        elHeight = $(this._element).height();
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1841);
        this.outerWidth = args.width || elWidth || this.defaultWidth;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1842);
        this.outerHeight = args.height || elHeight || this.defaultHeight;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1843);
        this.marginedWidth = this.outerWidth - this.margin.left - this.margin.right;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1844);
        this.marginedHeight = this.outerHeight - this.margin.top - this.margin.bottom;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1845);
        this.innerWidth = this.marginedWidth - this.padding.left - this.padding.right;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1846);
        this.innerHeight = this.marginedHeight - this.padding.top - this.padding.bottom;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1847);
        return (_ref7 = this.vis) != null ? _ref7.attr("width", this.innerWidth).attr("height", this.innerHeight) : void 0;
    };
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1850);
    Chart.prototype.onUpdate = function(callback) {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1851);
        return this.updateCallbacks.push(callback);
    };
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1854);
    Chart.prototype.initRenderers = function(series) {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1855);
        var renderersSize, _this = this;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1858);
        renderersSize = this.renderers.length;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1859);
        return _.each(series, function(s, index) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1860);
            var name, r, rendererClass, rendererOptions;
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1862);
            name = s.renderer;
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1863);
            if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1863, !_this._renderers[name])) {
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1864);
                throw "couldn't find renderer " + name;
            }
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1866);
            rendererClass = _this._renderers[name];
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1867);
            rendererOptions = _.extend({}, {
                graph: _this,
                transitionSpeed: _this.transitionSpeed,
                series: s,
                rendererIndex: index + renderersSize
            });
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1873);
            r = new rendererClass(rendererOptions);
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1874);
            return _this.renderers.push(r);
        });
    };
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1878);
    Chart.prototype.renderersByType = function(name) {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1879);
        return this.renderers.filter(function(r) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1880);
            return r.name === name;
        });
    };
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1884);
    Chart.prototype.stackTransition = function() {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1885);
        return _.each(this.renderersByType("column"), function(r) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1886);
            return r.stackTransition();
        });
    };
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1890);
    Chart.prototype.unstackTransition = function() {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1891);
        return _.each(this.renderersByType("column"), function(r) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1892);
            return r.unstackTransition();
        });
    };
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1896);
    Chart.prototype.element = function(val) {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1897);
        if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1897, !val)) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1898);
            return this._element;
        }
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1900);
        this._element = val;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1901);
        this._setupCanvas();
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1902);
        return this;
    };
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1905);
    Chart.prototype.height = function(val) {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1906);
        if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1906, !val)) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1907);
            return this.innerHeight || this.defaultHeight;
        }
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1909);
        this.setSize({
            width: this.outerWidth,
            height: val
        });
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1913);
        return this;
    };
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1916);
    Chart.prototype.width = function(val) {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1917);
        if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1917, !val)) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1918);
            return this.innerWidth || this.defaultWidth;
        }
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1920);
        this.setSize({
            width: val,
            height: this.outerHeight
        });
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1924);
        return this;
    };
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1927);
    Chart.prototype.data = function(val) {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1928);
        if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1928, !val)) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1929);
            return this._data;
        }
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1931);
        this._data = val;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1932);
        this.dataInitialized = false;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1933);
        return this;
    };
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1936);
    Chart.prototype.axes = function(args, options) {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1937);
        var _this = this;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1939);
        if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1939, !args)) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1940);
            return this._axes;
        }
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1942);
        _.each([ "x", "y" ], function(k) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1943);
            var _ref7, _ref8;
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1945);
            if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1945, args[k] != null)) {
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1946);
                _this._axes[k] = {
                    frame: ((_ref7 = args[k]) != null ? _ref7.frame : void 0) || _this.defaultAxes[k].frame,
                    dimension: ((_ref8 = args[k]) != null ? _ref8.dimension : void 0) || _this.defaultAxes[k].dimension
                };
                _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1950);
                return _this.initAxis(_this._axes[k]);
            }
        });
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1953);
        return this;
    };
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1956);
    Chart.prototype._setupCanvas = function() {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1957);
        var clip, scatterClip;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1959);
        $(this._element).addClass("graph-container");
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1960);
        this.svg = this._findOrAppend({
            what: "svg",
            "in": d3.select(this._element)
        });
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1964);
        this.svg.attr("width", this.outerWidth).attr("height", this.outerHeight);
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1965);
        this.vis = this._findOrAppend({
            what: "g",
            "in": this.svg
        }).attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1969);
        this.vis = this._findOrAppend({
            what: "g",
            "in": this.vis
        }).attr("class", "outer-canvas").attr("width", this.marginedWidth).attr("height", this.marginedHeight);
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1973);
        this.vis = this._findOrAppend({
            what: "g",
            "in": this.vis
        }).attr("transform", "translate(" + this.padding.left + "," + this.padding.top + ")").attr("class", "inner-canvas");
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1977);
        clip = this._findOrAppend({
            what: "clipPath",
            selector: "#clip",
            "in": this.vis
        }).attr("id", "clip");
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1982);
        this._findOrAppend({
            what: "rect",
            "in": clip
        }).attr("width", this.width()).attr("height", this.height() + 4).attr("transform", "translate(0,-2)");
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1986);
        scatterClip = this._findOrAppend({
            what: "clipPath",
            selector: "#scatter-clip",
            "in": this.vis
        }).attr("id", "scatter-clip");
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1991);
        return this._findOrAppend({
            what: "rect",
            "in": scatterClip
        }).attr("width", this.width() + 12).attr("height", this.height() + 12).attr("transform", "translate(-6,-6)");
    };
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1997);
    Chart.prototype._findOrAppend = function(options) {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 1998);
        var element, found, node, selector;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 2e3);
        element = options["in"];
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 2001);
        node = options.what;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 2002);
        selector = options.selector || node;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 2003);
        found = element.select(selector);
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 2004);
        if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 2004, found != null ? found[0][0] : void 0)) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 2005);
            return found;
        } else {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 2007);
            return element.append(node);
        }
    };
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 2011);
    Chart.prototype._slice = function(d) {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 2012);
        var _ref7;
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 2014);
        if (_$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 2014, !this._allRenderersCartesian())) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 2015);
            return true;
        }
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 2017);
        return this.timeframe[0] <= (_ref7 = d.x) && _ref7 <= this.timeframe[1];
    };
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 2020);
    Chart.prototype._deg2rad = function(deg) {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 2021);
        return deg * Math.PI / 180;
    };
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 2024);
    Chart.prototype._hasDifferentRenderers = function() {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 2025);
        return _.uniq(_.map(this.series, function(s) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 2026);
            return s.renderer;
        })).length > 1;
    };
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 2030);
    Chart.prototype._containsColumnChart = function() {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 2031);
        return _.any(this.renderers, function(r) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 2032);
            return r.name === "column";
        });
    };
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 2036);
    Chart.prototype._allRenderersCartesian = function() {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 2037);
        return _.every(this.renderers, function(r) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 2038);
            return r.cartesian === true;
        });
    };
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 2042);
    Chart.prototype._allSeriesDisabled = function() {
        _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 2043);
        return _.every(this.series, function(s) {
            _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 2044);
            return s.disabled === true;
        });
    };
    _$jscoverage_done("/Users/ask/Sites/work/activecell/tactile/test/../dist/tactile.js", 2048);
    return Chart;
}();