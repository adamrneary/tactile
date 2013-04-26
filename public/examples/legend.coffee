frameVal = [0, 4]
data = [
  x: 0
  y: 10
  z: 0
,
  x: 1
  y: 170
  z: 200
,
  x: 2
  y: 280
  z: 100
,
  x: 3
  y: 205
  z: 240
,
  x: 4
  y: 280
  z: 100
,
  x: 5
  y: 205
  z: 240
,
  x: 6
  y: 280
  z: 100
,
  x: 7
  y: 205
  z: 240
,
  x: 8
  y: 332
  z: 490
]

chart = new Tactile.Chart()
  .element($("#example_view")[0])
  .data(data)
  .axes({x:{dimension: "time",frame: frameVal}})
  .addSeries [
    name: "enemies"
    renderer: "line"
    color: "#c05020"
    tooltip: (d) ->
      d.y + " enemies"
    dataTransform: (d) ->
      x: d.x
      y: d.y
  ,
    name: "friends"
    renderer: "column"
    sigfigs: 1
    color: "#6060c0"
    isEditable: true
    afterDrag: (d, y, i, draggedSeries, graph) ->
      graph.data()[i].z = y

    tooltip: (d) ->
      d.y + " friends"

    dataTransform: (d) ->
      x: d.x
      y: d.z
  ]

chart.render()

# interactions

legends = $("<div>").attr("id", "legends")
chart.series.forEach (val, idx) ->
  input = $("<input>").attr("type", "checkbox")
    .attr("name", "legend")
    .attr("value", idx)
    .attr("checked", "checked")
  legends.append $('<lable>').append(input).append(val.name).append('<br>')

  legends.find("input").last().click ->
    chart.series[idx].toggle()
    chart.render()
$("#above-chart").html legends

sl = $("<div>")
  .attr("id", "slider")
  .attr("class", "ui-horizontal-slider")
$("#below-chart").html sl
sl.slider
  min: 0
  max: 8
  values: frameVal
  range: true
  slide: (event, ui) ->
    chart.axes().x.frame = ui.values
    chart.render()