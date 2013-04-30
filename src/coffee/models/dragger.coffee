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
    # @power = Math.pow(10, (@series.sigfigs or 1))
    @power = if @series.sigfigs? then Math.pow(10, @series.sigfigs) else 1
    @setSpeed = @renderer.transitionSpeed
    @timesRendered = 0

  _bindMouseEvents: ->
    d3.select(@graph._element)
      .on("mousemove.drag.#{@series.name}", @_mouseMove)
      .on("touchmove.drag.#{@series.name}", @_mouseMove)
      .on("mouseup.drag.#{@series.name}", @_mouseUp)
      .on("touchend.drag.#{@series.name}", @_mouseUp)

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
    @dragged = {d: d, i: i, y: d.y, x: d.x}
    @update()

  _mouseMove: =>
    p = d3.svg.mouse(@graph.draggableVis.node())
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
      @dragged.y = value
      @onDrag(@dragged, @series, @graph)
      @update()

  _mouseUp: =>
    return unless @dragged?.y?
    @afterDrag(@dragged.d, @dragged.y, @dragged.i, @series, @graph) if @dragged

    @renderer.seriesDraggableCanvas().selectAll('circle.editable')
      .data(@series.stack)
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

