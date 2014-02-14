class Tactile.SeriesSet

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



  constructor: (chart, series = []) ->
    @_chart = chart
    @_series = series

  get: ->
    @_series

  set: (series, concat = false) ->
    if concat
      @_series.concat series
    else
    @_series = series

  isEmpty: ->
    _.isEqual @_series, []



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
      r.animateShowHide = @animateShowHide
      @renderers.push r



  plugDefault: ->


  allStackable: ->



  active: =>
    @filter (s) ->
      not s.disabled

  ofDefaultAxis: ->
    @filter (s) ->
      s.ofDefaultAxis()

  ofAlternateScale: ->
    @filter (s) ->
      not s.ofDefaultAxis()

  filter: (f) ->
    new Tactile.SeriesSet @array.filter(f), @graph

  length: () =>
    @array.length

  add: (vals, overwrite = false) ->

    # Convert passed objects to Series objects
    newSeries = _.map(vals, (options) -> new Tactile.Series(options))

    if overwrite
      @array = newSeries
      @graph.clearRenderers()

    else
      @array = @array.concat(newSeries)

    @_exposeArray()

    # TODO: This just got copied. It needs to be dealt with.
    # only init the renderers for just added series
    # TODO: Refactor this into series/renderer constructor
    @initRenderers(newSeries)


  # sometimes, in the chart code we want to access particular series like SeriesSet was an array
  # TODO: Probably legacy?!
  _exposeArray: ->
    _.each @array, (val, key) =>
      @[key] = val


  # Extracts passed `key` values of all arrays into a single one. For example:
  # s1: {x:2, y:33}, s2: {x0: y: 11}
  # flat('y') gives:
  # [33,11]
  # Note that this works with using of dataTransform on the @graph._data
  flat: (key) ->
    transformed = _.flatten(@array.map((s) => @graph._data.map(s.dataTransform)), true)
    transformed.map (d) ->
      d[key]


  map: (f) =>
    @array.map(f)

  forEach: (f) =>
    @array.forEach(f)

  disableAll: ->
    _.each @array, (s) ->
      s.disable()


  _hasDifferentRenderers: ->
    _.uniq(_.map(@series.array, (s) -> s.renderer)).length > 1

  _containsColumnChart: ->
    _.any(@renderers, (r) -> r.name == 'column' or r.name == 'waterfall')

  _allRenderersCartesian: ->
    _.every(@renderers, (r) -> r.cartesian is true)

  _allSeriesDisabled: ->
    _.every(@series.array, (s) -> s.disabled is true)

