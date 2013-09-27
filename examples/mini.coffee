frameVal = [0, 4]
data = [
  x: 0
  y: 0
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

chart = new Tactile.Chart(height: 80, width: 80)
  .element($("#example_view")[0])
  .data(data)
  .addSeries [
    name: "enemies"
    renderer: "line"
    dotSize: 0
    color: "#c05020"
    dataTransform: (d) ->
      x: d.x
      y: d.y
  ,
    name: "friends"
    dotSize: 0
    renderer: "line"
    color: "#6060c0"
    dataTransform: (d) ->
      x: d.x
      y: d.z
  ]

chart.setPadding(top: 0, right: 0, bottom: 0, left: 0)
chart.render()
$("#above-chart").html ''
