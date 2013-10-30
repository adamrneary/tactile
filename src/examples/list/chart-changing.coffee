buttonGroup = $("<div class='btn-group'></div>")

toColumn = $("<button class='btn btn-mini'>To Column</button>")
toLines = $("<button class='btn btn-mini'>To Lines</button>")
toArea = $("<button class='btn btn-mini'>To Area</button>")
toWaterfall = $("<button class='btn btn-mini'>To Waterfall</button>")
toLeaderboard = $("<button class='btn btn-mini'>To Leaderboard</button>")
toPareto = $("<button class='btn btn-mini'>To Pareto</button>")

currentChart = ""

buttonGroup.append toColumn
buttonGroup.append toLines
buttonGroup.append toArea
buttonGroup.append toWaterfall
buttonGroup.append toLeaderboard
buttonGroup.append toPareto

$("#above-chart").html ''
$("#above-chart").prepend buttonGroup


stackGroup = $("<div class='btn-group pull-right'></div>")

stack = $("<button class='btn btn-mini'>Stack</button>")
unstack = $("<button class='btn btn-mini'>Unstack</button>")

stackGroup.append stack
stackGroup.append unstack

$("#above-chart").append stackGroup


# preparwe data
leaderboardData = [
  label: "USA"
  value: 0
  change: 0
  barPosition: 0
,
  label: "New Zealand"
  value: 0
  change: 0
  barPosition: 0
,
  label: "Australia"
  value: 0
  change: 0
  barPosition: 0
,
  label: "Canada"
  value: 0
  change: 0
  barPosition: 0
]
chartData = [
  x: new Date(2012, 0, 1).getTime()
  y: 10
  z: 0
,
  x: new Date(2012, 1, 1).getTime()
  y: 170
  z: 200
,
  x: new Date(2012, 2, 1).getTime()
  y: 280
  z: 100
,
  x: new Date(2012, 3, 1).getTime()
  y: 205
  z: 240
,
  x: new Date(2012, 4, 1).getTime()
  y: 280
  z: 100
,
  x: new Date(2012, 5, 1).getTime()
  y: 205
  z: 240
,
  x: new Date(2012, 6, 1).getTime()
  y: 280
  z: 100
,
  x: new Date(2012, 7, 1).getTime()
  y: 205
  z: 240
,
  x: new Date(2012, 8, 1).getTime()
  y: 332
  z: 490
,
  x: new Date(2012, 9, 1).getTime()
  y: 147
  z: 142
,
  x: new Date(2012, 10, 1).getTime()
  y: 857
  z: 285
,
  x: new Date(2012, 11, 1).getTime()
  y: 572
  z: 428
] # The same for 'column', 'line', 'area', 'waterfall'
paretoData = [
  cumulativePercent: 0.5010861262296834
  name: "Consulting"
  value: 1441959.19
  x: 0
,
  cumulativePercent: 0.6864971599775173
  name: "Television ads"
  value: 533551.2799999999
  x: 1
,
  cumulativePercent: 0.8375597831432469
  name: "Radio ads"
  value: 434707.98
  x: 2
,
  cumulativePercent: 0.9047213226201376
  name: "Magazine ads"
  value: 193268.57
  x: 3
,
  cumulativePercent: 0.939700011053397
  name: "Billboard ads"
  value: 100657.03000000001
  x: 4
,
  cumulativePercent: 0.9720742427992093
  name: "Conferences"
  value: 93162.26999999999
  x: 5
,
  cumulativePercent: 0.9999999999999999
  name: "Affiliate revenue"
  value: 80361.04
  x: 6
]

# time frame
frameVal = [new Date(2012, 1, 1).getTime(), new Date(2012, 10, 1).getTime()] # = [2012-Feb-1, 2012-Nov-1]


# create instance of chart
chart = new Tactile.Chart(unstack: true)
  .element($("#example_view")[0])
  .setXFrame(frameVal)


# Stack / Unstack behavior
stack.click (e) ->
  e.stopPropagation()
  if currentChart in ['column', 'area']
    chart.stackTransition()

unstack.click (e) ->
  e.stopPropagation()
  if currentChart in ['column', 'area']
    chart.unstackTransition()


# Add slider
timeSlider = $("<div>")
  .attr("id", "slider")
  .attr("class", "ui-horizontal-slider")

$("#below-chart").html timeSlider
timeSlider.slider
  min: 0
  max: 11
  values: [1, 10]
  range: true
  slide: (event, ui) ->
    chart.setXFrame([new Date(2012,  0+ui.values[0], 1).getTime(),
                     new Date(2012,  0+ui.values[1], 1).getTime()])
    chart.render()


# baserenderer for ''
baseRenderer = () ->
  chart.data(chartData)
    .axes
      x:
        dimension: 'time'
        frame: frameVal
      y:
        dimension: "linear"
    .addSeries [
      name: "reach actual"
      renderer: currentChart
      sigfigs: 0
      round: false
      color: "#c05020"
      fromBaseline: true
      tooltip: (d) ->
        d.y + " customers"

      dataTransform: (d) ->
        x: d.x
        y: d.z
    ,
      name: "planned"
      renderer: currentChart
      round: false
      color: "#6060c0"
      tooltip: (d) ->
        d.y + " planned"

      dataTransform: (d) ->
        x: d.x
        y: d.y
    ], {overwrite: true}
  chart.render()


toColumn.click (e) ->
  currentChart = "column"
  e.stopPropagation()

  baseRenderer()

toLines.click (e) ->
  currentChart = "line"
  e.stopPropagation()

  baseRenderer()

toArea.click (e) ->
  currentChart = "area"
  e.stopPropagation()

  baseRenderer()

toWaterfall.click (e) ->
  currentChart = "waterfall"
  e.stopPropagation()

  baseRenderer()

toLeaderboard.click (e) ->
  currentChart = "leaderboard"
  e.stopPropagation()
  generateData = (count) =>
    i = 0
    while i < count
      oldValue = leaderboardData[i].value
      leaderboardData[i].value = Math.floor Math.random() * 1000
      leaderboardData[i].change = leaderboardData[i].value - oldValue
      leaderboardData[i].barPosition = leaderboardData[i].value / 1000
      i++

    i = 0
    while i < count
      j = 0
      index = 0
      while j < count
        index++ if leaderboardData[j].value > leaderboardData[i].value
        j++
      leaderboardData[i].index = index
      i++

    leaderboardData

  chart.data(generateData(4))
    .addSeries([
      name: "enemies"
      renderer: "leaderboard"
      changeFormat: d3.format("f")
      valueFormat: d3.format("f")
      dataTransform: (d) ->
        label: d.label
        value: d.value
        change: d.change
        barPosition: d.barPosition
        index: d.index
    ], overwrite: true)
  .axes({})

  chart.render()

toPareto.click (e) ->
  currentChart = "pareto"
  e.stopPropagation()

  chart.data(paretoData)
    .addSeries([
        name: "Revenue"
        color: "#702AFF"
        renderer: 'column'
        wide: true
        round: true
        dataTransform: (d) ->
          x: d.x
          y: d.value
          name: d.name
        tooltip: (d) ->
          "#{d.name}: #{d.y}"
      ,
        name: 'Cumulative percentage'
        color: "#C20055"
        renderer: 'line'
        yAxis: 'y1'
        dataTransform: (d) ->
          x: d.x
          y: d.cumulativePercent
          name: d.name
        tooltip: (d) ->
          "#{d.name}: #{(d.y * 100).toFixed(2)}% (cumulative)"
      ], overwrite: true)
    .setAutoScale(true)
    .setMinXFrame(1)
    .axes
      y: {dimension: "linear"}
      y1: {dimension: "linear"}

  chart.render()

# call first renderer
toColumn.click()