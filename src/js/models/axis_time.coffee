Tactile.AxisTime = class AxisTime

  constructor: (args) ->
    @graph = args.graph
    @elements = []
    @ticksTreatment = args.ticksTreatment or "plain"
    @fixedTimeUnit = args.timeUnit
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
    @elements.forEach (e) ->
      e.parentNode.removeChild e

    @elements = []
    offsets = @tickOffsets()
    
    offsets.forEach (o) =>
      return if @graph.x(o.value) > @graph.x.range()[1]
      element = document.createElement("div")
      element.style.left = @graph.x(o.value) + "px"
      element.classList.add "x-tick"
      element.classList.add "grid" if @grid
      element.classList.add @ticksTreatment
      title = document.createElement("div")
      title.classList.add "title"
      title.innerHTML = o.unit.formatter(new Date(o.value * 1000))
      element.appendChild title
      @graph.element.appendChild element
      @elements.push element


  