# # Tactile
# Tactile is an interactive charting library that uses d3.
#
# Tactile.Chart is primarily responsible for the canvas itself onto which
# various axes and series of data are then drawn. As such, it maintains the
# highest-level variables defining the canvas, as well as objects such as
# transitions that span multiple series or axes.
class Tactile.Chart

  # ## The constructor
  # We use the constructor as a place to store defaults so that you can simply
  # render a chart by first setting data and a series:
  #
  #     chart = new Tactile.Chart()
  #       .data(data)
  #       .series(series)
  #       .render()
  #
  # We also allow you to configure the chart with passed arguments:
  #
  #     options = {data: myAwesomeData, series, myAwesomeSeries}
  #     chart = new Tactile.Chart(options).render()
  constructor: (args = {}) ->

    # ### Create internal variables with defaults
    # _Note:_  Each variable is described below with its getter/setter function
    #
    # Canvas setup
    @_element = args.element or $("#tactile-container")[0]
    @_outerHeight = args.outerHeight
    @_outerWidth = args.outerWidth
    @_padding = args.padding or {top: 0, right: 0, bottom: 0, left: 0}
    @_axisPadding = args.axisPadding or {top: 0, right: 0, bottom: 0, left: 0}

    # Core chart functionality
    @_data = new Tactile.Dataset(args.data or [])
    @_series = new Tactile.SeriesSet(args.series or [], @)

    # Prettification and animation
    @_axes = {}
    @_updateAxes args.axes or
      x: new Tactile.AxisTime()
      y: new Tactile.AxisLinear()
    @_grids = args.axes or {}
    @_interpolation: args.interpolation or 'monotone'
    @_transitionSpeed = args.transitionSpeed or 500

    # ### Internal functionality
    #
    # These internal collections cannot be set with the constructor
    @_updateCallbacks = []
    @_elementChangeCallbacks = []

    # Internal flags allow us to avoid render() doing extra work. They also
    # exist for changes that don't force and immediate re-render, which
    # allows you to make multiple changes before calling render()
    @_canvas_needs_reset = true
    @_data_has_changed = true

  # ## Public API
  #
  # The following methods are getter/setter methods that expose the chart's
  # internal variables. Each setter returns @ so that the methods can be
  # chained.

  # The value for the element is a CSS selector that should reflect a single
  # element into which we will add our DOM objects and behaviors.
  element: (val) =>
    return @_element unless val

    # If a Tactile chart exists in the previous element, we should remove it
    # before creating a new one elsewhere.
    @_destroySvgFromElement(@_element)

    @_element = val
    @_canvas_needs_reset = true
    @elementChangeCallbacks.forEach (callback) -> callback()
    @

  # The outerHeight will set the outer-most height of the container to be
  # created. All paddings will squeeze the chart from the inside rather
  # than push the container outwards.
  outerHeight: (val) ->
    return @_outerHeight unless val
    @_outerHeight = val
    @_canvas_needs_reset = true
    @

  # The outerWidth will set the outer-most width of the container to be
  # created. All paddings will squeeze the chart from the inside rather
  # than push the container outwards.
  outerWidth: (val) ->
    return @_outerWidth unless val
    @_outerWidth = val
    @_canvas_needs_reset = true
    @

  # This padding value is the outermost padding, allowing you to give the chart
  # breathing room before any objects — axis, labels, etc. — are drawn.
  padding: (val) ->
    return @_padding unless val
    @_padding = val
    @_canvas_needs_reset = true
    @

  # This padding is used around the axes themselves.
  # TODO: This should be axis-specific. Refactor to Axis settings.
  axisPadding: (val) ->
    return @_axisPadding unless val
    @_axisPadding = val
    @_canvas_needs_reset = true
    @

  # The chart data to be plotted should be an array of objects. How that data
  # is managed or transformed will be configured elsewhere. This is just the
  # data itself in its simplest form. See data documentation for more
  # detailed information.
  data: (val) ->
    return @_data unless val
    @_data.update(val)
    @_data_has_changed = true
    @

  # Please see the series documentation for detailed explanations.
  # This method adds series to the series set.
  # _Note:_ You may pass a single object here or an array of them
  # _Note:_ Pass {overwrite: true} to remove all previous series
  series: (val, options = {overwrite: false}) ->
    return @_series unless val
    vals = [val] unless _.isArray(val)
    @_series.add(newSeries, options.overwrite)
    # _Note:_ There is no flag to update here. All series get updated
    # automatically by render()
    @

  # Please see the series documentation for detailed explanations.
  # `val` is a object with valid keys `x`, `y`, and `y1`.
  # _Note:_ Only the axes passed in this object will be updated. To remove
  # an axis, pass {x: null}
  axes: (val) ->
    return @_axes unless val
    @_updateAxes val
    @

  # The axis domain refers to the body of displayed values on the axis.
  # Unless set explicitly, it will span the min and max values of the data.
  axisDomain: (axis, val) =>
    return unless @_axes[axis]
    return @_axes[axis].domain() unless val

    # We don't use this method to set the actual axis domain. This is managed
    # by the domain itself. This is because if no domain has been manually set,
    # the domain should update itself on data change.
    @_axes[axis].manualDomain = val
    @

  # The chart data to be plotted should be an array of objects. How that data
  # is managed or transformed will be configured elsewhere. This is just the
  # data itself in its simplest form. See data documentation for more
  # detailed information.
  grid: (val) ->
    return @_grid unless val
    @_grid = val
    @_grid_has_changed = true
    @

  # Interpolation is d3 functionality impacting the shape of lines/area paths.
  interpolation: (val) ->
    return @_interpolation unless val
    @_interpolation = val
    # _Note:_ There is no flag to update here. Interpolation is simply used
    # by series on render
    @

  # Transition speed (in MS) refers to duration of animations. Transitions in
  # d3 are run in sync, even if many objects are being animated. In cases where
  # Tactile has multiple stages of animation, the transition speed represents
  # the total animation time for all stages.
  transitionSpeed: (val) ->
    return @_transitionSpeed unless val
    @_transitionSpeed = val
    # _Note:_ There is no flag to update here. Transition speed is simply used
    # by transitions on render
    @

  # ### These event handlers cannot deleted
  #
  # Called after a render
  onUpdate: (callback) ->
    @updateCallbacks.push callback

  onElementChange: (callback) ->
    @elementChangeCallbacks.push callback

  # ### Finally, the moment we've all been waiting for. We've teed up a killer
  # chart, now let's render it.
  #
  # _Note:_ The render() function is called on initial render and subsequent
  # renders, so great care has gone into ensuring that we are only updating the
  # pieces that need updating.
  #
  # Options:
  #   Pass `transitionSpeed` to override the global setting
  render: (options = {}) ->

    # Data and series or bust!
    if @_series.isEmpty or @_data.isEmpty
      @_destroySvgFromElement(@_element)
      return

    # Reset the canvas as required
    @_resetCanvas() if @_canvas_needs_reset
    @_canvas_needs_reset = false

    # Now we will create a single transition selection we can use for the rest
    # of our rendering. By using one transition, everything will be kept in
    # sync.
    speed = options.transitionSpeed or @_transitionSpeed
    transition = @svg.transition().duration(speed)

    # Render axes, series, grids in sequence
    _.each _.flatten([@_axes, @_series, @_grids]), (object) ->
      object.render transition, options

    # Wrap up
    @_data_has_changed = true
    @updateCallbacks.forEach (callback) -> callback()
    @

  # Legacy compatibility
  update: ->
    @render()

  # ## Stack and unstack
  #
  # Because stacking and unstacking can happen across multiple series, these
  # methods are exposed at the chart level and passed to each applicable
  # series.
  #
  # They behave in lieu of calling render() and therefore behave a bit like
  # render() does.

  stackTransition: (options = {}) =>

    # Define a transition selection
    speed = options.transitionSpeed or @_transitionSpeed
    transition = @svg.transition().duration(speed)

    # Stack any series that can be stacked
    _each @_series.allStackable(), (series) ->
      if options.unstack
        series.unstackTransition(transition)
      else
        series.stackTransition(transition)

    # Render axes
    _.each @_axes, (axis) ->
      axis.render transition, options

  unstackTransition: (options = {}) =>
    options.unstack = true
    @stackTransition: (options = {})

  # ## Internal mechanics

  # We use this method to ensure that we only create or update axes passed in
  # the param object. Others are left alone.
  _updateAxes: (axes) ->
    _.each axes, (val, key) -> @_updateAxis(key, val)

  _updateAxis: (axis, val) ->
    @_axes[axis].destroy()
    if val
      switch val.dimension
        when "linear"
          @_axes[axis] = new Tactile.AxisLinear val
        when "time"
          @_axes[axis] = new Tactile.AxisTime val
        else
          Tactile.Utils.warn("Tactile error: Axis dimension #{args.dimension} is not currently implemented.")

  # Appends or updates all the chart canvas elements
  # so it respects the paddings
  # done by following this example: http://bl.ocks.org/3019563
  _resetCanvas: ->

    # Let's start by figuring out the dimensions we'll be working with.
    @_setSize()

    # We need a constant class name for a containing div within the object's element.
    @svg = Tactile.Utils.findOrAppend
      node: 'svg'
      element: d3.select(@_element)
    @svg
      .attr('width', @_outerWidth)
      .attr('height', @_outerHeight)

    # We run into problems if draggable components are rendered underneath
    # components that cannot be dragged. Since the draggable components are
    # small (e.g. circles on the top of a column rather than the column itself)
    # we can manage this with a static canvas and a draggable canvas. Much
    # easier than dealing with the z index quagmire.
    @vis = @_findOrAppendCanvas(@svg, 'canvas')
    @draggableVis = @_findOrAppendCanvas(@svg, 'draggable-canvas')

    # The default clip path is good for most objects. It sets a hard cutoff on
    # the left and right, but it reaches higher and lower than it otherwise
    # would in order to account for the width of lines.
    @_findOrAppendClip(@vis, 'clip', 0, 2)

    # The scatter clip path is used for scatter plots where the allowance needs
    # to be larger and in all directions. For a line that has circles on its
    # points, you can use the default clip path for the line and the scatter
    # clip path for the circles.
    @_findOrAppendClip(@vis, 'clip', 4, 4)

  # Set's the size for the chart
  # please note you have to call render() or update()
  # for this changes to be reflected in your chart
  #
  # outerWith, outerHeight - no paddings subtracted
  # innerWidth, innerHeight - paddings subtracted
  # width(), height() returns innerWidth as it's the most common used
  _setSize: ->

    # Check the existing element's dimensions before applying a default.
    @outerWidth or= $(@_element).width() or 200
    @outerHeight or= $(@_element).height() or 100

    # Combine base padding and axis padding to define the margin (TODO: Hacky)
    @margin =
      left: @_padding.left + @_axisPadding.left
      right: @_padding.right + @_axisPadding.right
      top: @_padding.top + @_axisPadding.top
      bottom: @_padding.bottom + @_axisPadding.bottom

    # Calculate the inner width and height for charting
    @_width = @_outerWidth - @margin.left - @margin.right
    @_height = @_outerHeight - @margin.top - @margin.bottom

    @vis?.attr('width', @innerWidth).attr('height', @innerHeight)
    @_updateRange()
    @_setupCanvas()

    @

  # The canvas (or "g" or "vis," depending on who you're talking to)
  # is the d3 object on which other objects (series, axes, etc.) are drawn.
  _findOrAppendCanvas: (element, class) ->
    canvas = Tactile.Utils.findOrAppend
      node: 'g'
      element: element
      selector: "g.#{class}"
    canvas
      .attr("transform", "translate(#{@margin.left},#{@margin.top})")
      .attr("class", class)
      .attr('width', @_width)
      .attr('height', @_height)
    canvas

  # Clip paths are the used to mask objects that pass outside the clip path,
  # leaving you with a clean chart falling right in the intended space, even
  # as you animate laterally.
  #
  # The problem is that we need to give room for objects that are larger than
  # 1 pixel (all of them).
  _findOrAppendClip: (element, id, widthAllowance, heightAllowance) ->
  clip = Tactile.Utils.findOrAppend
    node: 'clipPath'
    element: element
    selector: "##{id}"
  clip
    .attr("id", id)
  findOrAppend(node: 'rect', element: clip)
    # increase width to provide room for circle radius
    .attr("width", @width() + 2 * widthAllowance)
    # increase height to provide room for circle radius
    .attr("height", @height() + 2 * heightAllowance)
    # translate to adjust for increased width and height
    .attr("transform", "translate(-#{widthAllowance},-#{heightAllowance})")
  clip

  # As the name suggests, this method eliminates the svg from the passed
  # element, whether because the chart is no longer valid or because the
  # element has been changed, or whatever the case may be.
  _destroySvgFromElement: (element) ->
    d3.select(element).selectAll('svg').remove()
    @_canvas_needs_reset = true