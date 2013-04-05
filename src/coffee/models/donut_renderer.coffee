Tactile.DonutRenderer = class DonutRenderer extends RendererBase
  Tactile = window.Tactile or {}
  DonutRenderer::name = "donut"
  DonutRenderer::specificDefaults = cartesian: false
  DonutRenderer::initialize = ->
    @donut = d3.layout.pie().value((d) ->
      d.val
    )
    @arc = d3.svg.arc().innerRadius(@series.innerRadius).outerRadius(@series.outerRadius)
  # DonutRenderer::_total = ->

  render: (transition)->
    @transition = transition if transition
    donut = undefined
    donut = @seriesCanvas().selectAll("donut-arc")
      .data(@donut).enter().append("path")

    @transition.selectAll("##{@_nameToId()} path")
      .attr("class", "donut-arc")
      .attr("transform", "translate(#{@series.outerRadius},#{@series.outerRadius})")
      .attr("d", @arc)
      .attr("stroke", "white")
      .attr("fill", ((d)-> d.data.color), "stroke")

    @setupTooltips()

  setupTooltips: ->
    if @series.tooltip
      @seriesCanvas().selectAll("path").tooltip (d, i) =>
        color: @series.color
        graph: @graph
        text: @series.tooltip(d)
        gravity: "right"
        displacement: [-10, 0]# because tooltip have left margin 10
