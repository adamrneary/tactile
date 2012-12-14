var examples = [
    {
        shortLink: "line", 
        title: "Line"
    },
    {
        shortLink: "area", 
        title: "Area"
    },
    {
        shortLink:"sliding-timeframe", 
        title: "Sliding timeframe"
    },
    {
        shortLink: "multiple-series", 
        title: "Multiple series"
    },
    {
        shortLink: "gauge",
        title: "Gauge"
        
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
