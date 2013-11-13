frameVal = [new Date(2012, 2, 1).getTime(), new Date(2012, 11, 1).getTime()] # = [2012-Mar-1, 2012-Dec-1]
data = [
  # time (period here) is unix milliseconds
  period: new Date(2012,  0, 1).getTime()
  actual: 4
  plan: 1
,
  period: new Date(2012,  1, 1).getTime()
  actual: 5
  plan: 1
,
  period: new Date(2012,  2, 1).getTime()
  actual: 6
  plan: 2
,
  period: new Date(2012,  3, 1).getTime()
  actual: 7
  plan: 3
,
  period: new Date(2012,  4, 1).getTime()
  actual: 6
  plan: 5
,
  period: new Date(2012,  5, 1).getTime()
  actual: 5
  plan: 8
,
  period: new Date(2012,  6, 1).getTime()
  actual: 4
  plan: 5
,
  period: new Date(2012,  7, 1).getTime()
  actual: 5
  plan: 3
,
  period: new Date(2012,  8, 1).getTime()
  actual: 6
  plan: 2
,
  period: new Date(2012,  9, 1).getTime()
  actual: 7
  plan: 1
,
  period: new Date(2012, 10, 1).getTime()
  actual: 6
  plan: 1
,
  period: new Date(2012, 11, 1).getTime()
  actual: 5
  plan: 2
]

chart = new Tactile.Chart(
    unstack: false
    min: "auto"
  )
  .element($("#example_view")[0])
  .data(data)
  .setXFrame(frameVal)
  .axes
    y: "linear"
    x:
      dimension: "time"
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

groupButton = $("<button class='btn btn-mini active'>Grouped</button>")
stackButton = $("<button class='btn btn-mini'>Stacked</button>")
buttonGroup = $("<div class='btn-group'></div>")
buttonGroup.prepend groupButton 
buttonGroup.prepend stackButton 

$("#above-chart").html ''
$("#above-chart").prepend buttonGroup

stackButton.click (e) ->
  chart.stackTransition()
  buttonGroup.find("button").removeClass("active")
  $(this).addClass("active")
  e.stopPropagation()
groupButton.click (e) ->
  chart.unstackTransition()
  buttonGroup.find("button").removeClass("active")
  $(this).addClass("active")
  e.stopPropagation()

sl = $("<div>")
  .attr("id", "slider")
  .attr("class", "ui-horizontal-slider")
$("#below-chart").html sl
sl.slider
  min: 0
  max: 11
  values: [2, 11]
  range: true
  slide: (event, ui) ->
    chart.setXFrame([new Date(2012,  0+ui.values[0], 1).getTime(),
                     new Date(2012,  0+ui.values[1], 1).getTime()])
    chart.render()