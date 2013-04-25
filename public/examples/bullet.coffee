data = [
  title: "Revenue"
  subtitle: "US$, in thousands"
  ranges: [
    value: 150
    color: "#CCCCCC"
  ,
    value: 225
    color: "#DDDDDD"
  ,
    value: 350
    color: "#EEEEEE"
  ]
  measures: [
    value: 220
    color: "#4682B4"
  ,
    value: 270
    color: "#B0C4DE"
  ]
  markers: [
    value: 120
    color: "#FF3030"
  ]
,
  title: "Profit"
  subtitle: "%"
  ranges: [
    value: 150
    color: "#CCCCCC"
  ,
    value: 225
    color: "#DDDDDD"
  ,
    value: 350
    color: "#EEEEEE"
  ]
  measures: [
    value: 220
    color: "#4682B4"
  ,
    value: 270
    color: "#B0C4DE"
  ]
  markers: [
    value: 120
    color: "#8B0000"
  ]
,
  title: "Order Size"
  subtitle: "US$, average"
  ranges: [
    value: 150
    color: "#CCCCCC"
  ,
    value: 225
    color: "#DDDDDD"
  ,
    value: 350
    color: "#EEEEEE"
  ]
  measures: [
    value: 220
    color: "#4682B4"
  ,
    value: 270
    color: "#B0C4DE"
  ]
  markers: [
    value: 120
    color: "#008B00"
  ]
,
  title: "Customers"
  subtitle: "count"
  ranges: [
    value: 150
    color: "#CCCCCC"
  ,
    value: 225
    color: "#DDDDDD"
  ,
    value: 350
    color: "#EEEEEE"
  ]
  measures: [
    value: 220
    color: "#4682B4"
  ,
    value: 270
    color: "#B0C4DE"
  ]
  markers: [
    value: 120
    color: "#000000"
  ]
]

generateData = (count)=>
  i = 0
  while i < count
    j = 0
    lastValue = 0
    while j < 3
      data[i].ranges[j].value = lastValue + Math.floor Math.random() * 100
      lastValue = data[i].ranges[j].value
      j++

    j = 0
    lastValue = 0
    while j < 2
      data[i].measures[j].value = lastValue + Math.floor Math.random() * 100
      lastValue = data[i].measures[j].value
      j++
    data[i].markers[0].value = Math.floor Math.random() * 100
    i++

chart = new Tactile.Chart(unstack: false).element($("#example_view")[0])
chart.data(data).width(800).height(350)

chart.addSeries [
  name: "enemies"
  renderer: "bullet"
  format: d3.format("d")
  dataTransform: (d) ->
    title: d.title
    subtitle: d.subtitle
    ranges: d.ranges
    measures: d.measures
    markers: d.markers
]

chart.render()

setDataButton = $("<button class='btn btn-mini'>Set data</button>")

$("#example_view").prepend setDataButton

setDataButton.click((e)=>
  generateData(4)
  chart.data(data)
  chart.render(1000)
  e.stopPropagation()
)
