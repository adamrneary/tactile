cartesian = JSON.parse require("fs").readFileSync("cartesian.json")
noncartesian = JSON.parse require("fs").readFileSync("noncartesian.json")
components = JSON.parse require("fs").readFileSync("components.json")

# core = [
#   shortLink: "area_renderer"
#   title: "area renderer"
# ,
#   shortLink: "axis_time"
#   title: "axis_time"
# ]

showcaseObject = routes: {}
prepareLinks = (route, el) ->
  link = $("<a>").attr("href", "#" + route.shortLink).text(route.title)
  el.append $("<li>").append(link)
  showcaseObject.routes[route.shortLink] = route.shortLink
  showcaseObject[route.shortLink] = ->
    $("#example_header").text route.title
    urlCoffee = "examples/" + route.shortLink + ".coffee"
    url       = "examples/" + route.shortLink + ".js"

    $(".stack-unstack-buttons").hide()
    $(".stack-unstack-buttons").show()  if route.groupingButtons

    $.get urlCoffee, (data) ->
      $("#example_view").empty()
      $("#example_js").text(data).removeClass("rainbow")
      Rainbow.color()
      source = CoffeeScript.compile(data)
      $("#example_code").remove()
      $('body').append $("<script id='example_code'>#{source}</script>")

$(document).ready ->
  Tactile.debug = true;
  _.map cartesian, (route) ->
    prepareLinks route, $("#cartLinkList")
  _.map noncartesian, (route) ->
    prepareLinks route, $("#noncartLinkList")
  _.map components, (route) ->
    prepareLinks route, $("#compLinkList")
  # _.map core, (route) ->
  #   prepareLinks route, $("#coreLinkList")

  Showcase = Backbone.Router.extend(showcaseObject)
  showcase = new Showcase()
#  showcase.navigate "#line"  unless window.location.hash
  window.location.hash = "#line"