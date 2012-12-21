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
    @dragger = new Dragger(renderer: @, render: @render) if @series.draggable
    @timesRendered = 0

  render: =>
    super()
    circ = @seriesCanvas().selectAll('circle')
      .data(@series.stack)

    newCircs = circ.enter().append("svg:circle")

    @dragger?.makeHandlers(newCircs)

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

    @dragger?.updateDraggedNode(circ)

    if @series.tooltip
      circ.tooltip (d, i) =>
        circleColor: @series.color
        graph: @graph
        text: @series.tooltip(d)
        circleOnHover: true
        tooltipCircleContainer: @graph.vis.node()
        gravity: "right"

