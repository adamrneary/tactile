describe 'Column renderer', ->
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

  it 'Column renderer: initialize', (done) ->
    # _columnRenderer = new window.Tactile.ColumnRenderer()
    # assert _columnRenderer.initialize()
    done()

  it 'Column renderer: render', (done) ->
    # _columnRenderer = new window.Tactile.ColumnRenderer()
    # assert _columnRenderer.render()
    done()

  it 'Column renderer: setupTooltips', (done) ->
    # _columnRenderer = new window.Tactile.ColumnRenderer()
    # assert _columnRenderer.setupTooltips()
    done()

  it 'Column renderer: barWidth', (done) ->
    # _columnRenderer = new window.Tactile.ColumnRenderer()
    # assert _columnRenderer.barWidth()
    done()

  it 'Column renderer: stackTransition', (done) ->
    # _columnRenderer = new window.Tactile.ColumnRenderer()
    # assert _columnRenderer.stackTransition()
    done()

  it 'Column renderer: unstackTransition', (done) ->
    # _columnRenderer = new window.Tactile.ColumnRenderer()
    # assert _columnRenderer.unstackTransition()
    done()