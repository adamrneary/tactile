data = [
  label: "FL"
  val: 40000
,
  label: "CA"
  val: 30000
,
  label: "NY"
  val: 20000
,
  label: "NC"
  val: 30000
,
  label: "SC"
  val: 40000
,
  label: "AZ"
  val: 50000
,
  label: "TX"
  val: 60000
]
chart = new Tactile.Chart()
  .element($("#example_view")[0]).width(680).height(400).data(data)
chart.addSeries
  name: "donut"
  renderer: "donut"
  color: "#c05020"

chart.render()
