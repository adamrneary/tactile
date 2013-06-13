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

    @g = @graph.vis.selectAll('g.x-ticks').data([0])
    @g.enter().append('g').attr('class', 'x-ticks')


    ticks = @g.selectAll('g.x-tick')
      .data(@tickOffsets())

    ticks.enter()
      .append('g')
      .attr("class", ["x-tick", @ticksTreatment].join(' '))

    ticks
      .attr("transform",
        (d) =>
          "translate(#{@graph.x(d.value)}, #{@graph.marginedHeight})")

    ticks.exit().remove()

    @g.selectAll('g.x-tick').each((d, i)->
      text = d3.select(@).selectAll("text").data([d])
      text.enter()
        .append("text")
        .attr("class", "title")
        .style("cursor", "ew-resize")
      text.exit().remove()
    )

    @g.selectAll("text")
      .on("mousedown.drag",  @_axisDrag)
      .on("touchstart.drag", @_axisDrag)

    @g.selectAll("g.x-tick").selectAll("text")
      .attr("y", @marginTop)
      .text((d) ->
        d.unit.formatter(new Date(d.value)))

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

    if rup - axis1 isnt 0
      new_domain = [axis1, axis1 + extent*(@down - axis1)/(rup - axis1)]
      axis.domain(new_domain)

    @graph.render(0, zooming: true)

    d3.event.preventDefault()
    d3.event.stopPropagation()

  _mouseUp: =>
    return if isNaN(@down)
    @down = Math.NaN;
    @graph.manipulateCallbacks.forEach (callback) ->
      callback()
    d3.event.preventDefault()
    d3.event.stopPropagation()