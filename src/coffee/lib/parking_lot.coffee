
# what the fuck are these?
offset: 'zero'
min: undefined
max: undefined
_lastYTranslate: 0






discoverRange: =>
  xDomain = []
  yDomain = []
  y1Domain = []
  _.each @renderers, (renderer) =>
    if renderer.cartesian
      domain = renderer.domain()
      xDomain = domain.x if xDomain.length is 0
      yDomain = domain.y if yDomain.length is 0
      xDomain[0] = domain.x[0] if xDomain[0] > domain.x[0]
      xDomain[1] = domain.x[1] if xDomain[1] < domain.x[1]
      yDomain[0] = domain.y[0] if yDomain[0] > domain.y[0]
      yDomain[1] = domain.y[1] if yDomain[1] < domain.y[1]
      unless renderer.series.ofDefaultAxis()
        y1Domain = [0, d3.max(@series.ofAlternateScale().flat('y'))] if y1Domain.length is 0


  unless @availableXFrame then @_autoSetAvailableXFrame = true
  unless @availableYFrame then @_autoSetAvailableYFrame = true
  unless @availableY1Frame then @_autoSetAvailableY1Frame = true

  if @_autoSetAvailableXFrame then @availableXFrame = xDomain

  if @_autoSetAvailableYFrame
    min = yDomain[0]
    max = yDomain[1]
    if yDomain[0] > 0 and yDomain[1] > 0 then min = 0
    if yDomain[0] < 0 and yDomain[1] < 0 then max = 0
    @availableYFrame = [min + min*0.1, max + max*0.1]

  if @_autoSetAvailableY1Frame
    min = y1Domain[0]
    max = y1Domain[1]
    if y1Domain[0] > 0 and y1Domain[1] > 0 then min = 0
    if y1Domain[0] < 0 and y1Domain[1] < 0 then max = 0
    @availableY1Frame = [min + min*0.1, max + max*0.1]

  if _.isNaN(@x.domain()[0]) or _.isNaN(@x.domain()[1])
    @x.domain(@availableXFrame)

  if _.isNaN(@y.domain()[0]) or _.isNaN(@y.domain()[1]) or @autoScale
    @y.domain(@availableYFrame)
    @y.magnitude.domain([0, @availableYFrame[1] - @availableYFrame[0]])

  if _.isNaN(@y1.domain()[0]) or _.isNaN(@y1.domain()[1]) or @autoScale
    @y1.domain(@availableY1Frame)
    @y1.magnitude.domain([0, @availableY1Frame[1] - @availableY1Frame[0]])

  @

yMin: (yMin) ->
  return @min unless yMin
  @min = yMin
  @


# Used by range slider
dataDomain: ->
  # take from the first series
  data = @renderers[0].series.stack
  [data[0].x, data.slice(-1).shift().x]

