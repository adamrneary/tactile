Tactile.ScatterRenderer = class ScatterRenderer extends RendererBase
  name: "scatter"
  
  specificDefaults:
    fill: true
    stroke: false

  render: ->
    circ = @seriesCanvas().selectAll('circle')
      .data(@series.stack)
    
    #TODO: this block of code is the same in few places
    circ.enter()
      .append("svg:circle")
        .attr("cx", (d) => @graph.x d.x)
        .attr("cy", (d) => @graph.y d.y)
      
    circ.transition(200)
      .attr("cx", (d) => @graph.x d.x)
      .attr("cy", (d) => @graph.y d.y)
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
        displacement: [5, d.r - 5]

    circ.exit().remove()

    
    