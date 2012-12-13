Tactile.AreaRenderer = class AreaRenderer extends RendererBase
  name: "area"
  dotSize: 5
  
  specificDefaults:
    unstack: true
    fill: true
    stroke: true
    
  _y0: (d) => if @unstack then 0 else d.y0  
    
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
    @seriesCanvas().selectAll('path').style("opacity", 0.3)
    
    @seriesCanvas().selectAll('path.stroke')
      .data([@series.stack]).enter()
      .append("svg:path")
      .attr('fill', 'none')
      .attr("stroke-width", '2')
      .attr("stroke", @series.color)
      .attr("d", @seriesStrokeFactory())
      
    @seriesCanvas().selectAll('circle')
      .data(@series.stack)
      .enter()
      .append("svg:circle")
      .attr("cx", (d) => @graph.x d.x)
      .attr("cy", (d) => @graph.y d.y)
      .attr("r", (d) => (if ("r" of d) then d.r else @dotSize))
      .attr("fill", @series.color)
      .attr("stroke", 'white')
      .attr("stroke-width", '2')