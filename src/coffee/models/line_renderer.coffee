Tactile.LineRenderer = class LineRenderer extends DraggableRenderer
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
    super
    @dragger = new Dragger(renderer: @) if @series.draggable
    @timesRendered = 0
    if @series.dotSize?
      @dotSize = @series.dotSize


  render: =>
    super()
    if (@series.disabled)
      @seriesCanvas().selectAll('circle')
        .data(@series.stack)
        .remove()
      return
    circ = @seriesCanvas().selectAll('circle')
      .data(@series.stack)

    newCircs = circ.enter().append("svg:circle")
      .on("click", @_click)# set active element if click on it


    @dragger?.makeHandlers(newCircs)
    @dragger?.updateDraggedNode()




    circ
      .transition()
      .duration(if @timesRendered++ is 0 then 0 else @transitionSpeed)
      .attr("cx", (d) => @graph.x d.x)
      .attr("cy", (d) => @graph.y d.y)
      .attr("r",
        (d) =>
          (if ("r" of d)
            d.r
          else
            (if d.dragged then @dotSize + 1 else @dotSize))
      )
      .attr("clip-path", "url(#scatter-clip)")
      .attr("class", (d, i) => [
        ("draggable-node" if @dragger),
        ("active" if d is @active), # apply active class for active element
        ("editable" if @utils.ourFunctor(@series.isEditable, d, i))# apply editable class for editable element
      ].join(' '))
      .attr("fill", (d) => (if d.dragged then 'white' else @series.color))
      .attr("stroke", (d) => (if d.dragged then @series.color else 'white'))
      .attr("stroke-width", @dotSize / 2 || 2)
    circ.style("cursor", "ns-resize") if @series.draggable

    circ.exit().remove()


    if @series.tooltip
      circ.tooltip (d, i) =>
        circleColor: @series.color
        graph: @graph
        text: @series.tooltip(d)
        circleOnHover: true
        #tooltipCircleContainer: @graph.vis.node()
        gravity: "right"

