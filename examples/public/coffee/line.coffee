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
,
  x: 6
  y: 280
  z: 100
,
  x: 7
  y: 205
  z: 240
,
  x: 8
  y: 332
  z: 490
]
chart = new Tactile.Chart()
chart.axes({x: {dimension: 'time', frame: frameVal}, y: {dimension: "linear"}})
chart.element($("#example_view")[0]).data(data)

chart.addSeries
  name: "enemies"
  renderer: "line"
  color: "#c05020"
  tooltip: (d) ->
    d.y + " enemies"

  dataTransform: (d) ->
    x: d.x
    y: d.y

chart.addSeries
  name: "friends"
  dotSize: 1
  renderer: "line"
  sigfigs: 1
  color: "#6060c0"
  draggable: true
  afterDrag: (d, y, i, draggedSeries, graph) ->
    graph.data()[i].z = y

  tooltip: (d) ->
    d.y + " friends"

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
