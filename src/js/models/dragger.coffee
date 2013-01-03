Tactile.Dragger = class Dragger

  constructor: (args) ->
    @renderer = args.renderer
    @graph = @renderer.graph
    @series = @renderer.series
    @drawCircles = args.circles or false

    @afterDrag = @series.afterDrag || ->
    @onDrag = @series.onDrag || ->
    @dragged = null
    @_bindMouseEvents()
    @power = Math.pow(10, (@series.sigfigs or 1))
    @setSpeed = @renderer.transitionSpeed

#     @timesRendered = 0


  _bindMouseEvents: ->
    d3.select(@graph.element)
      .on("mousemove.drag.#{@series.name}", @_mouseMove)
      .on("touchmove.drag.#{@series.name}", @_mouseMove)
      .on("mouseup.drag.#{@series.name}", @_mouseUp)
      .on("touchend.drag.#{@series.name}", @_mouseUp)

  # bind dragging events to the passed nodes
  makeHandlers: (nodes) ->
    nodes = @_appendCircles(nodes) if @drawCircles

    nodes.on("mousedown.drag.#{@series.name}", @_datapointDrag)
      .on("touchstart.drag.#{@series.name}", @_datapointDrag)

  # update value of a draggable node so it's y-value will reflect currently dragged position
  updateDraggedNode: () ->
    if @dragged?.y?
      @renderer.seriesCanvas().selectAll('.draggable-node')
        .filter((d, i) => i is @dragged.i)
        .each (d) =>
          d.y = @dragged.y
          d.dragged = true

  _datapointDrag: (d, i) =>
    # lock the tooltip on the dragged element
    Tactile.Tooltip.spotlightOn(d) if @series.tooltip
    @dragged = {d: d, i: i}
    @update()

  _mouseMove: =>
    p = d3.svg.mouse(@graph.vis.node())
    t = d3.event.changedTouches

    if @dragged
      # TODO: !! move this to tooltip
      # TODO: !! update tooltip text continuously on dragging
      if @series.tooltip
        elementRelativeposition = d3.mouse(@graph.element)
        tip = d3.select(@graph.element).select('.tooltip')
        offsetTop = @graph.padding.top + @graph.margin.top
        tip.style("top", "#{@graph.y(@dragged.y) + offsetTop}px")

      @renderer.transitionSpeed = 0
      inverted = @graph.y.invert(Math.max(0, Math.min(@graph.height, p[1])))
      value = Math.round(inverted * @power) / @power
      @dragged.y = value
      @onDrag(@dragged, @series, @graph)
      @update()

  _mouseUp: =>
    return unless @dragged?.y?
    @afterDrag(@dragged.d, @dragged.y, @dragged.i, @series, @graph) if @dragged

    @renderer.seriesCanvas().selectAll('circle.draggable-node')
      .data(@series.stack)
      .attr("class", (d) =>
        d.dragged = false
        "draggable-node"
      )
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

    circs = @renderer.seriesCanvas().selectAll('circle.draggable-node')
      .data(@series.stack)

    # append the circles but make them invisible
    circs.enter().append("svg:circle").style('display', 'none')

    circs
      .attr("r", 4)
      .attr("clip-path", "url(#scatter-clip)")
      .attr("class", (d) => ["draggable-node", ("active" if d.dragged)].join(' '))
      .attr("fill", (d) => (if d.dragged then 'white' else @series.color))
      .attr("stroke", (d) => (if d.dragged then @series.color else 'white'))
      .attr("stroke-width", '2')
      .attr('id', (d, i) -> "draggable-node-#{i}-#{d.x}")
      .style("cursor", "ns-resize")

    circs
      .transition()
      .duration(if @timesRendered++ is 0 then 0 else @renderer.transitionSpeed)
      .attr("cx", (d) => @graph.x d.x)
      .attr("cy", (d) => @graph.y d.y)

    # show and hide the circle for the currently hovered element
    nodes.on 'mouseover.show-dragging-circle', (d, i) ->
      renderer.seriesCanvas().selectAll('.draggable-node').style('display', 'none')
      renderer.seriesCanvas().select("#draggable-node-#{i}-#{d.x}").style('display', '')

    circs.tooltip (d, i) =>
      graph: @graph
      text: @series.tooltip(d)
      circleOnHover: true
      gravity: "right"

    renderer.seriesCanvas().selectAll('.draggable-node')