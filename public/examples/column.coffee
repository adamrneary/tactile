frameVal = [1330560000, 1354320000]
# time (period here) is unix milliseconds/1000
data = [
  period: 1325376000
  actual: 4
  plan: 1
,
  period: 1328054500
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
,
  period: undefined
  actual: 3
  plan: undefined
]
chart = new Tactile.Chart()
  .element($("#example_view")[0]).width(680).height(400).data data
chart.axes({x: {dimension: 'time', frame: frameVal}, y: {dimension: "linear"}})

chart.addSeries [
  name: "reach actual"
  renderer: "column"
  sigfigs: 0
  round: false
  color: "#c05020"
  isEditable: true
  tooltip: (d) ->
    d.y + " customers"

  dataTransform: (d) ->
    x: d.period
    y: d.actual

  afterDrag: (d, y, i, draggedSeries, graph) ->
    graph._data[i].actual = y
,
  name: "planned"
  renderer: "column"
  round: false
  color: "#6060c0"
  isEditable: (d, i) ->
    d.x == 1325376000
  tooltip: (d) ->
    d.y + " planned"

  dataTransform: (d) ->
    x: d.period
    y: d.plan

  afterDrag: (d, y, i, draggedSeries, graph) ->
    graph._data[i].plan = y
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

