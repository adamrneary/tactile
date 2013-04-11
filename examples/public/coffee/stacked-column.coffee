frameVal = [1330560000, 1354320000]
data = [
  
  # time (period here) is unix milliseconds/1000
  period: 1325376000
  actual: 4
  plan: 1
,
  period: 1328054400
  actual: 5
  plan: 1
,
  period: 1330560000
  actual: 6
  plan: 2
,
  period: 1333238400
  actual: 7
  plan: 3
,
  period: 1335830400
  actual: 6
  plan: 5
,
  period: 1338508800
  actual: 5
  plan: 8
,
  period: 1341100800
  actual: 4
  plan: 5
,
  period: 1343779200
  actual: 5
  plan: 3
,
  period: 1346457600
  actual: 6
  plan: 2
,
  period: 1349049600
  actual: 7
  plan: 1
,
  period: 1351728000
  actual: 6
  plan: 1
,
  period: 1354320000
  actual: 5
  plan: 2
]
chart = new Tactile.Chart(unstack: false)
  .element($("#example_view")[0]).data(data)
chart.width(680).height 400
chart.axes
  y: "linear"
  x:
    dimension: "time"
    frame: frameVal
    options:
      ticksTreatment: "align-middle"

chart.addSeries
  name: "reach actual"
  renderer: "column"
  round: false
  color: "#c05020"
  tooltip: (d) ->
    d.y + " customers"

  dataTransform: (d) ->
    x: d.period
    y: d.actual

chart.addSeries [
  name: "planned"
  renderer: "column"
  round: false
  color: "#6060c0"
  tooltip: (d) ->
    d.y + " planned"

  dataTransform: (d) ->
    x: d.period
    y: d.plan
,
  name: "sum"
  renderer: "column"
  round: false
  color: "#6020c0"
  tooltip: (d) ->
    d.y + " sum"

  dataTransform: (d) ->
    x: d.period
    y: parseInt(d.plan + d.actual)
]
chart.render()
sl = $("<div>").attr("id", "slider")
$("#example_view").append sl
sl.slider
  min: 1325376000
  max: 1354320000
  values: frameVal
  range: true
  slide: (event, ui) ->
    chart._axes.x.frame = ui.values
    chart.render()

$("#group").on "click", (e)->
  chart.unstackTransition()
  e.stopPropagation()

$("#stack").on "click", (e)->
  chart.stackTransition()
  e.stopPropagation()
