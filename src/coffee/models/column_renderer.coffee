Tactile.ColumnRenderer = class ColumnRenderer extends DraggableRenderer
  name: "column"

  specificDefaults:
    gapSize: 0.15
    tension: null
    round: true
    unstack: true


  initialize: (options = {}) ->
    super
    @dragger = new Dragger(renderer: @)
    @gapSize = options.gapSize || @gapSize
    @timesRendered = 0

  render: =>
    if (@series.disabled)
      @timesRendered = 0
      @dragger.timesRendered = 0
      @seriesCanvas().selectAll("rect").data(@series.stack).remove()
      @seriesCanvas().selectAll('circle').data(@series.stack).remove()
      return

    nodes = @seriesCanvas().selectAll("rect").data(@series.stack)
    nodes.enter()
      .append("svg:rect")
      .attr("clip-path", "url(#clip)")
      .on("click", @setActive)# set active element if click on it

    nodes
      .transition()
      .duration(if @timesRendered++ is 0 then 0 else @transitionSpeed)
      .attr("x", @_barX)
      .attr("y", @_barY)
      .attr("width", @_seriesBarWidth())
      .attr("height", (d) => @graph.y.magnitude Math.abs(d.y))
      .attr("transform", @_transformMatrix)
      .attr("fill", @series.color)
      .attr("stroke", 'white')
      .attr("rx", @_edgeRatio)
      .attr("ry", @_edgeRatio)
      .attr("class",
        (d, i) =>
          ["bar",
          ("colorless" unless @series.color),
          ("active" if d is @active), # apply active class for active element
          ("editable" if @utils.ourFunctor(@series.isEditable, d, i))].join(' ')) # apply editable class for editable element

    nodes.on 'mouseover.show-dragging-circle', (d, i, el) =>
      @seriesCanvas().selectAll('circle:not(.active)')
        .style('display', 'none')
      circ = @seriesCanvas().select("#node-#{i}-#{d.x}")
      circ.style('display', '')

    circ = @seriesCanvas().selectAll('circle')
      .data(@series.stack)

    newCircs = circ.enter().append("svg:circle")
      .on("click", @setActive)# set active element if click on it
      .style('display', 'none')

    @dragger?.makeHandlers(newCircs)
    @dragger?.updateDraggedNode()


    circ
      .transition()
      .duration(if @timesRendered++ is 0 then 0 else @transitionSpeed)
      .attr("cx", (d) => @_barX(d) + @_seriesBarWidth() / 2)
      .attr("cy", (d) => @_barY(d))
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
      ].join(' '))
      .attr("fill", (d) => (if d.dragged or d is @active then 'white' else @series.color))
      .attr("stroke", (d) => (if d.dragged or d is @active then @series.color else 'white'))
      .attr("stroke-width", 2)
      .attr('id', (d, i) -> "node-#{i}-#{d.x}")
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

  stackTransition: ->
    @unstack = false
    @graph.discoverRange(@)
    count = @series.stack.length

    nodes = @seriesCanvas().selectAll("rect").data(@series.stack)

    nodes.enter()
      .append("svg:rect")

    slideTransition = =>
      @seriesCanvas().selectAll("rect")
        .transition()
        .duration(if @timesRendered++ is 0 then 0 else @transitionSpeed)
        .attr("width", @_seriesBarWidth())
        .attr("x", @_barX)

    @seriesCanvas().selectAll("rect")
      .transition()
      .duration(if @timesRendered++ is 0 then 0 else @transitionSpeed)
      .attr("y", @_barY)
      .attr("height", (d) => @graph.y.magnitude Math.abs(d.y))
      .each('end', slideTransition)

    @setupTooltips()
    @graph.updateCallbacks.forEach (callback) ->
      callback()

  unstackTransition: ->
    @unstack = true
    @graph.discoverRange(@)
    count = @series.stack.length

    growTransition = =>
      @seriesCanvas().selectAll("rect")
        .transition()
        .duration(if @timesRendered++ is 0 then 0 else @transitionSpeed)
        .attr("height", (d) => @graph.y.magnitude Math.abs(d.y))
        .attr("y", @_barY)

    @seriesCanvas().selectAll("rect")
      .transition()
      .duration(if @timesRendered++ is 0 then 0 else @transitionSpeed)
      .attr("x", @_barX)
      .attr("width", @_seriesBarWidth())
      .each('end', growTransition)

    @setupTooltips()
    @graph.updateCallbacks.forEach (callback) ->
      callback()


  _transformMatrix: (d) =>
    # A matrix transform for handling negative values
    matrix = [1, 0, 0, ((if d.y < 0 then -1 else 1)),
      0, ((if d.y < 0 then @graph.y.magnitude(Math.abs(d.y)) * 2 else 0))
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

    if @unstack
      width = width / @graph.series.filter(
        (d) =>
          d.renderer == 'column'
      ).length
    width

  # when we have couple of series we want
  # them all to be center-aligned around the x-value
  _barXOffset: (seriesBarWidth) ->
    count = @graph.renderersByType(@name).length

    if count == 1 || !@unstack
      barXOffset = -seriesBarWidth / 2
    else
      barXOffset = -seriesBarWidth * count / 2

  _barX: (d) =>
    x = @graph.x(d.x)

    # center the bar around the value it represents
    seriesBarWidth = @_seriesBarWidth()
    initialX = x + @_barXOffset(seriesBarWidth)

    if @unstack
      initialX + (@_columnRendererIndex() * seriesBarWidth)
    else
      return initialX

  _barY: (d) =>
    # if we want to display stacked bars y should be added y0 value
    if @unstack
      @graph.y(Math.abs(d.y)) * (if d.y < 0 then -1 else 1)
    else
      @graph.y(d.y0 + Math.abs(d.y)) * (if d.y < 0 then -1 else 1)

  # Returns the index of this column renderer
  # For example: if this is the third renderer of
  #the column type it will have index equal to 2
  #
  # this is handy when you need to modify the x,y values depending
  # on what is the number of the currently rendered bars
  _columnRendererIndex: ->
    return 0 if @rendererIndex == 0 || @rendererIndex is undefined
    renderers = @graph.renderers.slice(0, @rendererIndex)
    _.filter(renderers,(r) => r.name == @name).length

