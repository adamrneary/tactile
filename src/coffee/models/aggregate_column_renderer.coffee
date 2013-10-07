class Tactile.AggColumnRenderer extends Tactile.DraggableRenderer
  name: "aggcolumn"

  specificDefaults:
    gapSize: 0.15
    tension: null
    round: true
    unstack: true
    dinGapSize: 1

  initialize: (options = {}) ->
    super
    @dragger = new Tactile.Dragger(renderer: @)
    @gapSize = options.gapSize || @gapSize
    @round = @series.round unless @series.round is undefined
    @unstack = @series.unstack unless @series.unstack is undefined

  render: (transition)=>
    @_checkData() if @checkData

#    oldAggData = @aggData
    @aggData = @utils.aggregateData @series.stack, @graph.x.domain()

#    transitionData = []
#    if oldAggData[0].range[0] < @aggData[0].range[0]
#      data = {}
#      data.startX = -Infinity
#      data.endX = @aggData[0].x
#      data.startY = @aggData[0].y
#      data.endY = @aggData[0].y
#      data.startY0 = @aggData[0].y0
#      data.endY0 = @aggData[0].y0
#      transitionData.push data
#
#
#
#    console.log "oldAggData", oldAggData
#    console.log "@aggData", @aggData
#
#
#   template for new animation for aggregated data
#   https://github.com/activecell/tactile/issues/144
#
#
#
#

    @transition = transition if transition
    if (@series.disabled)
      @dragger?.timesRendered = 0
      @seriesCanvas().selectAll("rect").data(@aggData).remove()
      @seriesDraggableCanvas().selectAll("circle").data(@aggData).remove()
      return

    nodes = @seriesCanvas().selectAll("rect").data(@aggData)
    nodes.enter()
      .append("svg:rect")
      .attr("clip-path", "url(#clip)")
      .on("mousedown", (d, i)=>
        @setActive(d, i) # set active element if click on it
        @hideCircles()
      )

    @transition.selectAll(".#{@_nameToId()} rect")
      .attr("height", (d) => @yFunction().magnitude Math.abs(d.y))
      .attr("y", @_barY)
      .attr("x", @_barX)
      .attr("width", @_seriesBarWidth())
      .attr("fill", (d, i) => @utils.ourFunctor(@series.color, d, i))
      .attr("stroke", "white")
      .attr("rx", @_edgeRatio)
      .attr("ry", @_edgeRatio)
      .attr("class",
      (d, i) =>
        ["bar",
          ("colorless" unless @series.color),
          ("active" if d is @active), # apply active class for active element
          ("editable" if @utils.ourFunctor(@series.isEditable, d, i))].join(" ")) # apply editable class for editable element

    nodes.exit().remove()

    nodes.on "mouseover.show-dragging-circle", (d, i, el) =>
      @hideCircles()
      circ = @seriesDraggableCanvas().selectAll("#node-#{i}-#{d.x}")
      circ.style("display", "")

    nodes.on "mouseout.hide-dragging-circle", (d, i) =>
      return if d is @active
      circ = @seriesDraggableCanvas().selectAll("#node-#{i}-#{d.x}")
      return if d3.event.relatedTarget is circ.node()
      circ.style("display", "none")

    circ = @seriesDraggableCanvas().selectAll("circle")
      .data(@aggData)

    newCircs = circ.enter().append("svg:circle")
      .style("display", "none")
      .on("mousedown", (d, i)=>
        @setActive(d, i) # set active element if click on it
        @hideCircles()
      )
      .on( "mouseout.hide-dragging-circle", (d, i) =>
        return if d is @active
        circ = @seriesDraggableCanvas().selectAll("#node-#{i}-#{d.x}")
        return if d3.event.relatedTarget is circ.node()
        circ.style("display", "none")
      )

    @dragger?.makeHandlers(newCircs)
    @dragger?.updateDraggedNode()

    @transition.selectAll(".#{@_nameToId()} circle")
      .filter((d) => @_filterNaNs(d, "x", "y"))
      .attr("cx", (d) => @_barX(d) + @_seriesBarWidth() / 2)
      .attr("cy", (d) => @_barY(d) + (if d.y < 0 then @yFunction().magnitude(Math.abs(d.y)) else 0))
      .attr("r",
        (d) =>
          (if ("r" of d)
            d.r
          else
            (if d.dragged or d is @active then @dotSize + 1 else @dotSize))
      )
      .attr("clip-path", "url(#scatter-clip)")
      .attr("class", (d, i) => [
        ("active" if d is @active), # apply active class for active element
        ("editable" if @utils.ourFunctor(@series.isEditable, d, i))# apply editable class for editable element
      ].join(" "))
      .attr("fill", (d, i) => (if d.dragged or d is @active then "white" else @utils.ourFunctor(@series.color, d, i)))
      .attr("stroke", (d, i) => (if d.dragged or d is @active then @utils.ourFunctor(@series.color, d, i) else "white"))
      .attr("stroke-width", 2)
      .attr("id", (d, i) -> "node-#{i}-#{d.x}")
      .style("cursor", (d, i)=> if @utils.ourFunctor(@series.isEditable, d, i) then "ns-resize" else "auto")

    circ.exit().remove()

    # set tooltip for circles
    if @series.tooltip
      circ.tooltip (d, i) =>
        circleColor: @series.color
        graph: @graph
        text: @series.tooltip(d)
        circleOnHover: true
        tooltipCircleContainer: @graph.vis.node()
        gravity: "right"

    # set tooltip for column
    @setupTooltips()

  hideCircles: ()=>
    @seriesDraggableCanvas().selectAll("circle")
      .style("display", (d)=>
        if d is @active
          ""
        else
          "none"
      )

  setupTooltips: ->
    if @series.tooltip
      @seriesCanvas().selectAll("rect").tooltip (d, i) =>
        circleColor: @series.color
        graph: @graph
        text: @series.tooltip(d)
        circleOnHover: false
        tooltipCircleContainer: @graph.vis.node()
        gravity: "right"
        placement: if d.y < 0 then "bottom" else "top"


  barWidth: ->
    data = @series.stack

    count = data.length
    barWidth = @graph.width() / count * (1 - @dinGapSize)#@gapSize)

  stackTransition: (transition, transitionSpeed)=>
    @graph.setYFrame([NaN, NaN])
    @graph.setY1Frame([NaN, NaN])
    @graph.discoverRange()
    @graph._checkYDomain()
    @graph._checkY1Domain()

    transition.selectAll(".#{@_nameToId()} rect")
      .delay((d,i) => i*(transitionSpeed/12))
      .attr("y", @_barY)
      .attr("height", (d) => @yFunction().magnitude Math.abs(d.y))
      .transition()
      .attr("x", @_barX)
      .attr("width", @_seriesBarWidth())

    transition.selectAll(".#{@_nameToId()} circle")
      .delay((d,i) => i*(transitionSpeed/12))
      .attr("cy", (d) => @_barY(d) + (if d.y < 0 then @yFunction().magnitude(Math.abs(d.y)) else 0))
      .transition()
      .attr("cx", (d) => @_barX(d) + @_seriesBarWidth() / 2)

  unstackTransition: (transition, transitionSpeed)=>
    @unstack = true
    @graph.setYFrame([NaN, NaN])
    @graph.setY1Frame([NaN, NaN])
    @graph.discoverRange()
    @graph._checkYDomain()
    @graph._checkY1Domain()

    transition.selectAll(".#{@_nameToId()} rect")
      .delay((d,i) => i*(transitionSpeed/12))
      .attr("x", @_barX)
      .attr("width", @_seriesBarWidth())
      .transition()
      .attr("y", @_barY)
      .attr("height", (d) => @yFunction().magnitude Math.abs(d.y))

    transition.selectAll(".#{@_nameToId()} circle")
      .delay((d,i) => i*(transitionSpeed/12))
      .attr("cx", (d) => @_barX(d) + @_seriesBarWidth() / 2)
      .transition()
      .attr("cy", (d) => @_barY(d) + (if d.y < 0 then @yFunction().magnitude(Math.abs(d.y)) else 0))

  _edgeRatio: =>
    if @series.round then Math.round(0.05783 * @_seriesBarWidth() + 1) else 0

  seriesWidth: =>
    if @series.stack.length >= 2
      stackWidth = @graph.x(@series.stack[1].x) - @graph.x(@series.stack[0].x)
      width = stackWidth / (1 + @dinGapSize)
    else
      width = @graph.width() / (1 + @dinGapSize)

  _seriesBarWidth: =>
    stack = @aggData
    width = @graph.width() / stack.length
#    console.log "width", width
    if @unstack
      width = width / @graph.series.filter((d) =>
        d.renderer == "aggcolumn"
      ).array.length
    width = width - (2 * @dinGapSize)
    width

  _barX: (d) =>
    x = d.x

    seriesBarWidth = @_seriesBarWidth()

    cnt_series = @graph.series.filter((d) =>
      d.renderer == "aggcolumn"
      ).array.length

    initialX = x * (seriesBarWidth + 2 * @dinGapSize) + @dinGapSize
    if @unstack
      initialX = x * (seriesBarWidth + 2 * @dinGapSize) * cnt_series + @dinGapSize
      initialX + (@_columnRendererIndex() * seriesBarWidth)
    else
      return initialX

  _barY: (d) =>
    if @unstack
      if d.y > 0
        @yFunction()(d.y)
      else
        @yFunction()(0)
    else
      if d.y > 0
        @yFunction()(d.y + d.y0)
      else
        @yFunction()(d.y0)

  _columnRendererIndex: ->
    return 0 if @rendererIndex == 0 || @rendererIndex is undefined
    renderers = @graph.renderers.slice(0, @rendererIndex)
    _.filter(renderers,(r) => r.name == @name).length

  domain: ->
    domain = super
    values = []
    data = @utils.aggregateData @series.stack, @graph.x.domain()
    console.log "data", data
    _.each data, (d) =>
      if @unstack
        values.push d.y
      else
        values.push d.y + d.y0

    if data.length == 0
      return domain

    yMin = (if @graph.min is "auto" then d3.min(values) else @graph.min or 0)
    yMax = @graph.max or d3.max(values)

    domain.y = [yMin, yMax]
    console.log "domain after", domain
    domain