frameVal = [1325376000, 1354320000]
data = [
  
  # time (period here) is unix milliseconds/1000
  period: 1325376000
  actual: 4
  plan: 0
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
chart = new Tactile.Chart().element($("#example_view")[0]).data(data).width(680).height(400).axes(x:
  dimension: "time"
  frame: frameVal
)
chart.addSeries [
  name: "reach actual"
  renderer: "column"
  wide: true
  draggable: true
  round: true
  color: "#6020c0"
  tooltip: (d) ->
    d.y + " customers"

  dataTransform: (d) ->
    x: d.period
    y: d.actual

  afterDrag: (d, y, i, draggedSeries, graph) ->
    graph.data()[i].actual = y
,
  name: "reach plan"
  renderer: "line"
  # sigfigs: 0
  color: "#c05020"
  draggable: true
  tooltip: (d) ->
    d.y + " customers planned"

  dataTransform: (d) ->
    x: d.period
    y: d.plan

  # onDrag: (d, series, graph) ->

  afterDrag: (d, y, i, draggedSeries, graph) ->
    graph.data()[i].plan = y
]
chart.render()
sl = $("<div>").attr("id", "slider")
$("#example_view").append sl
sl.slider
  min: frameVal[0]
  max: frameVal[1]
  values: frameVal
  range: true
  slide: (event, ui) ->
    chart.axes().x.frame = ui.values
    chart.render()

