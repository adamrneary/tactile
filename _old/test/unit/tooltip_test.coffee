describe 'Tooltip', ->
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

  it 'Tooltip: constructor', (done) ->
    # _tooltip = new window.Tactile.Tooltip()
    # assert _tooltip
    done()

  it 'Tooltip: appendTooltip', (done) ->
    # _tooltip = new window.Tactile.Tooltip()
    # assert _tooltip.appendTooltip()
    done()

  it 'Tooltip: annotate', (done) ->
    # _tooltip = new window.Tactile.Tooltip()
    # assert _tooltip.annotate()
    done()

