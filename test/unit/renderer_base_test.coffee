describe 'Renderer base', ->
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

  it 'Renderer base: constructor', (done) ->
    _rendererBase = new window.Tactile.RendererBase()
    assert _rendererBase
    done()

  it 'Renderer base: domain', (done) ->
    _rendererBase = new window.Tactile.RendererBase()
    obj = [{x: 1, y: 5}, {x:2, y:5}]
    _rendererBase['graph'] = {stackedData: [obj, obj, obj]}
    assert _rendererBase.domain()
    done()

  it 'Renderer base: render', (done) ->
    _rendererBase = new window.Tactile.RendererBase()
    #_rendererBase['series'] = {}
    #_rendererBase['graph'] = [vis:[]]
    #assert _rendererBase.render()
    done()

  it 'Renderer base: seriesCanvas', (done) ->
    _rendererBase = new window.Tactile.RendererBase()
    #_rendererBase['graph'] = [vis:[]]
    #assert _rendererBase.seriesCanvas()
    done()

  it 'Renderer base: configure', (done) ->
    _rendererBase = new window.Tactile.RendererBase()
    #console.log _rendererBase.configure()
    #assert _rendererBase.configure()
    done()
