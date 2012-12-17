var cartesian = [
  {
    shortLink: "scatter", 
    title: "Scatter (future)"
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
    title: "Stacked column (future)"
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
  routes:{}
};

$(document).ready(function(){

  // TODO: remove the duplicative code i just created!
  var linkList = $("#cartLinkList");
  _.map(cartesian,function(route){
    var link = $("<a>")
      .attr("href","/#"+route.shortLink)
      .text(route.title);
    linkList.append($("<li>").append(link));

    showcaseObject.routes[route.shortLink] = route.shortLink;
    showcaseObject[route.shortLink] = function(){
      $("#example_header").text(route.title);
      var url = "javascript/"+route.shortLink+".js";
      var script = $("<script>").attr("src",url);
      $("#example_view").empty().append(script);
      $("#example_js").load(url,function(){
        $(this).removeClass("rainbow");
        Rainbow.color();
      });
      Rainbow.color();
    };          
  });

  var linkList = $("#noncartLinkList");
  _.map(noncartesian,function(route){
    var link = $("<a>")
      .attr("href","/#"+route.shortLink)
      .text(route.title);
    linkList.append($("<li>").append(link));

    showcaseObject.routes[route.shortLink] = route.shortLink;
    showcaseObject[route.shortLink] = function(){
      $("#example_header").text(route.title);
      var url = "javascript/"+route.shortLink+".js";
      var script = $("<script>").attr("src",url);
      $("#example_view").empty().append(script);
      $("#example_js").load(url,function(){
        $(this).removeClass("rainbow");
        Rainbow.color();
      });
      Rainbow.color();
    };          
  });

  var linkList = $("#compLinkList");
  _.map(components,function(route){
    var link = $("<a>")
      .attr("href","/#"+route.shortLink)
      .text(route.title);
    linkList.append($("<li>").append(link));

    showcaseObject.routes[route.shortLink] = route.shortLink;
    showcaseObject[route.shortLink] = function(){
      $("#example_header").text(route.title);
      var url = "javascript/"+route.shortLink+".js";
      var script = $("<script>").attr("src",url);
      $("#example_view").empty().append(script);
      $("#example_js").load(url,function(){
        $(this).removeClass("rainbow");
        Rainbow.color();
      });
      Rainbow.color();
    };          
  });

  var Showcase = Backbone.Router.extend(showcaseObject);
  var showcase = new Showcase();

  Backbone.history.start();
  if(!window.location.hash) {
    showcase.navigate("/#line");
  }
});