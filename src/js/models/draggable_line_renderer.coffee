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
    @dragged = null
    @_bindMouseEvents()
    @power = Math.pow(10, @series.sigfigs)

  seriesPathFactory: ->
    d3.svg.line()
    .x((d) => @graph.x d.x)
    .y((d) => @graph.y d.y)
    .interpolate(@graph.interpolation)
    .tension @tension


  render: ->
    super() # draws the line chart
    
    return if @series.disabled
    nodes = @seriesCanvas()
      .selectAll("circle")
      .data(@series.stack)
        
    nodes.enter().append("svg:circle")
      .on("mousedown.drag", @_datapointDrag)
      .on("touchstart.drag", @_datapointDrag)
      
    nodes.attr("cx", (d) => @graph.x d.x)
      .attr("cy", (d) => @graph.y d.y)
      .attr("r", (d) => (if ("r" of d) then d.r else (if d.dragged then @dotSize + 1 else @dotSize)))
      .attr("class", (d) => ["draggable-node", (if d.dragged then "selected" else null)].join(' '))
      .style("cursor", "ns-resize")
      .attr("stroke", (d) => (if d.dragged then 'orange' else 'white'))
      .attr("stroke-width", '2')
    

    if @series.tooltip
      nodes.tooltip (d,i) =>
        text: @series.tooltip(d)
        placement: "mouse"
        position: [d.x,d.y]
        mousemove: true
        gravity: "top"
        displacement: [-@series.tooltip(d).length*3.5,-45]

    
    _.each nodes[0], (n) =>
      n?.setAttribute "fill", @series.color  


    if @dragged?.y?
      
      nodes
        .filter((d,i) => i is @dragged.i)
        .each (d) =>
          d.y = @dragged.y
          d.dragged = true

  _bindMouseEvents: =>
    d3.select(@graph.element)
      .on("mousemove.drag", @_mouseMove)
      .on("touchmove.drag", @_mouseMove)
      .on("mouseup.drag", @_mouseUp)
      .on("touchend.drag", @_mouseUp)
      
  _datapointDrag: (d,i) =>    
    @dragged = {d: d, i:i}
    @update()

  _mouseMove: =>
    p = d3.svg.mouse(@graph.vis[0][0])
    t = d3.event.changedTouches
    if @dragged
      inverted = @graph.y.invert(Math.max(0, Math.min(@graph.height, p[1])))
      value = Math.round(inverted * @power) / @power
      @dragged.y = value
      @onDrag(@dragged, @series, @graph);
      @update()

  _mouseUp: =>    
    return unless @dragged?.y?
    @afterDrag(@dragged.d, @dragged.y, @dragged.i, @series, @graph) if @dragged
    $(@graph).find('.selected').attr('class', '')
    d3.select("body").style "cursor", "auto"
    d3.select("body").style "cursor", "auto"
    @dragged = null if @dragged
    @update()

  update: =>
    @graph.update()
    @render()
