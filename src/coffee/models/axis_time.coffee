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

    aggregated = _.some(_.values(@graph.aggregated))
    if aggregated
      @aggLabels = @_getLabels(@graph.x.domain())
    else
      @aggLabels = @tickOffsets()

    @g = @graph.vis.selectAll('g.x-ticks').data([0])
    @g.enter().append('g').attr('class', 'x-ticks')

    ticks = @g.selectAll('g.x-tick')
      .data(@aggLabels)

    ticks.enter()
      .append('g')
      .attr("class", ["x-tick", @ticksTreatment].join(' '))

    ticks
      .attr("transform", (d, i) =>
        if aggregated
          "translate(#{@_tickX(d.value, i)}, #{@graph.height() + @marginForBottomTicks})"
        else
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

    text = @g.selectAll("g.x-tick").selectAll("text")
    text.attr("y", @marginTop)
      .text((d) ->
        if aggregated
          d.label
        else
          d.unit.formatter(new Date(d.value)))
    if aggregated
      text.append("tspan")
        .attr("y", @marginTop + @fontSize)
        .attr("x", 0)
        .text (d) -> d.secondary

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

  _getLabels: (timeFrame) ->
    labels = []

    date = [new Date(timeFrame[0]), new Date(timeFrame[1])]

    #calculate count of month in timeFrame
    startYear = date[0].getFullYear()
    startMonth = date[0].getMonth()

    endYear = date[1].getFullYear()
    endMonth = date[1].getMonth()

    range = (endYear - startYear) * 12 + (endMonth - startMonth) + 1

    if range <= 12
      for i in [0..range - 1]
        tmpDate = new Date(timeFrame[0])
        tmpDate.setMonth(startMonth + i);
        labels.push
          value: tmpDate.getTime()
          label: tmpDate.toUTCString().split(' ')[2]
          secondary: tmpDate.getFullYear().toString()

    # Else if there are 36 or fewer periods to display, we will display
    # quarterly data and aggregate
    else if 12 < range <= 36
      grouper = 3
      for i in [0 .. (range - 1)] by grouper
        item = {}

        startDate = new Date(timeFrame[0])
        startDate.setMonth(startMonth + i)
        endDate = new Date(timeFrame[0])
        endDate.setMonth(startMonth + i + grouper - 1)

        item.value = startDate.getTime()

        item.label = "#{startDate.toUTCString().split(' ')[2]}-#{endDate.toUTCString().split(' ')[2]}"
        if startDate.getTime() is date[1].getTime()
          item.label = startDate.toUTCString().split(' ')[2]
        else if endDate.getTime() > date[1].getTime()
          endDate = date[1]
          item.label = "#{startDate.toUTCString().split(' ')[2]}-#{endDate.toUTCString().split(' ')[2]}"
        item.secondary = "#{endDate.getFullYear()}"

        labels.push item

    # If there are more than 36 columns to display, we will display annual
    # data and aggregate.
    #
    # TODO: We should probably explode gracefully if there are more than
    # 144 periods to display
    else
      grouper = 12
      for i in [0 .. (range - 1)] by grouper
        item = {}
        item.secondary = ""

        startDate = new Date(timeFrame[0])
        startDate.setMonth(startMonth + i)
        endDate = new Date(timeFrame[0])
        endDate.setMonth(startMonth + i + grouper - 1)

        item.value = startDate.getTime()
        if endDate.getTime() > date[1].getTime()
          endDate = date[1]

        if startDate.getMonth() is 0 # Jan
          item.label = "#{startDate.getFullYear()}"
        else if startDate.getTime() is endDate.getTime()
          item.label = "#{startDate.getMonth()+1}/#{startDate.getFullYear()}"
        else
          item.label = "#{startDate.getMonth()+1}/#{startDate.getFullYear()}-#{endDate.getMonth()+1}/#{endDate.getFullYear()}"

        labels.push item
    labels
