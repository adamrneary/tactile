describe 'Axis time', ->
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

  it 'Axis time: constructor', (done) ->
    # _axisTime = new window.Tactile.AxisTime()
    # assert _axisTime
    done()

  it 'Axis time: appropriateTimeUnit', (done) ->
    # _axisTime = new window.Tactile.AxisTime()
    # assert _axisTime.appropriateTimeUnit()
    done()

  it 'Axis time: tickOffsets', (done) ->
    # _axisTime = new window.Tactile.AxisTime()
    # assert _axisTime.tickOffsets()
    done()

  it 'Axis time: render', (done) ->
    # _axisTime = new window.Tactile.AxisTime()
    # assert _axisTime.render()
    done()