class Tactile.Dragger

  constructor: (args) ->
    @renderer = args.renderer
    @graph = @renderer.graph
    @series = @renderer.series
    @drawCircles = args.circles or false

    @afterDrag = @series.afterDrag || ->
    @onDrag = @series.onDrag || ->
    @dragged = null
    @_bindMouseEvents()
    @power = @_calculateSigFigs()
    @setSpeed = @renderer.transitionSpeed
    @timesRendered = 0

  _bindMouseEvents: ->
    d3.select(@graph._element)
      .on("mousemove.drag.#{@series.name}", @_mouseMove)
      .on("touchmove.drag.#{@series.name}", @_mouseMove)
      .on("mouseup.drag.#{@series.name}", @_mouseUp)
      .on("touchend.drag.#{@series.name}", @_mouseUp)

  # We need more documentation EVERYWHERE, but at least for this concept...
  #
  # Sigfigs stands for "significant figures."
  #
  # The idea within a dragger is that you shouldn't be able to arbitrarily
  # drag a node anywhere along a continuous axis, expecting the user to
  # differentiate between 4.5343928 and 4.5343929 (for example). In many
  # cases, in fact, the data being modelled only makes sense as an integer.
  #
  # So, by default, we set sigfigs to 0 (meaning 0 decimal places), which
  # constrains the user's drag destination to integers. If, however, the axis
  # represents percentages, this will constrain to 0 or 100% (etc.). So in
  # this case sigfigs = 4 would allow 14.52% (stored as 0.1452).
  #
  # In keeping with our "functor" strategery, the series can pass an integer
  # or a function that returns an integer when applied to a data point passed
  # as an argument.
  _calculateSigFigs: ->
    test = @series.sigfigs
    test =  @renderer
    test =  @renderer.utils.ourFunctor
    test = @renderer.utils.ourFunctor(@series.sigfigs)

    sigfigs = @renderer.utils.ourFunctor(@series.sigfigs) ? 0
    Math.pow(10, sigfigs)

  # bind dragging events to the passed nodes
  makeHandlers: (nodes) ->
    nodes = @_appendCircles(nodes) if @drawCircles

    nodes.on("mousedown.drag.#{@series.name}", @_datapointDrag)
      .on("touchstart.drag.#{@series.name}", @_datapointDrag)

  # update value of a draggable node
  # so it's y-value will reflect currently dragged position
  updateDraggedNode: () ->
    if @dragged?.y?
      @renderer.seriesDraggableCanvas().selectAll('circle.editable')
        .filter((d, i) => d is @dragged.d)
        .each (d) =>
          d.y = @dragged.y
          d.dragged = true

  _datapointDrag: (d, i) =>
    # fix for a weird behavior that d is sometimes
    # an array with all the nodes of the series
    d = if _.isArray(d) then d[i] else d
    # lock the tooltip on the dragged element
    return unless @renderer.utils.ourFunctor(@series.isEditable, d, i)
    Tactile.Tooltip.spotlightOn(d) if @series.tooltip
    @dragged = {d: d, i: i, y: d.y, x: d.x, y0: d.y0}
    @update()
    d3.event.preventDefault()
    d3.event.stopPropagation()

  _mouseMove: =>
    p = d3.mouse(@graph.draggableVis.node())
    t = d3.event.changedTouches

    if @dragged
      # TODO: !! move this to tooltip
      # TODO: !! update tooltip text continuously on dragging
      if @series.tooltip
        tip = d3.select(@graph._element).select('.tooltip')
        hoveredNode = @renderer.seriesDraggableCanvas().selectAll('circle.editable')
          .filter((d, i) =>
            # fix for a weird behavior that d is sometimes
            # an array with all the nodes of the series
            d = if _.isArray(d) then d[i] else d
            d is @dragged.d
          )
          .node()
          .getBoundingClientRect()

        tip.style("top", "#{hoveredNode.top}px")

      @renderer.transitionSpeed = 0
      inverted = @renderer.yFunction().invert(Math.max(0, Math.min(@graph.height(), p[1])))
      value = Math.round(inverted * @power) / @power
      if @renderer.unstack
        @dragged.y = value
      else
        @dragged.y = value - @dragged.y0
      @onDrag(@dragged, @series, @graph)
      @update()
      d3.event.preventDefault()
      d3.event.stopPropagation()


  _mouseUp: =>
    return unless @dragged?.y?
    if @dragged.d.source
      y = @dragged.y / @dragged.d.source.length
      _.each @dragged.d.source, (d) =>
        @afterDrag(d, y) if @dragged
    else
      @afterDrag(@dragged.d, @dragged.y, @dragged.i, @series, @graph) if @dragged

    @renderer.seriesDraggableCanvas().selectAll('circle.editable')
      .data(@renderer.aggdata)
      .attr("class",
        (d) =>
          d.dragged = false
          "editable")
    d3.select("body").style "cursor", "auto"
    @dragged = null


    # unlock the tooltip from the dragged element
    Tactile.Tooltip.turnOffspotlight() if @series.tooltip

    @renderer.transitionSpeed = @setSpeed
    @update()
    d3.event.preventDefault()
    d3.event.stopPropagation()

  update: =>
    @renderer.render()


  _appendCircles: (nodes) ->
    renderer = @renderer

    circs = @renderer.seriesDraggableCanvas().selectAll('circle')
      .data(@series.stack)

    # append the circles but make them invisible
    circs.enter().append("svg:circle").style('display', 'none')

    circs
      .attr("r", 4)
      .attr("clip-path", "url(#scatter-clip)")
      .attr("class",
        (d, i) =>
          [("active" if d is renderer.active), # apply active class for active element
          ("editable" if renderer.utils.ourFunctor(renderer.series.isEditable, d, i))].join(' ')) # apply editable class for editable element
      .attr("fill", (d) => (if d.dragged or d is renderer.active then 'white' else @series.color))
      .attr("stroke", (d) => (if d.dragged or d is renderer.active then @series.color else 'white'))
      .attr("stroke-width", '2')
      .attr('id', (d, i) -> "node-#{i}-#{d.x}")
      .style("cursor", (d, i)=> if renderer.utils.ourFunctor(@series.isEditable, d, i) then "ns-resize" else "auto")

    circs
      .transition()
      .duration(if @timesRendered++ is 0 then 0 else @renderer.transitionSpeed)
      .attr("cx", (d) => @graph.x d.x)
      .attr("cy", (d) => @graph.y d.y)

    # show and hide the circle for the currently hovered element
    nodes.on 'mouseover.show-dragging-circle', (d, i, el) ->
      renderer.seriesDraggableCanvas().selectAll('circle:not(.active)')
        .style('display', 'none')
      circ = renderer.seriesDraggableCanvas().select("#node-#{i}-#{d.x}")
      # TODO: circle should be placed at the middle of a column
      # hoveredNode = d3.select(@).node().getBBox()
      # circ.attr('cx', hoveredNode.x + hoveredNode.width / 2)
      circ.style('display', '')

    circs.tooltip (d, i) =>
      graph: @graph
      text: @series.tooltip(d)
      circleOnHover: true
      gravity: "right"

    renderer.seriesDraggableCanvas().selectAll('circle.editable')

