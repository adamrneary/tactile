data = [
  label: "USA"
  value: 0
  change: 0
  barPosition: 0
,
  label: "New Zealand"
  value: 0
  change: 0
  barPosition: 0
,
  label: "Australia"
  value: 0
  change: 0
  barPosition: 0
,
  label: "Canada"
  value: 0
  change: 0
  barPosition: 0
]

generateData = (count) =>
  i = 0
  while i < count
    oldValue = data[i].value
    data[i].value = Math.floor Math.random() * 1000
    data[i].change = data[i].value - oldValue
    data[i].barPosition = data[i].value / 1000
    i++

  i = 0
  while i < count
    j = 0
    index = 0
    while j < count
      index++ if data[j].value > data[i].value
      j++
    data[i].index = index
    i++

  data

chart = new Tactile.Chart(unstack: false)
  .element($("#example_view")[0])
  .data(generateData(4))
  .addSeries
    name: "enemies"
    renderer: "leaderboard"
    changeFormat: d3.format("f")
    valueFormat: d3.format("f")
    dataTransform: (d) ->
      label: d.label
      value: d.value
      change: d.change
      barPosition: d.barPosition
      index: d.index

chart.render()

setDataButton = $("<button class='btn btn-mini'>Set data</button>")
$("#above-chart").html setDataButton
setDataButton.click (e)=>
  chart.data(generateData(4))
  chart.render(1000)
  e.stopPropagation()

$("#below-chart").html ''