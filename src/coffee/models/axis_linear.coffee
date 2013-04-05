Tactile.AxisLinear = class AxisLinear
  constructor: (options) ->
    @options = options
    @graph = options.graph
    @options.axis ?= 'x'
    @horizontal = (@options.axis == 'x')
    pixelsPerTick = options.pixelsPerTick or 75
    @ticksTreatment = options.ticksTreatment or "plain"
    @tickSize = options.tickSize or 4
    @ticks = options.ticks
    @tickFormat = options.tickFormat or (d) -> d
    @frame = options.frame
    if @horizontal
      @orientation = 'bottom'
      @ticks ?= Math.floor(@graph.width() / pixelsPerTick)
    else
      @orientation = 'left'
      @ticks ?= Math.floor(@graph.height() / pixelsPerTick)



  render: (transition)->
    return unless @graph[@options.axis]?
    className = "#{@options.axis}-ticks"
    g = @graph.vis.selectAll('.' + className).data([0])
    g.enter().append("g").attr("class", [className, @ticksTreatment].join(" "))
    if @horizontal
      g.attr("transform", "translate(0, #{@graph.height()})")

    axis = d3.svg.axis().scale(@graph[@options.axis]).orient(@orientation)

    axis.tickFormat @tickFormat


    xAxis = axis.ticks(@ticks).tickSubdivide(0).tickSize(@tickSize)


    transition.select('.' + className).call(xAxis)

