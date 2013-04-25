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
  .element($("#example_view")[0])
  .data(data)
  .addSeries
    name: "donut"
    renderer: "donut"
    tooltip: (d) ->
      d.label + " " + d.val
    color: "#c05020"
    innerRadius: 50
    outerRadius: 70

chart.render()

$("#above-chart").html ''
$("#below-chart").html ''