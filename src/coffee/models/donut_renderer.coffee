Tactile.DonutRenderer = class DonutRenderer extends RendererBase
  Tactile = window.Tactile or {}
  DonutRenderer::name = "donut"
  DonutRenderer::specificDefaults = cartesian: false
  DonutRenderer::initialize = ->
    @donut = d3.layout.pie().value((d) ->
      d.val
    )
    @arc = d3.svg.arc().innerRadius(60).outerRadius(@series.height)
  # DonutRenderer::_total = ->

  render: (transition)->
    @transition = transition if transition
    donut = undefined
    donut = @seriesCanvas().selectAll(".arc")
      .data(@donut).enter().append("path")

    @transition.selectAll("##{@_nameToId()} path")
      .attr("class", "donut-arc")
      .attr("transform", "translate(#{@series.height - 30},#{@series.height - 30})")
      .attr("d", @arc)
      .attr("stroke", "white")
      .style("fill", ((d)-> d.data.color), "stroke")

    @setupTooltips()

  setupTooltips: ->
    if @series.tooltip
      @seriesCanvas().selectAll("path").tooltip (d, i) =>
        color: @series.color
        graph: @graph
        text: @series.tooltip(d)
        #circleOnHover: true
        #tooltipCircleContainer: @graph.vis.node()
        gravity: "left"

  DonutRenderer
