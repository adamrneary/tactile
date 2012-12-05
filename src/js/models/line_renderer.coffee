Tactile.LineRenderer = class LineRenderer extends RendererBase
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
