Tactile.ColumnRenderer = class ColumnRenderer extends RendererBase
  name: "column"

  specificDefaults:
    gapSize: 0.15
    tension: null
    round: true
    unstack: true

  render: ->
    barWidth = @barWidth()
    activeSeriesCount = @graph.series.filter((s) -> not s.disabled).length
    seriesBarWidth = if @unstack and not @series.wide then (barWidth / activeSeriesCount) else barWidth

    transform = (d) ->
      # add a matrix transform for negative values
      matrix = [1, 0, 0, ((if d.y < 0 then -1 else 1)), 0, ((if d.y < 0 then @graph.y.magnitude(Math.abs(d.y)) * 2 else 0))]
      "matrix(" + matrix.join(",") + ")"
  
    return if (@series.disabled)

    edgeRatio = if @series.round then Math.round(0.05783 * seriesBarWidth + 1) else 0
      
    # if we want to display stacked bars y should be added y0 value  
    yValue = (d) =>
      if @unstack
        (@graph.y(Math.abs(d.y))) * ((if d.y < 0 then -1 else 1))
      else
        (@graph.y(d.y0 + Math.abs(d.y))) * ((if d.y < 0 then -1 else 1))
        
    nodes = @seriesCanvas().selectAll("rect").data(@series.stack)
    
    nodes.enter()
      .append("svg:rect")
      
    nodes.attr("x", (d) => @_barX(@graph.x(d.x), seriesBarWidth))
      .attr("y", yValue)
      .attr("width", seriesBarWidth)
      .attr("height", (d) => @graph.y.magnitude Math.abs(d.y))
      .attr("transform", transform)
      .attr("class", "bar #{if @series.color then '' else 'colorless'}")
      .attr("fill", @series.color)
      .attr("stroke", 'white')
      .attr("rx", edgeRatio)
      .attr("ry", edgeRatio)
      
    #nodes.attr("data-original-title", (d) => @series.tooltip(d)) if @series.tooltip

    Tactile.ColumnRenderer.NEXT_SERIES_OFFSET += seriesBarWidth if @unstack
    
  _barX: (x, seriesBarWidth) ->
    # center the bar around the value it represents
    barXOffset = - seriesBarWidth / 2  
    initialX = x + barXOffset
    
    if @unstack
      initialX + (@_columnRendererIndex() * seriesBarWidth)
    else
      return initialX 
    
  # Returns the index of this column renderer
  # For example: if this is the third renderer of the column type it will have index equal to 2
  _columnRendererIndex: ->
    return 0 if @rendererIndex == 0 || @rendererIndex is undefined
    renderers = @graph.renderers.slice(0, @rendererIndex)
    _.filter(renderers, (r) => r.name == @name).length


  barWidth: ->
    @graph.stackData()
    data = @series.stack
    
    count = data.length
    barWidth = @graph.width / count * (1 - @gapSize)

  initialize: (options = {}) ->
    @gapSize = options.gapSize || @gapSize
    