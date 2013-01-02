Tactile.Dragger = class Dragger

  constructor: (args) ->
    @renderer = args.renderer
    @graph = @renderer.graph
    @series = @renderer.series

    @afterDrag = @series.afterDrag || ->
    @onDrag = @series.onDrag || ->
    @dragged = null
    @_bindMouseEvents()
    @power = Math.pow(10, (@series.sigfigs or 1))
    @setSpeed = @renderer.transitionSpeed


  _bindMouseEvents: ->
    d3.select(@graph.element)
      .on("mousemove.drag.#{@series.name}", @_mouseMove)
      .on("touchmove.drag.#{@series.name}", @_mouseMove)
      .on("mouseup.drag.#{@series.name}", @_mouseUp)
      .on("touchend.drag.#{@series.name}", @_mouseUp)

  makeHandlers: (nodes) ->
    nodes = nodes
    nodes.on("mousedown.drag.#{@series.name}", @_datapointDrag)
      .on("touchstart.drag.#{@series.name}", @_datapointDrag)

  updateDraggedNode: (nodes) ->
    if @dragged?.y?
      nodes
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
      @onDrag(@dragged, @series, @graph);
      @update()

  _mouseUp: =>
    return unless @dragged?.y?
    @afterDrag(@dragged.d, @dragged.y, @dragged.i, @series, @graph) if @dragged
    $(@graph).find('.active').attr('class', '')
    d3.select("body").style "cursor", "auto"
    @dragged = null

    # unlock the tooltip from the dragged element
    Tactile.Tooltip.turnOffspotlight() if @series.tooltip

    @renderer.transitionSpeed = @setSpeed
    @update()

  update: =>
    @renderer.render()
