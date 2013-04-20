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



generateData = (count)=>
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
  console.log data
  data


chart = new Tactile.Chart(unstack: false).element($("#example_view")[0])
chart.data(generateData(4)).width(400).height(350)

chart.addSeries [
  name: "enemies"
  renderer: "leaderboard"
  format: d3.format("d")
  dataTransform: (d) ->
    label: d.label
    value: d.value
    change: d.change
    barPosition: d.barPosition
    index: d.index
]

chart.render()

setDataButton = $("<button class='btn btn-mini'>Set data</button>")

$("#example_view").prepend setDataButton

setDataButton.click((e)=>
  chart.data(generateData(4))
  chart.render(1000)
  e.stopPropagation()
)
