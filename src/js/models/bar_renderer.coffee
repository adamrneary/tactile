Tactile.BarRenderer = class BarRenderer extends RendererBase
  name: "bar"

  specificDefaults:
    gapSize: 0.15
    tension: null
    round: true

  render: ->
    barWidth = @barWidth()
    barXOffset = 0
    activeSeriesCount = @graph.series.filter((s) -> not s.disabled).length
    seriesBarWidth = if @unstack and not @series.wide then (barWidth / activeSeriesCount) else barWidth

    transform = (d) ->
      # add a matrix transform for negative values
      matrix = [1, 0, 0, ((if d.y < 0 then -1 else 1)), 0, ((if d.y < 0 then @graph.y.magnitude(Math.abs(d.y)) * 2 else 0))]
      "matrix(" + matrix.join(",") + ")"
  
    return if (@series.disabled)

    edgeRatio = if @series.round then Math.round(0.05783 * seriesBarWidth + 1) else 0
      
    # if we want to display stacked bars y should be added y0 value  
    yValue = (d) =>
      if @unstack
        (@graph.y(Math.abs(d.y))) * ((if d.y < 0 then -1 else 1))
      else
        (@graph.y(d.y0 + Math.abs(d.y))) * ((if d.y < 0 then -1 else 1))
        
    # center the bar if we have more than one type of renderers
    if @graph._hasDifferentRenderers()
      barXOffset -= seriesBarWidth / 2    
    
    nodes = @graph.vis.selectAll("path").data(@series.stack).enter()
      .append("svg:rect")
      .attr("x", (d) => @graph.x(d.x) + barXOffset)
      .attr("y", yValue)
      .attr("width", seriesBarWidth)
      .attr("height", (d) => @graph.y.magnitude Math.abs(d.y))
      .attr("transform", transform)
      .attr("class", 'bar')
      .attr("fill", @series.color)
      .attr("rx", edgeRatio)
      .attr("ry", edgeRatio)

    barXOffset += seriesBarWidth if @unstack
        
        
  barWidth: ->
    stackedData = @graph.stackedData or @graph.stackData()
    data = stackedData.slice(-1).shift()
    frequentInterval = @_frequentInterval()
    barWidth = @graph.x(data[0].x + frequentInterval.magnitude * (1 - @gapSize))
    barWidth

  initialize: (options = {}) ->
    @gapSize = options.gapSize || @gapSize
    
  domain: ->
    domain = super()
    # Domain is overriden by the bar_renderer to make all of the bars visible 
    # in the chart container. This is however, undesired when we render stuff 
    # of different types in one chart. We need all rendered charts to be drawn 
    # with same domain.
    # TODO: if it's possible, move this logic to the bar_renderer render method
    return domain if @graph._hasDifferentRenderers()
    
    frequentInterval = @_frequentInterval()
    domain.x[1] += parseInt(frequentInterval.magnitude)
    domain
  
  
  # iterates trough the current data and computes most frequent interval between each data entry
  # so if x's are 1,2,3,4,5 the most frequent interval will be equal to 1
  # used to evaluate the bar width
  _frequentInterval: ->
    stackedData = @graph.stackedData or @graph.stackData()
    data = stackedData.slice(-1).shift()
    intervalCounts = {}
    i = 0

    while i < data.length - 1
      interval = data[i + 1].x - data[i].x
      intervalCounts[interval] = intervalCounts[interval] or 0
      intervalCounts[interval]++
      i++
      
    frequentInterval = count: 0
    
    _.keys(intervalCounts).forEach (i) ->
      if frequentInterval.count < intervalCounts[i]
        frequentInterval =
          count: intervalCounts[i]
          magnitude: i

    # no need to compute this again
    @_frequentInterval = ->
      frequentInterval

    frequentInterval
