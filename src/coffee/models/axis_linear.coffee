class Tactile.AxisLinear extends Tactile.AxisBase
  constructor: (options) ->
    options.axis ?= 'x'
    @horizontal = options.axis == 'x'
    super

    @_checkOptions()
    @tickSize = options.tickSize or 2
    @ticks = options.ticks
    @tickFormat = options.tickFormat or (d) -> d
    @tickValues = options.tickValues or null

    @showZeroLine = options.showZeroLine
    @zeroLineColor = options.zeroLineColor or "#231F20"
    @zeroLineWidth = options.zeroLineWidth or 1

    @_setupForOrientation()

  render: (transition) ->
    return unless @graph[@options.axis]?
    className = "#{@options.axis}-ticks"
    @g = @graph.vis.selectAll('.' + className).data([0])
    @g.enter().append("g").attr("class", [className, @ticksTreatment].join(" "))

    @g.attr("transform", @translateString)

    axis = d3.svg.axis()
      .scale(@graph[@options.axis])
      .orient(@orientation)
      .tickFormat(@tickFormat)
      .ticks(@ticks)
      .tickSubdivide(0)
      .tickSize(@tickSize)
      .tickValues(@tickValues);

    transition.select('.' + className).call(axis)

    @g.selectAll("text")
      .style("cursor", if @horizontal then "ew-resize" else "ns-resize")
      .on("mousedown.drag",  @_axisDrag)
      .on("touchstart.drag", @_axisDrag);

    # if needed add the zero line
    className = "#{@options.axis}-zero-line"
    @g_zero = @graph.vis.selectAll('.' + className).data([0])
    @g_zero.enter().append("g").attr("class", className)

    domain = @graph[@options.axis].domain()

    line = @g_zero.selectAll("line").data(if @showZeroLine and domain[0] < 0 and domain[1] > 0 then [0] else [])
    line.enter()
      .append("svg:line")

    line.exit().remove()

    transition.select('.' + className).selectAll("line")
      .attr("x1", (d) => if @horizontal then @graph[@options.axis](d) else 0)
      .attr("x2", (d) => if @horizontal then @graph[@options.axis](d) else @graph.width())
      .attr("y1", (d) => if @horizontal then 0 else @graph[@options.axis](d))
      .attr("y2", (d) => if @horizontal then @graph.height() else @graph[@options.axis](d))
      .attr("stroke", @zeroLineColor)
      .attr("stroke-width", @zeroLineWidth)

  _setupForOrientation: ->
    pixelsPerTick = @options.pixelsPerTick or 75
    if @horizontal
      @orientation = 'bottom'
      @ticks ?= Math.floor(@graph.width() / pixelsPerTick)
      @translateString = "translate(0, #{(@graph.height() + @marginForBottomTicks)})"
    else
      if @options.axis == 'y'
        @orientation = 'left'
        @translateString = "translate(-2, 0)"
      else
        @orientation = 'right'
        @translateString = "translate(#{@graph.width()}, 0)"

      @ticks ?= Math.floor(@graph.height() / pixelsPerTick)

  _checkOptions: =>
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

  destroy: ->
    super
    @g_zero.remove()

