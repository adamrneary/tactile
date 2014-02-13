class Tactile.AxisBase
  constructor: (@options) ->

    # TODO: We need to work with the manual domain concept
    @utils = new Tactile.Utils()
    @graph = options.graph
    @ticksTreatment = options.ticksTreatment or "plain"
    @fontSize  = if _.indexOf(@ticksTreatement, "small") != -1 then 10 else 12
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

#    @graph.render(0, zooming: true)
    @graph.render(0)

    d3.event.preventDefault()
    d3.event.stopPropagation()


  handleBottomPadding: (destroy = false) ->
    return unless @horizontal

    if destroy
      @graph.axisPadding.left = 0
      @graph.axisPadding.right = 0
      @graph.axisPadding.bottom = 0
      @graph.axisPadding.top = 0
    else
      @graph.axisPadding.bottom = 30 if @graph.axisPadding.bottom < 30
      @graph.axisPadding.right = 15 if @graph.axisPadding.right < 15

    @graph.setSize(height: @graph.outerHeight, width: @graph.outerWidth)

  handleSidePadding: (destroy = false) ->
    return if @horizontal
    side = if @options.axis is 'y' then 'left' else 'right'

      # TODO: would be great if this could change according to the legth of the labels
    if destroy
      @graph.axisPadding.left = 0
      @graph.axisPadding.right = 0
      @graph.axisPadding.bottom = 0
      @graph.axisPadding.top = 0
    else
      @graph.axisPadding[side] = 35 if (@graph.axisPadding[side] < 35 && side == "right")
      @graph.axisPadding[side] = 55 if (@graph.axisPadding[side] < 55 && side == "left")
      @graph.axisPadding.bottom = 5 if (@graph.axisPadding.bottom < 5)
      @graph.axisPadding.top = 5 if (@graph.axisPadding.bottom < 5)

    @graph.setSize(height: @graph.outerHeight, width: @graph.outerWidth)


  _axisDrag: =>
#    p = d3.svg.mouse(@graph.svg.node())
#    @down = if @horizontal then @graph[@options.axis].invert(p[0]) else @graph[@options.axis].invert(p[1])
#    d3.event.preventDefault()
#    d3.event.stopPropagation()

  _mouseUp: =>
#    return if isNaN(@down)
#    @down = Math.NaN;
#    @graph.manipulateCallbacks.forEach (callback) ->
#      callback()
#    d3.event.preventDefault()
#    d3.event.stopPropagation()

  destroy: ->
    @handleBottomPadding(true)
    @handleSidePadding(true)
    @g.remove()
    delete @graph.axesList[@options.axis]









    # TODO: move away to a separate class. Zoomable or sth.
    _checkXDomain: =>
      min = @x.domain()[0]
      max = @x.domain()[1]

      min = @availableXFrame[0] if min < @availableXFrame[0]
      min = @availableXFrame[1] if min > @availableXFrame[1]

      max = @availableXFrame[1] if max > @availableXFrame[1]
      max = @availableXFrame[1] if max < @availableXFrame[0]

      minXFrame = @utils.ourFunctor(@minXFrame, [min, max])
      if max - min < minXFrame
        middle = (max + min) / 2
        middle = @availableXFrame[1] - minXFrame / 2 if middle + minXFrame / 2 > @availableXFrame[1]
        middle = @availableXFrame[0] + minXFrame / 2 if middle - minXFrame / 2 < @availableXFrame[0]
        min = middle - minXFrame / 2
        max = middle + minXFrame / 2

      maxXFrame = @utils.ourFunctor(@maxXFrame, [min, max])
      if max - min > maxXFrame
        middle = (max + min) / 2
        middle = @availableXFrame[1] - maxXFrame / 2 if middle + maxXFrame / 2 > @availableXFrame[1]
        middle = @availableXFrame[0] + maxXFrame / 2 if middle - maxXFrame / 2 < @availableXFrame[0]
        min = middle - maxXFrame / 2
        max = middle + maxXFrame / 2

      @axes().x?.frame = [min, max]
      @x.domain([min, max])

    _checkYDomain: =>
      min = @y.domain()[0]
      max = @y.domain()[1]

      min = @availableYFrame[0] if min < @availableYFrame[0]
      min = @availableYFrame[1] if min > @availableYFrame[1]

      max = @availableYFrame[1] if max > @availableYFrame[1]
      max = @availableYFrame[1] if max < @availableYFrame[0]

      minYFrame = @utils.ourFunctor(@minYFrame, [min, max])
      if max - min < minYFrame
        middle = (max + min) / 2
        middle = @availableYFrame[1] - minYFrame / 2 if middle + minYFrame / 2 > @availableYFrame[1]
        middle = @availableYFrame[0] + minYFrame / 2 if middle - minYFrame / 2 < @availableYFrame[0]
        min = middle - minYFrame / 2
        max = middle + minYFrame / 2

      maxYFrame = @utils.ourFunctor(@maxYFrame, [min, max])
      if max - min > maxYFrame
        middle = (max + min) / 2
        middle = @availableYFrame[1] - maxYFrame / 2 if middle + maxYFrame / 2 > @availableYFrame[1]
        middle = @availableYFrame[0] + maxYFrame / 2 if middle - maxYFrame / 2 < @availableYFrame[0]
        min = middle - maxYFrame / 2
        max = middle + maxYFrame / 2

      @axes().y?.frame = [min, max]
      @y.domain([min, max])

    _checkY1Domain: =>
      min = @y1.domain()[0]
      max = @y1.domain()[1]

      return unless @availableY1Frame
      min = @availableY1Frame[0] if min < @availableY1Frame[0]
      min = @availableY1Frame[1] if min > @availableY1Frame[1]

      max = @availableY1Frame[1] if max > @availableY1Frame[1]
      max = @availableY1Frame[1] if max < @availableY1Frame[0]

      minY1Frame = @utils.ourFunctor(@minY1Frame, [min, max])
      if max - min < minY1Frame
        middle = (max + min) / 2
        middle = @availableY1Frame[1] - minY1Frame / 2 if middle + minY1Frame / 2 > @availableY1Frame[1]
        middle = @availableY1Frame[0] + minY1Frame / 2 if middle - minY1Frame / 2 < @availableY1Frame[0]
        min = middle - minY1Frame / 2
        max = middle + minY1Frame / 2

      maxY1Frame = @utils.ourFunctor(@maxY1Frame, [min, max])
      if max - min > maxY1Frame
        middle = (max + min) / 2
        middle = @availableY1Frame[1] - maxY1Frame / 2 if middle + maxY1Frame / 2 > @availableY1Frame[1]
        middle = @availableY1Frame[0] + maxY1Frame / 2 if middle - maxY1Frame / 2 < @availableY1Frame[0]
        min = middle - maxY1Frame / 2
        max = middle + maxY1Frame / 2

      @axes().y1?.frame = [min, max]
      @y1.domain([min, max])

    _calculateXRange: =>
      if @_containsColumnChart()
        renders = _.filter(@renderers, (r) -> r.name == 'column' or r.name == 'waterfall')

        lastRange = @width()
        dR = lastRange / 2
        loop
          @x.range([0, lastRange])
          barWidth = renders[0].seriesWidth()
          break if Math.abs(@width() - lastRange - barWidth) < 3
          if @width() - lastRange - barWidth > 0
            lastRange += dR
          else
            lastRange -= dR
          dR = dR / 2

        barWidth = renders[0].seriesWidth() / 2
        rangeStart = barWidth
        rangeEnd = @width() - barWidth

      @x.range([rangeStart || 0, rangeEnd || @width()])
