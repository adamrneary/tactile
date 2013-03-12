describe 'Donut renderer', ->
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

  it 'Donut renderer: initialize', (done) ->
    _donutRenderer = new window.Tactile.DonutRenderer()
    assert _donutRenderer.initialize()
    done()

  it 'Donut renderer: render', (done) ->
    _donutRenderer = new window.Tactile.DonutRenderer()
    # assert _donutRenderer.render()
    done()

