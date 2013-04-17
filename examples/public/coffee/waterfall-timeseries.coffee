frameVal = [1325376000, 1343779200]
# time (period here) is unix milliseconds/1000
data = [
  period: 1325376000
  customers: 100
  newCustomers: 10
  churnedCustomers: -20
,
  period: 1328054500
  customers: 90
  newCustomers: 11
  churnedCustomers: -15
,
  period: 1330560000
  customers: 86
  newCustomers: 12
  churnedCustomers: -10
,
  period: 1333238400
  customers: 88
  newCustomers: 14
  churnedCustomers: -9
,
  period: 1335830400
  customers: 93
  newCustomers: 16
  churnedCustomers: -8
,
  period: 1338508800
  customers: 101
  newCustomers: 20
  churnedCustomers: -7
,
  period: 1341100800
  customers: 114
  newCustomers: 30
  churnedCustomers: -6
,
  period: 1343779200
  customers: 138
  newCustomers: 40
  churnedCustomers: -5
]
chart = new Tactile.Chart()
  .element($("#example_view")[0])
  .height(500)
  .width(700)
  .data(data)
  .axes({x: {dimension: 'time', frame: frameVal}, y: {dimension: "linear"}})

chart.addSeries [
  name: "Customers"
  renderer: "waterfall"
  color: "#009ACD" # Alex: make this blue
  fromBaseline: (d, i) ->
    i%2
  tooltip: (d) ->
    d.y + " customers"
  dataTransform: (d) ->
    x: d.period
    y: d.customers
,
  name: "New customers"
  renderer: "waterfall"
  color: "#008B00"
  tooltip: (d) ->
    d.y + " new customers"
  fromBaseline: (d, i) ->
    i is 3
  dataTransform: (d) ->
    x: d.period
    y: d.newCustomers
,
  name: "Churned customers"
  renderer: "waterfall"
  color: "#B22222"
  tooltip: (d) ->
    d.y + " churned customers"
  fromBaseline: false
  dataTransform: (d) ->
    x: d.period
    y: d.churnedCustomers
]
chart.axes().x.frame = frameVal
chart.render()

sl = $("<div>").attr("id", "slider")
$("#example_view").append sl
sl.slider
  min: 1325376000
  max: 1354320000
  values: frameVal
  range: true
  slide: (event, ui) ->
    chart.axes().x.frame = ui.values
    chart.render()
