Tactile.Chart = class Chart
# Add your renderer here. Key should be equal to the renderer `name` property
  _renderers:
    'gauge': GaugeRenderer
    'bar': BarRenderer
    'line': LineRenderer
    'draggableLine': DraggableLineRenderer
  
  mainDefaults: 
    margin: {top: 20, right: 20, bottom: 20, left: 20}
    padding: {top: 10, right: 10, bottom: 10, left: 10}
    interpolation: 'monotone'
    offset: 'zero'
    min: undefined
    max: undefined
    order: [] # multi renderer support
    axes:
      x: "time"
      y: "linear"


  seriesDefaults:
    xValue: (d)-> d.x
    yValue: (d)-> d.y
    dataTransform: (d)->d

  constructor: (args) ->
    @renderers = []
    @window = {}
    @updateCallbacks = []
    
    args = _.extend({}, @mainDefaults, args)
    args.series = _.map(args.series, (d) => _.extend({}, @seriesDefaults, d))
    _.each args, (val, key) =>
      @[key] = val
        
    @series.active = =>
      @series.filter (s) ->
        not s.disabled
        
    @setSize( width: args.width, height: args.height )
    @_setupCanvas()
    
    # need a constant class name for a containing div
    $(@element).addClass('graph-container')
    @initRenderers(args)

  render: ->
    return if @renderers is undefined or _.isEmpty(@renderers)
    stackedData = @stackData()
    
    # clear everything
    # TODO: Change this to enter(), transition(), and exit() ASAP.
    @vis.selectAll("*").remove()
    
    # TODO: 
    # it should be possible to pass options to the axes
    # so far they were 
    # for x: unit, ticksTreatment, grid 
    # for y: orientation, pixelsPerTick, ticks and few more.
    axes = [@findAxis(@axes.x),@findAxis(@axes.y)]

    _.each @renderers, (renderer) =>
      # discover domain for current renderer
      @discoverRange(renderer)
      renderer.render()

    @updateCallbacks.forEach (callback) ->
      callback()

  update: ->
    # TODO: add possibilty so the update is animated
    @render()

  discoverRange: (renderer) ->
    domain = renderer.domain()
    if renderer.cartesian
      # TODO: This needs way prettier implementation
      # It moves the range 'right' by the value of half width of a bar
      # So if we have different renderers including bar chart points are 
      # rendered in the center of each bar and not a single bar is cut off by the chart border
      if @_hasDifferentRenderers() and @_containsBarChart()
        rangeStart = @width / renderer.series.stack.length / 2
        
      @x = d3.scale.linear().domain(domain.x).range([rangeStart || 0, @width])
      @y = d3.scale.linear().domain(domain.y).range([@height, 0])
      @y.magnitude = d3.scale.linear()
        .domain([domain.y[0] - domain.y[0], domain.y[1] - domain.y[0]])
        .range([0, @height])

  findAxis: (axisString)->
    switch axisString
      when "linear"
        new Tactile.AxisY({graph: this})
      when "time"
        new Tactile.AxisTime({graph: this})
      else
        console.log("ERROR:#{axisString} is not currently implemented")
                        
  # used in range slider
  dataDomain: ->
    # take from the first series
    data = @series[0].data
    [data[0].x, data.slice(-1).shift().x]  

  stackData: ->
    # Read more about stacking data here: 
    # https://github.com/mbostock/d3/wiki/Stack-Layout

    seriesData = @series.active().map((d) =>
      @data.map(d.dataTransform).filter(@_slice))

    layout = d3.layout.stack()
    layout.offset(@offset)
    stackedData = layout(seriesData)
    
    i = 0
    @series.forEach (series) ->
      series.stack = stackedData[i++]
    
    @stackedData = stackedData

  setSize: (args) ->
    args = args || {}
    
    elWidth = $(@element).width()
    elHeight = $(@element).height()
    
    @outerWidth = args.width || elWidth
    @outerHeight = args.height || elHeight
    
    @innerWidth = @outerWidth - @margin.left - @margin.right
    @innerHeight = @outerHeight - @margin.top - @margin.bottom
    @width = @innerWidth - @padding.left - @padding.right
    @height = @innerHeight - @padding.top - @padding.bottom

    @vis?.attr('width', @width).attr('height', @height)

  onUpdate: (callback) ->
    @updateCallbacks.push callback

  initRenderers: (args) ->
    _.each @series.active(), (s) => 
      name = s.renderer
      if (!@_renderers[name])
        throw "couldn't find renderer #{name}"

      rendererClass = @_renderers[name]
      rendererOptions = _.extend {}, args, {graph: @, series: s}
      r = new rendererClass(rendererOptions)
      @renderers.push r
      
  
  # appends all the chart canvas elements so it respects the margins and paddings
  # done by following this example: http://bl.ocks.org/3019563
  _setupCanvas: ->
    @vis = d3.select(@element)
      .append("svg")
        .attr('width', @outerWidth)
        .attr('height', @outerHeight)
      .append("g")
        .attr("transform", "translate(#{@margin.left},#{@margin.top})")
        
    @vis.append("g")
      .attr("class", "outer-canvas")
      .attr("width", @innerWidth)
      .attr("height", @innerHeight)  
      
    # this is the canvas on which all data should be drawn  
    @vis = @vis.append("g")
      .attr("transform", "translate(#{@padding.left},#{@padding.right})")
      .attr("class", "inner-canvas")
          
      

  # this trims data down to the range that is currently viewed. 
  # See range_slider for a clue how it's used
  _slice: (d) ->
    if @window.xMin or @window.xMax
      isInRange = true
      isInRange = false if @window.xMin and d.x < @window.xMin
      isInRange = false if @window.xMax and d.x > @window.xMax
      return isInRange
    true
    
  _deg2rad: (deg) ->
    deg * Math.PI / 180

  _hasDifferentRenderers: ->
    _.uniq(_.map(@series, (s) -> s.renderer)).length > 1
    
  _containsBarChart: ->
    names = _.map(@series, (s) -> s.renderer)
    _.find(names, (name) -> name == 'bar') != undefined