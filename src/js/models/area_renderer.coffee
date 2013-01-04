Tactile.AreaRenderer = class AreaRenderer extends RendererBase
  name: "area"
  dotSize: 5
  
  specificDefaults:
    unstack: true
    fill: true
    stroke: true
    opacity: 0.15
    
  _y0: (d) => if @unstack then 0 else d.y0

  initialize: ->
    @dragger = new Dragger(renderer: @) if @series.draggable
    @timesRendered = 0

  seriesPathFactory: ->
    d3.svg.area()
    .x((d) => @graph.x d.x)
    .y0((d) => @graph.y @_y0(d))
    .y1((d) => @graph.y d.y + @_y0(d))
    .interpolate(@graph.interpolation)
    .tension @tension

  seriesStrokeFactory: ->
    d3.svg.line()
    .x((d) => @graph.x d.x)
    .y((d) => @graph.y d.y + @_y0(d))
    .interpolate(@graph.interpolation)
    .tension @tension

  render: ->
    super()
    if (@series.disabled)
      @timesRendered = 0
      @seriesCanvas().selectAll("path.stroke").data(@series.stack).remove()
      @seriesCanvas().selectAll('circle').data(@series.stack).remove()
      return

    stroke = @seriesCanvas().selectAll('path.stroke').data([@series.stack])

    stroke.enter()
      .append("svg:path")
      .attr("clip-path","url(#clip)")
      .attr('fill', 'none')
      .attr("stroke-width", '2')
      .attr("stroke", @series.color)
      .attr('class', 'stroke')

    stroke.transition().duration(@transitionSpeed).attr("d", @seriesStrokeFactory())

    circ = @seriesCanvas().selectAll('circle')
      .data(@series.stack)

    newCircs = circ.enter().append("svg:circle")

    @dragger?.makeHandlers(newCircs)
    @dragger?.updateDraggedNode(circ)

    #TODO: this block of code is the same in few places
    circ
      .transition()
      .duration(if @timesRendered++ is 0 then 0 else @transitionSpeed)
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
