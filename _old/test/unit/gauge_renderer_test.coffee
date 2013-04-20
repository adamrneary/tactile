describe 'Gauge renderer', ->
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

  it 'Gauge renderer: render', (done) ->
    # _gaugeRenderer = new window.Tactile.GaugeRenderer()
    # assert _gaugeRenderer.render()
    done()

  it 'Gauge renderer: renderLabels', (done) ->
    # _gaugeRenderer = new window.Tactile.GaugeRenderer()
    # assert _gaugeRenderer.renderLabels()
    done()

  it 'Gauge renderer: domain', (done) ->
    # _gaugeRenderer = new window.Tactile.GaugeRenderer()
    # assert _gaugeRenderer.domain()
    done()