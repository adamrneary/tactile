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

chart = new Tactile.Chart(padding: {top: 0, right: 0, bottom: 5, left: 0}, unstack: false)
  .element($("#example_view")[0])
  .data(data)
  .setXFrame(frameVal)
  .axes
    y: "linear"
    x:
      dimension: "linear"

chart.addSeries [
  name: "enemies"
  renderer: "area"
  dotSize: 1
  sigfigs: 0
  color: "#c05020"
  dataTransform: (d) ->
    x: d.x
    y: d.y
,
  name: "friends"
  renderer: "area"
  sigfigs: 1
  color: "#6060c0"
  dataTransform: (d) ->
    x: d.x
    y: d.z
,
  name: "sum"
  renderer: "area"
  color: "#006400"
  dataTransform: (d) ->
    x: d.x
    y: d.y + d.z/2
]

chart.render()

stackButton = $("<button class='btn btn-mini'>Stack</button>")
unstackButton = $("<button class='btn btn-mini'>Unstack</button>")
buttonGroup = $("<div class='btn-group'></div>")
buttonGroup.prepend stackButton
buttonGroup.prepend unstackButton

$("#above-chart").html ''
$("#above-chart").prepend buttonGroup
unstackButton.click (e) ->
  chart.unstackTransition()
  e.stopPropagation()
stackButton.click (e) ->
  chart.stackTransition()
  e.stopPropagation()

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