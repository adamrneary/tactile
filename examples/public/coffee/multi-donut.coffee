data = [
  label: "FL"
  val1: 4000
  val2: 5000
  val3: 6000
  val4: 7000
  val5: 8000
  color1: "#C6DBEF"
  color2: "#D9D9D9"
  color3: "#FCBBA1"
  color4: "#FED976"
  color5: "#C7E9C0"
,
  label: "CA"
  val1: 8000
  val2: 7000
  val3: 6000
  val4: 5000
  val5: 4000
  color1: "#9ECAE1"
  color2: "#BDBDBD"
  color3: "#FC9272"
  color4: "#FEB24C"
  color5: "#A1D99B"
,
  label: "NY"
  val1: 2000
  val2: 7000
  val3: 1000
  val4: 3000
  val5: 2000
  color1: "#6BAED6"
  color2: "#969696"
  color3: "#FB6A4A"
  color4: "#FD8D3C"
  color5: "#74C476"
]
chart = new Tactile.Chart()
  .element($("#example_view")[0]).width(1000).height(720).data(data)

chart.addSeries [
  name: "donut-1"
  renderer: "donut"
  tooltip: (d) ->
    d.label + " " + d.val
  dataTransform: (d) ->
    color: d.color1
    val: d.val1
    label: d.label
  innerRadius: 70
  outerRadius: 120
  stackedInnerRadius: 200
  stackedOuterRadius: 330
  stackedIndex: 4

,
  name: "donut-2"
  renderer: "donut"
  tooltip: (d) ->
    d.label + " " + d.val
  dataTransform: (d) ->
    color: d.color2
    val: d.val2
    label: d.label
  innerRadius: 70
  outerRadius: 120
  stackedInnerRadius: 200
  stackedOuterRadius: 330
  stackedIndex: 0
,
  name: "donut-3"
  renderer: "donut"
  tooltip: (d) ->
    d.label + " " + d.val
  dataTransform: (d) ->
    color: d.color3
    val: d.val3
    label: d.label
  innerRadius: 70
  outerRadius: 120
  stackedInnerRadius: 200
  stackedOuterRadius: 330
  stackedIndex: 1
,
  name: "donut-4"
  renderer: "donut"
  tooltip: (d) ->
    d.label + " " + d.val
  dataTransform: (d) ->
    color: d.color4
    val: d.val4
    label: d.label
  innerRadius: 70
  outerRadius: 120
  stackedInnerRadius: 200
  stackedOuterRadius: 330
  stackedIndex: 3
,
  name: "donut-5"
  renderer: "donut"
  tooltip: (d) ->
    d.label + " " + d.val
  dataTransform: (d) ->
    color: d.color5
    val: d.val5
    label: d.label
  innerRadius: 70
  outerRadius: 120
  stackedInnerRadius: 200
  stackedOuterRadius: 330
  stackedIndex: 2
]
chart.render()

stackButton = $("<button class='btn btn-mini'>Stack</button>")
unstackButton = $("<button class='btn btn-mini'>Unstack</button>")
$("#example_view").prepend stackButton
$("#example_view").prepend unstackButton

unstackButton.click((e)->
  chart.unstackTransition(3000)
  e.stopPropagation()
)

stackButton.click((e)->
  chart.stackTransition(3000)
  e.stopPropagation()
)