frameVal = [1330560000, 1335830400]
# time (period here) is unix milliseconds/1000
data = [
  period: 1325376000
  actual: 420
  plan: 1
,
  period: 1328054500
  actual: 144
  plan: 1
,
  period: 1330560000
  actual: 564
  plan: 2
,
  period: 1333238400
  actual: 10
  plan: 3
,
  period: 1335830400
  actual: -100
  plan: 5
]
chart = new Tactile.Chart()
  .element($("#example_view")[0]).height(500).width(700).data data
chart.axes({x: {dimension: 'time', frame: frameVal}, y: {dimension: "linear"}})

chart.addSeries [
  name: "reach actual"
  renderer: "waterfall"
  round: false
  color: "#c05020"
  tooltip: (d) ->
    d.y + " customers"

  dataTransform: (d) ->
    x: d.period
    y: d.actual
]
chart.axes().x.frame = frameVal
chart.render()
sl = $("<div>").attr("id", "slider")
$("#example_view").append sl
sl.slider
  min: 1325376000
  max: 1354320000
  values: frameVal
  range: true
  slide: (event, ui) ->
    chart.axes().x.frame = ui.values
    chart.render()

