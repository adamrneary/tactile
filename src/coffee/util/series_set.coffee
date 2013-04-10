Tactile.SeriesSet = class SeriesSet
  constructor: (@array = [], @graph) ->
    @_exposeArray()

  active: =>
    @filter (s) ->
      not s.disabled

  filter: (f) ->
    @array.filter(f)

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

  map: (f) =>
    @array.map(f)

  forEach: (f) =>
    @array.forEach(f)


  disableAll: ->
    _.each @array, (s) ->
      s.disable()