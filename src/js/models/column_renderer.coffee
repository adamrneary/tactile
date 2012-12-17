Tactile.ColumnRenderer = class ColumnRenderer extends RendererBase
  name: "column"

  specificDefaults:
    gapSize: 0.15
    tension: null
    round: true
    unstack: true

  render: ->
    return if (@series.disabled)

    nodes = @seriesCanvas().selectAll("rect").data(@series.stack)
    
    nodes.enter()
      .append("svg:rect")
      
    nodes.attr("x", (d) => @_barX(@graph.x(d.x), @_seriesBarWidth()))
      .attr("y", @_barY)
      .attr("width", @_seriesBarWidth())
      .attr("height", (d) => @graph.y.magnitude Math.abs(d.y))
      .attr("transform", @_transformMatrix)
      .attr("class", "bar #{if @series.color then '' else 'colorless'}")
      .attr("fill", @series.color)
      .attr("stroke", 'white')
      .attr("rx", @_edgeRatio)
      .attr("ry", @_edgeRatio)
      
    #nodes.attr("data-original-title", (d) => @series.tooltip(d)) if @series.tooltip
    
  barWidth: ->
    @graph.stackData()
    data = @series.stack
    
    count = data.length
    barWidth = @graph.width / count * (1 - @gapSize)

  initialize: (options = {}) ->
    @gapSize = options.gapSize || @gapSize
    
  stackTransition: ->
    @unstack = false
    @graph.discoverRange(@)
    count = @series.stack.length
    
    nodes = @seriesCanvas().selectAll("rect").data(@series.stack)
    
    nodes.enter()
      .append("svg:rect")
      
    slideTransition = =>
      @seriesCanvas().selectAll("rect")
        .transition()
        .duration(500)
        .attr("width", @_seriesBarWidth())
        .attr("x", (d) => @_barX(@graph.x(d.x), @_seriesBarWidth()))
    
    @seriesCanvas().selectAll("rect")
      .transition()
      .duration(500)
      .delay((d, i) -> (i % count) * 10)
      .attr("y", @_barY)
      .attr("height", (d) => @graph.y.magnitude Math.abs(d.y))
      .each('end', slideTransition)
    
    @graph.updateCallbacks.forEach (callback) ->
      callback()
    
  unstackTransition: ->
    @unstack = true
    @graph.discoverRange(@)
    count = @series.stack.length
    
    growTransition = =>
      @seriesCanvas().selectAll("rect")
        .transition()
        .duration(500)
        .attr("height", (d) => @graph.y.magnitude Math.abs(d.y))
        .attr("y", @_barY)
    
    @seriesCanvas().selectAll("rect")
      .transition()
      .duration(500)
      .delay((d, i) -> (i % count) * 10)
      .attr("x", (d) => @_barX(@graph.x(d.x), @_seriesBarWidth()))
      .attr("width", @_seriesBarWidth())
      .each('end', growTransition)
      
    @graph.updateCallbacks.forEach (callback) ->
      callback()
    
    
  _transformMatrix: (d) =>
    # A matrix transform for handling negative values
    matrix = [1, 0, 0, ((if d.y < 0 then -1 else 1)), 0, ((if d.y < 0 then @graph.y.magnitude(Math.abs(d.y)) * 2 else 0))]
    "matrix(" + matrix.join(",") + ")"
  
  _edgeRatio: =>
    if @series.round then Math.round(0.05783 * @_seriesBarWidth() + 1) else 0
    
  _seriesBarWidth: =>
    barWidth = @barWidth()
    activeSeriesCount = @graph.series.filter((s) -> not s.disabled).length
    seriesBarWidth = if @unstack and not @series.wide then (barWidth / activeSeriesCount) else barWidth
    
  _barX: (x, seriesBarWidth) ->
    # center the bar around the value it represents
    barXOffset = - seriesBarWidth / 2  
    initialX = x + barXOffset
    
    if @unstack
      initialX + (@_columnRendererIndex() * seriesBarWidth)
    else
      return initialX 
    
  _barY: (d) =>
    # if we want to display stacked bars y should be added y0 value  
    if @unstack
      @graph.y(Math.abs(d.y)) * (if d.y < 0 then -1 else 1)
    else
      @graph.y(d.y0 + Math.abs(d.y)) * (if d.y < 0 then -1 else 1)
    
  # Returns the index of this column renderer
  # For example: if this is the third renderer of the column type it will have index equal to 2
  _columnRendererIndex: ->
    return 0 if @rendererIndex == 0 || @rendererIndex is undefined
    renderers = @graph.renderers.slice(0, @rendererIndex)
    _.filter(renderers, (r) => r.name == @name).length