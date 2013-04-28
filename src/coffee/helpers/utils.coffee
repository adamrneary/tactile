class Tactile.Utils

  # similar in spirit to d3.functor()
  # https://github.com/mbostock/d3/wiki/Internals
  ourFunctor: () ->
    if typeof arguments[0] is 'function'
      arguments[0].apply(null, _.toArray(arguments).slice(1))
    else
      arguments[0]

  checkString: (str, strName) ->
    throw new Error("Tactile error: '#{strName}' invalid type") if typeof str isnt "string"
    throw new Error("Tactile error: '#{strName}' empty") unless  $.trim(str)




