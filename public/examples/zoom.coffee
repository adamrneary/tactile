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
,
  x:9
  y: undefined
  z: undefined
]

tickFormat = (d) ->
  if d > 99 then d / 100 + "★" else "#{d*10}☢"

chart = new Tactile.Chart(
  autoScale: false
  xframe: [0, 10]
  yframe: [0, 500]
)
  .axes({x: {dimension: 'linear', frame: frameVal, tickFormat: tickFormat}, y: {dimension: "linear", tickFormat: tickFormat}})
  .element($("#example_view")[0])
  .data(data)
  .addSeries [
    name: "enemies"
    renderer: "line"
    color: "#c05020"
    isEditable: true
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
    isEditable: (d, i) ->
      d.x == 2
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