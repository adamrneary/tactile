var examples = [
{
  shortLink:"simple-line", 
  title: "Simple Line"
},
{
  shortLink:"bars-and-line", 
  title: "Bars and Line"
},
{
  shortLink:"stacked-bars", 
  title: "Stacked Bars"
}
];

var showcaseObject = {
  routes:{}
};


$(document).ready(function(){
  var linkList = $("#linkList");
  _.map(examples,function(route){
    var link = $("<a>")
    .attr("href","/#"+route.shortLink)
    .text(route.title);
    linkList.append( $("<li>").append(link));

    showcaseObject.routes[route.shortLink] = route.shortLink;
    showcaseObject[route.shortLink] = function(){
      $("#example_view").html("");
      $("#example_header").text(route.title);
      console.log("yo",route.shortLink);
      $.get("javascript/"+route.shortLink+".js",function(data){
        console.log("yo",data);
        $("#example_js").html(data);
      });
    };          
  });

  var Showcase = Backbone.Router.extend(showcaseObject);
  var showcase = new Showcase();

  Backbone.history.start();
  showcase.navigate("/#simple-line"); // TODO: should be switch iff no provided hashlinks.
});