Tactile.DraggableLineRenderer = class DraggableLineRenderer extends RendererBase
  name: "draggableLine"
  
  specificDefaults:
    unstack: true
    fill: false
    stroke: true
    dotSize: 5

  initialize: ->
    @afterDrag = @series.afterDrag || ->
    @onDrag = @series.onDrag || ->
    @dragged = @selected = null
    @_bindMouseEvents()
    @power = Math.pow(10,@series.sigfigs)

  seriesPathFactory: ->
    d3.svg.line()
    .x((d) => @graph.x d.x)
    .y((d) => @graph.y d.y)
    .interpolate(@graph.interpolation)
    .tension @tension


  render: ->
    super() # draws the line chart
    
    return if @series.disabled

    nodes = @graph.vis.selectAll("circle").data(@series.stack)
        
    nodes.enter().append("svg:circle")
          .attr("stroke-width", '2')
          .style("cursor", "ns-resize")
          .on("mousedown.drag", @_datapointDrag)
          .on("touchstart.drag", @_datapointDrag)

    nodes.attr("cx", (d) => @graph.x d.x)
          .attr("cy", (d) => @graph.y d.y)
          .attr("r", (d) => (if ("r" of d) then d.r else (if d is @selected then @dotSize + 1 else @dotSize)))
          .attr("class",  (d) => (if d is @selected then "selected" else null))
          .attr("stroke", (d) => (if d is @selected then 'orange' else 'white'))
      
    _.each nodes[0], (n) =>
      n?.setAttribute "fill", @series.color  

    if @dragged and @dragged.y
      nodes.filter((d,i)=> i is @dragged.i)
        .each((d)=>
          console.log(d)
          d.y = @dragged.y)

        
  _bindMouseEvents: =>
    d3.select(@graph.element)
      .on("mousemove.drag", @_mouseMove)
      .on("touchmove.drag", @_mouseMove)
      .on("mouseup.drag", @_mouseUp)
      .on("touchend.drag", @_mouseUp)
      
  _datapointDrag: (d,i) =>    
    @selected = @dragged = {d: d, i:i}
    @update()

  _mouseMove: =>
    p = d3.svg.mouse(@graph.vis[0][0])
    t = d3.event.changedTouches
    if @dragged
      inverted = @graph.y.invert(Math.max(0, Math.min(@graph.height, p[1])))
      @dragged.y = Math.round(inverted*@power)/@power
      @onDrag(@dragged, @series, @graph);
      @update()

  _mouseUp: =>
    @afterDrag(@dragged.d,@dragged.y,@dragged.i, @series,@graph) if @dragged
    $(@graph).find('.selected').attr('class', '')
    d3.select("body").style "cursor", "auto"
    d3.select("body").style "cursor", "auto"
    @dragged = null if @dragged
    @update()

  update: =>
    @graph.update()
    @render()