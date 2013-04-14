data = [
  label: "FL"
  val1: 40000
  color1: "#227501"
  val2: 4000
  color2: "#696969"
,
  label: "CA"
  val1: 1500
  color1: "#2275f2"
  val2: 40000
  color2: "#000080"
,
  label: "NY"
  val1: 20000
  color1: "#227543"
  val2: 600
  color2: "#20B2AA"
,
  label: "NC"
  val1: 30000
  color1: "#227564"
  val2: 400
  color2: "#CD5C5C"
]
chart = new Tactile.Chart()
  .element($("#example_view")[0]).width(680).height(400).data(data)

chart.addSeries [
  name: "donut-1"
  renderer: "donut"
  tooltip: (d) ->
    d.data.label + " " + d.data.val
  dataTransform: (d) ->
    color: d.color1
    val: d.val1
  innerRadius: 50
  outerRadius: 70
,
  name: "donut-2"
  renderer: "donut"
  tooltip: (d) ->
    d.data.label + " " + d.data.val
  dataTransform: (d) ->
    color: d.color2
    val: d.val2
  innerRadius: 50
  outerRadius: 70
,
  name: "donut-3"
  renderer: "donut"
  tooltip: (d) ->
    d.data.label + " " + d.data.val
  dataTransform: (d) ->
    color: d.color1
    val: d.val1
  innerRadius: 50
  outerRadius: 70
,
  name: "donut-4"
  renderer: "donut"
  tooltip: (d) ->
    d.data.label + " " + d.data.val
  dataTransform: (d) ->
    color: d.color1
    val: d.val1
  innerRadius: 50
  outerRadius: 70
,
  name: "donut-5"
  renderer: "donut"
  tooltip: (d) ->
    d.data.label + " " + d.data.val
  dataTransform: (d) ->
    color: d.color1
    val: d.val1
  innerRadius: 50
  outerRadius: 70
,
  name: "donut-6"
  renderer: "donut"
  tooltip: (d) ->
    d.data.label + " " + d.data.val
  dataTransform: (d) ->
    color: d.color1
    val: d.val1
  innerRadius: 50
  outerRadius: 70
]
chart.render()
