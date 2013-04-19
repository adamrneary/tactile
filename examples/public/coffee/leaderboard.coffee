data = [
  label: "USA"
  value: 90
  change: 10
,
  label: "New Zealand"
  value: 150
  change: -10
,
  label: "Australia"
  value: 200
  change: -50
,
  label: "Canada"
  value: 250
  change: 100
]
chart = new Tactile.Chart(unstack: false).element($("#example_view")[0])
chart.data(data).width(400).height(350)

chart.addSeries [
  name: "enemies"
  renderer: "leaderboard"
  format: d3.format("d")
  dataTransform: (d) ->
    label: d.label
    value: d.value
    change: d.change
    barPosition: d.value/300
]

chart.render()
