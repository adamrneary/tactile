class Tactile.Utils
  @log: (m) ->
    return unless Tactile.debug is true
    console.log m

  @warn: (m) ->
    return unless Tactile.debug is true
    console.warn m

  # A note about out "Functor" strategy:
  #
  # In order to create truly data-driven interactive charts, we want to be able
  # to allow to not only configure charts in advance, but also to be able to
  # configure charts using the data itself.
  #
  # To achieve this, we need to be able to pass functions to the same methods
  # that we would pass static values. ourFunctor() provides a simple, reusable
  # mechanism to support this. Quite simply, if the first argument is a static
  # value, it returns it. If the first argument is a function, it applies any
  # subsequent arguments to that function and returns the result
  #
  # similar in spirit to d3.functor()
  # https://github.com/mbostock/d3/wiki/Internals
  #
  # Example:
  # chartSeriesA =
  #   name: "Actual"
  #   tooltip: "Actual"
  #
  # chartSeriesB =
  #   name: "Actual"
  #   tooltip: (d) ->
  #     "#{d.value} is fantastic!"
  #
  # In the above example, you can see that tooltip accepts a string or a
  # function. If a function, it will apply the function to the data point in
  # order to return a string.
  ourFunctor: () ->
    switch typeof arguments[0]
      when undefined
        undefined
      when 'function'
        arguments[0].apply(null, _.toArray(arguments).slice(1))
      else
        arguments[0]

  checkString: (str, strName, d) ->
    check = true

    if typeof str isnt "string"
      Tactile.Utils.warn("Tactile error: '#{strName}' invalid type: #{str}, string expected")
      Tactile.Utils.log d if d?
      check = false
    else if !$.trim(str)
      Tactile.Utils.warn("Tactile error: '#{strName}' empty")
      check = false

    check

  checkNumber: (num, numName, d) ->
    check = true

    if typeof num isnt "number"
      Tactile.Utils.warn("Tactile error: '#{numName}' invalid type: #{num}, number expected")
      Tactile.Utils.log d if d?
      check = false

    check

  checkArray: (arr, arrName, d) ->
    check = true
    if !_.isArray(arr)
      Tactile.Utils.warn("Tactile error: '#{arrName}' invalid type: #{arr}, array expected")
      Tactile.Utils.log d if d?
      check = false

    check

  checkFunction: (func, funcName, d) ->
    check = true
    if !_.isFunction(func)
      Tactile.Utils.warn("Tactile error: '#{funcName}' invalid type: #{func}, function expected")
      Tactile.Utils.log d if d?
      check = false

    check

  checkObject: (obj, objName, d) ->
    check = true
    if typeof str isnt "object"
      Tactile.Utils.warn("Tactile error: '#{objName}' invalid type: #{obj}, object expected")
      Tactile.Utils.log d if d?
      check = false

    check

  aggregateData: (data, domain) ->
    xDomain = domain
    data = _.filter data, (d)->
      d.x >= xDomain[0] and d.x <= xDomain[1]

    aggdata = []
    range = data.length

    if range <= 12
      for i in [0 .. range - 1]
        tmp = {}
        tmp.x   = i
        tmp.y   = data[i].y
        tmp.y0  = data[i].y0
        tmp.y00 = data[i].y00
        tmp.range = [data[i].x, data[i].x]
        aggdata.push tmp
      return aggdata

    else if 12 < range <= 36
      grouper = 3
      #      @dinGapSize = @gapSize / grouper
      index = 0
      for i in [0 .. range - 1] by grouper
        tmp = {}
        start = i
        end   = i + grouper - 1
        end = range - 1 if end > range - 1

        #        tmp.x = data[start].x + (data[end].x - data[start].x)/2
        tmp.x = index
        tmp.y   = 0
        tmp.y0  = 0
        tmp.y00 = 0

        _.each data.slice(start, end + 1), (item)->
          tmp.y   = tmp.y   + item.y
          tmp.y0  = tmp.y0  + item.y0
          tmp.y00 = tmp.y00 + item.y00
        tmp.range = [data[start].x, data[end].x]
        index = index + 1
        aggdata.push tmp
      return aggdata
    else
      grouper = 12
      #      @dinGapSize = @gapSize / grouper
      index = 0
      for i in [0 .. range - 1] by grouper
        tmp = {}
        start = i
        end   = i + grouper - 1
        end = range - 1 if end > range - 1

        #        tmp.x = data[start].x + (data[end].x - data[start].x)/2
        tmp.x = index
        tmp.y   = 0
        tmp.y0  = 0
        tmp.y00 = 0
        _.each data.slice(start, end + 1), (item)->
          tmp.y   = tmp.y   + item.y
          tmp.y0  = tmp.y0  + item.y0
          tmp.y00 = tmp.y00 + item.y00
        tmp.range = [data[start].x, data[end].x]
        index = index + 1
        aggdata.push tmp
      return aggdata