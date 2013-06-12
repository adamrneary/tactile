class Tactile.Chart
  # Hash to map renderer name to class name. Used in looking up series type
  _renderers:
    'gauge': Tactile.GaugeRenderer
    'column': Tactile.ColumnRenderer
    'line': Tactile.LineRenderer
    'area': Tactile.AreaRenderer
    'scatter': Tactile.ScatterRenderer
    'donut': Tactile.DonutRenderer
    'waterfall': Tactile.WaterfallRenderer
    'leaderboard': Tactile.LeaderboardRenderer
    'bullet': Tactile.BulletRenderer

  # default values
  margin: {top: 20, right: 20, bottom: 20, left: 20}
  padding: {top: 10, right: 10, bottom: 10, left: 10}
  interpolation: 'monotone'
  offset: 'zero'
  min: undefined
  max: undefined
  transitionSpeed: 750
  defaultHeight: 400
  defaultWidth: 680
  defaultAxesOptions:
    x:
      dimension: "time"
      frame: [undefined, undefined]
    y:
      dimension: "linear"
      frame: [undefined, undefined]
    y1:
      dimension: "linear"
      frame: [undefined, undefined]


  autoScale: true
  defaultXFrame: [0, 1]
  defaultYFrame: [0, 1]
  defaultY1Frame: [0, 1]
  defaultAvailableXFrame: [-Infinity, Infinity]
  defaultAvailableYFrame: [-Infinity, Infinity]
  defaultAvailableY1Frame: [-Infinity, Infinity]
  defaultMinXFrame: 1
  defaultMinYFrame: 1
  defaultMinY1Frame: 1
  defaultMaxXFrame: Infinity
  defaultMaxYFrame: Infinity
  defaultMaxY1Frame: Infinity

  _lastYTranslate: 0

  # builds the chart object using any passed arguments
  constructor: (args = {}) ->
    @renderers = []
    @axesList = {}
    @series = new Tactile.SeriesSet([], @)
    @window = {}
    @updateCallbacks = []
    @manipulateCallbacks = []
    @elementChangeCallbacks = []
    @timesRendered = 0
    @utils = new Tactile.Utils()

    # chart size is handled with its own method
    @setSize
      width: args.width or @defaultWidth
      height: args.height or @defaultHeight
    delete args.width if args.width?
    delete args.height if args.height?

    # the remaining chart properties can be applied to the object directly
    _.each args, (val, key) =>
      @[key] = val

    # add series if passed in the constructor
    @addSeries(args.series, overwrite: true)


    @x = d3.scale.linear()
      .range([0, @width()])
    @y = d3.scale.linear()
      .range([@height(), 0])
    @y.magnitude = d3.scale.linear()
      .range([0, @height()])
    @y1 = d3.scale.linear()
      .range([@height(), 0])
    @y1.magnitude = d3.scale.linear()
      .range([0, @height()])

    @setXFrame args.xFrame or @defaultXFrame
    @setYFrame args.yFrame or @defaultYFrame
    @setY1Frame args.y1Frame or @defaultY1Frame
    @setAvailableXFrame args.availableXFrame or @defaultAvailableXFrame
    @setAvailableYFrame args.availableYFrame or @defaultAvailableYFrame
    @setAvailableY1Frame args.availableY1Frame or @defaultAvailableY1Frame
    @setMinXFrame args.minXFrame or @defaultMinXFrame
    @setMinYFrame args.minYFrame or @defaultMinYFrame
    @setMinY1Frame args.minY1Frame or @defaultMinY1Frame
    @setMaxXFrame args.maxXFrame or @defaultMaxXFrame
    @setMaxYFrame args.maxYFrame or @defaultMaxYFrame
    @setMaxY1Frame args.maxY1Frame or @defaultMaxY1Frame

  # Adds series to the chart and creates renderer instance for it
  # Note: you may pass a single object here or an array of them
  # Note: pass option 'overwrite: true' to remove all previous series
  addSeries: (series, options = {overwrite: false}) ->
    return unless series
    series = [series] unless _.isArray(series)

    newSeries = _.map(series, (options) -> new Tactile.Series(options))
    @series.add(newSeries, options.overwrite)

    # only init the renderers for just added series
    # TODO: Refactor this into series/renderer constructor
    @initRenderers(newSeries)
    @

  setXFrame: (xFrame)=>
    @xFrame = xFrame or @defaultXFrame
    @x.domain(@xFrame)
    @

  setYFrame: (yFrame)=>
    @yFrame = yFrame or @defaultYFrame
    @y.domain(@yFrame)
    @y.magnitude.domain([0, @y.domain()[1] - @y.domain()[0]])
    @

  setY1Frame: (y1Frame)=>
    @y1Frame = y1Frame or @defaultY1Frame
    @y1.domain(@y1Frame)
    @y1.magnitude.domain([0, @y1.domain()[1] - @y1.domain()[0]])
    @

  setAvailableXFrame: (availableXFrame)=>
    @availableXFrame = availableXFrame or @defaultAvailableXFrame
    @

  setAvailableYFrame: (availableYFrame)=>
    @availableYFrame = availableYFrame or @defaultAvailableYFrame
    @

  setAvailableY1Frame: (availableY1Frame)=>
    @availableY1Frame = availableY1Frame or @defaultAvailableY1Frame
    @

  setMinXFrame: (minXFrame)=>
    @minXFrame = minXFrame or @defaultMinXFrame
    @

  setMinYFrame: (minYFrame)=>
    @minYFrame = minYFrame or @defaultMinYFrame
    @

  setMinY1Frame: (minY1Frame)=>
    @minY1Frame = minY1Frame or @defaultMinY1Frame
    @

  setMaxXFrame: (maxXFrame)=>
    @maxXFrame = maxXFrame or @defaultMaxXFrame
    @

  setMaxYFrame: (maxYFrame)=>
    @maxYFrame = maxYFrame or @defaultMaxYFrame
    @

  setMaxY1Frame: (maxY1Frame)=>
    @maxY1Frame = maxY1Frame or @defaultMaxY1Frame
    @

  setAutoScale: (val)=>
    @autoScale = val
    @


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

  render: (transitionSpeed)->
    if @renderers is undefined or _.isEmpty(@renderers) or @_allSeriesDisabled()
      @vis?.remove()
      @draggableVis?.remove()
      return
    @initSeriesStackData()
    @_setupCanvas()
    @stackData()
    @_checkXDomain()
    @_checkYDomain()
    @_checkY1Domain()
    @_calculateXRange() unless @autoScale
    transitionSpeed = @transitionSpeed if transitionSpeed is undefined
    t = @svg.transition().duration(if @timesRendered then transitionSpeed else 0)
    _.each @renderers, (renderer) =>
      # discover domain for current renderer
      @discoverRange(renderer)
      @_calculateXRange()
      renderer.render(t, if @timesRendered then transitionSpeed else 0)

    _.each @axesList, (axis) =>
      axis.render(t)

    @updateCallbacks.forEach (callback) ->
      callback()

    @y.magnitude.domain([0, @y.domain()[1] - @y.domain()[0]])
    @y1.magnitude.domain([0, @y1.domain()[1] - @y1.domain()[0]])
    zoom = d3.behavior.zoom()
    d3.select(@_element)
      .on("mousedown.plot-drag", @_plotDrag)
      .on("touchstart.plot-drag", @_plotDrag)
      .on("mousemove.drag", @_mousemove)
      .on("touchmove.drag", @_mousemove)
      .on("mouseup.plot-drag",   @_mouseup)
      .on("touchend.plot-drag",  @_mouseup)
      .call(zoom.x(@x).y(@y).on("zoom", ()=>
        return if @autoScale

        dy = d3.event.translate[1] - @_lastYTranslate
        dy1 = (dy / (@y.domain()[1] - @y.domain()[0])) * (@y1.domain()[1] - @y1.domain()[0])
        @y1.domain([@y1.domain()[0] + dy1, @y1.domain()[1] + dy1])
        @y1.domain([@y1.domain()[0] * d3.event.scale, @y1.domain()[1] / d3.event.scale])
        @_lastYTranslate = d3.event.translate[1];
        @_checkXDomain()
        @_checkYDomain()
        @_checkY1Domain()
        @manipulateCallbacks.forEach (callback) ->
          callback()
        @render(0)
      )
      )
    @timesRendered++

  update: ->
    @render()

  discoverRange: (renderer) =>
    return unless @autoScale
    domain = renderer.domain()
    if renderer.cartesian
      xframe = [
        (if @axes().x?.frame?[0] then @axes().x.frame[0] else domain.x[0])
        (if @axes().x?.frame?[1] then @axes().x.frame[1] else domain.x[1])
      ]
      yframe = [
        (if @axes().y?.frame?[0] then @axes().y.frame[0] else domain.y[0])
        (if @axes().y?.frame?[1] then @axes().y.frame[1] else domain.y[1])
      ]

      @x.domain(xframe)
        .range([0, @width()])
      @y.domain(yframe)
        .range([@height(), 0])
      @y.magnitude
        .domain([0, domain.y[1] - domain.y[0]])
        .range([0, @height()])

      unless renderer.series.ofDefaultAxis()
        @y1.domain([0, d3.max(@series.ofAlternateScale().flat('y'))])
           .range([@height(), 0])
        @y1.magnitude.domain([0, @y1.domain()[1] - @y1.domain()[0]])

  axes: (args) ->
    return @axesList unless args

    # kill any old axes
    _.each _.toArray(@axesList), (axis) -> axis.destroy()

    _.each ['x', 'y', 'y1'], (k) =>
      if args[k]?
        defaults = {graph: @, dimension: @defaultAxesOptions[k].dimension, frame: @defaultAxesOptions[k].frame, axis: k}
        @initAxis _.extend defaults, args[k]

    @

  initAxis: (args) ->
    return unless @_allRenderersCartesian()
    switch args.dimension
      when "linear"
        @axesList[args.axis] = new Tactile.AxisLinear args
      when "time"
        @axesList[args.axis] = new Tactile.AxisTime args
      else
        console.warn("Tactile error: #{args.dimension} is not currently implemented")

  # Used by range slider
  dataDomain: ->
    # take from the first series
    data = @renderers[0].series.stack
    [data[0].x, data.slice(-1).shift().x]

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


  # Set's the size for the chart
  # please note you have to call render() or update()
  # for this changes to be reflected in your chart
  #
  # outerWith, outerHeight - no margins or paddings subtracted
  # marginedWidth, marginedHeight - margins subtracted
  # innerWidth, innerHeight - margins and paddings subtracted
  # width(), height() returns innerWidth as it's the most common used
  setSize: (args = {}) ->
    elWidth = $(@_element).width()
    elHeight = $(@_element).height()

    @outerWidth = args.width || elWidth || @defaultWidth
    @outerHeight = args.height || elHeight || @defaultHeight

    @marginedWidth = @outerWidth - @margin.left - @margin.right
    @marginedHeight = @outerHeight - @margin.top - @margin.bottom
    @innerWidth = @marginedWidth - @padding.left - @padding.right
    @innerHeight = @marginedHeight - @padding.top - @padding.bottom

    @vis?.attr('width', @innerWidth).attr('height', @innerHeight)

  onUpdate: (callback) ->
    @updateCallbacks.push callback

  onManipulate: (callback) ->
    @manipulateCallbacks.push callback

  onElementChange: (callback) ->
    @elementChangeCallbacks.push callback

  initRenderers: (series) ->
    renderersSize = @renderers.length
    _.each series, (s, index) =>
      name = s.renderer
      throw "couldn't find renderer #{name}" if (!@_renderers[name])
      rendererClass = @_renderers[name]
      rendererOptions = _.extend {},
        graph: @
        transitionSpeed: @transitionSpeed
        series: s
        rendererIndex: index + renderersSize
      r = new rendererClass(rendererOptions)
      @renderers.push r

  renderersByType: (name) ->
    @renderers.filter((r) -> r.name == name)

  clearRenderers: ->
    return if _.isEmpty(@renderers)
    _.each @renderers, (r) ->
      r.delete()

    @renderers = []
    @timesRendered = 0

  stackTransition: (transitionSpeed)=>
    transitionSpeed = @transitionSpeed if transitionSpeed is undefined
    t = @svg.transition().duration(transitionSpeed)
    _.each(@renderersByType('column'), (r) -> r.stackTransition(t, transitionSpeed))
    _.each(@renderersByType('area'), (r) -> r.stackTransition(t, transitionSpeed))
    _.each(@renderersByType('donut'), (r) -> r.stackTransition(t, transitionSpeed))
    _.each  @axesList, (axis) =>
      axis.render(t)


  unstackTransition: (transitionSpeed)=>
    transitionSpeed = @transitionSpeed if transitionSpeed is undefined
    t = @svg.transition().duration(transitionSpeed)
    _.each(@renderersByType('column'), (r) -> r.unstackTransition(t, transitionSpeed))
    _.each(@renderersByType('area'), (r) -> r.unstackTransition(t, transitionSpeed))
    _.each(@renderersByType('donut'), (r) -> r.unstackTransition(t, transitionSpeed))
    _.each  @axesList, (axis) =>
      axis.render(t)

  #############################################################################
  # expose public variables
  #############################################################################

  element: (val) =>
    return @_element unless val
    @_element = val

    @_setupCanvas()
    @elementChangeCallbacks.forEach (callback) -> callback()
    @

  height: (val) ->
    return (@innerHeight or @defaultHeight) unless val
    @setSize(width: @outerWidth, height: val)
    @

  width: (val) ->
    return (@innerWidth or @defaultWidth) unless val
    @setSize(width: val, height: @outerHeight)
    @

  data: (val) ->
    return @_data unless val
    @_data = val
    @dataInitialized = false
    @



  #############################################################################
  # private methods
  #############################################################################

  # Appends or updates all the chart canvas elements
  # so it respects the margins and paddings
  # done by following this example: http://bl.ocks.org/3019563
  _setupCanvas: ->
    # need a constant class name for a containing div
    $(@_element).addClass('graph-container')
    @svg = @_findOrAppend(what: 'svg', in: d3.select(@_element))

    @svg
      .attr('width', @outerWidth)
      .attr('height', @outerHeight)

    vis = @_findOrAppend(what: 'g', in: @svg)
      .attr("transform", "translate(#{@margin.left},#{@margin.top})")

    vis = @_findOrAppend(what: 'g', in: vis)
      .attr("class", "outer-canvas")
      .attr("width", @marginedWidth)
      .attr("height", @marginedHeight)

    # this is the canvas on which all data should be drawn
    @vis = @_findOrAppend(what: 'g', in: vis, selector: 'g.inner-canvas')
      .attr("transform", "translate(#{@padding.left},#{@padding.top})")
      .attr("class", "inner-canvas")

    # this is the canvas on which all draggable data should be drawn
    @draggableVis = @_findOrAppend(what: 'g', in: vis, selector: 'g.draggable-canvas')
      .attr("transform", "translate(#{@padding.left},#{@padding.top})")
      .attr("class", "draggable-canvas")

    # Add the default clip path.
    clip = @_findOrAppend(what: 'clipPath', selector: '#clip', in: @vis)
      .attr("id", "clip")

    @_findOrAppend(what: 'rect', in: clip)
      .attr("width", @width())
    # increase height to provide room vertically for line thickness
      .attr("height", @height() + 4)
    # translate to adjust for increased height (split the difference)
      .attr("transform", "translate(0,-2)")

    # Add the clip path.
    scatterClip = @_findOrAppend(what: 'clipPath', selector: '#scatter-clip', in: @vis)
      .attr("id", "scatter-clip")

    @_findOrAppend(what: 'rect', in: scatterClip)
    # increase width to provide room vertically for circle radius
      .attr("width", @width() + 12)
    # increase height to provide room vertically for circle radius
      .attr("height", @height() + 12)
    # translate to adjust for increased width and height
      .attr("transform", "translate(-6,-6)")

  # looks for node in given node
  # returns it or appends to the node in `in` option
  # you can pass selector it is then used to lookup for the exisiting element
  _findOrAppend: (options) ->
    element = options.in
    node = options.what
    selector = options.selector or node

    found = element.select(selector)
    if found?[0][0]
      found
    else
      element.append(node)

  # this trims data down to the range that is currently viewed.
  # See range_slider for a clue how it's used
  _slice: (d) =>
    return true unless @_allRenderersCartesian()
    @timeframe[0] <= d.x <= @timeframe[1]

  _deg2rad: (deg) ->
    deg * Math.PI / 180

  _hasDifferentRenderers: ->
    _.uniq(_.map(@series.array, (s) -> s.renderer)).length > 1

  _containsColumnChart: ->
    _.any(@renderers, (r) -> r.name == 'column' or r.name == 'waterfall')

  _allRenderersCartesian: ->
    _.every(@renderers, (r) -> r.cartesian is true)

  _allSeriesDisabled: ->
    _.every(@series.array, (s) -> s.disabled is true)

  _plotDrag: =>
    return if @autoScale
    d3.select("body").style("cursor", "move")

  _mouseup: =>
    return if @autoScale
    d3.select("body").style("cursor", "auto")
    @axes()?.x?._mouseUp()
    @axes()?.y?._mouseUp()
    @axes()?.y1?._mouseUp()
    @_lastYTranslate = 0

  _mousemove: =>
    return if @autoScale
    @axes()?.x?._mouseMove()
    @axes()?.y?._mouseMove()
    @axes()?.y1?._mouseMove()

  _checkXDomain: ()=>
    min = @x.domain()[0]
    max = @x.domain()[1]

    min = @availableXFrame[0] if min < @availableXFrame[0]
    min = @availableXFrame[1] if min > @availableXFrame[1]

    max = @availableXFrame[1] if max > @availableXFrame[1]
    max = @availableXFrame[1] if max < @availableXFrame[0]

    minXFrame = @utils.ourFunctor(@minXFrame, [min, max])
    if max - min < minXFrame
      middle = (max + min) / 2
      middle = @availableXFrame[1] - minXFrame / 2 if middle + minXFrame / 2 > @availableXFrame[1]
      middle = @availableXFrame[0] + minXFrame / 2 if middle - minXFrame / 2 < @availableXFrame[0]
      min = middle - minXFrame / 2
      max = middle + minXFrame / 2

    maxXFrame = @utils.ourFunctor(@maxXFrame, [min, max])
    if max - min > maxXFrame
      middle = (max + min) / 2
      middle = @availableXFrame[1] - maxXFrame / 2 if middle + maxXFrame / 2 > @availableXFrame[1]
      middle = @availableXFrame[0] + maxXFrame / 2 if middle - maxXFrame / 2 < @availableXFrame[0]
      min = middle - maxXFrame / 2
      max = middle + maxXFrame / 2

    @x.domain([min, max])

  _checkYDomain: ()=>
    min = @y.domain()[0]
    max = @y.domain()[1]

    min = @availableYFrame[0] if min < @availableYFrame[0]
    min = @availableYFrame[1] if min > @availableYFrame[1]

    max = @availableYFrame[1] if max > @availableYFrame[1]
    max = @availableYFrame[1] if max < @availableYFrame[0]

    minYFrame = @utils.ourFunctor(@minYFrame, [min, max])
    if max - min < minYFrame
      middle = (max + min) / 2
      middle = @availableYFrame[1] - minYFrame / 2 if middle + minYFrame / 2 > @availableYFrame[1]
      middle = @availableYFrame[0] + minYFrame / 2 if middle - minYFrame / 2 < @availableYFrame[0]
      min = middle - minYFrame / 2
      max = middle + minYFrame / 2

    maxYFrame = @utils.ourFunctor(@maxYFrame, [min, max])
    if max - min > maxYFrame
      middle = (max + min) / 2
      middle = @availableYFrame[1] - maxYFrame / 2 if middle + maxYFrame / 2 > @availableYFrame[1]
      middle = @availableYFrame[0] + maxYFrame / 2 if middle - maxYFrame / 2 < @availableYFrame[0]
      min = middle - maxYFrame / 2
      max = middle + maxYFrame / 2

    @y.domain([min, max])

  _checkY1Domain: ()=>
    min = @y1.domain()[0]
    max = @y1.domain()[1]

    min = @availableY1Frame[0] if min < @availableY1Frame[0]
    min = @availableY1Frame[1] if min > @availableY1Frame[1]

    max = @availableY1Frame[1] if max > @availableY1Frame[1]
    max = @availableY1Frame[1] if max < @availableY1Frame[0]

    minY1Frame = @utils.ourFunctor(@minY1Frame, [min, max])
    if max - min < minY1Frame
      middle = (max + min) / 2
      middle = @availableY1Frame[1] - minY1Frame / 2 if middle + minY1Frame / 2 > @availableY1Frame[1]
      middle = @availableY1Frame[0] + minY1Frame / 2 if middle - minY1Frame / 2 < @availableY1Frame[0]
      min = middle - minY1Frame / 2
      max = middle + minY1Frame / 2

    maxY1Frame = @utils.ourFunctor(@maxY1Frame, [min, max])
    if max - min > maxY1Frame
      middle = (max + min) / 2
      middle = @availableY1Frame[1] - maxY1Frame / 2 if middle + maxY1Frame / 2 > @availableY1Frame[1]
      middle = @availableY1Frame[0] + maxY1Frame / 2 if middle - maxY1Frame / 2 < @availableY1Frame[0]
      min = middle - maxY1Frame / 2
      max = middle + maxY1Frame / 2

    @y1.domain([min, max])

  _calculateXRange: ()=>
    if @_containsColumnChart()
      renders = _.filter(@renderers, (r) -> r.name == 'column' or r.name == 'waterfall')

      lastRange = @width()
      dR = lastRange / 2
      loop
        @x.range([0, lastRange])
        barWidth = renders[0].seriesWidth()
        break if Math.abs(@width() - lastRange - barWidth) < 3
        if @width() - lastRange - barWidth > 0
          lastRange += dR
        else
          lastRange -= dR
        dR = dR / 2

      barWidth = renders[0].seriesWidth() / 2
      rangeStart = barWidth
      rangeEnd = @width() - barWidth

    @x.range([rangeStart || 0, rangeEnd || @width()])
