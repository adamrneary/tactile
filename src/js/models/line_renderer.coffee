Tactile.LineRenderer = class LineRenderer extends RendererBase
  name: "line"
  dotSize: 5
  
  specificDefaults:
    unstack: true
    fill: false
    stroke: true

  seriesPathFactory: ->
    d3.svg.line()
    .x((d) => @graph.x d.x)
    .y((d) => @graph.y d.y)
    .interpolate(@graph.interpolation)
    .tension @tension

  render: ->
    super()

    circ = @seriesCanvas().selectAll('circle')
      .data(@series.stack)
      
    #TODO: this block of code is the same in few places  
    circ.enter()
      .append("svg:circle")
        .attr("clip-path","url(#scatter-clip)")
        .attr("cx", (d) => @graph.x d.x)
        .attr("cy", (d) => @graph.y d.y)
      
    circ.transition(200)
      .attr("cx", (d) => @graph.x d.x)
      .attr("cy", (d) => @graph.y d.y)
      .attr("r", (d) => (if ("r" of d) then d.r else @dotSize))
      .attr("fill", @series.color)
      .attr("stroke", 'white')
      .attr("stroke-width", '2')

    circ.exit().remove()
