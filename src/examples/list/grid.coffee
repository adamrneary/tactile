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
  if d > 99 then "3000★" else "#{d*10}☢"

chart = new Tactile.Chart(padding: {top: 0, right: 0, bottom: 5, left: 0})
  .axes({x: {dimension: 'linear', tickFormat: tickFormat}, y: {dimension: "linear", tickFormat: tickFormat}})
  .grid(
    x:
      values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
      color: "#32CD32"
      lineWidth: 5
    y:
      values: [0, 100, 200, 300]
  )
  .element($("#example_view")[0])
  .setXFrame(frameVal)
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
    chart.setXFrame(ui.values)
    chart.render()