class Tactile.AxisTime extends Tactile.AxisBase
  constructor: (options) ->
    @horizontal = true
    super
    @_checkOptions()

    @fixedTimeUnit = options.timeUnit
    @marginTop = options.paddingBottom or 5
    @time = new Tactile.FixturesTime()
    @grid = options.grid

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

    if unit.name is "month"
      domainMin = domain[0] - 86400000*3
      domainMax = domain[1] + 86400000*3
    else
      domainMin = domain[0]
      domainMax = domain[1]

    offsets = []

    runningTick = domainMin
    tickValue = @time.ceil(runningTick, unit)

    while tickValue <= domainMax
      offsets.push
        value: tickValue
        unit: unit

      runningTick = tickValue + unit.seconds / 2
      tickValue = @time.ceil(runningTick, unit)

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
          "translate(#{@graph.x(d.value)}, #{@graph.height() + @marginForBottomTicks})")

    ticks.exit().remove()

    @g.selectAll('g.x-tick').each((d, i)->
      text = d3.select(@).selectAll("text").data([d])
      text.enter()
        .append("text")
        .attr("class", "title")
#        .style("cursor", "ew-resize")
      text.exit().remove()
    )

#    @g.selectAll("text")
#      .on("mousedown.drag",  @_axisDrag)
#      .on("touchstart.drag", @_axisDrag)

    @g.selectAll("g.x-tick").selectAll("text")
      .attr("y", @marginTop)
      .text((d) ->
        d.unit.formatter(new Date(d.value)))

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

