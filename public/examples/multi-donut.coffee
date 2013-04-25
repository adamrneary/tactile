data = [
  label: "FL"
  val1: 4000
  val2: 5000
  val3: 6000
  val4: 7000
  val5: 8000
  val6: 9000
  color1: "#254E5D"
  color2: "#671E20"
  color3: "#8A8A8A"
  color4: "#2058C8"
  color5: "#C98621"
  color6: "#79593D"
,
  label: "CA"
  val1: 8000
  val2: 7000
  val3: 6000
  val4: 5000
  val5: 4000
  val6: 3000
  color1: "#3F6672"
  color2: "#813D3F"
  color3: "#9D9D9D"
  color4: "#4072D0"
  color5: "#D39A42"
  color6: "#90765F"
,
  label: "NY"
  val1: 2000
  val2: 7000
  val3: 1000
  val4: 3000
  val5: 2000
  val6: 1000
  color1: "#597D88"
  color2: "#9A5C5D"
  color3: "#B1B1B1"
  color4: "#608BD7"
  color5: "#DDAF63"
  color6: "#A79380"
]

chart = new Tactile.Chart()
  .element($("#example_view")[0])
  .data(data)
  .addSeries [
    name: "grapefruit"
    renderer: "donut"
    tooltip: (d) ->
      d.label + " " + d.val
    dataTransform: (d) ->
      color: d.color1
      val: d.val1
      label: d.label
  ,
    name: "kiwis"
    renderer: "donut"
    tooltip: (d) ->
      d.label + " " + d.val
    dataTransform: (d) ->
      color: d.color2
      val: d.val2
      label: d.label
  ,
    name: "cherries"
    renderer: "donut"
    tooltip: (d) ->
      d.label + " " + d.val
    dataTransform: (d) ->
      color: d.color3
      val: d.val3
      label: d.label
  ,
    name: "oranges"
    renderer: "donut"
    tooltip: (d) ->
      d.label + " " + d.val
    dataTransform: (d) ->
      color: d.color4
      val: d.val4
      label: d.label
  ,
    name: "apples"
    renderer: "donut"
    tooltip: (d) ->
      d.label + " " + d.val
    dataTransform: (d) ->
      color: d.color5
      val: d.val5
      label: d.label
  ,
    name: "peaches"
    renderer: "donut"
    tooltip: (d) ->
      d.label + " " + d.val
    dataTransform: (d) ->
      color: d.color6
      val: d.val6
      label: d.label
  ]

chart.render()

stackButton = $("<button class='btn btn-mini'>Stack</button>")
unstackButton = $("<button class='btn btn-mini'>Unstack</button>")
$("#above-chart").html ''
$("#above-chart").prepend stackButton
$("#above-chart").prepend unstackButton
unstackButton.click (e) ->
  chart.unstackTransition(1500)
  e.stopPropagation()
stackButton.click (e) ->
  chart.stackTransition(1500)
  e.stopPropagation()

$("#below-chart").html ''