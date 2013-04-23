class Tactile.WaterfallRenderer extends Tactile.RendererBase
  name: "waterfall"

  specificDefaults:
    gapSize: 0.15
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
      .filter((d) => !isNaN(d.y) and !isNaN(d.x) and !isNaN(d.y00) and d.y? and d.x? and d.y00?)
      .attr("height", (d) => (@graph.y.magnitude Math.abs(d.y)) - 1)
      .attr("y", (d)=> @_barY(d) + 0.5)
      .attr("x", @_barX)
      .attr("width", @_seriesBarWidth() / (1 + @gapSize))
      .attr("transform", @_transformMatrix)
      .attr("fill", @series.color)

    nodes.exit().remove()

    line = @seriesCanvas().selectAll("line").data(@series.stack)
    line.enter()
      .append("svg:line")
      .attr("clip-path", "url(#clip)")

    @transition.selectAll("##{@_nameToId()} line")
      .filter((d) => !isNaN(d.y) and !isNaN(d.x) and !isNaN(d.y00) and d.y? and d.x? and d.y00?)
      .attr("x1", (d)=>@_barX(d) + @_seriesBarWidth() / (1 + @gapSize))
      .attr("x2", (d, i)=>
        gapCount = @graph.series.filter(
          (d) =>
            d.renderer == 'waterfall'
        ).length()
        if i is 0
          @_barX(d, i) - @_seriesBarWidth()
        else
          stackWidthCur = @graph.x(@series.stack[i].x) - @graph.x(@series.stack[i-1].x)
          @_barX(d, i)-(if  @_waterfalRendererIndex() is 0 then stackWidthCur - @_seriesBarWidth()*gapCount else 0) - @_seriesBarWidth()
      )
      .attr("y1", (d)=>@_barY(d)+(if d.y > 0 then @graph.y.magnitude Math.abs(d.y) else 0))
      .attr("y2", (d)=>@_barY(d)+(if d.y > 0 then @graph.y.magnitude Math.abs(d.y) else 0))
      .attr("stroke", "#BEBEBE")
      .attr("stroke-width", (d, i)=>
        if (@_waterfalRendererIndex() is 0 and i is 0) or (@utils.ourFunctor(@series.fromBaseline, d, i)) then 0 else 1)


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

  _seriesBarWidth: =>
    if @series.stack.length >= 2
      stackWidth = @graph.x(@series.stack[1].x) - @graph.x(@series.stack[0].x)
      width = stackWidth / (1 + @gapSize)
    else
      width = @graph.width() / (1 + @gapSize)

    width = width / @graph.series.filter(
      (d) =>
        d.renderer == 'waterfall'
    ).length()

  _barXOffset: (seriesBarWidth) ->
    count = @graph.renderersByType(@name).length
    barXOffset = -seriesBarWidth * count / 2

  _barX: (d) =>
    x = @graph.x(d.x)
    seriesBarWidth = @_seriesBarWidth()
    initialX = x + @_barXOffset(seriesBarWidth)
    initialX + (@_waterfalRendererIndex() * seriesBarWidth)

  _barY: (d, i) =>
    if d.y > 0
      @graph.y(Math.abs(d.y+d.y00)) * (if d.y+d.y00 < 0 then -1 else 1)
    else
      @graph.y(Math.abs(d.y00)) * (if d.y00 < 0 then -1 else 1)

  _waterfalRendererIndex: ->
    return 0 if @rendererIndex == 0 || @rendererIndex is undefined
    renderers = @graph.renderers.slice(0, @rendererIndex)
    _.filter(renderers,(r) => r.name == @name).length

