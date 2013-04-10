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

chart.axes({x: {dimension: 'linear', frame: frameVal}, y: {dimension: "linear"}, y1: {dimension: 'linear', tickFormat: (d) -> d + '%'}})
chart.element($("#example_view")[0]).data(data)

chart.addSeries
  name: "enemies"
  renderer: "line"
  color: "#c05020"
  tooltip: (d) ->
    d.y + " enemies"

chart.addSeries
  scaleAxis: 'y1'
  name: "friends"
  renderer: "line"
  color: "#6060c0"
  tooltip: (d) ->
    d.y + "%"

  dataTransform: (d) ->
    x: d.x
    y: d.z

chart.render()



sl = $("<div>").attr("id", "slider")
$("#example_view").append sl
sl.slider
  min: 0
  max: 8
  values: frameVal
  range: true
  slide: (event, ui) ->
    chart.axes().x.frame = ui.values
    chart.render()

