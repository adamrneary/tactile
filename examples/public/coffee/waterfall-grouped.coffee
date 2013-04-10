data = [
  name: 'Revenue'
  amount: 1000
  color: # medium color 1
  children: [
    name: 'Revenue stream 1'
    amount: 500
    color: # lighter color 1
  ,
    name: 'Revenue stream 2'
    amount: 300
    color: # even lighter color 1
  ,
    name: 'Revenue stream 3'
    amount: 200
    color: # lightest color 1
  ]
,
  name: "Cost of goods sold"
  amount: 100
  color: # medium color 2
,
  name: "Gross margin"
  amount: 900
  fromBaseline: true
  color: # medium green
,
  name: "Customer acquisition"
  amount: 250
  color: # medium color 3
  children: [
    name: 'Channel 1'
    amount: 80
    color: # lighter color 1
  ,
    name: 'Channel 2'
    amount: 80
    color: # even lighter color 1
  ,
    name: 'Channel 3'
    amount: 80
    color: # lightest color 1
  ,
    name: 'Channel 4'
    amount: 10
    color: # lightest color 1
  ]
,
  name: "Team"
  amount: 350
  color: # medium color 4
  children: [
    name: 'Bosses'
    amount: 30
    color: # lighter color 1
  ,
    name: 'Makers'
    amount: 300
    color: # even lighter color 1
  ,
    name: 'Bean counters'
    amount: 20
    color: # lightest color 1
  ]
,
  name: "General & administrative"
  amount: 150
  color: # medium color 5
  children: [
    name: 'Category 1'
    amount: 80
    color: # lighter color 1
  ,
    name: 'Category 2'
    amount: 70
    color: # even lighter color 1
  ]
,
  name: "Net income"
  amount: 150
  color: # darker green
]

chart = new Tactile.Chart()
  .element($("#example_view")[0])
  .height(500)
  .width(700)
  .data(data)
  .axes({x: {dimension: 'time', frame: frameVal}, y: {dimension: "linear"}})

chart.addSeries [
  name: "waterfall-grouped example"
  renderer: "waterfall"
  fromBaseline: (d) -> d.fromBaseline
  color: (d) -> d.color
  tooltip: (d) -> "#{d.name}: $#{d.y}"
  dataTransform: (d) ->
    x: d.period
    y: d.amount
]

chart.render()