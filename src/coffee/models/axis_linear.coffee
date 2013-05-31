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

    @down = Math.NaN

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

    transition.select('.' + className).call(axis)

    @g.selectAll("text")
      .style("cursor", if @horizontal then "ew-resize" else "ns-resize")
      .on("mousedown.drag",  @_axisDrag)
      .on("touchstart.drag", @_axisDrag);

  destroy: ->
    @g.remove()
    delete @graph.axesList[@options.axis]

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

  _axisDrag: =>
    p = d3.svg.mouse(@graph.svg.node())
    @down = if @horizontal then @graph[@options.axis].invert(p[0]) else @graph[@options.axis].invert(p[1])
    d3.event.preventDefault()
    d3.event.stopPropagation()

  _mouseMove: =>
    return if isNaN(@down)
    p = d3.svg.mouse(@graph.svg.node())
    d3.select("body").style("cursor", if @horizontal then "ew-resize" else "ns-resize")
    axis = @graph[@options.axis]

    rup = axis.invert(if @horizontal then p[0] else p[1])
    axis1 = axis.domain()[0]
    axis2 = axis.domain()[1]
    extent = axis2 - axis1

    if rup - axis1 isnt 0
      change = @down / rup
      new_domain = [axis1, axis1 + (extent * change)]
      new_domain = [axis1, axis1 + extent*(@down - axis1)/(rup - axis1)]
      axis.domain(new_domain);

    @graph.render(0)

    d3.event.preventDefault()
    d3.event.stopPropagation()

  _mouseUp: =>
    return if isNaN(@down)
    @down = Math.NaN;
    @graph.manipulateCallbacks.forEach (callback) ->
      callback()
    d3.event.preventDefault()
    d3.event.stopPropagation()