describe 'Range slider', ->
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
      done()

  it 'Range slider: constructor', (done) ->
    # _rangeSlider = new window.Tactile.RangeSlider()
    # assert _rangeSlider
    done()

  it 'Range slider: updateGraph', (done) ->
    # _rangeSlider = new window.Tactile.RangeSlider()
    # assert _rangeSlider.updateGraph()
    done()