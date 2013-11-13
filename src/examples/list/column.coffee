frameVal = [new Date(2012, 2, 1).getTime(), new Date(2012, 11, 1)] # = [2012-Mar-01, 2012-Dec-01]
# time (period here) is unix milliseconds
data = [
  period: new Date(2012, 0, 1).getTime()
  actual: 4
  plan: 1
,
  period: new Date(2012, 1, 1).getTime()
  actual: 5
  plan: 1
,
  period: new Date(2012, 2, 1).getTime()
  actual: 6
  plan: 2
,
  period: new Date(2012, 3, 1).getTime()
  actual: 7
  plan: 3
,
  period: new Date(2012, 4, 1).getTime()
  actual: 6
  plan: 5
,
  period: new Date(2012, 5, 1).getTime()
  actual: 5
  plan: 8
,
  period: new Date(2012, 6, 1).getTime()
  actual: 4
  plan: 5
,
  period: new Date(2012, 7, 1).getTime()
  actual: 5
  plan: 3
,
  period: new Date(2012, 8, 1).getTime()
  actual: 6
  plan: 2
,
  period: new Date(2012, 9, 1).getTime()
  actual: 7
  plan: 1
,
  period: new Date(2012,10, 1).getTime()
  actual: 6
  plan: 1
,
  period: new Date(2012,11, 1).getTime()
  actual: 5
  plan: 2
,
  period: undefined
  actual: 30
  plan: undefined
]
chart = new Tactile.Chart()
  .element($("#example_view")[0])
  .data(data)
  .setXFrame(frameVal)
  .axes({x: {dimension: 'time'}, y: {dimension: "linear"}})
  .addSeries [
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
      d.x == new Date(2012, 0, 1).getTime()
    tooltip: (d) ->
      d.y + " planned"

    dataTransform: (d) ->
      x: d.period
      y: d.plan

    afterDrag: (d, y, i, draggedSeries, graph) ->
      graph._data[i].plan = y
  ]

chart.render()

# interactions

$("#above-chart").html ''

sl = $("<div>")
  .attr("id", "slider")
  .attr("class", "ui-horizontal-slider")
$("#below-chart").html sl
sl.slider
  min: 0 # Jan
  max: 11 # Dec
  values: [0, 11]
  range: true
  slide: (event, ui) ->
    chart.setXFrame([new Date(2012,  0+ui.values[0], 1).getTime(),
                     new Date(2012,  0+ui.values[1], 1).getTime()])
    chart.render()