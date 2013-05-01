frameVal = [0, 4]
data = [
  x: 0
  y: 10
  z: 0
,
  x: 1
  y: 170
  z: 200
,
  x: 2
  y: 280
  z: 100
,
  x: 3
  y: 205
  z: 240
,
  x: 4
  y: 280
  z: 100
,
  x: 5
  y: 205
  z: 240

]


chart = new Tactile.Chart()
  .axes({x: {dimension: 'linear', frame: frameVal}, y: {dimension: "linear"}})
  .element($("#example_view")[0])
  .data(data)
  .addSeries [
    name: "enemies"
    renderer: "line"
    color: "#c05020"
    tooltip: (d) ->
      d.y + " enemies"
    dataTransform: (d) ->
      x: d.x
      y: d.y
  ,
    name: "friends"
    dotSize: 2
    renderer: "line"
    sigfigs: 1
    color: "#6060c0"
    tooltip: (d) ->
      d.y + " friends"
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
  min: 0
  max: 5
  values: frameVal
  range: true
  slide: (event, ui) ->
    chart.axes().x.frame = ui.values
    chart.render()

turnOffAxes = $("<button class='btn btn-mini'>Turn off axes</button>")
$("#above-chart").html turnOffAxes
turnOffAxes.click (e) =>
  chart.axes [], overwrite: true
  chart.render(1000)
  e.stopPropagation()
