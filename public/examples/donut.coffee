data = [
  label: "FL"
  value: 40000
  color: "#227501"
,
  label: "CA"
  value: 30000
  color: "#2275f2"
,
  label: "NY"
  value: 20000
  color: "#227543"
,
  label: "NC"
  value: 30000
  color: "#227564"
,
  label: "SC"
  value: 40000
  color: "#227585"
,
  label: "AZ"
  value: 50000
  color: "#2275a6"
,
  label: "TX"
  value: 60000
  color: "#2275c7"
]

chart = new Tactile.Chart()
  .element($("#example_view")[0])
  .data(data)
  .addSeries
    name: "optional desc here"
    renderer: "donut"
    tooltip: (d) ->
      d.label + " " + d.value
    color: "#c05020"

chart.render()

$("#above-chart").html ''
$("#below-chart").html ''