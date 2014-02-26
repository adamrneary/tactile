class Tactile.AxisTime extends Tactile.AxisBase
  constructor: (options = {}) ->
    @horizontal = true
    super(options)

    @fixedTimeUnit = options.timeUnit
    @marginTop = options.paddingBottom or 5
    @time = new Tactile.FixturesTime()
    @grid = options.grid
    @tickSize = options.tickSize or 2
    @tickValues = options.tickValues or null
    @tickFormat = options.tickFormat or (d) -> @appropriateTimeUnit().formatter(new Date(d))
    @tickFormat = options.tickFormat or null

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

  render: (originalTransition) ->
    return unless @graph.x?

    domain = @graph.x.domain()
    @transition = originalTransition if originalTransition

    @g = @graph.vis.selectAll('g.x-ticks').data([0])
    @g.enter().append('g').attr('class', 'x-ticks')

    ticks = @g.selectAll('g.x-tick')
      .data(@aggLabels)

    ticks.enter()
      .append('g')
      .attr("class", ["x-tick", @ticksTreatment].join(' '))
      .attr "transform", (d, i) =>
        "translate(#{@graph.outerWidth*1.1}, #{@graph.height() + @marginForBottomTicks})"

    @transition.selectAll(".x-tick")
      .attr("transform", (d, i) =>
        "translate(#{@graph.x(d.value)}, #{@graph.height() + @marginForBottomTicks})")
    .each "end", (d) ->
        ticks.exit().remove()

    @g.selectAll('g.x-tick').each((d, i)->
      text = d3.select(@).selectAll("text").data([d])
      text.enter()
        .append("text")
        .attr("class", "title")
      text.exit().remove()
    )

    text = @g.selectAll("g.x-tick").selectAll("text")
    text.attr("y", @marginTop)
      .text((d) ->
        if domain[1] < d.value or d.value < domain[0]
          ""
        else
          d.label
      )

  _tickX: (value, index) ->
    width = @graph.width()
    count = _.filter(@aggLabels, (item) =>
      @graph.x.domain()[0] <= item.value <= @graph.x.domain()[1]
    ).length
    offset = _.filter(@aggLabels, (item) =>
      item.value < @graph.x.domain()[0]
    ).length

    (index - offset) * (width / count) + (width / count) / 2