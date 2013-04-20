describe 'Axis y', ->
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

  it 'Axis y: constructor', (done) ->
    # _axisY = new window.Tactile.AxisY()
    # assert _axisY
    done()

  it 'Axis y: render', (done) ->
    # _axisY = new window.Tactile.AxisY()
    # assert _axisY.render()
    done()