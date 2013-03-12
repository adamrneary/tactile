describe 'Donut series', ->
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

  it 'example', (done) ->
    data = [
      label: "FL"
      val: 40000
    ,
      label: "CA"
      val: 30000
    ,
      label: "NY"
      val: 20000
    ,
      label: "NC"
      val: 30000
    ,
      label: "SC"
      val: 40000
    ,
      label: "AZ"
      val: 50000
    ,
      label: "TX"
      val: 60000
    ]
    chart = new window.Tactile.Chart()
      .element(window.$("#example_view")[0]).width(680).height(400).data(data)
    chart.addSeries
      name: "donut"
      renderer: "donut"
      color: "#c05020"
    chart.render()
    console.log chart
    done()

  it 'appendTooltip', (done) ->
    #console.log window.Tactile.Tooltip()
    done()
