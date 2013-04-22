class Tactile.AxisLinear
  constructor: (options) ->
    @options = options
    @graph = options.graph
    @options.axis ?= 'x'
    @horizontal = @options.axis == 'x'
    @ticksTreatment = options.ticksTreatment or "plain"
    @tickSize = options.tickSize or 2
    @ticks = options.ticks
    @tickFormat = options.tickFormat or (d) -> d
    @frame = options.frame

    @_setupForOrientation()

  render: (transition)->
    return unless @graph[@options.axis]?
    className = "#{@options.axis}-ticks"
    g = @graph.vis.selectAll('.' + className).data([0])
    g.enter().append("g").attr("class", [className, @ticksTreatment].join(" "))

    g.attr("transform", @translateString)

    axis = d3.svg.axis()
      .scale(@graph[@options.axis])
      .orient(@orientation)
      .tickFormat(@tickFormat)
      .ticks(@ticks)
      .tickSubdivide(0)
      .tickSize(@tickSize)

    transition.select('.' + className).call(axis)


  _setupForOrientation: ->
    pixelsPerTick = @options.pixelsPerTick or 75
    if @horizontal
      @orientation = 'bottom'
      @ticks ?= Math.floor(@graph.width() / pixelsPerTick)
      @translateString = "translate(0, #{@graph.height()})"
    else
      if @options.axis == 'y'
        @orientation = 'left'
        @translateString = "translate(0, 0)"
      else
        @orientation = 'right'
        @translateString = "translate(#{@graph.width()}, 0)"

      @ticks ?= Math.floor(@graph.height() / pixelsPerTick)

