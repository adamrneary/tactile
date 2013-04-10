Tactile.Series = class Series
  constructor: (options = {}) ->
    defaults =
      dataTransform: (d) -> d
      scaleAxis: 'y'

    _.defaults options, defaults
    _.each options, (val, key) =>
      @[key] = val

  ofDefaultScale: ->
    @scaleAxis is 'y'

  disable: ->
    @disabled = true

  enable: ->
    @disabled = false

  toggle: ->
    @disabled = not @disabled
