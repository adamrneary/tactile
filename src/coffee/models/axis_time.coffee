class Tactile.AxisTime extends Tactile.AxisBase
  constructor: (options) ->
    @horizontal = true
    super

    @fixedTimeUnit = options.timeUnit
    @marginTop = options.paddingBottom or 5
    @time = new Tactile.FixturesTime()

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

  render: (transition) ->
    return unless @graph.x?

    # @g is the x-ticks (plural) canvas that will hold each x-tick item
    @g = @graph.vis.selectAll('g.x-ticks').data([0])
    @g.enter().append('g').attr('class', 'x-ticks')

    ticks = @g.selectAll('g.x-tick')
      .data(@tickOffsets(), (d) -> d.value)

    ticks
      .enter()
        .append('g')
        .attr("class", ["x-tick", @ticksTreatment].join(' '))
        .attr "transform", (d, i) =>
          "translate(#{@graph.x(d.value)}, #{@graph.height() + @marginForBottomTicks})"
    ticks.exit().remove()

    transition.selectAll(".x-tick")
      .attr "transform", (d, i) =>
        "translate(#{@graph.x(d.value)}, #{@graph.height() + @marginForBottomTicks})"

    @g.selectAll('g.x-tick').each((d, i)->
      text = d3.select(@).selectAll("text").data([d])
      text.enter()
        .append("text")
        .attr("class", "title")
      text.exit().remove()
    )

    @g.selectAll("g.x-tick").selectAll("text")
      .attr("y", @marginTop)
      .text((d) ->
        d.unit.formatter(new Date(d.value)))