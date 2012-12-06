# Create range slider for your chart!
#
# Simplest usage:
#
# new Tactile.RangeSlider(
#   graph: graphObject
#   element: $('#slider')
# )
#
# You can also pass element in which the slider will be rendered
# and sliderClass if you wish to call .slider on a specific node of your's element html tree
#
# Advanced example:
#
# $('#time-slider-container').html $(<div class='greatness'><h1>Slider!</h1><div class='time-slider'></div></div>) 
# new Tactile.RangeSlider(
#    graph: chart
#    sliderClass: '.time-slider' # addtional selector to where to attach slider
#    element: $('#time-slider-container')
#    updateCallback: printMonths
#    initCallback: printMonths
#    values: initialValuesForSlider
#  )

Tactile.RangeSlider = class RangeSlider
  constructor: (options) ->
    @element = options.element
    @graph = options.graph
    @timeSliderClass = options.sliderClass
    
    @updateCallback = options.updateCallback || ->
    @initCallback = options.updateCallback || ->
    
    # initiates the slider
    $ =>
      values = options.values || [@graph.dataDomain()[0], @graph.dataDomain()[1]]
      @initCallback(values, @element)
      @updateGraph(values)
      
      if @timeSliderClass
        sliderContainer = @element.find(@timeSliderClass)
      else
        sliderContainer = @element

      sliderContainer.slider
        range: true
        min: @graph.dataDomain()[0]
        max: @graph.dataDomain()[1]
        values: values
        slide: (event, ui) =>
          @updateGraph(ui.values)
          # if we're at an extreme, stick there
          @graph.window.xMin = undefined if @graph.dataDomain()[0] is ui.values[0]
          @graph.window.xMax = undefined if @graph.dataDomain()[1] is ui.values[1]


    @graph.onUpdate =>
      values = $(@element).slider("option", "values")
      $(@element).slider "option", "min", @graph.dataDomain()[0]
      $(@element).slider "option", "max", @graph.dataDomain()[1]
      values[0] = @graph.dataDomain()[0] if @graph.window.xMin is undefined
      values[1] = @graph.dataDomain()[1] if @graph.window.xMax is undefined
      $(@element).slider "option", "values", values


  updateGraph: (values) =>
    @graph.window.xMin = values[0]
    @graph.window.xMax = values[1]
    @updateCallback(values, @element) 
    window.mediator.trigger('timeframe:change', values)
    @graph.update()
    
