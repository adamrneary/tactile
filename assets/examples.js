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
      shortLink: "aggregated_data",
      title: "Column Aggregated Data Chart"
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
    }
  ];

  showcaseObject = {
    routes: {}
  };

  prepareLinks = function(route, el) {
    var link;
    link = $("<a>").attr("href", "#" + route.shortLink).text(route.title);
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
    return window.location.hash = "#aggregated_data";
  });

}).call(this);
