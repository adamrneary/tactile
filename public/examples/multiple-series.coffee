frameVal = [1325376000000, 1354320000000]
data = [

  # time (period here) is unix milliseconds
  period: 1325376000000
  actual: 4
  plan: 0
,
  period: 1328054400000
  actual: 5
  plan: 1
,
  period: 1330560000000
  actual: 6
  plan: 2
,
  period: 1333238400000
  actual: 7
  plan: 3
,
  period: 1335830400000
  actual: 6
  plan: 5
,
  period: 1338508800000
  actual: 5
  plan: 8
,
  period: 1341100800000
  actual: 4
  plan: 5
,
  period: 1343779200000
  actual: 5
  plan: 3
,
  period: 1346457600000
  actual: 6
  plan: 2
,
  period: 1349049600000
  actual: 7
  plan: 1
,
  period: 1351728000000
  actual: 6
  plan: 1
,
  period: 1354320000000
  actual: 5
  plan: 2
]

chart = new Tactile.Chart()
  .element($("#example_view")[0])
  .data(data)
  .axes({x: {dimension: 'time', frame: frameVal}, y: {dimension: "linear"}})
  .addSeries [
    name: "reach actual"
    renderer: "column"
    wide: true
    isEditable: true
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
    color: "#c05020"
    isEditable: true
    tooltip: (d) ->
      d.y + " customers planned"
    dataTransform: (d) ->
      x: d.period
      y: d.plan
    afterDrag: (d, y, i, draggedSeries, graph) ->
      graph.data()[i].plan = y
  ]

chart.render()

$("#above-chart").html ''
$("#below-chart").html ''

sl = $("<div>")
  .attr("id", "slider")
  .attr("class", "ui-horizontal-slider")
$("#below-chart").html sl
sl.slider
  min: frameVal[0]
  max: frameVal[1]
  values: frameVal
  range: true
  slide: (event, ui) ->
    chart.axes().x.frame = ui.values
    chart.render()