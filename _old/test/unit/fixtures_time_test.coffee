describe 'Fixtures time', ->
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

  it 'Fixtures time: constructor', (done) ->
    # _fixturesTime = new window.Tactile.FixturesTime()
    # assert _fixturesTime
    done()

  it 'Fixtures time: unit', (done) ->
    # _fixturesTime = new window.Tactile.FixturesTime()
    # assert _fixturesTime.unit()
    done()

  it 'Fixtures time: formatDate', (done) ->
    # _fixturesTime = new window.Tactile.FixturesTime()
    # assert _fixturesTime.formatDate()
    done()

  it 'Fixtures time: formatTime', (done) ->
    # _fixturesTime = new window.Tactile.FixturesTime()
    # assert _fixturesTime.formatTime()
    done()

  it 'Fixtures time: ceil', (done) ->
    # _fixturesTime = new window.Tactile.FixturesTime()
    # assert _fixturesTime.ceil()
    done()