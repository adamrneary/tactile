maxCount = 100
frameVal = [1330560000, 1330560000 + 2678400*maxCount]

generateData = (count) =>
  data = []
  i = 0
  while i < count
    data[i] =
      period: 1325376000+2678400*i
      y0: Math.floor Math.random()*100
      y1: Math.floor Math.random()*100
      y2: Math.floor Math.random()*100
      y3: Math.floor Math.random()*100
      y4: Math.floor Math.random()*100
    i++
  data

chart = new Tactile.Chart(unstack: false)
  .element($("#example_view")[0])
  .data(generateData(30))
  .axes
    y: "linear"
    x:
      dimension: "time"
      frame: frameVal
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
]

chart.render()

# interactions

buttonGroup = $("<div class='btn-group'></div>")
groupButton = $("<button class='btn btn-mini'>Grouped</button>")
stackButton = $("<button class='btn btn-mini'>Stacked</button>")
setDataButton = $("<button class='btn btn-mini btn-success'>Set data</button>")
dataCountSpinBox = $("<input type='number' min='10' max='100' step='10' value='30' class='span1'>")

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
  min: 1330560000
  max: 1330560000 + 2678400*maxCount
  values: frameVal
  range: true
  slide: (event, ui) ->
    chart.axes().x.frame = ui.values
    chart.render()