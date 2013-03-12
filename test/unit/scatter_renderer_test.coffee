describe 'Scatter renderer', ->
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

  it 'Scatter renderer: render', (done) ->
    # _scatterRenderer = new window.Tactile.ScatterRenderer()
    # assert _scatterRenderer.render()
    done()