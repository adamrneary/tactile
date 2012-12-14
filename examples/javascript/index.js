var cartesian = [
  {
    shortLink: "line", 
    title: "Line"
  },
  {
    shortLink: "column", 
    title: "Column"
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
  }
];

var components = [
  {
    shortLink:"sliding-timeframe", 
    title: "Sliding timeframe"
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