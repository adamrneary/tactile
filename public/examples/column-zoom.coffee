###
Specific options for zoomable chart:
available[X|Y|Y1]Frame
  min and max values that can be zoomed or moved to.
  Computed if not given

min[X|Y|Y1]Frame
  this is the minimum distance between points to which you can zoom in.
  1 by default

max[X|Y|Y1]Frame
  this is the maximum distance between points to which you can zoom out.
  Infinity by default
###

frameVal = [1333238400000, 1349049600000]
# time (period here) is unix milliseconds/1000
data = [
  period: 1325376000000
  actual: 4
  plan: 1
,
  period: 1328054500000
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
,
  period: undefined
  actual: 3
  plan: undefined
]


unit =
  name: "month"
  seconds: 86400000 * 30.5
  formatter: (d) =>
    months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    months[d.getUTCMonth()]

chart = new Tactile.Chart(
    # turn the zoom on
    autoScale: false
    # it's possible to zoom out to see all the periods in data
    availableXFrame: [1330560000000, 1354320000000]
    # set the max zoom out Y value to be 20
    availableYFrame: [0, 20]
    # set minimum possible range to around 4 months
    minXFrame: 7960587796
    # ...and 4 points
    minYFrame: 4
  )
  .setXFrame(frameVal)
  .element($("#example_view")[0])
  .data(data)
  .axes(
    # note that we're passing initial frame just like in a regular chart
    x: dimension: 'time', timeUnit: unit
    y: dimension: "linear")
  .addSeries [
    name: "actual"
    renderer: "column"
    sigfigs: 0
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
    color: "#6060c0"
    isEditable: (d, i) ->
      d.x == 1325376000000
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
  min: 1330560000000
  max: 1354320000000
  values: frameVal
  range: true
  slide: (event, ui) ->
    chart.setXFrame(ui.values)
    chart.render()

chart.onUpdate(()->
  sl.slider
    min: if chart.x.domain()[0] < 1330560000000 then chart.x.domain()[0] else 1330560000000
    max: if chart.x.domain()[1] > 1354320000000 then chart.x.domain()[1] else 1354320000000
    values: chart.x.domain()
)
