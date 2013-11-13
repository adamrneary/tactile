frameVal = [new Date(2012,  0, 1).getTime(), new Date(2012,  7, 1).getTime()] # = [2012-Jan, 2012-Aug]
# time (period here) is unix milliseconds
data = [
  period: new Date(2012,  0, 1).getTime()
  customers: 100
  newCustomers: 10
  churnedCustomers: -20
,
  period: new Date(2012,  1, 1).getTime()
  customers: 90
  newCustomers: 11
  churnedCustomers: -15
,
  period: new Date(2012,  2, 1).getTime()
  customers: 86
  newCustomers: 12
  churnedCustomers: -200
,
  period: new Date(2012,  3, 1).getTime()
  customers: 88
  newCustomers: 14
  churnedCustomers: -9
,
  period: new Date(2012,  4, 1).getTime()
  customers: 93
  newCustomers: 16
  churnedCustomers: -8
,
  period: new Date(2012,  5, 1).getTime()
  customers: 101
  newCustomers: 20
  churnedCustomers: -7
,
  period: new Date(2012,  6, 1).getTime()
  customers: 114
  newCustomers: 30
  churnedCustomers: -6
,
  period: undefined
  customers: null
  newCustomers: null
  churnedCustomers: -5
,
  period: new Date(2012,  7, 1).getTime()
  customers: 138
  newCustomers: 40
  churnedCustomers: -5
]

chart = new Tactile.Chart(min: 'auto')
  .element($("#example_view")[0])
  .data(data)
  .axes({x: {dimension: 'time'}, y: {dimension: "linear"}})
  .setXFrame(frameVal)
  .addSeries [
    name: "Customers"
    renderer: "waterfall"
    color: "#30878F"
    fromBaseline: true
    tooltip: (d) ->
      d.y + " customers"
    dataTransform: (d) ->
      x: d.period
      y: d.customers
  ,
    name: "New customers"
    renderer: "waterfall"
    color: "#8ac16f"
    tooltip: (d) ->
      d.y + " new customers"
    dataTransform: (d) ->
      x: d.period
      y: d.newCustomers
  ,
    name: "Churned customers"
    renderer: "waterfall"
    color: "#dc6e59"
    tooltip: (d) ->
      d.y + " churned customers"
    dataTransform: (d) ->
      x: d.period
      y: d.churnedCustomers
  ]

chart.render()

$("#above-chart").html ''

sl = $("<div>")
  .attr("id", "slider")
  .attr("class", "ui-horizontal-slider")
$("#below-chart").html sl
sl.slider
  min: 0
  max: 11
  values: [0, 11]
  range: true
  slide: (event, ui) ->
    chart.setXFrame([new Date(2012,  0+ui.values[0], 1).getTime(),
                     new Date(2012,  0+ui.values[1], 1).getTime()])
    chart.render()