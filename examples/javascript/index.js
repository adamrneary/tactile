$(document).ready(function(){
                      var examples = [
                          {shortLink:"simple-line", title: "Simple Line"},
                          {shortLink:"bars-and-line", title: "Bars and Line"},
                          {shortLink:"stacked-bars", title: "Stacked Bars"}
                      ];



                      var showcaseObject = {routes:{}};
                      var linkList = $("#linkList");

                      _.map(examples,function(route){
                                console.log(route.shortLink,route.title);
                                var link = $("<a>").attr("href","/#"+route.shortLink).text(route.title);
                                var li = $("<li>").append(link);
                                linkList.append(li);
                                console.log(link,li);

                                showcaseObject.routes[route.shortLink] = route.shortLink;
                                showcaseObject[route.shortLink] = function(){
                                    $("#example_view").html("");
                                    $.get("javascript/"+route.shortLink+".js",function(data){
                                              $("#example_js").html(data);
                                          });
                                };          
                            });

                      var Showcase = Backbone.Router.extend(showcaseObject);
                      var showcase = new Showcase();
                      Backbone.history.start();
                      showcase.navigate("/#simple-line");
                  });