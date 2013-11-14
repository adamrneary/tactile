maxCount = 73
frameVal = [new Date(2011, 13, 1).getTime(),
            new Date(2011, 49, 1).getTime()]

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
      ticksTreatment: "align-middle small"

chart.addSeries [
  aggregate: true
  name: "y0"
  renderer: "line"
  round: false
  color: "#c05020"
  isEditable: true
  afterDrag: (d, newVal, draggedSeries, graph) ->
    i = _.indexOf(_.pluck(graph.data(), "period"), d.x)
    draggedSeries.stack[i].y = newVal
  tooltip: (d) ->
    d.y + " y0"
  dataTransform: (d) ->
    x: d.period
    y: d.y0
,
  name: "y1"
  renderer: "line"
  round: false
  color: "#6060c0"
  isEditable: true
  tooltip: (d) ->
    d.y + " y1"
  dataTransform: (d) ->
    x: d.period
    y: d.y1
,
  name: "y2"
  renderer: "line"
  round: false
  color: "#6020c0"
  isEditable: true
  tooltip: (d) ->
    d.y + " y2"
  dataTransform: (d) ->
    x: d.period
    y: d.y2
]

chart.render()

# interactions

buttonGroup = $("<div class='btn-group'></div>")
setDataButton = $("<button class='btn btn-mini btn-success'>Set data</button>")
dataCountSpinBox = $("<input type='number' min='0' max='73' step='1' value='36' class='span1'>")

buttonGroup.prepend setDataButton
$("#above-chart").html ''
$("#above-chart").prepend buttonGroup
$("#above-chart").prepend dataCountSpinBox
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
  values: [13, 49]
  range: true
  stop: (event, ui) ->
    chart.setXFrame([new Date(2011,  0+ui.values[0], 1).getTime(),
                     new Date(2011,  0+ui.values[1], 1).getTime()])
    chart.render()