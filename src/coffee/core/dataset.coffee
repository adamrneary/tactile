class Tactile.SeriesSet

  constructor: (data) ->

  update: (data) ->

  isEmpty: ->
    false

  initSeriesStackData: (options = {overwrite: false}) ->
    return if @dataInitialized and not options.overwrite

    # Initialize each serie's stack data
    # BEGIN
    seriesData = @series.map((d) =>
      @_data.map(d.dataTransform))

    layout = d3.layout.stack()
    layout.offset(@offset)
    stackedData = layout(seriesData)

    i = 0
    maxLen = 0
    while i < stackedData.length
      maxLen = Math.max(maxLen, stackedData[i].length)
      i++

    i = 0
    y00 = 0
    while i < maxLen
      j = 0
      while j < stackedData.length
        if stackedData[j][i]
          y00 = 0 if @utils.ourFunctor(@series[j].fromBaseline, stackedData[j][i], i)
          stackedData[j][i].y00 = y00
          y00 += stackedData[j][i].y
        j++
      i++

    i = 0
    @series.forEach (series) ->
      series.stack = stackedData[i++]
    # END

    @dataInitialized = true


  stackData: ->
    # Read more about stacking data here:
    # https://github.com/mbostock/d3/wiki/Stack-Layout

    # select data of default scale only, so we can handle y1 axis data separately
    defaultScaleSeriesData = @series.active().ofDefaultAxis().array.map((s) => @_data.map(s.dataTransform))

    layout = d3.layout.stack()
    layout.offset(@offset)
    @stackedData = layout(defaultScaleSeriesData)

    i = 0
    maxLen = 0
    while i < @stackedData.length
      maxLen = Math.max(maxLen, @stackedData[i].length)
      i++

    i = 0
    y00 = 0
    while i < maxLen
      j = 0
      while j < @stackedData.length
        if @stackedData[j][i]
          y00 = 0 if @utils.ourFunctor(@series[j].fromBaseline, @stackedData[j][i], i)
          @stackedData[j][i].y00 = y00
          y00 += @stackedData[j][i].y
        j++
      i++
