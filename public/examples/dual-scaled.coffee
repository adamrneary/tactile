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
  .axes({x: {dimension: 'linear'}, y: {dimension: "linear"}, y1: {dimension: 'linear', tickFormat: (d) -> d + '%'}})
  .element($("#example_view")[0])
  .data(data)
  .addSeries [
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
    tooltip: (d) ->
      d.y + "%"

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
  max: 8
  values: [0, 8]
  range: true
  slide: (event, ui) ->
    chart.axes().x.frame = ui.values
    chart.render()