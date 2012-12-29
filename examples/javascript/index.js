var cartesian = [
{
  shortLink: "scatter", 
  title: "Scatter"
},
{
  shortLink: "line", 
  title: "Line"
},
{
  shortLink: "column", 
  title: "Column"
},
{
  shortLink: "stacked-column", 
  title: "Stacked column",
  groupingButtons: true
},
{
  shortLink: "area", 
  title: "Area"
},
{
  shortLink: "multiple-series", 
  title: "Multiple series types"
}
];

var noncartesian = [
{
  shortLink: "gauge",
  title: "Gauge"
},
{
  shortLink: "leaderboard",
  title: "Leaderboard (future)"
},
{
  shortLink: "sankey",
  title: "Sankey (future)"
},
{
  shortLink: "donut",
  title: "Donut"
},
{
  shortLink: "multi-donut",
  title: "Multiple donuts (future)"
}
];

var components = [
{
  shortLink:"sliding-timeframe", 
  title: "Sliding timeframe"
},
{
  shortLink:"filter", 
  title: "Filters (future)"
},
{
  shortLink:"legend", 
  title: "Legend (future)"
}
];

var showcaseObject = {
  routes: {}
};


var prepareLinks = function(route, el) {
  var link = $("<a>")
  .attr("href", "/#" + route.shortLink)
  .text(route.title);
  el.append($("<li>").append(link));
  showcaseObject.routes[route.shortLink] = route.shortLink;
  showcaseObject[route.shortLink] = function() {
    $("#example_header").text(route.title);
    var url = "javascript/" + route.shortLink + ".js";
    var script = $("<script>").attr("src", url);
    $("#example_view").empty().append(script);
    
    $(".stack-unstack-buttons").hide();
    if(route.groupingButtons) {
      $(".stack-unstack-buttons").show();
    }
    
    $("#example_js").load(url, function() {
      $(this).removeClass("rainbow");
      Rainbow.color();
    });
    Rainbow.color();
  };
}

$(document).ready(function() {
  _.map(cartesian, function(route) {
    prepareLinks(route, $("#cartLinkList"));
  });
  _.map(noncartesian, function(route) {
    prepareLinks(route, $("#noncartLinkList"));
  });
  _.map(components, function(route) {
    prepareLinks(route, $("#compLinkList"));
  });

  var Showcase = Backbone.Router.extend(showcaseObject);
  var showcase = new Showcase();

  Backbone.history.start();
  if (!window.location.hash) {
    showcase.navigate("/#line");
  }
});