class Tactile.Utils

  # similar in spirit to d3.functor()
  # https://github.com/mbostock/d3/wiki/Internals
  ourFunctor: () ->
    if typeof arguments[0] is 'function'
      arguments[0].apply(null, _.toArray(arguments).slice(1))
    else
      arguments[0]

  checkString: (str, strName) ->
    check = true

    if typeof str isnt "string"
      console.warn("Tactile error: '#{strName}' invalid type") if typeof str isnt "string"
      check = false
    else if !$.trim(str)
      console.warn("Tactile error: '#{strName}' empty")
      check = false

    check

  checkNumber: (num, numName) ->
    check = true

    if typeof num isnt "number"
      console.warn("Tactile error: '#{numName}' invalid type")
      check = false

    check

  checkArray: (arr, arrName) ->
    check = true
    if !_.isArray(arr)
      console.warn("Tactile error: '#{arrName}' invalid type")
      check = false

    check

  checkFunction: (func, funcName) ->
    check = true
    if !_.isFunction(func)
      console.warn("Tactile error: '#{funcName}' invalid type")
      check = false

    check

  checkObject: (obj, objName) ->
    check = true
    if typeof str isnt "object"
      console.warn("Tactile error: '#{objName}' invalid type")
      check = false

    check