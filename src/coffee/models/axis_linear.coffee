Tactile.AxisLinear = class AxisLinear
  constructor: (options) ->
    @options = options
    @graph = options.graph
    @options.axis ?= 'x'
    @horizontal = @options.axis == 'x'
    @ticksTreatment = options.ticksTreatment or "plain"
    @tickSize = options.tickSize or 4
    @ticks = options.ticks
    @tickFormat = options.tickFormat or (d) -> d
    @frame = options.frame

    @_setOrientation()

  render: (transition)->
    return unless @graph[@options.axis]?
    className = "#{@options.axis}-ticks"
    g = @graph.vis.selectAll('.' + className).data([0])
    console.log className
    g.enter().append("g").attr("class", [className, @ticksTreatment].join(" "))
    if @horizontal
      g.attr("transform", "translate(0, #{@graph.height()})")

    axis = d3.svg.axis().scale(@graph[@options.axis]).orient(@orientation)

    xAxis = axis
      .tickFormat(@tickFormat)
      .ticks(@ticks)
      .tickSubdivide(0)
      .tickSize(@tickSize)

    transition.select('.' + className).call(xAxis)


  _setOrientation: ->
    pixelsPerTick = @options.pixelsPerTick or 75
    if @horizontal
      @orientation = 'bottom'
      @ticks ?= Math.floor(@graph.width() / pixelsPerTick)
    else
      @orientation = 'left'
      @ticks ?= Math.floor(@graph.height() / pixelsPerTick)

