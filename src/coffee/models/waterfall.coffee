Tactile.WaterfallRenderer = class WaterfallRenderer extends RendererBase
  name: "waterfall"

  specificDefaults:
    gapSize: 0
    round: true
    unstack: true


  initialize: (options = {}) ->
    @gapSize = options.gapSize || @gapSize

  render: (transition)=>
    @transition = transition if transition
    if (@series.disabled)
      @dragger?.timesRendered = 0
      @seriesCanvas().selectAll("rect").data(@series.stack).remove()
      return

    nodes = @seriesCanvas().selectAll("rect").data(@series.stack)
    nodes.enter()
      .append("svg:rect")
      .attr("clip-path", "url(#clip)")
      .on("click", @setActive)# set active element if click on it


    @transition.selectAll("##{@_nameToId()} rect")
      .filter((d) => d.y)
      .attr("height", (d) => @graph.y.magnitude Math.abs(d.y))
      .attr("y", @_barY)
      .attr("x", @_barX)
      .attr("width", @_seriesBarWidth())
      .attr("transform", @_transformMatrix)
      .attr("fill", @series.color)
      .attr("stroke", 'white')
      .attr("rx", @_edgeRatio)
      .attr("ry", @_edgeRatio)

    nodes.exit().remove()

    @setupTooltips()

  setupTooltips: ->
    if @series.tooltip
      @seriesCanvas().selectAll("rect").tooltip (d, i) =>
        circleColor: @series.color
        graph: @graph
        text: @series.tooltip(d)
        circleOnHover: false
        tooltipCircleContainer: @graph.vis.node()
        gravity: "right"


  barWidth: ->
    data = @series.stack
    count = data.length
    barWidth = @graph.width() / count * (1 - @gapSize)

  _transformMatrix: (d) =>
    # A matrix transform for handling negative values
    matrix = [1, 0, 0, ((if d.y+ d.y00 < 0 then -1 else 1)),
              0, ((if d.y+ d.y00 < 0 then @graph.y.magnitude(Math.abs(d.y+ d.y00)) * 2 else 0))
    ]
    "matrix(" + matrix.join(",") + ")"

  _edgeRatio: =>
    if @series.round then Math.round(0.05783 * @_seriesBarWidth() + 1) else 0

  _seriesBarWidth: =>
    if @series.stack.length >= 2
      stackWidth = @graph.x(@series.stack[1].x) - @graph.x(@series.stack[0].x)
      width = stackWidth / (1 + @gapSize)
    else
      width = @graph.width() / (1 + @gapSize)

    width = width / @graph.series.filter(
      (d) =>
        d.renderer == 'waterfall'
    ).length

  _barXOffset: (seriesBarWidth) ->
    count = @graph.renderersByType(@name).length
    barXOffset = -seriesBarWidth * count / 2

  _barX: (d) =>
    x = @graph.x(d.x)
    seriesBarWidth = @_seriesBarWidth()
    initialX = x + @_barXOffset(seriesBarWidth)
    initialX + (@_columnRendererIndex() * seriesBarWidth)

  _barY: (d, i) =>
    if d.y > 0
      @graph.y(Math.abs(d.y+d.y00)) * (if d.y+d.y00 < 0 then -1 else 1)
    else
      @graph.y(Math.abs(d.y00)) * (if d.y00 < 0 then -1 else 1)

  _columnRendererIndex: ->
    return 0 if @rendererIndex == 0 || @rendererIndex is undefined
    renderers = @graph.renderers.slice(0, @rendererIndex)
    _.filter(renderers,(r) => r.name == @name).length

