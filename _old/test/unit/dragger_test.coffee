describe 'Dragger', ->
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

  it 'Dragger: constructor', (done) ->
    # _dragger = new window.Tactile.Dragger()
    # assert _dragger
    done()

  it 'Dragger: makeHandlers', (done) ->
    # _dragger = new window.Tactile.Dragger()
    # assert _dragger.makeHandlers()
    done()

  it 'Dragger: updateDraggedNode', (done) ->
    # _dragger = new window.Tactile.Dragger()
    # assert _dragger.updateDraggedNode()
    done()

  it 'Dragger: update', (done) ->
    # _dragger = new window.Tactile.Dragger()
    # assert _dragger.update()
    done()