Tactile.Chart = class Chart
  # Hash to map renderer name to class name. Used in looking up series type
  _renderers:
    'gauge': GaugeRenderer
    'column': ColumnRenderer
    'line': LineRenderer
    'area': AreaRenderer
    'scatter': ScatterRenderer
    'donut': DonutRenderer

  # default values
  margin: {top: 20, right: 20, bottom: 20, left: 20}
  padding: {top: 10, right: 10, bottom: 10, left: 10}
  interpolation: 'monotone'
  offset: 'zero'
  min: undefined
  max: undefined
  transitionSpeed: 750
  defaultHeight: 400
  defaultWidth: 730
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

  # builds the chart object using any passed arguments
  constructor: (args = {}) ->
    @renderers = []
    @axesList = {}
    @series = new SeriesSet([], @)
    @window = {}
    @updateCallbacks = []
    @timesRendered = 0

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

  # Adds series to the chart and creates renderer instance for it
  # Note: you may pass a single object here or an array of them
  # Note: pass option 'overwrite: true' to remove all previous series
  addSeries: (series, options = {overwrite: false}) ->
    return unless series
    series = [series] unless _.isArray(series)

    newSeries = _.map(series, (options) -> new Series(options))
    @series.add(newSeries, options.overwrite)

    # only init the renderers for just added series
    # TODO: Refactor this into series/renderer constructor
    @initRenderers(newSeries)
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
    @series.forEach (series) ->
      series.stack = stackedData[i++]
    # END
    
    @dataInitialized = true

  render: (transitionSpeed)->
    if @renderers is undefined or _.isEmpty(@renderers) or @_allSeriesDisabled()
      return
    @initSeriesStackData()
    @_setupCanvas()
    @stackData()

    transitionSpeed ||= @transitionSpeed
    t = @svg.transition().duration(if @timesRendered then transitionSpeed else 0)
    _.each @renderers, (renderer) =>
      # discover domain for current renderer
      @discoverRange(renderer)
      renderer.render(t)

    _.each @axesList, (axis) =>
      axis.render(t)

    @updateCallbacks.forEach (callback) ->
      callback()
    @timesRendered++

  update: ->
    @render()

  discoverRange: (renderer) =>
    domain = renderer.domain()
    if renderer.cartesian
      # TODO: This needs way prettier implementation
      # It moves the range 'right' by the value of half width of a bar
      # So if we have renderers including bar chart points are rendered in the
      # center of each bar and not a single bar is cut off by the chart border
      if @_containsColumnChart()
        barWidth = @width() / renderer.series.stack.length / 2
        rangeStart = barWidth
        rangeEnd = @width() - barWidth

      xframe = [
        (if @axes().x?.frame?[0] then @axes().x.frame[0] else domain.x[0])
        (if @axes().x?.frame?[1] then @axes().x.frame[1] else domain.x[1])
      ]
      yframe = [
        (if @axes().y?.frame?[0] then @axes().y.frame[0] else domain.y[0])
        (if @axes().y?.frame?[1] then @axes().y.frame[1] else domain.y[1])
      ]

      @x = d3.scale.linear()
        .domain(xframe)
        .range([rangeStart || 0, rangeEnd || @width()])
      @y = d3.scale.linear()
        .domain(yframe)
        .range([@height(), 0])
      @y.magnitude = d3.scale.linear()
        .domain([domain.y[0] - domain.y[0], domain.y[1] - domain.y[0]])
        .range([0, @height()])
      @y0 = @y


  axes: (args) ->
    return @axesList unless args

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
        console.log("ERROR:#{args.dimension} is not currently implemented")

  # Used by range slider
  dataDomain: ->
    # take from the first series
    data = @renderers[0].series.stack
    [data[0].x, data.slice(-1).shift().x]

  stackData: ->
    # Read more about stacking data here:
    # https://github.com/mbostock/d3/wiki/Stack-Layout
    seriesData = @series.active().map((d) => @_data.map(d.dataTransform))
    layout = d3.layout.stack()
    layout.offset(@offset)
    @stackedData = layout(seriesData)


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

  stackTransition: (transitionSpeed)=>
    # Probably we'll want other types soon too
    _.each(@renderersByType('column'), (r) -> r.stackTransition())
    _.each(@renderersByType('area'), (r) -> r.stackTransition())
    @render(transitionSpeed)

  unstackTransition: (transitionSpeed)=>
    _.each(@renderersByType('column'), (r) -> r.unstackTransition())
    _.each(@renderersByType('area'), (r) -> r.unstackTransition())
    @render(transitionSpeed)

  #############################################################################
  # expose public variables
  #############################################################################

  element: (val) ->
    return @_element unless val
    @_element = val
    @_setupCanvas()
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

    @vis = @_findOrAppend(what: 'g', in: @svg)
      .attr("transform", "translate(#{@margin.left},#{@margin.top})")

    @vis = @_findOrAppend(what: 'g', in: @vis)
      .attr("class", "outer-canvas")
      .attr("width", @marginedWidth)
      .attr("height", @marginedHeight)

    # this is the canvas on which all data should be drawn
    @vis = @_findOrAppend(what: 'g', in: @vis)
      .attr("transform", "translate(#{@padding.left},#{@padding.top})")
      .attr("class", "inner-canvas")

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
    _.any(@renderers, (r) -> r.name == 'column')

  _allRenderersCartesian: ->
    _.every(@renderers, (r) -> r.cartesian is true)

  _allSeriesDisabled: ->
    _.every(@series.array, (s) -> s.disabled is true)
