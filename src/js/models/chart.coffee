Tactile.Chart = class Chart
# Add your renderer here. Key should be equal to the renderer `name` property
  _renderers:
    'gauge': GaugeRenderer
    'bar': BarRenderer
    'line': LineRenderer
    'draggableLine': DraggableLineRenderer
  
  defaults: 
    interpolation: 'monotone'
    offset: 'zero'
    min: undefined
    max: undefined
    order: [] # multi renderer support
    
  constructor: (args) ->
    @renderers = []
    @window = {}
    
    args = _.extend({}, @defaults, args)
    _.each args, (val, key) =>
      @[key] = val

    @series.active = =>
      @series.filter (s) ->
        not s.disabled
        
    @updateCallbacks = []
    @setSize( width: args.width, height: args.height )
    
    @vis = args.vis || d3.select(@element)
      .append("svg:svg")
      .attr('width', @width)
      .attr('height', @height)
    
    # need a constant class name for a containing div
    $(@element).addClass('graph-container')
    @initRenderers(args)

  render: ->
    return if @renderers is undefined or _.isEmpty(@renderers)
    stackedData = @stackData()
    
    # clear everything
    #TODO: Change this to enter(), transition(), and exit() ASAP.
    @vis.selectAll("*").remove() #
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
      @x = d3.scale.linear().domain(domain.x).range([0, @width])
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
    
    @width = args.width || 400
    @height = args.height || 400
    
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