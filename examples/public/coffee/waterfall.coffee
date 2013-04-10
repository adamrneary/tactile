frameVal = [1325376000, 1343779200]
# time (period here) is unix milliseconds/1000
data = [
  period: 1325376000
  mediaPurchases: 420
,
  period: 1328054400
  mediaPurchases: 144
,
  period: 1330560000
  totalMediaPurchases: 564
,
  period: 1333238400
  professionalServices: 100
,
  period: 1335830400
  professionalServices: 246
,
  period: 1338508800
  professionalServices: -90
,
  period: 1341100800
  totalProfessionalServices: 256
,
  period: 1343779200
  totalRevenue: 720
]
chart = new Tactile.Chart()
  .element($("#example_view")[0]).height(500).width(700).data data
chart.axes({x: {dimension: 'time', frame: frameVal}, y: {dimension: "linear"}})

chart.addSeries [
  name: "Media Purchases"
  renderer: "waterfall"
  round: false
  color: "#FFE4C4"
  tooltip: (d) ->
    d.y + " $"

  dataTransform: (d) ->
    x: d.period
    y: d.mediaPurchases
,
  name: "Total Media Purchases"
  renderer: "waterfall"
  round: false
  color: "#6E8B3D"
  tooltip: (d) ->
    d.y + " $"

  dataTransform: (d) ->
    x: d.period
    y: d.totalMediaPurchases
,
  name: "Professional Services"
  renderer: "waterfall"
  round: false
  color: "#A2B5CD"
  tooltip: (d) ->
    d.y + " $"

  dataTransform: (d) ->
    x: d.period
    y: d.professionalServices
,
  name: "Total Professional Services"
  renderer: "waterfall"
  round: false
  color: "#3CB371"
  tooltip: (d) ->
    d.y + " $"

  dataTransform: (d) ->
    x: d.period
    y: d.totalProfessionalServices
,
  name: "Total Revenue"
  renderer: "waterfall"
  round: false
  color: "#A52A2A"
  tooltip: (d) ->
    d.y + " $"

  dataTransform: (d) ->
    x: d.period
    y: d.totalRevenue

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

