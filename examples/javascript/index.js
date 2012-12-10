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
                                linkList.append($("<li>").append(link));

                                showcaseObject.routes[route.shortLink] = route.shortLink;
                                showcaseObject[route.shortLink] = function(){
                                    $("#example_header").text(route.title);
                                    var url = "javascript/"+route.shortLink+".js";
                                    var script = $("<script>").attr("src",url);
                                    $("#example_view").empty().append(script);
                                    $("#example_js").load(url);
                                };          
                            });

                      var Showcase = Backbone.Router.extend(showcaseObject);
                      var showcase = new Showcase();


                      Backbone.history.start();
                      if(!window.location.hash) {
                          showcase.navigate("/#simple-line");
                      }
                  });
