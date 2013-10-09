count = 73
frameVal = [new Date(2012,  2, 1).getTime(), new Date(2012,  2+count, 1).getTime()]

generateData = (count) =>
  data = []
  i = 0
  while i < count
    data[i] =
      period: new Date(2012,  0 + i, 1).getTime()
      y0: Math.floor Math.random()*100
      y1: Math.floor Math.random()*100
      y2: Math.floor Math.random()*100
      y3: Math.floor Math.random()*100
      y4: Math.floor Math.random()*100
      y5: Math.floor Math.random()*100
      y6: Math.floor Math.random()*100
      y7: Math.floor Math.random()*100
    i++
  data

chart = new Tactile.Chart(unstack: false)
  .element($("#example_view")[0])
  .setAutoScale(false)
  .data(generateData(count))
  .setXFrame(frameVal)
  .axes
    y: "linear"
    x:
      dimension: "time"
      options:
        ticksTreatment: "align-middle"

chart.addSeries [
  name: "y0"
  renderer: "column"
  round: false
  color: "#c05020"
  tooltip: (d) ->
    d.y + " y0"
  dataTransform: (d) ->
    x: d.period
    y: d.y0
,
  name: "y1"
  renderer: "column"
  round: false
  color: "#6060c0"
  tooltip: (d) ->
    d.y + " y1"
  dataTransform: (d) ->
    x: d.period
    y: d.y1
,
  name: "y2"
  renderer: "column"
  round: false
  color: "#6020c0"
  tooltip: (d) ->
    d.y + " y2"
  dataTransform: (d) ->
    x: d.period
    y: d.y2
,
  name: "y3"
  renderer: "column"
  round: false
  color: "#2e8b57"
  tooltip: (d) ->
    d.y + " y3"
  dataTransform: (d) ->
    x: d.period
    y: d.y3
,
  name: "y4"
  renderer: "column"
  round: false
  color: "#ff7f24"
  tooltip: (d) ->
    d.y + " y4"
  dataTransform: (d) ->
    x: d.period
    y: d.y4
,
  name: "y5"
  renderer: "column"
  round: false
  color: "#1f7f24"
  tooltip: (d) ->
    d.y + " y5"
  dataTransform: (d) ->
    x: d.period
    y: d.y5
,
  name: "y6"
  renderer: "column"
  round: false
  color: "#ff7024"
  tooltip: (d) ->
    d.y + " y6"
  dataTransform: (d) ->
    x: d.period
    y: d.y6
,
  name: "y7"
  renderer: "column"
  round: false
  color: "#f07000"
  tooltip: (d) ->
    d.y + " y7"
  dataTransform: (d) ->
    x: d.period
    y: d.y7
]

chart.render()

# interactions

buttonGroup = $("<div class='btn-group'></div>")
groupButton = $("<button class='btn btn-mini'>Grouped</button>")
stackButton = $("<button class='btn btn-mini'>Stacked</button>")

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
  min: new Date(2012,  0, 1).getTime()
  max: new Date(2012,  2 + count, 1).getTime()
  values: frameVal
  range: true
  slide: (event, ui) ->
    chart.setXFrame(ui.values)
    chart.render()
