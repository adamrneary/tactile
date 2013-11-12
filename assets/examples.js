(function() {
  var cartesian, components, noncartesian, prepareLinks, showcaseObject;

  cartesian = JSON.parse(require("fs").readFileSync("cartesian.json"));

  noncartesian = JSON.parse(require("fs").readFileSync("noncartesian.json"));

  components = JSON.parse(require("fs").readFileSync("components.json"));

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
    return window.location.hash = "#line";
  });

}).call(this);
