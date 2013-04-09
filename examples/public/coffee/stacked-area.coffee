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
chart = new Tactile.Chart(unstack: false).element($("#example_view")[0])
chart.data(data).width(680).height(400)

chart.axes
  y: "linear"
  x:
    dimension: "time"
    frame: frameVal

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


stackButton = $("<button class='btn btn-mini'>Stack</button>")
unstackButton = $("<button class='btn btn-mini'>Unstack</button>")
$("#example_view").prepend stackButton
$("#example_view").prepend unstackButton

unstackButton.click(()->
  chart.unstackTransition()
)

stackButton.click(()->
  chart.stackTransition()
)
