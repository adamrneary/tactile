class Tactile.RendererBase
  defaults:
    cartesian: true
    tension: 0.95
    strokeWidth: 3
    unstack: true
    dotSize: 5
    opacity: 1

    stroke: false
    fill: false

  constructor: (options = {}) ->
    @graph = options.graph
    @tension = options.tension or @tension
    @configure options
    # call constructor of inherited renderers
    @initialize?(options)
    @utils = new Tactile.Utils()

  seriesPathFactory: ->
    #implement in subclass

  seriesStrokeFactory: ->
    # implement in subclass

  domain: ->
    values = []
    stackedData = @graph.stackedData or @graph.stackData()
    topSeriesData = (
      if @unstack then stackedData else [stackedData.slice(-1).shift()]
    )
    topSeriesData.forEach (series) =>
      if @name is "waterfall"
        series.forEach (d) =>
          values.push d.y + d.y00
      else
        series.forEach (d) =>
          # if we don't stack data we don't want to sum up the values
          # as this causes the viewed window to be way to large
          # for example if you have x:1, y:20 and
          # x1, y:10 y-axis will show up to y=30
          if @unstack
            values.push d.y
          else
            values.push d.y + d.y0

    if stackedData[0].length == 0
      return { x: [0, 0], y: [0, 0] }

    xMin = stackedData[0][0].x
    xMax = stackedData[0][stackedData[0].length - 1].x
    yMin = (if @graph.min is "auto" then d3.min(values) else @graph.min or 0)
    yMax = @graph.max or d3.max(values)

    { x: [xMin, xMax], y: [yMin, yMax] }

  yFunction: ->
    @graph[@series.yAxis]

  render: (transition)=>
    @transition = transition if transition
    if (@series.disabled)
      line = @seriesCanvas().selectAll("path.line")
      .data([@series.stack])
      .remove()
      return
    # drawing line by default
    line = @seriesCanvas().selectAll("path.baseline")
      .data([@series.stack])

    line.enter().append("svg:path")
      .attr("clip-path","url(#clip)")
      .attr("fill", (if @fill then @series.color else "none"))
      .attr("stroke", (if @stroke then @series.color else "none"))
      .attr("stroke-width", @strokeWidth)
      .style('opacity', @opacity)
      .attr("class", "baseline #{@series.className or ''}
       #{if @series.color then '' else 'colorless'}")

    @transition.selectAll("##{@_nameToId()} path.baseline")
      .attr("d", @seriesPathFactory())

  # Creates separate g element for each series.
  # This gives us better control over each paths/rets/circles
  # for a particular series data.
  # If we had all paths in a single node and want to do
  # selectAll('path') to add new path you would modify
  # all the paths, not the only ones attached to the current series,
  # which is very not desired.
  seriesCanvas: ->
    @_seriesCanvas ||= @graph.vis
      .selectAll("g##{@_nameToId()}")
      .data([@series.stack])
      .enter()
      .append("g")
      .attr("clip-path", "url(#scatter-clip)")
      .attr('id', @_nameToId())
      .attr('class', @name)

    @_seriesCanvas

  configure: (options) ->
    # merge base defaults with particular renderer's
    defaults = _.extend {}, @defaults, @specificDefaults if @specificDefaults?
    options = _.extend {}, defaults, options
    _.each options, (val, key) =>
      @[key] = val

  _nameToId: ->
    #TODO: handle empty name
    @series.name?.replace(/[^\w]/g, '-').toLowerCase()

