class Tactile.ScatterRenderer extends Tactile.RendererBase
  name: "scatter"

  specificDefaults:
    fill: true
    stroke: false

  render: (transition, recalculateData, transitionSpeed) ->
    @_checkData() if @checkData
    @transition = transition if transition
    circ = @seriesCanvas().selectAll('circle')
      .data(@series.stack)

    circ.enter()
      .append("svg:circle")

    @transition.selectAll(".#{@_nameToId()} circle")
      .filter((d) => @_filterNaNs(d, 'x', 'y', 'r'))
      .attr("r", (d) => (if ("r" of d) then d.r else @dotSize))
      .attr("cx", (d) => @graph.x d.x)
      .attr("cy", (d) => @yFunction() d.y)
      .attr("r", (d) => (if ("r" of d) then d.r else @dotSize))
      .attr("fill", @series.color)
      .attr("stroke", 'white')
      .attr("stroke-width", '2')

    if @series.cssConditions
      circ.attr('class', (d) => @series.cssConditions(d))

    if @series.tooltip
      @seriesCanvas().selectAll("circle").tooltip (d,i) =>
        graph: @graph
        text: @series.tooltip(d)
        mousemove: true
        gravity: "right"
        displacement: [-10, 0]# because tooltip have left margin 10
    circ.exit().remove()

  _checkData: ()=>
    data = @series.stack
    data.forEach((d, i) =>
      @utils.checkNumber(d.x, "#{@name} renderer data[#{i}].x")
      @utils.checkNumber(d.y, "#{@name} renderer data[#{i}].y")
      @utils.checkNumber(d.r, "#{@name} renderer data[#{i}].r")
    )
