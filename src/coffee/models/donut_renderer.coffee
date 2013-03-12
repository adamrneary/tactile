Tactile.DonutRenderer = class DonutRenderer extends RendererBase
  Tactile = window.Tactile or {}
  DonutRenderer::name = "donut"
  DonutRenderer::specificDefaults = cartesian: false
  DonutRenderer::initialize = ->
    @donut = d3.layout.pie().value((d) ->
      d.val
    )
    @arc = d3.svg.arc().outerRadius(50).innerRadius(30)

  # DonutRenderer::_total = ->

  DonutRenderer::render = ->
    donut = undefined
    donut = @seriesCanvas().selectAll(".arc")
      .data(@donut).enter().append("path")
      .attr("class", "donut-arc")
      .attr("d", @arc)
      .style("color", "black")

  DonutRenderer
