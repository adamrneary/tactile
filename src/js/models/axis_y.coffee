Tactile.AxisY = class AxisY
  berthRate: 0.10
  
  constructor: (options) ->
    @options = options
    @graph = options.graph
    @orientation = options.orientation or "right"
    pixelsPerTick = options.pixelsPerTick or 75
    @ticks = options.ticks or Math.floor(@graph.height / pixelsPerTick)
    @tickSize = options.tickSize or 4
    @ticksTreatment = options.ticksTreatment or "plain"
    @grid = options.grid
    
    if options.element
      @element = options.element
      @vis = d3.select(options.element).append("svg:svg").attr("class", "graph y-axis")
      @element = @vis[0][0]
      @element.style.position = "relative"
      @setSize
        width: options.width
        height: options.height
    else
      @vis = @graph.vis
      
    @graph.onUpdate =>
      @render()


  setSize: (options = {}) ->
    return unless @element
    if typeof window isnt "undefined"
      style = window.getComputedStyle(@element.parentNode, null)
      elementWidth = parseInt(style.getPropertyValue("width"))
      elementHeight = parseInt(style.getPropertyValue("height")) unless options.auto
    @width = options.width or elementWidth or @graph.width * berthRate
    @height = options.height or elementHeight or @graph.height
    @vis.attr("width", @width).attr "height", @height * (1 + @berthRate)
    berth = @height * @berthRate
    @element.style.top = -1 * berth + "px"

  render: ->
    @vis.selectAll('.y-ticks, .y-grid').remove()
    @setSize auto: true if @graph.height isnt @_renderHeight
    axis = d3.svg.axis().scale(@graph.y).orient(@orientation)
    
    axis.tickFormat @options.tickFormat or (y) ->
      y

    if @orientation is "left"
      berth = @height * @berthRate
      transform = "translate(" + @width + ", " + berth + ")"
    @vis.selectAll("*").remove() if @element
    
    @vis.append("svg:g")
    .attr("class", ["y-ticks", @ticksTreatment].join(" "))
    .attr("transform", transform).call axis.ticks(@ticks).tickSubdivide(0).tickSize(@tickSize)
    
    if @grid
      gridSize = ((if @orientation is "right" then 1 else -1)) * @graph.width
      @graph.vis.append("svg:g").attr("class", "y-grid").call axis.ticks(@ticks).tickSubdivide(0).tickSize(gridSize)
      
    @_renderHeight = @graph.height
