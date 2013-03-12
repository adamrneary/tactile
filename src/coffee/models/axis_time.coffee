Tactile.AxisTime = class AxisTime

  constructor: (args) ->
    @graph = args.graph
    @ticksTreatment = args.ticksTreatment or "plain"
    @fixedTimeUnit = args.timeUnit
    @marginTop = args.paddingBottom or 5
    @time = new FixturesTime()
    @grid = args.grid
    @graph.onUpdate =>
      @render()

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

  render: ->
    return unless @graph.x?
    g = @graph.vis.selectAll('.x-ticks').data([0])
    g.enter().append('g').attr('class', 'x-ticks')
                
    tickData = @tickOffsets().filter((tick) =>
      @graph.x.range()[0] <= @graph.x(tick.value) <= @graph.x.range()[1])

    ticks = g.selectAll('g.x-tick')
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

    ticks
      .attr("transform",
        (d) =>
          "translate(#{@graph.x(d.value)}, #{@graph.marginedHeight})")

    ticks.exit().remove()


  
