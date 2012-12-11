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

    while i < count
      tickValue = @time.ceil(runningTick, unit)
      runningTick = tickValue + unit.seconds / 2
      offsets.push
        value: tickValue
        unit: unit

      i++
    offsets

  render: ->
    @graph.vis.selectAll('.x-tick').remove()
    offsets = @tickOffsets()
    g = @graph.vis.append('g')
      .attr('class', 'x-ticks')
    offsets.forEach (o) =>
      return if @graph.x(o.value) > @graph.x.range()[1]
      g.append('g')
        .attr("transform", "translate(#{@graph.x(o.value)}, #{@graph.innerHeight})")
        .attr("class", ["x-tick", @ticksTreatment].join(' '))
      .append('text')
        .attr("y", @marginTop)
        .text(o.unit.formatter(new Date(o.value * 1000)))
        .attr("class", 'title')


  