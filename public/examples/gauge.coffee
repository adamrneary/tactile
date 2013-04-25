generateData = ()=>
  data = [
    min: -10
    max: 10
    value: Math.floor Math.random() * 20 - 10
  ]

chart = new Tactile.Chart()
  .element($("#example_view")[0]).width(680).height(400).data(generateData())
chart.addSeries
  name: "gauge"
  renderer: "gauge"
  labels: true

chart.render()


setDataButton = $("<button class='btn btn-mini'>Set data</button>")

$("#example_view").prepend setDataButton

setDataButton.click((e)=>
  chart.data(generateData())
  chart.render()
  e.stopPropagation()
)
