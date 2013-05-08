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
  x: undefined
  y: undefined
  z: undefined
,
  x: 2
  y: 280
  z: 120
,
  x: 3
  y: 205
  z: 240
,
  x: 4
  y: 280
  z: 120
,
  x: 5
  y: 205
  z: 240
,
  x: 6
  y: 280
  z: 120
,
  x: 7
  y: 205
  z: 240
,
  x: 8
  y: 120
  z: 490
]

chart = new Tactile.Chart(unstack: false)
  .element($("#example_view")[0])
  .data(data)
  .axes({x:{dimension: "time", frame: frameVal}})
  .addSeries [
    name: "enemies"
    renderer: "area"
    dotSize: 1
    sigfigs: 0
    isEditable: true
    afterDrag: (d, y, i, draggedSeries, graph) ->
      graph.data()[i].y = y
    color: "#c05020"
    tooltip: (d) ->
      d.y + " friends"
    dataTransform: (d) ->
      x: d.x
      y: d.y
  ,
    name: "friends"
    renderer: "area"
    sigfigs: 1
    color: "#6060c0"
    isEditable: true
    afterDrag: (d, y, i, draggedSeries, graph) ->
      graph.data()[i].z = y
    tooltip: (d) ->
      d.y + " friends"
    dataTransform: (d) ->
      x: d.x
      y: d.z
  ]

chart.render()

$("#above-chart").html ''

sl = $("<div>")
  .attr("id", "slider")
  .attr("class", "ui-horizontal-slider")
$("#below-chart").html sl
sl.slider
  min: 0
  max: 8
  values: frameVal
  range: true
  slide: (event, ui) ->
    chart.axes().x.frame = ui.values
    chart.render()
