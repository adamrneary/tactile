describe 'unit tests', ->
  before (done)->
    glob.zombie.visit glob.url, (e, _browser) ->
      browser = _browser
      window = browser.window
      $ = window.$
      _ = window._

      global.browser = browser
      global.window = window
      global.d3 = browser.window.d3
      global._ = window._
      if glob.report
        require(__dirname+'/../cov/tactile.js')
    done()

  require './chart_test'
  #require './line_test'
  #require './area_test'
  require './tooltip_test'
  require './renderer_base_test'
  require './area_renderer_test'
  require './axis_time_test'
  require './axis_y_test'
  require './column_renderer_test'
  require './donut_renderer_test'
  require './dragger_test'
  require './fixtures_time_test'
  require './gauge_renderer_test'
  require './line_renderer_test'
  require './range_slider_test'
  require './scatter_renderer_test'
