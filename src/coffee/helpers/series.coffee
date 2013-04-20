class Tactile.Series
  constructor: (options = {}) ->
    defaults =
      dataTransform: (d) -> d
      yAxis: 'y'

    _.defaults options, defaults
    _.each options, (val, key) =>
      @[key] = val

  ofDefaultAxis: ->
    @yAxis is 'y'

  disable: ->
    @disabled = true

  enable: ->
    @disabled = false

  toggle: ->
    @disabled = not @disabled
