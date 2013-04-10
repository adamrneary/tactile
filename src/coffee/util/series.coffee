Tactile.Series = class Series
  constructor: (options = {}) ->
    defaults =
      dataTransform: (d) -> d
    _.defaults options, defaults
    _.each options, (val, key) =>
      @[key] = val


  disable: ->
    @disabled = true

  enable: ->
    @disabled = false

  toggle: ->
    @disabled = not @disabled
