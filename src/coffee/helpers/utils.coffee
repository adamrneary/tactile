class Tactile.Utils
  @log: (m) ->
    return unless Tactile.debug is true
    console.log m

  @warn: (m) ->
    return unless Tactile.debug is true
    console.warn m

  # similar in spirit to d3.functor()
  # https://github.com/mbostock/d3/wiki/Internals
  ourFunctor: () ->
    if typeof arguments[0] is 'function'
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