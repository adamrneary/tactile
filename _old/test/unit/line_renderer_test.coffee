describe 'Line renderer', ->
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

  it 'Line renderer: seriesPathFactory', (done) ->
    # _lineRenderer = new window.Tactile.LineRenderer()
    # assert _lineRenderer.seriesPathFactory()
    done()

  it 'Line renderer: initialize', (done) ->
    # _lineRenderer = new window.Tactile.LineRenderer()
    # assert _lineRenderer.initialize()
    done()

  it 'Line renderer: render', (done) ->
    # _lineRenderer = new window.Tactile.LineRenderer()
    # assert _lineRenderer.render()
    done()