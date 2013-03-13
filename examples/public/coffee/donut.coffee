data = [
  label: "FL"
  val: 40000
  color: "#227501"
,
  label: "CA"
  val: 30000
  color: "#2275f2"
,
  label: "NY"
  val: 20000
  color: "#227543"
,
  label: "NC"
  val: 30000
  color: "#227564"
,
  label: "SC"
  val: 40000
  color: "#227585"
,
  label: "AZ"
  val: 50000
  color: "#2275a6"
,
  label: "TX"
  val: 60000
  color: "#2275c7"
]
chart = new Tactile.Chart()
  .element($("#example_view")[0]).width(680).height(400).data(data)
chart.addSeries
  name: "donut"
  renderer: "donut"
  tooltip: (d) ->
    d.data.label + " " + d.data.val
  color: "#c05020"
  height: 100

chart.render()
