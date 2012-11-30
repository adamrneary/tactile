BaseView = require('views/shared/base_view')
TimeSliderView  = require('views/shared/time_slider_view')

module.exports = class RangeSlider extends BaseView
  constructor: (options) ->
    @element = options.element
    @graph = options.graph
    @updateCallback = options.updateCallback || ->
    @initCallback = options.updateCallback || ->
    $ =>
      view = @createView TimeSliderView, @timeframe
      @element.html view.render().el
      values = options.values || [@graph.dataDomain()[0], @graph.dataDomain()[1]]
      @initCallback(values, @element) 
      @updateGraph(values)
      @element.find('.time-slider').slider
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
    
