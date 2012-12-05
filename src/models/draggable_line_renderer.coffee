Tactile.DraggableLineRenderer = class DraggableLineRenderer extends RendererBase
  name: "draggableLine"
  
  specificDefaults:
    unstack: true
    fill: false
    stroke: true
    dotSize: 5

  initialize: ->
    @afterDrag = @series.afterDrag || ->
    @dragged = @selected = null
    @_bindMouseEvents()

  seriesPathFactory: ->
    d3.svg.line()
    .x((d) => @graph.x d.x)
    .y((d) => @graph.y d.y)
    .interpolate(@graph.interpolation)
    .tension @tension


  render: ->
    super() # draws tha line chart
    
    return if @series.disabled
    nodes = @graph.vis.selectAll("path")
      .data(@series.stack)
      .enter()
      .append("svg:circle")
      .attr("cx", (d) => @graph.x d.x)
      .attr("cy", (d) => @graph.y d.y)
      .attr("r", (d) => (if ("r" of d) then d.r else (if d is @selected then @dotSize + 1 else @dotSize)))
      .attr("class",  (d) => (if d is @selected then "selected" else null))
      .attr("stroke", (d) => (if d is @selected then 'orange' else 'white'))
      .attr("stroke-width", '2')
      .style("cursor", "ns-resize")
      .on("mousedown.drag", @_datapointDrag)
      .on("touchstart.drag", @_datapointDrag)

    _.each nodes[0], (n) =>
      n?.setAttribute "fill", @series.color  
        
  _bindMouseEvents: =>
    d3.select(@graph.element)
      .on("mousemove.drag", @_mouseMove)
      .on("touchmove.drag", @_mouseMove)
      .on("mouseup.drag", @_mouseUp)
      .on("touchend.drag", @_mouseUp)
      
  _datapointDrag: (d) =>
    @selected = @dragged = d
    @update()

  _mouseMove: =>
    p = d3.svg.mouse(@graph.vis[0][0])
    t = d3.event.changedTouches
    if @dragged
      @dragged.y = @graph.y.invert(Math.max(0, Math.min(@graph.height, p[1])))
      @update()

  _mouseUp: =>
    @afterDrag(@dragged, @series.name) if @dragged
    $(@graph).find('.selected').attr('class', '')
    d3.select("body").style "cursor", "auto"
    d3.select("body").style "cursor", "auto"
    @dragged = null if @dragged

  update: =>
    @graph.update()