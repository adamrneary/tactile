class Tactile.RendererBase
  defaults:
    cartesian: true
    tension: 0.95
    strokeWidth: 3
    unstack: true
    dotSize: 5
    opacity: 1
    checkData: false

    stroke: false
    fill: false

  constructor: (options = {}) ->
    @utils = new Tactile.Utils()
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

    xMin = _.min(stackedData[0], (d)-> d.x).x
    xMax = _.max(stackedData[0], (d)-> d.x).x
    yMin = (if @graph.min is "auto" then d3.min(values) else @graph.min or 0)
    yMax = @graph.max or d3.max(values)

    domain = { x: [xMin, xMax], y: [yMin, yMax] }

    if _.some(_.values(@graph.aggregated))
      values = []
      data = @utils.aggregateData @series.stack, @graph.x.domain()
      _.each data, (d) =>
        if @series.renderer is 'waterfall'
          values.push d.y + d.y00
        else if @unstack
          values.push d.y
        else
          values.push d.y + d.y0

      if data.length == 0
        return domain

      yMin = (if @graph.min is "auto" then d3.min(values) else @graph.min or 0)
      yMax = @graph.max or d3.max(values)

      domain.y = [yMin, yMax]
    domain

  yFunction: ->
    @graph[@series.yAxis]

  yFunctionOld: ->
    @graph[@series.yAxis+"Old"]

  render: (transition, recalculateData, transitionSpeed) =>
    @_checkData() if @checkData

    if (@series.disabled)
      @seriesCanvas().selectAll("path.baseline")
        .data([@aggdata])
        .remove()
      return

    @transition = transition if transition
    if (@series.disabled)
      line = @seriesCanvas().selectAll("path.line")
        .data([@aggdata])
        .remove()
      return
    # drawing line by default

    # filter out the values with undefined x or y's
    # saves the line plot from having holes
    @series.stack = @series.stack.filter (el) => @_filterNaNs(el, 'x', 'y')
    line = @seriesCanvas().selectAll("path.baseline")
      .data([@aggdata])

    line.enter().append("svg:path")
      .attr("clip-path","url(#clip)")
      .attr("fill", (if @fill then @series.color else "none"))
      .attr("stroke", (if @stroke then @series.color else "none"))
      .attr("stroke-width", @strokeWidth)
      .style('opacity', @opacity)
      .attr("class", "baseline #{@series.className or ''}
       #{if @series.color then '' else 'colorless'}")

    if transition then selectObjects = transition.selectAll(".#{@_nameToId()} path.baseline")
    else selectObjects = @seriesCanvas().selectAll("path.baseline")
    selectObjects
      .attr("d", @seriesPathFactory())

  # Creates separate g element for each series.
  # This gives us better control over each paths/rets/circles
  # for a particular series data.
  # If we had all paths in a single node and want to do
  # selectAll('path') to add new path you would modify
  # all the paths, not the only ones attached to the current series,
  # which is very not desired.
  seriesCanvas: ->
    @graph.vis?.selectAll("g.#{@_nameToId()}")
      .data([@aggdata])
      .enter()
      .append("g")
      .attr("clip-path", "url(#scatter-clip)")
      .attr('class', @_nameToId() + " " + @name)

    @graph.vis?.selectAll("g.#{@_nameToId()}")

  seriesDraggableCanvas: ->
    @graph.draggableVis?.selectAll("g.#{@_nameToId()}")
      .data([@aggdata])
      .enter()
      .append("g")
      .attr("clip-path", "url(#scatter-clip)")
      .attr('class', @_nameToId() + " " + @name)

    @graph.draggableVis?.selectAll("g.#{@_nameToId()}")

  configure: (options) ->
    # merge base defaults with particular renderer's
    defaults = _.extend {}, @defaults, @specificDefaults if @specificDefaults?
    options = _.extend {}, defaults, options
    _.each options, (val, key) =>
      @[key] = val

  delete: ->
    @seriesCanvas()?.remove()
    @seriesDraggableCanvas()?.remove()

  _nameToId: ->
    #TODO: handle empty name
    @utils.checkString(@series.name, "series name")
    name = @series.name?.replace(/[^\w]/g, '-').toLowerCase()
    # http://www.w3schools.com/css/css_id_class.asp2
    # TODO: Do NOT start an ID name with a number! It will not work in Mozilla/Firefox.
    # TODO: Do NOT start a class name with a number! This is only supported in Internet Explorer.
    name = "_#{name}" if /^\d/.test(name)
    name

  _filterNaNs: (d, args...) =>
    _.all args, (attr) ->
      switch typeof d[attr]
        when "number" then !isNaN(d[attr]) and d[attr]?
        when "string" then d[attr]?

  _checkData: =>
    data = @series.stack
    data.forEach((d, i) =>
      @utils.checkNumber(d.x, "#{@name} renderer data[#{i}].x")
      @utils.checkNumber(d.y, "#{@name} renderer data[#{i}].y")
    )

  animateShow: ->
    left = @graph.padding.left + @graph.axisPadding.left
    top = @graph.padding.top + @graph.axisPadding.top

    @graph.vis?.attr("transform", "translate(#{left},#{@graph.outerHeight})")
    @graph.draggableVis?.attr("transform", "translate(#{left},#{@graph.outerHeight})")
    @graph.vis?.transition()
      .duration(@graph.transitionSpeed)
      .delay(0)
      .attr("transform", "translate(#{left},#{top})")
    @graph.draggableVis?.transition()
      .duration(@graph.transitionSpeed)
      .delay(0)
      .attr("transform", "translate(#{left},#{top})")

    @graph.animateShowHide = false
