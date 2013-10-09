cartesian = [
  shortLink: "scatter"
  title: "Scatter"
,
  shortLink: "line"
  title: "Line"
,
  shortLink: "column"
  title: "Column"
,
  shortLink: "stacked-column"
  title: "Stacked column"
  groupingButtons: true
,
  shortLink: "area"
  title: "Area"
,
  shortLink: "stacked-area"
  title: "Stacked area"
,
  shortLink: "multiple-series"
  title: "Multiple series types"
,
  shortLink: "waterfall-timeseries"
  title: "Waterfall (time series)"
,
  shortLink: "activecell-examples"
  title: "Activecell Examples"
,
  shortLink: "aggregate-column"
  title: "Column Aggregated Data Chart"
,
  shortLink: "aggregate-line"
  title: "Line Aggregated Data Chart"
,
  shortLink: "aggregate-waterfall"
  title: "Waterfall Aggregated Data Chart"
]

noncartesian = [
  shortLink: "gauge"
  title: "Gauge"
,
  shortLink: "leaderboard"
  title: "Leaderboard"
,
  shortLink: "bullet"
  title: "Bullet"
,
#   shortLink: "sankey"
#   title: "Sankey (future)"
# ,
  shortLink: "donut"
  title: "Donut"
,
  shortLink: "multi-donut"
  title: "Multiple donuts"
]

components = [
  shortLink:"grid"
  title: "Grid"
,
  shortLink:"sliding-timeframe"
  title: "Sliding timeframe"
,
  shortLink:"chart-update"
  title: "Real time updates"
,
  shortLink:"legend"
  title: "Interactive legend"
,
  shortLink: "dual-scaled"
  title: "Secondary y-axis"
,
  shortLink: "axes-toggle"
  title: "Toggling axes"
,
  shortLink:"filter"
  title: "Filters (future)"
,
  shortLink:"stacked-column-big-data"
  title: "Stacked column big data"
,
  shortLink:"zoom"
  title: "Zoom"
,
  shortLink:"column-zoom"
  title: "Column zoom"
,
  shortLink:"dual-scaled-zoom"
  title: "Secondary y-axis zoom"
]

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
  window.location.hash = "#aggregate-line"