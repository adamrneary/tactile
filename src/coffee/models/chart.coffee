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
  defaultPadding: {top: 0, right: 0, bottom: 0, left: 0}
  defaultAxisPadding: {top: 0, right: 0, bottom: 0, left: 0}
  prevAxisPadding: {top: 0, right: 0, bottom: 0, left: 0}
  interpolation: 'monotone'
  offset: 'zero'
  min: undefined
  max: undefined
  transitionSpeed: 5000
  defaultHeight: 400
  defaultWidth: 680
  defaultAxesOptions:
    x:
      dimension: "time"
      showZeroLine: false
    y:
      dimension: "linear"
      showZeroLine: true
    y1:
      dimension: "linear"
      showZeroLine: true

  defaultMinXFrame:  1
  defaultMinYFrame:  1
  defaultMinY1Frame: 1
  defaultMaxXFrame: Infinity
  defaultMaxYFrame: Infinity
  defaultMaxY1Frame: Infinity

  _autoSetAvailableXFrame: false
  _autoSetAvailableYFrame: false
  _autoSetAvailableY1Frame: false

  _lastYTranslate: 0

  aggregated:
    column: false
    line: false
    waterfall: false

  animateShowHide: false

  # builds the chart object using any passed arguments
  constructor: (args = {}) ->
    @utils = new Tactile.Utils()
    @padding = _.defaults {}, args.padding, @defaultPadding
    @axisPadding = _.defaults {}, args.axisPadding, @defaultAxisPadding

    @renderers = []
    @renderers_to_delete = []
    @axesList = {}
    @gridList = {}
    @series = new Tactile.SeriesSet([], @)
    @window = {}
    @updateCallbacks = []
    @manipulateCallbacks = []
    @elementChangeCallbacks = []
    @timesRendered = 0

    @_setupDomainAndRange()

    # chart size is handled with its own method
    @setSize
      width: args.width or @defaultWidth
      height: args.height or @defaultHeight
    delete args.width if args.width?
    delete args.height if args.height?

    # add series if passed in the constructor
    @addSeries(args.series, overwrite: true)

    # set autoscale to true by default
    if _.isUndefined(args.autoScale) then @setAutoScale(true) else @setAutoScale(args.autoScale)

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
    _.each @aggregated, (value, key) =>
      @aggregated[key] = false
    series = [series] unless _.isArray(series)

    newSeries = _.map(series, (options) -> new Tactile.Series(options))
    @series.add(newSeries, options.overwrite)

    # only init the renderers for just added series
    # TODO: Refactor this into series/renderer constructor
    @initRenderers(newSeries)

    if options.overwrite
      @animateShowHide = true
    else
      @animateShowHide = false
    @


  # TODO: move next 9 methods away to a separate class. Zoomable or sth.
  ###
    setAvailable[X|Y|Y1]Frame
      min and max values that can be zoomed or moved to.
      Computed if not given
  ###
  setAvailableXFrame: (availableXFrame) =>
    @availableXFrame = availableXFrame or @defaultAvailableXFrame
    @

  setAvailableYFrame: (availableYFrame) =>
    @availableYFrame = availableYFrame or @defaultAvailableYFrame
    @

  setAvailableY1Frame: (availableY1Frame) =>
    @availableY1Frame = availableY1Frame or @defaultAvailableY1Frame
    @

  ###
    setMin[X|Y|Y1]Frame
      this is the minimum distance between points to which you can zoom in.
      1 by default
  ###
  setMinXFrame: (minXFrame) =>
    @minXFrame = minXFrame or @defaultMinXFrame
    @

  setMinYFrame: (minYFrame) =>
    @minYFrame = minYFrame or @defaultMinYFrame
    @

  setMinY1Frame: (minY1Frame) =>
    @minY1Frame = minY1Frame or @defaultMinY1Frame
    @

  ###
    setMax[X|Y|Y1]Frame
    this is the maximum distance between points to which you can zoom out.
    Infinity by default
  ###
  setMaxXFrame: (maxXFrame) =>
    @maxXFrame = maxXFrame or @defaultMaxXFrame
    @

  setMaxYFrame: (maxYFrame) =>
    @maxYFrame = maxYFrame or @defaultMaxYFrame
    @

  setMaxY1Frame: (maxY1Frame) =>
    @maxY1Frame = maxY1Frame or @defaultMaxY1Frame
    @


  setXFrame: (xFrame) =>
    @xOld = d3.scale.linear()
      .domain(@x.domain())
      .range(@x.range())

    @yOld = d3.scale.linear()
      .domain(@y.domain())
      .range(@y.range())
    @yOld.magnitude = d3.scale.linear()
      .domain(@y.magnitude.domain())
      .range(@y.magnitude.range())

    @y1Old = d3.scale.linear()
      .domain(@y1.domain())
      .range(@y1.range())
    @y1Old.magnitude = d3.scale.linear()
      .domain(@y1.magnitude.domain())
      .range(@y1.magnitude.range())

    @x.domain(xFrame)
    @

  setYFrame: (yFrame) =>
    @y.domain(yFrame)
    @

  setY1Frame: (y1Frame) =>
    @y1.domain(y1Frame)
    @

  resetXFrame: =>
    @setXFrame([NaN, NaN])

  resetYFrame: =>
    @setYFrame([NaN, NaN])

  resetY1Frame: =>
    @setY1Frame([NaN, NaN])


  setAutoScale: (val) =>
    if val
      delete @availableXFrame
      delete @availableYFrame
      delete @availableY1Frame
      @setXFrame([NaN, NaN])
      @setYFrame([NaN, NaN])
      @setY1Frame([NaN, NaN])

    @autoScale = val
    @

  setPadding: (padding) =>
    return @padding unless padding
    @padding = padding
    @setSize()
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

  render: (transitionSpeed, options = {}) ->
    if @renderers is undefined or _.isEmpty(@renderers) or @_allSeriesDisabled()
      @vis?.remove()
      @draggableVis?.remove()
      return

    @initSeriesStackData()
    @_setupCanvas()
    @stackData()

    @discoverRange()

    # related to the zooming/dragging
    # must be called after @discoverRange, but it's not needed to run it for each renderer
    @_checkXDomain()
    @_checkYDomain()
    @_checkY1Domain()
    @_calculateXRange()

    if @animateShowHide
      left = @padding.left + @prevAxisPadding?.left || 0
      top = @padding.top + @prevAxisPadding?.top || 0
      if _.filter(@renderers_to_delete, (r) -> r.name is "line").length
        # @outerWidth*1.1 - just to be shure to hide
        # move dots to the right
        @draggableVis?.transition().duration(@transitionSpeed).attr("transform", "translate(#{@outerWidth*1.1},#{top})")
        # @outerWidth*1.1 - just to be shure to hide
        # move lines to the left
        @vis?.selectAll(".line").transition().duration(@transitionSpeed).attr("transform", "translate(#{-@outerWidth},#{top})").each "end", () =>
          # move all other down
          @vis?.transition().duration(@transitionSpeed).attr("transform", "translate(#{left},#{@outerHeight})").each "end", () =>
            _.each @renderers_to_delete, (r) ->
              r.delete()
            @renderers_to_delete = []

            @renderChart(transitionSpeed, options)
      else
        # prevent changing after axes update
        left = @padding.left + @prevAxisPadding?.left || 0
        @vis?.attr("transform", "translate(#{left},#{@padding.top + @axisPadding.top})")

        @draggableVis?.attr("transform", "translate(#{left},#{@padding.top + @axisPadding.top})")
        @vis.transition()
          .duration(@transitionSpeed)
          .attr("transform", "translate(#{left},#{@outerHeight})")
        @draggableVis.transition()
          .duration(@transitionSpeed)
          .attr("transform", "translate(#{left},#{@outerHeight})")
          .each "end", (d, i) =>
            # updateSeries
            _.each @renderers_to_delete, (r) ->
              r.delete()
            @renderers_to_delete = []

            @renderChart(transitionSpeed, options)
    else
      @renderChart(transitionSpeed, options)

  renderChart: (transitionSpeed, options= {}) ->
    transitionSpeed = @transitionSpeed if transitionSpeed is undefined
    t = @svg.transition().duration(if @timesRendered then transitionSpeed else 0)

    _.each @renderers, (renderer) =>
      renderer.render(t, true, transitionSpeed)

    _.each @axesList, (axis) =>
      axis.render(t)

    _.each @gridList, (grid) =>
      grid.render(t)

    #@_setupZoom()
    @timesRendered++

    @updateCallbacks.forEach (callback) ->
      callback()


  update: ->
    @render()

  discoverRange: =>
    xDomain = []
    yDomain = []
    y1Domain = []
    _.each @renderers, (renderer) =>
      if renderer.cartesian
        domain = renderer.domain()
        xDomain = domain.x if xDomain.length is 0
        yDomain = domain.y if yDomain.length is 0
        xDomain[0] = domain.x[0] if xDomain[0] > domain.x[0]
        xDomain[1] = domain.x[1] if xDomain[1] < domain.x[1]
        yDomain[0] = domain.y[0] if yDomain[0] > domain.y[0]
        yDomain[1] = domain.y[1] if yDomain[1] < domain.y[1]
        unless renderer.series.ofDefaultAxis()
          y1Domain = [0, d3.max(@series.ofAlternateScale().flat('y'))] if y1Domain.length is 0


    unless @availableXFrame then @_autoSetAvailableXFrame = true
    unless @availableYFrame then @_autoSetAvailableYFrame = true
    unless @availableY1Frame then @_autoSetAvailableY1Frame = true

    if @_autoSetAvailableXFrame then @availableXFrame = xDomain

    if @_autoSetAvailableYFrame
      min = yDomain[0]
      max = yDomain[1]
      if yDomain[0] > 0 and yDomain[1] > 0 then min = 0
      if yDomain[0] < 0 and yDomain[1] < 0 then max = 0
      @availableYFrame = [min + min*0.1, max + max*0.1]

    if @_autoSetAvailableY1Frame
      min = y1Domain[0]
      max = y1Domain[1]
      if y1Domain[0] > 0 and y1Domain[1] > 0 then min = 0
      if y1Domain[0] < 0 and y1Domain[1] < 0 then max = 0
      @availableY1Frame = [min + min*0.1, max + max*0.1]

    if _.isNaN(@x.domain()[0]) or _.isNaN(@x.domain()[1])
      @x.domain(@availableXFrame)

    if _.isNaN(@y.domain()[0]) or _.isNaN(@y.domain()[1]) or @autoScale
      @y.domain(@availableYFrame)
      @y.magnitude.domain([0, @availableYFrame[1] - @availableYFrame[0]])

    if _.isNaN(@y1.domain()[0]) or _.isNaN(@y1.domain()[1]) or @autoScale
      @y1.domain(@availableY1Frame)
      @y1.magnitude.domain([0, @availableY1Frame[1] - @availableY1Frame[0]])

    @

  yMin: (yMin) ->
    return @min unless yMin
    @min = yMin
    @

  axes: (args) ->
    return @axesList unless args
    # save prev axisPadding
    @prevAxisPadding = _.clone @axisPadding

    # kill any old axes
    _.each _.toArray(@axesList), (axis) -> axis.destroy()

    _.each ['x', 'y', 'y1'], (k) =>
      if args[k]?
        defaults =
          graph: @
          dimension: @defaultAxesOptions[k].dimension
          frame: @defaultAxesOptions[k].frame
          axis: k
          showZeroLine: @defaultAxesOptions[k].showZeroLine

        @initAxis _.extend defaults, args[k]

    @

  grid: (args) ->
    return @gridList unless args

    # kill any old grids
    _.each _.toArray(@gridList), (grid) -> grid.destroy()

    _.each ['x', 'y', 'y1'], (k) =>
      if args[k]?
        defaults = {graph: @, grid: k}
        @gridList[k] = new Tactile.Grid _.extend defaults, args[k]

    @


  initAxis: (args) ->
    return unless @_allRenderersCartesian()
    switch args.dimension
      when "linear"
        @axesList[args.axis] = new Tactile.AxisLinear args
      when "time"
        @axesList[args.axis] = new Tactile.AxisTime args
      else
        Tactile.Utils.warn("Tactile error: #{args.dimension} is not currently implemented")

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
  # outerWith, outerHeight - no paddings subtracted
  # innerWidth, innerHeight - paddings subtracted
  # width(), height() returns innerWidth as it's the most common used
  setSize: (args = {}) ->
    elWidth  = $(@_element).width()
    elHeight = $(@_element).height()

    @outerWidth = args.width || elWidth || @defaultWidth
    @outerHeight = args.height || elHeight || @defaultHeight

    @innerWidth = @outerWidth - @padding.left - @padding.right - @axisPadding.left - @axisPadding.right
    @innerHeight = @outerHeight - @padding.top - @padding.bottom - @axisPadding.top - @axisPadding.bottom

    @x?.range([0, @width()])
    @y?.range([@height(), 0])
    @y?.magnitude.range([0, @height()])
    @y1?.range([@height(), 0])
    @y1?.range([0, @height()])


    @vis?.attr('width', @innerWidth).attr('height', @innerHeight)
    @_updateRange()
    @_setupCanvas()

    @

  _setupZoom: ->
#    @y.magnitude.domain([0, @y.domain()[1] - @y.domain()[0]])
#    @y1.magnitude.domain([0, @y1.domain()[1] - @y1.domain()[0]])
#    zoom = d3.behavior.zoom()
#    d3.select(@_element)
#      .on("mousedown.plot-drag", @_plotDrag)
#      .on("touchstart.plot-drag", @_plotDrag)
#      .on("mousemove.drag", @_mousemove)
#      .on("touchmove.drag", @_mousemove)
#      .on("mouseup.plot-drag",   @_mouseup)
#      .on("touchend.plot-drag",  @_mouseup)
#
#    unless @autoScale
#      d3.select(@svg[0][0])
#        .call(zoom.x(@x).y(@y).on("zoom", =>
#          return if @autoScale
#          dy = d3.event.translate[1] - @_lastYTranslate
#          dy1 = (dy / (@y.domain()[1] - @y.domain()[0])) * (@y1.domain()[1] - @y1.domain()[0])
#          @y1.domain([@y1.domain()[0] + dy1, @y1.domain()[1] + dy1])
#          @y1.domain([@y1.domain()[0] * d3.event.scale, @y1.domain()[1] / d3.event.scale])
#          @_lastYTranslate = d3.event.translate[1];
#          @_checkXDomain()
#          @_checkYDomain()
#          @_checkY1Domain()
#
#          @manipulateCallbacks.forEach (callback) ->
#            callback()
#          @render(0, zooming: true)
#        ))

  _setupDomainAndRange: ->
    @x = d3.scale.linear()
      .domain([NaN, NaN])
    @y = d3.scale.linear()
      .domain([NaN, NaN])
    @y.magnitude = d3.scale.linear()
    @y1 = d3.scale.linear()
      .domain([NaN, NaN])
    @y1.magnitude = d3.scale.linear()
    @_updateRange()

  _updateRange: ->
    @x.range([0, @width()])
    @y.range([@height(), 0])
    @y.magnitude.range([0, @height()])
    @y1.range([@height(), 0])
    @y1.magnitude.range([0, @height()])

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
      if s.aggregate is true
        @aggregated[name] = true
      r = new rendererClass(rendererOptions)
      @renderers.push r

  renderersByType: (name) ->
    @renderers.filter((r) -> r.name == name)

  clearRenderers: ->
    return if _.isEmpty(@renderers)
    @renderers_to_delete = _.clone @renderers
#    _.each @renderers_to_delete, (r) ->
#      r.delete()

    @renderers = []
    @timesRendered = 0

  stackTransition: (transitionSpeed) =>
    transitionSpeed = @transitionSpeed if transitionSpeed is undefined
    t = @svg.transition().duration(transitionSpeed)
    _.each(@renderersByType('column'), (r) -> r.unstack = false)
    _.each(@renderersByType('column'), (r) -> r.stackTransition(t, transitionSpeed))
    _.each(@renderersByType('area'), (r) -> r.unstack = false)
    _.each(@renderersByType('area'), (r) -> r.stackTransition(t, transitionSpeed))
    _.each(@renderersByType('donut'), (r) -> r.unstack = false)
    _.each(@renderersByType('donut'), (r) -> r.stackTransition(t, transitionSpeed))
    #@_setupZoom()
    _.each  @axesList, (axis) =>
      axis.render(t)


  unstackTransition: (transitionSpeed) =>
    transitionSpeed = @transitionSpeed if transitionSpeed is undefined
    t = @svg.transition().duration(transitionSpeed)
    _.each(@renderersByType('column'), (r) -> r.unstack = true)
    _.each(@renderersByType('column'), (r) -> r.unstackTransition(t, transitionSpeed))
    _.each(@renderersByType('area'), (r) -> r.unstack = true)
    _.each(@renderersByType('area'), (r) -> r.unstackTransition(t, transitionSpeed))
    _.each(@renderersByType('donut'), (r) -> r.unstack = true)
    _.each(@renderersByType('donut'), (r) -> r.unstackTransition(t, transitionSpeed))
    #@_setupZoom()
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

  setPadding: (val) ->
    return (@padding) unless val or _.isEmpty(val)
    # recalculate the range
    @padding = val
    @setSize(width: @outerWidth, height: @outerHeight)
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
  # so it respects the paddings
  # done by following this example: http://bl.ocks.org/3019563
  _setupCanvas: ->
    # need a constant class name for a containing div
    $(@_element).addClass('graph-container')
    @svg = @_findOrAppend(what: 'svg', in: d3.select(@_element))

    @svg
      .attr('width', @outerWidth)
      .attr('height', @outerHeight)

    # this is the canvas on which all data should be drawn
    @vis = @_findOrAppend(what: 'g', in: @svg, selector: 'g.canvas')
      .attr("transform", "translate(#{@padding.left + @axisPadding.left},#{@padding.top + @axisPadding.top})")
      .attr("class", "canvas")

    # this is the canvas on which all draggable data should be drawn
    @draggableVis = @_findOrAppend(what: 'g', in: @svg, selector: 'g.draggable-canvas')
      .attr("transform", "translate(#{@padding.left + @axisPadding.left},#{@padding.top + @axisPadding.top})")
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
#    return if @autoScale
#    d3.select("body").style("cursor", "move")

  _mouseup: =>
#    return if @autoScale
#    d3.select("body").style("cursor", "auto")
#    @axes()?.x?._mouseUp()
#    @axes()?.y?._mouseUp()
#    @axes()?.y1?._mouseUp()
#    @_lastYTranslate = 0

  _mousemove: =>
#    return if @autoScale
#    @axes()?.x?._mouseMove()
#    @axes()?.y?._mouseMove()
#    @axes()?.y1?._mouseMove()


  # TODO: move away to a separate class. Zoomable or sth.
  _checkXDomain: =>
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

    @axes().x?.frame = [min, max]
    @x.domain([min, max])

  _checkYDomain: =>
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

    @axes().y?.frame = [min, max]
    @y.domain([min, max])

  _checkY1Domain: =>
    min = @y1.domain()[0]
    max = @y1.domain()[1]

    return unless @availableY1Frame
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

    @axes().y1?.frame = [min, max]
    @y1.domain([min, max])

  _calculateXRange: =>
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
