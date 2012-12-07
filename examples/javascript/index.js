(function(){
var examples = ["simple-line","bars-and-line","stacked-bars"];

var showcaseObject = {routes:{}};

_.map(examples,function(route){
          showcaseObject.routes[route] = route;
          showcaseObject[route] = function(){
              $.get("javascript/"+route+".js",function(data){
                        $("#example_js").html(data);                        
//                        eval(data);//TODO Find a better way to do this
                        });
          };          
});

var Showcase = Backbone.Router.extend(showcaseObject);
var showcase = new Showcase();
$(document).ready(function(){
                      Backbone.history.start();
                  });
})();