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
]

noncartesian = [
  shortLink: "gauge"
  title: "Gauge"
,
  shortLink: "leaderboard"
  title: "Leaderboard (future)"
,
  shortLink: "sankey"
  title: "Sankey (future)"
,
  shortLink: "donut"
  title: "Donut"
,
  shortLink: "multi-donut"
  title: "Multiple donuts (future)"
]

components = [
  shortLink: "dual-scaled"
  title: "Secondary y-axis"
,
  shortLink:"sliding-timeframe"
  title: "Sliding timeframe"
,
  shortLink:"filter"
  title: "Filters (future)"
,
  shortLink:"legend"
  title: "Legend"
,
  shortLink:"chart-update"
  title: "Chart update"
,
  shortLink:"stacked-column-big-data"
  title: "Stacked column big data"
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
  link = $("<a>").attr("href", "/#" + route.shortLink).text(route.title)
  el.append $("<li>").append(link)
  showcaseObject.routes[route.shortLink] = route.shortLink
  showcaseObject[route.shortLink] = ->
    $("#example_header").text route.title
    urlCoffee = "coffee/" + route.shortLink + ".coffee"
    url = "js/" + route.shortLink + ".js"
    script = $("<script>").attr("src", url)
    $("#example_view").empty()
    $("#example_js").empty().append script
    # $("#temp").empty()

    $(".stack-unstack-buttons").hide()
    $(".stack-unstack-buttons").show()  if route.groupingButtons

    # $.get urlCoffee, (data) ->
    #   $("#example_js").text data
    # $.get url, (data) ->
      # $("#example_view").text data

    $("#example_js").load urlCoffee, ->
      $(@).removeClass("rainbow")
      Rainbow.color()
    Rainbow.color()

$(document).ready ->
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
  Backbone.history.start()

  showcase.navigate "/#line"  unless window.location.hash


