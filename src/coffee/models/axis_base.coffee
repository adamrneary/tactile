class Tactile.AxisBase
  constructor: (@options) ->
    @graph = options.graph
    @utils = new Tactile.Utils()
    @ticksTreatment = options.ticksTreatment or "plain"
    @frame = options.frame

    @marginForBottomTicks = 10

    @handleBottomPadding()
    @handleSidePadding()


  # TODO: this are almost identical across the axis classes.
  _mouseMove: =>
    return if isNaN(@down)
    p = d3.svg.mouse(@graph.svg.node())
    d3.select("body").style("cursor", if @horizontal then "ew-resize" else "ns-resize")
    axis = @graph[@options.axis]

    rup = axis.invert(if @horizontal then p[0] else p[1])
    axis1 = axis.domain()[0]
    axis2 = axis.domain()[1]
    extent = axis2 - axis1

    if rup - axis1 isnt 0
      change = @down / rup
      new_domain = [axis1, axis1 + (extent * change)]
      new_domain = [axis1, axis1 + extent*(@down - axis1)/(rup - axis1)]
      axis.domain(new_domain)

    @graph.render(0, zooming: true)

    d3.event.preventDefault()
    d3.event.stopPropagation()


  handleBottomPadding: (destroy = false) ->
    return unless @horizontal
    if destroy
      @graph.axisPadding.bottom -= 25
      @graph.axisPadding.right -= 30
    else
      @graph.axisPadding.bottom += 25
      @graph.axisPadding.right += 30

    @graph.setSize(height: @graph.outerHeight, width: @graph.outerWidth)

  handleSidePadding: (destroy = false) ->
    return if @horizontal
    side = if @options.axis is 'y' then 'left' else 'right'
    # TODO: would be great if this could change according to the legth of the labels
    if destroy
      @graph.axisPadding[side] -= 50
      @graph.axisPadding.bottom -= 5
      @graph.axisPadding.top -= 5
    else
      @graph.axisPadding[side] += 50
      @graph.axisPadding.bottom += 5
      @graph.axisPadding.top += 5

    @graph.setSize(height: @graph.outerHeight, width: @graph.outerWidth)


  _axisDrag: =>
    p = d3.svg.mouse(@graph.svg.node())
    @down = if @horizontal then @graph[@options.axis].invert(p[0]) else @graph[@options.axis].invert(p[1])
    d3.event.preventDefault()
    d3.event.stopPropagation()

  _mouseUp: =>
    return if isNaN(@down)
    @down = Math.NaN;
    @graph.manipulateCallbacks.forEach (callback) ->
      callback()
    d3.event.preventDefault()
    d3.event.stopPropagation()

  destroy: ->
    @handleBottomPadding(true)
    @handleSidePadding(true)
    @g.remove()
    delete @graph.axesList[@options.axis]