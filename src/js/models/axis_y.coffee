Tactile.AxisY = class AxisY
  constructor: (options) ->
    @options = options
    @graph = options.graph
    @vis = @graph.vis
    @orientation = options.orientation or "left"
    pixelsPerTick = options.pixelsPerTick or 75
    @ticks = options.ticks or Math.floor(@graph.height / pixelsPerTick)
    @tickSize = options.tickSize or 4
    @ticksTreatment = options.ticksTreatment or "plain"
    @grid = options.grid
    
    @graph.onUpdate =>
      @render()

  render: ->
    @vis.selectAll('.y-ticks, .y-grid').remove()
    axis = d3.svg.axis().scale(@graph.y).orient(@orientation)
    
    axis.tickFormat @options.tickFormat or (y) -> y
    
    
    # A workaround to hide any elements that are drawn outside of the inner canvas
    # which happens if bars are drawned on the center of a point
    if @orientation is "left"
      @vis.append('rect')
        .attr('height', @graph.height)
        .attr('width', 100)
        .attr('class', 'clipping-mask')
        .attr("transform", "translate(-100, 0)")
        .attr('fill', 'white')
    
    g = @vis.append("g")
      .attr("class", ["y-ticks", @ticksTreatment].join(" "))
    yAxis = axis.ticks(@ticks).tickSubdivide(0).tickSize(@tickSize)
    g.call yAxis
    
    if @grid
      gridSize = ((if @orientation is "right" then 1 else -1)) * @graph.width
      @graph.vis.append("svg:g").attr("class", "y-grid").call axis.ticks(@ticks).tickSubdivide(0).tickSize(gridSize)
      
    @_renderHeight = @graph.height
