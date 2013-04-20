describe 'Renderer base', ->
  it 'Renderer base: constructor', ->
    _rendererBase = new window.Tactile.RendererBase()
    assert _rendererBase

  describe 'Renderer base: domain', ->
    it 'when data given', ->
      _rendererBase = new window.Tactile.RendererBase()
      obj = [{x: 1, y: 5}, {x:2, y:5}]
      _rendererBase['graph'] = {stackedData: [obj, obj, obj]}
      assert _rendererBase.domain()

    it 'without any data', ->
      _rendererBase = new window.Tactile.RendererBase()
      # [[]] is passed when chart has no data at all
      stackedData = [[]]
      _rendererBase['graph'] = {stackedData: stackedData}
      assert _rendererBase.domain()

  it 'Renderer base: render'#, ->
    #_rendererBase = new window.Tactile.RendererBase()
    #_rendererBase['series'] = {}
    #_rendererBase['graph'] = [vis:[]]
    #assert _rendererBase.render()

  it 'Renderer base: seriesCanvas'#, ->
    #_rendererBase = new window.Tactile.RendererBase()
    #_rendererBase['graph'] = [vis:[]]
    #assert _rendererBase.seriesCanvas()

  it 'Renderer base: configure'#, ->
    # _rendererBase = new window.Tactile.RendererBase()
    #console.log _rendererBase.configure()
    #assert _rendererBase.configure()
