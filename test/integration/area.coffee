describe 'Area series', ->
  $ = null
  window = null
  browser = null
  before (done) ->
    glob.zombie.visit glob.url+"#area", (err, _browser) ->
      browser = _browser
      window = browser.window
      $ = window.$
      done()

  it 'example', (done) ->
    header = $('#example_header').text()
    assert header is 'Area'
    done()
