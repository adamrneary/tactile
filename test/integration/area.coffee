describe 'Area series', ->
  $ = null
  window = null
  browser = null
  before (done) ->
    glob.zombie.visit glob.url+"#base", (err, _browser) ->
      browser = _browser
      window = browser.window
      $ = window.$
      done()

  it 'example', (done) ->
    done()