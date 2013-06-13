frameVal = [0, 4]
data = [
  x: 0
  y: 10
  z: 0
,
  x: 1
  y: 170
  z: 20
,
  x: 2
  y: 280
  z: 50
,
  x: 3
  y: 205
  z: 35
,
  x: 4
  y: 280
  z: 55
,
  x: 5
  y: 205
  z: 70
,
  x: 6
  y: 280
  z: 75
,
  x: 7
  y: 205
  z: 95
,
  x: 8
  y: 332
  z: 100
]

chart = new Tactile.Chart()
  .element($("#example_view")[0])
  .data(data)
  .setAutoScale(false)
  .setAvailableXFrame([-1, 9])
  .setMinXFrame(3)
  .setAvailableYFrame([0, 400])
  .setMinYFrame(20)
  .setAvailableY1Frame([0, 150])
  .setMinY1Frame(10)
  .axes(
    x: {dimension: 'linear', frame: [-1, 9]}
    y: {dimension: "linear", frame: [0, 350]}
    y1: {dimension: "linear", frame: [0, 100], tickFormat: (d) -> d + '%'}
  )

chart.addSeries [
    name: "enemies"
    renderer: "column"
    color: "#c05020"
    tooltip: (d) ->
      d.y + " enemies"
  ,
    yAxis: 'y1'
    name: "friends"
    renderer: "line"
    color: "#6060c0"
    tooltip: (d) -> d.y + "%"

    dataTransform: (d) ->
      x: d.x
      y: d.z
  ]

chart.render()

# interactions

$("#above-chart").html ''

sl = $("<div>")
  .attr("id", "slider")
  .attr("class", "ui-horizontal-slider")
$("#below-chart").html sl
sl.slider
  min: -5
  max: 20
  values: [0, 8]
  range: true
  slide: (event, ui) ->
    chart.axes().x.frame = ui.values
    chart.render()

chart.onUpdate(()->
  sl.slider
    values: chart.x.domain()
)
