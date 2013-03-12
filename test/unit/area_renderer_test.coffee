describe 'Area renderer', ->
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

  it 'Area renderer: initialize', (done) ->
    # _areaRenderer = new window.Tactile.AreaRenderer
    # assert _areaRenderer
    # assert _areaRenderer.initialize()
    done()

  it 'Area renderer: seriesPathFactory', (done) ->
    # _areaRenderer = new window.Tactile.AreaRenderer
    # assert _areaRenderer.seriesPathFactory()
    done()

  it 'Area renderer: seriesStrokeFactory', (done) ->
    # _areaRenderer = new window.Tactile.AreaRenderer()
    # assert _areaRenderer.seriesStrokeFactory()
    done()

  it 'Area renderer: render', (done) ->
    # _areaRenderer = new window.Tactile.AreaRenderer()
    # assert _areaRenderer.render()
    done()