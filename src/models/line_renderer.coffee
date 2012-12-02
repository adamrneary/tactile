ChartRendererBase = require('./renderer_base')

module.exports = class LineRenderer extends ChartRendererBase
  name: "line"
  
  specificDefaults:
    unstack: true
    fill: false
    stroke: true

  seriesPathFactory: ->
    d3.svg.line()
    .x((d) => @graph.x d.x)
    .y((d) => @graph.y d.y)
    .interpolate(@graph.interpolation)
    .tension @tension
