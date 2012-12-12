Tactile.AreaRenderer = class AreaRenderer extends RendererBase
  name: "area"
  dotSize: 5
  
  specificDefaults:
    unstack: true
    fill: false
    stroke: true
    
  seriesPathFactory: ->
    d3.svg.area()
    .x((d) => @graph.x d.x)
    .y0((d) => @graph.y d.y0)
    .y1((d) => @graph.y d.y + d.y0)
    .interpolate(@graph.interpolation)
    .tension @tension
    

  render: ->
    super()
    @graph.vis.selectAll("circle").data(@series.stack)
      .enter()
      .append("svg:circle")
      .attr("cx", (d) => @graph.x d.x)
      .attr("cy", (d) => @graph.y d.y)
      .attr("r", (d) => (if ("r" of d) then d.r else @dotSize))
      .attr("stroke", 'white')
      .attr("stroke-width", '2')
      
    @graph.vis.selectAll("path").data([@series.stack])  
      .attr('fill', @series.color)
      .attr("class", 'area');