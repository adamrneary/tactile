class Tactile.AxisTime
  constructor: (options) ->
    @utils = new Tactile.Utils()
    @options = options
    @_checkOptions()

    @graph = options.graph
    @ticksTreatment = options.ticksTreatment or "plain"
    @fixedTimeUnit = options.timeUnit
    @marginTop = options.paddingBottom or 5
    @time = new Tactile.FixturesTime()
    @grid = options.grid
    @frame = options.frame

  appropriateTimeUnit: ->
    unit = undefined
    units = @time.units
    domain = @graph.x.domain()
    rangeSeconds = domain[1] - domain[0]
    units.forEach (u) ->
      unit = unit or u if Math.floor(rangeSeconds / u.seconds) >= 2

    unit or @time.units[@time.units.length - 1]

  tickOffsets: ->
    domain = @graph.x.domain()
    unit = @fixedTimeUnit or @appropriateTimeUnit()
    count = Math.ceil((domain[1] - domain[0]) / unit.seconds)
    runningTick = domain[0]
    offsets = []
    i = 0

    while i <= count
      tickValue = @time.ceil(runningTick, unit)
      runningTick = tickValue + unit.seconds / 2
      offsets.push
        value: tickValue
        unit: unit

      i++
    offsets

  render: (transition)->
    return unless @graph.x?
    @g = @graph.vis.selectAll('.x-ticks').data([0])
    @g.enter().append('g').attr('class', 'x-ticks')

    tickData = @tickOffsets().filter((tick) =>
      @graph.x.range()[0] <= @graph.x(tick.value) <= @graph.x.range()[1])

    ticks = @g.selectAll('g.x-tick')
      .data(@tickOffsets(), (d) -> d.value)

    ticks.enter()
      .append('g')
      .attr("class", ["x-tick", @ticksTreatment].join(' '))
      .attr("transform",
        (d) =>
          "translate(#{@graph.x(d.value)}, #{@graph.marginedHeight})")
      .append('text')
      .attr("y", @marginTop)
      .text((d) -> d.unit.formatter(new Date(d.value * 1000)))
      .attr("class", 'title')
      .style("cursor", "ew-resize")
      .on("mousedown.drag",  @_axisDrag)
      .on("touchstart.drag", @_axisDrag);


    ticks
      .attr("transform",
        (d) =>
          "translate(#{@graph.x(d.value)}, #{@graph.marginedHeight})")

    ticks.exit().remove()

  destroy: ->
    @g.remove()
    delete @graph.axesList[@options.axis]

  _checkOptions: ()=>
    if @options.ticksTreatment?
      @utils.checkString(@options.ticksTreatment, "AxisTime options.ticksTreatment")

    if @options.timeUnit?
      @utils.checkNumber(@options.timeUnit, "AxisTime options.timeUnit")

    if @options.paddingBottom?
      @utils.checkNumber(@options.paddingBottom, "AxisTime options.paddingBottom")

    if @options.frame?
      if @utils.checkArray(@options.frame, "AxisTime options.frame")
        @options.frame.forEach((d, i)=>
          @utils.checkNumber(d, "AxisTime options.frame[#{i}]") if d?
        )

  _axisDrag: ()=>
    p = d3.svg.mouse(@graph.svg.node())
    @down = @graph.x.invert(p[0])
    d3.event.preventDefault()
    d3.event.stopPropagation()

  _mouseMove: =>
    return if isNaN(@down)
    p = d3.svg.mouse(@graph.svg.node())
    d3.select("body").style("cursor", "ew-resize")
    axis = @graph.x

    rup = axis.invert(p[0])
    axis1 = axis.domain()[0]
    axis2 = axis.domain()[1]
    extent = axis2 - axis1

    if rup isnt 0
      change = @down / rup
      new_domain = [axis1, axis1 + (extent * change)]
      axis.domain(new_domain);

    @graph.render(0)

    d3.event.preventDefault()
    d3.event.stopPropagation()

  _mouseUp: =>
    return if isNaN(@down)
    @down = Math.NaN;
    d3.event.preventDefault()
    d3.event.stopPropagation()