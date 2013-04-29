class Tactile.AxisLinear
  constructor: (options) ->
    @utils = new Tactile.Utils()
    @options = options
    @_checkOptions()

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

  _checkOptions: ()=>
    if @options.ticksTreatment?
      @utils.checkString(@options.ticksTreatment, "AxisLinear options.ticksTreatment")

    if @options.tickSize?
      @utils.checkNumber(@options.tickSize, "AxisLinear options.tickSize")

    if @options.tickFormat?
      @utils.checkFunction(@options.tickFormat, "AxisLinear options.tickFormat")

    if @options.frame?
      if @utils.checkArray(@options.frame, "AxisLinear options.frame")
        @options.frame.forEach((d, i)=>
          @utils.checkNumber(d, "AxisLinear options.frame[#{i}]") if d?
        )