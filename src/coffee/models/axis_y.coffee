Tactile.AxisY = class AxisY
  constructor: (options) ->
    @options = options
    @graph = options.graph
    @orientation = options.orientation or "left"
    pixelsPerTick = options.pixelsPerTick or 75
    @ticks = options.ticks or Math.floor(@graph.height() / pixelsPerTick)
    @tickSize = options.tickSize or 4
    @ticksTreatment = options.ticksTreatment or "plain"
    @grid = options.grid
    
    @graph.onUpdate =>
      @render()

  render: ->
    return unless @graph.y?
    y = @graph.vis.selectAll('.y-ticks').data([0])
    y.enter().append("g").attr("class", ["y-ticks", @ticksTreatment].join(" "))
    
    axis = d3.svg.axis().scale(@graph.y).orient(@orientation)
    
    axis.tickFormat @options.tickFormat or (y) -> y
    
      
    yAxis = axis.ticks(@ticks).tickSubdivide(0).tickSize(@tickSize)
    
    y.transition().duration(@graph.transitionSpeed).call(yAxis)

    #This should work. Untested though.
    if @grid
      console.log("grid")
      gridSize = ((if @orientation is "right" then 1 else -1)) * @graph.width()
      grid = @graph.vis.selectAll('.y-grid').data([0])
      grid.enter().append("svg:g").attr("class", "y-grid")
      grid.transition()
        .call(axis.ticks(@ticks).tickSubdivide(0).tickSize(gridSize))
      
    @_renderHeight = @graph.height()
