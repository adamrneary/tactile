Tactile.LineRenderer = class LineRenderer extends RendererBase
  name: "line"

  specificDefaults:
    unstack: true
    fill: false
    stroke: true
    dotSize: 5

  seriesPathFactory: ->
    d3.svg.line()
      .x((d) => @graph.x d.x)
      .y((d) => @graph.y d.y)
      .interpolate(@graph.interpolation)
      .tension @tension

  initialize: ->
    @afterDrag = @series.afterDrag || ->
    @onDrag = @series.onDrag || ->
    @dragged = null
    @_bindMouseEvents() if @series.draggable
    @power = Math.pow(10, @series.sigfigs)
    @setSpeed = @transitionSpeed
    @timesRendered = 0  # handy when we decide about the transition time

  render: ->
    super()
    circ = @seriesCanvas().selectAll('circle')
      .data(@series.stack)

    newCircs = circ.enter().append("svg:circle")

    if @series.draggable
      newCircs.on("mousedown.drag.#{@series.name}", @_datapointDrag)
        .on("touchstart.drag.#{@series.name}", @_datapointDrag)

    circ
      .transition()
      .duration(if @timesRendered is 0 then 0 else @transitionSpeed)
      .attr("cx", (d) => @graph.x d.x)
      .attr("cy", (d) => @graph.y d.y)
      .attr("r", (d) => (if ("r" of d) then d.r else (if d.dragged then @dotSize + 1 else @dotSize)))
      .attr("clip-path", "url(#scatter-clip)")
      .attr("class", (d) =>
        [("draggable-node" if @series.draggable), (if d.dragged then "active" else null)].join(' '))
      .attr("fill", (d) => (if d.dragged then 'white' else @series.color))
      .attr("stroke", (d) => (if d.dragged then @series.color else 'white'))
      .attr("stroke-width", '2')

    circ.style("cursor", "ns-resize") if @series.draggable

    circ.exit().remove()

    if @dragged?.y?
      circ
        .filter((d, i) => i is @dragged.i)
        .each (d) =>
          d.y = @dragged.y
          d.dragged = true

    if @series.tooltip
      circ.tooltip (d, i) =>
        circleColor: @series.color
        graph: @graph
        text: @series.tooltip(d)
        circleOnHover: true
        tooltipCircleContainer: @graph.vis.node()
        gravity: "right"

    @timesRendered++

  update: =>
    @graph.update()
    @render()

  # Dragging logic below

  _bindMouseEvents: =>
    d3.select(@graph.element)
      .on("mousemove.drag.#{@series.name}", @_mouseMove)
      .on("touchmove.drag.#{@series.name}", @_mouseMove)
      .on("mouseup.drag.#{@series.name}", @_mouseUp)
      .on("touchend.drag.#{@series.name}", @_mouseUp)

  _datapointDrag: (d, i) =>
    # lock the tooltip on the dragged element
    Tactile.Tooltip.spotlightOn(d)
    @dragged = {d: d, i: i}
    @update()

  _mouseMove: =>
    p = d3.svg.mouse(@graph.vis.node())
    t = d3.event.changedTouches
    if @dragged
      @transitionSpeed = 0
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
    Tactile.Tooltip.turnOffspotlight()

    @transitionSpeed = @setSpeed
    @update()
    
