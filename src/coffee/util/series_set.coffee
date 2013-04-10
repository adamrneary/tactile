Tactile.SeriesSet = class SeriesSet
  constructor: (@array = [], @graph) ->
    @_exposeArray()

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
    new SeriesSet @array.filter(f), @graph

  add: (newSeries, overwrite = false) ->
    if overwrite
      @array = new SeriesSet(newSeries)
      @graph.renderers = []
    else
      @array = @array.concat(newSeries)

    @_exposeArray()

  # sometimes, in the chart code we want to access particular series like SeriesSet was an array
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