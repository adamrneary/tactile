class Tactile.WaterfallRenderer extends Tactile.RendererBase
  name: "waterfall"

  specificDefaults:
    gapSize: 0.15
    round: true
    unstack: true

  initialize: (options = {}) ->
    @gapSize = options.gapSize || @gapSize
    @aggregated = @graph.aggregated[@name]

  render: (transition, recalculateData, transitionSpeed)=>
    @_checkData() if @checkData
    if @aggregated
      @aggdata = @utils.aggregateData @series.stack, @graph.x.domain()
    else
      @aggdata = @series.stack

    @transition = transition if transition
    if (@series.disabled)
      @dragger?.timesRendered = 0
      @seriesCanvas().selectAll("rect").data(@aggdata).remove()
      @seriesDraggableCanvas().selectAll("line").data(@aggdata).remove()
      return

    nodes = @seriesCanvas().selectAll("rect").data(@aggdata)
    nodes.enter()
      .append("svg:rect")
      .attr("clip-path", "url(#clip)")
      .on("mousedown", @setActive)# set active element if click on it

    if transition then selectObject = @transition.selectAll(".#{@_nameToId()} rect")
    else selectObject = @seriesCanvas().selectAll("rect")
    selectObject.filter((d) => @_filterNaNs(d, 'x', 'y', 'y00'))
      .attr("height", (d) => @graph.y.magnitude Math.abs(d.y))
      .attr("y", (d)=> @_barY(d))
      .attr("x", @_barX)
      .attr("width", @_seriesBarWidth() / (1 + @gapSize))
      .attr("fill", @series.color)

    nodes.exit().remove()

    line = @seriesDraggableCanvas().selectAll("line").data(@aggdata)
    line.enter()
      .append("svg:line")
      .attr("clip-path", "url(#clip)")

    selectObject = @transition.selectAll(".#{@_nameToId()} line")
      .filter((d) => @_filterNaNs(d, 'x', 'y', 'y00'))
      .attr("x1", (d) => @_barX(d) + @_seriesBarWidth() / (1 + @gapSize))
      .attr("x2", (d, i) =>
        gapCount = @graph.series.filter(
          (d) =>
            d.renderer == 'waterfall'
        ).length()
        if i is 0
          @_barX(d, i) - @_seriesBarWidth()
        else
          stackWidthCur = @graph.x(@series.stack[i].x) - @graph.x(@series.stack[i-1].x) || 0
          @_barX(d, i)-(if  @_waterfalRendererIndex() is 0 then stackWidthCur - @_seriesBarWidth()*gapCount else 0) - @_seriesBarWidth()
      )
      .attr("y1", (d)=>@_barY(d)+(if d.y > 0 then @graph.y.magnitude Math.abs(d.y) else 0))
      .attr("y2", (d)=>@_barY(d)+(if d.y > 0 then @graph.y.magnitude Math.abs(d.y) else 0))
      .attr("stroke", "#BEBEBE")
      .attr("stroke-width", (d, i)=>
        if (@_waterfalRendererIndex() is 0 and i is 0) or (@utils.ourFunctor(@series.fromBaseline, d, i)) then 0 else 1)

    line.exit().remove()

    selectObject.each("end", () => @animateShow() if @animateShowHide)

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

  seriesWidth: =>
    if @series.stack.length >= 2
      stackWidth = @graph.x(@series.stack[1].x) - @graph.x(@series.stack[0].x)
      width = stackWidth / (1 + @gapSize)
    else
      width = @graph.width() / (1 + @gapSize)

  _seriesBarWidth: =>
    if @aggregated
      count = @utils.domainMonthRange(@graph.x.domain())
      if      12 < count <= 36
        count = Math.ceil(count/3)
      else if 36 < count
        count = Math.ceil(count/12)
    else
      count = @series.stack.length

    width = @graph.width() / count
    width = width / @graph.series.filter((d) =>
      d.renderer == @name).array.length

    width = width - (2 * @gapSize)
    width

  _barXOffset: (seriesBarWidth) ->
    count = @graph.renderersByType(@name).length
    barXOffset = -seriesBarWidth * count / 2

  _barX: (d) =>
    seriesBarWidth = @_seriesBarWidth()
    if @aggregated
      x = d.x
      cnt_series = @graph.series.filter((d) =>
        d.renderer == @name).array.length
      initialX = x * (seriesBarWidth + 2 * @gapSize) * cnt_series + @gapSize
      initialX + (@_waterfalRendererIndex() * seriesBarWidth)
    else
      x = @graph.x(d.x)
      initialX = x + @_barXOffset(seriesBarWidth)
      initialX + (@_waterfalRendererIndex() * seriesBarWidth)

  _barY: (d, i) =>
    if d.y > 0
      @graph.y(d.y + d.y00)
    else
      @graph.y(d.y00)

  _waterfalRendererIndex: ->
    return 0 if @rendererIndex == 0 || @rendererIndex is undefined
    renderers = @graph.renderers.slice(0, @rendererIndex)
    _.filter(renderers,(r) => r.name == @name).length
