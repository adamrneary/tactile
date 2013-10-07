maxCount = 73
frameVal = [new Date(2011,  2, 1).getTime(),
            new Date(2011, 71, 1).getTime()]

generateData = (count) =>
  data = []
  i = 0
  while i < count
    data[i] =
      period: new Date(2011,  0 + i, 1).getTime()
      y0: Math.floor Math.random()*100
      y1: Math.floor Math.random()*100
      y2: Math.floor Math.random()*100
#      y3: Math.floor Math.random()*100
#      y4: Math.floor Math.random()*100
    i++
  data

chart = new Tactile.Chart(unstack: false)
  .element($("#example_view")[0])
  .data(generateData(maxCount))
  .setXFrame(frameVal)
  .axes
    y: "linear"
    x:
      dimension: "time"
      options:
        ticksTreatment: "align-middle"

chart.addSeries [
  name: "y0"
  renderer: "aggcolumn"
  round: false
  color: "#c05020"
  tooltip: (d) ->
    d.y + " y0"
  dataTransform: (d) ->
    x: d.period
    y: d.y0
,
  name: "y1"
  renderer: "aggcolumn"
  round: false
  color: "#6060c0"
  tooltip: (d) ->
    d.y + " y1"
  dataTransform: (d) ->
    x: d.period
    y: d.y1
,
  name: "y2"
  renderer: "aggcolumn"
  round: false
  color: "#6020c0"
  tooltip: (d) ->
    d.y + " y2"
  dataTransform: (d) ->
    x: d.period
    y: d.y2
#,
#  name: "y3"
#  renderer: "aggcolumn"
#  round: false
#  color: "#2e8b57"
#  tooltip: (d) ->
#    d.y + " y3"
#  dataTransform: (d) ->
#    x: d.period
#    y: d.y3
#,
#  name: "y4"
#  renderer: "aggcolumn"
#  round: false
#  color: "#ff7f24"
#  tooltip: (d) ->
#    d.y + " y4"
#  dataTransform: (d) ->
#    x: d.period
#    y: d.y4
]

chart.render()

# interactions

buttonGroup = $("<div class='btn-group'></div>")
groupButton = $("<button class='btn btn-mini'>Grouped</button>")
stackButton = $("<button class='btn btn-mini'>Stacked</button>")
setDataButton = $("<button class='btn btn-mini btn-success'>Set data</button>")
dataCountSpinBox = $("<input type='number' min='10' max='100' step='10' value='12' class='span1'>")

buttonGroup.prepend groupButton
buttonGroup.prepend stackButton
buttonGroup.prepend setDataButton
$("#above-chart").html ''
$("#above-chart").prepend buttonGroup
$("#above-chart").prepend dataCountSpinBox
stackButton.click (e) ->
  chart.stackTransition()
  e.stopPropagation()
groupButton.click (e) ->
  chart.unstackTransition()
  e.stopPropagation()
setDataButton.click (e) ->
  data = generateData(dataCountSpinBox.val())
  chart.data(data)
  chart.render(1000)
  e.stopPropagation()

sl = $("<div>")
  .attr("id", "slider")
  .attr("class", "ui-horizontal-slider")
$("#below-chart").html sl
sl.slider
  min: 0
  max: maxCount
  values: [2, 71]
  range: true
  slide: (event, ui) ->
    chart.setXFrame([new Date(2011,  0+ui.values[0], 1).getTime(),
                     new Date(2011,  0+ui.values[1], 1).getTime()])
    chart.render()