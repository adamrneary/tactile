frameVal = [1330560000000, 1354320000000]
data = [
  # time (period here) is unix milliseconds
  period: 1325376000000
  actual: 4
  plan: 1
,
  period: 1328054400000
  actual: 5
  plan: 1
,
  period: 1330560000000
  actual: 6
  plan: 2
,
  period: 1333238400000
  actual: 7
  plan: 3
,
  period: 1335830400000
  actual: 6
  plan: 5
,
  period: 1338508800000
  actual: 5
  plan: 8
,
  period: 1341100800000
  actual: 4
  plan: 5
,
  period: 1343779200000
  actual: 5
  plan: 3
,
  period: 1346457600000
  actual: 6
  plan: 2
,
  period: 1349049600000
  actual: 7
  plan: 1
,
  period: 1351728000000
  actual: 6
  plan: 1
,
  period: 1354320000000
  actual: 5
  plan: 2
]

chart = new Tactile.Chart(unstack: false)
  .element($("#example_view")[0])
  .data(data)
  .axes
    y: "linear"
    x:
      dimension: "time"
      frame: frameVal
      options:
        ticksTreatment: "align-middle"

chart.addSeries [
  name: "reach actual"
  renderer: "column"
  round: false
  color: "#c05020"
  tooltip: (d) ->
    d.y + " customers"
  dataTransform: (d) ->
    x: d.period
    y: d.actual
,
  name: "planned"
  renderer: "column"
  round: false
  color: "#6060c0"
  tooltip: (d) ->
    d.y + " planned"
  dataTransform: (d) ->
    x: d.period
    y: d.plan
,
  name: "sum"
  renderer: "column"
  round: false
  color: "#6020c0"
  tooltip: (d) ->
    d.y + " sum"

  dataTransform: (d) ->
    x: d.period
    y: parseInt(d.plan + d.actual)
]

chart.render()

# interactions

groupButton = $("<button class='btn btn-mini'>Grouped</button>")
stackButton = $("<button class='btn btn-mini'>Stacked</button>")
buttonGroup = $("<div class='btn-group'></div>")
buttonGroup.prepend groupButton 
buttonGroup.prepend stackButton 

$("#above-chart").html ''
$("#above-chart").prepend buttonGroup

stackButton.click (e) ->
  chart.stackTransition()
  e.stopPropagation()
groupButton.click (e) ->
  chart.unstackTransition()
  e.stopPropagation()

sl = $("<div>")
  .attr("id", "slider")
  .attr("class", "ui-horizontal-slider")
$("#below-chart").html sl
sl.slider
  min: 1325376000
  max: 1354320000
  values: frameVal
  range: true
  slide: (event, ui) ->
    chart.axes().x.frame = ui.values
    chart.render()