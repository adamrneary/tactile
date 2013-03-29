Tactile.AreaRenderer = class AreaRenderer extends DraggableRenderer
  name: "area"
  dotSize: 5
  
  specificDefaults:
    unstack: true
    fill: true
    stroke: true
    opacity: 0.15

  _y0: (d) => if @unstack then 0 else d.y0

  initialize: ->
    super
    @dragger = new Dragger(renderer: @)
    @timesRendered = 0
    if @series.dotSize?
      @dotSize = @series.dotSize

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
      @seriesCanvas().selectAll("path").remove()
      @seriesCanvas().selectAll('circle').remove()
      return

    stroke = @seriesCanvas().selectAll('path.stroke').data([@series.stack])

    stroke.enter()
      .append("svg:path")
      .attr("clip-path","url(#clip)")
      .attr('fill', 'none')
      .attr("stroke-width", '2')
      .attr("stroke", @series.color)
      .attr('class', 'stroke')

    stroke.transition().duration(@transitionSpeed)
      .attr("d", @seriesStrokeFactory())

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
      .attr("r",
        (d) =>
          (
            if ("r" of d) then d.r
            else (if d.dragged or d is @active then @dotSize + 1 else @dotSize))
          )
      .attr("clip-path", "url(#scatter-clip)")
      .attr("class",
        (d, i) =>
          [
            ("active" if d is @active), # apply active class for active element
            ("editable" if @utils.ourFunctor(@series.isEditable, d, i))# apply editable class for editable element
          ].join(' '))
      .attr("fill", (d) => (if d.dragged or d is @active then 'white' else @series.color))
      .attr("stroke", (d) => (if d.dragged or d is @active then @series.color else 'white'))
      .attr("stroke-width", @dotSize / 2 || 2)

    circ.style("cursor", (d, i)=> if @utils.ourFunctor(@series.isEditable, d, i) then "ns-resize" else "auto")

    circ.exit().remove()
