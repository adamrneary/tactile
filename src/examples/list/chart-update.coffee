frameVal = [new Date(2012,  0, 1).getTime(), new Date(2012, 11, 1).getTime()] # = [2012-Jan, 2012-Dec]
data = [

  # time (period here) is unix milliseconds
  period: new Date(2012,  0, 1).getTime()
  actual: 4
  plan: 0
,
  period: new Date(2012,  1, 1).getTime()
  actual: 5
  plan: 1
,
  period: new Date(2012,  2, 1).getTime()
  actual: 6
  plan: 2
,
  period: new Date(2012,  3, 1).getTime()
  actual: 7
  plan: 3
,
  period: new Date(2012,  4, 1).getTime()
  actual: 6
  plan: 5
,
  period: new Date(2012,  5, 1).getTime()
  actual: 5
  plan: 8
,
  period: new Date(2012,  6, 1).getTime()
  actual: 4
  plan: 5
,
  period: new Date(2012,  7, 1).getTime()
  actual: 5
  plan: 3
,
  period: new Date(2012,  8, 1).getTime()
  actual: 6
  plan: 2
,
  period: new Date(2012,  9, 1).getTime()
  actual: 7
  plan: 1
,
  period: new Date(2012, 10, 1).getTime()
  actual: 6
  plan: 1
,
  period: new Date(2012, 11, 1).getTime()
  actual: 5
  plan: 2
]

chart = new Tactile.Chart()
  .element($("#example_view")[0])
  .data(data)
  .axes({x: {dimension: 'time'}, y: {dimension: "linear"}})
  .setXFrame(frameVal)
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

# interactions

randomDataButton = $("<button class='btn btn-mini'>Set random data</button>")
$("#above-chart").html randomDataButton
randomDataButton.click ()->
  i = 0
  while i < data.length
    data[i].plan = Math.floor Math.random()*10
    data[i].actual = Math.floor Math.random()*10
    i++
  chart.data(data)
  chart.render(1000)

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
    chart.setXFrame(ui.values)
    chart.render()