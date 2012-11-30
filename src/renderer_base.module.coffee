module.exports = class RendererBase

  defaults:
    cartesian: true
    tension: 0.95
    strokeWidth: 3
    unstack: true
    
    # An object containing any of top, right, bottom, and left properties specifying padding 
    # around the extrema of the data in the graph. Defaults to 0.01 on top for 1% padding, 2% on bottom and 0 on other sides.
    padding:
      top: 0.01
      right: 0
      bottom: 0.02
      left: 0

    stroke: false
    fill: false

  constructor: (options = {}) ->
    @graph = options.graph
    @tension = options.tension or @tension
    @configure options
    # call constructor of inherited renderers
    @initialize?(options)

  seriesPathFactory: ->
    #implement in subclass

  seriesStrokeFactory: ->
    # implement in subclass

  domain: ->
    values = []
    stackedData = @graph.stackedData or @graph.stackData()
    topSeriesData = (if @unstack then stackedData else [stackedData.slice(-1).shift()])
    topSeriesData.forEach (series) =>
      series.forEach (d) =>
        # if we don't stack data we don't want to sum up the values
        # as this causes the viewed window to be way to large
        # for example if you have x:1, y:20 and x1, y:10 y-axis will show up to y=30
        if @unstack
          values.push d.y
        else
          values.push d.y + d.y0
          
    xMin = stackedData[0][0].x
    xMax = stackedData[0][stackedData[0].length - 1].x
    xMin -= (xMax - xMin) * @padding.left
    xMax += (xMax - xMin) * @padding.right
    
    yMin = (if @graph.min is "auto" then d3.min(values) else @graph.min or 0)
    yMax = @graph.max or d3.max(values)
    yMin -= (yMax - yMin) * @padding.bottom if @graph.min is "auto" or yMin <= 0
    yMax += (yMax - yMin) * @padding.top if _.isUndefined(@graph.max)

    { x: [xMin, xMax], y: [yMin, yMax] }
    
    
  render: ->
    # drawing line by default
    @graph.vis.selectAll("path")
      .data([@series.stack])
      .enter()
      .append("svg:path")
      .attr("fill", (if @fill then @series.color else "none"))
      .attr("stroke", (if @stroke then @series.color else "none"))
      .attr("stroke-width", @strokeWidth)
      .attr("class", @series.className)
      .attr("d", @seriesPathFactory())
    
  configure: (options) ->
    # merge base defaults with particular renderer's
    defaults = _.extend {}, @defaults, @specificDefaults if @specificDefaults?
    options = _.extend {}, defaults, options
    _.each options, (val, key) =>
      @[key] = val
