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
  }
];

noncartesian = [
  {
    shortLink: "gauge",
    title: "Gauge"
  }, {
    shortLink: "leaderboard",
    title: "Leaderboard (future)"
  }, {
    shortLink: "sankey",
    title: "Sankey (future)"
  }, {
    shortLink: "donut",
    title: "Donut"
  }, {
    shortLink: "multi-donut",
    title: "Multiple donuts (future)"
  }
];

components = [
  {
    shortLink: "dual-scaled",
    title: "Secondary y-axis"
  }, {
    shortLink: "sliding-timeframe",
    title: "Sliding timeframe"
  }, {
    shortLink: "filter",
    title: "Filters (future)"
  }, {
    shortLink: "legend",
    title: "Legend"
  }, {
    shortLink: "chart-update",
    title: "Chart update"
  }, {
    shortLink: "stacked-column-big-data",
    title: "Stacked column big data"
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
    return $.get(urlCoffee, function(data) {
      var source;

      $("#example_view").empty();
      $("#example_js").text(data).removeClass("rainbow");
      Rainbow.color();
      source = CoffeeScript.compile(data);
      $("#example_code").remove();
      $('body').append($("<script id='example_code'>" + source + "</script>"));
      $(".stack-unstack-buttons").hide();
      if (route.groupingButtons) {
        return $(".stack-unstack-buttons").show();
      }
    });
  };
};

$(document).ready(function() {
  var Showcase, showcase;

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
  Backbone.history.start();
  if (!window.location.hash) {
    return showcase.navigate("/#line");
  }
});

}).call(this);

